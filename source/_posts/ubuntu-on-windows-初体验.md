---
title: ubuntu on windows 初体验
date: 2017-11-03 09:28:23
categories: "工具"
tags:
---

   早在10月17日的1709的版本更新中，Linux子系统正式来到win10,对于新鲜事物充满激情的我怎么也得折腾一番啊，ubuntu是Linux的一个发行版本而已。


![就是这个版本](http://upload-images.jianshu.io/upload_images/6191737-284dc956943a352e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


************************
#### 想要使用这个功能还得在win10中手动开启,步奏如下：

* 打开控制面板（可以在小娜的输入框搜索）

![打开控制面板](http://upload-images.jianshu.io/upload_images/6191737-c2579fea8c28ac00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 找到程序（查看方式选类别，然后点程序）

![打开程序](http://upload-images.jianshu.io/upload_images/6191737-4b3245d93ea6ce0a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 点击启用或关闭windows功能

![点击启用或关闭windows功能](http://upload-images.jianshu.io/upload_images/6191737-f7bbf634ede06336.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 选中‘适用于Linux的windows子系统’后一路确定，然后重启。

![开启该功能](http://upload-images.jianshu.io/upload_images/6191737-a52e67feaa96d768.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 重启后打开windows应用商店（现已更名为 Microsoft商店）搜索Linux,搜索框下方弹出的列表中会提示"在windows上运行linux",点击选中。

![离胜利还有一段距离](http://upload-images.jianshu.io/upload_images/6191737-4548c5de3b6ca7d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 安装第一个Ubuntu,大约得几分钟（网速快慢是关键），耐心等待片刻即可完成安装。

![第一个](http://upload-images.jianshu.io/upload_images/6191737-ac5ed11fcdb30a6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 安装完成之后会在开始菜单中找到一个Ubuntu的图标，点击启动(其实就是启动个terminal),启动后还要等待一会才能进入。第一次需要输入一个用户名和密码。

![ubuntu](http://upload-images.jianshu.io/upload_images/6191737-e2563a11ee6ac1fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到此为止安装算是完成了。
********************
#### 如果就这么结束了那真是没什么内容。那说说vim的安装、apt-get的换源、nvm的安装。
首先说说apt-get,是linux的一条命令或者说是管理工具，用来管理linux的软件资源包。node上的npm也是这么回事。

###### 1.vim安装
启动ubuntu终端命令行输入如下命令，回车，片刻后提示，再输入Y回车即可安装。

        sudo apt-get install vim-gtk

安装后对vim进行一些设置。（命令如下）这里是用vim打开的。

        sudo vim /etc/vim/vimrc
在vim中是通过上下左右键来操作的，输入要按"i"。退出要按Esc,然后 输入":"，再输入"wq"（写入并退出）;更多操作请移步这里----->[vim命令合集](http://www.cnblogs.com/softwaretesting/archive/2011/07/12/2104435.html)
![这个如果不是on请设置成on](http://upload-images.jianshu.io/upload_images/6191737-934cf349be02624c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
并在文本的最后输入如下文本（行号、tab长度4、不备份、凸显光标所在行 、所在行的行号、自动缩进）

    set nu                          
    set tabstop                  
    set nobackup              
    set cursorline               
    set ruler                       
    set autoindent             

     
完成之后vim就算是弄完了。
###### 2.apt-get的换源
由于某些原因，通常在国内下载一些资源的时候那个网速啊简直是
[▆▆...........................................] 1%
慢。
好在阿里那边有做国内的镜像，只需要把数据源切换到国内即可解决问题。

* 首先先将原来的数据源备份(cp命令是将原文件复制到某个文件)

      cp /etc/apt/sources.list /etc/apt/sources.list_backup

* 然后用 vim打开/etc/apt/sources.list

      sudo  vim /etc/apt/sources.list

* 用下面内容将原内容替换

      deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse                                                                  
      deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
      deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
      deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
      deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
      deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
      deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
      deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
      deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
      deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse


* 保存后升级apt-get

      apt-get update

到这里apt-get的换源算是结束了。

###### 3.nvm的安装
首先到nvm的github的地址[这里这里就是这里](https://github.com/creationix/nvm)看看，你看这，找到了。拷贝任意一个在bash（即ubuntu的终端）中。![安装和更新都可耍](http://upload-images.jianshu.io/upload_images/6191737-1fe132141124203d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
一路确认加回车nvm就安装ok了。于是就可以用nvm安装你想要安装的node版本了。
至于安装node我这里就不在赘述了，这里安装起来还是很方便的，不像win上要配置一堆环境变量。
值得注意的是要通过nvm命令来指定一个默认的node，不然启动bash后输入node是没有反应的，还得重新nvm use 一下才行。下面是指定默认启动的命令

      nvm alias default <node版本号>
还有就是安装cnpm，和win上一模一样这里还是把命令贴出来吧

       npm install -g cnpm –registry=https://registry.npm.taobao.org

再贴一个小技巧：在使用ubuntu on windows的时候磁盘都是挂载在 /mnt/下 例如切换到c盘是 cd /mnt/c
有时候我们的项目目录很深输入起来麻烦 ，这时候可以在项目目录下按住shift键+鼠标右键 然后选择"在此处打开powerShell窗口"，进入后输入bash,这样bash所在的目录就在项目目录下![在此处打开powerShell窗口](http://upload-images.jianshu.io/upload_images/6191737-4a4ec741b6396405.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![输入bash后就可以用linux上的node来运行gulp了](http://upload-images.jianshu.io/upload_images/6191737-694dad8f9208cdd7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




win上安装nvm那么请移步[nvm的安装](http://blog.csdn.net/tyro_java/article/details/51232458)。
***********************
至于更多，仍在摸索中........................
