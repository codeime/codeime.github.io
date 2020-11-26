---
title: sequelize同步表结构
date: 2018-02-11 15:58:20
---

#### 写在前面的废话
要过年了，我想回家😂（本来写了一大段，后来我删了。主要是我认为有点冗余了）

#### 开始
 环境：mysql、nodejs
 依赖：sequelize、mysql2
 编辑器：随意

#### 代码
 ```
<!-- 引包 -->
const Sequelize = require('sequelize');

<!-- 创建连接 -->
let sequelize = new Sequelize(
    'test', 
    'root',
    'root', 
    {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
        }
    }
);

<!-- 定义模型 -->
let User = sequelize.define("user", {
    email: {
        type: Sequelize.STRING(100),
        unique: true
    },
    password: Sequelize.STRING(100),
    name: Sequelize.STRING(50),
    gender: Sequelize.BOOLEAN,
});

<!-- 同步模型结构到数据库 -->
sequelize.sync({force: true});  

 ```
运行过后，数据库里的test(先建好这个库)下面就会有新的uers表出现。
这里的代码仅作示例使用。该操作会删掉整个表重新建表，属于DDL操作不可回滚。
开发过程中在代码中要判断当前环境是否是测试环境来使用同步表结构。
另外在开发过程中 数据库的连接、模型的定义、同步表结构就要分包分模块。

还有个sequelize-auto的包可以把sql直接生成模型（就是上面代码中定义模型那一段的模型），如此一来岂不是用PowerDesigner画好实体关系图，再导出sql,再生成实体模型。👈新锅炒旧饭。

其实还是多写写sql比较好。

#### 晕死的经历
我在运行我的代码后，打开Navicat看表的创建是否成功，打开test看啥也没看到,然后重复数次依然不行，在代码里打各种log,终端里也显示各种成功。然而Navicat里依然没有，整整debug了三周都没有。后来偶然发现Navicat连的是机房mysql,居然犯这种错误,真是够枪毙几分钟的。

---------

急着回家，不想写太多🤘。

 


 
 


