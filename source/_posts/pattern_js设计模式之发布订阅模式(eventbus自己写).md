---
title: pattern_js设计模式之发布订阅模式（eventbus自己写）
date: 2019-10-09 22:00:16
categories: "设计模式"
tags: ["js"]
---

初次听到‘事件总线’这个词的时候,并不知道其实就是发布订阅模式也叫观察者模式。

使用场景就没必要详说了,那么看基于ES6 class的实现吧。

1. 定义一个类 就叫EventBus

```js
class EventBus {}
```

2. 需要一个容器来装我们订阅的事件,在对象构造的时候初始化这个容器,订阅的事件名作为key,响应函数作为值。私有属性用下划线开头。

```js
class EventBus{
    constructor(){
        this._events={}
    }
}
```

3. 添加一个订阅方法,可以对某个事件进行多次订阅,所以事件名对应的事件放在数组里而不是直接将响应函数作为值。还要支持传入一个上下文对象,使响应事件被调用时内部this指向该对象。

```js
class EventBus{
    constructor(){
        this._events={}
    }
    on(type, fn, ctx){
        if(!this._events[type]){
            this._events[type]=[]
        }
        this._events[type].push([fn, ctx])
    }
}
```

4. 一次性订阅事件，即触发一次之后就失效,在这里单独看这个可能会有些不理解，要结合下面的触发事件，和取消订阅事件才可以。

```js
class EventBus{
    constructor(){
        this._events={}
    }
    on(type, fn, ctx){
        if(!this._events[type]){
            this._events[type]=[]
        }
        this._events[type].push([fn, ctx])
    }
    once(type,fn){
         function magic() {
            this.off(type, magic)
            fn.apply(ctx, arguments)
        }
         magic.fn = fn
         this.on(type, magic)
    }
}
```


5. 触发事件，通过事件名（或者叫事件类型）来触发订阅的这类事件。在触发事件时通常第一个参数传入事件名，后面可以传入该类订阅响应函数（on方法参数fn）所需的参数，由于fn的参数预先不能确定所以这里不在参数列表上表现出来而是运行时通过arguments获取。

```js
class EventBus{
    constructor(){
        this._events={}
    }
    on(type, fn, ctx){
        if(!this._events[type]){
            this._events[type]=[]
        }
        this._events[type].push([fn, ctx])
    }
    once(type,fn){
         function magic() {
            this.off(type, magic)
            fn.apply(ctx, arguments)
        }
         magic.fn = fn
         this.on(type, magic)
    }
    emit(type){
        const events = this._events[type]
        if(!events){
            return
        }
        let len=events.length
        let copyEvents=[...events]  //TODO: 知道这里为什么拷贝一份吗？后面见答案。
        for(let i = 0;i < len; i++){
            let event=copyEvents[i]
            let [fn,ctx] = event
            if(fn){
                fn.apply(ctx, [].slice.call(arguemnts,1))
            }
        }

    }
}
```

6. 有了添加订阅,当然移除订阅也不能少。先写简单的--移除所有订阅事件。

```js
class EventBus{
    constructor(){
        this._events={}
    }
    on(type, fn, ctx){
        if(!this._events[type]){
            this._events[type]=[]
        }
        this._events[type].push([fn, ctx])
    }
    once(type,fn){
         function magic() {
            this.off(type, magic)
            fn.apply(ctx, arguments)
        }
         magic.fn = fn
         this.on(type, magic)
    }
    emit(type){
        const events = this._events[type]
        if(!events){
            return
        }
        let len=events.length
        let copyEvents=[...events] 
        for(let i = 0;i < len; i++){
            let event=copyEvents[i]
            let [fn,ctx] = event
            if(fn){
                fn.apply(ctx, [].slice.call(arguemnts,1))
            }
        }

    }
    offAll(){
        this._events = {} // 谈笑间灰飞烟灭
    }
}
```

7. 再来移除单个订阅，移除单个订阅时支持传入第二个参数用来移除该类型事件的具体响应事件,如果不传则移除该类事件的所有响应。


```js
class EventBus{
    constructor(){
        this._events={}
    }
    on(type, fn, ctx){
        if(!this._events[type]){
            this._events[type]=[]
        }
        this._events[type].push([fn, ctx])
    }
    once(type,fn){
         function magic() {
            this.off(type, magic)
            fn.apply(ctx, arguments)
        }
         magic.fn = fn
         this.on(type, magic)
    }
    emit(type){
        const events = this._events[type]
        if(!events){
            return
        }
        let len=events.length
        let copyEvents=[...events] 
        for(let i = 0;i < len; i++){
            let event=copyEvents[i]
            let [fn,ctx] = event
            if(fn){
                fn.apply(ctx, [].slice.call(arguemnts,1))
            }
        }

    }
    offAll(){
        this._events = {} // 谈笑间灰飞烟灭
    }

    off(type,fn){
        let events=this._events[type]
        if(!events){
            return
        }
        if(!fn){
           this._events[type]=null
           return  
        }
        let count=events.length
        while(count--){
            if(events[count][0]===fn||(events[count][0]&&events[count][0].fn===fn)){ 
                events.splice(count,1)
            }
        }
    }
}
```

到这里基本就完成了一个eventbus






