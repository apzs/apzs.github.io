# 个人博客搭建教程

## 1、准备工作

### 1.1、新建仓库

首先新建一个仓库，仓库的名字为自己的用户名（~~我要设置的项目名为`https://github.com/`后面跟的`apzs`~~。这样的话，在github上部署时就不用带上前缀）<font style="color:red">仓库名应设置为`apzs.github.io`，需要在用户名后面添加`.github.io`，最开始搞错了</font>

![image-20221105212222947](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105212222947.png)

如果是`gitee`的话，注意区分`姓名`和`个人空间地址`

![image-20221105213121782](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105213121782.png)

我要设置的项目名为`https://gitee.com/`后面跟的`apzs`

<font style="color:red">仓库名应设置为`apzs.gitee.io`，需要在个人空间地址后面添加`.gitee.io`,最开始搞错了</font>

![image-20221105212943650](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105212943650.png)

### 1.2、推送到远程仓库

新建一个和仓库同名的文件夹，然后执行如下命名以初始化`git`

```bash
git init
```

![image-20221105213709637](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105213709637.png)

新建`README.md`文档，在里面输入一些个人描述

![image-20221105213925878](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105213925878.png)

然后依次执行如下命令，将文件推送到远程仓库

```bash
git add .     #跟踪所有文件，并把新文件放入暂存区(将该文件夹下的所有文件都由git管理)
git commit -m "first commit"  #提交所有暂存区文件到本地版本库
git branch -M master          #创建master分支
git remote add origin git@github.com:apzs/apzs.git #添加远程仓库，需要指定自己的仓库地址
git push -u origin master     #推送到远程仓库
```

![image-20221105214214290](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105214214290.png)

此时就推送到远程仓库了

![image-20221105215029612](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105215029612.png)

可以使用如下方式同时推送到`github`和`gitee`

```bash
git remote add gitee git@gitee.com:apzs/apzs.git  #添加gitee远程仓库（注意更换为自己的远程仓库地址）
git push -u gitee "master" #推送到gitee的master分支上
```

![image-20221105215541933](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105215541933.png)

## 2、 快速上手

~~全局安装`vuepress`(不推荐)~~

~~根据[官方文档](https://vuepress.vuejs.org/zh/)提示，首先全局安装`vuepress`（官方已经不推荐全局安装`vuepress`，因此该步骤省略）~~

~~`yarn global add vuepress # 或者：npm install -g vuepress`~~

参照[官方文档](https://vuepress.vuejs.org/zh/guide/getting-started.html)完成创建

1. 创建并进入一个新目录 (我们已经创建了，此步骤可跳过)

   `mkdir vuepress-starter && cd vuepress-starter`

2. 使用你喜欢的包管理器进行初始化

   ```bash
   yarn init # npm init
   ```

3. 将 VuePress 安装为本地依赖

   我们已经不再推荐全局安装 VuePress

   ```bash
   yarn add -D vuepress # npm install -D vuepress
   ```

4. 创建你的第一篇文档  (此方式`windows`用不了，可以在`apzs`项目里新建`docs`文件夹，在`docs`里新建`README.md`文件，在该文件里写内容)

   ```bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

5. 在 `package.json` 中添加一些 [scripts(opens new window)](https://classic.yarnpkg.com/zh-Hans/docs/package-json#toc-scripts)

   这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。

   ```json
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",  //使用 "docs:dev": "vuepress dev docs --temp .temp", 可实现热更新
       "docs:build": "vuepress build docs"
     }
   }
   ```

6. 在本地启动服务器

   ```bash
   yarn docs:dev # npm run docs:dev
   ```

   VuePress 会在 [http://localhost:8080 (opens new window)](http://localhost:8080/)启动一个热重载的开发服务器。

**步骤2~3图片：**

![image-20221105220812051](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105220812051.png)

**步骤4图片：(在`apzs`项目里新建`docs`文件夹，在`docs`里新建`README.md`文件，在该文件里写内容)**

![image-20221105221808464](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105221808464.png)

**步骤5图片：(如果存在`scripts`标签直接替换即可)**

![image-20221105223310197](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105223310197.png)

**步骤6图片**

![image-20221105222820199](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105222820199.png)

## 3、默认主题配置

### [首页](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)

`VuePress`支持[YAML front matter](https://jekyllrb.com/docs/frontmatter/)，因此可以在`docs/README.md`里添加如下代码来进行首页配置

```yaml
---
home: true
## heroImage: /hero.png 由于我们没有这个图片所以注释掉
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

![image-20221105224021385](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105224021385.png)

重新执行`yarn docs:dev`即可看到主页

![image-20221105224410374](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105224410374.png)



### [目录结构](https://vuepress.vuejs.org/zh/guide/directory-structure.html)

VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

注意

请留意目录名的大写。

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。

注意

当你想要去自定义 `templates/ssr.html` 或 `templates/dev.html` 时，最好基于 [默认的模板文件 (opens new window)](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html)来修改，否则可能会导致构建出错。

#### [默认的页面路由](https://vuepress.vuejs.org/zh/guide/directory-structure.html#默认的页面路由)

此处我们把 `docs` 目录作为 `targetDir` （参考 [命令行接口](https://vuepress.vuejs.org/zh/api/cli.html#基本用法)），下面所有的“文件的相对路径”都是相对于 `docs` 目录的。在项目根目录下的 `package.json` 中添加 `scripts` ：

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

对于上述的目录结构，默认页面路由地址如下：

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

在`docs`文件夹下新建`about`文件夹，在`about`文件夹下新建`README.md`文件

在`docs`文件夹下新建`about2.md`文件

![image-20221106100100509](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106100100509.png)

`docs`下面有个`README.md`文件，因此可以访问 http://localhost:8080/ （根路径为`docs`，并不是以项目路径为根路径）

如果想查看`docs/about/README.md`文件，则可以访问 http://localhost:8080/about/

![image-20221105225612821](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105225612821.png)

如果想查看`docs/about2.md`文件，则可以访问 http://localhost:8080/about2.html

![image-20221105230001106](https://gitlab.com/apzs/image/-/raw/master/image/image-20221105230001106.png)

### [导航栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)

导航栏可能包含你的页面标题、[搜索框](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#搜索框)、 [导航栏链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#导航栏链接)、[多语言切换](https://vuepress.vuejs.org/zh/guide/i18n.html)、[仓库链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#git-仓库和编辑链接)，它们均取决于你的配置。

#### [导航栏 Logo](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#导航栏-logo)

你可以通过 `themeConfig.logo` 增加导航栏 Logo ，Logo 可以被放置在[公共文件目录](https://vuepress.vuejs.org/zh/guide/assets.html#public-files)：( 可以存放在`docs/.vuepress/public`: 静态资源目录 里，具体目录可以参见目录结构)

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/assets/img/logo.png',
  }
}
```

创建的文件如下：

![image-20221106100838957](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106100838957.png)

运行后，`logo`已经显示出来了

![image-20221106100733160](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106100733160.png)

#### [导航栏链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#导航栏链接)

你可以通过 `themeConfig.nav` 增加一些导航栏链接:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```

外部链接 `<a>` 标签的特性将默认包含`target="_blank" rel="noopener noreferrer"`，你可以提供 `target` 与 `rel`，它们将被作为特性被增加到 `<a>` 标签上：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'External', link: 'https://google.com', target:'_self', rel:'' },
      { text: 'Guide', link: '/guide/', target:'_blank' }
    ]
  }
}
```

当你提供了一个 `items` 数组而不是一个单一的 `link` 时，它将显示为一个 `下拉列表` ：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
```

此外，你还可以通过嵌套的 `items` 来在 `下拉列表` 中设置分组：（就是将`link: '/language/chinese/'`换成了`items: [/*  */] `）

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

[完整配置](other\导航栏完整配置.md)的显示效果：

![image-20221106153715069](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106153715069.png)

#### [禁用导航栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#禁用导航栏)

你可以使用 `themeConfig.navbar` 来禁用所有页面的导航栏：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    navbar: false
  }
}
```

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏：

```yaml
---
navbar: false
---
```

------

在`docs/.vuepress/config.js`文件添加如下配置：

![image-20221106154011079](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106154011079.png)

此时全局都禁用了导航栏

![image-20221106104018273](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106104018273.png)

------

如果只在`docs\about2.md`文件里设置禁用导航栏，则只在访问当前文件时禁用导航栏

![image-20221106104201605](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106104201605.png)

此时访问 http://localhost:8080/about2.html 则看不到导航栏

![image-20221106104349061](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106104349061.png)

访问[其他页面](http://localhost:8080/about/)则可以看到导航栏

![image-20221106104642773](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106104642773.png)

### [侧边栏--数组写法](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#侧边栏)

侧边栏的两种形式：**数组**（适合介绍页）、**对象**（适合博客）

想要使 侧边栏（Sidebar）生效，需要配置 `themeConfig.sidebar`，基本的配置，需要一个包含了多个链接的数组：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```

你可以省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

------

在`docs\.vuepress\config.js`里添加如下配置

```json
//侧边栏
sidebar: [
    '/',       //  docs/README.md        以"/"结尾会视为"/README.md"
    '/about/', //  docs/about/README.md  以"/"结尾会视为"/README.md"
    ['/about2', '指定文字']  // docs/about2.md 不是以"/"结尾并且没有后缀，会自动加上".md"后缀
]
```

![image-20221106154236281](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106154236281.png)

此时已经生效了，这种方式设置的侧边栏所有页面的侧边栏都是一样的，因此此方式适合写介绍页，不适合写博客

![image-20221106154436596](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106154436596.png)

#### [嵌套的标题链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#嵌套的标题链接)

默认情况下，侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，你可以通过 `themeConfig.sidebarDepth` 来修改它的行为。默认的深度是 `1`，它将提取到 `h2` 的标题，设置成 `0` 将会禁用标题（headers）链接，同时，最大的深度为 `2`，它将同时提取 `h2` 和 `h3` 标题。

也可以使用 `YAML front matter` 来为某个页面重写此值：

```md
---
sidebarDepth: 2
---
```

#### [显示所有页面的标题链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#显示所有页面的标题链接)

默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接，你可以将 `themeConfig.displayAllHeaders` 设置为 `true` 来显示所有页面的标题链接：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    displayAllHeaders: true // 默认值：false
  }
}
```

#### [活动的标题链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#活动的标题链接)

默认情况下，当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新，这个行为可以通过以下的配置来禁用：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    activeHeaderLinks: false, // 默认值：true
  }
}
```

提示

值得一提的是，当你禁用此选项时，此功能的相应脚本将不会被加载，这是我们性能优化的一个小点。

#### [侧边栏分组](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#侧边栏分组)

你可以通过使用**对象**来将侧边栏划分成多个组：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',   // 必要的
        path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  }
}
```

侧边栏的每个子组默认是可折叠的，你可以设置 `collapsable: false` 来让一个组永远都是展开状态。

一个侧边栏的子组配置同时支持 [sidebarDepth](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#nested-header-links) 字段用于重写默认显示的侧边栏深度(`1`)。

提示

嵌套的侧边栏分组也是支持的。

------

在添加[如下配置](other\侧边栏分组完整配置.md)，并在`docs`文件夹里新建`note`文件夹，并添加如下几个文件  (`children`使用绝对路径)

![image-20221106154829314](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106154829314.png)

显示效果：

![image-20221106154728811](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106154728811.png)

### [侧边栏--对象写法](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#多个侧边栏)

侧边栏的两种形式：**数组**（适合介绍页）、**对象**（适合博客）

#### [多个侧边栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#多个侧边栏)

如果你想为不同的页面组来显示不同的侧边栏，首先，将你的页面文件组织成下述的目录结构：

```text
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

接着，遵循以下的侧边栏配置：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}
```

注意

确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。

------

```json
// 匹配路径长的写在上面，匹配路径短的写在下面
sidebar: {
    '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
    ],
    // fallback
    '/': [
        '',        /* / 首页 */
        'contact', /* /contact.html */
        'about'    /* /about.html */
    ]
}
```

![image-20221106160922882](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106160922882.png)

显示效果如下：

![image-20221106161022026](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106161022026.png)

#### [自动生成侧栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#自动生成侧栏)

如果你希望自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏，你可以通过 `YAML front matter` 来实现：

```yaml
---
sidebar: auto
---
```

你也可以通过配置来在所有页面中启用它：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

在 [多语言](https://vuepress.vuejs.org/zh/guide/i18n.html) 模式下, 你也可以将其应用到某一特定的语言下：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
     '/zh/': {
       sidebar: 'auto'
     }
  }
}
```

------

可以在`docs\about\README.md`文件里添加如下配置自动显示侧边栏（需要注释掉刚刚配置的全局的侧边栏）

```yaml
---
sidebar: auto
---

# 1.一级标题
## 1.1 二级标题
### 1.1.1 三级标题
#### 1.1.1.1 四级标题

# 2.一级标题
## 2.1 二级标题
### 2.1.1 三级标题
## 2.2.二级标题
### 2.2.1 三级标题
#### 2.2.1.1 四级标题
#### 2.2.1.2 四级标题
#### 2.2.1.3 四级标题
### 2.2.2 三级标题
#### 2.2.2.1 四级标题
#### 2.2.2.2 四级标题
#### 2.2.2.3 四级标题
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20221106115406171.png" alt="image-20221106115406171" style="zoom: 67%;" />

此时会显示该`mackdown`文件的**第一个一级标题**和**其他所有的二级标题和三级标题** (这个一级标题必须放在文章的首个有效行，局部配置和空行不算有效行，前面不能使用`<!-- # 关于 -->`类似的注释，否则将无法显示首个一级标题)

![image-20221106115557718](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106115557718.png)

可以使用`title`指定一级标题名称

```
---
sidebar: auto
title: 标题
---
```

![image-20221106120457684](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106120457684.png)

------

在`docs\.vuepress\config.js`文件里使用`sidebar: 'auto'`即可配置全局侧边栏

![image-20221106153512448](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106153512448.png)



![image-20221106151713732](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106151713732.png)

#### [禁用侧边栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#禁用侧边栏)

你可以通过 `YAML front matter` 来禁用指定页面的侧边栏：

```yaml
---
sidebar: false
---
```

------

![image-20221106151859111](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106151859111.png)

![image-20221106151838765](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106151838765.png)

### [SEO](https://vuepress.vuejs.org/zh/config/#title)

#### [title](https://vuepress.vuejs.org/zh/config/#title)

- 类型: `string`
- 默认值: `undefined`

网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。

#### [description](https://vuepress.vuejs.org/zh/config/#description)

- 类型: `string`
- 默认值: `undefined`

网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。

#### [head](https://vuepress.vuejs.org/zh/config/#head)

- 类型: `Array`
- 默认值: `[]`

额外的需要被注入到当前页面的 HTML `<head>` 中的标签，每个标签都可以以 `[tagName, { attrName: attrValue }, innerHTML?]` 的格式指定，举个例子，增加一个自定义的 favicon：

```js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ]
}
```

------

在`docs\.vuepress\config.js`里添加如下配置：

```js
module.exports = {
    title: "个人笔记",
    description: "这是我的个人笔记",
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo.png' }],
        ['meta', { name: 'author', content: 'apzs' }],
        ['meta', { name: 'keywords', content: '这里主要记载Vue、ES6、Promise、SpringBoot、SpringCloud等技术' }],
    ]
}
```

![image-20221106164431565](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106164431565.png)

效果：

![image-20221106164335689](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106164335689.png)

### [最后更新时间](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#最后更新时间)

你可以通过 `themeConfig.lastUpdated` 选项来获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

请注意，`themeConfig.lastUpdated` 默认是关闭的，如果给定一个字符串，它将会作为前缀显示（默认值是：`Last Updated`）。

使用须知

由于 `lastUpdated` 是基于 `git` 的, 所以你只能在一个基于 `git` 的项目中启用它。此外，由于使用的时间戳来自 git commit，因此它将仅在给定页的第一次提交之后显示，并且仅在该页面后续提交更改时更新。

**拓展阅读:**

- [@vuepress/plugin-last-updated](https://vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html)

------

#### 添加`最后更新时间`

在`docs\.vuepress\config.js`文件里添加如下配置：

![image-20221106165037475](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106165037475.png)

在根路径创建`.gitignore`文件，不将`node_modules/`和`.temp`文件夹的内容添加到版本管理

```
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
 
## Editor directories and files
.idea
.vscode
.temp
*.suo
*.ntvs*
*.njsproj
*.sln
```

![image-20221106165411333](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106165411333.png)



```bash
git add .  #跟踪所有文件，并把新文件放入暂存区
git commit -m "测试更新时间"  #提交所有暂存区文件到本地版本库
```

![image-20221106165619087](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106165619087.png)

此时`更新时间`就显示出来了

![image-20221106165904014](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106165904014.png)

#### [插件的书写形式](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html#%E6%8F%92%E4%BB%B6%E7%9A%84%E9%80%89%E9%A1%B9)

##### [Babel 式](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html#babel-%E5%BC%8F)

插件可以通过在配置内的数组中封装名称和选项对象来指定选项：

```js
module.exports = {
  plugins: [
    [
      'vuepress-plugin-xxx',
      { /* options */ }
    ]
  ]
}
```

由于这种风格和 [babeld Plugin/Preset Options (opens new window)](https://babeljs.io/docs/en/plugins#plugin-preset-options)一致，我们称之为"Babel 风格"。

##### [对象式](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html#对象式)

VuePress 也提供了一种更简单的方式来使用来自依赖的插件：

```js
module.exports = {
  plugins: {
    'xxx': { /* options */ }
  }
}
```

#### [调整更新时间格式](https://vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html)

##### 安装

以管理员身份执行如下命令：

```bash
yarn add moment
```

如果出现`error An unexpected error occurred: "EPERM: operation not permitted, unlink 'D:\\apzs\\node_modules\\.bin\\vuepress'".`错误，就是没有以管理员身份执行命令

##### [使用](https://vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html#使用)

```js
module.exports = {
  plugins: ['@vuepress/last-updated']
}
```

#### [transformer](https://vuepress.vuejs.org/zh/plugin/official/plugin-last-updated.html#transformer)

- 类型: `(timestamp: number, lang: string) => string`
- 默认值: `undefined`

默认情况下，本插件为每个页面生成一个 13 位的时间戳，你可以传入一个 transformer 将其转换为你想要的任何格式。

例子：

```javascript
const moment = require('moment');

module.exports = {
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
}
```



------

在`docs\.vuepress\config.js`里添加如下配置，注意：需要与`themeConfig`平级、需要先使用`yarn add moment`命令安装`moment`

**Babel 式：**

```js
module.exports = {
	plugins: [
	    [
	        '@vuepress/last-updated',
	        {
	            transformer: (timestamp, lang) => {
	                // 不要忘了安装 moment
	                const moment = require('moment')
	                // moment.locale(lang)   访问 http://localhost:8080/zh-cn/about2.html 更新时间才会以中文显示
	                moment.locale('zh-cn')
	                // 格式参考 http://momentjs.cn/docs/#/use-it/typescript/
	                return moment(timestamp).format("LLLL")
	            }
	        }
	    ]
	]
}
```

**对象式：**

```js
module.exports = {
    plugins: [
        {
            '@vuepress/last-updated': {
                transformer: (timestamp, lang) => {
                    // 不要忘了安装 moment
                    const moment = require('moment')
                    // moment.locale(lang)   访问 http://localhost:8080/zh-cn/about2.html 更新时间才会以中文显示
                    moment.locale('zh-cn')
                    // 格式参考 http://momentjs.cn/docs/#/use-it/typescript/
                    return moment(timestamp).format("LLLL")
                }
            }
        }
    ]
}
```

![image-20221106171823275](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106171823275.png)

显示效果：

![image-20221106171848120](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106171848120.png)

### 添加到网站收录



![image-20230306101113800](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306101113800.png)



#### 谷歌

![image-20230306103138308](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306103138308.png)





![image-20230306103335091](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306103335091.png)



![image-20230306103505562](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306103505562.png)



https://apzs.github.io/

![image-20230306104359854](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306104359854.png)



![image-20230306104431692](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306104431692.png)

https://apzs.github.io/sitemap.xml

![image-20230306104533612](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306104533612.png)



![image-20230306104622690](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306104622690.png)





![image-20230306102348629](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306102348629.png)



<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230306102127413.png" alt="image-20230306102127413" style="zoom: 50%;" />



![image-20230306101931195](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306101931195.png)



![image-20230306101801757](https://gitlab.com/apzs/image/-/raw/master/image/image-20230306101801757.png)



### [GitHub Pages](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

```bash
#!/usr/bin/env sh

## 确保脚本抛出遇到的错误
set -e

## 生成静态文件
npm run docs:build

## 进入生成的文件夹
cd docs/.vuepress/dist

## 如果是发布到自定义域名
## echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

## 如果发布到 https://<USERNAME>.github.io
## git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

## 如果发布到 https://<USERNAME>.github.io/<REPO>
## git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

提示：你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。

------

如果你的`用户名`和`仓库名`不一致，需要指定`base`为你的`仓库名`

![image-20221106195000458](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106195000458.png)

然后在项目根目录新建`deploy.sh`文件，并指定自己`github`的用户名和仓库信息

![image-20221106195625117](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106195625117.png)

可以在`package.json`文件里添加快捷命令，由于该命令是`linux`上的命令，`windows`系统自带的终端无法执行，因此可以使用`git`自带的`Git Bash Here`来执行命令

```
"deploy": "bash deploy.sh"
```

![image-20221106195920596](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106195920596.png)

然后使用执行`yarn deploy`部署到`github`上

```bash
yarn deploy
```

如果不想使用`Git Bash Here`，也可以指定使用`npm`命令的终端为`git`的终端

```bash
npm config set script-shell "A:\\git\\Git\\bin\\bash.exe"
```

[此时报了个错](other/完整错误.md)，提示`/contact`和`/about`找不到，直接删掉`docs\.vuepress\config.js`里的配置即可

![image-20221106202530129](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106202530129.png)

请确保您具有正确的访问权限并且仓库库存在

```
ERROR: Repository not found.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
error Command failed with exit code 128.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

![image-20221106204931901](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106204931901.png)

添加权限：

![image-20221106210921077](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106210921077.png)

删除`docs\.vuepress\config.js`文件里的`base`配置（演示完后忘记删了）

![image-20221106210250754](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106210250754.png)

试了很久，最后找到原因了，项目名要设置为`apzs.github.io`才行

![image-20221106212738445](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106212738445.png)

再次执行`yarn deploy`

![image-20221106213143317](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106213143317.png)

至此，项目部署到`github`上成功

![image-20221106213430905](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106213430905.png)

可以点击自己项目的`Code` -> `About`右侧的设置，输入自己的网站连接，以展示自己的网站。

![image-20221107085510592](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107085510592.png)

### [PWA](https://vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#%E5%AE%89%E8%A3%85)

####  安装

```bash
yarn add -D @vuepress/plugin-pwa
## OR npm install -D @vuepress/plugin-pwa
```

#### [使用](https://vuepress.vuejs.org/zh/plugin/official/plugin-pwa.html#使用)

```javascript
module.exports = {
   plugins: {
    '@vuepress/pwa': {
       serviceWorker: true,
       updatePopup: {
         message: "New content is available.",
         buttonText: "Refresh"
       }
     }
  }
}
```

提示

为了让你的网站完全地兼容 PWA，你需要:

- 在 `.vuepress/public` 提供 Manifest 和 icons
- 在 `.vuepress/config.js` 添加正确的 [head links](https://vuepress.vuejs.org/config/#head)(参见下面例子).

更多细节，请参见 [MDN docs about the Web App Manifest (opens new window)](https://developer.mozilla.org/en-US/docs/Web/Manifest).

这是一个在VuePress中完全地兼容 PWA 的例子：

```javascript
module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
  }],
}
```

------

用对象写法使用该插件

![image-20221106232227095](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106232227095.png)

可以搜索 **manifest icons generator**，找到可以使用的在线生成网站，https://app-manifest.firebaseapp.com/ 是一个很好的在线生成的网站，可惜国内用不了

可以使用如下命令，克隆`vuepress`项目

```bash
git clone git@github.com:vuejs/vuepress.git
```

复制`vuepress\packages\docs\docs\.vuepress\public`文件夹里的`manifest.json`文件和`icons`文件夹

![image-20221106224306819](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106224306819.png)

粘贴到`apzs\docs\.vuepress\public`文件夹下下

![image-20221106224358429](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106224358429.png)

可以修改一下`docs\.vuepress\public\manifest.json`里的`name`和`short_name`

![image-20221106224437573](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106224437573.png)

根据官方提示添加如下配置，兼容 PWA 

![image-20221106224531958](https://gitlab.com/apzs/image/-/raw/master/image/image-20221106224531958.png)

如果使用`yarn docs:dev`启动后，没有应用上`@vuepress/pwa`，则需要使用`yarn add -D vuepress`命令，将 VuePress 安装为本地依赖（如果使用全局依赖`@vuepress/pwa`将不会生效）

![image-20221107084746985](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107084746985.png)

应用上`@vuepress/pwa`后，使用`yarn deploy`命令部署到`github`，部署到`github`会存在延迟，可以修改主页内容以判断是否成功应用上配置，然后在`Application` -> `Service Workers`里查看是否存在`pwa` （使用`yarn docs:dev`本地部署时，`pwa`不会生效）

![image-20221107085217969](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107085217969.png)

### [vssue评论](https://vssue.js.org/zh/guide/github.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-oauth-app)

#### 创建 GitHub OAuth App

前往 [Settings  ->  Developer Settings  ->  OAuth Apps](https://github.com/settings/developers)

![image-20221107091024732](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107091024732.png)

可以使用`API V3`和`API V4`两种方式，其优缺点如下所示：

[Github REST API V3](https://vssue.js.org/zh/guide/supported-platforms.html#github-rest-api-v3)

- Vssue API 包： [@vssue/api-github-v3](https://www.npmjs.com/package/@vssue/api-github-v3)
- 特点 / 缺点：
  - 需要设置 [clientSecret](https://vssue.js.org/zh/options/#clientsecret)
  - 评论无法排序
  - 评论可以编辑
  - 评论可以删除
  - 可以不登录浏览评论，但 API 有调用频率限制
- 开发者参考： [官方文档](https://developer.github.com/v3)

[Github GraphQL API V4](https://vssue.js.org/zh/guide/supported-platforms.html#github-graphql-api-v4)

- Vssue API 包： [@vssue/api-github-v4](https://www.npmjs.com/package/@vssue/api-github-v4)
- 特点 / 缺点：
  - 需要设置 [clientSecret](https://vssue.js.org/zh/options/#clientsecret)
  - 评论可以排序
  - 评论可以编辑
  - 评论可以删除
  - 要求登陆后才能浏览评论
- 开发者参考： [官方文档](https://developer.github.com/v4)

#### [安装](https://vssue.js.org/zh/guide/vuepress.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)

[支持的代码托管平台](https://vssue.js.org/zh/guide/supported-platforms.html#github)

使用如下命令安装`vssue`，我们使用`API V4`来创建评论

```bash
yarn add @vssue/vuepress-plugin-vssue  # npm install @vssue/vuepress-plugin-vssue
yarn add @vssue/api-github-v4          # npm install @vssue/api-github-v4
```

#### [配置插件](https://vssue.js.org/zh/guide/vuepress.html#使用插件)

> 通过 [VuePress 官方文档](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html) 查看使用插件的详细方法

```js
// .vuepress/config.js

module.exports = {
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github',

      // 其他的 Vssue 配置
      owner: 'OWNER_OF_REPO',
      repo: 'NAME_OF_REPO',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
    },
  },
};
```

> 提示
>
> 唯一的区别在于，你需要设置 `platform` 而不是对应的 `api` 包。
>
> `@vssue/vuepress-plugin-vssue` 会自动根据你设置的 `platform` 为你解析对应的 api 包：
>
> - platform `github` - api 包 `@vssue/api-github-v3`
> - platform `github-v4` - api 包 `@vssue/api-github-v4`
> - platform `gitlab` - api 包 `@vssue/api-gitlab-v4`
> - platform `bitbucket` - api 包 `@vssue/api-bitbucket-v2`
> - platform `gitee` - api 包 `@vssue/api-gitee-v5`
> - platform `gitea` - api 包 `@vssue/api-gitea-v1`

配置自己的信息，`platform`即为你使用的`api`包，`owner`为你的用户名，`repo`为你的仓库名，`clientId`和`clientSecret`为你刚刚创建的`GitHub OAuth App`信息

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20221107093218552.png" alt="image-20221107093218552" style="zoom:67%;" />

 在 [Settings  ->  Developer Settings  ->  OAuth Apps](https://github.com/settings/developers) 里选择自己刚刚创建的`app`名，即可查看`clientId`和`clientSecret`

![image-20221107093001880](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107093001880.png)

#### [使用插件](https://vssue.js.org/zh/guide/vuepress.html#%E4%BD%BF%E7%94%A8-vssue-%E7%BB%84%E4%BB%B6)

直接在想添加评论的`mackdown`后面添加`<Vssue/>`即可

![image-20221107094018874](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107094018874.png)

执行`yarn docs:dev`，在该`mackdown`对应的页面下成功添加评论

![image-20221107094129402](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107094129402.png)

使用`yarn docs:dev`命令部署后，访问 https://apzs.github.io/about2.html 页面，登录`github`后，出现`Failed to load comments`，并不能添加评论，打开控制台发现报了如下错误，一般这个错误就是跨域问题

![image-20221107100855562](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107100855562.png)

搜索一圈无果后，打开控制台可以发现 https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token

访问失败了，搜索这个接口发现该接口被墙了

![image-20221107110820581](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107110820581.png)

可以使用[特殊的方式](other\应用集成-在Hexo、Hugo博客框架中使用Gitalk基于Github上仓库项目的issue无后端服务评论系统实践....md)添加反向代理来解决跨域问题：https://blog.csdn.net/u013072756/article/details/126416759

不过几乎大部分白嫖的方式都不行了，需要自己有一台vps服务器或使用科学上网的方式访问

该问题解决后，点击`Click to create issue`创建一个`issue`即可添加评论

![image-20221107212655855](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107212655855.png)

此时在自己的仓库的`issue`里也能看到自己的`issue`

![image-20221107213858760](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107213858760.png)

#### [自动创建issue](https://vssue.js.org/zh/options/#autocreateissue)

添加`autoCreateIssue: true`配置后，不用点击`Click to create issue`，登陆后可以直接评论

![image-20221107111934579](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107111934579.png)

#### 全局添加评论

全局都添加评论功能需要使用 [主题的继承 | VuePress (vuejs.org)](https://vuepress.vuejs.org/zh/theme/inheritance.html#动机)

根据参考的[目录结构 | VuePress (vuejs.org)](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#开发主题)来添加配置

> 想要书写一个主题，首先在你文档根目录创建一个 `.vuepress/theme` 目录，接着创建一个 `Layout.vue` 文件：
>
> ```
> .
> └─ .vuepress
>  └─ theme
>      └─ Layout.vue
> ```
>
> 到这里，就像开发一个普通的 Vue 应用一样。如何组织你的主题，这完全取决于你。
>
> 随着需求的变化，只有一个布局组件 `Layout.vue` 可能还不够，你可能想要定义更多的布局组件用于不同的页面，你可能还想要自定义一个[调色板](https://vuepress.vuejs.org/zh/config/#palette-styl)，甚至应用一些插件。
>
> 那么是时候重新组织你的主题了！一个约定的主题的目录结构如下：
>
> ```
> theme
> ├── global-components
> │   └── xxx.vue
> ├── components
> │   └── xxx.vue
> ├── layouts
> │   ├── Layout.vue (必要的)
> │   └── 404.vue
> ├── styles
> │   ├── index.styl
> │   └── palette.styl
> ├── templates
> │   ├── dev.html
> │   └── ssr.html
> ├── index.js
> ├── enhanceApp.js
> └── package.json
> ```
>
> - `theme/global-components`: 该目录下的组件都会被自动注册为全局组件。想了解更多，请参考 [@vuepress/plugin-register-components (opens new window)](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components)。
> - `theme/components`: Vue 组件。
> - `theme/layouts`: 布局组件，其中 `Layout.vue` 是必需的。
> - `theme/styles`: 全局的样式和调色板。
> - `theme/templates`: 修改默认的模板文件。
> - `theme/index.js`: 主题文件的入口文件。
> - `theme/enhanceApp.js`: 主题水平的客户端增强文件。

复制克隆的[`vuepress`项目](https://github.com/vuejs/vuepress)的`vuepress\packages\@vuepress\theme-default\layouts\Layout.vue`文件

![image-20221107115022298](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107115022298.png)

在`docs\.vuepress`里新建`theme`文件夹，在`theme`文件夹里新建`layouts`文件夹，粘贴`Layout.vue`文件到`docs\.vuepress\theme\layouts`这里面

![image-20221107161058026](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107161058026.png)

复制`vuepress\packages\@vuepress\theme-default\util`文件夹

![image-20221107161233958](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107161233958.png)

粘贴到`docs\.vuepress\theme`下（注意是`docs\.vuepress\theme`下，而不是`docs\.vuepress\theme\layouts`下）

![image-20221107161505355](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107161505355.png)

在`docs\.vuepress\theme`目录下新建`index.js`文件（注意是`docs\.vuepress\theme`下，而不是`docs\.vuepress\theme\layouts`下）

[创建一个继承自 VuePress 默认主题的派生主题](https://vuepress.vuejs.org/zh/theme/inheritance.html#使用)

假设你想创建一个继承自 VuePress 默认主题的派生主题，你只需要在你的主题配置中配置 [extend](https://vuepress.vuejs.org/zh/theme/option-api.html#extend) 选项：

```js
// .vuepress/theme/index.js
module.exports = {
  extend: '@vuepress/theme-default'
}
```

![image-20221107161629257](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107161629257.png)

在`docs\.vuepress\theme\layouts\Layout.vue`里添加`Vssue`

```js
<Vssue :options="{ locale: 'zh' }" />
```

![image-20221107162233797](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107162233797.png)

此时就显示出来了，只不过样式有点问题

![image-20221107162145774](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107162145774.png)

只需要给`vssue`所在的类添加`theme-default-content content__default`就行了

![image-20221107162556102](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107162556102.png)

将`Vssue`组件修改这样就行了

```js
<Vssue class="theme-default-content content__default" :options="{ locale: 'zh' }" />
```

![image-20221107162731812](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107162731812.png)

最终效果：

![image-20221107162807901](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107162807901.png)

发布到线上时，可以修改`github`上配置`OAuth Apps`的`Homepage URL`和`Authorization callback URL`

![image-20221107101304167](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107101304167.png)

### [回到顶部](https://vuepress.vuejs.org/zh/plugin/official/plugin-back-to-top.html#vuepress-plugin-back-to-top)

#### 安装

```bash
yarn add -D @vuepress/plugin-back-to-top
## OR npm install -D @vuepress/plugin-back-to-top
```

#### 使用

```javascript
module.exports = {
  plugins: ['@vuepress/back-to-top']
}
```

![image-20221107170245341](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107170245341.png)

划到任意文章页面的底部，就出现返回顶部的按钮了

![image-20221107170220261](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107170220261.png)

### 谷歌数据分析

#### [~~创建媒体资源(这里创建错了)~~](https://analytics.google.com/)

首先需要创建账户，然后点击设置里面的`创建媒体资源`，信息随便填

![image-20221107201132534](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107201132534.png)

选择`网站`

![image-20221107201304277](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107201304277.png)

选择自己的网站

![image-20221107201457367](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107201457367.png)

此

![image-20221107201629748](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107201629748.png)

以下是此帐号的 Google 代码。请将该代码复制并粘贴到您网站上每个网页的代码中，紧跟在 `<head>` 元素之后。每个网页只能添加一个 Google 代码。

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-914BC3YVEQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-914BC3YVEQ');
</script>
```

是否使用 Google 跟踪代码管理器？

![image-20221107202211392](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107202211392.png)

而别人的是这样：(别人)

![代码](https://gitlab.com/apzs/image/-/raw/master/image\e29d705d82d643cf93168cee811247d3.png)

https://support.google.com/analytics/answer/9539598?hl=zh-Hans

> # 有关跟踪 ID 的变化
>
> Google Analytics（分析）4 媒体资源的 ID 以“**G-**”开头，而跟踪 ID 以“**UA-**”开头。
>
> ## 查找以“G-”开头的 ID
>
> 只有 GA4 媒体资源的 ID 以“G-”开头。
>
> 1. 登录到[您的 Google Analytics（分析）帐号](https://analytics.google.com/)。
> 2. 点击[管理](https://support.google.com/analytics/answer/6132368)。
> 3. 在“媒体资源”列的顶部，选择您的媒体资源。
> 4. 在“媒体资源”列中，点击**数据流**。
> 5. 您需要哪个数据流的 ID，就点击哪个数据流。
> 6. 以“G-”开头的相应 ID 会显示在右上角。
> 7. ![img](https://gitlab.com/apzs/image/-/raw/master/image/4vzOnPW93ZjrGTZKfeIJYHXXPmpfCmc0UMHy.gif)
>
> “媒体资源”列中没有显示“数据流”选项？您拥有的是 Universal Analytics 媒体资源，而不是 GA4 媒体资源。
>
> ## 我需要以“UA-”开头的 ID
>
> 如果您使用的网站开发工具平台不接受以“G-”开头的 ID，而是要求您输入以“UA-”开头的 ID，则您需要[设置 Universal Analytics 媒体资源](https://support.google.com/analytics/answer/10269537)。
>
> ## 查找以“UA-”开头的 ID
>
> 只有 Universal Analytics 媒体资源的 ID 以“UA-”开头。
>
> 1. 在 Universal Analytics 媒体资源中，点击[管理](https://support.google.com/analytics/answer/6132368)。
> 2. 在“媒体资源”列中，点击**媒体资源设置**。
> 3. 以“UA-”开头的相应 ID 会显示在“媒体资源设置”页面顶部。
>
> ![img](https://gitlab.com/apzs/image/-/raw/master/image/T5MmUrXoEiGQn1DhrWrF3uCjyesOuDqyYEAi.png)

https://support.google.com/analytics/answer/10269537

> # 为网站设置 Google Analytics（分析）(Universal Analytics)
>
> *本文适用于希望在新网站上设置 Google Analytics（分析）（使用 [Universal Analytics 媒体资源](https://support.google.com/analytics/answer/10220206)）的任何用户。Universal Analytics 是 Google Analytics（分析）的早期版本，仅支持网站衡量功能。如果您需要“UA-”跟踪 ID，请按照这篇文章中的说明操作。*
>
> 请仔细按以下说明操作。请务必点击**显示高级选项**，然后开启**创建 Universal Analytics 媒体资源**对应的开关（如下所示）。否则，您会创建一个 Google Analytics（分析）4 媒体资源。
>
> ## 创建 Google Analytics（分析）帐号
>
> 首先需要设置一个 Google Analytics（分析）帐号（除非您已有）。除非您要为该网站创建单独的帐号，否则请跳至[创建媒体资源](https://support.google.com/analytics/answer/10269537#property)。例如，如果此网站属于另一个企业，则您可能需要另外创建一个帐号。
>
> 1. 在[管理](https://support.google.com/analytics/answer/6132368)界面的“帐号”列中，点击**创建帐号**。
> 2. 提供帐号名称。配置[数据共享设置](https://support.google.com/analytics/answer/1011397)，以控制要与 Google 共享哪些数据。
> 3. 点击**下一步**，为帐号添加第一个媒体资源。
>
> ## 创建媒体资源
>
> 1. 是否接着上述“创建 Google Analytics（分析）帐号”步骤继续操作？如果是，请跳至第 2 步。否则，
>
>    - 在[管理](https://support.google.com/analytics/answer/6132368)界面中，查看“帐号”列，确保您已选择正确的帐号。然后，在*“媒体资源”*列中，点击**创建媒体资源**。
>
> 2. 输入媒体资源的名称（例如“My Business, Inc 网站”），并选择报告所用时区和币种。如果访问者在其时区的星期二访问您的网站，但却是您所在时区的星期一，则该访问会记录为星期一发生的访问。
>
>    - 如果您选择的时区使用夏时制，Google Analytics（分析）会根据相应的变化自动做出调整。如果您不想根据夏令时调整，请使用格林尼治标准时间。
>    - 更改时区只会影响未来的数据。如果您更改了现有媒体资源的时区，可能会发现数据中出现平点或峰值，这两种情况分别是由向前或向后调整时间所致。在您更新完设置后，报告数据在短期内可能还会继续采用原来的时区，直到 Google Analytics（分析）服务器处理完更改。
>
> 3. 点击媒体资源设置相关字段下方的**显示高级选项**。
>    ![img](https://gitlab.com/apzs/image/-/raw/master/image/AgRNGwoKWQVVYQt0DQEkIMMZ8OHNv_uX2L7aCIqzF_MgWnh0WdbxzLRrKixds4yvPyI=w1000.png)
>
> 4. 开启**创建 Universal Analytics 媒体资源**对应的开关。![img](https://gitlab.com/apzs/image/-/raw/master/image/5oAmliawp6oBF8wN9VSCRYQdyaRIparMPndocfv4kGX2dizOYZCiFrd5atCoKAxZ7S85=w1000.png)
>
> 5. 输入网站网址，并选择协议（http 或 https）。
>    大多数域名托管服务商仅支持在网址中使用 UTF-8 字符。如果您的域名中有符号和非 UTF-8 字符（包括西里尔字符），应改用 UTF-8 字符或 [Punycode](http://en.wikipedia.org/wiki/Punycode)（国际化域名编码）加以表示。不妨借助 [Punycode 转换工具](http://www.charset.org/punycode.php)进行转换。
>
> 6. 此时，选择创建
>
>    - Google Analytics（分析）4 媒体资源和 Universal Analytics 媒体资源
>
>      。此选项
>
>      - 会设置一个 Google Analytics（分析）4 媒体资源，与您的 Universal Analytics 媒体资源并行收集数据。将 Google Analytics（分析）4 媒体资源的代码添加到您的网站之后，系统会将数据同时发送到这两个媒体资源。您可以使用[媒体资源选择器](https://support.google.com/analytics/answer/10252712)或“管理”界面，在这两个媒体资源之间来回切换。
>
>      - 会在这两个媒体资源之间建立关联，让您稍后可以将 Universal Analytics 媒体资源中的配置设置迁移到 Google Analytics（分析）4 媒体资源。
>
>        **如何识别每种媒体资源**：如果您在第 2 步中将媒体资源命名为“Example”，那么您的 Universal Analytics 媒体资源的名称将是“Example (UA-1234567)”，而 Google Analytics（分析）4 媒体资源的名称则是“Example - GA4 (98765432)”。
>
>    - 仅 Universal Analytics 媒体资源。
>
>      如果您只需要 Universal Analytics 媒体资源，请选择此选项。
>
>      **如果您需要“UA-”跟踪 ID，请选择此选项。**
>      ![img](https://gitlab.com/apzs/image/-/raw/master/image/iCQelBrLsV00033RvPdivVLKVYuW4xa3Nh3inLDBBgdZJBgED50Lo3jmU0SVp_pzOy8=w1000.png)
>
> 7. 点击**下一步**，提供您的业务信息。
>
> 8. 点击**创建**。
>
> 如果系统提示您接受 Google Analytics（分析）的《服务条款》和《数据处理修正条款》，请予以接受，然后点击**完成**。
>
> ![img](https://gitlab.com/apzs/image/-/raw/master/image/D8rCvlvNFrry5xETezTxClQbcFf8uh4mScLd.png)

#### [创建媒体资源](https://analytics.google.com/)

首先需要创建账户，然后点击设置里面的`创建媒体资源`，一定要点击`显示高级选项`，勾选`仅创建Universal Analytics 媒体资源`

![image-20221107210545182](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107210545182.png)



![image-20221107210613543](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107210613543.png)

#### [谷歌分析插件](https://vuepress.vuejs.org/zh/plugin/official/plugin-google-analytics.html)

##### 安装

```bash
yarn add -D @vuepress/plugin-google-analytics
## OR npm install -D @vuepress/plugin-google-analytics
```

注意

如果你的项目正在使用 Google analytics 插件，推荐使用 [Yarn (opens new window)](https://yarnpkg.com/en/)而不是 npm 来安装所有依赖。因为在这种情形下，npm 会生成错误的依赖树。

##### [使用](https://vuepress.vuejs.org/zh/plugin/official/plugin-google-analytics.html#使用)

```javascript
module.exports = {
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]
  ]
}
```

![image-20221107212238446](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107212238446.png)

再次访问网站，已经检测访问了

![image-20221107212148649](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107212148649.png)

### 配置拆分

#### [拆分前](other/配置拆分.md)

![image-20221107214217280](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107214217280.png)

#### [拆分后](other/配置拆分.md)

在`docs\.vuepress`文件夹里新建`config`文件夹，将所有配置都拆分到`docs\.vuepress\config`文件夹里

![image-20221107215412138](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107215412138.png)

### 隐私保护

你可能不想在提交代码时把自己的隐私信息提交到`github`上，因此可以在`docs\.vuepress\config`文件夹里新建`secret.js`文件，在这里输入你的隐私信息

```js
module.exports = {
    clientId: '7eaef31b5ffafc40f5f1',
    clientSecret: 'a823e3c29a6b6c0328fa7dfeb747f844ae05b454',
    'ga': 'UA-248708010-2'
}
```

![image-20221107220624827](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107220624827.png)

然后在`docs\.vuepress\config\pluginsConfig.js`里引入刚刚创建的`secret.js`，替换掉隐私信息

![image-20221107220810075](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107220810075.png)

在`.gitignore`里隐藏`secret.js`文件，此时`secret.js`文件就置灰了，表示提交到远程仓库时，不会提交该文件

![image-20221107221123123](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107221123123.png)

### Mackdown语法进阶

假如我们需要使用[CountUp](https://github.com/inorganik/CountUp.js)来实现数字滚动的效果，首先需要安装`COuntUp`

```bash
yarn add countup.js  # npm i countup.js
```

[在 Markdown 中使用 Vue | VuePress (vuejs.org)](https://vuepress.vuejs.org/zh/guide/using-vue.html#浏览器的-api-访问限制)

新建`docs\.vuepress\components\CountUp.vue`文件，并添加[内容](other\数字滚动插件.md)

![image-20221107230101910](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107230101910.png)

然后新建`docs\countup.md`文件

```
---
title: 使用数字滚动插件，并高亮展示源码
---

<CountUp :endVal="2020"/>
<<< @/docs/.vuepress/components/CountUp.vue
```

![image-20221107230348743](https://gitlab.com/apzs/image/-/raw/master/image/image-20221107230348743.png)

最终效果如下所示：

![GIF 2022-11-7 23-06-08](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-11-7 23-06-08.gif)

### [自动化部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages-and-travis-ci)

#### GitHub Pages and Travis CI

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME or GROUP>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME or GROUP>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在项目的根目录创建一个名为 `.travis.yml` 的文件；

3. 在本地执行 `yarn` 或 `npm install` 并且提交生成的 lock 文件（即 `yarn.lock` 或 `package-lock.json`）；

4. 使用 GitHub Pages 部署提供程序模板并遵循 [Travis 文档 (opens new window)](https://docs.travis-ci.com/user/deployment/pages/)。

```yaml
language: node_js
node_js:
  - lts/*
install:
  - yarn install # npm ci
script:
  - yarn docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

在项目根路径创建`.travis.yml`文件

![image-20221108162650606](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108162650606.png)

如果使用的是自己的域名需要在根路径下添加`cname.sh`文件

```bash
## cname.sh

#!/usr/bin/env sh

set -e

echo 'apzs.github.io' > docs/.vuepress/dist/CNAME
```

![image-20221108162716960](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108162716960.png)





依次点击 [Settings](https://github.com/settings/profile)  ->  [Developer settings](https://github.com/settings/tokens)  ->  `Personal access tokens`里的`Tokens (classic)`  ->  `Generate new token`里的          `Generate new token (classic)`

只需要勾选第一项`repo`就可以了

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20221108164849891.png" alt="image-20221108164849891" style="zoom:25%;" />

然后复制刚刚生成的`access tocken`

![image-20221108165106277](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108165106277.png)



<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20221108163027690.png" alt="image-20221108163027690" style="zoom: 50%;" />



name输入`GITHUB_TOKEN`，` VALUE`输入刚刚复制的`access tocken`

![image-20221108165241191](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108165241191.png)

没有推送`secret.js`隐私文件，构建肯定会失败，所以在`.gitignore`里取消对`secret.js`的忽略

![image-20221108170843086](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108170843086.png)

### 图片缩放

#### [静态资源](https://vuepress.vuejs.org/zh/guide/assets.html#静态资源)

##### [相对路径](https://vuepress.vuejs.org/zh/guide/assets.html#相对路径)

所有的 Markdown 文件都会被 webpack 编译成 Vue 组件，因此你可以，并且**应该更倾向于**使用相对路径（Relative URLs）来引用所有的静态资源：

```md
![An image](./image.png)
```

同样地，这在 `*.vue` 文件的模板中一样可以工作，图片将会被 `url-loader` 和 `file-loader` 处理，在运行生成静态文件的构建任务时，文件会被复制到正确的位置。

除此之外，你也使用 `~` 前缀来明确地指出这是一个 webpack 的模块请求，这将允许你通过 webpack 别名来引用文件或者 npm 的依赖：

```md
![Image from alias](~@alias/image.png)
![Image from dependency](~some-dependency/image.png)
```

Webpack 的别名可以通过 `.vuepress/config.js` 中 [configureWebpack](https://vuepress.vuejs.org/zh/config/#configurewebpack) 来配置，如：

```js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}
```

##### [公共文件](https://vuepress.vuejs.org/zh/guide/assets.html#公共文件)

有时，你可能需要提供一个静态资源，但是它们并不直接被你的任何一个 markdown 文件或者主题组件引用 —— 举例来说，favicons 和 PWA 的图标，在这种情形下，你可以将它们放在 `.vuepress/public` 中， 它们最终会被复制到生成的静态文件夹中。

##### [基础路径](https://vuepress.vuejs.org/zh/guide/assets.html#基础路径)

如果你的网站会被部署到一个**非根路径**，你将需要在 `.vuepress/config.js` 中设置 `base`，举例来说，如果你打算将你的网站部署到 `https://foo.github.io/bar/`，那么 `base` 的值就应该被设置为 `"/bar/"` (应当总是以斜杠开始，并以斜杠结束)。

有了基础路径（Base URL），如果你希望引用一张放在 `.vuepress/public` 中的图片，你需要使用这样路径：`/bar/image.png`，然而，一旦某一天你决定去修改 `base`，这样的路径引用将会显得异常脆弱。为了解决这个问题，VuePress 提供了内置的一个 helper `$withBase`（它被注入到了 Vue 的原型上），可以帮助你生成正确的路径：

```vue
<img :src="$withBase('/foo.png')" alt="foo">
```

值得一提的是，你不仅可以在你的 Vue 组件中使用上述的语法，在 Markdown 文件中亦是如此。

最后补充一句，一个 `base` 路径一旦被设置，它将会自动地作为前缀插入到 `.vuepress/config.js` 中所有以 `/` 开始的资源路径中。

------



```
<img :src="$withBase('/icons/apple-touch-icon-76x76.png')" alt="foo">


![An image](./.vuepress/public/icons/apple-touch-icon-76x76.png)
```

![image-20221108194219853](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108194219853.png)

#### [图片缩放插件](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html)

#####  安装

```bash
yarn add -D @vuepress/plugin-medium-zoom
## OR npm install -D @vuepress/plugin-medium-zoom
```

##### [使用](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html#使用)

**简单使用**:

```javascript
module.exports = {
  plugins: ['@vuepress/medium-zoom']
}
```

**自定义选项**:

```javascript
module.exports = {
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }
  }
}
```

##### [选项](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html#选项)

###### [selector](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html#selector)

- 类型: `string`
- 默认值: `.theme-default-content :not(a) > img`

值得注意的是， `.theme-default-content` 是默认主题添加给 [``](https://vuepress.vuejs.org/zh/guide/using-vue.html#content) 组件的 class name。

###### [options](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html#options)

- 类型: `object`
- 默认值: `undefined`

------

没有使用之前是使用`<img>`来展示的

![image-20221108194944660](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108194944660.png)

由于图片使用的是`<img>`标签，所以`selector`的值可以填`img`  （如果想要指定图片缩放只需在`<img>`标签上添加`class`，然后通过合适的选择器选择这些图片即可）

![image-20221108195133449](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108195133449.png)

最终效果：

![GIF 2022-11-8 19-54-27](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-11-8 19-54-27.gif)

#### [algolia搜索](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#algolia-搜索)

注册完账号后先点击`Search`，在`CONFIGURE`的`Index`里点击`Create Index`，创建一个`Index`

![image-20221108201620417](https://gitlab.com/apzs/image/-/raw/master/image/image-20221108201620417.png)

新建一个`API Key`，创建步骤请参见 https://docsearch.algolia.com/docs/legacy/run-your-own/ ，如果不能访问可以查看[离线文档](other\algolia.md)

![GIF 2022-11-8 20-30-58](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-11-8 20-30-58.gif)



### [上 / 下一篇链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#上-下一篇链接)

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。

你可以通过 `themeConfig.nextLinks` 和 `themeConfig.prevLinks` 来全局禁用它们：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false
  }
}
```

你也可以使用 `YAML front matter` 来明确地重写或者禁用它们：

```yaml
---
prev: ./some-other-page
next: false
---
```

### [Git 仓库和编辑链接](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#git-仓库和编辑链接)

当你提供了 `themeConfig.repo` 选项，将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 `"Edit this page"` 链接。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！'
  }
}
```

你可以通过 `YAML front matter` 来禁用指定页面的编辑链接：

```yaml
---
editLink: false
---
```

### [页面滚动 1.2.0+](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#页面滚动)

你可以通过 `themeConfig.smoothScroll` 选项来启用页面滚动效果。

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    smoothScroll: true
  }
}
```

### [自定义页面类](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#自定义页面类)

有时候你可能需要为特定页面添加一个 CSS 类名，以方便针对该页面添加一些专门的 CSS。这种情况下你可以在该页面的 YAML front matter 中声明一个 `pageClass`：

```yaml
---
pageClass: custom-page-class
---
```

只能在 `.vuepress/styles/index.styl` 中编写针对该页面的 CSS ：

```css
/* .vuepress/styles/index.styl */

.theme-container.custom-page-class {
  /* 特定页面的 CSS */
}
```

注意

自定义样式应该写在 [index.styl](https://vuepress.vuejs.org/config/#index-styl) 内, 该文件可以让你方便地添加或覆盖样式.

### [特定页面的自定义布局](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#特定页面的自定义布局)

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="page">` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面（而只保留导航栏），你可以再次使用 `YAML front matter` 来指定这个组件。

```yaml
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout.vue` 布局。
