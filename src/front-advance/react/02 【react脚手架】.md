# 六、初始化脚手架

## 1.什么是 React 脚手架？

在我们的现实生活中，脚手架最常用的使用场景是在工地，它是为了保证施工顺利的、方便的进行而搭建的，在工地上搭建的脚手架可以帮助工人们高校的去完成工作，同时在大楼建设完成后，拆除脚手架并不会有任何的影响。

在我们的 React 项目中，脚手架的作用与之有异曲同工之妙

React 脚手架其实是一个工具帮我们快速的生成项目的工程化结构，每个项目的结构其实大致都是相同的，所以 React 给我提前的搭建好了，这也是脚手架强大之处之一，也是用 React 创建 SPA 应用的最佳方式

## 2.为什么要用脚手架？

在前面的介绍中，我们也有了一定的认知，脚手架可以帮助我们快速的搭建一个项目结构

在我之前学习 `webpack` 的过程中，每次都需要配置 `webpack.config.js` 文件，用于配置我们项目的相关 `loader` 、`plugin`，这些操作比较复杂，但是它的重复性很高，而且在项目打包时又很有必要，那 React 脚手架就帮助我们做了这些，它不需要我们人为的去编写 `webpack` 配置文件，它将这些配置文件全部都已经提前的配置好了。

## 3.怎么用 React 脚手架？

这也是这篇文章的重点，如何去安装 React 脚手架，并且理解它其中的相关文件作用

首先介绍如何安装脚手架

### 3.1 安装 React 脚手架

首先确保安装了 `yarn` 和`Node`然后打开 cmd 命令行工具，全局安装 `create-react-app`

> 使用`npm`也可以，但建议使用`yarn`，因为`yarn`和`react`是一家公司的，兼容性肯定更好些

```bash
yarn add create-react-app -g
# npm install create-react-app -g
```

**快速搭建项目**

然后可以新建一个文件夹用于存放项目，在当前的文件夹下执行

```bash
create-react-app react_staging
```

搭建成功后会有如下提示：

```bash
Success! Created react_staging at D:\project\react_staging
Inside that directory, you can run several commands:

  npm start # 用于启动项目
    Starts the development server.

  npm run build # 用于将项目打包
    Bundles the app into static files for production.

  npm test # 测试（一般不用）
    Starts the test runner.

  npm run eject # 默认将webpack.config.js等文件隐藏，使用该命令可以显示这些文件
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react_staging
  npm start

Happy hacking!
```

**启动项目**

再在生成好的 `react_staging` 文件夹中执行如下命令

```bash
yarn start
# npm start
```

接下来我们看看这些文件都有什么作用

### 3.2 使用vite创建react项目

vite官网：https://vitejs.cn

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。

执行`yarn create vite`命令，选择`react`即可

```bash
D:\project>yarn create vite
yarn create v1.22.19
warning package.json: No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Installed "create-vite@4.4.1" with binaries:
      - create-vite
      - cva
√ Project name: ... react_staging
√ Select a framework: » React
√ Select a variant: » JavaScript + SWC

Scaffolding project in D:\project\react_staging...

Done. Now run:

  cd react_staging
  yarn
  yarn dev

Done in 69.18s.
```

### 3.3 脚手架项目结构

```css
react_staging
├─ public                   // 公共资源
│  ├─ favicon.ico           // 浏览器顶部的icon图标
│  ├─ index.html            // 应用的 index.html入口
│  ├─ logo192.png           // 在 manifest 中使用的logo图
│  ├─ logo512.png           // 同上
│  ├─ manifest.json         // 应用加壳的配置文件
│  └─ robots.txt            // 爬虫协议文件
├─ src                      // 源码文件夹
│  ├─ App.css               // App组件的样式
│  ├─ App.js                // App组件
│  ├─ App.test.js           // 用于给APP做测试
│  ├─ index.css             // 样式
│  ├─ index.js              // 入口文件
│  ├─ logo.svg              // logo图
│  ├─ reportWebVitals.js    // 页面性能分析文件
│  └─ setupTests.js         // 组件单元测试文件
├─ .gitignore               // 自动创建本地仓库
├─ package.json             // 相关配置文件
├─ README.md                // 项目说明文档
└─ yarn.lock
```

再介绍一下public目录下的 `index.html` 文件中的代码意思

````html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
````

以上是删除代码注释后的全部代码

**第5行**

指定浏览器图标的路径，这里直接采用 `%PUBLIC_URL%` 原因是 `webpack` 配置好了，它代表的意思就是 `public` 文件夹

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

**第6行**

用于做移动端网页适配

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**第七行**

用于配置安卓手机浏览器顶部标签颜色（比如你的网站主题为红色，则可以让标签和视图区域都为红色），兼容性不大好

```html
<meta name="theme-color" content="#000000" />
```

**8到11行**

用于描述网站信息

```html
<meta
	name="description"
    content="Web site created using create-react-app"
/>
```

**第12行**

苹果手机触摸版应用图标（将网页添加到桌面时显示的图标，只适用于苹果的设备）

```html
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
```

**第13行**

应用加壳时（套壳成app）的配置文件

```html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

**这里面其实最主要的就是App.js以及index.js，一个是组件，一个是将组件渲染到页面中的。**

## 4.第一个脚手架应用

1. 我们保持public中的Index.html不变

2. 修改src下面的APP.js以及index.js文件

`src/App.js`

```jsx
//创建外壳组件APP
import React from 'react'

class App extends React.Component{
    render(){
        return (
            <h1>Hello</h1>
        )
    }
}

export default App
```

`src/index.js`: 【主要的作用其实就是将App这个组件渲染到页面上】

````js
//引入核心库
import React from 'react'
import ReactDOM from 'react-dom'
//引入组件
import App from './App'

ReactDOM.render(<App />,document.getElementById("root"))
````

这样在重新启动应用，就成功了。

![image-20230812150359213](https://gitlab.com/apzs/image/-/raw/master/image/image-20230812150359213.png)

我们也不建议这样直接将内容放入App组件中，尽量还是用内部组件。

我们在顶一个Hello组件：

> 能使用`import React,{Componet} from 'react'`的原因是react同时使用了默认暴露和分别暴露，详情请看本章节最后的例子

`src/component/Hello/index.jsx`

````jsx
import React,{Component} from 'react'
import './index.css'

export default class Hello extends Component{
    render() {
        return (
            <h1 className='title'>Hello</h1>
        )
    }
}
````

`src/component/Hello/index.css`

```css
.title {
    background-color: orange;
}
```

在App组件中，进行使用

`src/App.jsx`

```jsx
import React,{Component} from 'react'
import Hello from './component/Hello'

export default class App extends Component{
    render(){
        return (
            <div>
                <Hello />
            </div>
        )
    }
}
```

这样的结果和前面是一样的。推荐使用这种目录结构去使用组件

![image-20230720134753551](https://gitlab.com/apzs/image/-/raw/master/image/image-20230720134753551.png)

> 将组件修改为`jsx`后缀，这样会有更加丰富的提示

![image-20221025142952888](https://gitlab.com/apzs/image/-/raw/master/image/6d23ae1393d60c7598fa0f9172061b98051a8f8e.png)

默认暴露和分别暴露：

> 如果使用默认暴露我们只能使用`import React from "./module.js"; const {Component} = React`这样的形式
>
> `src/module.js`
>
> ```js
> const React = {a:1,b:2}
> 
> React.Component = class Component {
> 
> }
> 
> export default React
> ```
>
> `src/index.js`
>
> ```js
> import React from "./module.js";
> 
> const {Component} = React
> 
> console.log("React",React);
> console.log("Component",Component);
> ```
>
> ![image-20230720132430005](https://gitlab.com/apzs/image/-/raw/master/image/image-20230720132430005.png)
>
> 我们可以即使用默认暴露也使用分别暴露，这样我们就可以使用`import React from "./module.js";`获取默认暴露的值，使用`import {Component} from "./module.js";`获取分别暴露的值。
>
> `src/module.js`
>
> ```js
> const React = {a:1,b:2}
> 
> export class Component {
> 
> }
> 
> React.Component = Component
> 
> export default React
> ```
>
> `src/index.js`
>
> ```js
> import React,{Component} from "./module.js";
> 
> console.log("React",React);
> console.log("Component",Component);
> ```
>
> ![image-20230720132609021](https://gitlab.com/apzs/image/-/raw/master/image/image-20230720132609021.png)

## 5.组件

### 5.1 组件基本概念

在React中网页被拆分为了一个一个组件，组件是独立可复用的代码片段。具体来说，组件可能是页面中的一个按钮，一个对话框，一个弹出层等。React中定义组件的方式有两种：基于函数的组件和基于类的组件。本节我们先看看基于函数的组件。

基于函数的组件其实就是一个会返回JSX（React元素）的普通的JS函数，你可以这样定义：

```jsx
import ReactDOM from "react-dom/client";

// 这就是一个组件
function App(){
    return <h1>我是一个React的组件！</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
```

函数式组件主要有两个注意点：

1. 函数名首字母大写
2. 返回值是一个JSX（React元素）

为了使得项目结构更加的清晰，更易于维护，每个组件通常会存储到一个单独的文件中，比如上例中的App组件，可以存储到App.js中，并通过export导出。

`src/App.js`

```jsx
function App(){
    return <h1>我是一个React的组件！</h1>
}

export default App;
```

或者使用箭头函数

```jsx
const App = () => {
    return <h1>我是一个React的组件！</h1>;
};

export default App;
```

在其他文件中使用时，需要先通过import进行引入：

`src/index.js`

```jsx
//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom/client'
//引入App组件
import App from './App'

//渲染App到页面
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />);
```

引入后通过`<组件名/>`或`<组件名></组件名>`即可引入组件。

### 5.2 组件化编码流程

1.拆分组件:拆分界面，抽取组件

2.实现静态组件

3.实现动态组件

- 动态的显示初始化数据
  - 数据类型
  - 数据名称
  - 保存在哪个组件
- 交互

**注意事项：**

1.拆分组件、实现静态组件。注意className、style的写法

2.动态初始化列表，如何确定将数据放在哪个组件的state中？

- 某个组件使用：放在自身的state中
- 某些组件使用：放在他们共同的父组件中【状态提升】

3.关于父子组件之间的通信

- 父组件给子组件传递数据：通过props传递
- 子组件给父组件传递数据：通过props传递，要求父组件提前给子组件传递一个函数

4.注意defaultChecked 和checked区别，defalutChecked只是在初始化的时候执行一次，checked没有这个限制，但是必须添加onChange方法类似的还有：defaultValue 和value

5.状态在哪里，操作状态的方法就在哪里

## 6.CSS样式

### 6.1 内联样式

在React中可以直接通过标签的style属性来为元素设置样式。style属性需要的是一个对象作为值，来为元素设置样式。

```jsx
<div style={{color:'red'}}>
    我是Div
</div>
```

传递样式时，需要注意如果样式名不符合驼峰命名法，需要将其修改为符合驼峰命名法的名字。比如：`background-color`改为`backgroundColor`。

如果内联样式编写过多，会导致JSX变得异常混乱，此时也可以将样式对象定义到JSX外，然后通过变量引入。

样式过多，JSX会比较混乱：

```jsx
const StyleDemo = () => {
    return (
        <div style={{color:'red', backgroundColor:'#bfa', fontSize:20, borderRadius:12}}>
            我是Div
        </div>
    );
};

export default StyleDemo;
```

可以这样修改：

```jsx
import React from 'react';

const StyleDemo = () => {
    const divStyle = {color: 'red', backgroundColor: '#bfa', fontSize: 20, borderRadius: 12}

    return (
        <div style={divStyle}>
            我是Div
        </div>
    );
};

export default StyleDemo;
```

相比第一段代码来说，第二段代码中JSX结构更加简洁。

### 6.2 在内联样式中使用State

设置样式时，可以根据不同的state值应用不同的样式，比如我们可以在组件中添加一个按钮，并希望通过点击按钮可以切换div的边框，代码可以这样写：

```jsx
import React, {useState} from 'react';

const StyleDemo = () => {
    // useState在hooks里会讲。useState(false)里的false表示初始值为false，showBorder可以获取到其值，调用setShowBorder方法并传递参数可以修改值，传过来的参数是一个函数，这个函数的返回值将作为新的值。
    const [showBorder, setShowBorder] = useState(false);

    const divStyle = {
        color: 'red',
        backgroundColor: '#bfa',
        fontSize: 20,
        borderRadius: 12,
        border: showBorder?'2px red solid':'none'
    };

    const toggleBorderHandler = ()=> {
      setShowBorder(prevState => !prevState);
    };

    return (
        <div style={divStyle}>
            我是Div
            <button onClick={toggleBorderHandler}>切换边框</button>
        </div>
    );
};

export default StyleDemo;
```

上例中添加一个新的state，命名为showBorder，代码是这样的`const [showBorder, setShowBorder] = useState(false);`当该值为true时，我们希望div可以显示一条2像素的红色边框，当为false时，我们希望div没有边框。默认值为false。

divStyle的最后一个属性是这样设置的`border: showBorder?'2px red solid':'none'`，这里我们根据showBorder的值来设置border样式的值，如果值为true，则设置边框，否则边框设置为none。

`toggleBorderHandler` 是负责修改showBorder的响应函数，当我们点击按钮后函数会对showBorder进行取反，这样我们的样式就可以根据state的不同值而呈现出不同的效果了。

### 6.3 外部样式表

那么如何为React组件引入样式呢？很简单直接在组件中import即可。例如：我们打算为Button组件编写一组样式，并将其存储到Button.css中。我们只需要直接在Button.js中引入Button.css就能轻易完成样式的设置。

Button.css：

```css
button{
    background-color: #bfa;
}
```

Button.js：

```jsx
import './Button.css';
const Button = () => {
    return <button>我是一个按钮</button>;
};
export default Button;
```

使用这种方式引入的样式，需要注意以下几点：

1. CSS就是标准的CSS语法，各种选择器、样式、媒体查询之类正常写即可。
2. 尽量将js文件和css文件的文件名设置为相同的文件名。
3. 引入样式时直接import，无需指定名字，且引入样式必须以./或../开头。
4. 这种形式引入的样式是全局样式，有可能会被其他样式覆盖。

### 6.4 css模块化

> css模块化的作用是防止命名冲突，使用后这个组件引入的css不会影响到其他组件，只能在本组件生效

当组件逐渐增多起来的时候，我们发现，组件的样式也是越来越丰富，这样就很有可能产生两个组件中样式名称有可能会冲突，这样会根据引入App这个组件的先后顺序，后面的会覆盖前面的，

为了解决这个问题React中还为我们提供了一中方式，CSS Module。

我们可以将CSS Module理解为外部样式表的一种进化版，它的大部分使用方式都和外部样式表类似，不同点在于使用CSS Module后，网页中元素的类名会自动计算生成并确保唯一，所以使用CSS Module后，我们再也不用担心类名重复了。

**使用方式**

CSS Module在React中已经默认支持了（前提是使用了react-scripts），所以无需再引入其他多余的模块。使用CSS Module时需要遵循如下几个步骤：

1.将css文件名修改： `index.css` --- >` index.module.css` 

`src/components/Hello/index.module.css`

```css
.title{
	background-color: orange;
}
```

2.引入并使用的时候改变方式：

`src/components/Hello/index.jsx`

```jsx
import React,{Component} from 'react'
import hello from './index.module.css'  //引入的时候给一个名称

export default class Hello extends Component{
    render() {
        return (
            <h1 className={hello.title}>Hello</h1>   //通过大括号进行调用
        )
    }
}
```

这就是一个简单的CSS Module的案例，设置完成后你可以自己通过开发者工具查看元素的class属性，你会发现class属性和你设置的并不完全一样，这是因为CSS Module通过算法确保了每一个模块中类名的唯一性。

总之，相较于标准的外部样式表来说，CSS Module就是多了一点——确保类名的唯一，通过内部算法避免了两个组件中出现重复的类名，如果你能保证不会出现重复的类名，其实直接使用外部样式表也是一样的。

**例子**

如果不使用css模块化，则两个模块都是用了相同的`className`，则后面的组件的样式会覆盖前面的

![image-20230812154758930](https://gitlab.com/apzs/image/-/raw/master/image/image-20230812154758930.png)

使用css模块化后，即使`className`都为`title`，样式依然不会被覆盖，react帮我们修改了class的名称

![image-20230812154520343](https://gitlab.com/apzs/image/-/raw/master/image/image-20230812154520343.png)

以下是详细的代码：

**Hello组件**

`src/components/Hello/index.jsx`

```jsx
import React,{Component} from 'react'
// import './index.css'
import hello from './index.module.css'

export default class Hello extends Component{
	render(){
        // return <h2 className='title'>Hello,React!</h2>
		return <h2 className={hello.title}>Hello,React!</h2>
	}
}
```

`src/components/Hello/index.module.css`

```css
.title{
	background-color: orange;
}
```

**Welcome组件**

`src/components/Welcome/index.jsx`

```jsx
import React,{Component} from 'react'
// import  './index.css'
import welcome from './index.module.css'

export default class Welcome extends Component{
	render(){
        // return <h2  className="title">Welcome</h2>
		return <h2  className={welcome.title}>Welcome</h2>
	}
}
```

`src/components/Welcome/index.module.css`

```css
.title{
	background-color: skyblue;
}
```

**App组件**

`src/App.jsx`

```jsx
//创建“外壳”组件App
import React,{Component} from 'react'
import Hello from './components/Hello'
import Welcome from './components/Welcome'

//创建并暴露App组件
export default class App extends Component{
	render(){
		return (
			<div>
				<Hello/>
				<Welcome/>
			</div>
		)
	}
}
```

**js入口文件**

`src/index.js`

```jsx
//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom/client'
//引入App组件
import App from './App'

//渲染App到页面
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 7.配置代理

React本身只关注与页面，并不包含发送ajax请求的代码，所以一般都是集成第三方的一些库，或者自己进行封装，推荐使用axios，可以使用如下命令安装axios。

```bash
yarn add axios
# npm install axios
```

在使用的过程中很有可能会出现跨域的问题，这样就应该配置代理。

所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号（port）， 当一个请求url的**协议、域名、端口**三者之间任意一个与当前页面url不同即为跨域 。

那么react通过代理解决跨域问题呢

> 由于服务器之间访问不会有跨域（前端有跨域是因为浏览器同源策略的限制，而服务器之间没有这些限制），因此我们可以开启一个中间服务器，端口号和项目端口号一样，这样当我们想访问后端的接口时，可以访问中间服务器，由于中间服务器和前端项目在同一个域名和端口，因此不会跨域，能够正常访问。中间服务器收到我们发送的请求后，会将请求发送给后端服务器，由于服务器之间不会跨域，因此能够正常访问，中间服务器访问成功后，会将访问成功的结果再转给我们。

### 7.1 方法一

> 在package.json中追加如下配置，格式为`"proxy":"请求的地址"`

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

### 7.2 方法二

**方法二**

1. 第一步：创建代理配置文件

   **创建`src/setupProxy.js`文件**

2. 编写setupProxy.js配置具体代理规则：

```js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
      target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
      changeOrigin: true, //控制服务器接收到的请求头中host字段的值
      /*
      	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
      */
      // 比如我们请求的是 http://localhost:3000/api1/test 则实际上的请求是 http://localhost:5000/test
      pathRewrite: {'^/api1': ''} //去除请求前缀(我们想要通过前缀区别不同的服务器，而服务器可能没有前缀，我们可以通过这个配置将我们配置的前缀去掉)
    }),
    proxy('/api2', { 
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {'^/api2': ''}
    })
  )
}
```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

### 7.3 vite配置proxy

`vite.config.ts`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 是否自动打开浏览器
    open: true,
    // 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})

```

![image-20230729110707255](https://gitlab.com/apzs/image/-/raw/master/image/image-20230729110707255.png)

### 7.4 连续赋值解构 & 重命名

>```js
>let obj = {a:{b:1}}
>const {a} = obj; //传统解构赋值(解构出a)
>const {a:{b}} = obj; //连续解构赋值（解构出a里面的b）
>const {a:{b:c}} = obj; //连续解构赋值+重命名（解构出a里面的b，并将b重命名为c）
>```

# 七、组件通讯

## 2. PubSubJS

1.先订阅，再发布（理解：有一种隔空对话的感觉）

2.适用于任意组件间通信

3.要在组件的componentWillUnmount中取消订阅

```js
//下载: npm install pubsub-js --save
//使用举例
1)	import PubSub from 'pubsub-js' //引入
2)	PubSub.subscribe('delete', function(data){ }); //订阅
3)	PubSub.publish('delete', data) //发布消息
//*------------------------------使用----------------------------------------------------
	componentDidMount(){
		this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
			this.setState(stateObj)
		})
	}

	componentWillUnmount(){
		PubSub.unsubscribe(this.token)
	}
//----------------------------------使用---------------------------------------------------
		//发送请求前通知List更新状态
		PubSub.publish('atguigu',{isFirst:false,isLoading:true})
		//发送网络请求---使用fetch发送（优化）
		try {
			const response= await fetch(`/api1/search/users2?q=${keyWord}`)
			const data = await response.json()
			console.log(data);
			PubSub.publish('atguigu',{isLoading:false,users:data.items})
		} catch (error) {
			console.log('请求出错',error);
			PubSub.publish('atguigu',{isLoading:false,err:error.message})
		}
	}
```

## 3. mitt

此方法用的是[`mitt`]实现,其实本质上就是注册一个全局变量进行监听 --> [mitt源码地址](https://github.com/developit/mitt)

可以自己实现,此处因为人家写的不错了,就以此作为例子

1. 安装或者直接复制使用

```sh
npm install --save mitt
```

2. 使用示例

```tsx
-------------- 首先要定义一个公用全局变量  --------------------------
//文件 utils/index.ts
import mitt from './mitt';
//此处声明,将其变为全局变量
const eventBus = mitt();
export { eventBus }
---------------- 发送值的组件(要修改别人的组件)  ---------------------
//导入共有变量
import { eventBus } from '~/utils';
  <a
  onClick={() => {
	//延迟发送是本人此之前有一个跳转动作,跳转到接收方组件
    // 防止修改了值的时候但是接收组件未注册  正常情况直接发送即可     
    //setTimeout(() => {
    // eventBus.emit('foo', data);
    //}, 100);
    eventBus.emit('foo', data);    
   }}
  />;

------------------ 接受方组件(接受发送方的组件)  -------------------------------------

const Search: FC<IProps> = (props) => {
  useEffect(() => {
    //替换为mitt写法,此时已经接收到了
    eventBus.on('foo', (searchParams) => {console.log('接受到值了',searchParams) }
    });
  }, []);
} 
```

