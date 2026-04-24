import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as t,c as o,a as s,b as n,d as e,e as p}from"./app-AMUHiwF7.js";const c={},d=s("h1",{id:"python循环语句-三",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#python循环语句-三","aria-hidden":"true"},"#"),n(" python循环语句（三）")],-1),r={href:"https://so.csdn.net/so/search?q=python%E5%AD%A6%E4%B9%A0&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},u={href:"https://blog.csdn.net/m0_66570338/article/details/128714062",target:"_blank",rel:"noopener noreferrer"},m={href:"https://download.csdn.net/download/m0_66570338/90058528",target:"_blank",rel:"noopener noreferrer"},k=p(`<h3 id="一-while-循环" tabindex="-1"><a class="header-anchor" href="#一-while-循环" aria-hidden="true">#</a> 一.while 循环</h3><blockquote><p>条件满足无限执行</p></blockquote><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/76ff9a2f7d50a67e9a03d88f82a3f4ab.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="_1-定义格式" tabindex="-1"><a class="header-anchor" href="#_1-定义格式" aria-hidden="true">#</a> (1) 定义格式</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">while</span> 条件：
	条件为<span class="token boolean">True</span>时重复执行
    
<span class="token comment"># 写法要求与if语句类似</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用示例：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>i <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">while</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;观止study&quot;</span><span class="token punctuation">)</span>
    i <span class="token operator">+=</span> <span class="token number">1</span> <span class="token comment"># 等效于 i = i + 1</span>
<span class="token comment"># 需要设置循环终止的条件，如i += 1配合 i &lt; 100，就能确保执行100次后停止，否则将无限循环</span>
<span class="token comment"># 控制台输出 100次观止study</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="二-for循环" tabindex="-1"><a class="header-anchor" href="#二-for循环" aria-hidden="true">#</a> 二.for循环</h3><blockquote><p>对一批内容进行逐个处理</p></blockquote><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/f7f4c3cf2546d1af663aa62d8ebc864f.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h4 id="_1-定义格式-1" tabindex="-1"><a class="header-anchor" href="#_1-定义格式-1" aria-hidden="true">#</a> (1) 定义格式</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> 临时变量 <span class="token keyword">in</span> 待处理数据集<span class="token punctuation">(</span>可迭代对象<span class="token punctuation">)</span><span class="token punctuation">:</span> 
        循环满足条件时执行的代码
<span class="token comment"># 从待处理数据集中：逐个取出数据赋值给临时变量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>待处理数据集，也称之为：可迭代类型</li><li>可迭代类型指，其内容可以一个个依次取出的一种类型，包括： <ul><li>字符串</li><li>列表</li><li>元组等</li></ul></li><li>for循环语句，本质上是遍历：可迭代对象。</li><li>使用示例</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 定义字符串name</span>
name <span class="token operator">=</span> <span class="token string">&quot;study&quot;</span>
<span class="token comment"># for循环处理字符串</span>
<span class="token keyword">for</span> x <span class="token keyword">in</span> name<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token comment"># 将字符串的内容：依次取出</span>
<span class="token comment"># 输出</span>
<span class="token comment"># s</span>
<span class="token comment"># t</span>
<span class="token comment"># u</span>
<span class="token comment"># d</span>
<span class="token comment"># y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-区别while" tabindex="-1"><a class="header-anchor" href="#_2-区别while" aria-hidden="true">#</a> (2) 区别while</h4><ul><li>for循环是无法定义循环条件的。只能从被处理的数据集中，依次取出内容进行处理.</li><li>理论上讲，for循环无法构建无限循环（被处理的数据集不可能无限大）</li></ul><h4 id="_3-range语句" tabindex="-1"><a class="header-anchor" href="#_3-range语句" aria-hidden="true">#</a> (3) range语句</h4><blockquote><p>用于获得一个简单的数字序列（可迭代类型的一种）。</p></blockquote><ul><li>语法一: range(num)</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 获取一个从0开始，到num结束的数字序列（不含num本身）</span>
<span class="token comment"># 如range(5)取得的数据是：[0, 1, 2, 3, 4]</span>
<span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># 0</span>
<span class="token comment"># 1</span>
<span class="token comment"># 2</span>
<span class="token comment"># 3</span>
<span class="token comment"># 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>语法二: range(num1，num2)</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 获得一个从num1开始，到num2结束的数字序列（不含num2本身）</span>
<span class="token comment"># 如，range(5, 10)取得的数据是：[5, 6, 7, 8, 9]</span>
<span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># 5</span>
<span class="token comment"># 6</span>
<span class="token comment"># 7</span>
<span class="token comment"># 8</span>
<span class="token comment"># 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>语法三: range(num1, num2, step)</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 获得一个从num1开始，到num2结束的数字序列（不含num2本身）</span>
<span class="token comment"># 数字之间的步长，以step为准（step默认为1）</span>
<span class="token comment"># 如，range(5, 10, 2)取得的数据是：[5, 7, 9]</span>
<span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># 5</span>
<span class="token comment"># 7</span>
<span class="token comment"># 9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="三-循环中断" tabindex="-1"><a class="header-anchor" href="#三-循环中断" aria-hidden="true">#</a> 三.循环中断</h3><h4 id="_1-continue关键字" tabindex="-1"><a class="header-anchor" href="#_1-continue关键字" aria-hidden="true">#</a> (1) continue关键字</h4><blockquote><p>临时跳过: 暂时跳过本次循环，直接进行下一次</p></blockquote><ul><li>中断本次循环，直接进入下一次循环</li><li>可用于for循环和while循环，效果一致</li><li>在嵌套循环中只对所在层循环生效</li><li>使用示例:</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> num <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span> <span class="token comment"># 当num=3时跳过后面语句，进行下次循环</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># 0</span>
<span class="token comment"># 1</span>
<span class="token comment"># 2</span>
<span class="token comment"># 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-break关键字" tabindex="-1"><a class="header-anchor" href="#_2-break关键字" aria-hidden="true">#</a> (2) break关键字</h4><blockquote><p>直接结束: 提前退出循环，不再继续</p></blockquote><ul><li>直接结束所在循环</li><li>可以用for循环和while循环，效果一致</li><li>在嵌套循环中只对所在层循环生效</li><li>使用示例:</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> num <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span> <span class="token comment"># 当num=3时提前退出循环，不再继续</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
<span class="token comment"># 输出</span>
<span class="token comment"># 0</span>
<span class="token comment"># 1</span>
<span class="token comment"># 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四-全文概览" tabindex="-1"><a class="header-anchor" href="#四-全文概览" aria-hidden="true">#</a> 四.全文概览</h3><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/ff98f95ef03402dc4b775b0300932937.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,37);function v(b,h){const a=l("ExternalLinkIcon");return t(),o("div",null,[d,s("blockquote",null,[s("p",null,[s("a",r,[n("python学习"),e(a)]),n("之旅（三） 学习汇总入口"),s("a",u,[n("【Python】学习汇总(3万字+思维导图)"),e(a)]),n(" 笔记PDF下载："),s("a",m,[n("知识笔记：python循环语句（三）"),e(a)]),n(" 文末附带全文概览思维导图 写作不易，如果您觉得写的不错，欢迎给博主来一波点赞、收藏~让博主更有动力吧！")])]),k])}const f=i(c,[["render",v],["__file","03.循环语句.html.vue"]]);export{f as default};
