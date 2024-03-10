import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as p,c,a as s,b as n,d as e,e as i}from"./app-ldxHvpH7.js";const o={},r=s("br",null,null,-1),d={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},u=s("br",null,null,-1),v={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},k=i(`<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#_5">防盗链</a></li><li><ul><li><a href="#nginx_9">nginx防盗链配置</a></li><li><ul><li><a href="#valid_referers_222">valid_referers解释</a></li></ul></li><li><a href="#curl_270">使用curl测试</a></li><li><a href="#_282">配置错误提示页面</a></li><li><ul><li><a href="#_284">返回错误页面</a></li><li><a href="#_378">返回出错图片</a></li></ul></li></ul></li></ul></li></ul><h2 id="防盗链" tabindex="-1"><a class="header-anchor" href="#防盗链" aria-hidden="true">#</a> 防盗链</h2><p>盗链是指服务提供商自己不提供服务的内容，通过技术手段绕过其它有利益的最终用户界面（如广告），直接在自己的网站上向最终用户提供其它服务提供商的服务内容，骗取最终用户的浏览和点击率。受益者不提供资源或提供很少的资源，而真正的服务提供商却得不到任何的收益。</p><h3 id="nginx防盗链配置" tabindex="-1"><a class="header-anchor" href="#nginx防盗链配置" aria-hidden="true">#</a> nginx防盗链配置</h3><p>为了模拟盗链，在这里让101为服务站点，102为网关服务器，103访问102进行盗链。</p><p>101的nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#单个进程最大连接数（最大连接数=连接数*进程数）</span>
    <span class="token comment">#根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#文件扩展名与文件类型映射表(是conf目录下的一个文件)</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token comment">#默认文件类型，如果mime.types预先定义的类型没匹配上，默认使用二进制流的方式传输</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token comment">#sendfile指令指定nginx是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度。</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    
     <span class="token comment">#长连接超时时间，单位是秒</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

<span class="token comment">#定义一组服务器</span>
<span class="token directive"><span class="token keyword">upstream</span> httpds</span><span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.8.102 weight=10</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.8.103 weight=1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

 <span class="token comment">#虚拟主机的配置</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#监听端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment">#域名，可以有多个，用空格隔开</span>
        <span class="token directive"><span class="token keyword">server_name</span>  test80.xzj520520.cn</span><span class="token punctuation">;</span>

	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://httpds</span><span class="token punctuation">;</span>
            <span class="token comment"># root   /www/test80;</span>
            <span class="token comment"># index  index.html index.htm;</span>
        <span class="token punctuation">}</span>

	<span class="token comment">#出错页面配置</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token comment">#/50x.html文件所在位置</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>102的nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>



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
        
        
        <span class="token directive"><span class="token keyword">location</span> ^~/images/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   /www/resources</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
       
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>103的nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>



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
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://192.168.8.102</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
         
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问http://192.168.8.103</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/8876edae0402f056f5d8da41b7ea301e.png" alt="image-20220501163618594" tabindex="0" loading="lazy"><figcaption>image-20220501163618594</figcaption></figure><p>如果不想被盗链，可以对网关服务器102做如下配置：</p><p>nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>



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
        
        
        
        <span class="token directive"><span class="token keyword">location</span> ^~/images/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">valid_referers</span> 192.168.8.102</span><span class="token punctuation">;</span>  <span class="token comment">#valid_referers 指令，配置是否允许 referer 头部以及允许哪些 referer 访问。192.168.8.102不是ip而是域名（去掉http:// 前缀）</span>
            <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span> <span class="token punctuation">{</span>  <span class="token comment"># 注意这里if后要加空格</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span> <span class="token comment">## 返回错误码</span>
            <span class="token punctuation">}</span>
            
            <span class="token directive"><span class="token keyword">root</span>   /www/resources</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/bdd6d5484ef37b22deeb50db49413fac.png" alt="image-20220501170655802" tabindex="0" loading="lazy"><figcaption>image-20220501170655802</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/83d69c148f7bf62dd725409dac7efff6.png" alt="image-20220501170754065" tabindex="0" loading="lazy"><figcaption>image-20220501170754065</figcaption></figure><p>测试，访问http://192.168.8.103</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/d7b654c33e02267bc59f6c766e99582d.png" alt="image-20220501173200034" tabindex="0" loading="lazy"><figcaption>image-20220501173200034</figcaption></figure><h4 id="valid-referers解释" tabindex="-1"><a class="header-anchor" href="#valid-referers解释" aria-hidden="true">#</a> valid_referers解释</h4><p>可以同时携带多个参数，表示多个 referer 头部都生效。</p><p><strong>参数值</strong></p><ul><li>none：允许没有 referer 信息的请求访问，即直接通过url访问。</li><li>blocked：请求头Referer字段不为空（即存在Referer），但是值可以为空（值被代理或者防火墙删除了），并且允许refer不以“http://”或“https://”开头，通俗点说就是允许“http://”或&quot;https//&quot;以外的请求。</li><li>server_names：若 referer 中站点域名与 server_name 中本机域名某个匹配，则允许该请求访问</li><li>其他字符串类型：检测referer与字符串是否匹配，如果匹配则允许访问，可以采用通配符*</li><li>正则表达式：若 referer 的值匹配上了正则，就允许访问</li></ul><p><strong>invalid_referer 变量</strong></p><ul><li>允许访问时变量值为空</li><li>不允许访问时变量值为 1</li></ul><p>例</p><pre><code>server {
    server_name referer.test.com;
    listen 80;

    error_log logs/myerror.log debug;
    root html;
    location / {
        valid_referers none server_names
                       *.test.com www.test.org.cn/nginx/;
        if ($invalid_referer) {
                return 403; # 返回错误码
        }
        return 200 &#39;valid\\n&#39;;
    }
}

# none：表示没有 referer 的可以访问
# server_names：表示本机 server_name 也就是 referer.test.com 可以访问
# *.test.com：匹配上了正则的可以访问
# www.test.org.cn/nginx/：该页面发起的请求可以访问
</code></pre><p>设置为none的情况：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/5814d5313305e3a88fc4f3733ea45574.png" alt="image-20220501174036398" tabindex="0" loading="lazy"><figcaption>image-20220501174036398</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/cb4607cd33727c18f389c5dbc0556079.png" alt="image-20220501174009132" tabindex="0" loading="lazy"><figcaption>image-20220501174009132</figcaption></figure><h3 id="使用curl测试" tabindex="-1"><a class="header-anchor" href="#使用curl测试" aria-hidden="true">#</a> 使用curl测试</h3><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/04aea1c179923b679318f0788bb06811.png" alt="image-20220501175110561" tabindex="0" loading="lazy"><figcaption>image-20220501175110561</figcaption></figure><p>从baidu访问过来的请求：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/9dd486930253786ca1b0d7881cc8ea20.png" alt="image-20220501175433326" tabindex="0" loading="lazy"><figcaption>image-20220501175433326</figcaption></figure><p>如果添加了baidu.com，发现访问成功：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/f17d141c8c636e3470d2ae5c3254e94f.png" alt="image-20220501175824843" tabindex="0" loading="lazy"><figcaption>image-20220501175824843</figcaption></figure><h3 id="配置错误提示页面" tabindex="-1"><a class="header-anchor" href="#配置错误提示页面" aria-hidden="true">#</a> 配置错误提示页面</h3><h4 id="返回错误页面" tabindex="-1"><a class="header-anchor" href="#返回错误页面" aria-hidden="true">#</a> 返回错误页面</h4>`,40),m={href:"https://so.csdn.net/so/search?q=403&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},b=i(`<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;title&gt;Error&lt;/title&gt;
&lt;style&gt;
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;An error occurred.&lt;/h1&gt;
&lt;p&gt;非法请求.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;
</code></pre><p>修改nginx.conf</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/178ce88b287406fb64c0d236ed598da2.png" alt="image-20220501180853897" tabindex="0" loading="lazy"><figcaption>image-20220501180853897</figcaption></figure><p>代码如下:</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>



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
        
        
        <span class="token directive"><span class="token keyword">location</span> ^~/images/</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">valid_referers</span> 192.168.8.102 baidu.com</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span> <span class="token comment"># 返回错误码</span>
            <span class="token punctuation">}</span>
            
            <span class="token directive"><span class="token keyword">root</span>   /www/resources</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">403</span>  /403.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /403.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问http://192.168.8.103/images/bg.jpg</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a5980a6a934456b8ab3fc7810f9fdf7a.png" alt="image-20220501180531243" tabindex="0" loading="lazy"><figcaption>image-20220501180531243</figcaption></figure><h4 id="返回出错图片" tabindex="-1"><a class="header-anchor" href="#返回出错图片" aria-hidden="true">#</a> 返回出错图片</h4><p>修改网关服务器102</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/12399be39ef7bd88b9d162bc440df75a.png" alt="image-20220501181602775" tabindex="0" loading="lazy"><figcaption>image-20220501181602775</figcaption></figure><p>将403.png保存到/www/resources/images中</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/b4ed53ef3e4a4b3807dbfefb075a1f97.png" alt="image-20220501182639312" tabindex="0" loading="lazy"><figcaption>image-20220501182639312</figcaption></figure><p>访问192.168.8.103:</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/5f738a013a45900950b6bef735f2281e.png" alt="image-20220501182707030" tabindex="0" loading="lazy"><figcaption>image-20220501182707030</figcaption></figure>`,14);function g(f,h){const a=l("ExternalLinkIcon");return p(),c("div",null,[s("blockquote",null,[s("p",null,[n("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),r,n(" 📫专栏地址:"),s("a",d,[n("Nginx"),e(a)]),u,n(" 📫相关软件:"),s("a",v,[n("链接地址"),e(a)])])]),k,s("p",null,[n("在102nginx的html目录中添加"),s("a",m,[n("403"),e(a)]),n(".html")]),b])}const _=t(o,[["render",g],["__file","8.Nginx配置防盗链(详细了解如何配置nginx防盗链).html.vue"]]);export{_ as default};
