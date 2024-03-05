###  5.7、认证中心

认证中心对用户进行统一的登录认证

### 5.7.1、添加认证中心

#### 1、认证中心初始化

##### 1、新建认证中心模块

选中`IDEA`里`Project`的`gulimall`，右键依次点击`New`->`Module`->`Spring Initializr`->`Next`

在`New Module`对话框里`Group`里输入`com.atguigu.gulimall`，`Artifact`里输入`gulimall-auth-server`，`Java Version`选择`8`，`Description`里输入`认证中心(社交登录、OAuth2.0、单点登录)`，`Package`里输入`com.atguigu.gulimall.auth`，然后点击`Next`

```
com.atguigu.gulimall
gulimall-auth-server
0.0.1-SNAPSHOT
gulimall-auth-server
认证中心(社交登录、OAuth2.0、单点登录) 
com.atguigu.gulimall.auth
```

![image-20220803110137987](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.1.png)

选择`Devloper Tools`里的`Spring Boot DevTools`和`Lombox`

![image-20220803110344173](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.2.png)

选择`Web`里的`Spring Web`

![image-20220803110414437](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.3.png)

选择`Template Engines`里的`Thymeleaf`

![image-20220803110442958](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.4.png)

选择`Spring Cloud Routing`里的`OpenFeign`，然后点击`Next`

![image-20220803110528317](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.5.png)

最后点击`Finish`

![image-20220803110555561](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.6.png)

复制`gulimall-auth-server`模块的`pom.xml`文件的`dependencies`和`项目信息`的部分，(`properties`里的不要)

```xml
<groupId>com.atguigu.gulimall</groupId>
<artifactId>gulimall-auth-server</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>gulimall-auth-server</name>
<description>认证中心(社交登录、OAuth2.0、单点登录) </description>
<dependencies>
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-thymeleaf</artifactId>
   </dependency>
   ......
</dependencies>
```

然后复制`gulimall-product`模块的`pom.xml`文件，粘贴到`gulimall-auth-server`模块的`pom.xml`文件里，删除`dependencies`和`项目信息`的部分，替换为`gulimall-auth-server`模块的`pom.xml`文件的`dependencies`和`项目信息`

如果`pom.xml`文件颜色为赤橙色，可以选中`pom.xml`文件，右键选择`Add as Maven Project`就好了(最好先替换文件，再加入到项目)

[点击查看完整`pom.xml`文件](code/5.7.1.1.1.pom.xml)

![image-20220803111313234](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.7.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.GulimallAuthServerApplicationTests`测试类为`junit4`

```java
package com.atguigu.gulimall.auth;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallAuthServerApplicationTests {

   @Test
   public void contextLoads() {
      System.out.println("hello...");
   }

}
```

![image-20220803111831437](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.1.8.png)

##### 2、添加依赖

在`gulimall-auth-server`模块的`pom.xml`的`<dependencies>`标签里引入`gulimall-common`依赖，由于`gulimall-auth-server`模块不操作数据库可以移除`gulimall-common`模块的`mybatis-plus`依赖

```xml
<dependency>
   <groupId>com.atguigu.gulimall</groupId>
   <artifactId>gulimall-common</artifactId>
   <version>0.0.1-SNAPSHOT</version>
   <exclusions>
      <exclusion>
         <groupId>com.baomidou</groupId>
         <artifactId>mybatis-plus-boot-starter</artifactId>
      </exclusion>
   </exclusions>
</dependency>
```

![image-20220803112729182](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.2.1.png)

在`gulimall-auth-server`模块的`src/main/resources/application.properties`配置文件里配置应用名和注册中心的地址

```properties
spring.application.name=gulimall-auth-server
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
server.port=20000
```

![image-20220803113146718](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.2.2.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.GulimallAuthServerApplication`启动类上添加`@EnableDiscoveryClient`注解，开启服务发现

```java
@EnableDiscoveryClient
```

![image-20220803113235752](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.2.3.png)

由于`gulimall-auth-server`模块的`pom.xml`文件已经引入了远程调用的`openfeign`，因此就不用引了

![image-20220803113318794](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.2.4.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.GulimallAuthServerApplication`启动类上添加`@EnableFeignClients`注解，开启远程调用

```java
@EnableFeignClients
```

![image-20220803113414085](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.2.5.png)

使用浏览器访问`http://localhost:8848/nacos`页面，用户名和密码都为`nacos`

点击`服务管理/服务列表`可以看到`gulimall-auth-server`已经加入进来了

![image-20220803113608915](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.2.6.png)

##### 3、导入静态资源

在`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\登录页面`里把`index.html`复制到`gulimall-auth-server`模块的`src/main/resources/templates`文件里面，并将`index.html`改名为`login.html`

![GIF 2022-8-3 11-38-10](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.1.gif)

在`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\注册页面`里，把`index.html`复制到`gulimall-auth-server`模块的`src/main/resources/templates`文件里面，并将`index.html`改名为`reg.html`

![GIF 2022-8-3 11-44-00](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.2.gif)

打开`SwitchHosts`软件，依次点击`hosts`->`本地方案`->`gulimall`，在后面添加`192.168.56.10 auth.gulimall.com`，然后点击`对勾`图标

```properties
# gulimall
192.168.56.10 gulimall.com
192.168.56.10 search.gulimall.com
192.168.56.10 item.gulimall.com
192.168.56.10 auth.gulimall.com
```

![image-20220803114604485](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.3.png)

在`linux虚拟机`的`/mydata/nginx/html/static`目录下新建`login`目录，把`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\登录页面`里的所有文件夹都复制到`linux虚拟机`的`/mydata/nginx/html/static/login`里面

![GIF 2022-8-3 11-54-19](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.4.gif)

在`linux虚拟机`的`/mydata/nginx/html/static`目录下新建`reg`目录，把`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\注册页面`里的所有文件夹都复制到`linux虚拟机`的`/mydata/nginx/html/static/reg`里面

![GIF 2022-8-3 11-56-22](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.5.gif)

在`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件里，将`src="`(除`src='某url'`)替换为` src="/static/login/`，将`href="`(除`href='某url'`或`href='#'`)替换为`href="/static/login/`

完整代码：[gulimall-auth-server模块的src/main/resources/templates/login.html文件](code/5.7.1.1.3.6.login.md)

![image-20220803115948128](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.6.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里，将`src="`(除`src='某url'`)替换为` src="/static/reg/`，将`href="`(除`href='某url'`或`href='#'`)替换为`href="/static/reg/`

完整代码：[gulimall-auth-server模块的src/main/resources/templates/reg.html文件](code/5.7.1.1.3.7.reg.md)

![image-20220803162601349](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.3.7.png)

##### 4、添加到`gateway`

在`gulimall-gateway`模块的`src/main/resources/application.yml`文件里添加如下配置

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: gulimall_auth_route
          uri: lb://gulimall-auth-server
          predicates:
            - Host=auth.gulimall.com
```

![image-20220803163319730](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.4.png)

##### 5、访问页面

将`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件改名为`index.html`

![image-20220803163331963](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.5.1.png)

启动`GulimallGatewayApplication`服务和`GulimallAuthServerApplication`服务

在浏览器里打开`http://auth.gulimall.com/`页面，可以看到已经访问成功了

![image-20220803163348978](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.5.2.png)

##### 6、修改页面

在`http://auth.gulimall.com`页面里，打开控制台，定位到`谷粒商城`的图标，复制`/static/login/JD_img/logo.jpg`

![image-20220803163520948](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.6.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/index.html`文件里，搜索`/static/login/JD_img/logo.jpg`，将该行修改为如下代码，点击谷粒商城图标可以跳转到主页

```html
<a href="http://gulimall.com"><img src="/static/login/JD_img/logo.jpg" /></a>
```

![image-20220803163704631](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.6.2.png)

在`gulimall-auth-server`模块的`src/main/resources/application.properties`配置文件里关闭`thymeleaf`缓存

```properties
spring.thymeleaf.cache=false
```

![image-20220803163911690](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.6.3.png)

在`http://auth.gulimall.com`页面里点击`谷粒商城`图标，可以正常跳转到`http://gulimall.com`页面

![GIF 2022-8-3 16-40-23](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.1.6.4.png)



#### 2、完善页面跳转

##### 1、主页跳转到登录页和注册页

在`gulimall.com`页面里，打开控制台，定位到`你好，请登录`，复制`你好，请登录`

![image-20220803164134463](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.1.1.png)

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里搜索`你好，请登录`，修改`登录`和`注册`的` href`属性

```html
<ul>
  <li>
    <a href="http://auth.gulimall.com/login.html">你好，请登录</a>
  </li>
  <li>
    <a href="http://auth.gulimall.com/reg.html" class="li_2">免费注册</a>
  </li>
  <span>|</span>
  <li>
    <a href="#">我的订单</a>
  </li>
</ul>
```

![image-20220803164336789](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.1.2.png)

重新启动`GulimallProductApplication`服务和`GulimallAuthServerApplication`服务，在`http://gulimall.com`页面里点击`你好，请登录`来到了`http://auth.gulimall.com/login.html`页面，但是网页没有正常显示。返回到`http://gulimall.com`页面，点击`免费注册`来到了`http://auth.gulimall.com/reg.html`页面，但是网页也没有正常显示。

![GIF 2022-8-3 16-44-56](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.1.3.gif)

在`gulimall-auth-server`模块里，重新将`src/main/resources/templates/index.html`文件修改为`login.html`

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth`包下新建`controller`文件夹，在`controller`文件夹里新建`LoginController`类，用来映射`login.html`和`reg.html`文件

```java
package com.atguigu.gulimall.auth.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description:
 */
@Controller
public class LoginController {

    @GetMapping("/login.html")
    public String loginPage(){
        return "login";
    }

    @GetMapping("/reg.html")
    public String regPage(){
        return "reg";
    }

}
```

![image-20220803164844472](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.1.4.png)

重新启动`GulimallProductApplication`服务和`GulimallAuthServerApplication`服务，在`http://gulimall.com`页面里点击`你好，请登录`来到了`http://auth.gulimall.com/login.html`页面，页面也正确显示。返回到`http://gulimall.com`页面，点击`免费注册`来到了`http://auth.gulimall.com/reg.html`页面，页面也正确显示。

![GIF 2022-8-3 16-50-21](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.1.5.gif)



##### 2、登录页跳转到注册页

在`http://auth.gulimall.com/login.html`页面里，打开控制台，定位到`立即注册`，复制`立即注册`

![image-20220803165137388](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.2.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件里搜索`立即注册`，修改其`href`属性

```html
<h5 class="rig">
   <img src="/static/login/JD_img/4de5019d2404d347897dee637895d02b_25.png" />
   <span><a href="http://auth.gulimall.com/reg.html">立即注册</a></span>
</h5>
```

![image-20220803165341685](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.2.2.png)

点击`Build` -> `Recompile 'login.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

在`http://auth.gulimall.com/login.html`页面里，点击`立即注册`，正确来到了`http://auth.gulimall.com/reg.html`页面

![GIF 2022-8-3 16-53-59](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.2.3.gif)



##### 3、注册页跳转到登录页

打开`http://auth.gulimall.com/reg.html`页面，点击`同意并继续`，然后打开控制台，定位到`请登录`，复制`请登录`

![image-20220803165522990](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.3.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里搜索`请登录`，修改其`href`属性

```html
<div class="dfg">
   <span>已有账号？</span>
   <a href="http://auth.gulimall.com/login.html">请登录</a>
</div>
```

![image-20220803165726261](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.3.2.png)

点击`Build` -> `Recompile 'reg.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

打开`http://auth.gulimall.com/reg.html`页面，点击`同意并继续`，然后点击`请登录`，成功跳转到`http://auth.gulimall.com/login.html`页面

![GIF 2022-8-3 16-58-06](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.2.3.3.gif)



#### 3、修改验证码图片

##### 1、修改前端页面

打开`http://auth.gulimall.com/reg.html`页面，点击`同意并继续`，然后打开控制台，定位到验证码的图片，复制`id="code"`

![image-20220803165946124](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.1.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里搜索`id="code"`，将`<span id="code"></span>`修改为`<span>发送验证码</span>`

```html
<span>发送验证码</span>
```

![image-20220803170107555](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.1.2.png)

点击`Build` -> `Recompile 'reg.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

打开`http://auth.gulimall.com/reg.html`页面，点击`同意并继续`，图片验证码的位置已经替换为`发送验证码`了

![image-20220803170149877](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.1.3.png)

##### 2、添加倒计时

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里，给`发送验证码`的`<a>`标签添加`id="sendCode"`属性

```html
<a id="sendCode">发送验证码</a>
```

![image-20220803170307131](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.2.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里，在`<script>`标签里，添加如下方法：

```javascript
// 发送验证码
$(function(){
   $("#sendCode").click(function(){
      //1、给指定手机号发送验证码
      //2、倒计时
      if($(this).hasClass("disabled")){
         //正在倒计时。
      }else{
         timeoutChangeStyle();
      }
   });
})
var num = 10;
function timeoutChangeStyle() {
   $("#sendCode").attr("class", "disabled");
   if (num == 0) {
      $("#sendCode").text("发送验证码");
      num = 10;
      $("#sendCode").attr("class", "");
   } else {
      var str = num + "s 后再次发送";
      $("#sendCode").text(str);
      setTimeout("timeoutChangeStyle()", 1000);
      num--;
   }
}
```

![image-20220803171507886](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.2.2.png)

点击`Build` -> `Recompile 'reg.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

打开`http://auth.gulimall.com/reg.html`页面，点击`同意并继续`，点击`发送验证码`，已经出现了`10s`的倒计时了

![GIF 2022-8-3 17-14-08](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.2.3.gif)

##### 3、批量配置简单视图映射

在`org.springframework.web.servlet.config.annotation.WebMvcConfigurer`接口里有一个`addViewControllers`方法可以批量配置视图的映射

```java
/**
 * Configure simple automated controllers pre-configured with the response
 * status code and/or a view to render the response body. This is useful in
 * cases where there is no need for custom controller logic -- e.g. render a
 * home page, perform simple site URL redirects, return a 404 status with
 * HTML content, a 204 with no content, and more.
 */
default void addViewControllers(ViewControllerRegistry registry) {
}
```

![image-20220803172040830](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.3.1.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth`包下新建`config`文件夹，在`config`文件夹里新建`GulimallWebConfig`类，实现`WebMvcConfigurer`接口，重写`addViewControllers`方法，配置对`login.html`文件和`reg.html`文件的路径映射

```java
package com.atguigu.gulimall.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description:
 */
@Configuration
public class GulimallWebConfig implements WebMvcConfigurer {

    /**
     * @GetMapping("/login.html")
     * public String loginPage(){
     *     return "login";
     * }
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login.html").setViewName("login");
        registry.addViewController("/reg.html").setViewName("reg");
    }
}
```

![image-20220803172800659](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.3.2.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类里删掉对`login.html`文件和`reg.html`文件的路径映射

```java
package com.atguigu.gulimall.auth.controller;

import org.springframework.stereotype.Controller;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description:
 */
@Controller
public class LoginController {

    //@GetMapping("/login.html")
    //public String loginPage(){
    //    return "login";
    //}
    //
    //@GetMapping("/reg.html")
    //public String regPage(){
    //    return "reg";
    //}

}
```

![image-20220803172434752](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.3.3.png)

重启`GulimallAuthServerApplication`服务，可以看到`http://auth.gulimall.com/login.html`和`http://auth.gulimall.com/reg.html`也能正确访问

![GIF 2022-8-3 17-28-32](https://gitlab.com/apzs/image/-/raw/master/image/5.7.1.3.3.4.gif)

### 5.7.2、短信服务&邮件服务

#### 1、短信服务简单测试

##### 1、购买短信服务

在阿里云网站里点击`云市场`，在`云市场`里搜索`短信`，随便点击一个商家，购买免费的几次短信服务

![GIF 2022-8-3 18-43-05](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.1.gif)

##### 2、调试工具测试

**短信单条发送**

*调用地址：*http(s)://gyytz.market.alicloudapi.com/sms/smsSend

*请求方式：*POST

*返回类型：*JSON

**请求参数（Query）**

| 名称       | 类型   | 是否必须 | 描述                                                         |
| :--------- | :----- | :------- | :----------------------------------------------------------- |
| mobile     | STRING | 必选     | 需要发送的手机号。（同一手机号码，同一签名验证码，一分钟一次，频率过快可能会导致运营商系统屏蔽，用户无法正常接收。） |
| param      | STRING | 可选     | 短信模板变量替换。（字符串格式：**key**:value,**key**:value。例如：**code**:12345,**minute**:5。如模板中有多个变量请使用英文逗号隔开。建议对参数进行URLEncode编码，以免出现乱码等异常情况） |
| smsSignId  | STRING | 必选     | 短信前缀ID（签名ID），联系客服申请。（测试ID请用：2e65b1bb3d054466b82f0c9d125465e2，对应短信前缀为【国阳云】。测试签名短信限流规则，同一个号码，1分钟1次，1小时5次，24小时10次，且仅支持接口调试少量测试，不支持大量商用） |
| templateId | STRING | 必选     | 短信正文ID（模板ID），联系客服申请。（测试ID请用：908e94ccf08b4476ba6c876d13f084ad，对应短信正文为 { 验证码：**code**，**minute**分钟内有效，请勿泄漏于他人！}） |

点击`API接口`->`短信单条发送`->`调试工具`里的`去调试`，可以进入到短信调试界面

![image-20220803191838428](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.2.1.png)

短信服务提供商已自动把需要的`Query`参数和`AppCode`填写好了，直接输入自己的电话号就行了

[点击查看调试工具的控制台完整信息](code/5.7.2.1.2.txt)

![image-20220803190740766](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.2.2.png)

`AppCode`可以在`云市场`里的`已购买的服务`中查看

![image-20220803190422539](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.2.3.png)

收到的短信：

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.2.4.png" alt="无标题" style="zoom: 33%;" />

本服务商的可选模板有以下几种，可以修改`templateId`参数选择想要的模板

| 模版类型       | 模版内容                                                     | templateId                       |
| -------------- | ------------------------------------------------------------ | -------------------------------- |
| 通用验证码     | 验证码：**code**，**minute**分钟内有效，请勿泄漏于他人！     | 908e94ccf08b4476ba6c876d13f084ad |
| 通用验证码     | 验证码：**code**，如非本人操作，请忽略本短信！               | 63698e3463bd490dbc3edc46a20c55f5 |
| 注册验证码     | 验证码：**code**，**minute**分钟内有效，您正在进行注册，若非本人操作，请勿泄露。 | a09602b817fd47e59e7c6e603d3f088d |
| 注册验证码     | 尊敬的用户，您的注册验证码为：**code**，请勿泄漏于他人！     | 305b8db49cdb4b18964ffe255188cb20 |
| 注册验证码     | 验证码：**code**，您正在进行注册操作，感谢您的支持！         | 47990cc6d3ca42e2bbaad2dd06371238 |
| 修改密码验证码 | 验证码：**code**，您正在进行密码重置操作，如非本人操作，请忽略本短信！ | 96d32c69f15a4fbf89410bdba185cbdc |
| 修改密码验证码 | 验证码：**code**，**minute**分钟内有效，您正在进行密码重置操作，请妥善保管账户信息。 | 29833afb9ae94f21a3f66af908d54627 |
| 修改密码验证码 | 验证码：**code**，您正在尝试修改登录密码，请妥善保管账户信息。 | 8166a0ae27b7499fa8bdda1ed12a07bd |
| 身份验证验证码 | 验证码：**code**，您正在进行身份验证，打死不要告诉别人哦！   | d6d95d8fb03c4246b944abcc1ea7efd8 |
| 登录确认验证码 | 验证码：**code**，您正在登录，若非本人操作，请勿泄露。       | f7e31e0d8c264a9c8d6e9756de806767 |
| 登录确认验证码 | 验证码：**code**，**minute**分钟内容有效，您正在登录，若非本人操作，请勿泄露。 | 02551a4313154fe4805794ca069d70bf |
| 登录异常验证码 | 验证码：**code**，您正尝试异地登录，若非本人操作，请勿泄露。 | dd7423a5749840f4ae6836ab31b7839e |
| 登录异常验证码 | 验证码：**code**，**minute**分钟内容有效，您正尝试异地登录，若非本人操作，请勿泄露。 | 81e8a442ea904694a37d2cec6ea6f2bc |
| 信息变更验证码 | 验证码：**code**，您正在尝试变更重要信息，请妥善保管账户信息。 | 9c16efaf248d41c59334e926634b4dc0 |
| 信息变更验证码 | 验证码：**code**，**minute**分钟内容有效，您正在尝试变更重要信息，请妥善保管账户信息。 | ea66d14c664649a69a19a6b47ba028db |

![image-20220803191201175](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.2.5.png)

##### 3、使用`Postman`测试

复制给的调用地址`http(s)://gyytz.market.alicloudapi.com/sms/smsSend`，然后去掉`(s)`，再添加服务商指定的参数

![image-20220803193515856](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.1.png)

在请求`Header`中添加的`Authorization`字段；配置`Authorization`字段的值为`APPCODE ＋ 半角空格 ＋APPCODE值`。

格式如下：

```python
Authorization:APPCODE AppCode值
```

示例如下：

```python
Authorization:APPCODE 3F2504E04F8911D39A0C0305E82C3301
```

![image-20220803193305242](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.2.png)

点击`Postman`里的`Headers`，`KEY`输入`Authorization`，`VALUE`输入自己购买的商品的`AppCode值`

![image-20220803193638377](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.3.png)

我的服务商的请求方式要求是`Post`，因此修改为`Post`方式，然后点击`Send`，可以看到响应里面已经显示`成功`了

```
http://gyytz.market.alicloudapi.com/sms/smsSend?mobile=13xxxxxxx86&param=**code**:54321,**minute**:3&smsSignId=2e65b1bb3d054466b82f0c9d125465e2&templateId=908e94ccf08b4476ba6c876d13f084ad
```

![image-20220803193745906](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.4.png)

收到的短信：

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.5.png" alt="无标2题" style="zoom: 33%;" />

修改以下验证码和模板，然后重新点击`Send`，再次点击发送

```
http://gyytz.market.alicloudapi.com/sms/smsSend?mobile=13xxxxxxx86&param=**code**:565331,**minute**:10&smsSignId=2e65b1bb3d054466b82f0c9d125465e2&templateId=305b8db49cdb4b18964ffe255188cb20
```

响应的内容：

```
{"msg":"成功","smsid":"165952695412518315203379241","code":"0","balance":"18"}
```

![image-20220803194314348](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.6.png)

收到的短信：

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.1.3.7.png" alt="无标3题" style="zoom: 33%;" />

#### 2、使用`java`测试短信接口

##### 1、查看文档

查看服务商提供的`java`代码发送短信的示例代码

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.1.png" alt="image-20220803195021539" style="zoom: 67%;" />

其给的代码如下所示：

```java
public static void main(String[] args) {
	    String host = "https://gyytz.market.alicloudapi.com";
	    String path = "/sms/smsSend";
	    String method = "POST";
	    String appcode = "你自己的AppCode";
	    Map<String, String> headers = new HashMap<String, String>();
	    //最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
	    headers.put("Authorization", "APPCODE " + appcode);
	    Map<String, String> querys = new HashMap<String, String>();
	    querys.put("mobile", "mobile");
	    querys.put("param", "**code**:12345,**minute**:5");
	    querys.put("smsSignId", "2e65b1bb3d054466b82f0c9d125465e2");
	    querys.put("templateId", "908e94ccf08b4476ba6c876d13f084ad");
	    Map<String, String> bodys = new HashMap<String, String>();


	    try {
	    	/**
	    	* 重要提示如下:
	    	* HttpUtils请从
	    	* https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/src/main/java/com/aliyun/api/gateway/demo/util/HttpUtils.java
	    	* 下载
	    	*
	    	* 相应的依赖请参照
	    	* https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/pom.xml
	    	*/
	    	HttpResponse response = HttpUtils.doPost(host, path, method, headers, querys, bodys);
	    	System.out.println(response.toString());
	    	//获取response的body
	    	//System.out.println(EntityUtils.toString(response.getEntity()));
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	}
```

正常返回示例

```json
{
    "msg": "成功", 
    "smsid": "16565614329364584123421", //批次号，该值做为应答及状态报告中的消息ID一一对应。
    "code": "0"
}
```

失败返回示例

```json
{
    "code":"XXXX",
    "msg":"错误提示内容",
    "ILLEGAL_WORDS":["XX","XX"]    // 如有则显示
     // 1、http响应状态码对照表请参考：https://help.aliyun.com/document_detail/43906.html；
     // 2、如果次数用完会返回 403，Quota Exhausted，此时继续购买就可以；
     // 3、如果appCode输入不正确会返回 403，Unauthorized；
}
```

错误码定义

| 错误码 | 错误信息           | 描述                                                         |
| :----- | :----------------- | :----------------------------------------------------------- |
| 1204   | 签名未报备         | 请联系客服申请。                                             |
| 1205   | 签名不可用         | 签名一般为：公司名简称、产品名、商城名称、网站名称、APP名称、系统名称、公众号、小程序名称等等。不可以是纯数字、电话号码或者无意义的签名，如：【温馨提示】【测试】【你好】等； |
| 1302   | 短信内容包含敏感词 | 短信内容包含敏感词                                           |
| 1304   | 短信内容过长       | 短信内容实际长度=短信签名+短信内容。（短信计费方式：70字内按1条计费，超出按67字每条计费；一个汉字、数字、字母、符号都算一个字；带变量短信按实际替换后的长度计费） |
| 1320   | 模板ID不存在       | 请联系客服申请。                                             |
| 1403   | 手机号码不正确     | 手机号码不正确                                               |
| 1905   | 验证未通过         | 验证未通过                                                   |

##### 2、测试

根据提示下载`HttpUtils`工具类，在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty`包里新建`util`文件夹，在`util`文件夹里新建`HttpUtils`类，将提供的`HttpUtils`工具类粘贴到这里面

完整代码： [gulimall-third-party模块的com.atguigu.gulimall.thirdparty.util.HttpUtils类](code/5.7.2.2.2.1.HttpUtils.md)

![image-20220803195801902](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.1.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类里添加`sendSms`方法，对发送短信的接口进行测试

```java
@Test
public void sendSms() {
    String host = "https://gyytz.market.alicloudapi.com";
    String path = "/sms/smsSend";
    String method = "POST";
    String appcode = "你自己的AppCode";
    Map<String, String> headers = new HashMap<String, String>();
    //最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
    headers.put("Authorization", "APPCODE " + appcode);
    Map<String, String> querys = new HashMap<String, String>();
    querys.put("mobile", "要发送的手机号");
    querys.put("param", "**code**:12345,**minute**:5");
    querys.put("smsSignId", "2e65b1bb3d054466b82f0c9d125465e2");
    querys.put("templateId", "908e94ccf08b4476ba6c876d13f084ad");
    Map<String, String> bodys = new HashMap<String, String>();


    try {
        /**
         * 重要提示如下:
         * HttpUtils请从
         * https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/src/main/java/com/aliyun/api/gateway/demo/util/HttpUtils.java
         * 下载
         *
         * 相应的依赖请参照
         * https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/pom.xml
         */
        HttpResponse response = HttpUtils.doPost(host, path, method, headers, querys, bodys);
        System.out.println(response.toString());
        //获取response的body
        System.out.println(EntityUtils.toString(response.getEntity()));
    } catch (Exception e) {
        e.printStackTrace();
    }

}
```

![image-20220803200305027](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.2.png)

测试结果如下，可以看出来把所有的连接信息都显示出来了，而不是想要的`json`数据

```java
HTTP/1.1 200 OK [Date: Wed, 03 Aug 2022 12:03:28 GMT, Content-Type: text/html;charset=utf-8, Content-Length: 80, Connection: keep-alive, Keep-Alive: timeout=25, Access-Control-Allow-Headers: Origin, Accept, x-auth-token,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Server: Jetty(9.4.9.v20180320), X-Ca-Request-Id: E5D22290-F3DF-4827-9DEF-27BA89272C6F, Content-Disposition: inline;filename=f.txt, Access-Control-Allow-Origin: *, X-Ca-Market-Billing-Result: 1, Access-Control-Allow-Credentials: true, Accept-Charset: big5, big5-hkscs, cesu-8, euc-jp, euc-kr, gb18030, gb2312, gbk, ibm-thai, ibm00858, ibm01140, ibm01141, ibm01142, ibm01143, ibm01144, ibm01145, ibm01146, ibm01147, ibm01148, ibm01149, ibm037, ibm1026, ibm1047, ibm273, ibm277, ibm278, ibm280, ibm284, ibm285, ibm290, ibm297, ibm420, ibm424, ibm437, ibm500, ibm775, ibm850, ibm852, ibm855, ibm857, ibm860, ibm861, ibm862, ibm863, ibm864, ibm865, ibm866, ibm868, ibm869, ibm870, ibm871, ibm918, iso-2022-cn, iso-2022-jp, iso-2022-jp-2, iso-2022-kr, iso-8859-1, iso-8859-13, iso-8859-15, iso-8859-2, iso-8859-3, iso-8859-4, iso-8859-5, iso-8859-6, iso-8859-7, iso-8859-8, iso-8859-9, jis_x0201, jis_x0212-1990, koi8-r, koi8-u, shift_jis, tis-620, us-ascii, utf-16, utf-16be, utf-16le, utf-32, utf-32be, utf-32le, utf-8, windows-1250, windows-1251, windows-1252, windows-1253, windows-1254, windows-1255, windows-1256, windows-1257, windows-1258, windows-31j, x-big5-hkscs-2001, x-big5-solaris, x-compound_text, x-euc-jp-linux, x-euc-tw, x-eucjp-open, x-ibm1006, x-ibm1025, x-ibm1046, x-ibm1097, x-ibm1098, x-ibm1112, x-ibm1122, x-ibm1123, x-ibm1124, x-ibm1166, x-ibm1364, x-ibm1381, x-ibm1383, x-ibm300, x-ibm33722, x-ibm737, x-ibm833, x-ibm834, x-ibm856, x-ibm874, x-ibm875, x-ibm921, x-ibm922, x-ibm930, x-ibm933, x-ibm935, x-ibm937, x-ibm939, x-ibm942, x-ibm942c, x-ibm943, x-ibm943c, x-ibm948, x-ibm949, x-ibm949c, x-ibm950, x-ibm964, x-ibm970, x-iscii91, x-iso-2022-cn-cns, x-iso-2022-cn-gb, x-iso-8859-11, x-jis0208, x-jisautodetect, x-johab, x-macarabic, x-maccentraleurope, x-maccroatian, x-maccyrillic, x-macdingbat, x-macgreek, x-machebrew, x-maciceland, x-macroman, x-macromania, x-macsymbol, x-macthai, x-macturkish, x-macukraine, x-ms932_0213, x-ms950-hkscs, x-ms950-hkscs-xp, x-mswin-936, x-pck, x-sjis_0213, x-utf-16le-bom, x-utf-32be-bom, x-utf-32le-bom, x-windows-50220, x-windows-50221, x-windows-874, x-windows-949, x-windows-950, x-windows-iso2022jp, Access-Control-Allow-Methods: POST,GET,OPTIONS, Access-Control-Max-Age: 3600] org.apache.http.conn.BasicManagedEntity@335f5c69
```

![image-20220803200411711](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.3.png)

将` System.out.println(response.toString());`修改为`System.out.println(response.getEntity());`，并在其上打断点

![image-20220803200925114](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.4.png)

以`debug`方式执行`sendSms`方法方法们可以看到请求参数都正常封装了

![image-20220803201512696](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.5.png)

获取到的response也都正常封装了，但是还是没有获取到`json`数据

![image-20220803201238641](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.6.png)

后来发现取消`System.out.println(EntityUtils.toString(response.getEntity()));`的注释就行了，提供的代码已经写好获取`json`数据的方法了:disappointed_relieved:(只不过此手机号单日使用上限已经到了)

![image-20220803201712329](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.7.png)

第二天再次测试，可以看到已经正确封装响应的`json`数据了

```
{"msg":"成功","smsid":"165957496829318315203372267","code":"0","balance":"13"}
```

![image-20220804090324284](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.2.2.8.png)

#### 3、添加短信注册业务

##### 1、编写短信业务代码

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty`包里新建`component`文件夹，在`component`文件夹里添加`SmsComponent`类，在该类里添加发送短信短信的方法

```java
package com.atguigu.gulimall.thirdparty.component;

import com.atguigu.gulimall.thirdparty.util.HttpUtils;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description:
 */
@ConfigurationProperties(prefix = "spring.cloud.alicloud.sms")
@Component
public class SmsComponent {

    private String host;
    private String path;
    private String method;
    private String appcode;
    private String smsSignId;
    private String templateId;


    public void sendSms(String phone,String code) {
        Map<String, String> headers = new HashMap<String, String>();
        //最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
        headers.put("Authorization", "APPCODE " + appcode);
        Map<String, String> querys = new HashMap<String, String>();
        querys.put("mobile", phone);
        querys.put("param", "**code**:"+code+",**minute**:5");
        querys.put("smsSignId", smsSignId);
        querys.put("templateId", templateId);
        Map<String, String> bodys = new HashMap<String, String>();
        try {
            HttpResponse response = HttpUtils.doPost(host, path, method, headers, querys, bodys);
            //System.out.println(response.toString());
            //获取response的body
            System.out.println(EntityUtils.toString(response.getEntity()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

![image-20220803204051612](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.1.1.png)

在`gulimall-third-party`模块的`pom.xml`文件里添加`注释处理器`，使用idea添加自定义配置会有提示

```xml
<!--添加注释处理器(使用idea添加自定义配置会有提示)-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

![image-20220803203214363](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.1.2.png)

在`gulimall-third-party`模块的`src/main/resources/application.yml`配置文件里添加如下配置，用于对短信服务的配置

```yaml
spring:
  cloud:
    alicloud:
      sms:
        host: https://gyytz.market.alicloudapi.com
        path: /sms/smsSend
        method: POST
        appcode: 9448945d840d4a6493c905c145fb0a83
        sms-signId: 2e65b1bb3d054466b82f0c9d125465e2
        templateId: 908e94ccf08b4476ba6c876d13f084ad
```

![image-20220803205817201](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.1.3.png)

##### 2、测试

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类里添加如下测试方法，用来对刚写的短信业务代码进行测试

```java
@Autowired
SmsComponent smsComponent;
@Test
public void testSendCode(){
    smsComponent.sendSms("13235691886","432567");
}
```

执行该测试方法报了空指针异常

```bash
java.lang.NullPointerException
	at com.atguigu.gulimall.thirdparty.util.HttpUtils.wrapClient(HttpUtils.java:283)
	at com.atguigu.gulimall.thirdparty.util.HttpUtils.doPost(HttpUtils.java:82)
	at com.atguigu.gulimall.thirdparty.component.SmsComponent.sendSms(SmsComponent.java:40)
	at com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests.testSendCode(GulimallThirdPartyApplicationTests.java:83)
```

![image-20220803205400993](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.1.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.SmsComponent`类的`sendSms`方法的第一行上打断点，以`debug`方式启动`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类的`testSendCode`方法

可以看到这些配置类里的配置都没有获取到

![image-20220803205527093](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.2.png)

在配置文件里，写以`spring.cloud.alicloud.sms`为前缀的配置会有其他不是刚刚写的配置类里的字段的提示

![image-20220803205847105](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.3.png)

随便选择一个配置属性，然后按住`ctrl`并点击鼠标左键，可以看到`com.alibaba.alicloud.context.sms.SmsProperties`类的前缀也为`spring.cloud.alicloud.sms`，和我们的前缀一样

![image-20220803205711848](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.4.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.SmsComponent`类里，把`@ConfigurationProperties(prefix = "spring.cloud.alicloud.sms")`修改为`@ConfigurationProperties(prefix = "spring.cloud.alicloud.mysms")`，使配置文件的前缀为`spring.cloud.alicloud.mysms`

![image-20220803210502786](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.5.png)

修改`gulimall-third-party`模块的`src/main/resources/application.yml`文件，把`sms`修改为`mysms`，使其前缀为`spring.cloud.alicloud.mysms`

![image-20220803210431739](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.6.png)

再次以`debug`方式启动`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类的`testSendCode`方法，可以看到这些属性还是为`null`

![image-20220803210355776](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.7.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.SmsComponent`类里的`private String host;`字段上添加如下注解，指定注入的配置

```
@Value("spring.cloud.alicloud.mysms.host")
```

可以看到此时`hsot`注入成功了，因此配置文件里的配置没有问题，因此我就想到是没有`set`方法使得容器无法自动注入

![image-20220803210756368](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.8.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.SmsComponent`类上添加`@Data`注解，再次以`debug`方式启动`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类的`testSendCode`方法，可以看到这些属性都已经注入成功了

![image-20220803211319559](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.9.png)

然后点击`Resume Program F9`，执行完该方法，可以看到控制台已经显示成功的`json`数据了

```
{"msg":"成功","smsid":"165957510676018315203379080","code":"0","balance":"12"}
```

![image-20220804090604010](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.10.png)

注意：直接使用`@ConfigurationProperties`注解而不指定具体的类，该注解并不会生效

![image-20220803211138228](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.3.2.11.png)

`@EnableConfigurationProperties`的作用是把`springboot`配置文件中的值与我们的`xxxProperties.java`的属性进行绑定，需要配合`@ConfigurationProperties`使用。

首先我想说的是，不使用`@EnableConfigurationProperties`能否进行属性绑定呢？答案是肯定的！我们只需要给`xxxProperties.java`加上`@Component`注解，把它放到容器中，即可实现属性绑定。



#### 4、邮件服务简单测试

参考：[springboot实现邮箱验证_冰咖啡iii的博客-CSDN博客_springboot邮箱验证](https://blog.csdn.net/qq_25015861/article/details/121416826)

若想使用短信服务，需要开启`POP3/SMTP服务`(邮件发送与接收协议，`邮件发送方`发送到`发送方的邮件服务器`和`发送方的邮件服务器`与`接收方邮件服务器`通讯使用`POP3`协议，`接收方邮件服务器`与`邮件接收方`通讯使用`SMTP`协议)

##### 1、开启邮件服务

打开`QQ邮箱`，点击`设置`里的`账户`

![image-20220803212054406](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.1.1.png)

往下滑，找到`开启服务`里的`POP3/SMTP服务`，点击`开启`按钮，然后根据要求，给指定的电话号码发送短信

![image-20220803212047859](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.1.2.png)

给指定的电话号码发送短信后，即可获得一个`授权码`，复制该授权码

![image-20220803212101247](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.1.3.png)

##### 2、添加依赖

在`gulimall-third-party`模块的`pom.xml`文件里添加如下依赖,引入邮件服务

```xml
<!--邮件服务-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

![image-20220803212334978](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.2.1.png)

在`gulimall-third-party`模块的`src/main/resources/application.properties`文件里添加如下配置，输入自己的`QQ邮箱`与`授权码`(注：不同邮箱的`spring.mail.host`不同)

```properties
spring.mail.username=你的QQ邮箱(xxxxx@qq.com)
spring.mail.password=授权码
spring.mail.host=smtp.qq.com
spring.mail.properties.mail.smtp.ssl.enable=true
spring.mail.default-encoding=UTF-8
server.port=8085
```

![image-20220803212546251](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.2.2.png)

##### 3、测试

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类里进行邮箱服务的简单测试

```java
@Test
public void mailTest() throws MessagingException {
    int count = 1;//默认发送一次
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
    while (count-- != 0) {
        String codeNum = "";
        int[] code = new int[3];
        Random random = new Random();
        //自动生成验证码
        for (int i = 0; i < 6; i++) {
            int num = random.nextInt(10) + 48;
            int uppercase = random.nextInt(26) + 65;
            int lowercase = random.nextInt(26) + 97;
            code[0] = num;
            code[1] = uppercase;
            code[2] = lowercase;
            codeNum += (char) code[random.nextInt(3)];
        }
        System.out.println(codeNum);
        //标题
        helper.setSubject("您的验证码为：" + codeNum);
        //内容
        helper.setText("您好！,您的验证码为：" + "<h2>" + codeNum + "</h2>" + "千万不能告诉别人哦！", true);
        //邮件接收者
        helper.setTo("1966447213@qq.com");
        //邮件发送者，必须和配置文件里的一样，不然授权码匹配不上
        helper.setFrom("447398775@qq.com");
        mailSender.send(mimeMessage);
    }
}
```

![image-20220803214739127](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.3.1.png)

此时打开接收者的`QQ邮箱`，可以看到已经收到邮件了

![image-20220803214723363](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.4.3.2.png)

#### 5、添加邮件服务

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component`包里新建`MailComponent`类，用于邮件发送

```java
package com.atguigu.gulimall.thirdparty.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description:
 */
@Component
public class MailComponent {

    @Autowired
    JavaMailSenderImpl mailSender;
    @Value("spring.mail.username")
    String username;


    public void sendMail(String fromMail,String targetMail,int length) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        String codeNum = generateVerificationCode(length);
        System.out.println(codeNum);
        //标题
        helper.setSubject("您的验证码为：" + codeNum);
        //内容
        helper.setText("您好！,您的验证码为：" + "<h2>" + codeNum + "</h2>" + "千万不能告诉别人哦！", true);
        //邮件发送者，必须和配置文件里的一样，不然授权码匹配不上
        helper.setFrom(fromMail);
        //邮件接收者
        helper.setTo(targetMail);
        mailSender.send(mimeMessage);
        System.out.println("邮件发送成功！");
    }

    public void sendMail(String targetMail,int length) throws MessagingException {
        this.sendMail(username,targetMail,length);
    }

    public void sendMail(String targetMail) throws MessagingException {
        this.sendMail(username,targetMail,6);
    }

    /**
     * 生成指定数目的验证码
     * @param length
     * @return
     */
    private String generateVerificationCode(int length){
        String codeNum = "";
        int[] code = new int[3];
        Random random = new Random();
        //自动生成验证码
        for (int i = 0; i < length; i++) {
            int num = random.nextInt(10) + 48;
            int uppercase = random.nextInt(26) + 65;
            int lowercase = random.nextInt(26) + 97;
            code[0] = num;
            code[1] = uppercase;
            code[2] = lowercase;
            codeNum += (char) code[random.nextInt(3)];
        }
        return codeNum;
    }
}
```

![image-20220803215137800](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.5.1.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplication`测试类了添加如下代码，测试邮件发送服务

```java
@Autowired
MailComponent mailComponent;
@Test
public void sendMailTest() throws MessagingException {
    mailComponent.sendMail("2xxxxxxxx5@qq.com",6);
}
```

可以看到，执行报错了

![image-20220803215423530](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.5.2.png)

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.MailComponent`类的`sendMail(java.lang.String, java.lang.String, int)`方法的第一行打断点，然后以`debug`方式运行`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplication`测试类的`sendMailTest`方法，可以看到`MailComponent`类的`username`字段直接注入了`spring.mail.username`，忘记加`${}`了

![image-20220803215347004](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.5.3.png)

修改`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.MailComponent`类的`username`方法上的`@Value`注解

```java
@Value("${spring.mail.username}")
String username;
```

![image-20220803215813519](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.5.4.png)

再次执行`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplication`测试类的`sendMailTest`方法，这次显示邮件发送成功了

![image-20220803215745860](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.5.5.png)

此时打开接收者的`QQ邮箱`，可以看到已经收到邮件了

![image-20220803215711630](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.5.6.png)

#### 6、远程调用短信服务

##### 1、远程调用`third-party`模块

在`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.controller`包里新建`SmsSendController`类，用于短信发送

```java
package com.atguigu.gulimall.thirdparty.controller;

import com.atguigu.common.utils.R;
import com.atguigu.gulimall.thirdparty.component.SmsComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 无名氏
 * @date 2022/8/4
 * @Description:
 */
@RestController
@RequestMapping("/sms")
public class SmsSendController {

    @Autowired
    SmsComponent smsComponent;

    @GetMapping("/sendCode")
    public R sendCode(@RequestParam("phone") String phone,@RequestParam("code") String code){
        smsComponent.sendSms(phone,code);
        return R.ok();
    }
}
```

![image-20220804092409452](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.1.1.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类里添加`sendCode`方法，用于处理页面的`发送验证码`请求

```java
@GetMapping("/sms/sendCode")
public R sendCode(@RequestParam("phone") String phone){
    return R.ok();
}
```

![image-20220804092128863](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.1.2.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth`包下新建`feign`文件夹，在`feign`文件夹里新建`ThirdPartyFeignService`接口，在这个接口里调用`gulimall-third-party`模块的短信接口

```java
package com.atguigu.gulimall.auth.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author 无名氏
 * @date 2022/8/4
 * @Description:
 */
@FeignClient("gulimall-third-party")
public interface ThirdPartyFeignService {

    @GetMapping("/sms/sendCode")
    public R sendCode(@RequestParam("phone") String phone, @RequestParam("code") String code);

}
```

![image-20220804092504819](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.1.3.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类里修改`sendCode`方法，调用远程`gulimall-third-party`服务的短信接口

```java
@Autowired
ThirdPartyFeignService thirdPartyFeignService;

/**
 * 给指定手机号发送验证码
 * @param phone
 * @return
 */
@ResponseBody
@GetMapping("/sms/sendCode")
public R sendCode(@RequestParam("phone") String phone){
    String code = UUID.randomUUID().toString().substring(0, 5);
    System.out.println(code);
    thirdPartyFeignService.sendCode(phone,code);
    return R.ok();
}
```

![image-20220804093226524](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.1.4.png)

##### 2、前端编写发送短信请求

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里的`建议使用常用手机`的`<input>`标签上添加一个`id`

```java
<input class="phone" id="phoneNum" maxlength="20" type="text" placeholder="建议使用常用手机">
```

![image-20220804093353260](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.2.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件的`<script>`标签里添加如下方法，用于向后端请求短信验证码

```javascript
// 发送验证码
$(function(){
   $("#sendCode").click(function(){
      if($(this).hasClass("disabled")){
         //正在倒计时。
      }else{
         // 给指定手机号发送验证码
         $.get("/sms/sendCode?phone="+$("#phoneNum").val())
         timeoutChangeStyle();
      }
   });
})
var num = 10;
function timeoutChangeStyle() {
   $("#sendCode").attr("class", "disabled");
   if (num == 0) {
      $("#sendCode").text("发送验证码");
      num = 10;
      $("#sendCode").attr("class", "");
   } else {
      var str = num + "s 后再次发送";
      $("#sendCode").text(str);
      setTimeout("timeoutChangeStyle()", 1000);
      num--;
   }
}
```

![image-20220804102603740](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.2.2.png)

##### 3、测试

重启`GulimallThirdPartyApplication`服务和`GulimallAuthServerApplication`服务，在`http://auth.gulimall.com/reg.html`页面里点击发送验证码，可以看到请求已经发送出去了

![image-20220804094540385](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.3.1.png)

打开`GulimallAuthServerApplication`服务的控制台，可以看到随机验证码已经生成成功了

![image-20220804094624295](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.3.2.png)

切换到`GulimallThirdPartyApplication`服务的控制台，已经显示短信发送成功的`json`数据了

```json
{"msg":"成功","smsid":"165957748665518315203378720","code":"0","balance":"11"}
```

![image-20220804094619237](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.3.3.png)

##### 4、优化短信接口

由于后端没有时长限制，别人获取到该发送短信的接口后，可能会不断地向该接口发送请求，导致消耗资源（前端也暴露了短信接口，也容易获取到短信接口。其次如果`发送验证码`在倒计时，用户刷新页面又可以点击`发送送验证码`了）因此可以把`用途+发送验证码的手机`存入`redis`，并设置过期时间，如果`reids`又该信息就不让注册

在`gulimall-auth-server`模块的`pom.xml`文件里引入`redis`

```xml
<!--引入redis-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

![image-20220804102816791](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.1.png)

在`gulimall-auth-server`模块的`src/main/resources/application.properties`配置文件里配置主机地址和端口

```properties
spring.redis.host=192.168.56.10
spring.redis.port=6379
```

![image-20220804102952554](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.2.png)

在`gulimall-common`模块的`com.atguigu.common.constant`包下新建`auth`文件夹，在`auth`文件夹里新建`AuthServerConstant`类，在里面存放`注册账户的短信验证码前缀`

```java
package com.atguigu.common.constant.auth;

/**
 * @author 无名氏
 * @date 2022/8/4
 * @Description:
 */
public class AuthServerConstant {

    /**
     * 短信验证码前缀
     */
    public static final String SMS_CODE_CACHE_PREFIX = "sms:code:";
}
```

![image-20220804103452075](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.3.png)

并在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加`同一手机号获取验证码频率太高错误`的类型枚举

```java
/**
 * 同一手机号获取验证码频率太高
 */
SMS_CODE_EXCEPTION(10002,"验证码获取频率太高，请稍后再试"),
```

![image-20220804104928293](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.4.png)

修改`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.component.SmsComponent`类的`sendSms`方法

```java
/**
 * 给指定手机号发送验证码
 * @param phone
 * @return
 */
@ResponseBody
@GetMapping("/sms/sendCode")
public R sendCode(@RequestParam("phone") String phone){
    //TODO 接口防刷
    String redisCode = stringRedisTemplate.opsForValue().get(AuthServerConstant.SMS_CODE_CACHE_PREFIX + phone);
    //如果redis有该手机号的验证码，如果有则判断是否过了60s。如果没有证明没有发送过验证码，直接发送验证码
    if (StringUtils.hasText(redisCode)){
        String[] s = redisCode.split("_");
        if (s.length==2 && StringUtils.hasText(s[0])){
            long startTime = Long.parseLong(s[1]);
            if (System.currentTimeMillis() - startTime < 60*1000){
                //同一手机号获取验证码频率太高
                return R.error(BizCodeException.SMS_CODE_EXCEPTION);
            }
        }else {
            return R.error();
        }
    }
    String code = UUID.randomUUID().toString().substring(0, 5);
    //在code后添加当前系统时间，判断是否过了一分钟，防止同一个phone在60秒内再次发送验证码(用户刷新页面、拿接口直接发)
    String redisValue = code +"_" +System.currentTimeMillis();
    System.out.println(code);
    //redis中缓存验证码再次校验  sms:code:17512080612 -> 45678_系统时间

    stringRedisTemplate.opsForValue().set(AuthServerConstant.SMS_CODE_CACHE_PREFIX+phone,redisValue,
            10, TimeUnit.MINUTES);
    thirdPartyFeignService.sendCode(phone,code);
    return R.ok();
}
```

![image-20220804110941872](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.5.png)

修改`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件的`<script>`标签里的`id`为`sendCode`的点击事件，获取发送验证码的返回值，如果状态码不等于`0`就弹出对话框，告诉用户`msg`的信息

```javascript
// 发送验证码
$(function(){
   $("#sendCode").click(function(){
      if($(this).hasClass("disabled")){
         //正在倒计时。
      }else{
         // 给指定手机号发送验证码
         $.get("/sms/sendCode?phone="+$("#phoneNum").val(),function (data) {
            if (data.code !=0){
               alert(data.msg)
            }
         })
         timeoutChangeStyle();
      }
   });
})
```

![image-20220804111315736](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.6.png)

在`auth.gulimall.com/reg.html`页面里点击`发送验证码`，然后刷新页面再次点击`发送验证码`

![image-20220804110419877](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.7.png)

可以看到，此时弹出了`验证码获取频率太高，请稍后再试`的提示框

![image-20220804110422242](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.8.png)

此时也可以看到`sms:code:手机号`为`key`的数据

![image-20220804111113269](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.6.4.9.png)

#### 7、注册

##### 1、编写注册代码

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth`包里新建`vo`文件夹，在`vo`文件夹里新建`UserRegisterVo`类，用于封装注册所填写的信息

```java
package com.atguigu.gulimall.auth.vo;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @author 无名氏
 * @date 2022/8/4
 * @Description: 注册表单
 */
@Data
public class UserRegisterVo {

    /**
     * 用户名
     */
    @NotNull(message = "用户名必须填写")
    @Length(min = 6,max = 18,message = "用户名必须是6-18位字符")
    private String username;
    /**
     * 密码
     */
    @NotNull(message = "密码必须填写")
    @Length(min = 6,max = 18,message = "密码必须是6- 18位字符")
    private String password;
    /**
     * 手机号
     */
    @NotNull(message = "手机号必须填写")
    @Pattern(regexp = "^[1]([3-9])[0-9]{9}$",message = "手机号格式不正确")
    private String phone;
    /**
     * 验证码
     */
    @NotNull(message = "验证码必须填写")
    private String code;
}
```

![image-20220805145043209](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.1.1.png)

在`auth.gulimall.com/reg.html`页面里，打开控制台，定位到`立 即 注 册`，复制`立 即 注 册`

![image-20220805150325410](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.1.2.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`类里搜索`立 即 注 册`

给`立 即 注 册`所在的`<section>`标签里套上一个`<form>`标签

![image-20220805150614747](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.1.3.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`类里修改`立 即 注 册`所在的`<section>`标签里的部分代码

```html
<form action="/regist" method="post" class="one">
   <div class="register-box">
      <label class="username_label">
         用 户 名
<input maxlength="20" name="username" type="text" placeholder="您的用户名和登录名" >
      </label>
      <div class="tips">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">
         设 置 密 码
<input maxlength="20" name="password" type="password" placeholder="建议至少使用两种字符组合">
</label>
      <div class="tips">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">确 认 密 码
<input maxlength="20" type="password" placeholder="请再次输入密码">
</label>
      <div class="tips">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">
<span>中国 0086∨</span>
<input class="phone" name="phone" id="phoneNum" maxlength="20" type="text" placeholder="建议使用常用手机">
</label>
      <div class="tips">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">验 证 码
<input maxlength="20" name="code" type="text" placeholder="请输入验证码" class="caa">
</label>
      <!--<span id="code"></span>-->
      <a id="sendCode">发送验证码</a>
      <!--<div class="tips">-->

      <!--</div>-->
   </div>
   <div class="arguement">
      <input type="checkbox" id="xieyi"> 阅读并同意
      <a href="#">《谷粒商城用户注册协议》</a>
      <a href="#">《隐私政策》</a>
      <div class="tips">

      </div>
      <br />
      <div class="submit_btn">
         <button type="submit" id="submit_btn">立 即 注 册</button>
      </div>
   </div>

</form>
```

![image-20220805152346218](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.1.4.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类的`regist`方法

```java
@PostMapping("/regist")
public String regist(@Valid UserRegisterVo userRegisterVo, BindingResult bindingResult, Model model){
    if (bindingResult.hasErrors()){
        Map<String, String> errors = bindingResult.getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        model.addAttribute("errors",errors);
        return "forward:/reg.html";
    }
    //调用远程服务注册

    //注册成功，回到登录页
    // (需要经过GulimallWebConfig类 registry.addViewController("/login.html").setViewName("login");)
    //再跳转到login的视图
    return "redirect:/login.html";
}
```

![image-20220805153236781](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.1.5.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里，将`提交按钮`注释下面的方法注释起来

![image-20220805152530066](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.1.6.png)

##### 2、测试

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类的`regist`方法的第一行打上断点，以`debug`方式启动`GulimallAuthServerApplication`服务

![image-20220805152735520](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.2.1.png)

在`http://auth.gulimall.com/reg.html`页面里随便输入数据，然后点击立即注册

![image-20220805152853881](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.2.2.png)

切换到`IDEA`，可以看到后端的这些校验都正常判断出来了

![image-20220805153011626](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.2.3.png)

取消断点，刷新`http://auth.gulimall.com/reg.html`页面，再次随便输入数据，然后点击立即注册，此时页面显示`Request method 'POST' not supported`

![image-20220805154114694](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.2.4.png)

打开`GulimallAuthServerApplication`服务的控制台，显示如下警告

```
[org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]
```

 `/regist`的请求方式为`POST`，转发将请求原封不动的发给了`/reg.html`，因此发送的使`POST`方式的请求，而`/reg.html`的路径映射的请求方式为`GET`(在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config.GulimallWebConfig`类的`addViewControllers`方法里配置的)

![image-20220805154123738](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.2.5.png)

将`return "forward:/reg.html";`修改为`return "reg";`，直接返回`reg.html`，而不是转发给`/reg.html`的映射

![image-20220805154609954](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.2.6.png)

##### 3、修改页面

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里的`<html>`标签里添加`xmlns:th="http://www.thymeleaf.org"`，引入`thymeleaf`

```html
<html xmlns:th="http://www.thymeleaf.org">
```

![image-20220805153328969](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.1.png)

在`用 户 名`对应的`class="tips"`的`<div>`标签上加上`th:text="${errors!=null?errors.username:''}"`属性

在`设 置 密 码`对应的`class="tips"`的`<div>`标签上加上`th:text="${errors!=null?errors.password:''}"`属性`

在`中国 0086∨`对应的`class="tips"`的`<div>`标签上加上`th:text="${errors!=null?errors.phone:''}"`属性`

在`发送验证码`相应的位置加上`<div class="tips" th:text="${errors!=null?errors.phone:''}"></div>`

![image-20220805155749434](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.2.png)

在`http://auth.gulimall.com/reg.html`页面里随便输入数据，然后点击立即注册，来到了`http://auth.gulimall.com/regist`页面，点击`同意并继续`无反应

![image-20220805155946328](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.3.png)

打开`GulimallAuthServerApplication`服务的控制台，报了如下错误：(code字段没有找到)

```
Caused by: org.attoparser.ParseException: Exception evaluating SpringEL expression: "errors!=null?errors.code:''" (template: "reg" - line 5054, col 24)

Caused by: org.thymeleaf.exceptions.TemplateProcessingException: Exception evaluating SpringEL expression: "errors!=null?errors.code:''" (template: "reg" - line 5054, col 24)

Caused by: org.springframework.expression.spel.SpelEvaluationException: EL1008E: Property or field 'code' cannot be found on object of type 'java.util.HashMap' - maybe not public or not valid?
```

![image-20220805160353885](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.4.png)

修改`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里的`<form>`表单，对所有字段都判断是否为空

```html
<form action="/regist" method="post" class="one">
   <div class="register-box">
      <label class="username_label">
         用 户 名
<input maxlength="20" name="username" type="text" placeholder="您的用户名和登录名" >
      </label>
      <div class="tips" style="color: red" th:text="${errors!=null?(#maps.containsKey(errors,'username')?errors.username:''):''}">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">
         设 置 密 码
<input maxlength="20" name="password" type="password" placeholder="建议至少使用两种字符组合">
</label>
      <div class="tips" style="color: red" th:text="${errors!=null?(#maps.containsKey(errors,'password')?errors.password:''):''}">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">确 认 密 码
<input maxlength="20" type="password" placeholder="请再次输入密码">
</label>
      <div class="tips">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">
<span>中国 0086∨</span>
<input class="phone" name="phone" id="phoneNum" maxlength="20" type="text" placeholder="建议使用常用手机">
</label>
      <div class="tips" style="color: red" th:text="${errors!=null?(#maps.containsKey(errors,'phone')?errors.phone:''):''}">

      </div>
   </div>
   <div class="register-box">
      <label class="other_label">验 证 码
<input maxlength="20" name="code" type="text" placeholder="请输入验证码" class="caa">
</label>
      <!--<span id="code"></span>-->
      <a id="sendCode">发送验证码</a>
      <div class="tips" style="color: red" th:text="${errors!=null?(#maps.containsKey(errors,'code')?errors.code:''):''}">

      </div>
   </div>
   <div class="arguement">
      <input type="checkbox" id="xieyi"> 阅读并同意
      <a href="#">《谷粒商城用户注册协议》</a>
      <a href="#">《隐私政策》</a>
      <div class="tips">

      </div>
      <br />
      <div class="submit_btn">
         <button type="submit" id="submit_btn">立 即 注 册</button>
      </div>
   </div>

</form>
```

![image-20220805161711958](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.5.png)

直接返回页面导致`url`路径不变，所以再次刷新页面还是发送表单提交的那个请求，就会弹出如下提示框

```
确认重新提交表单
您所查找的网页要使用已输入的信息。返回此页可能需要重复已进行的所有操作。是否要继续操作?
```

![image-20220805161117226](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.6.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类的`regist`方法，使用重定向的方式返回页面。

可以调用`RedirectAttributes`类的`redirectAttributes.addFlashAttribute("errors",errors);`方法，来添加一个一闪而过的属性(只能取一次)。当然也可以使用常规的`redirectAttributes.addAttribute("errors",errors);`方法，不过最好只取一次，获取到数据后就删除提示信息

```java
/**
 *
 * @param userRegisterVo
 * @param bindingResult 校验失败的错误信息
 * @param redirectAttributes 重定向携带数据
 * @return
 */
@PostMapping("/regist")
public String regist(@Valid UserRegisterVo userRegisterVo, BindingResult bindingResult, RedirectAttributes redirectAttributes){
    if (bindingResult.hasErrors()){
        Map<String, String> errors = bindingResult.getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        //添加一个一闪而过的属性(只需要取一次)
        redirectAttributes.addFlashAttribute("errors",errors);
        //  /regist为Post方式，转发将请求原封不动的发给了/reg.html，而/reg.html的路径映射的请求方式为GET
        return "redirect:/reg.html";
        //return "reg";
    }
    //调用远程服务注册

    //注册成功，回到登录页
    // (需要经过GulimallWebConfig类 registry.addViewController("/login.html").setViewName("login");)
    //再跳转到login的视图
    return "redirect:/login.html";
}
```

![image-20220805162618835](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.7.png)

在`http://auth.gulimall.com/reg.html`页面里，随便输入数据，然后点击`立即注册`，此时跳转到了`http://10.66.114.92:20000/reg.html`页面，使用了本服务器的`以太网ip`，而不是域名的方式

![GIF 2022-8-5 16-26-51](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.8.gif)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类的`regist`方法，使用域名方式重定向页面

```java
/**
 * TODO 重定向携带数据，利用session原理。将数据放在session中。只要跳到下一个页面取出这个数据以后，session里面的数据就会删掉
 * @param userRegisterVo
 * @param bindingResult 校验失败的错误信息
 * @param redirectAttributes 重定向携带数据
 * @return
 */
@PostMapping("/regist")
public String regist(@Valid UserRegisterVo userRegisterVo, BindingResult bindingResult, RedirectAttributes redirectAttributes){
    if (bindingResult.hasErrors()){
        Map<String, String> errors = bindingResult.getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        //添加一个一闪而过的属性(只需要取一次)
        redirectAttributes.addFlashAttribute("errors",errors);
        //  /regist为Post方式，转发将请求原封不动的发给了/reg.html，而/reg.html的路径映射的请求方式为GET
        return "redirect:http://auth.gulimall.com/reg.html";
        //return "reg";
    }
    //调用远程服务注册

    //注册成功，回到登录页
    // (需要经过GulimallWebConfig类 registry.addViewController("/login.html").setViewName("login");)
    //再跳转到login的视图
    return "redirect:/login.html";
}
```

![image-20220805163358815](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.9.png)

重启`GulimallAuthServerApplication`服务，在`http://auth.gulimall.com/reg.html`页面里，随便输入数据，然后点击`立即注册`，此正确跳转到了`http://auth.gulimall.com/reg.html`页面

```
重定向携带数据，利用session原理。将数据放在session中。只要跳到下一个页面取出这个数据以后，session里面的数据就会删掉。不过分布式项目使用session会有很多问题
```

![GIF 2022-8-5 16-32-37](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.3.10.gif)

##### 4、调用会员服务

在`gulimall-member`模块的`com.atguigu.gulimall.member`包下新建`vo`文件夹，在`vo`文件夹里新建`MemberRegistVo`类，用于注册会员

```java
package com.atguigu.gulimall.member.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/5
 * @Description:
 */
@Data
public class MemberRegistVo {

    private String username;

    private String password;

    private String phone;
}
```

![image-20220805170602941](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.1.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberController`类里新建`regist`方法

```java
@PostMapping("/regist")
public R regist(@RequestBody MemberRegistVo vo){
    memberService.regist(vo);
    return R.ok();
}
```

![image-20220805165310321](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.MemberService`接口里添加`regist`抽象方法

```java
void regist(MemberRegistVo vo);
```

![image-20220805165338879](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.3.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类里实现`regist`抽象方法

```java
@Autowired
MemberLevelDao memberLevelDao;

@Override
public void regist(MemberRegistVo vo) {
    MemberDao baseMapper = this.baseMapper;
    MemberEntity memberEntity = new MemberEntity();

    MemberLevelEntity memberLevelEntity = memberLevelDao.getDefaultLevel();
    memberEntity.setLevelId(memberLevelEntity.getId());

    //检查手机号和用户名是否唯一，使用异常机制
    checkPhoneUnique(vo.getPhone());
    checkUsernameUnique(vo.getUsername());
    
    memberEntity.setMobile(vo.getPhone());
    memberEntity.setUsername(vo.getUsername());
    //TODO 密码加密存储
    memberEntity.setPassword(vo.getPassword());

    baseMapper.insert(memberEntity);
}
```

![image-20220805171242685](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.dao.MemberLevelDao`接口里添加`getDefaultLevel`抽象方法

```java
MemberLevelEntity getDefaultLevel();
```

![image-20220805171336691](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.5.png)

`gulimall_ums`数据库的`ums_member_level`表里的`default_status`字段，标识了当前用户的默认等级

![image-20220805171519674](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.6.png)

在`gulimall-member`模块的`src/main/resources/mapper/member/MemberLevelDao.xml`文件里添加`id="getDefaultLevel"`的`sql`语句，用于查询用户默认等级

```xml
<select id="getDefaultLevel" resultType="com.atguigu.gulimall.member.entity.MemberLevelEntity">
    select * from gulimall_ums.ums_member_level where default_status=1
</select>
```

![image-20220805171717875](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.7.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member`包里新建`exception`文件夹，在`exception`文件夹里新建`UsernameExistException`类，用于抛出`用户名存在`的异常

```java
package com.atguigu.gulimall.member.exception;

/**
 * @author 无名氏
 * @date 2022/8/5
 * @Description:
 */
public class UsernameExistException extends RuntimeException{
    public UsernameExistException(){
        super("用户名存在");
    }
}
```

![image-20220805171953569](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.8.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.exception`包里新建`PhoneExistException`类，用于抛出`手机号存在`的异常

```java
package com.atguigu.gulimall.member.exception;

/**
 * @author 无名氏
 * @date 2022/8/5
 * @Description:
 */
public class PhoneExistException extends RuntimeException{
    public PhoneExistException() {
        super("手机号存在");
    }
}
```

![image-20220805172115826](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.9.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类里添加`checkUsernameUnique`方法和`checkPhoneUnique`方法

```java
@Override
private void checkUsernameUnique(String username) throws UsernameExistException{
    LambdaQueryWrapper<MemberEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(MemberEntity::getUsername, username);
    Integer count = this.baseMapper.selectCount(lambdaQueryWrapper);
    if (count > 0) {
        throw new UsernameExistException();
    }
}

@Override
private void checkPhoneUnique(String phone) throws PhoneExistException{
    LambdaQueryWrapper<MemberEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(MemberEntity::getMobile, phone);
    Integer count = this.baseMapper.selectCount(lambdaQueryWrapper);
    if (count > 0) {
        throw new PhoneExistException();
    }
}
```

![image-20220805172707071](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.10.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.MemberService`接口里添加`checkUsernameUnique`抽象方法和`checkPhoneUnique`抽象方法

```java
void checkUsernameUnique(String username) throws UsernameExistException;

void checkPhoneUnique(String phone) throws PhoneExistException;
```

![image-20220805172743895](https://gitlab.com/apzs/image/-/raw/master/image/5.7.2.7.4.11.png)

### 5.7.3、MD5盐值加密

#### 1、对用户密码进行加密

**MD5**：Message Digest algorithm 5，信息摘要算法

优点：

- 压缩性：任意长度的数据，算出的MD5值长度都是固定的。
- 容易计算：从原数据计算出MD5值很容易。
- 抗修改性：对原数据进行任何改动，哪怕只修改1个字节，所得到的MD5值都有很大区别。
- 强抗碰撞：想找到两个不同的数据，使它们具有相同的MD5值，是非常困难的。
- 不可逆

但是一个`明文`(加密后)对应一个唯一的`密文`(加密前)，只要维护一个彩虹表，记录`明文`和对应的`密文`，如果`密文`使用的是弱密码，可以直接根据`明文`查找密码表，就可以知道`密文`

**加盐**

- 通过生成随机数与MD5生成字符串进行组合
- 数据库同时存储MD5值与salt值。验证正确性时使用salt进行MD5即可

在`gulimall-member`模块的`com.atguigu.gulimall.member.GulimallMemberApplicationTests`测试类的`contextLoads`方法里测试常见的加密方式

```java
@Test
public void contextLoads() {
   //e10adc3949ba59abbe56e057f20f883e
   //抗修改性:彩虹表。 123456->>xx
   //1234567- >dddd
   String s1 = DigestUtils.md5Hex("123456");
   System.out.println("s1=>" + s1);
    
   //MD5不能直接进行密码的加密存储;
   //"123456 "+System.currentTimeMillis();
   //盐值加密;随机值加盐: $1$+8位字符
   //$1$q4yw9ojS$YQk9WvivLoEWT04q/Fr2q1
   String s2 = Md5Crypt.md5Crypt("123456".getBytes());
   System.out.println("s2=>"+s2);
   //$1$qqqqqqqq$AZofg3QwurbxV3KEOzwuI1
   //验证: 123456进行盐值(去数据库查)加密
   String s3 = Md5Crypt.md5Crypt ( "123456".getBytes(),"$1$qqqqqqqq");
   System. out.println("s3=>"+s3);
    
   BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
   //$2a$10$4li09amFs0Tfof8Y/0PjKe0ZWngU5tMHuAYNUkyGiM/2FuJ25oeBi
   String encode = passwordEncoder.encode("123456");
   System.out.println(encode);
   boolean matches = passwordEncoder.matches("123456",
         "$2a$10$4li09amFs0Tfof8Y/0PjKe0ZWngU5tMHuAYNUkyGiM/2FuJ25oeBi");
   System.out.println(matches);
}
```

测试结果：

```
s1=>e10adc3949ba59abbe56e057f20f883e
s2=>$1$oOb6v3rn$FsjQJmtHzO1Bm/CGUAhNH1
s3=>$1$qqqqqqqq$AZofg3QwurbxV3KEOzwuI1
$2a$10$dR0/M9hUPbHxqgrjqjv5xeA2JxKNDu5CLfn/wTcSF/JUD8BVR0Uc.
true
```

![image-20220805192733343](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.1.1.png)

修改`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`regist`方法，使其使用`加盐的md5`来存储密文

```java
@Override
public void regist(MemberRegistVo vo) {
    MemberDao baseMapper = this.baseMapper;
    MemberEntity memberEntity = new MemberEntity();

    MemberLevelEntity memberLevelEntity = memberLevelDao.getDefaultLevel();
    memberEntity.setLevelId(memberLevelEntity.getId());

    //检查手机号和用户名是否唯一，使用异常机制
    checkPhoneUnique(vo.getPhone());
    checkUsernameUnique(vo.getUsername());

    memberEntity.setMobile(vo.getPhone());
    memberEntity.setUsername(vo.getUsername());
    //盐值加密
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    String encode = bCryptPasswordEncoder.encode(vo.getPassword());
    memberEntity.setPassword(encode);

    baseMapper.insert(memberEntity);
}
```

![image-20220805200911397](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.1.2.png)

#### 2、远程调用`member`服务

##### 1、添加错误信息

在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加如下两个枚举

```java
/**
 * 用户名重复
 */
USER_EXIST_EXCEPTION(15001,"用户存在"),
/**
 * 手机号重复
 */
PHONE_EXIST_EXCEPTION(15002,"手机号存在");
```

![image-20220805193459836](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.1.1.png)

修改`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberController`类的`regist`方法，捕获`用户名重复`和`手机号重复`的异常

```java
@PostMapping("/regist")
public R regist(@RequestBody MemberRegistVo vo){
    try {
        memberService.regist(vo);
    } catch (UsernameExistException e) {
        return R.error(BizCodeException.USER_EXIST_EXCEPTION);
    }catch (PhoneExistException e){
        return R.error(BizCodeException.PHONE_EXIST_EXCEPTION);
    }
    return R.ok();
}
```

![image-20220805193835367](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.1.2.png)

##### 2、远程调用会员服务

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.feign`包里新建`MemberFeignService`接口，用于调用会员服务

```java
package com.atguigu.gulimall.auth.feign;

import com.atguigu.common.utils.R;
import com.atguigu.gulimall.auth.vo.UserRegisterVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * @author 无名氏
 * @date 2022/8/5
 * @Description:
 */
@FeignClient("gulimall-member")
public interface MemberFeignService {

    @PostMapping("/member/member/regist")
    public R regist(@RequestBody UserRegisterVo vo);
}
```

![image-20220805194153146](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.2.1.png)

在`gulimall-common`模块的`com.atguigu.common.utils.R`类里添加`getMsg`方法，用于获取消息

```java
public String getMsg(){
   return (String) this.get("msg");
}
```

![image-20220805194951039](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.2.2.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类的`regist`方法，调用远程的会员服务，完成注册

```java
/**
 * TODO 重定向携带数据，利用session原理。将数据放在session中。只要跳到下一个页面取出这个数据以后，session里面的数据就会删掉
 * @param userRegisterVo
 * @param bindingResult 校验失败的错误信息
 * @param redirectAttributes 重定向携带数据
 * @return
 */
@PostMapping("/regist")
public String regist(@Valid UserRegisterVo userRegisterVo, BindingResult bindingResult, RedirectAttributes redirectAttributes){
    if (bindingResult.hasErrors()){
        Map<String, String> errors = bindingResult.getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        //添加一个一闪而过的属性(只需要取一次)
        redirectAttributes.addFlashAttribute("errors",errors);
        //  /regist为Post方式，转发将请求原封不动的发给了/reg.html，而/reg.html的路径映射的请求方式为GET
        return "redirect:http://auth.gulimall.com/reg.html";
        //return "reg";
    }
    //调用远程服务注册
    String code = userRegisterVo.getCode();
    String key = AuthServerConstant.SMS_CODE_CACHE_PREFIX + userRegisterVo.getPhone();
    String redisCode = stringRedisTemplate.opsForValue().get(key);
    if (StringUtils.hasText(redisCode)){
        if (redisCode.contains("_") && code.equals(redisCode.split("_")[0])){
            stringRedisTemplate.delete(key);
            R r = memberFeignService.regist(userRegisterVo);
            if (r.getCode()==0){
                //注册成功，回到登录页
                // (需要经过GulimallWebConfig类 registry.addViewController("/login.html").setViewName("login");)
                //再跳转到login的视图
                return "redirect:http://auth.gulimall.com/login.html";
            }else {
                Map<String, String> errors = new HashMap<>();
                errors.put("msg",r.getMsg());
                redirectAttributes.addFlashAttribute("errors",errors);
                return "redirect:http://auth.gulimall.com/reg.html";
            }

        }
    }
    Map<String, String> errors = new HashMap<>();
    errors.put("code","验证码错误");
    redirectAttributes.addFlashAttribute("errors",errors);
    return "redirect:http://auth.gulimall.com/reg.html";
}
```

![image-20220805200325158](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.2.3.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/reg.html`文件里的`<form>`标签的下面添加如下代码，用于获取注册失败的错误提示

```html
<div class="tips" style="color: red"
    th:text="${errors!=null?(#maps.containsKey(errors,'msg')?errors.msg:''):''}">
</div>
```

![image-20220805195512378](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.2.4.png)

重启`GulimallAuthServerApplication`服务和`GulimallMemberApplication`服务

在`http://auth.gulimall.com/reg.html`页面填完信息提交后，成功来到了登录页`http://auth.gulimall.com/login.html`

![image-20220805200605614](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.2.5.png)

打开`Navicat`，查看`gulimall_ums`数据库的`ums_member`表,可以看到刚刚注册的账户已经添加进来了，密码也是用的密文

![image-20220805201315222](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.2.2.6.png)

#### 3、用户登录

##### 1、编写`auth-server`模块

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.vo`包里新建`UserLoginVo`类，用于封装用户登录所需要的数据

```java
package com.atguigu.gulimall.auth.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/5
 * @Description:
 */
@Data
public class UserLoginVo {

    /**
     * 登录的账号(邮箱/用户名/手机号)
     */
    private String loginAccount;
    /**
     * 密码
     */
    private String password;
}
```

![image-20220805201802057](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.1.1.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类里添加`login`方法，用于用户登录

页面传递的参数为`url`里的`k，v`，因此该方法上不加`@RequestBody`注解

```java
@PostMapping("/login")
public String login(UserLoginVo vo){

    return "redirect:http://gulimall.com";
}
```

![image-20220805210151060](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.1.2.png)

在`http://auth.gulimall.com/login.html`页面里，打开控制台，定位到`登录`，复制`登 &nbsp; &nbsp;录`

![image-20220805202828971](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.1.3.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件里搜索`登 &nbsp; &nbsp;录`，将`登 &nbsp; &nbsp;录`的`<button>`标签类型设置为`submit`，在`登 &nbsp; &nbsp;录`所在的`ul`外围加一个`<form>`，删掉登录左边的`<a class="a">`和右边的`</a>`，给用户名和密码各一个`name`，方便取值

```html
<form action="/login" method="post">
   <ul>
      <li class="top_1">
         <img src="/static/login/JD_img/user_03.png" class="err_img1" />
         <input type="text" name="loginAccount" placeholder=" 邮箱/用户名/已验证手机" class="user" />
      </li>
      <li>
         <img src="/static/login/JD_img/user_06.png" class="err_img2" />
         <input type="password" name="password" placeholder=" 密码" class="password" />
      </li>
      <li class="bri">
         <a href="">忘记密码</a>
      </li>
      <li class="ent"><button class="btn2" type="submit">登 &nbsp; &nbsp;录</button></li>
   </ul>
</form>
```

![image-20220805202926997](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.1.4.png)

##### 2、编写`member`模块

在`gulimall-member`模块的`com.atguigu.gulimall.member.vo`包里新建`MemberLoginVo`类，用于封装`gulimall-auth-server`模块调用本模块进行登录所需要的数据

```java
package com.atguigu.gulimall.member.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/5
 * @Description:
 */
@Data
public class MemberLoginVo {
    /**
     * 登录的账号(邮箱/用户名/手机号)
     */
    private String loginAccount;
    /**
     * 密码
     */
    private String password;
}
```

![image-20220805203945860](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.2.1.png)

在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加`登录的账号或密码错误 或 该用户不存在`的枚举

```java
/**
 * 登录的账号或密码错误 或 该用户不存在
 */
ACCOUNT_PASSWORD_INVALID_EXCEPTION(15003,"账号或密码错误");
```

![image-20220805205824129](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.2.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberController`类里添加`login`方法用于查找数据库，处理`gulimall-auth-server`模块登录请求

```java
@PostMapping("/login")
public R login(@RequestBody MemberLoginVo vo){
    MemberEntity entity = memberService.login(vo);
    if (entity!=null) {
        return R.ok().put("data", entity);
    }else {
        return R.error(BizCodeException.ACCOUNT_PASSWORD_INVALID_EXCEPTION);
    }
}
```

![image-20220805210002751](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.2.3.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.MemberService`接口里添加`login`抽象方法

```java
MemberEntity login(MemberLoginVo vo);
```

![image-20220805204448949](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.2.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类里实现`login`抽象方法

```java
@Override
public MemberEntity login(MemberLoginVo vo) {
    LambdaQueryWrapper<MemberEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(MemberEntity::getUsername,vo.getLoginAccount())
            .or().eq(MemberEntity::getMobile,vo.getLoginAccount())
            .or().eq(MemberEntity::getEmail,vo.getLoginAccount());
    MemberEntity memberEntity = this.baseMapper.selectOne(lambdaQueryWrapper);
    if (memberEntity==null){
        return null;
    }
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    boolean matches = bCryptPasswordEncoder.matches(vo.getPassword(), memberEntity.getPassword());
    if (matches){
        return memberEntity;
    }else {
        return null;
    }
}
```

![image-20220805205332991](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.2.5.png)

##### 3、调用`member`服务

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.feign.MemberFeignService`类里添加`login`方法，用于调用`member`服务的登录接口

```java
@PostMapping("/member/member/login")
public R login(@RequestBody UserLoginVo vo);
```

![image-20220805210346363](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.3.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/login.html`类里的`<html>`标签里添加`xmlns:th="http://www.thymeleaf.org"`属性，引入`thymeleaf`

```html
<html xmlns:th="http://www.thymeleaf.org">
```

![image-20220805211142366](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.3.2.png)

在`<form>`标签下，加入如下代码，用于提醒登录失败

```html
<div  style="color: red"
     th:text="${errors!=null?(#maps.containsKey(errors,'msg')?errors.msg:''):''}">
</div>
```

![image-20220805211230010](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.3.3.png)

重启`GulimallAuthServerApplication`服务和`GulimallMemberApplication`服务，在`http://auth.gulimall.com/login.html`页面里进行登录，可以看到当登录失败时，会有失败的提示（就是有点丑）

![GIF 2022-8-5 21-17-02](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.3.4.gif)

在`http://auth.gulimall.com/login.html`页面里输入正确的账户和密码，点击登录，可以正确来到`http://gulimall.com`页面

![GIF 2022-8-5 21-19-03](https://gitlab.com/apzs/image/-/raw/master/image/5.7.3.3.3.5.gif)



### 5.7.4、社交登录

社交登录流程图

![image-20220805213414019](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.0.png)

#### 1、社交登录流程

##### 1、OAuth2.0概述

OAuth2.0较1.0相比，整个授权验证流程更简单更安全，也是未来最主要的用户身份验证和授权方式。


关于OAuth2.0协议的授权流程可以参考下面的流程图，其中Client指第三方应用，Resource Owner指用户，Authorization Server是我们的授权服务器，Resource Server是API服务器。

1、使用Code换取AccessToken，Code只能用一次

2、同一个用户的accessToken一段时间是不会变化的，即使多次获取

![image-20220805215519572](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.1.1.1.png)

**Web网站的授权**

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.1.1.2.png" alt="image-20220805215615101" style="zoom:80%;" />

**社交登录的时序图**

![社交登录流程](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.1.1.3.png)



##### 2、<a name="gitee登录流程">gitee登录流程</a>

参考文档：https://gitee.com/api/v5/swagger

###### 1、获取`code`

点击第三方登录跳转到如下页面，`{client_id}`修改为自己申请的应用的`client_id`，`{redirect_uri}`修改为授权成功返回到的接口地址。

```
https://gitee.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code
```

eg: 

```
https://gitee.com/oauth/authorize?client_id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d&redirect_uri=http://gulimall.com/oauth2.0/gitee/success&response_type=code
```

用户点击`同意授权`后，会跳转到如下页面：（此`code`码只能使用一次）

```
{redirect_uri}?code=abc&state=xyz
```

eg：

```
http://gulimall.com/oauth2.0/gitee/success?code=354dd0ceec0fe0457ae6ae03c93c5dace1ea28819aff74873ac4ac551e0907ab
```

###### 2、获取`token`

对以下接口发送请求：

```
https://gitee.com/oauth/token?grant_type=authorization_code&code={code}&client_id={client_id}&redirect_uri={redirect_uri}&client_secret={client_secret}
```

eg: 

请求：

```
https://gitee.com/oauth/token?grant_type=authorization_code&code=354dd0ceec0fe0457ae6ae03c93c5dace1ea28819aff74873ac4ac551e0907ab&client_id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d&redirect_uri=http://gulimall.com/oauth2.0/gitee/success&client_secret=0c58d0cca9c3fe12bd6c6824f6dc04cdbce5b07cad784c9b8d5938342fc004f7
```

响应：

```json
{
    "access_token": "93c7871550aab0ac3b99c5f2c1a017ca",
    "token_type": "bearer",
    "expires_in": 86400,
    "refresh_token": "d4da9bcc74d312d9f65239fd1b80f497f8d7959d668c382bf6bcab4e5c650312",
    "scope": "user_info",
    "created_at": 1659754964
}
```

响应参数说明：

```
access_token (必需) 授权服务器发出的访问令牌
token_type （必需）这是令牌的类型，通常只是字符串“bearer”。
expires_in （推荐）访问令牌的过期时间。
refresh_token（可选）刷新令牌，在访问令牌过期后，可使用此令牌刷新。
scope（可选）如果用户授予的范围与应用程序请求的范围相同，则此参数为可选。
```

![image-20220806110618299](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.1.2.2.png)

###### 3、获取授权用户的信息

请求：

```
https://gitee.com/api/v5/user?access_token={access_token}
```

响应：

```json
{
    "id": 7559746,
    "login": "anonymouszs",
    "name": "无名氏",
    "avatar_url": "https://gitee.com/assets/no_portrait.png",
    "url": "https://gitee.com/api/v5/users/anonymouszs",
    "html_url": "https://gitee.com/anonymouszs",
    "remark": "",
    "followers_url": "https://gitee.com/api/v5/users/anonymouszs/followers",
    "following_url": "https://gitee.com/api/v5/users/anonymouszs/following_url{/other_user}",
    "gists_url": "https://gitee.com/api/v5/users/anonymouszs/gists{/gist_id}",
    "starred_url": "https://gitee.com/api/v5/users/anonymouszs/starred{/owner}{/repo}",
    "subscriptions_url": "https://gitee.com/api/v5/users/anonymouszs/subscriptions",
    "organizations_url": "https://gitee.com/api/v5/users/anonymouszs/orgs",
    "repos_url": "https://gitee.com/api/v5/users/anonymouszs/repos",
    "events_url": "https://gitee.com/api/v5/users/anonymouszs/events{/privacy}",
    "received_events_url": "https://gitee.com/api/v5/users/anonymouszs/received_events",
    "type": "User",
    "blog": null,
    "weibo": null,
    "bio": null,
    "public_repos": 8,
    "public_gists": 0,
    "followers": 0,
    "following": 1,
    "stared": 3,
    "watched": 14,
    "created_at": "2020-05-13T15:39:52+08:00",
    "updated_at": "2022-08-06T16:02:02+08:00",
    "email": null
}
```

响应各字段类型：

```json
{
    "avatar_url": string
    "bio": string
    "blog": string
    "created_at": string
    "email": string
    "events_url": string
    "followers": string
    "followers_url": string
    "following": string
    "following_url": string
    "gists_url": string
    "html_url": string
    "id": integer
    "login": string
    "member_role": string
    "name": string
    "organizations_url": string
    "public_gists": string
    "public_repos": string
    "received_events_url": string
    "remark": string 企业备注名
    "repos_url": string
    "stared": string
    "starred_url": string
    "subscriptions_url": string
    "type": string
    "updated_at": string
    "url": string
    "watched": string
    "weibo": string
}
```

![image-20220806161709372](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.1.2.3.png)

#### 2、前端添加gitee登录

##### 1、gitee创建第三方应用

登录`gitee`，点击头像右侧的`下三角`，点击`设置`，在左侧导航栏找到`数据管理`里的`第三方应用`

![image-20220806091840266](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.2.1.1.png)

在`我的应用`里，点击右侧的`+创建应用`，创建一个应用

![image-20220806091843219](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.2.1.2.png)

应用名称输入`谷粒商城`，应用描述输入`谷粒商城`，应用主页输入`http://gulimall.com/`，应用回调地址输入`http://gulimall.com/success`，上传一个`Logo`，然后点击`创建应用`

![image-20220806091952038](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.2.1.3.png)

此时就可以看到`Client ID`和`Client Secret`

![image-20220806092026961](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.2.1.4.png)

##### 2、修改页面

修改`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件的`class="si_out"`的`div`，将`QQ`和`微信`图标修改为`gitee`和`github`，并修改`gitee`登录的登录请求地址和参数（参考<a href="#gitee登录流程">5.7.4.2.gitee登录流程</a>）

```html
<div class="si_out">
   <ul>
      <li>
         <a href="https://gitee.com/oauth/authorize?client_id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d&redirect_uri=http://gulimall.com/success&response_type=code">
            <img style="width: 55px;height: 45px" src="https://gitee.com/static/images/logo-black.svg?t=158106666" />
         </a>
      </li>
      <li class="f4"> | </li>
      <li>
         <a href="">
            <svg height="22" style="margin-top: 10px" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="22" data-view-component="true" >
               <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span style="vertical-align: top"><b>github</b></span>
         </a>
      </li>
   </ul>
   <h5 class="rig">
      <img src="/static/login/JD_img/4de5019d2404d347897dee637895d02b_25.png" />
      <span><a href="http://auth.gulimall.com/reg.html">立即注册</a></span>
   </h5>
</div>
```

![image-20220806100848069](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.2.2.png)

点击`Build` -> `Recompile 'login.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

##### 3、测试

在`http://auth.gulimall.com/login.html`页面里点击`gitee`图标，跳转到了`http://gulimall.com/success?code=74d8f002dc70a88c28f22724ea7fec774ffbdcc983990ae65e518563940ce629`页面，点击`同意授权`后，回调到了`https://gitee.com/oauth/authorize?client_id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d&redirect_uri=http://gulimall.com/success&response_type=code`，此接口还没写，所以没有访问到

![GIF 2022-8-6 10-17-39](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.2.3.gif)

#### 3、换取`token`

##### 1、修改回调地址

在刚刚创建的`谷粒商城`应用里，添加`应用回调地址`为`http://gulimall.com/oauth2.0/gitee/success`，然后点击`提交修改`

![image-20220806104444327](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.1.1.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件里，修改点击`gitee`图标跳转到的请求

```html
<a href="https://gitee.com/oauth/authorize?client_id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d&redirect_uri=http://gulimall.com/oauth2.0/gitee/success&response_type=code">
```

![image-20220806104507366](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.1.2.png)

##### 2、配置`gitee`登录参数

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config`包里新建`Oauth2FormGitee`类，用于配置使用`gitee`登录的参数

```java
package com.atguigu.gulimall.auth.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@ConfigurationProperties(prefix = "oauth2.gitee")
@Component
@Data
public class Oauth2FormGitee {

    private String clientId;
    private String redirectUri;
    private String clientSecret;
}
```

![image-20220806112915387](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.2.1.png)

在`gulimall-auth-server`模块的`src/main/resources/application.properties`配置文件里，配置使用`gitee`登录的信息

```properties
oauth2.gitee.client-id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d
oauth2.gitee.redirect-uri=http://gulimall.com/oauth2.0/gitee/success
oauth2.gitee.client-secret=0c58d0cca9c3fe12bd6c6824f6dc04cdbce5b07cad784c9b8d5938342fc004f7
```

![image-20220806112944780](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.2.2.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config`包里新建`RestTemplateConfig`类，用于配置`RestTemplateConfig`

```java
package com.atguigu.gulimall.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Configuration
public class RestTemplateConfig {

    @Bean
    public ClientHttpRequestFactory simpleClientHttpRequestFactory(){
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        //连接超时时间/毫秒（连接上服务器(握手成功)的时间，超出抛出connect timeout）
        factory.setConnectTimeout(15000);
        //数据读取超时时间(socketTimeout)/毫秒（务器返回数据(response)的时间，超过抛出read timeout）
        factory.setReadTimeout(5000);
        return factory;
    }

    @Bean
    public RestTemplate restTemplate(ClientHttpRequestFactory factory){
         RestTemplate restTemplate = new RestTemplate(factory);
        // 设置UTF_8编码
        restTemplate.getMessageConverters().set(1,new StringHttpMessageConverter(StandardCharsets.UTF_8));
        return restTemplate;
    }
}
```

![image-20220806114152845](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.2.3.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.vo`包里新建`GiteeCodeResponseVo`类，用于封装跳转到`gitee`后，点击`同意授权`返回到回调地址，再从回调地址根据`code`换取`token`的响应数据

```java
package com.atguigu.gulimall.auth.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Data
public class GiteeCodeResponseVo {
    private String accessToken;
    private String tokenType;
    private long expiresIn;
    private String refreshToken;
    private String scope;
    private long createdAt;
}
```

![image-20220806114502358](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.2.4.png)

##### 3、新建`oauth_gitee`表

执行以下`sql`，新建`oauth_gitee`表，用于存储`gitee`登录的数据

```mysql
CREATE TABLE `gulimall_ums`.`oauth_gitee`  (
  `id` bigint(20) NOT NULL COMMENT 'id',
  `member_id` bigint(20) NULL COMMENT '会员id',
  `access_token` varchar(40) NULL COMMENT '授权服务器发出的访问令牌',
  `token_type` varchar(10) NULL COMMENT '这是令牌的类型，通常只是字符串“bearer”',
  `expires_in` bigint(20) NULL COMMENT '访问令牌的过期时间',
  `refresh_token` varchar(70) NULL COMMENT '刷新令牌，在访问令牌过期后，可使用此令牌刷新',
  `scope` varchar(255) NULL COMMENT '如果用户授予的范围与应用程序请求的范围相同，则此参数为可选',
  `created_at` bigint(255) NULL,
  `avatar_url` varchar(255) NULL COMMENT '用户的头像',
  `created_time` datetime NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
);
```

![image-20220806161144329](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.3.1.png)

在`IDEA`里依次点击`Database` -> `192.168.56.10` -> `schemas` -> `gulimall_ums`->`oauth_gitee`，然后右键鼠标悬浮到`Scripted Extensions`这里，然后点击`Generate POJOs groovy`，选择一个路径存放生成的实体类

在`gulimall-member`模块的`com.atguigu.gulimall.member.entity`包里新建`OauthGiteeEntity`类，粘贴刚刚生成的实体类在该类里，然后稍作修改

```java
package com.atguigu.gulimall.member.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Data
@TableName("oauth_gitee")
public class OauthGiteeEntity {
    @TableId
    private long id;
    private long memberId;
    private String accessToken;
    private String tokenType;
    private long expiresIn;
    private String refreshToken;
    private String scope;
    private long createdAt;
    private String avatarUrl;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @TableField(fill = FieldFill.INSERT)
    private LocalDate createdTime;
}
```

![image-20220806161307581](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.3.2.png)

使用`Postman`发送如下请求，用于换取获取用户信息（注意：要修改为自己的`token`）

```
https://gitee.com/api/v5/user?access_token=4f1583c038a15f9e57344c868f281462
```

![image-20220806161532759](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.3.3.png)

##### 4、编写`gitee`登录逻辑

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller`包里新建`OAuth2Controller`类，用于`gitee`登录注册

```java
package com.atguigu.gulimall.auth.controller;

import com.atguigu.common.utils.R;
import com.atguigu.gulimall.auth.service.OAuth2Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description: 社交登录
 */
@Controller
@Slf4j
@RequestMapping("/oauth2.0")
public class OAuth2Controller {


    @Autowired
    OAuth2Service oAuth2Service;

    @GetMapping("/gitee/success")
    public R giteeRegister(@RequestParam String code){
        try {
            oAuth2Service.giteeRegister(code);
        }catch (Exception e){
            log.error("第三方登录失败 :{}",e.getMessage());
            return R.error().put("msg","第三方登录失败");
        }
        return R.ok();
    }

}
```

![image-20220806200442012](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.4.1.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth`包里新建`service`文件夹，在`service`文件夹里新建`OAuth2Service`接口，并添加`giteeRegister`注册抽象方法

```java
package com.atguigu.gulimall.auth.service;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
public interface OAuth2Service {

    void giteeRegister(String code);
}
```

![image-20220806200511415](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.4.2.png)

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件里添加如下参数，将路径为`/oauth2.0/**`的转给`gulimall-auth-server`模块（写在通过域名转载的前面）

```yaml
- id: gulimall_oauth2_route
  uri: lb://gulimall-auth-server
  predicates:
    - Path=/oauth2.0/**
```

![image-20220806203319034](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.4.3.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.vo`包里新建`GiteeTokenResponseVo`类，用于封装根据`tocken`换取用户信息的响应数据，这里先不写字段，先完成获取`token`的测试后，再完善字段

```java
package com.atguigu.gulimall.auth.vo;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
public class GiteeTokenResponseVo {
}
```

![image-20220806211810567](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.4.4.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service`包里新建`impl`文件夹，在`impl`文件夹里新建`OAuth2ServiceImpl`类，用于处理通过`gitee`登陆后注册账户

```java
package com.atguigu.gulimall.auth.service.impl;

import com.atguigu.gulimall.auth.config.Oauth2FormGitee;
import com.atguigu.gulimall.auth.service.OAuth2Service;
import com.atguigu.gulimall.auth.vo.GiteeCodeResponseVo;
import com.atguigu.gulimall.auth.vo.GiteeTokenResponseVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Service
public class OAuth2ServiceImpl implements OAuth2Service {

    @Autowired
    Oauth2FormGitee oauth2FormGitee;
    @Autowired
    RestTemplate restTemplate;
    @Override
    public void giteeRegister(String code) {
        GiteeCodeResponseVo vo = getToken(code);
        if (vo==null || !StringUtils.hasText(vo.getAccessToken())){
            throw new RuntimeException("获取用户token失败");
        }
        getGiteeUserInfo(vo.getAccessToken());


    }

    private GiteeCodeResponseVo getToken(String code){
        GiteeCodeResponseVo vo = null;
        String url = "https://gitee.com/oauth/token?grant_type=authorization_code&code={code}&client_id={client_id}" +
                "&redirect_uri={redirect_uri}&client_secret={client_secret}";
        Map<String,String> map = new HashMap<>();
        map.put("code",code);
        map.put("client_id",oauth2FormGitee.getClientId());
        map.put("redirect_uri",oauth2FormGitee.getRedirectUri());
        map.put("client_secret",oauth2FormGitee.getClientSecret());
        try {
            ResponseEntity<GiteeCodeResponseVo> response = restTemplate.postForEntity(url,null,GiteeCodeResponseVo.class,map);
            if (response.getStatusCodeValue()==200){
                vo = response.getBody();
            }else {
                throw new RuntimeException("连接gitee获取token状态异常");
            }
        }catch (IllegalArgumentException e){
            e.printStackTrace();
            throw new RuntimeException("连接gitee获取token响应参数异常");
        }
        catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("连接gitee获取token异常");
        }
        return vo;
    }

    private GiteeTokenResponseVo getGiteeUserInfo(String accessToken){
        GiteeTokenResponseVo vo = null;
        String url = "https://gitee.com/api/v5/user?access_token={access_token}";
        try {
            ResponseEntity<GiteeTokenResponseVo> response = restTemplate.getForEntity(url, GiteeTokenResponseVo.class, accessToken);
            if (response.getStatusCodeValue()==200){
                vo = response.getBody();
            }else {
                throw new RuntimeException("连接gitee获取token状态异常");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("连接gitee获取用户信息异常");
        }
        return vo;
    }
}
```

![image-20220806205937535](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.4.5.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl`类里的`getToken`方法的`ResponseEntity<GiteeCodeResponseVo> response = restTemplate.postForEntity(url,null,GiteeCodeResponseVo.class,map);`这一行打上断点。以`debug`方式运行`GulimallAuthServerApplication`服务，在`http://auth.gulimall.com/login.html`页面里，点击`gitee`图标，然后点击`同意授权`，切换到`IDEA`，点击`Step Over F8`执行完根据`code`换取`token`的请求，可以看到返回的数据并没有封装到`GiteeCodeResponseVo`类里。这是因为返回的数据是`蛇形命名法`(以`_`区分各单词)，而`GiteeCodeResponseVo`类的字段使用的是`驼峰命名法`

![image-20220806205902981](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.4.6.png)

##### 5、修改`GiteeCodeResponseVo`类

###### 方法一（不推荐）

可以将`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.vo.GiteeCodeResponseVo`类的字段都修改为`蛇形命名法`，不过很明显不符合`java`代码规范

```java
package com.atguigu.gulimall.auth.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Data
public class GiteeCodeResponseVo {
    private String access_token;
    private String token_type;
    private long expires_in;
    private String refresh_token;
    private String scope;
    private long created_at;
}
```

![image-20220806210726716](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.5.1.png)

###### 方法二（推荐）

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.vo.GiteeCodeResponseVo`类上添加`@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)`注解，指明`json`是采用蛇形命名法，`java`实体类使用`驼峰命名法`来进行转换

```java
package com.atguigu.gulimall.auth.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Data
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class GiteeCodeResponseVo {
    private String accessToken;
    private String tokenType;
    private long expiresIn;
    private String refreshToken;
    private String scope;
    private long createdAt;
}
```

![image-20220807091632695](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.5.2.png)

##### 6、测试

再次以`debug`方式运行`GulimallAuthServerApplication`服务，在`http://auth.gulimall.com/login.html`页面里，点击`gitee`图标，然后点击`同意授权`，切换到`IDEA`，点击`Step Over F8`执行完根据`code`换取`token`的请求，可以看到返回的数据已经成功封装到`GiteeCodeResponseVo`类里了。

![image-20220806210625293](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.3.6.png)

#### 4、完善`gitee`登录逻辑

##### 1、封装`giee`用户信息

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.vo.GiteeTokenResponseVo`类，用于封装用户信息（这里图省事就不写驼峰命名法了）

```java
package com.atguigu.gulimall.auth.vo;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
import lombok.Data;

import java.util.Date;
@Data
public class GiteeTokenResponseVo {

    private long id;
    private String login;
    private String name;
    private String avatar_url;
    private String url;
    private String html_url;
    private String remark;
    private String followers_url;
    private String following_url;
    private String gists_url;
    private String starred_url;
    private String subscriptions_url;
    private String organizations_url;
    private String repos_url;
    private String events_url;
    private String received_events_url;
    private String type;
    private String blog;
    private String weibo;
    private String bio;
    private int public_repos;
    private int public_gists;
    private int followers;
    private int following;
    private int stared;
    private int watched;
    private Date created_at;
    private Date updated_at;
    private String email;

}
```

![image-20220806211847697](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.1.1.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl`类里的`getGiteeUserInfo`方法的`ResponseEntity<GiteeTokenResponseVo> response = restTemplate.getForEntity(url, GiteeTokenResponseVo.class, accessToken);`这一行打上断点。以`debug`方式运行`GulimallAuthServerApplication`服务，在`http://auth.gulimall.com/login.html`页面里，点击`gitee`图标，然后点击`同意授权`，切换到`IDEA`，点击`Step Over F8`执行完根据`token`换取用户信息的请求，可以看到返回的数据已经封装到`GiteeTokenResponseVo`类里了。

![image-20220806212041987](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.1.2.png)

##### 2、编写`giteeLogin`接口

在`gulimall-common`模块的`com.atguigu.common.to`包里新建`Oauth2GiteeLoginTo`类，用于传递获取到的`token`数据

```java
package com.atguigu.common.to;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/6
 * @Description:
 */
@Data
public class Oauth2GiteeLoginTo {
    private Long id;
    private String accessToken;
    private String tokenType;
    private long expiresIn;
    private String refreshToken;
    private String scope;
    private String avatarUrl;
    private Long createdAt;
    private String name;
}
```

![image-20220807105520842](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.1.png)

在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加`通过gitee登录失败`的枚举

```java
/**
 * 通过gitee登录失败
 */
GITEE_LOGIN_EXCEPTION(15004,"通过gitee登录失败");
```

![image-20220807112541519](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberController`类里添加`giteeLogin`方法

```java
@PostMapping("/giteeLogin")
public R giteeLogin(@RequestBody Oauth2GiteeLoginTo to){
    MemberEntity entity = memberService.giteeLogin(to);
    if (entity!=null) {
        return R.ok().put("data", entity);
    }else {
        return R.error(BizCodeException.GITEE_LOGIN_EXCEPTION);
    }
}
```

![image-20220807112628986](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.3.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.MemberService`接口里添加`giteeLogin`抽象方法

```java
MemberEntity giteeLogin(Oauth2GiteeLoginTo to);
```

![image-20220807112704285](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service`包里新建`OauthGiteeService`接口，在`OauthGiteeService`接口里添加`getMemberId`方法

```java
package com.atguigu.gulimall.member.service;

import com.atguigu.gulimall.member.entity.OauthGiteeEntity;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
public interface OauthGiteeService extends IService<OauthGiteeEntity> {
    /**
     * 根据gitee的Id查询MemberId
     * @param id
     * @return
     */
    public Long getMemberId(Long id);
}
```

![image-20220807095734455](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.5.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.dao`包里添加`OauthGiteeDao`接口

```java
package com.atguigu.gulimall.member.dao;

import com.atguigu.gulimall.member.entity.OauthGiteeEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
@Mapper
public interface OauthGiteeDao extends BaseMapper<OauthGiteeEntity> {
}
```

![image-20220807100029698](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.6.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl`包里新建`OauthGiteeServiceImpl`类，实现抽象的`getMemberId`方法

```java
package com.atguigu.gulimall.member.service.impl;

import com.atguigu.gulimall.member.dao.OauthGiteeDao;
import com.atguigu.gulimall.member.entity.OauthGiteeEntity;
import com.atguigu.gulimall.member.service.OauthGiteeService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
@Service
public class OauthGiteeServiceImpl extends ServiceImpl<OauthGiteeDao, OauthGiteeEntity> implements OauthGiteeService {
    @Override
    public Long getMemberId(Long id) {
        LambdaQueryWrapper<OauthGiteeEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(OauthGiteeEntity::getId, id).select(OauthGiteeEntity::getMemberId);
        OauthGiteeEntity oauthGiteeEntity = this.baseMapper.selectOne(lambdaQueryWrapper);
        if (oauthGiteeEntity!=null){
            return oauthGiteeEntity.getMemberId();
        }
        return null;
    }
}
```

![image-20220807100732410](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.2.7.png)

##### 3、添加`SourceType`枚举

可以使用枚举来判断`SourceType`(用户来源)，在`gulimall-member`模块的`com.atguigu.gulimall.member`包里新建`constant`文件夹，在`constant`文件夹里新建`SourceType`枚举类

```java
package com.atguigu.gulimall.member.constant;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
public enum SourceType {
    /**
     *
     */
    UN_KNOW(0,"未知方式"),
    /**
     * 用户通过本系统注册
     */
    REGISTER(1,"注册"),
    /**
     * 通过Gitte授权登录
     */
    GITEE_LOGIN(2,"gitee登录"),
    /**
     * 通过github授权登录
     */
    GITHUB_LOGIN(3,"github登录");

    /**
     * 根据sourceType的值向数据库中存储
     */
    @EnumValue
    private int sourceType;
    /**
     * JSON通过该值序列化（可用用在可以用在get方法或者属性字段上，一个类只能用一个，序列化只包含该值）
     */
    @JsonValue
    private String description;

    SourceType(int sourceType,String description) {
        this.sourceType = sourceType;
        this.description = description;
    }

    public int getSourceType() {
        return sourceType;
    }

    public void setSourceType(int sourceType) {
        this.sourceType = sourceType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

![image-20220807105110164](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.3.1.png)

可以使用如下方式配置`扫描枚举`(只需配置一种即可)，使用方式一可以在指定包下使用枚举、使用方式二可以全局使用枚举，但还需配置`mybatisPlusPropertiesCustomizer`

```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
  global-config:
    db-config:
      id-type: auto
  type-aliases-package: com.atguigu.gulimall.member.entity
  #方式一：仅配置指定包内的枚举类使用 MybatisEnumTypeHandler
  #支持统配符 * 或者 ; 分割
  type-enums-package: com.atguigu.gulimall.member.constant
  #方式二：全局 修改 mybatis 使用的 EnumTypeHandler(还需配置mybatisPlusPropertiesCustomizer)
  configuration:
    default-enum-type-handler: org.apache.ibatis.type.EnumTypeHandler
```

![image-20220807151436234](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.3.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.entity.MemberEntity`实体类里，修改`sourceType`字段的类型，改为`SourceType`枚举类型

```java
/**
 * 用户来源
 */
private SourceType sourceType;
```

![image-20220807105315893](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.3.3.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类里添加`giteeLogin`方法

```java
/**
 * gitee登录
 * @param to
 */
@Transactional(rollbackFor = Exception.class)
@Override
public MemberEntity giteeLogin(Oauth2GiteeLoginTo to) {
    MemberEntity memberEntity = null;
    Long memberId = oauthGiteeService.getMemberId(to.getId());
    //没有注册
    if (memberId==null){
        memberEntity = new MemberEntity();
        memberEntity.setSourceType(SourceType.GITEE_LOGIN);
        memberEntity.setNickname(to.getName());
        memberEntity.setCreateTime(new Date());
        MemberLevelEntity memberLevelEntity = memberLevelDao.getDefaultLevel();
        memberEntity.setLevelId(memberLevelEntity.getId());
        this.save(memberEntity);

        OauthGiteeEntity oauthGiteeEntity = new OauthGiteeEntity();
        BeanUtils.copyProperties(to,oauthGiteeEntity);
        oauthGiteeEntity.setMemberId(memberEntity.getId());
        oauthGiteeService.save(oauthGiteeEntity);
    }else {
        memberEntity = this.getById(memberId);
    }
    return memberEntity;
}
```

![image-20220807113100785](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.4.3.4.png)

#### 5、调用`member`登录服务

##### 1、修改`auth-server`模块的`gitee`登录

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.feign.MemberFeignService`接口里添加`giteeLogin`方法

```java
@PostMapping("/member/member/giteeLogin")
public R giteeLogin(@RequestBody Oauth2GiteeLoginTo to);
```

![image-20220807115217403](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.1.1.png)

在`gulimall-common`模块的`com.atguigu.common.to`包里新建`MemberEntityTo`类，复制`gulimall-member`模块的`com.atguigu.gulimall.member.entity.MemberEntity`实体类的字段，把`sourceType`的类型由`SourceType`改为`String`(`SourceType`类的`description`字段添加了`@JsonValue`注解，只会显示该字段)

```java
package com.atguigu.common.to;

import java.util.Date;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
public class MemberEntityTo {
    private Long id;
    /**
     * 会员等级id
     */
    private Long levelId;
    /**
     * 用户名
     */
    private String username;
    /**
     * 密码
     */
    private String password;
    /**
     * 昵称
     */
    private String nickname;
    /**
     * 手机号码
     */
    private String mobile;
    /**
     * 邮箱
     */
    private String email;
    /**
     * 头像
     */
    private String header;
    /**
     * 性别
     */
    private Integer gender;
    /**
     * 生日
     */
    private Date birth;
    /**
     * 所在城市
     */
    private String city;
    /**
     * 职业
     */
    private String job;
    /**
     * 个性签名
     */
    private String sign;
    /**
     * 用户来源
     */
    private String sourceType;
    /**
     * 积分
     */
    private Integer integration;
    /**
     * 成长值
     */
    private Integer growth;
    /**
     * 启用状态
     */
    private Integer status;
    /**
     * 注册时间
     */
    private Date createTime;
}
```

![image-20220807113843737](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.1.2.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl`类的`giteeRegister`方法

```java
@Override
public MemberEntityTo giteeRegister(String code) {
    GiteeCodeResponseVo giteeCodeResponseVo = getToken(code);
    if (giteeCodeResponseVo==null || !StringUtils.hasText(giteeCodeResponseVo.getAccessToken())){
        throw new RuntimeException("通过gitee获取用户token失败");
    }
    GiteeTokenResponseVo giteeTokenResponseVo = getGiteeUserInfo(giteeCodeResponseVo.getAccessToken());
    if (giteeTokenResponseVo==null || giteeTokenResponseVo.getId()==0){
        throw new RuntimeException("通过gitee获取用户基本失败");
    }
    Oauth2GiteeLoginTo to = new Oauth2GiteeLoginTo();
    BeanUtils.copyProperties(giteeCodeResponseVo,to);
    to.setId(giteeTokenResponseVo.getId());
    to.setAvatarUrl(giteeTokenResponseVo.getAvatar_url());
    to.setName(giteeTokenResponseVo.getName());
    try {
        R r = memberFeignService.giteeLogin(to);
        if (r.getCode()==0){
            Object data = r.get("data");
            String jsonString = JSON.toJSONString(data);
            return JSON.parseObject(jsonString, MemberEntityTo.class);
        }else {
            throw new RuntimeException("社交登录失败");
        }
    }catch (Exception e){
        e.printStackTrace();
        throw new RuntimeException("社交登录失败");
    }
}
```

![image-20220807114326306](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.1.3.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service.OAuth2Service`接口的`giteeRegister`方法的返回类型为`MemberEntityTo`

```java
MemberEntityTo giteeRegister(String code);
```

![image-20220807114355606](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.1.4.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.OAuth2Controller`类的`giteeRegister`方法

```java
@GetMapping("/gitee/success")
public String giteeRegister(@RequestParam String code, HttpSession session){

    try {
        MemberEntityTo memberEntityTo = oAuth2Service.giteeRegister(code);
        session.setAttribute("data",memberEntityTo);
        return "redirect:http://gulimall.com";
    }catch (Exception e){
        log.error("第三方登录失败 :{}",e.getMessage());
        return "redirect:http://auth.gulimall.com/login.html";
    }
}
```

![image-20220807114528553](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.1.5.png)

##### 2、测试

给`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl`类的以下代码行打上断点

```java
R r = memberFeignService.giteeLogin(to);

ResponseEntity<GiteeCodeResponseVo> response = restTemplate.postForEntity(url,null,GiteeCodeResponseVo.class,map);

ResponseEntity<GiteeTokenResponseVo> response = restTemplate.getForEntity(url, GiteeTokenResponseVo.class, accessToken);
```

给`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法的`this.save(memberEntity);`这一行打上断点，以`debug`方式运行`GulimallAuthServerApplication`服务和`GulimallMemberApplication`服务，在`http://auth.gulimall.com/login.html`页面里，点击`gitee`图标，然后点击`同意授权`，切换到`IDEA`，此时就来到了`gulimall-auth-server`服务的`com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl`类

点击`Step Over F8`执完`ResponseEntity<GiteeCodeResponseVo> response = restTemplate.postForEntity(url,null,GiteeCodeResponseVo.class,map);`这一行，可以看到返回的数据已成功封装到`GiteeCodeResponseVo`实体类里了

![image-20220807150729814](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.2.1.png)

点击`Resume Program F9`执行到下一处断点，点击`Step Over F8`执完`ResponseEntity<GiteeTokenResponseVo> response = restTemplate.getForEntity(url, GiteeTokenResponseVo.class, accessToken);`这一行，可以看到返回的数据已成功封装到`GiteeTokenResponseVo`实体类里了

![image-20220807150824635](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.2.2.png)

点击`Resume Program F9`执行到下一处断点，点击`Step Over F8`执完`R r = memberFeignService.giteeLogin(to);`这一行，可以看到发送请求的数据已成功封装到`Oauth2GiteeLoginTo`实体类里了

![image-20220807150853771](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.2.3.png)

点击`Step Over F8`就进入到了`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法，可以看到此时已正确封装了`MemberEntity`实体类数据

![image-20220807151002732](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.2.4.png)

再点击`Step Over F8`就报错了，说的是`source_type`列的值不能为`GITEE_LOGIN`

```
### SQL: INSERT INTO ums_member  ( create_time, source_type, level_id,  nickname )  VALUES  ( ?, ?, ?,  ? )
### Cause: java.sql.SQLException: Incorrect integer value: 'GITEE_LOGIN' for column 'source_type' at row 1
; uncategorized SQLException; SQL state [HY000]; error code [1366]; Incorrect integer value: 'GITEE_LOGIN' for column 'source_type' at row 1; nested exception is java.sql.SQLException: Incorrect integer value: 'GITEE_LOGIN' for column 'source_type' at row 1] with root cause
```

![image-20220807151224876](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.2.5.png)

##### 3、修改代码再次测试

###### 方法一

注释掉`gulimall-member`模块的`src/main/resources/application.yml`文件中为使用枚举而使用方式二的配置，只保留方式一的配置

![image-20220807152047244](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.1.1.png)

重启`GulimallMemberApplication`服务，在`http://auth.gulimall.com/login.html`页面里，点击`gitee`图标，然后点击`同意授权`，切换到`IDEA`，执行完`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法的`this.save(memberEntity);`这一行，可以看到引进保存完数据了，此时返回的`id`为`1`

![image-20220807151923689](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.1.2.png)

点击`Resume Program F9`本应该执行完测试，但却停在了`oauthGiteeService.save(oauthGiteeEntity);`这一行，查看`oauthGiteeEntity`实体类的数据，可以看到也正常封装了

![image-20220807153319902](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.1.3.png)

再点击`Step Over F8`就来到捕获异常的类了，证明保存`oauthGiteeEntity`实体类的数据出错了

![image-20220807153348725](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.1.4.png)

点击`Resume Program F9`执行完异常处理类，可以看到控制台报了如下错误：`id`没有一个默认值

```
### SQL: INSERT INTO oauth_gitee  ( expires_in, created_at, avatar_url, scope, created_time, token_type, access_token, refresh_token, member_id )  VALUES  ( ?, ?, ?, ?, ?, ?, ?, ?, ? )
### Cause: java.sql.SQLException: Field 'id' doesn't have a default value
; Field 'id' doesn't have a default value; nested exception is java.sql.SQLException: Field 'id' doesn't have a default value] with root cause

java.sql.SQLException: Field 'id' doesn't have a default value
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:129) ~[mysql-connector-java-8.0.17.jar:8.0.17]
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:97) ~[mysql-connector-java-8.0.17.jar:8.0.17]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:122) ~[mysql-connector-java-8.0.17.jar:8.0.17]
```

![image-20220807153427809](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.1.5.png)

###### 方法二

注释掉`gulimall-member`模块的`src/main/resources/application.yml`文件中为使用枚举而使用方式一的配置，只保留方式二的配置

![image-20220807152240568](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.2.1.png)

可以看到如果不配置`MybatisPlusPropertiesCustomizer`，执行完`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法的`this.save(memberEntity);`这一行还是会报错

![image-20220807152244248](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.2.2.png)

点击`Resume Program F9`执行完异常处理类，可以看到控制台还是报了最开始的错误：`source_type`列的值不能为`GITEE_LOGIN`

![image-20220807152316550](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.2.3.png)

在`gulimall-member`模块的`src/main/resources/application.yml`配置文件的方式二添加注释

```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/**/*.xml
  global-config:
    db-config:
      id-type: auto
  type-aliases-package: com.atguigu.gulimall.member.entity
  #方式一：仅配置指定包内的枚举类使用 MybatisEnumTypeHandler
  # 支持统配符 * 或者 ; 分割
  #type-enums-package: com.atguigu.gulimall.member.constant
  #方式二：全局 修改 mybatis 使用的 EnumTypeHandler(还需配置mybatisPlusPropertiesCustomizer)
  configuration:
    default-enum-type-handler: org.apache.ibatis.type.EnumTypeHandler
```

![image-20220807152820815](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.2.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.config`包里新建`MybatisPlusAutoConfiguration`类，用于添加全局枚举配置

```java
package com.atguigu.gulimall.member.config;

import com.baomidou.mybatisplus.autoconfigure.MybatisPlusPropertiesCustomizer;
import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.baomidou.mybatisplus.core.config.GlobalConfig;
import com.baomidou.mybatisplus.extension.handlers.MybatisEnumTypeHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */

@Configuration
public class MybatisPlusAutoConfiguration {

    @Bean
    public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
        return properties -> {
            GlobalConfig globalConfig = properties.getGlobalConfig();
            globalConfig.setBanner(false);
            MybatisConfiguration configuration = new MybatisConfiguration();
            configuration.setDefaultEnumTypeHandler(MybatisEnumTypeHandler.class);
            properties.setConfiguration(configuration);
        };
    }
}
```

![image-20220807152813896](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.2.5.png)

再次执行完`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法的`this.save(memberEntity);`这一行，这次就可以看到成功保存数据了，此时也返回了刚刚保存返回的`id`

![image-20220807152650962](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.3.2.6.png)

##### 4、修改代码再次测试

在`gulimall-member`模块里，修改`com.atguigu.gulimall.member.entity.OauthGiteeEntity`类的`id`字段的`@TableId`注解，添加`type = IdType.INPUT`指明这里的`id`是自己程序输入的，而非自动递增

```java
@TableId(value = "id",type = IdType.INPUT)
private long id;
```

![image-20220807154012178](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.1.png)

然后突然发现忘记设置头像了，可以看到`gulimall_ums`数据库的`ums_member`表里的`header`字段为用户的头像

![image-20220807154101671](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法的`this.save(memberEntity);`这一行的上面添加如下代码，用于设置头像

```java
memberEntity.setHeader(to.getAvatarUrl());
```

![image-20220807154155577](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.3.png)

重启`GulimallMemberApplication`服务，在`http://auth.gulimall.com/login.html`页面里，点击`gitee`图标，然后点击`同意授权`，切换到`IDEA`，执行完`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`giteeLogin`方法的`oauthGiteeService.save(oauthGiteeEntity);`这一行，可以看到此时`memberEntity`对象和`oauthGiteeEntity`对象的数据都封装正确

![image-20220807154700666](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.4.png)

点击`Step Over F8`执行完`oauthGiteeService.save(oauthGiteeEntity);`这一行，此时就不报错了

![image-20220807154723745](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.5.png)

此时切换到`GulimallAuthServerApplication`服务的控制台可以看到报了读取超时的异常，在调试的过程中很容易出现该异常，这是正常的

```
detailMessage = “Read timed out executing POST http://gulimall-member/member/member/giteeLogin”
```

![image-20220807154832750](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.6.png)

打开`Navicat`软件，可以看到`gulimall_ums`数据库的`ums_member`表里已经有刚刚授权的`gitee`用户信息了

![image-20220807154956105](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.7.png)

切换到`gulimall_ums`数据库的`oauth_gitee`表，表里面已经有刚刚授权的用户信息了

![image-20220807154952161](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.4.8.png)

##### 5、整体测试

取消`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl`类和`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类上的所有断点，重新运行`GulimallAuthServerApplication`服务和`GulimallMemberApplication`服务,可以看到使用`gitee`登录正常

```
http://auth.gulimall.com/login.html

https://gitee.com/login?redirect_to_url=https%3A%2F%2Fgitee.com%2Foauth%2Fauthorize%3Fclient_id%3D065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d%26redirect_uri%3Dhttp%3A%2F%2Fgulimall.com%2Foauth2.0%2Fgitee%2Fsuccess%26response_type%3Dcode

http://gulimall.com/
```

![GIF 2022-8-7 15-56-48](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.5.gif)

##### 6、其他问题

由于回调为`http://gulimall.com/oauth2.0/gitee/success`，转给了`gulimall-auth-server`服务，所以回调的`http://gulimall.com`会有`jsonId`，如果回调为`http://auth.gulimall.com/oauth2.0/gitee/success`则只有`http://auth.gulimall.com`会有`jsonId`

![image-20220807160743109](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.6.1.png)

回调为`http://gulimall.com/oauth2.0/gitee/success`时，`http://auth.gulimall.com`域名下没有以`jsonId`为`key`的`cookie`

![image-20220807160024967](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.6.2.png)

回调为`http://gulimall.com/oauth2.0/gitee/success`时，`http://gulimall.com`域名下有以`jsonId`为`key`的`cookie`

![image-20220807160028148](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.6.3.png)

虽然在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.OAuth2Controller`类的`giteeRegister`方法里可以设置`cookie`的作用范围,但默认只能在本域(不能为其父域名下)

```java
@GetMapping("/gitee/success")
public String giteeRegister(@RequestParam String code, HttpServletResponse response){

    try {
        MemberEntityTo memberEntityTo = oAuth2Service.giteeRegister(code);
        //session.setAttribute("data",memberEntityTo);
        Cookie cookie = new Cookie("data",memberEntityTo.toString());
        cookie.setPath("/");
        response.addCookie(cookie);
        return "redirect:http://gulimall.com";
    }catch (Exception e){
        log.error("第三方登录失败 :{}",e.getMessage());
        return "redirect:http://auth.gulimall.com/login.html";
    }
}
```

![image-20220807162107754](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.6.4.png)

如果回调为`http://auth.gulimall.com/oauth2.0/gitee/success`们可以修改`jsonId`的`Doman`作用域，将其修改为`gulimall.com`，但是这样`http://auth.gulimall.com`域名下又没有`jsonId`了

![image-20220807162042047](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.6.5.png)

不推荐这样做，所以还是改回来为妙

```java
@GetMapping("/gitee/success")
public String giteeRegister(@RequestParam String code, HttpSession session){

    try {
        MemberEntityTo memberEntityTo = oAuth2Service.giteeRegister(code);
        session.setAttribute("data",memberEntityTo);
        //Cookie cookie = new Cookie("data",memberEntityTo.toString());
        //cookie.setPath("/");
        //response.addCookie(cookie);
        return "redirect:http://gulimall.com";
    }catch (Exception e){
        log.error("第三方登录失败 :{}",e.getMessage());
        return "redirect:http://auth.gulimall.com/login.html";
    }
}
```

![image-20220807165342333](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.5.6.6.png)

#### 6、`gitee`参考文档

参考文档： https://gitee.com/api/v5/oauth_doc#/

API 使用条款

- OSCHINA 用户是资源的拥有者，需尊重和保护用户的权益。
- 不能在应用中使用 OSCHINA 的名称。
- 未经用户允许，不准爬取或存储用户的资源。
- 禁止滥用 API，请求频率过快将导致请求终止。

OAuth2 认证基本流程

![img](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.6.1.png)

OAuth2 获取 AccessToken 认证步骤

1. 授权码模式

- 应用通过 浏览器 或 Webview 将用户引导到码云三方认证页面上（ **GET请求** ）

  ```
  https://gitee.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code
  ```

- 用户对应用进行授权
  注意: 如果之前已经授权过的需要跳过授权页面，需要在上面第一步的 URL 加上 scope 参数，且 scope 的值需要和用户上次授权的勾选的一致。如用户在上次授权了user_info、projects以及pull_requests。则步骤A 中 GET 请求应为：

  ```
  https://gitee.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=user_info%20projects%20pull_requests
  ```

- 码云认证服务器通过回调地址{redirect_uri}将 用户授权码 传递给 应用服务器 或者直接在 Webview 中跳转到携带 用户授权码的回调地址上，Webview 直接获取code即可（{redirect_uri}?code=abc&state=xyz)

- 应用服务器 或 Webview 使用 access_token API 向 码云认证服务器发送post请求传入 用户授权码 以及 回调地址（ **POST请求** ）**注：请求过程建议将 client_secret 放在 Body 中传值，以保证数据安全。**``

  ```
  https://gitee.com/oauth/token?grant_type=authorization_code&code={code}&client_id={client_id}&redirect_uri={redirect_uri}&client_secret={client_secret}
  ```

- 码云认证服务器返回 access_token
  应用通过 access_token 访问 Open API 使用用户数据。

- 当 access_token 过期后（有效期为一天），你可以通过以下 refresh_token 方式重新获取 access_token（ **POST请求** ）

  ```
  https://gitee.com/oauth/token?grant_type=refresh_token&refresh_token={refresh_token}
  ```

- 注意：如果获取 access_token 返回 403，可能是没有设置User-Agent的原因。
  详见：[获取Token时服务端响应状态403是什么情况](https://gitee.com/oschina/git-osc/issues/IDBSA)

2. 密码模式

- 用户向客户端提供邮箱地址和密码。客户端将邮箱地址和密码发给码云认证服务器，并向码云认证服务器请求令牌。（ **POST请求。Content-Type: application/x-www-form-urlencoded** ）

  ```
  curl -X POST --data-urlencode "grant_type=password" --data-urlencode "username={email}" --data-urlencode "password={password}" --data-urlencode "client_id={client_id}" --data-urlencode "client_secret={client_secret}" --data-urlencode "scope=projects user_info issues notes" https://gitee.com/oauth/token
  ```

- scope表示权限范围，有以下选项，请求时使用空格隔开

  ```
  user_info projects pull_requests issues notes keys hook groups gists enterprises
  ```

- 码云认证服务器返回 access_token
  应用通过 access_token 访问 Open API 使用用户数据。

创建应用流程

- 在 **[修改资料](https://gitee.com/profile)** -> **[第三方应用](https://gitee.com/oauth/applications)**，创建要接入码云的应用。 
![img](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.6.2.png)
- 填写应用相关信息，勾选应用所需要的权限。其中: **回调地址**是用户授权后，码云回调到应用，并且回传授权码的地址。 
![img](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.6.3.png)
- 创建成功后，会生成 **Cliend ID** 和 **Client Secret**。他们将会在上述OAuth2 认证基本流程用到。 
![img](https://gitlab.com/apzs/image/-/raw/master/image/5.7.4.6.4.png)



### 5.7.5、Json格式化问题

如何将使用`蛇形命名法`的`json`数据与使用`驼峰命名法`的`java`实体类进行互转？下面提供三种方式

参考地址： [PropertyNamingStrategy_cn · alibaba/fastjson Wiki (github.com)](https://github.com/alibaba/fastjson/wiki/PropertyNamingStrategy_cn)

#### 1、方式一（官方做法）

##### 1. 简介

fastjson缺省使用CamelCase，在1.2.15版本之后，fastjson支持配置PropertyNamingStrategy，支持如下四种:

| name       | demo      |
| ---------- | --------- |
| CamelCase  | persionId |
| PascalCase | PersonId  |
| SnakeCase  | person_id |
| KebabCase  | person-id |

##### 2. Serialization and Parser

```java
SerializeConfig config = new SerializeConfig(); // 生产环境中，config要做singleton处理，要不然会存在性能问题
config.propertyNamingStrategy = PropertyNamingStrategy.SnakeCase;

Model model = new Model();
model.personId = 1001;
String text = JSON.toJSONString(model, config);
Assert.assertEquals("{\"person_id\":1001}", text);

ParserConfig parserConfig = new ParserConfig(); // 生产环境中，parserConfig要做singleton处理，要不然会存在性能问题
parserConfig.propertyNamingStrategy = PropertyNamingStrategy.SnakeCase;
Model model2 = JSON.parseObject(text, Model.class, parserConfig);
Assert.assertEquals(model.personId, model2.personId);
```

##### 3. 修改全局缺省的命名策略

```java
SerializeConfig.getGlobalInstance()
               .propertyNamingStrategy = PropertyNamingStrategy.PascalCase;
```

##### 4. 基于JSONType配置PropertyNamingStrategy

```java
   public void test_for_issue() throws Exception {
        Model model = new Model();
        model.userId = 1001;
        model.userName = "test";
        String text = JSON.toJSONString(model);
        assertEquals("{\"userName\":\"test\",\"user_id\":1001}", text);

        Model model2 = JSON.parseObject(text, Model.class);

        assertEquals(1001, model2.userId);
        assertEquals("test", model2.userName);
    }

    /**
     * 当某个字段有JSONField注解，JSONField中name属性不存在，并且类上有属性转换策略，
     * json属性名也要用类上的属性名转换策略为为准
     * @throws Exception
     */
    public void test_when_JSONField_have_not_name_attr() throws Exception {
        ModelTwo modelTwo = new ModelTwo();
        modelTwo.userId = 1001;
        modelTwo.userName = "test";
        String text = JSON.toJSONString(modelTwo);
        assertEquals("{\"userName\":\"test\",\"user_id\":\"1001\"}", text);

        Model model2 = JSON.parseObject(text, Model.class);

        assertEquals(1001, model2.userId);
        assertEquals("test", model2.userName);
    }

    @JSONType(naming = PropertyNamingStrategy.SnakeCase)
    public class Model {
        private int userId;
        @JSONField(name = "userName")
        private String userName;

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }
    }

    @JSONType(naming = PropertyNamingStrategy.SnakeCase)
    public class ModelTwo {
        /**
         * 此字段准备序列化为字符串类型
         */
        @JSONField(serializeUsing = StringSerializer.class)
        private int userId;
        @JSONField(name = "userName")
        private String userName;

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }
    }

   public class StringSerializer implements ObjectSerializer {

      public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType, int features) throws IOException {
        serializer.write(String.valueOf(object));
    }

}
```

#### 2、方式二（推荐）

可以使用如下方法直接在当前实体使用，不需要配置（亲测可用）

```java
@Data
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class GiteeCodeResponseVo {
    private String accessToken;
    private String tokenType;
    private long expiresIn;
    private String refreshToken;
    private String scope;
    private long createdAt;
}
```

#### 3、方式三（其他做法）

可以参考如下链接，亲测可用，就是有点麻烦

[Java开发里遇到的奇奇怪怪的需求---JSON键值驼峰转下划线的实现 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/270875975)

##### 1、导入依赖

首先导入Pom依赖，Jackson的三个Jar包和FastJson（可不要，就是习惯了用而已）：

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.12.0-rc1</version>
</dependency>

<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-annotations -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.12.0-rc1</version>
</dependency>

<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.0-rc1</version>
</dependency>

<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.74</version>
</dependency>
```

##### 2、需求

我们模拟用户注册的场景，提交一系列基本信息，如：

```json
{
  "user_name": "jjn",
  "org_id": "01",
  "org_name": "Class1",
  "age": 0,
  "email": "jjn@mail.ustc.edu.cn",
  "create_time": "2020-11-01 09:11:03"
}
```

通过接口处理之后生成的数据如下：

```json
{
    "code": 200,
    "message": "成功",
    "info": {
        "update_time": "2020-11-01 22:06:45",
        "create_time": "2020-11-01 09:11:03",
        "registerTime": "2020-11-01 22:06:45",
        "user_name": "jjn",
        "org_id": "01",
        "registered": true,
        "org_name": "Class1",
        "age": 0,
        "email": "jjn@mail.ustc.edu.cn"
    }
}
```

那么是如何实现的呢？其实主要就是Jackson Json库的几个注解，来看看吧~

- @JsonProperty

```java
/**
 * Marker annotation that can be used to define a non-static
 * method as a "setter" or "getter" for a logical property
 * (depending on its signature),
 * or non-static object field to be used (serialized, deserialized) as
 * a logical property.
 *<p>
 * Default value ("") indicates that the field name is used
 * as the property name without any modifications, but it
 * can be specified to non-empty value to specify different
 * name. Property name refers to name used externally, as
 * the field name in JSON objects.
 *<p>
 * Starting with Jackson 2.6 this annotation may also be
 * used to change serialization of <code>Enum</code> like so:
 *<pre>
public enum MyEnum {
    {@literal @JsonProperty}("theFirstValue") THE_FIRST_VALUE,
    {@literal @JsonProperty}("another_value") ANOTHER_VALUE;
}
</pre>
 * as an alternative to using {@link JsonValue} annotation.
 */
```

注释里面写的很清楚了，指定了value的值之后，在生成JSON的时候，会按value的值来。

- @JsonAlias

```java
/**
 * Annotation that can be used to define one or more alternative names for
 * a property, accepted during deserialization as alternative to the official
 * name. Alias information is also exposed during POJO introspection, but has
 * no effect during serialization where primary name is always used.
 *<p>
 * Examples:
 *<pre>
 *public class Info {
 *  &#64;JsonAlias({ "n", "Name" })
 *  public String name;
 *}
 *</pre>
 *
 * @since 2.9
 */
```

##### 3、实体类

使用`@JsonProperty(value = "user_name")`注解指定了`value`的值之后，在生成`JSON`的时候，会按`value`的值来

`alias`的意思是别名，`value`值指定了之后，可以接受多种可能的赋值。使用`@JsonAlias(value = {"user_name", "userName"})`注解后，`json`的`key`为`user_name`或`userName`时都能封装到`java`的`userName`字段

所以最后我们的用户实体类就会写成这样：

```java
package com.zhihu.jjn.demoproject.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author Jiang Jining
 * @date 2020/11/1 10:17
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @JsonProperty(value = "user_name")
    @JsonAlias(value = {"user_name", "userName"})
    private String userName;

    @JsonProperty(value = "org_id")
    @JsonAlias(value = {"org_id", "orgId"})
    private String orgId;

    @JsonProperty(value = "org_name")
    @JsonAlias(value = {"org_name", "orgName"})
    private String orgName;

    private Integer age;

    private String email;

    @JsonProperty(value = "create_time")
    @JsonAlias(value = {"create_time", "createTime"})
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    @JsonProperty(value = "update_time")
    @JsonAlias(value = {"update_time", "updateTime"})
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    private Boolean registered;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date registerTime;
}
```

返回实体类：

```java
package com.zhihu.jjn.demoproject.entity;

import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Jiang Jining
 * @date 2020/11/1 11:08
 */
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Response {
    private Integer code;
    private String message;
    private JSONObject info;

    public static Response success(JSONObject data) {
        return Response.builder().code(200).message("成功").info(data).build();
    }

    public static Response error(JSONObject data) {
        return Response.builder().code(500).message("失败").info(data).build();
    }
}
```

##### 4、service

service接口：

```java
package com.zhihu.jjn.demoproject.service;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.zhihu.jjn.demoproject.entity.User;

/**
 * @author Jiang Jining
 * @date 2020/11/1 11:12
 */
public interface UserService {
    /**
     * Register user demo.
     *
     * @param user user param from front end
     * @return json object
     */
    JSONObject registerUser(User user) throws JsonProcessingException;
}
```

service接口实现：

```java
package com.zhihu.jjn.demoproject.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zhihu.jjn.demoproject.entity.User;
import com.zhihu.jjn.demoproject.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @author Jiang Jining
 * @date 2020/11/1 11:12
 */
@Service
public class UserServiceImpl implements UserService {
    @Override
    public JSONObject registerUser(User user) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user.setRegistered(true);
        user.setRegisterTime(new Date());
        user.setUpdateTime(new Date());
        String string = objectMapper.writeValueAsString(user);
        return JSON.parseObject(string);
    }
}
```

##### 5、Controller

最后的Controller实现：

```java
package com.zhihu.jjn.demoproject.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.zhihu.jjn.demoproject.entity.Response;
import com.zhihu.jjn.demoproject.entity.User;
import com.zhihu.jjn.demoproject.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author Jiang Jining
 * @date 2020/11/1 11:06
 */
@RestController
@CrossOrigin
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping(value = "/api/user/register")
    public Response userRegisterController(@RequestBody User user) throws JsonProcessingException {
        return Response.success(userService.registerUser(user));
    }
}
```

#### 3、方式四（亲测不可用）

fastjson中的@JSONField注解（亲测不可用，也许是我技术不行吧）

链接： [fastjson中的@JSONField注解_y_bccl27的博客-CSDN博客_fastjson jsonfield注解](https://blog.csdn.net/y_bccl27/article/details/125376405)

使用[fastjson](https://so.csdn.net/so/search?q=fastjson&spm=1001.2101.3001.7020)之前需先引入下述依赖，当前版本为1.2.75

```html
<dependency>
	<groupId>com.alibaba</groupId>
	<artifactId>fastjson</artifactId>
	<version>1.2.75</version>
</dependency>
```

JSONField中的name属性用来指定JSON串中key的名称

##### 1.@JSONField作用在属性上

```java
import com.alibaba.fastjson.annotation.JSONField;
 
public class Person {
 
    @JSONField(name = "userName")
    private String name;
 
    @JSONField(name = "AGE")
    private String age;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getAge() {
        return age;
    }
 
    public void setAge(String age) {
        this.age = age;
    }
}
```

序列化测试： 

```java
import com.alibaba.fastjson.JSONObject;
import com.bc.model.Person;
 
import java.util.Date;
 
public class Demo {
 
    public static void main(String[] args){
        Person person=new Person();
        person.setName("张三");
        person.setAge("20");
        person.setDate(new Date());
        String jsonStr = JSONObject.toJSONString(person);
        System.out.println(jsonStr);
    }
}
```

执行上述代码，其输出结果为：

```java
{"AGE":"20","userName":"张三"}
```

反序列化测试：

```java
import com.alibaba.fastjson.JSONObject;
import com.bc.model.Person;
 
public class Demo {
 
    public static void main(String[] args){
        String jsonStr="{\"AGE\":\"20\",\"userName\":\"张三\"}";
        Person person = JSONObject.toJavaObject(JSONObject.parseObject(jsonStr), Person.class);
        System.out.println("json to bean：" + person.getName());
    }
}
```

执行上述代码，其输出结果为：

```java
json to bean：张三
```

@JSONField作用在Field时，其name不仅定义了输出的名称，同时也定义了输入key的名称

##### 2.@JSONField作用在方法上

```java
import com.alibaba.fastjson.annotation.JSONField;
 
public class Person {
 
    private String name;
 
    private String age;
 
    // 针对的是序列化操作
    @JSONField(name = "userName")
    public String getName() {
        return name;
    }
 
    // 针对的是反序列化操作
    @JSONField(name = "userName")
    public void setName(String name) {
        this.name = name;
    }
 
    @JSONField(name = "AGE")
    public String getAge() {
        return age;
    }
 
    @JSONField(name = "AGE")
    public void setAge(String age) {
        this.age = age;
    }
}
```



```java
import com.alibaba.fastjson.JSONObject;
import com.bc.model.Person;
 
public class Demo {
 
    public static void main(String[] args){
        // 序列化
        Person person=new Person();
        person.setName("张三");
        person.setAge("20");
        String jsonStr = JSONObject.toJSONString(person);
        System.out.println(jsonStr);
 
        // 反序列化
        // String jsonStr="{\"AGE\":\"20\",\"userName\":\"张三\"}";
        // Person person = JSONObject.toJavaObject(JSONObject.parseObject(jsonStr), Person.class);
        // System.out.println("json to bean：" + person.getName());
    }
}
```

执行上述代码，其输出结果为：

```java
{"AGE":"20","userName":"张三"}
```

fastjson在进行操作时，是根据getter和setter的方法进行的，并不是依据Field进行

##### 3.@JSONField中的format属性

 format属性用于规定[序列化](https://so.csdn.net/so/search?q=序列化&spm=1001.2101.3001.7020)和反序列化时成员变量的日期格式 

```java
import com.alibaba.fastjson.annotation.JSONField;
import java.util.Date;
 
public class Person {
 
    private String name;
 
    private String age;
 
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
    private Date date;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getAge() {
        return age;
    }
 
    public void setAge(String age) {
        this.age = age;
    }
 
    public Date getDate() {
        return date;
    }
 
    public void setDate(Date date) {
        this.date = date;
    }
}
```



```java
import com.alibaba.fastjson.JSONObject;
import com.bc.model.Person;
 
import java.util.Date;
 
public class Demo {
 
    public static void main(String[] args){
        // 序列化
        Person person=new Person();
        person.setName("张三");
        person.setAge("20");
        person.setDate(new Date());
        String jsonStr = JSONObject.toJSONString(person);
        System.out.println(jsonStr);
    }
}
```

执行上述代码，其输出结果为：

```java
{"age":"20","date":"2022-06-21 09:52:37","name":"张三"}
```

##### 4.@JSONField中的ordinal属性

ordinal属性用于规定序列化时字段的顺序

```java
import com.alibaba.fastjson.annotation.JSONField;
 
public class Person {
 
    @JSONField(ordinal = 1)
    private String name;
 
    @JSONField(ordinal = 2)
    private String age;
 
    @JSONField(ordinal = 3)
    private String sex;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getAge() {
        return age;
    }
 
    public void setAge(String age) {
        this.age = age;
    }
 
    public String getSex() {
        return sex;
    }
 
    public void setSex(String sex) {
        this.sex = sex;
    }
}
```



```java
import com.alibaba.fastjson.JSONObject;
import com.bc.model.Person;
 
public class Demo {
 
    public static void main(String[] args){
        // 序列化
        Person person=new Person();
        person.setName("张三");
        person.setAge("20");
        person.setSex("男");
        String jsonStr = JSONObject.toJSONString(person);
        System.out.println(jsonStr);
    }
}
```

执行上述代码，其输出结果为：

```java
{"name":"张三","age":"20","sex":"男"}
```

##### 5.@JSONField中的serialize属性

serialize属性其取值为false时表示该字段不进行序列化，就是转化为json字符串时不生成该字段

```java
import com.alibaba.fastjson.annotation.JSONField;
import java.util.Date;
 
public class Person {
 
    private String name;
 
    private String age;
 
    // 指定字段不进行序列化，就是转化为json字符串时不生成该字段
    @JSONField(serialize=false)
    private Date date;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getAge() {
        return age;
    }
 
    public void setAge(String age) {
        this.age = age;
    }
 
    public Date getDate() {
        return date;
    }
 
    public void setDate(Date date) {
        this.date = date;
    }
}
```



```java
import com.alibaba.fastjson.JSONObject;
import com.bc.model.Person;
 
import java.util.Date;
 
public class Demo {
 
    public static void main(String[] args){
        // 序列化
        Person person=new Person();
        person.setName("张三");
        person.setAge("20");
        person.setDate(new Date());
        String jsonStr = JSONObject.toJSONString(person);
        System.out.println(jsonStr);
    }
}
```

执行上述代码，其输出结果为：

```java
{"age":"20","name":"张三"}
```

### 5.7.6、Spring Session

参考文档： https://docs.spring.io/spring-session/reference/guides/boot-redis.html

#### 1、Session共享问题

原生的session方案不能解决父子域名共享session的问题

![image-20220807162338249](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.0.1.png)

原生的session方案，同一个服务部署在不同的机器上，这些机器不能共享用户的session，用户在一个机器上登陆后，再次访问其他请求有可能分配到别的机器上，由于别的机器没有该用户的session，因此再次要求用户登录。不同服务之间session更无法共享。

![image-20220807162401133](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.0.2.png)

##### 1、session复制(不推荐)

可以让服务之间同步保存session，每台机器都保存一份相同的session，这样用户不管访问哪台机器都能得到用户session

![image-20220807162511571](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.1.png)

优点：web-server（Tomcat）原生支持，只需要修改配置文件
缺点：session同步需要数据传输，占用大量网络带宽，降低了服务器群的业务处理能力
任意一台web-server保存的数据都是所有web- server的session总和，受到内存限制无法水平扩展更多的web-server
大型分布式集群情况下，由于所有web-server都全量保存数据，所以此方案不可取。

##### 2、客户端存储(不推荐)

让用户的浏览器保存session，用户每个请求都带上session，这样用户访问任何机器都能得到session，非常节约服务器资源，但保存在用户浏览器里非常的不安全，非常不推荐。

![image-20220807162614238](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.2.png)



优点：服务器不需存储session，用户保存自己的session信息到cookie中。节省服务端资源

缺点：都是缺点，这只是一种思路。
具体如下：
每次http请求，携带用户在cookie中的完整信息， 浪费网络带宽
session数据放在cookie中，cookie有长度限制4K，不能保存大量信息
session数据放在cookie中，存在泄漏、篡改、窃取等安全隐患
这种方式不会使用。

##### 3、hash一致性(推荐)

可以使用`OSI 7层网络模型`里的第`4`层`传输层`（分析IP层(第3层)及TCP/UDP层(第四层)，实现四层流量负载均衡）。根据用户的ip，然后做hash操作，使该用户每次请求都能负载均衡到相同的机器上

![image-20220807162823059](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.3.1.png)

还可以使用`OSI 7层网络模型`里的第`7`层`应用层`，通过http请求里存放的业务字段来做hash操作，使该用户每次请求都能负载均衡到相同的机器上(通过分析应用层的信息，如HTTP协议URI或Cookie信息)

![image-20220807162831210](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.3.2.png)



优点：只需要改nginx配置，不需要修改应用代码
负载均衡，只要hash属性的值分布是均匀的，多台web-server的负载是均衡的
可以支持web-server水平扩展（session同步法是不行 的，受内存限制）

缺点：session还是存在web-server中的，所以web-server重启可能导致部分session丢失，影响业务，如部分用户需要重新登录
如果web-server水平扩展，rehash后session重新分布，也会有一部分用户路由不到正确的session
但是以上缺点问题也不是很大，因为session本来都是有有效期的。所以这两种反向代理的方式可以使用

**ip_hash**

ip_hash是根据用户请求过来的ip，然后映射成hash值，然后分配到一个特定的服务器里面；
使用ip_hash这种负载均衡以后，可以保证用户的每一次会话都只会发送到同一台特定的Tomcat里面，它的session不会跨到其他的tomcat里面去的；

首先通过将ip地址映射成一个hash值，然后将hash值对Tomcat的数量3取模，得到Tomcat的索引0、1、2；
比如：5%3=2，则把这个请求发送到Tomcat3服务器，以此类推；
这样一来，只要用户的IP不发生改变，当前用户的会话就能够一直保持；
nginx的ip_hash算法是取ip地址的前三段数字进行hash映射，如果只有最后一段不一样，也会发送到同一个Tomcat里面

在nginx里面使用ip_hash,直接添加ip_hash关键字即可，后续同一ip的访问将只会请求同一个服务器。

```nginx
upstream tomcats {
    ip_hash;
    server 192.168.121.166:8080 weight=1 max_conns=2;
    server 192.168.121.167:8080 down;
    server 192.168.121.167:8088 weight=5 max_conns=2;
}
```

或

```nginx
[root@Nginx ~]# cat <<END >> /usr/local/nginx/conf/nginx.conf
stream {
  upstream test_mysql {
    hash $remote_addr consistent;       # 通过配置一致性 hash 来防止调度异常
    server 192.168.1.1:3306 weight=5 max_fails=3 fail_timeout=30s;
  }
  server {
    listen 10086 so_keepalive=on;       # 开启 TCP 存活探测
    proxy_connect_timeout 10s;          # 连接超时时间
    proxy_timeout 300s;             # 端口保持时间
    proxy_pass test_mysql;
  }
}
END
[root@Nginx ~]# nginx -s reload
```

注意事项：

一旦使用了ip_hash，当我们需要移除一台服务器的时候，不能直接删除这个配置项，而是需要在这台服务器配置后面加上关键字down，表示不可用；因为如果直接移除配置项，会导致hash算法发生更改，后续所有的请求都会发生混乱；

> - 层是OSI 7层网络模型，OSI 模型是从上往下的，越底层越接近硬件，越往上越接近软件，这七层模型分别是物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。4层是指传输层的 tcp / udp、7层是指应用层，通常是http
>
> - 4层用的是NAT技术。NAT英文全称是“Network Address Translation”，中文意思是“网络地址转换”，请求进来的时候，nginx修改数据包里面的目标IP、源IP和源端口，然后把数据包发向目标服务器，服务器处理完成后，nginx再做一次修改，返回给请求的客户端。
>
> - 7层代理：需要读取并解析http请求内容，然后根据具体内容(url, 参数, cookie, 请求头)然后转发到相应的服务器。
>   转发的过程是：建立和目标机器的连接，然后转发请求，收到响应数据在转发给请求客户端。
>
> - 性能：
>   理论上4层要比7层快，因为7层代理需要解析数据包的具体内容，需要消耗额外的cpu。但nginx具体强大的网络并发处理能力， 对于一些慢连接，nginx可以先将网络请求数据缓冲完了一次性转发给上游server，这样对于上游网络并发处理能力弱的服务器(比如tomcat)，这样对tomcat来说就是慢连接变成快连接(nginx到tomcat基本上都是可靠内网)，从而节省网络数据缓冲时间，提供并发性能。
>
> - 灵活性：
>   由于4层代理用的是NAT，所以nginx不知道请求的具体内容，所以nginx啥也干不了。 用7层代理，可以根据请求内容(url,参数，cookie,请求头)做很多事情，比如：
>   a.动态代理：不同的url转发到不同服务器。
>   b.风控：屏蔽外网IP请求某些敏感url；根据参数屏蔽某些刷单用户。
>   c.审计：在nginx层记录请求日志
>   …

##### 4、统一存储(推荐)

可以将session统一存储在数据库中，每个服务都访问同样的数据库，本次采用的就是这种方式，采用的时非关系型数据库`redis`

![image-20220807162955043](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.4.png)

优点：没有安全隐患

可以水平扩展，数据库/缓存水平切分即可

web-server重启或者扩容都不会有 session丢失

缺点：增加了一次网络调用，并且需要修改应用代码；如将所有的getSession方法替 换为从Redis查数据的方式。redis获取数据比内存慢很多

上面缺点可以用SpringSession完美解决

##### 不同服务，子域session共享问题

`jsessionid`这个`cookie`默认是当前系统域名的。当我们分拆服务，不同域名部署的时候，我们可以使用如下解决方案；

修改`cookie`的`domain`为`.gulimall.com`本域名及其子域名，然后所有的`seesion`都统一存储到`redis`里

![image-20220807163133974](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.1.5.png)

#### 2、整合SpringSession

##### 1、引入SpringSession

首先在`gulimall-auth-server`模块的`pom.xml`文件里引入`spring-session-data-redis`的`jar`包

```xml
<!--引入SpringSession-->
<dependency>
   <groupId>org.springframework.session</groupId>
   <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220806190404319](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.1.png)

在`src/main/resources/application.properties`配置文件中

##### 2、添加配置

```properties
# Session store type.
spring.session.store-type=redis
# Session timeout. If a duration suffix is not specified, seconds is used.
server.servlet.session.timeout=30m
# Sessions flush mode.
spring.session.redis.flush-mode=on_save
# Namespace for keys used to store sessions.
spring.session.redis.namespace=spring:session
```

配置`redis`的连接信息

```properties
spring.redis.host=192.168.56.10
spring.redis.port=6379
#spring.redis.password=root
```

![image-20221214090946947](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.2.1.png)

启动类上添加该注解

```java
@EnableRedisHttpSession
```

![image-20220806193029395](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.2.2.png)

##### 3、测试

点击 http://auth.gulimall.com/login.html 页面的`gitee`，报了如下错误

![GIF 2022-8-7 16-56-22](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.3.1.gif)

由于要向`reids`里保存数据，而默认又使用`jdk`进行序列化，因此需要把`MemberEntityTo`继承`Serializable`接口，使其序列化为二进制串才可以

```bash
org.springframework.data.redis.serializer.SerializationException: Cannot serialize; nested exception is org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.lang.IllegalArgumentException: DefaultSerializer requires a Serializable payload but received an object of type [com.atguigu.common.to.MemberEntityTo]
```

![image-20220807165722818](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.3.2.png)

在`gulimall-common`模块的`com.atguigu.common.to.MemberEntityTo`类里实现`Serializable`接口，即可实现序列化

```java
public class MemberEntityTo implements Serializable {
	......
}
```

![image-20220807165925806](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.3.3.png)

重启`GulimallAuthServerApplication`服务，退出`gitee`(或清空`gitee`网站的cookie)

![image-20220807163633204](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.3.4.png)

重新测试，此时`redis`里就有数据了

![GIF 2022-8-7 17-06-13](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.3.5.png)

##### 4、其他模块引入SpringSession

在`gulimall-product`模块的`pom.xml`文件中引入SpringSession

```xml
<!--引入SpringSession-->
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220807171900898](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.4.1.png)

在`gulimall-product`模块的启动类`com.atguigu.gulimall.product.GulimallProductApplication`上添加开启使用redis存储session的注解

```java
@EnableRedisHttpSession
```

![image-20220807171943750](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.4.2.png)

在`gulimall-product`模块的`src/main/resources/application.properties`配置文件里选择session存储在redis中

```properties
spring.session.store-type=redis
```

![image-20220807172043746](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.4.3.png)

在redis里清空`spring:session`命令空间的数据

![image-20220807190611065](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.4.4.png)

##### 5、显示session中用户的昵称

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里的`你好，请登录`后面添加如下代码，显示一下session里存储的昵称，看一下是否能正常工作

```
[[${session.data.nickname}]]
```

![image-20220807190049190](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.1.png)

访问 http://gulimall.com/ 报了如下的错误，提示没有`nickname`这个字段

```bash
Caused by: org.springframework.expression.spel.SpelEvaluationException: EL1007E: Property or field 'nickname' cannot be found on null
	at org.springframework.expression.spel.ast.PropertyOrFieldReference.readProperty(PropertyOrFieldReference.java:213)
	at org.springframework.expression.spel.ast.PropertyOrFieldReference.getValueInternal(PropertyOrFieldReference.java:104)
	at org.springframework.expression.spel.ast.PropertyOrFieldReference.access$000(PropertyOrFieldReference.java:51)
	at org.springframework.expression.spel.ast.PropertyOrFieldReference$AccessorLValue.getValue(PropertyOrFieldReference.java:406)
	at org.springframework.expression.spel.ast.CompoundExpression.getValueInternal(CompoundExpression.java:90)
	at org.springframework.expression.spel.ast.SpelNodeImpl.getValue(SpelNodeImpl.java:109)
	at org.springframework.expression.spel.standard.SpelExpression.getValue(SpelExpression.java:328)
	at org.thymeleaf.spring5.expression.SPELVariableExpressionEvaluator.evaluate(SPELVariableExpressionEvaluator.java:263)
	... 76 more
```

![image-20220807190154121](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.2.png)

可以将刚刚添加的代码修改成如下方式(data后面加了个`?`，即`session.data`存在才获取`nickname`)

```js
[[${session.data?.nickname}]]
```

不可以使用如下方式，使用如下方式会报错

```js
[[*{session.data.nickname}]]
```

参考： https://github.com/thymeleaf/thymeleaf-spring/issues/186

![image-20220807190247265](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.3.png)

再次刷新页面，这次没有报错

![image-20220807190341361](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.4.png)

继续访问 http://auth.gulimall.com/login.html 页面使用gitee登录，回到 http://gulimall.com/ 页面继续报错

![GIF 2022-8-7 19-11-31](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.5.png)

在`com.atguigu.common.to.MemberEntityTo`类里没有`nickname`字段，这是没有`getNickname()`方法导致的

```
Caused by: org.springframework.expression.spel.SpelEvaluationException: EL1008E: Property or field 'nickname' cannot be found on object of type 'com.atguigu.common.to.MemberEntityTo' - maybe not public or not valid?
	at org.springframework.expression.spel.ast.PropertyOrFieldReference.readProperty(PropertyOrFieldReference.java:217)
	at org.springframework.expression.spel.ast.PropertyOrFieldReference.getValueInternal(PropertyOrFieldReference.java:104)
	at org.springframework.expression.spel.ast.PropertyOrFieldReference.access$000(PropertyOrFieldReference.java:51)
	at org.springframework.expression.spel.ast.PropertyOrFieldReference$AccessorLValue.getValue(PropertyOrFieldReference.java:406)
	at org.springframework.expression.spel.ast.CompoundExpression.getValueInternal(CompoundExpression.java:90)
	at org.springframework.expression.spel.ast.SpelNodeImpl.getValue(SpelNodeImpl.java:109)
	at org.springframework.expression.spel.standard.SpelExpression.getValue(SpelExpression.java:328)
	at org.thymeleaf.spring5.expression.SPELVariableExpressionEvaluator.evaluate(SPELVariableExpressionEvaluator.java:263)
```

![image-20220807190713579](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.6.png)

参考：https://stackoverflow.com/questions/57369016/el1008e-property-or-field-username-cannot-be-found-on-object-of-type-user

忘记使用`@Data`注解了，在`gulimall-common`模块的`com.atguigu.common.to.MemberEntityTo`类上添加`@Data`注解即可

![image-20220807191103932](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.7.png)

重启`GulimallAuthServerApplication`服务，清空`redis`，再次使用`gitee`登录，这次就成功显示用户名了

![GIF 2022-8-7 19-15-19](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.8.gif)

但是这个使用`cookie`存储的`session`只有本域名有效，在 http://gulimall.com/ 页面下查看`cookie`，可以看到名为`SESSION`的`cookie`，它的`Domain`为`gulimall.com`，即只在 http://gulimall.com/ 页面有效，在其子域名下无效

![image-20220807192020569](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.9.png)

打开 http://auth.gulimall.com/login.html 页面，可以看到就没有这个名为`SESSION`的`cookie`了

![image-20220807192022495](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.5.10.png)

##### 6、gitee添加成功回调

在gitee的设置 -> 第三方应用 -> 我的应用 -> 谷粒商城 里添加**应用回调地址**为如下所示

```
http://auth.gulimall.com/oauth2.0/gitee/success
```

![image-20220807195355737](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.6.1.png)

修改`gulimall-auth-server`模块的的`src/main/resources/templates/login.html`模块的`gitee`登录的`<a>`标签的`href`，修改登陆成功的回调地址为`http://auth.gulimall.com/oauth2.0/gitee/success`

```html
<li>
   <a href="https://gitee.com/oauth/authorize?client_id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d&redirect_uri=http://auth.gulimall.com/oauth2.0/gitee/success&response_type=code">
      <img style="width: 55px;height: 45px" src="https://gitee.com/static/images/logo-black.svg?t=158106666" />
   </a>
</li>
```

![image-20220807195453473](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.6.2.png)

删除`gulimall-gateway`模块`src/main/resources/application.yml`文件的如下配置

```yaml
- id: gulimall_oauth2_route
  uri: lb://gulimall-auth-server
  predicates:
    - Path=/oauth2.0/**
```

![image-20220807195556960](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.6.3.png)

在`gulimall-auth-server`模块的`src/main/resources/application.properties`配置文件里将相关配置修改为如下（即修改登录成功后，重定向的地址）

```properties
oauth2.gitee.client-id=065cf9a0adda5fdc2de82bb00bc97c447baf0ba6fc32aec45fe382008ccc9a6d
oauth2.gitee.redirect-uri=http://auth.gulimall.com/oauth2.0/gitee/success
oauth2.gitee.client-secret=0c58d0cca9c3fe12bd6c6824f6dc04cdbce5b07cad784c9b8d5938342fc004f7
```

![image-20220807200648197](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.6.4.png)

修改成功并重启`gulimall-gateway`模块和`gulimall-auth-server`模块后，可以看到首页没有显示`无名氏`，`http://gulimall.com/`域名没有名为`SESSION`的`cookie`，只有`http://auth.gulimall.com`域名有该`cookie`

![GIF 2022-8-7 20-18-50](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.2.6.5.gif)

#### 3、修改cookie作用范围和JSON序列化器

##### 1、cookie作用范围配置

查看官方文档，可以使用如下方式修改cookie作用范围为**当前域名及其子域名**，同时也可以设置cookie的名字等

```
1、默认发的令牌。session=dsajkdjl.作用域:当前域; (解决子域session共享问题)
2、使用JSON的序列化方式来序列化对象数据到redis中
```

https://docs.spring.io/spring-session/docs/2.5.0/reference/html5/guides/java-custom-cookie.html

```java
@Bean
public CookieSerializer cookieSerializer() {
    DefaultCookieSerializer serializer = new DefaultCookieSerializer();
    //We customize the name of the cookie to be JSESSIONID
    serializer.setCookieName("JSESSIONID");
    //We customize the path of the cookie to be / (rather than the default of the context root).
    serializer.setCookiePath("/");
    /**
     We customize the domain name pattern (a regular expression) to be ^.+?\\.(\\w+\\.[a-z]+)$.
     This allows sharing a session across domains and applications.
     If the regular expression does not match, no domain is set and the existing domain is used.
     If the regular expression matches, the first grouping is used as the domain.
     This means that a request to https://child.example.com sets the domain to example.com.
     However, a request to http://localhost:8080/ or https://192.168.1.100:8080/ leaves the cookie unset      and, thus, still works in development without any changes being necessary for production.
     **/
    serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
    return serializer;
}
```

![image-20220807194309362](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.1.1.png)

默认使用jdk进行序列化，使用jdk序列化不能通用，因此可以修改为JSON格式

https://docs.spring.io/spring-session/reference/samples.html

![image-20220807192255113](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.1.2.png)

##### 2、Json序列化器配置

使用JSON进行序列化的相关代码如下所示：

https://github.com/spring-projects/spring-session/blob/2.7.0/spring-session-samples/spring-session-sample-boot-redis-json/src/main/java/sample/config/SessionConfig.java

```java
@Bean
public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
	return new GenericJackson2JsonRedisSerializer(objectMapper());
}
```

![image-20220807194511140](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.2.1.png)

使用`GenericJackson2JsonRedisSerializer`会保存序列化对象的完全限定名

![image-20220807194750745](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.2.2.png)

##### 3、修改代码

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config`包下添加`GulimallSessionConfig`配置类，用于修改cookie的作用范围为当前域名和子域名，修改redis的序列化器为json序列化器

使用该配置后，我们可以将Spring Session默认的Cookie Key从`SESSION`替换为`GULIMALL_JSESSIONID`。而CookiePath设置为根路径且DomainNamePattern配置了相关的正则表达式，可以达到同父域下的单点登录的效果，在未涉及跨域的单点登录系统中(跨域的单点登录系统指的是根域名不同的多个系统之间实现一个系统登录，全系统都登录。一个系统退出登录，全系统都退出登录)，这是一个非常优雅的解决方案。如果我们的当前域名是 `auth.gulimall.com`，该正则会将Cookie设置在父域 `gulimall.com`中，如果有另一个相同父域的子域名`search.gulimall.com`也会识别这个Cookie，便可以很方便的实现同父域下的单点登录。

```java
package com.atguigu.gulimall.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
@Configuration
public class GulimallSessionConfig {
    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        // We customize the name of the cookie to be JSESSIONID.
        serializer.setCookieName("GULIMALL_JSESSIONID");
        //We customize the path of the cookie to be / (rather than the default of the context root).
        serializer.setCookiePath("/");
        //If the regular expression matches, the first grouping is used as the domain.
        //This means that a request to https://child.example.com sets the domain to example.com.
        //However, a request to http://localhost:8080/ or https://192.168.1.100:8080/ leaves the cookie unset and,
        // thus, still works in development without any changes being necessary for production.
        serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return serializer;
    }

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }


}
```

![image-20220807202944114](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.3.1.png)

复制一份`GulimallSessionConfig`配置类，粘贴到`gulimall-product`模块的`com.atguigu.gulimall.product.config`包下

```java
package com.atguigu.gulimall.product.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
@Configuration
public class GulimallSessionConfig {
    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        //	We customize the name of the cookie to be JSESSIONID.
        serializer.setCookieName("GULIMALL_JSESSIONID");
        //We customize the path of the cookie to be / (rather than the default of the context root).
        serializer.setCookiePath("/");
        //If the regular expression matches, the first grouping is used as the domain.
        //This means that a request to https://child.example.com sets the domain to example.com.
        //However, a request to http://localhost:8080/ or https://192.168.1.100:8080/ leaves the cookie unset and,
        // thus, still works in development without any changes being necessary for production.
        serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return serializer;
    }

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }


}
```

![image-20220807204934777](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.3.2.png)

清空首页和登录页的cookie，在 http://auth.gulimall.com/login.html 页面刷新后查看cookie，名字改为了`GULIMALL_JSESSIONID`但是`domain`还是`auth.gulimall.com`，修改并未生效

![image-20220807203331698](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.3.3.png)

打开 http://gulimall.com/ 页面查看cookie，这里面就没有名为`GULIMALL_JSESSIONID`的cookie了

![image-20220807211710277](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.3.4.png)

查看redis里的数据，数据也变为`json`格式了，就只有cookie的作用范围有点问题

![image-20220807203417640](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.3.5.png)

##### 4、重新修改代码

只好将`DomainName`修改为`gulimall.com`了

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config.GulimallSessionConfig`类里，将`cookieSerializer()`方法的`serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");`修改为`serializer.setDomainName("gulimall.com");`

```java
@Bean
public CookieSerializer cookieSerializer() {
    DefaultCookieSerializer serializer = new DefaultCookieSerializer();
    // We customize the name of the cookie to be JSESSIONID.
    serializer.setCookieName("GULIMALL_JSESSIONID");
    serializer.setDomainName("gulimall.com");
    ////We customize the path of the cookie to be / (rather than the default of the context root).
    //serializer.setCookiePath("/");
    ////If the regular expression matches, the first grouping is used as the domain.
    ////This means that a request to https://child.example.com sets the domain to example.com.
    ////However, a request to http://localhost:8080/ or https://192.168.1.100:8080/ leaves the cookie unset and,
    //// thus, still works in development without any changes being necessary for production.
    ////亲测不生效
    //serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
    return serializer;
}
```

![image-20220807211555730](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.4.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.config.GulimallSessionConfig`类里，将`cookieSerializer()`方法的`serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");`修改为`serializer.setDomainName("gulimall.com");`

![image-20220807211600180](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.4.2.png)

清空首页和登录页的cookie， 打开 http://gulimall.com/ 页面并刷新，此时cookie 的作用范围才为当前域名和子域名(`.gulimall.com`前面有个`.`即表示当前域名和子域名)。

![image-20220807211520607](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.4.3.png)

http://auth.gulimall.com/login.html 页面也有此 cookie 了

![image-20220807211512492](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.3.4.4.png)

#### 4、源码解读

我们在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.GulimallAuthServerApplication`启动类上使用了`@EnableRedisHttpSession`注解

`org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession`注解导入了`RedisHttpSessionConfiguration`

```java
@Import({RedisHttpSessionConfiguration.class})
```

![image-20220807211933163](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.1.png)

在`RedisHttpSessionConfiguration`类里向容器中注入了`RedisOperationsSessionRepository`  使用`redis`操作`Session`的持久层仓库(session的增删改查封装类)

```java
@Bean
public RedisOperationsSessionRepository sessionRepository() {
    RedisTemplate<Object, Object> redisTemplate = this.createRedisTemplate();
    RedisOperationsSessionRepository sessionRepository = new RedisOperationsSessionRepository(redisTemplate);
    sessionRepository.setApplicationEventPublisher(this.applicationEventPublisher);
    if (this.defaultRedisSerializer != null) {
        sessionRepository.setDefaultSerializer(this.defaultRedisSerializer);
    }
```

![image-20220807212155349](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.2.png)

在`RedisOperationsSessionRepository`类里使用`ctrl + F12`快捷键，可以看到该类有增删查改redis的方法

![image-20220807214019282](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.3.png)

返回到`RedisHttpSessionConfiguration`类，可以看到`RedisHttpSessionConfiguration`类继承于`SpringHttpSessionConfiguration`

![image-20220807212706762](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.4.png)

在`SpringHttpSessionConfiguration`构造器执行之后，初始化了一个`CookieSerializer`

```java
@PostConstruct
public void init() {
    CookieSerializer cookieSerializer = this.cookieSerializer != null ? this.cookieSerializer : this.createDefaultCookieSerializer();
    this.defaultHttpSessionIdResolver.setCookieSerializer(cookieSerializer);
}
```

![image-20220807212802272](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.5.png)

`SpringHttpSessionConfiguration`向容器中放了一个`SessionEventHttpSessionListenerAdapter`监听器，监听`服务器停机`，`Session的序列化`、`Session反序列化`、`session的活化`、`Session的钝化`等各种过程

(一)钝化

当服务器正常关闭时,还存活着的session(在设置时间内没有销毁)会随着服务器的关闭被以文件(“SESSIONS.ser”)的形式存储在tomcat的work目录下,这个过程叫做Session的钝化。

(二)活化

当服务器再次正常开启时,服务器会找到之前的“SESSIONS.ser”文件，从中恢复之前保存起来的Session对象，这个过程叫做Session的活化。

(三)注意事项

1）想要随着Session被钝化、活化的对象它的类必须实现Serializable接口，还有要注意的是只有在服务器正常关闭的条件下，还未超时的Session才会被钝化成文件。当Session超时、调用invalidate方法或者服务器在非正常情况下关闭时，Session都不会被钝化，因此也就不存在活化。

2）在被钝化成“SESSIONS.ser”文件时，不会因为超过Session过期时间而消失，这个文件会一直存在，等到下一次服务器开启时消失。

3）当多个Session被钝化时，这些被钝化的Session都被保存在一个文件中，并不会为每个Session都建立一个文件。

4）session中的数据与服务器是否关闭无关，只跟浏览器是否关闭有关。

```java
@Bean
public SessionEventHttpSessionListenerAdapter sessionEventHttpSessionListenerAdapter() {
    return new SessionEventHttpSessionListenerAdapter(this.httpSessionListeners);
}
```

![image-20220807212910677](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.6.png)

`SpringHttpSessionConfiguration`类还向容器中存放了`SessionRepositoryFilter`（`Session`存储过滤器）

```java
@Bean
public <S extends Session> SessionRepositoryFilter<? extends Session> springSessionRepositoryFilter(SessionRepository<S> sessionRepository) {
    SessionRepositoryFilter<S> sessionRepositoryFilter = new SessionRepositoryFilter(sessionRepository);
    sessionRepositoryFilter.setServletContext(this.servletContext);
    sessionRepositoryFilter.setHttpSessionIdResolver(this.httpSessionIdResolver);
    return sessionRepositoryFilter;
}
```

![image-20220807213346332](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.7.png)

返回的`org.springframework.session.web.http.SessionRepositoryFilter`继承自`org.springframework.session.web.http.OncePerRequestFilter`

![image-20220807213534778](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.8.png)

而`org.springframework.session.web.http.OncePerRequestFilter`实现了一个`Filter`

![image-20220807213552684](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.9.png)

而这个`Filter`就是`javax.servlet.Filter`，即SpringSession主要就是通过filter实现的

![image-20220807213627268](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.10.png)

`SessionRepositoryFilter`的`SessionRepositoryFilter`方法会到容器中找`SessionRepository`，而`SessionRepository`就是刚刚看到的`RedisOperationsSessionRepository` （使用`redis`操作`Session`的持久层仓库）

```java
public SessionRepositoryFilter(SessionRepository<S> sessionRepository) {
    if (sessionRepository == null) {
        throw new IllegalArgumentException("sessionRepository cannot be null");
    } else {
        this.sessionRepository = sessionRepository;
    }
}
```

![image-20220807214300525](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.11.png)

`org.springframework.session.web.http.SessionRepositoryFilter`重写了父类`org.springframework.session.web.http.OncePerRequestFilter`的`doFilterInternal`方法

![image-20220807214711076](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.12.png)

而`org.springframework.session.web.http.OncePerRequestFilter`又重写了`javax.servlet.Filter`的`doFilter`，然后调用`doFilterInternal(httpRequest, httpResponse, filterChain);`方法执行相应功能（Spring和Tomcat都是这样，先实现jsr规范的接口做一些初始化或者异常捕获这些通用的事情，期间会调用`xxxInternal`方法执行真正的功能，`xxxInternal`方法为抽象方法，让其子类去实现该抽象方法以完成实际的功能）

```java
/**
 * This {@code doFilter} implementation stores a request attribute for
 * "already filtered", proceeding without filtering again if the attribute is already
 * there.
 * @param request the request
 * @param response the response
 * @param filterChain the filter chain
 * @throws ServletException if request is not HTTP request
 * @throws IOException in case of I/O operation exception
 */
@Override
public final void doFilter(ServletRequest request, ServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

   if (!(request instanceof HttpServletRequest)
         || !(response instanceof HttpServletResponse)) {
      throw new ServletException(
            "OncePerRequestFilter just supports HTTP requests");
   }
   HttpServletRequest httpRequest = (HttpServletRequest) request;
   HttpServletResponse httpResponse = (HttpServletResponse) response;
   String alreadyFilteredAttributeName = this.alreadyFilteredAttributeName;
   boolean hasAlreadyFilteredAttribute = request
         .getAttribute(alreadyFilteredAttributeName) != null;

   if (hasAlreadyFilteredAttribute) {
      if (DispatcherType.ERROR.equals(request.getDispatcherType())) {
         doFilterNestedErrorDispatch(httpRequest, httpResponse, filterChain);
         return;
      }
      // Proceed without invoking this filter...
      filterChain.doFilter(request, response);
   }
   else {
      // Do invoke this filter...
      request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);
      try {
         doFilterInternal(httpRequest, httpResponse, filterChain);
      }
      finally {
         // Remove the "already filtered" request attribute for this request.
         request.removeAttribute(alreadyFilteredAttributeName);
      }
   }
}
```

![image-20220807214927002](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.13.png)

因此核心原理在`org.springframework.session.web.http.SessionRepositoryFilter`类的`doFilterInternal`方法

```java
@Override
protected void doFilterInternal(HttpServletRequest request,
      HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
   request.setAttribute(SESSION_REPOSITORY_ATTR, this.sessionRepository);

   SessionRepositoryRequestWrapper wrappedRequest = new SessionRepositoryRequestWrapper(
         request, response, this.servletContext);
   SessionRepositoryResponseWrapper wrappedResponse = new SessionRepositoryResponseWrapper(
         wrappedRequest, response);

   try {
      filterChain.doFilter(wrappedRequest, wrappedResponse);
   }
   finally {
      wrappedRequest.commitSession();
   }
}
```

![image-20220807214711076](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.14.png)

向session中存放key为`org.springframework.session.SessionRepository`的`RedisOperationsSessionRepository`对象

`request.setAttribute`是在同一个请求共享数据的，把`this.sessionRepository`放到当前请求，当前的同一次请求，都使用的是同一个`sessionRepository`（全系统就一个）

```
request.setAttribute(SESSION_REPOSITORY_ATTR, this.sessionRepository);
```

把原生的请求对象`request, response, this.servletContext`传给`SessionRepositoryRequestWrapper`进行包装(包装原始请求对象)（装饰者模式）（`SessionRepositoryRequestWrapper`类为`org.springframework.session.web.http.SessionRepositoryFilter`类的内部类）

```
SessionRepositoryRequestWrapper wrappedRequest = new SessionRepositoryRequestWrapper(
         request, response, this.servletContext);
```

然后又把包装的`SessionRepositoryRequestWrapper`和`response`传给`SessionRepositoryResponseWrapper`进行包装（包装原始响应对象）（`SessionRepositoryResponseWrapper`类为`org.springframework.session.web.http.SessionRepositoryFilter`类的内部类）

```
SessionRepositoryResponseWrapper wrappedResponse = new SessionRepositoryResponseWrapper(
         wrappedRequest, response);
```

将通过包装后的`SessionRepositoryRequestWrapper`和`SessionRepositoryResponseWrapper` 放行给`filter`链，`filter`链执行完后就会放到`Controller`（包装后的对象应用到了后面的整个执行链）

```
filterChain.doFilter(wrappedRequest, wrappedResponse);
```

![image-20220808090432071](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.15.png)

`doFilterInternal`方法把原生的`request`、`response`包装成了`wrappedRequest`、`wrappedResponse`，执行`request.getSession()`相当于执行`wrappedRequest.getSession()`

而`SessionRepositoryRequestWrapper`类重写了`getSession`

原生的`javax.servlet.http.HttpServletRequest`

```java
/**
 * Returns the current session associated with this request, or if the
 * request does not have a session, creates one.
 *
 * @return the <code>HttpSession</code> associated with this request
 * @see #getSession(boolean)
 */
public HttpSession getSession();
```

![image-20221226112612769](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.16.png)

:pushpin:在一个Web应用程序中可以注册多个Filter程序，每个Filter程序都可以针对某一个URL进行拦截。如果多个Filter程序都对同一个URL进行拦截，那么这些Filter就会组成一个**Filter链(也叫过滤器链)**
内部类`org.springframework.session.web.http.SessionRepositoryFilter.SessionRepositoryRequestWrapper`重写后的`getSession();`方法

```java
@Override
public HttpSessionWrapper getSession(boolean create) {
   HttpSessionWrapper currentSession = getCurrentSession();
   if (currentSession != null) {
      return currentSession;
   }
   S requestedSession = getRequestedSession();
   if (requestedSession != null) {
      if (getAttribute(INVALID_SESSION_ID_ATTR) == null) {
         requestedSession.setLastAccessedTime(Instant.now());
         this.requestedSessionIdValid = true;
         currentSession = new HttpSessionWrapper(requestedSession, getServletContext());
         currentSession.setNew(false);
         setCurrentSession(currentSession);
         return currentSession;
      }
   }
   else {
      // This is an invalid session id. No need to ask again if
      // request.getSession is invoked for the duration of this request
      if (SESSION_LOGGER.isDebugEnabled()) {
         SESSION_LOGGER.debug(
               "No session found by id: Caching result for getSession(false) for this HttpServletRequest.");
      }
      setAttribute(INVALID_SESSION_ID_ATTR, "true");
   }
   if (!create) {
      return null;
   }
   if (SESSION_LOGGER.isDebugEnabled()) {
      SESSION_LOGGER.debug(
            "A new session was created. To help you troubleshoot where the session was created we provided a StackTrace (this is not an error). You can prevent this from appearing by disabling DEBUG logging for "
                  + SESSION_LOGGER_NAME,
            new RuntimeException(
                  "For debugging purposes only (not an error)"));
   }
   S session = SessionRepositoryFilter.this.sessionRepository.createSession();
   session.setLastAccessedTime(Instant.now());
   currentSession = new HttpSessionWrapper(session, getServletContext());
   setCurrentSession(currentSession);
   return currentSession;
}
```

![image-20220808094820279](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.17.png)

首先调用本内部类的`getCurrentSession()`方法，查询`SESSION_REPOSITORY_ATTR`

```java
@SuppressWarnings("unchecked")
private HttpSessionWrapper getCurrentSession() {
   return (HttpSessionWrapper) getAttribute(CURRENT_SESSION_ATTR);
}
```

![image-20220808095133989](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.18.png)

如果不等于空了就返回当前`Session`

```java
@Override
public HttpSessionWrapper getSession(boolean create) {
   HttpSessionWrapper currentSession = getCurrentSession();
   if (currentSession != null) {
      return currentSession;
   }
   S requestedSession = getRequestedSession();
   ...
}
```

![image-20220808095247834](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.19.png)

如果为空了就在`sessionRepository`里重新获取

```java
private S getRequestedSession() {
   if (!this.requestedSessionCached) {
      List<String> sessionIds = SessionRepositoryFilter.this.httpSessionIdResolver
            .resolveSessionIds(this);
      for (String sessionId : sessionIds) {
         if (this.requestedSessionId == null) {
            this.requestedSessionId = sessionId;
         }
         S session = SessionRepositoryFilter.this.sessionRepository
               .findById(sessionId);
         if (session != null) {
            this.requestedSession = session;
            this.requestedSessionId = sessionId;
            break;
         }
      }
      this.requestedSessionCached = true;
   }
   return this.requestedSession;
}
```

![image-20220808095507267](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.20.png)

如果还没有并且本`getSession(boolean create)`方法传过来的create为true的话，还会在redis中创建session。不过最开始设置的`create`为false，直接return了

```java
S session = SessionRepositoryFilter.this.sessionRepository.createSession();
session.setLastAccessedTime(Instant.now());
currentSession = new HttpSessionWrapper(session, getServletContext());
setCurrentSession(currentSession);
return currentSession;
```

![image-20221226115035822](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.21.png)

而这个`SessionRepository`就是以前放的`RedisOperationsSessionRepository`，所以对`session`的操作全在`redis`里

```java
private final SessionRepository<S> sessionRepository;
```

![image-20220808095717747](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.22.png)

`SessionRepository`里定义了增删改查的方法，并且也有`redis`的实现

```java
public interface SessionRepository<S extends Session> {

	/**
	 * Creates a new {@link Session} that is capable of being persisted by this
	 * {@link SessionRepository}.
	 *
	 * <p>
	 * This allows optimizations and customizations in how the {@link Session} is
	 * persisted. For example, the implementation returned might keep track of the changes
	 * ensuring that only the delta needs to be persisted on a save.
	 * </p>
	 *
	 * @return a new {@link Session} that is capable of being persisted by this
	 * {@link SessionRepository}
	 */
	S createSession();

	/**
	 * Ensures the {@link Session} created by
	 * {@link org.springframework.session.SessionRepository#createSession()} is saved.
	 *
	 * <p>
	 * Some implementations may choose to save as the {@link Session} is updated by
	 * returning a {@link Session} that immediately persists any changes. In this case,
	 * this method may not actually do anything.
	 * </p>
	 *
	 * @param session the {@link Session} to save
	 */
	void save(S session);

	/**
	 * Gets the {@link Session} by the {@link Session#getId()} or null if no
	 * {@link Session} is found.
	 *
	 * @param id the {@link org.springframework.session.Session#getId()} to lookup
	 * @return the {@link Session} by the {@link Session#getId()} or null if no
	 * {@link Session} is found.
	 */
	S findById(String id);

	/**
	 * Deletes the {@link Session} with the given {@link Session#getId()} or does nothing
	 * if the {@link Session} is not found.
	 * @param id the {@link org.springframework.session.Session#getId()} to delete
	 */
	void deleteById(String id);
}
```

![image-20220808100406889](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.23.png)

返回null以后，进到了`org.springframework.web.servlet.support.SessionFlashMapManager`类的`retrieveFlashMaps`方法，由于调用的`request.getSession(false);`返回了null，因此session为null，直接返回null了

```java
public class SessionFlashMapManager extends AbstractFlashMapManager {

   /**
    * Retrieves saved FlashMap instances from the HTTP session, if any.
    */
   @Override
   @SuppressWarnings("unchecked")
   @Nullable
   protected List<FlashMap> retrieveFlashMaps(HttpServletRequest request) {
      HttpSession session = request.getSession(false);
      return (session != null ? (List<FlashMap>) session.getAttribute(FLASH_MAPS_SESSION_ATTRIBUTE) : null);
   }
   ...
}
```

![image-20221226115342407](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.24.png)

由于`retrieveFlashMaps(request)`返回了null，因此`org.springframework.web.servlet.support.AbstractFlashMapManager`类的`retrieveAndUpdate`方法也返回null

```java
public abstract class AbstractFlashMapManager implements FlashMapManager {

   @Override
   @Nullable
   public final FlashMap retrieveAndUpdate(HttpServletRequest request, HttpServletResponse response) {
      List<FlashMap> allFlashMaps = retrieveFlashMaps(request);
      if (CollectionUtils.isEmpty(allFlashMaps)) {
         return null;
      }
      ...
   }
   ...
}
```

![image-20221226115742369](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.25.png)

然后就执行了`org.springframework.web.servlet.DispatcherServlet`类的`doDispatch`方法（如果看过spring mvc源码应该知道该方法，所有请求是由`doDispatch`方法处理的）

```java
public class DispatcherServlet extends FrameworkServlet {
	@Override
	protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
		logRequest(request);
		...
		if (this.flashMapManager != null) {
			FlashMap inputFlashMap = this.flashMapManager.retrieveAndUpdate(request, response);
			if (inputFlashMap != null) {
				request.setAttribute(INPUT_FLASH_MAP_ATTRIBUTE, Collections.unmodifiableMap(inputFlashMap));
			}
			request.setAttribute(OUTPUT_FLASH_MAP_ATTRIBUTE, new FlashMap());
			request.setAttribute(FLASH_MAP_MANAGER_ATTRIBUTE, this.flashMapManager);
		}

		try {
			doDispatch(request, response);
		}
		finally {
			if (!WebAsyncUtils.getAsyncManager(request).isConcurrentHandlingStarted()) {
				// Restore the original attribute snapshot, in case of an include.
				if (attributesSnapshot != null) {
					restoreAttributesAfterInclude(request, attributesSnapshot);
				}
			}
		}
	}
```

![image-20221226115914228](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.26.png)

再次点击`步过`按钮，就会发现`getSession(boolean create)`的`create`为`true`了，此时就会创建了

![image-20221226120335389](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.27.png)

通过栈轨迹可以看到是`doDispatch`方法的`mv = ha.handle(processedRequest, response, mappedHandler.getHandler());`这行代码设置的

![image-20221226120556560](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.28.png)

`mv = ha.handle(processedRequest, response, mappedHandler.getHandler());`这个方法就是返回模型和视图的

![image-20221226120733656](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.29.png)

并且可以自动续期，默认30分钟过期

![GIF 2022-8-8 10-11-13](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.30.gif)

[filter过滤链：Filter链是如何构建的？ (itcast.cn)](https://python.itcast.cn/news/20200918/14565961247.shtml)

在一个Web应用程序中可以注册多个Filter程序，每个Filter程序都可以针对某一个URL进行拦截。如果多个Filter程序都对同一个URL进行拦截，那么这些Filter就会组成一个**Filter链(也叫过滤器链)**。Filter链用FilterChain对象来表示，FilterChain对象中有一个doFilter()方法，该方法作用就是让Filter链上的当前过滤器放行，请求进入下一个Filter，接下来通过一个图例来描述Filter链的拦截过程，如图1所示。

![filter链](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.4.31.png)

当浏览器访问Web服务器中的资源时需要经过两个过滤器Filter1和Filter2，首先Filter1会对这个请求进行拦截，在Filter1过滤器中处理好请求后，通过调用Filter1的doFilter()方法将请求传递给Filter2，Filter2将用户请求处理后同样调用doFilter()方法，最终将请求发送给目标资源。当Web服务器对这个请求做出响应时，也会被过滤器拦截，这个拦截顺序与之前相反，最终将响应结果发送给客户端。

#### 5、使用session存放登录数据

##### 1、向session存放的数据

在`gulimall-common`模块的`com.atguigu.common.constant.auth.AuthServerConstant`类里添加字段，作为登录成功后，向session存放数据的key

```java
/**
 * 登录成功后，向session存放的数据
 */
public static final String LOGIN_USER = "loginUser";
```

![image-20220808105019374](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.1.1.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.OAuth2Controller`类的`giteeRegister`方法

```java
@GetMapping("/gitee/success")
public String giteeRegister(@RequestParam String code, HttpSession session){

    try {
        MemberEntityTo memberEntityTo = oAuth2Service.giteeRegister(code);
        session.setAttribute(AuthServerConstant.LOGIN_USER,memberEntityTo);
        //Cookie cookie = new Cookie("data",memberEntityTo.toString());
        //cookie.setPath("/");
        //response.addCookie(cookie);
        return "redirect:http://gulimall.com";
    }catch (Exception e){
        log.error("第三方登录失败 :{}",e.getMessage());
        return "redirect:http://auth.gulimall.com/login.html";
    }
}
```

![image-20220808105126361](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.1.2.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`的`login`方法里添加代码

```java
/**
 * 页面传递 k，v不加 @RequestBody
 * @param vo
 * @return
 */
@PostMapping("/login")
public String login(UserLoginVo vo, RedirectAttributes redirectAttributes, HttpSession session){
    R r = memberFeignService.login(vo);
    if (r.getCode()==0){
        Object data = r.get("data");
        String json = JSON.toJSONString(data);
        MemberEntityTo memberEntityTo = JSON.parseObject(json, MemberEntityTo.class);
        session.setAttribute(AuthServerConstant.LOGIN_USER,memberEntityTo);
        return "redirect:http://gulimall.com";
    }else {
        Map<String, String> errors = new HashMap<>();
        errors.put("msg",r.getMsg());
        redirectAttributes.addFlashAttribute("errors",errors);
        return "redirect:http://auth.gulimall.com/login.html";
    }
}
```

![image-20220808105605057](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.1.3.png)

修改`gulimall-product`模块`src/main/resources/templates/index.html`文件的`你好，请登录`周围代码，展示用户信息

```java
<ul>
  <li>
    <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
    <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}">你好，请登录</a>
  </li>
  <li>
    <a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}" class="li_2">免费注册</a>
  </li>
  <span>|</span>
  <li>
    <a href="#">我的订单</a>
  </li>
</ul>
```

![image-20220808110530695](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.1.4.png)

重启`GulimallProductApplication`、`GulimallAuthServerApplication`、`GulimallMemberApplication`服务

在`http://auth.gulimall.com/login.html`页面登陆后会跳转到`http://gulimall.com/`页面，再次访问`http://auth.gulimall.com/login.html`应该跳转到`http://gulimall.com/`页面

![GIF 2022-8-8 11-05-53](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.1.5.gif)

##### 2、登陆后访问登录页跳转到首页

去掉`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config.GulimallWebConfig`类的`addViewControllers`方法的`registry.addViewController("/login.html").setViewName("login");`这行代码

```java
@Override
public void addViewControllers(ViewControllerRegistry registry) {
    //registry.addViewController("/login.html").setViewName("login");
    registry.addViewController("/reg.html").setViewName("reg");
}
```

![image-20220808110902908](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.2.1.png)

在`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类里添加`loginPage`方法

```java
@GetMapping("/login.html")
public String loginPage(HttpSession session){
    Object hasLogin = session.getAttribute(AuthServerConstant.LOGIN_USER);
    if (hasLogin!=null){
        return "redirect:http://gulimall.com";
    }
    return "login";
}
```

![image-20220808111407538](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.2.2.png)

重启`gulimall-auth-server`模块和`gulimall-product`模块，如果已登录，访问 http://auth.gulimall.com/login.html 会重定向到       http://gulimall.com/ 页面

![GIF 2022-8-8 11-14-19](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.2.3.gif)

由于注册时没有昵称，所以 http://gulimall.com/ 页面没有显示昵称

![GIF 2022-8-8 11-19-32](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.2.4.gif)

##### 3、显示昵称

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberServiceImpl`类的`regist`方法里添加`memberEntity.setNickname(vo.getUsername());`，设置用户名就是昵称

```java
@Override
public void regist(MemberRegistVo vo) {
    MemberDao baseMapper = this.baseMapper;
    MemberEntity memberEntity = new MemberEntity();

    MemberLevelEntity memberLevelEntity = memberLevelDao.getDefaultLevel();
    memberEntity.setLevelId(memberLevelEntity.getId());

    //检查手机号和用户名是否唯一，使用异常机制
    checkPhoneUnique(vo.getPhone());
    checkUsernameUnique(vo.getUsername());

    memberEntity.setMobile(vo.getPhone());

    memberEntity.setUsername(vo.getUsername());
    //默认用户名也是昵称
    memberEntity.setNickname(vo.getUsername());
    //盐值加密
    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    String encode = bCryptPasswordEncoder.encode(vo.getPassword());
    memberEntity.setPassword(encode);

    baseMapper.insert(memberEntity);
}
```

![image-20220808112252595](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.3.1.png)

修改`gulimall_ums`数据库的`ums_member`表的`username`为`test01`的`nickname`为`test01`

![image-20220808113149618](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.3.2.png)

修改`gulimall-product`模块`src/main/resources/templates/item.html`文件`你好，请登录`周围代码

```html
<li style="border: 0;">
   <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
   <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}" class="aa">你好，请登录</a>
</li>
<li><a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}" style="color: red;">免费注册</a> |</li>
<li><a href="javascript:;" class="aa">我的订单</a> |</li>
<li class="jingdong"><a href="javascript:;">我的京东</a><span class="glyphicon glyphicon-menu-down">|</span>
```

![image-20220808113051591](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.3.3.png)

重启`gulimall-member`模块和`gulimall-product`模块，此时就显示昵称了

![image-20220808145909993](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.3.4.png)

##### 4、修改logo

在 http://item.gulimall.com/9.html 页面里，选择logo所在的元素，将其src修改为本项目的logo

![image-20220808150733517](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.4.1.png)

我们项目的logo是在linux的 `/mydata/nginx/html/static/item/image/logo1.jpg`位置

```
/mydata/nginx/html/static/item/image/logo1.jpg
```

![image-20220808150750988](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.4.2.png)

修改`gulimall-product`模块的`src/main/resources/templates/item.html`文件的logo的src

```
<div class="nav_top_one"><a href="http://gulimall.com"><img src="/static/item/image/logo1.jpg"/></a></div>
```

![image-20221226133616234](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.4.3.png)

重启`gulimall-product`模块，访问  http://item.gulimall.com/9.html 页面，可以看到logo显示正确

![GIF 2022-8-8 15-09-51](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.5.4.4.gif)

#### 6、`gulimall-search`整合Spring Session

在`gulimall-search`模块的`pom.xml`文件里添加如下依赖

```java
<!--操作redis的客户端-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!--用redis存session-->
<dependency>
   <groupId>org.springframework.session</groupId>
   <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220808151427429](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.6.1.png)

在`gulimall-search`模块的`src/main/resources/application.yml`文件里配置redis的连接信息和session的存储类型

```yaml
spring:
  redis:
    host: 192.168.56.10
    port: 6379
  session:
    store-type: redis
```

![image-20220808151631945](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.6.2.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplication`类上添加`@EnableRedisHttpSession`注解

```java
@EnableRedisHttpSession
```

![image-20220808151736196](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.6.3.png)

复制一份`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.config.GulimallSessionConfig`，粘贴到`gulimall-search`模块的`com.atguigu.gulimall.search.config`包下

```java
package com.atguigu.gulimall.search.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
@Configuration
public class GulimallSessionConfig {
    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        // We customize the name of the cookie to be JSESSIONID.
        serializer.setCookieName("GULIMALL_JSESSIONID");
        serializer.setDomainName("gulimall.com");
        ////We customize the path of the cookie to be / (rather than the default of the context root).
        //serializer.setCookiePath("/");
        ////If the regular expression matches, the first grouping is used as the domain.
        ////This means that a request to https://child.example.com sets the domain to example.com.
        ////However, a request to http://localhost:8080/ or https://192.168.1.100:8080/ leaves the cookie unset and,
        //// thus, still works in development without any changes being necessary for production.
        ////亲测不生效
        //serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return serializer;
    }

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }


}
```

![image-20220808151859307](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.6.4.png)

修改`gulimall-search`模块的`src/main/resources/templates/list.html`文件的`你好，请登录`周围代码

```html
<li>
    <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
    <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}" class="li_2">你好，请登录</a>
</li>
<li>
    <a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}">免费注册</a>
</li>
```

![image-20220808152108212](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.6.5.png)

重启`gulimall-search`模块，访问 http://search.gulimall.com/list.html?catalog3Id=225 页面，这里就显示昵称了

![image-20220808152237367](https://gitlab.com/apzs/image/-/raw/master/image/5.7.6.6.6.png)

### 5.7.7、单点登录

####  1、单点登录系统

参考链接： https://blog.csdn.net/MyNAMS/article/details/123855044

![](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.1.0.png)

##### 1、早期单一服务器，用户认证

![](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.1.1.png)

缺点：单点性能压力，无法扩展

##### 2、WEB应用集群，session共享模式

![](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.1.2.png)

解决了单点性能瓶颈。  

问题：

*   1、 多业务分布式数据独立管理，不适合统一维护一份session数据。
*   2、 分布式按业务功能切分，用户、认证解耦出来单独统一管理。
*   3、 cookie中使用jsessionId 容易被篡改、盗取。
*   4、 跨顶级域名无法访问。

##### 3、分布式，SSO(single sign on)模式

![](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.1.3.png)

解决 ： 
用户身份信息独立管理，更好的分布式管理。
可以自己扩展安全策略 
跨域不是问题

缺点： 
认证服务器访问压力较大。

##### 4、业务流程图  

![](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.1.4.png)

##### 5、生成token

[JWT](https://so.csdn.net/so/search?q=JWT&spm=1001.2101.3001.7020)工具

*   JWT（Json Web Token） 是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准。
*   JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上
*   JWT 最重要的作用就是对 token信息的防伪作用。
*   JWT的原理， 一个JWT由三个部分组成：公共部分、私有部分、签名部分。最后由这三者组合进行base64编码得到JWT。

![](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.1.5.png)

1.  公共部分 
    主要是该JWT的相关配置参数，比如签名的加密算法、格式类型、过期时间等等。
    
2.  私有部分
    用户自定义的内容，根据实际需要真正要封装的信息。
    
3.  签名部分
    根据用户信息+盐值+密钥生成的签名。如果想知道JWT是否是真实的只要把JWT的信息取出来，加上盐值和服务器中的密钥就可以验证真伪。所以不管由谁保存JWT，只要没有密钥就无法伪造。
    
4.  [base64编码](https://so.csdn.net/so/search?q=base64%E7%BC%96%E7%A0%81&spm=1001.2101.3001.7020)，并不是加密，只是把明文信息变成了不可见的字符串。但是其实只要用一些工具就可以吧base64编码解成明文，所以不要在JWT中放入涉及私密的信息，因为实际上JWT并不是加密信息。

#### 2、使用开源框架

多系统-单点登录业务，适用于多系统的父域名不同

![image-20220808152551728](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.0.png)

##### 1、下载

在 https://gitee.com/ 里搜索`xxl`，选择 [许雪里](https://gitee.com/xuxueli0323) / [xxl-sso](https://gitee.com/xuxueli0323/xxl-sso)

https://gitee.com/xuxueli0323/xxl-sso?_from=gitee_search

![GIF 2022-8-8 15-34-35](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.1.1.gif)

目录结构

```
doc
xxl-sso-core     核心包
xxl-sso-samples  简单的例子
xxl-sso-server   服务器
.gitignore
LICENSE
pom.xml
README.md
```

![image-20220808154616794](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.1.2.png)

##### 2、启动登录服务

在`hosts`文件里添加如下3个域名，`ssoserver.com`用作登录服务，`client1.com`和`client2.com`表示其他系统

```
127.0.0.1 ssoserver.com
127.0.0.1 client1.com
127.0.0.1 client2.com
```

![image-20220808163921294](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.2.1.png)

在`xxl-sso\xxl-sso-server\src\main\resources`的`application.properties`配置文件里，修改redis的连接地址

```properties
### web
server.port=8080
server.context-path=/xxl-sso-server

### resources
spring.mvc.static-path-pattern=/static/**
spring.resources.static-locations=classpath:/static/

### freemarker
spring.freemarker.templateLoaderPath=classpath:/templates/
spring.freemarker.suffix=.ftl
spring.freemarker.charset=UTF-8
spring.freemarker.request-context-attribute=request
spring.freemarker.settings.number_format=0.##########

### xxl-sso
xxl.sso.redis.address=redis://192.168.56.10:6379
xxl.sso.redis.expire.minute=1440
```

![image-20220808154834016](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.2.2.png)

在`xxl-sso`文件夹下执行如下命名，打包该项目

```
mvn clean package -Dmaven.skip.test=true
```

![image-20220808160221190](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.2.3.png)

```
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for xxl-sso 1.1.1-SNAPSHOT:
[INFO]
[INFO] xxl-sso ............................................ SUCCESS [  0.147 s]
[INFO] xxl-sso-core ....................................... SUCCESS [  5.561 s]
[INFO] xxl-sso-server ..................................... SUCCESS [ 33.224 s]
[INFO] xxl-sso-samples .................................... SUCCESS [  0.009 s]
[INFO] xxl-sso-web-sample-springboot ...................... SUCCESS [  0.720 s]
[INFO] xxl-sso-token-sample-springboot .................... SUCCESS [  1.147 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  45.392 s
[INFO] Finished at: 2022-08-08T15:59:35+08:00
[INFO] ------------------------------------------------------------------------
```

![image-20220808160223642](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.2.4.png)

在`xxl-sso\xxl-sso-server\target`文件夹里执行如下命令，启动`xxl-sso-server-1.1.1-SNAPSHOT.jar`

```
java -jar xxl-sso-server-1.1.1-SNAPSHOT.jar
```

![image-20220808160440611](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.2.5.png)

打开 http://ssoserver.com:8080/xxl-sso-server/login 网页，这里用于登录

![image-20220808161012786](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.2.6.png)

##### 3、启动其他服务

在`xxl-sso\xxl-sso-samples\xxl-sso-web-sample-springboot\src\main\resources`文件夹的`application.properties`配置文件里，修改`xxl.sso.server`和`xxl.sso.redis.address`

```properties
### web
server.port=8081
server.context-path=/xxl-sso-web-sample-springboot

### freemarker
spring.freemarker.request-context-attribute=request
spring.freemarker.cache=false

### resource (default: /**  + classpath:/static/ )
spring.mvc.static-path-pattern=/static/**
spring.resources.static-locations=classpath:/static/

### xxl-sso
xxl.sso.server=http://ssoserver.com:8080/xxl-sso-server
xxl.sso.logout.path=/logout
xxl-sso.excluded.paths=
xxl.sso.redis.address=redis://192.168.56.10:6379
```

![image-20220808160926998](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.1.png)

进入`xxl-sso\xxl-sso-samples\xxl-sso-web-sample-springboot`文件夹，执行如下命令

```
mvn clean package -Dmaven.skip.test=true
```

这里打包失败了

```
A:\桌面\xxl-sso\xxl-sso-samples\xxl-sso-web-sample-springboot>mvn clean package -Dmaven.skip.test=true
[INFO] Scanning for projects...
[WARNING]
[WARNING] Some problems were encountered while building the effective model for com.xuxueli:xxl-sso-web-sample-springboot:jar:1.1.1-SNAPSHOT
[WARNING] The expression ${parent.version} is deprecated. Please use ${project.parent.version} instead.
[WARNING]
[WARNING] It is highly recommended to fix these problems because they threaten the stability of your build.
[WARNING]
[WARNING] For this reason, future Maven versions might no longer support building such malformed projects.
[WARNING]
[INFO]
[INFO] -------------< com.xuxueli:xxl-sso-web-sample-springboot >--------------
[INFO] Building xxl-sso-web-sample-springboot 1.1.1-SNAPSHOT
[INFO] --------------------------------[ jar ]---------------------------------
[WARNING] The POM for com.xuxueli:xxl-sso-core:jar:1.1.1-SNAPSHOT is missing, no dependency information available
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.599 s
[INFO] Finished at: 2022-08-08T16:12:04+08:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal on project xxl-sso-web-sample-springboot: Could not resolve dependencies for project com.xuxueli:xxl-sso-web-sample-springboot:jar:1.1.1-SNAPSHOT: Could not find artifact com.xuxueli:xxl-sso-core:jar:1.1.1-SNAPSHOT -> [Help 1]
[ERROR]
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR]
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/DependencyResolutionException
```

![image-20220808161239078](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.2.png)

进入到`xxl-sso\xxl-sso-core`文件夹，执行如下命令

```
mvn install
```

![image-20220808161633658](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.3.png)

再进入`xxl-sso\xxl-sso-samples\xxl-sso-web-sample-springboot`文件夹，执行如下命令，执行还是失败了

```
mvn clean package -Dmaven.skip.test=true
```

![image-20220808161845005](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.4.png)

把刚刚启动的`xxl-sso-server`关了，重新在`xxl-sso`里打包

```
mvn clean package -Dmaven.skip.test=true
```

![image-20220808162150355](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.5.png)

这次就全部成功了

![image-20220808162152659](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.6.png)

在`xxl-sso\xxl-sso-server\target`文件夹里执行如下命令，启动`xxl-sso-server-1.1.1-SNAPSHOT.jar`

```
java -jar xxl-sso-server-1.1.1-SNAPSHOT.jar
```

![image-20220808162309292](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.7.png)

在`xxl-sso\xxl-sso-samples\xxl-sso-web-sample-springboot\target`文件夹里使用如下命令，在`8081`端口启动一个其他系统

```
java -jar xxl-sso-web-sample-springboot-1.1.1-SNAPSHOT.jar --server.port=8081
```

![image-20220808162611834](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.8.png)

在`xxl-sso\xxl-sso-samples\xxl-sso-web-sample-springboot\target`文件夹里使用如下命令，再在`8082`端口启动一个

```
java -jar xxl-sso-web-sample-springboot-1.1.1-SNAPSHOT.jar --server.port=8082
```

![image-20220808162822238](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.9.png)



一次打开如下网址

```
ssoserver.com:8080/xxl-sso-server
client1.com:8081/xxl-sso-web-sample-springboot
client2.com:8082/xxl-sso-web-sample-springboot
```

可以看到当一个系统登陆后各个系统都登录了，当一个系统退出登陆后，各个系统都退出登录了

![GIF 2022-8-8 16-36-19](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.2.3.10.gif)

原理：

```
/xxl-sso-server 登录服务器 8080 ssoserver.com

/xxl-sso-web-sample-springboot 项目1 8081 client1.com
/xxl-sso-web-sample-springboot 项目2 8082 client2.com

127.0.0.1 ssoserver.com
127.0.0.1 client1.com
127.0.0.1 client2.com

核心：三个系统即使域名不一样，想办法给三个系统同步同一个用户的票据；
1)、中央认证服务器；ssoserver.com
2)、其他系统，想要登录去ssoserver.com登录，登录成功跳转回来  
3）、只要有一个登录，其他都不用登录
4）、全系统统一一个sso-sessionid；所有系统可能域名都不相同
```

#### 3、自己实现单点登录

##### 1、新建登录服务

新建一个模块，`Group`输入`com.atguigu`，`Artifact`输入`gulimall-test-sso-server`，`Type`选择`Maven`，`Language`选择`Java`，`Packaging`选择`Jar`，`Java Version`选择`8`，`Version`不用管，`Name`输入`gulimall-test-sso-server`，`Despcription`输入`单点登录的认证服务器`，`Package`输入`com.atguigu.gulimall.ssoserver`，然后点击`Next`

```
com.atguigu
gulimall-test-sso-server
单点登录的认证服务器
com.atguigu.gulimall.ssoserver
```

![image-20220808164835763](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.1.png)

选择`Lombox`和`Spring Web`，然后点击`Next`

![image-20220808164915849](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.2.png)

点击`Finish`

![image-20220808164933481](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.3.png)

如果刚刚新建的`gulimall-test-sso-server`模块的`pom.xml`文件为赤橙色，可以选中`pom.xml`文件，然后右键，选择`Add as Maven Project`即可

![image-20220808165028477](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.4.png)

以下内容不替换

```xml
<groupId>com.atguigu</groupId>
<artifactId>gulimall-test-sso-server</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>gulimall-test-sso-server</name>
<description>单点登录的认证服务器</description>
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>

	<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<optional>true</optional>
	</dependency>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>
```

为了版本统一，`<properties>`、`<build>`、`<parent>`等都要替换

![image-20220808165509451](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.5.png)

[点击查看完整的`gulimall-test-sso-server`模块的`pom.xml`文件](code/5.7.7.3.1.pom.xml)

修改`gulimall-test-sso-server`模块的`src/test/java/com/atguigu/gulimall/ssoserver/GulimallTestSsoServerApplicationTests.java`测试类为junit5相关的

```java
package com.atguigu.gulimall.ssoserver;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallTestSsoServerApplicationTests {
   @Test
   public void contextLoads() {
   }
}
```

![image-20220808165630258](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.6.png)

在`gulimall-test-sso-server`模块的`pom.xml`文件里添加如下依赖

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

![image-20220808171653464](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.1.7.png)

##### 2、新建其他系统

新建一个模块，`Group`输入`com.atguigu`，`Artifact`输入`gulimall-test-sso-client`，`Type`选择`Maven`，`Language`选择`Java`，`Packaging`选择`Jar`，`Java Version`选择`8`，`Version`不用管，`Name`输入`gulimall-test-sso-client`，`Despcription`输入`单点登录的客户端`，`Package`输入`com.atguigu.gulimall.ssoclient`，然后点击`Next`

```
com.atguigu
gulimall-test-sso-client
单点登录的客户端
com.atguigu.gulimall.ssoclient
```

![image-20220808170027100](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.2.1.png)

选择`Lombox`、`Spring Web`、`Thymeleaf`

![image-20220808170030445](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.2.2.png)

点击`Finish`

![image-20220808170032561](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.2.3.png)

如果刚刚新建的`gulimall-test-sso-client`模块的`pom.xml`文件为赤橙色，可以选中`pom.xml`文件，然后右键，选择`Add as Maven Project`即可

![image-20220808170214945](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.2.4.png)

同样的为了版本统一，以下内容不替换，`<properties>`、`<build>`、`<parent>`等都要替换

```xml
<groupId>com.atguigu</groupId>
<artifactId>gulimall-test-sso-client</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>gulimall-test-sso-client</name>
<description>单点登录的客户端</description>

<dependencies>
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-thymeleaf</artifactId>
   </dependency>
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
   </dependency>

   <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
   </dependency>
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
   </dependency>
</dependencies>
```

![image-20220808170659953](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.2.5.png)

[点击查看完整的`gulimall-test-sso-client`模块的`pom.xml`文件](code/)

修改`gulimall-test-sso-client`模块的`src/test/java/com/atguigu/gulimall/ssoclient/GulimallTestSsoClientApplicationTests.java`测试类

```java
package com.atguigu.gulimall.ssoclient;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallTestSsoClientApplicationTests {
   @Test
   public void contextLoads() {
   }
}
```

![image-20220808170935951](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.2.6.png)

##### 3、其他系统添加接口

在`gulimall-test-sso-client`模块的`com.atguigu.gulimall.ssoclient`包下新建`controller`文件夹，在`controller`文件夹下新建`HelloController`类

```java
package com.atguigu.gulimall.ssoclient.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/8
 * @Description:
 */
@Controller
public class HelloController {

    /**
     * 不登录就可以访问
     * @return
     */
    @ResponseBody
    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    /**
     * 必须登录才可访问
     * @param model
     * @return
     */
    @GetMapping("/employees")
    public String employees(Model model){
        List<String> emps = new ArrayList<>();
        emps.add("张三");
        emps.add("李四");
        model.addAttribute("emps",emps);
        return "list";
    }
}
```

![image-20220808185455496](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.3.1.png)

在`gulimall-test-sso-client`模块的`src/main/resources`文件夹下新建`templates`文件夹，在`templates`文件夹下新建`list.html`文件

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>员工列表</title>
</head>
<body>
    <h1>欢迎： []</h1>

    <ul>
        <li th:each="emp: ${emps}">姓名： [[${emp}]]</li>
    </ul>
</body>
</html>
```

![image-20220808192145135](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.3.2.png)

在`gulimall-test-sso-client`模块的`src/main/resources/application.properties`文件里添加如下配置，将端口号改为`8081`

```properties
server.port=8081
```

![image-20220808185548331](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.3.3.png)

（我第一次访问的时候用`chrome浏览器`访问`client1.com:8081/hello`、`localhost:8081/hello`、`127.0.0.1:8081/hello`都访问不了，最后换用`Edge浏览器`可以访问，再换回`chrome浏览器`也可以访问了，就很奇怪）

http://client1.com:8081/employees

![image-20220808192355709](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.3.4.png)

http://client1.com:8081/hello

![image-20220808192358289](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.3.5.png)

可以看到都可以访问

##### 4、登录系统添加接口

在`gulimall-test-sso-server`模块的`src/main/resources/application.properties`配置文件里添加如下配置，将端口号修改为`8080`

```properties
server.port=8080
```

![image-20220808193333216](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.4.1.png)

在`gulimall-test-sso-server`模块的`src/main/resources`文件夹下新建`templates`文件夹，在`templates`文件夹下新建`login.html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录页</title>
</head>
<body>
<form action="/doLogin" method="post">
    用户名： <input name="username"> <br>
    密码： <input name="password" type="password"> <br>
    <input type="submit" value="登录">
</form>
</body>
</html>
```

![image-20220808193648749](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.4.2.png)

##### 5、其他系统添加配置

在`gulimall-test-sso-client`模块的`src/main/resources/application.properties`配置文件里添加如下配置，指定登录服务的url

```
sso.server.url=http://ssoserver.com:8080/login.html
```

![image-20220808194725231](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.5.1.png)

（不引用`spring-session-data-redis`，这里没少步骤，后面还会用其他方法的）

修改`gulimall-test-sso-client`模块的`com.atguigu.gulimall.ssoclient.controller.HelloController`类的`employees`方法

```java
/**
 * 必须登录才可访问
 * @param model
 * @return
 */
@GetMapping("/employees")
public String employees(Model model, HttpSession session){
    Object loginUser = session.getAttribute("loginUser");
    if (loginUser==null){
        //如果没登录，就跳转到登录服务器进行登录
        return "redirect:" + serverUrl;
    }
    List<String> emps = new ArrayList<>();
    emps.add("张三");
    emps.add("李四");
    model.addAttribute("emps",emps);
    return "list";
}
```

![image-20220808194719427](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.5.2.png)

只启动`GulimallTestSsoClientApplication`服务，不启动`GulimallTestSsoServerApplication`服务

可以看到在`http://client1.com:8081/employees`页面，自动跳转到了`http://ssoserver.com:8080/login.html`

`General`里的`Request URL:`为`http://client1.com:8081/employees`，`Response Headers`里的`Location:`为 `http://ssoserver.com:8080/login.html`

![GIF 2022-8-8 19-58-02](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.5.3.gif)

##### 6、登录系统添加接口并测试

在`gulimall-test-sso-server`模块的`com.atguigu.gulimall.ssoserver.controller.LoginController`类里添加` loginPage`方法，跳转到登录页

```java
@GetMapping("/login.html")
public String loginPage() {
    return "login";
}
```

![image-20220808195103772](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.6.1.png)

启动`GulimallTestSsoServerApplication`服务

访问`http://client1.com/8081/employees`页面，可以看到可以正确跳转到`http://ssoserver.com:8080/login.html`

![GIF 2022-8-8 20-29-31](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.6.2.gif)



我发现一个很玄学的事情，明明url是对的，但就是访问不了，只有上一个访问成功了才能访问的到

![GIF 2022-8-8 20-11-42](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.6.3.gif)

:cold_sweat:

![GIF 2022-8-8 20-18-38](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.6.4.gif)





##### 7、登录成功后返回

可以像这样，重定向的时候指定redirect_url告诉登录服务登录成功后要跳转的url，这样登录服务器就知道要返回到哪个地址了

```
http://ssoserver.com:8080/login.html?redirect_url=http://client1.com/8081/employees
```

![image-20220808202029647](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.1.png)

修改`gulimall-test-sso-client`模块的`src/main/java/com/atguigu/gulimall/ssoclient/controller/HelloController.java`类的`employees`方法

```java
/**
 * 必须登录才可访问
 * @param model
 * @return
 */
@GetMapping("/employees")
public String employees(Model model, HttpSession session, HttpServletRequest request){
    Object loginUser = session.getAttribute("loginUser");
    if (loginUser==null){
        //通过该方法获取到的是： http://127.0.0.1:8081/employees
        System.out.println(request.getRequestURL());
        //如果没登录，就跳转到登录服务器进行登录
        return "redirect:" + serverUrl+"?redirect_url=http://client1.com:8081/employees";
    }
    List<String> emps = new ArrayList<>();
    emps.add("张三");
    emps.add("李四");
    model.addAttribute("emps",emps);
    return "list";
}
```

![image-20220808205501228](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.2.png)

修改`gulimall-test-sso-server`模块`src/main/java/com/atguigu/gulimall/ssoserver/controller/LoginController.java`类的`loginPage`方法，向`model`里添加`url`

```java
@GetMapping("/login.html")
public String loginPage(@RequestParam("redirect_url") String url, Model model) {
    model.addAttribute("url",url);
    return "login";
}
```

![image-20220808204153711](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.3.png)

在`gulimall-test-sso-server`模块的`src/main/resources/templates/login.html`文件里引入`thymeleaf`，添加隐藏的`<input>`框，指定登陆成功跳转的url

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>登录页</title>
</head>
<body>
<form action="/doLogin" method="post">
    用户名： <input name="username"> <br>
    密码： <input name="password" type="password"> <br>
    <input type="hidden" name="url" th:value="${url}">
    <input type="submit" value="登录">
</form>
</body>
</html>
```

![image-20220808204329424](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.4.png)

在`gulimall-test-sso-server`模块的`com.atguigu.gulimall.ssoserver.controller.LoginController`类里，添加`"/doLogin`方法，用于处理表单登录请求

```java
@PostMapping("/doLogin")
public String doLogin(String username,String password,String url) {
    if (StringUtils.hasText(username) && StringUtils.hasText(password) && StringUtils.hasText(url)){
        //如果username、password、url都不为空，就返回之前页
        return "redirect:" + url;
    }
    //如果其中一个为空，就跳转到登录页
    return "login";
}
```

![image-20220808204955764](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.5.png)

重启`gulimall-test-sso-client`模块和`gulimall-test-sso-server`模块，打开如下两个页面，进行测试，发现输入用户名和密码后，貌似没有跳转成功

```
http://127.0.0.1:8081/employees
http://ssoserver.com:8080/login.html?redirect_url=http://client1.com:8081/employees
```

![GIF 2022-8-8 20-56-34](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.6.gif)





以`debug`的方式启动`gulimall-test-sso-server`模块，可以看到跳转成功了，只不过判断`session`里面没有，又跳转过来了

![GIF 2022-8-8 21-02-06](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.7.7.gif)

##### 8、引入redis

可以在`gulimall-test-sso-server`模块的`pom.xml`文件里引入`redis`

```xml
<!--引入redis-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

![image-20220808210826601](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.8.1.png)

在`gulimall-test-sso-server`模块的`src/main/resources/application.properties`配置文件里指定redis的host

```properties
spring.redis.host=192.168.56.10
```

![image-20220808210931644](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.8.2.png)

修改`gulimall-test-sso-server`模块的`com.atguigu.gulimall.ssoserver.controller.LoginController`类的`doLogin`方法

```java
@Autowired
StringRedisTemplate stringRedisTemplate;

@PostMapping("/doLogin")
public String doLogin(String username, String password, String url) {
    if (StringUtils.hasText(username) && StringUtils.hasText(password) && StringUtils.hasText(url)) {
        //如果username、password、url都不为空，就返回之前页
        String uuid = UUID.randomUUID().toString().replace("-", "");
        stringRedisTemplate.opsForValue().set(uuid,username);
        return "redirect:" + url+"?token="+uuid;
    }
    //如果其中一个为空，就跳转到登录页
    return "login";
}
```

![image-20220808211702719](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.8.3.png)

修改`gulimall-test-sso-client`模块`com.atguigu.gulimall.ssoclient.controller.HelloController`类的` employees`方法

```java
/**
 * 必须登录才可访问
 * 只要带了token，就认为这次是在ssoserver登录成功跳回来的。(当然应该在redis里查一下，这里就不做了)
 * @param model
 * @return
 */
@GetMapping("/employees")
public String employees(Model model, HttpSession session,
                        @RequestParam(value = "token",required = false)String token){
    Object loginUser = session.getAttribute("loginUser");
    if (StringUtils.hasText(token)){
        //去ssoserver登录成功跳回来就会带.上
        //TODO 1、去ssoserver获取当前token真正对应的用户信息
        session.setAttribute("loginUser","张三");
        loginUser = "张三";
    }
    if (loginUser==null){
        //通过该方法获取到的是： http://127.0.0.1:8081/employees
        //HttpServletRequest request=>System.out.println(request.getRequestURL());
        //如果没登录，就跳转到登录服务器进行登录
        return "redirect:" + serverUrl+"?redirect_url=http://client1.com:8081/employees";
    }
    List<String> emps = new ArrayList<>();
    emps.add("张三");
    emps.add("李四");
    model.addAttribute("emps",emps);
    return "list";
}
```

![image-20220808213356872](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.8.4.png)

 清空cookie 访问 http://client1.com:8081/employees 自动跳转到 http://ssoserver.com:8080/login.html?redirect_url=http://client1.com:8081/employees 页面，登陆成功后返回到了  http://client1.com:8081/employees  页面，并携带了token

![GIF 2022-8-8 21-35-59](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.8.5.gif)

但是这样只能在当前域名下`session`有效，在另一个域名下还需要再次登录

##### 9、多域名登录

复制一个`gulimall-test-sso-client`模块，起名为`gulimall-test-sso-client2`，和`gulimall-test-sso-client`模块差不多，就`artifactId`和`name`不一样

```xml
<groupId>com.atguigu</groupId>
<artifactId>gulimall-test-sso-client2</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>gulimall-test-sso-client2</name>
<description>单点登录的客户端</description>
```

![image-20220808214604391](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.1.png)

修改`gulimall-test-sso-client2`模块`com.atguigu.gulimall.ssoclient.controller.HelloController`类的`employees`，将映射地址修改为`/boss`，修改重定向地址`redirect_url`参数

```java
/**
 * 必须登录才可访问
 * 只要带了token，就认为这次是在ssoserver登录成功跳回来的。(当然应该在redis里查一下，这里就不做了)
 * @param model
 * @return
 */
@GetMapping("/boss")
public String employees(Model model, HttpSession session,
                        @RequestParam(value = "token",required = false)String token){
    Object loginUser = session.getAttribute("loginUser");
    if (StringUtils.hasText(token)){
        //去ssoserver登录成功跳回来就会带.上
        //TODO 1、去ssoserver获取当前token真正对应的用户信息
        session.setAttribute("loginUser","张三");
        loginUser = "张三";
    }
    if (loginUser==null){
        //通过该方法获取到的是： http://127.0.0.1:8081/employees
        //HttpServletRequest request=>System.out.println(request.getRequestURL());
        //如果没登录，就跳转到登录服务器进行登录
        return "redirect:" + serverUrl+"?redirect_url=http://client2.com:8082/boss";
    }
    List<String> emps = new ArrayList<>();
    emps.add("张三");
    emps.add("李四");
    model.addAttribute("emps",emps);
    return "list";
}
```

![image-20220809091826538](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.2.png)

修改`gulimall-test-sso-client2`模块的`src/main/resources/application.properties`配置文件，让其在`8082`端口启动

```properties
server.port=8082
```

![image-20220808214722475](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.3.png)

将`gulimall-test-sso-client2`模块的启动类从`GulimallTestSsoClientApplication`修改为`GulimallTestSsoClient2Application`

![image-20220808214909403](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.4.png)

修改`gulimall-test-sso-server`模块`com.atguigu.gulimall.ssoserver.controller.LoginController`类的`doLogin`方法，只要有人登录了，就给`gulimall-test-sso-server`服务留一个`cookie`

```java
@PostMapping("/doLogin")
public String doLogin(String username, String password, String url, HttpServletResponse response) {
    if (StringUtils.hasText(username) && StringUtils.hasText(password) && StringUtils.hasText(url)) {
        //如果username、password、url都不为空，就返回之前页
        String uuid = UUID.randomUUID().toString().replace("-", "");
        stringRedisTemplate.opsForValue().set(uuid,username);
        Cookie cookie = new Cookie("sso_token", uuid);
        response.addCookie(cookie);
        return "redirect:" + url+"?token="+uuid;
    }
    //如果其中一个为空，就跳转到登录页
    return "login";
}
```

![image-20220808215406835](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.5.png)



可以看到`Request URL:`请求的url`http://ssoserver.com:8080/doLogin`，重定向`Location:`到了`http://client1.com:8081/employees?token=9b5fa7861a55409d9d8c6247edcf66a3`，还`Set-Cookie:`了一个`sso_token=9b5fa7861a55409d9d8c6247edcf66a3`。即在`http://ssoserver.com`域名下，保存了一个叫`sso_token`的`cookie`

![GIF 2022-8-9 9-09-10](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.6.gif)



在访问`http://client2.com:8082/boss`的时候，重定向到了`http://ssoserver.com:8080/login.html?redirect_url=http://client2.com:8082/employees`，在请求`http://ssoserver.com:8080/login.html?redirect_url=http://client2.com:8082/employees`的时候还带上了`cookie`为`sso_token=4560fbf660304f49b66182214c3ebbd2`

那就说明在别的系统下这个用户已经登陆了

在`gulimall-test-sso-server`模块的`com.atguigu.gulimall.ssoserver.controller.LoginController`类的`loginPage`方法里添加判断，如果有token了，说明已经登陆了，直接重定向到别的系统即可

```java
@GetMapping("/login.html")
public String loginPage(@RequestParam("redirect_url") String url, Model model,
                        @CookieValue(value = "sso_token",required = false) String ssoToken) {
    if (StringUtils.hasText(ssoToken)){
        //说明之前有人登录过，浏览器留下了痕迹
        return "redirect:" + url+"?token="+ssoToken;
    }
    model.addAttribute("url", url);
    return "login";
}
```

![image-20220809093719928](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.7.png)

可以看到，当`http://client1.com:8081/employees`登录后，`http://client2.com:8082/boss`就不再需要登陆了

![GIF 2022-8-9 9-50-27](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.8.gif)

在`gulimall-test-sso-client`模块的`src/main/resources/templates/list.html`文件里添加欢迎信息

```
<h1>欢迎： [[${session.loginUser}]]</h1>
```

![image-20220809100314882](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.9.png)

在`gulimall-test-sso-server`模块的`src/main/java/com/atguigu/gulimall/ssoserver/controller/LoginController.java`类里添加如下接口

```java
@ResponseBody
@GetMapping("/userInfo")
public String userInfo(@RequestParam("token") String token){
    return stringRedisTemplate.opsForValue().get(token);
}
```

![image-20220809100343807](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.10.png)

在`gulimall-test-sso-client`模块的`com.atguigu.gulimall.ssoclient.controller.HelloController`类里修改`employees`方法，向`gulimall-test-sso-server`登录服务根据token查询用户信息

```java
/**
 * 必须登录才可访问
 * 只要带了token，就认为这次是在ssoserver登录成功跳回来的。(当然应该在redis里查一下，这里就不做了)
 * @param model
 * @return
 */
@GetMapping("/employees")
public String employees(Model model, HttpSession session,
                        @RequestParam(value = "token",required = false)String token){
    Object loginUser = session.getAttribute("loginUser");
    if (StringUtils.hasText(token)){
        //去ssoserver登录成功跳回来就会带.上
        //TODO 1、去ssoserver获取当前token真正对应的用户信息
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> entity = restTemplate.getForEntity(
                "http://ssoserver.com:8080/userInfo?token={token}", String.class, token);
        String body = entity.getBody();
        session.setAttribute("loginUser",body);
        loginUser = "张三";
    }
    if (loginUser==null){
        //通过该方法获取到的是： http://127.0.0.1:8081/employees
        //HttpServletRequest request=>System.out.println(request.getRequestURL());
        //如果没登录，就跳转到登录服务器进行登录
        return "redirect:" + serverUrl+"?redirect_url=http://client1.com:8081/employees";
    }
    List<String> emps = new ArrayList<>();
    emps.add("张三");
    emps.add("李四");
    model.addAttribute("emps",emps);
    return "list";
}
```

![image-20220809101133644](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.11.png)

在`gulimall-test-sso-client2`模块`src/main/resources/templates/list.html`文件里添加欢迎信息

```html
<h1>欢迎： [[${session.loginUser}]]</h1>
```

![image-20220809101348952](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.12.png)

在`gulimall-test-sso-client2`模块的`com.atguigu.gulimall.ssoclient.controller.HelloController`类里修改`employees`方法，向`gulimall-test-sso-server`登录服务根据token查询用户信息

```java
/**
 * 必须登录才可访问
 * 只要带了token，就认为这次是在ssoserver登录成功跳回来的。(当然应该在redis里查一下，这里就不做了)
 * @param model
 * @return
 */
@GetMapping("/boss")
public String employees(Model model, HttpSession session,
                        @RequestParam(value = "token",required = false)String token){
    Object loginUser = session.getAttribute("loginUser");
    if (StringUtils.hasText(token)){
        //去ssoserver登录成功跳回来就会带.上
        //TODO 1、去ssoserver获取当前token真正对应的用户信息
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> entity = restTemplate.getForEntity(
                "http://ssoserver.com:8080/userInfo?token={token}", String.class, token);
        String body = entity.getBody();
        session.setAttribute("loginUser",body);
        loginUser = "张三";
    }
    if (loginUser==null){
        //通过该方法获取到的是： http://127.0.0.1:8081/employees
        //HttpServletRequest request=>System.out.println(request.getRequestURL());
        //如果没登录，就跳转到登录服务器进行登录
        return "redirect:" + serverUrl+"?redirect_url=http://client2.com:8082/boss";
    }
    List<String> emps = new ArrayList<>();
    emps.add("张三");
    emps.add("李四");
    model.addAttribute("emps",emps);
    return "list";
}
```

![image-20220809101301993](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.13.png)

在`http://client1.com:8081/employees`网址下登录后

在`ssoserver.com`域名留下了一个键为`sso_token`、值为`80d06b51f1fb4fce9e93e2f50e256b38`的`cookie`

访问`http://client2.com:8082/boss`也无需登录`http://client2.com:8082/boss?token=80d06b51f1fb4fce9e93e2f50e256b38`

![GIF 2022-8-9 10-15-23](https://gitlab.com/apzs/image/-/raw/master/image/5.7.7.3.9.14.gif)

至此就完成了简单的多系统的单点登录功能

### 5.7.8、购物车模块

#### 1、初始化购物车模块

##### 1、新建购物车模块

新建一个模块，`Group`输入`com.atguigu`，`Artifact`输入`gulimall-cart`，`Type`选择`Maven`，`Language`选择`Java`，`Packaging`选择`Jar`，`Java Version`选择`8`，`Version`不用管，`Name`输入`gulimall-cart`，`Despcription`输入`购物车`，`Package`输入`com.atguigu.gulimall.cart`，然后点击`Next`

```
com.atguigu
gulimall-cart
购物车
com.atguigu.gulimall.cart
```

![image-20220809102536538](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.1.1.png)

选择`Spring Boot DevTools`、`Spring Web`、`Thymeleaf`、`OpenFeign`，然后点击`Next`

![image-20220809102707386](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.1.2.png)

最后点击`Finish`

![image-20220809102724824](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.1.3.png)

##### 2、修改代码

同样的，以下内容不替换(`properties`里面的要替换)（最好先替换，再把它作为maven项目添加到项目，要不然替换的时候上方的文件名会显示`pom.xm(<artifactId>里的内容)`（并不是`pom.xml(模块名)`），如果你复制的是`gulimall-product`模块的，有可能当前模块(`gulimall-cart`模块)显示为`pom.xml(gulimall-product)`，然后你就怀疑是不是错把`gulimall-product`模块的`pom.xml`文件替换掉了）

```xml
<groupId>com.atguigu</groupId>
<artifactId>gulimall-cart</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>gulimall-cart</name>
<description>购物车</description>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-openfeign</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

![image-20220809103832773](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.2.1.png)

修改`gulimall-cart`模块`com.atguigu.gulimall.cart.GulimallCartApplicationTests`测试类的代码，并测试看是否报错

```java
package com.atguigu.gulimall.cart;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallCartApplicationTests {

   @Test
   public void contextLoads() {
      System.out.println("hello");
   }

}
```

![image-20220809104027237](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.2.2.png)

##### 3、添加配置

添加`cart.gulimall.com`域名，将`cart.gulimall.com`域名的ip设置为虚拟机的ip

```properties
# gulimall
192.168.56.10 gulimall.com
192.168.56.10 search.gulimall.com
192.168.56.10 item.gulimall.com
192.168.56.10 auth.gulimall.com
192.168.56.10 cart.gulimall.com
```

![image-20220809104147788](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.3.1.png)



将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\购物车`里的`cartList.html`和`success.html`复制到`gulimall-cart`模块的`src/main/resources/templates`里面

![image-20220809104535897](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.3.2.png)

在`linux虚拟机`的`/mydata/nginx/html/static`目录下新建`cart`目录，把`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\购物车`里的文件夹复制到`/mydata/nginx/html/static/cart`目录下

![GIF 2022-8-9 10-47-05](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.3.3.gif)

##### 4、修改页面

修改`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件，将`href="./`全部替换为`href="/static/cart/`，将`src="./`全部替换为`src="/static/cart/`

```
href="./
href="/static/cart/

src="./
src="/static/cart/
```

 [点击查看完整页面](code/5.7.8.1.4.1.html)

![image-20220809105323489](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.4.1.png)

修改`gulimall-cart`模块的`src/main/resources/templates/success.html`文件，将`href="./`全部替换为`href="/static/cart/`，将`src="./`全部替换为`src="/static/cart/`

```
href="./
href="/static/cart/

src="./
src="/static/cart/
```

 [点击查看完整页面](code/5.7.8.1.4.2.html)

![image-20220809105425860](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.1.4.2.png)

#### 2、添加配置并完善页面

##### 1、添加配置

修改`gulimall-cart`模块的`pom.xml`文件，添加`gulimall-common`依赖

```xml
<dependency>
    <groupId>com.atguigu.gulimall</groupId>
    <artifactId>gulimall-common</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```

![image-20220809105640009](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.1.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.GulimallCartApplication`类的`@SpringBootApplication`注解后面添加`(exclude = DataSourceAutoConfiguration.class)`，排除数据源的自动配置

```java
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```

![image-20220809105800301](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.1.2.png)

在`gulimall-cart`模块的`src/main/resources/application.properties`配置文件里添加如下配置

```properties
server.port=30000

spring.application.name=gulimall-cart
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
```

![image-20220809110042486](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.1.3.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.GulimallCartApplication`类上添加如下注解，开启远程调用和服务发现

```java
@EnableFeignClients
@EnableDiscoveryClient
```

![image-20220809110006433](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.1.4.png)

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件里添加负载均衡到`gulimall-cart`模块的配置

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: gulimall_cart_route
          uri: lb://gulimall-cart
          predicates:
            - Host=cart.gulimall.com
```

![image-20220809110440063](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.1.5.png)

##### 2、完善页面

在`gulimall-cart`模块将`src/main/resources/templates/success.html`文件里的

```html
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
```

修改为

```html
<html xmlns="http://www.w3.org/1999/xhtml">
```

删去`thymeleaf`，然后把`src/main/resources/templates/success.html`文件重命名为`index.html`

![image-20220809111431235](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.1.png)

启动`GulimallGatewayApplication`服务和`GulimallCartApplication`服务，已经可以成功访问

http://cart.gulimall.com/

![image-20220809110921527](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.2.png)

在 http://cart.gulimall.com/  页面里，打开控制台，选择`谷粒商城首页`所在的`<a>`标签

![image-20220809111724257](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.3.png)

在`gulimall-cart`模块的`src/main/resources/templates/index.html`文件里搜索`谷粒商城首页`，将该`<a>`标签的`href`的值修改为`http://gulimall.com`

```html
<a href="http://gulimall.com">谷粒商城首页</a>
```

![image-20220809111752124](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.4.png)

在 http://cart.gulimall.com/  页面里，打开控制台，选择`logo`所在的`<img>`标签，复制`/static/cart/img/logo1.jpg`

![image-20220809111822473](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.5.png)

在`gulimall-cart`模块的`src/main/resources/templates/index.html`文件里搜索`/static/cart/img/logo1.jpg`，将该`<img>`标签外面的`<a>`标签的`href`的值修改为`http://gulimall.com`

```html
<a href="http://gulimall.com"><img src="/static/cart/img/logo1.jpg"  style="height: 60px;width:180px;"  /></a>
```

![image-20220809111906922](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.6.png)

重启`gulimall-cart`模块后，在 http://cart.gulimall.com/ 页面里，点击`谷粒商城首页`和`logo`都能跳转到首页

```
http://cart.gulimall.com/
http://gulimall.com/
```

![GIF 2022-8-9 11-21-44](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.2.2.7.gif)



#### 3、购物车需求分析

##### 1、购物车需求

 **1）** **、需求描述：**

- 用户在**登录状态**下

  - 将商品添加到购物车**【用户购物车/在线购物车】**
  - **放入数据库**

  - **mongodb**

  - 放入**redis**(采用)

  - 登录以后，会将**临时购物车**的数据全部合并过来，并清空**临时购物车；**

- 用户在**未登录状态**下

  - 将商品添加到购物车**【游客购物车/离线购物车/临时购物车】**

  - 放入 localstorage（客户端存储，后台不存）

  - cookie

  - WebSQL

  - **放入 redis（采用）**

  - 浏览器即使关闭，下次进入，**临时购物车**数据都在

- 其他功能

  - 用户可以使用购物车一起结算下单

  - 给购物车**添加商品**

  - 用户可以**查询自己的购物车**

  - 用户可以在购物车中**修改购买商品的数量**。

  - 用户可以在购物车中**删除商品**。

  - 选中/不选中商品

  - 在购物车中展示商品优惠信息

  - 提示购物车商品价格变化

##### 2、购物车数据结构

分析：每一个购物项信息，都是一个对象，基本字段包括

```json
{
    skuId: 2131241,
    check: true,
    title: "Apple iphone",
    defaultImage: "	",
    price: 4999,
    count: 1,
    totalPrice: 4999, 
    skuSaleVO: {...}
}
```

另外，购物车中不止一条数据，因此最终会是对象的数组。即：

```json
[
{...},{...},{...}
]
```

类似于如下结构：

```json
[
    {
        skuId: 2131241,
        check: true,
        title: "Apple iphone",
        defaultImage: "	",
        price: 4999,
        count: 1,
        totalPrice: 4999, 
        skuSaleVO: {...}
    },
    {
    	.....
	}
]
```

Redis 有 5 种不同数据结构，这里选择哪一种比较合适呢？ 

首先不同用户应该有独立的购物车，因此购物车应该以用户的作为`key`来存储，`Value`是用户的所有购物车信息。这样看来基本的`k-v`结构就可以了。

- 但是，我们对购物车中的商品进行增、删、改操作，基本都需要根据商品 id 进行判断，为了方便后期处理，我们的购物车也应该是`k-v`结构，key 是商品`id`，`value`才是这个商品的购物车信息。

 综上所述，我们的购物车结构是一个双层 Map：`Map<String,Map<String,String>>`

- 第一层 Map，Key 是用户 id

- 第二层 Map，Key 是购物车中商品 id，值是购物项数据

在`java`中，相当于如下结构

```
Map<String k1,Map<String k2,CartItemInfo>> 
k1：标识每一个用户的购物车
k2：购物项的商品id
```

在redis中

```
key:用户标识
value:Hash（k：商品id，v：购物项详情）
```

![image-20220809115021313](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.3.2.png)

#### 4、代码实现

##### 1、添加vo

在`gulimall-cart`模块的`com.atguigu.gulimall.cart`包里新建`vo`文件夹，在`vo`文件夹里新建`CartItemVo`类，用于存储购物车车里每一个商品项的数据

```java
package com.atguigu.gulimall.cart.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description: 购物车里的商品项
 */
@Data
public class CartItemVo {
    /**
     * sku的id
     */
    private Long skuId;
    /**
     * 是否选中（默认选中）
     */
    private Boolean check = true;
    /**
     * 商品的标题
     */
    private String title;
    /**
     * 商品的图片
     */
    private String image;
    /**
     * sku的属性（选中的 颜色、内存容量 等）
     */
    private List<String> skuAttr;
    /**
     * 商品的价格
     */
    private BigDecimal price;
    /**
     * 商品的数量
     */
    private Integer count;
    /**
     * 总价(商品价格*商品数量)
     */
    private BigDecimal totalPrice;

    /**
     * 计算总价
     * @return
     */
    public BigDecimal getTotalPrice() {
        return price.multiply(new BigDecimal(count));
    }
}
```

![image-20220809155425051](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.1.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.vo`包里新建`CartVo`类，用于存放购物车数据

```java
package com.atguigu.gulimall.cart.vo;

import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description: 购物车
 */
public class CartVo {
    /**
     * 商品项
     */
    private List<CartItemVo> items;
    /**
     * 商品数量（所有商品的count相加）
     */
    private Integer countNum;
    /**
     * 商品有几种类型（有几种不同的商品）
     */
    private Integer countType;
    /**
     * 商品总价（所有商品总价加起来）
     */
    private BigDecimal totalAmount;
    /**
     * 减免的价格
     */
    private BigDecimal reduce = BigDecimal.ZERO;

    public List<CartItemVo> getItems() {
        return items;
    }

    public void setItems(List<CartItemVo> items) {
        this.items = items;
    }

    public Integer getCountNum() {
        int countNum = 0;
        if (!CollectionUtils.isEmpty(items)){
            for (CartItemVo item : items) {
                if (item.getCheck()){
                    countNum+=item.getCount();
                }
            }
        }
        return countNum;
    }

    public Integer getCountType() {
        int countType = 0;
        if (!CollectionUtils.isEmpty(items)){
            for (CartItemVo item : items) {
                if (item.getCheck()){
                    countType++;
                }
            }
        }
        return countType;
    }

    public BigDecimal getTotalAmount() {
        //购物总价
        BigDecimal totalAmount = BigDecimal.ZERO;
        if (!CollectionUtils.isEmpty(items)){
            for (CartItemVo item : items) {
                if (item.getCheck()){
                    totalAmount = totalAmount.add(item.getPrice());
                }
            }
        }
        //减去优惠
        totalAmount = totalAmount.subtract(getReduce());
        return totalAmount;
    }

    public BigDecimal getReduce() {
        return reduce;
    }

    public void setReduce(BigDecimal reduce) {
        this.reduce = reduce;
    }
}
```

![image-20220809155447597](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.1.2.png)

##### 2、添加redis依赖

在`gulimall-cart`模块的`pom.xml`文件里添加`redis`依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

![image-20220809155645296](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.2.1.png)

在`gulimall-cart`模块的`src/main/resources/application.properties`文件里指定redis的host

```properties
spring.redis.host=192.168.56.10
```

![image-20220809155727842](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.2.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart`包下新建`service`文件夹，在`service`文件夹下新建`CartService`接口

![image-20220809155822937](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.2.3.png)

##### 3、添加Spring Session依赖

在`gulimall-cart`模块的`pom.xml`文件里添加`Spring Session`依赖

```xml
<!--引入SpringSession-->
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220809160358392](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.3.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart`包下新建`config`文件夹，复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.GulimallSessionConfig`文件，到`gulimall-cart`模块的`com.atguigu.gulimall.cart.config`包下

```java
package com.atguigu.gulimall.cart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * @author 无名氏
 * @date 2022/8/7
 * @Description:
 */
@Configuration
public class GulimallSessionConfig {
    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        // We customize the name of the cookie to be JSESSIONID.
        serializer.setCookieName("GULIMALL_JSESSIONID");
        serializer.setDomainName("gulimall.com");
        ////We customize the path of the cookie to be / (rather than the default of the context root).
        //serializer.setCookiePath("/");
        ////If the regular expression matches, the first grouping is used as the domain.
        ////This means that a request to https://child.example.com sets the domain to example.com.
        ////However, a request to http://localhost:8080/ or https://192.168.1.100:8080/ leaves the cookie unset and,
        //// thus, still works in development without any changes being necessary for production.
        ////亲测不生效
        //serializer.setDomainNamePattern("^.+?\\.(\\w+\\.[a-z]+)$");
        return serializer;
    }

    @Bean
    public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }


}
```

![image-20220809160809319](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.3.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.config.GulimallSessionConfig`类上添加如下注解，开启Spring Session功能

```
@EnableRedisHttpSession
```

![image-20220809161216130](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.3.3.png)

##### 4、分析功能

功能描述：

- 浏览器有一个cookie; user-key; 标识用户身份，一个月后过期;

- 如果第一次使用jd的购物车功能，都会给一个临时的用户身份;

- 浏览器以后保存，每次访问都会带上这个cookie;

- 登录: session有用户数据

- 没登录:按照cookie里面带来user-key来做。

- 第一次:如果没有临时用户，帮忙创建一个临时用户。

京东会给一个`user-key`的`cookie`，有效期为一个月

![image-20220809162152106](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.4.1.png)

登陆后还是会存在`user-key`

![image-20220809162541563](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.4.2.png)

##### 5、添加vo

在`gulimall-cart`模块的`com.atguigu.gulimall.cart`包下新建`controller`文件夹，在`controller`文件夹下新建`CartController`类

```java
package com.atguigu.gulimall.cart.controller;

import com.atguigu.common.constant.auth.AuthServerConstant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description:
 */
@Controller
public class CartController {

    /**
     * 浏览器有一个cookie; user-key; 标识用户身份，一个月后过期;
     * 如果第一次使用jd的购物车功能，都会给一个临时的用户身份;
     * 浏览器以后保存，每次访问都会带上这个cookie;
     * 登录: session有用户
     * 没登录:按照cookie里面带来user-key来做。
     * 第一次:如果没有临时用户，帮忙创建一个临时用户。
     *
     * 去登录页的请求
     * @return
     */
    @GetMapping("/cart.html")
    public String cartListPage(HttpSession session){
        Object attribute = session.getAttribute(AuthServerConstant.LOGIN_USER);
        if (attribute==null){
            //获取临时购物车
        }else {
            //获取登录过的购物车
        }
        return "cartList";
    }
}
```

![image-20220809163741299](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.5.1.png)

由于每次都要判断等没登录，所以可以使用拦截器

![img](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.5.2.png)

在`gulimall-common`模块的`com.atguigu.common.to`包下新建`UserInfoTo`类

```java
package com.atguigu.common.to;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description:
 */
@Data
public class UserInfoTo {
    /**
     * 用户的id
     */
    private Long userId;
    /**
     * 用户的标识
     */
    private String userKey;
}
```

![image-20220809190800927](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.5.3.png)

在`gulimall-common`模块的`com.atguigu.common.constant`包下新建`cart`文件夹，在`cart`文件夹里新建`CartConstant`类

```java
package com.atguigu.common.constant.cart;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description:
 */
public class CartConstant {
    /**
     * 临时或已登录用户的cookie名
     */
    public static final String TEMP_USER_COOKIE_NAME = "user-key";
}
```

![image-20220809194222197](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.4.5.4.png)

#### 5、ThreadLocal

##### 1、添加拦截器

ThreadLocal可以在同一个线程之间共享数据

![image-20220809195832706](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.1.1.png)



在`gulimall-cart`模块的`com.atguigu.gulimall.cart`包先新建`interceptor`文件夹，在`interceptor`文件夹下新建`CartInterceptor`类

```java
package com.atguigu.gulimall.cart.interceptor;

import com.atguigu.common.constant.auth.AuthServerConstant;
import com.atguigu.common.constant.cart.CartConstant;
import com.atguigu.common.to.MemberEntityTo;
import com.atguigu.common.to.UserInfoTo;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.UUID;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description:
 */
public class CartInterceptor implements HandlerInterceptor {

    /**
     * 把UserInfoTo的信息放到ThreadLocal里
     */
    public static ThreadLocal<UserInfoTo> threadLocal = new ThreadLocal<>();

    /**
     * 在执行目标方法之前，判断用户的登录状态。并封装传递给controller目标请求
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                             Object handler) throws Exception {
        UserInfoTo userInfoTo = new UserInfoTo();
        //根据session判断当前用户是否登录，如果登录了就把用户id赋值给userInfoTo.userId
        HttpSession session = request.getSession();
        MemberEntityTo member =(MemberEntityTo) session.getAttribute(AuthServerConstant.LOGIN_USER);
        if (member != null) {
            //用户登录
            userInfoTo.setUserId(member.getId());
        }
        //在cookies里寻找key为user-key的cookie，把该cookie的value放到userInfoTo.userKey里
        Cookie[] cookies = request.getCookies();
        if (cookies!=null && cookies.length>0){
            for (Cookie cookie : cookies) {
                if (CartConstant.TEMP_USER_COOKIE_NAME.equals(cookie.getName())) {
                    userInfoTo.setUserKey(cookie.getValue());
                    break;
                }
            }
        }
        //如果在cookies里没有找到key为user-key的cookie，就证明是第一次来到系统，或删除了cookie
        //如果没有临时用户，分配一个临时用户
        if (StringUtils.isEmpty(userInfoTo.getUserKey())){
            String uuid = UUID.randomUUID().toString();
            userInfoTo.setUserKey(uuid);
        }
        //目标方法执行之前
        threadLocal.set(userInfoTo);
        return true;
    }
}
```

![image-20220809201759825](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.1.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.config`包下新建`GulimallWebConfig`配置类，指定该拦截器的拦截路径

```java
package com.atguigu.gulimall.cart.config;

import com.atguigu.gulimall.cart.interceptor.CartInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 无名氏
 * @date 2022/8/9
 * @Description:
 */
@Configuration
public class GulimallWebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CartInterceptor()).addPathPatterns("/**");
    }
}
```

![image-20220809200741968](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.1.3.png)

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类的`cartListPage`方法

```java
/**
 * 浏览器有一个cookie; user-key; 标识用户身份，一个月后过期;
 * 如果第一次使用jd的购物车功能，都会给一个临时的用户身份;
 * 浏览器以后保存，每次访问都会带上这个cookie;
 * 登录: session有用户
 * 没登录:按照cookie里面带来user-key来做。
 * 第一次:如果没有临时用户，帮忙创建一个临时用户。
 *
 * 去登录页的请求
 * @return
 */
@GetMapping("/cart.html")
public String cartListPage(){

    //从ThreadLocal里得到用户信息
    UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    System.out.println(userInfoTo);
    return "cartList";
}
```

![image-20220809210807657](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.1.4.png)

##### 2、添加Cookie

在`gulimall-common`模块的`com.atguigu.common.constant.cart.CartConstant`类里添加

如果没有`key`为`user-key`的临时用户，还需要再向浏览器返回之前存放一个`Cookie`，并且指定过期时间`TEMP_USER_COOKIE_TIMEOUT`字段

```java
/**
 * 临时或已登录用户的cookie的过期时间(30天)
 */
public static final int TEMP_USER_COOKIE_TIMEOUT = 60*60*24*30;
```

![image-20220809202235176](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.1.png)

双击`Shift`，搜索`Cookie`，可以看到`javax.servlet.http.Cookie`里的`Cookie`的过期时间以`秒`为单位

```java
/**
 * Sets the maximum age of the cookie in seconds.
 * <p>
 * A positive value indicates that the cookie will expire after that many
 * seconds have passed. Note that the value is the <i>maximum</i> age when
 * the cookie will expire, not the cookie's current age.
 * <p>
 * A negative value means that the cookie is not stored persistently and
 * will be deleted when the Web browser exits. A zero value causes the
 * cookie to be deleted.
 *
 * @param expiry
 *            an integer specifying the maximum age of the cookie in
 *            seconds; if negative, means the cookie is not stored; if zero,
 *            deletes the cookie
 * @see #getMaxAge
 */
public void setMaxAge(int expiry) {
    maxAge = expiry;
}
```

![image-20220809202547741](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.2.png)

在`gulimall-common`模块的`com.atguigu.common.to.UserInfoTo`类里添加`tempUserCookie`字段

```java
/**
 * 是否有临时用户的cookie
 */
private boolean tempUserCookie = false;
```

![image-20220809203431621](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.3.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`preHandle`方法里的`breake;`上面添加`userInfoTo.setTempUserCookie(true);`

```java
/**
 * 在执行目标方法之前，判断用户的登录状态。并封装传递给controller目标请求
 *
 * @param request
 * @param response
 * @param handler
 * @return
 * @throws Exception
 */
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
                         Object handler) throws Exception {
    UserInfoTo userInfoTo = new UserInfoTo();
    //根据session判断当前用户是否登录，如果登录了就把用户id赋值给userInfoTo.userId
    HttpSession session = request.getSession();
    MemberEntityTo member = (MemberEntityTo) session.getAttribute(AuthServerConstant.LOGIN_USER);
    if (member != null) {
        //用户登录
        userInfoTo.setUserId(member.getId());
    }
    //在cookies里寻找key为user-key的cookie，把该cookie的value放到userInfoTo.userKey里
    Cookie[] cookies = request.getCookies();
    if (cookies != null && cookies.length > 0) {
        for (Cookie cookie : cookies) {
            if (CartConstant.TEMP_USER_COOKIE_NAME.equals(cookie.getName())) {
                userInfoTo.setUserKey(cookie.getValue());
                userInfoTo.setTempUserCookie(true);
                break;
            }
        }
    }
    //如果在cookies里没有找到key为user-key的cookie，就证明是第一次来到系统，或删除了cookie
    //如果没有临时用户，分配一个临时用户
    if (StringUtils.isEmpty(userInfoTo.getUserKey())) {
        String uuid = UUID.randomUUID().toString();
        userInfoTo.setUserKey(uuid);
    }
    //目标方法执行之前
    threadLocal.set(userInfoTo);
    return true;
}
```

![image-20220809204124231](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.4.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类里添加`postHandle`方法，向浏览器端写cookie

```java
/**
 * 业务执行完后
 *
 * @param request
 * @param response
 * @param handler
 * @param modelAndView
 * @throws Exception
 */
@Override
public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    UserInfoTo userInfoTo = threadLocal.get();
    if (!userInfoTo.isTempUserCookie()) {
        Cookie cookie = new Cookie(CartConstant.TEMP_USER_COOKIE_NAME, userInfoTo.getUserKey());
        cookie.setPath("gulimall.com");
        cookie.setMaxAge(CartConstant.TEMP_USER_COOKIE_TIMEOUT);
        response.addCookie(cookie);
    }
}
```

![image-20220809204043771](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.5.png)

`gulimall-common`模块的`com.atguigu.common.to.UserInfoTo`类里`tempUserCookie`字段名总感觉那里怪怪的，按`shift + f6`重新改名为`hasTempUserCookie`

```java
/**
 * 是否有临时用户的cookie
 */
private boolean hasTempUserCookie = false;
```

![image-20220809204611574](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.6.png)

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类里获取和修改`tempUserCookie`字段的代码，这样看就舒服多了

```java
userInfoTo.setHasTempUserCookie(true);
userInfoTo.isHasTempUserCookie()
```

![image-20220809204732994](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.7.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类里修改`postHandle`方法，在该方法的最后添加`threadLocal.remove();`，用于删除ThreadLocal，防止线程复用，获取到别的用户信息

```java
/**
 * 业务执行完后，如果当前用户的cookies里没有user-key为键的cookie，就存放该cookie
 *
 * @param request
 * @param response
 * @param handler
 * @param modelAndView
 * @throws Exception
 */
@Override
public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    UserInfoTo userInfoTo = threadLocal.get();
    if (!userInfoTo.isHasTempUserCookie()) {
        Cookie cookie = new Cookie(CartConstant.TEMP_USER_COOKIE_NAME, userInfoTo.getUserKey());
        cookie.setPath("gulimall.com");
        cookie.setMaxAge(CartConstant.TEMP_USER_COOKIE_TIMEOUT);
        response.addCookie(cookie);
    }
    //删除ThreadLocal，防止线程复用，获取到别的用户信息
    threadLocal.remove();
}
```

![image-20220809205425490](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.2.8.png)

##### 3、修改页面

在 http://item.gulimall.com/9.html 页面，打开控制台定位到`立即预约 `所在的`<a>`标签

![image-20220809210002209](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.1.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`立即预约`，找到对应的`<a>`标签，将`<a>`标签的`href`属性的值修改为`http://cart.gulimall.com/addToCart`。将`立即预约`修改为`加入购物车`

```html
<div class="box-btns-two">
   <a href="http://cart.gulimall.com/addToCart">
      <!--立即预约-->
      加入购物车
   </a>
</div>
```

![image-20220809210342092](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.2.png)

将`gulimall-cart`模块的`src/main/resources/templates/index.html`文件重新改名为`success.html`

![image-20220809210503541](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.3.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类里添加`/addToCart`接口，用于添加到购物车

```java
/**
 * 添加到购物车
 * @return
 */
@GetMapping("/addToCart")
public String addToCart(){
    return "success";
}
```

![image-20220809211130318](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.4.png)

在 http://gulimall.com/  页面，打开控制台，选择`我的购物车`对应的`<a>`标签，复制`我的购物车`

![image-20220809211248869](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.5.png)

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里，搜索`我的购物车`，将`<a>`标签的`href`的值修改为`http://cart.gulimall.com/cart.html`

```html
<div class="header_gw">
  <img src="/static/index/img/img_15.png" />
  <span><a href="http://cart.gulimall.com/cart.html">我的购物车</a></span>
  <span>0</span>
</div>
```

![image-20220809211431472](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.6.png)

启动`GulimallMemberApplication`服务、`GulimallSearchApplication`服务、`GulimallGatewayApplication`服务、`GulimallProductApplication`服务、`GulimallAuthServerApplication`服务、`GulimallCartApplication`服务

可以看到当浏览器中没有`key`为`user-key`的`cookie`时，会向浏览器写一个`cookie`(但是要放行多次)

![GIF 2022-8-9 21-36-28](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.7.gif)

可以看到当浏览器中有`key`为`user-key`的`cookie`时，不会替换掉原来的`key`为`user-key`的`cookie`(但是要放行多次)

![GIF 2022-8-9 21-42-07](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.8.gif)

放行多次多次就证明有多个请求，应该是`拦截器`拦截了不该拦截的`静态资源`请求引起的

![image-20220809214722050](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.3.9.png)

##### 4、修改代码

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`postHandle`方法的开头添加如下代码，如果不是拦截器直接返回

```java
if (!(handler instanceof HandlerMethod)){
    return;
}
```

![image-20220809215021156](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.4.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`preHandle`方法的开头也添加类似代码，如果不是拦截器直接放行

```java
if (!(handler instanceof HandlerMethod)){
    return true;
}
```

![image-20220809215057482](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.4.2.png)

可以看到还是判断了多次，没有找到这些静态资源，触发了`BasicErrorController`(这里不用管，后面也用不到)

```
//执行了我们的Controller
public java.lang.String com.atguigu.gulimall.cart.controller.CartController.cartListPage()
//执行了错误视图的Controller
public org.springframework.http.ResponseEntity org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController.error(javax.servlet.http.HttpServletRequest)
```

![GIF 2022-8-9 21-55-39](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.4.3.gif)

##### 5、修改页面

在 http://cart.gulimall.com/cart.html 页面里，打开控制台，选择购物车左边的`<img>`，复制`img/logo1.jpg`

![image-20220810092737297](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.1.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里，搜索`img/logo1.jpg`，找到对应的`<img>`标签，将`<img>`标签的`src`修改为`/static/cart/img/logo1.jpg`，将`<img>`标签外面的`<a>`标签的`href`属性的值修改为`http://gulimall.com`

```html
<div class="one_top_left">
   <a href="http://gulimall.com" class="one_left_logo"><img src="/static/cart/img/logo1.jpg"></a>
   <a href="#" class="one_left_link">购物车</a>
</div>
```

![image-20220810093315148](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.2.png)

在 http://cart.gulimall.com/cart.html 页面里，打开控制台，选择`首页`对应的`<a>`，复制`首页`

![image-20220810093426039](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.3.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里，搜索`首页`,将`首页`对应的`<a>`标签的` href`属性的值修改为`http://gulimall.com`

```html
<ul class="header-left">
   <li>
      <a href="http://gulimall.com">首页</a>
   </li>

</ul>
```

![image-20220810092839055](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.4.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里，修改`你好，请登录`周围代码

```html
<ul class="header-right">
   <li>
      <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
      <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}">你好，请登录</a>
   </li>
   <li>
      <a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}" class="li_2">免费注册</a>
   </li>
   <li class="spacer"></li>
   <li><a href="">我的订单</a></li>
   <li class="spacer"></li>
</ul>
```

![image-20220810093624698](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.5.png)

在`gulimall-cart`模块的`src/main/resources/templates/success.html`文件里，修改`你好，请登录`周围代码

```html
<ul class="hd_wrap_right">
    <li>
        <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
        <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}">你好，请登录</a>
    </li>
    <li>
        <a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}" class="li_2">免费注册</a>
    </li>
    <li class="spacer"></li>
    <li>
        <a href="/javascript:;">我的订单</a>
    </li>
</ul>
```

![image-20220810093815833](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.6.png)

重启`gulimall-cart`模块，可以看到`cartList.html`页面跳转没有什么问题

![GIF 2022-8-10 9-42-31](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.7.gif)



`success.html`页面除了`您还没有登录！登录后购物车的商品将保存到您账号中 立即登录`有问题外，其他的也没什么问题

![GIF 2022-8-10 9-40-18](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.8.gif)

在 http://cart.gulimall.com/addToCart  页面里，打开控制台，选择`去购物车结算`，复制对应`<a>`标签的`id`的值`GotoShoppingCart`

![image-20220810094852763](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.9.png)

在`gulimall-cart`模块的`src/main/resources/templates/success.html`文件里搜索`GotoShoppingCart`，将该该`<a>`标签的`href`的值修改为`http://cart.gulimall.com/cart.html`

```html
<a class="btn-addtocart" href="http://cart.gulimall.com/cart.html"
   id="GotoShoppingCart"><b></b>去购物车结算</a>
```

![image-20220810094915539](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.10.png)

重启`gulimall-cart`模块，访问 http://cart.gulimall.com/addToCart 页面，点击`去购物车结算`，成功跳转到了 http://cart.gulimall.com/cart.html 页面

![GIF 2022-8-10 9-50-55](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.11.gif)

将`gulimall-cart`模块的`src/main/resources/templates/success.html`页面里的`th:href="'http://item.gmall.com:8084/'+${skuInfo?.id}+'.html'"`修改为`http://item.gulimall.com/9.html`，先让其访问固定的商品

```html
<div class="bg_shop">
    <a class="btn-tobback"
       href="http://item.gulimall.com/9.html">查看商品详情</a>
    <a class="btn-addtocart" href="http://cart.gulimall.com/cart.html"
       id="GotoShoppingCart"><b></b>去购物车结算</a>
</div>
```

![image-20220810095409271](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.12.png)

重启`gulimall-cart`模块，访问 http://cart.gulimall.com/addToCart 页面，点击`查看商品详情`

![GIF 2022-8-10 9-54-54](https://gitlab.com/apzs/image/-/raw/master/image/5.7.8.5.5.13.gif)

### 5.7.9、加入购物车

#### 1、点击加入购物车进行跳转

##### 1、前端跳转

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里，将`立即抢购`外面的`<a href="http://cart.gulimall.com/addToCart">`修改为`<a href="#" id="addToCart">`

```html
<div class="box-btns-two">
   <a href="#" id="addToCart">
      <!--立即预约-->
      加入购物车
   </a>
</div>
```

![image-20220810095941269](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.1.png)

在 http://item.gulimall.com/9.html 页面里，选中`加入购物车`左边的数量输入框，复制`value="1"`

![image-20220810100406207](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.2.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里，搜索`value="1"`，将`<input>`输入框的`id`的值修改为`numInput`

```html
<input type="text" name="" id="numInput" value="1" />
```

![image-20220810100534991](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.3.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里，搜索`加入购物车`，将外面的`<a>`标签添加自定义属性`th:attr="skuId=${item.info.skuId}"`用于获取`skuId`

```html
<div class="box-btns-two">
   <a href="#" id="addToCart" th:attr="skuId=${item.info.skuId}">
      <!--立即预约-->
      加入购物车
   </a>
</div>
```

![image-20220810101119082](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.4.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`标签里添加如下方法，用于点击`加入购物车`跳转到购物车对应的页面

```javascript
$("#addToCart").click(function () {
   var skuId = $(this).attr("skuId");
   var num = $("#numInput").val();
   location.href = "http://cart.gulimall.com/addToCart?skuId="+skuId+"&num=" + num
   //禁用默认行为
   return false;
})
```

![image-20220810101406205](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.5.png)

重启`gulimall-product`模块，在`http://item.gulimall.com/9.html`页面，可以看到已经拼装好数据到`http://cart.gulimall.com/addToCart?skuId=9&num=4`页面了

![GIF 2022-8-10 10-14-28](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.6.gif)



修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类的`addToCart`方法

```java
@Autowired
CartService cartService;

/**
 * 添加到购物车
 *
 * @return
 */
@GetMapping("/addToCart")
public String addToCart(@RequestParam("skuId") Long skuId,
                        @RequestParam("num") Integer num,
                        Model model) {

    CartItemVo cartItemVo = cartService.addToCart(skuId, num);
    model.addAttribute("item",cartItemVo);
    return "success";
}
```

![image-20220810101957590](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.7.png)

在`gulimall-cart`模块的`src/main/resources/templates/success.html`文件里，重新添加`thymeleaf`

```html
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
```

![image-20220810102332592](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.8.png)

在`gulimall-cart`模块的`src/main/resources/templates/success.html`文件里，将`th:`替换为空，一定要选中`W`图标（表名这是一个单词，防止把`width:60px`里的`th:`替换掉了），然后点击`Replace all`替换所有

![image-20220810102826028](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.9.png)

在`gulimall-cart`模块的`src/main/resources/templates/success.html`文件里，修改`商品已成功加入购物车`下面的代码

```html
<div class="mc success-cont">
    <div class="success-lcol">
        <div class="success-top"><b class="succ-icon"></b>
            <h3 class="ftx-02">商品已成功加入购物车</h3></div>
        <div class="p-item">
            <div class="p-img">
                <a href="/javascript:;" target="_blank"><img style="height: 60px;width:60px;"
                                                             th:src="${item?.image}"
                                                             ></a>
            </div>
            <div class="p-info">
                <div class="p-name">
                    <a th:href="'http://item.gulimall.com/'+${item?.skuId}+'.html'"
                       th:text="${item?.title}">TCL 55A950C 55英寸32核人工智能 HDR曲面超薄4K电视金属机身（枪色）</a>
                </div>
                <div class="p-extra"><span class="txt" th:text="'数量：'+${item.count}">  数量：1</span></div>
            </div>
            <div class="clr"></div>
        </div>
    </div>
    <div class="success-btns success-btns-new">
        <div class="success-ad">
            <a href="/#none"></a>
        </div>
        <div class="clr"></div>
        <div class="bg_shop">
            <a class="btn-tobback"
               th:href="'http://item.gulimall.com/'+${item?.skuId}+'.html'">查看商品详情</a>
            <a class="btn-addtocart" href="http://cart.gulimall.com/cart.html"
               id="GotoShoppingCart"><b></b>去购物车结算</a>
        </div>
    </div>
</div>
```

![image-20220810103431907](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.1.10.png)

##### 2、后端实现功能

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.CartService`接口里添加`addToCart`方法

```java
CartItemVo addToCart(Long skuId, Integer num);
```

![image-20220810103644997](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.2.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`addToCart`方法

```java
@Autowired
StringRedisTemplate stringRedisTemplate;

private static final String CART_PREFIX = "gulimall:cart:";

@Override
public CartItemVo addToCart(Long skuId, Integer num) {
    CartItemVo vo = new CartItemVo();
    BoundHashOperations<String, Object, Object> cartOps = getCartOps();
    //获取sku基本信息

    return vo;
}

/**
 * 获取要操作的购物车
 * @return
 */
private BoundHashOperations<String, Object, Object> getCartOps(){
    UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    String cartKey = "";
    if (userInfoTo.getUserId() != null) {
        // gulimall:cart:1
        cartKey = CART_PREFIX + userInfoTo.getUserId();
    }else {
        // gulimall:cart:6a642344-003e-4ac1-bea1-27260c5c75c3
        cartKey = CART_PREFIX + userInfoTo.getUserKey();
    }
    //stringRedisTemplate.opsForHash().get(cartKey,"1");
    return stringRedisTemplate.boundHashOps(cartKey);
}
```

![image-20220810110241522](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.2.2.png)

`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SkuInfoController#info`方法可以获取`sku`的详细信息

```java
  /**
   * 信息
   */
  @RequestMapping("/info/{skuId}")
      public R info(@PathVariable("skuId") Long skuId){
SkuInfoEntity skuInfo = skuInfoService.getById(skuId);

      return R.ok().put("skuInfo", skuInfo);
  }
```

![image-20220810110023970](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.2.3.png)

在`gulimall-cart`模块`com.atguigu.gulimall.cart`包下新建`feign`文件夹，在`feign`文件夹里新建`ProductFeignService`类，用于调用远程的商品模块

```java
package com.atguigu.gulimall.cart.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 无名氏
 * @date 2022/8/10
 * @Description:
 */
@FeignClient("gulimall-product")
public interface ProductFeignService {

    @RequestMapping("/product/skuinfo/info/{skuId}")
    public R info(@PathVariable("skuId") Long skuId);
}
```

![image-20220810110443729](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.2.4.png)

在`gulimall-common`模块`com.atguigu.common.to`包下新建`SkuInfoEntityTo`类

复制`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SkuInfoEntity`类的字段，粘贴到`SkuInfoEntityTo`类里，并实现`Serializable`、在类上添加`@Data`注解

```java
package com.atguigu.common.to;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class SkuInfoEntityTo implements Serializable {
   /**
    * skuId
    */
   private Long skuId;
   /**
    * spuId
    */
   private Long spuId;
   /**
    * sku名称
    */
   private String skuName;
   /**
    * sku介绍描述
    */
   private String skuDesc;
   /**
    * 所属分类id
    */
   private Long catalogId;
   /**
    * 品牌id
    */
   private Long brandId;
   /**
    * 默认图片
    */
   private String skuDefaultImg;
   /**
    * 标题
    */
   private String skuTitle;
   /**
    * 副标题
    */
   private String skuSubtitle;
   /**
    * 价格
    */
   private BigDecimal price;
   /**
    * 销量
    */
   private Long saleCount;

}
```

![image-20220810110959180](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.2.5.png)

##### 3、使用线程池

由于要查`sku基本信息`和`sku组合信息`，因此可以使用线程池加快执行速度

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyThreadConfig`类和`com.atguigu.gulimall.product.config.ThreadPollConfigProperties`类，粘贴到`gulimall-cart`模块的`com.atguigu.gulimall.cart.config`里

`MyThreadConfig`类的代码如下：

![image-20220810112208046](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.3.1.png)

`ThreadPollConfigProperties`类的代码如下

![image-20220810112215617](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.3.2.png)

复制`gulimall-product`模块的`src/main/resources/application.properties`配置文件里关于线程池的配置，粘贴到`gulimall-cart`模块的`src/main/resources/application.properties`里

```properties
gulimall.thread.core-pool-size=20
gulimall.thread.maximum-pool-size=200
gulimall.thread.keep-alive-time=10
```

![image-20220810112211009](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.3.3.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里修改`addToCart`方法

```java
@Autowired
ThreadPoolExecutor executor;

@Override
public CartItemVo addToCart(Long skuId, Integer num) {
    CartItemVo cartItemVo = new CartItemVo();
    BoundHashOperations<String, Object, Object> cartOps = getCartOps();
    //获取sku基本信息
    CompletableFuture<Void> skuInfoFuture = CompletableFuture.runAsync(() -> {
        R r = productFeignService.info(skuId);
        Object info = r.get("skuInfo");
        SkuInfoEntityTo infoEntityTo = new SkuInfoEntityTo();
        BeanUtils.copyProperties(info, infoEntityTo);
        //第一次添加，默认选中
        cartItemVo.setCheck(true);
        //第一次添加，数量都为1
        cartItemVo.setCount(num);
        cartItemVo.setImage(infoEntityTo.getSkuDefaultImg());
        cartItemVo.setTitle(infoEntityTo.getSkuTitle());
        cartItemVo.setSkuId(infoEntityTo.getSkuId());
        cartItemVo.setPrice(infoEntityTo.getPrice());
    },executor);

    //远程查询sku组合信息

    return cartItemVo;
}
```

![image-20220810144737624](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.3.4.png)

##### 4、获取销售属性值

测试将商品模块sku销售属性值使用`：`符号连接起来的`sql`

```mysql
select concat(attr_name,"：",attr_value) from pms_sku_sale_attr_value where sku_id = 1
```

![image-20220810114148564](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.1.png)

在`gulimall-product`模块`com.atguigu.gulimall.product.controller.SkuSaleAttrValueController`类里新建`getSkuSaleAttrValues`方法

```java
@GetMapping("/stringlist/{skuId}")
public List<String> getSkuSaleAttrValues(@PathVariable("skuId") Long skuId) {
      return  skuSaleAttrValueService.getSkuSaleAttrValuesAsStringList(skuId);
}
```

![image-20220810114330547](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuSaleAttrValueService`接口里添加`getSkuSaleAttrValuesAsStringList`抽象方法

```java
List<String> getSkuSaleAttrValuesAsStringList(Long skuId);
```

![image-20220810114401389](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.3.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuSaleAttrValueServiceImpl`类里实现`getSkuSaleAttrValuesAsStringList`方法

```java
@Override
public List<String> getSkuSaleAttrValuesAsStringList(Long skuId) {
    return this.baseMapper.getSkuSaleAttrValuesAsStringList(skuId);
}
```

![image-20220810114559675](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.4.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.dao.SkuSaleAttrValueDao`接口里添加`getSkuSaleAttrValuesAsStringList`抽象方法

```java
List<String> getSkuSaleAttrValuesAsStringList(Long skuId);
```

![image-20220810114658076](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.5.png)

在`gulimall-product`模块的`src/main/resources/mapper/product/SkuSaleAttrValueDao.xml`文件里添加查询销售属性的sql

```mysql
<select id="getSkuSaleAttrValuesAsStringList" resultType="java.lang.String">
    select concat(attr_name,"：",attr_value) from gulimall_pms.pms_sku_sale_attr_value where sku_id = #{skuId}
</select>
```

![image-20220810114914847](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.6.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.feign.ProductFeignService`接口里添加方法，远程获取销售属性值

```java
@GetMapping("/product/skusaleattrvalue/stringlist/{skuId}")
public List<String> getSkuSaleAttrValues(@PathVariable("skuId") Long skuId);
```

![image-20220810115041334](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.7.png)

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`addToCart`方法，在后面添加如下代码

```java
//远程查询sku组合信息
CompletableFuture<Void> getSkuSaleAttrValuesFuture = CompletableFuture.runAsync(() -> {
    List<String> skuSaleAttrValues = productFeignService.getSkuSaleAttrValues(skuId);
    cartItemVo.setSkuAttr(skuSaleAttrValues);
}, executor);
CompletableFuture.allOf(skuInfoFuture,getSkuSaleAttrValuesFuture).get();

cartOps.put(skuId.toString(), JSON.toJSON(cartItemVo));
```

![image-20220810145118295](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.8.png)

向`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`addToCart`方法，`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类的`addToCart`方法声明可能会抛出的异常

![GIF 2022-8-10 14-54-00](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.4.9.gif)

##### 5、解决bug

将9号商品添加到购物车 来到`http://cart.gulimall.com/addToCart?skuId=9&num=1`页面，发现报了json转换失败的异常

![image-20220810150601590](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.5.1.png)

查看`GulimallCartApplication`服务的控制台可以看到报了空指针异常，这是因为`price`有可能没有

```
java.lang.NullPointerException: null
	at com.atguigu.gulimall.cart.vo.CartItemVo.getTotalPrice(CartItemVo.java:53) ~[classes/:na]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_301]
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_301]
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_301]
	at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_301]
	at com.alibaba.fastjson.util.FieldInfo.get(FieldInfo.java:484) ~[fastjson-1.2.47.jar:na]
	at com.alibaba.fastjson.serializer.FieldSerializer.getPropertyValue(FieldSerializer.java:148) ~[fastjson-1.2.47.jar:na]
```

![image-20220810150312584](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.5.2.png)

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.vo.CartItemVo`类的`getTotalPrice`方法，当`price`为空时，返回`0`

```java
/**
 * 计算总价
 * @return
 */
public BigDecimal getTotalPrice() {
    return price==null ? BigDecimal.ZERO : price.multiply(new BigDecimal(count));
}
```

![image-20220810150416117](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.5.3.png)

重启`gulimall-cart`模块，刷新 http://cart.gulimall.com/addToCart?skuId=9&num=1 页面，json工具类又报了不能强转为字符串的异常

![image-20220810150805090](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.5.4.png)

将`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`addToCart`方法里的`JSON.toJSON(cartItemVo)`修改为`JSON.toJSONString(cartItemVo)`

![image-20220810150840904](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.5.5.png)

##### 6、封装数据

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`addToCart`方法的`Object info = r.get("skuInfo");`、`cartItemVo.setSkuAttr(skuSaleAttrValues);`、`return cartItemVo;`上打断点

![image-20220810152402432](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.1.png)

可以看到`BeanUtils.copyProperties(info, infoEntityTo);`属性对拷，没有拷过来，这是因为`info`的类型为`LinkedHashMap`，存放的是`键值对`，而不是属性，所以没有拷过来

![image-20220810151431796](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.2.png)

将`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`addToCart`方法的

```java
SkuInfoEntityTo infoEntityTo = new SkuInfoEntityTo();
BeanUtils.copyProperties(info, infoEntityTo);
```

修改为

```java
String jsonString = JSON.toJSONString(info);
SkuInfoEntityTo infoEntityTo = JSON.parseObject(jsonString, SkuInfoEntityTo.class);
```

重启`gulimall-cart`模块，可以看到此时已经把属性拷过来了

![image-20220810152042784](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.3.png)

可以看到`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`addToCart`方法返回的`cartItemVo`对象的数据已经全部封装成功了

![image-20220810152851473](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.4.png)

查看redis，临时用户保存的`key`为`gulimall:cart:6a642344-003e-4ac1-bea1-27260c5c75c3`

在 http://item.gulimall.com/9.html 页面点击加入购物车，再在redis中查看，`gulimall:cart`里查看，可以发现刚刚加入到购物车的数据已经保存到redis了

![GIF 2022-8-10 15-33-04](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.5.gif)

登录账号，将一个商品添加到购物车，可以看到保存的`key`为`gulimall:cart:7`，也就是用户的id

![GIF 2022-8-10 15-40-05](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.6.gif)

这是购物车没有此商品的情况，还需要在`redis`里判断购物车是否有此商品，如果有此商品，只需修改其数量就行了

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里的`addToCart`方法里，

`BoundHashOperations<String, Object, Object> cartOps = getCartOps();`这一行下面添加

```java
String s = (String) cartOps.get(skuId.toString());
if (StringUtils.hasText(s)){
    CartItemVo cartItemVo = JSON.parseObject(s, CartItemVo.class);
    cartItemVo.setCount(cartItemVo.getCount()+num);
    //修改count后，重新计算totalPrice（总价）
    cartItemVo.setTotalPrice(cartItemVo.getTotalPrice());
    cartOps.put(skuId.toString(), JSON.toJSONString(cartItemVo));
    return cartItemVo;
}
```

在把`BoundHashOperations<String, Object, Object> cartOps = getCartOps();`上面的`CartItemVo cartItemVo = new CartItemVo();`修改到添加的这几行代码的下面

![image-20220810155647023](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.7.png)

重启`gulimall-cart`模块，在`redis`里查看，可以看到当一个商品已经加入过购物车后不会再次添加该商品，只会将`数量`和`价格`都增加

![GIF 2022-8-10 16-01-57](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.1.6.8.gif)

#### 2、向redis里添加购物车数据

##### 1、防止用户频繁添加商品到购物车

为了防止不断刷新购物车，一直增加商品，可以处理完请求后，重定向到购物车页面（不在url上显示`加入购物车`的接口），这样刷新页面就不会一直增加商品。（当然，如果你把`加入购物车`的接口复制出来，一直访问这个接口，还是会一直增加商品）

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类的`addToCart`方法，并添加`addToCartSuccessPage`方法

```java
/**
 * 添加到购物车
 *
 * @return
 */
@GetMapping("/addToCart")
public String addToCart(@RequestParam("skuId") Long skuId,
                        @RequestParam("num") Integer num,
                        RedirectAttributes attributes) throws ExecutionException, InterruptedException {

    cartService.addToCart(skuId, num);
    attributes.addAttribute("skuId",skuId);
    return "redirect:http://cart.gulimall.com/addToCartSuccess.html";
}

@GetMapping("/addToCartSuccess.html")
public String addToCartSuccessPage(@RequestParam("skuId") Long skuId, Model model){
    //重定向到成功页面。再次查询购物车数据即可
    CartItemVo item = cartService.getCartItem(skuId);
    model.addAttribute("item",item);
    return "success";
}
```

![image-20220810163354908](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.1.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.CartService`接口里的`getCartItem`抽象方法

```java
/**
 * 获取购物车中某个购物项
 * @param skuId
 * @return
 */
CartItemVo getCartItem(Long skuId);
```

![image-20220810162620312](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.1.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`getCartItem`抽象方法

```java
@Override
public CartItemVo getCartItem(Long skuId) {
    BoundHashOperations<String, Object, Object> cartOps = getCartOps();
    String s = (String) cartOps.get(skuId.toString());
    return JSON.parseObject(s,CartItemVo.class);
}
```

![image-20220810162829969](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.1.3.png)

将`redis`里的数据清空，将一个商品添加到购物车，可以看到再次刷新购物车页面( http://cart.gulimall.com/addToCartSuccess.html?skuId=5 ) 就已经不能添加商品了

![GIF 2022-8-10 16-38-14](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.1.4.gif)

##### 2、解决bug

但是，如果没有输入没有的`skuId`，比如`http://cart.gulimall.com/addToCartSuccess.html?skuId=10`

就会报`thymeleaf`相关的错误

![image-20220810164038312](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.2.1.png)

在`gulimall-cart`模块的`src/main/resources/templates/success.html`文件的`class="mc success-cont"`的`<div>`上添加`th:if="${item!=null}"`属性，当`item`不为空时才显示，并添加上`item==null`时要显示的数据

```html
<div class="m succeed-box">
    <div th:if="${item!=null}" class="mc success-cont">
        <div class="success-lcol">
            <div class="success-top"><b class="succ-icon"></b>
                <h3 class="ftx-02">商品已成功加入购物车</h3></div>
            <div class="p-item">
                <div class="p-img">
                    <a href="/javascript:;" target="_blank"><img style="height: 60px;width:60px;"
                                                                 th:src="${item?.image}"
                                                                 ></a>
                </div>
                <div class="p-info">
                    <div class="p-name">
                        <a th:href="'http://item.gulimall.com/'+${item?.skuId}+'.html'"
                           th:text="${item?.title}">TCL 55A950C 55英寸32核人工智能 HDR曲面超薄4K电视金属机身（枪色）</a>
                    </div>
                    <div class="p-extra"><span class="txt" th:text="'数量：'+${item.count}">  数量：1</span></div>
                </div>
                <div class="clr"></div>
            </div>
        </div>
        <div class="success-btns success-btns-new">
            <div class="success-ad">
                <a href="/#none"></a>
            </div>
            <div class="clr"></div>
            <div class="bg_shop">
                <a class="btn-tobback"
                   th:href="'http://item.gulimall.com/'+${item?.skuId}+'.html'">查看商品详情</a>
                <a class="btn-addtocart" href="http://cart.gulimall.com/cart.html"
                   id="GotoShoppingCart"><b></b>去购物车结算</a>
            </div>
        </div>
    </div>
    <div th:if="${item==null}" class="mc success-cont">
        <h2>购物车竟然是空的</h2>
        <a href="http://gulimall.com/">去购物</a>
    </div>
</div>
```

![image-20220810164807495](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.2.2.png)

重启`gulimall-cart`模块，再次访问`http://cart.gulimall.com/addToCartSuccess.html?skuId=10`页面，此时就会显示购物车竟然是空的

![image-20220810164833622](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.2.3.png)

##### 3、获取整个购物车

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类的`cartListPage`方法

```java
/**
 * 浏览器有一个cookie; user-key; 标识用户身份，一个月后过期;
 * 如果第一次使用jd的购物车功能，都会给一个临时的用户身份;
 * 浏览器以后保存，每次访问都会带上这个cookie;
 * 登录: session有用户
 * 没登录:按照cookie里面带来user-key来做。
 * 第一次:如果没有临时用户，帮忙创建一个临时用户。
 * <p>
 * 去登录页的请求
 *
 * @return
 */
@GetMapping("/cart.html")
public String cartListPage(Model model) {

    //从ThreadLocal里得到用户信息
    //UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    //System.out.println(userInfoTo);
    CartVo cartVo = cartService.getCart();
    model.addAttribute("cart",cartVo);
    return "cartList";
}
```

![image-20220810165336649](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.1.png)

在`gulimall-cart`模块`com.atguigu.gulimall.cart.service.CartService`接口里添加`getCart`抽象方法

```java
/**
 * 获取整个购物车
 * @return
 */
CartVo getCart();
```

![image-20220810165422521](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.2.png)

在`gulimall-cart`模块`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`getCart`方法

```java
@Override
public CartVo getCart() {
    CartVo cartVo = new CartVo();
    UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    String cartKey = "";
    if (userInfoTo.getUserId() != null) {
        //已登录
        //先判断临时购物车有没有数据
        String tempCartKey = CART_PREFIX + userInfoTo.getUserKey();
        List<CartItemVo> tempCartItems = getCartItems(tempCartKey);
        if (!CollectionUtils.isEmpty(tempCartItems)){
            //临时购物车有数据(合并到用户账户中)
            for (CartItemVo tempCartItem : tempCartItems) {
                addToCart(tempCartItem.getSkuId(),tempCartItem.getCount());
            }
            //删除redis里临时购物车的数据
            stringRedisTemplate.delete(tempCartKey);
        }
        // gulimall:cart:1
        cartKey = CART_PREFIX + userInfoTo.getUserId();
        List<CartItemVo> cartItems = getCartItems(cartKey);
        cartVo.setItems(cartItems);
    }else {
        //没登录
        // gulimall:cart:6a642344-003e-4ac1-bea1-27260c5c75c3
        cartKey = CART_PREFIX + userInfoTo.getUserKey();
        //获取临时购物车的所有购物项
        cartVo.setItems(getCartItems(cartKey));

    }

    return cartVo;
}

private List<CartItemVo> getCartItems(String cartKey) {
    BoundHashOperations<String, Object, Object> hashOps = stringRedisTemplate.boundHashOps(cartKey);
    List<Object> values = hashOps.values();
    if (!CollectionUtils.isEmpty(values)){
        List<CartItemVo> items = values.stream().map(obj -> {
            String str = (String) obj;
             return JSON.parseObject(str, CartItemVo.class);
        }).collect(Collectors.toList());

        return items;
    }
    return null;
}
```

![image-20220810190503779](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.3.png)

`gulimall-cart`模块`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里`getCart`方法，`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类的`cartListPage`方法 声明要抛出的异常

![GIF 2022-8-10 19-02-31](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.4.gif)

修改`gulimall-cart`模块的`src/main/resources/templates/success.html`文件里`你好，请登录`周围的代码

```html
<ul class="hd_wrap_right">
    <li>
        <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
        <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}">你好，请登录</a>
    </li>
    <li>
        <a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}" class="li_2">免费注册</a>
    </li>
    <li class="spacer"></li>
    <li>
        <a href="/javascript:;">我的订单</a>
    </li>
</ul>
```

![image-20220810185536347](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.5.png)

重启`gulimall-cart`模块，清空`redis`里的数据，登录后随便将一个商品添加到购物车，此时就可以看到已登录用户`redis`里购物车的数据了

![GIF 2022-8-10 19-12-25](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.6.gif)

清空 http://gulimall.com/ 里的`cookie` ，未登录的情况下随便将一个商品添加到购物车，此时就可以看到未登录的用户`redis`里也有购物车的数据

![GIF 2022-8-10 19-13-38](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.7.gif)

未登录的情况下再将一个不同的商品添加到购物车，此时就可以看到未登录的用户`redis`里购物车的数据增加了

![GIF 2022-8-10 19-19-48](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.8.gif)

此时再进行登录，再次查看`redis`里的数据，可以看到此时已经将临时购物车里的商品合并到用户的购物车里了

![GIF 2022-8-10 19-22-53](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.3.9.gif)

##### 4、显示购物车中的数据

修改`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件

[点击查看完整代码](code/5.7.9.2.4.html)

![image-20220810195414544](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.4.1.png)

重启`gulimall-cart`模块，登录后访问 http://cart.gulimall.com/cart.html 购物车页面，此时购物车数据已经显示出来了

![image-20220810195212654](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.2.4.2.png)

#### 3、增删查改商品

##### 1、`勾选`/`取消勾选`商品

将`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里选没选中的`<input>`标签的`class="check"`修改为` class="itemCheck"`，并添加自定义属性`th:attr="skuId=${item.skuId}"`

```html
<li><input type="checkbox" th:attr="skuId=${item.skuId}"  class="itemCheck" th:checked="${item.check}"></li>
```

![image-20220810195948921](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.1.1.png)

将`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件的`<script>`标签里添加方法，用于勾选或取消勾选商品

```java
$(".itemCheck").click(function () {
   var skuId = $(this).attr("skuId");
   //用prop获取checked属性返回的是true或false
    var check = $(this).prop("checked");
    location.href = "http://cart.gulimall.com/checkItem?skuId=" + skuId +"&check=" + (check?1:0);
})
```

![image-20220810204135752](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.1.2.png)

##### 2、添加`checkItem`方法

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类里添加`checkItem`方法

```java
@GetMapping("/checkItem")
public String checkItem(@RequestParam("skuId") Long skuId,@RequestParam("check") Integer check){

    cartService.checkItem(skuId,check);

    return "redirect:http://cart.gulimall.com/cart.html";
}
```

![image-20220810203708568](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.2.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.CartService`接口里添加`checkItem`抽象方法

```java
/**
 * 勾选购物项
 * @param skuId
 * @param check
 */
void checkItem(Long skuId, Integer check);
```

![image-20220810201847437](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.2.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`checkItem`方法

```java
/**
 * 修改购物车中商品的选中状态
 * @param skuId
 * @param check
 */
@Override
public void checkItem(Long skuId, Integer check) {
    BoundHashOperations<String, Object, Object> cartOps = getCartOps();
    CartItemVo cartItem = getCartItem(skuId);
    cartItem.setCheck(check == 1);
    //存放到redis
    cartOps.put(skuId.toString(),JSON.toJSONString(cartItem));
}
```

![image-20220810203451501](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.2.3.png)

重启`gulimall-cart`模块，取消选中购物车中的商品，此时`redis`里对应用户的购物车里该商品的`check`属性变为了`false`，再次选中该购物车的该商品，此时`redis`里对应用户的购物车里该商品的`check`属性又变为了`false`

![GIF 2022-8-10 20-42-49](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.2.4.gif)

##### 3、修改商品数量

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里，修改购物车里购物项的数量按钮对应的代码

```html
<li>
    <p style="width: 80px" th:attr="skuId = ${item.skuId}">
        <span class="countOpsBtn">-</span>
        <span class="countOpsNum" th:text="${item.count}">5</span>
        <span class="countOpsBtn">+</span>
    </p>
</li>
```

![image-20220810204946862](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.3.1.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件的`<script>`标签里添加如下代码

```javascript
$(".countOpsBtn").click(function () {
   //$(this).parent()：父元素
   var skuId = $(this).parent().attr("skuId");
   //find(".countOpsNum")：查找子元素
   var num = $(this).parent().find(".countOpsNum").text();
   location.href = "http://cart.gulimall.com/countItem?skuId=" + skuId +"&num=" + num;
})
```

![image-20220810205713537](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.3.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类里添加`countItem`方法

```java
@GetMapping("/countItem")
public String countItem(@RequestParam("skuId") Long skuId,@RequestParam("num") Integer num){

    cartService.changeItemCount(skuId,num);

    return "redirect:http://cart.gulimall.com/cart.html";
}
```

![image-20220810205938886](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.3.3.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.CartService`接口里添加`changeItemCount`抽象方法

```java
/**
 * 修改购物项(购物车里的商品)数量
 * @param skuId
 * @param num
 */
void changeItemCount(Long skuId, Integer num);
```

![image-20220810210100509](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.3.4.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`changeItemCount`方法

```java
@Override
public void changeItemCount(Long skuId, Integer num) {
    BoundHashOperations<String, Object, Object> cartOps = getCartOps();
    CartItemVo cartItem = getCartItem(skuId);
    cartItem.setCount(num);
    //存放到redis
    cartOps.put(skuId.toString(),JSON.toJSONString(cartItem));
}
```

![image-20220810210507186](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.3.5.png)

重启`gulimall-cart`模块，先查看购物车中第一件商品的数量，然后在 http://cart.gulimall.com/cart.html 页面里点击该商品数量的`+`号增加该商品数量，此时查看`redis`就可以看到该商品的数量增加了

![GIF 2022-8-10 21-05-45](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.3.6.gif)

##### 4、删除商品

在 http://cart.gulimall.com/cart.html 页面里点击一个商品操作中的`删除`，此时会弹出一个`删除商品`对话框，，打开控制台，定位到删除商品对话框的删除，复制`<button type="button">删除</button>`

![image-20220810210959478](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.1.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里搜索`<button type="button">删除</button>`，找到对应的对话框的删除标签，给这个`<button>`标签添加`onclick="deleteItem()"`点击事件

```html
<div>
   <button type="button" onclick="deleteItem()">删除</button>

</div>
```

![image-20220810211209293](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.2.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里搜索`删除`，找到对应的点击该删除弹出删除对话框的标签，修改为如下代码

```html
<li>
    <p class="deleteItemBtn" th:attr="skuId=${item.skuId}">删除</p>
</li>
```

![image-20220810211355262](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.3.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`文件里的`<script>`里添加如下代码，用于删除购物项

```javascript
var deleteId = 0;
//删除购物项
function deleteItem() {
   location.href = "http://cart.gulimall.com/deleteItem?skuId=" + deleteId;
}

$(".deleteItemBtn").click(function (){
   deleteId = $(this).attr("skuId");
})
```

![image-20220810232920265](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.4.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类里添加`deleteItem`方法

```java
@GetMapping("/deleteItem")
public String deleteItem(@RequestParam("skuId") Long skuId){
    cartService.deleteItem(skuId);

    return "redirect:http://cart.gulimall.com/cart.html";
}
```

![image-20220810232413642](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.5.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.CartService`接口里添加`deleteItem`抽象方法

```java
/**
 * 删除购物项（删除购物车里的一个商品）
 * @param skuId
 */
void deleteItem(Long skuId);
```

![image-20220810232550529](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.6.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`deleteItem`方法

```java
@Override
public void deleteItem(Long skuId) {
    BoundHashOperations<String, Object, Object> cartOps = getCartOps();
    cartOps.delete(skuId.toString());
}
```

![image-20220810232708946](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.7.png)

重启`gulimall-cart`模块，先在`redis`里查看购物车的数据，再在 http://cart.gulimall.com/cart.html 页面里删除一个商品，再次查看`redis`，此时刚刚删除的商品已经没有了

![GIF 2022-8-11 15-32-03](https://gitlab.com/apzs/image/-/raw/master/image/5.7.9.3.4.8.gif)

#### 4、

redisson的无看门狗

springcache的加锁

