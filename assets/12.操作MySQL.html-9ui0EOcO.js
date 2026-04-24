import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as p,c,a as s,b as n,d as e,e as i}from"./app-uyb0nfWQ.js";const l={},u=s("h1",{id:"python操作mysql-十一",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#python操作mysql-十一","aria-hidden":"true"},"#"),n(" Python操作MySQL(十一)")],-1),r={href:"https://so.csdn.net/so/search?q=python%E5%AD%A6%E4%B9%A0&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},d={href:"https://blog.csdn.net/m0_66570338/article/details/128714062",target:"_blank",rel:"noopener noreferrer"},m={href:"https://download.csdn.net/download/m0_66570338/90058661",target:"_blank",rel:"noopener noreferrer"},v={href:"https://blog.csdn.net/m0_66570338/article/details/132036532",target:"_blank",rel:"noopener noreferrer"},k=i(`<h3 id="一-安装第三方库" tabindex="-1"><a class="header-anchor" href="#一-安装第三方库" aria-hidden="true">#</a> 一.安装第三方库</h3><blockquote><p>在Python中，通过使用第三方库:pymysql,完成对MySQL数据库的操作。</p></blockquote><ul><li>安装指令:</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pip install pymysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h3 id="二-在python中使用" tabindex="-1"><a class="header-anchor" href="#二-在python中使用" aria-hidden="true">#</a> 二.在Python中使用</h3><h4 id="_1-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-基本使用" aria-hidden="true">#</a> (1) 基本使用</h4><ul><li>导包-》建立连接-》进行xx操作-》关闭连接：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 1.导入操作包</span>
<span class="token keyword">from</span> pymysql <span class="token keyword">import</span> Connection

<span class="token comment"># 2.获取到MySQL数据库的连接对象</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># 主机名或IP地址</span>
    port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>  <span class="token comment"># 端口号，默认3306</span>
    user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL账号</span>
    password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span>  <span class="token comment"># MySQL密码</span>
<span class="token punctuation">)</span>

<span class="token comment"># 打印MySQL版本信息</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>conn<span class="token punctuation">.</span>get_server_info<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 3.关闭到数据库的连接</span>
conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-执行建表sql" tabindex="-1"><a class="header-anchor" href="#_2-执行建表sql" aria-hidden="true">#</a> (2) 执行建表SQL</h4><ul><li>导包-》建立连接-》获取游标对象-》选择数据库-》执行相应sql-》关闭连接：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pymysql <span class="token keyword">import</span> Connection

<span class="token comment"># 获取到MySQL数据库的连接对象</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># 主机名或IP地址</span>
    port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>  <span class="token comment"># 端口号，默认3306</span>
    user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL账号</span>
    password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span>  <span class="token comment"># MySQL密码</span>
<span class="token punctuation">)</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
执行非查询性质SQL
&quot;&quot;&quot;</span>
<span class="token comment"># 获取游标对象(用于操作数据库)</span>
cursor <span class="token operator">=</span> conn<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 选择要操作的数据库</span>
conn<span class="token punctuation">.</span>select_db<span class="token punctuation">(</span><span class="token string">&quot;db1&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 使用游标对象，执行建表sql语句</span>
cursor<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token string">&quot;CREATE TABLE tb_user(id INT,name VARCHAR(8),age int)&quot;</span><span class="token punctuation">)</span>

<span class="token comment"># 关闭到数据库的连接</span>
conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-执行查询sql" tabindex="-1"><a class="header-anchor" href="#_3-执行查询sql" aria-hidden="true">#</a> (3) 执行查询SQL</h4><ul><li>导包-》建立连接-》获取游标对象-》选择数据库-》执行相应sql-》获取查询数据，执行xx操作-》关闭连接：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pymysql <span class="token keyword">import</span> Connection

<span class="token comment"># 获取到MySQL数据库的连接对象</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># 主机名或IP地址</span>
    port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>  <span class="token comment"># 端口号，默认3306</span>
    user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL账号</span>
    password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span>  <span class="token comment"># MySQL密码</span>
<span class="token punctuation">)</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
执行查询性质SQL
&quot;&quot;&quot;</span>
<span class="token comment"># 获取游标对象(用于操作数据库)</span>
cursor <span class="token operator">=</span> conn<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 选择要操作的数据库</span>
conn<span class="token punctuation">.</span>select_db<span class="token punctuation">(</span><span class="token string">&quot;db1&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 使用游标对象，执行sql语句</span>
cursor<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token string">&quot;SELECT * FROM tb_user&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 获取查询结果，返回元组对象</span>
results<span class="token punctuation">:</span> <span class="token builtin">tuple</span> <span class="token operator">=</span> cursor<span class="token punctuation">.</span>fetchall<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> result <span class="token keyword">in</span> results<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token comment"># 关闭到数据库的连接</span>
conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-执行插入sql" tabindex="-1"><a class="header-anchor" href="#_4-执行插入sql" aria-hidden="true">#</a> (4) 执行插入SQL</h4><ul><li>导包-》建立连接-》获取游标对象-》选择数据库-》执行相应sql-》提交行为-》关闭连接：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pymysql <span class="token keyword">import</span> Connection

<span class="token comment"># 获取到MySQL数据库的连接对象</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># 主机名或IP地址</span>
    port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>  <span class="token comment"># 端口号，默认3306</span>
    user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL账号</span>
    password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL密码</span>
    autocommit<span class="token operator">=</span><span class="token boolean">True</span>  <span class="token comment"># 设置自动提交(commit)</span>
<span class="token punctuation">)</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
执行插入SQL
&quot;&quot;&quot;</span>
<span class="token comment"># 获取游标对象(用于操作数据库)</span>
cursor <span class="token operator">=</span> conn<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 选择要操作的数据库</span>
conn<span class="token punctuation">.</span>select_db<span class="token punctuation">(</span><span class="token string">&quot;db1&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 使用游标对象，执行sql语句</span>
cursor<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token string">&quot;Insert into tb_user values(1,&#39;hhy&#39;,&#39;250&#39;)&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 确认插入行为</span>
<span class="token comment"># 如果在获取连接对象时设置自动提交可以不用再写。</span>
conn<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 关闭到数据库的连接</span>
conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-执行修改sql" tabindex="-1"><a class="header-anchor" href="#_5-执行修改sql" aria-hidden="true">#</a> (5) 执行修改SQL</h4><ul><li>导包-》建立连接-》获取游标对象-》选择数据库-》执行相应sql-》提交行为-》关闭连接：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pymysql <span class="token keyword">import</span> Connection

<span class="token comment"># 获取到MySQL数据库的连接对象</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># 主机名或IP地址</span>
    port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>  <span class="token comment"># 端口号，默认3306</span>
    user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL账号</span>
    password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL密码</span>
    autocommit<span class="token operator">=</span><span class="token boolean">True</span>  <span class="token comment"># 设置自动提交(commit)</span>
<span class="token punctuation">)</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
执行修改SQL
&quot;&quot;&quot;</span>
<span class="token comment"># 获取游标对象(用于操作数据库)</span>
cursor <span class="token operator">=</span> conn<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 选择要操作的数据库</span>
conn<span class="token punctuation">.</span>select_db<span class="token punctuation">(</span><span class="token string">&quot;db1&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 使用游标对象，执行sql语句</span>
cursor<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token string">&quot;UPDATE tb_user set username=&#39;hhy&#39; where username = &#39;fsp&#39;&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 确认修改行为</span>
<span class="token comment"># 如果在获取连接对象时设置自动提交可以不用再写。</span>
conn<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 关闭到数据库的连接</span>
conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-执行删除sql" tabindex="-1"><a class="header-anchor" href="#_6-执行删除sql" aria-hidden="true">#</a> (6) 执行删除SQL</h4><ul><li>导包-》建立连接-》获取游标对象-》选择数据库-》执行相应sql-》提交行为-》关闭连接：</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pymysql <span class="token keyword">import</span> Connection

<span class="token comment"># 获取到MySQL数据库的连接对象</span>
conn <span class="token operator">=</span> Connection<span class="token punctuation">(</span>
    host<span class="token operator">=</span><span class="token string">&#39;localhost&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># 主机名或IP地址</span>
    port<span class="token operator">=</span><span class="token number">3306</span><span class="token punctuation">,</span>  <span class="token comment"># 端口号，默认3306</span>
    user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL账号</span>
    password<span class="token operator">=</span><span class="token string">&#39;root&#39;</span><span class="token punctuation">,</span>  <span class="token comment"># MySQL密码</span>
    autocommit<span class="token operator">=</span><span class="token boolean">True</span>  <span class="token comment"># 设置自动提交(commit)</span>
<span class="token punctuation">)</span>


<span class="token triple-quoted-string string">&quot;&quot;&quot;
执行删除SQL
&quot;&quot;&quot;</span>
<span class="token comment"># 获取游标对象(用于操作数据库)</span>
cursor <span class="token operator">=</span> conn<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 选择要操作的数据库</span>
conn<span class="token punctuation">.</span>select_db<span class="token punctuation">(</span><span class="token string">&quot;db1&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 使用游标对象，执行sql语句</span>
cursor<span class="token punctuation">.</span>execute<span class="token punctuation">(</span><span class="token string">&quot;DELETE from tb_user WHERE username = &#39;hhy&#39;&quot;</span><span class="token punctuation">)</span>
<span class="token comment"># 确认删除行为</span>
<span class="token comment"># 如果在获取连接对象时设置自动提交可以不用再写。</span>
conn<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 关闭到数据库的连接</span>
conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-小结" tabindex="-1"><a class="header-anchor" href="#_7-小结" aria-hidden="true">#</a> (7) 小结</h4><ul><li>pymysql在执行数据<code>插入</code>或<code>其它产生数据更改</code>的SQL语句时，默认是<code>需要提交更改</code>的，即，需要通过代码“确认”这种更改行为。</li><li>如果不想手动commit确认，可以在<code>构建连接对象</code>的时候，设置<code>自动commit</code>的属性。</li><li>查询后，使用<code>游标对象.fetchall()</code>可得到全部的查询结果封装入嵌套元组内</li><li>可使用<code>游标对象.execute()</code>执行SQL语句</li></ul><h3 id="三-全文概览" tabindex="-1"><a class="header-anchor" href="#三-全文概览" aria-hidden="true">#</a> 三.全文概览</h3><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/python/image/b07a4d0dea96c5cfb5438cb1cb6ceef1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>`,28);function b(h,y){const a=o("ExternalLinkIcon");return p(),c("div",null,[u,s("blockquote",null,[s("p",null,[s("a",r,[n("python学习"),e(a)]),n("之旅(十一) 学习汇总入口"),s("a",d,[n("【Python】学习汇总(3万字+思维导图)"),e(a)]),n(" 笔记PDF下载："),s("a",m,[n("知识笔记：Python操作MySQL(十一)"),e(a)]),n(" 文末附带全文概览思维导图 写作不易，如果您觉得写的不错，欢迎给博主来一波点赞、收藏~让博主更有动力吧！ 🚩注：Python操作MySQL并不难，难点是如何编写合适的SQL语句，欢迎大家查看笔记："),s("a",v,[n("【MySQL】学习汇总(完整思维导图)"),e(a)])])]),k])}const _=t(l,[["render",b],["__file","12.操作MySQL.html.vue"]]);export{_ as default};
