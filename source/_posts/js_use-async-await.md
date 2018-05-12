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
终于 这异步写起来像同步代码了，但是需要 f.next() 方法一步一步往下执行，这样手动控制整个流程给人很不友好的感觉，好在有co库可以帮我们解决。

不过co也没快活过太久，ES7标准中 带来了异步的新语法 async/await,其实这只不过是generator的语法糖，把*换成async,把yield换成await,并且自带执行器;这么一来就在语义上显得特别友好。
```
const fs=require("mz/fs");
 async function  doSome(){
    let a=await fs.readfile(aaa);
    let b=await fs.readfile(bbb)
    return b;
}
var f=doSome();

```
我仿佛看到了C#的影子、、、、、哈哈哈哈。

光说不练瞎扯淡,于是乎我把上次做的那个获取win10壁纸的代码全部用async语法改造了，先贴旧的用then语法的：
```
//old code
old code
const fs = require('fs');
const path = require('path');
const imageInfo = require('image-info');

/*壁纸所在的源文件夹*/
const src = path.join(process.env.localappdata, "\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\");
/*要拷贝到的文件夹：这个是在‘图片/spotlight’*/
const target = path.join(process.env.userprofile, 'Pictures\\spotlight');

/*判断spotlight文件夹是否存在*/
try {
	const s = fs.statSync(target);
	if (!s.isDirectory()) {
		fs.mkdirSync(target);
	}
} catch (error) {
	fs.mkdirSync(target);
}

/*读取源文件目录下的所有文件*/
const files = fs.readdirSync(src);
files.forEach(file => {

	const stats = fs.statSync(path.join(src, file));

	if (stats.isFile()) {

		readFile(path.join(src, file))
			.then(function (data) {
				/*判断文件后缀*/
				const tempData = data.slice(0, 7);
				let filename;
				if (tempData.indexOf(Buffer.from('FFD8FF', "hex")) != -1) {

					filename = path.join(target, file + ".jpg");

				} else if (tempData.indexOf(Buffer.from('89504E47', 'hex')) != -1) {

					filename = path.join(target, file + ".png");
				}

				if (filename) {

					fs.writeFile(filename, data, err => {

						if (err) console.log(err);

						imgInfo(filename)
							.then(function (data) {
								/*过滤掉小文件*/
								var wh = data.height / data.width;
								if (wh == 1) {
									fs.unlink(filename, (err) => {
										if (err) {
											console.log(err)
										}
									})
								}
							})
							.catch(function (err) {
								console.log(err);
							})
					});
				}
			})
			.catch(function (err) {
				console.log(err);
			})

	}
})

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

function imgInfo(filename) {
	return new Promise(function (resolve, reject) {
		imageInfo(filename, (err, info) => {
			if (err) {
				reject(err);
			}
			resolve(info);

		})
	})
}
```

下面是async改造后的：
```
const fs = require('mz/fs');
const path = require('path');
const imageInfo = require('image-info');

/*壁纸所在的源文件夹*/
const src = path.join(process.env.localappdata, "\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\");
/*要拷贝到的文件夹：这个是在‘图片/spotlight’*/
const target = path.join(process.env.userprofile, 'Pictures\\spotlight');

start();

async function start() {
	await checkdir();
	await copyFile();
}

/*判断spotlight文件夹是否存在*/
async function checkdir() {
	try {
		const s = await fs.stat(target);
		if (!s.isDirectory()) {
			await fs.mkdir(target);
		}
	} catch (error) {
		await fs.mkdir(target);
	}
}

/*读取源文件目录下的所有文件*/
async function copyFile() {
	const files = await fs.readdir(src);
	files.forEach(async (file) => {
		const stats = await fs.stat(path.join(src, file));
		if (stats.isFile()) {
			const data = await fs.readFile(path.join(src, file));
			const tempData = data.slice(0, 7);
			let filename;
			if (tempData.indexOf(Buffer.from('FFD8FF', "hex")) != -1) {

				filename = path.join(target, file + ".jpg");

			} else if (tempData.indexOf(Buffer.from('89504E47', 'hex')) != -1) {

				filename = path.join(target, file + ".png");
			}
			if (filename) {

				await fs.writeFile(filename, data);
				const info = await imgInfo(filename);

				var wh = info.height / info.width;
				if (wh == 1) {
					await fs.unlink(filename);
				}

			}
		}

	});
}


function imgInfo(filename) {
	return new Promise(function (resolve, reject) {
		imageInfo(filename, (err, info) => {
			if (err) {
				reject(err);
			}
			resolve(info);

		})
	})
}
```
没有对比就没有伤害啊。

其实我就是说说async好,不存在任何语法上的教程。如果想了解或者深入了解相关知识，很明显你需要这个[ES6入门教程](http://es6.ruanyifeng.com/); 建议多学习一些基本语法,算法,设计模式相关的知识。要知其然还要知其所以然。

这里是‘获取win10壁纸’的项目原址：[win10spotlight](https://github.com/guobing1993/win10-spotlight)



