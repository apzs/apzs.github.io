## 5.8.RabbitMQ

### 5.8.1、RabbitMQ 基本使用

#### 1、基本概念

##### 主流的消息队列对比

| 特性                     | ActiveMQ                              | RabbitMQ                                           | RocketMQ                                                     | Kafka                                                        |
| ------------------------ | ------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 单机吞吐量               | 万级，比 RocketMQ、Kafka 低一个数量级 | 同 ActiveMQ                                        | 10 万级，支撑高吞吐                                          | 10 万级，高吞吐，一般配合大数据类的系统来进行实时数据计算、日志采集等场景 |
| topic 数量对吞吐量的影响 |                                       |                                                    | topic 可以达到几百/几千的级别，吞吐量会有较小幅度的下降，这是 RocketMQ 的一大优势，在同等机器下，可以支撑大量的 topic | topic 从几十到几百个时候，吞吐量会大幅度下降，在同等机器下，Kafka 尽量保证 topic 数量不要过多，如果要支撑大规模的 topic，需要增加更多的机器资源 |
| 时效性                   | ms 级                                 | 微秒级，这是 RabbitMQ 的一大特点，延迟最低         | ms 级                                                        | 延迟在 ms 级以内                                             |
| 可用性                   | 高，基于主从架构实现高可用            | 同 ActiveMQ                                        | 非常高，分布式架构                                           | 非常高，分布式，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用 |
| 消息可靠性               | 有较低的概率丢失数据                  | 基本不丢                                           | 经过参数优化配置，可以做到 0 丢失                            | 同 RocketMQ                                                  |
| 功能支持                 | MQ 领域的功能极其完备                 | 基于 erlang 开发，并发能力很强，性能极好，延时很低 | MQ 功能较为完善，还是分布式的，扩展性好                      | 功能较为简单，主要支持简单的 MQ 功能，在大数据领域的实时计算以及日志采集被大规模使用 |

<img src="https://gitlab.com/apzs/image/-/raw/master/image/mq对比.jpg" alt="mq对比" style="zoom: 25%;" />

##### 1、异步处理

![image-20220811083529529](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.1.1.png)



![image-20220811083557739](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.1.2.png)



![image-20220811083605506](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.1.3.png)



##### 2、应用解耦

![image-20220811083641392](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.2.1.png)



![image-20220811083649379](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.2.2.png)

##### 3、流量控制

![image-20220811083703311](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.3.png)

1. 大多应用中，可通过消息服务中间件来提升系统异步通信、扩展解耦能力

2. 消息服务中两个重要概念：

   - 消息代理（message broker）消息发送后，消息代理进行管理，消息代理保证消息传递到指定目的地；

   - 目的地（destination）消息发送的目的地

     当消息发送者发送消息以后，将由消息代理接管，消息代理保证消息传递到指定目的地。

3. 消息队列主要有两种形式的目的地

   - 队列（queue）：点对点消息通信（point-to-point）

   - 主题（topic）：发布（publish）/订阅（subscribe）消息通信



- 点对点式：
  消息发送者发送消息，消息代理将其放入一个队列中，消息接收者从队列中获 取消息内容，消息读取后被移出队列
  消息只有唯一的发送者和接受者，但并不是说只能有一个接收者

- .发布订阅式：
  发送者（发布者）发送消息到主题，多个接收者（订阅者）监听（订阅）这个 主题，那么就会在消息到达时同时收到消息

- JMS（Java Message Service）JAVA消息服务：
  基于JVM消息代理的规范。ActiveMQ、HornetMQ是JMS实现

- AMQP（Advanced Message Queuing Protocol）
  高级消息队列协议，也是一个消息代理的规范，兼容JMS，RabbitMQ是AMQP的实现

##### **`JMS`和`AMQP`的区别**

|               | JMS（Java Message Service）                                  | AMQP（Advanced  Message Queuing Protocol）                   |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 定义          | Java api                                                     | 网络线级协议                                                 |
| 跨语言        | 否                                                           | 是                                                           |
| 跨平台        | 否                                                           | 是                                                           |
| Model         | 提供两种消息模型：<br />1、Peer-2-Peer  <br />2、Pub/sub     | 提供了五种消息模型：  <br />1、direct exchange  <br />2、fanout exchange  <br />3、topic change  <br />4、headers exchange  <br />5、system  exchange  <br />本质来讲，后四种和JMS的pub/sub模型没有太大差别 仅是在路由机制上做了更详细的划分； |
| 支持消息类 型 | 多种消息类型： <br />TextMessage <br />MapMessage <br />BytesMessage <br />StreamMessage <br />ObjectMessage  <br />Message （只有消息头和属性） | byte[]  <br />当实际应用时，有复杂的消息，可以将消息序列化后发 送。 |
| 综合评价      | JMS 定义了JAVA API层面的标准；<br />在java体系中， 多个client均可以通过JMS进行交互，不需要应用修 改代码，但是其对跨平台的支持较差； | AMQP定义了wire-level层的协议标准；天然具有跨平 台、跨语言特性。 |

- Spring支持
  spring-jms提供了对JMS的支持
  spring-rabbit提供了对AMQP的支持
  需要ConnectionFactory的实现来连接消息代理
  提供JmsTemplate、RabbitTemplate来发送消息
  @JmsListener（JMS）、@RabbitListener（AMQP）注解在方法上监听消息 代理发布的消息
  @EnableJms、@EnableRabbit开启支持

- Spring Boot自动配置
  JmsAutoConfiguration  

  RabbitAutoConfiguration
  10、市面的MQ产品
  ActiveMQ、RabbitMQ、RocketMQ、Kafka

**RabbitMQ概念**

- RabbitMQ简介：
  RabbitMQ是一个由erlang开发的AMQP(Advanved Message Queue Protocol)的开源实现。

**核心概念**

- Message
  消息，消息是不具名的，它由消息头和消息体组成。消息体是不透明的，而消息头则由一系列的可选属性组成， 这些属性包括routing-key（路由键）、priority（相对于其他消息的优先权）、delivery-mode（指出该消息可 能需要持久性存储）等。

- Publisher
  消息的生产者，也是一个向交换器发布消息的客户端应用程序。

- Exchange
  交换器，用来接收生产者发送的消息并将这些消息路由给服务器中的队列。
  Exchange有4种类型：direct(默认)，fanout, topic, 和headers，不同类型的Exchange转发消息的策略有所区别

- Queue
  消息队列，用来保存消息直到发送给消费者。它是消息的容器，也是消息的终点。一个消息可投入一个或多个队列。消息一直 在队列里面，等待消费者连接到这个队列将其取走。

- Binding
  绑定，用于消息队列和交换器之间的关联。一个绑定就是基于路由键将交换器和消息队列连接起来的路由规则，所以可以将交 换器理解成一个由绑定构成的路由表。
  Exchange 和Queue的绑定可以是多对多的关系。

- Connection
  网络连接，比如一个TCP连接。

- Channel
  信道，多路复用连接中的一条独立的双向数据流通道。信道是建立在真实的TCP连接内的虚拟连接，AMQP 命令都是通过信道 发出去的，不管是发布消息、订阅队列还是接收消息，这些动作都是通过信道完成。因为对于操作系统来说建立和销毁 TCP 都 是非常昂贵的开销，所以引入了信道的概念，以复用一条 TCP 连接。

- Consumer
  消息的消费者，表示一个从消息队列中取得消息的客户端应用程序。

- Virtual Host
  虚拟主机，表示一批交换器、消息队列和相关对象。虚拟主机是共享相同的身份认证和加 密环境的独立服务器域。每个 vhost 本质上就是一个 mini 版的 RabbitMQ 服务器，拥 有自己的队列、交换器、绑定和权限机制。vhost 是 AMQP 概念的基础，必须在连接时 指定，RabbitMQ 默认的 vhost 是 / 。

- Broker
  表示消息队列服务器实体

![image-20220811092602383](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.1.4.png)

#### 2、简单测试

##### 1、下载 rabbitmq

在 https://hub.docker.com/ 页面里搜索`rabbitmq`，选择官方镜像，下载带web管理后台的

```bash
docker pull rabbitmq:management
```

![image-20220811092945598](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.1.1.png)

在linux虚拟机里输入如下命令，下载rabbitmq镜像并运行容器

```bash
docker run -d --name rabbitmq 
-p 5671:5671 -p 5672:5672 -p 4369:4369 -p  25672:25672 -p 15671:15671 -p 15672:15672  
rabbitmq:management
```

各端口的含义：

```
4369, 25672 (Erlang发现&集群端口)
5672, 5671 (AMQP端口)
15672 (web管理后台端口)
61613, 61614 (STOMP协议端口)
1883, 8883 (MQTT协议端口)
```

完整命令

```bash
# 查看镜像
docker images
# 下载rabbitmq镜像并运行容器
docker run -d --name rabbitmq -p 5671:5671 -p 5672:5672 -p 4369:4369 -p  25672:25672 -p 15671:15671 -p 15672:15672  rabbitmq:management
# 设置rabbitmq开机自启动
docker update rabbitmq --restart=always
# 查看正在运行的容器
docker ps
```

可以看到`rabbitmq`已经启动了

![image-20220811094014468](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.1.2.png)

浏览器访问`http://192.168.56.10:15672`，用户名和密码默认都为`guest`

![image-20220811094146077](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.1.3.png)

##### 2、rabbitmq管理后台信息

登录后，在 http://192.168.56.10:15672/#/ 页面里可以看到`RabbitMQ`、`Erlang`的版本信息，`5s`钟刷新一次

`Connections` (连接数)、`Channels` (信道)、`Exchanges`（交换机）、`Queues` (消息队列) 、`Consumers`（消费者数量）等信息

![image-20220811094402733](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.2.1.png)

在 http://192.168.56.10:15672/#/ 页面里往下滑， `Ports and contexts`里可以看到端口的占用信息，`Export definitions`可以导出配置、`Import definitions`可以导入配置

![image-20220811095438968](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.2.2.png)

点击 `Exchanges`（交换机），默认就会有7个交换机

![image-20220811095639732](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.2.3.png)

##### 3、添加虚拟机

在`Admin` ->`Virtual Hosts`->`Add a new virtual host`里输入`Name:`，然后点击`Add virtual host`可以添加一个虚拟主机

![image-20220811095815095](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.3.1.png)

添加好虚拟主机后，会自动分配`7`个默认的交换机

![image-20220811100236026](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.3.2.png)

点击刚刚新建的虚拟主机，可以在`Permissions`里给用户设置各种权限

![image-20220811100040244](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.3.3.png)

在`Delete this vhost`里可以点击`Delete this virtual host`删除一个虚拟主机

![image-20220811100407980](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.2.3.4.png)

#### 3、添加交换机

##### 1、交换机类型

Exchange分发消息时根据类型的不同分发策略有区别，目前共四种类型：direct(点对点)、
fanout(扇出)、topic(发布/订阅)、headers 。headers 匹配 AMQP 消息的 header 而不是路由键，
headers 交换器和 direct 交换器完全一致，但性能差很多，目前几乎用不到了，所以直接 看另外三种类型：

- direct(直连(点对点)，类似于`单播`)

消息中的路由键（routing key）如果和Binding 中的 binding key 一致， 交换器就将消息发到对应的队列中。路由键与队列名完全匹配，如果一个队列绑定到交换机要求路由键为“dog”，则只转发 routingkey 标记为“dog”的消息，不会转发“dog.puppy”，、“dog.guard”  等等。它是完全匹配、单播的模式。（将消息发送给指定路由键的队列）

![image-20220811101043102](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.1.1.png)

- fanout(扇形(扇出)、类似于`广播`)

每个发到 fanout 类型交换器的消息都会分到所有绑定的队列上去。fanout 交换器不处理路由键，只是简单的将队列绑定到交换器上，每个发送到交换器的 消息都会被转发到与该交换器绑定的所 有队列上。很像子网广播，每台子网内 的主机都获得了一份复制的消息。fanout 类型转发消息是最快的。(不分路由键，将所有消息交给所有绑定的队列)

![image-20220811101340077](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.1.2.png)

- topic(主题(发布/订阅)，类似于`组播`)

topic 交换器通过模式匹配分配消息的 路由键属性，将路由键和某个模式进行匹配，此时队列需要绑定到一个模式上。 它将路由键和绑定键的字符串切分成单 词，这些单词之间用点隔开。它同样也 会识别两个通配符：符号`#`和符号`*`。`#`匹配0个或多个单词，`*`匹配一 个单词。（将消息发送给匹配路由键的绑定的队列）

![image-20220811101511061](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.1.3.png)

##### 2、添加交换机

添加交换机(`交换机`可以绑定`交换机`和`队列`)

- `Type`: 交换机类型

- `Durability`: 是否持久化

- `Auto delete`: If yes, the exchange will delete itself after at least one queue or exchange has been bound to this one, and then all queues or exchanges have been unbound.

  如果选择yes，则在至少有一个队列或交换机绑定到该交换机。所有队列或交换机都已解除绑定，该交换机将自行删除

- `Internal`: If yes, clients cannot publish to this exchange directly. It can only be used with exchange to exchange bindings.

  如果选择yes，客户端不能直接发布到这个交换机，它仅能被用于交换机与交换机之间绑定

点击`Exchanges`->`Add a new exchange`，输入`Name`为`my.exchange.direct`，其他默认即可，然后点击`Add exchange`

![image-20220811104127869](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.2.1.png)

点击刚刚新建的`my.exchange.direct`交换机，可以在`Bindings`里查看绑定的`Queues`，可以在`Publish message`里发消息

![image-20220811104823286](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.2.2.png)

##### 3、新建一个队列

点击`Queues`->`Add a new queue`，输入`name`，其他默认即可，然后点击`Add queue`

- Auto delete:If yes, the queue will delete itself after at least one consumer has connected, and then all consumers have disconnected. 

  如果选择yes，则至少需要有一个消费者连接到该队列，当所有消费者都断开连接后该队列将自动删除

![image-20220811105621937](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.3.1.png)

在`Exchanges`里点击刚刚创建的`my.exchange.direct`，在`Bindings`里的`Add binding from this exchange`里，选择`To queue`，然后输入刚刚新建的`Queues`

![image-20220811110227654](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.3.3.2.png)

#### 4、搭建RabbitMQ测试结构

##### 1、结构

![image-20220811203457236](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.4.1.png)

##### 2、添加队列

点击`Queues`->`Add a new queue`，输入`name`为`atguigu.news`，其他默认即可，然后点击`Add queue`

![image-20220811110703384](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.4.2.1.png)

点击`Queues`->`Add a new queue`，输入`name`为`atguigu.emps`，其他默认即可，然后点击`Add queue`

![image-20220811110827830](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.4.2.2.png)

点击`Queues`->`Add a new queue`，输入`name`为`gulixueyuan.news`，其他默认即可，然后点击`Add queue`

![image-20220811110903011](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.4.2.3.png)

查看创建的队列是否正确

![image-20220811151155302](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.4.2.4.png)

在`Exchanges`里点击刚刚创建的`my.exchange.direct`交换机，点击`Delete this exchange`里的`Delete`，删除该交换机

![image-20220811111119727](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.4.2.5.png)

#### 5、直连交换机(类似单播)

##### 1、搭建直连交换机

点击`Exchanges`->`Add a new exchange`，输入`Name`为`exchange.direct`，类型选择`direct`，其他默认即可，然后点击`Add exchange`

![image-20220811111208952](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.1.1.png)

然后在`Exchanges`里点击刚刚创建的`exchange.direct`交换机，在`Bindings`里的`Add binding from this exchange`里，绑定`atguigu`队列、`atguigu.emps`队列、`atguigu.news`队列、`gulixueyuan.news`队列，绑定直连交换机的`To queue`队列名和`Routing Key`路由键要一致。

绑定`atguigu`队列

![image-20220811111512129](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.1.2.png)

绑定`atguigu.emps`队列

![image-20220811111442988](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.1.3.png)

绑定`atguigu.news`队列

![image-20220811111656443](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.1.4.png)

绑定`gulixueyuan.news`队列

![image-20220811111746102](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.1.5.png)

最终`exchange.direct`交换机绑定的队列和路由键如下图所示

![image-20220811151109687](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.1.6.png)

##### 2、测试

在`Exchanges`里点击刚刚创建的`exchange.direct`交换机，在`Publish message`里`Routing key`输入路由键，`Payload`里输入要发送的消息内容。比如在`Routing key`里输入`atguigu.news`，`Payload`里输入`atguigu.news atguigu.news atguigu.news`

![image-20220811112220904](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.1.png)

点击`Queues`，可以看到`atguigu.news`收到了一条消息

![image-20220811112319354](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.2.png)

点击`Queues`里的`atguigu.news`，在`Get messages`里直接`Get messages`按钮，可以看到在`Payload`里已经显示消息了

![image-20220811112523846](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.3.png)

此时`atguigu.news`队列里的消息还在，这是因为默认选择了`Nack message requeue true `（ 获取消息，但是不做ack应答确认，消息重新入队) 模式

![image-20220811112856279](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.4.png)

`Get messages`里`Ack Mode`有四种选择

- **Nack message requeue true**  获取消息，但是不做ack应答确认，消息重新入队

- **Automatic ack**   获取消息，应答确认，消息不重新入队，将会从队列中删除

- **Reject requeue true**  拒绝获取消息，消息重新入队

- **Reject requeue false** 拒绝获取消息，消息不重新入队，将会被删除

![image-20220811113254337](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.5.png)

点击`Queues`里的`atguigu.news`，在`Get messages`里`Ack Mode`选择`Automatic ack`，再点击`Get messages`按钮

![image-20220811113400248](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.6.png)

此时`atguigu.news`队列里就没有消息了

![image-20220811113454310](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.5.2.7.png)

#### 6、扇形交换机(类似多播)

##### 1、搭建扇形交换机

点击`Exchanges`->`Add a new exchange`，输入`Name`为`exchange.fanout`， 类型选择`fanout`，其他默认即可，然后点击`Add exchange`

![image-20220811145105430](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.1.1.png)

然后在`Exchanges`里点击刚刚创建的`exchange.direct`交换机，在`Bindings`里的`Add binding from this exchange`里，绑定`atguigu`队列、`atguigu.emps`队列、`atguigu.news`队列、`gulixueyuan.news`队列，绑定扇形交换机队列名可以不指定路由键（因为指不指定都会将消息发送给绑定的全部队列）。

绑定`atguigu`队列

![image-20220811145259997](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.1.2.png)

绑定`atguigu.emps`队列

![image-20220811145459709](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.1.3.png)

绑定`atguigu.news`队列

![image-20220811145552228](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.1.4.png)

绑定`gulixueyuan.news`队列

![image-20220811145619431](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.1.5.png)

最终`exchange.fanout`交换机绑定的队列和路由键如下图所示

![image-20220811151041332](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.1.6.png)

##### 2、测试

在`Exchanges`里点击刚刚创建的`exchange.fanout`交换机，在`Publish message`里`Routing key`输入路由键，`Payload`里输入要发送的消息内容。比如在`Routing key`里输入`atguigu.emps`，`Payload`里输入`atguigu.emps atguigu.emps atguigu.emps`

![image-20220811145712914](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.2.1.png)

可以看到即使指定了路由键，所有绑定的队列都有一条消息（因此写不写路由键都一样）

![image-20220811145749412](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.2.2.png)

点击`Queues`里的`atguigu`，在`Get messages`里`Ack Mode`选择`Automatic ack`，再点击`Get messages`按钮即可获得消息并确认收到

![image-20220811150016242](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.2.3.png)

此时`atguigu`队列里就没有消息了

![image-20220811150038840](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.2.4.png)

使用相同的方法，清空完所有消息

![image-20220811150145756](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.6.2.5.png)

#### 7、主题交换机(类似组播)

`#`匹配0个或多个单词，`*`匹配一 个单词

##### 1、搭建主题交换机

点击`Exchanges`->`Add a new exchange`，输入`Name`为`exchange.topic`， 类型选择`topic`，其他默认即可，然后点击`Add exchange`

![image-20220811150252271](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.1.1.png)

主题交换机绑定的`To queue`队列名和`Routing Key`路由键可以一致也可以不一致可以灵活的配置（类似于正则表达式），可以完成直连、扇形交换机的功能和它们不具有的功能。

在`Exchanges`里点击刚刚创建的`exchange.topic`交换机，在`Bindings`里的`Add binding from this exchange`里，选择`To queue`并输入`atguigu`，`Routing key`输入`atguigu.#`

![image-20220811150503956](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.1.2.png)

在`Exchanges`里点击刚刚创建的`exchange.topic`交换机，在`Bindings`里的`Add binding from this exchange`里，选择`To queue`并输入`atguigu.emps`，`Routing key`输入`atguigu.#`

![image-20220811150611339](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.1.3.png)

在`Exchanges`里点击刚刚创建的`exchange.topic`交换机，在`Bindings`里的`Add binding from this exchange`里，选择`To queue`并输入`atguigu.news`，`Routing key`输入`atguigu.#`

![image-20220811150718818](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.1.4.png)

在`Exchanges`里点击刚刚创建的`exchange.topic`交换机，在`Bindings`里的`Add binding from this exchange`里，选择`To queue`并输入`gulixueyuan.news`，`Routing key`输入`*.news`

![image-20220811150801598](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.1.5.png)

最终`exchange.topic`交换机绑定的队列和路由键如下图所示

![image-20220811151009581](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.1.6.png)

##### 2、测试

###### 1、测试一

在`Exchanges`里点击刚刚创建的`exchange.topic`交换机，在`Publish message`里`Routing key`输入路由键，`Payload`里输入要发送的消息内容。比如在`Routing key`里输入`atguigu.news`，`Payload`里输入`atguigu.news atguigu.news atguigu.news`

![image-20220811151321045](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.2.1.1.png)

由于4个队列都匹配到了输入的路由键，因此4个队列全收到了消息

![image-20220811151421184](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.2.1.2.png)

把4个队列的消息全部清空，再做测试

![image-20220811151549807](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.2.1.3.png)

###### 2、测试二

在`Exchanges`里点击刚刚创建的`exchange.topic`交换机，在`Publish message`里`Routing key`输入`hello.news`，`Payload`里输入`hello.news hello.news hello.news`。

![image-20220811151645699](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.2.2.1.png)

只有`gulixueyuan.news`队列匹配到了输入的路由键，因此也只有该队列收到了消息

![image-20220811151712215](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.2.2.2.png)

点击`Queues`里的`gulixueyuan.news`，在`Get messages`里`Ack Mode`选择`Automatic ack`，再点击`Get messages`按钮即可获得消息并确认收到

![image-20220811151737220](https://gitlab.com/apzs/image/-/raw/master/image/5.8.1.7.2.2.3.png)

### 5.8.2、整合`RabbitMQ`

#### 1、整合`RabbitMQ`

##### 1、引入`RabbitMQ`

在`gulimall-order`模块的`pom.xml`文件里添加RabbitMQ依赖

```xml
<!--引入amqp场景，使用RabbitMQ-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

![image-20220811153557936](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.1.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplication`类上添加`@EnableRabbit`注解。(引入`spring-boot-starter-amqp`后`RabbitAutoConfiguration`自动生效)

```java
@EnableRabbit
```

![image-20220811155002969](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.1.2.png)

在`gulimall-order`模块的`src/main/resources/application.properties`文件里添加`RabbitMQ`相关的配置

```properties
spring.rabbitmq.host=192.168.56.10
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
#虚拟主机
spring.rabbitmq.virtual-host=/
```

![image-20220811155102448](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.1.3.png)

##### 2、自动配置

在`org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration`类里配置了`连接工厂`

```java
@Bean
public CachingConnectionFactory rabbitConnectionFactory(RabbitProperties properties,
      ObjectProvider<ConnectionNameStrategy> connectionNameStrategy) throws Exception {
   PropertyMapper map = PropertyMapper.get();
   CachingConnectionFactory factory = new CachingConnectionFactory(
         getRabbitConnectionFactoryBean(properties).getObject());
   map.from(properties::determineAddresses).to(factory::setAddresses);
   map.from(properties::isPublisherConfirms).to(factory::setPublisherConfirms);
   map.from(properties::isPublisherReturns).to(factory::setPublisherReturns);
   RabbitProperties.Cache.Channel channel = properties.getCache().getChannel();
   map.from(channel::getSize).whenNonNull().to(factory::setChannelCacheSize);
   map.from(channel::getCheckoutTimeout).whenNonNull().as(Duration::toMillis)
         .to(factory::setChannelCheckoutTimeout);
   RabbitProperties.Cache.Connection connection = properties.getCache().getConnection();
   map.from(connection::getMode).whenNonNull().to(factory::setCacheMode);
   map.from(connection::getSize).whenNonNull().to(factory::setConnectionCacheSize);
   map.from(connectionNameStrategy::getIfUnique).whenNonNull().to(factory::setConnectionNameStrategy);
   return factory;
}
```

![image-20220811153833138](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.2.1.png)

`RabbitTemplate` 常用于发送消息

```java
@Bean
@ConditionalOnSingleCandidate(ConnectionFactory.class)
@ConditionalOnMissingBean
public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
   PropertyMapper map = PropertyMapper.get();
   RabbitTemplate template = new RabbitTemplate(connectionFactory);
   MessageConverter messageConverter = this.messageConverter.getIfUnique();
   if (messageConverter != null) {
      template.setMessageConverter(messageConverter);
   }
   template.setMandatory(determineMandatoryFlag());
   RabbitProperties.Template properties = this.properties.getTemplate();
   if (properties.getRetry().isEnabled()) {
      template.setRetryTemplate(new RetryTemplateFactory(
            this.retryTemplateCustomizers.orderedStream().collect(Collectors.toList())).createRetryTemplate(
                  properties.getRetry(), RabbitRetryTemplateCustomizer.Target.SENDER));
   }
   map.from(properties::getReceiveTimeout).whenNonNull().as(Duration::toMillis)
         .to(template::setReceiveTimeout);
   map.from(properties::getReplyTimeout).whenNonNull().as(Duration::toMillis).to(template::setReplyTimeout);
   map.from(properties::getExchange).to(template::setExchange);
   map.from(properties::getRoutingKey).to(template::setRoutingKey);
   map.from(properties::getDefaultReceiveQueue).whenNonNull().to(template::setDefaultReceiveQueue);
   return template;
}
```

![image-20220811153920189](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.2.2.png)

`AmqpAdmin` 常用于管理交换机、队列

```java
@Bean
@ConditionalOnSingleCandidate(ConnectionFactory.class)
@ConditionalOnProperty(prefix = "spring.rabbitmq", name = "dynamic", matchIfMissing = true)
@ConditionalOnMissingBean
public AmqpAdmin amqpAdmin(ConnectionFactory connectionFactory) {
   return new RabbitAdmin(connectionFactory);
}
```

![image-20220811154015402](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.2.3.png)

`RabbitMessagingTemplate`

```java
@Bean
@ConditionalOnSingleCandidate(RabbitTemplate.class)
public RabbitMessagingTemplate rabbitMessagingTemplate(RabbitTemplate rabbitTemplate) {
   return new RabbitMessagingTemplate(rabbitTemplate);
}
```

![image-20220811154037439](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.2.4.png)

点击`org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration`类里的`AmqpAdmin`就来到了`org.springframework.amqp.core.AmqpAdmin`，再点击`Exchange`就来到了`org.springframework.amqp.core.Exchange`，使用`ctrl + H`快捷键可以看到该类与其他类的继承关系

`org.springframework.amqp.core.AbstractExchange`抽象类实现了`org.springframework.amqp.core.Exchange`接口，该抽象类有如下几个实现类：

org.springframework.amqp.core.DirectExchange

org.springframework.amqp.core.FanoutExchange

org.springframework.amqp.core.CustomExchange 自定义

org.springframework.amqp.core.TopicExchange

org.springframework.amqp.core.HeadersExchange

这里面包含了前面测试RabbitMQ的几种交换机，而且还可以自定义交换机

![image-20220811155414815](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.1.2.5.png)

#### 2、测试

##### 1、创建交换机

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里修改为如下代码

```
@Slf4j
```

```java
@Autowired
AmqpAdmin amqpAdmin;

@Test
public void contextLoads() {
   //声明交换机（durable：持久化）
   //DirectExchange(String name, boolean durable, boolean autoDelete, Map<String, Object> arguments)
   DirectExchange directExchange = new DirectExchange("hello-java-exchange",true,false);
   amqpAdmin.declareExchange(directExchange);
   log.info("Exchange[{}]创建成功",directExchange.getName());
}
```

控制台输出：

```
Exchange[hello-java-exchange]创建成功
```

![image-20220811160144915](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.1.1.png)

浏览器打开 http://192.168.56.10:15672/#/exchanges 页面，可以看到`hello-java-exchange`交换机创建成功了

![image-20220811160218336](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.1.2.png)

##### 2、创建队列

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里添加`createQueue`方法

注意： `Queue`要选`org.springframework.amqp.core`包下的

```java
/**
 * 创建队列
 */
@Test
public void createQueue(){
   //exclusive：排他(只能被声明的连接使用，只要一个连接连上该队列，其他连接就连不上该队列)
   //Queue(String name, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments)
   Queue queue = new Queue("hello-java-queue",true,false,false);
   amqpAdmin.declareQueue(queue);
   log.info("Exchange[{}]创建成功",queue.getName());
}
```

控制台输出：

```
Exchange[hello-java-queue]创建成功
```

![image-20220811161345321](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.2.1.png)

浏览器打开 http://192.168.56.10:15672/#/queues 页面，可以看到`hello-java-queue`队列创建成功了

![image-20220811161412585](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.2.2.png)

`org.springframework.amqp.core.Queue`类的构造函数详细说明如下

```java
/**
 * Construct a new queue, given a name, durability, exclusive and auto-delete flags.
 * @param name the name of the queue.
 * @param durable true if we are declaring a durable queue (the queue will survive a server restart)
 * @param exclusive true if we are declaring an exclusive queue (the queue will only be used by the declarer's connection) 排他队列：只能被声明的连接使用
 * @param autoDelete true if the server should delete the queue when it is no longer in use
 */
public Queue(String name, boolean durable, boolean exclusive, boolean autoDelete) {
   this(name, durable, exclusive, autoDelete, null);
}
```

![image-20220811160813636](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.2.3.png)

##### 3、创建绑定关系

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里添加`createBinding`方法

注意： `Binding`要选`org.springframework.amqp.core`包下的

```java
/**
 * 创建绑定
 */
@Test
public void createBinding() {
   /*
    * String destination :目的地
    * DestinationType destinationType :目的地类型（交换机/队列）
    * String exchange    :交换机
    * String routingKey  :路由键
    * Map<String, Object> arguments 参数
    */
   //将exchange指定的交换机和destination目的地进行绑定，使用routingKey作为指定的路由键
   Binding binding = new Binding("hello-java-queue", Binding.DestinationType.QUEUE,
         "hello-java-exchange","hello.java",null);
   amqpAdmin.declareBinding(binding);
   log.info("Binding[{}]创建成功","hello-java-Binding");
}
```

控制台输出：

```
Binding[hello-java-Binding]创建成功
```

![image-20220811162613591](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.3.1.png)

在 http://192.168.56.10:15672/#/exchanges 页面里点击刚刚创建的`hello-java-exchange`交换机，可以看到该交换机已经绑定`hello-java-queue`队列了，且绑定的路由键为`hello.java`

![image-20220811162636478](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.3.2.png)

##### 4、发送字符串消息

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里添加`sendMessage`方法，用于`hello-java-exchange`交换机使用`hello.java`路由键发送字符串消息

```java
@Autowired
RabbitTemplate rabbitTemplate;
@Test
public void sendMessage(){
   //rabbitTemplate.send();
   //convertAndSend(String exchange, String routingKey, final Object object)
   String msg = "hello world";
   rabbitTemplate.convertAndSend("hello-java-exchange","hello.java",msg);
   log.info("消息发送完成{}",msg);
}
```

控制台输出：

```
消息发送完成hello world
```

![image-20220811163232674](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.4.1.png)

浏览器访问 http://192.168.56.10:15672/#/queues 页面，可以看到`hello-java-queue`已经有一条消息了

![image-20220811163253188](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.4.2.png)

点击`Queues`里的`hello-java-queue`，在`Get messages`里`Ack Mode`选择`Reject requeue false`，再点击`Get messages`按钮，此时已经正确获取到消息了

![image-20220811163515707](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.4.3.png)

##### 5、发送Java对象消息

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里添加`sendMessage2`方法，用于`hello-java-exchange`交换机使用`hello.java`路由键发送Java对象消息

```JAVA
@Test
public void sendMessage2(){
   OrderReturnReasonEntity entity = new OrderReturnReasonEntity();
   entity.setId(1L);
   entity.setCreateTime(new Date());
   entity.setName("啊啊啊");
   //rabbitTemplate.send();
   //convertAndSend(String exchange, String routingKey, final Object object)
   rabbitTemplate.convertAndSend("hello-java-exchange","hello.java",entity);
   log.info("消息发送完成{}",entity);
}
```

控制台输出：

```
消息发送完成OrderReturnReasonEntity(id=1, name=啊啊啊, sort=null, status=null, createTime=Thu Aug 11 16:40:19 CST 2022)
```

![image-20220811164051363](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.5.1.png)

点击`Queues`里的`hello-java-queue`，在`Get messages`里`Ack Mode`选择`Reject requeue false`，再点击`Get messages`按钮，此时`Properties`里面的`content_type`的值为`application/x-java-serialized-object`，内容也是乱的

![image-20220811164159081](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.2.5.2.png)

#### 3、使用JSON进行序列化

##### 1、实现`Serializable`接口

让`gulimall-order`模块的`com.atguigu.gulimall.order.entity.OrderReturnReasonEntity`类实现`Serializable`接口

![image-20220811164300656](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.1.png)

##### 2、源码分析

`org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration`类的`RabbitTemplateConfiguration`静态内部类的`RabbitTemplateConfiguration`方法有一个`ObjectProvider<MessageConverter> messageConverter`参数，该方法会从容器种获取所有MessageConverter(消息转换器)，然后设给本类的`messageConverter`字段（如果这个消息转换器唯一，则使用该消息转换器）

```java
public RabbitTemplateConfiguration(RabbitProperties properties,
      //ObjectProvider<MessageConverter>：从容器种获取所有MessageConverter(消息转换器)
      ObjectProvider<MessageConverter> messageConverter,
      ObjectProvider<RabbitRetryTemplateCustomizer> retryTemplateCustomizers) {
   this.properties = properties;
   this.messageConverter = messageConverter;
   this.retryTemplateCustomizers = retryTemplateCustomizers;
}

@Bean
@ConditionalOnSingleCandidate(ConnectionFactory.class)
@ConditionalOnMissingBean
public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
   PropertyMapper map = PropertyMapper.get();
   RabbitTemplate template = new RabbitTemplate(connectionFactory);
   //获取消息转换器
   MessageConverter messageConverter = this.messageConverter.getIfUnique();
   if (messageConverter != null) {
      template.setMessageConverter(messageConverter);
   }
   template.setMandatory(determineMandatoryFlag());
   RabbitProperties.Template properties = this.properties.getTemplate();
   if (properties.getRetry().isEnabled()) {
      template.setRetryTemplate(new RetryTemplateFactory(
            this.retryTemplateCustomizers.orderedStream().collect(Collectors.toList())).createRetryTemplate(
                  properties.getRetry(), RabbitRetryTemplateCustomizer.Target.SENDER));
   }
   map.from(properties::getReceiveTimeout).whenNonNull().as(Duration::toMillis)
         .to(template::setReceiveTimeout);
   map.from(properties::getReplyTimeout).whenNonNull().as(Duration::toMillis).to(template::setReplyTimeout);
   map.from(properties::getExchange).to(template::setExchange);
   map.from(properties::getRoutingKey).to(template::setRoutingKey);
   map.from(properties::getDefaultReceiveQueue).whenNonNull().to(template::setDefaultReceiveQueue);
   return template;
}
```

![image-20220811165246108](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.2.1.png)

在`org.springframework.amqp.rabbit.core.RabbitTemplate`里如果容器中没有`messageConverter`(消息转换器)或不唯一，则会使用默认的`private MessageConverter messageConverter = new SimpleMessageConverter();`

![image-20220811165318057](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.2.2.png)

在`org.springframework.amqp.support.converter.SimpleMessageConverter#createMessage`方法里，如果是`String`就转换为`byte[]`，如果实现类`Serializable`就用`SerializationUtils`进行序列化，因此如果不加以设置，默认将使用` SerializationUtils.serialize(object);`进行序列化

```java
/**
 * Creates an AMQP Message from the provided Object.
 */
@Override
protected Message createMessage(Object object, MessageProperties messageProperties) throws MessageConversionException {
   byte[] bytes = null;
   if (object instanceof byte[]) {
      bytes = (byte[]) object;
      messageProperties.setContentType(MessageProperties.CONTENT_TYPE_BYTES);
   }
   else if (object instanceof String) {
      try {
         bytes = ((String) object).getBytes(this.defaultCharset);
      }
      catch (UnsupportedEncodingException e) {
         throw new MessageConversionException(
               "failed to convert to Message content", e);
      }
      messageProperties.setContentType(MessageProperties.CONTENT_TYPE_TEXT_PLAIN);
      messageProperties.setContentEncoding(this.defaultCharset);
   }
   else if (object instanceof Serializable) {
      try {
         bytes = SerializationUtils.serialize(object);
      }
      catch (IllegalArgumentException e) {
         throw new MessageConversionException(
               "failed to convert to serialized Message content", e);
      }
      messageProperties.setContentType(MessageProperties.CONTENT_TYPE_SERIALIZED_OBJECT);
   }
   if (bytes != null) {
      messageProperties.setContentLength(bytes.length);
      return new Message(bytes, messageProperties);
   }
   throw new IllegalArgumentException(getClass().getSimpleName()
         + " only supports String, byte[] and Serializable payloads, received: " + object.getClass().getName());
}
```

![image-20220811165718487](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.2.3.png)

如何使用JSON进行序列化呢？

搜先我们点进`org.springframework.amqp.support.converter.MessageConverter`接口，按住`ctrl + H`查看该类和其他类的依赖关系，即可看到`org.springframework.amqp.support.converter.Jackson2JsonMessageConverter`类。(`Jackson`是`Spring`默认的`JSON`序列化器)

因此我们只需向容器中注入`Jackson2JsonMessageConverter`类即可

![image-20220811170224381](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.2.4.png)

##### 3、注入JSON消息转换器

在`gulimall-order`模块的`com.atguigu.gulimall.order`包下新建`config`文件夹，在`config`文件夹下新建`MyRabbitConfig`配置类

```java
package com.atguigu.gulimall.order.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @author 无名氏
 * @date 2022/8/11
 * @Description:
 */
@Configuration
public class MyRabbitConfig {

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }
}
```

![image-20220811170708228](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.3.png)

##### 4、再次发送Java对象消息

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里再次执行`sendMessage2`方法，用于`hello-java-exchange`交换机使用`hello.java`路由键发送Java对象消息

控制台输出：

```
消息发送完成OrderReturnReasonEntity(id=1, name=啊啊啊, sort=null, status=null, createTime=Thu Aug 11 17:10:30 CST 2022)
```

![image-20220811171149957](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.4.1.png)

点击`Queues`里的`hello-java-queue`，在`Get messages`里`Ack Mode`选择`Reject requeue false`，再点击`Get messages`按钮，这时消息就是JSON格式的对象了

```
headers:    
__TypeId__: com.atguigu.gulimall.order.entity.OrderReturnReasonEntity
content_type:   application/json
{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660209030108}
```

![image-20220811171202932](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.3.4.2.png)

#### 4、接收消息

##### 1、参数指定为`Object`类型

在需要监听队列的业务方法上标注`@RabbitListener`注解（该方法所在的类需要在容器中）

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类里添加如下方法（这里只是测试用，平时开发不要放在配置类里），然后重启`gulimall-order`模块

```java
/**
 * 在需要监听队列的业务方法上标注@RabbitListener注解（该方法所在的类需要在容器中）
 */
@RabbitListener(queues = {"hello-java-queue"})
public void receiveMessage(Object message){
    System.out.println("接收到消息...内容："+message+"==>类型："+ message.getClass());
}
```

![image-20220811190304872](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.1.1.png)

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里再次执行`sendMessage2`方法，用于`hello-java-exchange`交换机使用`hello.java`路由键发送Java对象消息

```bash
2022-08-11 17:27:15.913  INFO 14580 --- [           main] c.a.g.o.GulimallOrderApplicationTests    : 消息发送完成OrderReturnReasonEntity(id=1, name=啊啊啊, sort=null, status=null, createTime=Thu Aug 11 17:27:15 CST 2022)
```

![image-20220811172823781](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.1.2.png)

打开`gulimall-order`模块的控制台，可以看到接收到的消息的类型为`org.springframework.amqp.core.Message`

```bash
接收到消息...内容：(Body:'{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660210035834}' MessageProperties [headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-5sX1WFjvna_vui2BTkXVdg, consumerQueue=hello-java-queue])==>类型：class org.springframework.amqp.core.Message
```

![image-20220811190102733](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.1.3.png)

##### 2、参数指定为`Message`类型

由于接收到的消息的类型为`org.springframework.amqp.core.Message`，因此业务方法可以参数直接传`Message`类型，这样可以方便获取信息

```java
/**
 * 在需要监听队列的业务方法上标注@RabbitListener注解（该方法所在的类需要在容器中）
 */
@RabbitListener(queues = {"hello-java-queue"})
public void receiveMessage(Message message){
    //{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660210035834}
    byte[] body = message.getBody();
    //消息的属性信息
    //[headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-5sX1WFjvna_vui2BTkXVdg, consumerQueue=hello-java-queue]
    MessageProperties messageProperties = message.getMessageProperties();
    String contentType = messageProperties.getContentType();
    System.out.println("接收到消息...内容："+message+"==>类型："+ message.getClass());
}
```

![image-20220811190730199](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.2.png)

##### 3、添加消息内容实体参数

也可以在`Message message`后面添加第二个参数用于接收发送的消息内容对象，Spring会自动封装，然后重启`gulimall-order`模块

```java
/**
 * 在需要监听队列的业务方法上标注@RabbitListener注解（该方法所在的类需要在容器中）
 * 参数可以写一下类型
 * 1、Message message:原生消息详细信息。头+体
 * 2、T<发送的消息的类型> OrderReturnReasonEntity content;
 */
@RabbitListener(queues = {"hello-java-queue"})
public void receiveMessage(Message message, OrderReturnReasonEntity entity){
    //{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660210035834}
    byte[] body = message.getBody();
    //消息的属性信息
    //[headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-5sX1WFjvna_vui2BTkXVdg, consumerQueue=hello-java-queue]
    MessageProperties messageProperties = message.getMessageProperties();
    String contentType = messageProperties.getContentType();
    System.out.println("接收到消息："+message+"==>内容："+ entity+"==>内容类型："+contentType);
}
```

![image-20220811191525667](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.3.1.png)

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里再次执行`sendMessage2`方法，用于`hello-java-exchange`交换机使用`hello.java`路由键发送Java对象消息

控制台输出：

```bash
2022-08-11 19:11:53.932  INFO 13548 --- [           main] c.a.g.o.GulimallOrderApplicationTests    : 消息发送完成OrderReturnReasonEntity(id=1, name=啊啊啊, sort=null, status=null, createTime=Thu Aug 11 19:11:53 CST 2022)
```

![image-20220811191225460](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.3.2.png)

打开`gulimall-order`模块的控制台，可以看到接收到的消息和序列化好的消息内容对象

```json
接收到消息：(Body:'{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660216409211}' MessageProperties [headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-7ScvVL_ZKCfOBosHgXUfMQ, consumerQueue=hello-java-queue])==>内容：OrderReturnReasonEntity(id=1, name=啊啊啊, sort=null, status=null, createTime=Thu Aug 11 19:13:29 CST 2022)==>内容类型application/json
```

![image-20220811191408265](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.3.3.png)

##### 4、添加`Channel`类型参数

参数还可以传`com.rabbitmq.client.Channel`类型，获取当前传输数据的通道

```java
/**
 * 在需要监听队列的业务方法上标注@RabbitListener注解（该方法所在的类需要在容器中）
 * 参数可以写一下类型
 * 1、Message message:原生消息详细信息。头+体
 * 2、T<发送的消息的类型> OrderReturnReasonEntity content;
 * Channel channel: 当前传输数据的通道
 */
@RabbitListener(queues = {"hello-java-queue"})
public void receiveMessage(Message message, OrderReturnReasonEntity entity, Channel channel){
    //{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660210035834}
    byte[] body = message.getBody();
    //消息的属性信息
    //[headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-5sX1WFjvna_vui2BTkXVdg, consumerQueue=hello-java-queue]
    MessageProperties messageProperties = message.getMessageProperties();
    String contentType = messageProperties.getContentType();
    System.out.println("接收到消息："+message+"==>内容："+ entity+"==>内容类型："+contentType);
}
```

![image-20220811191929570](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.4.4.png)

#### 5、集群接收消息

##### 1、批量发送消息

选中`GulimallorderApplication :9000/`这个服务，右键选择`Copy Configuration...`，在弹出的对话框的`Program arguments:`里输入`--server.port=9001`，然后点击`OK`就复制了一份配置，启动刚刚复制的`GulimallorderApplication(1)`这个服务，模拟集群接收消息 

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.1.1.png" alt="GIF 2022-8-11 19-34-45" style="zoom:67%;" />

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里修改`sendMessage2`方法，用于`hello-java-exchange`交换机使用`hello.java`路由键发送10条Java对象消息，然后执行该测试方法

```java
/**
 * 发送其他对象类型消息
 */
@Test
public void sendMessage2(){
   for (int i = 0; i < 10; i++) {
      //发送消息，如果发送的消息是个对象，我们会使用序列化机制，将对象写出去。对象必须实现Serializable
      OrderReturnReasonEntity entity = new OrderReturnReasonEntity();
      entity.setId(1L);
      entity.setCreateTime(new Date());
      entity.setName("啊啊啊-->"+ i);
      //rabbitTemplate.send();
      //convertAndSend(String exchange, String routingKey, final Object object)
      rabbitTemplate.convertAndSend("hello-java-exchange","hello.java",entity);
      log.info("消息发送完成{}",entity);
   }
}
```

![image-20220811192800214](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.1.2.png)

`GulimallorderApplication :9000/` 服务收到了`0`、`3`、`6`、`9`

![image-20220811192942423](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.1.3.png)

`GulimallorderApplication(1) :9001/` 服务收到了`1`、`4`、`7`

![image-20220811193020853](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.1.4.png)

还有3个消息被刚刚执行的`sendMessage2`测试方法收到了

![image-20220811193154515](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.1.5.png)

##### 2、模拟业务处理时间长

修改`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类里的`receiveMessage`方法，在方法里面让程序睡3s ，模拟业务处理时间长

```java
/**
 * 在需要监听队列的业务方法上标注@RabbitListener注解（该方法所在的类需要在容器中）
 * 参数可以写一下类型
 * 1、Message message:原生消息详细信息。头+体
 * 2、T<发送的消息的类型> OrderReturnReasonEntity content;
 * Channel channel: 当前传输数据的通道
 *
 * Queue:可以很多人都来监听。只要收到消息，队列删除消息，而且只能有一一个收到此消息
 * 场景:
 * 1)、订单服务启动多个;同一个消息，只能有一个客户端收到
 * 2)、只有一个消息完全处理完，方法运行结束，我们就可以接收到下一个消息
 */
@RabbitListener(queues = {"hello-java-queue"})
public void receiveMessage(Message message, OrderReturnReasonEntity entity, Channel channel) throws InterruptedException {
    //{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660210035834}
    byte[] body = message.getBody();
    //消息的属性信息
    //[headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-5sX1WFjvna_vui2BTkXVdg, consumerQueue=hello-java-queue]
    MessageProperties messageProperties = message.getMessageProperties();
    String contentType = messageProperties.getContentType();
    System.out.println("接收到消息："+entity);
    Thread.sleep(3000);
    System.out.println("消息处理完成：" + entity.getName());
}
```

![image-20220811194408956](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.2.1.png)

关闭`GulimallOrderApplication (1)`服务，重启`GulimallOrderApplication`服务（`gulimall-order`模块只启动一个服务）

可以看到即使业务执行时间很长，也是当前业务执行完后再处理的下一个请求，不会出现这个请求还没处理完下一个请求又开始处理的问题。

![GIF 2022-8-11 19-41-16](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.2.2.gif)

在`gulimall-order`模块的`com.atguigu.gulimall.order`包下新建`test`文件夹，在`test`文件夹里新建`ReceiveMessage`类，将`com.atguigu.gulimall.order.config.MyRabbitConfig`类里的`receiveMessage`方法移动到该类（方便回来看代码）

```java
package com.atguigu.gulimall.order.test;

import com.atguigu.gulimall.order.entity.OrderReturnReasonEntity;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/11
 * @Description: com.atguigu.gulimall.order.GulimallOrderApplicationTests.sendMessage2发送消息
 *  测试发放的控制台也有可能收到消息，测试方法的控制台也要看
 *  测试该类时，注释掉ReceiveMessage2类的方法
 */
@Component
public class ReceiveMessage {
    /**
     * 在需要监听队列的业务方法上标注@RabbitListener注解（该方法所在的类需要在容器中）
     * 参数可以写一下类型
     * 1、Message message:原生消息详细信息。头+体
     * 2、T<发送的消息的类型> OrderReturnReasonEntity content;
     * Channel channel: 当前传输数据的通道
     *
     * Queue:可以很多人都来监听。只要收到消息，队列删除消息，而且只能有一一个收到此消息
     * 场景:
     * 1)、订单服务启动多个;同一个消息，只能有一个客户端收到
     * 2)、只有一 -个消息完全处理完，方法运行结束，我们就可以接收到下一个消息
     */
    @RabbitListener(queues = {"hello-java-queue"})
    public void receiveMessage(Message message, OrderReturnReasonEntity entity, Channel channel) throws InterruptedException {
        //{"id":1,"name":"啊啊啊","sort":null,"status":null,"createTime":1660210035834}
        byte[] body = message.getBody();
        //消息的属性信息
        //[headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderReturnReasonEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, redelivered=false, receivedExchange=hello-java-exchange, receivedRoutingKey=hello.java, deliveryTag=1, consumerTag=amq.ctag-5sX1WFjvna_vui2BTkXVdg, consumerQueue=hello-java-queue]
        MessageProperties messageProperties = message.getMessageProperties();
        String contentType = messageProperties.getContentType();
        System.out.println("接收到消息："+entity);
        Thread.sleep(3000);
        System.out.println("消息处理完成：" + entity.getName());
    }
}
```

![image-20220811195116191](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.2.3.png)

##### 3、接收多种实体对应的消息

在`gulimall-order`模块`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类里添加`sendMessage3`方法，用于发送不同实体类型的消息内容

```java
/**
 * 发送不同对象类型消息(模拟同一个队列发送不同对象 或 不同队列发送的对象不同)
 * 发送OrderReturnReasonEntity对象 ReceiveMessage2类的receiveMessage1方法接收该消息
 * 发送OrderEntity对象             ReceiveMessage2类的receiveMessage2方法接收该消息
 *
 */
@Test
public void sendMessage3(){
   for (int i = 0; i < 10; i++) {
      if (i%2==0) {
         //发送消息，如果发送的消息是个对象，我们会使用序列化机制，将对象写出去。对象必须实现Serializable
         OrderReturnReasonEntity entity = new OrderReturnReasonEntity();
         entity.setId(1L);
         entity.setCreateTime(new Date());
         entity.setName("啊啊啊-->" + i);
         //rabbitTemplate.send();
         //convertAndSend(String exchange, String routingKey, final Object object)
         rabbitTemplate.convertAndSend("hello-java-exchange", "hello.java", entity);
         log.info("消息发送完成{}", entity);
      }else {
         OrderEntity entity = new OrderEntity();
         entity.setOrderSn(UUID.randomUUID().toString());
         rabbitTemplate.convertAndSend("hello-java-exchange", "hello.java", entity);
         log.info("消息发送完成{}", entity);
      }
   }
}
```

![image-20220811201450598](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.3.1.png)

重启`GulimallOrderApplication`服务，执行`sendMessage3`测试方法，可以看到如果消息内容与前面参数的接收类型不一致，则获取不到别的类型的信息

![GIF 2022-8-11 20-13-40](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.3.2.gif)

上节介绍的那种方式只能处理发送的消息内容是对应参数实体的消息，如何处理消息内容是多个不同实体的消息呢？

可以在类上添加`@RabbitListener(queues = {"hello-java-queue"})`注解，不同方法的参数传不同类型的实体，然后在方法上添加`@RabbitHandler`注解，用于处理不同对象

```java
package com.atguigu.gulimall.order.test;

import com.atguigu.gulimall.order.entity.OrderEntity;
import com.atguigu.gulimall.order.entity.OrderReturnReasonEntity;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/11
 * @Description: com.atguigu.gulimall.order.GulimallOrderApplicationTests.sendMessage3发送消息
 *  测试发放的控制台也有可能收到消息，测试方法的控制台也要看
 *  测试该类时，注释掉ReceiveMessage1类的方法
 */
@Component
@RabbitListener(queues = {"hello-java-queue"})
public class ReceiveMessage2 {

    @RabbitHandler
    public void receiveMessage1(Message message, OrderReturnReasonEntity entity, Channel channel){
        System.out.println("OrderReturnReasonEntity类消息处理完成：" + entity.getName());
    }

    @RabbitHandler
    public void receiveMessage2(OrderEntity entity){
        System.out.println("OrderEntity类消息处理完成：" + entity.getOrderSn());
    }
}
```

![image-20220811202134679](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.3.3.png)

注释掉`com.atguigu.gulimall.order.test.ReceiveMessage`类的`receiveMessage`方法

![image-20220811202514362](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.3.4.png)

重启`gulimall-order`模块，再次执行`sendMessage3`测试方法，查看`gulimall-order`模块控制台，可以看到，消息被不同的方法正确处理了

![GIF 2022-8-11 20-27-09](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.5.3.5.gif)

#### 6、消息可靠投递与消息可靠抵达

Reliability Guide：可靠投递：https://www.rabbitmq.com/reliability.html

![GIF 2022-8-11 20-53-58](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.0.1.png)

消息可靠抵达： https://www.rabbitmq.com/confirms.html#publisher-confirms

> Using standard AMQP 0-9-1, the only way to guarantee that a message isn't lost is by using transactions -- make the channel transactional then for each message or set of messages publish, commit. In this case, transactions are unnecessarily heavyweight and decrease throughput by a factor of 250. To remedy this, a confirmation mechanism was introduced. It mimics the consumer acknowledgements mechanism already present in the protocol.
>
> 使用标准 AMQP 0-9-1，保证消息不丢失的唯一方法是使用事务——使通道具有事务性，然后为每条消息或一组消息发布、提交。 在这种情况下，事务不确定是不是重量级的，并且会将吞吐量降低了 250 倍。为了解决这个问题，引入了确认机制。 它模仿了协议中已经存在的消费者确认机制。

![GIF 2022-8-11 21-02-23](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.0.2.png)

**RabbitMQ消息确认机制简介**

保证消息不丢失，可靠抵达，可以使用事务消息，但性能会下降250倍，为此引入确认机制

- **publisher** confirmCallback 确认模式（发布者 -> 消息代理，这里的消息代理指的是RabbitMQ）

- **publisher** returnCallback 未投递到 queue 退回模式 （交换机 -> 队列）

- **consumer** ack机制 ( 队列 -> 消费者 )

![image-20220811210347860](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.0.3.png)

##### 1、ConfirmCallback

**spring.rabbitmq.publisher-confirms=true**

- 在创建 connectionFactory 的时候设置 PublisherConfirms(true) 选项，开启confirmcallback 。

- CorrelationData：用来表示当前消息唯一性。

- 消息只要被 broker 接收到就会执行 confirmCallback，如果是 cluster 模式，需要所有broker 接收到才会调用 confirmCallback。

- 被 broker 接收到只能表示 message 已经到达服务器，并不能保证消息一定会被投递 到目标 queue 里。所以需要用到接下来的returnCallback 。

在`org.springframework.amqp.rabbit.core.RabbitTemplate`类里定义了`ConfirmCallback`函数式接口

```java
/**
 * A callback for publisher confirmations.
 *
 */
@FunctionalInterface
public interface ConfirmCallback {

   /**
    * Confirmation callback.
    * @param correlationData correlation data for the callback.(消息的关联标识，唯一id)
    * @param ack true for ack, false for nack (消息有没有正确的收到)
    * @param cause An optional cause, for nack, when available, otherwise null. (消息如果没有被正确收到的原因)
    */
   void confirm(@Nullable CorrelationData correlationData, boolean ack, @Nullable String cause);

}
```

![image-20220812090028474](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.1.png)

想要开启发布者发送消息到消息代理的确认，首先需要将`spring.rabbitmq.publisher-confirms`设为`true`

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置

```properties
#开启 发布者发送消息到消息代理的确认 publisher->broker(默认false)
spring.rabbitmq.publisher-confirms=true
```

![image-20220812092304154](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.2.png)

然后调用`rabbitTemplate.setConfirmCallback()`方法，参数传`ConfirmCallback`函数式接口的实现类

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类里添加`initRabbitTemplate`方法,用于接收发布者发送消息到消息代理的确认

```java
/**
 * 在构造器执行之后执行
 * 定制RabbitTemplate
 * 1、spring.rabbitmq.publisher-confirms=true
 * 2、设置确认回调
 */
@PostConstruct
public void initRabbitTemplate(){
    rabbitTemplate.setConfirmCallback(new RabbitTemplate.ConfirmCallback() {
        /**
         *只要消息抵达Broker就ack=true
         * @param correlationData 当前消息的唯一关联数据(这个是消息的唯一-id)
         * @param ack             消息是否成功收到
         * @param cause           失败的原因
         */
        @Override
        public void confirm(CorrelationData correlationData, boolean ack, String cause) {
            System.out.println("confirm...CorrelationData==>["+correlationData+"]ack==>["+ack+"]cause==>["+cause+"]");
        }
    });
}
```

![image-20220812093420886](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.3.png)

注释掉`gulimall-order`模块的`com.atguigu.gulimall.order.test.ReceiveMessage`类上的方法

![image-20220812103741526](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.4.png)

注释掉`gulimall-order`模块的`com.atguigu.gulimall.order.test.ReceiveMessage2`类上的方法

![image-20220812103720520](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.5.png)

执行`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类的`sendMessage3`测试方法，可以看到没有消费者也能收到回调，但是获取的内容是null，这是因为发送消息时没有设置id

```bash
confirm...CorrelationData==>[null]ack==>[true]cause==>[null]
```

![image-20220812093305500](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.6.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类的`sendMessage3`测试方法，在发送消息时指定`CorrelationData`，用于设置唯一id

```java
@Test
public void sendMessage3(){
   for (int i = 0; i < 10; i++) {
      String uuid = UUID.randomUUID().toString();
      if (i%2==0) {
         //发送消息，如果发送的消息是个对象，我们会使用序列化机制，将对象写出去。对象必须实现Serializable
         OrderReturnReasonEntity entity = new OrderReturnReasonEntity();
         entity.setId(1L);
         entity.setCreateTime(new Date());
         entity.setName("啊啊啊-->" + i);
         //rabbitTemplate.send();
         //convertAndSend(String exchange, String routingKey, final Object object)
         rabbitTemplate.convertAndSend("hello-java-exchange", "hello.java", entity,new CorrelationData(uuid));
         log.info("消息发送完成{}", entity);
      }else {
         OrderEntity entity = new OrderEntity();
         entity.setOrderSn(UUID.randomUUID().toString());
         rabbitTemplate.convertAndSend("hello-java-exchange", "hello.java", entity,new CorrelationData(uuid));
         log.info("消息发送完成{}", entity);
      }
   }
}
```

![image-20220812102727147](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.7.png)

再次执行`sendMessage3`测试方法，在`gulimall-order`控制台就可以看到id信息了，这样就可以知道是哪个消息投递失败了

```bash
confirm...CorrelationData==>[CorrelationData [id=a89916d3-4d48-443a-a32e-3a902c773b6d]]ack==>[true]cause==>[null]
confirm...CorrelationData==>[CorrelationData [id=e5d6db9a-a929-4345-b08f-cd2ef6fd24be]]ack==>[true]cause==>[null]
confirm...CorrelationData==>[CorrelationData [id=2b5a0e61-477c-4c5d-9043-df127c917c88]]ack==>[true]cause==>[null]
```

![image-20220812102934374](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.1.8.png)

##### 2、ReturnCallback

**spring.rabbitmq.publisher-returns=true**
**spring.rabbitmq.template.mandatory=true**

- confrim 模式只能保证消息到达 broker，不能保证消息准确投递到目标 queue 里。在有 些业务场景下，我们需要保证消息一定要投递到目标 queue 里，此时就需要用到return 退回模式。

- 这样如果未能投递到目标 queue 里将调用 returnCallback ，可以记录下详细到投递数 据，定期的巡检或者自动纠错都需要这些数据。

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置，用于开启发送端消息从交换机抵达队列失败的回调

```properties
#开启发送端消息从交换机抵达队列失败的回调(默认false)
spring.rabbitmq.publisher-returns=true
#只要抵达队列，以异步发送优先回调我们这个returnConfirm(当然也可以不设置，默认false)
spring.rabbitmq.template.mandatory=true
```

![image-20220812093905279](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类的`initRabbitTemplate`方法添加如下代码，用于接收消息从交换机到队列的确认

```java
//消息从交换机抵达队列失败的回调（比如：让路由键匹配不到绑定的交换机或队列）
rabbitTemplate.setReturnCallback(new RabbitTemplate.ReturnCallback() {
    /**
     * 只要消息没有投递给指定的队列，就触发这个失败回调
     * @param message    投递失败的消息详细信息
     * @param replyCode  回复的状态码
     * @param replyText  回复的文本内容
     * @param exchange   当时这个消息发给哪个交换机
     * @param routingKey 当时这个消息用哪个路由键
     */
    @Override
    public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
        System.out.println("message = " + message + ", replyCode = " + replyCode +
                ", replyText = " + replyText + ", exchange = " + exchange + ", routingKey = " + routingKey);
    }
});
```

![image-20220812101719532](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.2.2.png)

可以看到，只有消息投递到Broker的回调，没有交换机投递到队列的回调，这是因为只有消息从交换机投递到队列失败才会执行`ReturnCallback`的回调

```bash
confirm...CorrelationData==>[null]ack==>[true]cause==>[null]
```

![image-20220812101535421](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.2.3.png)

那么如何让消息从交换机投递到队列失败呢？只需让路由键匹配不到绑定的交换机或队列即可

复制`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类的`sendMessage3`方法，将方法名修改为`sendMessage4`并让指定的路由键不对

```java
@Test
public void sendMessage4(){
   for (int i = 0; i < 10; i++) {
      if (i%2==0) {
         //发送消息，如果发送的消息是个对象，我们会使用序列化机制，将对象写出去。对象必须实现Serializable
         OrderReturnReasonEntity entity = new OrderReturnReasonEntity();
         entity.setId(1L);
         entity.setCreateTime(new Date());
         entity.setName("啊啊啊-->" + i);
         //rabbitTemplate.send();
         //convertAndSend(String exchange, String routingKey, final Object object)
         rabbitTemplate.convertAndSend("hello-java-exchange", "hello.java", entity);
         log.info("消息发送完成{}", entity);
      }else {
         OrderEntity entity = new OrderEntity();
         entity.setOrderSn(UUID.randomUUID().toString());
         rabbitTemplate.convertAndSend("hello-java-exchange", "hello.javxxxxa", entity);
         log.info("消息发送完成{}", entity);
      }
   }
}
```

![image-20220812101848150](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.2.4.png)

执行`sendMessage4`测试方法，查看`gulimall-order`模块的控制台即可看到，此时就执行了`消息从交换机抵达队列失败的回调`

```bash
message = (Body:'{"id":null,"memberId":null,"orderSn":"9e4b4e95-4ed3-4ce5-a384-85ce2ee6bdc5","couponId":null,"createTime":null,"memberUsername":null,"totalAmount":null,"payAmount":null,"freightAmount":null,"promotionAmount":null,"integrationAmount":null,"couponAmount":null,"discountAmount":null,"payType":null,"sourceType":null,"status":null,"deliveryCompany":null,"deliverySn":null,"autoConfirmDay":null,"integration":null,"growth":null,"billType":null,"billHeader":null,"billContent":null,"billReceiverPhone":null,"billReceiverEmail":null,"receiverName":null,"receiverPhone":null,"receiverPostCode":null,"receiverProvince":null,"receiverCity":null,"receiverRegion":null,"receiverDetailAddress":null,"note":null,"confirmStatus":null,"deleteStatus":null,"useIntegration":null,"paymentTime":null,"deliveryTime":null,"receiveTime":null,"commentTime":null,"modifyTime":null}' MessageProperties [headers={__TypeId__=com.atguigu.gulimall.order.entity.OrderEntity}, contentType=application/json, contentEncoding=UTF-8, contentLength=0, receivedDeliveryMode=PERSISTENT, priority=0, deliveryTag=0]), replyCode = 312, replyText = NO_ROUTE, exchange = hello-java-exchange, routingKey = hello.javxxxxa
```

![image-20220812102033532](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.2.5.png)

##### 3、默认的Ack消息确认机制

消费者获取到消息，成功处理，可以回复Ack给Broker

- basic.ack用于肯定确认；broker将移除此消息

- basic.nack用于否定确认；可以指定broker是否丢弃此消息，可以批量

- basic.reject用于否定确认；同上，但不能批量

默认自动ack，消息被消费者收到，就会从broker的queue中移除

queue无消费者，消息依然会被存储，直到消费者消费

消费者收到消息，默认会自动ack。但是如果无法确定此消息是否被处理完成， 或者成功处理。我们可以开启手动ack模式

- 消息处理成功，ack()，接受下一个消息，此消息broker就会移除

- 消息处理失败，nack()/reject()，重新发送给其他人进行处理，或者容错处理后ack

- 消息一直没有调用ack/nack方法，broker认为此消息正在被处理，不会投递给别人，此时客户端断开，消息不会被broker移除，会投递给别人

先取消注释`gulimall-order`模块`com.atguigu.gulimall.order.test.ReceiveMessage2`类的方法

![image-20220812103905178](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.3.1.png)

先启动`GulimallOrderApplication`服务，让其把`hello-java-queue`里的消息都处理完，再停止`GulimallOrderApplication`服务，再注释掉`com.atguigu.gulimall.order.test.ReceiveMessage2`类的方法，再运行测试类的`sendMessage4`方法，保证`hello-java-queue`里有`5`条消息

![image-20220812104606169](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.3.2.png)

再打开`com.atguigu.gulimall.order.test.ReceiveMessage2`类的方法，并在`receiveMessage1`方法的`System.out.println("OrderReturnReasonEntity类消息处理完成：" + entity.getName());`这一行打上断点

![image-20220812110139116](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.3.3.png)

以`debug`方式启动`GulimallOrderApplication`服务，可以看到如果服务停机，队列里的消息直接清零了，这是`IDEA`的问题，点击`IDEA`的`Stop`不会强制停止服务，而是等程序处理完才停止（类似于调用`tomcat`的`shutdown.bat`程序，而不是直接关闭`startup.bat`窗口。即告诉程序要将其关闭了，这个程序接送到关闭指令后可以选择不理会或者把剩余的事情做完后再关闭，而不是直接杀死进程。类似于电脑关机，点击关机后如果文件没保存这不会关机成功，如果文件都保存则自己会执行关闭指令，而并非直接拔掉电源）

![GIF 2022-8-12 10-59-54](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.3.4.gif)

使用上面的方法，再次让`hello-java-queue`里有`5`条消息

然后再以`debug`方式启动`GulimallOrderApplication`服务，可以看到放行一个后队列里减少了一个，然后直接强行杀死`java.exe`进程，此时队列里的消息还是`4`个，这样就不会变到`0`了

```
taskkill /f /t /im java.exe
```

可以看到即使服务宕机，消息也不会丢失

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.3.5.gif" alt="GIF 2022-8-12 15-14-00" style="zoom:67%;" />



##### 4、手动确认消息

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置，将自动回复模式调为手动模式

```properties
#将自动回复模式调为手动模式 (默认auto:自动回复)
spring.rabbitmq.listener.simple.acknowledge-mode=manual
```

![image-20220812110817884](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.1.png)

注释掉`com.atguigu.gulimall.order.test.ReceiveMessage2`类的方法，再运行测试类的`sendMessage4`方法，保证`hello-java-queue`里有`5`条消息，再打开`com.atguigu.gulimall.order.test.ReceiveMessage2`类的方法，并在`receiveMessage1`方法的`System.out.println("OrderReturnReasonEntity类消息处理完成：" + entity.getName());`这一行打上断点，以`debug`方式启动`GulimallOrderApplication`服务，

可以看到，只要不手动签收，消息就不会减少，服务停掉后，消息状态由`Unacked`变为了`Ready`

![GIF 2022-8-12 11-34-52](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.2.gif)



修改`gulimall-order`模块的`com.atguigu.gulimall.order.test.ReceiveMessage2`类的`receiveMessage1`方法，调用`channel.basicAck(deliveryTag,false);`手动确认消息

```java
@RabbitHandler
public void receiveMessage1(Message message, OrderReturnReasonEntity entity, Channel channel){
    System.out.println("OrderReturnReasonEntity类消息处理完成：" + entity.getName());
    //channel信道内按顺序自增
    long deliveryTag = message.getMessageProperties().getDeliveryTag();
    try {
        //签收货物
        //basicAck(long deliveryTag, boolean multiple是否批量确认收货，如果为false只签收当前消息)
        channel.basicAck(deliveryTag,false);
        System.out.println("签收了第"+deliveryTag+"个货物");
    }catch (Exception e){
        //网络中断，签收失败
        e.printStackTrace();
    }
}
```

![image-20220812152209945](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.3.png)

再次以`debug`方式启动`GulimallOrderApplication`服务，此时手动确认后消息就会减少了

![GIF 2022-8-12 15-20-07](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.4.gif)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.test.ReceiveMessage2`类的`receiveMessage1`方法，这次让`deliveryTag`为偶数的签收，`deliveryTag`为奇数的拒收

```java
@RabbitHandler
public void receiveMessage1(Message message, OrderReturnReasonEntity entity, Channel channel) throws IOException {
    System.out.println("OrderReturnReasonEntity类消息处理完成：" + entity.getName());
    //channel信道内按顺序自增
    long deliveryTag = message.getMessageProperties().getDeliveryTag();
    if (deliveryTag % 2 == 0) {
        //签收消息
        //basicAck(long deliveryTag, boolean multiple是否批量确认收货，如果为false只签收当前消息)
        channel.basicAck(deliveryTag, false);
        System.out.println("签收了第" + deliveryTag + "个货物");
    } else {
        //拒收消息
        //requeue=false丢弃消息 requeue=true 消息发回服务器，服务器重新入队。
        //basicReject(long deliveryTag, boolean requeue)
        //channel.basicReject();

        //basicNack(long deliveryTag, boolean multiple, boolean requeue)
        channel.basicNack(deliveryTag, false, true);
        System.out.println("拒签了第"+deliveryTag+"个货物");
    }

}
```

![image-20220812155137808](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.5.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplicationTests`测试类,添加`sendMessage5`方法，重新让`hello-java-queue`里有`5`条消息

```java
@Test
public void sendMessage5() {
    for (int i = 1; i <= 5; i++) {
        String uuid = UUID.randomUUID().toString();
        //发送消息，如果发送的消息是个对象，我们会使用序列化机制，将对象写出去。对象必须实现Serializable
        OrderReturnReasonEntity entity = new OrderReturnReasonEntity();
        entity.setId(1L);
        entity.setCreateTime(new Date());
        entity.setName("发送第【" + i + "】个货物");
        //rabbitTemplate.send();
        //convertAndSend(String exchange, String routingKey, final Object object)
        rabbitTemplate.convertAndSend("hello-java-exchange", "hello.java", entity, new CorrelationData(uuid));
        log.info("消息发送完成{}", entity);

    }
}
```

![image-20220812154759677](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.6.png)

查看`gulimall-order`模块的控制台，可以看到拒绝签收的货物会重新入队

```
OrderReturnReasonEntity类消息处理完成：发送第【1】个货物
拒签了第1个货物
OrderReturnReasonEntity类消息处理完成：发送第【2】个货物
签收了第2个货物
OrderReturnReasonEntity类消息处理完成：发送第【3】个货物
拒签了第3个货物
OrderReturnReasonEntity类消息处理完成：发送第【4】个货物
签收了第4个货物
OrderReturnReasonEntity类消息处理完成：发送第【5】个货物
拒签了第5个货物
OrderReturnReasonEntity类消息处理完成：发送第【1】个货物
签收了第6个货物
OrderReturnReasonEntity类消息处理完成：发送第【3】个货物
拒签了第7个货物
OrderReturnReasonEntity类消息处理完成：发送第【5】个货物
签收了第8个货物
OrderReturnReasonEntity类消息处理完成：发送第【3】个货物
拒签了第9个货物
OrderReturnReasonEntity类消息处理完成：发送第【3】个货物
签收了第10个货物
```

![image-20220812155056526](https://gitlab.com/apzs/image/-/raw/master/image/5.8.2.6.4.7.png)



### 5.8.3、基本页面准备

#### 1、添加文件

##### 1、添加购物车详情页

在`linux`虚拟机里的`/mydata/nginx/html/static`目录下新建`order`目录，在`/mydata/nginx/html/static/order`目录下新建`detail`目录，将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\等待付款`里的文件夹全部复制到linux虚拟机里的`/mydata/nginx/html/static/order/detail`目录下（不包括`index.html`）

![GIF 2022-8-12 16-11-02](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.1.1.gif)

在`gulimall-order`模块的`src/main/resources`新建`templates`文件夹，将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\等待付款`里的`index.html`复制到`src/main/resources/templates`里面，并将刚刚粘贴的`index.html`重命名为`detail.html`（我图片上的名字写错了，文件名应该是`detail.html`）

![image-20220812161433035](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.1.2.png)

##### 2、添加全部订单页

在`linux`虚拟机里的`/mydata/nginx/html/static/order`目录下新建`list`目录，将`\2.分布式高级篇（微服务架构篇）\资料源码\代码\html\订单页`里的文件夹全部复制到linux虚拟机里的`/mydata/nginx/html/static/order/list`目录下（不包括`index.html`）

![GIF 2022-8-12 16-15-50](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.2.1.gif)

将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\订单页`里的`index.html`复制到`src/main/resources/templates`里面，并将刚刚粘贴的`index.html`重命名为`list.html`

![image-20220812161724334](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.2.2.png)

##### 3、添加确认支付页

在`linux`虚拟机里的`/mydata/nginx/html/static/order`目录下新建`confirm`目录，将`\2.分布式高级篇（微服务架构篇）\资料源码\代码\html\结算页`里的文件夹全部复制到linux虚拟机里的`/mydata/nginx/html/static/order/confirm`目录下（不包括`index.html`）

![GIF 2022-8-12 16-18-40](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.3.1.gif)

将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\结算页`里的`index.html`复制到`src/main/resources/templates`里面，并将刚刚粘贴的`index.html`重命名为`confirm.html`

![image-20220812161915481](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.3.2.png)

##### 4、添加支付页

在`linux`虚拟机里的`/mydata/nginx/html/static/order`目录下新建`pay`目录，将`\2.分布式高级篇（微服务架构篇）\资料源码\代码\html\收银页`里的文件夹全部复制到linux虚拟机里的`/mydata/nginx/html/static/order/pay`目录下（不包括`index.html`）

![GIF 2022-8-12 16-20-33](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.4.1.gif)

将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\收银页`里的`index.html`复制到`src/main/resources/templates`里面，并将刚刚粘贴的`index.html`重命名为`pay.html`

![image-20220812162123877](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.1.4.2.png)

#### 2、修改配置

##### 1、添加域名

在`hosts`文件里添加`order.gulimall.com`域名

![image-20220812162316152](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.1.png)

##### 2、负载均衡到订单模块

在`gulimall-gateway`网关模块的`src/main/resources/application.yml`配置文件里添加如下配置，负载均衡到订单模块

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: gulimall_order_route
          uri: lb://gulimall-order
          predicates:
            - Host=order.gulimall.com
```

![image-20220812162541964](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.2.png)

##### 3、修改页面

修改`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件，将`src="`全部替换为`src="/static/order/confirm/`，将`href="`全部替换为`href="/static/order/confirm/`

 [点击查看完整代码](code/5.8.3.2.3.1.html)

```bash
src="
src="/static/order/confirm/

href="
href="/static/order/confirm/
```

![image-20220812164331436](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.3.1.png)

修改`gulimall-order`模块的`src/main/resources/templates/detail.html`文件（我图片上的名字写错了，文件名应该是`detail.html`），将`href="`全部替换为`href="/static/order/detail/`，将`src="`全部替换为`src="/static/order/detail/` 

 [点击查看完整代码](code/5.8.3.2.3.2.html)

```bash
href="
href="/static/order/detail/

src="
src="/static/order/detail/
```

![image-20220812164336185](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.3.2.png)

修改`gulimall-order`模块的`src/main/resources/templates/list.html`文件，将`href="`全部替换为`href="/static/order/list/`，将`src="`全部替换为`src="/static/order/list/`

 [点击查看完整代码](code/5.8.3.2.3.3.html)

```bash
href="
href="/static/order/list/

src="
src="/static/order/list/
```

![image-20220812164341946](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.3.3.png)

修改`gulimall-order`模块的`src/main/resources/templates/pay.html`文件，将`href="`全部替换为`href="/static/order/pay/`，将`src="`全部替换为`src="/static/order/pay/`

 [点击查看完整代码](code/5.8.3.2.3.4.html)

```bash
href="
href="/static/order/pay/

src="
src="/static/order/pay/
```

![image-20220812164347258](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.3.4.png)

后面发现`detail.html`名字写错了，重新将`gulimall-order`模块的`src/main/resources/templates`文件夹里面的`deatil.html`改名为`detail.html`

![image-20220812164454741](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.2.3.5.png)

#### 3、添加配置

##### 1、引入`thymeleaf`

在`gulimall-order`模块的`com.atguigu.gulimall.order`包下新建`web`文件夹，在`web`文件夹下新建`HelloController`类，用于跳转到对应的页面

```java
package com.atguigu.gulimall.order.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author 无名氏
 * @date 2022/8/12
 * @Description:
 */
@Controller
public class HelloController {

    @GetMapping("/{page}.html")
    public String listPage(@PathVariable("page") String page){

        return page;
    }
}
```

![image-20220812165506126](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.1.1.png)

在`gulimall-order`模块的`pom.xml`文件中引入`thymeleaf`依赖

```xml
<!--模板引擎：thymeleaf-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

![image-20220812165445920](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.1.2.png)

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置，关闭`thymeleaf`缓存

```properties
spring.thymeleaf.cache=false
```

![image-20220812165545721](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.1.3.png)

##### 2、开启服务发现

在`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplication`启动类里添加如下注解，开启服务发现功能

```java
@EnableDiscoveryClient
```

![image-20220812165931686](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.1.png)

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置，配置服务发现的服务端地址

```properties
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
spring.application.name=gulimall-order
```

![image-20220812170213145](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.2.png)

启动`GulimallOrderApplication`服务和`GulimallGatewayApplication`服务

浏览器访问  http://order.gulimall.com/list.html 页面，可以看到已经成功显示了

![image-20220812170311899](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.3.png)

浏览器访问 http://order.gulimall.com/confirm.html 页面，只有顶部的显示了，很明显：下面的渲染失败了

![image-20220812170454565](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.4.png)

查看`gulimall-order`模块控制台，报了`未完成的块结构`的异常（其实就是只有`/*`没有`*/`的意思）

```java
java.io.IOException: Unfinished block structure <!--/*...*/-->
```

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`页面里搜索`/*`，把这个`/*`删掉

![image-20220812170533163](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.5.png)

重启`gulimall-order`模块，浏览器再次访问  http://order.gulimall.com/confirm.html  页面就可以发现访问成功了

![image-20220812170553926](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.6.png)

浏览器访问  http://order.gulimall.com/detail.html 页面，也成功显示了

![image-20220812170628021](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.7.png)

浏览器访问  http://order.gulimall.com/pay.html 页面，也成功显示了

![image-20220812170658598](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.2.8.png)

##### 3、引入Spring Session

在`gulimall-order`模块的`pom.xml`文件里引入`Spring Session`

```xml
<!--引入redis-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!--引入SpringSession-->
<dependency>
   <groupId>org.springframework.session</groupId>
   <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220812172537172](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.3.1.png)

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置，指定session存储用redis

```properties
#使用redis做session
spring.session.store-type=redis
```

![image-20220812172650505](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.3.2.png)

在`gulimall-order`模块的`src/main/resources/application.yml`配置文件里添加如下配置，配置redis的host

```yaml
spring:
  redis:
    host: 192.168.56.10
    port: 6379
```

![image-20220812172817257](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.3.3.png)

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.GulimallSessionConfig`，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.config`包下

![image-20220812172000032](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.3.4.png)

##### 4、添加线程池

再将`gulimall-product`模块的`com.atguigu.gulimall.product.config`包下的`MyThreadConfig.java`文件和`ThreadPollConfigProperties.java`文件复制一份，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.config`包下

![image-20220812172101394](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.4.1.png)

复制一份`gulimall-product`模块的`src/main/resources/application.properties`配置文件的线程池配置，粘贴到`gulimall-order`模块的`src/main/resources/application.properties`配置文件里

```properties
gulimall.thread.core-pool-size=20
gulimall.thread.maximum-pool-size=200
gulimall.thread.keep-alive-time=10
```

![image-20220812172156406](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.4.2.png)

##### 5、完善页面

在  http://gulimall.com/  页面里，打开控制台，定位到`我的订单`位置，复制`我的订单`

![image-20220812191803697](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.1.png)

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件夹搜索`我的订单`，将该文本对应的`<a>`标签的`href`的值修改为`http://order.gulimall.com/list.html`

```html
<a href="http://order.gulimall.com/list.html">我的订单</a>
```

![image-20220812192043294](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.2.png)

在  http://order.gulimall.com/detail.html  页面里，打开控制台，定位到`你好，请登录`位置，复制`你好`

![image-20220812193135848](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.3.png)

在`gulimall-order`模块的`src/main/resources/templates/detail.html`文件里，将`<html>`修改为`<html xmlns:th="http://www.thymeleaf.org">`，以引入`thymeleaf`

```html
<html xmlns:th="http://www.thymeleaf.org">
```

![image-20220812192725179](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.4.png)

然后在`detail.html`文件里搜索`你好`，修改周围的代码

```html
<li style="border: 0;">
   <a th:if="${session.loginUser!=null}">欢迎：[[${session.loginUser?.nickname}]]</a>
   <a href="http://auth.gulimall.com/login.html" th:if="${session.loginUser==null}">你好，请登录</a>
</li>
<li>
   <a href="http://auth.gulimall.com/reg.html" th:if="${session.loginUser==null}" style="color: red;">免费注册</a>
   |</li>
```

![image-20220812192920395](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.5.png)

在  http://order.gulimall.com/confirm.html  页面里，打开控制台，定位到`尚硅谷`位置，复制`尚硅谷`

![image-20220812193505560](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.6.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里，将`<html>`修改为`<html xmlns:th="http://www.thymeleaf.org">`，以引入`thymeleaf`

```html
<html xmlns:th="http://www.thymeleaf.org">
```

![image-20220812193628352](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.7.png)

然后在`confirm.html`文件里搜索`尚硅谷`，将`尚硅谷`替换为用户的昵称

```html
<li><!--尚硅谷-->[[${session.loginUser?.nickname}]]<img src="/static/order/confirm/img/03.png" style="margin-bottom: 0px;margin-left3: 3px;" /><img src="/static/order/confirm/img/06.png" /></li>
```

![image-20220812193546229](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.8.png)

在  http://order.gulimall.com/pay.html  页面里，打开控制台，定位到`尚硅谷`位置，复制`尚硅谷`

![image-20220812193742730](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.9.png)

在`gulimall-order`模块的`src/main/resources/templates/pay.html`文件里，将`<html>`修改为`<html xmlns:th="http://www.thymeleaf.org">`，以引入`thymeleaf`

```html
<html xmlns:th="http://www.thymeleaf.org">
```

![image-20220812193819825](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.10.png)

然后在`pay.html`文件里搜索`尚硅谷`，将`尚硅谷`替换为用户的昵称

```html
<li><span><!--尚硅谷-->[[${session.loginUser?.nickname}]]</span><span>退出</span></li>
```

![image-20220812193900964](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.11.png)

重启`gulimall-order`模块和`gulimall-product`模块，浏览器打开以下页面，可以发现都可以正常访问

```
http://order.gulimall.com/list.html
http://order.gulimall.com/pay.html
http://order.gulimall.com/detail.html
http://order.gulimall.com/confirm.html
```

![GIF 2022-8-12 19-43-25](https://gitlab.com/apzs/image/-/raw/master/image/5.8.3.3.5.12.gif)

# 六、订单

## 6.1、订单模块

### 6.1.1、编写基本功能

#### 1、基本功能

##### 1、订单中心

电商系统涉及到 3 流，分别时信息流，资金流，物流，而订单系统作为中枢将三者有机的集合起来。
用户信息包括用户账号、用户等级、用户的收货地址、收货人、收货人电话等组成，用户账户需要绑定手机号码，但是用户绑定的手机号码不一定是收货信息上的电话。用户可以添加多个收货信息，用户等级信息可以用来和促销系统进行匹配，获取商品折扣，同时用户等级还可以获取积分的奖励等
**2、订单基础信息订单基础信息是订单流转的核心，其包括订单类型、父/子订单、订单编号、订单状态、订单流转的时间等。**
（1）订单类型包括实体商品订单和虚拟订单商品等，这个根据商城商品和服务类型进行区分。（2）同时订单都需要做父子订单处理，之前在初创公司一直只有一个订单，没有做父子订单处理后期需要进行拆单的时候就比较麻烦，尤其是多商户商场，和不同仓库商品的时候，父子订单就是为后期做拆单准备的。
（3）订单编号不多说了，需要强调的一点是父子订单都需要有订单编号，需要完善的时候可以对订单编号的每个字段进行统一定义和诠释。
（4）订单状态记录订单每次流转过程，后面会对订单状态进行单独的说明。
（5）订单流转时间需要记录下单时间，支付时间，发货时间，结束时间/关闭时间等等
**3、商品信息商品信息从商品库中获取商品的 SKU 信息、图片、名称、属性规格、商品单价、商户信息等，从用户下单行为记录的用户下单数量，商品合计价格等。**
**4.优惠信息优惠信息记录用户参与的优惠活动，包括优惠促销活动，比如满减、满赠、秒杀等，用户使用的优惠券信息，优惠券满足条件的优惠券需要默认展示出来，具体方式已在之前的优惠券篇章做过详细介绍，另外还虚拟币抵扣信息等进行记录。**
为什么把优惠信息单独拿出来而不放在支付信息里面呢？因为优惠信息只是记录用户使用的条目，而支付信息需要加入数据进行计算，所以做为区分。
**5.支付信息**
（1）支付流水单号，这个流水单号是在唤起网关支付后支付通道返回给电商业务平台的支付流水号，财务通过订单号和流水单号与支付通道进行对账使用。
（2）支付方式用户使用的支付方式，比如微信支付、支付宝支付、钱包支付、快捷支付等。
支付方式有时候可能有两个——余额支付+第三方支付。
（3）商品总金额，每个商品加总后的金额；运费，物流产生的费用；优惠总金额，包括促销活动的优惠金额，优惠券优惠金额，虚拟积分或者虚拟币抵扣的金额，会员折扣的金额等之和；实付金额，用户实际需要付款的金额。
用户实付金额=商品总金额+运费-优惠总金额

**6.物流信息物流信息包括配送方式，物流公司，物流单号，物流状态，物流状态可以通过第三方接口来获取和向用户展示物流每个状态节点。**

##### 2、订单状态

1. 待付款
用户提交订单后，订单进行预下单，目前主流电商网站都会唤起支付，便于用户快速完成支付，需要注意的是待付款状态下可以对库存进行锁定，锁定库存需要配置支付超时时间，超时后将自动取消订单，订单变更关闭状态。
2. 已付款/待发货
用户完成订单支付，订单系统需要记录支付时间，支付流水单号便于对账，订单下放到 WMS系统，仓库进行调拨，配货，分拣，出库等操作。
3. 待收货/已发货
仓储将商品出库后，订单进入物流环节，订单系统需要同步物流信息，便于用户实时知悉物品物流状态
4. 已完成
用户确认收货后，订单交易完成。后续支付侧进行结算，如果订单存在问题进入售后状态
5. 已取消
付款之前取消订单。包括超时未付款或用户商户取消订单都会产生这种订单状态。
6. 售后中
用户在付款后申请退款，或商家发货后用户申请退换货。售后也同样存在各种状态，当发起售后申请后生成售后订单，售后订单状态为待审核，等待商家审核，商家审核通过后订单状态变更为待退货，等待用户将商品寄回，商家收货后订单状态更新为待退款状态，退款到用户原账户后订单状态更新为售后成功。

售后也同样存在各种状态，当发起售后申请后生成售后订单，售后订单状态为待审核，等待 商家审核，商家审核通过后订单状态变更为待退货，等待用户将商品寄回，商家收货后订单 状态更新为待退款状态，退款到用户原账户后订单状态更新为售后成功。

![image-20220812200227632](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.1.2.png)



##### 3、订单流程 

订单流程是指从订单产生到完成整个流转的过程，从而行程了一套标准流程规则。而不同的 产品类型或业务类型在系统中的流程会千差万别，比如上面提到的线上实物订单和虚拟订单 的流程，线上实物订单与 O2O 订单等，所以需要根据不同的类型进行构建订单流程。 不管类型如何订单都包括正向流程和逆向流程，对应的场景就是购买商品和退换货流程，正 向流程就是一个正常的网购步骤：

订单生成–>支付订单–>卖家发货–>确认收货–>交易成功。 而每个步骤的背后，订单是如何在多系统之间交互流转的，可概括如下图

![电商订单流程图](https://gitlab.com/apzs/image/-/raw/master/image/电商订单流程图.png)

#### 2、去结算

##### 1、修改页面

在 http://cart.gulimall.com/cart.html 页面里， 打开控制台，定位到`去结算`位置，复制`去结算`

![image-20220812201404756](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.1.1.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`配置文件里搜`去结算`，会发现`去结算` 会调用 `toTrade()`

![image-20220812201534509](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.1.2.png)

在`gulimall-cart`模块的`src/main/resources/templates/cartList.html`的`<script>`标签里添加`toTrade`方法，让其跳转到`http://order.gulimall.com/toTrade`页面

```java
function toTrade() {
   window.location.href = "http://order.gulimall.com/toTrade";
}
```

![image-20220812201618445](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.1.3.png)

##### 2、添加拦截器等配置

在`gulimall-order`模块的`com.atguigu.gulimall.order.web`包下，新建`OrderWebController`类，添加`toTrade`方法，将`/toTrade`请求返回`confirm.html`页面

```java
package com.atguigu.gulimall.order.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author 无名氏
 * @date 2022/8/12
 * @Description:
 */
@Controller
public class OrderWebController {

    @GetMapping("/toTrade")
    public String toTrade(){

        return "confirm";
    }
}
```

![image-20220812202237450](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.1.png)

修改`gulimall-auth-server`模块的`com.atguigu.gulimall.auth.controller.LoginController`类的`login`方法

如果登录成功会在`redis`里放一个`MemberEntityTo`

```java
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

![image-20220812204045816](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order`包下新建`interceptor`文件夹，在`interceptor`文件夹里添加`LoginUserInterceptor`类。如果登录了，就把`MemberEntityTo`放到`ThreadLocal`里

```java
package com.atguigu.gulimall.order.interceptor;

import com.atguigu.common.constant.auth.AuthServerConstant;
import com.atguigu.common.to.MemberEntityTo;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author 无名氏
 * @date 2022/8/12
 * @Description: 添加拦截器
 */
@Component
public class LoginUserInterceptor implements HandlerInterceptor {

    public static ThreadLocal<MemberEntityTo> loginUser = new ThreadLocal<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object attribute = request.getSession().getAttribute(AuthServerConstant.LOGIN_USER);
        if (attribute!=null){
            MemberEntityTo memberEntityTo= (MemberEntityTo) attribute;
            loginUser.set(memberEntityTo);
            return true;
        }else {
            request.getSession().setAttribute("msg","请先进行登录");
            //没登陆就重定向到登录页面
            response.sendRedirect("http://auth.gulimall.com/login.html");
            return false;
        }
    }
}
```

![image-20220812214626533](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config`包下新建`OrderWebConfig`类，指定拦截器的拦截路径

```java
package com.atguigu.gulimall.order.config;

import com.atguigu.gulimall.order.interceptor.LoginUserInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 无名氏
 * @date 2022/8/12
 * @Description:
 */
@Configuration
public class OrderWebConfig implements WebMvcConfigurer {

    @Autowired
    LoginUserInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor).addPathPatterns("/**");
    }
}
```

![image-20220812205038706](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.4.png)

在`gulimall-auth-server`模块的`src/main/resources/templates/login.html`文件里的`<span>谷粒商城不会以任何理由要求您转账汇款，谨防诈骗。</span>`下面添加如下代码，如果用户未登录或登录失败了给与一些提示

```java
<br><span style="color: red"> [[${session?.msg}]]</span>
```

![image-20220812205455626](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.5.png)

重启`gulimall-auth-server`模块，在购物车页面  http://cart.gulimall.com/cart.html 里点击去结算，如果没有登录就会来到了登录页  http://auth.gulimall.com/login.html ，并会提示`请先进行登录`

![GIF 2022-8-12 20-55-33](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.6.gif)

登录成功后，就可以正常购买了

![GIF 2022-8-12 20-57-23](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.2.7.gif)

##### 3、确认订单

在`gulimall-order`模块的`com.atguigu.gulimall.order`包下新建`vo`文件夹，在`vo`文件夹下新建`OrderConfirmVo`类

[点击查看`OrderConfirmVo`类完整代码](code/6.1.1.2.3.OrderConfirmVo.java)

![image-20220812211512652](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.3.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.web.OrderWebController`类里修改`toTrade`方法

```java
@Autowired
OrderService orderService;

@GetMapping("/toTrade")
public String toTrade(Model model){
    OrderConfirmVo orderConfirmVo = orderService.confirmOrder();
    model.addAttribute("orderConfirmData",orderConfirmVo);
    //订单确认页
    return "confirm";
}
```

![image-20220812211850970](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.3.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里添加`confirmOrder`方法

```java
/**
 * 给订单确认页返回需要的数据
 * @return
 */
OrderConfirmVo confirmOrder();
```

![image-20220812211946621](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.3.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里实现`confirmOrder`方法

```java
@Override
public OrderConfirmVo confirmOrder() {
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    

    return orderConfirmVo;
}
```

![image-20220812212217746](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.3.4.png)

##### 4、获取用户地址

在`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberReceiveAddressController`类里添加`getAddress`方法

```java
@GetMapping("/{memberId}/address")
public List<MemberReceiveAddressEntity> getAddress(@PathVariable("memberId") Long memberId) {
    return memberReceiveAddressService.getAddress(memberId);
}
```

![image-20220812212920444](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.4.1.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.MemberReceiveAddressService`接口里添加`getAddress`方法

```java
/**
 * 获取会员的收货地址列表
 * @param memberId
 * @return
 */
List<MemberReceiveAddressEntity> getAddress(Long memberId);
```

![image-20220812213004224](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.4.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.service.impl.MemberReceiveAddressServiceImpl`类里实现`getAddress`方法

```java
@Override
public List<MemberReceiveAddressEntity> getAddress(Long memberId) {
    LambdaQueryWrapper<MemberReceiveAddressEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(MemberReceiveAddressEntity::getMemberId,memberId);
    return this.baseMapper.selectList(lambdaQueryWrapper);
}
```

![image-20220812213904292](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.4.3.png)

##### 5、开启远程调用

在`gulimall-order`模块的`com.atguigu.gulimall.order.GulimallOrderApplication`类上添加如下注解，用于开启远程调用

```java
@EnableFeignClients
```

![image-20220812212502236](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.5.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign.MemberFeignService`接口里添加`getAddress`方法

```java
@GetMapping("/member/memberreceiveaddress/{memberId}/address")
List<OrderConfirmVo.MemberAddressVo> getAddress(@PathVariable("memberId") Long memberId);
```

![image-20220812214426749](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.5.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里，修改`confirmOrder`方法

```java
@Override
public OrderConfirmVo confirmOrder() {
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();

    //1、远程查询所有的收货地址列表
    List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());
    orderConfirmVo.setAddress(address);

    //2、远程查询购物车所有选中的购物项

    return orderConfirmVo;
}
```

![image-20220812214942217](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.5.3.png)

##### 6、获取用户购物项

在`gulimall-cart`类的`com.atguigu.gulimall.cart.controller.CartController`类里，添加`getCurrentUserCartItems`方法

```java
@GetMapping("/currentUserCartItems")
public List<CartItemVo> getCurrentUserCartItems(){
    return cartService.getUserCartItems();
}
```

![image-20220812215229405](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.6.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.CartService`接口里添加`getUserCartItems`方法

```java
List<CartItemVo> getUserCartItems();
```

![image-20220812215300264](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.6.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里实现`getUserCartItems`方法

```java
@Override
public List<CartItemVo> getUserCartItems() {
    UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    if (userInfoTo == null) {
        return null;
    }else {
        String cartKey = CART_PREFIX + userInfoTo.getUserId();
        List<CartItemVo> cartItems = getCartItems(cartKey);
        if (cartItems!=null) {
            //获取所有被选中的购物项
            List<CartItemVo> collect = cartItems.stream().filter(CartItemVo::getCheck)
                    .map(item->{
                        //获取商品最新价格
                        //item.setPrice();
                        return item;
                    })
                    .collect(Collectors.toList());

            return null;
        }else {
            return null;
        }
    }
}
```

![image-20220815085149349](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.6.3.png)

##### 7、查询最新价格

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SkuInfoController`类里添加`getPrice`方法，用于查询商品最新价格

```java
/**
 * 实时查询商品价格
 * @param skuId
 * @return
 */
@GetMapping("/{skuId}/price")
public BigDecimal getPrice(@PathVariable("skuId") Long skuId){
    SkuInfoEntity skuInfoEntity = skuInfoService.getById(skuId);
    return skuInfoEntity.getPrice();
}
```

![image-20220815085712933](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.7.1.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.feign.ProductFeignService`接口里添加`getPrice`方法

```java
@GetMapping("/product/skuinfo/{skuId}/price")
public BigDecimal getPrice(@PathVariable("skuId") Long skuId);
```

![image-20220815085918556](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.7.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类里修改`getUserCartItems`方法

```java
@Override
public List<CartItemVo> getUserCartItems() {
    UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    if (userInfoTo == null) {
        return null;
    }else {
        String cartKey = CART_PREFIX + userInfoTo.getUserId();
        List<CartItemVo> cartItems = getCartItems(cartKey);
        if (cartItems!=null) {
            //获取所有被选中的购物项
            List<CartItemVo> collect = cartItems.stream().filter(CartItemVo::getCheck)
                    .map(item->{
                        //获取商品最新价格
                        BigDecimal price = productFeignService.getPrice(item.getSkuId());
                        item.setPrice(price);
                        return item;
                    })
                    .collect(Collectors.toList());

            return null;
        }else {
            return null;
        }
    }
}
```

![image-20220815090130557](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.7.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign`包下新建`CartFeignService`接口，用于调用购物车模块

```java
package com.atguigu.gulimall.order.feign;

import com.atguigu.gulimall.order.vo.OrderConfirmVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/15
 * @Description:
 */
@FeignClient("gulimall-cart")
public interface CartFeignService {

    @GetMapping("/currentUserCartItems")
    List<OrderConfirmVo.OrderItemVo> getCurrentUserCartItems();
}
```

![image-20220815090438769](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.7.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里修改`confirmOrder`方法

```java
@Override
public OrderConfirmVo confirmOrder() {
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();

    //1、远程查询所有的收货地址列表
    List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());
    orderConfirmVo.setAddress(address);
    //2、远程查询购物车所有选中的购物项
    List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();
    orderConfirmVo.setItems(items);
    //3、查询用户积分
    Integer integration = memberEntityTo.getIntegration();
    orderConfirmVo.setIntegration(integration);

    //orderConfirmVo.setIntegration(orderConfirmVo.getIntegration());
    orderConfirmVo.setPayPrice(orderConfirmVo.getPayPrice());
    orderConfirmVo.setTotal(orderConfirmVo.getTotal());
    //TODO 防重令牌

    return orderConfirmVo;
}
```

![image-20220815092345880](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.7.5.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类里修改`getPayPrice`方法和`getTotal`方法，添加`orderToken`字段

```java
public class OrderConfirmVo {
	...

    /**
     * 令牌，防止重复提交
     */
    @Getter @Setter
    String orderToken;

    public BigDecimal getTotal() {
        BigDecimal sum = new BigDecimal("0");
        if (!CollectionUtils.isEmpty(items)){
            for (OrderItemVo item : items) {
                BigDecimal bigDecimal = item.getPrice().multiply(new BigDecimal(item.getCount()));
                sum = sum.add(bigDecimal);
            }
        }
        return sum;
    }

    public BigDecimal getPayPrice() {
        return getTotal();
    }

  	...
}
```

[点击查看完整代码](code/6.1.1.2.7.java)

![image-20220815092524337](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.2.7.6.png)

#### 3、测试

##### 1、测试一

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法的`List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());`和`List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();`上打断点

启动`GulimallThirdPartyApplication`、`GulimallSearchApplication`、`GulimallGatewayApplication`、`GulimallProductApplication`、`GulimallAuthServerApplication`服务，以`debug`方式启动`GulimallOrderApplication`、`GulimallMemberApplication`、`GulimallCartApplication`服务

![image-20220815093312419](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.1.png)

登录后，在 http://gulimall.com/ 页面点击 我的购物车 -> 去结算，程序就会停到断点

![GIF 2022-8-15 9-58-48](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.2.gif)

切换到`IDEA`，此时断点停在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法的`List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());`上，此时已经获取到`7`号用户的基本信息了

![image-20220815100024111](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.3.png)

查看`gulimall_ums`数据库的`ums_member_receive_address`表，可以看到`7`号用户此时还没有收货地址

![image-20220815100035034](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.4.png)

在`gulimall_ums`数据库的`ums_member_receive_address`表里，随便给`member_id`为7的用户增加点信息

![image-20220815100303139](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.5.png)

再次切换到`IDEA`，点击`GulimallOrderApplication`服务的`Step Over`(步过)按钮，执行当前方法的下一个语句，报了`no-argument constructor`没有无参构造的错误

```bash
2022-08-15 10:04:23.391 ERROR 5340 --- [nio-9000-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is feign.codec.DecodeException: Error while extracting response for type [java.util.List<com.atguigu.gulimall.order.vo.OrderConfirmVo$MemberAddressVo>] and content type [application/json;charset=UTF-8]; nested exception is org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: Cannot construct instance of `com.atguigu.gulimall.order.vo.OrderConfirmVo$MemberAddressVo` (although at least one Creator exists): can only instantiate non-static inner class by using default, no-argument constructor; nested exception is com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot construct instance of `com.atguigu.gulimall.order.vo.OrderConfirmVo$MemberAddressVo` (although at least one Creator exists): can only instantiate non-static inner class by using default, no-argument constructor
 at [Source: (PushbackInputStream); line: 1, column: 3] (through reference chain: java.util.ArrayList[0])] with root cause

com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot construct instance of `com.atguigu.gulimall.order.vo.OrderConfirmVo$MemberAddressVo` (although at least one Creator exists): can only instantiate non-static inner class by using default, no-argument constructor
```

![image-20220815100956608](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.6.png)

给`MemberAddressVo`和`OrderItemVo`加上`static`即可，[点击查看完整代码](code/6.1.1.3.1.java)

给`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类的内部类`MemberAddressVo`加`static`修饰符

![image-20220815101140462](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.7.png)

给`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类的内部类`OrderItemVo`加`static`修饰符

![image-20220815101206887](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.1.8.png)

##### 2、测试二

重启`gulimall-order`模块，刷新`http://order.gulimall.com/toTrade`页面，再次来到了`List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());`这个断点

![image-20220815101452977](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.1.png)

再在`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`getUserCartItems`方法的第一行上打断点

![image-20220815101644535](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.2.png)

点击`GulimallCartApplication`服务`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点

点击两次该按钮，来到`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`getUserCartItems`方法的第一行

![image-20220815101824076](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.3.png)

点击`GulimallCartApplication`服务的`Step Over`(步过)按钮，执行完`UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();`获取用户登录状态的代码，此时`userId`却为空

![image-20220815101931081](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.4.png)

但是浏览器访问`http://cart.gulimall.com/cart.html`页面，可以看到明明是登录状态确获取不到

![image-20220815102740112](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.5.png)

再次点击`GulimallCartApplication`服务`8: Services`里的`Resume Program F9`按钮，准备跳转到下一处断点时就抛异常了

```
2022-08-15 10:20:40.489 ERROR 2368 --- [o-30000-exec-10] org.thymeleaf.TemplateEngine             : [THYMELEAF][http-nio-30000-exec-10] Exception processing template "currentUserCartItems": Error resolving template [currentUserCartItems], template might not exist or might not be accessible by any of the configured Template Resolvers
```

![image-20220815102142268](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.6.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`preHandle`方法的`HttpSession session = request.getSession();`这一行上打断点

![image-20220815102302578](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.7.png)

然后浏览器刷新`http://order.gulimall.com/toTrade`页面，切换到`IDEA`，点击2次`GulimallCartApplication`服务的`Step Over`(步过)按钮，跳转到`preHandle`方法的`if (userInfoTo == null) {`这一行，可以看到此时的member是空的，点击`8: Services`里的`Resume Program F9`按钮，让这个线程执行完

![image-20220815102449595](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.8.png)

切换到浏览器，刷新`http://cart.gulimall.com/cart.html`页面，可以看到请求头的`Cookie`里有`GULIMALL_JSESSIONID`

![image-20220815102939191](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.9.png)

可以看到页面访问时一切是正常的，这些信息都能获取到，然后一直点击`Resume Program F9`按钮放行完这个请求

![image-20220815103121435](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.10.png)

页面也是能正常访问的

![image-20220815103040756](https://gitlab.com/apzs/image/-/raw/master/image/6.1.1.3.2.11.png)

### 6.1.2、Feign丢失请求头

#### 1、Feign远程调用丢失请求头

##### 1、源码调试

打开浏览器，刷新`http://order.gulimall.com/toTrade`页面

一直放行到`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法的`List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();`这一行，可以看到这个`cartFeignService`是一个代理对象，step into进来

![image-20220815103648180](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.1.png)

首先判断是不是`equals`、`hashCode`、`toString`方法，如果不是则执行`dispatch.get(method).invoke(args);`

点击`Step Over`直到最后一行

```java
@Override
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
  if ("equals".equals(method.getName())) {
    try {
      Object otherHandler =
          args.length > 0 && args[0] != null ? Proxy.getInvocationHandler(args[0]) : null;
      return equals(otherHandler);
    } catch (IllegalArgumentException e) {
      return false;
    }
  } else if ("hashCode".equals(method.getName())) {
    return hashCode();
  } else if ("toString".equals(method.getName())) {
    return toString();
  }

  return dispatch.get(method).invoke(args);
}
```

![image-20220815103949094](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.2.png)

再点击`Step Into`，选择`invoke`，一般调用`invoke`方法就开始准备执行核心方法了

![image-20220815104251012](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.3.png)

没有传参，所以`argv`为`null`，先拿到一个克隆的重试器`Retryer`

```java
@Override
public Object invoke(Object[] argv) throws Throwable {
  RequestTemplate template = buildTemplateFromArgs.create(argv);
  Retryer retryer = this.retryer.clone();
  while (true) {
    try {
      return executeAndDecode(template);
    } catch (RetryableException e) {
      try {
        retryer.continueOrPropagate(e);
      } catch (RetryableException th) {
        Throwable cause = th.getCause();
        if (propagationPolicy == UNWRAP && cause != null) {
          throw cause;
        } else {
          throw th;
        }
      }
      if (logLevel != Logger.Level.NONE) {
        logger.logRetry(metadata.configKey(), logLevel);
      }
      continue;
    }
  }
}
```

![image-20220815104425072](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.4.png)

运行到这里，`executeAndDecode(template);`这里才是真正的执行，点击`Step Into`

![image-20220815104643073](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.5.png)

先准备一个请求的模板，指定了请求的path

```java
Object executeAndDecode(RequestTemplate template) throws Throwable {
  Request request = targetRequest(template);

  if (logLevel != Logger.Level.NONE) {
    logger.logRequest(metadata.configKey(), logLevel, request);
  }

  Response response;
  long start = System.nanoTime();
  try {
    response = client.execute(request, options);
  } catch (IOException e) {
    if (logLevel != Logger.Level.NONE) {
      logger.logIOException(metadata.configKey(), logLevel, e, elapsedTime(start));
    }
    throw errorExecuting(request, e);
  }
  ......
```

![image-20220815104920247](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.6.png)

先得到当前请求`Request request = targetRequest(template);`，然后利用客户端去执行`client.execute(request, options);`

在`Request request = targetRequest(template);`这一行，点击`Step Into`看怎么得到的请求

![image-20220815105446852](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.7.png)

feign在远程调用之前要构造请求，拿到所有的request拦截器`for(RequestInterceptor interceptor : requestInterceptors)`，然后调用各拦截器的`apply`方法。但是我们这里没有拦截器，所以`feign`没有什么功能要增强的，所以将原生的`RequestTemplate`给传递过来，但此时的`template`的`queries`（请求参数），`headers`(请求头)都为`0`个，问题就出现在这了，参数的确为`0`。但是请求头里应该有`cookie`啊，请求头至少也需要有一个`cookie`啊

```java
Request targetRequest(RequestTemplate template) {
  for (RequestInterceptor interceptor : requestInterceptors) {
    interceptor.apply(template);
  }
  return target.apply(template);
}
```

![image-20220815110200487](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.8.png)

Feign远程调用丢失请求头问题可以用下图描述

![image-20220815112127127](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.9.png)

解决办法如下图描述

![image-20220815112057069](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.1.10.png)



##### 2、查看该拦截器

由于使用feign进行远程调用时会重新创建一个新的request，所以请求头丢失了，但feign在进行远程调用之前会遍历所有的`RequestInterceptor`，调用其`apply`方法，因此我们可以实现`feign.RequestInterceptor`接口，将`cookie`添加到该request的请求头中即可

```java
public interface RequestInterceptor {

  /**
   * Called for every request. Add data using methods on the supplied {@link RequestTemplate}.
   */
  void apply(RequestTemplate template);
}
```

![image-20220815112231555](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.1.png)

回到`feign.SynchronousMethodHandler`类，可以看到`SynchronousMethodHandler`的构造器里会得到所有的`request`拦截器，按`ctrl`点击这个构造器，看看哪个类使用了该构造器

![image-20220815112624676](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.2.png)

可以看到这个`feign.SynchronousMethodHandler`类的内部类`Factory`的`create`方法返回`MethodHandler`类型，`SynchronousMethodHandler`类实现了`MethodHandler`接口（这个`MethodHandler`也需要`requestInterceptors`）

[点击查看SynchronousMethodHandler类完整代码](code/6.1.2.2.java)

![image-20220815113100186](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.3.png)

点击最开始的`feign.ReflectiveFeign`类继承的`Feign`类

![image-20221230153804613](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.4.png)

在`Feign`抽象类里调用的`SynchronousMethodHandler`对象的`Factory`方法的参数中也需要`requestInterceptors`

```java
  public Feign build() {
    SynchronousMethodHandler.Factory synchronousMethodHandlerFactory =
        new SynchronousMethodHandler.Factory(client, retryer, requestInterceptors, logger,
            logLevel, decode404, closeAfterDecode, propagationPolicy);
    ParseHandlersByName handlersByName =
        new ParseHandlersByName(contract, options, encoder, decoder, queryMapEncoder,
            errorDecoder, synchronousMethodHandlerFactory);
    return new ReflectiveFeign(handlersByName, invocationHandlerFactory, queryMapEncoder);
  }
}
```

![image-20220815113342137](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.5.png)

而这个拦截器默认是空的，相当于什么都没有

```java
private final List<RequestInterceptor> requestInterceptors =
    new ArrayList<RequestInterceptor>();
```

![image-20220815113431801](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.6.png)

但是容器中只有一个`RequestInterceptor`，就会将这个`requestInterceptor`给我们添进来。

如果容器中有多个，就会清空`this.requestInterceptors`，然后将这些都添加进`this.requestInterceptors`里

```java
/**
 * Adds a single request interceptor to the builder.
 */
public Builder requestInterceptor(RequestInterceptor requestInterceptor) {
  this.requestInterceptors.add(requestInterceptor);
  return this;
}

/**
 * Sets the full set of request interceptors for the builder, overwriting any previous
 * interceptors.
 */
public Builder requestInterceptors(Iterable<RequestInterceptor> requestInterceptors) {
  this.requestInterceptors.clear();
  for (RequestInterceptor requestInterceptor : requestInterceptors) {
    this.requestInterceptors.add(requestInterceptor);
  }
  return this;
}
```

![image-20220815113625087](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.2.7.png)

##### 3、添加拦截器

在`gulimall-order`模块的`com.atguigu.gulimall.order.config`包里新建`GuliFeignConfig`类

```java
package com.atguigu.gulimall.order.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 无名氏
 * @date 2022/8/15
 * @Description:
 */
@Configuration
public class GuliFeignConfig {

    @Bean("requestInterceptor")
    public RequestInterceptor requestInterceptor(){
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {
                System.out.println("feign远程之前先进行RequestInterceptor.apply");
            }
        };
    }

}
```

![image-20220815114245481](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.3.1.png)

要想在拦截器里获取之前的`request`请求，我们可以在`Controller`里添加`HttpServletRequest httpServletRequest`参数，然后使用`ThreadLocal`共享数据，不过`Spring`团队已经考虑到我们可能需要经常获取这些数据了，已经封装了一个工具类叫`RequestContextHolder`（可以看到`Spring`团队也是用的`ThreadLocal`）

```java
private static final ThreadLocal<RequestAttributes> requestAttributesHolder =
      new NamedThreadLocal<>("Request attributes");

private static final ThreadLocal<RequestAttributes> inheritableRequestAttributesHolder =
      new NamedInheritableThreadLocal<>("Request context");
```

![image-20220815114942463](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.3.2.png)

`ServletRequestAttributes`继承了`AbstractRequestAttributes`

![image-20220815115338645](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.3.3.png)

`AbstractRequestAttributes`实现了`RequestAttributes`

![image-20220815115341469](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.3.4.png)

##### 4、测试

访问`http://order.gulimall.com/toTrade`请求时请求头会带上`Cookie`，不过`http://order.gulimall.com/toTrade`请求的`Cookie`好像少了`user-key`，这里应该有`user-key`的

![image-20220815152728942](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.GulimallSessionConfig`类上添加`@EnableRedisHttpSession`方法，开启Spring Session

```java
@EnableRedisHttpSession
```

![image-20220815153257907](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`postHandle`方法的`cookie.setPath("gulimall.com");`打上断点，在  http://cart.gulimall.com/cart.html  页面里清空`cookie`，然后刷新   http://cart.gulimall.com/cart.html   页面。可以发现设置错了，应该设置的是`domain`，而不是`path`

![GIF 2022-8-15 15-46-04](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.3.gif)

将`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`postHandle`方法里的`cookie.setPath("gulimall.com");`修改为`cookie.setDomain("gulimall.com");`

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
    if (!(handler instanceof HandlerMethod)){
        return;
    }
    UserInfoTo userInfoTo = threadLocal.get();
    if (!userInfoTo.isHasTempUserCookie()) {
        Cookie cookie = new Cookie(CartConstant.TEMP_USER_COOKIE_NAME, userInfoTo.getUserKey());
        cookie.setDomain("gulimall.com");
        cookie.setMaxAge(CartConstant.TEMP_USER_COOKIE_TIMEOUT);
        response.addCookie(cookie);
    }
    //删除ThreadLocal，防止线程复用，获取到别的用户信息
    threadLocal.remove();
}
```

![image-20220815154910128](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.4.png)

在  http://cart.gulimall.com/cart.html  页面里清空`cookie`，然后刷新   http://cart.gulimall.com/cart.html   页面。这次就可以发现`domain`已经设置上去了。放行该请求后，切换到 http://cart.gulimall.com/cart.html   页面，打开控制台，此时名为`user-key`的`cookie`的作用范围已经变为`.gulimall.com`(本域名及其子域名)了

![GIF 2022-8-15 15-50-27](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.5.gif)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.config.GuliFeignConfig`类的`requestInterceptor`方法，将`http://order.gulimall.com/toTrade`请求的请求头里的`Cookie`复制给为远程调用而构造的新请求，在`ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;`上打断点

```java
@Bean("requestInterceptor")
public RequestInterceptor requestInterceptor(){
    return new RequestInterceptor() {
        @Override
        public void apply(RequestTemplate template) {
            //拿到刚进来的这个请求(/toTrade)
            RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
            //ServletRequestAttributes extends AbstractRequestAttributes
            //AbstractRequestAttributes implements RequestAttributes
            ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;
            //原本的 /toTrade 请求
            HttpServletRequest request = attributes.getRequest();
            //同步请求头数据，主要是Cookie
            String cookie = request.getHeader("Cookie");
            //为远程调用而构造的新请求
            template.header("Cookie",cookie);
            //template.
        }
    };
}
```

![image-20220815152016121](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.6.png)

重新以`debug`方式启动`GulimallOrderApplication`服务和`GulimallCartApplication`服务

重新发送`http://order.gulimall.com/toTrade`请求，就来到这`List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());`，点击`Step Over F8`

![image-20220815152209316](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.7.png)

可以看到在`gulimall-order`模块配置的`com.atguigu.gulimall.order.config.GuliFeignConfig`拦截器就起作用了

![image-20220815152346370](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.8.png)

切换到浏览器的  http://cart.gulimall.com/cart.html  页面，可以看到此时带的cookie有`user-key`和`GULIMALL_JSESSIONID`

![image-20220815155214210](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.9.png)

点击`GulimallOrderApplication`服务的`Step Over`(步过)按钮，直到执行到`template.header("Cookie",cookie);`这一行，查看`cookie`可以看到`user-key`和`GULIMALL_JSESSIONID`都获取到了

```
user-key=1ae1d57c-cdde-4748-9ed8-384132ae47a9; GULIMALL_JSESSIONID=YjA2MGY4YjYtMTcwNi00MzdmLTg1MzItMzM0ZjRlMjBmNmRk
```

![image-20220815155307078](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.10.png)

再次点三次`Step Over F8`步过)按钮，此时就有请求头了，然后点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点

![image-20220815155513360](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.11.png)

此时就来到了`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法的`List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();`这，点击`8: Services`里的`Resume Program F9`按钮，跳转到下一处断点

![image-20220815155959475](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.12.png)

此时就来到了`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`preHandle`方法的`MemberEntityTo member = (MemberEntityTo) session.getAttribute(AuthServerConstant.LOGIN_USER);`这，点击`Step Over F8` (步过)按钮，此时`member`就不为`null`了

![image-20220815160153828](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.1.4.13.png)

#### 2、修改`confirmOrder`方法

##### 1、修改代码

修改`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法

```java
@Override
public OrderConfirmVo confirmOrder() {
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();

    CompletableFuture<Void> getAddressFuture = CompletableFuture.runAsync(() -> {
        //1、远程查询所有的收货地址列表
        List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());
        orderConfirmVo.setAddress(address);
    },executor);

    CompletableFuture<Void> cartFuture = CompletableFuture.runAsync(() -> {
        //2、远程查询购物车所有选中的购物项
        List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();
        orderConfirmVo.setItems(items);
    }, executor);
    //3、查询用户积分
    Integer integration = memberEntityTo.getIntegration();
    orderConfirmVo.setIntegration(integration);

    //orderConfirmVo.setIntegration(orderConfirmVo.getIntegration());
    orderConfirmVo.setPayPrice(orderConfirmVo.getPayPrice());
    orderConfirmVo.setTotal(orderConfirmVo.getTotal());
    //TODO 防重令牌

    CompletableFuture.allOf(getAddressFuture,cartFuture).get();
    return orderConfirmVo;
}
```

![image-20220815161330527](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.1.1.png)

`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法上声明抛出异常，`gulimall-order`模块的`com.atguigu.gulimall.order.web.OrderWebController`类的`toTrade`方法上声明抛出异常

![GIF 2022-8-15 16-13-55](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.1.2.gif)

##### 2、测试

在`GulimallOrderApplication`服务里，点击`View Breakpoints... Ctrl+ Shift+F8`取消所有断点(当然默认的`Java Exception Breakpoints`和`JavaScript Exception Breakpoints`不用管)

然后在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法的`CompletableFuture.allOf(getAddressFuture,cartFuture).get();`这一行打个断点

![image-20220815161955420](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.1.png)

在`GulimallCartApplication`服务里，点击`View Breakpoints... Ctrl+ Shift+F8`取消所有断点(当然默认的`Java Exception Breakpoints`和`JavaScript Exception Breakpoints`不用管)

然后在`gulimall-cart`模块的`com.atguigu.gulimall.cart.interceptor.CartInterceptor`类的`preHandle`方法的`HttpSession session = request.getSession();`这一行打个断点

![image-20220815162259671](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.2.png)

重新以`debug`方式启动`GulimallOrderApplication`服务和`GulimallCartApplication`服务

重新发送`http://order.gulimall.com/toTrade`请求，就来到了这，点击`Resume Program F9`跳到下一处断点，此时`GulimallOrderApplication`服务执行完了

![image-20220815162708166](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.3.png)

然后点击`GulimallCartApplication`服务，来到了空指针异常类，再点击`Resume Program F9`跳到下一处断点，此时`GulimallCartApplication`服务执行完了

![image-20220815162855683](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.4.png)

再点击`GulimallOrderApplication`服务，此时就报了空指针异常

```
java.lang.NullPointerException: null
	at com.atguigu.gulimall.order.config.GuliFeignConfig$1.apply(GuliFeignConfig.java:32) ~[classes/:na]
	at feign.SynchronousMethodHandler.targetRequest(SynchronousMethodHandler.java:169) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:99) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:78) ~[feign-core-10.2.3.jar:na]
	at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:103) ~[feign-core-10.2.3.jar:na]
	at com.sun.proxy.$Proxy100.getAddress(Unknown Source) ~[na:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.lambda$confirmOrder$0(OrderServiceImpl.java:53) ~[classes/:na]
	at java.util.concurrent.CompletableFuture$AsyncRun.run$$$capture(CompletableFuture.java:1640) ~[na:1.8.0_301]
	at java.util.concurrent.CompletableFuture$AsyncRun.run(CompletableFuture.java) ~[na:1.8.0_301]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) ~[na:1.8.0_301]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) ~[na:1.8.0_301]
	at java.lang.Thread.run(Thread.java:748) [na:1.8.0_301]
```

然后在`HttpServletRequest request = attributes.getRequest();`这一行打个断点，看看怎么报的空指针异常

![image-20220815163233436](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.5.png)

重新发送`http://order.gulimall.com/toTrade`请求（不用重启服务），点击`Resume Program F9`跳到下一处断点

![image-20220815163741196](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.6.png)

此时就来到了`gulimall-order`模块的`com.atguigu.gulimall.order.config.GuliFeignConfig`类的`apply`方法的`HttpServletRequest request = attributes.getRequest();`这一行，可以看到`attributes`的值为`null`，所以就报空指针了

![image-20220815163903019](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.7.png)

点击`Debugger`的`Frames`里的当前`GuliFeignConfig`类的下面那个类，可以看到是`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法的`List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();`这一行调用的

![image-20220815164015783](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.2.2.8.png)

#### 3、Feign异步情况丢失上下文问题

##### 1、原因

没使用异步之前，所有执行都使用的是同一个`thread`

![image-20220815165210874](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.1.png)

而开启异步后，查`address`和`cart`又开了不同的线程，新开的线程的`ThreadLocal`里肯定没有`cookie`

##### 2、测试

修改`gulimall-order`模块的`com.atguigu.gulimall.order.config.GuliFeignConfig`类的`requestInterceptor`方法，在`HttpServletRequest request = attributes.getRequest();`方法之前输出当前线程，并注释掉输出当前线程之后的代码，避免报错

```java
@Bean("requestInterceptor")
public RequestInterceptor requestInterceptor(){
    return new RequestInterceptor() {
        @Override
        public void apply(RequestTemplate template) {
            //拿到刚进来的这个请求(/toTrade)
            RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
            //ServletRequestAttributes extends AbstractRequestAttributes
            //AbstractRequestAttributes implements RequestAttributes
            ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;

            System.out.println("RequestInterceptor线程："+Thread.currentThread().getId());
            ////原本的 /toTrade 请求
            //HttpServletRequest request = attributes.getRequest();
            ////同步请求头数据，主要是Cookie
            //String cookie = request.getHeader("Cookie");
            ////为远程调用而构造的新请求
            //template.header("Cookie",cookie);
            ////template.
        }
    };
}
```

![image-20220815165635579](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法里，在开启异步之前，开启异步之后，都输出当前线程的id

```java
@Override
public OrderConfirmVo confirmOrder() throws ExecutionException, InterruptedException {
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();
    System.out.println("主线程："+Thread.currentThread().getId());
    CompletableFuture<Void> getAddressFuture = CompletableFuture.runAsync(() -> {
        //1、远程查询所有的收货地址列表
        System.out.println("getAddressFuture线程："+Thread.currentThread().getId());
        List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());
        orderConfirmVo.setAddress(address);
    },executor);

    CompletableFuture<Void> cartFuture = CompletableFuture.runAsync(() -> {
        //2、远程查询购物车所有选中的购物项
        System.out.println("cartFuture线程："+Thread.currentThread().getId());
        List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();
        orderConfirmVo.setItems(items);
    }, executor);
    //3、查询用户积分
    Integer integration = memberEntityTo.getIntegration();
    orderConfirmVo.setIntegration(integration);

    //orderConfirmVo.setIntegration(orderConfirmVo.getIntegration());
    orderConfirmVo.setPayPrice(orderConfirmVo.getPayPrice());
    orderConfirmVo.setTotal(orderConfirmVo.getTotal());
    //TODO 防重令牌

    CompletableFuture.allOf(getAddressFuture,cartFuture).get();
    return orderConfirmVo;
}
```

![image-20220815165915349](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.2.2.png)

取消所有`GulimallOrderApplication`服务的断点，以`debug`方式启动`GulimallOrderApplication`服务

重新发送`http://order.gulimall.com/toTrade`请求，可以看到开启异步后线程id变了，故线程变了，所以获取不到`ThreadLocal`本地线程数据了

```
主线程：69
getAddressFuture线程：110
cartFuture线程：111
RequestInterceptor线程：111
RequestInterceptor线程：110
```

![image-20220815170226054](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.2.3.png)

图解大概是这个样子：订单服务开了两个异步任务来获取收货地址和购物车数据，由于用户的数据保存在`ThreadLocal`本地线程中，当线程改变后，就获取不到原来线程的`ThreadLocal`数据了

![image-20220815170419254](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.2.4.png)



##### 3、修改代码

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.GuliFeignConfig`类的`requestInterceptor`方法的`attributes.getRequest()`之前加一个判断，并在`ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;`上打个断点

```java
@Bean("requestInterceptor")
public RequestInterceptor requestInterceptor(){
    return new RequestInterceptor() {
        @Override
        public void apply(RequestTemplate template) {
            //拿到刚进来的这个请求(/toTrade)
            RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
            //ServletRequestAttributes extends AbstractRequestAttributes
            //AbstractRequestAttributes implements RequestAttributes
            ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;

            System.out.println("RequestInterceptor线程："+Thread.currentThread().getId());
            if (attributes != null) {
                //原本的 /toTrade 请求
                HttpServletRequest request = attributes.getRequest();
                //同步请求头数据，主要是Cookie
                String cookie = request.getHeader("Cookie");
                //为远程调用而构造的新请求
                template.header("Cookie",cookie);
                //template.
            }
        }
    };
}
```

![image-20220815171354969](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.3.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`confirmOrder`方法里，先获取主线程`RequestAttributes`数据，然后将开启异步后的线程也设上`RequestAttributes`数据，这样新开的线程就有原来线程的数据了

![image-20220815170739591](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.3.2.png)

虽然用的`RequestContextHolder`从头到尾都一样，但封装数据用的是`ThreadLocal`，只要线程不一样，`ThreadLocal`里的数据就不一样(但是新开的线程是复用的，设置完数据后没有清除，有可能给别的用户用了)

![image-20220815170950030](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.3.3.png)

##### 4、重新测试

重启`GulimallOrderApplication`服务，发送`http://order.gulimall.com/toTrade`请求

此时`attributes`就不为`null`了，也能正确获得`cookie`的值了

![image-20220815172234132](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.3.4.png)

#### 4、编解码异常

##### 1、查看异常

老师`gulimall-cart`模块的`com.atguigu.gulimall.cart.feign.ProductFeignService`接口的`getPrice`方法这里出现了编解码异常

![image-20220815172354244](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.1.1.png)

而我并没有（还是改一下吧，不过下面的176行的那个`return null;`要改为`return collect;`，后面会改的）

老师出现的异常可能是直接返回的`BigDecimal`类型的数据出现了问题，而我的正确编码了

![image-20220815172228974](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.1.2.png)

##### 2、修改代码

修改`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SkuInfoController`类的`getPrice`方法，让其返回`R`对象

```java
/**
 * 实时查询商品价格
 * @param skuId
 * @return
 */
@GetMapping("/{skuId}/price")
public R getPrice(@PathVariable("skuId") Long skuId){
    SkuInfoEntity skuInfoEntity = skuInfoService.getById(skuId);
    return R.ok().put("data",skuInfoEntity.getPrice().toString());
}
```

![image-20220815190703058](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.2.1.png)

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.feign.ProductFeignService`接口的`getPrice`方法的返回类型

```java
@GetMapping("/product/skuinfo/{skuId}/price")
public R getPrice(@PathVariable("skuId") Long skuId);
```

![image-20220815172829558](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.2.2.png)

修改`gulimall-cart`模块的`com.atguigu.gulimall.cart.service.impl.CartServiceImpl`类的`getUserCartItems`方法，让其接收`R`对象

```java
@Override
public List<CartItemVo> getUserCartItems() {
    UserInfoTo userInfoTo = CartInterceptor.threadLocal.get();
    if (userInfoTo == null) {
        return null;
    }else {
        String cartKey = CART_PREFIX + userInfoTo.getUserId();
        List<CartItemVo> cartItems = getCartItems(cartKey);
        if (cartItems!=null) {
            //获取所有被选中的购物项
            List<CartItemVo> collect = cartItems.stream().filter(CartItemVo::getCheck)
                    .map(item->{
                        //获取商品最新价格
                        R r = productFeignService.getPrice(item.getSkuId());
                        String price = (String) r.get("data");
                        item.setPrice(new BigDecimal(price));
                        return item;
                    })
                    .collect(Collectors.toList());

            return collect;
        }else {
            return null;
        }
    }
}
```

![image-20220815200706017](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.2.3.png)

##### 3、测试

重启`GulimallCartApplication`服务和`GulimallOrderApplication`服务，访问 http://order.gulimall.com/toTrade 页面报了如下错误，告诉我们执行`CartFeignService#getCurrentUserCartItems()`方法报错了

```bash
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Mon Aug 15 19:28:25 CST 2022
There was an unexpected error (type=Internal Server Error, status=500).
feign.FeignException$InternalServerError: status 500 reading CartFeignService#getCurrentUserCartItems()
```

![image-20220815190953627](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.3.1.png)

查看`GulimallCartApplication`服务的控制台，出现了`thymeleaf`的问题，但`getCurrentUserCartItems`方法根本就没返回页面

```bash
2022-08-15 19:27:50.266 ERROR 6972 --- [o-30000-exec-10] org.thymeleaf.TemplateEngine             : [THYMELEAF][http-nio-30000-exec-10] Exception processing template "currentUserCartItems": Error resolving template [currentUserCartItems], template might not exist or might not be accessible by any of the configured Template Resolvers

org.thymeleaf.exceptions.TemplateInputException: Error resolving template [currentUserCartItems], template might not exist or might not be accessible by any of the configured Template Resolvers
```

![image-20220815192957537](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.3.2.png)

在`gulimall-cart`模块的`com.atguigu.gulimall.cart.controller.CartController`类里修改`getCurrentUserCartItems`方法，在该方法上加上`@ResponseBody`注解

```java
@GetMapping("/currentUserCartItems")
@ResponseBody
public List<CartItemVo> getCurrentUserCartItems(){
    return cartService.getUserCartItems();
}
```

![image-20220815193244430](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.3.3.png)

重启`GulimallCartApplication`服务，刷新`http://order.gulimall.com/toTrade`页面，此时就可以看到页面了

![image-20220815193408786](https://gitlab.com/apzs/image/-/raw/master/image/6.1.2.4.3.4.png)

### 6.1.3、完善结算页

#### 1、修改结算页面

##### 1、修改收货人信息

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`收货人信息`位置，复制`收货人信息`

![image-20220815193754771](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.1.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`收货人信息`，将收货人信息修改为动态获取的信息，然后点击`Build` -> `Recompile 'confirm.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```html
<div class="section">
   <!--收货人信息-->
   <div class="top-2">
      <span>收货人信息</span>
      <span>新增收货地址</span>
   </div>

   <!--地址-->
   <div class="top-3" th:each="addr: ${orderConfirmData.address}">
      <!--<p>家里</p><span>齐天大圣  北京市  昌平区城区晨曦小区-16号楼 吉利大学  150****2245</span>-->
      <p>[[${addr.name}]]</p><span>[[${addr.name}]] [[${addr.province}]]  [[${addr.detailAddress}]] 吉利大学  [[${addr.phone}]]</span>
   </div>
   <p class="p2">更多地址︾</p>
   <div class="hh1"/></div>
```

![image-20220815194259282](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.1.2.png)

修改`gulimall_ums`数据库的`ums_member_receive_address`表的`member_id`为`7`的那个元组的属性，修改其`province`属性为`上海市`、`detail_address`属性为`上海市松江区大厦6层`、`default_status`属性为`1`

![image-20220815194515585](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.1.3.png)

刷新  http://order.gulimall.com/toTrade  页面，这样就显示用户的收货地址信息了

![image-20220815194545580](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.1.4.png)

##### 2、删除自提点信息

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`北京市昌平区`位置，复制`北京市昌平区`

![image-20220815194808760](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.2.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`北京市昌平区`，注释掉这部分代码，然后点击`Build` -> `Recompile 'confirm.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

![image-20220815194757094](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.2.2.png)

##### 3、修改商品项信息

刷新 http://order.gulimall.com/toTrade  页面就没有刚才那一行信息了，再打开控制台，定位到`小米手环2`的那个购物项，复制`商家：谷粒学院自营`

![image-20220815195015257](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.3.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`商家：谷粒学院自营`，将里面的商品项修改为动态的数据

```html
<div class="to_right">
   <h5>商家：谷粒学院自营</h5>
   <div><button>换购</button><span>已购满20.00元，再加49.90元，可返回购物车领取赠品</span></div>
   <!--图片-->
   <div class="yun1" th:each="item : ${orderConfirmData.items}">
      <img th:src="${item.image}" class="yun"/>
      <div class="mi">
         <p>[[${item.title}]] <span style="color: red;"> ￥ [[${#numbers.formatDecimal(item.price,1,2)}]]  </span> <span> x[[${item.count}]] </span> <span>[[${item.hasStock?'有货':'无货'}]]</span></p>
         <p><span>0.095kg</span></p>
         <p class="tui-1"><img src="/static/order/confirm/img/i_07.png" />支持7天无理由退货</p>
      </div>
   </div>

   <div class="hh1"></div>
   <p>退换无忧 <span class="money">￥ 0.00</span></p>
</div>
```

![image-20220815203229687](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.3.2.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类的`OrderItemVo`内部类，添加是否有货字段和货物重量字段

```java
/**
 * //TODO 查询库存状态
 * 是否有货
 */
private boolean hasStock;
/**
 * 货物重量
 */
private BigDecimal weight;
```

![image-20220815201633991](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.3.3.png)

重启`GulimallOrderApplication`服务，刷新  http://order.gulimall.com/toTrade  页面，这样就动态显示购物项数据了

![image-20220815203224222](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.3.4.png)

##### 4、修改结算信息

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`1 件商品，总商品金额：`位置，复制`件商品，总商品金额：`

![image-20220815201937141](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.4.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`件商品，总商品金额：`，将这些结算信息修改为动态的数据

```html
<div class="xia">
   <div class="qian">
      <p class="qian_y">
         <span>[[${orderConfirmData.count}]]</span>
         <span>件商品，总商品金额：</span>
         <span class="rmb">￥[[${#numbers.formatDecimal(orderConfirmData.total,1,2)}]]</span>
      </p>
      <p class="qian_y">
         <span>返现：</span>
         <span class="rmb">  -￥0.00</span>
      </p>
      <p class="qian_y">
         <span>运费： </span>
         <span class="rmb"> &nbsp ￥0.00</span>
      </p>
      <p class="qian_y">
         <span>服务费： </span>
         <span class="rmb"> &nbsp ￥0.00</span>
      </p>
      <p class="qian_y">
         <span>退换无忧： </span>
         <span class="rmb"> &nbsp ￥0.00</span>
      </p>

   </div>

   <div class="yfze">
      <p class="yfze_a"><span class="z">应付总额：</span><span class="hq">￥[[${#numbers.formatDecimal(orderConfirmData.payPrice,1,2)}]]</span></p>
      <!--<p class="yfze_b">寄送至： 北京 朝阳区 三环到四环之间 朝阳北路复兴国际大厦23层麦田房产 IT-中心研发二部 收货人：赵存权 188****5052</p>-->
      <p class="yfze_b">寄送至： xxx 收货人：xxx 188****5052</p>
   </div>
   <button class="tijiao">提交订单</button>
</div>
```

![image-20220815204044953](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.4.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类里添加`getCount`方法，页面直接写`${orderConfirmData.count}`就会调用`orderConfirmData`对象的`getCount`方法

```java
public Integer getCount(){
    Integer count = 0;
    for (OrderItemVo item : items) {
        count+=item.count;
    }
    return count;
}
```

![image-20220815202240893](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.4.3.png)

重启`GulimallOrderApplication`服务，刷新  http://order.gulimall.com/toTrade  页面，这样就动态显示结算信息了

![image-20220815204126564](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.4.4.png)

##### 5、完善收货人信息

在`gulimall_ums`数据库的`ums_member_receive_address`表里，再添加一条`member_id`为`7`的数据

![image-20220815204254248](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.5.1.png)

刷新  http://order.gulimall.com/toTrade  页面，可以看到这两个收货地址的`name`都有红框，并且都有`吉林大学`

![image-20220815204335364](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.5.2.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`吉利大学`，删掉这里的`吉利大学`

![image-20220815204513934](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.5.3.png)

刷新  http://order.gulimall.com/toTrade  页面，可以看到这两个收货地址的`name`都有红框，但是没有`吉林大学`了，红框后面会解决的

![image-20220815204537985](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.1.5.4.png)

#### 2、批量查有货无货状态

##### 1、修改字段

去掉`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类的`OrderItemVo`内部类的`private boolean hasStock;`字段

```
private boolean hasStock;
```

![image-20220815204853511](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.1.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo.OrderConfirmVo`类里，添加`stocks`字段，用于判断是否有库存

```java
/**
 * 是否有库存
 * Long：skuId
 * Boolean：是否有库存
 */
@Getter @Setter
Map<Long,Boolean> stocks;
```

![image-20220815211949704](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.1.2.png)

##### 2、添加方法

`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类里已经有了一个`getSkuHasStock`批量查库存方法了，直接调用就好了

![image-20230103105912504](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign`包里添加`WmsFeignService`接口，再里面远程调用`gulimall-ware`模块，用于查库存

```java
package com.atguigu.gulimall.order.feign;

import com.atguigu.common.to.SkuHasStockTo;
import com.atguigu.common.utils.RS;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/15
 * @Description:
 */
@FeignClient("gulimall-ware")
public interface WmsFeignService {

    @PostMapping("/ware/waresku/hasStock")
    public RS<List<SkuHasStockTo>> getSkuHasStock(@RequestBody List<Long> skuIds);
}
```

![image-20220815210934956](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里修改`confirmOrder`方法，用于获取库存信息

```java
@Autowired
WmsFeignService wmsFeignService;

@Override
public OrderConfirmVo confirmOrder() throws ExecutionException, InterruptedException {
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();
    System.out.println("主线程："+Thread.currentThread().getId());
    //获取之前的请求
    RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

    CompletableFuture<Void> getAddressFuture = CompletableFuture.runAsync(() -> {
        //1、远程查询所有的收货地址列表
        System.out.println("getAddressFuture线程："+Thread.currentThread().getId());
        //每一个线程都来共享之前的请求数据
        RequestContextHolder.setRequestAttributes(requestAttributes);
        List<OrderConfirmVo.MemberAddressVo> address = memberFeignService.getAddress(memberEntityTo.getId());
        orderConfirmVo.setAddress(address);
    },executor);

    CompletableFuture<Void> cartFuture = CompletableFuture.runAsync(() -> {
        //2、远程查询购物车所有选中的购物项
        System.out.println("cartFuture线程：" + Thread.currentThread().getId());
        //每一个线程都来共享之前的请求数据
        RequestContextHolder.setRequestAttributes(requestAttributes);
        List<OrderConfirmVo.OrderItemVo> items = cartFeignService.getCurrentUserCartItems();
        orderConfirmVo.setItems(items);
    }, executor).thenRunAsync(() -> {
        List<OrderConfirmVo.OrderItemVo> items = orderConfirmVo.getItems();
        List<Long> collect = items.stream().map(OrderConfirmVo.OrderItemVo::getSkuId).collect(Collectors.toList());
        RS<List<SkuHasStockTo>> skuHasStock = wmsFeignService.getSkuHasStock(collect);
        List<SkuHasStockTo> data = skuHasStock.getData();
        if (!CollectionUtils.isEmpty(data)) {
            Map<Long, Boolean> stocks = data.stream().collect(Collectors.toMap(SkuHasStockTo::getSkuId, SkuHasStockTo::getHasStock));
            orderConfirmVo.setStocks(stocks);
        }
    }, executor);
    //3、查询用户积分
    Integer integration = memberEntityTo.getIntegration();
    orderConfirmVo.setIntegration(integration);

    //orderConfirmVo.setIntegration(orderConfirmVo.getIntegration());
    orderConfirmVo.setPayPrice(orderConfirmVo.getPayPrice());
    orderConfirmVo.setTotal(orderConfirmVo.getTotal());
    //TODO 防重令牌

    CompletableFuture.allOf(getAddressFuture,cartFuture).get();
    return orderConfirmVo;
}
```

![image-20220815212236535](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.2.3.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里，将`<span>[[${item.hasStock?'有货':'无货'}]]</span>`修改为`<span>[[${orderConfirmData.stocks[item.skuId]?'有货':'无货'}]]</span>`

![image-20220815213044944](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.2.4.png)

##### 3、测试

重启`GulimallOrderApplication`服务，启动`GulimallWareApplication`服务，此时购物项就显示`有货`、`无货`状态了

![image-20220815213111386](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.2.3.png)

#### 3、默认地址显示红色边框

##### 1、显示默认地址边框

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`收货人信息`里的某个收货人的位置，复制`top-3`

![image-20220816090304578](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.1.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`top-3`，给`地址`所在的`<div>`再加一个`class`为`addr-item`，给收货人的`<p>`标签加一个自定义属性`th:attr="def=${addr.defaultStatus}"`

```html
<!--地址-->
<div class="top-3 addr-item" th:each="addr: ${orderConfirmData.address}">
   <!--<p>家里</p><span>齐天大圣  北京市  昌平区城区晨曦小区-16号楼 吉利大学  150****2245</span>-->
   <p th:attr="def=${addr.defaultStatus}">[[${addr.name}]]</p><span>[[${addr.name}]] [[${addr.province}]]  [[${addr.detailAddress}]]  [[${addr.phone}]]</span>
</div>
```

![image-20220816090528912](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.1.2.png)

在`gulimall_ums`数据库的`ums_member_receive_address`表里，给`member_id`为`7`的第二个元组(这里指的是`id`为`2`元组)的`default_status`设置为`0`，表示不是默认地址

![image-20220816090836290](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.1.3.png)

在  http://order.gulimall.com/toTrade  页面里，打开控制台，可以看到默认地址的姓名所在的`<p>`标签的自定义`def`属性值为`1`，不是默认地址的姓名所在的`<p>`标签的自定义`def`属性值为`0`

![image-20220816090959775](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.1.4.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里添加`highlight`方法，并在`$(document).ready()`方法(页面初始化方法)里调用该方法

```javascript
function highlight() {
   //让收货地址的姓名所在的边框置灰
   $(".addr-item p").css({"border":"2px solid gray"})
   $(".addr-item p[def='1']").css({"border":"2px solid red"})
}
```

![image-20220816091828776](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.1.5.png)

在  http://order.gulimall.com/toTrade  页面里，打开控制台，可以看到`def="1"`的是红色边框，`def="0"`的是灰色边框

![image-20220816092039686](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.1.6.png)

##### 2、修改配送的地址

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里添加`.addr-item p`对应元素点击事件，修改配送的地址，然后点击`Build` -> `Recompile 'confirm.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

```javascript
$(".addr-item p").click(function () {
   $(".addr-item p").attr("def","0")
   $(this).attr("def","1")
   highlight()
})
```

![image-20220816092410550](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.2.png)

##### 3、测试

打开 http://order.gulimall.com/toTrade 页面，可以看到当点击其他收货人时，红色边框也跟着变了

![GIF 2022-8-16 9-26-40](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.3.3.png)

#### 4、获取运费

##### 1、页面添加标识

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里，在遍历收货人信息的`<p>`标签上添加自定义`addrId=${addr.id}`属性，方便获取`addrId`

```javascript
<!--地址-->
<div class="top-3 addr-item" th:each="addr: ${orderConfirmData.address}">
   <!--<p>家里</p><span>齐天大圣  北京市  昌平区城区晨曦小区-16号楼 吉利大学  150****2245</span>-->
   <p th:attr="def=${addr.defaultStatus},addrId=${addr.id}">[[${addr.name}]]</p><span>[[${addr.name}]] [[${addr.province}]]  [[${addr.detailAddress}]]  [[${addr.phone}]]</span>
</div>
```

![image-20220816092812983](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.1.png)

##### 2、编写获取运费接口

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareInfoController`类里添加`getFare(Long addrId)`方法，用于获取运费

```java
@GetMapping("/fare")
public R getFare(Long addrId) {
  BigDecimal fare= wareInfoService.getFare(addrId);
  return R.ok().put("data",fare);
}
```

![image-20220816093305892](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareInfoService`接口里添加`getFare`抽象方法（下面先不急着实现该抽象方法）

```java
BigDecimal getFare(Long addrId);
```

![image-20220816093346659](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.2.png)

`gulimall-member`模块的`com.atguigu.gulimall.member.controller.MemberReceiveAddressController`类的`info`方法，可以根据`addrId`获取收货地址

![image-20220816093803222](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.feign`包下新建`MemberFeignService`接口，在里面添加`addrInfo(@PathVariable("id") Long id)`方法，用于获取地址信息

```java
package com.atguigu.gulimall.ware.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@FeignClient("gulimall-member")
public interface MemberFeignService {

    @RequestMapping("/member/memberreceiveaddress/info/{id}")
    public R addrInfo(@PathVariable("id") Long id);
}
```

![image-20220816094054486](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.4.png)

复制`gulimall-member`模块的`com.atguigu.gulimall.member.entity.MemberReceiveAddressEntity`类，粘贴到`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo`包下

```java
package com.atguigu.gulimall.ware.vo;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@Data
public class MemberAddressVo {
    /**
     * id
     */
    private Long id;
    /**
     * member_id
     */
    private Long memberId;
    /**
     * 收货人姓名
     */
    private String name;
    /**
     * 电话
     */
    private String phone;
    /**
     * 邮政编码
     */
    private String postCode;
    /**
     * 省份/直辖市
     */
    private String province;
    /**
     * 城市
     */
    private String city;
    /**
     * 区
     */
    private String region;
    /**
     * 详细地址(街道)
     */
    private String detailAddress;
    /**
     * 省市区代码
     */
    private String areacode;
    /**
     * 是否默认
     */
    private Integer defaultStatus;
}
```

![image-20220816094729549](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.5.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware`包下新建`constant`文件夹，在`constant`文件夹下新建`FreightConstant`类，用于指定本地运费和外地运费的价格

```java
package com.atguigu.gulimall.ware.constant;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description: 用户需要支付的运费
 */
@Data
@Component
@ConfigurationProperties(prefix = "gulimall.freight")
public class FreightConstant {

    /**
     * 本地运费
     */
    private BigDecimal localFreight = new BigDecimal("8");

    /**
     * 外地运费
     */
    private BigDecimal outlandFreight = new BigDecimal("12");
}
```

![image-20220816100420426](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.6.png)

在`gulimall-ware`模块的`src/main/resources/application.properties`配置文件里添加如下配置，用于设置本地运费和外地运费

```properties
# 设置本地运费
gulimall.freight.localFreight=9
# 设置外地运费
gulimall.freight.outlandFreight=14
```

![image-20220816100545902](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.7.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareInfoServiceImpl`类里实现`getFare`方法

```java
/**
 * 根据收货地址计算运费
 * 如果收货地址所在的省份/直辖市 有仓库就按本地运费计算
 * 如果收货地址所在的省份/直辖市 没有有仓库就按外地运费计算
 * @param addrId
 * @return
 */
@Override
public BigDecimal getFare(Long addrId) {
    R r = memberFeignService.addrInfo(addrId);
    Object data = r.get("memberReceiveAddress");
    if (data==null){
        return null;
    }
    String s = JSON.toJSONString(data);
    MemberAddressVo memberAddressVo = JSON.parseObject(s, MemberAddressVo.class);
    //获取用户该收货地址 省份/直辖市
    String city = memberAddressVo.getProvince();

    LambdaQueryWrapper<WareInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    LambdaQueryWrapper<WareInfoEntity> eq = lambdaQueryWrapper.eq(WareInfoEntity::getAddress, city);
    WareInfoEntity wareInfoEntity = this.baseMapper.selectOne(eq);
    if (wareInfoEntity!=null){
        //用户收货地址有仓库
       return freightConstant.getLocalFreight();
    }
    return freightConstant.getOutlandFreight();
}
```

![image-20220816105557985](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.2.8.png)

##### 3、修改点击事件

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里修改`.addr-item p`对应元素点击事件，发送请求，在控制台打印获取的数据

```java
$(".addr-item p").click(function () {
   $(".addr-item p").attr("def","0")
   $(this).attr("def","1")
   highlight()
   //获取到当前的地址id
   var addrId = $(this).attr("addrId");
   $.get("http://gulimall.com/api/ware/wareinfo/fare?addrId=" +addrId,function (data) {
      console.log(data)
   })
})
```

![image-20220816105640490](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.3.png)

##### 4、测试

重启`GulimallWareApplication`服务，刷新 http://order.gulimall.com/toTrade 页面，点击`北京市`的收货地址，查看请求信息，显示的响应里的`data`的值为`14`，也就是运费为`14`（上面配置的本地仓库的运费为`9`，外地仓库的运费为`14`）

![image-20220816105256019](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.4.1.png)

查看控制台，可以看到输出的`data`也为`14`

![image-20220816110528463](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.4.2.png)

查看`gulimall_wms`数据库的`wms_ware_info`表的`address`字段，确实没有是`北京市`的仓库，只有`北京xx`和`上海市`

![image-20220816105828227](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.4.3.png)

再点击`上海市`的收货地址，响应的`data`的值为`9`，有`北京市`的仓库，所以是本地仓库，运费为`9`元；但是点击`北京市`的收货人后红色边框没有换过来

![image-20220816105913892](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.4.4.png)

查看控制台，可以看到输出的`data`也为`9`

![image-20220816110447054](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.4.5.png)

##### 5、前端显示运费

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到提交订单上面的`运费：`位置，复制`运费：` 

![image-20220816110058179](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.5.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`运费：` ，将`<span class="rmb"> &nbsp ￥0.00</span>`修改为`<span class="rmb"> &nbsp ￥<b id="fareEle"></b></span>`

```html
<p class="qian_y">
   <span>运费： </span>
   <span class="rmb"> &nbsp ￥<b id="fareEle"></b></span>
</p>
```

![image-20220816110259320](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.5.2.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里，给收货地址的`<p>`标签绑定的`click`事件方法的最后添加 `$("#fareEle").text(data.data)`，将页面初始化方法调用的`highlight()`删掉，并在`$(document).ready()`页面初始化方法调用`$(".addr-item p[def='1']").click()`，自动点击默认收货地址

```javascript
$(".addr-item p").click(function () {
   $(".addr-item p").attr("def","0")
   $(this).attr("def","1")
   highlight()
   //获取到当前的地址id
   var addrId = $(this).attr("addrId");
   $.get("http://gulimall.com/api/ware/wareinfo/fare?addrId=" +addrId,function (data) {
      console.log(data)
      $("#fareEle").text(data.data)
   })
})
```

![image-20220816111607327](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.5.3.png)

##### 6、测试

重启`GulimallOrderApplication`服务，刷新 http://order.gulimall.com/toTrade 页面，修改收货人信息，可以看到红色边框改变了，下滑找到`运费`，可以看到当修改收货人信息后`运费`也变了

![GIF 2022-8-16 11-12-56](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.4.6.gif)

#### 5、应付总额

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`应付总额：`位置，复制`应付总额：`

![image-20220816112137321](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.5.1.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`应付总额：`，将`￥[[${#numbers.formatDecimal(orderConfirmData.payPrice,1,2)}]]`修改为`￥<b id="payPriceEle">[[${#numbers.formatDecimal(orderConfirmData.payPrice,1,2)}]]</b>`

```javascript
<div class="yfze">
   <p class="yfze_a"><span class="z">应付总额：</span><span class="hq">￥<b id="payPriceEle">[[${#numbers.formatDecimal(orderConfirmData.payPrice,1,2)}]]</b></span></p>
   <!--<p class="yfze_b">寄送至： 北京 朝阳区 三环到四环之间 朝阳北路复兴国际大厦23层麦田房产 IT-中心研发二部 收货人：赵存权 188****5052</p>-->
   <p class="yfze_b">寄送至： xxx 收货人：xxx 188****5052</p>
</div>
```

![image-20220816113817256](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.5.2.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里修改`.addr-item p`对应元素点击事件，让其调用`getFare(addrId)`方法

```javascript
$(".addr-item p").click(function () {
   $(".addr-item p").attr("def","0")
   $(this).attr("def","1")
   highlight()
   //获取到当前的地址id
   var addrId = $(this).attr("addrId");
   getFare(addrId)
})

function getFare(addrId) {
   $.get("http://gulimall.com/api/ware/wareinfo/fare?addrId=" +addrId,function (data) {
      console.log(data)
      $("#fareEle").text(data.data)

      var total = [[${#numbers.formatDecimal(orderConfirmData.total,1,2)}]]
      // total*1 将其转为数字类型
      $("#payPriceEle").text(total*1+data.data*1)
   })
}
```

![image-20220816113634984](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.5.3.png)

点击`Build` -> `Recompile 'confirm.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件，刷新 http://order.gulimall.com/toTrade 页面，可以看到将收获地址从没有本地仓库的地址修改为有本地仓库的地址后，`应付总额`也跟着变了

![GIF 2022-8-16 11-40-38](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.5.4.gif)

#### 6、寄送人

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo`包里新建`FareVo`类

```java
package com.atguigu.gulimall.ware.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@Data
public class FareVo {

    private MemberAddressVo memberAddressVo;

    private BigDecimal fare;
}
```

![image-20220816114457409](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.1.png)

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareInfoServiceImpl`类的`getFare`方法

```java
/**
 * 根据收货地址计算运费
 * 如果收货地址所在的省份/直辖市 有仓库就按本地运费计算
 * 如果收货地址所在的省份/直辖市 没有有仓库就按外地运费计算
 * @param addrId
 * @return
 */
@Override
public FareVo getFare(Long addrId) {
    R r = memberFeignService.addrInfo(addrId);
    Object data = r.get("memberReceiveAddress");
    if (data==null){
        return null;
    }
    FareVo fareVo = new FareVo();
    String s = JSON.toJSONString(data);
    MemberAddressVo memberAddressVo = JSON.parseObject(s, MemberAddressVo.class);
    fareVo.setMemberAddressVo(memberAddressVo);
    //获取用户该收货地址 省份/直辖市
    String city = memberAddressVo.getProvince();

    LambdaQueryWrapper<WareInfoEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    LambdaQueryWrapper<WareInfoEntity> eq = lambdaQueryWrapper.eq(WareInfoEntity::getAddress, city);
    WareInfoEntity wareInfoEntity = this.baseMapper.selectOne(eq);
    BigDecimal fare = null;
    if (wareInfoEntity!=null){
        //用户收货地址有仓库
       fareVo.setFare(freightConstant.getLocalFreight());
    }else {
        fareVo.setFare(freightConstant.getOutlandFreight());
    }
    return fareVo;
}
```

![image-20220816114733801](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.2.png)

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareInfoService`接口的`getFare`方法返回值

```java
FareVo getFare(Long addrId);
```

![image-20220816114810150](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.3.png)

修改`gulimall-warev`模块的`com.atguigu.gulimall.ware.controller.WareInfoController`类的`getFare`方法

```java
@GetMapping("/fare")
public R getFare(Long addrId) {
  FareVo fare= wareInfoService.getFare(addrId);
  return R.ok().put("data",fare);
}
```

![image-20220816114907518](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.4.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里，修改`getFare(addrId)`方法

```java
function getFare(addrId) {
   $.get("http://gulimall.com/api/ware/wareinfo/fare?addrId=" +addrId,function (data) {
      console.log(data)
      $("#fareEle").text(data.data.fare)

      var total = [[${#numbers.formatDecimal(orderConfirmData.total,1,2)}]]
      // total*1 将其转为数字类型
      $("#payPriceEle").text(total*1+data.data.fare*1)
   })
}
```

![image-20220816115107557](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.5.png)

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`寄送至`位置，复制`寄送至`

![image-20220816115158313](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.6.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`寄送至`，

把`<p class="yfze_b">寄送至： xxx 收货人：xxx 188****5052</p>`改为`<p class="yfze_b">寄送至： <span id="receiveAddressEle"></span> 收货人：<span id="receiveEle"></span></p>`

```java
<div class="yfze">
   <p class="yfze_a"><span class="z">应付总额：</span><span class="hq">￥<b id="payPriceEle">[[${#numbers.formatDecimal(orderConfirmData.payPrice,1,2)}]]</b></span></p>
   <!--<p class="yfze_b">寄送至： 北京 朝阳区 三环到四环之间 朝阳北路复兴国际大厦23层麦田房产 IT-中心研发二部 收货人：赵存权 188****5052</p>-->
   <p class="yfze_b">寄送至： <span id="receiveAddressEle"></span> 收货人：<span id="receiveEle"></span></p>
</div>
```

![image-20220816115421918](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.7.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里，再次修改`getFare(addrId)`方法

```javascript
function getFare(addrId) {
   $.get("http://gulimall.com/api/ware/wareinfo/fare?addrId=" +addrId,function (resp) {
      //设置运费
      $("#fareEle").text(resp.data.fare)
      //设置应付金额
      var total = [[${#numbers.formatDecimal(orderConfirmData.total,1,2)}]]
      // total*1 将其转为数字类型
      $("#payPriceEle").text(total*1+resp.data.fare*1)
      //设置收货人信息
      $("#receiveAddressEle").text(resp.data.memberAddressVo.province+" "+resp.data.memberAddressVo.detailAddress)
      $("#receiveEle").text(resp.data.memberAddressVo.name)
   })
}
```

![image-20220816120009456](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.8.png)

重启`GulimallOrderApplication`服务，可以看到当点击别的寄送地址后，下面的`寄送至`的信息也会跟着改变

![GIF 2022-8-16 15-05-17](https://gitlab.com/apzs/image/-/raw/master/image/6.1.3.6.9.gif)

### 6.1.4、接口幂等性

#### 1、接口幂等性概述

##### 一、什么是幂等性

接口幂等性就是用户对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用；比如说支付场景，用户购买了商品支付扣款成功，但是返回结果的时候网络异常，此时钱已经扣了，用户再次点击按钮，此时会进行第二次扣款，返回结
果成功，用户查询余额返发现多扣钱了，流水记录也变成了两条．．．,这就没有保证接口的幂等性。

##### 二、哪些情况需要防止

- 用户多次点击按钮
- 用户页面回退再次提交
- 微服务互相调用，由于网络问题，导致请求失败。feign 触发重试机制
- 其他业务情况

##### 三、什么情况下需要幂等

以 SQL 为例，有些操作是天然幂等的。

```mysql
SELECT * FROM table WHER id=?
```

无论执行多少次都不会改变状态，是天然的幂等。

```mysql
UPDATE tab1 SET col1=1 WHERE col2=2
```

无论执行成功多少次状态都是一致的，也是幂等操作。

```mysql
delete from user where userid=1
```

多次操作，结果一样，具备幂等性

```mysql
insert into user(userid,name) values(1,'a') 
```

如果userid 为唯一主键，即重复操作上面的业务，只会插入一条用户数据，具备幂等性。

------

```mysql
UPDATE tab1 SET col1=col1+1 WHERE col2=2
```

每次执行的结果都会发生变化，不是幂等的。

```mysql
insert into user(userid,name) values(1,'a') 
```

如 userid 不是主键，可以重复，那上面业务多次操作，数据都会新增多条，不具备幂等性。

可以给`gulimall_oms`数据库的`oms_order`表的`order_sn`订单号字段设置唯一索引(数据库设置级别，保证同一个订单只有一条数据)

![image-20220816153531103](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.1.3.png)

##### 四、幂等解决方案

###### 1. token 机制

**操作**

1. 服务端提供了发送 token 的接口。我们在分析业务的时候，哪些业务是存在幂等问题的，就必须在执行业务前，先去获取 

2. 然后调用业务接口请求时，把 token 携带过去，一般放在请求头部。

3. 服务器判断 token 是否存在 redis 中，存在表示第一次请求，然后删除 token,继续执行业务。

4. 如果判断 token 不存在 redis 中，就表示是重复操作，直接返回重复标记给 client，这样就保证了业务代码，不被重复执行。

**危险性：**

1. 先删除 token 还是后删除 token；
   (1) 先删除可能导致，业务确实没有执行，重试还带上之前 token，由于防重设计导致，请求还是不能执行。
   (2) 后删除可能导致，业务处理成功，但是服务闪断，出现超时，没有删除 token，别人继续重试，导致业务被执行两边
   (3) 我们最好设计为先删除 token，如果业务调用失败，就重新获取 token 再次请求。

2. Token 获取、比较和删除必须是原子性
   (1) redis.get(token) 、token.equals、redis.del(token)如果这两个操作不是原子，可能导致，高并发下，都 get 到同样的数据，判断都成功，继续业务并发执行
   (2) 可以在 redis 使用 lua 脚本完成这个操作

```lua
if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end
```

###### 2、各种锁机制

**1、数据库悲观锁**

```mysql
select * from xxxx where id = 1 for update;
```

悲观锁使用时一般伴随事务一起使用，数据锁定时间可能会很长，需要根据实际情况选用。另外要注意的是，id 字段一定是主键或者唯一索引，不然可能造成锁表的结果，处理起来会非常麻烦。

**2、数据库乐观锁**

这种方法适合在更新的场景中， 

```mysql
update t_goods set count = count -1 , version = version + 1 where good_id=2 and version = 1
```

根据 version 版本，也就是在操作库存前先获取当前商品的 version 版本号，然后操作的时候 带上此 version 号。我们梳理下，我们第一次操作库存时，得到 version 为 1，调用库存服务 version 变成了 2；但返回给订单服务出现了问题，订单服务又一次发起调用库存服务，当订 单服务传如的 version 还是 1，再执行上面的 sql 语句时，就不会执行；因为 version 已经变 为 2 了，where 条件就不成立。这样就保证了不管调用几次，只会真正的处理一次。 乐观锁主要使用于处理读多写少的问题

**3、业务层分布式锁**

如果多个机器可能在同一时间同时处理相同的数据，比如多台机器定时任务都拿到了相同数据处理，我们就可以加分布式锁，锁定此数据，处理完成后释放锁。获取到锁的必须先判断 这个数据是否被处理过。

###### 3、各种唯一约束

**1、数据库唯一约束**
插入数据，应该按照唯一索引进行插入，比如订单号，相同的订单就不可能有两条记录插入。我们在数据库层面防止重复。这个机制是利用了数据库的主键唯一约束的特性，解决了在 insert 场景时幂等问题。但主键的要求不是自增的主键，这样就需要业务生成全局唯一的主键。如果是分库分表场景下，路由规则要保证相同请求下，落地在同一个数据库和同一表中，要不然数据库主键约束就不起效果了，因为是不同的数据库和表主键不相关。
**2、redis set 防重**
很多数据需要处理，只能被处理一次，比如我们可以计算数据的 MD5 将其放入 redis 的 set，每次处理数据，先看这个 MD5 是否已经存在，存在就不处理。
**4、防重表**
使用订单号 orderNo 做为去重表的唯一索引，把唯一索引插入去重表，再进行业务操作，且他们在同一个事务中。这个保证了重复请求时，因为去重表有唯一约束，导致请求失败，避免了幂等问题。这里要注意的是，去重表和业务表应该在同一库中，这样就保证了在同一个事务，即使业务操作失败了，也会把去重表的数据回滚。这个很好的保证了数据一致性。(之前说的 redis防重也算)

**5、全局请求唯一 id** 

调用接口时，生成一个唯一 id，redis 将数据保存到集合中（去重），存在即处理过。 可以使用 nginx 设置每一个请求的唯一 id； 

```nginx
proxy_set_header X-Request-Id $request_id;
```

#### 2、订单确认

##### 1、订单确认流程

![订单确认页流程](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.2.1.png)

##### 2、修改代码

在`gulimall-order`模块的`com.atguigu.gulimall.order`包下新建`constant`文件夹，在`constant`文件夹里新建`OrderConstant`类

```java
package com.atguigu.gulimall.order.constant;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
public class OrderConstant {
    /**
     * 用户生成订单的令牌前缀
     */
    public static final String USER_ORDER_TOKEN_PREFIX = "order:token:";
}
```

![image-20220816155302842](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.2.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里的`confirmOrder`方法里添加防重令牌，[点击查看完整代码](code/6.1.4.2.5.java)

```java
@Autowired
StringRedisTemplate redisTemplate;

@Override
public OrderConfirmVo confirmOrder() throws ExecutionException, InterruptedException {
    ......
    orderConfirmVo.setPayPrice(orderConfirmVo.getPayPrice());
    orderConfirmVo.setTotal(orderConfirmVo.getTotal());
    //TODO 防重令牌
    String key = OrderConstant.USER_ORDER_TOKEN_PREFIX + memberEntityTo.getId();
    String token = UUID.randomUUID().toString().replace("-", "");
    redisTemplate.opsForValue().set(key,token,30, TimeUnit.MINUTES);
    orderConfirmVo.setOrderToken(token);
    
    CompletableFuture.allOf(getAddressFuture,cartFuture).get();
    return orderConfirmVo;
}
```

![image-20220816155726108](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.2.2.2.png)

#### 3、提交订单

##### 1、前端添加提交订单按钮

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`提交订单`，在上面添加如下代码

```html
<input name="orderToken" type="hidden" th:value="${orderConfirmData.orderToken}">
```

![image-20220816160347855](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.1.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包里新建`OrderSubmitVo`类，用于封装提交订单的信息

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description: 封装订单提交的数据
 */
@Data
public class OrderSubmitVo {

    /**
     * 收货地址的id
     */
    private Long addrId;
    /**
     * 支付方式（在线支付/货到付款）
     */
    private Integer payType;

    //再去购物车中查询商品，不用页面提交商品信息
    //积分、优惠、发票

    /**
     * 防重令牌
     */
    private String orderToken;

    /**
     * 页面提交的应付价格（如果提交订单后判断的应付价格和页面提交过来的价格不一样，给予用户提示）
     */
    private BigDecimal payPrice;

    /**
     * 订单备注
     */
    private String note;
    ///用户相关信息，直接去session取出登录的用户

}
```

![image-20220816161846478](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.1.2.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里，给`提交订单`的`<button>`标签和`name`为`orderToken`的`<input>`标签 添加一个父`<form>`标签，并在里面`<form>`标签里面（与`提交订单`的`<button>`标签、`orderToken`的`<input>`标签同级）添加隐藏的`addrIdInput`、`payPriceInput`、`note`

```html
<form action="http://order.gulimall.com/submitOrder" method="post">
   <input id="addrIdInput" name="addrId" type="hidden">
   <input id="payPriceInput" name="payPrice" type="hidden">
   <input name="note" type="hidden">
   <input name="orderToken" type="hidden" th:value="${orderConfirmData.orderToken}">
   <button class="tijiao" type="submit">提交订单</button>
</form>
```

![image-20220816163702202](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.1.3.png)

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里的`<script>`标签里，修改`getFare(addrId)`方法

```javascript
function getFare(addrId) {
   $.get("http://gulimall.com/api/ware/wareinfo/fare?addrId=" +addrId,function (resp) {
      //设置运费
      $("#fareEle").text(resp.data.fare)
      //设置应付金额
      var total = [[${#numbers.formatDecimal(orderConfirmData.total,1,2)}]]
      // total*1 将其转为数字类型
      var payPrice = total*1+resp.data.fare*1;
      $("#payPriceEle").text(payPrice)
      $("#payPriceInput").val(payPrice)
      //设置收货人信息
      $("#receiveAddressEle").text(resp.data.memberAddressVo.province+" "+resp.data.memberAddressVo.detailAddress)
      $("#receiveEle").text(resp.data.memberAddressVo.name)
      //给表单回填选中的地址
      $("#addrIdInput").val(addrId);
   })
}
```

![image-20220816163612907](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.1.4.png)

##### 2、提交订单

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包里新建`SubmitOrderResponseVo`类

```java
package com.atguigu.gulimall.order.vo;

import com.atguigu.gulimall.order.entity.OrderEntity;
import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@Data
public class SubmitOrderResponseVo {

    /**
     * 订单信息
     */
    private OrderEntity order;

    /**
     * 下单状态码(成功为0)
     */
    private Integer code;
}
```

![image-20220816164323519](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.web.OrderWebController`类里添加`submitOrder`方法

```java
@GetMapping("/submitOrder")
public String submitOrder(OrderSubmitVo vo) {

    SubmitOrderResponseVo responseVo = orderService.submitOrder(vo);

    //下单:去创建订单，验令牌，验价格，锁库存...
    if (responseVo.getCode()==0){
        //下单成功来到支付选择页
        return "pay";
    }else {
        //下单失败回到订单确认页重新确认订单信息
        return "redirect:http://order.gulimall.com/toTrade";
    }
}
```

![image-20220816164816816](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里添加`submitOrder`抽象方法

```java
SubmitOrderResponseVo submitOrder(OrderSubmitVo vo);
```

![image-20220816164843864](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.2.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里实现`submitOrder`方法

```java
@Override
public SubmitOrderResponseVo submitOrder(OrderSubmitVo vo) {
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();
    String key = OrderConstant.USER_ORDER_TOKEN_PREFIX + memberEntityTo.getId();

    SubmitOrderResponseVo response = new SubmitOrderResponseVo();
    OrderConfirmVo orderConfirmVo = new OrderConfirmVo();
    //下单:去创建订单，验令牌，验价格，锁库存...
    String orderToken = vo.getOrderToken();
    //验证并删除令牌[令牌的对比和删除必须保证原子性]
    //0:令牌失败  -  1:删除成功
    String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
    Long result = redisTemplate.execute(new DefaultRedisScript<Long>(script, Long.class), Collections.singletonList(key), orderToken);
    if (result==null || result == 0L) {
        //令牌验证失败
        response.setCode(1);
        return response;
    }
    //令牌验证成功

    return response;
}
```

![image-20220816182653968](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.2.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order`包里新建`to`文件夹，在`to`文件夹里新建`OrderCreateTo`类

```java
package com.atguigu.gulimall.order.to;

import com.atguigu.gulimall.order.entity.OrderEntity;
import com.atguigu.gulimall.order.entity.OrderItemEntity;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@Data
public class OrderCreateTo {

    /**
     * 订单实体类
     */
    private OrderEntity order;

    /**
     * 订单项
     */
    private List<OrderItemEntity> orderItems;

    /**
     * 运费
     */
    private BigDecimal fare;

    /**
     * 订单计算的应付价格
     */
    private BigDecimal payPrice;
}
```

![image-20220816183442814](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.2.5.png)

##### 3、创建订单

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里新建`createOrder`方法，然后`submitOrder`方法调用该`createOrder`方法

```java
private OrderCreateTo createOrder(){
    OrderCreateTo orderCreateTo = new OrderCreateTo();

    OrderEntity orderEntity = new OrderEntity();
    //订单号
    String orderSn = IdWorker.getTimeId();
    orderEntity.setOrderSn(orderSn);


    return orderCreateTo;
}
```

![image-20220816183954893](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.3.1.png)

将`2.分布式高级篇（微服务架构篇）\资料源码\代码` 里的 `enume`文件夹移动到`gulimall-order`模块里的`com.atguigu.gulimall.order`包下

![image-20220816185354565](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.3.2.png)

##### 4、获取运费

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareInfoController`类里已经有了一个计算运费的`getFare`方法了，因此直接调用即可

![image-20220816190556955](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.4.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign.WmsFeignService`接口里添加如下方法，用于获取运费

```java
/**
 * 根据addrId获取运费 和 MemberAddressVo
 * @param addrId
 * @return
 */
@GetMapping("/ware/wareinfo/fare")
public R getFare(Long addrId);
```

![image-20220816191017087](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.4.2.png)

复制`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo.FareVo`类，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包里。复制`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo.MemberAddressVo`类里的代码，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.vo.FareVo`类里，作为`FareVo`类的静态内部类

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@Data
public class FareVo {

    private MemberAddressVo memberAddressVo;

    private BigDecimal fare;


    @Data
    public static class MemberAddressVo {
        /**
         * id
         */
        private Long id;
        /**
         * member_id
         */
        private Long memberId;
        /**
         * 收货人姓名
         */
        private String name;
        /**
         * 电话
         */
        private String phone;
        /**
         * 邮政编码
         */
        private String postCode;
        /**
         * 省份/直辖市
         */
        private String province;
        /**
         * 城市
         */
        private String city;
        /**
         * 区
         */
        private String region;
        /**
         * 详细地址(街道)
         */
        private String detailAddress;
        /**
         * 省市区代码
         */
        private String areacode;
        /**
         * 是否默认
         */
        private Integer defaultStatus;
    }
}
```

![image-20220816191857675](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.4.3.png)

##### 5、获取spu信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SpuInfoController`类里添加`getSpuInfoBySkuId`方法

```java
@GetMapping("/skuId/{id}")
public R getSpuInfoBySkuId(@PathVariable("id") Long skuId) {
    SpuInfoEntity spuInfoEntity = spuInfoService.getSpuInfoBySkuId(skuId);
    return R.ok().put("data",spuInfoEntity);
}
```

![image-20220816212502224](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.5.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SpuInfoService`接口里添加`getSpuInfoBySkuId`抽象方法

```java
SpuInfoEntity getSpuInfoBySkuId(Long skuId);
```

![image-20220816212447308](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.5.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SpuInfoServiceImpl`类里实现`getSpuInfoBySkuId`方法

```java
@Override
public SpuInfoEntity getSpuInfoBySkuId(Long skuId) {
    SkuInfoEntity skuInfoEntity = skuInfoService.getById(skuId);
    return this.getById(skuInfoEntity.getSpuId());
}
```

![image-20220816212941842](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.5.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign`包里新建`ProductFeignService`类

```java
package com.atguigu.gulimall.order.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author 无名氏
 * @date 2022/8/16
 * @Description:
 */
@FeignClient("gulimall-product")
public interface ProductFeignService {

    @GetMapping("/product/spuinfo/skuId/{id}")
    public R getSpuInfoBySkuId(@PathVariable("id") Long skuId);
}
```

![image-20220816213313510](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.5.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包里新建`SpuInfoVo`类

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * spu信息
 */
@Data
public class SpuInfoVo implements Serializable {

   /**
    * 商品id
    */
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
   private Date createTime;
   private Date updateTime;

}
```

![image-20220816213449916](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.5.5.png)

[点击查看OrderServiceImpl类完整代码](code/6.1.4.3.5.java)

![image-20220817110820988](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.3.5.6.png)

#### 4、锁定库存

##### 1、添加To

在`gulimall-common`模块的`com.atguigu.common.to`类里新建`ware`文件夹，在`ware`文件夹里新建`WareSkuLockTo`类

```java
package com.atguigu.common.to.ware;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/17
 * @Description: 下订单后锁库存
 */
@Data
public class WareSkuLockTo {

    /**
     * 订单号
     */
    private String orderSn;

    /**
     * 需要锁的库存
     */
    private List<OrderItemVo> locks;

    /**
     * 订单项（某一个具体商品）
     */
    @Data
    public static class OrderItemVo{
        /**
         * sku的id
         */
        private Long skuId;
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
         */0-
        private BigDecimal totalPrice;
        /**
         * 货物重量
         */
        private BigDecimal weight;
    }
}
```

![image-20220817101843418](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.1.1.png)

在`gulimall-common`模块的`com.atguigu.common.to.ware`包里新建`WareLockStockResult`类

```java
package com.atguigu.common.to.ware;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/17
 * @Description:
 */
@Data
public class WareLockStockResult {

    /**
     * 要锁定的sku的id
     */
    private Long skuId;

    /**
     * 锁定了的件数
     */
    private Integer num;

    /**
     * 是否锁定成功
     */
    private Boolean locked;
}
```

![image-20220817104611655](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.1.2.png)

在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加枚举

```java
/**
 * 下订单锁库存，没有库存的异常
 */
NO_STOCK_EXCEPTION(21000,"商品库存不足");
```

![image-20220817151949968](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.1.3.png)

##### 2、锁订单

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareSkuController`类里添加`orderLockStock`方法

```java
/**
 * 下订单后。锁库存
 */
@PostMapping("/lock/order")
public R orderLockStock(@RequestBody WareSkuLockTo wareSkuLockTo){
    try {
        Boolean stock = wareSkuService.orderLockStock(wareSkuLockTo);
        return R.ok();
    } catch (Exception e) {
        e.printStackTrace();
        return R.error(BizCodeException.NO_STOCK_EXCEPTION);
    }
}
```

![image-20220817152357375](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareSkuService`接口里添加`orderLockStock`抽象方法

```java
Boolean orderLockStock(WareSkuLockTo wareSkuLockTo);
```

![image-20220817152455180](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.2.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里实现`orderLockStock`方法

```java
/**
 * 为订单锁定库存
 * @param wareSkuLockTo
 * @return
 */
@Transactional(rollbackFor = Exception.class)
@Override
public Boolean orderLockStock(WareSkuLockTo wareSkuLockTo) {
    //按照下单的收货地址，找到一-个就近仓库，锁定库存。

    //找到每个商品在哪个仓库都有库存
    List<WareSkuLockTo.OrderItemVo> locks = wareSkuLockTo.getLocks();
    List<SkuWareHasStock> collect = locks.stream().map(orderItemVo -> {
        SkuWareHasStock skuWareHasStock = new SkuWareHasStock();
        Long skuId = orderItemVo.getSkuId();
        skuWareHasStock.setSkuId(skuId);
        //select ware_id from wms_ware_sku where sku_id = 1 and stock - stock_locked > 0
        List<Long> wareId = wareSkuDao.listWareIdHasSkuStock(skuId);
        skuWareHasStock.setWareId(wareId);
        skuWareHasStock.setNum(orderItemVo.getCount());
        return skuWareHasStock;
    }).collect(Collectors.toList());

    //锁定库存
    for (SkuWareHasStock hasStock : collect) {
        boolean skuStocked = false;
        Long skuId = hasStock.getSkuId();
        List<Long> wareIds = hasStock.getWareId();
        //没有库存
        if (CollectionUtils.isEmpty(wareIds)) {
            throw new NoStockException(skuId);
        }
        //锁定库存
        for (Long wareId : wareIds) {
            //成功返回1，失败返回0
            //update wms_ware_sku set stock_locked = stock_locked+2 where sku_id=1 and ware_id = 1 and stock - stock_locked>=2
            Long count = wareSkuDao.lockSkuStock(skuId,wareId,hasStock.getNum());
            if(count==1){
                //锁库存成功
                skuStocked = true;
                break;
            }else {
                //锁库存成功
            }
        }
        if (!skuStocked){
            //当前商品没有库存了
            throw new NoStockException(skuId);
        }
    }
    return null;
}

/**
 * 判断哪些商品有库存
 */
@Data
class SkuWareHasStock{
    private Long skuId;
    private Integer num;
    private List<Long> wareId;
}
```

![image-20220817152941132](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.dao.WareSkuDao`接口里添加`listWareIdHasSkuStock`方法

```java
List<Long> listWareIdHasSkuStock(@Param("skuId") Long skuId);
```

![image-20220817152745903](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.4.png)

在`gulimall_wms`数据库的`wms_ware_sku`表里，修改`stock_locked`字段，设置默认值为`0`

![image-20220817114928233](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.5.png)

把`gulimall_wms`数据库的`wms_ware_sku`表里`stock_locked`字段为`null`的数据都修改为`0`

![image-20220817115030062](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.6.png)

在`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件里添加`sql`语句

```xml
<!--根据skuId查询有库存的仓库列表-->
<select id="listWareIdHasSkuStock" resultType="java.lang.Long">
    select ware_id from gulimall_wms.wms_ware_sku where sku_id = #{skuId} and stock - stock_locked > 0
</select>
```

![image-20220817153137023](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.7.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware`包里新建`exception`文件夹，在`exception`文件夹里新建`NoStockException`异常类，用于抛出`没有库存异常`

```java
package com.atguigu.gulimall.ware.exception;

/**
 * @author 无名氏
 * @date 2022/8/17
 * @Description:
 */
public class NoStockException extends RuntimeException {

    private Long skuId;

    public NoStockException(Long skuId) {
        super("商品id："+ skuId +"；没有足够的库存了");
    }

    public Long getSkuId() {
        return skuId;
    }

    public void setSkuId(Long skuId) {
        this.skuId = skuId;
    }
}
```

![image-20220817153453382](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.2.8.png)

##### 3、锁订单

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.dao.WareSkuDao`接口里添加`lockSkuStock`方法

```java
//锁库存
Long lockSkuStock(@Param("skuId") Long skuId, @Param("wareId") Long wareId, @Param("num") Integer num);
```

![image-20220817153633817](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.3.1.png)

在`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件里添加sql

```xml
<update id="lockSkuStock">
    update gulimall_wms.wms_ware_sku set stock_locked = stock_locked+#{num}
    where sku_id=#{skuId} and ware_id = #{wareId} and stock - stock_locked>=#{num}
</update>
```

![image-20220817153901584](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.3.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign.WmsFeignService`接口里添加`orderLockStock`方法

```java
/**
 * 下订单后。锁库存
 */
@PostMapping("/ware/waresku/lock/order")
public R orderLockStock(@RequestBody WareSkuLockTo wareSkuLockTo);
```

![image-20220817105457951](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.3.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里修改`submitOrder`方法

[点击查看OrderServiceImpl类完整代码](code/6.1.4.4.3.java)

```java
@Transactional(rollbackFor = Exception.class)
@Override
public SubmitOrderResponseVo submitOrder(OrderSubmitVo vo) {
    orderSubmitVoThreadLocal.set(vo);
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();
    String key = OrderConstant.USER_ORDER_TOKEN_PREFIX + memberEntityTo.getId();

    SubmitOrderResponseVo response = new SubmitOrderResponseVo();
    //下单:去创建订单，验令牌，验价格，锁库存...
    String orderToken = vo.getOrderToken();
    //验证并删除令牌[令牌的对比和删除必须保证原子性]
    //0:令牌失败  -  1:删除成功
    String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
    Long result = redisTemplate.execute(new DefaultRedisScript<Long>(script, Long.class), Collections.singletonList(key), orderToken);
    if (result == null || result == 0L) {
        //令牌验证失败
        response.setCode(1);
        return response;
    }
    //令牌验证成功
    //创建订单
    OrderCreateTo orderCreateTo = createOrder();
    //验价
    if (Math.abs(orderCreateTo.getPayPrice().subtract(vo.getPayPrice()).doubleValue()) < 0.01) {
        //保存订单
        this.saveOrder(orderCreateTo);
        //锁定库存
        WareSkuLockTo wareSkuLockTo = new WareSkuLockTo();
        wareSkuLockTo.setOrderSn(orderCreateTo.getOrder().getOrderSn());
        List<WareSkuLockTo.OrderItemVo> orderItemVos = orderCreateTo.getOrderItems().stream().map(orderItemEntity -> {
            WareSkuLockTo.OrderItemVo orderItemVo = new WareSkuLockTo.OrderItemVo();
            orderItemVo.setSkuId(orderItemEntity.getSkuId());
            orderItemVo.setCount(orderItemEntity.getSkuQuantity());
            orderItemVo.setTitle(orderItemEntity.getSkuName());
            return orderItemVo;
        }).collect(Collectors.toList());
        wareSkuLockTo.setLocks(orderItemVos);
        R r = wmsFeignService.orderLockStock(wareSkuLockTo);
        if (r.getCode() == 0) {
            //锁定库存成功
            response.setCode(0);
            response.setOrder(orderCreateTo.getOrder());
            return response;
        } else {
            //锁定库存失败
            response.setCode(3);
            return response;
        }
    } else {
        //金额对比失败
        response.setCode(2);
        return response;
    }
}
```

![image-20220817154720295](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.4.3.4.png)

#### 5、准备支付

##### 1、修改页面

修改`gulimall-order`模块的`com.atguigu.gulimall.order.web.OrderWebController`类的`submitOrder`方法

```java
@GetMapping("/submitOrder")
public String submitOrder(OrderSubmitVo vo,Model model) {

    SubmitOrderResponseVo responseVo = orderService.submitOrder(vo);

    //下单:去创建订单，验令牌，验价格，锁库存...
    if (responseVo.getCode()==0){
        //下单成功来到支付选择页
        model.addAttribute("submitOrderResp",responseVo);
        return "pay";
    }else {
        //下单失败回到订单确认页重新确认订单信息
        return "redirect:http://order.gulimall.com/toTrade";
    }
}
```

![image-20220817155110204](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.1.1.png)

在  http://order.gulimall.com/toTrade  页面里，打开控制台，定位到`订单提交成功，请尽快付款！订单号：`位置，复制`订单号`

![image-20220817204439779](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.1.2.png)

在`gulimall-order`模块的`src/main/resources/templates/pay.html`文件里搜索`订单号`，修改成动态的订单号和金额数据

```java
<dd>
  <span>订单提交成功，请尽快付款！订单号：[[${submitOrderResp.order.orderSn}]]</span>
  <span>应付金额<font> [[${#numbers.formatDecimal(submitOrderResp.order.payAmount,1,2)}]]</font>元</span>
</dd>
```

![image-20220817180337325](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.1.3.png)

##### 2、POST 请求方式不支持

重启`GulimallProductApplication`服务，`GulimallOrderApplication`服务、`GulimallWareApplication`服务、`GulimallCartApplication`服务

浏览器访问  http://order.gulimall.com/submitOrder  页面，报了`POST 请求方式不支持`

```
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Wed Aug 17 18:04:07 CST 2022
There was an unexpected error (type=Method Not Allowed, status=405).
Request method 'POST' not supported
```

![image-20220817180443080](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.web.OrderWebController`类的`submitOrder`方法上，将`@GetMapping("/submitOrder")`修改为`@PostMapping("/submitOrder")`

![image-20220817180649139](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.2.2.png)

##### 3、方法不被允许

重启`GulimallOrderApplication`服务，登陆后，在 http://cart.gulimall.com/cart.html 购物页面里点击`去结算`，然后再 http://order.gulimall.com/toTrade 页面里点击`提交订单`，此时跳转到 http://order.gulimall.com/submitOrder 页面，并报了个错

![GIF 2022-8-17 18-52-54](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.3.1.gif)

在  http://order.gulimall.com/submitOrder  页面里报了如下错误，读取`WmsFeignService#getFare(Long)`失败

```
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Wed Aug 17 18:08:07 CST 2022
There was an unexpected error (type=Internal Server Error, status=500).
status 405 reading WmsFeignService#getFare(Long)
```

![image-20220817180834600](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.3.2.png)

查看`GulimallOrderApplication`服务的控制台，提示`WmsFeignService#getFare(Long)`方法不被允许

```bash
2022-08-17 18:52:37.101 ERROR 12336 --- [nio-9000-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is feign.FeignException$MethodNotAllowed: status 405 reading WmsFeignService#getFare(Long)] with root cause

feign.FeignException$MethodNotAllowed: status 405 reading WmsFeignService#getFare(Long)
	at feign.FeignException.errorStatus(FeignException.java:100) ~[feign-core-10.2.3.jar:na]
	at feign.FeignException.errorStatus(FeignException.java:86) ~[feign-core-10.2.3.jar:na]
	at feign.codec.ErrorDecoder$Default.decode(ErrorDecoder.java:93) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:149) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:78) ~[feign-core-10.2.3.jar:na]
	at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:103) ~[feign-core-10.2.3.jar:na]
	at com.sun.proxy.$Proxy105.getFare(Unknown Source) ~[na:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.buildOrder(OrderServiceImpl.java:282) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.createOrder(OrderServiceImpl.java:208) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.submitOrder(OrderServiceImpl.java:150) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl$$FastClassBySpringCGLIB$$99092a92.invoke(<generated>) ~[classes/:na]
```

![image-20220817185533072](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.3.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.feign.WmsFeignService`类的`getFare`方法上，明明使用的是`@GetMapping("/ware/wareinfo/fare")`调用的远程服务，`GulimallWareApplication`服务的控制台却显示` Request method 'POST' not supported`

![image-20220817185417882](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.3.4.png)

可以看到调用远程的`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareInfoController`类的`getFare`方法也使用的是`@GetMapping("/fare")`，都使用的是`@GetMapping`应该是可以成功的啊

```
2022-08-17 18:52:37.086  WARN 15556 --- [io-11000-exec-9] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.HttpRequestMethodNotSupportedException: Request method 'POST' not supported]
```

![image-20220817185423112](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.3.5.png)

##### 4、源码调试

调试发现，`R r = wmsFeignService.getFare(orderSubmitVo.getAddrId());`方法调用的远程服务的`addrId=1`，

此时的`feign.ReflectiveFeign.FeignInvocationHandler#invoke`方法的`proxy`参数里，`h`->`target`->`type`的`name`即为`gulimall-order`模块的`com.atguigu.gulimall.order.feign.WmsFeignService`远程调用`gulimall-ware`模块的类

`h`->`target`的`name`即为要调用的`模块名`，`h`->`target`的`url`即为要调用的`GulimallWareApplication`服务的`url`(负载均衡到`gulimall-ware`模块)

`h`->`dispatch`为`LinkedHashMap`类型的`WmsFeignService`类的所有方法集合，`key`为`Method`类型，该`Method`类的`name`即为方法名，`returnType`即为返回类型

![image-20220817193013509](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.1.png)

`h`->`dispatch`里随便点击一个类，这个类的`value`为`feign.SynchronousMethodHandler`类型，里面的`target`和`proxy`参数的`h`->`target`差不多

![image-20220817193326956](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.2.png)

由此可知`h`->`target`->`type`->`name`即为远程调用接口的全类名，`@FeignClient("gulimall-ware")`与`feign.ReflectiveFeign.FeignInvocationHandler#invoke`方法的`proxy`参数的`h`->`target`->`name`对应

`h`->`dispatch`为该类的方法的信息

![image-20220817191539584](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.3.png)

`method`即为该方法的信息

![image-20220817191852111](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.4.png)

`argv`即为调用该方法传递的参数

![image-20220817191922868](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.5.png)

此时的`feign.SynchronousMethodHandler#invoke`方法的`argv`里面已经有`attrId`的`1`了，而`template`的`queries`里竟然没有数据

![image-20220817184436790](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.6.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.feign.WmsFeignService`类的`getFare`方法的参数，给`Long addrId`参数加上`@RequestParam("addrId")`注解，向`feign`指明把`addrId`放在请求参数里

```java
/**
 * 根据addrId获取运费 和 MemberAddressVo
 * @param addrId
 * @return
 */
@GetMapping("/ware/wareinfo/fare")
public R getFare(@RequestParam("addrId") Long addrId);
```

![image-20220817194254066](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.7.png)

 修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.controller.WareInfoController`类的`getFare`方法的参数，给`Long addrId`参数加上`@RequestParam("addrId")`注解（其实这个指不指定都行，`Spring MVC`会从请求参数里获取数据，亲测）

```java
@GetMapping("/fare")
public R getFare(@RequestParam("addrId") Long addrId) {
    FareVo fare = wareInfoService.getFare(addrId);
    return R.ok().put("data", fare);
}
```

![image-20220817194456765](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.8.png)

重启`GulimallOrderApplication`服务和`GulimallWareApplication`服务，重新调试，可以看到`queries`里已经封装请求参数`addrId=1`了

![image-20220817184419186](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.4.9.png)

##### 5、空指针

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`submitOrder`方法里报了空指针，`orderEntity`的`growth`字段是后面才赋值的，这里用错类了，应该使用`orderItemEntity`对象的`giftGrowth`字段

```
java.lang.NullPointerException: null
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.computePrice(OrderServiceImpl.java:248) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.createOrder(OrderServiceImpl.java:212) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.submitOrder(OrderServiceImpl.java:150) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl$$FastClassBySpringCGLIB$$99092a92.invoke(<generated>) ~[classes/:na]
```

![image-20220817195509778](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.5.1.png)

将`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`submitOrder`方法里的`giftGrowth = giftGrowth.add(new BigDecimal(orderEntity.getGrowth().toString()));`改为`giftGrowth = giftGrowth.add(new BigDecimal(orderItemEntity.getGiftGrowth().toString()));`

![image-20220817195832260](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.5.2.png)

##### 6、`order_sn`字段太长

重启`GulimallOrderApplication`服务，再次测试， 在  http://order.gulimall.com/submitOrder 页面里又报错了

`Data too long for column 'order_sn' at row 1 ;`插入的`order_sn`字段太长

```bash
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Wed Aug 17 20:01:45 CST 2022
There was an unexpected error (type=Internal Server Error, status=500).
### Error updating database. Cause: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1 ### The error may exist in com/atguigu/gulimall/order/dao/OrderDao.java (best guess) ### The error may involve com.atguigu.gulimall.order.dao.OrderDao.insert-Inline ### The error occurred while setting parameters ### SQL: INSERT INTO oms_order ( integration_amount, order_sn, receiver_province, auto_confirm_day, coupon_amount, modify_time, receiver_phone, pay_amount, delete_status, member_username, member_id, freight_amount, receiver_detail_address, total_amount, integration, growth, promotion_amount, status ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ### Cause: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1 ; Data truncation: Data too long for column 'order_sn' at row 1; nested exception is com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1
```

![image-20220817200247339](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.1.png)

查看`GulimallOrderApplication`服务的控制台，可以发现是·1`order_sn`字段太长导致的

```bash
2022-08-17 20:01:45.700 ERROR 8480 --- [nio-9000-exec-3] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.dao.DataIntegrityViolationException: 
### Error updating database.  Cause: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1
### The error may exist in com/atguigu/gulimall/order/dao/OrderDao.java (best guess)
### The error may involve com.atguigu.gulimall.order.dao.OrderDao.insert-Inline
### The error occurred while setting parameters
### SQL: INSERT INTO oms_order  ( integration_amount, order_sn,   receiver_province,    auto_confirm_day,  coupon_amount, modify_time, receiver_phone,  pay_amount,   delete_status, member_username,    member_id, freight_amount,    receiver_detail_address,     total_amount,   integration, growth, promotion_amount, status )  VALUES  ( ?, ?,   ?,    ?,  ?, ?, ?,  ?,   ?, ?,    ?, ?,    ?,     ?,   ?, ?, ?, ? )
### Cause: com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1
; Data truncation: Data too long for column 'order_sn' at row 1; nested exception is com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1] with root cause

com.mysql.cj.jdbc.exceptions.MysqlDataTruncation: Data truncation: Data too long for column 'order_sn' at row 1
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:104) ~[mysql-connector-java-8.0.17.jar:8.0.17]
    ......
	at com.sun.proxy.$Proxy90.insert(Unknown Source) ~[na:na]
	at com.baomidou.mybatisplus.extension.service.impl.ServiceImpl.save(ServiceImpl.java:104) ~[mybatis-plus-extension-3.2.0.jar:3.2.0]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.saveOrder(OrderServiceImpl.java:192) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.submitOrder(OrderServiceImpl.java:154) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl$$FastClassBySpringCGLIB$$99092a92.invoke(<generated>) ~[classes/:na]
```

![image-20220817200409669](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.2.png)

在`gulimall_oms`数据库的`oms_order`表里，将`order_sn`字段的长度从`32`改为`64`

![image-20220817175736784](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.3.png)

在`gulimall_oms`数据库的`oms_order_item`表里，将`order_sn`字段的长度从`32`改为`64`

![image-20220817180142436](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.4.png)

刷新`http://order.gulimall.com/toTrade`（不用重启任何服务），选择第二个收货地址，点击提交订单，可以看到已经生成了`订单号`和`应付价格`，`gulimall_oms`数据库的`oms_order`表已经生成了一条订单数据，`gulimall_oms`数据库的`oms_order_item`表生成了两条订单项数据

![GIF 2022-8-17 20-15-55](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.5.gif)

此时`gulimall_wms`数据库的`wms_ware_sku`表的`华为 HUAWEI Mate30Pro 罗兰紫 8GB+128GB`已经锁住了`3`件库存，`苹果手机`已经锁了`5`件库存

![image-20220817201941776](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.6.png)

与 http://order.gulimall.com/toTrade 页面里显示的一样

![image-20220817202717979](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.5.6.7.png)

#### 6、完善细节

##### 1、添加下单提示信息

在`gulimall-order`模块的`com.atguigu.gulimall.order.web.OrderWebController`类里，修改`submitOrder`方法

```java
@PostMapping("/submitOrder")
public String submitOrder(OrderSubmitVo vo, Model model, RedirectAttributes redirectAttributes) {

    SubmitOrderResponseVo responseVo = orderService.submitOrder(vo);

    //下单:去创建订单，验令牌，验价格，锁库存...
    if (responseVo.getCode()==0){
        //下单成功来到支付选择页
        model.addAttribute("submitOrderResp",responseVo);
        return "pay";
    }else {
        //下单失败回到订单确认页重新确认订单信息
        String msg = "下单失败，";
        //成功为0,令牌验证失败为1,金额对比失败为2,锁定库存失败为3
        switch (responseVo.getCode()){
            case 1: msg+="订单信息过期，请刷新页面再提交"; break;
            case 2: msg+="订单商品发送变化，请刷新页面重新获取订单信息";break;
            case 3: msg+="库存锁定失败，商品库存不足";break;
            default: msg+="未知异常，请刷新重试";
        }
        redirectAttributes.addFlashAttribute("msg",msg);
        return "redirect:http://order.gulimall.com/toTrade";
    }
}
```

![image-20220817204257627](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.1.png)

重启`GulimallOrderApplication`服务，在 http://order.gulimall.com/toTrade 页面里，就显示`填写并核对订单信息`了

![image-20220817204530158](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.2.png)

~~因为`redirectAttributes.addFlashAttribute("msg",msg);`模拟了`session`可以在`session`里获取`msg`~~（亲测不行），默认给请求域也放了数据直接使用`msg`也能获取数据

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`填写并核对订单信息`，修改为如下代码

```html
<p class="p1">填写并核对订单信息 <span style="color: red" th:if="${msg!=null}" th:text="${msg}"></span></p>
```

![image-20220817210345342](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.3.png)

在`gulimall_wms`数据库的`wms_ware_sku`表里，修改锁定的库存数，让库存数和锁定的库存数相等

![image-20220817205416928](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.4.png)

重启`GulimallOrderApplication`服务，打开 http://order.gulimall.com/toTrade 页面，点击提交订单，提示`下单失败，库存锁定失败，商品库存不足`

![image-20220817210253467](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.5.png)

在`gulimall_oms`数据库的`oms_order`表里，此时还在创建一个订单

![image-20220817210145779](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.6.png)

在`gulimall_oms`数据库的`oms_order_item`表里，也创建了2个订单项

![image-20220817210148087](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.7.png)

在`gulimall_wms`数据库的`wms_ware_sku`表里，此时的锁定库存的数量不变

![image-20220817210806734](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.1.8.png)

##### 2、完善信息

在`gulimall-order`模块的`src/main/resources/templates/confirm.html`文件里搜索`填写并核对订单信息`，可以在`session`中获取`msg`，在`<p>`标签里的`填写并核对订单信息`后面添加`<span style="color: red" th:if="${session.msg!=null}" th:text="${session.msg}"></span>`

```html
<p class="p1">填写并核对订单信息 <span style="color: red" th:if="${session.msg!=null}" th:text="${session.msg}"></span></p>
```

![image-20220817205933229](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.2.1.png)

点击`Build` -> `Recompile 'confirm.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件，显示了错误的消息：`请先进行登录`

![image-20220817205821210](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.2.2.png)

而调试是显示`"下单失败，库存锁定失败，商品库存不足"`

![image-20220817210711752](https://gitlab.com/apzs/image/-/raw/master/image/6.1.4.6.2.3.png)

所以此方法不适用

## 6.2、分布式事务

### 6.2.1、分布式事务理论

![image-20220817212136730](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.0.png)

**事务保证：**

1、订单服务异常，库存锁定不运行，全部回滚， 撤销操作

2、库存服务事务自治，锁定失败全部回滚，订单感受到异常，继续回滚

3、库存服务锁定成功了，但是网络原因返回数据途中问题？ 

订单服务检测到报了`READ TIMEOUT`读取超时异常，订单服务回滚了，而库存服务没回滚

4、库存服务锁定成功了，库存服务下面的逻辑发生故障，订单回滚了，怎么处理？

此时订单服务回滚了，而库存服务没有回滚

**利用消息队列实 现最终一致**

库存服务锁定成功后发给消息队列消息（当前库存工作单），过段时间自动解锁，解锁时先查询 订单的支付状态。解锁成功修改库存工作单详情 项状态为已解锁

1、远程服务假失败：

远程服务其实成功了，由于网络故障等没有返回 导致：订单回滚，库存却扣减

2、远程服务执行完成，下面的其他方法出现问题

导致：已执行的远程请求，肯定不能回滚

本地事务，在分布式系统，只能控制住自己的回滚，控制不了其他服务的回滚
分布式事务: 最大原因。网络问题+分布式机器。

同一个Service也可以，只不过调用不能直接调，需要把当前Service通过@AutoWired注入进来调用，不过会循环依赖

**本地事务失效问题**
同一个对象内事务方法互调默认失效，原因绕过了代理对象，事务使用代理对象来控制的
解决:使用代理对象来调用事务方法
1)、引入`aop-starter`；`spring-boot-starter-aop` 引入了`aspectj`
2)、`@EnableAspectJAutoProxy(exposeProxy = true)`开启`aspectj`动态代理功能。以后所有的动态代理都是`aspectj`创建的。(即使没有接口也可以创建动态代理) 对外暴露代理对象，然后本类互调用代理对象

#### 1、本地事务

##### 1、事务的基本性质

数据库事务的几个特性：原子性(Atomicity )、一致性( Consistency )、隔离性或独立性( Isolation)
和持久性(Durabilily)，简称就是 ACID；

- 原子性：一系列的操作整体不可拆分，要么同时成功，要么同时失败

- 一致性：数据在事务的前后，业务整体一致。
  - 转账。A:1000；B:1000；	转 200	事务成功;	A：800	B：1200

- 隔离性：事务之间互相隔离。

- 持久性：一旦事务成功，数据一定会落盘在数据库。

在以往的单体应用中，我们多个业务操作使用同一条连接操作不同的数据表，一旦有异常，   我们可以很容易的整体回滚；
Business：我们具体的业务代码Storage：库存业务代码；扣库存Order：订单业务代码；保存订单Account：账号业务代码；减账户余额
比如买东西业务，扣库存，下订单，账户扣款，是一个整体；必须同时成功或者失败  一个事务开始，代表以下的所有操作都在同一个连接里面；

![image-20220818091044010](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.1.1.png)





```java
@Transactional(rollbackFor = Exception.class,isolation = Isolation.REPEATABLE_READ,propagation = Propagation.REQUIRED,timeout = 30)
```

##### 2、事务的隔离级别

READ UNCOMMITTED（读未提交）
该隔离级别的事务会读到其它未提交事务的数据，此现象也称之为脏读。
 READ COMMITTED（读已提交）
一个事务可以读取另一个已提交的事务，多次读取会造成不一样的结果，此现象称为不可重   复读问题，Oracle 和 SQL Server 的默认隔离级别。
REPEATABLE READ（可重复读）
该隔离级别是 MySQL 默认的隔离级别，在同一个事务里，select 的结果是事务开始时时间点的状态，因此，同样的 select  操作读到的结果会是一致的，但是，会有幻读现象。MySQL 的 InnoDB 引擎可以通过 next-key locks 机制（参考下文"行锁的算法"一节）来避免幻读。
SERIALIZABLE（序列化）
在该隔离级别下事务都是串行顺序执行的，MySQL 数据库的 InnoDB 引擎会给读操作隐式加一把读共享锁，从而避免了脏读、不可重读复读和幻读问题。

##### 3、事务的传播行为

1、`PROPAGATION_REQUIRED`：如果当前没有事务，就创建一个新事务，如果当前存在事务， 就加入该事务，该设置是最常用的设置。
2、`PROPAGATION_SUPPORTS`：支持当前事务，如果当前存在事务，就加入该事务，如果当   前不存在事务，就以非事务执行。
3、`PROPAGATION_MANDATORY`：支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就抛出异常。
4、`PROPAGATION_REQUIRES_NEW`：创建新事务，无论当前存不存在事务，都创建新事务。
5、`PROPAGATION_NOT_SUPPORTED`：以非事务方式执行操作，如果当前存在事务，就把当  前事务挂起。
6、`PROPAGATION_NEVER`：以非事务方式执行，如果当前存在事务，则抛出异常。
7、`PROPAGATION_NESTED`：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务， 则执行与 PROPAGATION_REQUIRED 类似的操作。

##### 4、SpringBoot 事务关键点

1、事务的自动配置
`TransactionAutoConfiguration`
2、事务的坑
在同一个类里面，编写两个方法，内部调用的时候，会导致事务设置失效。原因是没有用到代理对象的缘故。解决：
1）、导入 `spring-boot-starter-aop`
2）、`@EnableTransactionManagement(proxyTargetClass = true)`
3）、`@EnableAspectJAutoProxy(exposeProxy=true)`
4）、`AopContext.currentProxy()` 调用方法

#### 2、分布式事务

##### 1、为什么有分布式事务

分布式系统经常出现的异常
机器宕机、网络异常、消息丢失、消息乱序、数据错误、不可靠的 TCP、存储数据丢失...

![image-20220818091630425](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.2.1.png)

分布式事务是企业集成中的一个技术难点，也是每一个分布式系统架构中都会涉及到的一个东西，特别是在微服务架构中，几乎可以说是无法避免。

##### 2、CAP 定理与 BASE 理论

1、CAP 定理
CAP 原则又称 CAP 定理，指的是在一个分布式系统中

- 一致性（Consistency）：在分布式系统中的所有数据备份，在同一时刻是否同样的值。（等同于所有节点访  问同一份最新的数据副本）

- 可用性（Availability）：在集群中一部分节点故障后，集群整体是否还能响应客户端的读写请求。（对数据  更新具备高可用性）

- 分区容错性（Partition tolerance）：大多数分布式系统都分布在多个子网络。每个子网络就叫做一个区（partition）。分区容错的意思是，区间通信可能失败。比如，一台服务器放在中国，另一台服务  器放在美国，这就是两个区，它们之间可能无法通信。

CAP 原则指的是，这三个要素最多只能同时实现两点，不可能三者兼顾。

![image-20220818091656130](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.2.2.png)

一般来说，分区容错无法避免，因此可以认为 CAP 的 P 总是成立。CAP 定理告诉我们， 剩下的 C 和 A 无法同时做到。
分布式系统中实现一致性的 raft 算法、paxos

raft算法动画演示： http://thesecretlivesofdata.com/raft/

2、面临的问题

对于多数大型互联网应用的场景，主机众多、部署分散，而且现在的集群规模越来越大，所   以节点故障、网络故障是常态，而且要保证服务可用性达到 99.99999%（N 个 9），即保证P 和 A，舍弃 C。

##### 3、BASE 理论

是对 CAP 理论的延伸，思想是即使无法做到强一致性（CAP 的一致性就是强一致性），但可以采用适当的采取弱一致性，即最终一致性。BASE 是指

- 基本可用（Basically Available）
  基本可用是指分布式系统在出现故障的时候，允许损失部分可用性（例如响应时间、  功能上的可用性），允许损失部分可用性。需要注意的是，基本可用绝不等价于系统不可用。
  响应时间上的损失：正常情况下搜索引擎需要在 0.5 秒之内返回给用户相应的查询结果，但由于出现故障（比如系统部分机房发生断电或断网故障），查询  结果的响应时间增加到了 1~2 秒。
  功能上的损失：购物网站在购物高峰（如双十一）时，为了保护系统的稳定性，  部分消费者可能会被引导到一个降级页面。

- 软状态（ Soft State）
  软状态是指允许系统存在中间状态，而该中间状态不会影响系统整体可用性。分布  式存储中一般一份数据会有多个副本，允许不同副本同步的延时就是软状态的体  现。mysql replication 的异步复制也是一种体现。

- 最终一致性（ Eventual Consistency）
  最终一致性是指系统中的所有数据副本经过一定时间后，最终能够达到一致的状  态。弱一致性和强一致性相反，最终一致性是弱一致性的一种特殊情况。

##### 4、强一致性、弱一致性、最终一致性

从客户端角度，多进程并发访问时，更新过的数据在不同进程如何获取的不同策略，决定了不同的一致性。对于关系型数据库，要求更新过的数据能被后续的访问都能看到，这是强一致性。如果能容忍后续的部分或者全部访问不到，则是弱一致性。如果经过一段时间后要求   能访问到更新后的数据，则是最终一致性

[点击老师讲的文字](code/6.2.1.3.txt)

#### 3、分布式事务几种方案

##### 1、2PC 模式

数据库支持的 2PC【2 phase commit 二阶提交】，又叫做 XA Transactions。MySQL 从 5.5 版本开始支持，SQL Server 2005 开始支持，Oracle 7 开始支持。其中，XA 是一个两阶段提交协议，该协议分为以下两个阶段：
第一阶段：事务协调器要求每个涉及到事务的数据库预提交(precommit)此操作，并反映是否可以提交.
第二阶段：事务协调器要求每个数据库提交数据。
其中，如果有任何一个数据库否决此次提交，那么所有数据库都会被要求回滚它们在此事务中的那部分信息。

![image-20220818115351211](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.3.1.png)



- XA 协议比较简单，而且一旦商业数据库实现了 XA 协议，使用分布式事务的成本也比较低。

- XA 性能不理想，特别是在交易下单链路，往往并发量很高，XA 无法满足高并发场景

- XA 目前在商业数据库支持的比较理想，在 mysql 数据库中支持的不太理想，mysql 的
  XA 实现，没有记录 prepare 阶段日志，主备切换回导致主库与备库数据不一致。

- 许多 nosql 也没有支持 XA，这让 XA 的应用场景变得非常狭隘。

- 也有 3PC，引入了超时机制（无论协调者还是参与者，在向对方发送请求后，若长时间未收到回应则做出相应处理）

##### 2、柔性事务-TCC 事务补偿型方案

刚性事务：遵循 ACID 原则，强一致性。
柔性事务：遵循 BASE 理论，最终一致性；
与刚性事务不同，柔性事务允许一定时间内，不同节点的数据不一致，但要求最终一致。

![image-20220818151958893](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.3.2.1.png)

一阶段 prepare 行为：调用 自定义 的 prepare 逻辑。

二阶段 commit 行为：调用 自定义 的 commit 逻辑。

二阶段 rollback 行为：调用 自定义 的 rollback 逻辑。
所谓 TCC 模式，是指支持把 自定义的分支事务纳入到全局事务的管理中。

![image-20220818152019083](https://gitlab.com/apzs/image/-/raw/master/image/6.2.1.3.2.2.png)





##### 3、柔性事务-最大努力通知型方案

按规律进行通知，不保证数据一定能通知成功，但会提供可查询操作接口进行核对。这种  方案主要用在与第三方系统通讯时，比如：调用微信或支付宝支付后的支付结果通知。这种方案也是结合 MQ 进行实现，例如：通过 MQ 发送 http 请求，设置最大通知次数。达到通知次数后即不再通知。
案例：银行通知、商户通知等（各大交易业务平台间的商户通知：多次通知、查询校对、对账文件），支付宝的支付成功异步回调

##### 4、柔性事务-可靠消息+最终一致性方案（异步确保型）

实现：业务处理服务在业务事务提交之前，向实时消息服务请求发送消息，实时消息服务只   记录消息数据，而不是真正的发送。业务处理服务在业务事务提交之后，向实时消息服务确   认发送。只有在得到确认发送指令后，实时消息服务才会真正发送。
防止消息丢失：

```mysql
/**
 *1、做好消息确认机制（pulisher，consumer【手动ack】）
 *2、每一个发送的消息都在数据库做好记录。定期将失败的消息再次发送一遍
 */
CREATE TABLE `mq_message` (
`message_id` char(32) NOT NULL,
`content` text,
`to_exchane` varchar(255) DEFAULT NULL,
`routing_key` varchar(255) DEFAULT NULL,
`class_type` varchar(255) DEFAULT NULL,
`message_status` int(1) DEFAULT '0' COMMENT '0-新建 1-已发送 2-错误抵达 3-已抵达',
`create_time` datetime DEFAULT NULL,
`update_time` datetime DEFAULT NULL, PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```

### 6.2.2、Seata做分布式事务

#### 1、Seata 简介

##### 1、简介

Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。 

[点击查看完整介绍](code/6.2.2-Seata.md)

![145942191-7a2d469f-94c8-4cd2-8c7e-46ad75683636](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.1.1.png)

##### 2、Spring Cloud 中使用 Seata

Spring Cloud 中使用 Seata，使用 Feign 实现远程调用，使用 Spring Jpa 访问 MySQL 数据库

###### 准备工作

1. 执行`sql/all_in_one.sql`
2. 下载最新版本的 [Seata Sever](https://github.com/seata/seata/releases)
3. 解压并启动 Seata server

```
unzip seata-server-xxx.zip

cd distribution
sh ./bin/seata-server.sh 8091 file
```

1. 启动 Account, Order, Stock, Business 服务

> 数据库配置的用户名和密码是 `root`和`123456`，因为没有使用注册中心，所有的 Feign 的配置都是 `127.0.0.1+端口`，如果不同请手动修改

###### 测试

- 无错误成功提交

```
curl http://127.0.0.1:8084/purchase/commit
```

完成后可以看到数据库中 `account_tbl`的`id`为1的`money`会减少 5，`order_tbl`中会新增一条记录，`stock_tbl`的`id`为1的`count`字段减少 1

- 发生异常事务回滚

```
curl http://127.0.0.1:8084/purchase/rollback
```

此时 account-service 会抛出异常，发生回滚，待完成后数据库中的数据没有发生变化，回滚成功

###### 注意

- 注入 DataSourceProxy

因为 Seata 通过代理数据源实现分支事务，如果没有注入，事务无法成功回滚

```java
@Configuration
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DruidDataSource druidDataSource() {
        return new DruidDataSource();
    }

    /**
     * 需要将 DataSourceProxy 设置为主数据源，否则事务无法回滚
     *
     * @param druidDataSource The DruidDataSource
     * @return The default datasource
     */
    @Primary
    @Bean("dataSource")
    public DataSource dataSource(DruidDataSource druidDataSource) {
        return new DataSourceProxy(druidDataSource);
    }
}
```

- file.conf 的 service.vgroup_mapping 配置必须和`spring.application.name`一致

在 `org.springframework.cloud:spring-cloud-starter-alibaba-seata` 的`org.springframework.cloud.alibaba.seata.GlobalTransactionAutoConfiguration` 类中，默认会使用 `${spring.application.name}-fescar-service-group`作为服务名注册到 Seata Server上，如果和`file.conf` 中的配置不一致，会提示 `no available server to connect`错误

也可以通过配置 `spring.cloud.alibaba.seata.tx-service-group`修改后缀，但是必须和`file.conf`中的配置保持一致

#### 2、使用

##### 1、执行sql

在`gulimall_wms`数据库中执行如下`sql`（这个`gulimall_wms`数据库已经有`undo_log`表了，就不用执行了）

```mysql
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

`gulimall_wms`数据库中已经有这个`undo_log`表了

![image-20220818155419144](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.1.1.png)

在`gulimall_ums`数据库中执行刚刚的`sql`

![image-20220818155747126](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.1.2.png)

在`gulimall_sms`数据库中执行刚刚的`sql`

![image-20220818155611118](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.1.3.png)

在`gulimall_pms`数据库中执行刚刚的`sql`

![image-20220818155647377](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.1.4.png)

在`gulimall_oms`数据库中执行刚刚的`sql`

![image-20220818155831850](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.1.5.png)

在`gulimall_admin`数据库中执行刚刚的`sql`

![image-20220818155909811](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.1.6.png)

##### 2、添加seata依赖

在`gulimall-common`模块的`pom.xml`文件里添加seata依赖

```xml
<!--导入seata-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

![image-20220818161033208](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.2.1.png)

导入这个依赖后，会自动导入`spring-cloud-alibaba-seata-2.1.0.RELEASE.jar`

![image-20220818161335491](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.2.2.png)

和`seata-all-0.7.1.jar`，需要注意`seata-all-0.7.1.jar`的版本和`seata-server`的版本需要一致

![image-20220818161530665](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.2.3.png)

##### 3、启动seata-server

在`seata-server-0.7.1\conf\registry.conf`文件里，把`registry`里的`type = "file"`修改为`type = "nacos"`，把`registry`->`nacos`里的`serverAddr = "localhost"`修改为`serverAddr = "localhost:8848"`

![image-20220818162116026](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.3.1.png)

还可以指定配置中心，如果指定配置中心，需要把`file.conf`文件复制到配置中心里

![image-20220818162616787](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.3.2.png)

双击`seata-server-0.7.1\bin\seata-server.bat`即可启动`seata-server`

![image-20220818163200656](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.3.3.png)

打开`nacos`里的`服务管理`->`服务列表`即可看到`serverAddr`已经启动了

![image-20220818163047179](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.2.3.4.png)

#### 3、查看源码

在`DataSourceAutoConfiguration`类里，`SpringBoot`默认会导入`DataSourceConfiguration.Hikari.class`数据源

```java
@Configuration
@Conditional(PooledDataSourceCondition.class)
@ConditionalOnMissingBean({ DataSource.class, XADataSource.class })
@Import({ DataSourceConfiguration.Hikari.class, DataSourceConfiguration.Tomcat.class,
      DataSourceConfiguration.Dbcp2.class, DataSourceConfiguration.Generic.class,
      DataSourceJmxConfiguration.class })
protected static class PooledDataSourceConfiguration {

}
```

![image-20220818164907224](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.3.1.png)

如果容器中没有`DataSource.class`会把`HikariDataSource`类放入到容器

```java
/**
 * Hikari DataSource configuration.
 */
@Configuration
@ConditionalOnClass(HikariDataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@ConditionalOnProperty(name = "spring.datasource.type", havingValue = "com.zaxxer.hikari.HikariDataSource",
      matchIfMissing = true)
static class Hikari {

   @Bean
   @ConfigurationProperties(prefix = "spring.datasource.hikari")
   public HikariDataSource dataSource(DataSourceProperties properties) {
      HikariDataSource dataSource = createDataSource(properties, HikariDataSource.class);
      if (StringUtils.hasText(properties.getName())) {
         dataSource.setPoolName(properties.getName());
      }
      return dataSource;
   }

}
```

![image-20220818165116524](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.3.2.png)

创建`HikariDataSource`类时需要传递一个`DataSourceProperties`

![image-20220818165912216](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.3.3.png)

`org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration`类使用了`@EnableConfigurationProperties(DataSourceProperties.class)`注解，把`DataSourceProperties.class`放入了容器

![image-20220818165508302](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.3.4.png)

初始化`HikariDataSource`数据源时，调用的是`createDataSource(properties, HikariDataSource.class);`方法

```java
/**
 * Hikari DataSource configuration.
 */
@Configuration
@ConditionalOnClass(HikariDataSource.class)
@ConditionalOnMissingBean(DataSource.class)
@ConditionalOnProperty(name = "spring.datasource.type", havingValue = "com.zaxxer.hikari.HikariDataSource",
      matchIfMissing = true)
static class Hikari {

   @Bean
   @ConfigurationProperties(prefix = "spring.datasource.hikari")
   public HikariDataSource dataSource(DataSourceProperties properties) {
      HikariDataSource dataSource = createDataSource(properties, HikariDataSource.class);
      if (StringUtils.hasText(properties.getName())) {
         dataSource.setPoolName(properties.getName());
      }
      return dataSource;
   }

}
```

![image-20220818165840949](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.3.5.png)

调的其实就是`DataSourceProperties`类的`initializeDataSourceBuilder().type(type).build();`

```java
@SuppressWarnings("unchecked")
protected static <T> T createDataSource(DataSourceProperties properties, Class<? extends DataSource> type) {
   return (T) properties.initializeDataSourceBuilder().type(type).build();
}
```

![image-20220818170034216](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.3.6.png)

#### 4、修改配置

##### 1、指定数据源

在`gulimall-order`模块的`com.atguigu.gulimall.order.config`包里新建`MySeataConfig`类，用于配置`Seata`相关的配置

```java
package com.atguigu.gulimall.order.config;

import com.zaxxer.hikari.HikariDataSource;
import io.seata.rm.datasource.DataSourceProxy;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;

/**
 * @author 无名氏
 * @date 2022/8/18
 * @Description:
 */
@Configuration
public class MySeataConfig {

    @Bean
    public DataSource dataSource(DataSourceProperties properties){
        HikariDataSource dataSource = properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
        if (StringUtils.hasText(properties.getName())) {
            dataSource.setPoolName(properties.getName());
        }
        return new DataSourceProxy(dataSource);
    }

}
```

![image-20220818171744943](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.4.1.png)

##### 2、复制配置

把`seata-server-0.7.1\conf`里的`file.conf`和`registry.conf`复制到`gulimall-order`模块的`src/main/resources`里

![image-20220818172909335](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.4.2.1.png)

在`gulimall-order`模块的`src/main/resources/file.conf`文件里，把`vgroup_mapping.my_test_tx_group = "default"`修改为`vgroup_mapping.gulimall-order-fescar-service-group = "default"`

![image-20220818184329694](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.4.2.2.png)

复制`gulimall-order`模块的`com.atguigu.gulimall.order.config.MySeataConfig`类到`gulimall-ware`模块的`com.atguigu.gulimall.ware.config`包里

![image-20220818184546107](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.4.2.3.png)

把`seata-server-0.7.1\conf`里的`file.conf`和`registry.conf`也复制一份到`gulimall-ware`模块的`src/main/resources`里，并把`vgroup_mapping.my_test_tx_group = "default"`修改为`vgroup_mapping.gulimall-ware-fescar-service-group = "default"`

![image-20220818184940343](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.4.2.4.png)

#### 5、使用分布式事务

##### 1、简单使用

在需要使用分布式事务的入口业务方法上添加`@GlobalTransactional`注解和`@Transactional`注解。

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`submitOrder`方法上`@Transactional`注解已经添加了，因此只需再添加`@GlobalTransactional`注解即可

![image-20220818185642556](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.1.1.png)

在调用远程服务的业务方法只需使用`@Transactional`注解即可（在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`orderLockStock`方法这里已经使用`@Transactional`注解了，不需要再进行额外的配置）

![image-20220818190151638](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.1.2.png)

##### 2、服务启动失败

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`submitOrder`方法里，在`response.setOrder(orderCreateTo.getOrder());`的下面添加`int i = 10/0;`，用于抛出除0异常，在`else`里的`response.setCode(3);`下面注释掉`return response;`，并在`response.setCode(3);`下面添加`throw new RuntimeException("锁定库存失败");`

![image-20220818202903270](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.2.1.png)

重新启动所有服务后，`GulimallThirdPartyApplication`、`GulimallGatewayApplication`、`GulimallMemberApplication`三个服务都启动失败了，这是因为这些服务都引入了`gulimall-common`的依赖，所以也引入了`seata`依赖，但这些服务并没有配置`seata`

![image-20220818190618762](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.2.2.png)

在`gulimall-common`模块的`pom.xml`文件里，注释掉对`seata`的依赖

![image-20220818191022555](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.2.3.png)

在`gulimall-order`模块的`pom.xml`文件的`<dependencies>`里添加`seata`依赖

```xml
<!--导入seata-->
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

在`gulimall-order`模块的`pom.xml`文件的`<dependencyManagement>`的`<dependencies>`里对阿里巴巴的依赖进行版本管理

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-alibaba-dependencies</artifactId>
   <version>2.1.0.RELEASE</version>
   <type>pom</type>
   <scope>import</scope>
</dependency>
```

![image-20220818192536651](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.2.4.png)

在`gulimall-ware`模块的`pom.xml`文件的`<dependencies>`里添加`seata`依赖

```xml
<!--导入seata-->
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

在`gulimall-ware`模块的`pom.xml`文件的`<dependencyManagement>`的`<dependencies>`里对阿里巴巴的依赖进行版本管理

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-alibaba-dependencies</artifactId>
   <version>2.1.0.RELEASE</version>
   <type>pom</type>
   <scope>import</scope>
</dependency>
```

![image-20220818192605132](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.2.5.png)

##### 3、端口被占用

启动`GulimallProductApplication`服务时在控制台报了`10000`端口被占用的异常

```bash
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2022-08-18 19:40:09.633 ERROR 7888 --- [  restartedMain] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

The Tomcat connector configured to listen on port 10000 failed to start. The port may already be in use or the connector may be misconfigured.

Action:

Verify the connector's configuration, identify and stop any process that's listening on port 10000, or configure this application to listen on another port.
```

![image-20220818194544347](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.3.1.png)

在`gulimall-product`模块的`src/main/resources/application.yml`文件里修改端口为`10001`

```yaml
server:
  port: 10001
```

![image-20220818194633417](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.3.2.png)

##### 4、seata不支持异常

重启完各个服务后，在  http://order.gulimall.com/toTrade 页面里提交订单，来到 http://order.gulimall.com/submitOrder 页面，又报错了

```
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Thu Aug 18 19:47:42 CST 2022
There was an unexpected error (type=Internal Server Error, status=500).
### Error updating database. Cause: io.seata.common.exception.NotSupportYetException ### The error may exist in com/atguigu/gulimall/order/dao/OrderItemDao.java (best guess) ### The error may involve com.atguigu.gulimall.order.dao.OrderItemDao.insert-Inline ### The error occurred while setting parameters ### SQL: INSERT INTO oms_order_item ( sku_attrs_vals, spu_name, integration_amount, order_sn, sku_price, gift_integration, real_amount, sku_quantity, sku_name, spu_brand, coupon_amount, sku_pic, spu_id, gift_growth, promotion_amount, sku_id, category_id ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ### Cause: io.seata.common.exception.NotSupportYetException
```

![image-20220818194816721](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.4.1.png)

查看`GulimallOrderApplication`服务的控制台，可以看到`OrderServiceImpl.java`文件的`203`行报错了

```bash
2022-08-18 19:47:42.779 ERROR 16064 --- [nio-9000-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error updating database.  Cause: io.seata.common.exception.NotSupportYetException
### The error may exist in com/atguigu/gulimall/order/dao/OrderItemDao.java (best guess)
### The error may involve com.atguigu.gulimall.order.dao.OrderItemDao.insert-Inline
### The error occurred while setting parameters
### SQL: INSERT INTO oms_order_item  ( sku_attrs_vals, spu_name, integration_amount, order_sn,  sku_price,  gift_integration, real_amount, sku_quantity, sku_name, spu_brand, coupon_amount, sku_pic, spu_id, gift_growth, promotion_amount, sku_id, category_id )  VALUES  ( ?, ?, ?, ?,  ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
### Cause: io.seata.common.exception.NotSupportYetException] with root cause

io.seata.common.exception.NotSupportYetException: null
	at io.seata.rm.datasource.AbstractPreparedStatementProxy.addBatch(AbstractPreparedStatementProxy.java:252) ~[seata-all-0.7.1.jar:0.7.1]
	......
	org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:688) ~[spring-aop-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at com.atguigu.gulimall.order.service.impl.OrderItemServiceImpl$$EnhancerBySpringCGLIB$$e1e4ea49.saveBatch(<generated>) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.saveOrder(OrderServiceImpl.java:203) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.submitOrder(OrderServiceImpl.java:163) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl$$FastClassBySpringCGLIB$$99092a92.invoke(<generated>) 
```

![image-20220818194913810](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.4.2.png)

貌似是seata不支持批量保存，在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里修改`saveOrder`方法，将批量保存修改为`for`循环单个保存

```java
/**
 * 保存订单数据
 *
 * @param orderCreateTo
 */
private void saveOrder(OrderCreateTo orderCreateTo) {
    OrderEntity orderEntity = orderCreateTo.getOrder();
    orderEntity.setModifyTime(new Date());
    this.save(orderEntity);
    for (OrderItemEntity orderItem : orderCreateTo.getOrderItems()) {
        orderItemService.save(orderItem);
    }
}
```

![image-20220818201239848](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.4.3.png)

##### 5、获取schema失败

在`GulimallWareApplication`服务的控制台报了如下两个主要错误

[点击查看完整报错信息](code/6.2.2.5.5.log)

```bash
java.sql.SQLException: Failed to fetch schema of gulimall_wms.wms_ware_sku
	at io.seata.rm.datasource.sql.struct.TableMetaCache.fetchSchemeInDefaultWay(TableMetaCache.java:115) ~[seata-all-0.7.1.jar:0.7.1]
	at io.seata.rm.datasource.sql.struct.TableMetaCache.fetchSchema(TableMetaCache.java:94) ~[seata-all-0.7.1.jar:0.7.1]
	at io.seata.rm.datasource.sql.struct.TableMetaCache.lambda$getTableMeta$0(TableMetaCache.java:73) ~[seata-all-0.7.1.jar:0.7.1]
	at com.github.benmanes.caffeine.cache.BoundedLocalCache.lambda$doComputeIfAbsent$14(BoundedLocalCache.java:2039) ~[caffeine-2.6.2.jar:na]
	at java.util.concurrent.ConcurrentHashMap.compute(ConcurrentHashMap.java:1853) ~[na:1.8.0_301]
	......
	at org.springframework.aop.framework.JdkDynamicAopProxy.invoke(JdkDynamicAopProxy.java:212) ~[spring-aop-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at com.sun.proxy.$Proxy94.lockSkuStock(Unknown Source) ~[na:na]
	at com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl.orderLockStock(WareSkuServiceImpl.java:162) ~[classes/:na]
	at com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl$$FastClassBySpringCGLIB$$422f6383.invoke(<generated>) ~[classes/:na]
	at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.invokeJoinpoint(CglibAopProxy.java:749) ~[spring-aop-5.1.9.RELEASE.jar:5.1.9.RELEASE]
```

![image-20220818201134344](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.0.1.png)

```bash
org.springframework.jdbc.UncategorizedSQLException: 
### Error updating database.  Cause: java.sql.SQLException: io.seata.common.exception.ShouldNeverHappenException: [xid:192.168.56.1:8091:2114539555]get tablemeta failed
### The error may exist in file [B:\gulimall\gulimall-ware\target\classes\mapper\ware\WareSkuDao.xml]
### The error may involve defaultParameterMap
### The error occurred while setting parameters
### SQL: update gulimall_wms.wms_ware_sku set stock_locked = stock_locked+?         where sku_id=? and ware_id = ? and stock - stock_locked>=?
### Cause: java.sql.SQLException: io.seata.common.exception.ShouldNeverHappenException: [xid:192.168.56.1:8091:2114539555]get tablemeta failed
; uncategorized SQLException; SQL state [null]; error code [0]; io.seata.common.exception.ShouldNeverHappenException: [xid:192.168.56.1:8091:2114539555]get tablemeta failed; nested exception is java.sql.SQLException: io.seata.common.exception.ShouldNeverHappenException: [xid:192.168.56.1:8091:2114539555]get tablemeta failed
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:89)
```

![image-20220818205453436](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.0.2.png)

###### 尝试一：

百度一直在说`Failed to fetch schema of XXXX表 java.sql.SQLException: Failed to fetch schema of XXXXX表`是因为`SPringCloud项目中使用了seata的分布式事务，其中xxx表中没有主键`，`给xxx表加一个主键ID就可以了`。但是我的`gulimall_wms`数据库的`wms_ware_sku`表有主键啊

![image-20220818205026604](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.1.png)

###### 尝试二：

删除`gulimall_wms`数据库中已经存在的`undo_log`表

![image-20220818201410226](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.2.1.png)

在`gulimall_wms`数据库里重新执行下面这条`sql`语句，重新创建表

```mysql
CREATE TABLE `undo_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `branch_id` bigint(20) NOT NULL,
  `xid` varchar(100) NOT NULL,
  `context` varchar(128) NOT NULL,
  `rollback_info` longblob NOT NULL,
  `log_status` int(11) NOT NULL,
  `log_created` datetime NOT NULL,
  `log_modified` datetime NOT NULL,
  `ext` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_undo_log` (`xid`,`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

![image-20220818201545733](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.2.2.png)

###### 尝试三：（解决）

删掉`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件里的`id`为`lockSkuStock`里的`gulimall_wms.`

![image-20220818210814292](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.3.1.png)

`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件报红了不用管，这IDEA不知道使用的是哪个数据库，检测到没有这些表才报红的，不影响程序运行，至此才解决这个问题

![image-20220818210609807](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.3.2.png)

查看的链接：https://en.chowdera.com/2022/119/202204292239307418.html

原文链接：https://blog.csdn.net/weixin_44647371/article/details/124446175

io.seata.common.exception.ShouldNeverHappenException: Could not found any index in the table
报错关键语句：

```
Caused by: io.seata.common.exception.ShouldNeverHappenException: Could not found any index in the table
或者
io.seata.common.exception.ShouldNeverHappenException: [xid:192.168.25.1:8091:2104750907]get tablemeta failed
```

解决，我这边找了半天发现是mybatis的sql中要去掉数据库名导致的，去掉sql语句中的库名即可
![在这里插入图片描述](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.5.3.3.png)

##### 6、测试

重启`GulimallWareApplication`服务，截断`gulimall_oms`数据库的`oms_order`订单表和`oms_order_item`订单项表，将`gulimall_wms`数据库的`wms_ware_sku`库存表的`stock_locked`被锁库存属性全部修改为`0`，表示没有库存被锁住。在  http://order.gulimall.com/toTrade 页面里提交订单，来到 http://order.gulimall.com/submitOrder 页面，这时正确的报了`/ by zero`错误，查看数据库，可以看到`gulimall_oms`数据库的`oms_order`订单表和`oms_order_item`订单项表都没有新增数据，`gulimall_wms`数据库的`wms_ware_sku`库存表里也没有库存被锁住，因此可以判断出分布式事务已经生效了。

![GIF 2022-8-18 21-37-49](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.5.6.gif)

#### 6、`AT`模式

Seata默认使用`AT`模式，类似于`2PC`二阶提交协议，不过`2PC`二阶提交协议的第一个阶段是准备阶段，不提交事务，而`Seata`直接把本地事务提交了。`Seata`在第二阶段如果失败了，就通过回滚日志进行反向补偿。

不过这并不适用于分布式系统中高并发的场景，倒是适合后台的`saveSpuInfo`方法

![image-20220818202004999](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.6.png)

[点击查看`gulimall-order`完整代码](code/6.2.2.6.1.xml)

[点击查看`gulimall-ware`完整代码](code/6.2.2.6.2.xml)

#### 7、Seata分布式事务总结

1)、每一个微服务先必须创建`undo_log`表;
2)、安装事务协调器; `seata-server` https://github.com/seata/seata/releases
3)、整合
1、导入依赖`spring-cloud-starter-alibaba-seata seata-all-0.7.1`
2、解压并启动`seata-server`;
`registry.conf`:注册中心配置;修改`registry type=nacos`
`file.conf`:
3、所有想要用到分布式事务的微服务使用`seata` `DataSourceProxy`代理 自己的数据源
4、每个微服务，都必须导入
`registry. conf`
`file.conf`里需要配置`vgroup mapping. {appl ication. name}-fescar-service-group = "default"`
5、启动测试分布式事务
6、给分布式大事务的入口标注`@GLobalTransactional`
7、每一个远程的小事务用`@Transactional`

#### 8、SpringBoot事务失效

如一个类里面定义了方法A()和方法B()，然后方法A和B都各自开启了事务，如果不做处理，直接在方法A中调用方法B，这时就会导致方法B里面的事务失效，也就是如果程序出错时，B的事务是失效的，数据回滚不了，我们可以使用`aspect`来解决这个问题

参考: [Core Technologies (spring.io)](https://docs.spring.io/spring-framework/docs/5.1.3.RELEASE/spring-framework-reference/core.html#aop-understanding-aop-proxies)

首先引入`spring-boot-starter-aop`依赖

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

![image-20220819212651091](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.8.1.png)

其实主要想使用`spring-boot-starter-aop`依赖的`aspect`

![image-20220819212842976](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.8.2.png)

在主类上添加`@EnableAspectJAutoProxy`注解，并设置`exposeProxy = true`，对外暴露代理对象

```java
@EnableAspectJAutoProxy(exposeProxy = true)
```

![image-20220819213011046](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.8.3.png)

根据`EnableAspectJAutoProxy`注解接口的描述，我们可以使用`AopContext`获得当前代理对象

```java
/**
 * Indicate that the proxy should be exposed by the AOP framework as a {@code ThreadLocal}
 * for retrieval via the {@link org.springframework.aop.framework.AopContext} class.
 * Off by default, i.e. no guarantees that {@code AopContext} access will work.
 * @since 4.3.1
 *表明代理应该由 AOP 框架作为一个 {@code ThreadLocal} 被暴露
 *通过*{@link org.springframework.aop.framework.AopContext} 类来获得。
 *默认关闭，即不保证 {@code AopContext} 访问将起作用。
 */
boolean exposeProxy() default false;
```

![image-20220819214208471](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.8.4.png)

然后调用代理对象的方法即可避免事务失效

```java
package com.atguigu.gulimall.order.test;

import com.atguigu.gulimall.order.service.impl.OrderServiceImpl;
import org.springframework.aop.framework.AopContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description:
 * 1、引入spring-boot-starter-aop依赖
 * 2、@EnableAspectJAutoProxy(exposeProxy = true)  exposeProxy = true对外暴露代理对象
 * 3、AspectJTest orderService = (AspectJTest) AopContext.currentProxy();
 */
@Component
public class AspectJTest {

    @Transactional(rollbackFor = Exception.class,propagation = Propagation.REQUIRED,timeout = 30)
    public void a(){
        System.out.println("执行a方法");
        AspectJTest orderService = (AspectJTest) AopContext.currentProxy();
        orderService.b();
        orderService.c();

    }

    @Transactional(rollbackFor = Exception.class,propagation = Propagation.REQUIRED,timeout = 2)
    public void b(){
        System.out.println("执行b方法");
    }

    @Transactional(rollbackFor = Exception.class,propagation = Propagation.REQUIRES_NEW,timeout = 20)
    public void c(){
        System.out.println("执行c方法");
    }
}
```

![image-20220819214136005](https://gitlab.com/apzs/image/-/raw/master/image/6.2.2.8.5.png)

### 6.2.3、延时队列

#### 1、延时队列场景

##### 1、场景

延时队列可以用于关闭订单和解锁库存等场景，比如当用户点击下订单，30分钟后仍未支付订单，我们可以关闭这个订单（将这个订单的状态设置为已关闭），并主动通知库存服务解锁库存。

当用户点击下订单后，我们会将库存锁住，表示用户已经准备购买这个商品了（锁库存是为了防止同一个商品被多个卖家购买到），过了`40`分钟后检查锁库存的对应订单的状态，如果是订单关闭（订单关闭后会通知解锁库存，保险起见库存服务还是要检查一下是否需要解锁库存）、订单不存在（下订单的过程中失败了，比如某个商品锁库存失败了，此时会通知已锁库存的服务让其解锁对应的库存，保险起见库存服务还是要检查一下是否需要解锁库存）等下单失败的状态时，解锁库存。

![image-20220818214502674](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.1.png)

##### 2、定时任务的时效性问题

如果我们使用传统的定时任务来做这件事情，就会有定时任务的时效性问题，比如用户在第`1`秒时下订单，此时用户一直未支付，直到第`31`秒时订单过期时需要及时解锁库存，但是由于定时任务是第`0`秒开始，每`30`秒执行一次，因此错过第`30`秒的检查后，只能在第`60`秒后才能检查到需要在第`31`秒时就应该解锁的库存，这样其他用户就不能及时看到其实应该已经解锁的库存。

![image-20220818215448826](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.2.png)

##### 3、RabbitMQ实现延时队列基础

使用定时任务不能解决问题的原因主要就是时效性问题，如果我们能给每个订单都设置设置一个过期时间就好了，因此我们可以使用RabbitMQ来实现延时队列

**RabbitMQ延时队列（实现定时任务）**

场景：

比如未付款订单，超过一定时间后，系统自动取消订单并释放占有物品。

常用解决方案

spring的 schedule 定时任务轮询数据库

缺点

消耗系统内存、增加了数据库的压力、存在较大的时间误差

解决：rabbitmq的消息TTL和死信Exchange结合

**消息的TTL（Time To Live）**

- 消息的TTL就是消息的存活时间。

- RabbitMQ可以对队列和消息分别设置TTL。

  - 对队列设置就是队列没有消费者连着的保留时间，也可以对每一个单独的消息做单独的设置。超过了这个时间，我们认为这个消息就死了，称之为死信。

  - 如果队列设置了，消息也设置了，那么会取小的。所以一个消息如果被路由到不同的队列中，这个消息死亡的时间有可能不一样（不同的队列设置）。这里单讲单个消息的TTL，因为它才是实现延迟任务的关键。可以通过设置消息的expiration字段或者x-  message-ttl属性来设置时间，两者是一样的效果。

**Dead Letter Exchanges（DLX）**

- 一个消息在满足如下条件下，会进死信路由，记住这里是路由而不是队列， 一个路由可以对应很多队列。（什么是死信）

  - 一个消息被Consumer拒收了，并且reject方法的参数里requeue是false。也就是说不 会被再次放在队列里，被其他消费者使用。（basic.reject/ basic.nack）requeue=false

  - 上面的消息的TTL到了，消息过期了。

  - 队列的长度限制满了。排在前面的消息会被丢弃或者扔到死信路由上

- Dead Letter Exchange其实就是一种普通的exchange，和创建其他exchange没有两样。只是在某一个设置Dead Letter Exchange的队列中有消息过期了，会自动触发消息的转发，发送到Dead Letter Exchange中去。

- 我们既可以控制消息在一段时间后变成死信，又可以控制变成死信的消息 被路由到某一个指定的交换机，结合二者，其实就可以实现一个延时队列

##### 4、延时队列实现

###### 1. 给队列设置过期时间

给一个队列设置一个过期时间，当时间到了仍然没有消费者处理时，这些消息就会交给死信交换机，死信交换机使用指定的死信路由键交给指定的队列，消费者可以获取指定队列的消息，这样获取到的都是延迟后的消息，进而间接实现了延时队列。

![image-20220819090045466](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.4.1.png)

###### 2. 给消息设置过期时间（不推荐）

不仅可以给队列设置过期时间，还可以给消息设置过期时间，不过不推荐该做法。

（RabbitMQ采用惰性检查机制，在队列中只有前面的消息被取走后才会检查下一个消息有没有过期）

![image-20220819090449587](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.4.2.png)

##### 5、简单设计

订单业务的简单设计如下图所示：下订单后，首先发布者将消息交给`user.order.delay.exchange`交换机，使用`order_delay`路由键交给`user.order.delay.queue`队列，到了过期时间后用户还没有支付则订单过期，过期后订单交给`user.order.exchange`交换机，使用`order`路由键交给`user.order.queue`队列，消费者监听`user.order.queue`队列就可以获取过期的订单消息了。

![image-20220819090811424](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.5.png)

##### 6、最终设计

最终设计的订单业务如下：（其实就是使用了同一个交换机，其他的也没怎么变动）

下订单后，首先发布者将消息交给`order-event-exchange`交换机，使用`order.create.order`路由键交给`order.delay.queue`队列，到了过期时间后用户还没有支付则订单过期，过期后订单还是交给`order-event-exchange`交换机不过路由键不同了，使用`order.release.order`路由键交给`order.release.order.queue`队列，消费者监听`order.release.order.queue`队列就可以获取过期的订单消息了。

![image-20220819091300725](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.6.1.png)

本系统全部的消息列的路由过程如下

![消息队列流程](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.1.6.2.png)

#### 2、简单使用

##### 1、创建队列、交换机、绑定关系

在`gulimall-order`模块的`com.atguigu.gulimall.order.config`包下新建`MyMQConfig`类，用于创建释放订单的队列、交换机、绑定关系，然后重启`GulimallOrderApplication`服务

```java
package com.atguigu.gulimall.order.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description: 消息队列配置类
 * 若RabbitMQ里没有，容器中的Binding， Queue, Exchange 都会自动创建
 */
@Configuration
public class MyMQConfig {

    /**
     * 给订单加上过期时间
     * x-dead-letter-exchange: order-event-exchange
     * x-dead-letter-routing-key: order.release.order
     * x-message-ttl: 60000
     * @return
     */
    @Bean
    public Queue orderDelayQueue(){
        Map<String, Object> arguments = new HashMap<>();
        arguments.put("x-dead-letter-exchange","order-event-exchange");
        arguments.put("x-dead-letter-routing-key", "order.release.order");
        arguments.put("x-message-ttl",60000);
        //Queue(String name, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments)
        return new Queue("order.delay.queue",true,false,false,arguments);
    }

    /**
     * 释放订单
     * @return
     */
    @Bean
    public Queue orderReleaseOrderQueue(){
        return new Queue("order.release.order.queue",true,false,false);
    }

    @Bean
    public Exchange orderEventExchange(){
        //TopicExchange(String name, boolean durable, boolean autoDelete, Map<String, Object> arguments)
        return new TopicExchange("order-event-exchange",true,false);
    }

    @Bean
    public Binding orderCreateOrderBinding(){
        //Binding(String destination, DestinationType destinationType, String exchange, String routingKey,Map<String, Object> arguments)
        return new Binding("order.delay.queue", Binding.DestinationType.QUEUE,
                "order-event-exchange","order.create.order",null);
    }

    @Bean
    public Binding orderReleaseOrderBinding(){
        return new Binding("order.release.order.queue", Binding.DestinationType.QUEUE,
                "order-event-exchange","order.release.order",null);
    }


}
```

![image-20220819094410966](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.2.1.png)

##### 2、查看

（如果没有的话可以先不用管，`spring`默认使用的是懒加载，当消费者监听队列后才创建相应的交换机和队列。）

访问  http://192.168.56.10:15672/#/exchanges   页面即可看到自动创建了`order-event-exchange`交换机

![image-20220819094918219](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.2.2.1.png)

访问  http://192.168.56.10:15672/#/queues 页面即可看到自动创建了`order.delay.queue`和`order.release.order.queue`队列

![image-20220819094920492](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.2.2.2.png)

##### 3、测试

先在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类里添加如下方法，用于监听`order.release.order.queue`队列

```java
/**
 * com.atguigu.gulimall.order.web.HelloController类的createOrderTest方法发送消息
 * @param orderEntity
 * @param channel
 * @param message
 * @throws IOException
 */
@RabbitListener(queues = "order.release.order.queue")
public void listener(OrderEntity orderEntity, Channel channel, Message message) throws IOException, InterruptedException {
    Thread.sleep(5*1000);
    System.out.println("收到过期的订单信息，准备关闭订单=>"+orderEntity.getOrderSn()+"时间=>"+orderEntity.getModifyTime());
    channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
}
```

![image-20220819111047776](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.2.3.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.web.HelloController`类里添加`createOrderTest`方法，用于测试给`mq`发消息

```java
@Autowired
RabbitTemplate rabbitTemplate;

/**
 *
 * com.atguigu.gulimall.order.config.MyMQConfig类的listener方法监听消息
 * @return
 */
@GetMapping("/test/createOrder")
@ResponseBody
public String createOrderTest(){
    //订单下单成功
    OrderEntity orderEntity = new OrderEntity();
    orderEntity.setOrderSn(UUID.randomUUID().toString());
    orderEntity.setModifyTime(new Date());
    //给MQ发消息
    rabbitTemplate.convertAndSend("order-event-exchange","order.create.order",orderEntity);
    return "收到过期的订单信息，准备关闭订单=>"+orderEntity.getOrderSn()+"时间=>"+orderEntity.getModifyTime();
}
```

![image-20220819101116921](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.2.3.2.png)

先登录，再刷新`http://order.gulimall.com/test/createOrder`页面`5`次，可以看到`GulimallOrderApplication`服务的控制台立即打出了5个`消息抵达消息代理`的回调。此时通过`order.create.order`路由键发送给`order-event-exchange`交换机，然后交换机根据路由键发送给了`order.delay.queue`队列，此时`RabbltMQ`的`order.delay.queue`也已近有`5`条准备的消息了。过了`1`分钟后，`order.delay.queue`队列已经到了过期时间，消息又使用`order.release.order`路由键发送给了`order-event-exchange`交换机，然后交换机根据路由键发送给了`order.release.order.queue`队列，`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类的`listener`方法监听该队列，因此控制台打印了`关闭订单`的信息，并手动确认了接收消息。

![GIF 2022-8-19 11-07-02](https://gitlab.com/apzs/image/-/raw/master/image/6.2.3.2.3.3.gif)

### 6.2.4、其他服务整合RabbitMQ

#### 1、整合RabbitMQ

##### 1、引入RabbitMQ

在`gulimall-ware`模块的`pom.xml`文件里添加引入amqp场景

```xml
<!--引入amqp场景，使用RabbitMQ-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

![image-20220819111236014](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.1.1.png)

在`gulimall-ware`模块的`src/main/resources/application.properties`配置文件里添加`RabbitMQ`配置

```properties
spring.rabbitmq.host=192.168.56.10
spring.rabbitmq.virtual-host=/
```

![image-20220819111410041](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.1.2.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.GulimallWareApplication`启动类上添加`@EnableRabbit`注解，开启`RabbitMQ`功能

```java
@EnableRabbit
```

![image-20220819111446973](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.1.3.png)

##### 2、业务图

接下来我们实现锁定库存的功能，其业务功能为下面画的红色方框的部分

![消息队列流程](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.config`包里新建`MyRabbitConfig`类

```java
package com.atguigu.gulimall.ware.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description:
 */
@Configuration
public class MyRabbitConfig {
    /**
     * 消息转换器(转换为JSON数据)
     * @return
     */
    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Exchange stockEventExchange(){
        //TopicExchange(String name, boolean durable, boolean autoDelete, Map<String, Object> arguments)
        return new TopicExchange("stock-event-exchange",true,false);
    }

    @Bean
    public Queue stockReleaseStockQueue(){
        //Queue(String name, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments)
        return new Queue("stock.release.stock.queue",true,false,false);
    }

    @Bean
    public Queue stockDelayQueue(){
        Map<String, Object> arguments = new HashMap<>();
        arguments.put("x-dead-letter-exchange","stock-event-exchange");
        arguments.put("x-dead-letter-routing-key", "stock.release");
        arguments.put("x-message-ttl", TimeUnit.MINUTES.toMillis(2));
        return new Queue("stock.delay.queue",true,false,false,arguments);
    }

    @Bean
    public Binding stockReleaseBinging(){
        //Binding(String destination, DestinationType destinationType, String exchange, String routingKey,Map<String, Object> arguments)
        return new Binding("stock.release.stock.queue", Binding.DestinationType.QUEUE,
                "stock-event-exchange","stock.release.#",null);
    }

    @Bean
    public Binding stockLockedBinding(){
        return new Binding("stock.delay.queue", Binding.DestinationType.QUEUE,
                "stock-event-exchange","stock.locked",null);
    }

}
```

![image-20220819114253845](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.2.png)

启动`GulimallWareApplication`服务，访问  http://192.168.56.10:15672/#/exchanges   页面可以看到没有新增`stock-event-exchange`交换机

![image-20220819114341970](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.3.png)

访问  http://192.168.56.10:15672/#/queues 页面可以看到没有新增`stock.release.stock.queue`和`stock.delay.queue`队列

![image-20220819114344356](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.4.png)

这是因为`Spring`使用的是懒加载，当消费者监听队列后才创建相应的交换机和队列。使用`@RabbitListener`注解随便监听一个队列即可。

```java
@RabbitListener(queues = "stock.release.stock.queue")
public void listener(Message message){

}
```

![image-20220819114519129](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.5.png)

重启`GulimallWareApplication`服务，访问  http://192.168.56.10:15672/#/exchanges   页面可以看到已经创建`stock-event-exchange`交换机了

![image-20220819114728239](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.6.png)

访问  http://192.168.56.10:15672/#/queues 页面可以看到已经创建`stock.release.stock.queue`和`stock.delay.queue`队列了

![image-20220819114730458](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.2.7.png)

##### 3、库存解锁的场景

库存解锁的场景

1)、下订单成功，订单过期没有支付被系统自动取消、被用户手动取消。都要解锁库存
2)、下订单成功，库存锁定成功，接下来的业务调用失败，导致订单回滚。
之前锁定的库存就要自动解锁。

在`gulimall_wms`数据库的`wms_ware_order_task_detail`表里，添加`ware_id`和`lock_status`（我这里已近添加过了）

![image-20220819154128242](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.3.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.entity.WareOrderTaskDetailEntity`类里，添加`private Long wareId;`字段和`private Integer lockStatus;`字段。（这里已经添加过了）

![image-20220819154421260](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.3.2.png)

在`gulimall-ware`模块的`src/main/resources/mapper/ware/WareOrderTaskDetailDao.xml`文件的`id="wareOrderTaskDetailMap"`的`<resultMap>`里，在后面添加`<result property="wareId" column="ware_id"/>
<result property="lockStatus" column="lock_status"/>`

```xml
<!-- 可根据自己的需求，是否要使用 -->
<resultMap type="com.atguigu.gulimall.ware.entity.WareOrderTaskDetailEntity" id="wareOrderTaskDetailMap">
   <result property="id" column="id"/>
   <result property="skuId" column="sku_id"/>
   <result property="skuName" column="sku_name"/>
   <result property="skuNum" column="sku_num"/>
   <result property="taskId" column="task_id"/>
   <result property="wareId" column="ware_id"/>
   <result property="lockStatus" column="lock_status"/>
</resultMap>
```

![image-20220819154752477](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.3.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.entity.WareOrderTaskDetailEntity`类上添加如下注解

```java
@NoArgsConstructor
@AllArgsConstructor
```

![image-20220819155240562](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.3.4.png)

在`gulimall-common`模块的`com.atguigu.common`包里新增`mq`文件夹，在`mq`文件夹里新建`StockLockedTo`类

```java
package com.atguigu.common.mq;

import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description: 每锁一件商品库存就向RabbitMQ发送一条消息
 */
@Data
public class StockLockedTo {
    /**
     * wms_ware_order_task
     * 库存工作单的id
     */
    private Long id;

    /**
     * wms_ware_order_task_detail
     * 工作单详情的id
     */
    private Long detailId;
}
```

![image-20220819160939417](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.3.5.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`orderLockStock`方法里，`保存库存工作单`和`工作单详情`，并向`RabbitMQ`发送一条消息

```java
@Autowired
RabbitTemplate rabbitTemplate;
@Autowired
WareOrderTaskService wareOrderTaskService;
@Autowired
WareOrderTaskDetailService wareOrderTaskDetailService;

/**
 * 为订单锁定库存
 * @param wareSkuLockTo
 * @return
 * 库存解锁的场景
 * 1)、下订单成功，订单过期没有支付被系统自动取消、被用户手动取消。都要解锁库存
 * 2)、下订单成功，库存锁定成功，接下来的业务调用失败，导致订单回滚。
 * 之前锁定的库存就要自动解锁。
 */
@Transactional(rollbackFor = Exception.class)
@Override
public Boolean orderLockStock(WareSkuLockTo wareSkuLockTo) {

    //保存库存工作单
    WareOrderTaskEntity wareOrderTaskEntity = new WareOrderTaskEntity();
    wareOrderTaskEntity.setOrderSn(wareSkuLockTo.getOrderSn());
    wareOrderTaskService.save(wareOrderTaskEntity);

    //按照下单的收货地址，找到一个就近仓库，锁定库存。
    //找到每个商品在哪个仓库都有库存
    List<WareSkuLockTo.OrderItemVo> locks = wareSkuLockTo.getLocks();
    List<SkuWareHasStock> collect = locks.stream().map(orderItemVo -> {
        SkuWareHasStock skuWareHasStock = new SkuWareHasStock();
        Long skuId = orderItemVo.getSkuId();
        skuWareHasStock.setSkuId(skuId);
        //select ware_id from wms_ware_sku where sku_id = 1 and stock - stock_locked > 0
        List<Long> wareId = wareSkuDao.listWareIdHasSkuStock(skuId);
        skuWareHasStock.setWareId(wareId);
        skuWareHasStock.setNum(orderItemVo.getCount());
        return skuWareHasStock;
    }).collect(Collectors.toList());

    //锁定库存
    for (SkuWareHasStock hasStock : collect) {
        boolean skuStocked = false;
        Long skuId = hasStock.getSkuId();
        List<Long> wareIds = hasStock.getWareId();
        //没有库存
        if (CollectionUtils.isEmpty(wareIds)) {
            throw new NoStockException(skuId);
        }
        //锁定库存
        for (Long wareId : wareIds) {
            //成功返回1，失败返回0
            //update wms_ware_sku set stock_locked = stock_locked+2 where sku_id=1 and ware_id = 1 and stock - stock_locked>=2
            Long count = wareSkuDao.lockSkuStock(skuId,wareId,hasStock.getNum());
            if(count==1){
                //锁库存成功
                skuStocked = true;
                //保存工作单详情
                WareOrderTaskDetailEntity wareOrderTaskDetailEntity = new WareOrderTaskDetailEntity();
                wareOrderTaskDetailEntity.setSkuId(skuId);
                wareOrderTaskDetailEntity.setTaskId(wareOrderTaskEntity.getId());
                wareOrderTaskDetailEntity.setWareId(wareId);
                wareOrderTaskDetailEntity.setSkuNum(hasStock.getNum());
                wareOrderTaskDetailEntity.setLockStatus(1);
                wareOrderTaskDetailService.save(wareOrderTaskDetailEntity);
                //向RabbitMQ发送一条消息
                StockLockedTo stockLockedTo = new StockLockedTo();
                stockLockedTo.setId(wareOrderTaskEntity.getId());
                stockLockedTo.setDetailId(wareOrderTaskDetailEntity.getId());
                rabbitTemplate.convertAndSend("order-event-exchange","stock.locked",stockLockedTo);
                break;
            }else {
                //锁库存成功
            }
        }
        if (!skuStocked){
            //当前商品没有库存了
            throw new NoStockException(skuId);
        }
    }
    return null;
}
```

![image-20220819161346943](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.3.6.png)

1.如果每一个商品都锁定成功，将当前商品锁定了几件的工作单记录发给`RabbitMQ`
2.如果锁定失败，前面保存的工作单信息就回滚了，数据库就没有工作单信息了。给`RabbitMQ`发送出去的消息过期后即使要解锁记录，但由于去数据库查不到id,所以也就不用解锁了。

老师说在`wms_ware_sku`表里已经锁库存了，但是`wms_ware_order_task_detail`详细工作单回滚了，由于根据`id`查不出数据，相当于就不知道当时这个人是锁了多少个了。但是我觉得在同一个事务里`wms_ware_order_task_detail`详细工作单回滚了，`wms_ware_sku`表里已经锁定的库存也应该回滚啊，所以我觉得只发id没问题啊。

##### 4、修改代码

修改`gulimall-common`模块的`com.atguigu.common.mq.StockLockedTo`类

```java
package com.atguigu.common.mq;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description: 每锁一件商品库存就向RabbitMQ发送一条消息
 */
@Data
public class StockLockedTo {
    /**
     * wms_ware_order_task
     * 库存工作单的id
     */
    private Long id;

    /**
     * wms_ware_order_task_detail
     * 工作单详情的id
     */
    private StockDetailTo detail;

    @Data
    public static class StockDetailTo{
        /**
         * id
         */
        @TableId
        private Long id;
        /**
         * sku_id
         */
        private Long skuId;
        /**
         * sku_name
         */
        private String skuName;
        /**
         * 购买个数
         */
        private Integer skuNum;
        /**
         * 工作单id
         */
        private Long taskId;
        /**
         * 仓库id
         */
        private Long wareId;
        /**
         * 1-已锁定  2-已解锁  3-扣减
         */
        private Integer lockStatus;
    }
}
```

![image-20220819163606111](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.4.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`orderLockStock`方法里，将`stockLockedTo.setDetailId(wareOrderTaskDetailEntity.getId());`修改为如下代码

```java
//只发id不行，防止回滚以后找不到数据(我觉得只发id没问题)
StockLockedTo.StockDetailTo stockDetailTo = new StockLockedTo.StockDetailTo();
BeanUtils.copyProperties(wareOrderTaskDetailEntity,stockDetailTo);
stockLockedTo.setDetail(stockDetailTo);
```

![image-20220819165145679](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.4.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`submitOrder`方法上删除`@GlobalTransactional`注解

![image-20220819192611846](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.4.3.png)

##### 5、测试

重启`GulimallOrderApplication`服务和`GulimallWareApplication`服务，截断`gulimall_oms`数据库的`oms_order`订单表和`oms_order_item`订单项表，将`gulimall_wms`数据库的`wms_ware_sku`库存表的`stock_locked`被锁库存属性全部修改为`0`，表示没有库存被锁住。

![GIF 2022-8-19 16-44-56](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.5.1.gif)

登录后，在 http://order.gulimall.com/toTrade 页面里，点击提交订单，此时会报`/ by zero`错误。可以看到在`gulimall_oms`数据库里，`oms_order`表和`oms_order_item`表回滚了。在`gulimall_wms`数据库里，`wms_ware_sku`表里已经锁定库存了，`wms_ware_order_task`已经保存工作单了，`wms_ware_order_task_detail`里已经保存工作单详情了（还没有实现解锁库存功能，所以被锁的库存不会解锁，这是正常的）

![GIF 2022-8-19 16-46-37](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.1.5.2.gif)

[点击查看OrderServiceImpl类完整代码](code/6.2.3.3.5.java)

#### 2、解锁库存

##### 1、返回订单状态

在`gulimall-order`模块的`com.atguigu.gulimall.order.controller.OrderController`类里添加`getOrderStatus`方法用于返回订单的状态

```java
/**
 * 返回订单状态
 *
 * @return
 */
@GetMapping("/status/{orderSn}")
public R getOrderStatus(@PathVariable("orderSn") String orderSn) {
    OrderEntity orderEntity = orderService.getOrderStatusByOrderSn(orderSn);
    return R.ok().put("data", orderEntity);
}
```

![image-20220819171529048](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里添加`getOrderStatusByOrderSn`抽象方法

```java
OrderEntity getOrderStatusByOrderSn(String orderSn);
```

![image-20220819171558583](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里实现`getOrderStatusByOrderSn`方法

```java
@Override
public OrderEntity getOrderStatusByOrderSn(String orderSn) {
    LambdaQueryWrapper<OrderEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(OrderEntity::getOrderSn,orderSn);
    return this.getOne(lambdaQueryWrapper);
}
```

![image-20220819171737988](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.feign`包里添加`OrderFeignService`接口，用于远程调用订单模块

```java
package com.atguigu.gulimall.ware.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description:
 */
@FeignClient("gulimall-order")
public interface OrderFeignService {

    @GetMapping("order/order/status/{orderSn}")
    public R getOrderStatus(@PathVariable("orderSn") String orderSn);
}
```

![image-20220819172000861](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.4.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.vo`包里新建`OrderVo`类，用于封装订单包含的信息

[点击查看OrderVo类完整代码](code/6.2.3.4.1.java)

![image-20220819172744530](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.5.png)

在`gulimall-common`模块的`com.atguigu.common`包下新建`enums`文件夹，在`enums`文件夹里新建`OrderStatusEnum`枚举类，用于表示订单状态

```java
package com.atguigu.common.enums;

public enum  OrderStatusEnum {
    CREATE_NEW(0,"待付款"),
    PAYED(1,"已付款"),
    SENDED(2,"已发货"),
    RECIEVED(3,"已完成"),
    CANCLED(4,"已取消"),
    SERVICING(5,"售后中"),
    SERVICED(6,"售后完成");
    private Integer code;
    private String msg;

    OrderStatusEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
```

![image-20220819184921119](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.6.png)

在`gulimall-ware`模块的`src/main/resources/application.properties`配置文件里添加如下配置，设置`RabbitMQ`消息手动确认接收

```properties
#手动ack
spring.rabbitmq.listener.simple.acknowledge-mode=manual
```

![image-20220819191739659](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.1.7.png)

##### 2、解锁库存

在`gulimall-ware`模块的`com.atguigu.gulimall.ware`包里新建`listener`文件夹，在`listener`文件夹里新建`StockReleaseListener`类，用于监听`stock.release.stock.queue`库存释放队列的消息

```java
package com.atguigu.gulimall.ware.listener;

import com.atguigu.common.mq.StockLockedTo;
import com.atguigu.gulimall.ware.service.WareSkuService;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * @author 无名氏
 * @date 2022/8/19
 * @Description:
 */
@Service
@RabbitListener(queues = "stock.release.stock.queue")
public class StockReleaseListener {

    @Autowired
    WareSkuService wareSkuService;

    /**
     * 库存自动解锁
     * 1)、下订单成功，订单过期没有支付被系统自动取消、被用户手动取消。都要解锁库存
     * 2)、下订单成功，库存锁定成功，接下来的业务调用失败，导致订单回滚。
     *
     * @param stockLockedTo
     * @param message
     */
    @RabbitHandler
    public void handleStockLockedRelease(StockLockedTo stockLockedTo, Message message, Channel channel) throws IOException {
        System.out.println("收到解锁库存的消息");
        try {
            wareSkuService.unLockStock(stockLockedTo);
            channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
        }catch (Exception e){
            e.printStackTrace();
            channel.basicReject(message.getMessageProperties().getDeliveryTag(),true);
        }
    }
}
```

![image-20220819194526264](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.2.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareSkuService`接口里添加`unLockStock`方法

```java
void unLockStock(StockLockedTo stockLockedTo);
```

![image-20220819194558031](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.2.2.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里实现`unLockStock`方法

```java
@Transactional(rollbackFor = Exception.class)
@Override
public void unLockStock(StockLockedTo stockLockedTo) {
    //工作单详情
    StockLockedTo.StockDetailTo detail = stockLockedTo.getDetail();
    WareOrderTaskDetailEntity wareOrderTaskDetailEntity = wareOrderTaskDetailService.getById(detail.getId());
    if (wareOrderTaskDetailEntity == null) {
        //工作单详情里没有数据，无需解锁，确认收到消息
        return;
    }
    /**
     * 解锁库存
     * 1、没有订单：证明锁定库存后面的业务出问题了，这种情况需要解锁库存
     * 2、有订单：如果有订单需要判断订单状态，如果订单状态为`未支付`或`用户主动取消` 这时需要解锁库存
     */
    //库存工作单id
    Long wareOrderTaskId = stockLockedTo.getId();
    WareOrderTaskEntity wareOrderTaskEntity = wareOrderTaskService.getById(wareOrderTaskId);
    R r = orderFeignService.getOrderStatus(wareOrderTaskEntity.getOrderSn());
    if (r.getCode() != 0) {
        //消息拒绝以后重新放到队列里面，让别人继续消费解锁。
        //channel.basicReject(message.getMessageProperties().getDeliveryTag(),true);
        throw new RuntimeException("获取订单状态异常");
    }
    Object data = r.get("data");
    OrderVo orderVo = null;
    if (data != null) {
        String s = JSON.toJSONString(data);
        orderVo = JSON.parseObject(s, OrderVo.class);
    }
    //没有订单或订单状态为待付款或取消 并且工作单的锁定状态为已锁定
    if ((data==null || OrderStatusEnum.CANCLED.getCode().equals(orderVo.getStatus())
            || OrderStatusEnum.CREATE_NEW.getCode().equals(orderVo.getStatus()))
            && wareOrderTaskDetailEntity.getLockStatus()==1) {
        this.unLockStock(detail.getSkuId(),detail.getWareId(),detail.getSkuNum(),detail.getId());
    }
}

private void unLockStock(Long skuId,Long wareId,Integer num,Long taskDetailId){
    //库存解锁
    //update wms_ware_sku set stock_locked = stock_locked - 1 where sku_id = 1 and ware_id = 1
    wareSkuDao.unLockStock(skuId,wareId,num);
    //更新库存工作单状态
    WareOrderTaskDetailEntity entity = new WareOrderTaskDetailEntity();
    entity.setId(taskDetailId);
    //已解锁
    entity.setLockStatus(2);
    wareOrderTaskDetailService.updateById(entity);
}
```

![image-20220819201656739](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.2.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.dao.WareSkuDao`接口里添加`unLockStock`方法

```java
void unLockStock(@Param("skuId") Long skuId, @Param("wareId") Long wareId, @Param("num") Integer num);
```

![image-20220819195321505](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.2.4.png)

在`gulimall-ware`模块的`src/main/resources/mapper/ware/WareSkuDao.xml`文件里添加`id`为`unLockStock`的`sql`

```xml
<update id="unLockStock">
    update gulimall_wms.wms_ware_sku
    set stock_locked = stock_locked - #{num} where sku_id = #{skuId} and ware_id = #{wareId}
</update>
```

![image-20220819195528705](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.2.5.png)

删掉`gulimall-ware`模块的`com.atguigu.gulimall.ware.config.MyRabbitConfig`配置类的`listener`方法

```java
@RabbitListener(queues = "stock.release.stock.queue")
public void listener(Message message){

}
```

![image-20220819200028084](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.2.6.png)

##### 3、没有收到消息

调试时发现延迟队列一直没有收到消息

![image-20220819203540905](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.3.1.png)

查看`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`orderLockStock`方法，可以看到是这里的交换机名称写错了，果然还是得用枚举或常量

![image-20220819203514587](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.3.2.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`orderLockStock`方法里，把`"order-event-exchange"`改为`"stock-event-exchange"`

![image-20220819203808641](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.3.3.png)

##### 4、远程调用失败

然后老师也说了,`feign`远程调用会失败`sun.net.www.http.HttpClient(http://auth.gulimall.com/login.html)`，失败的原因就是没有进行登录（配置的访问`GulimallOrderApplication`服务所有请求都需要登录）

![image-20220819204634690](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.4.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.interceptor.LoginUserInterceptor`类的`preHandle`方法的开头添加如下代码，直接放行`order/order/status/`开头的请求

```java
String uri = request.getRequestURI();
boolean match = new AntPathMatcher().match("order/order/status/**", uri);
if (match){
    return true;
}
```

![image-20220819205105392](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.4.2.png)

重启`GulimallOrderApplication`服务后，还是报了`feign`的错误

```
feign.codec.DecodeException: Could not extract response: no suitable HttpMessageConverter found for response type [class com.atguigu.common.utils.R] and content type [text/html;charset=UTF-8]
    at feign.SynchronousMethodHandler.decode(SynchronousMethodHandler.java:180)
    at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:140)
    at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:78)
    at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:103)
    at com.sun.proxy.$Proxy108.getOrderStatus(Unknown Source)
    at com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl.unLockStock(WareSkuServiceImpl.java:240)
    at com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl$$FastClassBySpringCGLIB$$422f6383.invoke(<generated>)
    at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)
```

![image-20220819210401150](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.4.3.png)

调试后，发现还是跳转到了登录页

![image-20220819211052935](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.4.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.interceptor.LoginUserInterceptor`类的`preHandle`方法的开头，可以看到我们访问的是`/order/order/status/202208192040228431560607606966325249`，而我们放行的是以`"order/order/status/**"`开头的请求，所以还是被拦截了

![image-20220819210303885](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.4.5.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.interceptor.LoginUserInterceptor`类的`preHandle`方法的开头，将刚刚配置的`"order/order/status/**"`修改为`"/order/order/status/**"`即可

![image-20220819211232854](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.4.6.png)

##### 5、再次测试

重启`GulimallOrderApplication`服务和`GulimallWareApplication`服务，截断`gulimall_oms`数据库的`oms_order`订单表和`oms_order_item`订单项表，将`gulimall_wms`数据库的`wms_ware_sku`库存表的`stock_locked`被锁库存属性全部修改为`0`，表示没有库存被锁住。

![GIF 2022-8-19 16-44-56](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.5.1.gif)

登录后，在 http://order.gulimall.com/toTrade 页面里，点击提交订单，此时会报`/ by zero`错误。可以看到在`gulimall_oms`数据库里，`oms_order`表和`oms_order_item`表回滚了。在`gulimall_wms`数据库里，`wms_ware_sku`表里已经锁定库存了，`wms_ware_order_task`已经保存工作单了，`wms_ware_order_task_detail`里已经保存工作单详情了

![GIF 2022-8-20 9-22-37](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.5.2.gif)

等到了规定的时间还没有支付后，处理解锁库存的接口收到了解锁库存的消息，`gulimall_wms`数据库的`wms_ware_order_task_detail`表将刚新增的数据的`lock_status`字段变为`2`（状态由`已锁定`变为`已解锁`），`wms_ware_sku`表里已锁定的库存也重新被解锁了

![GIF 2022-8-20 9-24-37](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.2.5.3.gif)

[点击查看OrderServiceImpl类完整代码](code/6.2.3.4.5.OrderServiceImp.java)

[点击查看StockReleaseListener类完整代码](code/6.2.3.4.5.StockReleaseListener.java)

[点击查看WareSkuServiceImpl类完整代码](code/6.2.3.4.5.WareSkuServiceImpl.java)

#### 3、释放订单

##### 1、添加关闭订单方法

![消息队列流程](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.1.1.png)



剪切`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类的`listener`方法

```java
/**
 * com.atguigu.gulimall.order.web.HelloController类的createOrderTest方法发送消息
 * @param orderEntity
 * @param channel
 * @param message
 * @throws IOException
 */
@RabbitListener(queues = "order.release.order.queue")
public void listener(OrderEntity orderEntity, Channel channel, Message message) throws IOException, InterruptedException {
    Thread.sleep(5*1000);
    System.out.println("收到过期的订单信息，准备关闭订单=>"+orderEntity.getOrderSn()+"时间=>"+orderEntity.getModifyTime());
    channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
}
```

![image-20220820093919450](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.1.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order`包里新建`listener`文件夹，在`listener`文件夹里新建`OrderCloseListener`，将刚刚剪切的代码粘贴到这里，并稍加改造。

```java
package com.atguigu.gulimall.order.listener;

import com.atguigu.gulimall.order.entity.OrderEntity;
import com.atguigu.gulimall.order.service.OrderService;
import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * @author 无名氏
 * @date 2022/8/20
 * @Description:
 */
@Service
@RabbitListener(queues = "order.release.order.queue")
public class OrderCloseListener {

    @Autowired
    OrderService orderService;

    /**
     * com.atguigu.gulimall.order.web.HelloController类的createOrderTest方法发送消息
     * @param orderEntity
     * @param channel
     * @param message
     * @throws IOException
     */
    @RabbitHandler
    public void listener(OrderEntity orderEntity, Channel channel, Message message) throws IOException, InterruptedException {
        System.out.println("收到过期的订单信息，准备关闭订单=>"+orderEntity.getOrderSn()+"时间=>"+orderEntity.getModifyTime());
        try {
            orderService.closeOrder(orderEntity);
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
        } catch (Exception e) {
            channel.basicReject(message.getMessageProperties().getDeliveryTag(), true);
            e.printStackTrace();
        }
    }
}
```

![image-20220822210533628](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.1.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里添加`closeOrder`方法

```java
void closeOrder(OrderEntity orderEntity);
```

![image-20220820094606929](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.1.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`实现类里实现`closeOrder`方法

```java
@Override
public void closeOrder(OrderEntity entity) {
    OrderEntity orderEntity = this.getById(entity.getId());
    if (OrderStatusEnum.CREATE_NEW.getCode().equals(orderEntity.getStatus())) {
        OrderEntity update = new OrderEntity();
        update.setStatus(OrderStatusEnum.CANCLED.getCode());
        this.updateById(update);
    }
}
```

![image-20220820100504664](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.1.5.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`submitOrder`方法里，注释掉`int i = 10/0;`，并在下面添加`rabbitTemplate.convertAndSend("order-event-exchange","order.create.order",orderCreateTo.getOrder());`代码

```java
//int i = 10/0;
//订单创建成功，发消息给RabbitMQ
rabbitTemplate.convertAndSend("order-event-exchange","order.create.order",orderCreateTo.getOrder());
```

![image-20220820100200680](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.1.6.png)

##### 2、释放订单

有可能订单创建成功后，由于各种原因，订单解锁比库存解锁后执行，因此订单解锁后可以给库存解锁发一条消息，告知库存服务及时解锁库存

![image-20220820100815031](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.1.png)

这次我们实现的业务功能为下面画的红色方框的部分

![消息队列流程](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类里添加`orderReleaseOtherBinding`方法

```java
@Bean
public Binding orderReleaseOtherBinding(){
    return new Binding("stock.release.stock.queue", Binding.DestinationType.QUEUE,
            "order-event-exchange","order.release.other.#",null);
}
```

![image-20220820103021456](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.3.png)

复制`gulimall-order`模块的`com.atguigu.gulimall.order.entity.OrderEntity`类，粘贴到`gulimall-common`模块的`com.atguigu.common.to`包下，并重命名为`OrderTo`

[点击查看6.2.3.5.2.OrderTo类完整代码](code/6.2.3.5.2.OrderTo.java)

![image-20220820104251097](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里添加`closeOrder`方法

```java
@Override
public void closeOrder(OrderEntity entity) {
    OrderEntity orderEntity = this.getById(entity.getId());
    if (OrderStatusEnum.CREATE_NEW.getCode().equals(orderEntity.getStatus())) {
        OrderEntity update = new OrderEntity();
        update.setStatus(OrderStatusEnum.CANCLED.getCode());
        this.updateById(update);
        OrderTo orderTo = new OrderTo();
        BeanUtils.copyProperties(orderEntity,orderTo);
        orderTo.setStatus(OrderStatusEnum.CANCLED.getCode());
        rabbitTemplate.convertAndSend("order-event-exchange","order.release.other",orderTo);
    }
}
```

![image-20220820104439272](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.5.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.listener.StockReleaseListener`类里添加`handleStockLockedRelease`方法

```java
@RabbitHandler
public void handleStockLockedRelease(OrderTo orderTo, Message message, Channel channel) throws IOException {
    System.out.println("订单关闭，准备解锁库存");
    try {
        wareSkuService.unLockStock(orderTo);
        channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
    }catch (Exception e){
        e.printStackTrace();
        channel.basicReject(message.getMessageProperties().getDeliveryTag(),true);
    }
}
```

![image-20220820104842039](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.6.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareSkuService`接口里添加`unLockStock(OrderTo orderTo);`方法

```java
void unLockStock(OrderTo orderTo);
```

![image-20220820104911873](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.7.png)

修改`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类的`unLockStock(StockLockedTo stockLockedTo)`方法，将这个`|| OrderStatusEnum.CREATE_NEW.getCode().equals(orderVo.getStatus())`删掉

![image-20220820103803950](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.8.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareSkuServiceImpl`类里实现`unLockStock(OrderTo orderTo)`方法

```java
/**
 * 防止订单服务卡顿，导致订单状态消息一直改不了，库存消息优先到期。查订单状态新建状态，什么都不做就走了。
 * 导致卡顿的订单，永远不能解锁库存
 *
 * @param orderTo
 */
@Override
public void unLockStock(OrderTo orderTo) {
    String orderSn = orderTo.getOrderSn();
    WareOrderTaskEntity orderTaskEntity = wareOrderTaskService.getOrderTaskByOrderSn(orderSn);
    Long taskId = orderTaskEntity.getId();
    List<WareOrderTaskDetailEntity> orderTaskDetailEntities = wareOrderTaskDetailService.getOrderTaskDetailsByTaskId(taskId);
    for (WareOrderTaskDetailEntity entity : orderTaskDetailEntities) {
        this.unLockStock(entity.getSkuId(),entity.getWareId(),entity.getSkuNum(),entity.getId());
    }
}
```

![image-20220820111059199](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.2.9.png)

##### 3、获取订单详细信息

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareOrderTaskService`接口里添加`getOrderTaskByOrderSn`抽象方法

```java
WareOrderTaskEntity getOrderTaskByOrderSn(String orderSn);
```

![image-20220820110519336](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.3.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareOrderTaskServiceImpl`类里实现`getOrderTaskByOrderSn`方法

```java
@Override
public WareOrderTaskEntity getOrderTaskByOrderSn(String orderSn) {

    LambdaQueryWrapper<WareOrderTaskEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(WareOrderTaskEntity::getOrderSn,orderSn);
    return this.getOne(lambdaQueryWrapper);
}
```

![image-20220820110807546](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.3.2.png)

##### 4、获取工作单详情

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.WareOrderTaskDetailService`接口里添加`getOrderTaskDetailsByTaskId`方法 

```java
List<WareOrderTaskDetailEntity> getOrderTaskDetailsByTaskId(Long taskId);
```

![image-20220820111218019](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.4.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.service.impl.WareOrderTaskDetailServiceImpl`类里实现`getOrderTaskDetailsByTaskId`方法

```java
@Override
public List<WareOrderTaskDetailEntity> getOrderTaskDetailsByTaskId(Long taskId) {
    LambdaQueryWrapper<WareOrderTaskDetailEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(WareOrderTaskDetailEntity::getTaskId,taskId)
            .eq(WareOrderTaskDetailEntity::getLockStatus, 1);
    return this.list(lambdaQueryWrapper);

}
```

![image-20220820111428364](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.4.2.png)

##### 5、测试

测试时发现其他都正确，就是状态一直更新不成功

![image-20220822202205798](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.5.1.png)

查看`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`closeOrder`方法，发现更新时忘记写`id`了，在`OrderEntity update = new OrderEntity();`创建`OrderEntity`类对象后设置要更新的订单`id`

```
update.setId(entity.getId());
```

![image-20220822203444329](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.5.2.png)

##### 6、情况一

（普通情况，先收到订单关闭消息，再收到解锁库存的消息，此时订单先关闭，订单关闭后通知了解锁库存服务，已将库存解锁，收到解锁库存的消息后库存已解锁）：这个视频在typora里无法播放

[//]: # (<video src="video/6.2.4.3.6.mp4"></video>)

```

[//]: # (<video src="video/6.2.4.3.6.mp4"></video>)
```

##### 7、情况二

（极端情况，由于网络原因或其他原因，先收到解锁库存的消息，此时不做处理，后收到订单关闭消息，订单关闭后再通知库存服务让其解锁库存）

我们可以设置订单关闭的时间大于库存释放时间，即订单关闭比库存解锁时间晚，用来模拟这种极端情况

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类的`orderDelayQueue`方法里，修改`key`为`x-message-ttl`的`value`

```java
arguments.put("x-message-ttl", TimeUnit.MINUTES.toMillis(2));
```

![image-20220822210102386](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.7.1.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.config.MyRabbitConfig`类的`stockDelayQueue`方法里，修改`key`为`x-message-ttl`的`value`

```java
arguments.put("x-message-ttl", TimeUnit.MINUTES.toMillis(1));
```

![image-20220822210139229](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.7.2.png)

##### 8、测试

启动`GulimallWareApplication`服务后报了如下的错误，这是因为我们在代码里修改了`队列的配置`，修改后的2配置与`RabbitMQ`里队列的配置不一致导致报错了，我们只需删掉`RabbitMQ`里这些队列，让其自动再重新创建即可

```bash
2022-08-22 21:08:35.871 ERROR 7472 --- [.168.56.10:5672] o.s.a.r.c.CachingConnectionFactory       : Channel shutdown: channel error; protocol method: #method<channel.close>(reply-code=406, reply-text=PRECONDITION_FAILED - inequivalent arg 'x-message-ttl' for queue 'stock.delay.queue' in vhost '/': received '60000' but current is '120000', class-id=50, method-id=10)
2022-08-22 21:08:37.882 ERROR 7472 --- [.168.56.10:5672] o.s.a.r.c.CachingConnectionFactory       : Channel shutdown: channel error; protocol method: #method<channel.close>(reply-code=406, reply-text=PRECONDITION_FAILED - inequivalent arg 'x-message-ttl' for queue 'stock.delay.queue' in vhost '/': received '60000' but current is '120000', class-id=50, method-id=10)
2022-08-22 21:08:41.888 ERROR 7472 --- [.168.56.10:5672] o.s.a.r.c.CachingConnectionFactory       : Channel shutdown: channel error; protocol method: #method<channel.close>(reply-code=406, reply-text=PRECONDITION_FAILED - inequivalent arg 'x-message-ttl' for queue 'stock.delay.queue' in vhost '/': received '60000' but current is '120000', class-id=50, method-id=10)
2022-08-22 21:08:46.892 ERROR 7472 --- [.168.56.10:5672] o.s.a.r.c.CachingConnectionFactory       : Channel shutdown: channel error; protocol method: #method<channel.close>(reply-code=406, reply-text=PRECONDITION_FAILED - inequivalent arg 'x-message-ttl' for queue 'stock.delay.queue' in vhost '/': received '60000' but current is '120000', class-id=50, method-id=10)
```

![image-20220822210902236](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.8.1.png)

删掉`RabbitMQ`里的`stock.delay.queue`队列

![image-20220822211025749](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.8.2.png)

删掉`RabbitMQ`里的`order.delay.queue`队列

![image-20220822211028763](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.8.3.png)

此时可以看到即便是特殊情况，我们也能很好的进行处理，这个视频在typora里无法播放

[//]: # (<video src="video/6.2.4.3.8.mp4"></video>)

```

[//]: # (<video src="video/6.2.4.3.8.mp4"></video>)
```

##### 9、复原

删掉`RabbitMQ`里的`order.delay.queue`队列

![image-20220822214233325](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.9.1.png)

删掉`RabbitMQ`里的`stock.delay.queue`队列

![image-20220822214236017](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.9.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类的`orderDelayQueue`方法里，重新修回`key`为`x-message-ttl`的`value`

```
arguments.put("x-message-ttl", TimeUnit.MINUTES.toMillis(1));
```

![image-20220822214459221](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.9.3.png)

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.config.MyRabbitConfig`类的`stockDelayQueue`方法里，重新修改回`key`为`x-message-ttl`的`value`

```
arguments.put("x-message-ttl", TimeUnit.MINUTES.toMillis(2));
```

![image-20220822214432764](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.3.9.4.png)

#### 4、如何保证消息可靠性

##### **1、消息丢失**

- 消息发送出去，由于网络问题没有抵达服务器

  - 做好容错方法（try-catch），发送消息可能会网络失败，失败后要有重试机 制，可记录到数据库，采用定期扫描重发的方式

  - 做好日志记录，每个消息状态是否都被服务器收到都应该记录

  - 做好定期重发，如果消息没有发送成功，定期去数据库扫描未成功的消息进 行重发

- 消息抵达Broker，Broker要将消息写入磁盘（持久化）才算成功。此时Broker尚 未持久化完成，宕机。
  - publisher也必须加入确认回调机制，确认成功的消息，修改数据库消息状态。

- 自动ACK的状态下。消费者收到消息，但没来得及消息然后宕机
  - 一定开启手动ACK，消费成功才移除，失败或者没来得及处理就noAck并重新入队

##### **2、消息重复**

- 消息消费成功，事务已经提交，ack时，机器宕机。导致没有ack成功，Broker的消息 重新由unack变为ready，并发送给其他消费者

- 消息消费失败，由于重试机制，自动又将消息发送出去

- 成功消费，ack时宕机，消息由unack变为ready，Broker又重新发送

  - 消费者的业务消费接口应该设计为幂等性的。比如扣库存有 工作单的状态标志

  - 使用防重表（redis/mysql），发送消息每一个都有业务的唯 一标识，处理过就不用处理

  - rabbitMQ的每一个消息都有redelivered字段，可以获取是否 是被重新投递过来的，而不是第一次投递过来的

##### **3、消息积压**

- 消费者宕机积压

- 消费者消费能力不足积压

- 发送者发送流量太大

  - 上线更多的消费者，进行正常消费

  - 上线专门的队列消费服务，将消息先批量取出来，记录数据库，离线慢慢处理

#### 5、可能发生的情况

##### 情况一

消息发送出去了，但由于网络问题没有抵达`Broker`消息代理(这里的消息代理指的是`RabbitMQ`)。我们在发送消息前可以先记录日志，定时扫描日志，及时发现没有抵达到消息代理的消息

```java
@Override
public void closeOrder(OrderEntity entity) {
    OrderEntity orderEntity = this.getById(entity.getId());
    if (OrderStatusEnum.CREATE_NEW.getCode().equals(orderEntity.getStatus())) {
        OrderEntity update = new OrderEntity();
        update.setStatus(OrderStatusEnum.CANCLED.getCode());
        this.updateById(update);
        OrderTo orderTo = new OrderTo();
        BeanUtils.copyProperties(orderEntity,orderTo);
        orderTo.setStatus(OrderStatusEnum.CANCLED.getCode());
        try {
            //TODO 保证消息一定会发送出去，每一个消息都可以做好日志记录(给数据库保存每一个消息的详细信息)。
            //定期扫描数据库将失败的消息再发送一遍;
            rabbitTemplate.convertAndSend("order-event-exchange", "order.release.other", orderTo);
        }catch (Exception e){
            //将没法送成功的消息进行重试发送。
            e.printStackTrace();
        }
    }
}
```

![image-20220820113603559](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.5.1.1.png)

我们也可以在`gulimall_oms`模块里新建`mq_message`表，在消息发送前将消息状态设置为`已发送`，然后定期检查这张表，将订单状态一直为`已发送`的消息再次发送。（一直为`已发送`表示有可能是消息没有抵达）

```mysql
CREATE TABLE `mq_message` (
    `message_id` CHAR ( 32 ) NOT NULL,
    `content` text,
    `to_exchane` VARCHAR ( 255 ) DEFAULT NULL,
    `routing_key` VARCHAR ( 255 ) DEFAULT NULL,
    `class_type` VARCHAR ( 255 ) DEFAULT NULL,
    `message_status` INT ( 1 ) DEFAULT '0' COMMENT '0-新建 1-已发送 2-错误抵达 3-已抵达',
    `create_time` datetime DEFAULT NULL,
    `update_time` datetime DEFAULT NULL,
PRIMARY KEY ( `message_id` ) 
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4
```

![image-20220820112924243](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.5.1.2.png)

##### 情况二

消息抵达Broker，Broker要将消息写入磁盘（持久化）才算成功。此时Broker尚未持久化完成，然后突然宕机了。

可以在`publisher`消息的发布者里加入确认回调机制，确认成功的消息，修改数据库消息状态。

![image-20220820151026268](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.5.2.png)

##### 情况三

自动`ACK`的状态下。消费者收到消息，但没来得及消费消息然后宕机，导致消息没有被处理。

一定开启手动`ACK`，消费成功后才移除消息，失败或者没来得及处理就`noAck`并重新入队（还要注意消息重复消费的问题，可以给消息设置唯一`id`，防止消息被重复消费）

![image-20220822210413289](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.5.3.1.png)

消息消费成功，事务已经提交，准备`ack`时，机器宕机。导致没有`ack`成功，`Broker`的消息 重新由`unack`变为`ready`，并发送给其他消费者

消费者的业务消费接口应该设计为幂等性的。比如扣库存有 工作单的状态标志

使用防重表（使用`redis`或`mysql`），发送消息每一个都有业务的唯 一标识，处理过就不用处理

`rabbitMQ`的每一个消息都有`redelivered`字段，可以获取是否是被重新投递过来的，而不是第一次投递过来的

![image-20220822210402264](https://gitlab.com/apzs/image/-/raw/master/image/6.2.4.5.3.2.png)
