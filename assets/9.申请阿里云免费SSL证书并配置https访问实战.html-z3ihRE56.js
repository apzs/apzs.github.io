import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as p,c,a as n,b as s,d as e,e as l}from"./app-db_OQQsY.js";const o={},r=n("br",null,null,-1),d={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},u=n("br",null,null,-1),k={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},v=l(`<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#https_5">使用阿里云配置https</a></li><li><ul><li><a href="#_76">实战</a></li></ul></li></ul></li></ul><h2 id="使用阿里云配置https" tabindex="-1"><a class="header-anchor" href="#使用阿里云配置https" aria-hidden="true">#</a> 使用阿里云配置https</h2><p>阿里云免费证书购买在如下位置：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/75623dc67cb36f649da95b78a7f74f99.png" alt="image-20220502180114579" tabindex="0" loading="lazy"><figcaption>image-20220502180114579</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/bd00fb70abe129333354572c660fb670.png" alt="image-20220502180214498" tabindex="0" loading="lazy"><figcaption>image-20220502180214498</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/2c71e7a6c02cabfde45431ed5a55ab77.png" alt="image-20220502180253209" tabindex="0" loading="lazy"><figcaption>image-20220502180253209</figcaption></figure><p>购买完成后在如下位置创建证书并申请证书：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4fbf13f6e0e98049133f5d77a2f1400c.png" alt="image-20220502180721249" tabindex="0" loading="lazy"><figcaption>image-20220502180721249</figcaption></figure><p>填写验证信息</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/cf354daaeb3d26dffd0ec61949124689.png" alt="image-20220502180746873" tabindex="0" loading="lazy"><figcaption>image-20220502180746873</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a0ebc865297fab463b6614082bfecbfb.png" alt="image-20220502180905706" tabindex="0" loading="lazy"><figcaption>image-20220502180905706</figcaption></figure><p>DNS对应的记录在如下页面：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/6001a15ab5c5306a07fc66f0cb553a0c.png" alt="image-20220502185442580" tabindex="0" loading="lazy"><figcaption>image-20220502185442580</figcaption></figure><p>证书签发后，选择下载：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/916f5f7fd55308cd17034fc78b01f213.png" alt="image-20220502185524886" tabindex="0" loading="lazy"><figcaption>image-20220502185524886</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/303201c7b58e2977a24a0e7982935a9e.png" alt="image-20220502185354484" tabindex="0" loading="lazy"><figcaption>image-20220502185354484</figcaption></figure><p>下载后的文件如图所示：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/46f5beab54d365cf6b2187c80eb607ae.png" alt="image-20220502185627427" tabindex="0" loading="lazy"><figcaption>image-20220502185627427</figcaption></figure><p>接下来需要将这两个文件上传到nginx目录下的conf目录下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/3c3b6a8a0d6cbdbfda5f446295d280b5.png" alt="image-20220502185843137" tabindex="0" loading="lazy"><figcaption>image-20220502185843137</figcaption></figure><p>nginx配置证书：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>  <span class="token comment"># 接收所有访问443端口的请求</span>
	<span class="token directive"><span class="token keyword">ssl_certificate</span> 7706851_www.xzj520520.cn.pem</span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">ssl_certificate_key</span> 7706851_www.xzj520520.cn.key</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完之后，重启nginx:</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>systemctl restart nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>由于http协议默认的端口是80，而https默认的端口是443，如果想让http的访问跳转到https的访问，可以做如下配置：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>

	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">server_name</span> www.xzj520520.cn xzj520520.cn</span><span class="token punctuation">;</span> <span class="token comment"># 换成自己的域名</span>
	...

	<span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>	

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，已经完成https的配置。</p><h3 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h3><p>配置nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">user</span>  www www</span><span class="token punctuation">;</span>
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
	
	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm index.php</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

	<span class="token comment">#出错页面配置</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token comment">#/50x.html文件所在位置</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
<span class="token comment"># 	server_name localhost www.xzj520520.cn xzj520520.cn; </span>
  <span class="token directive"><span class="token keyword">server_name</span> www.xzj520520.cn xzj520520.cn</span><span class="token punctuation">;</span>

	<span class="token comment"># 重定向，会显示跳转的地址server_name,如果访问的地址没有匹配会默认使用第一个，即www.xzj520520.cn</span>
	<span class="token directive"><span class="token keyword">return</span> <span class="token number">301</span> https://<span class="token variable">$server_name</span><span class="token variable">$request_uri</span></span><span class="token punctuation">;</span>	
<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问http://xzj520520.cn, 发现自动变成https访问：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/debc77dd0c49471f9e9a2673179a2768.png" alt="image-20220503091752269" tabindex="0" loading="lazy"><figcaption>image-20220503091752269</figcaption></figure><p>访问https://a.xzj520520.cn,显示安全提示页面:</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/2b5395b8525d0e8d2b4cb517da2c3680.png" alt="image-20220503091912018" tabindex="0" loading="lazy"><figcaption>image-20220503091912018</figcaption></figure>`,35);function m(b,g){const a=t("ExternalLinkIcon");return p(),c("div",null,[n("blockquote",null,[n("p",null,[s("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),r,s(" 📫专栏地址:"),n("a",d,[s("Nginx"),e(a)]),u,s(" 📫相关软件:"),n("a",k,[s("链接地址"),e(a)])])]),v])}const w=i(o,[["render",m],["__file","9.申请阿里云免费SSL证书并配置https访问实战.html.vue"]]);export{w as default};
