import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    // "/demo/",
    {
        text: "前端基础",
        icon: "book",
        prefix: "/front-base/",
        children: [
            {
                text: "html&css",
                icon: "pen-to-square",
                prefix: "html&css/",
                children: [
                    {text: "html&css基础", icon: "pen-to-square", link: "1.html&css"},
                    {text: "移动端布局", icon: "pen-to-square", link: "2.mobile"},
                ]
            },
            {
                text: "js",
                icon: "pen-to-square",
                prefix: "js/",
                children: [
                    {text: "js基础", icon: "pen-to-square", link: "1.JS基础"},
                    {text: "WebApi", icon: "pen-to-square", link: "2.WebApi（BOM和DOM）"},
                    {text: "Ajax", icon: "pen-to-square", link: "3.Ajax"},
                    {text: "js高级", icon: "pen-to-square", link: "4.js高级"},
                    {text: "ECMAScript6", icon: "pen-to-square", link: "5.ECMAScript6"},
                    {text: "Promise", icon: "pen-to-square", link: "6.Promise"},
                ]
            }
        ]
    },
    {
        text: "前端进阶",
        icon: "book",
        prefix: "/front-advance/",
        children: [
            {
                text: "前置知识",
                icon: "pen-to-square",
                children: [
                    {
                        text: "npm基本使用",
                        icon: "pen-to-square",
                        link: "npm/1.npm基础"
                    },
                    {
                        text: "scss",
                        icon: "pen-to-square",
                        link: "scss/README"
                    },
                ]
            },
            {
                text: "vue",
                icon: "pen-to-square",
                prefix: "vue/",
                children: [
                    {text: "vue2", icon: "pen-to-square", link: "1.vue2"},
                    {text: "vue3", icon: "pen-to-square", link: "2.vue3"},
                    {text: "创建vue项目的几种方式", icon: "pen-to-square", link: "3.创建vue项目的几种方式"},
                ]
            },
            {
                text: "react",
                icon: "pen-to-square",
                prefix: "react/",
                children: [
                    {text: "react入门", icon: "pen-to-square", link: "01 【react入门】"},
                    {text: "react脚手架", icon: "pen-to-square", link: "02 【react脚手架】"},
                    {text: "路由", icon: "pen-to-square", link: "03 【路由】"},
                    {text: "redux", icon: "pen-to-square", link: "05 【redux】"},
                    {text: "hooks", icon: "pen-to-square", link: "06 【hooks】"},
                    {text: "react高级", icon: "pen-to-square", link: "07 【react高级】"},
                ]
            },
            {
                text: "webpack",
                icon: "pen-to-square",
                prefix: "webpack/",
                children: [
                    {text: "基础", icon: "pen-to-square", link: "1.基础"},
                    {text: "高级", icon: "pen-to-square", link: "2.高级"},
                    {text: "项目配置", icon: "pen-to-square", link: "3.项目配置"},
                    {text: "原理分析", icon: "pen-to-square", link: "4.原理分析"},
                ]
            }
        ]
    },
    {
        text: "前端项目",
        icon: "pen-to-square",
        prefix: "/front-project/",
        children: [
            {text: "小兔鲜PC (Vue3+Pinia+js)", icon: "pen-to-square", link: "小兔鲜PC (Vue3_Pinia_js)/"},
            {text: "小兔鲜儿uni-app (Vue3+ts)", icon: "pen-to-square", link: "小兔鲜儿uni-app (Vue3_ts)/"},
            {text: "尚品汇 (Vue2+js)", icon: "pen-to-square", link: "尚品汇 (Vue2+js)/README"},
            {text: "硅谷甄选 (Vue3+ts)", icon: "pen-to-square", link: "硅谷甄选 (Vue3+ts)/README"},
            {text: "个人博客搭建教程", icon: "pen-to-square", link: "个人博客搭建教程/README"},
        ]
    },
    {
        text: "后端基础",
        icon: "pen-to-square",
        prefix: "/back-base/",
        children: [
            {text: "Java基础语法", icon: "pen-to-square", link: "1.Java基础语法/README"},
            {text: "Java核心", icon: "pen-to-square", link: "2.Java核心"},
            {text: "JavaWeb", icon: "pen-to-square", link: "3.JavaWeb"},
            {text: "mysql", icon: "pen-to-square", link: "4.mysql/MySQL"},
        ]
    },
    {
        text: "后端进阶",
        icon: "pen-to-square",
        prefix: "/back-advance/",
        children: [
            {text: "SSM", icon: "pen-to-square", link: "5.SSM/SSM笔记"},
            {text: "redis", icon: "pen-to-square", link: "6.redis/README"},
            {text: "SpringBoot", icon: "pen-to-square", link: "7.SpringBoot2"},
            {text: "git", icon: "pen-to-square", link: "9.git/README"},
            {text: "nginx", icon: "pen-to-square", link: "10.nginx"},
        ]
    },
    {
        text: "后端高级",
        icon: "pen-to-square",
        prefix: "/back-senior/",
        children: [
            {text: "docker", icon: "pen-to-square", link: "11.docker/README"},
            {text: "gitlab+jeckins", icon: "pen-to-square", link: "12.gitlab+jeckins/README"},
            {text: "SpringSecurity", icon: "pen-to-square", link: "13.SpringSecurity/README"},
            {text: "Netty", icon: "pen-to-square", link: "14.Netty"},
            {text: "arthas", icon: "pen-to-square", link: "15.arthas"},
            {text: "ShardingSphere5", icon: "pen-to-square", link: "16.ShardingSphere5"},
            {text: "mongodb", icon: "pen-to-square", link: "17.mongodb/mongodb"},
        ]
    },
    {
        text: '谷粒商城',
        icon: "pen-to-square",
        prefix: "/gulimall/",
        children: [
            {
                text: '基础篇',
                children: [
                    { text: '前后端环境搭建', link: 'base1' },
                    { text: '前后端联调', link: 'base2' },
                ]
            },
            {
                text: '高级篇',
                children: [
                    { text: 'Elasticsearch & nginx', link: 'advanced1' },
                    { text: 'Redisson & SpringCache', link: 'advanced2' },
                    { text: 'CompletableFuture', link: 'advanced3' },
                    { text: 'Spring Session & OAuth2.0', link: 'advanced4' },
                    { text: 'RabbitMQ & Seata', link: 'advanced5' },
                    { text: '支付 & Sentinel', link: 'advanced6' },
                ]
            },
            {
                text: '集群篇',
                children: [
                    { text: 'K8s & kubesphere', link: 'cluster' },
                ]
            }

        ]
    },
    {
        text: '常用功能',
        prefix: "/CommonFunctions/",
        children: [
            { text: 'SpringBoot相关', link: '1.SpringBoot' },
            { text: 'mysql相关', link: '2.mysql' },
            { text: 'docker相关', link: '3.docker' },
            { text: 'maven相关', link: '4.maven' },
            { text: 'linux相关', link: '5.linux' },
            { text: 'windows相关', link: '6.windows' },
            { text: 'git相关', link: '7.git' },
        ]
    },
    {
        text: '阅读源码',
        prefix: "/sourceCode/",
        children: [
            {
                text: 'Spring',
                prefix: "spring/",
                children: [
                    { text: '搭建SpringBoot源码环境', link: 'SpringBoot/README' },
                    { text: 'SpringBoot自动配置 & 请求处理', link: 'SpringBoot/1.自动配置 & 请求处理' },
                    { text: 'SpringBoot异常处理', link: 'SpringBoot/2.异常处理/' },
                    { text: 'SpringSecurity源码阅读', link: 'SpringSecurity/README' },
                    { text: 'SpringSecurity基础知识', link: 'SpringSecurity/learn' },
                ]
            },
            {
                text: 'Tomcat',
                children: [
                    { text: 'Tomcat源码阅读', link: 'tomcat' },
                ]
            },
            {
                text: 'Mybatis',
                children: [
                    { text: 'MyBatis源码阅读', link: 'mybatis/README' },
                ]
            }
        ]
    },
]);
