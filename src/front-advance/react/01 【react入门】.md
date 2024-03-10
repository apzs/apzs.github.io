## 一、React基础知识与概念

### 1.React简介

#### 1.1 react是什么？

**React** 是一个用于构建用户界面的 JavaScript 库。

- 是一个将数据渲染为 HTML 视图的开源 JS 库
- 它遵循基于组件的方法，有助于构建可重用的 UI 组件
- 它用于开发复杂的交互式的 web 和移动 UI

#### 1.2 React 有什么特点？

1. 使用虚拟 DOM 而不是真正的 DOM
2. 它可以用服务器渲染
3. 它遵循单向数据流或数据绑定
4. 高效 (优秀的Diffing算法)
5. 声明式编码，组件化编码

#### 1.3 React高效的原因？

1. 使用虚拟(virtual)DOM,不总是直接操作页面真实DON
2. DOM Diffing算法,最小化页面重绘
3. `注意`：React并不会提高渲染速度,反而可能会增加渲染时间,真正高效的原因是它能有效`减少渲染次数`

#### 1.4 React 的一些主要优点？

1. 它提高了应用的性能
2. 可以方便在客户端和服务器端使用
3. 由于使用 JSX，代码的可读性更好
4. 使用React，编写 UI 测试用例变得非常容易

#### 1.5 为什么学？

1.原生JS操作DOM繁琐，效率低

2.使用JS直接操作DOM,浏览器会进行大量的重绘重排

3.原生JS没有组件化编码方案，代码复用低

### 2. React 基础案例

#### 2.1 引入react 包

- React 核心库、操作 DOM 的 react 扩展库、将 jsx 转为 js 的 babel 库

> 【先引入react.development.js，后引入react-dom.development.js】
>

`react.development.js`

- react 是react核心库，只要使用react就必须要引入
- 下载地址：https://unpkg.com/react@18.0.0/umd/react.development.js

`react-dom.development.js`

- react-dom 是react的dom包，使用react开发web应用时必须引入
- 下载地址：https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js

`babel.min.js `

- 由于JSX最终需要转换为JS代码执行，所以浏览器并不能正常识别JSX，所以当我们在浏览器中直接使用JSX时，还必须引入babel来完成对代码的编译。

- babel下载地址：https://unpkg.com/babel-standalone@6/babel.min.js

#### 2.2 创建虚拟DOM，渲染到容器中

##### 方式一：通过jsx

###### **最新写法（推荐）**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hello_react</title>
  </head>
  <body>
    <!-- 准备好一个“容器” -->
    <div id="test"></div>

    <!-- 引入react核心库 -->
    <script type="text/javascript" src="../js/react.development.js"></script>
    <!-- 引入react-dom，用于支持react操作DOM -->
    <script type="text/javascript" src="../js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="../js/babel.min.js"></script>

    <script type="text/babel">  /* 此处一定要写babel */
      	//1.创建虚拟DOM
      	const VDOM = <h1 id="title">Hello,Reactive</h1> /* 此处一定不要写引号，因为不是字符串 */
      	//2.渲染虚拟DOM到页面
	    const root = ReactDOM.createRoot(document.getElementById('test'));
      	root.render(VDOM);
    </script>
  </body>
</html>
```

> 后面很多地方没有用` ReactDOM.render(VDOM,Element)`这种方式是因为一开始学的课程是2020年的，现在新的创建方式是是使用`const root = ReactDOM.createRoot(Element); root.render(VDOM);`。
>
> 这里我就只把第一个案例改成新方式了

这样，就会在页面中的这个div容器上添加这个h1.

![image-20230804211505179](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804211505179.png)

控制台会报如下警告，可以不用管，到脚手架的时候会解决

![image-20230804220436891](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804220436891.png)

详细说明：

*   ReactDOM.createRoot()
    - `createRoot(container[, options])`
    - 用来创建React的根容器，容器用来放置React元素
*   ReactDOM.render()
    *   `root.render(element)`
    *   用来将React元素渲染到根元素中
    *   根元素中所有的内容都会被删除，被React元素所替换
    *   当重复调用render()时，React会将两次的渲染结果进行比较，确保只修改那些发生变化的元素，对DOM做最少的修改

###### **已过时（不推荐）**

```html
<body>
    <div id="test"></div>
    <script type="text/javascript" src="./js/react.development.js"></script>
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <script type="text/javascript" src="./js/babel.min.js"></script>
    <script type="text/babel">
        const VDOM = <h1 id="title">Hello,React</h1>
        ReactDOM.render(VDOM, document.getElementById("test"))
    </script>
</body>
```

##### 方式二：通过js

```html
<body>
  <div id="test"></div>
  <script type="text/javascript" src="./js/react.development.js"></script>
  <script type="text/javascript" src="./js/react-dom.development.js"></script>
  <script type="text/javascript">
      //1.创建虚拟DOM
      // React.createElement 的三个参数分别为：标签名、标签属性、标签体内容
      // 相当于 <h1 id="title">Hello,React</h1>
      const VDOM = React.createElement('h1', { id: 'title' }, 'Hello,Reactive')
      //2.渲染虚拟DOM到页面
      const root = ReactDOM.createRoot(document.getElementById('test'));
      root.render(VDOM);
  </script>
</body>
```

使用JS和JSX都可以创建虚拟DOM，但是可以看出JS创建虚拟DOM比较繁琐，尤其是标签如果很多的情况下，所以还是比较推荐使用JSX来创建。

```jsx
// <h1 id="title"><span>Hello,React</span></h1>
const VDOM=React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
```

### 3.jsx 语法

JSX 是 JavaScript 的语法扩展，JSX 使得我们可以以类似于 HTML 的形式去使用 JS。JSX便是React中声明式编程的体现方式。声明式编程，简单理解就是以结果为导向的编程。使用JSX将我们所期望的网页结构编写出来，然后React再根据JSX自动生成JS代码。所以我们所编写的JSX代码，最终都会转换为以调用`React.createElement()`创建元素的代码。

#### 语法规则

1. 定义虚拟DOM，JSX不是字符串，不要加引号
2. 标签中混入JS表达式的时候使用`{}`

```jsx
<h2 id={myId.toLowerCase()} ></h2>
```

3. 样式的类名指定不能使用class，使用`className`

```jsx
<h2 className="title"></h2>
```

3. 内敛样式要使用`{{}}`包裹

```jsx
<span style={{ color: '#f0f', fontSize: '29px' }}> </span>
```

5. 不能有多个根标签，只能有一个根标签

6. JSX的标签必须正确结束（自结束标签必须写/）

```jsx
 <h2></h2>
 <input type="text" />
```

5. JSX中html标签应该小写，React组件应该大写开头。如果小写字母开头，就将标签转化为 html 同名元素，如果 html 中无该标签对应的元素，就报错；如果是大写字母开头，react 就去渲染对应的组件，如果没有就报错

6. 如果表达式是空值、布尔值、undefined，将不会显示

7. 数组：JSX 允许在模板中插入数组，数组自动展开全部成员

> {} 只能用来放js表达式，而不能放语句（`if`、`for`、`switch`等语句都不能用）
>
> 表达式就是赋值语句右边的（可以是`变量`、`常量[数字、字符串、对象、数组等]`、`方法[方法貌似也属于变量]`等）例如`const a = 1+1;`后面的`1+1`
>
> 在语句中是可以去操作JSX

```jsx
var arr = [
  <h1>Tom</h1>,
  <h2>Jerry</h2>,
  'React ',
  'Vue',
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('test')
);
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230715122409023.png" alt="image-20230715122409023" style="zoom:50%;" />

8. 注释写在花括号里

```jsx
ReactDOM.render(
    <div>
    	<h1>小丞</h1>
    	{/*注释...*/}
     </div>,
    document.getElementById('example')
);
```

`{/*注释...*/}`中不能包含特殊字符 `{` 和 `}`， 它们在 JSX 中有特殊的含义。如果想在 JSX 注释中包含花括号 `{}` 或者其他特殊字符，你可以用 HTML 实体来表示它们。

- `{` 可以表示为 `&#123;`
- `}` 可以表示为 `&#125;`
- `/` 可以表示为 `&#47;`

例如

```jsx
{/* style={{}}中外层的花括号表示写的是js，里层的花括号表示写的是一个js对象 */ }
{/* 自结束标签必须写"/" */ }
```

应改为

```jsx
{/* style=&#123;&#123;&#125;&#125; 中外层的花括号表示写的是js，里层的花括号表示写的是一个js对象 */}
{/*自结束标签必须写"&#47;" */}
```

#### 完整示例

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>hello_react</title>
  <style>
    .title {
      background-color: orange;
      width: 200px;
    }
  </style>
</head>

<body>
  <div id="test"></div>
  <script type="text/javascript" src="../js/react.development.js"></script>
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel">  /* 此处一定要写babel */
    const myId = 'aTgUiGu'
    const myData = 'HeLlo,rEaCt'

    //1.创建虚拟DOM
    const VDOM = (
      /* 不能有多个根标签，只能有一个根标签 */
      <div>
        {/* 不能写class，要用className替换*/}
        {/*id={myId.toLowerCase()}的花括号表示里面写的是js */}
        <h2 className="title" id={myId.toLowerCase()} >
          { /* style中外层的花括号表示写的是js，里层的花括号表示写的是一个js对象 */}
          <span style={{ color: '#f0f', fontSize: '29px' }}> {myData.toLowerCase()}</span>
        </h2>
        <h2 className="title" id={myId.toUpperCase()}>
          <span style={{ color: '#f0f', fontSize: '29px' }}>{myData.toUpperCase()}</span>
        </h2>
        {/* 自结束标签必须写斜杠 */}
        <input type="text" />
      </div>
    )
    //2.渲染虚拟DOM到页面
    const root = ReactDOM.createRoot(document.getElementById('test'))
    root.render(VDOM)
  </script>
</body>

</html>
```

![image-20230715132944336](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715132944336.png)

#### 根据集合数据动态生成 `<li>`

```jsx
<script type="text/babel">  /* 此处一定要写babel */
  const data = ['React','Vue','Angular']
  const VDOM = (
    <div>
      <ul>
        {
          data.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
  const root = ReactDOM.createRoot(document.getElementById('test'))
  root.render(VDOM)
</script>
```

![image-20230715122652249](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715122652249.png)

### 4、关于虚拟DOM

1. 本质是Object类型的对象（一般对象）

2. 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。

3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上。

````jsx
<script type="text/babel">  /* 此处一定要写babel */
  /* 此处一定要写babel */
  //1.创建虚拟DOM
  const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
  //2.渲染虚拟DOM到页面
  ReactDOM.render(VDOM, document.getElementById('test'))
  const TDOM = document.querySelector('#test')
  console.log('虚拟DOM', VDOM)
  console.dir('真实DOM')
  console.dir(TDOM)
  //   debugger
  console.log(typeof VDOM)
  console.log(VDOM instanceof Object)
</script>
````

![image-20230804220046274](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804220046274.png)

## 二、面向组件编程

### 1.组件的使用

当应用是以多组件的方式实现，这个应用就是一个组件化的应用。React中只有两种方式的组件，分别是**函数组件**和**类式组件**。

**组件实例有三大属性 `state` `props` `refs`**

> **注意：**
>
> 1. 组件名必须是首字母大写（React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`< div />`代表 HTML 的 div 标签，而`< Weclome />` 则代表一个组件，并且需在作用域内使用 `Welcome`）
> 2. 虚拟DOM元素只能有一个根元素
> 3. 虚拟DOM元素必须有结束标签 `< />`

**渲染类组件标签的基本流程**

1. React 内部会创建组件实例对象
2. 调用`render()`得到虚拟 DOM ,并解析为真实 DOM
3. 插入到指定的页面元素内部

#### 1.1 函数式组件

定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
<script type="text/babel">  /* 此处一定要写babel */
  //1.创建函数式组件
  function MyComponent(props) {
    console.log(this) //此处的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
  }
  //2.渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<MyComponent />);
</script>
```

![image-20230804221941701](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804221941701.png)

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

让我们来回顾一下这个例子中发生了什么：

1. React解析组件标签，找到了MyComponent组件。

2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。

**注意：** **组件名称必须以大写字母开头。**

React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。你可以在[深入 JSX](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) 中了解更多关于此规范的原因。

#### 1.2 类式组件

**将函数组件转换成 class 组件**

通过以下五步将函数式组件转成类式组件：

1. 创建一个同名的 [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)，并且继承于 `React.Component`。
2. 添加一个空的 `render()` 方法。
3. 将函数体移动到 `render()` 方法之中。
4. 在 `render()` 方法中使用 `this.props` 替换 `props`。
5. 删除剩余的空函数声明。

```jsx
<script type="text/babel">  /* 此处一定要写babel */
  class MyComponent extends React.Component {
    render() {
      console.log('render中的this:', this)
      return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<MyComponent />);
</script>
```

![image-20230804221857662](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804221857662.png)

每次组件更新时 `render` 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<MyComponent/>` ，就仅有一个 `MyComponent` 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。

**执行过程：**

1. React解析组件标签，找到相应的组件

2. 发现组件是类定义的，随后new出来的类的实例，并通过该实例调用到原型上的render方法

3. 将render返回的虚拟DOM转化为真实的DOM,随后呈现在页面中

**类基础知识：**

```html
<script type="text/javascript">
class Person {
  // 构造方法
  constructor(name,age){
    this.name = name
    this.age = age
  }
  speak(){
    console.log(`我叫${this.name},我年龄是${this.age}`);
  }
}
// 创建一个Student类，继承至Person类
class Student extends Person {
  constructor(name,age,grade){
    super(name,age)
    this.grade= grade
  }
  // 重写从父类继承过来的方法
  speak(){
    console.log(`我叫${this.name},我年龄是${this.age}，我读的是${this.grade}年级`);
  }
}

const p = new Person("tom",18);
console.log(p);
p.speak();
p.speak.apply({name:'jerry',age:12});
console.log(({name:'jerry',age:12}).name);
// 下面这样写不行，因为这个对象不是Person对象，也没有继承Person对象
// console.log(({name:'jerry',age:12}).speak()); 
console.log("===============================");
const s1 = new Student('tom',18,'大一');
console.log(s1);
s1.speak();
</script>
```

![image-20230715145145564](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715145145564.png)

#### 1.3 组合组件

组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

例如，我们可以创建一个可以多次渲染 `Welcome` 组件的 `App` 组件：

```jsx
<script type="text/babel">  /* 此处一定要写babel */
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  function App() {
    return (
      <div>
        <Welcome name="Sara" />
        <Welcome name="Cahal" />
        <Welcome name="Edite" />
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<App />);
</script>
```

![image-20230804222330734](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804222330734.png)

通常来说，每个新的 React 应用程序的顶层组件都是 `App` 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 `Button` 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

#### 1.4 提取组件

将组件拆分为更小的组件。例如，参考如下 `Comment` 组件：

```jsx
<script type="text/babel">  /* 此处一定要写babel */
  function formatDate(date) {
    return date.toLocaleDateString();
  }

  function Comment(props) {
    return (
      <div className="Comment">
        <div className="UserInfo">
          <img className="Avatar" src={props.author.avatarUrl} alt={props.author.name} />
          <div className="UserInfo-name">{props.author.name}</div>
        </div>
        <div className="Comment-text">{props.text}</div>
        <div className="Comment-date">{formatDate(props.date)}</div>
      </div>
    )
  }

  const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
      name: 'Hello Kitty',
      avatarUrl: 'http://placekitten.com/g/64/64',
    },
  }

  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Comment date={comment.date} text={comment.text} author={comment.author} />);
</script>
```

该组件用于描述一个社交媒体网站上的评论功能，它接收 `author`（对象），`text` （字符串）以及 `date`（日期）作为 props。

![image-20230804223106223](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804223106223.png)

该组件由于嵌套的关系，变得难以维护，且很难复用它的各个部分。因此，让我们从中提取一些组件出来。

首先，我们将提取 `Avatar` 组件：

```js
function Avatar(props) {
  return <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
}
```

`Avatar` 不需知道它在 `Comment` 组件内部是如何渲染的。因此，我们给它的 props 起了一个更通用的名字：`user`，而不是 `author`。

我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。

我们现在针对 `Comment` 做些微小调整：

```jsx
function Avatar(props) {
  return <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  )
}
```

接下来，我们将提取 `UserInfo` 组件，该组件在用户名旁渲染 `Avatar` 组件：

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

进一步简化 `Comment` 组件：

```jsx
function Avatar(props) {
  return <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />;
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  )
}
```

最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（`Button`，`Panel`，`Avatar`），或者组件本身就足够复杂（`App`，`FeedStory`，`Comment`），那么它就是一个可提取出独立组件的候选项。

### 2.state

#### 2.1 基本使用

**需求：**页面显示【今天天气很炎热】，鼠标点击文字的时候，页面更改为【今天天气很凉爽】

##### 2.1.1 原生点击事件

原生点击事件有` btn1.addEventListener('click',()=>{})`、` btn2.onclick = ()=>{}`、`<button onclick="demo()">按钮</button>`这三种方式。其中前两种使用的是`()=>{}`时，不管是否开启严格模式都是指向`Window`，使用`    btn1.addEventListener('click',function(){ })`这种方式，不管是否开启严格模式，都是指向这个`dom`

而使用第三种方式，不开启严格模式指向的是`Window`，开启严格模式指向的是`undefined`。

```html
<body>
    <button id="btn1">按钮1</button>
    <button id="btn2">按钮2</button>
    <button onclick="demo()">按钮3</button>
    <script>
        const btn1 = document.getElementById("btn1")
        btn1.addEventListener('click',()=>{
            // 'use strict'
            console.log('按钮1',this)
            alert('按钮1被点击了')
        })
        const btn2 = document.getElementById("btn2")
        btn2.onclick = ()=>{
            // 'use strict'
            console.log("按钮2",this)
            alert('按钮2被点击了')
        }
        function demo(){
            console.log("按钮3",this)
            alert('按钮3被点击了')
        }
    </script>
</body>
```

![image-20230715161021100](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715161021100.png)

```html
<body>
    <button id="btn1">按钮1</button>
    <button id="btn2">按钮2</button>
    <button onclick="demo()">按钮3</button>
    <script>
        const btn1 = document.getElementById("btn1")
        btn1.addEventListener('click',function(){
            'use strict'
            console.log('按钮1',this)
            alert('按钮1被点击了')
        })
        const btn2 = document.getElementById("btn2")
        btn2.onclick = function(){
            'use strict'
            console.log("按钮2",this)
            alert('按钮2被点击了')
        }
        function demo(){
            'use strict'
            console.log("按钮3",this)
            alert('按钮3被点击了')
        }
    </script>
</body>
```

![image-20230715161248136](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715161248136.png)

##### 2.1.2 React添加点击事件

原生的`onclick="demo()"`在引号里面写的是一段js代码，而在React中应该写`onClick={demo}`（`onClick`使用小驼峰命名法），即`{}`里传的是一个表达式，在有`click`事件时`React`会帮我们调用这个表达式

```jsx
<script type="text/babel">
  let that = null
  //1.创建组件
  class Weather extends React.Component {
    constructor(props) {
      super(props)
      //先给state赋值
      this.state = { isHot: true, win: "大风" }
      // 缓存this
      that = this
    }
    render() { //这个This也是实例对象
      // 读取状态
      return <h1 onClick={changeWeather}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
  }
  // 2.渲染到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);

  function changeWeather() {
    // babel开启了严格模式，在这里的this指向的是undefined
    // babel不开启严格模式，在这里的this指向的是Window
    // 所以不管怎么样，都拿不到Weather组件的state
    console.log("this", this);
    console.log("that", that);
    // 不能直接修改(修改后不会更新dom)
    console.log("isHot1",that.state.isHot);
    that.state.isHot = !that.state.isHot
    console.log("isHot2",that.state.isHot);
  }
</script>
```

可以看到即使修改了值也不会动态更新`dom`

> 我们看到直接输出isHot的值为true，而点击对象却显示isHot的值为false，其实这是谷歌的问题。点击这个蓝色的问号，就有如下提示`This value was evaluated upon first expanding. It may have changed since then.`告诉我们这个值有可能是已经改变后的值（也就是显示的是我们点击这个对象的详细信息时现在的值，并不是我们输出的时候这个对象的值）

![image-20230715165758843](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715165758843.png)

我们可以调用`setState`更新值，可以看到dom更新了，而值貌似没有更新，这其实是因为`setState`是异步更新的（不绝对，原生方法里调用setState可能是同步的），设个定时器再查看就可以看到已经更新isHot的值了

```js
function changeWeather() {
  // 要调用setState修改
  console.log("isHot1", that.state.isHot);
  that.setState({ isHot: !that.state.isHot })
  console.log("isHot2", that.state.isHot);
  setTimeout(() => {
    console.log("isHot3", that.state.isHot);
  }, 0);
}
```

![image-20230715170633758](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715170633758.png)

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

例如，传统的 HTML：

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

在 React 中略微不同：

```html
<button onClick={activateLasers}>  
   Activate Lasers
</button>
```

在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式地使用 `preventDefault`。例如，传统的 HTML 中阻止表单的默认提交行为，你可以这样写：

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

在 React 中，可能是这样的：

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();    
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

在这里，`e` 是一个合成事件。React 根据 [W3C 规范](https://www.w3.org/TR/DOM-Level-3-Events/)来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。React 事件与原生事件不完全相同。如果想了解更多，请查看 [`SyntheticEvent`](https://zh-hans.reactjs.org/docs/events.html) 参考指南。

使用 React 时，你一般不需要使用 `addEventListener` 为已创建的 DOM 元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。

##### 2.1.3 获取`setState`的更新后的值

由于`setState`是异步更新的（不绝对，原生方法里调用setState可能是同步的），所以我们可以使用`setState`方法的第二个参数，第二个参数可以指定一个回调，当state更新之后react会帮我们执行这个回调。

```jsx
  function changeWeather() {
    // 要调用setState修改
    console.log("isHot1", that.state.isHot);
    that.setState({ isHot: !that.state.isHot },()=>{
      console.log("isHot3", that.state.isHot);
    })
    console.log("isHot2", that.state.isHot);
  }
```

![image-20230804230446453](https://gitlab.com/apzs/image/-/raw/master/image/image-20230804230446453.png)

##### 2.1.4 解决this指向

> 不推荐使用bind解决this指向，可以使用`changeWeather = () => {}`这种箭头函数的方式解决this指向。

我们都说React是一个状态机，体现是什么地方呢，就是体现在state上，通过与用户的交互，实现不同的状态，然后去渲染UI,这样就让用户的数据和界面保持一致了。state是组件的私有属性。

在React中，更新组件的state，结果就会重新渲染用户界面(不需要操作DOM),一句话就是说，用户的界面会随着状态的改变而改变。

state是组件对象最重要的属性，值是对象（可以包含多个key-value的组合）

简单的说就是组件的状态，也就是该组件所存储的数据

###### 通过bind（不推荐）

> 这里不能直接使用，类中的所有方法默认都是严格模式，而调用onClick里的表达式时并不是通过Weather对象调用的，也就是在类的方法中执行`console.log(this);`结果为`undefined`，我们需要使用`bind`函数，修改别的对象调用`changeWeather`时的指向，将其指向修改为`Weather`对象，已使我们能够获取到`Weather`对象的state属性，详细解释请看[详细解释](#详细解释)

````jsx
<script type="text/babel">
  //1.创建组件
  class Weather extends React.Component {
    // 构造器只执行一次
    constructor(props) {
      //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
      super(props);
      console.log(this);
      // 先给state赋值
      this.state = { isHot: true, win: "大风" };
      // this里没有changeWeather，但是它的原型对象上有(对象里的方法默认会放在对象的原型对象上，即changeWeather、constructor、render都在Weather的原型对象上)，
      // 然后使用bind生成一个新的函数并帮我们修改函数的指向（这里的指向修改为了this）bind和apply、call类似，都是修改函数的this指向，只不过bind不立即调用，只是返回一个表达式
      // 我们可以将返回的新的函数放在任何对象中，只要找得到就行，并且在这个对象里调用我们放置的changeWeather方法，其this是指向Weather对象的，我们也就可以正确获得Weather对象里的state
      // 当然不写这行，直接写onClick={this.changeWeather.bind(this)}也行，只要修改了this指向就行
      this.changeWeather2 = this.changeWeather.bind(this);
    }
    //render会调用1+n次【1就是初始化的时候调用的，n就是每一次修改state的时候调用的】
    render() {
      // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，
      // 而类中的方法默认开启了局部的严格模式，所以changeWeather的this指向undefined,而不是指向Window或Weather
      // 因此这里我们需要使用修改了changeWeather方法的this指向的changeWeather2方法
      return <h1 onClick={this.changeWeather2}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
    // 使用changeWeather() {}这种方式，方法会放在Weather的原型对象上，使用changeWeather = function(){}这种方式会放在Weather自身上
    changeWeather() {
      const isHot = this.state.isHot;
      // 状态中的属性不能直接进行更改，需要借助API
      // this.state.isHot = !isHot; (这样修改，DOM不会更新)
      // 必须使用setState对其进行修改，并且这是一个合并动作并不是替换，即没修改的不变，只改变想要修改的
      this.setState({ isHot: !isHot });
    }
  }
  // 2.渲染，如果有多个渲染同一个容器，后面的会将前面的覆盖掉
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
````

> 使用`changeWeather() {}`这种方式，`changeWeather`方法会放在Weather的原型对象上

![image-20230715181921348](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715181921348.png)

> 使用`changeWeather = function(){}`这种方式`changeWeather`方法会放在Weather自身上

![image-20230715191608023](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715191608023.png)

通过`bind`的方式，我们还可以传递参数：

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    constructor(props) {
      super(props);
      console.log(this);
      this.state = { isHot: true, win: "大风" };
    }
    render() {
      return <h1 onClick={this.changeWeather.bind(this,this.state.isHot)}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
    changeWeather(isHot) {
      console.log("changeWeather的this",this);
      console.log("获取到的参数",isHot);
      // 通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递
      console.log("隐式传递的event",event);
      this.setState({ isHot: !isHot });
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

![image-20230805143440727](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805143440727.png)

在**类式组件**的函数中，不能直接修改`state`值，即不能使用`this.state.isHot = false`，这样修改dom不会更新， React不允许直接修改`state`，应该通过类的原型对象上的方法 `setState()`，然后内部会调用`render`函数重新渲染页面

**注意：**

1. 组件的构造函数，必须要传递一个props参数

2. 特别关注this【重点】，类中所有的方法局部都开启了严格模式，如果直接进行调用，this就是undefined

3. 想要改变state,需要使用setState进行修改，如果只是修改state的部分属性，则不会影响其他的属性，这个只是合并并不是覆盖。

**在优化过程中遇到的问题**

1. 组件中的 render 方法中的 this 为组件实例对象
2. 组件自定义方法中由于开启了严格模式，this 指向`undefined`如何解决
   1. 通过 bind 改变 this 指向
   2. 推荐采用箭头函数，箭头函数的 `this` 指向
3. state 数据不能直接修改或者更新

###### 通过箭头函数（推荐）

> 由于箭头函数没有自己的this，当我们在箭头函数中输出this时，会找箭头函数外面的this，其实就是`Weather`对象

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    constructor(props) {
      super(props);
      console.log(this);
      // 先给state赋值
      this.state = { isHot: true, win: "大风" };
    }
    render() {
      return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
    changeWeather = () => {
      console.log("changeWeather的this",this);
      const isHot = this.state.isHot;
      this.setState({ isHot: !isHot });
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

![image-20230805112642662](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805112642662.png)

###### 通过高阶函数（推荐）

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    constructor(props) {
      super(props);
      console.log(this);
      this.state = { isHot: true, win: "大风" };
    }
    render() {
      // 通过高阶函数的方式，事件对象必须显式的进行传递
      return <h1 onClick={() => this.changeWeather()}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
    changeWeather() {
      console.log("changeWeather的this",this);
      const isHot = this.state.isHot;
      this.setState({ isHot: !isHot });
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

![image-20230805140059703](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805140059703.png)

通过高阶函数不仅可以解决this指向，还能传递参数，并且`changeWeather`方法不管是哪种方式都能得到正确的this

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    constructor(props) {
      super(props);
      console.log(this);
      this.state = { isHot: true, win: "大风" };
    }
    render() {
      return <h1 onClick={(e) => this.changeWeather(this.state.isHot,e)}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
    changeWeather(isHot,event) {
      console.log("changeWeather的this",this);
      console.log("获取到的参数",isHot,event);
      this.setState({ isHot: !isHot });
    }

	changeWeather2 = (isHot,event) => {
      console.log("changeWeather的this",this);
      console.log("获取到的参数",isHot,event);
      this.setState({ isHot: !isHot });
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

![image-20230805140648589](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805140648589.png)

###### <a name="详细解释">详细解释</a>

**通过bind**

```html
<script>
    class Person {
        // 构造方法
        constructor(name, age) {
            this.name = name
            this.age = age
        }
        speak() {
            console.log("我的this指向: ", this);
            if (this) {
                console.log(`我叫${this.name},我年龄是${this.age}`);
            }
        }
    }
    const p1 = new Person("tom", 18)
    // render函数就相当于这样，直接创建一个对象，然后调对象上的方法
    p1.speak()
    console.log("speak方法: ", p1.speak);
    console.log("==========直接调用this.changeWeather类似于如下代码=====================");
    // 而onClick里的表达式就相当于这样，先将这个表达式存起来，不使用这个Person对象进行调用（this指向不是Person对象）
    const x1 = p1.speak
    x1()
    console.log("==========使用bind后的调用,类似于如下代码==============================");
    // 由于this指向变为了undefine，我们只需要修改this指向就好了
    // 其实bind和apply、call类似，都是修改函数的this指向，只不过bind不立即调用，只是返回一个表达式
    // 我们将x2的speak方法的this指向修改为p1，这样执行x2()时方法里的this就不是undefine而是p1了
    const x2 = p1.speak.bind(p1)
    x2()
    console.log("==========我们也可以将this修改为其他的对象=============================");
    const x3 = p1.speak.bind({ name: 'jerry', age: 19 })
    x3()
</script>
```

![image-20230715183414815](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715183414815.png)

**箭头函数**

我们还可以使用箭头函数，由于箭头函数没有自己的this，当我们在箭头函数中输出this时，会找箭头函数外面的this，这里其实就是`Person`对象，因此后面会介绍一种更加简单的方式以实现我们想要的功能

```html
<script>
    class Person {
        // 构造方法
        constructor(name, age) {
            this.name = name
            this.age = age
        }
        speak = () => {
            console.log("我的this指向: ", this);
            if (this) {
                console.log(`我叫${this.name},我年龄是${this.age}`);
            }
        }
    }
    const p1 = new Person("tom", 18)
    p1.speak()
    console.log("================================================");
    const x1 = p1.speak
    x1()
</script>
```

![image-20230715192323475](https://gitlab.com/apzs/image/-/raw/master/image/image-20230715192323475.png)

**高阶函数**

```html
<script>
    class Person {
        // 构造方法
        constructor(name, age) {
            this.name = name
            this.age = age
        }
        speak() {
            console.log("我的this指向: ", this);
            if (this) {
                console.log(`我叫${this.name},我年龄是${this.age}`);
            }
        }
    }
    const p1 = new Person("tom", 18)
    // render函数就相当于这样，直接创建一个对象，然后调对象上的方法
    p1.speak()
    console.log("speak方法: ", p1.speak);
    console.log("==========直接调用this.changeWeather类似于如下代码=====================");
    // 而onClick里的表达式就相当于这样，先将这个表达式存起来，不使用这个Person对象进行调用（this指向不是Person对象）
    const x1 = p1.speak
    x1()
    console.log("==========使用高阶函数后的调用,类似于如下代码==============================");
    // 使用高阶函数，x2获取到的是一个高阶函数，高阶函数里会使用p1的this调用speak()方法
    const x2 = () => p1.speak()
    x2()
</script>
```

![image-20230805142323444](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805142323444.png)

#### 2.2 简化版本

1. state的赋值可以不再构造函数中进行，类似于如下代码

```html
<script>
    class Car {
        constructor(name,price){
            // this.wheel = 4
            this.name = name
            this.price = price
        }
        // 相当于构造函数里调用 this.wheel = 4
        wheel = 4
    }
    const car = new Car('宝马',299)
    console.log(car);
</script>
```

![image-20230805142605098](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805142605098.png)

2. 使用了箭头函数，将this进行了改变（由于箭头函数没有自己的this，当我们在箭头函数中输出this时，会找箭头函数外面的this，这里其实就是`Weather`对象）

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    //可以直接对其进行赋值
    state = { isHot: true };
    render() {
      return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
      // 使用高阶函数也是可以的（使用高阶函数后就不需要关心this指向了，因为使用的是render的this）
      // return <h1 onClick={()=>this.changeWeather()}>今天天气很{this.state.isHot ? "炎热" : "凉爽"}</h1>
    }
    //箭头函数
    changeWeather = () => {
      console.log(this);
      const state = this.state.isHot;
      this.setState({ isHot: !state });
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);     
</script>
```

如果想要在调用方法的时候传递参数，有两种方式

```jsx
<h1 onClick={(e) => this.changeWeather(this.state.isHot,e)}></h1>
<h1 onClick={this.changeWeather.bind(this,this.state.isHot)}></h1>
```

上述两种方式是等价的，分别通过[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)和 [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 来实现。

在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象（在方法里直接使用`event`）以及更多的参数将会被隐式的进行传递。

#### 2.3 setState()

`this.setState()`：

```js
this.setState(partialState, [callback]);
```

- `partialState`: 需要更新的状态的部分对象
- `callback`: 更新完状态后的回调函数

##### 第一个参数

`this.setState()`方法的第一个参数可以接收两种类型：`对象`或`函数`。

**对象写法：**即想要修改的state

```js
this.setState({isHot: false})
```

**函数写法：**函数可以接收两个参数，第一个是当前state，第二个是当前props，该函数可以返回一个对象，返回的这个对象和直接传递的对象是一样的，通过函数写法可以方便的获取到当前的state和props

```js
this.setState((state,props)=>{
  console.log("state",state);
  console.log("props",props);
  return {isHot: false}
})
// 当然我们大部分使用函数的情况都是想获取到state的数据，因此可以使用如下方式
this.setState(state=>({isHot: !state.isHot}))
```

![image-20230805113924130](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805113924130.png)

- 在执行 `setState`操作后，React 会自动调用一次 `render()`
- `render()` 的执行次数是 1+n (1 为初始化时的自动调用，n 为状态更新的次数)

##### 第二个参数

状态改变成功（修改state成功）的回调，可写可不写。主要用于更新状态成功之后做一些事情

```js
// 对象写法
this.setState( {isHot: false},()=>{
  console.log("更新之后的state",this.state.isHot);
})
// 函数写法
this.setState((state,props)=>{
  console.log("state",state);
  console.log("props",props);
  return {isHot: false}
},()=>{
  console.log("更新之后的state",this.state.isHot);
})
// 函数简写形式。注意：返回的如果是对象，需要使用小括号将这个对象包裹起来，这样编译器就不会把这个{}当成是箭头函数函数体的大括号了
this.setState(this.setState(state=>({isHot: !state.isHot})),()=>{
  console.log("更新之后的state",this.state.isHot);
})
```

![image-20230805114853400](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805114853400.png)

#### 2.4 State 的更新可能是同步的

~~React控制之外的事件中调用setState是同步更新的。比如原生js绑定的事件，setTimeout/setInterval等。~~

> 18版本中测试 原生js绑定的事件、setTimeout回调函数 中执行setState方法也是异步更新的

大部分开发中用到的都是React封装的事件，比如onChange、onClick、onTouchMove等，这些事件处理程序中的setState都是异步处理的。

下面的案例中预期setState使得isHot变成了11，输出也应该是11。然而在控制台打印的却是10，也就是并没有对其进行更新。这是因为异步的进行了处理，在输出的时候还没有对其进行处理。

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    //可以直接对其进行赋值
    state = { isHot: 10 };
    render() {
      return <h1 onClick={this.changeWeather}>点击事件</h1>
    }

    changeWeather = () => {
      //修改isHot
      this.setState({ isHot: this.state.isHot + 1 })
      console.log(this.state.isHot);
    }
  }

  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

![image-20230805150316737](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805150316737.png)

~~但是通过这个原生JS的，可以发现，控制台打印的就是11，也就是已经对其进行了处理。也就是进行了同步的更新。~~

> 18版本的测试中，原生js绑定的事件、setTimeout回调函数 中执行setState方法都是异步更新的

**原生js绑定的事件**

```jsx
<script type="text/babel">
  class Weather extends React.Component {
    state = { isHot: 10 };
    constructor(props){
      super(props)
      document.getElementById("test").addEventListener("click", () => {
        this.setState({ isHot: this.state.isHot + 1 });
        console.log(this.state.isHot);
      })
    }

    render() {
      return <h1>点击事件</h1>
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

**setTimeout回调函数**

```jsx
<script type="text/babel">
  let that
  class Weather extends React.Component {
    state = { isHot: 10 };
    constructor(props) {
      super(props)
      setTimeout(() => {
        this.setState({ isHot: this.state.isHot + 1 });
        console.log(this.state.isHot);
      }, 0);
    }
    render() {
      return (
        <h1 id="test2">点击事件</h1>
      )
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

**原生js绑定的事件 + setTimeout回调函数**

```jsx
<script type="text/babel">
  let that
  class Weather extends React.Component {
    state = { isHot: 10 };
    constructor(props) {
      super(props)
      setTimeout(() => {
        document.getElementById("test").addEventListener("click", () => {
          this.setState({ isHot: this.state.isHot + 1 });
          console.log(this.state.isHot);
        })
      }, 0);
    }
    render() {
      return (
        <h1 id="test2">点击事件</h1>
      )
    }
  }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Weather />);
</script>
```

通过以上三个代码的测试，发现18版本的react不管是`原生js绑定的事件`还是`setTimeout回调函数` ，在里面执行setState方法都是异步更新的

![image-20230805151222882](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805151222882.png)

**React怎么调用同步或者异步的呢？**

在 React 的 setState 函数实现中，会根据一个变量 `isBatchingUpdates` 判断是直接更新 `this.state` 还是放到队列中延时更新，而 `isBatchingUpdates` 默认是 `false`，表示 `setState` 会异步更新 `this.state`；但是，有一个函数 `batchedUpdates`，该函数会把 `isBatchingUpdates` 修改为 `true`，而当 `React` 在调用事件处理函数之前就会先调用这个 `batchedUpdates`将`isBatchingUpdates`修改为`true`，这样由 React 控制的事件处理过程 setState 不会同步更新`this.state`。

**如果是同步更新，每执行一个setState就调用一个render，并且如果多次调用setState会以最后调用的为准，前面的将会作废；如果是异步更新，多个setSate会统一调用一次render

#### 2.5 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

```jsx
<FormattedDate date={this.state.date} />
```

`FormattedDate` 组件会在其 props 中接收参数 `date`，但是组件本身无法知道它是来自于 `Clock` 的 state，或是 `Clock` 的 props，还是手动输入的：

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。你可以在有状态的组件中使用无状态的组件，反之亦然。

### 3.props

#### 3.1 基本使用

与`state`不同，`state`是组件自身的状态，而`props`则是外部传入的数据

基本使用：

```jsx
<div id="test"></div>
<div id="test2"></div>

<script type="text/babel">
  class Person extends React.Component {
    render() {
      const { name, age, sex } = this.props
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age + 1}</li>
        </ul>
      )
    }
  }
  //传递数据
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Person name="tom" age={18} sex="男" />);
  const root2 = ReactDOM.createRoot(document.getElementById('test2'));
  root2.render(<Person name="jerry" age={19} sex="女" />);
</script>
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230715212938910.png" alt="image-20230715212938910" style="zoom:50%;" />

如果传递的数据是一个对象，使用如下方式可以更加简便的使用

> js中`{..p}`不可以展开对象，在react组件上能使用`{..p}`展开对象是因为babel+react的语法规则使得{..p}可以展开对象，但是只有在标签中才能使用

```jsx
<script type="text/babel">
  class Person extends React.Component {
    render() {
      const { name, age, sex } = this.props
      return (
        <ul>
          <li>{name}</li>
          <li>{age}</li>
          <li>{sex}</li>
        </ul>
      )
    }
  }
  const p = { name: "tom", age: 18, sex: "男" }
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Person {...p} />);
</script>
```

... 这个符号恐怕都不陌生，这个是一个展开运算符，主要用来展开数组，如下面这个例子：

```js
arr = [1,2,3];
arr1 = [4,5,6];
arr2 = [...arr,...arr1];  //arr2 = [1,2,3,4,5,6]
```

但是他还有其他的用法：

1.复制一个对象给另一个对象{...对象名}。此时这两个对象并没有什么联系了

```js
const p1 = {name:"张三",age:"18",sex:"女"}
const p2 = {...p1};
p1.name = "sss";
console.log(p2)  //{name:"张三",age:"18",sex:"女"}
```

2.在复制的时候，合并其中的属性

```js
 const p1 = {name:"张三",age:"18",sex:"女"}
 const p2 = {...p1,name : "111",hua:"ss"};
 p1.name = "sss";
 console.log(p2)  //{name: "111", age: "18", sex: "女",hua:"ss"}
```

> 注意： {...P}并不能展开一个对象
>
> ```js
> const arr = [1, 2, 3, 4, 5]
> console.log(...arr);
> const p = { name: "tom", age: "18", sex: "男" }
> // 这样写会报错
> // console.log(...p);
> ```
>
> ![image-20230805155234181](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805155234181.png)
>
> **js中`{..p}`不可以展开对象，在react组件上能使用`{..p}`展开对象是因为babel+react的语法规则使得{..p}可以展开对象，但是只有在标签中才能使用**

#### 3.2 props 类型限制

> 自 React v15.5 起，`React.PropTypes` 已移入另一个包中。请使用 [`prop-types` 库](https://www.npmjs.com/package/prop-types) 代替。
>

随着你的应用程序不断增长，你可以通过类型检查捕获大量错误。对于某些应用程序来说，你可以使用 [Flow](https://flow.org/) 或 [TypeScript](https://www.typescriptlang.org/) 等 JavaScript 扩展来对整个应用程序做类型检查。但即使你不使用这些扩展，React 也内置了一些类型检查的功能。要在组件的 props 上进行类型检查，你只需配置特定的 `propTypes` 属性：

react对此提供了相应的解决方法：

- propTypes:类型检查，还可以限制不能为空
- defaultProps：默认值

> 从 ES2022 开始，你也可以在 React 类组件中将 `defaultProps` 声明为静态属性。欲了解更多信息，请参阅 [class public static fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_static_fields)。这种现代语法需要添加额外的编译步骤才能在老版浏览器中工作。

```jsx
<body>
  <!-- 引入react核心库 -->
  <script type="text/javascript" src="../js/react.development.js"></script>
  <!-- 引入react-dom，用于支持react操作DOM -->
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <!-- 引入babel，用于将jsx转为js -->
  <script type="text/javascript" src="../js/babel.min.js"></script>
  <!-- 引入prop-types，用于对props做类型限制 -->
  <script type="text/javascript" src="../js/prop-types.js"></script>

  <!-- 准备好一个“容器” -->
  <div id="test"></div>
  <div id="test2"></div>

  <script type="text/babel">
    // 创建组件
    class Person extends React.Component {
      render() {
        const { name, age, sex } = this.props
        //下面这行代码会报错，因为props是只读的
        //this.props.name = 'jack'
        return (
          <ul>
            <li>{name}</li>
            <li>{sex}</li>
            <li>{age + 1}</li>
            <li>{speak()}</li>
          </ul>
        )
      }
    }
    // 对标签属性进行类型、必要性的限制
    Person.propTypes = {
      name: PropTypes.string.isRequired, //限制name必传，且为字符串
      sex: PropTypes.string, //限制sex为字符串
      age: PropTypes.number, //限制age为数值
      speak: PropTypes.func, //限制speak为函数
    }
    // 指定默认标签属性值
    Person.defaultProps = {
      sex: '不男不女', //sex默认值为不男不女
      age: 0, // 年龄默认为0
    }
    const p1 = { name: "tom", age: 18, sex: "男" }
    const p2 = { name: "jerry" }
    // 渲染组件到页面
    const root = ReactDOM.createRoot(document.getElementById('test'));
    root.render(<Person {...p1} speak={speak} />);
    const root2 = ReactDOM.createRoot(document.getElementById('test2'));
    root2.render(<Person {...p2} />);
    function speak() {
      return "我说话了..."
    }
  </script>
</body>
```

![image-20230805160317178](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805160317178.png)

当传入的 `prop` 值类型不正确时，JavaScript 控制台将会显示警告。出于性能方面的考虑，`propTypes` 仅在开发模式下进行检查。

`defaultProps` 用于确保 `this.props.sex` 在父组件没有指定其值时，有一个默认值。`propTypes` 类型检查发生在 `defaultProps` 赋值后，所以类型检查也适用于 `defaultProps`。

**PropTypes**

以下提供了使用不同验证器的例子：

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 具有额外属性警告的对象
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的必需数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

**限制单个元素**

你可以通过 `PropTypes.element` 来确保传递给组件的 children 中只包含一个元素。

```jsx
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

#### 3.3 简写方式

使用`static`关键字，指定这个属性是类上面的，而不是对象上面的

```jsx
<script type="text/babel">
  //创建组件
  class Person extends React.Component {

    constructor(props) {
      //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
      // console.log(props);
      super(props)
      console.log('constructor', this.props);
    }

    //对标签属性进行类型、必要性的限制
    static propTypes = {
      name: PropTypes.string.isRequired, //限制name必传，且为字符串
      sex: PropTypes.string,//限制sex为字符串
      age: PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
      sex: '男',//sex默认值为男
      age: 18 //age默认值为18
    }

    render() {
      const { name, age, sex } = this.props
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age + 1}</li>
        </ul>
      )
    }
  }

  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Person name="jerry" />);
</script>
```

![image-20230805160511485](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805160511485.png)

在使用的时候可以通过 `this.props`来获取值 类式组件的 `props`:

1. 通过在组件标签上传递值，在组件中就可以获取到所传递的值
2. 在构造器里的`props`参数里可以获取到 `props`
3. 可以分别设置 `propTypes` 和 `defaultProps` 两个属性来分别操作 `props`的规范和默认值，两者都是直接添加在类式组件的**原型对象**上的（所以需要添加 `static`）
4. 同时可以通过`...`运算符来简化

**详细解释**

> 通过下面的例子可以更加深刻的理解`static`，可以看到字段加上`static`关键字后，可以在类中获取到这个字段，而其他不加`static`的字段则获取不到。而实例恰恰相反，实例获取得到非`static`字段（该字段是实例私有的），获取不到`static`字段

```html
<script>
    class Car {
        constructor(name,price){
            this.name = name
            this.price = price
        }
        wheel = 4
        static type = 'oil'
    }
    console.log(Car);
    console.log("type",Car.type);
    console.log("wheel",Car.wheel);
    console.log("===========================================");
    const car = new Car('宝马',299)
    console.log(car);
    console.log("type",car.type);
    console.log("wheel",car.wheel);
</script>
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230716100119985.png" alt="image-20230716100119985" style="zoom: 67%;" />

#### 3.4、构造器this.props的bug

如果在构造器中想使用`this.props`，则必须调用`super(props)`，将props传递给父类

```js
constructor(props){
  super(props)
  console.log('constructor',this.props);
}
```

![image-20230716101835730](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716101835730.png)

如果不给父类传递props，调用`this.props`则会出现结果为`undefined`的bug

```js
constructor(props){
  super()
  console.log('constructor',this.props);
}
```

![image-20230716102026799](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716102026799.png)

#### 3.5 函数式组件使用props

> 函数在使用props的时候，是作为参数进行使用的(props)

```jsx
<script type="text/babel">
  //创建组件
  function Person(props) {
    const { name, age, sex } = props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
  Person.propTypes = {
    name: PropTypes.string.isRequired, //限制name必传，且为字符串
    sex: PropTypes.string, //限制sex为字符串
    age: PropTypes.number, //限制age为数值
  }

  //指定默认标签属性值
  Person.defaultProps = {
    sex: '男', //sex默认值为男
    age: 18, //age默认值为18
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Person name="jerry" />);
</script>
```

函数组件的 `props`定义:

1. 在组件标签中传递 `props`的值
2. 组件函数的参数为 `props`
3. 对 `props`的限制和默认值同样设置在原型对象上

#### 3.6 props 的只读性

组件无论是使用[函数声明还是通过 class 声明](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)，都绝不能修改自身的 props。

React 非常灵活，但它也有一个严格的规则：**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。`state`在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

来看下这个 `sum` 函数：

```js
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为[“纯函数”](https://en.wikipedia.org/wiki/Pure_function)，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

```js
const account = {total : 0}
console.log("调用add之前",account);
add(account,100)
console.log("调用add之后",account);

function add(acc, amount) {
    acc.total += amount;
}
```

![image-20230805161557266](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805161557266.png)

下面的例子也不是纯函数，因为相同的入参，多次调用会返回不同的结果。

```js
function getDate(num) {
    return new Date().getTime() * num;
}
console.log("getDate", getDate(100));

function getRandom(num) {
    return Math.random() * num;
}
console.log("getRandom",getRandom(100));
```

![image-20230805162158138](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805162158138.png)

### 4.refs

Refs 提供了一种方式，允许我们访问 DOM 节点或在 `render` 方法中创建的 React 元素。

在典型的 React 数据流中，[props](https://zh-hans.reactjs.org/docs/components-and-props.html) 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

> 在我们正常的操作节点时，需要采用DOM API 来查找元素，但是这样违背了 React 的理念，因此有了`refs`

**何时使用 Refs**

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

**有三种操作`refs`的方法，分别为：**

- 字符串形式
- 回调形式
- `createRef`形式

**勿过度使用 Refs**

你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 [状态提升](https://zh-hans.reactjs.org/docs/lifting-state-up.html) 以获取更多有关示例。

#### 4.1 字符串形式（不推荐）

在想要获取到一个DOM节点，可以直接在这个节点上添加ref属性。利用该属性进行获取该节点的值。

案例：给需要的节点添加ref属性，此时该实例对象的refs上就会有这个值。就可以利用实例对象的refs获取已经添加节点的值

```jsx
<script type="text/babel">
  class Demo extends React.Component{
    showData = () =>{
      console.log("this",this);
      const {input} = this.refs
      console.log("input",input);
      console.log(input.value);
    }
    render() {
      return (
        <div>
          <input ref="input" placeholder="点击按钮提示数据"/>&nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo/>);
</script>
```

![image-20230716105249582](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716105249582.png)

**注意**

不建议使用它，因为 string 类型的 refs 存在 [一些问题](https://github.com/facebook/react/pull/8333#issuecomment-271648615)。它已过时并可能会在未来的版本被移除。

如果你目前还在使用 `this.refs.textInput` 这种方式访问 refs ，我们建议用[回调函数](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs)或 [`createRef` API](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs) 的方式代替。

#### 4.2 回调形式

React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

这种方式会将该DOM作为参数传递过去。

组件实例的`ref`属性传递一个回调函数`e => this.input1 = e `（箭头函数简写），这样会在实例的属性中存储对DOM节点的引用，使用时可通过`this.input`来使用

```js
<input ref={e => this.input1 = e } type="text" placeholder="点击按钮提示数据"/>
```

`e`会接收到当前节点作为参数，然后将当前节点赋值给实例的`input`属性上面

```jsx
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      console.log("this", this);
      const input = this.input
      console.log("input", input);
      console.log(input.value);
    }
    render() {
      return (
        <div>
          <input ref={e => this.input = e} placeholder="点击按钮提示数据" />&nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo />);
</script>
```

![image-20230805163047531](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805163047531.png)

**关于回调 refs 的说明**

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

```jsx
class Demo extends React.Component {
    state = { isHot: false }

    changeWeather = () => {
      //获取原来的状态
      const { isHot } = this.state
      //更新状态
      this.setState({ isHot: !isHot })
    }

    render() {
      const { isHot } = this.state
      return (
        <div>
          <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
          <input ref={c => {this.input = c;console.log('@', c)}} type="text"/>
          <br /> <br />
          <button onClick={this.changeWeather}>点我切换天气</button>
        </div>
      )
    }
}
```

刚渲染完会调用一次

![image-20230716112051863](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716112051863.png)

触发模板更新会调用两次（清空控制台，点击`点击切换天气`按钮）

> 第一次传递一个null值把之前的属性清空，再重新赋值。

![image-20230716112120216](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716112120216.png)

如果不想总是这样重新创建新的函数，可以使用下面的方案

下面的例子描述了一个通用的范例：使用 `ref` 回调函数，在实例的属性中存储对 DOM 节点的引用。

```js
class Demo extends React.Component {
  state = { isHot: false }

  changeWeather = () => {
    //获取原来的状态
    const { isHot } = this.state
    //更新状态
    this.setState({ isHot: !isHot })
  }

  saveInput = (c) => {
    this.input = c
    console.log('@', c)
  }

  render() {
    const { isHot } = this.state
    return (
      <div>
        <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        <input ref={this.saveInput} type="text" />
        <br /> <br />
        <button onClick={this.changeWeather}>点我切换天气</button>
      </div>
    )
  }
}
```

React 将在组件挂载时，会调用 `ref` 回调函数并传入 DOM 元素，当卸载时调用它并传入 `null`。

> 使用这种方式，渲染时会触发一次，之后无论你怎么更新模板都不会再次触发

![image-20230716113312234](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716113312234.png)

你可以在组件间传递回调形式的 refs，就像你可以传递通过 `React.createRef()` 创建的对象 refs 一样。

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />    
     </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput inputRef={el => this.inputElement = el} />
    );
  }
}
```

在上面的例子中，`Parent` 把它的 refs 回调函数当作 `inputRef` props 传递给了 `CustomTextInput`，而且 `CustomTextInput` 把相同的函数作为特殊的 `ref` 属性传递给了 `<input>`。结果是，在 `Parent` 中的 `this.inputElement` 会被设置为与 `CustomTextInput` 中的 `input` 元素相对应的 DOM 节点。

#### 4.3 createRef 形式（推荐写法）

**创建 Refs**

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```jsx
class MyComponent extends React.Component {

  myRef = React.createRef();
    
  render() {
    return <div ref={this.myRef} />;
  }
}
```

**访问 Refs**

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```js
const node = this.myRef.current;
```

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。

```jsx
class Demo extends React.Component {
  state = { isHot: false }

  changeWeather = () => {
    console.log("this",this);
    console.log("myRef.current",this.myRef.current);
    const { isHot } = this.state
    this.setState({ isHot: !isHot })
  }

  myRef = React.createRef()

  render() {
    const { isHot } = this.state
    return (
      <div>
        <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        <input ref={this.myRef} type="text" />
        <br /> <br />
        <button onClick={this.changeWeather}>点我切换天气</button>
      </div>
    )
  }
}
```

![image-20230716144914470](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716144914470.png)

#### 4.4、不要过度使用ref

> 如果发生事件的元素是想要操作的元素，则可以不使用ref，直接使用传递过来的事件对象即可

```jsx
class Demo extends React.Component {

  showData = (event) => {
    console.log(event.target);
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <input onBlur={this.showData} type="text" placeholder="失去焦点提示数据" />
      </div>
    )
  }
}
```

![image-20230716150546859](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716150546859.png)

#### 4.5 为 DOM 元素添加 ref

以下代码使用 `ref` 去存储 DOM 节点的引用：

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();    
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();  
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
    return (
      <div>
        <input type="text" ref={this.textInput} />        
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

React 会在组件挂载时给 `current` 属性传入 DOM 元素，并在组件卸载时传入 `null` 值。`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

注意：我们不要过度的使用 ref，如果发生时间的元素刚好是需要操作的元素，就可以使用事件对象去替代。

#### 4.6 为类式组件添加 Ref

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 `focusTextInput` 方法：

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();  
  }
  // 组件挂载之后执行，后面的组件生命周期会讲
  componentDidMount() {
    this.textInput.current.focusTextInput();  
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />    
    );
  }
}
```

请注意，这仅在 `CustomTextInput` 声明为 class 时才有效：

```js
class CustomTextInput extends React.Component {  // ...
}
```

#### 4.7 Refs 与函数组件

默认情况下，**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例：

```jsx
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // 不能使用这种写法，使用后将不生效
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

如果要在函数组件中使用 `ref`，你可以使用 [`forwardRef`](https://zh-hans.reactjs.org/docs/forwarding-refs.html)（可与 [`useImperativeHandle`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。

不管怎样，你可以**在函数组件内部使用 `ref` 属性**，只要它指向一个 DOM 元素或类式组件：

```jsx
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

## 三、事件处理与收集表单数据

### 1. 事件处理

>1. 通过onXxx属性指定事件处理函数(注意大小写)
>
>  a)React使用的是自定义(合成事件,而不是使用的原生DOM事件) ----为了更好的兼容性
>
>  b)React中的事件是通过事件委托的方式处理的(委托给组件最外层的元素)----为了更高效
>
>2. 通过event.target得到发生事件的DOM元素对象 -----不要过度使用ref

### 2. 表单组件的分类

#### 2.1 受控组件

**受控组件：**使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```jsx
<script type="text/babel">
  class Login extends React.Component {
    state = {//初始化状态
      username: '', //用户名
      password: '' //密码
    }
    //保存用户名到状态中
    saveUsername = (event) => {
      this.setState({ username: event.target.value })
    }
    //保存密码到状态中
    savePassword = (event) => {
      this.setState({ password: event.target.value })
    }
    //表单提交的回调
    handleSubmit = (event) => {
      event.preventDefault() //阻止表单提交
      const { username, password } = this.state
      alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input onChange={this.saveUsername} type="text" name="username" />
          密码：<input onChange={this.savePassword} type="password" name="password" />
          <button>登录</button>
        </form>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Login />);
</script>
```

#### 2.2 非受控组件

**非受控组件：**非受控组件其实就是表单元素的值不会更新state。输入数据都是现用现取的。

```jsx
<script type="text/babel">
  class Login extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault() //阻止表单提交
      const { username, password } = this
      alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input ref={c => this.username = c} type="text" name="username" />
          密码：<input ref={c => this.password = c} type="password" name="password" />
          <button>登录</button>
        </form>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Login />);
</script>
```

![image-20230805171011513](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805171011513.png)

### 3.  高阶函数和函数柯里化

**高阶函数：**如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。

- 若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
- 若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

**函数的柯里化：**通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

> 需求：想写一个方法这个方法可以帮我们修改指定字段的值，这个字段需要通过参数进行传递

#### 3.1 方式一：

```jsx
<script type="text/babel">
  class Login extends React.Component {
    state = {//初始化状态
      username: '', //用户名
      password: '' //密码
    }
    //保存表单数据
    saveFormData = (dataType) => {
      return (event) => {
        this.setState({ [dataType]: event.target.value })
      }
    }

    //表单提交的回调
    handleSubmit = (event) => {
      event.preventDefault() //阻止表单提交
      const { username, password } = this.state
      alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input onChange={this.saveFormData('username')} type="text" name="username" />
          密码：<input onChange={this.saveFormData('password')} type="password" name="password" />
          <button>登录</button>
        </form>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Login />);
</script>
```

#### 3.2 方式二：(推荐)

```jsx
<script type="text/babel">
  class Login extends React.Component {
    state = {//初始化状态
      username: '', //用户名
      password: '' //密码
    }
    //保存表单数据
    saveFormData = (dataType, value) => {
      this.setState({ [dataType]: value })
    }

    //表单提交的回调
    handleSubmit = (event) => {
      event.preventDefault() //阻止表单提交
      const { username, password } = this.state
      alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input onChange={(event) => { this.saveFormData('username', event.target.value) }} type="text" name="username" />
          密码：<input onChange={(event) => { this.saveFormData('password', event.target.value) }} type="password" name="password" />
          <button>登录</button>
        </form>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Login />);
</script>
```

#### 3.3 详细解释

**中括号解释**

`this.setState({ [dataType]: event.target.value })`里中括号的解释

```js
const data = {name:"tom",age:18}
const field = "name"
// 通常写法
console.log(data.name);
// 我们想要获取的这个字段可以是参数传过来的，参数的类型是字符串，可以通过这种方式拿到数据中指定字段的值
console.log(data[field]);

// 如果一个对象想要根据参数的值给指定的字段赋值，可以使用如下方式
const data2 = {[field]:"jerry"}
console.log(data2);
```

![image-20230805214123702](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805214123702.png)

**高阶函数解释**

最常举例的高阶函数：三个数相加

> 高阶函数：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

```js
function sum(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}

const result = sum(1)(2)(3)
console.log(result);
```

![image-20230805214358025](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805214358025.png)

**方式一解释**

下面解释如下方式的含义

```jsx
<input onChange={this.saveFormData('username')} type="text" name="username" />

saveFormData = (dataType) => {
    return (event) => {
        this.setState({ [dataType]: event.target.value })
    }
}
```

相当于如下代码

```html
<script>
    class Login {
        saveFormData = (dataType) => {
            return (event) => {
                console.log({[dataType]:event.target.value});
            }
        }
    }
    const login = new Login()
    // 相当于我们的 this.saveFormData('username')
    const func = login.saveFormData("username")
    // 相当于react帮我们调用函数，并通过参数给我们传递event对象
    const event = {target: {value: "tom"}}
    func(event)
    // 总结下来，类似执行的是 login.saveFormData("username")(event) 调用第一次传递dataType，再次调用传递event
</script>
```

![image-20230805230001645](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805230001645.png)

**方式二解释**

下面解释如下方式的含义

```jsx
<input onChange={(event) => { this.saveFormData('username', event.target.value) }} />

saveFormData = (dataType, value) => {
	this.setState({ [dataType]: value })
}
```

相当于如下代码

```html
<script>
    class Login {
        saveFormData = (dataType,value) => {
            console.log({[dataType]:event.target.value});
        }
    }
    const login = new Login()
    // 相当于我们调用的 this.saveFormData('username', event.target.value)
    const func = (event) => {
        login.saveFormData("username",event.target.value)
    }
    // 相当于react帮我们调用函数，并通过参数给我们传递event对象
    const event = {target: {value: "tom"}}
    func(event)
</script>
```

![image-20230805230621238](https://gitlab.com/apzs/image/-/raw/master/image/image-20230805230621238.png)

## 四、生命周期

### 1.  简介

组件从创建到销毁，会经过一些特定的阶段。React组件中包含一系列钩子函数{生命周期回调函数}，会在特定的时刻调用。我们在定义组件的时候，会在特定的声明周期回调函数中，做特定的工作。

在 React 中为我们提供了一些生命周期钩子函数，让我们能在 React 执行的重要阶段，在钩子函数中做一些事情。那么在 React 的生命周期中，有哪些钩子函数呢，我们来总结一下

#### react生命周期(旧)

**1. 初始化阶段: 由ReactDOM.render()触发---初次渲染**

| 序号 |     生命周期函数     | 说明                                                         |
| :--: | :------------------: | ------------------------------------------------------------ |
|  1   |    constructor()     | 构造器                                                       |
|  2   | componentWillMount() | 将要调用render方法将组件挂载组件到页面                       |
|  3   |       render()       | 挂载组件到页面                                               |
|  4   | componentDidMount()  | 挂载组件到页面完成后。一般在这个钩子中做一些初始化的事。<br/>例如：开启定时器、发送网络请求、订阅消息 |

**2. 更新阶段: 由组件内部this.setSate()或父组件render触发**

| 序号 |        生命周期函数         | 说明                                                         |
| :--: | :-------------------------: | ------------------------------------------------------------ |
|  1   | componentWillReceiveProps() | 父组件重新渲染，即使 props 没有更改，也会调用此方法（父组件挂载不会调用） |
|  2   |   shouldComponentUpdate()   | 调用`this.setSate()`触发，判断是否应该更新组件，返回`true`或`false` |
|  3   |    componentWillUpdate()    | 组件将要更新 （调用`this.setSate()`并且`shouldComponentUpdate()`<br/>返回true，或者调用`forceUpdate()`强制更新） |
|  4   |          render()           | 更新组件                                                     |
|  5   |    componentDidUpdate()     | 组件更新完毕。可以将某些值恢复到更新前的状态，比如滚动条     |

**3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发**

| 序号 |      生命周期函数      | 说明                                                         |
| :--: | :--------------------: | ------------------------------------------------------------ |
|  1   | componentWillUnmount() | 组将将要被卸载：一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息 |

![react生命周期(旧)](https://gitlab.com/apzs/image/-/raw/master/image/eca620dfbbcdc3325be4a1f167f9a4ca2a0dfb7a.png)

在最新的react版本中，有些生命周期钩子被抛弃了，具体函数如下：

- `componentWillMount`
- `componentWillReceiveProps`
- `componentWillUpdate`

这些生命周期方法经常被误解和滥用；此外，我们预计，在异步渲染中，它们潜在的误用问题可能更大。我们将在即将发布的版本中为这些生命周期添加 “UNSAFE_” 前缀。（这里的 “unsafe” 不是指安全性，而是表示使用这些生命周期的代码在 React 的未来版本中更有可能出现 bug，尤其是在启用异步渲染之后。）

由此可见，新版本中并不推荐持有这三个函数，取而代之的是带有UNSAFE_ 前缀的三个函数，比如: UNSAFE_componentWillMount。即便如此，其实React官方还是不推荐大家去使用，在以后版本中有可能会去除这几个函数。

#### react生命周期(新)

**1. 初始化阶段: 由ReactDOM.render()触发一次渲染**

| 序号 |        生命周期函数        | 说明                                                         |
| :--: | :------------------------: | ------------------------------------------------------------ |
|  1   |       constructor()        | 构造器                                                       |
|  2   | getDerivedStateFromProps() | 接收`props`和`state`两个参数，返回值将作为`state`。<br/>使用后只能通过这个函数修改`state`。（setState将无效，很少使用） |
|  3   |          render()          | 挂载组件到页面                                               |
|  4   |    componentDidMount()     | 挂载组件到页面完成后。一般在这个钩子中做一些初始化的事。<br/>例如：开启定时器、发送网络请求、订阅消息 |

**2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发**

| 序号 |        生命周期函数        | 说明                                                         |
| :--: | :------------------------: | ------------------------------------------------------------ |
|  1   | getDerivedStateFromProps() | 接收`props`和`state`两个参数，返回值将作为`state`。<br/>使用后只能通过这个函数修改`state`。（很少使用） |
|  2   |  shouldComponentUpdate()   | 调用 `this.setSate()`触发，判断是否应该更新组件，返回`true`或`false`。<br/>使用`forceUpdate()`可以强制更新，不经过此函数的判断。 |
|  3   |          render()          | 更新组件                                                     |
|  4   | getSnapshotBeforeUpdate()  | 获取快照（可以在此函数里获取更新DOM和refs之前的信息）        |
|  5   |    componentDidUpdate()    | 组件更新完毕。可以将某些值恢复到更新前的状态，比如滚动条     |

**3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发**

| 序号 |      生命周期函数      | 说明                                                         |
| :--: | :--------------------: | ------------------------------------------------------------ |
|  1   | componentWillUnmount() | 组将将要被卸载：一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息 |

![image-20221023222949399](https://gitlab.com/apzs/image/-/raw/master/image/1ad3acfd13159cfdc364a487dfc4335f7a9a1a06.png)

### 2. 初始化阶段（旧）

#### 2.1 constructor

**数据的初始化。**

接收props和context，当想在函数内使用这两个参数需要在super传入参数，当使用constructor时必须使用super，否则可能会有this的指向问题，如果不初始化state或者不进行方法绑定，则可以不为组件实现构造函数；

避免将 props 的值复制给 state！这是一个常见的错误：

```js
class Demo extends React.Component {
  constructor(props) {
    super(props);
    // 不要这样做
    // this.state = { color: props.color };
  }
}
```

如此做毫无必要（可以直接使用 this.props.color），同时还产生了 bug（更新 prop 中的 color 时，并不会影响 state）。

现在我们通常不会使用 `constructor` 属性，而是改用类加箭头函数的方法，来替代 `constructor`

例如，我们可以这样初始化 `state`

```js
class Demo extends React.Component {
  state = { count: 0 };
}
```

#### 2.2 componentWillMount（即将废弃）

**该方法只在挂载的时候调用一次，表示组件将要被挂载，并且在 `render` 方法之前调用。**

> 如果存在 `getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate` 就不会执行生命周期`componentWillMount`。

​    在服务端渲染唯一会调用的函数，代表已经初始化数据但是没有渲染dom，因此在此方法中同步调用 `setState()` 不会触发额外渲染。

**这个方法在 React 18版本中将要被废弃，官方解释是在 React 异步机制下，如果滥用这个钩子可能会有 Bug**

#### 2.4 render

**class组件中唯一必须实现的方法。**

> render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。

> 注意：避免在 `render` 中使用 `setState` ，否则会死循环

当render被调用时，他会检查this.props.和this.state的变化并返回以下类型之一：

1. 通过jsx创建的react元素
2. 数组或者fragments：使得render可以返回多个元素
3. Portals:可以渲染子节点到不同的dom树上
4. 字符串或数值类型：他们在dom中会被渲染为文本节点
5. 布尔类型或者null：什么都不渲染

#### 2.5 componentDidMount（常用）

**在组件挂在后（插入到dom树中）后立即调用**

`componentDidMount` 的执行意味着初始化挂载操作已经基本完成，它主要用于组件挂载完成后做某些操作

这个挂载完成指的是：组件插入 DOM tree

 可以在这里调用Ajax请求，返回的数据可以通过setState使组件重新渲染，或者添加订阅，但是要在conponentWillUnmount中取消订阅

#### 2.6 初始化阶段总结

执行顺序： `constructor` ->  `componentWillMount` -> `render` -> `componentDidMount`

```jsx
<script type="text/babel">
  class Count extends React.Component {
    // 构造器
    constructor(props) {
      console.log('Count-constructor');
      super(props)
      this.state = { count: 0 }
    }
    // 将值加一
    add = () => {
      const { count } = this.state
      this.setState({ count: count + 1 })
    }
    // 卸载组件
    death = () => {
      // 调用 ReactDOM的unmountComponentAtNode()方法卸载组件
      ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }
    // ===============================初始化阶段执行顺序===================================
    
    // 1、constructor() 构造器
    
    // 2、组件将要挂载的钩子
    componentWillMount() {
      console.log('Count-componentWillMount');
    }

    // 3、调用render()方法，将组件挂载到页面
 
    // 4、组件挂载完毕的钩子
    componentDidMount() {
      console.log('Count-componentDidMount');
    }
    // 组件将要卸载的钩子
    componentWillUnmount(){
      console.log('Count-componentWillUnmount');
    }
    render() {
      console.log('Count-render');
      const { count } = this.state
      return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={this.add}>点我+1</button>
          <button onClick={this.death}>卸载组件</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  ReactDOM.render(<Count />, document.getElementById('test'))
</script>
```

![image-20230716203124548](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716203124548.png)

### 3. 初始化阶段（新）

#### 2.1 constructor（不变）

#### 2.3 static getDerivedStateFromProps（新钩子）

**从props获取state。**

替代了`componentWillReceiveProps`此方法适用于[罕见的用例](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state)，即 state 的值在任何时候都取决于 props。

这个是 React 新版本中新增的2个钩子之一，很少使用。

1. 首先，该函数会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用；

2. 该函数必须是静态的；

3. 给组件传递的数据（props）以及组件状态（state），会作为参数到这个函数中；

4. 该函数也必须有返回值，返回一个Null或者state对象。因为初始化和后续更新都会执行这个方法，因此在这个方法返回state对象，就相当于将原来的state进行了覆盖，所以倒是修改状态不起作用。

> 注意：`state` 的值在任何时候都取决于传入的 `props` ，不会再改变

如下

```js
static getDerivedStateFromProps(props, state) {
    return null											
}
ReactDOM.render(<Count count="109"/>,document.querySelector('.test'))
```

`count` 的值不会改变，一直是 109

> [React的生命周期 - 简书](https://www.jianshu.com/p/b331d0e4b398)
>
> 老版本中的componentWillReceiveProps()方法判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数。
>
> 这两者最大的不同就是:
> 在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。
>
> 1. 在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。
> 2. 而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

#### 2.4 render（不变）

#### 2.5 componentDidMount（不变）

#### 初始化阶段总结

执行顺序： `constructor` -> `static getDerivedStateFromProps`  -> `render` -> `componentDidMount`

```jsx
<script type="text/babel">
  class Count extends React.Component {
    // 构造器
    constructor(props) {
      console.log('Count-constructor');
      super(props)
      this.state = { count: 0 }
    }
    // 将值加一
    add = () => {
      const { count } = this.state
      this.setState({ count: count + 1 })
    }
    // 强制更新
    force = () => {
      this.forceUpdate()
    }
    // 卸载组件
    death = () => {
      // 调用 ReactDOM的unmountComponentAtNode()方法卸载组件
      ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }
    
    // ===============================初始化阶段执行顺序===================================
    
    // 1、constructor() 构造器
    
    // 2、自己实现返回的state
    // 适用场景：比如props和state都传了一个count，我们可以决定使用哪一个count
    // 注意：必须要写static表示通过类调用而不是对象。写了这个方法并指定返回值后，setState等方法会失效，以我们返回的state值为准（基本上不会使用该方法）
    // 比如如下代码从props得到一个派生状态，此时state的值在任何时候都取决于props
    //（即我们点击`点我+1`则state不会加一，而是以我们这个方法返回的props为准，我们必须手动在getDerivedStateFromProps方法里实现+1的逻辑）
    static getDerivedStateFromProps(props,state){
      console.log("Count-getDerivedStateFromProps",props,state);
      // 必须返回一个state对象或null（返回null将不影响其他功能）
      return props
    }

    // 3、调用render()方法，将组件挂载到页面
 
    // 4、组件挂载完毕的钩子
    componentDidMount() {
      console.log('Count-componentDidMount');
    }
    // 组件将要卸载的钩子
    componentWillUnmount(){
      console.log('Count-componentWillUnmount');
    }
        
    render() {
      console.log('Count-render');
      const { count } = this.state
      return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={this.add}>点我+1</button>
          <button onClick={this.death}>卸载组件</button>
          <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  ReactDOM.render(<Count count={199}/>, document.getElementById('test'))
</script>
```

### 4. 更新阶段(旧)

#### 3.1 componentWillReceiveProps (即将废弃)

**在已挂载的组件接收新的props之前调用。**

通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件，可以在此方法中使用this.setState改变state。

```js
componentWillReceiveProps (nextProps) {
    nextProps.openNotice !== this.props.openNotice&&this.setState({
        openNotice:nextProps.openNotice
    }，() => {
      console.log(this.state.openNotice:nextProps)
      //将state更新为nextProps,在setState的第二个参数（回调）可以打         印出新的state
    })
}
```

> 请注意，如果父组件导致组件重新渲染，即使 props 没有更改，也会调用此方法。如果只想处理更改，请确保进行当前值与变更值的比较。
>
> React 不会针对初始 props 调用 UNSAFE_componentWillReceiveProps()。组件只会在组件的 props 更新时调用此方法。调用 this.setState() 通常不会触发该生命周期。



> 组件第一次挂载时接收到的props不会触发componentWillReceiveProps ，只有父组件改变props后才触发componentWillReceiveProps

```jsx
<script type="text/babel">
  class A extends React.Component {
    state = { carName: '奔驰' }
    changeCar = () => {
      this.setState({ carName: '奥拓' })
    }
    render() {
      return (
        <div>
          <div>我是A组件</div>
          <button onClick={this.changeCar}>换车</button>
          <B carName={this.state.carName} />
        </div>
      )
    }
  }
  class B extends React.Component {
    // 组件将要接收新的props的钩子
    componentWillReceiveProps(props) {
      console.log('B---componentWillReceiveProps', props)
    }
    // 控制组件更新的“阀门”
    shouldComponentUpdate() {
      console.log('B---shouldComponentUpdate')
      return true
    }
    // 组件将要更新的钩子
    componentWillUpdate() {
      console.log('B---componentWillUpdate')
    }
    // 组件更新完毕的钩子
    componentDidUpdate() {
      console.log('B---componentDidUpdate')
    }
      render(){
        console.log('B---render');
        return (
          <div>我是B组件，接收到的车是:{this.props.carName}</div>
        )
      }
    }
//渲染组件到页面
ReactDOM.render(<A />, document.getElementById('test'))
</script>
```

![image-20230716213708943](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716213708943.png)

#### 3.2 shouldComponentUpdate

在渲染之前被调用，默认返回为true。

> 如果不写则默认返回true，如果写则必须给个布尔类型的返回值，如果返回值为`true`则继续向下执行更新的生命周期，如果为`false`则下面的步骤就不走了

​    返回值是判断组件的输出是否受当前state或props更改的影响，默认每次state发生变化都重新渲染，首次渲染或使用forceUpdate(使用`this.forceUpdate()`)时不被调用。

> 他主要用于性能优化，会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。不建议深层比较，会影响性能。如果返回false，则不会调用componentWillUpdate、render和componentDidUpdate

- 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新，但是不建议，建议使用 PureComponent 
- 因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断

#### 3.3 componentWillUpdate (即将废弃)

**当组件接收到新的props和state会在渲染前调用，初始渲染不会调用该方法。**

​    shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate，不能在这使用setState，在函数返回之前不能执行任何其他更新组件的操作

> 此方法可以替换为 `componentDidUpdate()`。如果你在此方法中读取 DOM 信息（例如，为了保存滚动位置），则可以将此逻辑移至 `getSnapshotBeforeUpdate()` 中。

#### 3.4 render

#### 3.6 componentDidUpdate

**组件在更新完毕后会立即被调用，首次渲染不会调用**

可以在该方法调用setState，但是要包含在条件语句中，否则一直更新会造成死循环。

当组件更新后，可以在此处对 DOM 进行操作。如果对更新前后的props进行了比较，可以进行网络请求。（当 props 未发生变化时，则不会执行网络请求）。

```javascript
componentDidUpdate(prevProps,prevState,snapshotValue) {
  // 典型用法（不要忘记比较 props）：
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

> 如果组件实现了 `getSnapshotBeforeUpdate()` 生命周期（不常用），则它的返回值将作为 `componentDidUpdate()` 的第三个参数 “snapshotValue” 参数传递。否则此参数将为 undefined。如果返回false就不会调用这个函数。

#### 更新阶段总结

执行顺序：`componentWillReceiveProps` -> `shouldComponentUpdate` -> `componentWillUpdate`  -> `render`  -> `componentDidUpdate`

```jsx
<script type="text/babel">
  class Count extends React.Component {
    // 构造器
    constructor(props) {
      console.log('Count-constructor');
      super(props)
      this.state = { count: 0 }
    }
    // 将值加一
    add = () => {
      const { count } = this.state
      this.setState({ count: count + 1 })
    }
    // 强制更新
    force = () => {
      this.forceUpdate()
    }
    // 卸载组件
    death = () => {
      ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    // ===============================更新阶段执行顺序===================================

    // 1、componentWillReceiveProps（参见上面3.1的例子）

    // 2、控制组件更新的“阀门”
    // 调用 `this.setSate()`触发，判断是否应该更新组件。使用`forceUpdate()`可以强制更新，不经过此函数的判断。
    shouldComponentUpdate(){
      console.log('Count-shouldComponentUpdate');
      return true
    }
    // 3、组件将要更新的钩子
    componentWillUpdate(){
      console.log('Count-componentWillUpdate');
    }

    // 4、调用render()方法，更新组件

    // 5、组件更新完毕的钩子
    componentDidUpdate(){
      console.log('Count-componentDidUpdate');
    }

    // 组件将要卸载的钩子
    componentWillUnmount(){
      console.log('Count-componentWillUnmount');
    }

    render() {
      console.log('Count-render');
      const { count } = this.state
      return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={this.add}>点我+1</button>
          <button onClick={this.death}>卸载组件</button>
          <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  ReactDOM.render(<Count />, document.getElementById('test'))
</script>
```

点击`点我+1`触发的事件：

![image-20230716205227100](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716205227100.png)

点击`不更改任何状态中的数据，强制更新一下`触发的更新

![image-20230716211536227](https://gitlab.com/apzs/image/-/raw/master/image/image-20230716211536227.png)

### 更新阶段（新）

#### 3.1 static getDerivedStateFromProps

若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps。（返回值将作为`state`，使用后setState将无效，返回null则不会影响setState的功能，很少使用）

```jsx
static getDerivedStateFromProps(props,state){
	console.log('getDerivedStateFromProps',props,state);
	return null
}
```

#### 3.2 shouldComponentUpdate

#### 3.4 render

#### 3.5 getSnapshotBeforeUpdate（新钩子）

**在最近一次的渲染输出之前被提交之前调用，也就是即将挂载时调用，替换componetnWillUpdate。**

相当于淘宝购物的快照，会保留下单前的商品内容，在 React 中就相当于是 即将更新前的状态

它可以使组件在 DOM 真正更新之前捕获一些信息（例如滚动位置），此生命周期返回的任何值都会作为参数传递给 `componentDidUpdate()`。如不需要传递任何值，那么请返回 null

> 和componentWillUpdate的区别
>
> - 在 React 开启异步渲染模式后，在 render 阶段读取到的 DOM 元素状态并不总是和 commit 阶段相同，这就导致在componentDidUpdate 中使用 componentWillUpdate 中读取到的 DOM 元素状态是不安全的，因为这时的值很有可能已经失效了。
> - getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。

**适用场景**

在一个区域内，定时的输出以行话，如果内容大小超过了区域大小，就出现滚动条，但是内容不进行移动 

![BeforeGender](https://gitlab.com/apzs/image/-/raw/master/image/0ce6f820adb5b75e44b1df2332caa58bb8eaa257.gif)

如上面的动图：区域内部的内容展现没有变化，但是可以看见滚动条在变化，也就是说上面依旧有内容在输出，只不过不在这个区域内部展现。

1.首先我们先实现定时输出内容

我们可以使用state状态，改变新闻后面的值，但是为了同时显示这些内容，我们应该为state的属性定义一个数组。并在创建组件之后开启一个定时器，不断的进行更新state。更新渲染组件

```jsx
 class New extends React.Component{

        state = {num:[]};

        //在组件创建之后,开启一个定时任务
        componentDidMount(){
            setInterval(()=>{
                let {num} = this.state;
                const news = (num.length+1);
                this.setState({num:[news,...num]});
            },2000);
        }

        render(){
            return (
                <div ref = "list" className = "list">{
                    this.state.num.map((n,index)=>{
                    return <div className="news" key={index} >新闻{n}</div>
                    })
                }</div>
            )
        }
  }
  ReactDOM.render(<New />,document.getElementById("div"));
```

2.接下来就是控制滚动条了

我们在组件渲染到DOM之前获取组件的高度，然后用组件渲染之后的高度减去之前的高度就是一条新的内容的高度，这样在不断的累加到滚动条位置上。

````js
getSnapshotBeforeUpdate(){
	return this.refs.list.scrollHeight;
}

componentDidUpdate(preProps,preState,height){
	this.refs.list.scrollTop += (this.refs.list.scrollHeight - height);
}
````

这样就实现了这个功能。

完整代码：

```jsx
<script type="text/babel">
  class NewsList extends React.Component {
    state = {newsArr:[]}
    componentDidMount(){
      setInterval(()=>{
        const {newsArr} = this.state
        const news = '新闻' + (newsArr.length+1)
        // 更新状态
        this.setState({newsArr:[news,...newsArr]})
      },1000)
    }
    getSnapshotBeforeUpdate(){
      // 返回总高度（滚动条从头滚到尾加起来的高度）
      return this.refs.list.scrollHeight
    }
    componentDidUpdate(preProps,preState,height){
      // 滚动条的位置 = 更新之前滚动条的位置+新增加的高度（也就是一条数据的高度）
      // 一条数据的高度 = 现在的总高度 - 更新之前的总高度
      this.refs.list.scrollTop += this.refs.list.scrollHeight - height
    }
    render() {
      return (
        <div className="list" ref="list">
          {
            this.state.newsArr.map((n,index)=>{
              return <div className="news" key={index}>{n}</div>
            })
          }
        </div>
      )
    }
  }
  ReactDOM.render(<NewsList />, document.getElementById('test'))
</script>
```

#### 3.6 componentDidUpdate

#### 更新阶段总结

执行顺序：`getDerivedStateFromProps` -> `shouldComponentUpdate` -> `render`  -> `getSnapshotBeforeUpdate` -> `componentDidUpdate`

```jsx
<script type="text/babel">
  class Count extends React.Component {
    // 构造器
    constructor(props) {
      console.log('Count-constructor');
      super(props)
      this.state = { count: 0 }
    }
    // 将值加一
    add = () => {
      const { count } = this.state
      this.setState({ count: count + 1 })
    }
    // 强制更新
    force = () => {
      this.forceUpdate()
    }
    // 卸载组件
    death = () => {
      ReactDOM.unmountComponentAtNode(document.getElementById('test'))
    }

    // ===============================更新阶段执行顺序===================================
    
    // 1、自己实现返回的state
    // 适用场景：比如props和state都传了一个count，我们可以决定使用哪一个count
    // 注意：必须要写static表示通过类调用而不是对象。写了这个方法并指定返回值后，setState等方法会失效，以我们返回的state值为准（基本上不会使用该方法）
    // 比如如下代码从props得到一个派生状态，此时state的值在任何时候都取决于props
    //（即我们点击`点我+1`则state不会加一，而是以我们这个方法返回的props为准，我们必须手动在getDerivedStateFromProps方法里实现+1的逻辑）
    static getDerivedStateFromProps(props,state){
      console.log("Count-getDerivedStateFromProps",props,state);
      // 必须返回一个state对象或null
      return null
    }
    // 2、控制组件更新的“阀门”
    shouldComponentUpdate(){
      console.log('Count-shouldComponentUpdate')
      return true
    }

    // 3、调用render()方法，更新组件

    // 4、在更新之前获取快照
    // 在更新之前返回一个快照，可以返回一个滚动条等，方便componentDidUpdate获取到这些信息
    //（比如：在更新之前获取滚动条的位置，在更新之后将滚动条设置到更新之前的位置）
    getSnapshotBeforeUpdate(){
      console.log('Count-getSnapshotBeforeUpdate');
      return 'atguigu'
    }
    // 5、组件挂载完毕的钩子
    componentDidMount() {
      console.log('Count-componentDidMount')
    }
    // 组件将要卸载的钩子
    componentWillUnmount(){
      console.log('Count-componentWillUnmount')
    }

    render() {
      console.log('Count-render');
      const { count } = this.state
      return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={this.add}>点我+1</button>
          <button onClick={this.death}>卸载组件</button>
          <button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  ReactDOM.render(<Count count={199}/>, document.getElementById('test'))
</script>
```

![image-20230717140138625](https://gitlab.com/apzs/image/-/raw/master/image/image-20230717140138625.png)

### 5.卸载组件

**当组件从 DOM中移除时会调用如下方法**

#### 4.1 componentWillUnmount（常用）

**在组件卸载和销毁之前调用**

在这执行必要的清理操作，例如，清除timer（setTimeout,setInterval），取消网络请求，或者取消在componentDidMount的订阅，移除所有监听

> 使用如下方式可以卸载组件
>
> ```jsx
> ReactDOM.unmountComponentAtNode(document.getElementById('test'))
> ```

有时候我们会碰到这个warning:

```js
Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a   no-op. Please check the code for the undefined component.
```

原因：因为你在组件中的ajax请求返回setState,而你组件销毁的时候，请求还未完成，因此会报warning

解决方法：

```javascript
componentDidMount() {
    this.isMount === true
    axios.post().then((res) => {
    this.isMount && this.setState({   // 增加条件ismount为true时才更新state数据
      aaa:res
    })
})
}
componentWillUnmount() {
    this.isMount === false
}
```

`componentWillUnmount()` 中不应调用 `setState()`，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

完整代码：

```jsx
<script type="text/babel">
  //创建组件
  class Count extends React.Component {
    state = { count: 0 }
    //卸载组件按钮的回调
    death = () => {
      // ReactDOM.unmountComponentAtNode(document.getElementById('test'))
      root.unmount()
    }

    // 组件将要卸载的钩子
    componentWillUnmount() {
      console.log('Count-componentWillUnmount')
    }

    render() {
      const { count } = this.state
      return (
        <div>
          <h2>当前求和为：{count}</h2>
          <button onClick={this.death}>卸载组件</button>
        </div>
      )
    }
  }

  //渲染组件
  // ReactDOM.render(<Count />, document.getElementById('test'))
  const root = ReactDOM.createRoot(document.getElementById('test'))
  root.render(<Count />)
</script>
```

### 6、完整生命周期（旧）

```jsx
<script type="text/babel">
	//创建组件
	class Count extends React.Component{

		//构造器
		constructor(props){
			console.log('Count---constructor');
			super(props)
			//初始化状态
			this.state = {count:0}
		}

		//加1按钮的回调
		add = ()=>{
			//获取原状态
			const {count} = this.state
			//更新状态
			this.setState({count:count+1})
		}

		//卸载组件按钮的回调
		death = ()=>{
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}

		//强制更新按钮的回调
		force = ()=>{
			this.forceUpdate()
		}

		//组件将要挂载的钩子
		componentWillMount(){
			console.log('Count---componentWillMount');
		}

		//组件挂载完毕的钩子
		componentDidMount(){
			console.log('Count---componentDidMount');
		}

		//组件将要卸载的钩子
		componentWillUnmount(){
			console.log('Count---componentWillUnmount');
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('Count---shouldComponentUpdate');
			return true
		}

		//组件将要更新的钩子
		componentWillUpdate(){
			console.log('Count---componentWillUpdate');
		}

		//组件更新完毕的钩子
		componentDidUpdate(){
			console.log('Count---componentDidUpdate');
		}

		render(){
			console.log('Count---render');
			const {count} = this.state
			return(
				<div>
					<h2>当前求和为：{count}</h2>
					<button onClick={this.add}>点我+1</button>
					<button onClick={this.death}>卸载组件</button>
					<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
				</div>
			)
		}
	}
	
	//父组件A
	class A extends React.Component{
		//初始化状态
		state = {carName:'奔驰'}

		changeCar = ()=>{
			this.setState({carName:'奥拓'})
		}

		render(){
			return(
				<div>
					<div>我是A组件</div>
					<button onClick={this.changeCar}>换车</button>
					<B carName={this.state.carName}/>
				</div>
			)
		}
	}
	
	//子组件B
	class B extends React.Component{
		//组件将要接收新的props的钩子
		componentWillReceiveProps(props){
			console.log('B---componentWillReceiveProps',props);
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('B---shouldComponentUpdate');
			return true
		}
		//组件将要更新的钩子
		componentWillUpdate(){
			console.log('B---componentWillUpdate');
		}

		//组件更新完毕的钩子
		componentDidUpdate(){
			console.log('B---componentDidUpdate');
		}

		render(){
			console.log('B---render');
			return(
				<div>我是B组件，接收到的车是:{this.props.carName}</div>
			)
		}
	}
	
	//渲染组件
	ReactDOM.render(<Count/>,document.getElementById('test'))
    ReactDOM.render(<A/>,document.getElementById('test2'))
</script>
```

### 7、完整生命周期（新）

```jsx
<script type="text/babel">
	//创建组件
	class Count extends React.Component{
		//构造器
		constructor(props){
			console.log('Count---constructor');
			super(props)
			//初始化状态
			this.state = {count:0}
		}

		//加1按钮的回调
		add = ()=>{
			//获取原状态
			const {count} = this.state
			//更新状态
			this.setState({count:count+1})
		}

		//卸载组件按钮的回调
		death = ()=>{
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}

		//强制更新按钮的回调
		force = ()=>{
			this.forceUpdate()
		}
		
		//若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
		static getDerivedStateFromProps(props,state){
			console.log('getDerivedStateFromProps',props,state);
			return null
		}

		//在更新之前获取快照
		getSnapshotBeforeUpdate(){
			console.log('getSnapshotBeforeUpdate');
			return 'atguigu'
		}

		//组件挂载完毕的钩子
		componentDidMount(){
			console.log('Count---componentDidMount');
		}

		//组件将要卸载的钩子
		componentWillUnmount(){
			console.log('Count---componentWillUnmount');
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('Count---shouldComponentUpdate');
			return true
		}

		//组件更新完毕的钩子
		componentDidUpdate(preProps,preState,snapshotValue){
			console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
		}
		
		render(){
			console.log('Count---render');
			const {count} = this.state
			return(
				<div>
					<h2>当前求和为：{count}</h2>
					<button onClick={this.add}>点我+1</button>
					<button onClick={this.death}>卸载组件</button>
					<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
				</div>
			)
		}
	}
	
	//渲染组件
	ReactDOM.render(<Count count={199}/>,document.getElementById('test'))
</script>
```

## 五、条件渲染 & 列表 & Key & diff算法

### 1. 条件渲染

在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。

#### 1.1 条件判断语句

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) 或者[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

- 适合逻辑较多的情况

```jsx
//1. 第一种方法，声明函数返回dom
<script type="text/babel">
  class Demo extends React.Component {
    state = { type: 1 }

    render() {
      return <div>{this.showMsg()}</div>;
    }

    showMsg = () => {
      let type = this.state.type
      if (type === 1) {
        return (<h2>第一种写法：type值等于1</h2>)
      } else {
        return (<h2 className="other">第一种写法：type值不等于1</h2>)
      }
    }

  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo />);
</script>
```

![image-20230806151056415](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806151056415.png)

页面展示：

```jsx
<script type="text/babel">
  class Demo extends React.Component {
    state = { isLogin: true }

    render() {
      let welcome = ''
      let btnText = ''
      if (this.state.isLogin) {
        welcome = '欢迎回来'
        btnText = '退出'
      } else {
        welcome = '请先登录~'
        btnText = '登录'
      }

      return (
        <div>
          <h2>{welcome}</h2>
          <button>{btnText}</button>
        </div>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo />);
</script>
```

![image-20230806151257788](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806151257788.png)

#### 1.2 三目运算符

另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)。

- 适合逻辑比较简单

````jsx
<script type="text/babel">
  class Demo extends React.Component {
    state = { type: 1 }

    render() {
      const { type } = this.state
      return (
        <div>
          {
            //3. 第三种方法，利用三目运算符渲染需要渲染的变量
            type === 1 ? (<h2>第二种写法：type值等于1</h2>) : (<h2 className="other">第三种写法：type值不等于1</h2>)
          }
        </div>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo />);
</script>
````

![image-20230806151559512](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806151559512.png)

#### 1.3 与运算符&&

通过花括号包裹代码，你可以[在 JSX 中嵌入表达式](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。这也包括 JavaScript 中的逻辑与 (&&) 运算符。它可以很方便地进行元素的条件渲染：

- 适合如果条件成立，渲染某一个组件；如果条件不成立，什么内容也不渲染；

````jsx
<script type="text/babel">
  class Demo extends React.Component {
    state = { type: 1 }

    render() {
      const { type } = this.state
      return (
        <div>
          {type === 1 && <h2>第三种写法：type值等于1</h2>}
          {type !== 1 && <h2 className="other">第三种写法：type值不等于1</h2>}
        </div>
      )
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo />);
</script>
````

![image-20230806151957194](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806151957194.png)

之所以能这样做，是因为在 JavaScript 中，`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。

因此，如果条件是 `true`，`&&` 右侧的元素就会被渲染，如果是 `false`，React 会忽略并跳过它。

请注意，[falsy 表达式](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) 会使 `&&` 后面的元素被跳过，但会返回 falsy 表达式的值。在下面示例中，render 方法的返回值是 `<div>0</div>`。

```jsx
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

#### 1.4 元素变量

你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。

```jsx
<script type="text/babel">
  class Demo extends React.Component {
    state = { type: 1 }

    render() {
      const { type } = this.state
      //2. 第二种方法 声明变量 给变量赋值
      let test = null
      if (type === 1) {
        test = <h2>第四种写法：type值等于1</h2>
      } else {
        test = <h2 className="other">第四种写法：type值不等于1</h2>
      }
      return <div>{test}</div>
    }
  }
  //渲染组件到页面
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Demo />);
</script>
```

![image-20230806152056415](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806152056415.png)

声明一个变量并使用 `if` 语句进行条件渲染是不错的方式，但有时你可能会想使用更为简洁的语法，那就是内联条件渲染的方法与运算和三目运算符

#### 1.5 阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 `render` 方法直接返回 `null`，而不进行任何渲染。

下面的示例中，`<WarningBanner />` 会根据 prop 中 `warn` 的值来进行条件渲染。如果 `warn` 的值是 `false`，那么组件则不会渲染:

````jsx
<script type="text/babel">
  function WarningBanner(props) {
    // 如果没有警告返回null
    if (!props.warn) {
      return null;
    }
    // 如果有警告返回 <div className="warning">Warning!</div>
    return <div className="warning">Warning!</div>
  }

  class Page extends React.Component {
    state = { showWarning: true }

    handleToggleClick = () => {
      this.setState(state => ({showWarning: !state.showWarning}));
    }

    render() {
      return (
        <div>
          <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
          <WarningBanner warn={this.state.showWarning} />
        </div>
      );
    }
  }

  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<Page />);
</script>
````

初始情况：

![image-20230806153211888](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806153211888.png)

点击`Hide`后：

![image-20230806153221734](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806153221734.png)

点击`Show`后：

![image-20230806153250205](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806153250205.png)

在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。

### 2. 列表

首先，让我们看下在 Javascript 中如何转化列表。

如下代码，我们使用 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 函数让数组中的每一项变双倍，然后我们得到了一个新的列表 `doubled` 并打印出来：

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

代码打印出 `[2, 4, 6, 8, 10]`。

在 React 中，把数组转化为[元素](https://zh-hans.reactjs.org/docs/rendering-elements.html)列表的过程是相似的。

#### 2.1 渲染多个组件

你可以通过使用 `{}` 在 JSX 内构建一个[元素集合](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。

下面，我们使用 Javascript 中的 [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 方法来遍历 `numbers` 数组。将数组中的每个元素变成 `<li>` 标签，最后我们将得到的数组赋值给 `listItems`：

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>  <li>{number}</li>);
```

然后，我们可以将整个 `listItems` 插入到 `<ul>` 元素中：

```jsx
<ul>{listItems}</ul>
```

完整代码：

````jsx
<script type="text/babel">
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((numbers) =>
    <li>{numbers}</li>
  );

  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<ul>{listItems}</ul>);
</script>
````

这段代码生成了一个 1 到 5 的项目符号列表。

![image-20230806222903272](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806222903272.png)

#### 2.2 基础列表组件

通常你需要在一个[组件](https://zh-hans.reactjs.org/docs/components-and-props.html)中渲染列表。

我们可以把前面的例子重构成一个组件，这个组件接收 `numbers` 数组作为参数并输出一个元素列表。

```jsx
<script type="text/babel">
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  const numbers = [1, 2, 3, 4, 5];
  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<NumberList numbers={numbers} />);
</script>
```

![image-20230806223304340](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806223304340.png)

当我们运行这段代码，将会看到一个警告 `a key should be provided for list items`，意思是当你创建一个元素时，必须包括一个特殊的 `key` 属性。我们将在下一节diff算法中讨论这是为什么。

让我们来给每个列表元素分配一个 `key` 属性来解决上面的那个警告：

```jsx
<script type="text/babel">
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  const numbers = [1, 2, 3, 4, 5];

  const root = ReactDOM.createRoot(document.getElementById('test'));
  root.render(<NumberList numbers={numbers} />);
</script>
```

![image-20230806223403246](https://gitlab.com/apzs/image/-/raw/master/image/image-20230806223403246.png)

### 3. key

#### 3.1 基本使用

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key：

```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：

```jsx
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为 key 的负面影响](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)这一篇文章。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

要是你有兴趣了解更多的话，这里有一篇文章[深入解析为什么 key 是必须的](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)可以参考。

#### 3.2 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义。

比方说，如果你[提取](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components)出一个 `ListItem` 组件，你应该把 key 保留在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>` 元素上。

**例子：不正确的使用 key 的方式**

```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

**例子：正确的使用 key 的方式**

```jsx
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

一个好的经验法则是：在 `map()` 方法中的元素需要设置 key 属性。

#### 3.3 key 值在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('test'));
root.render(<Blog posts={posts} />);
```

key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值：

```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，`Post` 组件可以读出 `props.id`，但是不能读出 `props.key`。

#### 3.4 在 JSX 中嵌入 map()

在上面的例子中，我们声明了一个单独的 `listItems` 变量并将其包含在 JSX 中：

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX 允许在大括号中[嵌入任何表达式](https://zh-hans.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)，所以我们可以内联 `map()` 返回的结果：

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。但请记住，如果一个 `map()` 嵌套了太多层级，那可能就是你[提取组件](https://zh-hans.reactjs.org/docs/components-and-props.html#extracting-components)的一个好时机。

### 4.diff算法

#### 4.1 什么是虚拟 DOM ？

在谈 diff 算法之前，我们需要先了解虚拟 DOM 。它是一种编程概念，在这个概念里，以一种虚拟的表现形式被保存在内存中。在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，而是 JavaScript 对象

> 虚拟 DOM 只保留了真实 DOM 节点的一些**基本属性，和节点之间的层次关系**，它相当于建立在 JavaScript 和 DOM 之间的一层“缓存”

```html
<div class="hello">
    <span>hello world!</span>
</div>
```

上面的这段代码会转化可以转化为虚拟 DOM 结构

```js
{
    tag: "div",
    props: {
        class: "hello"
    },
    children: [{
        tag: "span",
        props: {},
        children: ["hello world!"]
    }]
}
```

其中对于一个节点必备的三个属性 `tag，props，children`

- tag 指定元素的**标签**类型，如“`li`，`div`”
- props 指定元素身上的属性，如 `class` ，`style`，自定义属性
- children 指定元素是否有**子节点**，参数以**数组**形式传入

而我们在 render 中编写的 JSX 代码就是一种虚拟 DOM 结构。

#### 4.2 diff 算法

每个组件中的每个标签都会有一个key,不过有的必须显示的指定，有的可以隐藏。

如果生成的render出来后就不会改变里面的内容，那么你不需要指定key（不指定key时，React也会生成一个默认的标识）,或者将index作为key，只要key不重复即可。

但是如果你的标签是动态的，是有可能刷新的，就必须显示的指定key。使用map进行遍历的时候就必须指定Key:

```jsx
this.state.num.map((n,index)=>{
	return <div className="news" key={index} >新闻{n}</div>
})
```

这个地方虽然显示的指定了key，但是**官网并不推荐使用Index作为Key去使用**；

这样会很有可能会有效率上的问题

举个例子：

在一个组件中，我们先创建了两个对象，通过循环的方式放入< li>标签中，此时key使用的是index。

```jsx
person:[
    {id:1,name:"张三",age:18},
    {id:2,name:"李四",age:19}
]

this.state.person.map((preson,index)=>{
  return  <li key = {index}>{preson.name}</li>
})
```

如下图展现在页面中：

![image-20221024225054061](https://gitlab.com/apzs/image/-/raw/master/image/ad5611b1f134b0a842dd2365db974714c98f6a9c.png)

此时，我们想在点击按钮之后动态的添加一个对象，并且放入到li标签中，在重新渲染到页面中。

我们通过修改State来控制对象的添加。

```jsx
<button onClick={this.addObject}>点击增加对象</button>
addObject = () =>{
    let {person} = this.state;
    const p = {id:(person.length+1),name:"王五",age:20};
    this.setState({person:[p,...person]});
}
```

如下动图所示：

![addObject](https://gitlab.com/apzs/image/-/raw/master/image/ff6d81e4297b4798020721e60df525a2036f796e.gif)

这样看，虽然完成了功能。但是其实存在效率上的问题， 我们先来看一下两个前后组件状态的变化：

![image-20221024225208300](https://gitlab.com/apzs/image/-/raw/master/image/21767b62ed6cd7f93b146dccdbe4b7007ab00c14.png)

我们发现，组件第一个变成了王五，张三和李四都移下去了。因为我们使用Index作为Key，这三个标签的key也就发生了改变【张三原本的key是0，现在变成了1，李四的key原本是1，现在变成了2，王五变成了0】

在组件更新状态重新渲染的时候，就出现了问题：

因为react是通过key来比较组件标签是否一致的，拿这个案例来说：

首先，状态更新导致组件标签更新，react根据Key，判断旧的虚拟DOM和新的虚拟DOM是否一致

key = 0 的时候 旧的虚拟DOM 内容是张三 新的虚拟DOM为王五 ，react认为内容改变，从而重新创建新的真实DOM.

key = 1 的时候 旧的虚拟DOM 内容是李四，新的虚拟DOM为张三，react认为内容改变，从而重新创建新的真实DOM

key = 2 的时候 旧的虚拟DOM没有，创建新的真实DOM

这样原本有两个虚拟DOM可以复用，但都没有进行复用，完完全全的都是新创建的；这就导致效率极大的降低。

其实这是因为我们将新创建的对象放在了首位，如果放在最后其实是没有问题的，但是因为官方并不推荐使用Index作为key值，我们推荐使用id作为key值。从而完全避免这样的情况。

#### 4.3 用index作为key可能会引发的问题

key不需要全局唯一，只需在当前列表中唯一即可。元素的key最好是固定的，这里直接举个反例，有些场景我们会使用元素的索引为key像这种：

```jsx
const students = ['孙悟空', '猪八戒', '沙和尚'];
const ele = <ul>{students.map((item, index) => <li key={index}>{item}</li>)}</ul>
```

上例中，我使用了元素的索引（index）作为key来使用，但这有什么用吗？没用！因为index是根据元素位置的改变而改变的，当我们在前边插入一个新元素时，所有元素的顺序都会一起改变，那么它和React中按顺序比较有什么区别吗？没有区别！而且还麻烦了，唯一的作用就是去除了警告。所以我们开发的时候偶尔也会使用索引作为key，但前提是元素的顺序不会发生变化，除此之外不要用索引做key。

1. 若对数据进行:逆序添加、逆序删除等破坏
   顺序操作:会产生没有必要的真实DOM更新 界面效果没问题,但效率低。

2. 如果结构中还包含输入类的DOM:会产生错误DOM更新 界面有问题。

3. 注意! 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

**开发如何选择key?**

最好使用每一条数据的唯一标识作为key 比如id，手机号，身份证号

如果确定只是简单的展示数据，用Index也是可以的

**而这个判断key的比较规则就是Diff算法**

Diff算法其实就是react生成的新虚拟DOM和以前的旧虚拟DOM的比较规则：

- 如果旧的虚拟DOM中找到了与新虚拟DOM相同的key:
  - 如果内容没有变化，就直接只用之前旧的真实DOM
  - 如果内容发生了变化，就生成新的真实DOM
- 如果旧的虚拟DOM中没有找到了与新虚拟DOM相同的key:
  - 根据数据创建新的真实的DOM,随后渲染到页面上

#### 4.4 李立超老师对于虚拟DOM的解释

当我们通过 React 操作DOM时，比如通过 `React.createElement()` 创建元素时。我们所创建的元素并不是真正的DOM对象而是React元素。这一点可以通过在控制台中打印对象来查看。React元素是React应用的最小组成部分，通过JSX也就是`React.createElement()`所创建的元素都属于React元素。与浏览器的 DOM 元素不同，React 元素就是一个普通的JS对象，且创建的开销极小。

React元素不是DOM对象，那为什么可以被添加到页面中去呢？实际上每个React元素都会有一个对应的DOM元素，对React元素的所有操作，最终都会转换为对DOM元素操作，也就是所谓的虚拟DOM。要理解虚拟DOM，我们需要先了解它的作用。虚拟DOM就好像我们和真实DOM之间的一个桥梁。有了虚拟DOM，使得我们无需去操作真实的DOM元素，只需要对React元素进行操作，所有操作最终都会映射到真实的DOM元素上。

这不是有点多余吗？直接操作DOM不好吗？为什么要多此一举呢？原因其实很多，这里简单举几个出来。

首先，虚拟DOM简化了DOM操作。凡是用过DOM的都知道Web API到底有多复杂，各种方法，各种属性，数不胜数。查询的、修改的、删除的、添加的等等等等。然而在虚拟DOM将所有的操作都简化为了一种，那就是创建！React元素是不可变对象，一旦创建就不可更改。要修改元素的唯一方式就是创建一个新的元素去替换旧的元素，看起来虽然简单粗暴，实则却是简化了DOM的操作。

其次，解决DOM的兼容性问题。DOM的兼容性是一个历史悠久的问题，如果使用原生DOM，总有一些API会遇到兼容性的问题。使用虚拟DOM就完美的避开了这些问题，所有的操作都是在虚拟DOM上进行的，而虚拟DOM是没有兼容问题的，至于原生DOM是否兼容就不需要我们操心了，全都交给React吧！

最后，我们手动操作DOM时，由于无法完全掌握全局DOM情况，经常会出现不必要的DOM操作，比如，本来只需要修改一个子节点，但却不小心修改了父节点，导致所有的子节点都被修改。效果呈现上可能没有什么问题，但是性能上确实千差万别，修改一个节点和修改多个节点对于系统的消耗可是完全不同的。然而在虚拟DOM中，引入了diff算法，React元素在更新时会通过diff算法和之前的元素进行比较，然后只会对DOM做必要的更新来呈现结果。简单来说，就是拿新建的元素和旧的元素进行比较，只对发生变化的部分对DOM进行更新，减少DOM的操作，从而提升了性能。

![image-20221025135929891](https://gitlab.com/apzs/image/-/raw/master/image/d343f27193258344b3ef4adf5b0f7f0f3f558a66.png)
