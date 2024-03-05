const e=JSON.parse('{"key":"v-db86dacc","path":"/back-base/3.JavaWeb/5.HTTP_Tomcat_Servlet.html","title":"JavaWeb基础5——HTTP，Tomcat&Servlet","lang":"zh-CN","frontmatter":{"description":"JavaWeb基础5——HTTP，Tomcat&amp;Servlet 一、Web概述 (1)Request是从客户端向服务端发出的请求对象， (2)Response是从服务端响应给客户端的结果对象， (3)JSP是动态网页技术, (4)会话技术(Cookie、Session) 是用来存储客户端和服务端交互所产生的数据， (5)过滤器Filter 是用来拦截客户端的请求,","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/back-base/3.JavaWeb/5.HTTP_Tomcat_Servlet.html"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:title","content":"JavaWeb基础5——HTTP，Tomcat&Servlet"}],["meta",{"property":"og:description","content":"JavaWeb基础5——HTTP，Tomcat&amp;Servlet 一、Web概述 (1)Request是从客户端向服务端发出的请求对象， (2)Response是从服务端响应给客户端的结果对象， (3)JSP是动态网页技术, (4)会话技术(Cookie、Session) 是用来存储客户端和服务端交互所产生的数据， (5)过滤器Filter 是用来拦截客户端的请求,"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-05T06:05:15.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:modified_time","content":"2024-03-05T06:05:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JavaWeb基础5——HTTP，Tomcat&Servlet\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-05T06:05:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"一、Web概述","slug":"一、web概述","link":"#一、web概述","children":[{"level":3,"title":"1.1 Web和JavaWeb的概念","slug":"_1-1-web和javaweb的概念","link":"#_1-1-web和javaweb的概念","children":[]},{"level":3,"title":"1.2 JavaWeb技术栈","slug":"_1-2-javaweb技术栈","link":"#_1-2-javaweb技术栈","children":[]}]},{"level":2,"title":"二、HTTP超文本传输协议","slug":"二、http超文本传输协议","link":"#二、http超文本传输协议","children":[{"level":3,"title":"2.1 概述","slug":"_2-1-概述","link":"#_2-1-概述","children":[]},{"level":3,"title":"2.2 请求数据格式","slug":"_2-2-请求数据格式","link":"#_2-2-请求数据格式","children":[]},{"level":3,"title":"2.3 响应数据格式","slug":"_2-3-响应数据格式","link":"#_2-3-响应数据格式","children":[]},{"level":3,"title":"2.4 响应状态码","slug":"_2-4-响应状态码","link":"#_2-4-响应状态码","children":[]}]},{"level":2,"title":"三、Tomcat","slug":"三、tomcat","link":"#三、tomcat","children":[{"level":3,"title":"3.1 简介","slug":"_3-1-简介","link":"#_3-1-简介","children":[]},{"level":3,"title":"3.2 基本使用","slug":"_3-2-基本使用","link":"#_3-2-基本使用","children":[]},{"level":3,"title":"3.3 Maven创建Web项目","slug":"_3-3-maven创建web项目","link":"#_3-3-maven创建web项目","children":[]},{"level":3,"title":"3.4 Maven Web各种报错汇总","slug":"_3-4-maven-web各种报错汇总","link":"#_3-4-maven-web各种报错汇总","children":[]}]},{"level":2,"title":"四、Servlet","slug":"四、servlet","link":"#四、servlet","children":[{"level":3,"title":"4.1 简介","slug":"_4-1-简介","link":"#_4-1-简介","children":[]},{"level":3,"title":"4.2 快速入门","slug":"_4-2-快速入门","link":"#_4-2-快速入门","children":[]},{"level":3,"title":"4.3 执行流程","slug":"_4-3-执行流程","link":"#_4-3-执行流程","children":[]},{"level":3,"title":"4.4 生命周期","slug":"_4-4-生命周期","link":"#_4-4-生命周期","children":[]},{"level":3,"title":"4.5 Servlet接口的方法介绍","slug":"_4-5-servlet接口的方法介绍","link":"#_4-5-servlet接口的方法介绍","children":[]},{"level":3,"title":"4.6 HttpServlet，Servlet的继承体系结构","slug":"_4-6-httpservlet-servlet的继承体系结构","link":"#_4-6-httpservlet-servlet的继承体系结构","children":[]},{"level":3,"title":"4.7 IDEA使用模板创建Servlet","slug":"_4-7-idea使用模板创建servlet","link":"#_4-7-idea使用模板创建servlet","children":[]},{"level":3,"title":"4.8 @WebServlet的urlPattern配置规则","slug":"_4-8-webservlet的urlpattern配置规则","link":"#_4-8-webservlet的urlpattern配置规则","children":[]},{"level":3,"title":"4.9 老版本Servlet通过XML配置路径","slug":"_4-9-老版本servlet通过xml配置路径","link":"#_4-9-老版本servlet通过xml配置路径","children":[]}]}],"git":{"createdTime":1709618715000,"updatedTime":1709618715000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":1}]},"readingTime":{"minutes":41.37,"words":12411},"filePathRelative":"back-base/3.JavaWeb/5.HTTP&Tomcat&Servlet.md","localizedDate":"2024年3月5日","excerpt":"<h1> JavaWeb基础5——HTTP，Tomcat&amp;Servlet</h1>\\n<h2> 一、Web概述</h2>\\n<p>(1)<strong>Request</strong>是从客户端向服务端发出的请求对象，</p>\\n<p>(2)<strong>Response</strong>是从服务端响应给客户端的结果对象，</p>\\n<p>(3)<strong>JSP</strong>是动态网页技术,</p>\\n<p>(4)<strong>会话技术</strong>(Cookie、Session) 是用来存储客户端和服务端交互所产生的数据，</p>\\n<p>(5)<strong>过滤器</strong>Filter 是用来拦截客户端的请求,</p>","autoDesc":true}');export{e as data};
