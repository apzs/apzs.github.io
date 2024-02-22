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
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    })
  ],
  // Enable it with pwa
  // shouldPrefetch: false,
  extendsBundlerOptions: (config, app) => {
    modifyImagePath()
  },
});
