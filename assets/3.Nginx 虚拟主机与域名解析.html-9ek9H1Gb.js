import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as p,o as c,c as l,a as n,b as s,d as e,e as i}from"./app-db_OQQsY.js";const o={},d=n("br",null,null,-1),r={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},m=n("br",null,null,-1),u={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},v=i('<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#_5">虚拟主机与域名解析</a></li><li><ul><li><a href="#dnsip_11">域名、dns、ip地址的关系</a></li><li><a href="#http_51">http协议</a></li><li><a href="#_71">虚拟主机原理</a></li><li><ul><li><a href="#_79">监听不同域名</a></li><li><a href="#_171">监听多个端口</a></li></ul></li><li><a href="#_281">泛域名</a></li></ul></li></ul></li></ul><h2 id="虚拟主机与域名解析" tabindex="-1"><a class="header-anchor" href="#虚拟主机与域名解析" aria-hidden="true">#</a> 虚拟主机与域名解析</h2><p>虚拟主机使用特殊的软硬件技术，把一台运行在因特网上的服务器主机分成一台台“虚拟”的主机，每一台虚拟主机都具有独立的域名，具有完整的Internet服务器（WWW、FTP、Email等）功能，虚拟主机之间完全独立，并可由用户自行管理，在外界看来，每一台虚拟主机和一台独立的主机完全一样。</p>',4),k={href:"https://so.csdn.net/so/search?q=DNS%E6%9C%8D%E5%8A%A1%E5%99%A8&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},b=i('<h3 id="域名、dns、ip地址的关系" tabindex="-1"><a class="header-anchor" href="#域名、dns、ip地址的关系" aria-hidden="true">#</a> 域名、dns、ip地址的关系</h3><ul><li>域名是相对网站来说的，IP是相对网络来说的。当输入一个域名的时候，网页是如何做出反应的？</li></ul><p>输入域名----&gt;域名解析服务器（dns）解析成ip地址—&gt;访问IP地址—&gt;完成访问的内容—&gt;返回信息。</p><ul><li>Internet上的计算机IP是唯一的，一个IP地址对应一个计算机。</li></ul><p>一台计算机上面可以有很多个服务，也就是一个ip地址对应了很多个域名，即一个计算机上有很多网站。</p><p><strong>IP地址和DNS地址的区别</strong></p><p>IP地址是指单个主机的唯一IP地址，而DNS服务器地址是用于域名解析的地址。</p><p>一个是私网地址，一个是公网地址；</p><p>一个作为主机的逻辑标志，一个作为域名解析服务器的访问地址。</p><p><strong>IP地址</strong></p><p>IP，就是Internet Protocol的缩写，是一种通信协议，我们用的因特网基本是IP网组成的。</p><p>IP地址就是因特网上的某个设备的一个编号。</p><p>IP地址一般由网络号，主机号，掩码来组成。</p><p>IP网络上有很多路由器，路由器之间转发、通信都是只认这个IP地址，类似什么哪？就好像你寄包裹，你的写上发件人地址，你的姓名，收件人地址，收件人姓名。</p><p>这个发件人地址就是你电脑的IP的网络号，你的姓名就是你的主机号。</p><p>收件人的地址就是你要访问的IP的网络号，收件人的姓名就是访问IP的主机号。</p><p>现在还有了更复杂的IPV6,还有IPV9。</p><p><strong>DNS是什么？</strong></p><p>我们访问因特网必须知道对端的IP地址，可是我们访问网站一般只知道域名啊，怎么办？</p><p>这时候DNS就有用处了，电脑先访问DNS服务器，查找域名对应的IP,于是，你的电脑就知道要发包到IP地址了。</p>',20),g={id:"http协议",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#http协议","aria-hidden":"true"},"#",-1),f={href:"https://so.csdn.net/so/search?q=http%E5%8D%8F%E8%AE%AE&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},w=i(`<p>HTTP是一个应用层协议，由请求和响应构成，是一个标准的客户端服务器模型。HTTP是一个无状态的协议。</p><p>HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上，这个时候，就成了我们常说的HTTPS。如下图所示：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4f759c3908f7e0e0f73b7404869861be.png" alt="image-20220430195715455" tabindex="0" loading="lazy"><figcaption>image-20220430195715455</figcaption></figure><p>客户端与服务器的数据交互的流程：</p><p>1）首先客户机与服务器需要建立TCP连接。只要单击某个超级链接，HTTP的工作开始，下图是TCP连接流程。</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/19c3020d653f5c14f1504af78a801f87.png" alt="image-20220430195747864" tabindex="0" loading="lazy"><figcaption>image-20220430195747864</figcaption></figure><p>2）建立连接后，客户机发送一个请求给服务器，请求方式的格式为：统一资源标识符（URL）、协议版本号，后边是MIME信息包括请求修饰符、客户机信息和可能的内容。</p><p>3）服务器接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是MIME信息包括服务器信息、实体信息和可能的内容，例如返回一个HTML的文本。</p><p>4）客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接。如果在以上过程中的某一步出现错误，那么产生错误的信息将返回到客户端，有显示屏输出。对于用户来说，这些过程是由HTTP自己完成的，用户只要用鼠标点击，等待信息显示就可以了。</p><h3 id="虚拟主机原理" tabindex="-1"><a class="header-anchor" href="#虚拟主机原理" aria-hidden="true">#</a> 虚拟主机原理</h3><p>虚拟主机是为了在同一台物理机器上运行多个不同的网站，提高资源利用率引入的技术。</p><p>一般的web服务器一个ip地址的80端口只能正确对应一个网站。web服务器在不使用多个ip地址和端口的情况下，如果需要支持多个相对独立的网站就需要一种机制来分辨同一个ip地址上的不同网站的请求，这就出现了主机头绑定的方法。简单的说就是，将不同的网站空间对应不同的域名，以连接请求中的域名字段来分发和应答正确的对应空间的文件执行结果。举个例子来说，一台服务器ip地址为192.168.8.101，有两个域名和对应的空间在这台服务器上，使用的都是192.168.8.101的80端口来提供服务。如果只是简单的将两个域名A和B的域名记录解析到这个ip地址，那么web服务器在收到任何请求时反馈的都会是同一个网站的信息，这显然达不到要求。接下来我们使用主机头绑定域名A和B到他们对应的空间文件夹C和D。当含有域名A的web请求信息到达192.168.8.101时，web服务器将执行它对应的空间C中的首页文件，并返回给客户端，含有域名B的web请求信息同理，web服务器将执行它对应的空间D中的首页文件，并返回给客户端，所以在使用主机头绑定功能后就不能使用ip地址访问其上的任何网站了，因为请求信息中不存在域名信息，所以会出错。</p><p>实战：</p><h4 id="监听不同域名" tabindex="-1"><a class="header-anchor" href="#监听不同域名" aria-hidden="true">#</a> 监听不同域名</h4><p>配置nginx.cfg</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

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
            <span class="token directive"><span class="token keyword">root</span>   /www/test80</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

	<span class="token comment">#出错页面配置</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token comment">#/50x.html文件所在位置</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
    
    <span class="token comment">#虚拟主机的配置</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#监听端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment">#域名，可以有多个，用空格隔开</span>
        <span class="token directive"><span class="token keyword">server_name</span>  test81.xzj520520.cn</span><span class="token punctuation">;</span>

	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   /www/test81</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置单机域名</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ba83f6445941356fb0ca5aa8780a0412.png" alt="image-20220430124859557" tabindex="0" loading="lazy"><figcaption>image-20220430124859557</figcaption></figure><p>使用systemctl reload nginx重新加载配置</p><p>测试</p><p>访问http://test80.xzj520520.cn/：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4094c19fad291ed98fdbb8c91f4c13ba.png" alt="image-20220430144925129" tabindex="0" loading="lazy"><figcaption>image-20220430144925129</figcaption></figure><p>访问http://test81.xzj520520.cn/：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4721ecf3cd55df4fa63f6c3c3eb81ed5.png" alt="image-20220430144945768" tabindex="0" loading="lazy"><figcaption>image-20220430144945768</figcaption></figure><p>如果匹配不到会访问第一个站点：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c498ce19f31e559db8a2b013f33b1bfe.png" alt="image-20220430164652812" tabindex="0" loading="lazy"><figcaption>image-20220430164652812</figcaption></figure><h4 id="监听多个端口" tabindex="-1"><a class="header-anchor" href="#监听多个端口" aria-hidden="true">#</a> 监听多个端口</h4><p>修改nginx.conf</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span> <span class="token comment">#允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个</span>

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
            <span class="token directive"><span class="token keyword">root</span>   /www/test80</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

	<span class="token comment">#出错页面配置</span>
        <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
        <span class="token comment">#/50x.html文件所在位置</span>
        <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
    
    <span class="token comment">#虚拟主机的配置</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#监听端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">81</span></span><span class="token punctuation">;</span>
        <span class="token comment">#域名，可以有多个，用空格隔开</span>
        <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>

	<span class="token comment">#配置根目录以及默认页面</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>   /www/test81</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用systemctl reload nginx重新加载配置（需要关闭防火墙，否则81端口不能访问）</p><p>在如下位置新建test80,test81</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/5a29e5e8f40fcef889b4c4d9da622d89.png" alt="image-20220430123543100" tabindex="0" loading="lazy"><figcaption>image-20220430123543100</figcaption></figure><p>test80,test81新建index.html</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/9ae7147a5175203bf50f49d5801cac3a.png" alt="image-20220430123616583" tabindex="0" loading="lazy"><figcaption>image-20220430123616583</figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/d0cc13254f97f05b06292bb6a218a37d.png" alt="image-20220430123630316" tabindex="0" loading="lazy"><figcaption>image-20220430123630316</figcaption></figure><p>内容分别是</p><p>test80/index.html</p><pre><code>hello80
</code></pre><p>test81/index.html</p><pre><code>hello81
</code></pre><p>访问：http://192.168.8.101/</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a34e4721ec63b91780b3fca34794ea5b.png" alt="image-20220430122411390" tabindex="0" loading="lazy"><figcaption>image-20220430122411390</figcaption></figure><p>访问：http://192.168.8.101:81/</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/fc8a6954635e057af7feb6ed996738f6.png" alt="image-20220430123414888" tabindex="0" loading="lazy"><figcaption>image-20220430123414888</figcaption></figure><h3 id="泛域名" tabindex="-1"><a class="header-anchor" href="#泛域名" aria-hidden="true">#</a> 泛域名</h3><p>所谓“泛域名解析”是指：利用通配符* （星号）来做次级域名以实现所有的次级域名均指向同一IP地址。</p><p>好处：</p><p>1.可以让域名支持无限的子域名(这也是泛域名解析最大的用途)。</p><p>2.防止用户错误输入导致的网站不能访问的问题</p><p>3.可以让直接输入网址登陆网站的用户输入简洁的网址即可访问网站</p><p>泛域名在实际使用中作用是非常广泛的，比如实现无限二级域名功能，提供免费的url转发，在IDC部门实现自动分配免费网址，在大型企业中实现网址分类管理等等，都发挥了巨大的作用。</p><p>在阿里云的域名配置如下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/834032090fb377ab64b5ccc4a628303b.png" alt="image-20220430201135906" tabindex="0" loading="lazy"><figcaption>image-20220430201135906</figcaption></figure>`,53);function x(_,y){const a=p("ExternalLinkIcon");return c(),l("div",null,[n("blockquote",null,[n("p",null,[s("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),d,s(" 📫专栏地址:"),n("a",r,[s("Nginx"),e(a)]),m,s(" 📫相关软件:"),n("a",u,[s("链接地址"),e(a)])])]),v,n("p",null,[s("域名解析就是域名到IP地址的转换过程，IP地址是网路上标识站点的数字地址，为了简单好记，采用域名来代替ip地址标识站点地址，。域名的解析工作由"),n("a",k,[s("DNS服务器"),e(a)]),s("完成。")]),b,n("h3",g,[h,s(),n("a",f,[s("http协议"),e(a)])]),w])}const z=t(o,[["render",x],["__file","3.Nginx 虚拟主机与域名解析.html.vue"]]);export{z as default};
