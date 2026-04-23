## 运行Java项目

所需软件

| 工具              | 版本   | 官方网站                                                     | 下载地址                                                     |
| ----------------- | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| jdk               | 1.8    | [java](https://www.java.com/zh-CN/)                          | [点击下载](https://download.oracle.com/otn/java/jdk/8u351-b10/10e8cce67c7843478f41411b7003171c/jdk-8u351-windows-x64.exe) |
| maven             | 3.6.1  | [Maven – Welcome to Apache Maven](https://maven.apache.org/index.html) | [点击下载](https://archive.apache.org/dist/maven/maven-3/3.6.1/binaries/apache-maven-3.6.1-bin.zip) |
| mysql             | 5.7    | [mysql](https://www.mysql.com/)                              | [点击查看镜像](https://hub.docker.com/layers/library/mysql/5.7/images/sha256-bd0fb5a175fc225ce9c2c4357c0f532bda1413e0b8555a157770f92daa5a89e0?context=explore) |
| nacos             | 1.1.3  | [nacos](https://nacos.io/zh-cn)                              | [点击下载](https://github.com/alibaba/nacos/releases/download/1.1.3/nacos-server-1.1.3.zip) |
| nginx             | 1.10   | [nginx](http://nginx.org/)                                   | [点击查看镜像](https://hub.docker.com/layers/library/nginx/1.10/images/sha256-0346349a1a640da9535acfc0f68be9d9b81e85957725ecb76f3b522f4e2f0455?context=explore) |
| redis             | latest | [redis](https://redis.io/)                                   | [点击查看镜像](https://hub.docker.com/_/redis/tags)          |
| seata             | 0.7.1  | [seata](https://seata.io/zh-cn/)                             | [点击下载](https://github.com/seata/seata/releases/download/v0.7.1/seata-server-0.7.1.zip) |
| rabbitmq          | latest | [rabbitmq](https://www.rabbitmq.com/)                        | [点击查看镜像](https://hub.docker.com/_/rabbitmq/tags)       |
| kibana            | 7.4.2  | [kibana](https://www.elastic.co/cn/kibana/)                  | [点击查看镜像](https://hub.docker.com/layers/library/kibana/7.4.2/images/sha256-d10acb82cc2872b4eb1319eff2d693c47be62d1bb22520f28000a596a637f727?context=explore) |
| elasticsearch     | 7.4.2  | [elasticsearch](https://www.elastic.co/cn/elasticsearch/)    | [点击查看镜像](https://hub.docker.com/layers/library/elasticsearch/7.4.2/images/sha256-2e64ba56162a7a46748be2a27c172fe862038f2c093be4ed5cb39cac3580d873?context=explore) |
| openzipkin/zipkin | latest | [zipkin](https://zipkin.io/)                                 | [点击查看镜像](https://hub.docker.com/r/openzipkin/zipkin/tags) |

点击`Customize`里的`All settings...`

![image-20221128131705752](./image/image-20221128131705752.png)

在`Build,Execution, Deployment`的`Build Tools`的`Maven`，修改为自己`Maven`的路径

![image-20221128131648206](./image/image-20221128131648206.png)

编码全部设为`UTF-8`，一定要勾选`Transparent native-to-ascii conversion`将文件转码为`UTF-8`

![image-20221221085502080](./image/image-20221221085502080.png)

然后打开，一直等，等到下载全部完成，大概需要10分钟

![image-20221128132317300](./image/image-20221128132317300.png)

下载完成后，如果这个`pom.xml`文件是橘红色，右键选择`Add as Maven Project`就行了

![image-20221128140727671](./image/image-20221128140727671.png)

首先运行网关模块，运行网关模块之前需要启动`nacos`

双击`\bin\startup.cmd`即可

![image-20221128162043956](./image/image-20221128162043956.png)

没报错就证明成功了

![image-20221128162020403](./image/image-20221128162020403.png)

然后运行网关模块

![image-20221128141829648](./image/image-20221128141829648.png)

#### 错误1

这个错误是有些模块的语法用的不是jdk8

```bash
D:\gulimall\gulimall-common\src\main\java\com\atguigu\common\utils\Query.java:44:33
java: -source 1.5 中不支持 diamond 运算符
  (请使用 -source 7 或更高版本以启用 diamond 运算符)
```

![image-20221128141054713](./image/image-20221128141054713.png)



![image-20221128141220901](./image/image-20221128141220901.png)



![image-20221128141241194](./image/image-20221128141241194.png)

吧这些模块都改为`8 - Lambdas, type annotations etc.`

![image-20221128141305540](./image/image-20221128141305540.png)



![image-20221128142143762](./image/image-20221128142143762.png)



![image-20221128142123687](./image/image-20221128142123687.png)



#### 错误2

这是因为刚刚使用的低版本的`jdk`编译的，清除一下缓存就行了

```bash
java: Compilation failed: internal java compiler error
```

![image-20221128141541050](./image/image-20221128141541050.png)



![image-20221128141701108](./image/image-20221128141701108.png)

网关模块运行成功

![image-20221128161914374](./image/image-20221128161914374.png)

`maven`打包，先禁用`test`

![image-20221128162231874](./image/image-20221128162231874.png)

然后点击`install`

![image-20221128162258372](./image/image-20221128162258372.png)



错误3

![image-20221128160956167](./image/image-20221128160956167.png)

这些模块的`Language level:`全部修改为`8 - Lambdas, type annotations etc.`(我已经修改过了，不知道怎么回事又变回去了)

![image-20221128162403142](./image/image-20221128162403142.png)

这些模块的`jdk`版本我已经修改为`1.8`了，又给我变成`1.5`了，再次修改过来

![image-20221128161634858](./image/image-20221128161634858.png)



```xml
  <proxies>
 	<profile>
        <id>jdk1.8</id>
        <activation>
        	<activeByDefault>true</activeByDefault>
        	<jdk>1.8</jdk>
        </activation>
        <properties>
            <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
            <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
        </properties>
	</profile>
  </proxies>
```

![image-20221128161207030](./image/image-20221128161207030.png)

至此，项目全部打包完成

![image-20221128162631181](./image/image-20221128162631181.png)





## 运行mysql

下载`mysql:5.7`镜像

```bash
sudo docker pull mysql:5.7
```

使用如下命令启动mysql

```bash
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```

如果报错了，可以使用如下命令(即`mysql`把`/etc/mysql`目录下的配置文件移动到了`/etc/mysql/conf.d`)

```bash
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7
```

> 运行mysql8容器命令
>
> ```bash
> docker run -d \
> -p 3306:3306 --name mysql \
> -v /mydata/mysql/log:/var/log/mysql \
> -v /mydata/mysql/data:/var/lib/mysql \
> -v /mydata/mysql/conf:/etc/mysql/conf.d \
> -e MYSQL_ROOT_PASSWORD=root \
>  mysql:8.0.29
> ```

设置容器自启动

```bash
docker  update --restart=always mysql
```

## 添加数据

将`mydata`移动到`linux`的根目录

![image-20221221101405719](./image/image-20221221101405719.png)



![image-20221221101537483](./image/image-20221221101537483.png)

如果是第二个命令运行的(即挂载mysql的`/etc/mysql/conf.d`)

使用`docker logs mysql`命令，查看日志会报如下错误：

```bash
mysqld: [ERROR] Fatal error in defaults handling. Program aborted!
2022-12-21 01:45:28+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 5.7.40-1.el7 started.
2022-12-21 01:45:28+00:00 [ERROR] [Entrypoint]: mysqld failed while attempting to check config
        command was: mysqld --verbose --help --log-bin-index=/tmp/tmp.9UoxqfaUar
        mysqld: Can't read dir of '/etc/mysql/conf.d/' (Errcode: 2 - No such file or directory)
mysqld: [ERROR] Fatal error in defaults handling. Program aborted!
```

![image-20221221102257888](./image/image-20221221102257888.png)

需要将`/mydata/mysql`里的`conf`文件夹删掉

![image-20221221101907214](./image/image-20221221101907214.png)

然后使用我提供的这个`conf`

![image-20221221102030424](./image/image-20221221102030424.png)

测试连接：

![image-20221221102552698](./image/image-20221221102552698.png)

此时数据都显示出来了

![image-20221221102622790](./image/image-20221221102622790.png)

## 运行redis

下载最新的redis

```bash
docker pull redis
```

运行redis

```bash
docker run -p 6379:6379 --name redis \
-v /mydata/redis/data:/data \
-v /mydata/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf
```



```
docker  update --restart=always redis
```



## 运行nginx

下载并运行nginx

```bash
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.10
```



```bash
docker  update --restart=always nginx
```



## 运行elasticsearch

```bash
docker pull elasticsearch:7.4.2
```



```bash
docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
-e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.4.2
```



```
docker  update --restart=always elasticsearch
```

使用`docker ps -a`命令，发现没有启动

![image-20221221130302887](./image/image-20221221130302887.png)

使用`docker logs elasticsearch`命令，查看日志，报了没有权限的异常

```bash
"Caused by: java.nio.file.AccessDeniedException: /usr/share/elasticsearch/data/nodes/0/node.lock",
"at sun.nio.fs.UnixException.translateToIOException(UnixException.java:90) ~[?:?]",
"at sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:111) ~[?:?]",
"at sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:116) ~[?:?]",
"at sun.nio.fs.UnixFileSystemProvider.newFileChannel(UnixFileSystemProvider.java:182) ~[?:?]",
"at java.nio.channels.FileChannel.open(FileChannel.java:292) ~[?:?]",
"at java.nio.channels.FileChannel.open(FileChannel.java:345) ~[?:?]",
"at org.apache.lucene.store.NativeFSLockFactory.obtainFSLock(NativeFSLockFactory.java:125) ~[lucene-core-8.2.0.jar:8.2.0 31d7ec7bbfdcd2c4cc61d9d35e962165410b65fe - ivera - 2019-07-19 15:05:56]",
"at org.apache.lucene.store.FSLockFactory.obtainLock(FSLockFactory.java:41) ~[lucene-core-8.2.0.jar:8.2.0 31d7ec7bbfdcd2c4cc61d9d35e962165410b65fe - ivera - 2019-07-19 15:05:56]",
"at org.apache.lucene.store.BaseDirectory.obtainLock(BaseDirectory.java:45) ~[lucene-core-8.2.0.jar:8.2.0 31d7ec7bbfdcd2c4cc61d9d35e962165410b65fe - ivera - 2019-07-19 15:05:56]",
"at org.elasticsearch.env.NodeEnvironment$NodeLock.<init>(NodeEnvironment.java:214) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.env.NodeEnvironment.<init>(NodeEnvironment.java:269) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.node.Node.<init>(Node.java:275) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.node.Node.<init>(Node.java:255) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Bootstrap$5.<init>(Bootstrap.java:221) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Bootstrap.setup(Bootstrap.java:221) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:349) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:159) ~[elasticsearch-7.4.2.jar:7.4.2]",
"... 6 more"] }
```

![image-20221221130206529](./image/image-20221221130206529.png)



进入`/mydata/`目录，使用如下命令，修改elasticsearch文件夹的用户权限

```
chmod -R 777 elasticsearch
```

![image-20221221131202311](./image/image-20221221131202311.png)

过了一会又报了一个新的错误

```bash
"Caused by: java.io.IOException: failed to find metadata for existing index newbank [location: jPkFm8qRSNmRogBqujQyyA, generation: 309]",
"at org.elasticsearch.gateway.MetaStateService.loadFullState(MetaStateService.java:99) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.gateway.GatewayMetaState.upgradeMetaData(GatewayMetaState.java:141) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.gateway.GatewayMetaState.<init>(GatewayMetaState.java:95) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.node.Node.<init>(Node.java:485) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.node.Node.<init>(Node.java:255) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Bootstrap$5.<init>(Bootstrap.java:221) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Bootstrap.setup(Bootstrap.java:221) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:349) ~[elasticsearch-7.4.2.jar:7.4.2]",
"at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:159) ~[elasticsearch-7.4.2.jar:7.4.2]",
"... 6 more"] }
```

![image-20221221140030067](./image/image-20221221140030067.png)

这是因为是直接将数据复制过来的，删掉`data/nodes/0/_state/`里`manifest`开头的文件就行了

```bash
cd /mydata/elasticsearch/data/nodes/0/_state/
rm -rf manifest-2442.st
docker start elasticsearch
docker ps
```

![image-20221221140524239](./image/image-20221221140524239.png)

## 运行kibana



```bash
docker pull kibana:7.4.2
```



```bash
docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.56.10:9200 -p 5601:5601 \
-d kibana:7.4.2
```



```bash
docker  update --restart=always kibana
```

直接访问 http://192.168.56.10:5601/ 就行了

![image-20221221140557478](./image/image-20221221140557478.png)

## rabbitmq

```bash
docker run -d --name rabbitmq
-p 5671:5671 -p 5672:5672 -p 4369:4369 -p  25672:25672 -p 15671:15671 -p 15672:15672  
rabbitmq:management
```



```bash
docker  update --restart=always rabbitmq
```

![image-20221221141448985](./image/image-20221221141448985.png)

直接访问 http://192.168.56.10:15672/ 即可

![image-20221221141506778](./image/image-20221221141506778.png)

## zipkin



```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```



```bash
docker  update --restart=always frosty_shamir
```

访问  http://192.168.56.10:9411/ 即可

![image-20221221142555321](./image/image-20221221142555321.png)

## 修改Host文件

在`C:\Windows\System32\drivers\etc`文件夹里的`hosts`文件里，添加配置，然后保存

```properties
192.168.56.10  gulimall.com
192.168.56.10  search.gulimall.com
192.168.56.10  item.gulimall.com
192.168.56.10  auth.gulimall.com
192.168.56.10  cart.gulimall.com
192.168.56.10  order.gulimall.com
192.168.56.10  member.gulimall.com
192.168.56.10  seckill.gulimall.com
```

![image-20221221113653615](./image/image-20221221113653615.png)

## 启动nacos和seata

双击`nacos\bin\startup.cmd`

![image-20221221154424514](./image/image-20221221154424514.png)



seata需要将`conf\registry.conf`文件里的`type`修改为`nacos`，`nacos.serverAddr`修改为`localhost:8848`

![image-20221221155845058](./image/image-20221221155845058.png)

双击`seata-server-0.7.1\bin\seata-server.bat`

![image-20221221154523474](./image/image-20221221154523474.png)

如果不修改seata配置，`gulimall-order`模块会报如下错误

```bash
2022-12-21 15:48:40.149 ERROR [gulimall-order,,,] 21648 --- [imeoutChecker_1] i.s.c.r.netty.NettyClientChannelManager  : no available server to connect.
```

![image-20221221160234107](./image/image-20221221160234107.png)



## 运行各个模块

报`nacos`的错不用管

![image-20221221152459468](./image/image-20221221152459468.png)



报了`rabbitmq`的错误

```bash
Caused by: org.springframework.amqp.rabbit.listener.BlockingQueueConsumer$DeclarationException: Failed to declare queue(s):[hello-java-queue]
	at org.springframework.amqp.rabbit.listener.BlockingQueueConsumer.attemptPassiveDeclarations(BlockingQueueConsumer.java:711) ~[spring-rabbit-2.1.8.RELEASE.jar:2.1.8.RELEASE]
	at org.springframework.amqp.rabbit.listener.BlockingQueueConsumer.passiveDeclarations(BlockingQueueConsumer.java:595) ~[spring-rabbit-2.1.8.RELEASE.jar:2.1.8.RELEASE]
	... 4 common frames omitted
```

![image-20221221151337558](./image/image-20221221151337558.png)



这是因为没有名为`hello-java-queue`的队列，注释掉`gulimall-order`模块的`com.atguigu.gulimall.order.test.ReceiveMessage2`类的`@RabbitListener(queues = {"hello-java-queue"})`即可

![image-20221221153952680](./image/image-20221221153952680.png)

## 运行前端后台管理项目

使用`10.16.3`版本的[node.js](https://nodejs.org/dist/v10.16.3/)

![image-20221222133322476](./image/image-20221222133322476.png)

使用`node -v`验证版本

![image-20221222133454803](./image/image-20221222133454803.png)

然后在cmd中执行如下命令

```bash
## 添加淘宝镜像
npm config set registry http://registry.npm.taobao.org/
## 设置全局包下载路径(相当于maven的仓库)
npm config set cache "D:/nodejs/npm_global"
## 设置缓存文件位置
npm config set prefix "D:/nodejs/npm_cache"
```

![image-20221222134851281](./image/image-20221222134851281.png)

使用`npm install`命令下载依赖，报了如下错误

```bash
<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 00007FF7CCE7DD8A v8::internal::GCIdleTimeHandler::GCIdleTimeHandler+4506
 2: 00007FF7CCE58886 node::MakeCallback+4534
 3: 00007FF7CCE59200 node_module_register+2032
 4: 00007FF7CD1730DE v8::internal::FatalProcessOutOfMemory+846
 5: 00007FF7CD17300F v8::internal::FatalProcessOutOfMemory+639
 6: 00007FF7CD359804 v8::internal::Heap::MaxHeapGrowingFactor+9620
 7: 00007FF7CD3507E6 v8::internal::ScavengeJob::operator=+24550
 8: 00007FF7CD34EE3C v8::internal::ScavengeJob::operator=+17980
 9: 00007FF7CD354D87 v8::internal::Heap::CreateFillerObjectAt+1175
10: 00007FF7CD6F27D3 v8::internal::NativesCollection<0>::GetScriptsSource+547
11: 00007FF7CCDDFD92 v8::internal::StackGuard::ArchiveSpacePerThread+52242
12: 00007FF7CCDE0453 v8::internal::StackGuard::ArchiveSpacePerThread+53971
13: 00007FF7CCEC1614 uv_dlerror+2452
14: 00007FF7CCEC23E8 uv_run+232
15: 00007FF7CCE5FE7E node::NewContext+1390
16: 00007FF7CCE6048B node::NewIsolate+603
17: 00007FF7CCE608E7 node::Start+823
18: 00007FF7CCD0F3CC node::MultiIsolatePlatform::MultiIsolatePlatform+604
19: 00007FF7CD95863C v8::internal::compiler::OperationTyper::ToBoolean+129516
20: 00007FFC5178244D BaseThreadInitThunk+29
21: 00007FFC52C4DFB8 RtlUserThreadStart+40
```

![image-20221222134851282](./image/image-20221222134851282.png)

删掉用户目录下的`.npmrc`文件(`C:\Users\pc01\.npmrc`)

![image-20221222135139919](./image/image-20221222135139919.png)

再次使用`npm install`命令下载依赖，显示node-sass安装失败

```bash
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})      

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! node-sass@6.0.1 postinstall: `node scripts/build.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the node-sass@6.0.1 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\pc01\AppData\Roaming\npm-cache\_logs\2022-12-22T05_52_48_531Z-debug.log
```

![image-20221222135318140](./image/image-20221222135318140.png)

重新安装node-sass

```bash
## 卸载掉安装失败的node-sass
npm uninstall node-sass
## 重新安装sass
npm install sass -i
```

![image-20221222135717972](./image/image-20221222135717972.png)

再次使用`npm install`命令安装，提示有`656`个漏洞不用管

```bash
PS D:\renren-fast-vue> npm install
npm WARN ajv-keywords@1.5.1 requires a peer of ajv@>=4.10.0 but none is installed. You must install peer dependencies yourself.
npm WARN sass-loader@6.0.6 requires a peer of node-sass@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\sass\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})      
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})      

audited 2311 packages in 6.589s
found 656 vulnerabilities (56 low, 179 moderate, 318 high, 103 critical)
  run `npm audit fix` to fix them, or `npm audit` for details
```

![image-20221222135838426](./image/image-20221222135838426.png)

使用`npm run dev`运行项目提示没有发现`node-sass`模块

```bash
Module build failed: Error: Cannot find module 'node-sass'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
```

![image-20221222140046492](./image/image-20221222140046492.png)

卸载掉以前的`node-sass`，重新安装`node-sass`，还是报错

```bash
npm uninstall --save node-sass
npm install --save node-sass
```

![image-20221222140600261](./image/image-20221222140600261.png)

换成`4.14.1`版本就好了

```bash
npm install --save node-sass@4.14.1
```

![image-20221222141650512](./image/image-20221222141650512.png)

再次使用`npm run dev`就运行成功了

![image-20221222141857800](./image/image-20221222141857800.png)

访问 http://localhost:8001/ 即可（如果没有验证码，需要后台启动`gulimall-gateway`和`renren-fast`模块）

![image-20221222155305626](./image/image-20221222155305626.png)

