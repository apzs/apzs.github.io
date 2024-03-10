import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as l,o as p,c as d,a,b as e,d as n,e as t}from"./app-ldxHvpH7.js";const s={},o=a("br",null,null,-1),c={href:"https://blog.csdn.net/learning_xzj/category_11792194.html",target:"_blank",rel:"noopener noreferrer"},g=a("br",null,null,-1),f={href:"https://pan.baidu.com/s/12VmjEzxEKeiwrONceaWguA?pwd=aaaa",target:"_blank",rel:"noopener noreferrer"},h=t('<h3 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录" aria-hidden="true">#</a> 文章目录</h3><ul><li><ul><li><a href="#_5">高可用配置</a></li><li><ul><li><a href="#_7">高可用场景及解决方案</a></li><li><a href="#keepalived_19">安装keepalived</a></li><li><a href="#keepalived_32">keepalived实战</a></li></ul></li></ul></li></ul><h2 id="高可用配置" tabindex="-1"><a class="header-anchor" href="#高可用配置" aria-hidden="true">#</a> 高可用配置</h2><h3 id="高可用场景及解决方案" tabindex="-1"><a class="header-anchor" href="#高可用场景及解决方案" aria-hidden="true">#</a> 高可用场景及解决方案</h3>',4),_={href:"https://so.csdn.net/so/search?q=LVS%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},m={href:"http://www.keepalived.org/",target:"_blank",rel:"noopener noreferrer"},u=t(`<p>keepalived服务的三个重要功能：</p><ul><li>管理LVS负载均衡软件</li><li>实现LVS集群节点的健康检查中</li><li>作为系统网络服务的高可用性（failover）</li></ul><h3 id="安装keepalived" tabindex="-1"><a class="header-anchor" href="#安装keepalived" aria-hidden="true">#</a> 安装keepalived</h3><p>centos安装命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> keepalived
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装成功的截图如下：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/e07cd9f9164d4c7fb452a6f6d47b2ee7.png" alt="afdas" tabindex="0" loading="lazy"><figcaption>afdas</figcaption></figure><h3 id="keepalived实战" tabindex="-1"><a class="header-anchor" href="#keepalived实战" aria-hidden="true">#</a> keepalived实战</h3><p>keepalived的配置文件在如下位置：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/26e162a6aac3208c0a9d3d647360587a.png" alt="image-20220501200719615" tabindex="0" loading="lazy"><figcaption>image-20220501200719615</figcaption></figure><p>在该实战中，101为主nginx，102为备用机，首先需要修改101和102的keepalived.conf配置</p><p>101的keepalived.conf配置</p><pre><code>! Configuration File for keepalived

global_defs {
   router_id LB_102
}

vrrp_instance VI_102 {
    state MASTER
    interface ens33
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.8.200
    }
}
</code></pre><p>使用systemctl start keepalived启动keepalived,查看ip发现多了虚拟ip192.168.8.200:</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/cff83eadf4e88eadbba6ee03bbaf7ad5.png" alt="image-20220501202555004" tabindex="0" loading="lazy"><figcaption>image-20220501202555004</figcaption></figure><p>interface ens33这里的ens33需要和以下位置对应:</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/de70295e96ff2cf132e55c46f26385d9.png" alt="image-20220501201254706" tabindex="0" loading="lazy"><figcaption>image-20220501201254706</figcaption></figure><p>102的keepalived.conf配置</p><pre><code>! Configuration File for keepalived

global_defs {
   router_id LB_101
}

vrrp_instance VI_102 {
    state BACKUP
    interface ens33
    virtual_router_id 51
    priority 50
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.8.200
    }
}
</code></pre><p>使用systemctl start keepalived启动keepalived</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/1212604f8cb45321ad014afdef6291cd.png" alt="image-20220501203202864" tabindex="0" loading="lazy"><figcaption>image-20220501203202864</figcaption></figure><p>访问 162.168.8.200：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/52a00837a626c36afbcde5352a88f22d.png" alt="image-20220501203541619" tabindex="0" loading="lazy"><figcaption>image-20220501203541619</figcaption></figure><p>关闭102，再次访问192.168.8.200：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ffb724e72e13607410c6c23e9beb797b.png" alt="image-20220501203753748" tabindex="0" loading="lazy"><figcaption>image-20220501203753748</figcaption></figure><p>由于图片资源存放在102上，通过192.168.8.200访问到的主机是102，所以背景是空白，没有访问到静态资源，keepalived配置成功。</p>`,26);function v(b,k){const i=l("ExternalLinkIcon");return p(),d("div",null,[a("blockquote",null,[a("p",null,[e("🌱本专栏将会从基础开始，循序渐进讲解Nginx的使用和有关配置，也请大家多多支持,希望大家都能够从中获益。"),o,e(" 📫专栏地址:"),a("a",c,[e("Nginx"),n(i)]),g,e(" 📫相关软件:"),a("a",f,[e("链接地址"),n(i)])])]),h,a("p",null,[e("Keepalived软件起初是专为"),a("a",_,[e("LVS负载均衡"),n(i)]),e("软件设计的，用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了可以实现高可用的VRRP功能。因此，Keepalived除了能够管理LVS软件外，还可以作为其他服务（例如：Nginx、Haproxy、MySQL等）的高可用解决方案软件。VRRP出现的目的就是为了解决静态路由单点故障问题的，它能够保证当个别节点宕机时，整个网络可以不间断地运行。所以，Keepalived 一方面具有配置管理LVS的功能，同时还具有对LVS下面节点进行健康检查的功能，另一方面也可实现系统网络服务的高可用功能。")]),a("p",null,[e("keepalived官网"),a("a",m,[e("http://www.keepalived.org"),n(i)])]),u])}const V=r(s,[["render",v],["__file","7.nginx高可用及Keepalived实战.html.vue"]]);export{V as default};
