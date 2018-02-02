---
title: 使用新语法 async
date: 2018-02-03 00:34:31
tags: ["js","nodejs"]
categories: "js"
---

  相信知道ajax的人都知道异步回调是怎么一回事。在一些业务中很容易写成下面这个恶心的代码：
  ```
  $.ajax({
      succss:function(res){
         $.ajax({
             data:res.xxx
             succss:function(res2){
                  $.ajax({
                      data:res2.xxx

                  })
              }
        })
      }
  })
  ```
  哦，反正我没写过这种ajax，看起来真的挺恶心的，所以拿来举例。
  但是，nodejs做后台的时候，这个情况就像下面：
  ```
  {
      {
          {
              {
                  {
                      {
                          {
                              {

                              }
                          }
                      }
                  }
              }
          }
      }
  }
  ```
  唉~~~触目惊心,不仅仅阅读困难，维护起来也是要了老命啊。

不过，别忘了ES6的Promise对象，都说字如其人，Promise这家伙是名如其人，就是一承诺：这件事我去做，做成了怎么怎么样，做不成就拿人头来谢罪。下面就是用Promise对fs.readFile()的包装以及使用：
```
 function readFile(path) {
 	return new Promise(function (resolve, reject) {
 		fs.readFile(path, (err, data) => {
			if (err) {
 				reject(err);
 			}
 			resolve(data);
 		})
 	})
 }

 readFile("xxx")
 .then(function(data){
     ...
 })
 .catch(function(err){
     ...  
 })
```
这么一来在观感上就要强很多，但自己的代码量也增加不少。好在有第三方的包替我们做了许多的工作例如 mz:
```
const fs=require("mz/fs");

 fs.readFile("xxx")
 .then(function(data){
   ...
 })
 .catch(function(err){
     ...  
 })
```
很舒心有没有。。。。如果觉得答案是肯定的，小伙子，还是图样图森破。慢慢的写着写着就会发现有时一堆的then这样的东西。

为了耍得更加欢快，还是用Generator：
```
const fs=require("mz/fs");
function * doSome(){
    let a=yield fs.readfile(aaa);
    let b=yield fs.readfile(bbb)
    return b;
}
var f=doSome();
f.next();
f.next();
f.next();
```
终于 这异步写起来像同步代码了，但是整流程需要手动控制，好在有co库可以帮我们解决。

