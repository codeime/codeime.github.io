(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{366:function(e,t,a){"use strict";a.r(t);var s=a(43),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("微软提供了一个Word, Excel, PowerPoint文件的在线预览的接口。")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://products.office.com/en-us/office-online/view-office-documents-online",target:"_blank",rel:"noopener noreferrer"}},[e._v("点我可以去"),a("OutboundLink")],1),e._v("如下图的地方。")]),e._v(" "),a("p",[e._v("看下图只需要我们将一个文件的地址输入然后点击那个绿油油的 "),a("span",{staticStyle:{"background-color":"#008a00",color:"#fff"}},[e._v("Create URL")]),e._v(" 按钮按钮就会生成一个预览连接，然后就可以愉快的预览我们的文件了。")]),e._v(" "),a("p",[a("img",{attrs:{src:"/img/js/6191737-0f608c4efc17094a.png",alt:"image.png"}})]),e._v(" "),a("p",[e._v("那么在我们自己的项目中怎么用这个来做我们自己的预览？")]),e._v(" "),a("p",[e._v("得到的地址类似是：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("https://view.officeapps.live.com/op/embed.aspx?src=xxxxxxxxxxx\n")])])]),a("p",[e._v("我发现src参数是当初输入框中的输入的文件连接通过encodeURIComponent编码后的内容。\n那么每次我们预览的时候只需要将我们文件的地址编码后拼接一下,\n然后将拼接好的url给 iframe的src属性就可以预览了。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v(" _url = encodeURIComponent(_url);\n let url = `https://view.officeapps.live.com/op/embed.aspx?src=${_url}`;\n")])])]),a("p",[e._v("这个接口还有几个参数：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("\x3c!-- 1. 文件起始页 --\x3e\nwdStartOn：1 (第一页)\n\n\x3c!-- 2. 允许打印 --\x3e\n\nwdPrint ：1（允许）/0（禁止）\n\n\x3c!-- 3. 允许查看嵌入代码 --\x3e\n\nwdEmbedCode: 1(允许)/0(不允许)\n\n")])])]),a("p",[e._v("那么最后拼接地址如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("`https://view.officeapps.live.com/op/embed.aspx?src=${_url}&wdStartOn=1&wdPrint=1&wdEmbedCode=1`\n")])])]),a("p",[e._v("值得注意的一点是：")]),e._v(" "),a("h4",{attrs:{id:"文件大小限制-10m"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件大小限制-10m"}},[e._v("#")]),e._v(" 文件大小限制 10M !")]),e._v(" "),a("h3",{attrs:{id:"文件大小限制-10m-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件大小限制-10m-2"}},[e._v("#")]),e._v(" 文件大小限制 10M !!")]),e._v(" "),a("h2",{attrs:{id:"文件大小限制-10m-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件大小限制-10m-3"}},[e._v("#")]),e._v(" 文件大小限制 10M !!!")])])}),[],!1,null,null,null);t.default=r.exports}}]);