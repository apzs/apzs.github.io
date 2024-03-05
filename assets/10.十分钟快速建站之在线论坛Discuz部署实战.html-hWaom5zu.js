import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as t,c,a as n,b as s,d as e,e as l}from"./app-db_OQQsY.js";const o={},r=n("br",null,null,-1),d={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},u=n("br",null,null,-1),k={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},v=l(`<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><ul><li><a href="#_9">使用宝塔面板进行环境安装</a></li><li><a href="#oneinstack_289">使用oneinstack对集成环境进行安装</a></li><li><a href="#nginxcfgreturnproxy_passrewrite_305">nginx.cfg配置补充值return,proxy_pass以及rewrite比较</a></li></ul></li></ul></li></ul><p>部属完成的效果图：<br><img src="https://gitlab.com/apzs/image/-/raw/master/image/c7b7d3001dca4f6fb1463e4daeaea156.png" alt="在这里插入图片描述" loading="lazy"></p><h3 id="使用宝塔面板进行环境安装" tabindex="-1"><a class="header-anchor" href="#使用宝塔面板进行环境安装" aria-hidden="true">#</a> 使用宝塔面板进行环境安装</h3><p>本例采用宝塔版进行实战，相应环境如下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a3672cef8b6cdfb789c57a40764ffea6.png" alt="image-20220502231844011" tabindex="0" loading="lazy"><figcaption>image-20220502231844011</figcaption></figure><p>宝塔的nginx.cfg如下：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  www www</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_processes</span> auto</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  /www/wwwlogs/nginx_error.log  crit</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">pid</span>        /www/server/nginx/logs/nginx.pid</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_rlimit_nofile</span> <span class="token number">51200</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">events</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">51200</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">http</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
		<span class="token comment">#include luawaf.conf;</span>

		<span class="token directive"><span class="token keyword">include</span> proxy.conf</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_names_hash_bucket_size</span> <span class="token number">512</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">large_client_header_buffers</span> <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">50m</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">sendfile</span>   <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">tcp_nopush</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">60</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">tcp_nodelay</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">fastcgi_connect_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_send_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_read_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_buffer_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_buffers</span> <span class="token number">4</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_busy_buffers_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_temp_file_write_size</span> <span class="token number">256k</span></span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">fastcgi_intercept_errors</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_min_length</span>  <span class="token number">1k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_buffers</span>     <span class="token number">4</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">2</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_types</span>     text/plain application/javascript application/x-javascript text/javascript text/css application/xml</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_proxied</span>   expired no-cache no-store private auth</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_disable</span>   <span class="token string">&quot;MSIE [1-6]\\.&quot;</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">limit_conn_zone</span> <span class="token variable">$binary_remote_addr</span> zone=perip:10m</span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">limit_conn_zone</span> <span class="token variable">$server_name</span> zone=perserver:10m</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">server</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">888</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span> phpmyadmin</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm index.php</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span>  /www/server/phpmyadmin</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">location</span> ~ /tmp/</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token comment">#error_page   404   /404.html;</span>
        <span class="token directive"><span class="token keyword">include</span> enable-php.conf</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(js|css)?$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">12h</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ /\\.</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">access_log</span>  /www/wwwlogs/access.log</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">include</span> /www/server/panel/vhost/nginx/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到888端口监听的是php项目，将php项目上传至如下位置：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c904b86be47d7bc7f54004d949844746.png" alt="image-20220502225756993" tabindex="0" loading="lazy"><figcaption>image-20220502225756993</figcaption></figure><p>访问 http://192.168.8.129:888/upload/install</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/683516a26cf12a4c616663e65bed1823.png" alt="image-20220502230009299" tabindex="0" loading="lazy"><figcaption>image-20220502230009299</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/86f9a22d7e091d9d16d1793208e09e23.png" alt="image-20220502230042037" tabindex="0" loading="lazy"><figcaption>image-20220502230042037</figcaption></figure><p>出现这种情况，由于是演示，所以将upload目录的权限改成可读可写，生产环境千万不能这么做。</p><pre><code>chmod -R 777 upload/
</code></pre><p>刷新页面，出现如下页面：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c6b0c885ff9c3771d6f9fa3d8f75e0aa.png" alt="image-20220502230839216" tabindex="0" loading="lazy"><figcaption>image-20220502230839216</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/22b9d441b0d17aad357c8fb999d2e5b5.png" alt="image-20220502230902228" tabindex="0" loading="lazy"><figcaption>image-20220502230902228</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/6c656b768c3615dd4ad5ef3a490c8797.png" alt="image-20220502230958539" tabindex="0" loading="lazy"><figcaption>image-20220502230958539</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/df721a61a7ffabd3002e39a61b4fec59.png" alt="image-20220502231059150" tabindex="0" loading="lazy"><figcaption>image-20220502231059150</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ad5b67ba578e52b3c6c106a454c6581b.png" alt="image-20220502231109994" tabindex="0" loading="lazy"><figcaption>image-20220502231109994</figcaption></figure><p>使用ip访问：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4c7e82a8ee28c22cc48ef746f3e6cf1f.png" alt="image-20220502231650912" tabindex="0" loading="lazy"><figcaption>image-20220502231650912</figcaption></figure><p>使用域名访问：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/dd078413dc06b930da1c9678fc6e91e0.png" alt="image-20220502231717687" tabindex="0" loading="lazy"><figcaption>image-20220502231717687</figcaption></figure><p>如果不想跳转，可以在443端口下直接配置php访问路径，详细nginx.conf如下:</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  www www</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_processes</span> auto</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">error_log</span>  /www/wwwlogs/nginx_error.log  crit</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">pid</span>        /www/server/nginx/logs/nginx.pid</span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">worker_rlimit_nofile</span> <span class="token number">51200</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">events</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">51200</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">http</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
		<span class="token comment">#include luawaf.conf;</span>

		<span class="token directive"><span class="token keyword">include</span> proxy.conf</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_names_hash_bucket_size</span> <span class="token number">512</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">large_client_header_buffers</span> <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">50m</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">sendfile</span>   <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">tcp_nopush</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">keepalive_timeout</span> <span class="token number">60</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">tcp_nodelay</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">fastcgi_connect_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_send_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_read_timeout</span> <span class="token number">300</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_buffer_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_buffers</span> <span class="token number">4</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_busy_buffers_size</span> <span class="token number">128k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">fastcgi_temp_file_write_size</span> <span class="token number">256k</span></span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">fastcgi_intercept_errors</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_min_length</span>  <span class="token number">1k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_buffers</span>     <span class="token number">4</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.1</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">2</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_types</span>     text/plain application/javascript application/x-javascript text/javascript text/css application/xml</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_proxied</span>   expired no-cache no-store private auth</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">gzip_disable</span>   <span class="token string">&quot;MSIE [1-6]\\.&quot;</span></span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">limit_conn_zone</span> <span class="token variable">$binary_remote_addr</span> zone=perip:10m</span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">limit_conn_zone</span> <span class="token variable">$server_name</span> zone=perserver:10m</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">access_log</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>  
	<span class="token directive"><span class="token keyword">ssl_certificate</span> 7706851_www.xzj520520.cn.pem</span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">ssl_certificate_key</span> 7706851_www.xzj520520.cn.key</span><span class="token punctuation">;</span>
	
	<span class="token directive"><span class="token keyword">index</span> index.html index.htm index.php</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span>  /www/server/phpmyadmin/upload</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">location</span> ~ /tmp/</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token comment">#error_page   404   /404.html;</span>
        <span class="token directive"><span class="token keyword">include</span> enable-php.conf</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(js|css)?$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">12h</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ /\\.</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">access_log</span>  /www/wwwlogs/access.log</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">server_name</span> www.xzj520520.cn xzj520520.cn</span><span class="token punctuation">;</span> 

	<span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>	
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span>
    <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span> <span class="token number">888</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span> phpmyadmin</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">index</span> index.html index.htm index.php</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">root</span>  /www/server/phpmyadmin</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">location</span> ~ /tmp/</span> <span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token comment">#error_page   404   /404.html;</span>
        <span class="token directive"><span class="token keyword">include</span> enable-php.conf</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">30d</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ .*\\.(js|css)?$</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">expires</span>      <span class="token number">12h</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">location</span> ~ /\\.</span>
        <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">deny</span> all</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">access_log</span>  /www/wwwlogs/access.log</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">include</span> /www/server/panel/vhost/nginx/*.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问:xzj520520.cn,结果如下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/b463707c11a914d233b389bf8bb6a6ac.png" alt="image-20220503095601725" tabindex="0" loading="lazy"><figcaption>image-20220503095601725</figcaption></figure><h3 id="使用oneinstack对集成环境进行安装" tabindex="-1"><a class="header-anchor" href="#使用oneinstack对集成环境进行安装" aria-hidden="true">#</a> 使用oneinstack对集成环境进行安装</h3><p>这里也可以用oneinstack代替宝塔面板对集成环境（包括nginx，tomcat，phpadmin等）进行安装，操作如下：</p><p>网址: https://oneinstack.com/</p><p>选择自动安装:</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/fddaf82e343e89a8531c02f3cfd147af.png" alt="image-20220502192622670" tabindex="0" loading="lazy"><figcaption>image-20220502192622670</figcaption></figure><p>选择要安装的软件，一个小tip：修改数据库密码，以防止安装好之后不知道数据库的密码是什么，选择好要按照的软件之后复制安装命令，进行安装:</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/0ee2494fd3d860075d91917322f3d537.png" alt="image-20220502192741255" tabindex="0" loading="lazy"><figcaption>image-20220502192741255</figcaption></figure><h3 id="nginx-cfg配置补充值return-proxy-pass以及rewrite比较" tabindex="-1"><a class="header-anchor" href="#nginx-cfg配置补充值return-proxy-pass以及rewrite比较" aria-hidden="true">#</a> nginx.cfg配置补充值return,proxy_pass以及rewrite比较</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
 	<span class="token directive"><span class="token keyword">server_name</span> www.xzj520520.cn xzj520520.cn</span><span class="token punctuation">;</span> 
	
	<span class="token comment">#1. 重定向,如果值没有匹配则会默认使用第一个server_name,在这里为的值为 www.xzj520520.cn，例：</span>
	 	 <span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>	
 	<span class="token comment">#      return 301 http://$server_name:888/upload$request_uri;	</span>
	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token comment"># 2.使用proxy_pass </span>
            <span class="token comment"># 2.1 使用ip(因为这种方式不能传递uri，所以只能通过80访问server_name中存在的域名，否则会出错)（不常用）</span>
            <span class="token comment"># proxy_pass http://192.168.8.129:888//upload;</span>
            <span class="token comment"># 2.2 使用域名，这种方式可以传递uri</span>
             <span class="token directive"><span class="token keyword">proxy_pass</span> https:///www.xzj520520.cn</span><span class="token punctuation">;</span>
            <span class="token comment">#3.使用rewrite 这种方式可以对传递的参数进行隐藏，会在proxy_pass地址上添加rewrite的内容，如3.1的两行，如果访问xzj52052.cn/admin.php会访问到http://192.168.8.129:888/admin.php，可以传递uri</span>
            <span class="token comment"># 3.1 使用ip</span>
            <span class="token comment"># rewrite ^/[\\D|\\d]*$ /upload/$1 break;</span>
            <span class="token comment"># proxy_pass http://192.168.8.129:888;</span>
            <span class="token comment"># 3.2 使用域名</span>
            <span class="token comment"># rewrite ^/[\\D|\\d]*$ /$1 break;</span>
            <span class="token comment"># proxy_pass https://www.xzj520520.cn;</span>
        <span class="token punctuation">}</span>

	...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38);function m(b,g){const a=p("ExternalLinkIcon");return t(),c("div",null,[n("blockquote",null,[n("p",null,[s("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),r,s(" 📫专栏地址:"),n("a",d,[s("Nginx"),e(a)]),u,s(" 📫相关软件:"),n("a",k,[s("链接地址"),e(a)])])]),v])}const y=i(o,[["render",m],["__file","10.十分钟快速建站之在线论坛Discuz部署实战.html.vue"]]);export{y as default};
