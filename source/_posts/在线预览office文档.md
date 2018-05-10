---
title: 在线预览office文档
date: 2018-05-10 17:08:05
categories: "js"
tags: ["js"]
---

微软提供了一个Word, Excel, PowerPoint文件的在线预览的接口。

[点我可以去](https://products.office.com/en-us/office-online/view-office-documents-online)如下图的地方。

看下图只需要我们将一个文件的地址输入然后点击那个绿油油的 <span style="background-color:#008a00">Create URL</span> 按钮按钮就会生成一个预览连接，然后就可以愉快的预览我们的文件了。


![image.png](https://upload-images.jianshu.io/upload_images/6191737-0f608c4efc17094a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么在我们自己的项目中怎么用这个来做我们自己的预览？

得到的地址类似是：
```
https://view.officeapps.live.com/op/embed.aspx?src=xxxxxxxxxxx
```
我发现src参数是当初输入框中的输入的文件连接通过encodeURIComponent编码后的内容。
那么每次我们预览的时候只需要将我们文件的地址编码后拼接一下,
然后将拼接好的url给 iframe的src属性就可以预览了。
```
 _url = encodeURIComponent(_url);
 let url = `https://view.officeapps.live.com/op/embed.aspx?src=${_url}`;
```

这个接口还有几个参数：

```
<!-- 1. 文件起始页 -->
wdStartOn：1 (第一页)

<!-- 2. 允许打印 -->

wdPrint ：1（允许）/0（禁止）

<!-- 3. 允许查看嵌入代码 -->

wdEmbedCode: 1(允许)/0(不允许)

```
那么最后拼接地址如下：
```
`https://view.officeapps.live.com/op/embed.aspx?src=${_url}&wdStartOn=1&wdPrint=1&wdEmbedCode=1`
```
值得注意的一点是：
####文件大小限制 10M !
###文件大小限制 10M !!
##文件大小限制 10M !!!