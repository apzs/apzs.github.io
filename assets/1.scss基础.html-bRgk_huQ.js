import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as c,c as o,a as n,b as s,d as p,e as i}from"./app-db_OQQsY.js";const l={},u=n("h1",{id:"scss-基本语法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#scss-基本语法","aria-hidden":"true"},"#"),s(" Scss 基本语法")],-1),r=n("p",null,"Scss 在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，实现更高效地开发网站前端。",-1),d={href:"https://www.sass.hk/docs/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://sass-lang.com/documentation/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/sass/sass",target:"_blank",rel:"noopener noreferrer"},m=i(`<h2 id="功能特点" tabindex="-1"><a class="header-anchor" href="#功能特点" aria-hidden="true">#</a> 功能特点</h2><ul><li>完全兼容 CSS3</li><li>在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能</li><li>通过函数进行颜色值与属性值的运算</li><li>提供控制指令 (control directives)等高级功能</li><li>自定义输出格式</li></ul><h2 id="安装live-sass-compiler插件" tabindex="-1"><a class="header-anchor" href="#安装live-sass-compiler插件" aria-hidden="true">#</a> 安装<code>Live Sass Compiler</code>插件</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105521693.png" alt="image-20230213105521693" tabindex="0" loading="lazy"><figcaption>image-20230213105521693</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105634312.png" alt="image-20230213105634312" tabindex="0" loading="lazy"><figcaption>image-20230213105634312</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105639963.png" alt="image-20230213105639963" tabindex="0" loading="lazy"><figcaption>image-20230213105639963</figcaption></figure><p>将<code>settings.json</code>文件里自动生成的如下代码删掉</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;liveSassCompile.settings.autoprefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>

<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改为如下代码：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// &quot;liveSassCompile.settings.autoprefix&quot;: [</span>

    <span class="token comment">// ]</span>
    <span class="token property">&quot;liveSassCompile.settings.formats&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token comment">// This is Default.</span>
        <span class="token punctuation">{</span>
            <span class="token comment">/**
                :nested     - 嵌套格式
                :expanded   - 展开格式
                :compact    - 紧凑模式
                :compressed - 压缩格式
            */</span>
            <span class="token property">&quot;format&quot;</span><span class="token operator">:</span> <span class="token string">&quot;compact&quot;</span><span class="token punctuation">,</span>     <span class="token comment">// 可定制的出口css样式（expanded，compact，compressed，nested）</span>
            <span class="token property">&quot;extensionName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.css&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;savePath&quot;</span><span class="token operator">:</span> <span class="token string">&quot;~/../css&quot;</span>   <span class="token comment">// 默认为null，表示当前目录 </span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 排除的目录</span>
    <span class="token property">&quot;liveSassCompile.settings.excludeList&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;**/node_modules/**&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;.vscode/**&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 是否生成对应的map</span>
    <span class="token property">&quot;liveSassCompile.settings.generateMap&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 是否添加兼容前缀 例如： -webkit- -moz-  等（比如flex布局有些浏览器需要添加一些兼容性代码）</span>
    <span class="token property">&quot;liveSassCompile.settings.autoprefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;&gt; 1%&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;last 2 versions&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;explorer.confirmDelete&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213105918944.png" alt="image-20230213105918944" tabindex="0" loading="lazy"><figcaption>image-20230213105918944</figcaption></figure><p>新建<code>css.scss</code>文件，编写如下代码，点击右下角的<code>Watch scss</code>使其变成<code>Watching...</code>，即可生成对应的<code>css.css</code>和<code>css.css.map</code>，此时如果更改<code>css.scss</code>文件内容即可自动更新。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$baseColor</span></span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token selector">p</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$baseColor</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213111135990.png" alt="image-20230213111135990" tabindex="0" loading="lazy"><figcaption>image-20230213111135990</figcaption></figure><p>兼容性支持：我们使用<code>display: flex;</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$baseColor</span></span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token selector">p</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$baseColor</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会自动给我们添加一些兼容性代码</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span> <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span> <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span> <span class="token property">display</span><span class="token punctuation">:</span> -ms-flexbox<span class="token punctuation">;</span> <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment">/*# sourceMappingURL=css.css.map */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213113006042.png" alt="image-20230213113006042" tabindex="0" loading="lazy"><figcaption>image-20230213113006042</figcaption></figure><p>我们可以在<code>index.html</code>文件里引入<code>css/css.css</code>，在<code>scss/css.scss</code>里写样式，这样可以自动更新<code>css/css.css</code>。</p><p>可以看到这个<code>Live Sass Compiler</code>已经弃用了</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213151045985.png" alt="image-20230213151045985" tabindex="0" loading="lazy"><figcaption>image-20230213151045985</figcaption></figure><p>我们可以使用如下这个插件</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213151102776.png" alt="image-20230213151102776" tabindex="0" loading="lazy"><figcaption>image-20230213151102776</figcaption></figure><p>修改<code>settings.json</code>里的<code>liveSassCompile.settings.excludeList</code>配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 排除的目录</span>
<span class="token property">&quot;liveSassCompile.settings.excludeList&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
<span class="token string">&quot;/**/node_modules/**&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;/.vscode/**&quot;</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模式" tabindex="-1"><a class="header-anchor" href="#模式" aria-hidden="true">#</a> 模式</h2><p>修改<code>scss/css.scss</code>文件为如下所示</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">html</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token selector">.header </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
        <span class="token selector">.left </span><span class="token punctuation">{</span>
            <span class="token property">float</span><span class="token punctuation">:</span>left<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.footer </span><span class="token punctuation">{</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector"><span class="token parent important">&amp;</span>::after</span><span class="token punctuation">{</span>
        <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1、嵌套模式-nested" tabindex="-1"><a class="header-anchor" href="#_1、嵌套模式-nested" aria-hidden="true">#</a> 1、嵌套模式（<code>nested</code>）</h3><p>新版本的<code>sass-loader</code>不支持这种模式，新版本的<code>Live Sass Compiler</code>也不支持</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Compilation Error
Error: Invalid argument<span class="token punctuation">(</span>s<span class="token punctuation">)</span>: Unsupported output style <span class="token string">&quot;nested&quot;</span><span class="token builtin class-name">.</span>
--------------------
Watching<span class="token punctuation">..</span>.
--------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213151914201.png" alt="image-20230213151914201" tabindex="0" loading="lazy"><figcaption>image-20230213151914201</figcaption></figure><h3 id="_2、展开模式-expanded" tabindex="-1"><a class="header-anchor" href="#_2、展开模式-expanded" aria-hidden="true">#</a> 2、展开模式（<code>expanded</code>）</h3><p>展开格式就是平时我们写<code>css</code>的格式，适合开发使用</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">html</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .header</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .header .left</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .footer</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container::after</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token comment">/*# sourceMappingURL=css.css.map */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213152048359.png" alt="image-20230213152048359" tabindex="0" loading="lazy"><figcaption>image-20230213152048359</figcaption></figure><h3 id="_3、紧凑模式-compact" tabindex="-1"><a class="header-anchor" href="#_3、紧凑模式-compact" aria-hidden="true">#</a> 3、紧凑模式（<code>compact</code>）</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Compilation Error
Error: Invalid argument<span class="token punctuation">(</span>s<span class="token punctuation">)</span>: Unsupported output style <span class="token string">&quot;compact&quot;</span><span class="token builtin class-name">.</span>
--------------------
Watching<span class="token punctuation">..</span>.
--------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213153328796.png" alt="image-20230213153328796" tabindex="0" loading="lazy"><figcaption>image-20230213153328796</figcaption></figure><h3 id="_4、压缩模式-compressed" tabindex="-1"><a class="header-anchor" href="#_4、压缩模式-compressed" aria-hidden="true">#</a> 4、压缩模式（<code>compressed</code>）</h3><p>压缩格式就是样式全写在一行，适合线上发布</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">html</span><span class="token punctuation">{</span><span class="token property">font-size</span><span class="token punctuation">:</span>12px<span class="token punctuation">;</span><span class="token property">color</span><span class="token punctuation">:</span>#333<span class="token punctuation">}</span><span class="token selector">.container</span><span class="token punctuation">{</span><span class="token property">font-size</span><span class="token punctuation">:</span>14px<span class="token punctuation">}</span><span class="token selector">.container .header</span><span class="token punctuation">{</span><span class="token property">width</span><span class="token punctuation">:</span>50px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span>30px<span class="token punctuation">}</span><span class="token selector">.container .header .left</span><span class="token punctuation">{</span><span class="token property">float</span><span class="token punctuation">:</span>left<span class="token punctuation">}</span><span class="token selector">.container .footer</span><span class="token punctuation">{</span><span class="token property">background-color</span><span class="token punctuation">:</span>green<span class="token punctuation">}</span><span class="token selector">.container::after</span><span class="token punctuation">{</span><span class="token property">display</span><span class="token punctuation">:</span>inline-block<span class="token punctuation">}</span><span class="token comment">/*# sourceMappingURL=css.css.map */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213153443525.png" alt="image-20230213153443525" tabindex="0" loading="lazy"><figcaption>image-20230213153443525</figcaption></figure><h2 id="基础格式" tabindex="-1"><a class="header-anchor" href="#基础格式" aria-hidden="true">#</a> 基础格式</h2><h3 id="选择器嵌套-nested-selector" tabindex="-1"><a class="header-anchor" href="#选择器嵌套-nested-selector" aria-hidden="true">#</a> 选择器嵌套 (Nested Selector)</h3><p>可以使用不同的选择器进行嵌套，可更方便与直观的查看与管理选择器的父子级关系</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token selector">.header </span><span class="token punctuation">{</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">line-height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
        <span class="token selector">.logo </span><span class="token punctuation">{</span>
            <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
            <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.footer </span><span class="token punctuation">{</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
        <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
        <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .header</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .header .logo</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .footer</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
  <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="父选择器添加内容" tabindex="-1"><a class="header-anchor" href="#父选择器添加内容" aria-hidden="true">#</a> 父选择器添加内容 &amp;</h3><p>添加符号 ”&amp;“ ，表示在该父容器后面添加相应的后缀，可是该元素的某个行为或其他等。</p><p>当我们想对子元素设置样式时，可以写在父元素的里面，可以使用<code>&amp;</code>符号表示父元素</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token selector">a </span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
        <span class="token selector"><span class="token parent important">&amp;</span>:hover </span><span class="token punctuation">{</span>
            <span class="token property">text-decoration</span><span class="token punctuation">:</span> underline<span class="token punctuation">;</span>
            <span class="token property">color</span><span class="token punctuation">:</span> #F00<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.top </span><span class="token punctuation">{</span>
        <span class="token property">border</span><span class="token punctuation">:</span> 1px #f2f2f2 solid<span class="token punctuation">;</span>
        <span class="token selector"><span class="token parent important">&amp;</span>-left </span><span class="token punctuation">{</span>
            <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container a</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container a:hover</span> <span class="token punctuation">{</span>
  <span class="token property">text-decoration</span><span class="token punctuation">:</span> underline<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #F00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .top</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px #f2f2f2 solid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .top-left</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token comment">/*# sourceMappingURL=css.css.map */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213155028257.png" alt="image-20230213155028257" tabindex="0" loading="lazy"><figcaption>image-20230213155028257</figcaption></figure><h3 id="属性嵌套-nested-properties" tabindex="-1"><a class="header-anchor" href="#属性嵌套-nested-properties" aria-hidden="true">#</a> 属性嵌套 (Nested Properties)</h3><p>属性名称前都具有相同的字符时，可使用属性嵌套的方法。注：font: {}，冒号后与花括号中间需有空格进行隔开</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token selector">a </span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
        <span class="token selector">font: </span><span class="token punctuation">{</span>
            <span class="token property">size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
            <span class="token property">family</span><span class="token punctuation">:</span> sans-serif<span class="token punctuation">;</span>
            <span class="token property">weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container a</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> sans-serif<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token comment">/*# sourceMappingURL=css.css.map */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230213160228934.png" alt="image-20230213160228934" tabindex="0" loading="lazy"><figcaption>image-20230213160228934</figcaption></figure><h3 id="占位符选择器-foo" tabindex="-1"><a class="header-anchor" href="#占位符选择器-foo" aria-hidden="true">#</a> 占位符选择器 <code>%foo</code></h3><p>有时需要定义一套样式，但并不给某个元素使用，必须在需要调用的时候才启用此样式库，使用 “%foo” 占位，通过 “@extend” 进行调用。%foo 名称可自己定义，前面需加上符号 “%“</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.button<span class="token placeholder">%buttonStyle</span> </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 36px<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn-default </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%buttonStyle</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn-success </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%buttonStyle</span><span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.button.btn-default, .button.btn-success</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 36px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn-default</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.btn-success</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #eee<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230214093051823.png" alt="image-20230214093051823" tabindex="0" loading="lazy"><figcaption>image-20230214093051823</figcaption></figure><h2 id="代码注释" tabindex="-1"><a class="header-anchor" href="#代码注释" aria-hidden="true">#</a> 代码注释</h2><p>支持标准的 Css 的注释语法，单行注释 <code>//</code> 与多行注释 <code>/* */</code>。注释在 .scss 中的规则：</p><ol><li>单行注释，不会解析到 <code>.css</code> 文件中；</li><li>如果选择的输出格式是<code>compressed</code>，则所有的注释信息都不会解析出来；</li><li>在多行注释中添加 “!”，则可保留这条注释到压缩文件中，此方法主要用于文件的版权声明；</li><li>多行注释中可以添加插值语句 ( <code>interpolation</code> )</li></ol><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 单行注释</span>

<span class="token comment">/*
 * 多行注释 */</span>

<span class="token comment">/*!
 * 版权声明
 * 作者: #{#author} */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// compile scss files to css</span>
<span class="token comment">// it&#39;s ready to do it.</span>

<span class="token comment">/* 
	hello
	world!
*/</span>
<span class="token property"><span class="token variable">$pink</span></span><span class="token punctuation">:</span> #f3e1e1<span class="token punctuation">;</span>
<span class="token selector">html</span><span class="token punctuation">{</span>
   <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$pink</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$author</span></span><span class="token punctuation">:</span> <span class="token string">&#39;gdream@126.com&#39;</span><span class="token punctuation">;</span>
<span class="token comment">/*!
	Author: #{$author}.
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发模式编译后:</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* 
	hello
	world!
*/</span>
<span class="token selector">html</span><span class="token punctuation">{</span>
   <span class="token property">background-color</span><span class="token punctuation">:</span> #f3e1e1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*!
	Author: &#39;gdream@126.com&#39;.
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压缩输出模式编译后：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">html</span><span class="token punctuation">{</span>
   <span class="token property">background-color</span><span class="token punctuation">:</span> #f3e1e1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/*!
	Author: &#39;gdream@126.com&#39;.
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件导入" tabindex="-1"><a class="header-anchor" href="#文件导入" aria-hidden="true">#</a> 文件导入</h2><p>使用 <code>@import</code> 进行文件的导入</p><h3 id="原生css文件导入" tabindex="-1"><a class="header-anchor" href="#原生css文件导入" aria-hidden="true">#</a> 原生<code>css</code>文件导入</h3><p><code>test.css</code>：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@import</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>css.css<span class="token punctuation">)</span></span><span class="token punctuation">;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="导入-scss-文件" tabindex="-1"><a class="header-anchor" href="#导入-scss-文件" aria-hidden="true">#</a> 导入 .scss 文件</h3><p><code>css.scss</code>：</p><p>导入 .scss 文件的方式，使用 <code>@import</code> 进行导入，文件名可以有 .scss 后缀，也可以省略</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 方法1</span>
<span class="token keyword">@import</span> <span class="token string">&#39;main.scss&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 方法2</span>
<span class="token keyword">@import</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注：导入的 <code>main.scss</code> 文件会生成<code>main.css</code>，如果不想让导入的<code>main.scss</code>生成<code>main.css</code>文件（例如<code>main.scss</code>文件只做全局变量使用，里面不需要生成css样式），需要在被导入的<code>main.css</code>文件名前增加一个下划线 <code>_</code> 的符号（即<code>_main.scss</code>），这样可以保证该文件不会被重新生成 <code>.css</code> 文件，而在导入该<code>_main.scss</code>文件时，前面的下划线可以写入也可以省略：</p></blockquote><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 以下代码表示将导入一个名为 “_main.scss” 的文件</span>
<span class="token comment">// 方法1</span>
<span class="token keyword">@import</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// 方法2</span>
<span class="token keyword">@import</span> <span class="token string">&#39;_main&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入文件同样也可以写入选择器中，写入选择器后，导入的文件中的所有变量将只适用于该选择器，同时导入的文件中的所有选择器前也会增加发生导入的选择器前的名称：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@import</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入普通的-css-文件" tabindex="-1"><a class="header-anchor" href="#导入普通的-css-文件" aria-hidden="true">#</a> 导入普通的 .css 文件</h3><p>以下几种方式，只会将文件作为普通的 css 语句进行引入</p><ol><li>文件拓展名为 .css</li><li>文件名以 http:// 或 https:// 开头</li><li>文件由 url() 的形式引入</li><li><template></template></li></ol><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@import</span> <span class="token string">&#39;main.css&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@import</span> <span class="token string">&#39;http://puji.design/main.css&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@import</span> <span class="token url">url</span><span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">@import</span> <span class="token string">&#39;landscape&#39;</span> screen <span class="token operator">and</span> <span class="token punctuation">(</span><span class="token property">orientation</span><span class="token punctuation">:</span> landscape<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注：采用 @import ‘main.css’ 这种形式引入文件，编译后，文件地址将为计算机的绝对地址，这样的引入形式慎用，建议采用 @import url(main) 的方式。</p></blockquote><h2 id="插值语句" tabindex="-1"><a class="header-anchor" href="#插值语句" aria-hidden="true">#</a> 插值语句<code>#</code></h2><p>常使用于选择器、属性名、属v性值、注释等地。如下示例，“font: #{$font-size}/#{$line-height} Helvetica” 当两个变量使用 “/” 时，程序会自动运算出值，如使用插值语句，则可避免运算出结果</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$author</span></span><span class="token punctuation">:</span> <span class="token string">&#39;PUJI Design&#39;</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$class-name</span></span><span class="token punctuation">:</span> danger<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$attr</span></span><span class="token punctuation">:</span> color<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$line-height</span></span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>

<span class="token comment">/*
 * 插值语句示例
 * @author: #{$author} */</span>
<span class="token selector">a.<span class="token variable">#{$class-name}</span> </span><span class="token punctuation">{</span>
    <span class="token property">font</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span>/<span class="token variable">$line-height</span> Helvetica<span class="token punctuation">;</span>
    <span class="token property">font</span><span class="token punctuation">:</span> <span class="token variable">#{$font-size}</span>/<span class="token variable">#{$line-height}</span> Helvetica<span class="token punctuation">;</span>
    <span class="token property">font-<span class="token variable">#{$attr}</span></span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">;</span></span>
<span class="token comment">/*
 * 插值语句示例
 * @author: PUJI Design */</span>
<span class="token selector">a.danger</span> <span class="token punctuation">{</span>
  <span class="token property">font</span><span class="token punctuation">:</span> 0.5333333333 Helvetica<span class="token punctuation">;</span>
  <span class="token property">font</span><span class="token punctuation">:</span> 16px/30px Helvetica<span class="token punctuation">;</span>
  <span class="token property">font-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="混合指令" tabindex="-1"><a class="header-anchor" href="#混合指令" aria-hidden="true">#</a> 混合指令</h2><p>混合指令用于定义可重复使用的样式。混合指令可以包含所有的 Css 规则与绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。</p><h3 id="定义与使用混合指令" tabindex="-1"><a class="header-anchor" href="#定义与使用混合指令" aria-hidden="true">#</a> 定义与使用混合指令</h3><p>使用 <code>@mixin</code> 定义混合指令以及使用 <code>@include</code> 进行调用</p><h4 id="基础写法" tabindex="-1"><a class="header-anchor" href="#基础写法" aria-hidden="true">#</a> 基础写法</h4><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token selector">name </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> name<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="混合指令中添加选择器" tabindex="-1"><a class="header-anchor" href="#混合指令中添加选择器" aria-hidden="true">#</a> 混合指令中添加选择器</h4><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token selector">name </span><span class="token punctuation">{</span>
    <span class="token selector">.wrap </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> name<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container .wrap</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译的结果类似于：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token selector">.wrap </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 1200px<span class="token punctuation">;</span>
        <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="带参数的混合指令" tabindex="-1"><a class="header-anchor" href="#带参数的混合指令" aria-hidden="true">#</a> 带参数的混合指令</h4><p>使用 <code>$name</code> 给参数命名，在调用的时候给参数赋值：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token function">flex-align</span><span class="token punctuation">(</span><span class="token variable">$aligndirect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">-webkit-box-align</span><span class="token punctuation">:</span> <span class="token variable">$aligndirect</span><span class="token punctuation">;</span>
    <span class="token property">-webkit-align-item</span><span class="token punctuation">:</span> <span class="token variable">$aligndirect</span><span class="token punctuation">;</span>
    <span class="token property">-ms-flex-align</span><span class="token punctuation">:</span> <span class="token variable">$aligndirect</span><span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> <span class="token variable">$aligndirect</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">flex-align</span><span class="token punctuation">(</span>center<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">-webkit-box-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">-webkit-align-item</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">-ms-flex-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>参数可以写一个也可写多个，参数的数目与顺序需一一对应：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token function">block-padding</span><span class="token punctuation">(</span><span class="token variable">$top</span><span class="token punctuation">,</span> <span class="token variable">$right</span><span class="token punctuation">,</span> <span class="token variable">$bottom</span><span class="token punctuation">,</span> <span class="token variable">$left</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token variable">$top</span><span class="token punctuation">,</span> <span class="token variable">$right</span><span class="token punctuation">,</span> <span class="token variable">$bottom</span><span class="token punctuation">,</span> <span class="token variable">$left</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">block-padding</span><span class="token punctuation">(</span>8px<span class="token punctuation">,</span> 36px<span class="token punctuation">,</span> 12px<span class="token punctuation">,</span> 36px<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 8px<span class="token punctuation">,</span> 36px<span class="token punctuation">,</span> 12px<span class="token punctuation">,</span> 36px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>给指定参数赋值，顺序可随意调整，如以下代码，编译后的 css 也是相同的结果：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token function">block-padding</span><span class="token punctuation">(</span><span class="token variable">$top</span><span class="token punctuation">,</span> <span class="token variable">$right</span><span class="token punctuation">,</span> <span class="token variable">$bottom</span><span class="token punctuation">,</span> <span class="token variable">$left</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token variable">$top</span><span class="token punctuation">,</span> <span class="token variable">$right</span><span class="token punctuation">,</span> <span class="token variable">$bottom</span><span class="token punctuation">,</span> <span class="token variable">$left</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">block-padding</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$right</span></span><span class="token punctuation">:</span>36px<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$left</span></span><span class="token punctuation">:</span>36px<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$top</span></span><span class="token punctuation">:</span>8px<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$bottom</span></span><span class="token punctuation">:</span>12px<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>给参数添加默认值后，在调用时指定参数，未指定的参数将使用默认值：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token function">block-padding</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$top</span></span><span class="token punctuation">:</span>0<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$right</span></span><span class="token punctuation">:</span>0<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$bottom</span></span><span class="token punctuation">:</span>0<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$left</span></span><span class="token punctuation">:</span>0<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token variable">$top</span><span class="token punctuation">,</span> <span class="token variable">$right</span><span class="token punctuation">,</span> <span class="token variable">$bottom</span><span class="token punctuation">,</span> <span class="token variable">$left</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">block-padding</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$top</span></span><span class="token punctuation">:</span>8px<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$bottom</span></span><span class="token punctuation">:</span>12px<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 8px<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 12px<span class="token punctuation">,</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>混合指令中的参数可设置为一个数组形式，以 “$name…” 表示，比如以下线性渐变的代码：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 定义混合指令</span>
<span class="token keyword">@mixin</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span> <span class="token variable">$gradients</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">nth</span><span class="token punctuation">(</span><span class="token variable">$gradients</span><span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span> <span class="token variable">$gradients</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用混合指令</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> #f00<span class="token punctuation">,</span> orange<span class="token punctuation">,</span> yellow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">-webkit-gradient</span><span class="token punctuation">(</span>linear<span class="token punctuation">,</span> left top<span class="token punctuation">,</span> right top<span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">color-stop</span><span class="token punctuation">(</span>orange<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">to</span><span class="token punctuation">(</span>yellow<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> #f00<span class="token punctuation">,</span> orange<span class="token punctuation">,</span> yellow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="混合指令总结" tabindex="-1"><a class="header-anchor" href="#混合指令总结" aria-hidden="true">#</a> 混合指令总结</h3><ol><li>混合指令 ( @mixin ) 是可以重复使用的一组 Css 声明；</li><li>有助于减少重复代码，只需声明一次就可以在文件中反复引用；</li><li>包含所有 Css 规则以及绝大部分 Sass 规则，甚至通过参数引入变量；</li><li>使用参数时，建议加上默认值。</li></ol><h2 id="继承指令" tabindex="-1"><a class="header-anchor" href="#继承指令" aria-hidden="true">#</a> 继承指令</h2><p>在不同的元素具有完全相同的样式与 Css 属性时，可以使用继承指令实现，继承指令 @extend</p><h3 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h3><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.alert </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-info </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .alert<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>238<span class="token punctuation">,</span> 238<span class="token punctuation">,</span> 238<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>54<span class="token punctuation">,</span> 54<span class="token punctuation">,</span> 54<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-success </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .alert<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>225<span class="token punctuation">,</span> 250<span class="token punctuation">,</span> 242<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>13<span class="token punctuation">,</span> 112<span class="token punctuation">,</span> 79<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-error </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .alert<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>250<span class="token punctuation">,</span> 225<span class="token punctuation">,</span> 225<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>112<span class="token punctuation">,</span> 13<span class="token punctuation">,</span> 18<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.alert, .alert-info, .alert-success, .alert-error</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eeeeee<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #363636<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-success</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #e1faf2<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #0d704f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-error</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #fae1e1<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #700d12<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>一个选择器中可以实现多个继承的形式，如：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.alert </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.additional </span><span class="token punctuation">{</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-info </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .alert<span class="token punctuation">;</span>
    <span class="token keyword">@extend</span> .additional<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>238<span class="token punctuation">,</span> 238<span class="token punctuation">,</span> 238<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>54<span class="token punctuation">,</span> 54<span class="token punctuation">,</span> 54<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.alert, .alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.additional, .alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eeeeee<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #363636<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>多层继承形式：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.alert </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.additional </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .alert<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-info </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> .additional<span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>238<span class="token punctuation">,</span> 238<span class="token punctuation">,</span> 238<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>54<span class="token punctuation">,</span> 54<span class="token punctuation">,</span> 54<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.alert, .additional, .alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.additional, .alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 4px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eeeeee<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #363636<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用占位符选择器" tabindex="-1"><a class="header-anchor" href="#使用占位符选择器" aria-hidden="true">#</a> 使用占位符选择器</h3><p>使用占位符选择器的好处，是原始的代码不会在 Css 文件中编译，保持代码的简介干净</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector"><span class="token placeholder">%alert</span> </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-info </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%alert</span><span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>238<span class="token punctuation">,</span> 238<span class="token punctuation">,</span> 238<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>54<span class="token punctuation">,</span> 54<span class="token punctuation">,</span> 54<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-success </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%alert</span><span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>225<span class="token punctuation">,</span> 250<span class="token punctuation">,</span> 242<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>13<span class="token punctuation">,</span> 112<span class="token punctuation">,</span> 79<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.alert-error </span><span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%alert</span><span class="token punctuation">;</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>250<span class="token punctuation">,</span> 225<span class="token punctuation">,</span> 225<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>112<span class="token punctuation">,</span> 13<span class="token punctuation">,</span> 18<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.alert-info, .alert-success, .alert-error</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 8px 12px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-info</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #eeeeee<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #363636<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-success</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #e1faf2<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #0d704f<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.alert-error</span> <span class="token punctuation">{</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #fae1e1<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #700d12<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scss变量" tabindex="-1"><a class="header-anchor" href="#scss变量" aria-hidden="true">#</a> Scss变量</h2><h3 id="原生css中变量基本用法" tabindex="-1"><a class="header-anchor" href="#原生css中变量基本用法" aria-hidden="true">#</a> 原生<code>css</code>中变量基本用法</h3><p><code>test.css</code>：</p><p>1、css中声明变量</p><p>声明一个自定义属性，属性名需要以两个减号（--）开始，属性值则可以是任何有效的CSS值。和其他属性一样，自定义属性也是写在规则集之内的，如下：</p><p>常见的最佳实践是在<code>:root</code>伪类上定义自定义属性，以便可以在 HTML 文档中全局应用它：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">:root</span> <span class="token punctuation">{</span>
  <span class="token property">--main-bg-color</span><span class="token punctuation">:</span> brown<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、使用</p><p>您可以通过在var()函数中指定自定义属性名称来使用自定义属性值，而不是常规属性值：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">element</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--main-bg-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，提供给规则集的选择器定义了可以使用自定义属性的范围，您可能限制自定义属性的范围 3、js操作css变量 在 JS 代码中，我们可能需要读取 CSS 变量的值，其方法如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> root <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&quot;:root&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置 CSS 变量</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;--main-bg-color&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 读取 CSS 变量</span>
<span class="token keyword">const</span> computedStyle <span class="token operator">=</span> <span class="token function">getComputedStyle</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> mainBgColor <span class="token operator">=</span> computedStyle<span class="token punctuation">.</span><span class="token function">getPropertyValue</span><span class="token punctuation">(</span><span class="token string">&quot;--main-bg-color&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>mainBgColor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 删除 CSS 变量</span>
root<span class="token punctuation">.</span>style<span class="token punctuation">.</span><span class="token function">removeProperty</span><span class="token punctuation">(</span><span class="token string">&quot;--main-bg-color&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：灵活使用 CSS 变量，不仅可以提高生产力，也能够提高代码的可阅读性和维护性。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">:root</span> <span class="token punctuation">{</span>
    <span class="token property">--color</span><span class="token punctuation">:</span> #F00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
    <span class="token property">--border-color</span><span class="token punctuation">:</span> #f2f2f2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.header</span> <span class="token punctuation">{</span>
    <span class="token property">--background-color</span><span class="token punctuation">:</span> #f8f8f8<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">p</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--color<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">border-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--border-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.header</span> <span class="token punctuation">{</span>
    // 注意变量的使用范围
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--background-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量的声明" tabindex="-1"><a class="header-anchor" href="#变量的声明" aria-hidden="true">#</a> 变量的声明</h3><p>使用符号 <code>$</code> 定义变量，变量名称可自己命名，赋值方法与 Css 相同。如：<code>$color: red;</code></p><p>变量的定义与使用需有先后顺序，即先定义变量，然后再使用变量，书写的顺序则是将定义变量写在前面，使用变量写在后面。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量的命名规则" tabindex="-1"><a class="header-anchor" href="#变量的命名规则" aria-hidden="true">#</a> 变量的命名规则</h3><ol><li>用符号 <code>$</code> 开头，后面跟随变量名称；</li><li>变量名称需使用字母开头，中间可使用字母、数字、中横线（连接符）、下划线；</li><li>支持大/小写字母。</li></ol><p>如果多个单词的连接，可以使用横线 <code>-</code>、下划线 <code>_</code> 或驼峰式的命名形式，需要注意的是，如果同样的单词，分别采用横线与下划线来连接，此名称相当于是同一个名称，在解析时，会采用最后一个声明的变量来解析。因此在命名的时候建议统一使用一个符号。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$border_color</span></span><span class="token punctuation">:</span> #0ff<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$border-color</span></span><span class="token punctuation">:</span> #ff0<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$borderColor</span></span><span class="token punctuation">:</span> #00f<span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token property">border-color</span><span class="token punctuation">:</span> <span class="token variable">$border_color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> #ff0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量的默认值" tabindex="-1"><a class="header-anchor" href="#变量的默认值" aria-hidden="true">#</a> 变量的默认值</h3><p>可以使用 <code>!default</code> 为每个变量设置一个默认值，如果该变量没有被重新定义过，则会将该变量解析为默认值，如果已经有过定义，则会取其以定义过的值。以下代码已经有定义过该变量，因此获取的是定义过的值，默认值不会覆盖之前已经定义过的值。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #666 <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量的作用域" tabindex="-1"><a class="header-anchor" href="#变量的作用域" aria-hidden="true">#</a> 变量的作用域</h3><h4 id="局部变量" tabindex="-1"><a class="header-anchor" href="#局部变量" aria-hidden="true">#</a> 局部变量</h4><p>在选择器中定义的变量，只能在该选择器或该选择器的子选择器中使用</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token selector">.wrapper </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container .wrapper</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全局变量" tabindex="-1"><a class="header-anchor" href="#全局变量" aria-hidden="true">#</a> 全局变量</h4><p>定义后的变量，可以在全局范围内使用，全局变量的定义有两种形式：</p><p>1、直接定义在最外面的变量，即是全局变量</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.footer </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.footer</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、在选择器中定义的变量后面增加 “!global”，注意，!global 需添加在分号前，与变量值使用空格分割。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px !global<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.footer </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.footer</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2><p>Scss 支持以下几种主要的数据类型：</p><ol><li>字符串（ 有引号或无引号的字符串 ）：<code>&quot;foo&quot;</code>, <code>&#39;bar&#39;</code> , <code>baz</code> , …</li><li>数字：<code>1</code> , <code>2.5</code> , <code>18px</code> , <code>30%</code> , <code>9a</code> …</li><li>颜色：<code>blue</code> , <code>#00ff00</code> , <code>rgba(0, 0, 0, .1)</code></li><li>布尔型：<code>true</code> , <code>false</code></li><li>空值：<code>null</code></li><li>数组 (list)， 用逗号或空格分割：<code>1em 2em 2.5em</code> 或 <code>Helvetica, Arial, sans-serif</code>…</li><li>maps，相当于 JavaScript 中的 object：<code>(key1: value1, key2: value2)</code> …</li></ol><p>判断数据类型的方式: <code>type-of($value)</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$layer-index</span></span><span class="token punctuation">:</span> 10<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$font-base-family</span></span><span class="token punctuation">:</span> <span class="token string">&#39;Open Sans&#39;</span><span class="token punctuation">,</span> Helvetica<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$top-bg-color</span></span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>.1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$block-base-padding</span></span><span class="token punctuation">:</span> 6px 10px 6px 10px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$blank-mode</span></span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$var</span></span><span class="token punctuation">:</span> <span class="token null keyword">null</span> <span class="token comment">//值null是其类型的唯一值。他表示缺少值，通常由函数返回以指示缺少结果</span>
<span class="token property"><span class="token variable">$color-map</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token property">color1</span><span class="token punctuation">:</span> #f00<span class="token punctuation">,</span> <span class="token property">color2</span><span class="token punctuation">:</span> #0f0<span class="token punctuation">,</span> <span class="token property">color3</span><span class="token punctuation">:</span> #00f<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$fonts</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token property">serif</span><span class="token punctuation">:</span> <span class="token string">&quot;Helvetica Neue&quot;</span><span class="token punctuation">,</span> <span class="token property">monospace</span><span class="token punctuation">:</span> <span class="token string">&quot;Consolas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串-strings" tabindex="-1"><a class="header-anchor" href="#字符串-strings" aria-hidden="true">#</a> 字符串 (Strings)</h3><p>支持有引号的字符串与无引号的字符串，有引号的字符串，无论单引号还是双引号，编译后都为双引号，无引号的字符串编译后同样没有引号。如果一段话由多个单词组成，并且包含空格，需要将引号加上。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$string1</span></span><span class="token punctuation">:</span> <span class="token string">&quot;Sample 1&quot;</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$string2</span></span><span class="token punctuation">:</span> <span class="token string">&#39;Sample 2&#39;</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$string3</span></span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token selector">body </span><span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token variable">$string1</span><span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token variable">$string2</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$string3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;Sample 1&quot;</span><span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;Sample 2&quot;</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数字-numbers" tabindex="-1"><a class="header-anchor" href="#数字-numbers" aria-hidden="true">#</a> 数字 (Numbers)</h3><ol><li>支持数字或带单位的数字，</li><li>支持整数或小数</li><li>支持正数与负数</li></ol><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$number1</span></span><span class="token punctuation">:</span> 30<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$number2</span></span><span class="token punctuation">:</span> 6.9<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$number3</span></span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$number4</span></span><span class="token punctuation">:</span> 32a<span class="token punctuation">;</span> <span class="token comment">// 不规范，但不会报错</span>
<span class="token comment">// 注：数字后接的任何字母都会视为单位，单位会和数字当作一个整体进行计算</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="颜色-colors" tabindex="-1"><a class="header-anchor" href="#颜色-colors" aria-hidden="true">#</a> 颜色 (Colors)</h3><p>Css 原有颜色类型，包括十六进制、RGB、RGBA、HSL、HSLA和色彩单词</p><h3 id="布尔型-booleans" tabindex="-1"><a class="header-anchor" href="#布尔型-booleans" aria-hidden="true">#</a> 布尔型 (Booleans)</h3><p>只有两个值 “true” 和 “false”，只有自身是 false 或 null 才会返回 false，其他一切都会返回 true，主要用于逻辑判断。</p><h3 id="空值-null" tabindex="-1"><a class="header-anchor" href="#空值-null" aria-hidden="true">#</a> 空值 (Null)</h3><p>只有一个值 “null”，如 “$name: null;”。由于他为空，因此不能使用它与任何类型进行运算，主要用于逻辑判断。</p><h3 id="数组-lists" tabindex="-1"><a class="header-anchor" href="#数组-lists" aria-hidden="true">#</a> 数组 (Lists)</h3><p>通过空格或半角逗号分割的一系列的值，数组中还可以包含子数组，如下方的 “$list2” 和 “$list3″，当数组被编译为 css 时，圆括号不会被添加</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$list1</span></span><span class="token punctuation">:</span> 1px 2px 3px 4px<span class="token punctuation">;</span> <span class="token comment">//一维数字</span>
<span class="token property"><span class="token variable">$list2</span></span><span class="token punctuation">:</span> 1px 2px<span class="token punctuation">,</span> 3px 4px<span class="token punctuation">;</span> <span class="token comment">//二维数字</span>
<span class="token property"><span class="token variable">$list3</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px 2px<span class="token punctuation">)</span> <span class="token punctuation">(</span>3px 4px<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//二维数字</span>
<span class="token comment">// 指定数组中的某个值进行调用</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">nth</span><span class="token punctuation">(</span><span class="token variable">$list1</span><span class="token punctuation">,</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>在 Sass 中，以下这两种方式都定义了一个包含子数组的数组，但在编译后的 CSS 却不一样。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$list2</span></span><span class="token punctuation">:</span> 1px 2px<span class="token punctuation">,</span> 3px 4px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$list3</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>1px 2px<span class="token punctuation">)</span> <span class="token punctuation">(</span>3px 4px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> <span class="token variable">$list2</span><span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token variable">$list3</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>编译后</em></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1px 2px<span class="token punctuation">,</span> 3px 4px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 1px 2px 3px 4px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是由于 CSS 不支持圆括号的写法，因此 list3 会被拆开为一组值；而 CSS 支持逗号作分隔，所以 list2 会被编译为两组值。</p><h3 id="映射-maps" tabindex="-1"><a class="header-anchor" href="#映射-maps" aria-hidden="true">#</a> 映射 (Maps)</h3><p>Maps 必须被圆括号包裹，可以映射任何键值对</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$map</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
  <span class="token property">key1</span><span class="token punctuation">:</span> value1<span class="token punctuation">,</span>
  <span class="token property">key2</span><span class="token punctuation">:</span> value2<span class="token punctuation">,</span>
  <span class="token property">key3</span><span class="token punctuation">:</span> value3
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="映射函数" tabindex="-1"><a class="header-anchor" href="#映射函数" aria-hidden="true">#</a> 映射函数：</h4><p>返回 Map 中 key 所对应的值( value )。如没有对应的 key，则返回 null 值。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">map-get</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> key<span class="token punctuation">)</span>

<span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">,</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> 12px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断 map 是否有对应的 key，存在返回 true，否则返回 false</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">map-has-key</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> key<span class="token punctuation">)</span>

实例<span class="token punctuation">:</span>
<span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token function">map-has-key</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">,</span> <span class="token string">&quot;big&quot;</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回 map 中所有的 key 组成的队列</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">map-keys</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span>

实例<span class="token punctuation">:</span>
<span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token function">map-keys</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;normal, &quot;</span>large&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并两个 map 形成一个新的 map 类型，即将 <em>map2</em> 添加到 <em>map1</em>的尾部</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">map-merge</span><span class="token punctuation">(</span>map1<span class="token punctuation">,</span> map2<span class="token punctuation">)</span>

实例<span class="token punctuation">:</span>
<span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token property"><span class="token variable">$font-sizes2</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;x-large&quot;</span><span class="token punctuation">:</span> 30px<span class="token punctuation">,</span> <span class="token string">&quot;xx-large&quot;</span><span class="token punctuation">:</span> 36px<span class="token punctuation">)</span>
<span class="token function">map-merge</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">,</span> <span class="token variable">$font-sizes2</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">,</span> <span class="token string">&quot;x-large&quot;</span><span class="token punctuation">:</span> 30px<span class="token punctuation">,</span> <span class="token string">&quot;xx-large&quot;</span><span class="token punctuation">:</span> 36px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移除 <em>map</em> 中的 keys，多个 key 使用逗号隔开</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">map-remove</span><span class="token punctuation">(</span>map<span class="token punctuation">,</span> keys...<span class="token punctuation">)</span>

实例<span class="token punctuation">:</span>
<span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token function">map-remove</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">,</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token function">map-remove</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">,</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回 <em>map</em> 中所有的 value 并生成一个队列</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">map-values</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span>

实例<span class="token punctuation">:</span>
<span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span> 18px<span class="token punctuation">,</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span> 24px<span class="token punctuation">)</span>
<span class="token function">map-values</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">)</span>
结果<span class="token punctuation">:</span> 12px<span class="token punctuation">,</span> 18px<span class="token punctuation">,</span> 24px
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2><h3 id="相等运算符" tabindex="-1"><a class="header-anchor" href="#相等运算符" aria-hidden="true">#</a> 相等运算符</h3><p>所有数据类型都支持等号运算符，等于使用 “==” 表示，不等于使用 “!=” 表示</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$color</span> == 1 </span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$color</span> != &quot;red&quot; </span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关系-比较-运算符" tabindex="-1"><a class="header-anchor" href="#关系-比较-运算符" aria-hidden="true">#</a> 关系（比较）运算符</h3><p>关系运算符只支持数字，使用的符号分别是大于号 “&gt;”，小于号 “&lt;“，大于等于号 “&gt;=” 与小于等于号 “&lt;=” ，返回值 “true” 或 “false”，主要应用于条件判断</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$a</span></span><span class="token punctuation">:</span> 1 <span class="token operator">&gt;</span> 2<span class="token punctuation">;</span> <span class="token comment">//false</span>
<span class="token property"><span class="token variable">$a</span></span><span class="token punctuation">:</span> 1 <span class="token operator">&lt;</span> 2<span class="token punctuation">;</span> <span class="token comment">//true</span>
<span class="token property"><span class="token variable">$a</span></span><span class="token punctuation">:</span> 1 <span class="token operator">&gt;=</span> 2<span class="token punctuation">;</span> <span class="token comment">//false</span>
<span class="token property"><span class="token variable">$a</span></span><span class="token punctuation">:</span> 1 <span class="token operator">&lt;=</span> 2<span class="token punctuation">;</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="布尔运算符" tabindex="-1"><a class="header-anchor" href="#布尔运算符" aria-hidden="true">#</a> 布尔运算符</h3><p>布尔运算符包含三种形式，分别是与 <code>and</code> 、 或 <code>or</code> 、 非 <code>not</code> 。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$width</span></span><span class="token punctuation">:</span> 100<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$height</span></span><span class="token punctuation">:</span> 200<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$last</span></span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token selector">div </span><span class="token punctuation">{</span>
    <span class="token comment">// 两个条件都满足时</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$width</span> &gt; 50 and <span class="token variable">$height</span> &lt; 300 </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 任意条件满足时</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$width</span> &gt; 200 or <span class="token variable">$height</span> &lt; 300 </span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 判断是否为真</span>
    <span class="token keyword">@if</span> <span class="token selector">not <span class="token variable">$last</span> </span><span class="token punctuation">{</span>
        <span class="token property">line-height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">line-height</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数字运算符" tabindex="-1"><a class="header-anchor" href="#数字运算符" aria-hidden="true">#</a> 数字运算符</h3><p>数字运算符包含加 <code>+</code> ，减 <code>-</code> ，乘 <code>*</code> ，除 <code>/</code> 与取模 <code>%</code> ，取模即是两个数字相除取余数。</p><h4 id="基本用法-1" tabindex="-1"><a class="header-anchor" href="#基本用法-1" aria-hidden="true">#</a> 基本用法</h4><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 纯数字相加</span>
<span class="token property"><span class="token variable">$plus1</span></span><span class="token punctuation">:</span> 30 <span class="token operator">+</span> 30<span class="token punctuation">;</span> <span class="token comment">//60</span>
<span class="token property"><span class="token variable">$plus2</span></span><span class="token punctuation">:</span> 30px <span class="token operator">+</span> 30<span class="token punctuation">;</span> <span class="token comment">//60px</span>
<span class="token property"><span class="token variable">$plus3</span></span><span class="token punctuation">:</span> 30% <span class="token operator">+</span> 30%<span class="token punctuation">;</span> <span class="token comment">//60%</span>
<span class="token property"><span class="token variable">$plus4</span></span><span class="token punctuation">:</span> 30px <span class="token operator">+</span> 30pt<span class="token punctuation">;</span> <span class="token comment">//70px    pt= 3/4 px。比如 1024px*3/4=768pt</span>
<span class="token property"><span class="token variable">$plus5</span></span><span class="token punctuation">:</span> 30px <span class="token operator">+</span> 30pt <span class="token operator">+</span> 30pc<span class="token punctuation">;</span> <span class="token comment">//550px</span>

<span class="token comment">//纯数字相减</span>
<span class="token property"><span class="token variable">$minus1</span></span><span class="token punctuation">:</span> 60 <span class="token operator">-</span> 30<span class="token punctuation">;</span> <span class="token comment">//30</span>
<span class="token property"><span class="token variable">$minus2</span></span><span class="token punctuation">:</span> 60px <span class="token operator">-</span> 30<span class="token punctuation">;</span> <span class="token comment">//30px</span>
<span class="token property"><span class="token variable">$minus3</span></span><span class="token punctuation">:</span> 60% <span class="token operator">-</span> 30%<span class="token punctuation">;</span> <span class="token comment">//30%</span>
<span class="token property"><span class="token variable">$minus4</span></span><span class="token punctuation">:</span> 60px <span class="token operator">-</span> 30pt<span class="token punctuation">;</span> <span class="token comment">//20px</span>
<span class="token property"><span class="token variable">$minus5</span></span><span class="token punctuation">:</span> 60px <span class="token operator">-</span> 30pt <span class="token operator">-</span> 30pc<span class="token punctuation">;</span> <span class="token comment">//-460px</span>

<span class="token comment">//纯数字相乘</span>
<span class="token property"><span class="token variable">$multipl1</span></span><span class="token punctuation">:</span> 60 <span class="token operator">*</span> 30<span class="token punctuation">;</span> <span class="token comment">//1800</span>
<span class="token property"><span class="token variable">$multipl2</span></span><span class="token punctuation">:</span> 60px <span class="token operator">*</span> 30<span class="token punctuation">;</span> <span class="token comment">//1800px</span>
<span class="token property"><span class="token variable">$multipl3</span></span><span class="token punctuation">:</span> 60% <span class="token operator">*</span> 30<span class="token punctuation">;</span> <span class="token comment">//1800%</span>
<span class="token property"><span class="token variable">$multipl4</span></span><span class="token punctuation">:</span> 60px <span class="token operator">*</span> 30 <span class="token operator">*</span> 30<span class="token punctuation">;</span> <span class="token comment">//54000px</span>

<span class="token comment">//纯数字相除</span>
<span class="token property"><span class="token variable">$division1</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60 <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2</span>
<span class="token property"><span class="token variable">$division2</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2px</span>
<span class="token property"><span class="token variable">$division3</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60% <span class="token operator">/</span> 30%<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//2</span>
<span class="token property"><span class="token variable">$division4</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">/</span> 30pt<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//1.5</span>
<span class="token property"><span class="token variable">$division5</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">/</span> 30 <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//0.06667px</span>

<span class="token comment">//纯数字取模</span>
<span class="token property"><span class="token variable">$modulo1</span></span><span class="token punctuation">:</span> 60 <span class="token operator">%</span> 9<span class="token punctuation">;</span> <span class="token comment">//6</span>
<span class="token property"><span class="token variable">$modulo2</span></span><span class="token punctuation">:</span> 60px <span class="token operator">%</span> 9<span class="token punctuation">;</span> <span class="token comment">//6px</span>
<span class="token property"><span class="token variable">$modulo3</span></span><span class="token punctuation">:</span> 60% <span class="token operator">%</span> 9%<span class="token punctuation">;</span> <span class="token comment">//6%</span>
<span class="token property"><span class="token variable">$modulo4</span></span><span class="token punctuation">:</span> 60px <span class="token operator">%</span> 9pt<span class="token punctuation">;</span> <span class="token comment">//0px</span>
<span class="token property"><span class="token variable">$modulo5</span></span><span class="token punctuation">:</span> 60px <span class="token operator">%</span> 9 <span class="token operator">%</span> 5<span class="token punctuation">;</span> <span class="token comment">//1px</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="混合用法" tabindex="-1"><a class="header-anchor" href="#混合用法" aria-hidden="true">#</a> 混合用法</h4><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// 数字，字符串相加</span>
<span class="token property"><span class="token variable">$plus1</span></span><span class="token punctuation">:</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span> <span class="token comment">//ab</span>
<span class="token property"><span class="token variable">$plus2</span></span><span class="token punctuation">:</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">;</span> <span class="token comment">//&quot;ab&quot;</span>
<span class="token property"><span class="token variable">$plus3</span></span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">+</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">;</span> <span class="token comment">//&quot;ab&quot;</span>
<span class="token property"><span class="token variable">$plus4</span></span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">+</span> b<span class="token punctuation">;</span> <span class="token comment">//&quot;ab&quot;</span>
<span class="token property"><span class="token variable">$plus5</span></span><span class="token punctuation">:</span> a <span class="token operator">+</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">;</span> <span class="token comment">//ab</span>
<span class="token property"><span class="token variable">$plus6</span></span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">+</span> 1<span class="token punctuation">;</span> <span class="token comment">//&quot;a1&quot;</span>
<span class="token property"><span class="token variable">$plus7</span></span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span> <span class="token operator">+</span> a<span class="token punctuation">;</span> <span class="token comment">//&quot;1a&quot;</span>

<span class="token comment">// 数字，字符串相减</span>
<span class="token property"><span class="token variable">$minus1</span></span><span class="token punctuation">:</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span> <span class="token comment">//a-b</span>
<span class="token property"><span class="token variable">$minus2</span></span><span class="token punctuation">:</span> <span class="token string">&quot;a&quot;</span> <span class="token operator">-</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">;</span> <span class="token comment">//&quot;a&quot;-&quot;b&quot;</span>
<span class="token property"><span class="token variable">$minus3</span></span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">-</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">;</span> <span class="token comment">//&quot;a&quot;-&quot;b&quot;</span>
<span class="token property"><span class="token variable">$minus4</span></span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">-</span> b<span class="token punctuation">;</span> <span class="token comment">//&quot;a&quot;-b</span>
<span class="token property"><span class="token variable">$minus5</span></span><span class="token punctuation">:</span> a <span class="token operator">-</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">;</span> <span class="token comment">//a-&quot;b&quot;</span>
<span class="token property"><span class="token variable">$minus6</span></span><span class="token punctuation">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">-</span> 1<span class="token punctuation">;</span> <span class="token comment">//&quot;a&quot;-1</span>
<span class="token property"><span class="token variable">$minus7</span></span><span class="token punctuation">:</span> <span class="token string">&quot;1&quot;</span> <span class="token operator">-</span> a<span class="token punctuation">;</span> <span class="token comment">//&quot;1&quot;-a</span>
<span class="token property"><span class="token variable">$minus8</span></span><span class="token punctuation">:</span> 1 <span class="token operator">-</span> <span class="token string">&quot;a&quot;</span><span class="token punctuation">;</span> <span class="token comment">//1-&quot;a&quot;</span>

<span class="token comment">// 数字无法与纯字符串相乘</span>

<span class="token comment">// 数字无法与纯字符串相除</span>

<span class="token comment">// 数字无法与纯字符串取模</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>字符串相加时，如果前面一个值带引号，计算的结果同样带引号，反之；</li><li>数字与字符串混合相加时，第一位有引号或第一位是数字，且后最后一位有引号时，结果必定有引号</li></ol><h4 id="除法运算情景" tabindex="-1"><a class="header-anchor" href="#除法运算情景" aria-hidden="true">#</a> 除法运算情景</h4><p>如果直接在值之间使用 <code>/</code> ，不可被视为除法运算，仅当一下三种情况时会以除法进行运算：</p><ol><li>如果值或值的一部分是变量或函数的返回值</li><li>如果值被圆括号包裹</li><li>如果值是算数表达式的一部分</li></ol><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$width</span></span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token selector">div </span><span class="token punctuation">{</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 10 <span class="token operator">/</span> 2<span class="token punctuation">;</span>  <span class="token comment">// 直接使用/，不会被当作除号，而是作为一个分隔符</span>
    <span class="token property">top</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>10 <span class="token operator">/</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可以加个()表示里面的/需要当作运算符</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$width</span> <span class="token operator">/</span> 2<span class="token punctuation">;</span> <span class="token comment">//使用变量</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">round</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$number</span></span><span class="token punctuation">:</span> 10<span class="token punctuation">)</span> <span class="token operator">/</span> 2<span class="token punctuation">;</span> <span class="token comment">//使用函数</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>500px <span class="token operator">/</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//使用圆括号</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 5px <span class="token operator">+</span> 8/2<span class="token punctuation">;</span> <span class="token comment">//使用了+表达式</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">div </span><span class="token punctuation">{</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 10/2<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 5<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 5<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 250px<span class="token punctuation">;</span>
  <span class="token property">margin-left</span><span class="token punctuation">:</span> 9px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="规则总结" tabindex="-1"><a class="header-anchor" href="#规则总结" aria-hidden="true">#</a> 规则总结</h4><ol><li>运算符号与值之间建议使用空格隔开；</li><li>数字可以只声明其中一个符号或单位，计算的结果将以声明的符号或单位进行编译，声明单位或符号时，<strong>建议在第一个数字上进行声明</strong>；</li><li>当不同符号且符号之间不可以进行换算时，无法计算出结果，如 20px + 10%无计算，”px” + “pt” 则可进行计算；</li><li>当不同单位进行运算，结果会显示以运算公式开头的数字设置的单位；</li><li>在乘法运算时，只需为一个数字声明单位，为多个数字声明同样或不同的单位都会报错；</li><li>在除法运算时，如需声明单位，单位建议标注在除号前面的值；</li><li>书写公式时，建议将所有公式都使用圆括号包裹。</li></ol><h4 id="书写建议示范" tabindex="-1"><a class="header-anchor" href="#书写建议示范" aria-hidden="true">#</a> 书写建议示范</h4><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.plus </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>30 <span class="token operator">+</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>30% <span class="token operator">+</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>30px <span class="token operator">+</span> 30pt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>30px <span class="token operator">+</span> 30pt <span class="token operator">+</span> 30pc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.minus </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60 <span class="token operator">-</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60% <span class="token operator">-</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">-</span> 30pt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">-</span> 30pt <span class="token operator">-</span> 30pc<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.multipl </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60 <span class="token operator">*</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60% <span class="token operator">*</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">*</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">*</span> 30 <span class="token operator">*</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.division </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60 <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60% <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60px <span class="token operator">/</span> 30pt <span class="token operator">/</span> 30<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.modulo </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60 <span class="token operator">%</span> 9<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>60% <span class="token operator">%</span> 9<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 60% <span class="token operator">%</span> 9%<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 60px <span class="token operator">%</span> 6pt <span class="token operator">%</span> 0.12<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.plus</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 60<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 60%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 70px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 550px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.minus</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> -460px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.multipl</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1800<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1800%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1800px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 54000px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.division</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 2%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0.05<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.modulo</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 6<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 6%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 6%<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0.04px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串运算" tabindex="-1"><a class="header-anchor" href="#字符串运算" aria-hidden="true">#</a> 字符串运算</h3><p>使用加号”+” 可连接字符串，如字符串前面带引号后面不带，编译出的结果会带引号，反之。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;Foo&quot;</span> <span class="token operator">+</span> bar<span class="token punctuation">;</span>
    <span class="token property">font-family</span><span class="token punctuation">:</span> sans- <span class="token operator">+</span> <span class="token string">&quot;serif&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;Foobar&quot;</span><span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><h3 id="color颜色函数" tabindex="-1"><a class="header-anchor" href="#color颜色函数" aria-hidden="true">#</a> Color颜色函数</h3><p>sass包含很多操作颜色的函数。例如: lighten() 与darken()函数可用于调亮或洞暗颜色，opacify()函数使颜色透明度减少，transparent()函数使颜色透明度增加，mix()函数可用来混合两种颜色。</p><ul><li><p><strong>RGB函数</strong></p><table><thead><tr><th>函数名和参数类型</th><th style="text-align:center;">函数作用</th></tr></thead><tbody><tr><td>rgb($red, $green, $blue)</td><td style="text-align:center;">返回一个16进制颜色值</td></tr><tr><td>rgba($red,$green,$blue,$alpha)</td><td style="text-align:center;">返回一个rgba；$red,$green和$blue可被当作一个整体以颜色单词、hsl、rgb或16进制形式传入</td></tr><tr><td>red($color)</td><td style="text-align:center;">从$color中获取其中红色值</td></tr><tr><td>green($color)</td><td style="text-align:center;">从$color中获取其中绿色值</td></tr><tr><td>blue($color)</td><td style="text-align:center;">从$color中获取其中蓝色值</td></tr><tr><td>mix($color1,$color2,$weight?)</td><td style="text-align:center;">按照$weight比例，将$color1和$color2混合为一个新颜色</td></tr></tbody></table></li><li><p><strong>HSL函数</strong></p><table><thead><tr><th>函数名和参数类型</th><th>函数作用</th></tr></thead><tbody><tr><td>hsl($hue,$saturation,$lightness)</td><td>通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色</td></tr><tr><td>hsla($hue,$saturation,$lightness,$alpha)</td><td>通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色</td></tr><tr><td>saturation($color)</td><td>从一个颜色中获取饱和度（saturation）值</td></tr><tr><td>lightness($color)</td><td>从一个颜色中获取亮度（lightness）值</td></tr><tr><td>adjust-hue($color,$degrees)</td><td>通过改变一个颜色的色相值，创建一个新的颜色</td></tr><tr><td>lighten($color,$amount)</td><td>通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色</td></tr><tr><td>darken($color,$amount)</td><td>通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色</td></tr><tr><td>hue($color)</td><td>从一个颜色中获取亮度色相（hue）值</td></tr></tbody></table></li><li><p><strong>Opacity函数</strong></p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>alpha($color)/opacity($color)</td><td>获取颜色透明度值</td></tr><tr><td>rgba($color,$alpha)</td><td>改变颜色的透明度</td></tr><tr><td>opacify($color, $amount) / fade-in($color, $amount)</td><td>使颜色更不透明</td></tr><tr><td>transparentize($color, $amount) / fade-out($color, $amount)</td><td>使颜色更加透明</td></tr></tbody></table></li></ul><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p </span><span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p0 </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #5c7a29<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1 </span><span class="token punctuation">{</span>
    <span class="token comment">/**
        让颜色变亮
        lighten($color, $amount)
        $amount 的取值在0% - 100% 之间
    */</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">lighten</span><span class="token punctuation">(</span>#5c7a29<span class="token punctuation">,</span> 30%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2 </span><span class="token punctuation">{</span>
    <span class="token comment">// 让颜色变暗，通常使用color.scale()代替该方案</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">darken</span><span class="token punctuation">(</span>#5c7a29<span class="token punctuation">,</span> 15%<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3 </span><span class="token punctuation">{</span>
    <span class="token comment">// 降低延申透明度  通常使用color.scale() 代替该方案</span>
    <span class="token comment">// background-color: opacify(#5c7a29, 0.5);</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">opacify</span><span class="token punctuation">(</span><span class="token function">rgba</span><span class="token punctuation">(</span>#5c7a29<span class="token punctuation">,</span>0.1<span class="token punctuation">)</span><span class="token punctuation">,</span> 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：可以看到颜色有所改变</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">;</span></span>
<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p0</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #5c7a29<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
      让颜色变亮
      lighten($color, $amount)
      $amount 的取值在0% - 100% 之间
  */</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #aace6e<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #314116<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>92<span class="token punctuation">,</span> 122<span class="token punctuation">,</span> 41<span class="token punctuation">,</span> 0.6<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code>index.html</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UTF-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width, initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>css/css.css<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在浏览器中打开，可以看到颜色如下图所示</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230215145654446.png" alt="image-20230215145654446" tabindex="0" loading="lazy"><figcaption>image-20230215145654446</figcaption></figure><h3 id="字符串函数" tabindex="-1"><a class="header-anchor" href="#字符串函数" aria-hidden="true">#</a> 字符串函数</h3><blockquote><p>索引第一个为1，最后一个为-1；切片两边均为闭区间</p></blockquote><table><thead><tr><th style="text-align:left;">函数名和参数类型</th><th style="text-align:center;">函数作用</th></tr></thead><tbody><tr><td style="text-align:left;">quote($string)</td><td style="text-align:center;">添加引号</td></tr><tr><td style="text-align:left;">unquote($string)</td><td style="text-align:center;">除去引号</td></tr><tr><td style="text-align:left;">to-lower-case($string)</td><td style="text-align:center;">变为小写</td></tr><tr><td style="text-align:left;">to-upper-case($string)</td><td style="text-align:center;">变为大写</td></tr><tr><td style="text-align:left;">str-length($string)</td><td style="text-align:center;">返回$string的长度(汉字算一个)</td></tr><tr><td style="text-align:left;">str-index($string，$substring)</td><td style="text-align:center;">返回$substring在$string的位置</td></tr><tr><td style="text-align:left;">str-insert($string, $insert, $index)</td><td style="text-align:center;">在$string的$index处插入$insert</td></tr><tr><td style="text-align:left;">str-slice($string, $start-at, $end-at）</td><td style="text-align:center;">截取$string的$start-at和$end-at之间的字符串</td></tr></tbody></table><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p </span><span class="token punctuation">{</span>
    <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">quote</span><span class="token punctuation">(</span>这是里面的内容<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">unquote</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$string</span></span><span class="token punctuation">:</span> <span class="token string">&quot;#F00&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">str-length</span><span class="token punctuation">(</span><span class="token string">&quot;sass学习&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">;</span></span>
<span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #F00<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 6<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;这是里面的内容&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="math数值函数" tabindex="-1"><a class="header-anchor" href="#math数值函数" aria-hidden="true">#</a> Math数值函数</h3><p>数值函数处理数值计算，例如: <code>percentage()</code>将无单元的数值转换为百分比，<code>round()</code>将数字四舍五入为最接近的整数，<code>min()</code>和<code>max()</code>获取几个数字中的最小值或最大值，<code>random()</code>返回一 个随机数。</p><table><thead><tr><th>函数名和参数类型</th><th style="text-align:center;">函数作用</th></tr></thead><tbody><tr><td>percentage($number)</td><td style="text-align:center;">转换为百分比形式</td></tr><tr><td>round($number)</td><td style="text-align:center;">四舍五入为整数</td></tr><tr><td>ceil($number)</td><td style="text-align:center;">数值向上取整</td></tr><tr><td>floor($number)</td><td style="text-align:center;">数值向下取整</td></tr><tr><td>abs($number)</td><td style="text-align:center;">获取绝对值</td></tr><tr><td>min($number...)</td><td style="text-align:center;">获取最小值</td></tr><tr><td>max($number...)</td><td style="text-align:center;">获取最大值</td></tr><tr><td>random($number?:number)</td><td style="text-align:center;">不传入值：获得0-1的随机数；传入正整数n：获得0-n的随机整数（左开右闭）</td></tr></tbody></table><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">abs</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$number</span></span><span class="token punctuation">:</span> -15<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">ceil</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$number</span></span><span class="token punctuation">:</span> 5.8<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">max</span><span class="token punctuation">(</span> 5<span class="token punctuation">,</span> 1<span class="token punctuation">,</span> 6<span class="token punctuation">,</span> 8<span class="token punctuation">,</span> 3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 15<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 6<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 8<span class="token punctuation">;</span>
  <span class="token property">opacity</span><span class="token punctuation">:</span> 0.2904947308<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="list函数" tabindex="-1"><a class="header-anchor" href="#list函数" aria-hidden="true">#</a> List函数</h3><p>List函数操作List, length()返回列表长度， nth()返回列表中的特定项， join()将两个列表连接在一起， append()在列表末尾添加一个值。</p><table><thead><tr><th>函数名和参数类型</th><th style="text-align:center;">函数作用</th></tr></thead><tbody><tr><td>length($list)</td><td style="text-align:center;">获取数组长度</td></tr><tr><td>nth($list, n)</td><td style="text-align:center;">获取指定下标的元素</td></tr><tr><td>set-nth($list, $n, $value)</td><td style="text-align:center;">向$list的$n处插入$value</td></tr><tr><td>join($list1, $list2, $separator)</td><td style="text-align:center;">拼接$list1和list2；$separator为新list的分隔符，默认为auto，可选择comma、space</td></tr><tr><td>append($list, $val, $separator)</td><td style="text-align:center;">向$list的末尾添加$val；$separator为新list的分隔符，默认为auto，可选择comma、space</td></tr><tr><td>index($list, $value)</td><td style="text-align:center;">返回$value值在$list中的索引值</td></tr><tr><td>zip($lists…)</td><td style="text-align:center;">将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的</td></tr></tbody></table><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p </span><span class="token punctuation">{</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">length</span><span class="token punctuation">(</span>12px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">length</span><span class="token punctuation">(</span>12px 5px 8px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">index</span><span class="token punctuation">(</span>a b c d<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">z-index</span><span class="token punctuation">:</span> <span class="token function">append</span><span class="token punctuation">(</span>10px 20px<span class="token punctuation">,</span> 30px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">nth</span><span class="token punctuation">(</span>red blue green<span class="token punctuation">,</span> 2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 10px 20px 30px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map函数" tabindex="-1"><a class="header-anchor" href="#map函数" aria-hidden="true">#</a> Map函数</h3><p>Map函数操作Map, map-get()根据键值获取map中的对应值，map-merge()来将两个map合并成个 新的map, map-values()映射中的所有值。</p><table><thead><tr><th>函数名和参数类型</th><th style="text-align:center;">函数作用</th></tr></thead><tbody><tr><td>map-get($map, $key)</td><td style="text-align:center;">获取$map中$key对应的$value</td></tr><tr><td>map-merge($map1, $map2)</td><td style="text-align:center;">合并$map1和$map2，返回一个新$map</td></tr><tr><td>map-remove($map, $key)</td><td style="text-align:center;">从$map中删除$key，返回一个新$map</td></tr><tr><td>map-keys($map)</td><td style="text-align:center;">返回$map所有的$key</td></tr><tr><td>map-values($map)</td><td style="text-align:center;">返回$map所有的$value</td></tr><tr><td>map-has-key($map, $key)</td><td style="text-align:center;">判断$map中是否存在$key，返回对应的布尔值</td></tr><tr><td>keywords($args)</td><td style="text-align:center;">返回一个函数的参数，并可以动态修改其值</td></tr></tbody></table><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;small&quot;</span><span class="token punctuation">:</span>12px<span class="token punctuation">,</span>
    <span class="token string">&quot;normal&quot;</span><span class="token punctuation">:</span>18px<span class="token punctuation">,</span>
    <span class="token string">&quot;large&quot;</span><span class="token punctuation">:</span>24px
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$padding</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
    <span class="token property">top</span><span class="token punctuation">:</span>10px<span class="token punctuation">,</span>
    <span class="token property">right</span><span class="token punctuation">:</span>20px<span class="token punctuation">,</span>
    <span class="token property">bottom</span><span class="token punctuation">:</span>10px<span class="token punctuation">,</span>
    <span class="token property">left</span><span class="token punctuation">:</span>30px
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token selector">p</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">,</span> <span class="token string">&quot;normal&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@if</span> <span class="token function">map-has-key</span><span class="token punctuation">(</span><span class="token variable">$padding</span><span class="token punctuation">,</span> <span class="token string">&quot;right&quot;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">padding-right</span><span class="token punctuation">:</span> <span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$padding</span><span class="token punctuation">,</span> <span class="token string">&quot;right&quot;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">map-keys</span><span class="token punctuation">(</span><span class="token variable">$font-sizes</span><span class="token punctuation">)</span>+ <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> <span class="token function">map-values</span><span class="token punctuation">(</span><span class="token variable">$padding</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 18px<span class="token punctuation">;</span>
  <span class="token property">padding-right</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&quot;small&quot;, &quot;normal&quot;, &quot;large&quot; 10px, 20px, 10px, 30px&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="selector选择器函数" tabindex="-1"><a class="header-anchor" href="#selector选择器函数" aria-hidden="true">#</a> Selector选择器函数</h3><p>选择符相关函数可对CSS选择进行一些相应的操作， 例如: <code>selector-append()</code>可以把个选择符附加到另一个选择符， <code>selector-unify()</code>将两组选择器合成个复合选择器。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.header </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">selector-append</span><span class="token punctuation">(</span><span class="token string">&quot;.a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.c&quot;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">selector-unify</span><span class="token punctuation">(</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;.disabled&quot;</span><span class="token punctuation">)</span>+ <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.header</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;.a.b.c&quot;</span><span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;a.disabled&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自检函数" tabindex="-1"><a class="header-anchor" href="#自检函数" aria-hidden="true">#</a> 自检函数</h3><p>自检相关函数，例如: <code>feature-exists()</code>检查当前<code>Sass</code>版本是否存在某个特性，<code>variable-exists()</code>检查当前作用域中是否存在某个变量，<code>mixin-exists()</code>检查某个<code>mixin</code>是否存在。自检函数通常用在代码的调试上。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #F00<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token function">padding</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$left</span></span><span class="token punctuation">:</span>0<span class="token punctuation">,</span><span class="token property"><span class="token variable">$top</span></span><span class="token punctuation">:</span>0<span class="token punctuation">,</span><span class="token property"><span class="token variable">$right</span></span><span class="token punctuation">:</span>0<span class="token punctuation">,</span><span class="token property"><span class="token variable">$bottom</span></span><span class="token punctuation">:</span>0<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> <span class="token variable">$top</span> <span class="token variable">$right</span> <span class="token variable">$bottom</span> <span class="token variable">$left</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@if</span> <span class="token function">variable-exists</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&quot;$color不存在&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">@if</span> <span class="token function">mixin-exists</span><span class="token punctuation">(</span>padding<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">@include</span> <span class="token function">padding</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$left</span></span><span class="token punctuation">:</span> 10px<span class="token punctuation">,</span><span class="token property"><span class="token variable">$right</span></span><span class="token punctuation">:</span> 10px<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #F00<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0 10px 0 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="流程控制指令" tabindex="-1"><a class="header-anchor" href="#流程控制指令" aria-hidden="true">#</a> 流程控制指令</h2><h3 id="if" tabindex="-1"><a class="header-anchor" href="#if" aria-hidden="true">#</a> <code>@if</code></h3><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$theme</span></span><span class="token punctuation">:</span> <span class="token string">&quot;green&quot;</span><span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$theme</span>==&quot;red&quot;</span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else if</span> <span class="token selector"><span class="token variable">$theme</span>==&quot;blue&quot;</span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else if</span> <span class="token selector"><span class="token variable">$theme</span>==&quot;green&quot;</span><span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else</span> <span class="token punctuation">{</span>
        <span class="token property">color</span><span class="token punctuation">:</span> darkgray<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">triangle</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$direction</span></span><span class="token punctuation">:</span>top<span class="token punctuation">,</span><span class="token property"><span class="token variable">$size</span></span><span class="token punctuation">:</span>30px<span class="token punctuation">,</span><span class="token property"><span class="token variable">$border-color</span></span><span class="token punctuation">:</span>black<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
    <span class="token property">border-<span class="token variable">#{$direction}</span>-width</span><span class="token punctuation">:</span>0<span class="token punctuation">;</span>
    <span class="token keyword">@if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span>==top<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent <span class="token variable">$border-color</span> transparent<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed solid dashed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span>==right<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent transparent <span class="token variable">$border-color</span><span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed dashed solid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span>==bottom<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> <span class="token variable">$border-color</span> transparent transparent transparent<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> solid dashed dashed dashed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">@else if</span><span class="token punctuation">(</span><span class="token variable">$direction</span> <span class="token operator">==</span> left<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> transparent <span class="token variable">$border-color</span> transparent transparent<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> dashed solid dashed dashed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.p0</span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token selector">.p1 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>right<span class="token punctuation">,</span>20px <span class="token punctuation">,</span> red<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token selector">.p2 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>bottom<span class="token punctuation">,</span>30px <span class="token punctuation">,</span> green<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token selector">.p3 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span>40px <span class="token punctuation">,</span> blue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.p0</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">border-top-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent black transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed solid dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">border-right-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent transparent red<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed dashed solid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">border-bottom-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> green transparent transparent transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid dashed dashed dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">border-left-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent blue transparent transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed solid dashed dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>index.html</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>en<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>css/css.css<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>p3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器打开如下所示：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230215162618670.png" alt="image-20230215162618670" tabindex="0" loading="lazy"><figcaption>image-20230215162618670</figcaption></figure><hr><p><strong>占位符%</strong></p><p>你可能发现被继承的csS父类并没有被实际应用，也就是说htmI代码中没有使用该类， 它的唯一目的就是扩 展其他选择器。 对于该类，可能不希望被编译输出到最终的css文件中，它只会增加CSS文件的大小，永远不会被使用。 这就是占位符选择器的作用。 占位符选择器类似于类选择器，但是，它们不是以句点( )开头，而是以百分号(%)开头。 当在Sass文件中使用占位符选择器时，它可以用于扩展其他选择器，但不会被编译成最终的CSS。</p><p>可以使用占位符对上面代码进行改进：</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector"><span class="token placeholder">%triangle</span> </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">triangle</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$direction</span></span><span class="token punctuation">:</span> top<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$size</span></span><span class="token punctuation">:</span> 30px<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$border-color</span></span><span class="token punctuation">:</span> black<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@extend</span> <span class="token placeholder selector">%triangle</span><span class="token punctuation">;</span>
    <span class="token property">border-width</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
    <span class="token property">border-<span class="token variable">#{$direction}</span>-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>

    <span class="token keyword">@if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span>==top<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent <span class="token variable">$border-color</span> transparent<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed solid dashed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span>==right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent transparent <span class="token variable">$border-color</span><span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed dashed solid<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">@else if</span> <span class="token punctuation">(</span><span class="token variable">$direction</span>==bottom<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> <span class="token variable">$border-color</span> transparent transparent transparent<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> solid dashed dashed dashed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">@else if</span><span class="token punctuation">(</span><span class="token variable">$direction</span> ==left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> transparent <span class="token variable">$border-color</span> transparent transparent<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> dashed solid dashed dashed<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.p0 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>right<span class="token punctuation">,</span> 20px<span class="token punctuation">,</span> red<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>bottom<span class="token punctuation">,</span> 30px<span class="token punctuation">,</span> green<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3 </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> <span class="token function">triangle</span><span class="token punctuation">(</span>left<span class="token punctuation">,</span> 40px<span class="token punctuation">,</span> blue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.p3, .p2, .p1, .p0</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p0</span> <span class="token punctuation">{</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">border-top-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent black transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed solid dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1</span> <span class="token punctuation">{</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">border-right-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent transparent transparent red<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed dashed dashed solid<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2</span> <span class="token punctuation">{</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">border-bottom-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> green transparent transparent transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> solid dashed dashed dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3</span> <span class="token punctuation">{</span>
  <span class="token property">border-width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">border-left-width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> transparent blue transparent transparent<span class="token punctuation">;</span>
  <span class="token property">border-style</span><span class="token punctuation">:</span> dashed solid dashed dashed<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for" tabindex="-1"><a class="header-anchor" href="#for" aria-hidden="true">#</a> <code>@for</code></h3><blockquote><p><code>@for</code>指令可以在限制的范围内重复输出格式，每次按要求(变星的值)对输出结果做出变动。这个指令包含两种格式： <code>@for $var from &lt;start&gt; through &lt;end&gt;</code>，或者<code>@for $var from &lt;start&gt; to &lt;end&gt;</code></p></blockquote><p>区别在于<code>through</code>与<code>to</code>的含义: 当使用<code>through</code>时，条件范围包含<code>&lt;start&gt;</code> 与<code>&lt;end&gt;</code>的值。 而使用<code>to</code>时条件范围只包含<code>&lt;start&gt;</code> 的值不包含<code>&lt;end&gt;</code> 的值。 另外，$var可以是任何变量，比如<code>$i</code>; <code>&lt;start&gt;</code>和<code>&lt;end&gt;</code>必须是整数值。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> <span class="token selector">1 to 4 </span><span class="token punctuation">{</span>
    <span class="token selector">.p<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 10px <span class="token operator">*</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> 1 <span class="token keyword">through</span> <span class="token selector">3 </span><span class="token punctuation">{</span>
    <span class="token selector">.p<span class="token variable">#{$i}</span> </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 10px <span class="token operator">*</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.p1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="each" tabindex="-1"><a class="header-anchor" href="#each" aria-hidden="true">#</a> <code>@each</code></h3><p>@each指令的格式是<code>$var in &lt;list&gt;</code>, <code>$var</code>可以是任何变量名，比如<code>$length</code>或者<code>$name</code>,而<code>&lt;list&gt;</code>是一连串的值，也就是值列表。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">p</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$color-list</span></span><span class="token punctuation">:</span> red green blue turquoise darkmagenta<span class="token punctuation">;</span>

<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$color</span> in <span class="token variable">$color-list</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$index</span></span><span class="token punctuation">:</span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token variable">$color-list</span><span class="token punctuation">,</span><span class="token variable">$color</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    .p#<span class="token punctuation">{</span><span class="token variable">$index</span> <span class="token operator">-</span> 1<span class="token punctuation">}</span> <span class="token punctuation">{</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">p</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p0</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p1</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p2</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p3</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> turquoise<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.p4</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> darkmagenta<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="where" tabindex="-1"><a class="header-anchor" href="#where" aria-hidden="true">#</a> <code>@where</code></h3><p>@while指令重复输出格式直到表达式返回结果为false.这样可以实现比@for更复杂的循环。 用sass实现bootstrap中css的这么一段代码 https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.css</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$column</span></span><span class="token punctuation">:</span>12<span class="token punctuation">;</span>
<span class="token keyword">@while</span> <span class="token selector"><span class="token variable">$column</span> &gt; 0 </span><span class="token punctuation">{</span>
    <span class="token selector">.col-sm-<span class="token variable">#{$column}</span> </span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$column</span> <span class="token operator">/</span> 12 <span class="token operator">*</span> 100%<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token property"><span class="token variable">$column</span></span><span class="token punctuation">:</span> <span class="token variable">$column</span> <span class="token operator">-</span> 1<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.col-sm-12</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-11</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 91.66666667%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-10</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 83.33333333%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-9</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 75%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-8</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 66.66666667%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-7</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 58.33333333%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-6</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-5</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 41.66666667%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-4</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 33.33333333%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-3</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 25%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-2</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 16.66666667%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.col-sm-1</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 8.33333333%<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="function自定义函数" tabindex="-1"><a class="header-anchor" href="#function自定义函数" aria-hidden="true">#</a> <code>@function</code>自定义函数</h3><p>把一些比较复杂或经常用些的内容进行抽离(封装) ,以便重复使用</p><p>函数格式：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@function</span> <span class="token function">function-name</span><span class="token punctuation">(</span>[<span class="token variable">$param1</span><span class="token punctuation">,</span><span class="token variable">$param2</span><span class="token punctuation">,</span>...]<span class="token punctuation">)</span><span class="token punctuation">{</span>
    ...
    <span class="token keyword">@return</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示:函数名function-name与function_ _name 是相同的</p><p><code>@return</code>：它只允许在@函数体中使用，并且每个@function必须以@return结束。当遇到@return时， 它会立即结束函数并返回其结果。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/</span>
<span class="token keyword">@function</span> <span class="token function">background-linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span> <span class="token variable">$start-color</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$end-color</span></span><span class="token punctuation">:</span> blue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span> <span class="token variable">$start-color</span><span class="token punctuation">,</span> <span class="token variable">$end-color</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 正常传参</span>
<span class="token selector">body </span><span class="token punctuation">{</span>
    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">background-linear-gradient</span><span class="token punctuation">(</span>to fight<span class="token punctuation">,</span> blue<span class="token punctuation">,</span> green<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 省略默认值</span>
<span class="token selector">body </span><span class="token punctuation">{</span>
    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">background-linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 按照key进行传参</span>
<span class="token selector">body </span><span class="token punctuation">{</span>
    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">background-linear-gradient</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$start-color</span></span><span class="token punctuation">:</span> red<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$direction</span></span><span class="token punctuation">:</span> to right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">;</span></span>
<span class="token comment">/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">-webkit-gradient</span><span class="token punctuation">(</span>linear<span class="token punctuation">,</span> fight<span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span>blue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">to</span><span class="token punctuation">(</span>green<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to fight<span class="token punctuation">,</span> blue<span class="token punctuation">,</span> green<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">-webkit-gradient</span><span class="token punctuation">(</span>linear<span class="token punctuation">,</span> left top<span class="token punctuation">,</span> right top<span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span>blue<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">to</span><span class="token punctuation">(</span>blue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> blue<span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">-webkit-gradient</span><span class="token punctuation">(</span>linear<span class="token punctuation">,</span> left top<span class="token punctuation">,</span> right top<span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">to</span><span class="token punctuation">(</span>blue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> red<span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/</span>
<span class="token keyword">@function</span> <span class="token function">background-linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span><span class="token variable">$gradients</span>...<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span><span class="token variable">$gradients</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body </span><span class="token punctuation">{</span>
    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">background-linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span>red<span class="token punctuation">,</span>green<span class="token punctuation">,</span>blue <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$widths</span></span><span class="token punctuation">:</span> 50px<span class="token punctuation">,</span>30px<span class="token punctuation">,</span>80px<span class="token punctuation">;</span>
<span class="token selector">.top </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">min</span><span class="token punctuation">(</span>50px<span class="token punctuation">,</span>30px<span class="token punctuation">,</span>80px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">min</span><span class="token punctuation">(</span><span class="token variable">$widths</span>...<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@charset</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">;</span></span>
<span class="token comment">/**
    *定义线性渐变
    *@param $direction 方向
    *@param $gradients 颜色过渡值列表
*/</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">-webkit-gradient</span><span class="token punctuation">(</span>linear<span class="token punctuation">,</span> left top<span class="token punctuation">,</span> right top<span class="token punctuation">,</span> <span class="token function">from</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">color-stop</span><span class="token punctuation">(</span>green<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">to</span><span class="token punctuation">(</span>blue<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> red<span class="token punctuation">,</span> green<span class="token punctuation">,</span> blue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.top</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>混入<code>mixin</code>和函数<code>function</code>的区别</strong></p><ul><li><p>混入<code>mixin</code>主要是通过传递参数的方式输出多样化的样式，为了可以现实代码复用。</p></li><li><p>函数的功能主要是通过传递参数后，经过函数内部的计算，最后<code>@return</code>输出一个值。</p></li></ul><h3 id="if三元条件函数" tabindex="-1"><a class="header-anchor" href="#if三元条件函数" aria-hidden="true">#</a> <code>if</code>三元条件函数</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token function">if</span><span class="token punctuation">(</span><span class="token variable">$condition</span><span class="token punctuation">,</span><span class="token variable">$if-true</span><span class="token punctuation">,</span><span class="token variable">$if-false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>判断<code>$condition</code>,如果条件成立，则返回<code>$if-true</code>的结果， 如果条件不成立,则返回<code>$if-false</code>的结果。</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$theme</span></span><span class="token punctuation">:</span><span class="token string">&#39;light&#39;</span><span class="token punctuation">;</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">if</span><span class="token punctuation">(</span><span class="token variable">$theme</span>==<span class="token string">&#39;light&#39;</span><span class="token punctuation">,</span>#000<span class="token punctuation">,</span>#fff<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use" tabindex="-1"><a class="header-anchor" href="#use" aria-hidden="true">#</a> <code>@use</code></h3><p>从其他<code>Sass</code>样式表加载<code>mixin</code>, <code>function</code>和变量， 并将来自多个样式表的CSS组合在-起，<code>@use</code>加载的样式表被称为“模块”，多次引入只包含一次。 <code>@use</code>也可以看作是对<code>@import</code>的增强</p><p>语法：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;&lt;url&gt;&#39;</span> [<span class="token module-modifier keyword">as</span> alias|namespace]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>加载普通scss、css</p><p><code>scss/uses/_common.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px <span class="token statement keyword">!default</span><span class="token punctuation">;</span>

<span class="token selector">* </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">column-width</span><span class="token punctuation">(</span><span class="token variable">$col</span><span class="token punctuation">,</span> <span class="token variable">$total</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token function">percentage</span><span class="token punctuation">(</span><span class="token variable">$col</span>/<span class="token variable">$total</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">bgColor</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$bg-color</span></span><span class="token punctuation">:</span> #f2f2f2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$bg-color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss/css/about.css</code></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">h1</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss/use.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;uses/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">&#39;css/about.css&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的<code>css/use.css</code>文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">h1</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>新建<code>scss/uses/_global.scss</code>文件</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token function">base</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span>#f00<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.gclass </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>@use</code>：使用<code>@use</code>引入两次相同的文件时需要指定命名空间，否则会报错；引入两次相同的文件，编译后的css不为重复生成两次引入的文件内容</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;uses/common&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 使用两个&#39;uses/global&#39;，必须指定命名空间</span>
<span class="token comment">// 否则都使用相同的默认命名空间会报错</span>
<span class="token comment">// 可以使用*取消命名空间，直接可以调用不需要添加&quot;命名空间.&quot;，不推荐使用</span>
<span class="token keyword">@use</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> *<span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g2<span class="token punctuation">;</span>

<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> common.<span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> common.<span class="token function">column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> <span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> g2.<span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.gclass</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 25%<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>@import</code>：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@import</span> <span class="token string">&#39;uses/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@import</span> <span class="token string">&#39;uses/global&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@import</span> <span class="token string">&#39;uses/global&#39;</span><span class="token punctuation">;</span>

<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> <span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> <span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.gclass</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.gclass</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 25%<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230216151153634.png" alt="image-20230216151153634" tabindex="0" loading="lazy"><figcaption>image-20230216151153634</figcaption></figure><hr><p>可以使用<code>$-</code>指定该变量为局部变量，只能本文件使用</p><p><code>scss\\uses\\_global.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$-font-size</span></span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token function">base</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span>#f00<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$-font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 

<span class="token selector">.gclass </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\use.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;uses/common&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 使用两个&#39;uses/global&#39;，必须指定命名空间</span>
<span class="token comment">// 否则都使用相同的默认命名空间会报错</span>
<span class="token comment">// 可以使用*取消命名空间，直接可以调用不需要添加&quot;命名空间.&quot;，不推荐使用</span>
<span class="token keyword">@use</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> *<span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g2<span class="token punctuation">;</span>

<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> g2.<span class="token variable">$-font-size</span><span class="token punctuation">;</span> <span class="token comment">// 此处会报错，不能使用私有的变量</span>
    <span class="token property">width</span><span class="token punctuation">:</span> common.<span class="token function">column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> <span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> g2.<span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>报了如下错误，表示不能使用该变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>--------------------
Compilation Error
Error: Private members can&#39;t be accessed from outside their modules.
  ╷
<span class="token number">9</span> │     font-size: g2.$-font-size<span class="token punctuation">;</span>
  │                ^^^^^^^^^^^^^^
  ╵
  b:<span class="token punctuation">\\</span>scss<span class="token punctuation">\\</span>scss<span class="token punctuation">\\</span>use.scss <span class="token number">9</span>:16  root stylesheet
--------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>可以使用<code>with</code>修改引入的模块的变量默认值</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span>30px<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><p>我们可以新建<code>scss\\uses\\_index.scss</code>文件</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;common&#39;</span> <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span>30px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 使用两个&#39;uses/global&#39;，必须指定命名空间</span>
<span class="token comment">// 否则都使用相同的默认命名空间会报错</span>
<span class="token comment">// 可以使用*取消命名空间，直接可以调用不需要添加&quot;命名空间.&quot;，不推荐使用</span>
<span class="token keyword">@use</span> <span class="token string">&#39;global&#39;</span> <span class="token module-modifier keyword">as</span> g1<span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">&#39;global&#39;</span> <span class="token module-modifier keyword">as</span> g2<span class="token punctuation">;</span>

<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> common.<span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> common.<span class="token function">column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> g1.<span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> g2.<span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在<code>scss\\use.scss</code>引入</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;uses&#39;</span><span class="token punctuation">;</span> <span class="token comment">// 自动找到 uses/_index.scss</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230216155626101.png" alt="image-20230216155626101" tabindex="0" loading="lazy"><figcaption>image-20230216155626101</figcaption></figure><p><strong><code>@use</code>使用总结</strong></p><p><code>@use</code>引入同一个文件多次,不会重复引入，而<code>@import</code>会重复引入 <code>@use</code>引入的文件都是一个模块， 默认以文件名作为模块名,可通过<code>as alias</code>取别名 <code>@use</code>引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问，而<code>@import</code>变量会被覆盖 <code>@use</code>方式可通过<code>@use ‘xxx’ as *</code>来取消命名空间，建议不要这么做 <code>@use</code>模块内可通过$-或$来定义私有成员，也就是说或者开头的<code>Variables mixins functions</code>不会被引入 <code>@use</code>模块内变星可通过<code>!default</code>定义默认值，引入时可通用<code>with (...)</code>的方式修改 可定义<code>-index.scss</code>或<code>_index.scss</code>来合并多个<code>scss</code>文件,它<code>@use</code>默认加载文件</p><h3 id="forward" tabindex="-1"><a class="header-anchor" href="#forward" aria-hidden="true">#</a> <code>@forward</code></h3><p>通过@forward加载一个模块的成员， 并将这些成员当作自己的成员对外暴露出去，类似于类似于es6的export ...通常用于跨多个文件组织Sass库</p><p>比如我们想在<code>scss\\use.scss</code>文件里使用<code>scss\\uses\\_common.scss</code>文件的<code>$font-size</code>变量，我们必须在<code>scss\\uses\\_index.scss</code>文件里声明<code>$font-size</code>，将其内部引入的模块的<code>$font-size</code>变量作为自己的变量，别的文件引入<code>_index.scss</code>时才可以使用<code>$font-size</code></p><p><code>scss\\uses\\_index.scss</code>：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;common&#39;</span> <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span>30px<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> common.<span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> common.<span class="token variable">$font-size</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\use.scss</code>：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;uses&#39;</span> <span class="token module-modifier keyword">as</span> index<span class="token punctuation">;</span> 
<span class="token selector">.container </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> index.<span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>我们可以使用如下方式解决这个问题：</p><p><code>scss\\uses\\_common.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 14px <span class="token statement keyword">!default</span><span class="token punctuation">;</span>

<span class="token selector">* </span><span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">column-width</span><span class="token punctuation">(</span><span class="token variable">$col</span><span class="token punctuation">,</span> <span class="token variable">$total</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">@return</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token variable">$col</span>/<span class="token variable">$total</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">bgColor</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$bg-color</span></span><span class="token punctuation">:</span> #f2f2f2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$bg-color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\uses\\_global.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$-font-size</span></span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token function">base</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span>#f00<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$-font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 

<span class="token selector">.gclass </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\_bootstrap.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\use.scss</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;./bootstrap&#39;</span><span class="token punctuation">;</span> 
<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> bootstrap.<span class="token variable">$font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> bootstrap.<span class="token function">column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> bootstrap.<span class="token function">bgColor</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> bootstrap.<span class="token function">base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>选择性转发：</strong></p><p><code>scss\\_bootstrap.scss</code>：<code>common</code>模块只转发<code>$font-size</code>和<code>column-width</code></p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">show</span> <span class="token variable">$font-size</span><span class="token punctuation">,</span>column-width<span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>选择性不转发：</strong></p><p><code>scss\\_bootstrap.scss</code>：<code>common</code>模块除<code>bgColor</code>其他都转发</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">hide</span> bgColor<span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>如果转发的模块有相同的变量时会报错，比如修改<code>scss\\uses\\_global.scss</code>如下所示，这样<code>common</code>和<code>global</code>都有<code>$font-size</code>，此时会报错</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token keyword">@mixin</span> <span class="token function">base</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span>#f00<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$font-size</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 

<span class="token selector">.gclass </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以再转发时指定一个前缀来解决这个问题</p><blockquote><p>注意：前缀后面要加一个<code>*</code></p></blockquote><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">as</span> c-* <span class="token module-modifier keyword">hide</span> bgColor<span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g-*<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\use.scss</code>：使用时也需要加入前缀</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;./bootstrap&#39;</span><span class="token punctuation">;</span> 
<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> bootstrap.<span class="token variable">$c-font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> bootstrap.<span class="token function">c-column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// @include bootstrap.bgColor(#f00);</span>
    <span class="token keyword">@include</span> bootstrap.<span class="token function">g-base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是此时我们可以使用<code>bgColor</code>了，这是因为设置<code>hide</code>时我们同样需要添加前缀</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;./bootstrap&#39;</span><span class="token punctuation">;</span> 
<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> bootstrap.<span class="token variable">$c-font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> bootstrap.<span class="token function">c-column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> bootstrap.<span class="token function">c-bgColor</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">@include</span> bootstrap.<span class="token function">g-base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>scss\\_bootstrap.scss</code>：修改后就不能使用<code>bgColor</code>了</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">as</span> c-* <span class="token module-modifier keyword">hide</span> c-bgColor<span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g-*<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><code>@forward</code>也可以使用<code>with</code>修改变量的值</p><blockquote><p>注意：<code>$font-size</code>不用加前缀<code>c-</code></p></blockquote><p><code>scss\\_bootstrap.scss</code>：（这里Vs Code编辑器爆红，但是编译器可以正常编译）</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">as</span> c-* <span class="token module-modifier keyword">hide</span> c-bgColor <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 60px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g-*<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>如果<code>use.scss</code>还想要修改变量的值，<code>_bootstrap.scss</code>里该变量要设成默认值，并且<code>use.scss</code>里该变量要添加前缀</p><p><code>scss\\_bootstrap.scss</code>：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">as</span> c-* <span class="token module-modifier keyword">hide</span> c-bgColor <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 60px <span class="token statement keyword">!default</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g-*<span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>_bootstrap.scss</code>里的<code>with</code>里不添加前缀是因为 这里的<code>with</code>是修改的其对应模块的变量，也就是<code>uses\\_common.scss</code>文件里的变量，这里面是没有前缀的，前缀是<code>_bootstrap.scss</code>文件里引入时指定的。</p><p><code>use.scss</code>里的<code>with</code>里需要添加前缀是因为修改的是<code>_bootstrap.scss</code>里的变量，再<code>_bootstrap.scss</code>里变量已经添加前缀了</p></blockquote><p><code>scss\\use.scss</code>：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&#39;./bootstrap&#39;</span> <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$c-font-size</span></span><span class="token punctuation">:</span> 45px<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token selector">body</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> bootstrap.<span class="token variable">$c-font-size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> bootstrap.<span class="token function">c-column-width</span><span class="token punctuation">(</span>3<span class="token punctuation">,</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//@include bootstrap.c-bgColor(#f00);</span>
    <span class="token keyword">@include</span> bootstrap.<span class="token function">g-base</span><span class="token punctuation">(</span>#f00<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在<code>scss\\_bootstrap.scss</code>文件里修改<code>scss\\uses\\_common.scss</code>文件里某些变量的值后还想使用<code>scss\\uses\\_common.scss</code>文件里的值，可以使用<code>@use</code>引入</p><blockquote><p>注意：如果使用<code>@forward</code>转发并使用<code>with</code>修改变量值，此时使用<code>@use</code>引入这个模块，必须放在<code>@forward</code>后，否则会报如下错误</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>--------------------
Compilation Error
Error: This module was already loaded, so it can<span class="token string">&#39;t be configured using &quot;with&quot;.
  ╷
1 │ @use &#39;</span>uses/common<span class="token string">&#39;;
  │ ━━━━━━━━━━━━━━━━━━ original load
2 │ @forward &#39;</span>uses/common&#39; as c-* hide c-bgColor with<span class="token punctuation">(</span><span class="token variable">$font</span>-size: 60px <span class="token operator">!</span>default<span class="token punctuation">)</span><span class="token punctuation">;</span>
  │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ new load
  ╵
  b:<span class="token punctuation">\\</span>scss<span class="token punctuation">\\</span>scss<span class="token punctuation">\\</span>_bootstrap.scss <span class="token number">2</span>:1  @use
  b:<span class="token punctuation">\\</span>scss<span class="token punctuation">\\</span>scss<span class="token punctuation">\\</span>use.scss <span class="token number">1</span>:1         root stylesheet
--------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果<code>@forward</code>不使用<code>with</code>，则<code>@forward</code>和<code>@use</code>的顺序没有要求</p></blockquote><p><code>scss\\_bootstrap.scss</code>：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@forward</span> <span class="token string">&#39;uses/common&#39;</span> <span class="token module-modifier keyword">as</span> c-* <span class="token module-modifier keyword">hide</span> c-bgColor <span class="token module-modifier keyword">with</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 60px <span class="token statement keyword">!default</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">@forward</span> <span class="token string">&#39;uses/global&#39;</span> <span class="token module-modifier keyword">as</span> g-*<span class="token punctuation">;</span>
<span class="token keyword">@use</span> <span class="token string">&#39;uses/common&#39;</span><span class="token punctuation">;</span>
<span class="token selector">.block </span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> common.<span class="token function">bgColor</span><span class="token punctuation">(</span>#fff<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="at-root" tabindex="-1"><a class="header-anchor" href="#at-root" aria-hidden="true">#</a> <code>@at-root</code></h3><p><code>@at-root</code>可以使被嵌套的选择器或属性跳出嵌套</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code>@<span class="token selector">at-root &lt;selector&gt;</span><span class="token punctuation">{</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>普通嵌套</strong></p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.parent </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token selector">.child </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
        <span class="token selector">.son </span><span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.parent</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent .child</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent .child .son</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>作用某个选择器使其跳出嵌套</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.parent </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token atrule"><span class="token rule">@at-root</span> .child1</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
        <span class="token selector">.son1 </span><span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.child2</span><span class="token punctuation">{</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
        <span class="token atrule"><span class="token rule">@at-root</span> .son2</span> <span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
        <span class="token selector">.child3 </span><span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.parent</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child1</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.child1 .son1</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.parent .child2</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.son2</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.child3</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>我们也可以使用如下方式达到同样的目的（不过感觉好像没啥用）</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.foo </span><span class="token punctuation">{</span>
    <span class="token selector">.bar </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.foo </span><span class="token punctuation">{</span>
    <span class="token selector"><span class="token parent important">&amp;</span> </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.foo </span><span class="token punctuation">{</span>
    <span class="token selector"><span class="token parent important">&amp;</span> .bar </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.foo </span><span class="token punctuation">{</span>
    <span class="token selector">.bar <span class="token parent important">&amp;</span> </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.foo .bar</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.foo</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.foo .bar</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.bar .foo</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><code>BEM命名规范</code></p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.block</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token atrule"><span class="token rule">@at-root</span> #<span class="token punctuation">{</span>&amp;<span class="token punctuation">}</span>_element</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
        <span class="token atrule"><span class="token rule">@at-root</span> #<span class="token punctuation">{</span>&amp;<span class="token punctuation">}</span>--modifier</span> <span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token atrule"><span class="token rule">@at-root</span> #<span class="token punctuation">{</span>&amp;<span class="token punctuation">}</span>--modifier</span> <span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>scss文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.block</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.block_element</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.block_element--modifier</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.block--modifier</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们也可以使用<code>&amp;</code>到达相同的效果</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.block</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token selector"><span class="token parent important">&amp;</span>_element </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
        <span class="token selector"><span class="token parent important">&amp;</span>--modifier </span><span class="token punctuation">{</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector"><span class="token parent important">&amp;</span>--modifier </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><code>@at-root (without: ...)</code>和<code>@at-root (with: ...)</code>的使用 默认<code>@at-root</code>只会跳出选择器嵌套，而不能跳出<code>@media</code>或<code>@support</code>，如果要跳出这两种,则需使用<code>@at-root (without: media)</code>, <code>@at-root (without: support)</code>。 这个语法的关键词有四个: 1、all (表示所有) 2、rule (表示常规css，默认) 3、media (表示media) 4、supports (表示supports)</p><p><strong>比如：我们直接使用<code>@at-root</code>跳不出媒体查询</strong></p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token atrule"><span class="token rule">@media</span> screen</span> <span class="token punctuation">{</span>
    <span class="token selector">.parent </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
        <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
            <span class="token selector">.child </span><span class="token punctuation">{</span>
                <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
                <span class="token selector">.son </span><span class="token punctuation">{</span>
                    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> screen</span> <span class="token punctuation">{</span>
  <span class="token selector">.parent</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.child</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.child .son</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>我们使用<code>@at-root (without: media)</code>后就可以跳出媒体查询</p><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token atrule"><span class="token rule">@media</span> screen</span> <span class="token punctuation">{</span>
    <span class="token selector">.parent </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
        <span class="token atrule"><span class="token rule">@at-root</span> <span class="token punctuation">(</span><span class="token property">without</span><span class="token punctuation">:</span> media<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
            <span class="token selector">.child </span><span class="token punctuation">{</span>
                <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
                <span class="token selector">.son </span><span class="token punctuation">{</span>
                    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@media</span> screen</span> <span class="token punctuation">{</span>
  <span class="token selector">.parent</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent .child</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent .child .son</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>scss文件：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token atrule"><span class="token rule">@supports</span> <span class="token punctuation">(</span><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
    <span class="token selector">.parent </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
        <span class="token atrule"><span class="token rule">@at-root</span> <span class="token punctuation">(</span><span class="token property">without</span><span class="token punctuation">:</span> supports<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
            <span class="token selector">.child </span><span class="token punctuation">{</span>
                <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
                <span class="token selector">.son </span><span class="token punctuation">{</span>
                    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的 css文件：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@supports</span> <span class="token punctuation">(</span><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token selector">.parent</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent .child</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent .child .son</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,583);function b(g,h){const a=t("ExternalLinkIcon");return c(),o("div",null,[u,r,n("p",null,[s("中文文档： "),n("a",d,[s("Sass教程 Sass中文文档 | Sass中文网"),p(a)])]),n("p",null,[s("英文文档："),n("a",k,[s("Sass: Documentation (sass-lang.com)"),p(a)])]),n("p",null,[s("项目源码："),n("a",v,[s("GitHub - sass/sass: Sass makes CSS fun!"),p(a)])]),m])}const x=e(l,[["render",b],["__file","1.scss基础.html.vue"]]);export{x as default};
