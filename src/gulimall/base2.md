# 四、前后端联调

## 4.1、商品服务-API-三级分类

### 4.1.1、商品服务-API-三级分类后端

#### 1、先执行sql

![image-20220426164247687](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.1.png)

#### 2、修改`com.atguigu.gulimall.product.controller.CategoryController`的list方法

![image-20220426164551505](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.2.1.png)

改为

```java
 /**
     * 查询分类几子分类，以树状形式组装
     */
    @RequestMapping("/list")
        public R list(){
        List<CategoryEntity> list = categoryService.listWithTree();

        return R.ok().put("data", list);
    }
```

![image-20220426164901518](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.2.2.png)

#### 3、实现`CategoryService`的`listWithTree`方法

##### 1、CategoryService接口添加方法

```java
List<CategoryEntity> listWithTree();
```

![image-20220426165019336](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.3.1.png)

##### 2、先查询所有

```java
@Override
public List<CategoryEntity> listWithTree() {
    //baseMapper就是ServiceImpl<CategoryDao, CategoryEntity>中的CategoryDao
    //查询所有分类
    List<CategoryEntity> list = baseMapper.selectList(null);

    return list;
}
```

![image-20220426170219018](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.3.2.png)

##### 3、测试

http://localhost:10000/product/category/list/tree

![image-20220426170316381](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.3.3.png)

##### 4、实体添加属性

在`com.atguigu.gulimall.product.entity.CategoryEntity`类添加`children`字段

`children`字段为其下一级分类（共有三级分类）

![image-20220426172202666](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.3.4.png)

##### 5、修改Service层代码

```java
    @Override
    public List<CategoryEntity> listWithTree() {
        //baseMapper就是ServiceImpl<CategoryDao, CategoryEntity>中的CategoryDao
        //查询所有分类
        List<CategoryEntity> list = baseMapper.selectList(null);
        List<CategoryEntity> topCategory = list.stream()
                //查出一级分类
                .filter(categoryEntity -> categoryEntity.getParentCid() == 0)
                //映射方法，改变对象结构
                .map((menu)->{
                    menu.setChildren(getAllChildren(menu,list));
                    return menu;
                })
                //根据sort字段排序
                .sorted(Comparator.comparingInt((menu)->menu.getSort()!=null?menu.getSort():0))
                //搜集
                .collect(Collectors.toList());

        return topCategory;
    }

    /**
     * 从list集合中获得当前菜单的子菜单
     * @param root 当前菜单
     * @param list  菜单集合
     * @return
     */
    private List<CategoryEntity> getAllChildren(CategoryEntity root, List<CategoryEntity> list) {
        List<CategoryEntity> collect = list.stream()
                .filter(categoryEntity -> root.getCatId().equals(categoryEntity.getParentCid()))
                //
                .map((menu)->{
                    //递归求解其子菜单
                     menu.setChildren(getAllChildren(menu,list));
                     return menu;
                })
                //根据sort字段排序
                .sorted(Comparator.comparingInt((menu)->menu.getSort()!=null?menu.getSort():0))
                .collect(Collectors.toList());
        return collect;

    }
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.3.5.png" alt="image-20220426205730443" style="zoom:50%;" />

##### 6、查看结果

可以看到数据已经按树状显示，并且按sort字段排序**:smile:**

![image-20220426205415943](https://gitlab.com/apzs/image/-/raw/master/image/4.1.1.3.6.png)



```java
//1.可以通过Collection 系列集合提供的stream()或parallelStream()
List<String> list = new ArrayList<>();
Stream<String> stream1 = list.stream();

//2.通过Arrays中的静态方法stream() 获收数组流
String[] ints = {"a", "b", "c", "d"};
Stream<String> stream2 = Arrays.stream(ints);

//3.通过Stream类中的静态方法of()
Stream<String> stream3 = Stream.of("a", "b", "c", "d");

//4.迭代方式创建无限流
//10、12、14、16、18、20、22、24、26、28 ······(从10开始，下一个是 10+2=12,下一个是12+2······)
Stream<Integer> stream4 = Stream.iterate(10, (x) -> x + 2);
//10、12、14、16、18
stream4.limit(5).forEach(System.out::print);
System.out.println();

//5.生成方式创建无限流
//没有种子，每一次生成的元素与上一次生成的元素没有关系，生成的元素为double类型
// 1.2 1.2 1.2 1.2 1.2
Stream.generate(() -> 1.2).limit(5).forEach(System.out::println);
Stream<Double> stream5 = Stream.generate(Math::random);
//0.3522966301192748
//0.20867372930661876
//0.06987341089850951
//0.10069902801339281
//0.3395435668418123
stream5.limit(5).forEach(System.out::println);
```

### 4.1.2、商品服务-API-三级分类前端

#### 1、先启动项目

##### 1、启动后端

启动 `renren-fast`的`io.renren.RenrenApplication`类

![image-20220426213132389](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.1.1.png)

##### 2、启动前端

```
npm run dev
```

![image-20220426213208523](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.1.2.png)

#### 2、跨域报错:angry:

`跨域`：指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是 浏览器对**javascript**施加的安全限制。

`同源策略`：是指协议，域名，端口都要相同，其中有一个不同都会产生跨域；

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.2.0.1.png" alt="image-20220721201231225" style="zoom: 67%;" />

跨域流程：

非简单请求(PUT、DELETE) 等,需要先发送预检请求

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.2.0.2.png" alt="image-20220721201441177" style="zoom: 50%;" />

参考网址： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

解决跨域-（一）使用nginx部署为同一域

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.2.0.3.png" alt="image-20220721201658286" style="zoom: 67%;" />

解决跨域-（二）配置当次请求允许跨域

**添加响应头**

- Access-Control-Allow-Origin：支持哪些来源的请求跨域
- Access-Control-Allow-Methods：支持哪些方法跨域
- Access-Control-Allow-Credentials：跨域请求默认不包含cookie，设置为true可以包含 cookie
- Access-Control-Expose-Headers：跨域请求暴露的字段
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：  Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如 果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。
- Access-Control-Max-Age：表明该响应的有效时间为多少秒。在有效时间内，浏览器无 须为同一请求再次发起预检请求。请注意，浏览器自身维护了一个最大有效时间，如果 该首部字段的值超过了最大有效时间，将不会生效。

##### 1、浏览器输入网址

http://localhost:8001/#/login

可以

![跨域报错](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.2.1.png)

##### 2、解决跨域问题

1、方式一:

> Spring Boot 中如何解决跨域问题:[参考链接][1] ?
>
> 跨域可以在前端通过 JSONP 来解决，但是 JSONP 只可以发送 GET 请求，无法发送其他类型的请求，在 RESTful 风格的应用中，就显得非常鸡肋，因此我们推荐在后端通过 （CORS，Cross-origin resource sharing） 来解决跨域问题。这种解决方案并非 Spring Boot 特有的，在传统的 SSM 框架中，就可以通过 CORS 来解决跨域问题，只不过之前我们是在 XML 文件中配置 CORS ，现在可以通过实现WebMvcConfigurer接口然后重写addCorsMappings方法解决跨域问题。

[1]: https://blog.csdn.net/qq_28325291/article/details/113931232

把 `renren-fast`模块的`io.renren.config.CorsConfig`类的`addCorsMappings`方法注释打开

这个本来是开着的，由于我使用的是资料提供的代码，所有这里先取消注释，后来这个是要注释掉的

![image-20220426213642581](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.2.2.png)

2、添加过滤器

> 项目中前后端分离部署，所以需要解决跨域的问题。 我们使用cookie存放用户登录的信息，在spring拦截器进行权限控制，当权限不符合时，直接返回给用户固定的json结果。 当用户登录以后，正常使用；当用户退出登录状态时或者token过期时，由于拦截器和跨域的顺序有问题，出现了跨域的现象。 我们知道一个http请求，先走filter，到达servlet后才进行拦截器的处理，如果我们把cors放在filter里，就可以优先于权限拦截器执行。

```java
package io.renren.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * springboot解决跨域问题
 */
@Configuration
public class CorsConfig2 {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(source);
    }
}
```

![image-20220426221916301](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.2.2.2.png)

#### 3、添加一级菜单

添加商品系统为一级菜单

![image-20220426223335101](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.3.png)

#### 4、数据库中查看

可以看到商品系统已经添加进来了

![image-20220426223429705](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.4.png)

#### 5、添加二级菜单

添加分类维护为商品系统的下一级菜单

![image-20220426224339948](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.5.png)

#### 6、分析路由规则

##### 1、菜单URL与访问URL对应关系

可以发现当菜单URL为`product/category`时，访问的url为`product-category`

![image-20220426230159499](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.6.1.1.png)

![image-20220426230258838](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.6.1.2.png)

##### 2、访问URL与路径的关系

可以发现当访问的URL为`sys-role`时，文件路径为src/views/modules/sys/role.vue

因此分类维护`product-category`的文件路径src/views/modules/product/category.vue

![image-20220426230951488](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.6.2.1.png)

![image-20220426230916453](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.6.2.2.png)

#### 7、创建目录和vue文件

在`src/views/modules/`目录中创建`product`目录，在`product`目录下创建`category.vue`文件

在`category.vue`中输入vue然后回车，生成模板

随便在div写点东西，然后运行项目

![image-20220427155235060](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.7.1.png)

#### 8、发现ES Link注释报错(项目能运行)

这个ES Link我禁用了还报错:angry:，但是项目能运行

这个ES Link真是阴魂不散

![image-20220427154646562](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.1.png)

![image-20220427155049406](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.2.png)

###### 方法一

将`eslintrc.js`里面的`extends: 'standard',`注释掉就不报错了

![image-20220427160029935](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.3.png)

###### 方法二

删掉`build\webpack.base.conf.js`里面的`createLintingRule()`

![image-20220427160549017](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.4.png)

###### 方法三

删掉`build\webpack.base.conf.js`里面`reateLintingRule()`方法里面的代码

![image-20220503140831432](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.5.png)

###### 方法四

删掉`config\index.js`里面的`useEslint: true,`

![image-20220503141016797](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.6.png)

:pushpin:后来我又使用的是renren-fast-vue，放弃了资料提供的做好的代码

报了一个VS Code的错

```
could not use PowerShell to find Visual Studio 2017 or newer, try re-running with '--loglevel silly' for more details
无法使用Power Shell查找Visual Studio 2017或更新，请尝试使用“ -loglevel Silly”重新运行，以获取更多详细信息
You need to install the latest version of Visual Studio        
find VS including the "Desktop development with C++" workload.
您需要安装最新版本的Visual Studio查找VS，包括“带有C ++的桌面开发”工作负载。
```

![image-20220426234340229](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.8.7.png)

修改一下msvs_version版本就行了

```
npm config set msvs_version 2019
```

#### 9、使用tree树形组件

在`src\views\modules\product\category.vue`文件内使用element-ui中的Tree 树形组件 =>  [组件 | Element](https://element.eleme.io/#/zh-CN/component/tree)

[点击查看`category.vue`完整代码](code/4.1.2.9.category.vue)

![image-20220429123519980](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.9.1.png)

封装的发送`ajax`请求方法在`src\utils\httpRequest.js`文件内，`get`请求可以复制`src\views\modules\sys\role.vue`里面的

![image-20220429123839285](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.9.2.png)

#### 10、运行项目

##### 1、端口访问错误

发现请求的url为 http://localhost:8080/renren-fast/product/category/list/tree

而正确的url为 http://localhost:10000/product/category/list/tree

访问的是8080端口下的renren-fast，而想访问的是10000端口

![image-20220427203758880](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.10.1.png)

##### 2、修改端口

`ctrl+shift+F` 全局搜索`localhost:8080/renren-fast`

发现其定义在`static\config\index.js`里的` window.SITE_CONFIG['baseUrl'] `字段

![image-20220427205415040](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.10.2.1.png)

由于要向多个模块发请求，所以可以指定访问网关，网关再路由到其他模块

```http
http://localhost:88
```

ps:后面又修改为 `http://localhost:88/api` 了

![image-20220427205600163](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.10.2.2.png)

##### 3、刷新页面

刷新页面发现验证码也给网关发请求了，这是因为刚刚配置了basUrl，所有请求都发给网关

![刷新页面](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.10.3.1.png)

#### 11、修改网关配置

先让网关都转给renren-fast模块

##### 1、renren-fast模块注册到注册中心

1、依赖`gulimall-common`模块

`gulimall-common`模块配置的有nacos，依赖`gulimall-common`模块后，点击刷新

```xml
<dependency>
   <groupId>com.atguigu.gulimall</groupId>
   <artifactId>gulimall-common</artifactId>
   <version>0.0.1-SNAPSHOT</version>
</dependency>
```

![image-20220427210524719](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.1.png)

由于`gulimall-common`模块依赖了配置中心，"renren-fast"模块暂时没配，所以可以先排除掉配置中心

这样的话运行可以不报错(不排除也能运行，不过会报错)

```xml
<dependency>
   <groupId>com.atguigu.gulimall</groupId>
   <artifactId>gulimall-common</artifactId>
   <version>0.0.1-SNAPSHOT</version>
   <exclusions>
      <exclusion>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
      </exclusion>
   </exclusions>
</dependency>
```

##### 2、修改配置文件

配置应用名和注册中心地址

```yaml
spring:  
    application:
      name: renren-fast
    cloud:
      nacos:
        discovery:
          server-addr: 127.0.0.1:8848
```

![image-20220427210950685](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.2.png)

##### 3、启动类添加服务发现注解

###### 1、添加注解

```java
@EnableDiscoveryClient
```

![image-20220427211241374](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.3.1.png)

###### 2、提示Gson不存在

![image-20220427211712823](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.3.2.png)

###### 3、添加gson依赖

添加gson依赖后，重启模块

```xml
<dependency>
   <groupId>com.google.code.gson</groupId>
   <artifactId>gson</artifactId>
   <version>2.8.5</version>
</dependency>
```

![image-20220427211829461](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.3.3.png)

###### 4、配置中心报错

由于在`gulimall-common`配置了配置中心，而项目没有配置配置中心地址和端口

因此项目启动时，会报配置中心相关的错误，这里先不用管

![image-20220428160014549](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.3.4.png)

##### 4、查看注册中心

启动nacos，在浏览器输入: http://localhost:8848/nacos/

用户名和密码都为nacos

可以发现已经注册到nacos上了

![image-20220427212615394](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.4.png)

##### 5、修改网关配置

```yaml
- id: admin_route
  uri: lb://renren-fast   #loadbalanced 负载均衡
  predicates:
    - Path=/api/**		  #Path请求路径，请求路径前面加一个/api，**表示任意请求
```

![image-20220427213105152](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.5.1.png)

前端的index.js的baseUrl也由

```properties
window.SITE_CONFIG['baseUrl'] = 'http://localhost:88';
```

修改为

```properties
window.SITE_CONFIG['baseUrl'] = 'http://localhost:88/api';
```

参考文档:https://docs.spring.io/spring-cloud-gateway/docs/2.2.9.RELEASE/reference/html/#the-cookie-route-predicate-factory

![image-20220427214715052](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.5.2.png)

![image-20220427215853495](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.5.3.png)

##### 6、重启项目

重启项目发现还是访问不了

访问不了的原因是

前端访问了 http://localhost:88/api/captcha.jpg

通过网关，断言匹配到了 /api/**

所以网关路由到了renren-fast模块,即找到了 http://localhost:8080

然后将` http://localhost:8080`与` /api/captcha.jpg`组成了 http://localhost:8080/api/captcha.jpg

而正确的路径为 http://localhost:8080/renren-fast/captcha.jpg

![image-20220427215308179](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.6.png)

##### 7、路径重写

将将请求由 http://localhost:88/api/captcha.jpg 变为 http://localhost:8080/renren-fast/captcha.jpg

然后重启项目

```yaml
filters:
  #路径重写,将请求由 http://localhost:88/api/captcha.jpg 变为 http://localhost:8080/renren-fast/captcha.jpg
  - RewritePath=/api/(?<segment>/?.*),/renren-fast/$\{segment}
```

![image-20220428162416500](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.7.1.png)

![image-20220427220727452](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.11.7.2.png)

#### 12、验证码已经显示出来了

![image-20220427221353624](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.12.png)

#### 13、跨域请求

点击登录发现没反应，看一下控制台显示跨域请求

```
Access to XMLHttpRequest at 'http://localhost:88/api/sys/login' from origin 'http://localhost:8001' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

![image-20220427224950491](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.13.1.png)

查看Network可以看到有`CORS error`

![image-20220427225621837](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.13.2.png)

点击第二个login，发现请求方式为`OPTION`，表示这个请求为`域检请求`

![image-20220427225801035](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.13.3.png)

#### 14、后端配置允许跨域请求

由于前端指定访问网关，网关再路由到其他模块，所有可以再网关模块配置跨域请求，这样别的模块就不用配置跨域请求了

```java
package com.atguigu.gulimall.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

/**
 * @author 无名氏
 * @date 2022/4/27
 * @Description: 跨域请求过滤器
 */
@Configuration
public class GulimallCorsConfiguration {

    @Bean
    public CorsWebFilter corsWebFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        //添加允许的请求头
        corsConfiguration.addAllowedHeader("*");
        //添加允许的请求方式
        corsConfiguration.addAllowedMethod("*");
        //添加允许的请求来源
        corsConfiguration.addAllowedOrigin("*");
        //是否允许携带cookie进行跨域
        //设为false会丢失cookie信息
        corsConfiguration.setAllowCredentials(true);

        //CorsWebFilter需要传入CorsConfigurationSource接口类型的参数
        //UrlBasedCorsConfigurationSource是CorsConfigurationSource接口的实现类
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // "/**"表示任意路径
        source.registerCorsConfiguration("/**",corsConfiguration);
        return new CorsWebFilter(source);
    }
}
```

![image-20220427230019471](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.14.png)

#### 15、刷新前端页面

重启`gulimall-gateway`模块，刷新前端页面

```
The 'Access-Control-Allow-Origin' header contains multiple values 'http://localhost:8001, http://localhost:8001', but only one is allowed.
'Access-Control-Allow-Origin'头包含多个值，但只有一个被允许
```

![image-20220427231312786](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.15.1.png)

NetWork也可以看到包含了两个

![image-20220427231548647](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.15.2.png)

#### 16、取消renren-fast项目的跨域配置

包含两个值的原因是gulimall-gateway配置了跨域

而renren-fast项目默认也配置了跨域

因此取消的renren-fast项目的跨域配置就行了

注释到这里

![image-20220427232200865](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.16.png)

#### 17、重新刷新前端页面

重启renren-fast项目后,重新刷新前端页面,点击登录后，发现已经登录成功了

![image-20220427232353711](https://gitlab.com/apzs/image/-/raw/master/image/4.1.2.17.png)

### 4.1.3、显示商品服务下的分类维护

#### 1、分类维护页面

点击`商品系统`下的`分类维护`，发现没有数据，打开控制台，发现给网关发送了请求，但请求失败

请求路径为: http://localhost:88/api/product/category/list/tree

正确的请求为: http://localhost:10000/product/category/list/tree

网关由于没有配置`gulimall-product`，因此默认路由到了`renren-fast`

即:  http://localhost:8080/renren-fast/category/list/tree

![image-20220428160942870](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.1.png)

#### 2、网关添加配置

在网关的配置文件中添加路由到`gulumall-product`模块的配置

(`product_route`的`filters`写错了，少写了个`s`:fearful:)

```yaml
- id: product_route
  uri: lb://gulimall-product
  predicates:
    - Path=/api/product/**
  filter:  #这里应该为`filters`，少写了一个`s`
    #http://localhost:88/api/product/category/list/tree 变为http://localhost:10000/product/category/list/tree
    - RewritePath=/api/(?<segment>/?.*),/$\{segment}
```

![image-20220428163318103](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.2.png)

#### 3、新建product命名空间

##### 1、新建product命名空间，作为`gilimall-product`项目在配置中心的命名空间

![image-20220428164008683](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.3.1.png)

##### 2、复制product的命名空间ID

![image-20220428164334571](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.3.2.png)

#### 4、配置配置中心

在`gulimall-product`模块的resource目录下新建`bootstrap.properties`文件，并配置 应用名、配置中心地址、命名空间等

`namespace`写刚刚复制的product的命名空间ID

```properties
spring.application.name=gulimall-product

spring.cloud.nacos.config.server-addr=127.0.0.1:8848
spring.cloud.nacos.config.namespace=d6d03bd1-5815-4fa1-8caf-93b09462fd45
```

![image-20220428165002877](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.4.png)

#### 5、配置注册中心

在`gulimall-product`模块的`application.yml`配置文件中配置注册中心地址

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```

![image-20220428165402783](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.5.png)

#### 6、开启服务发现

`gulimall-product`模块添加`@EnableDiscoveryClient`注解，来开启服务发现

![image-20220428165643767](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.6.png)

#### 7、查看是否添加到注册中心

重新启动`gulimall-product`项目,可以看到`gulimall-product`已经添加到注册中心上了

![image-20220428170006762](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.7.png)

#### 8、查看前端页面

##### 1、第二个tree的请求出错

发现第二个tree的请求出错（第一个`OPTIONS`请求方式的`域检请求`请求成功）

![image-20220428170834876](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.8.1.png)

##### 2、令牌无效

http://localhost:88/api/product/category/list/tree

直接访问会出现`invalid token`：令牌无效，非法的令牌

![image-20220428171048454](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.8.2.png)

##### 3、直接访问正常

http://localhost:10000/product/category/list/tree

![image-20220428173622969](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.8.3.png)

##### 4、查看匹配的路由

在`gulimall-gateway`模块的`application.yml`配置文件中修改日志级别

root表示所有包

```java
logging:
  level:
    root: debug
```

重新运行项目

![image-20220428180356028](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.8.4.png)

#### 9、调整路由顺序

令牌无效的原因是`product_route`没有生效，先被`admin_route`拦截了

调整一下`product_route`和`admin_route`的路由顺序

(`product_route`的`filters`写错了，少写了个`s`:fearful:)

![image-20220428171421729](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.9.png)

#### 10、发现错误

##### 1、请求报错

![image-20220428173247272](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.10.1.png)

##### 2、直接访问正常

![image-20220428173746039](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.10.2.png)

##### 3、修改日志级别

在`gulimall-gateway`模块的`application.yml`配置文件中修改日志级别

root表示所有包

```yaml
logging:
  level:
    root: debug
```

![image-20220428173856379](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.10.3.png)

##### 4、查看错误

的确匹配到了`product_route`但是请求路径变成了 http://192.168.19.1:10000/api/product/category/list/tree

而正确的路径应该为: http://192.168.19.1:10000/product/category/list/tree

没有这个`/api`，应该是路径重写没有生效

![image-20220428173111604](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.10.4.1.png)

这里的ip为`192.168.19.1`是因为它用的是VMnet8的ip

`cmd`输入`ipconfig`命令可以查看所有ip

```
ipconfig
```

![image-20220428182149959](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.10.4.2.png)

##### 5、少写了个s:fearful:

`filters`写成了`filter`,少写了个s:fearful:

改过来就行了

![image-20220428182642830](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.10.5.png)

#### 11、刷新页面

已经不报错，并且数据也获取到了

![image-20220428182729802](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.11.1.png)

控制台也输出数据了，数据在`data.data`中

![image-20220428183017017](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.11.2.png)

#### 12、获得数据

使用`console.log(data)`返回的数据在`data.data`中

```
console.log(data)
```

![image-20220428184002713](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.12.1.png)

因此使用`console.log(data.data.data)`即为数据

![image-20220428184312865](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.12.2.png)

这样写可以少写一个`.data`，由`console.log(data.data.data)`改为`console.log(data.data)`

```javascript
then(({data})=>{
   console.log(data.data)
});
```

![image-20220428184442887](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.12.3.png)

把数据赋给`data`

![image-20220428185149029](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.12.4.png)

#### 13、结构出来了

结构出来了但是没有数据

![image-20220428184923869](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.13.png)

#### 14、修改属性名字段

默认的属性名为`label`，要改为`name`

`data`也改为`menu`，共3处

![image-20220428185623465](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.14.png)

#### 15、显示树形结构

![image-20220428185858698](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.15.png)

#### 16、显示添加和删除

| 参数                 | 说明                                                         | 类型    | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------- | ------ |
| data                 | 展示数据                                                     | array   |        |
| node-key             | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的         | String  |        |
| props                | 配置选项                                                     | object  |        |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 | boolean | true   |
| show-checkbox        | 节点是否可被选择                                             | boolean | false  |

以下代码均在`category.vue`文件中修改

##### 1、显示`append`和`delete`

在`el-tree`标签内添加 `Append`和`Delete`

```html
<span class="custom-tree-node" slot-scope="{ node, data }">
  <span>{{ node.label }}</span>
  <span>
    <el-button type="text" size="mini" @click="() => append(data)">
      Append
    </el-button>
    <el-button type="text" size="mini" @click="() => remove(node, data)">
      Delete
    </el-button>
  </span>
</span>
```

##### 2、添加`append`和`remove`方法

```javascript
append(data) {
  console.log("append方法中的data参数：");
  console.log(data);
},
remove(node, data) {
  console.log("remove方法中的node参数：");
  console.log(node);
  console.log("remove方法中的data参数：");
  console.log(data);
},
```

##### 3、修改添加和删除按钮显示规则

当不是叶子节点时才显示`Append`

在内容为`Append`对应的`el-button`标签内添加属性`v-if="data.catLevel<=2"`,使当前节点深度少于2时才显示

```
v-if="data.catLevel<=2"
```

当没有子节点时才显示`Delete`

在内容为`Delete`对应的`el-button`标签内添加属性`v-if="data.children.length==0"`,使当前节点没有子节点时才显示

```
v-if="data.children.length==0"
```

##### 4、`el-tree`标签内添加属性

`:expand-on-click-node="false"`使用户只有点击箭头图标的时候才会展开或者收缩节点。

```properties
:expand-on-click-node="false"
```

##### 5、显示复选框

`el-tree`标签内添加`show-checkbox`属性

```
show-checkbox
```

##### 6、添加节点标识

由于`catId`为唯一id，不会重复，所以把`catId`作为节点标识

~~给`el-tree`标签添加属性`node-key="data.catId"`~~,把`catId`作为节点标识，加快渲染效率

应该为`node-key="catId"`，后面发现写错了,可以看到点击“摄影摄像”，下方直接打印的"catId"即为想要设置的值，并不在data下

![image-20220429205157370](https://gitlab.com/apzs/image/-/raw/master/image/4.1.3.16.6.png)

#### 17、完整代码

[点击查看完整代码](code/4.1.3.17.vue)

### 4.1.4、分类维护实现添加和删除功能

#### 1、添加测试数据

Duplicate entry '1432' for key 'Primary ': 主键重复

Duplicate: 重复，复制

我都没用，它说我主键重复:fearful:

![image-20220429090628243](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.1.1.png)

不写`cat_id`直接添加数据，发现`cat_id`已经到1433了，~~应该是导入的sql语句已经用过1432了~~

（这里是`navicat`没显示完,1432已经被使用了，死坑:smiling_imp:）

![image-20220429091322757](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.1.2.png)

汉字乱码是因为`cmd`编码为`gbk`，而mysql设置的编码为`utf-8`，这里不用管它

![image-20220429110456709](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.1.3.png)

#### 2、测试删除方法

![image-20220429092432729](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.2.1.png)

```
POST http://localhost:10000/product/category/delete
Content-Type: application/json

[1433]
```

![image-20220429091751970](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.2.2.png)

可以看到已经成功了("msg"为"success")

刷新一下表，已经没有测试数据了

![image-20220429092613049](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.2.3.png)

#### 3、删除功能Controller

` categoryService.removeByIds(Arrays.asList(catIds)); `这一行应该删掉，这里写错了

```java
/**
 * 删除
 * @RequestBody ;获取请求体，必须发送POST请求
 * SpringMVC自动将请求体的数据(json) ，转为对应的对象
 */
@RequestMapping("/delete")
    public R delete(@RequestBody Long[] catIds){
    categoryService.removeByIds(Arrays.asList(catIds));  //这一行应该删掉

    //检查当前删除的菜单是否被别的地方引用
    //categoryService.removeByIds(Arrays.asList(catIds));

    //批量删除
    categoryService.removeMenuByIds(Arrays.asList(catIds));


    return R.ok();
}
```

![image-20220429100222561](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.3.png)

#### 4、删除功能Service接口

在Controller的调用该方法的地方使用`alt+enter`快捷键可以快速转到`CategoryService`接口，并生成该方法

![image-20220429093531976](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.4.png)

#### 5、实现批量删除方法

在接口类的左侧点击下箭头可以迅速跳转到实现类,使用`alt+enter`快捷将添加未实现的方法

先需要检查，由于不知道什么业务会引用菜单，因此先加个`//TODO`做个标记(由于生成的时候里面有很多`//TODO`所以待办事项看起来有很多)

(当然也可以使用`IDEA`中的`Favorites`,这个感觉很好用)

然后再使用逻辑删除来批量删除数据

```java
@Override
public void removeMenuByIds(List<Long> asList) {
    //TODO 检查当前删除的菜单是否被别的地方引用

    //逻辑删除(show_status作为标志位，置为0表示删除)
    baseMapper.deleteBatchIds(asList);
}
```

![image-20220429095942397](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.5.png)

#### 6、配置逻辑删除

##### 1、添加配置

> 配置`com.baomidou.mybatisplus.core.config.GlobalConfig$DbConfig`

(这个配置正好和需求是反的)

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

![image-20220429101346965](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.6.1.png)

##### 2、添加注解

> 在`com.atguigu.gulimall.product.entity.CategoryEntity`类的`showStatus`字段添加注解
>
> - `value`逻辑未删除除的值
> - `delval` 逻辑被删除的值

```java
@TableLogic(value = "1",delval = "0")
```

![image-20220429101838137](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.6.2.png)

##### 3、调整日志级别

在`gulimall-product\src\main\resources\application.yml`里面添加配置,调成`debug`级别

```yaml
logging:
  level:
    com.atguigu.gulimall: debug
```

图的gulimall写错了,后来没打印sql语句才发现的

![image-20220429102750359](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.6.3.png)

#### 7、测试

##### 1、添加测试数据

![image-20220429102907478](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.1.png)

##### 2、删除cat_id为1434的数据

重新运行项目，点击运行按钮，发送删除的请求

可以看到已经删除成功了

```
POST http://localhost:10000/product/category/delete
Content-Type: application/json

[1434]
```

![image-20220429103123471](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.2.png)

##### 3、检查是否逻辑删除

###### 1、刷新后，发现直接删除了

![image-20220429103338298](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.1.png)

###### 2、删除方法

删除`CategoryController`类的这一行

![image-20220429103415229](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.2.png)

###### 3、重新测试

重启项目,重新测试发现没有打印sql语句，这个日志配置写错了一个字母:fearful:

```yaml
logging:
  level:
    com.atguigu.gulimall: debug
```

![image-20220429104837069](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.3.png)

###### 4、~~发现还是直接删除了~~

需要点击右下角的下一页，显示后面的数据

![image-20220429105019814](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.4.png)

###### 5、打印的sql语句显示的是逻辑删除

![image-20220429105123536](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.5.png)

###### 6、使用`cmd`连接mysql

可以看到其实是逻辑删除，数据还在，而且`show_status`已经标记为0了(坑爹`navicat`不一页显示全数据:smiling_imp:)

汉字乱码是因为`cmd`编码为`gbk`，而mysql设置的编码为`utf-8`，这里不用管它

![image-20220429105941270](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.6.png)

###### 7、右下角可以翻页

![image-20220429130754284](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.7.png)

###### 8、点击设置可以更改每页显示的行数

![image-20220429131007804](https://gitlab.com/apzs/image/-/raw/master/image/4.1.4.7.3.8.png)

### 4.1.5、分类维护前端发送删除请求

#### 1、封装请求的工具类

封装的发送`ajax`请求方法在`src\utils\httpRequest.js`文件内

![image-20220429122946232](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.1.png)

#### 2、post请求模块

`post`请求可以复制`src\views\modules\sys\role.vue`里面的

![image-20220429124108364](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.2.png)

#### 3、新建用户片段

##### 1、选择用户片段

![image-20220429124726677](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.3.1.png)

##### 2、点击以前生成的模板

如果跳过前面的前端部分，在这里可以点击`新建全局代码片段文件...`，然后复制全部代码模板

![image-20220429124827693](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.3.2.png)

##### 3、添加`get`和`post`请求模板

在后面添加添加`get`和`post`请求模板,输入"httpget"和"httppost"即可出现相应代码片段

`get`请求模板

```json
"http-get 请求": {
	"prefix": "httpget",
	"body": [
		"this.\\$http({",
		"url: this.\\$http.adornUrl(''),",
		"method: 'get',",
		"params: this.\\$http.adornParams({})",
		"}).then(({data}) => {",
		"})"
	],
	"description": "httpGET 请求"
}
```

`post`请求模板

```json
"http-post 请求": {
	"prefix": "httppost",
	"body": [
		"this.\\$http({",
		"url: this.\\$http.adornUrl(''),",
		"method: 'post',",
		"data: this.\\$http.adornData(data, false)",
		"}).then(({ data }) => { });"
	],
	"description": "httpPOST 请求"
}
```

[点击查看完整代码模板](code/4.1.5.3.3.代码模板.snippets)

![image-20220429124905747](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.3.3.png)

#### 4、编写删除代码

```javascript
remove(node, data) {
  var ids = [data.catId];
  this.$http({
  url: this.$http.adornUrl('/product/category/delete'),
  method: 'post',
  data: this.$http.adornData(ids, false)
  }).then(({ data }) => {
    console.log("删除成功...")
    //重新发送请求,更新数据
    this.getMenus();
    });
},
```

![image-20220429193841630](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.4.png)

#### 5、添加测试数据

![image-20220429193328389](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.5.png)

#### 6、点击删除

![image-20220429194221023](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.6.1.png)

可以看到，已经显示删除成功了

![image-20220429194316686](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.6.2.png)

#### 7、查看结果

可以看到`测试数据5`的`show_status`字段已经为0了（已经逻辑删除了）

![image-20220429194442816](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.7.png)

#### 8、体验优化

##### 1、添加删除提示框

以下代码为模板 [组件 | Element](https://element.eleme.io/#/zh-CN/component/message-box)

```javascript
this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  type: "warning",
})
  .then(() => {
    this.$message({
      type: "success",
      message: "删除成功!",
    });
  })
  .catch(() => {
    this.$message({
      type: "info",
      message: "已取消删除",
    });
  });
```

添加删除提示框

```javascript
this.$confirm(`是否删除【${data.name}】菜单`, "提示", {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  type: "warning",
})
  .then(() => {
    var ids = [data.catId];
    this.$http({
      url: this.$http.adornUrl("/product/category/delete"),
      method: "post",
      data: this.$http.adornData(ids, false),
    }).then(({ datas }) => {
      this.$message({
        type: "success",
        message: `【${data.name}】删除成功`,
      });
      //重新发送请求,更新数据
      this.getMenus();
    });
  })
  .catch(() => {
    this.$message({
      type: "info",
      message: "已取消删除",
    });
  });
```

##### 2、删除后默认展开其父节点

> default-expanded-keys: 默认展开的节点的 key 的数组

`el-tree`标签添加属性`:default-expanded-keys="expandedKey"`

`data`的中`return`语句里添加` expandedKey: [],`

`remove`方法添加` this.expandedKey = [node.parent.data.catId];`

###### 1、发现并没有展开

把`测试数据5`的`show_status`字段重新置为`1`后再删除，发现并没有展开

![image-20220429203815538](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.8.2.1.png)

###### 2、修改`node-key`

把`node-key="data.catId"`改为`node-key="catId"`

![image-20220429204100137](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.8.2.2.png)

可以看到点击“摄影摄像”，下方直接打印的"catId"即为想要设置的值，并不在data下

![image-20220429205411898](https://gitlab.com/apzs/image/-/raw/master/image/4.1.5.8.2.3.png)

#### 9、完整代码

[点击查看完整代码](code/4.1.5.9.vue)

### 4.1.6、分类维护新增功能

#### 1、前端发送新增请求

##### 1、添加页面

再`template`标签的`div`里面添加页面

```html
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
  <el-form :model="category">
    <el-form-item label="分类名称">
      <el-input v-model="category.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCatagory">确 定</el-button>
  </span>
</el-dialog>
```

##### 2、添加数据字段

在`data`的`return`语句中添加` category: { name: "" },`

##### 3、添加提交方法

```javascript
addCatagory(){
  this.dialogVisible = false;
  console.log("catagory中的数据:");
  console.log(this.category);
}
```

##### 4、点击`append`显示对话框

在`append`方法中添加`this.dialogVisible = true;`

##### 5、测试

点击"append"按钮，输入分类名称，点击确定，可以发现`category`中的数据有`name: 'hhh'`

![image-20220429213147531](https://gitlab.com/apzs/image/-/raw/master/image/4.1.6.5.png)

##### 6、修改`category`数据

而后端需要的由以下五个数据

![image-20220429213643518](https://gitlab.com/apzs/image/-/raw/master/image/4.1.6.6.png)

修改`data`数据下`retrun`里面的`category`

```
category: { name: "", parentCid: 0, catLevel: 0, showStatus: 1, sort: 0 },
```

##### 7、修改`append`方法

在`append`方法中添加以下代码

```javascript
//<点击append按钮的节点>为<要添加的节点>的父节点
this.category.parentCid = data.catId;
//<要添加的节点>的父节点的层级为<点击append按钮的节点>+1
//data.catLevel*1 可以将 String类型的 data.catLevel 转为 int 类型
this.category.catLevel = data.catLevel * 1 + 1;
```

##### 8、测试category携带的参数

可以看到这些数据都带上了

![image-20220429215054133](https://gitlab.com/apzs/image/-/raw/master/image/4.1.6.8.png)

##### 9、向后端发送新增请求

`addCatagory`方法内添加向后端发送新增请求的代码(输入`httppost`会生成用户代码片段)

```javascript
addCatagory() {
  this.dialogVisible = false;

  this.$http({
    url: this.$http.adornUrl("/product/category/save"),
    method: "post",
    data: this.$http.adornData(this.category, false),
  }).then(({ data }) => {
    this.$message({
      type: "success",
      message: `添加成功`,
    });
    //重新获取数据
    this.getMenus();
    //默认展开的菜单节点
    this.expandedKey = [this.category.parentCid];
  });
},
```

##### 10、添加菜单

点击"append"按钮，输入分类名称，点击确定，可以发现已经有数据了

![image-20220429221202449](https://gitlab.com/apzs/image/-/raw/master/image/4.1.6.10.png)

##### 11、完整代码

[点击查看完整代码](code/4.1.6.11.vue)

### 4.1.7、分类维护增删查改

#### 1、添加修改按钮

在`删除`按钮下添加修改按钮

```html
<el-button type="text" size="mini" @click="() => edit(data)">
  Edit
</el-button>
```

#### 2、添加数据

添加数据字段，用来标识当前对话框是添加还是删除

```javascript
//对话框的类型(添加或删除)
dialogType: "",
//对话框的标题(添加分类或删除分类)
dialogTitle: "",
```

#### 3、添加`catagory`数据字段

添加` catId: null,`字段

```javascript
category: {
  name: "",
  parentCid: 0,
  catLevel: 0,
  showStatus: 1,
  sort: 0,
  catId: null,
},
```

#### 4、编写`edit`方法

```javascript
edit(data) {
  console.log("修改按钮...", data);

  this.category.name = data.name;
  this.category.catId = data.catId;
  this.dialogType = "edit";
  this.dialogTitle = "修改分类";
  //打开添加或修改的对话框
  this.dialogVisible = true;
},
```

#### 5、修改`append`方法

```javascript
append(data) {
  console.log("append方法中的data参数：", data);

  this.dialogType = "append";
  this.dialogTitle = "添加分类";
  this.dialogVisible = true;
  //<点击append按钮的节点>为<要添加的节点>的父节点
  this.category.parentCid = data.catId;
  //<要添加的节点>的父节点的层级为<点击append按钮的节点>+1
  //data.catLevel*1 可以将 String类型的 data.catLevel 转为 int 类型
  this.category.catLevel = data.catLevel * 1 + 1;
},
```

#### 6、修改确定按钮绑定的事件方法

修改确定按钮点击事件调用的方法为`submitData`

```html
 <el-button type="primary" @click="submitData">确 定</el-button>
```

#### 7、添加`submitData`方法

```javascript
submitData() {
  if (this.dialogType == "append") {
    this.addCatagory();
  } else if (this.dialogType == "edit") {
    this.editCatagory();
  }
},
```

#### 8、打印修改请求数据

```javascript
editCatagory() {
  //关闭对话框
  this.dialogVisible = false;
  console.log("修改提交的数据：", this.category);
},
```

![image-20220430180933340](https://gitlab.com/apzs/image/-/raw/master/image/4.1.7.8.png)

#### 9、对话框内添加标签

在`el-dialog`标签内添加`el-form-item`标签

```html
<el-form-item label="图标">
  <el-input v-model="category.icon" autocomplete="off"></el-input>
</el-form-item>
<el-form-item label="计量单位">
  <el-input v-model="category.productUnit" autocomplete="off" ></el-input>
</el-form-item>
```



#### 10、发送修改请求

这里的代码写的有问题(后面测试发现数据库已经修改数据了，但是前端没有显示，刷新后才能显示)

```javascript
editCatagory() {
  console.log("修改提交的数据：", this.category);
  var {catId,name,icon,productUnit} = this.category;
  this.$http({
  url: this.$http.adornUrl('/product/category/update'),
  method: 'post',
  data: this.$http.adornData({catId,name,icon,productUnit}, false)
  }).then(({ data }) => { });
  //关闭对话框
    this.dialogVisible = false;
    //重新获取数据
    this.getMenus();
    //默认展开的菜单节点
    this.expandedKey = [this.category.parentCid];
},
```

应该写为

```javascript
editCatagory() {
  console.log("修改提交的数据：", this.category);
  var { catId, name, icon, productUnit } = this.category;
  this.$http({
    url: this.$http.adornUrl("/product/category/update"),
    method: "post",
    data: this.$http.adornData({ catId, name, icon, productUnit }, false),
  }).then(({ data }) => {
    this.$message({
      type: "success",
      message: `添加成功`,
    });
    //关闭对话框
    this.dialogVisible = false;
    //重新获取数据
    this.getMenus();
    //默认展开的菜单节点
    this.expandedKey = [this.category.parentCid];
  });
},
```

#### 11、修改`edit`方法,动态获取值

```javascript
edit(data) {
  console.log("修改按钮...", data);

  this.category.catId = data.catId;
  this.dialogType = "edit";
  this.dialogTitle = "修改分类";
  //打开添加或修改的对话框
  this.dialogVisible = true;
  this.$http({
    url: this.$http.adornUrl(
      `/product/category/info/${this.category.catId}`
    ),
    method: "get",
  }).then(({ data }) => {
    console.log("修改按钮调用后端回显的数据:", data);
    this.category.name = data.data.name;
    this.category.icon = data.data.icon;
    this.category.productUnit = data.data.productUnit;
    //更新父菜单id，发送修改请求后，可以展开父节点
    this.category.parentCid = data.data.parentCid;
  });
},
```

#### 12、修改`append`方法

```javascript
append(data) {
  console.log("append方法中的data参数：", data);
  //清空category数据
  this.clearCategory();
  this.dialogType = "append";
  this.dialogTitle = "添加分类";
  this.dialogVisible = true;
  //<点击append按钮的节点>为<要添加的节点>的父节点
  this.category.parentCid = data.catId;
  //<要添加的节点>的父节点的层级为<点击append按钮的节点>+1
  //data.catLevel*1 可以将 String类型的 data.catLevel 转为 int 类型
  this.category.catLevel = data.catLevel * 1 + 1;
},
clearCategory(){
  this.category ={
    name: "",
    parentCid: 0,
    catLevel: 0,
    showStatus: 1,
    sort: 0,
    icon: "",
    productUnit: "",
    catId: null,
  }
},
```

#### 13、修改`addCatagory`方法

```javascript
addCatagory() {
  console.log("添加提交的数据：", this.category);

  var { name, parentCid, catLevel, showStatus, sort, icon ,productUnit} = this.category;
  this.$http({
    url: this.$http.adornUrl("/product/category/save"),
    method: "post",
    data: this.$http.adornData({ name, parentCid, catLevel, showStatus, sort, icon ,productUnit}, false),
  }).then(({ data }) => {
    this.$message({
      type: "success",
      message: `添加成功`,
    });
    //关闭对话框
    this.dialogVisible = false;
    //重新获取数据
    this.getMenus();
    //默认展开的菜单节点
    this.expandedKey = [this.category.parentCid];
  });
},
```

#### 14、优化体验,防止误关对话框

##### 1、添加`close-on-click-modal`属性

在`el-dialog`标签内添加`close-on-click-modal`属性

使用户只有在点击"×"、"取消"、"确定"才会关闭对话框，防止误点到其他地方导致关闭了对话框

| 参数                 | 说明                               | 类型    | 可选值 | 默认值 |
| -------------------- | ---------------------------------- | ------- | ------ | ------ |
| close-on-click-modal | 是否可以通过点击 modal 关闭 Dialog | boolean | —      | true   |

```
close-on-click-modal="false"
```

##### 2、控制台显示需要`Boolean`类型，而给出的是"String"类型

![image-20220430204554937](https://gitlab.com/apzs/image/-/raw/master/image/4.1.7.14.2.png)

##### 3、使用`v-bind`属性

```
:close-on-click-modal="false"
```

![image-20220430204921080](https://gitlab.com/apzs/image/-/raw/master/image/4.1.7.14.3.png)

##### 4、控制台不报错了

![image-20220430205044369](https://gitlab.com/apzs/image/-/raw/master/image/4.1.7.14.4.png)

#### 15、修改后前端不更新数据

修改分类名称后，发现数据库已经修改数据了，但是前端没有显示，刷新后才能显示

#### 16、修改`editCatagory`方法

```javascript
editCatagory() {
  console.log("修改提交的数据：", this.category);
  var { catId, name, icon, productUnit } = this.category;
  this.$http({
    url: this.$http.adornUrl("/product/category/update"),
    method: "post",
    data: this.$http.adornData({ catId, name, icon, productUnit }, false),
  }).then(({ data }) => {
    this.$message({
      type: "success",
      message: `添加成功`,
    });
    //关闭对话框
    this.dialogVisible = false;
    //重新获取数据
    this.getMenus();
    //默认展开的菜单节点
    this.expandedKey = [this.category.parentCid];
  });
},
```

#### 17、完整代码

[点击查看完整代码](code/4.1.7.17.vue)

### 4.1.8、添加拖拽节点功能

#### 1、添加拖拽功能

参考文档: [组件 | Element](https://element.eleme.cn/#/zh-CN/component/tree)

| 参数       | 说明                                                         | 类型                                   | 默认值 |
| :--------- | :----------------------------------------------------------- | :------------------------------------- | :----- |
| draggable  | 是否开启拖拽节点功能                                         | boolean                                | false  |
| allow-drop | 拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) |        |

`el-tree`标签添加属性 `draggable   :allow-drop="allowDrop"`

添加数据字段`maxLength: 0,` 表示拖拽节点及其子节点在整颗树的最大深度

并添加`allowDrop`方法，判断是否可以拖动

```javascript
/**
 * 判断该节点是否可以拖拽(节点最大深度不能大于3)
 * @param draggingNode  被拖拽的节点
 * @param dropNode      目标节点
 * @param type  放置在目标节点前：'prev'、插入至目标节点：'inner'、 放置在目标节点后：'next'
 * @return
 */
allowDrop(draggingNode, dropNode, type) {
  console.log("拖拽节点:", draggingNode, dropNode, type);
  //最大深度初始化为该该节点的深度,表示没有子节点
  this.maxLength = draggingNode.data.catLevel;
  this.countNodeLevel(draggingNode.data);
  console.log("拖拽节点后的menu:", this.menu);
  console.log(this.maxLength);
  return true;
},
```

 **这里的整棵树是指：被拖动节点和目标节点 及其子节点 和 其所有父节点 组成的树**

编写拖动的节点及其子节点在整颗大树下的最深深度（这里的代码有问题）

```javascript
countNodeLevel(data) {
  var children = data.children;
  if (children != null && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].catLevel > this.maxLength) {
        children[i].catLevel = this.maxLength;
      }
      //递归查找其子树的子树的最大深度
      this.countNodeLevel(children[i]);
    }
  }
},
```



#### 2、测试数据1

##### 1、拖拽前

![image-20220430233700326](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.2.1.1.png)



![image-20220430233559727](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.2.1.2.png)

##### 2、拖拽后

(不用管控制台里的next，跟这个没有影响，只是我选的一组数据不是inner而已)

![image-20220430234003283](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.2.2.1.png)

可以发现catLevel改变了

![image-20220430234200253](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.2.2.2.png)

#### 3、测试数据2

##### 1、拖动前

![image-20220430235635855](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.1.1.png)

![image-20220430235733676](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.1.2.png)

![image-20220430235821830](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.1.3.png)



##### 2、拖动后

(不用管控制台里的next，跟这个没有影响，只是我选的一组数据不是inner而已)

![image-20220501000013931](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.2.1.png)



![image-20220501000137695](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.2.2.png)

![image-20220501000306998](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.2.3.png)

##### 3、menu中的数据

![image-20220501000725560](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.3.1.png)

![image-20220501000839585](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.3.2.png)

![image-20220501000923470](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.3.3.3.png)

可见menu中的数据已经改变了

`被拖拽节点`的子节点的`catLevel`都被改为了`被拖拽节点`的`catLevel`

#### 4、修改`countNodeLevel`方法

```javascript
countNodeLevel(data) {
  var children = data.children;
  if (children != null && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].catLevel > this.maxLength) {
        this.maxLength = children[i].catLevel;
      }
      //递归查找其子树的子树的最大深度
      this.countNodeLevel(children[i]);
    }
  }
},
```

##### 1、测试数据1

改动后，节点信息显示正常，并且打印了正确的节点深度

![image-20220501154304218](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.1.1.png)

![image-20220501154457199](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.1.2.png)

![image-20220501154606221](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.1.3.png)

##### **2、测试数据2**

![image-20220501154951313](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.2.1.png)

还是能显示正确的深度

![image-20220501155115738](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.2.2.png)

##### 3、测试数据3

![image-20220501155748334](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.3.1.png)

![image-20220501160239808](https://gitlab.com/apzs/image/-/raw/master/image/4.1.8.4.3.2.png)

经测试可以看到，最长深度的计算没有问题了

#### 5、修改`allowDrop`方法

 **这里的整棵树是指：被拖动节点和目标节点 及其子节点 和 其所有父节点 组成的树**

```javascript
/**
 * 判断该节点是否可以拖拽(节点最大深度不能大于3)
 * @param draggingNode  被拖拽的节点
 * @param dropNode      目标节点
 * @param type  放置在目标节点前：'prev'、插入至目标节点：'inner'、 放置在目标节点后：'next'
 * @return
 */
allowDrop(draggingNode, dropNode, type) {
  console.log("拖拽节点:", draggingNode, dropNode, type);
  //最大深度初始化为该该节点的深度,表示没有子节点
  this.maxLength = draggingNode.data.catLevel;
  this.countNodeLevel(draggingNode.data);
  console.log("拖拽节点后的menu:", this.menu);
  console.log(this.maxLength);
  //拖拽节点及其子节点组成的树的最大深度
  let deep = this.maxLength - draggingNode.data.catLevel + 1;
  if(type=="inner"){
    //类型为 inner(表示在目标节点的内部)
    //拖拽后整颗树的最大深度=(目标节点的深度 + 拖拽节点及其子节点组成的树的最大深度)
    return (dropNode.data.catLevel + deep) <= 3;
  }else{
      //类型为 prev 或 next (表示在目标节点的上面或下面，与目标节点同级)
      //拖拽后整颗树的最大深度=(目标节点的父节点的深度 + 拖拽节点及其子节点组成的树的最大深度)
    return (dropNode.parent.level + deep) <= 3;
  }
},
```

#### 6、完整代码

[点击查看完整代码](code/4.1.8.6.vue)

### 4.1.9、添加拖拽节点回调函数

| 事件名称  | 说明                     | 回调参数                                                     |
| :-------- | :----------------------- | :----------------------------------------------------------- |
| node-drop | 拖拽成功完成时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event |

#### 1、`el-tree`添加属性

`el-tree`添加`@node-drop="handleDrop"`属性

#### 2、添加回调方法

```javascript
handleDrop(draggingNode, dropNode, dropType, ev) {
  console.log("tree drop: ", dropNode.label, dropType);
},
```

#### 3、查看回调参数的数据

数据和拖动节点的数据差不多

![image-20220501233323689](https://gitlab.com/apzs/image/-/raw/master/image/4.1.9.3.png)

#### 4、编写拖拽成功后触发的事件

```javascript
/**
 * 拖拽成功后的回调函数，用来更新节点的信息
 * @param draggingNode  被拖拽节点对应的 Node (draggingNode里的数据不会更新)
 * @param dropNode      结束拖拽时最后进入的节点 
 * (dropNode里面的childNodes,parent等会动态更新(dropNode里面的data为数据库获取到的,不会更新))
 * @param type  被拖拽节点的放置位置（before、after、inner）
 * 放置在目标节点前：'prev'、插入至目标节点：'inner'、 放置在目标节点后：'next'
 * @return
 */
handleDrop(draggingNode, dropNode, dropType, ev) {
  console.log("拖拽成功的回调参数: ", draggingNode, dropNode, dropType);
  //当前节点的父节点id
  let pCid = 0;
  //拖动节点后，被拖动节点的新的父节点的所有子节点数组
  let sliblings = null;

  //1、找到父节点id和父节点的子节点
  if (dropType == "inner") {
    //类型为 inner(表示在目标节点的内部)
    //dropNode.data表示的是数据库获取到的data数据
    pCid = dropNode.data.catId;
    //dropNode里的数据(除了.data)表示的是element-ui动态更新的数据
    //这里的dropNode.childNodes是拖动成功后，已经更新的节点的子节点信息
    //拖拽到内部,则dropNode即为其父节点
    sliblings = dropNode.childNodes;
  } else {
    //类型为 prev 或 next (表示在目标节点的上面或下面，与目标节点同级)
    //拖拽到上面或下面，则 目标节点的父节点即为拖拽节点的父节点
    //如果托拖拽到一级菜单(level=1)dropNode.parent.data装的是一级菜单集合(和dropNode.parent.childNodes数据一样),获取到的catId为undefined
    //如果为undefined赋值为0
    pCid = dropNode.parent.data.catId || 0;
    //这里的dropNode.parent为element-ui提供的，是拖拽后的更新过的数据(draggingNode里的数据不会跟新)
    //拖拽到上面或下面，则 目标节点的父节点子节点即为被拖动节点的新的父节点的所有子节点
    sliblings = dropNode.parent.childNodes;
  }

  //2、将子节点更新的数据放到updateNodes中
  this.updateNodes = [];
  for (let i = 0; i < sliblings.length; i++) {
    //如果是正在托拽的节点，需要更新其父id
    if (sliblings[i].data.catId == draggingNode.data.catId) {
      let catLevel = draggingNode.data.catLevel;
      //当前节点的层级发生变化就更新子节点层级
      if (sliblings[i].level != draggingNode.data.catLevel) {
        //其实这个catLevel始终都是等于sliblings[i].level,即更新后的level
        catLevel = sliblings[i].level;
        //更新子节点层级
        this.updateChildNodeLevel(sliblings[i]);
      }
      this.updateNodes.push({catId: sliblings[i].data.catId,sort: i,parentCid: pCid,catLevel: catLevel,
      });
    } else {
      this.updateNodes.push({ catId: sliblings[i].data.catId, sort: i });
    }
  }

  //3、把数据发送给后端
  console.log("拖拽节点成功后，发送给后端的数据:", this.updateNodes);
},
//拖动节点后，更新其子节点的层级
updateChildNodeLevel(node) {
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      let catId = node.childNodes[i].data.catId;
      let catLevel = node.childNodes[i].level;
      this.updateNodes.push({ catId: catId, catLevel: catLevel });
      //递归更新子节点层级
      this.updateChildNodeLevel(node.childNodes[i]);
    }
  }
},
```

#### 5、后端添加批量修改功能

```java
/**
 * 修改节点的树形结构
 */
@RequestMapping("/update/sort")
public R updateSort(@RequestBody CategoryEntity[] category){
    categoryService.updateBatchById(Arrays.asList(category));

    return R.ok();
}
```

#### 6、`handleDrop`方法里添加代码

在第3步那里添加向后端发送请求的代码

```javascript
this.$http({
  url: this.$http.adornUrl("/product/category/update/sort"),
  method: "post",
  data: this.$http.adornData(this.updateNodes, false),
}).then(({ data }) => {
  this.$message({
    type: "success",
    message: `菜单结构修改成功`,
  });
  //重新获取数据
  this.getMenus();
  //默认展开的菜单节点
  this.expandedKey = [pCid];
  this.updateNodes = [];
});
```

#### 7、测试是否成功修改

修改代码结构后，刷新页面，发现树的结构已正确显示

![image-20220502154324423](https://gitlab.com/apzs/image/-/raw/master/image/4.1.9.7.1.png)

![image-20220502154013655](https://gitlab.com/apzs/image/-/raw/master/image/4.1.9.7.2.png)

### 4.1.10、多次拖拽后一次提交

多次拖拽后一次提交有可能出现其他的用户修改后，当前用户没有及时更新，当前用户覆盖了其他用户数据，但当前用户并不知情

(不能像修改节点信息那样,点击`edit`向后端发送请求，获取最新数据)

| 参数      | 说明                 | 类型    | 默认值 |
| :-------- | :------------------- | :------ | :----- |
| draggable | 是否开启拖拽节点功能 | boolean | false  |

#### 1、添加开关

参考**element-ui**的**Switch开关**里的**文字描述**：[组件 | Element](https://element.eleme.io/#/zh-CN/component/switch)

```html
<el-switch v-model="draggable" active-text="开启拖拽" inactive-text="关闭拖拽">
```

#### 2、修改`el-tree`的`draggable`属性

动态绑定`draggable`的值来确定是否可以拖拽

```properties
:draggable="draggable"
```

#### 3、添加数据字段

默认设置为不可拖拽

```properties
//是否可以拖拽
draggable: false,
```

#### 4、添加批量保存按钮

```html
<el-button v-if="draggable" @click="batchSave">批量保存</el-button>
```

#### 5、添加`batchSave`方法

删除`handleDrop`方法里向后端发送请求的代码，把向后端发送请求的代码写到`batchSave`里

由于`batchSave`里面没有`pCid`，因此需要在`data`里添加`pCid : 0,`

在`handleDrop`方法里，计算完`pCid`把它赋给`this.pCid`

```javascript
batchSave() {
  this.$http({
    url: this.$http.adornUrl("/product/category/update/sort"),
    method: "post",
    data: this.$http.adornData(this.updateNodes, false),
  }).then(({ data }) => {
    this.$message({
      type: "success",
      message: `菜单结构修改成功`,
    });
    //重新获取数据
    this.getMenus();
    //默认展开的菜单节点
    this.expandedKey = [this.pCid];
    this.updateNodes = [];
    //重新赋给pCid默认值
    //这一步可以可以省略，但前端使用变量后重新赋初值是一个良好的习惯
    this.pCid = 0;
  });
},
```

#### 6、使用动态更新的层级

由于加入了**批量提交**功能，当节点拖拽多次后才提交给后端

因此如果获取`data`里的**节点的层级**和**节点的父节点id**会导致获取到了没有更新的错误数据

(而以前获取`data`里的数据后立即向后端发送请求，重新获取新的已经更新过的数据，因此不会发生错误)

~~(其实不更新**节点的层级**也可以，因为错误的**节点层级**只用来计算拖动节点的局部树的深度，`push`的都是动态更新的层级,~~

~~而且恰巧被拖动节点的局部树都是使用未跟新的层级，因此计算的深度也是正确的结果,由于这些节点的层级并不用来做其他用途，~~

~~其实使用旧的层级来确定是否允许拖动并没有问题,但`return dropNode.parent.level + deep <= 3;`必须使用动态更新的层级，~~

~~因为假设一个节点的层级由2变为了1，其可以在里面再放2层，如果使用未更新的层级则会显示不可以放，但其实是可以的，~~

~~`return dropNode.data.catLevel + deep <= 3;`不用改，因为目标节点的层级并不会改变,只有被拖拽节点及其子节点层级会改变~~

~~总结：被拖动节点的局部树的层级并不影响其深度，可以不用修改，当拖拽到`prev`或`next`后，目标节点的层级并不会改变不用修改，但`return dropNode.parent.level + deep <= 3;`必须使用动态更新的层级)~~

(可以使用不动态更新的层级是建立在被拖动节点其子节点的结构(主要是深度)没有改变的情况下，类型为`prev`、`next`其父节点有可能是已经被拖拽的节点、类型为`inner`目标节点也有可能为已经被拖拽过的节点。其层级可能已经改变，因此也必须使用动态更新的数据，被拖动节点的子节点也需要使用动态更新的子节点，层级也需要使用动态更新的层级)

例子:

1. 一个节点的层级由2变为了1，其可以在里面再放2层，如果使用未更新的层级则会显示不可以放，但其实是可以的
2. 一个节点的层级由3变为了2，其可以在里面再放1层，如果使用未更新的层级则会显示不可以放，但其实是可以的
3. 一个节点的层级由2变为了1，把一个深度为2的节点放到这个节点的子节点的`prev`或`next`，如果使用未更新的层级则会显示不可以放，但其实是可以的

所以应使用`element-ui`提供的动态更新的**层级**和**父节点id**

(以前的代码使用的就是`element-ui`提供的动态更新的父节点id，因此不用修改了)

修改`allowDrop`方法里的代码，使用被拖拽节点的`element-ui`提供的动态更新的层级



被拖拽节点如果被再次拖拽`draggingNode.level`和 `draggingNode.data.catLevel`有可能会不一样

把这段代码

```javascript
this.maxLength = draggingNode.data.catLevel;
```

修改改为

```javascript
this.maxLength = draggingNode.level;
```

把这段代码

```javascript
let deep = this.maxLength - draggingNode.data.catLevel + 1;
```

修改改为

```js
let deep = this.maxLength - draggingNode.level + 1;
```

~~`allowDrop`方法里的这一行不用修改，因为目标节点的层级并不会改变,只有被拖拽节点及其子节点层级会改变~~

把这段代码

```js
return dropNode.data.catLevel + deep <= 3;
```

~~可以~~必须修改为~~(也可以不修改)~~

```javascript
return dropNode.level + deep <= 3;
```

子节点也使用动态更新的层级，参数不传被拖拽节点的`data`字段,而传被拖拽节点本身

动态获取其子节点和子节点的层级

把这段代码

```javascript
this.countNodeLevel(draggingNode.data);
```

修改该为

```javascript
this.countNodeLevel(draggingNode);
```

把这段代码

```javascript
countNodeLevel(data) {
  var children = data.children;
  if (children != null && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].catLevel > this.maxLength) {
        this.maxLength = children[i].catLevel;
      }
      //递归查找其子树的子树的最大深度
      this.countNodeLevel(children[i]);
    }
  }
},
```

修改该为

```javascript
countNodeLevel(node) {
  var children = node.childNodes;
  if (children != null && children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].level > this.maxLength) {
        this.maxLength = children[i].level;
      }
      //递归查找其子树的子树的最大深度
      this.countNodeLevel(children[i]);
    }
  }
},
```

#### 7、测试

开拖拽后，连续拖拽以下两次，发现允许拖拽，证明代码没问题

初始结构

![image-20220502172234731](https://gitlab.com/apzs/image/-/raw/master/image/4.1.10.7.1.png)

把`2.1`拖拽到一级菜单

![image-20220502182545906](https://gitlab.com/apzs/image/-/raw/master/image/4.1.10.7.2.png)

把`3.1`拖拽到`2.1`下，发现是可以的，如果没有使用动态更新的数据，会显示不可以拖拽

![image-20220502192350288](https://gitlab.com/apzs/image/-/raw/master/image/4.1.10.7.3.png)

#### 8、完整代码

##### 1、不使用动态更新的层级之前的错误代码

[点击查看完整代码](code/4.1.10.8.1.vue)

##### 2、使用动态更新的层级之后的正确的代码

[点击查看完整代码](code/4.1.10.8.2.vue)

### 4.1.11、优化体验

#### 1、提交后展开多个节点

拖拽节点并批量保存成功后展开的节点只有一个，即展开的是最后一次拖拽的父节点

因此可以将`pCid: 0,`改为`pCid: [],`

`this.pCid = pCid;`改为`this.pCid.push(pCid);`

`this.pCid = 0;`改为`this.pCid = [];`

这样每拖拽节点成功后，都能保存其父节点id，批量保存后可以显示所有拖拽节点成功的节点的父节点id

(但没拖拽成功但展开的节点在批量保存后不能再次展开)

#### 2、以前展开的节点，提交后依然展开

| 事件名称      | 说明                   | 回调参数                                                     |
| :------------ | :--------------------- | :----------------------------------------------------------- |
| node-expand   | 节点被展开时触发的事件 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |
| node-collapse | 节点被关闭时触发的事件 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身 |

`el-tree`添加属性

```html
@node-expand="nodeExpand"
@node-collapse="nodeCollapse"
```

添加方法:(现在 `this.pCid`表示的是提交拖拽结果时需要展开的节点)

```javascript
//节点被展开时触发的事件
nodeExpand(data, node, ele) {
  console.log("节点被展开时触发的事件:",data, node, ele);
  this.pCid.push(data.catId)
},
//节点被关闭时触发的事件
nodeCollapse(data, node, ele) {
  console.log("节点被关闭时触发的事件",data, node, ele);
    this.pCid.pop(data.catId)
},
```

同理，可以使编辑、修改、添加，只要是重新获取数据(调用`this.getMenus();`)导致展开的节点被折叠的都可以做相似的操作



也可以另辟蹊径：当展开节点时就把它加入到默认展开的节点的 key 的数组，当折叠节点时就把它从默认展开的节点的 key 的数组里删除

这样重新获取数据后，以前展开的节点都会被展开

##### 1、使用该方法前

[点击查看使用该方法前的代码](code/4.1.11.2.1.vue)

##### 2、使用该方法后

[点击查看使用该方法后的代码](code/4.1.11.2.2.vue)

##### 3、后端报错

当开启拖拽节点后，不拖拽节点，直接批量保存后页面没反应

打开控制台报500的错误，证明是后端的错误

![image-20220502230717102](https://gitlab.com/apzs/image/-/raw/master/image/4.1.11.2.3.1.png)

打开后端发现，实体列表不能为空

![image-20220502230934587](https://gitlab.com/apzs/image/-/raw/master/image/4.1.11.2.3.2.png)

后端加个判断就行了

```java
/**
 * 修改节点的树形结构
 */
@RequestMapping("/update/sort")
public R updateSort(@RequestBody CategoryEntity[] category){
    if (category!=null && category.length>0) {
        categoryService.updateBatchById(Arrays.asList(category));
    }
    return R.ok();
}
```

![image-20220502231359263](https://gitlab.com/apzs/image/-/raw/master/image/4.1.11.2.3.3.png)

重启项目后，再次不拖拽节点，直接批量保存不报错了

![image-20220502231603498](https://gitlab.com/apzs/image/-/raw/master/image/4.1.11.2.3.4.png)

#### 3、开启拖拽功能后，不能添加、修改、删除节点

在`append`、`remove`、`edit`方法开头都加上如下类似代码(只需修改一下`message`)

```javascript
if(this.draggable){
  this.$message({
    type: 'warning',
    message: '开启拖拽后不可以删除菜单'
  });
  return;
}
```

#### 4、批量提交后关闭拖拽功能

在`batchSave`最后添加如下代码

```javascript
//关闭拖拽功能
 this.draggable = false;
```

#### 5、完整代码

[点击查看完整代码](code/4.1.11.5.vue)

### 4.1.12、批量删除

#### 1、添加按钮

 参考**element-ui**的**Button按钮**里的**基本用法**中的**危险按钮**：[组件 | Element](https://element.eleme.io/#/zh-CN/component/button)

在批量保存右边添加批量删除按钮(代码写在批量保存下面，el-tree上面)

```html
<el-button type="danger" @click="batchDelete">批量删除</el-button>
```

#### 2、添加`el-tree`属性

在`el-tree`标签里添加`ref="menuTree"`属性，标记这个组件的名字

```
ref="menuTree"
```

#### 3、添加批量删除方法

| 方法名          | 说明                                                         | 参数                                                         |
| :-------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组 | (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 `false` 2. 是否包含半选节点，默认值为 `false` |
| getCheckedKeys  | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点的 keys，默认值为 `false` |

`this.$refs`会获取当前vue文件所有组件

`this.$refs.menuTree`获取当前vue文件所有标签中`ref`属性为`menuTree`或`components{}`里面为`menuTree`的组件

然后再调用该组件的方法

```javascript
//批量删除
batchDelete() {
  let catIds = this.$refs.menuTree.getCheckedKeys();
  console.log("批量删除的id：", JSON.parse(JSON.stringify(catIds)));
  let names = this.$refs.menuTree
    .getCheckedNodes()
    .map((node) => node.name);
  console.log("批量删除的名字:", JSON.parse(JSON.stringify(names)));
  this.$confirm(`是否删除【${names}】这些菜单`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      this.$http({
        url: this.$http.adornUrl("/product/category/delete"),
        method: "post",
        data: this.$http.adornData(catIds, false),
      }).then(({ datas }) => {
        this.$message({
          type: "success",
          message: `批量删除成功`,
        });
        //重新发送请求,更新数据
        this.getMenus();
      });
    })
    .catch(() => {
      this.$message({
        type: "info",
        message: "已取消批量删除",
      });
    });
},
```

3种方式可以获取到选中节点的id

```javascript
let catIds = this.$refs.menuTree.getCheckedKeys();
```

```javascript
let catIds = this.$refs.menuTree.getCheckedNodes().map(node=>node.catId);
```

```javascript
let catIds = [];
this.$refs.menuTree.getCheckedNodes().forEach(node => { catIds.push(node.catId)});
```

#### 4、体验优化

当没有选中节点的时候，不出现**批量删除**按钮

##### 1、添加数据字段

在`data`里添加字段，用于判断是否显示**批量删除**按钮

```
 canBatchDeletion: false,
```

##### 2、添加`v-if`属性

```html
<el-button v-if="canBatchDeletion" type="danger" @click="batchDelete">批量删除</el-button>
```

##### 3、添加事件

| 事件名称     | 说明                         | 回调参数                                                     |
| :----------- | :--------------------------- | :----------------------------------------------------------- |
| check-change | 节点选中状态发生变化时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 |

`el-tree`标签内添加属性

```properties
@check-change="nodeCheckChange"
```

##### 4、编写方法

```javascript
nodeCheckChange(data, checked, indeterminate){
  let catIds = this.$refs.menuTree.getCheckedKeys();
  console.log(catIds)
  //如果catIds长度为0就不显示批量删除按钮
  this.canBatchDeletion = !(catIds.length==0);
}
```

##### 5、发现页面有抖动现象

![4.1.7.6.4.5](https://gitlab.com/apzs/image/-/raw/master/image/4.1.12.4.5.1.gif)

把这一行加个div设个高度就可以解决

```html
<div style="height: 50px; line-height: 50px">
  <el-switch
    v-model="draggable"
    active-text="开启拖拽"
    inactive-text="关闭拖拽"
  >
  </el-switch>
  <!-- draggable为true时，开启了拖拽功能，批量保存才显示 -->
  <el-button v-if="draggable" @click="batchSave">批量保存</el-button>
  <el-button v-if="canBatchDeletion" type="danger" @click="batchDelete">批量删除</el-button>
</div>
```

![4.1.7.6.4.5.2](https://gitlab.com/apzs/image/-/raw/master/image/4.1.12.4.5.2.gif)

##### 6、点击批量删除后，隐藏该按钮

在`batchDelete`方法里面 重新发送请求,更新数据`this.getMenus();`的这行下面添加这行代码

```
//不显示批量删除按钮
this.canBatchDeletion = false;
```

##### 7、完整代码

[点击查看完整代码](code/4.1.12.4.7.vue)

## 4.2、商品服务-API-品牌管理

### 4.2.1、添加品牌管理前端页面

#### 1、复制`brand.vue`文件

复制以前逆向生成的`gulimall-product`项目的`brand.vue`文件(在`\main\resources\src\views\modules\product`文件夹下)

:pushpin:如果已经删除了可以查看`1.10.10`节的笔记，重新逆向生成`gulimall-product`项目

![image-20220503114854616](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.1.png)

#### 2、复制到`product`文件夹下

复制到前端项目的`renren-fast-vue\src\views\modules\product`文件夹下

![image-20220503115203222](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.2.1.png)

##### :pushpin:快速打开`product`文件夹

选中`product`-->右键-->在文件资源管理器中显示 

![image-20220503120339993](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.2.2.png)

#### 3、删除`[0-不显示；1-显示]`

![image-20220503120956488](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.3.png)

#### 4、报了个错

This relative module was not found: 未找到此相关模块

![image-20220503163746900](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.4.1.png)

就是找不到`brand-add-or-update`，把`brand-add-or-update.vue`文件也复制进去就行了

![image-20220503170253394](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.4.2.png)

#### 5、添加品牌管理路由

![image-20220503165715370](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.5.png)

#### 6、已成功显示

![image-20220503170705172](https://gitlab.com/apzs/image/-/raw/master/image/4.2.1.6.png)

### 4.2.2、为显示状态所在的列添加按钮

#### 1、添加按钮

参考**element-ui**的**Table表格**里**的自定义列模板**:[组件 | Element](https://element.eleme.io/#/zh-CN/component/table)

> 通过 `Scoped slot` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据

```vue
<template slot-scope="scope">
	<i class="el-icon-time"></i>
	<span style="margin-left: 10px">{{ scope.row.date }}</span>
</template>
```

参考**element-ui**的**Switch开关**里的**基本用法**：[组件 | Element](https://element.eleme.io/#/zh-CN/component/switch)

```html
<el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
```

因此在`label`为显示状态的列里面，添加如下模板

`scope.row`获取当前行数据，`scope.row.showStatus`获取当前行数据中键为`showStatus`的值

```vue
<template slot-scope="scope">
  <el-switch
    v-model="scope.row.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
  ></el-switch>
</template>
```

![image-20220503173256805](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.1.1.png)

效果就出来了

![image-20220503173852450](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.1.2.png)

#### 2、`新建`和`批量删除`按钮不显示

由于使用了`v-if`当`isAuth('product:brand:save')`为`true`（没有权限）时，就不显示按钮

![image-20220503175051236](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.2.1.png)

把`src\utils\index.js`的`isAuth`方法的这一行删掉

![image-20220503174636295](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.2.2.png)

直接返回`true`就行了

![image-20220503174745909](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.2.3.png)

可以看到按钮已经显示了

![image-20220503174810653](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.2.4.png)

#### 3、修改对话框

点击新建按钮的弹出框写在`brand-add-or-update.vue`文件里，在这里引入的

![image-20220503175515419](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.3.1.png)

删掉这些，还是使用按钮的方式

![image-20220503175845685](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.3.2.png)

`v-model`绑定的数据还是和删除掉的`el-input`标签双向绑定的数据一样，是`dataForm.showStatus`不变

```vue
<template slot-scope="scope">
  <el-switch
    v-model="dataForm.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
  ></el-switch>
</template>
```

![image-20220503180026375](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.3.3.png)

点击`新建`后弹出的`显示状态`已经是按钮了

![image-20220503180641548](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.3.4.png)

#### 4、修改表单宽度

表单的宽度有点窄

![image-20220503180824164](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.4.1.png)

这里改为`140px`

![image-20220503180933818](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.4.2.png)

这样就好看多了

![image-20220503181014800](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.4.3.png)

#### 5、绑定监听事件

| 事件名称 | 说明                            | 回调参数   |
| :------- | :------------------------------ | :--------- |
| change   | switch 状态发生变化时的回调函数 | 新状态的值 |

##### 1、为按钮添加监听事件

```vue
<template slot-scope="scope">
  <el-switch
    v-model="scope.row.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
    @change="updateBrandStatus"
  ></el-switch>
</template>
```

![image-20220504155713996](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.1.png)

##### 2、编写回调方法

```javascript
//显示状态按钮的回调函数
updateBrandStatus(status){
    console.log("显示状态:"+status);
},
```

##### 3、只显示`true`或`false`

只显示`true`或`false`，并不能确定是哪个按钮的事件

![image-20220504160833252](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.3.png)

##### 4、修改调用方法的参数

```vue
<template slot-scope="scope">
  <el-switch
    v-model="scope.row.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
    @change="updateBrandStatus(scope.row)"
  ></el-switch>
</template>
```

##### 5、修改回调方法

```javascript
//显示状态按钮的回调函数
updateBrandStatus(data){
    console.log("显示状态:",data);
}
```

可以看到，已经可以获取显示状态对应按钮那一行的信息和按钮状态了

![image-20220504162444824](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.5.png)

##### 6、测试后端接口

点击`BrandController`类`update`方法左侧的小图标，进入IDEA自带的`HTTP Client`调试工具进行测试

```
###
POST http://localhost:10000/product/brand/update
Content-Type: application/json

{"brandId": 1,"logo": "xxx"}
```

![image-20220504163757244](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.6.1.png)

可以看到`logo`列已更新

![image-20220504164033831](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.6.2.png)

7、修改`updateBrandStatus`方法

```javascript
//显示状态按钮的回调函数
updateBrandStatus(data){
    console.log("显示状态:",data);
    let {brandId,showStatus} = data;
    this.$http({
    url: this.$http.adornUrl('/product/brand/update'),
    method: 'post',
    data: this.$http.adornData({brandId,showStatus}, false)
    }).then(({ data }) => {
      this.$message({
        type: "success",
        message: "状态更新成功"
      })
      });
}
```

##### 8、控制台报错

![image-20220504165445351](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.8.1.png)

查看请求体的内容

![image-20220504165604410](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.8.2.png)

后端也报了警告

```
2022-05-04 16:55:41.980  WARN 18564 --- [io-10000-exec-2] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot deserialize instance of `java.lang.Integer` out of VALUE_TRUE token; nested exception is com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot deserialize instance of `java.lang.Integer` out of VALUE_TRUE token
 at [Source: (PushbackInputStream); line: 1, column: 27] (through reference chain: com.atguigu.gulimall.product.entity.BrandEntity["showStatus"])]
```

不能把`showStatus`的值转为`java.lang.Integer`类型

![image-20220504165704201](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.8.3.png)

数据库是使用`1`或`0`来表示**显示**与**不显示**，而不是`true`或`false`

![image-20220504170055609](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.8.4.png)

##### 9、修改`showStatus`值的类型

方法一：

| 参数          | 说明              | 类型                      | 默认值 |
| :------------ | :---------------- | :------------------------ | :----- |
| active-value  | switch 打开时的值 | boolean / string / number | true   |
| nactive-value | switch 关闭时的值 | boolean / string / number | false  |

指定switch 打开或关闭的值

```vue
<template slot-scope="scope">
  <el-switch
    v-model="scope.row.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
    @change="updateBrandStatus(scope.row)"
    :active-value="1"
    :inactive-value="0"
  ></el-switch>
</template>
```

~~方法二：~~

三元运算符判断（**这种方法不行**）

```javascript
//显示状态按钮的回调函数
updateBrandStatus(data){
    console.log("显示状态:",data);
    let {brandId,showStatus} = data;
    this.$http({
    url: this.$http.adornUrl('/product/brand/update'),
    method: 'post',
    data: this.$http.adornData({brandId,showStatus:showStatus?1:0}, false)
    }).then(({ data }) => {
      this.$message({
        type: "success",
        message: "状态更新成功"
      })
      });
}
```

这种方法不可以初始化正确的开关状态(默认使用`true`或`false`来表示开关状态，由于这种方法返回`1`或`0`，所以只能默认显示关闭状态)

###### 1、先让显示状态开关打开

![image-20220504182321591](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.9.1.png)

###### 2、当刷新页面后，显示状态还是关闭

![image-20220504182757184](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.9.2.png)

###### 3、但数据库其实已更新为1了

![image-20220504183048856](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.9.3.png)

##### 10、查看效果

使用方法一刷新页面后，显示状态依然可以正确展示，但方法二不行

![image-20220504171102995](https://gitlab.com/apzs/image/-/raw/master/image/4.2.2.5.10.png)

同理修改`brand-add-or-update.vue`文件里`el-switch`标签里的这两个属性

```vue
<template slot-scope="scope">
  <el-switch
    v-model="dataForm.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
    :active-value="1"
    :inactive-value="0"
  ></el-switch>
</template>
```

### 4.2.3、对象存储OOS

对象存储服务（Object Storage Service，OSS）是一种海量、安全、低成本、高可靠的云存储 服务，适合存放任意类型的文件。容量和处理能力弹性扩展，多种存储类型供选择，全面优化存储成本。

常用的文件存储方式：

![image-20220504231711548](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.0.1.png)

本项目采用阿里云对象存储服务

阿里云对象存储-普通上传方式

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.0.2.png" alt="image-20220721202146252" style="zoom:50%;" />

阿里云对象存储-服务端签名后直传

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.0.3.png" alt="image-20220721202225102" style="zoom: 50%;" />

#### 1、实名认证

##### 1、登陆后，点击控制台

![image-20220504212358467](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.1.1.png)

##### 2、点击实名认证按钮

鼠标经过小人头像，在弹出的框中点击的实名认证，按步骤操作即可

![image-20220504212450484](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.1.2.png)

#### 2、开启OSS对象存储服务

##### 1、点击左上角的三条横杠

![image-20220504212845267](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.2.1.png)

##### 2、点击对象存储OSS

![image-20220504212952128](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.2.2.png)

##### 3、点击立即开通

![image-20220504213041621](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.2.3.png)

##### 4、勾选协议，然后点击立即开通

![image-20220504213212922](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.2.4.png)

##### 5、点击管理控制台

![image-20220504213312344](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.2.5.png)

##### 6、查看帮助文档

![image-20220504223019548](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.2.6.png)

#### 3、创建Bucket

参考链接：https://help.aliyun.com/document_detail/31947.html

| 中文      | 英文      | 说明                                                         |
| :-------- | :-------- | :----------------------------------------------------------- |
| 存储空间  | Bucket    | 存储空间是您用于存储对象（Object）的容器，所有的对象都必须隶属于某个存储空间。 |
| 对象/文件 | Object    | 对象是 OSS 存储数据的基本单元，也被称为OSS的文件。对象由元信息（Object Meta）、用户数据（Data）和文件名（Key）组成。对象由存储空间内部唯一的Key来标识。 |
| 地域      | Region    | 地域表示 OSS 的数据中心所在物理位置。您可以根据费用、请求来源等综合选择数据存储的地域。详情请查看[OSS已经开通的Region](https://help.aliyun.com/document_detail/31837.htm#concept-zt4-cvy-5db)。 |
| 访问域名  | Endpoint  | Endpoint 表示OSS对外服务的访问域名。OSS以HTTP RESTful API的形式对外提供服务，当访问不同地域的时候，需要不同的域名。通过内网和外网访问同一个地域所需要的域名也是不同的。具体的内容请参见[各个Region对应的Endpoint](https://help.aliyun.com/document_detail/31837.htm#concept-zt4-cvy-5db)。 |
| 访问密钥  | AccessKey | AccessKey，简称 AK，指的是访问身份验证中用到的AccessKeyId 和AccessKeySecret。OSS通过使用AccessKeyId 和AccessKeySecret对称加密的方法来验证某个请求的发送者身份。AccessKeyId用于标识用户，AccessKeySecret是用户用于加密签名字符串和OSS用来验证签名字符串的密钥，其中AccessKeySecret 必须保密。 |

![image-20220504223548831](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.3.1.png)

##### 1、点击创建Bucket

![image-20220504223758657](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.3.1.png)

##### 2、创建Bucket

随便输个Bucket名称

![image-20220504225120652](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.3.2.1.png)

:rocket:读写权限的对话框中要选择"继续修改"

![image-20220504225234319](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.3.2.2.png)

##### 3、点击上传文件

![image-20220504225642860](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.3.3.png)

#### 4、使用Java代码上传

##### 1、上传策略

用户先向应用服务器获取上传策略，应用服务器根据服务器内部存储的阿里云的账号和密码生成一个防伪签名，防伪签名包括**授权令牌**、阿里云哪个**地址**、哪个**位值**等信息，前端带着防伪签名和要上传的文件交给阿里云，阿里云可以验证这些签名是否正确。

![image-20220504230801395](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.0.png)

##### 2、查看文档

参考文档：https://help.aliyun.com/document_detail/195870.html

![image-20220504232317468](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.2.1.png)

![image-20220504232339802](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.2.2.png)

##### 3、操作步骤

参考文档：https://help.aliyun.com/document_detail/32006.html

###### 1、添加依赖

在`gulimall-product`模块内添加阿里云的oss依赖

```
<dependency>
    <groupId>com.aliyun.oss</groupId>
    <artifactId>aliyun-sdk-oss</artifactId>
    <version>3.5.0</version>
</dependency>
```

![image-20220504233153801](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.1.png)

###### 2、添加测试方法

```java
/**
 * 对象存储OSS测试
 * @throws FileNotFoundException
 */
@Test
public void testUpload() throws FileNotFoundException {
   // Endpoint以杭州为例，其它Region请按实际情况填写。
   String endpoint = "oss-cn-beijing.aliyuncs.com";
   // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用RAM子账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建。
   String accessKeyId = "LTAl4FwfjSycd1APnuG9bjj";
   String accessKeySecret = "O6xaxyiWfSlitcOkSuK27ju4hXT5HI";

   // 创建OSSClient实例。
   OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

   // 上传文件流。
   InputStream inputStream = new FileInputStream("C:\\1.png");

   ossClient.putObject("gulimall-hello", "1.png", inputStream);

   // 关闭OSSClient。
   ossClient.shutdown();
   System.out.println("上传成功。。。");
}
```

###### 3、修改`endpoint`

点击概览，查看`Endpoint`

![image-20220504235015158](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.3.png)

###### 4、添加AccessKey

1、点击**AccessKey管理**

![image-20220504235453599](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.1.png)

2、点击**开始使用子用户AccessKey**

![image-20220504235549106](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.2.png)

3、点击**创建用户**

![image-20220504235623910](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.3.png)

4、创建用户

![image-20220505000109142](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.4.png)

5、复制**AccessKey ID** 和 **AccessKey Secret**

**AccessKey ID** 和 **AccessKey Secret**只会出现一次，关掉这个页面就再也看不到了，因此测试成功之前不要关闭该页面

![image-20220505001844577](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.5.0.png)

6、为这个AccessKey添加权限

![image-20220505000806248](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.5.png)

7、选择**管理对象存储服务(OSS)权限**

![image-20220505001118061](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.6.png)

8、点击确定

![image-20220505001200826](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.4.7.png)

9、粘贴**AccessKey ID** 和 **AccessKey Secret**

把**AccessKey ID** 和 **AccessKey Secret**粘贴到`accessKeyId`和`accessKeySecret`

###### 5、修改**inputStream**里面的文件的位置

点击文件-->右键-->属性-->安全-->复制对象名称

把复制的文件路径粘贴到`FileInputStream`里面

![image-20220505161036130](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.5.png)

###### 6、修改`putObject`方法的参数

```java
ossClient.putObject("gulimall-clouds", "1.png", inputStream);
```

第一个参数为创建Bucket时的名称

第二个为上传的文件起一个文件名，可以通过**阿里云提供的域名+该文件名**访问这个图片

第三个不用改，为刚才图片的IO流

![image-20220505161839620](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.6.png)

###### 7、测试

可以看到，测试已经通过

![image-20220505162104781](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.7.1.png)

阿里云上已经看到图片了

复制这个URL即可直接访问

![image-20220505162407468](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.4.3.7.2.png)

#### 5、OSS整合Spring Boot

参考文档：[aliyun-spring-boot/README-zh.md at master · alibaba/aliyun-spring-boot (github.com)](https://github.com/alibaba/aliyun-spring-boot/blob/master/aliyun-spring-boot-samples/aliyun-oss-spring-boot-sample/README-zh.md)

(**先删掉刚才`gulimall-product`模块的`aliyun-sdk-oss`依赖和测试方法**)

##### 1、修改 pom.xml 文件

修改`gulimall-common`模块 pom.xml 文件，引入 aliyun-oss-spring-boot-starter

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alicloud-oss</artifactId>
</dependency>
```

![image-20220505165703522](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.5.1.1.png)

最新的参考文档`artifactId`已经改了

使用最新版的会报`Cannot resolve com.alibaba.cloud:aliyun-oss-spring-boot-starter:unknown`这个错误

![image-20220505165730515](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.5.1.2.png)

##### 2、在配置文件中配置OSS

在`gulimall-product`模块中的配置文件中配置OSS

使用自己的`access-key`和`secret-key`，配置自己地域的`endpoint`

```yaml
spring:
  cloud:
    alicloud:
      access-key: LTAl4FwfjSycd1APnuG9bjj
      secret-key: O6xaxyiWfSlitcOkSuK27ju4hXT5HI
      oss:
        endpoint: oss-cn-beijing.aliyuncs.com
```

![image-20220505170749948](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.5.2.png)

##### 3、添加测试方法

```java
@Autowired
OSSClient ossClient;

@Test
public void testUpload2() throws FileNotFoundException {

   // 上传文件流。
   InputStream inputStream = new FileInputStream("C:\\2.png");

   ossClient.putObject("gulimall-anonymous", "2.png", inputStream);

   // 关闭OSSClient。
   ossClient.shutdown();
   System.out.println("上传成功。。。");
}
```

这里的报错不用管，这个是IDEA没有识别出来

使用`@Resource`注解不报红，`@Resource`注解写在字段上按名称注入,`@Autowired`注解写在字段上按类型注入

`putObject`方法的第一个参数要更改成自己的Bucket名

![image-20220505172414935](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.5.3.png)

##### 4、测试

重启`gulimall-common`模块和`gulimall-product`模块，运行测试方法

![image-20220505171924124](https://gitlab.com/apzs/image/-/raw/master/image/4.2.3.5.4.png)

### 4.2.4、新建`gulimall-third-party`模块

(**先删掉刚才`gulimall-common`模块 pom.xml里面的spring-cloud-starter-alicloud-oss依赖、删掉`gulimall-product`模块中在配置文件中配置的OSS、删掉测试方法 **)

#### 1、新建模块

##### 1、新建`gulimall-third-party`模块

```
com.atguigu.gulimall
gulimall-third-party
第三方服务
com.atguigu.gulimall.thirdparty
```

![image-20220505173619537](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.1.png)

##### 2、选择Web下的Spring Web

![image-20220505173727336](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.2.png)

##### 3、选择Spring Cloud Routing里的OpenFeign

右边可以查看选择的依赖

![image-20220505173733736](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.3.png)

##### 4、修改pom文件

为了和老师使用的配置一样，我使用了老师的pom文件(这样可以少很多错误)

[点击查看完整pom文件](code/4.2.4.1.4.pom.xml)

##### 5、2.2.1.RELEASE没有找到

依赖文件: [Central Repository: org/springframework/boot/spring-boot-parent/2.2.1.RELEASE (maven.org)](https://repo1.maven.org/maven2/org/springframework/boot/spring-boot-parent/2.2.1.RELEASE/)

刷新后报错，说`org.springframework.boot:spring-boot-starter-parent:2.2.1.RELEASE`没有发现

```
Project 'org.springframework.boot:spring-boot-starter-parent:2.2.1.RELEASE' not found
Project 'org.springframework.boot:spring-boot-starter-parent:2.2.1.RELEASE' not found
Dependency 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.RC1' not found
Plugin 'org.springframework.boot:spring-boot-maven-plugin:' not found
Plugin 'org.springframework.boot:spring-boot-maven-plugin:' not found
```

![image-20220505204534787](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.5.1.png)

可以看到`2.2.1.RELEASE`和`2.1.8.RELEASE`的目录结构一样，所以应该不是maven的问题，应该是IDEA的问题

![image-20220505212548886](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.5.2.png)

可以点击File-->Invalidate Caches / Restar  删除原来的缓存和索引，等待Idea重新构建缓存和索引

现在`2.2.1.RELEASE`已经不报错了

![image-20220505214331561](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.5.3.png)

`spring-boot-maven-plugin`这里报错

![image-20220505214448720](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.5.4.png)

可以发现其实已经下载了，应该又是IDEA的问题，但我重新Invalidate Caches / Restar 还是报错:disappointed_relieved:

![image-20220505220808846](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.5.5.png)

最后我删掉这个`spring-boot-maven-plugin`插件就好了

![image-20220505221657720](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.5.6.png)

##### 6、修改测试类

由于不同`spring-boot-starter-parent`版本的测试类不一样，所以修改一下测试类

```java
package com.atguigu.gulimall.thirdparty;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GulimallThirdPartyApplicationTests {

   @Test
   void contextLoads() {


   }

}
```

测试成功

![image-20220505222624423](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.6.1.png)

如果测试类ossClent报错，说没定义"**ossClent**"类路径资源

是因为没删`gulimall-common`模块 pom.xml里面的spring-cloud-starter-alicloud-oss依赖，删掉就行了或者先排除掉（后面还是要删的)

```xml
<dependency>
   <groupId>com.atguigu.gulimall</groupId>
   <artifactId>gulimall-common</artifactId>
   <version>0.0.1-SNAPSHOT</version>
   <exclusions>
      <exclusion>
         <groupId>com.alibaba.cloud</groupId>
         <artifactId>spring-cloud-starter-alicloud-oss</artifactId>
      </exclusion>
   </exclusions>
</dependency>
```

![image-20220505223841319](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.1.6.2.png)

同理，如果renren-fast报这个错也可以删掉这个依赖(后面还是要删的)

如果还不行可以使用相同的`spring-boot-starter-parent`版本

还是不行的话，可以先备份项目，删掉备份的`.deal`文件,重新导入备份的看看报不报错(这个操作比较微危险，一定要备份)

#### 2、导入依赖

`gulimall-third-party`模块依赖`gulimall-common`模块，[点击查看完整配置](code/4.2.4.2.pom.xml)

需要排除`mybatis-plus`依赖，该模块不操作数据库，用不到

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

`dependencyManagement`标签里添加依赖

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-alibaba-dependencies</artifactId>
   <version>2.1.0.RELEASE</version>
   <type>pom</type>
   <scope>import</scope>
</dependency>
```

`gulimall-third-party`模块用来处理第三方服务，不用放在`gulimall-common`公共模块里

在`gulimall-third-party`模块添加依赖，删掉`gulimall-common`的这个依赖

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-alicloud-oss</artifactId>
</dependency>
```

#### 3、注册到注册中心

##### 1、新建命名空间

![image-20220505225655873](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.1.png)

##### 2、添加配置

点击“配置管理”下的"配置列表"，点击"third-party"，然后点击**+**

![image-20220505230915820](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.2.1.png)

新建配置

`access-key`和`secret-key`以及`endpoint`和`bucket`输入自己的

`spring.cloud.alicloud.oss.bucket`为自己写的配置，不是官方有的配置

```yaml
spring:
  cloud:
    alicloud:
      access-key: LTAl4FwfjSycd1APnuG9bjj
      secret-key: O6xaxyiWfSlitcOkSuK27ju4hXT5HI
      oss:
        endpoint: oss-cn-beijing.aliyuncs.com
        bucket: gulimall-anonymous
```

![image-20220505231655295](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.2.2.png)

##### 3、配置配置文件

###### 1、复制唯一标识

![image-20220505233148868](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.3.1.png)

###### 2、配置配置中心

新建"bootstrap.properties"文件，添加配置

namespace填刚刚复制的

```yaml
spring.application.name=gulimall-third-party
spring.cloud.nacos.config.server-addr=127.0.0.1:8848
spring.cloud.nacos.config.namespace=dd540e1b-ffd6-43e2-b9af-065130d391ec

#配置多配置文件
#数据集id
spring.cloud.nacos.config.ext-config[0].data-id=oss.yml
#数据分组
spring.cloud.nacos.config.ext-config[0].group=DEFAULT_GROUP
#动态刷新
spring.cloud.nacos.config.ext-config[0].refresh=true
```

![image-20220505233837829](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.3.2.png)

###### 3、配置注册中心

在"application.yml"中添加配置

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
  application:
    name: gulimall-third-party
server:
  port: 30000
```

![image-20220505234015676](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.3.3.png)

##### 4、添加`@EnableDiscoveryClient`注解

`gulimall-third-party`模块的启动类上添加`@EnableDiscoveryClient`注解

![image-20220505232327742](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.4.png)

##### 5、添加测试方法

```yaml
@Autowired
OSSClient ossClient;

@Test
public void testUpload2() throws FileNotFoundException {

   // 上传文件流。
   InputStream inputStream = new FileInputStream("C:\\2.png");

   ossClient.putObject("gulimall-anonymous", "2222.png", inputStream);

   // 关闭OSSClient。
   ossClient.shutdown();
   System.out.println("上传成功。。。");
}
```

##### 6、测试是否能上传

可以看到运行成功了

代码报红不用管，那是IDEA没有检测到，其实可以注入进去的

使用`@Resource`注解不报红，`@Resource`注解写在字段上按名称注入,`@Autowired`注解写在字段上按类型注入

![image-20220505235720081](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.6.1.png)

已经上传成功了

![image-20220506081810670](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.3.6.2.png)

##### 7、修改配置

`access-key`和`secret-key`以及`endpoint`和`bucket`输入自己的

在开发阶段，可以在"application.yml"中修改配置以方便调试，项目完成后，再上传到配置中心

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
    alicloud:
      access-key: LTAl4FwfjSycd1APnuG9bjj
      secret-key: O6xaxyiWfSlitcOkSuK27ju4hXT5HI
      oss:
        endpoint: oss-cn-beijing.aliyuncs.com
        bucket: gulimall-anonymous

  application:
    name: gulimall-third-party

server:
  port: 30000
```

#### 4、编写方法

##### 1、添加接口

在`com.atguigu.gulimall.thirdparty.controller`目录下新建`OssController`类,编写获取密钥的工具方法

```java
package com.atguigu.gulimall.thirdparty.controller;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.common.utils.BinaryUtil;
import com.aliyun.oss.model.MatchMode;
import com.aliyun.oss.model.PolicyConditions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author 无名氏
 * @date 2022/5/6
 * @Description:
 */
@RestController
//@RefreshScope 自动刷新配置(使用最新的配置中心配置)
public class OssController {


    @Value("${spring.cloud.alicloud.oss.endpoint}")
    private String endpoint;

    @Value("${spring.cloud.alicloud.oss.bucket}")
    private String bucket;

    @Value("${spring.cloud.alicloud.access-key}")
    private String accessId;

    //@Autowired(required = false)
    @Resource
    private OSSClient ossClient;


    @RequestMapping("/oss/policy")
    public Map<String, String> policy() {
        //https://gulimall-anonymous.oss-cn-beijing.aliyuncs.com/1.png
        String host = "https://" + bucket + "." + this.endpoint; // host的格式为 bucketname.endpoint
        // callbackUrl为 上传回调服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
//        String callbackUrl = "http://88.88.88.88:8888";
        String format = LocalDate.now().toString();
        String dir = format + "/"; // 用户上传文件时指定的前缀。

        Map<String, String> respMap = null;
        try {
            long expireTime = 30;
            long expireEndTime = System.currentTimeMillis() + expireTime * 1000;
            Date expiration = new Date(expireEndTime);
            PolicyConditions policyConds = new PolicyConditions();
            policyConds.addConditionItem(PolicyConditions.COND_CONTENT_LENGTH_RANGE, 0, 1048576000);
            policyConds.addConditionItem(MatchMode.StartWith, PolicyConditions.COND_KEY, dir);

            String postPolicy = ossClient.generatePostPolicy(expiration, policyConds);
            byte[] binaryData = postPolicy.getBytes("utf-8");
            String encodedPolicy = BinaryUtil.toBase64String(binaryData);
            String postSignature = ossClient.calculatePostSignature(postPolicy);

            respMap = new LinkedHashMap<String, String>();
            respMap.put("accessid", accessId);
            respMap.put("policy", encodedPolicy);
            respMap.put("signature", postSignature);
            respMap.put("dir", dir);
            respMap.put("host", host);
            respMap.put("expire", String.valueOf(expireEndTime / 1000));
            // respMap.put("expire", formatISO8601Date(expiration));
        } catch (Exception e) {
            // Assert.fail(e.getMessage());
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return respMap;
    }
}
```

![image-20220506102103657](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.1.png)

##### 2、浏览器测试接口

浏览器输入 http://localhost:30000/oss/policy

已经正确访问了

![image-20220506102230145](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.2.png)

##### 3、添加配置

在`gulimall-gateway`模块添加配置(一定要写在`admin_route`前面)

```
- id: third_party_route
  uri: lb://gulimall-third-party
  predicates:
    - Path=/api/product/**
  filters:
    #http://localhost:88/api/thirdparty/oss/policy 变为 http://localhost:30000/oss/policy
    - RewritePath=/api/thirdparty/(?<segment>/?.*),/$\{segment}
```

![image-20220506104808034](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.3.png)

##### 4、测试是否可以通过网关访问

###### 1、访问失败了

![image-20220506105012117](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.4.1.png)

###### 2、查看日志

没有这个日志的是因为日志级别没有调成`debug`，调整日志级别就行了

```
logging:
  level:
    root: debug
```

可以发现匹配到`admin_route`

这是因为我`- Path=/api/product/**`这里写错了，应该写成`- Path=/api/thirdparty/**`

因为写错了，所以没匹配的,使用了默认的`admin_route`(所有前面没匹配到的，只要是path是以/api/开头的都会匹配到`admin_route`)

![image-20220506104658815](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.4.2.png)

###### 3、修改配置

```
- id: third_party_route
  uri: lb://gulimall-third-party
  predicates:
    - Path=/api/thirdparty/**
  filters:
    #http://localhost:88/api/thirdparty/oss/policy 变为 http://localhost:30000/oss/policy
    - RewritePath=/api/thirdparty/(?<segment>/?.*),/$\{segment}
```

![image-20220506110148531](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.4.3.png)

###### 4、重新测试

已经访问成功了

![image-20220506110317459](https://gitlab.com/apzs/image/-/raw/master/image/4.2.4.4.4.4.png)

### 4.2.5、编写图片上传前端代码

#### 1、复制文件

复制`1.分布式基础（全栈开发篇）\资料源码.zip\docs\代码\前端`目录下`upload`文件

![image-20220506111426347](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.1.png)

#### 2、修改Bucket域名

##### 1、复制Bucket外网访问域名

![image-20220506201245636](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.2.1.png)

##### 2、粘贴到`singleUpload.vue`

粘贴到`src\components\upload\singleUpload.vue`里的`el-upload`标签，`action`属性里面

注意：前面有"**http://**"

![image-20220506201710959](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.2.2.png)

##### 3、粘贴到`multiUpload.vue`

粘贴到`src\components\upload\multiUpload.vue`里的`el-upload`标签，`action`属性里面

注意：前面有"**http://**"

![image-20220506201943305](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.2.3.png)

##### 附录

###### 1、`multiUpload.vue`文件

[点击查看完整代码](code/4.2.5.2.4.1.multiUpload.vue)

###### 2、`policy.js`文件

```javascript
import http from '@/utils/httpRequest.js'
export function policy() {
   return  new Promise((resolve,reject)=>{
        http({
            url: http.adornUrl("/thirdparty/oss/policy"),
            method: "get",
            params: http.adornParams({})
        }).then(({ data }) => {
            resolve(data);
        })
    });
}
```

###### 3、`singleUpload.vue`文件

[点击查看完整代码](code/4.2.5.2.4.3.singleUpload.vue)

#### 3、使用Upload上传组件

`element-ui`中**Upload 上传**组件：[组件 | Element](https://element.eleme.io/#/zh-CN/component/upload)

上传组件已经封装在刚刚复制到upload里面了

#### 4、上传图片报错

##### 1、查看请求

![image-20220506203350269](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.1.png)

##### 2、查看匹配到的路由

![image-20220506203432683](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.2.png)

##### 3、查看对应路由

发现我`gulimall-third-party`没启动:cold_sweat:

![image-20220506203844785](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.3.png)

##### 4、启动`gulimall-third-party`

![image-20220506204230648](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.4.png)

##### 5、已经上传成功了

![image-20220506204119458](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.5.png)

##### 6、跨域问题

如果还是上传不了，可以看看是不是报**403**或**CROS**

如果是报**403**或**CROS**可以在阿里云OSS里面配置跨域规则

###### 1、点击跨域设置

进入你的Bucket的控制台，点击**"权限管理**"-->"跨域设置"

![image-20220506205320072](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.6.1.png)

###### 2、点击**跨域设置**里的**设置**

![image-20220506205451008](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.6.2.png)

###### 3、创建规则

点击创建规则，输入规则就可以了

![image-20220506211944153](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.4.6.3.png)

#### 5、修改签名方法

##### 1、获取数据的路径

可以看到路径为响应里的`data`字段

![image-20220506210529130](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.1.png)

##### 2、查看请求响应的数据

可以看到响应的数据直接返回了，没有封装在data中

![image-20220506210632683](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.2.png)

##### 3、修改返回类型

修改`com.atguigu.gulimall.thirdparty.controller`下的`OssController`类的`policy`方法返回类型

然后重启项目

![image-20220506211124975](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.3.png)

##### 4、跨域错误

###### 1、查看控制台

发现有跨域错误

![image-20220506211741596](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.4.1.png)

###### 2、点击概要

![image-20220506212310759](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.4.2.png)

###### 3、跨域访问

往下滑，找到跨域访问

![image-20220506212332731](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.4.3.png)

###### 4、创建规则

![image-20220506212515400](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.4.4.png)

###### 5、再次上传

再次上传，图片已经回显出来了

![image-20220506212726224](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.4.5.png)

##### 5、修改路径

###### 1、拼路径的时候多了一条杠

![image-20220506213014421](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.5.1.png)

###### 2、删除"/"

把这个删掉就行了

![image-20220506213238514](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.5.2.png)

###### 3、重新上传

图片已经在日期对应的文件夹下了

![image-20220506213419593](https://gitlab.com/apzs/image/-/raw/master/image/4.2.5.5.5.3.png)

### 4.2.6、前端表单校验

#### 1、修改按钮激活值

```html
<template slot-scope="scope">
  <el-switch
    v-model="dataForm.showStatus"
    active-color="#13ce66"
    inactive-color="#ff4949"
    :active-value="1"
    :inactive-value="0"
  ></el-switch>
</template>
```

![image-20220506214954428](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.1.png)

#### 2、新增商品

![image-20220506215355124](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.2.png)

#### 3、修改品牌logo地址

##### 1、品牌logo地址为文字

![image-20220506215446629](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.1.png)

##### 2、自定义列模板

**Table表格**自定义列模板：[组件 | Element](https://element.eleme.io/#/zh-CN/component/table)

通过 `Scoped slot` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据

```vue
<template slot-scope="scope">
  <i class="el-icon-time"></i>
  <span style="margin-left: 10px">{{ scope.row.date }}</span>
</template>
```

**Image图片**里的基础用法中的contain：[组件 | Element](https://element.eleme.io/#/zh-CN/component/image)

```html
<el-image
  style="width: 100px; height: 100px"
  :src="url"
  :fit="contain"></el-image>
```

因此修改`src\views\modules\product\brand.vue`文件里的`品牌logo地址`列为

```html
<el-table-column
  prop="logo"
  header-align="center"
  align="center"
  label="品牌logo地址"
>
  <template slot-scope="scope">
    <el-image
      style="width: 100px; height: 80px"
      :src="scope.row.logo"
      :fit="contain"
    ></el-image>
  </template>
</el-table-column>
```

##### 3、查看页面

###### 1、图片显示不出来

查看报错可以看到，`<el-image>`组件没有正确注入进来

```
<el-image> - did you register the component correctly：您是否正确注册了<el-image>组件
```

![image-20220506223735304](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.1.png)

###### 2、查看引入的`element-ui`依赖

在`src\main.js`文件中可以看到，`element-ui`引入在`src/element-ui`

`@`符号位自定义的，指向src目录

![image-20220506225556450](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.2.1.png)

在`src\element-ui\index.js`文件中搜索"**Image**",可以看到没有这个组件

![image-20220506225431970](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.2.2.png)

###### 3、添加组件

修改`import`和`Vue.use`里面的内容

`element-ui`组件：[组件 | Element](https://element.eleme.io/#/zh-CN/component/quickstart)

[点击查看默认配置](code/4.2.6.3.3.3.js)

###### 4、没有发现这些依赖

```
These dependencies were not found: 未找到这些依赖项
```

删掉这些依赖就行了

[点击查看`src\element-ui\index.js`完整代码](code/4.2.6.3.3.4.index.js)

![image-20220506223507564](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.3.png)

###### 5、`fit`未定义

```
 Property or method "fit" is not defined on the instance but referenced during render
 属性或方法“fit”未在实例上定义，但在渲染期间引用
```

![image-20220506230513442](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.5.1.png)

实例用的"`:`"为动态绑定，由于`data`中没设`content`，所以删掉这个"`:`"就行了，不使用动态绑定

![image-20220506231648179](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.5.2.png)

###### 6、查看图片

可以看到图片已经出来了，不过是显示的问题

![image-20220506231408833](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.6.1.png)

查看显示位置

![image-20220506232005751](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.6.2.png)

最后还是用了原生的img标签

![image-20220506233108057](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.6.3.png)

图片成功显示

![image-20220506233245174](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.3.3.6.4.png)

#### 4、自定义校验规则

`Form 表单`中的自定义校验规则：[组件 | Element](https://element.eleme.io/#/zh-CN/component/form)

##### 1、修改校验规则

修改`firstLetter`和`sort`的校验规则

```javascript
firstLetter: [
  {
    validator: (rule, value, callback) => {
      if (value === "" || value ==null) {
        callback(new Error("首字母必须填写"));
      } else if (!/^[a-zA-Z]$/.test(value)) {
        callback(new Error("首字母必须为单个的英文大写或小写"));
      } else {
        callback();
      }
    },
    trigger: "blur",
  },
],
sort: [
  {
    validator: (rule, value, callback) => {
      if (value === "" || value==null) {
        callback(new Error("排序字段必须填写"));
      } else if ((!Number.isInteger(value) || value<0)) {
        callback(new Error("排序字段必须为一个大于0的整数"));
      } else {
        callback();
      }
    },
    trigger: "blur",
  },
],
```

![image-20220506235834283](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.4.1.png)

##### 2、修改数据字段

修改showStatus字段默认为1(显示)

修改`sort`字段默认为0

![image-20220506235221089](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.4.2.png)

##### 3、`sort`标识为数组

`v-moudel`添加`.number`标识该数据为数字

![image-20220506235509229](https://gitlab.com/apzs/image/-/raw/master/image/4.2.6.4.3.png)

### 4.2.7、后端校验

#### 1、添加依赖

新版本需要在`pom.xml`文件里添加依赖(老版本不需要)

引入

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

或

```xml
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>
```

#### 2、添加校验规则注解

在实体类里需要校验的字段上添加校验注解

需要导入`javax.validation.constraints`包下的校验规则，在`constraints`上按ctrl键并点击即可查看所有校验注解

![image-20220507091854747](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.2.png)

#### 3、标识需要校验

在controller层需要校验的参数对象的左边添加`@Valid`注解

![image-20220507092700948](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.3.png)

#### 4、测试

重启`gulimall-product`项目后进行测试

url:   http://localhost:10000/product/brand/save

![image-20220507093733971](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.4.1.png)

状态为**400**，消息为**不能为空**，校验失败的对象为`brandEntity`,字段为`name`，失败的原因是`name`的值为空串

![image-20220507094322011](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.4.2.png)

#### 5、自定义显示格式

##### 1、添加错误消息提示

![image-20220507095020241](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.5.1.png)

##### 2、修改返回样式

给校验的bean后紧跟一个`org.springframework.validation`包下的`BindingResult`,就可以获取到校验的结果

```java
  @RequestMapping("/save")
      public R save(@Valid @RequestBody BrandEntity brand, BindingResult result){
      if (result.hasErrors()){
          Map<String, String> map = new HashMap<>();
          result.getFieldErrors().forEach((item)->{
              //错误消息
              String message = item.getDefaultMessage();
              //bean的字段名
              String name = item.getField();
              map.put(name,message);
          });
          return R.error(400,"提交的数据不合法").put("data",map);
      }
	  brandService.save(brand);

      return R.ok();
  }
```

![image-20220507100430365](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.5.2.png)

#### 6、重新测试

重启`gulimall-product`项目后重新进行测试

可以看到已经按照想要的格式显示了

![image-20220507102736630](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.6.png)

#### 7、添加其他校验规则

```java
package com.atguigu.gulimall.product.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.*;

/**
 * 品牌
 *
 * @author 无名氏
 * @email 2185180175@qq.com
 * @date 2022-04-17 18:19:58
 */
@Data
@TableName("pms_brand")
public class BrandEntity implements Serializable {
   private static final long serialVersionUID = 1L;

   /**
    * 品牌id
    */
   @TableId
   private Long brandId;
   /**
    * 品牌名
    * @NotBlank: 不能为空，必须包含一个非空白字符
    */
   @NotBlank(message = "品牌名不能为空")
   private String name;
   /**
    * 品牌logo地址
    * @NotEmpty ：The annotated element must not be {@code null} nor empty
    *              可以接收 CharSequence、Collection、Map、Array 类型
    * @URL ：必须为一个合法的url地址
    */
   @NotEmpty
   @URL(message = "Logo必须为一个合法的url地址")
   private String logo;
   /**
    * 介绍
    */
   private String descript;
   /**
    * 显示状态[0-不显示；1-显示]
    */
   private Integer showStatus;
   /**
    * 检索首字母
    */
   @NotEmpty
   @Pattern(regexp = "^[a-zA-Z]$",message = "首字母必须为单个的大写或小写英文字母")
   private String firstLetter;
   /**
    * 排序
    * @NotNull : The annotated element must not be {@code null}.
    *        * Accepts any type.
    */
   @NotNull
   @Min(value = 0,message = "排序字段必须为一个大于0的整数")
   private Integer sort;

}
```

#### 8、再次测试

重启`gulimall-product`项目后重新进行测试

##### 1、提交错误请求

###### 1、为空判断

![image-20220507103142585](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.1.png)

###### 2、错误值判断

name值为一个空格可以判断，但sort为浮点型判断不出来

```json
{"name": "1","logo":"http://www.example.org/1.jpg","firstLetter":"q","sort":1.1}
```

![image-20220507104541200](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.2.png)

###### 3、测试sort为浮点型

当其他值合法，只有sort不为int类型时，尽然校验通过了

![image-20220507105030110](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.3.1.png)

`sort`直接被转成int了:cold_sweat:

![image-20220507105222663](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.3.2.png)

###### 4、读取请求体信息

sort确实为1.1

```java
@RequestMapping("/save")
public R save(HttpServletRequest request) throws IOException {
    System.out.println(request.getParameter("sort"));
    request.getParameterMap().forEach((k, v) -> System.out.println(k + " : " + v));

    StringBuffer stringBuffer = new StringBuffer();
    BufferedReader reader = request.getReader();
    String temp;
    while ((temp = reader.readLine()) != null) {
        stringBuffer.append(temp);
    }
    System.out.println(stringBuffer);

    brandService.save(brand);

    return R.ok();
}
```

![image-20220507120100556](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.4.1.png)

不要加上`@RequestBody BrandEntity brand`，如果加上这些参数spring会读取request输入流

而request的输入流只允许被读取一次

```java
@RequestMapping("/save")
public R save(HttpServletRequest request, @Valid @RequestBody BrandEntity brand, BindingResult result) throws IOException {
    request.getParameterMap().forEach((k, v) -> System.out.println("111" + k + " : " + v));

    StringBuffer stringBuffer = new StringBuffer();
    BufferedReader reader = request.getReader();
    String temp;
    while ((temp = reader.readLine()) != null) {
        stringBuffer.append(temp);
    }
    System.out.println(stringBuffer);

    if (result.hasErrors()) {
        Map<String, String> map = new HashMap<>();
        result.getFieldErrors().forEach((item) -> {
            //错误消息
            String message = item.getDefaultMessage();
            //bean的字段名
            String name = item.getField();
            map.put(name, message);
        });
        return R.error(400, "提交的数据不合法").put("data", map);
    }
    
    brandService.save(brand);

    return R.ok();
}
```

![image-20220507122011532](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.4.2.png)

###### 5、不允许强转

设置json反序列化不允许`float`强转成`int`

```yaml
spring:
  jackson:
    deserialization:
      ACCEPT_FLOAT_AS_INT: false
```

![image-20220507144358777](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.5.1.png)

可以看到已经不允许强转了

Cannot coerce a floating-point value ('1.1') into Integer：无法将浮点值 ('1.1') 强制转换为整数

![image-20220507144324665](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.1.5.2.png)

##### 2、提交正确请求

```json
{"name": "1","logo":"http://www.example.org/1.jpg","firstLetter":"q","sort":0}
```

![image-20220507103754722](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.2.1.png)

已经显示出来了

![image-20220507103937140](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.8.2.2.png)

#### 9、批量捕获异常

##### 1、编写异常捕获类

在`com.atguigu.gulimall.product`下新建`exception`文件夹

在`com.atguigu.gulimall.product.exception`下新建` GulimallExceptionControllerAdvice`类自定义捕获异常

```java
package com.atguigu.gulimall.product.exception;

import com.atguigu.common.utils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author 无名氏
 * @date 2022/5/7
 * @Description: 自定义异常捕获类
 *
 * @RestControllerAdvice =  @ControllerAdvice + @ResponseBody
 */

@Slf4j  //lombok日志
@RestControllerAdvice(basePackages = "com.atguigu.gulimall.product.controller")
public class GulimallExceptionControllerAdvice {

    /**
     * 捕获异常
     * @ExceptionHandler: 捕获异常的类型
     * @param e 该异常类
     * @return  返回前端的结果
     */
    @ExceptionHandler(value = Exception.class)
    public R handleValidException(Exception e){
        log.error("数据校验出现问题:{},异常类型:{}",e.getMessage(),e.getClass());
        return R.error();
    }
}
```

![image-20220507153231608](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.9.1.png)

##### 2、测试`upload`方法

重启`gulimall-product`项目后测试

```
http://localhost:10000/product/brand/update

{"id":1,"name": " ","logo":"www.example.org/1.jpg","firstLetter":"qq","sort":-1}
```

###### 1、未知错误

可以看到显示的是未知错误

![image-20220507151321841](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.9.2.1.png)

###### 2、控制台查看异常类

异常类为：`org.springframework.web.bind.MethodArgumentNotValidException`

![image-20220507153339775](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.9.2.2.png)

##### 3、修改捕获异常类型

修改` GulimallExceptionControllerAdvice`类的`handleValidException`方法

```java
@ExceptionHandler(value = MethodArgumentNotValidException.class)
public R handleValidException(MethodArgumentNotValidException e){
    log.error("数据校验出现问题:{},异常类型:{}",e.getMessage(),e.getClass());
    Map<String, String> errMap = new HashMap<>();
    e.getBindingResult().getFieldErrors().forEach((item)->{
        //实体类的字段名和对应的错误消息
        errMap.put(item.getField(),item.getDefaultMessage());
    });

    return R.error(400,"数据校验失败").put("data",errMap);
}
```

![image-20220507152807842](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.9.3.png)

4、测试`upload`方法

测试`upload`方法，可以看到按想要的格式显示出来了

![image-20220507152532267](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.9.4.png)

#### 10、捕获所有类型异常

在` GulimallExceptionControllerAdvice`类中添加方法

所有前面没有被匹配的异常都会执行这个方法

```java
@ExceptionHandler(value = Throwable.class)
public R handleException(Throwable throwable){
    return R.error();
}
```

![image-20220507154355873](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.10.png)

#### 11、错误类型枚举

##### 1、新建枚举类

在`gulimall-common`模块的`com.atguigu.common.exception`文件夹下新建`BizCodeException`枚举类

定义可能的错误信息

```java
package com.atguigu.common.exception;

/**
 * @author 无名氏
 * @date 2022/5/7
 * @Description:
 * 错误码和错误信息定义类
 * 1. 错误码定义规则为 5 为数字
 * 2. 前两位表示业务场景，最后三位表示错误码。例如：100001。10:通用 001:系统未知异常
 * 3. 维护错误码后需要维护错误描述，将他们定义为枚举形式
 * 错误码列表：
 * 10: 通用
 * 001：参数格式校验
 * 11: 商品
 * 12: 订单
 * 13: 购物车
 * 14: 物流
 */
public enum BizCodeException {
    /**
     * 系统未知异常
     */
    UNKNOW_EXCEPTION(10000,"系统未知异常"),
    /**
     * 参数格式校验失败
     */
    VALID_EXCEPTION(10001,"参数格式校验失败");

    private int code;
    private String msg;

    BizCodeException(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
```

![image-20220507155929408](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.11.1.png)

##### 2、`R`类添加方法

在`gulimall-common`模块的`com.atguigu.common.utils`文件夹下的`R`类里添加方法

```java
public static R error(BizCodeException bizCodeException){
   return error(bizCodeException.getCode(),bizCodeException.getMsg());
}
```

![image-20220507161305656](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.11.2.png)

##### 3、修改返回参数

修改`gulimall-product`模块`com.atguigu.gulimall.product.exception`包下的

` GulimallExceptionControllerAdvice`类的方法返回参数

![image-20220507161815782](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.11.3.png)

#### 12、分组校验

> 默认没有指定分组的校验注解@NotBlank，在分组校验情况@Validated({AddGroup.class})下不生效，只会在@Validated生效；
>
> 默认指定分组的校验注解@NotBlank(groups = AddGroup.class)，在@Validated下不生效，只会在分组校验@Validated({AddGroup.class})下生效

可以看到groups的参数为接口数组

![image-20220507175045352](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.0.png)

##### 1、新建接口

在`gulimall-common`模块的`com.atguigu.common`包下新建`valid`文件夹

在`gulimall-common`模块的`com.atguigu.common.valid`包下创建`AddGroup`和`UpdateGroup`接口

这些接口只做标识，不用书写任何方法和字段

![image-20220507175647905](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.1.1.png)

![image-20220507175702832](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.1.2.png)

##### 2、添加分组

id添加校验注解，使用`groups`属性进行分组,传入的类只做一个标识

```java
@Null(message = "添加不能指定品牌id",groups = {AddGroup.class})
@NotNull(message = "修改必须指定品牌id",groups = {UpdateGroup.class})
```

![image-20220507182831588](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.2.png)

##### 3、按组校验

使用`org.springframework.validation.annotation`包下的`Validated`注解，指定分组的类

![image-20220507183447890](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.3.png)

##### 4、测试

重启`gulimall-product`模块

```json
{"brandId":1,"name": " ","logo":"www.example.org/1.jpg","firstLetter":"qq","sort":-1}
```

可以看到`brandId`字段已经分组校验了，其他没有分组的字段在使用`Validated`注解进行分组校验的情况下不生效

![image-20220507193841877](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.4.1.png)

![image-20220507193934405](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.12.4.2.png)

##### 5、其他字段添加分组校验

修改`gulimall-product`模块下的`com.atguigu.gulimall.product.entity.BrandEntity`类

```java
package com.atguigu.gulimall.product.entity;

import com.atguigu.common.valid.AddGroup;
import com.atguigu.common.valid.UpdateGroup;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.*;

/**
 * 品牌
 *
 * @author 无名氏
 * @email 2185180175@qq.com
 * @date 2022-04-17 18:19:58
 */
@Data
@TableName("pms_brand")
public class BrandEntity implements Serializable {
   private static final long serialVersionUID = 1L;

   /**
    * 品牌id
    * UpdateGroup不能指定品牌
    * AddGroup必须指定品牌id
    */
   @Null(message = "添加不能指定品牌id",groups = {AddGroup.class})
   @NotNull(message = "修改必须指定品牌id",groups = {UpdateGroup.class})
   @TableId
   private Long brandId;
   /**
    * 品牌名
    * @NotBlank: 不能为空，必须包含一个非空白字符
    */
   @NotBlank(message = "品牌名不能为空",groups = AddGroup.class)
   private String name;
   /**
    * 品牌logo地址
    * @NotEmpty ：The annotated element must not be {@code null} nor empty
    *              可以接收 CharSequence、Collection、Map、Array 类型
    * @URL ：必须为一个合法的url地址
    *
    * 添加品牌时logo不能为空，并且需要是一个URL
    * 修改可以为空，但如果不为空则必须为一个URL
    */
   @NotEmpty(groups = AddGroup.class)
   @URL(message = "Logo必须为一个合法的url地址",groups = {AddGroup.class,UpdateGroup.class})
   private String logo;
   /**
    * 介绍
    */
   private String descript;
   /**
    * 显示状态[0-不显示；1-显示]
    */
   private Integer showStatus;
   /**
    * 检索首字母
    */
   @NotEmpty(groups = AddGroup.class)
   @Pattern(regexp = "^[a-zA-Z]$",message = "首字母必须为单个的大写或小写英文字母",groups = {AddGroup.class,UpdateGroup.class})
   private String firstLetter;
   /**
    * 排序
    * @NotNull : The annotated element must not be {@code null}.
    *        * Accepts any type.
    */
   @NotNull(groups = AddGroup.class)
   @Min(value = 0,message = "排序字段必须为一个大于0的整数",groups = {AddGroup.class,UpdateGroup.class})
   private Integer sort;



}
```

#### 13、自定义校验注解

需求：`showStatus`只能为0或1

Integer和Long类型不能使用正则

```
/**
 * 显示状态[0-不显示；1-显示]
 * @Pattern不能用在Integer和Long上
 * No validator could be found for constraint 'javax.validation.constraints.Pattern' validating type 'java.lang.Integer'
 * @Pattern 注解可以标注在 CharSequence 和 null 上
 */
//@Pattern(regexp = "^[01]$",message = "显示状态异常",groups = AddGroup.class) 不能使用该注解来校验
private Integer showStatus;
```

不过可以使用以下三个注解来完成功能

```
@NotNull(groups = AddGroup.class)
@Max(value = 1,groups = {AddGroup.class,UpdateGroup.class})
@Min(value = 0,groups = {AddGroup.class,UpdateGroup.class})
private Integer showStatus;
```

如果有更复杂的需求,比方说只能为[1,4,7]中的一个，这些注解就不能实现这个需求了

因此可以自定义注解

##### 1、编写自定义注解

在`gulimall-common`模块的`com.atguigu.common.valid`包下创建`ListValue`注解

在`jsr303`规范中，校验注解必须添加这三个属性

```java
package com.atguigu.common.valid;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * @author 无名氏
 * @date 2022/5/7
 * @Description: 只能为列表内的值
 */
//生成文档
@Documented
//使用哪个校验器进行校验(如果不指定，需要在初始化的时候指定)
@Constraint(validatedBy = { })
//注解可以标注在哪个位置
@Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
//校验时机，在运行时获取
@Retention(RUNTIME)
public @interface ListValue {
    /**
     * 校验出错以后，错误信息去哪取
     * 默认使用com.atguigu.common.valid.ListValue.message属性去
     * org/hibernate/validator/ValidationMessages.properties配置文件中去取
     *
     * 一般为 (注解全类名 + .message)
     * @return
     */
    String message() default "{com.atguigu.common.valid.ListValue.message}";
    /**
     * 支持分组校验
     * @return
     */
    Class<?>[] groups() default { };
    /**
     * 自定义负载信息
     * @return
     */
    Class<? extends Payload>[] payload() default { };
    /**
     * 可以为哪些值
     * @return
     */
    int[] vals() default { };
}
```

![image-20220507212345254](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.1.png)

##### 2、添加坐标

在`gulimall-common`模块的`pom.xml`文件中添加validation坐标，点击刷新，然后在`ListValue`注解类中导包就不报错

```xml
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>
```

![image-20220507215105090](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.2.png)

##### 3、创建配置文件

在`jsr303`规范中，在`ValidationMessages.properties`文件中获取`message`中键对应的值作为消息

###### 1、搜索`ValidationMessages.properties`

双击**shift**键,在弹出的框中搜索`ValidationMessages.properties`即可看到

![image-20220507212629762](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.3.1.png)

###### 2、新建配置文件

在`gulimall-common`模块的`resources`目录下新建`ValidationMessages.properties`配置文件

```properties
com.atguigu.common.valid.ListValue.message = "必须提交指定的值"
```

这里写错了，测试的时候发现它把两个双引号也显示出来了(别人写的也没有双引号),其实为

```properties
com.atguigu.common.valid.ListValue.message = 必须提交指定的值
```

注意编码为"**UTF-8**"

![image-20220507213536293](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.3.2.png)

###### 3、设置字符编码

如果编码不为"**UTF-8**"可以**设置字符编码**

![image-20220507214152772](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.3.3.png)

##### 4、自定义校验规则

校验类必须实现`ConstraintValidator`接口

![image-20220507215413611](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.4.1.png)

`ConstraintValidator`接口有两个泛型,第一个泛型用来**指定注解**，第二个泛型用来指定**需要校验的数据类型**

![image-20220507215539055](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.4.2.png)

在`com.atguigu.common.valid`包下新建`ListValueConstraintValidator`类，实现`ConstraintValidator`接口

```java
package com.atguigu.common.valid;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.Set;

/**
 * @author 无名氏
 * @date 2022/5/7
 * @Description:
 */
public class ListValueConstraintValidator implements ConstraintValidator<ListValue, Integer> {

    private Set<Integer> set = new HashSet<>();

    /**
     * 初始化信息
     * 可以获取注解的详细信息
     * @param constraintAnnotation
     */
    @Override
    public void initialize(ListValue constraintAnnotation) {
        //@ListValue注解中 vals 属性的值
        //值必须为这几个中的一个
        int[] vals = constraintAnnotation.vals();
        for (int val : vals) {
            set.add(val);
        }
    }

    /**
     * 判断是否校验成功
     * @param value
     * @param context
     * @return
     */
    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {

        return set.contains(value);
    }
}
```

![image-20220507222417417](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.4.3.png)

##### 5、指定校验器

可以指定多个校验器，能够根据泛型自动匹配正确的校验器

![image-20220507222719730](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.5.png)

##### 6、使用该注解

在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.BrandEntity`类的`showStatus`字段上使用自定义注解

```java
@NotNull(groups = AddGroup.class)
@ListValue(vals = {0,1},groups = {AddGroup.class,UpdateGroup.class})
```

![image-20220507225522195](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.6.png)

##### 7、测试

重启`gulimall-product`模块

###### 1、多了两个双引号

![image-20220507223836326](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.7.1.png)

###### 2、去掉双引号

去掉双引号后重启`gulimall-product`模块

![image-20220507223924267](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.7.2.png)

###### 3、重新测试

![image-20220507224020853](https://gitlab.com/apzs/image/-/raw/master/image/4.2.7.13.7.3.png)

### 4.2.8、校验注解总结
#### 1 Maven依赖


```xml
<!--第一种方式导入校验依赖-->
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>
<!--第二种方式导入校验依赖-->
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
</dependency>
```

#### 2 值校验

##### 2.1 @Null注解

被注解的元素必须为null

```java
@Null(message = "必须为null")
private String username;
```

##### 2.2 @NotNull注解

被注解的元素必须不为null

```java
@NotNull(message = "必须不为null")
private String username;
```

##### 2.3 @NotBlank注解

验证注解的元素值不为空（不为null、去除首位空格后长度为0） ，并且类型为String。

```java
@NotBlank(message = "必须不为空")
private String username;
```

##### 2.4 @NotEmpty注解

验证注解的元素值不为null且不为空（字符串长度不为0、集合大小不为0） ，并且类型为String。

```java
@NotEmpty(message = "必须不为null且不为空")
private String username;
```

##### 2.5 @AssertTrue注解

被注解的元素必须为true，并且类型为boolean。

```java
@AssertTrue(message = "必须为true")
private boolean status;
```

##### 2.6 @AssertFalse注解

被注解的元素必须为false，并且类型为boolean。

```java
@AssertFalse(message = "必须为false")
private boolean status;
```

#### 3 范围校验

##### 3.1 @Min注解

被注解的元素其值必须大于等于最小值，并且类型为int，long，float，double。

```java
@Min(value = 18, message = "必须大于等于18")
private int age;
```

##### 3.2 @Max注解

被注解的元素其值必须小于等于最小值，并且类型为int，long，float，double。

```java
@Max(value = 18, message = "必须小于等于18")
private int age;
```

##### 3.3 @DecimalMin注解

验证注解的元素值大于等于@DecimalMin指定的value值，并且类型为BigDecimal。

```java
@DecimalMin(value = "150", message = "必须大于等于150")
private BigDecimal height;
```

##### 3.4 @DecimalMax注解

验证注解的元素值小于等于@DecimalMax指定的value值 ，并且类型为BigDecimal。

```java
@DecimalMax(value = "300", message = "必须大于等于300")
private BigDecimal height;
```

##### 3.5 @Range注解

验证注解的元素值在最小值和最大值之间，并且类型为BigDecimal，BigInteger，CharSequence，byte，short，int，long。

```java
@Range(max = 80, min = 18, message = "必须大于等于18且小于等于80")
private int age;
```

##### 3.6 @Past注解

被注解的元素必须为过去的一个时间，并且类型为java.util.Date。

```java
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@Past(message = "必须为过去的时间")
private Date createDate;
```

##### 3.7 @Future注解

被注解的元素必须为未来的一个时间，并且类型为java.util.Date。

```java
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@Future(message = "必须为未来的时间")
private Date createDate;
```

#### 4 长度校验

##### 4.1 @Size注解

被注解的元素的长度必须在指定范围内，并且类型为String，Array，List，Map。

```java
@Size(max = 11, min = 7, message = "长度必须大于等于7或小于等于11")
private String mobile;
```

##### 4.2 @Length注解

验证注解的元素值长度在min和max区间内 ，并且类型为String。

```java
@Length(max = 11, min = 7, message = "长度必须大于等于7或小于等于11")
private String mobile;
```

#### 5 格式校验

##### 5.1 @Digits注解

验证注解的元素值的整数位数和小数位数上限 ，并且类型为float，double，BigDecimal。

```java
@Digits(integer=3,fraction = 2,message = "整数位上限为3位，小数位上限为2位")
private BigDecimal height;
```

##### 5.2 @Pattern注解

被注解的元素必须符合指定的正则表达式，并且类型为String。

```java
@Pattern(regexp = "\\d{11}",message = "必须为数字，并且长度为11")
private String mobile;
```

##### 5.3 @Email注解

验证注解的元素值是Email，也可以通过regexp和flag指定自定义的email格式，类型为String。

```java
 @Email(message = "必须是邮箱")
private String email;
```


## 4.3、商品服务-API-属性分组

### 4.3.1、前端组件导入

#### 1、导入数据

##### 1、执行sql语句

打开`1.分布式基础（全栈开发篇）\资料源码.zip\docs\代码\sql`文件夹下的`sys_menus.sql`，全选复制

点击`gulimall_admin`然后右键选择`命令行界面` ，粘贴到里面，回车执行sql语句

(不要点击`运行SQL文件`,这样会有中文乱码问题)

![image-20220508090404565](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.1.1.png)

##### 2、查看结果

url: http://localhost:8001/#/product-brand

刷新前端项目，可以看到这些系统已经显示出来了

![image-20220508091348831](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.1.2.png)

#### 2、新建文件

##### 1、新建`category.vue`文件

在`src\views\modules`文件夹里新建`common`文件夹，用来存储公共组件

在`src\views\modules`文件夹下的`common`文件夹里新建`category.vue`文件,输入vue生成模板

![image-20220508092805251](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.2.1.png)

##### 2、新建`attrgroup.vue`文件

###### 1、查看位置

![image-20220508092955297](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.2.2.1.png)

###### 2、新建`attrgroup.vue`文件

在`src\views\modules`文件夹下的`product`文件夹里新建`attrgroup.vue`文件,输入vue生成模板

![image-20220508095359481](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.2.2.2.png)

#### 3、添加代码

##### 1、添加`category.vue`代码

修改`src\views\modules\common\category.vue`文件，[点击查看`category.vue`完整代码](code/4.3.1.3.1.category.vue)

##### 2、添加`attrgroup.vue`代码

`element-ui`里面的**Layout 布局**下的**分栏间隔**:  [组件 | Element](https://element.eleme.io/#/zh-CN/component/layout)

引入组件步骤：

1. import Category from "../common/category.vue"; 把组件导进来
2. components: { Category:Category }, 指明需要的组件
3. `<category></category>` 使用该标签

修改`src\views\modules\product\attrgroup.vue`文件，[点击查看`attrgroup.vue`完整内容](code/4.3.1.3.2.attrgroup.vue)

##### 3、结构已经出来了

![image-20220508100902403](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.3.3.png)

##### 4、添加表格

将`<div>`标签里面的内容替换掉"表格"

然后把其他除`<template>`标签里的内容与`attrgroup.vue`里面的内容合并

[点击查看`attrgroup.vue`完整代码](code/4.3.1.3.4.attrgroup.vue)

![image-20220508101443870](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.3.4.png)

##### 5、引入`attrgroup-add-or-update.vue`文件

![image-20220508103547839](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.3.5.png)

##### 6、效果

![image-20220508104040518](https://gitlab.com/apzs/image/-/raw/master/image/4.3.1.3.6.png)

#### 4、完整代码

##### 1、`category.vue`

[点击查看`category.vue`完整代码](code/4.3.1.4.1.category.vue)

##### 2、`attrgroup.vue`

[点击查看`attrgroup.vue`完整代码](code/4.3.1.4.2.attrgroup.vue)

### 4.3.2、父子组件交互

#### 1、发送消息

##### 1、绑定事件

**Tree树形控件**中的**Events**:  [组件 | Element](https://element.eleme.io/#/zh-CN/component/tree)

| 事件名称   | 说明               | 回调参数                                                     |
| :--------- | :----------------- | :----------------------------------------------------------- |
| node-click | 节点被点击时的回调 | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 |

在`src\views\modules\common\category.vue`文件的`el-tree`标签内添加属性

```html
@node-click="nodeClick"
```

##### 2、添加方法

在`src\views\modules\common\category.vue`文件的`methods`里面添加方法

```javascript
nodeClick(data,node,component){
  console.log("子组件的category里的节点被点击：",data,node,component);
  //向父组件发送事件
  //第一个参数为事件的名称,后面的都为发送的数据
  this.$emit("tree-node-click",data,node,component);
},
```

#### 2、接收事件

##### 1、添加事件

在`src\views\modules\product\attrgroup.vue`文件中的`category`标签里添加属性

格式： @事件名称=”父组件方法“

```
@tree-node-click="treeNodeClick"
```

![image-20220508111126728](https://gitlab.com/apzs/image/-/raw/master/image/4.3.2.2.1.png)

##### 2、添加方法

在`src\views\modules\product\attrgroup.vue`文件中的`methods`里面添加方法

```javascript
//参数为子组件传递的参数
treeNodeClick(data,node,component){
  console.log("父组件attrgroup感知到子组件category的节点被点击：",data,node,component);
  console.log("被点击的节点名：",data.name)
},
```

#### 3、查看效果

点击"数码相机",可以看到父组件attrgroup已经感知到子组件category的节点被点击了

![image-20220508112504211](https://gitlab.com/apzs/image/-/raw/master/image/4.3.2.3.png)

### 4.3.3、获取分类属性分组

#### 1、后端

##### 1、更改`list`方法

修改`gulimall-product`模块下`com.atguigu.gulimall.product.service.impl.AttrGroupServiceImpl`类的`list`方法

```java
@RequestMapping("/list/{catelogId}")
    public R list(@RequestParam Map<String, Object> params,@PathVariable("catelogId") Long catelogId){
    //PageUtils page = attrGroupService.queryPage(params);
    PageUtils page = attrGroupService.queryPage(params,catelogId);
    return R.ok().put("page", page);
}
```

`alt+enter`在提示里面选第二个`Create method`

![image-20220508165717823](https://gitlab.com/apzs/image/-/raw/master/image/4.3.3.1.1.png)

##### 2、添加抽象方法

`com.atguigu.gulimall.product.service`包下的`AttrGroupService`接口添加抽象方法

```java
PageUtils queryPage(Map<String, Object> params, Long catelogId);
```

##### 3、添加实现类

`com.atguigu.gulimall.product.service.impl`包下的`AttrGroupServiceImpl`类添加实现方法

```java
@Override
public PageUtils queryPage(Map<String, Object> params, Long catelogId) {
    if (catelogId == 0){
        return this.queryPage(params);
    }else {
        String key = (String) params.get("key");
        //select * from attr_group where catelogId = ? and ( attr_group_id = key or attr_group_name like %key%)
        LambdaQueryWrapper<AttrGroupEntity> queryWrapper = new LambdaQueryWrapper<AttrGroupEntity>()
                .eq(AttrGroupEntity::getCatelogId,catelogId);
        if (key != null && key.length() > 0){
            queryWrapper.and((obj)->{
                obj.eq(AttrGroupEntity::getAttrGroupId,key).or().like(AttrGroupEntity::getAttrGroupName,key);
            });
        }
        IPage<AttrGroupEntity> page = this.page(new Query<AttrGroupEntity>().getPage(params),queryWrapper);
        return new PageUtils(page);
    }
}
```

##### 4、测试

使用Postman测试

url: http://localhost:88/api/product/attrgroup/list/1?page=1&key=aa

选择**get**方法

![image-20220508165944731](https://gitlab.com/apzs/image/-/raw/master/image/4.3.3.1.4.1.png)

可以看到已正确打印sql语句

![image-20220508165149621](https://gitlab.com/apzs/image/-/raw/master/image/4.3.3.1.4.2.png)

#### 2、前端

##### 1、修改`treeNodeClick`方法

修改`src\views\modules\product\attrgroup.vue`的`treeNodeClic`方法，为第三级时查询该catelogId的信息

```javascript
//参数为子组件传递的参数
treeNodeClick(data,node,component){
  console.log("父组件attrgroup感知到子组件category的节点被点击：",data,node,component);
  console.log("被点击的节点名：",data.name)
  //为第三级时查询该catelogId的信息
  if(node.level==3){
    this.catelogId = data.catId;
    this.getDataList();
  }
},
```

##### 2、添加`catelogId`字段

在`data`里的`return`里添加`catelogId`数据字段

```
catelogId : 0,
```

##### 3、修改url

修改`getDataList`方法里面传递的url

```
url: this.$http.adornUrl(`/product/attrgroup/list/${this.catelogId}`),
```

#### 3、测试

##### 1、查询全部

点击 手机-->手机通讯-->手机 ,所有数据都查询出来了

![image-20220508173023284](https://gitlab.com/apzs/image/-/raw/master/image/4.3.3.3.1.png)

##### 2、根据id查

输入`1`点击查询

![image-20220508173218019](https://gitlab.com/apzs/image/-/raw/master/image/4.3.3.3.2.png)

##### 3、根据组名查

输入`基本`点击查询

![image-20220508173329517](https://gitlab.com/apzs/image/-/raw/master/image/4.3.3.3.3.png)

### 4.3.4、属性分组新增功能

#### 1、添加级联选择器

切换到`src\views\modules\product\attrgroup-add-or-update.vue`文件

在`label="所属分类id"`的`el-form-item `标签内，删除`el-input`标签

```html
<el-input v-model="dataForm.catelogId" placeholder="所属分类id"></el-input>
```

添加`Cascader级联选择器`

```html
<el-cascader
  v-model="dataForm.catelogId"
  :options="categorys"
  :props="props"
></el-cascader>
```

#### 2、添加属性

在`data`里面的`return`里添加属性

```javascript
props: {
  value: 'catId',
  label: 'name',
  children: 'children'
},
categorys: [],
```

#### 3、添加方法

添加`getCategorys`方法，获取分类数据

```javascript
getCategorys() {
  this.$http({
    url: this.$http.adornUrl("/product/category/list/tree"),
    method: "get",
  }).then(({ data }) => {
    console.log(data.data);
    this.categorys = data.data;
  });
},
```

#### 4、调用方法

在创建完成（可以访问当前 this 实例）的时候调用`getCategorys`方法，获取分类数据

`created`方法写在与“**data**"和”**methods**“同级的位置

```javascript
created() {
  this.getCategorys();
},
```

![image-20220508200114324](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.4.png)

#### 5、测试

##### 1、控制台报错

```
Invalid prop: type check failed for prop "value". Expected Array, got String
无效的属性：属性“value”的类型检查失败。 预期数组，得到字符串。
```

![image-20220508201217559](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.1.1.png)

把`src\views\modules\product`下的`attrgroup-add-or-update.vue`里的

```
catelogId: "",
```

改成

```
catelogId: [],
```

就行了，现在已经不报错了

![image-20220509210341350](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.1.2.png)

##### 2、查看数据，但多出一级

数据已经显示出来了，但是在点击第三级分类时，又出来了一级

![image-20220508200249772](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.2.1.png)

![image-20220508202500776](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.2.2.png)

![image-20220508202714332](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.2.3.png)

##### 3、后端添加注解

在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.CategoryEntity`文件里的`children`字段上添加注解

```java
@JsonInclude(JsonInclude.Include.NON_EMPTY)
```

![image-20220508203003106](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.3.png)

##### 4、重新测试

显示已经成功了，

![image-20220509211116839](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.4.1.png)

也没有`children`为空的字段了

![image-20220509211356536](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.4.2.png)

![image-20220509211717999](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.4.3.png)

##### 5、提交的`catelogId`为数组

提交的`catelogId`为数组，而想要的`catelogId`只是最后一级(不一定是第三级)分类的id

![image-20220508204402893](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.4.png)

##### 6、修改提交的数据

把`src\views\modules\product`下的`attrgroup-add-or-update.vue`里的

```
catelogId: [],
```

改为

```
catelogIds: [],
```

并添加`catelogId`字段，此时的`catelogId`为要提交的最后一级(不一定是第三级)分类的id

```
catelogId: 0,
```

------

把`el-cascader`标签内的属性

```
v-model="dataForm.catelogId"
```

改为

```
v-model="dataForm.catelogIds"
```

使其继续绑定以前的`catelogId`

------

把`dataFormSubmit`方法里`data`字段里的

```
catelogId: this.dataForm.catelogId,
```

改成

```
catelogId: this.dataForm.catelogIds[this.dataForm.catelogIds.length-1],
```

使其绑定最后一级(不一定是第三级)分类的id

##### 7、继续测试

![image-20220509213100721](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.7.1.png)

提交后，页面自动刷新，获取最新数据

![image-20220509213118005](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.7.2.png)

:pushpin:这个刷新的功能就是通过刚才父子组件交换实现的

![image-20220509213451960](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.7.3.png)

![image-20220509213506714](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.7.4.png)

![image-20220509213521855](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.7.5.png)

##### 8、`所属分类id`不在一行显示

`src\views\modules\product\attrgroup-add-or-update.vue`文件里的`el-form`标签里修改属性

```css
label-width="100px"
```

![image-20220509214406434](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.8.1.png)

这样所属分类id就显示在一行了

![image-20220509214549516](https://gitlab.com/apzs/image/-/raw/master/image/4.3.4.5.8.2.png)

#### 6、完整代码

##### 1、`common`下的`category.vue`文件

[点击查看`src\views\modules\common\category.vue`文件完整代码](code/4.3.4.6.1.category.vue)

##### 2、`attrgroup.vue`文件

[点击查看`src\views\modules\product\attrgroup.vue`文件完整代码](code/4.3.4.6.2.attrgroup.vue)

##### 3、`attrgroup-add-or-update.vue`文件

[点击查看`src\views\modules\product\attrgroup-add-or-update.vue`文件完整代码](code/4.3.4.6.3.attrgroup-add-or-update.vue)

### 4.3.5、回显`所属分类id`

当点击修改按钮后

![image-20220509222434388](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.0.1.png)

`所属分类id`没有回显

![image-20220509222509610](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.0.2.png)

#### 1、查看点击修改按钮调用的方法

查看`src\views\modules\product\attrgroup.vue`文件的`addOrUpdateHandle`方法，分析点击修改按钮后`所属分类id`没有回显的原因

------

` this.$nextTick()`：当要显示的组件(上面这个对话框)完全渲染后，再调用里面的lambda表达式

`this.$refs`会获取当前vue文件所有组件

`this.$refs.addOrUpdate`获取当前vue文件所有标签中`ref`属性为`addOrUpdate`或`components{}`里面为`addOrUpdate`的组件

然后再调用该组件的方法

```js
// 新增 / 修改
addOrUpdateHandle(id) {
  //打开对话框
  this.addOrUpdateVisible = true;
  //当要显示的组件(上面这个对话框)完全渲染后，再调用一个方法
  this.$nextTick(() => {
    this.$refs.addOrUpdate.init(id);
  });
},
```

可以看到调用了`addOrUpdate`组件的`init`方法

当前vue文件引了同文件夹下的`attrgroup-add-or-update.vue`文件

并把它命名为`addOrUpdate`，并使用这个名字添加到该vue文件的组件里

因此其调用了`attrgroup-add-or-update.vue`文件的`init`方法，并传入了`attrGroup`的`Id`

![image-20220509223330783](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.1.png)

#### 2、查看`init`方法

`src\views\modules\product\attrgroup-add-or-update.vue`文件`init`方法得到的`catelogId`只是一个值(最后一级分类的id)

![image-20220509224447118](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.2.png)

而`所属分类id`需要的参数是**完整分类id**(最后一级分类的所有父分类id+最后一级分类的id)

因此可以添加返回的数据

#### 3、修改前端代码

在`src\views\modules\product\attrgroup-add-or-update.vue`的`init`方法里添加这一行

```javascript
//最后一级分类的所有父分类id+最后一级分类id
this.dataForm.catelogPath = data.attrGroup.catelogPath;
```

按"ctrl+H"快捷键调出替换,把"catelogIds"替换成"catelogPath",点击替换所有

![image-20220509225211670](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.3.png)

#### 4、修改后端代码

##### 1、修改`AttrGroupController`的`info`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrGroupController`类的`info`方法

注入`categoryService`

```java
@Autowired
private CategoryService categoryService;
```

调用其`getCatelogPath`方法,根据**最后一级分类的id**查出**完整分类id**(最后一级分类的所有父分类id+最后一级分类id)

并将查处的结果赋给`AttrGroupEntity`的`catelogPath`字段

```java
@RequestMapping("/info/{attrGroupId}")
public R info(@PathVariable("attrGroupId") Long attrGroupId) {
    AttrGroupEntity attrGroup = attrGroupService.getById(attrGroupId);

    Long catelogId = attrGroup.getCatelogId();
    //根据最后一级分类的id查出完整分类id(最后一级分类的所有父分类id+最后一级分类id)
    Long[] catelogPath = categoryService.findCatelogPath(catelogId);
    //赋给AttrGroupEntity的catelogPath字段
    attrGroup.setCatelogPath(catelogPath);

    return R.ok().put("attrGroup", attrGroup);
}
```

![image-20220509233808743](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.1.png)

##### 2、`AttrGroupEntity`类添加`catelogPath`字段

```java
/**
 * 此字段在数据库中不存在
 */
@TableField(exist = false)
private Long[] catelogPath;
```

![image-20220509231524255](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.2.png)

##### 3、添加`getCatelogPath`抽象方法

由于使用了`lombok`插件，添加了`lombok`依赖，并添加了`@Data`注解，所以会在编译时给字段自动添加`get`和`set`方法，

因此`attrGroup.setCatelogPath(catelogPath);`不报错了

鼠标悬停在`getCatelogPath`上(或者使用`alt+enter`快捷键)，点击`Create method`，创建方法

![image-20220509233935848](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.3.1.png)

添加抽象方法

```java
/**
 * 根据最后一级分类的id查出完整分类id(最后一级分类的所有父分类id+最后一级分类id)
 * @return
 */
Long[] findCatelogPath(Long catelogId);
```

然后点击`1 related problem`或接口类左边的`I和向下箭头`的那个按钮或使用`ctrl+alt+B`快捷键转到其实现类

![image-20220509234029398](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.3.2.png)

使用`alt+enter`快捷键，点击"**Implement methods**",实现未实现的方法

![image-20220509234117877](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.3.3.png)

##### 4、实现`getCatelogPath`抽象方法

在`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里添加方法

```java
@Override
public Long[] findCatelogPath(Long catelogId) {
    List<Long> paths = new ArrayList<>();

    List<Long> parentPath = findParentPath(catelogId,paths);
    //先加入节点id后再递归求解其父分类，所有求出的完整路径是反的，需要转置一下
    Collections.reverse(parentPath);
    return (Long[]) parentPath.toArray();
}

/**
 * 例如：[413,50,5]
 * 根据最后一级分类的id递归求解完整分类id(最后一级分类的所有父分类id+最后一级分类id)
 * @param catelogId 当前分类id
 * @param paths 分类id数组
 * @return  完整分类id
 */
private List<Long> findParentPath(Long catelogId, List<Long> paths) {
    paths.add(catelogId);
    CategoryEntity categoryEntity = this.getById(catelogId);
    Long parentCid = categoryEntity.getParentCid();
    if (parentCid!=0){
        findParentPath(parentCid,paths);
    }
    return paths;
}
```

##### 5、单元测试

在`test\java`的`com.atguigu.gulimall.product.GulimallProductApplicationTests`类里添加方法，点击方法左侧的运行按钮

:pushpin:如果报空指针，说明你`gulimall_pms`数据库的`pms_category`表里面不存在`cat_id`为你写的那个id

```java
@Autowired
CategoryService categoryService;

@Test
public void test(){
   Long[] catelogPath = categoryService.findCatelogPath(413L);
   System.out.println(Arrays.toString(catelogPath));
}
```

```
[Ljava.lang.Object; cannot be cast to [Ljava.lang.Long;
Object[]类型不能强转成Long[]类型
```

![image-20220510113030426](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.5.1.png)

![image-20220510114911801](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.5.2.png)

##### 6、修改`findCatelogPath`方法

修改`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`findCatelogPath`方法

把

```java
return (Long[]) parentPath.toArray();
```

改成

```java
return parentPath.toArray(new Long[parentPath.size()]);
```

测试成功，但又提示`Call to 'toArray()' with pre-sized array argument 'new Long[parentPath.size()]' `

![image-20220510115355135](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.6.1.png)

可以改成

```
return parentPath.toArray(new Long[0]);
```

这样写测试也没有问题

![image-20220510115533565](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.4.6.2.png)

📌其实`findParentPath`方法的返回值有点多余

📌`findCatelogPath`方法也可以直接返回`List<Long>`类型，返回到前端的内容`Long[]`和`List<Long>`都是一样的

#### 5、测试

重启`gulimall-product`项目后测试

##### 1、点击`修改`按钮

点击`测试数据`的`修改`按钮，可以看到`所属分类id`已正确回显

![image-20220510123323627](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.5.1.png)

##### 2、点击`新增`按钮

点击`新增`按钮，发现`所属分类id`没有删除

![image-20220510123145766](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.5.2.png)

##### 3、添加`closed`回调

`element-ui`中`Dialog对话框`中的事件：[组件 | Element](https://element.eleme.io/#/zh-CN/component/dialog)

| 事件名称 | 说明                        |
| :------- | :-------------------------- |
| closed   | Dialog 关闭动画结束时的回调 |

`src\views\modules\product\attrgroup-add-or-update.vue`中`el-dialog`标签添加属性

```properties
 @closed="dialogClose"
```

并再`method`里面添加方法，清空`catelogPath`

```javascript
dialogClose(){
  this.dataForm.catelogPath = [];
},
```

##### 4、查看是否清除

刷新页面，先点击`修改`，再点击`新增`可以看到已经没有上次`修改`回显执行后留下的`所属分类id`的信息了

![image-20220510125315522](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.5.4.png)

##### 5、可搜索级联选择器

修改`src\views\modules\product\attrgroup-add-or-update.vue`里的`el-cascader`标签

 `elememt-ui`的`Cascader 级联选择器`里面的`可搜索`：[组件 | Element](https://element.eleme.io/#/zh-CN/component/cascader)

添加`filterable`就变成可搜索的了，添加`placeholder`属性可以给予提示

```html
<el-cascader
  v-model="dataForm.catelogPath"
  :options="categorys"
  :props="props"
  placeholder="试试搜索：手机"
  filterable
></el-cascader>
```

输入手机后，下面可以提供选择

![image-20220510130049823](https://gitlab.com/apzs/image/-/raw/master/image/4.3.5.5.5.png)

## 4.4、商品服务-API-品牌管理

### 4.4.1、完善品牌管理

#### 1、重新执行sql

重新打开`1.分布式基础（全栈开发篇）\资料源码.zip\docs\代码\sql`下的`pms_catelog.sql`文件，复制内容

点击`gulimall_pms`数据库，右键选择`命令行界面`，粘贴刚刚复制的内容，点击回车，执行sql语句

(不要点击`运行SQL文件`,这样会有中文乱码问题)

![image-20220510145629313](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.1.png)

#### 2、添加分页插件

##### 1、总条数错误

url：http://localhost:8001/#/product-brand

![image-20220510150440811](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.2.1.png)

##### 2、添加分页插件

在`gulimall-product`模块的`com.atguigu.gulimall.product`文件夹下新建`config`文件夹

在`config`文件夹下新建`MyBatisConfig`类

```java
package com.atguigu.gulimall.product.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author 无名氏
 * @date 2022/5/10
 * @Description:
 * @EnableTransactionManagement ：开启事务功能
 */
@Configuration
@EnableTransactionManagement
@MapperScan("com.atguigu.gulimall.product.dao")
public class MyBatisConfig {

    /**
     * 引入分页插件
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        //设置请求的页面大于最大页后操作，true调回到首页，false 继续请求 默认false
        paginationInterceptor.setOverflow(false);
        //设置最大单页限制数量，默认500条，-1 不受限制
        paginationInterceptor.setLimit(1000);

        return paginationInterceptor;
    }
}
```

![image-20220510151731315](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.2.2.png)

##### 3、查看条数

重启`gulimall-product`模块，刷新前端页面，可以看到总条数显示正确

![image-20220510151901745](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.2.3.png)

#### 3、修改查询逻辑

##### 1、模糊查询失败

根据`品牌id`查询

![image-20220510154018496](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.3.1.1.png)

根据`品牌名`模糊查询

![image-20220510154130509](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.3.1.2.png)

##### 2、根据`品牌id`和`品牌名`查询

修改`gulimall-product`模块里`com.atguigu.gulimall.product.service.impl.BrandServiceImpl`类下的`queryPage`方法

```java
@Override
public PageUtils queryPage(Map<String, Object> params) {
    String key = (String) params.get("key");
    LambdaQueryWrapper<BrandEntity> lambdaQueryWrapper = new LambdaQueryWrapper<BrandEntity>();
    if (key!=null && key.length()>0){
        lambdaQueryWrapper.eq(BrandEntity::getBrandId,key)
                .or().like(BrandEntity::getName,key);
    }
    IPage<BrandEntity> page = this.page(
            new Query<BrandEntity>().getPage(params),
           lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220510154241194](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.3.2.png)

##### 3、测试

重新运行`gulimall-product`模块，进行测试

根据`品牌id`查询

![image-20220510153551322](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.3.3.1.png)

根据`品牌名`模糊查询

![image-20220510153617854](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.3.3.2.png)

都没有什么问题

#### 4、添加数据

##### 1、删除`品牌管理`数据

![image-20220510201428448](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.1.1.png)

可以在数据库执行以下命令，清空`gulimall_pms.pms_brand`表数据，并让主键重新从1开始

```sql
truncate gulimall_pms.pms_brand;
```

也可以选中表-->右键-->截断表

![image-20220511151930445](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.1.2.png)

##### 2、添加有用数据

图片在`1.分布式基础（全栈开发篇）\资料源码.zip\docs\pics`文件夹里面

![image-20220510223618376](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.2.1.png)

添加华为品牌

![image-20220510223418633](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.2.2.png)

添加小米品牌

![image-20220510223456458](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.2.3.png)

添加oppo品牌

![image-20220510223906193](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.2.4.png)

添加Apple品牌

![image-20220510224046126](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.2.5.png)

所有品牌

![image-20220510224352810](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.2.6.png)

##### 3、复制文件

:pushpin:最好先**提交到远程仓库**并**复制前端项目**再操作,最少也要复制`renren-fast-vue\src\views\modules`下的`common`和`product`文件夹

1.  复制`1.分布式基础（全栈开发篇）\资料源码.zip\docs\代码\前端\modules`里的`common`和`product`文件夹
2. 点击`src`下的"views"，然后右键
3. 选择`在文件资源管理器中显示`
4. 进入到`view`下的`modules`里面
5. 右键，选择粘贴  
6. 选择`替换目标中的文件`

![image-20220510201443183](https://gitlab.com/apzs/image/-/raw/master/image/4.4.1.4.3.png)

### 4.4.2、根据`品牌id`查询`品牌和三级分类的关联关系`

【属性分组-规格参数-销售属性-三级分类】关联关系

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.4.2.0.1.png" alt="image-20220721202638445" style="zoom: 50%;" />

SPU-SKU-属性

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.4.2.0.2.png" alt="image-20220721202802806" style="zoom:67%;" />

SPU-SKU-属性表

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.4.2.0.3.png" alt="image-20220721202830773" style="zoom:67%;" />

#### 1、添加`catelogList`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.CategoryBrandRelationController`类里添加方法

```java
/**
 * 列表
 * @GetMapping = @RequestMapping(method = RequestMethod.GET)
 */
@GetMapping("/catelog/list")
public R catelogList(@RequestParam(value = "brandId") Long brandId){
    List<CategoryBrandRelationEntity> data = categoryBrandRelationService.listByBrandId(brandId);

    return R.ok().put("data", data);
}
```

![image-20220510213324100](https://gitlab.com/apzs/image/-/raw/master/image/4.4.2.1.png)

#### 2、添加`listByBrandId`抽象方法

在`com.atguigu.gulimall.product.service.CategoryBrandRelationService`接口里添加`listByBrandId`抽象方法

```java
List<CategoryBrandRelationEntity> listByBrandId(Long brandId);
```

![image-20220510213901065](https://gitlab.com/apzs/image/-/raw/master/image/4.4.2.2.png)

#### 3、实现`listByBrandId`抽象方法

在`com.atguigu.gulimall.product.service.impl.CategoryBrandRelationServiceImpl`类里

实现`CategoryBrandRelationService`接口未实现的`listByBrandId`方法

```java
@Override
public List<CategoryBrandRelationEntity> listByBrandId(Long brandId) {
    LambdaQueryWrapper<CategoryBrandRelationEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    return this.list(lambdaQueryWrapper.eq(CategoryBrandRelationEntity::getBrandId, brandId));
}
```

![image-20220510214006492](https://gitlab.com/apzs/image/-/raw/master/image/4.4.2.3.png)

### 4.4.3、保存品牌和分类完整信息

#### 1、修改`save`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.CategoryBrandRelationController`类里

修改`save`方法，保存其`brand_id、catelog_id、brand_name、catelog_name`

传来的数据只有`brand_id、catelog_id`，调用`categoryBrandRelationService`的`saveDetail`查出`brand_name`和`catelog_name`

并将完整的`brand_id、catelog_id、brand_name、catelog_name`保存到数据库

```java
@RequestMapping("/save")
    public R save(@RequestBody CategoryBrandRelationEntity categoryBrandRelation){
    // 保存 brand_id、catelog_id、brand_name、catelog_name
    categoryBrandRelationService.saveDetail(categoryBrandRelation);

    return R.ok();
}
```

![image-20220510215925645](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.1.png)

#### 2、添加`saveDetail`抽象方法

在`com.atguigu.gulimall.product.service.CategoryBrandRelationService`接口里添加`saveDetail`抽象方法

```java
void saveDetail(CategoryBrandRelationEntity categoryBrandRelation);
```

![image-20220510215959515](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.2.png)

#### 3、实现`saveDetail`抽象方法

在`com.atguigu.gulimall.product.service.impl.CategoryBrandRelationServiceImpl`类里

实现`CategoryBrandRelationService`接口未实现的`saveDetail`方法

```java
@Autowired
BrandDao brandDao;
@Autowired
CategoryDao categoryDao;
    
/**
 *原本的save方法只能保存 brand_id 和 catelog_id 的关联关系,不能保存 brand_name 和 catelog_name
 * 保存 brand_id、catelog_id、brand_name、catelog_name
 * @param categoryBrandRelation
 */
@Override
public void saveDetail(CategoryBrandRelationEntity categoryBrandRelation) {
    Long brandId = categoryBrandRelation.getBrandId();
    Long catelogId = categoryBrandRelation.getCatelogId();

    //根据brandId 查询 brandName
    BrandEntity brandEntity = brandDao.selectById(brandId);
    //根据 categoryId 查询 categoryName
    CategoryEntity categoryEntity = categoryDao.selectById(catelogId);

    categoryBrandRelation.setBrandName(brandEntity.getName());
    categoryBrandRelation.setCatelogName(categoryEntity.getName());

    this.save(categoryBrandRelation);
}
```

这里报红不用管,使用MyBatis时dao接口没有实现类，接口是没有办法创建实例的，因此也就无法注入到ioc容器

IDEA检测到没有注入到ioc容器，所有就报红了

![image-20220510220108353](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.3.png)

#### 4、解决IDEA报红

按住`ctrl`键，点击`BrandDao`进入`BrandDao`类

![image-20220510222434101](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.4.1.png)

添加`@Repository`注解，显式的把`BrandDao`添加到ioc容器

![image-20220510222612590](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.4.2.png)

添加`@Repository`注解，显式的把`CategoryDao`添加到ioc容器

![image-20220510222727987](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.4.3.png)

已经不报红了(其实不修改也行)

![image-20220510223032990](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.4.4.png)

#### 5、测试

重启`gulimall-product`模块，刷新前端页面

##### 1、添加关联分类

![3](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.5.1.gif)

##### 2、查看回显数据

URL: http://localhost:88/api/product/categorybrandrelation/catelog/list?t=1652197270780&brandId=1

回显正常，证明`catelogList`方法和`save`方法正确

![image-20220510234520024](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.5.2.png)

##### 3、查看数据库

可以看到已经`brand_id、catelog_id、brand_name、catelog_name`全部添加到数据库了，所有`save`方法正确

![image-20220510233840276](https://gitlab.com/apzs/image/-/raw/master/image/4.4.3.5.3.png)

### 4.4.4、保证数据一致性

当修改`brand_name`或`catelog_name`时,不仅要更新`pms_category`或`pms_brand`表

同时也要更新`pms_category_brand_relation`表，用来保证冗余字段的一致性

#### 1、修改`update`方法

修改`gulimall-product`模块下的`com.atguigu.gulimall.product.controller.BrandController`类的`update`方法

```java
@RequestMapping("/update")
public R update(@Validated(UpdateGroup.class) @RequestBody BrandEntity brand) {
    brandService.updateDetail(brand);

    return R.ok();
}
```

![image-20220510235115019](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.1.png)

#### 2、添加`updateDetail`抽象方法

在`com.atguigu.gulimall.product.service.BrandService`接口里添加`updateDetail`方法

```java
void updateDetail(BrandEntity brand);
```

![image-20220510235219096](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.2.png)

#### 3、实现`updateDetail`抽象方法

在`com.atguigu.gulimall.product.service.impl.BrandServiceImpl`类里实现`updateDetail`抽象方法

```java
@Autowired
CategoryBrandRelationService categoryBrandRelationService;

@Override
public void updateDetail(BrandEntity brand) {
    //保证冗余字段的数据一致
    this.updateById(brand);
    if (StringUtils.hasLength(brand.getName())){
        //同步更新其他关联表中的数据
        categoryBrandRelationService.updateBrand(brand);
        
        //TODO 更新其他关联
    }
}
```

![image-20220511000527982](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.3.png)

#### 4、添加`updateBrand`抽象方法

在`com.atguigu.gulimall.product.service.CategoryBrandRelationService`接口里添加`updateBrand`抽象方法

```java
void updateBrand(BrandEntity brand);
```

![image-20220511000607317](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.4.png)

#### 5、实现`updateBrand`抽象方法

在`com.atguigu.gulimall.product.service.impl.CategoryBrandRelationServiceImpl`类里实现`updateBrand`抽象方法

```java
@Override
public void updateBrand(BrandEntity brand) {
    CategoryBrandRelationEntity categoryBrandRelationEntity = new CategoryBrandRelationEntity();
    categoryBrandRelationEntity.setBrandId(brand.getBrandId());
    categoryBrandRelationEntity.setBrandName(brand.getName());

    LambdaUpdateWrapper<CategoryBrandRelationEntity> lambdaUpdateWrapper = new LambdaUpdateWrapper<>();
    lambdaUpdateWrapper.eq(CategoryBrandRelationEntity::getBrandId,brand.getBrandId());
    this.update(categoryBrandRelationEntity,lambdaUpdateWrapper);
}
```

![image-20220511001114986](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.5.png)

#### 6、测试

##### 1、重启项目前

可以看到当修改品牌名后，关联关系表并没有更新，因此没有正确回显

![GIF 2022-5-11 0-14-16](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.6.1.1.gif)

![image-20220511001742563](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.6.1.2.png)

![image-20220511001759165](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.6.1.3.png)

##### 2、重启项目后

将`华为1`改为`华为`,重启`gulimall-product`项目后，再次测试

可以看到当修改品牌名后，关联关系表已经更新，并且正确回显

（成功后要恢复为原始数据）

![GIF 2022-5-11 0-20-17](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.6.2.1.gif)

![image-20220511002213445](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.6.2.2.png)

![image-20220511002226070](https://gitlab.com/apzs/image/-/raw/master/image/4.4.4.6.2.3.png)

### 4.4.5、保证`Category`数据一致性

#### 1、修改`Category`的`update`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.CategoryController`类里修改`update`方法

```java
@RequestMapping("/update")
    public R update(@RequestBody CategoryEntity category){
    //级联更新
    categoryService.updateCascade(category);

    return R.ok();
}
```

![image-20220511002457753](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.1.png)

#### 2、添加`updateCascade`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.CategoryService`类里添加`updateCascade`抽象方法

```java
void updateCascade(CategoryEntity category);
```

![image-20220511002632061](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.2.png)

#### 3、实现`updateCascade`抽象方法

在`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里实现`updateCascade`抽象方法

```java
@Autowired
CategoryBrandRelationService categoryBrandRelationService;

/**
 * 级联更新所有的数据
 * @param category
 */
@Override
public void updateCascade(CategoryEntity category) {
    this.updateById(category);
    categoryBrandRelationService.updateCategory(category);
}
```

![image-20220511003343110](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.3.png)

#### 4、添加`updateCategory`抽象方法

在`com.atguigu.gulimall.product.service.CategoryBrandRelationService`接口里添加`updateCategory`抽象方法

```java
void updateCategory(CategoryEntity category);
```

![image-20220511003421670](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.4.png)

#### 5、实现`updateCategory`抽象方法

在`com.atguigu.gulimall.product.service.impl.CategoryBrandRelationServiceImpl`类里实现`updateCategory`抽象方法

```java
@Override
public void updateCategory(CategoryEntity category) {
   this.baseMapper.updateCategory(category);
}
```

![image-20220511113803364](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.5..png)

#### 6、添加`updateCategory`抽象方法

在`com.atguigu.gulimall.product.dao.CategoryBrandRelationDao`类添加`updateCategory`抽象方法

```java
void updateCategory(CategoryEntity category);
```

鼠标悬浮在`updateCategory`上或使用`alt+enter`快捷键点击`Generater statement`，如果没有这个选项说明没有安装**MyBatis插件**

没有小鸟图标也可以证明没有安装**MyBatis插件**

![image-20220511123714784](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.6.1.png)

##### :rocket:Mybatis传递多个参数的4种方式

###### 方法1：顺序传参法

```bash
public User selectUser(String name, int deptId);

<select id="selectUser" resultMap="UserResultMap">
    select * from user
    where user_name = #{0} and dept_id = #{1}
</select>
123456
```

\#{}里面的数字代表你传入参数的顺序。

这种方法不建议使用，sql层表达不直观，且一旦顺序调整容易出错。

###### 方法2：@Param注解传参法

```bash
public User selectUser(@Param("userName") String name, int @Param("deptId") deptId);

<select id="selectUser" resultMap="UserResultMap">
    select * from user
    where user_name = #{userName} and dept_id = #{deptId}
</select>
123456
```

\#{}里面的名称对应的是注解 @Param括号里面修饰的名称。
这种方法在参数不多的情况还是比较直观的，推荐使用。

###### 方法3：Map传参法

```bash
public User selectUser(Map<String, Object> params);

<select id="selectUser" parameterType="java.util.Map" resultMap="UserResultMap">
    select * from user
    where user_name = #{userName} and dept_id = #{deptId}
</select>
123456
```

\#{}里面的名称对应的是 Map里面的key名称。

这种方法适合传递多个参数，且参数易变能灵活传递的情况。

###### 方法4：Java Bean传参法

```bash
public User selectUser(User params);

<select id="selectUser" parameterType="com.test.User" resultMap="UserResultMap">
    select * from user
    where user_name = #{userName} and dept_id = #{deptId}
</select>
```

\#{}里面的名称对应的是 User类里面的成员属性。

这种方法很直观，但需要建一个实体类，扩展不容易，需要加属性，看情况使用。

[Mybatis传递多个参数的4种方式]: https://blog.csdn.net/zhaofen_7/article/details/108315918

##### :rocket:添加MyBatis插件

点击`File`-->`Settings...`-->`Plugins`-->搜索`MyBatisX`-->点击`install`

![image-20220511145711068](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.6.2.png)

#### 7、添加`updateCategory`的sql语句

在`src/main/resources/mapper/product/CategoryBrandRelationDao.xml`中添加`updateCategory`的sql语句

```bash
<update id="updateCategory" parameterType="categoryEntity">
    update gulimall_pms.pms_category_brand_relation
    set catelog_name=#{name}
    where catelog_id=#{catId}
</update>
```

![image-20220511124930457](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.7.png)

#### 8、为实体类起别名

在`src/main/resources/application.yml`里添加配置，为`com.atguigu.gulimall.product.entity`包下的实体类起别名

```yaml
mybatis-plus:
  #起别名
  type-aliases-package: com.atguigu.gulimall.product.entity
```

![image-20220511125048450](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.8.png)

#### 9、单元测试

在`src/test/java/com/atguigu/gulimall/product/GulimallProductApplicationTests.java`里添加测试方法

使用MyBatis时dao接口没有实现类，接口是没有办法创建实例的，因此也就无法注入到ioc容器

IDEA检测到没有注入到ioc容器，所有就报红了

可以按`ctrl`键并点击`CategoryBrandRelationDao`,在该类上添加`@Repository`注解，显式的把`BrandDao`添加到ioc容器，就不报红了

```java
@Autowired
CategoryBrandRelationDao categoryBrandRelationDao;
@Test
public void testCategoryBrandRelationDao(){
   CategoryEntity categoryEntity = new CategoryEntity();
   categoryEntity.setCatId(225L);
   categoryEntity.setName("手机2");
   categoryBrandRelationDao.updateCategory(categoryEntity);
}
```

![image-20220511151116797](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.9.1.png)

数据库已经更新

![image-20220511125255539](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.9.2.png)

#### 10、前端测试

把数据在改回来(把`brand_name`为`华为1`的修改为`华为`、把`catelog_name`为`手机2`的修改为`手机`)

然后重启`gulimall-product`项目，刷新前端页面进行测试，可以看到冗余字段已经更新了

（成功后要恢复为原始数据）

![GIF 2022-5-11 15-30-12](https://gitlab.com/apzs/image/-/raw/master/image/4.4.5.10.gif)

### 4.4.6、开启事务功能

#### 1、开启事务功能

在`com.atguigu.gulimall.product.config.MyBatisConfig`配置类里开启事务功能(已经开启过了)

```java
@EnableTransactionManagement
```

![image-20220511004119519](https://gitlab.com/apzs/image/-/raw/master/image/4.4.6.1.png)

#### 2、`updateCascade`方法上添加事务注解

在`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`updateCascade`方法上添加`@Transactional`注解

![image-20220511004035837](https://gitlab.com/apzs/image/-/raw/master/image/4.4.6.2.png)

#### 3、`updateDetail`方法上添加事务注解

在`com.atguigu.gulimall.product.service.impl.BrandServiceImpl`类的`updateDetail`方法上添加`@Transactional`注解

![image-20220511004000692](https://gitlab.com/apzs/image/-/raw/master/image/4.4.6.3.png)

## 4.5、商品服务-API-平台属性

### 4.5.1、规格参数新增与VO

#### 1、修改`queryPage`方法

##### 1、查询全部时有查询条件

url: http://localhost:88/api/product/attrgroup/list/0?t=1652341878270&page=1&limit=10&key=%E4%B8%BB

以前写的只有`catelogId != 0`时才带查询条件,因此输入查询条件，然后点击`查询全部`，并没有根据条件查询全部

![image-20220512160738015](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.1.1.png)

##### 2、以前写的只有`catelogId != 0`时才带查询条件

```java
@Override
public PageUtils queryPage(Map<String, Object> params, Long catelogId) {
    if (catelogId == 0){
        return this.queryPage(params);
    }else {
        String key = (String) params.get("key");
        //select * from attr_group where catelogId = ? and ( attr_group_id = key or attr_group_name like %key%)
        LambdaQueryWrapper<AttrGroupEntity> queryWrapper = new LambdaQueryWrapper<AttrGroupEntity>()
                .eq(AttrGroupEntity::getCatelogId,catelogId);
        if (key != null && key.length() > 0){
            queryWrapper.and((obj)->{
                obj.eq(AttrGroupEntity::getAttrGroupId,key).or().like(AttrGroupEntity::getAttrGroupName,key);
            });
        }
        IPage<AttrGroupEntity> page = this.page(new Query<AttrGroupEntity>().getPage(params),queryWrapper);
        return new PageUtils(page);
    }
}
```

![image-20220512155755111](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.1.2.png)

##### 3、修改`queryPage`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrGroupServiceImpl`里的`queryPage`方法，

使得不管`catelogId`是否等于0，都带上查询条件

```java
@Override
public PageUtils queryPage(Map<String, Object> params, Long catelogId) {
    String key = (String) params.get("key");

    LambdaQueryWrapper<AttrGroupEntity> queryWrapper = new LambdaQueryWrapper<AttrGroupEntity>();

    if (key != null && key.length() > 0) {
        queryWrapper.and(obj -> {
            obj.eq(AttrGroupEntity::getAttrGroupId, key).or().like(AttrGroupEntity::getAttrGroupName, key);
        });
    }


    if (catelogId == 0) {
        //select * from attr_group where ( attr_group_id = key or attr_group_name like %key%)
        IPage<AttrGroupEntity> page = this.page(new Query<AttrGroupEntity>().getPage(params), queryWrapper);
        return new PageUtils(page);
    } else {
        //select * from attr_group where ( attr_group_id = key or attr_group_name like %key%) and catelogId = ?
        queryWrapper.eq(AttrGroupEntity::getCatelogId, catelogId);
        IPage<AttrGroupEntity> page = this.page(new Query<AttrGroupEntity>().getPage(params), queryWrapper);
        return new PageUtils(page);
    }
}
```

```mysql
SELECT attr_group_id,icon,catelog_id,sort,descript,attr_group_name FROM pms_attr_group 
WHERE (( (attr_group_id = ? OR attr_group_name LIKE ?) ) AND catelog_id = ?) LIMIT ?,? 
```

![image-20220512000235143](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.1.3.png)

##### 4、错误写法

```java
@Override
public PageUtils queryPage(Map<String, Object> params, Long catelogId) {
    String key = (String) params.get("key");

    LambdaQueryWrapper<AttrGroupEntity> queryWrapper = new LambdaQueryWrapper<AttrGroupEntity>();

    if (key != null && key.length() > 0) {
        queryWrapper.eq(AttrGroupEntity::getAttrGroupId, key).or().like(AttrGroupEntity::getAttrGroupName, key);
    }


    if (catelogId == 0) {
        //select * from attr_group where ( attr_group_id = key or attr_group_name like %key%)
        IPage<AttrGroupEntity> page = this.page(new Query<AttrGroupEntity>().getPage(params), queryWrapper);
        return new PageUtils(page);
    } else {
        //select * from attr_group where ( attr_group_id = key or attr_group_name like %key%) and catelogId = ?
        queryWrapper.and(obj->obj.eq(AttrGroupEntity::getCatelogId, catelogId));
        IPage<AttrGroupEntity> page = this.page(new Query<AttrGroupEntity>().getPage(params), queryWrapper);
        return new PageUtils(page);
    }
}
```

这样写的`queryWrapper.and(obj->obj.eq(AttrGroupEntity::getCatelogId, catelogId));`使用`and`就没意义了

```mysql
SELECT attr_group_id,icon,catelog_id,sort,descript,attr_group_name FROM pms_attr_group WHERE (attr_group_id = ? OR attr_group_name LIKE ? AND ( (catelog_id = ?) )) LIMIT ?,? 
```

![image-20220512000844124](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.1.4.png)

##### 5、测试

重启`gulimall-product`模块，然后刷新前端页面

重新输入查询条件，然后点击`查询全部`，已经根据条件查询全部了

![image-20220512161159756](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.1.5.png)

#### 2、测试新增属性

##### 1、基础属性

当点击`商品系统`下的`平台属性`下的`规格参数`时，会获取`基础属性`(规格参数，如机身颜色等)的列表

![image-20220512161328451](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.2.1.png)

##### 2、新建属性(规格参数)

![image-20220512162502623](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.2.2.png)

##### 3、保存成功了

![image-20220512162518487](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.2.3.png)

##### 4、但是只是基本保存

只是基本保存，只是保存了是哪个分类的，并没有保存是哪个分组

![image-20220512162814832](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.2.4.1.png)

分类属性保存进来了

![image-20220512163039683](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.2.4.2.png)

但是关联关系没保存

![image-20220512163053494](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.2.4.3.png)

#### 3、修改方法

##### 1、添加`AttrVo`类

由于在实体类里添加字段，然后再标注`@TableField(exist = false)`注解，告诉`MyBatis`该字段不存在是很不规范的，

所以可以使用Vo对象，Vo是用来封装请求和响应数据的，不建议继承实体类，因遵循多实现，少继承的原则

`AttrVo`类里面跟数据库相关的注解就不需要了

在``gulimall-product`模块的`com.atguigu.gulimall.product`包下新建`vo`文件夹

在`com.atguigu.gulimall.product.vo`包下新建`AttrVo`类

```java
package com.atguigu.gulimall.product.vo;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/5/12
 * @Description:
 */
@Data
public class AttrVo {
    /**
     * 属性id
     */
    private Long attrId;
    /**
     * 属性名
     */
    private String attrName;
    /**
     * 是否需要检索[0-不需要，1-需要]
     */
    private Integer searchType;
    /**
     * 属性图标
     */
    private String icon;
    /**
     * 可选值列表[用逗号分隔]
     */
    private String valueSelect;
    /**
     * 属性类型[0-销售属性，1-基本属性，2-既是销售属性又是基本属性]
     */
    private Integer attrType;
    /**
     * 启用状态[0 - 禁用，1 - 启用]
     */
    private Long enable;
    /**
     * 所属分类
     */
    private Long catelogId;
    /**
     * 快速展示【是否展示在介绍上；0-否 1-是】，在sku中仍然可以调整
     */
    private Integer showDesc;

    private Long attrGroupId;
}
```

![image-20220512164302169](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.3.1.png)

**扩展：**

**Object 划分**

###### 1.PO(persistant object) 持久对象

PO 就是对应数据库中某个表中的一条记录，多个记录可以用 PO 的集合。 PO 中应该不包含任何对数据库的操作。

###### 2.DO（Domain Object）领域对象

就是从现实世界中抽象出来的有形或无形的业务实体。

###### 3.TO(Transfer Object) ，数据传输对象

不同的应用程序之间传输的对象

###### 4.DTO（Data Transfer Object）数据传输对象

这个概念来源于 J2EE 的设计模式，原来的目的是为了 EJB 的分布式应用提供粗粒度的数据实体，以减少分布式调用的次数，

从而提高分布式调用的性能和降低网络负载，但在这里，泛指用于展示层与服务层之间的数据传输对象。

###### 5.VO(value object) 值对象

通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已。但应是抽象出的业务对象 , 可以和表对应 , 也可以不 , 

这根据业务的需要 。用 new 关键字创建，由GC 回收的。
View object：视图对象；
接受页面传递来的数据，封装对象
将业务处理完成的对象，封装成页面要用的数据

###### 6.BO(business object) 业务对象

从业务模型的角度看 , 见 UML 元件领域模型中的领域对象。封装业务逻辑的 java 对象 , 通过调用 DAO 方法 , 

结合 PO,VO 进行业务操作。business object: 业务对象 主要作用是把业务逻辑封装为一个对象。

这个对象可以包括一个或多个其它的对象。 比如一个简历，有教育经历、工作经历、社会关系等等。 

我们可以把教育经历对应一个 PO ，工作经历对应一个 PO ，社会关系对应一个 PO 。

 建立一个对应简历的 BO 对象处理简历，每个 BO 包含这些 PO 。 这样处理业务逻辑时，我们就可以针对 BO 去处理。

###### 7.POJO(plain ordinary java object) 简单无规则 java 对象

传统意义的 java 对象。就是说在一些 Object/Relation Mapping 工具中，能够做到维护数据库表记录的 persisent object 完全是一个符合 Java Bean 规范的纯 Java 对象，没有增加别的属性和方法。我的理解就是最基本的 java Bean ，只有属性字段及 setter 和 getter方法！
POJO 是 DO/DTO/BO/VO 的统称。

###### 8.DAO(data access object) 数据访问对象

是一个 sun 的一个标准 j2ee 设计模式， 这个模式中有个接口就是 DAO ，它负持久层的操作。为业务层提供接口。

此对象用于访问数据库。通常和 PO 结合使用， DAO 中包含了各种数据库的操作方法。通过它的方法 , 

结合 PO 对数据库进行相关的操作。夹在业务逻辑与数据库资源中间。配合 VO, 提供数据库的 CRUD 操作

##### 2、修改`save`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController`类的`save`方法

```java
@RequestMapping("/save")
public R save(@RequestBody AttrVo attr) {
    attrService.saveAttr(attr);

    return R.ok();
}
```

![image-20220512165118105](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.3.2.png)

##### 3、添加`saveAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`接口里添加`saveAttr`抽象方法

```java
void saveAttr(AttrVo attr);
```

![image-20220512165526385](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.3.3.png)

##### 4、实现`saveAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里实现`saveAttr`抽象方法

```java
@Override
public void saveAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    //将attr中的数据复制到attrEntity对应的字段里
    BeanUtils.copyProperties(attr,attrEntity);
    //1、保存基本数据
    this.save(attrEntity);
    //2、保存关联关系
    AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
    attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());
    //调用this.save(attrEntity);方法后，会将数据库生成的attrId封装到AttrEntity里面
    attrAttrgroupRelationEntity.setAttrId(attrEntity.getAttrId());
    attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
}
```

![image-20220512171158059](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.3.4.png)

##### 5、测试

重启`gulimall-product`模块，重新添加规格参数

![image-20220512171458466](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.3.5.1.png)

关联关系已经成功保存了

![image-20220512171744173](https://gitlab.com/apzs/image/-/raw/master/image/4.5.1.3.5.2.png)

### 4.5.2、规格参数列表显示

#### 1、添加查询规格参数列表功能

##### 1、查看请求

当点击`规格参数`里的`手机\手机通讯\手机`后，会发送这个请求

 http://localhost:88/api/product/attr/base/list/225?t=1652347219117&page=1&limit=10&key=

![image-20220512172045858](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.1.1.png)

接口文档：[05、获取分类规格参数 - 谷粒商城 - 易文档 (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/Ld1Vfkcd)

![image-20220518194247523](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.1.2.png)

##### 2、添加`baseAttrList`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController`类里添加`baseAttrList`方法

这里的代码有问题，应该为`@GetMapping("/base/list/{categoryId}")`，多写了个`$`

```java
@GetMapping("/base/list/${categoryId}")
public R baseAttrList(@RequestParam Map<String, Object> params,@PathVariable("categoryId") Long categoryId){
    PageUtils page = attrService.queryBaseAttrPage(params,categoryId);
    return R.ok().put("page", page);
}
```

![image-20220512173043820](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.2.png)

##### 3、添加`queryBaseAttrPage`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`接口里添加`queryBaseAttrPage`抽象方法

```java
PageUtils queryBaseAttrPage(Map<String, Object> params, Long categoryId);
```

![image-20220512173145318](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.3.png)

##### 4、实现`queryBaseAttrPage`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里实现`queryBaseAttrPage`抽象方法

```java
@Override
public PageUtils queryBaseAttrPage(Map<String, Object> params, Long categoryId) {
    LambdaQueryWrapper<AttrEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    if (categoryId != 0) {
        lambdaQueryWrapper.eq(AttrEntity::getCatelogId, categoryId);
    }

    String key = (String) params.get("key");
    if (StringUtils.hasLength(key)){
        lambdaQueryWrapper.and((obj)->{
           obj.eq(AttrEntity::getAttrId,key).or().like(AttrEntity::getAttrName,key);
        });
    }
    IPage<AttrEntity> page = this.page(new Query<AttrEntity>().getPage(params), lambdaQueryWrapper);
    return new PageUtils(page);
}
```

![image-20220512174710768](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.4.png)

##### 5、测试

重启`gulimall-product`模块，刷新前端界面

报错了

```
Could not resolve placeholder 'categoryId' in value "/base/list/${categoryId}"
```

![image-20220512175657245](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.5.1.png)

修改代码，删掉`@GetMapping("/base/list/{categoryId}")`里面多写的`$`

```java
@GetMapping("/base/list/{categoryId}")
public R baseAttrList(@RequestParam Map<String, Object> params,@PathVariable("categoryId") Long categoryId){
    PageUtils page = attrService.queryBaseAttrPage(params,categoryId);
    return R.ok().put("page", page);
}
```

![image-20220512231037337](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.5.2.png)

重新启动`gulimall-product`模块，刷新前端界面

已经显示出来了，但是**所属分类**和**所属分组**没有显示

![image-20220512231242187](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.1.5.3.png)

#### 2、显示所属分类和所属分组

##### 1、新建`AttrRespVo`类

在`gulimall-product`模块下的`com.atguigu.gulimall.product.vo`包内新建`AttrRespVo`类，继承`AttrVo`类

**这里的`categoryName`是错的，应该为`catelogName`**

```java
package com.atguigu.gulimall.product.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/5/12
 * @Description:
 */
@Data
public class AttrRespVo extends AttrVo{

    /**
     * 所属分类名   /手机/数码/手机
     */

    private String categoryName;
    /**
     * 所属分组名  主机
     */
    private String groupName;
}
```

![image-20220513000203162](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.1.png)

##### 2、修改`queryBaseAttrPage`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里修改`queryBaseAttrPage`方法

在大型项目中，连表查询很危险，做**笛卡儿积**会使数据量非常大，因此也不推荐使用**外键**，使用`service`来处理表之间的关系

在`streat`的`map`那，IDEA提示建议使用`peek`来代替`map`；`java.util.Stream.peek()`主要用于支持调试。如果流管道不包含终端操作，则不会使用任何元素，并且根本不会调用peek()操作。所以最好不要使用`peek`

```java
@Autowired
CategoryDao categoryDao;
@Autowired
AttrGroupDao attrGroupDao;

@Override
public PageUtils queryBaseAttrPage(Map<String, Object> params, Long categoryId) {
    LambdaQueryWrapper<AttrEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    if (categoryId != 0) {
        //如果有categoryId，则查该categoryId的数据
        lambdaQueryWrapper.eq(AttrEntity::getCatelogId, categoryId);
    }

    String key = (String) params.get("key");
    if (StringUtils.hasLength(key)) {
        lambdaQueryWrapper.and((obj) -> {
            //如果有查询条件，则判断该条件是否 与attrId相等 或 名字包含该条件
            obj.eq(AttrEntity::getAttrId, key).or().like(AttrEntity::getAttrName, key);
        });
    }
    IPage<AttrEntity> page = this.page(new Query<AttrEntity>().getPage(params), lambdaQueryWrapper);

    //查询categoryName字段和groupName字段
    List<AttrEntity> list = page.getRecords();
    List<AttrRespVo> respVos = list.stream().map(attrEntity -> {
        AttrRespVo attrRespVo = new AttrRespVo();
        BeanUtils.copyProperties(attrEntity, attrRespVo);
        //根据attrId到attr和attrgroup的中间表查询 attrgroupId
        LambdaQueryWrapper<AttrAttrgroupRelationEntity> attrAttrgroupRelationQueryWrapper = new LambdaQueryWrapper<>();
        attrAttrgroupRelationQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId, attrEntity.getAttrId());
        //根据attrgroupId查询中间表的该行数据，并封装到对象
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = attrAttrgroupRelationDao.selectOne(attrAttrgroupRelationQueryWrapper);
        if (attrAttrgroupRelationEntity != null) {
            //如果查到attrgroupId，则根据attrgroupId查询attrgroupName，并添加到attrRespVo中
            AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attrAttrgroupRelationEntity.getAttrGroupId());
            attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
        }

        LambdaQueryWrapper<CategoryEntity> categoryQueryWrapper = new LambdaQueryWrapper<>();
        categoryQueryWrapper.eq(CategoryEntity::getCatId, attrEntity.getCatelogId());
        //根据catelogId查询该行数据，并封装到对象
        CategoryEntity categoryEntity = categoryDao.selectOne(categoryQueryWrapper);
        if (categoryEntity != null) {
            attrRespVo.setCategoryName(categoryEntity.getName());
        }
        return attrRespVo;
    }).collect(Collectors.toList());

    PageUtils pageUtils = new PageUtils(page);
    //重新给数据
    pageUtils.setList(respVos);
    return pageUtils;
}
```

##### 3、测试

重启`gulimall-product`模块，刷新前端页面

###### 1、所属分类没有数据，所属分组有数据

![image-20220513102104224](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.3.1.png)

###### 2、查看所属分类绑定的名字

可以看到绑定的名字为`catelogName`，而后端传过来的为`categoryName`

![image-20220513102522427](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.3.2.1.png)

为什么是这个文件呢? 

可以查看就是这个方法发送的请求

![image-20220513102715896](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.3.2.2.png)

###### 3、修改字段名称

修改`gulimall-product`模块`com.atguigu.gulimall.product.vo.AttrRespVo`类的字段

将`categoryName`改为`catelogName`

![image-20220513102854084](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.3.3.1.png)

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`queryBaseAttrPage`方法

将

```java
attrRespVo.setCategoryName(categoryEntity.getName());
```

改为

```java
attrRespVo.setCatelogName(categoryEntity.getName());
```

![image-20220513102940156](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.3.3.2.png)

##### 4、重新测试

重启`gulimall-product`模块，刷新前端页面，已成功显示所属分类

![image-20220513103829286](https://gitlab.com/apzs/image/-/raw/master/image/4.5.2.2.4.png)

### 4.5.3、规格参数修改回显

#### 1、查看需要回显的数据

点击`修改`按钮，可以看到还需要会先拿`属性分类`和`所属分组`,而且我点的是`修改`，这个表单却显示的是修改

![image-20220513104507146](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.1.png)

#### 2、填加`catelogPath`字段

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo.AttrRespVo`类里添加`catelogPath`字段

```java
private Long[] catelogPath;
```

![image-20220513104838259](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.2.png)

#### 3、修改`info`方法

在`gulimall-product`模块里，修改`com.atguigu.gulimall.product.controller.AttrController`类的`info`方法

```java
@RequestMapping("/info/{attrId}")
public R info(@PathVariable("attrId") Long attrId) {
    //AttrEntity attr = attrService.getById(attrId);
    AttrRespVo respVo = attrService.getAttrInfo(attrId);
    return R.ok().put("attr", respVo
    );
}
```

![image-20220513105158303](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.3.png)

#### 4、添加`getAttrInfo`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`接口里添加`getAttrInfo`抽象方法

```java
AttrRespVo getAttrInfo(Long attrId);
```

![image-20220513105520512](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.4.png)

#### 5、实现`getAttrInfo`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里实现`getAttrInfo`抽象方法

```java
@Override
public AttrRespVo getAttrInfo(Long attrId) {
    AttrRespVo attrRespVo = new AttrRespVo();
    //根据attrId到attr表中查该行数据
    AttrEntity attrEntity = this.getById(attrId);
    BeanUtils.copyProperties(attrEntity, attrRespVo);

    LambdaQueryWrapper<AttrAttrgroupRelationEntity> attrAttrgroupRelationQueryWrapper = new LambdaQueryWrapper<>();
    attrAttrgroupRelationQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId, attrId);
    //根据attrId到attrAttrgroupRelation关联关系表里查attrGroupId
    AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = attrAttrgroupRelationDao.selectOne(attrAttrgroupRelationQueryWrapper);
    if (attrAttrgroupRelationEntity != null) {
        attrRespVo.setAttrGroupId(attrAttrgroupRelationEntity.getAttrGroupId());
        //根据attrGroupId到attrGroup表里查groupName
        AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attrAttrgroupRelationEntity.getAttrGroupId());
        if (attrGroupEntity != null) {
            attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
        }
    }

    //根据最后一级分类id到categoryService中查询完整三级分类id
    Long catelogId = attrEntity.getCatelogId();
    Long[] catelogPath = categoryService.findCatelogPath(catelogId);
    if (catelogPath!=null){
        attrRespVo.setCatelogPath(catelogPath);
    }
    return attrRespVo;
}
```

![image-20220513111825693](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.5.png)

#### 6、测试

重启`gulimall-product`模块，刷新前端页面，已成功显示`属性分类`和`所属分组`

![image-20220513112029811](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.6.1.png)

![image-20220513112042807](https://gitlab.com/apzs/image/-/raw/master/image/4.5.3.6.2.png)

### 4.5.4、规格参数修改发送请求

#### 1、前端提交时规则校验失败

##### 1、值类型不能为空

![image-20220513114101205](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.1.png)

##### 2、查看数据

![image-20220513114127890](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.2.png)

##### 3、寻找原因

###### 1、绑定`valueType`

![image-20220513114746867](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.1.png)

###### 2、`valueType`数据字段

![image-20220513115002459](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.2.png)

###### 3、`valueType`校验字段

![image-20220513115126361](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.3.png)

###### 4、初始化方法重新给`valueType`赋值

初始化的时候重新给"valueType"赋值了
很有可能是在这个时候没有获取到"valueType"

![image-20220513115444277](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.4.png)

###### 5、表单提交后重新给`valueType`赋值

表单提交的时候也重新赋值了
但现在表单还没提交，应该不是这里

![image-20220513115757511](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.5.png)

###### 6、查看初始化请求返回的数据

可以看到没有`valueType`字段

![image-20220513120136532](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.6.png)

###### 7、返回对象没有`valueType`字段

![image-20220513120635878](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.7.png)

###### 8、数据库也没有`valueType`字段

![image-20220513120831498](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.3.8.png)

##### 4、数据库添加`valueType`字段

![image-20220513121750821](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.4.png)

##### 5、`pojo`对象添加字段

在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.AttrEntity`类里添加字段

```java
/**
 * 值类型【0-只能单个值，1-允许多个值】
 */
private Integer valueType;
```

![image-20220513122050410](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.5.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo.AttrVo`类里添加字段

![image-20220513122208202](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.5.2.png)

由于`attrRespVo`继承了`attrVo`,所以也有`valueType`字段

![image-20220513122301927](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.5.3.png)

由于使用的是MyBatisPuls，所以**增删查改**会自动将`entity`类的所有需要的字段都带上，因此不需要修改业务代码

##### 6、重新测试

现在提交已经校验成功了

![image-20220513122505664](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.1.6.png)

#### 2、查看请求的URL

请求的URL为：http://localhost:88/api/product/attr/update

![image-20220513222311216](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.2.png)

#### 3、修改

在`gulimall-product`模块里修改`com.atguigu.gulimall.product.controller.AttrController`类的`update`方法

```java
@RequestMapping("/update")
public R update(@RequestBody AttrVo attr) {
    attrService.updateAttr(attr);

    return R.ok();
}
```

![image-20220513222402532](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.3.png)

#### 4、添加`updateAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`接口里添加`updateAttr`抽象方法

```java
void updateAttr(AttrVo attr);
```

![image-20220513222606908](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.4.png)

#### 5、实现`updateAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里实现`updateAttr`抽象方法

![image-20220513224031536](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.5.png)

#### 6、测试

重启`gulimall-product`模块，刷新前端页面

可以看到当没有设置所属分组时，修改失败了，原因就是没有查到`attrId`为该值的数据，因此当查不到数据时应该增加该数据

![GIF 2022-5-13 22-45-38](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.6.1.gif)

当设置了所属分组后，修改正常

![GIF 2022-5-13 22-53-56](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.6.2.gif)

#### 7、修改`updateAttr`方法

在`gulimall-product`模块里修改`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`updateAttr`方法

```java
@Transactional
@Override
public void updateAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    BeanUtils.copyProperties(attr,attrEntity);
    this.updateById(attrEntity);


    AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
    attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());

    LambdaQueryWrapper<AttrAttrgroupRelationEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId,attr.getAttrId());
    Integer count = attrAttrgroupRelationDao.selectCount(lambdaQueryWrapper);
    //如果有attr和attrgroup的关联关系就修改该，没有就新增
    if (count>0) {
        //根据attr_id修改 pms_attr_attrgroup_relation 里的attr_group_id 字段
        attrAttrgroupRelationDao.update(attrAttrgroupRelationEntity, lambdaQueryWrapper);
    }else {
        //添加attr和attrgroup的关联关系
        attrAttrgroupRelationEntity.setAttrId(attr.getAttrId());
        attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
    }
}
```

![image-20220513230716943](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.7.png)

#### 8、重新测试

重启`gulimall-product`模块，刷新前端页面

![GIF 2022-5-13 23-02-23](https://gitlab.com/apzs/image/-/raw/master/image/4.5.4.8.gif)

### 4.5.5、销售属性维护

#### 1、查看`url`

点击`商品系统`下的`平台属性`下的`销售属性`，会发送一个请求，查看销售属性列表

url：http://localhost:88/api/product/attr/sale/list/0?t=1652454755415&page=1&limit=10&key=

![image-20220513231338361](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.1.1.png)

当`pms_attr`表的`attr_type`字段为`0`,则表示的是销售属性

![image-20220513232155146](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.1.2.png)

接口文档: [09、获取分类销售属性 - 谷粒商城 - 易文档 (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/FTx6LRbR)

![image-20220518194022173](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.1.3.png)

#### 2、修改`baseAttrList`方法

在`gulimall-product`模块里修改`com.atguigu.gulimall.product.controller.AttrController`类的`baseAttrList`方法

![image-20220513233818883](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.2.1.png)

![image-20220513233835501](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.2.2.png)

#### 3、转到接口方法

按住`ctrl`键，然后点击`queryBaseAttrPage`，跳转到`com.atguigu.gulimall.product.service.AttrService`类的`queryBaseAttrPage`方法

![image-20220513233933096](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.3.1.png)

![image-20220513233956714](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.3.2.png)

#### 4、修改`queryBaseAttrPage`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`queryBaseAttrPage`方法里添加比较条件

[点击查看`queryBaseAttrPage`方法完整代码](code/4.5.5.4.queryBaseAttrPage.java)

```java
lambdaQueryWrapper.eq(AttrEntity::getAttrType,"base".equalsIgnoreCase(attrType)?1:0);
```

![image-20220513234038547](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.4.png)

#### 5、测试

重启`gulimall-product`模块，刷新前端页面

##### 1、新增`销售属性`

![image-20220513234339081](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.5.1.png)

##### 2、点击`查询全部`

点击查询全部，可以看到请求的url

url: http://localhost:88/api/product/attr/sale/list/0?t=1652456634834&page=1&limit=10&key=

![image-20220513234412544](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.5.2.png)

##### 3、报空指针

`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`queryBaseAttrPage`方法里的这一行报空指针

![image-20220513234555986](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.5.3.png)

##### 4、加个判断

在`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`queryBaseAttrPage`方法里这个位置加个判断

![image-20220513234720363](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.5.4.png)

##### 5、重新测试

重启`gulimall-product`项目，已经正常显示了

![image-20220513234805564](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.5.5.png)

#### 6、修改`销售属性`报错

##### 1、修改`销售属性`

可选值里添加`蓝色`,然后点击确定，成功了

![image-20220516230532173](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.1.1.png)

再次提示，系统未知异常

![image-20220516215335766](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.1.2.png)

##### 2、查看报错

在`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`updateAttr`方法里的`172`行有一个sql语法错误

```
UPDATE pms_attr_attrgroup_relation WHERE (attr_id = ?) 
```

![image-20220516215659753](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.2.png)

##### 3、`attrGroup`没有获取到

可以看到传过来的`attr`里面没有封装`attrGroup`

![image-20220516220802079](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.3.1.png)

查看前端请求，发现修改，没有涉及到`所属分组`，因此没有`attrGroup`属性

![image-20220516221537247](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.3.2.png)

##### 4、查看调用关系

使用以下方法查看调用关系(或按`alt+F7`)

1. 双击`updateAttr`方法
2. 右键，选择`Find Usages`
3. 查看调用

可以看到，只有`AttrController`的`update`方法调用了

![image-20220516223003550](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.4.1.png)

使用以下方法查看调用关系链(或按快捷键`ctrl+alt+H`)

1. 双击`updateAttr`方法
2. 点击`Navigate`
3. 选择`Call Hierarchy`
4. 查看被调用关系链

可以看到，只有`AttrController`的`update`方法调用了

![image-20220516223538909](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.4.2.png)

##### 5、分析

###### 1、查看数据库

查看数据库发现，~~已经新增了一条记录~~，但是`attr_group_id`为null

(其实这条数据不是在调用修改方法新增的数据，而是调用`save`方法新增的数据，调用`save`方法可以看到会执行

`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`saveAttr`方法

```java
@Override
    public void saveAttr(AttrVo attr) {
        AttrEntity attrEntity = new AttrEntity();
        //将attr中的数据复制到attrEntity对应的字段里
        BeanUtils.copyProperties(attr, attrEntity);
        //1、保存基本数据
        this.save(attrEntity);
        //2、保存关联关系
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
        attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());
        //调用this.save(attrEntity);方法后，会将数据库生成的attrId封装到AttrEntity里面
        attrAttrgroupRelationEntity.setAttrId(attrEntity.getAttrId());
        attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
    }
```

此时会在`attr_attrgroup_relation`表里添加数据，此时也只有`attr_id`有值，`attr_group_id`也为`null`)

**先删除这条数据，再进行调试**

![image-20220516231712740](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.5.1.png)

###### 2、执行了`insert`方法

第一次请求时，在`attr_attrgroup_relation`查不到数据(最初写修改`规格参数`时，代表的是新增`规格参数`没有设置`所属分组`的情况)

，所以就插入了一条数据，但是由于是修改`销售属性`，没有`所属分组`选项，自然就没有`attrGroupId`

![image-20220516230926422](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.5.2.png)

###### 3、查看`insert`的sql语句

可以看到只插入了`attr_id`字段

![image-20220516231035665](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.5.3.png)

###### 4、查看数据库

可以看到`attr_group_id`字段为空

![image-20220516231851424](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.5.4.png)

###### 5、再次发送修改`销售属性`请求

再次发送修改`销售属性`请求,可以看到已经查到了一条数据，走到了`update`方法里面去了

此时同样没有`attrGroupId`字段

![image-20220516231421001](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.5.5.png)

###### 6、此时出现了sql语句异常

![image-20220516231604459](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.5.6.png)

##### 6、解决问题

###### 1、`规格参数`和`销售属性`的请求参数一样

点击`规格参数`里的`修改`按钮，可以看到url为: http://localhost:88/api/product/attr/update

![image-20220516233308432](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.1.1.png)

此时有`所属分组`，因此有`attrGroup`属性

此时的`attrType`为`1`，表示的是`规格参数`

![image-20220516233334265](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.1.2.png)

点击`销售属性`里的`修改`按钮，可以看到url为: http://localhost:88/api/product/attr/update

![image-20220516233824438](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.1.3.png)

此时没有有`所属分组`，因此没有`attrGroup`属性

此时的`attrType`为`0`，表示的是`销售属性`

![image-20220516233859672](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.1.4.png)

###### 2、`updateAttr`方法添加关联关系前加一个判断

```java
@Transactional
@Override
public void updateAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    BeanUtils.copyProperties(attr,attrEntity);
    this.updateById(attrEntity);


    AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
    attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());

    LambdaQueryWrapper<AttrAttrgroupRelationEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId,attr.getAttrId());
    Integer count = attrAttrgroupRelationDao.selectCount(lambdaQueryWrapper);
    //如果有attr和attrgroup的关联关系就修改该，没有就新增
    if (count>0) {
        //根据attr_id修改 pms_attr_attrgroup_relation 里的attr_group_id 字段
        attrAttrgroupRelationDao.update(attrAttrgroupRelationEntity, lambdaQueryWrapper);
    }else {
        if (attr.getAttrGroupId()!=null) {
            //添加attr和attrgroup的关联关系
            attrAttrgroupRelationEntity.setAttrId(attr.getAttrId());
            attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
        }
    }
}
```

![image-20220517000120934](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.2.1.png)

此时的`attrType`为`0`，表示的是`销售属性`，没有`attr`和`attrGroup`的`关联关系`,不需要添加

因此也可以这样判断，如果是**基本属性**才添加`attr`和`attrGroup`的`关联关系`

这样想其实不规范，如果是**销售属性**，应该直接不查`attr`和`attrGroup`的`关联关系`，因为**销售属性**没有分组，自然没有它们的关联关系

![image-20220518125355814](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.2.2.png)

###### 3、使用枚举

在`gulimall-common`模块的`src/main/java/com/atguigu/common`文件下新建`constant`文件夹

在`com.atguigu.common.constant`包下新建`ProductConstant`枚举类

```java
package com.atguigu.common.constant;

/**
 * @author 无名氏
 * @date 2022/5/17
 * @Description:
 */
public enum ProductConstant {
    /**
     * 基本属性
     */
    ATTR_TYPE_BASE(1,"基本属性"),
    /**
     * 销售属性
     */
    ATTR_TYPES_SALE(0,"销售属性");

    private int code;
    private String msg;

    ProductConstant(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
```

![image-20220518115507158](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.3.png)

###### 4、修改`updateAttr`方法

修改`gulimall-product`模块下的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`updateAttr`方法

```java
@Transactional
@Override
public void updateAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    BeanUtils.copyProperties(attr,attrEntity);
    this.updateById(attrEntity);


    AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
    attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());

    LambdaQueryWrapper<AttrAttrgroupRelationEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId,attr.getAttrId());
    Integer count = attrAttrgroupRelationDao.selectCount(lambdaQueryWrapper);
    //如果有attr和attrgroup的关联关系就修改该，没有就新增
    if (count>0) {
        //根据attr_id修改 pms_attr_attrgroup_relation 里的attr_group_id 字段
        attrAttrgroupRelationDao.update(attrAttrgroupRelationEntity, lambdaQueryWrapper);
    }else {
        //基本属性
        if (attr.getAttrType()== ProductConstant.ATTR_TYPE_BASE.getCode()) {
            //添加attr和attrgroup的关联关系
            attrAttrgroupRelationEntity.setAttrId(attr.getAttrId());
            attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
        }
    }
}
```

![image-20220518124449446](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.4.1.png)

最好这样写

如果是基本属性，才`更新`或`添加`关联关系

```java
@Transactional
@Override
public void updateAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    BeanUtils.copyProperties(attr, attrEntity);
    this.updateById(attrEntity);

    //如果是基本属性，就更新或添加关联关系
    if (attr.getAttrType() == ProductConstant.ATTR_TYPE_BASE.getCode()) {
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
        attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());

        LambdaQueryWrapper<AttrAttrgroupRelationEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId, attr.getAttrId());
        Integer count = attrAttrgroupRelationDao.selectCount(lambdaQueryWrapper);
        //如果有attr和attrgroup的关联关系就修改该，没有就新增
        if (count > 0) {
            //根据attr_id修改 pms_attr_attrgroup_relation 里的attr_group_id 字段
            attrAttrgroupRelationDao.update(attrAttrgroupRelationEntity, lambdaQueryWrapper);
        } else {
            //添加attr和attrgroup的关联关系
            attrAttrgroupRelationEntity.setAttrId(attr.getAttrId());
            attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
        }
    }
}
```

![image-20220518130019768](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.4.2.png)

###### 5、修改`saveAttr`方法

修改`gulimall-product`模块下的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`saveAttr`方法

```java
@Override
public void saveAttr(AttrVo attr) {
    AttrEntity attrEntity = new AttrEntity();
    //将attr中的数据复制到attrEntity对应的字段里
    BeanUtils.copyProperties(attr, attrEntity);
    //1、保存基本数据
    this.save(attrEntity);
    //2、如果是基本属性,则还要保存关联关系
    if (attr.getAttrType() == ProductConstant.ATTR_TYPE_BASE.getCode()) {
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
        attrAttrgroupRelationEntity.setAttrGroupId(attr.getAttrGroupId());
        //调用this.save(attrEntity);方法后，会将数据库生成的attrId封装到AttrEntity里面
        attrAttrgroupRelationEntity.setAttrId(attrEntity.getAttrId());
        attrAttrgroupRelationDao.insert(attrAttrgroupRelationEntity);
    }
}
```

![image-20220518123217004](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.5.png)

###### 6、修改`queryBaseAttrPage`方法

修改`gulimall-product`模块下的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`queryBaseAttrPage`方法，也使用**枚举**来代表`0`，或者`1`

```java
@Override
public PageUtils queryBaseAttrPage(Map<String, Object> params, Long categoryId, String attrType) {
    LambdaQueryWrapper<AttrEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    //判断是"基本属性"还是"销售属性"
    lambdaQueryWrapper.eq(AttrEntity::getAttrType,
            "base".equalsIgnoreCase(attrType)?
                    ProductConstant.ATTR_TYPE_BASE.getCode():
                    ProductConstant.ATTR_TYPES_SALE.getCode());
    if (categoryId != 0) {
        //如果有categoryId，则查该categoryId的数据
        lambdaQueryWrapper.eq(AttrEntity::getCatelogId, categoryId);
    }

    String key = (String) params.get("key");
    if (StringUtils.hasLength(key)) {
        lambdaQueryWrapper.and((obj) -> {
            //如果有查询条件，则判断该条件是否 与attrId相等 或 名字包含该条件
            obj.eq(AttrEntity::getAttrId, key).or().like(AttrEntity::getAttrName, key);
        });
    }
    IPage<AttrEntity> page = this.page(new Query<AttrEntity>().getPage(params), lambdaQueryWrapper);

    //查询categoryName字段和groupName字段
    List<AttrEntity> list = page.getRecords();
    List<AttrRespVo> respVos = list.stream().map(attrEntity -> {
        AttrRespVo attrRespVo = new AttrRespVo();
        BeanUtils.copyProperties(attrEntity, attrRespVo);
        //根据attrId到attr和attrgroup的中间表查询 attrgroupId
        LambdaQueryWrapper<AttrAttrgroupRelationEntity> attrAttrgroupRelationQueryWrapper = new LambdaQueryWrapper<>();
        attrAttrgroupRelationQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId, attrEntity.getAttrId());
        //根据attrgroupId查询中间表的该行数据，并封装到对象
        if ("base".equalsIgnoreCase(attrType)) {
            AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = attrAttrgroupRelationDao.selectOne(attrAttrgroupRelationQueryWrapper);
            if (attrAttrgroupRelationEntity != null) {
                //如果查到attrgroupId，则根据attrgroupId查询attrgroupName，并添加到attrRespVo中
                AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attrAttrgroupRelationEntity.getAttrGroupId());
                attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
            }
        }

        LambdaQueryWrapper<CategoryEntity> categoryQueryWrapper = new LambdaQueryWrapper<>();
        categoryQueryWrapper.eq(CategoryEntity::getCatId, attrEntity.getCatelogId());
        //根据catelogId查询该行数据，并封装到对象
        CategoryEntity categoryEntity = categoryDao.selectOne(categoryQueryWrapper);
        if (categoryEntity != null) {
            attrRespVo.setCatelogName(categoryEntity.getName());
        }
        return attrRespVo;
    }).collect(Collectors.toList());

    PageUtils pageUtils = new PageUtils(page);
    //重新给数据
    pageUtils.setList(respVos);
    return pageUtils;
}
```

![image-20220518121753838](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.6.png)

###### 7、修改`getAttrInfo`方法

修改`gulimall-product`模块下的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`getAttrInfo`方法

```java
@Override
public AttrRespVo getAttrInfo(Long attrId) {
    AttrRespVo attrRespVo = new AttrRespVo();
    //根据attrId到attr表中查该行数据
    AttrEntity attrEntity = this.getById(attrId);
    BeanUtils.copyProperties(attrEntity, attrRespVo);

    //如果是基本属性，需要设置分组信息
    if (attrEntity.getAttrType()== ProductConstant.ATTR_TYPE_BASE.getCode()) {
        LambdaQueryWrapper<AttrAttrgroupRelationEntity> attrAttrgroupRelationQueryWrapper = new LambdaQueryWrapper<>();
        attrAttrgroupRelationQueryWrapper.eq(AttrAttrgroupRelationEntity::getAttrId, attrId);
        //根据attrId到attrAttrgroupRelation关联关系表里查attrGroupId
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = attrAttrgroupRelationDao.selectOne(attrAttrgroupRelationQueryWrapper);
        if (attrAttrgroupRelationEntity != null) {
            attrRespVo.setAttrGroupId(attrAttrgroupRelationEntity.getAttrGroupId());
            //根据attrGroupId到attrGroup表里查groupName
            AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attrAttrgroupRelationEntity.getAttrGroupId());
            if (attrGroupEntity != null) {
                attrRespVo.setGroupName(attrGroupEntity.getAttrGroupName());
            }
        }
    }

    //根据最后一级分类id到categoryService中查询完整三级分类id
    Long catelogId = attrEntity.getCatelogId();
    Long[] catelogPath = categoryService.findCatelogPath(catelogId);
    if (catelogPath!=null){
        attrRespVo.setCatelogPath(catelogPath);
    }
    return attrRespVo;
}
```

![image-20220518122837889](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.6.6.7.png)

#### 7、测试

重启`gulimall-product`模块，刷新前端页面，点击`销售属性`里的新增

![image-20220518130652375](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.7.1.png)

已经新增成功了

![image-20220518130752310](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.7.2.png)

查看新增的属性的`attrId`

![image-20220518150614220](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.7.3.png)

可以看到已经不再`pms_attr_attrgroup_relation`表里添加关联关系了

![image-20220518150726876](https://gitlab.com/apzs/image/-/raw/master/image/4.5.5.7.4.png)

### 4.5.6、`属性分组`查询&删除分组关联

#### 1、`属性分组`查询分组关联

##### 1、查看请求

点击`商品系统`下的`平台属性`下的`属性分组`,点击操作下的`关联`,会发送一个请求,来查询`属性分组`关联的`销售属性(基本属性)`

url:  http://localhost:88/api/product/attrgroup/1/attr/relation?t=1652858166118

![image-20220518151725272](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.1.1.1.png)

接口文档：[10、获取属性分组的关联的所有属性 - 谷粒商城 - 易文档 (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/LnjzZHPj)

![image-20220518193749778](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.1.1.2.png)

##### 2、添加`attrRelation`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrGroupController`类里添加`attrRelation`方法

```java
@Autowired
private AttrService attrService;

/**
 *  localhost:88/api/product/attrgroup/1/attr/relation?t=1652858166118
 * @return
 */
@GetMapping("/{attrgroupId}/attr/relation")
public R attrRelation(@PathVariable("attrgroupId") Long attrgroupId){
    List<AttrEntity> list = attrService.getRelationAttr(attrgroupId);
    return R.ok().put("data",list);
}
```

![image-20220518154325812](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.1.2.png)

##### 3、添加`getRelationAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`接口里添加`getRelationAttr`抽象方法

![image-20220518154451842](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.1.3.png)

##### 4、实现`getRelationAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里添加方法

实现未实现的`getRelationAttr`抽象方法

![image-20220518154507704](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.1.4.png)

##### 5、测试

重启`gulimall-product`模块，刷新前端页面，重新点击`关联`,可以看到已经显示出来了

![image-20220518154635843](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.1.5.png)

#### 2、`属性分组`删除分组关联

##### 1、查看请求

点击移除按钮，查看请求的url

url:  http://localhost:88/api/product/attrgroup/attr/relation/delete

传递的参数为: `attrId`和`attrGroupId`

![image-20220518155321920](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.1.1.png)

![image-20220518155457971](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.1.2.png)

接口文档：[12、删除属性与分组的关联关系 - 谷粒商城 - 易文档 (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/qn7A2Fht)

![image-20220518194431585](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.1.3.png)

##### 2、新建`AttrGroupRelationVo`类

在`gulimall-product`模块下的`com.atguigu.gulimall.product.vo`包下新建`AttrGroupRelationVo`类

```java
package com.atguigu.gulimall.product.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/5/18
 * @Description:
 */
@Data
public class AttrGroupRelationVo {

    private Long attrId;

    private Long attrGroupId;
}
```

![image-20220518194549006](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.2.png)

##### 3、添加`deleteRelation`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrGroupController`类里添加`deleteRelation`方法

```java
/**
 * localhost:88/api/product/attrgroup/attr/relation/delete
 * @return
 */
@PostMapping("/attr/relation/delete")
public R deleteRelation(AttrGroupRelationVo[] attrGroupRelationVos){
    attrService.deleteRelation(attrGroupRelationVos);
    return R.ok();
}
```

![image-20220518194834132](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.3.png)

##### 4、添加`deleteRelation`抽象方法

在`gulimall-product`模块下的`com.atguigu.gulimall.product.service.AttrService`类里添加`deleteRelation`抽象方法

```java
void deleteRelation(AttrGroupRelationVo[] attrGroupRelationVos);
```

![image-20220518195422431](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.4.png)

##### 5、实现`deleteRelation`抽象方法

在`gulimall-product`模块下的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里实现未实现的`deleteRelation`抽象方法

```java
/**
 * delete from gulimall_pms.pms_attr_attrgroup_relation
 * where (attr_id = 1 and attr_group_id=1)
 * or (attr_id = 2 and attr_group_id=2)
 * or (attr_id = 3 and attr_group_id=3);
 * @param attrGroupRelationVos
 */
@Override
public void deleteRelation(AttrGroupRelationVo[] attrGroupRelationVos) {
    List<AttrAttrgroupRelationEntity> attrAttrgroupRelationEntities = Arrays.stream(attrGroupRelationVos).map((attrGroupRelationVo -> {
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
        BeanUtils.copyProperties(attrGroupRelationVo, attrAttrgroupRelationEntity);
        return attrAttrgroupRelationEntity;
    })).collect(Collectors.toList());

    attrAttrgroupRelationDao.deleteBatchRelation(attrAttrgroupRelationEntities);
}
```

![image-20220518200544137](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.5.png)

##### 6、添加`deleteBatchRelation`抽象方法

在`gulimall-product`模块里的`com.atguigu.gulimall.product.dao.AttrAttrgroupRelationDao`类里

添加`deleteBatchRelation`抽象方法

```java
void deleteBatchRelation(@Param("entities") List<AttrAttrgroupRelationEntity> attrAttrgroupRelationEntities);
```

![image-20220518201025915](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.6.png)

##### 7、添加`deleteBatchRelation`抽象方法的sql语句

在`gulimall-product`模块的`src/main/resources/mapper/product/AttrAttrgroupRelationDao.xml`文件里添加sql语句

```xml
<!--批量删除attr_attrgroup_relation-->
<!--
    delete from gulimall_pms.pms_attr_attrgroup_relation
    where (attr_id = 1 and attr_group_id=1)
    or (attr_id = 2 and attr_group_id=2)
    or (attr_id = 3 and attr_group_id=3);
-->
<delete id="deleteBatchRelation">
    delete from gulimall_pms.pms_attr_attrgroup_relation where
    <foreach collection="entities" item="item" separator=" or ">
        (attr_id = #{item.attrId} and attr_group_id=#{item.attrGroupId})
    </foreach>
</delete>
```

![image-20220518201815102](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.7.png)

##### 8、测试

重启`gulimall-product`模块，刷新前端页面

点击`属性分组`下`操作`下里的`关联`,点击`删除`，显示`系统未知异常`

###### 1、系统未知异常

![image-20220518202518600](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.8.1.png)

###### 2、查看报错信息

查看`gulimall-product`模块的控制台的报错信息

```
No primary or default constructor found for class [Lcom.atguigu.gulimall.product.vo.AttrGroupRelationVo;
没有找到类 [Lcom.atguigu.gulimall.product.vo.AttrGroupRelationVo; 的主要或默认构造函数；
```

![image-20220518202535851](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.8.2.png)

###### 3、加`@RequestBody`注解

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrGroupController`类里修改`deleteRelation`方法

![image-20220518202629893](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.8.3.png)

###### 4、重新测试

![image-20220518202749246](https://gitlab.com/apzs/image/-/raw/master/image/4.5.6.2.8.4.png)

### 4.5.7、`属性分组`查询分组未关联的属性

#### 1、查看请求

点击`新建关联`会发送一个请求，查询**本分类下，没有被其他分组关联的属性**

(比方说`主机`**属性分组**查询 `手机/手机通讯/手机`下的未被其他**属性分组**关联的**基本属性**)

![image-20220518204930720](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.1.1.png)

接口地址：[13、获取属性分组没有关联的其他属性 - 谷粒商城 - 易文档 (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/d3EezLdO)

![image-20220520093458443](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.1.2.png)

#### 2、添加`attrNoRelation`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrGroupController`类里添加`attrNoRelation`方法

```java
/**
 * 查询本分类下，没有被其他分组关联的属性
 * (比方说"主机"属性分组查询 "手机/手机通讯/手机"下的未被其他属性分组关联的基本属性)
 * localhost:88/api/product/attrgroup/1/noattr/relation?t=1652878342763&page=1&limit=10&key=
 * @param attrgroupId 属性分组id
 * @param params      分页参数
 * @return
 */
@GetMapping("/{attrgroupId}/noattr/relation")
public R attrNoRelation(@PathVariable("attrgroupId") Long attrgroupId,@RequestParam Map<String, Object> params){
    PageUtils page = attrService.getNoRelationAttr(attrgroupId,params);
    return R.ok().put("page",page);
}
```

![image-20220518210857053](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.2.png)

#### 3、添加`getNoRelationAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`类里添加`getNoRelationAttr`抽象方法

```java
PageUtils getNoRelationAttr(Long attrgroupId, Map<String, Object> params);
```

![image-20220518210924259](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.3.png)

#### 4、实现`getNoRelationAttr`抽象方法

在`gulimall-product`模块下的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里添加未实现的`getNoRelationAttr`抽象方法

```java
/**
 * 查询本分类下，没有被其他分组关联的属性
 * (比方说"主机"属性分组查询 "手机/手机通讯/手机"下的未被其他属性分组关联的基本属性)
 * localhost:88/api/product/attrgroup/1/noattr/relation?t=1652878342763&page=1&limit=10&key=
 * @param attrgroupId 属性分组id
 * @param params      分页参数
 * @return            分页对象
 */
@Override
public PageUtils getNoRelationAttr(Long attrgroupId, Map<String, Object> params) {
    //1、查询该attrgroupId的catelogId(当前分组只能关联自己所属的分类里面的所有属性)
    AttrGroupEntity attrGroupEntity = attrGroupDao.selectById(attrgroupId);
    Long catelogId = attrGroupEntity.getCatelogId();

    //2、当前分组只能关联本分类下的其他分组没有引用的属性
    //2.1)、当前分类下的其他分组
    LambdaQueryWrapper<AttrGroupEntity> attrGroupQueryWrapper = new LambdaQueryWrapper<>();
    //ne：not equal
    attrGroupQueryWrapper.eq(AttrGroupEntity::getCatelogId,catelogId).ne(AttrGroupEntity::getAttrGroupId,attrgroupId);
    List<AttrGroupEntity> otherGroups = attrGroupDao.selectList(attrGroupQueryWrapper);
    List<Long> otherAttrGroupIds = otherGroups.stream().map(AttrGroupEntity::getAttrGroupId).collect(Collectors.toList());

    LambdaQueryWrapper<AttrEntity> attrQueryWrapper = new LambdaQueryWrapper<>();
    attrQueryWrapper.eq(AttrEntity::getCatelogId, catelogId);
    //2.2)、如果有其他分组，则查询这些分组关联的属性
    //otherAttrGroupIds!=null && 有些多余
    if (otherAttrGroupIds!=null && otherAttrGroupIds.size()>0) {
        LambdaQueryWrapper<AttrAttrgroupRelationEntity> attrAttrgroupRelationQueryWrapper = new LambdaQueryWrapper<>();
        attrAttrgroupRelationQueryWrapper.in(AttrAttrgroupRelationEntity::getAttrGroupId, otherAttrGroupIds);
        List<AttrAttrgroupRelationEntity> otherAttrAttrgroupRelations = attrAttrgroupRelationDao.selectList(attrAttrgroupRelationQueryWrapper);
        List<Long> otherAttrIds = otherAttrAttrgroupRelations.stream().map(AttrAttrgroupRelationEntity::getAttrId).collect(Collectors.toList());
        //2.3)、如果有已被关联的属性，则从当前分类的所有属性中移除这些已被关联的属性;
        if (otherAttrIds!=null && otherAttrIds.size()>0) {
            attrQueryWrapper.notIn(AttrEntity::getAttrId, otherAttrIds);
        }
    }
    //如果有查询条件，则添加查询条件
    String key = (String) params.get("key");
    if (StringUtils.hasLength(key)){
        attrQueryWrapper.and(item->{
            item.eq(AttrEntity::getAttrId,key).or().like(AttrEntity::getAttrName,key);
        });
    }
    IPage<AttrEntity> page = this.page(new Query<AttrEntity>().getPage(params), attrQueryWrapper);
    return new PageUtils(page);
}
```

![image-20220518225631000](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.4.png)

#### 5、测试

重启`gulimall-product`模块，刷新前端页面

##### 1、已经显示出来了

![image-20220518225512338](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.5.1.png)

##### 2、还显示了销售属性

![image-20220518230754485](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.5.2.1.png)

![image-20220518230708756](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.5.2.2.png)

##### 3、修改实现类的`getNoRelationAttr`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`getNoRelationAttr`方法

```java
attrQueryWrapper.eq(AttrEntity::getAttrType,ProductConstant.ATTR_TYPE_BASE.getCode());
```

![image-20220518230935342](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.5.3.png)

##### 4、重新测试

重启`gulimall-product`模块，刷新前端页面

已经不显示销售属性了

![image-20220518231201080](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.5.4.png)

#### 6、修改关联关系

##### 1、重新查询

删除**该分类下**其他`属性分组`与`基本属性`的**关联关系**后，再重新查询，发现可以查询出来

![1](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.6.1.1.png)

##### 2、添加关系

在`gulimall_pms`数据库下的`pms_attr_attrgroup_relation`表里添加一行数据

使`主机`组关联`入网型号`

![image-20220518232418576](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.6.2.1.png)

![image-20220518233043776](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.6.2.2.png)

##### 3、还可以再次关联`入网型号`

可以看到关联`入网型号`后，还可以再次关联`入网型号`

![image-20220518233117780](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.6.3.png)

##### 4、修改`getNoRelationAttr`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`getNoRelationAttr`方法

删除`.ne(AttrGroupEntity::getAttrGroupId,attrgroupId)`，取消排除本分组

查询所有分组(包括本分组，因为本分组已经关联的属性，不能再次关联)

![image-20220518233615200](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.6.4.png)

##### 5、重新测试

重启`gulimall-product`模块，刷新前端页面

可以看到关联`入网型号`后，不可以再次关联`入网型号`

![image-20220518234041402](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.6.5.png)

#### 7、模糊查询

##### 1、根据`属性id`

![image-20220518234459174](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.7.1.1.png)

![image-20220518234430923](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.7.1.2.png)

##### 2、根据`属性名`

![image-20220518234352730](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.7.2.1.png)

![image-20220518234413311](https://gitlab.com/apzs/image/-/raw/master/image/4.5.7.7.2.2.png)

可以看到，模糊查询没有什么问题

### 4.5.8、`属性分组`添加关联关系

#### 1、查看请求

先删除`主机`和`入网型号`的关联关系，再重新添加,查看url

url: http://localhost:88/api/product/attrgroup/attr/relation

![image-20220518235355704](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.1.1.png)

查询参数

![image-20220518235618863](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.1.2.png)

接口文档：[11、添加属性与分组关联关系 - 谷粒商城 - 易文档 (easydoc.net)](https://easydoc.net/s/78237135/ZUqEdvA4/VhgnaedC)

![image-20220518235700293](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.1.3.png)

#### 2、添加`addRelation`方法

在`gulimall-product`模块里的`com.atguigu.gulimall.product.controller.AttrGroupController`类里添加`addRelation`方法

```java
@Autowired
private AttrAttrgroupRelationService attrAttrgroupRelationService;

/**
 * localhost:88/api/product/attrgroup/attr/relation
 */
@PostMapping("/attr/relation")
public R addRelation(@RequestBody List<AttrGroupRelationVo> attrGroupRelationVos){
    attrAttrgroupRelationService.saveBatch(attrGroupRelationVos);
    return R.ok();
}
```

![image-20220519160608120](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.2.png)

#### 3、添加`saveBatch`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrAttrgroupRelationService`接口里添加`saveBatch`抽象方法

```java
void saveBatch(List<AttrGroupRelationVo> attrGroupRelationVos);
```

![image-20220519160636605](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.3.png)

#### 4、实现`saveBatch`抽象方法

在`gulimall-product`模块里的`com.atguigu.gulimall.product.service.impl.AttrAttrgroupRelationServiceImpl`类里实现`saveBatch`抽象方法

```java
@Override
public void saveBatch(List<AttrGroupRelationVo> attrGroupRelationVos) {
    List<AttrAttrgroupRelationEntity> attrAttrgroupRelationEntities = attrGroupRelationVos.stream().map((item) -> {
        AttrAttrgroupRelationEntity attrAttrgroupRelationEntity = new AttrAttrgroupRelationEntity();
        BeanUtils.copyProperties(item, attrAttrgroupRelationEntity);
        return attrAttrgroupRelationEntity;
    }).collect(Collectors.toList());

    this.saveBatch(attrAttrgroupRelationEntities);
}
```

![image-20220519161255770](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.4.png)

#### 5、测试

重启`gulimall-product`模块，刷新前端页面，添加`属性分组`里的关联关系

##### 1、添加关联关系

![GIF 2022-5-19 16-11-17](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.1.gif)

##### 2、新增`规格参数`

![image-20220519162129172](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.2.png)

##### 3、新增成功，但是没有显示出来

![image-20220519162615473](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.3.png)

##### 4、报空指针异常

在`gulimall-product`模块里的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`queryBaseAttrPage`方法的这一行报空指针

很明显，`attrRespVo`对象是`103`行`new`出来的，不会是空指针

只有`attrGroupEntity`是查出来，然后返回的对象，有可能在数据库中没找到

![image-20220519163106480](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.4.1.png)

传入的`attr_group_id`为`null`，数据库肯定查不到数据，所以返回`0`行数据，接收的``attrGroupEntity`自然为`null`

![image-20220519163207584](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.4.2.png)

##### 5、多加一个判断

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`queryBaseAttrPage`方法里 将`if (attrAttrgroupRelationEntity != null)`改为

`if (attrAttrgroupRelationEntity != null && attrAttrgroupRelationEntity.getAttrGroupId()!=null) `

![image-20220519164444114](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.5.png)

同理，也应该修改其他类似代码

##### 6、修改`saveAttr`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`saveAttr`方法里

将`if (attr.getAttrType() == ProductConstant.ATTR_TYPE_BASE.getCode())`改为

`if (attr.getAttrType() == ProductConstant.ATTR_TYPE_BASE.getCode() && attr.getAttrGroupId()!=null) `

![image-20220519165943509](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.6.png)

##### 7、修改`updateAttr`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里的`updateAttr`方法里

将`if (attr.getAttrType() == ProductConstant.ATTR_TYPE_BASE.getCode())`改为

`if (attr.getAttrType() == ProductConstant.ATTR_TYPE_BASE.getCode() && attr.getAttrGroupId()!=null) `

![image-20220519174303778](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.5.7.png)

#### 6、重新测试

重启`gulimall-product`模块，刷新前端页面

##### 1、查询全部

可以看到，刚刚添加的`机身颜色`已经显示出来了

![image-20220519175025352](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.1.png)

##### 2、建立关联关系

在`商品系统/平台属性/属性分组`里建立关联关系也没有问题

![GIF 2022-5-19 17-54-56](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.2.gif)

##### 3、再次点击`规格参数`，查询不到数据

再次点击`规格参数`，又查询不到数据了

![image-20220519180029672](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.3.png)

##### 4、查看控制台

查看`gulimall-product`模块的控制台，可以看到查询到了两条数据，而需要的是`0`条或`1`条数据(**查不到数据**或**只查询到一条数据**)

```bash
nested exception is org.apache.ibatis.exceptions.TooManyResultsException: Expected one result (or null) to be returned by selectOne(), but found: 2
嵌套异常是 org.apache.ibatis.exceptions.TooManyResultsException：期望 selectOne() 返回一个结果（或 null），但发现：2
```

![image-20220519180338886](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.4.png)

##### 5、查看数据库

在`gulimall_pms`数据库下的`pms_attr_attrgroup_relation`表里将`attr_id`=`6`并且`attr_group_id`为`null`的字段删掉

也把`attr_id`为`4`的也删除掉，`attr_id`为`4`的是销售属性，不需要关联关系(这是以前修改代码前，插入的错误数据)

![image-20220519181010383](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.5.1.png)

![image-20220519213127175](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.5.2.png)

##### 6、刷新前端页面

![image-20220519213334536](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.6.6.png)

#### 7、`规格参数`测试

在`规格参数`里修改`所属分组`

![GIF 2022-5-19 21-35-51](https://gitlab.com/apzs/image/-/raw/master/image/4.5.8.7.gif)

不过这样做并不规范，最好在添加关联关系的时候查询一下再添加，防止恶意攻击

## 4.6、商品服务-API-新增商品

### 4.6.1、调试会员等级相关接口

#### 1、发送请求

##### 1、本应该发送的请求

点击`/商品系统/商品维护/发送商品`,这是应该发送这个请求，

调用`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberLevelController`类的`list`方法

url:  http://localhost:88/api/member/memberlevel/list?t=1652972635593&page=1&limit=500

![dddd](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.1.png)

##### 2、我的发送的请求

可以看到，我这里只发送了两给`tree`请求，并没有发送应该发送的请求

![image-20220519225349292](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.2.png)

##### 3、方法一(非常不推荐)

###### 1、查看发送请求的方法

这个请求是`src\views\modules\product\spuadd.vue`文件的`getMemberLevels`方法发送的

![image-20220519230722823](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.3.1.png)

###### 2、在`created`阶段，调用该方法

```javascript
this.getMemberLevels();
```

其实在`mounted`中调用这个方法了，但是`mounted`里先用的`PubSub`报错了，所以没执行

![image-20220519230014448](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.3.2.png)

###### 3、查看请求

可以看到已经发送这个请求了

url: http://localhost:88/api/member/memberlevel/list?t=1652972635593&page=1&limit=500

![image-20220519225853391](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.3.3.png)

##### 4、方法二(建议)

###### 1、控制台报错

```
PubSub is not defined ：PubSub 未定义
```

![image-20220519233039674](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.1.png)

###### 2、安装 pubsub-js

```
npm install --save pubsub-js
```

![image-20220520000459261](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.2.png)

###### 3、提升权限

**方法一：**

以管理员身份运行"VS Code"

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.3.1.png" alt="image-20220519234508600" style="zoom:50%;" />



**~~方法二：(不是这个用户)~~**

1. 打开nodejs的安装目录
2. 点击"npm_cache",右键选择"属性"
3. 选择"SYSTEM"
4. 点击"编辑"
5. 选择"Authenticated Users"
6. 点击完全控制
7. 点击确定

![image-20220519235446253](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.3.2.png)

1. 打开nodejs的安装目录
2. 点击"npm_gloa",右键选择"属性"
3. 选择"SYSTEM"
4. 点击"编辑"
5. 选择"Authenticated Users"
6. 点击完全控制
7. 点击确定

![image-20220520000204114](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.3.3.png)

###### 4、重新安装 pubsub-js

![image-20220519232622362](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.4.png)

###### 5、导入`pubsub-js`

在`B:\renren-fast-vue\src\views\modules\product\spuadd.vue`文件里的`<script>`标签里导入`pubsub-js`

```javascript
import PubSub from "pubsub-js";
```

![image-20220519234016831](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.5.png)

###### 6、查看发送的请求

重启后，已经发送这个请求了

![image-20220519232903557](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.6.png)

###### 7、接口文档

url： https://easydoc.net/s/78237135/ZUqEdvA4/jCFganpf

![image-20220520092904263](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.1.4.7.png)

#### 2、加入注册中心

在`gulimall-member`的`src\main\resources\application.yml`配置文件中添加配置，加入到注册中心(已经配置过了)

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
```

![image-20220520085328741](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.2.png)

#### 3、添加配置中心

可以在`gulimall-member`模块的`src\main\resources`里新建`bootstrap.properties`文件，添加配置中心(在这里就先不做了)

![image-20220520085535283](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.3.png)

#### 4、开启服务注册与发现功能

可以在`gulimall-member`模块的`com.atguigu.gulimall.member.GulimallMemberApplication`类里

添加`@EnableDiscoveryClient`注解，开启服务注册与发现功能(这个已经做了)

![image-20220520085840532](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.4.png)

#### 5、添加`list`方法

在`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberLevelController`类里添加`list`方法

其实这个方法已经写好了，没有访问成功的原因是**没有启动`gulimall-member`模块**，并且**没有配置`gulimall-member`模块的网关**

![image-20220520093657422](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.5.png)

#### 6、添加路由规则

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件中添加路由规则，匹配`gulimall-member`模块

```yaml
- id: member_route
  uri: lb://gulimall-member
  predicates:
    - Path=/api/member/**
  filters:
    #http://localhost:88/api/member/memberlevel/list 变为 http://localhost:8000/member/memberlevel/list
    - RewritePath=/api/(?<segment>/?.*),/$\{segment}
```

![image-20220520100339120](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.6.png)

#### 7、访问接口

##### 1、直接访问成功

直接访问没有问题 http://localhost:8000/member/memberlevel/list

![image-20220520100105298](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.7.1.png)

##### 2、通过网关访问失败

通过网关访问失败： http://localhost:88/api/member/memberlevel/list

![image-20220520100123403](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.7.2.png)

#### 8、查找原因

##### 1、查看控制台

```
nacos registry, gulimall-member 192.168.19.1:8000 register finished
nacos 注册，gulimall-member 192.168.19.1:8000 注册完成
```

控制台显示已经注册成功了

![image-20220520095821795](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.1.png)

##### 2、查看报错

这个是`NacosConfigProperties`的报错，不用管，现在还没有配置`配置中心`

![image-20220520095757543](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.2.png)

##### 3、查看`服务列表`

url：http://localhost:8848/nacos

用户名和密码都为 `nacos`

可以看到没有发现`gulimall-member`这个服务

![image-20220520100857910](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.3.png)

##### 4、查看网关控制台

可以看到`gulimall-gateway`模块的控制台显示，已正确匹配到了`gulimall-member`模块

![image-20220520100931896](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.4.png)

##### 5、关闭`隐藏空服务`

关闭`服务管理/服务列表`里的`隐藏空服务`,这时可以看到`gulimall-member`服务,不过是空服务，`实例数`和`健康实例数`都为`0`

这个服务是用代码注册进去的，而不是点`创建服务`创建的，应该不会出现是空服务啊

![image-20220520102947342](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.5.png)

##### 6、重启`nacos`

关闭`nacos`，再重新打开

![image-20220520104734701](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.6.png)

##### 7、刷新`nacos`的页面

打开`服务管理/服务列表`里的`隐藏空服务`,这时还可以看到`gulimall-member`服务,`实例数`和`健康实例数`也都为`1`了

![image-20220520103649758](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.7.png)

##### 8、重新通过网关访问

url：http://localhost:88/api/member/memberlevel/list

重新刷新通过网关访问的页面，这时已经访问成功了，真是奇葩:rage:

![image-20220520103733124](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.8.8.png)

#### 9、请求成功

url：http://localhost:88/api/member/memberlevel/list?t=1652972635593&page=1&limit=500

![image-20220520105207935](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.9.png)

#### 10、接口文档

url： https://easydoc.net/s/78237135/ZUqEdvA4/jCFganpf

![4.6.1.10](https://gitlab.com/apzs/image/-/raw/master/image/4.6.1.10.png)

### 4.6.2、查询包含本分类的所以品牌

#### 1、复制代码

**复制之前建议先备份**

1. 打开"1.分布式基础（全栈开发篇）\资料源码.zip\docs\代码\前端\modules"目录
2. 选择这些文件(也可以全选)(**建议全选复制，不然后面会有报错**)
3. 选择"src/views'目录下的"moudules",然后右键
4. 选择"在文件资源管理器中显示"
5. 进入"modules"文件夹
6. 右键，选择"粘贴"，粘贴到这里面

![image-20220520110715920](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.1.1.png)

然后点击`替换目标中的文件`

![image-20220520110731311](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.1.2.png)

#### 2、添加会员等级

##### 1、应该有个测试数据

点击`用户系统/会员等级`,应该会有个测试数据

![image-20220520111518924](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.2.1.png)

##### 2、不过我没有

![image-20220520111430051](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.2.2.png)

##### 3、添加`普通会员`

`普通会员`设置为`默认等级`

![image-20220520111355788](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.2.3.png)

##### 4、添加`铜牌会员`

![image-20220520111821514](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.2.4.png)

##### 5、添加`银牌会员`

![image-20220520112008322](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.2.5.png)

#### 3、又缺少了这个请求

又少了这个请求:  http://localhost:88/api/member/memberlevel/list?t=1652972635593&page=1&limit=500

![image-20220520113911427](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.3.1.png)

再把`pubsub-js`引进来就行了

在`B:\renren-fast-vue\src\views\modules\product\spuadd.vue`文件里的`<script>`标签里导入`pubsub-js`

```javascript
import PubSub from "pubsub-js";
```

![image-20220520113858591](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.3.2.png)

请求已经出来了

![image-20220520114016202](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.3.3.png)

#### 4、`选择分类`后缺少了一个请求

当选择完`选择分类`后，应该发送一个请求，但是我的没有发送，并且在选择完`选择分类`后控制台报了两个错

url： http://localhost:88/api/product/categorybrandrelation/brands/list?t=1653047129509&catId=225

![image-20220520115525930](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.4.1.png)

```
vue.esm.js?efeb:591 [Vue warn]: Error in callback for watcher "paths": "TypeError: Cannot read properties of undefined (reading 'publish')"
[Vue 警告]：观察者“路径”的回调错误：“TypeError：无法读取未定义的属性（正在读取'publish'）”
vue.esm.js?efeb:1741 TypeError: Cannot read properties of undefined (reading 'publish')
TypeError：无法读取未定义的属性（读取“publish”）
```

![image-20220520115547934](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.4.2.png)

#### 5、添加`pubsub-js`到全局

删掉在`B:\renren-fast-vue\src\views\modules\product\spuadd.vue`文件里的`<script>`标签里导入的`pubsub-js`

![image-20220520120720294](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.5.1.png)

在`src\main.js`里导入并使用`pubsub-js`

```java
import PubSub from 'pubsub-js'
Vue.prototype.PubSub = PubSub
```

![image-20220520120813028](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.5.2.png)

在`.eslintrc.js`里全局使用`PubSub`

```javascript
,
  globals: {
    PubSub: true,
  }
```

![image-20220520120827362](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.5.3.png)

已经发送请求了：http://localhost:88/api/product/categorybrandrelation/brands/list?t=1653047129509&catId=225

![image-20220520120954196](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.5.4.png)

接口文档: https://easydoc.net/s/78237135/ZUqEdvA4/HgVjlzWV

![image-20220520201548014](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.5.5.png)

#### 6、新建`BrandVo`类

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包里新建`BrandVo`类

```java
package com.atguigu.gulimall.product.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/5/20
 * @Description:
 */
@Data
public class BrandVo {
    /**
     * 品牌id
     */
    private Long brandId;
    /**
     * 品牌名字
     */
    private String brandName;
}
```

![image-20220520203545414](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.6.png)

#### 7、新建`relationBrandsList`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.CategoryBrandRelationController`类里

新建`relationBrandsList`方法

```java
/**
 *  localhost:88/api/product/categorybrandrelation/brands/list?t=1653048395592&catId=225
 *  获取分类关联的品牌
 *  1、Controller:处理请求，接受和校验数据
 *  2、Service接受controller传来的数据，进行业务处理
 *  3、Controller接受service处理完的数据，封装页面指定的vo
 * @return
 */
@GetMapping("/brands/list")
public R relationBrandsList(@RequestParam(value = "catId",required = true) Long catId){
    List<BrandEntity> brandEntities = categoryBrandRelationService.getBrandsByCatId(catId);
    List<BrandVo> brandVos = brandEntities.stream().map((item) -> {
        BrandVo brandVo = new BrandVo();
        brandVo.setBrandId(item.getBrandId());
        brandVo.setBrandName(item.getName());
        return brandVo;
    }).collect(Collectors.toList());
    return R.ok().put("data",brandVos);
}
```

![image-20220520214042927](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.7.png)

#### 8、添加`getBrandsByCatId`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.CategoryBrandRelationService`接口里

添加`getBrandsByCatId`抽象方法

```java
List<BrandEntity> getBrandsByCatId(Long catId);
```

![image-20220520203454859](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.8.png)

#### 9、实现`getBrandsByCatId`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryBrandRelationServiceImpl`类里

实现`getBrandsByCatId`抽象方法

```java
@Override
public List<BrandEntity> getBrandsByCatId(Long catId) {
    LambdaQueryWrapper<CategoryBrandRelationEntity> categoryBrandRelationQueryWrapper = new LambdaQueryWrapper<>();
    categoryBrandRelationQueryWrapper.eq(CategoryBrandRelationEntity::getCatelogId,catId);
    List<CategoryBrandRelationEntity> categoryBrandRelationEntities = this.baseMapper.selectList(categoryBrandRelationQueryWrapper);

    List<Long> brandIds = categoryBrandRelationEntities.stream().
            map(CategoryBrandRelationEntity::getBrandId).collect(Collectors.toList());
    List<BrandEntity> brandEntities = brandDao.selectBatchIds(brandIds);
    return brandEntities;
}
```

![image-20220520204754999](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.9.png)

#### 10、测试

重启`gulimall-product`模块，刷新前端页面，

##### 1、已经发送请求了

![image-20220520204950145](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.10.1.png)

##### 2、查看返回的数据

![image-20220520205355868](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.10.2.png)

##### 3、将`手机1`改为`手机`

将`gulimall_pms`数据库中的`pms_category_brand_relation`表里的`name`为`手机1`的字段改为`手机`

![image-20220520205434818](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.10.3.png)

##### 4、添加别的品牌的`关联分类`

![GIF 2022-5-20 20-58-33](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.10.4.png)

##### 5、选择品牌

选择好`选择分类`后，可以看到已返回分类包含`手机/手机通讯/手机`的所有品牌，点击`选择品牌`的选择框后，可以显示这些品牌

![image-20220520210139905](https://gitlab.com/apzs/image/-/raw/master/image/4.6.2.10.5.png)

### 4.6.3、获取分类下所有分组&关联属性

#### 1、查看请求

##### 1、设置`基本信息`

`基本信息`设置完成后，点击`下一步：设置基本参数`，这时会发送一个请求

url：http://localhost:88/api/product/attrgroup/225/withattr?t=1653056166646

(这里的数据随便填填就行了，现在也不会提交的数据库)

(图片上传失败是因为`gulimall-third-party`模块没启动)

![image-20220520220205600](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.1.1.png)

##### 2、查看请求

url：http://localhost:88/api/product/attrgroup/225/withattr?t=1653056166646

![image-20220520215846566](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.1.2.png)

##### 3、接口文档

接口文档在`商品系统/17、获取分类下所有分组&关联属性`里：https://easydoc.net/s/78237135/ZUqEdvA4/6JM6txHf

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.1.3.png" alt="image-20220520221908190" style="zoom:50%;" />

#### 2、新建`AttrGroupWithAttrsVo`类

在`gulimall-product`的`com.atguigu.gulimall.product.vo`包下新建`AttrGroupWithAttrsVo`类

复制`com.atguigu.gulimall.product.entity.AttrGroupEntity`类的字段，并删掉数据库相关注解

调整`AttrGroupWithAttrsVo`类，修改成我们需要的`vo`对象

```java
package com.atguigu.gulimall.product.vo;


import com.atguigu.gulimall.product.entity.AttrEntity;
import lombok.Data;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/5/20
 * @Description:
 */
@Data
public class AttrGroupWithAttrsVo {
    /**
     * 分组id
     */
    private Long attrGroupId;
    /**
     * 组名
     */
    private String attrGroupName;
    /**
     * 排序
     */
    private Integer sort;
    /**
     * 描述
     */
    private String descript;
    /**
     * 组图标
     */
    private String icon;
    /**
     * 所属分类id
     */
    private Long catelogId;

    private List<AttrEntity> attrs;

}
```

![image-20220520233852985](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.2.png)

#### 3、添加`getAttrGroupWithAttrs`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrGroupController`类里添加

`getAttrGroupWithAttrs`方法，通过`catelogId`获取当前分类下**所有分组**&**关联属性**

![image-20220520231533320](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.3.png)

#### 4、添加`getAttrGroupWithAttrsByCatelogId`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrGroupService`类里添加`getAttrGroupWithAttrsByCatelogId`抽象方法

![image-20220520231548548](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.4.png)

#### 5、实现`getAttrGroupWithAttrsByCatelogId`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrGroupServiceImpl`类里实现`getAttrGroupWithAttrsByCatelogId`抽象方法，通过`catelogId`获取当前分类下**所有分组**&**关联属性**

![image-20220520234608206](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.5.png)

#### 6、查看回显

已正确获得数据，但是没有回显到页面上，此时控制台也报了一个错

![image-20220520234852186](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.6.png)

#### 7、`spuadd.vue`的第679行报错

可以看到`spuadd.vue`的第679行的`foreach`报错

```
TypeError: Cannot read properties of null (reading ' forEach')
TypeError：无法读取 null 的属性（读取“forEach”）
```

![image-20220520235236298](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.7.png)

#### 8、`showBaseAttrs()`方法里加一个判断

在`src\views\modules\product\spuadd.vue`的`showBaseAttrs()`方法里的`foreach`里面加一个判断，没有`attrs`就不遍历

```javascript
data.data.forEach(item => {
  if(item.attrs != null && item.attrs.length > 0){
    let attrArray = [];
    item.attrs.forEach(attr => {
      attrArray.push({
        attrId: attr.attrId,
        attrValues: "",
        showDesc: attr.showDesc
      });
    });
    this.dataResp.baseAttrs.push(attrArray);
  }
});
```

![image-20220520235759910](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.8.png)

#### 9、页面已成功显示

重新测试，页面已成功显示数据

![image-20220520235924882](https://gitlab.com/apzs/image/-/raw/master/image/4.6.3.9.png)

### 4.6.4、新增商品(1)

#### 1、发送请求

##### 1、添加测试数据

###### 1、新增`机身长度(mm)`

在`商品系统/平台属性/规格参数`里新增`机身长度(mm)`

![image-20220521200453301](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.1.png)

###### 2、新增`机身材质工艺`

在`商品系统/平台属性/规格参数`里新增`机身材质工艺`

![image-20220521200845851](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.2.png)

###### 3、删除`测试`

删除`商品系统/平台属性/属性分组`里的`测试`

![image-20220521201219156](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.3.png)

###### 4、添加`主芯片`

在`商品系统/平台属性/属性分组`里添加`主芯片`

![image-20220521201609609](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.4.png)

###### 5、新增`CPU品牌`

在`商品系统/平台属性/规格参数`里新增`CPU品牌`

![image-20220521202050971](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.5.png)

###### 6、新增`CPU型号`

在`商品系统/平台属性/规格参数`里新增`CPU型号`

![image-20220521202428453](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.6.png)

###### 7、修改`上市年份`里的`所属分组`

在`商品系统/平台属性/规格参数`里修改`上市年份`里的`所属分组`为`主体`

![image-20220521202603474](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.7.png)

###### 8、修改`机身颜色`里的`所属分组`

在`商品系统/平台属性/规格参数`里修改`机身颜色`里的`所属分组`为`基本信息`

![image-20220521202705771](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.8.png)

###### 9、修改`内存`里的`可选值`

在`商品系统/平台属性/销售属性`里修改`内存`里的`可选值`

![image-20220522110005717](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.9.png)

###### 10、添加`版本`

在`商品系统/平台属性/销售属性`里添加`版本`![image-20220522110314425](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.1.10.png)

##### 2、录入商品信息

###### 1、录入`基本属性`

![image-20220521203305473](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.1.png)

###### 2、录入`规格参数`里的`主体`

![image-20220521203509597](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.2.png)

###### 3、录入`规格参数`里的`基本信息`

![image-20220521203913840](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.3.png)

###### 4、录入`规格参数`里的`主芯片`

![image-20220521204015874](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.4.png)

###### 5、录入`销售属性`

![image-20220521205929197](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.5.png)

###### 6、修改`SKU信息`

| 颜色   | 版本      | 商品名称                               | 标题                                                         | 副标题                                                       | 价格 |
| ------ | --------- | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| 星河银 | 8GB+128GB | 华为 HUAWEI Mate30Pro 星河银 8GB+128GB | 华为 HUAWEI Mate30Pro 星河银 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 5799 |
| 星河银 | 8GB+256GB | 华为 HUAWEI Mate30Pro 星河银 8GB+256GB | 华为 HUAWEI Mate30Pro 星河银 8GB+256GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 6299 |
| 亮黑色 | 8GB+128GB | 华为 HUAWEI Mate30Pro 亮黑色 8GB+128GB | 华为 HUAWEI Mate30Pro 亮黑色 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 5799 |
| 亮黑色 | 8GB+256GB | 华为 HUAWEI Mate30Pro 亮黑色 8GB+256GB | 华为 HUAWEI Mate30Pro 亮黑色 8GB+256GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 6299 |
| 翡冷翠 | 8GB+128GB | 华为 HUAWEI Mate30Pro 翡冷翠 8GB+128GB | 华为 HUAWEI Mate30Pro 翡冷翠 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 5799 |
| 翡冷翠 | 8GB+256GB | 华为 HUAWEI Mate30Pro 翡冷翠 8GB+256GB | 华为 HUAWEI Mate30Pro 翡冷翠 8GB+256GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 6299 |
| 罗兰紫 | 8GB+128GB | 华为 HUAWEI Mate30Pro 罗兰紫 8GB+128GB | 华为 HUAWEI Mate30Pro 罗兰紫 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 5799 |
| 罗兰紫 | 8GB+256GB | 华为 HUAWEI Mate30Pro 罗兰紫 8GB+256GB | 华为 HUAWEI Mate30Pro 罗兰紫 8GB+256GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机 | [现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》 | 6299 |

![image-20220521213940120](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.6.png)

###### 7、修改`SKU信息`里的`星河银 8GB+128GB`信息

![image-20220521214707364](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.7.png)

###### 8、修改`SKU信息`里的`星河银8GB+256GB`信息

![image-20220521214923139](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.8.png)

###### 9、修改`SKU信息`里的`亮黑色 8GB+128GB`信息

![image-20220521215050927](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.9.png)

###### 10、修改`SKU信息`里的`亮黑色 8GB+256GB`信息

![image-20220521215354005](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.10.png)

###### 11、修改`SKU信息`里的`翡冷翠 8GB+128GB`信息

![image-20220521215557469](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.11.png)

###### 12、修改`SKU信息`里的`翡冷翠 8GB+256GB`信息

![image-20220521215911728](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.12.png)

###### 13、修改`SKU信息`里的`罗兰紫 8GB+128GB`信息

![image-20220521220119171](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.13.png)

###### 14、修改`SKU信息`里的`罗兰紫 8GB+256GB`信息

![image-20220521220313889](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.14.png)

###### 15、查看发送的数据

1. 打开控制台
2. 点击`下一步：保存商品信息`
3. 点击`Copy`
4. **先放到记事本里保存，免得后面操作多了，不小心丢了**(后面写完后端代码后一定会用到，一定要存着，否者只能重新添加商品了)

[点击查看刚刚复制的json](code/4.6.4.1.2.15.json)

![image-20220521221004925](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.2.15.png)

##### 3、接口文档

接口文档 在`商品系统/19、新增商品`里： https://easydoc.net/s/78237135/ZUqEdvA4/5ULdV3dd

![image-20220521220653670](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.1.3.png)

#### 2、JSON生成Java实体类

##### 1、格式化JSON

将刚刚复制到JSON粘贴到输入框，点击`格式化校验`，检查JSON

url: [在线JSON校验格式化工具（Be JSON）](https://www.bejson.com/json/format/)

[点击查看格式化后的Json](code/4.6.4.2.1.json)

![image-20220521223643977](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.2.1.png)

##### 2、复制`vo`包的路径

复制`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包的路径

![image-20220521223237967](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.2.2.png)

##### 3、生成Java实体类

1. 粘贴JOSN
2. 输入"SpuSaveVo"
3. 粘贴刚刚复制的路径 "com.atguigu.gulimall.product.vo"
4. 点击"生成JavaBean"
5. 检查一下代码是否正确
6. 点击"下载代码"

![image-20220521223304810](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.2.3.png)

#### 3、添加`vo`对象

##### 1、使用生成的Java实体类

解压刚刚生成的Java实体类，复制这些实体类

![image-20220521223941902](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.1.1.png)

粘贴到`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下

![image-20220521224052736](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.1.2.png)

##### 2、修改粘贴的Java实体类(不推荐)

###### 1、修改`SpuSaveVo`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`SpuSaveVo`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class SpuSaveVo {

    private String spuName;
    private String spuDescription;
    private Long catalogId;
    private Long brandId;
    private BigDecimal weight;
    private int publishStatus;
    private List<String> decript;
    private List<String> images;
    private Bounds bounds;
    private List<BaseAttrs> baseAttrs;
    private List<Skus> skus;

}
```

![image-20220521225538198](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.1.png)

###### 2、修改`Skus`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`Skus`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class Skus {

    private List<Attr> attr;
    private String skuName;
    private BigDecimal price;
    private String skuTitle;
    private String skuSubtitle;
    private List<Images> images;
    private List<String> descar;
    private int fullCount;
    private BigDecimal discount;
    private int countStatus;
    private BigDecimal fullPrice;
    private BigDecimal reducePrice;
    private int priceStatus;
    private List<MemberPrice> memberPrice;

}
```

![image-20220521225626590](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.2.png)

###### 3、修改`Bounds`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`Bounds`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class Bounds {

    private BigDecimal buyBounds;
    private BigDecimal growBounds;

}
```

![image-20220521225730419](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.3.png)

###### 4、修改`Attr`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`Attr`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;

import lombok.Data;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class Attr {

    private Long attrId;
    private String attrName;
    private String attrValue;

}
```

![image-20220521225822709](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.4.png)

###### 5、修改`MemberPrice`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`MemberPrice`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class MemberPrice {

    private Long id;
    private String name;
    private BigDecimal price;

}
```

![image-20220521225934901](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.5.png)

###### 6、修改`Images`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`Images`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;

import lombok.Data;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class Images {

    private String imgUrl;
    private int defaultImg;


}
```

![image-20220521230008068](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.6.png)

###### 7、修改`BaseAttrs`类

修改`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下的`BaseAttrs`类

```java
/**
  * Copyright 2022 bejson.com 
  */
package com.atguigu.gulimall.product.vo;

import lombok.Data;

/**
 * Auto-generated: 2022-05-21 22:37:36
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
@Data
public class BaseAttrs {

    private Long attrId;
    private String attrValues;
    private int showDesc;


}
```

![image-20220521230035175](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.2.7.png)

##### 3、使用内部类(推荐)

###### 1、修改成内部类报错

```java
package com.atguigu.gulimall.product.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class SpuSaveVo {

    private String spuName;
    private String spuDescription;
    private Long catalogId;
    private Long brandId;
    private BigDecimal weight;
    private int publishStatus;
    private List<String> decript;
    private List<String> images;
    private Bounds bounds;
    private List<BaseAttrs> baseAttrs;
    private List<Skus> skus;

    @Data
    private class BaseAttrs {
        private Long attrId;
        private String attrValues;
        private int showDesc;
    }

    @Data
    private class Skus {
        private List<Attr> attr;
        private String skuName;
        private BigDecimal price;
        private String skuTitle;
        private String skuSubtitle;
        private List<Images> images;
        private List<String> descar;
        private int fullCount;
        private BigDecimal discount;
        private int countStatus;
        private BigDecimal fullPrice;
        private BigDecimal reducePrice;
        private int priceStatus;
        private List<MemberPrice> memberPrice;
    }

    @Data
    private class Attr {
        private Long attrId;
        private String attrName;
        private String attrValue;

    }

    @Data
    private class Images {
        private String imgUrl;
        private int defaultImg;
    }

    @Data
    private class MemberPrice {
        private Long id;
        private String name;
        private BigDecimal price;
    }

    @Data
    private class Bounds {
        private BigDecimal buyBounds;
        private BigDecimal growBounds;

    }

}
```

![image-20220522101000555](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.3.1.png)

重启`gulimall-product`模块，控制台报错

```
org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot construct instance of `com.atguigu.gulimall.product.vo.SpuSaveVo$BaseAttrs` (although at least one Creator exists): can only instantiate non-static inner class by using default, no-argument constructor; nested exception is com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot construct instance of `com.atguigu.gulimall.product.vo.SpuSaveVo$BaseAttrs` (although at least one Creator exists): can only instantiate non-static inner class by using default, no-argument constructor

org.springframework.http.converter.HttpMessageNotReadableException：JSON解析错误：无法构造`com.atguigu.gulimall.product.vo.SpuSaveVo$BaseAttrs`的实例（尽管至少存在一个Creator）：只能实例化非静态内部类 通过使用默认的无参数构造函数； 嵌套异常是 com.fasterxml.jackson.databind.exc.MismatchedInputException：无法构造 `com.atguigu.gulimall.product.vo.SpuSaveVo$BaseAttrs` 的实例（尽管至少存在一个 Creator）：只能实例化非静态内部 使用默认的无参数构造函数进行类
```

###### 2、修改为静态内部类

本类下的所有内部类添加`staitc`关键字，修改为静态内部类

![image-20220522101630956](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.3.2.png)

##### 4、测试

###### 1、打断点

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SpuInfoController`类的`save`方法

并打断点，以测试`SpuSaveVo`是否可以正确封装数据

然后以`debug`方式启动`gulimall-product`模块

```java
/**
 * 保存
 */
@RequestMapping("/save")
public R save(@RequestBody SpuSaveVo spuSaveVo) {
    //spuInfoService.save(spuInfo);
    return R.ok();
}
```

![image-20220522120721302](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.4.1.png)

###### 2、使用`Postman`发送请求

1. 输入url：http://localhost:88/api/product/spuinfo/save
2. 选择`Post`
3. 点击`Body`
4. 点击`raw`
5. 选择`JSON`
6. 粘贴控制台里复制的JSON
7. 点击`Send`

![image-20220522120320199](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.4.2.png)

###### 3、查看封装的数据

可以看到`SpuSaveVo`类已正确封装了数据

![image-20220522101945488](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.3.4.3.png)

#### 4、修改`save`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SpuInfoController`类的`save`方法

**应该是`spuInfoService.saveSpuInfo(spuSaveVo);`，这里写错了**

```java
/**
 * 保存
 */
@RequestMapping("/save")
public R save(@RequestBody SpuSaveVo spuSaveVo) {
    //spuInfoService.save(spuInfo);
   spuInfoService.saveSouInfo(spuSaveVo);
   return R.ok();
}
```

![image-20220522093324236](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.4.png)

#### 5、添加`saveSouInfo`抽象方法

**(应该是添加`saveSouInfo`抽象方法，这里写错了)**

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoService`接口里添加`saveSouInfo`抽象方法

![image-20220522093446271](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.5.png)

#### 6、实现`saveSouInfo`抽象方法

**(应该是添加`saveSpuInfo`抽象方法，这里写错了)**

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里实现`saveSouInfo`抽象方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void saveSouInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info

    //2、保存Spu的描述图片 pms_spu_info_desc

    //3、保存spu的图片集 pms_spu_images

    //4、保存spu的规格参数；pms_product_attr_value

    //5、保存spu的积分信息; gulimall_sms->sms_spu_bounds

    //5、保存当前spu对应的所有sku信息;
    //5.1)、sku的基本信息; pms_sku_info
    //5.2)、sku的图片信息; pms_sku_images
    //5.3)、sku的销售属性信息: pms_sku_sale_attr_value
    //5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price

}
```

![image-20220522141406494](https://gitlab.com/apzs/image/-/raw/master/image/4.6.4.6.png)

### 4.6.5、新增商品(2)

#### 4.6.5.1、保存spu基本信息`pms_spu_info`

##### 1、调用`saveBaseSpuInfo`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里的`saveSouInfo`方法里编写部分代码，用于保存spu基本信息

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void saveSouInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    this.saveBaseSpuInfo(spuInfoEntity);
}
```

![image-20220522163949897](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.1.png)

##### 2、创建`saveBaseSpuInfo`方法

光标放在`SpuInfoServiceImpl`类的`saveSouInfo`里的`this.saveBaseSpuInfo(spuInfoEntity);`中的`;`前面

使用`alt+enter`快捷键，选择`Create method 'saveBaseSpuInfo'`,然后选择`SpuInfoService`

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoService`接口创建`saveBaseSpuInfo`抽象方法

```java
void saveBaseSpuInfo(SpuInfoEntity spuInfoEntity);
```

光标放在`SpuInfoService`接口的`void saveBaseSpuInfo(SpuInfoEntity spuInfoEntity);`中的`;`前面

使用`alt+enter`快捷键，选择`Implement method 'saveBaseSpuInfo'`**(没有这个选项的随便在该抽象方法后面敲两个回车就有了)**

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里实现`saveBaseSpuInfo`抽象方法

![GIF 2022-5-22 16-37-11](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.2.png)

##### 3、编写`saveBaseSpuInfo`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里编写`saveBaseSpuInfo`方法

```java
@Override
public void saveBaseSpuInfo(SpuInfoEntity spuInfoEntity) {
    this.baseMapper.insert(spuInfoEntity);
}
```

![image-20220522171910439](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.3.png)

##### 4、封装对象(方法一)

###### 1、查看`SpuSaveVo`中缺少的字段

可以看到`SpuSaveVo`类里相较于`SpuInfoEntity`没有`createTime`字段和`SpuSaveVo`字段

![image-20220522172310652](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.4.1.png)

###### 2、使用代码添加时间

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveBaseSpuInfo`方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void saveSouInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    BeanUtils.copyProperties(spuSaveVo,spuInfoEntity);
    spuInfoEntity.setCreateTime(new Date());
    spuInfoEntity.setUpdateTime(new Date());
    this.saveBaseSpuInfo(spuInfoEntity);
}
```

![image-20220522172613649](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.4.2.png)

##### 5、封装对象(方法二)

###### 1、修改`saveBaseSpuInfo`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveBaseSpuInfo`方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void saveSouInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    BeanUtils.copyProperties(spuSaveVo,spuInfoEntity);
    this.saveBaseSpuInfo(spuInfoEntity);
}
```

![image-20220522172710746](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.1.png)

###### 2、添加`MetaObjectHandler`配置

在`gulimall-product`模块的`com.atguigu.gulimall.product.config`包里新建`MyBatisConfig`类，继承`MetaObjectHandler`类

**(应该把`LocalDateTime.class`改为`new Date()`)**

```java
package com.atguigu.gulimall.product.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

/**
 * @author 无名氏
 * @date 2022/5/22
 * @Description:
 */
@Slf4j
@Configuration
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("start insert fill...");
        //this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("createTime", LocalDateTime.class, metaObject);
        this.setFieldValByName("updateTime", LocalDateTime.class, metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("start update fill...");
        this.setFieldValByName("updateTime", LocalDateTime.class, metaObject);
    }
}
```

![image-20220522180735126](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.2.png)

###### 3、实体类`@TableField`添加注解

在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SpuInfoEntity`实体类的`createTime`和`updateTime`字段添加`@TableField`注解,测试时肯定会报错，这里想看一下会报什么错(如果使用的是`new Date()`就不会报错，并且还会得到正确的结果)

(如果是MetaObjectHandler配置类使用的是LocalDateTime类型 要加@DateTimeFormat不加这个注解查询的时候会报错)

```java
/**
 * 1、如果是MetaObjectHandler配置类使用的是LocalDateTime类型 要加@DateTimeFormat不加这个注解查询的时候会报错
 *    DateUtil使用的是org.springblade.core.tool.utils.DateUtil;
 *    @DateTimeFormat(pattern = DateUtil.PATTERN_DATETIME)
 *    @JsonFormat(pattern = DateUtil.PATTERN_DATETIME)
 *    @TableField(fill = FieldFill.INSERT)
 * 2、如果使用的是 new Date() ,则只需要使用 @TableField(fill = FieldFill.INSERT)
 *    @TableField(fill = FieldFill.INSERT)
 */
@TableField(fill = FieldFill.INSERT)
private Date createTime;
/**
 * 
 */
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

![image-20220522182337080](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.3.png)

别人的`DateUtil`工具类，不过它使用的是`new Date()`方式，不需要设置`@DateTimeFormat`，这里想看一看会报什么错

[点击查看`DateUtil`类完整代码](code/4.6.5.1.5.3.java)

###### 4、使用`Postman`发送请求

重启`gulimall-product`模块,使用`Postman`发送请求

![image-20220522181338567](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.4.png)

###### 5、查看报错

```
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.reflection.ReflectionException: Could not set property 'createTime' of 'class com.atguigu.gulimall.product.entity.SpuInfoEntity' with value 'class java.time.LocalDateTime' Cause: java.lang.IllegalArgumentException: argument type mismatch

org.mybatis.spring.MyBatisSystemException：嵌套异常是 org.apache.ibatis.reflection.ReflectionException：无法将 'class com.atguigu.gulimall.product.entity.SpuInfoEntity' 的属性'createTime'设置为'class java.time' .LocalDateTime' 原因：java.lang.IllegalArgumentException：参数类型不匹配
```

![image-20220522181444148](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.5.png)

###### 6、`google`一下这个错

`stackoverflow`上说需要使用`DateTimeFormatter.ISO_LOCAL_DATE_TIME`

https://stackoverflow.com/questions/57972766/java-lang-illegalargumentexception-platform-class-java-time-localdatetime-with

![image-20220522181635099](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.6.png)

###### 7、属性值必须是常量

在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SpuInfoEntity`类的`createTime`方法上添加注解`@DateTimeFormat(pattern = DateTimeFormatter.ISO_LOCAL_DATE_TIME)`提示`Attribute value must be constant`

删掉这个注解，测试一下

![image-20220522181946429](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.7.png)

###### 8、测试日期格式

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`类添加`DateTimeFormatterTest`测试方法，进行测试

```java
@Test
public void DateTimeFormatterTest(){
   DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
   LocalDateTime localDateTime = LocalDateTime.now();//获取当前时间
   String str = formatter.format(localDateTime);
   System.out.println(localDateTime);//2022-01-24T11:06:34.473
   System.out.println(str);
}
```

测试结果:

```
2022-05-22T18:30:59:498
2022-05-22T18:30:59:498
```

![image-20220522193641644](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.8.1.png)

参考链接： https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html

![image-20220522193704482](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.8.2.png)修改`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`类的`DateTimeFormatterTest`测试方法，重新进行测试

```java
@Test
public void DateTimeFormatterTest(){
   DateTimeFormatter formatter1 = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
   LocalDateTime localDateTime1 = LocalDateTime.now();//获取当前时间
   String str1 = formatter1.format(localDateTime1);
   System.out.println(localDateTime1);//2022-01-24T11:06:34.473
   System.out.println(str1);

   System.out.println("==========================");
   DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-ddTHH:mm:ss");
   LocalDateTime localDateTime2 = LocalDateTime.now();//获取当前时间
   String str2 = formatter2.format(localDateTime2);
   System.out.println(localDateTime2);
   System.out.println(str2);

}
```

测试失败了：

```
java.lang.IllegalArgumentException: Unknown pattern letter: T
java.lang.IllegalArgumentException：未知模式字母：T
```

![image-20220522194537130](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.8.3.png)

修改`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`类的`DateTimeFormatterTest`测试方法，重新进行测试

```java
@Test
public void DateTimeFormatterTest(){
   DateTimeFormatter formatter1 = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
   LocalDateTime localDateTime1 = LocalDateTime.now();//获取当前时间
   String str1 = formatter1.format(localDateTime1);
   System.out.println(localDateTime1);//2022-01-24T11:06:34.473
   System.out.println(str1);

   System.out.println("==========================");
   DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
   LocalDateTime localDateTime2 = LocalDateTime.now();//获取当前时间
   String str2 = formatter2.format(localDateTime2);
   System.out.println(localDateTime2);
   System.out.println(str2);

}
```

输出的格式还是不对：

```
2022-05-22T19:46:24.884
2022-05-22T19:46:24.884
==========================
2022-05-22T19:46:24.886
2022-05-22T19:46:24
```

![image-20220522194710291](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.8.4.png)

查看`DateTimeFormatter.ISO_LOCAL_DATE_TIME`

![image-20220522195349302](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.8.5.png)



在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SpuInfoEntity`实体类的`createTime`和`updateTime`字段上添加注解，重启`gulimall-product`模块，使用`Postman`发送请求后，还是报错

```java
/**
 * 1、如果是MetaObjectHandler配置类使用的是LocalDateTime类型 要加@DateTimeFormat不加这个注解查询的时候会报错
 *       DateUtil使用的是org.springblade.core.tool.utils.DateUtil;
 *    @DateTimeFormat(pattern = DateUtil.PATTERN_DATETIME)
 *    @JsonFormat(pattern = DateUtil.PATTERN_DATETIME)
 *    @TableField(fill = FieldFill.INSERT)
 * 2、如果使用的是 new Date() ,则只需要使用 @TableField(fill = FieldFill.INSERT)
 *       @TableField(fill = FieldFill.INSERT)
 */
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@TableField(fill = FieldFill.INSERT)
private Date createTime;
/**
 * 
 */
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
```

![image-20220522195303101](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.8.6.png)

###### 9、最终方案

还是使用了最初应该使用的方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyMetaObjectHandler`类

将` LocalDateTime.class`全部修改为`new Date()`

```java
package com.atguigu.gulimall.product.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

/**
 * @author 无名氏
 * @date 2022/5/22
 * @Description:
 */
@Slf4j
@Configuration
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("start insert fill...");
        //this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("start update fill...");
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }
}
```

![image-20220522201105155](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.1.png)

重启`gulimall-product`模块，使用`Postman`发送请求

![image-20220522201604822](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.2.png)

`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SpuInfoEntity`类

```java
package com.atguigu.gulimall.product.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * spu信息
 * 
 * @author 无名氏
 * @email 2185180175@qq.com
 * @date 2022-04-17 18:19:58
 */
@Data
@TableName("pms_spu_info")
public class SpuInfoEntity implements Serializable {
   private static final long serialVersionUID = 1L;

   /**
    * 商品id
    */
   @TableId
   private Long id;
   /**
    * 商品名称
    */
   private String spuName;
   /**
    * 商品描述
    */
   private String spuDescription;
   /**
    * 所属分类id
    */
   private Long catalogId;
   /**
    * 品牌id
    */
   private Long brandId;
   /**
    * 
    */
   private BigDecimal weight;
   /**
    * 上架状态[0 - 下架，1 - 上架]
    */
   private Integer publishStatus;
   /**
    * 1、如果是MetaObjectHandler配置类使用的是LocalDateTime类型 要加@DateTimeFormat不加这个注解查询的时候会报错
    *       DateUtil使用的是org.springblade.core.tool.utils.DateUtil;
    *    @DateTimeFormat(pattern = DateUtil.PATTERN_DATETIME)
    *    @JsonFormat(pattern = DateUtil.PATTERN_DATETIME)
    *    @TableField(fill = FieldFill.INSERT)
    * 2、如果使用的是 new Date() ,则只需要使用 @TableField(fill = FieldFill.INSERT)
    *       @TableField(fill = FieldFill.INSERT)
    */
   @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
   @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
   @TableField(fill = FieldFill.INSERT)
   private Date createTime;
   /**
    * 
    */
   @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
   @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
   @TableField(fill = FieldFill.INSERT_UPDATE)
   private Date updateTime;

}
```

可以看到插入到时间精确到了`毫秒`

![image-20220522201403809](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.3.png)

查看数据库,数据库的时间精确到了`秒`(四舍五入)

![image-20220522201644762](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.4.png)

删掉`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SpuInfoEntity`类`createTime`字段和`updateTime`字段上的`@DateTimeFormat`和`@JsonFormat`注解

![image-20220522201719091](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.5.png)

重启`gulimall-product`模块，重新使用`Postman`发送请求，控制台还是精确到`毫秒`,数据库还是精确到`秒`(四舍五入)

![image-20220522201908544](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.7.png)

截断`gulimall_pms`模块的`pms_spu_info`，删除数据并使`id`重新从`1`开始

![image-20220522212108872](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.5.9.8.png)

##### 6、修改`saveSouInfo`为`saveSpuInfo`

修改`saveSouInfo`为`saveSpuInfo`，之前这个方法名写错了

双击选中`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法

右键选择`Find Usages`，查看哪些类调用了该方法

![image-20220522225959312](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.6.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SpuInfoController`类的`save`方法里，

把`saveSouInfo`修改为`saveSpuInfo`

![image-20220522221105775](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.6.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoService`接口里，把`saveSouInfo`抽象方法修改为`saveSpuInfo`

![image-20220522221206062](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.6.3.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里把`saveSpuInfo`方法改为`saveSpuInfo`

![image-20220522230202137](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.1.6.4.png)

#### 4.6.5.2、保存Spu的描述信息`pms_spu_info_desc`

##### 1、调用`saveSpuInfoDesc`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里的`saveSouInfo`方法里编写部分代码，用于保存Spu的描述图片

```java
@Autowired
SpuInfoDescService spuInfoDescService;

@Transactional(rollbackFor = Exception.class)
@Override
public void saveSpuInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    BeanUtils.copyProperties(spuSaveVo,spuInfoEntity);
    this.saveBaseSpuInfo(spuInfoEntity);

    //2、保存Spu的描述信息 pms_spu_info_desc
    List<String> decript = spuSaveVo.getDecript();
    if (decript!=null && decript.size()>0) {
        SpuInfoDescEntity spuInfoDescEntity = new SpuInfoDescEntity();
        //this.saveBaseSpuInfo(spuInfoEntity);执行后，会将生成的id赋值到puInfoDescEntity的spuId里
        spuInfoDescEntity.setSpuId(spuInfoEntity.getId());
        //将List<String>转为String，用逗号分隔
        spuInfoDescEntity.setDecript(String.join(",", decript));
        spuInfoDescService.saveSpuInfoDesc(spuInfoDescEntity);
    }
}
```

![image-20220523001135275](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.2.1.png)

##### 2、创建`saveSpuInfoDesc`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoDescService`接口里添加`saveSpuInfoDesc`抽象方法

```java
void saveSpuInfoDesc(SpuInfoDescEntity spuInfoDescEntity);
```

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoDescServiceImpl`类里实现`saveSpuInfoDesc`抽象方法

![GIF 2022-5-23 0-13-40](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.2.2.gif)

##### 3、修改`saveSpuInfoDesc`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoDescServiceImpl`类里的`saveSpuInfoDesc`方法

```java
@Override
public void saveSpuInfoDesc(SpuInfoDescEntity spuInfoDescEntity) {
    this.baseMapper.insert(spuInfoDescEntity);
}
```

![image-20220522224957138](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.2.3.png)

#### 4.6.5.3、保存spu的图片集`pms_spu_images`

##### 1、调用`saveImages`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里的`saveSouInfo`方法里编写部分代码，用于保存Spu的图片集

```java
@Autowired
SpuInfoDescService spuInfoDescService;
@Autowired
SpuImagesService spuImagesService;

@Transactional(rollbackFor = Exception.class)
@Override
public void saveSpuInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    BeanUtils.copyProperties(spuSaveVo,spuInfoEntity);
    this.saveBaseSpuInfo(spuInfoEntity);

    //2、保存Spu的描述图片 pms_spu_info_desc
    List<String> decript = spuSaveVo.getDecript();
    if (decript!=null && decript.size()>0) {
        SpuInfoDescEntity spuInfoDescEntity = new SpuInfoDescEntity();
        spuInfoDescEntity.setSpuId(spuInfoEntity.getId());
        spuInfoDescEntity.setDecript(String.join(",", decript));
        spuInfoDescService.saveSpuInfoDesc(spuInfoDescEntity);
    }
    
    //3、保存spu的图片集 pms_spu_images
    List<String> images = spuSaveVo.getImages();
    if (images!=null && images.size()>0) {
        spuImagesService.saveImages(spuInfoEntity.getId(), images);
    }
}
```

![image-20220523201222020](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.3.1.png)

##### 2、添加`saveImages`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuImagesService`类里添加`saveImages`抽象方法

```java
void saveImages(Long id, List<String> images);
```

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuImagesServiceImpl`类实现`saveImages`抽象方法

![GIF 2022-5-23 20-13-04](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.3.2.gif)

##### 3、实现`saveImages`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuImagesServiceImpl`类里的`saveImages`方法添加具体实现

```java
/**
 * 批量保存图片
 * @param id        spuId
 * @param images    图片集的url
 */
@Override
public void saveImages(Long id, List<String> images) {
    if (CollectionUtils.isEmpty(images)){
        return;
    }

    List<SpuImagesEntity> spuImagesEntities = images.stream().map(image -> {
        SpuImagesEntity spuImagesEntity = new SpuImagesEntity();
        spuImagesEntity.setSpuId(id);
        spuImagesEntity.setImgUrl(image);
        return spuImagesEntity;
    }).collect(Collectors.toList());
    this.saveBatch(spuImagesEntities);
}
```

![image-20220523202313469](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.3.3.png)

#### 4.6.5.4、保存spu的规格参数`pms_product_attr_value`

##### 1、私有访问权限无法访问

```bash
'com.atguigu.gulimall.product.vo.SpuSaveVo.BaseAttrs' has private access in 'com.atguigu.gulimall.product.vo.SpuSaveVo'

'com.atguigu.gulimall.product.vo.SpuSaveVo.BaseAttrs' 在 'com.atguigu.gulimall.product.vo.SpuSaveVo' 中具有私有访问权限
```

![image-20220523204943855](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.4.1.png)

##### 2、将`SpuSaveVo`的内部类都改为公有

将`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SpuSaveVo`类的所有内部类的访问权限都改为`public`

[点击查看`SpuSaveVo`类完整代码](code/4.6.5.4.2.SpuSaveVo.java)

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.4.2.png" alt="image-20220523204847342" style="zoom: 33%;" />

##### 3、调用`saveProductAttr`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里的`saveSouInfo`方法里编写部分代码，保存spu的规格参数

```java
@Autowired
SpuInfoDescService spuInfoDescService;
@Autowired
SpuImagesService spuImagesService;
@Autowired
AttrService attrService;
@Autowired
ProductAttrValueService productAttrValueService;

@Transactional(rollbackFor = Exception.class)
@Override
public void saveSpuInfo(SpuSaveVo spuSaveVo) {
    //1、保存spu基本信息 pms_spu_info
    SpuInfoEntity spuInfoEntity = new SpuInfoEntity();
    BeanUtils.copyProperties(spuSaveVo,spuInfoEntity);
    this.saveBaseSpuInfo(spuInfoEntity);

    //2、保存Spu的描述图片 pms_spu_info_desc
    List<String> decript = spuSaveVo.getDecript();
    if (decript!=null && decript.size()>0) {
        SpuInfoDescEntity spuInfoDescEntity = new SpuInfoDescEntity();
        spuInfoDescEntity.setSpuId(spuInfoEntity.getId());
        spuInfoDescEntity.setDecript(String.join(",", decript));
        spuInfoDescService.saveSpuInfoDesc(spuInfoDescEntity);
    }

    //3、保存spu的图片集 pms_spu_images
    List<String> images = spuSaveVo.getImages();
    if (images!=null && images.size()>0) {
        spuImagesService.saveImages(spuInfoEntity.getId(), images);
    }

    //4、保存spu的规格参数；pms_product_attr_value
    List<SpuSaveVo.BaseAttrs> baseAttrs = spuSaveVo.getBaseAttrs();
    if (!CollectionUtils.isEmpty(baseAttrs)) {
        List<ProductAttrValueEntity> productAttrValueEntities = baseAttrs.stream().map(attr -> {
            ProductAttrValueEntity productAttrValueEntity = new ProductAttrValueEntity();
            productAttrValueEntity.setSpuId(spuInfoEntity.getId());
            if (attr.getAttrId() != null) {
                productAttrValueEntity.setAttrId(attr.getAttrId());
                productAttrValueEntity.setAttrValue(attr.getAttrValues());
                productAttrValueEntity.setQuickShow(attr.getShowDesc());
                AttrEntity attrEntity = attrService.getById(attr.getAttrId());
                if (attrEntity != null) {
                    productAttrValueEntity.setAttrName(attrEntity.getAttrName());
                }
            }
            return productAttrValueEntity;
        }).collect(Collectors.toList());

        productAttrValueService.saveProductAttr(productAttrValueEntities);
    }
}
```

![image-20220523211034830](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.4.3.png)

##### 4、添加`saveProductAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.ProductAttrValueService`类里添加`saveProductAttr`抽象方法

```java
void saveProductAttr(List<ProductAttrValueEntity> productAttrValueEntities);
```

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里实现`saveProductAttr`抽象方法

![GIF 2022-5-23 21-11-06](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.4.4.gif)

##### 5、实现`saveProductAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里的`saveProductAttr`方法里添加具体实现

```java
@Override
public void saveProductAttr(List<ProductAttrValueEntity> productAttrValueEntities) {
    this.saveBatch(productAttrValueEntities);
}
```

![image-20220523211149789](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.4.5.png)

#### 4.6.5.5、保存当前spu对应的所有sku信息

##### 1、复制`sku`的信息到`skuInfoEntity`

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里的`saveProductAttr`方法里复制`sku`的信息到`skuInfoEntity`

![image-20220523213603802](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.1.png)

##### 2、查看可以复制的字段

比对`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SpuSaveVo.Skus`类

和`com.atguigu.gulimall.product.entity.SkuInfoEntity`类

可以看到`skuName`、`price`、`skuTitle`、`skuSubtitle`这些字段可以拷贝

![image-20220523213242536](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.2.png)

##### 3、保存sku的基本信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里的`saveProductAttr`方法里保存sku的基本信息,调用`skuImagesService`类的`saveBatch`方法

[点击查看`SpuInfoServiceImpl`类完整代码](code/4.6.5.5.3.SpuInfoServiceImpl.java)

![image-20220523221527652](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.3.png)

##### 4、添加`saveSkuInfo`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuInfoService`接口添加`saveSkuInfo`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类里实现`saveSkuInfo`抽象方法

![GIF 2022-5-23 22-17-54](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.4.gif)

##### 5、实现`saveSkuInfo`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类里的`saveSkuInfo`方法里添加具体实现

![image-20220523221930967](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.5.png)

##### 6、批量保存sku的图片信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里的`saveProductAttr`方法里调用`skuImagesService`对象的`saveBatch`方法，批量保存sku的图片信息

[点击查看`SpuInfoServiceImpl`类完整代码](code/4.6.5.5.6.SpuInfoServiceImpl.java)

![image-20220523223744919](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.6.png)

##### 7、批量保存sku的销售属性信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里的`saveProductAttr`方法里调用`skuSaleAttrValueService`对象的`saveBatch`方法，批量保存sku的销售属性信息

[点击查看`SpuInfoServiceImpl`类完整代码](code/4.6.5.5.7.SpuInfoServiceImpl.java)

![image-20220523230155354](https://gitlab.com/apzs/image/-/raw/master/image/4.6.5.5.7.png)

### 4.6.6、调用远程服务

#### 1、调用远程服务步骤

1. 服务双方上线，并且放到注册中心中
2. 服务双方开启服务注册和发现功能(`@EnableDiscoveryClient`)
3. 服务消费方编写`feign`接口，在接口声明调用`哪个服务`(`@FeignClient`)的`哪个接口`(`@RequestMapping`)
4. 服务消费方开启远程调用功能(`@EnableFeignClients`)

#### 2、保存spu的积分信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法，想要保存spu的积分信息，即修改`gulimall_sms`数据库的`sms_spu_bounds`表

![image-20220601114158761](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.0.1.png)

此时需要远程调用`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.controller.SpuBoundsController`类的`save`方法

![image-20220601114238502](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.0.2.png)

##### 1、新建`CouponFeignService`类

在`gulimall-product`模块的`com.atguigu.gulimall.product`包下新建`feign`文件夹

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign`包里新建`CouponFeignService`类

![image-20220601121222193](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.1.png)

##### 2、开启远程调用

在`gulimall-product`模块的启动类`GulimallProductApplication`上添加注解

```java
@EnableFeignClients(basePackages = "com.atguigu.gulimall.product.feign")
```

![image-20220601121502104](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.2.png)

##### 3、新建`SpuBoundTo`类

在`gulimall-common`模块的`com.atguigu.common`包下新建`to`文件夹

在`gulimall-common`模块的`com.atguigu.common.to`包下新建`SpuBoundTo`类用于远程调用`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.controller.SpuBoundsController`类的`save`方法时传输对象数据

![image-20220601121411961](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.3.png)

##### 4、修改请求方式

在`gulimall-coupon`模块里修改`com.atguigu.gulimall.coupon.controller.SpuBoundsController`类的`save`的请求方式为`@PostMapping`

```java
  @PostMapping("/save")
      public R save(@RequestBody SpuBoundsEntity spuBounds){
spuBoundsService.save(spuBounds);

      return R.ok();
  }
```

![image-20220601122053306](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.4.png)

##### 5、添加`saveSpuBounds`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign.CouponFeignService`接口来里添加`saveSpuBounds`抽象方法

```java
package com.atguigu.gulimall.product.feign;

import com.atguigu.common.to.SpuBoundTo;
import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * @author 无名氏
 * @date 2022/6/1
 * @Description:
 */
@FeignClient("gulimall-coupon")
public interface CouponFeignService {

    /**
     * 1、CouponFeignService . saveSpuBounds(spuBoundTo);
     *   1)、@RequestBody将这个对象转为json。
     *   2)、找到gul imall-coupon服务， 给/coupon/spubounds/save发送请求。
     *       将上一步转的json放在请求体位置，发送请求;
     *   3)、对方服务收到请求。请求体里有json数据。
     *       (@RequestBody SpuBoundsEntity spuBounds );将请求体的json转为SpuBoundsEntity;
     * 只要ison数据模型是兼容的。双方服务无需使用同一个to
     * @param spuBoundTo
     * @return
     */
    @PostMapping("/coupon/spubounds/save")
    R saveSpuBounds(@RequestBody SpuBoundTo spuBoundTo);
}
```

![image-20220601122610199](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.5.png)

##### 6、保存spu的积分信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里的`saveProductAttr`方法里调用`couponFeignService`对象的`saveSpuBounds`方法，用于保存spu的积分信息

```java
@Autowired
CouponFeignService couponFeignService;

//5、保存spu的积分信息; gulimall_sms->sms_spu_bounds
SpuSaveVo.Bounds bounds = spuSaveVo.getBounds();
SpuBoundTo spuBoundTo = new SpuBoundTo();
BeanUtils.copyProperties(bounds,spuBoundTo);
spuBoundTo.setSpuId(spuInfoEntity.getId());
couponFeignService.saveSpuBounds(spuBoundTo);
```

![image-20220601122753256](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.2.6.png)

#### 3、保存sku的优惠、满减、打折等信息

![image-20220601123339903](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.0.png)

##### 1、新建`SkuReductionTo`类

复制`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SpuSaveVo`类的这些属性和`MemberPrice`内部类

![image-20220601123703015](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.1.1.png)

在`gulimall-common`模块新建`com.atguigu.common.to`包下新建`SkuReductionTo`类，粘贴刚刚复制的`SpuSaveVo`类的属性和`MemberPrice`内部类,再添加`skuId`字段

```java
package com.atguigu.common.to;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/6/1
 * @Description:
 */
@Data
public class SkuReductionTo {

    private Long skuId;
    /**
     * 满几件打几折
     * countStatus: 是否可以叠加优惠
     */
    private int fullCount;
    private BigDecimal discount;
    private int countStatus;
    /**
     * 满多少减多少
     * priceStatus：是否可以叠加优惠
     */
    private BigDecimal fullPrice;
    private BigDecimal reducePrice;
    private int priceStatus;
    /**
     * 会员价格
     */
    private List<MemberPrice> memberPrice;

    @Data
    public static class MemberPrice {
        private Long id;
        private String name;
        private BigDecimal price;
    }
}
```

![image-20220601124110777](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.1.2.png)

##### 2、调用`gulimall-coupon`服务

再`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法里添加代码，调用`gulimall-coupon`服务，用于保存`sku的优惠、满减、打折等信息`

```java
//5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price
SkuReductionTo skuReductionTo = new SkuReductionTo();
BeanUtils.copyProperties(sku,skuReductionTo);
skuReductionTo.setSkuId(skuId);
R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
```

![image-20220601124401637](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.2.png)

##### 3、添加`saveSkuReduction`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign.CouponFeignService`接口里添加`saveSkuReduction`抽象方法

```java
void saveSkuReduction(SkuReductionTo skuReductionTo);
```

![image-20220601150651848](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.3.png)

##### 4、添加`saveInfo`方法

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.SkuFullReductionService`类里添加`saveInfo`方法，用于保存满减和折扣信息

```java
/**
 * 保存满减和折扣信息
 */
@PostMapping("/saveinfo")
public R saveInfo(@RequestBody SkuReductionTo reductionTo){
    skuFullReductionService.saveSkuReduction(reductionTo);

    return R.ok();
}
```

![image-20220601151040320](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.4.png)

##### 5、修改`saveSkuReduction`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign.CouponFeignService`接口里修改`saveSkuReduction`抽象方法

```java
@PostMapping("/coupon/skufullreduction/saveinfo")
R saveSkuReduction(@RequestBody SkuReductionTo skuReductionTo);
```

![image-20220601150926019](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.5.png)

##### 6、添加`saveSkuReduction`抽象方法

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.SkuFullReductionService`接口里添加`saveSkuReduction`抽象方法

```java
void saveSkuReduction(SkuReductionTo reductionTo);
```

![image-20220601151118002](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.6.1.png)

![image-20220601151149222](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.6.2.png)

##### 7、实现`saveSkuReduction`抽象方法

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.impl.SkuFullReductionServiceImpl`类里实现`saveSkuReduction`抽象方法

```java
@Override
public void saveSkuReduction(SkuReductionTo reductionTo) {
    //1、sku的 优惠(满几件打几折) 信息；gulimall_sms->sms_sku_ladder
    SkuLadderEntity skuLadderEntity = new SkuLadderEntity();
    skuLadderEntity.setSkuId(reductionTo.getSkuId());
    skuLadderEntity.setFullCount(reductionTo.getFullCount());
    skuLadderEntity.setDiscount(reductionTo.getDiscount());
    //是否可以叠加优惠
    skuLadderEntity.setAddOther(reductionTo.getCountStatus());
    skuLadderService.save(skuLadderEntity);

    //2、sku的 满减(满多少减多少) 信息；sms_sku_full_reduction
    SkuFullReductionEntity skuFullReductionEntity = new SkuFullReductionEntity();
    BeanUtils.copyProperties(reductionTo, skuFullReductionEntity);
    skuFullReductionEntity.setAddOther(reductionTo.getPriceStatus());
    this.save(skuFullReductionEntity);

    //3、sku的 打折 信息；sms_ member_price
    List<SkuReductionTo.MemberPrice> memberPrice = reductionTo.getMemberPrice();
    List<MemberPriceEntity> memberPriceEntities = memberPrice.stream().map(member -> {
        MemberPriceEntity memberPriceEntity = new MemberPriceEntity();
        memberPriceEntity.setSkuId(reductionTo.getSkuId());
        memberPriceEntity.setMemberLevelId(member.getId());
        memberPriceEntity.setMemberLevelName(member.getName());
        memberPriceEntity.setMemberPrice(member.getPrice());
        memberPriceEntity.setAddOther(1);
        return memberPriceEntity;
    }).collect(Collectors.toList());
    memberPriceService.saveBatch(memberPriceEntities);
}
```

![image-20220601153731834](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.7.png)

##### 8、添加`getCode`方法

在`gulimall-common`模块的`com.atguigu.common.utils.R`类里添加`getCode`方法,用于获取状态码

```java
public Integer getCode(){
   return (Integer) this.get("code");
}
```

![image-20220601154315951](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.8.png)

##### 9、获取远程访问的状态码，在失败后记录日志

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法里面添加部分代码,用于获取远程访问`gulimall-coupon`模块时返回的状态码，并在失败后记录日志

在`保存spu的积分信息`的`couponFeignService.saveSpuBounds(spuBoundTo);`方法里接收返回值，如果远程访问失败则记录日志

```java
//5、保存spu的积分信息; gulimall_sms->sms_spu_bounds
SpuSaveVo.Bounds bounds = spuSaveVo.getBounds();
SpuBoundTo spuBoundTo = new SpuBoundTo();
BeanUtils.copyProperties(bounds,spuBoundTo);
spuBoundTo.setSpuId(spuInfoEntity.getId());
R r = couponFeignService.saveSpuBounds(spuBoundTo);
if (r.getCode()!=0){
    log.error("远程保存spu积分信息失败");
}
```

![image-20220601155006225](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.9.1.png)

在`保存sku的优惠、满减、打折等信息`的`couponFeignService.saveSkuReduction(skuReductionTo);`方法里接收返回值，如果远程访问失败则记录日志

```java
//5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price
SkuReductionTo skuReductionTo = new SkuReductionTo();
BeanUtils.copyProperties(sku,skuReductionTo);
skuReductionTo.setSkuId(skuId);
R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
if (r1.getCode()!=0){
    log.error("远程保存sku优惠信息失败");
}
```

![image-20220601154858415](https://gitlab.com/apzs/image/-/raw/master/image/4.6.6.3.9.2.png)

`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的完整代码

[点击查看`SpuInfoServiceImpl`类完整代码](code/4.6.6.3.9.SpuInfoServiceImpl.java)

### 4.6.7、测试

测试之前最好把`gulimall_pms`数据库备份一下，免得后面调试发现代码写错了，不知道这次添加了哪些数据，从而导致删错数据

![image-20220612161346948](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.0.png)

#### 1、修改配置

##### 1、点击`Edit Configurations...`

点击功能区内运行类的右边、运行按钮左边的下三角，选择`Edit Configurations...`

![image-20220601155532934](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.1.png)

##### 2、新建`Compound`

点击弹出的`Run/Debug Configurations`框里左上角的`+`号，在下方的框里选择`Compound`

![image-20220601155708909](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.2.png)

##### 3、在`Compound`里添加各个模块

在新建的`Compound`里面的右边的框的左上角点击`+`号，把下面这些服务添加进来

1. GulimallCouponApplication
2. GulimallGatewayApplication
3. GulimallMemberApplication
4. GulimallProductApplication
5. GulimallThirdPartyApplication
6. RenrenApplication

![image-20220601155949929](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.3.png)

##### 4、修改模块最大内存占用

###### 1、点击编辑按钮

点击`Spring Boot'GulimallCouponApplication'`，然后点击`Compound`里面的右边的框的左上角的编辑按钮

![image-20220601160037029](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.1.png)

###### 2、限制单个模块最大内存

在`GulimallCouponApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallCouponApplication`模块的最大内存占用为`100m`

同理修改其他7个模块的最大内存占用

```
-Xmx100m
```

![image-20220601160256195](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.2.png)

在`GulimallGatewayApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallGatewayApplication`模块的最大内存占用为`100m`

![image-20220601160348699](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.3.png)

在`GulimallMemberApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallMemberApplication`模块的最大内存占用为`100m`

![image-20220601160419110](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.4.png)

在`GulimallOrderApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallOrderApplication`模块的最大内存占用为`100m`

![image-20220601160507405](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.5.png)

在`GulimallProductApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallProductApplication`模块的最大内存占用为`100m`

![image-20220601160536846](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.6.png)

在`GulimallThirdPartyApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallThirdPartyApplication`模块的最大内存占用为`100m`

![image-20220601160602726](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.7.png)

在`GulimallWareApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallWareApplication`模块的最大内存占用为`100m`

![image-20220601160630466](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.8.png)

在`RenrenApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`RenrenApplication`模块的最大内存占用为`100m`

![image-20220601160655782](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.1.4.9.png)

#### 2、添加断点

##### 1、打断点

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法的开头打一个断点，用于测试

![image-20220611235807652](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.1.png)

##### 2、打开`Run Dashboard`

###### 1、没有`Run Dashboard`选项

![image-20220606232040208](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.2.1.png)

###### 2、添加组件

在`gulimall\.idea\workspace.xml`里添加组件

```xml
<component name="RunDashboard">
    <option name="configurationTypes">
      <set>
        <option value="SpringBootApplicationConfigurationType" />
      </set>
    </option>
    <option name="ruleStates">
      <list>
        <RuleState>
          <option name="name" value="ConfigurationTypeDashboardGroupingRule" />
        </RuleState>
        <RuleState>
          <option name="name" value="StatusDashboardGroupingRule" />
        </RuleState>
      </list>
    </option>
  </component>
```

![image-20220606232154637](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.2.2.png)

###### 3、添加的组件被删除了

点别的文件，在返回`gulimall\.idea\workspace.xml`发现，刚刚添加的组件被删除了

![image-20220606232544250](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.2.3.png)

###### 4、改成`Services`了:disappointed_relieved:

我这个版本的IDEA已经把`Run Dashboard`改成`Services`了

![image-20220606232751462](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.2.4.png)

##### 3、以`debug`方式启动`GulimallProductApplication`模块

![image-20220606232934382](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.3.png)

##### 4、发送请求

使用`Postman`发送以前新增商品时(保存的有`json`数据)的那个请求

url：http://localhost:88/api/product/spuinfo/save

![image-20220606235141570](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.4.1.png)

然后点击调试的`Step Over(步过)`按钮，直到执行`this.saveBaseSpuInfo(spuInfoEntity);`方法完毕

![image-20220612160514320](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.4.2.png)

##### 5、修改事务隔离级别

查看`gulimall_pms`数据库的`pms_sou_info`表,发现并没有数据，这是因为事务没有提交，可以修改当前会话的隔离级别为`读未提交`这样就可以看到还未提交的数据了

![image-20220606234532035](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.1.png)

//这个`isolation`少了一个`o`，果然百度的东西不靠谱

```mysql
set session transaction isolatin level READ UNCOMMITTED;
```

这个是正确的

```mysql
set session transaction isolation level read uncommitted;
```

![image-20220606234716582](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.2.png)

重新刷新`gulimall_pms`数据库下的`pms_spu_info`表，可以看到已经有数据了

![image-20220607000248976](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.5.png)

##### 📝 如果没有数据

如果重新刷新发现还没有，这是navicate软件的问题:disappointed_relieved:

![image-20220607000740209](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.3.png)

选中`gulimall_pms`数据库，右键选择`新建查询`

![image-20220606235935459](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.5.png)

在新创建的对话框内输入如下语句，查看`pms_spu_info`表，点击`运行`

```
SELECT * FROM pms_spu_info;
```

![image-20220607000040075](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.6.png)

或者直接在设置`当前会话事务隔离级别`的命令行界面里执行也行

![image-20220607000145379](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.2.5.7.png)

#### 3、spu_id异常

##### 1、报了个异常

点击调试的`Step Over(步过)`按钮，直到执行`this.saveBaseSpuInfo(spuInfoEntity);`方法完毕

在执行`this.saveBaseSpuInfo(spuInfoEntity);`方法的时候，抛了个异常

```
Error updating database.  Cause: java.sql.SQLException: Field 'spu_id' doesn't have a default value
更新数据库时出错。 原因：java.sql.SQLException：字段 'spu_id' 没有默认值
```

![image-20220612162902508](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.1.png)

可以看到，代码明明设置了`spuId`和`descipt`，但是执行的`sql`语句却只插入了`descipt`字段

```mysql
INSERT INTO pms_spu_info_desc ( decript ) VALUES ( ? ) 
```

##### 2、查看`pms_spu_info_desc`表结构

查看`gulimall_pns`数据库的`pms_spu_info_desc`表的表结构

选中`gulimall_pns`数据库的`pms_spu_info_desc`表，右键选择`设计表`

![image-20220612163500782](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.2.1.png)

可以看到`spu_id`字段不是**自动递增**的,这个字段是spu的id，是需要指定的

而`mybatis`当成了自增的，所以插入的时候只插入了`descipt`字段，所以就抛了个异常

![image-20220612163540243](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.2.2.png)

##### 3、修改`SpuInfoDescEntity`类的字段注解

在`gulimall-product`模块的`com.atguigu.gulimall.product.entity.SpuInfoDescEntity`类的`spuId`字段的`@TableId`注解上添加参数，指出id为输入的

```java
@TableId(type = IdType.INPUT)
private Long spuId;
```

![image-20220612164332539](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.3.png)

##### 4、重新测试

重新以`debug`方式启动`GulimallProductApplication`模块

![image-20220612164854483](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.4.1.png)

重新在`Postman`里面发送请求

![image-20220612165111157](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.4.2.png)

继续点击调试的`Step Over(步过)`按钮，直到执行`this.saveBaseSpuInfo(spuInfoEntity);`方法完毕

![image-20220612165210715](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.4.3.png)

打开`navicat`，在命令行里查询`pms_spu_info_desc`表，可以看到执行成功了

```java
select * from pms_spu_info_desc;
```

![image-20220612165408926](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.4.4.png)

可以看到，这次执行的sql语句就没有问题了

![image-20220612165628681](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.3.4.5.png)

#### 4、保存spu的图片集

点击调试的`Step Over(步过)`按钮，直到执行`spuImagesService.saveImages(spuInfoEntity.getId(), images);`方法完毕

控制台可以看到插入了很多的数据

![image-20220612165941643](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.4.1.png)

打开`navicat`，在命令行里查询`pms_spu_info_desc`表，可以看到spu的图片集已经保存成功了

```mysql
select * from pms_spu_images;
```

![image-20220612170119892](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.4.2.png)

#### 5、保存spu的规格参数

在`productAttrValueService.saveProductAttr(productAttrValueEntities);`这段代码上打个断点

![image-20220612170714934](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.5.1.png)

点击`Resume Program`按钮，执行到下一个断点，到`productAttrValueService.saveProductAttr(productAttrValueEntities);`这条语句

![image-20220612171237828](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.5.2.png)

点击调试的`Step Over(步过)`按钮，执行`productAttrValueService.saveProductAttr(productAttrValueEntities);`

控制台可以看到已经执行成功了

![image-20220612171013680](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.5.3.png)

打开`navicat`，在命令行里查询`pms_product_attr_value;`表，可以看到执行成功了

```mysql
select * from pms_product_attr_value;
```

![image-20220612171503231](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.5.4.png)

#### 6、远程保存spu的积分信息

点击调试的`Step Over(步过)`按钮，执行`R r = couponFeignService.saveSpuBounds(spuBoundTo);`

执行这一步时间稍微会长一些，大概几秒

![image-20220612173109279](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.6.1.1.png)

选择`gulimall_sms`数据库，右键选择`新建查询`

![image-20220612183822411](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.6.1.2.png)

在里面输入sql语句，选中刚刚输入sql语句，点击`运行已选择的`，就可以看到已经执行成功了

```mysql
#设置事务隔离级别
set session transaction isolation level read uncommitted;
select * from sms_spu_bounds;
```

![image-20220613172225685](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.6.1.3.png)

📝 如果抛了类型转换异常

```
java.lang.classCastException: java.lang.Integer cannot be cast to java.lang.String
java.lang.classCastException：java.lang.Integer 不能转换为 java.lang.String
```

![image-20220612173525024](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.6.2.1.png)

只需要修改`gulimall-common`模块的`com.atguigu.common.utils.R`类的`getCode`方法

```java
public Integer getCode(){
   return (Integer) this.get("code");
}
```

![image-20220612173828646](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.6.2.2.png)

📝如果请求超时了，可以在`gulimall-product`模块的`src\main\resources\application.yml`配置文件里配置超时时间

```yaml
ribbon:
  ReadTimeout: 5000
  ConnectTimeout: 5000
```

![image-20220612194409602](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.6.3.png)

#### 7、保存sku的基本信息

在这些代码上添加断点

```mysql
skuInfoService.saveSkuInfo(skuInfoEntity);
skuImagesService.saveBatch(skuImagesEntities);
skuSaleAttrValueService.saveBatch(skuSaleAttrValueEntities);
R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
```

![image-20220612184727878](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.7.1.png)

点击`Resume Program`按钮，执行到下一个断点，到`skuInfoService.saveSkuInfo(skuInfoEntity);`这里

![image-20220612184840945](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.7.2.png)

点击调试的`Step Over(步过)`按钮，执行`skuInfoService.saveSkuInfo(skuInfoEntity);`

![image-20220612185003469](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.7.3.png)

在`gulimall_pms`数据库的命令行里查询`pms_sku_info`表，可以看到已经执行成功了

```mysql
select * from pms_sku_info;
```

![image-20220612185214403](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.7.4.png)

#### 8、保存sku的图片信息

点击`Resume Program`按钮，执行到下一个断点，到`skuImagesService.saveBatch(skuImagesEntities);`这里

![image-20220612185351159](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.8.1.png)

点击调试的`Step Over(步过)`按钮，执行`skuImagesService.saveBatch(skuImagesEntities);`

![image-20220612185428681](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.8.2.png)

在`gulimall_pms`数据库的命令行里查询`pms_sku_images`表，可以看到已经执行成功了，但是有很多空的`img_url`也被插入进来了

```mysql
 select * from pms_sku_images;
```

![image-20220612185714965](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.8.3.png)

在`skuImagesService.saveBatch(skuImagesEntities);`这里添加一个待办事项

```
//TODO 没有图片；路径的无需保存
```

![image-20220612185924619](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.8.4.png)

#### 9、保存sku的销售属性信息

点击`Resume Program`按钮，执行到下一个断点，到` skuSaleAttrValueService.saveBatch(skuSaleAttrValueEntities);`这里

![image-20220612190054935](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.9.1.png)

点击调试的`Step Over(步过)`按钮，执行` skuSaleAttrValueService.saveBatch(skuSaleAttrValueEntities);`

![image-20220612190159595](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.9.2.png)

在`gulimall_pms`数据库的命令行里查询`pms_sku_sale_attr_value`表，可以看到已经执行成功了

```mysql
select * from pms_sku_sale_attr_value;
```

![image-20220612190332004](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.9.3.png)

#### 10、远程保存sku的优惠、满减、打折等信息

点击`Resume Program`按钮，执行到下一个断点，到`R r1 = couponFeignService.saveSkuReduction(skuReductionTo);`这里

![image-20220612190433233](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.10.1.png)

点击调试的`Step Over(步过)`按钮，执行`R r1 = couponFeignService.saveSkuReduction(skuReductionTo);`

![image-20220612190957155](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.10.2.png)

在`gulimall_sms`数据库的命令行里查询`sms_sku_full_reduction`表，可以看到已经执行成功了，但是有很多都为0的数据

```mysql
select * from sms_sku_full_reduction;
```

![image-20220612210049416](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.10.3.png)

在`gulimall_sms`数据库的命令行里查询`sms_sku_ladder`表，可以看到已经执行成功了，但是有很多都为0的数据

```mysql
select * from sms_sku_ladder;
```

![image-20220612205848035](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.10.4.png)

在`gulimall_sms`数据库的命令行里查询`sms_member_price`表，可以看到已经执行成功了，但是有很多都为0的数据

```java
select * from sms_member_price;
```

![image-20220612205651548](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.10.5.png)

#### 11、保存所有spu信息

点击`Resume Program`按钮，执行到下一个断点，到`skuInfoService.saveSkuInfo(skuInfoEntity);`这里,用于保存第二个spu信息

![image-20220612191302481](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.11.1.png)

一直点击`Resume Program`按钮，直到执行完所有

![image-20220612191443305](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.11.2.png)

在`gulimall_pms`数据库的命令行中执行sql语句，查询`pms_sku_info`信息，可以看到8条数据已成功插入

```
select * from pms_sku_info;
```

![image-20220612191706272](https://gitlab.com/apzs/image/-/raw/master/image/4.6.7.11.3.png)

### 4.6.8、商品保存其他问题

#### 1、图片的url为空时不保存到数据库

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法里，

在`skuImagesService.saveBatch(skuImagesEntities);`方法调用之前

收集数据之前，添加过滤条件，如果图片的url为空，就过滤掉；当图片的url不为空时才保留

```java
List<SkuImagesEntity> skuImagesEntities = sku.getImages().stream().map(img -> {
    SkuImagesEntity skuImagesEntity = new SkuImagesEntity();
    skuImagesEntity.setSkuId(skuId);
    skuImagesEntity.setImgUrl(img.getImgUrl());
    skuImagesEntity.setDefaultImg(img.getDefaultImg());
    return skuImagesEntity;
}).filter(entry->{
    //如果图片的url为空，就过滤掉
    return StringUtils.hasLength(entry.getImgUrl());
}).collect(Collectors.toList());
skuImagesService.saveBatch(skuImagesEntities);
```

![image-20220613210153936](https://gitlab.com/apzs/image/-/raw/master/image/4.6.8.1.png)

#### 2、当有`打折`或`满减`信息才调用远程服务

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法里，

在执行`R r1 = couponFeignService.saveSkuReduction(skuReductionTo);`方法之前，添加判断当有`打折`或`满减`信息时才调用远程服务

```java
//满几件打几折、满多少减多少，如果有一项有数据才调用远程服务
if (skuReductionTo.getFullCount()>0 || skuReductionTo.getFullPrice().compareTo(BigDecimal.ONE) > 0){
    R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
    if (r1.getCode()!=0){
        log.error("远程保存sku优惠信息失败");
    }
}
```

![image-20220612200805478](https://gitlab.com/apzs/image/-/raw/master/image/4.6.8.2.png)

`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的完整代码

[点击查看`SpuInfoServiceImpl`类完整代码](code/4.6.8.2.SpuInfoServiceImpl.java)

#### 3、设置会员价格也远程调用

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法里在`5.4`功能里修改代码，当有`打折`或`满减`或`设置会员价格`信息才调用远程服务

**这些价格应该与`BigDecimal.ZERO`比，之前代码写的有问题**

```java
//5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price
SkuReductionTo skuReductionTo = new SkuReductionTo();
BeanUtils.copyProperties(sku,skuReductionTo);
skuReductionTo.setSkuId(skuId);

//查询是否有会员价格
Optional<SkuReductionTo.MemberPrice> memberPriceList = skuReductionTo.getMemberPrice().stream().filter(memberPrice -> {
    return memberPrice.getPrice().compareTo(BigDecimal.ZERO) > 0;
}).findFirst();
//满几件打几折、满多少减多少、会员价格，如果有一项有数据才调用远程服务
if (skuReductionTo.getFullCount()>0
        || skuReductionTo.getFullPrice().compareTo(BigDecimal.ZERO) > 0
        || memberPriceList.isPresent()){
    R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
    if (r1.getCode()!=0){
        log.error("远程保存sku优惠信息失败");
    }
}
```

![image-20220612205101515](https://gitlab.com/apzs/image/-/raw/master/image/4.6.8.3.png)

#### 4、当有满减信息才保存

修改`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.impl.SkuFullReductionServiceImpl`类的`saveSkuReduction`方法，当有满减信息才保存

```java
//有满减信息才保存
if (reductionTo.getFullPrice().compareTo(BigDecimal.ZERO)>0) {
    //2、sku的 满减(满多少减多少) 信息；sms_sku_full_reduction
    SkuFullReductionEntity skuFullReductionEntity = new SkuFullReductionEntity();
    BeanUtils.copyProperties(reductionTo, skuFullReductionEntity);
    skuFullReductionEntity.setAddOther(reductionTo.getPriceStatus());
    this.save(skuFullReductionEntity);
}
```

![image-20220612203149627](https://gitlab.com/apzs/image/-/raw/master/image/4.6.8.4.png)

#### 5、当会员价格大于0才保存

修改`gulimall-coupon`模块`com.atguigu.gulimall.coupon.service.impl.SkuFullReductionServiceImpl`类里的`saveSkuReduction`方法，当会员价格大于0(修改了会员价格)才保存

```java
    //3、sku的会员优惠信息；sms_ member_price
    List<SkuReductionTo.MemberPrice> memberPrice = reductionTo.getMemberPrice();
    List<MemberPriceEntity> memberPriceEntities = memberPrice.stream().filter(member->{
        return member.getPrice().compareTo(BigDecimal.ZERO)>0;
    }).map(member -> {
        MemberPriceEntity memberPriceEntity = new MemberPriceEntity();
        memberPriceEntity.setSkuId(reductionTo.getSkuId());
        memberPriceEntity.setMemberLevelId(member.getId());
        memberPriceEntity.setMemberLevelName(member.getName());
        memberPriceEntity.setMemberPrice(member.getPrice());
        memberPriceEntity.setAddOther(1);
        return memberPriceEntity;
    }).collect(Collectors.toList());
    memberPriceService.saveBatch(memberPriceEntities);
}
```

![image-20220612204104653](https://gitlab.com/apzs/image/-/raw/master/image/4.6.8.5.png)

### 4.6.9、重新测试

#### 1、重启项目

选择IDEA下边选项框的`Services`选项，点击`GulimallProductApplication`,右键选择`Return`，重新以`debug`方式启动`GulimallProductApplication`项目

![image-20220612210946079](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.1.1.png)

点击`GulimallCouponApplication`,右键选择`Return`，重新以`debug`方式启动`GulimallCouponApplication`项目

![image-20220612211004238](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.1.2.png)

#### 2、添加基本信息

在`商品系统`->`商品维护`->`发布商品`里添加商品的基本信息

`商品名称`里输入`Apple iPhoneXS 苹果XS手机`

`商品描述`输入`苹果手机`

`选择分类`选择`手机/手机通讯/手机`

`选择品牌`选择`Apple`

`商品重量(Kg)`输入`0.198`

`设置积分`里，`金币`输入`500`，`成长值`输入`500`

![image-20220612211954522](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.2.1.png)

`商品介绍`选以下两个图片

![image-20220612212014107](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.2.2.png)

然后点击`下一步：设置基本参数`

#### 3、添加规格参数

在`规格参数`里,主体内的`入网型号`选择`A2100`，上市年份选择`2018`（基本信息和主芯片在这里我就不选了）

然后点击`下一步：设置销售属性`

![image-20220612212342961](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.3.png)

#### 4、添加销售属性

在`销售属性`里的`选择销售属性`的`颜色`里，添加并选择`银色`、`深空灰色`、`金色`

`内存`选择`4G`

`版本`里，添加并选择`64GB`、`256GB`、`512GB`

然后点击`下一步：设置SKU信息`

![image-20220612212701344](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.4.png)

#### 5、添加SKU信息

##### 1、添加基本信息

在`销售属性`里添加如下信息，其中有些信息是已经自动生成好的(顺序可能不同)

| 颜色     | 版本  | 商品名称                                 | 标题                                     | 副标题                                        | 价格 |
| -------- | ----- | ---------------------------------------- | ---------------------------------------- | --------------------------------------------- | ---- |
| 银色     | 64GB  | Apple IPhoneXS 苹果XS手机 银色 64GB      | Apple IPhoneXS 苹果XS手机 银色 64GB      | 国行正品【白条六期免息】                      | 5999 |
| 银色     | 256GB | Apple IPhoneXS 苹果XS手机 银色 256GB     | Apple IPhoneXS 苹果XS手机 银色 256GB     | 国行正品【白条六期免息】                      | 6799 |
| 银色     | 512GB | Apple IPhoneXS 苹果XS手机 银色 512GB     | Apple IPhoneXS 苹果XS手机 银色 512GB     | 国行正品【白条六期免息】苹果XS手机 银色 512GB | 6999 |
| 深空灰色 | 64GB  | Apple IPhoneXS 苹果XS手机 深空灰色 64GB  | Apple IPhoneXS 苹果XS手机 深空灰色 64GB  | 国行正品【白条六期免息】                      | 5999 |
| 深空灰色 | 256GB | Apple IPhoneXS 苹果XS手机 深空灰色 256GB | Apple IPhoneXS 苹果XS手机 深空灰色 256GB | 国行正品【白条六期免息】                      | 6799 |
| 深空灰色 | 512GB | Apple IPhoneXS 苹果XS手机 深空灰色 512GB | Apple IPhoneXS 苹果XS手机 深空灰色 512GB | 国行正品【白条六期免息】                      | 6999 |
| 金色     | 64GB  | Apple IPhoneXS 苹果XS手机 金色 64GB      | Apple IPhoneXS 苹果XS手机 金色 64GB      | 国行正品【白条六期免息】                      | 5999 |
| 金色     | 256GB | Apple IPhoneXS 苹果XS手机 金色 256GB     | Apple IPhoneXS 苹果XS手机 金色 256GB     | 国行正品【白条六期免息】                      | 6799 |
| 金色     | 512GB | Apple IPhoneXS 苹果XS手机 金色 512GB     | Apple IPhoneXS 苹果XS手机 金色 512GB     | 国行正品【白条六期免息】                      | 6999 |

![image-20220612213201736](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.5.1.png)

##### 2、添加详细信息

在`银色  64GB  Apple IPhoneXS 苹果XS手机 银色 64GB  Apple IPhoneXS 苹果XS手机 银色 64GB  国行正品【白条六期免息】  5999` (第一条信息)的`价格`右边，点击`>`右箭头，在这里添加详细信息

点击`+`号，然后选择一张图片，以添加这个图片，选择一些图片作为这个`SKU`的图片集，并选择其中一个点击`设为默认`，用来做默认图片

在`设置折扣`里，满`2`件，打`0.98`折，并勾选`可叠加优惠`

在`设置满减`里，满`10000`元，减`50`元，并勾选`可叠加优惠`

在`设置会员价`里，`铜牌会员`设置会员价为`5980`元，`银牌会员`(这里前端字打错了)设置会员价为`5970`元

![image-20220612214656192](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.5.2.png)



按`f12`打开控制台，在控制台里选择`Console`，然后点击`下一步：保留商品信息`,先**不**要点击`提示`里的`确定`

在控制台输出的信息那点击右键，选择`Save as...`，**先放到记事本里保存，免得后面操作多了，不小心丢了**(华为的那个也保留着，后面还用得上)

![image-20220612214825166](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.5.3.png)

##### 4、发送的完整json

删除最开头的`spuadd.vue?c0e3:697 ~~~~~`，后面部分即为正确的、完整的json

[点击查看完整json](code/4.6.9.5.4.json)

##### 5、格式化后的json

[点击查看格式后的json](code/4.6.9.5.5.json)

#### 6、抛出类型强转异常

##### 1、系统未知异常

点击前端`提示`对话框的`确定按钮`后，提示`保存失败，原因【系统未知异常】`，查看请求，发现`msg`是`系统未知异常`

![image-20220612215347322](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.1.png)

##### 2、查看后端的控制台

查看`GulimallProductApplication`模块的控制台，可以看到抛出了`.ClassCastException`(类强转)异常

`com.atguigu.gulimall.product.vo.SpuSaveVo$MemberPrice`不能被强转为`com.atguigu.common.to.SkuReductionTo$MemberPrice`

```
java.lang.ClassCastException: com.atguigu.gulimall.product.vo.SpuSaveVo$MemberPrice cannot be cast to com.atguigu.common.to.SkuReductionTo$MemberPrice
	at java.util.stream.ReferencePipeline$2$1.accept(ReferencePipeline.java:174) ~[na:1.8.0_301]
```

![image-20220612234832710](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.2.1.png)

调试发现`BeanUtils.copyProperties(sku,skuReductionTo);`把`Skus`里的`MemberPrice`集合，赋给了`SkuReductionTo`里的`memberPrice`，这样就导致`memberPrice`是`com.atguigu.gulimall.product.vo.SpuSaveVo$MemberPrice`类型的集合，而不是本类的`com.atguigu.common.to.SkuReductionTo$MemberPrice`类型的集合，

所以当遍历时，编译器强转为本类的`com.atguigu.gulimall.product.vo.SpuSaveVo$MemberPrice`集合，就发生了类强转异常

(遍历时编译器检查的`memberPrice`集合类型为`com.atguigu.common.to.SkuReductionTo$MemberPrice`;而`BeanUtils.copyProperties(sku,skuReductionTo);`是在运行时执行的，编译器无法预知其类型，其把`com.atguigu.gulimall.product.vo.SpuSaveVo$MemberPrice`类型的集合赋给了`memberPrice`；在运行`memberPrice`遍历代码时发现与预期类型不一致，强转类型就发生了类强转异常)

![image-20220613161427467](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.2.2.png)

##### 3、尝试不显式获取返回类型会不会报错

测试之前报错是不是因为以下代码显式获取了返回类型为`SkuReductionTo.MemberPrice`而报的错

```java
Optional<SkuReductionTo.MemberPrice> memberPriceList = skuReductionTo.getMemberPrice().stream().filter(memberPrice -> {
    return memberPrice.getPrice().compareTo(BigDecimal.ZERO) > 0;
}).findFirst();
```

在该代码前，添加代码，如下所示

```java
//5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price
SkuReductionTo skuReductionTo = new SkuReductionTo();
System.out.println(skuReductionTo.getMemberPrice());
BeanUtils.copyProperties(sku,skuReductionTo);
System.out.println(skuReductionTo.getMemberPrice());
skuReductionTo.setSkuId(skuId);
skuReductionTo.getMemberPrice().forEach(e->{
    System.out.println(e);
    System.out.println(e.getId()+" "+e.getName()+" "+e.getPrice());
});
```

`GulimallProductApplication`模块控制台打印`skuReductionTo.getMemberPrice()`可以看到`memberPrice()`为`SpuSaveVo$MemberPrice`类型的集合

![image-20220613001145096](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.3.1.png)

点击调试的`Step Over(步过)`按钮，继续向下运行。

在点击调试的`Step Over(步过)`按钮，步过`skuReductionTo.getMemberPrice().forEach(e->{`发现没有再向下运行了，这时应该是发生异常了，再次点击`Step Over(步过)`按钮，就跳到的捕获异常的类里去了

![image-20220613165957636](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.3.2.png)

点击`Step Out(步出)`，直接执行到本类相应方法结束

![  ](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.3.3.png)

多次点击`Step Out(步出)`，执行完所有异常捕获类，就看到了控制台异常信息

![image-20220613165144512](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.3.4.png)



##### 4、解决方法

📝 可以先把远程调用的先注释掉，因为没使用分布式事务，这些远程调用无法回滚，注释掉避免许多无用的数据被提交

![image-20220613163711487](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.4.0.png)

###### 方法一

不使用`BeanUtils.copyProperties(sku, skuReductionTo);`方法拷贝的`SkuReductionTo`类里的`memberPrice`

直接使用原数据的`sku`对象的`memberPrice`进行判断

```java
//5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price
SkuReductionTo skuReductionTo = new SkuReductionTo();
BeanUtils.copyProperties(sku, skuReductionTo);
skuReductionTo.setSkuId(skuId);
System.out.println(skuReductionTo.getMemberPrice());

Optional<SpuSaveVo.MemberPrice> firstMemberPrice = sku.getMemberPrice().stream()
        .filter(memberPrice -> memberPrice.getPrice().compareTo(BigDecimal.ZERO) > 0)
        .findFirst();

//满几件打几折、满多少减多少、会员价格，如果有一项有数据才调用远程服务
if (skuReductionTo.getFullCount() > 0
        || skuReductionTo.getFullPrice().compareTo(BigDecimal.ZERO) > 0
        || firstMemberPrice.isPresent()) {
    R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
    if (r1.getCode() != 0) {
        log.error("远程保存sku优惠信息失败");
    }
}
```

![image-20220613163009555](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.4.1.1.png)

可以看到`sku`里的`memberPrice`类型为`SpuSaveVo$MemberPrice`，就是它应该的类型，此时肯定不会报错

下面的方法在处理`skuReductionTo`里的错误的`SpuSaveVo$MemberPrice`类型没有报错的原因是：发生了远程调用，远程调用是通过`json`来传输数据，`SpuSaveVo$MemberPrice`类和`SkuReductionTo$MemberPrice`类的所有数据字段名称和类型都相同，所以转化的`json`数据都一样，在服务提供方接收`json`转化为`SkuReductionTo$MemberPrice`类型时也不会出错

(`SpuSaveVo$MemberPrice`类和`SkuReductionTo$MemberPrice`类的所有数据字段名称和类型都相同，但是类强转失败的原因是它们之间没有继承关系，所以这两个类不能强转)

![image-20220613171053930](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.4.1.2.png)

###### 方法二

`SpuSaveVo$MemberPrice`类和`SkuReductionTo$MemberPrice`类的所有数据字段名称和类型都相同，所以转化的`json`数据都一样，可以先将`SpuSaveVo$MemberPrice`类集合转化为`json`，再通过`json`转化为`SkuReductionTo$MemberPrice`类集合，最后再赋值给`skuReductionTo`类的`memberPrice`字段，然后进行处理

(不过没必要使用这种方法来回转，很影响性能，这里只提供一种思路)

```java
//5.4)、sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price
SkuReductionTo skuReductionTo = new SkuReductionTo();
BeanUtils.copyProperties(sku,skuReductionTo);
skuReductionTo.setSkuId(skuId);
System.out.println(skuReductionTo.getMemberPrice());

String s = JSON.toJSONString(sku.getMemberPrice());
List<SkuReductionTo.MemberPrice> memberPriceList = JSON.parseArray(s, SkuReductionTo.MemberPrice.class);
skuReductionTo.setMemberPrice(memberPriceList);
Optional<SkuReductionTo.MemberPrice> firstMemberPrice = skuReductionTo.getMemberPrice().stream()
        .filter(memberPrice -> memberPrice.getPrice().compareTo(BigDecimal.ZERO) > 0)
        .findFirst();

//满几件打几折、满多少减多少、会员价格，如果有一项有数据才调用远程服务
if (skuReductionTo.getFullCount()>0
        || skuReductionTo.getFullPrice().compareTo(BigDecimal.ZERO) > 0
        || firstMemberPrice.isPresent()){
    R r1 = couponFeignService.saveSkuReduction(skuReductionTo);
    if (r1.getCode()!=0){
        log.error("远程保存sku优惠信息失败");
    }
}
```

![image-20220613162718750](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.4.2.1.png)

调试可以看到`skuReductionTo`类的`memberPrice`字段已经变为正确的`SkuReductionTo$MemberPrice`集合

![image-20220613164406730](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.6.4.2.2.png)

###### 方法三

可以将新建一个`pubic`修饰的`MemberPrice`类，并删除`SpuSaveVo`类和`SkuReductionTo`类的`MemberPrice`内部类，

让`SpuSaveVo`类和`SkuReductionTo`类都使用新建的`MemberPrice`类，这样也不会有异常类

#### 7、重新测试

##### 1、清空数据

打开刚刚注释的远程调用，使其可以远程调用

![image-20220613171446817](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.1.png)

清空`gulimall_pms`数据库中`pms_product_attr_value`表的数据

![image-20220613200905318](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.2.png)

截断`gulimall_pms`数据库中`pms_product_attr_value`表的数据(其实可以不用清空，直接截断)

清空表只会删除表中的数据，插入时如果不指定`id`的话，`id`还是会继续向后递增；

而截断表不仅会删除表中的数据，`id`也会重新从`1`开始

![image-20220613200938323](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.3.png)

需要`清空`并`截断`如下表(可以不用清空，直接截断)，**可以先备份这两个数据库，防止删错了**

**`gulimall_pms`数据库**

1. pms_product_attr_value
2. pms_sku_images
3. pms_sku_info
4. pms_sku_sale_attr_value
5. pms_spu_images
6. pms_spu_info
7. pms_spu_info_desc

**`gulimall_sms`数据库**

1. sms_member_price
2. sms_sku_full_reduction
3. sms_sku_ladder
4. sms_spu_bounds

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.4.png" alt="image-20220613173419233" style="zoom:67%;" />



<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.5.png" alt="image-20220613173527547" style="zoom:67%;" />



点击`gulimall_pms`数据库，右键选择`转储 SQL 文件` ，然后选择`结构和数据...`，以复制`gulimall_pms`数据库，如果误删了可以恢复数据

![image-20220613203942743](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.6.png)

同理，点击`gulimall_sms`数据库，右键选择`转储 SQL 文件` ，然后选择`结构和数据...`，以复制`gulimall_sms`数据库，如果误删了可以恢复数据(还可以复制其他数据库`结构和数据...`，防止误删除其他数据库中的数据了)

![image-20220613204017921](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.1.7.png)

##### 2、重启模块

重启`GulimallProductApplication`模块

![image-20220613204112485](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.2.1.png)

重启`GulimallCouponApplication`数据库

![image-20220613204145602](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.2.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`saveSpuInfo`方法里，对所有操作数据库的代码都打断点(包括远程调用代码)，总共9处断点

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.2.3.png" alt="image-20220613211118601" style="zoom:50%;" />

##### 3、发送请求

打开保存的苹果的请求，从`spuadd.vue?c0e3:697 ~~~~~`后面的第一个`{`开始复制，一直复制到最后

![image-20220613204932016](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.3.1.png)

打开`Postman`

1. 输入"http://localhost:88/api/product/spuinfo/save"
2. 请求方式选择"POST"
3. 点击`Body`
4. 点击`raw`
5. 选择`JSON`
6. 粘贴刚刚复制的JSON
7. 点击`Send`

![image-20220613204726065](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.3.2.png)

##### 4、查看数据

###### 1、保存spu基本信息 pms_spu_info

点击调试的`Step Over(步过)`按钮，执行`this.saveBaseSpuInfo(spuInfoEntity);`这段代码

![image-20220613211238135](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.1.1.png)

在`navicat`软件里点击`gulimall_pms`数据库，右键选择`新建查询`

📝 以下`sql`为该`新建查询`用到的所有`sql`语句

```mysql
set session transaction isolation level read uncommitted;
select * from pms_spu_info;
select * from pms_spu_info_desc;
select * from pms_spu_images;
select * from pms_product_attr_value;
select * from pms_sku_info;
select * from pms_sku_images;
select * from pms_sku_sale_attr_value;
```

![image-20220613225416756](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.1.2.png)

输入以下`sql`，设置当前会话的隔离级别为`读未提交`,并查询`gulimall_pms`数据库里,`pms_spu_info`表中的数据

```mysql
set session transaction isolation level read uncommitted;
select * from pms_spu_info;
```

![image-20220613224818155](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.1.3.png)

###### 2、保存Spu的描述 pms_spu_info_desc

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`spuInfoDescService.saveSpuInfoDesc(spuInfoDescEntity);`这段代码

![image-20220613223914215](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.2.1.png)

在`gulimall_pms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from pms_spu_info_desc;
```

![image-20220613224920966](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.2.2.png)

###### 3、保存spu的图片集 pms_spu_images

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`spuImagesService.saveImages(spuInfoEntity.getId(), images);`这行代码

![image-20220613224052953](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.3.1.png)

在`gulimall_pms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from pms_spu_images;
```

![image-20220613225025623](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.3.2.png)

###### 4、保存spu的规格参数；pms_product_attr_value

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`productAttrValueService.saveProductAttr(productAttrValueEntities);`这行代码

![image-20220613224503399](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.4.1.png)

在`gulimall_pms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from pms_product_attr_value;
```

![image-20220613224716339](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.4.2.png)

###### 5、远程保存spu的积分信息; gulimall_sms->sms_spu_bounds

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`R r = couponFeignService.saveSpuBounds(spuBoundTo);`这行代码

由于该方法要进行远程调用，所以这这行代码要执行的久一点

![image-20220613225213723](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.0.1.png)

在`navicat`软件里点击`gulimall_sms`数据库，右键选择`新建查询`

📝 以下`sql`为该`新建查询`用到的所有`sql`语句

```mysql
set session transaction isolation level read uncommitted;
select * from sms_spu_bounds;
select * from sms_sku_ladder;
select * from sms_sku_full_reduction;
select * from sms_member_price;
```

![image-20220613225452678](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.0.2.png)

输入以下`sql`，设置当前会话的隔离级别为`读未提交`,并查询`gulimall_sms`数据库里,`sms_spu_bounds`表中的数据

```mysql
set session transaction isolation level read uncommitted;
select * from sms_spu_bounds;
```

![image-20220613225559481](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.0.3.png)

###### 5.1、sku的基本信息; pms_sku_info

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`skuInfoService.saveSkuInfo(skuInfoEntity);`这行代码

![image-20220613225814817](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.1.1.png)

在`gulimall_pms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

(不小心把`select * from pms_product_attr_value;`这行代码删了)

```mysql
select * from pms_sku_info;
```

![image-20220613225728853](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.1.2.png)

###### 5.2、sku的图片信息; pms_sku_images

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`skuImagesService.saveBatch(skuImagesEntities);`这行代码

![image-20220613230444086](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.2.1.png)

在`gulimall_pms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from pms_sku_images;
```

可以看到这时没有`img_url`为`null`的数据了(`img_url`为`null`的数据都被过滤掉了，不会保存到数据库了)

![image-20220613230557481](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.2.2.png)

###### 5.3、sku的销售属性信息: pms_sku_sale_attr_value

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`skuSaleAttrValueService.saveBatch(skuSaleAttrValueEntities);`这行代码

![image-20220613230754102](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.3.1.png)

在`gulimall_pms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from pms_sku_sale_attr_value;
```

![image-20220613230855981](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.3.2.png)

###### 5.4、远程保存sku的优惠、满减、打折等信息；gulimall_sms->sms_sku_ladder\sms_sku_full_reduction\sms_ member_price

点击`Resume Program`按钮，执行到下一个断点停止(不执行该断点)，然后点击调试的`Step Over(步过)`按钮，执行`R r1 = couponFeignService.saveSkuReduction(skuReductionTo);`这行代码

![image-20220613231325398](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.4.1.png)

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.impl.SkuFullReductionServiceImpl`类的`saveSkuReduction`方法里设置了`有打折信息才保存`、`有满减信息才保存`、`有会员优惠信息才保存`

![image-20220613231505771](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.4.2.png)

在`gulimall_sms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from sms_sku_ladder;
```

可以看到没有`打折信息`为空的数据

![image-20220613231951960](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.4.3.png)

在`gulimall_sms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from sms_sku_full_reduction;
```

可以看到没有`满减信息`为空的数据

![image-20220613232056519](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.4.4.png)

在`gulimall_sms`数据库的`新建查询`里添加`sql`语句，并选中刚刚添加到`sql`语句，点击`运行已选择的`,即可查看刚刚保存的数据

```mysql
select * from sms_member_price;
```

可以看到没有`会员优惠信息`为空的数据

![image-20220613232324450](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.4.5.4.5.png)

##### 5、截断表，重新发送数据

清空并截断表(其实可以不清空，直接截断)，删除`gulimall_pms`数据库`pms_product_attr_value`表里面的数据(含有大量垃圾数据)

同理清空并截断(其实可以不清空，直接截断)以下所有表

**`gulimall_pms`数据库**

1. pms_product_attr_value
2. pms_sku_images
3. pms_sku_info
4. pms_sku_sale_attr_value
5. pms_spu_images
6. pms_spu_info
7. pms_spu_info_desc

**`gulimall_sms`数据库**

1. sms_member_price
2. sms_sku_full_reduction
3. sms_sku_ladder
4. sms_spu_bounds

![image-20220613233757008](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.5.1.png)

![image-20220613233828662](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.5.2.png)

重新向后端发送`华为手机`和`苹果手机`商品的`json`数据

![image-20220619174732338](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.5.3.png)

![image-20220613233312152](https://gitlab.com/apzs/image/-/raw/master/image/4.6.9.7.5.4.png)

##### 6、附录

###### 1、`gulimall_pms`数据库的`新建查询`里的所有`sql`语句

```mysql
set session transaction isolation level read uncommitted;
select * from pms_spu_info;
select * from pms_spu_info_desc;
select * from pms_spu_images;
select * from pms_product_attr_value;
select * from pms_sku_info;
select * from pms_sku_images;
select * from pms_sku_sale_attr_value;
```

###### 2、`gulimall_sms`数据库的`新建查询`里的所有`sql`语句

```mysql
set session transaction isolation level read uncommitted;
select * from sms_spu_bounds;
select * from sms_sku_ladder;
select * from sms_sku_full_reduction;
select * from sms_member_price;
```

## 4.7、商品服务-API-商品管理

### 4.7.1、SPU检索

#### 1、查看请求

在`商品系统`->`商品维护`->`spu管理`里，`分类`选择`手机/手机通讯/手机`，`品牌`选择`华为`,`状态`选择`上架`,

按`f12`选择`Network`，清空`Network`里的数据，然后点击`查询`

然后查看请求url为 

[http:://localhost:88/api/product/spuinfo/list?t=1655170424813&status=1&key=&brandId=1&catelogId=225&page=1&limit=10]()

![image-20220614093602135](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.1.1.png)

点击`Payload`，查看发送的`json`数据

![image-20220614093637205](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.1.2.png)

接口文档在`商品系统/18、spu检索`里 :  https://easydoc.net/s/78237135/ZUqEdvA4/9LISLvy7

![image-20220614093404399](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.1.3.png)

#### 2、修改`list`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SpuInfoController`类的`list`方法

```java
/**
 * 列表
 */
@RequestMapping("/list")
public R list(@RequestParam Map<String, Object> params) {
    PageUtils page = spuInfoService.queryPageByCondition(params);

    return R.ok().put("page", page);
}
```

![image-20220614094259175](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.2.png)

#### 3、添加`queryPageByCondition`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoService`接口里添加`queryPageByCondition`抽象方法

```java
PageUtils queryPageByCondition(Map<String, Object> params);
```

![image-20220614094320514](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.3.png)

#### 4、实现`queryPageByCondition`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里实现未实现的`queryPageByCondition`抽象方法

```java
/**
 * 根据条件分页查询
 * {
 *    page: 1,//当前页码
 *    limit: 10,//每页记录数
 *    sidx: 'id',//排序字段
 *    order: 'asc/desc',//排序方式
 *    key: '华为',//检索关键字
 *    catelogId: 6,//三级分类id
 *    brandId: 1,//品牌id
 *    status: 0,//商品状态
 * }
 * @param params
 * @return
 */
@Override
public PageUtils queryPageByCondition(Map<String, Object> params) {
    LambdaQueryWrapper<SpuInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    //根据"key"，精确匹配商品id 或 模糊查询spu_name
    String key = (String) params.get("key");
    lambdaQueryWrapper.and(StringUtils.hasLength(key),wrapper->{
        wrapper.eq(SpuInfoEntity::getId,key).or().like(SpuInfoEntity::getSpuName,key);
    });
    //根据status精确匹配状态
    String status = (String) params.get("status");
    lambdaQueryWrapper.eq(StringUtils.hasLength(status),SpuInfoEntity::getPublishStatus,status);
    //根据brandId精确匹配品牌id
    String brandId = (String) params.get("brandId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(brandId),SpuInfoEntity::getBrandId,brandId);
    //根据catelogId精确匹配所属分类id（注意：前端发来的是catelogId,数据库写的是catalogId）
    String catelogId = (String) params.get("catelogId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(catelogId),SpuInfoEntity::getCatalogId,catelogId);

    IPage<SpuInfoEntity> page = this.page(
            new Query<SpuInfoEntity>().getPage(params),
            lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220614112141228](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.4.png)

#### 5、测试

重启`gulimall-product`模块，打开前端页面进行测试

##### 测试一

打开`商品系统`->`商品维护`->`spu管理`,修改`状态`为`上架`，点击`查询`，可以看到没有数据

![image-20220614112300493](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.5.1.1.png)

查看`GulimallProductApplication`模块的控制台输出的`sql`语句，可以看到`sql`语句正常

```mysql
SELECT COUNT(1) FROM pms_spu_info WHERE (publish_status = ? AND brand_id = ? AND catalog_id = ?) 
```

![image-20220614112931073](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.5.1.2.png)

##### 测试二

打开`商品系统`->`商品维护`->`spu管理`,修改`状态`为`新建`，点击`查询`，可以看到一条数据

![image-20220614112329904](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.5.2.1.png)

查看`GulimallProductApplication`模块的控制台输出的`sql`语句，可以看到`sql`语句正常

```mysql
SELECT COUNT(1) FROM pms_spu_info WHERE (brand_id = ? AND catalog_id = ?) 
SELECT id,spu_description,spu_name,catalog_id,create_time,brand_id,weight,update_time,publish_status FROM pms_spu_info WHERE (brand_id = ? AND catalog_id = ?) LIMIT ?,? 
```

![image-20220614113208157](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.5.2.2.png)

测试三

打开`商品系统`->`商品维护`->`spu管理`，`检索`的输入框中输入`1`，点击`查询`

![image-20220614112545011](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.5.3.1.png)

查看`GulimallProductApplication`模块的控制台输出的`sql`语句，可以看到`sql`语句正常

```mysql
SELECT COUNT(1) FROM pms_spu_info WHERE (((id = ? OR spu_name LIKE ?)) AND brand_id = ? AND catalog_id = ?) 

SELECT id,spu_description,spu_name,catalog_id,create_time,brand_id,weight,update_time,publish_status FROM pms_spu_info WHERE (( (id = ? OR spu_name LIKE ?) ) AND brand_id = ? AND catalog_id = ?) LIMIT ?,? 
```

![image-20220614113252034](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.5.3.2.png)

#### 6、状态异常问题

如果`状态`为`新建`时，`status`为`1`则是前端和数据库的状态码没有对应起来

查看`src\views\modules\product\spuinfo.vue`文件的以下代码，这里指定了`新建`、`已上架`、`已下架`状态分别为`0`、`1`、`2`

```vue
<el-table-column prop="publishStatus" header-align="center" align="center" label="上架状态">
  <template slot-scope="scope">
    <el-tag v-if="scope.row.publishStatus == 0">新建</el-tag>
    <el-tag v-if="scope.row.publishStatus == 1">已上架</el-tag>
    <el-tag v-if="scope.row.publishStatus == 2">已下架</el-tag>
  </template>
</el-table-column>
```

![image-20220614114116404](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.6.1.png)

检索条件在`src\views\modules\product\spu.vue`文件里，可以看到`spu.vue`文件引用了`Spuinfo`文件


![image-20220614113806046](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.6.2.png)


修改`spu.vue`文件里的`状态`里的不同状态对应的值，`新建`、`已上架`、`已下架`状态分别为`0`、`1`、`2`

```vue
<el-form-item label="状态">
  <el-select style="width:160px" v-model="dataForm.status" clearable>
    <el-option label="新建" :value="0"></el-option>
    <el-option label="上架" :value="1"></el-option>
    <el-option label="下架" :value="2"></el-option>
  </el-select>
</el-form-item>
```

![image-20220614113850905](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.6.3.png)


#### 7、修改时间格式和时区

老师的时间`格式`不符合中国人习惯

![image-20220619200710866](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.7.1.png)

而我的项目`时区`不对

![image-20220614115448525](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.7.2.png)

修改`gulimall-product`模块的`src/main/resources/application.yml`配置文件，设置时间显示的格式

```yaml
spring:
  jackson:
    date-format: yyyy-MM-dd HH-mm-ss
```

![image-20220614114631103](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.7.3.png)

时区最好也设置一下

```yaml
spring:
  jackson:
    date-format: yyyy-MM-dd HH-mm-ss
    time-zone: GMT+8
```

![image-20220614114810747](https://gitlab.com/apzs/image/-/raw/master/image/4.7.1.7.4.png)



### 4.7.2、SKU检索

#### 1、查看接口

在`商品系统/商品维护/商品管理`里点击查询，查看请求

url： http://localhost:88/api/product/skuinfo/list?t=1655193479594&page=1&limit=10&key=&catelogId=0&brandId=0

![image-20220614155909254](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.1.1.png)

接口文档在`商品系统/21、sku检索`里：https://easydoc.net/s/78237135/ZUqEdvA4/ucirLq1D

![image-20220614115218657](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.1.2.png)

#### 2、修改`list`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SkuInfoController`模块的`list`方法

![image-20220614115720234](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.2.png)

#### 3、添加`queryPageByCondition`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuInfoService`接口里添加`queryPageByCondition`抽象方法

```java
PageUtils queryPageByCondition(Map<String, Object> params);
```

![image-20220614115816925](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.3.png)

#### 4、实现`queryPageByCondition`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类里实现未实现的`queryPageByCondition`抽象方法

```java
/**
 * 根据条件分页查询
 * {
 * page: 1,//当前页码
 * limit: 10,//每页记录数
 * sidx: 'id',//排序字段
 * order: 'asc/desc',//排序方式
 * key: '华为',//检索关键字
 * catelogId: 0,
 * brandId: 0,
 * min: 0,
 * max: 0
 * }
 *
 * @param params
 * @return
 */
@Override
public PageUtils queryPageByCondition(Map<String, Object> params) {
    LambdaQueryWrapper<SkuInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    //根据"key"，精确匹配商品id 或 模糊查询spu_name
    String key = (String) params.get("key");
    lambdaQueryWrapper.and(StringUtils.hasLength(key)  && !"0".equalsIgnoreCase(key), wrapper -> {
        wrapper.eq(SkuInfoEntity::getSkuId, key).or().like(SkuInfoEntity::getSkuName, key);
    });

    //根据catelogId精确匹配所属分类id（注意：前端发来的是catelogId,数据库写的是catalogId）
    String catelogId = (String) params.get("catelogId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(catelogId) && !"0".equalsIgnoreCase(catelogId), SkuInfoEntity::getCatalogId, catelogId);

    //根据brandId精确匹配品牌id
    String brandId = (String) params.get("brandId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(brandId) && !"0".equalsIgnoreCase(brandId), SkuInfoEntity::getBrandId, brandId);

    // price >= min
    String min = (String) params.get("min");
    if (StringUtils.hasLength(min)) {
        try {
            BigDecimal mimBigDecimal = new BigDecimal(min);
            lambdaQueryWrapper.ge(mimBigDecimal.compareTo(BigDecimal.ZERO)>0, SkuInfoEntity::getPrice, min);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // price <= max
    String max = (String) params.get("max");
    if (StringUtils.hasLength(max)) {
        try {
            BigDecimal maxBigDecimal = new BigDecimal(max);
            lambdaQueryWrapper.le( maxBigDecimal.compareTo(BigDecimal.ZERO)>0, SkuInfoEntity::getPrice, max);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    IPage<SkuInfoEntity> page = this.page(
            new Query<SkuInfoEntity>().getPage(params),
            lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220614174410390](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.4.png)

#### 5、测试

重启`gulimall-product`模块，打开`商品系统/商品维护/商品管理`,可以看到`价格`的两个输入框没输入时都为`0`

![image-20220619220828891](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.5.1.png)

手动把`价格`的第二个输入框(最大值)的`0`删了；打开控制台，点击`vue`，最左边选择`APP 1`，

中间依次选择`Root`->`APP`->`Main`->`MainContent`->`ElTabs`->`ElPane`->`ElCard`->`Manager`,

可以看到当价格的输入框没有数据时，值为`undefined`

![image-20220614155157775](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.5.2.png)

打卡`Vs Code`，点击`搜索框`(或使用快捷键`ctrl+shift+F`)，输入`价格`，然后点击`enter`,

选择`spu.vue`里的这个把`data`->`return`->`dataForm`->`price`里的`min`和`max`值都改为`undefined`

```javascript
data() {
  return {
    catPathSub: null,
    brandIdSub: null,
    dataForm: {
      key: "",
      brandId: 0,
      catelogId: 0,
      price: {
        min: undefined,
        max: undefined
      }
    },
    dataList: [],
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    dataListLoading: false,
    dataListSelections: [],
    addOrUpdateVisible: false,
    catelogPath: []
  };
},
```

![image-20220619222303036](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.5.3.png)

修改后查看页面，可以看到`价格`的两个输入框没输入时都没有`0`了，就不显示数据了

![image-20220614155349645](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.5.4.png)

这样修改后，没有设置的在发送请求时就不会就不会带上这个字段了

![image-20220614155607613](https://gitlab.com/apzs/image/-/raw/master/image/4.7.2.5.5.png)

## 4.8、仓库服务-API-仓库管理

`仓库服务-API-仓库管理`对应于`gulimall_wms`数据库

![image-20220614160337441](https://gitlab.com/apzs/image/-/raw/master/image/4.8.0.1.png)

`仓库服务-API-仓库管理`对应于`gulimall-ware`模块

![image-20220614160421031](https://gitlab.com/apzs/image/-/raw/master/image/4.8.0.2.png)

### 4.8.1、整合ware服务

#### 1、配置注册中心地址

在`gulimall-ware`模块的`src/main/resources/application.yml`配置文件里，添加`配置注册中心地址`和`应用名`

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
  application:
    name: gulimall-ware
```

![image-20220614160600771](https://gitlab.com/apzs/image/-/raw/master/image/4.8.1.1.png)

#### 2、开启服务发现

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.GulimallWareApplication`启动类上添加`@EnableDiscoveryClient`服务发现注解

```java
@EnableDiscoveryClient
```

![image-20220614160709664](https://gitlab.com/apzs/image/-/raw/master/image/4.8.1.2.png)

#### 3、指定要扫描的`Mapper`文件所在的包

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.GulimallWareApplication`启动类上添加`@MapperScan("com.atguigu.gulimall.ware.dao")`注解，并指定要扫描的`Mapper`文件所在的包

```java
@MapperScan("com.atguigu.gulimall.ware.dao")
```

![image-20220614160821054](https://gitlab.com/apzs/image/-/raw/master/image/4.8.1.3.png)

#### 4、开启事务管理

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.GulimallWareApplication`启动类上添加`@EnableTransactionManagement`注解，用于开启`事务管理`功能

```java
@EnableTransactionManagement
```

![image-20220614160924438](https://gitlab.com/apzs/image/-/raw/master/image/4.8.1.4.png)

### 4.8.2、运行gulimall-ware`模块

#### 1、将`gulimall-ware`模块添加到`Compond`里

点击`Unnamed`，选择`Edit Configurations...`

![image-20220614161220452](https://gitlab.com/apzs/image/-/raw/master/image/4.8.2.1.png)

点击右侧的`+`号，在弹出的选择框中选择`GulimallWareApplication`

![image-20220614161055713](https://gitlab.com/apzs/image/-/raw/master/image/4.8.2.2.png)

可以看到，已经添加到名称为`Unnamed`的`compond`里了

![image-20220614161149410](https://gitlab.com/apzs/image/-/raw/master/image/4.8.2.3.png)

#### 2、启动`gulimall-ware`模块

点击`IDEA`底部的`Services`，选择`GulimallWareApplication`,然后点击`Run`运行按钮

![image-20220614161339771](https://gitlab.com/apzs/image/-/raw/master/image/4.8.2.4.png)

可以看到`GulimallWareApplication`的控制台报错了,这里报错是因为加了`配置中心`的依赖，但是没有配置`配置中心地址`、`命名空间`等，这里可以先不用管

![image-20220614161420866](https://gitlab.com/apzs/image/-/raw/master/image/4.8.2.5.png)

打开`nacos`的前端页面，点击`服务管理`里的`服务列表`，可以看到`gulimall-ware`已经注册的`注册中心`里了

![image-20220614161506499](https://gitlab.com/apzs/image/-/raw/master/image/4.8.2.6.png)

### 4.8.3、仓库管理打不开

点击`库存系统`里的`仓库管理`，可以看到一直刷新不出来数据，打开控制台，点击失败的那个`list`的请求，右侧选择`Preview`,可以看到`path`的值为`/renren-fast/ware/wareinfo/list`，这表明网关路由给了`renren-fast`模块，而不是`gulimall-ware`模块

![image-20220614161724134](https://gitlab.com/apzs/image/-/raw/master/image/4.8.3.1.png)

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件里添加配置，配置负载均衡到`gulimall-ware`模块的路径匹配规则(注意写到`admin_route`前面)

```yaml
- id: ware_route
  uri: lb://gulimall-ware
  predicates:
    - Path=/api/ware/**
  filters:
    #http://localhost:88/api/ware/wareinfo/list 变为 http://localhost:11000/ware/wareinfo/list
    - RewritePath=/api/(?<segment>/?.*),/$\{segment}
```

![image-20220614162009550](https://gitlab.com/apzs/image/-/raw/master/image/4.8.3.2.png)

重启`gulimall-ware`模块，刷新前端页面，可以看到请求已经成功了

![image-20220614162150162](https://gitlab.com/apzs/image/-/raw/master/image/4.8.3.3.png)

### 4.8.4、添加测试数据

#### 1、添加一条测试数据

在`库存系统`里的`仓库维护`里，点击`新建`，新建一条数据；`仓库名`为`1号仓库`，`仓库地址`为`北京`，`区域编码`为`124`

![image-20220614162259394](https://gitlab.com/apzs/image/-/raw/master/image/4.8.4.1.1.png)

可以看到已经添加成功了

![image-20220614162329695](https://gitlab.com/apzs/image/-/raw/master/image/4.8.4.1.2.png)

#### 2、修改该测试数据的字段

在`库存系统`里的`仓库维护`里，点击刚刚添加的数据右边的`修改`按钮，把`仓库地址`修改为`北京xx`

![image-20220614162409669](https://gitlab.com/apzs/image/-/raw/master/image/4.8.4.2.1.png)

可以看到已经修改成功了

![image-20220614162440788](https://gitlab.com/apzs/image/-/raw/master/image/4.8.4.2.2.png)

#### 3、再添加一条测试数据

![image-20220614162532455](https://gitlab.com/apzs/image/-/raw/master/image/4.8.4.3.png)

### 4.8.5、添加仓库维护查询功能

#### 1、查看接口

先打开控制台，点击`Network`，清空数据，然后点击`库存系统`里的`仓库维护`里的查询按钮，查看发送请求url

url：http://localhost:88/api/ware/wareinfo/list?t=1655195182345&page=1&limit=10&key=

![image-20220614162709471](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.1.png)

#### 2、修改`queryPage`方法

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareInfoServiceImpl`类的`queryPage`方法

```java
@Override
public PageUtils queryPage(Map<String, Object> params) {
    LambdaQueryWrapper<WareInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();

    String key = (String) params.get("key");
    if (StringUtils.hasLength(key)){
        lambdaQueryWrapper.eq(WareInfoEntity::getId,key)
                .or().like(WareInfoEntity::getName,key)
                .or().like(WareInfoEntity::getAddress,key)
                .or().like(WareInfoEntity::getAreacode,key);
    }

    IPage<WareInfoEntity> page = this.page(
            new Query<WareInfoEntity>().getPage(params),
            lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220614163435122](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.2.png)

#### 3、修改日志级别为`debug`

在`gulimall-ware`模块的`src/main/resources/application.yml`配置文件里添加配置，修改`com.atguigu`包及其子包的输出日志的级别为`debug`级别

```yaml
logging:
  level:
    com.atguigu: debug
```

![image-20220614163644567](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.3.png)

#### 4、查看`sql`语句

重启`gulimall-ware`模块，再次点击`库存系统`里的`仓库维护`里的查询按钮

![image-20220614163824115](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.4.1.png)

查看`GulimallWareApplication`模块的控制台输出的`sql`语句，可以看到`sql`语句正常

```mysql
SELECT id,address,name,areacode FROM wms_ware_info WHERE (id = ? OR name LIKE ? OR address LIKE ? OR areacode LIKE ?) 
```

![image-20220614163937587](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.4.2.png)

#### 5、分页还有问题

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyBatisConfig`类文件

![image-20220615210545460](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.5.1.png)

粘贴到`gulimall-ware`模块的`com.atguigu.gulimall.ware.config`包下

![image-20220615210644264](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.5.2.png)

剪切`gulimall-ware`模块的`com.atguigu.gulimall.ware.GulimallWareApplication`启动类的`开启事务管理注解`和`Mapper包扫描注解`

```java
@EnableTransactionManagement
@MapperScan("com.atguigu.gulimall.ware.dao")
```

![image-20220615210741669](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.5.3.png)

将刚刚粘贴的代码，替换到`gulimall-ware`模块的`com.atguigu.gulimall.ware.config.MyBatisConfig`的

```java
@EnableTransactionManagement
@MapperScan("com.atguigu.gulimall.product.dao")
```

将其改为

```java
@EnableTransactionManagement
@MapperScan("com.atguigu.gulimall.ware.dao")
```

![image-20220615210757239](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.5.4.png)

完整代码

```java
package com.atguigu.gulimall.product.config;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author 无名氏
 * @date 2022/5/10
 * @Description:
 * @EnableTransactionManagement ：开启事务功能
 */
@Configuration
@EnableTransactionManagement
@MapperScan("com.atguigu.gulimall.product.dao")
public class MyBatisConfig {

    /**
     * 引入分页插件
     * @return
     */
    @Bean
    public PaginationInterceptor paginationInterceptor(){
        PaginationInterceptor paginationInterceptor = new PaginationInterceptor();
        //设置请求的页面大于最大页后操作，true调回到首页，false 继续请求 默认false
        paginationInterceptor.setOverflow(false);
        //设置最大单页限制数量，默认500条，-1 不受限制
        paginationInterceptor.setLimit(1000);

        return paginationInterceptor;
    }
}
```

#### 6、重新测试

重启`gulimall-ware`模块，刷新前端界面

##### 1、重新点击查询

![image-20220619234648667](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.6.1.png)

##### 2、查看`sql`语句

查看`GulimallWareApplication`模块的控制台输出的`sql`语句，可以看到已近带上分页信息了

```mysql
SELECT COUNT(1) FROM wms_ware_info WHERE (id = ? OR name LIKE ? OR address LIKE ? OR areacode LIKE ?) 

SELECT id,address,name,areacode FROM wms_ware_info WHERE (id = ? OR name LIKE ? OR address LIKE ? OR areacode LIKE ?) LIMIT ?,? 
```

![image-20220619235039841](https://gitlab.com/apzs/image/-/raw/master/image/4.8.5.6.2.png)

### 4.8.6、商品库存

#### 1、查看接口

先打开控制台，点击`Network`，清空数据，然后点击`库存系统/商品库存`，`仓库`选择`1号仓库`,`skuId`输入`1`，点击查询，可以看到请求的url为：http://localhost:88/api/ware/waresku/list?t=1655196148943&page=1&limit=10&skuId=1&wareId=1

![image-20220614164256829](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.1.1.png)

接口文档在`库存系统/02、查询商品库存`里: https://easydoc.net/s/78237135/ZUqEdvA4/hwXrEXBZ

![image-20220614164553204](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.1.2.png)

#### 2、修改`queryPage`方法

修改`gulimall-ware`模块里的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`queryPage`方法

```java
/**
 * {
 *    page: 1,//当前页码
 *    limit: 10,//每页记录数
 *    sidx: 'id',//排序字段
 *    order: 'asc/desc',//排序方式
 *    wareId: 123,//仓库id
 *    skuId: 123//商品id
 * }
 * @param params
 * @return
 */
@Override
public PageUtils queryPage(Map<String, Object> params) {

    LambdaQueryWrapper<WareSkuEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();

    String skuId = (String) params.get("skuId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(skuId),WareSkuEntity::getSkuId,skuId);

    String wareId = (String) params.get("wareId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(wareId),WareSkuEntity::getWareId,wareId);

    IPage<WareSkuEntity> page = this.page(
            new Query<WareSkuEntity>().getPage(params),
            lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220614165103674](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.2.png)

#### 3、重新发送请求

重启`gulimall-ware`模块，刷新前端页面；打开控制台，点击`Network`，清空数据，然后点击`库存系统/商品库存`里的`查询`

url：http://localhost:88/api/ware/waresku/list?t=1655196600891&page=1&limit=10&skuId=1&wareId=1

![image-20220614165026503](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.3.1.png)

查看`GulimallWareApplication`模块的控制台打印的`sql`语句

```mysql
SELECT id,sku_name,ware_id,stock_locked,stock,sku_id FROM wms_ware_sku WHERE (sku_id = ? AND ware_id = ?)
```

![image-20220614165215365](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.3.2.png)

#### 4、新增商品库存

点击`库存系统/商品库存`里的`新增`按钮，新增一个商品库存

`sku_id`输入`1`，`仓库`选择`1号仓库`，`库存数`输入`10`，`sku_name`输入`华为`，`锁定库存`输入`0`，然后点击确定

![image-20220614165300900](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.4.1.png)

可以看到已经新增成功了

![image-20220614165328584](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.4.2.png)

#### 5、修改商品库存

点击刚刚添加的那行数据的`修改`按钮，把`库存数`修改为`100`

![image-20220614165400506](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.5.1.png)

可以看到已经修改成功了

![image-20220614165425437](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.5.2.png)

#### 6、`商品管理`跳转到`库存管理`携带`skuId`

选择`商品系统/商品维护/商品管理`，点击一条数据的`更多`按钮，再`更多`里面选择`库存管理`

![image-20220614165640587](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.6.1.png)

可以看到跳转到`库存管理`时已自动携带刚刚选择的那个`商品管理`的那条数据的`skuId`

![image-20220614165720231](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.6.2.png)

#### 7、`采购需求`添加数据

在`库存系统/采购单维护/采购需求`里点击`新增`，`采购商品id`输入`3`，`采购数量`输入`2`，`仓库`选择`1号仓库`，然后点击确定

![image-20220614165934717](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.7.1.png)

在`库存系统/采购单维护/采购需求`里点击`新增`，`采购商品id`输入`1`，`采购数量`输入`10`，`仓库`选择`1号仓库`，然后点击确定

![image-20220614170034342](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.7.2.png)

#### 8、合并整单

选中表头中`id`左侧的可选按钮，以全选所有采购需求，然后点击`批量操作`，在`批量操作`里选择`合并整单`，稍后完成这个功能

![image-20220614170203075](https://gitlab.com/apzs/image/-/raw/master/image/4.8.6.8.png)

### 4.8.7、查询采购需求

#### 1、查看接口

先打开控制台，点击`Network`，清空数据，然后点击`库存系统/采购单维护/采购需求`，在采购需求里，`仓库`选择`1号仓库`，`状态`选择`已分配`，点击查询，可以看到请求的url为

http://localhost:88/api/ware/purchasedetail/list?t=1655197388337&page=1&limit=10&key=&status=1&wareId=1

![image-20220614170329492](https://gitlab.com/apzs/image/-/raw/master/image/4.8.7.1.1.png)

接口文档在`库存系统/03.查询采购需求`里:  https://easydoc.net/s/78237135/ZUqEdvA4/Ss4zsV7R

![image-20220614170424163](https://gitlab.com/apzs/image/-/raw/master/image/4.8.7.1.2.png)

#### 2、修改`queryPage`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseDetailServiceImpl`类里修改`queryPage`方法

```java
/**
 * {
 *    page: 1,//当前页码
 *    limit: 10,//每页记录数
 *    sidx: 'id',//排序字段
 *    order: 'asc/desc',//排序方式
 *    key: '华为',//检索关键字
 *    status: 0,//状态
 *    wareId: 1,//仓库id
 * }
 * @param params
 * @return
 */
@Override
public PageUtils queryPage(Map<String, Object> params) {

    LambdaQueryWrapper<PurchaseDetailEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();

    String key = (String) params.get("key");
        lambdaQueryWrapper.and(StringUtils.hasLength(key),wrapper -> {
            wrapper.eq(PurchaseDetailEntity::getSkuId, key).or().eq(PurchaseDetailEntity::getPurchaseId, key);
        });

    String status = (String) params.get("status");
    lambdaQueryWrapper.eq(StringUtils.hasLength(status),PurchaseDetailEntity::getStatus,status);

    String wareId = (String) params.get("wareId");
    lambdaQueryWrapper.eq(StringUtils.hasLength(wareId),PurchaseDetailEntity::getWareId,wareId);

    IPage<PurchaseDetailEntity> page = this.page(
            new Query<PurchaseDetailEntity>().getPage(params),
            lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220614183804323](https://gitlab.com/apzs/image/-/raw/master/image/4.8.7.2.png)

#### 3、测试

重启`gulimall-ware`模块，点击`库存系统/采购单维护/采购需求`，在采购需求里，`仓库`选择`1号仓库`，`状态`选择`已分配`，点击查询

![image-20220614184255818](https://gitlab.com/apzs/image/-/raw/master/image/4.8.7.3.1.png)

查看`GulimallWareApplication`模块的控制台打印的`sql`语句

```mysql
SELECT id,ware_id,purchase_id,sku_price,sku_num,sku_id,status FROM wms_purchase_detail WHERE (( (sku_id = ? OR purchase_id = ?) ) AND status = ? AND ware_id = ?)
```

![image-20220614184415655](https://gitlab.com/apzs/image/-/raw/master/image/4.8.7.3.2.png)

### 4.8.8、合并采购需求(1.查询`采购单`)

#### 1、采购简要流程

<img src="https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.1.png" alt="image-20220614184722625" style="zoom:67%;" />

#### 2、新增采购单

在`库存系统/采购单维护/采购单`里，点击`新增`，`优先级`输入`1`，然后点击确定

![image-20220614184928961](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.2.png)

#### 3、查询`采购单`接口

先打开控制台，点击`Network`，清空数据；选中表头中`id`左侧的可选按钮，以全选所有采购需求，然后点击`批量操作`，在`批量操作`里选择`合并整单`

![image-20220614185015067](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.3.1.png)

在`合并到整单`的对话框中需要查询`新建`或`已分配`的`采购单`，可以看到url为

http://localhost:88/api/ware/purchase/unreceive/list?t=1655203843040

![image-20220614185105320](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.3.2.png)

`新建`或`已分配`的`采购单`在`库存系统/采购单维护/采购单`里的`状态`中可以看到

![image-20220614185229357](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.3.3.png)

接口文档在`库存系统/05、查询未领取的采购单`里：https://easydoc.net/s/78237135/ZUqEdvA4/hI12DNrH

![image-20220614185453482](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.3.4.png)

#### 4、添加`unreceiveList`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.PurchaseController`里添加`unreceiveList`方法

```java
/**
 * 分页查询未领取的采购单
 */
@RequestMapping("/unreceive/list")
public R unreceiveList(@RequestParam Map<String, Object> params){
    PageUtils page = purchaseService.queryPageUnreceivePurchase(params);

    return R.ok().put("page", page);
}
```

![image-20220614190152959](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.4.png)

#### 5、添加`queryPageUnreceivePurchase`抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.PurchaseService`接口里添加`queryPageUnreceivePurchase`抽象方法

```java
PageUtils queryPageUnreceivePurchase(Map<String, Object> params);
```

![image-20220614190254861](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.5.png)

#### 6、实现`queryPageUnreceivePurchase`抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`里实现未实现的`queryPageUnreceivePurchase`抽象方法

```java
@Override
public PageUtils queryPageUnreceivePurchase(Map<String, Object> params) {

    LambdaQueryWrapper<PurchaseEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    //查询状态为0(新建) 或 1(已分配) 的采购单
    lambdaQueryWrapper.eq(PurchaseEntity::getStatus,0).or().eq(PurchaseEntity::getStatus,1);

    IPage<PurchaseEntity> page = this.page(
            new Query<PurchaseEntity>().getPage(params),
            lambdaQueryWrapper
    );

    return new PageUtils(page);
}
```

![image-20220614190912851](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.6.png)

#### 7、测试

点击以前创建`库存系统/采购单维护/采购单`里的`采购单id`为`1`的`操作`里的`分配`按钮，在弹出的`分配采购人员`里选择`admin`，然后点击确定，即可分配采购人员

![image-20220614191038467](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.7.1.png)

在`库存系统/采购单维护/采购需求`里，选中表头中`id`左侧的可选按钮，以全选所有采购需求，然后点击`批量操作`，在`批量操作`里选择`合并整单`

![image-20220614191329442](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.7.2.png)

然后就可以看到以前创建的`库存系统/采购单维护/采购单`里的采购单状态为`新建`或`已分配`的`采购单`，如果分配了采购人员，就可以在下拉列表中的`采购单id`的右边显示对应的分配的`采购人员姓名`和`采购人员电话`

![image-20220614191349478](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.7.3.png)

#### 8、修改分配的采购人员

在`系统管理/管理员列表`里新建管理员；`用户名`选择`leifengyang`，`密码`输入`123456`，`确认密码`里输入`123456`，`邮箱`输入`aaa@qq.com`，`手机号`输入`12345678912`，`状态`默认`正常`不用管，然后点击`确定`

![image-20220614191547642](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.8.1.png)

然后点击`库存系统/采购单维护/采购单`里的上次创建的`采购单id`为`1`的那行数据的`操作`里的`分配`按钮，在弹出的`分配采购人员`里就可以看到刚刚`添加管理员`里添加的管理员了，这些管理员就是可以分配的采购人员

选择刚刚创建的`leifengyang`，然后点击`确定`按钮

![image-20220614191715258](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.8.2.png)

这样上次创建的`采购单id`为`1`的那行数据的`采购人名`就变成了`leifengyang`，联系电话就变为了`12345678912`

![image-20220614191740042](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.8.3.png)

选中表头中`id`左侧的可选按钮，以全选所有采购需求，然后点击`批量操作`，在`批量操作`里选择`合并整单`，然后就可以看到`采购单id`为`1`的`采购人员姓名`已经修改为`leifengyang`了，联系电话已经被修改为`12345678912`了

![image-20220614191939490](https://gitlab.com/apzs/image/-/raw/master/image/4.8.8.8.4.png)

### 4.8.9、合并采购需求(2.完成合并)

#### 1、查看接口

##### 1、选择想要合并的采购单id

选择`1 leifengyang: 12345678912`后 ，先打开控制台，点击`Network`，清空数据，然后点击确定

可以看到请求的url为： http://localhost:88/api/ware/purchase/merge

![image-20220614192020545](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.1.1.1.png)

发送到`json`数据为`{purchaseId: 1, items: {1, 2}}`

![image-20220614192448552](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.1.1.2.png)

接口文档在`库存系统/04、合并采购需求`里：https://easydoc.net/s/78237135/ZUqEdvA4/cUlv9QvK

![image-20220614192149087](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.1.1.3.png)

##### 2、不选择想要合并的采购单id

在`合并到整单`里可以不选择想要合并的采购单，直接点击确定

![image-20220614192556641](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.1.2.1.png)

在弹出的`提示`对话框里点击`确定`

![image-20220614192615039](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.1.2.2.png)

这时提交的`json`数据，没有`purchaseId`(采购单id)，只有`item`,这时需要自动创建一个新的采购单

![image-20220614192702323](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.1.2.3.png)

#### 2、新建`MergeVo`类

在`gulimall-ware`模块的`com.atguigu.gulimall.ware`包下，新建`vo`文件夹，在刚刚新建的`com.atguigu.gulimall.ware.vo`文件夹里新建`MergeVo`类

```java
package com.atguigu.gulimall.ware.vo;

import lombok.Data;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/6/14
 * @Description:
 */
@Data
public class MergeVo {

    /**
     * 采购单id
     */
    private Long purchaseId;
    /**
     * 要合并的采购项集合
     */
    private List<Long> items;
}
```

![image-20220614193510395](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.2.png)

#### 3、添加`merge`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.PurchaseController`类里添加`merge`方法

```java
/**
 * 合并采购需求
 * @param mergeVo
 * @return
 */
@PostMapping("/merge")
public R merge(@RequestBody MergeVo mergeVo){
    purchaseService.mergePurchase(mergeVo);
    return R.ok();
}
```

![image-20220614193952336](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.3.png)

#### 4、添加`mergePurchase`抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.PurchaseService`接口里添加`mergePurchase`抽象方法

```java
void mergePurchase(MergeVo mergeVo);
```

![image-20220614194027812](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.4.png)

#### 5、调整常量类的代码结构

在`gulimall-common`模块的`com.atguigu.common.constant`包下新建`product`文件夹,把`ProductConstant`枚举类移动到`product`文件夹下

![image-20220614200450052](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.5.1.png)

选中`ProductConstant`枚举类，右键选择`Refactor`(重构)，然后选择`Rename...`

![image-20220614200633959](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.5.2.png)

在弹出的框内，修改名字为`AttrEnum`，然后点击`Refactor`

![image-20220614200617454](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.5.3.png)

#### 6、新建采购商品枚举类

在`gulimall-common`模块的`com.atguigu.common.constant`包下新建`ware`文件夹，在`com.atguigu.common.constant.ware`文件夹下新建`PurchaseStatusEnum`(采购商品的采购单完成状态)枚举类

```java
package com.atguigu.common.constant.ware;

/**
 * @author 无名氏
 * @date 2022/6/14
 * @Description:
 */
public enum PurchaseStatusEnum {
    /**
     * 刚新建状态
     */
    CREATED(0,"新建"),
    /**
     * 已分配给采购员
     */
    ASSIGNED(1,"已分配"),
    /**
     * 采购员已领取
     */
    RECEIVE(2,"已领取"),
    /**
     * 采购员已完成采购
     */
    FINISHED(3,"已完成"),
    /**
     * 采购异常
     */
    HASERROR(4,"有异常");

    private int status;
    private String msg;

    PurchaseStatusEnum(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }
}
```

![image-20220614202825301](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.6.1.png)

在`gulimall-common`模块的`com.atguigu.common.constant.ware`包下新建`PurchaseStatusEnum`(采购单具体采购的商品的完成状态)枚举类

```java
package com.atguigu.common.constant.ware;

/**
 * @author 无名氏
 * @date 2022/6/14
 * @Description:
 */
public enum PurchaseDetailStatusEnum {
    /**
     * 刚新建状态
     */
    CREATED(0,"新建"),
    /**
     * 已分配给采购员
     */
    ASSIGNED(1,"已分配"),
    /**
     * 采购员正在采购
     */
    BUYING(2,"正在采购"),
    /**
     * 采购员已完成采购
     */
    FINISHED(3,"已完成"),
    /**
     * 采购员采购失败
     */
    HASERROR(4,"采购失败");

    private int status;
    private String msg;

    PurchaseDetailStatusEnum(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public String getMsg() {
        return msg;
    }
}
```

![image-20220614203245139](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.6.2.png)

#### 7、实现`mergePurchase`抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类里修改空的`mergePurchase`方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void mergePurchase(MergeVo mergeVo) {
    Long purchaseId = mergeVo.getPurchaseId();
    if (purchaseId == null){
        PurchaseEntity purchaseEntity = new PurchaseEntity();
        purchaseEntity.setStatus(PurchaseStatusEnum.CREATED.getStatus());
        this.save(purchaseEntity);
        purchaseId = purchaseEntity.getId();
    }

    List<Long> items = mergeVo.getItems();
    Long finalPurchaseId = purchaseId;
    List<PurchaseDetailEntity> purchaseDetailEntities = items.stream().map(item -> {
        PurchaseDetailEntity purchaseDetailEntity = new PurchaseDetailEntity();
        purchaseDetailEntity.setId(item);
        purchaseDetailEntity.setPurchaseId(finalPurchaseId);
        purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.ASSIGNED.getStatus());
        return purchaseDetailEntity;
    }).collect(Collectors.toList());

    purchaseDetailService.updateBatchById(purchaseDetailEntities);
}
```

![image-20220614204427993](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.7.png)

#### 8、在`PurchaseEntity`类添加注解

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.entity.PurchaseEntity`类里的`createTime`字段上添加`@TableField(fill = FieldFill.INSERT)`注解，当在`插入`时向该字段插入当前系统时间；在`updateTime`字段上添加`@TableField(fill = FieldFill.INSERT_UPDATE)`注解，当在`插入`或`更新`时向该字段插入或更新为当前系统时间

[点击查看`PurchaseEntity`类完整代码](code/4.8.9.8.PurchaseEntity.java)

![image-20220614204518437](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.8.png)

#### 9、设置`时间格式`和`时区`

在`gulimall-ware`模块的`src/main/resources/application.yml`配置文件里设置`时间格式`和`时区`

```yaml
spring:
  jackson:
    date-format: yyyy-MM-dd HH-mm-ss
    time-zone: GMT+8
```

![image-20220614205149464](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.9.png)

#### 10、修改`mergePurchase`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类里修改`mergePurchase`方法

```java
@Autowired
PurchaseDetailService purchaseDetailService;

@Transactional(rollbackFor = Exception.class)
@Override
public void mergePurchase(MergeVo mergeVo) {
    Long purchaseId = mergeVo.getPurchaseId();
    if (purchaseId == null){
        PurchaseEntity purchaseEntity = new PurchaseEntity();
        purchaseEntity.setStatus(PurchaseStatusEnum.CREATED.getStatus());
        //自动更新PurchaseEntity的更新时间
        this.save(purchaseEntity);
        purchaseId = purchaseEntity.getId();
    }else {
        //更新PurchaseEntity(采购单)的更新时间
        PurchaseEntity purchaseEntity = new PurchaseEntity();
        purchaseEntity.setId(purchaseId);
        purchaseEntity.setUpdateTime(new Date());
        this.updateById(purchaseEntity);
    }

    List<Long> items = mergeVo.getItems();
    Long finalPurchaseId = purchaseId;
    List<PurchaseDetailEntity> purchaseDetailEntities = items.stream().map(item -> {
        PurchaseDetailEntity purchaseDetailEntity = new PurchaseDetailEntity();
        purchaseDetailEntity.setId(item);
        purchaseDetailEntity.setPurchaseId(finalPurchaseId);
        purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.ASSIGNED.getStatus());
        return purchaseDetailEntity;
    }).collect(Collectors.toList());

    //合并采购需求，分派到指定采购单
    purchaseDetailService.updateBatchById(purchaseDetailEntities);
}
```

![image-20220614210320804](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.10.png)

#### 11、测试一

重启`gulimall-ware`模块,点击`库存系统/采购单维护/采购需求`，选中表头中`id`左侧的可选按钮，以全选所有采购需求，然后点击`批量操作`，在`批量操作`里选择`合并整单`,然后选择`1 leifengyang: 12345678912`后 ，点击确定

![image-20220614210524845](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.11.1.png)

可以看到，刚刚全选的两个`采购需求`的`采购单id`和`状态`都已经更新了

![image-20220614210635314](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.11.2.png)

点击``库存系统/采购单维护/采购`单已经更新了，设置时区后，更新的时间也是系统时间了

![image-20220614211030868](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.11.3.png)

#### 12、测试二

在`库存系统/采购单维护/采购需求`里，点击`新增`，在`采购商品id`里输入`2`，`采购数量`输入`20`，`仓库`选择`2号仓库`，然后点击确定

![image-20220614211131709](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.1.png)

在`库存系统/采购单维护/采购需求`里，点击`新建`,在`新增`对话框里，`采购商品id`输入`2`，`采购数量`输入`20`，`仓库`选择`2号仓库`

然后选中刚刚创建的`id`为`3`的采购需求的左侧按钮，然后点击`批量操作`，在`批量操作`里选择`合并整单`

![image-20220614211230326](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.2.png)

在`合并到整单`里可以不选择想要合并的采购单，直接点击确定

![image-20220614211309852](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.3.png)

在弹出的`提示`对话框里点击`确定`

![image-20220614211325353](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.4.png)

可以看到在`库存系统/采购单维护/采购需求`里，刚刚创建的`id`为`3`的`采购需求`的`状态`已变为`已分配`

![image-20220614211354619](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.5.png)

在`库存系统/采购单维护/采购单`里，可以看到已自动创建了一个`采购单`，这个采购单的`状态`为`新建`

![image-20220614211426208](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.6.png)

点击这个`采购单`的`操作`里的`分配`按钮，在`分配采购人员`的对话框中选择`admin`，然后点击`确定`

![image-20220614211502224](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.12.7.png)

#### 13、修改没有自动创建时间的bug

可以看到刚刚自动创建的那个`采购单`的`创建时间`和`更新时间`没有自动创建

![image-20220614211426208](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.13.1.png)

调试后，发现`create_time`和`update_time`传入的参数都为`null`

```mysql
INSERT INTO wms_ purchase ( create_time，update_time，status ) VALUES ( ?， ? ，? )
```

![image-20220614211753133](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.13.2.png)

原因是没有设置`mybatisPlus`的属性自动填充配置

在`gulimall-ware`模块的`com.atguigu.gulimall.ware`包里新建`config`文件夹，

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyMetaObjectHandler`类，粘贴到`gulimall-ware`模块的`com.atguigu.gulimall.ware.config`包里

```java
package com.atguigu.gulimall.ware.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

/**
 * @author 无名氏
 * @date 2022/6/14
 * @Description:
 */
@Slf4j
@Configuration
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("start insert fill...");
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("start update fill...");
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }
}
```

![image-20220614212341199](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.13.3.png)

#### 14、重新测试

重启`gulimall-ware`模块，刷新前端界面，在`库存系统/采购单维护/采购单`里，点击`新增`，在弹出的`新增`对话框里的`优先级`里输入`3`，然后点击`确定`

![image-20220614212524728](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.14.1.png)

可以看到`create_time`和`update_time`都已经成功插入进去了

![image-20220614212551163](https://gitlab.com/apzs/image/-/raw/master/image/4.8.9.14.2.png)

### 4.8.10、领取采购单

#### 1、查看接口

`领取采购单`为采购员使用app领取，不属于后台管理系统，所以可以使用`Postman`模拟采购员`领取采购单`

接口文档在`库存系统/06、领取采购单`里: https://easydoc.net/s/78237135/ZUqEdvA4/vXMBBgw1

![image-20220614213006277](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.1.1.png)

在`Postman`里新建一个请求，url输入`http://localhost:88/api/ware/purchase/received`,请求方式选择`POST`，然后按`ctrl+s`保存

![image-20220614213232724](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.1.2.png)

在弹出的`SAVE REQUEST`对话框里，`Request name`里输入`领取采购单`，然后点击下面的`Create a collection`

![image-20220614213431165](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.1.3.png)

在`SAVE REQUEST`对话框里的`Save to`里输入`采购人员app`，点击右侧的`Create`按钮

![image-20220614213539031](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.1.4.png)

然后点击`Save`按钮

![image-20220614213552521](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.1.5.png)

在刚刚新建的请求中，点击`Body`、然后点击`raw`，在`GraphQL`右侧的下拉列表中选择`JSON`，然后在下方输入框中输入`[3,4]`，最后点击`Send`(输入`[3,4]`表示要领取id为`3`和`4`的采购单)

![image-20220615104015989](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.1.6.png)

#### 2、创建`received`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.PurchaseController`类中创建`received`方法

```java
/**
 * 采购员领取采购单
 * @param purchaseIds 采购单id
 * @return
 */
@PostMapping("/received")
public R received(@RequestBody List<Long> purchaseIds){
    purchaseService.received(purchaseIds);
    return R.ok();
}
```

![image-20220615083311741](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.2.png)

#### 3、新建`received`抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.PurchaseService`接口里新建`received`抽象方法

```java
void received(List<Long> purchaseIds);
```

![image-20220615083427579](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.3.png)

#### 4、实现`received`抽象方法

需要完成的效果为：

1、首先需要修改刚刚领取的所有采购单状态，把采购单状态修改为`已领取`

(这里我把`采购单id`为3的采购单分配给`admin`用户了，点击`采购单id`为3的右侧的分配，选择`admin`即可)

![image-20220615083759255](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.4.1.png)

2、这些采购单对应的所有采购需求都要改为`正在采购`

(我先把id为3的采购需求的`采购单id`修改为3了，选中该数据左侧的按钮，点击`批量操作`，在`批量操作`里选择`合并整单`,在弹出的`分配采购人员`里选择`admin`，然后点击`确定`按钮)

![image-20220615083915584](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.4.2.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类里实现未实现的`received`抽象方法

在`streat`的`map`那，IDEA提示建议使用`peek`来代替`map`；`java.util.Stream.peek()`主要用于支持调试。如果流管道不包含终端操作，则不会使用任何元素，并且根本不会调用peek()操作。所以最好不要使用`peek`

```java
/**
 * 采购员领取采购单
 *
 * @param purchaseIds 采购单id
 */
@Override
public void received(List<Long> purchaseIds) {
    //1、确认当前采购单的id是"新建"或者是"已分配"状态
    LambdaQueryWrapper<PurchaseEntity> purchaseQueryWrapper = new LambdaQueryWrapper<>();
    purchaseQueryWrapper.and(wrapper -> {
        wrapper.eq(PurchaseEntity::getStatus, PurchaseStatusEnum.CREATED.getStatus())
                .or().eq(PurchaseEntity::getStatus, PurchaseStatusEnum.ASSIGNED.getStatus());
    }).in(PurchaseEntity::getId, purchaseIds);
    List<PurchaseEntity> purchaseEntities = this.list(purchaseQueryWrapper);

    //2、改变采购单状态(已使用注解在更新字段时自动更新updateTime)
    List<PurchaseEntity> newPurchaseEntities = purchaseEntities.stream().map(purchaseEntity -> {
        purchaseEntity.setStatus(PurchaseStatusEnum.RECEIVE.getStatus());
        return purchaseEntity;
    }).collect(Collectors.toList());
    this.updateBatchById(newPurchaseEntities);

    //3、改变采购项状态
    PurchaseDetailEntity purchaseDetailEntity = new PurchaseDetailEntity();
    purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.BUYING.getStatus());
    purchaseDetailService.updatePurchaseDetailBatchByPurchaseId(purchaseDetailEntity,newPurchaseEntities);
}
```

![image-20220615095031917](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.4.3.png)

#### 5、新建批量修改采购需求抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.PurchaseDetailService`接口里新建`updatePurchaseDetailBatchByPurchaseId`抽象方法

```java
void updatePurchaseDetailBatchByPurchaseId(PurchaseDetailEntity purchaseDetailEntity, List<PurchaseEntity> purchaseEntities);
```

![image-20220615100049272](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.5.png)

#### 6、实现批量修改采购需求抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseDetailServiceImpl`类里实现未实现的`updatePurchaseDetailBatchByPurchaseId`抽象方法

![image-20220615100252009](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.6.png)

#### 7、给这些具体方法添加事务注解

给`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类的`received`方法添加事务注解，并指定有异常就回滚事务

```java
@Transactional(rollbackFor = Exception.class)
```

![image-20220615100748683](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.7.1.png)

给`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseDetailServiceImpl`类的`updatePurchaseDetailBatchByPurchaseId`方法添加事务注解，并指定有异常就回滚事务

```java
@Transactional(rollbackFor = Exception.class)
```

![image-20220615100803171](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.7.2.png)

#### 8、测试

给`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类的`received`方法里的第一条语句打断点，然后点击`IDEA`底部的`Service`按钮，选择`GulimallWareApplication`，右键选择`Return in Debug Mode`，以`debug`方式重新启动`GulimallWareApplication`模块

![image-20220615100934480](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.1.png)

将`gulimall_wms`数据库中的`wms_purchase`表中修改`id`为`3`的`status`为`2`

![image-20220615104336853](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.2.png)

刷新前端页面，可以看到在`库存系统/采购单维护/采购单`里，`id`为`3`的`采购需求`的`状态`已变为`已领取`

![image-20220615104512089](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.3.png)

打开`Postman`，发送领取采购单的请求

![image-20220615104045438](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.4.png)

切换到`IDEA`，可以看到已经接收到`purchase_id`为`3`和`4`的两条数据了

![image-20220615104124184](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.5.png)

继续向下执行，直到`确认当前采购单的id是"新建"或者是"已分配"状态`完成，到`改变采购单状态(已使用注解在更新字段时自动更新updateTime)`停止，可以看到刚刚修改的`id`为`3`的状态为`已领取`的那条数据已经被过滤掉了，只剩下`id`为`4`的状态为`新建`的那条数据了

![image-20220615104627577](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.6.png)

选择`GulimallWareApplication`模块的控制台，此时的`sql`语句也正确

```mysql
SELECT id, amount , ware_id, create_time, phone, assignee_name , update_time, priority, assignee_id, status FROM wms_purchase WHERE ( (status = ? OR status = ?) ) AND id IN (?,?)
```

![image-20220615104801580](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.7.png)

继续向下执行，直到映射结束，停在`this.updateBatchById(newPurchaseEntities);`方法上，可以看到此时的`newPurchaseEntities`的`status`已修改为`2`

![image-20220615104859953](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.8.png)

继续向下执行，执行完`this.updateBatchById(newPurchaseEntities);`方法，查看`GulimallWareApplication`模块的控制台，此时的`sql`语句也正确

```mysql
UPDATE wms_purchase SET create_time=?, phone=?, assignee_name=?，update_time=?，priority=?, status=? WHERE id=?
```

![image-20220615105044203](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.9.png)

继续向下执行，直到`改变采购项状态`所有代码都执行完，可以看到`PurchaseDetailEntity`的`status`为`2`

![image-20220615105320878](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.10.png)

查看`GulimallWareApplication`模块的控制台，此时的`sql`语句也正确

```mysql
UPDATE wms_purchase_detail SET status=? WHERE (purchase_id IN (?))
```

![image-20220615105420470](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.8.11.png)

#### 9、添加待办事项

在`库存系统/采购单维护/采购需求`里，选中表头中`id`左侧的可选按钮，以全选所有采购需求，然后点击`批量操作`，在`批量操作`里选择`合并整单`，在`合并到整单`的下拉列表里选择`1 leifengyang 12345678912`，然后点击确定

![image-20220615105740827](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.9.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类里的`mergePurchase`里添加待办事项，后面完成`确认采购单状态是0，1才可以合并`功能

```java
//TODO 确认采购单状态是0，1才可以合并
```

![image-20220615110011514](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.9.2.png)

可以看到在领取到采购单后，这些被领取的`采购单`，并没有修改`采购人id`，`采购人名`、`联系方式`，这个功能目前由于没有登录，所以目前实现不了

![image-20220615155836991](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.9.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类里的`received`方法里添加待办事项，后面完成`设置采购人id，采购人名、联系方式`功能

```java
//TODO 设置采购人id，采购人名、联系方式
```

![image-20220615160034810](https://gitlab.com/apzs/image/-/raw/master/image/4.8.10.9.4.png)

### 4.8.11、完成采购

#### 1、查看接口

`完成采购`为采购员使用app领取，不属于后台管理系统，所以可以使用`Postman`模拟采购员`完成采购`

接口文档在`库存系统/07、完成采购`里： https://easydoc.net/s/78237135/ZUqEdvA4/cTQHGXbK

![image-20220615155034336](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.1.1.png)

在`库存系统/采购单维护/采购需求`里，`id`为`3`的采购需求的`采购单id`为`3`

![image-20220615160507927](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.1.2.png)

在`gulimall_wms`数据库的`wms_purchase_detail`表里将`id`为`3`的`purchase_id`修改为`4`

![image-20220615160630004](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.1.3.png)

再新增一条数据,`id`输入`4`，`purchase_id`输入`4`，`sku_id`输入`4`，`sku_num`输入`30`，`ware_id`输入`2`，`status`输入`2`，然后点击下面的`√`

![image-20220615160917672](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.1.4.png)

发送的请求中`id`对应`库存系统/采购单维护/采购需求`里的`id`，`items`里的`itemId`对应`库存系统/采购单维护/采购需求`里的`采购单id`，即为完成某个采购单的部分或全部`采购项(采购需求)`

请求的url为: http://localhost:88/api/ware/purchase/done ，请求方式为`POST`

```json
{
   "id": 4,
   "items": [
       {"itemId":3,"status":3,"reason":""},
       {"itemId":4,"status":4,"reason":"无货"}
    ]
}
```

![image-20220615162226790](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.1.5.png)

#### 2、新建`PurchaseDoneVo`类

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo`包里新建`PurchaseDoneVo`类

```java
package com.atguigu.gulimall.ware.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/6/15
 * @Description: 采购完成
 *
 * {
 *    "id": 4,
 *    "items": [
 *        {"itemId":3,"status":3,"reason":""},
 *        {"itemId":4,"status":4,"reason":"无货"}
 *     ]
 * }
 */
@Data
public class PurchaseDoneVo {

    /**
     * 采购单id
     */
    @NotNull
    private Long  id;
    private List<PurchaseItemDone> items;

    /**
     * 采购项
     */
    @Data
    public class PurchaseItemDone{
        /**
         * 采购项id
         */
        private Long itemId;
        /**
         * 采购状态(3:采购完成 ; 4:采购失败)
         */
        private Integer status;
        /**
         * 失败原因
         */
        private String reason;
    }

}
```

![image-20220615163320567](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.2.png)

#### 3、新建`finish`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.PurchaseController`类里新建`finish`方法

```java
/**
 * 采购员完成采购
 * /ware/purchase/done
 * @param purchaseDoneVo
 * @return
 */
@PostMapping("/done")
public R finish(@RequestBody PurchaseDoneVo purchaseDoneVo){
    purchaseService.donePurchase(purchaseDoneVo);
    return R.ok();
}
```

![image-20220615163521858](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.3.png)

#### 4、新建`donePurchase`抽象接口

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.PurchaseService`接口里新建`donePurchase`抽象接口

![image-20220615163603585](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.4.png)

#### 5、实现`donePurchase`抽象接口

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类里实现未实现的`donePurchase`抽象方法

```java
@Autowired
WareSkuService wareSkuService;

/**
 * 采购员完成采购
 * @param purchaseDoneVo
 */
@Transactional(rollbackFor = Exception.class)
@Override
public void donePurchase(PurchaseDoneVo purchaseDoneVo) {

    AtomicBoolean flag = new AtomicBoolean(true);
    //1、改变采购项状态
    List<PurchaseDetailEntity> purchaseDetailEntities = purchaseDoneVo.getItems().stream().map(purchaseItemDone -> {
        PurchaseDetailEntity purchaseDetailEntity = new PurchaseDetailEntity();
        if (purchaseItemDone.getStatus() == PurchaseDetailStatusEnum.HASERROR.getStatus()) {
            flag.set(false);
            purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.HASERROR.getStatus());
        } else if (purchaseItemDone.getStatus() == PurchaseDetailStatusEnum.BUYING.getStatus()){
            purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.FINISHED.getStatus());
        }
        purchaseDetailEntity.setId(purchaseItemDone.getItemId());
        return purchaseDetailEntity;
    }).collect(Collectors.toList());
    purchaseDetailService.updateBatchById(purchaseDetailEntities);

    //2、改变采购单状态
    Long purchaseId = purchaseDoneVo.getId();
    PurchaseEntity purchaseEntity = new PurchaseEntity();
    purchaseEntity.setId(purchaseId);
    Integer status = flag.get()?PurchaseStatusEnum.FINISHED.getStatus() : PurchaseStatusEnum.HASERROR.getStatus();
    purchaseEntity.setStatus(status);
    this.updateById(purchaseEntity);

    //3、将成功采购的进行入库
    List<Long> purchaseDetailIds = purchaseDoneVo.getItems().stream().filter(purchaseItemDone -> {
        return purchaseItemDone.getStatus() == PurchaseDetailStatusEnum.BUYING.getStatus();
    }).map(PurchaseDoneVo.PurchaseItemDone::getItemId).collect(Collectors.toList());
    Collection<PurchaseDetailEntity> purchaseDetailList = purchaseDetailService.listByIds(purchaseDetailIds);

    wareSkuService.addOrUpdateStockBatchByskuIdAndwareId(purchaseDetailList);
}
```

![image-20220615200305836](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.5.png)

#### 6、新建添加或更新库存抽象接口

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareSkuService`接口里新建`addOrUpdateStockBatchByskuIdAndwareId`抽象接口

```java
void addOrUpdateStockBatchByskuIdAndwareId(Collection<PurchaseDetailEntity> purchaseDetailList);
```

![image-20220615200456324](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.6.png)

#### 7、实现添加或更新库存抽象接口

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里实现未实现的`addOrUpdateStockBatchByskuIdAndwareId`抽象方法

```java
@Autowired
WareSkuDao wareSkuDao;

@Transactional(rollbackFor = Exception.class)
@Override
public void addOrUpdateStockBatchByskuIdAndwareId(Collection<PurchaseDetailEntity> purchaseDetailList) {
    purchaseDetailList.forEach(this::addOrUpdateStockByskuIdAndwareId);
}

@Transactional(rollbackFor = Exception.class)
public void addOrUpdateStockByskuIdAndwareId(PurchaseDetailEntity purchaseDetailEntity) {
    WareSkuEntity wareSkuEntity = new WareSkuEntity();
    wareSkuEntity.setSkuId(purchaseDetailEntity.getSkuId());
    wareSkuEntity.setWareId(purchaseDetailEntity.getWareId());

    LambdaQueryWrapper<WareSkuEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(WareSkuEntity::getSkuId,purchaseDetailEntity.getSkuId())
            .eq(WareSkuEntity::getWareId,purchaseDetailEntity.getWareId());
    WareSkuEntity query = wareSkuDao.selectOne(lambdaQueryWrapper);
    if (query==null){
            wareSkuEntity.setStock(purchaseDetailEntity.getSkuNum());
            wareSkuDao.insert(wareSkuEntity);
    }else {
        wareSkuEntity.setId(query.getId());
        wareSkuEntity.setStock(query.getStock()+purchaseDetailEntity.getSkuNum());
        wareSkuDao.updateById(wareSkuEntity);
    }
}
```

![image-20220615204549277](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.7.png)

#### 8、测试

重启`gulimall-ware`模块，打开`Postman`

选择请求的url为: http://localhost:88/api/ware/purchase/done的对话框，按`ctrl+S`快捷键保存，在弹出的`SAVE REQUEST`对话框里，`Request name`里输入`完成采购`，点击`Save to`里的`采购人员app`，把`完成采购`放到`采购人员app`里面，然后点击`Save`

![GIF 2022-6-15 23-10-02](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.1.gif)

点击`Send`后，显示报了`400`的错误

![image-20220615231715243](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.2.png)

查看`GulimallWareApplication`模块的控制台，可以发现已经报错了

```
Resolved [org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot construct instance of `com.atguigu.gulimall.ware.vo.PurchaseDoneVo$PurchaseItemDone` (although at least one Creator exists): can only instantiate non-static inner class by using default, no-argument

已解决 [org.springframework.http.converter.HttpMessageNotReadableException：JSON 解析错误：无法构造 `com.atguigu.gulimall.ware.vo.PurchaseDoneVo$PurchaseItemDone` 的实例（尽管至少存在一个 Creator）：只能实例化非静态 使用默认的无参数的内部类
```

![image-20220615231358244](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.3.png)

把`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo.PurchaseDoneVo`类的`PurchaseItemDone`内部类上添加`static`关键字

![image-20220615231750046](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.4.png)

重启`gulimall-ware`模块，打开`Postman`，再次发送请求，这次报了`500`的错误

![image-20220615233005159](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.5.png)

查看`GulimallWareApplication`模块的控制台，查看`sql`语句可以看到执行`update`操作时只有更新条件，却没有更新的字段

```mysql
UPDATE wms_ purchase_ detail WHERE id=?
```

![image-20220615233148420](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.6.png)

调试发现，`purchaseDetailEntities`中`id`为`3`的数据的`status`为`null`，整条数据只有`id`

![image-20220615233304771](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.7.png)

在该`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类的`donePurchase`方法里添加过滤条件,只有`purchaseDetailEntity.getStatus()!=null`的数据才保留

```java
//1、改变采购项状态
List<PurchaseDetailEntity> purchaseDetailEntities = purchaseDoneVo.getItems().stream().map(purchaseItemDone -> {
    PurchaseDetailEntity purchaseDetailEntity = new PurchaseDetailEntity();
    if (purchaseItemDone.getStatus() == PurchaseDetailStatusEnum.HASERROR.getStatus()) {
        flag.set(false);
        purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.HASERROR.getStatus());
    } else if (purchaseItemDone.getStatus() == PurchaseDetailStatusEnum.FINISHED.getStatus()){
        purchaseDetailEntity.setStatus(PurchaseDetailStatusEnum.FINISHED.getStatus());
    }
    purchaseDetailEntity.setId(purchaseItemDone.getItemId());
    return purchaseDetailEntity;
}).filter(purchaseDetailEntity->{
    return purchaseDetailEntity.getStatus()!=null;
}).collect(Collectors.toList());
purchaseDetailService.updateBatchById(purchaseDetailEntities);
```

![image-20220615233734194](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.8.png)

重启`gulimall-ware`模块，再次发送请求又报错了，再次调试

查看`GulimallWareApplication`模块的控制台，查看`sql`语句,可以看到在`in()`里面没有传递数据

```mysql
SELECT id,ware_id, purchase_id, sku_price, sku_num,sku_id, status FROM wms_purchase_detail WHERE id IN ( )
```

![image-20220615234429118](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.9.png)

在该`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.PurchaseServiceImpl`类的`donePurchase`方法里，修改`purchaseItemDone.getStatus()`与`PurchaseDetailStatusEnum.FINISHED.getStatus();`相比，并判断`purchaseDetailIds`不为空才添加或更新库存

![image-20220615234255037](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.8.10.png)

[点击查看`PurchaseServiceImpl`类完整代码](code/4.8.11.8.PurchaseServiceImpl.java)

#### 9、重新测试一

重启`gulimall-ware`模块，再次发送请求，可以看到这次成功了

![image-20220615234546911](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.9.1.png)

在`库存系统/采购单维护/采购单`里，`采购单id`为`4`的`状态`已正确变为`有异常`

![image-20220615234624963](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.9.2.png)

在`库存系统/采购单维护/采购需求`里，`id`为`3`的`状态`已正确变为`已完成`，`id`为`4`的`状态`已正确变为`采购失败`

![image-20220615234706291](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.9.3.png)

#### 10、重新测试二

在`库存系统/采购单维护/采购需求`里，点击`新建`，在`采购商品id`里输入`2`，`采购数量`里输入`10`，`仓库`里选择`1号仓库`，然后点击确定

![image-20220615234821431](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.1.png)

在`库存系统/采购单维护/采购需求`里，点击`新建`，在`采购商品id`里输入`3`，`采购数量`里输入`15`，`仓库`里选择`1号仓库`，然后点击确定

![image-20220615234903216](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.2.png)

在`库存系统/采购单维护/采购需求`里，点击`新建`，在`采购商品id`里输入`4`，`采购数量`里输入`5`，`仓库`里选择`1号仓库`，然后点击确定

![image-20220615234940017](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.3.png)

在`库存系统/采购单维护/采购需求`里选择刚刚新建的`采购单id`为`5`、`6`、`7`的三个采购单，然后点击`批量操作`，在`批量操作`里选择`合并整单`；在`合并到整单`里不选择想要合并的采购单，直接点击确定，在弹出的`提示`对话框里点击`确定`

在`库存系统/采购单维护/采购单`里，点击刚刚自动创建的`采购单`的右侧`修改`按钮,在弹出的`合并到整单`的对话框中的下拉列表中选择`admin`,然后点击确定

![GIF 2022-6-15 23-51-32](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.4.gif)

使用`Postma`发送`领取采购单`，在`json`的输入框里输入刚刚自动创建的采购单的id：`[5]`，然后点击`Send`

![image-20220615235334954](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.5.png)

可以看到在`库存系统/采购单维护/采购单`里，`采购单id`为`5`的状态已经变为`已领取`了

![image-20220615235441128](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.6.png)

点击`库存系统/采购单维护/采购需求`，可以看到刚刚新建的`采购单id`为`5`、`6`、`7`的三个采购单的状态已全部变为`正在采购`了

![image-20220615235505421](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.7.png)

使用`Postma`发送`完成采购`，在`json`的输入框里输入以下`json`，然后点击`Send`

发送的请求中`id`对应`库存系统/采购单维护/采购需求`里的`id`，`items`里的`itemId`对应`库存系统/采购单维护/采购需求`里的`采购单id`，即为完成某个采购单的部分或全部`采购项(采购需求)`

这里将`采购单id`为`5`的所有`采购项(采购需求)`的状态都变为`3`，表示全部采购成功

```json
{
   "id": 5,
   "items": [
       {"itemId":5,"status":3,"reason":""},
       {"itemId":6,"status":3,"reason":""},
       {"itemId":7,"status":3,"reason":""}
    ]
}
```

![image-20220616000426342](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.8.png)

可以看到在`库存系统/采购单维护/采购单`里，`采购单id`为`5`的状态已经变为`已完成`了

![image-20220616002409091](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.9.png)

点击`库存系统/采购单维护/采购需求`，可以看到刚刚新建的`采购单id`为`5`、`6`、`7`的三个采购单的状态已全部变为`已完成`了

![image-20220616002426774](https://gitlab.com/apzs/image/-/raw/master/image/4.8.11.10.10.png)

### 4.8.12、远程调用`gulimall-product`模块

#### 1、查出`sku_name`

想查出`库存系统/商品库存`里，每条数据的`sku_name`的值

![image-20220618181715170](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.1.png)

#### 2、查看远程提供的服务接口

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`addOrUpdateStockByskuIdAndwareId`方法里添加代办事项，稍后完成`远程查询sku的名字`这个功能

![image-20220616233031996](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.2.1.png)

此时想要调用`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SkuInfoController`类的`info`这个方法

![image-20220616233341069](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.2.2.png)

#### 3、新建`CouponFeignService`接口

在`gulimall-ware`模块里`com.atguigu.gulimall.ware`包下新建`feign`文件夹，在这个文件夹里新建`CouponFeignService`接口

![image-20220616233614305](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.3.1.png)

添加上一些注释

```java
package com.atguigu.gulimall.ware.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author  无名氏
 * @date  2022/6/16
 * @Description:
 */
@FeignClient("gulimall-gateway")
public interface ProductFeignService {

    /**
     * 1)、让所有请求过网关;
     *    1、@FeignClient( "gulimall-gateway"):给gulimall-gateway所在的机器发请求
     *    2、/api/product/skuinfo/info/{skuId}
     * 2)、直接让后台指定服务处理
     *    1、@FeignClient( "gulimall-gateway")
     *    2、/product/skuinfo/info/{skuId}
     * @param skuId
     * @return
     */
    @RequestMapping("/api/product/skuinfo/info/{skuId}")
    public R info(@PathVariable("skuId") Long skuId);
}
```

![image-20220616233927770](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.3.2.png)

#### 4、修改`添加或更新库存`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里修改`addOrUpdateStockByskuIdAndwareId`方法

```java
@Autowired
ProductFeignService productFeignService;

@Transactional(rollbackFor = Exception.class)
public void addOrUpdateStockByskuIdAndwareId(PurchaseDetailEntity purchaseDetailEntity) {
    WareSkuEntity wareSkuEntity = new WareSkuEntity();
    wareSkuEntity.setSkuId(purchaseDetailEntity.getSkuId());
    wareSkuEntity.setWareId(purchaseDetailEntity.getWareId());

    LambdaQueryWrapper<WareSkuEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(WareSkuEntity::getSkuId, purchaseDetailEntity.getSkuId())
            .eq(WareSkuEntity::getWareId, purchaseDetailEntity.getWareId());
    WareSkuEntity query = wareSkuDao.selectOne(lambdaQueryWrapper);
    if (query == null) {
        wareSkuEntity.setStockLocked(0);
        //远程查询sku的名字；如果失败，整个事务不回滚
        //1、 自己catch异常
        //TODO 还可以用什么办法让异常出现以后不回滚?高级
        try {
            R info = productFeignService.info(wareSkuEntity.getSkuId());
            if (info.getCode() == 0){
                Map<String, Object> skuInfo = (Map<String, Object>) info.get("skuInfo");
                wareSkuEntity.setSkuName((String) skuInfo.get("skuName"));
            }
        } catch (Exception e) {

        }
        wareSkuEntity.setStock(purchaseDetailEntity.getSkuNum());
        wareSkuDao.insert(wareSkuEntity);
    } else {
        wareSkuEntity.setId(query.getId());
        wareSkuEntity.setStock(query.getStock() + purchaseDetailEntity.getSkuNum());
        wareSkuDao.updateById(wareSkuEntity);
    }
}
```

![image-20220616235351460](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.4.png)

最后经过优化，改成了这样

```java
@Autowired
ProductFeignService productFeignService;

@Transactional(rollbackFor = Exception.class)
public void addOrUpdateStockByskuIdAndwareId(PurchaseDetailEntity purchaseDetailEntity) {
    WareSkuEntity wareSkuEntity = new WareSkuEntity();
    wareSkuEntity.setSkuId(purchaseDetailEntity.getSkuId());
    wareSkuEntity.setWareId(purchaseDetailEntity.getWareId());

    LambdaQueryWrapper<WareSkuEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(WareSkuEntity::getSkuId, purchaseDetailEntity.getSkuId())
            .eq(WareSkuEntity::getWareId, purchaseDetailEntity.getWareId());
    WareSkuEntity query = wareSkuDao.selectOne(lambdaQueryWrapper);
    if (query==null || query.getSkuName()==null){
        //远程查询sku的名字；如果失败，整个事务不回滚
        //1、 自己catch异常
        //TODO 还可以用什么办法让异常出现以后不回滚?高级
        try {
            R info = productFeignService.info(wareSkuEntity.getSkuId());
            if (info.getCode() == 0){
                Map<String, Object> skuInfo = (Map<String, Object>) info.get("skuInfo");
                wareSkuEntity.setSkuName((String) skuInfo.get("skuName"));
            }
        } catch (Exception e) {
        }
    }
    if (query == null) {
        wareSkuEntity.setStockLocked(0);
        wareSkuEntity.setStock(purchaseDetailEntity.getSkuNum());
        wareSkuDao.insert(wareSkuEntity);
    } else {
        wareSkuEntity.setId(query.getId());
        wareSkuEntity.setStock(query.getStock() + purchaseDetailEntity.getSkuNum());
        wareSkuDao.updateById(wareSkuEntity);
    }
}
```

#### 5、解决`IDEA`报红

可以看到在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里注入的`productFeignService`对象报红，这个报红属于`IDEA`的问题，是`IDEA`检测到无法注入所以报红

![image-20220618175013156](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.5.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.feign.ProductFeignService`接口上添加`@Service`注解

![image-20220618175103940](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.5.2.png)

这样`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里注入的`productFeignService`对象就不报红了

![image-20220618224651290](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.5.3.png)

#### 6、启动`gulimall-ware`模块失败

重启`gulimall-ware`模块时，控制台报错

```
ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'purchaseController': Unsatisfied dependency expressed through field 'purchaseService'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'purchaseService': Unsatisfied dependency expressed through field 'wareSkuService'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'wareSkuService': Unsatisfied dependency expressed through field 'productFeignService'; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.atguigu.gulimall.ware.feign.ProductFeignService' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}

ConfigServletWebServerApplicationContext：上下文初始化期间遇到异常 - 取消刷新尝试：org.springframework.beans.factory.UnsatisfiedDependencyException：创建名称为“purchaseController”的bean时出错：通过字段“purchaseService”表示不满足的依赖关系；嵌套异常是 org.springframework.beans.factory.UnsatisfiedDependencyException：创建名称为“purchaseService”的 bean 时出错：通过字段“wareSkuService”表示的依赖关系不满足；嵌套异常是 org.springframework.beans.factory.UnsatisfiedDependencyException：创建名为 'wareSkuService' 的 bean 时出错：通过字段 'productFeignService' 表达的依赖关系不满足；嵌套异常是 org.springframework.beans.factory.NoSuchBeanDefinitionException：没有“com.atguigu.gulimall.ware.feign.ProductFeignService”类型的合格 bean 可用：预计至少有 1 个有资格作为自动装配候选者的 bean。依赖注解：{@org.springframework.beans.factory.annotation.Autowired(required=true)}
```

` 'com.atguigu.gulimall.ware.feign.ProductFeignService' that could not be found`这句话说得很清楚了，就是`ProductFeignService`这个接口没有找到(准确的说是它的实现类没有找到，不能成功注入，`Spring`中不能注入接口)

```
Field productFeignService in com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl required a bean of type 'com.atguigu.gulimall.ware.feign.ProductFeignService' that could not be found.

com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl 中的字段 productFeignService 需要类型为“com.atguigu.gulimall.ware.feign.ProductFeignService”的 bean。但是没有找到
```

![image-20220618174435966](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.6.png)

完整报错信息

```
2022-06-18 17:43:29.843  WARN 18808 --- [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'purchaseController': Unsatisfied dependency expressed through field 'purchaseService'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'purchaseService': Unsatisfied dependency expressed through field 'wareSkuService'; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'wareSkuService': Unsatisfied dependency expressed through field 'productFeignService'; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'com.atguigu.gulimall.ware.feign.ProductFeignService' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Autowired(required=true)}
2022-06-18 17:43:29.845  INFO 18808 --- [           main] o.apache.catalina.core.StandardService   : Stopping service [Tomcat]
2022-06-18 17:43:29.856  INFO 18808 --- [           main] ConditionEvaluationReportLoggingListener : 

Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2022-06-18 17:43:29.944 ERROR 18808 --- [           main] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

Field productFeignService in com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl required a bean of type 'com.atguigu.gulimall.ware.feign.ProductFeignService' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)


Action:

Consider defining a bean of type 'com.atguigu.gulimall.ware.feign.ProductFeignService' in your configuration.
```

#### 7、开启远程调用

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.GulimallWareApplication`启动类上添加注解，以开启远程调用

```java
@EnableFeignClients(basePackages = "com.atguigu.gulimall.ware.feign")
```

![image-20220618224737308](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.7.png)

#### 8、重新测试

重启`gulimall-ware`模块，刷新前端页面

在`库存系统/采购单维护/采购需求`里，点击`新建`，在`采购商品id`里输入`7`，`采购数量`里输入`7`，`仓库`里选择`1号仓库`，然后点击确定，

选中刚刚新建的`id`为`8`的采购需求按钮，然后点击`批量操作`，在`批量操作`里选择`合并整单`；在`合并到整单`里不选择想要合并的采购单，直接点击确定，在弹出的`提示`对话框里点击`确定`

![GIF 2022-6-18 22-03-49](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.8.1.gif)

在`库存系统/采购单维护/采购单`里，点击刚刚自动创建的`采购单`的右侧`分配`按钮,在弹出的`分配采购人员`的对话框中的下拉列表中选择`admin`,然后点击确定

![GIF 2022-6-18 22-05-31](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.8.2.gif)

打开`Postman`，在`领取采购单`的`json`输入框里输入`[6]`，点击`Send`

在`完成采购`的`json`输入框里输入如下`json`，点击`Send`

```json
{
   "id": 6,
   "items": [
       {"itemId":8,"status":3,"reason":""}
    ]
}
```

![GIF 2022-6-18 22-06-55](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.8.3.png)

可以看到，此时可以看到已经成功插入`sku_name`字段了

![image-20220618224951824](https://gitlab.com/apzs/image/-/raw/master/image/4.8.12.8.4.png)

## 4.9、商品服务-API-商品管理

#### 1、无法访问

点击`商品系统/商品维护/spu管理`，随便点击一条数据的右边的`规格`按钮，可以看到报了`400`的异常

![GIF 2022-6-18 22-57-00](https://gitlab.com/apzs/image/-/raw/master/image/4.9.1.1.gif)

可以在选中`gulimall_admin`数据库，右键选择`新建查询`，输入以下`sql`，手动创建一个路由的路径

```mysql
INSERT INTO sys_menu (menu_id, parent_id, name, url, perms, type, icon, order_num) VALUES (76, 37, '规格维护', 'product/attrupdate', '', 2, 'log', 0);
```

![GIF 2022-6-18 22-59-57](https://gitlab.com/apzs/image/-/raw/master/image/4.9.1.2.gif)

点击`商品系统/商品维护/spu管理`，再随便点击一条数据的右边的`规格`按钮，可以看到已经可以正常显示出来`规格维护`了

![GIF 2022-6-18 23-01-32](https://gitlab.com/apzs/image/-/raw/master/image/4.9.1.3.png)

如果还是无法访问，可以在`navicat`里选择`gulimall_admin`数据库中的`sys_menu`表，在里面把刚刚插入`name`为规格维护的那条数据的`type`把`2`改成`1`就可以了

![image-20220618232306790](https://gitlab.com/apzs/image/-/raw/master/image/4.9.1.4.png)

如果还是无法访问，可以打开`VS Code`，在`src\router\index.js`文件里的`mainRoutes`里的`children`里添加一条路径

```json
{ path: '/product-attrupdate', component: _import('modules/product/attrupdate'), name: 'attr-update', meta: { title: '规格维护', isTab: true } }
```

![image-20220618232119164](https://gitlab.com/apzs/image/-/raw/master/image/4.9.1.5.png)

#### 2、查看接口

接口文档在`商品系统/22、获取spu规格`里：https://easydoc.net/s/78237135/ZUqEdvA4/GhhJhkg7

![image-20220616235801916](https://gitlab.com/apzs/image/-/raw/master/image/4.9.2.png)

#### 3、添加`baseAttrlistforspu`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController`类里添加`baseAttrlistforspu`方法

```java
/**
 * /product/attr/base/listforspu/{spuId}
 * @param spuId
 * @return
 */
@GetMapping("/base/listforspu/{spuId}")
public R baseAttrlistforspu(@PathVariable("spuId") Long spuId){

    List<ProductAttrValueEntity> data = productAttrValueService.baseAttrlistforspu(spuId);
    return R.ok().put("data",data);
}
```

![image-20220618234506140](https://gitlab.com/apzs/image/-/raw/master/image/4.9.3.png)

#### 4、添加`baseAttrlistforspu`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.ProductAttrValueService`类里添加`baseAttrlistforspu`抽象方法

```java
List<ProductAttrValueEntity> baseAttrlistforspu(Long spuId);
```

![image-20220618233809045](https://gitlab.com/apzs/image/-/raw/master/image/4.9.4.png)

#### 5、实现`baseAttrlistforspu`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里实现未实现的`baseAttrlistforspu`抽象方法

```java
@Override
public List<ProductAttrValueEntity> baseAttrlistforspu(Long spuId) {
    LambdaQueryWrapper<ProductAttrValueEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(ProductAttrValueEntity::getSpuId,spuId);
    return this.baseMapper.selectList(lambdaQueryWrapper);
}
```

![image-20220618234037898](https://gitlab.com/apzs/image/-/raw/master/image/4.9.5.png)

#### 6、无法回显数据

重启`gulimall-product`模块，如果前端无法回显数据，可以修改`src\views\modules\product\spuinfo.vue`里的`attrUpdateShow`方法的名为`query`的`catalogId`为`row.catalogId`

```javascript
attrUpdateShow(row) {
  console.log(row);
  this.$router.push({
    path: "/product-attrupdate",
    query: { spuId: row.id, catalogId: row.catalogId }
  });
},
```

> 数据库中 与商品spu sku有关的两张表 pms_spu_info 和 pms_sku_info中关于商品分类的字段catelog_id在建表时都打成了catalog_id，如果要矫正那么除了修改数据库，对应由工具生成的实体类Entity，controller,service和mapper中的字段配置都要改。此外，表的catelog_id没有错误。点击“规格”报404是因为在规格点击后，前端不会做路由跳转，需要参照评论回复中的小伙伴的方法在前端src/router/index.js中添加对应配置(你们找一找把)。这个“spu管理”界面对应vue的spuinfo.vue，他在跳转时会把选中行的id和分类id都封装进去做跳转，承接开头，找到spuinfo.vue的101行，把 【query: {spuId: row.id, catelogId: row.catelogId}】中的row.catelogId改成row.catalogId即可，因为是从pms_spu_info表中来的catalog_id字段去和pms_attr_group中欧冠的catelog_id字段做逻辑上的关联查询的。字段不对应查不出结果就只剩下一个确认修改，其他组件也不会渲染出来。

![image-20220618235131788](https://gitlab.com/apzs/image/-/raw/master/image/4.9.6.1.png)

如果遇到多选无法回显问题可以在`src\views\modules\product\attrupdate.vue`文件的`showBaseAttrs`方法里加一个判断

```javascript
if (v.length == 1 && attr.valueType == 0) {
          v = v[0] + "";
        }
```

另外当属性分组中，有的分组没有任何属性时候，也会报Cannot read property 'forEach' of null。 因为该分组的attrs会查出null值。

可以修改为以下代码

```javascript
//先对表单的baseAttrs进行初始化
data.data.forEach((item) => {
  let attrArray = [];
  if (item.attrs != null) {
    item.attrs.forEach((attr) => {
      let v = "";
      if (_this.spuAttrsMap["" + attr.attrId]) {
        v = _this.spuAttrsMap["" + attr.attrId].attrValue.split(";");
        if (v.length == 1 && attr.valueType == 0) {
          v = v[0] + "";
        }
      }
      attrArray.push({
        attrId: attr.attrId,
        attrName: attr.attrName,
        attrValues: v,
        showDesc: _this.spuAttrsMap["" + attr.attrId]
          ? _this.spuAttrsMap["" + attr.attrId].quickShow
          : attr.showDesc,
      });
    });
  }
  this.dataResp.baseAttrs.push(attrArray);
});
this.dataResp.attrGroups = data.data;
```

![image-20220619000414268](https://gitlab.com/apzs/image/-/raw/master/image/4.9.6.2.png)

#### 7、查看接口

点击`商品系统/商品维护/spu管理`，随便点击一条数据的右边的`规格`按钮，先打开控制台，点击`Network`，清空数据，然后点击`确认修改`查看接口为： http://localhost:88/api/product/attr/update/1

![image-20220619001237932](https://gitlab.com/apzs/image/-/raw/master/image/4.9.7.1.png)

 接口文档在`商品系统/23、修改商品规格`里： https://easydoc.net/s/78237135/ZUqEdvA4/GhnJ0L85

![image-20220619083101912](https://gitlab.com/apzs/image/-/raw/master/image/4.9.7.2.png)

#### 8、新建`updateSpuAttr`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController`类里新建`updateSpuAttr`方法

```java
/**
 * 根据spuid修改规格参数
 */
@PostMapping("/update/{spuId}")
public R updateSpuAttr(@PathVariable("spuId") Long spuId,@RequestBody List<ProductAttrValueEntity> productAttrValueEntities) {
    productAttrValueService.updateSpuAttr(spuId,productAttrValueEntities);

    return R.ok();
}
```

![image-20220619083218353](https://gitlab.com/apzs/image/-/raw/master/image/4.9.8.png)

#### 9、新建`updateSpuAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.ProductAttrValueService`接口里新建`updateSpuAttr`抽象方法

![image-20220619083256215](https://gitlab.com/apzs/image/-/raw/master/image/4.9.9.png)

#### 10、实现`updateSpuAttr`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.ProductAttrValueServiceImpl`类里实现未实现的`updateSpuAttr`抽象方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void updateSpuAttr(Long spuId, List<ProductAttrValueEntity> productAttrValueEntities) {
    LambdaQueryWrapper<ProductAttrValueEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(ProductAttrValueEntity::getSpuId,spuId);
    this.baseMapper.delete(lambdaQueryWrapper);


    List<ProductAttrValueEntity> collect = productAttrValueEntities.stream().map(productAttrValueEntity -> {
        productAttrValueEntity.setSpuId(spuId);
        return productAttrValueEntity;
    }).collect(Collectors.toList());
    this.saveBatch(collect);
}
```

![image-20220619084026551](https://gitlab.com/apzs/image/-/raw/master/image/4.9.10.png)

#### 11、测试

选择`商品系统/商品维护/spu管理`，点击`id`为`1`的那条数据的右边的`规格`按钮，将`基本信息`中的`机身颜色`修改为`黑色`，然后点击确认修改，在弹出的`提示`对话框中点击`确定`,再次从`spu管理`里进入该页面，可以发现并没有修改成功

![GIF 2022-6-19 8-48-41](https://gitlab.com/apzs/image/-/raw/master/image/4.9.11.1.gif)

查看`GulimallProductApplication`控制台，可以看到已经报错了

```
No primary or default constructor found for interface java.util.List
未找到接口 java.util.List 的主构造函数或默认构造函数
```

![image-20220619085027587](https://gitlab.com/apzs/image/-/raw/master/image/4.9.11.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController`类的`updateSpuAttr`方法的`List<ProductAttrValueEntity> productAttrValueEntities`这个参数左边添加`@RequestBody`注解，指明该数据在请求体里面

![image-20220619085149599](https://gitlab.com/apzs/image/-/raw/master/image/4.9.11.3.png)

重启`gulimall-product`模块，刷新前端页面

再次选择`商品系统/商品维护/spu管理`，点击`id`为`1`的那条数据的右边的`规格`按钮，将`基本信息`中的`机身颜色`修改为`黑色`，然后点击确认修改，在弹出的`提示`对话框中点击`确定`,再次从`spu管理`里进入该页面，可以发现已经修改成功了

![GIF 2022-6-19 8-52-52](https://gitlab.com/apzs/image/-/raw/master/image/4.9.11.4.gif)

## 4.10、分布式基础篇总结

**1**、分布式基础概念

  •微服务、注册中心、配置中心、远程调用、Feign、网关

**2**、基础开发

再次选择`商品系统/商品维护/spu管理`，点击`id`为`1`的那条数据的右边的`规格`按钮，将`基本信息`中的`机身颜色`修改为`黑色`，然后点击确认修改，在弹出的`提示`对话框中点击`确定`,再次从`spu管理`里进入该页面，可以发现已经修改成功了

![GIF 2022-6-19 8-52-52](https://gitlab.com/apzs/image/-/raw/master/image/4.9.11.4.gif)

## 4.10、分布式基础篇总结

**1**、分布式基础概念

  •微服务、注册中心、配置中心、远程调用、Feign、网关

**2**、基础开发

  •SpringBoot2.0、SpringCloud、Mybatis-Plus、Vue组件化、阿里云对象存储

**3**、环境

  •Vagrant、Linux、Docker、MySQL、Redis、逆向工程&人人开源

**4**、开发规范

  •数据校验JSR303、全局异常处理、全局统一返回、全局跨域处理

  •枚举状态、业务状态码、VO与TO与PO划分、逻辑删除

  •Lombok：@Data、@Slf4j

