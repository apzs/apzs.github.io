import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "前端笔记",
        icon: "code",
        prefix: "/front/",
        children: [
            {
                text: "html&css",
                icon: "fa-brands fa-html5",
                prefix: "html&css/",
                children: [
                    {text: "html&css基础", icon: "fa-brands fa-html5", link: "1.html&css"},
                    {text: "移动端布局", icon: "mobile-screen-button", link: "2.mobile"},
                ]
            },
            {
                text: "js",
                icon: "fa-brands fa-js",
                prefix: "js/",
                children: [
                    {text: "js基础", icon: "fa-brands fa-js", link: "1.JS基础"},
                    {text: "WebApi", icon: "window-maximize", link: "2.WebApi（BOM和DOM）"},
                    {text: "Ajax", icon: "rotate", link: "3.Ajax"},
                    {text: "js高级", icon: "bolt", link: "4.js高级"},
                    {text: "ECMAScript6", icon: "fa-brands fa-js", link: "5.ECMAScript6"},
                    {text: "Promise", icon: "clock", link: "6.Promise"},
                ]
            },
            {
                text: "前置知识",
                icon: "circle-info",
                children: [
                    {
                        text: "npm基本使用",
                        icon: "fa-brands fa-npm",
                        link: "npm/1.npm基础"
                    },
                    {
                        text: "scss",
                        icon: "fa-brands fa-sass",
                        link: "scss/README"
                    },
                ]
            },
            {
                text: "vue",
                icon: "fa-brands fa-vuejs",
                prefix: "vue/",
                children: [
                    {text: "vue2", icon: "fa-brands fa-vuejs", link: "1.vue2"},
                    {text: "vue3", icon: "fa-brands fa-vuejs", link: "2.vue3"},
                    {text: "创建vue项目的几种方式", icon: "fa-brands fa-vuejs", link: "3.创建vue项目的几种方式"},
                ]
            },
            {
                text: "react",
                icon: "fa-brands fa-react",
                prefix: "react/",
                children: [
                    {text: "react入门", icon: "fa-brands fa-react", link: "01 【react入门】"},
                    {text: "react脚手架", icon: "fa-brands fa-react", link: "02 【react脚手架】"},
                    {text: "路由", icon: "route", link: "03 【路由】"},
                    {text: "redux", icon: "atom", link: "05 【redux】"},
                    {text: "hooks", icon: "anchor", link: "06 【hooks】"},
                    {text: "react高级", icon: "fa-brands fa-react", link: "07 【react高级】"},
                ]
            },
            {
                text: "webpack",
                icon: "cube",
                prefix: "webpack/",
                children: [
                    {text: "基础", icon: "cube", link: "1.基础"},
                    {text: "高级", icon: "cube", link: "2.高级"},
                    {text: "项目配置", icon: "gear", link: "3.项目配置"},
                    {text: "原理分析", icon: "magnifying-glass-chart", link: "4.原理分析"},
                ]
            }
        ]
    },
    {
        text: "前端项目",
        icon: "briefcase",
        prefix: "/front-project/",
        children: [
            {text: "小兔鲜PC (Vue3+Pinia+js)", icon: "desktop", link: "小兔鲜PC (Vue3_Pinia_js)/"},
            {text: "小兔鲜儿uni-app (Vue3+ts)", icon: "mobile-screen", link: "小兔鲜儿uni-app (Vue3_ts)/"},
            {text: "尚品汇 (Vue2+js)", icon: "store", link: "尚品汇 (Vue2+js)/README"},
            {text: "硅谷甄选 (Vue3+ts)", icon: "check-to-slot", link: "硅谷甄选 (Vue3+ts)/README"},
            {text: "个人博客搭建教程", icon: "blog", link: "个人博客搭建教程/README"},
        ]
    },
    {
        text: "后端笔记",
        icon: "server",
        children: [
            {
                text: "后端基础",
                icon: "server",
                prefix: "/back-base/",
                children: [
                    {text: "Java基础语法", icon: "fa-brands fa-java", link: "1.Java基础语法/README"},
                    {text: "Java核心", icon: "coffee", link: "2.Java核心"},
                    {text: "JavaWeb", icon: "globe", link: "3.JavaWeb"},
                    {text: "mysql", icon: "database", link: "4.mysql/MySQL"},
                ]
            },
            {
                text: "后端进阶",
                icon: "gears",
                prefix: "/back-advance/",
                children: [
                    {text: "SSM", icon: "layer-group", link: "5.SSM/SSM笔记"},
                    {text: "redis", icon: "database", link: "6.redis/README"},
                    {text: "SpringBoot", icon: "leaf", link: "7.SpringBoot2"},
                    {text: "git", icon: "code-branch", link: "9.git/README"},
                    {text: "nginx", icon: "server", link: "10.nginx"},
                    {text: "jni", icon: "link", link: "11.jni"},
                ]
            },
            {
                text: "后端高级",
                icon: "microchip",
                prefix: "/back-senior/",
                children: [
                    {text: "docker", icon: "fa-brands fa-docker", link: "11.docker/README"},
                    {text: "gitlab+jeckins", icon: "vials", link: "12.gitlab+jeckins/README"},
                    {text: "SpringSecurity", icon: "shield-halved", link: "13.SpringSecurity/README"},
                    {text: "Netty", icon: "network-wired", link: "14.Netty"},
                    {text: "arthas", icon: "bug", link: "15.arthas"},
                    {text: "ShardingSphere5", icon: "database", link: "16.ShardingSphere5"},
                    {text: "mongodb", icon: "leaf", link: "17.mongodb/mongodb"},
                ]
            },
        ]
    },
    {
        text: '谷粒商城',
        icon: "cart-shopping",
        prefix: "/gulimall/",
        children: [
            {
                text: '基础篇',
                icon: "book",
                children: [
                    { text: '前后端环境搭建', icon: "wrench", link: 'base1' },
                    { text: '前后端联调', icon: "link", link: 'base2' },
                ]
            },
            {
                text: '高级篇',
                icon: "rocket",
                children: [
                    { text: 'Elasticsearch & nginx', icon: "magnifying-glass", link: 'advanced1' },
                    { text: 'Redisson & SpringCache', icon: "bolt", link: 'advanced2' },
                    { text: 'CompletableFuture', icon: "clock", link: 'advanced3' },
                    { text: 'Spring Session & OAuth2.0', icon: "key", link: 'advanced4' },
                    { text: 'RabbitMQ & Seata', icon: "envelope", link: 'advanced5' },
                    { text: '支付 & Sentinel', icon: "credit-card", link: 'advanced6' },
                ]
            },
            {
                text: '集群篇',
                icon: "cubes",
                children: [
                    { text: 'K8s & kubesphere', icon: "braille", link: 'cluster' },
                ]
            },
            {
                text: '运行教程',
                icon: "run",
                link: ''
            },

        ]
    },
    {
        text: '常用功能',
        icon: "screwdriver-wrench",
        prefix: "/CommonFunctions/",
        children: [
            { text: 'SpringBoot相关', icon: "leaf", link: '1.SpringBoot' },
            { text: 'mysql相关', icon: "database", link: '2.mysql' },
            { text: 'docker相关', icon: "fa-brands fa-docker", link: '3.docker' },
            { text: 'maven相关', icon: "box", link: '4.maven' },
            { text: 'linux相关', icon: "fa-brands fa-linux", link: '5.linux' },
            { text: 'windows相关', icon: "fa-brands fa-windows", link: '6.windows' },
            { text: 'git相关', icon: "fa-brands fa-git-alt", link: '7.git' },
        ]
    },
    {
        text: '阅读源码',
        icon: "magnifying-glass",
        prefix: "/sourceCode/",
        children: [
            {
                text: 'Spring',
                icon: "leaf",
                prefix: "spring/",
                children: [
                    { text: '搭建SpringBoot源码环境', icon: "wrench", link: 'SpringBoot/README' },
                    { text: 'SpringBoot自动配置 & 请求处理', icon: "leaf", link: 'SpringBoot/1.自动配置 & 请求处理' },
                    { text: 'SpringBoot异常处理', icon: "bug", link: 'SpringBoot/2.异常处理/' },
                    { text: 'SpringSecurity源码阅读', icon: "shield-halved", link: 'SpringSecurity/README' },
                    { text: 'SpringSecurity基础知识', icon: "book", link: 'SpringSecurity/learn' },
                ]
            },
            {
                text: 'Tomcat',
                icon: "cat",
                children: [
                    { text: 'Tomcat源码阅读', icon: "magnifying-glass", link: 'tomcat' },
                ]
            },
            {
                text: 'Mybatis',
                icon: "database",
                children: [
                    { text: 'MyBatis源码阅读', icon: "magnifying-glass", link: 'mybatis/README' },
                ]
            }
        ]
    },
    {
        text: "面试题",
        icon: "clipboard-question",
        link: "/interview/README.md"
    },
    {
        text: 'C++',
        icon: "code",
        prefix: "/cpp/",
        children: [
            { text: 'C++基础入门', icon: "code", link: '1.C++基础入门' },
            { text: '通讯录管理系统', icon: "address-book", link: '2.通讯录管理系统' },
            { text: 'C++核心编程', icon: "gears", link: '3.C++核心编程' },
            { text: '职工管理系统', icon: "users", link: '4.职工管理系统' },
            { text: 'C++提高编程STL', icon: "layer-group", link: '5.C++提高编程STL' },
            { text: '基于STL的演讲比赛流程管理系统', icon: "ranking-star", link: '6.基于STL的演讲比赛流程管理系统' },
            { text: '机房预约系统', icon: "calendar-check", link: '7.机房预约系统' },
        ]
    },
    {
        text: 'python',
        icon: "fa-brands fa-python",
        prefix: "/python/",
        children: [
            { text: '基础语法', icon: "code", link: '01.基础语法' },
            { text: '判断语句', icon: "code-branch", link: '02.判断语句' },
            { text: '循环语句', icon: "rotate", link: '03.循环语句' },
            { text: '函数使用', icon: "gears", link: '04.函数使用' },
            { text: '数据容器', icon: "boxes-stacked", link: '05.数据容器' },
            { text: '文件基础操作', icon: "file-lines", link: '06.文件基础操作' },
            { text: '异常处理', icon: "bug", link: '07.异常处理' },
            { text: '模块与包', icon: "cubes", link: '08.模块与包' },
            { text: '面向对象', icon: "layer-group", link: '09.面向对象' },
            { text: '类型注解', icon: "spell-check", link: '10.类型注解' },
            { text: '高阶技巧', icon: "rocket", link: '11.高阶技巧' },
            { text: '操作MySQL', icon: "database", link: '12.操作MySQL' },
            { text: 'DDS通讯', icon: "database", link: '13.DDS笔记' },
        ]
    },
    {
        text: 'cmo',
        icon: "jet-fighter",
        link: 'cmo'
    },
]);
