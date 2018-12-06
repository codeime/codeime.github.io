---
title: webpack打包生成ejs入口文件
date: 2018-12-06 12:30:36
categories: "工具"
tags: ["js"]
---

通常，在vue-cli生成的项目中,会有一个index.html的模版文件,在打包后生成最终的index.html,这得益于HtmlWebpackPlugin。

在正在进行的项目中，依耐nodejs，会将打包好的index.html 改成 index.ejs 利用nodejs来做服务端渲染，如果仅仅是修改后缀，那么文章到这里可以结束了。

