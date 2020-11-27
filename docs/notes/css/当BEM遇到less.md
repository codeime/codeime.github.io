---
title: 当BEM遇到less
date: 2019-10-08 14:47:34
categories: "css"
tags: [css,less]
---

如今的前端开发早已经不是多年前那个刀耕火种写css和html就能搞定的,那个时候的前端开发人员更偏向UI。现在确确实实是编程。

前端有今天的发展很大一部分离不开node, node对前端最大的贡献估计是在开发工具方面，各种脚手架等开发依赖上。

编写样式时更多的也是使用less、 sass、styl等,在开发效率上带来了巨大的提升。甚至可以使用scoped或者模块css避免不同组件模块样式影响，使得可以无脑的写样式。

无脑有时候也是有代价的---写着写着就会发现这层级嵌套简直是要了命,一个人开发还好，自己会注意尽量保持代码的简洁。总之嵌套太多对性能和维护来说都是噩梦,不然也不会有人去整BEM规范。

BEM其实很简单：

B ：block (块) 

E : Element （元素）

M : Modifier （修饰符）

例如一个弹窗组件 是个块,弹窗又有顶部的标题部分,中间的内容部分,底部的按钮部分。代码结构呈现出来：
```html
<div class="bing-dialog">
    <div class="bing-dialog__header"></div> 
    <div class="bing-dialog__body"></div> 
    <div class="bing-dialog__footer"></div> 
</div> 
```
如果用less来写这部分的样式怎么简介高效还直观尼,我的做法是这样的：
```less
.bing-dialog{
    position:fixed;
    top:20px;

    &__header{
        height:36px;
    }
    &__body{
        //一些样式
    }
    &__footer{
        //一些样式
    }
}
```
在经过less-loader编译之后的css是这样的
```css
.bing-dialog{
    position:fixed;
    top:20px;
}
.bing-dialog__header{
        height:36px;
    }
.bing-dialog__body{
 //一些样式
    }
.bing-dialog__footer{
 //一些样式
    }
```
上面的示例中已经展示了块和元素。

修饰常常来装饰元素的外观例如同一个按钮有几种不同的尺寸，输入框的大小，弹窗的大小等。
```less
.bing-dialog{
    position:fixed;
    top:20px;
    &--max{
        width:80%;
    }
    &--small{
        width:30%;
    }
    &--tiny{
        width:20%;
    }
}
```
东西不多也不难，但是要用好BEM其实不容易。记得要为每一个小细节而努力。






