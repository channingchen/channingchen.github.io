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

* Tuple：元组与列表类似，但元组的元素不可更改，元组写在小括号中。可以把字符串看作一种特殊的元组。

		#!/usr/bin/python3
		 
		tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
		tinytuple = (123, 'runoob')
		 
		print (tuple)             # 输出完整元组
		print (tuple[0])          # 输出元组的第一个元素
		print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
		print (tuple[2:])         # 输出从第三个元素开始的所有元素
		print (tinytuple * 2)     # 输出两次元组
		print (tuple + tinytuple) # 连接元组

* Sets：支持集合运算，\-差，\|并，&交，^补，空集合使用set()初始化，空字典使用{}初始化。

		#!/usr/bin/python3
		 
		student = {'Tom', 'Jim', 'Mary', 'Tom', 'Jack', 'Rose'}
		print(student)   # 输出集合，重复的元素被自动去掉
		 
		# 成员测试
		if('Rose' in student) :
		    print('Rose 在集合中')
		else :
		    print('Rose 不在集合中')
		 
		# set可以进行集合运算
		a = set('abracadabra')
		b = set('alacazam')
		 
		print(a)
		print(a - b)     # a和b的差集
		print(a | b)     # a和b的并集
		print(a & b)     # a和b的交集
		print(a ^ b)     # a和b中不同时存在的元素

* Dictionary（Map）

		#!/usr/bin/python3
		 
		dict = {}
		dict['one'] = "1 - 菜鸟教程"
		dict[2]     = "2 - 菜鸟工具"
		 
		tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}
		 
		print (dict['one'])       # 输出键为 'one' 的值
		print (dict[2])           # 输出键为 2 的值
		print (tinydict)          # 输出完整的字典
		print (tinydict.keys())   # 输出所有键
		print (tinydict.values()) # 输出所有值

		# 常用构造方法
		>>>dict([('Runoob', 1), ('Google', 2), ('Taobao', 3)])
		{'Taobao': 3, 'Runoob': 1, 'Google': 2}
		 
		>>> {x: x**2 for x in (2, 4, 6)}
		{2: 4, 4: 16, 6: 36}
		 
		>>> dict(Runoob=1, Google=2, Taobao=3)
		{'Taobao': 3, 'Runoob': 1, 'Google': 2}

### Python数据类型转换

| 函数 | 描述 |
| --- | --- |
| int(x [,base]) | 将x转换为一个整数 |
| float(x) |将x转换到一个浮点数 |
| complex(real [,imag]) |创建一个复数 |
| str(x) |将对象 x 转换为字符串 |
| repr(x) |将对象 x 转换为表达式字符串 |
| eval(str) |用来计算在字符串中的有效Python表达式,并返回一个对象 |
| tuple(s) |将序列 s 转换为一个元组 |
| list(s) |将序列 s 转换为一个列表 |
| set(s) |转换为可变集合 |
| dict(d) |创建一个字典。d必须是一个序列 (key,value)组。|
| frozenset(s) |转换为不可变集合 |
| chr(x) |将一个整数转换为一个字符 |
| unichr(x) |将一个整数转换为Unicode字符 |
| ord(x) |将一个字符转换为它的整数值 |
| hex(x) |将一个整数转换为一个十六进制字符串 |
| oct(x) |将一个整数转换为一个八进制字符串 |

# 运算符
### 算术运算符

|运算符|描述|实例|
|---|---|---|
|+|加 - 两个对象相加|a + b 输出结果 31|
|\-|减 - 得到负数或是一个数减去另一个数|a \- b 输出结果 \-11|
|\*|乘 - 两个数相乘或是返回一个被重复若干次的字符串|a \* b 输出结果 210|
|/|除 - x 除以 y|b / a 输出结果 2.1|
|%|取模 - 返回除法的余数|b % a 输出结果 1|
|\*\*|幂 - 返回x的y次幂|a\*\*b 为10的21次方|
|//|取整除 - 返回商的整数部分|9//2 输出结果 4 , 9.0//2.0 输出结果 4.0|

### 逻辑运算符：没有 &&、\|\|和!，替代的是and，or，not

### 成员运算符

|运算符|描述|实例|
|in|如果在指定的序列中找到值返回 True，否则返回 False。|x 在 y 序列中 , 如果 x 在 y 序列中返回 True。|
|not in|如果在指定的序列中没有找到值返回 True，否则返回 False。|x 不在 y 序列中 , 如果 x 不在 y 序列中返回True。|

### 身份运算符
* is 等同于 id()，判定两个标识符是否引用到同一对象（**类似Java中==**）；
* == 引用变量的值是否相等（**类似Java中的equals**）；

		#!/usr/bin/python3
		>>>a = [1, 2, 3]
		>>> b = a
		>>> b is a 
		True
		>>> b == a
		True
		>>> b = a[:]
		>>> b is a
		False
		>>> b == a
		True

# python 数字
### 常用数学函数：

|函数|返回值 ( 描述 )|
|---|---|
|abs(x)|返回数字的绝对值，如abs(-10) 返回 10|
|ceil(x)|返回数字的上入整数，如math.ceil(4.1) 返回 5|
|cmp(x, y)|如果 x < y 返回 -1, 如果 x == y 返回 0, 如果 x > y 返回 1。 Python 3 已废弃 。使用 使用 (x>y)-(x<y) 替换。|
|exp(x)|返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045|
|fabs(x)|返回数字的绝对值，如math.fabs(-10) 返回10.0|
|floor(x)|返回数字的下舍整数，如math.floor(4.9)返回 4|
|log(x)|如math.log(math.e)返回1.0,math.log(100,10)返回2.0|
|log10(x)|返回以10为基数的x的对数，如math.log10(100)返回 2.0|
|max(x1, x2,...)|返回给定参数的最大值，参数可以为序列。|
|min(x1, x2,...)|返回给定参数的最小值，参数可以为序列。|
|modf(x)|返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。|
|pow(x, y)|x**y 运算后的值。|
|round(x [,n])|返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。|
|sqrt(x)|返回数字x的平方根。|

### 随机数函数

|函数|描述|
|---|---|
|choice(seq)|从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数。|
|randrange ([start,] stop [,step])|从指定范围内，按指定基数递增的集合中获取一个随机数，基数缺省值为1|
|random()|随机生成下一个实数，它在[0,1)范围内。|
|random.randint(x,y)|#随机生一个整数int类型，可以指定这个整数的范围|
|seed([x])|改变随机数生成器的种子seed。如果你不了解其原理，你不必特别去设定seed，Python会帮你选择seed。|
|shuffle(lst)|将序列的所有元素随机排序|
|random.sample(sequence,length)|可以从指定的序列中，随机的截取指定长度的片断，不修改原序列。|
|uniform(x, y)|随机生成下一个实数，它在[x,y]范围内。|

# 字符串

### 字符串格式化

	#!/usr/bin/python3
	print ("我叫 %s 今年 %d 岁!" % ('小明', 10))

### 三引号
python三引号允许一个字符串跨多行，字符串中可以包含换行符、制表符以及其他特殊字符，三引号让程序员从引号和特殊字符串的泥潭里面解脱出来，自始至终保持一小块字符串的格式是所谓的WYSIWYG（所见即所得）格式的。