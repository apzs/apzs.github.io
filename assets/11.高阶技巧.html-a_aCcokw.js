import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as e,o,c,a as s,b as n,d as t,e as i}from"./app-AMUHiwF7.js";const l={},u=s("h1",{id:"python高阶技巧-十二",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#python高阶技巧-十二","aria-hidden":"true"},"#"),n(" Python高阶技巧(十二)")],-1),d={href:"https://blog.csdn.net/m0_66570338/article/details/128714062",target:"_blank",rel:"noopener noreferrer"},r={href:"https://download.csdn.net/download/m0_66570338/90058670",target:"_blank",rel:"noopener noreferrer"},k=i(`<h3 id="一-闭包" tabindex="-1"><a class="header-anchor" href="#一-闭包" aria-hidden="true">#</a> 一.闭包</h3><blockquote><p>可以保存函数内变量，不会随着函数调用完而销毁</p></blockquote><h4 id="_1-基本定义" tabindex="-1"><a class="header-anchor" href="#_1-基本定义" aria-hidden="true">#</a> (1) 基本定义</h4><ul><li>在函数嵌套的前提下，内部函数使用了外部函数的变量，并且外部函数返回了内部函数，我们把这个使用外部函数变量的内部函数称为闭包。</li><li>使用示例：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 1.在函数嵌套(函数中定义函数)的前提下</span>
<span class="token keyword">def</span> <span class="token function">func_out</span><span class="token punctuation">(</span>num1<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">func_inner</span><span class="token punctuation">(</span>num2<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 2.内部函数使用了外部函数的变量</span>
        num <span class="token operator">=</span> num1 <span class="token operator">+</span> num2
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;num的值为：</span><span class="token interpolation"><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

    <span class="token comment"># 3.外部函数返回了内部函数</span>
    <span class="token keyword">return</span> func_inner

<span class="token comment"># 创建闭包实例</span>
f <span class="token operator">=</span> func_out<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token comment"># 执行闭包</span>
f<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment"># 打印 num的值为：16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-修改外部函数变量的值" tabindex="-1"><a class="header-anchor" href="#_2-修改外部函数变量的值" aria-hidden="true">#</a> (2) 修改外部函数变量的值</h4><ul><li>在闭包函数（内部函数中）想要修改外部函数的变量值，必须用nonlocal声明这个外部变量</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 1.在函数嵌套(函数中定义函数)的前提下</span>
<span class="token keyword">def</span> <span class="token function">func_out</span><span class="token punctuation">(</span>num1<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">func_inner</span><span class="token punctuation">(</span>num2<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 声明外部变量</span>
        <span class="token keyword">nonlocal</span> num1
        <span class="token comment"># 2.内部函数使用了外部函数的变量</span>
        num1 <span class="token operator">+=</span> num2
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;num1的值为：</span><span class="token interpolation"><span class="token punctuation">{</span>num1<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

    <span class="token comment"># 3.外部函数返回了内部函数</span>
    <span class="token keyword">return</span> func_inner


<span class="token comment"># 创建闭包实例</span>
f <span class="token operator">=</span> func_out<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token comment"># 执行闭包</span>
f<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>  <span class="token comment"># 打印 num的值为：18</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-小结" tabindex="-1"><a class="header-anchor" href="#_3-小结" aria-hidden="true">#</a> (3) 小结</h4><ul><li>优点: <ul><li>无需定义全局变量即可实现通过函数，持续的访问、修改某个值</li><li>闭包使用的变量于所在的函数内，难以被错误的调用修改，可使变量更安全不易被恶意行为修改</li></ul></li><li>缺点: <ul><li>由于内部函数持续引用外部函数的值，所以会导致这一部分内存空间不被释放，一直占用内存（额外的内存占用）</li></ul></li></ul><hr><h3 id="二-装饰器" tabindex="-1"><a class="header-anchor" href="#二-装饰器" aria-hidden="true">#</a> 二.装饰器</h3><blockquote><p>也是一种闭包，可在不破坏目标函数原有的代码和功能的前提下，为目标函数增加新功能</p></blockquote><h4 id="_1-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-基本使用" aria-hidden="true">#</a> (1) 基本使用</h4><ul><li>装饰器就是把一个函数当做参数传递给闭包中的外部函数，同时在内部函数中使用这个函数，并给他添加新的功能。</li><li>外部函数只能有一个参数，往往是被装饰的函数</li><li>内部函数可以根据被装饰的函数提供多个参数以及返回值</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义一个装饰器</span>
<span class="token keyword">def</span> <span class="token function">remind</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 为目标函数增加新功能</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我睡觉了&quot;</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我起床了&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> inner


<span class="token comment"># 需要被装饰的函数</span>
<span class="token keyword">def</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> random
    <span class="token keyword">import</span> time
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;睡眠中...&quot;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
<span class="token comment"># 未装饰</span>
sleep<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 打印</span>
<span class="token comment"># 睡眠中...</span>

<span class="token comment"># 使用装饰器装饰函数(增加睡前起床提醒)</span>
<span class="token comment"># 返回增强后的inner函数</span>
fn <span class="token operator">=</span> remind<span class="token punctuation">(</span>sleep<span class="token punctuation">)</span>
fn<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 打印</span>
<span class="token comment"># 我睡觉了</span>
<span class="token comment"># 睡眠中...</span>
<span class="token comment"># 我起床了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-语法糖使用" tabindex="-1"><a class="header-anchor" href="#_2-语法糖使用" aria-hidden="true">#</a> (2) 语法糖使用</h4><ul><li>可直接在需要被装饰的函数上加<code>@装饰器名字</code>，解释器碰到时会自动执行装饰过程，简化使用流程</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义一个装饰器</span>
<span class="token keyword">def</span> <span class="token function">remind</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我睡觉了&quot;</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我起床了&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> inner


<span class="token comment"># 需要被装饰的函数</span>
<span class="token comment"># 解释器遇到@remind 会立即执行 sleep = remind(sleep)</span>
<span class="token decorator annotation punctuation">@remind</span>
<span class="token keyword">def</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> random
    <span class="token keyword">import</span> time
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;睡眠中...&quot;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 通过语法糖注解，直接调用即可达到效果</span>
sleep<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 打印</span>
<span class="token comment"># 我睡觉了</span>
<span class="token comment"># 睡眠中...</span>
<span class="token comment"># 我起床了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-多个装饰器使用" tabindex="-1"><a class="header-anchor" href="#_3-多个装饰器使用" aria-hidden="true">#</a> (3) 多个装饰器使用</h4><ul><li>将装饰器都写在需要被装饰的函数上面即可</li><li>谁离被装饰的函数最近，谁就先去装饰函数</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义装饰器1</span>
<span class="token keyword">def</span> <span class="token function">remind</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我睡觉了&quot;</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我起床了&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> inner


<span class="token comment"># 定义装饰器2</span>
<span class="token keyword">def</span> <span class="token function">study</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        func<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;我要敲代码啦&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> inner


<span class="token comment"># 谁近谁先装饰</span>
<span class="token decorator annotation punctuation">@study</span>   <span class="token comment"># 2.执行 sleep = study(remind(sleep))</span>
<span class="token decorator annotation punctuation">@remind</span>  <span class="token comment"># 1.执行 sleep = remind(sleep)</span>
<span class="token keyword">def</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> random
    <span class="token keyword">import</span> time
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;睡眠中...&quot;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


sleep<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 打印</span>
<span class="token comment"># 我睡觉了</span>
<span class="token comment"># 睡眠中...</span>
<span class="token comment"># 我起床了</span>
<span class="token comment"># 我要敲代码啦</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-带参数的装饰器" tabindex="-1"><a class="header-anchor" href="#_4-带参数的装饰器" aria-hidden="true">#</a> (4) 带参数的装饰器</h4><ul><li>需要再增加一层函数嵌套来接收传递的参数</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 第一层：用于接收装饰器传递的参数</span>
<span class="token keyword">def</span> <span class="token function">logging</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 第二层：外部函数用于接收待装饰函数</span>
    <span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 第三层：内部函数用于装饰接收的函数</span>
        <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token comment"># 使用参数</span>
            <span class="token keyword">if</span> flag <span class="token operator">==</span> <span class="token string">&quot;+&quot;</span><span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;正在进行加法运算&lt;&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">elif</span> flag <span class="token operator">==</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;&gt;正在进行减法运算&lt;&quot;</span><span class="token punctuation">)</span>
            result <span class="token operator">=</span> fn<span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span>
            <span class="token keyword">return</span> result
		
        <span class="token keyword">return</span> inner

    <span class="token comment"># 返回装饰器</span>
    <span class="token keyword">return</span> decorator


<span class="token comment"># 被带有参数的装饰器装饰的函数</span>
<span class="token decorator annotation punctuation">@logging</span><span class="token punctuation">(</span><span class="token string">&#39;+&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> a <span class="token operator">+</span> b
    <span class="token keyword">return</span> result


result <span class="token operator">=</span> add<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-类装饰器-了解即可" tabindex="-1"><a class="header-anchor" href="#_5-类装饰器-了解即可" aria-hidden="true">#</a> (5) 类装饰器(了解即可)</h4><ul><li>一个类里面一旦实现了<code>__call__</code>方法，那么这个类创建的对象就是一个可调用对象，可以像调用函数一样进行调用</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义类</span>
<span class="token keyword">class</span> <span class="token class-name">Login</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;登录中。。。&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 创建实例</span>
login <span class="token operator">=</span> Login<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 如函数般调用</span>
login<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 打印 登录中。。。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>类装饰器装饰函数的功能通过<code>call</code>方法实现</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义类装饰器</span>
<span class="token keyword">class</span> <span class="token class-name">Check</span><span class="token punctuation">:</span>
    <span class="token comment"># 接收待装饰的函数</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">:</span>   <span class="token comment"># fn = comment</span>
        self<span class="token punctuation">.</span>__fn <span class="token operator">=</span> fn
	
    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">:</span> <span class="token builtin">object</span><span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">:</span> <span class="token builtin">object</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">object</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;登录&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>__fn<span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment"># comment()</span>


<span class="token comment"># 被装饰的函数</span>
<span class="token decorator annotation punctuation">@Check</span>  <span class="token comment"># comment = Check(comment)</span>
<span class="token keyword">def</span> <span class="token function">comment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;发表评论&quot;</span><span class="token punctuation">)</span>


comment<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="三-property属性" tabindex="-1"><a class="header-anchor" href="#三-property属性" aria-hidden="true">#</a> 三.property属性</h3><blockquote><p>把类中的一个方法当作属性进行使用，简化开发</p></blockquote><ul><li>例如我们如果想获取和修改私有属性必须通过类方法修改，示例代码：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>__age <span class="token operator">=</span> <span class="token number">18</span>

    <span class="token keyword">def</span> <span class="token function">age</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>__age

    <span class="token keyword">def</span> <span class="token function">set_age</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> new_age<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>__age <span class="token operator">=</span> new_age


p <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token punctuation">)</span>
age <span class="token operator">=</span> p<span class="token punctuation">.</span>age<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;修改前年龄是：</span><span class="token interpolation"><span class="token punctuation">{</span>age<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 修改前年龄是：18</span>
p<span class="token punctuation">.</span>set_age<span class="token punctuation">(</span><span class="token number">66</span><span class="token punctuation">)</span>
age <span class="token operator">=</span> p<span class="token punctuation">.</span>age<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;修改后年龄是：</span><span class="token interpolation"><span class="token punctuation">{</span>age<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印 修改后年龄是：66</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过使用如下两种方式可简化上述代码的使用</li></ul><h5 id="_1-装饰器方式使用" tabindex="-1"><a class="header-anchor" href="#_1-装饰器方式使用" aria-hidden="true">#</a> (1) 装饰器方式使用</h5><ul><li><code>@property</code>表示把方法当作属性使用，表示当获取属性时执行下面修饰的方法 <ul><li>property修饰的方法名要与属性名一样</li></ul></li><li><code>@方法名.setter</code>表示把方法当作属性使用，表示当设置属性值时会执行下面修饰的方法</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>__age <span class="token operator">=</span> <span class="token number">18</span>

    <span class="token decorator annotation punctuation">@property</span>
    <span class="token keyword">def</span> <span class="token function">age</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>__age

    <span class="token decorator annotation punctuation">@age<span class="token punctuation">.</span>setter</span>
    <span class="token keyword">def</span> <span class="token function">age</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> new_age<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>__age <span class="token operator">=</span> new_age


p <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 可直接通过对象.属性使用</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;修改前年龄是：</span><span class="token interpolation"><span class="token punctuation">{</span>p<span class="token punctuation">.</span>age<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 修改前年龄是：18</span>
p<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">66</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;修改后年龄是：</span><span class="token interpolation"><span class="token punctuation">{</span>p<span class="token punctuation">.</span>age<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 修改后年龄是：66</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-类属性方式使用" tabindex="-1"><a class="header-anchor" href="#_2-类属性方式使用" aria-hidden="true">#</a> (2) 类属性方式使用</h5><ul><li><code>property</code>的参数说明： <ul><li>属性名 = property(获取值方法,设置值方法)</li><li>第一个参数：获取属性时要执行的方法</li><li>第二个参数：设置属性时要执行的方法</li></ul></li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>__age <span class="token operator">=</span> <span class="token number">18</span>

    <span class="token keyword">def</span> <span class="token function">get_age</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>__age

    <span class="token keyword">def</span> <span class="token function">set_age</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> new_age<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>__age <span class="token operator">=</span> new_age

    <span class="token comment"># 类属性方式的property属性</span>
    age <span class="token operator">=</span> <span class="token builtin">property</span><span class="token punctuation">(</span>get_age<span class="token punctuation">,</span> set_age<span class="token punctuation">)</span>


p <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;修改前年龄是：</span><span class="token interpolation"><span class="token punctuation">{</span>p<span class="token punctuation">.</span>age<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 修改前年龄是：18</span>
p<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">66</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;修改后年龄是：</span><span class="token interpolation"><span class="token punctuation">{</span>p<span class="token punctuation">.</span>age<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 修改后年龄是：66</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="四-上下文管理器" tabindex="-1"><a class="header-anchor" href="#四-上下文管理器" aria-hidden="true">#</a> 四.上下文管理器</h3><blockquote><p>由实现了<code>__enter__()</code>和<code>__exit__()</code>方法的类创建的对象</p></blockquote><ul><li>在文件操作篇提到过使用<code>with语句</code>可以自动调用关闭文件操作，即使出现异常也会自动调用关闭文件操作。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;guanzhi.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用with语句简化操作是建立在上下文管理器上的，open函数创建的f文件对象就是一个上下文管理器对象</li><li><code>__enter</code>表示上文方法，需要返回一个操作文件对象</li><li><code>__exit__</code>表示下文方法，with语句执行完成会自动执行，即使出现异常也会执行该方法</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义一个File类</span>
<span class="token keyword">class</span> <span class="token class-name">File</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> file_name<span class="token punctuation">,</span> file_model<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>file_name <span class="token operator">=</span> file_name
        self<span class="token punctuation">.</span>file_model <span class="token operator">=</span> file_model

    <span class="token comment"># 实现__enter__()和__exit__()方法</span>
    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;这是上文&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span><span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>file_name<span class="token punctuation">,</span> self<span class="token punctuation">.</span>file_model<span class="token punctuation">)</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span><span class="token builtin">file</span>

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;这是下文&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span><span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment"># 使用with语句来完成文件操作</span>
<span class="token keyword">with</span> File<span class="token punctuation">(</span><span class="token string">&quot;1.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;hello world&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="五-深拷贝浅拷贝" tabindex="-1"><a class="header-anchor" href="#五-深拷贝浅拷贝" aria-hidden="true">#</a> 五.深拷贝浅拷贝</h3><blockquote><p>开辟新的内存空间接收变量</p></blockquote><ul><li>调用<code>id()</code>可获得变量的内存地址</li></ul><h4 id="_1-浅拷贝" tabindex="-1"><a class="header-anchor" href="#_1-浅拷贝" aria-hidden="true">#</a> (1) 浅拷贝</h4><h5 id="_1-1-可变类型浅拷贝" tabindex="-1"><a class="header-anchor" href="#_1-1-可变类型浅拷贝" aria-hidden="true">#</a> (1.1) 可变类型浅拷贝</h5><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/1c04571d8c5ed4b58d6067dbe99dbcfa.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>使用<code>copy函数</code>进行浅拷贝，只对可变类型的第一层对象进行拷贝 <ul><li>对拷贝的对象开辟新的内存空间进行存储</li><li>不会拷贝对象内部的子对象</li></ul></li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> copy

a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span>
c <span class="token operator">=</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span>
<span class="token comment"># 普通赋值，指向同一空间</span>
d <span class="token operator">=</span> c
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;c内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印 c内存地址:2265505547072</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;d内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印 d内存地址:2265505547072</span>


a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span>
c <span class="token operator">=</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span>
<span class="token comment"># 浅拷贝，指向不同空间</span>
d <span class="token operator">=</span> copy<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;c内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印 c内存地址:2265505547648</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;d内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印 d内存地址:2265505548608</span>

<span class="token comment"># 不会拷贝对象内部的子对象</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 打印 2135734964288</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 打印 2135734964288</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 打印 2135734964288</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_1-2-不可变类型浅拷贝" tabindex="-1"><a class="header-anchor" href="#_1-2-不可变类型浅拷贝" aria-hidden="true">#</a> (1.2) 不可变类型浅拷贝</h5><ul><li>不可变类型进行浅拷贝不会给拷贝的对象开辟新的内存空间，只是拷贝了这个对象的引用</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">)</span>
c <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token comment"># 浅拷贝效果与普通赋值一样</span>
d <span class="token operator">=</span> c
e <span class="token operator">=</span> copy<span class="token punctuation">.</span>copy<span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;c内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># c内存地址:1536064302016</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;d内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># d内存地址:1536064302016</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;e内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># e内存地址:1536064302016</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-深拷贝" tabindex="-1"><a class="header-anchor" href="#_2-深拷贝" aria-hidden="true">#</a> (2) 深拷贝</h4><blockquote><p>保障数据的独立性</p></blockquote><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/501a1d3c425de593dfb666311ecb2157.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h5 id="_2-1-可变类型深拷贝" tabindex="-1"><a class="header-anchor" href="#_2-1-可变类型深拷贝" aria-hidden="true">#</a> (2.1) 可变类型深拷贝</h5><ul><li><p>使用<code>deepcopy函数</code>进行深拷贝，会对可变类型内每一层可变类型对象进行拷贝，开辟新的内存空间进行存储</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> copy

a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">]</span>
c <span class="token operator">=</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span>

d <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;c内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 c内存地址:2603978212160</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;d内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span> <span class="token comment"># 打印 d内存地址:2603978215488</span>

<span class="token comment"># 内部的可变类型也会拷贝</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 打印 2603978215104</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 打印 2603978215104</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 打印 2603978212992</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="_2-2-不可变类型深拷贝" tabindex="-1"><a class="header-anchor" href="#_2-2-不可变类型深拷贝" aria-hidden="true">#</a> (2.2) 不可变类型深拷贝</h5><ul><li>不可变类型进行深拷贝不会给拷贝的对象开辟新的内存空间，只是拷贝了这个对象的引用</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">)</span>
c <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>

d <span class="token operator">=</span> copy<span class="token punctuation">.</span>deepcopy<span class="token punctuation">(</span>c<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;c内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印  c内存地址:1312354282432</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;e内存地址:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>  <span class="token comment"># 打印  e内存地址:1312354282432</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="六-eval函数" tabindex="-1"><a class="header-anchor" href="#六-eval函数" aria-hidden="true">#</a> 六.eval函数</h3><ul><li><code>eval()</code>函数可将字符串<strong>当成有效的表达式</strong>来<strong>求值</strong>并返回计算结果</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 基本的数学运算</span>
res <span class="token operator">=</span> <span class="token builtin">eval</span><span class="token punctuation">(</span><span class="token string">&quot;(1+9)*5&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> 
<span class="token comment"># 打印 50</span>

<span class="token comment"># 字符串重复</span>
res <span class="token operator">=</span> <span class="token builtin">eval</span><span class="token punctuation">(</span><span class="token string">&quot;&#39;*&#39;*10&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> 
<span class="token comment"># 打印 **********</span>

<span class="token comment"># 字符串转换成列表</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span><span class="token builtin">eval</span><span class="token punctuation">(</span><span class="token string">&quot;[1,2,3,4]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 打印 &lt;class &#39;list&#39;&gt;</span>

<span class="token comment"># 字符串转成字典 </span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">type</span><span class="token punctuation">(</span><span class="token builtin">eval</span><span class="token punctuation">(</span><span class="token string">&quot;{&#39;name&#39;:&#39;guanzhi&#39;,&#39;age&#39;:20}&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 打印 &lt;class &#39;dict&#39;&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>注意事项：开发时千万不要使用<code>eval</code>直接转换<code>input</code>的结果</p><ul><li>用户可能恶意输入有危害的终端指令</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>input_str <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 输入 __import__(&#39;os&#39;).system(&#39;rm -rf /*&#39;)</span>
<span class="token builtin">eval</span><span class="token punctuation">(</span>input_str<span class="token punctuation">)</span> <span class="token comment"># 直接运行可能导致主机崩溃</span>

<span class="token comment"># 等价于</span>
<span class="token keyword">import</span> os
os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">&quot;终端命令&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="七-全文概览" tabindex="-1"><a class="header-anchor" href="#七-全文概览" aria-hidden="true">#</a> 七.全文概览</h3><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/4fdf4c5d6951641b8631cd45c3ec1ca0.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,76);function m(v,b){const a=e("ExternalLinkIcon");return o(),c("div",null,[u,s("blockquote",null,[s("p",null,[n("python学习之旅(十二) 学习汇总入口"),s("a",d,[n("【Python】学习汇总(3万字+思维导图)"),t(a)]),n(" 笔记PDF下载："),s("a",r,[n("知识笔记：Python高阶技巧(十二)"),t(a)]),n(" 文末附带全文概览思维导图 写作不易，如果您觉得写的不错，欢迎给博主来一波点赞、收藏~让博主更有动力吧！")])]),k])}const f=p(l,[["render",m],["__file","11.高阶技巧.html.vue"]]);export{f as default};
