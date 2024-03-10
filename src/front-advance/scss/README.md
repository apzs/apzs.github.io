## 一、Scss 基础

Scss 在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，实现更高效地开发网站前端。

中文文档： [Sass教程 Sass中文文档 | Sass中文网](https://www.sass.hk/docs/)

英文文档：[Sass: Documentation (sass-lang.com)](https://sass-lang.com/documentation/)

项目源码：[GitHub - sass/sass: Sass makes CSS fun!](https://github.com/sass/sass)

### 1.1 功能特点

- 完全兼容 CSS3
- 在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能
- 通过函数进行颜色值与属性值的运算
- 提供控制指令 (control directives)等高级功能
- 自定义输出格式

### 1.2 安装`Live Sass Compiler`插件

![image-20230213105521693](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105521693.png)



![image-20230213105634312](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105634312.png)



![image-20230213105639963](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105639963.png)

将`settings.json`文件里自动生成的如下代码删掉

```json
"liveSassCompile.settings.autoprefix": [

]
```

修改为如下代码：

```json
{
    // "liveSassCompile.settings.autoprefix": [

    // ]
    "liveSassCompile.settings.formats":[
        // This is Default.
        {
            /**
                :nested     - 嵌套格式
                :expanded   - 展开格式
                :compact    - 紧凑模式
                :compressed - 压缩格式
            */
            "format": "compact",     // 可定制的出口css样式（expanded，compact，compressed，nested）
            "extensionName": ".css",
            "savePath": "~/../css"   // 默认为null，表示当前目录 
        },
    ],
    // 排除的目录
    "liveSassCompile.settings.excludeList": [
        "**/node_modules/**",
        ".vscode/**"
    ],
    // 是否生成对应的map
    "liveSassCompile.settings.generateMap": true,
    // 是否添加兼容前缀 例如： -webkit- -moz-  等（比如flex布局有些浏览器需要添加一些兼容性代码）
    "liveSassCompile.settings.autoprefix": [
        "> 1%",
        "last 2 versions"
    ],
    "explorer.confirmDelete": false
}
```

![image-20230213105918944](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105918944.png)

新建`css.scss`文件，编写如下代码，点击右下角的`Watch scss`使其变成`Watching...`，即可生成对应的`css.css`和`css.css.map`，此时如果更改`css.scss`文件内容即可自动更新。

```scss
$baseColor: #333;
p{
    color: $baseColor;
}
```

![image-20230213111135990](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213111135990.png)

兼容性支持：我们使用`display: flex;`

```scss
$baseColor: #333;
p{
    color: $baseColor;
    font-size: 12px;
    display: flex;
}
```

会自动给我们添加一些兼容性代码

```css
p { color: #333; font-size: 12px; display: -webkit-box; display: -ms-flexbox; display: flex; }
/*# sourceMappingURL=css.css.map */
```

![image-20230213113006042](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213113006042.png)

我们可以在`index.html`文件里引入`css/css.css`，在`scss/css.scss`里写样式，这样可以自动更新`css/css.css`。

可以看到这个`Live Sass Compiler`已经弃用了

![image-20230213151045985](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213151045985.png)

我们可以使用如下这个插件

![image-20230213151102776](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213151102776.png)

修改`settings.json`里的`liveSassCompile.settings.excludeList`配置

```json
// 排除的目录
"liveSassCompile.settings.excludeList": [
"/**/node_modules/**",
"/.vscode/**"
],
```



### 1.3 模式

修改`scss/css.scss`文件为如下所示

```scss
html{
    font-size: 12px;
    color: #333;
}

.container {
    font-size: 14px;
    .header {
        width: 50px;
        height: 30px;
        .left {
            float:left;
        }
    }
    .footer {
        background-color: green;
    }
    &::after{
        display: inline-block;
    }
}
```

#### 1.3.1、嵌套模式（`nested`）

新版本的`sass-loader`不支持这种模式，新版本的`Live Sass Compiler`也不支持

```bash
Compilation Error
Error: Invalid argument(s): Unsupported output style "nested".
--------------------
Watching...
--------------------
```

![image-20230213151914201](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213151914201.png)

#### 1.3.2、展开模式（`expanded`）

展开格式就是平时我们写`css`的格式，适合开发使用

```css
html {
  font-size: 12px;
  color: #333;
}

.container {
  font-size: 14px;
}
.container .header {
  width: 50px;
  height: 30px;
}
.container .header .left {
  float: left;
}
.container .footer {
  background-color: green;
}
.container::after {
  display: inline-block;
}/*# sourceMappingURL=css.css.map */
```

![image-20230213152048359](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213152048359.png)

#### 1.3.3、紧凑模式（`compact`）

```bash
Compilation Error
Error: Invalid argument(s): Unsupported output style "compact".
--------------------
Watching...
--------------------
```

![image-20230213153328796](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213153328796.png)

#### 1.3.4、压缩模式（`compressed`）

压缩格式就是样式全写在一行，适合线上发布

```css
html{font-size:12px;color:#333}.container{font-size:14px}.container .header{width:50px;height:30px}.container .header .left{float:left}.container .footer{background-color:green}.container::after{display:inline-block}/*# sourceMappingURL=css.css.map */
```

![image-20230213153443525](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213153443525.png)

### 1.4 基础格式

#### 1.4.1 选择器嵌套 (Nested Selector)

可以使用不同的选择器进行嵌套，可更方便与直观的查看与管理选择器的父子级关系

scss文件：

```scss
.container {
    width: 1200px;
    margin: 0 auto;
    .header {
        height: 100px;
        line-height: 2em;
        .logo {
            display: block;
            float: left;
            width: 100px;
            height: 100px;
        }
    }
    .footer {
        height: 300px;
        text-align: center;
        color: #fff;
        background-color: #000;
    }
}
```

编译后的 css文件：

```css
.container {
  width: 1200px;
  margin: 0 auto;
}
.container .header {
  height: 100px;
  line-height: 2em;
}
.container .header .logo {
  display: block;
  float: left;
  width: 100px;
  height: 100px;
}
.container .footer {
  height: 300px;
  text-align: center;
  color: #fff;
  background-color: #000;
}
```

#### 1.4.2 父选择器添加内容 &

添加符号 ”&“ ，表示在该父容器后面添加相应的后缀，可是该元素的某个行为或其他等。

当我们想对子元素设置样式时，可以写在父元素的里面，可以使用`&`符号表示父元素

scss文件：

```scss
.container {
    width: 1200px;
    margin: 0 auto;
    a {
        color: #333;
        &:hover {
            text-decoration: underline;
            color: #F00;
        }
    }
    .top {
        border: 1px #f2f2f2 solid;
        &-left {
            float: left;
            width: 200px;
        }
    }
}
```

编译后的 css文件：

```css
.container {
  width: 1200px;
  margin: 0 auto;
}
.container a {
  color: #333;
}
.container a:hover {
  text-decoration: underline;
  color: #F00;
}
.container .top {
  border: 1px #f2f2f2 solid;
}
.container .top-left {
  float: left;
  width: 200px;
}/*# sourceMappingURL=css.css.map */
```

![image-20230213155028257](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213155028257.png)

#### 1.4.3 属性嵌套 (Nested Properties)

属性名称前都具有相同的字符时，可使用属性嵌套的方法。注：font: {}，冒号后与花括号中间需有空格进行隔开

scss文件：

```scss
.container {
    a {
        color: #333;
        font: {
            size: 14px;
            family: sans-serif;
            weight: bold;
        }
    }
}
```

编译后的 css文件：

```css
.container a {
  color: #333;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: bold;
}/*# sourceMappingURL=css.css.map */
```

![image-20230213160228934](https://gitlab.com/apzs/image/-/raw/master/image/image-20230213160228934.png)

#### 1.4.4 占位符选择器 `%foo`

有时需要定义一套样式，但并不给某个元素使用，必须在需要调用的时候才启用此样式库，使用 “%foo” 占位，通过 “@extend” 进行调用。%foo 名称可自己定义，前面需加上符号 “%“

scss文件：

```scss
.button%buttonStyle {
    width: 100px;
    height: 36px;
    display: inline-block;
}
.btn-default {
    @extend %buttonStyle;
    background-color: #333;
    color: #fff;
}
.btn-success {
    @extend %buttonStyle;
    background-color: #eee;
    color: green;
}
```

编译后的 css文件：

```css
.button.btn-default, .button.btn-success {
  width: 100px;
  height: 36px;
  display: inline-block;
}
.btn-default {
  background-color: #333;
  color: #fff;
}
.btn-success {
  background-color: #eee;
  color: green;
}
```

![image-20230214093051823](https://gitlab.com/apzs/image/-/raw/master/image/image-20230214093051823.png)

### 1.5 代码注释

支持标准的 Css 的注释语法，单行注释 `//` 与多行注释 `/* */`。注释在 .scss 中的规则：

1. 单行注释，不会解析到 `.css` 文件中；
2. 如果选择的输出格式是`compressed`，则所有的注释信息都不会解析出来；
3. 在多行注释中添加 “!”，则可保留这条注释到压缩文件中，此方法主要用于文件的版权声明；
4. 多行注释中可以添加插值语句 ( `interpolation` )

```scss
// 单行注释

/*
 * 多行注释 */

/*!
 * 版权声明
 * 作者: #{#author} */
```

例如：

```scss
// compile scss files to css
// it's ready to do it.

/* 
	hello
	world!
*/
$pink: #f3e1e1;
html{
   background-color: $pink;
}

$author: 'gdream@126.com';
/*!
	Author: #{$author}.
*/
```

开发模式编译后:

~~~css
/* 
	hello
	world!
*/
html{
   background-color: #f3e1e1;
}
/*!
	Author: 'gdream@126.com'.
*/
~~~

压缩输出模式编译后：

~~~css
html{
   background-color: #f3e1e1;
}
/*!
	Author: 'gdream@126.com'.
*/
~~~

### 1.6 文件导入

使用 `@import` 进行文件的导入

#### 1.6.1 原生`css`文件导入

`test.css`：

```css
@import url(css.css);
```

#### 1.6.2 导入 .scss 文件

`css.scss`：

导入 .scss 文件的方式，使用 `@import` 进行导入，文件名可以有 .scss 后缀，也可以省略

```scss
// 方法1
@import 'main.scss';

// 方法2
@import 'main';
```

> 注：导入的 `main.scss` 文件会生成`main.css`，如果不想让导入的`main.scss`生成`main.css`文件（例如`main.scss`文件只做全局变量使用，里面不需要生成css样式），需要在被导入的`main.css`文件名前增加一个下划线 `_` 的符号（即`_main.scss`），这样可以保证该文件不会被重新生成 `.css` 文件，而在导入该`_main.scss`文件时，前面的下划线可以写入也可以省略：

```scss
// 以下代码表示将导入一个名为 “_main.scss” 的文件
// 方法1
@import 'main';

// 方法2
@import '_main';
```

导入文件同样也可以写入选择器中，写入选择器后，导入的文件中的所有变量将只适用于该选择器，同时导入的文件中的所有选择器前也会增加发生导入的选择器前的名称：

```scss
.container {
    @import 'main';
    color: $color;
}
```

#### 1.6.3 导入普通的 .css 文件

以下几种方式，只会将文件作为普通的 css 语句进行引入

1. 文件拓展名为 .css
2. 文件名以 http:// 或 https:// 开头
3. 文件由 url() 的形式引入
4. @import 包含 media queries（媒体查询）

```scss
@import 'main.css';
@import 'http://puji.design/main.css';
@import url(main);
@import 'landscape' screen and (orientation: landscape);
```

> 注：采用 @import ‘main.css’ 这种形式引入文件，编译后，文件地址将为计算机的绝对地址，这样的引入形式慎用，建议采用 @import url(main) 的方式。

## 二、Sass 指令

### 2.1 插值语句`#`

常使用于选择器、属性名、属v性值、注释等地。如下示例，“font: #{$font-size}/#{$line-height} Helvetica” 当两个变量使用 “/” 时，程序会自动运算出值，如使用插值语句，则可避免运算出结果

scss文件：

```scss
$author: 'PUJI Design';
$class-name: danger;
$attr: color;
$font-size: 16px;
$line-height: 30px;

/*
 * 插值语句示例
 * @author: #{$author} */
a.#{$class-name} {
    font: $font-size/$line-height Helvetica;
    font: #{$font-size}/#{$line-height} Helvetica;
    font-#{$attr}: red;
}
```

编译后的 css文件：

```css
@charset "UTF-8";
/*
 * 插值语句示例
 * @author: PUJI Design */
a.danger {
  font: 0.5333333333 Helvetica;
  font: 16px/30px Helvetica;
  font-color: red;
}
```

### 2.2 混合指令

混合指令用于定义可重复使用的样式。混合指令可以包含所有的 Css 规则与绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

#### 2.2.1 定义与使用混合指令

使用 `@mixin` 定义混合指令以及使用 `@include` 进行调用

##### 1. 基础写法

scss文件：

```scss
// 定义混合指令
@mixin name {
    width: 1200px;
    margin: 0 auto;
    height: 600px;
}

// 调用混合指令
.container {
    @include name;
    background-color: aqua;
}
```

编译后的 css文件：

```css
.container {
  width: 1200px;
  margin: 0 auto;
  height: 600px;
  background-color: aqua;
}
```

##### 2. 混合指令中添加选择器

scss文件：

```scss
// 定义混合指令
@mixin name {
    .wrap {
        width: 1200px;
        margin: 0 auto;
        height: 600px;
    }
}
// 调用混合指令
.container {
    @include name;
    background-color: aqua;
}
```

编译后的 css文件：

```css
.container {
  background-color: aqua;
}
.container .wrap {
  width: 1200px;
  margin: 0 auto;
  height: 600px;
}
```

编译的结果类似于：

```scss
.container {
    .wrap {
        width: 1200px;
        margin: 0 auto;
        height: 600px;
    }
    background-color: aqua;
}
```

##### 3. 带参数的混合指令

使用 `$name` 给参数命名，在调用的时候给参数赋值：

scss文件：

```scss
// 定义混合指令
@mixin flex-align($aligndirect) {
    -webkit-box-align: $aligndirect;
    -webkit-align-item: $aligndirect;
    -ms-flex-align: $aligndirect;
    align-items: $aligndirect;
}
// 调用混合指令
.container {
    @include flex-align(center);
}
```

编译后的 css文件：

```css
.container {
  -webkit-box-align: center;
  -webkit-align-item: center;
  -ms-flex-align: center;
  align-items: center;
}
```

------

参数可以写一个也可写多个，参数的数目与顺序需一一对应：

scss文件：

```scss
// 定义混合指令
@mixin block-padding($top, $right, $bottom, $left) {
    padding: $top, $right, $bottom, $left;
}
// 调用混合指令
.container {
    @include block-padding(8px, 36px, 12px, 36px)
}
```

编译后的 css文件：

```css
.container {
  padding: 8px, 36px, 12px, 36px;
}
```

------

给指定参数赋值，顺序可随意调整，如以下代码，编译后的 css 也是相同的结果：

```scss
// 定义混合指令
@mixin block-padding($top, $right, $bottom, $left) {
    padding: $top, $right, $bottom, $left;
}
// 调用混合指令
.container {
    @include block-padding($right:36px, $left:36px, $top:8px, $bottom:12px)
}
```

------

给参数添加默认值后，在调用时指定参数，未指定的参数将使用默认值：

scss文件：

```scss
// 定义混合指令
@mixin block-padding($top:0, $right:0, $bottom:0, $left:0) {
    padding: $top, $right, $bottom, $left;
}
// 调用混合指令
.container {
    @include block-padding($top:8px, $bottom:12px)
}
```

编译后的 css文件：

```css
.container {
  padding: 8px, 0, 12px, 0;
}
```

------

混合指令中的参数可设置为一个数组形式，以 “$name…” 表示，比如以下线性渐变的代码：

scss文件：

```scss
// 定义混合指令
@mixin linear-gradient($direction, $gradients...) {
    background-color: nth($gradients, 1);
    background-image: linear-gradient($direction, $gradients);
}
// 调用混合指令
.container {
    @include linear-gradient(to right, #f00, orange, yellow);
}
```

编译后的 css文件：

```css
.container {
  background-color: #f00;
  background-image: -webkit-gradient(linear, left top, right top, from(#f00), color-stop(orange), to(yellow));
  background-image: linear-gradient(to right, #f00, orange, yellow);
}
```

#### 2.2.2 混合指令总结

1. 混合指令 ( @mixin ) 是可以重复使用的一组 Css 声明；
2. 有助于减少重复代码，只需声明一次就可以在文件中反复引用；
3. 包含所有 Css 规则以及绝大部分 Sass 规则，甚至通过参数引入变量；
4. 使用参数时，建议加上默认值。

### 2.3 继承指令

在不同的元素具有完全相同的样式与 Css 属性时，可以使用继承指令实现，继承指令 @extend

#### 2.3.1 基本用法

scss文件：

```scss
.alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.alert-info {
    @extend .alert;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}
.alert-success {
    @extend .alert;
    background: rgb(225, 250, 242);
    color: rgb(13, 112, 79);
}
.alert-error {
    @extend .alert;
    background: rgb(250, 225, 225);
    color: rgb(112, 13, 18);
}
```

编译后的 css文件：

```css
.alert, .alert-info, .alert-success, .alert-error {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}

.alert-success {
  background: #e1faf2;
  color: #0d704f;
}

.alert-error {
  background: #fae1e1;
  color: #700d12;
}
```

------

一个选择器中可以实现多个继承的形式，如：

scss文件：

```scss
.alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.additional {
    border-radius: 4px;
}
.alert-info {
    @extend .alert;
    @extend .additional;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}
```

编译后的 css文件：

```css
.alert, .alert-info {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.additional, .alert-info {
  border-radius: 4px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}
```

------

多层继承形式：

scss文件：

```scss
.alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.additional {
    @extend .alert;
    border-radius: 4px;
}
.alert-info {
    @extend .additional;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}
```

编译后的 css文件：

```css
.alert, .additional, .alert-info {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.additional, .alert-info {
  border-radius: 4px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}
```

#### 2.3.2 使用占位符选择器

使用占位符选择器的好处，是原始的代码不会在 Css 文件中编译，保持代码的简介干净

scss文件：

```scss
%alert {
    margin: 8px 12px;
    width: 100%;
    font-size: 16px;
}
.alert-info {
    @extend %alert;
    background: rgb(238, 238, 238);
    color: rgb(54, 54, 54);
}
.alert-success {
    @extend %alert;
    background: rgb(225, 250, 242);
    color: rgb(13, 112, 79);
}
.alert-error {
    @extend %alert;
    background: rgb(250, 225, 225);
    color: rgb(112, 13, 18);
}
```

编译后的 css文件：

```css
.alert-info, .alert-success, .alert-error {
  margin: 8px 12px;
  width: 100%;
  font-size: 16px;
}

.alert-info {
  background: #eeeeee;
  color: #363636;
}

.alert-success {
  background: #e1faf2;
  color: #0d704f;
}

.alert-error {
  background: #fae1e1;
  color: #700d12;
}
```

## 三、Scss变量

### 3.1 原生`css`中变量基本用法

`test.css`：

1、css中声明变量

声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的CSS值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

常见的最佳实践是在`:root`伪类上定义自定义属性，以便可以在 HTML 文档中全局应用它：

```css
:root {
  --main-bg-color: brown;
}
```


2、使用

您可以通过在var()函数中指定自定义属性名称来使用自定义属性值，而不是常规属性值：

```css
element {
  background-color: var(--main-bg-color);
}
```

请注意，提供给规则集的选择器定义了可以使用自定义属性的范围，您可能限制自定义属性的范围
3、js操作css变量
在 JS 代码中，我们可能需要读取 CSS 变量的值，其方法如下：

```js
const root = document.querySelector(":root");
// 设置 CSS 变量
root.style.setProperty("--main-bg-color", "red");
// 读取 CSS 变量
const computedStyle = getComputedStyle(root);
const mainBgColor = computedStyle.getPropertyValue("--main-bg-color");
console.log(mainBgColor);
// 删除 CSS 变量
root.style.removeProperty("--main-bg-color");
```

总结：灵活使用 CSS 变量，不仅可以提高生产力，也能够提高代码的可阅读性和维护性。

```css
:root {
    --color: #F00;
}

body {
    --border-color: #f2f2f2;
}

.header {
    --background-color: #f8f8f8;
}

p {
    color: var(--color);
    border-color: var(--border-color);
}

.header {
    // 注意变量的使用范围
    background-color: var(--background-color);
}
```

### 3.2 变量的声明

使用符号 `$` 定义变量，变量名称可自己命名，赋值方法与 Css 相同。如：`$color: red;`

变量的定义与使用需有先后顺序，即先定义变量，然后再使用变量，书写的顺序则是将定义变量写在前面，使用变量写在后面。

scss文件：

```scss
$color: #f00;
.container {
    color: $color;
}
```

编译后的 css文件：

```css
.container {
  color: #f00;
}
```

### 3.3 变量的命名规则

1. 用符号 `$` 开头，后面跟随变量名称；
2. 变量名称需使用字母开头，中间可使用字母、数字、中横线（连接符）、下划线；
3. 支持大/小写字母。

如果多个单词的连接，可以使用横线 `-`、下划线 `_` 或驼峰式的命名形式，需要注意的是，如果同样的单词，分别采用横线与下划线来连接，此名称相当于是同一个名称，在解析时，会采用最后一个声明的变量来解析。因此在命名的时候建议统一使用一个符号。

scss文件：

```scss
$color: #f00;
$border_color: #0ff;
$border-color: #ff0;
$borderColor: #00f;
.container {
    color: $color;
    border-color: $border_color;
}
```

编译后的 css文件：

```scss
.container {
  color: #f00;
  border-color: #ff0;
}
```

### 3.4 变量的默认值

可以使用 `!default` 为每个变量设置一个默认值，如果该变量没有被重新定义过，则会将该变量解析为默认值，如果已经有过定义，则会取其以定义过的值。以下代码已经有定义过该变量，因此获取的是定义过的值，默认值不会覆盖之前已经定义过的值。

scss文件：

```scss
$color: #333;
$color: #666 !default;
.container {
    color: $color;
}
```

编译后的 css文件：

```css
.container {
  color: #333;
}
```

### 3.5 变量的作用域

#### 3.5.1 局部变量

在选择器中定义的变量，只能在该选择器或该选择器的子选择器中使用

scss文件：

```scss
.container {
    $font-size: 16px;
    font-size: $font-size;
    .wrapper {
        font-size: $font-size;
    }
}
```

编译后的 css文件：

```css
.container {
  font-size: 16px;
}

.container .wrapper {
  font-size: 16px;
}
```

#### 3.5.2 全局变量

定义后的变量，可以在全局范围内使用，全局变量的定义有两种形式：

1、直接定义在最外面的变量，即是全局变量

scss文件：

```scss
$font-size: 16px;
.container {
    font-size: $font-size;
}
.footer {
    font-size: $font-size;
}
```

编译后的 css文件：

```css
.container {
  font-size: 16px;
}

.footer {
  font-size: 16px;
}
```

2、在选择器中定义的变量后面增加 “!global”，注意，!global 需添加在分号前，与变量值使用空格分割。

scss文件：

```scss
.container {
    $font-size: 16px !global;
    font-size: $font-size;
}
.footer {
    font-size: $font-size;
}
```

编译后的 css文件：

```css
.container {
  font-size: 16px;
}

.footer {
  font-size: 16px;
}
```

## 四、数据类型

Scss 支持以下几种主要的数据类型：

1. 字符串（ 有引号或无引号的字符串 ）：`"foo"`, `'bar'` ,  `baz`  , …
2. 数字：`1` ,  `2.5` , `18px` , `30%` , `9a`  …
3. 颜色：`blue` ,  `#00ff00` , `rgba(0, 0, 0, .1)`
4. 布尔型：`true` ,  `false`
5. 空值：`null`
6. 数组 (list)， 用逗号或空格分割：`1em 2em 2.5em` 或 `Helvetica, Arial, sans-serif`…
7. maps，相当于 JavaScript 中的 object：`(key1: value1, key2: value2)`  …

判断数据类型的方式: `type-of($value)`

```scss
$layer-index: 10;
$font-base-family: 'Open Sans', Helvetica, sans-serif;
$top-bg-color: rgba(0,0,0,.1);
$block-base-padding: 6px 10px 6px 10px;
$blank-mode: true;
$var: null //值null是其类型的唯一值。他表示缺少值，通常由函数返回以指示缺少结果
$color-map: (color1: #f00, color2: #0f0, color3: #00f);
$fonts: (serif: "Helvetica Neue", monospace: "Consolas");
```

### 4.1 字符串 (Strings)

支持有引号的字符串与无引号的字符串，有引号的字符串，无论单引号还是双引号，编译后都为双引号，无引号的字符串编译后同样没有引号。如果一段话由多个单词组成，并且包含空格，需要将引号加上。

scss文件：

```scss
$string1: "Sample 1";
$string2: 'Sample 2';
$string3: red;
body {
    content: $string1;
    content: $string2;
    color: $string3;
}
```

编译后的 css文件：

```css
body {
  content: "Sample 1";
  content: "Sample 2";
  color: red;
}
```

### 4.2 数字 (Numbers)

1. 支持数字或带单位的数字，
2. 支持整数或小数
3. 支持正数与负数

```scss
$number1: 30;
$number2: 6.9;
$number3: 16px;
$number4: 32a; // 不规范，但不会报错
// 注：数字后接的任何字母都会视为单位，单位会和数字当作一个整体进行计算
```

### 4.3 颜色 (Colors)

Css 原有颜色类型，包括十六进制、RGB、RGBA、HSL、HSLA和色彩单词

### 4.4 布尔型 (Booleans)

只有两个值 “true” 和 “false”，只有自身是 false 或 null 才会返回 false，其他一切都会返回 true，主要用于逻辑判断。

### 4.5 空值 (Null)

只有一个值 “null”，如 “$name: null;”。由于他为空，因此不能使用它与任何类型进行运算，主要用于逻辑判断。

### 4.6 数组 (Lists)

通过空格或半角逗号分割的一系列的值，数组中还可以包含子数组，如下方的 “$list2” 和 “$list3″，当数组被编译为 css 时，圆括号不会被添加

```scss
$list1: 1px 2px 3px 4px; //一维数字
$list2: 1px 2px, 3px 4px; //二维数字
$list3: (1px 2px) (3px 4px); //二维数字
// 指定数组中的某个值进行调用
.container {
    font-size: nth($list1, 2);
}
```

编译后

```css
.container {
  font-size: 2px;
}
```

------

在 Sass 中，以下这两种方式都定义了一个包含子数组的数组，但在编译后的 CSS 却不一样。

```scss
$list2: 1px 2px, 3px 4px;
$list3: (1px 2px) (3px 4px);
.container {
    margin: $list2;
    padding: $list3;
}
```

*编译后*

```scss
.container {
  margin: 1px 2px, 3px 4px;
  padding: 1px 2px 3px 4px;
}
```

这是由于 CSS 不支持圆括号的写法，因此 list3 会被拆开为一组值；而 CSS 支持逗号作分隔，所以 list2 会被编译为两组值。

### 4.7 映射 (Maps)

Maps 必须被圆括号包裹，可以映射任何键值对

```scss
$map: (
  key1: value1,
  key2: value2,
  key3: value3
)
```

**映射函数：**

返回 Map 中 key 所对应的值( value )。如没有对应的 key，则返回 null 值。

```scss
map-get(map, key)

$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-get($font-sizes, "small")
结果: 12px
```

判断 map 是否有对应的 key，存在返回 true，否则返回 false

```scss
map-has-key(map, key)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-has-key($font-sizes, "big")
结果: false
```

返回 map 中所有的 key 组成的队列

```scss
map-keys(map)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-keys($font-sizes)
结果: "small", "normal, "large"
```

合并两个 map 形成一个新的 map 类型，即将 *map2* 添加到 *map1*的尾部

```scss
map-merge(map1, map2)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
$font-sizes2: ("x-large": 30px, "xx-large": 36px)
map-merge($font-sizes, $font-sizes2)
结果: "small": 12px, "normal": 18px, "large": 24px, "x-large": 30px, "xx-large": 36px
```

移除 *map* 中的 keys，多个 key 使用逗号隔开

```scss
map-remove(map, keys...)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-remove($font-sizes, "small")
结果: ("normal": 18px, "large": 24px)
map-remove($font-sizes, "small", "large")
结果: ("normal": 18px)
```

返回 *map* 中所有的 value 并生成一个队列

```scss
map-values(map)

实例:
$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)
map-values($font-sizes)
结果: 12px, 18px, 24px
```

## 五、运算符

### 5.1 相等运算符

所有数据类型都支持等号运算符，等于使用 “==” 表示，不等于使用 “!=” 表示

scss文件：

```scss
$color: 1;
.container {
    @if $color == 1 {
        color: red;
    }
    @else {
        color: blue;
    }
}
```

编译后的 css文件：

```css
.container {
  color: red;
}
```

------

scss文件：

```scss
$color: "red";
.container {
    @if $color != "red" {
        color: red;
    }
    @else {
        color: blue;
    }
}
```

编译后的 css文件：

```css
.container {
  color: blue;
}
```

### 5.2 关系（比较）运算符

关系运算符只支持数字，使用的符号分别是大于号 “>”，小于号 “<“，大于等于号 “>=” 与小于等于号 “<=” ，返回值 “true” 或 “false”，主要应用于条件判断

```scss
$a: 1 > 2; //false
$a: 1 < 2; //true
$a: 1 >= 2; //false
$a: 1 <= 2; //true
```

### 5.3 布尔运算符

布尔运算符包含三种形式，分别是与  `and` 、 或 `or` 、 非 `not` 。

scss文件：

```scss
$width: 100;
$height: 200;
$last: false;
div {
    // 两个条件都满足时
    @if $width > 50 and $height < 300 {
        font-size: 16px;
    }
    @else {
        font-size: 20px;
    }
    // 任意条件满足时
    @if $width > 200 or $height < 300 {
        color: red;
    }
    @else {
        color: blue;
    }
    // 判断是否为真
    @if not $last {
        line-height: 2em;
    }
    @else {
        line-height: 1em;
    }
}
```

编译后的 css文件：

```css
div {
  font-size: 16px;
  color: red;
  line-height: 2em;
}
```

### 5.4 数字运算符

数字运算符包含加 `+` ，减 `-` ，乘 `*` ，除 `/` 与取模 `%` ，取模即是两个数字相除取余数。

#### 5.4.1 基本用法

```scss
// 纯数字相加
$plus1: 30 + 30; //60
$plus2: 30px + 30; //60px
$plus3: 30% + 30%; //60%
$plus4: 30px + 30pt; //70px    pt= 3/4 px。比如 1024px*3/4=768pt
$plus5: 30px + 30pt + 30pc; //550px

//纯数字相减
$minus1: 60 - 30; //30
$minus2: 60px - 30; //30px
$minus3: 60% - 30%; //30%
$minus4: 60px - 30pt; //20px
$minus5: 60px - 30pt - 30pc; //-460px

//纯数字相乘
$multipl1: 60 * 30; //1800
$multipl2: 60px * 30; //1800px
$multipl3: 60% * 30; //1800%
$multipl4: 60px * 30 * 30; //54000px

//纯数字相除
$division1: (60 / 30); //2
$division2: (60px / 30); //2px
$division3: (60% / 30%); //2
$division4: (60px / 30pt); //1.5
$division5: (60px / 30 / 30); //0.06667px

//纯数字取模
$modulo1: 60 % 9; //6
$modulo2: 60px % 9; //6px
$modulo3: 60% % 9%; //6%
$modulo4: 60px % 9pt; //0px
$modulo5: 60px % 9 % 5; //1px
```

#### 5.4.2 混合用法

```scss
// 数字，字符串相加
$plus1: a + b; //ab
$plus2: "a" + "b"; //"ab"
$plus3: 'a' + 'b'; //"ab"
$plus4: 'a' + b; //"ab"
$plus5: a + 'b'; //ab
$plus6: 'a' + 1; //"a1"
$plus7: "1" + a; //"1a"

// 数字，字符串相减
$minus1: a - b; //a-b
$minus2: "a" - "b"; //"a"-"b"
$minus3: 'a' - 'b'; //"a"-"b"
$minus4: 'a' - b; //"a"-b
$minus5: a - 'b'; //a-"b"
$minus6: 'a' - 1; //"a"-1
$minus7: "1" - a; //"1"-a
$minus8: 1 - "a"; //1-"a"

// 数字无法与纯字符串相乘

// 数字无法与纯字符串相除

// 数字无法与纯字符串取模
```

1. 字符串相加时，如果前面一个值带引号，计算的结果同样带引号，反之；
2. 数字与字符串混合相加时，第一位有引号或第一位是数字，且后最后一位有引号时，结果必定有引号

#### 5.4.3 除法运算情景

如果直接在值之间使用  `/` ，不可被视为除法运算，仅当一下三种情况时会以除法进行运算：

1. 如果值或值的一部分是变量或函数的返回值
2. 如果值被圆括号包裹
3. 如果值是算数表达式的一部分

scss文件：

```scss
$width: 100px;
div {
    left: 10 / 2;  // 直接使用/，不会被当作除号，而是作为一个分隔符
    top: (10 / 2); // 可以加个()表示里面的/需要当作运算符
    width: $width / 2; //使用变量
    z-index: round($number: 10) / 2; //使用函数
    height: (500px / 2); //使用圆括号
    margin-left: 5px + 8/2; //使用了+表达式
}
```

编译后的 css文件：

```scss
div {
  left: 10/2;
  top: 5;
  width: 50px;
  z-index: 5;
  height: 250px;
  margin-left: 9px;
}
```

#### 5.4.4 规则总结

1. 运算符号与值之间建议使用空格隔开；
2. 数字可以只声明其中一个符号或单位，计算的结果将以声明的符号或单位进行编译，声明单位或符号时，**建议在第一个数字上进行声明**；
3. 当不同符号且符号之间不可以进行换算时，无法计算出结果，如 20px + 10%无计算，”px” + “pt” 则可进行计算；
4. 当不同单位进行运算，结果会显示以运算公式开头的数字设置的单位；
5. 在乘法运算时，只需为一个数字声明单位，为多个数字声明同样或不同的单位都会报错；
6. 在除法运算时，如需声明单位，单位建议标注在除号前面的值；
7. 书写公式时，建议将所有公式都使用圆括号包裹。

#### 5.4.5 书写建议示范

scss文件：

```scss
.plus {
    width: (30 + 30);
    width: (30% + 30);
    width: (30px + 30pt);
    width: (30px + 30pt + 30pc);
}
.minus {
    width: (60 - 30);
    width: (60% - 30);
    width: (60px - 30pt);
    width: (60px - 30pt - 30pc);
}
.multipl {
    width: (60 * 30);
    width: (60% * 30);
    width: (60px * 30);
    width: (60px * 30 * 30);
}
.division {
    width: (60 / 30);
    width: (60% / 30);
    width: (60px / 30);
    width: (60px / 30pt / 30);
}
.modulo {
    width: (60 % 9);
    width: (60% % 9);
    width: 60% % 9%;
    width: 60px % 6pt % 0.12;
}
```

编译后的 css文件：

```css
.plus {
  width: 60;
  width: 60%;
  width: 70px;
  width: 550px;
}
.minus {
  width: 30;
  width: 30%;
  width: 20px;
  width: -460px;
}
.multipl {
  width: 1800;
  width: 1800%;
  width: 1800px;
  width: 54000px;
}
.division {
  width: 2;
  width: 2%;
  width: 2px;
  width: 0.05;
}
.modulo {
  width: 6;
  width: 6%;
  width: 6%;
  width: 0.04px;
}
```

### 5.5 字符串运算

使用加号”+” 可连接字符串，如字符串前面带引号后面不带，编译出的结果会带引号，反之。

scss文件：

```scss
.container {
    content: "Foo" + bar;
    font-family: sans- + "serif";
}
```

编译后的 css文件：

```css
.container {
  content: "Foobar";
  font-family: sans-serif;
}
```

## 六、函数

### 6.1 Color颜色函数

sass包含很多操作颜色的函数。例如: lighten() 与darken()函数可用于调亮或洞暗颜色，opacify()函数使颜色透明度减少，transparent()函数使颜色透明度增加，mix()函数可用来混合两种颜色。

- **RGB函数**

  | 函数名和参数类型               |                           函数作用                           |
    | ------------------------------ | :----------------------------------------------------------: |
  | rgb($red, $green, $blue)       |                     返回一个16进制颜色值                     |
  | rgba($red,$green,$blue,$alpha) | 返回一个rgba；$red,$green和$blue可被当作一个整体以颜色单词、hsl、rgb或16进制形式传入 |
  | red($color)                    |                   从$color中获取其中红色值                   |
  | green($color)                  |                   从$color中获取其中绿色值                   |
  | blue($color)                   |                   从$color中获取其中蓝色值                   |
  | mix($color1,$color2,$weight?)  |     按照$weight比例，将$color1和$color2混合为一个新颜色      |

- **HSL函数**

  | 函数名和参数类型                         | 函数作用                                                     |
    | ---------------------------------------- | ------------------------------------------------------------ |
  | hsl($hue,$saturation,$lightness)         | 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色 |
  | hsla($hue,$saturation,$lightness,$alpha) | 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色 |
  | saturation($color)                       | 从一个颜色中获取饱和度（saturation）值                       |
  | lightness($color)                        | 从一个颜色中获取亮度（lightness）值                          |
  | adjust-hue($color,$degrees)              | 通过改变一个颜色的色相值，创建一个新的颜色                   |
  | lighten($color,$amount)                  | 通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色           |
  | darken($color,$amount)                   | 通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色           |
  | hue($color)                              | 从一个颜色中获取亮度色相（hue）值                            |

- **Opacity函数**

  |                                                             |                  |
    | ----------------------------------------------------------- | ---------------- |
  | alpha($color)/opacity($color)                               | 获取颜色透明度值 |
  | rgba($color,$alpha)                                         | 改变颜色的透明度 |
  | opacify($color, $amount) / fade-in($color, $amount)         | 使颜色更不透明   |
  | transparentize($color, $amount) / fade-out($color, $amount) | 使颜色更加透明   |

scss文件：

```scss
p {
    height: 30px;
}

.p0 {
    background-color: #5c7a29;
}

.p1 {
    /**
        让颜色变亮
        lighten($color, $amount)
        $amount 的取值在0% - 100% 之间
    */
    background-color: lighten(#5c7a29, 30%);
}

.p2 {
    // 让颜色变暗，通常使用color.scale()代替该方案
    background-color: darken(#5c7a29, 15%);
}

.p3 {
    // 降低延申透明度  通常使用color.scale() 代替该方案
    // background-color: opacify(#5c7a29, 0.5);
    background-color: opacify(rgba(#5c7a29,0.1), 0.5);
}
```

编译后的 css文件：可以看到颜色有所改变

```css
@charset "UTF-8";
p {
  height: 30px;
}

.p0 {
  background-color: #5c7a29;
}

.p1 {
  /**
      让颜色变亮
      lighten($color, $amount)
      $amount 的取值在0% - 100% 之间
  */
  background-color: #aace6e;
}

.p2 {
  background-color: #314116;
}

.p3 {
  background-color: rgba(92, 122, 41, 0.6);
}
```

修改`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/css.css">
</head>
<body>
    <p></p>
    <p class="p0"></p>
    <p class="p1"></p>
    <p class="p2"></p>
    <p class="p3"></p>
</body>
</html>
```

在浏览器中打开，可以看到颜色如下图所示

![image-20230215145654446](https://gitlab.com/apzs/image/-/raw/master/image/image-20230215145654446.png)

### 6.2 字符串函数

> 索引第一个为1，最后一个为-1；切片两边均为闭区间

| 函数名和参数类型                        |                  函数作用                   |
| :-------------------------------------- | :-----------------------------------------: |
| quote($string)                          |                  添加引号                   |
| unquote($string)                        |                  除去引号                   |
| to-lower-case($string)                  |                  变为小写                   |
| to-upper-case($string)                  |                  变为大写                   |
| str-length($string)                     |        返回$string的长度(汉字算一个)        |
| str-index($string，$substring)          |        返回$substring在$string的位置        |
| str-insert($string, $insert, $index)    |       在$string的$index处插入$insert        |
| str-slice($string, $start-at, $end-at） | 截取$string的$start-at和$end-at之间的字符串 |

scss文件：

```scss
p {
    &::after {
        content: quote(这是里面的内容);
    }
    background-color: unquote($string: "#F00");
    z-index: str-length("sass学习");
}
```

编译后的 css文件：

```css
@charset "UTF-8";
p {
  background-color: #F00;
  z-index: 6;
}
p::after {
  content: "这是里面的内容";
}
```

### 6.2 Math数值函数

数值函数处理数值计算，例如: `percentage()`将无单元的数值转换为百分比，`round()`将数字四舍五入为最接近的整数，`min()`和`max()`获取几个数字中的最小值或最大值，`random()`返回一 个随机数。

| 函数名和参数类型        |                           函数作用                           |
| ----------------------- | :----------------------------------------------------------: |
| percentage($number)     |                       转换为百分比形式                       |
| round($number)          |                        四舍五入为整数                        |
| ceil($number)           |                         数值向上取整                         |
| floor($number)          |                         数值向下取整                         |
| abs($number)            |                          获取绝对值                          |
| min($number...)         |                          获取最小值                          |
| max($number...)         |                          获取最大值                          |
| random($number?:number) | 不传入值：获得0-1的随机数；传入正整数n：获得0-n的随机整数（左开右闭） |

scss文件：

```scss
p {
    z-index: abs($number: -15);
    z-index: ceil($number: 5.8);
    z-index: max( 5, 1, 6, 8, 3);
    opacity: random();
}
```

编译后的 css文件：

```css
p {
  z-index: 15;
  z-index: 6;
  z-index: 8;
  opacity: 0.2904947308;
}
```

### 6.3 List函数

List函数操作List, length()返回列表长度， nth()返回列表中的特定项， join()将两个列表连接在一起， append()在列表末尾添加一个值。

| 函数名和参数类型                 |                           函数作用                           |
| -------------------------------- | :----------------------------------------------------------: |
| length($list)                    |                         获取数组长度                         |
| nth($list, n)                    |                      获取指定下标的元素                      |
| set-nth($list, $n, $value)       |                   向$list的$n处插入$value                    |
| join($list1, $list2, $separator) | 拼接$list1和list2；$separator为新list的分隔符，默认为auto，可选择comma、space |
| append($list, $val, $separator)  | 向$list的末尾添加$val；$separator为新list的分隔符，默认为auto，可选择comma、space |
| index($list, $value)             |                返回$value值在$list中的索引值                 |
| zip($lists…)                     | 将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的 |

scss文件：

```scss
p {
    z-index: length(12px);
    z-index: length(12px 5px 8px);
    z-index: index(a b c d, c);
    z-index: append(10px 20px, 30px);
    color: nth(red blue green, 2);
}
```

编译后的 css文件：

```css
p {
  z-index: 1;
  z-index: 3;
  z-index: 3;
  z-index: 10px 20px 30px;
  color: blue;
}
```

### 6.4 Map函数

Map函数操作Map, map-get()根据键值获取map中的对应值，map-merge()来将两个map合并成个 新的map, map-values()映射中的所有值。

| 函数名和参数类型        |                 函数作用                 |
| ----------------------- | :--------------------------------------: |
| map-get($map, $key)     |        获取$map中$key对应的$value        |
| map-merge($map1, $map2) |     合并$map1和$map2，返回一个新$map     |
| map-remove($map, $key)  |     从$map中删除$key，返回一个新$map     |
| map-keys($map)          |            返回$map所有的$key            |
| map-values($map)        |           返回$map所有的$value           |
| map-has-key($map, $key) | 判断$map中是否存在$key，返回对应的布尔值 |
| keywords($args)         |  返回一个函数的参数，并可以动态修改其值  |

scss文件：

```scss
$font-sizes: (
    "small":12px,
    "normal":18px,
    "large":24px
);
$padding: (
    top:10px,
    right:20px,
    bottom:10px,
    left:30px
);

p{
    font-size: map-get($font-sizes, "normal");
    @if map-has-key($padding, "right"){
        padding-right: map-get($padding, "right" );
    }
    &::after {
        content: map-keys($font-sizes)+ " " + map-values($padding) + "";
    }
}
```

编译后的 css文件：

```css
p {
  font-size: 18px;
  padding-right: 20px;
}
p::after {
  content: '"small", "normal", "large" 10px, 20px, 10px, 30px';
}
```

### 6.5 Selector选择器函数

选择符相关函数可对CSS选择进行一些相应的操作， 例如: `selector-append()`可以把个选择符附加到另一个选择符， `selector-unify()`将两组选择器合成个复合选择器。

scss文件：

```scss
.header {
    background-color: #000;
    content: selector-append(".a", ".b", ".c") + '';
    content: selector-unify("a",".disabled")+ '';
}
```

编译后的 css文件：

```css
.header {
  background-color: #000;
  content: ".a.b.c";
  content: "a.disabled";
}
```

### 6.6 自检函数

自检相关函数，例如: `feature-exists()`检查当前`Sass`版本是否存在某个特性，`variable-exists()`检查当前作用域中是否存在某个变量，`mixin-exists()`检查某个`mixin`是否存在。自检函数通常用在代码的调试上。

scss文件：

```scss
$color: #F00;
@mixin padding($left:0,$top:0,$right:0,$bottom:0){
    padding: $top $right $bottom $left;
}

.container {
    @if variable-exists(color){
        color: $color;
    }
    @else {
        content: "$color不存在";
    }

    @if mixin-exists(padding){
        @include padding($left: 10px,$right: 10px)
    }
}
```

编译后的 css文件：

```css
.container {
  color: #F00;
  padding: 0 10px 0 10px;
}
```

## 七、流程控制指令

### 7.1 `@if`

scss文件：

```scss
$theme: "green";
.container {
    @if $theme=="red"{
        color: red;
    }
    @else if $theme=="blue"{
        color: blue;
    }
    @else if $theme=="green"{
        color: green;
    }
    @else {
        color: darkgray;
    }
}
```

编译后的 css文件：

```css
.container {
  color: green;
}
```

------

scss文件：

```scss
@mixin triangle($direction:top,$size:30px,$border-color:black){
    width: 0px;
    height: 0px;
    display: inline-block;
    border-width: $size;
    border-#{$direction}-width:0;
    @if ($direction==top){
        border-color: transparent transparent $border-color transparent;
        border-style: dashed dashed solid dashed;
    }
    @else if ($direction==right){
        border-color: transparent transparent transparent $border-color;
        border-style: dashed dashed dashed solid;
    }
    @else if ($direction==bottom){
        border-color: $border-color transparent transparent transparent;
        border-style: solid dashed dashed dashed;
    }
    @else if($direction == left){
        border-color: transparent $border-color transparent transparent;
        border-style: dashed solid dashed dashed;
    }
}

.p0{
    @include triangle()
}
.p1 {
    @include triangle(right,20px , red)
}
.p2 {
    @include triangle(bottom,30px , green)
}
.p3 {
    @include triangle(left,40px , blue)
}
```

编译后的 css文件：

```css
.p0 {
  width: 0px;
  height: 0px;
  display: inline-block;
  border-width: 30px;
  border-top-width: 0;
  border-color: transparent transparent black transparent;
  border-style: dashed dashed solid dashed;
}

.p1 {
  width: 0px;
  height: 0px;
  display: inline-block;
  border-width: 20px;
  border-right-width: 0;
  border-color: transparent transparent transparent red;
  border-style: dashed dashed dashed solid;
}

.p2 {
  width: 0px;
  height: 0px;
  display: inline-block;
  border-width: 30px;
  border-bottom-width: 0;
  border-color: green transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}

.p3 {
  width: 0px;
  height: 0px;
  display: inline-block;
  border-width: 40px;
  border-left-width: 0;
  border-color: transparent blue transparent transparent;
  border-style: dashed solid dashed dashed;
}
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="css/css.css">
</head>
<body>
    <p class="p0"></p>
    <p class="p1"></p>
    <p class="p2"></p>
    <p class="p3"></p>
</body>
</html>
```

浏览器打开如下所示：

![image-20230215162618670](https://gitlab.com/apzs/image/-/raw/master/image/image-20230215162618670.png)

------

**占位符%**

你可能发现被继承的csS父类并没有被实际应用，也就是说htmI代码中没有使用该类， 它的唯一目的就是扩 展其他选择器。
对于该类，可能不希望被编译输出到最终的css文件中，它只会增加CSS文件的大小，永远不会被使用。
这就是占位符选择器的作用。
占位符选择器类似于类选择器，但是，它们不是以句点( )开头，而是以百分号(%)开头。
当在Sass文件中使用占位符选择器时，它可以用于扩展其他选择器，但不会被编译成最终的CSS。

可以使用占位符对上面代码进行改进：

scss文件：

```scss
%triangle {
    width: 0px;
    height: 0px;
    display: inline-block;
}

@mixin triangle($direction: top, $size: 30px, $border-color: black) {
    @extend %triangle;
    border-width: $size;
    border-#{$direction}-width: 0;

    @if ($direction==top) {
        border-color: transparent transparent $border-color transparent;
        border-style: dashed dashed solid dashed;
    }

    @else if ($direction==right) {
        border-color: transparent transparent transparent $border-color;
        border-style: dashed dashed dashed solid;
    }

    @else if ($direction==bottom) {
        border-color: $border-color transparent transparent transparent;
        border-style: solid dashed dashed dashed;
    }

    @else if($direction ==left) {
        border-color: transparent $border-color transparent transparent;
        border-style: dashed solid dashed dashed;
    }
}

.p0 {
    @include triangle()
}

.p1 {
    @include triangle(right, 20px, red)
}

.p2 {
    @include triangle(bottom, 30px, green)
}

.p3 {
    @include triangle(left, 40px, blue)
}
```

编译后的 css文件：

```css
.p3, .p2, .p1, .p0 {
  width: 0px;
  height: 0px;
  display: inline-block;
}

.p0 {
  border-width: 30px;
  border-top-width: 0;
  border-color: transparent transparent black transparent;
  border-style: dashed dashed solid dashed;
}

.p1 {
  border-width: 20px;
  border-right-width: 0;
  border-color: transparent transparent transparent red;
  border-style: dashed dashed dashed solid;
}

.p2 {
  border-width: 30px;
  border-bottom-width: 0;
  border-color: green transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}

.p3 {
  border-width: 40px;
  border-left-width: 0;
  border-color: transparent blue transparent transparent;
  border-style: dashed solid dashed dashed;
}
```

### 7.2 `@for`

> `@for`指令可以在限制的范围内重复输出格式，每次按要求(变星的值)对输出结果做出变动。这个指令包含两种格式： `@for $var from <start> through <end>`，或者`@for $var from <start> to <end>`

区别在于`through`与`to`的含义:
当使用`through`时，条件范围包含`<start>` 与`<end>`的值。
而使用`to`时条件范围只包含`<start>` 的值不包含`<end>` 的值。
另外，$var可以是任何变量，比如`$i`;  `<start>`和`<end>`必须是整数值。

scss文件：

```scss
@for $i from 1 to 4 {
    .p#{$i} {
        width: 10px * $i;
        height: 30px;
        background-color: red;
    }
}

@for $i from 1 through 3 {
    .p#{$i} {
        width: 10px * $i;
        height: 30px;
        background-color: red;
    }
}
```

编译后的 css文件：

```css
.p1 {
  width: 10px;
  height: 30px;
  background-color: red;
}

.p2 {
  width: 20px;
  height: 30px;
  background-color: red;
}

.p3 {
  width: 30px;
  height: 30px;
  background-color: red;
}

.p1 {
  width: 10px;
  height: 30px;
  background-color: red;
}

.p2 {
  width: 20px;
  height: 30px;
  background-color: red;
}

.p3 {
  width: 30px;
  height: 30px;
  background-color: red;
}
```

### 7.3 `@each`

@each指令的格式是`$var in <list>`, `$var`可以是任何变量名，比如`$length`或者`$name`,而`<list>`是一连串的值，也就是值列表。

scss文件：

```scss
p{
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 10px;
}

$color-list: red green blue turquoise darkmagenta;

@each $color in $color-list {
    $index: index($color-list,$color);
    .p#{$index - 1} {
        background-color: $color;
    }
}
```

编译后的 css文件：

```css
p {
  width: 10px;
  height: 10px;
  display: inline-block;
  margin: 10px;
}

.p0 {
  background-color: red;
}

.p1 {
  background-color: green;
}

.p2 {
  background-color: blue;
}

.p3 {
  background-color: turquoise;
}

.p4 {
  background-color: darkmagenta;
}
```

### 7.4 `@where`

@while指令重复输出格式直到表达式返回结果为false.这样可以实现比@for更复杂的循环。
用sass实现bootstrap中css的这么一段代码
https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.css

scss文件：

```scss
$column:12;
@while $column > 0 {
    .col-sm-#{$column} {
        width: $column / 12 * 100%;
    }
    $column: $column - 1;
}
```

编译后的 css文件：

```css
.col-sm-12 {
    width: 100%;
  }
  .col-sm-11 {
    width: 91.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-8 {
    width: 66.66666667%;
  }
  .col-sm-7 {
    width: 58.33333333%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-5 {
    width: 41.66666667%;
  }
  .col-sm-4 {
    width: 33.33333333%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-1 {
    width: 8.33333333%;
  }
```

### 7.5 `@function`自定义函数

把一些比较复杂或经常用些的内容进行抽离(封装) ,以便重复使用

函数格式：

```scss
@function function-name([$param1,$param2,...]){
    ...
    @return $value;
}
```

提示:函数名function-name与function_ _name 是相同的

`@return`：它只允许在@函数体中使用，并且每个@function必须以@return结束。当遇到@return时， 它会立即结束函数并返回其结果。

scss文件：

```scss
/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/
@function background-linear-gradient($direction, $start-color, $end-color: blue) {
    @return linear-gradient($direction, $start-color, $end-color);
}

// 正常传参
body {
    background-image: background-linear-gradient(to fight, blue, green);
}

// 省略默认值
body {
    background-image: background-linear-gradient(to right, blue);
}

// 按照key进行传参
body {
    background-image: background-linear-gradient($start-color: red, $direction: to right);
}
```

编译后的 css文件：

```css
@charset "UTF-8";
/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/
body {
  background-image: -webkit-gradient(linear, fight, from(blue), to(green));
  background-image: linear-gradient(to fight, blue, green);
}

body {
  background-image: -webkit-gradient(linear, left top, right top, from(blue), to(blue));
  background-image: linear-gradient(to right, blue, blue);
}

body {
  background-image: -webkit-gradient(linear, left top, right top, from(red), to(blue));
  background-image: linear-gradient(to right, red, blue);
}
```

------

scss文件：

```scss
/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/
@function background-linear-gradient($direction,$gradients...){
    @return linear-gradient($direction,$gradients);
}

body {
    background-image: background-linear-gradient(to right,red,green,blue );
}

$widths: 50px,30px,80px;
.top {
    width: min(50px,30px,80px);
    width: min($widths...);
}
```

编译后的 css文件：

```css
@charset "UTF-8";
/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/
body {
  background-image: -webkit-gradient(linear, left top, right top, from(red), color-stop(green), to(blue));
  background-image: linear-gradient(to right, red, green, blue);
}

.top {
  width: 30px;
  width: 30px;
}
```

**混入`mixin`和函数`function`的区别**

- 混入`mixin`主要是通过传递参数的方式输出多样化的样式，为了可以现实代码复用。

- 函数的功能主要是通过传递参数后，经过函数内部的计算，最后`@return`输出一个值。

### 7.6 `if`三元条件函数

```scss
if($condition,$if-true,$if-false);
```

判断`$condition`,如果条件成立，则返回`$if-true`的结果， 如果条件不成立,则返回`$if-false`的结果。

scss文件：

```scss
$theme:'light';

.container {
    color: if($theme=='light',#000,#fff);
}
```

编译后的 css文件：

```css
.container {
  color: #000;
}
```

### 7.7 `@use`

从其他`Sass`样式表加载`mixin`, `function`和变量， 并将来自多个样式表的CSS组合在-起，`@use`加载的样式表被称为“模块”，多次引入只包含一次。
`@use`也可以看作是对`@import`的增强

语法：

```scss
@use '<url>' [as alias|namespace]
```

加载普通scss、css

`scss/uses/_common.scss`

```scss
$font-size: 14px !default;

* {
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;
}

@function column-width($col, $total) {
    @return percentage($col/$total);
}

@mixin bgColor($bg-color: #f2f2f2) {
    background-color: $bg-color;
}
```

`scss/css/about.css`

```css
h1 {
    font-size: 24px;
}
```

`scss/use.scss`

```scss
@use 'uses/common';
@use 'css/about.css';
```

编译后的`css/use.css`文件：

```css
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #333;
}

h1 {
  font-size: 24px;
}
```

------

新建`scss/uses/_global.scss`文件

```scss
$font-size: 20px;
@mixin base($color:#f00){
    color: $color;
}

.gclass {
    background-color: #f00;
}
```

使用`@use`：使用`@use`引入两次相同的文件时需要指定命名空间，否则会报错；引入两次相同的文件，编译后的css不为重复生成两次引入的文件内容

```scss
@use 'uses/common';
// 使用两个'uses/global'，必须指定命名空间
// 否则都使用相同的默认命名空间会报错
// 可以使用*取消命名空间，直接可以调用不需要添加"命名空间."，不推荐使用
@use 'uses/global' as *;
@use 'uses/global' as g2;

body{
    font-size: common.$font-size;
    width: common.column-width(3,12);
    @include base(#f00);
    @include g2.base(#f00);
}
```



```css
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #333;
}

.gclass {
  background-color: #f00;
}

body {
  font-size: 14px;
  width: 25%;
  color: #f00;
  color: #f00;
}
```

使用`@import`：

```scss
@import 'uses/common';
@import 'uses/global';
@import 'uses/global';

body{
    font-size: $font-size;
    width: column-width(3,12);
    @include base(#f00);
    @include base(#f00);
}
```



```css
* {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #333;
}

.gclass {
  background-color: #f00;
}

.gclass {
  background-color: #f00;
}

body {
  font-size: 20px;
  width: 25%;
  color: #f00;
  color: #f00;
}
```

![image-20230216151153634](https://gitlab.com/apzs/image/-/raw/master/image/image-20230216151153634.png)

------

可以使用`$-`指定该变量为局部变量，只能本文件使用

`scss\uses\_global.scss`

```scss
$-font-size: 20px;
@mixin base($color:#f00){
    color: $color;
    font-size: $-font-size;
} 

.gclass {
    background-color: #f00;
}
```

`scss\use.scss`

```scss
@use 'uses/common';
// 使用两个'uses/global'，必须指定命名空间
// 否则都使用相同的默认命名空间会报错
// 可以使用*取消命名空间，直接可以调用不需要添加"命名空间."，不推荐使用
@use 'uses/global' as *;
@use 'uses/global' as g2;

body{
    font-size: g2.$-font-size; // 此处会报错，不能使用私有的变量
    width: common.column-width(3,12);
    @include base(#f00);
    @include g2.base(#f00);
}
```

报了如下错误，表示不能使用该变量

```bash
--------------------
Compilation Error
Error: Private members can't be accessed from outside their modules.
  ╷
9 │     font-size: g2.$-font-size;
  │                ^^^^^^^^^^^^^^
  ╵
  b:\scss\scss\use.scss 9:16  root stylesheet
--------------------
```

------

可以使用`with`修改引入的模块的变量默认值

```scss
@use 'uses/common' with($font-size:30px);
```

------

我们可以新建`scss\uses\_index.scss`文件

```scss
@use 'common' with($font-size:30px);
// 使用两个'uses/global'，必须指定命名空间
// 否则都使用相同的默认命名空间会报错
// 可以使用*取消命名空间，直接可以调用不需要添加"命名空间."，不推荐使用
@use 'global' as g1;
@use 'global' as g2;

body{
    font-size: common.$font-size;
    width: common.column-width(3,12);
    @include g1.base(#f00);
    @include g2.base(#f00);
}
```

然后在`scss\use.scss`引入

```scss
@use 'uses'; // 自动找到 uses/_index.scss
```

![image-20230216155626101](https://gitlab.com/apzs/image/-/raw/master/image/image-20230216155626101.png)

**`@use`使用总结**

`@use`引入同一个文件多次,不会重复引入，而`@import`会重复引入
`@use`引入的文件都是一个模块， 默认以文件名作为模块名,可通过`as alias`取别名
`@use`引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问，而`@import`变量会被覆盖
`@use`方式可通过`@use ‘xxx’ as *`来取消命名空间，建议不要这么做
`@use`模块内可通过$-或$来定义私有成员，也就是说或者开头的`Variables mixins functions`不会被引入
`@use`模块内变星可通过`!default`定义默认值，引入时可通用`with (...)`的方式修改
可定义`-index.scss`或`_index.scss`来合并多个`scss`文件,它`@use`默认加载文件

### 7.8 `@forward`

通过@forward加载一个模块的成员， 并将这些成员当作自己的成员对外暴露出去，类似于类似于es6的export ...通常用于跨多个文件组织Sass库

比如我们想在`scss\use.scss`文件里使用`scss\uses\_common.scss`文件的`$font-size`变量，我们必须在`scss\uses\_index.scss`文件里声明`$font-size`，将其内部引入的模块的`$font-size`变量作为自己的变量，别的文件引入`_index.scss`时才可以使用`$font-size`

`scss\uses\_index.scss`：

```scss
@use 'common' with($font-size:30px);

body{
    font-size: common.$font-size;
}

$font-size: common.$font-size;
```

`scss\use.scss`：

```scss
@use 'uses' as index; 
.container {
    font-size: index.$font-size;
}
```

------

我们可以使用如下方式解决这个问题：

`scss\uses\_common.scss`

```scss
$font-size: 14px !default;

* {
    margin: 0;
    padding: 0;
    font-size: $font-size;
    color: #333;
}

@function column-width($col, $total) {
    @return calc($col/$total);
}

@mixin bgColor($bg-color: #f2f2f2) {
    background-color: $bg-color;
}
```

`scss\uses\_global.scss`

```scss
$-font-size: 20px;
@mixin base($color:#f00){
    color: $color;
    font-size: $-font-size;
} 

.gclass {
    background-color: #f00;
}
```

`scss\_bootstrap.scss`

```scss
@forward 'uses/common';
@forward 'uses/global';
```

`scss\use.scss`

```scss
@use './bootstrap'; 
body{
    font-size: bootstrap.$font-size;
    width: bootstrap.column-width(3,12);
    @include bootstrap.bgColor(#f00);
    @include bootstrap.base(#f00);
}
```

------

**选择性转发：**

`scss\_bootstrap.scss`：`common`模块只转发`$font-size`和`column-width`

```scss
@forward 'uses/common' show $font-size,column-width;
@forward 'uses/global';
```

**选择性不转发：**

`scss\_bootstrap.scss`：`common`模块除`bgColor`其他都转发

```scss
@forward 'uses/common' hide bgColor;
@forward 'uses/global';
```

------

如果转发的模块有相同的变量时会报错，比如修改`scss\uses\_global.scss`如下所示，这样`common`和`global`都有`$font-size`，此时会报错

```scss
$font-size: 20px;
@mixin base($color:#f00){
    color: $color;
    font-size: $font-size;
} 

.gclass {
    background-color: #f00;
}
```

我们可以再转发时指定一个前缀来解决这个问题

> 注意：前缀后面要加一个`*`

```scss
@forward 'uses/common' as c-* hide bgColor;
@forward 'uses/global' as g-*;
```

`scss\use.scss`：使用时也需要加入前缀

```scss
@use './bootstrap'; 
body{
    font-size: bootstrap.$c-font-size;
    width: bootstrap.c-column-width(3,12);
    // @include bootstrap.bgColor(#f00);
    @include bootstrap.g-base(#f00);
}
```

但是此时我们可以使用`bgColor`了，这是因为设置`hide`时我们同样需要添加前缀

```scss
@use './bootstrap'; 
body{
    font-size: bootstrap.$c-font-size;
    width: bootstrap.c-column-width(3,12);
    @include bootstrap.c-bgColor(#f00);
    @include bootstrap.g-base(#f00);
}
```

`scss\_bootstrap.scss`：修改后就不能使用`bgColor`了

```scss
@forward 'uses/common' as c-* hide c-bgColor;
@forward 'uses/global' as g-*;
```

------

`@forward`也可以使用`with`修改变量的值

> 注意：`$font-size`不用加前缀`c-`

`scss\_bootstrap.scss`：（这里Vs Code编辑器爆红，但是编译器可以正常编译）

```scss
@forward 'uses/common' as c-* hide c-bgColor with($font-size: 60px);
@forward 'uses/global' as g-*;
```

------

如果`use.scss`还想要修改变量的值，`_bootstrap.scss`里该变量要设成默认值，并且`use.scss`里该变量要添加前缀

`scss\_bootstrap.scss`：

```scss
@forward 'uses/common' as c-* hide c-bgColor with($font-size: 60px !default);
@forward 'uses/global' as g-*; 
```

> `_bootstrap.scss`里的`with`里不添加前缀是因为 这里的`with`是修改的其对应模块的变量，也就是`uses\_common.scss`文件里的变量，这里面是没有前缀的，前缀是`_bootstrap.scss`文件里引入时指定的。
>
> `use.scss`里的`with`里需要添加前缀是因为修改的是`_bootstrap.scss`里的变量，再`_bootstrap.scss`里变量已经添加前缀了

`scss\use.scss`：

```scss
@use './bootstrap' with($c-font-size: 45px); 
body{
    font-size: bootstrap.$c-font-size;
    width: bootstrap.c-column-width(3,12);
    //@include bootstrap.c-bgColor(#f00);
    @include bootstrap.g-base(#f00);
}
```

如果在`scss\_bootstrap.scss`文件里修改`scss\uses\_common.scss`文件里某些变量的值后还想使用`scss\uses\_common.scss`文件里的值，可以使用`@use`引入

> 注意：如果使用`@forward`转发并使用`with`修改变量值，此时使用`@use`引入这个模块，必须放在`@forward`后，否则会报如下错误
>
> ```bash
> --------------------
> Compilation Error
> Error: This module was already loaded, so it can't be configured using "with".
>   ╷
> 1 │ @use 'uses/common';
>   │ ━━━━━━━━━━━━━━━━━━ original load
> 2 │ @forward 'uses/common' as c-* hide c-bgColor with($font-size: 60px !default);
>   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ new load
>   ╵
>   b:\scss\scss\_bootstrap.scss 2:1  @use
>   b:\scss\scss\use.scss 1:1         root stylesheet
> --------------------
> ```
>
> 如果`@forward`不使用`with`，则`@forward`和`@use`的顺序没有要求

`scss\_bootstrap.scss`：

```scss
@forward 'uses/common' as c-* hide c-bgColor with($font-size: 60px !default);
@forward 'uses/global' as g-*;
@use 'uses/common';
.block {
    @include common.bgColor(#fff);
}
```

### 7.9 `@at-root`

`@at-root`可以使被嵌套的选择器或属性跳出嵌套

```scss
@at-root <selector>{
    ...
}
```

**普通嵌套**

scss文件：

```scss
.parent {
    font-size: 12px;
    .child {
        font-size: 14px;
        .son {
            font-size: 16px;
        }
    }
}
```

编译后的 css文件：

```css
.parent {
  font-size: 12px;
}
.parent .child {
  font-size: 14px;
}
.parent .child .son {
  font-size: 16px;
}
```

------

作用某个选择器使其跳出嵌套

scss文件：

```scss
.parent {
    font-size: 12px;
    @at-root .child1 {
        font-size: 14px;
        .son1 {
            font-size: 16px;
        }
    }
    .child2{
        background-color: red;
        @at-root .son2 {
            font-size: 16px;
        }
    }
    @at-root {
        .child3 {
            font-size: 16px;
        }
    }
}
```

编译后的 css文件：

```css
.parent {
  font-size: 12px;
}
.child1 {
  font-size: 14px;
}
.child1 .son1 {
  font-size: 16px;
}

.parent .child2 {
  background-color: red;
}
.son2 {
  font-size: 16px;
}

.child3 {
  font-size: 16px;
}
```

------

我们也可以使用如下方式达到同样的目的（不过感觉好像没啥用）

scss文件：

```scss
.foo {
    .bar {
        font-size: 12px;
    }
}

.foo {
    & {
        font-size: 12px;
    }
}

.foo {
    & .bar {
        font-size: 12px;
    }
}

.foo {
    .bar & {
        font-size: 12px;
    }
}
```

编译后的 css文件：

```css
.foo .bar {
  font-size: 12px;
}

.foo {
  font-size: 12px;
}

.foo .bar {
  font-size: 12px;
}

.bar .foo {
  font-size: 12px;
}
```

------

`BEM命名规范`

scss文件：

```scss
.block{
    width: 100px;
    @at-root #{&}_element {
        font-size: 12px;
        @at-root #{&}--modifier {
            font-size: 16px;
        }
    }
    @at-root #{&}--modifier {
        font-size: 14px;
    }
}
```

scss文件：

```css
.block {
  width: 100px;
}
.block_element {
  font-size: 12px;
}
.block_element--modifier {
  font-size: 16px;
}

.block--modifier {
  font-size: 14px;
}
```

我们也可以使用`&`到达相同的效果

```scss
.block{
    width: 100px;
    &_element {
        font-size: 12px;
        &--modifier {
            font-size: 16px;
        }
    }
    &--modifier {
        font-size: 14px;
    }
}
```

------

`@at-root (without: ...)`和`@at-root (with: ...)`的使用
默认`@at-root`只会跳出选择器嵌套，而不能跳出`@media`或`@support`，如果要跳出这两种,则需使用`@at-root (without: media)`, `@at-root (without: support)`。
这个语法的关键词有四个:
1、all (表示所有)
2、rule (表示常规css，默认)
3、media (表示media)
4、supports (表示supports)

**比如：我们直接使用`@at-root`跳不出媒体查询**

scss文件：

```scss
@media screen {
    .parent {
        font-size: 12px;
        @at-root {
            .child {
                font-size: 14px;
                .son {
                    font-size: 16px;
                }
            }
        }
    }
}
```

编译后的 css文件：

```css
@media screen {
  .parent {
    font-size: 12px;
  }
  .child {
    font-size: 14px;
  }
  .child .son {
    font-size: 16px;
  }
}
```

------

我们使用`@at-root (without: media)`后就可以跳出媒体查询

scss文件：

```scss
@media screen {
    .parent {
        font-size: 12px;
        @at-root (without: media) {
            .child {
                font-size: 14px;
                .son {
                    font-size: 16px;
                }
            }
        }
    }
}
```

编译后的 css文件：

```css
@media screen {
  .parent {
    font-size: 12px;
  }
}
.parent .child {
  font-size: 14px;
}
.parent .child .son {
  font-size: 16px;
}
```

------

scss文件：

```scss
@supports (display: flex) {
    .parent {
        font-size: 12px;
        @at-root (without: supports) {
            .child {
                font-size: 14px;
                .son {
                    font-size: 16px;
                }
            }
        }
    }
}
```

编译后的 css文件：

```css
@supports (display: flex) {
  .parent {
    font-size: 12px;
  }
}
.parent .child {
  font-size: 14px;
}
.parent .child .son {
  font-size: 16px;
}
```

