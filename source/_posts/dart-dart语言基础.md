---
title: dart语言基础
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


# 6. 面向对象

在面向对象的语言设计中，对象通常是类的实例，而类（class）则是对象的一种抽象，描述这一类对象具有的属性和行为特征。

## 6.1 类的申明、对象创建、属性、方法、可见性、计算属性
在dart中描述一个类需要使用 class 关键字,而实例化一个对象则需要使用 new 关键字来说明是新建一个对象(注意：在dart 2 中可以将new 关键字省略)

```dart
class Person{
  // 一些 属性和行为
}
Person xiaoming = new Person()

Person xiaowang = Person()
```

类中的属性会默认生成 getter setter 方法,当对一个实例的某个属性赋值或者取值时其实是调用的setter getter方法。

```dart
class Person{
   String name;
   int age;
}

Person xiaoming= new Person();

xiaoming.name = "wangxiaoming";
xiaoming.age=19;

print(xiaoming.name);
print(xiaoming.age);
```

私有属性,私有方法。 dart 中没有private等关键字,目前在类中设置一个私有属性是通过 _ 的方式

```dart
class Person{

    String _secret;

    void _run(){
       print('xxx')
    }

}
```
我们也可以给类加上 _ ，表是该类只在当前文件（模块）中可以访问到。


计算属性。 计算属性的值当然是通过计算得到的
```dart


 Rectangle rect = new Rectangle();
  rect.height = 20;
  rect.width = 10;
  print(rect.area);

class Rectangle {
  num width, height;
  
  num get area => width * height;
  set area(value) {  //给area属性赋值时，可以计算出其他属性的值
    width = value / 20;
  }
}
```

## 6.2 构造方法、命名构造方法、常量构造方法、工厂构造方法

构造函数和类同名,在类初始化的时候调用用来给对象成员赋初始值
```dart
class Person {
    String name;
    Person(String name){
        this.name = name
    }
}
```

首先dart中构造方法并不能重载,如果一个类中要实现多个构造方法可以使用命名构造方法。

```dart 
class  Person{
    String name;
    int age;
    Person(String name,int age){
        this.name = name;
        this.age = age;
    }
    Persom.withName(String name){
        this.name = name;
    }
    Person.withAge(int age){
        this.age = age;
    }
}
```

常量构造函数,能够生成一个不再改变的对象。构造函数用const修饰，所有的属性采用 final 修饰。前面说过const 修饰的常量是编译时常量 。创建编译时常量只需要在调用构造函数 前加上 const 关键字即可。如果已经在一个常量上下文中那么调用构造函数前的const关键字可以省略。

两个用相同参数生成的常量对象其实是同一个对象

更多关于常量构造函数的讲解或示例可以到[官方文档](https://dart.dev/guides/language/language-tour#constant-constructors)查看.


```dart
class Person{
    final String name;
    final int age;
    const Person(this.name,this.age)
}

const Person p = const Person('bing',18);
const Person p2 =  Person('bing',18);
p==p2 // true
```

工厂构造方法，在实现构造函数时添加 factory 关键字实现一个工厂构造方法。工厂函数额调用和普通函数的调用一样。(工厂构造方法中不能访问 this )

```dart
Logger logger = Logger('test')
logger.log('Button clicked');

class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => Logger._internal(name));
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

## 6.3 初始化列表、静态成员、操作符、call方法

在构造函数的函数体运行前，除了调用父类的构造方法,还可以初始化实例的变量。有时,当类的某些属性是 final 属性时,初始化列表将很有帮助。
```dart
class Person {
  String name;
  int age;
  final String gender;

  Person(this.name, this.age, this.gender);

  Person.withMap(Map map) : gender = map['gender'] {
    this.name = map['name'];
    this.age = map['age'];
  }
  Person.withMap2(Map map)
      : gender = map['gender'],
        name = map['name'] {
    this.age = map['age'];
  }
  void work() {
    print('work');
  }
}
```
*注意在初始化列表的右侧不能访问this

```dart
// 右侧指的时 等号 的右边  map['gender']
Person.withMap(Map map) : this.gender = map['gender'] 
```

dart 中类的静态成员使用static关键字修饰。静态成员直接通过 className.xxx 来访问。静态变量在初次访问时初始化，静态方法中不能访问类实例this。
```dart
class Page {
  static const int max = 10;
  static int now = 1;
  static void pullDown() {
    now = 1;
  }

  void pullUp() {
    now++;
  }
}
print(Page.max)
```

对象操作符

```dart
 // 1. 条件成员访问 ？.
  Person person;
  person?.work(); // person存在时调用work
  // 2. 类型转换
  var p;  // 前面说过var 在运行时会推断类型，但是没有初始值的时候 var 和 dynamic 一样 ,所以下面的 as 就是类型转换 
  p = "";
  p = new Person();
  (p as Person).work();
  //3. 是否指定类型 is,is!
  var p2;
  p2 = '';
  if (p2 is Person) {
    p2.work();
  }
  if (p2 is! Person) {
    print('ohohoo');
  }
  // 4.级联操作  ..   （..会返回原对象）
  Person pp = new Person();
  pp
    ..name = "bing"
    ..age = 21
    ..work();


```

call , 对象中实现call方法后，对象的实例可以看作一个方法来调用。

```dart
Person p = new Person();
  p.work();
  p('bing', 30);

class Person {
  String name;
  int age;
  void work() {
    print('work...');
  }

  void call(String name, int age) {
    print('my name is $name,and my age  is $age');
  }
}
```



----未完 待续----