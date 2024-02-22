import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    "/demo/",
    {
        text: "前端",
        icon: "book",
        prefix: "/front/",
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
