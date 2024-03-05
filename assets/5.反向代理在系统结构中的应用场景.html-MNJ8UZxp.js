import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as l,c,a as n,b as s,d as e,e as p}from"./app-db_OQQsY.js";const o={},d=n("br",null,null,-1),r={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),u={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},v=p(`<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#_5">反向代理在系统结构中的应用场景</a></li><li><ul><li><a href="#Nginx_29">Nginx的反向代理配置</a></li><li><a href="#_39">基于反向代理的负载均衡器</a></li><li><ul><li><a href="#101102_349">将101代理到102</a></li><li><a href="#101_406">配置101的负载均衡（轮询模式）</a></li><li><a href="#101_475">配置101的负载均衡（权重模式）</a></li><li><a href="#_538">其他负载均衡策略（不常用）</a></li></ul></li></ul></li></ul></li></ul><h2 id="反向代理在系统结构中的应用场景" tabindex="-1"><a class="header-anchor" href="#反向代理在系统结构中的应用场景" aria-hidden="true">#</a> 反向代理在系统结构中的应用场景</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/2c4bf89af40ccce29bec18a69d9c3e11.png" alt="image-20220430170948611" tabindex="0" loading="lazy"><figcaption>image-20220430170948611</figcaption></figure><p>反向代理方式是指以代理服务器来接受Internet上的连接请求，然后将请求转发给内部网络上的服务器；并将从服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器。</p><p>反向代理服务器通常有两种模型，一种是作为内容服务器的替身，另一种作为内容服务器集群的负载均衡器。</p><ul><li>作内容服务器的替身</li></ul><p>如果您的内容服务器具有必须保持安全的敏感信息，如信用卡号数据库，可在防火墙外部设置一个代理服务器作为内容服务器的替身。当外部客户机尝试访问内容服务器时，会将其送到代理服务器。实际内容位于内容服务器上，在防火墙内部受到安全保护。代理服务器位于防火墙外部，在客户机看来就像是内容服务器。</p><p>当客户机向站点提出请求时，请求将转到代理服务器。然后，代理服务器通过防火墙中的特定通路，将客户机的请求发送到内容服务器。内容服务器再通过该通道将结果回传给代理服务器。代理服务器将检索到的信息发送给客户机，好像代理服务器就是实际的内容服务器。如果内容服务器返回错误消息，代理服务器会先行截取该消息并更改标头中列出的任何 URL，然后再将消息发送给客户机。如此可防止外部客户机获取内部内容服务器的重定向 URL。</p><p>这样，代理服务器就在安全数据库和可能的恶意攻击之间提供了又一道屏障。与有权访问整个数据库的情况相对比，就算是侥幸攻击成功，作恶者充其量也仅限于访问单个事务中所涉及的信息。未经授权的用户无法访问到真正的内容服务器，因为防火墙通路只允许代理服务器有权进行访问。</p><ul><li>作为内容服务器的负载均衡器</li></ul><p>可以在一个组织内使用多个代理服务器来平衡各 Web 服务器间的网络负载。在此模型中，可以利用代理服务器的高速缓存特性，创建一个用于负载平衡的服务器池。此时，代理服务器可以位于防火墙的任意一侧。如果 Web 服务器每天都会接收大量的请求，则可以使用代理服务器分担 Web 服务器的负载并提高网络访问效率。</p><p>对于客户机发往真正服务器的请求，代理服务器起着中间调停者的作用。代理服务器会将所请求的文档存入高速缓存。如果有不止一个代理服务器，DNS 可以采用“轮询法”选择其 IP 地址，随机地为请求选择路由。客户机每次都使用同一个 URL，但请求所采取的路由每次都可能经过不同的代理服务器。</p><p>可以使用多个代理服务器来处理对一个高用量内容服务器的请求，这样做的好处是内容服务器可以处理更高的负载，并且比其独自工作时更有效率。在初始启动期间，代理服务器首次从内容服务器检索文档，此后，对内容服务器的请求数会大大下降。</p><h3 id="nginx的反向代理配置" tabindex="-1"><a class="header-anchor" href="#nginx的反向代理配置" aria-hidden="true">#</a> Nginx的反向代理配置</h3><p>配置如下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/5f7011630051c26dceabac426398d8da.png" alt="image-20220430182343864" tabindex="0" loading="lazy"><figcaption>image-20220430182343864</figcaption></figure><p>访问http://test80.xzj520520.cn/：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/17f7eb20fab9e8b13b197761a52a3f26.png" alt="image-20220430182313784" tabindex="0" loading="lazy"><figcaption>image-20220430182313784</figcaption></figure><h3 id="基于反向代理的负载均衡器" tabindex="-1"><a class="header-anchor" href="#基于反向代理的负载均衡器" aria-hidden="true">#</a> 基于反向代理的负载均衡器</h3><p>克隆两个centos，ip分别设为192.168.8.102，192.168.8.103（网段要用自己的电脑对应）</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ee071c0b85cc9e477fda83cd1b8816c5.png" alt="image-20220430184102076" tabindex="0" loading="lazy"><figcaption>image-20220430184102076</figcaption></figure><p>修改静态ip</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/5a6583de9e03b8b09e25c986ef014fc2.png" alt="image-20220430184135760" tabindex="0" loading="lazy"><figcaption>image-20220430184135760</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ea3bdc4d593bb79f5f5b5ae2cc1d8e6a.png" alt="image-20220430184225267" tabindex="0" loading="lazy"><figcaption>image-20220430184225267</figcaption></figure><p>重启网络服务：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/45e242f2f8e53f37e9e44b3604fb1bb2.png" alt="image-20220430184320760" tabindex="0" loading="lazy"><figcaption>image-20220430184320760</figcaption></figure><p>另一个虚拟机的配置也是一样。配置好虚拟机之后,配置nginx.cfg</p><p>102的nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment">#user  nobody;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>


<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#keepalive_timeout  0;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect server error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>


    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       8000;</span>
    <span class="token comment">#    listen       somename:8080;</span>
    <span class="token comment">#    server_name  somename  alias  another.alias;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>


    <span class="token comment"># HTTPS server</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       443 ssl;</span>
    <span class="token comment">#    server_name  localhost;</span>

    <span class="token comment">#    ssl_certificate      cert.pem;</span>
    <span class="token comment">#    ssl_certificate_key  cert.key;</span>

    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="token comment">#    ssl_session_timeout  5m;</span>

    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>102的nginx在html目录下的index.html文件</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Welcome to nginx!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">html</span> <span class="token punctuation">{</span> <span class="token property">color-scheme</span><span class="token punctuation">:</span> light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">body</span> <span class="token punctuation">{</span> <span class="token property">width</span><span class="token punctuation">:</span> 35em<span class="token punctuation">;</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
<span class="token property">font-family</span><span class="token punctuation">:</span> Tahoma<span class="token punctuation">,</span> Verdana<span class="token punctuation">,</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>I am from 192.168.8.102<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>103的nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment">#user  nobody;</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>


<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#keepalive_timeout  0;</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>

    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect server error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>


    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       8000;</span>
    <span class="token comment">#    listen       somename:8080;</span>
    <span class="token comment">#    server_name  somename  alias  another.alias;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>


    <span class="token comment"># HTTPS server</span>
    <span class="token comment">#</span>
    <span class="token comment">#server {</span>
    <span class="token comment">#    listen       443 ssl;</span>
    <span class="token comment">#    server_name  localhost;</span>

    <span class="token comment">#    ssl_certificate      cert.pem;</span>
    <span class="token comment">#    ssl_certificate_key  cert.key;</span>
    <span class="token comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="token comment">#    ssl_session_timeout  5m;</span>

    <span class="token comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="token comment">#    ssl_prefer_server_ciphers  on;</span>

    <span class="token comment">#    location / {</span>
    <span class="token comment">#        root   html;</span>
    <span class="token comment">#        index  index.html index.htm;</span>
    <span class="token comment">#    }</span>
    <span class="token comment">#}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>103的nginx在html目录下的index.html文件</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>Welcome to nginx!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">html</span> <span class="token punctuation">{</span> <span class="token property">color-scheme</span><span class="token punctuation">:</span> light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token selector">body</span> <span class="token punctuation">{</span> <span class="token property">width</span><span class="token punctuation">:</span> 35em<span class="token punctuation">;</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
<span class="token property">font-family</span><span class="token punctuation">:</span> Tahoma<span class="token punctuation">,</span> Verdana<span class="token punctuation">,</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">&gt;</span></span>I am from 192.168.8.103<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><p>访问http://192.168.8.102/</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/168f9640c8971952719fcc11ed8b921f.png" alt="image-20220430185446556" tabindex="0" loading="lazy"><figcaption>image-20220430185446556</figcaption></figure><p>访问http://192.168.8.103/</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/dfdd9aa50c590abf87c1f17c3bd92611.png" alt="image-20220430185502170" tabindex="0" loading="lazy"><figcaption>image-20220430185502170</figcaption></figure><h4 id="将101代理到102" tabindex="-1"><a class="header-anchor" href="#将101代理到102" aria-hidden="true">#</a> 将101代理到102</h4><p>101的nginx.conf</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

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

 <span class="token comment">#虚拟主机的配置</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#监听端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment">#域名，可以有多个，用空格隔开</span>
        <span class="token directive"><span class="token keyword">server_name</span>  test80.xzj520520.cn</span><span class="token punctuation">;</span>

	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://192.168.8.102</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，访问192.168.8.101</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/1b7a5b0afded2ba14961e1bbd6d28828.png" alt="image-20220430185930024" tabindex="0" loading="lazy"><figcaption>image-20220430185930024</figcaption></figure><h4 id="配置101的负载均衡-轮询模式" tabindex="-1"><a class="header-anchor" href="#配置101的负载均衡-轮询模式" aria-hidden="true">#</a> 配置101的负载均衡（轮询模式）</h4><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/666d5e0ed07a7351ace225743985ce38.png" alt="image-20220430190409638" tabindex="0" loading="lazy"><figcaption>image-20220430190409638</figcaption></figure><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

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
    <span class="token directive"><span class="token keyword">server</span> 192.168.8.102:80</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server</span> 192.168.8.103:80</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><p>多次访问http://192.168.8.101/发现102和103被交替访问</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/15c36a0e7c5383365cb15f4c40655406.png" alt="image-20220430190456271" tabindex="0" loading="lazy"><figcaption>image-20220430190456271</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/16d364f3c00253cb69b7f9616cdc97c3.png" alt="image-20220430190504857" tabindex="0" loading="lazy"><figcaption>image-20220430190504857</figcaption></figure><h4 id="配置101的负载均衡-权重模式" tabindex="-1"><a class="header-anchor" href="#配置101的负载均衡-权重模式" aria-hidden="true">#</a> 配置101的负载均衡（权重模式）</h4><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

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
    <span class="token comment"># server 192.168.8.102 weight=10 down; #down表示不参与负载均衡</span>
    <span class="token comment"># server 192.168.8.102 weight=10 backup; #backup表示是备用服务器，没有服务器可用的时候使用</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><p>多次访问http://192.168.8.101/发现102访问的次数多余103访问的次数。</p><h4 id="其他负载均衡策略-不常用" tabindex="-1"><a class="header-anchor" href="#其他负载均衡策略-不常用" aria-hidden="true">#</a> 其他负载均衡策略（不常用）</h4><ul><li>ip_hash</li></ul><p>根据客户端的ip地址转发同一台服务器，可以保持会话，但是很少用这种方式去保持会话，例如我们当前正在使用wifi访问，当切换成手机信号访问时，会话就不保持了。</p><ul><li>least_conn</li></ul><p>最少连接访问，优先访问连接最少的那一台服务器，这种方式也很少使用，因为连接少，可能是由于该服务器配置较低，刚开始赋予的权重较低。</p><ul><li>url_hash（需要第三方插件）</li></ul><p>根据用户访问的url定向转发请求，不同的url转发到不同的服务器进行处理（定向流量转发）。</p><ul><li>fair（需要第三方插件）</li></ul><p>根据后端服务器响应时间转发请求，这种方式也很少使用，因为容易造成流量倾斜，给某一台服务器压垮。</p>`,66);function k(b,g){const a=t("ExternalLinkIcon");return l(),c("div",null,[n("blockquote",null,[n("p",null,[s("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),d,s(" 📫专栏地址:"),n("a",r,[s("Nginx"),e(a)]),m,s(" 📫相关软件:"),n("a",u,[s("链接地址"),e(a)])])]),v])}const _=i(o,[["render",k],["__file","5.反向代理在系统结构中的应用场景.html.vue"]]);export{_ as default};
