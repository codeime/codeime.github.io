---
title: sequelize同步表结构
date: 2018-02-11 15:58:20
categories: "nodejs"
tags: ["nodejs","mysql","sequelize"]
---
####写在前面的废话
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
 运行过后，数据库里的test下面就会有新的uers表出现。
这里的代码仅作示例使用。该操作会删掉整个表重新建表，属于DDL操作不可回滚。在开发过程中 数据库的连接、模型的定义、同步表结构就要分包分模块。且在代码中要判断当前环境是否是测试环境来使用同步表结构。

急着回家，不想写太多🤘。

 


 
 


