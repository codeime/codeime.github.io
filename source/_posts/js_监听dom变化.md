---
title: 监听dom变化
date: 2019-09-28 21:31:10
categories: "js"
tags: ["js"]
---

那是一个风雨交加的夜晚。哦,不！下午,有没有风雨交加早已经不记得了。
当我看到交互设计的时候，心里一咯噔:‘wc, 我们这单页项目用的vue hash路由,再想用锚点实现这种页面内跳转已经是不行了’。 年少的我还没来得及反应,只听产品问（说）道‘这个交互可以实现的哈’,我嗯了一句。
现在回忆到这,才知道我那一声‘嗯’深藏功与名（夸张了,夸张了,只怪自己还是个弟弟）。

这个是页面的大概模样,类似tab页,不同的是下面是滚动的,每一块高度不固定。并且操作的响应是双向的：点击按钮时要滚动到对应的页,鼠标滚轮在下面滚动的时候tab按钮也要高亮当前可见块对应的按钮。


![dom_change.png](https://ws1.sinaimg.cn/large/781ff8c9gy1g7g4d5tdqkj20zx0kg77t.jpg)


![dom变化.png](https://ws1.sinaimg.cn/large/781ff8c9gy1g7hx9fbu38j20ca0hljrt.jpg)

注意这里每一块的高度是不一致的


看到这里是不是觉得和手机通讯录的联系人列表很相似尼。是的,通讯录右侧字母可以导航到指定首字母位置,滑动列表时字母列表也要高亮当前所在位置的字母。

也许想到这里会蹦出一个想法‘这还不简单,安装个库就搞定了-- better-scroll’; 不假,better-scroll 确实可以做,并且我已经先用better-scroll 实现过了,只不过 better-scroll 对鼠标事件并不友好,偶尔出现字体模糊情况。况且为了这安装一个依赖感觉有些像为了某个一方法把整个lodash库引入一样傻。

首先要搞清滚动高度和高亮tab之间的关系

* 第一块：滚动高度小于 该块底部到父级顶部的距离 大于 0 
* 第二块：滚动高度小于 该块底部到父级顶部的距离 大于 该块顶部到父级顶部的距离
* ...

到这里就会发现当某个tab选中时,滚动高度  就是在该tab对应块顶部和底部 到父级顶部的距离之间。

一个块顶部到父级顶部的距离就上个块底部到父级顶部的距离，第一个块为0。

收集距离 [X0, X1, X2, X3, X4, X5, X6]

![距离](https://ws1.sinaimg.cn/large/781ff8c9ly1g7nesn0y9mj20mc0rsgme.jpg)


接下来监听滚动时获取滚动距离，看属于哪个区间就给对应的tab高亮;点击tab时给整个块设置滚动高度（需要一个状态属性告诉滚动监听的方法不用设置高亮）。

看起来一切顺利,但是问题时每一块内容是通过接口返回数据的，也就是每一块的高度不是固定的,并且数据返回的时间也不一样。这个时候我们的主角闪亮登场：MutationObserver; 关于该对象，MDN上又很详细的[介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

使用起来很简单
```javascript
// 初始化对象  callback是监听的DOM发生变化时调用
let observer = new MutationObserver(callback);

//开始监听目标对象的变化 targetNode 是监听的目标对象就是要监听谁的变化,config可以配置监听目标对象哪些变化例如：属性，子元素等等
observer.observe(targetNode, config);

// 暂停监听
observer.disconnect();
```
该对象在IE11之前不被支持，所以在使用过程中还应该注意一些兼容性问题。
在使用过程中可以将其封装起来提供一些更友好的api和兼容性支持。
下面是我的实现(参考了better-sccroll的源码,better-scroll也是用MutationObserver监听DOM变化的)
```javascript


import { ArraySpliceOne } from './utils'

export const getRect = function (el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}

/**
 * 监听dom变化
 */
export const DomObserver = (function () {
    function _DomObserver(el) {
        this.destroyed = false
        this.el = el
        this._events = {}
        this._initDOMObserver(el)
    }
    _DomObserver.prototype._initDOMObserver = function () {
        if (typeof MutationObserver !== 'undefined') {
            let timer
            let observer = new MutationObserver(mutations => {
                let immeditateRefresh = false
                let deferredRefresh = false
                for (let index = 0; index < mutations.length; index++) {
                    const mutation = mutations[index]
                    if (mutation.type !== 'attributes') {
                        immeditateRefresh = true
                        break
                    } else {
                        if (mutation.target !== this.el) {
                            deferredRefresh = true
                            break
                        }
                    }
                }
                if (immeditateRefresh) {
                    this.trigger('refresh')
                } else if (deferredRefresh) {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        this.trigger('refresh')
                    }, 60)
                }
            })
            observer.observe(this.el, {
                'childList': true,
                'attributes': true,
                'subtree': true
            })
            this.on('destroy', () => {
                observer.disconnect()
                observer = null
            })
        } else {
            this._checkDOMUpdate()
        }
    }
    _DomObserver.prototype._checkDOMUpdate = function () {
        let rect = getRect(this.el)
        let oldWidth = rect.width
        let oldHeight = rect.height

        function check() {
            if (this.destroyed) { return }
            let rect2 = getRect(this.el)
            let newWidth = rect2.width
            let newHeight = rect2.height
            if (newWidth !== oldWidth || newHeight !== oldHeight) {
                this.trigger('refresh')
            }
            oldHeight = newHeight
            oldWidth = newWidth
            next.call(this)
        }

        function next() {
            setTimeout(() => {
                check.call(this)
            }, 1000)
        }
        next.call(this)
    }

    _DomObserver.prototype.on = function (type, fn, ctx = this) {
        if (!this._events[type]) {
            this._events[type] = []
        }
        this._events[type].push([fn, ctx])
    }
    _DomObserver.prototype.off = function (type, fn) {
        let events = this._events[type]
        if (!events) return
        let len = events.length
        while (len--) {
            if (events[len][0] === fn || (events[len][0] && events[len][0].fn === fn)) {
                ArraySpliceOne(events, len)
            }
        }
    }
    _DomObserver.prototype.trigger = function (type) {
        let events = this._events[type]
        if (!events) { return }
        let len = events.length
        let copyEvents = [...events]
        for (let index = 0; index < len; index++) {
            let event = copyEvents[index]
            let [fn, ctx] = event
            if (fn) {
                fn.apply(ctx, [].slice.call(arguments, 1))
            }
        }
    }
    _DomObserver.prototype.destroy = function () {
        this.trigger('destroy')
        this._events = {}
        this.el = null
        this.destroyed = true
    }

    return _DomObserver
}())


```
现在代码中配置那一块是写死在代码中的，如果要面临更多的场景何以把配置作为参数传入，并提供默认值的方式使得该部分代码变得更加的灵活易用。

封装后使用
```javascript
let observer = new DomObserver(scrollBox)

observer.on('refresh', () => {
   _calcHeight()
})
```