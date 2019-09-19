---
title: dart语言基础 一
date: 2019-09-19 20:31:52
tags: ['dart']
---

# 1. 万物起源 'hello world'

首先是入口函数 main (程序的入口)， void 指明该函数的返回值为空或者说没有返回值
``` dart
void main(){
  print('hello world')
}
```

# 2. 数据类型

## 2.1  var 和 dynamic

var 声明的变量（在编译时期）会自动推断变量类型

比如你这个人很懒，类型都不想写，所以写出来的代码是下面这坨（这个字自己领会）
```dart
var a = 123;
var v = "123";
```
这两行代码在编译之后其实是有类型的和如下代码一样的效果
```dart
num a = 123;
String v = "123";
```
一个类型一断确定就不可以变成其他类型
```dart
var a = 123;
a="123";  //此时编辑器就会飘红告诉你说 ‘一个String类型的值不能赋值给一个int类型的变量’
```
偏偏有些时候,代码是这样的
```dart
var a;
a = '123';
a = 123;
```
这个代码是完全可以跑起来的，怎么回事？前面不是说'一个类型一断确定就不可以变成其他类型',其实这句话没错,错的是'var a;'这句没法推断出类型啊，所以就按dynamic类型来处理的。dynamic就是它的字面意思。dynamic 会关闭类型检查,它声明的变量类型在运行时才会确定。
```dart
dynamic a = "123";
a = 456;
a.foo();  // 这一句在我们写代码的时候完全不会提示有错误，在代码运行的时候走到这里就会crash
```
## 2.2 const 和 final

在 dart 里 const 和 final 都是用来定义常量的，那为啥子定义个常量要搞两个关键词尼？其实区别是 const 是编译时常量,而 final 是运行时常量。

const 关键字定义的常量在代码中写死。
```dart
const num w = 300;  
w = 200; // 此时编辑器会提示 w是个常量不能赋值，要么移除w定义前面的const关键字，要么移除 这行代码。
```
final 关键字定义该值只能被赋值一次。只是它的具体的值在编译期可以为null 待到运行时才确定。
```dart 
void foo(int a){
    final int aa = a;
    print(aa);
}
foo(123);
foo(456);
foo(789);
```
## 2.3 数据类型

* anumber 类型: num int double
int 和 double 继承 num
```dart
int a = 12;
a.isEven  // true
a.isOdd   // false
double b = 6.5;
```
常用方法有 toDouble、 toInt、 round、 ceil、 floor

* 字符串 String 
```dart
String str1 = 'test \n test';
String str2 = r'test \n test'; // r会使转义失效

可以先javascript es6中一样使用模板字符串(稍有区别)

String split= '-----';

String str3 = 'test${split}test';

String str4 = '123$split';

print(str3);
```
* 布尔 boolean
```dart
bool isLoading = false;
```

* 数组 List
```dart
List list= [];
list.add(123);

List list1= new List(5);
print(list1)

list.asMap() // 转换成 map 类型
```
* 键值对 map
```dart
Map m = {1:123,2:456};
print(m[1])

Map m2 = new Map()

// 常用属性
m2.length
m2.isEmpty // 返回布尔值
m2.isNotEmpty // 返回布尔值
m2.keys // 返回素有的键
m2.values // 返回所有的值

//常用方法
m2.containsKey(1) 
m2.containsValue(123)

```
# 3.运算符

## 3.1 算术运算
加、减、乘、除、取整、取余
```dart
  int a = 11;
  int b = 2;
  print(a + b);
  print(a - b);
  print(a * b);
  print(a / b);
  print(a ~/ b);
  print(a % b);

  print(a++);
  print(a);
  print(++a);

  print(a--);
  print(a);
  print(--a);

```
## 3.2 赋值运算

dart 中有个比较风骚的赋值操作符  ??=

```dart  
  int a;
  int b = 2; 
  
  a?? = 10; // a 为 null 吗？ 是：将 10 赋值给 a; 不是：不进行操作。双问号起短路作用 
  b?? = 2;
  
  print(a);
  print(b)
```
另外就是一些很平常的赋值操作
```dart
  int a = 10;
  int b = 5;
 
  a += 2;
  print(a);

  a -= 5;
  print(a);

  a *= 2;
  print(a);

  // a /= 2;
  a ~/= 2;
  a %= 2;
```
## 3.3 条件表达式（三目运算）

```dart
  int color;
  int nowColor= color == null ?'red':color;
  // 在dart中 ？？ 操作符可以简化这种操作
  
  int nowColor = color??'red' 
  
```

## 3.4 逻辑运算
与或非
```dart
  bool isTrue = true;
  print(!isTrue);

  bool isFalse = false;
  print(isTrue && isFalse);
  print(isTrue || isFalse);

  String str = '';
  print(!str.isEmpty);
```
## 3.5 关系型运行算符
关系型运算符常用来比较两个值之间的关系返回true或false,常用在流程控制语句中。
```dart
  int a = 5;
  int b = 4;

  print(a == b);
  print(a != b);

  print(a > b);
  print(a < b);

  print(a >= b);
  print(a <= b);


  String str1 = '123';
  String str2 = '123';
  print(str1 == str2);
```

# * 4. 流程控制语句 

if switch for  while (do while)   break continue

# 5. 函数

* dart是强类型的语言,在函数的声明（定义）时，要明确指定参数的数据类型以及该函数的返回值类型，没有返回值时返回值类型是 void
```dart 
  String getAllName(String firstName,String secondName){
      return '${firstName}-${secondName}';
  }
```

* 函数的类型是 Function , 可以将函数当作参数传入到调用的函数中，也可以调用一个函数返回一个新的函数（有关闭包）

```dart
  doSomething((String name){
      print(name);
  });
  
  void doSomething(void callback(String name)){
      callback('123');
  }
  
  int a = 10;
  Function fn = getSomeFn()
  fn();
  
  void getSomeFn(){
      int a = 123;
      return (){
          print(a);
      };
  }
```
* 匿名函数，顾名思义匿名函数就是没有名字的函数。在上面的 getSomeFn 中已经出现过了匿名函数。下面是一些立即执行的匿名函数
```dart
  // 写法一
  ((a) {
    print(a);
  }(123));

  // 写法二
  (a) {
    print(a);
  }(456);

  // 写法三
  ((a) {
    print(a);
  })(789);

```

* 函数参数之可选参数。

dart 提供非常灵活的传参方式，这对编程体验来非常棒；dart 中函数的可选参数需要用 {} 包裹，放在必选参数的后面。
```dart
  fn1('bing', 18);
  fn2('bing');
  
  void fn1(String name, int age) {
    print('name=$name,age=$age');
  }
  
  void fn2(String name, {int age}) {
    print('name=$name,age=$age');
  }
```
* 函数参数之默认值。

在上面可选参数的示例中如果可选参数没有传则默认为 null ,有些时候这可不是我们想要的，这时候可以给可选参数设置默认值,当没有传该值的时候参数会自动取默认值。
```dart
  fn2('bing');
  
  void fn2(String name, {int age = 18}) {
    print('name=$name,age=$age');
  }
```

值得注意的是 必选参数 在传值的时候必须按照参数列表的顺序
而可选参数则不必，但是 必须 以 ‘参数名:值’的方式传值。


----未完 待续----