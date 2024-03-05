import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as c,o,c as l,a,b as n,d as s,e as i}from"./app-db_OQQsY.js";const p={},r=a("br",null,null,-1),d={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},u=a("br",null,null,-1),m={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},g=i('<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#_5">动静分离</a></li><li><ul><li><a href="#_9">动静分离原理</a></li><li><a href="#Nginx_15">Nginx动静分离配置</a></li><li><a href="#_144">使用正则配置动静分离</a></li></ul></li><li><a href="#URLRewrite_271">URLRewrite</a></li><li><ul><li><a href="#URLRewrite_279">URLRewrite的优缺点</a></li><li><a href="#_285">实例</a></li></ul></li><li><a href="#URLRewrite_304">负载均衡+URLRewrite实战</a></li></ul></li></ul><h2 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h2>',3),v={href:"https://so.csdn.net/so/search?q=Jboss&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},b=i('<h3 id="动静分离原理" tabindex="-1"><a class="header-anchor" href="#动静分离原理" aria-hidden="true">#</a> 动静分离原理</h3><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/format,png.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>动静分离可通过location对请求url进行匹配，将网站静态资源（HTML，JavaScript，CSS，img等文件）与后台应用分开部署，提高用户访问静态代码的速度，降低对后台应用访问。通常将静态资源放到nginx中，动态资源转发到tomcat服务器中。</p><h3 id="nginx动静分离配置" tabindex="-1"><a class="header-anchor" href="#nginx动静分离配置" aria-hidden="true">#</a> Nginx动静分离配置</h3><p>首先使用宝塔面板安装tomcat：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/cb82df6639110eb6f6c0941ab3de59c6.png" alt="image-20220430212617823" tabindex="0" loading="lazy"><figcaption>image-20220430212617823</figcaption></figure><p>安装成功访问http://192.168.8.101:8080/：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c2e06fde63ad193803bbcadb13d78918.png" alt="image-20220430212714827" tabindex="0" loading="lazy"><figcaption>image-20220430212714827</figcaption></figure><p>将charts-project.zip解压并放入如下位置，charts-project.zip下载地址：https://pan.baidu.com/s/1baD910BQD1DGdwdMmK0qTg?pwd=aaaa</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/7432660e3c4dfeeb9e2c6b9df0c61ee9.png" alt="image-20220430215000509" tabindex="0" loading="lazy"><figcaption>image-20220430215000509</figcaption></figure><p>访问http://192.168.8.101:8080/：<br><img src="https://gitlab.com/apzs/image/-/raw/master/image/95fbbf4cd867423fbe72f06a502af47f.png" alt="在这里插入图片描述" loading="lazy"></p>',11),k={href:"https://so.csdn.net/so/search?q=%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},f=i(`<ul><li>nginx.cfg</li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>



<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>


    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>


    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>


        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://192.168.8.101:8080</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问http://192.168.8.102</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/0b39c63aaa3ba0649eed106ec6e0fb3e.png" alt="image-20220430215807592" tabindex="0" loading="lazy"><figcaption>image-20220430215807592</figcaption></figure><p>将images文件夹删除：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/fc8a074a43282fb9324775b7d3330676.png" alt="image-20220430220315636" tabindex="0" loading="lazy"><figcaption>image-20220430220315636</figcaption></figure><p>访问http://192.168.8.102/，发现图片访问不到了：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/756dfc79f089f2036dbfe3f4af6932e7.png" alt="image-20220430220336407" tabindex="0" loading="lazy"><figcaption>image-20220430220336407</figcaption></figure><p>接下来将静态资源配置到代理服务器102：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/1cbf743fcdae199194fb85a1ff069cce.png" alt="image-20220501095635683" tabindex="0" loading="lazy"><figcaption>image-20220501095635683</figcaption></figure><p>配置102的nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment">#user  nobody;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>



<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>


    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://192.168.8.101:8080</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token directive"><span class="token keyword">location</span> /images</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   /www/resources</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问192.168.8.102，发现图片又出现了：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4ef9a6ed31f05d04850b1f56d4a4e53f.png" alt="image-20220501095945318" tabindex="0" loading="lazy"><figcaption>image-20220501095945318</figcaption></figure><h3 id="使用正则配置动静分离" tabindex="-1"><a class="header-anchor" href="#使用正则配置动静分离" aria-hidden="true">#</a> 使用正则配置动静分离</h3><p>常见的Nginx正则表达式</p><pre><code>^ ：匹配输入字符串的起始位置
$ ：匹配输入字符串的结束位置
* ：匹配前面的字符零次或多次。如“ol*”能匹配“o”及“ol”、“oll”
+ ：匹配前面的字符一次或多次。如“ol+”能匹配“ol”及“oll”、“olll”，但不能匹配“o”
? ：匹配前面的字符零次或一次，例如“do(es)?”能匹配“do”或者“does”，”?”等效于”{0,1}”
. ：匹配除“\\n”之外的任何单个字符，若要匹配包括“\\n”在内的任意字符，请使用诸如“[.\\n]”之类的模式
\\ ：将后面接着的字符标记为一个特殊字符或一个原义字符或一个向后引用。如“\\n”匹配一个换行符，而“\\$”则匹配“$”
\\d ：匹配纯数字
{n} ：重复 n 次
{n,} ：重复 n 次或更多次
{n,m} ：重复 n 到 m 次
[] ：定义匹配的字符范围
[c] ：匹配单个字符 c
[a-z] ：匹配 a-z 小写字母的任意一个
[a-zA-Z0-9] ：匹配所有大小写字母或数字
() ：表达式的开始和结束位置
| ：或运算符  //例(js|img|css)
</code></pre><p>location正则：</p><pre><code>//location大致可以分为三类
精准匹配：location = /{}
一般匹配：location /{}
正则匹配：location ~/{}
//location常用的匹配规则：
= ：进行普通字符精确匹配，也就是完全匹配。
^~ ：表示前缀字符串匹配（不是正则匹配，需要使用字符串），如果匹配成功，则不再匹配其它 location。
~ ：区分大小写的匹配（需要使用正则表达式）。
~* ：不区分大小写的匹配（需要使用正则表达式）。
!~ ：区分大小写的匹配取非（需要使用正则表达式）。
!~* ：不区分大小写的匹配取非（需要使用正则表达式）。
//优先级
首先精确匹配 =
其次前缀匹配 ^~
其次是按文件中顺序的正则匹配 ~或~*
然后匹配不带任何修饰的前缀匹配
最后是交给 / 通用匹配
</code></pre><p><strong>注意：</strong></p><ul><li>精确匹配： <code>=</code> ， 后面的表达式中写的是纯字符串</li><li>字符串匹配： <code>^~</code> 和 <code>无符号匹配</code> ， 后面的表达式中写的是纯字符串</li><li>正则匹配： <code>~</code> 和 <code>~*</code> 和 <code>!~</code> 和 <code>!~*</code> ， 后面的表达式中写的是正则表达式</li></ul><p>location的说明</p><pre><code> (1）location = / {}
=为精确匹配 / ，主机名后面不能带任何字符串，比如访问 / 和 /data，则 / 匹配，/data 不匹配
再比如 location = /abc，则只匹配/abc ，/abc/或 /abcd不匹配。若 location  /abc，则即匹配/abc 、/abcd/ 同时也匹配 /abc/。

（2）location / {}
因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求 比如访问 / 和 /data, 则 / 匹配， /data 也匹配，
但若后面是正则表达式会和最长字符串优先匹配（最长匹配）

（3）location /documents/ {}
匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索其它 location
只有其它 location后面的正则表达式没有匹配到时，才会采用这一条

（4）location /documents/abc {}
匹配任何以 /documents/abc 开头的地址，匹配符合以后，还要继续往下搜索其它 location
只有其它 location后面的正则表达式没有匹配到时，才会采用这一条

（5）location ^~ /images/ {}
匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条

（6）location ~* \\.(gif|jpg|jpeg)$ {}
匹配所有以 gif、jpg或jpeg 结尾的请求
然而，所有请求 /images/ 下的图片会被 location ^~ /images/ 处理，因为 ^~ 的优先级更高，所以到达不了这一条正则

（7）location /images/abc {}
最长字符匹配到 /images/abc，优先级最低，继续往下搜索其它 location，会发现 ^~ 和 ~ 存在

（8）location ~ /images/abc {}
匹配以/images/abc 开头的，优先级次之，只有去掉 location ^~ /images/ 才会采用这一条

（9）location /images/abc/1.html {}
匹配/images/abc/1.html 文件，如果和正则 ~ /images/abc/1.html 相比，正则优先级更高

优先级总结：
(location =) &gt; (location 完整路径) &gt; (location ^~ 路径) &gt; (location ~,~* 正则顺序) &gt; (location 部分起始路径) &gt; (location /)
</code></pre><p>实际网站使用中，至少有三个匹配规则定义:</p><ul><li>第一个必选规则</li></ul><p>直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，比如说官网。这里是直接转发给后端应用服务器了，也可以是一个静态首页</p><pre><code>location = / {
    proxy_pass http://127.0.0.1:8080/; 
}
</code></pre><ul><li>第二个必选规则</li></ul><p>处理静态文件请求，这是nginx作为http服务器的强项,有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用</p><pre><code>location ^~ /static/ {
    root /webroot/static/;
}

location ~* \\.(html|gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}
</code></pre><ul><li>第三个规则</li></ul><p>通用规则，用来转发动态请求到后端应用服务器</p><pre><code>location /api/ {
    proxy_pass http://127.0.0.1:3000/api/
}
</code></pre><h2 id="urlrewrite" tabindex="-1"><a class="header-anchor" href="#urlrewrite" aria-hidden="true">#</a> URLRewrite</h2><p>rewrite是实现URL重写的关键指令，根据regex(正则表达式)部分内容，重定向到repacement，结尾是flag标记。</p><p>格式：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/7406887eafac182366bca590e6c96978.png" alt="image-20220501143255652" tabindex="0" loading="lazy"><figcaption>image-20220501143255652</figcaption></figure><h3 id="urlrewrite的优缺点" tabindex="-1"><a class="header-anchor" href="#urlrewrite的优缺点" aria-hidden="true">#</a> URLRewrite的优缺点</h3><p>优点：掩藏真实的url以及url中可能暴露的参数，以及隐藏web使用的编程语言，提高安全性便于搜索引擎收录</p>`,39),h={href:"https://so.csdn.net/so/search?q=%E5%86%85%E7%BD%91&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},w=i(`<h3 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h3><p>配置nginx.cfg</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/79b2a9235f275c3256ad70e72be12f65.png" alt="image-20220501142335578" tabindex="0" loading="lazy"><figcaption>image-20220501142335578</figcaption></figure><p>代码：</p><pre><code>rewrite ^/test.html$ /index.html?testParam=3 break;

//也可以用正则表达式的形式：
rewrite ^/[0-9]+.html$ /index.html?testParam=$1 break; //$1表示第一个匹配的字符串 
</code></pre><p>测试，访问http://192.168.8.102/test.html</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/81e417634c629544b033074e14b84456.png" alt="image-20220501142146334" tabindex="0" loading="lazy"><figcaption>image-20220501142146334</figcaption></figure><h2 id="负载均衡-urlrewrite实战" tabindex="-1"><a class="header-anchor" href="#负载均衡-urlrewrite实战" aria-hidden="true">#</a> 负载均衡+URLRewrite实战</h2><p>开启101的防火墙</p><pre><code>systemctl start firewalld
</code></pre><p>重载规则</p><pre><code>firewall-cmd --reload
</code></pre><p>查看已配置规则</p><pre><code>firewall-cmd --list-all
</code></pre><p>添加指定端口和ip访问(添加之后记得重新启动防火墙)</p><pre><code>firewall-cmd --permanent --add-rich-rule=&quot;rule family=&quot;ipv4&quot; source address=&quot;192.168.8.102&quot; port protocol=&quot;tcp&quot; port=&quot;8080&quot; accept&quot;
</code></pre><p>移除规则</p><pre><code>firewall-cmd --permanent --remove-rich-rule=&quot;rule family=&quot;ipv4&quot; source address=&quot;192.168.8.102&quot; port protocol=&quot;tcp&quot; port=&quot;8080&quot; accept&quot;
</code></pre><p>重启防火墙</p><pre><code>firewall-cmd --reload
</code></pre><p>测试：</p><p>直接访问：http://192.168.8.101:8080/</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/67fe2ed21e4891f5f3decdf326c653ec.png" alt="image-20220501152145009" tabindex="0" loading="lazy"><figcaption>image-20220501152145009</figcaption></figure><p>访问：http://192.168.8.102:8888/test.html</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/9a9871231609d19d7795ed5bd9c22d6e.png" alt="image-20220501152209744" tabindex="0" loading="lazy"><figcaption>image-20220501152209744</figcaption></figure><p>使用负载均衡的方式访问：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/7111ce547d00a75f16ef2692c82fc791.png" alt="image-20220501152643444" tabindex="0" loading="lazy"><figcaption>image-20220501152643444</figcaption></figure><p>测试，访问http://192.168.8.102/test.html</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/e7ef574de8b43f5bc252b147f1fe9111.png" alt="image-20220501152825327" tabindex="0" loading="lazy"><figcaption>image-20220501152825327</figcaption></figure>`,29);function _(x,y){const e=c("ExternalLinkIcon");return o(),l("div",null,[a("blockquote",null,[a("p",null,[n("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),r,n(" 📫专栏地址:"),a("a",d,[n("Nginx"),s(e)]),u,n(" 📫相关软件:"),a("a",m,[n("链接地址"),s(e)])])]),g,a("p",null,[n("为了提高网站的响应速度，减轻程序服务器（Tomcat，"),a("a",v,[n("Jboss"),s(e)]),n("等）的负载，对于静态资源，如图片、js、css等文件，可以在反向代理服务器中进行缓存，这样浏览器在请求一个静态资源时，代理服务器就可以直接处理，而不用将请求转发给后端服务器。对于用户请求的动态文件，如servlet、jsp，则转发给Tomcat，Jboss服务器处理，这就是动静分离。即动态文件与静态文件的分离。")]),b,a("p",null,[n("配置102的"),a("a",k,[n("反向代理"),s(e)]),n("：")]),f,a("p",null,[n("缺点：降低效率，影响性能。如果项目是"),a("a",h,[n("内网"),s(e)]),n("使用，比如公司内部软件，则没有必要配置。")]),w])}const R=t(p,[["render",_],["__file","6.nginx动静分离及Rewrite实战.html.vue"]]);export{R as default};
