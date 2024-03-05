# 八、react-Hook （上）
*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 1.准备

### 1.1  什么是 Hook 

Hooks 译为钩子，Hooks 就是在函数组件内，负责钩进外部功能的函数。

React 提供了一些常用钩子，React 也支持自定义钩子，这些钩子都是用于为函数引入外部功能。

当我们在组件中，需要引入外部功能时，就可以使用 React 提供的钩子，或者自定义钩子。

### 1.2 动机

**在组件之间复用状态逻辑很难**
React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。
你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。
**复杂组件变得难以理解**
我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。
Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

**难以理解的 class**
你必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。
class 不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。
为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

### 1.3 Hook API

- [基础 Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#basic-hooks)
  - [`useState`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate)
  - [`useEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)
  - [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)
- [额外的 Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)
  - [`useCallback`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)
  - [`useMemo`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)
  - [`useRef`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usedebugvalue)
  - [`useDeferredValue`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usedeferredvalue)
  - [`useTransition`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usetransition)
  - [`useId`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useid)
- [Library Hooks](https://zh-hans.reactjs.org/docs/hooks-reference.html#library-hooks)
  - [`useSyncExternalStore`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usesyncexternalstore)
  - [`useInsertionEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useinsertioneffect)

### 1.4 什么时候会用 Hook

如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其转化为 class。现在你可以在现有的函数组件中使用 Hook。

**注意：**

在组件中有些特殊的规则，规定什么地方能使用 Hook，什么地方不能使用。我们将在 [Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)中学习它们。

## 2.使用 State Hook

### 2.1 声明 State 变量

> 首先我们需要明确一点，函数式组件**没有**自己的 `this`
>

在 类式组件中，我们通过在构造函数中设置 `this.state` 为 `{ count: 0 }` 来初始化 `count` state 为 `0`：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
}
```

在函数组件中，我们没有 `this`，所以我们不能分配或读取 `this.state`。我们直接在组件中调用 `useState` Hook：

> 我们声明了一个叫 `count` 的 state 变量，然后把它设为 `0`。React 会在重复渲染时记住它当前的值，并且提供最新的值给我们的函数。返回值是一个数组，数组的第一个元素是state，第二个元素是修改state的方法，我们可以通过调用 `setCount` 来更新当前的 `count`。

```js
import React, { useState } from 'react';

function App() {
  // 声明一个叫 “count” 的 state 变量,初始化为0，返回数据和操作数据的方法
  const [count, setCount] = useState(0);
  // setCount(count + 1)} 不能在这里写，如果在这里写会更新组件，更新组件会调用这个App函数，然后继续设置新的状态、然后继续更新组件，从而产生死循环
  console.log(count, setCount)
}
```

![image-20221027201435122](https://gitlab.com/apzs/image/-/raw/master/image/3a8c62e2e92fc6adc7ae1e70cb0f39c18de3bb76.png)

**`调用 useState` 方法的时候做了什么?** 它定义一个 “state 变量”。我们的变量叫 `count`， 但是我们可以叫他任何名字，比如 `banana`。这是一种在函数调用时保存变量的方式 —— `useState` 是一种新方法，它与 class 里面的 `this.state` 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

**`useState` 需要哪些参数？** `useState()` 方法里面唯一的参数就是初始 state。不同于 class 的是，我们可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。在示例中，只需使用数字来记录用户点击次数，所以我们传了 `0` 作为变量的初始 state。（如果我们想要在 state 中存储两个不同的变量，只需调用 `useState()` 两次即可。）

**`useState` 方法的返回值是什么？** 返回值为：当前 state 以及更新 state 的函数。这就是我们写 `const [count, setCount] = useState()` 的原因。这与 class 里面 `this.state.count` 和 `this.setState` 类似，唯一区别就是你需要成对的获取它们。如果你不熟悉我们使用的语法，我们会在[本章节的底部](https://zh-hans.reactjs.org/docs/hooks-state.html#tip-what-do-square-brackets-mean)介绍它。

> 简单说
>
> 它让函数式组件能够维护自己的 `state` ，它**接收一个参数**，作为**初始化** `state` 的值，赋值给 `count`，因此 `useState` 的初始值只有**第一次有效**，它所映射出的两个变量 `count` 和 `setCount` 我们可以理解为 `setState` 来使用
>
> **useState 能够返回一个数组，第一个元素是 state ，第二个是更新 state 的函数**

既然我们知道了 `useState` 的作用，我们的示例应该更容易理解了：

### 2.2 读取 State

当我们想在类式组件中显示当前的 count，我们可以使用 `this.state.count`：

```html
<h2>当前求和为：{this.state.count}</h2>
```

在函数组件中，我们可以直接用 `count`:

```html
<h2>当前求和为：{count}</h2>
```

### 2.3 更新 State

在类式组件中，我们需要调用 `this.setState()` 来更新 `count` 值：

```jsx
<button onClick={() => this.setState({ count: this.state.count + 1 })}>点我+1</button>
```

在函数组件中，我们已经有了 `setCount` 和 `count` 变量，所以我们直接调用setCount方法即可:

```jsx
{/* 参数可以直接传值 */}
<button onClick={() => setCount(count + 1)}>点我+1</button>
{/* 也可以使用函数式写法 */}
<button onClick={()=>setCount(count=>count+1)}>点我+1</button>
```

### 2.4 使用多个 state 变量

将 state 变量声明为一对 `[something, setSomething]` 也很方便，因为如果我们想使用多个 state 变量，它允许我们给不同的 state 变量取不同的名称：

```js
// 声明多个 state 变量
const [age, setAge] = useState(42);
const [fruit, setFruit] = useState('banana');
const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
```

在以上组件中，我们有局部变量 `age`，`fruit` 和 `todos`，并且我们可以单独更新它们：

```js
function handleOrangeClick() {
  // 和 this.setState({ fruit: 'orange' }) 类似
  setFruit('orange');
}
```

你**不必**使用多个 state 变量。State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组。然而，不像 class 中的 `this.setState`，使用State Hook更新 state 变量总是*替换*它而不是合并它。

### 2.5 总结

现在让我们来**仔细回顾一下学到的知识**，看下我们是否真正理解了。

```jsx
 1:  import React, { useState } from 'react';
 2:
 3:  export default function App() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>当前求和为：{count} </p>
 9:        <button onClick={() => setCount(count + 1)}>点我+1</button>
10:      </div>
11:    );
12:  }
```

- **第一行:** 引入 React 中的 `useState` Hook。它让我们在函数组件中存储内部 state。
- **第四行:** 在 `App` 组件内部，我们通过调用 `useState` Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。我们把变量命名为 `count`，因为它存储的是点击次数。我们通过传 `0` 作为 `useState` 唯一的参数来将其初始化为 `0`。第二个返回的值本身就是一个函数。它让我们可以更新 `count` 的值，所以我们叫它 `setCount`。
- **第九行:** 当用户点击按钮后，我们传递一个新的值给 `setCount`。React 会重新渲染 `App` 组件，并把最新的 `count` 传给它。

乍一看这似乎有点太多了。不要急于求成！如果你有不理解的地方，请再次查看以上代码并从头到尾阅读。我们保证一旦你试着”忘记” class 里面 state 是如何工作的，并用新的眼光看这段代码，就容易理解了。

## 3.使用 Effect Hook

### 3.1 副作用

React组件有部分逻辑都可以直接编写到组件的函数体中的，像是对数组调用filter、map等方法，像是判断某个组件是否显示等。但是有一部分逻辑如果直接写在函数体中，会影响到组件的渲染，这部分会产生“副作用”的代码，是一定不能直接写在函数体中。

例如，如果直接将修改state的逻辑编写到了组件之中，就会导致组件不断的循环渲染，直至调用次数过多内存溢出。

### 3.3 Effect 基本使用

在类式组件中，提供了一些声明周期钩子给我们使用，我们可以在组件的特殊时期执行特定的事情，例如 `componentDidMount` ，能够在组件挂载完成后执行一些东西。在 React 的 class 组件中，`render` 函数是不应该有任何副作用的。一般来说，在这里执行操作太早了，我们基本上都希望在 React 更新 DOM 之后才执行我们的操作。

这就是为什么在 React class 中，我们把副作用操作放到 `componentDidMount` 和 `componentDidUpdate` 函数中。回到示例中，这是一个 React 计数器的 class 组件。它在 React 对 DOM 进行操作之后，立即更新了 document 的 title 属性

```jsx
import React, { Component } from "react";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { count: 0 };
	}

	componentDidMount() {
		document.title = `当前求和为：${this.state.count}`;
	}

	componentDidUpdate() {
		document.title = `当前求和为：${this.state.count}`;
	}

	render() {
		return (
			<div>
				<p>当前求和为：{this.state.count}</p>
				<button onClick={() => this.setState({ count: this.state.count + 1 })}>点我+1</button>
			</div>
		);
	}
}
```

![GIF 2023-8-26 22-53-35](https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-26%2022-53-35.gif)

在函数式组件中也可以实现，它采用的是 `Effect Hook` ，它的语法更加的简单，同时融合了 `componentDidUpdata` 生命周期，极大的方便了我们的开发，`Effect Hook` 可以让你在函数组件中执行副作用操作，专门用来处理那些不能直接写在组件内部的代码。

```jsx
import React, { useState, useEffect } from 'react';

export default function App() {
	const [count, setCount] = useState(0);

    // 如果useEffect方法只传一个参数，相当于componentDidMount和componentDidUpdate函数
	useEffect(() => {
		document.title = `当前求和为：${count}`;
	});

	return (
		<div>
			<p>当前求和为：{count}</p>
			<button onClick={() => setCount(count => count + 1)}>点我+1</button>
		</div>
	);
}
```

我们为计数器增加了一个小功能：将 document 的 title 设置为包含了点击次数的消息。

`useEffect()`中的回调函数会在组件每次渲染完毕之后执行，这也是它和写在函数体中代码的最大的不同，函数体中的代码会在组件渲染前执行，而`useEffect()`中的代码是在组件渲染后才执行，这就避免了代码的执行影响到组件渲染。

通过使用这个Hook，我设置了React组件在渲染后所要执行的操作。React会将我们传递的函数保存（我们称这个函数为effect），并且在DOM更新后执行调用它。React会确保effect每次运行时，DOM都已经更新完毕。

> 如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

在 React 组件中有两种常见副作用操作：需要清除的和不需要清除的。我们来更仔细地看一下他们之间的区别。

### 3.4 关注指定的状态

我们可以给`useEffect`函数指定第二个参数，指定后，只有第二个参数里的状态改变后才会重新执行`useEffect`函数，而其他的状态改变后不会执行`useEffect`函数。

> 特别注意的是：不管是否指定第二个参数，如果所有的状态都没有改变就不会执行`useEffect`函数。如果指定了第二个参数，只有指定的第二个参数里的状态改变后才执行`useEffect`函数，而其他的状态改变并不会执行`useEffect`函数。

```jsx
import React, { useState, useEffect } from 'react';

export default function App() {
	const [count, setCount] = useState(0);
	const [random,setRandom] = useState(Math.random());
	useEffect(() => {
		console.log(count,random);
		document.title = `当前求和为：${count}`;
	},[count]);

	return (
		<div>
			<p>当前求和为：{count}</p>
			<p>当前随机数为：{random}</p>
			<button onClick={() => setCount(count => count + 1)}>点我+1</button>
			<button onClick={() => setCount(0)}>点我恢复初始值</button>
			<button onClick={() => setRandom(Math.random())}>点我修改随机数</button>
			<button onClick={() => {setRandom(0)}}>点我重置随机数</button>
		</div>
	);
}
```

没有设置useEffect函数的第二个参数时，count或random的状态改变后都会执行`useEffect`函数，而count和random的状态没有改变时不会执行`useEffect`函数（但会重新调用App函数以渲染视图，读者可以在App函数里输出一下试试）

<img src="https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-27%2015-47-31.gif" alt="GIF 2023-8-27 15-47-31" style="zoom:50%;" />

设置`useEffect`函数的第二个参数为`[count]`之后，只有`count`的状态改变后才执行`useEffect`函数，而`count`和`random`的状态没有改变或只改变`random`的状态时并不会执行`useEffect`函数（但会重新调用App函数以渲染视图，读者可以在App函数里输出一下试试）

<img src="https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-27%2015-38-54.gif" alt="GIF 2023-8-27 15-38-54" style="zoom:50%;" />

### 3.5 组件销毁时执行

我们可以给`useEffect`函数的第一个参数一个返回值，返回值是一个高阶函数，相当于类式组件的`componentWillUnmount`，即在组件将要卸载时执行。

```js
useEffect(() => {
	console.log(count,random);
	document.title = `当前求和为：${count}`;
	return () => {
		console.log("组件将要卸载时执行");
	}
},[count]);
```

我们有如下需求：首先需要一个定时器，初始时定时器的值为0，随后每1秒自动增加1，我们点击`点我+1`按钮后值可以立即加一，当点击卸载组件时清除定时器。

<img src="https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-27%2016-25-28.gif" alt="GIF 2023-8-27 16-25-28" style="zoom:50%;" />

`src/App.jsx`：我们在`useEffect`函数的第二个参数里传入一个空数组，即任何变量的更新都不会重新执行`useEffect`里的函数，这样做的目的是避免重复创建定时器，最后导致数据呈指数级增长从而导致内存溢出，同时我们的第一个参数有一个高阶函数的返回值，当我们卸载组件时会执行这个高阶函数。

```jsx
import React, { useState, useEffect } from 'react'
import root from './index.js'

export default function App() {

	const [count, setCount] = useState(0)

	useEffect(() => {
		let timer = setInterval(() => {
			setCount(count => count + 1)
		}, 1000)
		return () => {
			console.log("组件将要卸载");
			clearInterval(timer)
		}
	}, [])

	//卸载组件的回调
	function unmount() {
		// ReactDOM.unmountComponentAtNode(document.getElementById('root'))
		root.unmount()
	}

	return (
		<div>
			<h2>当前求和为：{count}</h2>
			<button onClick={() => setCount(count + 1)}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
		</div>
	)
}
```

`src/index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<App />
)

export default root
```

## 4.useRef

```js
const myRef = useRef(initialValue);
```

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内持续存在。

```jsx
import React, { useRef } from 'react'

export default function App(){

	const myRef = useRef()

	return (
		<div>
			<input type="text" ref={myRef}/>
			<button onClick={()=>alert(myRef.current.value)}>点我提示数据</button>
		</div>
	)
}
```

![GIF 2023-8-27 16-48-35](https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-27%2016-48-35.gif)

## 完整代码

下面是函数式组件使用**组件实例的三大属性 `state` `props` `refs`**的例子

`src/App.jsx`

```jsx
import React, { useState, useEffect,useRef } from 'react'
import root from './index.js'

export default function App(){
	return <Demo car="奔驰">哈哈哈</Demo>
}

function Demo(props){
	console.log("props",props);
	const [count,setCount] = useState(0)
	const myRef = useRef()

	useEffect(()=>{
		let timer = setInterval(()=>{
			setCount(count => count+1 )
		},1000)
		return ()=>{
			console.log("组件将要卸载");
			clearInterval(timer)
		}
	},[])

	//卸载组件的回调
	function unmount() {
		// ReactDOM.unmountComponentAtNode(document.getElementById('root'))
		root.unmount()
	}

	return (
		<div>
			<h2>当前求和为：{count}</h2>
			<button onClick={()=>setCount(count => count+1 )}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<input type="text" ref={myRef}/>
			<button onClick={()=>alert(myRef.current.value)}>点我提示数据</button>
		</div>
	)
}
```

`src/index.js`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<App />
)

export default root
```

![GIF 2023-8-27 17-14-59](https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-27%2017-14-59.gif)



```jsx
import React, { useState, useEffect,useRef } from 'react'
import root from './index.js'

export default function App(){
	return <Demo car="奔驰">哈哈哈</Demo>
}

function Demo(props) {
	console.log(props);
	const [count, setCount] = useState(0);
	const [random,setRandom] = useState(Math.random());
	const myRef = useRef()

	useEffect(() => {
		console.log(count,random);
		document.title = `当前求和为：${count}`;
		return ()=>{
			console.log("组件将要卸载");
		}
	},[count]);

	//卸载组件的回调
	function unmount() {
		// ReactDOM.unmountComponentAtNode(document.getElementById('root'))
		root.unmount()
	}

	return (
		<div>
			<p>当前求和为：{count}</p>
			<p>当前随机数为：{random}</p>
			<button onClick={() => setCount(count => count + 1)}>点我+1</button>
			<button onClick={() => setCount(0)}>点我恢复初始值</button>
			<button onClick={() => setRandom(Math.random())}>点我修改随机数</button>
			<button onClick={() => {setRandom(0)}}>点我重置随机数</button>
			<input type="text" ref={myRef}/>
			<button onClick={()=>alert(myRef.current.value)}>点我提示数据</button>
			<button onClick={unmount}>卸载组件</button>
		</div>
	);
}
```

![GIF 2023-8-27 17-10-01](https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-8-27%2017-10-01.gif)

## 5 React.StrictMode 严格模式

编写React组件时，我们要极力的避免组件中出现那些会产生“副作用”的代码。同时，如果你的React使用了严格模式，也就是在React中使用了`React.StrictMode`标签，那么React会非常“智能”的去检查你的组件中是否写有副作用的代码，当然这个智能是加了引号的。

React并不能自动替你发现副作用，但是它会想办法让它显现出来，从而让你发现它。那么它是怎么让你发现副作用的呢？React的严格模式，在处于开发模式下，会主动的重复调用一些函数，以使副作用显现。所以在处于开发模式且开启了React严格模式时，这些函数会被调用两次：

类组件的的 `constructor`, `render`, 和 `shouldComponentUpdate` 方法
类组件的静态方法 `getDerivedStateFromProps`
函数组件的函数体
参数为函数的`setState`
参数为函数的`useState`, `useMemo`, or `useReducer`

重复的调用会使副作用更容易凸显出来，你可以尝试着在函数组件的函数体中调用一个`console.log`你会发现它会执行两次，如果你的浏览器中安装了React Developer Tools，第二次调用会显示为灰色。

可以在`src/index.js`文件里使用`<StrictMode>`标签将`<App />`包起来以开启严格模式

```jsx
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
```

如果你无法通过浏览器正常安装[React Developer Tools](https://my-wp.oss-cn-beijing.aliyuncs.com/wp-content/uploads/2022/05/20220512111133423.zip)可以通过点击这里下载。

## 5.useReducer

### 5.1 基本使用

为了解决复杂`State`带来的不便，`React`为我们提供了一个新的使用`State`的方式。`Reducer`横空出世，reduce单词中文意味减少，而reducer我觉得可以翻译为“当你的state的过于复杂时，你就可以使用的可以对state进行整合的工具”。当然这是个玩笑话，个人认为`Reducer`可以翻译为“整合器”，它的作用就是将那些和同一个`state`相关的所有函数都整合到一起，方便在组件中进行调用。

当然工具都有其使用场景，`Reducer`也不例外，它只适用于那些比较复杂的`state`，对于简单的`state`使用`Reducer`只能是徒增烦恼。

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

它的返回值和`useState()`类似，第一个参数是`state`用来读取`state`的值，第二个参数同样是一个函数，不同于`setState()`这个函数我们可以称它是一个“派发器”，通过它可以向`reducer()`发送不同的指令，控制`reducer()`做不同的操作。

它的参数有三个，第三个我们暂且忽略，只看前两个。`reducer()`是一个函数，也是我们所谓的“整合器”。它的返回值会成为新的`state`值。当我们调用`dispatch()`时，`dispatch()`会将消息发送给`reducer()`，`reducer()`可以根据不同的消息对`state`进行不同的处理。`initialArg`就是`state`的初始值，和`useState()`参数一样。

以下是用 `reducer `写的的计数器示例：

```jsx
/*
*   参数：
*       reducer : 整合函数
*           对于我们当前state的所有操作都应该在该函数中定义
*           该函数的返回值，会成为state的新值
*           reducer在执行时，会收到两个参数：
*               state 当前最新的state
*               action 它需要一个对象
*                       在对象中会存储dispatch所发送的指令
*       initialArg : state的初始值，作用和useState()参数的值是一样
*   返回值：
*       数组：
*           第一个元素，state 用来获取state的值
*           第二个元素，state 修改的派发器
*                   通过派发器可以发送操作state的命令
*                   具体的修改行为将会由另外一个函数(reducer)执行
* */

// 为了避免reducer会重复创建，通常reducer会定义到组件的外部
function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [count, countDispatch] = useReducer(countReducer, {count: 0});
    // 这里本来初始值是直接给0的，但是为了countReducer函数中的state写成对象形式
    
  return (
    <>
      Count: {count.count}
      <button onClick={() => countDispatch({type: 'decrement'})}>-</button>
      <button onClick={() => countDispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### 5.2 state初始化的两种方式

**指定初始 state**

有两种不同初始化 `useReducer` state 的方式，你可以根据使用场景选择其中的一种。将初始 state 作为第二个参数传入 `useReducer` 是最简单的方法：

```js
const [state, dispatch] = useReducer(
reducer,
{count: 0}  );
```

**惰性初始化**

你可以选择惰性地创建初始 state。为此，需要将 `init` 函数作为 `useReducer` 的第三个参数传入，这样初始 state 将被设置为 `init(initialArg)`。

这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利：

```jsx
export default function App() {
  return (
    <div>
      <Counter initialCount={0} />
    </div>
  )
}

function countInit(initialCount) {
  return {count: initialCount};
}

function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return countInit(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [count, countDispatch] = useReducer(countReducer, initialCount, countInit);
  return (
    <>
      Count: {count.count}
      <button
        onClick={() => countDispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => countDispatch({type: 'decrement'})}>-</button>
      <button onClick={() => countDispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

![image-20221030143937094](https://gitlab.com/apzs/image/-/raw/master/image/08a8b739d946a92c01ec286bfce8b81771a42e71.png)

### 5.3 跳过 dispatch

如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 来比较 state。）

> 这里的state如果是个对象，还是会渲染子组件，因为我们返回的是一个新对象，我想应该比较的是地址，如果直接将state返回，子组件是不会重新渲染的

需要注意的是，React 可能仍需要在跳过渲染前再次渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 `useMemo` 来进行优化。


# 15【react-Hook （下）】

## 1.React.memo

### 1.1 基本介绍

> 这是一个高阶组件，用来做性能优化的，这个本来应该是写在`React高级指引`中的，但是这个案例会和后面的`useCallback`联合起来，所以就写在这里了

*   React.memo() 是一个高阶组件，如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。
    *   它接收另一个组件作为参数，并且会返回一个包装过的新组件
    *   包装过的新组件就会具有缓存功能，这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
    *   包装过后，只有组件的props发生变化，才会触发组件的重新的渲染，否则总是返回缓存中结果。如果函数组件被 `React.memo` 包裹，且其实现中拥有 [`useState`](https://zh-hans.reactjs.org/docs/hooks-state.html)，[`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 或 [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

### 1.2 问题的引出

React组件会在两种情况下发生重新渲染。第一种，当组件自身的state发生变化时。第二种，当组件的父组件重新渲染时。第一种情况下的重新渲染无可厚非，state都变了，组件自然应该重新进行渲染。但是第二种情况似乎并不是总那么的必要。

`App.jsx`

```jsx
import React, { useState } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A />
    </div>
  )
}

function A() {
  console.log('A渲染')
  return <div>我是A组件</div>
}
```

在点击增加后，我们发现`App`和`A`都重新渲染了。

当APP组件重新渲染时，A组件也会重新渲染。A组件中没有state，甚至连props都没有设置。换言之，A组件无论如何渲染，每次渲染的结果都是相同的，虽然重渲染并不会应用到真实DOM上，但很显然这种渲染是完全没有必要的。

![image-20221030172720453](https://gitlab.com/apzs/image/-/raw/master/image/86fdfde2cc02ab0826730bc14eefc637c2696ecd.png)

为了减少像A组件这样组件的渲染，React为我们提供了一个方法`React.memo()`。该方法是一个高阶函数，可以用来根据组件的props对组件进行缓存，当一个组件的父组件发生重新渲染，而子组件的props没有发生变化时，它会直接将缓存中的组件渲染结果返回而不是再次触发子组件的重新渲染，这样一来就大大的降低了子组件重新渲染的次数。

### 1.3 使用React.memo

使用`React.memo`包裹`A组件`

> 这里只是为了演示方便，把所有组件写一个文件，就用这种方式包裹`A组件`,平时单文件组件的时候我们这样使用,`export default React.memo(A)`

```jsx
import React, { useState } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A />
    </div>
  )
}

const A = React.memo(() => {
  console.log('A渲染')
  return <div>我是A组件</div>
})
```

修改后的代码中，并没有直接使用A组件，而是在A组件外层套了一层函数`React.memo()`，这样一来，返回的A组件就增加了缓存功能，只有当A组件的props属性发生变化时，才会触发组件的重新渲染。memo只会根据props判断是否需要重新渲染，和state和context无关，state或context发生变化时，组件依然会正常的进行重新渲染

在点击增加后，我们发现只有`App`重新渲染了。

![image-20221030173239606](https://gitlab.com/apzs/image/-/raw/master/image/0a613f29500b63ae26e2db2870ef9c18f3e7815f.png)

这时我们改下代码

```jsx
export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }
	
  // 增加
  const test = count % 4 === 0

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
  	  {/* 改动 */}
      <A test={test} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      {/* 增加 */}
      <p>{props.test && 'props.test 为 true'}</p>
    </div>
  )
})
```

这次加了个表达式的结果传给`A`组件，一开始是`false`，只有为`true`的时候，`A`组件才会重新渲染

这时界面是这样的

![image-20221030174105525](https://gitlab.com/apzs/image/-/raw/master/image/9ddba53bea0c611e1c3e2837761f2b60f2f29322.png)

点击3次后，表达式为`true`，A组件的`props`发生改变，所以重新渲染了。

![image-20221030173754653](https://gitlab.com/apzs/image/-/raw/master/image/0f5ff4c127b4d404f1207ccbf497a5cd271d4651.png)

### 1.4 使用注意

1. 此方法仅作为**[性能优化](https://zh-hans.reactjs.org/docs/optimizing-performance.html)**的方式而存在。但请不要依赖它来“阻止”渲染，因为这会产生 bug。
2. 与 class 组件中 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate) 方法不同的是，如果 props 相等，`areEqual` 会返回 `true`；如果 props 不相等，则返回 `false`。这与 `shouldComponentUpdate` 方法的返回值相反。

### 1.5 容易出错的情况

先回到这个案例的初始代码，在这之上进行修改

我们把`App组件`的`clickHandler`方法传递给`A组件`，让`A组件`也能够改变`App组件`的`state`

```jsx
import React, { useState } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = () => {
    setCount(prevState => prevState + 1)
  }

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A clickHandler={clickHandler} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      <button onClick={props.clickHandler}>A组件的增加</button>
    </div>
  )
})
```

点击`A组件的增加`,发现`A组件`也重新渲染了

![image-20221030175830062](https://gitlab.com/apzs/image/-/raw/master/image/3e8995b7352d72b47e772ea6c7fed94ef1531267.png)

这是因为`App组件`重新渲染的时候，`clickHandler`也重新创建了，这时传递给子组件的`clickHandler`和上一次不一样，所以`react.memo`失效了。

这个问题可以用`useCallback`解决。

## 2.useCallback

### 2.1 基本介绍

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback`和`useMemo`设计的初衷是用来做性能优化的。在`Class Component`中考虑以下的场景：

```javascript
class Foo extends Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={() => this.handleClick()}>Click Me</Button>;
  }
}
```

传给 Button 的 onClick 方法每次都是重新创建的，这会导致每次 Foo render 的时候，Button 也跟着 render。优化方法有 2 种，箭头函数和 bind。下面以 bind 为例子：

```javascript
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <Button onClick={this.handleClick}>Click Me</Button>;
  }
}
```

同样的，`Function Component`也有这个问题：

```javascript
function Foo() {
  const [count, setCount] = useState(0);

  const handleClick() {
    console.log(`Click happened with dependency: ${count}`)
  }
  return <Button onClick={handleClick}>Click Me</Button>;
}
```

而 React 给出的方案是`useCallback` Hook。在依赖不变的情况下 (在我们的例子中是 count )，它会返回相同的引用，避免子组件进行无意义的重复渲染

### 2.2 解决1.5遗留的问题

```javascript
/*
*   useCallback()
*		这个hook会缓存方法的引用
*       参数：
*           1. 回调函数
*           2. 依赖数组
*               - 当依赖数组中的变量发生变化时，回调函数才会重新创建
*               - 如果不指定依赖数组，回调函数每次都会重新创建
*               - 一定要将回调函数中使用到的所有变量都设置到依赖数组中
*                   除了（setState）
* */
```

我们将`clickHandler`方法改造一下

```js
  const clickHandler = useCallback(() => {
    setCount(prevState => prevState + 1)
  }, [])
```

> 第二个参数一定要加，不然和平常写没有区别
>
> 依赖项`[]`的意思是只有第一次渲染时才会创建，之后都不会重新创建了

点击`A组件的增加`,发现只有`App组件`重新渲染了。因为`clickHandler`没有重新创建，传给子组件的没有变化，所以子组件这次没有重新渲染。

![image-20221030180349406](https://gitlab.com/apzs/image/-/raw/master/image/2e7d34de3518ecb98ac3433cae205a4683a069f5.png)

**完整代码**

```jsx
import React, { useState, useCallback } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)

  const clickHandler = useCallback(() => {
    setCount(prevState => prevState + 1)
  }, [])

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A clickHandler={clickHandler} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      <button onClick={props.clickHandler}>A组件的增加</button>
    </div>
  )
})
```

### 2.3 第二个参数的使用

继续改造上面的代码

```jsx
import React, { useState, useCallback } from 'react'

export default function App() {
  console.log('App渲染')

  const [count, setCount] = useState(1)
  // 增加
  const [num, setNum] = useState(1)

  const clickHandler = useCallback(() => {
    setCount(prevState => prevState + num)
  // 增加
    setNum(prevState => prevState + 1)
  }, [])

  return (
    <div>
      <h2>App -- {count}</h2>
      <button onClick={clickHandler}>增加</button>
      <A clickHandler={clickHandler} />
    </div>
  )
}

const A = React.memo(props => {
  console.log('A渲染')
  return (
    <div>
      我是A组件
      <button onClick={props.clickHandler}>A组件的增加</button>
    </div>
  )
})
```

增加了一个`num`，让每一次`count`的增加比上次多1，现在这样写是有问题的。

![image-20221030181249832](https://gitlab.com/apzs/image/-/raw/master/image/2e04eb7727a7b875a3b771761c4c4d2ac9e30b04.png)

点击了两次增加后，预期值应该是4，但是显示的是3，是为什么呢？

因为`clickHandler`只在初次渲染的时候创建，当时`num`的值是1，这个函数一直没有重新创建，内部用的`num`一直是1

这时我们可以加一个依赖项

```js
const clickHandler = useCallback(() => {
    setCount(prevState => prevState + num)
    setNum(prevState => prevState + 1)
  }, [num])
```

这样`num`变化了，这个函数也会重新创建。

![image-20221030181534667](https://gitlab.com/apzs/image/-/raw/master/image/d1f9956dac9668ab3c7af6dc5f093f1155f39d6b.png)

点击了两次增加后，count变成了预期值4。

## 3.useMemo

useMemo和useCallback十分相似，useCallback用来缓存函数对象，useMemo用来缓存函数的执行结果。在组件中，会有一些函数具有十分的复杂的逻辑，执行速度比较慢。闭了避免这些执行速度慢的函数返回执行，可以通过useMemo来缓存它们的执行结果，像是这样：

```js
const result = useMemo(()=>{
    return 复杂逻辑函数();
},[依赖项])
```

useMemo中的函数会在依赖项发生变化时执行，注意！是执行，这点和useCallback不同，useCallback是创建。执行后返回执行结果，如果依赖项不发生变化，则一直会返回上次的结果，不会再执行函数。这样一来就避免复杂逻辑的重复执行。

### 3.1 问题的引出

`App.jsx`

````jsx
import React, { useMemo, useState } from 'react'

const App = () => {
  const [count, setCount] = useState(1)

  let a = 123
  let b = 456

  function sum(a, b) {
    console.log('sum执行了')
    return a + b
  }
    
  return (
    <div>
      <h1>App</h1>
      <p>sum的结果：{sum(a, b)}</p>
      <h3>{count}</h3>
      <button onClick={() => setCount(prevState => prevState + 1)}>点我</button>
    </div>
  )
}

export default App
````

这是一个计数器案例，但是多添加了一个函数展示结果，这种情况这个函数只需要在一开始调用一次就够了，但是`count`的改变会导致重新渲染模板，这样`sum`函数也会反复执行。

![image-20221107143139632](https://gitlab.com/apzs/image/-/raw/master/image/2e224dfe8aa7df39ae77c2d98bede3d590d7d1b8.png)

现在这个`sum`函数太简单了，体现不出性能上的问题，我们可以把sum中的逻辑改复杂一点。

```jsx
import React, { useMemo, useState } from 'react'

const App = () => {
  const [count, setCount] = useState(1)

  let a = 123
  let b = 456

  function sum(a, b) {
    console.log('sum执行了')
    const begin = +new Date()
    while (true) {
      if (Date.now() - begin > 3000) break
    }
    return a + b
  }
  return (
    <div>
      <h1>App</h1>
      <p>sum的结果：{sum(a, b)}</p>
      <h3>{count}</h3>
      <button onClick={() => setCount(prevState => prevState + 1)}>点我</button>
    </div>
  )
}

export default App
```

增加了一个功能，让这个函数起码3秒才能执行完。

![image-20221107143451560](https://gitlab.com/apzs/image/-/raw/master/image/67454e5c8256260a19f3cc84d2b1da78935ec5d3.png)

这个时候因为`sum`函数要3秒才能执行完，导致下面数字显示也变慢了3秒。

### 3.2 使用 useMemo 解决上面的问题

`App.jsx`

改写模板中的`sum`方法的调用

```jsx
<p>sum的结果：{useMemo(() => sum(a, b), [])}</p>
```

![image-20221107143946116](https://gitlab.com/apzs/image/-/raw/master/image/790ec03b82b253c6a80c823542d21b745adb8035.png)

第一次加载慢是不可避免的，但是这个钩子函数将`sum`函数的返回值缓存起来，这样我们模板重新渲染时就没有再去执行`sum`函数，而是直接使用上一次的返回值。

### 3.3 第二个参数的使用

继续改造上面的代码，把`Sum`单独抽离成一个组件

`Sum.jsx`

```jsx
import React from 'react'

export default function Sum(props) {
  console.log('Sum执行了')
  return <span>{props.a + props.b}</span>
}
```

`App.jsx`

添加了一个功能可以变换`a`的值

```jsx
import React, { useMemo, useState } from 'react'
import Sum from './Sum'

const App = () => {
  const [count, setCount] = useState(1)

  let a = 123
  let b = 456

  if (count % 2 === 0) a = a + 1

  const result = useMemo(() => <Sum a={a} b={b} />, [])

  return (
    <div>
      <h1>App</h1>
      <p>sum的结果：{result}</p>
      <h3>{count}</h3>
      <button onClick={() => setCount(prevState => prevState + 1)}>点我</button>
    </div>
  )
}

export default App
```

现在有一个问题，如果`Sum`组件接收的值变化了，网页上显示的还是原来的缓存值，这个时候就要利用第二个参数。

![image-20221107145159066](https://gitlab.com/apzs/image/-/raw/master/image/deecc395220dcff4c6c9acb8b71bbda6ca6a5ae7.png)

`App.jsx`

```jsx
const result = useMemo(() => <Sum a={a} b={b} />, [a])
```

> 这里的意思和以前是一样的，如果`a`的值变化了，将会重新计算。

![image-20221107145403725](https://gitlab.com/apzs/image/-/raw/master/image/931d55fbd9ffca98894a4b8178c8da9751231923.png)

## 4.React.forwardRef

> 这是一个高阶组件，用来做性能优化的，这个本来应该是写在`React高级指引`中的，但是这个案例会和后面的`useImperativeHandle`联合起来，所以就写在这里了

`React.forwardRef` 会创建一个React组件，这个组件能够将其接受的 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- [转发 refs 到 DOM 组件](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
- [在高阶组件中转发 refs](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` 接受渲染函数作为参数。React 将使用 `props` 和 `ref` 作为参数来调用此函数。此函数应返回 React 节点。

```jsx
import React, { useRef } from 'react'

const Child = React.forwardRef((props, ref) => {
  return (
    <>
      <h2>这是Child组件</h2>
      <input type="text" ref={ref} />
    </>
  )
})

export default function App() {
  const childRef = useRef(null)
  console.log(childRef)
  return (
    <div>
      <h2>这是App组件</h2>
      <Child ref={childRef} />
    </div>
  )
}
```

在上述的示例中，React 会将 `<Child ref={childRef}>` 元素的 `ref` 作为第二个参数传递给 `React.forwardRef` 函数中的渲染函数。该渲染函数会将 `ref` 传递给 `<input ref={ref}>` 元素。

因此，当 React 附加了 ref 属性之后，`ref.current` 将直接指向 `<input>` DOM 元素实例。

![image-20221107150428406](https://gitlab.com/apzs/image/-/raw/master/image/1cb30d9536293b08fe2097448858e58e3826a242.png)

我们改造`App`组件

```jsx
export default function App() {
  const childRef = useRef(null)

  childRef.current.value = 'App组件设置的'

  return (
    <div>
      <h2>这是App组件</h2>
      <Child ref={childRef} />
    </div>
  )
}
```

![image-20221107150535398](https://gitlab.com/apzs/image/-/raw/master/image/97b65dfb2775fb6d2b94e3e7e0bd1c57a0f45571.png)

我们可以直接在`App`组件操作`Child`组件的内容，但是这样并不好，我们希望`Child`组件的内容只由`Child`组件自己去操作，所以引出了`useImperativeHandle`

## 5.useImperativeHandle

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 [`forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 一起使用：

`App.jsx`

```jsx
import React, { useRef, useEffect, useImperativeHandle } from 'react'

const Child = React.forwardRef((props, ref) => {
  const inputRef = useRef(null)

  const changeInputValue = value => (inputRef.current.value = value)

  // useImperativeHandle 可以用来指定ref返回的值
  useImperativeHandle(ref, () => ({
    changeInputValue,
  }))

  return (
    <>
      <h2>这是Child组件</h2>
      <input type="text" ref={inputRef} />
    </>
  )
})

export default function App() {
  const childRef = useRef(null)

  useEffect(() => {
    console.log(childRef)
  }, [])

  return (
    <div>
      <h2>这是App组件</h2>
      <button onClick={() => childRef.current.changeInputValue('App组件修改的')}>点击改变</button>
      <Child ref={childRef} />
    </div>
  )
}
```

我们来看看`childRef`的输出是什么

![image-20221107151926890](https://gitlab.com/apzs/image/-/raw/master/image/bf501a8976223d92e9330a13aadba40a623e73b0.png)

可以发现我们把子组件的`changeInputValue`暴露出去了。

![image-20221107152122394](https://gitlab.com/apzs/image/-/raw/master/image/fb13b0f4d452eae98a26edeabc03076defb73f52.png)

点击按钮发现也是可以正常使用的。
