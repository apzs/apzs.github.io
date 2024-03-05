## 5.4、商城业务-缓存，锁

### 5.4.1、缓存-缓存使用

![image-20220721212905833](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.0.png)

#### 1、本地缓存

把从数据库中查询的数据放到本类的属性里面，再次有请求进入后，发现该类已存储从数据库中查询的数据，直接返回即可

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.0.png" alt="image-20220713195239272" style="zoom:50%;" />



##### 1、修改`CategoryServiceImpl`类

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里修改部分方法，使把查出的数据放到本地的`cache`里

```java
private Map<String, List<Catelog2Vo>> cache = null;

@Override
public Map<String, List<Catelog2Vo>> getCatalogJson() {
    if (cache!=null){
        return cache;
    }
    Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDb();
    cache = catalogJsonForDb;
    return catalogJsonForDb;
}


public Map<String, List<Catelog2Vo>> getCatalogJsonForDb() {
    //一次查询所有
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(null);
    //1、查出所有一级分类
    List<CategoryEntity> level1Categories = this.getLevel1Categories();
    Map<String, List<Catelog2Vo>> result = level1Categories.stream().collect(Collectors.toMap(k -> k.getCatId().toString(), l1 -> {
        //2、该一级分类的所有二级分类
        List<CategoryEntity> category2Entities = getCategoryEntities(categoryEntities,l1);
        List<Catelog2Vo> catelog2VoList = null;
        if (category2Entities != null) {
            catelog2VoList = category2Entities.stream().map(l2 -> {
                Catelog2Vo catelog2Vo = new Catelog2Vo();
                catelog2Vo.setCatalog1Id(l1.getCatId().toString());
                catelog2Vo.setId(l2.getCatId().toString());
                catelog2Vo.setName(l2.getName());
                //3、当前二级分类的所有三级分类
                List<CategoryEntity> category3Entities = getCategoryEntities(categoryEntities,l2);
                List<Catelog2Vo.Catelog3Vo> catelog3VoList = null;
                if (category3Entities!=null){
                    catelog3VoList = category3Entities.stream().map(l3 -> {
                        Catelog2Vo.Catelog3Vo catelog3Vo = new Catelog2Vo.Catelog3Vo();
                        catelog3Vo.setId(l3.getCatId().toString());
                        catelog3Vo.setName(l3.getName());
                        catelog3Vo.setCatalog2Id(l2.getCatId().toString());
                        return catelog3Vo;
                    }).collect(Collectors.toList());
                }
                catelog2Vo.setCatalog3List(catelog3VoList);
                return catelog2Vo;
            }).collect(Collectors.toList());
        }
        return catelog2VoList;
    }));
    return result;
}

private List<CategoryEntity> getCategoryEntities(List<CategoryEntity> categoryEntities,CategoryEntity l) {
    //LambdaQueryWrapper<CategoryEntity> category2QueryWrapper = new LambdaQueryWrapper<>();
    //category2QueryWrapper.eq(CategoryEntity::getParentCid, l1.getCatId());
    //return this.baseMapper.selectList(category2QueryWrapper);
    List<CategoryEntity> collect = categoryEntities.stream().filter(categoryEntity -> {
        return categoryEntity.getParentCid().equals(l.getCatId());
    }).collect(Collectors.toList());
    return collect;
}
```

![image-20220713194616644](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.1.png)

##### 2、准备工作

在`线程组`的`线程属性`里的`线程数`里输入`50`，表示**启动50个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里勾选`永远`

![image-20220713194704485](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.2.1.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/index/catalog.json`

![image-20220713194722501](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.2.2.png)

在`HTTP请求`的`高级`里，取消勾选`从HTML文件获取所有内含的资源`

![image-20220713194735626](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.2.3.png)

要压测的接口： http://localhost:10000/index/catalog.json

![image-20220713194807049](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.2.4.png)

##### 3、执行测试

![GIF 2022-7-13 19-44-33](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.3.gif)

##### 4、查看压测报告

可以看到，使用本地缓存的方式接口的吞吐量非常高

**察看结果树**

![image-20220713194911408](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.4.1.png)

**汇总报告**

![image-20220713194923340](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.4.2.png)

**聚合报告**

![image-20220713194935181](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.4.3.png)

##### 5、问题

在`集群`环境下，每一个`gulimall-product`服务都存储自己的一份`cache`，这极大的浪费了`堆`的内存，

而且更严重的是当其中一个`gulimall-product`服务修改了数据后，其他服务感知不到修改，其他服务还在使用旧的数据，这样就违反了数据的最终一致性。

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.1.5.png" alt="image-20220713195353065" style="zoom: 50%;" />

#### 2、分布式缓存

在分布式项目中，应使用分布式缓存技术，所有`gulimall-product`服务都向`缓存中间件`里获取数据，这样防止浪费了本地缓存，最重要的是当其中一个服务修改了数据后，其他服务也能获取最新的数据(虽然不能达到严格的一致性，但可以确保数据的最终一致性)

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.0.png" alt="image-20220713195507412" style="zoom:50%;" />

##### 1、添加依赖

在`gulimall-product`模块的`pom.xml`文件内添加`redis`依赖

```xml
<!--引入redis-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

![image-20220713200117460](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.1.png)

##### 2、配置`redis`主机地址和端口

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件内配置`redis`主机地址和端口

```yaml
spring:
  redis:
    host: 192.168.56.10
    port: 6379
```

![image-20220713200015211](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.2.png)

##### 3、可使用的对象

在`org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration`类里提供了`RedisTemplate`和`StringRedisTemplate`两个对象来操作`redis`

```java
@Bean
@ConditionalOnMissingBean(name = "redisTemplate")
public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
      throws UnknownHostException {
   RedisTemplate<Object, Object> template = new RedisTemplate<>();
   template.setConnectionFactory(redisConnectionFactory);
   return template;
}

@Bean
@ConditionalOnMissingBean
public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory)
      throws UnknownHostException {
   StringRedisTemplate template = new StringRedisTemplate();
   template.setConnectionFactory(redisConnectionFactory);
   return template;
}
```

![image-20220713200342377](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.3.1.png)

由于`String`类型在`redis`里非常常用，因此封装了继承`RedisTemplate`类的`StringRedisTemplate`用于操作`redis`

![image-20220713200628278](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.3.2.png)

##### 4、简单使用

常用方法：

```java
//操作字符串
stringRedisTemplate.opsForValue();
//操作hash
stringRedisTemplate.opsForHash();
//操作list
stringRedisTemplate.opsForList();
//操作set
stringRedisTemplate.opsForSet();
//操作有序set
stringRedisTemplate.opsForZSet();
```

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`测试类里添加如下测试代码，在`redis`里添加`key`为`hello`的数据，然后执行测试

```java
@Autowired
StringRedisTemplate stringRedisTemplate;
@Test
public void stringRedisTemplateTest(){
   ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
   //保存
   ops.set("hello","world"+ UUID.randomUUID());
   //查询
   String hello = ops.get("hello");
   System.out.println("之前保存的数据是："+ hello);
}
```

![image-20220713201403494](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.4.1.png)

打开`Redis Desktop Manager`可以看到`key`为`hello`的数据已经存进`redis`里了

![image-20220713202139733](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.2.4.2.png)

#### 3、测试

##### 1、准备工作

在`线程组`的`线程属性`里的`线程数`里输入`50`，表示**启动50个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里勾选`永远`

![image-20220713221119905](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.1.1.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/index/catalog.json`

![image-20220713221142043](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.1.2.png)

在`HTTP请求`的`高级`里，取消勾选`从HTML文件获取所有内含的资源`

![image-20220713221159131](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.1.3.png)

要压测的接口： http://localhost:10000/index/catalog.json

![image-20220713221912300](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.1.4.png)

##### 2、执行测试

![GIF 2022-7-13 22-29-14](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.2.gif)

##### 3、堆外内存溢出

可以看到`http://localhost:10000/index/catalog.json`已无法访问

![image-20220713223323423](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.3.1.png)

**察看结果树**

![image-20220713223350313](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.3.2.png)

**汇总报告**

![image-20220713223400875](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.3.3.png)

**聚合报告**

![image-20220713223414080](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.3.4.png)

控制台报`堆外内存溢出`

```
2022-07-13 22:34:29.065  WARN 8940 --- [ioEventLoop-4-2] io.lettuce.core.protocol.CommandHandler  : null Unexpected exception during request: io.netty.util.internal.OutOfDirectMemoryError: failed to allocate 37748736 byte(s) of direct memory (used: 67108864, max: 100663296)

io.netty.util.internal.OutOfDirectMemoryError: failed to allocate 37748736 byte(s) of direct memory (used: 67108864, max: 100663296)
   at io.netty.util.internal.PlatformDependent.incrementMemoryCounter(PlatformDependent.java:725) ~[netty-common-4.1.39.Final.jar:4.1.39.Final]
   at io.netty.util.internal.PlatformDependent.allocateDirectNoCleaner(PlatformDependent.java:680) ~[netty-common-4.1.39.Final.jar:4.1.39.Final]
   at io.netty.buffer.PoolArena$DirectArena.allocateDirect(PoolArena.java:772) ~[netty-buffer-4.1.39.Final.jar:4.1.39.Final]
   at io.netty.buffer.PoolArena$DirectArena.newUnpooledChunk(PoolArena.java:762) ~[netty-buffer-4.1.39.Final.jar:4.1.39.Final]
```

![image-20220713223441846](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.3.5.png)

##### 4、原因

因为`spring-boot-starter-data-redis-2.1.8.RELEASE`在操作`redis`时，使用了`lettuce`

```xml
<dependency>
  <groupId>io.lettuce</groupId>
  <artifactId>lettuce-core</artifactId>
  <version>5.1.8.RELEASE</version>
  <scope>compile</scope>
</dependency>
```

![image-20220715103407245](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.4.1.png)

而`lettuce-core-5.1.8.RELEASE`引用了`netty`

```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-common</artifactId>
</dependency>

<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-handler</artifactId>
</dependency>

<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-transport</artifactId>
</dependency>
```

![image-20220715103430255](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.4.2.png)

所以会报`netty`相关的异常

##### 5、报错的类

在`io.netty.util.internal.OutOfDirectMemoryError.java`类里报了这个异常

```java
/**
 * {@link OutOfMemoryError} that is throws if {@link PlatformDependent#allocateDirectNoCleaner(int)} can not allocate
 * a new {@link ByteBuffer} due memory restrictions.
 */
public final class OutOfDirectMemoryError extends OutOfMemoryError {
    private static final long serialVersionUID = 4228264016184011555L;

    OutOfDirectMemoryError(String s) {
        super(s);
    }
}
```

![image-20220715150401848](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.5.1.png)

在`io.netty.util.internal.PlatformDependent.java`类里当`newUsedMemory`(新的已用内存) `>` `DIRECT_MEMORY_LIMIT`(直接内存限制)，就会抛出异常。(这个直接内存是`netty`自己在底层计数)

```java
private static void incrementMemoryCounter(int capacity) {
    if (DIRECT_MEMORY_COUNTER != null) {
        long newUsedMemory = DIRECT_MEMORY_COUNTER.addAndGet(capacity);
        if (newUsedMemory > DIRECT_MEMORY_LIMIT) {
            DIRECT_MEMORY_COUNTER.addAndGet(-capacity);
            throw new OutOfDirectMemoryError("failed to allocate " + capacity
                    + " byte(s) of direct memory (used: " + (newUsedMemory - capacity)
                    + ", max: " + DIRECT_MEMORY_LIMIT + ')');
        }
    }
}
```

![image-20220715150701735](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.5.2.png)

在当前类申明了`DIRECT_MEMORY_LIMIT`

```java
private static final long DIRECT_MEMORY_LIMIT;
```

![image-20220715151444404](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.5.3.png)

可以通过`-Dio.netty.maxDirectMemory`这个虚拟机参数设置最大内存，如果不设置默认就和堆内存大小`-Xmx参数`一样

通过`-Dio.netty.maxDirectMemory`这个虚拟机参数调大内存、或修改堆内存`-Xmx参数`后，可以延缓异常抛出的时间，但不能解决问题

```java
logger.debug("-Dio.netty.maxDirectMemory: {} bytes", maxDirectMemory);
DIRECT_MEMORY_LIMIT = maxDirectMemory >= 1 ? maxDirectMemory : MAX_DIRECT_MEMORY;
```

![image-20220715151559659](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.3.5.4.png)

#### 4、调大内存后重试

##### 1、修改运行参数

在`GulimallProductApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx300m`，重新限制`GulimallProductApplication`模块的最大内存占用为`300m`

```
-Xmx300m
```

重新启动`GulimallProductApplication`服务

![image-20220715153737538](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.1.png)

##### 2、执行测试

可以看到调大`-Xmx参数`后，异常出现时间明显延后，但是还是不能从根本上解决问题

![GIF 2022-7-15 15-46-29](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.2.gif)

##### 3、查看压测报告

**察看结果树**

![image-20220715155239718](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.3.1.png)

**汇总报告**

![image-20220715155249984](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.3.2.png)

**聚合报告**

![image-20220715155301898](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.3.3.png)

在`jvisualvm`的`com.atguigu.gulimall.product.GulimallProductApplication`服务的`Visual GC`里查看`新生代`和`老年代`使用情况

![image-20220715155209605](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.3.4.png)

在`jvisualvm`的`com.atguigu.gulimall.product.GulimallProductApplication`服务的`监视`里查看`CPU`、`堆`等资源使用情况

![image-20220715155151814](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.4.3.5.png)

#### 5、根本上解决对外内存异常

##### 1、使用`jedis`

在`spring-boot-starter-data-redis-2.1.8.RELEASE`里使用了`lettuce`

```xml
<dependency>
  <groupId>io.lettuce</groupId>
  <artifactId>lettuce-core</artifactId>
  <version>5.1.8.RELEASE</version>
  <scope>compile</scope>
</dependency>
```

![image-20220713224440576](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.1.1.png)

因此只需要排除`lettuce`，并重新引入`jedis`即可

```xml
<!--引入redis-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```

![image-20220713224540175](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.1.2.png)

在`org\springframework\boot\spring-boot-dependencies\2.1.8.RELEASE\spring-boot-dependencies-2.1.8.RELEASE.pom`

里指定了`jedis`的版本，因此我们并不需要指定`jedis`的版本

![GIF 2022-7-13 22-50-50](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.1.3.gif)

要压测的接口： http://localhost:10000/index/catalog.json

![image-20220715152455155](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.1.4.png)

##### 2、执行测试

![GIF 2022-7-15 15-27-41](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.2.gif)

##### 3、查看压测报告

可以发现`jedis`比`lettuce`在性能上差了不少

**察看结果树**

![image-20220715152929879](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.3.1.png)

**汇总报告**

![image-20220715153026558](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.3.2.png)

**聚合报告**

![image-20220715153043208](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.3.3.png)

在`jvisualvm`的`com.atguigu.gulimall.product.GulimallProductApplication`服务的`Visual GC`里查看`新生代`和`老年代`使用情况

![image-20220715153055591](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.3.4.png)

在`jvisualvm`的`com.atguigu.gulimall.product.GulimallProductApplication`服务的`监视`里查看`CPU`、`堆`等资源使用情况

![image-20220715153112065](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.3.5.png)

##### 4、内存调大`-Xmx300m`又测试了一次

**察看结果树**

![image-20220715160023816](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.4.1.png)

**汇总报告**

![image-20220715160047736](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.4.2.png)

**聚合报告**

![image-20220715160103038](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.5.4.3.png)

#### 6、说明

在`org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration`类里导入了`LettuceConnectionConfiguration.class`和`JedisConnectionConfiguration.class`

```java
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
```

![image-20220715160337658](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.6.1.png)

在`org.springframework.boot.autoconfigure.data.redis.LettuceConnectionConfiguration`类里如果`RedisConnectionFactory.class`类在`ioc`容器中不存在，则向`ioc`容器注入`RedisConnectionFactory`

```java
@Bean
@ConditionalOnMissingBean(RedisConnectionFactory.class)
public LettuceConnectionFactory redisConnectionFactory(ClientResources clientResources)
      throws UnknownHostException {
   LettuceClientConfiguration clientConfig = getLettuceClientConfiguration(clientResources,
         this.properties.getLettuce().getPool());
   return createLettuceConnectionFactory(clientConfig);
}
```

![image-20220715160551114](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.6.2.png)

在`org.springframework.boot.autoconfigure.data.redis.JedisConnectionConfiguration`类里如果`RedisConnectionFactory.class`类在`ioc`容器中不存在，则向`ioc`容器注入`RedisConnectionFactory`

```java
@Bean
@ConditionalOnMissingBean(RedisConnectionFactory.class)
public JedisConnectionFactory redisConnectionFactory() throws UnknownHostException {
   return createJedisConnectionFactory();
}
```

![image-20220715160746996](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.6.3.png)

在`org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration`类里则会使用它们其中一个注入到`ioc`容器的`RedisConnectionFactory`来操作`redis`

相当于`lettuce`和` jedis`都是操作`redis`底层的客户端，`spring`再次封装成了`redisTemplate`

```java
@Bean
@ConditionalOnMissingBean(name = "redisTemplate")
public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
      throws UnknownHostException {
   RedisTemplate<Object, Object> template = new RedisTemplate<>(`;
   template.setConnectionFactory(redisConnectionFactory);
   return template;
}

@Bean
@ConditionalOnMissingBean
public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory)
      throws UnknownHostException {
   StringRedisTemplate template = new StringRedisTemplate();
   template.setConnectionFactory(redisConnectionFactory);
   return template;
}
```

![image-20220715161018842](https://gitlab.com/apzs/image/-/raw/master/image/5.4.1.6.4.png)

### 5.4.2、缓存-redis锁

#### 1、常见问题

##### 1、缓存穿透

**缓存穿透**： 指查询一个一定不存在的数据，由于缓存是不命中，将去查询数据库，但是 数据库也无此记录，我们没有将这次查询的null写入缓存，这将导致这个不 存在的数据每次请求都要到存储层去查询，失去了缓存的意义 

**风险**： 利用不存在的数据进行攻击，数据库瞬时压力增大，最终导致崩溃

**解决**： null结果缓存，并加入短暂过期时间

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.1.1.png" alt="image-20220715162001456" style="zoom: 50%;" />

##### 2、缓存雪崩

**缓存雪崩**： 缓存雪崩是指在我们设置缓存时key采用了相同的过期时间， 导致缓存在某一时刻同时失效，请求全部转发到DB，DB瞬时 压力过重雪崩。

**解决**： 原有的失效时间基础上增加一个随机值，比如1-5分钟随机，这 样每一个缓存的过期时间的重复率就会降低，就很难引发集体 失效的事件。

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.1.2.png" alt="image-20220715162139708" style="zoom: 50%;" />

##### 3、缓存穿透

**缓存穿透**： 

- 对于一些设置了过期时间的key，如果这些key可能会在某些 时间点被超高并发地访问，是一种非常“热点”的数据。

-  如果这个key在大量请求同时进来前正好失效，那么所有对 这个key的数据查询都落到db，我们称为缓存击穿。 

**解决**： 加锁 

大量并发只让一个去查，其他人等待，查到以后释放锁，其他 人获取到锁，先查缓存，就会有数据，不用去db

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.1.3.png" alt="image-20220715162219429" style="zoom:50%;" />

#### 2、本地锁(单体架构)

通过本地锁(性能高)，只能锁住当前进程，在分布式环境下如果部署了100台机器，如果只锁当前进程，虽然放行了100个线程查询数据库，看起来性能也还行。但是如果一台机器修改该数据，其他机器却感知不到数据被修改了，这就引起了数据最终不一致的问题。因此在分布式架构下，应使用分布式锁(性能低)。

![image-20220721205546480](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.0.png)

本地锁，只能锁住当前进程，所以我们需要分布式锁

##### 1、本地锁代码

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的代码

```java
/**
 * 1、空结果缓存:解诀缓存穿透
 * 2、设置过期时间(加随机值) :解诀缓存雪崩
 * 3、加锁:解决缓存击穿
 */
@Override
public Map<String, List<Catelog2Vo>> getCatalogJson() {
    //1、加入缓存逻辑,缓存中存的数据是json字符串。
    //JSON跨语言，跨平台兼容。
    ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
    String catalogJson = ops.get("catalogJson");
    if (!StringUtils.hasText(catalogJson)) {
        //2、缓存中没有,查询数据库
        System.out.println("缓存不命中...查询数据库...");
        Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDb();
        //3.查到的数据再放入缓存，将对象转为json放在缓存中
        String s = JSON.toJSONString(catalogJsonForDb);
        ops.set("catalogJson",s);
        return catalogJsonForDb;
    }
    System.out.println("缓存命中...直接返回");
    TypeReference<Map<String, List<Catelog2Vo>>> typeReference = new TypeReference<Map<String, List<Catelog2Vo>>>() {
    };
    return JSON.parseObject(catalogJson,typeReference);
}


public Map<String, List<Catelog2Vo>> getCatalogJsonForDb() {
    //得到锁以后，我们应该再去缓存中确定一 次，如果没有才需要继续查询(双检锁)
    //只要是同一把锁，就能锁住需要这个锁的所有线程
    //synchronized (this): SpringBoot所有的组件在容器中都是单例的。
    //TODO 本地锁: synchronized, JUC(Lock) 在分布式情况下，想要锁住所有，必须使用分布式锁
    synchronized (this) {
        ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
        String catalogJson = ops.get("catalogJson");
        if (StringUtils.hasText(catalogJson)) {
            TypeReference<Map<String, List<Catelog2Vo>>> typeReference = new TypeReference<Map<String, List<Catelog2Vo>>>() {
            };
            return JSON.parseObject(catalogJson,typeReference);
        }
        System.out.println("查询了数据库......");
        //一次查询所有
        List<CategoryEntity> categoryEntities = this.baseMapper.selectList(null);
        //1、查出所有一级分类
        List<CategoryEntity> level1Categories = this.getLevel1Categories();
        Map<String, List<Catelog2Vo>> result = level1Categories.stream().collect(Collectors.toMap(k -> k.getCatId().toString(), l1 -> {
            //2、该一级分类的所有二级分类
            List<CategoryEntity> category2Entities = getCategoryEntities(categoryEntities, l1);
            List<Catelog2Vo> catelog2VoList = null;
            if (category2Entities != null) {
                catelog2VoList = category2Entities.stream().map(l2 -> {
                    Catelog2Vo catelog2Vo = new Catelog2Vo();
                    catelog2Vo.setCatalog1Id(l1.getCatId().toString());
                    catelog2Vo.setId(l2.getCatId().toString());
                    catelog2Vo.setName(l2.getName());
                    //3、当前二级分类的所有三级分类
                    List<CategoryEntity> category3Entities = getCategoryEntities(categoryEntities, l2);
                    List<Catelog2Vo.Catelog3Vo> catelog3VoList = null;
                    if (category3Entities != null) {
                        catelog3VoList = category3Entities.stream().map(l3 -> {
                            Catelog2Vo.Catelog3Vo catelog3Vo = new Catelog2Vo.Catelog3Vo();
                            catelog3Vo.setId(l3.getCatId().toString());
                            catelog3Vo.setName(l3.getName());
                            catelog3Vo.setCatalog2Id(l2.getCatId().toString());
                            return catelog3Vo;
                        }).collect(Collectors.toList());
                    }
                    catelog2Vo.setCatalog3List(catelog3VoList);
                    return catelog2Vo;
                }).collect(Collectors.toList());
            }
            return catelog2VoList;
        }));
        return result;
    }
}
```

![image-20220715163745249](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.1.png)


##### 2、删除`redis`中`key`为`catalogJson`的数据

使用`Redis Desktop Manager`工具，删除`redis`中`key`为`catalogJson`的数据

![image-20220716085225713](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.2.png)

##### 3、重新测试(锁-时序问题)

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.3.0.png" alt="image-20220721205904236" style="zoom: 50%;" />

重新运行`GulimallProductApplication`服务，**不要**刷新前端页面，确保在压力测试之前、`redis`里面没有`catalogJson`的数据

可以发现查询了两次数据库，这是因为加锁加小了，查询完数据库后就释放锁了，释放锁以后才把最新数据发送给`redis`，在发送给`redis`的这段时间内，又一个线程进来了它从`redis`获取数据发现没有获取到(此时先查询数据库的线程还未完全把数据放到`redis`里)，因此查询了两次数据库。正确的做法应该是先`放入缓存`，再`释放锁`

![GIF 2022-7-16 8-58-13](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.3.gif)

##### 4、修改`CategoryServiceImpl`类代码

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类，把`getCatalogJson`方法里的以下代码

```java
//3.查到的数据再放入缓存，将对象转为json放在缓存中
String s = JSON.toJSONString(result);
ops.set("catalogJson", s);
```

放到`getCatalogJsonForDb`方法的锁里面，保证只有一个线程查询数据库

![image-20220716091107158](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.4.1.png)

最后我又修改成了这样：

```java
/**
 * 1、空结果缓存:解诀缓存穿透
 * 2、设置过期时间(加随机值) :解诀缓存雪崩
 * 3、加锁:解决缓存击穿
 */
@Override
public Map<String, List<Catelog2Vo>> getCatalogJson() {
    //1、加入缓存逻辑,缓存中存的数据是json字符串。
    //JSON跨语言，跨平台兼容。
    ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
    String catalogJson = ops.get("catalogJson");
    if (!StringUtils.hasText(catalogJson)) {
        //2、缓存中没有,查询数据库
        System.out.println("缓存不命中...查询数据库...");
        Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDbWithLocalLock();
        //3.查到的数据再放入缓存，将对象转为json放在缓存中
        String s = JSON.toJSONString(catalogJsonForDb);
        ops.set("catalogJson",s);
        return catalogJsonForDb;
    }
    System.out.println("缓存命中...直接返回");
    TypeReference<Map<String, List<Catelog2Vo>>> typeReference = new TypeReference<Map<String, List<Catelog2Vo>>>() {
    };
    return JSON.parseObject(catalogJson,typeReference);
}

public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithLocalLock() {
    //得到锁以后，我们应该再去缓存中确定一 次，如果没有才需要继续查询(双检锁)
    //只要是同一把锁，就能锁住需要这个锁的所有线程
    //synchronized (this): SpringBoot所有的组件在容器中都是单例的。
    //TODO 本地锁: synchronized, JUC(Lock) 在分布式情况下，想要锁住所有，必须使用分布式锁
    synchronized (this) {
        return getCatalogJsonForDb();
    }
}

private Map<String, List<Catelog2Vo>> getCatalogJsonForDb() {
    ValueOperations<String, String> ops = stringRedisTemplate.opsForValue();
    String catalogJson = ops.get("catalogJson");
    if (StringUtils.hasText(catalogJson)) {
        TypeReference<Map<String, List<Catelog2Vo>>> typeReference = new TypeReference<Map<String, List<Catelog2Vo>>>() {
        };
        return JSON.parseObject(catalogJson, typeReference);
    }
    System.out.println("查询了数据库......");
    //一次查询所有
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(null);
    //1、查出所有一级分类
    List<CategoryEntity> level1Categories = this.getLevel1Categories();
    Map<String, List<Catelog2Vo>> result = level1Categories.stream().collect(Collectors.toMap(k -> k.getCatId().toString(), l1 -> {
        //2、该一级分类的所有二级分类
        List<CategoryEntity> category2Entities = getCategoryEntities(categoryEntities, l1);
        List<Catelog2Vo> catelog2VoList = null;
        if (category2Entities != null) {
            catelog2VoList = category2Entities.stream().map(l2 -> {
                Catelog2Vo catelog2Vo = new Catelog2Vo();
                catelog2Vo.setCatalog1Id(l1.getCatId().toString());
                catelog2Vo.setId(l2.getCatId().toString());
                catelog2Vo.setName(l2.getName());
                //3、当前二级分类的所有三级分类
                List<CategoryEntity> category3Entities = getCategoryEntities(categoryEntities, l2);
                List<Catelog2Vo.Catelog3Vo> catelog3VoList = null;
                if (category3Entities != null) {
                    catelog3VoList = category3Entities.stream().map(l3 -> {
                        Catelog2Vo.Catelog3Vo catelog3Vo = new Catelog2Vo.Catelog3Vo();
                        catelog3Vo.setId(l3.getCatId().toString());
                        catelog3Vo.setName(l3.getName());
                        catelog3Vo.setCatalog2Id(l2.getCatId().toString());
                        return catelog3Vo;
                    }).collect(Collectors.toList());
                }
                catelog2Vo.setCatalog3List(catelog3VoList);
                return catelog2Vo;
            }).collect(Collectors.toList());
        }
        return catelog2VoList;
    }));
    //3.查到的数据再放入缓存，将对象转为json放在缓存中
    String s = JSON.toJSONString(result);
    ops.set("catalogJson", s);
    return result;
}
```

![image-20220716191130234](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.4.2.png)

##### 5、重新测试

重启`GulimallProductApplication`服务，删除`redis`里的`catalogJson`的数据，开始测试。这时就只有一个线程查询了数据库

![GIF 2022-7-16 9-13-46](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.2.5.gif)

#### 3、集群测试

##### 1、启动多个`product`服务

选中`Service`里的`GulimallProductApplication`服务，右键选择`Copy Configuration..`或者按`Ctrl+D `快捷键，复制一个配置

在`name`里输入`GulimallProductApplication - 10001`，在`Program arguments:`里输入`--server.port=10001`用于在启动的参数里指定运行的端口

同理在复制2个

```
GulimallProductApplication - 10001
--server.port=10001

GulimallProductApplication - 10002
--server.port=10002

GulimallProductApplication - 10003
--server.port=10003
```

![GIF 2022-7-16 9-29-47](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.1.1.gif)

一共复制了3个配置

![image-20220716191356029](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.1.2.png)

##### 2、启动这些服务

启动`GulimallProductApplication - 10001`服务、`GulimallProductApplication - 10002`服务、`GulimallProductApplication - 10003`服务

![GIF 2022-7-16 9-36-02](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.2.gif)

##### 3、准备工作

使用`Redis Desktop Manager`工具，删除`redis`中`key`为`catalogJson`的数据

![5.4.1.7.2.9](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.3.1.png)

在`线程组`的`线程属性`里的`线程数`里输入`100`，表示**启动100个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里输入`5`

![image-20220716093748583](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.3.2.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`gulimall`，`端口号：`输入`80`，`路径`输入`/index/catalog.json`

通过`nginx`负载均衡到这些`project`服务

![image-20220716094914063](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.3.3.png)

##### 4、执行测试

![GIF 2022-7-16 9-52-32](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.4.gif)

##### 5、查看结果

可以看到这次只查询了一次数据库

![GIF 2022-7-16 9-54-15](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.5.1.gif)

**察看结果树**

![image-20220716100401468](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.5.2.png)

**汇总报告**

![image-20220716100423673](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.5.3.png)

**聚合报告**

![image-20220716100440990](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.3.5.4.png)

#### 4、手动分布式锁

**分布式锁演进-基本原理**

![image-20220721210115751](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.0.png)

我们可以同时去一个地方“占坑”，如果占到，就执行逻辑。否则就必须等待，直到释放锁。

“占坑”可以去redis，可以去数据库，可以去任何大家都能访问的地方。 等待可以自旋的方式。

##### 1、参考文档

中文文档地址： https://www.redis.com.cn/commands/set.html

> **SET key value [EX seconds|PX milliseconds|KEEPTTL] [NX|XX] [GET]**
>
> Redis SET 命令用于将键 `key` 设定为指定的“字符串”值。
>
> 如果 `key` 已经保存了一个值，那么这个操作会直接覆盖原来的值，并且忽略原始类型。
>
> 当 `set` 命令执行成功之后，之前设置的过期时间都将失效
>
> **选项**
>
> 从2.6.12版本开始，redis为`SET`命令增加了一系列选项:
>
> - `EX` *seconds* – 设置键key的过期时间，单位时秒
> - `PX` *milliseconds* – 设置键key的过期时间，单位时毫秒
> - `NX` – 只有键key不存在的时候才会设置key的值
> - `XX` – 只有键key存在的时候才会设置key的值
> - `KEEPTTL` -- 获取 key 的过期时间
> - [GET](https://www.redis.com.cn/commands/get.html) -- 返回 key 存储的值，如果 key 不存在返回空
>
> **注意:** 由于`SET`命令加上选项已经可以完全取代`SETNX`, [SETEX](https://www.redis.com.cn/commands/setex.html), [PSETEX](https://www.redis.com.cn/commands/psetex.html), [GETSET](https://www.redis.com.cn/commands/getset.html),的功能，所以在将来的版本中，redis可能会不推荐使用并且最终抛弃这几个命令。
>
> **返回值**
>
> [字符串](https://www.redis.com.cn/topics/protocol.html#simple-string-reply): 如果`SET`命令正常执行那么回返回`OK` [多行字符串](https://www.redis.com.cn/topics/protocol.html#bulk-string-reply): 使用 GET 选项，返回 key 存储的值，如果 key 不存在返回空 [空](https://www.redis.com.cn/topics/protocol.html#nil-reply): 否则如果加了`NX` 或者 `XX`选项，[SET](https://www.redis.com.cn/commands/set.html) 没执行，那么会返回nil。
>
> **历史**
>
> - `>= 2.6.12`: Added the `EX`, `PX`, `NX` and `XX` options.
> - `>= 6.0`: Added the `KEEPTTL` option.
> - `>= 6.2`: Added the [GET](https://www.redis.com.cn/commands/get.html) option.
>
> **例子**
>
> ```bash
> redis> SET mykey "Hello"
> "OK"
> redis> GET mykey
> "Hello"
> redis> SET anotherkey "will expire in a minute" EX 60
> "OK"
> redis>
> ```
>
> **[SET](https://www.redis.com.cn/commands/set.html)**
>
> **Note:** 下面这种设计模式并不推荐用来实现redis分布式锁。应该参考 [the Redlock algorithm](https://redis.io/topics/distlock) 的实现，虽然这个方法只是复杂一点，但是却能保证更好的使用效果。
>
> 命令 `SET resource-name anystring NX EX max-lock-time` 是一种用 Redis 来实现锁机制的简单方法。
>
> 如果上述命令返回`OK`，那么客户端就可以获得锁（如果上述命令返回Nil，那么客户端可以在一段时间之后重新尝试），并且可以通过`DEL`命令来释放锁。
>
> 客户端加锁之后，如果没有主动释放，会在过期时间之后自动释放。
>
> 可以通过如下优化使得上面的锁系统变得更加鲁棒：
>
> - 不要设置固定的字符串，而是设置为随机的大字符串，可以称为token。
> - 通过脚步删除指定锁的key，而不是`DEL`命令。
>
> 上述优化方法会避免下述场景：a客户端获得的锁（键key）已经由于过期时间到了被redis服务器删除，但是这个时候a客户端还去执行`DEL`命令。而b客户端已经在a设置的过期时间之后重新获取了这个同样key的锁，那么a执行`DEL`就会释放了b客户端加好的锁。
>
> 解锁脚本的一个例子将类似于以下：
>
> ```
> if redis.call("get",KEYS[1]) == ARGV[1]
> then
>     return redis.call("del",KEYS[1])
> else
>     return 0
> end
> ```
>
> 这个脚本执行方式如下：
>
> ```
> EVAL ...script... 1 resource-name token-value
> ```
>
> **可用版本>= 1.0.0.**
>
> **时间复杂度:** O(1)

 

![GIF 2022-7-16 10-00-15](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.1.gif)

##### 2、`redis`命令获取锁

进入`redis`的客户端，执行`set lock haha NX`即可获取锁

```
docker exec -it redis redis-cli
set lock haha NX
```

###### 1、复制当前会话

点击`1 电商` ，右键选择`复制会话(D)`即可复制当前会话

双击`1 电商` 也可以复制当前会话

![GIF 2022-7-16 10-16-12](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.2.1.gif)

###### 2、多个会话同时执行命令

在`Xshell`里依次点击 `查看(V)` -> `撰写(C)` -> `撰写栏(B)`  即可在`Xshell`下方打开`撰写栏`

点击`撰写栏`的左边，选择`全部会话(A)`，在`撰写栏`发送的所有命名都会发送给所有会话

如在`撰写栏`里输入`docker exec -it redis redis-cli`命令，所有会话都执行了该命令

![GIF 2022-7-16 10-19-01](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.2.2.1.gif)

在`Xshell`里点击`工具(T)`里 的`发送键输入到所有会话(K)`，在一个会话里输入的命令，也会同步发送给其他`发送键输入到所有会话。`状态为`开`的会话

![GIF 2022-7-16 10-22-25](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.2.2.2.gif)

在一个会话的输入命令的地方右键选择`发送键输入到所有会话(K)`，在这个会话里输入的命令，也会同步发送给其他`发送键输入到所有会话。`状态为`开`的会话

![GIF 2022-7-16 10-25-22](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.2.2.3.gif)

点击`发送键输入到所有会话。`右侧的`OFF`按钮后，别的会话发送`发送键输入到所有会话(K)`类型的命令该会话不会执行

![GIF 2022-7-16 20-11-40](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.2.2.4.png)

###### 3、获取锁

所有会话执行`set lock haha NX`命令，可以看到只有`2 电商`获取到了锁

![GIF 2022-7-16 10-20-14](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.2.3.gif)

##### 3、简单分布式锁

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.3.0.png" alt="image-20220721210223375" style="zoom:67%;" />

问题：setnx占好了位，业务代码异常或者程序在页面过程 中宕机。没有执行删除锁逻辑，这就造成了死锁

解决：设置锁的自动过期，即使没有删除，会自动删除



本次可以完成分布式锁的功能，但是`getCatalogJsonForDb()`方法有可能抛出异常 `stringRedisTemplate.delete("lock");`删除锁就无法执行，导致锁一直无法释放，从而导致死锁

即使把`stringRedisTemplate.delete("lock");`删除锁的代码放到`finally`里面，也有可能出现机器`宕机`、`停电`等意外情况，导致`finally`里面的代码无法执行，从而导致无法删除锁

在`org.springframework.data.redis.core.ValueOperations`接口里的`setIfAbsent`方法相当于`SETNX`命令(与`set key value NX`一样)

![image-20220716104241003](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.3.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里，添加`getCatalogJsonForDbWithRedisLock`方法

[点击查看`CategoryServiceImpl`类完整代码](code/5.4.2.4.3.CategoryServiceImpl.java)

```java
public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithRedisLock() {
    //获取redis锁
    Boolean lock = stringRedisTemplate.opsForValue().setIfAbsent("lock", "111");
    if (lock){
        Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDb();
        //删除锁
        stringRedisTemplate.delete("lock");
        return catalogJsonForDb;
    }else {
        //加锁失败，休眠100ms后重试，synchronized
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //自旋锁
        return getCatalogJsonForDbWithRedisLock();
    }
}
```

![image-20220716105028700](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.3.2.png)

##### 4、添加过期时间

问题：setnx设置好，正要去设置过期时间，宕机。又死锁了。

解决：设置过期时间和占位必须是原子的。redis支持使用`setnx ex`命令

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.4.0.png" alt="image-20220721210446105" style="zoom: 67%;" />

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里，修改`getCatalogJsonForDbWithRedisLock`方法

获取锁后可以修改该锁的过期时间，这样看似解决了机器`宕机`、`停电`等意外情况，导致无法删除锁的问题。

但是有可能在获取锁后，`stringRedisTemplate.expire("lock",30, TimeUnit.SECONDS);`修改该锁的过期时间之前机器`宕机`了，这样锁还是不会释放

```java
public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithRedisLock() {
    //获取redis锁
    Boolean lock = stringRedisTemplate.opsForValue().setIfAbsent("lock", "111");
    if (lock){
        //设置过期时间，必须和加锁是同步的，原子的
        stringRedisTemplate.expire("lock",30, TimeUnit.SECONDS);
        Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDb();
        //删除锁
        stringRedisTemplate.delete("lock");
        return catalogJsonForDb;
    }else {
        //加锁失败，休眠100ms后重试，synchronized
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //自旋锁
        return getCatalogJsonForDbWithRedisLock();
    }
}
```

![image-20220716105732979](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.4.png)

##### 5、获取锁并设置过期时间

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.5.0.png" alt="image-20220721210625076" style="zoom:67%;" />

问题：

1、删除锁直接删除？？？

如果由于业务时间很长，锁自己过期了，我们 直接删除，有可能把别人正在持有的锁删除了。

解决：占锁的时候，值指定为uuid，每个人匹配是自己 的锁才删除。



上一步不能解决问题的原因根本上是`获取锁`和`设置过期时间`不是原子操作，这样就确保这两步`都执行`或`都不执行`

因此设置过期时间，必须和加锁是同步的，原子的

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里，修改`getCatalogJsonForDbWithRedisLock`方法，保证`获取锁`和`设置过期时间`是原子的

```java
public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithRedisLock() {
    //获取redis锁
    Boolean lock = stringRedisTemplate.opsForValue().setIfAbsent("lock", "111",30, TimeUnit.SECONDS);
    if (lock){
        Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDb();
        //删除锁
        stringRedisTemplate.delete("lock");
        return catalogJsonForDb;
    }else {
        //加锁失败，休眠100ms后重试，synchronized
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //自旋锁
        return getCatalogJsonForDbWithRedisLock();
    }
}
```

![image-20220716105834671](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.5.1.png)

执行语句大概相当于以下命令

```bash
#进入redis的客户端
docker exec -it redis redis-cli
#获取锁并设置过期时间为30s
set lock 111 EX 30 NX
#查看该锁的过期时间(最终为-2)
ttl lcok
```

![GIF 2022-7-16 21-05-26](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.5.2.gif)

##### 6、释放锁之前先判断

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.6.0.png" alt="image-20220721210734185" style="zoom:67%;" />

问题：如果正好判断是当前值，正要删除锁的时候，锁已经过期， 别人已经设置到了新的值。那么我们删除的是别人的锁

解决：删除锁必须保证原子性。使用redis+Lua脚本完成



有可能当前线程获取的锁已经过期了。然后别的线程也进来了，此时别的线程获取了这把锁。然后当前线程执行完业务代码后，把别的线程获取的锁给释放了。因此释放锁之前应先判断是不是自己的锁

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里，修改`getCatalogJsonForDbWithRedisLock`方法，释放锁之前应先判断是不是自己的锁

```java
public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithRedisLock() {
    //获取redis锁
    String uuid = UUID.randomUUID().toString();
    Boolean lock = stringRedisTemplate.opsForValue().setIfAbsent("lock", uuid,30, TimeUnit.SECONDS);
    if (lock){
        Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDb();
        //删除锁
        String lockValue = stringRedisTemplate.opsForValue().get("lock");
        if (uuid.equals(lockValue)) {
            stringRedisTemplate.delete("lock");
        }
        return catalogJsonForDb;
    }else {
        //加锁失败，休眠100ms后重试，synchronized
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //自旋锁
        return getCatalogJsonForDbWithRedisLock();
    }
}
```

![image-20220716110950969](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.6.png)

##### 7、判断并删除

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.7.0.png" alt="image-20220721210834600" style="zoom:67%;" />

String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";

保证加锁【占位+过期时间】和删除锁【判断+删除】的原子性。 更难的事情，锁的自动续期



在`释放锁之前应先判断是不是自己的锁`这个阶段，先获取当前锁的值，在当前线程获取到该锁的值后，有可能当前线程获取的锁到了过期时间，此时别的线程进入后，重新获取到了锁，此时当前线程获取的锁的值还是自己锁的值，从而导致删除了别的线程的锁

出现这种情况的原因还是因为`判断锁的值`和`删除该锁`不是原子操作，可以使用`lua`脚本，保证`判断锁的值`和`删除该锁`是原子操作

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里，修改`getCatalogJsonForDbWithRedisLock`方法，保证`判断锁的值`和`删除该锁`是原子操作

该操作可以保证不会`死锁`和`释放了别的线程的锁`，但是当前线程未执行完，锁有可能已经过期了，此时别的线程就可以占用了这个锁，因此应加上`自动续期`续期的功能

中文文档： [Redis SET 命令](https://www.redis.com.cn/commands/set.html)

```lua
if redis.call("get",KEYS[1]) == ARGV[1]
then
    return redis.call("del",KEYS[1])
else
    return 0
end
```

![image-20220716121842148](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.7.1.png)

```java
public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithRedisLock() {
    //获取redis锁
    String uuid = UUID.randomUUID().toString();
    Boolean lock = stringRedisTemplate.opsForValue().setIfAbsent("lock", uuid,30, TimeUnit.SECONDS);
    if (lock){
        Map<String, List<Catelog2Vo>> catalogJsonForDb;
        try {
            catalogJsonForDb = getCatalogJsonForDb();
        }finally {
            //删除锁
            String script = "if redis.call('get',KEYS[1]) == ARGV[1] then  return redis.call('del',KEYS[1]) else return 0 end";
            // KEYS[1] 为 Arrays.asList("lock") ；ARGV[1] 为 uuid
            Long lockValue = stringRedisTemplate.execute(new DefaultRedisScript<Long>(script,Long.class)
                    ,Arrays.asList("lock"),uuid);
            if (lockValue!=null && lockValue==1){
                System.out.println("删除成功...");
            }else {
                System.out.println("删除失败...");
            }
        }
        return catalogJsonForDb;
    }else {
        //加锁失败，休眠100ms后重试，synchronized
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //自旋锁
        return getCatalogJsonForDbWithRedisLock();
    }
}
```

![image-20220716123404456](https://gitlab.com/apzs/image/-/raw/master/image/5.4.2.4.7.2.png)

### 5.4.3、缓存-Redisson分布式锁

官方文档： https://github.com/redisson/redisson/wiki/

![GIF 2022-7-16 14-36-13](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.0.gif)

#### 1、使用`Redisson`

可以使用`Redisson`(Redis Java client with features of In-Memory Data Grid)来操作`redis`，进而了解`Redisson`的使用过程

后续可以使用`Redisson/Spring Boot Starter`来操作`redis`

##### 1、引入依赖

在`Maven Repository `里查找`Redisson`： https://mvnrepository.com/artifact/org.redisson/redisson

![image-20220716145200593](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.1.1.png)

引入`redisson`，做分布式锁和分布式对象

```xml
<!-- 引入redisson，做分布式锁和分布式对象 -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.12.0</version>
</dependency>
```

![image-20220716145354907](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.1.2.png)

##### 2、添加配置

在`gulimall-product`模块的`com.atguigu.gulimall.product.config`包里新建`MyRedissonConfig`类，在`MyRedissonConfig`类里新建`redisson`方法

```java
package com.atguigu.gulimall.product.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

/**
 * @author 无名氏
 * @date 2022/7/16
 * @Description:
 */
@Configuration
public class MyRedissonConfig {

    /**
     * 所有对Redisson的使用都是通过RedissonClient对象
     * @return
     * @throws IOException
     */
    @Bean(destroyMethod="shutdown")
    RedissonClient redisson() throws IOException {
        //1、创建配置
        Config config = new Config();
        //config.useSingleServer().setAddress("192.168.56.10:6379").setPassword("");
        config.useSingleServer().setAddress("192.168.56.10:6379");
        //2、根据Config创建出RedissonClient示例
        return Redisson.create(config);
    }

}
```

![image-20220716150239076](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.2.1.png)

**第三方框架整合的参考文档：**

```
https://github.com/redisson/redisson/wiki/14.-第三方框架整合
```

```java
@Configuration
@ComponentScan
@EnableCaching
public static class Application {

    @Bean(destroyMethod="shutdown")
    RedissonClient redisson() throws IOException {
        Config config = new Config();
        config.useClusterServers()
              .addNodeAddress("127.0.0.1:7004", "127.0.0.1:7001");
        return Redisson.create(config);
    }

    @Bean
    CacheManager cacheManager(RedissonClient redissonClient) {
        Map<String, CacheConfig> config = new HashMap<String, CacheConfig>();
        // 创建一个名称为"testMap"的缓存，过期时间ttl为24分钟，同时最长空闲时maxIdleTime为12分钟。
        config.put("testMap", new CacheConfig(24*60*1000, 12*60*1000));
        return new RedissonSpringCacheManager(redissonClient, config);
    }

}
```

![image-20220716150830328](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.2.2.png)

**单Redis节点模式的参考文档：**

```
https://github.com/redisson/redisson/wiki/2.-配置方法#26-单redis节点模式
```

```java
// 默认连接地址 127.0.0.1:6379
RedissonClient redisson = Redisson.create();

Config config = new Config();
config.useSingleServer().setAddress("myredisserver:6379");
RedissonClient redisson = Redisson.create(config);
```

![image-20220716150909929](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.2.3.png)

##### 3、添加测试方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`测试类里添加如下代码

```java
@Autowired
RedissonClient redissonClient;
@Test
public void redissonTest(){
   System.out.println(redissonClient);
}
```

![image-20220716150604827](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.3.png)

##### 4、执行测试

执行`redissonTest`方法，可以看到报了如下错误：错误的原因也指出来了`java.lang.IllegalArgumentException: Redis url should start with redis:// or rediss:// (for SSL connection)`

```log
java.lang.IllegalStateException: Failed to load ApplicationContext

   at org.springframework.test.context.cache.DefaultCacheAwareContextLoaderDelegate.loadContext(DefaultCacheAwareContextLoaderDelegate.java:125)
   at org.springframework.test.context.support.DefaultTestContext.getApplicationContext(DefaultTestContext.java:108)
   at org.springframework.test.context.web.ServletTestExecutionListener.setUpRequestContextIfNecessary(ServletTestExecutionListener.java:190)
   at org.springframework.test.context.web.ServletTestExecutionListener.prepareTestInstance(ServletTestExecutionListener.java:132)
   at org.springframework.test.context.TestContextManager.prepareTestInstance(TestContextManager.java:246)
   at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.createTest(SpringJUnit4ClassRunner.java:227)
   at org.springframework.test.context.junit4.SpringJUnit4ClassRunner$1.runReflectiveCall(SpringJUnit4ClassRunner.java:289)
   at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
   at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.methodBlock(SpringJUnit4ClassRunner.java:291)
   at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.runChild(SpringJUnit4ClassRunner.java:246)
   at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.runChild(SpringJUnit4ClassRunner.java:97)
   at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)
   at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)
   at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)
   at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)
   at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)
   at org.springframework.test.context.junit4.statements.RunBeforeTestClassCallbacks.evaluate(RunBeforeTestClassCallbacks.java:61)
   at org.springframework.test.context.junit4.statements.RunAfterTestClassCallbacks.evaluate(RunAfterTestClassCallbacks.java:70)
   at org.junit.runners.ParentRunner.run(ParentRunner.java:363)
   at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.run(SpringJUnit4ClassRunner.java:190)
   at org.junit.runner.JUnitCore.run(JUnitCore.java:137)
   at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:69)
   at com.intellij.rt.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:33)
   at com.intellij.rt.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:220)
   at com.intellij.rt.junit.JUnitStarter.main(JUnitStarter.java:53)
Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'redisson' defined in class path resource [com/atguigu/gulimall/product/config/MyRedissonConfig.class]: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.redisson.api.RedissonClient]: Factory method 'redisson' threw exception; nested exception is java.lang.IllegalArgumentException: Redis url should start with redis:// or rediss:// (for SSL connection)
```

![image-20220716150731143](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.4.1.png)

参考文档：`https://github.com/redisson/redisson/wiki/2.-配置方法#21-程序化配置方法`

```java
Config config = new Config();
config.setTransportMode(TransportMode.EPOLL);
config.useClusterServers()
      //可以用"rediss://"来启用SSL连接
      .addNodeAddress("redis://127.0.0.1:7181");
```

![image-20220716151118513](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.4.2.png)

##### 5、修改配置

在`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyRedissonConfig`类里修改`redisson`方法

```java
/**
 * 所有对Redisson的使用都是通过RedissonClient对象
 * @return
 * @throws IOException
 */
@Bean(destroyMethod="shutdown")
RedissonClient redisson() throws IOException {
    //1、创建配置
    Config config = new Config();
    //Redis url should start with redis:// or rediss:// (for SSL connection)
    //config.useSingleServer().setAddress("192.168.56.10:6379").setPassword("");
    config.useSingleServer().setAddress("redis://192.168.56.10:6379");
    //2、根据Config创建出RedissonClient示例
    return Redisson.create(config);
}
```

![image-20220716213623896](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.5.png)

##### 6、重新测试

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`测试类里执行`redissonTest`方法，可以看到这次执行成功了

![image-20220716151536203](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.1.6.png)

#### 2、 可重入锁（Reentrant Lock）

> 基于Redis的Redisson分布式可重入锁[`RLock`](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLock.html) Java对象实现了`java.util.concurrent.locks.Lock`接口。同时还提供了[异步（Async）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockAsync.html)、[反射式（Reactive）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockReactive.html)和[RxJava2标准](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockRx.html)的接口。
>
> ```java
> RLock lock = redisson.getLock("anyLock");
> // 最常见的使用方法
> lock.lock();
> ```
>
> 大家都知道，如果负责储存这个分布式锁的Redisson节点宕机以后，而且这个锁正好处于锁住的状态时，这个锁会出现锁死的状态。为了避免这种情况的发生，Redisson内部提供了一个监控锁的看门狗，它的作用是在Redisson实例被关闭前，不断的延长锁的有效期。默认情况下，看门狗的检查锁的超时时间是30秒钟，也可以通过修改[Config.lockWatchdogTimeout](https://github.com/redisson/redisson/wiki/2.-配置方法#lockwatchdogtimeout监控锁的看门狗超时单位毫秒)来另行指定。
>
> 另外Redisson还通过加锁的方法提供了`leaseTime`的参数来指定加锁的时间。超过这个时间后锁便自动解开了。
>
> ```java
> // 加锁以后10秒钟自动解锁
> // 无需调用unlock方法手动解锁
> lock.lock(10, TimeUnit.SECONDS);
> 
> // 尝试加锁，最多等待100秒，上锁以后10秒自动解锁
> boolean res = lock.tryLock(100, 10, TimeUnit.SECONDS);
> if (res) {
>    try {
>      ...
>    } finally {
>        lock.unlock();
>    }
> }
> ```
>
> Redisson同时还为分布式锁提供了异步执行的相关方法：
>
> ```java
> RLock lock = redisson.getLock("anyLock");
> lock.lockAsync();
> lock.lockAsync(10, TimeUnit.SECONDS);
> Future<Boolean> res = lock.tryLockAsync(100, 10, TimeUnit.SECONDS);
> ```
>
> `RLock`对象完全符合Java的Lock规范。也就是说只有拥有锁的进程才能解锁，其他进程解锁则会抛出`IllegalMonitorStateException`错误。但是如果遇到需要其他进程也能解锁的情况，请使用[分布式信号量`Semaphore`](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#86-信号量semaphore) 对象.

官方文档：`https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器`



http://localhost:10000/hello

##### 1、有看门狗

修改`gulimall-product`模块的`com.atguigu.gulimall.product.web.IndexController`类的`hello`方法

```java
@Autowired
RedissonClient redissonClient;

@ResponseBody
@GetMapping("/hello")
public String hello(){
    //1、获取一把锁，只要锁的名字一样，就是同一把锁
    RLock lock = redissonClient.getLock("my-lock");
    //2、加锁
    //阻塞式等待(其他线程不断地尝试获取这把锁)。默认加的锁都是30s时间。
    //1)、锁的自动续期，如果业务超长，运行期间自动给锁续上新的30s。不用担心业务时间长，锁自动过期被删掉
    //2)、加锁的业务只要运行完成，就不会给当前锁续期，即使不手动解锁，锁默认在30s以后自动删除。
    lock.lock();
    try {
        System.out.println("加锁成功。。。执行业务。。。"+Thread.currentThread().getId());
        Thread.sleep(30000);
    }catch (Exception e){
        e.printStackTrace();
    }finally {
        //3、解锁
        System.out.println("释放锁。。。"+Thread.currentThread().getId());
        lock.unlock();
    }
    return "hello";
}
```

![image-20220716153633748](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.1.1.png)

启动`GulimallProductApplication`服务，访问： http://localhost:10000/hello  进行测试

可以看到当该线程未处理完时，会自动给锁延长过期时间(已过去`1/3过期时间`时`看门狗`开始自动续期)，不会出现该线程业务未处理完，别的线程可以获取到该锁的情况

![GIF 2022-7-18 9-51-02](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.1.2.gif)

开启两个商品服务(`GulimallProductApplication`和`GulimallProductApplication - 10001`)，然后通过`GulimallGatewayApplication`网关访问，模拟集群环境，然后停掉已获得锁的服务，模拟`宕机`的情况，查看别的机器是否能获得锁

访问路径： http://localhost:88/hello

可以看到`GulimallProductApplication - 10001`获得锁后，停掉该服务。`GulimallProductApplication`服务在`GulimallProductApplication - 10001`服务的锁过期后依旧能获取到锁

![GIF 2022-7-18 10-04-16](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.1.3.gif)

调用`lock.lock();`方法，如果没有获取到这把锁，没有获取到锁的线程不断地尝试获取这把锁(`阻塞式等待`)

![image-20220718102213193](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.1.4.png)

##### 2、无看门狗

使用`lock.lock(10, TimeUnit.SECONDS); `方法，该线程业务没有处理完不会自动续期，别的线程也可以进入

```java
@ResponseBody
@GetMapping("/hello")
public String hello() {
    //1、获取一把锁，只要锁的名字一样，就是同一把锁
    RLock lock = redissonClient.getLock("my-lock");
    //2、加锁
    //阻塞式等待(其他线程不断地尝试获取这把锁)。默认加的锁都是30s时间。
    //1)、锁的自动续期，如果业务超长，运行期间自动给锁续上新的30s。不用担心业务时间长，锁自动过期被删掉
    //2)、加锁的业务只要运行完成，就不会给当前锁续期，即使不手动解锁，锁默认在30s以后自动删除。
    //lock.lock();

    //问题: lock. lock(10, TimeUnit. SECONDS); 在锁时间到了以后，不会自动续期。
    //1、如果我们传递了锁的超时时间，就发送给redis执行脚本，进行占锁，默认超时就是我们指定的时间
    //2、如果我们未指定锁的超时时间，就使用30 * 1000 [LockWatchdogTimeout看门狗的默认时间] ;
    //只要占锁成功，就会启动一一个定时任务[重新给锁设置过期时间，新的过期时间就是看门门狗的默认时间]
    //internallockleaseTime [看i门狗时间] / 3, 10s
    lock.lock(10, TimeUnit.SECONDS); //10秒自动解锁,自动解锁时间一-定要大于业务的执行时间。
    //最佳实战 ：lock.lock(30, TimeUnit. SECONDS);省掉了整个续期操作。手动解锁
    try {
        System.out.println("加锁成功。。。执行业务。。。" + Thread.currentThread().getId());
        Thread.sleep(30000);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        //3、解锁
        System.out.println("释放锁。。。" + Thread.currentThread().getId());
        lock.unlock();
    }
    return "hello";
}
```

![image-20220718163902337](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.2.1.png)

当前线程业务没有处理完不会自动续期，处理完后释放锁会报异常

![GIF 2022-7-18 16-48-34](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.2.2.gif)



```
加锁成功。。。执行业务。。。99
释放锁。。。99
2022-07-18 16:56:22.611 ERROR 12492 --- [io-10000-exec-4] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.IllegalMonitorStateException: attempt to unlock lock, not locked by current thread by node id: c4f38ca8-3108-40a2-a8da-3c9d7ec1213f thread-id: 99] with root cause

java.lang.IllegalMonitorStateException: attempt to unlock lock, not locked by current thread by node id: c4f38ca8-3108-40a2-a8da-3c9d7ec1213f thread-id: 99
   at org.redisson.RedissonLock.lambda$unlockAsync$3(RedissonLock.java:580) ~[redisson-3.12.0.jar:3.12.0]
   at org.redisson.misc.RedissonPromise.lambda$onComplete$0(RedissonPromise.java:187) ~[redisson-3.12.0.jar:3.12.0]
   at io.netty.util.concurrent.DefaultPromise.notifyListener0(DefaultPromise.java:500) ~[netty-common-4.1.39.Final.jar:4.1.39.Final]
```

![image-20220718165656843](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.2.3.png)

(我的这个测试了几次，都是前一个线程执行完了，后一个线程才能获取到锁。按理说`redis`里面都没有锁了，应该不会获取不到锁呀)

![GIF 2022-7-18 17-04-18](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.2.4.gif)

##### 3、非阻塞式等待

```java
@ResponseBody
@GetMapping("/hello")
public String hello() {
    //1、获取一把锁，只要锁的名字一样，就是同一把锁
    RLock lock = redissonClient.getLock("my-lock");
    //2、加锁
    //阻塞式等待(其他线程不断地尝试获取这把锁)。默认加的锁都是30s时间。
    //1)、锁的自动续期，如果业务超长，运行期间自动给锁续上新的30s。不用担心业务时间长，锁自动过期被删掉
    //2)、加锁的业务只要运行完成，就不会给当前锁续期，即使不手动解锁，锁默认在30s以后自动删除。
    //lock.lock();

    //问题: lock. lock(10, TimeUnit. SECONDS); 在锁时间到了以后，不会自动续期。
    //1、如果我们传递了锁的超时时间，就发送给redis执行脚本，进行占锁，默认超时就是我们指定的时间
    //2、如果我们未指定锁的超时时间，就使用30 * 1000 [LockWatchdogTimeout看门狗的默认时间] ;
    //只要占锁成功，就会启动一一个定时任务[重新给锁设置过期时间，新的过期时间就是看门门狗的默认时间]
    //internallockleaseTime [看i门狗时间] / 3, 10s
    //lock.lock(10, TimeUnit.SECONDS); //10秒自动解锁,自动解锁时间一-定要大于业务的执行时间。
    //最佳实战 ：lock.lock(30, TimeUnit. SECONDS);省掉了整个续期操作。手动解锁

    boolean b = lock.tryLock();
    System.out.println(b);
    if (b){
        try {
            System.out.println("加锁成功。。。执行业务。。。" + Thread.currentThread().getId());
            Thread.sleep(30000);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //3、解锁
            System.out.println("释放锁。。。" + Thread.currentThread().getId());
            lock.unlock();
        }
    }
    return "hello=>"+b;
}
```

![image-20220718172229790](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.3.1.png)

![GIF 2022-7-18 17-19-14](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.2.3.2.gif)

#### 3、 公平锁（Fair Lock）

`公平锁`是按照请求发出的先后顺序来处理请求，是`先进先出`的，而非向其他锁一样是`抢占式`的

> 基于Redis的Redisson分布式可重入公平锁也是实现了`java.util.concurrent.locks.Lock`接口的一种`RLock`对象。同时还提供了[异步（Async）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockAsync.html)、[反射式（Reactive）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockReactive.html)和[RxJava2标准](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RLockRx.html)的接口。它保证了当多个Redisson客户端线程同时请求加锁时，优先分配给先发出请求的线程。所有请求线程会在一个队列中排队，当某个线程出现宕机时，Redisson会等待5秒后继续下一个线程，也就是说如果前面有5个线程都处于等待状态，那么后面的线程会等待至少25秒。
>
> ```java
> RLock fairLock = redisson.getFairLock("anyLock");
> // 最常见的使用方法
> fairLock.lock();
> ```
>
> 大家都知道，如果负责储存这个分布式锁的Redis节点宕机以后，而且这个锁正好处于锁住的状态时，这个锁会出现锁死的状态。为了避免这种情况的发生，Redisson内部提供了一个监控锁的看门狗，它的作用是在Redisson实例被关闭前，不断的延长锁的有效期。默认情况下，看门狗的检查锁的超时时间是30秒钟，也可以通过修改[Config.lockWatchdogTimeout](https://github.com/redisson/redisson/wiki/2.-配置方法#lockwatchdogtimeout监控锁的看门狗超时单位毫秒)来另行指定。
>
> 另外Redisson还通过加锁的方法提供了`leaseTime`的参数来指定加锁的时间。超过这个时间后锁便自动解开了。
>
> ```java
> // 10秒钟以后自动解锁
> // 无需调用unlock方法手动解锁
> fairLock.lock(10, TimeUnit.SECONDS);
> 
> // 尝试加锁，最多等待100秒，上锁以后10秒自动解锁
> boolean res = fairLock.tryLock(100, 10, TimeUnit.SECONDS);
> ...
> fairLock.unlock();
> ```
>
> Redisson同时还为分布式可重入公平锁提供了异步执行的相关方法：
>
> ```java
> RLock fairLock = redisson.getFairLock("anyLock");
> fairLock.lockAsync();
> fairLock.lockAsync(10, TimeUnit.SECONDS);
> Future<Boolean> res = fairLock.tryLockAsync(100, 10, TimeUnit.SECONDS);
> ```

官方文档：`https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器`

#### 4、读写锁（ReadWriteLock）

> 基于Redis的Redisson分布式可重入读写锁[`RReadWriteLock`](http://static.javadoc.io/org.redisson/redisson/3.4.3/org/redisson/api/RReadWriteLock.html) Java对象实现了`java.util.concurrent.locks.ReadWriteLock`接口。其中读锁和写锁都继承了[RLock](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#81-可重入锁reentrant-lock)接口。
>
> 分布式可重入读写锁允许同时有多个读锁和一个写锁处于加锁状态。
>
> ```java
> RReadWriteLock rwlock = redisson.getReadWriteLock("anyRWLock");
> // 最常见的使用方法
> rwlock.readLock().lock();
> // 或
> rwlock.writeLock().lock();
> ```
>
> 大家都知道，如果负责储存这个分布式锁的Redis节点宕机以后，而且这个锁正好处于锁住的状态时，这个锁会出现锁死的状态。为了避免这种情况的发生，Redisson内部提供了一个监控锁的看门狗，它的作用是在Redisson实例被关闭前，不断的延长锁的有效期。默认情况下，看门狗的检查锁的超时时间是30秒钟，也可以通过修改[Config.lockWatchdogTimeout](https://github.com/redisson/redisson/wiki/2.-配置方法#lockwatchdogtimeout监控锁的看门狗超时单位毫秒)来另行指定。
>
> 另外Redisson还通过加锁的方法提供了`leaseTime`的参数来指定加锁的时间。超过这个时间后锁便自动解开了。
>
> ```java
> // 10秒钟以后自动解锁
> // 无需调用unlock方法手动解锁
> rwlock.readLock().lock(10, TimeUnit.SECONDS);
> // 或
> rwlock.writeLock().lock(10, TimeUnit.SECONDS);
> 
> // 尝试加锁，最多等待100秒，上锁以后10秒自动解锁
> boolean res = rwlock.readLock().tryLock(100, 10, TimeUnit.SECONDS);
> // 或
> boolean res = rwlock.writeLock().tryLock(100, 10, TimeUnit.SECONDS);
> ...
> lock.unlock();
> ```

官方文档：`https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器`

##### 1、读写锁测试

http://localhost:10000/read

http://localhost:10000/write



```java
@Autowired
StringRedisTemplate redisTemplate;

@GetMapping("/read")
@ResponseBody
public String readValue() {
    RReadWriteLock lock = redissonClient.getReadWriteLock("rw-lock");
    //ReentrantReadwriteLock writeLock = new ReentrantReadWriteLock();
    String s = "";
    //加读锁
    RLock rLock = lock.readLock();
    rLock.lock();
    try {
        s = redisTemplate.opsForValue().get("writeValue");
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        rLock.unlock();
    }
    return s;
}

//保证一定能读到最新数据，修改期间，写锁是一个排他锁(互斥锁、独享锁)。读锁是一个共享锁
//写锁没释放读就必须等待
@GetMapping("/write")
@ResponseBody
public String writeValue() {
    RReadWriteLock lock = redissonClient.getReadWriteLock("rw-lock");
    String s = "";
    RLock rLock = lock.writeLock();
    try {
        //1、改数据加写锁，读数据加读锁
        rLock.lock();
        s = UUID.randomUUID().toString();
        Thread.sleep(10000);
        redisTemplate.opsForValue().set("writeValue", s);
    } catch (InterruptedException e) {
        e.printStackTrace();
    } finally {
        rLock.unlock();
    }
    return s;
}
```

![image-20220718145647660](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.1.1.png)

![GIF 2022-7-18 14-49-32](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.1.2.gif)

![GIF 2022-7-18 14-54-38](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.1.3.gif)

##### 2、修改代码

```java
@Autowired
StringRedisTemplate redisTemplate;

@GetMapping("/read")
@ResponseBody
public String readValue() {
    RReadWriteLock lock = redissonClient.getReadWriteLock("rw-lock");
    //ReentrantReadwriteLock writeLock = new ReentrantReadWriteLock();
    String s = "";
    //加读锁
    RLock rLock = lock.readLock();
    rLock.lock();
    try {
        System.out.println("读锁加锁成功" + Thread.currentThread().getId());
        s = redisTemplate.opsForValue().get("writeValue");
        Thread.sleep(8000);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        rLock.unlock();
        System.out.println("读锁释放" + Thread.currentThread().getId());
    }
    return s;
}

//保证一定能读到最新数据，修改期间，写锁是一个排他锁(互斥锁、独享锁)。读锁是一个共享锁
//写锁没释放读就必须等待
//读 + 读: 相当于无锁，并发读，只会在redis中记录好，所有当前的读锁。他们都会同时加锁成功
//写 + 读: 等待写锁释放
//写 + 写: 阻塞方式
//读 + 写: 有读锁。写也需要等待。
//只要有写的存在，都必须等待
@GetMapping("/write")
@ResponseBody
public String writeValue() {
    RReadWriteLock lock = redissonClient.getReadWriteLock("rw-lock");
    String s = "";
    RLock rLock = lock.writeLock();
    try {
        //1、改数据加写锁，读数据加读锁
        rLock.lock();
        System.out.println( "写锁加锁成功... "+Thread.currentThread().getId());
        s = UUID.randomUUID().toString();
        Thread.sleep(8000);
        redisTemplate.opsForValue().set("writeValue", s);
    } catch (InterruptedException e) {
        e.printStackTrace();
    } finally {
        rLock.unlock();
        System.out.println( "写锁释放"+Thread.currentThread().getId());
    }
    return s;
}
```

![image-20220718160814759](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.2.png)

##### 3、测试`读 + 读`

第一次测试

![GIF 2022-7-18 15-55-55](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.3.1.gif)

第二次测试

![GIF 2022-7-18 15-57-29](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.3.2.gif)

第三次测试

![GIF 2022-7-18 15-58-29](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.3.3.gif)

##### 4、测试`写 + 读`

第一次测试

![GIF 2022-7-18 15-50-12](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.4.1.gif)

第二次测试

![GIF 2022-7-18 15-53-02](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.4.2.gif)

第三次测试

![GIF 2022-7-18 15-26-15](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.4.3.gif)

##### 5、测试`写 + 写`

第一次测试

![GIF 2022-7-18 15-39-31](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.5.1.gif)

第二次测试

![GIF 2022-7-18 15-46-46](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.5.2.gif)

第三次测试

![GIF 2022-7-18 15-47-45](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.5.3.gif)

##### 6、测试`读 + 写`

第一次测试

![GIF 2022-7-18 16-02-03](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.6.1.gif)

第二次测试

![GIF 2022-7-18 16-03-38](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.6.2.gif)

第三次测试

![GIF 2022-7-18 16-04-59](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.6.3.gif)

##### 7、读写锁存储结构

![GIF 2022-7-18 16-14-13](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.4.7.gif)

#### 5、信号量（Semaphore）

> 基于Redis的Redisson的分布式信号量（[Semaphore](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphore.html)）Java对象`RSemaphore`采用了与`java.util.concurrent.Semaphore`相似的接口和用法。同时还提供了[异步（Async）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphoreAsync.html)、[反射式（Reactive）](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphoreReactive.html)和[RxJava2标准](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RSemaphoreRx.html)的接口。
>
> ```java
> RSemaphore semaphore = redisson.getSemaphore("semaphore");
> semaphore.acquire();
> //或
> semaphore.acquireAsync();
> semaphore.acquire(23);
> semaphore.tryAcquire();
> //或
> semaphore.tryAcquireAsync();
> semaphore.tryAcquire(23, TimeUnit.SECONDS);
> //或
> semaphore.tryAcquireAsync(23, TimeUnit.SECONDS);
> semaphore.release(10);
> semaphore.release();
> //或
> semaphore.releaseAsync();
> ```

官方文档：`https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器`

##### 1、阻塞式等待

访问： http://localhost:10000/park 

访问： http://localhost:10000/go 

```java
@GetMapping("/park")
@ResponseBody
public String park() throws InterruptedException {
    RSemaphore park = redissonClient.getSemaphore("park");
    //阻塞式
    park.acquire();//获取一个信号，,占一个车位
    return "ok";
}
@GetMapping("/go")
@ResponseBody
public String go() throws InterruptedException {
    RSemaphore park =redissonClient.getSemaphore("park");
    park.release();//释放一个车位
    return "ok";
}
```

![image-20220718162522921](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.5.1.1.png)



![GIF 2022-7-18 16-24-35](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.5.1.2.gif)



##### 2、非阻塞式等待

```java
@GetMapping("/park")
@ResponseBody
public String park() throws InterruptedException {
    RSemaphore park = redissonClient.getSemaphore("park");
    //阻塞式等待
    //park.acquire();//获取一个信号，,占一个车位
    //非阻塞式等待
    boolean b = park.tryAcquire();
    return "ok=>" + b;
}

@GetMapping("/go")
@ResponseBody
public String go() throws InterruptedException {
    RSemaphore park = redissonClient.getSemaphore("park");
    park.release();//释放一个车位
    return "ok";
}
```

![image-20220718163318725](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.5.2.1.png)



![GIF 2022-7-18 16-32-01](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.5.2.2.gif)

##### 3、分布式限流

```java
/**
 * 车库停车
 * 3车位
 * 信号量也可以用作分布式限流;
 */
@GetMapping("/park" )
@ResponseBody
public String park() throws InterruptedException {
    RSemaphore park = redissonClient.getSemaphore("park") ;
    //阻塞式等待
    //park.acquire();//获取一个信号，,占一个车位
    //非阻塞式等待
    boolean b = park.tryAcquire();
    if(b){
        //执行业务
    }else {
        return "error" ;
    }
    return "ok=>"+b;
}


@GetMapping("/go")
@ResponseBody
public String go() throws InterruptedException {
    RSemaphore park = redissonClient.getSemaphore("park");
    park.release();//释放一个车位
    return "ok";
}
```

![image-20220718172703326](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.5.3.png)

#### 6、闭锁（CountDownLatch）

> 基于Redisson的Redisson分布式闭锁（[CountDownLatch](http://static.javadoc.io/org.redisson/redisson/3.10.0/org/redisson/api/RCountDownLatch.html)）Java对象`RCountDownLatch`采用了与`java.util.concurrent.CountDownLatch`相似的接口和用法。
>
> ```java
> RCountDownLatch latch = redisson.getCountDownLatch("anyCountDownLatch");
> latch.trySetCount(1);
> latch.await();
> 
> // 在其他线程或其他JVM里
> RCountDownLatch latch = redisson.getCountDownLatch("anyCountDownLatch");
> latch.countDown();
> ```

官方文档：`https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器`



```java
/**
 * 放假，锁门
 * 1班没人了，2
 * 5个班全部走完，我们可以锁大门
 */
@GetMapping("/lockDoor")
@ResponseBody
public String lockDoor() throws InterruptedException {
    RCountDownLatch door = redissonClient.getCountDownLatch("door");
    door.trySetCount(5);
    door.await(); //等待闭锁都完成
    return "放假了...";
}

@GetMapping("/gogogo/{id}")
@ResponseBody
public String gogogo(@PathVariable("id") Long id) {
    RCountDownLatch door = redissonClient.getCountDownLatch("door");
    door.countDown();//计数减一;
    return id + "班的人都走了...";
}
```

![image-20220718183034909](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.6.1.png)

![GIF 2022-7-18 18-16-16](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.6.2.gif)

一定要保证先访问： http://localhost:10000/lockDoor  再访问 http://localhost:10000/gogogo/1

![GIF 2022-7-18 18-17-15](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.6.3.gif)

#### 7、添加

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里添加`getCatalogJsonForDbWithRedisson`方法

```java
public Map<String, List<Catelog2Vo>> getCatalogJsonForDbWithRedisson() {
    //1、锁的名字。锁的粒度， 越细越快。
    //锁的粒度:具体缓存的是某个数据，11-号商品; product- 11-lock product-12-lock
    RLock lock = redissonClient.getLock("catalogJson-lock");
    lock.lock();
    Map<String, List<Catelog2Vo>> catalogJsonForDb;
    try {
        catalogJsonForDb = getCatalogJsonForDb();
    }finally {
        lock.unlock();
    }
    return catalogJsonForDb;
}
```

修改`getCatalogJson`方法，把

```java
Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDbWithRedisLock();
```

修改为：

```java
Map<String, List<Catelog2Vo>> catalogJsonForDb = getCatalogJsonForDbWithRedisson();
```

![image-20220718190606032](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.7.png)

#### 8、缓存数据一致性

##### 1、双写模式

![image-20220721211214914](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.8.1.png)

由于卡顿等原因，导致写缓存2在最前，写缓存1在后面就出现了不一致脏数据问题：

这是暂时性的脏数据问题，但是在数据稳定，缓存过期以后，又能得到最新的正确数据

读到的最新数据有延迟：最终一致性

##### 2、失效模式

![image-20220721211304919](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.8.2.png)

我们系统的一致性解决方案：

1、缓存的所有数据都有过期时间，数据过期下一次查询触发主动更新

2、读写数据的时候，加上分布式的读写锁。 经常写，经常读

##### 3、解决方案

无论是双写模式还是失效模式，都会导致缓存的不一致问题。即多个实例同时更新会出事。怎么办？

1. 如果是用户纬度数据（订单数据、用户数据），这种并发几率非常小，不用考虑这个问题，缓存数据加 上过期时间，每隔一段时间触发读的主动更新即可

2. 如果是菜单，商品介绍等基础数据，也可以去使用canal订阅binlog的方式。

3. 缓存数据+过期时间也足够解决大部分业务对于缓存的要求。

4. 通过加锁保证并发读写，写写的时候按顺序排好队。读读无所谓。所以适合使用读写锁。（业务不关心 脏数据，允许临时脏数据可忽略）；

**总结：**

- 我们能放入缓存的数据本就不应该是实时性、一致性要求超高的。所以缓存数据的时候加上过期时间，保 证每天拿到当前最新数据即可。

- 我们不应该过度设计，增加系统的复杂性

- 遇到实时性、一致性要求高的数据，就应该查数据库，即使慢点。

##### 4、强一致性解决方案-Canal

使用`Canal`更新缓存

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.8.4.1.png" alt="image-20220721211610540"  />

使用`Canal`解决数据异构

![image-20220721211810088](https://gitlab.com/apzs/image/-/raw/master/image/5.4.3.8.4.2.png)



### 5.4.4、`SpringCache`

![image-20220721212944809](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.0.png)

官方文档： https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#cache

![GIF 2022-7-18 19-15-46](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.0.gif)

#### 1、`SpringCache`组成

##### 1、`CacheManager`

双击`Shift`，在搜索框中搜索`CacheManager`，可以看到`org.springframework.cache.CacheManager`类有`getCache`和`getCacheNames`两个方法

```java
/*
 * Copyright 2002-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.cache;

import java.util.Collection;

import org.springframework.lang.Nullable;

/**
 * Spring's central cache manager SPI.
 *
 * <p>Allows for retrieving named {@link Cache} regions.
 *
 * @author Costin Leau
 * @author Sam Brannen
 * @since 3.1
 */
public interface CacheManager {

   /**
    * Get the cache associated with the given name.
    * <p>Note that the cache may be lazily created at runtime if the
    * native provider supports it.
    * @param name the cache identifier (must not be {@code null})
    * @return the associated cache, or {@code null} if such a cache
    * does not exist or could be not created
    */
   @Nullable
   Cache getCache(String name);

   /**
    * Get a collection of the cache names known by this manager.
    * @return the names of all caches known by the cache manager
    */
   Collection<String> getCacheNames();

}
```

![image-20220718192613795](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.1.png)

##### 2、`Cache`

点击`Cache`类里面，可以看到在`org.springframework.cache.Cache`类里面定义的有缓存的`增删查改`等方法

![image-20220718192541559](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.2.png)

##### 3、`ConcurrentMapCacheManager`

在`CacheManager`类里，按`ctrl+H`快捷键，可以看到`Spring`支持非常多的缓存管理器，打开`ConcurrentMapCacheManager`类

![image-20220718193327516](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.3.1.png)

在`org.springframework.cache.concurrent.ConcurrentMapCacheManager`类的构造器里可以输入需要管理的缓存的名字

该构造方法会调用本类的`setCacheNames`方法，并把传进来的不定长的`cacheNames`转为`List`

```java
/**
 * Construct a static ConcurrentMapCacheManager,
 * managing caches for the specified cache names only.
 */
public ConcurrentMapCacheManager(String... cacheNames) {
   setCacheNames(Arrays.asList(cacheNames));
}


/**
 * Specify the set of cache names for this CacheManager's 'static' mode.
 * <p>The number of caches and their names will be fixed after a call to this method,
 * with no creation of further cache regions at runtime.
 * <p>Calling this with a {@code null} collection argument resets the
 * mode to 'dynamic', allowing for further creation of caches again.
 */
public void setCacheNames(@Nullable Collection<String> cacheNames) {
   if (cacheNames != null) {
      for (String name : cacheNames) {
         this.cacheMap.put(name, createConcurrentMapCache(name));
      }
      this.dynamic = false;
   }
   else {
      this.dynamic = true;
   }
}
```

![image-20220718193810047](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.3.2.png)

在`setCacheNames`方法里会遍历传进来的`cacheNames`，并把这些`name`作为`k`、调用`createConcurrentMapCache(name)`方法的返回值作为`v`放入本类的`cacheMap`属性里，本类的`cacheMap`对象其实就是`ConcurrentHashMap`类型

```java
private final ConcurrentMap<String, Cache> cacheMap = new ConcurrentHashMap<>(16);
```

![image-20220718193947559](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.3.3.png)

`createConcurrentMapCache(name)`方法的返回的形式参数为`org.springframework.cache.Cache`，实际参数为`org.springframework.cache.concurrent.ConcurrentMapCache`，而`ConcurrentMapCache`继承`org.springframework.cache.support.AbstractValueAdaptingCache`，`AbstractValueAdaptingCache`实现`org.springframework.cache.Cache`

```java
public class ConcurrentMapCache extends AbstractValueAdaptingCache
public abstract class AbstractValueAdaptingCache implements Cache
```

![image-20220718194203552](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.3.4.png)

##### 4、`ConcurrentMapCache`

点进`ConcurrentMapCache`里面，可以看到`org.springframework.cache.concurrent.ConcurrentMapCache`类里有类型为`ConcurrentMap<Object, Object>`的`store`属性，该属性用于存储数据

![image-20220718194415502](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.4.1.png)

往下看，可以看到都是从`store`中获取数据的

![image-20220718194619323](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.1.4.2.png)

#### 2、引入`SpringCache`

##### 1、导入依赖

在`gulimall-product`模块的`pom.xml`里引入`SpringCache`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

![image-20220718195140052](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.1.png)

##### 2、`CacheAutoConfiguration`

缓存的自动配置类是`org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration`类，在`CacheAutoConfiguration`类里，缓存的所有属性都在`CacheProperties`类里封装着

![image-20220718195906577](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.2.png)

##### 3、`CacheProperties`

在`org.springframework.boot.autoconfigure.cache.CacheProperties`类里的属性，在配置文件中都以`spring.cache`开始

![image-20220718200219087](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.3.png)

##### 4、切换到`CacheAutoConfiguration`

返回`CacheAutoConfiguration`类，其内部的`CacheConfigurationImportSelector`选择器里面又导了很多配置

```java
/**
 * {@link ImportSelector} to add {@link CacheType} configuration classes.
 */
static class CacheConfigurationImportSelector implements ImportSelector {

   @Override
   public String[] selectImports(AnnotationMetadata importingClassMetadata) {
      CacheType[] types = CacheType.values();
      String[] imports = new String[types.length];
      for (int i = 0; i < types.length; i++) {
         imports[i] = CacheConfigurations.getConfigurationClass(types[i]);
      }
      return imports;
   }

}
```

![image-20220718200424084](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.4.png)

##### 5、`CacheConfigurations`

在`org.springframework.boot.autoconfigure.cache.CacheConfigurations`类的`getConfigurationClass`方法里，按照缓存的类型进行映射

```java
public static String getConfigurationClass(CacheType cacheType) {
   Class<?> configurationClass = MAPPINGS.get(cacheType);
   Assert.state(configurationClass != null, () -> "Unknown cache type " + cacheType);
   return configurationClass.getName();
}
```

![image-20220718200709725](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.5.1.png)

如果使用的是`redis`，就使用RedisCacheConfiguration配置类

```java
private static final Map<CacheType, Class<?>> MAPPINGS;

static {
   Map<CacheType, Class<?>> mappings = new EnumMap<>(CacheType.class);
   mappings.put(CacheType.GENERIC, GenericCacheConfiguration.class);
   mappings.put(CacheType.EHCACHE, EhCacheCacheConfiguration.class);
   mappings.put(CacheType.HAZELCAST, HazelcastCacheConfiguration.class);
   mappings.put(CacheType.INFINISPAN, InfinispanCacheConfiguration.class);
   mappings.put(CacheType.JCACHE, JCacheCacheConfiguration.class);
   mappings.put(CacheType.COUCHBASE, CouchbaseCacheConfiguration.class);
   mappings.put(CacheType.REDIS, RedisCacheConfiguration.class);
   mappings.put(CacheType.CAFFEINE, CaffeineCacheConfiguration.class);
   mappings.put(CacheType.SIMPLE, SimpleCacheConfiguration.class);
   mappings.put(CacheType.NONE, NoOpCacheConfiguration.class);
   MAPPINGS = Collections.unmodifiableMap(mappings);
}
```

![image-20220718201112614](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.5.2.png)

##### 6、`RedisCacheConfiguration`

在`org.springframework.boot.autoconfigure.cache.RedisCacheConfiguration`类里，配置了缓存管理器

```java
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory,
      ResourceLoader resourceLoader) {
   RedisCacheManagerBuilder builder = RedisCacheManager.builder(redisConnectionFactory)
         .cacheDefaults(determineConfiguration(resourceLoader.getClassLoader()));
   List<String> cacheNames = this.cacheProperties.getCacheNames();
   if (!cacheNames.isEmpty()) {
      builder.initialCacheNames(new LinkedHashSet<>(cacheNames));
   }
   return this.customizerInvoker.customize(builder.build());
}
```

![image-20220718201922910](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.6.png)

##### 7、`CacheProperties`

在`org.springframework.boot.autoconfigure.cache.CacheProperties`类里如果配置了`spring.cache.cacheNames`，就可以获取到这些缓存的名字

![image-20220718202018699](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.7.png)

##### 8、切换到`RedisCacheConfiguration`

切换到`RedisCacheConfiguration`类，在`cacheManager`方法获取到缓存的名字后，在`builder.initialCacheNames(new LinkedHashSet<>(cacheNames));`初始化缓存

![image-20220718202231757](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.8.png)

##### 9、`RedisCacheManager`

在`org.springframework.data.redis.cache.RedisCacheManager`类的`initialCacheNames`方法里

遍历`cacheNames`，使用默认缓存配置，把它们放到`cacheConfigMap`里面，并初始化缓存配置

```java
/**
 * Append a {@link Set} of cache names to be pre initialized with current {@link RedisCacheConfiguration}.
 * <strong>NOTE:</strong> This calls depends on {@link #cacheDefaults(RedisCacheConfiguration)} using whatever
 * default {@link RedisCacheConfiguration} is present at the time of invoking this method.
 *
 * @param cacheNames must not be {@literal null}.
 * @return this {@link RedisCacheManagerBuilder}.
 */
public RedisCacheManagerBuilder initialCacheNames(Set<String> cacheNames) {

   Assert.notNull(cacheNames, "CacheNames must not be null!");

   Map<String, RedisCacheConfiguration> cacheConfigMap = new LinkedHashMap<>(cacheNames.size());
   //遍历`cacheNames`，使用默认缓存配置，把它们放到`cacheConfigMap`里面
   cacheNames.forEach(it -> cacheConfigMap.put(it, defaultCacheConfiguration));
   //初始化缓存配置
   return withInitialCacheConfigurations(cacheConfigMap);
}
```

![image-20220718202707460](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.9.1.png)

`withInitialCacheConfigurations(cacheConfigMap)`方法会把类型为`Map<String, RedisCacheConfiguration>`的`cacheConfigMap`放到同样类型的`initialCaches`里面

```java
private final Map<String, RedisCacheConfiguration> initialCaches = new LinkedHashMap<>();

/**
 * Append a {@link Map} of cache name/{@link RedisCacheConfiguration} pairs to be pre initialized.
 *
 * @param cacheConfigurations must not be {@literal null}.
 * @return this {@link RedisCacheManagerBuilder}.
 */
public RedisCacheManagerBuilder withInitialCacheConfigurations(
      Map<String, RedisCacheConfiguration> cacheConfigurations) {

   Assert.notNull(cacheConfigurations, "CacheConfigurations must not be null!");
   cacheConfigurations.forEach((cacheName, configuration) -> Assert.notNull(configuration,
         String.format("RedisCacheConfiguration for cache %s must not be null!", cacheName)));

   this.initialCaches.putAll(cacheConfigurations);

   return this;
}
```

![image-20220718202932830](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.9.2.png)

`initialCaches`属性的类型为`Map<String, RedisCacheConfiguration>`，其中`String`存放了缓存的名字，`RedisCacheConfiguration`存放了`RedisCacheConfiguration.defaultCacheConfig()`方法返回的默认的`RedisCacheConfiguration`

```java
private final Map<String, RedisCacheConfiguration> initialCaches = new LinkedHashMap<>();
```

![image-20220718203136409](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.9.3.png)

##### 10、切换到`RedisCacheConfiguration`

切换到`RedisCacheConfiguration`，在`cacheManager`方法里调用了`determineConfiguration`方法，`determineConfiguration`方法里如果`ioc`容器中不存在`RedisCacheConfiguration`则会进行默认配置

```java
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory,
      ResourceLoader resourceLoader) {
   RedisCacheManagerBuilder builder = RedisCacheManager.builder(redisConnectionFactory)
         .cacheDefaults(determineConfiguration(resourceLoader.getClassLoader()));
   List<String> cacheNames = this.cacheProperties.getCacheNames();
   if (!cacheNames.isEmpty()) {
      builder.initialCacheNames(new LinkedHashSet<>(cacheNames));
   }
   return this.customizerInvoker.customize(builder.build());
}

private org.springframework.data.redis.cache.RedisCacheConfiguration determineConfiguration(
      ClassLoader classLoader) {
   if (this.redisCacheConfiguration != null) {
      return this.redisCacheConfiguration;
   }
   Redis redisProperties = this.cacheProperties.getRedis();
   org.springframework.data.redis.cache.RedisCacheConfiguration config = org.springframework.data.redis.cache.RedisCacheConfiguration
         .defaultCacheConfig();
   config = config.serializeValuesWith(
         SerializationPair.fromSerializer(new JdkSerializationRedisSerializer(classLoader))); //序列化机制
   if (redisProperties.getTimeToLive() != null) { //过期时间
      config = config.entryTtl(redisProperties.getTimeToLive());
   }
   if (redisProperties.getKeyPrefix() != null) { //前缀
      config = config.prefixKeysWith(redisProperties.getKeyPrefix());
   }
   if (!redisProperties.isCacheNullValues()) { //要不要缓存空数据
      config = config.disableCachingNullValues();
   }
   if (!redisProperties.isUseKeyPrefix()) { //是否使用缓存的前缀
      config = config.disableKeyPrefix();
   }
   return config;
}
```

![image-20220718203626286](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.2.10.png)

#### 3、添加配置

在`gulimall-product`模块的`src/main/resources`目录下新建`application.properties`配置文件，在该配置文件内添加配置

```properties
#缓存的类型
spring.cache.type=redis

#缓存的名字
#如果配置了缓存的名字，则只能使用这些名字
#系统中用到哪些缓存了，帮你创建出来
#spring.cache.cache-names=qq,qqq
```

![image-20220718204448764](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.3.1.png)

在`org.springframework.boot.autoconfigure.cache.CacheProperties`类的`cacheNames`字段上有一段注释

如果底层缓存管理器支持，要创建的缓存名称的逗号分隔列表。 通常，这会禁用动态创建附加缓存的能力。

```java
/**
 * Comma-separated list of cache names to create if supported by the underlying cache
 * manager. Usually, this disables the ability to create additional caches on-the-fly.
 */
private List<String> cacheNames = new ArrayList<>();
```

![image-20220718204336191](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.3.2.png)

#### 4、常用注解(1)

For caching declaration, Spring’s caching abstraction provides a set of Java annotations:

- `@Cacheable`: Triggers cache population.  触发缓存填充 (触发将数据保存到缓存的操作)
- `@CacheEvict`: Triggers cache eviction.  触发缓存驱逐 (触发将数据从缓存删除的操作)
- `@CachePut`: Updates the cache without interfering with the method execution. 在不干扰方法执行的情况下更新缓存 (不影响方法执行更新缓存)
- `@Caching`: Regroups multiple cache operations to be applied on a method. 重新组合多个缓存操作以应用于一个方法 (组合以上多个操作)
- `@CacheConfig`: Shares some common cache-related settings at class-level. 在类级别共享一些常见的缓存相关设置 (在类级别共享缓存的相同配置)

##### 1、`@EnableCaching`开启缓存功能

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplication`启动类上添加`@EnableCaching`注解

```java
@EnableCaching
@EnableFeignClients(basePackages = "com.atguigu.gulimall.product.feign")
@EnableDiscoveryClient
@MapperScan("com.atguigu.gulimall.product.dao")
@SpringBootApplication
public class GulimallProductApplication {
    public static void main(String[] args) {
        SpringApplication.run(GulimallProductApplication.class,args);
    }
}
```

![image-20220718205852014](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.4.1.png)

##### 2、`@Cacheable`添加缓存

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`getLevel1Categories`方法。添加`@Cacheable`注解，代表当前方法的结果需要缓存，如果缓存中有，方法不用调用。如果缓存中没有，会调用方法，最后将方法的结果放入缓存。`value = {"category"}`，指定放到名为`category`的分区下

```java
//每一个需要缓存的数据我们都来指定要放到那个名字的缓存。[ 缓存的分区(按照业务类型分)]
//代表当前方法的结果需要缓存，如果缓存中有，方法不用调用。如果缓存中没有，会调用方法，最后将方法的结果放入缓存
@Cacheable({"category"})
@Override
public List<CategoryEntity> getLevel1Categories() {
    System.out.println("getLevel1Categories...");
    LambdaQueryWrapper<CategoryEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(CategoryEntity::getParentCid, 0);
    lambdaQueryWrapper.select(CategoryEntity::getCatId, CategoryEntity::getName);
    //long start = System.currentTimeMillis();
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(lambdaQueryWrapper);
    //long end = System.currentTimeMillis();
    //System.out.println("消耗时间："+(end-start));
    return categoryEntities;
}
```

![image-20220718210308329](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.4.2.png)

##### 3、测试

如果缓存中没有数据，会调用方法，最后将方法的结果放入缓存。如果缓存中有，方法不用调用，直接返回数据

可以看到已经自动缓存数据了，但是`key`不是我们指定的，过期时间也为`-1`(永不过期)、数据的格式也不为`JSON`

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.4.3.gif" alt="GIF 2022-7-18 21-11-35" style="zoom:50%;" />

##### 4、`@Cacheable`可选参数

在`org.springframework.cache.annotation.Cacheable`注解接口里

`value`起了个别名叫`cacheNames`

`cacheNames`起了个别名叫`value`

```java
package org.springframework.cache.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.Callable;

import org.springframework.core.annotation.AliasFor;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Cacheable {

  /**
   * Alias for {@link #cacheNames}.
   */
  @AliasFor("cacheNames")
  String[] value() default {};

  /**
   * Names of the caches in which method invocation results are stored.
   * <p>Names may be used to determine the target cache (or caches), matching
   * the qualifier value or bean name of a specific bean definition.
   * @since 4.2
   * @see #value
   * @see CacheConfig#cacheNames
   */
  @AliasFor("value")
  String[] cacheNames() default {};

  String key() default "";

  String keyGenerator() default "";

  String cacheManager() default "";

  String cacheResolver() default "";

  String condition() default "";

  String unless() default "";

  boolean sync() default false;

}
```

![image-20220718212829162](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.4.4.1.png)

其他参数代表如下意思：

```java
//指定k值是什么(支持SpringEL)(如果不是EL表达式，需要加上单引号)
String key() default "";
//k的生成器
String keyGenerator() default "";
//指定使用哪个缓存管理器
String cacheManager() default "";
//缓存用的条件(把哪些数据放到缓存里面，可以接收一个表达式)
String condition() default "";
//除了指定的情况外，其他情况都向缓存中保存数据
String unless() default "";
//设置是否使用同步方式(如果是同步方式，unless就不可用)
boolean sync() default false;
```

![image-20220718212426919](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.4.4.2.png)

官方文档： https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#cache

支持的EL表达式

| Name          | Location           | Description                                                  | Example                                                      |
| :------------ | :----------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `methodName`  | Root object        | The name of the method being invoked                         | `#root.methodName`                                           |
| `method`      | Root object        | The method being invoked                                     | `#root.method.name`                                          |
| `target`      | Root object        | The target object being invoked                              | `#root.target`                                               |
| `targetClass` | Root object        | The class of the target being invoked                        | `#root.targetClass`                                          |
| `args`        | Root object        | The arguments (as array) used for invoking the target        | `#root.args[0]`                                              |
| `caches`      | Root object        | Collection of caches against which the current method is run | `#root.caches[0].name`                                       |
| Argument name | Evaluation context | Name of any of the method arguments. If the names are not available (perhaps due to having no debug information), the argument names are also available under the `#a<#arg>` where `#arg` stands for the argument index (starting from `0`). | `#iban` or `#a0` (you can also use `#p0` or `#p<#arg>` notation as an alias). |
| `result`      | Evaluation context | The result of the method call (the value to be cached). Only available in `unless` expressions, `cache put` expressions (to compute the `key`), or `cache evict` expressions (when `beforeInvocation` is `false`). For supported wrappers (such as `Optional`), `#result` refers to the actual object, not the wrapper. | `#result`                                                    |

![image-20220718213355681](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.4.4.3.png)

#### 5、需求

##### 1、指定`key`

可以在`key`的值的字符串里加上`'`单引号(`key = "'xxx'"`)，指明不使用`SpEL`

```java
/**
 * 1、每一个需要缓存的数据我们都来指定要放到那个名字的缓存。[ 缓存的分区(按照业务类型分)]
 * 2、@Cacheable({"category"})
 *   代表当前方法的结果需要缓存，如果缓存中有，方法不用调用。
 *   如果缓存中没有，会调用方法，最后将方法的结果放入缓存
 * 3、默认行为
 *   1)、如果缓存中有，方法不用调用。
 *   2)、key默认自动生成;缓存的名字::SimpleKey []( 自主生成的key值)
 *   3)、缓存的value的值。默认使用jdk序列化机制，将序列化后的数据存到redis
 * 4)、默认ttl时间-1; .
 * 自定义:
 *   1)、指定生成的缓存使用的key:
 *     key属性指定，接受一个SpEL
 *     SpEL的详细https ://docs.spring. io/spring/docs/5.1.12. REL EASE/spring-framework-re.
 *   2)、指定缓存的数据的存活时间:配置文件中 修改ttL
 *   3)、将数据保存为json格式
 **/

@Cacheable(value = {"category"}, key = "'level1Categories'")
@Override
public List<CategoryEntity> getLevel1Categories() {
    System.out.println("getLevel1Categories...");
    LambdaQueryWrapper<CategoryEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(CategoryEntity::getParentCid, 0);
    lambdaQueryWrapper.select(CategoryEntity::getCatId, CategoryEntity::getName);
    //long start = System.currentTimeMillis();
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(lambdaQueryWrapper);
    //long end = System.currentTimeMillis();
    //System.out.println("消耗时间："+(end-start));
    return categoryEntities;
}
```

![image-20220718214321219](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.5.1.png)

##### 2、指定过期时间

在`gulimall-product`模块的`src/main/resources/application.properties`类里添加`key`为`spring.cache.redis.time-to-live`的属性可以指定缓存的过期时间(以`ms`(毫秒)为单位)

```java
spring.cache.redis.time-to-live=3600000
```

![image-20220718214404174](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.5.2.png)

##### 3、使用`JSON`存储

使用`JSON`存储，不可以直接通过配置文件或参数的方式指定，需要自定义`RedisCacheConfiguration`

#### 6、自定义`RedisCacheConfiguration`

##### 1、`RedisCacheConfiguration`

查看`org.springframework.boot.autoconfigure.cache.RedisCacheConfiguration`类，`Redis缓存管理器`调用了`确定配置`的方法，用于确定使用什么配置

```java
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory,
      ResourceLoader resourceLoader) {
   RedisCacheManagerBuilder builder = RedisCacheManager.builder(redisConnectionFactory)
         .cacheDefaults(determineConfiguration(resourceLoader.getClassLoader()));
   List<String> cacheNames = this.cacheProperties.getCacheNames();
   if (!cacheNames.isEmpty()) {
      builder.initialCacheNames(new LinkedHashSet<>(cacheNames));
   }
   return this.customizerInvoker.customize(builder.build());
}
```

而`确定配置`的方法里，判断如果本类的`redis缓存配置`存在，就使用存在的缓存配置

如果不存在就是使用默认的缓存配置

如果`ioc`容器中存在`redis缓存配置`，就赋值到本类的`redis缓存配置`属性里

[点击查看`RedisCacheConfiguration`类完整代码](code/5.4.4.6.1.RedisCacheConfiguration.java)

```java
private org.springframework.data.redis.cache.RedisCacheConfiguration determineConfiguration(
      ClassLoader classLoader) {
   if (this.redisCacheConfiguration != null) {
      return this.redisCacheConfiguration;
   }
   Redis redisProperties = this.cacheProperties.getRedis();
   org.springframework.data.redis.cache.RedisCacheConfiguration config = org.springframework.data.redis.cache.RedisCacheConfiguration
         .defaultCacheConfig();
   config = config.serializeValuesWith(
         SerializationPair.fromSerializer(new JdkSerializationRedisSerializer(classLoader)));
   if (redisProperties.getTimeToLive() != null) {
      config = config.entryTtl(redisProperties.getTimeToLive());
   }
   if (redisProperties.getKeyPrefix() != null) {
      config = config.prefixKeysWith(redisProperties.getKeyPrefix());
   }
   if (!redisProperties.isCacheNullValues()) {
      config = config.disableCachingNullValues();
   }
   if (!redisProperties.isUseKeyPrefix()) {
      config = config.disableKeyPrefix();
   }
   return config;
}
```

![image-20220720145109609](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.1.png)

##### 2、`RedisCacheConfiguration`

点击

```java
private final org.springframework.data.redis.cache.RedisCacheConfiguration redisCacheConfiguration;
```

里的`RedisCacheConfiguration`，即可看到`org.springframework.data.redis.cache.RedisCacheConfiguration`的`RedisCacheConfiguration`

这里就有`keySerializationPair`(键序列化对)和`valueSerializationPair`(值序列化对)

![image-20220720145752451](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.2.1.png)

在`defaultCacheConfig`方法的文档注释里可以看到，`key`使用了`StringRedisSerializer`来序列化，`value`使用`JdkSerializationRedisSerializer`来序列化

[点击查看`RedisCacheConfiguration`类完整代码](code/5.4.4.6.2.RedisCacheConfiguration.java)

```java
/**
 * Default {@link RedisCacheConfiguration} using the following:
 * <dl>
 * <dt>key expiration</dt>
 * <dd>eternal</dd>
 * <dt>cache null values</dt>
 * <dd>yes</dd>
 * <dt>prefix cache keys</dt>
 * <dd>yes</dd>
 * <dt>default prefix</dt>
 * <dd>[the actual cache name]</dd>
 * <dt>key serializer</dt>
 * <dd>{@link org.springframework.data.redis.serializer.StringRedisSerializer}</dd>
 * <dt>value serializer</dt>
 * <dd>{@link org.springframework.data.redis.serializer.JdkSerializationRedisSerializer}</dd>
 * <dt>conversion service</dt>
 * <dd>{@link DefaultFormattingConversionService} with {@link #registerDefaultConverters(ConverterRegistry) default}
 * cache key converters</dd>
 * </dl>
 *
 * @return new {@link RedisCacheConfiguration}.
 */
public static RedisCacheConfiguration defaultCacheConfig() {
   return defaultCacheConfig(null);
}
```

![image-20220720145809659](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.2.2.png)

##### 3、编写`MyRedisCacheConfig`类

可以参考`org.springframework.boot.autoconfigure.cache.RedisCacheConfiguration`类的`determineConfiguration`方法的写法，编写`org.springframework.data.redis.cache.RedisCacheConfiguration`类型的`Bean`

![image-20220720151648207](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.3.0.png)

删掉`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplication`启动类的`@EnableCaching`注解

![image-20220720150049487](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.3.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.config`包下新建`MyRedisCacheConfig`配置类，在该配置类里编写类型为`org.springframework.data.redis.cache.RedisCacheConfiguration`的`Bean` **(不要导错包了)**

![image-20220720151543631](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.3.2.png)

~~进入`org.springframework.data.redis.serializer.RedisSerializer`，然后按`ctrl+H`查看其子类，可以看到有`String`类型和`Json`类型的序列化方式，`spring`框架提供的`org.springframework.data.redis.serializer.StringRedisSerializer` ，阿里提供的`com.alibaba.fastjson.support.spring.FastJsonRedisSerializer`，阿里提供的`com.alibaba.fastjson.support.spring.GenericFastJsonRedisSerializer`~~ 带了`Generic`的可以兼容任意类型，因此需要选择带`Generic`的

![image-20220720151527159](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.3.3.png)

完整代码：

```java
package com.atguigu.gulimall.product.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author 无名氏
 * @date 2022/7/20
 * @Description:
 */
@Configuration
@EnableCaching
public class MyRedisCacheConfig {

    @Bean
    RedisCacheConfiguration redisCacheConfiguration(){
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        config.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()));
        config.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()))
    }

}
```

![image-20220720152347608](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.3.4.png)

##### 4、测试

删掉以前的在`redis`里的`category（1）`数据，刷新 http://localhost:10000/ 页面，在新生成的`category（1）`可以看到，数据并没有变为`JSON`格式

![GIF 2022-7-20 15-29-31](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.4.gif)

##### 5、修改`redisCacheConfiguration`方法

重新修改`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyRedisCacheConfig`类的`redisCacheConfiguration`方法

每一步设置都会返回一个新的`RedisCacheConfiguration`，因此应该覆盖老的`config`。(参照`org.springframework.boot.autoconfigure.cache.RedisCacheConfiguration`类的`determineConfiguration`方法的做法)

```java
package com.atguigu.gulimall.product.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author 无名氏
 * @date 2022/7/20
 * @Description:
 */
@Configuration
@EnableCaching
public class MyRedisCacheConfig {

    @Bean
    RedisCacheConfiguration redisCacheConfiguration(){
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        config = config.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()));
        config = config.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return config;
    }

}
```

![image-20220720160907935](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.5.png)

##### 6、再次测试

删掉以前的在`redis`里的`category（1）`数据，刷新 http://localhost:10000/ 页面，在新生成的`category（1）`可以看到，这次成功返回了`JSON`数据，但是`TTL`为`-1`

![GIF 2022-7-20 16-08-11](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.6.gif)

##### :pencil: `JSON`序列化

进入`org.springframework.data.redis.serializer.RedisSerializer`，然后按`ctrl+H`查看其子类，可以看到有`String`类型和`Json`类型的序列化方式，`spring`框架提供的`org.springframework.data.redis.serializer.StringRedisSerializer` ，`spring`框架提供的`org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer`，阿里提供的`com.alibaba.fastjson.support.spring.GenericFastJsonRedisSerializer`，带了`Generic`的可以兼容任意类型，因此需要选择带`Generic`的

![image-20220720153113504](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.6.7.png)

#### 7、读取`yml`数据

##### 1、查看如何把不能修改的类注入容器

之所以`ttl`为`-1`，是因为`org.springframework.boot.autoconfigure.cache.RedisCacheConfiguration`类的`determineConfiguration`方法，首先会判断`org.springframework.data.redis.cache.RedisCacheConfiguration`是否存在，如果存在，则直接返回，根本不会走下面的逻辑，因此可以直接复制后面序列化后的代码

```java
private org.springframework.data.redis.cache.RedisCacheConfiguration determineConfiguration(
      ClassLoader classLoader) {
   if (this.redisCacheConfiguration != null) {
      return this.redisCacheConfiguration;
   }
   Redis redisProperties = this.cacheProperties.getRedis();
   org.springframework.data.redis.cache.RedisCacheConfiguration config = org.springframework.data.redis.cache.RedisCacheConfiguration
         .defaultCacheConfig();
   config = config.serializeValuesWith(
         SerializationPair.fromSerializer(new JdkSerializationRedisSerializer(classLoader)));
   if (redisProperties.getTimeToLive() != null) {
      config = config.entryTtl(redisProperties.getTimeToLive());
   }
   if (redisProperties.getKeyPrefix() != null) {
      config = config.prefixKeysWith(redisProperties.getKeyPrefix());
   }
   if (!redisProperties.isCacheNullValues()) {
      config = config.disableCachingNullValues();
   }
   if (!redisProperties.isUseKeyPrefix()) {
      config = config.disableKeyPrefix();
   }
   return config;
}
```

![image-20220720161252722](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.1.1.png)

~~由于`org.springframework.boot.autoconfigure.cache.CacheProperties`类没有放入`ioc`容器中，因此我们不能直接获取~~

其实注入进去了，`@ConfigurationProperties(prefix = "spring.redis")`注解指明当前`RedisProperties`类与配置文件的`spring.redis`绑定，但不会把该`RedisProperties`类注入到`ioc`容器，可以在本类(`RedisProperties`类)使用`@Component`注解把该类放入到`ioc`容器中，但是如果在不能修改源码的情况下，还可以使用`@EnableConfigurationProperties(RedisProperties.class)`注解，把`RedisProperties`类放入到`ioc`容器中

![image-20220720161550757](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.1.2.png)

可以看到`org.springframework.boot.autoconfigure.data.redis`包的`RedisAutoConfiguration`类，使用`@EnableConfigurationProperties(RedisProperties.class)`绑定了本包下的`RedisProperties`类，该注解(`@EnableConfigurationProperties(RedisProperties.class)`注解)会把`RedisProperties`类放到`ioc`容器中

(如果只使用`@EnableConfigurationProperties`注解，不指明具体的类，则不会把`RedisProperties`类放到`ioc`容器中)

![image-20220723102142594](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.1.3.png)

因此,可以参照`org.springframework.boot.autoconfigure.cache.RedisCacheConfiguration`类的写法

```java
@Configuration
@ConditionalOnClass(RedisConnectionFactory.class)
@AutoConfigureAfter(RedisAutoConfiguration.class)
@ConditionalOnBean(RedisConnectionFactory.class)
@ConditionalOnMissingBean(CacheManager.class)
@Conditional(CacheCondition.class)
class RedisCacheConfiguration {

   private final CacheProperties cacheProperties;

   private final CacheManagerCustomizers customizerInvoker;

   private final org.springframework.data.redis.cache.RedisCacheConfiguration redisCacheConfiguration;

   RedisCacheConfiguration(CacheProperties cacheProperties, CacheManagerCustomizers customizerInvoker,
         ObjectProvider<org.springframework.data.redis.cache.RedisCacheConfiguration> redisCacheConfiguration) {
      this.cacheProperties = cacheProperties;
      this.customizerInvoker = customizerInvoker;
      this.redisCacheConfiguration = redisCacheConfiguration.getIfAvailable();
   }
```

![image-20220720161334346](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.1.4.png)

##### 2、修改`MyRedisCacheConfig`类

用传参的方式使用`CacheProperties`（但是这种方式好像需要`CacheProperties`类在容器吧:disappointed_relieved:(亲测必须在容器内)，老师讲的好像有问题，如果`CacheProperties`没在容器，不能通过这种方式，这样能成功的原因是`CacheProperties`类在`ioc`容器里，而老师讲的是不在`ioc`容器中该怎么做)

```java
package com.atguigu.gulimall.product.config;

import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author 无名氏
 * @date 2022/7/20
 * @Description:
 */
@Configuration
@EnableCaching
public class MyRedisCacheConfig {

    @Bean
    RedisCacheConfiguration redisCacheConfiguration(CacheProperties cacheProperties){
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        config = config.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()));
        config = config.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        CacheProperties.Redis redisProperties = cacheProperties.getRedis();
        if (redisProperties.getTimeToLive() != null) {
            config = config.entryTtl(redisProperties.getTimeToLive());
        }
        if (redisProperties.getKeyPrefix() != null) {
            config = config.prefixKeysWith(redisProperties.getKeyPrefix());
        }
        if (!redisProperties.isCacheNullValues()) {
            config = config.disableCachingNullValues();
        }
        if (!redisProperties.isUseKeyPrefix()) {
            config = config.disableKeyPrefix();
        }
        return config;
    }

}
```

![image-20220720161738193](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.2.1.png)

如果`CacheProperties`不在`ioc`容器，这才是正确的做法(当然最好不要直接通过`@Autowired`注入，最好通过传参的方式注入)

或者可以学习`org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration`类的做法在类上加上`@EnableConfigurationProperties(CacheProperties.class)`注解(我试了以下，不加``@EnableConfigurationProperties(CacheProperties.class)`注解`，直接注入也可以用)

```java
package com.atguigu.gulimall.product.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * @author 无名氏
 * @date 2022/7/20
 * @Description:
 */
@EnableConfigurationProperties(CacheProperties.class)
@Configuration
@EnableCaching
public class MyRedisCacheConfig {

    @Autowired
    CacheProperties cacheProperties;

    @Bean
    RedisCacheConfiguration redisCacheConfiguration(){
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig();
        config = config.serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()));
        config = config.serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        CacheProperties.Redis redisProperties = cacheProperties.getRedis();
        if (redisProperties.getTimeToLive() != null) {
            config = config.entryTtl(redisProperties.getTimeToLive());
        }
        if (redisProperties.getKeyPrefix() != null) {
            config = config.prefixKeysWith(redisProperties.getKeyPrefix());
        }
        if (!redisProperties.isCacheNullValues()) {
            config = config.disableCachingNullValues();
        }
        if (!redisProperties.isUseKeyPrefix()) {
            config = config.disableKeyPrefix();
        }
        return config;
    }

}
```

![image-20220720162428178](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.2.2.png)

##### 3、测试

删掉以前的在`redis`里的`category（1）`数据，刷新 http://localhost:10000/ 页面，在新生成的`category（1）`可以看到，这次成功返回了`JSON`数据，`ttl`也是指定的过期时间了

![GIF 2022-7-20 16-19-09](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.3.1.gif)

数据的格式：

![image-20220720163602260](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.7.3.2.png)

##### `EnableConfigurationProperties`参考文档

`EnableConfigurationProperties`注解参考文档： https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/context/properties/EnableConfigurationProperties.html

> **Annotation Type EnableConfigurationProperties**
>
> ------
>
> ```java
> @Target(value=TYPE)
> @Retention(value=RUNTIME)
> @Documented
> @Import(value=org.springframework.boot.context.properties.EnableConfigurationPropertiesRegistrar.class)
> public @interface EnableConfigurationProperties
> ```
>
> Enable support for [`@ConfigurationProperties`](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/context/properties/ConfigurationProperties.html) annotated beans. `@ConfigurationProperties` beans can be registered in the standard way (for example using [`@Bean`](https://docs.spring.io/spring-framework/docs/5.3.22/javadoc-api/org/springframework/context/annotation/Bean.html?is-external=true) methods) or, for convenience, can be specified directly on this annotation.

详细使用说明： https://docs.spring.io/spring-boot/docs/2.1.3.RELEASE/reference/html/boot-features-external-config.html#boot-features-external-config-typesafe-configuration-properties

```java
package com.example;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("acme")
public class AcmeProperties {

  private boolean enabled;

  private InetAddress remoteAddress;

  private final Security security = new Security();

  public boolean isEnabled() { ... }

  public void setEnabled(boolean enabled) { ... }

  public InetAddress getRemoteAddress() { ... }

  public void setRemoteAddress(InetAddress remoteAddress) { ... }

  public Security getSecurity() { ... }

  public static class Security {

    private String username;

    private String password;

    private List<String> roles = new ArrayList<>(Collections.singleton("USER"));

    public String getUsername() { ... }

    public void setUsername(String username) { ... }

    public String getPassword() { ... }

    public void setPassword(String password) { ... }

    public List<String> getRoles() { ... }

    public void setRoles(List<String> roles) { ... }

  }
}
```

The preceding POJO defines the following properties:

- `acme.enabled`, with a value of `false` by default.
- `acme.remote-address`, with a type that can be coerced from `String`.
- `acme.security.username`, with a nested "security" object whose name is determined by the name of the property. In particular, the return type is not used at all there and could have been `SecurityProperties`.
- `acme.security.password`.
- `acme.security.roles`, with a collection of `String`.

You also need to list the properties classes to register in the `@EnableConfigurationProperties` annotation, as shown in the following example:

```java
@Configuration
@EnableConfigurationProperties(AcmeProperties.class)
public class MyConfiguration {
}
```

------

Even if the preceding configuration creates a regular bean for `AcmeProperties`, we recommend that `@ConfigurationProperties` only deal with the environment and, in particular, does not inject other beans from the context. Having said that, the `@EnableConfigurationProperties` annotation is *also* automatically applied to your project so that any *existing* bean annotated with `@ConfigurationProperties` is configured from the `Environment`. You could shortcut `MyConfiguration` by making sure `AcmeProperties` is already a bean, as shown in the following example:

```java
@Component
@ConfigurationProperties(prefix="acme")
public class AcmeProperties {

  // ... see the preceding example

}
```

This style of configuration works particularly well with the `SpringApplication` external YAML configuration, as shown in the following example:

```yaml
# application.yml

acme:
  remote-address: 192.168.1.1
  security:
    username: admin
    roles:
      - USER
      - ADMIN

# additional configuration as required
```

To work with `@ConfigurationProperties` beans, you can inject them in the same way as any other bean, as shown in the following example:

```java
@Service
public class MyService {

  private final AcmeProperties properties;

  @Autowired
  public MyService(AcmeProperties properties) {
      this.properties = properties;
  }

  //...

  @PostConstruct
  public void openConnection() {
    Server server = new Server(this.properties.getRemoteAddress());
    // ...
  }

}
```

#### 8、可选配置

##### 1、`cache-null-value`是否缓存空值

在`gulimall-product`模块的`src/main/resources/application.properties`配置文件中，配置`spring.cache.redis.cache-null-values=true`，设置缓存空值

```properties
#缓存的类型
spring.cache.type=redis

#缓存的名字
#如果配置了缓存的名字，则只能使用这些名字
#系统中用到哪些缓存了，帮你创建出来
#spring.cache.cache-names=qq,qqq
spring.cache.redis.time-to-live=3600000
#如果指定了前缀就用我们指定的前缀，如果没有就默认使用缓存的名字作为前缀
spring.cache.redis.key-prefix=CACHE_
#是否开启前缀
spring.cache.redis.use-key-prefix=true
#是否缓存空值，防止缓存穿透
spring.cache.redis.cache-null-values=true
```

![image-20220720163351170](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.1.1.png)

将`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`getLevel1Categories`方法的返回值设置为`null`

![image-20220720163452069](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.1.2.png)

删掉以前的在`redis`里的`category（1）`数据，刷新 http://localhost:10000/ 页面，在新生成的`category（1）`可以看到，空值也缓存了

![GIF 2022-7-20 16-38-33](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.1.3.gif)

##### 2、`use-key-prefix`是否开启前缀

在`gulimall-product`模块的`src/main/resources/application.properties`配置文件中，配置`spring.cache.redis.use-key-prefix=false`，设置不使用前缀

```properties
#缓存的类型
spring.cache.type=redis

#缓存的名字
#如果配置了缓存的名字，则只能使用这些名字
#系统中用到哪些缓存了，帮你创建出来
#spring.cache.cache-names=qq,qqq
spring.cache.redis.time-to-live=3600000
#如果指定了前缀就用我们指定的前缀，如果没有就默认使用缓存的名字作为前缀
spring.cache.redis.key-prefix=CACHE_
#是否开启前缀
spring.cache.redis.use-key-prefix=false
#是否缓存空值，防止缓存穿透
spring.cache.redis.cache-null-values=true
```

![image-20220720163957315](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.2.1.png)

删掉以前的在`redis`里的`category（1）`数据，刷新 http://localhost:10000/ 页面，在新生成的`category（1）`可以看到，直接把注解里设置的`key`作为`redis`里面的`key`而不加`自定义前缀`或`默认前缀`了

![GIF 2022-7-20 16-42-54](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.2.2.gif)

##### 3、测试完后，修改为最初配置

在`gulimall-product`模块的`src/main/resources/application.properties`配置文件中，修改为最初配置

```properties
#缓存的类型
spring.cache.type=redis

#缓存的名字
#如果配置了缓存的名字，则只能使用这些名字
#系统中用到哪些缓存了，帮你创建出来
#spring.cache.cache-names=qq,qqq
#以`ms`(毫秒)为单位
spring.cache.redis.time-to-live=3600000
#如果指定了前缀就用我们指定的前缀，如果没有就默认使用缓存的名字作为前缀
#spring.cache.redis.key-prefix=CACHE_
#是否开启前缀
spring.cache.redis.use-key-prefix=true
#是否缓存空值，防止缓存穿透
spring.cache.redis.cache-null-values=true
```

![image-20220720165738274](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.3.1.png)

将`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`getLevel1Categories`方法的返回值设置为`categoryEntities`

![image-20220720165749301](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.8.3.2.png)

#### 9、常用注解(2)

##### 1、`@CacheEvict`

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里的`updateCascade`方法上添加`@CacheEvict(value = {"category"}, key = "'level1Categories'")`注解，表示使用`失效模式`（即删除指定的数据）

![image-20220720171836317](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.1.1.png)

使用`npm run dev`启动前端项目，账号密码都是`admin`。

启动后台的`GulimallGatewayApplication`服务、`GulimallProductApplication`服务、`RenrenApplication`服务

删除`redis`里`key`为`level1Categories`的数据，刷新`http://localhost:10000/`页面，可以看到在`redis`里已经有`key`为`CACHE_level1Categories`的数据了

访问`http://localhost:8001/`网址，打开后台页面，在`商品系统/分类维护`，修改`手机`的`图标`信息，可以看到在`redis`里`key`为`CACHE_level1Categories`的数据已经被删除了

![GIF 2022-7-20 17-15-42](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.1.2.gif)

##### 2、重写`getCatalogJson`方法

将`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`getCatalogJson`方法重命名为`getCatalogJson2`，然后重新写一个`getCatalogJson`方法，添加`@Cacheable(value = "category",key = "#root.methodName")`注解，指定`key`为方法名

```java
@Cacheable(value = "category",key = "#root.methodName")
@Override
public Map<String, List<Catelog2Vo>> getCatalogJson() {
    System.out.println("查询了数据库......");
    //一次查询所有
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(null);
    //1、查出所有一级分类
    List<CategoryEntity> level1Categories = this.getLevel1Categories();
    Map<String, List<Catelog2Vo>> result = level1Categories.stream().collect(Collectors.toMap(k -> k.getCatId().toString(), l1 -> {
        //2、该一级分类的所有二级分类
        List<CategoryEntity> category2Entities = getCategoryEntities(categoryEntities, l1);
        List<Catelog2Vo> catelog2VoList = null;
        if (category2Entities != null) {
            catelog2VoList = category2Entities.stream().map(l2 -> {
                Catelog2Vo catelog2Vo = new Catelog2Vo();
                catelog2Vo.setCatalog1Id(l1.getCatId().toString());
                catelog2Vo.setId(l2.getCatId().toString());
                catelog2Vo.setName(l2.getName());
                //3、当前二级分类的所有三级分类
                List<CategoryEntity> category3Entities = getCategoryEntities(categoryEntities, l2);
                List<Catelog2Vo.Catelog3Vo> catelog3VoList = null;
                if (category3Entities != null) {
                    catelog3VoList = category3Entities.stream().map(l3 -> {
                        Catelog2Vo.Catelog3Vo catelog3Vo = new Catelog2Vo.Catelog3Vo();
                        catelog3Vo.setId(l3.getCatId().toString());
                        catelog3Vo.setName(l3.getName());
                        catelog3Vo.setCatalog2Id(l2.getCatId().toString());
                        return catelog3Vo;
                    }).collect(Collectors.toList());
                }
                catelog2Vo.setCatalog3List(catelog3VoList);
                return catelog2Vo;
            }).collect(Collectors.toList());
        }
        return catelog2VoList;
    }));
    return result;
}
```

![image-20220720184549647](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.2.1.png)

删除`redis`里`key`为`CACHE_level1Categories`的数据，由于商城首页会调用`getCatalogJson`方法，因此可以刷新`http://gulimall.com/`页面，可以看到在`redis`里已经有`key`为`CACHE_getCatalogJson`的数据了

![GIF 2022-7-20 18-43-13](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.2.2.png)

##### 3、批量删除数据

**方法一：**

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`updateCascade`上添加如下注解，执行两个删除语句

```java
/**
 * 级联更新所有的数据
 *@CacheEvict: 失效模式
 * @param category
 */
@Caching(evict = {
        @CacheEvict(value = {"category"}, key = "'level1Categories'"),
        @CacheEvict(value = {"category"}, key = "'getCatalogJson'")
}
)
@Transactional
@Override
public void updateCascade(CategoryEntity category) {
    this.updateById(category);
    categoryBrandRelationService.updateCategory(category);
}
```

![image-20220720185106905](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.3.1.1.png)

删除`redis`里`key`为`CACHE_level1Categories`和`catalogJson`的数据，由于商城首页会调用`getCatalogJson`和`getLevel1Categories`方法，因此可以刷新`http://gulimall.com/`页面，可以看到在`redis`里已经有`key`为`CACHE_getCatalogJson`和`CACHE_level1Categories`的数据了，，在`商品系统/分类维护`，修改`手机`的`图标`信息，可以看到在`redis`里`key`为`CACHE_getCatalogJson`和`CACHE_level1Categories`的数据已经被删除了

![GIF 2022-7-20 18-57-47](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.3.1.2.gif)

**方法二：**

`@CacheEvict`注解的`allEntries = true`属性可以把该分区的所有数据都删除，这样也可以达到批量删除数据的目的

```java
/**
 * 级联更新所有的数据
 *@CacheEvict: 失效模式
 * @Caching: 批量操作
 * @CacheEvict(value = {"category"},allEntries = true) 删除该分区的所有数据
 * @param category
 */
//@Caching(evict = {
//        @CacheEvict(value = {"category"}, key = "'level1Categories'"),
//        @CacheEvict(value = {"category"}, key = "'getCatalogJson'")
//})
@CacheEvict(value = {"category"},allEntries = true)
@Transactional
@Override
public void updateCascade(CategoryEntity category) {
    this.updateById(category);
    categoryBrandRelationService.updateCategory(category);
}
```

![image-20220720190209669](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.3.2.png)

##### 4、不指定`key-prefix`

把`spring.cache.redis.key-prefix=CACHE_`注释掉

```properties
#缓存的类型
spring.cache.type=redis

#缓存的名字
#如果配置了缓存的名字，则只能使用这些名字
#系统中用到哪些缓存了，帮你创建出来
#spring.cache.cache-names=qq,qqq
spring.cache.redis.time-to-live=3600000
#如果指定了前缀就用我们指定的前缀，如果没有就默认使用缓存的名字作为前缀
#spring.cache.redis.key-prefix=CACHE_
#是否开启前缀
spring.cache.redis.use-key-prefix=true
#是否缓存空值，防止缓存穿透
spring.cache.redis.cache-null-values=true
```

![image-20220720190805585](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.4.1.png)

重新刷新`http://gulimall.com/`页面，可以看到不指定前缀后，会生成名为`分区名`的文件夹，在该文件夹内存放该分区的数据，这样显得更有层级关系

![GIF 2022-7-20 19-13-46](https://gitlab.com/apzs/image/-/raw/master/image/5.4.4.9.4.2.gif)

##### 5、双写模式

如果想使用双写模式，可以使用`@CachePut`注解，由于该方法没有返回值，所以用不了双写模式，这里就不演示了，大概结构如下

`@CachePut(value = {"category"}, key = "'level1Categories'")`

```java
@CachePut(value = {"category"}, key = "'level1Categories'")
@Transactional
@Override
public Object updateCascade(CategoryEntity category) {
    this.updateById(category);
    return categoryBrandRelationService.updateCategory(category);
}
```



#### 10  172

4、Spring-Cache的不 足;
1)、读模式:
缓存穿透:查询一个null数据。解决:缓存空数据; `spring.cache.redis.cache-null-values=true`
缓存击穿:大量并发进来同时查询一一个正好过期的数据。解决:加锁; ? `@Cacheable(value = {"category"}, key = "'level1Categories'",sync = true)` 只有`@Cacheable`注解可以加锁
缓存雪崩:大量的key同时过期。解决:加随机时间。（加随机时间有可能弄巧成拙，本来是2s、1s时间过期，加随机时间变为`2s+2s=4s`、`1s+3s=4s`时间过期） `spring.cache.redis.time-to-live=3600000`

2)、写模式: (缓存与数据库一 致)
1)、读写加锁。
2)、引入Canal,感知到MySQL的更新去更新数据库
3)、读多写多，直接去数据库查询就行

总结:
常规数据(读多写少，即时性，- 致性要求不高的数据) ;完全可以使用Spring-Cache(只要缓存的数据有过期时间就足够了):
特殊数据:特殊设计

## 5.5、商城业务-检索服务

### 5.5.1、初始化

#### 1、添加配置

##### 1、引入依赖

在`gulimall-search`模块的`pom.xml`文件里引入`thymeleaf`依赖和`devtools`依赖

```xml
<!--引入thymeleaf-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
<!--引入devtools-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-devtools</artifactId>
   <optional>true</optional>
</dependency>
```

![image-20220720210415704](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.1.1.png)

##### 2、关闭缓存

在`gulimall-search`模块的`src/main/resources/application.properties`配置文件里配置关闭缓存

![image-20220720210556603](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.1.2.png)

##### 3、导入`index.html`

在资料里的`2.分布式高级篇（微服务架构篇\资料源码\代码\html\搜索页`文件夹下，复制`index.html`文件，粘贴到`gulimall-search`模块的`src/main/resources/templates`目录下

![GIF 2022-7-20 19-37-45](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.1.3.gif)

##### 4、导入静态资源到`nginx`

在资料里的`D:\尚硅谷\谷粒商城\2.分布式高级篇（微服务架构篇）\资料源码\代码\html\搜索页`文件夹下，复制所有文件夹(除`index.html`)，在虚拟机的`/mydata/nginx/html/static/`目录下，新建`search`文件夹。 粘贴到虚拟机里的 `/mydata/nginx/html/static/search`目录下

![GIF 2022-7-20 20-46-29](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.1.4.gif)

##### 5、修改`index.html`

修改`gulimall-search`模块的`src/main/resources/templates/index.html`文件，使所有静态文件都访问`nigix`

[点击查看`index.html`完整代码](code/5.5.1.1.5.index.html)

![image-20220724100623230](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.1.5.png)

##### 6、访问检索页

启动`GulimallSearchApplication`服务，访问： http://localhost:12000/

可以看到可以获得数据，但没有访问到静态资源

![image-20220720201949003](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.1.6.png)

#### 2、`首页`通过检索跳转到`检索页`

##### 1、在首页中检索

在首页中检索时，应该来到`search.gulimall.com`，但此时无法访问，是因为`search.gulimall.com`域名没有配置

![GIF 2022-7-20 20-25-47](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.2.1.gif)

##### 2、`Host`文件添加域名

在`SwitchHosts`工具里，编辑`本地方案/gulimall`，然后点击`对勾`，应用此方案

```properties
# gulimall
192.168.56.10 gulimall.com
192.168.56.10 search.gulimall.com
```

![image-20220720202806012](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.2.2.png)

##### 3、再次测试

在首页中检索后，来到了`nginx`配置的默认首页，此时`http://search.gulimall.com/`域名下的`Host`为`search.gulimall.com`

![image-20220720203018405](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.2.3.png)

#### 3、修改`search.gulimall.com`配置

##### 1、修改`gulimall.conf`文件

执行以下命令，修改`/mydata/nginx/conf/conf.d/gulimall.conf`文件，并重启`nginx`

```bash
cd /mydata/nginx
ls
cd conf/
ls
cd conf.d/
ls
vi gulimall.conf
docker restart nginx
docker ps
```

![image-20220720203705064](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.3.1.1.png)

将`server_name  gulimall.com;`修改为`server_name  *.gulimall.com;` 

![image-20220720203443206](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.3.1.2.png)

##### 2、访问到了首页

访问 http://search.gulimall.com/ ，可以看到来到了首页，而不是检索页

![image-20220720203821469](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.3.2.png)

##### 3、修改`gateway`配置

在`gulimall-gateway`模块的`src/main/resources/application.yml`文件里，修改id为` gulimall_host_route`的配置，并添加id为` gulimall_search_route`的配置

然后重启`GulimallGatewayApplication`服务

```yaml
- id: gulimall_host_route
  uri: lb://gulimall-product
  predicates:
    - Host=gulimall.com

- id: gulimall_search_route
  uri: lb://gulimall-search
  predicates:
    - Host=search.gulimall.com
```

![image-20220720205136681](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.3.3.png)

##### 4、访问的检索页

访问 http://search.gulimall.com/  ，这次来到了检索页

![image-20220720205237222](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.3.4.1.png)

有几个文件没有找到不用管，本来就没有

![image-20220720205803381](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.3.4.2.png)

#### 4、`Nginx转发效果`

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.4.png" alt="image-20220720205507777" style="zoom: 50%;" />

#### 5、点击`logo`返回首页

##### 1、查看`logo`所在标签

在  http://search.gulimall.com/  页面里，打开控制台，定位到`logo`，复制`src="/static/search/./image/logo1.jpg"`

![image-20220720211104053](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.5.1.png)

##### 2、修改该标签

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里搜索刚刚复制的内容

把该`a标签`的`href`修改为`"http://gulimall.com`，使其访问首页

```html
<a href="http://gulimall.com"><img src="/static/search/./image/logo1.jpg" alt=""></a>
```

![image-20220720211434554](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.5.2.png)

##### 3、测试

重启`GulimallSearchApplication`服务，在  http://search.gulimall.com/  页面里，点击`logo`，可以看到跳转到了`nginx`的默认首页

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.5.3.gif" alt="GIF 2022-7-20 21-15-25" style="zoom:67%;" />

##### 4、修改`nginx`配置

进入虚拟机的`/mydata/nginx/conf/conf.d/gulimall.conf`文件，修改配置，然后重启`nginx`

```bash
cd /mydata/nginx/conf/conf.d/
vi gulimall.conf
docker restart nginx
```

进入`gulimall.conf`后，把

```properties
server_name  *.gulimall.com;
```

修改为(`gulimall.com`和`*.gulimall.com;`中间有空格)

```properties
server_name  gulimall.com *.gulimall.com;
```

![image-20220720212048919](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.5.4.png)

##### 5、再次测试

![GIF 2022-7-22 15-02-08](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.5.5.gif)

#### 6、点击`谷粒商城首页`返回首页

##### 1、查看`谷粒商城首页`所在标签

在  http://search.gulimall.com/  页面里，打开控制台，定位到`谷粒商城首页`，复制`谷粒商城首页`

![image-20220722145830936](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.6.1.png)

##### 2、修改该标签

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里搜索刚刚复制的内容

把该`a标签`的`href`修改为`"http://gulimall.com`，使其访问首页

```html
<a href="http://gulimall.com" class="header_head_p_a1" style="width:73px;">
    谷粒商城首页
</a>
```

![image-20220722150037921](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.6.2.png)

##### 3、测试

![GIF 2022-7-24 10-59-14](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.6.3.gif)

#### 7、`首页`通过分类跳转到`检索页`

##### 1、测试

在 http://gulimall.com/ 首页里，在左侧的导航栏里，鼠标悬浮到`手机`，在`手机通讯`里点击`手机`，可以看到来到了

http://search.gmall.com/list.html?catalog3Id=225 ，而不是 http://search.gulimall.com/list.html?catalog3Id=225

![GIF 2022-7-22 15-18-20](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.7.1.gif)

##### 2、修改`catalogLoader.js`

修改虚拟机里`/mydata/nginx/html/static/index/js`下的`catalogLoader.js`，搜索`gmall`，把`gmall`修改为`gulimall`，然后重启`nginx`

![GIF 2022-7-20 21-33-03](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.7.2.gif)

##### 3、再次测试

先清除浏览器的缓存，再在 http://gulimall.com/ 首页里，在左侧的导航栏里，鼠标悬浮到`手机`，在`手机通讯`里点击`手机`，可以看到来到了  http://search.gulimall.com/list.html?catalog3Id=225

![GIF 2022-7-20 21-36-27](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.7.3.gif)

#### 8、通过`list.html`访问检索页

##### 1、关闭`thymeleaf`缓存

在`gulimall-search`模块的`src/main/resources/application.yml`配置文件里，关闭`thymeleaf`缓存

```yaml
spring:
  thymeleaf:
    #关闭thymeleaf缓存
    cache: false
```

![image-20220722145204078](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.8.1.png)

##### 2、`index.html`重命名为`list.html`

将`gulimall-search`模块的`src/main/resources/templates/index.html`重命名为`list.html`

![GIF 2022-7-22 15-09-31](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.8.2.gif)

##### 3、添加`listPage`方法

在`gulimall-search`模块的`com.atguigu.gulimall.search.controller.SearchController`类里添加`listPage`方法，跳转到`list.html`页面

```java
package com.atguigu.gulimall.search.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 无名氏
 * @date 2022/7/22
 * @Description:
 */
@Controller
public class SearchController {

    @RequestMapping("/list.html")
    public String listPage(){
        return "list";
    }
}
```

![image-20220722153722746](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.8.3.png)

##### 4、测试

在 http://gulimall.com/ 首页里，在左侧的导航栏里，鼠标悬浮到`手机`，在`手机通讯`里点击`手机`，可以看到来到了  http://search.gulimall.com/list.html?catalog3Id=225 并成功访问到页面

![GIF 2022-7-22 15-25-39](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.8.4.gif)

#### 9、`首页`通过检索跳转到了`search.html`

##### 1、检索跳转到了`search.html`

在 http://gulimall.com/ 里，通过搜索，跳转到了  http://search.gulimall.com/search.html?keyword=111 而不是 http://search.gulimall.com/list.html?keyword=111

![GIF 2022-7-22 15-28-44](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.1.gif)

##### 2、查找`搜索`所在标签

在 http://gulimall.com/ 里，打开控制台，找到`搜索`图标，复制`search()`

![image-20220722153047210](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.2.png)

##### 3、修改跳转的路径

在`gulimall-search`模块的`src/main/resources/templates/list.html`页面里搜索刚刚复制的内容

修改`script`里的` window.location.href="http://search.gulimall.com/search.html?keyword="+keyword;`为以下内容

```html
<script type="text/javascript">
  function search() {
    var keyword=$("#searchText").val()
    window.location.href="http://search.gulimall.com/list.html?keyword="+keyword;
  }

</script>
```

![image-20220722153411321](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.3.png)

##### 4、修改不生效

重启`gulimall-product`服务，在 http://gulimall.com/ 里，通过搜索，跳转到了  http://search.gulimall.com/search.html?keyword=111 而不是 http://search.gulimall.com/list.html?keyword=111 很明显配置没生效

![GIF 2022-7-22 15-32-40](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.4.gif)

##### 5、关闭`thymeleaf`缓存

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件里，关闭`thymeleaf`缓存

![image-20220722153254270](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.5.png)

##### 6、再次测试

重启`GulimallProductApplication`服务，在 http://gulimall.com/ 里，通过搜索，成功跳转到了 http://search.gulimall.com/list.html?keyword=111

![GIF 2022-7-22 15-35-30](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.6.gif)



在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里。如果不行的话，可以在`a`标签里调`javascript`的代码

```html
<a href="javascript:search();" ><img src="/static/index/img/img_09.png" /></a>
```

![image-20220722154519044](https://gitlab.com/apzs/image/-/raw/master/image/5.5.1.9.7.png)


### 5.5.2、编写检索数据代码

##### 1、新建`SearchParam`类

在`gulimall-search`模块里，在`com.atguigu.gulimall.search`包下新建`vo`文件夹，在`vo`文件夹下新建`SearchParam`类

用来获取`查询商品请求`的数据参数

```java
package com.atguigu.gulimall.search.vo;

import lombok.Data;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/22
 * @Description: 封装可能的所有的查询条件
 *  catalog3Id=225&keyword=小米&sort=saleCount_asc&hasStock=0/1
 */
@Data
public class SearchParam {

    /**
     * 页面传过来的全文匹配的关键字
     * keyword=小米
     */
    private String keyword;

    /**
     * 三级分类的id
     * catalog3Id=225
     */
    private Long catalog3Id;

    /**
     * 排序条件
     * 按照销量升序或降序     sort=saleCount_asc/desc
     * 按照sku价格升序或降序  sort=skuPrice_asc/desc
     * 按照热度评分升序或降序  sort=hotScore_asc/desc
     */
    private String sort;

    /**
     * 品牌的id(可以指定多个品牌)
     * brandId=1&brandId=2
     */
    private List<Long> brandId;

    /**
     * 是否有货(是否只显示有货)
     * hasStock=0/1
     */
    private Integer hasStock;

    /**
     * 价格区间
     * 价格在1~500之间  skuPrice=1_500
     * 价格不高于500    skuPrice=_500
     * 价格不低于1      skuPrice=1_
     */
    private String skuPrice;

    /**
     * 指定属性
     * attrs=1_安卓:其他&attrs=2_5寸:6寸
     *
     * 1号属性(系统)值为 `安卓`或`其他`
     * 2号属性(屏幕尺寸)值为 `5寸`或`6寸`
     */
    private List<String> attrs;

    /**
     * 页码
     */
    private Integer pageNum;

}
```

![image-20220722163637498](https://gitlab.com/apzs/image/-/raw/master/image/5.5.2.1.png)

##### 2、新建`SearchResult`类

在`gulimall-search`模块的`com.atguigu.gulimall.search.vo`包下新建`SearchResult`类，用来封装`查询商品请求`所响应的数据

```java
package com.atguigu.gulimall.search.vo;

import com.atguigu.common.to.es.SkuEsModel;
import lombok.Data;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/22
 * @Description: 根据查询条件返回的结果
 */
@Data
public class SearchResult {

    /**
     * 查询到的所有商品信息
     */
    private List<SkuEsModel> products;

    /**
     * 当前页码
     */
    private Integer pageNum;

    /**
     * 总记录数
     */
    private Long total;

    /**
     * 总页码
     */
    private Integer totalPages;

    /**
     * 当前查询到的结果涉及到的所有品牌
     */
    private List<BrandVo> brands;

    /**
     * 当前查询到的结果涉及到的所有分类
     */
    private List<CatalogVo> catalogs;

    /**
     *  当前查询到的结果涉及到的所有属性
     */
    private List<AttrVo> attrs;

    /**
     * 品牌vo
     */
    @Data
    public static class BrandVo{
        /**
         * 品牌id
         */
        private Long brandId;
        /**
         * 品牌名
         */
        private String brandName;
        /**
         * 品牌图片
         */
        private String brandImg;
    }

    /**
     * 分类vo
     */
    @Data
    public static class CatalogVo{
        /**
         * 分类id
         */
        private Long catalogId;
        /**
         * 分类名
         */
        private String catalogName;

    }

    /**
     * 属性vo
     */
    @Data
    public static class AttrVo{
        /**
         * 属性的id
         */
        private Long attrId;
        /**
         * 属性名
         */
        private String attrName;
        /**
         * 属性值
         */
        private List<String> attrValue;

    }
}
```

![image-20220722170225469](https://gitlab.com/apzs/image/-/raw/master/image/5.5.2.2.png)

##### 3、新建`MallSearchService`类

在`gulimall-search`模块里，在`com.atguigu.gulimall.search.service`包下新建`MallSearchService`接口

```java
package com.atguigu.gulimall.search.service;

import com.atguigu.gulimall.search.vo.SearchParam;
import com.atguigu.gulimall.search.vo.SearchResult;

/**
 * @author 无名氏
 * @date 2022/7/22
 * @Description:
 */
public interface MallSearchService {

    /**
     * 查询商品
     * @param searchParam 检索的参数
     * @return 根据检索的参数查询到的结果，包含页面需要的所有信息
     */
    public SearchResult search(SearchParam searchParam);
}
```

![image-20220722170144372](https://gitlab.com/apzs/image/-/raw/master/image/5.5.2.3.png)

##### 4、修改`listPage`方法

修改`gulimall-search`模块的`com.atguigu.gulimall.search.controller.SearchController`类的`listPage`方法

```java
@Autowired
MallSearchService mallSearchService;

/**
 * 自动将页面提交过来的所有请求查询参数封装成指定的对象
 * @return
 */
@RequestMapping("/list.html")
public String listPage(SearchParam searchParam, Model model){

    SearchResult result = mallSearchService.search(searchParam);
    model.addAttribute("result",result);
    return "list";
}
```

![image-20220722170844284](https://gitlab.com/apzs/image/-/raw/master/image/5.5.2.4.png)

### 5.5.3、测试请求`ES`格式

访问`kibana`： http://192.168.56.10:5601/

#### 1、`nested`嵌入式查询

`skuTitle`在`must`里，通过`skuTitle`来获取权重。其他在`filter`里，只做查询不设权重，以加快查询速度。

```json
GET product/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "skuTitle": "华为"
          }
        }
      ],
      "filter": [
        {
          "term": {
            "catalogId": "225"
          }
        },
        {
          "terms": {
            "brandId": [
              "1",
              "2",
              "9"
            ]
          }
        },
        {
          "nested": {
            "path": "attrs",
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "attrs.attrId": {
                        "value": "1"
                      }
                    }
                  },
                  {
                    "terms": {
                      "attrs.attrValue": [
                        "LIO-A00",
                        "A2100"
                      ]
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "term": {
            "hasStock": {
              "value": "true"
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "skuPrice": {
        "order": "desc"
      }
    }
  ]
}
```

![image-20220722191738587](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.1.1.png)

其中如果想查`attrs`里的属性(如`attrs.attrId`)，则必须先写`nested`，并指定`path`，然后通过`query`来进行查询

```json
GET product/_search
{
  "query": {
    "bool": {
      "filter": {
        "nested": {
          "path": "attrs",
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "attrs.attrId": {
                      "value": "1"
                    }
                  }
                },
                {
                  "terms": {
                    "attrs.attrValue": [
                      "LIO-A00",
                      "A2100"
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
}
```



参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/8.3/query-dsl-nested-query.html

> Nested query allows to query nested objects / docs (see [nested mapping](https://www.elastic.co/guide/en/elasticsearch/reference/0.90/mapping-nested-type.html)). The query is executed against the nested objects / docs as if they were indexed as separate docs (they are, internally) and resulting in the root parent doc (or parent nested mapping). Here is a sample mapping we will work with:
>
> ```js
> {
>     "type1" : {
>         "properties" : {
>             "obj1" : {
>                 "type" : "nested"
>             }
>         }
>     }
> }
> ```
>
> And here is a sample nested query usage:
>
> ```js
> {
>     "nested" : {
>         "path" : "obj1",
>         "score_mode" : "avg",
>         "query" : {
>             "bool" : {
>                 "must" : [
>                     {
>                         "match" : {"obj1.name" : "blue"}
>                     },
>                     {
>                         "range" : {"obj1.count" : {"gt" : 5}}
>                     }
>                 ]
>             }
>         }
>     }
> }
> ```
>
> The query `path` points to the nested object path, and the `query` (or `filter`) includes the query that will run on the nested docs matching the direct path, and joining with the root parent docs.
>
> The `score_mode` allows to set how inner children matching affects scoring of parent. It defaults to `avg`, but can be `total`, `max` and `none`.
>
> Multi level nesting is automatically supported, and detected, resulting in an inner nested query to automatically match the relevant nesting level (and not root) if it exists within another nested query.

![GIF 2022-7-24 18-45-46](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.1.2.gif)

#### 2、加入`range`查不出数据

在`filter`里加了个`range`就查不出数据了

```json
{
  "range": {
    "skuPrice": {
      "gte": 0,
      "lte": 6000
    }
  }
}
```

![image-20220722195006076](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.2.1.png)

删掉`range`，再次查询可以发现，数据里少了`skuPrice`这个属性，这是因为在`Elasticsearch`里，最初设置的`skuPrice`的属性类型为`double`，而`SkuEsModel`类里的`skuPrice`属性的类型为`BigDecimal`，`Elasticsearch`不能兼容这两个数据类型，~~因此要在`Elasticsearch`里，设置的`skuPrice`的属性类型为`keyword`~~ (在`Elasticsearch`里，~~设置的`skuPrice`的属性类型为`keyword`也不行~~，设置的`skuPrice`的属性类型为`keyword`可以，我代码里没有设置`skuImg`和`skuPrice`所以不行))

![image-20220722194900142](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.2.2.png)

完整查询：

```json
GET product/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "skuTitle": "华为"
          }
        }
      ],
      "filter": [
        {
          "term": {
            "catalogId": "225"
          }
        },
        {
          "terms": {
            "brandId": [
              "1",
              "2",
              "9"
            ]
          }
        },
        {
          "nested": {
            "path": "attrs",
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "attrs.attrId": {
                        "value": "1"
                      }
                    }
                  },
                  {
                    "terms": {
                      "attrs.attrValue": [
                        "LIO-A00",
                        "A2100"
                      ]
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "term": {
            "hasStock": {
              "value": "true"
            }
          }
        },
        {
          "range": {
            "skuPrice": {
              "gte": 0,
              "lte": 6000
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "skuPrice": {
        "order": "desc"
      }
    }
  ]
}
```

#### 3、数据迁移(不推荐)

**可以通过`数据迁移`(不推荐)，来增加`skuPrice`属性，但是后面还要修改数据，这次迁移后，还要再次迁移，可以先把`range`注释掉，最后再`数据迁移`**

##### 1、获取`product`映射

使用`GET product/_mapping`，获取`product`的映射信息，然后复制结果

```
GET product/_mapping
```

![image-20220723202123465](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.1.png)

##### 2、向`product2`创建映射

然后输入`PUT product2`，并粘贴刚刚复制的结果，再删除`粘贴过来的结果`里的`"product" :{ }`右括号随便在最后删除一个就行了

然后点击`工具`图标，选择`Auto indent`格式化一下代码，再在里面修改映射信息

这里需要把`skuPrice`里的`"type" : "double"`修改为`"type": "keyword"`

![image-20220723202738147](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.2.png)

完整代码：（`attrs`里面应该还有`"type" : "nested",`，最开始弄错了）

```json
PUT product
{
  "mappings": {
    "properties": {
      "attrs": {
        "type": "nested",
        "properties": {
          "attrId": {
            "type": "long"
          },
          "attrName": {
            "type": "keyword",
            "index": false,
            "doc_values": false
          },
          "attrValue": {
            "type": "keyword"
          }
        }
      },
      "brandId": {
        "type": "long"
      },
      "brandImg": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "brandName": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "catalogId": {
        "type": "long"
      },
      "catalogName": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "hasStock": {
        "type": "boolean"
      },
      "hotScore": {
        "type": "long"
      },
      "saleCount": {
        "type": "long"
      },
      "skuId": {
        "type": "long"
      },
      "skuImg": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "skuPrice": {
        "type": "keyword"
      },
      "skuTitle": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "spuId": {
        "type": "keyword"
      }
    }
  }
}
```

##### 3、写错后，可以通过`DELETE`删除

如果写错了可以使用`DELETE product2`删除，`product2`重新添加就行了

```
DELETE product2
```

![image-20220723203114440](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.3.png)

##### 4、迁移数据

然后使用如下命令，进行数据迁移

```json
POST _reindex
{
  "source": {
    "index": "product"
  },
  "dest": {
    "index": "product2"
  }
}
```

`POST _reindex`为固定写法，`source`里的`index`里写老数据的索引，`dest`写想要迁移到的索引

![image-20220723204346825](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.4.png)

##### 5、查询数据

使用`GET product2/_search`命令，查看数据，可以看到数据已经迁移过来了

```
GET product2/_search
```

![image-20220723204514369](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.5.png)

##### 6、添加`skuPrice`属性

使用如下方式，可以把匹配到的数据里，添加`skuPrice`属性

```json
POST /product2/_update_by_query
{
  "query": {
     "match_all": {}
  },
  "script": {
    "inline": "ctx._source['skuPrice'] = '5000'"
  }
}
```

![image-20220723205423193](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.6.png)

1.源生API

 在这里没有用官方提供的`bulk` API，而是用的另外一种方式。

```
POST /infomations/infomations/_update_by_query
JSON请求格式
{
    "query": {
        "match": {
            "status": "UP_SHELF"
        }
    },
    "script": {
        "inline": "ctx._source['status'] = 'DOWN_SHELF'"
    }
}
```



```
POST请求/索引/文档名/_update_by_query

主要看一下下面的script

ctx._source[字段名] = “值”;ctx._source[字段名] = “值”;
多个的话就用分号隔开。
```

2.JAVA API操作

```java
//集群模式，获取链接        
Client client = elasticsearchTemplate.getClient();        
UpdateByQueryRequestBuilder updateByQuery = UpdateByQueryAction.INSTANCE.newRequestBuilder(client);
String name = "修改数值";
updateByQuery.source("索引")         //查询要修改的结果集
.filter(QueryBuilders.termQuery("field", 412))         //修改操作 
.script(new Script( "ctx._source['field']='"+ name+"';ctx._source['field']='"+name+"'"));
//响应结果集        
BulkByScrollResponse response = updateByQuery.get();
long updated = response.getUpdated();
```

##### 7、查看数据

使用`GET product2/_search`命令，查看数据，可以看到已有`skuPrice`属性，并附上默认值了

```
GET product2/_search
```

![image-20220723205510858](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.7.png)

##### 8、再迁移回`product`

再通过相同的方式，删掉`product`，再迁移过来

```
DELETE product
```

![image-20220723210155470](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.8.1.png)

```
GET product2/_mapping
```

![image-20220723210322868](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.8.2.png)

这里的`attrs`里面应该还有`"type" : "nested",`，这里没有，所以后面报错了

![image-20220723210305651](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.8.3.png)



```
POST _reindex
{
  "source": {
    "index": "product2"
  },
  "dest": {
    "index": "product"
  }
}
```

![image-20220723210438315](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.8.4.png)

##### 9、查询出错

然后执行查询，可以发现执行出错了

![image-20220723213928183](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.9.1.png)

```
GET product/_mapping
```

这里的`attrs`里面应该还有`"type" : "nested",`

![image-20220723214306034](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.9.2.png)

##### 10、重新映射

删掉`product`

```
DELETE product
```

![image-20220724160104844](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.10.1.png)

重新映射

```json
PUT product
{
  "mappings": {
    "properties": {
      "attrs": {
        "type": "nested",
        "properties": {
          "attrId": {
            "type": "long"
          },
          "attrName": {
            "type": "keyword",
            "index": false,
            "doc_values": false
          },
          "attrValue": {
            "type": "keyword"
          }
        }
      },
      "brandId": {
        "type": "long"
      },
      "brandImg": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "brandName": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "catalogId": {
        "type": "long"
      },
      "catalogName": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "hasStock": {
        "type": "boolean"
      },
      "hotScore": {
        "type": "long"
      },
      "saleCount": {
        "type": "long"
      },
      "skuId": {
        "type": "long"
      },
      "skuImg": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "skuPrice": {
        "type": "keyword"
      },
      "skuTitle": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "spuId": {
        "type": "keyword"
      }
    }
  }
}
```

![image-20220724160201531](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.10.2.png)

这次有`attrs`属性有`"type": "nested",`了

![image-20220724161122333](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.10.3.png)

`skuPrice`的`type`也为`keyword`了

![image-20220724161159451](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.10.4.png)

##### 11、重新上架

打开`Navicat`软件，点击`gulimall_pms`数据库，打开`pms_spu_info`表，修改`华为`和`IPhone`的`publish_status`为`0`

![image-20220724155727408](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.11.1.png)

启动`Unnamed`，即启动`GulimallCouponApplication`、`GulimallGatewayApplication`、`GulimallMemberApplication`、`GulimallProductApplication`、`GulimallSearchApplication`、`GulimallThirdPartyApplication`、`GulimallWareApplication`、`RenrenApplication`，共8个服务(注意启动`nacos`)

![image-20220724155937981](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.11.2.png)

然后启动后台的`vue`项目，用户名和密码都为`admin`，在`商品系统/商品维护/spu管理`里点击`华为`和`IPhone`右侧`操作`里的`上架`按钮

![image-20220724161631575](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.11.3.png)

通过`kibana`查询数据，可以看到还是没有`skuPrice`属性

```
GET product/_search
```

![image-20220724161903319](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.11.4.png)

使用如下方式，可以把匹配到的数据里，添加`skuPrice`属性

```json
POST /product/_update_by_query
{
  "query": {
     "match_all": {}
  },
  "script": {
    "inline": "ctx._source['skuPrice'] = '5000'"
  }
}
```

![image-20220724163508606](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.11.5.png)

```
GET /product/_search
```

![image-20220724163524123](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.3.11.6.png)

#### 4、高亮显示

添加分页从`0`开始，向后查询`5`个数据，并把匹配到的`skuTitle`颜色设置为红色

```json
"from": 0,
"size": 5,
"highlight": {
"fields": {"skuTitle": {}}, 
"pre_tags": "<b style='color:red'>",
"post_tags": "</b>"
}
```

![image-20220722213436383](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.4.png)

完整查询语句：

```json
GET product/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "skuTitle": "华为"
          }
        }
      ],
      "filter": [
        {
          "term": {
            "catalogId": "225"
          }
        },
        {
          "terms": {
            "brandId": [
              "1",
              "2",
              "9"
            ]
          }
        },
        {
          "nested": {
            "path": "attrs",
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "attrs.attrId": {
                        "value": "1"
                      }
                    }
                  },
                  {
                    "terms": {
                      "attrs.attrValue": [
                        "LIO-A00",
                        "A2100"
                      ]
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "term": {
            "hasStock": {
              "value": "true"
            }
          }
        },
        {
          "range": {
            "skuPrice": {
              "gte": 0,
              "lte": 6000
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "skuPrice": {
        "order": "desc"
      }
    }
  ],
  "from": 0,
  "size": 5,
  "highlight": {
    "fields": {"skuTitle": {}}, 
    "pre_tags": "<b style='color:red'>",
    "post_tags": "</b>"
  }
}
```

#### 5、聚合查询

##### 1、子聚合报错

聚合后只能获取到`brandId`，想要获取`brandName`可以用到子聚合，子聚合可以根据上一步的聚合结果再次进行聚合

```json
GET product/_search
{
  "query": {
    "match_all": {}
  }
  , "aggs": {
    "brand_agg": {
      "terms": {
        "field": "brandId",
        "size": 10
      },
      "aggs": {
        "brand_name_agg": {
          "terms": {
            "field": "brandName",
            "size": 10
          }
        },
        "brand_img_agg":{
          "terms": {
            "field": "brandImg",
            "size": 10
          }
        }
      }
    },
    "catalog_agg": {
      "terms": {
        "field": "catalogId",
        "size": 10
      }
    }
  },
  "size": 0
}
```

但是通过子聚合报错了

```
"reason": "Can't load fielddata on [brandName] because fielddata is unsupported on fields of type [keyword]. Use doc values instead."
```

![image-20220724164420419](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.5.1.png)

##### 2、原因

这是因为当时在创建映射时，对这些字段设置`"index" : false,`不进行查询，`"doc_values" : false`不进行聚合，从而节省内存。要想可以聚合只能进行数据迁移，然后再修改映射

![image-20220724164941728](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.5.2.png)

#### 6、数据迁移

##### 1、获取`product`映射

使用`GET product/_mapping`，获取`product`的映射信息，然后复制结果

```
GET product/_mapping
```

![image-20220724165209526](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.6.1.png)

##### 2、向`gulimall_product`创建映射

输入`PUT gulimall_product`，并粘贴刚刚复制的结果，再删除`粘贴过来的结果`里的`"product" :{ }`右括号随便在最后删除一个就行了

然后点击`工具`图标，选择`Auto indent`格式化一下代码，再在里面修改映射信息

这里需要把所有的`"index" : false,	"doc_values" : false`都删掉，然后点击执行

```json
PUT gulimall_product
{
  "mappings": {
    "properties": {
      "attrs": {
        "type": "nested",
        "properties": {
          "attrId": {
            "type": "long"
          },
          "attrName": {
            "type": "keyword"
          },
          "attrValue": {
            "type": "keyword"
          }
        }
      },
      "brandId": {
        "type": "long"
      },
      "brandImg": {
        "type": "keyword"
      },
      "brandName": {
        "type": "keyword"
      },
      "catalogId": {
        "type": "long"
      },
      "catalogName": {
        "type": "keyword"
      },
      "hasStock": {
        "type": "boolean"
      },
      "hotScore": {
        "type": "long"
      },
      "saleCount": {
        "type": "long"
      },
      "skuId": {
        "type": "long"
      },
      "skuImg": {
        "type": "keyword"
      },
      "skuPrice": {
        "type": "keyword"
      },
      "skuTitle": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "spuId": {
        "type": "keyword"
      }
    }
  }
}
```

![image-20220724165940837](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.6.2.png)

##### 3、迁移数据

```json
POST _reindex
{
  "source": {
    "index": "product"
  },
  "dest": {
    "index": "gulimall_product"
  }
}
```

![image-20220724170234036](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.6.3.png)

##### 4、查询数据

可以看到数据都迁移过来了

```
GET gulimall_product/_search
```

![image-20220724170343570](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.6.4.png)

##### 5、修改常量

在`gulimall-search`模块的`com.atguigu.gulimall.search.constant.EsConstant`常量类里修改`PRODUCT_INDEX`字段，使用新的索引

```java
public static final String PRODUCT_INDEX = "gulimall_product";
```

![image-20220724170527735](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.6.5.png)

##### 6、再次查询

再次使用`gulimall_product`查询，就可以查到数据了

```json
GET gulimall_product/_search
{
  "query": {
    "match_all": {}
  }
  , "aggs": {
    "brand_agg": {
      "terms": {
        "field": "brandId",
        "size": 10
      },
      "aggs": {
        "brand_name_agg": {
          "terms": {
            "field": "brandName",
            "size": 10
          }
        },
        "brand_img_agg":{
          "terms": {
            "field": "brandImg",
            "size": 10
          }
        }
      }
    },
    "catalog_agg": {
      "terms": {
        "field": "catalogId",
        "size": 10
      }
    }
  },
  "size": 0
}
```

![image-20220724182331880](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.6.6.png)

#### 7、嵌入式聚合

使用如下查询回查询不到数据

```json
GET gulimall_product/_search
{
  "query": {
    "match_all": {}
  }
  , "aggs": {
    "brand_agg": {
      "terms": {
        "field": "brandId",
        "size": 10
      },
      "aggs": {
        "brand_name_agg": {
          "terms": {
            "field": "brandName",
            "size": 10
          }
        },
        "brand_img_agg":{
          "terms": {
            "field": "brandImg",
            "size": 10
          }
        }
      }
    },
    "catalog_agg": {
      "terms": {
        "field": "catalogId",
        "size": 10
      },
      "aggs": {
        "catalog_name_agg": {
          "terms": {
            "field": "catalogName",
            "size": 10
          }
        }
      }
    },
        "attr_agg":{
          "terms": {
            "field": "attrs.attrId",
            "size": 10
          }
        }
  },
  "size": 0
}
```

![image-20220725161115201](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.7.1.png)

如果是嵌入式的属性，查询，聚合，分析都应该用嵌入式的，因此不能直接获取`attrs.attrId`的聚合结果

```json
GET gulimall_product/_search
{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "brand_agg": {
      "terms": {
        "field": "brandId",
        "size": 10
      },
      "aggs": {
        "brand_name_agg": {
          "terms": {
            "field": "brandName",
            "size": 10
          }
        },
        "brand_img_agg": {
          "terms": {
            "field": "brandImg",
            "size": 10
          }
        }
      }
    },
    "catalog_agg": {
      "terms": {
        "field": "catalogId",
        "size": 10
      },
      "aggs": {
        "catalog_name_agg": {
          "terms": {
            "field": "catalogName",
            "size": 10
          }
        }
      }
    },
    "attr_agg": {
      "nested": {
        "path": "attrs"
      },
      "aggs": {
        "attr_id_agg": {
          "terms": {
            "field": "attrs.attrId",
            "size": 10
          }
        }
      }
    }
  },
  "size": 0
}
```

![image-20220725160847972](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.7.2.png)

参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/8.3/query-dsl-nested-query.html

![GIF 2022-7-24 18-47-57](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.7.3.gif)

**Nested aggregation**

> A special single bucket aggregation that enables aggregating nested documents.
>
> For example, lets say we have an index of products, and each product holds the list of resellers - each having its own price for the product. The mapping could look like:
>
> ```json
> PUT /products
> {
>   "mappings": {
>     "properties": {
>       "resellers": { 
>         "type": "nested",
>         "properties": {
>           "reseller": {
>             "type": "keyword"
>           },
>           "price": {
>             "type": "double"
>           }
>         }
>       }
>     }
>   }
> }
> ```
>
> The following request adds a product with two resellers:
>
> ```json
> PUT /products/_doc/0?refresh
> {
>   "name": "LED TV", 
>   "resellers": [
>     {
>       "reseller": "companyA",
>       "price": 350
>     },
>     {
>       "reseller": "companyB",
>       "price": 500
>     }
>   ]
> }
> ```
>
> The following request returns the minimum price a product can be purchased for:
>
> ```json
> GET /products/_search?size=0
> {
>   "query": {
>     "match": {
>       "name": "led tv"
>     }
>   },
>   "aggs": {
>     "resellers": {
>       "nested": {
>         "path": "resellers"
>       },
>       "aggs": {
>         "min_price": {
>           "min": {
>             "field": "resellers.price"
>           }
>         }
>       }
>     }
>   }
> }
> ```
>
> As you can see above, the nested aggregation requires the `path` of the nested documents within the top level documents. Then one can define any type of aggregation over these nested documents.

#### 8、完整查询

[点击查看完整查询](code/5.5.3.8.txt)

![image-20220724190807948](https://gitlab.com/apzs/image/-/raw/master/image/5.5.3.8.png)

### 5.5.4、`Java`发送请求给`ES`

#### 1、封装请求数据

##### 1、指定分页大小

在`gulimall-search`模块的`com.atguigu.gulimall.search.constant.EsConstant`类里，添加`PRODUCT_PAGE_SIZE`属性，用来指定分页的大小

```java
/**
 * 分页大小
 */
public static final Integer PRODUCT_PAGE_SIZE = 2;
```

![image-20220725151744774](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.1.png)

##### 2、`模糊匹配`，`过滤`

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl`包下，新建`ProductSaveServiceImpl`类，用来进行商品的检索

首先封装`模糊匹配，过滤`，可以把`IDEA`水平分割，在`IDEA`里的左边放`想发送的请求`，在`IDEA`里的右边放`要用代码实现的请求`，

每写一部分，把该部分`想发送的请求`的`JSON`展开，把其他部分的`JSON`折叠，这样可以一步一步实现对应功能

[点击查看`MallSearchServiceImpl`类完整代码](code/5.5.4.1.2.MallSearchServiceImpl.java)

![image-20220725144145427](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.2.png)

##### 3、`排序`、`分页`、`高亮`

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.ProductSaveServiceImpl`类里的`buildSearchRequest`方法里，添加如下代码，用来设置`排序`、`分页`、`高亮`等信息

```java
//排序
//sort=saleCount_asc/desc
String sort = searchParam.getSort();
if (StringUtils.hasText(sort)){
    String[] s = sort.split("_");
    if (s.length==2 && !sort.startsWith("_")){
        SortOrder sortOrder = "asc".equalsIgnoreCase(s[1]) ? SortOrder.ASC:SortOrder.DESC;
        //SortOrder sortOrder = SortOrder.fromString(s[1]);
        sourceBuilder.sort(s[0],sortOrder);
    }
}

//分页
Integer pageNum = searchParam.getPageNum();
if (pageNum==null || pageNum<=0){
    pageNum = 1;
}
int from = (pageNum-1) * EsConstant.PRODUCT_PAGE_SIZE;
sourceBuilder.from(from).size(EsConstant.PRODUCT_PAGE_SIZE);

//高亮
if (StringUtils.hasText(searchParam.getKeyword())) {
    HighlightBuilder highlightBuilder = new HighlightBuilder();
    highlightBuilder.field("skuTitle");
    highlightBuilder.preTags("<b style='color:red'>");
    highlightBuilder.postTags("</b>");
    sourceBuilder.highlighter(highlightBuilder);
}
```

![image-20220725145835141](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.3.png)

##### 4、测试(1)

###### 1、输出`sourceBuilder`信息

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.ProductSaveServiceImpl`类里的`buildSearchRequest`方法返回前，输出`sourceBuilder`信息

```java
System.out.println(sourceBuilder.toString());
```

![image-20220725150952617](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.4.1.png)

###### 2、发送请求

使用`Postman`发送如下请求，查看默认返回的商品信息

```
http://localhost:12000/list.html
```

![image-20220725151033746](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.4.2.png)

###### 3、复制发送的请求

复制`GulimallSearchApplication`服务的控制台输出的请求信息

```json
{"from":0,"size":2,"query":{"bool":{"filter":[{"term":{"hasStock":{"value":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}}}
```

![image-20220725152405404](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.4.3.png)

###### 4、查看请求

随便找一个`JSON`格式化工具，比如 [在线JSON校验格式化工具（Be JSON）](https://www.bejson.com/)  ，粘贴刚刚复制的请求，然后点击`格式化校验`

可以看到，此时的查询条件只有`hasStock`为`true`

```json
{
	"from": 0,
	"size": 2,
	"query": {
		"bool": {
			"filter": [{
				"term": {
					"hasStock": {
						"value": true,
						"boost": 1.0
					}
				}
			}],
			"adjust_pure_negative": true,
			"boost": 1.0
		}
	}
}
```

![image-20220725152445606](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.4.4.png)

###### 5、在`kibana`中执行请求

在`kibana`中执行如下请求，然后查看返回的结果，可以看到，已经查询出所有`hasStock`为`true`的数据了

```json
GET gulimall_product/_search
{
	"from": 0,
	"size": 2,
	"query": {
		"bool": {
			"filter": [{
				"term": {
					"hasStock": {
						"value": true,
						"boost": 1.0
					}
				}
			}],
			"adjust_pure_negative": true,
			"boost": 1.0
		}
	}
}
```

![image-20220725152528831](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.4.5.png)

##### 5、测试(2)

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225
```

![image-20220725152803797](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.5.1.png)

复制`GulimallSearchApplication`服务的控制台输出的请求信息

```json
{"from":0,"size":2,"query":{"bool":{"must":[{"match":{"skuTitle":{"query":"华为","operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions":true,"lenient":false,"zero_terms_query":"NONE","auto_generate_synonyms_phrase_query":true,"boost":1.0}}}],"filter":[{"term":{"catalogId":{"value":225,"boost":1.0}}},{"term":{"hasStock":{"value":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"highlight":{"pre_tags":["<b style='color:red'>"],"post_tags":["</b>"],"fields":{"skuTitle":{}}}}
```

![image-20220725152907806](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.5.2.png)

在`kibana`中执行如下请求，然后查看返回的结果，可以看到，已经查询出所有`hasStock`为`true`、`skuTitle`为`华为`、`catalogId`为`225`的数据了

```json
GET gulimall_product/_search
{
  "from": 0,
  "size": 2,
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "skuTitle": {
              "query": "华为",
              "operator": "OR",
              "prefix_length": 0,
              "max_expansions": 50,
              "fuzzy_transpositions": true,
              "lenient": false,
              "zero_terms_query": "NONE",
              "auto_generate_synonyms_phrase_query": true,
              "boost": 1
            }
          }
        }
      ],
      "filter": [
        {
          "term": {
            "catalogId": {
              "value": 225,
              "boost": 1
            }
          }
        },
        {
          "term": {
            "hasStock": {
              "value": true,
              "boost": 1
            }
          }
        }
      ],
      "adjust_pure_negative": true,
      "boost": 1
    }
  },
  "highlight": {
    "pre_tags": [
      "<b style='color:red'>"
    ],
    "post_tags": [
      "</b>"
    ],
    "fields": {
      "skuTitle": {}
    }
  }
}
```

![image-20220725152956547](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.5.3.png)

##### 6、测试(3)

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225&attrs=1_LIO-A00:A13
```

![image-20220725153318989](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.6.1.png)

复制`GulimallSearchApplication`服务的控制台输出的请求信息

```json
{"from":0,"size":2,"query":{"bool":{"must":[{"match":{"skuTitle":{"query":"华为","operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions":true,"lenient":false,"zero_terms_query":"NONE","auto_generate_synonyms_phrase_query":true,"boost":1.0}}}],"filter":[{"term":{"catalogId":{"value":225,"boost":1.0}}},{"nested":{"query":{"bool":{"must":[{"term":{"attrs.attrId":{"value":"1","boost":1.0}}},{"terms":{"attrs.attrValue":["LIO-A00","A13"],"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}},"path":"attrs","ignore_unmapped":false,"score_mode":"none","boost":1.0}},{"term":{"hasStock":{"value":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"highlight":{"pre_tags":["<b style='color:red'>"],"post_tags":["</b>"],"fields":{"skuTitle":{}}}}
```

![image-20220725153352316](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.6.2.png)

在`kibana`中执行如下请求，然后查看返回的结果，可以看到，已经查询出所有`hasStock`为`true`、`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 的数据了，[点击查看完整请求](code/5.5.4.1.6.txt)

![image-20220725153503635](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.6.3.png)

##### 7、测试(4)

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`2`号`attrId`其属性值为`HUAWEI Kirin 970`的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225&attrs=1_LIO-A00:A13&attrs=2_HUAWEI Kirin 970
```

![image-20220725154316824](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.7.1.png)

复制`GulimallSearchApplication`服务的控制台输出的请求信息

```json
{"from":0,"size":2,"query":{"bool":{"must":[{"match":{"skuTitle":{"query":"华为","operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions":true,"lenient":false,"zero_terms_query":"NONE","auto_generate_synonyms_phrase_query":true,"boost":1.0}}}],"filter":[{"term":{"catalogId":{"value":225,"boost":1.0}}},{"nested":{"query":{"bool":{"must":[{"term":{"attrs.attrId":{"value":"1","boost":1.0}}},{"terms":{"attrs.attrValue":["LIO-A00","A13"],"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}},"path":"attrs","ignore_unmapped":false,"score_mode":"none","boost":1.0}},{"nested":{"query":{"bool":{"must":[{"term":{"attrs.attrId":{"value":"2","boost":1.0}}},{"terms":{"attrs.attrValue":["HUAWEI Kirin 970"],"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}},"path":"attrs","ignore_unmapped":false,"score_mode":"none","boost":1.0}},{"term":{"hasStock":{"value":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"highlight":{"pre_tags":["<b style='color:red'>"],"post_tags":["</b>"],"fields":{"skuTitle":{}}}}
```

![image-20220725154357224](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.7.2.png)

在`kibana`中执行如下请求，然后查看返回的结果，可以看到，已经查询出所有`hasStock`为`true`、`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`2`号`attrId`其属性值为`HUAWEI Kirin 970`的数据了，此时没有一条数据符合要求

[点击查看完整请求](code/5.5.4.1.7.txt)

![image-20220725154517396](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.7.3.png)

##### 8、测试(5)

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`skuPrice`大于`6000`的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225&attrs=1_LIO-A00:A13&skuPrice=_6000
```

![image-20220725154730511](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.8.1.png)

复制`GulimallSearchApplication`服务的控制台输出的请求信息

```json
{"from":0,"size":2,"query":{"bool":{"must":[{"match":{"skuTitle":{"query":"华为","operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions":true,"lenient":false,"zero_terms_query":"NONE","auto_generate_synonyms_phrase_query":true,"boost":1.0}}}],"filter":[{"term":{"catalogId":{"value":225,"boost":1.0}}},{"nested":{"query":{"bool":{"must":[{"term":{"attrs.attrId":{"value":"1","boost":1.0}}},{"terms":{"attrs.attrValue":["LIO-A00","A13"],"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}},"path":"attrs","ignore_unmapped":false,"score_mode":"none","boost":1.0}},{"term":{"hasStock":{"value":true,"boost":1.0}}},{"range":{"skuPrice":{"from":null,"to":"6000","include_lower":true,"include_upper":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"highlight":{"pre_tags":["<b style='color:red'>"],"post_tags":["</b>"],"fields":{"skuTitle":{}}}}
```

![image-20220725154813592](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.8.2.png)

在`kibana`中执行如下请求，然后查看返回的结果，可以看到，已经查询出所有`hasStock`为`true`、`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`skuPrice`大于`6000`的数据了

[点击查看完整请求](code/5.5.4.1.8.txt)

![image-20220725154927216](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.8.3.png)

##### 9、`聚合分析`

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchRequest`方法里的返回前面，添加如下代码：，用于`品牌聚合`、`分类聚合`、`属性聚合`

```java
//聚合分析

//品牌聚合
//"aggs": {"brand_agg": {"terms": {"field": "brandId","size": 10},
//                         "aggs": {"brand_name_agg": {"terms": {"field": "brandName","size": 1}},
//                                  "brand_img_agg":{"terms": {"field": "brandImg","size": 1}}}}}
TermsAggregationBuilder brandAgg = AggregationBuilders.terms("brand_agg");
brandAgg.field("brandId").size(10);
brandAgg.subAggregation(AggregationBuilders.terms("brand_name_agg").field("brandName").size(1));
brandAgg.subAggregation(AggregationBuilders.terms("brand_img_agg").field("brandImg").size(1));
sourceBuilder.aggregation(brandAgg);

//分类聚合
//"aggs": {"catalog_agg": {"terms": {"field": "catalogId","size": 10},
//                          "aggs": {"catalog_name_agg": {"terms": {"field": "catalogName","size": 1}}}},}
TermsAggregationBuilder catalogAgg = AggregationBuilders.terms("catalog_agg");
catalogAgg.field("catalogId").size(10);
catalogAgg.subAggregation(AggregationBuilders.terms("catalogName").size(1));
sourceBuilder.aggregation(catalogAgg);

//属性聚合
//"aggs": {"attr_agg":{"nested": {"path": "attrs"},
//         "aggs": {"attr_id_agg":{"terms": {"field": "attrs.attrId","size": 10},
//            "aggs": {"attr_name_agg": {"terms": {"field": "attrs.attrName","size": 1}},
//                   "attr_value_agg":{"terms": {"field": "attrs.attrValue","size": 10}}}}}}}
NestedAggregationBuilder attrAgg = AggregationBuilders.nested("attr_agg","attrs");
TermsAggregationBuilder attrIdAgg = AggregationBuilders.terms("attr_id_agg");
attrIdAgg.field("attrs.attrId").size(10);
attrIdAgg.subAggregation(AggregationBuilders.terms("attr_name_agg").field("attrs.attrName").size(1));
attrIdAgg.subAggregation(AggregationBuilders.terms("attr_value_agg").field("attrs.attrValue").size(10));
attrAgg.subAggregation(attrIdAgg);
sourceBuilder.aggregation(attrAgg);
```

![image-20220725185608463](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.9.png)

##### 10、测试

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`skuPrice`大于`6000`的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225&attrs=1_LIO-A00:A13&skuPrice=_6000
```

![image-20220725185732014](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.10.1.png)

复制`GulimallSearchApplication`服务的控制台输出的请求信息

```json
{"from":0,"size":2,"query":{"bool":{"must":[{"match":{"skuTitle":{"query":"华为","operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions":true,"lenient":false,"zero_terms_query":"NONE","auto_generate_synonyms_phrase_query":true,"boost":1.0}}}],"filter":[{"term":{"catalogId":{"value":225,"boost":1.0}}},{"nested":{"query":{"bool":{"must":[{"term":{"attrs.attrId":{"value":"1","boost":1.0}}},{"terms":{"attrs.attrValue":["LIO-A00","A13"],"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}},"path":"attrs","ignore_unmapped":false,"score_mode":"none","boost":1.0}},{"term":{"hasStock":{"value":true,"boost":1.0}}},{"range":{"skuPrice":{"from":null,"to":"6000","include_lower":true,"include_upper":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"aggregations":{"brand_agg":{"terms":{"field":"brandId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"brand_name_agg":{"terms":{"field":"brandName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"brand_img_agg":{"terms":{"field":"brandImg","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"catalog_agg":{"terms":{"field":"catalogId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"catalog_name_agg":{"terms":{"field":"catalogName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"attr_agg":{"nested":{"path":"attrs"},"aggregations":{"attr_id_agg":{"terms":{"field":"attrs.attrId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"attr_name_agg":{"terms":{"field":"attrs.attrName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"attr_value_agg":{"terms":{"field":"attrs.attrValue","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}}}}},"highlight":{"pre_tags":["<b style='color:red'>"],"post_tags":["</b>"],"fields":{"skuTitle":{}}}}
```

![image-20220725185835546](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.10.2.png)

在`kibana`中执行如下请求，然后查看返回的结果，可以看到，`品牌聚合`、`分类聚合`、`属性聚合`都已经成功展示了

![image-20220727154908170](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.1.10.3.png)

##### 11、完整代码

[点击查看`MallSearchServiceImpl`类完整代码](code/5.5.4.1.11.MallSearchServiceImpl.java)

#### 2、处理响应数据

##### 1、打断点

可以通过`debug`的方式查看`ES`返回的数据，进而对返回的数据进行相应处理

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里添加如下代码，并在该方法的第一行打上断点。以`debug`方式重新启动`GulimallSearchApplication`服务

```java
/**
 * 根据查询到的数据，构建返回结果
 *
 * @param searchParam
 * @param response
 * @return
 */
private SearchResult buildSearchResponse(SearchParam searchParam, SearchResponse response) {
    SearchHits searchHits = response.getHits();
    SearchResult searchResult = new SearchResult();
    ////1、返回的所有查询到的商品
    //searchResult.setProducts();
    ////2、当前所有商品涉及到的所有属性信息
    //searchResult.setAttrs();
    ////3、当前所有商品涉及到的所有品牌信息
    //searchResult.setBrands();
    ////4、当前所有商品涉及到的所有分类信息
    //searchResult.setCatalogs();
    //5、分页信息-页码
    searchResult.setPageNum(searchParam.getPageNum());
    //6、分页信息-总记录树
    long total = searchHits.getTotalHits().value;
    searchResult.setTotal(total);
    //7、分页信息-总页码
    long totalPage = (long) Math.ceil((total/(double)EsConstant.PRODUCT_PAGE_SIZE));
    //long totalPage = (total-1)%EsConstant.PRODUCT_PAGE_SIZE +1;
    if (totalPage> Integer.MAX_VALUE){
        totalPage = Integer.MAX_VALUE;
    }
    searchResult.setTotalPages((int)totalPage);

    return searchResult;
}
```

![image-20220725184629044](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.1.png)

##### 2、发送请求

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`skuPrice`大于`6000`的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225&attrs=1_LIO-A00:A13&skuPrice=_6000
```

![image-20220725190023037](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.2.png)

##### 3、查看响应的`response`对象

切换到`IDEA`，可以看到在`response`对象里的`internalResponse`属性里即有`hits`命中的记录和`aggregations`聚合分析的结果

![image-20220725190134099](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.3.png)

##### 4、查看返回类型

从`ES`中查出的数据是什么类型，`aggregations.get("catalog_agg");`返回的类型就写什么，不要使用`IDEA`生成的`Aggregation`类型

![image-20220725193128221](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.4.png)

```java
/**
 * 根据查询到的数据，构建返回结果
 *
 * @param searchParam
 * @param response
 * @return
 */
private SearchResult buildSearchResponse(SearchParam searchParam, SearchResponse response) {
    SearchHits searchHits = response.getHits();
    SearchResult searchResult = new SearchResult();
    //1、返回的所有查询到的商品
    SearchHit[] hits = searchHits.getHits();
    List<SkuEsModel> skuEsModels = null;
    if (hits !=null && hits.length>0){
        skuEsModels = new ArrayList<>();
        for (SearchHit hit : hits) {
            String s = hit.getSourceAsString();
            SkuEsModel skuEsModel = JSON.parseObject(s, SkuEsModel.class);
            skuEsModels.add(skuEsModel);
        }
    }
    searchResult.setProducts(skuEsModels);

    Aggregations aggregations = response.getAggregations();
    ////2、当前所有商品涉及到的所有属性信息
    //searchResult.setAttrs();
    ////3、当前所有商品涉及到的所有品牌信息
    //searchResult.setBrands();
    ////4、当前所有商品涉及到的所有分类信息
    ParsedLongTerms catalogAgg = aggregations.get("catalog_agg");
    //searchResult.setCatalogs();
    //5、分页信息-页码
    searchResult.setPageNum(searchParam.getPageNum());
    //6、分页信息-总记录树
    long total = searchHits.getTotalHits().value;
    searchResult.setTotal(total);
    //7、分页信息-总页码
    long totalPage = (long) Math.ceil((total/(double)EsConstant.PRODUCT_PAGE_SIZE));
    //long totalPage = (total-1)%EsConstant.PRODUCT_PAGE_SIZE +1;
    if (totalPage> Integer.MAX_VALUE){
        totalPage = Integer.MAX_VALUE;
    }
    searchResult.setTotalPages((int)totalPage);

    return searchResult;
}
```

##### 5、打断点

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里添加如下代码，获取聚合结果里的需要数据，并在该方法中根据获取到的聚合结果对`searchResult`对象设置各种属性的关键位置打上断点，[点击查看`buildSearchResponse`方法完整代码](code/5.5.4.2.5.buildSearchResponse.java)

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.5.png" alt="image-20220725203447427" style="zoom:50%;" />

##### 6、测试

使用`Postman`发送如下请求，查看`skuTitle`为`华为`、`catalogId`为`225`、`1`号`attrId`其属性值为`LIO-A00`或`A13` 、`skuPrice`大于`6000`的数据

```
http://localhost:12000/list.html?keyword=华为&catalog3Id=225&attrs=1_LIO-A00:A13&skuPrice=_6000
```

![image-20220725190023037](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.1.png)

点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`searchResult.setProducts(skuEsModels);`这里，可以看到，在`skuEsModels`对象了，封装了`skuId`为`1`和`skuId`为`2`的两条数据，一个`skuTitle`为`8GB+128GB`，另一个`skuTitle`为`8GB+256GB`，但是查到的`skuImg`为空，而数据库中是有该图片的

![image-20220725202950392](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.2.png)

这与在`kibana`中查询的数据一致，但是在通过`keyword`为`华为`进行搜索时，`skuTitle`里的`华为`并没有`红色`、`加粗`样式

而且没有`skuImg`属性，而数据库中是有该图片的

![image-20220725204650097](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.3.png)

登录后台系统，在`商品系统/商品维护/商品管理`里面，可以看到`华为`的商品都是有图片的

![image-20220727164425971](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.4.png)

继续点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`searchResult.setAttrs(attrVos);`这里，可以看到`attrVos`里封装了一个`attrVo`对象

![image-20220725203020614](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.5.png)

继续点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`searchResult.setBrands(brandVos);`这里，可以看到已经封装了`brandVos`对象的信息

![image-20220725203234794](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.6.png)

继续点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`searchResult.setCatalogs(catalogVos);`这里，可以看到已经封装了`catalogVos`对象的信息

![image-20220725203257449](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.7.png)

继续点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`return searchResult;`这里，可以看到已成功封装了`searchResult`的相关数据，但是`pageNum`为`null`

![image-20220725203400694](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.2.6.8.png)

#### 3、处理`bug`

##### 1、设置当前页

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里，在`searchResult.setPageNum(pageNum);`前面加一处判断，如果当前页`pageNum`为`null`或`<=0`，就赋上默认值`1`

然后重启`GulimallSearchApplication`服务

```
Integer pageNum = searchParam.getPageNum();
if (pageNum ==null|| pageNum<=0){
    pageNum = 1;
}
searchResult.setPageNum(pageNum);
```

![image-20220725210716273](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.1.1.png)

使用`Postman`发送如下请求，查看`skuTitle`为`华为`的数据

```
http://localhost:12000/list.html?keyword=华为
```

![image-20220726150930269](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.1.2.png)

一直点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`return searchResult;`这里

![image-20220726151842483](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.1.3.png)

查看`searchResult`对象数据，可以看到当前页`pageNum`已赋上默认值`1`，此时的`searchResult`对象里的`products`属性的`SkuEsModel`列表里的`skuTitle`里的`华为`还没有`红色`、`加粗`样式

![image-20220726151826495](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.1.4.png)

`skuTitle`里的`华为`还没有`红色`、`加粗`样式在`response`对象的`internalResponse`属性里的`hits`中的相应的`hit`里的`highlightFields`属性的第一个列表里

![image-20220726150926735](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.1.5.png)

##### 2、对关键字加粗

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里，在`skuEsModels.add(skuEsModel);`之前加个判断，如果请求中带有`keyword`，就把`skuTitle`里的`keyword`相关的部分应用`红色`、`加粗`样式

```java
if (StringUtils.hasText(searchParam.getKeyword())) {
    HighlightField skuTitle = hit.getHighlightFields().get("skuTitle");
    if (skuTitle != null) {
        Text[] fragments = skuTitle.getFragments();
        if (fragments != null && fragments.length > 0) {
            skuEsModel.setSkuTitle(fragments[0].string());
        }
    }
}
```

![image-20220726152129230](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.2.1.png)

然后重启`GulimallSearchApplication`服务，使用`Postman`发送如下请求，查看`skuTitle`为`华为`的数据

```
http://localhost:12000/list.html?keyword=华为
```

![image-20220726150930269](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.2.2.png)

一直点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`return searchResult;`这里

![image-20220726152009525](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.2.3.png)

查看`searchResult`对象数据，可以看到`searchResult`对象里的`products`属性的`SkuEsModel`列表里的`skuTitle`里的`华为`已应用`红色`、`加粗`样式

![image-20220726151955731](https://gitlab.com/apzs/image/-/raw/master/image/5.5.4.3.2.4.png)

##### 3、完整代码

[点击查看`MallSearchServiceImpl`类完整代码](code/5.5.4.3.3.MallSearchServiceImpl.java)

### 5.5.5、完善检索页(1)

#### 1、设置`ES`里的商品数据

##### 1、页面结构

打开`gulimall-search`模块的`src/main/resources/templates/list.html`，可以看到页面由`头部`、`搜索导航`、`热卖促销`、`手机`、`商品筛选和排序`、`商品精选`、`猜你喜欢`、`我的足迹`、`底部`、`右侧侧边栏`几部分组成

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.1.1.png" alt="image-20220726152506150" style="zoom:50%;" />

##### 2、`rig_tab`包裹4个商品`div`

在 http://search.gulimall.com/list.html 里，打开控制台，定位到`商品`的`div` ，可以看到每一个`class`为`rig_tab`的`div`里面有`4`个商品的`div`

![image-20220726150521869](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.1.2.1.png)

在`gulimall-search`模块的`src/main/resources/templates/list.html`里搜索`rig_tab`，也可以看出来，每一个`class`为`rig_tab`的`div`里面有`4`个商品的`div`，代表一行的商品

![image-20220726152654607](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.1.2.2.png)

##### 3、修改代码

只保留一个`class`为`rig_tab`的`div`，删掉其他`class`为`rig_tab`的`div`。并在这个`class`为`rig_tab`的`div`里面，只保留里面的一个`div`，删掉其他`div`，修改里面的代码，修改为如下所示：

```html
<div class="rig_tab">
    <div th:each="prodect:${result.getProducts()}">
        <div class="ico">
            <i class="iconfont icon-weiguanzhu"></i>
            <a href="#">关注</a>
        </div>
        <p class="da">
            <a href="#" th>
                <img th:src="${prodect.skuImg}" class="dim">
            </a>
        </p>
        <ul class="tab_im">
            <li>
                <a href="#" title="黑色">
                <img th:src="${prodect.skuImg}"></a>
            <li>
        </ul>
        <p class="tab_R">
            <span th:text="'¥'+${prodect.skuPrice}">¥5199.00</span>
        </p>
        <p class="tab_JE">
            <a href="#" th:text="${prodect.skuTitle}">
                Apple iPhone 7 Plus (A1661) 32G 黑色 移动联通电信4G手机
            </a>
        </p>
        <p class="tab_PI">已有<span>11万+</span>热门评价
            <a href="#">二手有售</a>
        </p>
        <p class="tab_CP"><a href="#" title="谷粒商城Apple产品专营店">谷粒商城Apple产品...</a>
            <a href='#' title="联系供应商进行咨询">
                <img src="/static/search/img/xcxc.png">
            </a>
        </p>
        <div class="tab_FO">
            <div class="FO_one">
                <p>自营
                    <span>谷粒商城自营,品质保证</span>
                </p>
                <p>满赠
                    <span>该商品参加满赠活动</span>
                </p>
            </div>
        </div>
    </div>
</div>
```

![image-20220726155055223](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.1.3.png)

##### 4、测试

在浏览器中输入如下网址，可以看到已显示`ES`里的商品数据，但是图片没有显示出来

```
http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为
```

![image-20220726155237785](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.1.4.png)

#### 2、添加图片`url`

启动`Unnamed`，即启动`GulimallCouponApplication`、`GulimallGatewayApplication`、`GulimallMemberApplication`、`GulimallProductApplication`、`GulimallSearchApplication`、`GulimallThirdPartyApplication`、`GulimallWareApplication`、`RenrenApplication`，共8个服务(注意启动`nacos`)

##### 1、重新上架

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里的第一行打上断点。以`debug`方式重新启动`GulimallSearchApplication`服务，并刷新浏览器`http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为`页面，切换到`IDEA`，可以看到`skuImg`为`null`

![image-20220726155136252](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.1.1.png)

而在`kibana`中作以下查询，也会发现数据里面没有`skuImg`

```json
GET gulimall_product/_search
{"from":0,"size":16,"query":{"bool":{"must":[{"match":{"skuTitle":{"query":"华为","operator":"OR","prefix_length":0,"max_expansions":50,"fuzzy_transpositions":true,"lenient":false,"zero_terms_query":"NONE","auto_generate_synonyms_phrase_query":true,"boost":1.0}}}],"filter":[{"term":{"hasStock":{"value":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"aggregations":{"brand_agg":{"terms":{"field":"brandId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"brand_name_agg":{"terms":{"field":"brandName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"brand_img_agg":{"terms":{"field":"brandImg","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"catalog_agg":{"terms":{"field":"catalogId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"catalog_name_agg":{"terms":{"field":"catalogName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"attr_agg":{"nested":{"path":"attrs"},"aggregations":{"attr_id_agg":{"terms":{"field":"attrs.attrId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"attr_name_agg":{"terms":{"field":"attrs.attrName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"attr_value_agg":{"terms":{"field":"attrs.attrValue","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}}}}},"highlight":{"pre_tags":["<b style='color:red'>"],"post_tags":["</b>"],"fields":{"skuTitle":{}}}}
```

![image-20220726155016758](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.1.2.png)

打开`Navicat`软件，点击`gulimall_pms`数据库，打开`pms_spu_info`表，修改`华为`的`publish_status`为`0`

![image-20220726161322223](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.1.3.png)

然后启动后台的`vue`项目，用户名和密码都为`admin`，在`商品系统/商品维护/spu管理`里点击`华为`和`IPhone`右侧`操作`里的`上架`按钮

![image-20220726161515229](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.1.4.png)

通过`kibana`查询数据，可以看到还是没有`skuPrice`属性

![image-20220726160010185](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.1.5.png)

##### 2、打断点测试

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.ProductSaveServiceImpl`类的`productStatusUp`方法的第一行打上断点，然后重启`GulimallSearchApplication`服务

![image-20220726155921886](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.2.1.png)

打开`Navicat`软件，点击`gulimall_pms`数据库，打开`pms_spu_info`表，重新修改`华为`的`publish_status`字段，使其为`0`

![image-20220726161348561](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.2.2.png)

打开后台的`vue`项目，在`商品系统/商品维护/spu管理`里点击`华为`和`IPhone`右侧`操作`里的`上架`按钮

![image-20220726161520362](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.2.3.png)

可以看到`skuEsModels`里的`skuImg`和`skuPrice`都为`null`，所有就没有把`skuImg`和`skuPrice`的数据上传到`ES`

![image-20220726160121631](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.2.4.png)

而后台的`vue`项目里，在`商品系统/商品维护/商品管理`里面，可以看到`华为`的商品都是有图片的

![image-20220726160144185](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.2.5.png)

##### 3、再次测试

重新以`debug`方式启动`GulimallProductApplication`服务和`GulimallGatewayApplication`服务，在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法里的`第一行`和`R r = searchFeignService.productStatusUp(collect);`这两个地方打上断点

![image-20220726161650347](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.1.png)

打开后台的`vue`项目，在`商品系统/商品维护/spu管理`里点击`华为`和`IPhone`右侧`操作`里的`上架`按钮

:speech_balloon:如果放行了上次请求，可以打开`Navicat`软件，点击`gulimall_pms`数据库，打开`pms_spu_info`表，重新修改`华为`的`publish_status`字段，使其为`0`，再点击`上传`

可以看到在数据中查询的`skuInfoEntities`是有`skuImg`和`skuPrice`数据的，不过叫`skuDefaultImg`和`price`罢了

![image-20220726160514310](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.2.png)

点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`R r = searchFeignService.productStatusUp(collect);`这里，可以看到这里想向`GulimallSearchApplication`服务传的`collect`数据里的`skuImg`和`skuPrice`已经都为`null`了

![image-20220726160933888](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.3.png)

可以看到在整理向`GulimallSearchApplication`服务发送数据的代码里，就注释了要写`skuPrice`和`skuImg`，怪不得前面`ES`里没有`skuPrice`的数据

![image-20220726160949540](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.4.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法里，在`List<SkuEsModel> collect = skuInfoEntities.stream().map(skuInfoEntity -> {`里添加如下代码

```java
//skuPrice
skuEsModel.setSkuPrice(skuInfoEntity.getPrice());
//skuImg
skuEsModel.setSkuImg(skuInfoEntity.getSkuDefaultImg());
```

![image-20220726161058461](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.5.png)

打开后台的`vue`项目，在`商品系统/商品维护/spu管理`里点击`华为`和`IPhone`右侧`操作`里的`上架`按钮

![image-20220726161706872](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.6.png)

点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点停到`R r = searchFeignService.productStatusUp(collect);`这里，可以看到这里想向`GulimallSearchApplication`服务传的`collect`数据里的`skuImg`和`skuPrice`已经都有数据了

![image-20220726161758500](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.7.png)

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，跳转到`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.ProductSaveServiceImpl`类的`productStatusUp`方法的第一行，

在`BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, GulimallElasticSearchConfig.COMMON_OPTIONS);`上打个断点，点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点，使断点听到刚打的断点的位置，可以看到`bulkRequest`对象里，已经有`skuImg`和`skuPrice`的数据了

![image-20220726162655583](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.8.png)

在`kibana`里执行以下查询语句，就可以看到有`8`条数据，并且有正确的`skuImg`和`skuPrice`

```json
GET gulimall_product/_search
{
  "query": {
    "match": {
      "skuTitle": "华为"
    }
  }
}
```

![image-20220727202654983](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.9.png)

:speech_balloon:如果在`kibana`里执行`GET gulimall_product/_search`查询语句，则只有这一条`华为`的数据，这是因为`ES`分页了

![image-20220726162739434](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.3.10.png)

##### 4、收尾

停掉`GulimallProductApplication`服务和`GulimallSearchApplication`服务，然后再运行这两个服务

![image-20220726161855276](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.4.1.png)

打开`Navicat`软件，点击`gulimall_pms`数据库，打开`pms_spu_info`表，修改`华为`和`IPhone`的`publish_status`为`0`

![image-20220727212558069](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.4.2.png)

打开后台的`vue`项目，在`商品系统/商品维护/spu管理`里点击`华为`和`IPhone`右侧`操作`里的`上架`按钮，就行了

![image-20220727212654009](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.2.4.3.png)

#### 3、对匹配到的关键词`标红`并`加粗`

打开`http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为`页面，可以看到它标签对他进行了转义，显示了原本的`<b style="color:red">华为</b>`，而不是对`华为`应用了`标红`并`加粗`的样式

![image-20220726164052529](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.3.1.png)

打开`gulimall-search`模块的`src/main/resources/templates/list.html`文件，搜索`${prodect.skuTitle}`，然后把`<a href="#" th:text="${prodect.skuTitle}">`修改为`<a href="#" th:utext="${prodect.skuTitle}">`

`th:utext`表示不对文本进行转义，点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

![image-20220726164238113](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.3.2.png)

刷新`http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为`页面，可以看到已经对`华为`应用了`标红`并`加粗`的样式

![image-20220726164306730](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.3.3.png)

#### 4、设置`ES`里的品牌数据

在`http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为`页面里，打开控制台，定位到`品牌`，复制`品牌`

![image-20220726164420581](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.4.1.png)

然后在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，搜索品牌，即可看到相应标签，在里面找到`class`为`sl_value_logo`的`div`，只保留里面的一个`<li>`标签，删除其他多余的`<li>`标签

![image-20220726164642485](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.4.2.png)

修改其内容，如下所示：

```html
<!--品牌-->
<div class="JD_nav_wrap">
    <div class="sl_key">
        <span>品牌：</span>
    </div>
    <div class="sl_value">
        <div class="sl_value_logo">
            <ul>
                <li th:each="brand:${result.brands}">
                    <a href="#">
                        <img th:src="${brand.brandImg}" alt="">
                        <div th:text="${brand.brandName}">
                            华为(HUAWEI)
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
```

![image-20220726164956622](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.4.3.png)

点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

然后刷新`http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为`页面，可以看到已经成功显示相应`品牌`的`图标`

![image-20220726165058838](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.4.4.png)

#### 5、其他需要展示的属性

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，在`品牌`的下面，删掉`价格`、`系统`、`热点`、`机身颜色`、`机身内存`，保留一个`屏幕尺寸`，修改里面的内容

![image-20220726165247466](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.5.1.png)

修改为如下内容，然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<!--其他的所有需要展示的属性-->
<div class="JD_pre" th:each="attr:${result.attrs}">
    <div class="sl_key">
        <span th:text="${attr.attrName}">屏幕尺寸：</span>
    </div>
    <div class="sl_value">
        <ul th:each="val:${attr.attrValue}">
            <li><a href="#" th:text="${val}"
                   th:href="${'javascript:searchProducts(&quot;attrs&quot;,&quot;'+attr.attrId+'_'+val+'&quot;)'}" >
                5.56英寸及以上</a></li>
        </ul>
    </div>
</div>
```

![image-20220727205559815](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.5.2.png)

可以看到`入网型号`属性已经显示出来了

![image-20220726165741784](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.5.3.png)

#### 6、增加`苹果`库存

浏览器输入`http://search.gulimall.com/list.html?catalog3Id=225&keyword=苹果`可以看到，都没有检索到数据，这是因为`苹果`的商品都没货，所以检索不到数据

![image-20220726171025918](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.6.1.png)

登录后台系统，在`商品系统/商品维护/商品管理`里面，可以看到`苹果`的商品有一个`skuId`为`9`

![image-20220726170523635](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.6.2.png)

点击`库存系统/商品库存`里的`新增`按钮，新增一个商品库存

`sku_id`输入`9`，`仓库`选择`1号仓库`，`库存数`输入`10`，`sku_name`输入`苹果手机`，`锁定库存`输入`0`，然后点击确定

![image-20220726170531116](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.6.3.png)

在`kibana`里，执行以下命令，将匹配到的数据的`hasStock`字段修改为`true`

```json
GET gulimall_product/_update_by_query
{
  "query": {
    "match": {
      "skuTitle": "苹果"
    }
  },
  "script": {
    "inline": "ctx._source['hasStock'] = 'true'"
  }
}
```

![image-20220726170900220](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.6.4.png)

在`kibana`里，执行`GET gulimall_product/_search`命令，可以看到`苹果`的`hasStock`已经变为`true`

![image-20220726171241380](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.6.5.png)

刷新`http://search.gulimall.com/list.html?catalog3Id=225&keyword=苹果`页面，可以看到已经查出数据了

![image-20220726171202781](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.6.6.png)

#### 7、增加可检索到的数据

在`kibana`里，执行以下命令，修改`ES`中`id`为`10`的数据，修改`1`号`attrId`的`attrValue`为`A13`，修改`2`号`attrId`的`attrValue`为`8G`、`attrName`为`内存容量`

```
POST gulimall_product/_doc/10
{
  "brandImg": "https://gulimall-anonymous.oss-cn-beijing.aliyuncs.com/2022-05-10/94d6c446-3d06-4e6e-8ddf-8da8f346f391_apple.png",
  "hasStock": "true",
  "skuTitle": "Apple IPhoneXS 苹果XS手机 银色 256GB",
  "brandName": "Apple",
  "hotScore": 0,
  "saleCount": 0,
  "skuPrice": "5000",
  "attrs": [
    {
      "attrId": 1,
      "attrValue": "A13",
      "attrName": "入网型号"
    },
    {
      "attrId": 2,
      "attrValue": "8G",
      "attrName": "内存容量"
    }
  ],
  "catalogName": "手机",
  "catalogId": 225,
  "brandId": 4,
  "spuId": 2,
  "skuId": 10
}
```

![image-20220726173519836](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.7.1.png)

然后在`kibana`里，执行以下命令，查询刚刚修改的`id`为`10`的数据，可以看到数据已经修改了

```
GET gulimall_product/_doc/10
```

![image-20220726173527413](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.7.2.png)

刷新`http://search.gulimall.com/list.html?catalog3Id=225&keyword=苹果`页面，可以看到`入网型号`多了`A13`，属性多了`内存容量`，其值为`8G`

![image-20220726173451002](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.7.3.png)

输入`http://search.gulimall.com/list.html?catalog3Id=225&keyword=手机`网址，可以看到`华为`和`苹果`的`品牌`、`入网型号`、`内存容量`都显示出来了

```
http://search.gulimall.com/list.html?catalog3Id=225&keyword=手机
```

![image-20220726173421220](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.7.4.png)

每次结果只能显示两个，结果有点少，因此可以修改`gulimall-search`模块的`com.atguigu.gulimall.search.constant.EsConstant`类的`PRODUCT_PAGE_SIZE`字段，把该字段修改为`16`

```java
public static final Integer PRODUCT_PAGE_SIZE = 16;
```

![image-20220726194412699](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.7.5.png)

刷新`http://search.gulimall.com/list.html?catalog3Id=225&keyword=手机`页面，可以看到该页显示了更多的商品数据

![image-20220726194648709](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.7.6.png)

#### 8、添加分类

把`品牌`修改为`<b>品牌：</b>`，复制`<!--其他的所有需要展示的属性-->`里的内容，粘贴到其上面，然后修改成分类的信息

点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<!--分类-->
<div class="JD_pre">
    <div class="sl_key">
        <span><b>分类：</b></span>
    </div>
    <div class="sl_value">
        <ul >
            <li th:each="catalog:${result.catalogs}">
                <a href="#" th:text="${catalog.catalogName}"></a>
            </li>
        </ul>
    </div>
</div>
```

![image-20220726193026530](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.8.1.png)

可以看到在`商品筛选`里，已经多了`分类`条件，其可选值为`手机`

![image-20220727211057758](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.8.2.png)

#### 9、添加筛选条件

##### 1、添加品牌筛选

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里添加如下方法，用于添加条件

```javascript
function searchProducts(name,value){
    location.href = location.href+"&"+name+"="+value;
}
```

![image-20220726194444104](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.1.1.png)

将`list.html`文件的`可选的品牌`里`class`为`sl_value`的`div`里的`<a>`标签改为如下代码，用于加参数跳转

```html
<a href="#" th:href="${'javascript:searchProducts(&quot;brandId&quot;,'+brand.brandId+')'}">
```

其中`&quot;`为`"`双引号，该代码相当于执行`javascript:searchProducts("brandId",brand.brandId)`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

![image-20220726194530101](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.1.2.png)

在`http://search.gulimall.com/list.html?catalog3Id=225&keyword=手机`页面里，点击`品牌`里的`华为`，可以看到已经跳转到了``http://search.gulimall.com/list.html?catalog3Id=225&keyword=手机&brandId=1`页面

![GIF 2022-7-26 19-48-28](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.1.3.gif)

##### 2、添加分类筛选

将`list.html`文件的`可选的分类`里的`class`为`sl_value`的`div`里的`<a>`标签修改为如下代码，用于加参数跳转

```html
<a th:href="${'javascript:searchProducts(&quot;catalog3Id&quot;,'+catalog.catalogId+')'}" th:text="${catalog.catalogName}"></a>
```

其中`&quot;`为`"`双引号，该代码相当于执行`javascript:searchProducts("catalog3Id",catalog.catalogId)`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

![image-20220726195357623](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.2.1.png)

在`http://search.gulimall.com/list.html`页面里，随便点击一个分类，此时的`url`为`http://search.gulimall.com/list.html&catalog3Id=225`，而不是`http://search.gulimall.com/list.html?catalog3Id=225`

![GIF 2022-7-26 19-54-36](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.2.2.gif)

修改`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里的` searchProducts(name,value)`方法，当没有参数的时候用`?`拼接，而不是用`&`拼接

```javascript
function searchProducts(name,value){
    if (location.href.toString().indexOf("?") < 0){
        location.href = location.href+"?"+name+"="+value;
    }else {
        location.href = location.href+"&"+name+"="+value;
    }
}
```

![image-20220726200128068](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.2.3.png)

再在`http://search.gulimall.com/list.html`页面里，随便点击一个分类，此时的`url`为`http://search.gulimall.com/list.html?catalog3Id=225`，已正确拼接了条件

![GIF 2022-7-26 20-01-54](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.2.4.gif)

##### 3、添加属性筛选

将`list.html`文件的`可选的属性`里的`class`为`sl_value`的`div`里的`<a>`标签修改为如下代码，用于加参数跳转

```html
<li><a href="#" th:text="${val}" th:href="${'javascript:searchProducts(&quot;attrs&quot;,&quot;'+attr.attrId+'_'+val+'&quot;)'}" >5.56英寸及以上</a></li>
```

其中`&quot;`为`"`双引号，该代码相当于执行`javascript:searchProducts("attrs","attr.attrId_val")`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

![image-20220726201041691](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.3.1.png)

打开`http://search.gulimall.com/list.html`页面，随便点一个`可选属性`的`属性值`，就来到了`http://search.gulimall.com/list.html?attrs=1_A2100`页面，可以看到以正确拼装了条件

![GIF 2022-7-26 20-09-25](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.3.2.gif)

##### 4、修复`bug`

###### 1、多属性添加

在`http://search.gulimall.com/list.html`页面里，点击`入网型号`里的`A13`，会来到`http://search.gulimall.com/list.html?attrs=1_A13`页面。但点击`内存容量`里的`8G`后来到了`http://search.gulimall.com/list.html?attrs=2_8G`页面，变成了替换要筛选的属性，而不是继续添加属性。

![GIF 2022-7-30 19-25-45](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.1.1.gif)

将`list.html`文件的`可选的属性`里的`class`为`sl_value`的`div`里的`<a>`标签修改为如下代码，使其调用`attrAddOrReplace(paramName, replaceVal)`方法，用来进行特殊处理

```html
<li><a href="#" th:text="${val}" th:href="${'javascript:attrAddOrReplace(&quot;attrs&quot;,&quot;'+attr.attrId+'_'+val+'&quot;)'}" >5.56英寸及以上</a></li>
```

![image-20220730200503761](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.1.2.png)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里添加如下方法，用来属性的添加与替换

```javascript
function attrAddOrReplace(paramName, replaceVal) {
    var oUrl = location.href.toString();
    let nUrl = oUrl;
    if (oUrl.endsWith("#")){
        oUrl = oUrl.substring(0,oUrl.length-1)
    }
    let dif = paramName + replaceVal.split("_")[0] +"_"
    //如果url没有该参数名就添加，有就替换;
    if (oUrl.indexOf(dif) != -1) {
        var re = eval('/(' + dif + '=)([^&]*)/gi');
        nUrl = oUrl.replace(re, paramName + '=' + replaceVal);
    } else {
        if (oUrl.indexOf("?") != -1) {
            nUrl = oUrl + "&" + paramName + '=' + replaceVal;
        } else {
            nUrl = oUrl + "?" + paramName + '=' + replaceVal;
        }
    }
    location.href = nUrl;
}
```

![image-20220730200644618](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.1.3.png)

在`http://search.gulimall.com/list.html`页面里，点击`入网型号`里的`A13`，会来到`http://search.gulimall.com/list.html?attrs=1_A13`页面。但点击`内存容量`里的`8G`后来正确来到了`http://search.gulimall.com/list.html?attrs=1_A13&attrs=2_8G`页面

![GIF 2022-7-30 20-03-05](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.1.4.gif)

###### 2、总是添加属性而不进行替换

当多次点击同一个`可选条件`的相同或不同的`可选值`时，同一个`可选条件`会不断添加，并不会替换为当前点击的``可选值`

比如在`http://search.gulimall.com/list.html`页面里，不断点击`品牌`为`华为`的可选值，该参数会不断添加成`http://search.gulimall.com/list.html?brandId=1&brandId=1&brandId=1&brandId=1&brandId=1&brandId=1`这样的`url`

![GIF 2022-7-26 20-18-46](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.2.1.gif)

修改`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里的` searchProducts(name,value)`方法，修改相同`可选条件`的`可选值`为最新`可选值`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
function searchProducts(name,value){

    var href = location.href.toString();
    var startIndex = href.indexOf(name);
    //如果url中有name参数
    if (startIndex >= 0){
        var endIndex = href.indexOf("&",startIndex);
        //如果name参数不是最后一个参数，替换掉name参数后，则还要加上后面的参数
        if (endIndex >= 0){
            location.href = href.substring(0,startIndex) + name +"=" + value + href.substring(endIndex)
        }else {
            location.href = href.substring(0,startIndex) + name +"=" + value
        }
    }else {
        //url中没有name参数，则新的url中name有可能是第一个参数
        if (location.href.toString().indexOf("?") < 0){
            location.href = location.href+"?"+name+"="+value;
        }else {
            location.href = location.href+"&"+name+"="+value;
        }
    }
}
```

![image-20220726204624453](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.2.2.png)

在`http://search.gulimall.com/list.html?brandId=1&catalog3Id=225&attrs=1_LIO-A00`页面里，不断点击`入网型号`为`LIO-A00`的可选值，该参数的`url`始终为`http://search.gulimall.com/list.html?brandId=1&catalog3Id=225&attrs=1_LIO-A00`

![GIF 2022-7-26 20-41-48](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.4.2.3.gif)

##### 5、添加关键字筛选

在`http://search.gulimall.com/list.html?catalog3Id=225&keyword=华为`页面里，打开控制台，定位到`搜索框`，复制`header_form`

![image-20220726201255304](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.5.1.png)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，将`class`为`header_form`的`div`里的`<input>`标签和`<a>`标签改为如下代码

```html
<div class="header_form">
    <input id="keyword_input" type="text" placeholder="手机" />
    <a href="javascript:searchByKeyword();">搜索</a>
</div>
```

![image-20220726204735176](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.5.2.png)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里添加如下方法，用于关键字搜索，使用关键字搜索会清除其他筛选条件

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
function searchByKeyword(){
    var href = location.href.toString();
    var index = href.indexOf("?");
    if (index>=0){
        location.href = href.substring(0,index) + "?keyword"+"="+$("#keyword_input").val();
    }else{
        location.href = href + "?keyword"+"="+$("#keyword_input").val();
    }
}
```

![image-20220726210238614](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.5.3.png)

打开`http://search.gulimall.com/list.html?brandId=1&attrs=1_LIO-A00`页面，进行关键词搜索，可以看到已经清楚了其他筛选条件，来到了`http://search.gulimall.com/list.html?keyword=华为`页面

![GIF 2022-7-26 21-00-44](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.5.4.gif)

如果不起作用，可以将`class`为`header_form`的`div`里的`<a>`标签，使用`src`属性，调用`js`代码

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件，再进行尝试

```html
<div class="header_form">
    <input id="keyword_input" type="text" placeholder="手机" />
    <a src="javascript:searchByKeyword();">搜索</a>
</div>
```

![image-20220726205119808](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.5.5.png)

##### 6、回显`关键词`

在`<input>`标签里添加`th:value="${param.keyword}`，表示在`url`里面获取`keyword`参数的值作为`value`属性的值。

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<div class="header_form">
    <input id="keyword_input" type="text" placeholder="手机" th:value="${param.keyword}"/>
    <a href="javascript:searchByKeyword();">搜索</a>
</div>
```

![image-20220729135851552](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.6.1.png)

可以看到，当在搜索框里搜索`商品`时，可以在`搜索框`里正确回显搜索的数据

![GIF 2022-7-29 13-52-47](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.9.6.2.gif)

#### 10、分页

##### 1、遍历页数&显示总页数

在`http://search.gulimall.com/list.html`页面里，打开控制台，定位到`分页`，复制`filter_page`

![image-20220726210456252](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.1.1.png)

然后在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，搜索`filter_page`，可以看到`分页`相关代码

修改页数代码，使其从`1`遍历到`result.totalPages`（`th:each="index:${#numbers.sequence(1,result.totalPages)}"`），并且如果遍历到`result.pageNum`（当前页）时对其应用`border: 0;color:#ee2222;background: #fff`样式，否则不应用（`th:style="${index == result.pageNum ? 'border: 0;color:#ee2222;background: #fff' : ''}"`)

并修改为动态的`共多少页`（`<em>共<b>[[${result.totalPages}]]</b>页&nbsp;&nbsp;到第</em>`）

```html
<!--分页-->
<div class="filter_page">
    <div class="page_wrap">
        <span class="page_span1">
            <a href="#">
                < 上一页
            </a>
            <a href="#"
               th:each="index:${#numbers.sequence(1,result.totalPages)}"
               th:style="${index == result.pageNum ? 'border: 0;color:#ee2222;background: #fff' : ''}"
            >[[${index}]]</a>
            <!--<a href="#" style="border: 0;font-size: 20px;color: #999;background: #fff">...</a>-->
            <!--<a href="#">169</a>-->
            <a href="#">
                下一页 >
            </a>
        </span>
        <span class="page_span2">
            <em>共<b>[[${result.totalPages}]]</b>页&nbsp;&nbsp;到第</em>
            <input type="number" value="1">
            <em>页</em>
            <a href="#">确定</a>
        </span>
    </div>
</div>
```

![image-20220726214221219](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.1.2.png)

修改`gulimall-search`模块的`com.atguigu.gulimall.search.constant.EsConstant`类的`PRODUCT_PAGE_SIZE`字段，把该字段修改为`6`，使数据能够多几页展示

然后重启`GulimallSearchApplication`服务

![image-20220728202822382](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.1.3.png)

在`kibana`里执行如下命令，把`苹果`商品都修改为有库存

```json
GET gulimall_product/_update_by_query
{
  "query": {
    "match": {
      "skuTitle": "苹果"
    }
  },
  "script": {
    "inline": "ctx._source['hasStock'] = 'true'"
  }
}
```

![image-20220728201454971](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.1.4.png)

执行以下命令，查询`苹果`商品的数据，可以看到都已经修改为有库存了

```json
GET gulimall_product/_search
{
  "query": {
    "match": {
      "skuTitle": "苹果"
    }
  }
}
```

![image-20220728201625835](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.1.5.png)

访问`http://search.gulimall.com/list.html?pageNum=2`页面，可以看到遍历`1~3`没问题，当前`pageNum=2`页(第二页)也应用了不同的样式，`共多少页`也正确显示了

但是`上一页`和`下一页`的样式还有问题

![image-20220728203022631](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.1.6.png)

##### 2、修改`上一页`和`下一页`样式

修改`list.html`文件里`分页`相关代码，如果当前页为`1`就对`上一页`置灰，否则对`上一页`不置灰。`th:style="${result.pageNum==1? 'color: #ccc;background: #fff;' : 'color: #000;background: #F0F0F1;'}"`

如果当前页为`最后一页`就对`下一页`置灰，否则对`下一页`不置灰。`th:style="${result.pageNum==result.totalPages? 'color: #ccc;background: #fff;' : 'color: #000;background: #F0F0F1;'}"`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<!--分页-->
<div class="filter_page">
    <div class="page_wrap">
        <span class="page_span1">
            <a href="#"
               th:style="${result.pageNum==1? 'color: #ccc;background: #fff;' : 'color: #000;background: #F0F0F1;'}"
            >
                < 上一页
            </a>
            <a href="#"
               th:each="index:${#numbers.sequence(1,result.totalPages)}"
               th:style="${index == result.pageNum ? 'border: 0;color:#ee2222;background: #fff' : ''}"
            >[[${index}]]</a>
            <!--<a href="#" style="border: 0;font-size: 20px;color: #999;background: #fff">...</a>-->
            <!--<a href="#">169</a>-->
            <a href="#"
               th:style="${result.pageNum==result.totalPages? 'color: #ccc;background: #fff;' : 'color: #000;background: #F0F0F1;'}"
            >
                下一页 >
            </a>
        </span>
        <span class="page_span2">
            <em>共<b>[[${result.totalPages}]]</b>页&nbsp;&nbsp;到第</em>
            <input type="number" value="1">
            <em>页</em>
            <a href="#">确定</a>
        </span>
    </div>
</div>
```

![image-20220728203204858](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.2.1.png)

访问`http://search.gulimall.com/list.html?pageNum=1`页面，可以看到当前页是第一页时，已经对`上一页`置灰了

![image-20220728203240624](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.2.2.png)

访问`http://search.gulimall.com/list.html?pageNum=2`页面，可以看到如果当前页既不是第一页，也不是最后一页，则`上一页`和`下一页`都不会置灰

![image-20220728203314064](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.2.3.png)

访问`http://search.gulimall.com/list.html?pageNum=3`页面，可以看到如果当前页是最后一页，则`下一页`置灰

![image-20220728203337157](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.2.4.png)

##### 3、跳转到`上一页`、`下一页`、`指定页`

在`list.html`文件里，`上一页`对应的`<a>`标签里添加`th:href="${'javascript:searchProducts(&quot;pageNum&quot;,'+(result.pageNum>1 ? result.pageNum -1 : 1)+')'}"`属性，如果是当前页是`第一页`就跳转到`第一页`，如果不是`第一页`就跳转到`上一页`。并删除该标签的` href="#"`属性

在`页码`对应的`<a>`标签里添加`th:href="${'javascript:searchProducts(&quot;pageNum&quot;,'+index+')'}"`属性，跳转到该`页码`对应的页数。并删除该标签的` href="#"`属性

在`下一页`对应的`<a>`标签里添加`th:href="${'javascript:searchProducts(&quot;pageNum&quot;,'+(result.pageNum<result.totalPages ? result.pageNum +1 : result.totalPages)+')'}"`属性，如果是当前页是`最后一页`就跳转到`最后一页`，如果不是`最后一页`就跳转到`下一页`。并删除该标签的` href="#"`属性

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<!--分页-->
<div class="filter_page">
    <div class="page_wrap">
        <span class="page_span1">
            <a
               th:style="${result.pageNum==1? 'color: #ccc;background: #fff;' : 'color: #000;background: #F0F0F1;'}"
               th:href="${'javascript:searchProducts(&quot;pageNum&quot;,'+(result.pageNum>1 ? result.pageNum -1 : 1)+')'}"
            >
                < 上一页
            </a>
            <a
               th:each="index:${#numbers.sequence(1,result.totalPages)}"
               th:style="${index == result.pageNum ? 'border: 0;color:#ee2222;background: #fff' : ''}"
               th:href="${'javascript:searchProducts(&quot;pageNum&quot;,'+index+')'}"
            >[[${index}]]</a>
            <!--<a href="#" style="border: 0;font-size: 20px;color: #999;background: #fff">...</a>-->
            <!--<a href="#">169</a>-->
            <a
               th:style="${result.pageNum==result.totalPages? 'color: #ccc;background: #fff;' : 'color: #000;background: #F0F0F1;'}"
               th:href="${'javascript:searchProducts(&quot;pageNum&quot;,'+(result.pageNum<result.totalPages ? result.pageNum +1 : result.totalPages)+')'}"
            >
                下一页 >
            </a>
        </span>
        <span class="page_span2">
            <em>共<b>[[${result.totalPages}]]</b>页&nbsp;&nbsp;到第</em>
            <input type="number" value="1">
            <em>页</em>
            <a href="#">确定</a>
        </span>
    </div>
</div>
```

![image-20220729142051353](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.3.1.png)

经测试可以看到`跳转到指定页`、`跳转到上一页`、`跳转到下一页`功能都正常

![GIF 2022-7-29 14-17-12](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.3.2.gif)

##### 4、跳转到`输入页`

在`list.html`文件里，`到第`与`页`中间的`<input>`标签里添加`id="pn"`属性，给该标签一个`id`，方便获取其值

添加`th:value="${param.pageNum}"`属性，表示在`url`里面获取`pageNum`参数的值作为`value`属性的值。然后删除`value="1" `属性

```html
<span class="page_span2">
    <em>共<b>[[${result.totalPages}]]</b>页&nbsp;&nbsp;到第</em>
    <input id="pn" type="number" th:value="${param.pageNum}">
    <em>页</em>
    <a th:href="${'javascript:toDirectPage()'}"
    >确定</a>
</span>
```

![image-20220729143931531](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.4.1.png)

在`<script>`标签里添加如下方法，用来获取要指定跳转的页的值，然后再跳转

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
function toDirectPage(){
    var pn = $("#pn").val();
    searchProducts("pageNum",pn);
}
```

![image-20220729144431616](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.4.2.png)

经测试可以发现已经可以成功跳转到`输入页`

![GIF 2022-7-29 14-45-58](https://gitlab.com/apzs/image/-/raw/master/image/5.5.5.10.4.3.gif)

### 5.5.6、完善检索页(2)

#### 1、按`综合排序`、`销量`、`价格`排序

##### 1、加红显示

在`http://search.gulimall.com/list.html?pageNum=2`页面里，打开控制台，定位到`综合排序`，复制`综合排序`

![image-20220729145326656](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.1.1.png)



然后在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，搜索`综合排序`，可以看到`综合排序`相关代码

![image-20220729145338358](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.1.2.png)

给`综合排序`、`销量`、`价格`、`评论分`、`上架时间`都加上`class="sort_a"`属性

```html
<!--综合排序-->
<div class="filter_top">
    <div class="filter_top_left">
        <a class="sort_a" href="#">综合排序</a>
        <a class="sort_a" href="#">销量</a>
        <a class="sort_a" href="#">价格</a>
        <a class="sort_a" href="#">评论分</a>
        <a class="sort_a" href="#">上架时间</a>
    </div>
    <div class="filter_top_right">
        <span class="fp-text">
           <b>1</b><em>/</em><i>169</i>
       </span>
        <a href="#" class="prev"><</a>
        <a href="#" class="next"> > </a>
    </div>
</div>
```

![image-20220729145540034](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.1.3.png)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里添加如下方法，用于对点击的`<a>`标签添加`红色背景`样式，并清除其他类含`sort_a`的`<a>`标签的`红色背景`样式(如果有该`红色背景`样式的话)

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
$(".sort_a").click(function () {
    $(".sort_a").css({"color":"#333","border-color":"#ccc","background":"#fff"})
    $(this).css({"color":"#FFF","border-color":"#e4393c","background":"#e4393c"})
    // 禁用默认行为（防止<a>标签进行页面跳转）
    return false;
})
```

![image-20220729150155480](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.1.4.png)

测试后可以看到当点击`综合排序`、`销量`、`价格`、`评论分`、`上架时间`的其中一个后，会给该`<a>`标签添加`红色背景`样式，并清除了其他同类的`红色背景`样式(如果有该`红色背景`样式的话)

![GIF 2022-7-29 15-06-59](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.1.5.gif)

##### 2、跳转页面

给`综合排序`、`销量`、`价格`分别添加自定义`sort="hotScore"`、`sort="saleCount"`、`sort="skuPrice"`属性，方便获取该标签传参所用的参数名

```html
<div class="filter_top_left">
    <a class="sort_a" sort="hotScore">综合排序</a>
    <a class="sort_a" sort="saleCount">销量</a>
    <a class="sort_a" sort="skuPrice">价格</a>
    <a class="sort_a" href="#">评论分</a>
    <a class="sort_a" href="#">上架时间</a>
</div>
```

![image-20220729190028764](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.2.1.png)

在`list.html`文件里，修改`.sort_a`绑定的点击事件，使其`url`添加`sort`字段

```javascript
$(".sort_a").click(function () {
    var href = location.href.toString();
    //如果url为升序，再点击就降序
    console.log(href.indexOf("asc"))
    if(href.indexOf("asc")>=0){
        searchProducts("sort",$(this).attr("sort")+"_desc")
    }else {
        searchProducts("sort",$(this).attr("sort")+"_asc")
    }
    // 禁用默认行为（防止<a>标签进行页面跳转）
    return false;
})
```

![image-20220729190117170](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.2.2.png)

添加页面加载时，自动触发的`js`代码，用于回显添加`红色背景`样式的`<a>`标签

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
window.onload = function (){
    let sortValue = getURLParamValue("sort");
    if (sortValue != null){
        changeStyle(sortValue)
    }
}

function changeStyle(sortValue){
    var split = sortValue.split("_");
    $("a[sort]").each(function () {
        if(split[0]==$(this).attr("sort")){
            //设置被点击的标签的样式为选中状态
            $(this).css({"color":"#FFF","border-color":"#e4393c","background":"#e4393c"})
            let text = $(this).text();
            if (split[1] == "asc"){
                text = text +"⬆"
            }else {
                text = text + "⬇"
            }
            $(this).text(text)
        }else {
            //清除该类的选中样式
            $(this).css({"color":"#333","border-color":"#ccc","background":"#fff"})
        }
    })
}

function getURLParamValue(param){
    let str = location.href.toString()
    let index = str.indexOf(param);
    if (index >=0){
        let startIndex = index + param.length + 1
        let endIndex = str.indexOf("&",startIndex);
        //如果parm是最后一个参数
        if (endIndex <= 0){
            endIndex = str.length;
        }
        return str.substring(startIndex, endIndex);
    }
    return null;
}
```

![image-20220729190227067](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.2.3.png)

测试后可以发现，可以正确的添加请求参数，并且回显了添加`红色背景`样式的`<a>`标签。但是在鼠标第一次悬浮到`价格`的时候，鼠标的样式为`I`，而不是`小手`的样式，而且没有`红色边框`，而且页面有很明显的抖动，对用户体验很不好，其实这些应该都是前端来做，而且这样请求很浪费服务器资源

![GIF 2022-7-29 18-55-22](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.2.4.gif)

##### 3、添加`鼠标经过`样式

在`changeStyle`的`js`方法的`$("a[sort]").each(function () {`下面添加如下代码，用于添加`鼠标经过`的`红色边框`样式和`鼠标离开`默认的`灰色边框`样式

`$(this).hover`方法有两个参数，第一个参数为`鼠标经过`样式,第二个参数为`鼠标离开`样式，必须写`鼠标离开`样式，否则鼠标离开了还是保持着`鼠标经过`的样式，和`css`样式不一样，`css`里写`鼠标经过`样式，`鼠标离开`后就变化的原来的样式

```javascript
if (getURLParamValue($(this).attr("sort")) == null){
    $(this).hover(function (){
        $(this).css({"cursor":"pointer","border":"1px solid #e4393c","color":"#e4393c","z-index": "1"})
    },function (){
        $(this).css({"cursor":"default","border":"1px solid #ccc","color":"#333","z-index": "0"})
    })
}
```

![image-20220729195054068](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.1.png)

在`<head>`标签里添加如下样式，给`sort_a`类的`<a>`标签的`鼠标经过`都应用`pointer`的鼠标样式

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```css
<style  type="text/css">
    a.sort_a:hover{
        cursor: pointer;
    }
</style>
```

![image-20220729195331121](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.2.png)

鼠标经过`综合排序`、`销量`、`价格`中任何一个时，都能变为`小手`的样式，并且也加上了`红色边框`的样式

![GIF 2022-7-29 19-53-57](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.3.gif)

:warning:不可以直接设置如下样式（可能是之前使用`JQuery`在`changeStyle`方法里对每个`sort_a`类的`<a>`标签都应用了`$(this).css({"color":"#FFF","border-color":"#e4393c","background":"#e4393c"})`或

`$(this).css({"color":"#333","border-color":"#ccc","background":"#fff"})`的`颜色`、`边框`、`背景`的样式吧，所以设置`鼠标经过`的`颜色`、`边框`的样式不成功，但设置`鼠标样式`却可以成功）

点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```css
<style  type="text/css">
    a.sort_a:hover{
        cursor: pointer;
        border: 1px solid #e4393c;
        color: #e4393c;
        z-index: 1;
    }
</style>
```

![image-20220729194021594](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.4.png)

如果这样设置就不会有鼠标经过的`红色边框`样式

![GIF 2022-7-29 19-44-30](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.5.gif)

:bookmark_tabs:在`list.html`文件里使用`JQuery`在`changeStyle`方法里对每个`sort_a`类的`<a>`标签都应用了`$(this).css({"color":"#FFF","border-color":"#e4393c","background":"#e4393c"})`或

`$(this).css({"color":"#333","border-color":"#ccc","background":"#fff"})`的`颜色`、`边框`、`背景`的样式

```javascript
function changeStyle(sortValue){
    var split = sortValue.split("_");
    $("a[sort]").each(function () {

        if(split[0]==$(this).attr("sort")){
            //设置被点击的标签的样式为选中状态
            $(this).css({"color":"#FFF","border-color":"#e4393c","background":"#e4393c"})
            let text = $(this).text();
            if (split[1] == "asc"){
                text = text +"⬆"
            }else {
                text = text + "⬇"
            }
            $(this).text(text)
        }else {
            //清除该类的选中样式
            $(this).css({"color":"#333","border-color":"#ccc","background":"#fff"})
        }
    })
}
```

![image-20220729194547892](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.6.png)

如果在`window.onload`里注释掉对`changeStyle(sortValue)`的方法调用，再在`<head>`标签里添加`鼠标形状`、`颜色`、`边框`样式

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<style  type="text/css">
    a.sort_a:hover{
        cursor: pointer;
        border: 1px solid #e4393c;
        color: #e4393c;
        z-index: 1;
    }
</style>
```

![image-20220729194732377](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.7.png)

这样就能成功使用原生的`css`里成功应用`鼠标经过`时的`鼠标形状`、`颜色`、`边框`等样式（由于还要调用`changeStyle(sortValue)`方法，所有并不能使用这种方式，测试完后别忘了改回来哟）

![GIF 2022-7-29 19-47-04](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.1.3.8.gif)

#### 2、按`价格区间`排序

##### 1、添加`价格区间`

修改`filter_top_left`类的`div`的标签内容，注释掉`评论分`和`上架时间`，并添加`价格区间`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<div class="filter_top_left">
    <a class="sort_a" sort="hotScore">综合排序</a>
    <a class="sort_a" sort="saleCount">销量</a>
    <a class="sort_a" sort="skuPrice">价格</a>
    <!--<a class="sort_a" href="#">评论分</a>-->
    <!--<a class="sort_a" href="#">上架时间</a>-->
    <span style="margin-left: 30px;font-size: 11px">价格区间</span>
    <input style="width: 100px;"> -
    <input style="width: 100px;">
    <input type="button" value="确定">
</div>
```

![image-20220729200604500](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.1.1.png)

可以看到`评论分`和`上架时间`已经没有了，也添加了`价格区间`

![image-20220729200625658](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.1.2.png)

##### 2、修改错误替换参数名的`bug`

给`价格区间`的`确定`按钮添加名为`skuPriceBtn`的`id`

```html
<div class="filter_top_left">
    <a class="sort_a" sort="hotScore">综合排序</a>
    <a class="sort_a" sort="saleCount">销量</a>
    <a class="sort_a" sort="skuPrice">价格</a>
    <!--<a class="sort_a" href="#">评论分</a>-->
    <!--<a class="sort_a" href="#">上架时间</a>-->
    <span style="margin-left: 30px;font-size: 11px">价格区间</span>
    <input style="width: 100px;"> -
    <input style="width: 100px;">
    <input id="skuPriceBtn" type="button" value="确定">
</div>
```

并在`<script>`标签里给`id`为`skuPriceBtn`的标签添加点击事件，获取到`最小值`和`最大值`后带着`skuPrice`参数进行跳转

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
$("#skuPriceBtn").click(function () {
    let from = $("#skuPriceFrom").val()
    let to = $("#skuPriceTo").val()
    searchProducts("skuPrice",from+"_"+to)
})
```

![image-20220729202313226](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.1.png)

在`http://search.gulimall.com/list.html?sort=skuPrice_asc`页面里，在最大值的输入框里输入`6000`后，点击`确定`按钮

来到了`http://search.gulimall.com/list.html?sort=skuPrice=_6000`的错误页面，这是因为查找到了`sort`参数里的`skuPrice_asc`，误以为这里的`skuPrice`是参数名，就将该参数名进行了替换

![GIF 2022-7-29 20-21-52](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.2.gif)



修改`list.html`文件里的`searchProducts(name,value)`方法，如果该`name`在`location.href`里不止出现一次，就调用` findParamIndex(href,name,0)`方法，判断哪个才是正真的`参数名`，而不是`参数值`里含有该`name`。该`name`只出现一次或者调用` findParamIndex(href,name,0)`方法获取到参数名的正真索引后，需要判断该索引是否存在，并且该索引是否是`参数名`的索引(如果该`name`只出现一次，有可能是`参数值`里含有该`name`)

(其实可以不判断该索引前一个元素是不是`&`或`?`，而判断该索引后一个元素是不是`=`，这样`findParamIndex(href,name,0)`根本就不用写，直接写`if (startIndex >= 0 && href.charAt(startIndex + 1) == '='`就行了。我这里想试一下`js`的递归，`js`的递归我还每写过:blush:)

```java
function searchProducts(name,value){
    let href = location.href.toString();
    if (href.endsWith("#")){
        href = href.substring(0,href.length-1)
    }
    let startIndex = href.indexOf(name);
    //如果url中有name参数
    console.log(href.indexOf(name),href.lastIndexOf(name))
    if ( startIndex != href.lastIndexOf(name)) {
        startIndex = findParamIndex(href,name,0);
    }
    if (startIndex >= 0 && (href.charAt(startIndex - 1) == '&' || href.charAt(startIndex - 1) == '?')) {
        var endIndex = href.indexOf("&", startIndex);
        //如果name参数不是最后一个参数，替换掉name参数后，则还要加上后面的参数
        if (endIndex >= 0) {
            location.href = href.substring(0, startIndex) + name + "=" + value + href.substring(endIndex)
        } else {
            location.href = href.substring(0, startIndex) + name + "=" + value
        }
    } else {
        //url中没有name参数，则新的url中name有可能是第一个参数
        if (location.href.toString().indexOf("?") < 0) {
            location.href = location.href + "?" + name + "=" + value;
        } else {
            location.href = location.href + "&" + name + "=" + value;
        }
    }

}

function findParamIndex(str,param,index) {
    if (index<0){
        return -1;
    }else {
        let startIndex = str.indexOf(param,index);
        if (startIndex!=-1 && (str.charAt(startIndex - 1) == '&' || str.charAt(startIndex - 1) == '?')){
            console.log(startIndex)
            return startIndex;
        }else {
            if (index+param.length < str.length){
                return findParamIndex(str,param,startIndex+param.length)
            }else {
                return -1;
            }
        }
    }
}
```

![image-20220801101135056](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.3.png)

并在`<script>`标签里修改`id`为`skuPriceBtn`的标签点的击事件，`最小值`和`最大值`不能同时为空时，才带着`skuPrice`参数进行跳转

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
$("#skuPriceBtn").click(function () {
    let from = $("#skuPriceFrom").val()
    let to = $("#skuPriceTo").val()
    if (from!="" || to!=""){
        searchProducts("skuPrice",from+"_"+to)
    }else {
        alert("价格区间不能为空！")
    }
})
```

![image-20220801105238406](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.4.png)

在`http://search.gulimall.com/list.html`页面里当`最小值`和`最大值`同时为空时，点击`确定`按钮，会弹出`价格区间不能为空！`的提示，当`最小值`和`最大值`其中任何一个不为空时，点击`确定`按钮，才可以进行跳转

![GIF 2022-7-29 21-19-40](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.5.gif)

在`http://search.gulimall.com/list.html?sort=skuPrice_asc`页面里测试也符合正确的逻辑，不会变为错误的`url`

![GIF 2022-7-29 21-22-24](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.6.gif)



在`http://search.gulimall.com/list.html?sort=skuPrice_asc&skuPrice=1_6666&pageNum=2`页面里测试，`skuPrice=1_6666`在所有参数中间也符合正确的逻辑，不会变为错误的`url`

![GIF 2022-7-29 21-25-48](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.2.7.gif)

##### 3、页码错误

没有商品数据时，页面遍历的页数开始为`1`

![image-20220729212306463](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.3.1.png)

把遍历页码用到的`th:each="index:${#numbers.sequence(1,result.totalPages)}"`修改为如下代码，如果`result.totalPages`为`0`就只遍历`0`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```
th:each="index: ${result.totalPages>0 ? #numbers.sequence(1,result.totalPages) : #numbers.sequence(0,0)}"
```

![image-20220729213045932](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.3.2.png)

在`http://search.gulimall.com/list.html?skuPrice=_33`页码里测试，可以发现只会显示第`0`页了，即使手动在`url`后面添加`&pageNum=2`参数也同样只能显示第`0`页

![GIF 2022-7-29 21-32-13](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.2.3.3.gif)

#### 3、仅显示有货

##### 1、默认有货无货都显示

修改`gulimall-search`模块`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`boolSearch`方法的相关设置是否有库存的逻辑，修改为默认有货无货都显示，只有指定了`仅显示有货`才仅显示有货的商品

然后重启`GulimallSearchApplication`服务

```java
//是否有库存
//"filter": [{"term": {"hasStock": {"value": "true"}}}]
if (searchParam.getHasStock()!=null) {
    boolean hasStock =  searchParam.getHasStock() == 1;
    boolQueryBuilder.filter(QueryBuilders.termQuery("hasStock", hasStock));
}
```

![image-20220730090539985](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.1.1.png)

刷新浏览器的如下网址的页面，然后查看`GulimallSearchApplication`服务的控制台

```
http://search.gulimall.com/list.html?pageNum=2
```

可以看到没有`hasStock`的信息

```json
{"from":6,"size":6,"query":{"bool":{"adjust_pure_negative":true,"boost":1.0}},"aggregations":{"brand_agg":{"terms":{"field":"brandId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"brand_name_agg":{"terms":{"field":"brandName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"brand_img_agg":{"terms":{"field":"brandImg","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"catalog_agg":{"terms":{"field":"catalogId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"catalog_name_agg":{"terms":{"field":"catalogName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"attr_agg":{"nested":{"path":"attrs"},"aggregations":{"attr_id_agg":{"terms":{"field":"attrs.attrId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"attr_name_agg":{"terms":{"field":"attrs.attrName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"attr_value_agg":{"terms":{"field":"attrs.attrValue","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}}}}}}
```

![image-20220730090715703](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.1.2.png)

在浏览器里输入如下网址，然后查看`GulimallSearchApplication`服务的控制台

```
http://search.gulimall.com/list.html?pageNum=2&hasStock=1
```

可以看到只有显式的指明了`hasStock=1`，才在查询字段里添加`hasStock=true`的查询条件

```json
{"from":6,"size":6,"query":{"bool":{"filter":[{"term":{"hasStock":{"value":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"aggregations":{"brand_agg":{"terms":{"field":"brandId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"brand_name_agg":{"terms":{"field":"brandName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"brand_img_agg":{"terms":{"field":"brandImg","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"catalog_agg":{"terms":{"field":"catalogId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"catalog_name_agg":{"terms":{"field":"catalogName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}},"attr_agg":{"nested":{"path":"attrs"},"aggregations":{"attr_id_agg":{"terms":{"field":"attrs.attrId","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]},"aggregations":{"attr_name_agg":{"terms":{"field":"attrs.attrName","size":1,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}},"attr_value_agg":{"terms":{"field":"attrs.attrValue","size":10,"min_doc_count":1,"shard_min_doc_count":0,"show_term_doc_count_error":false,"order":[{"_count":"desc"},{"_key":"asc"}]}}}}}}}}
```

![image-20220730090847529](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.1.3.png)

##### 2、添加`hasStock`请求参数

在`http://search.gulimall.com/list.html?pageNum=2`页面里，打开控制台，定位到`仅显示有货`，复制`仅显示有货`

![image-20220730090258883](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.2.1.png)

然后在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，搜索`仅显示有货`，可以看到`仅显示有货`相关代码，将相关代码修改为如下样式，在`仅显示有货`上面删除`<i>`标签，添加加一个`<input>`标签，在其`<a>`父标签里添加`th:with="hasSelect = ${param.hasStock}"`属性，用于暂存`url`里的`hasStock`参数，并给`<input>`添加名为`showHasStock`的`id`方便获取到该标签，并在`<input>`标签里添加`th:checked="${#strings.equals(hasSelect,'1')}"`用于回显是否选择了这个复选框

```html
<li>
    <a href="#" th:with="hasSelect = ${param.hasStock}">
        <input id="showHasStock" type="checkbox" th:checked="${#strings.equals(hasSelect,'1')}">
        仅显示有货
    </a>
</li>
```

![image-20220730101430137](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.2.2.png)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里添加如下几个方法，在该复选框状态改变后，跳转到新的`url`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
$("#showHasStock").change(function () {
    if($(this).prop("checked")){
        location.href = replaceOrAddParamVal(location.href,"hasStock","1")
    }else {
        location.href = removeParamVal(location.href,"hasStock")
    }

   return false;
})


function replaceOrAddParamVal(url, paramName, replaceVal) {
    var oUrl = url.toString();
    //如果url没有该参数名就添加，有就替换;
    if (oUrl.indexOf(paramName) != -1) {
        var re = eval('/(' + paramName + '=)([^&]*)/gi');
        var nUrl = oUrl.replace(re, paramName + '=' + replaceVal);
        return nUrl;
    } else {
        var nUrl = "";
        if (oUrl.indexOf("?") != -1) {
            nUrl = oUrl + "&" + paramName + '=' + replaceVal;
        } else {
            nUrl = oUrl + "?" + paramName + '=' + replaceVal;
        }
        return nUrl;
    }
}

function removeParamVal(url, paramName) {
    var oUrl = url.toString();
    //如果url有该参数名就删除参数
    let index = oUrl.indexOf(paramName);
    if (index != -1) {
        //pre为 ? 或 &
        let pre = oUrl.charAt(index-1);
        var re = eval('/(' + pre + paramName + '=)([^&]*)/gi');
        var nUrl = oUrl.replace(re, '');
        return nUrl;
    }
    return oUrl;
}
```

![image-20220730095547605](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.2.3.png)

在以下页面里，点击`仅显示有货`的左边复选框

```
http://search.gulimall.com/list.html?pageNum=2#
```

来到了如下页面，由于页面很多地方设置了`href="#"`，所有很有可能在`url`末尾添加上`#`，因此在添加新的参数之前需要删除最后面的`#`，然后再进行`替换`或`添加`属性(其实不添加该删除代码，替换并不会搜到影响)

```
http://search.gulimall.com/list.html?pageNum=2#&hasStock=1
```

![GIF 2022-7-30 9-57-25](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.2.4.gif)



##### 3、修复`bug`(1)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里，在`function replaceOrAddParamVal(url, paramName, replaceVal) {`方法的`var oUrl = url.toString();`下面添加一个判断，如果`url`最后为`#`，就去掉这个`#`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
if (oUrl.endsWith("#")){
    oUrl = oUrl.substring(0,oUrl.length-1)
}
```

![image-20220730101335302](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.3.1.png)

在`http://search.gulimall.com/list.html?pageNum=2#`页面里点击`仅显示有货`的左边复选框，然后就来到了`http://search.gulimall.com/list.html?pageNum=2&hasStock=1`页面，成功把最后的`#`截掉了

在`http://search.gulimall.com/list.html?pageNum=2&hasStock=1#`，取消`仅显示有货`的左边复选框的选中状态，然后就来到了`http://search.gulimall.com/list.html?pageNum=2`页面，成功把最后的`#`截掉了，不过这是碰巧截掉的（并不是我刚刚添加的代码戒掉的），删除该参数时会匹配到后面所有不为`&`的参数，所以也把`#`一起截掉了

![GIF 2022-7-30 10-15-46](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.3.2.gif)

但是如果在`http://search.gulimall.com/list.html?hasStock=1`，取消`仅显示有货`的左边复选框的选中状态，控制台就报错了，这是因为在`js正则`里，`?`为特殊符号，需要转义

```javascript
Uncaught SyntaxError: Invalid regular expression: /(?hasStock=)([^&]*)/: Invalid group
    at removeParamVal (list.html?hasStock=1:2360:50)
    at HTMLInputElement.<anonymous> (list.html?hasStock=1:2325:29)
    at HTMLInputElement.dispatch (jquery-1.12.4.js:5226:27)
    at elemData.handle (jquery-1.12.4.js:4878:28)
```

![GIF 2022-7-30 10-19-42](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.3.3.gif)

##### 4、修复`bug`(2)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里，修改`removeParamVal(url, paramName)`方法

对该参数名的前一个字符转义并删除，防止其是`?`，不过这里有问题，如果该`paramName`是第一个参数，但不是最后一个参数，就会把前面的`?`一起删了，后面就用`&`来拼接参数了

想要的`js正则`为`/(\?hasStock=)([^&]*)/gi`，使用两个`\\`为对`\`的转义，如果只使用一个`\`，`js`就会误以为是对后面`'`的转义，其实这里就是想要`\`，方便对拼接的`?`或`&`转义(`&`不需要转义)

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
function removeParamVal(url, paramName) {
    var oUrl = url.toString();
    //如果url有该参数名就删除参数
    let index = oUrl.indexOf(paramName);
    if (index != -1) {
        //pre为 ? 或 &
        let pre = oUrl.charAt(index-1);
        var re = eval('/(' +'\\' + pre + paramName + '=)([^&]*)/gi');
        var nUrl = oUrl.replace(re, '');
        return nUrl;
    }
    return oUrl;
}
```

![image-20220730102159120](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.4.1.png)

在`http://search.gulimall.com/list.html#`页面里点击`仅显示有货`的左边复选框，然后就来到了`http://search.gulimall.com/list.html?hasStock=1`页面，成功把最后的`#`截掉了

在`http://search.gulimall.com/list.html?hasStock=1#`页面里，取消`仅显示有货`的左边复选框的选中状态，就来到了`http://search.gulimall.com/list.html`页面，也成功把最后的`#`截掉了

此时的正则为`/(\?hasStock=)([^&]*)/gi`

![GIF 2022-7-30 10-23-10](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.4.2.gif)



在`http://search.gulimall.com/list.html?pageNum=2#`页面里点击`仅显示有货`的左边复选框，然后就来到了`http://search.gulimall.com/list.html?pageNum=2&hasStock=1`页面，成功把最后的`#`截掉了

在`http://search.gulimall.com/list.html?pageNum=2&hasStock=1#`，取消`仅显示有货`的左边复选框的选中状态，然后就来到了`http://search.gulimall.com/list.html?pageNum=2`页面，成功把最后的`#`截掉了，不过这是碰巧截掉的（并不是我刚刚添加的代码戒掉的），删除该参数时会匹配到后面所有不为`&`的参数，所以也把`#`一起截掉了

此时的正则为`/(\&hasStock=)([^&]*)/gi`

![GIF 2022-7-30 10-24-02](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.4.3.gif)

但是如果该`paramName`是第一个参数，但不是最后一个参数，就会把前面的`?`一起删了，后面就用`&`来拼接参数了，比如在`http://search.gulimall.com/list.html?hasStock=1&sort=saleCount_asc`页面里，取消`仅显示有货`的左边复选框的选中状态，就错误地拼接为`http://search.gulimall.com/list.html&sort=saleCount_asc`了

![GIF 2022-7-30 10-34-41](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.4.4.gif)





##### 5、修复`bug`(3)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里，修改`removeParamVal(url, paramName)`方法，判断该参数名的前一个字符是是什么，如果是`?`并且该参数后面没有别的参数后，在删除时还需要对`?`进行转义

```javascript
function removeParamVal(url, paramName) {
    var oUrl = url.toString();
    //如果url有该参数名就删除参数
    let index = oUrl.indexOf(paramName);
    if (index != -1) {
        //tag为 ? 或 &
        let tag = oUrl.charAt(index-1);
        let re;
        if (tag=='&'){
            re = eval('/(' + tag + paramName + '=)([^&]*)/gi');
        }else {
            // http://search.gulimall.com/list.html?hasStock=1&sort=saleCount_asc
            // http://search.gulimall.com/list.html?sort=saleCount_asc
            if (oUrl.indexOf("&",tag+paramName.length)!=-1){
                re = eval('/(' + paramName + '=)([^&]*&)/gi');
            }else {
                re = eval('/(' +"\?" + paramName + '=)([^&]*)/gi');
            }
        }

        console.log(re)
        var nUrl = oUrl.replace(re, '');
        return nUrl;
    }
    return oUrl;
}
```

![image-20220730104953971](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.5.1.png)

在`http://search.gulimall.com/list.html?attrs=1_A2100&hasStock=1&sort=saleCount_asc`页面里，取消`仅显示有货`的左边复选框的选中状态，就正确拼接为`http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc`了，

再次点击`仅显示有货`的左边复选框，也能正确拼接为`http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc&hasStock=1`

![GIF 2022-7-30 10-47-02](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.5.2.gif)

但是如果在`http://search.gulimall.com/list.html?hasStock=1`页面里，取消`仅显示有货`的左边复选框的选中状态，控制台又报错了

```javascript
VM5495:1 Uncaught SyntaxError: Invalid regular expression: /(?hasStock=)([^&]*)/: Invalid group
    at removeParamVal (list.html?hasStock=1:2369:54)
    at HTMLInputElement.<anonymous> (list.html?hasStock=1:2325:29)
    at HTMLInputElement.dispatch (jquery-1.12.4.js:5226:27)
    at elemData.handle (jquery-1.12.4.js:4878:28)
```

![GIF 2022-7-30 10-53-17](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.5.3.gif)

##### 6、修复`bug`(4)

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里，修改`removeParamVal(url, paramName)`方法，把` re = eval('/(' +"\?" + paramName + '=)([^&]*)/gi');`，修改为

```java
re = eval('/(' +"\\?" + paramName + '=)([^&]*)/gi');
```

此时的正则为`/(\\?hasStock=)([^&]*)/gi`，比上次的正则多了一个`\`，上次的正则为``/(\?hasStock=)([^&]*)/gi`

我也不知道为什么要将`\`再次转义，而上次不用

![image-20220730105422250](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.6.1.png)

在`http://search.gulimall.com/list.html?attrs=1_A2100&hasStock=1&sort=saleCount_asc#`页面里，取消`仅显示有货`的左边复选框的选中状态，成功来到了`http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc#`页面

![GIF 2022-7-30 10-56-20](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.6.2.gif)

##### :pencil:修改`searchProducts`方法

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里的`<script>`标签里，修改`searchProducts(name,value)`方法，在`et href = location.href.toString();`后面也加一条判断，如果最后的字符为`#`，也去掉该字符

```javascript
function searchProducts(name,value){
    let href = location.href.toString();
    if (href.endsWith("#")){
        href = href.substring(0,href.length-1)
    }
    let startIndex = href.indexOf(name);
    //如果url中有name参数
    console.log(href.indexOf(name),href.lastIndexOf(name))
    if ( startIndex != href.lastIndexOf(name)) {
        startIndex = findParamIndex(href,name,0);
    }
    if (startIndex >= 0 && (href.charAt(startIndex - 1) == '&' || href.charAt(startIndex - 1) == '?')) {
        var endIndex = href.indexOf("&", startIndex);
        //如果name参数不是最后一个参数，替换掉name参数后，则还要加上后面的参数
        if (endIndex >= 0) {
            location.href = href.substring(0, startIndex) + name + "=" + value + href.substring(endIndex)
        } else {
            location.href = href.substring(0, startIndex) + name + "=" + value
        }
    } else {
        //url中没有name参数，则新的url中name有可能是第一个参数
        if (location.href.toString().indexOf("?") < 0) {
            location.href = location.href + "?" + name + "=" + value;
        } else {
            location.href = location.href + "&" + name + "=" + value;
        }
    }

}
```

![image-20220730094502450](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.3.7.png)

#### 4、属性添加面包屑导航

##### 1、添加远程调用

复制`gulimall-product`模块`pom.xml`文件的`<spring-cloud.version>`，然后粘贴到`gulimall-search`模块`pom.xml`文件的相应位置

```xml
<spring-cloud.version>Greenwich.SR3</spring-cloud.version>
```

![image-20220730155823834](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.1.1.png)

在`gulimall-search`模块`pom.xml`文件里的`<dependencyManagement>`里指定`spring-cloud`的依赖的版本，该配置不会添加依赖，只会用于控制版本

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

![image-20220730155939119](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.1.2.png)

在`gulimall-search`模块`pom.xml`文件里的`<dependencies>`里添加如下依赖，用于远程调用

```xml
<dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

![image-20220730160200795](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.1.3.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplication`启动类上添加如下注解，用来开启远程调用功能

```java
@EnableFeignClients
```

![image-20220730160253460](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.1.4.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController`类里，修改`info`方法的`@RequestMapping("/info/{attrId}")`注解，将其改为`@GetMapping("/info/{attrId}")`，只接受`get`方法的调用

然后复制该方法的头部信息（`@GetMapping("/info/{attrId}")
public R info(@PathVariable("attrId") Long attrId)`）

![image-20220730160417143](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.1.5.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search`包下新建`feign`文件夹，在`feign`文件夹里添加`ProductFeignService`类，粘贴刚刚复制的头部信息，修改方法名，并将映射地址添加完整

```java
package com.atguigu.gulimall.search.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author 无名氏
 * @date 2022/7/30
 * @Description:
 */
@FeignClient("gulimall-product")
public interface ProductFeignService {

    @GetMapping("/product/attr/info/{attrId}")
    public R attrInfo(@PathVariable("attrId") Long attrId);
}
```

![image-20220730160711351](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.1.6.png)

##### 2、进行远程调用

在`gulimall-common`模块的`com.atguigu.common.to`包下新建`AttrRespTo`类，用于`gulimall-search`模块获取从`gulimall-product`传来的数据

由于`AttrRespVo`继承了`AttrVo`，关系比较复杂，因此不适合直接移动位置，因此可以写个完整的`AttrRespTo`用于数据传输

```java
package com.atguigu.common.to;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/7/30
 * @Description:
 */
@Data
public class AttrRespTo {

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

    /**
     * 值类型【0-只能单个值，1-允许多个值】
     */
    private Integer valueType;

    private Long attrGroupId;

    /**
     * 所属分类名   /手机/数码/手机
     */

    private String catelogName;
    /**
     * 所属分组名  主机
     */
    private String groupName;

    /**
     * 所属分类的完整路径
     */
    private Long[] catelogPath;
}
```

![image-20220730164710466](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.2.1.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.vo.SearchResult`类里添加如下代码，用于面包屑导航（其实面包屑导航更适合前端做）

```java
/**
 * 面包屑导航
 */
private List<NavVo> navs = new ArrayList<>();

@Data
public static class NavVo{
    /**
     * 导航名
     */
    private String navName;
    /**
     * 导航值
     */
    private String navValue;
    /**
     * 导航链接
     */
    private String link;
}
```

![image-20220730155710887](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.2.2.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里添加如下代码，用于构造面包屑

```java
@Autowired
ProductFeignService productFeignService;

List<SearchResult.NavVo> navs = null;
if (!CollectionUtils.isEmpty(searchParam.getAttrs())) {
    navs = searchParam.getAttrs().stream().map(attr -> {
        SearchResult.NavVo navVo = new SearchResult.NavVo();
        //attrs=1_安卓:其他
        //s[0]=1   s[1]=安卓:其他
        String[] s = attr.split("_");
        // "1_安卓:其他" ==> [1,安卓:其他]  length=2
        // "_安卓:其他"  ==>  [,_安卓:其他]  length=2
        if (s.length==2 && !attr.startsWith("_")){
            String attrId = s[0];
            //如果远程服务调用失败，就用id作为属性值
            String name = attrId;
            try {
                R r = productFeignService.attrInfo(Long.parseLong(attrId));
                if (r.getCode()==0){
                    Object attrVo = r.get("attr");
                    String attrString = JSON.toJSONString(attrVo);
                    AttrRespTo attrRespTo = JSON.parseObject(attrString, AttrRespTo.class);
                    name = attrRespTo.getAttrName();
                }
            }catch (Exception e){
                e.printStackTrace();
            }
            navVo.setNavName(name);
            //设置属性值
            navVo.setNavValue(s[1]);

            //取消这个导航栏需要跳转到的url
        }
        return navVo;
    }).collect(Collectors.toList());
}
searchResult.setNavs(navs);
```

![image-20220730165358765](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.2.3.png)

##### 3、取消这个导航栏要跳转到的url

在`gulimall-search`模块的`com.atguigu.gulimall.search.vo.SearchParam`类里添加字段，调用原生的方法，获取所有参数所组成的字符串（比如访问`http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc`，`queryString`就保存`attrs=1_A2100&sort=saleCount_asc`）

```javascript
/**
 * 调用原生的方法，获取所有参数的字符串
 */
private String queryString;
```

![image-20220730165546344](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.3.1.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.controller.SearchController`类里修改`listPage`方法，用于调用原生的`HttpServletRequest`类的`getQueryString`方法，获取所有参数的字符串并赋值给`SearchParam`类的`queryString`字段

```java
/**
 * 自动将页面提交过来的所有请求查询参数封装成指定的对象
 * @return
 */
@RequestMapping("/list.html")
public String listPage(SearchParam searchParam, Model model, HttpServletRequest httpServletRequest){
    searchParam.setQueryString(httpServletRequest.getQueryString());
    SearchResult result = mallSearchService.search(searchParam);
    model.addAttribute("result",result);
    return "list";
}
```

![image-20220730165854263](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.3.2.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.constant.EsConstant`常量类里添加`searchURI`字段，用于保存`检索页`的域名（其实放在该类并不合适，不过我懒得写了）

```java
/**
 * 检索页的url
 */
public static final String searchURI = "http://search.gulimall.com/list.html";
```

![image-20220730170318248](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.3.3.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里修改` navs = searchParam.getAttrs().stream().map`里的代码，用于设置`取消这个导航栏需要跳转到的url`

```java
List<SearchResult.NavVo> navs = null;
if (!CollectionUtils.isEmpty(searchParam.getAttrs())) {
    navs = searchParam.getAttrs().stream().map(attr -> {
        SearchResult.NavVo navVo = new SearchResult.NavVo();
        //attrs=1_安卓:其他
        //s[0]=1   s[1]=安卓:其他
        String[] s = attr.split("_");
        // "1_安卓:其他" ==> [1,安卓:其他]  length=2
        // "_安卓:其他"  ==>  [,_安卓:其他]  length=2
        if (s.length==2 && !attr.startsWith("_")){
            String attrId = s[0];
            //如果远程服务调用失败，就用id作为属性值
            String name = attrId;
            try {
                R r = productFeignService.attrInfo(Long.parseLong(attrId));
                if (r.getCode()==0){
                    Object attrVo = r.get("attr");
                    String attrString = JSON.toJSONString(attrVo);
                    AttrRespTo attrRespTo = JSON.parseObject(attrString, AttrRespTo.class);
                    name = attrRespTo.getAttrName();
                }
            }catch (Exception e){
                e.printStackTrace();
            }
            navVo.setNavName(name);
            //设置属性值
            navVo.setNavValue(s[1]);

            //取消这个导航栏需要跳转到的url
            String queryString = searchParam.getQueryString();
            String replace = "";
            String attrString = "attrs="+attr;
            int attrIndex = queryString.indexOf(attrString);
            if (queryString.startsWith(attrString)) {
                //判断该参数后面还有没有参数
                if (queryString.indexOf("&",attrIndex+1) >=0) {
                    //该属性是第一个参数，且不是最后一个参数
                    //http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc
                    replace = queryString.replace("attrs=" + attr +"&", "");
                }else {
                    //该参数是第一个参数，也是最后一个参数
                    //http://search.gulimall.com/list.html?attrs=1_A2100
                    replace = queryString.replace("attrs=" + attr, "");
                }
            }else {
                //该属性不是第一个参数
                //http://search.gulimall.com/list.html?hasStock=1&attrs=1_A2100
                replace = queryString.replace("&attrs=" + attr, "");
            }
            if (StringUtils.hasText(replace)){
                navVo.setLink(EsConstant.searchURI + "?" + replace);
            }else {
                navVo.setLink(EsConstant.searchURI);
            }
            
        }
        return navVo;
    }).collect(Collectors.toList());
}
searchResult.setNavs(navs);
```

![image-20220730185710988](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.3.4.png)

由于`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类的`getAttrInfo`方法经常使用，因此可以把结果放入到缓存中，供下次使用

`productFeignService.attrInfo(Long.parseLong(attrId));`方法会调用`gulimall-product`模块的`com.atguigu.gulimall.product.controller.AttrController#info`方法，而`info`方法又会调用`com.atguigu.gulimall.product.service.impl.AttrServiceImpl#getAttrInfo`方法，由于是远程调用可能非常耗时，因此可以加入缓存以提高查询效率

```
@Cacheable(value = "attr",key = "'attrInfo:'+ #root.args[0]")
```

![image-20220730203558184](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.3.5.png)

##### 4、测试

重启`GulimallProductApplication`服务和`GulimallSearchApplication`服务，在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里的`return navVo;`这里打上断点

在浏览器中输入如下网址

```
http://search.gulimall.com/list.html?hasStock=1&attrs=1_A2100
```

此时`SearchParam`类的`queryString`字段为`hasStock=1&attrs=1_A2100`

在`NavVo`类的`navValue`为`A2100`时，该类的`link`字段的值为

```
http://search.gulimall.com/list.html?hasStock=1
```

取消该属性确实是跳转到该`link`所在的页面

然后一直点击`Pause Program`按钮，放行完该请求，方便下次测试

![image-20220730181259014](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.4.1.png)

在浏览器中输入如下网址

```
http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc
```

此时`SearchParam`类的`queryString`字段为`attrs=1_A2100&sort=saleCount_asc`

在`NavVo`类的`navValue`为`A2100`时，该类的`link`字段的值为

```
http://search.gulimall.com/list.html?sort=saleCount_asc
```

取消该属性确实是跳转到该`link`所在的页面

然后一直点击`Pause Program`按钮，放行完该请求，方便下次测试

![image-20220730181453448](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.4.2.png)

在浏览器中输入如下网址

```
http://search.gulimall.com/list.html?attrs=1_A2100
```

此时`SearchParam`类的`queryString`字段为`attrs=1_A2100`

在`NavVo`类的`navValue`为`A2100`时，该类的`link`字段的值为

```
http://search.gulimall.com/list.html
```

取消该属性确实是跳转到该`link`所在的页面

然后一直点击`Pause Program`按钮，放行完该请求，方便下次测试

![image-20220730181628394](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.4.3.png)

但是在请求的参数里有中文或空格就会出现问题

先在`kibana`里修改`skuId`为`10`的数据，使其出现空格和中文

```json
POST gulimall_product/_doc/10
{
  "brandImg": "https://gulimall-anonymous.oss-cn-beijing.aliyuncs.com/2022-05-10/94d6c446-3d06-4e6e-8ddf-8da8f346f391_apple.png",
  "hasStock": "true",
  "skuTitle": "Apple IPhoneXS 苹果XS手机 银色 256GB",
  "brandName": "Apple",
  "hotScore": 0,
  "saleCount": 0,
  "skuPrice": "5000",
  "attrs": [
    {
      "attrId": 1,
      "attrValue": "A13 plus加强版",
      "attrName": "入网型号"
    },
    {
      "attrId": 2,
      "attrValue": "8G",
      "attrName": "内存容量"
    }
  ],
  "catalogName": "手机",
  "catalogId": 225,
  "brandId": 4,
  "spuId": 2,
  "skuId": 10
}
```

![image-20220730182241428](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.4.4.png)

在浏览器中输入如下网址

```
http://search.gulimall.com/list.html?attrs=1_A13 plus加强版
```

此时`SearchParam`类的`queryString`字段为`attrs=1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88`

而`attr`的值为`1_A13 plus加强版`，这样肯定匹配不到该字符串，肯定无法删除该字符串

![image-20220730182552437](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.4.5.png)

##### 5、修改代码后再次测试

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里的` navs = searchParam.getAttrs().stream().map`里的` String queryString = searchParam.getQueryString();`下面添加如下代码，用于将`attr`属性修改为`url`对应的格式

然后重启`GulimallSearchApplication`服务

```java
try {
    attr = URLEncoder.encode(attr, "UTF-8");
} catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
```

刷新`http://search.gulimall.com/list.html?attrs=1_A13 plus加强版`页面，可以看到`queryString`字段的值为

```
attrs=1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88
```

而`attr`字段的值为

```
1_A13+plus%E5%8A%A0%E5%BC%BA%E7%89%88
```

`jdk`的把` 空格`，转为了`+`，而浏览器则把`空格`转换为了`%20`

![image-20220730183333093](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.5.1.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplicationTests`测试类里添加`testCoder`测试方法

```java
@Test
public void testCoder() throws Exception{
   //jdk自带编码 java.net.URLDecoder; java.net.URLEncoder;
   System.out.println("jdk自带编码：");
   System.out.println("错误的编码： " + URLEncoder.encode("1_A13 plus加强版","UTF-8"));
   System.out.println("正确的编码： " + URLEncoder.encode("1_A13 plus加强版","UTF-8").replace("+","%20"));
   System.out.println(URLDecoder.decode("attrs=1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88","UTF-8"));
   //Spring提供的编码 org.springframework.web.util.UriUtils;
   System.out.println();
   System.out.println("Spring提供编码：");
   System.out.println(UriUtils.encode("1_A13 plus加强版", "UTF-8"));
   System.out.println(UriUtils.decode("attrs=1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88","UTF-8"));
}
```

可以看到`jdk`会把`空格`加码为`+`，而解码可以成功把`%20`解码为`空格`，使用`Spring`提供的`UriUtils`则不会出现这个问题

```
jdk自带编码：
错误的编码： 1_A13+plus%E5%8A%A0%E5%BC%BA%E7%89%88
正确的编码： 1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88
attrs=1_A13 plus加强版

Spring提供编码：
1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88
attrs=1_A13 plus加强版
```

![image-20220730184823672](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.5.2.png)

将

```java
try {
    attr = URLEncoder.encode(attr, "UTF-8");
} catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
```

修改为如下代码，使用`Spring`提供的加码方法

```java
attr = UriUtils.encode(attr, "UTF-8");
```

然后重启`GulimallSearchApplication`服务，刷新`http://search.gulimall.com/list.html?attrs=1_A13 plus加强版`页面

此时`SearchParam`类的`queryString`字段为`attrs=1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88`

attr字段的值为`1_A13%20plus%E5%8A%A0%E5%BC%BA%E7%89%88`，与`queryString`字段的`attrs`参数值一致

在`NavVo`类的`navValue`为`A13 plus加强版`时，该类的`link`字段的值为

```
http://search.gulimall.com/list.html
```

![image-20220730185201829](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.5.3.png)

##### 6、检索页添加`属性`面包屑导航

在`http://search.gulimall.com/list.html`页面里，打开控制台，定位到`手机`，复制`JD_ipone_one c`

![image-20220730213102247](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.6.1.png)

然后在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里，搜索`JD_ipone_one c`，可以看到`手机`面包屑相关代码，复制`class`为`JD_ipone_one c`的`div`，并粘贴到其下面，并修改部分代码，遍历`result.navs`里的`navName`和`navValue`

然后点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<!--面包屑导航-->
<div class="JD_ipone_one c">
    <a th:each="nav : ${result.navs}" th:href="${nav.link}">
        <span th:text="${nav.navName}"></span> ：
        <span th:text="${nav.navValue}"></span> ×
    </a>
</div>
<i><img src="/static/search/image/right-@1x.png" alt=""></i>
```

![image-20220730215338331](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.6.2.png)

在`http://search.gulimall.com/list.html`页面里，依次点击`A13 plus加强版`和`8G`，可以看到面包屑的链接地址正确，并且点击`×`后可以来到正确的页面

![GIF 2022-7-30 21-52-00](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.4.6.3.gif)

#### 5、品牌添加面包屑导航

##### 1、远程查询品牌列表

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.BrandController`类里，复制`info`方法，粘贴到其下面，修改部分代码，使其在`BrandServiceImpl`类里根据`brandIds`查询`Brands`(品牌列表)

复制该方法的头信息(`@GetMapping("/infos")
public R info(@RequestParam("brandIds") List<Long> brandIds)`)

```java
/**
 * 根据品牌id批量查询
 */
@GetMapping("/infos")
public R info(@RequestParam("brandIds") List<Long> brandIds) {

    List<BrandEntity> brand = brandService.getBrandsByIds(brandIds);

    return R.ok().put("brand", brand);
}
```

![image-20220730201920706](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.1.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.BrandService`接口里添加`getBrandsByIds`抽象方法

```java
List<BrandEntity> getBrandsByIds(List<Long> brandIds);
```

![image-20220730201954416](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.1.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.BrandServiceImpl`类里实现`getBrandsByIds`抽象方法，用于根据`brandIds`查询`Brands`(品牌列表)

```java
@Override
public List<BrandEntity> getBrandsByIds(List<Long> brandIds) {
    LambdaQueryWrapper<BrandEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.in(BrandEntity::getBrandId, brandIds);
    return this.baseMapper.selectList(lambdaQueryWrapper);
}
```

![image-20220730202231316](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.1.3.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.feign.ProductFeignService`接口里粘贴刚刚复制的头信息，并修改方法名为`branInfo`

```java
@GetMapping("/product/brand/infos")
public R branInfo(@RequestParam("brandIds") List<Long> brandIds);
```

![image-20220730202357233](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.1.4.png)

选中`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法的里用来实现`面包屑取消功能`的`删除该参数`的这部分代码，按`ctrl + alt + M`快捷键，将其抽取为一个方法，并修改部分代码

```java
private String replaceQueryString(String queryString,String key,String value) {
    String param = key + "=" + value;
    String replace;
    int attrIndex = queryString.indexOf(param);
    if (queryString.startsWith(param)) {
        //判断该参数后面还有没有参数
        if (queryString.indexOf("&",attrIndex+1) >=0) {
            //该属性是第一个参数，且不是最后一个参数
            //http://search.gulimall.com/list.html?attrs=1_A2100&sort=saleCount_asc
            replace = queryString.replace(key +"=" + value +"&", "");
        }else {
            //该参数是第一个参数，也是最后一个参数
            //http://search.gulimall.com/list.html?attrs=1_A2100
            replace = queryString.replace(key+"=" + value, "");
        }
    }else {
        //该属性不是第一个参数
        //http://search.gulimall.com/list.html?hasStock=1&attrs=1_A2100
        replace = queryString.replace("&"+key+"=" + value, "");
    }
    return replace;
}
```

![image-20220730211452452](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.1.5.png)

此时，在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法的里用来实现`面包屑取消功能`的`删除该参数`的这部分代码可以直接使用以下代码

```java
String queryString = searchParam.getQueryString();
String value = UriUtils.encode(attr,"UTF-8");
String replace = replaceQueryString(queryString,"attrs", value);
```

![image-20220730215002607](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.1.6.png)

##### 2、设置`品牌`是否在检索页显示

在`gulimall-search`模块的`src/main/resources/templates/list.html`文件里修改`品牌`相关的代码，在`class="JD_nav_logo"`的`<div>`里添加`th:with="brandId = ${param.brandId}"`属性，用于暂存`url`里的`brandId`，并在`class="JD_nav_wrap"`的`<div>`里添加`th:if="${#strings.isEmpty(brandId)}"`属性，当`brandId`为空时才显示

![image-20220731094816752](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.2.png)

```html
<div class="JD_nav_logo" th:with="brandId = ${param.brandId}">
    <!--品牌-->
    <div class="JD_nav_wrap" th:if="${#strings.isEmpty(brandId)}">
        <div class="sl_key">
            <span><b>品牌：</b></span>
        </div>
        <div class="sl_value">
            <div class="sl_value_logo">
                <ul>
                    <li th:each="brand:${result.brands}">
                        <a href="#" th:href="${'javascript:searchProducts(&quot;brandId&quot;,'+brand.brandId+')'}">
                            <img th:src="${brand.brandImg}" alt="">
                            <div th:text="${brand.brandName}">
                                华为(HUAWEI)
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sl_ext">
            <a href="#">
                更多
                <i style='background: url("/static/search/image/search.ele.png")no-repeat 3px 7px'></i>
                <b style='background: url("/static/search/image/search.ele.png")no-repeat 3px -44px'></b>
            </a>
            <a href="#">
                多选
                <i>+</i>
                <span>+</span>
            </a>
        </div>
    </div>
    <!--分类-->
    <div class="JD_pre">
        <div class="sl_key">
            <span><b>分类：</b></span>
        </div>
        <div class="sl_value">
            <ul >
                <li th:each="catalog:${result.catalogs}">
                    <a th:href="${'javascript:searchProducts(&quot;catalog3Id&quot;,'+catalog.catalogId+')'}" th:text="${catalog.catalogName}"></a>
                </li>
            </ul>
        </div>
    </div>
    <!--其他的所有需要展示的属性-->
    <div class="JD_pre" th:each="attr:${result.attrs}">
        <div class="sl_key">
            <span th:text="${attr.attrName}">屏幕尺寸：</span>
        </div>
        <div class="sl_value">
            <ul th:each="val:${attr.attrValue}">
                <li><a href="#" th:text="${val}" th:href="${'javascript:attrAddOrReplace(&quot;attrs&quot;,&quot;'+attr.attrId+'_'+val+'&quot;)'}" >5.56英寸及以上</a></li>
            </ul>
        </div>
    </div>
</div>
```

##### 3、测试

重启`GulimallProductApplication`服务和`GulimallSearchApplication`服务，访问如下页面，可以看到页面已经报错了

```
http://search.gulimall.com/list.html?brandId=1
```

![image-20220731094733723](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.3.1.png)

切换到`GulimallSearchApplication`服务的控制台，可以看到`MallSearchServiceImpl`类的`440`行报空指针

```
2022-07-31 09:46:19.277 ERROR 3232 --- [io-12000-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.NullPointerException] with root cause

java.lang.NullPointerException: null
	at com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl.buildSearchResponse(MallSearchServiceImpl.java:440) ~[classes/:na]
	at com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl.search(MallSearchServiceImpl.java:70) ~[classes/:na]
	at com.atguigu.gulimall.search.controller.SearchController.listPage(SearchController.java:31) ~[classes/:na]
```

![image-20220731094938202](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.3.2.png)

在`navs`的定义那里设置`List<SearchResult.NavVo> navs = null;`，有可能`searchParam.getAttrs())`为空，这样`navs`就不能赋值，此时在`navs`里添加就报空指针异常了，可以让`navs = new ArrayList<>();`，这样即使`searchParam.getAttrs())`为空了页不会空指针了

```
List<SearchResult.NavVo> navs = new ArrayList<>();
```

![image-20220731095017619](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.3.3.png)

重启`GulimallProductApplication`服务和`GulimallSearchApplication`服务，访问`http://search.gulimall.com/list.html`页面，点击`A13 plus加强版`，由于`华为`的`入网型号`里没有`A13 plus加强版`属性值，所以`华为`品牌不显示。再次点击`8G`，可以看到取消`A13 plus加强版`或`8G`后请求的`url`都正确

![GIF 2022-7-30 21-52-00](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.5.3.4.png)

#### 6、不显示已经选择过的属性

在`gulimall-search`模块的`com.atguigu.gulimall.search.vo.SearchResult`类里添加`attrIds`字段，用于判断路径是否包含该`attr`，如果包含该`attr`，在面包屑上就已经显示了，不需要在筛选里面显示了

```java
/**
 * 路径是否包含该attr，如果包含该attr，在面包屑上就已经显示了，不需要在筛选里面显示了
 */
private List<Long> attrIds = new ArrayList<>();
```

![image-20220731101339203](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.6.1.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的`buildSearchResponse`方法里的`String attrId = s[0];`下面添加如下代码，用于表面该字段已经在面包屑中显示了

```
searchResult.getAttrIds().add(Long.parseLong(attrId));
```

![image-20220731101304593](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.6.2.png)

在`他的所有需要展示的属性`里的`class="JD_pre"`的`<div>`里添加`th:if="${!#lists.contains(result.attrIds,attr.attrId)}"`属性，表示如果`result.attrIds`里面存在此次遍历的`attr.attrId`，就不显示该`attr.attrName`

```html
<!--其他的所有需要展示的属性-->
<div class="JD_pre" th:each="attr:${result.attrs}" th:if="${!#lists.contains(result.attrIds,attr.attrId)}">
    <div class="sl_key">
        <span th:text="${attr.attrName}">屏幕尺寸：</span>
    </div>
    <div class="sl_value">
        <ul th:each="val:${attr.attrValue}">
            <li><a href="#" th:text="${val}" th:href="${'javascript:attrAddOrReplace(&quot;attrs&quot;,&quot;'+attr.attrId+'_'+val+'&quot;)'}" >5.56英寸及以上</a></li>
        </ul>
    </div>
</div>
```

![image-20220731101651964](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.6.3.png)

重启`GulimallSearchApplication`服务，可以看到在点击某个`品牌`或`属性`后，该`品牌`或`属性`会在面包屑中显示，而不会在筛选里面显示了。当取消面包屑里的`品牌`或`属性`后，会再次在筛选里面显示

![GIF 2022-7-31 10-17-36](https://gitlab.com/apzs/image/-/raw/master/image/5.5.6.6.4.gif)

`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.MallSearchServiceImpl`类的完整代码

[点击查看`MallSearchServiceImpl`类的完整代码](code/)
