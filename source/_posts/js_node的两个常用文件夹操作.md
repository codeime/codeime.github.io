---
title: node的两个常用文件夹操作
date: 2018-05-01 00:18:47
tags: ["js","nodejs"]
categories: "js"
---

每次nodejs做有关文件操作的时候几乎都会用到，创建文件目录啊，删除文件夹啊这样的操作。时间一久就会发现有些操作很繁琐：删除多层文件夹，创建多层文件夹。
（注意：代码中的异步我直接用await是由于我引入了'mz/fs',mz这个包用Promise包装了下原生的操作）


#### 1 深（多）层删除文件夹
node提供了删除文件夹的操作：
```
fs.rmdir()     // 异步的
fs.rmdirSync()  //同步的
```
但该操作仅仅能删除空文件夹。
那么假如我们有如下这样的一个文件夹
![目录](https://upload-images.jianshu.io/upload_images/6191737-fcc31c22b4c7845b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们要删掉1这个目录那么得先干掉里面的文件和文件夹，里面的文件夹要干掉就需要再干掉里面的文件和文件夹。好了道理貌似都懂关键是代码怎么写。

下面是代码：
```
let rmDirs = (function () {
        async function iterator(url, dirs) {
            var stat = await fs.stat(url);
            if (stat.isDirectory()) {
                dirs.unshift(url); //收集目录
                await inner(url, dirs);
            } else if (stat.isFile()) {
                await fs.unlink(url); //直接删除文件
            }
        }

        async function inner(path, dirs) {
            var arr = await fs.readdir(path);
            await Promise.all(arr.map(v => iterator(path + "/" + v, dirs)));
        }

        return async function (dir) {
            var dirs = [];
            try {
                await iterator(dir, dirs);
                //继发：先删最里层然后依次删外层
                 for (let v of dirs) {
                    await fs.rmdir(v);
                }
                //并发：所有文件夹一起可能会报错
                /*  await Promise.all(dirs.map(v => fs.rmdir(v)));*/
            } catch (e) {
                throw e;
            }
        }
    })();
```

#### 2 深（多）层创建文件夹

nodejs提供了文件夹创建的的操作:
```
fs.mkdir() //异步
fs.mkdirSync() //同步
```
但该操作只能在已有的文件夹下创建文件夹

假如c:/a 下什么都没有，我们想建 c:/a/b/c/d/e/f
如果直接将这个路径给mkdir是肯定不行的。
那么坑定是要获取这个路径的上级目录如果存在侧返回true，后面判断是true的时候就创建，如果不存在就继续找上级目录存在的时候返回true，不存在继续找上级目录。
下面是代码：
```
 /* 深层创建文件目录 */
    async mkDirs(dirname) {
        if (await fs.exists(dirname)) {
            return true
        } else {
            if (await this.mkDirs(path.dirname(dirname))) {
                await fs.mkdir(dirname)
                return true
            }
        }
    };
```
就是这么点。

#### 3总结
代码随简但是凡事要多思考，比如把诸如此类的操作的方法都放在一个工具类中，再做成单例模式。