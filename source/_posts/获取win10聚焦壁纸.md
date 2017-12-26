---
title: 获取win10聚焦壁纸
date: 2017-12-26 21:03:32
tags: ['nodejs','win10']
---


每次，当我打开电脑。看到win10那美美的锁屏壁纸都舍不得进入，在那静静欣赏。
每天，它都以不同的姿态展示（首先得设置锁屏壁纸为win10聚焦，如下图）。某天觉得当天的锁屏壁纸特别好看想把它保存下来，于是便开始找win10聚焦的壁纸在电脑的哪个地方。
![设置锁屏为win10聚焦](http://upload-images.jianshu.io/upload_images/6191737-aa6e37f2a860c860.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


费了九牛二虎之力（假的），果然功夫不负有心人，win10的壁纸默认保存在如下的目录中：

```
C:\Users\bing\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets
```
目录下的文件是这样的：（黑人？？？）
![聚焦的文件](http://upload-images.jianshu.io/upload_images/6191737-eaa3958a828aadfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

聪明的我又想到了：要不手动加个后缀名。正如聪明的我想的这样是行得通的。通过一连串帅气的操作：
    1. ctrl+a全选，ctrl+c复制，
    2. 到桌面 新建文件夹 
    3. 进入刚刚新建的文件夹 ctrl+v。
然后一个个改名？no no no.作为一个爱偷懒的人我是不会这个做的。

首先 想到 cmd的ren命令
   1.在刚刚新建的文件夹下新建一个文本文件
   2.用记事本打开  键入  
   ```
   ren * *.png
   ```
   3.重命名该文本文件为 xxx.bat
   4.点击.bat文件，然后该文件夹下所有的文件都变成以.png结尾的文件

不就之后 我写了几句java,带界面的选择文件夹后自己手动键入后缀名来批量修改，不过还是得手动拷贝出来之后。运行效果如下：
![image.png](http://upload-images.jianshu.io/upload_images/6191737-2c45554db973986d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/6191737-23ec226da9514a37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以说是异常的简单。


好了，毕竟上面的都是过去的事了。
最近我在想我要自动拷贝win10聚焦的图片到某个文件夹下。
