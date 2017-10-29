---
layout: post
title: "log4j:RollingFileAppender Improvment"
date: 2017-09-27 01:00:00
categories: Programming
tags: Java,log4j
---
![](/assets/img/log4j.jpg)

## 发现问题
A系统的rpc服务（使用HSF框架）调用方B反馈，最近总是会调用服务超时，发生的时间没有规律，每天大概几百次左右，所以找到A系统的负责人，也就是我，查找问题。

## 查找原因
了解有超时现象后，先让调用方B提供具体的rpc日志，想看一看是哪些接口、在什么时间超时。调用方B提供了两天左右的准确的超时日志，研究后发现，大约集中在两个接口上，这两个接口都是调用非常频繁的接口，且都有缓存，性能上应该很好。
1. 通过公司中的监控平台，仔细对照了超时发生时的时间段，发现从tomcat中采集出的spring bean运行时间日志，没有什么异常，那些业务方B反馈的接口耗时最多的才100ms，平均20ms不到；
1. 又看了下那些时间段的JVM的各项指标，没有FullGC，内存情况良好，磁盘读写良好，线程数倒是有有些突刺，但时间上吻合程度不高，所以没怎么在意；
1. 好在调用方的日志里面有准确的时间和查询参数，结合这两项指标，也能找到对应机器上的rpc日志，发现确实有超时，超时的记录也很明确（HSF日志提供了一些调用链的分析，能够看清远程调用耗时和本地耗时）；

经过上面一轮搜寻一无所获，仅仅是明确了那些时间点上，接口确实变慢了，变慢的原因也是发生在应用里，却没法确定到底是什么原因。在代码层面寻找可能的耗时操作也一无所获，所以注意力仍旧集中到了分析调用方B的超时日志上。

	2017-09-29 03:29:48,281 ERROR helper.XXXServiceHelper:85 queryInfo - XXXServiceHelper queryInfo error;uid=1434302683660970
	2017-09-29 03:29:48,438 ERROR helper.XXXServiceHelper:85 queryInfo - XXXServiceHelper queryInfo error;uid=1992173055745769
	2017-09-29 05:42:33,652 ERROR helper.XXXServiceHelper:85 queryInfo - XXXServiceHelper queryInfo error;uid=1522284039696604
	2017-09-29 05:42:34,174 ERROR helper.XXXServiceHelper:85 queryInfo - XXXServiceHelper queryInfo error;uid=1522284039696604

业务方B的日志大概没隔1小时会发生几例超时，有时候不到1小时。找了其中一条超时日志（例如2017-09-29 03:29:48这条），把A系统的rpc日志、HSF日志、APP日志等等看了一圈，实在看不出什么特别的。正一筹莫展的时候，突然发现了一段熟悉的时间：

	[papa@melonfamily.host /data/www/logs/tomcat7/xxxApp]$ll
	total 16431224
	-rw-rw-r-- 1 tomcat tomcat 1003283623 Sep 29 03:29 rpcTrace.log.2

不会这么巧吧？日志滚动的时间和发生超时的时间基本重合，查看下这个时候的最后一条rpc日志吧？

	[papa@melonfamily.host /data/www/logs/tomcat7/xxxApp]$tail -n 1 rpcTrace.log.2
	2017-09-29 03:29:46,021 [] INFO  rpcTraceLogger - {"xxxxInfo":"xxxValue","method":"queryInfo","service":"XXXService","startTime":1506626986021,"success":true,"traceInfo":{"requestId":"129.2_1506626986021_6","stepIndex":"0","traceType":"hsf_provider"},"usedTime":2160}

这条日志的开始时间2017-09-29 03:29:46加上2s后，恰好等于对方机器的超时记录时间。赶紧看了看当天其他的机器的日志滚动时间以及超时时刻，都吻合!看来日志滚动八成是造成服务超时的原因了。
## 追寻根源
日志滚动为何会导致那一时刻的服务超时呢？直观来想，应该是记录rpc日志时恰好遇到日志滚动，导致那个线程阻塞了，这也能解释为何JVM线程监控上在某些超时时间点上有毛刺，虽然并不是完全吻合。同时，因为rpc日志使用的是切面的方式环绕在service的方法上下的，所以tomcat中关于bean执行时间的监控并不能覆盖到rpc日志的阻塞时间，这也解释了为何观察出问题时段的bean执行时间不曾有超时现象。
A系统使用了log4j的RollingFileAppender来做rpc的日志记录，MaxBackupIndex设置为10，MaxFileSize设置为1G。linux上删除1G文件时确实会有些许的耗时，但日志记录是怎样和日志滚动互相阻塞同步的呢？下面是使用log4j记录日志时的时序图：
![](/assets/img/rollingFileAppender-timeline.png)
doAppend方法带有sychronized关键字，而rollOver方法被包含在doAppend中，当日志数目达到设定值且写入超过限定大小时，会执行文件删除。所以尽管rollOver方法本身没做同步，但其实跟记录日志是在一块竞争执行的，最终导致删除大文件时会卡住日志记录。
## 寻找方案
如何优化日志滚动呢？下面是我采取的一个方案：

	public class MyRollingFileAppder extends RollingFileAppender {
	    class DeleteFileTask implements Runnable {
	        File file;

	        DeleteFileTask(File file) {
	            this.file = file;
	        }

	        public void run() {
	            if (null == file) {
	                return;
	            }
	            if (file.exists()) {
	                LogLog.debug(System.currentTimeMillis() + " start delete " + file.getAbsolutePath());
	                file.delete();
	                LogLog.debug(System.currentTimeMillis() + " finish delete " + file.getAbsolutePath());
	            }
	        }
	    }

	    @Override
	    public void rollOver() {
	        File target;
	        File file;

	        LogLog.debug("rolling over count=" + ((CountingQuietWriter) qw).getCount());
	        LogLog.debug("maxBackupIndex=" + maxBackupIndex);

	        // If maxBackups <= 0, then there is no file renaming to be done.
	        if (maxBackupIndex > 0) {
	            // Map {(maxBackupIndex), ..., 2, 1} to {maxBackupIndex+1, ..., 3, 2}
	            for (int i = maxBackupIndex; i >= 1; i--) {
	                file = new File(fileName + "." + i);
	                if (file.exists()) {
	                    target = new File(fileName + '.' + (i + 1));
	                    if (target.exists()) {
	                        //if target exists, means DeleteFileTask is too slow. we have no choice but delete synchronously.
	                        LogLog.debug(
	                                System.currentTimeMillis() + ", rollOver: delete log synchronously happened, file=" + target
	                                        .getAbsolutePath());
	                        target.delete();
	                    }
	                    LogLog.debug("Renaming file " + file + " to " + target);
	                    file.renameTo(target);
	                }
	            }

	            // Rename fileName to fileName.1
	            target = new File(fileName + "." + 1);

	            this.closeFile(); // keep windows happy.

	            file = new File(fileName);
	            LogLog.debug("Renaming file " + file + " to " + target);
	            file.renameTo(target);

	            // Delete the overflow(maxBackupIndex+1) file asynchronously, to keep Windows happy.
	            file = new File(fileName + '.' + (maxBackupIndex + 1));
	            if (file.exists()) {
	                DeleteFileTask task = new DeleteFileTask(file);
	                task.run();
	            }
	        }

	        try {
	            // This will also close the file. This is OK since multiple
	            // close operations are safe.
	            this.setFile(fileName, false, bufferedIO, bufferSize);
	        } catch (IOException e) {
	            LogLog.error("setFile(" + fileName + ", false) call failed.", e);
	        }
	    }
	}

MyRollingFileAppder集成了RollingFileAppder，并覆盖了rollOver方法，RollingFileAppder中的rollOver方法做了以下几件事情：
1. 如果xxx.log.MaxBackupIndex存在，证明日志数目已满，直接删除这个文件；
1. 对xxx.log.MaxBackupIndex-1~xxx.log.1，如果存在就重命名，依次向后滚动一下，变成xxx.log.MaxBackupIndex~xxx.log.2;
1. 将目前满的文件从xxx.log重命名为xxx.log.1，并创建新的xxx.log;

我们已经知道耗时发生在第一步，所以优化的代码中，改进了这个流程：
1. 对xxx.log.MaxBackupIndex~xxx.log.1，如果存在，测试其增加1后的文件是否存在，如果不存在则重命名，依次向后滚动一下，变成xxx.log.MaxBackupIndex+1~xxx.log.2；如果其增加1后的文件存在，则**同步**删除“增加1后的文件”;
1. 将目前满的文件从xxx.log重命名为xxx.log.1，并创建新的xxx.log;
1. 如果xxx.log.MaxBackupIndex+1存在，证明日志数目已满，**异步**删除这个文件；

这里把删除动作后置，并异步，通过这种方法剔除删除对于记录日志的影响；但也存在可能，当删除真的很慢，异步删除未完成时，新日志已经被打满触发了下一次滚动，此时已然采用保守的同步删除法。其实这种情况在实际应用中基本不可能发生：删除过慢是因为文件较大，文件分片较大那么就不会那么容易被填满，简单来说，就是让有意义的日志填满一个1G的文件耗时，肯定要大于把这个1G文件直接删除。

## 实验结果
本地测试时流程能符合预期。目前已经部署A系统的预发环境，尚未部署到生产，部署过后来更新结果。