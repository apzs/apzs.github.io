import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as c,c as t,a as s,b as n,d as e,e as o}from"./app-db_OQQsY.js";const p={},d={href:"https://so.csdn.net/so/search?q=Nginx&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},m=s("br",null,null,-1),r={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},v=s("br",null,null,-1),u={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},k=o(`<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#Nginx_5">Nginx目录结构</a></li><li><a href="#Nginx_70">Nginx基本运行原理</a></li><li><a href="#Nginx_76">Nginx的基本配置文件</a></li></ul></li></ul><h2 id="nginx目录结构" tabindex="-1"><a class="header-anchor" href="#nginx目录结构" aria-hidden="true">#</a> Nginx目录结构</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4a778a190221c045365d48b1c5a454b2.png" alt="image-20220429195500124" tabindex="0" loading="lazy"><figcaption>image-20220429195500124</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># tree /usr/local/nginx</span>
/usr/local/nginx
├── client_body_temp                 <span class="token comment"># POST 大文件暂存目录</span>
├── conf                             <span class="token comment"># Nginx所有配置文件的目录</span>
│   ├── fastcgi.conf                 <span class="token comment"># fastcgi相关参数的配置文件</span>
│   ├── fastcgi.conf.default         <span class="token comment"># fastcgi.conf的原始备份文件</span>
│   ├── fastcgi_params               <span class="token comment"># fastcgi的参数文件</span>
│   ├── fastcgi_params.default       
│   ├── koi-utf
│   ├── koi-win
│   ├── mime.types                   <span class="token comment"># 媒体类型</span>
│   ├── mime.types.default
│   ├── nginx.conf                   <span class="token comment">#这是Nginx默认的主配置文件，日常使用和修改的文件</span>
│   ├── nginx.conf.default
│   ├── scgi_params                  <span class="token comment"># scgi相关参数文件</span>
│   ├── scgi_params.default  
│   ├── uwsgi_params                 <span class="token comment"># uwsgi相关参数文件</span>
│   ├── uwsgi_params.default
│   └── win-utf
├── fastcgi_temp                     <span class="token comment"># fastcgi临时数据目录</span>
├── html                             <span class="token comment"># Nginx默认站点目录</span>
│   ├── 50x.html                     <span class="token comment"># 错误页面优雅替代显示文件，例如出现502错误时会调用此页面</span>
│   └── index.html                   <span class="token comment"># 默认的首页文件</span>
├── logs                             <span class="token comment"># Nginx日志目录</span>
│   ├── access.log                   <span class="token comment"># 访问日志文件</span>
│   ├── error.log                    <span class="token comment"># 错误日志文件</span>
│   └── nginx.pid                    <span class="token comment"># pid文件，Nginx进程启动后，会把所有进程的ID号写到此文件</span>
├── proxy_temp                       <span class="token comment"># 临时目录</span>
├── sbin                             <span class="token comment"># Nginx 可执行文件目录</span>
│   └── nginx                        <span class="token comment"># Nginx 二进制可执行程序</span>
├── scgi_temp                        <span class="token comment"># 临时目录</span>
└── uwsgi_temp                       <span class="token comment"># 临时目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要的目录是conf,html,及sbin。</p><ul><li>conf目录放的是核心配置文件：</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/27af4b92ca67eb0b67bbf799fcedc5b6.png" alt="image-20220429200035684" tabindex="0" loading="lazy"><figcaption>image-20220429200035684</figcaption></figure><ul><li>html目录放的是静态页面：</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a0536acedc8bd3bf6160a01cd0f88f92.png" alt="image-20220429200014255" tabindex="0" loading="lazy"><figcaption>image-20220429200014255</figcaption></figure><p>50x.html是发生错误展示的页面，index.html是默认的访问页面。可以在该目录下新建html，然后在浏览器中访问，例如在该目录下新建hello.html，内容是hello，然后访问：http://192.168.8.101/hello.html，结果如下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/8ef3f32251347e137b0271d853def339.png" alt="image-20220429200252678" tabindex="0" loading="lazy"><figcaption>image-20220429200252678</figcaption></figure><ul><li>logs文件夹用于存放日志信息：</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/8be7daeb79647a2c142f5062d4fd72a4.png" alt="image-20220429200510783" tabindex="0" loading="lazy"><figcaption>image-20220429200510783</figcaption></figure><p>error.log存放出错的信息，nginx.pid存放的是当前nginx的pid。</p><ul><li>sbin存放的是可执行文件，可以用 ./nginx启动nginx：</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/99ad10f00dcf3df4925e8e1e41d00ee3.png" alt="image-20220429200833528" tabindex="0" loading="lazy"><figcaption>image-20220429200833528</figcaption></figure><h2 id="nginx基本运行原理" tabindex="-1"><a class="header-anchor" href="#nginx基本运行原理" aria-hidden="true">#</a> Nginx基本运行原理</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/18cb3d8e9aa7d44b2e1e5f3c54231fab.png" alt="image-20220429201217315" tabindex="0" loading="lazy"><figcaption>image-20220429201217315</figcaption></figure><p>Nginx的进程是使用经典的「Master-Worker」模型,Nginx在启动后，会有一个master进程和多个worker进程。master进程主要用来管理worker进程，包含：接收来自外界的信号，向各worker进程发送信号，监控worker进程的运行状态，当worker进程退出后(异常情况下)，会自动重新启动新的worker进程。worker进程主要处理基本的网络事件，多个worker进程之间是对等的，他们同等竞争来自客户端的请求，各进程互相之间是独立的。一个请求，只可能在一个worker进程中处理，一个worker进程，不可能处理其它进程的请求。worker进程的个数是可以设置的，一般会设置与机器cpu核数一致，这里面的原因与nginx的进程模型以及事件处理模型是分不开的。</p><h2 id="nginx的基本配置文件" tabindex="-1"><a class="header-anchor" href="#nginx的基本配置文件" aria-hidden="true">#</a> Nginx的基本配置文件</h2><p>Nginx的默认配置文件是nginx.conf</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/9587854b59d7ba64ca9a09eaaef0f53c.png" alt="image-20220429202028274" tabindex="0" loading="lazy"><figcaption>image-20220429202028274</figcaption></figure><p>刚安装好的nginx.conf如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token comment">#user  nobody;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去掉注释的简单版如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

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
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

	<span class="token comment">#出错页面配置</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token comment">#/50x.html文件所在位置</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27);function b(g,h){const a=l("ExternalLinkIcon");return c(),t("div",null,[s("blockquote",null,[s("p",null,[n("🌱本专栏将会从基础开始，循序渐进讲解"),s("a",d,[n("Nginx"),e(a)]),n("的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),m,n(" 📫专栏地址:"),s("a",r,[n("Nginx"),e(a)]),v,n(" 📫相关软件:"),s("a",u,[n("链接地址"),e(a)])])]),k])}const x=i(p,[["render",b],["__file","2.Nginx的的目录结构_基本运行原理及基本配置文件.html.vue"]]);export{x as default};
