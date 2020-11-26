---
title: webpack打包生成ejs入口文件
date: 2018-12-06 12:30:36
---

通常，在vue-cli生成的项目中,会有一个index.html的模版文件,在打包后生成最终的index.html,这得益于HtmlWebpackPlugin。

在正在进行的项目中，依耐nodejs，会将打包好的index.html 改成 index.ejs 利用nodejs来做服务端渲染，如果仅仅是修改后缀，那么文章到这里可以结束了。


![开发配置](/img/js/6191737-d55b5f928efb22c1.jpg)



如上图，在开发过程中这部分都是写死的,但是到了测试 ，仿真，正式 环境下，这部分都是依赖node渲染的：
 像语言的js是实时请求语言服务器,在开发过程中添加了新的语言配置，刷新即可看到效果。这样在请求语言服务的过程中是非常慢的，所以在部署到服务器上的时候都是先在node端生成静态的语言文件（js）
 像时区，语言环境，运行环境在服务器上也都是依赖node渲染

最终这部分代码：


![最终代码](/img/js/6191737-c8bacbe4038d3d6d.jpg)



刚开始,刀耕火种的时代,没有做任何处理，打包完成之后小心翼翼的替换这部分代码，然后改文件名,在上传到服务器。

接手发版本后没操作两次，作为一个懒人的我已经受不了这样折腾了(天天这么小心翼翼，提心吊胆的发版本，我也想多活几年啊)

首先想到的是根据NODE_ENV的不同来动态处理生成的模版（刚开始我还以为HtmlWebpackPlugin用的ejs的语法来解析模版文件的，不过几乎一样的嘛）



![判断环境](/img/js/6191737-459bf50ea7a1aac3.jpg)



上来就是一顿操作,我先这部分内容输出为这样
```
   <!-- 生产环境使用 -->
    <script type="text/javascript" src="/i18n/js/i18n.js"></script>
    <script>
        //服务端返回[#]
        //定义个人配置信息，使初始化的值为 系统默认配置信息或二级域名获取简单企业信息
        var _individualConfigInfo = {
            dateFormat: '<%= dateFormat %>',
            localLanguage: '<%= localLanguage %>',
            timeFormat: '<%=  timeFormat   %>',
            timeZone: '<%=   timeZone  %>'
        }
        var version = '<%=  config.version  %>'; //版本号
        var runtime = '<%=  config.STAGE_ENV  %>'; //运行环境
        var IP = '<%=   IP  %>'; //用户IP
        var logoPhoto = '<%=  logoPhoto %>'; //登录头像
        var localTimezone = '<%=   timeZone  %>' || "+8"; //时区
        var logoFormImage = '<%=   logoFormImage  %>'; //首页背景图片
        var localLanguage = '<%=   localLanguage  %>' || "zh-cn"; //服务端的语言[#]
    </script>
```
不巧的是：HtmlWebpackPlugin解析模版用的是lodashjs的template方法,语法上和ejs几乎就一个样，所以就把我的<%=  xxx %>给解析了，所以想要原样输出<%=  xxx %>的话,得让template不解析这部分
最后在lodashjs的文档里找到了

最终结果:
```
    <!-- 生产环境使用 -->
    <script type="text/javascript" src="/i18n/js/i18n.js"></script>
    <script>
        //服务端返回[#]
        //定义个人配置信息，使初始化的值为 系统默认配置信息或二级域名获取简单企业信息
        var _individualConfigInfo = {
            dateFormat: '<%= "\<%= dateFormat %\>" %>',
            localLanguage: '<%=  "\<%= localLanguage %\>"  %>',
            timeFormat: '<%=  "\<%= timeFormat %\>"  %>',
            timeZone: '<%=  "\<%= timeZone %\>"  %>'
        }
        var version = '<%=  "\<%= config.version %\>"  %>'; //版本号
        var runtime = '<%=  "\<%= config.STAGE_ENV %\>"  %>'; //运行环境
        var IP = '<%=  "\<%= IP %\>"  %>'; //用户IP
        var logoPhoto = '<%= "\<%= logoPhoto %\>" %>'; //登录头像
        var localTimezone = '<%=  "\<%= timeZone %\>"  %>' || "+8"; //时区
        var logoFormImage = '<%=  "\<%= logoFormImage %\>"  %>'; //首页背景图片
        var localLanguage = '<%=  "\<%= localLanguage %\>"  %>' || "zh-cn"; //服务端的语言[#]
    </script>
```

从此,打包完了直接往服务端扔。