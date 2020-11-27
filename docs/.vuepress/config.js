module.exports = {
    title: 'GuoBing\'s Blog',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.png' }]
    ],
    themeConfig: {
        displayAllHeaders: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'About', link: '/about/' }
        ],
        editLinks: true,
        docsDir: 'docs',
        sidebar: {
            '/notes/': [
                {
                    title: 'Javascript',
                    collapsable: false,
                    children: [
                        ['javascript/', 'Introduction'],
                        'javascript/监听dom变化',
                        'javascript/获取win10聚焦壁纸',
                        'javascript/异步事件的并发和继发',
                        'javascript/在线预览office文档',
                        'javascript/node的两个常用文件夹操作',
                        'javascript/js设计模式之发布订阅模式',
                        'javascript/sequelize同步表结构',
                        'javascript/use-async-await',
                        'javascript/vue组件继承',
                        'javascript/webpack打包生成ejs入口文件',
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: [
                        ['css/', 'Introduction'],
                        'css/less-is-more',
                        'css/当BEM遇到less',
                    ]
                },
                {
                    title: 'Dart',
                    collapsable: false,
                    children: [
                        ['dart/', 'Introduction'],
                        'dart/dart基础'
                    ]
                },
                {
                    title: 'Tools',
                    collapsable: false,
                    children: [
                        ['tools/', 'Introduction'],
                        'tools/优雅使用windows10',
                        'tools/尝试cmder',
                        'tools/在多个设备上同步sublime设置',
                        'tools/windows上docker安装及使用',
                        'tools/live-share',
                        'tools/ubuntu-on-windows-初体验'
                    ]
                }
            ]
        }
    }
}