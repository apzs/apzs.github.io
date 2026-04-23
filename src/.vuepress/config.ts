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
    shouldPrefetch: false, // 关闭预获取，交给 PWA 插件处理
    bundler: viteBundler({
        viteOptions: {
            // 告诉 Vite 把 .bmp 文件当作静态资源处理，不要当成 JS 解析
            assetsInclude: ['**/*.bmp',"**/*.jpg","**/*.JPG"]
        }
    }),
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
    extendsMarkdown: (md, app) => {
        const host = "https://gitlab.com/apzs/apzs/-/raw/master/";

        // 提取公共的路径转换逻辑
        const getNewHref = (href, env) => {
            if (!href || href.startsWith("http") || href.startsWith("//") || href.startsWith("data:")) {
                return href;
            }
            const filePath = env.filePathRelative || "";
            const dirPath = filePath ? filePath.substring(0, filePath.lastIndexOf('/') + 1) : "";
            try {
                const baseUrl = new URL(dirPath, host).href;
                return new URL(href, baseUrl).href;
            } catch (e) {
                return href;
            }
        };

        // ==========================================
        // 1. 处理标准的 Markdown 图片语法 ![alt](src)
        // ==========================================
        const defaultImageRender = md.renderer.rules.image;
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const srcIndex = token.attrIndex('src');
            if (srcIndex !== -1) {
                token.attrs[srcIndex][1] = getNewHref(token.attrs[srcIndex][1], env);
            }
            return defaultImageRender(tokens, idx, options, env, self);
        };

        // ==========================================
        // 2. 处理原生 HTML 标签 (<img>, <video>, <source>)
        // ==========================================
        const rewriteHtmlSrc = (tokens, idx, options, env, self, defaultRender) => {
            // 【关键】：必须完整透传所有参数，防止 @mdit-vue/plugin-sfc 报错
            let htmlContent = defaultRender ? defaultRender(tokens, idx, options, env, self) : tokens[idx].content;

            // 【关键修改】：正则增加对 img 标签的支持
            // 匹配 <img src="...">, <video src="...">, <source src="...">
            return htmlContent.replace(/(<(?:img|source|video)[^>]+src=["'])([^"']+)(["'])/gi, (match, prefix, src, suffix) => {
                const newSrc = getNewHref(src, env);
                if (newSrc !== src) {
                    console.log(`HTML Tag Replaced: ${src} => ${newSrc}`);
                    return prefix + newSrc + suffix;
                }
                return match;
            });
        };

        // 保存原有的渲染器
        const defaultHtmlBlockRender = md.renderer.rules.html_block;
        const defaultHtmlInlineRender = md.renderer.rules.html_inline;

        // 劫持渲染逻辑
        md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
            return rewriteHtmlSrc(tokens, idx, options, env, self, defaultHtmlBlockRender);
        };
        md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
            return rewriteHtmlSrc(tokens, idx, options, env, self, defaultHtmlInlineRender);
        };
    }
});
