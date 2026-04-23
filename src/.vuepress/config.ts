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

        // ==========================================
        // 1. 处理标准的 Markdown 图片语法 ![alt](src)
        // （保留你原来的逻辑，因为这是标准的 image token，能跑通）
        // ==========================================
        const defaultRender = md.renderer.rules.image;
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const srcIndex = token.attrIndex('src');
            const href = token.attrs[srcIndex][1];

            const filePath = env.filePathRelative || "";
            const dirPath = filePath ? filePath.substring(0, filePath.lastIndexOf('/') + 1) : "";

            if (!href.startsWith("http") && !href.startsWith("//")) {
                const baseUrl = new URL(dirPath, host).href;
                const newHref = new URL(href, baseUrl).href;
                token.attrs[srcIndex][1] = newHref;
            }
            return defaultRender(tokens, idx, options, env, self);
        };

        // ==========================================
        // 2. 处理原生 HTML 标签 (<video>, <source>)
        // 【关键修改】：使用 md.core.ruler 在 AST 解析阶段直接修改内容
        // ==========================================
        md.core.ruler.push('replace_html_video_src', (state) => {
            const env = state.env;
            // 防御性判断：有些页面可能没有相对路径信息
            if (!env.filePathRelative) return;

            const filePath = env.filePathRelative;
            const dirPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);

            // 统一的正则替换逻辑
            const replaceSrc = (content) => {
                return content.replace(/(<(?:source|video)[^>]+src=["'])([^"']+)(["'])/gi, (match, prefix, src, suffix) => {
                    // 如果已经是绝对路径，则跳过
                    if (!src.startsWith("http") && !src.startsWith("//") && !src.startsWith("data:")) {
                        try {
                            const baseUrl = new URL(dirPath, host).href;
                            const newSrc = new URL(src, baseUrl).href;
                            console.log("AST 替换 HTML 成功 => " + newSrc);
                            return prefix + newSrc + suffix;
                        } catch (e) {
                            return match;
                        }
                    }
                    return match;
                });
            };

            // 遍历所有 Token 树
            state.tokens.forEach((token) => {
                // 情况 A：块级 HTML（比如前后有空行的 <video>）
                if (token.type === 'html_block') {
                    token.content = replaceSrc(token.content);
                }
                // 情况 B：行内 HTML（比如嵌套在段落里的 <video>），它存在于 inline 类型的 children 里
                if (token.type === 'inline' && token.children) {
                    token.children.forEach(child => {
                        if (child.type === 'html_inline') {
                            child.content = replaceSrc(child.content);
                        }
                    });
                }
            });
        });
    }
});
