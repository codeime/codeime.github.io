---
title: 在多个设备上同步sublime设置
date: 2017-06-05 16:37:34
categories: "工具"
tags: ["sublime"]
---
平时在家一台电脑，在公司一台电脑。时而在家也会敲敲代码，有时在家或者在公司发现有比较好的sublime插件都会安装体验一番，或者配置了什么快捷键，改了一些比较养眼的颜色主题之类的。随之而来的就是比较蛋疼的地方，在家弄了sublime后还得记着到公司弄一遍，在公司新装了个插件回家在自己的电脑上还得装一遍。于是乎便寻思着有没有这样一种东西可以在一个地方改了设置之后在另个地方也会同步的更改。接着便发现了sublime有个sync settings的插件。

* * *

##### 1.首先在sublime上安装sync settings的插件。

此处无图

* * *

##### 2.让我们打开github，登上账号；

此处无图

* * *

##### 3.点自己的头像，进入Settings

![image](http://upload-images.jianshu.io/upload_images/6191737-ac5a4bd299bcae83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

##### 4.进入之后点击侧边栏的Developer Settings

![image](http://upload-images.jianshu.io/upload_images/6191737-d7ba80d786e6d81e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

##### 5.进入之后再次点击侧边栏的Personal access tokens

![image](http://upload-images.jianshu.io/upload_images/6191737-a64d7f8313a695fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

##### 6.进入之后可以看到一个如下图的页面，我的已经创建了两个token

![image](http://upload-images.jianshu.io/upload_images/6191737-3868c957ef3330de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以点图中箭头的地方创建新的token

* * *

##### 7.输入该token的一个描述，选择下下图中选中的gist_id;点击最下的按钮。

![image](http://upload-images.jianshu.io/upload_images/6191737-36f522f3dea86bbe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](http://upload-images.jianshu.io/upload_images/6191737-7c3aca0cb99b35c4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

##### 8.有了一个新的token后，复制它

![image](http://upload-images.jianshu.io/upload_images/6191737-494fb2c66b4046fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

##### 9.到sublime里找到sync settings的用户设置部分

![image](http://upload-images.jianshu.io/upload_images/6191737-568a8c5875f706eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

##### 10.打开时将看到一篇空白，没错就是一片空白，于是可以参照着sync settings的默认设置来写。

![image](http://upload-images.jianshu.io/upload_images/6191737-d1308d607707f2af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

一开始只有输入token 然后设置下自动升级。

* * *

##### 11.保存后  ctrl shift p >输入sync 选择如图所示的选项，会让输入一个描述（随意输），然后不出意外的话就会告诉你成功了，会自动填充gist_id到用户设置里，只需要记着用户设置里的token 和gist_id然后到另一台设备的sublime上安装syncSettings插件，在用户设置里将token和gist_id填入，之后就可以愉快的玩耍了。

![image](http://upload-images.jianshu.io/upload_images/6191737-652979b6460bdc07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* * *

本来想在前面寒暄几句，打了几行字遂作罢。既然这样就直入主题得了，有时间的话再专门寒暄。

* * *

那么 亲爱的vs code用户，请在扩展里搜索Settings Sync 。配置的方式也差不多。



<br>