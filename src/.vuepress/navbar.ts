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
                    {text: "html基础", icon: "pen-to-square", link: "1.html.html"},
                    {text: "css基础", icon: "pen-to-square", link: "2.css"},
                    {text: "移动端布局", icon: "pen-to-square", link: "3.mobile"},
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
                text: "npm基本使用",
                icon: "pen-to-square",
                link: "npm/1.npm基础"
            },
            {
                text: "scss",
                icon: "pen-to-square",
                link: "scss/1.scss基础"
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
    // {
    //     text: "博文",
    //     icon: "pen-to-square",
    //     prefix: "/posts/",
    //     children: [
    //         {
    //             text: "苹果",
    //             icon: "pen-to-square",
    //             prefix: "apple/",
    //             children: [
    //                 {text: "苹果1", icon: "pen-to-square", link: "1"},
    //                 {text: "苹果2", icon: "pen-to-square", link: "2"},
    //                 "3",
    //                 "4",
    //             ],
    //         },
    //         {
    //             text: "香蕉",
    //             icon: "pen-to-square",
    //             prefix: "banana/",
    //             children: [
    //                 {
    //                     text: "香蕉 1",
    //                     icon: "pen-to-square",
    //                     link: "1",
    //                 },
    //                 {
    //                     text: "香蕉 2",
    //                     icon: "pen-to-square",
    //                     link: "2",
    //                 },
    //                 "3",
    //                 "4",
    //             ],
    //         },
    //         {text: "樱桃", icon: "pen-to-square", link: "cherry"},
    //         {text: "火龙果", icon: "pen-to-square", link: "dragonfruit"},
    //         "tomato",
    //         "strawberry",
    //     ],
    // },
    // {
    //     text: "V2 文档",
    //     icon: "book",
    //     link: "https://theme-hope.vuejs.press/zh/",
    // },
]);
