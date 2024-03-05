

```
D:\>yarn create vuepress-theme-hope apzs
➤ YN0000: ┌ Resolution step
➤ YN0000: └ Completed in 9s 475ms
➤ YN0000: ┌ Fetch step
➤ YN0013: │ type-fest@npm:0.21.3 can't be found in the cache and will be fetched from the remote registry
➤ YN0013: │ util-deprecate@npm:1.0.2 can't be found in the cache and will be fetched from the remote registry
➤ YN0013: │ wcwidth@npm:1.0.1 can't be found in the cache and will be fetched from the remote registry
➤ YN0013: │ which@npm:2.0.2 can't be found in the cache and will be fetched from the remote registry
➤ YN0013: │ wrap-ansi@npm:6.2.0 can't be found in the cache and will be fetched from the remote registry
➤ YN0000: └ Completed in 4s 491ms
➤ YN0000: ┌ Link step
➤ YN0000: └ Completed
➤ YN0000: Done in 14s 148ms

(node:484) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
C:\Users\无名氏\AppData\Local\Yarn\Berry\cache\create-vuepress-theme-hope-npm-2.0.0-rc.5-b0a59a2577-7.zip\node_modules\create-vuepress-theme-hope\lib\index.js:2
import{existsSync as f,readFileSync as S,writeFileSync as v,readdirSync as w,mkdirSync as A,statSync as j,createReadStream as C,createWriteStream as I}from"node:fs";import{resolve as o,join as x,dirname as D}from"node:path";import{cac as O}from"cac";import{execaCommandSync as c,execaCommand as R}from"execa";import m from"inquirer";import{createRequire as F}from"node:module";import{fileURLToPath as W}from"node:url";const H={简体中文:{flow:{getVersion:"获取依赖的最新版本...",createPackage:"生成 package.json...",updatePackage:"更新 package.json...",generateTemplate:"生成模板...",install:"安装依赖...",devServer:`启动开发服务器...
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:73:18)
    at wrapSafe (node:internal/modules/cjs/loader:1178:20)
    at Module._compile (node:internal/modules/cjs/loader:1220:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at external_module_.Module._load (C:\Users\无名氏\AppData\Local\Temp\xfs-3622f8b7\dlx-9620\.pnp.js:5755:14)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:86:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.18.0
```



```
PS C:\Users\无名氏> npm init vuepress-theme-hope apzs
? Select a language to display / 选择显示语言 简体中文
? 选择包管理器 npm
生成 package.json...
? 设置应用名称 apzs
? 设置应用版本号 2.0.0
? 设置应用描述 apzs的个人博客
? 设置协议 MIT
? 项目需要用到多语言么? No
? 是否需要一个自动部署文档到 GitHub Pages 的工作流？ Yes
? 你想要创建什么类型的项目？ blog
生成模板...
? 是否初始化 Git 仓库? Yes
? 选择你想使用的源 国内镜像源
安装依赖...
这可能需要数分钟，请耐心等待.
我们无法正确输出子进程的进度条，所以进程可能会看似未响应

added 628 packages in 34s
模板已成功生成!
? 是否想要现在启动 Demo 查看? Yes
启动开发服务器...
启动成功后，请在浏览器输入给出的开发服务器地址(默认为 'localhost:8080')

> apzs@2.0.0 docs:dev
> vuepress dev src


  vite v5.0.10 dev server running at:

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.56.1:8080/
  ➜  Network: http://169.254.48.74:8080/
  ➜  Network: http://192.168.181.182:8080/
```

