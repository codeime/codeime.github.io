---
title: less is more
date: 2017-07-17 16:30:10
categories: "css"
tags:
---
『less is more』这句名言是著名的现代主义建筑大师——密斯·凡·德·罗提出的。

这篇所说的less是一种css的扩展语言,css的扩展有两种常见的：less和sass,至于这两者的不同请自行百度或者bing或者google。

你看看人家一个搞建筑的都知道less is more,充分的说明了less好用，不用苦逼的写css了。

至于less的作用：当然是偷懒，，，，，，，，俗话说: 不会偷懒的码农肯定不是好码农。（对，这俗话说得一本正经，尽管是在胡说八道）。

好了，好了，不瞎掰了。来说说less is more。

* * *

### 1.less的变量

通常UI的设计稿拿到手之后先观摩一番,一般一个产品会定主色以及辅色，在拾取颜色之后通过变量来存这些颜色，less变量以@开头，sass变量以$开头(所以写sass钱多)。

然后页面中有使用的地方只需要引用变量名即可

![image](http://upload-images.jianshu.io/upload_images/6191737-a484630cc14188ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样less中各个地方都引用了定义的颜色值的变量，好处在于哪天UI大脑抽风了改个颜色搭配或者老板又去看了下风水，风水大师给网站卜了个良颜吉色，然后甩给你一句话:改。然后就把变量中定义的颜色一换，三下五除二就ok了。

* * *

### 2.less的混合

通常在页面中有很多布局相同的地方，有些地方大多可以起个相同的类名给样式，也不排除有些情况没法用同个类名搞定，但布局样式什么的又有些相同，面临不想提取公共类名又不想再把样式敲一遍（复制过去都觉得多余）的尴尬，这时候其实是自己得取舍问题，有一个很微妙的平衡点需要自己去感受，可能做得多了就会很轻松的找到这个点然后去决定是提取公共样式新建类名还是混合。

关于混合，我只想给一张简单的示例图。

![image](http://upload-images.jianshu.io/upload_images/6191737-681128e8532c103d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

是不是够简单够明了。

* * *

### 3.带参数的混合

其实还是混合，多了个参数而已，没什么。其实我更觉得像定义了一个方法，所以单独弄出来。其实没什么，只是有些坑踩了之后要长记性，不然下次还是溅自己一腿臭泥。

![image](http://upload-images.jianshu.io/upload_images/6191737-1d1b5afaca439701.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是写在ul 下的li中的五个li下面有单独的的a,每个有不同的背景色，鼠标滑上时背景色变深。不想给li取类名，不想给a取类名。于是便有了图中 的带参混合。注意在取参数@xxx的时候 字符串和一些选择器中需要参数的地方 取参数的方式是  @{xxx},上图的&:nth-of-type(@{index})及下图路径中拼接部分就是一个很好的示例。

![image](http://upload-images.jianshu.io/upload_images/6191737-35e4e440adda770d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

值得注意的是通常在url()我们会省去' '的使用，这将使得参数拼接不可用。

另外还有默认参数的情况如下图

![image](http://upload-images.jianshu.io/upload_images/6191737-4fc166587cb6a02c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

### 4.less嵌套

这大概是less这类css扩展语言的精髓之处吧。

之前写css ，一个div下两个小div,写css就是：

![image](http://upload-images.jianshu.io/upload_images/6191737-033ddb468611ca99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

更有甚者 会写三四层，写起来繁琐还难于阅读。

在less下是这样的：

![image](http://upload-images.jianshu.io/upload_images/6191737-bb20f204140a742c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有时候我们会写一些伪元素或者伪类（听起来怎么这么怪）。这时候就要注意了，比如我想让类名为.bigTitle的元素在鼠标滑上的背景变红，那么下图所示的做法就是错误的：

![image](http://upload-images.jianshu.io/upload_images/6191737-717e30596631e09d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么正确的做法是 在:hover前加&，这个&就表示上级标签，正确写法如下：

![image](http://upload-images.jianshu.io/upload_images/6191737-1b9fb59816c99099.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 5.注意点

width:calc(100%/4 - 10px)这种在less中写的挺好，但是编译成css的过程中会把这个给计算了，想要的是在css中还是width:calc(100%/4 - 10px)；那么在less中写的时候用e( )，这样计算就不会被解析：

![image](http://upload-images.jianshu.io/upload_images/6191737-3da28bc2682097d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

还有一种写法是width:calc(~"25% - 12px")。

### 6.那么

跟着我念：less is more.

断断续续写着早忘了最初的思路。缺了啥错了啥自己都不知道。