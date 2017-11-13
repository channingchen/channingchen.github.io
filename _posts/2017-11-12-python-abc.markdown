---
layout: post
title: "python ABC"
date: 2017-11-11 00:22:18
categories: Programming
tags: Python,ABC
---
![](/assets/img/python.jpg)
# 基础语法
### 编码
默认UTF-8 编码,可以指定不同的编码：
	
	-*- coding: cp-1252 -*-

### 标识符
字母、数字、下划线组成，必须字母、下划线打头。

### 保留字
	>>> import keyword
	>>> keyword.kwlist
	['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']

### 注释
	# 这是一个注释

### 行与缩进
缩进代表代码块，同一代码库缩进空格数相同即可，不限定空格数。

### 多行语句
	total = item_one + \
        item_two + \
        item_three

### 多个语句构成代码组（if、while、def、class）
	#!/usr/bin/python3
	if expression : 
	   suite
	elif expression : 
	   suite 
	else : 
	   suite

### import与from...import
* 将整个模块(somemodule)导入，格式为：import somemodule
* 从某个模块中导入某个函数,格式为： from somemodule import somefunction
* 从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc
* 将某个模块中的全部函数导入，格式为： from somemodule import *

---

# Python3 基本数据类型
变量不需要声明，使用前都必须赋值，赋值后才会被创建。
变量没有类型，我们所说的"类型"是变量所指的内存中对象的类型。

### 多变量赋值
	a=b=c=1
	a,b,c=1,2,"name"

### 标准数据类型
* Number
	1. int：1
	1. float：5.5
	1. bool：True
	1. complex：4+3j
* String:：''或""括起，\\转义特殊字符，字符串不可改变

		#!/usr/bin/python3
		str = 'Runoob'
		
		print (str)          # 输出字符串
		print (str[0:-1])    # 输出第一个到倒数第二个的所有字符
		print (str[0])       # 输出字符串第一个字符
		print (str[2:5])     # 输出从第三个开始到第五个的字符
		print (str[2:])      # 输出从第三个开始的后的所有字符
		print (str * 2)      # 输出字符串两次
		print (str + "TEST") # 连接字符串

* List

		#!/usr/bin/python3
		list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
		tinylist = [123, 'runoob']
		 
		print (list)            # 输出完整列表
		print (list[0])         # 输出列表第一个元素
		print (list[1:3])       # 从第二个开始输出到第三个元素
		print (list[2:])        # 输出从第三个元素开始的所有元素
		print (tinylist * 2)    # 输出两次列表
		print (list + tinylist) # 连接列表

* Tuple


* Sets
* Dictionary
