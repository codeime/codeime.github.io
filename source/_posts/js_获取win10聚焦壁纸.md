---
title: 获取win10聚焦壁纸
date: 2017-12-26 21:03:32
categories: 'js'
tags: ['nodejs','win10']
---


每次，当我打开电脑。看到win10那美美的锁屏壁纸都舍不得进入，在那静静欣赏。
每天，它都以不同的姿态展示（首先得设置锁屏壁纸为win10聚焦，如下图）。某天觉得当天的锁屏壁纸特别好看想把它保存下来，于是便开始找win10聚焦的壁纸在电脑的哪个地方。
![设置锁屏为win10聚焦](http://upload-images.jianshu.io/upload_images/6191737-aa6e37f2a860c860.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


费了九牛二虎之力（假的），果然功夫不负有心人，win10的壁纸默认保存在如下的目录中：

```
C:\Users\bing\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets
```
目录下的文件是这样的：（黑人？？？）
![聚焦的文件](http://upload-images.jianshu.io/upload_images/6191737-eaa3958a828aadfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

聪明的我又想到了：要不手动加个后缀名。正如聪明的我想的这样是行得通的。通过一连串帅气的操作：
1. ctrl+a全选，ctrl+c复制，
2. 到桌面 新建文件夹 
3. 进入刚刚新建的文件夹 ctrl+v。
然后一个个改名？no no no.作为一个爱偷懒的人我是不会这个做的。

首先 想到 cmd的ren命令
1.在刚刚新建的文件夹下新建一个文本文件
2.用记事本打开  键入  
```
ren * *.png
```
3.重命名该文本文件为 xxx.bat
4.点击.bat文件，然后该文件夹下所有的文件都变成以.png结尾的文件

不久之后 我写了几句java,带界面的选择文件夹后自己手动键入后缀名来批量修改，不过还是得手动拷贝出来之后。运行效果如下：
![image.png](http://upload-images.jianshu.io/upload_images/6191737-2c45554db973986d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/6191737-23ec226da9514a37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以说是异常的简单。


好了，毕竟上面的都是过去的事了，前面废话那么多了是该进入正题了。
最近我在想我要自动拷贝win10聚焦的图片到某个文件夹下。

首先 分析得出已知条件如下：
1. 源文件夹，即聚焦壁纸所在文件夹
2. 源文件的 二进制（十六进制视图）以FFD8FF开头的就是jpg文件，文件头是89504E47就是png文件。

现在的问题：
1.想要在不同的电脑上运行，源文件是在用户下的即如下：
```
C:\Users\用户\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets
```
我当前的用户是bing所以源文件的目录是
```
C:\Users\bing\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets
```
聪明的我立即就想到node的进程对象process对象上是否能获得当前用户，于是立即打开powerShell验证,果不其然
![image.png](http://upload-images.jianshu.io/upload_images/6191737-255e7bc4aa5c5b66.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

process.env.localappdata就可以了。
于是开始写代码了。
敲啊敲，，，，，敲啊敲，，，，，敲啊敲，，，，，
其中会用到ES7的async/await方法。
加上为了练习Promise而改造的一个异步函数也就100行代码。
```javascript
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
				const info = await imgInfo(path.join(src, file));
				var wh = info.height / info.width;
				if (wh != 1&&info.bytes>102400) {
					await fs.writeFile(filename, data);
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

真的不到100行啊......
运行后：
![image.png](http://upload-images.jianshu.io/upload_images/6191737-9bf79bd062a9006a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以在这里clone我的代码到自己的电脑上运行————>[这里这里](https://github.com/guobing1993/win10-spotlight)前提是win10,node环境。

clone后：
1.
```
npm install
```
2.
```
node index
```

