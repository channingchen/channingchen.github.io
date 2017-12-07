---
layout: post
title: "Core Java Interview Flow"
date: 2017-11-13 01:00:00
categories: Programming
tags: Java,ABC
---
![](/assets/img/java.jpeg)
因为工作上的原因，最近要做一些面试，所以决定总结出一套面试流程，其中包含了我所理解的整个面试过程，大致上问题都是由浅入深。这套流程走下来，要对候选人从个人基本信息、性格、表达能力、沟通能力、技术能力、学习能力以及智商情商有个客观的评定（智商情商仅仅做一个模糊的参考）。这套流程可能会随着我的面试过程、平常学习工作中的总结而不停更新。希望这套流程能提升我面试别人的能力，也能发现每一个牛人。

# Step1. 候选人基础信息了解和询问
> 这部分主要让候选人自我介绍，初步粗略的观察一个人。

1. 姓名、学历、之前的大致工作情况、换工作原因；
1. 项目情况：
    1. 项目大概情况（表达能力：能几句话说明白一个项目）；
    1. 自己负责的部分（责任感、条理性：说明白自己的工作，说明白自己的工作成效）；
    1. 亮点，难点（沟通：能针对提问回答面试官想要了解的东西，不要不懂装懂，或者绕圈子）；
1. 询问社交账号：
    1. Github
    1. Stack Overflow
    1. 个人博客或网站

# Step2. 能力考查
## I. 基础知识
> 这部分最好结合候选人简历写的能力、项目可以加上一些智商、联想能力的测试

### 面向对象
#### 面向对象通用问题
1. 四个特点：抽象、继承、封装、多态
1. 什么时候该用组合，什么时候该用继承？除非两者是“is-a”关系，否则不用继承；
1. 什么时候该用接口，什么时候该用抽象类？答案类似上一个，抽象类注重功能的积累，接口注重功能的组合；

#### 单例模式
问题点：volatile关键字、多线程并发情况下分析。

	1- eager initialization singleton
	    public class Test{
	        private static final Test test = new Test();
	        private Test(){}
	        public static Test getTest(){
	            return test;
	        }
	    ｝

	2- lazy initialization singleton (thread safe)
	    public class Test {
	         private static volatile Test test;
	         private Test(){}
	         public static Test getTest() {
	            if(test == null) {
	                synchronized(Test.class) {
	                    if(test == null){test = new Test();
	                }
	            }
	         }
	        return test;
	    ｝

	3- Bill Pugh Singleton with Holder Pattern (Preferably the best one)
	    public class Test {
	        private Test(){}
	        private static class TestHolder{
	            private static final Test test = new Test();
	        }
	        public static Test getInstance(){
	            return TestHolder.test;
	        }
	    }

	4- enum singleton
      public enum MySingleton {
        INSTANCE;
	    private MySingleton() {
	        System.out.println("Here");
	    }
	}

参考：
1. [怎样最有效率的实现一个单例模式](https://stackoverflow.com/questions/70689/what-is-an-efficient-way-to-implement-a-singleton-pattern-in-java#)
2. [两次检验加锁为何是错误的用法](http://www.cs.umd.edu/~pugh/java/memoryModel/DoubleCheckedLocking.html)

#### 工厂模式
三者是抽象程度逐步上升的关系。

1. 简单工厂：仅仅是把初始化对象的工作，包装掉，没有抽象。

		class FruitFactory {
		  public Apple makeApple() {
		    // Code for creating an Apple here.
		  }
		  public Orange makeOrange() {
		    // Code for creating an orange here.
		  }
		}

1. 工厂方法：产品是抽象的，生成方法是抽象的。生产的方法由子类工厂实现

		//抽象产品
		public interface Moveable {
		    void run();
		}
		//具体产品
		public class Plane implements Moveable {
		    @Override
		    public void run() {
		        System.out.println("plane....");
		    }
		}
		//抽象工厂
		public abstract class VehicleFactory {
		    abstract Moveable create();
		}
		//具体工厂
		public class PlaneFactory extends VehicleFactory{
		    public Moveable create() {
		        return new Plane();
		    }
		}

1. 抽象工厂：可以创建一簇有关联的不同产品

		//抽象工厂类
		public abstract class AbstractFactory {
		    public abstract Vehicle createVehicle();
		    public abstract Weapon createWeapon();
		    public abstract Food createFood();
		}
		//具体工厂类，其中Food,Vehicle，Weapon是抽象类，
		public class DefaultFactory extends AbstractFactory{
		    @Override
		    public Food createFood() {
		        return new Apple();
		    }
		    @Override
		    public Vehicle createVehicle() {
		        return new Car();
		    }
		    @Override
		    public Weapon createWeapon() {
		        return new AK47();
		    }
		}

参考：
1. [工厂、工厂方法、抽象工厂的区别](https://stackoverflow.com/questions/13029261/design-patterns-factory-vs-factory-method-vs-abstract-factory)
2. [工厂模式](https://www.cnblogs.com/forlina/archive/2011/06/21/2086114.html)

### Java基础类库
#### Integer

    public static void main(String[] args) {
        Integer i01 = 59;
        int i02 = 59;
        Integer i03 = Integer.valueOf(59);
        Integer i04 = new Integer(59);

        System.out.println(i01 == i02); //true
        System.out.println(i01 == i03); //true
        System.out.println(i03 == i04); //false
        System.out.println(i02 == i04); //true
    }

#### String
	//1. 字面值常量池
	public static void main(String[] args) {   
        String a = "a1";   
        String b = "a" + 1;   
        System.out.println(a == b);//true
    } 

    //2.新变量（b的"ab"）在堆上
	public static void main(String[] args) {   
        String a = "ab";   
        String bb = "b";   
        String b = "a" + bb;   
        System.out.println(a == b);//false   
    }  

    //3.常量池
    public static void main(String[] args) {   
        String a = "ab";   
        final String bb = "b";   
        String b = "a" + bb;   
        System.out.println(a == b);//true   
    }  

    //4.函数返回新对象在堆上
	public static void main(String[] args) {   
        String a = "ab";   
        final String bb = getBB();   
        String b = "a" + bb;   
        System.out.println(a == b);//false   
    }   
    private static String getBB() {   
        return "b";   
    }  

    //5. 新变量在堆上；规范化从常量池取
    private static String a = "ab";   
	public static void main(String[] args) {   
	    String s1 = "a";   
	    String s2 = "b";   
	    String s = s1 + s2;   
	    System.out.println(s == a);//false   
	    System.out.println(s.intern() == a);//true   
	}  

	//6.同上
	private static String a = new String("ab");   
    public static void main(String[] args) {   
        String s1 = "a";   
        String s2 = "b";   
        String s = s1 + s2;   
        System.out.println(s == a);  //false 
        System.out.println(s.intern() == a);   //false
        System.out.println(s.intern() == a.intern()); //true  
    }  

### 容器
1. List：ArrayList、Vector、LinkedList
1. Map：HashMap、Hashtable

### 多线程

### Java虚拟机
1. 内存回收问题

### Web框架
1. 依赖反转
1. AOP的实现

### 数据库技术

## II. 工程技术
> 这部分了解面试人在代码版本管理、线上问题定位、工具使用方面的能力

### git
#### merge和rebase区别：
![](/assets/img/dev.jpg)
![](/assets/img/merge.jpg)
![](/assets/img/rebase.jpg)
#### gitflow、Github flow、Gitlab flow
![](/assets/img/gitflow.png)
参考：
1. [git工作流](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
1. [Git 使用规范流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)

## III. 学习能力
> 很重要的学习能力，但是还没想好要怎么去面试

