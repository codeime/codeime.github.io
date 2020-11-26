(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{363:function(a,n,e){"use strict";e.r(n);var t=e(43),o=Object(t.a)({},(function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("p",[a._v("通常，在vue-cli生成的项目中,会有一个index.html的模版文件,在打包后生成最终的index.html,这得益于HtmlWebpackPlugin。")]),a._v(" "),e("p",[a._v("在正在进行的项目中，依耐nodejs，会将打包好的index.html 改成 index.ejs 利用nodejs来做服务端渲染，如果仅仅是修改后缀，那么文章到这里可以结束了。")]),a._v(" "),e("p",[e("img",{attrs:{src:"/img/js/6191737-d55b5f928efb22c1.jpg",alt:"开发配置"}})]),a._v(" "),e("p",[a._v("如上图，在开发过程中这部分都是写死的,但是到了测试 ，仿真，正式 环境下，这部分都是依赖node渲染的：\n像语言的js是实时请求语言服务器,在开发过程中添加了新的语言配置，刷新即可看到效果。这样在请求语言服务的过程中是非常慢的，所以在部署到服务器上的时候都是先在node端生成静态的语言文件（js）\n像时区，语言环境，运行环境在服务器上也都是依赖node渲染")]),a._v(" "),e("p",[a._v("最终这部分代码：")]),a._v(" "),e("p",[e("img",{attrs:{src:"/img/js/6191737-c8bacbe4038d3d6d.jpg",alt:"最终代码"}})]),a._v(" "),e("p",[a._v("刚开始,刀耕火种的时代,没有做任何处理，打包完成之后小心翼翼的替换这部分代码，然后改文件名,在上传到服务器。")]),a._v(" "),e("p",[a._v("接手发版本后没操作两次，作为一个懒人的我已经受不了这样折腾了(天天这么小心翼翼，提心吊胆的发版本，我也想多活几年啊)")]),a._v(" "),e("p",[a._v("首先想到的是根据NODE_ENV的不同来动态处理生成的模版（刚开始我还以为HtmlWebpackPlugin用的ejs的语法来解析模版文件的，不过几乎一样的嘛）")]),a._v(" "),e("p",[e("img",{attrs:{src:"/img/js/6191737-459bf50ea7a1aac3.jpg",alt:"判断环境"}})]),a._v(" "),e("p",[a._v("上来就是一顿操作,我先这部分内容输出为这样")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("   \x3c!-- 生产环境使用 --\x3e\n    <script type=\"text/javascript\" src=\"/i18n/js/i18n.js\"><\/script>\n    <script>\n        //服务端返回[#]\n        //定义个人配置信息，使初始化的值为 系统默认配置信息或二级域名获取简单企业信息\n        var _individualConfigInfo = {\n            dateFormat: '<%= dateFormat %>',\n            localLanguage: '<%= localLanguage %>',\n            timeFormat: '<%=  timeFormat   %>',\n            timeZone: '<%=   timeZone  %>'\n        }\n        var version = '<%=  config.version  %>'; //版本号\n        var runtime = '<%=  config.STAGE_ENV  %>'; //运行环境\n        var IP = '<%=   IP  %>'; //用户IP\n        var logoPhoto = '<%=  logoPhoto %>'; //登录头像\n        var localTimezone = '<%=   timeZone  %>' || \"+8\"; //时区\n        var logoFormImage = '<%=   logoFormImage  %>'; //首页背景图片\n        var localLanguage = '<%=   localLanguage  %>' || \"zh-cn\"; //服务端的语言[#]\n    <\/script>\n")])])]),e("p",[a._v("不巧的是：HtmlWebpackPlugin解析模版用的是lodashjs的template方法,语法上和ejs几乎就一个样，所以就把我的<%=  xxx %>给解析了，所以想要原样输出<%=  xxx %>的话,得让template不解析这部分\n最后在lodashjs的文档里找到了")]),a._v(" "),e("p",[a._v("最终结果:")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('    \x3c!-- 生产环境使用 --\x3e\n    <script type="text/javascript" src="/i18n/js/i18n.js"><\/script>\n    <script>\n        //服务端返回[#]\n        //定义个人配置信息，使初始化的值为 系统默认配置信息或二级域名获取简单企业信息\n        var _individualConfigInfo = {\n            dateFormat: \'<%= "\\<%= dateFormat %\\>" %>\',\n            localLanguage: \'<%=  "\\<%= localLanguage %\\>"  %>\',\n            timeFormat: \'<%=  "\\<%= timeFormat %\\>"  %>\',\n            timeZone: \'<%=  "\\<%= timeZone %\\>"  %>\'\n        }\n        var version = \'<%=  "\\<%= config.version %\\>"  %>\'; //版本号\n        var runtime = \'<%=  "\\<%= config.STAGE_ENV %\\>"  %>\'; //运行环境\n        var IP = \'<%=  "\\<%= IP %\\>"  %>\'; //用户IP\n        var logoPhoto = \'<%= "\\<%= logoPhoto %\\>" %>\'; //登录头像\n        var localTimezone = \'<%=  "\\<%= timeZone %\\>"  %>\' || "+8"; //时区\n        var logoFormImage = \'<%=  "\\<%= logoFormImage %\\>"  %>\'; //首页背景图片\n        var localLanguage = \'<%=  "\\<%= localLanguage %\\>"  %>\' || "zh-cn"; //服务端的语言[#]\n    <\/script>\n')])])]),e("p",[a._v("从此,打包完了直接往服务端扔。")])])}),[],!1,null,null,null);n.default=o.exports}}]);