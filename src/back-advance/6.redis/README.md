> 在此特别感谢黑马程序员提供的Redis课程

[黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案+黑马点评实战项目_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1cr4y1671t/?vd_source=18a82f96e03508099420ab5613d9d940)

# 初始Redis

Redis是一种键值型的NoSQL数据库，这里有两个关键字

- **键值型**：指Redis中存储的数据都是以Key-Value键值对的形式存储，而Value的形式多种多样，可以使字符串、数值甚至Json
- **NoSQL** ：相对于传统关系型数据库而言，有很大差异的一种数据库

## 认识NoSQL

`NoSql`可以翻译做Not Only Sql（不仅仅是SQL），或者是No Sql（非Sql的）数据库。是相对于传统关系型数据库而言，有很大差异的一种特殊的数据库，因此也称之为`非关系型数据库`。

### 结构化与非结构化

传统关系型数据库是结构化数据，每张表在创建的时候都有严格的约束信息，如字段名、字段数据类型、字段约束等，插入的数据必须遵循这些约束

而NoSQL则对数据库格式没有约束，可以是键值型，也可以是文档型，甚至是图格式

![image-20230309154525986](https://gitlab.com/apzs/image/-/raw/master/image/image-20230309154525986.png)

### 关联与非关联

传统数据库的表与表之间往往存在关联，例如外键约束
而非关系型数据库不存在关联关系，要维护关系要么靠代码中的业务逻辑，要么靠数据之间的耦合

```json
{
  id: 1,
  name: "张三",
  orders: [
    {
       id: 1,
       item: {
	 id: 10, title: "荣耀6", price: 4999
       }
    },
    {
       id: 2,
       item: {
	 id: 20, title: "小米11", price: 3999
       }
    }
  ]
}
```

例如此处要维护张三与两个手机订单的关系，不得不冗余的将这两个商品保存在张三的订单文档中，不够优雅，所以建议使用业务逻辑来维护关联关系

![image-20230309154903011](https://gitlab.com/apzs/image/-/raw/master/image/image-20230309154903011.png)

### 查询方式

传统关系型数据库会基于Sql语句做查询，语法有统一的标准

```sql
SELECT id, age FROM tb_user WHERE id = 1
```


而不同的非关系型数据库查询语法差异极大

```bash
Redis:  get user:1
MongoDB: db.user.find({_id: 1})
elasticsearch:  GET http://localhost:9200/users/1
```

![image-20230309155047999](https://gitlab.com/apzs/image/-/raw/master/image/image-20230309155047999.png)

### 事务

传统关系型数据库能满足事务的ACID原则(原子性、一致性、独立性及持久性)
而非关系型数据库往往不支持事务，或者不能要个保证ACID的特性，只能实现计本的一致性（`BASE`理论：基本可用、软状态、最终一致性）

### 总结

|          |                          SQL                           |                           NoSQL                            |
| :------: | :----------------------------------------------------: | :--------------------------------------------------------: |
| 数据结构 |                   结构化(Structured)                   |                          非结构化                          |
| 数据关联 |                   关联的(Relational)                   |                          无关联的                          |
| 查询方式 |                        SQL查询                         |                           非SQL                            |
| 事务特性 |                          ACID                          |                            BASE                            |
| 存储方式 |                          磁盘                          |                            内存                            |
|  扩展性  |                          垂直                          |                            水平                            |
| 使用场景 | 1）数据结构固定 2)相关业务对数据安全性、一致性要求较高 | 1)数据结构不固定 2)对一致性、安全性要求不高  3）对性能要求 |

- 存储方式
  - 关系型数据库基于磁盘进行存储，会有大量的磁盘IO，对性能有一定影响
  - 非关系型数据库，他们的操作更多的是依赖于内存来操作，内存的读写速度会非常快，性能自然会好一些

- 扩展性
  - 关系型数据库集群模式一般是主从，主从数据一致，起到数据备份的作用，称为垂直扩展。
  - 非关系型数据库可以将数据拆分，存储在不同机器上，可以保存海量数据，解决内存大小有限的问题。称为水平扩展。
  - 关系型数据库因为表之间存在关联关系，如果做水平扩展会给数据查询带来很多麻烦

## 认识Redis

Redis诞生于2009年，全称是Remote Dictionary Server远程词典服务器，是一个基于内存的键值型NoSQL数据库。

特征：

- 键值(Key-Value)型，Value支持多种不同的数据结构，功能丰富
- 单线程，每个命令具有原子性(`redis6.0`中网络请求处理引入了多线程，核心命令执行仍然是单线程)
- 低延迟，速度快(基于内存、IO多路复用、良好的编码)
- 支持数据持久化
- 支持主从集群、分片集群
- 支持多语言客户端

作者：Antirez

Redis官网：[Redis](https://redis.io/)

## 安装Redis

需要在系统中添加 EPEL（Extra Packages for Enterprise Linux）软件源，然后安装 Redis。以下是具体步骤：

1. 运行以下命令以安装 EPEL 软件源：

```bash
yum install epel-release
```

2. 安装完成后，更新软件包列表：

```bash
yum update
```

3. 现在就可以安装 Redis 了，运行以下命令：

```bash
yum install redis
```

4. 安装完成后，启动 Redis 服务：

```bash
#开启redis
systemctl start redis
#重启redis
systemctl restart redis
#关闭redis
systemctl stop redis
```

为了确保 Redis 在系统启动时自动启动，运行以下命令：

```bash
systemctl enable redis
```

可以通过运行以下命令来检查 Redis 是否正在运行：

```bash
systemctl status redis
```

如果 Redis 正在运行，您应该会看到类似以下的输出：

```bash
yamlCopy code● redis.service - Redis persistent key-value database
   Loaded: loaded (/usr/lib/systemd/system/redis.service; enabled; vendor preset: disabled)
   Active: active (running) since Mon 2021-08-16 08:30:21 UTC; 2min 30s ago
 Main PID: 1234 (redis-server)
   CGroup: /system.slice/redis.service
           └─1234 /usr/bin/redis-server 127.0.0.1:6379
```

其中 `Active: active (running)` 表示 Redis 正在运行。如果您看到类似的输出，那么您已经成功安装并启动了 Redis 服务。

点击查看完整[redis安装完整过程](https://gitlab.com/apzs/image/-/raw/master/image/redis安装完整过程.png)

## 修改配置

查看`redis.conf`文件位置

```bash
[root@localhost local]# find / -name 'redis.conf'
/etc/redis.conf
```

修改redis.conf文件中的一些配置：

```properties
# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes
# 密码，设置后访问Redis必须输入密码
requirepass 123321
```

Redis的其它常见配置：

```properties
# 监听的端口
port 6379
# 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录
dir .
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
databases 1
# 设置redis能够使用的最大内存
maxmemory 512mb
# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```

启动Redis：

```bash
redis-server redis.conf
```

停止服务：

```bash
# 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，
# 因为之前配置了密码，因此需要通过 -u 来指定密码
redis-cli -u 123321 shutdown
```

## Redis桌面客户端

安装完成Redis，我们就可以操作Redis，实现数据的CRUD了。这需要用到Redis客户端，包括：

- 命令行客户端
- 图形化桌面客户端
- 编程客户端

### Redis命令行客户端

Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：

```bash
redis-cli [options] [commonds]
```


其中常见的options有：

- `-h 127.0.0.1`：指定要连接的redis节点的IP地址，默认是127.0.0.1
- `-p 6379`：指定要连接的redis节点的端口，默认是6379
- `-a 123321`：指定redis的访问密码 (也可以先不指定密码，进入后使用`auth [username] password`来输入密码)

其中的commonds就是Redis的操作命令，例如：

- `ping`：与redis服务端做心跳测试，服务端正常会返回`PONG` （`redis-cli ping`）

我们可以使用如下方式通过密码进行连接：

```bash
redis-cli -h 127.0.0.1 -p 6379 -a 123321
```

也可以先连上，再指定密码

```bash
redis-cli -h 127.0.0.1 -p 6379

auth 123321
```



### 图形化桌面客户端

安装包：[Releases · lework/RedisDesktopManager-Windows (github.com)](https://github.com/lework/RedisDesktopManager-Windows/releases)

Redis默认有16个仓库，编号从0至15. 通过配置文件可以设置仓库数量，但是不超过16，并且不能自定义仓库名称。

如果是基于redis-cli连接Redis服务，我们可以使用`select index`来更改使用的库（默认使用`0`号库）

```bash
# 选择0号数据库
select 0
```

可以看到不同的数据库中相同的`key`的`value`不一样，他们是相互隔离的

```bash
[root@localhost local]# redis-cli
127.0.0.1:6379> select 0
OK
127.0.0.1:6379> set name tom
OK
127.0.0.1:6379> get name
"tom"
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]> set name jerry
OK
127.0.0.1:6379[1]> get name
"jerry"
127.0.0.1:6379[1]> select 0
OK
127.0.0.1:6379> get name
"tom"
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]> get name
"jerry"
```

# Redis常用命令

Redis是典型的key-value数据库，key一般是字符串，而value包含很多不同的数据类型
[![img](https://gitlab.com/apzs/image/-/raw/master/image/63527eb616f2c2beb12beb85.jpg)](https://pic1.imgdb.cn/item/63527eb616f2c2beb12beb85.jpg)

## Redis通用命令

常用的通用命令有以下几个

|         命令         |                           描述                           | 返回值                                                       | 例子                             |
| :------------------: | :------------------------------------------------------: | ------------------------------------------------------------ | -------------------------------- |
|     keys pattern     |            查找所有符合给定模式(pattern)的key            | 返回所有匹配的`key`，没有匹配到`key`返回`(empty list or set)` | `keys a*`、`keys a?`             |
|  del key [key ...]   |                      批量指定的key                       | 返回成功删除的个数(存在的`key`数)                            | `del name`、`del name age`       |
| exists key [key ...] |                 检查这些`key`有几个存在                  | 返回存在的`key`的个数                                        | `exists name`，`exists name age` |
|  expire key seconds  |  给key设置有效期，到期后该key会被自动删除（以秒为单位）  | 该`key`存在返回`1`，不存在返回`0`                            | `expire name 10`                 |
|       ttl key        | 返回给定key的剩余生存时间(TTL, time to live)，以秒为单位 | 返回该`key`剩余的秒数，如果`key`不存在返回`-2`，`key`存在但没有设置有效期返回`-1` | `ttl name`                       |
|       type key       |              获取`key`所储存的`value`的类型              | 返回`key`所储存的`value`的类型，`key`不存在返回`none`        | `type name`                      |

- `keys`：查看符合模板的所有key（`keys a*` ：查询以`a`开头的`key`，`key a?`：查询以`a`开头且是两个字符的`key`）
  - 不建议在生产环境设备上使用，因为Redis是单线程的，执行查询的时候会阻塞其他命令，当数据量很大的时候，使用KEYS进行模糊查询，效率很差
- `del`：删除一个或多个指定的key（`del name`：删掉`key`为`name`的，`del name age`，会将`name`和`age`都删掉）
- `exists`：判断key是否存在（`exists name`，如果存在返回1，不存在返回0；`exists name age`返回存在的`key`的个数）
- `expire`：给一个key设置有效期，到期后该key会被自动删除（`expire name 20`，给name设置20秒有效期，到期自动删除）
- `ttl`：查看一个key的剩余有效期(Time-To-Live)（`TTL name`，查看name的剩余有效期（单位为秒），如果未设置有效期，则返回`-1`，如果`key`不存在返回`-2`）
- `type`  获取`key`所储存的`value`的类型 ，返回`key`所储存的`value`的类型，`key`不存在返回`none` （ `type name`：查看name对应的`value`的类型）

> 如果不知道`redis`的命令，可以使用`help + <tab>`（输入`help`+`空格` 再按`tab`键）快捷键查看可以使用的命令
>
> 如果不知道某个命令的作用，可以使用`help <command>`（输入`help`+`空格` +`命令`）快捷键可以查看对应命令的帮助文档

## String类型

String类型，也就是字符串类型，是Redis中最简单的存储类型
其value是字符串，不过根据字符串的格式不同，又可以分为3类

- `string`：普通字符串
- `int`：整数类型，可以做自增、自减操作
- `float`：浮点类型，可以做自增、自减操作
  不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同，字符串类型的最大空间不能超过512M

### String的常用命令

String的常用命令有

|                          命令                           |                             描述                             | 返回值                                                       | 示例                                                         |
| :-----------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
| set key value [EX seconds] [PX milliseconds] [NX \| XX] |         添加或者修改一个已经存在的String类型的键值对         | 设置成功返回`OK`，设置失败返回`(nil)`                        | `set name tom`、`set anotherkey "一分钟后过期" ex 60`、`set name tom nx`新增`name`，以前存在返回`(nil)`，以前不存在返回`OK` |
|                         get key                         |                根据key获取String类型的value，                | 指定key的value，`key`不存在返回`(nil)`                       | `get name`                                                   |
|                    del key [key ...]                    |                        批量指定的key                         | 返回成功删除的个数(存在的`key`数)                            | `del name`、`del name age`                                   |
|             mset key value [key value ...]              |                批量添加多个String类型的键值对                | `OK`                                                         | `mset name jerry age 83`                                     |
|                   mget key [key ...]                    |             根据多个key获取多个String类型的value             | 返回指定的多个`key`的值，不存在的`key`返回`(nil)`            | `mget name age`                                              |
|                        incr key                         |                     让一个整形的key自增1                     | 返回该`key`的`value`加1后的结果，如果`key`不存在则返回1（即将这个`key`初始化为`0`并加1，此时`get key`返回1） | `incr age`                                                   |
|                        decr key                         |                     让一个整形的key自减1                     | 返回该`key`的`value`减1后的结果，如果`key`不存在则返回-1（即将这个`key`初始化为`0`并减1，此时`get key`返回-1） | `decr age`                                                   |
|                  incrby key increment                   |               让一个整形的key自增并指定步长值                | 返回该`key`的`value`加increment后的结果，如果`key`不存在则返回increment（即将这个`key`初始化为`0`并加increment） | `incrby age 2`：让age值自增2；`incrby age -2`：让age值自减2  |
|                incrbyfloat key increment                |             让一个浮点类型的数字自增并指定步长值             | 返回该`key`的`value`加increment后的结果，如果`key`不存在则返回increment（即将这个`key`初始化为`0`并加increment） | `incrbyfloat score 0.5`：让score值自增0.5；`incrbyfloat score -0.5`：让score值自减0.5 |
|                          setnx                          | 添加一个String类型的键值对，前提是这个key不存在，否则不执行，可以理解为真正的`新`增 | `key`不存在返回`1`（新增成功），`key`存在返回`0`（新增失败） | `setnx name jerry`                                           |
|                 setex key seconds value                 |           添加一个String类型的键值对，并指定有效期           | `OK`                                                         | `setex name 10 tom`:设置`key`为`name`的`value`为`tom`，并设置有效期为`10`秒 |

String的常见命令有：

- SET：添加或者修改已经存在的一个String类型的键值对

- GET：根据key获取String类型的value

- MSET：批量添加多个String类型的键值对

- MGET：根据多个key获取多个String类型的value

- INCR：让一个整型的key自增1

- INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2

- INCRBYFLOAT：让一个浮点类型的数字自增并指定步长

- SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行

- SETEX：添加一个String类型的键值对，并且指定有效期

### Key结构

- Redis没有类似MySQL中Table的概念，那么我们该如何区分不同类型的Key呢？

- 例如：需要存储用户、商品信息到Redis，有一个用户的id是1，有一个商品的id恰好也是1，如果此时使用id作为key，那么就回冲突，该怎么办？

- 我们可以通过给key添加前缀加以区分，不过这个前缀不是随便加的，有一定的规范

  - Redis的key允许有多个单词形成层级结构，多个单词之间用`:`隔开，格式如下

    ```
    项目名:业务名:类型:id
    ```

  - 这个格式也并非是固定的，可以根据自己的需求来删除/添加词条，这样我们就可以把不同数据类型的数据区分开了，从而避免了key的冲突问题

  - 例如我们的项目名叫test，有user和product两种不同类型的数据，我们可以这样定义key

    - user相关的key：`test:user:1`
    - dish相关的key：`test:product:1`

- 如果value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储

|      KEY       |                  VALUE                  | 命令                                                         |
| :------------: | :-------------------------------------: | ------------------------------------------------------------ |
|  test:user:1   |   {“id”:1, “name”: “Jack”, “age”: 2}    | set test:user:1 '{“id”:1, “name”: “Jack”, “age”: 2}'         |
| test:product:1 | {“id”:1, “name”: “手机”, “price”: 4999} | set test:product:1 '{“id”:1, “name”: “手机”, “price”: 4999}' |

- 并且在Redis的桌面客户端中，也会以相同前缀作为层次结构，让数据看起来层次分明，关系清晰

## Hash类型

- Hash类型，也叫散列，其中value是一个无序字典，类似于Java中的HashMap结构
- String结构是将对象序列化为JSON字符串后存储，当我们要修改对象的某个属性值的时候很不方便，必须全部替换

|       KEY        |                  VALUE                  |
| :--------------: | :-------------------------------------: |
|  reggie:user:1   |   {“id”:1, “name”: “Jack”, “age”: 21}   |
| reggie:product:1 | {“id”:1, “name”: “手机”, “price”: 4999} |

- Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD

  <table border="1px" cellpadding="0" cellspacing="0"  style=" margin:auto;text-align: center">
      <tr>
          <td rowspan="2">KEY</td>
          <td colspan="2">VALUE</td>
      </tr>
      <tr>
          <td>field</td>
          <td>value</td>
      </tr>
      <tr>
          <td rowspan="2">test:user:1</td>
          <td>name</td>
          <td>jack</td>
      </tr>
      <tr>
         <td>age</td>
         <td>21</td>
      </tr>
          <tr>
          <td rowspan="2">test:product:1</td>
          <td>name</td>
          <td>手机</td>
      </tr>
      <tr>
         <td>price</td>
         <td>4999</td>
      </tr>
  </table>

- Hash的常用命令有

|                   命令                   |                             描述                             | 返回值                                                       | 示例                                                         |
| :--------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|           hset key field value           |              添加或者修改hash类型key的field的值              | 新增返回`1`，修改返回`0`                                     | `hset test:user:3 name jerry`                                |
|              hget key field              |                获取一个hash类型key的field的值                | `key`和对应的`field`都存在返回其`value`，否则返回`(nil)`     | `hget test:user:3 name`                                      |
| hmset key field value [field value  ...] |              批量添加多个hash类型key的field的值              | `OK`                                                         | `hmset test:user:3 name jerry age 83`                        |
|       hmget key field [field ...]        |              批量获取多个hash类型key的field的值              | `key`存在且对应的`field`也存在的返回其`value`，否则返回`(nil)` | `hmget test:user:3 name age`                                 |
|               hgetall key                |         获取一个hash类型的key中的所有的field和value          | `key`存在返回所有`field`和`value`，`key`不存在返回`(empty list or set)` | `hgetall test:user:3`                                        |
|                hkeys key                 |             获取一个hash类型的key中的所有的field             | `key`存在返回所有`field`，`key`不存在返回`(empty list or set)` | `hkeys test:user:2`                                          |
|                hvals key                 |             获取一个hash类型的key中的所有的value             | `key`存在返回所有`value`，`key`不存在返回`(empty list or set)` | `hvals test:user:3`                                          |
|       hincrby key field increment        |           让一个hash类型key的字段值自增并指定步长            | 返回自增后的值，如果`key`不存在或对应的`field`不存在则会创建并赋值为`0`，再增加`increment`，最终返回 | `hincrby test:user:3 age 2`：让`key`为`test:user:3`的`field`为`age`的`value`自增2；`hincrby test:user:3 age -2`:自减2 |
|          hsetnx key field value          | 添加一个hash类型的key的field值，前提是这个field不存在，否则不执行 | `key`不存在或对应的`field`不存在返回`1`（新增成功），`key`存在且对应的`field`也存在返回`0`（新增失败） | `hsetnx test:user:3 name tom`                                |

## List类型

- Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。
- 特征也与LinkedList类似：
  - 有序
  - 元素可以重复
  - 插入和删除快
  - 查询速度一般
- 常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。
- List的常见命令有：

|              命令               |                             描述                             | 返回值                                                       | 示例                                                         |
| :-----------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
| lpush key element [element ...] |    向列表左侧（从左往右插入，即头插法）插入一个或多个元素    | 返回插入后该`key`的元素个数                                  | `lpush users 1 2 3`：`list`从左至右依次为` 3  2  1`，输入顺序与查询顺序相反 |
|        lpop key [count]         |        移除并返回列表左侧的第一个元素，没有则返回nil         | 返回从左侧删除的`key`的`value`，没有则返回`(nil)`            | `lpop users 3`：`list`为`1 2 3 4 5 6`时使用该命令返回`1 2 3` |
|  rpush key element [element …]  |    向列表右侧（从右往左插入，即尾插法）插入一个或多个元素    | 返回插入后该`key`的元素个数                                  | `rpush users 1 2 3`：`list`从左至右依次为` 1  2  3`，输入顺序与查询顺序一致 |
|        rpop key [count]         |                移除并返回列表右侧的第一个元素                | 返回从右侧删除的`key`的`value`，没有则返回`(nil)`            | `rpop users 3`：`list`为`1 2 3 4 5 6`时使用该命令返回`6 5 4` |
|       lrange key star end       | 返回一段角标范围内的所有元素，`star`和`end`都包含，索引从`0`开始（最左侧为0，最右侧为-1）如果`end`超过最大索引会返回到最大索引，`star`或`end`小于`0`（假如为`-n`）则表示从右数第`n`个元素 | 返回一段角标范围内的所有元素；如果指定范围内没有数据或key不存在则返回`(empty array)` | `lrange users 0 3`：获取索引为`0`至索引为`3`的元素，共`4`个元素（如果有的话）；`lrange users 0 -1`：获取所有元素；`lrange users -4 5`：获取从右往左数第`4`至从左往右数索引为`5`的之间的元素；`lrange users -4 -2`：获取右边第`4`到第`2`个元素，共`3`个； |
|   blpop key [key ...] timeout   | `blpop`和`lpop`类似，只不过在没有该元素时等待指定时间（单位为秒，非准确时间，但等待时间`>=`指定时间），而不是直接返回`(nil)` | 如果有则立即返回该`key`和从左侧删除的`value`，如果没有则等待指定秒，超过该秒后还没有则返回`(nil)` | `blpop users 2`：如果左侧有`value`则立即返回`key`和删除的`value`，如果没有则等待指定时间，超过该时间后还没有则返回`(nil)` |
|   brpop key [key ...] timeout   | `brpop`和`rpop`类似，只不过在没有该元素时等待指定时间（单位为秒，非准确时间，但等待时间`>=`指定时间），而不是直接返回`(nil)` | 如果有则立即返回该`key`和从右侧删除的`value`，如果没有则等待指定秒，超过该秒后还没有则返回`(nil)` | `brpop users 2`：如果右侧有`value`则立即返回`key`和删除的`value`，如果没有则等待指定时间，超过该时间后还没有则返回`(nil)` |

![image-20230310100436263](https://gitlab.com/apzs/image/-/raw/master/image/image-20230310100436263.png)

## Set类型

- Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征：
  - 无序
  - 元素不可重复
  - 查找快
  - 支持交集、并集、差集等功能
- Set的常见命令有：

|            命令            |            描述             | 返回值                                                       | 示例                                                         |
| :------------------------: | :-------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
| sadd key member [member …] |  向set中添加一个或多个元素  | 返回插入成功的数量，已经存在的不算                           | `sadd s1 a b c a`：向`s1`里添加`a b c a`，返回值为`3`成功插入了`a b c`共3个元素 |
| srem key member [member …] |     移除set中的指定元素     | 返回成功移除的元素的数量                                     | `srem s1 a b`：向`s1`里移除`a b`                             |
|         scard key          |     返回set中元素的个数     | 返回`key`里元素的个数，如果`key`不存在返回`0`                | `scard s1`：返回`s1`里元素的个数                             |
|    sismember key member    | 判断一个元素是否存在于set中 | 该`key`存在`member`返回`1`，不存在返回`0`                    | `sismember s1 a`：判断`s1`里面有没有`a`                      |
|        smembers key        |     获取set中的所有元素     | 返回该`key`里的所有元素                                      | `smembers s1`：返回`s1`里的所有元素                          |
|    sinter key [key ...]    |       求这些key的交集       | 返回这些key都存在的元素                                      | 假如`s1`为`1 2 3 4 5 6`，`s2`为`0 1 2`，`s3`为`2 3 6 9`==>`sinter s1 s2 s3`返回`2` |
|    sunion key [key ...]    |       求这些key的并集       | 返回这些key的元素加起来并去重后的所有元素                    | 假如`s1`为`1 2 3 4 5 6`，`s2`为`0 1 2`，`s3`为`2 3 6 9`==>`sunion s1 s2 s3`返回`0 1 2 3 4 5 6 9` |
|     sdiff key [key …]      |       求这些key的差集       | 如果key有一个，则返回本身；如果key有2个，则返回第1个key减去第1个和第2个都存在的元素；如果key有3个，则返回  第一个key减去第一个和第二个都存在的元素  的结果 减去 该结果和第3个都存在的元素；...... | 假如`s1`为`1 2 3 4 5 6`，`s2`为`0 1 2`，`s3`为`2 3 6 9`==>`sdiff s1`：返回`s1`本身；`sdiff s2 s1`：返回`0`；`sdiff s1 s2`：返回`3 4 5 6`；`sdiff s1 s2 s3`，返回`4 5` |

练习题：

1、将下列数据用Redis的Set集合来存储：

- 张三的好友有：李四、王五、赵六

  ```bash
  127.0.0.1:6379> sadd zhangsan lisi wangwu zhaoliu
  (integer) 3
  ```

- 李四的好友有：王五、麻子、二狗

  ```bash
  127.0.0.1:6379> sadd lisi wangwu mazi ergou
  (integer) 3
  ```

2、利用Set的命令实现下列功能：

- 计算张三的好友有几人

  ```bash
  127.0.0.1:6379> scard zhangsan
  (integer) 3
  ```

- 计算张三和李四有哪些共同好友

  ```bash
  127.0.0.1:6379> sinter zhangsan lisi
  1) "wangwu"
  ```

- 查询哪些人是张三的好友却不是李四的好友

  ```bash
  127.0.0.1:6379> sdiff zhangsan lisi
  1) "zhaoliu"
  2) "lisi"
  ```

- 查询张三和李四的好友总共有哪些人

  ```bash
  127.0.0.1:6379> sunion zhangsan lisi
  1) "wangwu"
  2) "zhaoliu"
  3) "ergou"
  4) "lisi"
  5) "mazi"
  ```

- 判断李四是否是张三的好友

  ```bash
  127.0.0.1:6379> sismember zhangsan lisi
  (integer) 1
  ```

- 判断张三是否是李四的好友

  ```bash
  127.0.0.1:6379> sismember lisi zhangsan
  (integer) 0
  ```

- 将李四从张三的好友列表中移除

  ```bash
  127.0.0.1:6379> srem zhangsan lisi
  (integer) 1
  ```

## SortedSet类型

- Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。
- SortedSet具备下列特性：
  - 可排序
  - 元素不重复
  - 查询速度快
- 因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能。
- SortedSet的常见命令有：

|                             命令                             |                             描述                             | 返回值                                                       | 示例                                                         |
| :----------------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|           zadd key score member [score member ...]           | 添加一个或多个元素到sorted set ，如果已经存在则更新其score值；socre值越大元素越靠右（升序排列；左边元素的score小,右边元素的score大） | 返回添加成功的数量(更新的不算)                               | `zadd name 2 tom`：在名为name的key里添加元素tom，该tom的评分为2 |
|                 zrem key member [member ...]                 |                  删除sorted set中的指定元素                  | 返回删除成功的数量                                           | `zrem name tom jerry`：删除名为name的key里的tom和jerry       |
|                      zscore key member                       |             获取sorted set中的指定元素的score值              | 如果存在则返回`score`，如果key或对应的member不存在则返回`(nil)` | `zscore name tom`：在名为name的key里查询tom的评分            |
|                       zrank key member                       | 获取sorted set 中的指定元素的排名；类似于索引（score小的在左边），索引从0开始 | 如果存在则返回排名；如果key或对应的member不存在则返回`(nil)` | `zrank name tom`：在名为name的key里tom的score最低，因此返回0，即类似于左边第一个元素 |
|                          zcard key                           |                  获取sorted set中的元素个数                  | 返回该key里元素的个数，如果该key不存在返回0                  | `zcard name`                                                 |
|                      zcount key min max                      |   统计score值在给定范围内的所有元素的个数（包含min和max）    | score值在给定范围内的所有元素的个数，如果key不存在返回0      | `zcount name 2 3`：在名为name的key里统计`socre`在`2~3`的元素个数 |
|                 zincrby key increment member                 | 让sorted set中的指定元素的score自增，步长为指定的increment值（步长值可以为负数） | 如果`key`和对应的`member`都存在，则让其评分加`increment`，否则设其值为`increment` | 先使用` zadd jerry 20 age`命令让key为`jerry`里的`age`的评分赋为`20`，再使用`zincrby jerry 2 age`是`age`的评分会加`2`，变为`22` |
|                    zrange key start stop                     | 按照score排序后，获取指定排名范围内的元素（包含start和stop）；排名从`0`开始（score最小），`-1`代表倒数第一（score最大） | 返回该key指定排名范围内的元素，如果指定排名范围内没有数据或key不存在则返回`(empty array)` | `zrange name 0 2`：返回key为name的元素中排名为`0 ~ 2`的元素，即score最小的3个元素；`zrange name 0 -1`：返回key为name的所有元素 |
| zrangebyscore key min max  [WITHSCORES] [LIMIT offset count] |  按照score排序后，获取指定score范围内的元素（包含min和max）  | 返回该key指定评分范围内的元素，如果指定评分范围内没有数据或key不存在则返回`(empty array)` | `zrangebyscore name 2 10`：返回key为name的元素中score为`0 ~ 10`之间的元素 |
| zinter numkeys key [key ...] [weights weight [weight ...]] [aggregate sum\|min\|max] [withscores] |                                                              |                                                              |                                                              |
| zunion numkeys key [key ...] [weights weight [weight ...]] [aggregate sum\|min\|max] [withscores] |                                                              |                                                              |                                                              |
|           zdiff numkeys key [key ...] [WITHSCORES]           |                                                              |                                                              |                                                              |

> **注意：所有的排名默认都是升序，如果要降序则在命令的Z后面添加rev即可**，例如：
>
>    - `升序`获取sorted set 中的指定元素的排名：`zrank key member`
> 	
>    - `降序`获取sorted set 中的指定元素的排名：`zrevrank key memeber`
>

练习题：

- 将班级的下列学生得分存入Redis的SortedSet中：

  Jack 85, Lucy 89, Rose 82, Tom 95, Jerry 78, Amy 92, Miles 76

```bash
127.0.0.1:6379> zadd stu 85 Jack 89 Lucy 82 Rose 95 Tom 78 Jerry 92 Amy 76 Miles
(integer) 7
```

并实现下列功能：

- 删除Tom同学

  ```bash
  127.0.0.1:6379> zrem stu Tom
  (integer) 1
  ```

- 获取Amy同学的分数

  ```bash
  127.0.0.1:6379> zscore stu Amy
  "92"
  ```

- 获取Rose同学的排名

    ```bash
    127.0.0.1:6379> zrank stu Rose
    (integer) 2
    ```

- 查询80分以下有几个学生

    ```bash
    127.0.0.1:6379> zcount stu 0 80
    (integer) 2
    ```

- 给Amy同学加2分

    ```bash
    127.0.0.1:6379> zincrby stu 2 Amy
    "94"
    ```

- 查出成绩前3名的同学

    ```bash
    127.0.0.1:6379> zrange stu 0 2
    1) "Miles"
    2) "Jerry"
    3) "Rose"
    ```

- 查出成绩80分以下的所有同学

    ```bash
    127.0.0.1:6379> zrangebyscore stu 0 80
    1) "Miles"
    2) "Jerry"
    ```

# Redis的Java客户端

目前主流的Redis的Java客户端有三种
- Jedis和Lettuce：这两个主要是提供了Redis命令对应的API，方便我们操作Redis，而SpringDataRedis又对这两种做了抽象和封装，因此我们后期会直接以SpringDataRedis来学习。
- Redisson：是在Redis基础上实现了分布式的可伸缩的java数据结构，例如Map、Queue等，而且支持跨进程的同步机制：Lock、Semaphore等待，比较适合用来实现特殊的功能需求。

## Jedis客户端

### 快速入门

使用Jedis的步骤

1. 导入Jedis的maven坐标

   ```xml
   <!--jedis-->
   <dependency>
       <groupId>redis.clients</groupId>
       <artifactId>jedis</artifactId>
       <version>3.7.0</version>
   </dependency>
   <!--单元测试-->
   <dependency>
       <groupId>org.junit.jupiter</groupId>
       <artifactId>junit-jupiter</artifactId>
       <version>5.7.0</version>
       <scope>test</scope>
   </dependency>
   ```

2. 建立连接

   新建一个单元测试类

   ```java
   private Jedis jedis;
   
   @BeforeEach
   void setUp() {
       //1. 建立连接
       jedis = new Jedis("127.0.0.1", 6379);
       //2. 设置密码
       jedis.auth("root");
       //3. 选择库
       jedis.select(0);
   }
   ```

3. 测试

   ```java
   @Test
   void testString(){
       jedis.set("name","tom");
       String name = jedis.get("name");
       System.out.println("name = " + name);
   }
   
   @Test
   void testHash(){
       jedis.hset("user:1","name","tom");
       jedis.hset("user:1","age","21");
       jedis.hset("user:2","name","jerry");
       jedis.hset("user:2","age","18");
       Map<String, String> map = jedis.hgetAll("user:1");
       System.out.println(map);
   }
   ```

4. 释放资源

   ```java
   @AfterEach
   void tearDown(){
       if (jedis != null){
           jedis.close();
       }
   }
   ```

### 连接池

- `Jedis`本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们推荐大家使用Jedis连接池代替Jedis的直连方式。

- 新建一个`com.blog.util`，用于存放我们编写的工具类

- 但后面我们使用`SpringDataRedis`的时候，可以直接在`yml`配置文件里配置这些内容

  ```java
  public class JedisConnectionFactory {
  
      private static JedisPool jedisPool;
  
      static {
          // 配置连接池
          JedisPoolConfig poolConfig = new JedisPoolConfig();
          // 最大连接数（最多允许创建8个连接）
          poolConfig.setMaxTotal(8);
          // 最大空闲连接（即便没有连接，线程池也可以预备几个连接）
          poolConfig.setMaxIdle(8);
          // 最小空闲连接（超过一定时间后如果一直没有连接则会释放到最小空闲连接数）
          poolConfig.setMinIdle(0);
          // 等待时长（如果连接池里没有连接可用时，我们等待的时长，默认为-1，即一直等待）
          poolConfig.setMaxWaitMillis(1000);
          // 创建连接池对象，参数：连接池配置、服务端ip、服务端端口、超时时间、密码
          jedisPool = new JedisPool(poolConfig, "127.0.0.1", 6379, 1000, "root");
      }
  
      public static Jedis getJedis(){
          return jedisPool.getResource();
      }
  }
  ```
  
- 之后我们的测试类就可以修改为如下

  ```java
  @SpringBootTest
  class RedisTestApplicationTests {
  
      private Jedis jedis = JedisConnectionFactory.getJedis();
  
      @Test
      void testString(){
          jedis.set("name","tom");
          String name = jedis.get("name");
          System.out.println("name = " + name);
      }
  
      @Test
      void testHash(){
          jedis.hset("user:1","name","Jack");
          jedis.hset("user:2","name","Rose");
          jedis.hset("user:3","name","Kyle");
          jedis.hset("user:1","age","21");
          jedis.hset("user:2","age","18");
          jedis.hset("user:3","age","18");
          Map<String, String> map = jedis.hgetAll("user:1");
          System.out.println(map);
      }
  
      @AfterEach
      void tearDown(){
          if (jedis != null){
              jedis.close();
          }
      }
  }
  ```

## SpringDataRedis客户端

SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis

官网地址：https://spring.io/projects/spring-data-redis
- 提供了对不同Redis客户端的整合（Lettuce和Jedis）
- 提供了RedisTemplate统一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDKCollection实现

- SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：

|             API             |   返回值类型    |         说明          |
| :-------------------------: | :-------------: | :-------------------: |
| redisTemplate.opsForValue() | ValueOperations |  操作String类型数据   |
| redisTemplate.opsForHash()  | HashOperations  |   操作Hash类型数据    |
| redisTemplate.opsForList()  | ListOperations  |   操作List类型数据    |
|  redisTemplate.opsForSet()  |  SetOperations  |    操作Set类型数据    |
| redisTemplate.opsForzSet()  | ZSetOperations  | 操作SortedSet类型数据 |
|        redisTemplate        |                 |      通用的命令       |

### 快速入门

SpringBoot已经提供了对SpringDataRedis的支持，使用起来非常简单

1. 导入依赖，

   ```xml
   <!--redis依赖-->
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   <!--common-pool连接池-->
   <dependency>
       <groupId>org.apache.commons</groupId>
       <artifactId>commons-pool2</artifactId>
   </dependency>
   <!--Jackson依赖-->
   <dependency>
       <groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
   </dependency>
   <!--lombok-->
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
   ```

2. 配置Redis

   ```yaml
   spring:
     redis:
       host: 127.0.0.1
       port: 6379
       password: root
       lettuce:
         pool:
           max-active: 8
           max-idle: 8
           min-idle: 0
           max-wait: 100ms
   ```

3. 注入RedisTemplate
   因为有了SpringBoot的自动装配，我们可以拿来就用

   ```java
   @Resource // @Autowired:根据类型注入，@Resource:根据名称注入
   RedisTemplate<String,Object> redisTemplate;
   ```

4. 编写测试方法

   ```java
   @Test
   void stringTest(){
       redisTemplate.opsForValue().set("username","tom");
       String username = (String) redisTemplate.opsForValue().get("username");
       System.out.println(username);
   }
   ```

### 自定义序列化

- RedisTemplate可以接收任意Object作为值写入Redis

- 只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化，得到的结果是这样的`\xAC\xED\x00\x05t\x00\x06\xE5\xBC\xA0\xE4\xB8\x89`

  缺点：可读性差、内存占用较大

- 我们可以自定义RedisTemplate的序列化方式，代码如下
  在`com.blog.config`包下编写对应的配置类

  ```java
  @Configuration
  public class RedisConfig {
  
      @Bean
      public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
          // 创建RedisTemplate对象
          RedisTemplate<String, Object> template = new RedisTemplate<>();
          // 设置连接工厂
          template.setConnectionFactory(connectionFactory);
          // 创建JSON序列化工具
          GenericJackson2JsonRedisSerializer jsonRedisSerializer =
                  new GenericJackson2JsonRedisSerializer();
          // 设置Key的序列化
          template.setKeySerializer(RedisSerializer.string());
          template.setHashKeySerializer(RedisSerializer.string());
          // 设置Value的序列化
          template.setValueSerializer(jsonRedisSerializer);
          template.setHashValueSerializer(jsonRedisSerializer);
          // 返回
          return template;
      }
  }
  ```

- 我们编写一个User类，并尝试将其创建的对象存入Redis，看看是什么效果

  ```java
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public class User {     // 如果使用默认的jdk进行序列化实体需要实现Serializable接口
      private String name;
      private Integer age;
  }
  ```

- 测试方法

  ```java
  @Test
  void stringTest(){
      redisTemplate.opsForValue().set("user:4",new User("张三",18));
      //如果不想强转可用使用@Resource注入RedisTemplate<String,User> redisTemplate;
      User user = (User) redisTemplate.opsForValue().get("user:4");
      System.out.println(user);
  }
  ```

- 这里采用了JSON序列化来代替默认的JDK序列化方式。最终结果如下：

  ```json
  {
    "@class": "com.test.entity.User",
    "name": "张三",
    "age": 18
  }
  ```

- 整体可读性有了很大提升，并且能将Java对象自动的序列化为JSON字符串，并且查询时能自动把JSON反序列化为Java对象。不过，其中记录了序列化时对应的class名称，目的是为了查询时实现自动反序列化。这会带来额外的内存开销。

### StringRedisTemplate

- 为了节省内存空间，我们可以不使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

- 因为存入和读取时的序列化及反序列化都是我们自己实现的，SpringDataRedis就不会将class信息写入Redis了

- 这种用法比较普遍，因此SpringDataRedis就提供了RedisTemplate的子类：StringRedisTemplate，它的key和value的序列化方式默认就是String方式。源码如下

  ```java
  public class StringRedisTemplate extends RedisTemplate<String, String> {
      public StringRedisTemplate() {
          this.setKeySerializer(RedisSerializer.string());
          this.setValueSerializer(RedisSerializer.string());
          this.setHashKeySerializer(RedisSerializer.string());
          this.setHashValueSerializer(RedisSerializer.string());
      }
  ```

- 省去了我们自定义RedisTemplate的序列化方式的步骤（可以将之前配置的RedisConfig删除掉），而是直接使用：

  ```java
  @Test
  void stringTest() throws JsonProcessingException {
      //创建对象
      User user = new User("张三", 18);
      //手动序列化
      String json = mapper.writeValueAsString(user);
      //写入数据
      stringRedisTemplate.opsForValue().set("user:5", json);
      //获取数据
      String userdata = stringRedisTemplate.opsForValue().get("user:5");
      //手动反序列化
      User readValue = mapper.readValue(userdata, User.class);
      System.out.println(readValue);
  }
  ```

- 存入Redis中是这样的

  ```json
  {
    "name": "张三",
    "age": 18
  }
  ```

测试hash相关命令：

```java
@Autowired
StringRedisTemplate stringRedisTemplate;

@Test
void testHash(){
    stringRedisTemplate.opsForHash().put("user:6","name","tom");
    stringRedisTemplate.opsForHash().put("user:6","age","21");

    Map<Object, Object> entries = stringRedisTemplate.opsForHash().entries("user:6");
    System.out.println("entries = " + entries);
}
```

# 内容概述

- `短信登录`
  - 这部分会使用Redis共享session来实现
  - 但其实我在之前的瑞吉外卖的项目优化部分就做过了，用Redis替换session来存储邮箱验证码
- `商户查询缓存`
  - 这部分要理解缓存击穿，缓存穿透，缓存雪崩等问题，对于这些概念的理解不仅仅是停留在概念上，更是能在代码中看到对应的内容
- `优惠卷秒杀`
  - 这部分我们可以学会Redis的计数器功能，结合Lua(之前一直想学Lua然后写饥荒mod)完成高性能的Redis操作，同时学会Redis分布式锁的原理，包括Redis的三种消息队列
- `附近的商户`
  - 利用Redis的GEOHash(新数据结构，前面没有应用场景就没介绍)来完成对于地理坐标的操作
- `UV统计`
  - 主要是使用Redis来完成统计功能
- `用户签到`
  - 使用Redis的BitMap数据统计功能
- `好友关注`
  - 基于Set集合的关注、取消关注，共同关注等等功能，这部分在上篇的练习题中出现过，这次我们在项目中来使用一下
- `达人探店`
  - 基于List来完成点赞列表的操作，同时基于SortedSet来完成点赞的排行榜功能

# 短信登录

## 导入项目

在实现功能之前，我们先来导入项目，让项目跑起来

### 导入SQL

黑马已经在资料中提供好了SQL文件，这里简单分析一下提供的表

|        表        |           说明            |
| :--------------: | :-----------------------: |
|     tb_user      |          用户表           |
|   tb_user_info   |        用户详情表         |
|     tb_shop      |        商户信息表         |
|   tb_shop_type   |        商户类型表         |
|     tb_blog      | 用户日记表（达人探店日记) |
|    tb_follow     |        用户关注表         |
|    tb_voucher    |         优惠券表          |
| tb_voucher_order |      优惠券的订单表       |

### 有关当前模型

- 该项目采用的是前后端分离开发模式
- 手机或者app端发起请求，请求我们的Nginx服务器，Nginx基于七层模型走的事HTTP协议，可以实现基于Lua直接绕开Tomcat访问Redis，也可以作为静态资源服务器，轻松扛下上万并发， 负载均衡到下游Tomcat服务器，打散流量，我们都知道一台4核8G的Tomcat，在优化和处理简单业务的加持下，大不了就处理1000左右的并发， 经过Nginx的负载均衡分流后，利用集群支撑起整个项目，同时Nginx在部署了前端项目后，更是可以做到动静分离，进一步降低Tomcat服务的压力，这些功能都得靠Nginx起作用，所以Nginx是整个项目中重要的一环。
- 在Tomcat支撑起并发流量后，我们如果让Tomcat直接去访问Mysql，根据经验Mysql企业级服务器只要上点并发，一般是16或32 核心cpu，32 或64G内存，像企业级mysql加上固态硬盘能够支撑的并发，大概就是4000起~7000左右，上万并发， 瞬间就会让Mysql服务器的cpu，硬盘全部打满，容易崩溃，所以我们在高并发场景下，会选择使用mysql集群，同时为了进一步降低Mysql的压力，同时增加访问的性能，我们也会加入Redis，同时使用Redis集群使得Redis对外提供更好的服务。

[![img](https://gitlab.com/apzs/image/-/raw/master/image/6353709216f2c2beb134e44b.jpg)](https://pic1.imgdb.cn/item/6353709216f2c2beb134e44b.jpg)

### 导入后端项目

- 黑马已经提供好了后端项目源码压缩包，我们将其解压之后，放到自己的workspace里
- 然后修改MySQL和Reids的连接要素为自己的，随后启动项目
- 访问http://localhost:8081/shop-type/list， 如果可以看到JSON数据，则说明导入成功

### 导入前端工程

- 黑马已经提供好了前端项目源码压缩包，我们将其解压之后，放到自己的workSpace里

- 然后在nginx所在目录打开一个cmd窗口，输入命令，即可启动项目

  ```bash
  start nginx.exe
  ```

- 访问http://localhost:8080/， 打开开发者模式，可以看到页面
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6353775b16f2c2beb140da1d.jpg)](https://pic1.imgdb.cn/item/6353775b16f2c2beb140da1d.jpg)

## 基于Session实现登录流程

1. 发送验证码
   用户在提交手机号后，会校验手机号是否合法，如果不合法，则要求用户重新输入手机号
   如果手机号合法，后台此时生成对应的验证码，同时将验证码进行保存，然后再通过短信的方式将验证码发送给用户
2. 短信验证码登录、注册
   用户将验证码和手机号进行输入，后台从session中拿到当前验证码，然后和用户输入的验证码进行校验，如果不一致，则无法通过校验，如果一致，则后台根据手机号查询用户，如果用户不存在，则为用户创建账号信息，保存到数据库，无论是否存在，都会将用户信息保存到session中，方便后续获得当前登录信息
3. 校验登录状态
   用户在请求的时候，会从cookie中携带JsessionId到后台，后台通过JsessionId从session中拿到用户信息，如果没有session信息，则进行拦截，如果有session信息，则将用户信息保存到threadLocal中，并放行

## 实现发送短信验证码功能

- 输入手机号，点击发送验证码按钮，查看发送的请求

  > 请求网址: http://localhost:8080/api/user/code?phone=15832165478
  > 请求方法: POST

- 看样子是调用UserController中的code方法，携带参数是`phone`，看黑马提供的源码也证实了我的猜想

  ```java
  /**
      * 发送手机验证码
      */
  @PostMapping("code")
  public Result sendCode(@RequestParam("phone") String phone, HttpSession session) {
      // TODO 发送短信验证码并保存验证码
      return Result.fail("功能未完成");
  }
  ```

- 但是黑马这里并不会真的使用短信服务发送验证码，只是随机生成了一个验证码，那我这里为了后期项目能真的部署上线，还是打算用邮箱验证

- 由于黑马这里貌似没有设置前端的手机号正则判断，所以我们只需要去数据库中修改phone的字段类型，将varchar(11)改为varchar(100)

- 导入邮箱验证需要的maven坐标

  ```xml
  <!-- https://mvnrepository.com/artifact/javax.activation/activation -->
  <dependency>
      <groupId>javax.activation</groupId>
      <artifactId>activation</artifactId>
      <version>1.1.1</version>
  </dependency>
  <!-- https://mvnrepository.com/artifact/javax.mail/mail -->
  <dependency>
      <groupId>javax.mail</groupId>
      <artifactId>mail</artifactId>
      <version>1.4.7</version>
  </dependency>
  <!-- https://mvnrepository.com/artifact/org.apache.commons/commons-email -->
  <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-email</artifactId>
      <version>1.4</version>
  </dependency>
  ```

- 然后编写一个工具类，用于发送邮件验证码

  ```java
  import java.util.Arrays;
  import java.util.Collections;
  import java.util.List;
  import java.util.Properties;
  
  import javax.mail.Authenticator;
  import javax.mail.MessagingException;
  import javax.mail.PasswordAuthentication;
  import javax.mail.Session;
  import javax.mail.Transport;
  import javax.mail.internet.InternetAddress;
  import javax.mail.internet.MimeMessage;
  import javax.mail.internet.MimeMessage.RecipientType;
  
  public class MailUtils {
      public static void main(String[] args) throws MessagingException {
          //可以在这里直接测试方法，填自己的邮箱即可
          sendTestMail("1586385296@qq.com", new MailUtils().achieveCode());
      }
  
      public static void sendTestMail(String email, String code) throws MessagingException {
          // 创建Properties 类用于记录邮箱的一些属性
          Properties props = new Properties();
          // 表示SMTP发送邮件，必须进行身份验证
          props.put("mail.smtp.auth", "true");
          //此处填写SMTP服务器
          props.put("mail.smtp.host", "smtp.qq.com");
          //端口号，QQ邮箱端口587
          props.put("mail.smtp.port", "587");
          // 此处填写，写信人的账号
          props.put("mail.user", "1586385296@qq.com");
          // 此处填写16位STMP口令
          props.put("mail.password", "tnpnxopiyvcxfgjb");
          // 构建授权信息，用于进行SMTP进行身份验证
          Authenticator authenticator = new Authenticator() {
              protected PasswordAuthentication getPasswordAuthentication() {
                  // 用户名、密码
                  String userName = props.getProperty("mail.user");
                  String password = props.getProperty("mail.password");
                  return new PasswordAuthentication(userName, password);
              }
          };
          // 使用环境属性和授权信息，创建邮件会话
          Session mailSession = Session.getInstance(props, authenticator);
          // 创建邮件消息
          MimeMessage message = new MimeMessage(mailSession);
          // 设置发件人
          InternetAddress form = new InternetAddress(props.getProperty("mail.user"));
          message.setFrom(form);
          // 设置收件人的邮箱
          InternetAddress to = new InternetAddress(email);
          message.setRecipient(RecipientType.TO, to);
          // 设置邮件标题
          message.setSubject("Kyle's Blog 邮件测试");
          // 设置邮件的内容体
          message.setContent("尊敬的用户:你好!\n注册验证码为:" + code + "(有效期为一分钟,请勿告知他人)", "text/html;charset=UTF-8");
          // 最后当然就是发送邮件啦
          Transport.send(message);
      }
  
      public static String achieveCode() {  //由于数字 1 、 0 和字母 O 、l 有时分不清楚，所以，没有数字 1 、 0
          String[] beforeShuffle = new String[]{"2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",
                  "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a",
                  "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
                  "w", "x", "y", "z"};
          List<String> list = Arrays.asList(beforeShuffle);//将数组转换为集合
          Collections.shuffle(list);  //打乱集合顺序
          StringBuilder sb = new StringBuilder();
          for (String s : list) {
              sb.append(s); //将集合转化为字符串
          }
          return sb.substring(3, 8);
      }
  }
  ```

- 修改sendCode方法，逻辑如下

  - 验证手机号/邮箱格式

    - 不正确则返回错误信息

    - 正确则发送验证码

      ```java
      /**
      * 发送手机验证码
      */
      @PostMapping("/code")
      public Result sendCode(@RequestParam("phone") String phone, HttpSession session) throws MessagingException {
          // TODO 发送短信验证码并保存验证码
          if (RegexUtils.isEmailInvalid(phone)) {
              return Result.fail("邮箱格式不正确");
          }
          String code = MailUtils.achieveCode();
          session.setAttribute(phone, code);
          log.info("发送登录验证码：{}", code);
          MailUtils.sendTestMail(phone, code);
          return Result.ok();
      }
      ```

- 然后输入邮箱，发送验证码，看看能否接收到验证码

- 测试没有问题之后，我们继续来编写登录功能，点击登录按钮，查看发送的请求

  > 请求网址: http://localhost:8080/api/user/login
  > 请求方法: POST

- 看样子是UserController中的login方法，携带的参数也就是我们的邮箱和验证码

  ```json
  {phone: "1586385296@qq.com", code: "iMPKc"}
  ```

- 黑马提供的代码如下，看样子是把邮箱和验证码封装到了LoginFormDto中

  - login
  - LoginFormDTO

  ```java
  /**
   * 登录功能
   * @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码
   */
  @PostMapping("/login")
  public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session){
      // TODO 实现登录功能
      return Result.fail("功能未完成");
  }
  ```

  

- 修改login方法，逻辑如下

  - 校验手机号/邮箱
    - 不正确则返回错误信息
    - 正确则继续校验验证码
      - 不一致则报错
      - 一致则先根据手机号/邮箱查询用户
        - 用户不存在则创建
        - 存在则继续执行程序
      - 保存用户信息到session中

- login
- createUserWithPhone

```java
/**
* 登录功能
*
* @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码
*/
@PostMapping("/login")
public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session) {
    // TODO 实现登录功能
    //获取登录账号
    String phone = loginForm.getPhone();
    //获取登录验证码
    String code = loginForm.getCode();
    //获取session中的验证码
    Object cacheCode = session.getAttribute(phone);

    //1. 校验邮箱
    if (RegexUtils.isEmailInvalid(phone)) {
        //2. 不符合格式则报错
        return Result.fail("邮箱格式不正确！！");
    }
    //3. 校验验证码
    log.info("code:{},cacheCode{}", code, cacheCode);
    if (code == null || !cacheCode.toString().equals(code)) {
        //4. 不一致则报错
        return Result.fail("验证码不一致！！");
    }
    //5. 根据账号查询用户是否存在
    LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
    queryWrapper.eq(User::getPhone, phone);
    User user = userService.getOne(queryWrapper);
    //6. 如果不存在则创建
    if (user == null) {
        // 创建的逻辑封装成了一个方法
        user = createUserWithPhone(phone);
    }
    //7. 保存用户信息到session中
    session.setAttribute("user", user);
    return Result.ok();
}
```



## 实现登录拦截功能

- 这部分需要用到拦截器的知识，我在前面的SSM整合篇做过详细介绍

  SSM整合

  https://cyborg2077.github.io/2022/09/10/SSMIntegration/

- 创建一个LoginInterceptor类，实现HandlerInterceptor接口，重写其中的两个方法，前置拦截器和完成处理方法，前置拦截器主要用于我们登陆之前的权限校验，完成处理方法是用于处理登录后的信息，避免内存泄露

- LoginInterceptor
- UserHolder
- MvcConfig

```java
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //1. 获取session
        HttpSession session = request.getSession();
        //2. 获取session中的用户信息
        User user = (User) session.getAttribute("user");
        //3. 判断用户是否存在
        if (user == null) {
            //4. 不存在，则拦截
            response.setStatus(401);
            return false;
        }
        //5. 存在，保存用户信息到ThreadLocal，UserHolder是提供好了的工具类
        UserHolder.saveUser(user);
        //6. 放行
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserHolder.removeUser();
    }
}
```

- 顺便再写一下me方法

  ```java
  @GetMapping("/me")
  public Result me() {
      // TODO 获取当前登录的用户并返回
      User user = UserHolder.getUser();
      return Result.ok(user);
  }
  ```

## 隐藏用户敏感信息

- 我们通过浏览器观察到此时用户的全部信息都在，这样极为不靠谱，所以我们应当在返回用户信息之前，将用户的敏感信息进行隐藏，采用的核心思路就是书写一个UserDto对象，这个UserDto对象就没有敏感信息了，我们在返回前，将有用户敏感信息的User对象转化成没有敏感信息的UserDto对象，那么就能够避免这个尴尬的问题了

  ```json
  {
      "success":true,
      "data":{
          "id":1010,
          "phone":"1586385296@qq.com",
          "password":"",
          "nickName":"user_i1b3ir09",
          "icon":"",
          "createTime":"2022-10-22T14:20:33",
          "updateTime":"2022-10-22T14:20:33"
      }
  }
  ```

- UserDto类如下，将User对象中的属性拷贝给UserDto，就可以避免暴露用户的隐藏信息

  ```java
  @Data
  public class UserDTO {
      private Long id;
      private String nickName;
      private String icon;
  }
  ```

- 修改UserHolder，将其User类型都换为UserDto

  ```java
  public class UserHolder {
      private static final ThreadLocal<UserDTO> tl = new ThreadLocal<>();
  
      public static void saveUser(UserDTO user){
          tl.set(user);
      }
  
      public static UserDTO getUser(){
          return tl.get();
      }
  
      public static void removeUser(){
          tl.remove();
      }
  }
  ```

- 修改login方法

  ```diff
  @PostMapping("/login")
  public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session) {
  	// TODO 实现登录功能
  	//获取登录账号
  	String phone = loginForm.getPhone();
  	//获取登录验证码
  	String code = loginForm.getCode();
  	//获取session中的验证码
  	Object cacheCode = session.getAttribute(phone);
  
  	//1. 校验邮箱
  	if (RegexUtils.isEmailInvalid(phone)) {
  		//2. 不符合格式则报错
  		return Result.fail("邮箱格式不正确！！");
  	}
  	//3. 校验验证码
  	log.info("code:{},cacheCode{}", code, cacheCode);
  	if (code == null || !cacheCode.toString().equals(code)) {
  		//4. 不一致则报错
  		return Result.fail("验证码不一致！！");
  	}
  	//5. 根据账号查询用户是否存在
  	LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
  	queryWrapper.eq(User::getPhone, phone);
  	User user = userService.getOne(queryWrapper);
  	//6. 如果不存在则创建
  	if (user == null) {
  		user = createUserWithPhone(phone);
  	}
  	//7. 保存用户信息到session中
  -   session.setAttribute("user", user);
  +   UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
  +   session.setAttribute("user", userDTO);
  	return Result.ok();
  }
  ```

- 修改拦截器

  ```diff
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
  	//1. 获取session
  	HttpSession session = request.getSession();
  	//2. 获取session中的用户信息
  -   User user = (User) session.getAttribute("user");
  +   UserDTO user = (UserDTO) session.getAttribute("user");
  	//3. 判断用户是否存在
  	if (user == null) {
  		//4. 不存在，则拦截
  		response.setStatus(401);
  		return false;
  	}
  	//5. 存在，保存用户信息到ThreadLocal，UserHolder是提供好了的工具类
  	UserHolder.saveUser(user);
  	//6. 放行
  	return true;
  }
  ```
  
- 重启服务器，登录后查看此时的用户信息，敏感信息已经不存在了

  ```json
  {
      "success":true,
      "data":{
          "id":1016,
          "nickName":"user_zkhf7cfv",
          "icon":""
      }
  }
  ```

## session共享问题

- 每个tomcat中都有一份属于自己的session,假设用户第一次访问第一台tomcat，并且把自己的信息存放到第一台服务器的session中，但是第二次这个用户访问到了第二台tomcat，那么在第二台服务器上，肯定没有第一台服务器存放的session，所以此时 整个登录拦截功能就会出现问题，我们能如何解决这个问题呢？早期的方案是session拷贝，就是说虽然每个tomcat上都有不同的session，但是每当任意一台服务器的session修改时，都会同步给其他的Tomcat服务器的session，这样的话，就可以实现session的共享了
- 但是这种方案具有两个大问题
  1. 每台服务器中都有完整的一份session数据，服务器压力过大。
  2. session拷贝数据时，可能会出现延迟
- 所以我们后面都是基于Redis来完成，我们把session换成Redis，Redis数据本身就是共享的，就可以避免session共享的问题了

## Redis替代session的业务流程

### 设计key结构

- 首先我们来思考一下该用什么数据结构来存储数据
- 由于存入的数据比较简单，我们可以使用String或者Hash
  - 如果使用String，以JSON字符串来保存数据，会额外占用部分空间
  - 如果使用Hash，则它的value中只会存储数据本身
- 如果不是特别在意内存，直接使用String就好了

### 设计key的具体细节

- 我们这里就采用的是简单的K-V键值对方式
- 但是对于key的处理，不能像session一样用phone或code来当做key
- 因为Redis的key是共享的，code可能会重复，phone这种敏感字段也不适合存储到Redis中
- 在设计key的时候，我们需要满足两点
  1. key要有唯一性
  2. key要方便携带
- 所以我们在后台随机生成一个token，然后让前端带着这个token就能完成我们的业务逻辑了

### 整体访问流程

- 当注册完成后，用户去登录，然后校验用户提交的手机号/邮箱和验证码是否一致
  - 如果一致，则根据手机号查询用户信息，不存在则新建，最后将用户数据保存到Redis，并生成一个token作为Redis的key
- 当我们校验用户是否登录时，回去携带着token进行访问，从Redis中获取token对应的value，判断是否存在这个数据
  - 如果不存在，则拦截
  - 如果存在，则将其用户信息(userDto)保存到threadLocal中，并放行

## 基于Redis实现短信登录

- 由于前面已经分析过业务逻辑了，所以这里我们直接开始写代码，在此之前我们要在UserController中注入

  ```
  StringRedisTemplate
  ```

  ```java
  @Autowired
  private StringRedisTemplate stringRedisTemplate;
  ```

- 修改sendCode方法

  - 修改sendCode方法
  - RedisConstants

  这里的key使用用`login:code:email`的形式，并设置有效期2分钟，我们也可以定义一个常量类来替换这里的`login:code:`和`2`，让代码显得更专业一点

  ```diff
  @PostMapping("/code")
  public Result sendCode(@RequestParam("phone") String phone, HttpSession session) throws MessagingException {
      // TODO 发送短信验证码并保存验证码
      if (RegexUtils.isEmailInvalid(phone)) {
          return Result.fail("邮箱格式不正确");
      }
      String code = MailUtils.achieveCode();
  -   session.setAttribute(phone, code);
  -   stringRedisTemplate.opsForValue().set("login:code:" + phone, code, 2, TimeUnit.MINUTES);
  +   stringRedisTemplate.opsForValue().set(LOGIN_CODE_KEY + phone, code, LOGIN_CODE_TTL, TimeUnit.MINUTES);
      log.info("发送登录验证码：{}", code);
  //        MailUtils.sendTestMail(phone, code);
      return Result.ok();
  }
  ```

- 修改login方法

  - DIFF
  - 修改后代码

  ```diff
  @PostMapping("/login")
  public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session) {
  	// TODO 实现登录功能
  	//获取登录账号
  	String phone = loginForm.getPhone();
  	//获取登录验证码
  	String code = loginForm.getCode();
  -   //获取session中的验证码
  -   Object cacheCode = session.getAttribute(phone);
  +   //获取redis中的验证码
  +   String sessionCode = stringRedisTemplate.opsForValue().get(LOGIN_CODE_KEY + userCode);
  	//1. 校验邮箱
  	if (RegexUtils.isEmailInvalid(phone)) {
  		//2. 不符合格式则报错
  		return Result.fail("邮箱格式不正确！！");
  	}
  	//3. 校验验证码
  	log.info("code:{},cacheCode{}", code, cacheCode);
  	if (code == null || !cacheCode.toString().equals(code)) {
  		//4. 不一致则报错
  		return Result.fail("验证码不一致！！");
  	}
  	//5. 根据账号查询用户是否存在
  	LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
  	queryWrapper.eq(User::getPhone, phone);
  	User user = userService.getOne(queryWrapper);
  	//6. 如果不存在则创建
  	if (user == null) {
  		user = createUserWithPhone(phone);
  	}
  -   //7. 保存用户信息到session中
  +   //7. 保存用户信息到Redis中
  +   //7.1 随机生成token，作为登录令牌
  +   String token = UUID.randomUUID().toString();
  +   //7.2 将UserDto对象转为HashMap存储
  +   UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
  +   HashMap<String, String > userMap = new HashMap<>();
  +   userMap.put("icon", userDTO.getIcon());
  +   userMap.put("id", String.valueOf(userDTO.getId()));
  +   userMap.put("nickName", userDTO.getNickName(    ));
  +   //7.3 存储
  +   String tokenKey = LOGIN_USER_KEY + token;
  +   stringRedisTemplate.opsForHash().putAll(tokenKey, userMap);
  +   //7.4 设置token有效期为30分钟
  +   stringRedisTemplate.expire(tokenKey, 30, TimeUnit.MINUTES);
  +   //7.5 登陆成功则删除验证码信息
  +   stringRedisTemplate.delete(LOGIN_CODE_KEY + phone);
  -   session.setAttribute("user", userDTO);
  +   //8. 返回token
  +   return Result.ok(token);
  }
  ```
  


## 解决状态登录刷新问题

### 初始方案

- 我们可以通过拦截器拦截到的请求，来证明用户是否在操作，如果用户没有任何操作30分钟，则token会消失，用户需要重新登录

- 通过查看请求，我们发现我们存的token在请求头里，那么我们就在拦截器里来刷新token的存活时间

  > authorization: 6867061d-a8d0-4e60-b92f-97f7d698a1ca

- 修改我们的登陆拦截器`LoginInterceptor`类

  ```java
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
      //1. 获取请求头中的token
      String token = request.getHeader("authorization");
      //2. 如果token是空，则未登录，拦截
      if (StrUtil.isBlank(token)) {
          response.setStatus(401);
          return false;
      }
      String key = RedisConstants.LOGIN_USER_KEY + token;
      //3. 基于token获取Redis中的用户数据
      Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(key);
      //4. 判断用户是否存在，不存在，则拦截
      if (userMap.isEmpty()) {
          response.setStatus(401);
          return false;
      }
      //5. 将查询到的Hash数据转化为UserDto对象
      UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);
      //6. 将用户信息保存到ThreadLocal
      UserHolder.saveUser(userDTO);
      //7. 刷新tokenTTL，这里的存活时间根据需要自己设置，这里的常量值我改为了30分钟
      stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);
      return true;
  }
  ```

- 在这个方案中，他确实可以使用对应路径的拦截，同时刷新登录token令牌的存活时间，但是现在这个拦截器他只是拦截需要被拦截的路径，假设当前用户访问了一些不需要拦截的路径，那么这个拦截器就不会生效，所以此时令牌刷新的动作实际上就不会执行，所以这个方案他是存在问题的

[![img](https://gitlab.com/apzs/image/-/raw/master/image/6353edd016f2c2beb1f967f0.jpg)](https://pic1.imgdb.cn/item/6353edd016f2c2beb1f967f0.jpg)

### 优化方案

- 既然之前的拦截器无法对不需要拦截的路径生效，那么我们可以添加一个拦截器，在第一个拦截器中拦截所有的路径，把第二个拦截器做的事情放入到第一个拦截器中，同时刷新令牌，因为第一个拦截器有了threadLocal的数据，所以此时第二个拦截器只需要判断拦截器中的user对象是否存在即可，完成整体刷新功能。

[![img](https://gitlab.com/apzs/image/-/raw/master/image/6353ef1416f2c2beb1fb5e48.jpg)](https://pic1.imgdb.cn/item/6353ef1416f2c2beb1fb5e48.jpg)

- 新建一个`RefreshTokenInterceptor`类，其业务逻辑与之前的`LoginInterceptor`类似，就算遇到用户未登录，也继续放行，交给`LoginInterceptor`处理。由于这个对象是我们手动在WebConfig里创建的，所以这里不能用@AutoWired自动装配，只能声明一个私有的，到了WebConfig里再自动装配

  ```java
  public class RefreshTokenInterceptor implements HandlerInterceptor {
      //这里并不是自动装配，因为RefreshTokenInterceptor是我们手动在WebConfig里new出来的
      private StringRedisTemplate stringRedisTemplate;
  
      public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {
          this.stringRedisTemplate = stringRedisTemplate;
      }
  
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          //1. 获取请求头中的token
          String token = request.getHeader("authorization");
          //2. 如果token是空，直接放行，交给LoginInterceptor处理
          if (StrUtil.isBlank(token)) {
              return true;
          }
          String key = RedisConstants.LOGIN_USER_KEY + token;
          //3. 基于token获取Redis中的用户数据
          Map<Object, Object> userMap = stringRedisTemplate.opsForHash().entries(key);
          //4. 判断用户是否存在，不存在，也放行，交给LoginInterceptor
          if (userMap.isEmpty()) {
              return true;
          }
          //5. 将查询到的Hash数据转化为UserDto对象
          UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);
          //6. 将用户信息保存到ThreadLocal
          UserHolder.saveUser(userDTO);
          //7. 刷新tokenTTL，这里的存活时间根据需要自己设置，这里的常量值我改为了30分钟
          stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);
          return true;
      }
  
      @Override
      public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
          UserHolder.removeUser();
      }
  }
  ```
  
- 修改我们之前的`LoginInterceptor`类，只需要判断用户是否存在，不存在，则拦截，存在则放行

  ```java
  public class LoginInterceptor implements HandlerInterceptor {
  
      @Override
      public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
          //判断用户是否存在
          if (UserHolder.getUser()==null){
              //不存在则拦截
              response.setStatus(401);
              return false;
          }
          //存在则放行
          return true;
      }
  
      @Override
      public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
          UserHolder.removeUser();
      }
  }
  ```
  
- 修改`WebConfig`配置类，拦截器的执行顺序可以由order来指定，如果未设置拦截路径，则默认是拦截所有路径

  ```java
  @Configuration
  public class MvcConfig implements WebMvcConfigurer {
      //到了这里才能自动装配
      @Autowired
      private StringRedisTemplate stringRedisTemplate;
  
      @Override
      public void addInterceptors(InterceptorRegistry registry) {
          registry.addInterceptor(new LoginInterceptor())
                  .excludePathPatterns(
                          "/user/code",
                          "/user/login",
                          "/blog/hot",
                          "/shop/**",
                          "/shop-type/**",
                          "/upload/**",
                          "/voucher/**"
                  ).order(1);
          //RefreshTokenInterceptor是我们手动new出来的
          registry.addInterceptor(new RefreshTokenInterceptor(stringRedisTemplate)).order(0);
      }
  }
  ```
  
- 那么至此，大功告成，我们重启服务器，登录，然后去Redis的图形化界面查看token的ttl，如果每次切换界面之后，ttl都会重置，那么说明我们的代码没有问题

# 商户查询缓存

## 什么是缓存

- 什么是缓存？

  - 缓存就像自行车、越野车的避震器

- 举个例子

  - 越野车、山地自行车都有`避震器`，防止车体加速之后因惯性，在`U`型地形上飞跃硬着陆导致`损坏`，像个弹簧意义

- 同样，在实际开发中，系统也需要`避震器`，防止过高的数据量猛冲系统，导致其操作线程无法及时处理信息而瘫痪

- 在实际开发中，对企业来讲，产品口碑、用户评价都是致命的，所以企业非常重视缓存技术

- 缓存(Cache)就是数据交换的`缓冲区`，俗称的缓存就是缓冲区内的数据，一般从数据库中获取，存储于本地，例如
  
  - 本地用高并发
  - 用于Redis等缓存
  - 本地缓存

  ```java
  Static final ConcurrentHashMap<K,V> map = new ConcurrentHashMap<>();
  ```

- 由于其被`static`修饰，所以随着类的加载而加载到内存之中，作为本地缓存，由于其又被`final`修饰，所以其引用之间的关系是固定的，不能改变，因此不用担心复制导致缓存失败

### 为什么要使用缓存

- 言简意赅：速度快，好用

- 缓存数据存储于代码中，而代码运行在内存中，内存的读写性能远高于磁盘，缓存可以大大降低用户访问并发量带来的服务器读写压力

- 实际开发中，企业的数据量，少则几十万，多则几千万，这么大的数据量，如果没有缓存来作为`避震器`系统是几乎撑不住的，所以企业会大量运用缓存技术

- 但是缓存也会增加代码复杂度和运营成本

- 缓存的作用
  1. 降低后端负载
  2. 提高读写效率，降低响应时间

- 缓存的成本
  1. 数据一致性成本
  2. 代码维护成本
  3. 运维成本（一般采用服务器集群，需要多加机器，机器就是钱）

### 如何使用缓存

- 实际开发中，会构筑多级缓存来时系统运行速度进一步提升，例如：本地缓存与Redis中的缓存并发使用
- `浏览器缓存：`主要是存在于浏览器端的缓存
- `应用层缓存：`可以分为toncat本地缓存，例如之前提到的map或者是使用Redis作为缓存
- `数据库缓存：`在数据库中有一片空间是buffer pool，增改查数据都会先加载到mysql的缓存中
- `CPU缓存：`当代计算机最大的问题就是CPU性能提升了，但是内存读写速度没有跟上，所以为了适应当下的情况，增加了CPU的L1，L2，L3级的缓存

## 添加商户缓存

- 我们先启动前端和后端的项目，登陆之后随便访问一个商户，查看浏览器发送的请求

  > 请求网址: http://localhost:8080/api/shop/10
  > 请求方法: GET

- 不出意外是`ShopController`里的业务逻辑，而且restFul风格的

- 在我们查询商户信息时，我们是直接操作从数据库中去进行查询的，大致逻辑是这样，直接查询数据库肯定慢

  ```java
  /**
      * 根据id查询商铺信息
      * @param id 商铺id
      * @return 商铺详情数据
      */
  @GetMapping("/{id}")
  public Result queryShopById(@PathVariable("id") Long id) {
      return Result.ok(shopService.getById(id));
  }
  ```
  
- 所以我们可以在客户端与数据库之间加上一个Redis缓存，先从Redis中查询，如果没有查到，再去MySQL中查询，同时查询完毕之后，将查询到的数据也存入Redis，这样当下一个用户来进行查询的时候，就可以直接从Redis中获取到数据

[![img](https://gitlab.com/apzs/image/-/raw/master/image/6354a19216f2c2beb1b095dd.jpg)](https://pic1.imgdb.cn/item/6354a19216f2c2beb1b095dd.jpg)

### 缓存模型和思路

- 标准的操作方式就是查询数据库之前先查询缓存，如果缓存数据存在，则直接从缓存中返回，如果缓存数据不存在，再查询数据库，然后将数据存入Redis。
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6354a1aa16f2c2beb1b0aa83.jpg)](https://pic1.imgdb.cn/item/6354a1aa16f2c2beb1b0aa83.jpg)

### 代码实现

代码思路：如果Redis缓存里有数据，那么直接返回，如果缓存中没有，则去查询数据库，然后存入Redis

- Controller层
- Servie层
- ServieImpl层

业务逻辑我们写到Service中，需要在Service层创建这个`queryById`方法，然后去ServiceImpl中实现

```java
@GetMapping("/{id}")
public Result queryShopById(@PathVariable("id") Long id) {
    return shopService.queryById(id);
}
```

重启服务器，访问商户信息，观察控制台日志输出，后续刷新页面，不会出现SQL语句查询商户信息，去Redis图形化界面中查看，可以看到缓存的商户信息数据

### 趁热打铁

完成了商户数据缓存之后，我们尝试做一下商户类型数据缓存

- Controller层
- Service层
- ServiceImpl层

业务逻辑依旧是写在Service中

```java
@GetMapping("list")
public Result queryTypeList() {
    return typeService.queryList();
}
```


## 缓存更新策略

缓存更新是Redis为了节约内存而设计出来的一个东西，主要是因为内存数据宝贵，当我们想Redis插入太多数据，此时就可能会导致缓存中数据过多，所以Redis会对部分数据进行更新，或者把它成为淘汰更合适

- `内存淘汰`：Redis自动进行，当Redis内存大道我们设定的`max-memery`时，会自动触发淘汰机制，淘汰掉一些不重要的数据（可以自己设置策略方式）
- `超时剔除`：当我们给Redis设置了过期时间TTL之后，Redis会将超时的数据进行删除，方便我们继续使用缓存
- `主动更新`：我们可以手动调用方法把缓存删除掉，通常用于解决缓存和数据库不一致问题

|          |                           内存淘汰                           |                           超时剔除                           |                    主动更新                    |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--------------------------------------------: |
|   说明   | 不用自己维护， 利用Redis的内存淘汰机制， 当内存不足时自动淘汰部分数据。 下次查询时更新缓存。 | 给缓存数据添加TTL时间， 到期后自动删除缓存。 下次查询时更新缓存。 | 编写业务逻辑， 在修改数据库的同时， 更新缓存。 |
|  一致性  |                              差                              |                             一般                             |                       好                       |
| 维护成本 |                              无                              |                              低                              |                       高                       |

业务场景
- 低一致性需求：使用内存淘汰机制，例如店铺类型的查询缓存（因为这个很长一段时间都不需要更新）
- 高一致性需求：主动更新，并以超时剔除作为兜底方案，例如店铺详情查询的缓存

### 数据库和缓存不一致解决方案

由于我们的缓存数据源来自数据库，而数据库的数据是会发生变化的，因此，如果当数据库中数据发生变化，而缓存却没有同步，此时就会有一致性问题存在，其后果是用户使用缓存中的过时数据，就会产生类似多线程数据安全问题，从而影响业务，产品口碑等

那么如何解决这个问题呢？有如下三种方式
1. Cache Aside Pattern 人工编码方式：缓存调用者在更新完数据库之后再去更新缓存，也称之为双写方案
2. Read/Write Through Pattern：缓存与数据库整合为一个服务，由服务来维护一致性。调用者调用该服务，无需关心缓存一致性问题。但是维护这样一个服务很复杂，市面上也不容易找到这样的一个现成的服务，开发成本高
3. Write Behind Caching Pattern：调用者只操作缓存，其他线程去异步处理数据库，最终实现一致性。但是维护这样的一个异步的任务很复杂，需要实时监控缓存中的数据更新，其他线程去异步更新数据库也可能不太及时，而且缓存服务器如果宕机，那么缓存的数据也就丢失了

### 数据库和缓存不一致采用什么方案

- 综上所述，在企业的实际应用中，还是方案一最可靠，但是方案一的调用者该如何处理呢？
- 如果采用方案一，假设我们每次操作完数据库之后，都去更新一下缓存，但是如果中间并没有人查询数据，那么这个更新动作只有最后一次是有效的，中间的更新动作意义不大，所以我们可以把缓存直接删除，等到有人再次查询时，再将缓存中的数据加载出来
- 对比删除缓存与更新缓存
  - `更新缓存`：每次更新数据库都需要更新缓存，无效写操作较多
  - `删除缓存`：更新数据库时让缓存失效，再次查询时更新缓存
- 如何保证缓存与数据库的操作同时成功/同时失败
  - `单体系统：`将缓存与数据库操作放在同一个事务
  - `分布式系统：`利用TCC等分布式事务方案
- 先操作缓存还是先操作数据库？我们来仔细分析一下这两种方式的线程安全问题
- 先删除缓存，在操作数据库
  删除缓存的操作很快，但是更新数据库的操作相对较慢，如果此时有一个线程2刚好进来查询缓存，由于我们刚刚才删除缓存，所以线程2需要查询数据库，并写入缓存，但是我们更新数据库的操作还未完成，所以线程2查询到的数据是脏数据，出现线程安全问题
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6354be3e16f2c2beb1d11bd0.jpg)](https://pic1.imgdb.cn/item/6354be3e16f2c2beb1d11bd0.jpg)
- 先操作数据库，再删除缓存
  线程1在查询缓存的时候，缓存TTL刚好失效，需要查询数据库并写入缓存，这个操作耗时相对较短（相比较于上图来说），但是就在这么短的时间内，线程2进来了，更新数据库，删除缓存，但是线程1虽然查询完了数据（更新前的旧数据），但是还没来得及写入缓存，所以线程2的更新数据库与删除缓存，并没有影响到线程1的查询旧数据，写入缓存，造成线程安全问题
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6354be5316f2c2beb1d130c0.jpg)](https://pic1.imgdb.cn/item/6354be5316f2c2beb1d130c0.jpg)
- 虽然这二者都存在线程安全问题，但是相对来说，后者出现线程安全问题的概率相对较低，所以我们最终采用后者`先操作数据库，再删除缓存`的方案

## 实现商铺缓存与数据库双写一致

- 核心思路如下

  - 修改ShopController中的业务逻辑，满足以下要求

  1. 根据id查询店铺时，如果缓存未命中，则查询数据库，并将数据库结果写入缓存，并设置TTL
  2. 根据id修改店铺时，先修改数据库，再删除缓存

- 修改ShopController的queryById方法，写入缓存时设置一下TTL

  ```java
  @Override
  public Result queryById(Long id) {
      //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
      String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
      //如果不为空（查询到了），则转为Shop类型直接返回
      if (StrUtil.isNotBlank(shopJson)) {
          Shop shop = JSONUtil.toBean(shopJson, Shop.class);
          return Result.ok(shop);
      }
      //否则去数据库中查
      Shop shop = getById(id);
      //查不到返回一个错误信息或者返回空都可以，根据自己的需求来
      if (shop == null){
          return Result.fail("店铺不存在！！");
      }
      //查到了则转为json字符串
      String jsonStr = JSONUtil.toJsonStr(shop);
      //并存入redis，设置TTL
      stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr,CACHE_SHOP_TTL, TimeUnit.MINUTES);
      //最终把查询到的商户信息返回给前端
      return Result.ok(shop);
  }
  ```
  
- 修改update方法

  - 之前的update方法
  - 修改后的update方法
  - Service层
  - ServiceImpl层

  ```java
  /**
      * 更新商铺信息
      *
      * @param shop 商铺数据
      * @return 无
      */
  @PutMapping
  public Result updateShop(@RequestBody Shop shop) {
      // 写入数据库
      shopService.updateById(shop);
      return Result.ok();
  }
  ```
  
  
  
- 修改完毕之后我们重启服务器进行测试，首先随便挑一个顺眼的数据，我这里就是拿餐厅数据做测试，，我们先访问该餐厅，将该餐厅的数据缓存到Redis中，之后使用POSTMAN发送PUT请求，请求路径http://localhost:8080/api/shop/，携带JSON数据如下

  ```json
  {
    "area": "大关",
    "openHours": "10:00-22:00",
    "sold": 4215,
    "address": "金华路锦昌文华苑29号",
    "comments": 3035,
    "avgPrice": 80,
    "score": 37,
    "name": "476茶餐厅",
    "typeId": 1,
    "id": 1
  }
  ```
  
- 之后再Redis图形化页面刷新数据，发现该餐厅的数据确实不在Redis中了，之后我们刷新网页，餐厅名会被改为`476茶餐厅`，然后我们再去Redis中刷新，发现新数据已经被缓存了

- 那么现在功能就实现完毕了，只有当我们刷新页面的时候，才会重新查询数据库，并将数据缓存到Redis，中途无论修改多少次，只要不刷新页面访问，Redis中都不会更新数据

## 缓存穿透问题的解决思路

- `缓存穿透`：缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远都不会生效（只有数据库查到了，才会让redis缓存，但现在的问题是查不到），会频繁的去访问数据库。
- 常见的结局方案有两种
  1. 缓存空对象
     - 优点：实现简单，维护方便
     - 缺点：额外的内存消耗，可能造成短期的不一致
  2. 布隆过滤
     - 优点：内存占用啥哦，没有多余的key
     - 缺点：实现复杂，可能存在误判
- `缓存空对象`思路分析：当我们客户端访问不存在的数据时，会先请求redis，但是此时redis中也没有数据，就会直接访问数据库，但是数据库里也没有数据，那么这个数据就穿透了缓存，直击数据库。但是数据库能承载的并发不如redis这么高，所以如果大量的请求同时都来访问这个不存在的数据，那么这些请求就会访问到数据库，简单的解决方案就是哪怕这个数据在数据库里不存在，我们也把这个这个数据存在redis中去（这就是为啥说会有`额外的内存消耗`），这样下次用户过来访问这个不存在的数据时，redis缓存中也能找到这个数据，不用去查数据库。可能造成的`短期不一致`是指在空对象的存活期间，我们更新了数据库，把这个空对象变成了正常的可以访问的数据，但由于空对象的TTL还没过，所以当用户来查询的时候，查询到的还是空对象，等TTL过了之后，才能访问到正确的数据，不过这种情况很少见罢了
- `布隆过滤`思路分析：布隆过滤器其实采用的是哈希思想来解决这个问题，通过一个庞大的二进制数组，根据哈希思想去判断当前这个要查询的数据是否存在，如果布隆过滤器判断存在，则放行，这个请求会去访问redis，哪怕此时redis中的数据过期了，但是数据库里一定会存在这个数据，从数据库中查询到数据之后，再将其放到redis中。如果布隆过滤器判断这个数据不存在，则直接返回。这种思想的优点在于节约内存空间，但存在误判，误判的原因在于：布隆过滤器使用的是哈希思想，只要是哈希思想，都可能存在哈希冲突

## 编码解决商品查询的缓存穿透问题

- 核心思路如下

- 在原来的逻辑中，我们如果发现这个数据在MySQL中不存在，就直接返回一个错误信息了，但是这样存在缓存穿透问题

  ```java
  @Override
  public Result queryById(Long id) {
      //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
      String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
      //如果不为空（查询到了），则转为Shop类型直接返回
      if (StrUtil.isNotBlank(shopJson)) {
          Shop shop = JSONUtil.toBean(shopJson, Shop.class);
          return Result.ok(shop);
      }
      //否则去数据库中查
      Shop shop = getById(id);
      //查不到返回一个错误信息或者返回空都可以，根据自己的需求来
      if (shop == null){
          return Result.fail("店铺不存在！！");
      }
      //查到了则转为json字符串
      String jsonStr = JSONUtil.toJsonStr(shop);
      //并存入redis，设置TTL
      stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr,CACHE_SHOP_TTL, TimeUnit.MINUTES);
      //最终把查询到的商户信息返回给前端
      return Result.ok(shop);
  }
  ```
  
- 现在的逻辑是：如果这个数据不存在，将这个数据写入到Redis中，并且将value设置为空字符串，然后设置一个较短的TTL，返回错误信息。当再次发起查询时，先去Redis中判断value是否为空字符串，如果是空字符串，则说明是刚刚我们存的不存在的数据，直接返回错误信息

  ```java
  @Override
  public Result queryById(Long id) {
      //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
      String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
      //如果不为空（查询到了），则转为Shop类型直接返回
      if (StrUtil.isNotBlank(shopJson)) {
          Shop shop = JSONUtil.toBean(shopJson, Shop.class);
          return Result.ok(shop);
      }
      //如果查询到的是空字符串，则说明是我们缓存的空数据
      if (shopjson != null) {
          return Result.fail("店铺不存在！！");
      }
      //否则去数据库中查
      Shop shop = getById(id);
      //查不到，则将空字符串写入Redis
      if (shop == null) {
          //这里的常量值是2分钟
          stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
          return Result.fail("店铺不存在！！");
      }
      //查到了则转为json字符串
      String jsonStr = JSONUtil.toJsonStr(shop);
      //并存入redis，设置TTL
      stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr, CACHE_SHOP_TTL, TimeUnit.MINUTES);
      //最终把查询到的商户信息返回给前端
      return Result.ok(shop);
  }
  ```

小结：

- 缓存穿透产生的原因是什么？
  - 用户请求的数据在缓存中和在数据库中都不存在，不断发起这样的请求，会给数据库带来巨大压力
- 缓存产投的解决方案有哪些？
  - 缓存null值
  - 布隆过滤
  - 增强id复杂度，避免被猜测id规律（可以采用雪花算法）
  - 做好数据的基础格式校验
  - 加强用户权限校验
  - 做好热点参数的限流

## 缓存雪崩问题及解决思路

- 缓存雪崩是指在同一时间段，大量缓存的key同时失效，或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力
- 解决方案
  - 给不同的Key的TTL添加随机值，让其在不同时间段分批失效
  - 利用Redis集群提高服务的可用性（使用一个或者多个哨兵(`Sentinel`)实例组成的系统，对redis节点进行监控，在主节点出现故障的情况下，能将从节点中的一个升级为主节点，进行故障转义，保证系统的可用性。 ）
  - 给缓存业务添加降级限流策略
  - 给业务添加多级缓存（浏览器访问静态资源时，优先读取浏览器本地缓存；访问非静态资源（ajax查询数据）时，访问服务端；请求到达Nginx后，优先读取Nginx本地缓存；如果Nginx本地缓存未命中，则去直接查询Redis（不经过Tomcat）；如果Redis查询未命中，则查询Tomcat；请求进入Tomcat后，优先查询JVM进程缓存；如果JVM进程缓存未命中，则查询数据库）

## 缓存击穿问题及解决思路

- 缓存击穿也叫热点Key问题，就是一个被`高并发访问`并且`缓存重建业务较复杂`的key突然失效了，那么无数请求访问就会在瞬间给数据库带来巨大的冲击
- 举个不太恰当的例子：一件秒杀中的商品的key突然失效了，大家都在疯狂抢购，那么这个瞬间就会有无数的请求访问去直接抵达数据库，从而造成缓存击穿
- 常见的解决方案有两种
  1. 互斥锁
  2. 逻辑过期
- `逻辑分析`：假设线程1在查询缓存之后未命中，本来应该去查询数据库，重建缓存数据，完成这些之后，其他线程也就能从缓存中加载这些数据了。但是在线程1还未执行完毕时，又进来了线程2、3、4同时来访问当前方法，那么这些线程都不能从缓存中查询到数据，那么他们就会在同一时刻访问数据库，执行SQL语句查询，对数据库访问压力过大
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6354f77716f2c2beb1225032.jpg)](https://pic1.imgdb.cn/item/6354f77716f2c2beb1225032.jpg)
- `解决方案一`：互斥锁
- 利用锁的互斥性，假设线程过来，只能一个人一个人的访问数据库，从而避免对数据库频繁访问产生过大压力，但这也会影响查询的性能，将查询的性能从并行变成了串行，我们可以采用tryLock方法+double check来解决这个问题
- 线程1在操作的时候，拿着锁把房门锁上了，那么线程2、3、4就不能都进来操作数据库，只有1操作完了，把房门打开了，此时缓存数据也重建好了，线程2、3、4直接从redis中就可以查询到数据。

[![img](https://gitlab.com/apzs/image/-/raw/master/image/6354f76816f2c2beb1223b47.jpg)](https://pic1.imgdb.cn/item/6354f76816f2c2beb1223b47.jpg)

- `解决方案二`：逻辑过期方案
- 方案分析：我们之所以会出现缓存击穿问题，主要原因是在于我们对key设置了TTL，如果我们不设置TTL，那么就不会有缓存击穿问题，但是不设置TTL，数据又会一直占用我们的内存，所以我们可以采用逻辑过期方案
- 我们之前是TTL设置在redis的value中，注意：这个过期时间并不会直接作用于Redis，而是我们后续通过逻辑去处理。假设线程1去查询缓存，然后从value中判断当前数据已经过期了，此时线程1去获得互斥锁，那么其他线程会进行阻塞，获得了锁的进程他会开启一个新线程去进行之前的重建缓存数据的逻辑，直到新开的线程完成者逻辑之后，才会释放锁，而线程1直接进行返回，假设现在线程3过来访问，由于线程2拿着锁，所以线程3无法获得锁，线程3也直接返回数据（但只能返回旧数据，牺牲了数据一致性，换取性能上的提高），只有等待线程2重建缓存数据之后，其他线程才能返回正确的数据
- 这种方案巧妙在于，异步构建缓存数据，缺点是在重建完缓存数据之前，返回的都是脏数据
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6354f97716f2c2beb124e950.jpg)](https://pic1.imgdb.cn/item/6354f97716f2c2beb124e950.jpg)

## 对比互斥锁与逻辑删除

- `互斥锁方案`：由于保证了互斥性，所以数据一致，且实现简单，只是加了一把锁而已，也没有其他的事情需要操心，所以没有额外的内存消耗，缺点在于有锁的情况，就可能死锁，所以只能串行执行，性能会受到影响
- `逻辑过期方案`：线程读取过程中不需要等待，性能好，有一个额外的线程持有锁去进行重构缓存数据，但是在重构数据完成之前，其他线程只能返回脏数据，且实现起来比较麻烦

| 解决方案 |                  优点                  |                  缺点                   |
| :------: | :------------------------------------: | :-------------------------------------: |
|  互斥锁  | 没有额外的内存消耗 保证一致性 实现简单 | 线程需要等待，性能受影响 可能有死锁风险 |
| 逻辑过期 |         线程无需等待，性能较好         |  不保证一致性 有额外内存消耗 实现复杂   |

## 利用互斥锁解决缓存击穿问题

- `核心思路`：相较于原来从缓存中查询不到数据后直接查询数据库而言，现在的方案是，进行查询之后，如果没有从缓存中查询到数据，则进行互斥锁的获取，获取互斥锁之后，判断是否获取到了锁，如果没获取到，则休眠一段时间，过一会儿再去尝试，知道获取到锁为止，才能进行查询

- 如果获取到了锁的线程，则进行查询，将查询到的数据写入Redis，再释放锁，返回数据，利用互斥锁就能保证只有一个线程去执行数据库的逻辑，防止缓存击穿
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6354fb8116f2c2beb127ac8b.jpg)](https://pic1.imgdb.cn/item/6354fb8116f2c2beb127ac8b.jpg)

- `操作锁的代码`

  核心思路就是利用redis的setnx方法来表示获取锁，如果redis没有这个key，则插入成功，返回1，如果已经存在这个key，则插入失败，返回0。在StringRedisTemplate中返回true/false，我们可以根据返回值来判断是否有线程成功获取到了锁

  - tryLock
  - unlock

  ```java
  private boolean tryLock(String key) {
      Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.SECONDS);
      //避免返回值为null，我们这里使用了BooleanUtil工具类
      return BooleanUtil.isTrue(flag);
  }
  ```

  然后这里先把我们之前写的缓存穿透代码修改一下，提取成一个独立的方法

  ```java
  @Override
  public Shop queryWithPassThrough(Long id) {
      //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
      String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
      //如果不为空（查询到了），则转为Shop类型直接返回
      if (StrUtil.isNotBlank(shopJson)) {
          Shop shop = JSONUtil.toBean(shopJson, Shop.class);
          return shop;
      }
      if (shopjson != null) {
          return null;
      }
      //否则去数据库中查
      Shop shop = getById(id);
      //查不到，则将空值写入Redis
      if (shop == null) {
          stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
          return null;
      }
      //查到了则转为json字符串
      String jsonStr = JSONUtil.toJsonStr(shop);
      //并存入redis，设置TTL
      stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr, CACHE_SHOP_TTL, TimeUnit.MINUTES);
      //最终把查询到的商户信息返回给前端
      return shop;
  }
  ```

  之后编写我们的互斥锁代码，其实与缓存穿透代码类似，只需要在上面稍加修改即可

  - DIFF
  - 修改后代码

  ```diff
      @Override
  -   public Shop queryWithPassThrough(Long id) {
  +   public Shop queryWithMutex(Long id) {
  	//先从Redis中查，这里的常量值是固定的前缀 + 店铺id
  	String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
  	//如果不为空（查询到了），则转为Shop类型直接返回
  	if (StrUtil.isNotBlank(shopJson)) {
  		Shop shop = JSONUtil.toBean(shopJson, Shop.class);
  		return shop;
  	}
  	if (shopjson != null) {
  		return null;
  	}
  	//否则去数据库中查
  +   //从这里，用try/catch/finally包裹
  +   //获取互斥锁
  +   boolean flag = tryLock(LOCK_SHOP_KEY + id);
  +   //判断是否获取成功
  +   if (!flag) {
  +       //失败，则休眠并重试
  +       Thread.sleep(50);
  +       return queryWithMutex(id);
  +   }
  	Shop shop = getById(id);
  	//查不到，则将空值写入Redis
  	if (shop == null) {
  		stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
  		return null;
  	}
  	//查到了则转为json字符串
  	String jsonStr = JSONUtil.toJsonStr(shop);
  	//并存入redis，设置TTL
  	stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr, CACHE_SHOP_TTL, TimeUnit.MINUTES);
  +   //try/catch/finally包裹到这里，然后把释放锁的操作放到finally里
  +   //释放互斥锁
  +   unlock(LOCK_SHOP_KEY + id);
  	//最终把查询到的商户信息返回给前端
  	return shop;
  }
  ```

  最终修改`queryById`方法

  ```java
  @Override
  public Result queryById(Long id) {
      Shop shop = queryWithMutex(id);
      if (shop == null) {
          return Result.fail("店铺不存在！！");
      }
      return Result.ok(shop);
  }
  ```

- 使用Jmeter进行测试

  - 我们先来模拟一下缓存击穿的情景，缓存击穿是指在某时刻，一个热点数据的TTL到期了，此时用户不能从Redis中获取热点商品数据，然后就都得去数据库里查询，造成数据库压力过大。

  - 那么我们首先将Redis中的热点商品数据删除，模拟TTL到期，然后用Jmeter进行压力测试，开100个线程来访问这个没有缓存的热点数据

    - 如果后台日志只输出了一条SQL语句，则说明我们的互斥锁是生效的，没有造成大量用户都去查询数据库，执行SQL语句

      ```bash
      : ==>  Preparing: SELECT id,name,type_id,images,area,address,x,y,avg_price,sold,comments,score,open_hours,create_time,update_time FROM tb_shop WHERE id=?
      : ==> Parameters: 2(Long)
      : <==      Total: 1
      ```
  
- 如果日志输出了好多SQL语句，则说明我们的代码有问题

[![img](https://gitlab.com/apzs/image/-/raw/master/image/6356424916f2c2beb1a493ea.jpg)](https://pic1.imgdb.cn/item/6356424916f2c2beb1a493ea.jpg)

## 利用逻辑过期解决缓存击穿问题

需求：根据id查询商铺的业务，基于逻辑过期方式来解决缓存击穿问题

思路分析：当用户开始查询redis时，判断是否命中

- 如果没有命中则直接返回空数据，不查询数据库
- 如果命中，则将value取出，判断value中的过期时间是否满足
  - 如果没有过期，则直接返回redis中的数据
  - 如果过期，则在开启独立线程后，直接返回之前的数据，独立线程去重构数据，重构完成后再释放互斥锁
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/6355073c16f2c2beb1375808.jpg)](https://pic1.imgdb.cn/item/6355073c16f2c2beb1375808.jpg)

- 封装数据：因为现在redis中存储的数据的value需要带上过期时间，此时要么你去修改原来的实体类，要么新建一个类包含原有的数据和过期时间

- `步骤一`

- 这里我们选择新建一个实体类，包含原有数据(用万能的Object)和过期时间，这样对原有的代码没有侵入性

  ```java
  @Data
  public class RedisData<T> {
      private LocalDateTime expireTime;
      private T data;
  }
  ```

- `步骤二`

- 在ShopServiceImpl中新增方法，进行单元测试，看看能否写入数据

  ```java
  public void saveShop2Redis(Long id, Long expirSeconds) {
      Shop shop = getById(id);
      RedisData redisData = new RedisData();
      redisData.setData(shop);
      redisData.setExpireTime(LocalDateTime.now().plusSeconds(expirSeconds));
      stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, JSONUtil.toJsonStr(redisData));
  }
  ```

- 编写测试方法

  ```java
  @SpringBootTest
  class HmDianPingApplicationTests {
  
      @Autowired
      private ShopServiceImpl shopService;
  
      @Test
      public void test(){
          shopService.saveShop2Redis(1L,1000L);
      }
  }
  ```

- 运行测试方法，去Redis图形化页面看到存入的value，确实包含了data和expireTime1

  ```json
  {
    "data": {
      "area": "大关",
      "openHours": "10:00-22:00",
      "sold": 4215,
      "images": "https://qcloud.dpfile.com/pc/jiclIsCKmOI2arxKN1Uf0Hx3PucIJH8q0QSz-Z8llzcN56-_QiKuOvyio1OOxsRtFoXqu0G3iT2T27qat3WhLVEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vfCF2ubeXzk49OsGrXt_KYDCngOyCwZK-s3fqawWswzk.jpg,https://qcloud.dpfile.com/pc/IOf6VX3qaBgFXFVgp75w-KKJmWZjFc8GXDU8g9bQC6YGCpAmG00QbfT4vCCBj7njuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
      "address": "金华路锦昌文华苑29号",
      "comments": 3035,
      "avgPrice": 80,
      "updateTime": 1666502007000,
      "score": 37,
      "createTime": 1640167839000,
      "name": "476茶餐厅",
      "x": 120.149192,
      "y": 30.316078,
      "typeId": 1,
      "id": 1
    },
    "expireTime": 1666519036559
  }
  ```

- `步骤三`：正式代码
  正式代码我们就直接照着流程图写就好了

  ```java
  //这里需要声明一个线程池，因为下面我们需要新建一个现成来完成重构缓存
  private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);
  
  @Override
  public Shop queryWithLogicalExpire(Long id) {
      //1. 从redis中查询商铺缓存
      String json = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
      //2. 如果未命中，则返回空
      if (StrUtil.isBlank(json)) {
          return null;
      }
      //3. 命中，将json反序列化为对象
      RedisData redisData = JSONUtil.toBean(json, RedisData.class);
      //3.1 将data转为Shop对象
      JSONObject shopJson = (JSONObject) redisData.getData();
      Shop shop = JSONUtil.toBean(shopJson, Shop.class);
      //3.2 获取过期时间
      LocalDateTime expireTime = redisData.getExpireTime();
      //4. 判断是否过期
      if (LocalDateTime.now().isBefore(time)) {
          //5. 未过期，直接返回商铺信息
          return shop;
      }
      //6. 过期，尝试获取互斥锁
      boolean flag = tryLock(LOCK_SHOP_KEY + id);
      //7. 获取到了锁
      if (flag) {
          //8. 开启独立线程
          CACHE_REBUILD_EXECUTOR.submit(() -> {
              try {
                  this.saveShop2Redis(id, LOCK_SHOP_TTL);
              } catch (Exception e) {
                  throw new RuntimeException(e);
              } finally {
                  unlock(LOCK_SHOP_KEY + id);
              }
          });
          //9. 直接返回商铺信息
          return shop;
      }
      //10. 未获取到锁，直接返回商铺信息
      return shop;
  }
  ```

- 使用Jmeter进行测试

  - 先来复现一遍场景，当某个用户去Redis中访问缓存的数据时，发现该数据已经过期了，于是新开一个线程去重构缓存数据，但在重构完成之前，用户得到的数据都是脏数据，重构完成之后，才是新数据

  - 那我们先使用

    ```
    saveShop2Redis
    ```

    方法，向redis中添加一个逻辑过期数据，设置过期时间为2秒，这样很快就过期了，

    - saveShop2Redis
    - Test

    `JAVApublic void saveShop2Redis(Long id, Long expirSeconds) {    Shop shop = getById(id);    RedisData redisData = new RedisData();    redisData.setData(shop);    redisData.setExpireTime(LocalDateTime.now().plusSeconds(expirSeconds));    stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, JSONUtil.toJsonStr(redisData));} `

    

  - 之后去数据库把这个数据修改一下，这样逻辑过期前和逻辑过期后的数据就不一致，当用户来访问数据的时候，需要花时间来进行重构缓存数据，但是在重构完成之前，都只能获得脏数据（也就是我们修改前的数据），只有当重构完毕之后，才能获得新数据（我们修改后的数据）

  - 测试结果如下，同样是开了100个线程去访问逻辑过期数据，前面的用户只能看到脏数据，后面的用户看到的才是新数据
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/6356558116f2c2beb1d8a832.jpg)](https://pic1.imgdb.cn/item/6356558116f2c2beb1d8a832.jpg)

## 封装Redis工具类

- 基于StringRedisTemplate封装一个缓存工具类，需满足下列要求

  - 方法1：将任意Java对象序列化为JSON，并存储到String类型的Key中，并可以设置TTL过期时间

    ```java
    public void set(String key, Object value, Long time, TimeUnit timeUnit) {
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value), time, timeUnit);
    }
    ```
    
  - 方法2：将任意Java对象序列化为JSON，并存储在String类型的Key中，并可以设置逻辑过期时间，用于处理缓存击穿问题
  
    ```java
    public void setWithLogicExpire(String key, Object value, Long time, TimeUnit timeUnit) {
        //由于需要设置逻辑过期时间，所以我们需要用到RedisData
        RedisData<Object> redisData = new RedisData<>();
        //redisData的data就是传进来的value对象
        redisData.setData(value);
        //逻辑过期时间就是当前时间加上传进来的参数时间，用TimeUnit可以将时间转为秒，随后与当前时间相加
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(timeUnit.toSeconds(time)));
        //由于是逻辑过期，所以这里不需要设置过期时间，只存一下key和value就好了，同时注意value是ridisData类型
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
    }
    ```
    
  - 方法3：根据指定的Key查询缓存，并反序列化为指定类型，利用缓存空值的方式解决缓存穿透问题

    - 原方法
    - 改为通用方法
    - 使用方法
  
    ```java
    @Override
    public Shop queryWithPassThrough(Long id) {
        //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
        String shopJson = stringRedisTemplate.opsForValue().get(CACHE_SHOP_KEY + id);
        //如果不为空（查询到了），则转为Shop类型直接返回
        if (StrUtil.isNotBlank(shopJson)) {
            return JSONUtil.toBean(shopJson, Shop.class);
        }
        if (shopjson != null) {
            return null;
        }
        //否则去数据库中查
        Shop shop = getById(id);
        //查不到，则将空值写入Redis
        if (shop == null) {
            stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
            return null;
        }
        //查到了则转为json字符串
        String jsonStr = JSONUtil.toJsonStr(shop);
        //并存入redis，设置TTL
        stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, jsonStr, CACHE_SHOP_TTL, TimeUnit.MINUTES);
        //最终把查询到的商户信息返回给前端
        return shop;
    }
    ```
    
    
    
  - 方法4：根据指定的Key查询缓存，并反序列化为指定类型，需要利用逻辑过期解决缓存击穿问题
  
    ```java
    public <R, ID> R queryWithLogicalExpire(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, Long time, TimeUnit timeUnit) {
        //1. 从redis中查询商铺缓存
        String key = keyPrefix + id;
        String json = stringRedisTemplate.opsForValue().get(key);
        //2. 如果未命中，则返回空
        if (StrUtil.isBlank(json)) {
            return null;
        }
        //3. 命中，将json反序列化为对象
        RedisData redisData = JSONUtil.toBean(json, RedisData.class);
        R r = JSONUtil.toBean((JSONObject) redisData.getData(), type);
        LocalDateTime expireTime = redisData.getExpireTime();
        //4. 判断是否过期
        if (expireTime.isAfter(LocalDateTime.now())) {
            //5. 未过期，直接返回商铺信息
            return r;
        }
        //6. 过期，尝试获取互斥锁
        String lockKey = LOCK_SHOP_KEY + id;
        boolean flag = tryLock(lockKey);
        //7. 获取到了锁
        if (flag) {
            //8. 开启独立线程
            CACHE_REBUILD_EXECUTOR.submit(() -> {
                try {
                    R tmp = dbFallback.apply(id);
                    this.setWithLogicExpire(key, tmp, time, timeUnit);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                } finally {
                    unlock(lockKey);
                }
            });
            //9. 直接返回商铺信息
            return r;
        }
        //10. 未获取到锁，直接返回商铺信息
        return r;
    }
    ```
    
  - 方法5：根据指定的Key查询缓存，并反序列化为指定类型，需要利用互斥锁解决缓存击穿问题
  
    ```java
    public <R, ID> R queryWithMutex(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, Long time, TimeUnit timeUnit) {
        //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
        String key = keyPrefix + id;
        String json = stringRedisTemplate.opsForValue().get(key);
        //如果不为空（查询到了），则转为Shop类型直接返回
        if (StrUtil.isNotBlank(json)) {
            return JSONUtil.toBean(json, type);
        }
        if (json != null) {
            return null;
        }
        R r = null;
        String lockKey = LOCK_SHOP_KEY + id;
        try {
            //否则去数据库中查
            boolean flag = tryLock(lockKey);
            if (!flag) {
                Thread.sleep(50);
                return queryWithMutex(keyPrefix, id, type, dbFallback, time, timeUnit);
            }
            r = dbFallback.apply(id);
            //查不到，则将空值写入Redis
            if (r == null) {
                stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
                return null;
            }
            //并存入redis，设置TTL
            this.set(key, r, time, timeUnit);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            unlock(lockKey);
        }
        return r;
    }
    ```
  
- 完整代码如下

  ```java
  import cn.hutool.core.util.BooleanUtil;
  import cn.hutool.core.util.StrUtil;
  import cn.hutool.json.JSONObject;
  import cn.hutool.json.JSONUtil;
  import com.hmdp.entity.RedisData;
  import lombok.extern.slf4j.Slf4j;
  import org.springframework.data.redis.core.StringRedisTemplate;
  import org.springframework.stereotype.Component;
  
  import java.time.LocalDateTime;
  import java.util.concurrent.ExecutorService;
  import java.util.concurrent.Executors;
  import java.util.concurrent.TimeUnit;
  import java.util.function.Function;
  
  import static com.hmdp.utils.RedisConstants.*;
  
  @Slf4j
  @Component
  public class CacheClient {
  
      private final StringRedisTemplate stringRedisTemplate;
      private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);
  
      public CacheClient(StringRedisTemplate stringRedisTemplate) {
          this.stringRedisTemplate = stringRedisTemplate;
      }
  
      public void set(String key, Object value, Long time, TimeUnit timeUnit) {
          stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value), time, timeUnit);
      }
  
      public void setWithLogicExpire(String key, Object value, Long time, TimeUnit timeUnit) {
          RedisData<Object> redisData = new RedisData<>();
          redisData.setData(value);
          redisData.setExpireTime(LocalDateTime.now().plusSeconds(timeUnit.toSeconds(time)));
          stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
      }
  
      public <R, ID> R queryWithPassThrough(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, Long time, TimeUnit timeUnit) {
          //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
          String key = keyPrefix + id;
          String json = stringRedisTemplate.opsForValue().get(key);
          //如果不为空（查询到了），则转为R类型直接返回
          if (StrUtil.isNotBlank(json)) {
              return JSONUtil.toBean(json, type);
          }
          if (json != null) {
              return null;
          }
          //否则去数据库中查，查询逻辑用我们参数中注入的函数
          R r = dbFallback.apply(id);
          //查不到，则将空值写入Redis
          if (r == null) {
              stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
              return null;
          }
          //查到了则转为json字符串
          String jsonStr = JSONUtil.toJsonStr(r);
          //并存入redis，设置TTL
          this.set(key, jsonStr, time, timeUnit);
          //最终把查询到的商户信息返回给前端
          return r;
      }
  
      public <R, ID> R queryWithLogicalExpire(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, Long time, TimeUnit timeUnit) {
          //1. 从redis中查询商铺缓存
          String key = keyPrefix + id;
          String json = stringRedisTemplate.opsForValue().get(key);
          //2. 如果未命中，则返回空
          if (StrUtil.isBlank(json)) {
              return null;
          }
          //3. 命中，将json反序列化为对象
          RedisData redisData = JSONUtil.toBean(json, RedisData.class);
          R r = JSONUtil.toBean((JSONObject) redisData.getData(), type);
          LocalDateTime expireTime = redisData.getExpireTime();
          //4. 判断是否过期
          if (expireTime.isAfter(LocalDateTime.now())) {
              //5. 未过期，直接返回商铺信息
              return r;
          }
          //6. 过期，尝试获取互斥锁
          String lockKey = LOCK_SHOP_KEY + id;
          boolean flag = tryLock(lockKey);
          //7. 获取到了锁
          if (flag) {
              //8. 开启独立线程
              CACHE_REBUILD_EXECUTOR.submit(() -> {
                  try {
                      R tmp = dbFallback.apply(id);
                      this.setWithLogicExpire(key, tmp, time, timeUnit);
                  } catch (Exception e) {
                      throw new RuntimeException(e);
                  } finally {
                      unlock(lockKey);
                  }
              });
              //9. 直接返回商铺信息
              return r;
          }
          //10. 未获取到锁，直接返回商铺信息
          return r;
      }
  
      public <R, ID> R queryWithMutex(String keyPrefix, ID id, Class<R> type, Function<ID, R> dbFallback, Long time, TimeUnit timeUnit) {
          //先从Redis中查，这里的常量值是固定的前缀 + 店铺id
          String key = keyPrefix + id;
          String json = stringRedisTemplate.opsForValue().get(key);
          //如果不为空（查询到了），则转为Shop类型直接返回
          if (StrUtil.isNotBlank(json)) {
              return JSONUtil.toBean(json, type);
          }
          if (json != null) {
              return null;
          }
          R r = null;
          String lockKey = LOCK_SHOP_KEY + id;
          try {
              //否则去数据库中查
              boolean flag = tryLock(lockKey);
              if (!flag) {
                  Thread.sleep(50);
                  return queryWithMutex(keyPrefix, id, type, dbFallback, time, timeUnit);
              }
              r = dbFallback.apply(id);
              //查不到，则将空值写入Redis
              if (r == null) {
                  stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
                  return null;
              }
              //并存入redis，设置TTL
              this.set(key, r, time, timeUnit);
          } catch (InterruptedException e) {
              throw new RuntimeException(e);
          } finally {
              unlock(lockKey);
          }
          return r;
      }
  
      private boolean tryLock(String key) {
          Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.SECONDS);
          return BooleanUtil.isTrue(flag);
      }
  
      private void unlock(String key) {
          stringRedisTemplate.delete(key);
      }
  }
  ```

# 优惠券秒杀

## Redis实现全局唯一ID

- 在各类购物App中，都会遇到商家发放的优惠券

- 当用户抢购商品时，生成的订单会保存到

  ```
  tb_voucher_order
  ```

  表中，而订单表如果使用数据库自增ID就会存在一些问题

  1. id规律性太明显
  2. 受单表数据量的限制

- 如果我们的订单id有太明显的规律，那么对于用户或者竞争对手，就很容易猜测出我们的一些敏感信息，例如商城一天之内能卖出多少单，这明显不合适

- 随着我们商城的规模越来越大，MySQL的单表容量不宜超过500W，数据量过大之后，我们就要进行拆库拆表，拆分表了之后，他们从逻辑上讲，是同一张表，所以他们的id不能重复，于是乎我们就要保证id的唯一性

- 那么这就引出我们的`全局ID生成器`了

  - 全局ID生成器是一种在分布式系统下用来生成全局唯一ID的工具，一般要满足一下特性
    - 唯一性
    - 高可用
    - 高性能
    - 递增性
    - 安全性
  
- 为了增加ID的安全性，我们可以不直接使用Redis自增的数值，而是拼接一些其他信息

- ID组成部分

  - 符号位：1bit，永远为0
  - 时间戳：31bit，以秒为单位，可以使用69年（2^31秒约等于69年）
  - 序列号：32bit，秒内的计数器，支持每秒传输2^32个不同ID

- 那我们就根据我们分析的ID生成策略，来编写代码

  ```java
  public static void main(String[] args) {
      //设置一下起始时间，时间戳就是起始时间与当前时间的秒数差
      LocalDateTime tmp = LocalDateTime.of(2022, 1, 1, 0, 0, 0);
      System.out.println(tmp.toEpochSecond(ZoneOffset.UTC));
      //结果为1640995200L
  }
  ```
  
- 完整代码如下

  ```java
  @Component
  public class RedisIdWorker {
      @Autowired
      private StringRedisTemplate stringRedisTemplate;
      //设置起始时间，我这里设定的是2022.01.01 00:00:00
      public static final Long BEGIN_TIMESTAMP = 1640995200L;
      //序列号长度
      public static final Long COUNT_BIT = 32L;
  
      public long nextId(String keyPrefix){
          //1. 生成时间戳
          LocalDateTime now = LocalDateTime.now();
          long currentSecond = now.toEpochSecond(ZoneOffset.UTC);
          long timeStamp = currentSecond - BEGIN_TIMESTAMP;
          //2. 生成序列号
          String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
          long count = stringRedisTemplate.opsForValue().increment("inc:"+keyPrefix+":"+date);
          //3. 拼接并返回，简单位运算
          return timeStamp << COUNT_BIT | count;
      }
  }
  ```

## 添加优惠券

- 每个店铺度可以发布优惠券，分为平价券和特价券，平价券可以任意购买，而特价券需要秒杀抢购
- tb_voucher：优惠券的基本信息，优惠金额、使用规则等

|    Field     |       Type       |     Collation      | Null | Key  |      Default      |                     Extra                     |              Comment               |
| :----------: | :--------------: | :----------------: | :--: | :--: | :---------------: | :-------------------------------------------: | :--------------------------------: |
|      id      | bigint unsigned  |       (NULL)       |  NO  | PRI  |      (NULL)       |                auto_increment                 |                主键                |
|   shop_id    | bigint unsigned  |       (NULL)       | YES  |      |      (NULL)       |                                               |               商铺id               |
|    title     |   varchar(255)   | utf8mb4_general_ci |  NO  |      |      (NULL)       |                                               |             代金券标题             |
|  sub_title   |   varchar(255)   | utf8mb4_general_ci | YES  |      |      (NULL)       |                                               |               副标题               |
|    rules     |  varchar(1024)   | utf8mb4_general_ci | YES  |      |      (NULL)       |                                               |              使用规则              |
|  pay_value   | bigint unsigned  |       (NULL)       |  NO  |      |      (NULL)       |                                               | 支付金额，单位是分。例如200代表2元 |
| actual_value |      bigint      |       (NULL)       |  NO  |      |      (NULL)       |                                               | 抵扣金额，单位是分。例如200代表2元 |
|     type     | tinyint unsigned |       (NULL)       |  NO  |      |         0         |                                               |         0,普通券；1,秒杀券         |
|    status    | tinyint unsigned |       (NULL)       |  NO  |      |         1         |                                               |       1,上架; 2,下架; 3,过期       |
| create_time  |    timestamp     |       (NULL)       |  NO  |      | CURRENT_TIMESTAMP |               DEFAULT_GENERATED               |              创建时间              |
| update_time  |    timestamp     |       (NULL)       |  NO  |      | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |              更新时间              |

- tb_seckill_voucher：优惠券的库存、开始抢购时间，结束抢购时间。特价优惠券才需要填写这些信息

|    Field    |      Type       | Collation | Null | Key  |      Default      |                     Extra                     |     Comment      |
| :---------: | :-------------: | :-------: | :--: | :--: | :---------------: | :-------------------------------------------: | :--------------: |
| voucher_id  | bigint unsigned |  (NULL)   |  NO  | PRI  |      (NULL)       |                                               | 关联的优惠券的id |
|    stock    |       int       |  (NULL)   |  NO  |      |      (NULL)       |                                               |       库存       |
| create_time |    timestamp    |  (NULL)   |  NO  |      | CURRENT_TIMESTAMP |               DEFAULT_GENERATED               |     创建时间     |
| begin_time  |    timestamp    |  (NULL)   |  NO  |      | CURRENT_TIMESTAMP |               DEFAULT_GENERATED               |     生效时间     |
|  end_time   |    timestamp    |  (NULL)   |  NO  |      | CURRENT_TIMESTAMP |               DEFAULT_GENERATED               |     失效时间     |
| update_time |    timestamp    |  (NULL)   |  NO  |      | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |     更新时间     |

- 平价卷由于优惠力度并不是很大，所以是可以任意领取

- 而代金券由于优惠力度大，所以像第二种卷，就得限制数量，从表结构上也能看出，特价卷除了具有优惠卷的基本信息以外，还具有库存，抢购时间，结束时间等等字段

- 添加优惠券的代码已经提供好了

  - 新增普通券
  - 新增秒杀券
  - 新增秒杀券业务逻辑

  新增普通券，也就只是将普通券的信息保存到表中

  ```java
  /**
   * 新增普通券
   * @param voucher 优惠券信息
   * @return 优惠券id
   */
  @PostMapping
  public Result addVoucher(@RequestBody Voucher voucher) {
      voucherService.save(voucher);
      return Result.ok(voucher.getId());
  }
  ```
  
- 由于这里并没有后台管理页面，所以我们只能用POSTMAN模拟发送请求来新增秒杀券，请求路径

  ```
  http://localhost:8081/voucher/seckill
  ```

  ，请求方式POST，JSON数据如下

  ```json
  {
      "shopId":1,
      "title":"100元代金券",
      "subTitle":"周一至周五可用",
      "rules":"全场通用\\n无需预约\\n可无限叠加",
      "payValue":8000,
      "actualValue":10000,
      "type":1,
      "stock":100,
      "beginTime":"2022-01-01T00:00:00",
      "endTime":"2022-10-31T23:59:59"
  }
  ```
  
- 效果如下
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6358bbb316f2c2beb1b7967c.jpg)](https://pic1.imgdb.cn/item/6358bbb316f2c2beb1b7967c.jpg)

## 实现秒杀下单

- 我们点击`限时抢购`，然后查看发送的请求

  ```
  请求网址: http://localhost:8080/api/voucher-order/seckill/13
  请求方法: POST
  ```
  
- 看样子是`VoucherOrderController`里的方法

  ```java
  @RestController
  @RequestMapping("/voucher-order")
  public class VoucherOrderController {
      @PostMapping("seckill/{id}")
      public Result seckillVoucher(@PathVariable("id") Long voucherId) {
          return Result.fail("功能未完成");
      }
  }
  ```
  
- 那我们现在来分析一下怎么抢优惠券

  - 首先提交优惠券id，然后查询优惠券信息
  - 之后判断秒杀时间是否开始
    - 开始了，则判断是否有剩余库存
      - 有库存，那么删减一个库存
        - 然后创建订单
      - 无库存，则返回一个错误信息
    - 没开始，则返回一个错误信息

- 对应的流程图如下
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6358c21a16f2c2beb1bfd43a.jpg)](https://pic1.imgdb.cn/item/6358c21a16f2c2beb1bfd43a.jpg)

- 那现在我们就根据我们刚刚的分析和流程图，来编写对应的代码

  - VoucherOrderController
  - IVoucherOrderService
  - VoucherOrderServiceImpl

  具体的业务逻辑我们还是放到Service层里写，在Service层创建seckillVoucher方法

  ```java
  @RestController
  @RequestMapping("/voucher-order")
  public class VoucherOrderController {
      @Autowired
      private ISeckillVoucherService seckillVoucherService;
      @PostMapping("seckill/{id}")
      public Result seckillVoucher(@PathVariable("id") Long voucherId) {
  
          return seckillVoucherService.seckillVoucher(voucherId);
      }
  }
  ```
  
  
  


## 超卖问题

- 我们之前的代码其实是有问题的，当遇到高并发场景时，会出现超卖现象，我们可以用Jmeter开200个线程来模拟抢优惠券的场景，URL为 localhost:8081/voucher-order/seckill/13，请求方式为POST

  注意使用Jmeter进行压测时，需要携带我们登录的token
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635a168316f2c2beb193f83d.jpg)](https://pic1.imgdb.cn/item/635a168316f2c2beb193f83d.jpg)

- 测试完毕之后，查看数据库中的订单表，我们明明只设置了100张优惠券，却有166条数据，去优惠券表查看，库存为-66，超卖了66张
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635a16d316f2c2beb19443a7.jpg)](https://pic1.imgdb.cn/item/635a16d316f2c2beb19443a7.jpg)

- 那么如何解决这个问题呢？先来看看我们的代码中是怎么写的

  ```java
  //4. 判断库存是否充足
  if (seckillVoucher.getStock() < 1) {
      return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
  }
  //5. 扣减库存
  boolean success = seckillVoucherService.update().setSql("stock = stock - 1").eq("voucher_id", voucherId).update();
  if (!success) {
      return Result.fail("库存不足");
  }
  ```
  
- 假设现在只剩下一张优惠券，线程1过来查询库存，判断库存数大于1，但还没来得及去扣减库存，此时库线程2也过来查询库存，发现库存数也大于1，那么这两个线程都会进行扣减库存操作，最终相当于是多个线程都进行了扣减库存，那么此时就会出现超卖问题

- 超卖问题是典型的多线程安全问题，针对这一问题的常见解决方案就是加锁：而对于加锁，我们通常有两种解决方案

  1. 悲观锁
     - 悲观锁认为线程安全问题一定会发生，因此在操作数据之前先获取锁，确保线程串行执行
     - 例如Synchronized、Lock等，都是悲观锁
  2. 乐观锁
     - 乐观锁认为线程安全问题不一定会发生，因此不加锁，只是在更新数据的时候再去判断有没有其他线程对数据进行了修改
       - 如果没有修改，则认为自己是安全的，自己才可以更新数据
       - 如果已经被其他线程修改，则说明发生了安全问题，此时可以重试或者异常

- 悲观锁：悲观锁可以实现对于数据的串行化执行，比如syn，和lock都是悲观锁的代表，同时，悲观锁中又可以再细分为公平锁，非公平锁，可重入锁，等等

- 乐观锁：乐观锁会有一个版本号，每次操作数据会对版本号+1，再提交回数据时，会去校验是否比之前的版本大1 ，如果大1 ，则进行操作成功，这套机制的核心逻辑在于，如果在操作过程中，版本号只比原来大1 ，那么就意味着操作过程中没有人对他进行过修改，他的操作就是安全的，如果不大1，则数据被修改过，当然乐观锁还有一些变种的处理方式比如cas

- 乐观锁的典型代表：就是cas，利用cas进行无锁化机制加锁，var5 是操作前读取的内存值，while中的var1+var2 是预估值，如果预估值 == 内存值，则代表中间没有被人修改过，此时就将新值去替换 内存值

  ```java
  int var5;
  do {
      var5 = this.getIntVolatile(var1, var2);
  } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));
  return var5;
  ```
  
- 其中do while是为了操作失败时，再次进行自旋操作，即把之前的逻辑再操作一次

------

- 该项目中的具体解决方式

- 这里并不需要真的来指定一下`版本号`，完全可以使用`stock`来充当版本号，在扣减库存时，比较查询到的优惠券库存和实际数据库中优惠券库存是否相同

  ```diff
  @Override
  public Result seckillVoucher(Long voucherId) {
      LambdaQueryWrapper<SeckillVoucher> queryWrapper = new LambdaQueryWrapper<>();
      //1. 查询优惠券
      queryWrapper.eq(SeckillVoucher::getVoucherId, voucherId);
      SeckillVoucher seckillVoucher = seckillVoucherService.getOne(queryWrapper);
      //2. 判断秒杀时间是否开始
      if (LocalDateTime.now().isBefore(seckillVoucher.getBeginTime())) {
          return Result.fail("秒杀还未开始，请耐心等待");
      }
      //3. 判断秒杀时间是否结束
      if (LocalDateTime.now().isAfter(seckillVoucher.getEndTime())) {
          return Result.fail("秒杀已经结束！");
      }
      //4. 判断库存是否充足
      if (seckillVoucher.getStock() < 1) {
          return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
      }
      //5. 扣减库存
      boolean success = seckillVoucherService.update()
              .setSql("stock = stock - 1")
              .eq("voucher_id", voucherId)
  +           .eq("stock",seckillVoucher.getStock())
              .update();
      if (!success) {
          return Result.fail("库存不足");
      }
      //6. 创建订单
      VoucherOrder voucherOrder = new VoucherOrder();
      //6.1 设置订单id
      long orderId = redisIdWorker.nextId("order");
      //6.2 设置用户id
      Long id = UserHolder.getUser().getId();
      //6.3 设置代金券id
      voucherOrder.setVoucherId(voucherId);
      voucherOrder.setId(orderId);
      voucherOrder.setUserId(id);
      //7. 将订单数据保存到表中
      save(voucherOrder);
      //8. 返回订单id
      return Result.ok(orderId);
  }
  ```
  
- 以上逻辑的核心含义是：只要我扣减库存时的库存和之前我查询到的库存是一样的，就意味着没有人在中间修改过库存，那么此时就是安全的，但是以上这种方式通过测试发现会有很多失败的情况，失败的原因在于：在使用乐观锁过程中假设100个线程同时都拿到了100的库存，然后大家一起去进行扣减，但是100个人中只有1个人能扣减成功，其他的人在处理时，他们在扣减时，库存已经被修改过了，所以此时其他线程都会失败
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635a30ca16f2c2beb1ba8efd.jpg)](https://pic1.imgdb.cn/item/635a30ca16f2c2beb1ba8efd.jpg)

- 那么我们继续完善代码，修改我们的逻辑，在这种场景，我们可以只判断是否有剩余优惠券，即只要数据库中的库存大于0，都能顺利完成扣减库存操作

  ```diff
  @Override
  public Result seckillVoucher(Long voucherId) {
      LambdaQueryWrapper<SeckillVoucher> queryWrapper = new LambdaQueryWrapper<>();
      //1. 查询优惠券
      queryWrapper.eq(SeckillVoucher::getVoucherId, voucherId);
      SeckillVoucher seckillVoucher = seckillVoucherService.getOne(queryWrapper);
      //2. 判断秒杀时间是否开始
      if (LocalDateTime.now().isBefore(seckillVoucher.getBeginTime())) {
          return Result.fail("秒杀还未开始，请耐心等待");
      }
      //3. 判断秒杀时间是否结束
      if (LocalDateTime.now().isAfter(seckillVoucher.getEndTime())) {
          return Result.fail("秒杀已经结束！");
      }
      //4. 判断库存是否充足
      if (seckillVoucher.getStock() < 1) {
          return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
      }
      //5. 扣减库存
      boolean success = seckillVoucherService.update()
              .setSql("stock = stock - 1")
              .eq("voucher_id", voucherId)
  -           .eq("stock",seckillVoucher.getStock())
  +           .gt("stock", 0)
              .update();
      if (!success) {
          return Result.fail("库存不足");
      }
      //6. 创建订单
      VoucherOrder voucherOrder = new VoucherOrder();
      //6.1 设置订单id
      long orderId = redisIdWorker.nextId("order");
      //6.2 设置用户id
      Long id = UserHolder.getUser().getId();
      //6.3 设置代金券id
      voucherOrder.setVoucherId(voucherId);
      voucherOrder.setId(orderId);
      voucherOrder.setUserId(id);
      //7. 将订单数据保存到表中
      save(voucherOrder);
      //8. 返回订单id
      return Result.ok(orderId);
  }
  ```
  
- 重启服务器，继续使用Jmeter进行测试，这次就能顺利将优惠券刚好抢空了

## 一人一单

- 需求：修改秒杀业务，要求同一个优惠券，一个用户只能抢一张

- 具体操作逻辑如下：我们在判断库存是否充足之后，根据我们保存的订单数据，判断用户订单是否已存在

  - 如果已存在，则不能下单，返回错误信息
  - 如果不存在，则继续下单，获取优惠券

- 初步代码

  ```diff
  @Override
  public Result seckillVoucher(Long voucherId) {
  	LambdaQueryWrapper<SeckillVoucher> queryWrapper = new LambdaQueryWrapper<>();
  	//1. 查询优惠券
  	queryWrapper.eq(SeckillVoucher::getVoucherId, voucherId);
  	SeckillVoucher seckillVoucher = seckillVoucherService.getOne(queryWrapper);
  	//2. 判断秒杀时间是否开始
  	if (LocalDateTime.now().isBefore(seckillVoucher.getBeginTime())) {
  		return Result.fail("秒杀还未开始，请耐心等待");
  	}
  	//3. 判断秒杀时间是否结束
  	if (LocalDateTime.now().isAfter(seckillVoucher.getEndTime())) {
  		return Result.fail("秒杀已经结束！");
  	}
  	//4. 判断库存是否充足
  	if (seckillVoucher.getStock() < 1) {
  		return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
  	}
  +   // 一人一单逻辑
  +   Long userId = UserHolder.getUser().getId();
  +   int count = query().eq("voucherId", voucherId).eq("userId", userId).count();
  +   if (count > 0){
  +       return Result.fail("你已经抢过优惠券了哦");
  +   }
  	//5. 扣减库存
  	boolean success = seckillVoucherService.update()
  			.setSql("stock = stock - 1")
  			.eq("voucher_id", voucherId)
  			.gt("stock", 0)
  			.update();
  	if (!success) {
  		return Result.fail("库存不足");
  	}
  	//6. 创建订单
  	VoucherOrder voucherOrder = new VoucherOrder();
  	//6.1 设置订单id
  	long orderId = redisIdWorker.nextId("order");
  	//6.2 设置用户id
  	Long id = UserHolder.getUser().getId();
  	//6.3 设置代金券id
  	voucherOrder.setVoucherId(voucherId);
  	voucherOrder.setId(orderId);
  	voucherOrder.setUserId(id);
  	//7. 将订单数据保存到表中
  	save(voucherOrder);
  	//8. 返回订单id
  	return Result.ok(orderId);
  }
  ```
  
- `存在问题`：还是和之前一样，如果这个用户故意开多线程抢优惠券，那么在判断库存充足之后，执行一人一单逻辑之前，在这个区间如果进来了多个线程，还是可以抢多张优惠券的，那我们这里使用悲观锁来解决这个问题

- 初步代码，我们把一人一单逻辑之后的代码都提取到一个`createVoucherOrder`方法中，然后给这个方法加锁

- 不管哪一个线程（例如线程A），运行到这个方法时，都要检查有没有其它线程B（或者C、 D等）正在用这个方法(或者该类的其他同步方法)，有的话要等正在使用synchronized方法的线程B（或者C 、D）运行完这个方法后再运行此线程A，没有的话，锁定调用者，然后直接运行。

  ```java
  private Result createVoucherOrder(Long voucherId) {
      // 一人一单逻辑
      Long userId = UserHolder.getUser().getId();
      int count = query().eq("voucherId", voucherId).eq("userId", userId).count();
      if (count > 0) {
          return Result.fail("你已经抢过优惠券了哦");
      }
      //5. 扣减库存
      boolean success = seckillVoucherService.update()
              .setSql("stock = stock - 1")
              .eq("voucher_id", voucherId)
              .gt("stock", 0)
              .update();
      if (!success) {
          return Result.fail("库存不足");
      }
      //6. 创建订单
      VoucherOrder voucherOrder = new VoucherOrder();
      //6.1 设置订单id
      long orderId = redisIdWorker.nextId("order");
      //6.2 设置用户id
      Long id = UserHolder.getUser().getId();
      //6.3 设置代金券id
      voucherOrder.setVoucherId(voucherId);
      voucherOrder.setId(orderId);
      voucherOrder.setUserId(id);
      //7. 将订单数据保存到表中
      save(voucherOrder);
      //8. 返回订单id
      return Result.ok(orderId);
  }
  ```
  
- 但是这样加锁，锁的细粒度太粗了，在使用锁的过程中，控制锁粒度是一个非常重要的事情，因为如果锁的粒度太大，会导致每个线程进来都会被锁住，现在的情况就是所有用户都公用这一把锁，串行执行，效率很低，我们现在要完成的业务是`一人一单`，所以这个锁，应该只加在单个用户上，用户标识可以用`userId`

  ```java
  @Transactional
  public Result createVoucherOrder(Long voucherId) {
      // 一人一单逻辑
      Long userId = UserHolder.getUser().getId();
      synchronized (userId.toString().intern()) {
          int count = query().eq("voucherId", voucherId).eq("userId", userId).count();
          if (count > 0) {
              return Result.fail("你已经抢过优惠券了哦");
          }
          //5. 扣减库存
          boolean success = seckillVoucherService.update()
                  .setSql("stock = stock - 1")
                  .eq("voucher_id", voucherId)
                  .gt("stock", 0)
                  .update();
          if (!success) {
              return Result.fail("库存不足");
          }
          //6. 创建订单
          VoucherOrder voucherOrder = new VoucherOrder();
          //6.1 设置订单id
          long orderId = redisIdWorker.nextId("order");
          //6.2 设置用户id
          Long id = UserHolder.getUser().getId();
          //6.3 设置代金券id
          voucherOrder.setVoucherId(voucherId);
          voucherOrder.setId(orderId);
          voucherOrder.setUserId(id);
          //7. 将订单数据保存到表中
          save(voucherOrder);
          //8. 返回订单id
          return Result.ok(orderId);
      }
      //执行到这里，锁已经被释放了，但是可能当前事务还未提交，如果此时有线程进来，不能确保事务不出问题
  }
  ```
  
- 由于toString的源码是new String，所以如果我们只用`userId.toString()`拿到的也不是同一个用户，需要使用`intern()`，如果字符串常量池中已经包含了一个等于这个string对象的字符串（由equals（object）方法确定），那么将返回池中的字符串。否则，将此String对象添加到池中，并返回对此String对象的引用。

  ```java
  public static String toString(long i) {
      if (i == Long.MIN_VALUE)
          return "-9223372036854775808";
      int size = (i < 0) ? stringSize(-i) + 1 : stringSize(i);
      char[] buf = new char[size];
      getChars(i, size, buf);
      return new String(buf, true);
  }
  ```
  
- 但是以上代码还是存在问题，问题的原因在于当前方法被Spring的事务控制，如果你在内部加锁，可能会导致当前方法事务还没有提交，但是锁已经释放了，这样也会导致问题，所以我们选择将当前方法整体包裹起来，确保事务不会出现问题

  ```java
  @Override
  public Result seckillVoucher(Long voucherId) {
      LambdaQueryWrapper<SeckillVoucher> queryWrapper = new LambdaQueryWrapper<>();
      //1. 查询优惠券
      queryWrapper.eq(SeckillVoucher::getVoucherId, voucherId);
      SeckillVoucher seckillVoucher = seckillVoucherService.getOne(queryWrapper);
      //2. 判断秒杀时间是否开始
      if (LocalDateTime.now().isBefore(seckillVoucher.getBeginTime())) {
          return Result.fail("秒杀还未开始，请耐心等待");
      }
      //3. 判断秒杀时间是否结束
      if (LocalDateTime.now().isAfter(seckillVoucher.getEndTime())) {
          return Result.fail("秒杀已经结束！");
      }
      //4. 判断库存是否充足
      if (seckillVoucher.getStock() < 1) {
          return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
      }
      Long userId = UserHolder.getUser().getId();
      synchronized (userId.toString().intern()) {
          return createVoucherOrder(voucherId);
      }
  }
  ```
  
- 但是以上做法依然有问题，因为你调用的方法，其实是this.的方式调用的，事务想要生效，还得利用代理来生效，所以这个地方，我们需要获得原始的事务对象， 来操作事务，这里可以使用`AopContext.currentProxy()`来获取当前对象的代理对象，然后再用代理对象调用方法，记得要去`IVoucherOrderService`中创建`createVoucherOrder`方法

  ```java
  Long userId = UserHolder.getUser().getId();
  synchronized (userId.toString().intern()) {
      IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
      return proxy.createVoucherOrder(voucherId);
  }
  ```
  
- 但是该方法会用到一个依赖，我们需要导入一下

  ```xml
  <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjweaver</artifactId>
  </dependency>
  ```
  
- 同时在启动类上加上

  ```
  @EnableAspectJAutoProxy(exposeProxy = true)
  ```

  注解

  ```java
  @MapperScan("com.hmdp.mapper")
  @SpringBootApplication
  @EnableAspectJAutoProxy(exposeProxy = true)
  public class HmDianPingApplication {
      public static void main(String[] args) {
          SpringApplication.run(HmDianPingApplication.class, args);
      }
  
  }
  ```
  
- 重启服务器，再次使用Jmeter测试，200个线程并发，但是只能抢到一张优惠券，目的达成

## 集群环境下的并发问题

- 通过加锁可以解决在单机情况下的一人一单安全问题，但是在集群模式下就不行了
  1. 我们将服务启动两份，端口分别为8081和8082
  2. 然后修改nginx的config目录下的nginx.conf文件，配置反向代理和负载均衡（默认轮询就行）
- 具体操作，我们使用`POSTMAN`发送两次请求，header携带同一用户的token，尝试用同一账号抢两张优惠券，发现是可行的。
- 失败原因分析：由于我们部署了多个Tomcat，每个Tomcat都有一个属于自己的jvm，那么假设在服务器A的Tomcat内部，有两个线程，即线程1和线程2，这两个线程使用的是同一份代码，那么他们的锁对象是同一个，是可以实现互斥的。但是如果在Tomcat的内部，又有两个线程，但是他们的锁对象虽然写的和服务器A一样，但是锁对象却不是同一个，所以线程3和线程4可以实现互斥，但是却无法和线程1和线程2互斥
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635a5e3e16f2c2beb1289579.jpg)](https://pic1.imgdb.cn/item/635a5e3e16f2c2beb1289579.jpg)
- 这就是集群环境下，syn锁失效的原因，在这种情况下，我们需要使用分布式锁来解决这个问题，让锁不存在于每个jvm的内部，而是让所有jvm公用外部的一把锁（Redis）

# 分布式锁

## 基本原理和实现方式对比

- 分布式锁：满足分布式系统或集群模式下多线程课件并且可以互斥的锁

- 分布式锁的核心思想就是让大家共用同一把锁，那么我们就能锁住线程，不让线程进行，让程序串行执行，这就是分布式锁的核心思路
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635a5e5516f2c2beb1292f05.jpg)](https://pic1.imgdb.cn/item/635a5e5516f2c2beb1292f05.jpg)

- 那么分布式锁应该满足一些什么条件呢？

  1. 可见性：多个线程都能看到相同的结果。

     注意：这里说的可见性并不是并发编程中指的内存可见性，只是说多个进程之间都能感知到变化的意思

  2. 互斥：互斥是分布式锁的最基本条件，使得程序串行执行

  3. 高可用：程序不已崩溃，时时刻刻都保证较高的可用性

  4. 高性能：由于加锁本身就让性能降低，所以对于分布式锁需要他较高的加锁性能和释放锁性能

  5. 安全性：安全也是程序中必不可少的一环

- 常见的分布式锁有三种

  1. MySQL：MySQL本身就带有锁机制，但是由于MySQL的性能一般，所以采用分布式锁的情况下，使用MySQL作为分布式锁比较少见
  2. Redis：Redis作为分布式锁是非常常见的一种使用方式，现在企业级开发中基本都是用Redis或者Zookeeper作为分布式锁，利用`SETNX`这个方法，如果插入Key成功，则表示获得到了锁，如果有人插入成功，那么其他人就回插入失败，无法获取到锁，利用这套逻辑完成`互斥`，从而实现分布式锁
  3. Zookeeper：Zookeeper也是企业级开发中较好的一种实现分布式锁的方案，但本文是学Redis的，所以这里就不过多阐述了

|        |           MySQL           |          Redis           |            Zookeeper             |
| :----: | :-----------------------: | :----------------------: | :------------------------------: |
|  互斥  | 利用mysql本身的互斥锁机制 | 利用setnx这样的互斥命令  | 利用节点的唯一性和有序性实现互斥 |
| 高可用 |            好             |            好            |                好                |
| 高性能 |           一般            |            好            |               一般               |
| 安全性 |   断开连接，自动释放锁    | 利用锁超时时间，到期释放 |    临时节点，断开连接自动释放    |

## Redis分布式锁的实现核心思路

- 实现分布式锁时需要实现两个基本方法

  1. 获取锁

     - 互斥：确保只能有一个线程获取锁

     - 非阻塞：尝试一次，成功返回true，失败返回false

       ```bash
       SET lock thread01 NX EX 10
       ```
     
  2. 释放锁
  
     - 手动释放
  
     - 超时释放：获取锁的时候添加一个超时时间
  
       ```bash
       DEL lock
       ```
  
- 核心思路

  - 我们利用redis的`SETNX`方法，当有多个线程进入时，我们就利用该方法来获取锁。第一个线程进入时，redis 中就有这个key了，返回了1，如果结果是1，则表示他抢到了锁，那么他去执行业务，然后再删除锁，退出锁逻辑，没有抢到锁（返回了0）的线程，等待一定时间之后重试

## 实现分布式锁

- 锁的基本接口

  ```java
  public interface ILock {
      /**
       * 尝试获取锁
       *
       * @param timeoutSec 锁持有的超时时间，过期自动释放
       * @return true表示获取锁成功，false表示获取锁失败
       */
      boolean tryLock(long timeoutSec);
  
      /**
       * 释放锁
       */
      void unlock();
  }
  ```
  
- 然后创建一个SimpleRedisLock类实现接口

  ```java
  public class SimpleRedisLock implements ILock {
      //锁的前缀
      private static final String KEY_PREFIX = "lock:";
      //具体业务名称，将前缀和业务名拼接之后当做Key
      private String name;
      //这里不需要@Autowired，因为该对象是我们使用构造函数手动new出来的
      private StringRedisTemplate stringRedisTemplate;
  
      public SimpleRedisLock(String name, StringRedisTemplate stringRedisTemplate) {
          this.name = name;
          this.stringRedisTemplate = stringRedisTemplate;
      }
  
      @Override
      public boolean tryLock(long timeoutSec) {
          //获取线程标识
          long threadId = Thread.currentThread().getId();
          //获取锁，使用SETNX方法进行加锁，同时设置过期时间，防止死锁
          Boolean success = stringRedisTemplate.opsForValue().setIfAbsent(KEY_PREFIX + name, threadId + "", timeoutSec, TimeUnit.SECONDS);
          //自动拆箱可能会出现null，这样写更稳妥
          return Boolean.TRUE.equals(success);
      }
  
      @Override
      public void unlock() {
          //通过DEL来删除锁
          stringRedisTemplate.delete(KEY_PREFIX + name);
      }
  }
  ```
  
- 修改业务代码

  ```java
  @Override
  public Result seckillVoucher(Long voucherId) {
      LambdaQueryWrapper<SeckillVoucher> queryWrapper = new LambdaQueryWrapper<>();
      //1. 查询优惠券
      queryWrapper.eq(SeckillVoucher::getVoucherId, voucherId);
      SeckillVoucher seckillVoucher = seckillVoucherService.getOne(queryWrapper);
      //2. 判断秒杀时间是否开始
      if (LocalDateTime.now().isBefore(seckillVoucher.getBeginTime())) {
          return Result.fail("秒杀还未开始，请耐心等待");
      }
      //3. 判断秒杀时间是否结束
      if (LocalDateTime.now().isAfter(seckillVoucher.getEndTime())) {
          return Result.fail("秒杀已经结束！");
      }
      //4. 判断库存是否充足
      if (seckillVoucher.getStock() < 1) {
          return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
      }
      Long userId = UserHolder.getUser().getId();
      // 创建锁对象
      SimpleRedisLock redisLock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);
      // 获取锁对象
      boolean isLock = redisLock.tryLock(120);
      // 加锁失败，说明当前用户开了多个线程抢优惠券，但是由于key是SETNX的，所以不能创建key，得等key的TTL到期或释放锁（删除key）
      if (!isLock) {
          return Result.fail("不允许抢多张优惠券");
      }
      try {
          // 获取代理对象
          IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
          return proxy.createVoucherOrder(voucherId);
      } finally {
          // 释放锁
          redisLock.unlock();
      }
  }
  ```
  
- 使用Jmeter进行压力测试，请求头中携带登录用户的token，最终只能抢到一张优惠券

## Redis分布式锁误删情况说明

- 逻辑说明
  - 持有锁的线程1在锁的内部出现了阻塞，导致他的锁TTL到期，自动释放
  - 此时线程2也来尝试获取锁，由于线程1已经释放了锁，所以线程2可以拿到
  - 但是现在线程1阻塞完了，继续往下执行，要开始释放锁了
  - 那么此时就会将属于线程2的锁释放，这就是误删别人锁的情况
  
- 解决方案
  - 解决方案就是在每个线程释放锁的时候，都判断一下这个锁是不是自己的，如果不属于自己，则不进行删除操作。
  - 假设还是上面的情况，线程1阻塞，锁自动释放，线程2进入到锁的内部执行逻辑，此时线程1阻塞完了，继续往下执行，开始删除锁，但是线程1发现这把锁不是自己的，所以不进行删除锁的逻辑，当线程2执行到删除锁的逻辑时，如果TTL还未到期，则判断当前这把锁是自己的，于是删除这把锁
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/635aa1b016f2c2beb1e68e4f.jpg)](https://pic1.imgdb.cn/item/635aa1b016f2c2beb1e68e4f.jpg)

## 解决Redis分布式锁误删问题

- 需求：修改之前的分布式锁实现

- 满足：在获取锁的时候存入线程标识（用UUID标识，在一个JVM中，ThreadId一般不会重复，但是我们现在是集群模式，有多个JVM，多个JVM之间可能会出现ThreadId重复的情况），在释放锁的时候先获取锁的线程标识，判断是否与当前线程标识一致

  - 如果一致则释放锁
  - 如果不一致则不释放锁

- 核心逻辑：在存入锁的时候，放入自己的线程标识，在删除锁的时候，判断当前这把锁是不是自己存入的

  - 如果是，则进行删除
  - 如果不是，则不进行删除

- 具体实现代码如下

  ```java
  private static final String ID_PREFIX = UUID.randomUUID().toString(true) + "-";
  @Override
  public boolean tryLock(long timeoutSec) {
      // 获取线程标识
      String threadId = ID_PREFIX + Thread.currentThread().getId();
      // 获取锁
      Boolean success = stringRedisTemplate.opsForValue().setIfAbsent(KEY_PREFIX + name, threadId, timeoutSec, TimeUnit.SECONDS);
      return Boolean.TRUE.equals(success);
  }
  
  @Override
  public void unlock() {
      // 获取当前线程的标识
      String threadId = ID_PREFIX + Thread.currentThread().getId();
      // 获取锁中的标识
      String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);
      // 判断标识是否一致
      if (threadId.equals(id)) {
          // 释放锁
          stringRedisTemplate.delete(KEY_PREFIX + name);
      }
  }
  ```

## 分布式锁的原子性问题

- 更为极端的误删逻辑说明
- 假设线程1已经获取了锁，在判断标识一致之后，准备释放锁的时候，又出现了阻塞（例如JVM垃圾回收机制）
- 于是锁的TTL到期了，自动释放了
- 那么现在线程2趁虚而入，拿到了一把锁
- 但是线程1的逻辑还没执行完，那么线程1就会执行删除锁的逻辑
- 但是在阻塞前线程1已经判断了标识一致，所以现在线程1把线程2的锁给删了
- 那么就相当于判断标识那行代码没有起到作用
- 这就是删锁时的原子性问题
- 因为线程1的拿锁，判断标识，删锁，不是原子操作，所以我们要防止刚刚的情况

[![img](https://gitlab.com/apzs/image/-/raw/master/image/635c85c916f2c2beb1236040.jpg)](https://pic1.imgdb.cn/item/635c85c916f2c2beb1236040.jpg)

## Lua脚本解决多条命令原子性问题

- Redis提供了Lua脚本功能，在一个脚本中编写多条Redis命令，确保多条命令执行时的原子性。

- Lua是一种编程语言，它的基本语法可以上菜鸟教程看看，链接：https://www.runoob.com/lua/lua-tutorial.html

- 这里重点介绍Redis提供的调用函数，我们可以使用Lua去操作Redis，而且还能保证它的原子性，这样就可以实现`拿锁`，`判断标识`，`删锁`是一个原子性动作了

- Redis提供的调用函数语法如下

  ```bash
  redis.call('命令名称','key','其他参数', ...)
  ```
  
- 例如我们要执行

  ```bash
  set name Kyle
  ```

  ，则脚本是这样

  ```bash
  redis.call('set', 'name', 'Kyle')
  ```
  
- 例如我我们要执行

  ```bash
  set name David
  ```

  ，在执行

  ```bash
  get name
  ```

  ，则脚本如下

  ```bash
  # 先执行set name David
  redis.call('set', 'name', 'David')
  # 再执行get name
  local name = redis.call('get', 'name')
  # 返回
  return name
  ```
  
- 写好脚本以后，需要用Redis命令来调用脚本，调用脚本的常见命令如下

  ```bash
  EVAL script numkeys key [key ...] arg [arg ...]
  ```
  
- 例如，我们要调用

  ```bash
  redis.call('set', 'name', 'Kyle') 0
  ```

  这个脚本，语法如下

  ```bash
  EVAL "return redis.call('set', 'name', 'Kyle')" 0
  ```
  
- 如果脚本中的key和value不想写死，可以作为参数传递，key参数会放入KEYS数组，其他参数会放入ARGV数组，在脚本中可以从KEYS和ARGV数组中获取这些参数

  注意：在Lua中，数组下标从1开始

  ```bash
  EVAL "return redis.call('set', KEYS[1], ARGV[1])" 1 name Lucy
  ```
  
- 那现在我们来使用Lua脚本来代替我们释放锁的逻辑

- 原逻辑
- 改写为Lua脚本01
- 改写为Lua脚本02

```java
@Override
public void unlock() {
    // 获取当前线程的标识
    String threadId = ID_PREFIX + Thread.currentThread().getId();
    // 获取锁中的标识
    String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);
    // 判断标识是否一致
    if (threadId.equals(id)) {
        // 释放锁
        stringRedisTemplate.delete(KEY_PREFIX + name);
    }
}
```

## 利用Java代码调用Lua脚本改造分布式锁

- 在RedisTemplate中，可以利用execute方法去执行lua脚本

  ```java
  public <T> T execute(RedisScript<T> script, List<K> keys, Object... args) {
      return this.scriptExecutor.execute(script, keys, args);
  }
  ```
  
- 对应的Java代码如下

  ```java
  private static final DefaultRedisScript<Long> UNLOCK_SCRIPT;
  
  static {
      UNLOCK_SCRIPT = new DefaultRedisScript();
      UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
      UNLOCK_SCRIPT.setResultType(Long.class);
  }
  
  @Override
  public void unlock() {
      stringRedisTemplate.execute(UNLOCK_SCRIPT,
              Collections.singletonList(KEY_PREFIX + name),
              ID_PREFIX + Thread.currentThread().getId());
  }
  ```
  
- 但是现在的分布式锁还存在一个问题：锁不住

  - 那什么是锁不住呢？
    - 如果锁的TTL快到期的时候，我们可以给它续期一下，比如续个30s，就好像是网吧上网，快没网费了的时候，让网管再给你续50块钱的，然后该玩玩，程序也继续往下执行
    - 那么续期问题怎么解决呢，可以依赖于我们接下来要学习redission了

- 小结：基于Redis分布式锁的实现思路
  - 利用SET NX EX获取锁，并设置过期时间，保存线程标识
  - 释放锁时先判断线程标识是否与自己一致，一致则删除所
    - 特性
      - 利用SET NX满足互斥性
      - 利用SET EX保证故障时依然能释放锁，避免死锁，提高安全性
      - 利用Redis集群保证高可用和高并发特性

# 分布式锁-Redisson

- 基于SETNX实现的分布式锁存在以下问题
  1. 重入问题
     - 重入问题是指获取锁的线程，可以再次进入到相同的锁的代码块中，可重入锁的意义在于防止死锁，例如在HashTable这样的代码中，它的方法都是使用synchronized修饰的，加入它在一个方法内调用另一个方法，如果此时是不可重入的，那就死锁了。所以可重入锁的主要意义是防止死锁，我们的synchronized和Lock锁都是可重入的
  2. 不可重试
     - 我们编写的分布式锁只能尝试一次，失败了就返回false，没有重试机制。但合理的情况应该是：当线程获取锁失败后，他应该能再次尝试获取锁
  3. 超时释放
     - 我们在加锁的时候增加了TTL，这样我们可以防止死锁，但是如果卡顿(阻塞)时间太长，也会导致锁的释放。虽然我们采用Lua脚本来防止删锁的时候，误删别人的锁，但现在的新问题是没锁住，也有安全隐患
  4. 主从一致性
     - 如果Redis提供了主从集群，那么当我们向集群写数据时，主机需要异步的将数据同步给从机，万一在同步之前，主机宕机了(主从同步存在延迟，虽然时间很短，但还是发生了)，那么又会出现死锁问题
- 那么什么是Redisson呢
  - Redisson是一个在Redis的基础上实现的Java驻内存数据网格(In-Memory Data Grid)。它不仅提供了一系列的分布式Java常用对象，还提供了许多分布式服务，其中就包含了各种分布式锁的实现
- Redis提供了分布式锁的多种多样功能
  1. 可重入锁(Reentrant Lock)
  2. 公平锁(Fair Lock)
  3. 联锁(MultiLock)
  4. 红锁(RedLock)
  5. 读写锁(ReadWriteLock)
  6. 信号量(Semaphore)
  7. 可过期性信号量(PermitExpirableSemaphore)
  8. 闭锁(CountDownLatch)

## Redisson入门

1. 导入依赖

   ```xml
   <dependency>
       <groupId>org.redisson</groupId>
       <artifactId>redisson</artifactId>
       <version>3.13.6</version>
   </dependency>
   ```
   
2. 配置Redisson客户端，在config包下新建`RedissonConfig`类

   ```java
   import org.redisson.Redisson;
   import org.redisson.api.RedissonClient;
   import org.redisson.config.Config;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   
   @Configuration
   public class RedissonConfig {
       @Bean
       public RedissonClient redissonClient() {
           Config config = new Config();
           config.useSingleServer()
               .setAddress("redis://101.XXX.XXX.160:6379")
               .setPassword("root");
           return Redisson.create(config);
       }
   }
   ```
   
3. 使用Redisson的分布式锁

   ```java
   @Resource
   private RedissonClient redissonClient;
   
   @Test
   void testRedisson() throws InterruptedException {
       //获取可重入锁
       RLock lock = redissonClient.getLock("anyLock");
       //尝试获取锁，三个参数分别是：获取锁的最大等待时间(期间会重试)，锁的自动释放时间，时间单位
       boolean success = lock.tryLock(1,10, TimeUnit.SECONDS);
       //判断获取锁成功
       if (success) {
           try {
               System.out.println("执行业务");
           } finally {
               //释放锁
               lock.unlock();
           }
       }
   }
   ```
   
4. 替换我们之前自己写的分布式锁

   - DIFF
   - 修改后的代码

   这里要注入一下RedissonClient

   ```diff
   +   @Resource
   +   private RedissonClient redissonClient;
   
       @Override
       public Result seckillVoucher(Long voucherId) {
           LambdaQueryWrapper<SeckillVoucher> queryWrapper = new LambdaQueryWrapper<>();
           //1. 查询优惠券
           queryWrapper.eq(SeckillVoucher::getVoucherId, voucherId);
           SeckillVoucher seckillVoucher = seckillVoucherService.getOne(queryWrapper);
           //2. 判断秒杀时间是否开始
           if (LocalDateTime.now().isBefore(seckillVoucher.getBeginTime())) {
               return Result.fail("秒杀还未开始，请耐心等待");
           }
           //3. 判断秒杀时间是否结束
           if (LocalDateTime.now().isAfter(seckillVoucher.getEndTime())) {
               return Result.fail("秒杀已经结束！");
           }
           //4. 判断库存是否充足
           if (seckillVoucher.getStock() < 1) {
               return Result.fail("优惠券已被抢光了哦，下次记得手速快点");
           }
           Long userId = UserHolder.getUser().getId();
   -       SimpleRedisLock redisLock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);
   +       RLock redisLock = redissonClient.getLock("order:" + userId);
   -       boolean isLock = redisLock.tryLock(120);
   +       boolean isLock = redisLock.tryLock();
           if (!isLock) {
               return Result.fail("不允许抢多张优惠券");
           }
           try {
               IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
               return proxy.createVoucherOrder(voucherId);
           } finally {
               redisLock.unlock();
           }
       }
   ```
   
   
   


- 使用Jmeter进行压力测试，依旧是只能抢到一张优惠券，满足我们的需求

## Redisson可重入锁原理

- 在Lock锁中，他是借助于等曾的一个voaltile的一个state变量来记录重入的状态的

  - 如果当前`没有`人持有这把锁，那么`state = 0`

  - 如果有人持有这把锁，那么`state = 1`

    - 如果持有者把锁的人再次持有这把锁，那么state会`+1`
    
  - 如果对于`synchronize`而言，他在c语言代码中会有一个count

  - 原理与`state`类似，也是重入一次就`+1`，释放一次就`-1`，直至减到0，表示这把锁没有被人持有

- 在redisson中，我们也支持可重入锁

  - 在分布式锁中，它采用hash结构来存储锁，其中外层key表示这把锁是否存在，内层key则记录当前这把锁被哪个线程持有

- method1在方法内部调用method2，method1和method2出于同一个线程，那么method1已经拿到一把锁了，想进入method2中拿另外一把锁，必然是拿不到的，于是就出现了死锁

  ```java
  @Resource
  private RedissonClient redissonClient;
  
  private RLock lock;
  
  @BeforeEach
  void setUp() {
      lock = redissonClient.getLock("lock");
  }
  
  @Test
  void method1() {
      boolean success = lock.tryLock();
      if (!success) {
          log.error("获取锁失败，1");
          return;
      }
      try {
          log.info("获取锁成功");
          method2();
      } finally {
          log.info("释放锁，1");
          lock.unlock();
      }
  }
  
  void method2() {
      RLock lock = redissonClient.getLock("lock");
      boolean success = lock.tryLock();
      if (!success) {
          log.error("获取锁失败，2");
          return;
      }
      try {
          log.info("获取锁成功，2");
      } finally {
          log.info("释放锁，2");
          lock.unlock();
      }
  }
  ```
  
- 所以我们需要额外判断，method1和method2是否处于同一线程，如果是同一个线程，则可以拿到锁，但是state会`+1`，之后执行method2中的方法，释放锁，释放锁的时候也只是将state进行`-1`，只有减至0，才会真正释放锁

- 由于我们需要额外存储一个state，所以用字符串型`SET NX EX`是不行的，需要用到`Hash`结构，但是`Hash`结构又没有`NX`这种方法，所以我们需要将原有的逻辑拆开，进行手动判断

[![img](https://gitlab.com/apzs/image/-/raw/master/image/635cea4f16f2c2beb1df2620.jpg)](https://pic1.imgdb.cn/item/635cea4f16f2c2beb1df2620.jpg)

为了保证原子性，所以流程图中的业务逻辑也是需要我们用Lua来实现的

- 获取锁的逻辑

  ```lua
  local key = KEYS[1]; -- 锁的key
  local threadId = ARGV[1]; -- 线程唯一标识
  local releaseTime = ARGV[2]; -- 锁的自动释放时间
  -- 锁不存在
  if (redis.call('exists', key) == 0) then
      -- 获取锁并添加线程标识，state设为1
      redis.call('hset', key, threadId, '1');
      -- 设置锁有效期
      redis.call('expire', key, releaseTime);
      return 1; -- 返回结果
  end;
  -- 锁存在，判断threadId是否为自己
  if (redis.call('hexists', key, threadId) == 1) then
      -- 锁存在，重入次数 +1，这里用的是hash结构的incrby增长
      redis.call('hincrby', key, thread, 1);
      -- 设置锁的有效期
      redis.call('expire', key, releaseTime);
      return 1; -- 返回结果
  end;
  return 0; -- 代码走到这里，说明获取锁的不是自己，获取锁失败
  ```
  
- 释放锁的逻辑

  ```lua
  local key = KEYS[1];
  local threadId = ARGV[1];
  local releaseTime = ARGV[2];
  -- 如果锁不是自己的
  if (redis.call('HEXISTS', key, threadId) == 0) then
      return nil; -- 直接返回
  end;
  -- 锁是自己的，锁计数-1，还是用hincrby，不过自增长的值为-1
  local count = redis.call('hincrby', key, threadId, -1);
  -- 判断重入次数为多少
  if (count > 0) then
      -- 大于0，重置有效期
      redis.call('expire', key, releaseTime);
      return nil;
  else
      -- 否则直接释放锁
      redis.call('del', key);
      return nil;
  end;
  ```

- 获取锁源码

  查看源码，跟我们的实现方式几乎一致

  ```java
  <T> RFuture<T> tryLockInnerAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId, RedisStrictCommand<T> command) {
      this.internalLockLeaseTime = unit.toMillis(leaseTime);
      return this.evalWriteAsync(this.getName(), LongCodec.INSTANCE, command, "if (redis.call('exists', KEYS[1]) == 0) then redis.call('hincrby', KEYS[1], ARGV[2], 1); redis.call('pexpire', KEYS[1], ARGV[1]); return nil; end; if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then redis.call('hincrby', KEYS[1], ARGV[2], 1); redis.call('pexpire', KEYS[1], ARGV[1]); return nil; end; return redis.call('pttl', KEYS[1]);", Collections.singletonList(this.getName()), this.internalLockLeaseTime, this.getLockName(threadId));
  }
  ```

- 释放锁源码

  ```java
  protected RFuture<Boolean> unlockInnerAsync(long threadId) {
      return this.evalWriteAsync(this.getName(), LongCodec.INSTANCE, RedisCommands.EVAL_BOOLEAN, "if (redis.call('hexists', KEYS[1], ARGV[3]) == 0) then return nil;end; local counter = redis.call('hincrby', KEYS[1], ARGV[3], -1); if (counter > 0) then redis.call('pexpire', KEYS[1], ARGV[2]); return 0; else redis.call('del', KEYS[1]); redis.call('publish', KEYS[2], ARGV[1]); return 1; end; return nil;", Arrays.asList(this.getName(), this.getChannelName()), LockPubSub.UNLOCK_MESSAGE, this.internalLockLeaseTime, this.getLockName(threadId));
  }
  ```

## Redisson锁重试和WatchDog机制

- 前面我们分析的是空参的tryLock方法，现在我们来分析一下这个带参数的

  ```java
  <T> RFuture<T> tryLockInnerAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId, RedisStrictCommand<T> command) {
      this.internalLockLeaseTime = unit.toMillis(leaseTime);
      return this.evalWriteAsync(this.getName(), LongCodec.INSTANCE, command, "if (redis.call('exists', KEYS[1]) == 0) then redis.call('hincrby', KEYS[1], ARGV[2], 1); redis.call('pexpire', KEYS[1], ARGV[1]); return nil; end; if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then redis.call('hincrby', KEYS[1], ARGV[2], 1); redis.call('pexpire', KEYS[1], ARGV[1]); return nil; end; return redis.call('pttl', KEYS[1]);", Collections.singletonList(this.getName()), this.internalLockLeaseTime, this.getLockName(threadId));
  }
  ```
  
- 源码分析

- tryAcquireAsync

  ```java
  private <T> RFuture<Long> tryAcquireAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId) {
      
      if (leaseTime != -1L) {
          return this.tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_LONG);
      } else {
          // 如果没有指定释放时间时间，则指定默认释放时间为getLockWatchdogTimeout，底层源码显示是30*1000ms，也就是30秒
          RFuture<Long> ttlRemainingFuture = this.tryLockInnerAsync(waitTime, this.commandExecutor.getConnectionManager().getCfg().getLockWatchdogTimeout(), TimeUnit.MILLISECONDS, threadId, RedisCommands.EVAL_LONG);
          ttlRemainingFuture.onComplete((ttlRemaining, e) -> {
              if (e == null) {
                  if (ttlRemaining == null) {
                      this.scheduleExpirationRenewal(threadId);
                  }
  
              }
          });
          return ttlRemainingFuture;
      }
  }
  ```
  
- tryLock

  ```java
  public boolean tryLock(long waitTime, long leaseTime, TimeUnit unit) throws InterruptedException {
          long time = unit.toMillis(waitTime);
          long current = System.currentTimeMillis();
          long threadId = Thread.currentThread().getId();
          Long ttl = this.tryAcquire(waitTime, leaseTime, unit, threadId);
          //判断ttl是否为null
          if (ttl == null) {
              return true;
          } else {
              //计算当前时间与获取锁时间的差值，让等待时间减去这个值
              time -= System.currentTimeMillis() - current;
              //如果消耗时间太长了，直接返回false，获取锁失败
              if (time <= 0L) {
                  this.acquireFailed(waitTime, unit, threadId);
                  return false;
              } else {
                  //等待时间还有剩余，再次获取当前时间
                  current = System.currentTimeMillis();
                  //订阅别人释放锁的信号
                  RFuture<RedissonLockEntry> subscribeFuture = this.subscribe(threadId);
                  //在剩余时间内，等待这个信号
                  if (!subscribeFuture.await(time, TimeUnit.MILLISECONDS)) {
                      if (!subscribeFuture.cancel(false)) {
                          subscribeFuture.onComplete((res, e) -> {
                              if (e == null) {
                                  //取消订阅
                                  this.unsubscribe(subscribeFuture, threadId);
                              }
  
                          });
                      }
                      //剩余时间内没等到，返回false
                      this.acquireFailed(waitTime, unit, threadId);
                      return false;
                  } else {
                      try {
                          //如果剩余时间内等到了别人释放锁的信号，再次计算当前剩余最大等待时间
                          time -= System.currentTimeMillis() - current;
                          if (time <= 0L) {
                              //如果剩余时间为负数，则直接返回false
                              this.acquireFailed(waitTime, unit, threadId);
                              boolean var20 = false;
                              return var20;
                          } else {
                              boolean var16;
                              do {
                                  //如果剩余时间等到了，dowhile循环重试获取锁
                                  long currentTime = System.currentTimeMillis();
                                  ttl = this.tryAcquire(waitTime, leaseTime, unit, threadId);
                                  if (ttl == null) {
                                      var16 = true;
                                      return var16;
                                  }
  
                                  time -= System.currentTimeMillis() - currentTime;
                                  if (time <= 0L) {
                                      this.acquireFailed(waitTime, unit, threadId);
                                      var16 = false;
                                      return var16;
                                  }
  
                                  currentTime = System.currentTimeMillis();
                                  if (ttl >= 0L && ttl < time) {
                                      ((RedissonLockEntry)subscribeFuture.getNow()).getLatch().tryAcquire(ttl, TimeUnit.MILLISECONDS);
                                  } else {
                                      ((RedissonLockEntry)subscribeFuture.getNow()).getLatch().tryAcquire(time, TimeUnit.MILLISECONDS);
                                  }
  
                                  time -= System.currentTimeMillis() - currentTime;
                              } while(time > 0L);
  
                              this.acquireFailed(waitTime, unit, threadId);
                              var16 = false;
                              return var16;
                          }
                      } finally {
                          this.unsubscribe(subscribeFuture, threadId);
                      }
                  }
              }
          }
      }
  ```
  
- scheduleExpirationRenewal

  ```java
  private void scheduleExpirationRenewal(long threadId) {
      ExpirationEntry entry = new ExpirationEntry();  
      //不存在，才put，表明是第一次进入，不是重入
      ExpirationEntry oldEntry = (ExpirationEntry)EXPIRATION_RENEWAL_MAP.putIfAbsent(this.getEntryName(), entry);
      if (oldEntry != null) {
          oldEntry.addThreadId(threadId);
      } else {
          //如果是第一次进入，则跟新有效期
          entry.addThreadId(threadId);
          this.renewExpiration();
      }
  }
  ```
  
- renewExpiration

  ```java
  private void renewExpiration() {
      ExpirationEntry ee = (ExpirationEntry)EXPIRATION_RENEWAL_MAP.get(this.getEntryName());
      if (ee != null) {
          //Timeout是一个定时任务
          Timeout task = this.commandExecutor.getConnectionManager().newTimeout(new TimerTask() {
              public void run(Timeout timeout) throws Exception {
                  ExpirationEntry ent = (ExpirationEntry)RedissonLock.EXPIRATION_RENEWAL_MAP.get(RedissonLock.this.getEntryName());
                  if (ent != null) {
                      Long threadId = ent.getFirstThreadId();
                      if (threadId != null) {
                          //重置有效期
                          RFuture<Boolean> future = RedissonLock.this.renewExpirationAsync(threadId);
                          future.onComplete((res, e) -> {
                              if (e != null) {
                                  RedissonLock.log.error("Can't update lock " + RedissonLock.this.getName() + " expiration", e);
                              } else {
                                  if (res) {
                                      //然后调用自己，递归重置有效期
                                      RedissonLock.this.renewExpiration();
                                  }
  
                              }
                          });
                      }
                  }
              }
              //internalLockLeaseTime是之前WatchDog默认有效期30秒，那这里就是 30 / 3 = 10秒之后，才会执行
          }, this.internalLockLeaseTime / 3L, TimeUnit.MILLISECONDS);
          ee.setTimeout(task);
      }
  }
  ```
  
- renewExpirationAsync
  重点看lua脚本，先判断锁是不是自己的，然后更新有效时间

  ```java
  protected RFuture<Boolean> renewExpirationAsync(long threadId) {
      return this.evalWriteAsync(this.getName(), LongCodec.INSTANCE, RedisCommands.EVAL_BOOLEAN, "if (redis.call('hexists', KEYS[1], ARGV[2]) == 1) then redis.call('pexpire', KEYS[1], ARGV[1]); return 1; end; return 0;", Collections.singletonList(this.getName()), this.internalLockLeaseTime, this.getLockName(threadId));
  }
  ```
  
- 那么之前的重置有效期的行为该怎么终止呢？当然是释放锁的时候会终止

- cancelExpirationRenewal

  ```java
  void cancelExpirationRenewal(Long threadId) {
      //将之前的线程终止掉
      ExpirationEntry task = (ExpirationEntry)EXPIRATION_RENEWAL_MAP.get(this.getEntryName());
      if (task != null) {
          if (threadId != null) {
              task.removeThreadId(threadId);
          }
  
          if (threadId == null || task.hasNoThreads()) {
              //获取之前的定时任务
              Timeout timeout = task.getTimeout();
              if (timeout != null) {
                  //取消
                  timeout.cancel();
              }
  
              EXPIRATION_RENEWAL_MAP.remove(this.getEntryName());
          }
  
      }
  }
  ```

[![img](https://gitlab.com/apzs/image/-/raw/master/image/635d046816f2c2beb1293315.jpg)](https://pic1.imgdb.cn/item/635d046816f2c2beb1293315.jpg)

## Redisson锁的MutiLock原理

- 为了提高Redis的可用性，我们会搭建集群或者主从，现在以主从为例

- 此时我们去写命令，写在主机上，主机会将数据同步给从机，但是假设主机还没来得及把数据写入到从机去的时候，主机宕机了

- 哨兵会发现主机宕机了，于是选举一个slave(从机)变成master(主机)，而此时新的master(主机)上并没有锁的信息，那么其他线程就可以获取锁，又会引发安全问题

- 为了解决这个问题。Redisson提出来了MutiLock锁，使用这把锁的话，那我们就不用主从了，每个节点的地位都是一样的，都可以当做是主机，那我们就需要将加锁的逻辑写入到每一个主从节点上，只有所有的服务器都写入成功，此时才是加锁成功，假设现在某个节点挂了，那么他去获取锁的时候，只要有一个节点拿不到，都不能算是加锁成功，就保证了加锁的可靠性

- 我们先使用虚拟机额外搭建两个Redis节点

  ```java
  @Configuration
  public class RedissonConfig {
      @Bean
      public RedissonClient redissonClient() {
          Config config = new Config();
          config.useSingleServer().setAddress("redis://192.168.137.130:6379")
                  .setPassword("root");
          return Redisson.create(config);
      }
  
      @Bean
      public RedissonClient redissonClient2() {
          Config config = new Config();
          config.useSingleServer().setAddress("redis://92.168.137.131:6379")
                  .setPassword("root");
          return Redisson.create(config);
      }
  
      @Bean
      public RedissonClient redissonClient3() {
          Config config = new Config();
          config.useSingleServer().setAddress("redis://92.168.137.132:6379")
                  .setPassword("root");
          return Redisson.create(config);
      }
  }
  ```
  
- 使用联锁，我们首先要注入三个RedissonClient对象

  ```java
  @Resource
  private RedissonClient redissonClient;
  @Resource
  private RedissonClient redissonClient2;
  @Resource
  private RedissonClient redissonClient3;
  
  private RLock lock;
  
  @BeforeEach
  void setUp() {
      RLock lock1 = redissonClient.getLock("lock");
      RLock lock2 = redissonClient2.getLock("lock");
      RLock lock3 = redissonClient3.getLock("lock");
      lock = redissonClient.getMultiLock(lock1, lock2, lock3);
  }
  
  @Test
  void method1() {
      boolean success = lock.tryLock();
      redissonClient.getMultiLock();
      if (!success) {
          log.error("获取锁失败，1");
          return;
      }
      try {
          log.info("获取锁成功");
          method2();
      } finally {
          log.info("释放锁，1");
          lock.unlock();
      }
  }
  
  void method2() {
      RLock lock = redissonClient.getLock("lock");
      boolean success = lock.tryLock();
      if (!success) {
          log.error("获取锁失败，2");
          return;
      }
      try {
          log.info("获取锁成功，2");
      } finally {
          log.info("释放锁，2");
          lock.unlock();
      }
  }
  ```
  
- 源码分析

- 当我们没有传入锁对象来创建联锁的时候，则会抛出一个异常，反之则将我们传入的可变参数锁对象封装成一个集合

  ```java
  public RedissonMultiLock(RLock... locks) {
      if (locks.length == 0) {
          throw new IllegalArgumentException("Lock objects are not defined");
      } else {
          this.locks.addAll(Arrays.asList(locks));
      }
  }
  ```
  
- 联锁的tryLock

  ```java
  public boolean tryLock(long waitTime, long leaseTime, TimeUnit unit) throws InterruptedException {
      long newLeaseTime = -1L;
      //如果传入了释放时间
      if (leaseTime != -1L) {
          //再判断一下是否有等待时间
          if (waitTime == -1L) {
              //如果没传等待时间，不重试，则只获得一次
              newLeaseTime = unit.toMillis(leaseTime);
          } else {
              //想要重试，耗时较久，万一释放时间小于等待时间，则会有问题，所以这里将等待时间乘以二
              newLeaseTime = unit.toMillis(waitTime) * 2L;
          }
      }
      //获取当前时间
      long time = System.currentTimeMillis();
      //剩余等待时间
      long remainTime = -1L;
      if (waitTime != -1L) {
          remainTime = unit.toMillis(waitTime);
      }
      //锁等待时间，与剩余等待时间一样    
      long lockWaitTime = this.calcLockWaitTime(remainTime);
      //锁失败的限制，源码返回是的0
      int failedLocksLimit = this.failedLocksLimit();
      //已经获取成功的锁
      List<RLock> acquiredLocks = new ArrayList(this.locks.size());
      //迭代器，用于遍历
      ListIterator<RLock> iterator = this.locks.listIterator();
  
      while(iterator.hasNext()) {
          RLock lock = (RLock)iterator.next();
  
          boolean lockAcquired;
          try {
              //没有等待时间和释放时间，调用空参的tryLock
              if (waitTime == -1L && leaseTime == -1L) {
                  lockAcquired = lock.tryLock();
              } else {
                  //否则调用带参的tryLock
                  long awaitTime = Math.min(lockWaitTime, remainTime);
                  lockAcquired = lock.tryLock(awaitTime, newLeaseTime, TimeUnit.MILLISECONDS);
              }
          } catch (RedisResponseTimeoutException var21) {
              this.unlockInner(Arrays.asList(lock));
              lockAcquired = false;
          } catch (Exception var22) {
              lockAcquired = false;
          }
          //判断获取锁是否成功
          if (lockAcquired) {
              //成功则将锁放入成功锁的集合
              acquiredLocks.add(lock);
          } else {
              //如果获取锁失败
              //判断当前锁的数量，减去成功获取锁的数量，如果为0，则所有锁都成功获取，跳出循环
              if (this.locks.size() - acquiredLocks.size() == this.failedLocksLimit()) {
                  break;
              }
              //否则将拿到的锁都释放掉
              if (failedLocksLimit == 0) {
                  this.unlockInner(acquiredLocks);
                  //如果等待时间为-1，则不想重试，直接返回false
                  if (waitTime == -1L) {
                      return false;
                  }
  
                  failedLocksLimit = this.failedLocksLimit();
                  //将已经拿到的锁都清空
                  acquiredLocks.clear();
                  //将迭代器往前迭代，相当于重置指针，放到第一个然后重试获取锁
                  while(iterator.hasPrevious()) {
                      iterator.previous();
                  }
              } else {
                  --failedLocksLimit;
              }
          }
          //如果剩余时间不为-1，很充足
          if (remainTime != -1L) {
              //计算现在剩余时间
              remainTime -= System.currentTimeMillis() - time;
              time = System.currentTimeMillis();
              //如果剩余时间为负数，则获取锁超时了
              if (remainTime <= 0L) {
                  //将之前已经获取到的锁释放掉，并返回false
                  this.unlockInner(acquiredLocks);
                  //联锁成功的条件是：每一把锁都必须成功获取，一把锁失败，则都失败
                  return false;
              }
          }
      }
      //如果设置了锁的有效期
      if (leaseTime != -1L) {
          List<RFuture<Boolean>> futures = new ArrayList(acquiredLocks.size());
          //迭代器用于遍历已经获取成功的锁
          Iterator var24 = acquiredLocks.iterator();
  
          while(var24.hasNext()) {
              RLock rLock = (RLock)var24.next();
              //设置每一把锁的有效期
              RFuture<Boolean> future = ((RedissonLock)rLock).expireAsync(unit.toMillis(leaseTime), TimeUnit.MILLISECONDS);
              futures.add(future);
          }
  
          var24 = futures.iterator();
  
          while(var24.hasNext()) {
              RFuture<Boolean> rFuture = (RFuture)var24.next();
              rFuture.syncUninterruptibly();
          }
      }
      //但如果没设置有效期，则会触发WatchDog机制，自动帮我们设置有效期，所以大多数情况下，我们不需要自己设置有效期
      return true;
  }
  ```

## 小结

1. 不可重入Redis分布式锁
   - 原理：利用SETNX的互斥性；利用EX避免死锁；释放锁时判断线程标识
   - 缺陷：不可重入、无法重试、锁超时失效
2. 可重入Redis分布式锁
   - 原理：利用Hash结构，记录线程标识与重入次数；利用WatchDog延续锁时间；利用信号量控制锁重试等待
   - 缺陷：Redis宕机引起锁失效问题
3. Redisson的multiLock
   - 原理：多个独立的Redis节点，必须在所有节点都获取重入锁，才算获取锁成功

# 秒杀优化

## 异步秒杀思路

- 我们先来回顾一下下单流程
- 当用户发起请求，此时会先请求Nginx，Nginx反向代理到Tomcat，而Tomcat中的程序，会进行串行操作，分为如下几个步骤
  1. 查询优惠券
  2. 判断秒杀库存是否足够
  3. 查询订单
  4. 校验是否一人一单
  5. 扣减库存
  6. 创建订单
- 在这六个步骤中，有很多操作都是要去操作数据库的，而且还是一个线程串行执行，这样就会导致我们的程序执行很慢，所以我们需要异步程序执行，那么如何加速呢？
- `优化方案：`我们将耗时较短的逻辑判断放到Redis中，例如：库存是否充足，是否一人一单这样的操作，只要满足这两条操作，那我们是一定可以下单成功的，不用等数据真的写进数据库，我们直接告诉用户下单成功就好了。然后后台再开一个线程，后台线程再去慢慢执行队列里的消息，这样我们就能很快的完成下单业务。
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635dedfc16f2c2beb1c42f52.jpg)](https://pic1.imgdb.cn/item/635dedfc16f2c2beb1c42f52.jpg)
- 但是这里还存在两个难点
  1. 我们怎么在Redis中快速校验是否一人一单，还有库存判断
  2. 我们校验一人一单和将下单数据写入数据库，这是两个线程，我们怎么知道下单是否完成。
     - 我们需要将一些信息返回给前端，同时也将这些信息丢到异步queue中去，后续操作中，可以通过这个id来查询下单逻辑是否完成
- 我们现在来看整体思路：当用户下单之后，判断库存是否充足，只需要取Redis中根据key找对应的value是否大于0即可，如果不充足，则直接结束。如果充足，则在Redis中判断用户是否可以下单，如果set集合中没有该用户的下单数据，则可以下单，并将userId和优惠券存入到Redis中，并且返回0，整个过程需要保证是原子性的，所以我们要用Lua来操作，同时由于我们需要在Redis中查询优惠券信息，所以在我们新增秒杀优惠券的同时，需要将优惠券信息保存到Redis中
- 完成以上逻辑判断时，我们只需要判断当前Redis中的返回值是否为0，如果是0，则表示可以下单，将信息保存到queue中去，然后返回，开一个线程来异步下单，其阿奴单可以通过返回订单的id来判断是否下单成功

[![img](https://gitlab.com/apzs/image/-/raw/master/image/635df17d16f2c2beb1cf02be.jpg)](https://pic1.imgdb.cn/item/635df17d16f2c2beb1cf02be.jpg)

## Redis完成秒杀资格判断

- 需求：

  1. 新增秒杀优惠券的同时，将优惠券信息保存到Redis中
  2. 基于Lua脚本，判断秒杀库存、一人一单，决定用户是否秒杀成功

- 步骤一：修改保存优惠券相关代码
  
  ```java
  @Override
  @Transactional
  public void addSeckillVoucher(Voucher voucher) {
      // 保存优惠券
      save(voucher);
      // 保存秒杀信息
      SeckillVoucher seckillVoucher = new SeckillVoucher();
      seckillVoucher.setVoucherId(voucher.getId());
      seckillVoucher.setStock(voucher.getStock());
      seckillVoucher.setBeginTime(voucher.getBeginTime());
      seckillVoucher.setEndTime(voucher.getEndTime());
      seckillVoucherService.save(seckillVoucher);
      // 保存秒杀优惠券信息到Reids，这里并不需要设置有效期，等秒杀活动过了，我们再手动将其删除
      stringRedisTemplate.opsForValue().set(SECKILL_STOCK_KEY + voucher.getId(), voucher.getStock().toString()); 
  }
  ```
  
- 使用PostMan发送请求，添加优惠券

  请求路径：

  http://localhost:8080/api/voucher/seckill

  请求方式：POST

  ```json
  {
      "shopId":1,
      "title":"9999元代金券",
      "subTitle":"365*24小时可用",
      "rules":"全场通用\\nApex猎杀无需预约",
      "payValue":1000,
      "actualValue":999900,
      "type":1,
      "stock":100,
      "beginTime":"2022-01-01T00:00:00",
      "endTime":"2022-12-31T23:59:59"
  }
  ```
  
- 添加成功后，数据库中和Redis中都能看到优惠券信息

- 步骤二：编写Lua脚本
  
  lua的字符串拼接使用`..`，字符串转数字是`tonumber()`

  ```lua
  -- 订单id
  local voucherId = ARGV[1]
  -- 用户id
  local userId = ARGV[2]
  -- 优惠券key
  local stockKey = 'seckill:stock:' .. voucherId
  -- 订单key
  local orderKey = 'seckill:order:' .. voucherId
  -- 判断库存是否充足
  if (tonumber(redis.call('get', stockKey)) <= 0) then
      return 1
  end
  -- 判断用户是否下单
  if (redis.call('sismember', orderKey, userId) == 1) then
      return 2
  end
  -- 扣减库存
  redis.call('incrby', stockKey, -1)
  -- 将userId存入当前优惠券的set集合
  redis.call('sadd', orderKey, userId)
  return 0
  ```
  
- 修改业务逻辑

  ```java
  @Override
  public Result seckillVoucher(Long voucherId) {
      //1. 执行lua脚本
      Long result = stringRedisTemplate.execute(SECKILL_SCRIPT,
              Collections.emptyList(), voucherId.toString(),
              UserHolder.getUser().getId().toString());
      //2. 判断返回值，并返回错误信息
      if (result.intValue() != 0) {
          return Result.fail(result.intValue() == 1 ? "库存不足" : "不能重复下单");
      }
      long orderId = redisIdWorker.nextId("order");
      //TODO 保存阻塞队列
  
      //3. 返回订单id
      return Result.ok(orderId);
  }
  ```
  
- 现在我们是用PostMan发送请求，redis中的数据会变动，而且不能重复下单，但是数据库中的数据并没有变化

## 基于阻塞队列实现秒杀优化

- 修改下单的操作，我们在下单时，是通过Lua表达式去原子执行判断逻辑，如果判断结果不为0，返回错误信息，如果判断结果为0，则将下单的逻辑保存到队列中去，然后异步执行

- 需求

  1. 如果秒杀成功，则将优惠券id和用户id封装后存入阻塞队列
  2. 开启线程任务，不断从阻塞队列中获取信息，实现异步下单功能

- 步骤一：
  
  创建阻塞队列

  阻塞队列有一个特点：当一个线程尝试从阻塞队列里获取元素的时候，如果没有元素，那么该线程就会被阻塞，直到队列中有元素，才会被唤醒，并去获取元素

  阻塞队列的创建需要指定一个大小

  ```java
  private final BlockingQueue<VoucherOrder> orderTasks = new ArrayBlockingQueue<>(1024 * 1024);
  ```
  
- 那么把优惠券id和用户id封装后存入阻塞队列

  ```java
  @Override
  public Result seckillVoucher(Long voucherId) {
      Long result = stringRedisTemplate.execute(SECKILL_SCRIPT,
              Collections.emptyList(), voucherId.toString(),
              UserHolder.getUser().getId().toString());
      if (result.intValue() != 0) {
          return Result.fail(result.intValue() == 1 ? "库存不足" : "不能重复下单");
      }
      long orderId = redisIdWorker.nextId("order");
      //封装到voucherOrder中
      VoucherOrder voucherOrder = new VoucherOrder();
      voucherOrder.setVoucherId(voucherId);
      voucherOrder.setUserId(UserHolder.getUser().getId());
      voucherOrder.setId(orderId);
      //加入到阻塞队列
      orderTasks.add(voucherOrder);
      return Result.ok(orderId);
  }
  ```
  
- 步骤二：实现异步下单功能
  
  1. 先创建一个线程池

     ```java
     private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();
     ```
     
  2. 创建线程任务，秒杀业务需要在类初始化之后，就立即执行，所以这里需要用到
  
     ```
     @PostConstruct
     ```
  
     注解
  
     ```java
     @PostConstruct
     private void init() {
         SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());
     }
     
     private class VoucherOrderHandler implements Runnable {
         @Override
         public void run() {
             while (true) {
                 try {
                     //1. 获取队列中的订单信息
                     VoucherOrder voucherOrder = orderTasks.take();
                     //2. 创建订单
                     handleVoucherOrder(voucherOrder);
                 } catch (Exception e) {
                     log.error("订单处理异常", e);
                 }
             }
         }
     }
     ```
     
  3. 编写创建订单的业务逻辑
  
     ```java
     private IVoucherOrderService proxy;
     private void handleVoucherOrder(VoucherOrder voucherOrder) {
         //1. 获取用户
         Long userId = voucherOrder.getUserId();
         //2. 创建锁对象，作为兜底方案
         RLock redisLock = redissonClient.getLock("order:" + userId);
         //3. 获取锁
         boolean isLock = redisLock.tryLock();
         //4. 判断是否获取锁成功(理论上必成功，redis已经帮我们判断了)
         if (!isLock) {
             log.error("不允许重复下单!");
             return;
         }
         try {
             //5. 使用代理对象，由于这里是另外一个线程，
             proxy.createVoucherOrder(voucherOrder);
         } finally {
             redisLock.unlock();
         }
     }
     ```
  
  - 查看AopContext源码，它的获取代理对象也是通过ThreadLocal进行获取的，由于我们这里是异步下单，和主线程不是一个线程，所以不能获取成功
  
    ```java
    private static final ThreadLocal<Object> currentProxy = new NamedThreadLocal("Current AOP proxy");
    ```
    
  - 但是我们可以将proxy放在成员变量的位置，然后在主线程中获取代理对象
  
    ```java
    @Override
    public Result seckillVoucher(Long voucherId) {
        Long result = stringRedisTemplate.execute(SECKILL_SCRIPT,
                Collections.emptyList(), voucherId.toString(),
                UserHolder.getUser().getId().toString());
        if (result.intValue() != 0) {
            return Result.fail(result.intValue() == 1 ? "库存不足" : "不能重复下单");
        }
        long orderId = redisIdWorker.nextId("order");
        //封装到voucherOrder中
        VoucherOrder voucherOrder = new VoucherOrder();
        voucherOrder.setVoucherId(voucherId);
        voucherOrder.setUserId(UserHolder.getUser().getId());
        voucherOrder.setId(orderId);
        //加入到阻塞队列
        orderTasks.add(voucherOrder);
        //主线程获取代理对象
        proxy = (IVoucherOrderService) AopContext.currentProxy();
        return Result.ok(orderId);
    }
    ```
  
- 完整代码如下

  ```java
  package com.hmdp.service.impl;
  
  import com.hmdp.dto.Result;
  import com.hmdp.entity.VoucherOrder;
  import com.hmdp.mapper.VoucherOrderMapper;
  import com.hmdp.service.ISeckillVoucherService;
  import com.hmdp.service.IVoucherOrderService;
  import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
  import com.hmdp.utils.RedisIdWorker;
  import com.hmdp.utils.UserHolder;
  import lombok.extern.slf4j.Slf4j;
  import org.redisson.api.RLock;
  import org.redisson.api.RedissonClient;
  import org.springframework.aop.framework.AopContext;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.core.io.ClassPathResource;
  import org.springframework.data.redis.core.StringRedisTemplate;
  import org.springframework.data.redis.core.script.DefaultRedisScript;
  import org.springframework.stereotype.Service;
  import org.springframework.transaction.annotation.Transactional;
  
  import javax.annotation.PostConstruct;
  import javax.annotation.Resource;
  import java.util.Collections;
  import java.util.concurrent.ArrayBlockingQueue;
  import java.util.concurrent.BlockingQueue;
  import java.util.concurrent.ExecutorService;
  import java.util.concurrent.Executors;
  
  /**
   * <p>
   * 服务实现类
   * </p>
   *
   * @author Kyle
   * @since 2022-10-22
   */
  @Service
  @Slf4j
  public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, VoucherOrder> implements IVoucherOrderService {
  
      @Autowired
      private ISeckillVoucherService seckillVoucherService;
  
      @Autowired
      private RedisIdWorker redisIdWorker;
  
      @Resource
      private StringRedisTemplate stringRedisTemplate;
  
      @Resource
      private RedissonClient redissonClient;
  
      private IVoucherOrderService proxy;
  
  
      private static final DefaultRedisScript<Long> SECKILL_SCRIPT;
  
      static {
          SECKILL_SCRIPT = new DefaultRedisScript();
          SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));
          SECKILL_SCRIPT.setResultType(Long.class);
      }
  
      private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();
  
      @PostConstruct
      private void init() {
          SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());
      }
  
      private final BlockingQueue<VoucherOrder> orderTasks = new ArrayBlockingQueue<>(1024 * 1024);
  
      private void handleVoucherOrder(VoucherOrder voucherOrder) {
          //1. 获取用户
          Long userId = voucherOrder.getUserId();
          //2. 创建锁对象，作为兜底方案
          RLock redisLock = redissonClient.getLock("order:" + userId);
          //3. 获取锁
          boolean isLock = redisLock.tryLock();
          //4. 判断是否获取锁成功(理论上必成功，redis已经帮我们判断了)
          if (!isLock) {
              log.error("不允许重复下单!");
              return;
          }
          try {
              //5. 使用代理对象，由于这里是另外一个线程，
              proxy.createVoucherOrder(voucherOrder);
          } finally {
              redisLock.unlock();
          }
      }
  
      private class VoucherOrderHandler implements Runnable {
          @Override
          public void run() {
              while (true) {
                  try {
                      //1. 获取队列中的订单信息
                      VoucherOrder voucherOrder = orderTasks.take();
                      //2. 创建订单
                      handleVoucherOrder(voucherOrder);
                  } catch (Exception e) {
                      log.error("订单处理异常", e);
                  }
              }
          }
      }
  
      @Override
      public Result seckillVoucher(Long voucherId) {
          Long result = stringRedisTemplate.execute(SECKILL_SCRIPT,
                  Collections.emptyList(), voucherId.toString(),
                  UserHolder.getUser().getId().toString());
          if (result.intValue() != 0) {
              return Result.fail(result.intValue() == 1 ? "库存不足" : "不能重复下单");
          }
          long orderId = redisIdWorker.nextId("order");
          //封装到voucherOrder中
          VoucherOrder voucherOrder = new VoucherOrder();
          voucherOrder.setVoucherId(voucherId);
          voucherOrder.setUserId(UserHolder.getUser().getId());
          voucherOrder.setId(orderId);
          //加入到阻塞队列
          orderTasks.add(voucherOrder);
          //主线程获取代理对象
          proxy = (IVoucherOrderService) AopContext.currentProxy();
          return Result.ok(orderId);
      }
  
  
      @Transactional
      public void createVoucherOrder(VoucherOrder voucherOrder) {
          // 一人一单逻辑
          Long userId = voucherOrder.getUserId();
          Long voucherId = voucherOrder.getVoucherId();
          synchronized (userId.toString().intern()) {
              int count = query().eq("voucher_id", voucherId).eq("user_id", userId).count();
              if (count > 0) {
                  log.error("你已经抢过优惠券了哦");
                  return;
              }
              //5. 扣减库存
              boolean success = seckillVoucherService.update()
                      .setSql("stock = stock - 1")
                      .eq("voucher_id", voucherId)
                      .gt("stock", 0)
                      .update();
              if (!success) {
                  log.error("库存不足");
              }
              //7. 将订单数据保存到表中
              save(voucherOrder);
          }
      }
  }
  ```

## 小结

- 秒杀业务的优化思路是什么？
  1. 先利用Redis完成库存容量、一人一单的判断，完成抢单业务
  2. 再将下单业务放入阻塞队列，利用独立线程异步下单
- 基于阻塞队列的异步秒杀存在哪些问题？
  1. 内存限制问题：
     - 我们现在使用的是JDK里的阻塞队列，它使用的是JVM的内存，如果在高并发的条件下，无数的订单都会放在阻塞队列里，可能就会造成内存溢出，所以我们在创建阻塞队列时，设置了一个长度，但是如果真的存满了，再有新的订单来往里塞，那就塞不进去了，存在内存限制问题
  2. 数据安全问题：
     - 经典服务器宕机了，用户明明下单了，但是数据库里没看到

# Redis消息队列

## 认识消息队列

- 什么是消息队列？字面意思就是存放消息的队列，最简单的消息队列模型包括3个角色
  1. 消息队列：存储和管理消息，也被称为消息代理（Message Broker）
  2. 生产者：发送消息到消息队列
  3. 消费者：从消息队列获取消息并处理消息
- 使用队列的好处在于`解耦`：举个例子，快递员(生产者)吧快递放到驿站/快递柜里去(Message Queue)去，我们(消费者)从快递柜/驿站去拿快递，这就是一个异步，如果耦合，那么快递员必须亲自上楼把快递递到你手里，服务当然好，但是万一我不在家，快递员就得一直等我，浪费了快递员的时间。所以解耦还是非常有必要的
- 那么在这种场景下我们的秒杀就变成了：在我们下单之后，利用Redis去进行校验下单的结果，然后在通过队列把消息发送出去，然后在启动一个线程去拿到这个消息，完成解耦，同时也加快我们的响应速度
- 这里我们可以直接使用一些现成的(MQ)消息队列，如kafka，rabbitmq等，但是如果没有安装MQ，我们也可以使用Redis提供的MQ方案(学完Redis我就去学微服务)

## 基于List实现消息队列

- 基于List结构模拟消息队列
- 消息队列(Message Queue)，字面意思就是存放消息的队列，而Redis的list数据结构是一个双向链表，很容易模拟出队列的效果
- 队列的入口和出口不在同一边，所以我们可以利用：LPUSH结合RPOP或者RPUSH结合LPOP来实现消息队列。
- 不过需要注意的是，当队列中没有消息时，RPOP和LPOP操作会返回NULL，而不像JVM阻塞队列那样会阻塞，并等待消息，所以我们这里应该使用BRPOP或者BLPOP来实现阻塞效果
- 基于List的消息队列有哪些优缺点？
  - 优点
    1. 利用Redis存储，不受限于JVM内存上限
    2. 基于Redis的持久化机制，数据安全性有保障
    3. 可以满足消息有序性
  - 缺点
    1. 无法避免消息丢失(经典服务器宕机)
    2. 只支持单消费者(一个消费者把消息拿走了，其他消费者就看不到这条消息了)

## 基于PubSub的消息队列

- PubSub(发布订阅)是Redis2.0版本引入的消息传递模型。顾名思义，消费和可以订阅一个或多个channel，生产者向对应channel发送消息后，所有订阅者都能收到相关消息

- `SUBSCRIBE channel [channel]`：订阅一个或多个频道

- `PUBLISH channel msg`：向一个频道发送消息

- `PSUBSCRIBE pattern [pattern]`：订阅与pattern格式匹配的所有频道

  Subscribes the client to the given patterns.
  Supported glob-style patterns:

  - h?flo subscribes to hello, hallo and hxllo
  - h*llo subscribes to hllo and heeeello
  - h[ae]llo subscribes to hello and hallo, but not hillo

  Use \ to escape special characters if you want to match them verbatim.

- 基于PubSub的消息队列有哪些优缺点

  - 优点：
    1. 采用发布订阅模型，支持多生产，多消费
  - 缺点：
    1. 不支持数据持久化
    2. 无法避免消息丢失（如果向频道发送了消息，却没有人订阅该频道，那发送的这条消息就丢失了）
    3. 消息堆积有上限，超出时数据丢失（消费者拿到数据的时候处理的太慢，而发送消息发的太快）

## 基于Stream的消息队列

- Stream是Redis 5.0引入的一种新数据类型，可以时间一个功能非常完善的消息队列

- 发送消息的命令

  ```bash
  XADD key [NOMKSTREAM] [MAXLEN|MINID [=!~] threshold [LIMIT count]] *|ID field value [field value ...]
  ```
  
  - NOMKSTREAM
    - 如果队列不存在，是否自动创建队列，默认是自动创建
  - [MAXLEN|MINID [=!~] threshold [LIMIT count]]
    - 设置消息队列的最大消息数量，不设置则无上限
  - *|ID
    - 消息的唯一id，*代表由Redis自动生成。格式是”时间戳-递增数字”，例如”114514114514-0”
  - field value [field value …]
    - 发送到队列中的消息，称为Entry。格式就是多个key-value键值对
  
- 举例

  ```bash
  # 创建名为users的队列，并向其中发送一个消息，内容是{name=jack, age=21}，并且使用Redis自动生成ID
  XADD users * name jack age 21
  ```
  
- 读取消息的方式之一：XREAD

  ```bash
  XREAD [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] ID [ID ...]
  ```
  
  - [COUNT count]
    - 每次读取消息的最大数量
  - [BLOCK milliseconds]
    - 当没有消息时，是否阻塞，阻塞时长
  - STREAMS key [key …]
    - 要从哪个队列读取消息，key就是队列名
  - ID [ID …]
    - 起始ID，只返回大于该ID的消息
      - 0：表示从第一个消息开始
      - $：表示从最新的消息开始
  
- 例如：使用XREAD读取第一个消息

  ```bash
  云服务器:0>XREAD COUNT 1 STREAMS users 0
  1) 1) "users"
     2) 1) 1) "1667119621804-0"
           2) 1) "name"
              2) "jack"
              3) "age"
              4) "21"
  ```
  
- 例如：XREAD阻塞方式，读取最新消息

  ```bash
  XREAD COUNT 2 BLOCK 10000 STREAMS users $
  ```
  
- 在业务开发中，我们可以使用循环调用的XREAD阻塞方式来查询最新消息，从而实现持续监听队列的效果，伪代码如下

  ```java
  while (true){
      //尝试读取队列中的消息，最多阻塞2秒
      Object msg = redis.execute("XREAD COUNT 1 BLOCK 2000 STREAMS users $");
      //没读取到，跳过下面的逻辑
      if(msg == null){
          continue;
      }
      //处理消息
      handleMessage(msg);
  }
  ```
  
  注意：当我们指定其实ID为$时，代表只能读取到最新消息，如果当我们在处理一条消息的过程中，又有超过1条以上的消息到达队列，那么下次获取的时候，也只能获取到最新的一条，会出现`漏读消息`的问题
  
- STREAM类型消息队列的XREAD命令特点

  1. 消息可回溯
  2. 一个消息可以被多个消费者读取
  3. 可以阻塞读取
  4. 有漏读消息的风险

## 基于Stream的消息队列—消费者组

- 消费者组(Consumer Group)：将多个消费者划分到一个组中，监听同一个队列，具备以下特点

  1. 消息分流
     - 队列中的消息会分留给组内的不同消费者，而不是重复消费者，从而加快消息处理的速度
  2. 消息标识
     - 消费者会维护一个标识，记录最后一个被处理的消息，哪怕消费者宕机重启，还会从标识之后读取消息，确保每一个消息都会被消费
  3. 消息确认
     - 消费者获取消息后，消息处于pending状态，并存入一个pending-list，当处理完成后，需要通过XACK来确认消息，标记消息为已处理，才会从pending-list中移除

- 创建消费者组

  ```bash
  XGROUP CREATE key groupName ID [MKSTREAM]
  ```
  
  - key
    - 队列名称
  - groupName
    - 消费者组名称
  - ID
    - 起始ID标识，$代表队列中的最后一个消息，0代表队列中的第一个消息
  - MKSTREAM
    - 队列不存在时自动创建队列
  
- 其他常见命令

  - 删除指定的消费者组

    ```bash
    XGROUP DESTORY key groupName
    ```
    
  - 给指定的消费者组添加消费者
  
    ```bash
    XGROUP CREATECONSUMER key groupName consumerName
    ```
    
  - 删除消费者组中指定的消费者

    ```bash
    XGROUP DELCONSUMER key groupName consumerName
    ```
  
- 从消费者组中读取消息

  ```bash
  XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [keys ...] ID [ID ...]
  ```
  
  - group
    - 消费者组名称
  - consumer
    - 消费者名，如果消费者不存在，会自动创建一个消费者
  - count
    - 本次查询的最大数量
  - BLOCK milliseconds
    - 当前没有消息时的最大等待时间
  - NOACK
    - 无需手动ACK，获取到消息后自动确认（一般不用，我们都是手动确认）
  - STREAMS key
    - 指定队列名称
  - ID
    - 获取消息的起始ID
      - `>`：从下一个未消费的消息开始(pending-list中)
      - 其他：根据指定id从pending-list中获取已消费但未确认的消息，例如0，是从pending-list中的第一个消息开始
  
- 消费者监听消息的基本思路

  ```java
  while(true){
      // 尝试监听队列，使用阻塞模式，最大等待时长为2000ms
      Object msg = redis.call("XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 >")
      if(msg == null){
          // 没监听到消息，重试
          continue;
      }
      try{
          //处理消息，完成后要手动确认ACK，ACK代码在handleMessage中编写
          handleMessage(msg);
      } catch(Exception e){
          while(true){
              //0表示从pending-list中的第一个消息开始，如果前面都ACK了，那么这里就不会监听到消息
              Object msg = redis.call("XREADGROUP GROUP g1 c1 COUNT 1 STREAMS s1 0");
              if(msg == null){
                  //null表示没有异常消息，所有消息均已确认，结束循环
                  break;
              }
              try{
                  //说明有异常消息，再次处理
                  handleMessage(msg);
              } catch(Exception e){
                  //再次出现异常，记录日志，继续循环
                  log.error("..");
                  continue;
              }
          }
      }
  }
  ```
  
- STREAM类型消息队列的XREADGROUP命令的特点

  1. 消息可回溯
  2. 可以多消费者争抢消息，加快消费速度
  3. 可以阻塞读取
  4. 没有消息漏读风险
  5. 有消息确认机制，保证消息至少被消费一次

|              |                   List                    |       PubSub       |                         Stream                          |
| :----------: | :---------------------------------------: | :----------------: | :-----------------------------------------------------: |
|  消息持久化  |                   支持                    |       不支持       |                          支持                           |
|   阻塞读取   |                   支持                    |        支持        |                          支持                           |
| 消息堆积处理 | 受限于内存空间， 可以利用多消费者加快处理 | 受限于消费者缓冲区 | 受限于队列长度， 可以利用消费者组提高消费速度，减少堆积 |
| 消息确认机制 |                  不支持                   |       不支持       |                          支持                           |
|   消息回溯   |                  不支持                   |       不支持       |                          支持                           |

## Stream消息队列实现异步秒杀下单

- 需求：

  1. 创建一个Stream类型的消息队列，名为stream.orders
  2. 修改之前的秒杀下单Lua脚本，在认定有抢购资格后，直接向stream.orders中添加消息，内容包含voucherId、userId、orderId
  3. 项目启动时，开启一个线程任务，尝试获取stream.orders中的消息，完成下单

- 步骤一：创建一个Stream类型的消息队列，名为stream.orders
  
  ```bash
  XGROUP CREATE stream.orders g1 0 MKSTREAM
  ```

- 步骤二：修改Lua脚本，新增orderId参数，并将订单信息加入到消息队列中
  
  ```lua
  -- 订单id
  local voucherId = ARGV[1]
  -- 用户id
  local userId = ARGV[2]
  -- 新增orderId，但是变量名用id就好，因为VoucherOrder实体类中的orderId就是用id表示的
  local id = ARGV[3]
  -- 优惠券key
  local stockKey = 'seckill:stock:' .. voucherId
  -- 订单key
  local orderKey = 'seckill:order:' .. voucherId
  -- 判断库存是否充足
  if (tonumber(redis.call('get', stockKey)) <= 0) then
      return 1
  end
  -- 判断用户是否下单
  if (redis.call('sismember', orderKey, userId) == 1) then
      return 2
  end
  -- 扣减库存
  redis.call('incrby', stockKey, -1)
  -- 将userId存入当前优惠券的set集合
  redis.call('sadd', orderKey, userId)
  -- 将下单数据保存到消息队列中
  redis.call("sadd", 'stream.orders', '*', 'userId', userId, 'voucherId', voucherId, 'id', id)
  return 0
  ```
  
- 步骤三：修改秒杀逻辑
  
  - DIFF
  - 修改后代码
  
  由于将下单数据加入到消息队列的功能，我们在Lua脚本中实现了，所以这里就不需要将下单数据加入到JVM的阻塞队列中去了，同时Lua脚本中我们新增了一个参数，
  
  ```diff
      @Override
      public Result seckillVoucher(Long voucherId) {
  +       long orderId = redisIdWorker.nextId("order");
          Long result = stringRedisTemplate.execute(SECKILL_SCRIPT,
                  Collections.emptyList(), voucherId.toString(),
  +               UserHolder.getUser().getId().toString(), String.valueOf(orderId));
          if (result.intValue() != 0) {
              return Result.fail(result.intValue() == 1 ? "库存不足" : "不能重复下 单");
          }
  -       long orderId = redisIdWorker.nextId("order");
  -       //封装到voucherOrder中
  -       VoucherOrder voucherOrder = new VoucherOrder();
  -       voucherOrder.setVoucherId(voucherId);
  -       voucherOrder.setUserId(UserHolder.getUser().getId());
  -       voucherOrder.setId(orderId);
  -       //加入到阻塞队列
  -       orderTasks.add(voucherOrder);
          //主线程获取代理对象
          proxy = (IVoucherOrderService) AopContext.currentProxy();
          return Result.ok(orderId);
      }
  ```
  
- 根据伪代码来修改我们的

  ```
  VoucherOrderHandler
  ```

  - 伪代码
  - 修改后的业务逻辑

  ```java
  while(true){
      // 尝试监听队列，使用阻塞模式，最大等待时长为2000ms
      Object msg = redis.call("XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 >")
      if(msg == null){
          // 没监听到消息，重试
          continue;
      }
      try{
          //处理消息，完成后要手动确认ACK
          handleMessage(msg);
      } catch(Exception e){
          while(true){
              //0表示从pending-list中的第一个消息开始，如果前面都ACK了，那么这里就不会监听到消息
              Object msg = redis.call("XREADGROUP GROUP g1 c1 COUNT 1 STREAMS s1 0");
              if(msg == null){
                  //null表示没有异常消息，所有消息均已确认，结束循环
                  break;
              }
              try{
                  //说明有异常消息，再次处理
                  handleMessage(msg);
              } catch(Exception e){
                  //再次出现异常，记录日志，继续循环
                  log.error("..");
                  continue;
              }
          }
      }
  }
  ```
  

# 达人探店

## 发布探店笔记

这部分代码已经提供好了，我们来看看对应的数据表

- tb_blog
- tb_blog_comments

探店店笔记表，包含笔记中的标题、文字、图片等

|    Field    |      Type       |     Collation      | Null | Key  |      Default      |                     Extra                     |              Comment               |
| :---------: | :-------------: | :----------------: | :--: | :--: | :---------------: | :-------------------------------------------: | :--------------------------------: |
|     id      | bigint unsigned |       (NULL)       |  NO  | PRI  |      (NULL)       |                auto_increment                 |                主键                |
|   shop_id   |     bigint      |       (NULL)       |  NO  |      |      (NULL)       |                                               |               商户id               |
|   user_id   | bigint unsigned |       (NULL)       |  NO  |      |      (NULL)       |                                               |               用户id               |
|    title    |  varchar(255)   | utf8mb4_unicode_ci |  NO  |      |      (NULL)       |                                               |                标题                |
|   images    |  varchar(2048)  | utf8mb4_general_ci |  NO  |      |      (NULL)       |                                               | 探店的照片，最多9张，多张以”,”隔开 |
|   content   |  varchar(2048)  | utf8mb4_unicode_ci |  NO  |      |      (NULL)       |                                               |           探店的文字描述           |
|    liked    |  int unsigned   |       (NULL)       | YES  |      |         0         |                                               |              点赞数量              |
|  comments   |  int unsigned   |       (NULL)       | YES  |      |      (NULL)       |                                               |              评论数量              |
| create_time |    timestamp    |       (NULL)       |  NO  |      | CURRENT_TIMESTAMP |               DEFAULT_GENERATED               |              创建时间              |
| update_time |    timestamp    |       (NULL)       |  NO  |      | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |              更新时间              |

- 对应的实体类，数据表中并没有用户头像和用户昵称，但是对应的实体类里却有，这是因为使用了

  ```
  @TableField(exist = false)
  ```

   用来解决实体类中有的属性但是数据表中没有的字段

  ```java
  @Data
  @EqualsAndHashCode(callSuper = false)
  @Accessors(chain = true)
  @TableName("tb_blog")
  public class Blog implements Serializable {
  
      private static final long serialVersionUID = 1L;
  
      /**
       * 主键
       */
      @TableId(value = "id", type = IdType.AUTO)
      private Long id;
      /**
       * 商户id
       */
      private Long shopId;
      /**
       * 用户id
       */
      private Long userId;
      /**
       * 用户图标
       */
      @TableField(exist = false)
      private String icon;
      /**
       * 用户姓名
       */
      @TableField(exist = false)
      private String name;
      /**
       * 是否点赞过了
       */
      @TableField(exist = false)
      private Boolean isLike;
  
      /**
       * 标题
       */
      private String title;
  
      /**
       * 探店的照片，最多9张，多张以","隔开
       */
      private String images;
  
      /**
       * 探店的文字描述
       */
      private String content;
  
      /**
       * 点赞数量
       */
      private Integer liked;
  
      /**
       * 评论数量
       */
      private Integer comments;
  
      /**
       * 创建时间
       */
      private LocalDateTime createTime;
  
      /**
       * 更新时间
       */
      private LocalDateTime updateTime;
  }
  ```



- 效果图如下
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635f8f8216f2c2beb1692e5f.jpg)](https://pic1.imgdb.cn/item/635f8f8216f2c2beb1692e5f.jpg)

- 对应的代码

  ```java
  @PostMapping
  public Result saveBlog(@RequestBody Blog blog) {
      // 获取登录用户
      UserDTO user = UserHolder.getUser();
      blog.setUserId(user.getId());
      // 保存探店博文
      blogService.save(blog);
      // 返回id
      return Result.ok(blog.getId());
  }
  ```
  
- 上传图片的代码

  ```java
  @PostMapping("blog")
  public Result uploadImage(@RequestParam("file") MultipartFile image) {
      try {
          // 获取原始文件名称
          String originalFilename = image.getOriginalFilename();
          // 生成新文件名
          String fileName = createNewFileName(originalFilename);
          // 保存文件
          image.transferTo(new File(SystemConstants.IMAGE_UPLOAD_DIR, fileName));
          // 返回结果
          log.debug("文件上传成功，{}", fileName);
          return Result.ok(fileName);
      } catch (IOException e) {
          throw new RuntimeException("文件上传失败", e);
      }
  }
  ```
  

注意：这里我们需要修改`SystemConstants.IMAGE_UPLOAD_DIR` 为自己图片所在的地址，在实际开发中图片一般会放在nginx上或者是云存储上。

## 查看探店笔记

- 需求：点击首页的探店笔记，会进入详情页面，我们现在需要实现页面的查询接口
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/635f908616f2c2beb16ba05d.jpg)](https://pic1.imgdb.cn/item/635f908616f2c2beb16ba05d.jpg)

- 随便点击一张图片，查看发送的请求

  > 请求网址: http://localhost:8080/api/blog/6
  > 请求方法: GET

- 看样子是`BlogController`下的方法，请求方式为GET，那我们直接来编写对应的方法

  - Controller层
  - ServiceImpl

  业务逻辑我们要写在Service层，Controller层只调用

  ```java
  @GetMapping("/{id}")
  public Result queryById(@PathVariable Integer id){
      return blogService.queryById(id);
  }
  ```
  
- 我们顺手将`queryHotBlog`也修改一下，原始代码将业务逻辑写到了Controller中，修改后的完整代码如下

  - BlogController
  - BlogServiceImpl

  ```java
  @RestController
  @RequestMapping("/blog")
  public class BlogController {
  
      @Resource
      private IBlogService blogService;
  
      @PostMapping
      public Result saveBlog(@RequestBody Blog blog) {
          // 获取登录用户
          UserDTO user = UserHolder.getUser();
          blog.setUserId(user.getId());
          // 保存探店博文
          blogService.save(blog);
          // 返回id
          return Result.ok(blog.getId());
      }
  
      @PutMapping("/like/{id}")
      public Result likeBlog(@PathVariable("id") Long id) {
          // 修改点赞数量
          blogService.update()
                  .setSql("liked = liked + 1").eq("id", id).update();
          return Result.ok();
      }
  
      @GetMapping("/of/me")
      public Result queryMyBlog(@RequestParam(value = "current", defaultValue = "1") Integer current) {
          // 获取登录用户
          UserDTO user = UserHolder.getUser();
          // 根据用户查询
          Page<Blog> page = blogService.query()
                  .eq("user_id", user.getId()).page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
          // 获取当前页数据
          List<Blog> records = page.getRecords();
          return Result.ok(records);
      }
  
      @GetMapping("/hot")
      public Result queryHotBlog(@RequestParam(value = "current", defaultValue = "1") Integer current) {
          return blogService.queryHotBlog(current);
      }
  
      @GetMapping("/{id}")
      public Result queryById(@PathVariable Integer id){
          return blogService.queryById(id);
      }
  }
  ```
  


## 点赞功能

- 点击点赞按钮，查看发送的请求

  > 请求网址: http://localhost:8080/api/blog/like/4
  > 请求方法: PUT

- 看样子是BlogController中的like方法，源码如下

  ```java
  @PutMapping("/like/{id}")
  public Result likeBlog(@PathVariable("id") Long id) {
      // 修改点赞数量
      blogService.update().setSql("liked = liked + 1").eq("id", id).update();
      return Result.ok();
  }
  ```
  
- 问题分析：这种方式会导致一个用户无限点赞，明显是不合理的

- 造成这个问题的原因是，我们现在的逻辑，发起请求只是给数据库+1，所以才会出现这个问题

- 需求

  1. 同一个用户只能对同一篇笔记点赞一次，再次点击则取消点赞
  2. 如果当前用户已经点赞，则点赞按钮高亮显示（前端已实现，判断字段Blog类的isLike属性）

- 实现步骤

  1. 修改点赞功能，利用Redis中的set集合来判断是否点赞过，未点赞则点赞数`+1`，已点赞则点赞数`-1`
  2. 修改根据id查询的业务，判断当前登录用户是否点赞过，赋值给isLike字段
  3. 修改分页查询Blog业务，判断当前登录用户是否点赞过，赋值给isLike字段

- 具体实现

  - Controller层
  - BlogServiceImpl

  业务逻辑卸载Service层

  ```java
  @PutMapping("/like/{id}")
  public Result likeBlog(@PathVariable("id") Long id) {
      return blogService.likeBlog(id);
  }
  ```
  
  
  
  
  
- 修改完毕之后，页面上还不能立即显示点赞完毕的后果，我们还需要修改查询Blog业务，判断Blog是否被当前用户点赞过

  ```java
  @Override
  public Result queryHotBlog(Integer current) {
      // 根据用户查询
      Page<Blog> page = query()
              .orderByDesc("liked")
              .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
      // 获取当前页数据
      List<Blog> records = page.getRecords();
      // 查询用户
      records.forEach(blog -> {
          queryBlogUser(blog);
          //追加判断blog是否被当前用户点赞，逻辑封装到isBlogLiked方法中
          isBlogLiked(blog);
      });
      return Result.ok(records);
  }
  
  @Override
  public Result queryById(Integer id) {
      Blog blog = getById(id);
      if (blog == null) {
          return Result.fail("评价不存在或已被删除");
      }
      queryBlogUser(blog);
      //追加判断blog是否被当前用户点赞，逻辑封装到isBlogLiked方法中
      isBlogLiked(blog);
      return Result.ok(blog);
  }
  
  private void isBlogLiked(Blog blog) {
      //1. 获取当前用户信息
      Long userId = UserHolder.getUser().getId();
      //2. 判断当前用户是否点赞
      String key = BLOG_LIKED_KEY + blog.getId();
      Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, userId.toString());
      //3. 如果点赞了，则将isLike设置为true
      blog.setIsLike(BooleanUtil.isTrue(isMember));
  }
  ```

## 点赞排行榜

- 当我们点击探店笔记详情页面时，应该按点赞顺序展示点赞用户，比如显示最早点赞的TOP5，形成点赞排行榜，就跟QQ空间发的说说一样，可以看到有哪些人点了赞
- 之前的点赞是放到Set集合中，但是Set集合又不能排序，所以这个时候，我们就可以改用SortedSet(Zset)
- 那我们这里顺便就来对比一下这些集合的区别

|          |         List         |     Set      |    SortedSet    |
| :------: | :------------------: | :----------: | :-------------: |
| 排序方式 |    按添加顺序排序    |   无法排序   | 根据score值排序 |
|  唯一性  |        不唯一        |     唯一     |      唯一       |
| 查找方式 | 按索引查找或首尾查找 | 根据元素查找 |  根据元素查找   |

- 修改BlogServiceImpl

  由于ZSet没有isMember方法，所以这里只能通过查询score来判断集合中是否有该元素，如果有该元素，则返回值是对应的score，如果没有该元素，则返回值为null

  ```java
  @Override
  public Result likeBlog(Long id) {
      //1. 获取当前用户信息
      Long userId = UserHolder.getUser().getId();
      //2. 如果当前用户未点赞，则点赞数 +1，同时将用户加入set集合
      String key = BLOG_LIKED_KEY + id;
      //尝试获取score
      Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());
      //为null，则表示集合中没有该用户
      if (score == null) {
          //点赞数 +1
          boolean success = update().setSql("liked = liked + 1").eq("id", id).update();
          //将用户加入set集合
          if (success) {
              stringRedisTemplate.opsForZSet().add(key, userId.toString(), System.currentTimeMillis());
          }
          //3. 如果当前用户已点赞，则取消点赞，将用户从set集合中移除
      } else {
          //点赞数 -1
          boolean success = update().setSql("liked = liked - 1").eq("id", id).update();
          if (success) {
              //从set集合移除
              stringRedisTemplate.opsForZSet().remove(key, userId.toString());
          }
      }
      return Result.ok();
  }
  ```
  
- 同时修改isBlogLiked方法，在原有逻辑上，判断用户是否已登录，登录状态下才会继续判断用户是否点赞

  ```java
  private void isBlogLiked(Blog blog) {
      //1. 获取当前用户信息
      UserDTO userDTO = UserHolder.getUser();
      //当用户未登录时，就不判断了，直接return结束逻辑
      if (userDTO == null) {
          return;
      }
      //2. 判断当前用户是否点赞
      String key = BLOG_LIKED_KEY + blog.getId();
      Double score = stringRedisTemplate.opsForZSet().score(key, userDTO.getId().toString());
      blog.setIsLike(score != null);
  }
  ```
  
- 那我们继续来完善显示点赞列表功能，查看浏览器请求，这个请求目前应该是404的，因为我们还没有写，他需要一个list返回值，显示top5点赞的用户

  > 请求网址: http://localhost:8080/api/blog/likes/4
  > 请求方法: GET

- 在Controller层中编写对应的方法，点赞查询列表，具体逻辑写到BlogServiceImpl中

  ```java
  @GetMapping("/likes/{id}")
  public Result queryBlogLikes(@PathVariable Integer id){
      return blogService.queryBlogLikes(id);
  }
  ```
  
- 具体逻辑如下

  ```java
  @Override
  public Result queryBlogLikes(Integer id) {
      String key = BLOG_LIKED_KEY + id;
      //zrange key 0 4  查询zset中前5个元素
      Set<String> top5 = stringRedisTemplate.opsForZSet().range(key, 0, 4);
      //如果是空的(可能没人点赞)，直接返回一个空集合
      if (top5 == null || top5.isEmpty()) {
          return Result.ok(Collections.emptyList());
      }
      List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());
      //将ids使用`,`拼接，SQL语句查询出来的结果并不是按照我们期望的方式进行排
      //所以我们需要用order by field来指定排序方式，期望的排序方式就是按照查询出来的id进行排序
      String idsStr = StrUtil.join(",", ids);
      //select * from tb_user where id in (ids[0], ids[1] ...) order by field(id, ids[0], ids[1] ...)
      List<UserDTO> userDTOS = userService.query().in("id", ids)
              .last("order by field(id," + idsStr + ")")
              .list().stream()
              .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
              .collect(Collectors.toList());
      return Result.ok(userDTOS);
  }
  ```
  
- 重启服务器，查看效果
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/636328b216f2c2beb10e3c08.jpg)](https://pic1.imgdb.cn/item/636328b216f2c2beb10e3c08.jpg)

# 好友关注

## 关注和取消关注

- 当我们进入到笔记详情页面时，会发送一个请求，判断当前登录用户是否关注了笔记博主

  > 请求网址: http://localhost:8080/api/follow/or/not/2
  > 请求方法: GET

- 当我们点击关注按钮时，会发送一个请求，实现关注/取关

  > 请求网址: http://localhost:8080/api/follow/2/true
  > 请求方法: PUT

- 关注是User之间的关系，是博主与粉丝的关系，数据库中有一张tb_follow表来标示

|     Field      |      Type       | Collation | Null | Key  |      Default      |       Extra       |   Comment    |
| :------------: | :-------------: | :-------: | :--: | :--: | :---------------: | :---------------: | :----------: |
|       id       |     bigint      |  (NULL)   |  NO  | PRI  |      (NULL)       |  auto_increment   |     主键     |
|    user_id     | bigint unsigned |  (NULL)   |  NO  |      |      (NULL)       |                   |    用户id    |
| follow_user_id | bigint unsigned |  (NULL)   |  NO  |      |      (NULL)       |                   | 关联的用户id |
|  create_time   |    timestamp    |  (NULL)   |  NO  |      | CURRENT_TIMESTAMP | DEFAULT_GENERATED |   创建时间   |

- 对应的实体类如下

  ```java
  @Data
  @EqualsAndHashCode(callSuper = false)
  @Accessors(chain = true)
  @TableName("tb_follow")
  public class Follow implements Serializable {
  
      private static final long serialVersionUID = 1L;
  
      /**
       * 主键
       */
      @TableId(value = "id", type = IdType.AUTO)
      private Long id;
  
      /**
       * 用户id
       */
      private Long userId;
  
      /**
       * 关联的用户id
       */
      private Long followUserId;
  
      /**
       * 创建时间
       */
      private LocalDateTime createTime;
  }
  ```
  
- 那我们现在来Controller层中编写对应的两个方法

  ```java
  @RestController
  @RequestMapping("/follow")
  public class FollowController {
      @Resource
      private IFollowService followService;
      //判断当前用户是否关注了该博主
      @GetMapping("/or/not/{id}")
      public Result isFollow(@PathVariable("id") Long followUserId) {
          return followService.isFollow(followUserId);
      }
      //实现取关/关注
      @PutMapping("/{id}/{isFollow}")
      public Result follow(@PathVariable("id") Long followUserId, @PathVariable("isFollow") Boolean isFellow) {
          return followService.follow(followUserId,isFellow);
      }
  }
  ```
  
- 具体的业务逻辑我们还是放在FellowServiceImpl中来编写

  ```java
  @Service
  public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> implements IFollowService {
  
      @Override
      public Result isFollow(Long followUserId) {
          //获取当前登录的userId
          Long userId = UserHolder.getUser().getId();
          LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
          //查询当前用户是否关注了该笔记的博主
          queryWrapper.eq(Follow::getUserId, userId).eq(Follow::getFollowUserId, followUserId);
          //只查询一个count就行了
          int count = this.count(queryWrapper);
          return Result.ok(count > 0);
      }
  
      @Override
      public Result follow(Long followUserId, Boolean isFellow) {
          //获取当前用户id
          Long userId = UserHolder.getUser().getId();
          //判断是否关注
          if (isFellow) {
              //关注，则将信息保存到数据库
              Follow follow = new Follow();
              follow.setUserId(userId);
              follow.setFollowUserId(followUserId);
              save(follow);
          } else {
              //取关，则将数据从数据库中移除
              LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
              queryWrapper.eq(Follow::getUserId, userId).eq(Follow::getFollowUserId, followUserId);
              remove(queryWrapper);
          }
          return Result.ok();
      }
  }
  ```
  
- 测试效果如下
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/63633ca816f2c2beb12b772e.jpg)](https://pic1.imgdb.cn/item/63633ca816f2c2beb12b772e.jpg)

## 共同关注

- 点击用户头像，进入到用户详情页，可以查看用户发布的笔记，和共同关注列表
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/63635de616f2c2beb15b17cb.jpg)](https://pic1.imgdb.cn/item/63635de616f2c2beb15b17cb.jpg)

- 但现在我们还没写具体的业务逻辑，所以现在暂时看不到数据

- 检测NetWork选项卡，查看发送的请求

  - 查询用户信息

    > 请求网址: http://localhost:8080/api/user/2
    > 请求方法: GET

  - 查看共同关注

    > 请求网址: http://localhost:8080/api/follow/common/undefined
    > 请求方法: GET

- 编写`查询用户信息`方法

  ```java
  @GetMapping("/{id}")
  public Result queryById(@PathVariable("id") Long userId) {
      // 查询详情
      User user = userService.getById(userId);
      if (user == null) {
          // 没有详情，应该是第一次查看详情
          return Result.ok();
      }
      UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);
      // 返回
      return Result.ok(userDTO);
  }
  ```
  
- 重启服务器，现在可以看到用户信息，但是不能看到用户发布的笔记信息，查看NetWork检测的请求，我们还需要完成这个需求

  > 请求网址: http://localhost:8080/api/blog/of/user?&id=2&current=1
  > 请求方法: GET

- 编写`查询用户笔记`方法

  ```java
  @GetMapping("/of/user")
  public Result queryBlogByUserId(@RequestParam(value = "current", defaultValue = "1") Integer current, @RequestParam("id") Long id) {
  	LambdaQueryWrapper<Blog> queryWrapper = new LambdaQueryWrapper<>();
  	queryWrapper.eq(Blog::getUserId, id);
  	Page<Blog> pageInfo = new Page<>(current, SystemConstants.MAX_PAGE_SIZE);
  	blogService.page(pageInfo, queryWrapper);
  	List<Blog> records = pageInfo.getRecords();
  	return Result.ok(records);
  }
  
  //下面这是老师的代码，个人感觉我的可读性更高[doge]
  // BlogController  根据id查询博主的探店笔记
  @GetMapping("/of/user")
  public Result queryBlogByUserId(
  		@RequestParam(value = "current", defaultValue = "1") Integer current,
  		@RequestParam("id") Long id) {
  	// 根据用户查询
  	Page<Blog> page = blogService.query()
  			.eq("user_id", id).page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
  	// 获取当前页数据
  	List<Blog> records = page.getRecords();
  	return Result.ok(records);
  }
  ```
  
- 效果如下
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6363632816f2c2beb162b6de.jpg)](https://pic1.imgdb.cn/item/6363632816f2c2beb162b6de.jpg)

- 接下来我们来看看怎么实现共同关注

  需求：利用Redis中恰当的数据结构，实现共同关注功能，在博主个人页面展示出当前用户与博主的共同关注

- 实现方式当然是我们之前学过的set集合，在set集合中，有交集并集补集的api，可以把二者关注的人放入到set集合中，然后通过api查询两个set集合的交集

- 那我们就得先修改我们之前的关注逻辑，在关注博主的同时，需要将数据放到set集合中，方便后期我们实现共同关注，当取消关注时，也需要将数据从set集合中删除

  ```java
  @Resource
  private StringRedisTemplate stringRedisTemplate;
  
  @Override
  public Result follow(Long followUserId, Boolean isFellow) {
      //获取当前用户id
      Long userId = UserHolder.getUser().getId();
      String key = "follows:" + userId;
      //判断是否关注
      if (isFellow) {
          //关注，则将信息保存到数据库
          Follow follow = new Follow();
          follow.setUserId(userId);
          follow.setFollowUserId(followUserId);
          //如果保存成功
          boolean success = save(follow);
          //则将数据也写入Redis
          if (success) {
              stringRedisTemplate.opsForSet().add(key, followUserId.toString());
          }
      } else {
          //取关，则将数据从数据库中移除
          LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
          queryWrapper.eq(Follow::getUserId, userId).eq(Follow::getFollowUserId, followUserId);
          //如果取关成功
          boolean success = remove(queryWrapper);
          //则将数据也从Redis中移除
          if (success){
              stringRedisTemplate.opsForSet().remove(key,followUserId.toString());
          }
      }
      return Result.ok();
  }
  ```
  
- 那么接下来，我们实现共同关注代码

- Controller层
- Impl

业务逻辑写在Impl中

```java
@GetMapping("/common/{id}")
public Result followCommons(@PathVariable Long id){
    return followService.followCommons(id);
}
```





- 最终效果如下
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6363737716f2c2beb17fae7b.jpg)](https://pic1.imgdb.cn/item/6363737716f2c2beb17fae7b.jpg)

## Feed流实现方案

- 当我们关注了用户之后，这个用户发布了动态，那我们应该把这些数据推送给用户，这个需求，我们又称其为Feed流，关注推送也叫作Feed流，直译为投喂，为用户提供沉浸式体验，通过无限下拉刷新获取新的信息，

- 对于传统的模式内容检索：用户需要主动通过搜索引擎或者是其他方式去查找想看的内容

- 对于新型Feed流的效果：系统分析用户到底想看什么，然后直接把内容推送给用户，从而使用户能更加节约时间，不用去主动搜素

- Feed流的实现有两种模式

  1. Timeline：不做内容筛选，简单的按照内容发布时间排序，常用于好友或关注(B站关注的up，朋友圈等)
     - 优点：信息全面，不会有缺失，并且实现也相对简单
     - 缺点：信息噪音较多，用户不一定感兴趣，内容获取效率低
  2. 智能排序：利用智能算法屏蔽掉违规的、用户不感兴趣的内容，推送用户感兴趣的信息来吸引用户
     - 优点：投喂用户感兴趣的信息，用户粘度很高，容易沉迷
     - 缺点：如果算法不精准，可能会起到反作用（给你推的你都不爱看）

- 那我们这里针对好友的操作，采用的是Timeline方式，只需要拿到我们关注用户的信息，然后按照时间排序即可

- 采用Timeline模式，有三种具体的实现方案

  1. 拉模式
  2. 推模式
  3. 推拉结合

- 拉模式：也叫读扩散
  - 该模式的核心含义是：当张三和李四、王五发了消息之后，都会保存到自己的发件箱中，如果赵六要读取消息，那么他会读取他自己的收件箱，此时系统会从他关注的人群中，将他关注人的信息全都进行拉取，然后进行排序
  - 优点：比较节约空间，因为赵六在读取信息时，并没有重复读取，并且读取完之后，可以将他的收件箱清除
  - 缺点：有延迟，当用户读取数据时，才会去关注的人的时发件箱中拉取信息，假设该用户关注了海量用户，那么此时就会拉取很多信息，对服务器压力巨大
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/6363826516f2c2beb1992291.jpg)](https://pic1.imgdb.cn/item/6363826516f2c2beb1992291.jpg)

- 推模式：也叫写扩散
  - 推模式是没有写邮箱的，当张三写了一个内容，此时会主动把张三写的内容发送到它粉丝的收件箱中，假设此时李四再来读取，就不用再去临时拉取了
  - 优点：时效快，不用临时拉取
  - 缺点：内存压力大，假设一个大V发了一个动态，很多人关注他，那么就会写很多份数据到粉丝那边去
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/636383e816f2c2beb1a0ab75.jpg)](https://pic1.imgdb.cn/item/636383e816f2c2beb1a0ab75.jpg)

- 推拉结合：页脚读写混合，兼具推和拉两种模式的优点
  - 推拉模式是一个折中的方案，站在发件人这一边，如果是普通人，那么我们采用写扩散的方式，直接把数据写入到他的粉丝收件箱中，因为普通人的粉丝数量较少，所以这样不会产生太大压力。但如果是大V，那么他是直接将数据写入一份到发件箱中去，在直接写一份到活跃粉丝的收件箱中，站在收件人这边来看，如果是活跃粉丝，那么大V和普通人发的都会写到自己的收件箱里，但如果是普通粉丝，由于上线不是很频繁，所以等他们上线的时候，再从发件箱中去拉取信息。
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/6363841b16f2c2beb1a1e1e3.jpg)](https://pic1.imgdb.cn/item/6363841b16f2c2beb1a1e1e3.jpg)

## 推送到粉丝收件箱

- 需求：

  1. 修改新增探店笔记的业务，在保存blog到数据库的同时，推送到粉丝的收件箱
  2. 收件箱满足可以根据时间戳排序，必须使用Redis的数据结构实现
  3. 查询收件箱数据时，课实现分页查询

- Feed流中的数据会不断更新，所以数据的角标也会不断变化，所以我们不能使用传统的分页模式

- 假设在t1时刻，我们取读取第一页，此时page = 1，size = 5，那么我们拿到的就是`10~6`这几条记录，假设t2时刻有发布了一条新纪录，那么在t3时刻，我们来读取第二页，此时page = 2，size = 5，那么此时读取的数据是从6开始的，读到的是`6~2`，那么我们就读到了重复的数据，所以我们要使用Feed流的分页，不能使用传统的分页
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/63638cce16f2c2beb1b72c2f.jpg)](https://pic1.imgdb.cn/item/63638cce16f2c2beb1b72c2f.jpg)

- Feed流的滚动分页

  - 我们需要记录每次操作的最后一条，然后从这个位置去开始读数据
  - 举个例子：我们从t1时刻开始，拿到第一页数据，拿到了`10~6`，然后记录下当前最后一次读取的记录，就是6，t2时刻发布了新纪录，此时这个11在最上面，但不会影响我们之前拿到的6，此时t3时刻来读取第二页，第二页读数据的时候，从`6-1=5`开始读，这样就拿到了`5~1`的记录。我们在这个地方可以使用SortedSet来做，使用时间戳来充当表中的`1~10`
    [![img](https://gitlab.com/apzs/image/-/raw/master/image/63638cdb16f2c2beb1b743f5.jpg)](https://pic1.imgdb.cn/item/63638cdb16f2c2beb1b743f5.jpg)

- 核心思路：我们保存完探店笔记后，获取当前用户的粉丝列表，然后将数据推送给粉丝

- 那现在我们就需要修改保存笔记的方法

  ```java
  @Override
  public Result saveBlog(Blog blog) {
      // 获取登录用户
      UserDTO user = UserHolder.getUser();
      blog.setUserId(user.getId());
      // 保存探店博文
      save(blog);
      // 条件构造器
      LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
      // 从follow表最中，查找当前用户的粉丝  select * from follow where follow_user_id = user_id
      queryWrapper.eq(Follow::getFollowUserId, user.getId());
      //获取当前用户的粉丝
      List<Follow> follows = followService.list(queryWrapper);
      for (Follow follow : follows) {
          Long userId = follow.getUserId();
          String key = FEED_KEY + userId;
          //推送数据
          stringRedisTemplate.opsForZSet().add(key, blog.getId().toString(), System.currentTimeMillis());
      }
      // 返回id
      return Result.ok(blog.getId());
  }
  ```

## 实现分页查询收件箱

- 需求：在个人主页的`关注栏`中，查询并展示推送的Blog信息
- 具体步骤如下
  1. 每次查询完成之后，我们要分析出查询出的最小时间戳，这个值会作为下一次的查询条件
  2. 我们需要找到与上一次查询相同的查询个数，并作为偏移量，下次查询的时候，跳过这些查询过的数据，拿到我们需要的数据（例如时间戳8 6 6 5 5 4，我们每次查询3个，第一次是8 6 6，此时最小时间戳是6，如果不设置偏移量，会从第一个6之后开始查询，那么查询到的就是6 5 5，而不是5 5 4，如果这里说的不清楚，那就看后续的代码）
- 综上：我们的请求参数中需要携带lastId和offset，即上一次查询时的最小时间戳和偏移量，这两个参数

- 编写一个通用的实体类，不一定只对blog进行分页查询，这里用泛型做一个通用的分页查询，list是封装返回的结果，minTime是记录的最小时间戳，offset是记录偏移量

  ```java
  @Data
  public class ScrollResult {
      private List<?> list;
      private Long minTime;
      private Integer offset;
  }
  ```
  
- 点击个人主页中的`关注`栏，查看发送的请求

  > 请求网址: http://localhost:8080/api/blog/of/follow?&lastId=1667472294526
  > 请求方法: GET

- 在BlogController中创建对应的方法，具体实现去ServiceImpl中完成

  - tabName
  - Impl具体实现

  ```java
  @GetMapping("/of/follow")
  public Result queryBlogOfFollow(@RequestParam("lastId") Long max, @RequestParam(value = "offset",defaultValue = "0") Integer offset) {
      return blogService.queryBlogOfFollow(max,offset);
  }
  ```
  
  
  
- 最终效果如下，在最上方显示的都是我们最新发布的动态
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6363a7da16f2c2beb1e17702.jpg)](https://pic1.imgdb.cn/item/6363a7da16f2c2beb1e17702.jpg)

# 附近商户

## GEO数据结构的基本用法

- GEO就是Geolocation的简写形式，代表地理坐标。Redis在3.2版本中加入了对GEO的支持，允许存储地理坐标信息，帮助我们根据经纬度来检索数据，常见的命令有

  - GEOADD：添加一个地理空间信息，包含：经度（longitude）、纬度（latitude）、值（member）

    - 命令格式

      ```bash
      GEOADD key longitude latitude member [longitude latitude member …]
      ```
      
    - 返回值：添加到sorted set元素的数⽬，但不包括已更新score的元素
    
    - 复杂度：每⼀个元素添加是O(log(N)) ，N是sorted set的元素数量
    
    - 举例
    
      ```bash
      GEOADD china 13.361389 38.115556 "shanghai" 15.087269 37.502669 "beijing"
      ```
    
  - GEODIST：计算指定的两个点之间的距离并返回

    - 命令格式

      ```bash
      GEODIST key member1 member2 [m|km|ft|mi]
      ```
      
    - 如果两个位置之间的其中⼀个不存在， 那么命令返回空值。
    
    - 指定单位的参数 unit 必须是以下单位的其中⼀个：
    
      - m 表⽰单位为⽶。
      - km 表⽰单位为千⽶。
      - mi 表⽰单位为英⾥。
      - ft 表⽰单位为英尺。
    
    - 如果⽤户没有显式地指定单位参数， 那么 GEODIST 默认使⽤⽶作为单位。
    
    - GEODIST 命令在计算距离时会假设地球为完美的球形， 在极限情况下， 这⼀假设最⼤会造成 0.5% 的误差
    
    - 返回值：计算出的距离会以双精度浮点数的形式被返回。 如果给定的位置元素不存在， 那么命令返回空值
    
    - 举例
    
      ```bash
      GEODIST china beijing shanghai km
      ```
    
  - GEOHASH：将指定member的坐标转化为hash字符串形式并返回
  
    - 命令格式

      ```bash
      GEOHASH key member [member …]
      ```
      
    - 通常使用表示位置的元素使用不同的技术，使用Geohash位置52点整数编码。由于编码和解码过程中所使用的初始最小和最大坐标不同，编码的编码也不同于标准。此命令返回一个标准的Geohash，在维基百科和geohash.org网站都有相关描述
    
    - 返回值：一个数组， 数组的每个项都是一个 geohash 。 命令返回的 geohash 的位置与用户给定的位置元素的位置一一对应
    
    - 复杂度：O(log(N)) for each member requested, where N is the number of elements in the sorted set
    
    - 举例
    
      ```bash
      云服务器:0>GEOHASH china beijing shanghai
      1) "sqdtr74hyu0"
      2) "sqc8b49rny0"
      ```
    
  - GEOPOS：返回指定member的坐标
  
    - 格式：GEOPOS key member [member …]
  
    - 给定一个sorted set表示的空间索引，密集使用 geoadd 命令，它以获得指定成员的坐标往往是有益的。当空间索引填充通过 geoadd 的坐标转换成一个52位Geohash，所以返回的坐标可能不完全以添加元素的，但小的错误可能会出台。

    - 因为 GEOPOS 命令接受可变数量的位置元素作为输入， 所以即使用户只给定了一个位置元素， 命令也会返回数组回复

    - 返回值：GEOPOS 命令返回一个数组， 数组中的每个项都由两个元素组成： 第一个元素为给定位置元素的经度， 而第二个元素则为给定位置元素的纬度。当给定的位置元素不存在时， 对应的数组项为空值

    - 复杂度：O(log(N)) for each member requested, where N is the number of elements in the sorted set

      ```bash
      云服务器:0>geopos china beijing shanghai
      1)  1) "15.08726745843887329"
          2) "37.50266842333162032"
      
      2)  1) "13.36138933897018433"
          2) "38.11555639549629859"
      ```
    
  - GEOGADIUS：指定圆心、半径，找到该园内包含的所有member，并按照与圆心之间的距离排序后返回，
  
    ```
    6.2之后已废弃
    ```
  
    - 命令格式
  
      ```bash
      GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] 
      [COUNT count [ANY]] [ASC|DESC] [STORE key] [STOREDIST key]
      ```
      
    - 范围可以使用以下其中一个单位：
    
      - m 表示单位为米。
      - km 表示单位为千米。
      - mi 表示单位为英里。
      - ft 表示单位为英尺。
    
    - 在给定以下可选项时， 命令会返回额外的信息：
    
      - WITHDIST: 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。 距离的单位和用户给定的范围单位保持一致。
      - WITHCOORD: 将位置元素的经度和维度也一并返回。
      - WITHHASH: 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试， 实际中的作用并不大。
    
    - 命令默认返回未排序的位置元素。 通过以下两个参数， 用户可以指定被返回位置元素的排序方式：
    
      - ASC: 根据中心的位置， 按照从近到远的方式返回位置元素。
      - DESC: 根据中心的位置， 按照从远到近的方式返回位置元素。
    
    - 在默认情况下， GEORADIUS 命令会返回所有匹配的位置元素。 虽然用户可以使用 COUNT 选项去获取前 N 个匹配元素， 但是因为命令在内部可能会需要对所有被匹配的元素进行处理， 所以在对一个非常大的区域进行搜索时， 即使只使用 COUNT 选项去获取少量元素， 命令的执行速度也可能会非常慢。 但是从另一方面来说， 使用 COUNT 选项去减少需要返回的元素数量， 对于减少带宽来说仍然是非常有用的
    
    - 返回值：
    
      - 在没有给定任何 WITH 选项的情况下， 命令只会返回一个像 [“New York”,”Milan”,”Paris”] 这样的线性（linear）列表。
      - 在指定了 WITHCOORD 、 WITHDIST 、 WITHHASH 等选项的情况下， 命令返回一个二层嵌套数组， 内层的每个子数组就表示一个元素。
      - 在返回嵌套数组时， 子数组的第一个元素总是位置元素的名字。 至于额外的信息， 则会作为子数组的后续元素， 按照以下顺序被返回：
        - 以浮点数格式返回的中心与位置元素之间的距离， 单位与用户指定范围时的单位一致。
        - geohash 整数。
        - 由两个元素组成的坐标，分别为经度和纬度
    
    - 举例
    
      ```bash
      云服务器:0>GEORADIUS china 15 37 200 km WITHDIST WITHCOORD
      1)  1) "shanghai"
          2) "190.4424"
          3)  1) "13.36138933897018433"
              2) "38.11555639549629859"
      
      2)  1) "beijing"
          2) "56.4413"
          3)  1) "15.08726745843887329"
              2) "37.50266842333162032"
      
      云服务器:0>GEORADIUS china 15 37 200 km WITHDIST
      1)  1) "shanghai"
          2) "190.4424"
      
      2)  1) "beijing"
          2) "56.4413"
      ```
    
  - GEOSEARCH：在指定范围内搜索member，并按照与制定点之间的距离排序后返回，范围可以使圆形或矩形，6.2的新功能
  
    命令格式
  
    ```bash
    GEOSEARCH key [FROMMEMBER member] [FROMLONLAT longitude latitude] [BYRADIUS radius m|km|ft|mi] 
    [BYBOX width height m|km|ft|mi] [ASC|DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST] [WITHHASH]
    ```
    
    
    
    - 举例
    
      ```bash
      云服务器:0>geosearch china FROMLONLAT 15 37 BYRADIUS 200 km ASC WITHCOORD WITHDIST
      1)  1) "beijing"
          2) "56.4413"
          3)  1) "15.08726745843887329"
              2) "37.50266842333162032"
      
      
      2)  1) "shanghai"
          2) "190.4424"
          3)  1) "13.36138933897018433"
              2) "38.11555639549629859"
      
      
      
      云服务器:0>geosearch china FROMLONLAT 15 37 BYBOX 400 400 km DESC WITHCOORD WITHDIST
      1)  1) "shanghai"
          2) "190.4424"
          3)  1) "13.36138933897018433"
              2) "38.11555639549629859"
      
      
      2)  1) "beijing"
          2) "56.4413"
          3)  S1) "15.08726745843887329"
              2) "37.50266842333162032"
      ```
    
  - GEOSEARCHSTORE：与GEOSEARCH功能一致，不过可以把结果存储到一个指定的key，也是6.2的新功能
  
    - 命令格式
  
      ```bash
      GEOSEARCHSTORE destination source [FROMMEMBER member] [FROMLONLAT longitude latitude] 
      [BYRADIUS radius m|km|ft|mi] [BYBOX width height m|km|ft|mi] 
      [ASC|DESC] [COUNT count [ANY]] [STOREDIST]
      ```
      
    - 这个命令和 GEORADIUS 命令一样， 都可以找出位于指定范围内的元素， 但是 GEORADIUSBYMEMBER 的中心点是由给定的位置元素决定的， 而不是像 GEORADIUS 那样， 使用输入的经度和纬度来决定中心点
    
    - 指定成员的位置被用作查询的中心。
    
    - 关于 GEORADIUSBYMEMBER 命令的更多信息， 请参考 GEORADIUS 命令的文档
    
    - 复杂度：O(N+log(M)) where N is the number of elements inside the bounding box of the circular area delimited by center and radius and M is the number of items inside the index
    
      ```bash
      云服务器:0>GEORADIUSBYMEMBER china beijing 200 km
      1) "shanghai"
      2) "beijing"
      ```

## 导入店铺数据到GEO

- 具体场景说明，例如美团/饿了么这种外卖App，你是可以看到商家离你有多远的，那我们现在也要实现这个功能。
- 我们可以使用GEO来实现该功能，以当前坐标为圆心，同时绑定相同的店家类型type，以及分页信息，把这几个条件插入后台，后台查询出对应的数据再返回
- 那现在我们要做的就是：将数据库中的数据导入到Redis中去，GEO在Redis中就是一个member和一个经纬度，经纬度对应的就是tb_shop中的x和y，而member，我们用shop_id来存，因为Redis只是一个内存级数据库，如果存海量的数据，还是力不从心，所以我们只存一个id，用的时候再拿id去SQL数据库中查询shop信息
- 但是此时还有一个问题，我们在redis中没有存储shop_type，无法根据店铺类型来对数据进行筛选，解决办法就是将type_id作为key，存入同一个GEO集合即可

| Key           | Value             | Score             |
| ------------- | ----------------- | ----------------- |
| shop:geo:美食 | 海底捞            | 40691512240174598 |
| 吉野家        | 40691519846517915 |                   |
| shop:geo:KTV  | KTV 01            | 40691165486458787 |
| KTV 02        | 40691514154651657 |                   |

- 代码如下

  ```java
  @Test
  public void loadShopData(){
      //1. 查询所有店铺信息
      List<Shop> shopList = shopService.list();
      //2. 按照typeId，将店铺进行分组
      Map<Long, List<Shop>> map = shopList.stream().collect(Collectors.groupingBy(Shop::getTypeId));
      //3. 逐个写入Redis
      for (Map.Entry<Long, List<Shop>> entry : map.entrySet()) {
          //3.1 获取类型id
          Long typeId = entry.getKey();
          //3.2 获取同类型店铺的集合
          List<Shop> shops = entry.getValue();
          String key = SHOP_GEO_KEY + typeId;
          for (Shop shop : shops) {
              //3.3 写入redis GEOADD key 经度 纬度 member
              stringRedisTemplate.opsForGeo().add(key,new Point(shop.getX(),shop.getY()),shop.getId().toString());
          }
      }
  }
  ```
  
- 但是上面的代码不够优雅，是一条一条写入的，效率较低，那我们现在来改进一下，这样只需要写入等同于type_id数量的次数

  ```java
  @Test
  public void loadShopData() {
      List<Shop> shopList = shopService.list();
      Map<Long, List<Shop>> map = shopList.stream().collect(Collectors.groupingBy(Shop::getTypeId));
      for (Map.Entry<Long, List<Shop>> entry : map.entrySet()) {
          Long typeId = entry.getKey();
          List<Shop> shops = entry.getValue();
          String key = SHOP_GEO_KEY + typeId;
          List<RedisGeoCommands.GeoLocation<String>> locations = new ArrayList<>(shops.size());
          for (Shop shop : shops) {
              //将当前type的商铺都添加到locations集合中
              locations.add(new RedisGeoCommands.GeoLocation<>(shop.getId().toString(), new Point(shop.getX(), shop.getY())));
          }
          //批量写入
          stringRedisTemplate.opsForGeo().add(key, locations);
      }
  }
  ```
  
- 代码编写完毕，我们启动测试方法，然后去Redis图形化界面中查看是否有对应的数据

## 实现附近商户功能

- SpringDataRedis的2.3.9版本并不支持Redis 6.2提供的GEOSEARCH命令，因此我们需要提示其版本，修改自己的pom.xml文件

  ```xml
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-redis</artifactId>
      <exclusions>
          <exclusion>
              <artifactId>spring-data-redis</artifactId>
              <groupId>org.springframework.data</groupId>
          </exclusion>
          <exclusion>
              <artifactId>lettuce-core</artifactId>
              <groupId>io.lettuce</groupId>
          </exclusion>
      </exclusions>
  </dependency>
  <dependency>
      <groupId>org.springframework.data</groupId>
      <artifactId>spring-data-redis</artifactId>
      <version>2.6.2</version>
  </dependency>
  <dependency>
      <groupId>io.lettuce</groupId>
      <artifactId>lettuce-core</artifactId>
      <version>6.1.6.RELEASE</version>
  </dependency>
  ```
  
- 点击距离分类，查看发送的请求

  > 请求网址: http://localhost:8080/api/shop/of/type?&typeId=1&current=1&x=120.149993&y=30.334229
  > 请求方法: GET

- 看样子是ShopController中的方法，那我们现在来修改其代码，除了typeId，分页码，我们还需要其坐标

  ```java
  @GetMapping("/of/type")
  public Result queryShopByType(
          @RequestParam("typeId") Integer typeId,
          @RequestParam(value = "current", defaultValue = "1") Integer current,
          @RequestParam(value = "x", required = false) Double x,
          @RequestParam(value = "y", required = false) Double y
  ) {
     return shopService.queryShopByType(typeId,current,x,y);
  }
  ```
  
- 具体业务逻辑依旧是写在ShopServiceImpl中

  ```java
  @Override
  public Result queryShopByType(Integer typeId, Integer current, Double x, Double y) {
      //1. 判断是否需要根据距离查询
      if (x == null || y == null) {
          // 根据类型分页查询
          Page<Shop> page = query()
                  .eq("type_id", typeId)
                  .page(new Page<>(current, SystemConstants.DEFAULT_PAGE_SIZE));
          // 返回数据
          return Result.ok(page.getRecords());
      }
      //2. 计算分页查询参数
      int from = (current - 1) * SystemConstants.MAX_PAGE_SIZE;
      int end = current * SystemConstants.MAX_PAGE_SIZE;
      String key = SHOP_GEO_KEY + typeId;
      //3. 查询redis、按照距离排序、分页; 结果：shopId、distance
      //GEOSEARCH key FROMLONLAT x y BYRADIUS 5000 m WITHDIST
      GeoResults<RedisGeoCommands.GeoLocation<String>> results = stringRedisTemplate.opsForGeo().search(key,
              GeoReference.fromCoordinate(x, y),
              new Distance(5000),
              RedisGeoCommands.GeoSearchCommandArgs.newGeoSearchArgs().includeDistance().limit(end));
      if (results == null) {
          return Result.ok(Collections.emptyList());
      }
      //4. 解析出id
      List<GeoResult<RedisGeoCommands.GeoLocation<String>>> list = results.getContent();
      if (list.size() < from) {
          //起始查询位置大于数据总量，则说明没数据了，返回空集合
          return Result.ok(Collections.emptyList());
      }
      ArrayList<Long> ids = new ArrayList<>(list.size());
      HashMap<String, Distance> distanceMap = new HashMap<>(list.size());
      list.stream().skip(from).forEach(result -> {
          String shopIdStr = result.getContent().getName();
          ids.add(Long.valueOf(shopIdStr));
          Distance distance = result.getDistance();
          distanceMap.put(shopIdStr, distance);
      });
      //5. 根据id查询shop
      String idsStr = StrUtil.join(",", ids);
      List<Shop> shops = query().in("id", ids).last("ORDER BY FIELD( id," + idsStr + ")").list();
      for (Shop shop : shops) {
          //设置shop的举例属性，从distanceMap中根据shopId查询
          shop.setDistance(distanceMap.get(shop.getId().toString()).getValue());
      }
      //6. 返回
      return Result.ok(shops);
  }
  ```
  
- 最终效果如下，可以显示出距离
  [![img](https://gitlab.com/apzs/image/-/raw/master/image/6364c8c216f2c2beb16eb996.jpg)](https://pic1.imgdb.cn/item/6364c8c216f2c2beb16eb996.jpg)

# 用户签到

## BitMap功能延迟

- 我们针对签到功能完全可以通过MySQL来完成，例如下面这张表

|   Field   |       Type       | Collation | Null | Key  | Default |     Extra      |  Comment   |
| :-------: | :--------------: | :-------: | :--: | :--: | :-----: | :------------: | :--------: |
|    id     | bigint unsigned  |  (NULL)   |  NO  | PRI  | (NULL)  | auto_increment |    主键    |
|  user_id  | bigint unsigned  |  (NULL)   |  NO  |      | (NULL)  |                |   用户id   |
|   year    |       year       |  (NULL)   |  NO  |      | (NULL)  |                |  签到的年  |
|   month   |     tinyint      |  (NULL)   |  NO  |      | (NULL)  |                |  签到的月  |
|   date    |       date       |  (NULL)   |  NO  |      | (NULL)  |                | 签到的日期 |
| is_backup | tinyint unsigned |  (NULL)   | YES  |      | (NULL)  |                |  是否补签  |

- 用户签到一次，就是一条记录，假如有1000W用户，平均没人每年签到10次，那这张表一年的数据量就有1亿条
- 那有没有方法能简化一点呢？我们可以使用二进制位来记录每个月的签到情况，签到记录为1，未签到记录为0
- 把每一个bit位对应当月的每一天，形成映射关系，用0和1标识业务状态，这种思路就成为位图（BitMap）。这样我们就能用极小的空间，来实现大量数据的表示
- Redis中是利用String类型数据结构实现BitMap，因此最大上限是512M，转换为bit则是2^32个bit位
- BitMap的操作命令有
  - SETBIT：向指定位置（offset）存入一个0或1
  - GETBIT：获取指定位置（offset）的bit值
  - BITCOUNT：统计BitMap中值为1的bit位的数量
  - BITFIELD：操作（查询、修改、自增）BitMap中bit数组中的指定位置（offset）的值
  - BITFIELD_RO：获取BitMap中bit数组，并以十进制形式返回
  - BITOP：将多个BitMap的结果做位运算（与、或、异或）
  - BITPOS：查找bit数组中指定范围内第一个0或1出现的位置

## 实现签到功能

- 需求：实现签到接口，将当前用户当天签到信息保存到Redis中

|          |    说明    |
| :------: | :--------: |
| 请求方式 |    Post    |
| 请求路径 | /user/sign |
| 请求参数 |     无     |
|  返回值  |     无     |

- 思路：我们可以把年和月作为BitMap的key，然后保存到一个BitMap中，每次签到就把对应位上的0变成1，只要是1就说明这一天已经签到了，反之则没有签到

- 由于BitMap底层是基于String数据结构，因此其操作也都封装在字符串相关操作中了

- 在UserController中编写对应的方法

  ```java
  @PostMapping("/sign")
  public Result sign(){
      return userService.sign();
  }
  ```
  
- 具体实现

  ```java
  @Override
  public Result sign() {
      //1. 获取当前用户
      Long userId = UserHolder.getUser().getId();
      //2. 获取日期
      LocalDateTime now = LocalDateTime.now();
      //3. 拼接key
      String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
      String key = USER_SIGN_KEY + userId + keySuffix;
      //4. 获取今天是当月第几天(1~31)
      int dayOfMonth = now.getDayOfMonth();
      //5. 写入Redis  BITSET key offset 1
      stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);
      return Result.ok();
  }
  ```
  
- 使用PostMan发送请求测试，注意请求头中需携带登录用户的token，否则无效（又浪费我五分钟找这个问题）

- 发送成功之后，在Redis图形化界面中是可以看到的

## 签到统计

- 如何获取本月到今天为止的所有签到数据？

  - BITFIELD key GET u[dayOfMonth] 0

- 如何从后往前遍历每个bit位，获取连续签到天数

  - 连续签到天数，就是从末尾往前数，看有多少个1

  - 简单的位运算算法

    ```java
    int count = 0;
    while(true) {
        if((num & 1) == 0)
            break;
        else
            count++;
        num >>>= 1;
    }
    return count;
    ```
  
- 需求：实现下面接口，统计当前用户截止当前时间在本月的连续签到天数

|          |       说明       |
| :------: | :--------------: |
| 请求方式 |       GET        |
| 请求路径 | /user/sign/count |
| 请求参数 |        无        |
|  返回值  |   连续签到天数   |

- 在UserController中创建对应的方法

  ```java
  @GetMapping("/sign/count")
  public Result signCount(){
      return userService.signCount();
  }
  ```
  
- 在UserServiceImpl中实现方法

  ```java
  @Override
  public Result signCount() {
      //1. 获取当前用户
      Long userId = UserHolder.getUser().getId();
      //2. 获取日期
      LocalDateTime now = LocalDateTime.now();
      //3. 拼接key
      String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
      String key = USER_SIGN_KEY + userId + keySuffix;
      //4. 获取今天是当月第几天(1~31)
      int dayOfMonth = now.getDayOfMonth();
      //5. 获取截止至今日的签到记录  BITFIELD key GET uDay 0
      List<Long> result = stringRedisTemplate.opsForValue().bitField(key, BitFieldSubCommands.create()
              .get(BitFieldSubCommands.BitFieldType.unsigned(dayOfMonth)).valueAt(0));
      if (result == null || result.isEmpty()) {
          return Result.ok(0);
      }
      //6. 循环遍历
      int count = 0;
      Long num = result.get(0);
      while (true) {
          if ((num & 1) == 0) {
              break;
          } else
              count++;
          //数字右移，抛弃最后一位
          num >>>= 1;
      }
      return Result.ok(count);
  }
  ```
  
- 使用PostMan发送请求，可以手动修改redis中的签到数据多次测试，发请求的时候还是要注意携带登录用户的token

# UV统计

## HyperLogLog

- UV：全称Unique Visitor，也叫独立访客量，是指通过互联网访问、浏览这个网页的自然人。1天内同一个用户多次访问该网站，只记录1次。

- PV：全称Page View，也叫页面访问量或点击量，用户每访问网站的一个页面，记录1次PV，用户多次打开页面，则记录多次PV。往往用来衡量网站的流量。

- 本博客的首页侧边栏就有本站访客量和本站总访问量，对应的就是UV和PV

- 通常来说PV会比UV大很多，所以衡量同一个网站的访问量，我们需要综合考虑很多因素。

- UV统计在服务端做会很麻烦，因为要判断该用户是否已经统计过了，需要将统计过的信息保存，但是如果每个访问的用户都保存到Redis中，那么数据库会非常恐怖，那么该如何处理呢？

- HyperLogLog(HLL)是从Loglog算法派生的概率算法，用户确定非常大的集合基数，而不需要存储其所有值，算法相关原理可以参考下面这篇文章：https://juejin.cn/post/6844903785744056333#heading-0

- Redis中的HLL是基于string结构实现的，单个HLL的内存`永远小于16kb`，`内存占用低`的令人发指！作为代价，其测量结果是概率性的，`有小于0.81％的误差`。不过对于UV统计来说，这完全可以忽略。

- 常用的三个方法

  ```bash
  PFADD key element [element...]
  summary: Adds the specified elements to the specified HyperLogLog
  
  PFCOUNT key [key ...]
  Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
  
  PFMERGE destkey sourcekey [sourcekey ...]
  lnternal commands for debugging HyperLogLog values
  ```

## 测试百万数据的统计

- 使用单元测试，向HyperLogLog中添加100万条数据，看看内存占用是否真的那么低，以及统计误差如何

  ```java
  @Test
  public void testHyperLogLog() {
      String[] users = new String[1000];
      int j = 0;
      for (int i = 0; i < 1000000; i++) {
          j = i % 1000;
          users[j] = "user_" + i;
          if (j == 999) {
              stringRedisTemplate.opsForHyperLogLog().add("HLL", users);
          }
      }
      Long count = stringRedisTemplate.opsForHyperLogLog().size("HLL");
      System.out.println("count = " + count);
  }
  ```
  
- 插入100W条数据，得到的count为997593，误差率为0.002407%

- 去Redis图形化界面中查看占用情况为：12.3K字节
