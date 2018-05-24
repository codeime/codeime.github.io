---
title: 尝试cmder
date: 2018-05-19 21:57:00
categories: "工具"
tags: ["windows"]
---

一直苦于windows的命令行不好看，尽管powershell很强大，可是用过git bash之后就不想用powershell了，可是git bash也有它不好的地方令人很是痛苦啊（npm install 命令没进度.....这体验）。
  
win10子系统的ubuntu bash到是很好看还可以耍oh-my-zsh,但是为了个命令行装个子系统这代价是不是太大了。

后来听人们说 Cmder很好用啊，所以就尝试了下。

看看很不错吧，在这里可以用cmd、powershell、git bash。还可以开启多个tab页任意切换。

![Snipaste_2018-05-20_19-48-11.png](https://upload-images.jianshu.io/upload_images/6191737-daf9d3f5e83f3adb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### 1. 首先下载安装包（解压到某个位置）

[cmder下载](http://cmder.net/)

##### 2. 配置环境变量

先配置个CMDER_HOME 值是解压的那个位置
![Snipaste_2018-05-20_21-04-59.png](https://upload-images.jianshu.io/upload_images/6191737-1701dca91b899d04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


然后在path中添加  ;%CMDER_HOME%
![Snipaste_2018-05-20_21-06-24.png](https://upload-images.jianshu.io/upload_images/6191737-69c7f29be962e30f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后一路确定就ok

##### 3. 设置鼠标右键

这个需要用管理员运行powershell或者cmd,然后输入如下命令就行了
```
Cmder.exe /REGISTER ALL
```
然后在桌面鼠标右键单击就会有 Cmder here
![Snipaste_2018-05-20_21-27-29.png](https://upload-images.jianshu.io/upload_images/6191737-cd7b448b422b25e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在Cmder中就可以尽情挥洒。