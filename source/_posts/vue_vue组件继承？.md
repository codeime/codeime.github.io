---
title: vue组件继承？
date: 2019-10-07 19:43:07
categories: "vue"
tags: ['vue']
---

在使用vue的过程中，常常出现这种情况：一个组件在多处使用,各处使用的逻辑却有一些差异，例如A处使用了组件a,B处也使用的组件a；A处使用时a初始化调用方法和B处使用初始化调用方法不同,之前我的做法是通过props传入数据告诉a 是A使用了还是B使用了。随着软件复杂度的增加会不断在组件a中添加这样的代码。到这也许就发现久而久之a已经变得难以维护了。

用过vue的人应该对mixin都很熟悉,vue就是通过mixin模式来实现代码复用的，使用vue的mixin的时候通常的做法是把通用的方法抽取,然后在需要用来某个方法的时候进行混入,我见很多人用vue的mixin基本上都是混入方法,或者极少的数据（常常会混入不需要的方法或数据之类的,这算是一个弊端）。

有时候在面对上文提到的AB引入组件a的问题我们改变一下思路其实没什么不好。

下面用实际项目中用到的代码稍加修改作为展示

先定义一个组件 baseFrame

```html
<template>
    <iframe :src="_getSrc()" :srcdoc="_getDocSrc()" frameborder="0" referrerpolicy="strict-origin"></iframe>
</template>

<script>
import { getUUID } from '@/libs/utils'
export default {
    name:'baseFrame',
    data() {
        return {
            id: `frameInstant${getUUID()}`,
            doc: null

        }
    },

    created() {
        if (!window.MxHtmlFrames) {
            window.MxHtmlFrames = {}
        }
        window.MxHtmlFrames[this.id] = this
    },
    beforeDestroy() {
        this.doc = null
        delete window.MxHtmlFrames[this.id]
    },
    methods: {
        _frameLoad(doc) {
            this.doc = doc
            this.$emit('load', doc)
        },
        _getDocSrc() {
            return this.getTempHtml()
        },
        _getSrc() {
            return '' +
                `javascript:void(function(){` +
                `document.open();` +
                (document.domain != location.hostname ? `document.domain="${document.domain}";` : '') +
                `document.write('${this.getTempHtml()}');` +
                `document.close();` +
                `}())`
        },
        _getCommonScript() {
            return `
                <script id="_initialScript">
                    setTimeout(function(){
                        var instant=window.parent.MxHtmlFrames["${this.id}"];
                        instant._frameLoad(document);
                    },0);
                    var _tmpScript = document.getElementById("_initialScript");
                    _tmpScript.parentNode.removeChild(_tmpScript);
                <\/script>
            `
        },
        getTempHtml() {
            throw new Error('请重写getTempHtml方法')
        }
    }
}
</script>


```
如果直接使用这个组件会报错,告诉你要重写getTempHtml方法,那么怎么用尼？

下面是mailFrame的示例

```html
// mailFrame.vue
<script>
import baseFrame from './baseFrame'
export default {
    name: 'mailFrame',
    mixins: [baseFrame],
    data() { return {} },
    methods: {
        showContent(content = '') {
            
            content = content.replace(/<a /igm, "<a target='_blank' ")
            
            this.doc.body.innerHTML = content
            this.scrollTop()
        },
        scrollTop(top = 0) {
            this.doc.documentElement.scrollTop = 0
        },
        getTempHtml() {
            return '' +
                `<!DOCTYPE html>` +
                `<html>` +
                `<head>` +
                `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">` +
                `<style>` +
                `body {` +
                `font-family: -apple-system, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", Arial, sans-serif;` +
                `font-size: 14px;` +
                `-webkit-font-smoothing: antialiased;` +
                `}` +
                `::-webkit-scrollbar {` +
                `width: 5px;` +
                `height: 5px;` +
                `}` +
                `::-webkit-scrollbar-thumb {` +
                `background-color: #999;-webkit-border-radius: 5px;border-radius: 5px;` +
                `}` +
                `::-webkit-scrollbar-thumb:vertical:hover {` +
                `background-color: #666;` +
                `}` +
                `::-webkit-scrollbar-thumb:vertical:active {` +
                `background-color: #333;` +
                `}` +
                `::-webkit-scrollbar-button {` +
                `display: none;` +
                `}` +
                `::-webkit-scrollbar-track {` +
                `background-color: #f1f1f1;` +
                `}` +
                `</style>` +
                `<script>` +
                `function openlink(e, _this) {` +
                `if (e && e.preventDefault) {` +
                ` e.preventDefault()` +
                `} else {` +
                `window.event.returnValue = false` +
                `}` +
                `parent.window.openlink(_this.getAttribute("href"))` +
                `}` +
                `<\/script>` +
                `</head >` +
                `<body id="mailContent">${this._getCommonScript()}</body>` +
                `</html >`
        }
    },
    components: {}
}
</script>
```
我们甚至可以覆盖template内容
只需要在mailFrame上面加如下代码即可
```html
<template>
    <iframe  :srcdoc="_getDocSrc()" frameborder="0" referrerpolicy="unfafe-url"></iframe>
</template>  
```
我们重新了模板的代码,移除和修改了一些属性。

这时候有一个用作其他作用的iframe需要被用到时还可以在不改变原有代码的基础上继续扩展,在一定程度上遵循开闭原则。
```javascript
// previewFrame.js
import baseFrame from './baseFrame'

export default {
    name: 'previewFrame',
    data() {
        return {}
    },
    mixins: [baseFrame],
    methods: {
        addContent(content = '') {
            this.doc.body.innerHTML = content.replace(/<a /igm, "<a target='_blank' ")
        },
        getTempHtml() {
            return '' +
                `<!DOCTYPE html>` +
                `<html>` +
                `<head>` +
                `<meta charset="utf-8">` +
                `<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">` +
                `<style>` +
                `body{` +
                `font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial, STHeitiSC-Light, simsun, WenQuanYi Zen Hei, WenQuanYi Micro Hei, "sans-serif";` +
                `max-width: 800px;` +
                `padding: 0;` +
                `margin: 0;` +
                `}` +
                `body * {` +
                `color: #626066;` +
                `max-width: 800px;` +
                `font-size: 15px;` +
                `line-height: 30px;` +
                `}` +
                `</style>` +
                `</head>` +
                `<body>${this._getCommonScript()}</body>` +
                `</html>`
        }
    }
}
```