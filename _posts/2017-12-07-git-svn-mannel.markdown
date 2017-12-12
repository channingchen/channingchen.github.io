---
layout: post
title: "git-svn mannel"
date: 2017-12-07 00:00:00
categories: Programming
tags: misc,ABC
---
1. 克隆主干，rStartVersion是主干的一个版本号

		git svn clone [svn_url]/trunk -[rStartVersion]:HEAD [targetFolder]

2. 添加远端分支

		git config --add svn-remote.[svn/test(自定义远端分支名称)].url [svn_url]/branch/2017xxx（具体远端分支地址）

3. 添加远端分支与本地映射
		
		git config --add svn-remote.[svn/test].fetch [:refs/remotes/svn/test]

4. 拉取一个范围的版本

		git svn fetch svn/test -[rStartVersion]:HEAD [targetFolder]

5. 切换到开发分支

		git checkout -b test svn/test
