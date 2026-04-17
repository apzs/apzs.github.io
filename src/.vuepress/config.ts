import {defineUserConfig, viteBundler} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";
// @ts-ignore
import modifyImagePath from "./plugin.js";
// @ts-ignore
export default defineUserConfig({
    base: "/",
    lang: "zh-CN",
    title: "apzs",
    description: "apzs 的个人博客",
    theme,
    plugins: [
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
            // 为分类和标签添加索引
            customFields: [
                {
                    getter: (page) => page.frontmatter.category as string,
                    formatter: "分类：$content",
                },
                {
                    getter: (page) => page.frontmatter.tag as string,
                    formatter: "标签：$content",
                },
            ],
        }),
    ],
    extendsMarkdown: (md,app) => {
        const host = "https://gitlab.com/apzs/image/-/raw/master/"
        const defaultRender = md.renderer.rules.image;
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const href = token.attrs[token.attrIndex('src')][1];
            // 获取当前 Markdown 文件路径
            const filePath = env.filePathRelative;

            // 解析当前文件的目录路径
            const dirPath = filePath.   substring(0,filePath.indexOf('/', 1) + 1);
            if (!href.startsWith("http")){
                // 修改图片路径逻辑
                // const newHref = host + dirPath + (href.startsWith("./") ? href.substring(2) : href)
                const newHref = host + (href.startsWith("./") ? href.substring(2) : href)
                token.attrs[token.attrIndex('src')][1] = newHref;
                console.log(newHref)
            }
            return defaultRender(tokens, idx, options, env, self);
        };
    }
});
