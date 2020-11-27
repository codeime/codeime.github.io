---
title: windows上docker安装及使用
date: 2018-09-23 17:20:00
---

### 首先下载安装程序
windows的话首先确认windows是win10专业版，并且开启了cpu虚拟化和hyper-v,如果不是请下载docker-toolbox。
其实他们的区别就是一个是是在windows在自带的虚拟机中运行一个是安装第三方的虚拟机。
下载地址：（下载的是社区版本，即ce）
```
https://www.docker.com/products/docker-desktop
```
### 安装
点击下载好的安装程序，按照提示下一步，下一步基本就没什么问题了。


![Snipaste_2018-09-24_09-43-24.png](/img/dockerWin/6191737-c0b8f241a35da89b.png)


这里可以选择使用windows容器,不选的话就默认使用linux容器。那就默认使用linux容器吧。

### 运行 
打开安装好的程序，待桌面右下角出现这样的图标的时候说明docker已经运行起来了。


![image.png](/img/dockerWin/6191737-7a85c6e083bb7542.png)


然后打开终端，键入如下命令
```
docker version
```
可以看到如下输出，说明docker是完全跑起来了。


![image.png](/img/dockerWin/6191737-e15128f4ca6bf1b6.png)



### 使用
首先先看下有没有下载过的镜像
```
docker images
```
输出如下，可以看到现在并没有安装任何镜像


![image.png](/img/dockerWin/6191737-171268e2f5c4c925.png)



为了演示，先下个mysql
```
docker pull mysql
```


![image.png](/img/dockerWin/6191737-b56ddc691c463c28.png)



这样mysql镜像就下载好.再次查看镜像就会发现多了一个mysql


![image.png](/img/dockerWin/6191737-5b37c4f6b47ebbbd.png)



接下来运行mysql这个镜像,并初始化密码，数据库。
```
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=bing mysql 
```
-d 在后台运行
-p 指定端口 将本机的3306端口映射带容器的3306端口
运行之后将输出容器的id


![image.png](/img/dockerWin/6191737-13fcabddb6d4dcff.png)



然后可以通过命令查看正在运行的容器
```
docker ps
```


![image.png](/img/dockerWin/6191737-2cc7013e03bfa729.png)


用Navicat连接一下试试,嗯，完全没问题。


![image.png](/img/dockerWin/6191737-c0677f700f54de55.png)



接下来下载一个tomcat镜像，运行jpress试试
```
docker pull tomcat
```
下载好了先启动


![image.png](/img/dockerWin/6191737-2ae44b21724276bf.png)


启动成功之后在浏览器输入localhost:8080


![image.png](/img/dockerWin/6191737-4612841934b996d1.png)



先停掉tomcat,接下来通过jpress构建自己的镜像
```
 docker stop 容器id
```
新建文件夹myDocker,将下载好的jpress.war文件拷贝进去,然后新建Dockerfile文件，内容如下：
```
from tomcat

MAINTAINER guobing1993 guobing93@163.com

COPY jpress.war /usr/local/tomcat/webapps
```
在该目录下执行命令构建自己的镜像
```
 docker  build -t myjpress:latest .
```
成功之后就可以通过docker images查看到镜像列表中多了一个name为myjpress的镜像

接下来运行myjpress镜像
```
docker run -d -p 8080:8080 myjpress
```
在浏览器中输入localhost:8080/jpress就可以看到jpress的界面了



![image.png](/img/dockerWin/6191737-c1f86bb21b73f725.png)



接下来的一步就是连接上面启动的数据库,值得注意的是连接的数据库名称还有数据库主机地址，可以通过终端中ipconfig查看


![image.png](/img/dockerWin/6191737-cc948b5da30c3f80.png)





![image.png](/img/dockerWin/6191737-bffe50f13ca56b96.png)



f**k，windows环境有坑,连不上。