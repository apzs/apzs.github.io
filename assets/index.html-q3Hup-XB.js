import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as p,c,a as n,b as s,d as e,e as i}from"./app-ldxHvpH7.js";const o={},r=i('<h1 id="nginx学习" tabindex="-1"><a class="header-anchor" href="#nginx学习" aria-hidden="true">#</a> Nginx学习</h1><h2 id="前提准备" tabindex="-1"><a class="header-anchor" href="#前提准备" aria-hidden="true">#</a> 前提准备</h2><h3 id="虚拟机安装" tabindex="-1"><a class="header-anchor" href="#虚拟机安装" aria-hidden="true">#</a> 虚拟机安装</h3><p>注意：安装虚拟机是为了在本地虚拟化Linux环境，便于学习。对应了实际应用场景中，企业的云服务器</p>',4),d=n("p",null,"本地安装虚拟机Vmware、Virtualbox、Parallls",-1),u={href:"https://macwk.com/soft/vmware-fusion",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,"系统CentOS 7.4",-1),v={href:"https://www.centos.org/download/",target:"_blank",rel:"noopener noreferrer"},g=n("figure",null,[n("img",{src:"https://gitlab.com/apzs/image/-/raw/master/image/image-20220430161537719.png",alt:"image-20220430161537719",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20220430161537719")],-1),k=n("figure",null,[n("img",{src:"https://gitlab.com/apzs/image/-/raw/master/image/image-20220430161625233.png",alt:"image-20220430161625233",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20220430161625233")],-1),b=n("figure",null,[n("img",{src:"https://gitlab.com/apzs/image/-/raw/master/image/image-20220430161855527.png",alt:"image-20220430161855527",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20220430161855527")],-1),h=n("thead",null,[n("tr",null,[n("th",null,"版本"),n("th",null,"说明")])],-1),x=n("tr",null,[n("td",null,"DVD ISO"),n("td",null,"标准安装版")],-1),f=n("td",null,"Everything ISO",-1),w={href:"https://so.csdn.net/so/search?q=centos7&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},y=n("tr",null,[n("td",null,"Minimal ISO"),n("td",null,"精简版，自带的软件最少")],-1),_=n("tr",null,[n("td",null,"NetInstall ISO"),n("td",null,"网络安装镜像(从网络安装或者救援系统)")],-1),z=i('<li><p>使用虚拟机，安装CentOS镜像</p><p>第一步、把镜像安装到Vmware，把下载的镜像拖到Vmware中</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430162755616.png" alt="image-20220430162755616" tabindex="0" loading="lazy"><figcaption>image-20220430162755616</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430163645214.png" alt="image-20220430163645214" tabindex="0" loading="lazy"><figcaption>image-20220430163645214</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430163827694.png" alt="image-20220430163827694" tabindex="0" loading="lazy"><figcaption>image-20220430163827694</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430163914307.png" alt="image-20220430163914307" tabindex="0" loading="lazy"><figcaption>image-20220430163914307</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430163951532.png" alt="image-20220430163951532" tabindex="0" loading="lazy"><figcaption>image-20220430163951532</figcaption></figure><p>第二步、Vmware安装好镜像，进入CentOS系统配置</p><ul><li><p>选择语言</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430164248258.png" alt="image-20220430164248258" tabindex="0" loading="lazy"><figcaption>image-20220430164248258</figcaption></figure></li><li><p>确认系统安装位置</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430164412467.png" alt="image-20220430164412467" tabindex="0" loading="lazy"><figcaption>image-20220430164412467</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430164443903.png" alt="image-20220430164443903" tabindex="0" loading="lazy"><figcaption>image-20220430164443903</figcaption></figure></li><li><p>开始安装，安装过程中设置root密码，安装完成后重启</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430164506588.png" alt="image-20220430164506588" tabindex="0" loading="lazy"><figcaption>image-20220430164506588</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430164600537.png" alt="image-20220430164600537" tabindex="0" loading="lazy"><figcaption>image-20220430164600537</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430165140257.png" alt="image-20220430165140257" tabindex="0" loading="lazy"><figcaption>image-20220430165140257</figcaption></figure></li><li><p>账号root，密码就是上一步设置的密码</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430165302826.png" alt="image-20220430165302826" tabindex="0" loading="lazy"><figcaption>image-20220430165302826</figcaption></figure><p>登陆后</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430165355053.png" alt="image-20220430165355053" tabindex="0" loading="lazy"><figcaption>image-20220430165355053</figcaption></figure></li></ul></li>',1),N=i(`<h3 id="配置虚拟机网络" tabindex="-1"><a class="header-anchor" href="#配置虚拟机网络" aria-hidden="true">#</a> 配置虚拟机网络</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ip</span> addr <span class="token comment">#查看网络</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到两个网卡 <code>lo</code>和<code>ens33</code>（lo是本地网卡）</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430165742369.png" alt="image-20220430165742369" tabindex="0" loading="lazy"><figcaption>image-20220430165742369</figcaption></figure><p>使用vi编辑器打开<code>ens33</code>网络的配置文件，修改启动配置（如何使用vi编辑器：<code>i</code>修模式改数据，<code>esc</code>退出，<code>:wq</code>保存退出vi编辑器）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/sysconfig/network-scripts/ifcfg-ebs33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430170248402.png" alt="image-20220430170248402" tabindex="0" loading="lazy"><figcaption>image-20220430170248402</figcaption></figure><p>重启网络</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl restart network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就能看到ens33被分配在了网络IP（192.168.174.128），但是这个网路是动态分配的内网地址，重启后会一直变化。</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430180620463.png" alt="image-20220430172307651" tabindex="0" loading="lazy"><figcaption>image-20220430172307651</figcaption></figure><h3 id="克隆虚拟机" tabindex="-1"><a class="header-anchor" href="#克隆虚拟机" aria-hidden="true">#</a> 克隆虚拟机</h3><p>打开虚拟机资源库</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430194449067.png" alt="image-20220430194449067" tabindex="0" loading="lazy"><figcaption>image-20220430194449067</figcaption></figure><p>两种克隆方式，选择哪种都可以将前面配置的虚拟机克隆出来新的</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220430194645169.png" alt="image-20220430194645169" tabindex="0" loading="lazy"><figcaption>image-20220430194645169</figcaption></figure><h3 id="使用ssh连接虚拟机" tabindex="-1"><a class="header-anchor" href="#使用ssh连接虚拟机" aria-hidden="true">#</a> 使用SSH连接虚拟机</h3><p>使用SSH可以方便的在本地连接远程云服务器（对应的就是我们这里装在本地的虚拟机），对其进行</p><p>SSH软件很多，比如Xshell，他们的使用都大同小异，我这里使用的是Mac上的Termius，</p><p><strong>新建连接</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220501163148066.png" alt="image-20220501163148066" tabindex="0" loading="lazy"><figcaption>image-20220501163148066</figcaption></figure><p>主机地址就是云服务器的公网地址，对应就是上面本地虚拟机ens33这个网卡的地址，与公网地址不同，这个地址是内网地址，每次重启都会动态分配，所以我们使用这个地址链接上</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220501163422998.png" alt="image-20220501163422998" tabindex="0" loading="lazy"><figcaption>image-20220501163422998</figcaption></figure><p><strong>修改固定IP</strong></p><p>这一步仅仅是因为，ens33这个网卡的地址，每次重启都会动态分配，所以我们使用这个地址每次都需要修改SSH工具的“主机名”，所以，我们改成固定的。（如果你使用的是云服务器，使用公网IP连接，这个公网IP是不会变化的，就不用这一步）</p><p>还是进入ens33网卡的配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/sysconfig/network-scripts/ifcfg-ens33
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>增加一下配置（如果想要理解这些是啥，需要自行了解下计算机网络的基本知识）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.174.120 <span class="token comment"># 设置IP</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">225.225</span>.225.0 <span class="token comment">#子网掩码</span>
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.174.1 <span class="token comment">#网关</span>
<span class="token assign-left variable">DNS1</span><span class="token operator">=</span><span class="token number">8.8</span>.8.8 <span class="token comment"># DNS服务器地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改文件中BOOTPROTO字段为static后，后IP就固定为了IPADDR的值</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span>static <span class="token comment">#原来值是dhcp，就是动态获取ip的一个协议</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nginx介绍" tabindex="-1"><a class="header-anchor" href="#nginx介绍" aria-hidden="true">#</a> Nginx介绍</h2>`,32),q=n("li",null,[n("p",null,"Nginx开源版 http://nginx.org/en/"),n("p",null,"官方原始的Nginx版本")],-1),S=n("li",null,[n("p",null,"Nginx plus商业版"),n("p",null,"开箱即用，集成了大量功能")],-1),P=n("li",null,[n("p",null,"Open Resty https://openresty.org/cn/"),n("p",null,[s("OpenResty是一个基于Nginx与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。"),n("strong",null,"更适用于需要大量二次开发的场景，有极强的扩展性")])],-1),I=n("p",null,"Tengine https://tengine.taobao.org/",-1),E={href:"http://nginx.org/",target:"_blank",rel:"noopener noreferrer"},O={href:"http://www.taobao.com/",target:"_blank",rel:"noopener noreferrer"},T={href:"http://www.tmall.com/",target:"_blank",rel:"noopener noreferrer"},A=n("h2",{id:"nginx安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx安装","aria-hidden":"true"},"#"),s(" Nginx安装")],-1),R=n("p",null,[n("strong",null,"下载Nginx包")],-1),C={href:"http://nginx.org/en/download.html",target:"_blank",rel:"noopener noreferrer"},D=n("figure",null,[n("img",{src:"https://gitlab.com/apzs/image/-/raw/master/image/image-20220501140833867.png",alt:"image-20220501140833867",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20220501140833867")],-1),M=n("p",null,"使用FTP工具将文件上传到虚拟机中",-1),B=n("p",null,"Termius也提供了FTP的功能，直接将下载的Nginx包拖拽到主机目录中，我这里是放到了root目录下",-1),L=n("figure",null,[n("img",{src:"https://gitlab.com/apzs/image/-/raw/master/image/image-20220501163732603.png",alt:"image-20220501163732603",tabindex:"0",loading:"lazy"}),n("figcaption",null,"image-20220501163732603")],-1),V=i(`<li><p>解压Nginx包，并安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-zxvf</span>  nginx-1.21.6.tar.gz <span class="token comment">#解压到当前目录</span>

<span class="token builtin class-name">cd</span> nginx-1.21.6 <span class="token comment">#进入解压后的文件夹</span>
<span class="token function">ls</span> <span class="token comment">#文件夹中的文件：auto     CHANGES.ru  configure  html     man     src CHANGES  conf        contrib    LICENSE  README</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装依赖库</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#安装C编译器</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc

<span class="token comment">#安装pcre库</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> pcre pcre-devel

<span class="token comment">#安装zlib</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> zlib zlib-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr/local/nginx <span class="token comment">#使用prefix选项指定安装的目录</span>
<span class="token function">make</span>
<span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/nginx/sbin

<span class="token function">ls</span> <span class="token comment"># 里面是一个nginx的可执行文件</span>

./nginx <span class="token comment"># 启动这个可执行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关闭防火墙</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>补充Nginx命令</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./nginx <span class="token parameter variable">-s</span> stop <span class="token comment">#快速停止</span>
./nginx <span class="token parameter variable">-s</span> quit <span class="token comment">#完成已接受的请求后，停止</span>
./nginx <span class="token parameter variable">-s</span> reload <span class="token comment">#重新加载配置</span>
./nginx <span class="token parameter variable">-t</span> <span class="token comment">#检查nginx配置是否正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看nginx状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ps -ef|grep nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动时：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220501205303265.png" alt="image-20220501205303265" tabindex="0" loading="lazy"><figcaption>image-20220501205303265</figcaption></figure><p>停止时：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220501205333304.png" alt="image-20220501205333304" tabindex="0" loading="lazy"><figcaption>image-20220501205333304</figcaption></figure></li><li><p>注册系统服务</p><p>通过系统服务的方式启动nginx</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim usr/lib/systemd/system/nginx.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-proteries line-numbers-mode" data-ext="proteries"><pre class="language-proteries"><code>[Unit] 
Description=nginx
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit 
PrivateTmp=true
   
[Install]   
WantedBy=multi-user.target  # 多用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,2),U=i(`<h2 id="nginx代理" tabindex="-1"><a class="header-anchor" href="#nginx代理" aria-hidden="true">#</a> Nginx代理</h2><p><strong>正向代理</strong></p><p>正向代理可以理解为「客户端」的代理</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/20220919121907 .png" alt="image-20220919121907145" tabindex="0" loading="lazy"><figcaption>image-20220919121907145</figcaption></figure><p><strong>反向代理</strong></p><p>反向代理可以理解为「服务器」的代理</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/20220919122008 .png" alt="image-20220919122008649" tabindex="0" loading="lazy"><figcaption>image-20220919122008649</figcaption></figure><h2 id="nginx-目录" tabindex="-1"><a class="header-anchor" href="#nginx-目录" aria-hidden="true">#</a> Nginx 目录</h2><p>Nginx一般安装在<code>/usr/local/nginx</code>目录下（安装时--prefix可指定安装目录）</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/20220919122708 .png" alt="image-20220919122708336" tabindex="0" loading="lazy"><figcaption>image-20220919122708336</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>conf #配置文件
	｜-nginx.conf # 主配置文件
	｜-其他配置文件 # 可通过那个include关键字，引入到了nginx.conf生效
	
html #静态页面

logs
	｜-access.log #访问日志(每次访问都会记录)
	｜-error.log #错误日志
	｜-nginx.pid #进程号
	
sbin
	｜-nginx #主进程文件
	
*_temp #运行时，生成临时文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220502111337135.png" alt="image-20220502111337135" tabindex="0" loading="lazy"><figcaption>image-20220502111337135</figcaption></figure><h2 id="nginx配置" tabindex="-1"><a class="header-anchor" href="#nginx配置" aria-hidden="true">#</a> Nginx配置</h2><p>后面学习Nginx配置，每次修改配置文件，一定要重载才能生效</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl reload nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="简化版的nginx-conf" tabindex="-1"><a class="header-anchor" href="#简化版的nginx-conf" aria-hidden="true">#</a> 简化版的nginx.conf</h3><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment"># 启动的worker进程数</span>

<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span> <span class="token comment">#每个worker进程的连接数</span>
<span class="token punctuation">}</span>


<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span> <span class="token comment">#include是引入关键字，这里引入了mime.types这个配置文件（同在conf目录下，mime.types是用来定义，请求返回的content-type）</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span> <span class="token comment">#mime.types未定义的，使用默认格式application/octet-stream</span>

    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span> <span class="token comment">#数据零拷贝，详见下文</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span> <span class="token comment">#长链接超时时间（保持连接的超时时间）</span>
	
	<span class="token comment">#一个nginx可以启用多个server（虚拟服务器）</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span><span class="token comment">#监听端口80</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>  <span class="token comment">#接收的域名</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span> <span class="token comment">#根目录指向html目录</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span> <span class="token comment">#域名/index 指向 index.html index.htm文件</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span> <span class="token comment"># 服务器错误码为500 502 503 504，转到&quot;域名/50x.html&quot;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span><span class="token comment"># 指定到html文件夹下找/50x.htm</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>sendfile</strong></p><p>sendfile未开启前，用户请求mp4等类型的文件，首先经过操作系统的网络接口，然后操作系统的网络接口将请求转发给nginx；nginx收到请求后，判断需要读哪个文件，找到文件后将文件读取到nginx应用程序的内存中，然后将内存中的文件返回给操作系统的网络接口。</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230317104242941.png" alt="image-20230317104242941" tabindex="0" loading="lazy"><figcaption>image-20230317104242941</figcaption></figure><p>打开sendfile，用户请求的文件不用再加载到nginx的内存中，而是直接告诉网络接口要读取那个文件</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220502113913235.png" alt="image-20220502113913235" tabindex="0" loading="lazy"><figcaption>image-20220502113913235</figcaption></figure><h3 id="nginx配置使用场景" tabindex="-1"><a class="header-anchor" href="#nginx配置使用场景" aria-hidden="true">#</a> Nginx配置使用场景</h3><p>修改nginx配置文件后，记得重新加载nginx</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl reload nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>不同二级域名，映射到不同静态网页</strong></p><p>可以写多个server字段，从前向后匹配，先匹配到哪个就用哪个</p><p>用户访问<code>pro.hedaodao.ltd</code>，就会走到第一个server配置；<code>test.hedaodao.ltd</code>走到第二个配置</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code> <span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
 		<span class="token comment">#....其他属性</span>
 		<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  pro.hedaodao.ltd</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
            <span class="token directive"><span class="token keyword">root</span>   html/pro</span><span class="token punctuation">;</span> 
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

 		<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  test.hedaodao.ltd</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
            <span class="token directive"><span class="token keyword">root</span>   html/test</span><span class="token punctuation">;</span> 
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不同域名，映射到同一静态页面</strong></p><p>server_name</p><ul><li>可以写多个，用空格分开</li><li>使用通配符（*）</li><li>使用正则表达式（https://blog.csdn.net/yangyelin/article/details/112976539）</li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span><span class="token punctuation">{</span> 		
 		<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  *.hedaodao.ltd  ~^[0-9]+\\.hedaodao\\.ltd$</span><span class="token punctuation">;</span> <span class="token comment"># &quot;\\.&quot;是转译&quot;.&quot;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
            <span class="token directive"><span class="token keyword">root</span>   html/test</span><span class="token punctuation">;</span> 
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反向代理与负载均衡" tabindex="-1"><a class="header-anchor" href="#反向代理与负载均衡" aria-hidden="true">#</a> 反向代理与负载均衡</h2><p><strong>反向代理</strong>：这种代理方式叫做，隧道代理。有性能瓶颈，因为所有的数据都经过Nginx，所以Nginx服务器的性能至关重要</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220502173846436.png" alt="image-20220502173846436" tabindex="0" loading="lazy"><figcaption>image-20220502173846436</figcaption></figure><p><strong>负载均衡</strong>：把请求，按照一定算法规则，分配给多台业务服务器（即使其中一个坏了/维护升级，还有其他服务器可以继续提供服务）</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220502174023144.png" alt="image-20220502174023144" tabindex="0" loading="lazy"><figcaption>image-20220502174023144</figcaption></figure><h3 id="反向代理-负载均衡" tabindex="-1"><a class="header-anchor" href="#反向代理-负载均衡" aria-hidden="true">#</a> 反向代理+负载均衡</h3><p><strong>nginx.conf配置文件</strong></p><p>启用proxy_pass，root和index字段就会失效</p><p>proxy_pass后的地址必须写完整 <code>http://xxx</code>，不支持https</p><p>当访问localhost时（Nginx服务器），网页打开的是<code>http://xxx</code>（应用服务器），网页地址栏写的还是localhost</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span><span class="token punctuation">{</span> 		
 		<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
        		<span class="token directive"><span class="token keyword">proxy_pass</span> http://xxx</span><span class="token punctuation">;</span>
            <span class="token comment">#root   html/test; </span>
            <span class="token comment">#index  index.html index.htm;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**定义地址别名 **</p><p>使用upstream定义一组地址【在server字段下】</p><p>访问localhost，访问都会代理到<code>192.168.174.133:80</code>和<code>192.168.174.134:80</code>这两个地址之一，每次访问这两个地址轮着切换（后面讲到，因为默认权重相等）</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">http</span></span><span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">upstream</span> httpds</span><span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">server</span> 192.168.174.133:80</span><span class="token punctuation">;</span> <span class="token comment">#如果是80端口，可以省略不写</span>
		<span class="token directive"><span class="token keyword">server</span> 192.168.174.134:80</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
        		<span class="token directive"><span class="token keyword">proxy_pass</span> http://httpds</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>设置权重</strong></p><p>访问使用哪个地址的权重</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream httpds{
		server 192.168.174.133:80 weight=10;
		server 192.168.174.134:80 weight=80;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关闭</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream httpds{
		server 192.168.174.133:80 weight=10 down;
		server 192.168.174.134:80 weight=80;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>备用机</strong></p><p>如果<code>192.168.174.133:80</code>出现故障，无法提供服务，就用使用backup的这个机器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream httpds{
		server 192.168.174.133:80 weight=10;
		server 192.168.174.134:80 weight=80 backup;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h3><p>当用户请求时，动态请求分配到Tomcat业务服务器，静态资源请求放在Nginx服务器中</p><p>例子：</p><ul><li>如果请求的资源地址是<code>location/</code>，<code>/</code>的优先级比较低，如果下面的location没匹配到，就会走http://xxx这个地址的机器</li><li>如果请求的资源地址是<code>location/css/*</code>，就会被匹配到nginx的html目录下的css文件夹中（我们把css静态资源放在这个位置）</li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
				
				<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> <span class="token comment"># /的优先级比较低，如果下面的location没匹配到，就会走http://xxx这个地址的机器</span>
        		<span class="token directive"><span class="token keyword">proxy_pass</span> http://xxx</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token directive"><span class="token keyword">location</span> /css</span> <span class="token punctuation">{</span>  <span class="token comment"># root指的是html，location/css指的是root下的css，所以地址就是html/css</span>
        		<span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用正则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location ~*/(js|css|img){
	root html;
  index  index.html index.htm;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="url重写" tabindex="-1"><a class="header-anchor" href="#url重写" aria-hidden="true">#</a> URL重写</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>rewrite是URL重写的关键指令，根据regex（正则表达式）部分内容，重定向到replacement，结尼是flag标记。

rewrite    <span class="token operator">&lt;</span>regex<span class="token operator">&gt;</span>   <span class="token operator">&lt;</span>replacement<span class="token operator">&gt;</span>  <span class="token punctuation">[</span>flag<span class="token punctuation">]</span><span class="token punctuation">;</span>
关键字				正则				替代内容     flagt标记

正则：per1森容正则表达式语句进行规则匹配
替代内容：将正则匹配的内容替换成replacement

flag标记说明：
last  <span class="token comment">#本条规则匹配完成后，继续向下匹配新的1ocation URI规则</span>
<span class="token builtin class-name">break</span> <span class="token comment">#本条规则匹配完成即终止，不再匹配后面的任何规则</span>

redirect <span class="token comment">#返回302临重定向，游览器地址会显示跳转后的URL地址</span>
permanent <span class="token comment">#返回301永久重定向，测览器地址栏会显示跳转后的URL地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器地址栏访问 <code>xxx/123.html</code>实际上是访问<code>xxx/index.jsp?pageNum=123</code></p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
				
				<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
						<span class="token directive"><span class="token keyword">rewrite</span> ^/([0-9]+).html$ /index.jsp?pageNum=<span class="token variable">$1</span>  break</span><span class="token punctuation">;</span>
        		<span class="token directive"><span class="token keyword">proxy_pass</span> http://xxx</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      

        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网关服务器" tabindex="-1"><a class="header-anchor" href="#网关服务器" aria-hidden="true">#</a> 网关服务器</h3><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503121135171.png" alt="image-20220503121135171" tabindex="0" loading="lazy"><figcaption>image-20220503121135171</figcaption></figure><p>上图中，应用服务器，不能直接被外网访问到，只能通过Nginx服务器进行访问（使用proxy_pass），这时候这台Nginx服务器就成为了网关服务器（承担入口的功能）</p><p>所以，我们启动应用服务器的防火墙，设置其只能接受这台Nginx服务器的请求</p><p><strong>添加rich规则</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--permanent</span> --add-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.174.135<span class="token string">&quot; port protocol=&quot;</span>tcp<span class="token string">&quot; port=&quot;</span><span class="token number">8080</span><span class="token string">&quot; accept&quot;</span> <span class="token comment">#这里的192.168.174.135是网关 服务器地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>移除rich规则</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--permanent</span> --remove-rich-rule<span class="token operator">=</span><span class="token string">&quot;rule family=&quot;</span>ipv4<span class="token string">&quot; source address=&quot;</span><span class="token number">192.168</span>.174.135<span class="token string">&quot; port port=&quot;</span><span class="token number">8080</span><span class="token string">&quot; protocol=&quot;</span>tcp<span class="token string">&quot; accept&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>重启</strong></p><p>移除和添加规则都要重启才能生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看所有规则</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>firewall-cmd --list-all <span class="token comment">#所有开启的规则</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="防盗链" tabindex="-1"><a class="header-anchor" href="#防盗链" aria-hidden="true">#</a> 防盗链</h2><p>当我们请求到一个页面后，这个页面一般会再去请求其中的静态资源，这时候请求头中，会有一个refer字段，表示当前这个请求的来源，我们可以限制指定来源的请求才返回，否则就不返回，这样可以节省资源</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503162830153.png" alt="image-20220503162830153" tabindex="0" loading="lazy"><figcaption>image-20220503162830153</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>valid_referers none<span class="token operator">|</span>server_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置有效的refer值</p><ul><li>none：检测地址没有refer，则有效</li><li>server_name：检测主机地址，refer显示是从这个地址来的，则有效（server_name必须是完整的<code>http://xxxx</code>）</li></ul><p>注意：<code>if ($invalid_referer)</code>中if后有个空格，不写就会报错</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>nginx: <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> unknown directive <span class="token string">&quot;if(<span class="token variable">$invalid_referer</span>)&quot;</span> <span class="token keyword">in</span> /usr/local/nginx/conf/nginx.conf:27
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例子：这里设置nginx服务器中的img目录下的图片必须refer为http:192.168.174/133才能访问</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
				
				<span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span> 
        		<span class="token directive"><span class="token keyword">proxy_pass</span> http://xxx</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      
				<span class="token directive"><span class="token keyword">location</span> /img</span><span class="token punctuation">{</span>
                <span class="token directive"><span class="token keyword">valid_referers</span> http:192.168.174/133</span><span class="token punctuation">;</span>
                <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span><span class="token punctuation">{</span><span class="token comment">#无效的</span>
                        <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span><span class="token comment">#返回状态码403</span>
                <span class="token punctuation">}</span>
                <span class="token directive"><span class="token keyword">root</span> html</span><span class="token punctuation">;</span>
                <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果引用这张图片的页面且refer并没有被设置，图片无法加载出来</p><p>如果直接访问图片地址，因为没有refer字段指向来源，会直接显示Nginx的页面</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503153401325.png" alt="image-20220503153401325" tabindex="0" loading="lazy"><figcaption>image-20220503153401325</figcaption></figure><p><strong>设置盗链图片</strong></p><p>将提示图片放在html/img/x.png，访问设置防盗链图片时，就返回这x.png张图</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /img{
                valid_referers http:192.168.174/133;
                if ($invalid_referer){#无效的
                     rewrite ^/  /img/x.png break;
                }
                root html;
                index  index.html index.htm;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高可用场景" tabindex="-1"><a class="header-anchor" href="#高可用场景" aria-hidden="true">#</a> 高可用场景</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503174125433.png" alt="image-20220503174125433" tabindex="0" loading="lazy"><figcaption>image-20220503174125433</figcaption></figure><p>用户访问时，访问的是一个虚拟IP，keepalived会选定一个主服务器使用这个虚拟IP</p><p>每台机器上的keepalived会相互通信，根据其他机器上的keepalived进程是否存在，判断服务器状态，如果默认的Master停止了，就会在剩下的Backup机器中，竞选出一台Nginx服务器作为Master</p><p><strong>安装keepalived</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y keepalived
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>修改keepalived配置</strong></p><ul><li>配置文件在/etc/keepalived/keepalived.conf</li><li><code>vrrp_instance</code>、<code>authentication</code>、<code>virtual_router_id</code>、<code>virtual_ipaddress</code>这几个一样的机器，才算是同一个组里。这个组才会选出一个作为Master机器</li></ul><p>这里我们设置两台机器，分别下载好keepalived，然后进行配置</p><p>机器一：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>! <span class="token directive"><span class="token keyword">Configuration</span> File for keepalived

global_defs</span> <span class="token punctuation">{</span>
   router_id lb1 <span class="token comment"># 名字与其他配置了keepalive的机器不重复就行</span>
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">vrrp_instance</span> heyingjie</span> <span class="token punctuation">{</span><span class="token comment">#vrrp实例名可以随意取</span>
    <span class="token directive"><span class="token keyword">state</span> MASTER <span class="token comment">#只能有一个默认的Master，其他写BACKUP</span>
    interface ens33 <span class="token comment"># ip addr查看下网卡名，默认时ens33</span>
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">100</span> <span class="token comment"># 多台安装了keepalived的机器竞争成为Master的优先级</span>
    advert_int <span class="token number">1</span> <span class="token comment">#通信时间</span>
    authentication</span> <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass 1111
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">virtual_ipaddress</span></span> <span class="token punctuation">{</span>
        192.168.200.16 <span class="token comment">#虚拟IP</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>机器二：</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>! <span class="token directive"><span class="token keyword">Configuration</span> File for keepalived

global_defs</span> <span class="token punctuation">{</span>
   router_id lb2 
<span class="token punctuation">}</span>

<span class="token directive"><span class="token keyword">vrrp_instance</span> heyingjie</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">state</span> BACKUP <span class="token comment">#只能有一个默认的Master，其他写BACKUP</span>
    interface ens33 
    virtual_router_id <span class="token number">51</span>
    priority <span class="token number">50</span>
    advert_int <span class="token number">1</span> 
    authentication</span> <span class="token punctuation">{</span>
        auth_type PASS
        auth_pass 1111
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">virtual_ipaddress</span></span> <span class="token punctuation">{</span>
        192.168.200.16 <span class="token comment">#虚拟IP</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过命令<code>ip addr</code>查看机器一的ip信息，可以看到虚拟IP</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503175414858.png" alt="image-20220503175414858" tabindex="0" loading="lazy"><figcaption>image-20220503175414858</figcaption></figure><h2 id="配置证书" tabindex="-1"><a class="header-anchor" href="#配置证书" aria-hidden="true">#</a> 配置证书</h2><p>购买服务器——&gt;购买域名，并解析到这个主机——&gt;购买证书，绑定到域名上，并且把证书文件安装到服务器，并在Nginx上配置好</p><p>这时候，这个域名就可以使用https进行访问里（<code>https://xxxx</code>），浏览器上会有一个小锁</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503191754606.png" alt="image-20220503191754606" tabindex="0" loading="lazy"><figcaption>image-20220503191754606</figcaption></figure><p>上面的流程我比较熟悉了，就直接跳过了，这里直接写申请到证书后的Nginx配置部分</p><p><strong>下载证书文件</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503192840029.png" alt="image-20220503192840029" tabindex="0" loading="lazy"><figcaption>image-20220503192840029</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20220503192957256.png" alt="image-20220503192957256" tabindex="0" loading="lazy"><figcaption>image-20220503192957256</figcaption></figure><p>下载后，解压压缩包，可以看到两个文件，一个是 <code>xxx.key</code>（私钥）和<code>xxx.pem</code>（证书）</p><p><strong>配置</strong></p><p>将两个文件上传到Nginx目录中，记得放置的位置。我这里直接放在nginx.conf配置文件所在的目录（<code>/user/local/nginx/conf</code>），所以写的都是相对路径</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ss1</span><span class="token punctuation">;</span>
	
	<span class="token directive"><span class="token keyword">ss1</span> certificate  xxx.pem</span><span class="token punctuation">;</span> <span class="token comment">#这里是证书路径</span>
	ss1_ certificate_key  xxx.key  <span class="token comment">#这里是私钥路径</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,123);function $(H,j){const a=l("ExternalLinkIcon");return p(),c("div",null,[r,n("ul",null,[n("li",null,[d,n("p",null,[s("我这里只找到了mac版本的"),n("a",u,[s("vmware-fusion (opens new window)"),e(a)]),s("，所以就使用这个版本了")])]),n("li",null,[m,n("p",null,[n("a",v,[s("官网 (opens new window)"),e(a)]),s("下载适合自己的版本")]),g,k,b,n("table",null,[h,n("tbody",null,[x,n("tr",null,[f,n("td",null,[s("对完整版安装盘的软件进行补充，集成所有软件。(包含"),n("a",w,[s("centos7 (opens new window)"),e(a)]),s("的一套完整的软件包，可以用来安装系统或者填充本地镜像)")])]),y,_])])]),z]),N,n("ul",null,[q,S,P,n("li",null,[I,n("p",null,[s("由淘宝网发起的Web服务器项目。它在"),n("a",E,[s("Nginx (opens new window)"),e(a)]),s("的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。Tengine的性能和稳定性已经在大型的网站如"),n("a",O,[s("淘宝网 (opens new window)"),e(a)]),s("，"),n("a",T,[s("天猫商城 (opens new window)"),e(a)]),s("等得到了很好的检验。相比于Open Resty，扩展性不够强，但是能够满足绝多数使用场景")])])]),A,n("ul",null,[n("li",null,[R,n("p",null,[n("a",C,[s("官网下载地址(opens new window)"),e(a)])]),D,M,B,L]),V]),U])}const W=t(o,[["render",$],["__file","index.html.vue"]]);export{W as default};
