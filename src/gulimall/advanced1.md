# 5、高级篇

## 5.1、整合Elasticsearch

**ElasticSearch概念-基础概念**

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.1.0.png" alt="image-20220721203321516" style="zoom:50%;" />

**ElasticSearch概念-倒排索引**

| 词     | 记录      |
| ------ | --------- |
| 红海   | 1,2,3,4,5 |
| 行动   | 1,2,3     |
| 探索   | 2,5       |
| 特别   | 3,5       |
| 记录篇 | 4         |
| 特工   | 5         |

`分词`：将整句分拆为单词

`保存的记录`

1. 红海行动

2. 探索红海行动

3. 红海特别行动

4. 红海记录篇

5. 特工红海特别探索

`检索：`

1、红海特工行动？

2、红海行动？

相关性得分：



**ElasticSearch7-去掉type概念**

- 关系型数据库中两个数据表示是独立的，即使他们里面有相同名称的列也不影响使用，但ES 中不是这样的。elasticsearch是基于Lucene开发的搜索引擎，而ES中不同type下名称相同 的filed最终在Lucene中的处理方式是一样的。

  - 两个不同type下的两个user_name，在ES同一个索引下其实被认为是同一个filed，你必 须在两个不同的type中定义相同的filed映射。否则，不同type中的相同字段名称就会在 处理中出现冲突的情况，导致Lucene处理效率下降。

  - 去掉type就是为了提高ES处理数据的效率。

- Elasticsearch 7.x
  - URL中的type参数为可选。比如，索引一个文档不再要求提供文档类型。

- Elasticsearch 8.x
  - 不再支持URL中的type参数。

- 解决：将索引从多类型迁移到单类型，每种类型文档一个独立索引

### 5.1.1、简介

#### 1、Elasticsearch 是什么？

> Elasticsearch 是一个分布式的免费开源搜索和分析引擎，适用于包括文本、数字、地理空间、结构化和非结构化数据等在内的所有类型的数据。Elasticsearch 在 Apache Lucene 的基础上开发而成，由 Elasticsearch N.V.（即现在的 Elastic）于 2010 年首次发布。Elasticsearch 以其简单的 REST 风格 API、分布式特性、速度和可扩展性而闻名，是 Elastic Stack 的核心组件；Elastic Stack 是一套适用于数据采集、扩充、存储、分析和可视化的免费开源工具。人们通常将 Elastic Stack 称为 ELK Stack（代指 Elasticsearch、Logstash 和 Kibana），目前 Elastic Stack 包括一系列丰富的轻量型数据采集代理，这些代理统称为 Beats，可用来向 Elasticsearch 发送数据。

#### 2、Elasticsearch 的用途是什么？

Elasticsearch 在速度和可扩展性方面都表现出色，而且还能够索引多种类型的内容，这意味着其可用于多种用例：

- 应用程序搜索
- 网站搜索
- 企业搜索
- 日志处理和分析
- 基础设施指标和容器监测
- 应用程序性能监测
- 地理空间数据分析和可视化
- 安全分析
- 业务分析

#### 3、Elasticsearch 的工作原理是什么？

原始数据会从多个来源（包括日志、系统指标和网络应用程序）输入到 Elasticsearch 中。*数据采集*指在 Elasticsearch 中进行*索引*之前解析、标准化并充实这些原始数据的过程。这些数据在 Elasticsearch 中索引完成之后，用户便可针对他们的数据运行复杂的查询，并使用聚合来检索自身数据的复杂汇总。在 Kibana 中，用户可以基于自己的数据创建强大的可视化，分享仪表板，并对 Elastic Stack 进行管理。

#### 4、Elasticsearch 索引是什么？

Elasticsearch *索引*指相互关联的文档集合。Elasticsearch 会以 JSON 文档的形式存储数据。每个文档都会在一组*键*（字段或属性的名称）和它们对应的值（字符串、数字、布尔值、日期、*数值*组、地理位置或其他类型的数据）之间建立联系。

Elasticsearch 使用的是一种名为*倒排索引*的数据结构，这一结构的设计可以允许十分快速地进行全文本搜索。倒排索引会列出在所有文档中出现的每个特有词汇，并且可以找到包含每个词汇的全部文档。

在索引过程中，Elasticsearch 会存储文档并构建倒排索引，这样用户便可以近实时地对文档数据进行搜索。索引过程是在索引 API 中启动的，通过此 API 您既可向特定索引中添加 JSON 文档，也可更改特定索引中的 JSON 文档。

#### 5、Logstash 的用途是什么？

Logstash 是 Elastic Stack 的核心产品之一，可用来对数据进行聚合和处理，并将数据发送到 Elasticsearch。Logstash 是一个开源的服务器端数据处理管道，允许您在将数据索引到 Elasticsearch 之前同时从多个来源采集数据，并对数据进行充实和转换。

#### 6、Kibana 的用途是什么？

Kibana 是一款适用于 Elasticsearch 的数据可视化和管理工具，可以提供实时的直方图、线形图、饼状图和地图。Kibana 同时还包括诸如 Canvas 和 Elastic Maps 等高级应用程序；Canvas 允许用户基于自身数据创建定制的动态信息图表，而 Elastic Maps 则可用来对地理空间数据进行可视化。

#### 7、为何使用 Elasticsearch？

**Elasticsearch 很快。**由于 Elasticsearch 是在 Lucene 基础上构建而成的，所以在全文本搜索方面表现十分出色。Elasticsearch 同时还是一个近实时的搜索平台，这意味着从文档索引操作到文档变为可搜索状态之间的延时很短，一般只有一秒。因此，Elasticsearch 非常适用于对时间有严苛要求的用例，例如安全分析和基础设施监测。

**Elasticsearch 具有分布式的本质特征。**Elasticsearch 中存储的文档分布在不同的容器中，这些容器称为*分片*，可以进行复制以提供数据冗余副本，以防发生硬件故障。Elasticsearch 的分布式特性使得它可以扩展至数百台（甚至数千台）服务器，并处理 PB 量级的数据。

**Elasticsearch 包含一系列广泛的功能。**除了速度、可扩展性和弹性等优势以外，Elasticsearch 还有大量强大的内置功能（例如数据汇总和索引生命周期管理），可以方便用户更加高效地存储和搜索数据。

**Elastic Stack 简化了数据采集、可视化和报告过程。**通过与 Beats 和 Logstash 进行集成，用户能够在向 Elasticsearch 中索引数据之前轻松地处理数据。同时，Kibana 不仅可针对 Elasticsearch 数据提供实时可视化，同时还提供 UI 以便用户快速访问应用程序性能监测 (APM)、日志和基础设施指标等数据。

### 5.1.2、安装Elasticsearch 

#### 1、准备工作

先把要使用的[Oracle VM *VirtualBox*](https://www.baidu.com/link?url=kt_064YgvH_qiIkWW_ekzAXDLKK6oDD_ftrlywBWyT8Jrtrbde8UVk2bGDtiAx8T&wd=&eqid=dfa91a1e000cf93a0000000662bec7af)虚拟机内存调大，这里我调到1G

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.1.1.png" alt="image-20220701180534099" style="zoom: 67%;" />

然后在`VirtualBox VMs的安装目录`使用`vagrant up`命令启动[Oracle VM *VirtualBox*](https://www.baidu.com/link?url=kt_064YgvH_qiIkWW_ekzAXDLKK6oDD_ftrlywBWyT8Jrtrbde8UVk2bGDtiAx8T&wd=&eqid=dfa91a1e000cf93a0000000662bec7af)虚拟机

![image-20220701180734638](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.1.2.png)

然后在`VirtualBox VMs的安装目录`使用`vagrant ssh`连接虚拟机

![image-20220701181323041](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.1.3.png)

使用`sudo docker ps`命令查看正在运行的镜像

![image-20220701182742826](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.1.4.png)

使用`sudo docker images`命令查看已下载的镜像

![image-20220701182951384](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.1.5.png)

#### 2、下载

##### 1、下载`elasticsearch`

使用`sudo docker pull elasticsearch:7.4.2`命令下载`elasticsearch`

![image-20220701190332635](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.2.1.png)

##### 2、下载`kibana`

使用`sudo docker pull kibana:7.4.2`下载`kibana`

![image-20220701224139239](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.2.2.1.png)

使用`sudo docker images`命令查看已下载的镜像

![image-20220701224312508](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.2.2.2.png)

使用`free -m`查看内存使用情况，可以看到内存还剩`403`

![image-20220701224457369](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.2.2.3.png)

#### 3、运行

##### 1、运行`elasticsearch`

**完整命令**(`-e ES_JAVA_OPTS="-Xms64m -Xmx128m"`这里推荐修改为`-e ES_JAVA_OPTS="-Xms64m -Xmx512m"`)

```bash
su root
mkdir -p /mydata/elasticsearch/config
mkdir -p /mydata/elasticsearch/data
echo "http.host: 0.0.0.0" >> /mydata/elasticsearch/config/elasticsearch.yml
cd /mydata/elasticsearch/config
ls
cat elasticsearch.yml
chmod -R 777 /mydata/elasticsearch

docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
-e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx128m" \
-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.4.2
```

以下是对命令的解释

```bash
su root     #提升至管理员权限，密码默认为 vagrant
mkdir -p /mydata/elasticsearch/config #在linux虚拟机里创建/mydata/elasticsearch/config目录，-p允许创建目录及子目录
mkdir -p /mydata/elasticsearch/data  #在linux虚拟机里创建/mydata/elasticsearch/data目录，-p允许创建目录及子目录
#在/mydata/elasticsearch/config/elasticsearch.yml文件里写入数据 http.host: 0.0.0.0
echo "http.host: 0.0.0.0" >> /mydata/elasticsearch/config/elasticsearch.yml #注意第二个"冒号后面有个空格
cd /mydata/elasticsearch/config #进入到/mydata/elasticsearch/config目录
ls #查看当前目录的文件及文件夹
cat elasticsearch.yml #查看elasticsearch.yml文件的内容

#9200是发送REST API类型的http请求所用的端口，9300是elasticsearch在分布式集群状态下节点之间通讯所用的端口
#  \ 斜杠表示当前行没写完，下一行接着写
#-e "discovery.type=single-node" 单节点运行
#-e ES_JAVA_OPTS="-Xms64m -Xmx128m" 初始占用64m，最大占用128m. 这个配置非常重要，如果不配置会占用虚拟机的全部内存，最后直   接卡死了
#-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml 将    docker容器的/usr/share/elasticsearch/config/elasticsearch.yml文件与linux虚拟机                      的/mydata/elasticsearch/config/elasticsearch.yml文件进行关联
#-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data 将docker的/usr/share/elasticsearch/data目录与   linux虚拟机的/mydata/elasticsearch/data目录进行关联
#-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins 将docker的/usr/share/elasticsearch/plugins   目录与linux虚拟机的/mydata/elasticsearch/plugins目录进行关联，以后装插件就不用进入docker容器内部了
#-d elasticsearch:7.4.2 用elasticsearch:7.4.2这个镜像后台启动elasticsearch
```

可以看到`elasticsearch`并没有运行起来

![image-20220701234224018](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.1.1.png)

使用`docker logs elasticsearch`命令，查看`elasticsearch`的日志

可以发现出现了**拒绝访问异常**

```
"Caused by: java.nio.file.AccessDeniedException: /usr/share/elasticsearch/data/nodes"
```

![image-20220701234549824](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.1.2.png)

修改`/mydata/elasticsearch`目录下的所有子目录和文件的权限，让所有用户都有可执行权限

```bash
cd ..
ls
ll
chmod -R 777 /mydata/elasticsearh/
pwd
chmod -R 777 /mydata/elasticsearch
ll
```

最开始只有管理员用户有写权限

将`/mydata/elasticsearch`目录下的所有子目录和文件的权限都修改为777，即可读可写可执行

可以看到所有用户都有`可读可写可执行`权限

![image-20220701235943734](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.1.3.png)

启动`elasticsearch`

```bash
docker ps
docker ps -a
docker start elasticsearch
docker ps
```

![image-20220702000749152](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.1.4.png)

浏览器输入 http://192.168.56.10:9200/ 可以看到已经访问成功了

(记得要修改成自己在`VirtualBox VMs\Vagrantfile`文件里配置的ip)

在`VirtualBox VMs\Vagrantfile`文件里的`  config.vm.network "private_network", ip: "192.168.56.10"`这个位置，这里的ip即为自己配置的ip

![image-20220702000924757](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.1.5.png)

##### 2、运行`kibana`

这里的`http://192.168.56.10:9200`要改为自己配置的地址

```bash
docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.56.10:9200 -p 5601:5601 \
-d kibana:7.4.2
```

![image-20220702002326782](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.2.1.png)

使用`docker ps`命令，查看正在运行的镜像，可以看到`kibana`已经运行起来了

![image-20220702002505163](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.2.2.png)



浏览器输入： http://192.168.56.10:5601/ ，即可看到欢迎界面

![image-20220702002611726](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.2.3.png)

选择`No` ->`Explore on my own`即可进入到主界面

![GIF 2022-7-2 9-59-46](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.3.2.4.png)

#### 3、发送请求

url： http://192.168.56.10:9200/

![image-20220702001534510](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.15.png)

输入url： http://192.168.56.10:9200/_cat/nodes

查看所有节点信息，返回的结果中有`*`表明该节点是主节点，`104b52df3ff1`即为节点的名字

![image-20220702001615401](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.16.png)

#### 4、常用命令

##### 1、启动`elasticsearch`

使用`docker start elasticsearch`命令启动`elasticsearch`

```bash
docker ps -a  #显示所有的容器，包括未运行的
docker start elasticsearch   #启动elasticsearch
docker ps -a
```

![image-20220702091750024](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.4.1.png)

##### 2、重启`elasticsearch`

使用`docker restart elasticsearch`命令，重启`elasticsearch`

```bash
docker restart elasticsearch
```

![image-20220702091841635](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.4.2.png)

##### 3、关闭`elasticsearch`

使用`docker stop elasticsearch`命令，关闭`elasticsearch`

```bash
docker stop elasticsearch
```

![image-20220702092211629](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.4.3.png)

##### 4、设置开机自启

设置`elasticsearch`开机自启

```bash
 sudo docker update  elasticsearch  --restart=always
```

![image-20220702093130552](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.4.4.1.png)

设置`kibana`开机自启

```bash
sudo docker update  kibana --restart=always
```

![image-20220702093445535](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.4.4.2.png)

重启`linux`虚拟机，可以看到`elasticsearch`和`kibana`都已经自启了

```bash
vagrant ssh
sudo docker ps
```

![image-20220702094640010](https://gitlab.com/apzs/image/-/raw/master/image/5.1.2.4.4.3.png)

### 5.1.3、Elasticsearch入门

#### 1、查看`Elasticsearch`信息

```
GET /_cat/nodes：查看所有节点
GET /_cat/health：查看 es 健康状况
GET /_cat/master：查看主节点
GET /_cat/indices：查看所有索引 相当于数据库的“show databases”
```

##### 1、查看所有节点

```http
http://192.168.56.10:9200/_cat/nodes
```

*表示的是主节点

![image-20220702095116507](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.1.1.png)

##### 2、查看健康状况

```http
http://192.168.56.10:9200/_cat/health
```

green表示健康

![image-20220702095359565](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.1.2.png)

##### 3、查看主节点

![image-20220702095546106](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.1.3.png)

##### 4、查看所有索引

![image-20220702095645415](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.1.4.png)

#### 2、简单增查改

##### 1、`put`方式添加或修改数据

###### 1、`put`方式发送请求

在Postman中发送请求

1. 输入`http://192.168.56.10:9200/customer/external/1`

2. 选择请求方式为PUT

3. 点击Body

4. 点击raw

5. 选择JSON

6. 点击Send

```json
{ 
    "name": "John Doe"
}
```

返回的数据信息

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

这些带`_`的都称为元数据

`"_index": "customer",`  -> 在`customer`索引下，相当于mysql中的数据库

`"_type": "external",` -> 在`external`类型下，相当于mysql中的表  （新版本已经没有`_type`了，统一为`_doc`）

`"_id": "1",` -> id为1

`"_version": 1,` ->  版本号为1

`"result": "created",` -> _result为新建状态

_shards是集群信息

![image-20220702101433134](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.1.1.png)

###### 2、再次发送数据

再次点击Send

版本号就变为了2

状态就变为了`updated`

![image-20220702102235280](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.1.2.png)

###### 3、`put`方式添加数据不允许不带`id`

uri [/customer/external] 和方法 [PUT] 的 HTTP 方法不正确，允许：[POST]

```json
{
    "error": "Incorrect HTTP method for uri [/customer/external] and method [PUT], allowed: [POST]",
    "status": 405
}
```

![image-20220702104750494](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.1.3.png)

##### 2、`post`方式添加或修改数据

> 新增: 不带id;带id但之前没数据
> 修改: 带id,并且有数据

###### 1、不带id用`post`方式发送请求

1. 修改请求：  http://192.168.56.10:9200/customer/external  ，这次不指定id

2. 请求方式改为`Post`

3. 再次点击Send

返回的数据

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "fUi6vIEBNNJSS-0BII0-",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```

1. 这时会自动创建一个唯一id

2. 版本号为1

3. 状态为新建

![image-20220702102758892](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.2.1.png)

###### 2、再次发送数据

再次点击Send，又重新新建了一个数据

![image-20220702103620791](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.2.2.png)

###### 3、带id用`post`方式发送请求

这次指定id，输入 http://192.168.56.10:9200/customer/external/2  ，点击Send

这时状态为新建

![image-20220702103844999](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.2.3.png)

###### 4、再次发送数据

这时状态为更新

![image-20220702103858795](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.2.2.4.png)

#### 3、查询和修改数据

##### 1、基础查询数据

1. 输入`http://192.168.56.10:9200/customer/external/1`

2. 请求方式选择`GET`

3. 点击`Send`

返回的数据

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 2,
    "_seq_no": 1,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "name": "John Doe"
    }
}
```

1. `"_index": "customer",`  -> 在`customer`索引下，相当于mysql中的数据库

2. `"_type": "external",` -> 在`external`类型下，相当于mysql中的表  （新版本已经没有`_type`了，统一为`_doc`）

3. `"_id": "2",` -> id为2

4. `"_version": 1,` ->  版本号为1

5. `"_seq_no": 1,` -> 做乐观锁操作的，只有数据一有改动`_seq_no`相当于序列号，就会往上加

6. `"_primary_term": 1,` -> 分片发生了变化`_primary_term`也会往上加

7. `"found": true,` -> 表明找到了数据

8. `_source` -> 内容在`_source`里面

![image-20220702110104049](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.1.png)

##### 2、乐观锁修改数据

开两个请求窗口

请求url都输入： http://192.168.56.10:9200/customer/external/1?if_seq_no=1&if_primary_term=1

请求方式都为`PUT`



第一个请求里输入以下json，然后点击Send

```json
{
    "name": "1"
}
```

以下是响应内容，可以看到修改成功了

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 3,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 6,
    "_primary_term": 1
}
```

![image-20220702111413505](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.2.1.png)

第二个请求里输入以下json，然后点击Send

```json
{
    "name": "2"
}
```

以下是响应内容，可以看到修改失败了

```json
{
    "error": {
        "root_cause": [
            {
                "type": "version_conflict_engine_exception",
                "reason": "[1]: version conflict, required seqNo [1], primary term [1]. current document has seqNo [6] and primary term [1]",
                "index_uuid": "M5lWculHRVWJOSy2fVN_3Q",
                "shard": "0",
                "index": "customer"
            }
        ],
        "type": "version_conflict_engine_exception",
        "reason": "[1]: version conflict, required seqNo [1], primary term [1]. current document has seqNo [6] and primary term [1]",
        "index_uuid": "M5lWculHRVWJOSy2fVN_3Q",
        "shard": "0",
        "index": "customer"
    },
    "status": 409
}
```

![image-20220702111717240](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.2.2.png)

这时需要再次查询`_seq_no`

![image-20220702112151904](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.2.3.png)

修改`_seq_no`为刚才查到的`_seq_no`的值，再次发送数据，可以看到这次查询成功了

![image-20220702112206983](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.2.4.png)

##### 3、带`_update`修改数据

> 带`_update`方式会对比原来数据，与原来一样就什么都不做，version, seq_no都不变  

> 适用于 对于大并发查询偶尔更新，带 update；对比更新，重新计算分配规则

请求的url： http://192.168.56.10:9200/customer/external/1/_update

请求方式为`POST`，输入以下json

```json
{ 
    "doc":{ 
        "name": "John"
    }
}
```

不管发送多少次，只要内容不变响应数据都为以下内容

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 7,
    "result": "noop",
    "_shards": {
        "total": 0,
        "successful": 0,
        "failed": 0
    },
    "_seq_no": 10,
    "_primary_term": 1
}
```

![image-20220702113337585](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.3.png)

##### 4、不带`_update`修改数据

put和post (不带_update) 都会直接更新数据, 对于大并发更新，不带 update

请求的url： http://192.168.56.10:9200/customer/external/1

请求方式为`POST`，输入以下json

```json
{ 
    "name": "John"
}
```

每发送一次请求，`_version`都会加一

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 8,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 11,
    "_primary_term": 1
}
```

![image-20220702113952287](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.4.1.png)

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 9,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 12,
    "_primary_term": 1
}
```

![image-20220702114008010](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.4.2.png)

`put`请求也一样不比较，直接更新

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 10,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 13,
    "_primary_term": 1
}
```

![image-20220702114356777](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.4.3.png)

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 11,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 14,
    "_primary_term": 1
}
```

![image-20220702114411621](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.3.4.4.png)

#### 4、更新同时增加属性

##### 1、不带`_update`使用`PUT`方式添加属性

1. url输入：http://192.168.56.10:9200/customer/external/1

2. 请求方式选择`PUT`
3. 请求体输入以下json

```json
{ 
    "name": "John",
    "age":20
}
```

4. 点击Send

可以看到请求成功了

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 12,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 15,
    "_primary_term": 1
}
```

![image-20220702232217493](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.4.1.1.png)

1. url输入：http://192.168.56.10:9200/customer/external/1

2. 请求方式选择`GET`

可以看到更新成功了

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 12,
    "_seq_no": 15,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "name": "John",
        "age": 20
    }
}
```

![image-20220702232336089](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.4.1.2.png)

##### 2、带`_update`使用`POST`方式添加属性

1. url输入： http://192.168.56.10:9200/customer/external/1/_update

2. 请求方式选择`POST`

3. 输入以下json，带`_update`方式需要使用"doc"

```json
{ 
    "doc":{ 
        "name": "John",
        "age":20
    }
}
```

4. 点击Send

响应为以下内容

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 12,
    "result": "noop",
    "_shards": {
        "total": 0,
        "successful": 0,
        "failed": 0
    },
    "_seq_no": 15,
    "_primary_term": 1
}
```

![image-20220702232645909](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.4.2.png)

:memo:PUT 和 POST 不带_updat

#### 5、删除数据

##### 1、删除某个数据

1. url输入： http://192.168.56.10:9200/customer/external/1

2. 请求方式选择`DELETE`

3. 点击Send

可以看到删除成功了，响应数据为以下内容

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "_version": 13,
    "result": "deleted",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 16,
    "_primary_term": 1
}
```

![image-20220702233438018](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.5.1.1.png)

查询数据可以发现，响应状态为`404`， "found"为**false**

```json
{
    "_index": "customer",
    "_type": "external",
    "_id": "1",
    "found": false
}
```

![image-20220702233900700](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.5.1.2.png)

##### 2、删除索引

1. url输入： http://192.168.56.10:9200/customer

2. 请求方式选择`DELETE`

3. 点击Send

响应的数据为以下内容

```json
{
    "acknowledged": true
}
```

![image-20220702234147259](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.5.2.1.png)

再次查询索引为`1`的数据，可以看到这次直接说**索引没有找到**

```json
{
    "error": {
        "root_cause": [
            {
                "type": "index_not_found_exception",
                "reason": "no such index [customer]",
                "resource.type": "index_expression",
                "resource.id": "customer",
                "index_uuid": "_na_",
                "index": "customer"
            }
        ],
        "type": "index_not_found_exception",
        "reason": "no such index [customer]",
        "resource.type": "index_expression",
        "resource.id": "customer",
        "index_uuid": "_na_",
        "index": "customer"
    },
    "status": 404
}
```

![image-20220702234516077](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.5.2.2.png)

#### 6、批量添加数据

##### 1、打开`Dev Tools`

浏览器输入url： http://192.168.56.10:5601/  ，在菜单栏点击`Dev Tools`

![GIF 2022-7-2 23-50-24](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.6.1.png)



##### 2、发送简单请求

批量添加数据格式

```json
{ action: { metadata }}\n
{ request body }\n
{ action: { metadata }}\n
{ request body }\n
```

执行以下语句，这些批量操作都是独立的，上一个失败并不会影响下一个的执行

`index`表示的是`新增`或`修改`

```json
POST customer/external/_bulk
{"index":{"_id":"1"}}
{"name": "John Doe" }
{"index":{"_id":"2"}}
{"name": "Jane Doe" }
```

响应的结果为

```json
#! Deprecation: [types removal] Specifying types in bulk requests is deprecated.
{
  "took" : 427,
  "errors" : false,
  "items" : [
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "1",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "customer",
        "_type" : "external",
        "_id" : "2",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 1,
        "_primary_term" : 1,
        "status" : 201
      }
    }
  ]
}

```

![image-20220702235847512](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.6.2.png)

##### 3、发送复杂请求

发送以下复杂请求

```json
POST /_bulk
{ "delete": { "_index": "website", "_type": "blog", "_id": "123" }}
{ "create": { "_index": "website", "_type": "blog", "_id": "123" }}
{ "title": "My first blog post" }
{ "index": { "_index": "website", "_type": "blog" }}
{ "title": "My second blog post" }
{ "update": { "_index": "website", "_type": "blog", "_id": "123", "retry_on_conflict" : 3} }
{ "doc" : {"title" : "My updated blog post"}}
```

响应的内容为

```json
#! Deprecation: [types removal] Specifying types in bulk requests is deprecated.
{
  "took" : 286,
  "errors" : false,
  "items" : [
    {
      "delete" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "123",
        "_version" : 1,
        "result" : "not_found",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 0,
        "_primary_term" : 1,
        "status" : 404
      }
    },
    {
      "create" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "123",
        "_version" : 2,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 1,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "index" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "f0hgvYEBNNJSS-0BkY3i",
        "_version" : 1,
        "result" : "created",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 2,
        "_primary_term" : 1,
        "status" : 201
      }
    },
    {
      "update" : {
        "_index" : "website",
        "_type" : "blog",
        "_id" : "123",
        "_version" : 3,
        "result" : "updated",
        "_shards" : {
          "total" : 2,
          "successful" : 1,
          "failed" : 0
        },
        "_seq_no" : 3,
        "_primary_term" : 1,
        "status" : 200
      }
    }
  ]
}

```

![image-20220703000443542](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.6.3.png)

##### 4、批量添加测试数据

输入以下数据，然后点击运行

[点击查看完整数据](code/5.1.3.6.4.txt)

![image-20220703001418445](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.6.4.png)

##### 5、查看索引

url输入： http://192.168.56.10:9200/_cat/indices

请求方式选择`GET`

点击Send

可以看到添加了以下索引

```
yellow open website                  wXyluvLtRWike6KwFEsecw 1 1    2 2   8.6kb   8.6kb
yellow open bank                     NP_JYORgQlSTFQyh1b3TzA 1 1 1000 0 427.9kb 427.9kb
green  open .kibana_task_manager_1   sl-lzQgzRF2K2l6P5FmlFQ 1 0    2 0  30.4kb  30.4kb
green  open .apm-agent-configuration pG-exF26R4yCs2jJOSwAcA 1 0    0 0    283b    283b
green  open .kibana_1                SSGlLaInQl-tlmJqLJA6Fw 1 0    8 0  25.3kb  25.3kb
yellow open customer                 EKZizrVgRfGj8NP-mDH3qw 1 1    2 0   3.5kb   3.5kb
```

![image-20220703001608270](https://gitlab.com/apzs/image/-/raw/master/image/5.1.3.6.5.png)



### 5.1.4、Elasticsearch进阶

参考文档：https://www.elastic.co/guide/en/elasticsearch/reference/7.5/getting-started-search.html

![GIF 2022-7-3 9-55-34](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.0.png)

#### 1、基本方式检索

ES 支持两种基本方式检索 : 

- 一个是通过使用 REST request URI 发送搜索参数（uri+检索参数） 

- 另一个是通过使用 REST request body 来发送它们（uri+请求体)

请求命令

```json
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
```

响应格式

```json
{
  "took" : 63,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
        "value": 1000,
        "relation": "eq"
    },
    "max_score" : null,
    "hits" : [ {
      "_index" : "bank",
      "_type" : "_doc",
      "_id" : "0",
      "sort": [0],
      "_score" : null,
      "_source" : {"account_number":0,"balance":16623,"firstname":"Bradshaw","lastname":"Mckenzie","age":29,"gender":"F","address":"244 Columbus Place","employer":"Euron","email":"bradshawmckenzie@euron.com","city":"Hobucken","state":"CO"}
    }, {
      "_index" : "bank",
      "_type" : "_doc",
      "_id" : "1",
      "sort": [1],
      "_score" : null,
      "_source" : {"account_number":1,"balance":39225,"firstname":"Amber","lastname":"Duke","age":32,"gender":"M","address":"880 Holmes Lane","employer":"Pyrami","email":"amberduke@pyrami.com","city":"Brogan","state":"IL"}
    }, ...
    ]
  }
}
```

> The response also provides the following information about the search request:
>
> - `took` – how long it took Elasticsearch to run the query, in milliseconds
> - `timed_out` – whether or not the search request timed out
> - `_shards` – how many shards were searched and a breakdown of how many shards succeeded, failed, or were skipped.
> - `max_score` – the score of the most relevant document found
> - `hits.total.value` - how many matching documents were found
> - `hits.sort` - the document’s sort position (when not sorting by relevance score)
> - `hits._score` - the document’s relevance score (not applicable when using `match_all`)

该响应还提供有关搜索请求的以下信息：

- `took`– Elasticsearch 运行查询需要多长时间，以毫秒为单位
- `timed_out`– 搜索请求是否超时
- `_shards`– 搜索了多少分片，以及多少分片成功、失败或被跳过的细分。
- `max_score`– 找到的最相关文档的分数
- `hits.total.value`- 找到了多少匹配的文档
- `hits.sort`- 文档的排序位置（不按相关性分数排序时）
- `hits._score`- 文档的相关性分数（使用时不适用`match_all`）

##### 1、使用`uri+检索参数`检索

> 通过使用 REST request URI 发送搜索参数（uri+检索参数）

在`kibana`中输入以下命令

```
GET bank/_search?q=*&sort=account_number:asc
```

`q=*`表示查询所有

`sort=account_number:asc`表示按照`account_number`升序排列

![image-20220703101549411](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.1.1.png)

##### 2、使用`uri+请求体`检索

> 通过使用 REST request body 来发送它们（uri+请求体)

在`kibana`中输入以下命令

```json
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ]
}
```

![image-20220703101733219](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.1.2.png)

##### 3、排序查询

也可以先按`account_number`升序，再按`balance`降序

```json
GET /bank/_search
{
  "query": { 
    "match_all": {} 
    
  },
  "sort": [
    { "account_number": "asc" },
    {"balance": "desc"}
  ]
}
```

[点击查看完整响应内容](code/5.1.4.1.3.json)

![image-20220703102151722](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.1.3.png)

##### 4、分页查询某些字段

`"from": 5,"size": 5,` ：从第5条数据开始，查询5条数据

`"_source": ["balance", "firstname"]` ：查询**balance**和 **firstname**字段

```json
GET bank/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "balance": {
        "order": "desc"
      }
    }
  ],
  "from": 5,
  "size": 5,
  "_source": ["balance", "firstname"]
}
```

![image-20220703103445049](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.1.4.png)

#### 2、`match`匹配查询

- **基本类型（非字符串），精确匹配**  -> `"account_number": "20"`match 返回 account_number=20 的

- **字符串，全文检索** -> `"address": "mill"`match 当搜索字符串类型的时候，会进行全文检索，并且每条记录有相关性得分。

- **字符串，多个单词（分词+全文检索）**-> `"address": "mill road"`最终查询出 address 中包含 mill 或者 road 或者 mill road 的所有记录，并给出相关性得分

##### 1、精确匹配

```json
GET bank/_search
{
  "query": {
    "match": {
      "account_number": 20
    }
  }
}
```

![image-20220703104726893](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.2.1.png)

##### 2、模糊匹配1

```json
GET bank/_search
{
  "query": {
    "match": {
      "address": "Kings"
    }
  }
}
```

可以看到`address`中包含有`Kings`的都检索出来了

![image-20220703105131244](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.2.2.png)

##### 3、模糊匹配2

```json
GET bank/_search
{
  "query": {
    "match": {
      "address": "mill lane"
    }
  }
}
```

可以看到，只要包含了`mill`或`lane`的都能查出来，其中`198 Mill Lane`的得分最高，默认按照**评分**由高到低排列 

![image-20220703114129813](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.2.3.png)

#### 3、`match_phrase`短语（不分词）匹配

将需要匹配的值当成一个整体单词（不分词）进行检索 -> `"address": "mill` 查出 address 中包含 mill road 的所有记录，并给出相关性得

```json
GET bank/_search
{
  "query": {
    "match_phrase": {
      "address": "mill lane"
    }
  }
}
```

此时只能查询出多个单词全存在的数据

![image-20220703115548296](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.3.1.png)

使用`match_phrase`匹配时必须指定字段包含该不分词的短语，但该字段不必须只包含该短语

```json
GET bank/_search
{
  "query": {
    "match_phrase": {
      "address": "789 Madison"
    }
  }
}
```

![image-20220703163827063](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.3.2.png)

使用`FIELD.keyword`匹配必须指定字段为该不分词的短语

```json
GET bank/_search
{
  "query": {
    "match": {
      "address.keyword": "789 Madison"
    }
  }
}
```

![image-20220703164459194](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.3.3.png)

#### 4、`multi_match`多字段匹配

多个字段其中有任何一个字段匹配

```json
GET bank/_search
{
  "query": {
    "multi_match": {
      "query": "mill",
      "fields": ["address","city"]
    }
  }
}
```

![image-20220703120032455](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.4.1.png)

```json
GET bank/_search
{
  "query": {
    "multi_match": {
      "query": "mill movico",
      "fields": ["address","city"]
    }
  }
}
```

可以看到多字段匹配用的也是`match匹配查询`,也查询出了包含**分词**的所有数据；包含的分词越多，得分越高

![image-20220703120314378](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.4.2.png)

#### 5、`bool`复合查询

> To construct more complex queries, you can use a `bool` query to combine multiple query criteria. You can designate criteria as required (must match), desirable (should match), or undesirable (must not match).

要构造更复杂的查询，您可以使用一个`bool`查询来组合多个查询条件。您可以根据需要（必须匹配）、需要（应该匹配）或不需要（必须不匹配）指定条件。

bool 用来做复合查询： 复合语句可以合并任何 其它查询语句，包括复合语句，了解这一点是很重要的。这就意味着，复合语句之间可以互相嵌套，可以表达非常复杂的逻辑。

> Each `must`, `should`, and `must_not` element in a Boolean query is referred to as a query clause. How well a document meets the criteria in each `must` or `should` clause contributes to the document’s *relevance score*. The higher the score, the better the document matches your search criteria. By default, Elasticsearch returns documents ranked by these relevance scores.
>
> The criteria in a `must_not` clause is treated as a *filter*. It affects whether or not the document is included in the results, but does not contribute to how documents are scored. You can also explicitly specify arbitrary filters to include or exclude documents based on structured data.

布尔查询中的每个`must`、`should`和`must_not`元素都称为查询子句。文档满足每个**`must`或 `should`**子句中的标准的程度会**影响文档的*相关性评分***。分数越高，文档越符合您的搜索条件。默认情况下，Elasticsearch 返回按这些相关性分数排序的文档。

子句中的条件**`must_not`**被视为*过滤器*。它影响文档是否包含在结果中，但**不影响文档的评分**方式。您还可以显式指定任意过滤器以根据结构化数据包含或排除文档。

##### 1、必须满足&必须不满足

> must：必须达到 must 列举的所有条件

必须满足`"gender": "M"`和` "address": "mill"`  必须不满足 `"age": "38" `

```json
GET bank/_search
{
  "query": {
    "bool": {
      "must":[
        {"match": {
          "gender": "M" 
        }},
        {"match": {
          "address": "mill"
        }}
      ],
      "must_not":[
        {"match": {
          "age": "38" 
        }}
      ]
    }
  }
}
```

![image-20220703121320710](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.5.1.png)

##### 2、应该匹配

> should：应该达到 should 列举的条件，如果达到会增加相关文档的评分，并不会改变查询的结果。如果 query 中只有 should 且只有一种匹配规则，那么 should 的条件就会被作为默认匹配条件而去改变查询结果

```json
GET bank/_search
{
  "query": {
    "bool": {
      "must":[
        {"match": {
          "gender": "M" 
        }},
        {"match": {
          "address": "mill"
        }}
      ],
      "must_not":[
        {"match": {
          "age": "18" 
        }}
      ],
      "should": [
        {"match": {
          "lastname": "Wallace"
        }}
      ]
    }
  }
}
```

![image-20220703122030654](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.5.2.png)

#### 6、`filter`结果过滤

可以看到使用`must`会有相关性得分

```json
GET bank/_search
{
  "query": {
    "bool": {
      "must": [
        {"range": {
            "age": {
              "gte": 18,
              "lte": 30
            }
          }
        },
        {"match": {
          "address": "mill"
        }}
      ]
    }
  }
}
```

![image-20220703160839346](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.6.1.png)

而使用`filter`没有相关性得分

```json
GET bank/_search
{
  "query": {
    "bool": {
      "filter": [
        {"range": {
            "age": {
              "gte": 18,
              "lte": 30
            }
          }
        },
        {"match": {
          "address": "mill"
        }}
      ]
    }
  }
}
```

![image-20220703161056920](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.6.2.png)

#### 7、`Term query`

`term`和`match`一样。匹配某个属性的值。全文检索字段用 match，其他非 text 字段匹配(精确的字段匹配)用 term。

参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/query-dsl-term-query.html

![GIF 2022-7-3 16-16-22](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.7.0.png)



**Term query**

> Returns documents that contain an **exact** term in a provided field.
>
> You can use the `term` query to find documents based on a precise value such as a price, a product ID, or a username.
>
> Avoid using the `term` query for [`text`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/text.html) fields.
>
> By default, Elasticsearch changes the values of `text` fields as part of [analysis](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis.html). This can make finding exact matches for `text` field values difficult.
>
> To search `text` field values, use the [`match`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/query-dsl-match-query.html) query instead.

**Term查询**

返回在提供的字段中包含**确切术语的文档。**

您可以使用`term`查询根据价格、产品 ID 或用户名等精确值查找文档。

避免使用字段`term`查询[`text`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/text.html)

默认情况下，Elasticsearch 会在[分析](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis.html)`text`过程中更改字段的值。这会使查找字段值的精确匹配变得困难`text`

要搜索`text`字段值，请改用[`match`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/query-dsl-match-query.html)查询。



使用`match`可以查询`"age": "28"`的数据

```json
GET bank/_search
{
  "query": {
    "match": {
      "age": "28"
    }
  }
}
```

![image-20220703162602367](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.7.1.png)

使用`term`也可以查询`"age": "28"`的数据，推荐使用`term`

```json
GET bank/_search
{
  "query": {
    "term": {
      "age": "28"
    }
  }
}
```

![image-20220703162642804](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.7.2.png)

使用`term`查询多字段`text`会查询不到

```json
GET bank/_search
{
  "query": {
    "term": {
      "address": "789 Madison Street"
    }
  }
}
```

![image-20220703163023175](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.7.3.png)

#### 8、`aggregations`执行聚合

参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations.html

![GIF 2022-7-3 21-44-17](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.0.png)

> The aggregations framework helps provide aggregated data based on a search query. It is based on simple building blocks called aggregations, that can be composed in order to build complex summaries of the data.
>
> An aggregation can be seen as a *unit-of-work* that builds analytic information over a set of documents. The context of the execution defines what this document set is (e.g. a top-level aggregation executes within the context of the executed query/filters of the search request).
>
> There are many different types of aggregations, each with its own purpose and output. To better understand these types, it is often easier to break them into four main families:
>
> - **[\*Bucketing\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-bucket.html)**
>
>   A family of aggregations that build buckets, where each bucket is associated with a *key* and a document criterion. When the aggregation is executed, all the buckets criteria are evaluated on every document in the context and when a criterion matches, the document is considered to "fall in" the relevant bucket. By the end of the aggregation process, we’ll end up with a list of buckets - each one with a set of documents that "belong" to it.
>
> - **[\*Metric\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-metrics.html)**
>
>   Aggregations that keep track and compute metrics over a set of documents.
>
> - **[\*Matrix\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-matrix.html)**
>
>   A family of aggregations that operate on multiple fields and produce a matrix result based on the values extracted from the requested document fields. Unlike metric and bucket aggregations, this aggregation family does not yet support scripting.
>
> - **[\*Pipeline\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-pipeline.html)**
>
>   Aggregations that aggregate the output of other aggregations and their associated metrics
>
> The interesting part comes next. Since each bucket effectively defines a document set (all documents belonging to the bucket), one can potentially associate aggregations on the bucket level, and those will execute within the context of that bucket. This is where the real power of aggregations kicks in: **aggregations can be nested!**

聚合框架有助于提供基于搜索查询的聚合数据。它基于称为聚合的简单构建块，可以组合这些块以构建复杂的数据摘要。

聚合可以看作是在一组文档上构建分析信息*的工作单元。*执行的上下文定义了该文档集是什么（例如，顶级聚合在搜索请求的已执行查询/过滤器的上下文中执行）。

有许多不同类型的聚合，每种都有自己的目的和输出。为了更好地理解这些类型，通常更容易将它们分为四个主要系列：

- **[\*分桶\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-bucket.html)**：构建存储桶的聚合系列，其中每个存储桶都与一个*键*和一个文档标准相关联。执行聚合时，将对上下文中的每个文档评估所有存储桶标准，并且当标准匹配时，该文档被认为“落入”相关存储桶中。在聚合过程结束时，我们将得到一个桶列表——每个桶都有一组“属于”它的文档。
- **[\*公制\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-metrics.html)**：跟踪和计算一组文档的指标的聚合。
- **[\*矩阵\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-matrix.html)**：对多个字段进行操作并根据从请求的文档字段中提取的值生成矩阵结果的聚合系列。与度量和桶聚合不同，这个聚合系列还不支持脚本。
- **[\*管道\*](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-aggregations-pipeline.html)**：聚合其他聚合及其相关指标的输出的聚合

接下来是有趣的部分。由于每个存储桶有效地定义了一个文档集（属于该存储桶的所有文档），因此可以潜在地将存储桶级别的聚合关联起来，并且这些聚合将在该存储桶的上下文中执行。这就是聚合真正强大的地方：**聚合可以嵌套！**

分桶聚合可以有子聚合（分桶或度量）。将为它们的父聚合生成的桶计算子聚合。嵌套聚合的级别/深度没有硬性限制（可以将聚合嵌套在“父”聚合下，该聚合本身是另一个更高级别聚合的子聚合）。

聚合对`double`数据的表示进行操作。因此，在绝对值大于 的 long 上运行时，结果可能是近似的`2^53`。

**结构化聚合**

以下代码片段捕获了聚合的基本结构：

```js
"aggregations" : {
    "<aggregation_name>" : {
        "<aggregation_type>" : {
            <aggregation_body>
        }
        [,"meta" : {  [<meta_data_body>] } ]?
        [,"aggregations" : { [<sub_aggregation>]+ } ]?
    }
    [,"<aggregation_name_2>" : { ... } ]*
}
```

JSON 中的`aggregations`对象（`aggs`也可以使用键）保存要计算的聚合。每个聚合都与用户定义的逻辑名称相关联（例如，如果聚合计算平均价格，那么命名它是有意义的`avg_price`）。这些逻辑名称也将用于唯一标识响应中的聚合。每个聚合都有一个特定的类型（`<aggregation_type>`在上面的代码片段中），并且通常是命名聚合体中的第一个键。每种类型的聚合都定义了自己的主体，具体取决于聚合的性质（例如`avg`特定字段的聚合将定义计算平均值的字段）。在聚合类型定义的同一级别，可以选择定义一组附加聚合，尽管这仅在您定义的聚合具有分桶性质时才有意义。在这种情况下，您在桶聚合级别上定义的子聚合将为桶聚合构建的所有桶计算。例如，如果您在聚合下定义了一组`range`聚合，则将为定义的范围存储桶计算子聚合。

**解释：**

聚合提供了从数据中分组和提取数据的能力。最简单的聚合方法大致等于 SQL GROUP BY 和 SQL 聚合函数。在 Elasticsearch 中，您有执行搜索返回 hits（命中结果），并且同时返 回聚合结果，把一个响应中的所有 hits（命中结果）分隔开的能力。这是非常强大且有效的， 您可以执行查询和多个聚合，并且在一次使用中得到各自的（任何一个的）返回结果，使用 一次简洁和简化的 API 来避免网络往返。

##### 1、简单聚合

   **搜索 address 中包含 mill 的所有人的年龄分布以及平均年龄，但不显示这些人的详情。**

1. 搜索 address 中包含 mill的

```json
GET bank/_search
{ 
  "query": { 
    "match": { 
      "address": "mill"
    }
  }
}
```

![image-20220703165619560](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.1.1.png)

2. 搜索 address 中包含 mill 的所有人的年龄分布

```json
GET bank/_search
{ 
  "query": { 
    "match": { 
      "address": "mill"
    }
  },
  "aggs": {
    "age_agg": { 
      "terms": { 
        "field": "age"
      }
    }
  }
}
```

![image-20220703165758939](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.1.2.png)

3. 搜索 address 中包含 mill 的所有人的年龄分布以及平均年龄

```json
GET bank/_search
{ 
  "query": { 
    "match": { 
      "address": "mill"
    }
  },
  "aggs": {
    "age_agg": { 
      "terms": { 
        "field": "age"
      }
    },
    "avg_age": {
      "avg": {
        "field": "age"
      }
    }
  }
}
```

![image-20220703165931194](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.1.3.png)

4. 搜索 address 中包含 mill 的所有人的年龄分布以及平均年龄，但不显示这些人的详情。

```json
GET bank/_search
{ 
  "query": { 
    "match": { 
      "address": "mill"
    }
  },
  "aggs": {
    "age_agg": { 
      "terms": { 
        "field": "age"
      }
    },
    "avg_age": {
      "avg": {
        "field": "age"
      }
    }
  },
  "size": 0
}
```

![image-20220703170051207](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.1.4.png)

size：0 不显示搜索数据 

aggs：执行聚合。

聚合语法如下

```json
 "aggs": { 
 	"aggs_name 这次聚合的名字，方便展示在结果集中": 
 		{ "AGG_TYPE 聚合的类型（avg,term,terms）": {} 
 		} 
 	},
```

##### 2、复杂聚合1

按照年龄聚合，并且请求这些年龄段的这些人的平均薪资

```json
GET bank/account/_search
{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "age_avg": {
      "terms": {
        "field": "age",
        "size": 1000
      },
      "aggs": {
        "banlances_avg": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
  ,"size": 1000
}
```

![image-20220703212016653](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.2.png)

##### 3、复杂聚合2

查出**所有年龄分布**，并且这些年龄段中**性别为 M 的平均薪资**和 **性别为F 的平均薪资**以及**这个年龄段的总体平均薪资**

```json
GET bank/_search
{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "age_agg": {
      "terms": {
        "field": "age",
        "size": 100
      },
      "aggs": {
        "balance_agg": {
          "terms": {
            "field": "gender.keyword",
            "size": 100
          },
          "aggs": {
            "balance_avg": {
              "avg": {
                "field": "balance"
              }
            }
          }
        },
        "balance_agg2": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}
```

![image-20220703213723229](https://gitlab.com/apzs/image/-/raw/master/image/5.1.4.8.3.png)

### 5.1.5、Elasticsearch映射

参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping.html

![GIF 2022-7-3 21-45-43](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.0.png)

> Mapping is the process of defining how a document, and the fields it contains, are stored and indexed. For instance, use mappings to define:
>
> - which string fields should be treated as full text fields.
> - which fields contain numbers, dates, or geolocations.
> - the [format](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-date-format.html) of date values.
> - custom rules to control the mapping for [dynamically added fields](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/dynamic-mapping.html).
>
> A mapping definition has:
>
> - **[Meta-fields](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-fields.html)**
>
>   Meta-fields are used to customize how a document’s metadata associated is treated. Examples of meta-fields include the document’s [`_index`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-index-field.html), [`_id`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-id-field.html), and [`_source`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-source-field.html) fields.
>
> - **[Fields](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-types.html) or \*properties\***
>
>   A mapping contains a list of fields or `properties` pertinent to the document.
>
> Each field has a data `type` which can be:
>
> - a simple type like [`text`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/text.html), [`keyword`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/keyword.html), [`date`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/date.html), [`long`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/number.html), [`double`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/number.html), [`boolean`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/boolean.html) or [`ip`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/ip.html).
> - a type which supports the hierarchical nature of JSON such as [`object`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/object.html) or [`nested`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/nested.html).
> - or a specialised type like [`geo_point`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/geo-point.html), [`geo_shape`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/geo-shape.html), or [`completion`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-suggesters.html#completion-suggester).
>
> It is often useful to index the same field in different ways for different purposes. For instance, a `string` field could be [indexed](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-index.html) as a `text` field for full-text search, and as a `keyword` field for sorting or aggregations. Alternatively, you could index a string field with the [`standard` analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-standard-analyzer.html), the [`english`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html#english-analyzer) analyzer, and the [`french` analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html#french-analyzer).
>
> This is the purpose of *multi-fields*. Most datatypes support multi-fields via the [`fields`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/multi-fields.html) parameter.

映射是定义文档及其包含的字段如何存储和索引的过程。例如，使用映射来定义：

- 哪些字符串字段应被视为全文字段。
- 哪些字段包含数字、日期或地理位置。
- 日期值的[格式](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-date-format.html)。
- 自定义规则来控制 [动态添加字段](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/dynamic-mapping.html)的映射。

映射定义具有：

- **[元字段](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-fields.html)**：元字段用于自定义如何处理文档的相关元数据。元字段的示例包括文档的 [`_index`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-index-field.html)、[`_id`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-id-field.html)和 [`_source`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-source-field.html)字段。
- **[字段](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-types.html)或属性**：映射包含`properties`与文档相关的字段列表。

每个字段都有一个数据`type`，可以是：

- 一个简单的类型，如[`text`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/text.html), [`keyword`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/keyword.html), [`date`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/date.html), [`long`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/number.html), [`double`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/number.html),[`boolean`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/boolean.html)或[`ip`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/ip.html).
- 一种支持 JSON 分层特性的类型，例如 [`object`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/object.html)或[`nested`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/nested.html).
- 或特殊类型，如[`geo_point`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/geo-point.html), [`geo_shape`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/geo-shape.html)或[`completion`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-suggesters.html#completion-suggester).

出于不同目的以不同方式索引同一字段通常很有用。例如，一个`string`字段可以被[索引](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-index.html)为一个`text`用于全文搜索的字段，也可以作为一个`keyword`用于排序或聚合的字段。[`standard`或者，您可以使用分析器](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-standard-analyzer.html)、 [`english`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html#english-analyzer)分析器和 [`french`分析器](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html#french-analyzer)索引字符串字段。

这就是*多领域*的目的。[`fields`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/multi-fields.html)大多数数据类型通过参数支持多字段。

#### 1、查询映射

> **View the mapping of an index**
>
> You can use the [get mapping](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/indices-get-mapping.html) API to view the mapping of an existing index.



```console
GET bank/_mapping
```

![image-20220703220410069](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.1.png)

#### 2、创建索引

新特性：Es7 及以上移除了 type 的概念。 

关系型数据库中两个数据表示是独立的，即使他们里面有相同名称的列也不影响使用， 但 ES 中不是这样的。elasticsearch 是基于 Lucene 开发的搜索引擎，而 ES 中不同 type 下名称相同的 filed 最终在 Lucene 中的处理方式是一样的。

- 两个不同 type 下的两个 user_name，在 ES 同一个索引下其实被认为是同一个 filed， 你必须在两个不同的 type 中定义相同的 filed 映射。否则，不同 type 中的相同字段 名称就会在处理中出现冲突的情况，导致 Lucene 处理效率下降。 
- 去掉 type 就是为了提高 ES 处理数据的效率。

数据类型参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-types.html

**Core datatypes**

- **string**：[`text`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/text.html) and [`keyword`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/keyword.html)
- **[Numeric](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/number.html)**：`long`, `integer`, `short`, `byte`, `double`, `float`, `half_float`, `scaled_float`
- **[Date](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/date.html)**：`date`
- **[Date nanoseconds](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/date_nanos.html)**：`date_nanos`
- **[Boolean](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/boolean.html)**：`boolean`
- **[Binary](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/binary.html)**：`binary`
- **[Range](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/range.html)**：`integer_range`, `float_range`, `long_range`, `double_range`, `date_range`

**Complex datatypes**

- **[Object](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/object.html)**：`object` for single JSON objects
- **[Nested](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/nested.html)**：`nested` for arrays of JSON objects

**Geo datatypes**

- **[Geo-point](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/geo-point.html)**：`geo_point` for lat/lon points
- **[Geo-shape](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/geo-shape.html)**：`geo_shape` for complex shapes like polygons

**Specialised datatypes**

- **[IP](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/ip.html)**：`ip` for IPv4 and IPv6 addresses
- **[Completion datatype](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-suggesters.html#completion-suggester)**：`completion` to provide auto-complete suggestions
- **[Token count](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/token-count.html)**：`token_count` to count the number of tokens in a string
- **[`mapper-murmur3`](https://www.elastic.co/guide/en/elasticsearch/plugins/7.5/mapper-murmur3.html)**：`murmur3` to compute hashes of values at index-time and store them in the index
- **[`mapper-annotated-text`](https://www.elastic.co/guide/en/elasticsearch/plugins/7.5/mapper-annotated-text.html)**：`annotated-text` to index text containing special markup (typically used for identifying named entities)
- **[Percolator](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/percolator.html)**：Accepts queries from the query-dsl
- **[Join](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/parent-join.html)**：Defines parent/child relation for documents within the same index
- **[Rank feature](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/rank-feature.html)**：Record numeric feature to boost hits at query time.
- **[Rank features](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/rank-features.html)**：Record numeric features to boost hits at query time.
- **[Dense vector](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/dense-vector.html)**：Record dense vectors of float values.
- **[Sparse vector](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/sparse-vector.html)**：Record sparse vectors of float values.
- **[Search-as-you-type](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-as-you-type.html)**：A text-like field optimized for queries to implement as-you-type completion
- **[Alias](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/alias.html)**：Defines an alias to an existing field.
- **[Flattened](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/flattened.html)**：Allows an entire JSON object to be indexed as a single field.
- **[Shape](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/shape.html)**：`shape` for arbitrary cartesian geometries.

**Arrays**

In Elasticsearch, arrays do not require a dedicated field datatype. Any field can contain zero or more values by default, however, all values in the array must be of the same datatype. See [Arrays](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/array.html).

**Multi-fields**

It is often useful to index the same field in different ways for different purposes. For instance, a `string` field could be mapped as a `text` field for full-text search, and as a `keyword` field for sorting or aggregations. Alternatively, you could index a text field with the [`standard` analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-standard-analyzer.html), the [`english`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html#english-analyzer) analyzer, and the [`french` analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html#french-analyzer).

This is the purpose of *multi-fields*. Most datatypes support multi-fields via the [`fields`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/multi-fields.html) parameter.



>  Create an index with an explicit mapping
>
> You can use the [create index](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/indices-create-index.html) API to create a new index with an explicit mapping.

```json
PUT /my_index
{
  "mappings": {
    "properties": {
      "age":    { "type": "integer" },  
      "email":  { "type": "keyword"  }, 
      "name":   { "type": "text"  }     
    }
  }
}
```

![image-20220703221239036](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.2.png)

#### 3、添加新的字段映射

>  **Add a field to an existing mapping**
>
> You can use the [put mapping](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/indices-put-mapping.html) API to add one or more new fields to an existing index.
>
> The following example adds `employee-id`, a `keyword` field with an [`index`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-index.html) mapping parameter value of `false`. This means values for the `employee-id` field are stored but not indexed or available for search.



```json
PUT /my_index/_mapping
{
  "properties": {
    "employee-id": {
      "type": "keyword",
      "index": false
    }
  }
}
```

![image-20220703221529151](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.3.png)

#### 4、更新映射

> **Update the mapping of a field**
>
> Except for supported [mapping parameters](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/mapping-params.html), you can’t change the mapping or field type of an existing field. Changing an existing field could invalidate data that’s already indexed.
>
> If you need to change the mapping of a field, create a new index with the correct mapping and [reindex](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/docs-reindex.html) your data into that index.
>
> Renaming a field would invalidate data already indexed under the old field name. Instead, add an [`alias`](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/alias.html) field to create an alternate field name.

对于已经存在的映射字段，我们不能更新。更新必须创建新的索引进行数据迁移

#### 5、数据迁移

##### 1、创建新的索引

可以使用`GET bank/_mapping`查看`bank`的映射信息，把结果复制下来，输入`PUT newbank`，并粘贴刚刚复制的结果，再删除`粘贴过来的结果`里的`"product" :{ }`(右括号随便在最后删除一个就行了)。然后点击`工具`图标，选择`Auto indent`格式化一下代码，再在里面修改映射信息

```json
PUT newbank
{
  "mappings" : {
      "properties" : {
        "account_number" : {
          "type" : "long"
        },
        "address" : {
          "type" : "text"
        },
        "age" : {
          "type" : "integer"
        },
        "balance" : {
          "type" : "long"
        },
        "city" : {
          "type" : "keyword"
        },
        "email" : {
          "type" : "keyword"
        },
        "employer" : {
          "type" : "keyword"
        },
        "firstname" : {
          "type" : "text"
        },
        "gender" : {
          "type" : "keyword"
        },
        "lastname" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "state" : {
          "type" : "keyword"
        }
      }
    }
}
```

![image-20220703223510809](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.5.1.png)

##### 2、迁移数据

可以不用`"type": "account"`

```json
POST _reindex
{
  "source": {
    "index": "bank",
    "type": "account"
  },
  "dest": {
    "index": "newbank"
  }
}
```

![image-20220703223839058](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.5.2.png)

##### 3、查询迁移的数据

```json
GET newbank/_search
```

可以看到都把数据放到`"_type" : "_doc"`默认类型上了

![image-20220703224129345](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.5.3.png)

#### 6、分词器

##### 1、内置分词器

**Built-in analyzer reference**

Elasticsearch ships with a wide range of built-in analyzers, which can be used in any index without further configuration:

- **[Standard Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-standard-analyzer.html)**

  The `standard` analyzer divides text into terms on word boundaries, as defined by the Unicode Text Segmentation algorithm. It removes most punctuation, lowercases terms, and supports removing stop words.

- **[Simple Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-simple-analyzer.html)**

  The `simple` analyzer divides text into terms whenever it encounters a character which is not a letter. It lowercases all terms.

- **[Whitespace Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-whitespace-analyzer.html)**

  The `whitespace` analyzer divides text into terms whenever it encounters any whitespace character. It does not lowercase terms.

- **[Stop Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-stop-analyzer.html)**

  The `stop` analyzer is like the `simple` analyzer, but also supports removal of stop words.

- **[Keyword Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-keyword-analyzer.html)**

  The `keyword` analyzer is a “noop” analyzer that accepts whatever text it is given and outputs the exact same text as a single term.

- **[Pattern Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-pattern-analyzer.html)**

  The `pattern` analyzer uses a regular expression to split the text into terms. It supports lower-casing and stop words.

- **[Language Analyzers](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-lang-analyzer.html)**

  Elasticsearch provides many language-specific analyzers like `english` or `french`.

- **[Fingerprint Analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-fingerprint-analyzer.html)**

  The `fingerprint` analyzer is a specialist analyzer which creates a fingerprint which can be used for duplicate detection.

参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/analysis-analyzers.html

![GIF 2022-7-3 23-05-38](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.1.png)

##### 2、测试分词器

参考文档： https://www.elastic.co/guide/en/elasticsearch/reference/7.5/test-analyzer.html

![GIF 2022-7-3 23-03-51](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.2.1.png)

英文使用默认分词器可以正常分词

```json
POST _analyze
{
  "analyzer": "whitespace",
  "text":     "The quick brown fox."
}
```

![image-20220703230840934](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.2.2.png)

中文使用默认分词器进行分词会出现问题，每个字会分成一个词

```json
POST _analyze
{
  "analyzer": "standard",
  "text":     "尚硅谷电商项目"
}
```

![image-20220703231203124](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.2.3.png)

##### 3、安装ik分词器

###### 1、下载地址

7.4.2版本的`elasticsearch`下载地址为： https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip

![GIF 2022-7-3 23-52-04](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.1.1.png)

![GIF 2022-7-4 0-05-10](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.1.2.png)



###### 2、下载插件

```bash
vagrant ssh
su root #使用root用户，密码默认为vagrant
docker ps	#查看docker运行的容器
docker exec -it elasticsearch  /bin/bash #以交互模式进入容器内部
pwd	#查看当前当前路径的完整路径
ls	#查看当前目录的子目录和文件
cd plugins/ #进入到plugins目录
ls	#查看当前目录的子目录和文件，可以看到什么都没有
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip #下载插件
exit #退出elasticsearch容器
```

下载插件提示`bash: wget: command not found`，这是因为容器内部非常纯净，没有这些命令

![image-20220704082240023](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.2.1.png)

由于设置了`elasticsearch容器`和外部`linux虚拟机`进行了关联，因此可以在`linux虚拟机`里下载插件

```bash
pwd
cd /mydata/elasticsearch/
ls
cd plugins/
wget
yum install wget	#安装wget
ls
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip –no-check-certificate  #添加参数 --no-check-certificate
systemctl stop firewalld		#关闭防火墙
wget https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.4.2/elasticsearch-analysis-ik-7.4.2.zip -no-check-certificate	#重新下载插件
```

![image-20220704092450119](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.2.2.png)



```bash
ls	#elasticsearch-analysis-ik-7.4.2.zip
pwd	#/mydata/elasticsearch/plugins
docker exec -it elasticsearch  /bin/bash
pwd  #/usr/share/elasticsearch
ls
cd plugins/
ls	#elasticsearch-analysis-ik-7.4.2.zip
exit;
```

![image-20220704094426265](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.2.3.png)

###### 3、安装插件

```bash
ll
unzip elasticsearch-analysis-ik-7.4.2.zip -d ./ik	#解压到当前目录的下的ik目录下，没有ik目录会自动创建
ll	#有elasticsearch-analysis-ik-7.4.2.zip 和 ik
cd ik	#进入ik目录
ll		#可以看到以成功解压到ik目录下了
cd ..	#退回到上级目录
rm -rf elasticsearch-analysis-ik-7.4.2.zip #删除elasticsearch-analysis-ik-7.4.2.zip压缩包
ll		# ik目录的权限为 drwxr-xr-x.
chmod -R 777 ik/ #改变uk目录及子目录的权限
ll		#此时ik目录的权限为 drwxrwxrwx.
```

![image-20220704110259788](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.3.1.png)



```bash
docker exec -it elasticsearch  /bin/bash #进入bash控制台
pwd
cd plugins/
ll
cd ../
ls
cd bin/
ls	#查看可执行文件
elasticsearch-plugin	#直接打出该可执行文件名，会提示一些信息
elasticsearch-plugin -h	#加 -h 显示帮助信息
#如果这一步报错，删掉 elasticsearch-analysis-ik-7.4.2.zip 压缩包
elasticsearch-plugin list #列出已安装的elasticsearch插件，可以看到ik分词器已经安装成功了
```

![image-20220704111821204](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.3.2.png)

###### 4、测试

发送以下数据

```json
POST _analyze
{
  "analyzer": "ik_smart",
  "text":     "尚硅谷电商项目"
}
```

响应了错误信息，`failed to find global analyzer [ik_smart]`

```json
{
  "error": {
    "root_cause": [
      {
        "type": "remote_transport_exception",
        "reason": "[104b52df3ff1][127.0.0.1:9300][indices:admin/analyze[s]]"
      }
    ],
    "type": "illegal_argument_exception",
    "reason": "failed to find global analyzer [ik_smart]"
  },
  "status": 400
}
```

![image-20220704154257454](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.4.1.png)

查看正在运行的dorcker容器，可以看到`elasticsearch`并没有停止运行

重启`elasticsearch`，再次发送请求看看还报不报错

![image-20220704154601415](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.4.2.png)

打开`kibana`可以看到报了以下错误，这个不用管，等一会就能加载出来了

```
Cannot connect to the Elasticsearch cluster
See the Kibana logs for details and try reloading the page.
```

![image-20220704154525819](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.4.3.png)

重新发送请求，可以看到已经可以分词了

![image-20220704154658284](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.3.4.4.png)

```json
{
  "tokens" : [
    {
      "token" : "尚",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "<IDEOGRAPHIC>",
      "position" : 0
    },
    {
      "token" : "硅",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "<IDEOGRAPHIC>",
      "position" : 1
    },
    {
      "token" : "谷",
      "start_offset" : 2,
      "end_offset" : 3,
      "type" : "<IDEOGRAPHIC>",
      "position" : 2
    },
    {
      "token" : "电",
      "start_offset" : 3,
      "end_offset" : 4,
      "type" : "<IDEOGRAPHIC>",
      "position" : 3
    },
    {
      "token" : "商",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "<IDEOGRAPHIC>",
      "position" : 4
    },
    {
      "token" : "项",
      "start_offset" : 5,
      "end_offset" : 6,
      "type" : "<IDEOGRAPHIC>",
      "position" : 5
    },
    {
      "token" : "目",
      "start_offset" : 6,
      "end_offset" : 7,
      "type" : "<IDEOGRAPHIC>",
      "position" : 6
    }
  ]
}

```

##### 4、使用`Xshell`连接linux虚拟机

###### 1、设置可以使用root用户登录

```bash
#注意要在管理员方式修改
vi /etc/ssh/sshd_config #修改 PasswordAuthentication no 这一行为 PasswordAuthentication yes
#如果是生产环境可以先执行 service sshd reload ，不行再执行以下命令
service sshd restart
```

![GIF 2022-7-4 10-16-49](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.4.1.png)



![image-20220704112850026](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.4.2.png)

###### 2、使用`Xshell`连接

![GIF 2022-7-4 11-37-44](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.4.3.png)

###### 3、如果`ping`不通

```bash
ping baidu.com	#ping百度
cd /etc/sysconfig/network-scripts/
ls
ip addr	#查看ip配置
vi ifcfg-eth1 #编辑eth1网卡配置，内容在后面
service network restart #重启服务
ping baidu.com #再次ping百度
```

![image-20220704164200697](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.4.4.png)

修改`ifcfg-eth1`为以下内容

```
#VAGRANT-BEGIN
# The contents below are automatically generated by Vagrant. Do not modify.
NM_CONTROLLED=yes
BOOTPROTO=none
ONBOOT=yes
IPADDR=192.168.56.10
NETMASK=255.255.255.0
GATEWAY=192.168.56.1
DNS1=114.114.114.114
DNS2=8.8.8.8
DEVICE=eth1
PEERDNS=no
#VAGRANT-END
```

![image-20220704163508579](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.4.5.png)

###### 4、修改yum源

如果不能正常使用yum，可以修改yum源  如果可以正常使用就不用修改

**老师提供的方法**

```bash
#备份原 yum 源，如果失败了也不要紧，直接使用新 yum 源
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
#使用新 yum 源
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo
yum makecach #生成缓存
```

**我的方法**

```
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

如果找不到`yum-config-manager`可以先安装`yum-utils`

```
yum install -y yum-utils
```

##### 5、使用`ik分词器`

###### 1、`ik_smart`

```
POST _analyze
{
  "analyzer": "ik_smart",
  "text":     "我是中国人"
}
```

响应内容为

```json
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "CN_CHAR",
      "position" : 0
    },
    {
      "token" : "是",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "CN_CHAR",
      "position" : 1
    },
    {
      "token" : "中国人",
      "start_offset" : 2,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 2
    }
  ]
}
```

![image-20220704155931269](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.5.1.png)

###### 2、`ik_max_word`

```json
POST _analyze
{
  "analyzer": "ik_max_word",
  "text":     "我是中国人"
}
```

响应内容为

```json
{
  "tokens" : [
    {
      "token" : "我",
      "start_offset" : 0,
      "end_offset" : 1,
      "type" : "CN_CHAR",
      "position" : 0
    },
    {
      "token" : "是",
      "start_offset" : 1,
      "end_offset" : 2,
      "type" : "CN_CHAR",
      "position" : 1
    },
    {
      "token" : "中国人",
      "start_offset" : 2,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 2
    },
    {
      "token" : "中国",
      "start_offset" : 2,
      "end_offset" : 4,
      "type" : "CN_WORD",
      "position" : 3
    },
    {
      "token" : "国人",
      "start_offset" : 3,
      "end_offset" : 5,
      "type" : "CN_WORD",
      "position" : 4
    }
  ]
}
```

![image-20220704160053774](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.6.5.2.png)

##### 7 、自定义分词

###### 1、修改docker启动参数

```bash
docker ps	#查看elasticsearch的id  也可以使用 docker ps -a 命令
systemctl stop docker.socket #停止这个服务，否则docker是没办法停止的
systemctl stop docker	#停止docker
docker  ps	#再次查看是否有启动的docker容器
cd /var/lib/docker/containers/ #进入到该目录
ll
cd 104b52df3ff1fe34c3373deab5c2b4248accd8113ab302092124b8e33abd1936/ #进入到elasticsearch的配置目录
ll
vi config.v2.json	#修改该文件
```

![image-20220704180359012](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.1.1.png)

在`命令模式`下输入`/Env`,即可找到`Env`的配置

![image-20220704180417552](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.1.2.png)

将

```
"Env":["discovery.type=single-node","ES_JAVA_OPTS=-Xms64m -Xmx128m"
```

中的第二个`-Xmx128m`修改为`-Xmx512m`

```
"Env":["discovery.type=single-node","ES_JAVA_OPTS=-Xms64m -Xmx512m"
```

![image-20220704180434186](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.1.3.png)

启动docker

```bash
systemctl start docker
docker ps
```

![image-20220704180514500](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.1.4.png)

**方法二**：删掉容器，重新运行(设置目录挂载后，linux虚拟机保存的有elasticsearch的数据)

```bash
docker stop elasticsearch
docker rm elasticsearch

docker run --name elasticsearch -p 9200:9200 -p 9300:9300 \
-e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms64m -Xmx512m" \
-v /mydata/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
-v /mydata/elasticsearch/data:/usr/share/elasticsearch/data \
-v /mydata/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-d elasticsearch:7.4.2
```

###### 2、安装nginx

1. 随便启动一个 nginx 实例，只是为了复制出配置

```bash
cd /mydata/
pwd
mkdir nginx
ls
docker images
docker run -p 80:80 --name nginx -d nginx:1.10
docker ps
docker container cp nginx:/etc/nginx .
ls
cd nginx/
ls
docker stop nginx
docker rm nginx
cd ..
ls
mv nginx conf
ls
mkdir nginx
mv conf nginx/
ls
cd nginx/
ls
```

![image-20220704214746137](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.2.1.png)



```bash
docker run -p 80:80 --name nginx \
-v /mydata/nginx/html:/usr/share/nginx/html \
-v /mydata/nginx/logs:/var/log/nginx \
-v /mydata/nginx/conf:/etc/nginx \
-d nginx:1.10
```

![image-20220704215810549](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.2.2.png)

直接访问成功了

![image-20220704215856601](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.2.3.png)

可以新建个`index.html`页面，`nginx`会默认展示

```bash
cd html/
ls
vi index.html
```

![image-20220704220228317](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.2.4.png)

`index.html`内容如下

```html
<h1>Gulimall</h1>
```

![image-20220704220241956](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.2.5.png)

刷新网页，可以看到已经访问成功了

![image-20220704220348395](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.2.6.png)

###### 3、创建文件

```bash
mkdir es
ls
cd es
ls
vi fenci.txt	#修改的内容在下面
ls
pwd
```

![image-20220704221232608](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.3.1.png)

```
尚硅谷
乔碧罗
```

![image-20220704220825269](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.3.2.png)

通过浏览器已经访问到了，就是会乱码

```
http://192.168.56.10/es/fenci.txt
```

![image-20220704221010673](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.3.3.png)

###### 4、修改分词器设置

1. 修改配置

```bash
cd /mydata/
ls
cd elasticsearch/
ls
cd plugins/
ls
cd ik/
cd config/
ls
vi IKAnalyzer.cfg.xml	#修改的内容在下面
docker ps
docker restart elasticsearch
```

![image-20220704222141745](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.4.1.png)

2. 修改以下配置

将`IKAnalyzer.cfg.xml`文件的以下配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 -->
        <entry key="ext_dict"></entry>
         <!--用户可以在这里配置自己的扩展停止词字典-->
        <entry key="ext_stopwords"></entry>
        <!--用户可以在这里配置远程扩展字典 -->
        <!-- <entry key="remote_ext_dict">words_location</entry> -->
        <!--用户可以在这里配置远程扩展停止词字典-->
        <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

修改为：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 -->
        <entry key="ext_dict"></entry>
         <!--用户可以在这里配置自己的扩展停止词字典-->
        <entry key="ext_stopwords"></entry>
        <!--用户可以在这里配置远程扩展字典 -->
        <entry key="remote_ext_dict">http://192.168.56.10/es/fenci.txt</entry>
        <!--用户可以在这里配置远程扩展停止词字典-->
        <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

![image-20220704223849920](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.4.2.png)

3. 设置`nginx`开机自启

```bash
docker update nginx --restart=always
```

![image-20220704222845488](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.4.3.png)

4、发送请求测试

在`kibana`里发送请求

```
POST _analyze
{
  "analyzer": "ik_max_word",
  "text":     "尚硅谷电商项目"
}
```

响应了以下内容，可以看到`尚硅谷`已经变为一个词了

```
{
  "tokens" : [
    {
      "token" : "尚硅谷",
      "start_offset" : 0,
      "end_offset" : 3,
      "type" : "CN_WORD",
      "position" : 0
    },
    {
      "token" : "硅谷",
      "start_offset" : 1,
      "end_offset" : 3,
      "type" : "CN_WORD",
      "position" : 1
    },
    {
      "token" : "电",
      "start_offset" : 3,
      "end_offset" : 4,
      "type" : "CN_CHAR",
      "position" : 2
    },
    {
      "token" : "商",
      "start_offset" : 4,
      "end_offset" : 5,
      "type" : "CN_CHAR",
      "position" : 3
    },
    {
      "token" : "项目",
      "start_offset" : 5,
      "end_offset" : 7,
      "type" : "CN_WORD",
      "position" : 4
    }
  ]
}
```

![image-20220704223544598](https://gitlab.com/apzs/image/-/raw/master/image/5.1.5.7.4.4.png)

### 5.1.6、ElasticSearch整合SpringBoot

#### 1、创建模块

##### 1、新建模块

使用`Spring Initializr`新建`gulimall-search`模块

```
com.atguigu.gulimall
gulimall-search
ElasticSearch检索服务
com.atguigu.gulimall.search
```

![image-20220704225014605](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.1.1.1.png)

勾选`Web`里的`Spring Web`

![image-20220704225155092](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.1.1.2.png)

点击`Finish`

![image-20220704225216664](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.1.1.3.png)

##### 2、修改`pom`文件

删除刚刚新建的`gulimall-search`模块，只保留以下内容

```xml
<groupId>com.atguigu.gulimall</groupId>
<artifactId>gulimall-search</artifactId>
<version>0.0.1-SNAPSHOT</version>
<name>gulimall-search</name>
<description>ElasticSearch检索服务</description>
<properties>
	<java.version>1.8</java.version>
</properties>
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>

	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>
</dependencies>
```

复制别的模块的`pom`文件，粘贴到此模块，并用刚刚复制到本模块的部分替换掉复制的别的`pom`文件的以上部分

[点击查看完整`pom`文件](code/5.1.6.1.2.pom.xml)

![image-20220704225703934](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.1.4.png)

##### 3、修改`GulimallSearchApplicationTests`

复制别的模块的测试类，替换掉本模块的`gulimall-search`的测试类

```java
package com.atguigu.gulimall.search;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallSearchApplicationTests {

	@Test
	void contextLoads() {
	}

}
```

![image-20220704225713936](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.1.5.png)

#### 2、添加依赖

##### 1、添加`elasticsearch`依赖

方法一：可以添加以下依赖

```xml
<dependency>
   <groupId>org.elasticsearch</groupId>
   <artifactId>elasticsearch</artifactId>
   <version>7.4.2</version>
</dependency>
```

![image-20220704231617067](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.2.1.1.png)

方法二：也可以添加以下依赖(老师的做法)

```java
<dependency>
   <groupId>org.elasticsearch.client</groupId>
   <artifactId>elasticsearch-rest-high-level-client</artifactId>
   <version>7.4.2</version>
</dependency>
```

添加这个依赖时，`elasticsearch`的版本不对，这是因为父工程(`spring-boot-starter-parent`工程)指定了版本

![image-20220704232041878](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.2.1.2.png)

可以在`properties`标签内添加如下配置，可以看到版本已经为`7.4.2`了

```java
<elasticsearch.version>7.4.2</elasticsearch.version>
```

![image-20220704232238992](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.2.1.3.png)

##### 2、添加`gulimall-common`依赖

```java
<dependency>
   <groupId>com.atguigu.gulimall</groupId>
   <artifactId>gulimall-common</artifactId>
   <version>0.0.1-SNAPSHOT</version>
</dependency>
```

![image-20220704232349073](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.2.2.png)

#### 3、整合`nacos`

在`src/main/resources/application.properties`文件内添加如下配置

```properties
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

spring.application.name=gulimall-search
```

![image-20220705000055994](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.3.1.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplication`启动类上添加如下注解

```
@EnableDiscoveryClient
```

![image-20220705094129895](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.3.2.png)

#### 4、添加配置类

参考文档：[Java REST Client [7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/index.html)

在`com.atguigu.gulimall.search`包下新建`config`文件夹，在`config`文件夹下新建`GulimallElasticSearchConfig`配置类

配置类写以下代码：

参考文档：[Initialization | Java REST Client [7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-getting-started-initialization.html)

```java
package com.atguigu.gulimall.search.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 无名氏
 * @date 2022/7/5
 * @Description:
 */
@Configuration
public class GulimallElasticSearchConfig {

    @Bean
    public RestHighLevelClient esRestClient(){
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost("192.168.56.10",9200,"http")
                )
        );
        return client;
    }
}
```

![image-20220705094725899](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.4.1.png)

查看官方文档：[Initialization | Java REST Client [7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-getting-started-initialization.html)

![GIF 2022-7-5 11-03-00](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.4.2.gif)

![GIF 2022-7-5 11-04-49](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.4.3.gif)

#### 5、测试`RestHighLevelClient`

在`com.atguigu.gulimall.search.GulimallSearchApplicationTests`里对`RestHighLevelClient`进行测试

```java
package com.atguigu.gulimall.search;

import org.elasticsearch.client.RestHighLevelClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallSearchApplicationTests {

	@Autowired
	RestHighLevelClient client;

	@Test
	public void contextLoads() {
		System.out.println(client);
	}

}
```

报了以下错误

```
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [com.zaxxer.hikari.HikariDataSource]: Factory method 'dataSource' threw exception; nested exception is org.springframework.boot.autoconfigure.jdbc

Caused by: org.springframework.boot.autoconfigure.jdbc.DataSourceProperties$DataSourceBeanCreationException: Failed to determine a suitable driver class at org.springframework.boot.autoconfigure.jdbc.DataSourceProperties.determineDriverClassName(DataSourceProperties.java:233)
```

![image-20220705095233329](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.5.1.png)

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplication`启动类里排除数据源

```java
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```

![image-20220705095714653](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.5.2.png)

再次测试，就成功了

![image-20220705095918284](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.5.3.png)

#### 6、测试`RequestOptions`

```java
public static final RequestOptions COMMON_OPTIONS;

static {
    RequestOptions.Builder builder = RequestOptions.DEFAULT.toBuilder();
    //builder.addHeader("Authorization", "Bearer", TOCKEN);
    //builder.setHttpAsyncResponseConsumerFactory(
    //        new HttpAsyncResponseConsumerFactory
    //                .HeapBufferedResponseConsumerFactory(30 * 1024 * 1024 * 1024)
    //);
    COMMON_OPTIONS = builder.build();
}
```

![image-20220705103750458](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.6.1.png)

查看官方文档：[Performing requests | Elasticsearch Java API Client [7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/7.17/java-rest-low-usage-requests.html#java-rest-low-usage-request-options)

![GIF 2022-7-5 11-15-07](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.6.2.gif)

#### 7、存储或更新数据到es

先使用`kibana`发送请求查询`users`，可以看到没有查到数据

```
GET users/_search
```

![image-20220705115436492](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.7.1.png)

添加测试方法，然后运行测试方法

```java
/**
 * 存储或更新数据到es
 * @throws IOException
 */
@Test
public void indexData() throws IOException {
   IndexRequest indexRequest = new IndexRequest("users");
   //数据的id
   indexRequest.id("1");

   //indexRequest.source("userName","zhangsan","age",18,"gender","男");
   User user = new User();
   String jsonString = JSON.toJSONString(user);
   //要保存的内容
   indexRequest.source(jsonString, XContentType.JSON);

   //执行操作
   IndexResponse indexResponse = client.index(indexRequest, GulimallElasticSearchConfig.COMMON_OPTIONS);

   //提取有用的响应信息
   System.out.println(indexResponse);
}

@Data
class User{
   private String userName;
   private String gender;
   private Integer age;
}
```

![image-20220705115450695](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.7.2.png)

再次发送请求，可以看到已经查到数据了

```
GET users/_search
```

![image-20220705115539967](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.7.3.png)

 查看官方文档：[Index API | Java REST Client [7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-document-index.html)

![GIF 2022-7-5 11-27-50](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.7.4.gif)

完整`GulimallSearchApplicationTests`类代码

```java
package com.atguigu.gulimall.search;

import com.alibaba.fastjson.JSON;
import com.atguigu.gulimall.search.config.GulimallElasticSearchConfig;
import lombok.Data;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallSearchApplicationTests {

   @Autowired
   RestHighLevelClient client;

   @Test
   public void indexData() throws IOException {
      IndexRequest indexRequest = new IndexRequest("users");
      //数据的id
      indexRequest.id("1");

      //indexRequest.source("userName","zhangsan","age",18,"gender","男");
      User user = new User();
      String jsonString = JSON.toJSONString(user);
      //要保存的内容
      indexRequest.source(jsonString, XContentType.JSON);

      //执行操作
      IndexResponse indexResponse = client.index(indexRequest, GulimallElasticSearchConfig.COMMON_OPTIONS);

      //提取有用的响应信息
      System.out.println(indexResponse);
   }

   @Data
   class User{
      private String userName;
      private String gender;
      private Integer age;
   }


   @Test
   public void contextLoads() {
      System.out.println(client);
   }
}
```

#### 8、从es中查询数据

 查看官方文档：https://www.elastic.co/guide/en/elasticsearch/client/java-rest/current/java-rest-high-search.html

![GIF 2022-7-5 15-35-51](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.0.png)

##### 1、想要完成的请求

```json
GET bank/_search
{
  "query": {
    "match": {
      "address": "mill"
    }
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 10
      }
    },
    "ageAvg": {
      "avg": {
        "field": "age"
      }
    },
    "balanceAvg": {
      "avg": {
        "field": "balance"
      }
    }
  },
  "size": 0
}
```

##### 2、添加`searchData`方法

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplicationTests`测试类中添加以下方法

```java
@Test
public void searchData() throws IOException {
   //1、创建检索请求
   SearchRequest searchRequest = new SearchRequest();
   //指定索引
   searchRequest.indices("bank");

   //指定DSL，检索条件
   SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
   //sourceBuilder.query();
   //sourceBuilder.from();
   //sourceBuilder.size();
   //sourceBuilder.aggregation()
   sourceBuilder.query(QueryBuilders.matchQuery("address","mill"));

   TermsAggregationBuilder ageAgg = AggregationBuilders.terms("ageAgg").field("age").size(10);
   sourceBuilder.aggregation(ageAgg);
   AvgAggregationBuilder ageAvg = AggregationBuilders.avg("ageAvg").field("age");
   sourceBuilder.aggregation(ageAvg);
   AvgAggregationBuilder balanceAvg = AggregationBuilders.avg("balanceAvg").field("balance");
   sourceBuilder.aggregation(balanceAvg);

   sourceBuilder.size(0);
   System.out.println(sourceBuilder);

   searchRequest.source(sourceBuilder);

   //2、执行检索
   SearchResponse searchResponse = client.search(searchRequest,GulimallElasticSearchConfig.COMMON_OPTIONS);

   //3、分析结果
   System.out.println(searchResponse);
}
```

![image-20220705163443871](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.1.png)

##### 3、对比请求

###### 1、想要完成的请求

```json
# 搜索 address 中包含 mill 的所有人的年龄分布以及平均年龄，但不显示这些人的详情。
GET bank/_search
{
  "query": {
    "match": {
      "address": "mill"
    }
  },
  "aggs": {
    "ageAgg": {
      "terms": {
        "field": "age",
        "size": 10
      }
    },
    "ageAvg": {
      "avg": {
        "field": "age"
      }
    },
    "balanceAvg": {
      "avg": {
        "field": "balance"
      }
    }
  },
  "size": 0
}
```

![image-20220705163319010](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.2.png)

###### 2、实际发送的请求

可以看到，除了 添加了一些 **默认查询条件** 和 **顺序** 不同外其他想要的查询条件都正确

```json
GET bank/_search
{
	"size": 0,
	"query": {
		"match": {
			"address": {
				"query": "mill",
				"operator": "OR",
				"prefix_length": 0,
				"max_expansions": 50,
				"fuzzy_transpositions": true,
				"lenient": false,
				"zero_terms_query": "NONE",
				"auto_generate_synonyms_phrase_query": true,
				"boost": 1.0
			}
		}
	},
	"aggregations": {
		"ageAgg": {
			"terms": {
				"field": "age",
				"size": 10,
				"min_doc_count": 1,
				"shard_min_doc_count": 0,
				"show_term_doc_count_error": false,
				"order": [{
					"_count": "desc"
				}, {
					"_key": "asc"
				}]
			}
		},
		"ageAvg": {
			"avg": {
				"field": "age"
			}
		},
		"balanceAvg": {
			"avg": {
				"field": "balance"
			}
		}
	}
}
```

![image-20220705163214803](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.3.png)

##### 4、响应的数据

可以看到 **想要的响应** 和 **实际接收的响应** 一样

###### 1、想要的响应

```json
{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 4,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  },
  "aggregations" : {
    "ageAgg" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : 38,
          "doc_count" : 2
        },
        {
          "key" : 28,
          "doc_count" : 1
        },
        {
          "key" : 32,
          "doc_count" : 1
        }
      ]
    },
    "ageAvg" : {
      "value" : 34.0
    },
    "balanceAvg" : {
      "value" : 25208.0
    }
  }
}
```

###### 2、实际接收的响应

```json
{
	"took": 9,
	"timed_out": false,
	"_shards": {
		"total": 1,
		"successful": 1,
		"skipped": 0,
		"failed": 0
	},
	"hits": {
		"total": {
			"value": 4,
			"relation": "eq"
		},
		"max_score": null,
		"hits": []
	},
	"aggregations": {
		"lterms#ageAgg": {
			"doc_count_error_upper_bound": 0,
			"sum_other_doc_count": 0,
			"buckets": [{
				"key": 38,
				"doc_count": 2
			}, {
				"key": 28,
				"doc_count": 1
			}, {
				"key": 32,
				"doc_count": 1
			}]
		},
		"avg#ageAvg": {
			"value": 34.0
		},
		"avg#balanceAvg": {
			"value": 25208.0
		}
	}
}
```

##### 5、获取响应的实体类信息

###### 1、修改代码

修改`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplicationTests`测试类中`searchData`方法

将`sourceBuilder.size(0);`注释掉，并添加获取响应信息的代码

```java
@Test
public void searchData() throws IOException {
   //1、创建检索请求
   SearchRequest searchRequest = new SearchRequest();
   //指定索引
   searchRequest.indices("bank");

   //指定DSL，检索条件
   SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
   //sourceBuilder.query();
   //sourceBuilder.from();
   //sourceBuilder.size();
   //sourceBuilder.aggregation()
   sourceBuilder.query(QueryBuilders.matchQuery("address","mill"));

   TermsAggregationBuilder ageAgg = AggregationBuilders.terms("ageAgg").field("age").size(10);
   sourceBuilder.aggregation(ageAgg);
   AvgAggregationBuilder ageAvg = AggregationBuilders.avg("ageAvg").field("age");
   sourceBuilder.aggregation(ageAvg);
   AvgAggregationBuilder balanceAvg = AggregationBuilders.avg("balanceAvg").field("balance");
   sourceBuilder.aggregation(balanceAvg);

   //sourceBuilder.size(0);
   System.out.println(sourceBuilder);

   searchRequest.source(sourceBuilder);

   //2、执行检索
   SearchResponse searchResponse = client.search(searchRequest,GulimallElasticSearchConfig.COMMON_OPTIONS);

   //3、分析结果
   System.out.println(searchResponse);
   SearchHits hits = searchResponse.getHits();
   SearchHit[] searchHits = hits.getHits();
   /*
    {"_index" : "bank",
       "_type" : "account",
       "_id" : "472",
       "_score" : 5.4032025,
       "_source" : {}}
    */
   for (SearchHit hit : searchHits) {
      String string = hit.getSourceAsString();
      Account account = JSON.parseObject(string, Account.class);
      System.out.println("account:"+account);
   }
}

@ToString
@Data
static class Account{
      private int account_number;
      private int balance;
      private String firstname;
      private String lastname;
      private int age;
      private String gender;
      private String address;
      private String employer;
      private String email;
      private String city;
      private String state;
}
```

![image-20220705173535957](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.5.1.png)

###### 2、测试

可以看到已经封装到`Account`类里了

![image-20220705174229410](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.5.2.png)

##### 6、获取响应的分析数据

在`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplicationTests`测试类中`searchData`方法里添加如下代码：

```java
//3.2、获取这次检索的分析信息
Aggregations aggregations = searchResponse.getAggregations();
Terms ageAgg1 = aggregations.get("ageAgg");
for (Terms.Bucket bucket : ageAgg1.getBuckets()) {
   String keyAsString = bucket.getKeyAsString();
   System.out.println("年龄："+keyAsString+"==>"+bucket.getDocCount());
}
Avg balanceAvg1 = aggregations.get("balanceAvg");
System.out.println("平均薪资："+balanceAvg1.getValue());
```

进行测试，可以发现已经打印出数据了

![image-20220705175850431](https://gitlab.com/apzs/image/-/raw/master/image/5.1.6.8.6.png)

##### 7、完整代码

`gulimall-search`模块的`com.atguigu.gulimall.search.GulimallSearchApplicationTests`测试类的完整代码

[点击查看`GulimallSearchApplicationTests`类完整代码](code/5.1.6.8.7.java)

## 5.2、商城业务-商品上架

### 5.2.1、sku在es中存储模型分析

`"index": false,` 不可以被检索，但可以查询(可以通过`skuTitle`检索查出`skuImg`，但不可以通过`skuImg`检索)

`"doc_values": false` 不可以做聚合、排序、脚本等操作，这样会省一些内存

` "type": "nested",` 该字段是集合，防止扁平化处理

<span style="color:red">~~这里的`skuPrice`的`type`不要设置为`double`，在`SkuEsModel`类里的`skuPrice`设置的类型为`BigDecimal`，`Elasticsearch`不支持`java`里的`BigDecimal`转换为`Elasticsearch`里的`double`~~(在`Elasticsearch`里，~~设置的`skuPrice`的属性类型为`keyword`也不行~~，设置的`skuPrice`的属性类型为`keyword`可以，我代码里没有设置`skuImg`和`skuPrice`所以不行)</span>

```json
PUT product
{
  "mappings": {
    "properties": {
      "skuId": {
        "type": "long"
      },
      "spuId": {
        "type": "keyword"
      },
      "skuTitle": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "skuPrice": {
        "type": "keyword"
      },
      "skuImg": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "saleCount": {
        "type": "long"
      },
      "hasStock": {
        "type": "boolean"
      },
      "hotScore": {
        "type": "long"
      },
      "brandId": {
        "type": "long"
      },
      "catalogId": {
        "type": "long"
      },
      "brandName": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "brandImg": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
      "catalogName": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      },
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
      }
    }
  }
}
```

![image-20220705230422564](https://gitlab.com/apzs/image/-/raw/master/image/5.2.1.png)

### 5.2.2、扁平化处理

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.0.png" alt="image-20220721204015448" style="zoom: 50%;" />

查看官方文档：https://www.elastic.co/guide/en/elasticsearch/reference/8.3/nested.html

![5.2.1.1.2.0](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.0.gif)

#### 1、不加入`nested`

```json
PUT my_index2/_doc/1
{
  "group" : "fans",
  "user" : [ 
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}
```

在索引index中，存入user的数据，最终 es 会将上述数据，扁平化处理，实际存储如下这样子：

```json
{
  "group" :        "fans",
  "user.first" : [ "alice", "john" ],
  "user.last" :  [ "smith", "white" ]
}
```

很明显，数据存储成这样子，丢失了first 和 last 之间关系。从这样的存储中，我们无法确定，first 为 “alice” ，对应的 last 是 “smith” 还是 “white”。

![image-20220705224912521](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.1.1.png)

执行如下查询：

```json
GET my_index2/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "user.first": "Alice" }},
        { "match": { "user.last":  "Smith" }}
      ]
    }
  }
}
```

查询到的结果：

```json
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.5753642,
    "hits" : [
      {
        "_index" : "my_index",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.5753642,
        "_source" : {
          "group" : "fans",
          "user" : [
            {
              "first" : "John",
              "last" : "Smith"
            },
            {
              "first" : "Alice",
              "last" : "White"
            }
          ]
        }
      }
    ]
  }
}
```

查询到一条数据，而这样的数据并不是我们想要的。因为通过 `"first" 为 "Alice"` 和 `"last" 为 "Smith"`，不应该查询到数据。之所以查询到数据，是因为数组中存储的对象被扁平化处理了。

![image-20220705225031662](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.1.2.png)

获取映射信息

```
GET my_index2/_mapping
```

```json
{
  "my_index2" : {
    "mappings" : {
      "properties" : {
        "group" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "user" : {
          "properties" : {
            "first" : {
              "type" : "text",
              "fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              }
            },
            "last" : {
              "type" : "text",
              "fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              }
            }
          }
        }
      }
    }
  }
}
```

![image-20220705225410269](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.1.3.png)

#### 2、加入`nested`

如果数组里存储的是对象，那么数组的类型应该是 nested，这样，再将对象数据存入数组中时，对象便不会被扁平化处理。

修改索引的mapping信息，将user数组的类型定义为 nested 并存入数据，重新执行检索。

```json
PUT my_index3
{
  "mappings": {
    "properties": {
      "user": {
        "type": "nested" 
      }
    }
  }
}

PUT my_index3/_doc/1
{
  "group" : "fans",
  "user" : [ 
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}
```

![image-20220705225805398](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.2.1.png)

![image-20220705225821166](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.2.2.png)

执行同样查询：

```json
GET my_index3/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "user.first": "Alice" }},
        { "match": { "user.last":  "Smith" }}
      ]
    }
  }
}
```

获取到的结果为空：

```json
{
  "took" : 11,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 0,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  }
}
```

这样的结果才是我们想要的，这样防止了 frist 和 last 之间关系的丢失。

![image-20220705225914304](https://gitlab.com/apzs/image/-/raw/master/image/5.2.2.2.3.png)

#### 3、`neated`增删查改

ES的Nested数据类型允许我们存储一对多的数据，例如一个文章可以对应多个评论等，在正式开始之前，我们先生成一个用于测试的索引：

```javascript
PUT /test_article
{
  "mappings": {
    "test_article": {
      "properties": {
        "id": {
          "type": "keyword"
        },
        "title": {
          "type": "text"
        },
        "tags": {
          "type": "text",
          "analyzer": "whitespace"
        },
        "data": {
          "type": "nested",    # 注意要指定type值
          "properties": {
            "system_type": {
              "type": "integer"
            },
            "affections": {
              "type": "keyword"
            },
            "themes": {
              "type": "text",
              "analyzer": "whitespace"
            }
          }        }
      }
    }
  }
}
```

这是一个简化的文章表，data字段就是一个nested嵌套类型，存储不同平台（system_type）的标注数据（在一个文章内，system_type的值是唯一的），如倾向性（affections）、主题（themes）等。如果需要，nested类型是可以进行嵌套的。

然后插入一些测试数据：

```javascript
POST /test_article/test_article/1
{
  "id": "1",
  "title": "标题1",
  "tags": "tag1 tag2 tag3",
  "data": []
}

POST /test_article/test_article/2
{
  "id": "2",
  "title": "标题2",
  "tags": "tag1 tag2 tag3",
  "data": [
    {
      "system_type": 1,
      "affections": "正面",
      "themes": "1 2"
    },
    {
      "system_type": 2,
      "affections": "中性",
      "themes": "1"
    }
  ]
}

POST /test_article/test_article
{
  "id": "3",
  "title": "标题4",
  "tags": "tag1 tag3",
  "data": [
    {
      "system_type": 1,
      "affections": "中性",
      "themes": "1 2"
    },
    {
      "system_type": 2,
      "affections": "负面",
      "themes": "1"
    }
  ]
}

POST /test_article/test_article
{
  "id": "5",
  "title": "标题5",
  "tags": "tag1 tag3",
  "data": [
    {
      "system_type": 2,
      "affections": "正面",
      "themes": "3 1"
    }
  ]
}

POST /test_article/test_article
{
  "id": "6",
  "title": "标题6",
  "tags": "tag2",
  "data": []
}
```

##### **01 删除数据**

这是比较简单的：

```javascript
POST /test_article/test_article/2/_update
{
  "script": {
    "source": """
    ctx._source.data.removeIf(item -> item.system_type == 4)
    """
  }
}
```

使用脚本删除满足特定条件的数据，主要就是removeIf函数，该函数的参数应该是一个匿名函数（比较接近JS的匿名函数写法，就是一个语法糖），表示成python大概是这样：

```javascript
lambda item: item.system_type == 4
```

item就是data中的元素，removeIf会把每个item都调用该匿名函数，如果得到true值就删除该元素。

##### **02 修改数据**

修改数据应该先判断数据是否已经存在：

```javascript
POST /test_article/test_article/2/_update
{
  "script": {
    "source": """
    if (ctx._source.data != null) {
      for(e in ctx._source.data) {
        if (e.system_type == 2) {
          e.affections = "正面"; 
        }
      }
    }
    """
  }
}
```

上面的语句会删除data数据里，system_type值为2的记录。

修改数据成功之后，数据的版本号（_version）就会加1。

##### **03 增加数据**

增加数据的时候，先判断数据是否已经存在，不存在才执行增加，如果已经存在了，则执行修改：

```javascript
POST /test_article/test_article/2/_update
{
  "script": {
    "source": """
    def is_in = false;
    if (ctx._source.data == null) {
      List ls = new ArrayList();
      ls.add(params.article);
    } else {
      for(e in ctx._source.data) {
        if (e.system_type == params.article.system_type) {
          is_in = true;
          for (String key: params.article.keySet()) {
            if (key != "system_type") {
              e[key] = params.article[key];
            }
          }
          break;
        }
      }
      if (is_in == false) {
        ctx._source.data.add(params.article);
      }
    }
    """,
    "params": {
      "article": {
        "system_type": 3,
        "affections": "负面",
        "themes": "3 2"
      }
    },
    "lang": "painless"
  }
}
```

这里比较特别的语法是：for (String key: params.article.keySet())

找了半天才发现对象可以使用keySet方法来获取key值，类似python中的dict.keys()。

另外，脚本中有参数需要使用的时候，比较好的实现应该是通过params进行传递，而不是硬编码到脚本中。

##### **04 查询**

nested数据的查询跟普通的查询有点不一样：

```javascript
GET /test_article/_search
{
  "query": {
    "nested": {
      "path": "data",
      "query": {
        "term": {
          "data.system_type": 1
        }
      }
    }
  }
}
```

使用使用nested，并指定对应的path。但是要注意，这个查询只会对外层的记录进行过滤，并不会对nested内部的数据进行过滤。例如对于"data.system_type": 1，则data字段里有一条记录满足这个条件的，这个文章就会整体返回（当然可以通过_source命令进行筛选）。

如果说只想得到命中的nested数据，则可以使用inner_hits：

```javascript
GET /test_article/_search
{
  "query": {
    "nested": {
      "path": "data",
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "data.system_type": {
                  "value": 2
                }
              }
            }
          ]
        }
      },
      "inner_hits": {}    # 返回满足条件的查询
    }
  },
  "size": 10
}
```

这时返回数据里就会增加一个inner_hits的字段：

```javascript
{
  "hits" : {
    "total" : 3,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test_article",
        "_type" : "test_article",
        "_id" : "aqjGXH4BZeFFYagKZU_i",
        "_score" : 1.0,
        "_source" : {
          "id" : "5",
          "title" : "标题5",
          "tags" : "tag1 tag3",
          "data" : [       # 这里可以使用_source命令进行过滤掉
            {
              "system_type" : 2,
              "affections" : "正面",
              "themes" : "3 1"
            }, ......
          ]
        },
        "inner_hits" : {   # 这里只会返回命中的记录
          "data" : {
            "hits" : {
              "total" : 1,
              "max_score" : 1.0,
              "hits" : [
                {
                  "_index" : "test_article",
                  "_type" : "test_article",
                  "_id" : "aqjGXH4BZeFFYagKZU_i",
                  "_nested" : {
                    "field" : "data",
                    "offset" : 0
                  },
                  "_score" : 1.0,
                  "_source" : {
                    "system_type" : 2,
                    "affections" : "正面",
                    "themes" : "3 1"
                  }
                }
              ]
            }
         }
        }
      },
      ......
    ]
  }
}
```

##### **05 聚合统计**

在我们的场景中，场景的一个需要是，统计某个平台（system_type）下文章的倾向性的分布情况。开始的实现是这样：

```javascript
GET /test_article/_search
{
  "size": 0,
  "aggs": {
    "positive": {
      "filter": {
        "nested": {
          "path": "data",
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "data.system_type": 2
                  }
                },
                {
                  "term": {
                    "data.affections": "正面"
                  }
                }
              ]
            }
          }
        }
      }
    },
    "negative": {
      "filter": {
        "nested": {
          "path": "data",
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "data.system_type": 2
                  }
                },
                {
                  "term": {
                    "data.affections": "负面"
                  }
                }
              ]
            }
          }
        }
      }
    },
    "neutral": {
      "filter": {
        "nested": {
          "path": "data",
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "data.system_type": 2
                  }
                },
                {
                  "term": {
                    "data.affections": "中性"
                  }
                }
              ]
            }
          }
        }
      }
    },
    "sensitive": {
      "filter": {
        "nested": {
          "path": "data",
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "data.system_type": 2
                  }
                },
                {
                  "term": {
                    "data.affections": "敏感"
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

上面的语句是可以工作的，但是很罗嗦，差不多有100行，很多重复的代码，现在倾向性只有4个还勉强可以，如果有10个呢，那就这个语句就有两三百行。。。

于是优化成这样：

```javascript
GET /test_article/_search
{
  "size": 0,
  "aggs": {
    "name": {
      "nested": {
        "path": "data"
      },
      "aggs": {
        "system_type_value": {
          "terms": {
            "field": "data.system_type"
          },
          "aggs": {
            "affections_value": {
              "terms": {
                "field": "data.affections"
              }
            }
          }
        }
      }
    }
  }
}
```

思路是先按data.system_type进行分桶，然后再按data.affections进行分桶，简洁了很多，但是这样的弊端是，我们本来只想统计某个平台下的数据，这里却会把所有平台的数据都进行统计了，浪费资源。

再优化：

```javascript
GET /test_article/_search
{
  "size": 0, 
  "aggs": {
    "nested_data": {
      "nested": {
        "path": "data"
      },
      "aggs": {
        "filter_data": {
          "filter": {
            "term": {
              "data.system_type": 2
            }
          },
          "aggs": {
            "affections_value": {
              "terms": {
                "field": "data.affections"
              }
            }
          }
        }
      }
    }
  }
}
```

聚合里有一个filter的类型，之前居然没有注意到。通过filter过滤出满足条件的数据，再对data.affections进行分桶，完美解决。

### 5.2.3、构造基本数据

#### 1、查看接口

请求url： http://localhost:88/api/product/spuinfo/1/up

![image-20220705230841294](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.1.1.png)

接口文档： https://easydoc.net/s/78237135/ZUqEdvA4/DhOtFr4A

![image-20220705230924173](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.1.2.png)

#### 2、添加`spuUp`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SpuInfoController`类里添加`spuUp`方法

```java
@PostMapping("/{spuId}/up")
public R spuUp(@PathVariable("spuId") Long spuId) {
    spuInfoService.up(spuId);

    return R.ok();
}
```

![image-20220705231758105](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.2.png)

#### 3、添加`up`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoService`抽象接口里添加`up`抽象方法

```java
/**
 * 商品上架
 * @param spuId
 */
void up(Long spuId);
```

![image-20220705231628130](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.3.png)

#### 4、新建`SkuEsModel`类

在`gulimall-common`模块的`com.atguigu.common.to`包下新建`es`文件夹，在`es`文件夹下新建`SkuEsModel`类

```java
package com.atguigu.common.to.es;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/5
 * @Description:
 */
@Data
public class SkuEsModel {

    private Long skuId;

    private Long spuId;

    private String skuTitle;

    private BigDecimal skuPrice;

    private String skuImg;

    private Long saleCount;
    /**
     * 是否还有库存
     */
    private Boolean hasStock;
    /**
     * 热度评分
     */
    private Long hotScore;
    /**
     * 品牌id
     */
    private Long brandId;
    /**
     * 分类id
     */
    private Long catalogId;
    /**
     * 品牌名
     */
    private String brandName;
    /**
     * 品牌图片
     */
    private String brandImg;
    /**
     * 分类名
     */
    private String catalogName;

    private List<Attr> attrs;

    @Data
    public static class Attr{
        private Long attrId;

        private String attrName;

        private String attrValue;
    }
}
```

![image-20220705233742597](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.4.png)

#### 5、实现`up`抽象方法

##### 1、修改`up`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法

```java
@Override
public void up(Long spuId) {
    List<SkuEsModel> upProducts = new ArrayList<>();

    //组装需要的数据
    SkuEsModel esModel = new SkuEsModel();
    //1、查出当前spuId对应的所有sku信息,包括品牌的名字。
    List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);
}
```

![image-20220705234605785](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.5.1.png)

##### 2、添加`getSkusBySpuId`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuInfoService`抽象类里添加`getSkusBySpuId`抽象方法

```java
List<SkuInfoEntity> getSkusBySpuId(Long spuId);
```

![image-20220705235515679](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.5.2.png)

##### 3、实现`getSkusBySpuId`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类里实现`getSkusBySpuId`抽象方法

(这里的`lambdaQueryWrapper.eq(SkuInfoEntity::getSKuId,spuId);`写错了，应该为`lambdaQueryWrapper.eq(SkuInfoEntity::getSpuId,spuId);`)

```java
@Override
public List<SkuInfoEntity> getSkusBySpuId(Long spuId) {
    LambdaQueryWrapper<SkuInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(SkuInfoEntity::getSKuId,spuId);
    List<SkuInfoEntity> list = this.list(lambdaQueryWrapper);
    return list;
}
```

![image-20220705235432613](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.5.3.png)

##### 4、对比`SkuEsModel`类与`SkuInfoEntity`类

`SkuEsModel`类与`SkuInfoEntity`类共同有的属性，但属性名不一样的数据的对比

| SkuEsModel类中的属性名 | SkuInfoEntity类中的属性名 |
| ---------------------- | ------------------------- |
| skuPrice               | price                     |
| skuImg                 | skuDefaultImg             |

![image-20220706000315389](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.5.4.1.png)

`SkuEsModel`类有的属性，而`SkuInfoEntity`类没有的属性

```java
hasStock    //是否还有库存
hotScore 	//热度评分
brandName 	//品牌名
BrandImg 	//品牌图片
catalogName //分类名
attrs
```

![image-20220706001019094](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.5.4.2.png)

#### 6、修改`up`方法

##### 1、修改`up`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法

```java
@Autowired
BrandService brandService;
@Autowired
CategoryService categoryService;

@Override
public void up(Long spuId) {
    //attrs
    //TODO 4、查询当前sku的所有可以被用来检索的规格属性。
    List<ProductAttrValueEntity> productAttrValueEntities = productAttrValueService.baseAttrlistforspu(spuId);
    List<Long> attrIds = productAttrValueEntities.stream().map(ProductAttrValueEntity::getAttrId).collect(Collectors.toList());
    List<Long> searchAttrIds = attrService.selectSearchAttrIds(attrIds);
    Set<Long> idSet = new HashSet<>(searchAttrIds);

    List<SkuEsModel.Attr> attrList = productAttrValueEntities.stream().filter(item -> {
        return idSet.contains(item.getAttrId());
    }).map(item -> {
        SkuEsModel.Attr attr = new SkuEsModel.Attr();
        BeanUtils.copyProperties(item, attr);
        return attr;
    }).collect(Collectors.toList());

    //1、查出当前spuId对应的所有sku信息,包括品牌的名字。
    List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);
    List<SkuEsModel> collect = skuInfoEntities.stream().map(skuInfoEntity -> {
        //组装需要的数据
        SkuEsModel skuEsModel = new SkuEsModel();
        BeanUtils.copyProperties(skuInfoEntity, skuEsModel);
        //skuPrice
        //skuImg
        //hasStock      是否还有库存
        //TODO 1、发送远程调用，在库存系统中查询是否有库存，并不用知道库存是多少
        //hotScore      热度评分
        //TODO 2、热度评分，默认为 0
        skuEsModel.setHotScore(0L);
        //brandName：品牌名   BrandImg：品牌图片
        //TODO 3、查询品牌和分类的名字信息
        BrandEntity brandEntity = brandService.getById(skuInfoEntity.getBrandId());
        skuEsModel.setBrandName(brandEntity.getName());
        skuEsModel.setBrandImg(brandEntity.getLogo());
        //catalogName   分类名
        CategoryEntity categoryEntity = categoryService.getById(skuInfoEntity.getCatalogId());
        skuEsModel.setCatalogName(categoryEntity.getName());
        //设置检索属性
        skuEsModel.setAttrs(attrList);
        return skuEsModel;
    }).collect(Collectors.toList());
    //TODO 5、将数据发送给es进行保存
}
```

![image-20220706161633908](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.6.1.png)

##### 2、添加`selectSearchAttrIds`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrService`抽象类里添加`selectSearchAttrIds`抽象方法

```java
/**
 * 在指定的所有属性集合里面挑出检索属性
 * @param attrIds
 * @return
 */
List<Long> selectSearchAttrIds(List<Long> attrIds);
```

![image-20220706165307712](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.6.2.png)

##### 3、添加`selectSearchAttrIds`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrServiceImpl`类里添加`selectSearchAttrIds`方法

```java
@Override
public List<Long> selectSearchAttrIds(List<Long> attrIds) {
    //select attr_id from `pms_attr` where attr_id in(?) and search_type = 1
    return this.baseMapper.selectSearchAttrIds(attrIds);
}
```

![image-20220706165811051](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.6.3.png)

##### 4、添加`selectSearchAttrIds`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.dao.AttrDao`接口里添加`selectSearchAttrIds`抽象方法

```java
List<Long> selectSearchAttrIds(@Param("attrIds") List<Long> attrIds);
```

![GIF 2022-7-6 17-02-34](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.6.4.gif)

##### 5、修改`AttrDao.xml`文件

在`gulimall-product`模块的`src/main/resources/mapper/product/AttrDao.xml`文件里添加如下代码

```xml
<select id="selectSearchAttrIds" resultType="java.lang.Long">
    select attr_id from gulimall_pms.pms_attr
    <where>
        attr_id in
        <foreach collection="attrIds" item="attrId" separator="," open="(" close=")">
            #{attrId}
        </foreach>
        and search_type = 1
    </where>
</select>
```

![image-20220706172352803](https://gitlab.com/apzs/image/-/raw/master/image/5.2.3.6.5.png)

### 5.2.4、远程查询库存&泛型结果封装

#### 1、新建`SkuHasStock`类

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo`里新建`SkuHasStock`类

```java
package com.atguigu.gulimall.ware.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/7/6
 * @Description:
 */
@Data
public class SkuHasStock {

    private Long skuId;
    private Boolean hasStock;
}
```

![image-20220706204144858](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.1.png)

#### 2、添加`getSkuHasStock`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类里添加`getSkuHasStock`方法

![image-20220706204431570](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.2.png)

#### 3、添加`getSkuHasStock`抽象方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareSkuService`接口里添加`getSkuHasStock`抽象方法

```java
List<SkuHasStock> getSkuHasStock(List<Long> skuIds);
```

![image-20220706204552037](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.3.png)

#### 4、添加`getSkuHasStock`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里添加`getSkuHasStock`方法

```java
@Override
public List<SkuHasStock> getSkuHasStock(List<Long> skuIds) {
    List<SkuHasStock> collect = skuIds.stream().map(skuId -> {
        SkuHasStock vo = new SkuHasStock();
        //SELECT SUM (stock) FROM、 wms ware skui WHERE sku id=1
        long count = this.baseMapper.getSkuStock(skuId);

        vo.setSkuId(skuId);
        vo.setHasStock(count > 0);
        return vo;
    }).collect(Collectors.toList());

    return collect;
}
```

![image-20220706231637733](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.4.png)

#### 5、添加`getSkuStock`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.dao.WareSkuDao`类里添加`getSkuStock`方法

```java
long getSkuStock(Long skuId);
```

![GIF 2022-7-6 23-30-39](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.5.png)

#### 6、添加`getSkuStock`

在`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件里添加`getSkuStock`

```java
<!--   库存数 = 剩余库存 - 已被锁定的件数(已生成订单但未付款，已下单等)    -->
<select id="getSkuStock" resultType="java.lang.Long">
    select sum(stock-stock_locked) from gulimall_wms.wms_ware_sku where sku_id=#{skuId}
</select>
```

![image-20220706233740914](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.6.png)

#### 7、重命名`SkuHasStock`

重新将`SkuHasStock`重命名为`SkuHasStockVo`

![GIF 2022-7-6 23-56-02](https://gitlab.com/apzs/image/-/raw/master/image/5.2.4.7.png)

### 5.2.5、调用远程库存服务

#### 1、导入依赖

在`gulimall-product`模块的`pom`文件里添加如下依赖(已经添加过了)

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

![image-20220706234121762](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.1.png)

#### 2、开启远程调用

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplication`启动类上添加如下注解(已经添加过了)

```java
@EnableFeignClients(basePackages = "com.atguigu.gulimall.product.feign")
```

![image-20220706234719448](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.2.png)

#### 3、添加`getSkuHasStock`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign`包下新建`WareFelginService`接口,在`WareFelginService`接口里添加`getSkuHasStock`抽象方法

```java
package com.atguigu.gulimall.product.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
@FeignClient("gulimall-ware")
public interface WareFelginService {

    @PostMapping("/ware/waresku/hasStock")
    public R getSkuHasStock(@RequestBody List<Long> skuIds);
}
```

![image-20220707092550014](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.3.png)

#### 4、修改RS

##### 方法一：（不推荐）

可以在`gulimall-common`模块的`com.atguigu.common.utils.R`类里添加泛型，用于封装数据(但我不想用这种方式)

[点击查看`R`类完整代码](code/5.2.5.4.R.java)

![image-20220707093749873](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.4.1.png)

##### 方法二：（推荐）

重新在`gulimall-common`模块的`com.atguigu.common.utils`包里新建`RS`类用于后端数据传输

[点击查看`RS`类完整代码](code/5.2.5.4.RS.java)

![image-20220707101501139](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.4.2.png)

#### 5、修改`getSkuHasStock`方法

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法

```java
/**
 * 查询sku是否有库存
 * @return
 */
@PostMapping("/hasStock")
public RS<List<SkuHasStockVo>> getSkuHasStock(@RequestBody List<Long> skuIds){
  List<SkuHasStockVo> skuHasStocks =  wareSkuService.getSkuHasStock(skuIds);

  return new RS<>(skuHasStocks);
}
```

![image-20220707101542828](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.5.png)

#### 6、移动并重命名`SkuHasStockVo`类

把`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo.SkuHasStockVo`移动到`gulimall-common`模块的`com.atguigu.common.to`类下，并将`SkuHasStockVo`重命名为`SkuHasStockTo`

![GIF 2022-7-7 10-29-00](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.6.png)

#### 7、修改`getSkuHasStock`抽象方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.feign.WareFelginService`接口的`getSkuHasStock`抽象方法

(这里的`@PostMapping("/hasStock")`写错了，应该为`@PostMapping("/ware/waresku/hasStock")`

```java
@PostMapping("/hasStock")
public RS<List<SkuHasStockTo>> getSkuHasStock(List<Long> skuIds);
```

![image-20220707103934138](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.7.png)

#### 8、修改`up`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法

```java
@Override
public void up(Long spuId) {
    //1、查出当前spuId对应的所有sku信息,包括品牌的名字。
    List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);
    //attrs
    //TODO 4、查询当前sku的所有可以被用来检索的规格属性。
    List<ProductAttrValueEntity> productAttrValueEntities = productAttrValueService.baseAttrlistforspu(spuId);
    List<Long> attrIds = productAttrValueEntities.stream().map(ProductAttrValueEntity::getAttrId).collect(Collectors.toList());
    List<Long> searchAttrIds = attrService.selectSearchAttrIds(attrIds);
    Set<Long> idSet = new HashSet<>(searchAttrIds);

    List<SkuEsModel.Attr> attrList = productAttrValueEntities.stream().filter(item -> {
        return idSet.contains(item.getAttrId());
    }).map(item -> {
        SkuEsModel.Attr attr = new SkuEsModel.Attr();
        BeanUtils.copyProperties(item, attr);
        return attr;
    }).collect(Collectors.toList());

    //TODO 1、发送远程调用，在库存系统中查询是否有库存，并不用知道库存是多少
    //hotScore      热度评分
    Map<Long, Boolean> isSkuStock = null;
    try {
        List<Long> skuIdList = skuInfoEntities.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());
        RS<List<SkuHasStockTo>> skuHasStock = wareFelginService.getSkuHasStock(skuIdList);
        isSkuStock = skuHasStock.getData().stream()
                .collect(Collectors.toMap(SkuHasStockTo::getSkuId, SkuHasStockTo::getHasStock));
    }catch (Exception e){
        log.error("库存服务查询异常：原因{}",e);
    }

    Map<Long, Boolean> finalIsSkuStock = isSkuStock;
    List<SkuEsModel> collect = skuInfoEntities.stream().map(skuInfoEntity -> {
        //组装需要的数据
        SkuEsModel skuEsModel = new SkuEsModel();
        BeanUtils.copyProperties(skuInfoEntity, skuEsModel);
        //TODO 1、发送远程调用，在库存系统中查询是否有库存，并不用知道库存是多少
        //hotScore      热度评分
        boolean hasStock = false;
        //设置库存信息
        //如果远程调用失败，则默认有库存
        if (finalIsSkuStock ==null || !finalIsSkuStock.containsKey(skuInfoEntity.getSkuId())){
           skuEsModel.setHasStock(true);
        }else {
            skuEsModel.setHasStock(finalIsSkuStock.get(skuInfoEntity.getSkuId()));
        }
        //skuPrice
        //skuImg
        //hasStock      是否还有库存
        //TODO 2、热度评分，默认为 0
        skuEsModel.setHotScore(0L);
        //brandName：品牌名   BrandImg：品牌图片
        //TODO 3、查询品牌和分类的名字信息
        BrandEntity brandEntity = brandService.getById(skuInfoEntity.getBrandId());
        skuEsModel.setBrandName(brandEntity.getName());
        skuEsModel.setBrandImg(brandEntity.getLogo());
        //catalogName   分类名
        CategoryEntity categoryEntity = categoryService.getById(skuInfoEntity.getCatalogId());
        skuEsModel.setCatalogName(categoryEntity.getName());
        //设置检索属性
        skuEsModel.setAttrs(attrList);
        return skuEsModel;
    }).collect(Collectors.toList());
    //TODO 5、将数据发送给es进行保存
}
```

![image-20220707165101191](https://gitlab.com/apzs/image/-/raw/master/image/5.2.5.8.png)

### 5.2.6、使用ES远程上架

#### 1、新建`ElasticSaveController`类

在`gulimall-search`模块的`com.atguigu.gulimall.search`包下新建`controller`文件夹，在`controller`文件夹下新建`ElasticSaveController`类，在`ElasticSaveController`里新建`productStatusUp`方法

```java
package com.atguigu.gulimall.search.controller;

import com.atguigu.common.to.es.SkuEsModel;
import com.atguigu.common.utils.R;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
@RestController
@RequestMapping("/search")
public class ElasticSaveController {

    /**
     * 上架商品
     */
    @PostMapping("/product")
    public R productStatusUp(@RequestBody List<SkuEsModel> skuEsModels) {

        return R.ok();
    }
}
```

![image-20220707171329608](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.1.png)

#### 2、新建`ProductSaveService`类

在`gulimall-search`模块的`com.atguigu.gulimall.search`包下新建`service`文件夹，在`service`文件夹下新建`ProductSaveService`类

```java
package com.atguigu.gulimall.search.service;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
public interface ProductSaveService {
}
```

![image-20220707171915086](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.2.png)

#### 3、修改`productStatusUp`方法

修改`gulimall-search`模块的`com.atguigu.gulimall.search.controller.ElasticSaveController`类的`productStatusUp`方法

```java
@Autowired
ProductSaveService productSaveService;
/**
 * 上架商品
 */
@PostMapping("/product")
public R productStatusUp(@RequestBody List<SkuEsModel> skuEsModels) {
    productSaveService.productStatusUp(skuEsModels);
    return R.ok();
}
```

![image-20220707172125640](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.3.png)

#### 4、添加`productStatusUp`抽象方法

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.ProductSaveService`接口里添加`productStatusUp`抽象方法

```java
void productStatusUp(List<SkuEsModel> skuEsModels);
```

![image-20220707193842609](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.4.png)

#### 5、新建`EsConstant`常量类

在`gulimall-search`模块的`com.atguigu.gulimall.search`包里新建`constant`文件夹，在`constant`文件夹里新建`EsConstant`常量类

```java
package com.atguigu.gulimall.search.constant;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
public class EsConstant {

    /**
     * sku数据在es中的索引
     */
    public static final String PRODUCT_INDEX = "product";

}
```

![image-20220707194908231](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.5.png)

#### 6、新建`ProductSaveServiceImpl`类

##### 1、向上抛出异常

在`gulimall-search`模块的`com.atguigu.gulimall.search.service`包里新建`impl`文件夹，在`impl`文件夹里新建`ProductSaveServiceImpl`类，实现`ProductSaveService`接口

```java
package com.atguigu.gulimall.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.atguigu.common.to.es.SkuEsModel;
import com.atguigu.gulimall.search.config.GulimallElasticSearchConfig;
import com.atguigu.gulimall.search.constant.EsConstant;
import com.atguigu.gulimall.search.service.ProductSaveService;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
@Service
public class ProductSaveServiceImpl implements ProductSaveService {

    @Autowired
    RestHighLevelClient restHighLevelClient;
    @Override
    public void productStatusUp(List<SkuEsModel> skuEsModels) {

        //保存到es
        //1、给es中建立索引，product，建立好映射关系。

        //2、给es中保存这些数据
        BulkRequest bulkRequest = new BulkRequest();
        for (SkuEsModel skuEsModel : skuEsModels) {
            IndexRequest indexRequest = new IndexRequest(EsConstant.PRODUCT_INDEX);
            indexRequest.id(skuEsModel.getSkuId().toString());
            String json = JSON.toJSONString(skuEsModel);
            indexRequest.source(json, XContentType.JSON);
            bulkRequest.add(indexRequest);
        }
        restHighLevelClient.bulk(bulkRequest, GulimallElasticSearchConfig.COMMON_OPTIONS);
    }
}
```

![GIF 2022-7-7 20-00-48](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.6.1.gif)

##### 2、修改返回类型

```java
package com.atguigu.gulimall.search.service.impl;

import com.alibaba.fastjson.JSON;
import com.atguigu.common.to.es.SkuEsModel;
import com.atguigu.gulimall.search.config.GulimallElasticSearchConfig;
import com.atguigu.gulimall.search.constant.EsConstant;
import com.atguigu.gulimall.search.service.ProductSaveService;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
@Slf4j
@Service
public class ProductSaveServiceImpl implements ProductSaveService {

    @Autowired
    RestHighLevelClient restHighLevelClient;
    @Override
    public void productStatusUp(List<SkuEsModel> skuEsModels) throws IOException {

        //保存到es
        //1、给es中建立索引，product，建立好映射关系。(kibana里已经建立过了)

        //2、给es中保存这些数据
        BulkRequest bulkRequest = new BulkRequest();
        for (SkuEsModel skuEsModel : skuEsModels) {
            IndexRequest indexRequest = new IndexRequest(EsConstant.PRODUCT_INDEX);
            indexRequest.id(skuEsModel.getSkuId().toString());
            String json = JSON.toJSONString(skuEsModel);
            indexRequest.source(json, XContentType.JSON);
            bulkRequest.add(indexRequest);
        }
        BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, GulimallElasticSearchConfig.COMMON_OPTIONS);

        //TODO 如果批量操作有错误
        boolean b = bulk.hasFailures();
        if (b){
            List<String> collect = Arrays.stream(bulk.getItems()).map(BulkItemResponse::getId).collect(Collectors.toList());
            log.error("商品上架错误：{}",collect);
        }
    }
}
```

![GIF 2022-7-7 20-12-55](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.6.2.png)

##### 3、完整代码

[点击查看`ProductSaveServiceImpl`类完整代码](code/5.2.6.6.3.ProductSaveServiceImpl.java)

![image-20220707201345098](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.6.3.png)

#### 7、修改`严重性`级别(解决`restHighLevelClient`报红)

依次点击`File` -> `Settings` -> `Editor` -> `Inspections` -> `Spring` -> `Spring Core` -> `Autowiring for bean class` 

在右侧 `Severity` 里选择 `Warining`

![GIF 2022-7-7 20-20-29](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.7.png)

#### 8、在`BizCodeException`枚举类里添加实例

在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加实例

```java
/**
 * 商品上架异常（向ElasticSearch里保存数据出错）
 */
PRODUCT_UP_EXCEPTION(11000,"商品上架异常");
```

![image-20220707203236682](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.8.png)

完整代码：

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
    VALID_EXCEPTION(10001,"参数格式校验失败"),
    /**
     * 商品上架异常（向ElasticSearch里保存数据出错）
     */
    PRODUCT_UP_EXCEPTION(11000,"商品上架异常");


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

#### 9、修改`productStatusUp`方法

在`gulimall-search`模块的`com.atguigu.gulimall.search.controller.ElasticSaveController`类里修改`productStatusUp`方法

```java
package com.atguigu.gulimall.search.controller;

import com.atguigu.common.exception.BizCodeException;
import com.atguigu.common.to.es.SkuEsModel;
import com.atguigu.common.utils.R;
import com.atguigu.gulimall.search.service.ProductSaveService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
@Slf4j
@RestController
@RequestMapping("/search")
public class ElasticSaveController {

    @Autowired
    ProductSaveService productSaveService;
    /**
     * 上架商品
     */
    @PostMapping("/product")
    public R productStatusUp(@RequestBody List<SkuEsModel> skuEsModels) {
        boolean b = false;
        try {
            b = productSaveService.productStatusUp(skuEsModels);
        }catch (Exception e){
            log.error("ElasticSaveController商品上架错误：{}",e);
            return R.error(BizCodeException.PRODUCT_UP_EXCEPTION);
        }

        if (b){
            return R.ok();
        }else {
            return R.error(BizCodeException.PRODUCT_UP_EXCEPTION);
        }

    }
}
```

![image-20220707204343751](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.9.png)

#### 10、修改`@RequestMapping`注解

在`gulimall-search`模块的`com.atguigu.gulimall.search.controller.ElasticSaveController`类上修改`@RequestMapping("/search")`注解

```java
@RequestMapping("/search/save")
```

![image-20220707205228319](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.10.png)

#### 11、修改`productStatusUp`方法的返回值

修改`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.ProductSaveServiceImpl`类的`productStatusUp`方法的返回值，`bulk.hasFailures()`方法有错误了才返回`true`，而`productStatusUp`方法没有错误了才返回`true`，所以返回值应取反

[点击查看`ProductSaveServiceImpl`类完整代码](code/5.2.6.11.ProductSaveServiceImpl.java)

![image-20220707204429879](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.11.png)

#### 12、新建`SearchFeignService`类

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign`包里新建`SearchFeignService`类，在`SearchFeignService`类里添加`productStatusUp`方法

```java
package com.atguigu.gulimall.product.feign;

import com.atguigu.common.to.es.SkuEsModel;
import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/7
 * @Description:
 */
@FeignClient("gulimall-search")
public interface SearchFeignService {
    @PostMapping("/search/save/product")
    public R productStatusUp(List<SkuEsModel> skuEsModels);
}
```

![image-20220707205546053](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.12.png)

#### 13、新建`StatusEnum`枚举类

在`gulimall-common`模块的`com.atguigu.common.constant.product`包里新建`StatusEnum`枚举类

```java
package com.atguigu.common.constant.product;

/**
 * @author 无名氏
 * @date 2022/5/17
 * @Description: spu的状态
 */
public enum StatusEnum {
    /**
     * 新建商品
     */
    NEW_SPU(0,"新建商品"),
    /**
     * 上架商品
     */
    SPU_UP(1,"上架商品"),
    /**
     * 下架商品
     */
    SPU_DOWN(2,"下架商品");

    private int code;
    private String msg;

    StatusEnum(int code, String msg) {
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

![image-20220707211525454](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.13.png)

#### 14、修改`up`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法

```java
//TODO 5、将数据发送给es进行保存
R r = searchFeignService.productStatusUp(collect);
if (r.getCode()==0){
    //远程调用成功
    //TODO 6、修改当前spu的状态(变为上架状态)
    this.baseMapper.updateSpuStatus(spuId, StatusEnum.SPU_UP.getCode());
}else {
    //远程调用失败
}
```

![image-20220707211853172](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.14.png)

#### 15、添加`updateSpuStatus`

在`gulimall-product`模块的`src/main/resources/mapper/product/SpuInfoDao.xml`文件里添加`updateSpuStatus`

```java
<update id="updateSpuStatus">
    update gulimall_pms.pms_spu_info set publish_status=#{code},update_time = now() where id = #{spuId}
</update>
```

![image-20220707212648115](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.15.png)

#### 16、完整`SpuInfoServiceImpl`类代码

[点击查看`SpuInfoServiceImpl`类完整代码](code/5.2.6.16.SpuInfoServiceImpl.java)

![image-20220707213102930](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.16.png)

#### 17、设置端口

在`gulimall-search`模块的`src/main/resources`文件夹里新建`application.yml`文件，在`application.yml`配置文件里添加配置

```java
server:
  port: 12000
spring:
  application:
    name: gulimall-search
```

![image-20220709080010877](https://gitlab.com/apzs/image/-/raw/master/image/5.2.6.17.png)

### 5.2.7、测试（1）`Product`服务

#### 1、准备工作

##### 1、添加`GulimallSearchApplication`服务到`Unnamed`

添加`GulimallSearchApplication`服务到`Unnamed`，并指定`GulimallSearchApplication`服务的最大占用为`100m`

```
-Xmx100m
```

![GIF 2022-7-7 21-32-14](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.1.1.gif)

##### 2、启动各个模块

启动`gulimall-coupon` 、`gulimall-gateway` 、`gulimall-member` 、`gulimall-product` 、`gulimall-third-party` 、 `gulimall-ware` 、`renren-fast` 、`gulimall-search`模块

其中`gulimall-product` 、 `gulimall-ware`  、`gulimall-search`模块以`debug`方式启动

![image-20220707214419078](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.1.2.png)

##### 3、在`SpuInfoServiceImpl`类的`up`方法里打断点

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法有效的第一行`List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);`上打断点

![image-20220707215149382](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.1.3.png)

##### 4、在`ElasticSaveController`类的`productStatusUp`方法里打断点

在`gulimall-search`模块的`com.atguigu.gulimall.search.controller.ElasticSaveController`类的`productStatusUp`方法有效的第一行`boolean b = false;`上打断点

![image-20220707215412247](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.1.4.png)

##### 5、在`WareSkuController`类的`getSkuHasStock`方法里打断点

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法有效的第一行`List<SkuHasStockTo> skuHasStocks =  wareSkuService.getSkuHasStock(skuIds);`上打断点

![image-20220707215543039](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.1.5.png)

#### 2、进行测试

##### 1、点击上架

运行前端项目，然后在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

![image-20220707224251073](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.2.1.png)

##### 2、点击`Step Over`

切换到`IDEA`，点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

可以看到`List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);`这一行只查出了一行数据，应该是有8行数据的

![image-20220707224607006](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.2.2.1.png)

可以看到，`gulimall_pms`数据库的`pms_sku_info`表中的`spu_id`为`1`的有8条数据

![image-20220709075336050](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.2.2.2.png)

##### 3、修改`getSkusBySpuId`方法

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类的`getSkusBySpuId`方法

这里错把`SkuInfoEntity::getSpuId`写成`SkuInfoEntity::getSkuId`了，改过来就行了

```java
@Override
public List<SkuInfoEntity> getSkusBySpuId(Long spuId) {
    LambdaQueryWrapper<SkuInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(SkuInfoEntity::getSpuId,spuId);
    List<SkuInfoEntity> list = this.list(lambdaQueryWrapper);
    return list;
}
```

![image-20220707224727168](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.2.3.png)

#### 3、重新测试

##### 1、重启`product`服务

重新以debug方式启动`GulimallProductApplication`服务

![image-20220707224919708](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.1.png)

##### 2、再次点击`上架`

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

![image-20220707224947688](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.2.png)

##### 3、根据`spuId`查询所有`sku`

切换到`IDEA`，点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);`

根据`spuId`查询所有`sku`数据（共8条），还差品牌的名字没有查出来。

![image-20220707225203812](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.3.1.png)

与`gulimall_pms`数据库的`pms_sku_info`表中的`spu_id`为`1`的8条数据相同

![image-20220707225229746](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.3.2.png)

##### 4、查出所有的规格属性

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`List<ProductAttrValueEntity> productAttrValueEntities = productAttrValueService.baseAttrlistforspu(spuId);`

根据`spuId`查询出该该`spu`的所有基础属性

![image-20220707230047913](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.4.png)

##### 5、获取`attrId`集合

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`List<Long> attrIds = productAttrValueEntities.stream().map(ProductAttrValueEntity::getAttrId).collect(Collectors.toList());`

根据`ProductAttrValueEntity`集合获取`attrId`集合

![image-20220707225718094](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.5.png)

##### 6、筛选出可检索规格属性

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`List<Long> searchAttrIds = attrService.selectSearchAttrIds(attrIds);`

根据`attrIds`(当前`spuId`的所有规格属性的集合)过滤出所有可以被用来检索的规格属性

可以看到查询到了一条`attrId`为`1`的一条数据

![image-20220707230418606](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.6.1.png)

与`gulimall_pms`数据库的`pms_attr`表的指定`attr_id`集合的`search_type`为`1`的数据一致

![image-20220707231007884](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.6.2.png)

##### 7、把`List<Long>`转为`Set<Long>`

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`Set<Long> idSet = new HashSet<>(searchAttrIds);`

把查出的可检索的规格属性放到了`HashSet`集合里，方便查询(这样查询的效率为`O(1)`)

![image-20220707231340731](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.7.png)

##### 8、打断点

在`SkuEsModel.Attr attr = new SkuEsModel.Attr();`这里打个断点

![image-20220707231612897](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.8.png)

##### 9、点击三次`Step Over`

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮三次，执行当前方法的下三个语句，跳到`SkuEsModel.Attr attr = new SkuEsModel.Attr();`这里，可以看到当前遍历的元素就是一个`规格属性`

![image-20220707231856962](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.9.png)

##### 10、点击两次`Step Over`

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮两次，执行当前方法的下两个语句，跳到`return attr;`语句

这时已经把`attrId`、`attrName`、`attrValue`封装到`gulimall-common`模块的`com.atguigu.common.to.es.SkuEsModel.Attr`内部类里了

![image-20220707231952723](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.10.png)

##### 11、执行完该`stream`

一直点击`GulimallProductApplication`项目的`Step Over`(步过)按钮，直到执行完该`stream`，准备执行`Map<Long, Boolean> isSkuStock = null;`语句

这时已经处理完所有`attrId`，并把他们放到`attrList`集合里了

![image-20220707232202207](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.11.png)

##### 12、打断点

在`Map<Long, Boolean> finalIsSkuStock = isSkuStock;`这里打个断点

![image-20220707232349889](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.12.png)

##### 13、准备调用`ware`模块

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮两次，执行当前方法的下两个语句，跳到`RS<List<SkuHasStockTo>> skuHasStock = wareFelginService.getSkuHasStock(skuIdList);`这里

准备远程调用`GulimallWareApplication`服务，在库存系统里查询这些`sku`是否还有库存

![image-20220707232827958](https://gitlab.com/apzs/image/-/raw/master/image/5.2.7.3.13.png)

### 5.2.8、测试（2）`Ware`服务

#### 1、准备转到`ware`模块

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句，准备跳转到`GulimallWareApplication`服务

##### 1、没有跳转到`ware`模块

并没有按预想的跳转到`GulimallWareApplication`服务，而是跳转到了异常里面，可以看到是没有找到`WareFelginService`模块

```
detailMessage = "status 404 reading WareFelginService#getSkuHasStock(List)"
详细信息 = "状态 404 读取 WareFelginService#getSkuHasStock(List)"
```

![image-20220707233207756](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.1.1.png)

##### 2、修改注解

修改`gulimall-product`模块的`com.atguigu.gulimall.product.feign.WareFelginService`类的`getSkuHasStock`方法

把`@PostMapping("/hasStock")`注解修改成`@PostMapping("/ware/waresku/hasStock")`

```java
@PostMapping("/ware/waresku/hasStock")
```

![image-20220707233513049](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.1.2.png)

#### 2、再次测试

再次以debug方式启动`GulimallProductApplication`服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

##### 1、跳转到`ware`模块

这次就成功跳转到`GulimallWareApplication`服务了

就来到了`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`List<SkuHasStockTo> skuHasStocks =  wareSkuService.getSkuHasStock(skuIds);`这条语句

![image-20220707234330247](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.1.png)

##### 2、跳转到异常了

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`List<SkuHasStockTo> skuHasStocks =  wareSkuService.getSkuHasStock(skuIds);`

这次就到了一个异常类里，很明显这行代码出错了

![image-20220707234432664](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.2.png)

##### 3、试图从具有原始返回类型（long）的方法返回 null

点击`Pause Program`按钮，执行完这些异常处理类

可以看到`ibatis`报错，这应该就是`mybatis`相关的错误了

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.dao.WareSkuDao.getSkuStock`方法应该返回`long`类型，而实际返回`null`

```
org.apache.ibatis.binding.BindingException: Mapper method 'com.atguigu.gulimall.ware.dao.WareSkuDao.getSkuStock attempted to return null from a method with a primitive return type (long).

org.apache.ibatis.binding.BindingException：映射器方法 'com.atguigu.gulimall.ware.dao.WareSkuDao.getSkuStock 试图从具有原始返回类型（long）的方法返回 null。
```

![image-20220707234720373](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.3.1.png)

是`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件的如下代码报错

```java
<select id="getSkuStock" resultType="java.lang.Long">
    select sum(stock-stock_locked) from gulimall_wms.wms_ware_sku where sku_id=#{skuId}
</select>
```

![image-20220707234846728](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.3.2.png)

查看`gulimall_wms`数据库的`wms_ware_sku`表，可以看到这里没有`skuId`为`5`的库存信息

![image-20220707235311735](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.3.3.png)

执行如下`sql`语句，由于查不到`skuId`为`5`的库存信息，所以就返回了`null`，而`long`基本类型不能接收`null`

```mysql
select sum(stock-stock_locked) from gulimall_wms.wms_ware_sku where sku_id=5
```

![image-20220707235407324](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.3.4.png)

##### 4、换成包装类型

将`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`getSkuHasStock`方法的`long count = this.baseMapper.getSkuStock(skuId);`替换为`Long count = this.baseMapper.getSkuStock(skuId);`

```java
@Override
public List<SkuHasStockTo> getSkuHasStock(List<Long> skuIds) {
    List<SkuHasStockTo> collect = skuIds.stream().map(skuId -> {
        SkuHasStockTo vo = new SkuHasStockTo();
        //SELECT SUM (stock) FROM、 wms ware skui WHERE sku id=1
        Long count = this.baseMapper.getSkuStock(skuId);

        vo.setSkuId(skuId);
        vo.setHasStock(count != null && count > 0);
        return vo;
    }).collect(Collectors.toList());

    return collect;
}
```

![image-20220707235623317](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.4.1.png)

将`gulimall-ware`模块的`com.atguigu.gulimall.ware.dao.WareSkuDao`接口的`getSkuStock`抽象方法的`long getSkuStock(Long skuId);`替换为`Long getSkuStock(Long skuId);`

![image-20220707235655755](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.4.2.png)

##### 5、超时异常

这时如果点击`GulimallProductApplication`服务，这时 报的是超时异常而不是原本的异常

```
detailMessage = "Read timed out executing POST http://gulimall-ware/ware/waresku/hasStock"
```

![image-20220707235900319](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.2.5.png)

#### 3、再次测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

##### 1、打断点

取消`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法的`List<Long> skuIdList = skuInfoEntities.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());`前面的断点，并在`List<Long> skuIdList = skuInfoEntities.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());`这里打一个断点

![image-20220708093113446](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.1.png)

##### 2、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`List<Long> skuIdList = skuInfoEntities.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());`这个断点

![image-20220708093411154](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.2.png)

##### 3、点击`Step Over`(步过)按钮

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`List<Long> skuIdList = skuInfoEntities.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());`

把`SkuInfoEntity`集合的`skuId`收集起来，准备发送给远程的`GulimallWareApplication`服务

![image-20220708093446974](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.3.png)

##### 4、跳转到`gulimall-ware`模块

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，就来到了`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`List<SkuHasStockTo> skuHasStocks =  wareSkuService.getSkuHasStock(skuIds);`这条语句

![image-20220708093542485](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.4.png)

##### 5、又跳转到异常了

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句，又跳转到异常了

![image-20220708093714853](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.5.png)

##### 6、空指针异常

再次点点击`Resume Program`或按`F9`放行这些异常处理类，可以看到报了空指针异常

```java
java.lang.NullPointerException: null
	at com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl.lambda$getSkuHasStock$0(WareSkuServiceImpl.java:114) 
```

![image-20220708093842030](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.6.png)

##### 7、修改`getSkuHasStock`方法

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`getSkuHasStock`方法里

`vo.setHasStock(count > 0);`这条语句，由于刚刚没有查询到库存信息，所以`null > 0`由于`null`不能和`0`相比，所以就报异常了

修改`vo.setHasStock(count > 0);`为`vo.setHasStock(count != null && count > 0);`即可

![image-20220708094222616](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.3.7.png)

#### 4、重新测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

##### 1、运行到`getSkuHasStock`方法

不断点击``Resume Program``和`Step Over`按钮，一直运行到`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`List<SkuHasStockTo> skuHasStocks =  wareSkuService.getSkuHasStock(skuIds);`这里

![image-20220708094834762](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.1.png)

##### 2、打两个断点

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`getSkuHasStock`方法的`List<SkuHasStockTo> collect = skuIds.stream().map(skuId -> {`和`vo.setHasStock(count != null && count > 0);`这里共打两个断点

![image-20220708094940007](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.2.png)

##### 3、点击`Step Over`按钮

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

可以看到，已经运行到`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`getSkuHasStock`方法的`List<SkuHasStockTo> collect = skuIds.stream().map(skuId -> {`这里了

`skuIds`的数据也正确传过来了

![image-20220708095122328](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.3.png)

##### 4、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`vo.setHasStock(count != null && count > 0);`这里

此时`vo`的`skuId`已赋值进去了，`hasStock`还为`null`(这里的`vo`其实应该改名为`to`)

![image-20220708095418795](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.4.png)

##### 5、点击`Step Over`按钮

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

这时`vo`的`hasStock`已经正确赋值了

![image-20220708095438279](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.5.png)

##### 6、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`skuId`为`2`的`SkuHasStockTo vo = new SkuHasStockTo();`这里

再次点击`Resume Program`或按`F9`，执行到`skuId`为`2`的`vo.setHasStock(count != null && count > 0);`这里

![image-20220708095724506](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.6.png)

##### 7、点击`Step Over`按钮

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

这时`skuId`为`2`的`vo`的`hasStock`已经正确赋值了

![image-20220708095645706](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.7.png)

##### 8、取消断点并打新断点

取消`vo.setHasStock(count != null && count > 0);`上的断点，并在`return vo;`上打断点

![image-20220708095851633](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.8.png)

##### 9、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`skuId`为`3`的`return vo;`这里

这时`skuId`为`3`的`vo`的`skuId`和`hasStock`已经正确赋值了

![image-20220708100126026](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.9.png)

##### 10、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`skuId`为`4`的`return vo;`这里

这时`skuId`为`4`的`vo`的`skuId`和`hasStock`已经正确赋值了

![image-20220708100204156](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.10.png)

##### 11、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`skuId`为`4`的`return vo;`这里

这时`skuId`为`4`的`vo`的`skuId`和`hasStock`已经正确赋值了，此时的`hasStock`的值为`false`

![image-20220708100302122](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.11.png)

##### 12、取消`WareSkuServiceImpl`类的断点  

取消`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`getSkuHasStock`方法的`return vo;`这个断点

![image-20220708101101798](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.12.png)

##### 13、在`WareSkuController`类打断点

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`return new RS<>(skuHasStocks);`这里打个断点

![image-20220708100911243](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.13.png)

##### 14、对比数据

点击`Resume Program`或按`F9`，执行到`skuId`为`4`的`return new RS<>(skuHasStocks);`这里

可以看到`skuHasStocks`对象的`elementData`里已经封装了这些数据

![image-20220708101241138](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.14.1.png)

这些数据与`gulimall_wms`数据库的`wms_ware_sku`表里数据一致

![image-20220708100724041](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.14.2.png)

##### 15、点击`Resume Program`

点击`Resume Program`或按`F9`，放行`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法，准备跳转到`gulimall-product`模块

![image-20220708101546784](https://gitlab.com/apzs/image/-/raw/master/image/5.2.8.4.15.png)

### 5.2.9、测试（3）

#### 1、准备工作

##### 1、超时异常

点击`Services`里的`GulimallProductApplication`服务，这时已经报了超时异常

这是因为刚刚调试用了很多时间，所以出现了超时异常

```
detailMessage ="Read timed out executing POST http://gulimall-ware/ware/waresku/hasStock"
```

![image-20220708101743116](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.1.1.png)

##### 2、去掉`ware`模块的所有断点

去掉`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法上的全部断点

![image-20220708102010977](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.1.2.1.png)

去掉`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`getSkuHasStock`方法的所有断点

![image-20220708102029537](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.1.2.2.png)

#### 2、再次测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

##### 1、准备远程调用

这次直接来到了`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法的`List<Long> skuIdList = skuInfoEntities.stream().map(SkuInfoEntity::getSkuId).collect(Collectors.toList());`上

![image-20220708111049704](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.1.png)

##### 2、`isSkuStock`还是为`null`

点击`Resume Program`或按`F9`，执行完远程调用，来到`Map<Long, Boolean> finalIsSkuStock = isSkuStock;`这里，可以看到`isSkuStock`还是为`null`，很明显写的还是有问题，这里先不管，继续向后执行

在`SkuEsModel skuEsModel = new SkuEsModel();`上打个断点

![image-20220708111244017](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.2.png)

##### 3、打个断点

点击`Resume Program`或按`F9`，来到`SkuEsModel skuEsModel = new SkuEsModel();`这里

在`return skuEsModel;`这行打个断点（不要点击放行）

![image-20220708111748174](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.3.png)

##### 4、点击两次`Step Over`(步过)按钮

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮两次，执行当前方法的下两个语句

来到`boolean hasStock = false;`这里，可以看到`skuInfoEntity`里与`skuEsModel`相同名称的属性已经拷到`skuEsModel`里了

![image-20220708153005034](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.4.1.png)

这与`gulimall_pms`数据库的`pms_sku_info`表的`sku_id`为`1`的数据一致

![image-20220708175924627](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.4.2.png)

##### 5、`finalIsSkuStock`也为`null`

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

由于`isSkuStock`为`null`，所以`finalIsSkuStock`也为`null`，因此`if (finalIsSkuStock ==null || !finalIsSkuStock.containsKey(skuInfoEntity.getSkuId())){`的第一的条件成立，默认被设置成了有库存

![image-20220708153339881](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.5.png)

##### 6、`hasStock`属性已修改为`true`

一直点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的后面语句

执行到`skuEsModel.setHotScore(0L);`这里可以看到，`skuEsModel`的`hasStock`属性已修改为`true`

![image-20220708153624248](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.6.png)

##### 7、点击`Step Over`

一直点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的后面语句

执行到`CategoryEntity categoryEntity = categoryService.getById(skuInfoEntity.getCatalogId());`这里

可以看到`BrandEntity brandEntity = brandService.getById(skuInfoEntity.getBrandId());`这行语句已经查询出数据了，到这里已经正确把`brandEntity`对象的`name`属性和`logo`属性赋值给`skuEsModel`的`brandName`属性和`brandImg`属性

![image-20220708153826145](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.7.png)

##### 8、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`return skuEsModel;`这里

可以看到`skuEsModel`对象的`catalogName`属性和`attrs`属性也正确赋值了

![image-20220708175616139](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.8.png)

##### 9、重新打断点

取消`SkuEsModel skuEsModel = new SkuEsModel();`这个断点

![image-20220708203000435](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.9.1.png)

取消`return skuEsModel;`这个断点，并在`R r = searchFeignService.productStatusUp(collect);`这里打上断点

![image-20220708203031998](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.9.2.png)

##### 10、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`R r = searchFeignService.productStatusUp(collect);`这里

可以看到已经把`SkuEsModel`集合收集到`collect`里了

![image-20220708203518101](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.2.10.png)

#### 3、进入`feign`源码

##### 1、点击`Step Into`

点击`Step Into`或按` F7`，进入`R r = searchFeignService.productStatusUp(collect);`方法内部，查看`feign`的调用过程

![image-20220708203549286](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.1.png)

##### 2、判断方法名称

在`feign-core-10.2.3`jar包的`feign.ReflectiveFeign`类里的`invoke`方法里面

首先判断这个方法是不是`equals`、 `hashCode` 、`toString`，如果是这些方法直接调用本类(`feign.ReflectiveFeign`类)的这些方法

![image-20220708203837672](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.2.1.png)

传入的`Method`方法的完整内容如下所示，可以看到`name`属性的值为`productStatusUp`，并不是这些方法

![image-20220709154435437](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.2.2.png)

##### 3、准备跳到同步方法处理器

一直点击`Step Over`按钮步过，到`return "toString".equals(method.getName()) ? this.toString() : ((MethodHandler)this.dispatch.get(method)).invoke(args);`这里

![image-20220708204842140](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.3.png)

##### 4、跳到同步方法处理器

点击`Step Into`或按` F7`，进入`((MethodHandler)this.dispatch.get(method)).invoke(args);`里面

这是跳到了`SynchronousMethodHandler`类的内部(同步方法处理器)

传入的`Object[] argv`参数的`argv[0]`的数据为远程调用的`collect`

![image-20220708205331533](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.4.png)

##### 5、构造请求模块

在`feign-core-10.2.3`jar包的`feign.SynchronousMethodHandler`类的`invoke`方法里的

`RequestTemplate template = this.buildTemplateFromArgs.create(argv);`

这里构造了一个请求模板，用于封装发送请求的信息

![image-20220708205636852](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.5.png)

##### 6、`template`对象属性

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句,跳到`Retryer retryer = this.retryer.clone();`这里

`template`对象含有以下属性

`uriTemplate = "/search/save/product"`	指出要请求的路径

`method = "POST"`	指出请求方式为`POST`

`charset = "UTF-8"` 设置字符编码为`UTF-8` 

![image-20220708205926976](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.6.png)

##### 7、查看`template`对象的`data`字段

点击`template` -> `body` -> `data` 右键选择`View as` -> `String`，即可查看`template`对象的`body`属性的`data`字段的数据

可以发现`feign`在底层会将数据转成`json`

![GIF 2022-7-8 21-02-23](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.7.1.png)

点击`data`属性右侧的`...View`，即可查看详细`json`，以下是这个`json`的详细数据

[点击查看完整json](code/5.2.9.3.7.json)

![image-20220708210554513](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.7.2.png)

##### 8、拿到重试器 

`Retryer retryer = this.retryer.clone();`这里拿到了一个重试器 

![image-20220708210754661](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.8.png)

##### 9、准备执行和解码

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`return this.executeAndDecode(template);` 执行和解码

这行代码会远程执行请求，然后将响应拿过来，将响应数据解码

![image-20220708211052256](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.9.png)

##### 10、点击`Step Into`

点击`Step Into`或按` F7`，进入`return this.executeAndDecode(template);`这个调用的方法内部

`Request request = this.targetRequest(template);`

使用刚刚创建的`template`构造一个目标请求

![image-20220708211538439](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.10.png)

##### 11、有日志时会记录日志

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`if (this.logLevel != Level.NONE) {`

这里如果有日志的话，也会记录日志

![image-20220708211656257](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.11.png)

##### 12、点击`Step Over`(步过)按钮

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`long start = System.nanoTime();`

获取开始时间

```
返回正在运行的Java虚拟机的高分辨率时间源的当前值，以纳秒为单位。

此方法只能用于测量经过的时间，并且与系统或挂钟时间的任何其他概念无关。返回的值表示纳秒，因为某些固定的任意原点时间 （可能在将来，因此值可能为负）。

在Java虚拟机的实例中，所有对此方法的调用都使用相同的原点;其他虚拟机实例可能使用不同的来源。 此方法提供纳秒级精度，但不一定是纳秒级分辨率（即，值的变化频率） - 除了分辨率至少与currentTimeMillis（）的分辨率一样好之外，不做任何保证。

连续调用的差异超过大约292年（2^63纳秒）将无法正确计算由于数值溢出而导致的经过时间。 只有在计算在Java虚拟机的同一实例中获得的两个此类值之间的差异时，此方法返回的值才有意义。

例如，要测量某些代码执行所需的时间：

long startTime = System.nanoTime（）; 
// ...正在测量的代码...... 
long estimatedTime = System.nanoTime（） -  startTime; 
比较两个nanoTime值 
long t0 = System.nanoTime（）; ... long t1 = System.nanoTime（）;

一个应该使用t1 - t0 <0，而不是t1 <t0，因为数字溢出的可能性.

Returns：正在运行的Java虚拟机的高分辨率时间源的当前值，以纳秒为单位

从以下版本开始：1.5
```

![image-20220708211852923](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.12.png)

##### 13、负载均衡的`feign`客户端

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`response = this.client.execute(request, this.options);`这里就是正真的执行

`this.client`为`LoadBalancerFeignClient` 负载均衡的`feign`客户端，会正真负载均衡的执行这个请求，该调用哪个服务就调用那个服务

![image-20220708212126573](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.13.png)

##### 14、发送http请求

这个执行请求的过程就是发送http请求的过程，这里就不看了

![image-20220708212437193](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.3.14.png)

#### 4、来到`search`项目

##### 1、进入`ElasticSaveController`类

直接点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句，由于`response = this.client.execute(request, this.options);`方法会调用`GulimallSearchApplication`服务

所以就来到了`gulimall-search`模块的`com.atguigu.gulimall.search.controller.ElasticSaveController`类的`productStatusUp`方法

![image-20220708212722260](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.1.1.png)

可以看到`skuEsModels`已经封装好了数据，这里封装的数据得益于`Spring MVC`

而发送`htpp`请求时发送的数据得益于`felgn`

![image-20220708213014072](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.1.2.png)

##### 2、打两个断点

在`gulimall-search`模块的`com.atguigu.gulimall.search.service.impl.ProductSaveServiceImpl`类的`productStatusUp`方法的`BulkRequest bulkRequest = new BulkRequest();`和`BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, GulimallElasticSearchConfig.COMMON_OPTIONS);`各打一个断点，共打两个断点

![image-20220708213547286](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.2.png)

##### 3、点击`Step Over`(步过)按钮

点击`GulimallSearchApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

`b = productSaveService.productStatusUp(skuEsModels);`

这里准备调用`ProductSaveServiceImpl`类的`productStatusUp`方法

![image-20220708213426117](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.3.png)

##### 4、点击`Step Into`

点击`Step Into`或按` F7`，进入`b = productSaveService.productStatusUp(skuEsModels);`调用的方法内部

然后就进入`ProductSaveServiceImpl` 类的`productStatusUp`方法，这里比较简单就不看了

![image-20220709192049280](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.4.png)

##### 5、`productStatusUp`方法里打断点

在`gulimall-search`模块的`com.atguigu.gulimall.search.controller.ElasticSaveController`类的`productStatusUp`方法的`if (b){`这里打个断点

![image-20220708213732998](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.5.png)

##### 6、点击`Resume Program`

点击`Resume Program`或按`F9`，执行到`if (b){`这里，可以看到此时的`b`的值为`true`，证明执行成功了

![image-20220709192347080](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.6.png)

##### 7、`Read timed out`

点击`Resume Program`或按`F9`，切换到`GulimallProductApplication`服务，点击控制台就可以看到抛出了读取超时异常

```
Caused by: java.net.SocketTimeoutException: Read timed out
	at java.net.SocketInputStream.socketRead0(Native Method) ~[na:1.8.0_301]
```

![image-20220709193327500](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.7.png)

##### 8、总结

```
Feign调用流程
1、构造请求数据，将对象转为json
    RequestTemplate template = buildTemplateFromArgs.create(argv);
2、发送请求进行执行(执行成功会解码响应数据)
    executeAndDecode(template); 
3、执行请求会有重试机制
    while(true){
        try{
            executeAndDecode(template);
        }catch(){
            try{retryer.continueOrPropagate(e);}catch(){throw ex;}
            continue;
        }
    }
```

![image-20220708215353412](https://gitlab.com/apzs/image/-/raw/master/image/5.2.9.4.8.png)

### 5.2.10、解决bug

#### 1、准备工作

##### 1、重新打断点

![GIF 2022-7-9 19-40-46](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.1.1.1.png)

随便右击一个断点，也可以来到断点管理界面

![GIF 2022-7-9 19-42-17](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.1.1.2.png)

##### 2、点击`上架`

刷新前端项目，然后在`商品系统/商品维护/spu管理`里的id为`2`的商品里点击右侧`操作`里的`上架`

![image-20220709194455644](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.1.2.png)

#### 2、开始测试

##### 1、切换到`IDEA`

切换到`IDEA`，来到`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法

`List<SkuInfoEntity> skuInfoEntities = skuInfoService.getSkusBySpuId(spuId);`

![image-20220709194626563](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.2.1.png)

##### 2、点击`Resume Program`

点击`Resume Program`或按`F9`，来到`RS<List<SkuHasStockTo>> skuHasStock = wareFelginService.getSkuHasStock(skuIdList);`这里

![image-20220709195040644](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.2.2.png)

##### 3、点击`Step Over`(步过)按钮

点击`GulimallSearchApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

可以看到`skuHasStock`的`size = 0`

![image-20220709195500014](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.2.3.1.png)

可以看到`skuHasStock`对象的值为`null`

![image-20220709194928495](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.2.3.2.png)

##### 4、打断点

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`return new RS<>(skuHasStocks);`这里打上断点

![image-20220709211336697](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.2.4.png)

#### 3、重新测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

##### 1、点击`Resume Program`

点击`Resume Program`或按`F9`，来到`RS<List<SkuHasStockTo>> skuHasStock = wareFelginService.getSkuHasStock(skuIdList);`这里

![image-20220709211517850](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.1.png)

##### 2、点击`Step Over`(步过)按钮

点击`GulimallProductApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

来到`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`return new RS<>(skuHasStocks);`这里

可以看到`skuHasStocks`已经正确查询出数据

![image-20220709211545815](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.2.png)

##### 3、点击`Step Into`

点击`Step Into`或按` F7`，进入` return new RS<>(skuHasStocks);`调用的方法内部

![image-20220709211734493](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.3.png)

##### 4、来到`RS`类

可以看到来到了`gulimall-common`模块的`com.atguigu.common.utils.RS`类的`public R2(T t) {`这里

![image-20220709211755779](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.4.png)

##### 5、点击`Step Over`(步过)按钮

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句，可以看到`this.setData(data);`

这里写错了，应该先调用`ok()`方法，不过这也不影响结果，只是不符合规范，也不会导致获取不到`data`

```java
public R2(T t) {
   this.ok();
   this.setData(data);
}
```

![image-20220709211818135](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.5.png)

##### 6、点击`Step Over`(步过)按钮

点击`GulimallWareApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句

执行完`public R2(T t) {`这个构造器

![image-20220709211832308](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.6.1.png)

可以看到此时该对象的`size = 0`

![image-20220709211937754](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.6.2.png)

这里没用是因为Jackson对于HashMap类型会有特殊的处理方式，具体来说就是会对类进行向上转型为Map，导致子类的私有属性消失，IDEA以`debug`方式也看不到这些属性的信息

父类实现序列化，子类就不需要实现序列化（也相当于实现了序列化），这里存不进去值是因为R的保存属性是一个复杂类型，这个类型（SkuHasStockTo）没有实现序列化接口

```
类继承于map或者list或者set后，在其他对于这个类的操作时需要特别注意，比如，使用fastjson等工具类进行转换成json时将不会转换map、list、set之外的属性。举例，A类继承list后，又在A类中添加了一个name属性，如果将A类转换成json将不会包含A类的属性，就是json中不包含name属性，只会调用list的中的比如迭代器进行遍历list的方式查询list中的数据。如果A类是自己set属性后自己get属性，那么没有影响。
```

![image-20220709212036439](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.6.3.png)

##### 7、修改返回的对象

###### 方法一：不继承HashMap(推荐)

```java
package com.atguigu.common.utils;

import lombok.Data;

@Data
public class RS<T> {
    private static final long serialVersionUID = 1L;

    private int code;

    private String msg;

    private boolean success;

    private T data;


    public RS<T> ok(String msg) {
        return this.ok(0,msg);
    }

    public RS<T> ok() {
        return this.ok(0,"success");
    }

    public RS<T> ok(int code, String msg) {
        this.code = code;
        this.msg = msg;
        this.success = true;
        return this;
    }

    public RS<T> ok(T t) {
        this.data = t;
        return this;
    }

    public RS<T> setData(T data) {
        this.data = data;
        return this;
    }

    public T getData() {
        return data;
    }

    public RS<T> error(int code, String msg) {
        this.code = code;
        this.msg = msg;
        this.success = false;
        return this;
    }


}
```

![image-20220709223734632](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.7.1.png)

###### 方法二：写`get`和`set`方法

```java
/**
 * Copyright (c) 2016-2019 人人开源 All rights reserved.
 *
 * https://www.renren.io
 *
 * 版权所有，侵权必究！
 */

package com.atguigu.common.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.atguigu.common.exception.BizCodeException;
import org.apache.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

public class R2 extends HashMap<String, Object> {
   private static final long serialVersionUID = 1L;

   public <T> T getData(TypeReference<T> tTypeReference) {
      Object data = get("data");
      String s = JSON.toJSONString(data);
      T t = JSON.parseObject(s,tTypeReference);
      return t;
   }

   public R2 setData(Object data) {
      this.put("data",data);
      return this;
   }

   public R2(){

   }

   
   public R2 error() {
      return error(HttpStatus.SC_INTERNAL_SERVER_ERROR, "未知异常，请联系管理员");
   }
   
   public R2 error(String msg) {
      return error(HttpStatus.SC_INTERNAL_SERVER_ERROR, msg);
   }
   
   public R2 error(int code, String msg) {
      this.put("code", code);
      this.put("msg", msg);
      return this;
   }

   public R2 error(BizCodeException bizCodeException){
      return error(bizCodeException.getCode(),bizCodeException.getMsg());
   }

   public R2 ok() {
      this.put("code", 0);
      this.put("msg", "success");
      return this;
   }

   public R2 ok(String msg) {
      this.put("code", 0);
      this.put("msg", msg);
      return this;
   }

   public R2 ok(int code, String msg) {
      this.put("code", code);
      this.put("msg", msg);
      return this;
   }

   public R2 ok(Map<String, Object> map) {
      this.ok();
      this.putAll(map);
      return this;
   }


   @Override
   public R2 put(String key, Object value) {
      super.put(key, value);
      return this;
   }


   public Integer getCode(){
      return (Integer) this.get("code");
   }
}
```

![image-20220709224139491](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.7.2.png)

##### 8、修改`getSkuHasStock`方法

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法

并在`RS<List<SkuHasStockTo>> rs = new RS<List<SkuHasStockTo>>();`打上断点

```java
@PostMapping("/hasStock")
public RS<List<SkuHasStockTo>> getSkuHasStock(@RequestBody List<Long> skuIds) {
    List<SkuHasStockTo> skuHasStocks = wareSkuService.getSkuHasStock(skuIds);

    RS<List<SkuHasStockTo>> rs = new RS<List<SkuHasStockTo>>();
    RS<List<SkuHasStockTo>> ok = rs.ok();
    ok.setData(skuHasStocks);
    return rs;
}
```

![image-20220709223901636](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.3.8.png)

#### 4、重新测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`

##### 1、执行到`WareSkuController`类

不断执行断点，直到执行到`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法的`return rs;`这里

可以看到已经正确封装对象了

![image-20220709222958826](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.4.1.png)

##### 2、超时异常

点击`Services`里的`GulimallProductApplication`服务，这时已经报了超时异常

这是因为刚刚调试用了很多时间，所以出现了超时异常

```
detailMessage ="Read timed out executing POST http://gulimall-ware/ware/waresku/hasStock"
```

![image-20220709223056739](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.4.2.png)

##### 3、取消`ware`模块的断点

取消`RS<List<SkuHasStockTo>> rs = new RS<List<SkuHasStockTo>>();`上的断点

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类的`getSkuHasStock`方法，变为更加精简的方式

```java
@PostMapping("/hasStock")
public RS<List<SkuHasStockTo>> getSkuHasStock(@RequestBody List<Long> skuIds) {
    List<SkuHasStockTo> skuHasStocks = wareSkuService.getSkuHasStock(skuIds);

    RS<List<SkuHasStockTo>> rs = new RS<List<SkuHasStockTo>>();
    return rs.ok().setData(skuHasStocks);
}
```

![image-20220709225243977](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.4.3.png)

#### 5、再次测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端页面，再次在`商品系统/商品维护/spu管理`里的id为`1`的商品里点击右侧`操作`里的`上架`



在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类的`up`方法

执行完`RS<List<SkuHasStockTo>> skuHasStock = wareFelginService.getSkuHasStock(skuIdList);`

来到`isSkuStock = skuHasStock.getData().stream().collect(Collectors.toMap(SkuHasStockTo::getSkuId, SkuHasStockTo::getHasStock));`这里可以看到以成功封装数据

![image-20220709223602905](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.5.png)

#### 6、 整体测试

重新以`debug`方式启动`GulimallProductApplication`商品服务和`GulimallWareApplication`库存服务

刷新前端项目，然后在`商品系统/商品维护/spu管理`里的id为`2`的商品里点击右侧`操作`里的`上架`

然后不断点击点击`Resume Program`或按`F9`，直到运行结束

切换到前端，可以看到在`商品系统/商品维护/spu管理`里的id为`2`的商品里`上架状`态已变为`已上架`

![GIF 2022-7-9 22-52-19](https://gitlab.com/apzs/image/-/raw/master/image/5.2.10.6.gif)

## 5.3、商城业务-首页&nginx

### 5.3.1、打开首页

#### 1、引入依赖

##### 1、引入`thymeleaf`依赖

在`gulimall-product`模块的`pom.xml`文件里引入`thymeleaf`依赖

```xml
<!--模板引擎：thymeleaf-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
    <version>2.1.5.RELEASE</version>
</dependency>
```

![image-20220709230519121](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.1.png)

##### 2、引入`devtools`依赖

在`gulimall-product`模块的`pom.xml`文件里引入`devtools`依赖，该依赖可以在不重启服务的情况下动态刷新静态资源

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <version>2.1.5.RELEASE</version>
    <optional>true</optional>
</dependency>
```

![image-20220710213439204](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.2.1.png)

点击`Build` -> `Build Project` 或按快捷键`Ctrl+F9`，可以刷新`gulimall-product`项目的静态文件

(刷新java代码会有一些问题，修改代码后建议重新运行项目)

![image-20220713152927981](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.2.2.png)

点击`Build` -> `Recompile "index.html'` 或按快捷键`Ctrl+ Shift+F9`，可以重新编译当前静态文件

![image-20220713152941970](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.2.3.png)

##### 3、去掉版本后报错

```xml
<!--模板引擎：thymeleaf-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

去掉`thymeleaf`依赖和`devtools`依赖的`<version>2.1.5.RELEASE</version>`后保存

```
Failed to read artifact descriptor for org.springframework.boot:spring-boot-starter-thymeleaf:jar:2.1.8.RELEASE

无法读取 org.springframework.boot:spring-boot-starter-thymeleaf:jar:2.1.8.RELEASE 的工件描述符
```

![image-20220710213937773](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.3.png)

##### 4、`clean`&`install`

###### 1、点击`clean`

点击`IDEA`右侧的`Maven`，选择`gulimall-product`，点击`Lifecycle`(生命周期)，点击`clean`删除由项目编译创建的target文件夹

![image-20220710214543669](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.1.png)

###### 2、点击`install`

点击`IDEA`右侧的`Maven`，选择`gulimall-product`，点击`Lifecycle`(生命周期)，点击`install`

将当前项目jar包安装（放置）至Maven的本地仓库中。供其他项目使用

此时报了一个错

```
Error:(5,32) java: 程序包com.atguigu.common.valid不存在
```

![image-20220710214556143](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.2.png)

###### 3、查看依赖

点击`IDEA`右侧的`Maven`，选择`gulimall-product`，点击`Dependencies`，可以看到`com.atquiqu.qulimall:qulimall-common:0.0.1-SNAPSHOT`报红了，所有找不到`com.atguigu.common.valid`包

![image-20220710214807199](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.3.png)

###### 4、重新加载

点击`IDEA`右侧的`Maven`，点击刷新按钮`Reload All Maven Projects`重新加载所有`maven`项目

![image-20220710214849781](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.4.png)

###### 5、再次点击`install`

点击`IDEA`右侧的`Maven`，选择`gulimall-product`，点击`Lifecycle`(生命周期)，点击`install`

又报了同样的错误

```
Error:(6,32) java: 程序包com.atguigu.common.valid不存在
```

![image-20220710215013118](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.5.png)

###### 6、`clean`&`install`common模块

如果安装的有`Maven Helper`插件，可以选择`Project`里的`gulimall-common`模块，然后右键选择`Run Maven` -> `clean install`

![image-20220710215207383](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.6.1.png)

该插件如下图所示

![image-20220710221643210](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.6.2.png)

或者点击`IDEA`右侧的`Maven`，选择`gulimall-common`，点击`Lifecycle`(生命周期)，点击`clean`删除由项目编译创建的target文件夹

点击`install`将当前项目jar包安装（放置）至Maven的本地仓库中。供其他项目使用

这样也可以

![image-20220710222049450](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.6.3.png)

###### 7、再次点击`install`

点击`IDEA`右侧的`Maven`，选择`gulimall-product`，点击`Lifecycle`(生命周期)，点击`install`，这样就成功了

![image-20220710215122624](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.7.png)

###### 8、`Dependencies`报红

`ponx.ml`不报错了，`install`也成功了，但点击`IDEA`右侧的`Maven`可以看到`gulimall-product`模块的`Dependencies`里的`org.springframework. boot:spring-boot-starter-thymeleaf:2.1 .8.RELEASE`和`org.springframework.boot:spring-boot-devtools:2.1.8.RELEASE`还是报红

![image-20220710215305153](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.4.8.png)

##### 5、清除缓存

点击`File`  -> `invalidate caches/restart...` 清除缓存并重新打开项目

当`maven`项目依赖问题怎么都解决不了的时候，这种方式时最有效的

(还有一种方式是手动安装`maven`依赖)

![image-20220710220126569](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.1.5.png)

#### 2、导入资源

在`gulimall-product`模块的`src/main/resources`目录下新建`static`文件夹和`templates`文件夹

把`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\首页资源`里的`index`文件夹及其子文件复制到`gulimall-product`模块的`src/main/resources/static`目录里

把`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\首页资源`里的`index.html`复制到`gulimall-product`模块的`src/main/resources/templates`目录里

![image-20220710204122840](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.2.1.png)

![image-20220709230436074](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.2.2.png)

#### 3、关闭thymeleaf的缓存

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件里添加配置，关闭thymeleaf的缓存

```yaml
spring:
  thymeleaf:
    #关闭thymeleaf的缓存
    cache: false
    prefix: classpath:/templates/
    suffix: .html
```

![image-20220710204407021](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.3.png)

#### 4、查看前端页面

直接通过浏览器访问： http://localhost:10000/

![image-20220710212123458](https://gitlab.com/apzs/image/-/raw/master/image/5.3.1.4.png)

### 5.3.2、查询所有一级分类

#### 1、新建`IndexController`类

在`gulimall-product`模块的`com.atguigu.gulimall.product`包下新建`web`文件夹，在`web`文件夹里新建`IndexController`类

```java
package com.atguigu.gulimall.product.web;

import com.atguigu.gulimall.product.entity.CategoryEntity;
import com.atguigu.gulimall.product.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/10
 * @Description:
 */
@Controller
public class IndexController {

    @Autowired
    CategoryService categoryService;

    @GetMapping(value = {"/","index.html"})
    public String indexPage(Model model){
        //查出所有的一级分类
        List<CategoryEntity> categoryEntities = categoryService.getLevel1Categories();
        model.addAttribute("categories",categoryEntities);
        //classpath:/templates/  + index +   .html
        return "index";
    }
}
```

![image-20220710210549773](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.1.png)

#### 2、新建`getLevel1Categories`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.CategoryService`接口里新建`getLevel1Categories`抽象方法

```java
List<CategoryEntity> getLevel1Categories();
```

![image-20220710210605517](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.2.png)

#### 3、实现`getLevel1Categories`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里实现`getLevel1Categories`抽象方法

```java
@Override
public List<CategoryEntity> getLevel1Categories() {
    LambdaQueryWrapper<CategoryEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(CategoryEntity::getParentCid,0);
    lambdaQueryWrapper.select(CategoryEntity::getCatId,CategoryEntity::getName);
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(lambdaQueryWrapper);
    return categoryEntities;
}
```

![image-20220710225914651](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.3.png)

#### 4、修改`ndex.html`文件

##### 1、修改`ndex.html`文件

修改`gulimall-product`模块的`src/main/resources/templates/index.html`文件

[点击查看完整`index.html`代码](code/5.3.2.4.1.index.html)

![image-20220710230624609](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.4.1.png)

##### 2、使用`thymeleaf`步骤

###### 1、引入命名空间

把

```html
<html lang="en">
```

替换为

```html
<html lang="en" xmlns:th="http://www.thymeleaf.org">
```

![image-20220710231051879](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.4.2.1.1.png)

![image-20220710231517507](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.4.2.1.2.png)

###### 2、使用`th`标签

把

```html
<ul>
    <li>
        <a href="#" class="header_main_left_a" ctg-data="3"><b>家用电器</b></a>
    </li>
    <li class="header_li2">
        <a href="#" class="header_main_left_a" ctg-data="2,4"><b>手机</b> / <b>运营商</b> / <b>数码</b></a>
    </li>
    <li class="header_li2">
        <a href="#" class="header_main_left_a" ctg-data="6"><b>电脑</b> / <b>办公</b></a>
    </li>
</ul>
```

替换为

```html
<ul>
  <li th:each="category : ${categories}">
    <a href="#" class="header_main_left_a" th:attr="ctg-data=${category.catId}"><b th:text="${category.name}">家用电器</b></a>
  </li>
</ul>
```

![image-20220710231249788](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.4.2.2.1.png)

`th:each="category : ${categories}"`  遍历集合`categories`，每次遍历的单个对象命名为`category`

`th:text="${category.name}"`获取`category`对象的`name`属性的值，并相当于`value`属性，替换掉原本标签的内容

![image-20220710231657605](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.4.2.2.2.png)

`th:attr="ctg-data=${category.catId}`自定义`ctg-data`属性，其值为动态获取的`category.catId`

![image-20220710232148285](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.4.2.2.3.png)

#### 5、浏览器访问

浏览器访问：http://localhost:10000

![image-20220710230810485](https://gitlab.com/apzs/image/-/raw/master/image/5.3.2.5.png)

### 5.3.3、渲染二级三级分类数据

#### 1、查看数据的结构

##### 1、模拟数据

模拟的数据在`gulimall-product`模块的`src/main/resources/static/index/json/catalog.json`文件里，复制该模拟数据

![image-20220711084836072](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.1.1.png)

##### 2、发送请求的文件

发送请求的文件在`gulimall-product`模块的在`src/main/resources/static/index/js/catalogLoader.js`里面。把第二行的`$.getJSON("index/json/catalog.json",function (data) {`修改为`$.getJSON("index/catalog.json",function (data) {`

![image-20220711085421407](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.1.2.png)

##### 3、格式化后数据的结构

粘贴刚刚复制的模拟数据，粘贴到 www.json.cn 这个网站，查看json的结构

![image-20220711084956532](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.1.3.png)

#### 2、新建`Catelog2Vo`类

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包下，新建`Catelog2Vo`类

```java
package com.atguigu.gulimall.product.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/7/11
 * @Description: 二级分类vo
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Catelog2Vo {
    /**
     * 该二级分类对应的一级分类的id
     */
    private String catalog1Id;
    /**
     * 当前二级分类的id
     */
    private String id;
    /**
     * 当前二级分类的名字
     */
    private String name;
    /**
     * 该二级分类对应的所有三级分类
     */
    private List<Catelog3Vo> catalog3List;

    /**
     * 三级分类vo
     */
    @NoArgsConstructor
    @AllArgsConstructor
    @Data
    public static class Catelog3Vo{
        /**
         * 该三级分类对应的二级分类
         */
        private String catalog2Id;
        /**
         * 该三级分类的id
         */
        private String id;
        /**
         * 该三级分类的名字
         */
        private String name;
    }

}
```

![image-20220711090742035](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.2.png)

#### 3、添加`getCatalogJson`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.web.IndexController`类里添加`getCatalogJson`方法

```java
@ResponseBody
@GetMapping("/index/catalog.json")
public Map<String,List<Catelog2Vo>> getCatalogJson(){
    return categoryService.getCatalogJson();
}
```

![image-20220711091703531](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.3.png)

#### 4、添加`getCatalogJson`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.CategoryService`接口里添加`getCatalogJson`抽象方法

```java
/**
 * 查出所有的分类
 * @return k为一级分类的id，v为二级分类及其子分类的信息
 */
Map<String, List<Catelog2Vo>> getCatalogJson();
```

![image-20220711091617944](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.4.png)

#### 5、实现`getCatalogJson`抽象方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里实现`getCatalogJson`抽象方法

```java
@Override
public Map<String, List<Catelog2Vo>> getCatalogJson() {

    //1、查出所有一级分类
    List<CategoryEntity> level1Categories = this.getLevel1Categories();
    Map<String, List<Catelog2Vo>> result = level1Categories.stream().collect(Collectors.toMap(k -> k.getCatId().toString(), l1 -> {
        //2、该一级分类的所有二级分类
        LambdaQueryWrapper<CategoryEntity> category2QueryWrapper = new LambdaQueryWrapper<>();
        category2QueryWrapper.eq(CategoryEntity::getParentCid, l1.getCatId());
        List<CategoryEntity> category2Entities = this.baseMapper.selectList(category2QueryWrapper);
        List<Catelog2Vo> catelog2VoList = null;
        if (category2Entities != null) {
            catelog2VoList = category2Entities.stream().map(l2 -> {
                Catelog2Vo catelog2Vo = new Catelog2Vo();
                catelog2Vo.setCatalog1Id(l1.getCatId().toString());
                catelog2Vo.setId(l2.getCatId().toString());
                catelog2Vo.setName(l2.getName());
                //3、当前二级分类的所有三级分类
                LambdaQueryWrapper<CategoryEntity> category3QueryWrapper = new LambdaQueryWrapper<>();
                category3QueryWrapper.eq(CategoryEntity::getParentCid,l2.getCatId());
                List<CategoryEntity> category3Entities = this.baseMapper.selectList(category3QueryWrapper);
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
```

![image-20220711100836334](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.5.png)

#### 6、测试

重启`GulimallProductApplication`服务，访问： http://localhost:10000/index/catalog.json

![image-20220711100109956](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.6.1.png)

可以看到返回的结构与模拟数据的结构一致

![image-20220711100125256](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.6.2.png)

首页已经显示数据了

![image-20220711101310665](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.6.3.png)

测试以下是不是重数据库中查询来的

修改`gulimall_pms`数据库的`pms_category`表的`name`为`电子书`的字段，修改其为`电子书11`。刷新首页，可以看到已经更新了

![GIF 2022-7-11 10-05-40](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.6.4.gif)

如果没有更新，可以清除浏览器的缓存，再次刷新页面

依次点击 `chrome`浏览器右侧的竖着的三个点 -> 设置 -> 隐私设置和安全性 -> 清除浏览数据 -> 清除数据

![GIF 2022-7-11 10-16-55](https://gitlab.com/apzs/image/-/raw/master/image/5.3.3.6.5.gif)

### 5.3.4、nginx反向代理

**正向代理**：如科学上网，隐藏客户端信息

![image-20220721204940910](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.0.1.png)

**反向代理**：屏蔽内网服务器信息，负载均衡访问

![image-20220721205010885](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.0.2.png)

#### 1、`hsot`文件添加域名

##### 1、可修改`host`文件的方式

可以在`C:\Windows\System32\drivers\etc`目录下的`hosts`文件进行修改

第一次使用`记事本`会无法修改，可以使用`sublime text`或`notepad++`进行修改

![image-20220711104753942](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.1.1.1.png)

也可以使用`SwitchHosts`工具修改

![image-20220711104920953](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.1.1.2.png)

##### 2、使用自定义方案

打开`SwitchHosts`工具

1. 选择`本地方案`

2. 点击`+`号

3. 在弹出的对话框的`本地方案`的`方案名`里输入`gulimall`

4. 点击`OK`

![image-20220711105655475](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.1.2.1.png)

1. 选择本地方案里的`gulimall`

2. 在里面输入`192.168.56.10 gulimall.com`

3. 点击`对勾`即可使用当前方案

![image-20220711105753312](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.1.2.2.png)

##### 3、访问

访问虚拟机： http://gulimall.com:9200/

可以看到访问成功了

![image-20220711110258412](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.1.3.png)

#### 2、查看niginx配置

##### 1、nginx配置的目录结构

![image-20220711151115776](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.2.1.png)

##### 2、查看ngix配置

###### 1、总配置

```bash
docker ps
cd /mydata/nginx/
ls
cd conf/
ls
vi nginx.conf
```

![image-20220711153127308](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.2.2.1.1.png)

![image-20220711152851338](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.2.2.1.2.png)

###### 2、server块配置

```bash
cd conf.d/
ls
vi default.conf
```

![image-20220711154239877](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.2.2.2.1.png)

![image-20220711154258555](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.2.2.2.2.png)

#### 3、修改nginx配置

```bash
cp default.conf gulimall.conf
ls
vi gulimall.conf
```

![image-20220711155146105](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.3.1.png)

配置所有请求都到商品服务

```properties
server {
    listen       80;
    server_name  gulimall.com;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    location / {
        proxy_pass http://192.168.56.1:10000;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

![image-20220711154831136](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.3.2.png)

`server_name`配置的就是通过浏览器访问的请求的`Request Headers`请求头的`nama`属性

![image-20220711155751038](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.3.3.png)

#### 4、重启nginx

```bash
docker restart nginx
```

![image-20220711155515047](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.4.png)

#### 5、查看配置是否生效

浏览器访问： http://gulimall.com/

![image-20220711155529343](https://gitlab.com/apzs/image/-/raw/master/image/5.3.4.5.png)

### 5.3.5、`nginx`负载均衡到网关

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.0.1.png" alt="image-20220721204304167" style="zoom: 67%;" />

动静分离静：图片，js、css等静态资源（以实际文件存在的方式） 动：服务器需要处理的请求

每一个微服务都可以独立部署、运行、升级、独立自治;技术，架构，业务

**Nginx+Windows搭建域名访问环境**

![image-20220721204535110](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.0.2.png)

让nginx帮我们进行反向代理，所有来自原`gulimall.com`的请求，都转到商品服务

nginx代理给网关的时候，会丢失请求的host信息，需要在`location`里添加 `proxy_set_header Host $host;`

#### 1、查看文档

收购前网址： https://nginx.org/

收购后网址： https://www.nginx.com/

> The simplest configuration for load balancing with nginx may look like the following:

使用 nginx 进行负载平衡的最简单配置可能如下所示：(添加上游服务器)

```properties
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}
```

![GIF 2022-7-11 16-06-13](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.1.png)

#### 2、上游服务器配置

```bash
cd ../
ls
vi nginx.conf
```

![image-20220711161629988](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.2.1.png)

```properties
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
    upstream gulimall{
      server 192.168.56.1:88;
    }
    include /etc/nginx/conf.d/*.conf;
}
```

![image-20220711161508940](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.2.2.png)

#### 3、负载均衡到上游服务器

```bash
cd conf.d/
ls
vi gulimall.conf
```

![image-20220711162244887](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.3.1.png)

```properties
server {
    listen       80;
    server_name  gulimall.com;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    location / {
        proxy_pass http://gulimall;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

![image-20220711162027759](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.3.2.png)

#### 4、重启nginx

```bash
docker restart nginx
```

![image-20220711162423730](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.4.png)

#### 5、浏览器访问首页

浏览器访问首页：http://gulimall.com/

访问失败的原因是`nginx`转给了后端的网关，而网关没有配置

![image-20220711162506688](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.5.png)

#### 6、配置网关

##### 1、官方文档

官方文档：https://spring.io/projects/spring-cloud-gateway/

域名配置文档：https://docs.spring.io/spring-cloud-gateway/docs/2.2.9.RELEASE/reference/html/#the-host-route-predicate-factory

![GIF 2022-7-11 16-33-25](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.6.1.png)

##### 2、配置网关

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件中配置

```yaml
- id: gulimall_host_route
  uri: lb://gulimall-product
  predicates:
    - Host=**.gulimall.com
```

![image-20220711170519941](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.6.2.png)

#### 7、查看首页是否显示

重启`GulimallGatewayApplication`服务，刷新前端页面

##### 1、浏览器访问

打开 http://gulimall.com/ 页面，可以看到没有访问成功

![image-20220711165903388](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.1.png)

##### 2、以`debug`方式启动网关

以`debug`方式重新启动`GulimallGatewayApplication`服务，此时报了一个错

```
javax.management.InstanceNotFoundException: org.springframework.boot:type=Admin,name=SpringApplication
```

![image-20220711165952509](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.2.png)

##### 3、取消勾选`Enable JMX agent`

点击`Unnamed`，点击`Edit Configurations...`选择`GulimallGatewayApplication`服务，点击`编辑`按钮,在`Configuration`的`Spring boot`里取消勾选`Enable JMX agent`

再次以`debug`方式重新启动`GulimallGatewayApplication`服务

![GIF 2022-7-11 16-58-11](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.3.gif)

##### 4、又报了个错

```
Positive matches:
-----------------

   ArchaiusAutoConfiguration matched:
      - @ConditionalOnClass found required classes 'com.netflix.config.ConcurrentCompositeConfiguration', 'org.apache.commons.configuration.ConfigurationBuilder' (OnClassCondition)
```

![image-20220711170159408](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.4.png)

##### 5、向左缩进两格

修改`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件的`id`为`gulimall_host_route`的配置

让其相关配置向左缩进两格

[点击查看网关完整配置](code/5.3.5.7.5.application.yml)

![image-20220711170903534](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.5.png)

##### 6、路径匹配

重新以`debug`方式重新启动`GulimallGatewayApplication`服务，刷新 http://gulimall.com/ 页面

可以看到匹配了`id`为`gulimall_host_route`的规则，但是还是无法访问

![image-20220711171140290](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.6.1.png)

这是因为`nginx`在转发的时候，没有把`Request Headers`里的`Host: gulimall.com`带上

![image-20220711212405663](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.7.6.2.png)

#### 8、nginx添加头信息

```bash
ls
vi gulimall.conf
```

![image-20220711164727203](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.8.1.png)

在`location / {`里添加配置

```properties
proxy_set_header Host $host;
```

![image-20220711164409484](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.8.2.png)

#### 9、重启nginx

```
docker restart nginx
```

![image-20220711164548923](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.9.png)

#### 10、刷新页面

刷新 http://gulimall.com/ 页面，已经可以正常访问了

![image-20220711213107065](https://gitlab.com/apzs/image/-/raw/master/image/5.3.5.10.png)

### 5.3.6、压力测试

> 压力测试考察当前软硬件环境下系统所能承受的最大负荷并帮助找出系统瓶颈所在。压测都
> 是为了系统在线上的处理能力和稳定性维持在一个标准范围内，做到心中有数。

使用压力测试，我们有希望找到很多种用其他测试方法更难发现的错误。有两种错误类型是:
**内存泄漏**，**并发与同步**。

有效的压力测试系统将应用以下这些关键条件:**重复**，**并发**，**量级**，**随机变化**。

#### 1、性能指标

- **响应时间**（Response Time: RT）

  响应时间指用户从客户端发起一个请求开始，到客户端接收到从服务器端返回的响应结束，整个过程所耗费的时间。

- **HPS**（Hits Per Second） ：每秒点击次数，单位是次/秒。

- **TPS**（Transaction per Second）：系统每秒处理交易数，单位是笔/秒。

- **QPS**（Query per Second）：系统每秒处理查询次数，单位是次/秒。

  对于互联网业务中，如果某些业务有且仅有一个请求连接，那么 TPS=QPS=HPS，一般情况下用 TPS 来衡量整个业务流程，用 QPS 来衡量接口查询次数，用 HPS 来表示对服务器单击请求。

- 无论 TPS、QPS、HPS,此指标是衡量系统处理能力非常重要的指标，越大越好，根据经验，一般情况下：

  - 金融行业：1000TPS~50000TPS，不包括互联网化的活动
  - 保险行业：100TPS~100000TPS，不包括互联网化的活动
  - 制造行业：10TPS~5000TPS
  - 互联网电子商务：10000TPS~1000000TPS
  - 互联网中型网站：1000TPS~50000TPS
  - 互联网小型网站：500TPS~10000TPS

- **最大响应时间**（Max Response Time） 指用户发出请求或者指令到系统做出反应（响应）的最大时间。

- **最少响应时间**（Mininum ResponseTime） 指用户发出请求或者指令到系统做出反应（响应）的最少时间。

- **90%响应时间**（90% Response Time） 是指所有用户的响应时间进行排序，第 90%的响应时间。

- 从外部看，性能测试主要关注如下三个指标

  - 吞吐量：每秒钟系统能够处理的请求数、任务数。
  - 响应时间：服务处理一个请求或一个任务的耗时。

  - 错误率：一批请求中结果出错的请求所占比例。

#### 2、安装JMeter

官方网址：https://jmeter.apache.org/download_jmeter.cgi

点击`Download`里的`Download Releases`，在`Binaries`里选择[apache-jmeter-5.5.zip](https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.5.zip) 即可下载

历史版本下载地址： [Index of /dist/jmeter/binaries (apache.org)](https://archive.apache.org/dist/jmeter/binaries/)

![image-20220711215721546](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.2.1.png)

解压后，在`apache-jmeter-5.2.1\bin`目录下，点击`jmeter.bat`可执行文件即可打开`JMeter`

![image-20220711220237900](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.2.2.png)

中文显示

依次点击`Options` -> `Choose Language` -> `Chinese (Simplified)`

![GIF 2022-7-11 22-05-07](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.2.3.gif)

设置背景色为白色

依次点击`选项` -> `外观` -> `Nimbus` -> `Yes` ，然后重新打开即可

![GIF 2022-7-11 22-09-17](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.2.4.gif)

可以看到再次打开后还是英文显示，这是因为`JMeter`使用界面设置中文下次打开`JMeter`仍然会显示为英文

在`apache-jmeter-5.2.1\bin`目录的`jmeter.properties`配置文件里添加如下配置

```
language=zh_CN
```

![image-20220711222534132](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.2.5.png)

#### 3、添加线程组

##### 1、添加取样器

选中`测试计划`，右键依次选择`添加` -> `线程（用户）` -> `线程组`

![GIF 2022-7-11 22-44-23](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.1.1.gif)

在`线程属性`里的`线程数`里输入`200`，表示**启动200个线程**

在`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`循环次数`里输入`100`，**表示每个线程循环100次**，共发送200x100 =20000个请求

![image-20220711224938665](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.1.2.png)

##### 2、添加`察看结果树`

选中`线程组`，右键依次选择 `添加` -> `监听器` -> `察看结果树`

![GIF 2022-7-11 22-55-24](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.2.gif)

##### 3、添加`汇总报告`

选中`线程组`，右键依次选择 `添加` -> `监听器` -> `汇总报告`

![GIF 2022-7-11 22-58-08](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.3.gif)

##### 4、添加`汇总图`

选中`线程组`，右键依次选择 `添加` -> `监听器` -> `汇总图`

![GIF 2022-7-11 23-01-11](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.4.gif)

##### 5、添加`http请求`

选中`线程组`，右键依次选择 `添加` -> `取样器` -> `http请求`

![GIF 2022-7-11 23-07-08](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.5.1.gif)

在`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`www.baidu.com`，`端口号：`输入`80`

![image-20220711230817728](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.3.5.2.png)

#### 4、对百度进行测试

##### 1、执行测试

![GIF 2022-7-11 23-12-14](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.4.1.gif)

##### 2、察看结果树

可以看到都请求成功了

![image-20220711231548203](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.4.2.png)

##### 3、汇总报告

![image-20220711231603497](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.4.3.png)

##### 4、汇总图

![image-20220711231616166](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.4.4.png)

#### 5、对本项目进行测试

##### 1、执行测试

在`http请求`里的`服务器名称或IP:`修改为`gulimall.com`，点击工具栏的`清除全部`按钮，然后点击`启动`按钮

![image-20220712180117360](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.5.1.png)

##### 2、察看结果树

![image-20220712180511761](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.5.2.png)

##### 3、汇总报告

![image-20220712180555607](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.5.3.png)

##### 4、汇总图

![image-20220712180626237](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.5.4.1.png)

想要显示图像，可以在设置中勾选想要显示的`列显示`，点击`显示图表`即可

![GIF 2022-7-12 18-08-50](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.5.4.2.gif)

#### 6、重新测试

##### 1、调大内存

在`GulimallGatewayApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallGatewayApplication`模块的最大内存占用为`100m`

```
-Xmx500m
```

![image-20220712182036988](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.1.1.png)

在`GulimallProductApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，限制`GulimallProductApplication`模块的最大内存占用为`100m`

```
-Xmx500m
```

![image-20220712182102801](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.1.2.png)

##### 2、执行测试

点击工具栏的`清除全部`按钮，然后点击`启动`按钮

![image-20220712182422350](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.2.png)

##### 3、察看结果树

![image-20220712182544730](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.3.png)

##### 4、汇总报告

![image-20220712182603933](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.4.png)

##### 5、汇总图

![image-20220712182627440](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.5.png)

可以看到除了执行时间，其他性能并没有明显的改善

##### 6、JMeter Address Already in use

###### 1、问题描述

在`windows`系统访问有可能报`Address Already in use`异常（我的没报这个异常）

在`线程组`里的`线程属性`里，将`线程数`修改为`50`，`循环次数`勾选`永远`

![image-20220712184123934](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.1.1.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `服务器名称或IP:`修改为`127.0.0.1`，`端口号：`修改为`10000`

![image-20220712184336692](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.1.2.png)

点击工具栏的`清除全部`按钮，然后点击`启动`按钮

![5.3.6.6.6.3](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.1.3.png)

进行测试

![GIF 2022-7-12 18-33-56](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.1.4.gif)

有可能出现大量异常请求

![image-20220712184728011](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.1.5.png)

在`察看结果树`里可以看到报的是`Address Already in use`错误

这是windows 本身提供的端口访问机制的问题。 Windows 提供给 TCP/IP 链接的端口为 1024-5000，并且要四分钟来循环回收他们。就导致 我们在短时间内跑大量的请求时将端口占满了。

![image-20220712183805060](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.1.6.png)

###### 2、解决方案

1. cmd 中，用 regedit 命令打开注册表 

2. 在 HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters 下， 

   1. 右击 parameters，添加一个新的 DWORD，名字为`MaxUserPort`

   2. 然后双击 MaxUserPort，基数选择十进制，输入数值数据为 `65534`（如果是分布式运 行的话，控制机器和负载机器都需要这样操作哦） 
   3. 右击 parameters，添加一个新的 DWORD，名字为`TCPTimedWaitDelay`
   4. 然后双击`TCPTimedWaitDelay`，基数选择十进制，输入数值数据为 `30`

3. 修改配置完毕之后记得重启机器才会生效 

![image-20220712185322027](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.2.1.png)

![GIF 2022-7-12 18-57-57](https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.2.2.gif)

官方文档：[错误 WSAENOBUFS (10055) - Windows Client | Microsoft Docs](https://docs.microsoft.com/zh-CN/troubleshoot/windows-client/networking/connect-tcp-greater-than-5000-error-wsaenobufs-10055)

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.3.6.6.6.2.3.png" alt="image-20220712190300746" style="zoom:67%;" />

### 5.3.7、性能监控

#### 1、jvm 内存模型

![image-20220712193526455](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.1.1.png)

- 程序计数器 Program Counter Register：
  - 记录的是正在执行的虚拟机字节码指令的地址，
  - 此内存区域是唯一一个在 JAVA 虚拟机规范中没有规定任何OutOfMemoryError 的区域
- 虚拟机：VM Stack
  - 描述的是 JAVA 方法执行的内存模型，每个方法在执行的时候都会创建一个栈帧，用于存储局部变量表，操作数栈，动态链接，方法接口等信息
  - 局部变量表存储了编译期可知的各种基本数据类型、对象引用
  - 线程请求的栈深度不够会报 StackOverflowError 异常
  - 栈动态扩展的容量不够会报 OutOfMemoryError 异常
  - 虚拟机栈是线程隔离的，即每个线程都有自己独立的虚拟机栈
- 本地方法：Native Stack
  - 本地方法栈类似于虚拟机栈，只不过本地方法栈使用的是本地方法
- 堆：Heap
  - 几乎所有的对象实例都在堆上分配内存

![image-20220712193817010](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.1.2.png)

#### 2、堆

所有的对象实例以及数组都要在堆上分配。堆是垃圾收集器管理的主要区域，也被称为“GC 堆”；也是我们优化最多考虑的地方。

堆可以细分为：

- 新生代
  - Eden 空间
  - From Survivor 空间
  - To Survivor 空间
- 老年代
- 永久代/元空间
  - Java8 以前永久代，受 jvm 管理，java8 以后元空间，直接使用物理内存。因此，默认情况下，元空间的大小仅受本地内存限制。

垃圾回收

![image-20220712193955078](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.2.1.png)

从 Java8 开始，HotSpot 已经完全将永久代（Permanent Generation）移除，取而代之的是一个新的区域—元空间（MetaSpace）

![image-20220712194019094](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.2.2.png)

![image-20220712194034323](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.2.3.png)

#### 3、jconsole 与 jvisualvm

Jdk 的两个小工具 jconsole、jvisualvm（升级版的 jconsole）;通过命令行启动，可监控本地和

远程应用。远程应用需要配置

##### 1、jconsole使用

###### 1、打开

打开`cmd`，输入`jconsole`，选择一个服务后即可查看`内存`、`线程`、`类`、`vm`等信息

![GIF 2022-7-12 19-28-56](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.1.gif)

###### 2、概要

![image-20220712195023839](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.2.png)

###### 3、内存

![image-20220712195050101](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.3.png)

###### 4、线程

![image-20220712195130378](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.4.png)

###### 5、类

![image-20220712195153804](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.5.png)

###### 6、VM 概要

![image-20220712195233679](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.6.png)

###### 7、MBean

![image-20220712195314522](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.1.7.png)

##### 2、`jvisualvm`使用

###### 1、打开

开`cmd`，输入`jvisualvm`，选择一个服务后即可查看各种信息

![GIF 2022-7-12 19-56-54](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.2.1.gif)

###### 2、概要

![image-20220712195808985](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.2.2.png)

###### 3、监视

![image-20220712195838543](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.2.3.png)

###### 4、线程

![image-20220712195904085](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.2.4.png)

###### 5、抽样器

![image-20220712195946392](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.2.5.png)

###### 6、Profiler

![image-20220712200011690](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.2.6.png)

##### 3、安装`Visual GC`

###### 1、下载插件

点击`工具`，选择`插件`，在`可用插件`里点击`检查最新版本(F)`，然后选中`Visual GC`点击`安装(I)`即可

![GIF 2022-7-12 20-02-45](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.1.1.gif)

![image-20220712200832207](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.1.2.png)

###### 2、检查最新版本错误

如果点击`检查最新版本`出现了错误，可以在`cmd`输入以下命令，查看jdk详细版本

```
java -version
```

进入该网站：https://visualvm.github.io/pluginscenters.html ，查询该版本对应的更新地址

例如我的java版本为`java version "1.8.0_301"`，后面的小版本为`301`因此对应该网站显示的`JDK 8 Update 131 - 331`

点进去，复制里面显示的url即可(url以`xml.gz`结尾)

```
https://visualvm.github.io/uc/8u131/updates.xml.gz
```

![GIF 2022-7-12 20-19-35](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.2.png)

###### 3、下载插件错误

![image-20220712200858240](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.3.1.png)

> https://github.com/visualvm/visualvm.src/releases/download/1.3.9/com-sun-tools-visualvm-modules-visualgc.nbm中出现网络问题  

>  检查代理设置或稍后重试。服务器目前可能不可用。 您可能还需要确保防火墙不会阻塞网络通信。 您的高速缓存可能已过期。请单击“检查更新”以刷新内容。  

这种是githu的这个网址访问不了了，可以换个时间下载，或者使用某些方法下载，也可以通过迅雷下载

依次点击`工具(T)` -> `插件(G)` -> `已下载` -> `添加插件(A)..`即可添加离线插件

![image-20220712202618328](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.3.2.png)

可以在刚刚那个网址 https://visualvm.github.io/pluginscenters.html 里点击对应版本的链接后，在下面即可看到各个工具的下载地址

![GIF 2022-7-12 20-31-27](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.3.3.gif)

###### 4、查看`Visual GC`

![image-20220712203426598](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.3.3.3.4.png)

#### 4、测试Nginx

##### 1、准备工作

###### 1、查看docker资源使用情况

使用`docker stats`命令可以查看`docker`里，各容器的`cpu`、内存等的占用情况

```
docker stats
```

![image-20220712204640177](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.1.1.png)

###### 2、设置线程数

选中`测试计划`，右键依次选择`添加` -> `线程（用户）` -> `线程组`

点击刚刚创建的`线程组`，在`线程属性`里的`线程数`里输入`50`，表示**启动50个线程**

在`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`循环次数`里勾选`永远`，表示如果不点击`停止`按钮，就一直执行

![image-20220712204257142](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.1.2.png)

###### 3、修改`http`请求信息

选中`线程组`，右键依次选择 `添加` -> `取样器` -> `http请求`，

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`192.168.56.10`，`端口号：`输入`80`，`路径`输入`/`

![image-20220712204511116](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.1.3.png)

###### 4、查看要压测的页面

http://192.168.56.10/

![image-20220712205325631](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.1.4.png)

###### 5、添加`察看结果树`、`汇总报告`、`聚合报告`

选中`线程组`，右键依次选择 `添加` -> `监听器` -> `察看结果树`

选中`线程组`，右键依次选择 `添加` -> `监听器` -> `汇总报告`

选中`线程组`，右键依次选择 `添加` -> `监听器` -> `聚合报告`

![image-20220712204615385](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.1.5.png)

##### 2、执行测试

先打开`docker`资源页面查看`nginx`的资源占用情况，然后点击工具栏的`清除全部`按钮，然后点击`启动`按钮，切换到docker容器资源页面，查看`nginx`的资源使用情况

![GIF 2022-7-12 20-49-26](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

###### 1、察看结果树

![image-20220712205531631](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.3.1.png)

###### 2、汇总报告

![image-20220712205512240](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.3.2.png)

###### 3、聚合报告

![image-20220712205433015](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.4.3.3.png)

#### 5、测试Gateway

##### 1、准备工作

准备压测`gulimall-gateway`模块

![image-20220715110323719](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.1.1.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`88`，`路径`输入`/`

![image-20220712205703499](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.1.2.png)

要压测的页面：  http://localhost:88/

![image-20220712205736949](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.1.3.png)

##### 2、执行测试

先打开`jvisualvm`查看`GulimallGatewayApplication`服务的资源占用情况，然后点击工具栏的`清除全部`按钮，然后点击`启动`按钮，切换到`jvisualvm`查看`GulimallGatewayApplication`服务的资源占用情况，可以看到网关和nginx差不多，都是消耗cpu型

![GIF 2022-7-12 21-07-11](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220712211847512](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.3.1.png)

**汇总报告**

![image-20220712211858104](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.3.2.png)

**聚合报告**

![image-20220712211909526](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.5.3.3.png)

#### 6、测试简单服务

##### 1、准备工作

在`gulimall-product`模块的`com.atguigu.gulimall.product.web.IndexController`类里添加`hello`方法

```java
@ResponseBody
@GetMapping("/hello")
public String hello(){
    return "hello";
}
```

![image-20220712212223004](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.1.1.png)

重启`GulimallProductApplication`服务

要压测的页面： http://localhost:10000/hello

![image-20220712212504526](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.1.2.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/hello`

![image-20220712212849827](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.1.3.png)

##### 2、执行测试

先打开`jvisualvm`查看`GulimallProductApplication`服务的资源占用情况，然后点击工具栏的`清除全部`按钮，然后点击`启动`按钮，切换到`jvisualvm`查看`GulimallProductApplication`服务的资源占用情况

![GIF 2022-7-12 21-33-41](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220712213634549](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.3.1.png)

**汇总报告**

![image-20220712213653108](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.3.2.png)

**聚合报告**

![image-20220712213705375](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.6.3.3.png)



#### 7、测试`Gateway`+`简单服务`

##### 1、准备工作

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件添加路径映射

```yaml
- id: product_route
  uri: lb://gulimall-product
  predicates:
    - Path=/api/product/**,/hello
  filters:
    # (?<segment>/?.*) 和 $\{segment} 为固定写法
    #http://localhost:88/api/product/category/list/tree 变为 http://localhost:10000/product/category/list/tree
    - RewritePath=/api/(?<segment>/?.*),/$\{segment}
```

![image-20220712213939761](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.1.1.png)

重启`GulimallGatewayApplication`服务，刷新前端页面： http://localhost:88/hello

![image-20220712214138315](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.1.2.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`88`，`路径`输入`/hello`

![image-20220712214237380](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.1.3.png)

##### 2、执行测试

![GIF 2022-7-12 21-46-20](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220712214657329](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.3.1.png)

**汇总报告**

![image-20220712214709096](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.3.2.png)

**聚合报告**

![image-20220712214719048](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.7.3.3.png)

#### 8、测试全链路简单服务

##### 1、准备工作

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`gulimall.com`，`端口号：`输入`80`，`路径`输入`/hello`

![image-20220712215447489](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.8.1.1.png)

要压测的页面： http://gulimall.com/hello

![image-20220712215521006](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.8.1.2.png)

##### 2、执行测试

![GIF 2022-7-12 21-57-19](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.8.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220712215825563](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.8.3.1.png)

**汇总报告**

![image-20220712215839520](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.8.3.2.png)

**聚合报告**

![image-20220712215851755](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.8.3.3.png)

#### 9、首页一级菜单渲染

##### 1、准备工作

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/`

![image-20220713085131271](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.9.1.1.png)

要压测的页面： http://localhost:10000/

![image-20220713085155651](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.9.1.2.png)

##### 2、执行测试

![GIF 2022-7-13 8-53-49](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.9.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220713085519971](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.9.3.1.png)

**汇总报告**

![image-20220713085535281](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.9.3.2.png)

**聚合报告**

![image-20220713085549911](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.9.3.3.png)

#### 10、三级分类数据获取

##### 1、准备工作

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/index/catalog.json`

![image-20220713190216851](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.10.1.1.png)

要压测的页面是：http://localhost:10000/index/catalog.json

而不是：http://localhost:10000/index/json/catalog.json

![image-20220713190257988](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.10.1.2.png)

##### 2、执行测试

![GIF 2022-7-13 19-10-35](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.10.2.gif)

##### 3、**察看结果树**

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**汇总报告**

![image-20220713191148245](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.10.3.1.png)

**汇总报告**

![image-20220713191201840](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.10.3.2.png)

**聚合报告**

![image-20220713191218051](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.10.3.3.png)

#### 11、首页全量数据获取

##### 1、准备工作

在`HTTP请求`的`基本`里的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/`

![image-20220713091414524](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.1.1.png)

在`HTTP请求`的`高级`里，勾选`从HTML文件获取所有内含的资源`和`并行下载`(并行下载数量为6)

![image-20220713091431240](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.1.2.png)

要压测的页面： http://localhost:10000/

![image-20220713091450595](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.1.3.png)

##### 2、执行测试

![GIF 2022-7-13 9-17-26](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

在`察看结果树`的`取样器结果`里报了`404`的错误

![image-20220713091958676](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.3.1.png)

在`察看结果树`的`响应数据`里的`Response Body`里可以看到页面请求成功了，报`404`是因为有些`图片`、`javascript`没有请求成功

![image-20220713091944626](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.3.2.png)

**汇总报告**

![image-20220713092020556](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.3.3.png)

**聚合报告**

![image-20220713092032116](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.11.3.4.png)

#### 12、首页渲染（开缓存）

##### 1、准备工作

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件里，把`thymeleaf`缓存打开

```yaml
spring:
  thymeleaf:
    cache: true
```

重启`GulimallProductApplication`服务

![image-20220713092819303](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.1.1.png)

在`线程组`的`线程属性`里的`线程数`里输入`50`，表示**启动50个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里勾选`永远`

![image-20220713092941056](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.1.2.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/`

![image-20220713092958127](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.1.3.png)

在`HTTP请求`的`高级`里，取消勾选`从HTML文件获取所有内含的资源`

![image-20220713093012837](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.1.4.png)

要压测的页面： http://localhost:10000/

![image-20220713093042423](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.1.5.png)

##### 2、执行测试

![GIF 2022-7-13 9-33-24](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220713093606192](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.3.1.png)

**汇总报告**

![image-20220713093616704](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.3.2.png)

**聚合报告**

![image-20220713093629776](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.12.3.3.png)

#### 13、首页渲染（开缓存、优化数据库、关日志）

##### 1、修改日志级别

修改`gulimall-product`模块的`src/main/resources/application.yml`配置文件的日志级别

```yaml
logging:
  level:
    com.atguigu.gulimall: error
```

![image-20220713094701394](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.1.png)

##### 2、使用索引

###### 1、没加索引

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类的`getLevel1Categories`方法

```java
@Override
public List<CategoryEntity> getLevel1Categories() {
    LambdaQueryWrapper<CategoryEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(CategoryEntity::getParentCid, 0);
    lambdaQueryWrapper.select(CategoryEntity::getCatId, CategoryEntity::getName);
    long start = System.currentTimeMillis();
    List<CategoryEntity> categoryEntities = this.baseMapper.selectList(lambdaQueryWrapper);
    long end = System.currentTimeMillis();
    System.out.println("消耗时间："+(end-start));
    return categoryEntities;
}
```

重启`GulimallProductApplication`服务

![image-20220713094412296](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.2.1.1.png)

多刷新几次主页后再测试：http://localhost:10000/

可以看到，消耗的时间都在`2~5`秒

![image-20220713095240494](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.2.1.2.png)

###### 2、加索引

打开`navicat`，选择`gulimall_pms`数据库的`pms_category`表，右键选择`设计表`

点击`索引`，在`字段`里选择`parent_cid`，然后点击`保存`，这样就给`parent_cid`添加了一个默认的索引

![image-20220713095524701](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.2.2.1.png)

`名`、`索引类型`、`索引方法`都为系统自动生成的

![image-20220713095334084](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.2.2.2.png)

多刷新几次主页后再测试：http://localhost:10000/ （不用重启服务。保险起见，也可以重启`GulimallProductApplication`服务）

可以看到，消耗的时间都在`1~3`秒，加索引后速度还是有明显提升的

![image-20220713095807730](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.2.2.3.png)

##### 3、执行测试

![GIF 2022-7-13 10-01-01](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.3.gif)

##### 4、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220713100251659](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.4.1.png)

**汇总报告**

![image-20220713100343229](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.4.2.png)

**聚合报告**

![image-20220713100356061](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.13.4.3.png)

#### 14、三级分类（优化业务）

##### 1、准备工作

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/index/catalog.json`

![image-20220713185422580](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.1.1.png)

要压测的页面是： http://localhost:10000/index/catalog.json

而不是： http://localhost:10000/index/json/catalog.json

![image-20220713185442346](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.1.2.png)

##### 2、执行测试

![GIF 2022-7-13 18-56-32](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.2.gif)

##### 3、查看压测报告

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220713185805721](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.3.1.png)

**汇总报告**

![image-20220713185839666](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.3.2.png)

**聚合报告**

![image-20220713185857661](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.3.3.png)

查询数据库消耗的时间：

![image-20220713190139525](https://gitlab.com/apzs/image/-/raw/master/image/5.3.7.14.3.4.png)

#### 15、压测报告表

| 压测内容                               | 压测线程数 | 吞吐量/s | 90%响应时间/ms | 99%响应时间/ms |
| -------------------------------------- | ---------- | -------- | -------------- | -------------- |
| Nginx                                  | 50         | 882      | 15             | 1899           |
| Gateway                                | 50         | 1552     | 47             | 149            |
| 简单服务                               | 50         | 11431    | 8              | 24             |
| 首页一级菜单渲染                       | 50         | 202      | 381            | 645            |
| 首页渲染（开缓存）                     | 50         | 229      | 286            | 497            |
| 首页渲染（开缓存、优化数据库、关日志） | 50         | 510      | 174            | 333            |
| 三级分类数据获取                       | 50         | 1.5      | 33628          | 33789          |
| 三级分类（优化业务）                   | 50         | 4.9      | 13230          | 14285          |
| 优化三级分类查询(查询一次数据库)       | 5          | 89.3     | 839            | 2047           |
| 三 级 分 类 （ 使用 redis 作为缓存）   | 50         | 159      | 422            | 842            |
| 首页全量数据获取                       | 50         | 3        | 33699          | 38237          |
| Nginx+Gateway                          | 50         |          |                |                |
| Gateway+简单服务                       | 50         | 793      | 98             | 159            |
| 全链路                                 | 50         | 346      | 171            | 1240           |

### 5.3.8、配置nginx

#### 1、nginx动静分离

![image-20220721205151205](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.0.png)

1、以后将所有项目的静态资源都应该放在nginx里面 

2、规则：/static/**所有请求都由nginx直接返回

##### 1、复制文件

在虚拟机的`/mydata/nginx/html/`目录里新建`static`目录，用于存放静态文件

```bash
cd /mydata/nginx/
ls
cd html/
ls
mkdir static
ls
cd static/
ls
```

![image-20220713111438938](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.1.1.png)

将`gulimall-product\src\main\resources\static`目录下的`index`文件夹复制到虚拟机的`/mydata/nginx/html/static`目录里

复制完后，删除`gulimall-product\src\main\resources\static`目录下的`index`文件夹

![GIF 2022-7-13 14-31-53](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.1.2.gif)

##### 2、修改`index.html`

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里，修改部分代码，在所有请求的路径前都加上`/static/`(第一个`/`表示在当前项目下),使静态资源访问`nigix`

[点击查看`index.html`完整代码](code/5.3.8.1.2.index.html)

![image-20220713145539244](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.2.png)

##### 3、关闭缓存

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件里，把`thymeleaf`缓存关闭

```yaml
spring:
  thymeleaf:
    cache: false
```

重启`GulimallProductApplication`服务

![image-20220713145612544](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.3.png)

##### 4、修改`niginx`配置

查看虚拟机的`/mydata/nginx/conf/conf.d/default.conf`文件的配置

```bash
cd /mydata/nginx/conf/
ls
cd conf.d/
ls
cat default.conf
```

![image-20220713150356251](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.4.1.png)

复制`default.conf`文件里的`root   /usr/share/nginx/html;`

![image-20220713145904671](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.4.2.png)

选中`1 电商`，右键选中`复制会话(D)`

![image-20220713152323017](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.4.3.png)

编辑`/mydata/nginx/conf/conf.d/gulimall.conf`文件，然后重启`nginx`

```
cd "/mydata/nginx/conf/conf.d"
ls
vi gulimall.conf
docker restart nginx
docker ps
```

![image-20220713151144140](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.4.4.png)

在`/mydata/nginx/conf/conf.d/gulimall.conf`文件里配置以`/static/`开头的路径的访问规则

```
location /static/ {
	root   /usr/share/nginx/html;
}
```

![image-20220713150219942](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.4.5.png)

`/mydata/nginx/conf/conf.d/gulimall.conf`文件的完整内容：

```properties
server {
    listen       80;
    server_name  gulimall.com;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    location /static/ {
        root   /usr/share/nginx/html;
    }

    location / {
        proxy_set_header Host $host;
        proxy_pass http://gulimall;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

##### 5、访问首页

首先清除浏览器缓存，依次点击`chrome`浏览器的 竖着的三个点 -> `设置` -> `隐私设置和安全性` -> `清吟浏览数据`

![image-20220713154833600](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.5.1.png)

访问: http://gulimall.com/

可以看到，绝大部分都可以访问，只有两个不能访问，这两个文件本来就没有，当然无法访问，不用管这两个

![image-20220713154008320](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.5.2.png)

可以删掉这两个不能访问的请求

注释掉`<img src="/static/index/img/top_find_logo.png" alt="">`

![image-20220713155237607](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.5.3.png)

注释掉`<script type="text/javascript" src="/static/index/jsindex.js"></script>`

![image-20220713155309068](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.1.5.4.png)

#### 2、对`nginx`进行压力测试

##### 1、准备工作

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件里，把`thymeleaf`缓存打开

```yaml
spring:
  thymeleaf:
    cache: true
```

重启`GulimallProductApplication`服务

![image-20220713154704430](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.1.1.png)

在`线程组`的`线程属性`里的`线程数`里输入`50`，表示**启动50个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里勾选`永远`

![image-20220713154553456](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.1.2.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`gulimall.com`，`端口号：`输入`80`，`路径`输入`/`

![image-20220713154608124](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.1.3.png)

在`HTTP请求`的`高级`里，勾选`从HTML文件获取所有内含的资源`和`并行下载`(并行下载数量为6)

![image-20220713154619058](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.1.4.png)

要压测的页面： http://gulimall.com/

![image-20220713154918926](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.1.5.png)

##### 2、执行测试

如果在`查看结果树`里全是异常也不要紧，只是没有把`想要访问不存在的资源`的语句删掉而已

![GIF 2022-7-13 16-02-21](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.2.1.gif)

在测试期间，使用`jvisualvm`查看`CPU`、`堆`等的资源消耗情况

![GIF 2022-7-13 16-12-34](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.2.2.gif)

##### 3、查看压测报告

这次结果虽然比以前好一点，但是`jmeter`卡死了几次，以前都没卡死过

把压测报告写入压测报告表中（在`5.3.7.15、压测报告表`里面)

**察看结果树**

![image-20220713160459499](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.3.1.png)

**汇总报告**

![image-20220713160510090](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.3.2.png)

**聚合报告**

![image-20220713160520393](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.2.3.3.png)

#### 3、OOM

##### 1、调大线程数

在`线程组`的`线程属性`里的`线程数`里输入`200`，表示**启动200个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里勾选`永远`

![image-20220713164142976](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.1.1.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/`

![image-20220713164154508](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.1.2.png)

在`HTTP请求`的`高级`里，勾选`从HTML文件获取所有内含的资源`和`并行下载`(并行下载数量为6)

![image-20220713164205572](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.1.3.png)

要压测的页面： http://localhost:10000/

![image-20220713164247057](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.1.4.png)

##### 2、执行测试

![GIF 2022-7-13 16-29-17](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.2.1.gif)

![GIF 2022-7-13 16-51-59](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.2.2.gif)

##### 3、查看压测报告

报`java.lang.OutOfMemoryError`异常

```
Exception in thread "RMI TCP Connection(idle)" java.lang.OutOfMemoryError: Java heap space
Exception in thread "http-nio-10000-Acceptor" java.lang.OutOfMemoryError: Java heap space
Exception in thread "http-nio-10000-BlockPoller" Exception in thread "File Watcher" java.lang.OutOfMemoryError: Java heap space
java.lang.OutOfMemoryError: Java heap space
*** java.lang.instrument ASSERTION FAILED ***: "!errorOutstanding" with message can't create name string at JPLISAgent.c line: 807
Exception in thread "http-nio-10000-ClientPoller" java.lang.OutOfMemoryError: Java heap space

Exception: java.lang.OutOfMemoryError thrown from the UncaughtExceptionHandler in thread "com.alibaba.nacos.client.Worker.fixed-127.0.0.1_8848-d6d03bd1-5815-4fa1-8caf-93b09462fd45"

Exception: java.lang.OutOfMemoryError thrown from the UncaughtExceptionHandler in thread "http-nio-10000-exec-206"
Exception in thread "http-nio-10000-exec-490" 
Exception: java.lang.OutOfMemoryError thrown from the UncaughtExceptionHandler in thread "http-nio-10000-exec-329"
java.lang.OutOfMemoryError: Java heap space
Exception in thread "http-nio-10000-exec-304" java.lang.OutOfMemoryError: Java heap space
```

![image-20220713163701403](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.3.1.png)

刷新 http://localhost:10000/ 页面，可以发现无法访问

![image-20220713163906526](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.3.2.png)

此时堆使用的内存已满

![image-20220713163930108](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.3.3.png)

`CPU`和`堆`资源占用都非常高

![image-20220713164002784](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.3.4.png)

##### 4、调大堆内存

> -Xss 设置每个线程可使用的内存大小，即栈的大小。
> -Xms 堆内存的最小值，默认为物理内存的1/64。
> -Xmx 堆内存的最大值，默认为物理内存的1/4。
> -Xmn 堆内新生代(Eden+两个Survior)的大小，一般占据堆的 1/3 空间。通过这个值也可以得到老生代的大小：-Xmx减去-Xmn。

```
-Xmx1024m -Xms1024m -Xmn512m
```

在`GulimallProductApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx1024m -Xms1024m -Xmn512m`，限制`GulimallProductApplication`模块的最大内存占用为`1024m`，最小内存占用为`1024m`，新生代的内存占用为`512m`

![image-20220713165813319](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.4.png)

##### 5、重新测试

![GIF 2022-7-13 17-08-53](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.5.gif)

##### 6、查看压测报告

**察看结果树**

![image-20220713171228131](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.6.1.png)

**汇总报告**

![image-20220713171240146](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.6.2.png)

**聚合报告**

![image-20220713171253126](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.6.3.png)

`Visual GC`里显示，过了很久也没出现内存不足的情况

![image-20220713172145919](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.6.4.png)

`堆`在使用峰值时，也没有超过规定的`1024m`

![image-20220713172159697](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.6.5.png)

`GulimallProductApplication`服务的控制台也没报任何异常，说明调大内存可以很好地解决请求数过多的情况

![image-20220713172253880](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.3.6.6.png)

#### 4、优化三级分类查询

##### 1、修改`getCatalogJson`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.CategoryServiceImpl`类里修改`getCatalogJson`方法

```java
@Override
public Map<String, List<Catelog2Vo>> getCatalogJson() {

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

![image-20220713183352367](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.1.png)

##### 2、准备工作

在`GulimallProductApplication`模块的运行配置里的`Environment`栏的`VM options`里的右方框里输入`-Xmx100m`，重新限制`GulimallProductApplication`模块的最大内存占用为`100m`

```
-Xmx100m
```

![image-20220713183513139](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.2.1.png)

要压测的请求： http://localhost:10000/index/catalog.json

![image-20220713183630444](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.2.2.png)

在`线程组`的`线程属性`里的`线程数`里输入`50`，表示**启动50个线程**

在`线程组`的`线程属性`里的`Ramp-Up时间(秒) :`里输入`1`，表示**1秒内启动完成**

在`线程组`的`循环次数`里勾选`永远`

![image-20220713183932382](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.2.3.png)

在`HTTP请求`的`基本`里的`Web服务器`里 `协议：`输入`http`，`服务器名称或IP:`输入`localhost`，`端口号：`输入`10000`，`路径`输入`/index/catalog.json`

![image-20220713183947336](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.2.4.png)

在`HTTP请求`的`高级`里，取消勾选`从HTML文件获取所有内含的资源`

![image-20220713183958623](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.2.5.png)

##### 3、执行测试

![GIF 2022-7-13 18-45-40](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.3.gif)

##### 4、查看压测报告

**察看结果树**

![image-20220713184654867](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.4.1.png)

**汇总报告**

![image-20220713184706250](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.4.2.png)

**聚合报告**

![image-20220713184720393](https://gitlab.com/apzs/image/-/raw/master/image/5.3.8.4.4.3.png)

