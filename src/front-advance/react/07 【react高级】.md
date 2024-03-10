## 12 【react高级指引（上）】

### 1.setState 扩展

#### 1.1 对象式 setState

首先在我们以前的认知中，`setState` 是用来更新状态的，我们一般给它传递一个对象，就像这样

```js
this.setState({
    count: count + 1
})
```

这样每次更新都会让 `count` 的值加 1。这也是我们最常做的东西

这里我们做一个案例，点我加 1，一个按钮一个值，我要在控制台输出每次的 `count` 的值

![image-20221027095114944](https://gitlab.com/apzs/image/-/raw/master/image/b1ad03d5936d35f609b52f853a640e207e6a0048.png)

那我们需要在控制台输出，要如何实现呢？

我们会考虑在 `setState` 更新之后 `log` 一下

```js
add = () => {
    const { count } = this.state
    this.setState({
        count: count + 1
    })
    console.log(this.state.count);
}
```

因此可能会写出这样的代码，看起来很合理，在调用完 `setState` 之后，输出 `count`

![image-20221027095134650](https://gitlab.com/apzs/image/-/raw/master/image/a4746c99b4345fa4e08eec081fcc0d9fb7a7553b.png)

我们发现显示的 `count` 和我们控制台输出的 `count` 值是不一样的

这是因为，我们调用的 `setState` 是同步事件，但是它的作用是让 React 去更新数据，而 React 不会立即的去更新数据，这是一个异步的任务，因此我们输出的 `count` 值会是状态更新之前的数据。“React **状态更新是异步的**”

那我们要如何实现同步呢？

其实在 `setState` 调用的第二个参数，我们可以接收一个函数，这个函数会在状态更新完毕并且界面更新之后调用，我们可以试试

> setState(stateChange, [callback])------对象式的setState
>         1.stateChange为状态改变对象(该对象可以体现出状态的更改)
>         2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

```js
add = () => {
    const { count } = this.state
    this.setState(
      {
        count: count + 1,
      },
      () => {
        document.title = `当前值是${this.state.count}`
      },
    )
}
```

我们将 `setState` 填上第二个参数，输出更新后的 `count` 值

![image-20221027173513180](https://gitlab.com/apzs/image/-/raw/master/image/1c7c4bf62e9cbb2e581f9e5ff2552901cde64074.png)

这样我们就能成功的获取到最新的数据了，如果有这个需求我们可以在第二个参数输出噢~

#### 1.2 函数式 setState

，函数式的 `setState` 也是接收两个参数

第一个参数是 `updater` ，它是一个能够返回 `stateChange` 对象的函数

第二个参数是一个回调函数，用于在状态更新完毕，界面也更新之后调用

与对象式 `setState` 不同的是，我们传递的第一个参数 `updater` 可以接收到2个参数 `state` 和 `props`

我们尝试一下

> setState(updater, [callback])------函数式的setState
>             1.updater为返回stateChange对象的函数。
>             2.updater可以接收到state和props。
>             4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

```js
add = () => {
    this.setState(
      (state, props) => ({ count: state.count + 1 }),
      () => {
        document.title = `当前值是${this.state.count}`
      },
    )
}
```

![image-20221027173515460](https://gitlab.com/apzs/image/-/raw/master/image/1c7c4bf62e9cbb2e581f9e5ff2552901cde64074.png)

我们也成功的实现了

我们在第一个参数中传入了一个函数，这个函数可以接收到 `state` ，我们通过更新 `state` 中的 `count` 值，来驱动页面的更新

利用函数式 `setState` 的优势还是很不错的，可以直接获得 `state` 和 `props`

> 可以理解为对象式的 `setState` 是函数式 `setState` 的语法糖

#### 1.3 总结

```css
(1). setState(stateChange, [callback])------对象式的setState
        1.stateChange为状态改变对象(该对象可以体现出状态的更改)
        2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

(2). setState(updater, [callback])------函数式的setState
        1.updater为返回stateChange对象的函数。
        2.updater可以接收到state和props。
        4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
    1.对象式的setState是函数式的setState的简写方式(语法糖)
    2.使用原则：
            (1).如果新状态不依赖于原状态 ===> 使用对象方式
            (2).如果新状态依赖于原状态 ===> 使用函数方式
            (3).如果需要在setState()执行后获取最新的状态数据, 
                要在第二个callback函数中读取
```


### 2.Context

在React中组件间的数据通信是通过props进行的，父组件给子组件设置props，子组件给后代组件设置props，props在组件间自上向下（父传子）的逐层传递数据。但并不是所有的数据都适合这种传递方式，有些数据需要在多个组件中共同使用，如果还通过props一层一层传递，麻烦自不必多说。

Context为我们提供了一种在不同组件间共享数据的方式，它不再拘泥于props刻板的逐层传递，而是在外层组件中统一设置，设置后内层所有的组件都可以访问到Context中所存储的数据。换句话说，Context类似于JS中的全局作用域，可以将一些公共数据设置到一个同一个Context中，使得所有的组件都可以访问到这些数据。

#### 2.1 何时使用 Context

Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。举个例子，在下面的代码中，我们通过一个 “theme” 属性手动调整一个按钮组件的样式：

```jsx
class A extends React.Component {
  render() {
    return <B theme="dark" />;
  }
}

function B(props) {
  // B 组件接受一个额外的“theme”属性，然后传递给 C 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <C theme={props.theme} />
    </div>
  );
}

class C extends React.Component {
  render() {
    return <h4>我从A组件接收到的主题模式:{this.props.theme}</h4>
  }
}
```

使用 context, 我们可以避免通过中间元素传递 props。

#### 2.2 类式组件

当我们想要给子类的子类传递数据时，前面我们讲过了 redux 的做法，这里介绍的 Context 我觉得也类似于 Redux

```js
// React.createContext
const MyContext = React.createContext(defaultValue);
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

**只有**当组件所处的树中没有匹配到 Provider 时，其 `defaultValue` 参数才会生效。此默认值有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 `undefined` 传递给 Provider 的 value 时，消费组件的 `defaultValue` 不会生效。

首先我们需要引入一个 `ThemeContext ` 组件，我们需要引用`ThemeContext ` 下的 `Provider`

```js
const ThemeContext  = React.createContext();
const { Provider } = ThemeContext ;
```

`Provider`译为生产者，和Consumer消费者对应。Provider会设置在外层组件中，通过`value`属性来指定Context的值。这个Context值在所有的Provider子组件中都可以访问。Context的搜索流程和JS中函数作用域类似，当我们获取Context时，React会在它的外层查找最近的Provider，然后返回它的Context值。如果没有找到Provider，则会返回Context模块中设置的默认值。

```jsx
<Provider value={{ theme }}>
    <B />
</Provider>
/* 
每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括 .contextType 和 useContext）的传播不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件跳过更新的情况下也能更新。
*/
```

但是我们需要在使用数据的组件中引入 `ThemeContext `

```js
static contextType = ThemeContext ;
```

在使用时，直接从 `this.context` 上取值即可

```js
const {theme} = this.context
```

**完整版**

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext  = React.createContext('light')

export default class A extends Component {

	state = {theme:'dark'}

	render() {
		const {theme} = this.state
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    	// 无论多深，任何组件都能读取这个值。
    	// 在这个例子中，我们将 “dark” 作为当前的值传递下去。
		return (
				<ThemeContext.Provider value={theme}>
					<B/>
				</ThemeContext.Provider>
		)
	}
}

// 中间的组件再也不必指明往下传递 theme 了。
class B extends Component {
	render() {
		return (
				<>
            		<h3>我是B组件</h3>
				   <C/>
            	 </>
		)
	}
}

class C extends Component {
	//声明接收context
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。
	static contextType = ThemeContext 
    
	render() {
		const {theme} = this.context
		return (
				<>
            		<h3>我是C组件</h3>
            		<h4>我从A组件接收到的主题模式:{theme}</h4>
            	 </>
		)
	}
} 
```

> 挂载在 class 上的 `contextType` 属性可以赋值为由 [`React.createContext()`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。此属性可以让你使用 `this.context` 来获取最近 Context 上的值。你可以在任何生命周期中访问到它，包括 render 函数中。

#### 2.3 函数组件

函数组件和类式组件只有一点点小差别

Context对象中有一个属性叫做Consumer，直译过来为消费者，如果你了解生产消费者模式这里就比较好理解了，如果没接触过，你可以将Consumer理解为数据的获取工具。你可以将它理解为一个特殊的组件，所以你需要这样使用它

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext  = React.createContext('light')
 
export default class A extends Component {

	state = {theme:'dark'}

	render() {
		const {theme} = this.state
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    	// 无论多深，任何组件都能读取这个值。
    	// 在这个例子中，我们将 “dark” 作为当前的值传递下去。
		return (
				<ThemeContext.Provider value={theme}>
					<B/>
				</ThemeContext.Provider>
		)
	}
}

// 中间的组件再也不必指明往下传递 theme 了。
class B extends Component {
	render() {
		return (
				<>
            		<h3>我是B组件</h3>
				   <C/>
            	 </>
		)
	}
}


function C(){
	return (
        <div>
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
			<ThemeContext.Consumer>
				{ctx => {
        			return (<span>ctx</span>)
        		}}
			</ThemeContext.Consumer>
			</h4>
		</div>
	)
}
```

Consumer的标签体必须是一个函数，这个函数会在组件渲染时调用并且将Context中存储的数据作为参数传递进函数，该函数的返回值将会作为组件被最终渲染到页面中。这里我们将参数命名为了ctx，在回调函数中我们就可以通过ctx.xxx访问到Context中的数据。如果需要访问多个Context可以使用多个Consumer嵌套即可。

#### 2.4 hook-useContext

通过Consumer使用Context实在是不够优雅，所以React还为我们提供了一个钩子函数`useContext()`，我们只需要将Context对象作为参数传递给钩子函数，它就会直接给我们返回Context对象中存储的数据。

因为我们平时的组件不会写的一个文件中，所以`React.createContext`要单独写在一个文件中

`store/theme-context.js`

```js
import React from "react";

const ThemeContext  = React.createContext('light')

export default ThemeContext;
```

```jsx
import React, {useContext} from 'react';
import ThemeContext from '../store/theme-context';

function C(){
    
    const ctx = useContext(TestContext);

	return (
        <div>
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
			<span>{ctx}</span>
			</h4>
		</div>
	)
}
```

### 3.错误边界

#### 3.1 基本使用

当不可控因素导致数据不正常时，我们不能直接将报错页面呈现在用户的面前，由于我们没有办法给每一个组件、每一个文件添加判断，来确保正常运行，这样很不现实，因此我们要用到**错误边界**技术

错误边界是一种 `React` 组件，这种组件**可以捕获发生在其子组件树任何位置的** **JavaScript** **错误，并打印这些错误，同时展示降级** **UI**，而并不会渲染那些发生崩溃的子组件树。**错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误**

**错误边界就是让这块组件报错的影响降到最小，不要影响到其他组件或者全局的正常运行**

> 例如 A 组件报错了，我们可以在 A 组件内添加一小段的提示，并把错误控制在 A 组件内，不影响其他组件

- 我们要对容易出错的组件的父组件做手脚，而不是组件本身

我们在父组件中通过 `getDerivedStateFromError` 来配置**子组件**出错时的处理函数

> ###  **编写生命周期函数 getDerivedStateFromError**
>
> 1. 静态函数
> 2. 运行时间点：渲染子组件的过程中，发生错误之后，在更新页面之前
> 3. **注意：只有子组件发生错误，才会运行该函数**
> 4. 该函数返回一个对象，React会将该对象的属性覆盖掉当前组件的state（必须返回 **`null`** 或者**状态对象**（State Obect））
> 5. 参数：错误对象
> 6. 通常，该函数用于改变状态

```js
state={
    hasError:false,
}

static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: error }
}
```

我们可以将 `hasError` 配置到状态当中，当 `hasError` 状态改变成 `error` 时，表明有错误发生，我们需要在组件中通过判断 `hasError` 值，来指定是否显示子组件

```js
{this.state.hasError ? <h2>Child出错啦</h2> : <Child />}
```

但是我们会发现这个效果过了几秒之后自动又出现报错页面了，那是因为**开发环境还是会报错**，**生产环境不会报错** 直接显示 要显示的文字，白话一些就是这个适用于生产环境，为了生产环境不报错。
开发中我们可以将`Child出错啦`这种错误提示换成一个错误组件。

#### 3.2 综合案例

按照React官方的约定，一个类组件定义了**static getDerivedStateFromError()** 或**componentDidCatch()** 这两个生命周期函数中的任意一个（或两个），即可被称作ErrorBoundary组件，实现错误边界的功能。

其中，getDerivedStateFromError方法被约定为渲染备用UI，componentDidCatch方法被约定为捕获打印错误信息。

> ###  **编写生命周期函数 componentDidCatch**
>
> 1. 实例方法
> 2. 运行时间点：渲染子组件的过程中，发生错误，更新页面之后，由于其运行时间点比较靠后，因此不太会在该函数中改变状态
> 3. 通常，该函数用于记录错误消息

```jsx
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            Error: null,
            ErrorInfo: null
        };
    }
    //控制渲染降级UI
    static getDerivedStateFromError(error,info) {
        return {hasError: error};
    }
    //捕获抛出异常
    componentDidCatch(error, errorInfo) {
         // 1、错误信息（error）
        // 2、错误堆栈（errorInfo)
        //传递异常信息
        this.setState((preState) => 
            ({hasError: preState.hasError, Error: error, ErrorInfo: errorInfo})
        );
                //可以将异常信息抛出给日志系统等等
                //do something....
    }
    render() {
        //如果捕获到异常，渲染降级UI
        if (this.state.hasError) {
            return <div>
                <h1>{`Error:${this.state.Error?.message}`}</h1>
                    {this.state.ErrorInfo?.componentStack}
            </div>;
        }
        return this.props.children;
    }
}
```

> 虽然函数式组件无法定义 `Error Boundary`，但 `Error Boundary` 可以捕获函数式组件的异常错误

实现ErrorBoundary组件后，我们只需要将其当作常规组件使用，将其需要捕获的组件放入其中即可。

使用方式如下：

```js
//main.js
import ReactDOM from 'react-dom/client';
import {ErrorBoundary} from './ErrorBoundary.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>
);
```

```js
//app.js
import React from 'react';
function App() {
    const [count, setCount] = useState(0);
    if (count>0){
        throw new Error('count>0!');
    }
    return (
        <div>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </div>
    );
}
export default App;
```

点击按钮后即可展示抛出异常时，应该渲染的降级UI：

![image-20221027094444543](https://gitlab.com/apzs/image/-/raw/master/image/3269915e4f64c035ae9e3ce91a8bc1af11881fbd.png)

#### 3.3 让子组件不影响父组件正常显示案例

假设B组件（子组件）的出错：users不是一个数组，却是一个字符串。此时，会触发调用`getDerivedStateFromError`，并返回状态数据`{hasError:error}`。A组件（父组件）将根据hasError值判断是渲染备用的错误页面还是B组件。

```jsx
import React, { Component } from 'react'

export default class A extends Component {
  state = { hasError: '' }
  static getDerivedStateFromError(error) {
    return {
      hasError: error,
    }
  }

  componentDidCatch(error, info) {
    console.log('error:', error)
    console.log('info:', info)
    console.log('用于统计错误信息并反馈给后台,将通知开发人员进行bug修复')
  }

  render() {
    const { hasError } = this.state
    return (
      <div className="a">
        <div>我是组件A</div>
        {hasError ? '当前网络不稳定,请稍候再试!' : <B />}
      </div>
    )
  }
}

class B extends Component {
  state = {
    users: '',
  }
  render() {
    const { users } = this.state
    return (
      <div className="b">
        <div>我是组件B</div>
        {users.map(userObj => (
          <li key={userObj.id}>
            {userObj.name}，{userObj.age}
          </li>
        ))}
      </div>
    )
  }
}
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/b79f78aeb57461debfea87d644ea5c8e4baec625.png" alt="image-20221027190233518"  />

#### 3.4 使用错误边界需要注意什么

没有什么技术栈或者技术思维是银弹，错误边界看起来用得很爽，但是需要注意以下几点：

- 错误边界实际上是用来捕获render阶段时抛出的异常，而React事件处理器中的错误并不会渲染过程中被触发，所以**错误边界捕获不到事件处理器中的错误**。
- React官方推荐使用try/catch来自行处理事件处理器中的异常。
- 错误边界无法捕获异步代码中的错误（例如 `setTimeout`或 `requestAnimationFrame`回调函数），这两个函数中的代码通常不在当前任务队列内执行。
- 目前错误边界只能在类组件中实现，也只能捕获**其子组件树**的错误信息。错误边界无法捕获自身的错误，如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，类似于JavaScript中的cantch的工作机制。
- 错误边界无法在服务端渲染中生效，因为根本的渲染方法已经`ReactDOM.createRoot().render()`修改为了`ReactDOM.hydrateRoot()`， 而上面也提到了，错误边界捕获的是render阶段时抛出的异常。

**总结：仅处理渲染子组件期间的同步错误**

### 4.路由组件的lazyLoad

懒加载在 React 中用的最多的就是路由组件了，页面刷新时，所有的页面都会重新加载，这并不是我们想要的，我们想要实现点击哪个路由链接再加载即可，这样避免了不必要的加载

![image-20221027095740307](https://gitlab.com/apzs/image/-/raw/master/image/ab202fe40dbd0d4437efa829614f5f366d1da52b.png)

我们可以发现，我们页面一加载时，所有的路由组件都会被加载

如果我们有 100 个路由组件，但是用户只点击了几个，这就会有很大的消耗，因此我们需要做懒加载处理，**我们点击哪个时，才去加载哪一个**

首先我们需要从 `react` 库中暴露一个 `lazy` 函数

> `React.lazy()` 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。

```js
import React, { Component ,lazy} from 'react';
```

然后我们需要更改引入组件的方式

```js
// 这个组件是动态加载的
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))
```

采用 `lazy` 函数包裹

![image-20221027095800440](https://gitlab.com/apzs/image/-/raw/master/image/956ae433c7a0f17a76ea7e5665e8f2e94ab3b925.png)

我们会遇到这样的错误，提示我们用一个标签包裹

这里是因为，当我们网速慢的时候，路由组件就会有可能加载不出来，页面就会白屏，它需要我们来指定一个路由组件加载的东西，相对于 loading

> `React.Suspense` 可以指定加载指示器（loading indicator），以防其组件树中的某些子组件尚未具备渲染条件。在未来，我们计划让 `Suspense` 处理更多的场景，如数据获取等。你可以在 [我们的路线图](https://zh-hans.reactjs.org/blog/2018/11/27/react-16-roadmap.html) 了解这一点。

```jsx
<Suspense fallback={<h1>loading</h1>}>
     <Routes>
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
	</Routes>
</Suspense>
```

初次登录页面的时候

![image-20221027100147592](https://gitlab.com/apzs/image/-/raw/master/image/97dbf644b51f4a7e39ea6b28f99dc498ec08ecb1.png)

注意噢，这些文件都不是路由组件，当我们点击了对应组件之后才会加载

![68747470733a2f2f6c6a63696d672e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f696d672f72656163742d657874656e73696f6e2d6c617a796c6f61642d332e676966](https://gitlab.com/apzs/image/-/raw/master/image/b03697901855aaabe2ca5aab01a20dfcbead7cd5.gif)

从上图我们可以看出，每次点击时，才会去请求 `chunk` 文件

那我们更改写的 `fallback` 有什么用呢？它会在页面还没有加载出来的时候显示

> 注意：因为 loading 是作为一个兜底的存在，因此 loading 是 必须提前引入的，不能懒加载

### 5.Fragment

我们编写组件的时候每次都需要采用一个 `div` 标签包裹，才能让它正常的编译，但是这样会引发什么问题呢？我们打开控制台看看它的层级

![image-20221027100328758](https://gitlab.com/apzs/image/-/raw/master/image/2971587bd1dbd9d07893218a1c5a86381692b3bf.png)

它包裹了几层无意义的 div 标签，我们可以采用 `Fragment` 来解决这个问题

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

首先，我们需要从 react 中暴露出 `Fragment` ，将我们所写的内容采用 `Fragment` 标签进行包裹，当它解析到 `Fragment` 标签的时候，就会把它去掉

这样我们的内容就直接挂在了 `root` 标签下

```jsx
render() {
  return (
    <React.Fragment 可选 key={xxx.id}>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

在React中为我们提供了一种更加便捷的方式，直接使用`<></>`代替Fragment更加简单：

> 同时采用空标签，也能实现，但是它不能接收任何值，而 `Fragment` 能够接收 1 个值`key`

```js
render() {
  return (
        <>
          <ChildA />
          <ChildB />
          <ChildC />
        </>
  );
}
```

## 13【react高级指引（下）】

### 1.组件优化

#### 1.1 shouldComponentUpdate 优化

在我们之前一直写的代码中，我们一直使用的`Component` 是有问题存在的

1. 只要执行 `setState` ，即使不改变状态数据，组件也会调用 `render`
2. 当前组件状态更新，也会引起子组件 `render`

而我们想要的是只有组件的 `state` 或者 `props` 数据发生改变的时候，再调用 `render`

我们可以采用重写 `shouldComponentUpdate` 的方法，但是这个方法不能根治这个问题，当状态很多时，我们没有办法增加判断

看个案例来了解下原理：

如果你的组件只有当 `props.color` 或者 `state.count` 的值改变才需要更新时，你可以使用 `shouldComponentUpdate` 来进行检查：

````jsx
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
````

在这段代码中，`shouldComponentUpdate` 仅检查了 `props.color` 或 `state.count` 是否改变。如果这些值没有改变，那么这个组件不会更新。如果你的组件更复杂一些，你可以使用类似“浅比较”的模式来检查 `props` 和 `state` 中所有的字段，以此来决定是否组件需要更新。React 已经提供了一位好帮手来帮你实现这种常见的模式 - 你只要继承 `React.PureComponent` 就行了。

#### 1.2 PureComponent 优化

这段代码可以改成以下这种更简洁的形式：

```jsx
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
```

大部分情况下，你可以使用 `React.PureComponent` 来代替手写 `shouldComponentUpdate`。但它只进行浅比较，所以当 props 或者 state 某种程度是可变的话，浅比较会有遗漏，那你就不能使用它了。当数据结构很复杂时，情况会变得麻烦。

> `PureComponent` 会对比当前对象和下一个状态的 `prop` 和 `state` ，而这个比较属于浅比较，比较基本数据类型是否相同，而对于引用数据类型，**比较的是它的引用地址是否相同，这个比较与内容无关**

```js
state = {stus:['小张','小李','小王']}

addStu = ()=>{
    /* const {stus} = this.state
    stus.unshift('小刘')
    this.setState({stus}) */

    const {stus} = this.state
    this.setState({stus:['小刘',...stus]})
}
```

注释掉的那部分，我们是用`unshift`方法为`stus`数组添加了一项，它本身的地址是不变的，这样的话会被当做没有产生变化(因为引用数据类型比较的是地址)，所以我们平时都是采用合并数组的方式去更新数组。

#### 1.3 案例

```jsx
import React, { PureComponent } from 'react'
import "./index.css";

export default class A extends PureComponent {
  state = {
    username:"张三"
  }

  handleClick = () => {
    this.setState({})
  }

  render() {
    console.log("A:enter render()")
    const {username} = this.state;
    const {handleClick} = this;

    return (
      <div className="a">
        <div>我是组件A</div>
        <span>我的username是{username}</span>&nbsp;&nbsp;
        <button onClick={handleClick}>执行setState且不改变状态数据</button>
        <B/>
      </div>
    )
  }
}

class B extends PureComponent{
  render(){
    console.log("B:enter render()")
    return (
      <div className="b">
        <div>我是组件B</div>
      </div>
    )
  }
}

```

点击按钮后不会有任何变化，render函数也没有调用

![image-20221027191454468](https://gitlab.com/apzs/image/-/raw/master/image/fb16728a87c04da136da2a965d4980bd70580234.png)

修改代码

```js
handleClick = () => {
    this.setState({
      username: '李四',
    })
}
```

点击按钮后只有`A`组件的`render`函数会调用

![image-20221027192124322](https://gitlab.com/apzs/image/-/raw/master/image/f0022ed007d420efc7b284799314e5f2bfa944db.png)

修改代码

```js
handleClick = () => {
    const { state } = this
    state.username = '李四'
    this.setState(state)
}
```

![image-20221027192253591](https://gitlab.com/apzs/image/-/raw/master/image/8cb94c97d7c461cc870ad0e5cb3a1e370d33f95c.png)

点击后不会有任何变化，`render`函数没有调用，这个时候其实是`shouldComponentUpdate`返回的`false`。

### 2.Render Props

**如何向组件内部动态传入带内容的结构(标签)?**

```css
Vue中: 
	使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
React中:
	使用children props: 通过组件标签体传入结构
	使用render props: 通过组件标签属性传入结构, 一般用render函数属性
```

**children props**

```jsx
render() {
    return (
            <A>
              <B>xxxx</B>
            </A>
    )
}


问题: 如果B组件需要A组件内的数据, ==> 做不到 
```

术语 [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

采用 render props 技术，我们可以像组件内部动态传入带有内容的结构

> 当我们在一个组件标签中填写内容时，这个内容会被定义为 children props，我们可以通过 `this.props.children` 来获取

例如：

```html
<A>hello</A>
```

这个 hello 我们就可以通过 children 来获取

而我们所说的 render props 就是在组件标签中传入一个 render 方法(名字可以自己定义，这个名字更语义化)，又因为属于 props ，因而被叫做了 render props

```jsx
<A render={(name) => <B name={name} />} />
A组件: {this.props.render(内部state数据)}
B组件: 读取A组件传入的数据显示 {this.props.data} 
```

你可以把 `render` 看作是 `props`，只是它有特殊作用，当然它也可以用其他名字来命名

在上面的代码中，我们需要在 A 组件中预留出 B 组件渲染的位置 在需要的位置上加上`{this.props.render(name)}`

那我们在 B 组件中，如何接收 A 组件传递的 `name` 值呢？通过 `this.props.name` 的方式

```jsx
export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				<A render={ name => (<B name={name}/>) }/>
			</div>
		)
	}
}

class A extends Component {
	state = {name:'tom'}
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{this.props.render(name)}
			</div>
		)
	}
}

class B extends Component {
	render() {
		console.log('B--render');
		return (
			<div className="b">
				<h3>我是B组件,{this.props.name}</h3>
			</div>
		)
	}
}

```

### 3.Portal

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

> 李立超老师的博客
>
> 这篇博客对于Portal的引出我觉得写的很好
>
> [portal – 李立超 | lilichao.com](https://www.lilichao.com/index.php/2022/03/22/portal/)

#### 3.1 问题的引出

在React中，父组件引入子组件后，子组件会直接在父组件内部渲染。换句话说，React元素中的子组件，在DOM中，也会是其父组件对应DOM的后代元素。

但是，在有些场景下如果将子组件直接渲染为父组件的后代，在网页显示时会出现一些问题。比如，需要在React中添加一个会盖住其他元素的Backdrop组件，Backdrop显示后，页面中所有的元素都会被遮盖。很显然这里需要用到定位，但是如果将遮罩层直接在当前组件中渲染的话，遮罩层会成为当前组件的后代元素。如果此时，当前元素后边的兄弟元素中有开启定位的情况出现，且层级不低于当前元素时，便会出现盖住遮罩层的情况。

```jsx
const Backdrop = () => {
    
  return <div
           style={
                  {
                    position:'fixed',
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    background:'rgba(0,0,0,.3)',
                    zIndex:9999
                  }
                }
           >
  </div>
};

const Box = props => {
    
  return <div
          style={
              {
                width:100,
                height:100,
                background:props.bgColor
              }
            }
           >
             {props.children}
           </div>
};

const App = () => {
    
  return (
  		<div>
            <Box bgColor='yellowgreen'>
            <Backdrop/>
            </Box>
            <Box bgColor='orange' />
  		</div>;
  )
};
```

上例代码中，App组件中引入了两个Box组件，一个绿色，一个橙色。绿色组件中引入了Backdrop组件，Backdrop组件是一个遮罩层，可以在覆盖住整个网页。

现在三个组件的关系是，绿色Box是橙色Box的兄弟元素，Backdrop是绿色Box的子元素。如果Box组件没有开启定位，遮罩层可以正常显示覆盖整个页面。

![image-20221029232123087](https://gitlab.com/apzs/image/-/raw/master/image/24f29c3777968ed6c976c7144938653880f7b9fc.png)

Backdrop能够盖住页面

但是如果为Box开启定位，并设置层级会出现什么情况呢？

```jsx
const Box = props => {
    
  return <div
           style={
                  {
                    width:100,
                    height:100,
                    background:props.bgColor,
                    position:'relative',
                    zIndex:1
                  }
                }
            >
             {props.children}
           </div>
};
```

现在修改Box组件，开启相对定位，并设置了z-index为1，结果页面变成了这个样子：

![image-20221029232209420](https://gitlab.com/apzs/image/-/raw/master/image/949222a13cb1e7048d3e5982e8631431b3922ab2.png)

和上图对比，显然橙色的box没有被盖住，这是为什么呢？首先我们来看看他们的结构：

```jsx
<App>
    <绿色Box>
            <遮罩/>
    </绿色Box>
    <橙色Box/>
</App>
```

绿色Box和橙色Box都开启了定位，且z-index相同都为1，但是由于橙色在后边，所以实际层级是高于绿色的。由于绿色是遮罩层的父元素，所以即使遮罩的层级是9999也依然盖不住橙色。

问题出在了哪？遮罩层的作用，是用来盖住其他元素的，它本就不该作为Box的子元素出现，作为子元素了，就难免会出现类似问题。所以我们需要在Box中使用遮罩，但是又不能使他成为Box的子元素。怎么办呢？React为我们提供了一个“传送门”可以将元素传送到指定的位置上。

通过ReactDOM中的createPortal()方法，可以在渲染元素时将元素渲染到网页中的指定位置。这个方法就和他的名字一样，给React元素开启了一个传送门，让它可以去到它应该去的地方。

#### 3.2 Portal的用法

1. 在index.html中添加一个新的元素
2. 在组件中中通过ReactDOM.createPortal()将元素渲染到新建的元素中

在index.html中添加新元素：

```html
<div id="backdrop"></div>
```

修改Backdrop组件：

```jsx
const backdropDOM = document.getElementById('backdrop');

const Backdrop = () => {
  return ReactDOM.createPortal(
  		<div
           style={
                  {
                    position:'fixed',
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    zIndex:9999,
                    background:'rgba(0,0,0,.3)'
                  }
                }
           >
 		 </div>,
      backdropDOM
  );
};
```

如此一来，我们虽然是在Box中引入了Backdrop，但是由于在Backdrop中开启了“传送门”，Backdrop就会直接渲染到网页中id为backdrop的div中，这样一来上边的问题就解决了

#### 3.3 通过 Portal 进行事件冒泡

尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 portal 仍存在于 *React 树*， 且与 *DOM 树* 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。

这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至包含 *React 树*的祖先，即便这些元素并不是 *DOM 树* 中的祖先。假设存在如下 HTML 结构：

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

在 `#app-root` 里的 `Parent` 组件能够捕获到未被捕获的从兄弟节点 `#modal-root` 冒泡上来的事件。

```jsx
// 在 DOM 中有两个容器是兄弟级 （siblings）
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // 在 Modal 的所有子元素被挂载后，
    // 这个 portal 元素会被嵌入到 DOM 树中，
    // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
    // 如果要求子组件在挂载时可以立刻接入 DOM 树，
    // 例如衡量一个 DOM 节点，
    // 或者在后代节点中使用 ‘autoFocus’，
    // 则需添加 state 到 Modal 中，
    // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // 当子元素里的按钮被点击时，
    // 这个将会被触发更新父元素的 state，
    // 即使这个按钮在 DOM 中不是直接关联的后代
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // 这个按钮的点击事件会冒泡到父元素
  // 因为这里没有定义 'onClick' 属性
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

const root = ReactDOM.createRoot(appRoot);
root.render(<Parent />);
```

![image-20221029233009114](https://gitlab.com/apzs/image/-/raw/master/image/05f650b10fafb40e1a7a4d1ac26072afa414afa2.png)

点击click后,可以发现数字从0变成1了

![image-20221029233124852](https://gitlab.com/apzs/image/-/raw/master/image/a64a35bc5b691c67fc361986e4770c75fd9bf4df.png)

子组件`Child`的点击事件能冒泡到父组件`Parent `,触发父元素的点击事件

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/jGBWpE)

在父组件里捕获一个来自 portal 冒泡上来的事件，使之能够在开发时具有不完全依赖于 portal 的更为灵活的抽象。例如，如果你在渲染一个 `<Modal />` 组件，无论其是否采用 portal 实现，父组件都能够捕获其事件。

