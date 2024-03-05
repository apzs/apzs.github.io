# 6.3、支付商品

### 6.3.1、支付

#### 1、相关概念

##### 1、文档

支付宝电脑网站解锁

文档链接：https://opendocs.alipay.com/open/270/105898?ref=api

![GIF 2022-8-20 15-34-17](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.1.1.1.gif)

文档链接2：https://opendocs.alipay.com/open/270/105898

![GIF 2022-8-20 15-36-49](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.1.1.2.gif)



网址： https://open.alipay.com/develop/pm/create

![GIF 2022-8-20 15-42-24](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.1.1.3.gif)

##### 2、对称秘钥

**加密-对称加密**

发送方和接收方都拥有同样的秘钥，当发送方想要发送消息时，使用秘钥将明文进行加密，在网络中传输加密后的密文数据，接收方收到密文数据后使用相同的秘钥进行解密

![image-20220820160519647](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.1.2.png)

`DES`、`3DES`（`TripleDES`）、`AES`、`RC2`、`RC4`、`RC5`和`Blowfish`等，加密解密使用同一把钥匙

##### 3、非对称秘钥

**加密-非对称加密**

非对称加密的公钥都是公开的，只有自己拥有属于自己的秘钥，当发送方想要发送消息时，使用接收方的公钥进行加密（只有接收方的秘钥才能解开使用接收方的公钥加密的密文），在网络中传输加密后的数据，当接收方接收到消息时，使用接收方自己的秘钥进行解密。同理，当接收方想要发送消息时，使用发送方的公钥进行加密（只有发送方的秘钥才能解开使用发送方的公钥加密的密文），在网络中传输加密后的数据，当发送方接收到消息时，使用发送方自己的秘钥进行解密。（即想要发送数据给谁，就是用对方的公钥进行加密，对方收到数据后，可以通过对方的秘钥进行解密）

![image-20220820160600084](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.1.3.png)

`RSA`、`Elgamal`等，加密解密使用不同钥匙

#### 2、支付宝支付

##### 1、电脑网站支付产品介绍

电脑网站支付产品介绍:  https://opendocs.alipay.com/open/270

![image-20220820162411417](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.2.1.png)

##### 2、SDK & Demo

下载demo: https://opendocs.alipay.com/open/270/106291

![image-20220820162414669](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.2.2.png)

##### 3、配置使用沙箱进行测试

1、使用 RSA 工具生成签名
2、下载沙箱版钱包
3、运行官方 demo 进行测试

##### 4、公钥 &  私钥

什么是公钥、私钥、加密、签名和验签？

1、公钥私钥
公钥和私钥是一个相对概念
它们的公私性是相对于生成者来说的。
一对密钥生成后，保存在生成者手里的就是私钥， 生成者发布出去大家用的就是公钥

##### 5、加密 & 数字签名

加密和数字签名概念
加密：

- 我们使用一对公私钥中的一个密钥来对数据进行加密，而使用另一个密钥来进行解密的技术。
- 公钥和私钥都可以用来加密，也都可以用来解密。
- 但这个加解密必须是一对密钥之间的互相加解密，否则不能成功。
- 加密的目的是：
为了确保数据传输过程中的不可读性，就是不想让别人看到。

签名：
- 给我们将要发送的数据，做上一个唯一签名（类似于指纹）
- 用来互相验证接收方和发送方的身份；
- 在验证身份的基础上再验证一下传递的数据是否被篡改过。因此使用数字签名可以用来达到数据的明文传输。

验签
- 支付宝为了验证请求的数据是否商户本人发的
- 商户为了验证响应的数据是否支付宝发的

签名是先计算哈希值然后用私钥加密，私钥对外不公开所以不能自己生成签名（下面这个图应该有问题，商户给支付宝发消息应该使用支付宝的公钥进行加密，支付宝收到消息后使用支付宝自己的私钥进行解密；支付宝业务处理完成后，使用商户的公钥对消息进行加密，商户收到消息后使用商户自己的私钥进行解密）

![image-20220820163916589](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.2.5.png)

#### 3、使用支付宝提供的demo

##### 1、开启沙箱

在 https://open.alipay.com/develop/sandbox/app 页面里开启沙箱 ，开启沙箱后，在`开放平台控制台` -> `沙箱` -> `控制台`  ->`网页/移动应用` ->  `应用信息` -> `开发信息` 在`接口加签方式`里选择`系统默认秘钥`，点击`公钥模式`右边`启用`按钮，然后点击`查看`，即可看到`应用公钥`、`应用私钥`、`支付宝公钥`信息

![GIF 2022-8-20 16-57-39](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.1.1.gif)

在`开放平台控制台` -> `沙箱` -> `控制台`  ->`网页/移动应用` ->  `应用信息` -> `基本信息` 里复制`APPID`

![image-20220820170302186](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.1.2.png)

##### 2、调试demo

在 https://opendocs.alipay.com/open/270/106291  页面里下载`demo`后使用`eclipse`打开，我这里使用的软件是`Spring Tools 4 for Eclipse`，粘贴刚刚复制的`APPID`到`com.alipay.config.AlipayConfig`的`app_id`字段里

![image-20220820170911893](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.1.png)

点击`控制台`  ->`网页/移动应用` ->  `应用信息` -> `开发信息`  -> `接口加签方式`里选择`系统默认秘钥`，点击`公钥模式`的`查看`按钮，点击`应用私钥`里的`复制私钥`

![image-20220820170940656](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.2.png)

粘贴刚刚复制的`应用私钥`到`com.alipay.config.AlipayConfig`类的`merchant_private_key`字段里

![image-20220820171012120](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.3.png)

点击`控制台`  ->`网页/移动应用` ->  `应用信息` -> `开发信息`  -> `接口加签方式`里选择`系统默认秘钥`，点击`公钥模式`的`查看`按钮，点击`支付宝公钥`的`复制公钥`

![image-20220820171050458](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.4.png)

粘贴刚刚复制的`支付宝公钥`到`com.alipay.config.AlipayConfig`类的`alipay_public_key`字段里

![image-20220820171045983](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.5.png)

在`开放平台控制台` -> `沙箱` -> `控制台`  ->`网页/移动应用` ->  `应用信息` -> `开发信息` 里复制`支付宝网关地址`的值

![image-20220820171327453](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.6.png)

粘贴刚刚复制的`支付宝网关地址`到`com.alipay.config.AlipayConfig`类的`gatewayUrl`字段里

![image-20220820171323382](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.2.7.png)

##### 3、测试

运行demo项目，访问 http://localhost:8080/alipay.trade.page.pay-JAVA-UTF-8 页面，点demo里的`付款`按钮，然后使用沙箱提供的`沙箱账号`的`买家信息`的`买家账号`去支付，可以看到能够支付成功，但是支付成功的回调url如果要是用户访问的话必须是公网可以访问的。（即支付宝在公网上能够访问的接口）

![GIF 2022-8-20 19-03-14](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.3.gif)

##### 4、再次测试

修改`com.alipay.config.AlipayConfig`类的`notify_url`字段和`return_url`字段，将地址改成本地的，这样使用自己电脑可以跳转页面，但是异步通知会访问不到。（异步通知就是支付成功后，支付宝会不断地向该接口发送支付成功的消息，直到我们的接口返回确认收到后，支付宝才停止通知）

![image-20220820190610688](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.4.1.png)

重启项目，支付成功后即可跳转到我们设置的支付成功回调页

![GIF 2022-8-20 19-08-39](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.3.4.2.gif)

#### 4、整合支付宝支付

##### 1、添加依赖

在`gulimall-order`模块的`pom.xml`文件里添加`alipay`的依赖

```xml
<!--支付宝的SDK-->
<dependency>
   <groupId>com.alipay.sdk</groupId>
   <artifactId>alipay-sdk-java</artifactId>
   <version>4.9.28.ALL</version>
</dependency>
```

![image-20220820194410081](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.1.png)

##### 2、添加代码

复制`2.分布式高级篇（微服务架构篇）\资料源码\代码\支付`里的`PayVo.java`，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包下

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;

@Data
public class PayVo {
    private String out_trade_no; // 商户订单号 必填
    private String subject; // 订单名称 必填
    private String total_amount;  // 付款金额 必填
    private String body; // 商品描述 可空
}
```

![image-20220820194630307](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.2.1.png)

复制`2.分布式高级篇（微服务架构篇）\资料源码\代码\支付`里的`AlipayTemplate.java`，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.config`包下，修改`AlipayTemplate`类里导入的`PayVo`类的路径

![image-20220820194859881](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.AlipayTemplate`类里，修改`app_id`、`merchant_private_key`、`alipay_public_key`、`gatewayUrl`这些字段的值

![image-20220820205459867](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.2.3.png)

将`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayVo`类里的字段修改为小驼峰命名法

```java
package com.atguigu.gulimall.order.vo;

import lombok.Data;

@Data
public class PayVo {
    /**
     * 商户订单号 必填
     */
    private String outTradeNo;
    /**
     * 订单名称 必填
     */
    private String subject;
    /**
     * 付款金额 必填
     */
    private String totalAmount;
    /**
     * 商品描述 可空
     */
    private String body;
}
```

![image-20220820204732495](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.2.4.png)

修改后的`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayVo`类

[点击查看完整代码](code/6.3.1.4.2.java)

![image-20220820205600161](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.2.5.png)

##### 3、不能调用商品服务

重启`GulimallOrderApplication`服务，测试时发现`GulimallCartApplication`模块的控制台报`不能成功调用gulimall-product`服务的错误

```bash
com.netflix.client.ClientException: Load balancer does not have available server for client: gulimall-product
	at com.netflix.loadbalancer.LoadBalancerContext.getServerFromLoadBalancer(LoadBalancerContext.java:483) ~[ribbon-loadbalancer-2.3.0.jar:2.3.0]
	at com.netflix.loadbalancer.reactive.LoadBalancerCommand$1.call(LoadBalancerCommand.java:184) ~[ribbon-loadbalancer-2.3.0.jar:2.3.0]
    ......
	at com.atguigu.gulimall.cart.service.impl.CartServiceImpl.lambda$getUserCartItems$2(CartServiceImpl.java:170) ~[classes/:na]
	at java.util.stream.ReferencePipeline$3$1.accept(ReferencePipeline.java:193) ~[na:1.8.0_301]
	at java.util.stream.ReferencePipeline$2$1.accept(ReferencePipeline.java:175) ~[na:1.8.0_301]
	at java.util.ArrayList$ArrayListSpliterator.forEachRemaining(ArrayList.java:1384) ~[na:1.8.0_301]
	at java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:482) ~[na:1.8.0_301]
	at java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:472) ~[na:1.8.0_301]
	at java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:708) ~[na:1.8.0_301]
	at java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234) ~[na:1.8.0_301]
	at java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:499) ~[na:1.8.0_301]
	at com.atguigu.gulimall.cart.service.impl.CartServiceImpl.getUserCartItems(CartServiceImpl.java:175) ~[classes/:na]
	at com.atguigu.gulimall.cart.controller.CartController.getCurrentUserCartItems(CartController.java:31) ~[classes/:na]
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_301]
```

![image-20220820201108997](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.3.1.png)

在`gulimall-product`模块的`src/main/resources/application.yml`文件里添加如下配置

```yaml
spring:
  application:
    name: gulimall-product
```

![image-20220820201455316](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.3.2.png)

改完后，重启`GulimallProductApplication`服务，这个`GulimallCartApplication`服务就不报错了，还有很多别的服务之间相互调用都失败了，查看`nacos`，可以看到这些服务明明都在

![image-20220820202047005](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.3.3.png)

重启`nacos`后，发现所有的页面都访问不了，查看网关报了以下错误，重启一下网关就好了，什么奇葩bug

```bash
java.lang.NullPointerException: null
	at com.alibaba.nacos.client.naming.core.PushReceiver.getUDPPort(PushReceiver.java:116) ~[nacos-client-1.1.1.jar:na]
	at com.alibaba.nacos.client.naming.core.HostReactor.updateServiceNow(HostReactor.java:270) ~[nacos-client-1.1.1.jar:na]
	at com.alibaba.nacos.client.naming.core.HostReactor$UpdateTask.run(HostReactor.java:315) [nacos-client-1.1.1.jar:na]
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511) [na:1.8.0_301]
	at java.util.concurrent.FutureTask.run(FutureTask.java:266) [na:1.8.0_301]
	at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$201(ScheduledThreadPoolExecutor.java:180) [na:1.8.0_301]
	at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:293) [na:1.8.0_301]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) [na:1.8.0_301]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) [na:1.8.0_301]
	at java.lang.Thread.run(Thread.java:748) [na:1.8.0_301]

2022-08-20 20:22:48.784 ERROR 11596 --- [.naming.updater] com.alibaba.nacos.client.naming          : [NA] failed to update serviceName: DEFAULT_GROUP@@gulimall-order

java.lang.NullPointerException: null
	at com.alibaba.nacos.client.naming.core.PushReceiver.getUDPPort(PushReceiver.java:116) ~[nacos-client-1.1.1.jar:na]
	at com.alibaba.nacos.client.naming.core.HostReactor.updateServiceNow(HostReactor.java:270) ~[nacos-client-1.1.1.jar:na]
	at com.alibaba.nacos.client.naming.core.HostReactor$UpdateTask.run(HostReactor.java:315) [nacos-client-1.1.1.jar:na]
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511) [na:1.8.0_301]
	at java.util.concurrent.FutureTask.run(FutureTask.java:266) [na:1.8.0_301]
	at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$201(ScheduledThreadPoolExecutor.java:180) [na:1.8.0_301]
	at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:293) [na:1.8.0_301]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149) [na:1.8.0_301]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624) [na:1.8.0_301]
	at java.lang.Thread.run(Thread.java:748) [na:1.8.0_301]

2022-08-20 20:22:49.034 ERROR 11596 --- [.naming.updater] com.alibaba.nacos.client.naming          : [NA] failed to update serviceName: DEFAULT_GROUP@@gulimall-product
```

![image-20220820202557738](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.3.4.png)

##### 4、不显示真是应付金额

登陆后，点击 http://order.gulimall.com/toTrade 页面的`提交订单`按钮，来到了 http://order.gulimall.com/submitOrder 页面，在这个页面里突然又不显示真实数据了

![image-20220820203125417](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.4.1.png)

在`gulimall-order`模块的`src/main/resources/templates/pay.html`页面里搜索`订单号`，修改相关的代码

```html
<dd>
  <span>订单提交成功，请尽快付款！订单号：[[${submitOrderResp.order.orderSn}]]</span>
  <span>应付金额<font>[[${#numbers.formatDecimal(submitOrderResp.order.payAmount,1,2)}]]</font>元</span>
</dd>
```

![image-20220820203242820](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.4.2.png)

重启`GulimallOrderApplication`服务，在 http://order.gulimall.com/submitOrder 页面里刷新一下，现在成功显示了

![image-20220820203427654](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.4.4.3.png)

#### 5、添加支付逻辑

##### 1、修改页面

在 http://order.gulimall.com/submitOrder  页面里，打开控制台，定位到`支付宝`图标，复制`支付宝`

![image-20220820203529433](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.1.1.png)

在`gulimall-order`模块的`src/main/resources/templates/pay.html`文件里搜索`支付宝`，修改相关代码。

```html
<div class="Jd_footer">
  <ul>
    <li>
      <img src="/static/order/pay/img\weixin.png" alt="">微信支付
    </li>
    <li>
      <img src="/static/order/pay/img\zhifubao.png" style="weight:auto;height:30px;" alt="">
      <a th:href="'http://order.gulimall.com/payOrder?orderSn='+${submitOrderResp.order.orderSn}">支付宝</a>
    </li>
  </ul>
</div>
```

![image-20220820203622191](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.1.2.png)

##### 2、修改代码

在`gulimall-order`模块的`com.atguigu.gulimall.order.web`包里新建`PayWebController`类

```java
package com.atguigu.gulimall.order.web;

import com.alipay.api.AlipayApiException;
import com.atguigu.gulimall.order.config.AlipayTemplate;
import com.atguigu.gulimall.order.service.OrderService;
import com.atguigu.gulimall.order.vo.PayVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author 无名氏
 * @date 2022/8/20
 * @Description:
 */
@Controller
public class PayWebController {

    @Autowired
    AlipayTemplate alipayTemplate;
    @Autowired
    OrderService orderService;

    @GetMapping("/payOrder")
    @ResponseBody
    public String payOrder(@RequestParam("orderSn") String orderSn) throws AlipayApiException {
        PayVo payVo = orderService.getOrderPay(orderSn);
        String pay = alipayTemplate.pay(payVo);
        System.out.println(pay);
        return pay;
    }
}
```

![image-20220820210626254](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里太内疚`getOrderPay`抽象方法

```java
PayVo getOrderPay(String orderSn);
```

![image-20220820210704284](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里实现`getOrderPay`方法

```java
@Override
public PayVo getOrderPay(String orderSn) {
    PayVo payVo = new PayVo();
    OrderEntity orderEntity = this.getOrderStatusByOrderSn(orderSn);

    BigDecimal totalAmount = orderEntity.getPayAmount().setScale(2, BigDecimal.ROUND_UP);
    payVo.setTotalAmount(totalAmount.toString());
    payVo.setOutTradeNo(orderEntity.getOrderSn());

    LambdaQueryWrapper<OrderItemEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.eq(OrderItemEntity::getOrderSn,orderSn).last(" limit 1");;
    OrderItemEntity orderItemEntity = orderItemService.getOne(lambdaQueryWrapper);
    payVo.setSubject(orderItemEntity.getSkuName());
    payVo.setBody(orderItemEntity.getSkuAttrsVals());

    return payVo;
}
```

![image-20220820213319648](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.2.3.png)

##### 3、测试

重启`GulimallOrderApplication`服务，点击 http://order.gulimall.com/toTrade 页面的`提交订单`按钮，来到了 http://order.gulimall.com/submitOrder 页面，点击`支付宝`图标就跳转到支付宝的页面了，此时查看`GulimallOrderApplication`服务的控制台，可以看到已经成功输出了支付宝返回的信息了

![GIF 2022-8-20 21-35-22](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.3.1.png)

支付宝返回了一个`<form>`表单和一个`<script>`用来提交表单，而且是使用`<script>`直接提交的

```java
<form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=QpWCjWl8avWnIjdrY5RFM8dv6TBjQI3escBJcCml%2B2g6tQaWQCjCtm5EgsnNZvlKVFcGl4oBLzpZEP0fFrlvZsinrLX3uIkka6zumCUT246hbd8rhT4utMS%2Bup%2BtsQwVB5Du16UzkE%2Bsd8WC37EUCg%2F%2Bd5%2FtR%2FoS7f2M8RYd%2B5oo0OgpGqEglOxQINIGyD%2Bg%2FCUeC2GmmK1q0a%2F07c8XCxUbPG0LPj3Opya%2F8V2Bn8PlNaQ25iEh%2BbnFjOhk1GPL3YDe8USR4KAluhylW4eHW9EDvSzEwUe3avub2l3Kt6WSdsJRfV8ux6HyIO7QdYFa3cCB3ZKS0xL1QItCs%2B83OA%3D%3D&version=1.0&app_id=2021000117672941&sign_type=RSA2&timestamp=2022-08-20+21%3A35%3A11&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json">
<input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;202208202135096131560983780531920898&quot;,&quot;total_amount&quot;:&quot;47401.00&quot;,&quot;subject&quot;:&quot;华为 HUAWEI Mate30Pro 罗兰紫 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机&quot;,&quot;body&quot;:&quot;颜色：罗兰紫;版本：8GB+128GB&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();</script>
```

![image-20220820213731759](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.3.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.web.PayWebController`类里修改`payOrder`方法，将`@GetMapping("/payOrder")`修改为`@GetMapping(value = "/payOrder",produces = "text/html")`

其实我更推荐使用`@GetMapping(value = "/payOrder",produces = MediaType.TEXT_HTML_VALUE)`

![image-20220820214600161](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.3.3.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.config.AlipayTemplate`类里的`returnUrl`字段

```java
private String returnUrl="http://member.gulimall.com/memberOrder.html";
```

![image-20220821085200342](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.3.4.png)

##### 4、添加页面

将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\订单页`里的`index.html`复制到在`gulimall-member`模块的`src/main/resources/templates`文件夹里面，并将刚刚粘贴的`index.html`重命名为`orderList.html`

![image-20220821085439712](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.4.1.png)

在`linux`虚拟机里的`/mydata/nginx/html/static`目录下新建`member`目录，将`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\订单页`里的文件夹全部复制到linux虚拟机里的`/mydata/nginx/html/static/member`目录下（不包括`index.html`）

![GIF 2022-8-21 8-59-42](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.4.2.gif)

修改`gulimall-member`模块的`src/main/resources/templates/orderList.html`文件，将`href="`全部替换为`href="/static/member/`，将`src="`全部替换为`src="/static/member/` 

[点击查看完整orderList页面](code/6.3.1.5.4.orderList.html)

```bash
href="
href="/static/member/

src="
src="/static/member/
```

![image-20220821090509845](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.4.3.png)

##### 5、添加配置

在`gulimall-member`模块的`pom.xml`文件里添加`thymeleaf`依赖

```xml
<!--模板引擎：thymeleaf-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

![image-20220821085558121](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.1.png)

在`gulimall-member`模块的`src/main/resources/application.properties`文件里添加如下配置，关闭`thymeleaf`缓存

```properties
spring.thymeleaf.cache=false
```

![image-20220821085651323](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.2.png)

在`gulimall-member`模块的`src/main/resources/templates/orderList.html`文件里，将`<html lang="en">`修改为`<html lang="en" xmlns:th="http://www.thymeleaf.org">`

![image-20220821090621314](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.3.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member`包下新建`interceptor`文件夹。复制`gulimall-order`模块的`com.atguigu.gulimall.order.interceptor.LoginUserInterceptor`类，粘贴到`gulimall-member`模块的`com.atguigu.gulimall.member.interceptor`包下。

[点击查看LoginUserInterceptor类完整代码](code/6.3.1.5.5.LoginUserInterceptor.java)

![image-20220821091053614](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.config`包下新建`MemberWebConfig`类

```java
package com.atguigu.gulimall.member.config;

import com.atguigu.gulimall.member.interceptor.LoginUserInterceptor;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 无名氏
 * @date 2022/8/21
 * @Description:
 */
@Controller
public class MemberWebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginUserInterceptor()).addPathPatterns("/**");
    }
}
```

![image-20220821092255087](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.5.png)

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.GulimallSessionConfig`类，粘贴到`gulimall-member`模块的`com.atguigu.gulimall.member.config`包下。

[点击查看GulimallSessionConfig类完整代码](code/6.3.1.5.5.GulimallSessionConfig.java)

![image-20220821094007003](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.6.png)

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件里添加如下配置

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: gulimall_member_route
          uri: lb://gulimall-member
          predicates:
            - Host=member.gulimall.com
```

![image-20220821091646118](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.7.png)

在`hosts`文件里添加`member.gulimall.com`网址对应的`ip`

```properties
# gulimall
192.168.56.10 gulimall.com
192.168.56.10 search.gulimall.com
192.168.56.10 item.gulimall.com
192.168.56.10 auth.gulimall.com
192.168.56.10 cart.gulimall.com
192.168.56.10 order.gulimall.com
192.168.56.10 member.gulimall.com
```

![image-20220821091850027](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.5.8.png)

##### 6、修改页面和配置

在 http://gulimall.com/  页面里，打开控制台，定位到`我的订单`图标，复制`我的订单`

![image-20220821092354913](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.6.1.png)

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里，把`<a href="http://order.gulimall.com/list.html">我的订单</a>`修改为`<a href="http://member.gulimall.com/memberOrder.html">我的订单</a>`

```html
<li>
  <a href="http://member.gulimall.com/memberOrder.html">我的订单</a>
</li>
```

![image-20220821092529782](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.6.2.png)

在`gulimall-member`模块的`pom.xml`文件里引入`redis`和`SpringSession`

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

<!--引入SpringSession-->
<dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220821093615823](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.6.3.png)

在`gulimall-member`模块的`src/main/resources/application.properties`文件里添加`redis`配置

```properties
spring.redis.host=192.168.56.10
spring.session.store-type=redis
```

![image-20220821093326466](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.6.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.GulimallMemberApplication`启动文件里添加如下注解，开启`Spring Session`功能

```java
@EnableRedisHttpSession
```

![image-20220821093712051](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.6.5.png)

##### 7、测试

在  http://gulimall.com/  页面里点击`我的订单`，来到了  http://auth.gulimall.com/login.html  登录页面，点击`gitee`登录，发现`GulimallAuthServerApplication`服务报错了，提示访问`http://gulimall-member/member/member/giteeLogin`失败了，这应该是拦截器把请求拦截了，让其跳转到登录页了。

![GIF 2022-8-21 9-44-18](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.1.gif)

`GulimallAuthServerApplication`服务控制台报的错误如下所示

```bash
feign.RetryableException: cannot retry due to redirection, in streaming mode executing POST http://gulimall-member/member/member/giteeLogin
	at feign.FeignException.errorExecuting(FeignException.java:132)
	at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:113)
	at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:78)
	at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:103)
	at com.sun.proxy.$Proxy95.giteeLogin(Unknown Source)
	at com.atguigu.gulimall.auth.service.impl.OAuth2ServiceImpl.giteeRegister(OAuth2ServiceImpl.java:53)
	at com.atguigu.gulimall.auth.controller.OAuth2Controller.giteeRegister(OAuth2Controller.java:34)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:190)
	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:138)
	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:104)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:892)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:797)
	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1039)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:942)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1005)
	at org.springframework.web.servlet.FrameworkServlet.doGet(FrameworkServlet.java:897)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:634)
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:882)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:741)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)
```

![image-20220821094400481](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.2.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.interceptor.LoginUserInterceptor`类里修改`preHandle`方法，把`boolean match = new AntPathMatcher().match("/order/order/status/**", uri);`修改为`boolean match = new AntPathMatcher().match("/member/member/giteeLogin", uri);`

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    String uri = request.getRequestURI();
    boolean match = new AntPathMatcher().match("/member/member/giteeLogin", uri);
    if (match){
        return true;
    }

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
```

![image-20220821094832279](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.3.png)

登陆后，在  http://gulimall.com/  页面里点击`我的订单`，就跳转到  http://member.gulimall.com/memberOrder.html  页面了

![GIF 2022-8-21 9-47-15](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.4.gif)

访问 http://order.gulimall.com/toTrade 页面，打开控制台，点击`Network`，查看请求可以发现，以下请求访问失败了

```url
http://gulimall.com/api/ware/wareinfo/fare?addrId=1
```

返回的响应为：

```json
{"timestamp":"2022-08-21 09-54-39","status":500,"error":"Internal Server Error","message":"Could not extract response: no suitable HttpMessageConverter found for response type [class com.atguigu.common.utils.R] and content type [text/html;charset=UTF-8]","path":"/ware/wareinfo/fare"}
```

![GIF 2022-8-21 9-54-54](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.5.gif)

查看失败的  http://gulimall.com/api/ware/wareinfo/fare?addrId=1 这个请求，可以发现报的是`500`的错误

![image-20220821095545062](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.6.png)

查看`GulimallWareApplication`服务的控制台，报了如下的错误，显示返回的是`text/html`类型

```bash
2022-08-21 09:54:39.338 ERROR 2140 --- [io-11000-exec-5] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is feign.codec.DecodeException: Could not extract response: no suitable HttpMessageConverter found for response type [class com.atguigu.common.utils.R] and content type [text/html;charset=UTF-8]] with root cause

org.springframework.web.client.RestClientException: Could not extract response: no suitable HttpMessageConverter found for response type [class com.atguigu.common.utils.R] and content type [text/html;charset=UTF-8]
	at org.springframework.web.client.HttpMessageConverterExtractor.extractData(HttpMessageConverterExtractor.java:121) ~[spring-web-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at org.springframework.cloud.openfeign.support.SpringDecoder.decode(SpringDecoder.java:59) ~[spring-cloud-openfeign-core-2.1.3.RELEASE.jar:2.1.3.RELEASE]
	at org.springframework.cloud.openfeign.support.ResponseEntityDecoder.decode(ResponseEntityDecoder.java:62) ~[spring-cloud-openfeign-core-2.1.3.RELEASE.jar:2.1.3.RELEASE]
	at feign.optionals.OptionalDecoder.decode(OptionalDecoder.java:36) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.decode(SynchronousMethodHandler.java:176) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:140) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:78) ~[feign-core-10.2.3.jar:na]
	at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:103) ~[feign-core-10.2.3.jar:na]
	at com.sun.proxy.$Proxy111.addrInfo(Unknown Source) ~[na:na]
	at com.atguigu.gulimall.ware.service.impl.WareInfoServiceImpl.getFare(WareInfoServiceImpl.java:62) ~[classes/:na]
	at com.atguigu.gulimall.ware.service.impl.WareInfoServiceImpl$$FastClassBySpringCGLIB$$55890fdc.invoke
```

![image-20220821095653346](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.7.7.png)

##### 8、修改代码

在`gulimall-ware`模块的`com.atguigu.gulimall.ware.feign.MemberFeignService`接口里的`addrInfo`方法调用了`gulimall-member`模块的`/member/memberreceiveaddress/info/{id}`返回了`text/html`

![image-20220821095713343](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.8.1.png)

修改`gulimall-member`模块的`com.atguigu.gulimall.member.interceptor.LoginUserInterceptor`类的`preHandle`方法

```java
boolean match = new AntPathMatcher().match("/member/**", uri);
```

![image-20220821095912000](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.8.2.png)

重启`GulimallMemberApplication`服务，在 http://order.gulimall.com/toTrade 页面里点击`提交订单`后，来到  http://order.gulimall.com/submitOrder  页面，然后点击支付宝支付，就跳转到了支付宝的支付页面，支付成功后也能正确跳转到  http://member.gulimall.com/memberOrder.html  我的订单页

![GIF 2022-8-21 10-36-38](https://gitlab.com/apzs/image/-/raw/master/image/6.3.1.5.8.3.gif)

### 6.3.2、完善支付功能

#### 1、添加接口

##### 1、查询订单项

在`gulimall-order`模块的`com.atguigu.gulimall.order.controller.OrderController`类里添加`listWithItem`方法

```java
@RequestMapping("/listWithItem")
public R listWithItem(@RequestParam Map<String, Object> params) {
    PageUtils page = orderService.queryPageWithItem(params);

    return R.ok().put("page", page);
}
```

![image-20220821104459980](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里添加`queryPageWithItem`抽象方法

```java
PageUtils queryPageWithItem(Map<String, Object> params);
```

![image-20220821104531133](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.entity.OrderEntity`类里添加`itemEntities`字段

```java
private List<OrderItemEntity> itemEntities;
```

![image-20220821104700619](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里添加`queryPageWithItem`方法

```java
@Override
public PageUtils queryPageWithItem(Map<String, Object> params) {
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();

    LambdaQueryWrapper<OrderEntity> orderQueryWrapper = new LambdaQueryWrapper<>();
    orderQueryWrapper.eq(OrderEntity::getMemberId,memberEntityTo.getId());
    IPage<OrderEntity> page = this.page(
            new Query<OrderEntity>().getPage(params),
            orderQueryWrapper
    );
    List<OrderEntity> collect = page.getRecords().stream().map(orderEntity -> {
        LambdaQueryWrapper<OrderItemEntity> orderItemQueryWrapper = new LambdaQueryWrapper<>();
        orderItemQueryWrapper.eq(OrderItemEntity::getOrderSn, orderEntity.getOrderSn());
        orderItemService.list(orderItemQueryWrapper);
        return orderEntity;
    }).collect(Collectors.toList());

    page.setRecords(collect);
    return new PageUtils(page);
}
```

![image-20220821105623206](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.controller.OrderController`类修改`listWithItem`方法，将`@RequestParam`修改为`@RequestBody`，`@RequestMapping("/listWithItem")`修改为`@PostMapping("/listWithItem")`

![image-20230105162906919](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.5.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.feign`包里新建`OrderFeignService`接口，用于远程调用订单服务

```java
package com.atguigu.gulimall.member.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

/**
 * @author 无名氏
 * @date 2022/8/21
 * @Description:
 */
@FeignClient("gulimall-order")
public interface OrderFeignService {

    @PostMapping("/order/order/listWithItem")
    public R listWithItem(@RequestBody Map<String, Object> params);
}
```

![image-20220821111534607](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.6.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.web.MemberWebController`类里修改`memberOrderPage`方法

```java
@GetMapping("/memberOrder.html")
public String memberOrderPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum, Model model){
    //查出当前登录的用户的所有订单列表数据
    Map<String,Object> page = new HashMap<>();
    page.put("page",pageNum);
    R r = orderFeignService.listWithItem(page);
    model.addAttribute("orders",r);
    return "orderList";
}
```

![image-20220821111942297](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.1.7.png)

##### 2、不能够重定向

重启`GulimallMemberApplication`服务，浏览器打开  http://member.gulimall.com/memberOrder.html 页面，可以看到报了如下的错误

```bash
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Sun Aug 21 11:24:28 CST 2022
There was an unexpected error (type=Internal Server Error, status=500).
cannot retry due to redirection, in streaming mode executing POST http://gulimall-order/order/order/listWithItem
```

![image-20220821112441583](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.2.1.png)

查看`GulimallMemberApplication`服务的控制台，报了如下的错误

```
2022-08-21 11:24:28.500 ERROR 2248 --- [nio-8000-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is feign.RetryableException: cannot retry due to redirection, in streaming mode executing POST http://gulimall-order/order/order/listWithItem] with root cause

java.net.HttpRetryException: cannot retry due to redirection, in streaming mode
	at sun.net.www.protocol.http.HttpURLConnection.followRedirect0(HttpURLConnection.java:2665) ~[na:1.8.0_301]
	at sun.net.www.protocol.http.HttpURLConnection.followRedirect(HttpURLConnection.java:2651) ~[na:1.8.0_301]
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1830) ~[na:1.8.0_301]
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1498) ~[na:1.8.0_301]
	at java.net.HttpURLConnection.getResponseCode(HttpURLConnection.java:480) ~[na:1.8.0_301]
	at feign.Client$Default.convertResponse(Client.java:143) ~[feign-core-10.2.3.jar:na]
	at feign.Client$Default.execute(Client.java:68) ~[feign-core-10.2.3.jar:na]
```

![image-20220821112600476](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.2.2.png)

调试程序发现`template`里的`target`为  http://gulimall-order  ，`uriTemplate`里的`template`值为`/order/order/listWithItem `

![image-20220821113255095](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.2.3.png)

然后放行`response = client.execute(request, options);`，显示响应的`responseCode`为`302`，`detailMessage`的值为`cannot retry due to redirection, in streaming mode`，`cause` -> `location`的值为`http://auth.gulimall.com/login.html`

![image-20220821113512193](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.2.4.png)

复制`gulimall-order`模块的`com.atguigu.gulimall.order.config.GuliFeignConfig`类，粘贴到`gulimall-member`模块的`com.atguigu.gulimall.member.config`包下。

[点击查看GuliFeignConfig文件](code/6.3.2.1.2.GuliFeignConfig.java)

![image-20220821113652369](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.2.5.png)

##### 3、内部服务异常

重启`GulimallMemberApplication`服务，浏览器访问  http://member.gulimall.com/memberOrder.html  页面，报了如下的错误。

```bash
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Sun Aug 21 11:38:34 CST 2022
There was an unexpected error (type=Internal Server Error, status=500).
status 500 reading OrderFeignService#listWithItem(Map)
```

![image-20220821113907324](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.3.1.png)

查看`GulimallMemberApplication`服务的控制台，可以看到是远程调用的问题。

```bash
2022-08-21 11:38:34.967 ERROR 7032 --- [nio-8000-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is feign.FeignException$InternalServerError: status 500 reading OrderFeignService#listWithItem(Map)] with root cause

feign.FeignException$InternalServerError: status 500 reading OrderFeignService#listWithItem(Map)
	at feign.FeignException.errorStatus(FeignException.java:114) ~[feign-core-10.2.3.jar:na]
	at feign.FeignException.errorStatus(FeignException.java:86) ~[feign-core-10.2.3.jar:na]
	at feign.codec.ErrorDecoder$Default.decode(ErrorDecoder.java:93) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:149) ~[feign-core-10.2.3.jar:na]
	at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:78) ~[feign-core-10.2.3.jar:na]
	at feign.ReflectiveFeign$FeignInvocationHandler.invoke(ReflectiveFeign.java:103) ~[feign-core-10.2.3.jar:na]
	at com.sun.proxy.$Proxy111.listWithItem(Unknown Source) ~[na:na]
	at com.atguigu.gulimall.member.web.MemberWebController.memberOrderPage(MemberWebController.java:30) ~[classes/:na]
```

![image-20220821113954107](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.3.2.png)

查看`GulimallOrderApplication`服务的控制台，发生了`Integer`类型不能被强转成`String`类型的异常

```bash
2022-08-21 11:38:34.902 ERROR 9820 --- [nio-9000-exec-9] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String] with root cause

java.lang.ClassCastException: java.lang.Integer cannot be cast to java.lang.String
	at com.atguigu.common.utils.Query.getPage(Query.java:37) ~[classes/:na]
	at com.atguigu.common.utils.Query.getPage(Query.java:28) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl.queryPageWithItem(OrderServiceImpl.java:256) ~[classes/:na]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl$$FastClassBySpringCGLIB$$99092a92.invoke(<generated>) ~[classes/:na]
	at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684) ~[spring-aop-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at com.atguigu.gulimall.order.service.impl.OrderServiceImpl$$EnhancerBySpringCGLIB$$309f4bf3.queryPageWithItem(<generated>) ~[classes/:na]
	at com.atguigu.gulimall.order.controller.OrderController.listWithItem(OrderController.java:55) ~[classes/:na]
```

![image-20220821114139421](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.3.3.png)

修改`gulimall-member`模块的`com.atguigu.gulimall.member.web.MemberWebController`类的`memberOrderPage`方法，将`pageNum`修改为`pageNum.toString()`

```java
@GetMapping("/memberOrder.html")
public String memberOrderPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum, Model model){
    //查出当前登录的用户的所有订单列表数据
    Map<String,Object> page = new HashMap<>();
    page.put("page",pageNum.toString());
    R r = orderFeignService.listWithItem(page);
    model.addAttribute("orders",r);
    return "orderList";
}
```

![image-20220821114438979](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.3.4.png)

在`gulimall-member`模块的`com.atguigu.gulimall.member.web.MemberWebController`类里修改`memberOrderPage`方法，在`R r = orderFeignService.listWithItem(page);`这行代码后面添加`System.out.println(JSON.toJSON(r));`

```java
@GetMapping("/memberOrder.html")
public String memberOrderPage(@RequestParam(value = "pageNum",defaultValue = "1") Integer pageNum, Model model){
    //查出当前登录的用户的所有订单列表数据
    Map<String,Object> page = new HashMap<>();
    page.put("page",pageNum.toString());
    R r = orderFeignService.listWithItem(page);
    System.out.println(JSON.toJSON(r));
    model.addAttribute("orders",r);
    return "orderList";
}
```

![image-20220821114829708](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.3.5.png)

##### 4、不知道`item_entities`字段

重启`GulimallMemberApplication`服务，重新测试，报了`Unknown column 'item_entities' in 'field list'`异常，这个错误是`MybatisPlus`找不到`Java`实体类的某个字段在数据库对应的列

```bash
2022-08-21 11:43:31.542 ERROR 4852 --- [nio-9000-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.jdbc.BadSqlGrammarException: 
### Error querying database.  Cause: java.sql.SQLSyntaxErrorException: Unknown column 'item_entities' in 'field list'
### The error may exist in com/atguigu/gulimall/order/dao/OrderDao.java (best guess)
### The error may involve defaultParameterMap
### The error occurred while setting parameters
### SQL: SELECT  id,note,delivery_time,integration_amount,order_sn,bill_receiver_email,discount_amount,receiver_province,bill_content,coupon_id,receiver_city,auto_confirm_day,delivery_sn,coupon_amount,modify_time,receiver_phone,pay_type,pay_amount,receiver_region,receiver_post_code,delete_status,member_username,confirm_status,payment_time,bill_header,item_entities,member_id,freight_amount,receiver_name,bill_type,use_integration,receiver_detail_address,delivery_company,comment_time,receive_time,bill_receiver_phone,total_amount,source_type,create_time,integration,growth,promotion_amount,status  FROM oms_order     WHERE (member_id = ?)
### Cause: java.sql.SQLSyntaxErrorException: Unknown column 'item_entities' in 'field list'
; bad SQL grammar []; nested exception is java.sql.SQLSyntaxErrorException: Unknown column 'item_entities' in 'field list'] with root cause

java.sql.SQLSyntaxErrorException: Unknown column 'item_entities' in 'field list'
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:120) ~[mysql-connector-java-8.0.17.jar:8.0.17]
```

![image-20220821114548173](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.4.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.entity.OrderEntity`类的`itemEntities`字段上面添加`@TableField(exist = false)`注解，告诉`MybatisPlus`这个字段mysql对应的表里不存在

```java
@TableField(exist = false)
private List<OrderItemEntity> itemEntities;
```

![image-20220821114644661](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.4.2.png)

##### 5、添加配置

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyBatisConfig`类，粘贴到`gulimall-member`模块的`com.atguigu.gulimall.member.config`包下。修改`@MapperScan("com.atguigu.gulimall.product.dao")`为`@MapperScan("com.atguigu.gulimall.member.dao")`

![image-20220821161320706](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.5.1.png)

重新启动`GulimallMemberApplication`服务，再次测试，这时`GulimallMemberApplication`服务的控制台就输出了如下的`json`

```json
{"msg":"success","code":0,"page":{"totalCount":0,"pageSize":10,"totalPage":0,"currPage":1,"list":[{"id":1,"memberId":7,"orderSn":"202208211151528791561199381468717057","memberUsername":"无名氏","totalAmount":47392.0,"payAmount":47401.0,"freightAmount":9.0,"promotionAmount":0.0,"integrationAmount":0.0,"couponAmount":0.0,"status":0,"autoConfirmDay":7,"integration":47392,"growth":47392,"receiverPhone":"12345678910","receiverProvince":"上海市","receiverDetailAddress":"上海市松江区大厦6层","deleteStatus":0,"modifyTime":"2022-08-21T03:51:53.000+0000"},{"id":2,"memberId":7,"orderSn":"202208211153075861561199694800003073","memberUsername":"无名氏","totalAmount":47392.0,"payAmount":47406.0,"freightAmount":14.0,"promotionAmount":0.0,"integrationAmount":0.0,"couponAmount":0.0,"status":0,"autoConfirmDay":7,"integration":47392,"growth":47392,"receiverPhone":"12345678910","receiverProvince":"北京市","receiverDetailAddress":"北京市昌平区宏福科技园","deleteStatus":0,"modifyTime":"2022-08-21T03:53:08.000+0000"},{"id":4,"memberId":7,"orderSn":"202208211154011001561199919253987330","memberUsername":"无名氏","totalAmount":47392.0,"payAmount":47406.0,"freightAmount":14.0,"promotionAmount":0.0,"integrationAmount":0.0,"couponAmount":0.0,"status":0,"autoConfirmDay":7,"integration":47392,"growth":47392,"receiverPhone":"12345678910","receiverProvince":"北京市","receiverDetailAddress":"北京市昌平区宏福科技园","deleteStatus":0,"modifyTime":"2022-08-21T03:54:01.000+0000"}]}}
```

![image-20220821115628224](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.5.2.png)

[格式化后的`json`文件](code/6.3.2.1.5.1.json)如下图所示

![image-20220821115815504](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.5.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里，修改`queryPageWithItem`方法，忘记把订单项设置给`orderEntity`了，加上即可。

```java
@Override
public PageUtils queryPageWithItem(Map<String, Object> params) {
    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();

    LambdaQueryWrapper<OrderEntity> orderQueryWrapper = new LambdaQueryWrapper<>();
    orderQueryWrapper.eq(OrderEntity::getMemberId,memberEntityTo.getId());
    IPage<OrderEntity> page = this.page(
            new Query<OrderEntity>().getPage(params),
            orderQueryWrapper
    );
    List<OrderEntity> collect = page.getRecords().stream().map(orderEntity -> {
        LambdaQueryWrapper<OrderItemEntity> orderItemQueryWrapper = new LambdaQueryWrapper<>();
        orderItemQueryWrapper.eq(OrderItemEntity::getOrderSn, orderEntity.getOrderSn());
        List<OrderItemEntity> list = orderItemService.list(orderItemQueryWrapper);
        orderEntity.setItemEntities(list);
        return orderEntity;
    }).collect(Collectors.toList());

    page.setRecords(collect);
    return new PageUtils(page);
}
```

![image-20220821171411273](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.5.4.png)

重新启动`GulimallOrderApplication`服务，再次测试，这时`GulimallMemberApplication`服务的控制台就输出了如下的`json`

![image-20220821172050128](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.5.5.png)

[格式化后的`json`文件](code/6.3.2.1.5.2.json)如下图所示

<img src="https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.5.6.png" alt="image-20220821171917121" style="zoom:33%;" />

##### 6、修改我的订单页

在  http://member.gulimall.com/memberOrder.html  页面里，打开控制台，定位到一个订单项，复制`class="table"`

![image-20220821170704862](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.6.1.png)

在`gulimall-member`模块的`src/main/resources/templates/orderList.html`文件里搜索`class="table"`，只保留一个`<table>`

![image-20220821170808432](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.6.2.png)

然后修改这个`<table>`，将内容修改为动态的数据，[代码内容](code/6.3.2.2.1.html)如下图所示

![image-20220821195316547](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.6.3.png)

重启`GulimallMemberApplication`服务，浏览器访问  http://member.gulimall.com/memberOrder.html  页面

![image-20220821195223053](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.1.6.4.png)

#### 2、内网穿透

##### 1、原理

付款成功后，支付宝会多次向配置的`异步通知接口`发请求，直到该接口返回`success`才停止

查看文档：  https://opendocs.alipay.com/open/270/105902

![image-20220822212951827](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.1.1.png)

`别人的电脑`可以访问公网的`京东商城`，而`别人的电脑`不能访问`我的电脑`，这是因为`我的电脑`没有公网ip，别人无法通过公网访问。

![image-20220822103936610](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.1.2.png)

两个用户却可以发送`QQ`消息，这是因为我们都能够访问`QQ服务器`，`别人的电脑`发送`QQ`消息时会发送给`QQ服务器`，`QQ服务器`先把消息存着，当我的电脑连接`QQ服务器`后，`QQ服务器`就将存着的消息发给我，因此我们可以相互聊天。（相当于我们都可以访问`QQ服务器`，`QQ服务器`代理我们发送的消息，当我们连接`QQ服务器`后，`QQ服务器`将别的用户想要发送给我们的消息发送给我们）

![image-20220822103955313](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.1.3.png)

内网穿透的原理类似，我们两个电脑不能访问，但是我们都可以访问`内网穿透服务商`，内网穿透服务商做代理，将消息转发给我们。

![image-20220822104037547](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.1.4.png)

##### 2、添加异步通知地址

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.AlipayTemplate`类里，修改`notifyUrl`的值为`内网穿透服务商提供的域名`+`/payed/notify`

```java
private String notifyUrl="http://1661133527191.free.aeert.com/payed/notify";
```

![image-20220822100221123](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.2.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.listener`包里新建`OrderPayedListener`类

```java
package com.atguigu.gulimall.order.listener;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author 无名氏
 * @date 2022/8/21
 * @Description:
 */
@Controller
public class OrderPayedListener {

    @GetMapping("/payed/notify")
    @ResponseBody
    public String handleAlipayed(HttpServletRequest request){
        Map<String, String[]> map = request.getParameterMap();
        System.out.println("收到了支付宝的通知："+map);
        return "success";
    }
}
```

![image-20220822095214928](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.2.2.png)

访问`http://order.gulimall.com/payed/notify`页面，重定向到了登录页。这一看就是拦截器将这个请求拦截了，在拦截器里将这个请求直接放行即可。

```bash
http://order.gulimall.com/payed/notify
http://auth.gulimall.com/login.html
```

![image-20220822103457122](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.2.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.interceptor.LoginUserInterceptor`类里修改`preHandle`方法

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    String uri = request.getRequestURI();
    AntPathMatcher antPathMatcher = new AntPathMatcher();
    boolean match = antPathMatcher.match("/order/order/status/**", uri);
    boolean match2 = antPathMatcher.match("/payed/notify", uri);
    if (match || match2){
        return true;
    }
    ....
}
```

[点击查看LoginUserInterceptor类完整代码](code/6.3.2.2.2.LoginUserInterceptor.java)

![image-20220822103124588](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.2.4.png)

再次访问  http://order.gulimall.com/payed/notify 页面，这次访问成功了，返回的内容为`success`，此时的请求的URL为 http://order.gulimall.com/payed/notify  ，请求头的Host为`order.gulimall.com`

```bash
http://order.gulimall.com/payed/notify
order.gulimall.com
```

![image-20220822103212900](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.2.5.png)

在内网穿透服务商那里配置要穿透的内网服务为`order.gulimall.com:80`，也就是我们本地访问的地址。通过此配置公网上访问  http://1661133527191.free.aeert.com/payed/notify  就能访问到我们本地的 http://order.gulimall.com:80

```
order.gulimall.com:80
```

![image-20220822101828649](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.2.6.png)

##### 3、请求头Host不匹配

直接访问内网穿透服务商提供的域名，可以正确访问`nginx`里设置的访问  http://order.gulimall.com:80  网址的默认页面（文件为`/mydata/nginx/html/index.html`）

```
http://1661133527191.free.aeert.com/
```

![image-20220822102146497](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.3.1.png)

访问 http://1661133527191.free.aeert.com/payed/notify 页面，相当于访问  http://order.gulimall.com/payed/notify  页面，此时却显示`404 Not Found`，这是因为访问 http://1661133527191.free.aeert.com/payed/notify 页面时，请求头的Host为`1661133527191.free.aeert.com`

```
http://1661133527191.free.aeert.com/payed/notify
1661133527191.free.aeert.com
```

![image-20220822102718135](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.3.2.png)

而我们直接访问 http://order.gulimall.com/payed/notify  时，请求头的Host为`order.gulimall.com`，我们在windows系统的`C:\Windows\System32\drivers\etc\hosts`文件里配置了Host为`order.gulimall.com`时应访问的ip为`192.168.56.10`，而并没有配`Host`为`1661133527191.free.aeert.com`时应访问的`ip`，如果`nginx`不需要转发到`192.168.56.10`里的服务直接自己处理是可以正常访问的；但是如果`C:\Windows\System32\drivers\etc\hosts`文件里没有设置`1661133527191.free.aeert.com`域名应访问的`ip`，`niginx`就不知道要转发到`192.168.56.10`，`niginx`就会找到`DNS`里配置的`1661133527191.free.aeert.com`域名对应的`ip`，然后将消息转发给其对应的`ip`，很显然`1661133527191.free.aeert.com`域名对应`ip`的机器是没有我们想要访问的`tomcat`服务（其实如果没有配置代理`1661133527191.free.aeert.com`域名下的请求时，不会转发给对应的服务，只会在`nginx`里的文件里查找，在`nginx`里配置代理`1661133527191.free.aeert.com`域名下的请求后才会转发给对应的服务。）

![image-20230106095424374](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.3.3.png)

访问失败的原因如下图所示，本质上就是`niginx`转发请求头`Host`为`order.gulimall.com`的请求时，能够正常转发到`192.168.56.10`，而请求头`Host`为`1661133527191.free.aeert.com`时，由于我们本地`C:\Windows\System32\drivers\etc\hosts`文件没有配置`1661133527191.free.aeert.com`域名应该访问的`ip`，此时就只能从`DNS`里寻找对应的`ip`，因此就错误的将请求转发给提供`1661133527191.free.aeert.com`域名的域名服务商的对应`ip`了，因此访问失败了。（其实如果没有配置代理`1661133527191.free.aeert.com`域名下的请求时，不会转发给对应的服务，只会在`nginx`里的文件里查找，在`nginx`里配置代理`1661133527191.free.aeert.com`域名下的请求后才会转发给对应的服务。）

因此根据上面的描述，主要有两种解决办法，一种是修改本地的`C:\Windows\System32\drivers\etc\hosts`文件，由于优先寻找本地的`C:\Windows\System32\drivers\etc\hosts`因此能够正确找到我们想要其访问的`ip`，即`192.168.56.10`（但是还是要在`nginx`里配置代理`1661133527191.free.aeert.com`域名下的服务）；一种是手动更正`nginx`里转发请求时发送的请求头的`Host`。第一种方式需要修改本地的`C:\Windows\System32\drivers\etc\hosts`文件并在`nginx`里配置代理`1661133527191.free.aeert.com`域名下的请求；第二种方式需要在`nginx`里配置手动修改`/payed/`下的`Host`为`order.gulimall.com`并配置代理`1661133527191.free.aeert.com`域名下的请求。

![image-20220822104128371](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.3.4.png)

##### 4、修改请求头的Host

在`/mydata/nginx/conf/conf.d/gulimall.conf`文件里手动修改`/payed/`下的`Host`为`order.gulimall.com`，然后重启`noginx`服务

```bash
[root@localhost ~]# cd /mydata/nginx/conf/
[root@localhost conf]# ls
conf.d  fastcgi_params  koi-utf  koi-win  mime.types  modules  nginx.conf  scgi_params  uwsgi_params  win-utf
[root@localhost conf]# cd conf.d/
[root@localhost conf.d]# ls
default.conf  gulimall.conf
[root@localhost conf.d]# vi gulimall.conf 
[root@localhost conf.d]# docker restart nginx 
nginx
```

![image-20220822094228272](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.4.1.png)

由于`Host`不匹配，导致没有转给订单服务，因此可以在`location / {`配置的前面添加如下代码，将`/payed/`下的所有请求都手动设置`Host`

```nginx
location /payed/ {
    proxy_set_header Host order.gulimall.com;
    proxy_pass http://gulimall;
}
```

![image-20220822104539560](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.4.2.png)

重启`noginx`服务后，再次访问 http://1661133527191.free.aeert.com/payed/notify 页面，此时`niginx`还是没有正确转发给`192.168.56.10`

![image-20220822104730726](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.4.3.png)

##### 5、添加代理服务

查看`niginx`的日志，可以看到`host: "1661133527191.free.aeert.com"`访问了`http://1661133527191.free.aeert.com/payed/notify`页面，而`nginx`去静态资源`/usr/share/nginx/html/payed/notify`里面去找了 ，我们想要让`nginx`转发给`192.168.56.10`对应的服务，结果却在`niginx`自己的文件里去找，这是因为我们没有配置代理`1661133527191.free.aeert.com`域名下的请求。

```bash
[root@localhost conf.d]# cd ../../
[root@localhost nginx]# ls
conf  html  logs
[root@localhost nginx]# cd logs/
[root@localhost logs]# ls
access.log  error.log
[root@localhost logs]# cat access.log |grep 'payed'
192.168.56.1 - - [22/Aug/2022:02:56:59 +0000] "GET /payed/notify HTTP/1.1" 200 7 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "-"
192.168.56.1 - - [22/Aug/2022:02:56:59 +0000] "GET /favicon.ico HTTP/1.1" 200 946 "http://order.gulimall.com/payed/notify" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "-"
192.168.56.1 - - [22/Aug/2022:02:57:01 +0000] "GET /payed/notify HTTP/1.1" 404 571 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "202.103.46.13"
192.168.56.1 - - [22/Aug/2022:02:57:18 +0000] "GET /payed/notify HTTP/1.1" 404 571 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "202.103.46.13"
[root@localhost logs]# cat error.log |grep 'payed'
2022/08/22 02:57:01 [error] 7#7: *6 open() "/usr/share/nginx/html/payed/notify" failed (2: No such file or directory), client: 192.168.56.1, server: localhost, request: "GET /payed/notify HTTP/1.1", host: "1661133527191.free.aeert.com"
2022/08/22 02:57:18 [error] 7#7: *6 open() "/usr/share/nginx/html/payed/notify" failed (2: No such file or directory), client: 192.168.56.1, server: localhost, request: "GET /payed/notify HTTP/1.1", host: "1661133527191.free.aeert.com"
```

![image-20220822110122903](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.5.1.png)

在`/mydata/nginx/conf/conf.d/gulimall.conf`文件里的`server_name`后面再加一个`1661133527191.free.aeert.com`

```nginx
server_name  gulimall.com *.gulimall.com 1661133527191.free.aeert.com;
```

![image-20220822110624899](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.5.2.png)

再次重启`nginx`服务

```bash
[root@localhost logs]# cd ../conf/conf.d/
[root@localhost conf.d]# ls
default.conf  gulimall.conf
[root@localhost conf.d]# vi gulimall.conf 
[root@localhost conf.d]# docker restart nginx 
nginx
```

![image-20220822110805349](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.5.3.png)

再次访问  http://1661133527191.free.aeert.com/payed/notify 页面，可以看到这次`nginx`成功转发给`192.168.56.10`了

![image-20220822110942054](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.5.4.png)

查看`nginx`日志，可以看到访问日志已经显示状态为`200`了，错误日志也没有打印错误消息了

```bash
[root@localhost conf.d]# cd ../../logs/
[root@localhost logs]# cat access.log |grep 'payed'
192.168.56.1 - - [22/Aug/2022:02:56:59 +0000] "GET /payed/notify HTTP/1.1" 200 7 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "-"
192.168.56.1 - - [22/Aug/2022:02:56:59 +0000] "GET /favicon.ico HTTP/1.1" 200 946 "http://order.gulimall.com/payed/notify" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "-"
192.168.56.1 - - [22/Aug/2022:02:57:01 +0000] "GET /payed/notify HTTP/1.1" 404 571 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "202.103.46.13"
192.168.56.1 - - [22/Aug/2022:02:57:18 +0000] "GET /payed/notify HTTP/1.1" 404 571 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "202.103.46.13"
192.168.56.1 - - [22/Aug/2022:03:09:18 +0000] "GET /payed/notify HTTP/1.1" 200 7 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36" "202.103.46.13"
[root@localhost logs]# cat error.log |grep 'payed'
2022/08/22 02:57:01 [error] 7#7: *6 open() "/usr/share/nginx/html/payed/notify" failed (2: No such file or directory), client: 192.168.56.1, server: localhost, request: "GET /payed/notify HTTP/1.1", host: "1661133527191.free.aeert.com"
2022/08/22 02:57:18 [error] 7#7: *6 open() "/usr/share/nginx/html/payed/notify" failed (2: No such file or directory), client: 192.168.56.1, server: localhost, request: "GET /payed/notify HTTP/1.1", host: "1661133527191.free.aeert.com"
```

![image-20220822111211397](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.5.5.png)

[点击查看完整`nginx`的`gulimall.conf`配置](code/6.3.2.2.5.gulimall.conf)

#### 3、处理支付结果

##### 1、修改支付宝异步通知代码

修改`gulimall-order`模块的`com.atguigu.gulimall.order.listener.OrderPayedListener`类的`handleAlipayed`方法

```java
/**
 * 支付宝成功异步回调
 * @param request
 * @return
 */
@PostMapping("/payed/notify")
public String handleAlipayed(HttpServletRequest request){
    //只要我们收到了支付宝给我们异步的通知，告诉我们订单支付成功。返回success, 支付宝就再也不通知
    Map<String, String[]> map = request.getParameterMap();
    for (String key : map.keySet()) {
        String value = request.getParameter(key);
        System.out.println("key==>" + key +" value=>"+value);
    }
    System.out.println(JSON.toJSONString(map));
    return "success";
}
```

![image-20220822113816891](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.1.1.png)

重新支付一个商品，控制台输出如下[内容](code/6.3.2.3.1.1.log)

![image-20220822113903714](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.1.2.png)

[格式后的json](code/6.3.2.3.1.2.log)如下图所示

![image-20220822114321604](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.1.3.png)

##### 2、处理支付结果

复制`2.分布式高级篇（微服务架构篇）\资料源码\代码\支付`里的`PayAsyncVo.java`文件，粘贴到`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包下

![image-20220822114640034](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.1.png)

`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayAsyncVo`类[完整代码](code/6.3.2.3.2.PayAsyncVo.java)如下图所示

![image-20220822115552353](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.listener.OrderPayedListener`类里修改`handleAlipayed`方法

```java
@Autowired
OrderService orderService;

/**
 * 支付宝成功异步回调
 * @param vo
 * @return
 */
@PostMapping("/payed/notify")
@ResponseBody
public String handleAlipayed(PayAsyncVo vo){
    //只要我们收到了支付宝给我们异步的通知，告诉我们订单支付成功。返回success, 支付宝就再也不通知
    try {
        boolean result = orderService.handlePayResult(vo);
        if (result) {
            return "success";
        }
    }catch (Exception e){
        e.printStackTrace();
    }
    return "false";
}
```

![image-20220822151957993](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.3.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.OrderService`接口里添加`handlePayResult`方法

```java
boolean handlePayResult(PayAsyncVo vo);
```

![image-20220822152030613](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.4.png)

首先需要把订单保存到支付宝交易流水里（是`gulimall_oms`数据库的`oms_payment_info`表），方便对账

![image-20220822152138297](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.5.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里添加`handlePayResult`方法

```java
@Override
public boolean handlePayResult(PayAsyncVo vo) {
    //保存交易流水
    PaymentInfoEntity infoEntity = new PaymentInfoEntity();
    //设置支付宝流水号
    infoEntity.setAlipayTradeNo(vo.getTradeNo());
    //设置订单号
    infoEntity.setOrderSn(vo.getOutTradeNo());
    //设置交易状态
    infoEntity.setPaymentStatus(vo.getTradeStatus());
    //设置回调时间
    infoEntity.setCallbackTime(vo.getNotifyTime());
    paymentInfoService.save(infoEntity);

    String status = vo.getTradeStatus();
    if ("TRADE_SUCCESS".equals(status) || "TRADE_FINISHED".equals(status)) {
        //支付成功
        String orderSn = vo.getOutTradeNo();
        this.baseMapper.updateOrderStatus(orderSn,OrderStatusEnum.PAYED.getCode());
    }

    return true;
}
```

![image-20220822154012779](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.6.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayAsyncVo`类里将`notifyTime`字段的类型修改为`Date`

![image-20220822152922368](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.7.png)

在`gulimall_oms`数据库的`oms_payment_info`表里，给`order_sn`和`alipay_trade_no`添加唯一索引

![image-20220822153135012](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.8.png)

在`gulimall_oms`数据库的`oms_payment_info`表里，把`order_sn`字段的长度从`32`修改为`64`

![image-20220822153536184](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.2.9.png)

##### 3、更新等单状态

在`gulimall-order`模块的`com.atguigu.gulimall.order.dao.OrderDao`接口里添加`updateOrderStatus`抽象方法，注意把`Integer code`改为`Integer status`后，再生成`@Param("status")`

```java
void updateOrderStatus(@Param("orderSn") String orderSn, @Param("status") Integer status);
```

![image-20220822154529589](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.3.1.png)

在`gulimall-order`模块的`src/main/resources/mapper/order/OrderDao.xml`文件里添加如下`sql`

```mysql
<update id="updateOrderStatus">
    update gulimall_oms.oms_order set `status`=#{status} where order_sn =#{orderSn}
</update>
```

![image-20220822154721487](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.3.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.listener.OrderPayedListener`类里添加验证签名的`checkSignVerified`方法，并让`handleAlipayed`方法在执行`orderService.handlePayResult(vo)`之前调用该方法来验证签名

```java
@Autowired
OrderService orderService;
@Autowired
AlipayTemplate alipayTemplate;

/**
 * 支付宝成功异步回调
 *
 * @param vo
 * @return
 */
@PostMapping("/payed/notify")
@ResponseBody
public String handleAlipayed(PayAsyncVo vo, HttpServletRequest request) {
    //只要我们收到了支付宝给我们异步的通知，告诉我们订单支付成功。返回success, 支付宝就再也不通知
    try {
        boolean signVerified = checkSignVerified(request);
        //验证签名
        if (signVerified) {
            boolean result = orderService.handlePayResult(vo);
            if (result) {
                return "success";
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return "error";
}

private boolean checkSignVerified(HttpServletRequest request) throws AlipayApiException{
    //获取支付宝POST过来反馈信息
    Map<String, String[]> requestParams = request.getParameterMap();
    Map<String,String> params = new HashMap<>();
    requestParams.forEach((k,v)->{
        String value = StringUtils.collectionToDelimitedString(Arrays.asList(v), ",");
        //乱码解决，这段代码在出现乱码时使用
        //value = new String(value.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
        params.put(k,value);
    });
    //调用SDK验证签名
    return AlipaySignature.rsaCheckV1(params, alipayTemplate.getAlipayPublicKey(), alipayTemplate.getCharset(), alipayTemplate.getSignType());
}
```

![image-20220822164100234](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.3.3.png)

##### 4、数据无法成功封装

重新支付商品后，在`GulimallOrderApplication`服务的控制台报了下图所示的[错误](code/6.3.2.3.4.1.log)

![image-20220822163832684](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.4.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`handlePayResult`方法的第一行打上断点，可以看到很多都没封装进去，但有些封装成功了（封装成功的都是一个单词的）

![image-20220822170954882](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.4.2.png)

返回的信息的值为数组，如果使用蛇形命名法可以正确处理，但是使用驼峰命名法不能正确处理

```json
{
	"gmt_create": ["2022-08-22 11:36:24"],
	"charset": ["utf-8"],
	"gmt_payment": ["2022-08-22 11:36:39"],
	"notify_time": ["2022-08-22 11:36:41"],
	"subject": ["华为 HUAWEI Mate30Pro 罗兰紫 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机"],
	"sign": ["bHkpXeAUM+egCByULY9b0rHefVrJr/ivJjH5vMVxr+JnJn795JdoaPn7vi8iMBxe674eh0x/dHYzc8WHoZrHGbAKrkkqhxgvbYw3VmMGVATjy2VvdqRjCXksKhCikU+uK6/aPn7xkodvcBokbgpBc4yz+vqRuPw/Paxp6WvofyMRgl3Yi6Zx4HG96yXQP1BgfKyTEHwq8QCUTsnE4UlRgOggTubBEG3Z4oXJIYSbM1pEWT6V065wOYIE4pDXCXo3kLEQdnLmlUK/i4u1CaEhuG6ScUBlRJ8hm6T8TgDHMXMiYUkTHGZg3pC9IH71ZZbSxBoYEVWJBHOs5CEcFKgCCA=="],
	"buyer_id": ["2088622956116255"],
	"body": ["颜色：罗兰紫;版本：8GB+128GB"],
	"invoice_amount": ["11807.00"],
	"version": ["1.0"],
	"notify_id": ["2022082200222113640016250520715284"],
	"fund_bill_list": ["[{\"amount\":\"11807.00\",\"fundChannel\":\"ALIPAYACCOUNT\"}]"],
	"notify_type": ["trade_status_sync"],
	"out_trade_no": ["202208221136062801561557798993534977"],
	"total_amount": ["11807.00"],
	"trade_status": ["TRADE_SUCCESS"],
	"trade_no": ["2022082222001416250501868104"],
	"auth_app_id": ["2021000117672941"],
	"receipt_amount": ["11807.00"],
	"point_amount": ["0.00"],
	"app_id": ["2021000117672941"],
	"buyer_pay_amount": ["11807.00"],
	"sign_type": ["RSA2"],
	"seller_id": ["2088621955944878"]
}
```

在`gulimall-order`模块的`com.atguigu.gulimall.order.vo`包里新建一个[`PayAsyncVo2`类](code/6.3.2.3.4.2.PayAsyncVo2.java)，修改`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`handlePayResult`方法的参数为`PayAsyncVo2`类型，然后修改对应的`controller`、`service`接口等，都使用`PayAsyncVo2`类来封装信息

![image-20220822192126693](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.4.3.png)

再次调试发现即使全指定别名也不行，多个单词的字段还是封装不进去

![image-20220822191928493](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.4.4.png)

由于返回的字段的值都是数组，因此修改`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayAsyncVo2`类，[全部字段都改用`List`来接收](code/6.3.2.3.4.3.PayAsyncVo2.java)，然后调试发现使用`List`来接收也不行

![image-20220822193007069](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.4.5.png)

##### 5、最终封装方式

最后还是妥协了，还是使用老师的方式接收

修改`gulimall-order`模块的`com.atguigu.gulimall.order.listener.OrderPayedListener`类

```java
@Autowired
OrderService orderService;
@Autowired
AlipayTemplate alipayTemplate;

/**
 * 支付宝成功异步回调
 *
 * @param vo
 * @return
 */
@PostMapping("/payed/notify")
@ResponseBody
public String handleAlipayed(PayAsyncVo vo, HttpServletRequest request) {
    //只要我们收到了支付宝给我们异步的通知，告诉我们订单支付成功。返回success, 支付宝就再也不通知
    try {
        boolean signVerified = checkSignVerified(request);
        //验证签名
        if (signVerified) {
            boolean result = orderService.handlePayResult(vo);
            if (result) {
                return "success";
            }
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return "error";
}

private boolean checkSignVerified(HttpServletRequest request) throws AlipayApiException{
    //获取支付宝POST过来反馈信息
    Map<String, String[]> requestParams = request.getParameterMap();
    Map<String,String> params = new HashMap<>();
    requestParams.forEach((k,v)->{
        String value = StringUtils.collectionToDelimitedString(Arrays.asList(v), ",");
        //乱码解决，这段代码在出现乱码时使用
        //value = new String(value.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
        params.put(k,value);
    });
    //调用SDK验证签名
    return AlipaySignature.rsaCheckV1(params, alipayTemplate.getAlipayPublicKey(), alipayTemplate.getCharset(), alipayTemplate.getSignType());
}
```

![image-20220822183600466](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.5.1.png)

还是使用`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayAsyncVo`类来封装数据，修改该类的`notify_time`字段的类型为`Date`

![image-20220822172111771](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.5.2.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类的`handlePayResult`方法

```java
@Override
public boolean handlePayResult(PayAsyncVo vo) {
    //保存交易流水
    PaymentInfoEntity infoEntity = new PaymentInfoEntity();
    //设置支付宝流水号
    infoEntity.setAlipayTradeNo(vo.getTrade_no());
    //设置订单号
    infoEntity.setOrderSn(vo.getOut_trade_no());
    //设置交易状态
    infoEntity.setPaymentStatus(vo.getTrade_status());
    //设置回调时间
    infoEntity.setCallbackTime(vo.getNotify_time());
    paymentInfoService.save(infoEntity);

    String status = vo.getTrade_status();
    if ("TRADE_SUCCESS".equals(status) || "TRADE_FINISHED".equals(status)) {
        //支付成功
        String orderSn = vo.getOut_trade_no();
        this.baseMapper.updateOrderStatus(orderSn,OrderStatusEnum.PAYED.getCode());
    }

    return true;
}
```

![image-20220822172149798](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.2.5.6.png)

##### 6、`notify_time`字段无法封装

测试后，报了`payAsyncVo`类的`notify_time`字段无法成功封装

```
Field error in object 'payAsyncVo' on field 'notify_time': rejected value [2022-08-22 17:19:31]; codes [typeMismatch.payAsyncVo.notify_time,typeMismatch.notify_time,typeMismatch.java.util.Date,typeMismatch]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [payAsyncVo.notify_time,notify_time]; arguments []; default message [notify_time]]; default message [Failed to convert property value of type 'java.lang.String' to required type 'java.util.Date' for property 'notify_time'; nested exception is org.springframework.core.convert.ConversionFailedException: Failed to convert from type [java.lang.String] to type [java.util.Date] for value '2022-08-22 17:19:31'; nested exception is java.lang.IllegalArgumentException]]
```

![image-20220822172032664](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.6.1.png)

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里添加如下配置，全局指定使用的日期格式。

```
spring.mvc.date-format=yyyy-MM-dd HH:mm:ss
```

![image-20220822172836401](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.6.2.png)

或在`gulimall-order`模块的`com.atguigu.gulimall.order.vo.PayAsyncVo`类的`notify_time`字段上添加如下注解，指定该字段使用的日期格式。

```java
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private Date notify_time;
```

![image-20220822184613577](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.6.3.png)

再次测试，可以看到数据已经全部封装成功了

![image-20220822173038730](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.3.6.4.png)

#### 4、支付时设置收单

收单（超过允许的时间后不允许用户支付）场景：

1. 订单在支付页，不支付，一直刷新，订单过期了才支付，订单状态改为已支付了，但是库存解锁了。
   - 使用支付宝自动收单功能解决。只要一段时间不支付，就不能支付了。

2. 由于时延等问题，订单解锁完成，正在解锁库存的时候，异步通知才到
   - 订单解锁，手动调用收单

3. 网络阻塞问题，订单支付成功的异步通知一直不到达
   - 查询订单列表时，ajax获取当前未支付的订单状态，查询订单状态时，再获取一下支付宝此订单的状态	

4. 其他各种问题
   - 每天晚上闲时下载支付宝对账单，一 一进行对账

文档地址： https://opendocs.alipay.com/open/028r8t?scene=22

![image-20220822214039556](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.4.1.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.AlipayTemplate`文件里添加`private String timeout = "1m";`字段，并在`alipayRequest.setBizContent`方法里添加`+ "\"timeout_express\":\"" + timeout + "\","`

[点击查看完整代码](code/6.3.2.4.java)

![image-20220822215150136](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.4.2.png)

重启`GulimallOrderApplication`服务后，再次支付商品，此时就会显示`正在使用即时到账交易[?] 交易将在46秒后关闭，请及时付款!`

![image-20220823104711855](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.4.3.png)

超过时间再支付，此时就会显示`抱歉，您的交易因超时已失败。`

```
抱歉，您的交易因超时已失败。
您订单的最晚付款时间为: 2022-08-23 10:47:16，目前已过期，交易关闭。
```

![image-20220823104755770](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.4.4.png)'

#### 5、手动调用收单

再`gulimall-order`模块的`com.atguigu.gulimall.order.listener.OrderCloseListener`类的`listener`方法里，关闭订单后，手动调用收单接口，防止用户在订单关闭后才支付。（其实我认为应该先`手动调用收单接口`再`关闭订单`，因为如果`关闭订单`后，用户此时支付了，而我们`手动调用收单接口`的请求还没有发给支付宝，此时就会出现订单关闭了，但是用户成功支付的情况，而先先`手动调用收单接口`再`关闭订单`就不会出现这种情况了）

![image-20220822214900198](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.5.1.png)

`手动调用收单接口`如下图所示，叫[统一收单交易关闭接口](https://opendocs.alipay.com/open/028wob)

![image-20220822215254889](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.5.2.png)

相关代码如下图所示

![image-20220822215517613](https://gitlab.com/apzs/image/-/raw/master/image/6.3.2.5.3.png)

# 七、秒杀 

## 7.1、秒杀

秒杀（ 高并发） 系统关注的问题

![image-20220824213156518](https://gitlab.com/apzs/image/-/raw/master/image/7.1.0.1.png)

![image-20220824214655339](https://gitlab.com/apzs/image/-/raw/master/image/7.1.0.2.png)

### 7.1.1、新增秒杀场次

#### 1、添加秒杀场次

1、秒杀业务：秒杀具有瞬间高并发的特点，针对这一特点，必须要做限流 + 异步 + 缓存（页面静态化） + 独立部署。 

限流方式： 

1. 前端限流，一些高并发的网站直接在前端页面开始限流，例如：小米的验证码设计 
2. `nginx`限流，直接负载部分请求到错误的静态页面：令牌算法 漏斗算法 
3. 网关限流，限流的过滤器
4. 代码中使用分布式信号量 
5. rabbitmq 限流（能者多劳：chanel.basicQos(1)），保证发挥所有服务器的性能。

##### 1、配置每日秒杀请求

启动后台管理系统，访问 http://localhost:8001/#/coupon-seckillsession 页面，在`优惠营销` -> `每日秒杀`里，打开控制台，然后点击`查询`按钮，即可看到请求的接口为： http://localhost:88/api/coupon/seckillsession/list?t=1661218666831&page=1&limit=10&key=

```url
http://localhost:88/api/coupon/seckillsession/list?t=1661218666831&page=1&limit=10&key=
```

![image-20220823093853412](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.1.1.png)

在`gulimall-gateway`模块的`src/main/resources/application.yml`文件里，添加如下配置，将`/api/coupon/**`开头的请求全部负载均衡到`gulimall-coupon`模块

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: coupon_route
          uri: lb://gulimall-coupon
          predicates:
            - Path=/api/coupon/**
          filters:
            # (?<segment>/?.*) 和 $\{segment} 为固定写法
            #http://localhost:88/api/coupon/seckillsession/list 变为 http://localhost:7000/coupon/seckillsession/list
            - RewritePath=/api/(?<segment>/?.*),/$\{segment}
```

![image-20220823094011610](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.1.2.png)

重启`GulimallGatewayApplication`服务，在  http://localhost:8001/#/coupon-seckillsession  页面里，打开控制台，刷新页面，可以看到这次请求的状态码为`200`

![image-20220823094153725](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.1.3.png)

##### 2、添加秒杀场次

打开  http://localhost:8001/#/coupon-seckillsession  页面，在`优惠营销` -> `每日秒杀`里，点击新增，添加一个秒杀场次。

![image-20220823094350190](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.2.1.png)

在`优惠营销` -> `每日秒杀`页面里，点击新增，再添加一个秒杀场次。

![image-20220823094450252](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.2.2.png)

这里的时区好像不太对，开始时间和结束时间都早了`8`小时，而且格式不符合国人审美。

![image-20220823094551807](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.2.3.png)

查看`gulimall_sms`数据库的`sms_seckill_session`表，可以看到这里的时区有问题。

![image-20220823094831694](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.2.4.png)

##### 3、关联商品

在`优惠营销` -> `每日秒杀`页面里，点击第一个秒杀场次的操作的`关联商品`，此时会发一个`http://localhost:88/api/coupon/seckillskurelation/list?t=1661219427384&page=1&limit=10&key=&promotionSessionId=1`请求， 这个`promotionSessionId`就是这个秒杀的id

![image-20220823095118825](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.3.1.png)

在`gulimall_sms`数据库的`sms_seckill_sku_relation`表里，给`1`和`2`号`promotionSessionId`都新增一下数据

![image-20220823100824094](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.3.2.png)

在`优惠营销` -> `每日秒杀`页面里，点击操作的`关联商品`，这时就能显示这个秒杀id的所有关联的信息了，请求的接口如下

http://localhost:88/api/coupon/seckillskurelation/list?t=1661220555869&page=1&limit=10&key=&promotionSessionId=1

![image-20220823100930503](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.3.3.png)

然后点击`参数名`的输入框，输入`1`，按回车，此时又发了如下请求，并查询到了相关的关联商品信息

```
http://localhost:88/api/coupon/seckillskurelation/list?t=1661220676407&page=1&limit=10&key=1&promotionSessionId=1
```

![image-20220823101254572](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.3.4.png)

查看`GulimallCouponApplication`服务的控制台，可以看到输出了如下的`sql`

```mysql
SELECT id,seckill_sort,promotion_session_id,seckill_count,seckill_price,seckill_limit,sku_id,promotion_id FROM sms_seckill_sku_relation WHERE (( (id = ? OR promotion_id = ? OR sku_id = ?) ) AND promotion_session_id = ?) 
```

![image-20220823101248884](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.3.5.png)

在`优惠营销` -> `每日秒杀`页面里，点击第2个秒杀场次的操作的`关联商品`，此时会发如下请求

http://localhost:88/api/coupon/seckillskurelation/list?t=1661220577315&page=1&limit=10&key=&promotionSessionId=2

![image-20220823101036682](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.3.6.png)

##### 4、添加关联商品

在`优惠营销` -> `每日秒杀`页面里，点击第1个秒杀场次的操作的`关联商品`，在`关联秒杀商品`里点击`新增`，新增如下`关联商品`

![image-20220823103632186](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.4.1.png)

然后自动回到在`优惠营销` -> `每日秒杀` -> 第1个秒杀场次的操作的`关联秒杀商品`页面，此时刚刚新增的秒杀商品已经关联进去了

![image-20220823103650832](https://gitlab.com/apzs/image/-/raw/master/image/7.1.1.1.4.2.png)

### 7.1.2、秒杀模块

#### 1、新建秒杀模块

##### 1、新建模块

选中`IDEA`里`Project`的`gulimall`，右键依次点击`New`->`Module`->`Spring Initializr`->`Next`

在`New Module`对话框里`Group`里输入`com.atguigu.gulimall`，`Artifact`里输入`gulimall-seckill`，`Java Version`选择`8`，`Description`里输入`秒杀`，`Package`里输入`com.atguigu.gulimall.seckill`，然后点击`Next`

```bash
com.atguigu.gulimall
gulimall-seckill
秒杀
com.atguigu.gulimall.seckill
```

![image-20220823105607877](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.1.1.png)

选择`Devloper Tools`里的`Spring Boot DevTools`和`Lombox`，选择`Web`里的`Spring Web`，选择`NoSQL`里的`Spring Data Redis (Access+ Driver)`，选择`Spring Cloud Routing`里的`OpenFeign`，然后点击`Next`

![image-20220823105826059](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.1.2.png)

最后点击`Finish`

![image-20220823105828355](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.1.3.png)

##### 2、修改依赖

复制`gulimall-seckill`模块的`pom.xml`文件的`dependencies`和`项目信息`的部分，(`properties`里的不要)

然后复制`gulimall-product`模块的`pom.xml`文件，粘贴到`gulimall-seckill`模块的`pom.xml`文件里，删除`dependencies`和`项目信息`的部分，替换为刚刚复制的`gulimall-seckill`模块的`pom.xml`文件的`dependencies`和`项目信息`

如果`pom.xml`文件颜色为赤橙色，可以选中`pom.xml`文件，右键选择`Add as Maven Project`就好了(最好先替换文件，再加入到项目)

![image-20220823110055075](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.2.1.png)

在`gulimall-seckill`模块的`pom.xml`文件里，添加`gulimall-common`依赖

[点击查看完整pom文件](code/7.1.2.1.2.pom.xml)

```xml
<dependency>
   <groupId>com.atguigu.gulimall</groupId>
   <artifactId>gulimall-common</artifactId>
   <version>0.0.1-SNAPSHOT</version>
</dependency>
```

![image-20220823110311352](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.2.2.png)

##### 3、修改测试类

修改`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.GulimallSeckillApplicationTests`测试类为`junit4`

```java
package com.atguigu.gulimall.seckill;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class GulimallSeckillApplicationTests {

   @Test
   public void contextLoads() {
      System.out.println("hello");
   }

}
```

![image-20220823111158722](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.3.png)

##### 4、修改配置

修改`gulimall-seckill`模块的`src/main/resources/application.properties`配置文件

```properties
spring.application.name=gulimall-seckill
server.port=25000
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
spring.redis.host=192.168.56.10
```

![image-20220823110520190](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.4.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.GulimallSeckillApplication`启动类里添加`@EnableDiscoveryClient`注解，修改`@SpringBootApplication`，让其在启动的时候排除`DataSourceAutoConfiguration`

然后启动`GulimallSeckillApplication`服务，然后限制内存`-Xmx100m`

```java
@EnableDiscoveryClient
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
```

![image-20220823111103762](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.1.4.2.png)

#### 2、cron表达式

cron表达式： http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html

![image-20220823111922564](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.2.png)

##### CronTrigger Tutorial

[CronTrigger Tutorial](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#crontrigger-tutorial)[Introduction](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#introduction)[Format](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#format)[Special characters](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#special-characters)[Examples](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#examples)[Notes](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#notes)

##### Introduction

`cron` is a UNIX tool that has been around for a long time, so its scheduling capabilities are powerful and proven. The `CronTrigger` class is based on the scheduling capabilities of cron.

`CronTrigger` uses “cron expressions”, which are able to create firing schedules such as: “At 8:00am every Monday through Friday” or “At 1:30am every last Friday of the month”.

Cron expressions are powerful, but can be pretty confusing. This tutorial aims to take some of the mystery out of creating a cron expression, giving users a resource which they can visit before having to ask in a forum or mailing list.

##### Format

A cron expression is a string comprised of 6 or 7 fields separated by white space. Fields can contain any of the allowed values, along with various combinations of the allowed special characters for that field. The fields are as follows:

| Field Name   | Mandatory | Allowed Values   | Allowed Special Characters |
| :----------- | :-------- | :--------------- | :------------------------- |
| Seconds      | YES       | 0-59             | , - * /                    |
| Minutes      | YES       | 0-59             | , - * /                    |
| Hours        | YES       | 0-23             | , - * /                    |
| Day of month | YES       | 1-31             | , - * ? / L W              |
| Month        | YES       | 1-12 or JAN-DEC  | , - * /                    |
| Day of week  | YES       | 1-7 or SUN-SAT   | , - * ? / L #              |
| Year         | NO        | empty, 1970-2099 | , - * /                    |

So cron expressions can be as simple as this: `* * * * ? *`

or more complex, like this: `0/5 14,18,3-39,52 * ? JAN,MAR,SEP MON-FRI 2002-2010`

##### Special characters

- `*****` (*“all values”*) - used to select all values within a field. For example, “*****” in the minute field means *“every minute”*.
- `**?**` (*“no specific value”*) - useful when you need to specify something in one of the two fields in which the character is allowed, but not the other. For example, if I want my trigger to fire on a particular day of the month (say, the 10th), but don’t care what day of the week that happens to be, I would put “10” in the day-of-month field, and “?” in the day-of-week field. See the examples below for clarification.
- `**-**` - used to specify ranges. For example, “10-12” in the hour field means *“the hours 10, 11 and 12”*.
- `**,**` - used to specify additional values. For example, “MON,WED,FRI” in the day-of-week field means *“the days Monday, Wednesday, and Friday”*.
- `**/**` - used to specify increments. For example, “0/15” in the seconds field means *“the seconds 0, 15, 30, and 45”*. And “5/15” in the seconds field means *“the seconds 5, 20, 35, and 50”*. You can also specify ‘/’ after the ‘**’ character - in this case ‘**’ is equivalent to having ‘0’ before the ‘/’. ‘1/3’ in the day-of-month field means *“fire every 3 days starting on the first day of the month”*.
- `**L**` (*“last”*) - has different meaning in each of the two fields in which it is allowed. For example, the value “L” in the day-of-month field means *“the last day of the month”* - day 31 for January, day 28 for February on non-leap years. If used in the day-of-week field by itself, it simply means “7” or “SAT”. But if used in the day-of-week field after another value, it means *“the last xxx day of the month”* - for example “6L” means *“the last friday of the month”*. You can also specify an offset from the last day of the month, such as “L-3” which would mean the third-to-last day of the calendar month. *When using the ‘L’ option, it is important not to specify lists, or ranges of values, as you’ll get confusing/unexpected results.*
- `**W**` (*“weekday”*) - used to specify the weekday (Monday-Friday) nearest the given day. As an example, if you were to specify “15W” as the value for the day-of-month field, the meaning is: *“the nearest weekday to the 15th of the month”*. So if the 15th is a Saturday, the trigger will fire on Friday the 14th. If the 15th is a Sunday, the trigger will fire on Monday the 16th. If the 15th is a Tuesday, then it will fire on Tuesday the 15th. However if you specify “1W” as the value for day-of-month, and the 1st is a Saturday, the trigger will fire on Monday the 3rd, as it will not ‘jump’ over the boundary of a month’s days. The ‘W’ character can only be specified when the day-of-month is a single day, not a range or list of days.

> The 'L' and 'W' characters can also be combined in the day-of-month field to yield 'LW', which translates to *"last weekday of the month"*.

- `**#**` - used to specify “the nth” XXX day of the month. For example, the value of “6#3” in the day-of-week field means *“the third Friday of the month”* (day 6 = Friday and “#3” = the 3rd one in the month). Other examples: “2#1” = the first Monday of the month and “4#5” = the fifth Wednesday of the month. Note that if you specify “#5” and there is not 5 of the given day-of-week in the month, then no firing will occur that month.

> The legal characters and the names of months and days of the week are not case sensitive. `MON` is the same as `mon`.

##### Examples

Here are some full examples:

| **Expression**             | **Meaning**                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `0 0 12 * * ?`             | Fire at 12pm (noon) every day                                |
| `0 15 10 ? * *`            | Fire at 10:15am every day                                    |
| `0 15 10 * * ?`            | Fire at 10:15am every day                                    |
| `0 15 10 * * ? *`          | Fire at 10:15am every day                                    |
| `0 15 10 * * ? 2005`       | Fire at 10:15am every day during the year 2005               |
| `0 * 14 * * ?`             | Fire every minute starting at 2pm and ending at 2:59pm, every day |
| `0 0/5 14 * * ?`           | Fire every 5 minutes starting at 2pm and ending at 2:55pm, every day |
| `0 0/5 14,18 * * ?`        | Fire every 5 minutes starting at 2pm and ending at 2:55pm, AND fire every 5 minutes starting at 6pm and ending at 6:55pm, every day |
| `0 0-5 14 * * ?`           | Fire every minute starting at 2pm and ending at 2:05pm, every day |
| `0 10,44 14 ? 3 WED`       | Fire at 2:10pm and at 2:44pm every Wednesday in the month of March. |
| `0 15 10 ? * MON-FRI`      | Fire at 10:15am every Monday, Tuesday, Wednesday, Thursday and Friday |
| `0 15 10 15 * ?`           | Fire at 10:15am on the 15th day of every month               |
| `0 15 10 L * ?`            | Fire at 10:15am on the last day of every month               |
| `0 15 10 L-2 * ?`          | Fire at 10:15am on the 2nd-to-last last day of every month   |
| `0 15 10 ? * 6L`           | Fire at 10:15am on the last Friday of every month            |
| `0 15 10 ? * 6L`           | Fire at 10:15am on the last Friday of every month            |
| `0 15 10 ? * 6L 2002-2005` | Fire at 10:15am on every last friday of every month during the years 2002, 2003, 2004 and 2005 |
| `0 15 10 ? * 6#3`          | Fire at 10:15am on the third Friday of every month           |
| `0 0 12 1/5 * ?`           | Fire at 12pm (noon) every 5 days every month, starting on the first day of the month. |
| `0 11 11 11 11 ?`          | Fire every November 11th at 11:11am.                         |

> Pay attention to the effects of '?' and '*' in the day-of-week and day-of-month fields!

##### 解释

特殊字符：
`，`：枚举；
    (cron="7,9,23 * * * * ?")：任意时刻的 7,9，23 秒启动这个任务；
`-`：范围：
(cron="7-20 * * * * ?"):任意时刻的 7-20 秒之间，每秒启动一次
`*`：任意；
指定位置的任意时刻都可以
`/`：步长；
(cron="7/5 * * * * ?")：第 7 秒启动，每 5 秒一次；
(cron="*/5 * * * * ?")：任意秒启动，每 5 秒一次；
`？`：（出现在日和周几的位置）：为了防止日和周冲突，在周和日上如果要写通配符使
用?
(cron="* * * 1 * ?")：每月的 1 号，启动这个任务；
`L`：（出现在日和周的位置）”，
last：最后一个
(cron="* * * ? * 3L")：每月的最后一个周二（1L为周日）
`W`：
Work Day：工作日
(cron="* * * W * ?")：每个月的工作日触发
(cron="* * * LW * ?")：每个月的最后一个工作日触发
`#`：第几个
(cron="* * * ? * 5#2")：每个月的第 2 个周 

#### 3、整合cron表达式

##### 1、简单测试

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包下，新建`scheduled`文件夹，在`scheduled`文件夹里新建`HelloSchedule`类，用于测试定时任务

```java
package com.atguigu.gulimall.seckill.scheduled;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 * @EnableScheduling 开启定时任务
 * @Scheduled        开启一个定时任务
 */
@Slf4j
@Component
@EnableScheduling
public class HelloSchedule {

    /**
     * 在Spring中的不同
     * 1、cron由6位组成，不允许第7位的年
     * 2、在周几的位置，1-7代表周一到周日; MON- SUN
     */
    @Scheduled(cron = "*/5 * * ? * 2")
    public void hello(){
        log.info("hello...");
    }
}
```

![image-20220823114012352](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.3.1.1.png)

运行`GulimallSeckillApplication`服务，可以看到这个定时任务每`5`秒执行一次

```bash
2022-08-23 11:38:00.002  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:05.002  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:10.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:15.000  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:20.000  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:25.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:30.002  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:35.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:40.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:45.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:50.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:55.001  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 11:38:00.004  INFO 18428 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
```

![image-20220823113937150](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.3.1.2.png)

##### 2、测试业务执行时间长

修改`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.HelloSchedule`类的`hello`方法和该方法上的`@Scheduled`注解的`cron`表达式参数，设置其每一秒执行一次，但是业务执行时间为`3s`

可以看到定时任务设置每秒执行一次，但该业务需要执行3秒，结果却是近乎每4s执行一次，可见此默认该定时任务是阻塞的

```java
/**
 * 在Spring中的不同
 * 1、cron由6位组成，不允许第7位的年
 * 2、在周几的位置，1-7代表周一到周日; MON- SUN
 * 3、定时任务不应该阻塞。默认是阻塞的
 */
@Scheduled(cron = "* * * ? * 2")
public void hello() throws InterruptedException {
    log.info("hello...");
    TimeUnit.SECONDS.sleep(3);
}
```

重启`GulimallSeckillApplication`服务，控制台的输出如下

```bash
2022-08-23 15:52:54.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:52:58.000  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:02.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:06.002  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:10.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:14.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:18.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:22.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:26.002  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:30.001  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:34.000  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
2022-08-23 15:53:38.002  INFO 8284 --- [   scheduling-1] c.a.g.seckill.scheduled.HelloSchedule    : hello...
```

![image-20220823155437830](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.3.2.png)

#### 4、解决定时任务阻塞

##### 1、手动创建线程池

方法一：手动创建线程池，修改`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.HelloSchedule`类的`hello`方法如下所示，使用我们自己配置的线程池（这种方法可行，这里我就不测试了，只需将别的线程池的配置粘过来即可使用）

```java
@Scheduled(cron = "* * * ? * 2")
public void hello(){
    CompletableFuture.runAsync(()->{
        log.info("hello...");
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }, executor);
}
```

![image-20220823162502400](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.1.png)

##### 2、指定定时任务线程池大小（不生效）

方法二：指定定时任务线程池大小（不生效）

定时任务有自己的线程池，不过默认大小为`1`，所以不能异步执行。（在`org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration`自动配置类里引入了`TaskSchedulingProperties`配置类）

![image-20220823160902099](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.2.1.png)

查看该`org.springframework.boot.autoconfigure.task.TaskSchedulingProperties`配置类，定时任务线程池默认设置的大小为`1`

![image-20220823160904223](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.2.2.png)

在`gulimall-seckill`模块的`src/main/resources/application.properties`配置文件里添加如下配置，使用此配置不会生效

```properties
spring.task.scheduling.pool.size=5
```

![image-20220823161015789](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.2.3.png)

重启`GulimallSeckillApplication`服务，控制台输出如下信息，可以看到还是间隔`4s`，可见配置了线程池大小定时任务仍然会阻塞

```bash
2022-08-23 16:21:03.000  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:07.002  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:11.002  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:15.002  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:19.001  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:23.002  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:27.001  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:31.002  INFO 22620 --- [   scheduling-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:35.002  INFO 22620 --- [   scheduling-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:39.002  INFO 22620 --- [   scheduling-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:43.000  INFO 22620 --- [   scheduling-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:47.001  INFO 22620 --- [   scheduling-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:51.001  INFO 22620 --- [   scheduling-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:21:55.000  INFO 22620 --- [   scheduling-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
```

![image-20220823162224491](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.2.4.png)

##### 3、使用Spring自带的异步任务

方法三：Spring的异步任务

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.GulimallSeckillApplication`启动类上添加`@EnableAsync`注解，开启异步任务

```java
@EnableAsync
```

![image-20220823161617048](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.3.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.HelloSchedule`类的`hello`方法上添加`@Async`注解

```java
@Async
```

![image-20220823161624006](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.3.2.png)

重启`GulimallSeckillApplication`服务，控制台输出如下信息，可以看到间隔变为`1s`，可见使用任务后就不会阻塞了

```
2022-08-23 16:14:01.003  INFO 16996 --- [         task-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:02.002  INFO 16996 --- [         task-2] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:03.001  INFO 16996 --- [         task-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:04.001  INFO 16996 --- [         task-4] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:05.001  INFO 16996 --- [         task-5] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:06.000  INFO 16996 --- [         task-6] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:07.001  INFO 16996 --- [         task-7] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:08.001  INFO 16996 --- [         task-8] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:09.001  INFO 16996 --- [         task-1] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:10.001  INFO 16996 --- [         task-2] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:11.001  INFO 16996 --- [         task-3] c.a.g.seckill.scheduled.HelloSchedule   : hello...
2022-08-23 16:14:12.001  INFO 16996 --- [         task-4] c.a.g.seckill.scheduled.HelloSchedule   : hello...
```

![image-20220823161438635](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.4.3.3.png)

#### 5、源码

##### 1、自动配置

查看`TaskExecutionAutoConfiguration`类的`taskExecutorBuilder`方法可以发现，该方法返回的是`TaskExecutorBuilder`任务执行建造者，在下方的`applicationTaskExecutor`方法里获取这个`TaskExecutorBuilder`任务执行建造者，然后调用` builder.build()`方法，返回`ThreadPoolTaskExecutor`，因此容器中放的是`ThreadPoolTaskExecutor`线程池

（定时任务的自动配置为`TaskSchedulingAutoConfiguration`任务调度自动配置，异步线程池的自动配置为`TaskExecutionAutoConfiguration`任务执行自动配置）

```java
@Bean
@ConditionalOnMissingBean
public TaskExecutorBuilder taskExecutorBuilder() {
   TaskExecutionProperties.Pool pool = this.properties.getPool();
   TaskExecutorBuilder builder = new TaskExecutorBuilder();
   builder = builder.queueCapacity(pool.getQueueCapacity());
   builder = builder.corePoolSize(pool.getCoreSize());
   builder = builder.maxPoolSize(pool.getMaxSize());
   builder = builder.allowCoreThreadTimeOut(pool.isAllowCoreThreadTimeout());
   builder = builder.keepAlive(pool.getKeepAlive());
   builder = builder.threadNamePrefix(this.properties.getThreadNamePrefix());
   builder = builder.customizers(this.taskExecutorCustomizers);
   builder = builder.taskDecorator(this.taskDecorator.getIfUnique());
   return builder;
}

@Lazy
@Bean(name = { APPLICATION_TASK_EXECUTOR_BEAN_NAME,
      AsyncAnnotationBeanPostProcessor.DEFAULT_TASK_EXECUTOR_BEAN_NAME })
@ConditionalOnMissingBean(Executor.class)
public ThreadPoolTaskExecutor applicationTaskExecutor(TaskExecutorBuilder builder) {
   return builder.build();
}
```

![image-20220823163150679](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.1.png)

##### 2、`ThreadPoolTaskExecutor`继承关系

`ThreadPoolTaskExecutor`类的继承关系如下图所示

![image-20230106161740731](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.2.1.png)

点击`ThreadPoolTaskExecutor`类可以看到其实现了`AsyncListenableTaskExecutor`

```java
public class ThreadPoolTaskExecutor extends ExecutorConfigurationSupport
		implements AsyncListenableTaskExecutor, SchedulingTaskExecutor
		
public interface AsyncListenableTaskExecutor extends AsyncTaskExecutor
public interface AsyncTaskExecutor extends TaskExecutor
public interface TaskExecutor extends Executor
public interface java.util.concurrent.Executor
```

![image-20220823163522592](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.2.2.png)

点击`AsyncListenableTaskExecutor`接口，可以看到其继承了`AsyncTaskExecutor`接口

![image-20220823163532548](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.2.3.png)

点击`AsyncTaskExecutor`接口，可以看到其继承了`TaskExecutor`接口

![image-20220823163536360](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.2.4.png)

点击`TaskExecutor`接口，可以看到其继承了`Executor`接口

![image-20220823163541582](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.2.5.png)

点击`Executor`接口，可以看到这个接口是`jdk`自带的`java.util.concurrent.Executor`类

![image-20220823163544520](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.2.6.png)

##### 3、修改配置

默认核心线程大小是`8`，但是最大线程数和队列长度都是`Integer.MAX_VALUE`，这样的话到时候并发上来了肯定撑不住这么多线程的。

![image-20220823164048721](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.3.1.png)

在`gulimall-seckill`模块的`src/main/resources/application.properties`配置文件里，修改`核心线程数`和`最大线程数`

```properties
spring.task.execution.pool.core-size=5
spring.task.execution.pool.max-size=50
```

![image-20220823164333075](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.3.2.png)

删除`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.GulimallSeckillApplication`类上的`@EnableAsync`注解

![image-20220823164821069](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.3.3.png)

删除`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.HelloSchedule`类上的`@EnableScheduling`注解

![image-20220823164823629](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.5.3.4.png)

#### 6、执行定时任务

##### 1、将最近3天需要秒杀的商品添加到redis

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包里新建`config`文件夹，在`config`文件夹里新建`ScheduledConfig`类

```java
package com.atguigu.gulimall.seckill.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 */
@Configuration
@EnableScheduling
@EnableAsync
public class ScheduledConfig {
}
```

![image-20220823165012347](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.1.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled`包里新建`SeckillSkuScheduled`类

```java
package com.atguigu.gulimall.seckill.scheduled;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 * 秒杀商品的定时上架;
 * 每天晚上3点;上架最近三天需要秒杀的商品。
 *   当天00:00:00 - 23:59:59
 *   明天00:00:00 - 23:59:59
 *   后天00:00:00 - 23:59:59
 */
@Slf4j
@Service
public class SeckillSkuScheduled {

    @Autowired
    SeckillService seckillService;
    /**
     * 每天晚上3点,上架最近3天需要秒杀的商品
     */
    @Scheduled(cron = "0 0 3 * * ?")
    public void uploadSeckillSkuLatest3Days(){
        //1、重复上架无需处理
        seckillService.uploadSeckillSkuLatest3Days();


    }
}
```

![image-20220823165846917](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.1.2.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包里新建`service`文件夹，在`service`文件夹里新建`SeckillService`接口，在该接口里添加`uploadSeckillSkuLatest3Days`抽象方法用户获取最近`3`天需要秒杀的商品

```java
package com.atguigu.gulimall.seckill.service;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 */
public interface SeckillService {

    /**
     * 上架最近3天需要秒杀的商品
     */
    public void uploadSeckillSkuLatest3Days();
}
```

![image-20220823165941772](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.1.3.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service`包里新建`impl`文件夹，在`impl`文件夹里新建`SeckillServiceImpl`类，在该类里实现`uploadSeckillSkuLatest3Days`抽象方法

```java
package com.atguigu.gulimall.seckill.service.impl;

import com.atguigu.gulimall.seckill.service.SeckillService;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 */
public class SeckillServiceImpl implements SeckillService {
    @Override
    public void uploadSeckillSkuLatest3Days() {
        //1.扫描需要参与秒杀的活动

    }
}
```

![image-20220823170120090](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.1.4.png)

##### 2、远程获取秒杀活动场次

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.GulimallSeckillApplication`类上添加`@EnableFeignClients`注解，用于开启`Feign`的远程调用功能

```java
@EnableFeignClients
```

![image-20220823170152658](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.2.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包里新建`feign`文件夹，在`feign`文件夹里新建`CouponFeignService`接口，用于远程调用优惠模块

```java
package com.atguigu.gulimall.seckill.feign;

import org.springframework.cloud.openfeign.FeignClient;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 */
@FeignClient("gulimall-coupon")
public interface CouponFeignService {

}
```

![image-20220823185509399](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.2.2.png)

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.controller.SeckillSessionController`类里添加`getLatest3DaySession`方法，用于获取最近3天的秒杀活动场次信息

```java
@GetMapping("/latest3DaySession")
public R getLatest3DaySession(){
    List<SeckillSessionEntity> sessions = seckillSessionService.getLatest3DaySession();
    return R.ok().put("data",sessions);
}
```

![image-20220823170817519](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.2.3.png)

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.SeckillSessionService`接口里添加`getLatest3DaySession`抽象方法

```java
List<SeckillSessionEntity> getLatest3DaySession();
```

![image-20220823170900023](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.2.4.png)

在`gulimall_sms`数据库里执行如下sql，可以看到已经成功获取到最近3天的秒杀场次信息了

```mysql
select * from sms_seckill_session where start_time between '2022-08-23 00:00:00' and '2022-08-25 23:59:59'
```

![image-20220823171438483](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.2.5.png)

##### 3、测试日期

修改`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.GulimallCouponApplicationTests`类

```java
package com.atguigu.gulimall.coupon;

import org.junit.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = GulimallCouponApplication.class)
public class GulimallCouponApplicationTests {

   @Test
   public void contextLoads() {
      LocalDate now = LocalDate.now();
      LocalDate plus2 = now.plusDays(2);
      System.out.println(now);
      System.out.println(plus2);
      System.out.println("=============================");

      LocalTime min = LocalTime.MIN;
      LocalTime max = LocalTime.MAX;
      System.out.println(min);
      System.out.println(max);
      System.out.println("=============================");

      LocalDateTime nowDateTime = LocalDateTime.of(now, min);
      LocalDateTime plus2DateTime = LocalDateTime.of(plus2, max);
      System.out.println(nowDateTime);
      System.out.println(plus2DateTime);
      System.out.println("=============================");
   }

}
```

![image-20220823172547340](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.3.1.png)

执行该类的`contextLoads`测试方法，可以看到如下输出，这里已经成功计算了时间范围，只是时间格式不符合国人审美，如果不要紧，反正又不用看这时间，只要秒杀的活动场次日期在这两个日期的范围之内即可。当然格式化也行，反正也不难。

```bash
2022-08-23
2022-08-25
=============================
00:00
23:59:59.999999999
=============================
2022-08-23T00:00
2022-08-25T23:59:59.999999999
=============================
```

![image-20220823172550405](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.3.2.png)

##### 4、实现getLatest3DaySession

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.impl.SeckillSessionServiceImpl`类里，添加`startTime`方法和`endTime`方法，修改`getLatest3DaySession`方法

```java
@Override
public List<SeckillSessionEntity> getLatest3DaySession() {
    LambdaQueryWrapper<SeckillSessionEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.between(SeckillSessionEntity::getStartTime,startTime(),endTime());
    return this.list(lambdaQueryWrapper);
}

private String startTime(){
    LocalDateTime start = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
    return start.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
}

private String endTime(){
    LocalDateTime endTime = LocalDateTime.of(LocalDate.now().plusDays(2), LocalTime.MAX);
    return endTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
}
```

![image-20220823184155523](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.4.1.png)

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.entity.SeckillSessionEntity`类里添加如下字段。

```java
@TableField(exist = false)
private List<SeckillSkuRelationEntity> relationSkus;
```

![image-20220823184504005](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.4.2.png)

在`gulimall-coupon`模块的`com.atguigu.gulimall.coupon.service.impl.SeckillSessionServiceImpl`类里，修改`getLatest3DaySession`方法

```java
@Autowired
SeckillSkuRelationService seckillSkuRelationService;

@Override
public List<SeckillSessionEntity> getLatest3DaySession() {
    LambdaQueryWrapper<SeckillSessionEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
    lambdaQueryWrapper.between(SeckillSessionEntity::getStartTime,startTime(),endTime());
    List<SeckillSessionEntity> list = this.list(lambdaQueryWrapper);
    if (CollectionUtils.isEmpty(list)){
        return null;
    }
    return list.stream().map(seckillSessionEntity -> {
        Long id = seckillSessionEntity.getId();
        LambdaQueryWrapper<SeckillSkuRelationEntity> skuRelationQueryWrapper = new LambdaQueryWrapper<>();
        skuRelationQueryWrapper.eq(SeckillSkuRelationEntity::getPromotionSessionId, id);
        List<SeckillSkuRelationEntity> skuRelationEntities = seckillSkuRelationService.list(skuRelationQueryWrapper);
        seckillSessionEntity.setRelationSkus(skuRelationEntities);
        return seckillSessionEntity;
    }).collect(Collectors.toList());
}
```

![image-20220823185300381](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.4.3.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.feign.CouponFeignService`接口里，添加`getLatest3DaySession`方法

```java
@GetMapping("/coupon/seckillsession/latest3DaySession")
public R getLatest3DaySession();
```

![image-20220823185608694](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.4.4.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包里新建`vo`文件夹，在`vo`文件夹里添加`SeckillSessionSkusVo`类

```java
package com.atguigu.gulimall.seckill.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 */
@Data
public class SeckillSessionSkusVo {

    /**
     * id
     */
    private Long id;
    /**
     * 场次名称
     */
    private String name;
    /**
     * 每日开始时间
     */
    private Date startTime;
    /**
     * 每日结束时间
     */
    private Date endTime;
    /**
     * 启用状态
     */
    private Integer status;
    /**
     * 创建时间
     */
    private Date createTime;

    private List<SeckillSkuRelationVo> relationSkus;

    @Data
    public static class SeckillSkuRelationVo{
        /**
         * id
         */
        private Long id;
        /**
         * 活动id
         */
        private Long promotionId;
        /**
         * 活动场次id
         */
        private Long promotionSessionId;
        /**
         * 商品id
         */
        private Long skuId;
        /**
         * 秒杀价格
         */
        private BigDecimal seckillPrice;
        /**
         * 秒杀总量
         */
        private BigDecimal seckillCount;
        /**
         * 每人限购数量
         */
        private BigDecimal seckillLimit;
        /**
         * 排序
         */
        private Integer seckillSort;
    }
}
```

![image-20220823191307090](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.4.5.png)

在`gulimall-common`模块的`com.atguigu.common.utils.R`类里添加如下代码

[点击查看R类完整代码](code/7.1.2.6.4.R.java)

```java
public Object getData(){
   return this.get("data");
}

public boolean isOk(){
   return this.getCode() == 0;
}

public boolean hasError(){
   return this.getCode() != 0;
}

public <T> T getData(Class<T> clazz){
   String s = JSON.toJSONString(this.getData());
   return JSON.parseObject(s,clazz);
}

public <T> List<T> getDataArray(Class<T> clazz){
   String s = JSON.toJSONString(this.getData());
   return JSON.parseArray(s,clazz);
}

public <T> T getData(TypeReference<T> tTypeReference) {
   Object data = get("data");
   String s = JSON.toJSONString(data);
   return JSON.parseObject(s,tTypeReference);
}
```

![image-20220823193539875](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.4.6.png)

##### 5、添加`saveSessionInfos`

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里添加`saveSessionInfos`方法，修改`uploadSeckillSkuLatest3Days`方法

[点击查看完整SeckillServiceImpl类代码](code/7.1.2.6.5.SeckillServiceImpl.java)

```java
@Override
public void uploadSeckillSkuLatest3Days() {
    //1.扫描需要参与秒杀的活动
    R r = couponFeignService.getLatest3DaySession();
    if (r.isOk()){
        //上架商品
        List<SeckillSessionSkusVo> sessionSkusVos = r.getDataArray(SeckillSessionSkusVo.class);
        //缓存活动信息
        saveSessionInfos(sessionSkusVos);
        //缓存活动的关联商品信息
        saveSessionSkuInfos(sessionSkusVos);
    }
}

private void saveSessionInfos(List<SeckillSessionSkusVo> sessionSkusVos){
    if (StringUtils.isEmpty(sessionSkusVos)){
        return;
    }
    sessionSkusVos.forEach(session->{
        long start = session.getStartTime().getTime();
        long end = session.getEndTime().getTime();
        String key = SESSIONS_CACHE_PREFIX + start + "_" + end;
        List<String> values = session.getRelationSkus().stream()
                .map(item -> item.getSkuId().toString()).collect(Collectors.toList());
        //缓存活动信息
        redisTemplate.opsForList().leftPushAll(key,values);
    });
}
```

![image-20220823203841311](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.5.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包里新建`to`文件夹，在`to`文件夹里新建`SeckillSkuRedisTo`类

[点击查看完整SeckillSkuRedisTo类代码](code/7.1.2.6.5.SeckillSkuRedisTo.java)

![image-20220824102402560](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.5.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.controller.SkuInfoController`类里，已经有一个查询商品信息的`info`方法了

![image-20220823210922935](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.5.3.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.feign`包里新建`ProductFeignService`接口

```java
package com.atguigu.gulimall.seckill.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 无名氏
 * @date 2022/8/23
 * @Description:
 */
@FeignClient("gulimall-product")
public interface ProductFeignService {

    @RequestMapping("/product/skuinfo/info/{skuId}")
    public R getSkuInfo(@PathVariable("skuId") Long skuId);
}
```

![image-20220823211310200](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.5.4.png)

修改`gulimall-common`模块的`com.atguigu.common.utils.R`类，添加`get(String key,Class<T> clazz)`、`getArray(String key,Class<T> clazz)`、`getObjectStr(String key)`等方法，修改`getData(Class<T> clazz)`、`getDataArray(Class<T> clazz)`、`getData(TypeReference<T> tTypeReference)`方法

![image-20220824100038799](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.5.5.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里修改`saveSessionSkuInfos`方法

```java
@Autowired
ProductFeignService productFeignService;

private final String SKUKILL_CACHE_PREFIX = "seckill:skus:";

private void saveSessionSkuInfos(List<SeckillSessionSkusVo> sessionSkusVos){
    if (StringUtils.isEmpty(sessionSkusVos)){
        return;
    }
    Map<String,String> seckillSkuInfos = new HashMap<>();
    sessionSkusVos.forEach(session->{
        Map<String, String> map = session.getRelationSkus().stream().map(
                seckillSkuRelationVo -> {
                    SeckillSkuRedisTo seckillSkuRedisTo = new SeckillSkuRedisTo();
                    BeanUtils.copyProperties(seckillSkuRelationVo,seckillSkuRedisTo);
                    R r = productFeignService.getSkuInfo(seckillSkuRelationVo.getSkuId());
                    if (r.isOk()){
                        SeckillSkuRedisTo.SkuInfoVo skuInfoVo = r.get("skuInfo", SeckillSkuRedisTo.SkuInfoVo.class);
                        seckillSkuRedisTo.setSkuInfoVo(skuInfoVo);
                    }
                    //设置开始和结束时间
                    seckillSkuRedisTo.setStartTime(session.getStartTime().getTime());
                    seckillSkuRedisTo.setEndTime(session.getEndTime().getTime());
                    //设置随机码（只有秒杀开始的那一刻，才暴露随机码）（防止活动还没开始就准备好脚本，开始时直接抢购）
                    String token = UUID.randomUUID().toString().replace("-","");
                    seckillSkuRedisTo.setRandomCode(token);
                    return seckillSkuRedisTo;
                }
        ).collect(Collectors.toMap(k -> k.getSkuId().toString(), JSON::toJSONString));
        seckillSkuInfos.putAll(map);
    });
    redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX).putAll(seckillSkuInfos);
}
```

![image-20220824103400442](https://gitlab.com/apzs/image/-/raw/master/image/7.1.2.6.5.6.png)

### 7.1.3、分布式信号量

#### 1、引入`redisson`

##### 1、添加依赖和配置

由于秒杀的请求量大，不可能查数据库，因此可以使用分布式信号量机制。

在`gulimall-seckill`模块的`pom.xml`文件里添加如下依赖，引入`redisson`

```xml
<!-- 引入redisson，做分布式锁和分布式对象 -->
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.12.0</version>
</dependency>
```

![image-20220824103639370](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.1.1.png)

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyRedissonConfig`类，到`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.config`包下

```java
package com.atguigu.gulimall.seckill.config;

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
        //Redis url should start with redis:// or rediss:// (for SSL connection)
        //config.useSingleServer().setAddress("192.168.56.10:6379").setPassword("");
        config.useSingleServer().setAddress("redis://192.168.56.10:6379");
        //2、根据Config创建出RedissonClient示例
        return Redisson.create(config);
    }

}
```

![image-20220824103755664](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.1.2.png)

##### 2、使用`redisson`

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里修改`saveSessionSkuInfos`方法，在`seckillSkuRedisTo.setRandomCode(token);`这行下面加上`使用分布式信号量限流`的相关代码

```java
@Autowired
RedissonClient redissonClient;
private final String SKUKILL_CACHE_PREFIX = "seckill:skus:";

//使用分布式信号量限流
//信号量的key为`前缀+token`    value为商品的库存
RSemaphore semaphore = redissonClient.getSemaphore(SKU_STOCK_SEMAPHORE + token);
semaphore.trySetPermits(seckillSkuRelationVo.getSeckillSort());
```

![image-20220824105240671](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.2.png)

##### 3、准备测试

修改`gulimall_sms`数据库的`sms_seckill_session`表，修改这两场秒杀商品的开始时间和结束时间，将第一个秒杀场次设为当前时间之后的近三天的时间，第二个秒杀场次设为当前时间之前的时间

![image-20220824105137257](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.3.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.SeckillSkuScheduled`类里修改`uploadSeckillSkuLatest3Days`方法，将`@Scheduled(cron = "0 0 3 * * ?")`修改为`@Scheduled(cron = "0 * * * * ?")`（秒为`0`时执行一次，即每分钟执行一次），并添加`log.info("上架秒杀的商品信息...");`

```java
/**
 * 每天晚上3点,上架最近3天需要秒杀的商品
 */
@Scheduled(cron = "0 * * * * ?")
public void uploadSeckillSkuLatest3Days(){
    //1、重复上架无需处理
    log.info("上架秒杀的商品信息...");
    seckillService.uploadSeckillSkuLatest3Days();
}
```

![image-20220824110210600](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.3.2.png)

修改`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.HelloSchedule`类的`hello`方法上的注解，将`@Scheduled(cron = "* * * ? * 2")`里的`2`修改为`*`

```java
@Async
@Scheduled(cron = "* * * ? * *")
public void hello() throws InterruptedException {
    log.info("hello...");
    TimeUnit.SECONDS.sleep(3);
}
```

![image-20220824110516106](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.3.3.png)

##### 4、测试

重启`GulimallSeckillApplication`服务和`GulimallCouponApplication`服务

提示`SeckillSkuScheduled`类里注入`SeckillService`失败，在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类上加个`@Service`注解就好了

```bash
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2022-08-24 10:58:56.436 ERROR 9896 --- [  restartedMain] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

Field seckillService in com.atguigu.gulimall.seckill.scheduled.SeckillSkuScheduled required a bean of type 'com.atguigu.gulimall.seckill.service.SeckillService' that could not be found.

The injection point has the following annotations:
	- @org.springframework.beans.factory.annotation.Autowired(required=true)


Action:

Consider defining a bean of type 'com.atguigu.gulimall.seckill.service.SeckillService' in your configuration.
```

![image-20220824110044069](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.4.1.png)

重启`GulimallSeckillApplication`服务，只让`上架秒杀的商品信息`的定时任务执行一次，然后立马关掉`GulimallSeckillApplication`服务

![image-20220824111122825](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.4.2.png)

查看`redis`里`seckill:sessions:`的信息，可以看到`2022-08-26 00:00:00`点秒杀场次的`商品id`已经显示出来了

![image-20220824111233658](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.4.3.png)

打开  http://localhost:8001/#/coupon-seckillsession  页面，在`优惠营销` -> `每日秒杀`里，点击开始时间为`2022-08-26 00:00:00`的这个场次的操作里的`关联商品`，在`关联秒杀商品`弹出框里可以看到`商品id`与`redis`里的存储的秒杀商品的值一致

![image-20220824112717946](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.4.4.png)

查看`redis`里`seckill:skus:`的信息，成功查询到了2个促销信息和关联的商品信息（这里应该有3个促销信息的，因为2个活动总共有3款促销，但其中两款促销是同一种商品，由于使用的是`seckill:skus:`+`SkuId`作为`key`，因此这两款相同商品的促销信息只保存了一份，因此只有两个促销信息）

![image-20220824111236341](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.4.5.png)

查看`redis`里`seckill:stock:`的信息，发现这个库存有问题，所有的库存都为`1`

![image-20220824111238837](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.4.6.png)

##### 5、修改代码重新测试

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类的`saveSessionSkuInfos`方法里，把`semaphore.trySetPermits(seckillSkuRelationVo.getSeckillSort()):`修改为`semaphore.trySetPermits(seckillSkuRelationVo.getSeckillCount().intValue());`。应该设为商品库存的，这里不小心设成排序字段了

![image-20220824113333439](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.1.png)

删除删除`redis`里前缀为`seckill`的数据，重新运行`GulimallSeckillApplication`服务，只让`上架秒杀的商品信息`的定时任务执行一次，然后关闭`GulimallSeckillApplication`服务

![image-20220824113140143](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.2.png)

查看`redis`里`seckill:stock:`的信息，可以看到秒杀总量已经正常了

![image-20220824113434386](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.3.png)

打开  http://localhost:8001/#/coupon-seckillsession  页面，在`优惠营销` -> `每日秒杀`里，点击开始时间为`2022-08-26 00:00:00`的这个场次的操作里的`关联商品`，在`关联秒杀商品`弹出框里可以看到`秒杀总量`与`redis`里存储的秒杀总量的值一致

![image-20220824113456618](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.4.png)

如果让`上架秒杀的商品信息`的定时任务执行两次，可以看到在`redis`里的`seckill:sessions:`里，`seckill:sessions:1661472000000_1661479200000`里有`4`条数据，而其实多次上架应该也还是`2`条，应该覆盖旧的数据而不是添加新的数据

![image-20220824113932773](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.5.png)

而在`redis`里的`seckill:skus:`里，使用的是`map`，所以没啥影响

![image-20220824113953199](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.6.png)

在`redis`里的`seckill:stock:`里有`6`条数据，而其实应该有`3`条数据，商品库存信息也应该是覆盖而不是添加

![image-20220824113934918](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.1.5.7.png)

#### 2、定时任务-分布式下的问题

有可能多台机器同时执行定时任务，因此可以加一个分布式锁，只让一个机器执行，执行完后，别的机器判断该定时任务是否已经完成，如果已经做了，就不再向`redis`里保存数据了

![image-20220824114752543](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.0.png)

##### 1、修改代码

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.SeckillSkuScheduled`类里修改`uploadSeckillSkuLatest3Days`方法

```java
@Autowired
RedissonClient redissonClient;

private final String upload_lock = "seckill:upload:lock";


/**
 * 每天晚上3点,上架最近3天需要秒杀的商品
 */
@Scheduled(cron = "0 * * * * ?")
public void uploadSeckillSkuLatest3Days(){
    //1、重复上架无需处理
    log.info("上架秒杀的商品信息...");
    RLock lock = redissonClient.getLock(upload_lock);
    lock.lock(10, TimeUnit.SECONDS);
    try {
        seckillService.uploadSeckillSkuLatest3Days();
    }finally {
        lock.unlock();
    }
}
```

![image-20220824115401241](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.1.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里，修改`saveSessionInfos`方法

```java
private void saveSessionInfos(List<SeckillSessionSkusVo> sessionSkusVos) {
    if (StringUtils.isEmpty(sessionSkusVos)) {
        return;
    }
    sessionSkusVos.forEach(session -> {
        long start = session.getStartTime().getTime();
        long end = session.getEndTime().getTime();
        String key = SESSIONS_CACHE_PREFIX + start + "_" + end;
        //缓存活动信息
        Boolean hasKey = redisTemplate.hasKey(key);
        if (hasKey == null || !hasKey) {
            List<String> values = session.getRelationSkus().stream()
                    .map(item -> item.getSkuId().toString()).collect(Collectors.toList());
            redisTemplate.opsForList().leftPushAll(key, values);
        }
    });
}
```

![image-20220824153409609](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.1.2.png)

（但是我感觉这有问题，有可能2个活动都上架了该商品，这两个都应该设置不同的促销信息和库存，而这个库存是判断skuId存不存在
因此不同活动不能上架同一款商品，我觉得应该放skuId+活动时间/随机码，这样才能区分是哪个活动，才能让不同的活动上架同一款商品，保证每个活动的促销信息和库存不一样）

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里，再次修改`saveSessionInfos`方法

```java
private void saveSessionSkuInfos(List<SeckillSessionSkusVo> sessionSkusVos) {
    if (StringUtils.isEmpty(sessionSkusVos)) {
        return;
    }
    sessionSkusVos.forEach(session -> {
        BoundHashOperations<String, Object, Object> operations = redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX);
        session.getRelationSkus().forEach(seckillSkuRelationVo -> {
            String skuKey = seckillSkuRelationVo.getSkuId().toString();
            Boolean hasSkuKey = operations.hasKey(skuKey);
            if (hasSkuKey == null || !hasSkuKey) {
                SeckillSkuRedisTo seckillSkuRedisTo = new SeckillSkuRedisTo();
                BeanUtils.copyProperties(seckillSkuRelationVo, seckillSkuRedisTo);
                R r = productFeignService.getSkuInfo(seckillSkuRelationVo.getSkuId());
                if (r.isOk()) {
                    SeckillSkuRedisTo.SkuInfoVo skuInfoVo = r.get("skuInfo", SeckillSkuRedisTo.SkuInfoVo.class);
                    seckillSkuRedisTo.setSkuInfoVo(skuInfoVo);
                }
                //设置开始和结束时间
                seckillSkuRedisTo.setStartTime(session.getStartTime().getTime());
                seckillSkuRedisTo.setEndTime(session.getEndTime().getTime());
                //设置随机码（只有秒杀开始的那一刻，才暴露随机码）（防止活动还没开始就准备好脚本，开始时直接抢购）
                String token = UUID.randomUUID().toString().replace("-", "");
                seckillSkuRedisTo.setRandomCode(token);
                operations.put(skuKey, JSON.toJSONString(seckillSkuRedisTo));
                //使用分布式信号量限流（只有上架了商品，才有库存信息）
                //（但是我感觉这有问题，有可能2个活动都上架了该商品，这两个都应该设置不同的促销信息和库存，而这个库存是判断skuId存不存在
                // 因此不同活动不能上架同一款商品，我觉得应该放skuId+活动时间/随机码，这样才能区分是哪个活动，才能让不同的活动上架同一款商品，保证每个活动的促销信息和库存不一样）
                //信号量的key为`前缀+token`    value为商品的库存
                RSemaphore semaphore = redissonClient.getSemaphore(SKU_STOCK_SEMAPHORE + token);
                semaphore.trySetPermits(seckillSkuRelationVo.getSeckillCount().intValue());
            }
        }
        );
    });
}
```

![image-20220824155345831](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.1.3.png)

##### 2、测试

删除`redis`里以`seckill`开头的数据，重启`GulimallSeckillApplication`服务，让`上架秒杀的商品信息`的定时任务执行多次

可以看到`seckill:sessions:`里多次执行`上架秒杀的商品信息`的定时任务后并没有多次添加了

![image-20220824155611328](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.2.1.png)

`seckill:skus:`里还是两个商品数据（这里应该有3个促销信息的，因为2个活动总共有3款促销，但其中两款促销是同一种商品，由于使用的是`seckill:skus:`+`SkuId`作为`key`，因此这两款相同商品的促销信息只保存了一份，因此只有两个促销信息）

![image-20220824155603814](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.2.2.png)

在`seckill:stock:`里多次执行`上架秒杀的商品信息`的定时任务后也没有多次添加了，但此时只有`2`条数据了，而原本应该有3条的。原先由于多次促销信息的`randomCode`随机码不一样，因此可以保存多次。而现在使用的是`seckill:skus:`+`SkuId`作为`key`，即使是不同的促销活动的相同sku，如果该key存在了也不执行向`redis`里添加库存的操作了，因此`seckill:skus:`和`seckill:stock:`里的数据数量是一样的

![image-20220824155606181](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.2.3.png)

##### 3、修改代码后再次测试

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里，修改`saveSessionInfos`方法

将

```java
String skuKey = seckillSkuRelationVo.getSkuId().toString();
```

替换为

```java
String skuKey = session.getStartTime().getTime() +"_"+ seckillSkuRelationVo.getSkuId().toString();
```

用于区分不同活动的促销信息。

![image-20230109100345358](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.3.1.png)

可以看到`seckill:sessions:`里多次执行`上架秒杀的商品信息`的定时任务后并没有多次添加了

![image-20220824161802227](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.3.2.png)

`seckill:skus:`里变为了`3`个商品数据（因为使用`session.getStartTime().getTime() +"_"+ seckillSkuRelationVo.getSkuId().toString();`作为`key`即`开始时间id+商品id`，即使这两款是相同商品，只要场次不一样，还是分开保存的）

![image-20220824161804685](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.3.3.png)

在`seckill:stock:`里多次执行`上架秒杀的商品信息`的定时任务后也没有多次添加了，而且也是正确的`3`条数据

![image-20220824161806803](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.3.4.png)

##### 4、修改为老师所用的id

我用的是`开始时间id+商品id`，老师用的是`场次id+商品id`

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里，修改`saveSessionInfos`方法

把

```java
String skuKey = session.getStartTime().getTime() +"_"+ seckillSkuRelationVo.getSkuId().toString();
```

改为

```java
String skuKey = seckillSkuRelationVo.getPromotionSessionId().toString() +"_"+ seckillSkuRelationVo.getSkuId().toString();
```

效果都一样，不过老师讲的方法显得更清晰一些

![image-20220824162159051](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.4.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里，修改`saveSessionInfos`方法

把

```
List<String> values = session.getRelationSkus().stream()
	.map(item -> item.getSkuId().toString()).collect(Collectors.toList());
```

改为，为了更好区分一下

```
List<String> values = session.getRelationSkus().stream()
	.map(item ->item.getPromotionSessionId().toString()+"_"+ item.getSkuId().toString())
	.collect(Collectors.toList());
```

[点击查看SeckillServiceImpl类完整代码](code/7.1.3.2.4.SeckillServiceImpl.java)

![image-20220824162740947](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.4.2.png)

删除`redis`里以`seckill`开头的数据，重启`GulimallSeckillApplication`服务，再让`上架秒杀的商品信息`的定时任务执行多次

可以看到`seckill:sessions:`里多次执行`上架秒杀的商品信息`的定时任务后并没有多次添加了，而且也更容易区分场次信息了

![image-20220824163040808](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.4.3.png)

`seckill:skus:`里变为了`3`个商品数据（因为使用`seckillSkuRelationVo.getPromotionSessionId().toString() +"_"+ seckillSkuRelationVo.getSkuId().toString();`作为`key`即`场次id+商品id`，即使这两款是相同商品，只要场次不一样，还是分开保存的）

![image-20220824163042716](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.4.4.png)

在`seckill:stock:`里多次执行`上架秒杀的商品信息`的定时任务后也没有多次添加了，而且也是正确的`3`条数据

![image-20220824163045199](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.2.4.5.png)

都设置好了，不过好像都没设置过期时间

#### 3、获取当前秒杀商品

##### 1、添加getCurrentSeckillSkus方法

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包里添加`controller`文件夹，在`controller`文件夹里新建`SeckillController`类

```java
package com.atguigu.gulimall.seckill.controller;

import com.atguigu.common.utils.R;
import com.atguigu.gulimall.seckill.service.SeckillService;
import com.atguigu.gulimall.seckill.to.SeckillSkuRedisTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author 无名氏
 * @date 2022/8/24
 * @Description:
 */
@RestController
public class SeckillController {

    @Autowired
    SeckillService seckillService;

    /**
     * 返回当前时间可以参与的秒杀商品信息
     * @return
     */
    @GetMapping("/currentSeckillSkus")
    public R getCurrentSeckillSkus(){
        List<SeckillSkuRedisTo> vos = seckillService.getCurrentSeckillSkus();
        return R.ok().setData(vos);
    }
}
```

![image-20220824163641496](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.1.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.SeckillService`接口里添加`getCurrentSeckillSkus`抽象方法

```java
List<SeckillSkuRedisTo> getCurrentSeckillSkus();
```

![image-20220824163717457](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.1.2.png)

##### 2、查看文档

可以看到`org.springframework.data.redis.core.ListOperations`接口的`List<V> range(K key, long start, long end);`方法相当于`redis`里的`lrange`命令（从左开始查找指定范围的数据）

![image-20220824165909399](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.2.1.png)

redis文档： [LRANGE | Redis](https://redis.io/commands/lrange/)

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LRANGE mylist 0 0
1) "one"
redis> LRANGE mylist -3 2
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist -100 100
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist 5 10
(empty array)
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist 0 -2
1) "one"
2) "two"
redis> LRANGE mylist -1 0
(empty array)
redis> LRANGE mylist -1 1
(empty array)
redis> LRANGE mylist -1 2
1) "three"
redis> LRANGE mylist -1 3
1) "three"
redis> LRANGE mylist -1 100
1) "three"
redis> LRANGE mylist -2 10
1) "two"
2) "three"
redis> LRANGE mylist -3 0
1) "one"
```

![image-20220824170028012](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.2.2.png)

##### 3、修改代码

修改`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类的`getCurrentSeckillSkus`方法

我发现一个奇怪的事情，`operations.multiGet();`方法参数类型为`Collection<HK> keys`，不能传`List<String>`类型的`range`我能理解；但是`Collections.singleton(range)`这个就很奇怪，其类型明明为`Set<List<String>>`，直接传不报错，接收成一个变量再传竟然就报错了

```java
List<String> range = redisTemplate.opsForList().range(key, 0, -1);
List<Object> list = Arrays.asList(range.toArray());
operations.multiGet(list);
operations.multiGet(range);

Set<List<String>> singleton = Collections.singleton(range);
operations.multiGet(singleton);
operations.multiGet(Collections.singleton(range));


operations.multiGet()
```

![image-20220824172757088](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.3.1.png)

这是使用`Alt+Enter`快捷键提示的解决报错的建议

![image-20220824185200928](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.3.2.png)

这是使用`range.`后的提示，看来使用`.`比`报错提示`有效些:stuck_out_tongue:

![image-20220824185234350](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.3.3.3.png)

### 4、测试

##### 1、使用`Collections.singleton(range)`

修改`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类的`getCurrentSeckillSkus`方法，先使用`Collections.singleton(range)`测试看看

```java
@Override
public List<SeckillSkuRedisTo> getCurrentSeckillSkus() {
    long time = System.currentTimeMillis();
    Set<String> keys = redisTemplate.keys(SESSIONS_CACHE_PREFIX + "*");
    for (String key : keys) {
        String replace = key.replace(SESSIONS_CACHE_PREFIX, "");
        String[] split = replace.split("_");
        Long start = Long.parseLong(split[0]);
        Long end = Long.parseLong(split[1]);
        if (time>=start && time <=end){
            //这里的 -1相当于length-1，即最后一个元素。取出的结果为[0,length-1] 包含开始和最后的元素，即所有元素
            List<String> range = redisTemplate.opsForList().range(key, 0, -1);
            BoundHashOperations<String, Object, Object> operations = redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX);
            if (range != null) {
                List<Object> list = operations.multiGet(Collections.singleton(range));
                if (!CollectionUtils.isEmpty(list)) {
                    List<SeckillSkuRedisTo> collect = list.stream().map(item -> {
                        SeckillSkuRedisTo seckillSkuRedisTo = JSON.parseObject(item.toString(), SeckillSkuRedisTo.class);
                        //秒杀开始后可以查看到随机码
                        //seckillSkuRedisTo.setRandomCode(null);
                        return seckillSkuRedisTo;
                    }).collect(Collectors.toList());
                    return collect;
                }
            }
            //只要找到了在当前时间范围内的秒杀，不管range是否为null都退出循环(当然如果range不为null,直接就return了)
            break;
        }
    }
    return null;
}
```

![image-20220824183720157](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.1.png)

##### 2、添加秒杀场次

打开  http://localhost:8001/#/coupon-seckillsession  页面，在`优惠营销` -> `每日秒杀`里，点击新增，添加一个最近的正在秒杀的秒杀场次。（即现在的时间在新建的秒杀场次的开始时间和结束时间之内）

![image-20220824184307893](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.2.1.png)

在`优惠营销` -> `每日秒杀`页面里，点击刚刚创建的秒杀场次里的操作的`关联商品`，在`关联秒杀商品`里点击`新增`，新增如下`关联商品`

![image-20220824184401833](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.2.2.png)

点击确定后，就看看到关联的秒杀商品已经添加进来了

![image-20220824184426043](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.2.3.png)

##### 3、`ArrayList`不能强转成`String`

然后启动`GulimallSeckillApplication`服务，等待刚刚创建的秒杀活动保存到`redis`，访问 http://localhost:25000/currentSeckillSkus 页面，报了强转的错误

![image-20220824184642047](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.3.1.png)

打开`GulimallSeckillApplication`服务的控制台，报了`ArrayList`不能强转成`String`的错误

```bash
2022-08-24 18:46:30.998 ERROR 5916 --- [io-25000-exec-1] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is java.lang.ClassCastException: java.util.ArrayList cannot be cast to java.lang.String] with root cause

java.lang.ClassCastException: java.util.ArrayList cannot be cast to java.lang.String
	at org.springframework.data.redis.serializer.StringRedisSerializer.serialize(StringRedisSerializer.java:36) ~[spring-data-redis-2.1.10.RELEASE.jar:2.1.10.RELEASE]
	at org.springframework.data.redis.core.AbstractOperations.rawHashKey(AbstractOperations.java:165) ~[spring-data-redis-2.1.10.RELEASE.jar:2.1.10.RELEASE]
	at org.springframework.data.redis.core.DefaultHashOperations.multiGet(DefaultHashOperations.java:172) ~[spring-data-redis-2.1.10.RELEASE.jar:2.1.10.RELEASE]
	at org.springframework.data.redis.core.DefaultBoundHashOperations.multiGet(DefaultBoundHashOperations.java:74) ~[spring-data-redis-2.1.10.RELEASE.jar:2.1.10.RELEASE]
	at com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl.getCurrentSeckillSkus(SeckillServiceImpl.java:75) ~[classes/:na]
	at com.atguigu.gulimall.seckill.controller.SeckillController.getCurrentSeckillSkus(SeckillController.java:29) 
```

![image-20220824184721715](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.3.2.png)

##### 4、方法一

可以将`Collections.singleton(range)`修改为`Arrays.asList(range.toArray())`

![image-20220824184931379](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.4.1.png)

重启`GulimallSeckillApplication`服务后，再次访问  http://localhost:25000/currentSeckillSkus  页面，可以看到如下json

```json
{"msg":"success","code":0,"data":[{"promotionId":null,"promotionSessionId":3,"skuId":1,"randomCode":"bdc4f396f9ac49539bd1668d908488da","seckillPrice":999,"seckillCount":50,"seckillLimit":1,"seckillSort":0,"startTime":1661335200000,"endTime":1661346000000,"skuInfoVo":{"skuId":1,"spuId":1,"skuName":"华为 HUAWEI Mate30Pro 星河银 8GB+128GB","skuDesc":null,"catalogId":225,"brandId":1,"skuDefaultImg":"https://gulimall-anonymous.oss-cn-beijing.aliyuncs.com/2022-05-21//b90b1cb4-edd9-4c91-8418-18594da32471_0d40c24b264aa511.jpg","skuTitle":"华为 HUAWEI Mate30Pro 星河银 8GB+128GB 麒麟990旗舰芯片OLED环幕屏双4000万徕卡电影四摄 4G全网通手机","skuSubtitle":"[现货抢购！享白条12期免息！]麒麟990， OLED环幕屏双4000万徕卡电影四摄：Mate30系列享12期免息》","price":5799.0,"saleCount":0}}]}
```

![image-20220824184846694](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.4.2.png)

##### 5、方法二（推荐）

修改`BoundHashOperations`的泛型，把`BoundHashOperations<String, Object, Object> operations`改为`BoundHashOperations<String, String, Object> operations`。把`operations.multiGet(Arrays.asList(range.toArray()));`改为`operations.multiGet(range);`

[点击查看`SeckillServiceImpl`类完整代码](code/7.1.3.4.6.SeckillServiceImpl.java)

```java
@Override
public List<SeckillSkuRedisTo> getCurrentSeckillSkus() {
    long time = System.currentTimeMillis();
    Set<String> keys = redisTemplate.keys(SESSIONS_CACHE_PREFIX + "*");
    for (String key : keys) {
        String replace = key.replace(SESSIONS_CACHE_PREFIX, "");
        String[] split = replace.split("_");
        Long start = Long.parseLong(split[0]);
        Long end = Long.parseLong(split[1]);
        if (time>=start && time <=end){
            //这里的 -1相当于length-1，即最后一个元素。取出的结果为[0,length-1] 包含开始和最后的元素，即所有元素
            List<String> range = redisTemplate.opsForList().range(key, 0, -1);
            BoundHashOperations<String, String, Object> operations = redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX);
            if (range != null) {
                List<Object> list = operations.multiGet(range);
                if (!CollectionUtils.isEmpty(list)) {
                    List<SeckillSkuRedisTo> collect = list.stream().map(item -> {
                        SeckillSkuRedisTo seckillSkuRedisTo = JSON.parseObject(item.toString(), SeckillSkuRedisTo.class);
                        //秒杀开始后可以查看到随机码
                        //seckillSkuRedisTo.setRandomCode(null);
                        return seckillSkuRedisTo;
                    }).collect(Collectors.toList());
                    return collect;
                }
            }
            //只要找到了在当前时间范围内的秒杀，不管range是否为null都退出循环(当然如果range不为null,直接就return了)
            break;
        }
    }
    return null;
}
```

![image-20220824185523332](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.5.1.png)

删除`reids`里`seckill`开头的`key`，重新启动`GulimallSeckillApplication`服务，等待刚刚创建的秒杀活动保存到`redis`

可以看到这样也可以保存成功   http://localhost:25000/currentSeckillSkus

![image-20220824190053736](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.5.2.png)

##### 6、原因

鼠标放到`operations.multiGet();`的方法的括号里，使用`ctrl+p`快捷键查看参数的类型，此时类型为`Collection<Object>`

![image-20220824190222468](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.6.1.png)

这是因为我们最开始使用的`BoundHashOperations`的泛型是`BoundHashOperations<String, Object, Object> operations`，此时的`HK`为`Object`

```java
public interface BoundHashOperations<H, HK, HV> extends BoundKeyOperations<H> {

   /**
    * Delete given hash {@code keys} at the bound key.
    *
    * @param keys must not be {@literal null}.
    * @return {@literal null} when used in pipeline / transaction.
    */
   @Nullable
   Long delete(Object... keys);

   /**
    * Determine if given hash {@code key} exists at the bound key.
    *
    * @param key must not be {@literal null}.
    * @return {@literal null} when used in pipeline / transaction.
    */
   @Nullable
   Boolean hasKey(Object key);

   /**
    * Get value for given {@code key} from the hash at the bound key.
    *
    * @param member must not be {@literal null}.
    * @return {@literal null} when member does not exist or when used in pipeline / transaction.
    */
   @Nullable
   HV get(Object member);

   /**
    * Get values for given {@code keys} from the hash at the bound key.
    *
    * @param keys must not be {@literal null}.
    * @return {@literal null} when used in pipeline / transaction.
    */
   @Nullable
   List<HV> multiGet(Collection<HK> keys);
   
   ......
}
```

![image-20220824190224762](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.6.2.png)

` List<HV> multiGet(Collection<HK> keys);`方法的参数类型为`Collection<HK>`，由于我们使用的`HK`为`Object`，所以该方法的参数的类型为`Collection<Object>`

![image-20220824190226691](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.6.3.png)

而修改`BoundHashOperations`的泛型为`BoundHashOperations<String, String, Object> operations`后，` List<HV> multiGet(Collection<HK> keys);`方法的参数类型就为`Collection<String>`了

![image-20220824190305321](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.6.4.png)

我们可以将`BoundHashOperations`的泛型全改为`String`，即`BoundHashOperations<String, String, String>`

![image-20220824190516456](https://gitlab.com/apzs/image/-/raw/master/image/7.1.3.4.6.5.png)

### 7.1.4、显示秒杀商品

#### 1、添加配置

在`gulimall-gateway`模块的`src/main/resources/application.yml`配置文件里添加如下配置，将`seckill.gulimall.com`域名的请求全部负载均衡到`gulimall-seckill`模块

[点击查看application.yml配置文件完整配置](code/7.1.4.1.application.yml)

```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: gulimall_seckill_route
          uri: lb://gulimall-seckill
          predicates:
            - Host=seckill.gulimall.com
```

![image-20220824190755730](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.1.1.png)

打开`SwitchHosts`软件，依次点击`hosts`->`本地方案`->`gulimall`，在后面添加`192.168.56.10 seckill.gulimall.com`，然后点击`对勾`图标

```properties
# gulimall
192.168.56.10 gulimall.com
192.168.56.10 search.gulimall.com
192.168.56.10 item.gulimall.com
192.168.56.10 auth.gulimall.com
192.168.56.10 cart.gulimall.com
192.168.56.10 order.gulimall.com
192.168.56.10 member.gulimall.com
192.168.56.10 seckill.gulimall.com
```

![image-20220824190957079](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.1.2.png)

重启`GulimallGatewayApplication`服务，访问  http://seckill.gulimall.com/currentSeckillSkus  ，可以看到通过网关也可以访问了

![image-20220824191117496](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.1.3.png)

#### 2、显示秒杀商品

在  http://gulimall.com/  页面里，打开控制台，定位到`秒杀的某个图片`位置，复制`/static/index/img/section_second_list_img1.jpg`

![image-20220824191521071](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.2.1.png)

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件夹搜索`/static/index/img/section_second_list_img1.jpg`，复制第一个`<li>`标签，将四个`<li>`标签全部删掉，一个也不保留，并给其父`<ul>`标签加上`id="seckillContent"`

![image-20220824191802504](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.2.2.png)

修改后的代码如下

![image-20220824191922056](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.2.3.png)

在`gulimall-order`模块的`src/main/resources/templates/detail.html`文件里的`<script>`标签里，添加如下代码

```java
$.get("http://seckill.gulimall.com/currentSeckillSkus",function (resp){
  if (resp.code==0 && resp.data.length>0){
    resp.data.forEach(function (item) {
      $("<li></li>")
              .append("<img style='width: 130px;height: 130px;' src='"+item.skuInfoVo.skuDefaultImg+"'/>")
              .append("<p>"+item.skuInfoVo.skuTitle+"</p>")
              .append("<span>"+item.seckillPrice+"</span>")
              .append("<s>"+item.skuInfoVo.price+"</s>")
              .appendTo("#seckillContent");
    })
  }
})
```

![image-20220824193416056](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.2.4.png)

打开  http://gulimall.com/  页面，可以看到秒杀的商品已经显示出来了

![image-20220824193317275](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.2.5.png)

#### 3、查询当前sku是否参与秒杀优惠

##### 1、获取sku秒杀信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类的`item`方法添加`查询当前sku是否参与秒杀优惠`功能，这个等会再做

![image-20220824193616733](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.1.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类里添加`getSkuSeckillInfo`方法

```java
@GetMapping("/sku/seckill/{skuId}")
public R getSkuSeckillInfo(@PathVariable("skuId") Long skuId){
    SeckillSkuRedisTo to = seckillService.getSkuSeckillInfo(skuId);
    return R.ok().setData(to);
}
```

![image-20220824194402058](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.1.2.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.SeckillService`接口里添加`getSkuSeckillInfo`抽象方法

```java
SeckillSkuRedisTo getSkuSeckillInfo(Long skuId);
```

![image-20220824194404672](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.1.3.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里实现`getSkuSeckillInfo`方法

（这里有问题，因为只查询了一个活动的该商品信息，如果一个包含该商品的秒杀活动已经过去了，而新的还未开始的活动又包含该商品，有可能查询到已经过去的秒杀活动，导致没有出现秒杀信息）

```java
/**
 * 查询指定sku的一个秒杀信息
 * @param skuId
 * @return
 */
@Override
public SeckillSkuRedisTo getSkuSeckillInfo(Long skuId) {
    BoundHashOperations<String, String, String> hashOps = redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX);
    Set<String> keys = hashOps.keys();
    if (!CollectionUtils.isEmpty(keys)) {
        String regx = "\\d_" + skuId;
        for (String key : keys) {
            if (Pattern.matches(regx, key)) {
                String s = hashOps.get(key);
                if (s == null) {
                    return null;
                }
                SeckillSkuRedisTo seckillSkuRedisTo = JSON.parseObject(s, SeckillSkuRedisTo.class);
                long now = System.currentTimeMillis();
                if (now < seckillSkuRedisTo.getStartTime() || now > seckillSkuRedisTo.getEndTime()) {
                    //不返回随机码
                    seckillSkuRedisTo.setRandomCode(null);
                }
                return seckillSkuRedisTo;
            }
        }
    }
    return null;
}
```

![image-20220824195711178](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.1.4.png)

##### 2、远程调用秒杀模块

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign`包里新建`SearchFeignService`接口

```java
package com.atguigu.gulimall.product.feign;

import com.atguigu.common.utils.R;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author 无名氏
 * @date 2022/8/24
 * @Description:
 */
@FeignClient("gulimall-seckill")
public interface SeckillFeignService {

    @GetMapping("/sku/seckill/{skuId}")
    public R getSkuSeckillInfo(@PathVariable("skuId") Long skuId);
}
```

![image-20220824201857677](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.2.1.png)

复制`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.to.SeckillSkuRedisTo`类里除`private SkuInfoVo skuInfoVo;`的字段，粘贴到`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包里

[点击查看SeckillInfoVo类完整代码](code/7.1.4.3.2.SeckillInfoVo.java)

![image-20220824200357390](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.2.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SkuItemVo`类里添加`seckillInfo`字段（不是刚刚新添加的`seckillInfo`类，别添加错了）

[点击查看SkuItemVo类完整代码](code/7.1.4.3.2.SkuItemVo.java)

```java
/**
 * 当前商品的秒杀优惠信息
 */
SeckillInfoVo seckillInfo;
```

![image-20220824200619492](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.2.3.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类里，修改`item`方法，在`CompletableFuture.allOf(saleAttrFuture,descFuture,baseAttrFuture,imageFuture).get();`上面添加如下异步执行的请求，并将其添加到`CompletableFuture.allOf`的参数里面

[点击查看`SkuInfoServiceImpl`类完整代码](code/7.1.4.3.2.SkuInfoServiceImpl.java)

```java
@Autowired
SeckillFeignService seckillFeignService;

//查询当前sku是否参与秒杀优惠
CompletableFuture<Void> seckillFuture = CompletableFuture.runAsync(() -> {
    R r = seckillFeignService.getSkuSeckillInfo(skuId);
    if (r.isOk()) {
        SeckillInfoVo seckillInfoVo = r.getData(SeckillInfoVo.class);
        skuItemVo.setSeckillInfo(seckillInfoVo);
    }
}, executor);

CompletableFuture.allOf(saleAttrFuture,descFuture,baseAttrFuture,imageFuture,seckillFuture).get();
```

![image-20220824201018390](https://gitlab.com/apzs/image/-/raw/master/image/7.1.4.3.2.4.png)

### 7.1.5、商品页面添加秒杀提醒

#### 1、商品页添加秒杀信息

##### 1、商品页添加秒杀开始时间

在  http://gulimall.com/5.html  页面里，打开控制台，定位到`预约享资格`位置，复制`预约享资格`

![image-20220824201253539](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.1.1.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`配置文件里搜索`预约享资格`，将`预约享资格`修改为`[[${item.seckillInfo.startTime}]]`

```html
<li style="color: red" th:if="${item.seckillInfo!=null}">
   <!--预约享资格-->
   [[${item.seckillInfo.startTime}]]
</li>
```

![image-20220824201631421](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.1.2.png)

找一个有秒杀的`sku`的商品，访问其url，例如 http://item.gulimall.com/1.html ，此时已经显示开始时间了，只不过显示的是时间戳

![image-20220824202224602](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.1.3.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`配置文件里，将`[[${item.seckillInfo.startTime}]]`修改为` [[${#dates.format(new java.util.Date(item.seckillInfo.startTime),"yyyy-MM-dd HH:mm:ss")}]]`

```html
<li style="color: red" th:if="${item.seckillInfo!=null}">
   <!--预约享资格-->
   [[${#dates.format(new java.util.Date(item.seckillInfo.startTime),"yyyy-MM-dd HH:mm:ss")}]]
</li>
```

![image-20220824204454541](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.1.4.png)

刷新 http://item.gulimall.com/1.html  页面，此时已经显示正常格式的开始时间了

![image-20220824204506239](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.1.5.png)

##### 2、商品页添加秒杀价

打开  http://localhost:8001/#/coupon-seckillsession  页面，在`优惠营销` -> `每日秒杀`里，点击前面创建的`2022-08-24 18:00:00`点场的秒杀场次里的操作的`关联商品`，在`关联秒杀商品`里可以看到商品的id为`1`

![image-20220824204647496](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.2.1.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`配置文件里搜索`预约享资格`，修改`预约享资格`对应的`<li>`标签对应的代码，以显示秒杀价格

```html
<li style="color: red" th:if="${item.seckillInfo!=null}">
   <span th:if="${#dates.createNow().getTime() < item.seckillInfo.startTime}">
      <!--预约享资格-->
       商品将会在[[${#dates.format(new java.util.Date(item.seckillInfo.startTime),"yyyy-MM-dd HH:mm:ss")}]]进行秒杀
   </span>
   <span th:if="${#dates.createNow().getTime() >= item.seckillInfo.startTime && #dates.createNow().getTime() <= item.seckillInfo.endTime}">
      秒杀价：[[${#numbers.formatDecimal(item.seckillInfo.seckillPrice,1,2)}]]
   </span>
</li>
```

![image-20220824205419223](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.2.2.png)

这里显示秒杀价了（不过这里有问题，因为只查询了一个活动的该商品信息，如果一个包含该商品的秒杀活动已经过去了，而新的还未开始的活动又包含该商品，有可能查询到已经过去的秒杀活动，导致没有出现新的秒杀信息）

![image-20220824205448268](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.2.3.png)

在`gulimall-product`模块的`src/main/resources/templates/index.html`文件里的`<script>`标签里，添加如下代码

```javascript
function to_href(skuId){
  location.href = "http://item.gulimall.com/"+skuId+".html"
}
$.get("http://seckill.gulimall.com/currentSeckillSkus",function (resp){
  if (resp.code==0 && resp.data.length>0){
    resp.data.forEach(function (item) {
      var href = "http://item.gulimall.com/"+item.skuId+".html"
      $("<li onclick='to_href("+item.skuId+")'></li>")
              .append("<img style='width: 130px;height: 130px;' src='"+item.skuInfoVo.skuDefaultImg+"'/>")
              .append("<p>"+item.skuInfoVo.skuTitle+"</p>")
              .append("<span>"+item.seckillPrice+"</span>")
              .append("<s>"+item.skuInfoVo.price+"</s>")
              .appendTo("#seckillContent");
    })
  }
})
```

![image-20220824211447192](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.2.4.png)

在 http://gulimall.com/  页面里，点击一个秒杀商品，来到了  http://item.gulimall.com/1.html 页面，此时页面已经显示`秒杀价`了

![GIF 2022-8-24 21-12-30](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.1.2.5.gif)

#### 2、处理秒杀逻辑

##### 1、高并发系统关注的问题

秒杀（ 高并发） 系统应关注以下问题

![image-20220824213156518](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.1.1.png)



![image-20220824214655339](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.1.2.png)

##### 2、修改秒杀场次时间

在  http://item.gulimall.com/1.html  页面里，打开控制台，定位到`加入购物车`位置，复制`加入购物车`

![image-20220824215059692](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.2.1.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`加入购物车`，修改相关代码，如果该商品正在秒杀了就显示`立即抢购`，如果该商品没有正在秒杀就显示`加入购物车`

```html
<div class="box-btns-two" th:if="${item.seckillInfo!=null && #dates.createNow().getTime() >= item.seckillInfo.startTime && #dates.createNow().getTime() <= item.seckillInfo.endTime}">
   <a href="#" id="secKillA" th:attr="skuId=${item.info.skuId},sessionId=${item.seckillInfo.promotionSessionId},code=${item.seckillInfo.randomCode}">
      <!--立即预约-->
      立即抢购
   </a>
</div>
<div class="box-btns-two" th:if="${item.seckillInfo==null || #dates.createNow().getTime() < item.seckillInfo.startTime || #dates.createNow().getTime() > item.seckillInfo.endTime}">
   <a href="#" id="addToCart" th:attr="skuId=${item.info.skuId}">
      <!--立即预约-->
      加入购物车
   </a>
</div>
```

![image-20220828184609122](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.2.2.png)

重启`GulimallProductApplication`服务和`GulimallSeckillApplication`服务，打开  http://item.gulimall.com/1.html  页面，此时显示的是`加入购物车`，这是因为此时已经过了秒杀时间了

![image-20220828150556457](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.2.3.png)

打开  http://localhost:8001/#/coupon-seckillsession  页面，在`优惠营销` -> `每日秒杀`里，点击前面创建的`2022-08-24 18:00:00`秒杀场次里的操作的`修改`，在`修改`对话框里修改为最近的正在秒杀的秒杀场次。（即现在的时间在修改的秒杀场次的开始时间和结束时间之内）

![image-20220828150953013](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.2.4.png)

点击刚刚修改为`2022-08-28 15:00:00`的秒杀场次里的操作的`关联商品`，在`关联秒杀商品`对话框里点击`新增`，新增如下商品。

![image-20220828151021501](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.2.5.png)

点击`确定`后即可看到刚刚新关联的商品已经显示到`关联秒杀商品`里了

![image-20220828151023910](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.2.6.png)

##### 3、值不能为空

重启`GulimallProductApplication`服务和`GulimallSeckillApplication`服务，在`GulimallSeckillApplication`服务的控制台报了如下的错误。

```bash
2022-08-28 15:10:00.056 ERROR 3008 --- [   scheduling-1] o.s.s.s.TaskUtils$LoggingErrorHandler    : Unexpected error occurred in scheduled task.

java.lang.IllegalArgumentException: Values must not be 'null' or empty.
	at org.springframework.util.Assert.notEmpty(Assert.java:464) ~[spring-core-5.1.9.RELEASE.jar:5.1.9.RELEASE]
	at org.springframework.data.redis.core.AbstractOperations.rawValues(AbstractOperations.java:147) ~[spring-data-redis-2.1.10.RELEASE.jar:2.1.10.RELEASE]
	at org.springframework.data.redis.core.DefaultListOperations.leftPushAll(DefaultListOperations.java:122) ~[spring-data-redis-2.1.10.RELEASE.jar:2.1.10.RELEASE]
	at com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl.lambda$saveSessionInfos$2(SeckillServiceImpl.java:139) ~[classes/:na]
	at java.util.ArrayList.forEach(ArrayList.java:1259) ~[na:1.8.0_301]
	at com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl.saveSessionInfos(SeckillServiceImpl.java:129) ~[classes/:na]
	at com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl.uploadSeckillSkuLatest3Days(SeckillServiceImpl.java:56) ~[classes/:na]
	at com.atguigu.gulimall.seckill.scheduled.SeckillSkuScheduled.uploadSeckillSkuLatest3Days(SeckillSkuScheduled.java:46) ~[classes/:na]
```

![image-20220828151400315](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.3.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里，修改`saveSessionInfos`方法

```java
if (hasKey == null || !hasKey && CollectionUtils.isEmpty(session.getRelationSkus())) {
```

![image-20220828151556751](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.3.2.png)

重启`GulimallSeckillApplication`服务，打开  http://item.gulimall.com/1.html  页面，此时已经显示`立即抢购`了，打开控制台，定位到`立即抢购`这，可以看到该标签已经有`skuid`（商品id）、`sessionid`（秒杀场次id）、`code`（令牌随机码）信息了

```html
<a href="#" id="secKillA" skuid="1" sessionid="4" code="0b41ce397be0476c9cfd604924546a56">立即抢购</a>
```

![image-20220828185401770](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.3.3.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`标签里添加如下代码

```js
$("#secKillA").click(function () {
   var killId = $(this).attr("sessionid") + "_" + $(this).attr("skuid")
   var key = $(this).attr("code")
   var num = $("#numInput").val()
   location.href = "http://seckill.gulimall.com/kill?killId="+killId+"&key="+key+"&num="+num
   return false;
})
```

![image-20220828190301580](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.3.4.png)

在  http://item.gulimall.com/1.html  页面里，点击`立即抢购`， 此时跳转到了  http://seckill.gulimall.com/kill?killId=4_1&key=0b41ce397be0476c9cfd604924546a56&num=1  页面，不过报了`404`的错误，这是正常的，因为这个接口还没写。但是没有登录页跳转了，应该登陆后才能进行跳转。

![GIF 2022-8-28 19-16-39](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.3.5.gif)

##### 4、登录后才能抢购

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`标签里添加如下代码

```js
$("#secKillA").click(function () {
   var isLogin = [[${session.loginUser!=null}]]
   if (isLogin){
      var killId = $(this).attr("sessionid") + "_" + $(this).attr("skuid")
      var key = $(this).attr("code")
      var num = $("#numInput").val()
      location.href = "http://seckill.gulimall.com/kill?killId="+killId+"&key="+key+"&num="+num
   }else {
      alert("秒杀前请先登录")
   }
   return false;
})
```

![image-20220828191809849](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.4.1.png)

在  http://item.gulimall.com/1.html  页面里，点击`立即抢购` ，此时如果没有登录就会弹出`秒杀前请先登录`的提示，登录后在  http://item.gulimall.com/1.html  页面里，再次点击`立即抢购` ，就会来到  http://seckill.gulimall.com/kill?killId=4_1&key=0b41ce397be0476c9cfd604924546a56&num=1  页面，不过报了`404`的错误，这是正常的，因为这个接口还没写。

![GIF 2022-8-28 19-14-15](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.2.4.2.gif)

#### 3、引入SpringSession

##### 1、引入SpringSession

在`gulimall-seckill`模块的`pom.xml`文件里引入`SpringSession`

```xml
<!--引入SpringSession-->
<dependency>
   <groupId>org.springframework.session</groupId>
   <artifactId>spring-session-data-redis</artifactId>
</dependency>
```

![image-20220828192835324](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.1.png)

##### 2、添加配置

在`gulimall-seckill`模块的`src/main/resources/application.properties`文件里添加如下配置，指定使用`redis`来存储`SpringSession`的信息

```properties
spring.session.store-type=redis
```

![image-20220828193007418](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.1.png)

复制`gulimall-product`模块的`com.atguigu.gulimall.product.config.GulimallSessionConfig`类，粘贴到`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.config`包下。

[点击查看`GulimallSessionConfig`类完整代码](code/7.1.5.3.2.GulimallSessionConfig.java)

![image-20220828193203195](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.2.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.config.GulimallSessionConfig`配置类上添加如下注解

```java
@EnableRedisHttpSession
```

![image-20220828193248078](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.3.png)

复制`gulimall-order`模块的`com.atguigu.gulimall.order`里的`interceptor`文件夹(里面有`LoginUserInterceptor`类)，粘贴到`gulimall-seckill`模块的`com.atguigu.gulimall.seckill`包下。

[点击查看`LoginUserInterceptor`类完整代码](code/7.1.5.3.2.LoginUserInterceptor.java)

![image-20220828193600420](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.4.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.interceptor.LoginUserInterceptor`类里，修改`preHandle`方法

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    String uri = request.getRequestURI();
    AntPathMatcher antPathMatcher = new AntPathMatcher();
    //只有`/kill`接口需要登录
    boolean match = antPathMatcher.match("/kill", uri);
    if (match){
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
    };

    return true;
}
```

![image-20220828193912831](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.5.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.config`包里新建`SeckillWebConfig`类，用于添加刚刚的拦截器

```java
package com.atguigu.gulimall.seckill.config;

import com.atguigu.gulimall.seckill.interceptor.LoginUserInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author 无名氏
 * @date 2022/8/28
 * @Description:
 */
@Configuration
public class SeckillWebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginUserInterceptor()).addPathPatterns("/**");
    }
}
```

![image-20220828194329439](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.6.png)

在  http://item.gulimall.com/1.html  页面里，点击`立即抢购` ，此时如果没有登录就会弹出`秒杀前请先登录`的提示，没有登录直接访问 http://seckill.gulimall.com/kill?killId=4_1&key=0b41ce397be0476c9cfd604924546a56&num=1 页面，此时会跳转到  http://auth.gulimall.com/login.html 登录页面

![GIF 2022-8-28 19-47-15](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.2.7.gif)

##### 3、添加秒杀接口

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类里添加`seckill`方法

```java
/**
 * 秒杀接口
 * @return
 */
@GetMapping("/kill")
public R seckill(@RequestParam("killId") String killId,@RequestParam("key") String key,@RequestParam("num") Integer num){
    //判断用户是否登录
    //创建订单号
    String orderSn = seckillService.kill(killId,key,num);
    if (StringUtils.hasText(orderSn)){
        return R.ok().setData(orderSn);
    }
    return R.error();
}
```

![image-20220828211356212](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.3.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.SeckillService`接口里添加`kill`抽象方法

```java
String kill(String killId, String key, Integer num);
```

![image-20220828202027388](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.3.2.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类里实现`kill`方法

```java
@Override
public String kill(String killId, String key, Integer num) {

    MemberEntityTo memberEntityTo = LoginUserInterceptor.loginUser.get();

    //获取秒杀商品的详细信息
    BoundHashOperations<String, String, String> hashOps = redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX);
    //4_1  (sessionId_skuId)
    String s = hashOps.get(killId);
    if (StringUtils.isEmpty(s)) {
        return null;
    }
    SeckillSkuRedisTo seckillSkuRedisTo = JSON.parseObject(s, SeckillSkuRedisTo.class);

    //校验合法性
    //1、校验开始时间和结束时间
    Long startTime = seckillSkuRedisTo.getStartTime();
    Long endTime = seckillSkuRedisTo.getEndTime();
    long now = System.currentTimeMillis();
    if (now < startTime || now > endTime) {
        return null;
    }
    //2、校验随机码、商品id、购买数量（我感觉商品id没必要校验）
    String randomCode = seckillSkuRedisTo.getRandomCode();
    String skuCode = seckillSkuRedisTo.getPromotionSessionId() + "_" + seckillSkuRedisTo.getSkuId();
    int limitNum = seckillSkuRedisTo.getSeckillLimit().intValue();
    if (!randomCode.equals(key) || !skuCode.equals(killId) || num > limitNum) {
        return null;
    }
    //3、校验该用户是否已经购买过，防止无限次购买(幂等性)  userId_sessionId_skuId
    String userKey = memberEntityTo.getId() + "_" + killId;
    long ttl = endTime - startTime;
    Boolean firstBuy = redisTemplate.opsForValue().setIfAbsent(userKey, num.toString(), ttl, TimeUnit.MILLISECONDS);
    //用户已经买过了
    if (firstBuy!=null && !firstBuy) {
        return null;
    }
    //占位成功，用户从未购买该商品
    RSemaphore semaphore = redissonClient.getSemaphore(SKU_STOCK_SEMAPHORE + randomCode);
    //阻塞获取信号量，一直等待别人释放信号量（不能使用此方式获取信号量）
    //semaphore.acquire();
    //100毫秒内试一下，看是否能获取指定数量的信号量
    try {
        boolean b = semaphore.tryAcquire(num,100,TimeUnit.MILLISECONDS);
        //秒杀成功，快速生成订单,给mq发送一个消息
        if (b){
            String orderSn = IdWorker.getTimeId();
            return orderSn;
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
        return null;
    }
    return null;
}
```

![image-20220828211147911](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.3.3.png)

##### 4、`SETNX`只能一个抢到

在`org.springframework.data.redis.core.ValueOperations`接口里有个`Boolean setIfAbsent(K key, V value);`方法，只能有一个人能够抢到该`key`，并将值设置进去。抢到了返回`true`（`redis`里返回`1`），没抢到返回`false`（`redis`里返回`0`）

```java
/**
 * Set {@code key} to hold the string {@code value} if {@code key} is absent.
 *
 * @param key must not be {@literal null}.
 * @param value must not be {@literal null}.
 * @return {@literal null} when used in pipeline / transaction.
 * @see <a href="https://redis.io/commands/setnx">Redis Documentation: SETNX</a>
 */
@Nullable
Boolean setIfAbsent(K key, V value);
```

![image-20220828204711411](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.4.1.png)

**SETNX**

Syntax

```
SETNX key value
```

- Available since:

  1.0.0

- Time complexity:

  O(1)

- ACL categories:

  `@write`, `@string`, `@fast`

Set `key` to hold string `value` if `key` does not exist. In that case, it is equal to [`SET`](https://redis.io/commands/set). When `key` already holds a value, no operation is performed. `SETNX` is short for "**SET** if **N**ot e**X**ists".

**Return**

[Integer reply](https://redis.io/docs/reference/protocol-spec#resp-integers), specifically:

- `1` if the key was set
- `0` if the key was not set

**Examples**

```bash
redis> SETNX mykey "Hello"
(integer) 1
redis> SETNX mykey "World"
(integer) 0
redis> GET mykey
"Hello"
```

![image-20220828204930892](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.3.4.2.png)

#### 4、秒杀中使用`RabbitMQ`

##### 1、秒杀架构图

秒杀业务的`RabbitMQ`架构图如下图红色方框圈住的部分所示。

![秒杀业务](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.1.png)

##### 2、引入`RabbitMQ`

在`gulimall-seckill`模块的`pom.xml`文件里引入`amqp`场景，使用`RabbitMQ`

```xml
<!--引入amqp场景，使用RabbitMQ-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

![image-20220828211534829](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.2.1.png)

在`gulimall-seckill`模块的`src/main/resources/application.properties`文件里添加如下依赖

```properties
spring.rabbitmq.host=192.168.56.10
spring.rabbitmq.virtual-host=/
```

![image-20220828212135844](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.2.2.png)

复制`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类，粘贴到`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.config`包里。

[点击查看`MyRabbitConfig`类完整代码](code/7.1.5.4.2.MyRabbitConfig.java)

![image-20220828212503641](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.2.3.png)

删掉该类的`initRabbitTemplate`方法和`setReturnCallback`方法、以及`rabbitTemplate`字段。只保留`messageConverter`方法。

![image-20220828212608587](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.2.4.png)

如果`gulimall-seckill`模块不监听队列，只向`Rabblt MQ`发送消息，不需要在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.GulimallSeckillApplication`主类上添加`@EnableRabbit`注解，因此这里可以什么都不做

![image-20220828213121570](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.2.5.png)

##### 3、接收消息

复制`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.to.SeckillSkuRedisTo`类的部分字段(`skuInfoVo`字段不复制，删除一些字段)，添加`orderSn`、`memberId`字段

[点击查看`SecKillOrderTo`类完整代码](code/7.1.5.4.3.SecKillOrderTo.java)

![image-20220828215201406](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.3.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类的`kill`方法里的`String orderSn = IdWorker.getTimeId();`下面添加如下代码，向`RabbitMq`发送消息。

[点击查看`kill`方法完整代码](code/7.1.5.4.3.SeckillServiceImpl.kill.java)

```
SecKillOrderTo secKillOrderTo = new SecKillOrderTo();
secKillOrderTo.setMemberId(memberEntityTo.getId());
secKillOrderTo.setOrderSn(orderSn);
secKillOrderTo.setSkuId(seckillSkuRedisTo.getSkuId());
secKillOrderTo.setNum(num);
secKillOrderTo.setPromotionSessionId(seckillSkuRedisTo.getPromotionSessionId());
secKillOrderTo.setSeckillPrice(seckillSkuRedisTo.getSeckillPrice());
rabbitTemplate.convertAndSend("order-event-exchange","order.seckill.order",secKillOrderTo);
```

![image-20220828215724392](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.3.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyMQConfig`类里添加如下两个方法，创建`order.seckill.order.queue`队列和绑定关系

```java
@Bean
public Queue orderSeckillOrderQueue(){
    //String name, boolean durable, boolean exclusive, boolean autoDelete
    return new Queue("order.seckill.order.queue",true,false,false);
}

@Bean
public Binding orderSeckillOrderBinding(){
    //String destination, DestinationType destinationType, String exchange, String routingKey,Map<String, Object> arguments
    return new Binding("order.seckill.order.queue", Binding.DestinationType.QUEUE,
            "order-event-exchange", "order.seckill.order", null);
}
```

![image-20220828220548675](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.3.3.png)

##### 4、创建订单

在`gulimall-order`模块的`com.atguigu.gulimall.order.listener`包里新建`OrderSeckillListener`类，用于监听秒杀的消息并创建订单。

```java
package com.atguigu.gulimall.order.listener;

import com.atguigu.common.to.SecKillOrderTo;
import com.atguigu.gulimall.order.entity.OrderEntity;
import com.atguigu.gulimall.order.service.OrderService;
import com.rabbitmq.client.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author 无名氏
 * @date 2022/8/28
 * @Description:
 */
@Slf4j
@RabbitListener(queues = "order.seckill.order.queue")
@Component
public class OrderSeckillListener {

    @Autowired
    OrderService orderService;

    @RabbitHandler
    public void listener(SecKillOrderTo secKillOrderTo, Channel channel, Message message) throws IOException{
        try {
            log.info("准备创建秒杀单的详细信息...");
            orderService.createSeckillOrder(secKillOrderTo);
            //手动ack
            channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
        } catch (Exception e) {
            channel.basicReject(message.getMessageProperties().getDeliveryTag(), true);
            e.printStackTrace();
        }
    }
}
```

![image-20220828221412545](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.4.1.png)

修改`gulimall-order`模块的`com.atguigu.gulimall.order.listener.OrderSeckillListener`接口的`createSeckillOrder`抽象方法

```java
void createSeckillOrder(SecKillOrderTo secKillOrderTo);
```

![image-20220828221443166](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.4.2.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.service.impl.OrderServiceImpl`类里实现`createSeckillOrder`方法

```java
/**
 * 简略的创建秒杀单
 * @param secKillOrderTo 秒杀单数据
 */
@Override
public void createSeckillOrder(SecKillOrderTo secKillOrderTo) {
    OrderEntity orderEntity = new OrderEntity();
    orderEntity.setOrderSn(secKillOrderTo.getOrderSn());
    orderEntity.setMemberId(secKillOrderTo.getMemberId());
    BigDecimal payAmount = secKillOrderTo.getSeckillPrice().multiply(new BigDecimal("" + secKillOrderTo.getNum()));
    orderEntity.setPayAmount(payAmount);
    orderEntity.setStatus(OrderStatusEnum.CREATE_NEW.getCode());
    this.save(orderEntity);
    //保存订单项信息(秒杀的订单只有一个订单项)
    OrderItemEntity orderItemEntity = new OrderItemEntity();
    orderItemEntity.setOrderSn(orderEntity.getOrderSn());
    orderItemEntity.setRealAmount(payAmount);
    orderItemEntity.setSkuQuantity(secKillOrderTo.getNum());
    //TODO 获取当前sku的详细信息
    //productFeignService.getSpuInfoBySkuId(secKillOrderTo.getSkuId());

    orderItemService.save(orderItemEntity);
}
```

![image-20220828223052656](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.4.3.png)

##### 5、测试

重启`GulimallOrderApplication`订单服务和`GulimallSeckillApplication`秒杀服务，可以看到创建秒杀活动后，点击`立即抢购`已经可以获得`订单号`了

![GIF 2022-8-28 22-51-54](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.4.5.gif)

#### 5、完善功能

##### 1、修改页面

将`gulimall-cart`模块的`src/main/resources/templates/success.html`文件复制到`gulimall-seckill`模块的`src/main/resources/templates`文件夹里

![image-20220829190725053](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.1.png)

##### 2、修改代码

将`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类上的`@RestController`注解修改为`@Controller`，然后在`getCurrentSeckillSkus`和`getSkuSeckillInfo`方法上添加`@ResponseBody`注解

![image-20220829190944312](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.2.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类里修改`seckill`方法，将返回类型修改为`String`，然后修改返回值为`return "success";`

[点击查看`SeckillController`类完整代码](code/7.1.5.5.SeckillController.java)

![image-20220829191413653](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.2.2.png)

##### 3、使用`thymeleaf`

在`gulimall-seckill`模块的`pom.xml`文件里，引入`thymeleaf`模板引擎

```xml
<!--模板引擎：thymeleaf-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

![image-20220829191534012](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.3.1.png)

在`gulimall-seckill`模块的`src/main/resources/application.properties`文件里添加如下配置，经用`thymeleaf`缓存

```properties
spring.thymeleaf.cache=false
```

![image-20220829191646309](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.3.2.png)

##### 4、修改页面

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类里，修改`seckill`方法

```java
/**
 * 秒杀接口
 * @return
 */
@GetMapping("/kill")
public String seckill(@RequestParam("killId") String killId,
                      @RequestParam("key") String key,
                      @RequestParam("num") Integer num,
                      Model model){
    //判断用户是否登录
    //创建订单号
    String orderSn = seckillService.kill(killId,key,num);

    model.addAttribute("orderSn",orderSn);
    return "success";
}
```

![image-20220829191905363](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.4.1.png)

在`gulimall-seckill`模块的`src/main/resources/templates/success.html`文件里，将`src="`全部替换为`src="http://cart.gulimall.com/`，将`href="`部分替换为`href="http://cart.gulimall.com/`（` href="/javascript:;"`和`href="/#none"`这些不替换）

```
src="/
src="http://cart.gulimall.com/

href="/
href="http://cart.gulimall.com/
```

![image-20220829192734285](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.4.2.png)

在`http://search.gulimall.com/list.html`里随便挑选一个商品，把它加入购物车，然后打开控制台，定位带这个商品，然后复制`m succeed-box`

![image-20220829192627147](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.4.3.png)

在`gulimall-seckill`模块的`src/main/resources/templates/success.html`文件里搜索`m succeed-box`，替换里面的代码

```html
<div class="main">
    <div class="success-wrap">
        <div class="w" id="result">
            <div class="m succeed-box">
                <div th:if="${orderSn!=null}" class="mc success-cont">
                    <h1>恭喜，秒杀成功。订单号:[[${orderSn}]]</h1>
                    <h2>正在准备订单数据，10秒后自动跳转到支付页面
                        <a style="color: red" th:href="${'http://order.gulimall.com/payOrder?orderSn='+orderSn}">去支付</a>
                    </h2>
                </div>
                <div th:if="${orderSn==null}">
                    <h1>手气不好，秒杀失败，请下次再来</h1>
                </div>
            </div>
        </div>
    </div>
</div>
```

![image-20220828194851830](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.4.4.png)

##### 5、测试

重启`GulimallSeckillApplication`服务，刷新   http://item.gulimall.com/1.html 页面，可以看到由于秒杀时间过了，又变成`加入购物车`了

![image-20220828195003525](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.5.1.png)

秒杀时间又过了，可以在`Windows`系统里面设置一下系统时间为秒杀范围内的时间即可以解决这个问题。

![image-20220828194328641](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.5.2.png)

再次刷新   http://item.gulimall.com/1.html 页面，可以看到已经变成`立即抢购`了

![image-20220828194444601](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.5.3.png)

测试以下`立即抢购`的完整流程，可以看到逻辑都没啥问题

其实上线秒杀后，应该把秒杀上架的库存提前在库存服务锁定住，等秒杀结束后如果`redis`里还有库存，再解锁`redis`里剩余数量的库存

上架秒杀商品的时候，每一个数据都有过期时间。
秒杀后续的流程，简化了收货地址等信息。

![GIF 2022-8-28 19-53-13](https://gitlab.com/apzs/image/-/raw/master/image/7.1.5.5.5.4.png)

## 7.2、SpringCloud Alibaba-Sentinel

### 7.2.1、简介

####  1、熔断降级限流

#####  **什么是熔断**

A 服务调用 B 服务的某个功能，由于网络不稳定问题，或者 B 服务卡机，导致功能时间超长。如果这样子的次数太多。我们就可以直接将 B 断路了（A 不再请求 B 接口），凡是调用 B 的直接返回降级数据，不必等待 B 的超长执行。 这样 B 的故障问题，就不会级联影响到 A。

#####  **什么是降级**

整个网站处于流量高峰期，服务器压力剧增，根据当前业务情况及流量，对一些服务和页面进行有策略的降级[停止服务，所有的调用直接返回降级数据]。以此缓解服务器资源的的压力，以保证核心业务的正常运行，同时也保持了客户和大部分客户的得到正确的相应。

##### 熔断与降级异同

相同点：

1、为了保证集群大部分服务的可用性和可靠性，防止崩溃，牺牲小我

2、用户最终都是体验到某个功能不可用不同点：

异同点

1、熔断是被调用方故障，触发的系统主动规则

2、降级是基于全局考虑，停止一些正常服务，释放资源

#####  什么是限流

对打入服务的请求流量进行控制，使服务能够承担不超过自己能力的流量压力

项目地址：https://github.com/alibaba/Sentinel

官方文档：`https://github.com/alibaba/Sentinel/wiki/介绍`

![image-20220828204432369](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.1.1.png)

官方网址：https://sentinelguard.io/zh-cn/

![image-20220828204441371](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.1.2.png)

#### 2、Sentinel: 分布式系统的流量防卫兵

![Sentinel Logo](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.2.1.png)

##### Sentinel 是什么？

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。[Sentinel](https://sentinelguard.io/) 以流量为切入点，从流量控制、流量路由、熔断降级、系统自适应过载保护、热点流量防护等多个维度保护服务的稳定性。

##### Sentinel 特征

- **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。
- **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。
- **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Apache Dubbo、gRPC、Quarkus 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。同时 Sentinel 提供 Java/Go/C++ 等多语言的原生实现。
- **完善的 SPI 扩展机制**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

Sentinel 的主要特性：

![Sentinel-features-overview](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.2.2.png)

Sentinel 的开源生态：

![Sentinel-opensource-eco](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.2.3.png)

Sentinel 分为两个部分:

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。

##### Sentinel 基本概念

 资源

资源是 Sentinel 的关键概念。它可以是 Java 应用程序中的任何内容，例如，由应用程序提供的服务，或由应用程序调用的其它应用提供的服务，甚至可以是一段代码。在接下来的文档中，我们都会用资源来描述代码块。

**只要通过** **Sentinel API** **定义的代码，就是资源，能够被** **Sentinel** **保护起来**。大部分情况下， 可以使用方法签名，URL，甚至服务名称作为资源名来标示资源。

规则

围绕资源的实时状态设定的规则，可以包括**流量控制规则**、**熔断降级规则**以及**系统保护规** **则**。所有规则可以动态实时调整。

##### Hystrix 与 Sentinel 比较

![image-20220828205909056](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.2.4.png)

#### 3、使用Sentinel文档

使用Sentinel在线文档：`https://github.com/alibaba/Sentinel/wiki/如何使用`

使用Sentinel离线文档： <a href="code/7.2.1.3.Sentinel使用.md">Sentinel使用</a>

![image-20220828221835525](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.3.png)

#### 4、整合文档

整合SpringBoot在线文档：https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel

整合SpringBoot离线文档：<a href="code/7.2.1.4.Sentinel整合.md">整合SpringBoot</a>

![image-20220828222732748](https://gitlab.com/apzs/image/-/raw/master/image/7.2.1.4.png)

### 7.2.2、整合Sentinel

#### 1、添加配置

##### 1、引入依赖

在`gulimall-common`模块的`pom.xml`文件里添加`sentinel`依赖

由于主流框架的默认适配，因此可以不配置受保护的资源，默认都是受保护的的

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

![image-20220828223407840](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.1.png)

##### 2、下载仪表盘

点击`1.Project`，让其展开，直接输入`sentinel`即可搜索，可以看到`com. alibaba.csp:sentinel-core`的版本为`1.6.3`

![image-20220828223650514](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.2.1.png)

在   https://github.com/alibaba/Sentinel/releases?page=1  页面里找到与该版本对应的`jar`包，然后下载

![image-20220828224058293](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.2.2.png)

使用如下命令，启动`sentinel`仪表盘

```bash
java -jar sentinel-dashboard-1.6.3.jar
```

![image-20220828224415756](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.2.3.png)

##### 3、添加配置

在`gulimall-seckill`模块的`src/main/resources/application.properties`文件里添加如下配置，指定`sentinel`仪表盘的`域名+端口`，然后随便配一个本服务与sentinel控制台建立连接所用端口(随便指定一个端口，只要没被占用就行，默认为8719)

```properties
#dashboard所用端口
spring.cloud.sentinel.transport.dashboard=localhost:8080
#本服务与sentinel控制台建立连接所用端口(随便指定一个端口，只要没被占用就行，默认为8719)
spring.cloud.sentinel.transport.port=8719
```

![image-20220830190847834](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.3.png)

##### 4、添加代码

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类的`getCurrentSeckillSkus`方法的开头添加`log.info("currentSeckillSkus正在执行...");`，用于测试是否访问了该方法

```java
@ResponseBody
@GetMapping("/currentSeckillSkus")
public R getCurrentSeckillSkus(){
    log.info("currentSeckillSkus正在执行...");
    List<SeckillSkuRedisTo> vos = seckillService.getCurrentSeckillSkus();
    return R.ok().setData(vos);
}
```

![image-20220830191851586](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.4.1.png)

将`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.scheduled.HelloSchedule`类的`hello`方法注释掉，以取消这个定时任务

![image-20220830192311228](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.4.2.png)

##### 5、测试

启动`GulimallGatewayApplication`服务和`GulimallSeckillApplication`服务，打开 http://localhost:8080 页面，可以看到已经进入到了`Sentinel`的登录页面了

![image-20220828224602517](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.5.1.png)

用户名和密码都为`sentinel`，输入用户名和密码后，进入到了 http://localhost:8080/#/dashboard/home 页面，可以看到什么都没有，因为这是懒加载方式

![image-20220828224740812](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.5.2.png)

访问  http://seckill.gulimall.com/currentSeckillSkus 请求并不断刷新，刷新   http://localhost:8080/#/dashboard/home 页面，可以看待已经显示`gulimall-seckill`模块了，点击`gulimall-seckill`模块，再点击`簇点电路`，即可看到`/currentSeckillSkus`这个请求了。给该请求添加`单机阈值`为`1`，再次访问  http://seckill.gulimall.com/currentSeckillSkus 请求并不断刷新，可以看到只有一次请求成功了。（一个资源可以同时有多个限流规则，检查规则时会依次检查。）

![GIF 2022-8-30 19-32-27](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.1.5.3.gif)

##### 6、流量控制

[点击查看流量控制规则](https://github.com/alibaba/Sentinel/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8#%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6%E8%A7%84%E5%88%99-flowrule)

| Field           | 说明                                                         | 默认值                        |
| --------------- | ------------------------------------------------------------ | ----------------------------- |
| resource        | 资源名，资源名是限流规则的作用对象                           |                               |
| count           | 限流阈值                                                     |                               |
| grade           | 限流阈值类型，QPS 模式（1）或并发线程数模式（0）             | QPS 模式                      |
| limitApp        | 流控针对的调用来源                                           | `default`，代表不区分调用来源 |
| strategy        | 调用关系限流策略：直接、链路、关联                           | 根据资源本身（直接）          |
| controlBehavior | 流控效果（直接拒绝/WarmUp/匀速+排队等待），不支持按调用关系限流 | 直接拒绝                      |
| clusterMode     | 是否集群限流                                                 | 否                            |

#### 2、添加健康管理

##### 1、数据的实时监控、审计、健康及指标信息

查看文档：   [Endpoint 支持](https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel)

![GIF 2022-8-31 20-41-38](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.1.1.gif)

在使用 Endpoint 特性之前需要在 Maven 中添加 `spring-boot-starter-actuator` 依赖，并在配置中允许 Endpoints 的访问。

- Spring Boot 1.x 中添加配置 `management.security.enabled=false`。暴露的 endpoint 路径为 `/sentinel`
- Spring Boot 2.x 中添加配置 `management.endpoints.web.exposure.include=*`。暴露的 endpoint 路径为 `/actuator/sentinel`

Sentinel Endpoint 里暴露的信息非常有用。包括当前应用的所有规则信息、日志目录、当前实例的 IP，Sentinel Dashboard 地址，Block Page，应用与 Sentinel Dashboard 的心跳频率等等信息。

![image-20220830194520683](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.1.2.png)

##### 2、启用SpringBoot健康管理

在`gulimall-seckill`模块的`pom.xml`文件里添加`actuator`健康管理依赖

(如果在`gulimall-order`设置会循环依赖，后面会说)

```xml
<!--健康管理-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

![image-20220830194553967](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.2.1.png)

以`jmx`方式暴露健康信息（即在`JConsole`、`jvisualvm`等扩展上可以看到健康信息，默认只使用这种方式暴露健康信息。还可以配置以`web`方式暴露健康信息，这样不仅可以在扩展上看到这些信息，也可以通过浏览器看到这些健康信息）

> 参见：[Java Management Extensions](https://zh.wikipedia.org/wiki/JMX)
>
> **JMX**（英语：Java Management Extensions，即Java管理扩展）是[Java](https://zh.wikipedia.org/wiki/Java)平台上为应用程序、设备、系统等植入管理功能的框架。JMX可以跨越一系列异构[操作系统](https://zh.wikipedia.org/wiki/操作系统)平台、系统[体系结构](https://zh.wikipedia.org/wiki/体系结构)和[网络传输协议](https://zh.wikipedia.org/wiki/网络传输协议)，灵活的开发无缝集成的系统、网络和服务管理应用。

```properties
#健康管理暴露所有端点
management.endpoints.jmx.exposure.include='*'
```

![image-20220830195321824](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.2.2.png)

##### 3、修改限流后返回的数据

在`gulimall-common`模块的`com.atguigu.common.exception.BizCodeException`枚举类里添加如下枚举，用于返回限流数据

```java
/**
 * 同一个接口QPS每秒发送的请求数过多
 */
TOO_MANY_REQUEST(10003,"请求流量过大异常"),
```

![image-20220830200955651](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.3.1.png)

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.config`包里添加`SeckillSentinelConfig`配置类，用于定制`Sentinel`限流后返回的数据

```java
package com.atguigu.gulimall.seckill.config;

import com.alibaba.csp.sentinel.adapter.servlet.callback.UrlBlockHandler;
import com.alibaba.csp.sentinel.adapter.servlet.callback.WebCallbackManager;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.fastjson.JSON;
import com.atguigu.common.exception.BizCodeException;
import com.atguigu.common.utils.R;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * @author 无名氏
 * @date 2022/8/30
 * @Description:
 */
@Configuration
public class SeckillSentinelConfig {

    public SeckillSentinelConfig(){
        WebCallbackManager.setUrlBlockHandler(new UrlBlockHandler() {
            @Override
            public void blocked(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, BlockException e) throws IOException {
                R error = R.error(BizCodeException.TOO_MANY_REQUEST);
                httpServletResponse.setCharacterEncoding(StandardCharsets.UTF_8.name());
                httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
                httpServletResponse.getWriter().write(JSON.toJSONString(error));
            }
        });
    }

}
```

![image-20220830203705864](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.3.2.png)

访问 http://seckill.gulimall.com/currentSeckillSkus 请求，然后在 http://localhost:8080/#/dashboard/home 里点击`gulimall-seckill`里的`流控规则`，点击`新增流控规则`，在`新增流控规则`里`资源名`输入`/currentSeckillSkus`，`单机阈值`输入`1`,点`新建`，多刷新     http://seckill.gulimall.com/currentSeckillSkus 请求，已经返回了自定义的流控后请求失败的结果了， 返回`Sentinel`仪表盘可以看到实时监控等信息

![GIF 2022-8-30 20-41-54](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.2.3.3.gif)

#### 3、其他模块添加健康管理

##### 1、订单模块添加健康管理

在`gulimall-order`模块的`pom.xml`文件里添加`actuator`健康管理依赖

```xml
<!--健康管理-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

![image-20220830205407446](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.1.1.png)

在`gulimall-order`模块的`src/main/resources/application.properties`配置文件里，添加`Sentinel dashboard`配置和`健康管理`配置

```properties
#dashboard所用端口
spring.cloud.sentinel.transport.dashboard=localhost:8080
#本服务与sentinel控制台建立连接所用端口(随便指定一个端口，只要没被占用就行，默认为8719)
spring.cloud.sentinel.transport.port=8719
#健康管理暴露所有端点
management.endpoints.jmx.exposure.include='*'
```

![image-20220830205414524](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.1.2.png)

##### 2、循环依赖

重启`GulimallOrderApplication`模块，报了`The dependencies of some of the beans in the application context form a cycle`（`应用上下文中的一些bean的依赖关系形成了一个循环`），也就是循环依赖。

```bash
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2022-08-30 20:53:52.664 ERROR 14640 --- [           main] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

The dependencies of some of the beans in the application context form a cycle:

   servletEndpointRegistrar defined in class path resource [org/springframework/boot/actuate/autoconfigure/endpoint/web/ServletEndpointManagementContextConfiguration$WebMvcServletEndpointManagementContextConfiguration.class]
      ↓
   healthEndpoint defined in class path resource [org/springframework/boot/actuate/autoconfigure/health/HealthEndpointConfiguration.class]
      ↓
   healthIndicatorRegistry defined in class path resource [org/springframework/boot/actuate/autoconfigure/health/HealthIndicatorAutoConfiguration.class]
      ↓
   org.springframework.boot.actuate.autoconfigure.amqp.RabbitHealthIndicatorAutoConfiguration
┌─────┐
|  rabbitTemplate defined in class path resource [org/springframework/boot/autoconfigure/amqp/RabbitAutoConfiguration$RabbitTemplateConfiguration.class]
↑     ↓
|  myRabbitConfig (field org.springframework.amqp.rabbit.core.RabbitTemplate com.atguigu.gulimall.order.config.MyRabbitConfig.rabbitTemplate)
└─────┘
```

![image-20220830205546089](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.2.1.png)

上面可能不够明显，让其本来是同一行的信息都一行显示(一行显示不下，不显示到下一行)后，可以看到如下依赖关系，很明显`rabbitTemplate`和`myRabbitConfig`形成了一个循环

![image-20220830210226251](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.2.2.png)

这是因为我们在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类里，注入了`RabbitTemplate`，还定制了`MessageConverter`

![image-20220830211036893](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.2.3.png)

而在`org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration`自动配置类里，向容器中放`RabbitTemplate`的方法中使用了`MessageConverter`，这样就导致，我们注入`RabbitTemplate`时向容器中找该类，然后调用该`rabbitTemplate(ConnectionFactory connectionFactory)`方法向容器中存放`RabbitTemplate`，而在该类里向容器中要`MessageConverter`，而`MessageConverter`被我们定制化为了`Jackson2JsonMessageConverter`，于是我们写的`MyRabbitConfig`类和别框架写的`RabbitAutoConfiguration`类就产生了循环依赖。

![image-20220830211221193](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.2.4.png)

在`gulimall-order`模块的`com.atguigu.gulimall.order.config.MyRabbitConfig`类里添加`rabbitTemplate(ConnectionFactory connectionFactory)`方法，我们自己向容器中存放`RabbitTemplate`，自己设置我们定制的`MessageConverter`

删除`RabbitTemplate rabbitTemplate;`字段上的`@Autowired`注解，和`initRabbitTemplate`方法上的`@PostConstruct`注解

[点击查看`MyRabbitConfig`类完整代码](code/7.2.2.3.2.MyRabbitConfig.java)

```java
@Primary
@Bean
public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
    rabbitTemplate = new RabbitTemplate(connectionFactory);
    rabbitTemplate.setMessageConverter(messageConverter());
    initRabbitTemplate();
    return rabbitTemplate;
}
```

![image-20220830211601054](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.2.5.png)

##### 3、其他模块添加配置

给其他模块(`gulimall-auth-server`、`gulimall-cart`、`gulimall-coupon`、`gulimall-gateway`、`gulimall-member`、`gulimall-product`、`gulimall-search`、`gulimall-third-party`、`gulimall-ware`)添加配置

![image-20220830213210941](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.1.png)

在其他模块的`pom.xml`文件里添加`actuator`健康管理依赖

```xml
<!--健康管理-->
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

![image-20220830212542596](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.2.png)

在其他模块的`src/main/resources/application.properties`配置文件里，添加`Sentinel dashboard`配置和`健康管理`配置

```properties
#dashboard所用端口
spring.cloud.sentinel.transport.dashboard=localhost:8080
#本服务与sentinel控制台建立连接所用端口(随便指定一个端口，只要没被占用就行，默认为8719)
spring.cloud.sentinel.transport.port=8719

#健康管理暴露所有端点
management.endpoints.jmx.exposure.include='*'
```

![image-20230110095623813](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.3.png)

走一遍下单流程，在`Sentinel`的控制台里，可以看到这些服务都显示出来了

![image-20220830214931962](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.4.png)

重启`GulimallThirdPartyApplication`服务，报了如下异常

```
2022-08-31 17:22:01.689 ERROR 13128 --- [           main] o.s.boot.SpringApplication               : Application run failed

org.springframework.beans.factory.BeanDefinitionStoreException: Failed to process import candidates for configuration class [com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplication]; nested exception is java.lang.IllegalStateException: Error processing condition on org.springframework.boot.actuate.autoconfigure.audit.AuditEventsEndpointAutoConfiguration
```

![image-20220831172712413](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.5.png)

[这是由不匹配的 Spring Boot 依赖项引起的](https://stackoverflow.com/questions/32758000/java-lang-illegalstateexception-error-processing-condition-on-org-springframewo)

这是由于版本不匹配导致的，将`gulimall-third-party`模块的`pom.xml`文件里的`project -> parent  -> version`父依赖的版本修改为`2.1.8.RELEASE`，将`project -> properties -> spring-cloud.version`微服务的版本修改为`Greenwich.SR3`

```
<version>2.1.8.RELEASE</version>
<spring-cloud.version>Greenwich.SR3</spring-cloud.version>
```

![image-20220831173123968](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.6.png)

打开`gulimall-third-party`模块的`com.atguigu.gulimall.thirdparty.GulimallThirdPartyApplicationTests`测试类，可以看到该类报错了，这是因为`2.2.1.RELEASE`版本的`Spring Boot`使用的是`junit5`，而`2.1.8.RELEASE`版本使用的是`junit4`

![image-20220831173247604](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.7.png)

将该测试类修改为`junit4`即可

[点击查看`GulimallThirdPartyApplicationTests`类完整代码](code/7.2.2.3.3.GulimallThirdPartyApplicationTests.java)

![image-20220831173330424](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.3.3.8.png)

#### 4、流控规则

##### 1、集群阈值模式--单机均摊

单机均摊：该模式下配置的阈值等同于单机能够承受的限额，token server 会根据客户端对应的 namespace（默认为 project.name 定义的应用名）下的连接数来计算总的阈值（比如独立模式下有 3 个 client 连接到了 token server，然后配的单机均摊阈值为 10，则计算出的集群总量就为 30）；

设置的阈值为`10`，则每台机器的阈值都为`10`

全局模式：配置的阈值等同于整个集群的总阈值。

每台机器分得的`QPS/线程数`不一样，但这些机器分得的总数为配置的阈值。

参考链接：https://zhuanlan.zhihu.com/p/364009386

![image-20220831174304830](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.1.png)

##### 2、流控模式--直连

[流量控制](https://github.com/alibaba/Sentinel/wiki/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6) ：只对该服务进行流控

![image-20220831201155540](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.2.png)

##### 3、流控模式--关联

假设`a`是读数据，`b`是写数据。假设`a`和`b`的并发都很大。此时设置`a`的阈值为`100`。并设置`a`关联`b`，则`b`的并发大了就对`a`限流，`b`并发不大就不对`a`限流

![image-20220831195328836](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.3.png)

##### 4、流控模式--链路

`c1`设置`入口资源`为`a`，则只有从`a`经过一系列链路到达`c`，对`c`的流控才生效，从`b2`(或其他链路)访问到`c`则不生效

```
     a
   /   \
  b1     b2
 /        \
c          c
```

![image-20220831200325381](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.4.png)

##### 5、流控效果--快速失败

达到阈值后，直接失败。假设设置阈值为`500`，有`700`个请求，则多出的`200`个请求直接丢弃。

![image-20220831201522214](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.5.png)

##### 6、流控效果--Warm Up

设置阈值是`500`，预热时间是`10s`，则在`10s`内缓慢增加流量，直到`10s`后才达到峰值`500`

![image-20220831201259563](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.6.png)

##### 7、流控效果--排队等待

达到阈值后，排队等待。假设设置阈值为`500`，有`700`个请求，则多出的`200`个请求排队进行等待。同时可以设置超时时间，到达超时时间的请求还是丢弃。

![image-20220831201759316](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.7.png)

##### 8、参考文档

在线文档： https://github.com/alibaba/Sentinel/wiki/%E6%B5%81%E9%87%8F%E6%8E%A7%E5%88%B6

离线文档： [流量控制概述](code/7.2.2.4.8.流量控制概述.md)

![image-20220831182009572](https://gitlab.com/apzs/image/-/raw/master/image/7.2.2.4.8.png)

### 7.2.3、Sentinel开启feign链路追踪

#### 1、添加Feign 支持

##### 1、添加Feign 支持参考文档

整个调用链只发现了这个请求，并没有发现通过`feign`远程调用的这些链路。而我们更要做的是对被调用方的熔断、保护、降级。

参考文档： [Feign 支持](https://github.com/alibaba/spring-cloud-alibaba/wiki/Sentinel#feign-%E6%94%AF%E6%8C%81)

![GIF 2022-8-31 20-42-59](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.1.1.gif)

##### 2、Sentinel开启feign链路追踪

秒杀时间又过了，可以在`Windows`系统里面设置一下系统时间为秒杀范围内的时间即可以解决这个问题。

![image-20220828205444897](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.1.2.1.png)

打开  http://item.gulimall.com/1.html  页面，可以看到已经显示`秒杀价`和`立即抢购`了

![image-20220828205535540](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.1.2.2.png)

给调用方的配置文件里添加`feign.sentinel.enabled=true`配置，使Sentinel开启feign链路追踪

这里的调用方是`gulimall-product`模块，该模块调用其他模块，因此在`gulimall-product`模块的`src/main/resources/application.properties`配置文件里添加如下配置，指定Sentinel开启feign链路追踪

```properties
#Sentinel开启feign链路追踪
feign.sentinel.enabled=true
```

![image-20220829143201917](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.1.2.3.png)

##### 3、测试

再走一遍有秒杀信息的商品的下单流程，然后在`Sentinel`的控制台里点击`gulimall-product`，可以看到已经有远程调用的`GET:http://gulimall-seckill/sku/seckill/{skuId}`这个请求了

```
GET:http://gulimall-seckill/sku/seckill/{skuId}
```

![image-20220828151418451](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.1.3.png)

#### 2、消费方定制远程调用失败返回结果

##### 1、停掉生产方

由于是`gulimall-product`模块调用`gulimall-seckill`模块，因此我们可以停掉`GulimallSeckillApplication`服务，模拟生产方宕机，不能提供服务。

![image-20220828151118808](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.1.png)

##### 2、查看异常

此时刷新  http://item.gulimall.com/1.html  页面，可以看到报了不能负载均衡到`gulimall-seckill`服务，这样系统的服务自治能力就很差，如果秒杀服务宕机此时就影响到了商品服务；我们应该做的是秒杀服务宕机后不影响商品服务，商品服务继续提供服务，商品服务此时不能调用秒杀服务，应该不显示商品的秒杀信息。

![image-20220828205956889](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.2.png)

##### 3、消费方自定义远程调用失败返回结果

可以对消费方的远程调用方法做一些限制，如果远程调用失败就返回我们自定义的返回结果。

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign`包里新建`fallback`文件夹，在`fallback`文件夹里新建`SeckillFeignServiceFallBack`类，用于设置远程调用失败后返回的默认结果。

```java
package com.atguigu.gulimall.product.feign.fallback;

import com.atguigu.common.exception.BizCodeException;
import com.atguigu.common.utils.R;
import com.atguigu.gulimall.product.feign.SeckillFeignService;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/28
 * @Description:
 */
@Component
public class SeckillFeignServiceFallBack implements SeckillFeignService {

    @Override
    public R getSkuSeckillInfo(Long skuId) {
        return R.error(BizCodeException.TOO_MANY_REQUEST);
    }
}
```

![image-20220828151929580](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.3.1.png)

然后在`gulimall-product`模块的`com.atguigu.gulimall.product.feign.SeckillFeignService`接口上，将`@FeignClient("gulimall-seckill")`修改为`@FeignClient(value = "gulimall-seckill",fallback = SeckillFeignServiceFallBack.class)`，指明远程调用失败后使用`SeckillFeignServiceFallBack`来处理

```java
@FeignClient(value = "gulimall-seckill",fallback = SeckillFeignServiceFallBack.class)
```

![image-20220828152430564](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.3.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.feign.fallback.SeckillFeignServiceFallBack`类里添加日志信息，用于查看是否调用了该方法。

```java
package com.atguigu.gulimall.product.feign.fallback;

import com.atguigu.common.exception.BizCodeException;
import com.atguigu.common.utils.R;
import com.atguigu.gulimall.product.feign.SeckillFeignService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/28
 * @Description:
 */
@Slf4j
@Component
public class SeckillFeignServiceFallBack implements SeckillFeignService {

    @Override
    public R getSkuSeckillInfo(Long skuId) {
        log.info("熔断方法被调用...getSkuSeckillInfo");
        return R.error(BizCodeException.TOO_MANY_REQUEST);
    }
}
```

![image-20220828152949670](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.3.3.png)

##### 4、测试

在`gulimall-product`模块的`src/main/resources/application.yml`配置文件里，将`com.atguigu.gulimall`包下的`error`级别修改为`info`级别

```yaml
logging:
  level:
    com.atguigu.gulimall: info
```

![image-20220828152754109](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.4.1.png)

重启`GulimallProductApplication`服务

![image-20220828153102628](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.4.2.png)

刷新  http://item.gulimall.com/1.html  页面，这次就不报错了，并且没有显示秒杀信息

![image-20220828153155146](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.4.3.png)

此时`GulimallProductApplication`服务的控制台已经显示`熔断方法被调用...getSkuSeckillInfo`，表明刚刚写的`SeckillFeignServiceFallBack`远程调用失败处理类已经生效了

```
2022-08-28 15:33:44.029  INFO 14668 --- [ool-2-thread-15] c.a.g.p.f.f.SeckillFeignServiceFallBack  : 熔断方法被调用...getSkuSeckillInfo
```

![image-20220828153403769](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.4.4.png)

##### 5、设置远程调用熔断等待时间

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.controller.SeckillController`类里，修改`getSkuSeckillInfo`方法，让其睡眠`300`毫秒，模拟生产方逻辑复杂，执行时间长。

```java
/**
 * 查询指定sku的一个秒杀信息
 * @param skuId
 * @return
 */
@ResponseBody
@GetMapping("/sku/seckill/{skuId}")
public R getSkuSeckillInfo(@PathVariable("skuId") Long skuId) throws InterruptedException {
    TimeUnit.MILLISECONDS.sleep(300);
    SeckillSkuRedisTo to = seckillService.getSkuSeckillInfo(skuId);
    return R.ok().setData(to);
}
```

![image-20220828154723077](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.5.1.png)

启动`GulimallSeckillApplication`服务，没设置降级前，刷新页面，然后疯狂按`f5`刷新，可用看到怎么都不会调用降级方法。

设置`RT`(响应时间)为`1ms`，时间窗口为`10s`后，当在`10s`内的请求响应时间超过`1ms`的次数大于`最小请求数目`(默认为`5`)后，在这个`10s`内的后面的请求都会被熔断。当超过这个`10s`的时间段后又会再次恢复访问，又重新进行计数。

![GIF 2022-8-28 16-17-12](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.5.2.gif)

##### 6、[熔断降级策略](https://github.com/alibaba/Sentinel/wiki/%E7%86%94%E6%96%AD%E9%99%8D%E7%BA%A7)

Sentinel 提供以下几种熔断策略：

- 慢调用比例 (`SLOW_REQUEST_RATIO`)：选择以慢调用比例作为阈值，需要设置允许的慢调用 RT（即最大的响应时间），请求的响应时间大于该值则统计为慢调用。当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且慢调用的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求响应时间小于设置的慢调用 RT 则结束熔断，若大于设置的慢调用 RT 则会再次被熔断。
- 异常比例 (`ERROR_RATIO`)：当单位统计时长（`statIntervalMs`）内请求数目大于设置的最小请求数目，并且异常的比例大于阈值，则接下来的熔断时长内请求会自动被熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。异常比率的阈值范围是 `[0.0, 1.0]`，代表 0% - 100%。
- 异常数 (`ERROR_COUNT`)：当单位统计时长内的异常数目超过阈值之后会自动进行熔断。经过熔断时长后熔断器会进入探测恢复状态（HALF-OPEN 状态），若接下来的一个请求成功完成（没有错误）则结束熔断，否则会再次被熔断。

**熔断降级规则说明**

熔断降级规则（DegradeRule）包含下面几个重要的属性：

| Field              | 说明                                                         | 默认值     |
| ------------------ | ------------------------------------------------------------ | ---------- |
| resource           | 资源名，即规则的作用对象                                     |            |
| grade              | 熔断策略，支持慢调用比例/异常比例/异常数策略                 | 慢调用比例 |
| count              | 慢调用比例模式下为慢调用临界 RT（超出该值计为慢调用）；异常比例/异常数模式下为对应的阈值 |            |
| timeWindow         | 熔断时长，单位为 s                                           |            |
| minRequestAmount   | 熔断触发的最小请求数，请求数小于该值时即使异常比率超出阈值也不会熔断（1.7.0 引入） | 5          |
| statIntervalMs     | 统计时长（单位为 ms），如 60*1000 代表分钟级（1.8.0 引入）   | 1000 ms    |
| slowRatioThreshold | 慢调用比例阈值，仅慢调用比例模式有效（1.8.0 引入）           |            |

![image-20220828162939048](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.6.png)

##### 7、总结

使用Sentinel来保护feign远程调用:熔断;
1)、调用方的熔断保护: feign.sentinel.enabled=true
2)、调用方手动指定远程服务的降级策略。远程服务被降级处理。触发我们的熔断回调方法
3)、超大流量的时候，必须牺牲一 些远程服务。在服务的提供方(远程服务)指定降级策略; 
提供方是在运行。但是不运行自己的业务逻辑，返回的是默认的降级数据(限流的数据)，即`SeckillSentinelConfig`类配置的返回的降级后的数据(发送方是熔断，远程服务是降级)

```java
@Configuration
public class SeckillSentinelConfig {

    public SeckillSentinelConfig(){
        WebCallbackManager.setUrlBlockHandler(new UrlBlockHandler() {
            @Override
            public void blocked(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, BlockException e) throws IOException {
                R error = R.error(BizCodeException.TOO_MANY_REQUEST);
                httpServletResponse.setCharacterEncoding(StandardCharsets.UTF_8.name());
                httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
                httpServletResponse.getWriter().write(JSON.toJSONString(error));
            }
        });
    }

}
```

![image-20220828163157492](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.7.1.png)

为每个服务(`gulimall-auth-server`、`gulimall-cart`、`gulimall-coupon`、`gulimall-member`、`gulimall-order`、`gulimall-search`、`gulimall-seckill`、`gulimall-third-party`、`gulimall-ware`)都配置Sentinel开启feign链路追踪

```properties
#sentinel开启feign链路追踪
feign.sentinel.enabled=true
```

![image-20220828164648978](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.7.2.png)

为每个服务(`gulimall-auth-server`、`gulimall-cart`、`gulimall-coupon`、`gulimall-member`、`gulimall-order`、`gulimall-product`、`gulimall-search`、`gulimall-third-party`、`gulimall-ware`)都加上`SeckillSentinelConfig`配置类

![image-20220828164701564](https://gitlab.com/apzs/image/-/raw/master/image/7.2.3.2.7.3.png)

### 7.2.4、[自定义受保护资源](https://github.com/alibaba/Sentinel/wiki/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8#%E5%AE%9A%E4%B9%89%E8%B5%84%E6%BA%90)

#### 1、方法内受保护

使用`try(Entry entry = SphU.entry("seckillSkus")) `尝试调用`SphU.entry("seckillSkus")`获取`seckillSkus`，如果获取不到就捕获异常。（用try-with-resources代替try-catch-finally，即根据资源，而不是根据try里的代码）

```java
@Override
public List<SeckillSkuRedisTo> getCurrentSeckillSkus() {
    //try(需要释放的资源){}   ==> 用try-with-resources代替try-catch-finally
    try(Entry entry = SphU.entry("seckillSkus")) {
        long time = System.currentTimeMillis();
        Set<String> keys = redisTemplate.keys(SESSIONS_CACHE_PREFIX + "*");
        for (String key : keys) {
            String replace = key.replace(SESSIONS_CACHE_PREFIX, "");
            String[] split = replace.split("_");
            Long start = Long.parseLong(split[0]);
            Long end = Long.parseLong(split[1]);
            if (time >= start && time <= end) {
                //这里的 -1相当于length-1，即最后一个元素。取出的结果为[0,length-1] 包含开始和最后的元素，即所有元素
                List<String> range = redisTemplate.opsForList().range(key, 0, -1);
                BoundHashOperations<String, String, String> operations = redisTemplate.boundHashOps(SKUKILL_CACHE_PREFIX);

                if (range != null) {
                    List<String> list = operations.multiGet(range);
                    if (!CollectionUtils.isEmpty(list)) {
                        List<SeckillSkuRedisTo> collect = list.stream().map(item -> {
                            SeckillSkuRedisTo seckillSkuRedisTo = JSON.parseObject(item.toString(), SeckillSkuRedisTo.class);
                            //秒杀开始后可以查看到随机码
                            //seckillSkuRedisTo.setRandomCode(null);
                            return seckillSkuRedisTo;
                        }).collect(Collectors.toList());
                        return collect;
                    }
                }
                //只要找到了在当前时间范围内的秒杀，不管range是否为null都退出循环(当然如果range不为null,直接就return了)
                break;
            }
        }
    }catch (BlockException e){
        log.error("资源被限流:{}",e.getMessage());
    }
    return null;
}
```

![image-20220828150816611](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.1.1.png)

在`Sentinel 控制台`的`gulimall-seckill`模块里的` /currentSeckillSkus`里已经显示`seckillSkus`了，可以对`seckillSkus`进行流控，指定单机阈值等信息。

![image-20220828150520984](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.1.2.png)

在没对`seckillSkus`流控前，不断刷新 http://seckill.gulimall.com/currentSeckillSkus 都可以访问，对`seckillSkus`流控后，再次频繁访问  http://seckill.gulimall.com/currentSeckillSkus  页面，就开始报错了。

![GIF 2022-8-28 15-24-52](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.1.3.gif)

#### 2、对方法进行保护

##### 1、对方法进行保护

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类的`getCurrentSeckillSkus`方法上添加如下注解，即可使用`getCurrentSeckillSkusResource`资源对该方法进行保护。

```
@SentinelResource("getCurrentSeckillSkusResource")
```

![image-20220828151904605](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.2.1.1.png)

刷新 http://seckill.gulimall.com/currentSeckillSkus 页面，在`Sentinel 控制台`的`gulimall-seckill`模块已经显示`getCurrentSeckillSkusResource`和对应方法里的`seckillSkus`了。

![image-20220828152932141](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.2.1.2.png)

给`getCurrentSeckillSkusResource`和`seckillSkus`都添加流控，可以看到可以正常生效，但是`getCurrentSeckillSkusResource`的流控返回的不够友好，我们可以自定义流控后返回的页面。

![GIF 2022-8-28 15-38-12](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.2.1.3.gif)

##### 2、自定义流控响应

在`gulimall-seckill`模块的`com.atguigu.gulimall.seckill.service.impl.SeckillServiceImpl`类的`getCurrentSeckillSkus`方法上修改`@SentinelResource`注解，添加`,blockHandler = "blockHandler"`，指定流控后的处理。在该类添加同名、同返回类型的方法，并多添加一个`BlockException e`参数，该参数用于获取出错的信息，然后自定义流控后的处理。

```java
/**
 * 5、自定义受保护的资源
 * 1)、代码
 *      try(Entry entry = SphU. entry( "seckillSkus")){
 *      //业务逻辑
 *      }catch(Execption e){}
 * 2)、基于注解。
 *      @SentineLResource(vaLue = "getCurrentSeckillSkusResource", blockHandler = "blockHandler")
 * 无论是1, 2方式一定要配置被限流以后的默认返回.
 * url请求可以设置统一返回WebCallbackManager
 */
public List<SeckillSkuRedisTo> getCurrentSeckillSkus(BlockException e){
    log.error("getCurrentSeckillSkus被限流了");
    return null;
}

@SentinelResource(value = "getCurrentSeckillSkusResource",blockHandler = "blockHandler")
```

![image-20220828154638997](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.2.2.png)

#### 3、[网关限流](https://github.com/alibaba/Sentinel/wiki/%E7%BD%91%E5%85%B3%E9%99%90%E6%B5%81)

##### 1、添加依赖

整合网关需要引入`spring-cloud-starter-alibaba-sentinel`和`spring-cloud-alibaba-sentinel-gateway`，由于`common`已经引入`spring-cloud-starter-alibaba-sentinel`了，因此只需引入`spring-cloud-alibaba-sentinel-gateway`就行了

在`gulimall-gateway`网关模块的`pom.xml`文件里添加`spring-cloud-alibaba-sentinel-gateway`依赖

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-alibaba-sentinel-gateway</artifactId>
   <version>2.1.0.RELEASE</version>
</dependency>
```

![image-20220828160121708](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.1.png)

##### 2、基于QPS限流

关闭`sentinel-dashboard-1.6.3`版本的`Sentinel仪表板`，启动`sentinel-dashboard-1.7.1.jar`版本的`sentinel仪表板`，首先刷新   http://seckill.gulimall.com/currentSeckillSkus 页面，让懒加载的`Sentinel`加载到该请求，然后复制在网关模块里配置的该请求对应的模块的`id`，然后打开`Sentinel仪表板`点击`新增网关流控规则`，在`API名称`输入在网关模块里配置的`gulimall-seckill`模块的`id`，即`gulimall_seckill_route`，然后在`QPS 阈值`里输入`1`，然后点击`新增`接口新增流控规则，频繁刷新   http://seckill.gulimall.com/currentSeckillSkus 页面，可以看到已经返回自定义的结果了。

![GIF 2022-8-28 19-20-58](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.2.gif)

##### 3、基于请求头限流

还可以争对各种属性进行限流，比如`Client IP`、`Remote Host`、`Header`、`URL参数`、`Cookie`。

![GIF 2022-8-28 19-29-08](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.3.gif)

##### 4、分组限流

可以在`API 管理`里`新增自定义API`，然后对`API 分组`进行流控。

(如果没成功，需要修改`pom`文件里`sentinel`的版本号)

![GIF 2022-8-28 19-36-50](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.4.gif)

##### 5、自定义限流返回数据

在`gulimall-gateway`模块的`src/main/resources/application.properties`配置文件里添加如下配置，重启`sentinel仪表板`和`所有微服务`，定制限流后返回的数据并未生效

```properties
#定制限流后返回的数据(亲测不生效)
spring.cloud.sentinel.scg.fallback.content-type=application/json
spring.cloud.sentinel.scg.fallback.response-status=400
spring.cloud.sentinel.scg.fallback.response-body=请求过多，请稍后重试
```

![image-20220828195129017](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.5.1.png)

在`gulimall-gateway`模块的`com.atguigu.gulimall.gateway.config`包里添加`SentinelGatewayConfig`类，用于自定义限流后返回的数据

```java
package com.atguigu.gulimall.gateway.config;

import com.alibaba.csp.sentinel.adapter.gateway.sc.callback.BlockRequestHandler;
import com.alibaba.csp.sentinel.adapter.gateway.sc.callback.GatewayCallbackManager;
import com.alibaba.fastjson.JSON;
import com.atguigu.common.exception.BizCodeException;
import com.atguigu.common.utils.R;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

/**
 * @author 无名氏
 * @date 2022/8/28
 * @Description:
 */
@Configuration
public class SentinelGatewayConfig {

    public SentinelGatewayConfig(){
        GatewayCallbackManager.setBlockHandler(new BlockRequestHandler() {
            //网关限流后，就会调用该回调
            //Mono(单个对象) Flux(集合) 响应式编程
            @Override
            public Mono<ServerResponse> handleRequest(ServerWebExchange serverWebExchange, Throwable throwable) {
                final R error = R.error(BizCodeException.TOO_MANY_REQUEST);
                final String errorJson = JSON.toJSONString(error);
                final Mono<ServerResponse> body = ServerResponse.ok().body(Mono.just(errorJson), String.class);
                return body;
            }
        });
    }

}
```

![image-20220828213513731](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.5.2.png)

不断请求 http://seckill.gulimall.com/currentSeckillSkus ，可以看到已经返回自定义的数据了

![GIF 2022-8-28 21-38-15](https://gitlab.com/apzs/image/-/raw/master/image/7.2.4.3.5.3.gif)

## 7.3、Sleuth+Zipkin 服务链路追踪

### 7.3.1、概述

#### 1、为什么用

微服务架构是一个分布式架构，它按业务划分服务单元，一个分布式系统往往有很多个服务单元。由于服务单元数量众多，业务的复杂性，**如果出现了错误和异常，很难去定位**。主要体现在，**一个请求可能需要调用很多个服务**，而内部服务的调用复杂性，决定了问题难以定位。所以微服务架构中，必须实现分布式链路追踪，去跟进一个请求到底有哪些服务参与，   参与的顺序又是怎样的，从而达到**每个请求的步骤清晰可见，出了问题，很快定位**。
链路追踪组件有 Google 的 Dapper，Twitter 的 Zipkin，以及阿里的 Eagleeye （鹰眼）等，它们都是非常优秀的链路追踪开源组件。

#### 2、基本术语

- Span（跨度）：基本工作单元，发送一个远程调度任务 就会产生一个 Span，Span 是一个 64 位 ID 唯一标识的，Trace 是用另一个 64 位 ID 唯一标识的，Span 还有其他数据信息，比如摘要、时间戳事件、Span 的 ID、以及进度 ID。

- Trace（跟踪）：一系列 Span 组成的一个树状结构。请求一个微服务系统的 API 接口， 这个 API 接口，需要调用多个微服务，调用每个微服务都会产生一个新的 Span，所有由这个请求产生的 Span 组成了这个 Trace。

- Annotation（标注）：用来及时记录一个事件的，一些核心注解用来定义一个请求的开  始和结束 。这些注解包括以下：

  - cs - Client Sent -客户端发送一个请求，这个注解描述了这个 Span 的开始

  - sr - Server Received -服务端获得请求并准备开始处理它，如果将其 sr 减去 cs 时间戳便可得到网络传输的时间。

  - ss - Server Sent （服务端发送响应）–该注解表明请求处理的完成(当请求返回客户端)，如果 ss 的时间戳减去 sr 时间戳，就可以得到服务器请求的时间。

  - cr - Client Received（客户端接收响应）此时 Span 的结束，如果 cr 的时间戳减去cs 时间戳便可以得到整个请求所消耗的时间。

(假设A->B->C，此时就会有3个Span。而Trace就只有一个，用于追踪整个链路。Annotation（标注）就相当于给Span打一个标签)

如果服务调用顺序如下

![image-20220829091448319](https://gitlab.com/apzs/image/-/raw/master/image/7.3.1.2.1.png)

那么用以上概念完整的表示出来如下：

![image-20220829091500261](https://gitlab.com/apzs/image/-/raw/master/image/7.3.1.2.2.png)

Span 之间的父子关系如下：

![image-20220829091526049](https://gitlab.com/apzs/image/-/raw/master/image/7.3.1.2.3.png)



### 7.3.2、整合 Sleuth

#### 1、添加依赖

在`gulimall-common`模块的`pom.xml`文件里的`project  ->  dependencyManagement  -> dependencies`里添加如下依赖，用于对`spring-cloud`进行版本约束。

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Greenwich.SR3</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

在`gulimall-common`模块的`pom.xml`文件里的`project  -> dependencies`里添加`spring-cloud-starter-sleuth`依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-sleuth</artifactId>
</dependency>
```

![image-20220829092228462](https://gitlab.com/apzs/image/-/raw/master/image/7.3.2.1.png)

#### 2、添加配置

在`gulimall-product`模块的`src/main/resources/application.properties`配置文件里添加如下配置，指定`logging.level.org.springframework.cloud.openfeign`包和`logging.level.org.springframework.cloud.sleuth`包下的日志级别为`debug`

```properties
logging.level.org.springframework.cloud.openfeign: debug
logging.level.org.springframework.cloud.sleuth: debug
```

![image-20220829093736984](https://gitlab.com/apzs/image/-/raw/master/image/7.3.2.2.1.png)

在`gulimall-seckill`模块的`src/main/resources/application.properties`配置文件里添加同样的配置

![image-20220829093740953](https://gitlab.com/apzs/image/-/raw/master/image/7.3.2.2.2.png)

重启各个模块，刷新 https://item.gulimall.com/1.html 页面，查看`GulimallProductApplication`服务的控制台，打印了如下日志

```bash
DEBUG [gulimall-product,4333ca18c611f553,cc74b65e5467a683,false]

gulimall-product：服务名
4333ca18c611f553：是 TranceId一条链路中，只有一个TranceId 
cc74b65e5467a683：是 spanId，链路中的基本工作单元 id
false：表示是否将数据输出到其他服务，true 则会把信息输出到其他可视化的服务上观察
```

![GIF 2022-8-29 9-39-47](https://gitlab.com/apzs/image/-/raw/master/image/7.3.2.2.3.gif)

### 7.3.3、**整合** **zipkin** 可视化观察

#### 1、概述

通过 Sleuth 产生的调用链监控信息，可以得知微服务之间的调用链路，但监控信息只输出到控制台不方便查看。我们需要一个图形化的工具-zipkin。Zipkin 是 Twitter 开源的分布式跟踪系统，主要用来收集系统的时序数据，从而追踪系统的调用问题。zipkin 官网地址如下： https://zipkin.io/

![image-20220829105134089](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.1.png)

#### 2、docker 安装 zipkin 服务器

使用如下命令，安装 zipkin 服务器

```
docker run -d -p 9411:9411 openzipkin/zipkin
```

![image-20220829095100126](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.2.png)

#### 3、添加依赖

在`gulimall-common`模块的`pom.xml`文件里添加`zipkin`的依赖，并删除`sleuth`的依赖（zipkin 依赖也同时包含了 sleuth，可以省略 sleuth 的引用）

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

![image-20220829095416340](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.3.png)

#### 4、添加配置

文档里提示我们需要进行如下配置

```yaml
spring:
  application:
    name: user-service
  zipkin:
    # zipkin 服务器的地址
    base-url: http://192.168.56.10:9411/
    #关闭服务发现,否则Spring Cloud 会把 zipkin 的 url 当做服务名称
    discoveryClientEnabled: false
    sender:
      #设置使用 http 的方式传输数据
      type: web    
  sleuth:
    sampler:
      #设置抽样采集率为100%，默认为0.1，即10%
      probability: 1
```

因此，我们可以给所有微服务的`src/main/resources/application.properties`文件里都加上如下配置

```properties
# zipkin 服务器的地址
spring.zipkin.base-url=http://192.168.56.10:9411/
#关闭服务发现,否则Spring Cloud 会把 zipkin 的 url 当做服务名称
spring.zipkin.discovery-client-enabled=false
##设置使用 http 的方式传输数据 (可选值：rabbit、kafka、web)
spring.zipkin.sender.type=web
#设置抽样采集率为100%，默认为0.1，即10%
spring.sleuth.sampler.probability=1
```

![image-20220829100727550](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.4.1.png)

走一遍下单的流程，访问： http://192.168.56.10:9411/ 页面。可以看到这些链路都显示出来了

![GIF 2022-8-29 10-47-31](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.4.2.gif)

还能显示这些链路的流向等信息

![GIF 2022-8-29 10-58-29](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.4.3.gif)

#### 5、Zipkin 数据持久化

Zipkin 默认是将监控数据存储在内存的，如果 Zipkin 挂掉或重启的话，那么监控数据就会丢失。所以如果想要搭建生产可用的 Zipkin，就需要实现监控数据的持久化。而想要实现数据持久化，自然就是得将数据存储至数据库。好在 Zipkin 支持将数据存储至：

- 内存（默认）

- MySQL

- Elasticsearch

- Cassandra

Zipkin 数据持久化相关的官方文档地址如下：
https://github.com/openzipkin/zipkin#storage-component

Zipkin 支持的这几种存储方式中，内存显然是不适用于生产的，这一点开始也说了。而使用MySQL 的话，当数据量大时，查询较为缓慢，也不建议使用。Twitter 官方使用的是 Cassandra 作为 Zipkin 的存储数据库，但国内大规模用 Cassandra 的公司较少，而且 Cassandra 相关文档也不多。

综上，故采用 Elasticsearch 是个比较好的选择，关于使用 Elasticsearch 作为 Zipkin 的存储数据库的官方文档如下：

[elasticsearch-storage](https://github.com/openzipkin/zipkin/tree/master/zipkin-server#elasticsearch-storage)、[zipkin-storage/elasticsearch](https://github.com/openzipkin/zipkin/tree/master/zipkin-storage/elasticsearch)

通过 docker 的方式将Zipkin 数据持久化到`elasticsearch`的命令如下

```dockerfile
docker run 
--env STORAGE_TYPE=elasticsearch 
--env ES_HOSTS=192.168.56.10:9200 
openzipkin/zipkin-dependencies
```

![image-20220829114726137](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.5.1.png)

使用 es 时`Zipkin Dependencies`支持的环境变量

![image-20220829114745615](https://gitlab.com/apzs/image/-/raw/master/image/7.3.3.5.2.png)

## 高级篇总结

高并发有三宝：`缓存`、`异步`、`队排好`

![image-20220829115133200](https://gitlab.com/apzs/image/-/raw/master/image/7.4.png)
