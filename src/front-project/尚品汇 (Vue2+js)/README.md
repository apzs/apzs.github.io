尚品汇项目学习笔记
=====================

 课程链接：[尚硅谷VUE项目实战，前端项目-尚品汇(大型\\重磅)\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1Vf4y1T7bw "尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)_哔哩哔哩_bilibili")

参考笔记： 

https://gitee.com/mfx_mmc/shangPinHuiAPP

https://blog.csdn.net/qq_45847016/category_11682565.html

https://blog.csdn.net/qq_49575831/article/details/127482266

https://blog.csdn.net/yuran1/article/details/126712531

https://blog.csdn.net/weixin_43424325/article/details/121684101

一、创建vue-cli项目
--------

本项目使用vue-cli搭建，需要准备的初始环境有:[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020).js   webpack

安装nodejs对应链接 [Node.js](https://nodejs.org/zh-cn/ "Node.js")

安装[webpack](https://so.csdn.net/so/search?q=webpack&spm=1001.2101.3001.7020)对应链接 [webpack](https://webpack.docschina.org/ "webpack")

上面的初始环境配置好了后，全局安装vue-cli脚手架：

```js
num install -g @vue/cli
```

在电脑中创建目录`project-SHP`

在对应目录下创建项目——创建项目命令：(选`vue2`)

```js
vue create app
```

![image-20221203114244547](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203114244547.png)

创建好项目后，先了解对应的目录结构

|                   |                                                              |
| ----------------- | ------------------------------------------------------------ |
| node_modules      | 项目依赖文件夹                                               |
| public            | 静态资源目录，单页面应用SPA就是基于此文件夹中的index.html创建的。一般放置一些静态资源（图片等），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中 |
| src               | 程序员源代码文件夹，你所写的代码都在这里assets放置静态资源（一般放置多个组件共用的静态资源），在webpack打包时，会把此文件夹中的静态资源当做一个模块打包到js文件中components放置非路由组件（全局组件）App.vue项目的唯一根组件，vue当中的组件都是.vuemain.js程序入口文件，也是整个程序当中最先执行的文件 |
| .gitgnore         | git忽略文件，一般不碰它                                      |
| babel.config.js   | 配置文件，与babel相关，功能很多，比如可以把ES6自动翻译为ES5  |
| package.json      | 项目信息，类似人的身份证，记录了项目叫什么、有哪些依赖、项目怎么运行等 |
| package-lock.json | 缓存性文件，记录了项目中的依赖包是哪里来的，方便后续的扩展和变更 |
| README.md         | 说明性文件，对于项目创建、运行、安装依赖等，都有基础的语法命令说明 |

如果出现了如下的错误，可以使用管理员方式运行

```
 Error: command failed: npm install --loglevel error
```

![image-20221203114434728](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203114434728.png)

或将`C:\Users\[用户名]\.vuerc`文件的`useTaobaoRegistry`修改为`ture`（亲测不生效，还是使用管理员吧）

![image-20221203114630243](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203114630243.png)

## 二、项目的其他配置

### 1、项目运行时，浏览器自启动

可以使用下面的命令运行项目：

```js
npm run serve
```

项目运行后，浏览器不会自动打开，需要手动配置：

package.json文件里面是一个对象，只需要在`package.json`文件中的`script`属性里，对应的serve属性值后面加上open即可：

```js
"serve": "vue-cli-service serve --open",
```

![image-20221203115639598](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203115639598.png)

### 2、eslint校验功能关闭

eslint校验很严格，比如声明了的变量，如果没有使用的话，eslint校验工具就会进行报错，对于日常开发来说不太友好，需要进行配置：

在根目录下创建`vue.config.js`文件，并在其中添加以下代码：

```js
module.exports={
    // 关闭eslint
    lintOnSave:false
}
```

![image-20221203120331502](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203120331502.png)

### 3、src文件夹别名

src目录中的文件很多，对于需要import的目录，可能需要写很多的路径，可以将src目录配置为@ (现在已经默认有了，不需要配置)

在根目录下创建`jsconfig.json`文件并添加如下代码：（这个文件是告诉vscode用的，表示说@代表你配置的这个src目录，你之后引入的所有文件，凡是带了@的，都会到对应的src目录中找，而使用exclude将node\_modules和dist排除后，vscode就不会在这两个目录里面查找文件了，提高效率）

```js
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

 @代表src文件夹，如果将来文件过多，找的时候会很方便

**注意：@符简写不应该在node\_modules 和dist目录中使用！效率会变低，上面有说明！**

## 三、项目路由分析

线上项目链接：[gulishop](http://82.156.11.187/ title=)

 根据页面，可以将项目分为 上-中-下 结构：

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5YuH5b6A55u05YmNXg==,size_19,color_FFFFFF,t_70,g_se,x_16.png)

 ![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5YuH5b6A55u05YmNXg==,size_20,color_FFFFFF,t_70,g_se,x_16.png)

 ![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5YuH5b6A55u05YmNXg==,size_20,color_FFFFFF,t_70,g_se,x_16-1670038081163102.png)

 通过点击各个按钮，可以基本分析出以下结构——

路由组件：Home首页路由组件、Search路由组件、login登录路由、register注册路由

非路由组件：Header（所有页面都有）、Footer(首页、搜索页)

## 四、使用`less`

创建Header和Footer非路由组件

(1) 在开发项目的时候：

1. 书写静态页面（HTML+CSS）

2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成相应的动态业务逻辑

(2} 那么非路由组件创建在哪里？

​    在src文件夹下创建components文件夹，在该文件夹中分别创建Header和Footer文件夹，用于实现非路由组件。

（在创建组件时，需要注意三要素：组件结构+组件的样式+图片资源）

(3) 在非路由组件文件夹中，创建vue类型的文件：index.vue

对于样式，如果采用的是less样式，浏览器不能识别less样式，需要通过less、less-loader进行处理，把less样式变为css样式，这样浏览器才能识别。

### 1、安装`less`和`less-loader`依赖

先安装less-loader依赖（这里需要注意，版本不能过高，否则不能使用，这里选择5版本，如果不说明默认是最高版本）

```bash
npm install --save less less-loader@5
```

![](https://gitlab.com/apzs/image/-/raw/master/image/cb521805586341619badd9e3119ed774-1670057691195157.png)

### 2、style标签添加`lang=lees`属性

还需要在`src\components\Header\index.vue`文件的style标签的身上加上`lang=lees`

![](https://gitlab.com/apzs/image/-/raw/master/image/ef6a0db16c604a9aa4141f07ec95b32b-1670057691195159.png)

对于图片资源，在非路由组件文件中创建一个images文件夹，用于存放数据

（4）当组件创建好之后，就要使用该组件了，步骤为：引入----注册----使用

`src\App.vue`

![](https://gitlab.com/apzs/image/-/raw/master/image/9bfc38aee8604969a549a2f5fb8f4170-1670057691195161.png)

## 五、完成路由组件的搭建

### 1、安装vue-router插件

(使用vue2需要指定版本)

```
npm install vue-router@3.5.3
```

![](https://gitlab.com/apzs/image/-/raw/master/image/eee83c2d7b5a4a7983af5e1c8f9b9391-1670057691195163.png)

###  2、创建路由组件

通过上面分析，路由组件应该有四个：Home、Search、Login、Register，

那么路由组件通常创建在哪里呢？在src文件夹下创建pages文件夹，在该文件夹中分别创建Home、Search、Login、Register文件夹，用于实现路由组件。

![image-20221203170314544](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203170314544.png)

### 3、配置路由

在src文件夹下创建router文件夹，在该文件夹中创建一个index.js文件，用来配置路由信息(`src\router\index.js`)

![](https://gitlab.com/apzs/image/-/raw/master/image/d101c2de555d481e8ea97a41dd64fc5d-1670057691195165.png)

配置路由的时候，还要实现【重定向】，即在项目跑起来的时候，当访问 / 时，会立马定位到首页

![](https://gitlab.com/apzs/image/-/raw/master/image/4b066b4e004345f1a497265841e1222c-1670057691195167.png)

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
// 配置使用路由插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 配置路由
export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        {
            path: "/search/:keyword",
            component: Search

        },
        // 重定向
        {
            path: '*',
            redirect: "/home"
        }
    ]
})
```

### 4、注册路由

接着，在`src\main.js`文件中【引入路由】和【注册路由】

![](https://gitlab.com/apzs/image/-/raw/master/image/98ace467420442a1bbbb49e22bdf6117-1670057691196169.png)

PS:当这里书写router的时候，不管是路由组件还是非路由组件，身上都拥有$route、$router属性

- `$route`：一般获取路由信息【路径、query、params】

- `$router`：一般进行编程式路由导航进行路由跳转【push | replace】

###  5、展示路由

最后还要展示路由，即在`src\App.vue`文件中设置【路由组件出口的地方】

![](https://gitlab.com/apzs/image/-/raw/master/image/18ea9e61e2b8427db1a9218a5f1a9876-1670057691196171.png)

###  6、路由组件和非路由组件的区别？

1. 路由组件一般放在views和pages文件夹；非路由组件放在components文件夹中

2. 路由组件一般需要在router文件夹中进行注册，使用的即为组件的名字；非路由组件在使用的时候一般都是以标签的形式使用。

3. 注册完路由，不管是路由组件还是非路由组件，身上都有$route和$router属性

### 7、路由跳转

有两种形式：

1. 声明式导航router-link，可以进行路由的跳转 ` <router-link *to*="/login">登录</router-link>`

2. 编程式导航push|replace，可以进行路由跳转 `this.$router.push("/search")`

声明式导航能做的，编程式导航都能做，但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑。

#### 声明式导航

在`src\components\Header\index.vue`中设置路由跳转

![](https://gitlab.com/apzs/image/-/raw/master/image/45f36668526f4260b73f002c24a31a84-1670057691196173.png)

#### 编程式导航

![](https://gitlab.com/apzs/image/-/raw/master/image/e6dcabb76d294290bebfa078e08f41b1-1670057691196175.png)

## 六、利用【路由元信息】实现显示或隐藏组件

分析Footer组件：实现它在Home、Search中显示，在Register、Login中隐藏

（1）方法一（不推荐）：在上节中，我们知道这时组件已经具备$route属性，可以获取路由路径

在`src\App.vue`文件中修改`Footer`组件

```vue
<!-- 显示或者隐藏组件：v-if、v-show（这里采用v-show，性能更好，不频繁操作DOM）-->
<Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer>
```

![](https://gitlab.com/apzs/image/-/raw/master/image/5ea8ad4d17f147fa84b68e18e4f29280-1670057691196177.png)

（2）方法二（推荐）：即利用【路由元信息】

这里放上有关路由元信息的官方文档内容：[路由元信息 | Vue Router](https://router.vuejs.org/zh/guide/advanced/meta.html "路由元信息 | Vue Router")

找到`src\router\index.js`文件，将【谁可以具有Footer组件的信息】通过接收属性对象的meta属性来实现，并且它可以在路由地址和导航守卫上都被访问到。

![](https://gitlab.com/apzs/image/-/raw/master/image/a72a4c0fda5745b6bdcdefd8a90e85af-1670057691196179.png)

 然后在`src\App.vue`文件中，进行`$route.meta.show`判断，如果为真则显示，如果为假则隐藏

![](https://gitlab.com/apzs/image/-/raw/master/image/90684a7488a4450ab50b3d7e016d786e-1670057691196181.png)

## 七、路由传递参数方式

我们已经了解到路由跳转有两种方式：声明式导航、编程式导航

路由进行传参时，参数一般有种写法：

- params参数: 属于路径当中的一部分，在配置路由的时候需要【占位】

- query参数: 不属于路径当中的一部分，类似于ajax中的queryString，不需要占位

### 1、字符串形式

#### 1.先在路由配置信息中进行占位

`src\router\index.js`

![](https://gitlab.com/apzs/image/-/raw/master/image/e09e2e7ffa6846128c0c566f1d65bbb6-1670057691196183.png)

#### 2.进行路由push跳转

跳转到search页面时传递相应的【路由参数】    

`src\components\Header\index.vue`

![](https://gitlab.com/apzs/image/-/raw/master/image/11b8f41f783b4cf0b6a716d353594334-1670057691196185.png)

#### 3.获取params参数

这时在Search页面中，通过【路由信息】就可以获取到params参数

`src\pages\Search\index.vue`

```html
<h1>params参数：{{$route.params.keyword}}</h1>
<h1>query参数：{{$route.query.k}}</h1>
```

![](https://gitlab.com/apzs/image/-/raw/master/image/643a93cf14ed4f53b9f482dfd07125c7-1670057691196187.png)

###   2、模板字符串

1. 第一步和上个方法相同

2. 和上个方法的第二部有些区别，采用模板字符串的方式
3.  接收参数和上个方法相同

`src\components\Header\index.vue`

```js
this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
```

![](https://gitlab.com/apzs/image/-/raw/master/image/315babccb21b457c89f8b49c44a667ca-1670057691196189.png)

### 3、对象

#### 1、设置路由名

当使用【对象】的方式进行传参，传入的参数又是params参数时，需要在路由配置信息`src\router\index.js`中为路由设置【名字】，name: "XXX"

![](https://gitlab.com/apzs/image/-/raw/master/image/7691f92107fb4d18a0285851d797a84d-1670057691196191.png)

#### 2、传递参数

`src\components\Header\index.vue`形式如下图所示

```js
this.$router.push({
    name:'search',
    params:{
        keyword:this.keyword
    },
    query:{
        k:this.keyword.toUpperCase()
    }}
});
```

![image-20221203175550090](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203175550090.png)

####  3.接收参数和上个方法相同

## 面试题

### 1、路由传递参数（对象写法）path是否可以结合params参数一起使用?

不可以：不能这样书写，程序会崩掉

不可以用path和params配置的组合, 只能用name和params配置的组合

query配置可以与path或name进行组合使用

### 如何指定params参数可传可不传

`src\router\index.js`文件，params参数占位了，但是不传递params参数会怎么样

```js
{
    path:'/search/:keyword',
    component: SearchIndex,
    meta:{show:true},
    name:"search"
}
```

`src\components\Header\index.vue`

```js
$router.push({
	name:"search",
	query:{k:keyword.value.toUpperCase()}
})
```

> 这里我配置路由时，params参数占位了，但是我实际传递时，并没有params参数，只有query参数。

> 这时候它的**路径就会有问题**。 比如，此时我是在localhost/home 。 按理说点一下搜索按钮，至少路径应该是localhost/search 吧。如果传参了，后面应该会跟参数。
>
> 比如 params参数为abc，query参数为ABC 。 跳转的路径应该是localhost/search/abc?k=ABC
>
> 但如果占位而不传递params的话，它的路径是 localhost/?k=ABC （它**连/search都没了！！！**）

所以如何去指定params可传可不传呢？在`src\router\index.js`文件 配置路由后，占位的后面加上一个问号？ （就表示params可传递或不传递）

```js
{
    path:'/search/:keyword?',
    component: SearchIndex,
    meta:{show:true},
    name:"search"
}
```

### params参数可传可不传，但如果传递是空串，如何解决 

按照上面的步骤，指定了params可传可不传，但是我实际传递时，传了params参数只不过是个空串，会怎样？

`src\router\index.js`

```js
{
    path:'/search/:keyword?',
    component: SearchIndex,
    meta:{show:true},
    name:"search"
}
```

同样的，它的路径也会出问题，也是会少了`/search`

解决： 使用undefined解决params参数可以传递、不传递（空的字符串）

`src\components\Header\index.vue`

```js
$router.push({
	name:"search",
	params:{keyword: '' || undefined},
	query:{k:keyword.value.toUpperCase()}
})
```

### 路由组件能不能传递props数据

可以。 有三种写法

`src\components\Header\index.vue`

```js
this.$router.push({
    name:'search',
    params:{
        keyword:this.keyword
    },
    query:{
        k:this.keyword.toUpperCase()
    }}
});
```

`src\router\index.js`中

```js
const routes = [
    {
        path:'/search/:keyword',
        component: SearchIndex,
        meta:{show:true},
        name:"search",
        // 路由组件能不能传递props数据？   可以！
        // 第一种：布尔值写法 - 只能传params参数,不能传query参数
        // props:true
 
        // 第二种：对象写法,额外给路由组件传递一些props
        // props:{a:1,b:2}
 
        // 第三种：函数写法 （最常见） params参数、query参数，通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k};
        }
        // 简写形式(需要把返回的对象用括号包起来)
        // props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    },
    ...
]
```

`src\pages\Search\index.vue`中

```vue
<template>
  <div>
    我是搜索
    <h1>params参数---{{$route.params.keyword}}---{{keyword}}</h1>
    <h1>query参数---{{$route.query.k}}---{{k}}</h1>
  </div>
</template>
 
<script>
export default {
  props:['keyword','k']
}
</script>
 
<style>
 
</style>
```

![](https://gitlab.com/apzs/image/-/raw/master/image/b236709476bd4e06b3f3d58c3bcbdb28.png)

![](https://gitlab.com/apzs/image/-/raw/master/image/c91700d5ef6f43dc9b062abcd1519bfa.png)

>  不过好像实际中也很少用到props数据，（但似乎一定程度上可以解耦吧）

## 八、重写push和replace方法

![img](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5YuH5b6A55u05YmNXg==,size_13,color_FFFFFF,t_70,g_se,x_16.png)

路由跳转分为声明式导航和编程式导航，声明式导航没有此类问题，因为vue-router底层已经处理好了。

编程式导航出现警告错误是因为当使用this.$router.push()方法时，其返回的是一个Promise参数，可以通过给push方法传递相应的成功、或失败的回调函数，来捕获当前错误进行解决（治标不治本），相当于每个push都要加两个回调函数：

【问题】：编程式路由导航跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误？（但不影响最终的结果）   而声明式导航是没有这类问题的，因为vue-router底层就已经处理好了。

【原因】：最新的vue-router引入了promise，即调用push方法会返回promise对象，但没有向其中传入成功的回调和失败的回调。

【解决方法1】：在调用push方法时，就传入成功和失败的回调。（可以捕获出error看看错误类型）但是这种方法治标不治本。将来在别的组件中，不管是push还是replace，编程式导航还是有类似的错误。这样一次次解决下去太麻烦了。

```js
goSearch(){
    // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
    this.$router.push({
        name: "search",
        params: {keyword:this.keyword},
        // 解决传递的参数为空串导致 /search 丢失的问题
        // params: '' || undefined,
        query: {k: this.keyword.toUpperCase()}
    },()=>{},(error)=>{
        console.log(error);
    })
}
```

![](https://gitlab.com/apzs/image/-/raw/master/image/8bee86122dfe4987a0d4e209856f1f35-1670057691196195.png)

【解决方法2】：首先搞清楚上段代码中的this是什么、`this.$router`是什么、push是什么

this：当前组件实例

this.$router属性：这个属性的属性值是VueRouter类的一个实例，即当在入口文件注册路由的时候，给组件实例添加的$router和$route属性

push：VueRouter类原型上的方法

为了更好的理解`this.$router.push()`方法，我们根据这三个的特性实现简单的伪代码

```js
//构造函数VueRouter
function VueRouter(){
 
}
//原型对象上的方法
VueRouter.prototype.push = function(){
    //函数的上下位为VueRouter类的一个实例
}
//实例化一个VueRouter对象
let $router = new VueRouter();
 
$router.push(xxx);
```

因此想要治本，必须重写VueRouter原型上的push方法。在有【路由配置信息】的文件(`src\router\index.js`)中进行重写，因为在这个文件中，我们是可以获取到VueRouter类的

```js
// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
 
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        // 不能直接使用originPush()，如果直接使用originPush()，会导致上下文变为window
        // call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，需要传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
};
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        // call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，需要传递数组
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
};
```

![](https://gitlab.com/apzs/image/-/raw/master/image/8ed380bc1c5e47bcb6238b64d512bf60-1670057691196197.png)

（replace方法重写和上述类似）

##  九、Home首页组件拆分业务分析

【第一个组件】：因为【三级联动组件】在很多页面中都使用了，因此将其拆分成一个全局组件，哪里想用就用哪里（红色框出来的就是三级联动的展示）。

![](https://gitlab.com/apzs/image/-/raw/master/image/7b1548b55dd14e75836937a946a2353e-1670057691196199.png)

 【第二个组件】：轮播图+尚品汇快报 

![](https://gitlab.com/apzs/image/-/raw/master/image/581bd97a23174c6ea6a5e2a27023e056-1670057691196201.png)

【第三个组件】：今日推荐

![](https://gitlab.com/apzs/image/-/raw/master/image/7cf4a6c5e87d4978a64f30ba4cb4ec65-1670057691196203.png)

【第四个组件】：排行榜

![](https://gitlab.com/apzs/image/-/raw/master/image/de69d450e9264d729f4015860c7849f3-1670057691196207.png)

【第五个组件】：猜你喜欢

![](https://gitlab.com/apzs/image/-/raw/master/image/6c8b7c2cfb3f4f5ead355541385915c6-1670057691196205.png)

【第六个组件】：家用电器|手机通讯等，组件可被复用

![](https://gitlab.com/apzs/image/-/raw/master/image/55031be6cf5f483287ce47535ad62a3b-1670057691196209.png)

 【第七个组件】：商品`logo`

![](https://gitlab.com/apzs/image/-/raw/master/image/d35e64885c974a0d90ef3391ce5a985d-1670057691196211.png)

##  十、完成三级联动全局组件

（1）在`page`文件夹中的`Home`文件夹下，新建一个文件夹`TypeNav`，在该文件夹中创建`index.vue`文件，用来配置【三级联动组件】的内容

（2）在`HTML`静态资源中找到有关【三级联动】的结构代码，把代码内容放入到`index.vue`文件的`template`标签中。

（3）在css|less静态资源中找到有关【三级联动】的代码，将代码内容放入到index.vue文件的style标签中，并设置lang属性，以便能够正常处理less

`src\pages\Home\TypeNav\index.vue`

![image-20221203214644029](https://gitlab.com/apzs/image/-/raw/master/image/image-20221203214644029.png)

 （4）将该组件注册为全局组件：找到入口文件main.js，在该文件中将【三级联动组件】注册为全局组件。

```js
//将三级联动组件注册为全局组件
import TypeNav from '@/pages/Home/TypeNav';
//注册全局组件
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name,TypeNav);
```

![](https://gitlab.com/apzs/image/-/raw/master/image/0a00a22f2bdc4a6aaa72cb6a1719a06c-1670057691196217.png)

 （5）此时【三级联动组件】已经注册为全局组件，在其他地方使用它时，不需要进行引入和注册，直接使用即可。

`src\pages\Home\index.vue`

![](https://gitlab.com/apzs/image/-/raw/master/image/cd3005d10f134d928c22624e93cf5db9-1670057691197219.png)

##  十一、Home首页拆分静态组件

拆分时要注意三部分：HTML、CSS、图片资源

（1）创建一个名为ListContainer的组件(`src\pages\Home\ListContainer\index.vue`)，按上小节的步骤对HTML和CSS进行拆分，这里需要注意的是：HTML中图片资源的路径可能已经发生了变化，需要根据目前的路径进行修改。

![image-20221204102139278](https://gitlab.com/apzs/image/-/raw/master/image/image-20221204102139278.png)

（2）该组件创建好之后，在Home组件中进行【引入】、【注册】和【使用】

![](https://gitlab.com/apzs/image/-/raw/master/image/ecb8a3faebcc48948769bd5a31a0d4f3-1670057691197221.png)

（Recommend组件、Rank组件、TypeNav组件、Like组件的【创建、引入、注册和使用方式】和上述相同，这里不再赘述）

##  十二、使用【POSTMAN工具】测试接口       

测试后端给的接口是不是可用，后端通常会给出服务器地址、请求地址、请求方式等等信息。根据这些信息，在POSTMAN工具中配置好这些信息。（现在已更新为  http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList ）

![](https://gitlab.com/apzs/image/-/raw/master/image/43bcbb253e6b4de7be8427825a10c6fa-1670057691197225.png)

## 十三、对axios进行二次封装

首先，搞清楚为什么要进行二次封装？因为我们想使用请求拦截器和响应拦截器

【请求拦截器】：在发请求之前可以处理一些业务

【响应拦截器】：当服务器返回数据之后，可以处理一些业务

* * *

使用前先进行安装：

```bash
npm install --save axios
```

可以在package.json中查看是否已经安装成功，如下

* * *

在项目中通常使用API文件夹放置【axios】相关内容，因此在src文件夹中创建一个api文件夹

在api文件夹中创建一个request.js的文件，在其中实现axios的二次封装，代码如下

`src\api\request.js`

```js
// 对于axios进行二次封装
import axios from "axios";
 
// 1、利用axios对象的方法create,去创建一个axios实例
// 2、requests就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:'/api',
    // 代表请求超时的时间为5s
    timeout:5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要——header 请求头
    return config;
});
// 响应拦截器:
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以监测到，可以做一些事情
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
})
 
 
// 对外暴露axios
export default requests;
```

## 十四、接口统一管理

如果项目规模很小，完全可以在组件的生命周期函数中发请求

如果项目规模比较大，会存在这样一种情况：有几十个组件使用了这个接口，后期接口变动了，就得一个个去修改组件当中接口的内容，很不方便。因此采用【接口统一管理】

* * *

在api文件夹中新创建一个js文件，名为index，在其中进行接口的统一管理

`src\api\index.js`

```js
//当前这个模块：API进行统一管理
import requests from './request';
 
//三级联动接口  
//暴露这个函数，外面拿到这个函数，直接调用，就能发送请求获取数据了
export const reqCategoryList = ()=>{
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
```

* * *

测试之后，发现请求发生404错误，这是因为【跨域问题】（其实是没指定后台的url，访问的是`http://localhost:8080`）

解决跨域问题的方法有很多，这里采用【代理服务器】去解决，在根目录下的`vue.config.js`文件中进行配置

```js
module.exports = {
  //打包时不要有map文件
  productionSourceMap:false,
  //关闭校验工具
  lintOnSave:false,
  //代理跨域
  devServer:{
    proxy:{
      '/api':{ //遇到带有api的请求，代理服务器才会将其转发
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''},
      }
    }
  }
}
```

注意：这是一个配置文件，写好之后需要重新运行一下才可以~

## 十五、nprogress进度条的使用

先下载nprogress进度条：

```bash
npm install --save nprogress
```

下载完成之后在package.json中查看是否安装成功。

* * *

nprogress进度条需要在请求拦截器和响应拦截器中去使用

先引入进度条：import nprogress from 'nprogress'

还要引入进度条样式：import "nprogress/nprogress.css"

【请求拦截器】：启动进度条 nprogress.start( )

【响应拦截器】：结束进度条nprogress.done( )

`src\api\request.js`

![image-20221204105911852](https://gitlab.com/apzs/image/-/raw/master/image/image-20221204105911852.png)

```js
// 对于axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// 1、利用axios对象的方法create,去创建一个axios实例
// 2、requests就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:'/api',
    // 代表请求超时的时间为5s
    timeout:5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以监测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要——header 请求头
    nprogress.start();
    return config;
});
// 响应拦截器:
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以监测到，可以做一些事情
    nprogress.done();
    return res.data;
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'));
})
 
 
// 对外暴露axios
export default requests;
```

## 十六、VUEX模块式开发

vuex是官方提供的一个插件，是一个状态管理库，集中式管理项目中组件共用的数据。

vuex主要是用于 项目大、组件多的情况下，各个组件之间的关系比较复杂，数据的传递就显得繁杂，很难管理，vuex可以集中式管理这些数据。

vuex：并不是所有的项目都需要vuex，如果项目很小，则不需要；如果项目比较大，则需要使用vuex进行数据的统一管理

先安装vuex：npm install --save vuex，

```bash
npm install vuex@3.6.2
```

下载完成之后在package.json中查看是否安装成功

在src中新建一个文件夹store，用来实现vuex，创建index.js文件进行配置

`src\store\index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)
//state:仓库存储数据的地方
const state = {}
//mutation:修改state的唯一手段
const mutations = {}
//actions:可以书写自己的业务逻辑，也可以处理异步
const actions = {}
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {} 

//对外暴露Store类的一个实例
export default new Vuex.Store({
        state,
        mutations,
        actions,
        getters
})
```

还要在入口文件main.js中引入这个仓库：import store from '@/store' 并进行注册

`src\main.js`

```js
import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
//三级联动组件+全局组件
import TypeNav from '@/pages/Home/TypeNav'
// 引入仓库
import store from "@/store"

// 注册全局组件
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  // 注册路由信息，注册后不管是路由组件还是非路由组件，身上都有$route和$router属性
  // $route一般用于获取路径、params query参数；
  // $router一般用于跳转路径，push replace等
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store
}).$mount('#app')
```

简单使用

`src\store\index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)

//actions:可以书写自己的业务逻辑，也可以处理异步
const actions = {
        add({ commit }) {
                commit("ADD");
        }
}
//mutation:修改state的唯一手段
const mutations = {
        ADD(state) {
                state.count++;
        }
}
//state:仓库存储数据的地方
const state = {
        count: 1
}
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

//对外暴露Store类的一个实例
export default new Vuex.Store({
        actions,
        mutations,
        state,
        getters
})
```

`src\pages\Home\index.vue`

```vue
<template>
    <div>
        <button @click="add">点击我加上1</button>
        <span>仓库的数量{{count}}</span>
        <button>点击我减去1</button>
    </div>
</template>

<script>

import {mapState} from 'vuex';

export default {
    name: 'Home',
    computed:{
        ...mapState(['count'])
    },
    methods: {
        add(){
            //this.$store.dispatch("add"); // 调用action里的add()
            this.$store.commit("ADD") // 调用mutations里的 ADD(state, count)
        }
    }
}
</script>
```

* * *

接下来就要进行vuex的模块化开发了

为什么需要模块化开发？如果项目过大，组件过多，接口也很多，数据也很多，store对象会变得相当臃肿，因此可以让vuex实现模块化开发，即把一个大仓库拆分成一个个的小仓库。

可以给home、search等这样的模块单独设置一个store小模块，然后再把小模块混入到大模块中

`src\store\home\index.js`小仓库：

```js
//home模块的小仓库
const state = {};
const mutations = {};
const actions = {};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
```

`src\store\index.js`大仓库：

```js
//大仓库
import Vue from 'vue'
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex)
//引入小仓库
import home from './home'
import search from './search'
 
//对外暴露Store类的一个实例
export default new Vuex.Store({
   //实现Vuex仓库模块式开发存储数据
   modules:{
       home,
       search
   }
})
```

## 十七、动态展示三级联动

【三级联动】组件是一个全局组件，放在components文件夹中。

下面这个图就很好地展现出组件是如何获取数据的、仓库是如何去请求数据的

![](https://gitlab.com/apzs/image/-/raw/master/image/0421b1aad124473fad8d8e35fe0fbf9a-1670057691197223.png)

 对三级联动组件TypeNav进行配置，将`TypeNav`组件移动到`components`文件夹中

`src\components\TypeNav\index.vue`

```vue
<script>
import {mapState} from 'vuex';
 
export default {
    name:'TypeNav',
    //组建挂载完毕：可以向服务器发请求
    mounted() {
        //通知vuex发请求，获取数据，存储于仓库中
        this.$store.dispatch('categoryList') //考虑到性能将其挪到了【App.vue】
    },
    computed:{
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，这指的是大仓库中的数据
            categoryList:(state)=>{
                return state.home.categoryList;
            }
        })
    }
};
</script>
```

 找到home模块的小仓库，进行配置

`src\store\home\index.js`

```js
import {reqCategoryList} from '@/api'; 
//home模块的小仓库
const state = {
    //state中数据默认初始值别瞎写 【根据接口的返回值去初始化】
    categoryList:[],
};
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
};
const actions = {
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){ //对commit进行解构赋值
        let result = await reqCategoryList();
        if(result.code === 200){
            commit("CATEGORYLIST",result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
```

注：

这段代码（`async`和`await`均为`es6`语法）

```js
async categoryList(){
    let res = await reqCategoryList();
    console.log(res);
}
```

与下面的代码输出的结果一样

```js
categoryList(){
    reqCategoryList().then((res)=>{
    console.log(res)
    });
}
```

* * *

通过以上步骤，三级联动组件TypeNav就已经获取到数据啦！接下来就要把数据展示到页面上了。

对代码进行分析，发现一级目录很多，如下图这样：

![](https://gitlab.com/apzs/image/-/raw/master/image/cbd119a31af640b7805b3cf353251a8d-1670057691197227.png)

`src\components\TypeNav\index.vue`

 因此可以只留一个，并通过v-for进行优化

```html
<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
```

 则一级目录的a标签名称也要改

```html
<a href=" ">{{c1.categoryName}}</a>
```

二级分类也很多，同样采用v-for进行优化

```html
<div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId" >
```

则二级目录的a标签名称也要改变

```html
<a>{{c2.categoryName}}</a>
```

三级分类也很多，同样采用v-for进行优化

```html
<em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
```

则三级目录的a标签名称也要改变

```html
<a>{{c3.categoryName}}</a>
```

## 十八、三级联动动态背景颜色

第一种解决方案：直接添加CSS样式（这里不用，因为很简单，来些具有挑战性的，哈哈哈）

第二种解决方案：动态添加类名

先来理一下思路：

`src\components\TypeNav\index.vue`

1\. 在data中定义一个变量，名为currentIndex，初始值设置为-1（不能设置为0-15之间的数，总共有16个标题）

```js
data() {
	return {
		//存储用户鼠标移上哪一个一级分类
		currentIndex: -1
	}
},
```

2\. 为标题绑定一个原生JS事件mouseenter，并传入index，事件的回调函数定义在methods中，在回调函数中，将传入的值赋给currentIndex，这样就能拿到鼠标移动到的当前标题的index了

```html
<h3 @mouseenter="changeIndex(index)">
```

添加方法：

```js
methods: {
    changeIndex(index) {
        this.currentIndex = index;
    }
}
```

3\. 在一级标题的循环中，判断currentIndex==index是否成立，成立的话就添加一个类，这个类就实现了添加背景色的效果。

```html
<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
```

添加样式

```css
.cur {
	background-color: skyblue;
}
```

实现完成之后，发现存在一个问题，鼠标移除之后还有背景颜色，这是不合理的，应该背景颜色去掉才可以。出现问题不用慌，解决就是了，再给标题添加一个鼠标移除事件喽，

![GIF 2022-12-4 15-26-38](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-12-4 15-26-38.gif)

为标题绑定一个原生JS事件mouseleave，并传入index，事件的回调函数定义在methods中。

```html
<h3 @mouseenter="changeIndex(index)" @mouseleave="leaveIndex">
```

在回调函数中，将传入的值赋给currentIndex，这样就能拿到鼠标移动到的当前标题的index了

```js
methods: {
    changeIndex(index) {
        this.currentIndex = index;
    },
    leaveIndex(){
        this.currentIndex = -1;
    }
}
```

![image-20221204153827122](https://gitlab.com/apzs/image/-/raw/master/image/image-20221204153827122.png)

但是又出现了一个问题，鼠标移到“全部商品分类”上，背景颜色应该还是存在的。（个人觉得这个实现完全没必要，看起来更像是个BUG，为了练手，还是实现一下吧）

![GIF 2022-12-4 15-41-27](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-12-4 15-41-27.gif)

 其实就用到了事件委派，就把`全部商品分类`和`三级联动`放在同一个div中，且二者是兄弟关系，然后给他们的父亲加上` @mouseleave="leaveShow"`

```html
<!-- 事件的委派 -->
<div @mouseleave="leaveShow">
     <h2 class="all">全部商品分类</h2>
     <!-- 三级联动 -->
     <div class="sort">
     </div>
</div>
```

![image-20221204154422320](https://gitlab.com/apzs/image/-/raw/master/image/image-20221204154422320.png)

这样，最总效果就达成了

![GIF 2022-12-4 15-46-29](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-12-4 15-46-29.gif)

## 十九、通过JS控制二三级分类的显示与隐藏

鼠标移动到哪个标题，就展示哪个标题下的二三级分类列表

第一种解决方案：直接改变CSS样式

第二种解决方案：通过JS实现

先注释掉css样式

```less
&:hover {
    .item-list {
        display: block;
    }
}
```

思路：在上一节中，我们已经通过事件监听将一级标题的index传递给了data中的currentIndex变量，如果index==currentIndex，则将二三级分类的样式设置为display:'block'，否则设置为“none”

```html
<div class="item-list clearfix" :style="{display:(currentIndex == index ? 'block':'none')}">
```

## 二十、引入防抖与节流

![](https://gitlab.com/apzs/image/-/raw/master/image/84e995f03bff48ff8d559c27161a4ac4-1670057691197231.png)

防抖：前面的所有的触发都被取消，最后一次执行在规定时间之后才会触发，也就是说如果连续快速地触发，只会执行一次。

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发。

* * *

实现的时候利用一个插件，叫做lodash，里面封装了防抖与节流的业务【闭包+延时器】

这里举一个**防抖的小栗子**：输入框输入数据时，进行Ajax请求

如果不采用防抖的话，每输入一个字就要发一次请求，假如我们输入“梅西世界杯”，会发送五次请求。这并不满足我们的实际需求，我们想要输入完这五个字，才会发送请求，因此采用防抖技术进行解决。

```js
let input = document.querySelector('imput')
//不加防抖
input.oninput = function(){
    //这里放ajax发请求的代码
}
//加了防抖
input.oninput = _.debounce(function(){
    //这里放ajax发请求的代码
}，1000);
```

这里举一个**节流的小栗子**：实现一个简单的计时器，即点击按钮，实现数字元素的增加

```js
<h1>我是计时器<span>0</span></h1>
<button>点击我加上1</button>
....
 
let span = document.querySelector('span');
let button = document.querySelector('button');
let count = 0;
//未加节流
button.onclick = function(){
    count++;
    span.innerHTML = count;
}
//加了节流
button.onclick = _.throttle(function(){
    count++;
    span.innerHTML = count;
},1000);
```

* * *

在项目中实现节流：三级联动这里用户的交互操作可能会过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象。

vue脚手架中已经下载好了lodash，可直接全部引入lodash内容：` import _ from 'lodash' `

如果没有，也可以使用如下命令下载`lodash`

```bash
npm i --save lodash
```

这里我们可以按需引入，只引入节流：`import throttle from 'lodash/throttle';`

```js
//未加节流的代码
changeIndex(index){
	this.currentIndex = index;
}
//加了节流的代码
//throttle回调函数别用箭头函数，可能会出现上下文this
changeIndex:throttle(function(index){
	//index：鼠标移上某一个一级分类的元素的索引值
	//正常情况（用户慢慢地操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
	//非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
	//就是由于用户的行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象。        
	this.currentIndex = index;
},50),
```

`src\components\TypeNav\index.vue`

![image-20221204181653681](https://gitlab.com/apzs/image/-/raw/master/image/image-20221204181653681.png)

## 二十一、三级联动路由跳转分析

关于路由，我发了一篇vue-router思维导图的文章，可以帮助大家回忆起相关内容

链接在此：[vue路由知识点概括--思维导图\_yuran1的博客-CSDN博客](https://blog.csdn.net/yuran1/article/details/128139355?spm=1001.2014.3001.5501 "vue路由知识点概括--思维导图_yuran1的博客-CSDN博客")

* * *

对于三级联动，用户可以点击的：一级分类、二级分类、三级分类，当我们从Home模块跳转到Search模块时，一级会把用户选中的产品（比如产品的名字、产品的ID）在路由跳转的时候进行相应的传递。

注意：这里如果使用的是声明式路由导航，可以实现路由的跳转与传递参数，但需要注意，会出现卡顿的现象，这是为什么呢？

```html
<router-link to="/search">{{c1.categoryName}}</router-link>
```

![image-20221204180758905](https://gitlab.com/apzs/image/-/raw/master/image/image-20221204180758905.png)

原因：router-link可以看作是组件，当服务器的数据返回之后，由于v-for的设置，会循环出很多的router-link组件，这种方法很消耗内存，所以会出现卡顿的现象。因此这里采用**编程式路由导航**。

![GIF 2022-12-4 18-08-58](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-12-4 18-08-58.gif)

* * *

但是那么多a标签，都给它们绑定click事件的回调函数的话，肯定太繁琐、太消耗内存了。

事件委派又派上用场了，我们把click事件的回调函数放在父元素身上，不用再一一绑定了。

```html
<div class="all-sort-list2" @click="goSearch">
```

## 二十二、实现三级联动的路由跳转与传递参数

**利用事件委派之后，还存在一些问题：**

1\. 你怎么知道点击的一定是a标签的？也有可能是div、h3等标签

2\. 如何获取参数呢？【1、2、3级分类的产品的名字、id】，如何区分1、2、3级分类的标签？



为了解决上述问题，这里利用【自定义属性】来解决

为解决第一个问题：为a标签加上自定义属性data-categoryName，其余的子节点是没有的。

```html
//一级分类
<a :data-categoryName="c1.categoryName">{{ c1.categoryName }}</a>
//二级分类
<a :data-categoryName="c2.categoryName">{{ c2.categoryName }}</a>
//三级分类
<a :data-categoryName="c3.categoryName">{{ c3.categoryName }}</a>
```

在前面的章节中，我们可以知道goSearch( )函数中放置的是进行路由跳转的方法

我们点击子节点就可以触发goSearch( )这个回调函数，在函数中通过event.target拿到被点击的节点元素element，节点身上有一个属性dataset属性，可以获取节点的自定义属性与属性值，可以通过解构赋值取出来，如果有categoryname属性，那么被点击的就是a标签了

* * *

为解决第二个问题：分别为1、2、3级的a标签加上自定义属性data-category1Id、data-category2Id、data-category3Id，其余的子节点是没有的。

```html
<a :data-categoryName="c1.categoryName" 
   :data-category1Id="c1.categoryId"
>{{ c1.categoryName }}</a>
 
<a :data-categoryName="c2.categoryName" 
   :data-category1Id="c2.categoryId"
>{{ c2.categoryName }}</a>
 
<a :data-categoryName="c3.categoryName" 
   :data-category1Id="c3.categoryId"
>{{ c3.categoryName }}</a>
```

采取和判断a节点一样的方法，判断点击的节点是1级、2级还是3级，这里不再赘述了。

自定义属性设置完成后，开始属性goSearch方法，为了利用自定义属性，因此需要为goSearch方法传递参数event。具体代码如下所示。（需要注意，在自定义属性中我们用的驼峰命名法，但是在goSearch方法中，全部变成了小写，这是因为自定义属性在渲染后自动变成了小写）

```js
goSearch(event) {
    //获取到当前触发这个事件的节点，从中筛选出带有data-categoryname这样的节点
    //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
    let element = event.target;
    //获取到的变量已经不是驼峰形式了，自动改变的
    let { categoryname, category1id, category2id, category3id } =
      element.dataset;
    if (categoryname) {
      //整理路由跳转的参数
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      //一级分类、二级分类、三级分类的a标签
      if (category1id) {
        query.category1Id = category1id;
      } else if    (category2id) {
        query.category2Id = category2id;
      } else {
        query.category3Id = category3id;
      }
      location.query = query;
      //路由跳转
      this.$router.push(location);
    }
},
```

注意：有些同学有疑惑了，自定义属性为data-categoryName，那么判断条件应该这样写

```js
if(data-categoryName) {......}
```

然而实际上是这样写的：

```js
if(categoryname) {......}
```

原因是：需要在定义属性的时候在前面加上data-才能被dataset函数获取，因此data-只是一个前缀，其次浏览器会自动将属性名转化为小写。

二十三、Search组件中的商品分类与过渡动画
-------------------

#### 选择性展示

当页面是首页时，三级联动组件一直展示，当页面为非首页时（以search页面为例）三级联动组件只有鼠标放上去才展示，鼠标离开就消失。具体效果图如下所示。

首先分析，根据页面的不同三级联动组件的展示也不同，因此可以通过v-show来进行页面展示效果的控制。首先定义一个控制页面的数据show先默认它为true。如下所示  

`src\components\TypeNav\index.vue`

```js
data() {
    return {
        currentIndex: -1,
        show: true,
    }
},
```

![](https://gitlab.com/apzs/image/-/raw/master/image/51830e076500433b94ee5f4021f8fb7d.png)

当三级联动组件挂载完成是，查询一下当前所在页面，如果所在页面为/home则展示页面，否则不展示。

```js
mounted() {
    // 通知Vuex发请求，获取数据，存储与仓库当中。
    this.$store.dispatch("categoryList");
    // 如果不是home组件，对typenav进行隐藏
    if(this.$route.path!="/home"){
        this.show = false;
    }
},
```

![](https://gitlab.com/apzs/image/-/raw/master/image/837c553bc51045a1af909b3b4880168d.png) 

此时完成了当页面为home时，三级联动组件展示，当页面为search时，三级联动组件隐藏的功能。
接下来完成鼠标控制search页面中的三级联动组件展示效果的功能。

首先给三级联动所在的标签绑定事件（鼠标进入事件与鼠标离开事件）如下所示

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_18,color_FFFFFF,t_70,g_se,x_16.png) 

绑定完成后，书写绑定方法，具体代码如下所示。此时该效果完成。 

```js
leaveIndex() {
    this.currentIndex = -1;
    //当不是home页面的时候，如果鼠标离开就隐藏
    if(this.$route.path!='/home'){
        this.show = false;
    }
},
//鼠标进入进行展示
enterShow(){
    if(this.$route.path!='/home'){
        this.show = true;
    }
}
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_17,color_FFFFFF,t_70,g_se,x_16-16701603553692.png)

#### 过渡动画效果

首先过渡动画的前提条件是（组件或者元素务必有v-if或者v-show指令)。只有满足该条件才可以设置过渡动画

首先将实现过渡效果的地方包裹在transition标签内，如果transition没有设置name，就可以通过v-enter等设置动画效果，如果transition设置了name（假如设置name=‘sort’）那么就通过 sort-enter等设置动画效果  

不用name的写法如下所示 

`src\components\TypeNav\index.vue`

![](https://gitlab.com/apzs/image/-/raw/master/image/5680f4d875d4464fa893b4107f070ed9.png) 

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_12,color_FFFFFF,t_70,g_se,x_16.png) 

使用name的写法 

```html
//过渡动画
<transition name="sort">
	//三级联动
	<div class="sort" v-show="show">
		...
	</div>
</transition>
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_19,color_FFFFFF,t_70,g_se,x_16.png) 

```js
//过渡动画开始进入
.sort-enter{
	height: 0px;
	//transform: rotate(0deg);
}
//过渡动画进入结束
.sort-enter-to{
	height: 461px;
	//transform: rotate(360deg);
}
//动画时间与速率
.sort-enter-active{
	transition: all .5s linear;
}
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_14,color_FFFFFF,t_70,g_se,x_16.png)

## 二十四、TypeNav商品分类列表的优化

当前项目存在着如下问题：当 typeNav组件调用的时候，页面就会发送一个请求，如果反复切换home和search页，就会反复发请求，影响性能。如图所示  

![](https://gitlab.com/apzs/image/-/raw/master/image/149830511f984ac9b704c336b8a33f77.png)  

原因：从Home模块跳转到Search模块：首先TypeNav在Home模块中挂载时，会向后台请求数据，当跳转到Search模块时，Home组件销毁，当中的TypeNav也销毁，Search组件挂载，当中的TypeNav也挂载，挂载时又要发一次请求。

首先执行入口文件main.js，其中有App路由组件，她是唯一一个根组件，因此不管如何，她都只会挂载一次。那我们把TypeNav中派发action的操作（用于请求数据）放在App.vue中，就能实现仅请求一次的效果了。

如果放在main.js中可行吗？不行，因为main.js不是一个组件，而是一个js文件，派发action时，this为undefined

`src\components\TypeNav\index.vue`

```js
this.$store.dispatch("categoryList");
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_15,color_FFFFFF,t_70,g_se,x_16.png)  

`src\App.vue`

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_13,color_FFFFFF,t_70,g_se,x_16.png)  

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_12,color_FFFFFF,t_70,g_se,x_16.png)

二十五、合并params和query参数
------------------------------------------------------------------------------------

目前项目存在一个问题就是，当通过三级联动进入search后在从搜索框输入数据会导致传输的数据丢失。同理当从搜索框输入数据后再点击三级联动也会产生数据丢失。具体问题如下所示

  ![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16.png)  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-16703310701481.png)  针对这种情况就需要合并参数。具体步骤如下，首先找到三级联动组件，找到路由跳转。在跳转前先进行一个判断，如果在跳转前发现有params数据，就保留下来。同理在首页的路由跳转也进行一个判断，如果在跳转前发现有query数据，同样保留下来。具体代码如下所示。  

`src\components\TypeNav\index.vue`

```js
goSearch(event) {
	.
	.
	.
	//判断：如果路由跳转的时候，带有params参数，携带参数传递过去
	if (this.$route.params) {
		location.params = this.$route.params;
		//整理完参数
		location.query = query;
		//路由跳转
		this.$router.push(location);
	}
},
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-16703310701492.png)

然后，在head组件中，点击搜索时进行路由跳转，如果有query参数，要和params一起捎带过去

`src\components\Header\index.vue`  

```js
goSearch(){
	.
	.
	.
	//如果有query也携带过去
	if(this.$route.query){
		let location = {name:'search',params:{keyword:this.keyword || undefined}}
		location.query = this.$route.query;
		this.$router.push(location)
	}
},
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-16703310701493.png)  
修改完成后，同样按照上述步骤先点击三级联动组件的电子书，再点击搜索新书，现在的结果如下。同理先点击新书再点击三级联动组件的电子书也是同样的结果。 
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-16703310701494.png)

## 二十六、mockjs模拟数据

由于服务器没有提供首页中的ListContainer组件与Floor组件的数据，因此为了展示，采用mock数据。mock数据不会和服务器进行任何通信。  

首先安装mockjs插件。然后在src文件夹下创建mock文件夹，用来提供假数据。接下来准备json数据。将准备好的banner.json与floor.json填入mock文件夹如下图所示。

```bash
npm install mockjs
```

`src\mock\floor.json`

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198852923.png)  

接下来把mock数据需要的图片放置到public文件夹中（public文件夹在打包的时候会原封不动打包到dist文件夹中)然后开始利用mockjs来虚拟数据。  

`public\images`

![](https://gitlab.com/apzs/image/-/raw/master/image/823866d4c79f46bcafb790a7a8f58756.png)

虚拟数据步骤，首先在src文件夹下的mock文件夹建立mockServer.js文件。随后在该文件中同通过import引入mockjs模块与准备好的json数据通过调用mockjs的mock方法模拟数据。接下来在入口文件引入mockServer文件（不引入前面就相当于白写。）  

`src\mock\mockServer.js`

```js
// 利用mockjs提供mock接口
import Mock from 'mockjs'
// JSON数据格式根本没有对外暴露，但是可以引入
// webpack默认对外暴露的：图片、JSON数据格式
import floors from './floors.json'
import banners from './banners.json'
 
// 提供广告轮播接口  第一个参数是请求地址，第二个参数是请求数据
Mock.mock('/mock/banners', {code: 200, data: banners})//模拟首页大的轮播图的数据
// 提供floor接口
Mock.mock('/mock/floors', {code: 200, data: floors})
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198852924.png)

`src\main.js`

  ![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198852925.png)

## 二十七、获取Banner轮播图数据

接下来通过axios发送数据请求，由于之前封装过一次axios，当时的基础路径设置为/api。而现在这个mock数据的基础路径是/mock因此可以复制之前封装的axios并命名为`mockAjax.js`,然后把`mockAjax.js`里基础路径改为/mock  

`src\api\mockAjax.js`

```js
//对axios进行二次封装，
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//在当前模块中引入store
//引入进度条的样式
import "nprogress/nprogress.css"
 
// 利用axios对象得方法create，去创建一个axios实例
// request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中会出现api
    baseURL:'/mock',
    //代表请求超时的时间5S
    timeout:5000
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要，header请求头
    //进度条开始动
    nprogress.start();
    return config;
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
},(error)=>{
    console.log(error)
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})
 
//对外暴露
export default requests;
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198852926.png)  
设置完成后，随后使用api中的index.js文件发送请求（以获取banner为例)。首先由于再次封装axios，所以需要在index.js文件中通过import引入。随后暴露函数。如下图所示。

`src\api\index.js`

```js
//当前这个模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax'
 
//三级联动接口  
//暴露这个函数，外面拿到这个函数，直接调用，就能发送请求获取数据了
export const reqCategoryList = ()=>{
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

export const reqGetBannerList = ()=>{
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return mockRequests({
        url:'/banner',
        method:'get'
    })
}
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853027.png) 
接下来将请求的数据存储到仓库中。由于轮播图在ListContainer组件中，因此先找到ListContainer文件夹下的index.vue组件。在其挂载完成生命周期钩子中派发action，由于ListContainer组件也在home主页中，因此去home仓库在存储。具体代码如下所示。 

`src\pages\Home\ListContainer\index.vue`

```js
mounted() {
    this.$store.dispatch('getBannerList');
}
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_17,color_FFFFFF,t_70,g_se,x_16.png)

`src\store\home\index.js`

```js
const state = {
    ...
    //轮播图的数据
    bannerList:[]
};
const actions = {
    .
    .
    .
    //获取首页轮播图的数据
    async getBannerList({commit}){
      let result = await reqGetBannerList();
      if(result.code == 200){
          commit('GETBANNERLIST',result.data)
      }
    }
};
const mutations = {
    ...
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    }
};
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_16,color_FFFFFF,t_70,g_se,x_16.png)  

数据存储到仓库完成之后，组件上还是没有数据，数据需要去仓库中获取。此时再回到ListContainer文件夹下的index.vue文件，去获取仓库数据。获取步骤，首先通过import引入mapState，然后利用计算属性进行操作，具体代码如下所示。此时ListContainer组件拿到了数据。  

`src\pages\Home\ListContainer\index.vue`

```js
import {mapState} from 'vuex';
 
export default {
    name:'ListContainer',
    mounted() {
        this.$store.dispatch('getBannerList');
    }
    computed:{
        ...mapState({
            bannerList:state => state.home.bannerList
        })
    },   
}
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853028.png) 
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_16,color_FFFFFF,t_70,g_se,x_16-167033198853029.png)

## 二十八、Banner实现轮播图

安装swiper
--------

安装代码如下所示

```bash
npm install swiper@5
```


轮播图的实现
------

轮播图实现的步骤分为三步，首先引入包与样式，然后设置页面结构，最后通过new Swiper实例添加动态效果（注意new Swiper的时候一定要保证页面结构完整）。  
因此结合实现步骤，第一步首先找到ListContainer文件夹下的index.vue文件，在里面通过import引入swiper包。由于ListContainer与Floor组件中的轮播图样式一样，因此可以在入口文件main.js中引入样式，这样这俩组件就可以直接使用，无需在自身重复引入。

```js
import Swiper from 'swiper';
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_15,color_FFFFFF,t_70,g_se,x_16-167033198853130.png)

```js
import "swiper/css/swiper.css";
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_15,color_FFFFFF,t_70,g_se,x_16-167033198853131.png)  
第二步设置页面结构 

```js
<template>
    <div class="list-container">
        <div class="sortList clearfix">
            <div class="center">
                <!--banner轮播-->
                <div class="swiper-container" id="mySwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(carousel,index) in bannerList" :key="carousel.id">
                            <img :src="carousel.imgUrl" />
                        </div>
	...
</template>
```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853132.png)  

第三步new Swiper实例  

因为new Swiper的时候一定要保证页面结构完整，所以注意不能放置在mounted中。原因如下：通常来说mounted表示挂载完成，页面结构完整，但是在这里，因为涉及到异步语句，所以此时如果放在mounted中，页面结构并不完整，因此放在mounted中不合适，放进去也不会生成动态效果。  

为了解决这个问题，有两种解决方案。  

第一种：针对存在异步语句的问题可以利用setTimeout等待异步语句执行完成后再new Swiper实例，具体如下所示。这种方法存在缺陷，即不会立刻就可以使用，需要等待计时器时间到了才可使用轮播图。  
第二种：通过watch监听bannerList的变化。原因：bannerList数据会变化，最开始是空数组，后来变成四个元素。但是注意不可以直接再watch中的handler中直接new Swiper实例，如果直接new Swiper实例还是不能添加动态效果，需要再handler中利用nextTick。  

**nextTick的效果是在下次DOM更新，循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM。具体代码如下所示。**  

缺点：无法确定用户请求到底需要多长时间，因此没办法确定延迟器时间

```js
mounted() {
    setTimeout(()=>{
      let mySwiper = new Swiper(...)
    },2000)
  },

```

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853133.png)



`this. $nextTick`：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

```vue
<template>
   <!--banner轮播-->
     <div class="swiper-container" ref="mySwiper">
       <div class="swiper-wrapper">
         <div class="swiper-slide" v-for="(carouse,index) in bannerList" :key="carouse.id">
           <img :src="carouse.imgUrl" />
         </div>
       </div>
       <!-- 如果需要分页器 -->
       <div class="swiper-pagination"></div>
       <!-- 如果需要导航按钮 -->
       <div class="swiper-button-prev" ></div>
       <div class="swiper-button-next"></div>
     </div>
   </div>
</template>
<script>
// 引入Swiper
import Swiper from 'swiper'
// 引入Swiper样式
import 'swiper/css/swiper.css'
import {mapState} from "vuex";
export default {
  mounted() {
    // ajax请求轮播图图片
    this.$store.dispatch("getBannerList")
  },
  computed:{
    ...mapState({
      // 从仓库中获取轮播图数据
      bannerList: (state) => {return state.home.bannerList}
    })
  },
  watch:{
    bannerList(newValue,oldValue){
        // this.$nextTick()使用
        this.$nextTick(()=>{
          let mySwiper = new Swiper(this.$refs.mySwiper,{
            pagination:{
              el: '.swiper-pagination',
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          })
        })
    }
  }
}
</script>
```


![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853134.png)

floor组件修改
=========

整体流程和ListContainer类似，因此截取关键图片说明。

获取floor数据
---------

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853135.png)

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853136.png)  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853237.png)  
此时数据都在home组件上，而不是直接在floor组件上，如果floor组件想用数据，那么还涉及到组件通信（home->floor父传子 可用props）。  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853238.png)

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_15,color_FFFFFF,t_70,g_se,x_16-167033198853239.png)  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_15,color_FFFFFF,t_70,g_se,x_16-167033198853240.png)

动态展示floor组件
-----------

将上一步请求到的数据替换原来floor组件中写死的数据。  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853241.png)  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_17,color_FFFFFF,t_70,g_se,x_16-167033198853242.png)  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853243.png)  
调整floor组件中的轮播图。注意此处可以在mounted中修改，原因是这个组件没有发送请求，而是直接获取的数据，因此不存在异步操作等问题，因此可以直接如下图一样new Swiper实例。  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853244.png)

floor组件最终效果
-----------

数据替换完成后，floor组件的效果如下。  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853245.png)

全局组件Carousel
============

全局组件注册
------

经过上述的步骤，我们发现，ListContainer组件与Floor组件都存在着轮播图，并且功能基本一致，因此为了优化代码，本次定义一个全局轮播图组件Carousel，方便轮播图的使用。具体步骤如下。为了封装成全局组件，需要Floor组件与ListContainer组件中关于轮播图的js代码基本一致。为了达到一致的效果，使Floor组件中关于轮播图的代码改写成ListContainer组件中关于轮播图的代码。此时ListContainer改写后的轮播图动态实例与Floor改写后的轮播图动态实例如下图所示。  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853346.png)

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_20,color_FFFFFF,t_70,g_se,x_16-167033198853347.png)  
接下来封装全局组件。首先在components文件夹下创建Carousel文件夹并在此文件夹创建Index.vue.在该文件书写的内容如下所示。

```vue
<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="index"
      >
        
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      //立即监听的原因：因为list是传输过来的数据，因此在这监听不到list数据的变化，只能通过立即监听才能执行下面的handler
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构还是没办法确定，因此还是需要nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>
```


书写完成之后回到入口文件，注册全局组件。  
![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_18,color_FFFFFF,t_70,g_se,x_16.png)

全局组件使用
------

注册完成之后，改写之前的ListContainer组件与Floor组件。  ![](https://gitlab.com/apzs/image/-/raw/master/image/5db9ba47ebd746e3914987edbcef53ff.png)  ![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAUmV2aW4wNTA=,size_17,color_FFFFFF,t_70,g_se,x_16-167033198853348.png)

 
