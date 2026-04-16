# apzs 的个人博客

[![GitHub stars](https://img.shields.io/github/stars/apzs/apzs.github.io.svg?style=flat-square&logo=github)](https://github.com/apzs/apzs.github.io/stargazers)
[![License](https://img.shields.io/github/license/apzs/apzs.github.io.svg?style=flat-square)](https://github.com/apzs/apzs.github.io/blob/master/LICENSE)

## 📝 项目简介

这是一个基于 **VuePress 2** 和 **vuepress-theme-hope** 构建的个人技术博客与学习笔记库。主要记录了在全栈开发过程中的技术积累、项目经验以及各类中间件的学习笔记。

- **预览地址**：[apzs.github.io](https://apzs.github.io)
- **核心理念**：越努力，越幸运。

## 🚀 技术栈

- **SSG 框架**：[VuePress 2](https://v2.vuepress.vuejs.org/)
- **主题**：[vuepress-theme-hope](https://theme-hope.vuejs.press/)
- **开发语言**：[TypeScript](https://www.typescriptlang.org/)
- **部署方式**：GitHub Actions

## 📂 目录结构说明

项目的核心内容均位于 `src` 目录下，按技术领域进行了详细划分：

```text
.
├── src/
│   ├── .vuepress/          # VuePress 配置目录（主题、插件、导航栏等）
│   ├── back-base/          # Java 后端基础（Java 核心、JavaWeb、MySQL）
│   ├── back-advance/       # Java 后端进阶（Redis、Nginx、SSM、SpringBoot）
│   ├── back-senior/        # Java 后端高级（Docker、Netty、Spring Security、ShardingSphere）
│   ├── front-base/         # 前端基础（HTML/CSS、JS 核心、Ajax、Promise）
│   ├── front-advance/      # 前端进阶（React、Vue 2/3、Webpack、SCSS、NPM）
│   ├── front-project/      # 前端实战（博客搭建、小兔鲜儿、硅谷甄选、尚品汇）
│   ├── sourceCode/         # 源码深度剖析（Spring、MyBatis、Tomcat）
│   ├── gulimall/           # 谷粒商城项目全套学习笔记
│   ├── CommonFunctions/    # 常用工具与命令查阅手册（Git、Linux、Docker 等）
│   └── README.md           # 博客首页配置
├── .github/workflows/      # GitHub Actions 自动化部署配置
├── package.json            # 项目依赖与脚本配置
└── README.md               # 项目主说明文档（当前文件）
```

## 🛠️ 本地开发指南

### 1. 克隆项目
```bash
git clone https://github.com/apzs/apzs.github.io.git
cd apzs.github.io
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
启动后访问 `http://localhost:8080` (默认端口) 即可实时预览。

### 4. 构建静态站点
```bash
npm run build
```
构建生成的静态文件将存放在 `src/.vuepress/dist` 目录下。

## 📦 自动化部署

本项目已配置 **GitHub Actions**。每当向 `master` 分支推送代码时，系统会自动触发构建流程，并将生成的静态页面发布到 `gh-pages` 分支，实现自动更新。

## 🤝 鸣谢

本项目部分内容参考或引用了互联网上的优秀技术博客，感谢各位开发者的无私分享。如有侵权，请联系删除。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源。
