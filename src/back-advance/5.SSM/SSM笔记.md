## 1.Spring的IOC和依赖注入(DI)
> 官方文档：https://docs.spring.io/spring-framework/docs/current/reference/html/core.html

### 1.1. Spring简介

Spring是分层的 Java SE/EE应用 full-stack 轻量级开源框架，以 **IoC**（Inverse Of Control：反转控制）和 **AOP**（Aspect Oriented Programming：面向切面编程）为内核。
提供了**展现层 SpringMVC** 和**持久层 Spring JDBCTemplate** 以及**业务层事务管理**等众多的企业级应用技术，还能整合开源世界众多著名的第三方框架和类库，逐渐成为使用最多的Java EE 企业应用开源框架。

在Spring Framework基础上，又诞生了Spring Boot、Spring Cloud、Spring Data、Spring Security等一系列基于Spring Framework的项目。

> **IoC容器**
>
> 在学习Spring框架时，我们遇到的第一个也是最核心的概念就是容器。
>
> 什么是容器？容器是一种为某种特定组件的运行提供必要支持的一个软件环境。例如，Tomcat就是一个Servlet容器，它可以为Servlet的运行提供运行环境。类似Docker这样的软件也是一个容器，它提供了必要的Linux环境以便运行一个特定的Linux进程。
>
> 通常来说，使用容器运行组件，除了提供一个组件运行环境之外，容器还提供了许多底层服务。例如，Servlet容器底层实现了TCP连接，解析HTTP协议等非常复杂的服务，如果没有容器来提供这些服务，我们就无法编写像Servlet这样代码简单，功能强大的组件。早期的JavaEE服务器提供的EJB容器最重要的功能就是通过声明式事务服务，使得EJB组件的开发人员不必自己编写冗长的事务处理代码，所以极大地简化了事务处理。
>
> Spring的核心就是提供了一个IoC容器，它可以管理所有轻量级的JavaBean组件，提供的底层服务包括组件的生命周期管理、配置和组装服务、AOP支持，以及建立在AOP基础上的声明式事务服务等。

### 1.2. Spring快速入门

传统方式在Service中调用Dao层的方法，需要在Service中创建一个Dao对象。

![image-20220330101439838](https://gitlab.com/apzs/image/-/raw/master/image/202203301014916.png)

使用Spring框架，直接获取Dao对象。

![image-20220318145435301](https://gitlab.com/apzs/image/-/raw/master/image/202203272238053.png)



**Spring程序开发步骤**
1、导入 Spring 开发的基本包坐标 
2、编写 Dao 接口和实现类 
3、创建 Spring 核心配置文件 
4、在 Spring 配置文件中配置 UserDaoImpl
5、使用 Spring 的 API 获得 Bean 实例

**1、导入Spring开发的基本包坐标**

```xml
<properties> 
    <spring.version>5.0.5.RELEASE</spring.version> 
</properties>
<dependencies> 
    <!--导入spring的context坐标，context依赖core、beans、expression--> 
    <dependency> 
        <groupId>org.springframework</groupId> 
        <artifactId>spring-context</artifactId> 
        <version>${spring.version}</version>
	</dependency>
</dependencies>
```

**2、编写Dao接口和实现类**

```java
public interface UserDao {
    public void save();
}
```



```java
public class UserDaoImpl implements UserDao {
    public void save() {
        System.out.println("save running...");
    }
}
```



**3、创建Spring核心配置文件** 

在类路径下（resources）创建applicationContext.xml配置文件。

**4、在Spring配置文件中配置UserDaoImpl**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

        <bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" scope="singleton"></bean>
        <bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
            <constructor-arg name="userDao" ref="userDao"></constructor-arg>
        </bean>
</beans>
```



**5、使用Spring的API获得Bean实例**

```java
ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
UserDao userDao = (UserDao)app.getBean("userDao");
userDao.save();
```


### 1.3. Spring配置文件

#### 1.3.1 Bean标签基本配置

用于配置对象交由Spring来创建。

默认情况下它调用的是类中的**无参构造函数**，如果没有无参构造函数则不能创建成功。

基本属性：

- id: Bean实例在Spring容器中的唯一标识
- class：Bean的全限定名称

#### 1.3.2 Bean标签范围配置

scope: 指对象的作用范围

| 取值范围       | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| singleton      | 默认值，单例的                                               |
| prototype      | 多例的                                                       |
| request        | WEB 项目中，Spring 创建一个 Bean 的对象，将对象存入到 request 域中 |
| session        | WEB 项目中，Spring 创建一个 Bean 的对象，将对象存入到 session 域中 |
| global session | WEB 项目中，应用在 Portlet 环境，如果没有 Portlet 环境那么globalSession 相当 于 session |



**1）当scope的取值为`singleton`时** 

![img](https://gitlab.com/apzs/image/-/raw/master/image/singleton.png)

Bean的实例化个数：1个

Bean的实例化时机：当Spring核心文件被加载时，实例化配置的Bean实例 

Bean的生命周期： 
- 对象创建：当应用加载，创建容器时，对象就被创建了 
- 对象运行：只要容器在，对象一直活着 
- 对象销毁：当应用卸载，销毁容器时，对象就被销毁了

  

**2）当scope的取值为`prototype`时** 

![prototype](https://gitlab.com/apzs/image/-/raw/master/image/prototype.png)

Bean的实例化个数：多个 

Bean的实例化时机：当调用`getBean()`方法时实例化Bean 
- 对象创建：当使用对象时，创建新的对象实例 
- 对象运行：只要对象在使用中，就一直活着
- 对象销毁：当对象长时间不用时，被 Java 的垃圾回收器回收了

#### 1.3.3 Bean生命周期配置 

init-method：指定类中的初始化方法名称
destroy-method：指定类中销毁方法名称

#### 1.3.4 Bean实例化三种方式

**1）用构造函数实例化**

当通过构造方法创建一个 bean 时，所有普通类都可以被 Spring 使用并与之兼容。也就是说，正在开发的类不需要实现任何特定的接口或以特定的方式进行编码。只需指定 bean 类就足够了。但是，根据您用于该特定 bean 的 IoC 的类型，您可能需要一个默认(空)构造函数。

```xml
<bean id="exampleBean" class="examples.ExampleBean"/>
<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

**如果bean中没有默认无参构造函数，将会创建失败。**

举例：在UserDaoImpl中只写一个有参构造函数。

```java
public class UserDaoImpl implements UserDao {
    private int num;

    public UserDaoImpl(int num) {
        this.num = num;
        System.out.println("创建, num为：" + num);
    }
    
    public void save() {
        System.out.println("save running...");
    }
}
```

在Spring配置文件中，要给出参数

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" scope="singleton">
    <constructor-arg name="num" value="1"/>
</bean>
```

否则会提示没有匹配的构造方法：

![image-20220330124110180](https://gitlab.com/apzs/image/-/raw/master/image/202203301241223.png)



**2）工厂静态方法实例化**

工厂的静态方法返回Bean实例

定义使用静态工厂方法创建的 bean 时，请使用`class`属性来指定包含`static`工厂方法的类，并使用名为`factory-method`的属性来指定工厂方法本身的名称。您应该能够调用此方法(带有可选参数，如稍后所述)并返回一个活动对象，该对象随后将被视为已通过构造函数创建。

以下 bean 定义指定通过调用工厂方法来创建 bean。该定义不指定返回对象的类型(类)，而仅指定包含工厂方法的类。

在此的示例`createInstance()`方法必须是静态方法。

```xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```

与前面的 bean 定义一起使用的类：

```java
public class ClientService { 
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```



**3）工厂实例方法实例化**

工厂的非静态方法返回Bean实例

与通过[静态工厂方法](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/core.html#beans-factory-class-static-factory-method)实例化类似，使用实例工厂方法实例化从容器中调用现有 bean 的非静态方法以创建新 bean。要使用此机制，请将`class`属性留空，并在`factory-bean`属性中，在当前(或父容器或祖先容器)中指定包含要创建该对象的实例方法的 bean 的名称。使用`factory-method`属性设置工厂方法本身的名称。

```xml
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
```

相应的Java类

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```

#### 1.3.5 Bean的依赖注入

创建 UserService，我们希望UserService 在内部调用 UserDao的`save()` 方法。

**Bean的依赖注入分析**

假如不进行依赖注入，在UserServiceImpl中需要通过getBean获得UserDao实例，测试程序要使用UserService时，也需要通过getBean获得UserService实例

![image-20220330125157168](https://gitlab.com/apzs/image/-/raw/master/image/202203301251229.png)

因为UserService和UserDao都在Spring容器中，而最终程序直接使用的是UserService，所以可以在 Spring容器中，将UserDao设置到UserService内部。

![image-20220318161654296](https://gitlab.com/apzs/image/-/raw/master/image/202203181616347.png)



**Bean的依赖注入概念**

依赖注入（==Dependency Injection==）：它是 Spring 框架核心 IOC 的具体实现。 

在编写程序时，通过控制反转，把对象的创建交给了 Spring，但是代码中不可能出现没有依赖的情况。 IOC 解耦只是降低他们的依赖关系，但不会消除。例如：业务层仍会调用持久层的方法。那这种业务层和持久层的依赖关系，在使用 Spring 之后，就让 Spring 来维护了。

简单的说，就是坐等框架把持久层对象传入业务层，而不用我们自己去获取。



**Bean的依赖注入方式**

- **构造方法**

  创建有参构造

  ```java
  public class UserServiceImpl implements UserService {
      private UserDao userDao;
  
      public UserServiceImpl(UserDao userDao) {
          this.userDao = userDao;
      }
  
      public void save() {
          userDao.save();
      }
  }
  ```
	配置Spring容器调用有参构造时进行注入
  ```xml
  <bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
      <constructor-arg name="userDao" ref="userDao"></constructor-arg>
  </bean>
  ```

  

- **set方法**

  在UserServiceImpl中添加setUserDao方法 

  ```java
  public class UserServiceImpl implements UserService {
      private UserDao userDao;
  
      public void setUserDao(UserDao userDao) {
          this.userDao = userDao;
      }
  
      @Override
      public void save() {
          userDao.save();
      }
  }
  ```

  配置Spring容器调用set方法进行注入

  ```xml
  <bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"/> 
  
  <bean id="userService" class="com.itheima.service.impl.UserServiceImpl"> 
      <property name="userDao" ref="userDao"/>
  </bean>
  ```

  P命名空间注入本质也是set方法注入，但比起上述的set方法注入更加方便，主要体现在配置文件中，如下： 

  首先，需要引入P命名空间：`xmlns:p="http://www.springframework.org/schema/p"` 

  其次，需要修改注入方式

  ```xml
  <bean id="userService" class="com.itheima.service.impl.UserServiceImpl" p:userDao-ref="userDao"/>
  ```


**Bean的依赖注入的数据类型**

除了对象的引用可以注入，普通数据类型，集合等都可以在容器中进行注入。

注入数据的三种数据类型 

- 普通数据类型 
- 引用数据类型
- 集合数据类型

##### 普通数据类型和集合数据类型的注入

**1）直值(Primitives，字符串等)**

举例：

```java
public class UserDaoImpl implements UserDao {
    private String company;
    private int age;
    // ...
}
```

配置：

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"> 
    <property name="company" value="传智播客"></property> 
    <property name="age" value="15"></property>
</bean>
```

**2）Collections**

`<list/>`，`<set/>`，`<map/>`和`<props/>`元素分别设置 Java `Collection`类型`List`，`Set`，`Map`和`Properties`的属性和参数。

注入List举例：

```java
public class UserDaoImpl implements UserDao {
    private List<String> strList;
    // ...
}
```

配置：

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"> 
    <property name="strList"> 
        <list> 
            <value>aaa</value> 
            <value>bbb</value> 
            <value>ccc</value>
		</list> 
    </property>
</bean>
```

如果要注入的是一个对象的集合呢？使用`<ref bean="xxx" />`

比如一个`List<User>`的注入

```xml
<bean id="u1" class="com.itheima.domain.User"/>
<bean id="u2" class="com.itheima.domain.User"/>
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <property name="userList">
        <list>
            <bean class="com.itheima.domain.User"/>
            <bean class="com.itheima.domain.User"/>
            <ref bean="u1"/>
            <ref bean="u2"/>
        </list>
    </property>
</bean>
```

打印输出：

```
[com.itheima.domain.User@3c130745, com.itheima.domain.User@cd3fee8, com.itheima.domain.User@3e2e18f2, com.itheima.domain.User@470f1802]
```

> 通过`<ref/>`标签的`bean`属性指定目标 bean 是最通用的形式，并且允许创建对同一容器或父容器中任何 bean 的引用，而不管它是否在同一 XML 文件中。 `bean`属性的值可以与目标 Bean 的`id`属性相同，也可以与目标 Bean 的`name`属性中的值之一相同。

Map, Set, Properties注入如下：

```xml
<bean id="moreComplexObject" class="example.ComplexObject">
    <!-- results in a setAdminEmails(java.util.Properties) call -->
    <property name="adminEmails">
        <props>
            <prop key="administrator">[emailprotected]</prop>
            <prop key="support">[emailprotected]</prop>
            <prop key="development">[emailprotected]</prop>
        </props>
    </property>
    <!-- results in a setSomeMap(java.util.Map) call -->
    <property name="someMap">
        <map>
            <entry key="an entry" value="just some string"/>
            <entry key ="a ref" value-ref="myDataSource"/>
        </map>
    </property>
    <!-- results in a setSomeSet(java.util.Set) call -->
    <property name="someSet">
        <set>
            <value>just some string</value>
            <ref bean="myDataSource" />
        </set>
    </property>
</bean>
```

#### 1.3.6 引入其他配置文件（分模块开发） 

实际开发中，Spring的配置内容非常多，这就导致Spring配置很繁杂且体积很大，所以，可以将部分配置拆解到其他配置文件中，而在Spring主配置文件通过import标签进行加载`<import resource="applicationContext-xxx.xml"/>`

**总结Spring重点配置：**

```xml
<bean>标签 
	id属性:在容器中Bean实例的唯一标识，不允许重复 
	class属性:要实例化的Bean的全限定名 
	scope属性:Bean的作用范围，常用是singleton(默认)和prototype 
	<property>标签：属性注入 
		name属性：属性名称 
		value属性：注入的普通属性值 
		ref属性：注入的对象引用值 
		<list>标签 
         <map>标签
		<properties>标签 
	<constructor-arg>标签
<import>标签:导入其他的Spring的分文件
```

### 1.4. Spring相关API

**ApplicationContext的继承体系** 

applicationContext：接口类型，代表应用上下文，可以通过其实例获得 Spring 容器中的 Bean 对象

**ApplicationContext的实现类**

1）`ClassPathXmlApplicationContext`
	从类的根路径下加载配置文件 推荐使用这种
2）`FileSystemXmlApplicationContext`
	从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置。
3）`AnnotationConfigApplicationContext`
	当使用注解配置容器对象时，需要使用此类来创建 Spring 容器。它用来读取注解。

`getBean()`方法使用

```java
public Object getBean(String name) throws BeansException { 
	assertBeanFactoryActive(); 
    return getBeanFactory().getBean(name);
}
public <T> T getBean(Class<T> requiredType) throws BeansException { 
    assertBeanFactoryActive(); 
    return getBeanFactory().getBean(requiredType);
}
```

其中，当参数的数据类型是字符串时，表示根据Bean的id从容器中获得Bean实例，返回是Object，需要强转。 

当参数的数据类型是Class类型时，表示根据类型从容器中匹配Bean实例，当容器中相同类型的Bean有多个时，则此方法会报错。

**Spring的重点API:**

```java
ApplicationContext app = new ClasspathXmlApplicationContext("xml文件") 
app.getBean("id")
app.getBean(xxx.class)
```

> **参考资料：**
>
> \[1] [我们到底为什么要用 IoC 和 AOP](https://www.cnblogs.com/RudeCrab/p/14365296.html#ioc)
>
> \[2] [IoC原理 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1252599548343744/1282381977747489)
>
> \[3] [Spring IoC有什么好处呢？ - Mingqi的回答 - 知乎](https://www.zhihu.com/question/23277575/answer/169698662)

IoC全称Inversion of Control，直译为控制反转，是指对象的创建和配置的控制权从调用方转移给容器。

![](https://gitlab.com/apzs/image/-/raw/master/image/v2-ee924f8693cff51785ad6637ac5b21c1_720w.jpg?source=1940ef5c)

### 1.5. 依赖倒置原则

**依赖倒置原则**——把原本的高层建筑依赖底层建筑“倒置”过来，变成底层建筑依赖高层建筑。高层建筑决定需要什么，底层去实现这样的需求，但是高层并不用管底层是怎么实现的。

先举一个现实生活中的例子。

假设设计一辆汽车：先设计轮子，然后根据轮子大小设计底盘，接着根据底盘设计车身，最后根据车身设计好整个汽车。这里就出现了一个“依赖”关系：汽车依赖车身，车身依赖底盘，底盘依赖轮子。

![](https://gitlab.com/apzs/image/-/raw/master/image/v2-c68248bb5d9b4d64d22600571e996446_720w.jpg?source=1940ef5c)

这样的设计维护性很低。假设设计完工之后，根据市场需求的变动，把车子的轮子设计都改大一码。因为我们是根据轮子的尺寸设计的底盘，轮子的尺寸一改，底盘的设计就得修改；同样因为我们是根据底盘设计的车身，那么车身也得改，同理汽车设计也得改——整个设计几乎都得改！

换一种思路。我们先设计汽车的大概样子，然后根据汽车的样子来设计车身，根据车身来设计底盘，最后根据底盘来设计轮子。这时候，依赖关系就倒置过来了：轮子依赖底盘， 底盘依赖车身， 车身依赖汽车。

![](https://gitlab.com/apzs/image/-/raw/master/image/202203301517271.png)

这时候，上司再说要改动轮子的设计，我们就只需要改动轮子的设计，而不需要动底盘，车身，汽车的设计了。

### 1.6. 传统的三层架构

回到代码中，三层架构是经典的开发模式，我们一般将视图控制、业务逻辑和数据库操作分别抽离出来单独形成一个类，这样各个职责就非常清晰且易于复用和维护。

大致代码如下：

**Controller**

```java
@WebServlet("/user")
public class UserServlet extends HttpServlet {
    // 用于执行业务逻辑的对象
    private UserService userService = new UserServiceImpl();
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // ...省略其他代码
            
        // 执行业务逻辑
        userService.doService();
        
        // ...返回页面视图
    }
}
```

**Service**

```java
public class UserServiceImpl implements UserService{
    // 用于操作数据库的对象
    private UserDao userDao = new UserDaoImpl();
    
    @Override
    public void doService() {
        // ...省略业务逻辑代码
            
        // 执行数据库操作
        userDao.doUpdate();
        
        // ...省略业务逻辑代码
    }
}
```

**DAO**

```java
public class UserDaoImpl implements UserDao{
    @Override
    public void doUpdate() {
        // ...省略JDBC代码
    }
}
```

上层依赖下层的抽象，代码就分为了三层：

![](https://gitlab.com/apzs/image/-/raw/master/image/1496775-20210203092605506-381644319.jpg)

一个 DAO 对象往往会被多个 Service 对象使用，一个 Service 对象往往也会被多个 Controller 对象使用。

然而目前的代码有一个比较大的问题，那就是只做到了**逻辑复用**，并没有做到**资源复用**。上层调用下一层时，必然会持有下一层的对象引用，即成员变量。目前我们每一个成员变量都会实例化一个对象，如下图所示：

![](https://gitlab.com/apzs/image/-/raw/master/image/1496775-20210203092605740-460644962.jpg)

每一个链路都创建了同样的对象，造成了极大的资源浪费。本应多个 Controller 复用同一个 Service，多个 Service 复用同一个 DAO。现在变成了一个 Controller创建多个重复的 Service，多个 Service 又创建了多个重复的 DAO，从倒三角变成了正三角。许多组件只需要实例化一个对象就够了，创建多个没有任何意义。

除了资源浪费的问题之外，目前代码还有一个致命缺陷，那就是**变化的代价太大**。

假设有 10 个 Controller 依赖了 UserService，最开始实例化的是 `UserServiceImpl`，后面需要换一个实现类 `OtherUserServiceImpl`，我就得逐个修改那 10 个 Controller，非常麻烦。

其次，如果组件创建过程复杂，比如 DAO 对象要依赖一个这样的数据源组件：

```java
public class UserDaoImpl implements UserDao{
    private MyDataSource dataSource;

    public UserDaoImpl() {
        // 构造数据源
        dataSource = new MyDataSource("jdbc:mysql://localhost:3306/test", "root", "password");
        // 进行一些其他配置
        dataSource.setInitiaSize(10);
        dataSource.setMaxActive(100);
        // ...省略更多配置项
    }
}
```

该数据源组件要想真正生效需要对其进行许多配置，这个创建和配置过程是非常麻烦的。而且配置可能会随着业务需求的变化经常更改，这时候你就需要修改每一个依赖该组件的地方，牵一发而动全身。

**总结弊端：**

- 创建了许多重复对象，造成大量资源浪费；
- 更换实现类需要改动多个地方；
- 创建和配置组件工作繁杂，给组件调用方带来极大不便。

### 1.7. IoC

如果一个系统有大量的组件，其生命周期和相互之间的依赖关系如果由组件自身来维护，不但大大增加了系统的复杂度，而且会导致组件之间极为紧密的耦合，继而给测试和维护带来了极大的困难。

因此，核心问题是：

1. 谁负责创建组件？
2. 谁负责根据依赖关系组装组件？
3. 销毁时，如何按依赖顺序正确销毁？

换句话说，如果我们编码时，有一个「东西」能帮助我们创建和配置好那些组件，我们只负责调用该多好。

这个「东西」就是IoC容器。

有了 IoC 容器，我们可以将对象交由容器管理，交由容器管理后的对象称之为 Bean。调用方不再负责组件的创建，要使用组件时直接获取 Bean 即可。调用方只需按照约定声明依赖项，所需要的 Bean 就自动配置完毕了，就好像在调用方外部注入了一个依赖项给其使用，所以这种方式称之为 **依赖注入（Dependency Injection，缩写为 DI）**。

对象交由容器管理后，默认是单例的，这就解决了资源浪费问题。

若要更换实现类，只需更改 Bean 的声明配置，即可达到无感知更换：

```java
// 原本的实现类
public class UserServiceImpl implements UserService{
    ...
}

// 将该实现类声明为 Bean
@Component
public class OtherUserServiceImpl implements UserService{
    ...
}
```

共享一个组件也非常简单。

### 1.8. 依赖注入

在IoC模式下，控制权发生了反转，即从应用程序转移到了IoC容器，所有组件不再由应用程序自己创建和配置，而是由IoC容器负责，这样，应用程序只需要直接使用已经创建好并且配置好的组件。为了能让组件在IoC容器中被“装配”出来，需要某种“注入”机制。

#### 1.8.1 依赖注入的原理



**所谓依赖注入，就是把底层类作为参数传入上层类，实现上层类对下层类的“控制**”。

以#1中的车辆设计为例，我们要如何实现基于依赖倒置的设计呢？

用**构造方法传递的依赖注入方式**重新写车类的定义：

![preview](https://gitlab.com/apzs/image/-/raw/master/image/202203301555354.jpeg)

自底向上的创建对象，每一层中都不会创建对象，而是将底层对象作为构造器参数。即：

![](https://gitlab.com/apzs/image/-/raw/master/image/202203301558443.jpeg)

在这个例子中，**控制反转容器(IoC Container)**如何发挥作用呢？

![](https://gitlab.com/apzs/image/-/raw/master/image/v2-c845802f9187953ed576e0555f76da42_720w.jpg?source=1940ef5c)

因为采用了依赖注入，在车类初始化的过程中就不可避免的会写大量的new。这里IoC容器就解决了这个问题。**这个容器可以自动对你的代码进行初始化，你只需要维护一个Configuration（可以是xml可以是一段代码），而不用每次初始化一辆车都要亲手去写那一大段初始化的代码**。这是引入IoC Container的第一个好处。

IoC Container在进行这个工作的时候是反过来的，它先从最上层开始往下找依赖关系，到达最底层之后再往上一步一步new。

![](https://gitlab.com/apzs/image/-/raw/master/image/v2-24a96669241e81439c636e83976ba152_720w.jpg?source=1940ef5c)

这里IoC Container可以直接隐藏具体的创建实例的细节，在我们来看它就像一个工厂：

![](https://gitlab.com/apzs/image/-/raw/master/image/v2-5ca61395f37cef73c7bbe7808f9ea219_720w.jpg?source=1940ef5c)

IoC Container的第二个好处是：**我们在创建实例的时候不需要了解其中的细节。**

#### 1.8.2 Spring中的依赖注入方式

Spring的IoC容器同时支持属性注入和构造方法注入，并允许混合使用。

这里不再展开。

### 1.9. 无侵入容器

在设计上，Spring的IoC容器是一个高度可扩展的**无侵入容器**。

所谓无侵入，是指应用程序的组件无需实现Spring的特定接口，或者说，组件根本不知道自己在Spring的容器中运行。

这种无侵入的设计有以下好处：

1. 应用程序组件既可以在Spring的IoC容器中运行，也可以自己编写代码自行组装配置；
2. 测试的时候并不依赖Spring容器，可单独进行测试，大大提高了开发效率。

## 2.IoC和DI注解开发
### 2.1. Spring配置数据源

**数据源（连接池）的作用**

- 是数据源（连接池）是提高程序性能出现的
- 实现实例化数据源，初始化部分连接资源
- 使用连接资源时从数据源中获取
- 使用完毕后将连接资源归还给数据源

常见的数据源（连接池）：DBCP、C3P0、BoneCP、Druid等

**数据源的开发步骤**

1、导入数据源的坐标和数据库驱动坐标

2、创建数据源对象

3、设置数据源的基本连接数据

4、使用数据源获取连接资源和归还连接资源

#### 2.1.2 数据源的手动创建

1）在 pom.xml 中导入mysql数据库驱动坐标

2）在 pom.xml 中导入C3P0和Druid的坐标

```xml
<!-- mysql驱动，注意和安装的mysql版本对应 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
</dependency>
<!-- C3P0连接池 -->
<dependency>
    <groupId>c3p0</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.1.2</version>
</dependency>
<!-- 连接池 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.10</version>
</dependency>
```



3）创建C3P0连接池和Druid连接池

```java
String url = "jdbc:mysql://localhost:3306/test?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&autoReconnect=true&useSSL=false"
@Test
//测试手动创建 c3p0 数据源
public void test1() throws Exception {
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");
    dataSource.setJdbcUrl(url);
    dataSource.setUser("root");
    dataSource.setPassword("root");
    Connection connection = dataSource.getConnection();
    System.out.println(connection);
    connection.close();
}

@Test
//测试手动创建 druid 数据源
public void test2() throws Exception {
    DruidDataSource dataSource = new DruidDataSource();
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    dataSource.setUrl(url);
    dataSource.setUsername("root");
    dataSource.setPassword("root");
    DruidPooledConnection connection = dataSource.getConnection();
    System.out.println(connection);
    connection.close();
}
```

4）提取jdbc.properties配置文件

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8&autoReconnect=true&useSSL=false
jdbc.username=root
jdbc.password=root
```

5）读取jdbc.properties配置文件创建连接池

```java
@Test
//测试手动创建 c3p0 数据源(加载properties配置文件)
public void test3() throws Exception {
    //读取配置文件
    ResourceBundle rb = ResourceBundle.getBundle("jdbc");
    String driver = rb.getString("jdbc.driver");
    String url = rb.getString("jdbc.url");
    String username = rb.getString("jdbc.username");
    String password = rb.getString("jdbc.password");
    //创建数据源对象  设置连接参数
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass(driver);
    dataSource.setJdbcUrl(url);
    dataSource.setUser(username);
    dataSource.setPassword(password);

    Connection connection = dataSource.getConnection();
    System.out.println(connection);
    connection.close();
}
```



#### 2.1.3 Spring配置数据源

```java
@Test
//测试Spring容器产生数据源对象
public void test4() throws Exception {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        DataSource dataSource = app.getBean(DataSource.class);
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
        connection.close();
}
```

在`applicationContext.xml`中配置

name对应set方法

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.cj.jdbc.Driver"></property>
    <property name="jdbcUrl" value="太长省略"></property>
    <property name="user" value="root"></property>
    <property name="password" value="root"></property>
</bean>
```



#### 2.1.4 抽取jdbc配置文件

applicationContext.xml加载jdbc.properties配置文件获得连接信息。 

首先，需要引入context命名空间和约束路径： 

- 命名空间：`xmlns:context="http://www.springframework.org/schema/context"`

- 约束路径：http://www.springframework.org/schema/context
  				 http://www.springframework.org/schema/context/spring-context.xsd

**Spring容器加载properties文件**

```xml
<!--加载外部的properties文件-->
<context:property-placeholder location="classpath:jdbc.properties"/>
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"></property>
    <property name="jdbcUrl" value="${jdbc.url}"></property>
    <property name="user" value="${jdbc.username}"></property>
    <property name="password" value="${jdbc.password}"></property>
</bean>
```

### 2.2. Spring注解开发

#### 2.2.1 Spring原始注解

Spring是轻代码而重配置的框架，配置比较繁重，影响开发效率，所以注解开发是一种趋势，注解代替xml配置文件可以简化配置，提高开发效率。

Spring原始注解主要是替代`<Bean>`的配置

| 注解             | 说明                                             |
| ---------------- | ------------------------------------------------ |
| `@Component`     | 使用在类上用于实例化Bean                         |
| `@Controller`    | 使用在web层类上用于实例化Bean                    |
| `@Service`       | 使用在service层类上用于实例化Bean                |
| `@Repository`    | 使用在dao层类上用于实例化Bean                    |
| `@Autowired`     | 使用在字段上用于根据类型依赖主入                 |
| `@Qualifier`     | 结合`@Autowired`一起使用用于根据名称进行依赖注入 |
| `@Resource`      | 相当于@Autowired+@Qualifier，按照名称进行注入    |
| `@Value`         | 注入普通属性                                     |
| `@Scope`         | 标注Bean的作用范围                               |
| `@PostConstruct` | 使用在方法上标注该方法是Bean的初始化方法         |
| `@PreDestroy`    | 使用在方法上标注该方法是Bean的销毁方法           |

==**注意：**== 

使用注解进行开发时，需要在applicationContext.xml中配置组件扫描，作用是指定哪个包及其子包下的Bean需要进行扫描以便识别使用注解配置的类、字段和方法。

```xml
<!--配置组件扫描-->
<context:component-scan base-package="com.itheima"/>
```



**使用@Compont或@Repository标识UserDaoImpl需要Spring进行实例化**

原本在配置文件中：

```xml
//<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"></bean>
```

使用注解：

```java
//@Component("userDao")
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    public void save() {
        System.out.println("save running...");
    }
}
```



使用@Compont或@Service标识UserServiceImpl需要Spring进行实例化 

```xml
<bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
```

使用@Autowired或者@Autowired+@Qulifier或者@Resource进行userDao的注入

```xml
<property name="userDao" ref="userDao"></property>
```

使用注解：

```java
//@Component("userService")
@Service("userService")
public class UserServiceImpl implements UserService {

    //@Autowired //按照数据类型从Spring容器中进行匹配的
    //@Qualifier("userDao")  //是按照id值从容器中进行匹配的 但是主要此处@Qualifier结合@Autowired一起使用
    @Resource(name="userDao") //@Resource相当于@Qualifier+@Autowired
    private UserDao userDao;

    public void save() {
        userDao.save();
    }
```

使用@Value进行字符串的注入

使用@Scope标注Bean的范围

使用@PostConstruct标注初始化方法，使用@PreDestroy标注销毁方法

```java
@Service("userService")
@Scope("singleton")
public class UserServiceImpl implements UserService {
    @Value("注入普通数据") 
    private String str;
    @Value("${jdbc.driver}")
    private String driver;

    @Resource(name = "userDao") //@Resource相当于@Qualifier+@Autowired
    private UserDao userDao;

    public void save() {
        System.out.println(str);
        System.out.println(driver);
        userDao.save();
    }

    @PostConstruct
    public void init() {
        System.out.println("Service对象的初始化方法");
    }

    @PreDestroy
    public void destory() {
        System.out.println("Service对象的销毁方法");
    }
}
```



使用上面的注解还不能全部替代xml配置文件，还需要使用注解替代的配置如下： 

- 非自定义的Bean的配置：`<bean>` 
- 加载properties文件的配置：`<context:property-placeholder>`
- 组件扫描的配置：`<context:component-scan>`
- 引入其它文件：`<import>`



#### 2.2.2 Spring新注解

| 注解              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| `@Configuration`  | 用于指定当前类是一个 Spring 配置类，当创建容器时会从该类上加载注解 |
| `@ComponentScan`  | 用于指定 Spring 在初始化容器时要扫描的包。                                                                                                               作用和在 Spring 的 xml 配置文件中的`<context:component-scan base-package="com.itheima"/>`一样 |
| `@Bean`           | 使用在方法上，标注将该方法的返回值存储到 Spring 容器中       |
| `@PropertySource` | 用于加载 .properties 文件中的配置                            |
| `@Import`         | 用于导入其他配置类                                           |



对应配置文件：

```xml
<context:component-scan base-package="com.itheima"/>
<import resource=""/>
```



```java
//标志该类是Spring的核心配置类
@Configuration
@ComponentScan("com.itheima")
@Import({DataSourceConfiguration.class})
public class SpringCofiguration {
    
}
```

DataSourceConfiguration.java

```java
//<context:property-placeholder location="classpath:jdbc.properties"/>
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfiguration {

    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean("dataSource")  //Spring会将当前方法的返回值以指定名称存储到Spring容器中
    public DataSource getDataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```



测试加载核心配置类创建Spring容器

```java
@Test
public void testAnnoConfiguration() throws Exception {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringCofiguration.class);
    UserService userService = (UserService) applicationContext.getBean("userService");
    userService.save();
    DataSource dataSource = (DataSource) applicationContext.getBean("dataSource");
    Connection connection = dataSource.getConnection();
    System.out.println(connection);
}
```



### 2.3. Spring整合Junit

**原始Junit测试Spring的问题** 

在测试类中，每个测试方法都有以下两行代码：

```java
ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml"); 
IAccountService as = ac.getBean("accountService",IAccountService.class);
```

这两行代码的作用是获取容器，如果不写的话，直接会提示空指针异常。所以又不能轻易删掉。



**上述问题解决思路** 

• 让 SpringJunit 负责创建 Spring容器，但是需要将配置文件的名称告诉它
• 将需要进行测试 Bean 直接在测试类中进行注入



**Spring集成Junit步骤**

① 导入spring集成Junit的坐标（spring5 及以上版本要求 junit 的版本必须是 4.12 及以上）
② 使用 `@Runwith` 注解替换原来的运行期 
③ 使用 `@ContextConfiguration` 指定配置文件或配置类 
④ 使用 `@Autowired` 注入需要测试的对象
⑤ 创建测试方法进行测试



```java
@RunWith(SpringJUnit4ClassRunner.class)
// 加载spring核心配置文件
// @ContextConfiguration(value = {"classpath:applicationContext.xml"})
// 加载spring核心配置类
@ContextConfiguration(classes = {SpringCofiguration.class})
//@ContextConfiguration("classpath:applicationContext.xml")
public class SpringJunitTest {

    @Autowired
    private UserService userService;

    @Autowired
    private DataSource dataSource;

    @Test
    public void test1() throws SQLException {
        userService.save();
        System.out.println(dataSource.getConnection());
    }
}
```

## 3.SpringMVC入门
> **环境配置：**
>
> [IntelliJ IDEA创建maven web项目（IDEA新手适用）](https://blog.csdn.net/czc9309/article/details/80304074)
>
> [解决Idea创建maven-archetype-webapp项目无java目录的问题](https://www.cnblogs.com/hafiz/p/5854693.html)

### 3.1.Spring与Web环境集成

**ApplicationContext应用上下文获取方式**

应用上下文对象是通过`new ClasspathXmlApplicationContext(spring配置文件)` 方式获取的，但是每次从容器中获得Bean时都要编写`new ClasspathXmlApplicationContext(spring配置文件)` ，这样的弊端是配置文件加载多次，应用上下文对象创建多次。

在Web项目中，可以使用ServletContextListener监听Web应用的启动，我们可以在Web应用启动时，就加载Spring的配置文件，创建应用上下文对象ApplicationContext，再将其存储到最大的域servletContext域中，这样就可以在任意位置从域中获得应用上下文ApplicationContext对象了。



**Spring提供获取应用上下文的工具** 

上面的分析不用手动实现（视频教程 P37 - P40）

Spring提供了一个监听器`ContextLoaderListener`就是对上述功能的封装，该监听器内部加载Spring配置文件，创建应用上下文对象，并存储到`ServletContext`域中，提供了一个客户端工具`WebApplicationContextUtils`供使用者获得应用上下文对象。

所以我们需要做的只有两件事： 
- 在`web.xml`中配置`ContextLoaderListener`监听器（导入spring-web坐标）
- 使用`WebApplicationContextUtils`获得应用上下文对象`ApplicationContext`



**导入Spring集成web的坐标**

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```



**配置ContextLoaderListener监听器**

```xml
<!--全局初始化参数-->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>
<!--配置监听器-->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

contextConfigLocation的初始化对于listener的配置是必须的！



**通过工具获得应用上下文对象**

```java
import org.springframework.web.context.support.WebApplicationContextUtils;
ApplicationContext app = WebApplicationContextUtils.getWebApplicationContext(servletContext);
UserService userService = app.getBean(UserService.class);
```



### 3.2. SpringMVC简介

**SpringMVC概述**

SpringMVC 是一种基于 Java 的实现MVC 设计模型的请求驱动类型的轻量级 Web 框架，属于 SpringFrameWork 的后续产品，已经融合在 Spring Web Flow 中。

SpringMVC 已经成为目前最主流的MVC框架之一，并且随着Spring3.0 的发布，全面超越 Struts2，成为最优 秀的MVC 框架。它通过一套注解，让一个简单的 Java 类成为处理请求的控制器，而无须实现任何接口。同时它还支持 RESTful 编程风格的请求。



**简单的MVC模型**

我们把`UserServlet`看作业务逻辑处理，把`User`看作模型，把`user.jsp`看作渲染，这种设计模式通常被称为MVC：Model-View-Controller，即`UserServlet`作为控制器（Controller），`User`作为模型（Model），`user.jsp`作为视图（View），整个MVC架构如下：

```ascii
                   ┌───────────────────────┐
             ┌────>│Controller: UserServlet│
             │     └───────────────────────┘
             │                 │
┌───────┐    │           ┌─────┴─────┐
│Browser│────┘           │Model: User│
│       │<───┐           └─────┬─────┘
└───────┘    │                 │
             │                 ▼
             │     ┌───────────────────────┐
             └─────│    View: user.jsp     │
                   └───────────────────────┘
```

使用MVC模式的好处是，Controller专注于业务处理，它的处理结果就是Model。Model可以是一个JavaBean，也可以是一个包含多个对象的Map，Controller只负责把Model传递给View，View只负责把Model给“渲染”出来。



**SpringMVC快速入门**

需求：客户端发起请求，服务器端接收请求，执行逻辑并进行视图跳转。

![](https://gitlab.com/apzs/image/-/raw/master/image/202203220916898.png) 



开发步骤： 

**1、在 pom.xml 导入SpringMVC相关坐标** 

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

**2、在web.xml 配置SpringMVC核心控制器DispathcerServlet** 

```xml
<servlet>
    <servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

**3、创建Controller类和视图页面，使用注解配置Controller类中业务方法的映射地址** 

```java
@Controller 
public class QuickController { 
    @RequestMapping("/quick") 
    public String quickMethod(){ 
        System.out.println("quickMethod running....."); 
        return "success.jsp";
	}
}
```

success.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>Success!</h1>
</body>
</html>
```

附：IDEA tomcat 设置虚拟目录

![image-20220322091024009](https://gitlab.com/apzs/image/-/raw/master/image/202203220910080.png)

**5、配置SpringMVC核心文件 spring-mvc.xml**

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context" xmlns:mvc="http://www.alibaba.com/schema/stat"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.alibaba.com/schema/stat http://www.alibaba.com/schema/stat.xsd">

    <!--Controller的组件扫描-->
    <context:component-scan base-package="com.itheima.controller"/>
</beans>
```



**6、客户端发起请求测试**

访问测试地址：http://localhost:8080/quick



Spring访问流程（代码角度）

![02-Spring访问流程（代码角度）](https://gitlab.com/apzs/image/-/raw/master/image/202203220915209.png)

SpringMVC流程图示

![](https://gitlab.com/apzs/image/-/raw/master/image/202203220918939.png)

### 3.3. SpringMVC组件解析

#### 3.3.1 SpringMVC的执行流程

![image-20220322092531826](https://gitlab.com/apzs/image/-/raw/master/image/202203220925903.png)

1）用户发送请求至前端控制器DispatcherServlet。 

2）DispatcherServlet收到请求调用HandlerMapping处理器映射器。 

3）处理器映射器找到具体的处理器(可以根据xml配置、注解进行查找)，生成处理器对象及处理器拦截器(如果 有则生成)一并返回给DispatcherServlet。

4）DispatcherServlet调用HandlerAdapter处理器适配器。 

5）HandlerAdapter经过适配调用具体的处理器(Controller，也叫后端控制器)。 

6）Controller执行完成返回ModelAndView。 

7）HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet。

8）DispatcherServlet将ModelAndView传给ViewReslover视图解析器。

9）ViewReslover解析后返回具体View。

10）DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）。DispatcherServlet响应用户。



#### 3.3.2 SpringMVC组件解析

**前端控制器：DispatcherServlet** 

用户请求到达前端控制器，它就相当于 MVC 模式中的 C，DispatcherServlet 是整个流程控制的中心，由它调用其它组件处理用户的请求，DispatcherServlet 的存在降低了组件之间的耦合性。

**处理器映射器：HandlerMapping** 

HandlerMapping负责根据用户请求找到Handler 即处理器，SpringMVC 提供了不同的映射器实现不同的映射方式，例如：配置文件方式，实现接口方式，注解方式等。

**处理器适配器：HandlerAdapter** 

通过 HandlerAdapter对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行。

**处理器：Handler** 

它就是我们开发中要编写的具体业务控制器。由 DispatcherServlet 把用户请求转发到 Handler。由 Handler 对具体的用户请求进行处理。

**视图解析器：View Resolver** 

View Resolver 负责将处理结果生成 View 视图，View Resolver 首先根据逻辑视图名解析成物理视图名，即具体的页面地址，再生成 View 视图对象，最后对 View 进行渲染将处理结果通过页面展示给用户。

**视图：View** 

SpringMVC 框架提供了很多的 View 视图类型的支持，包括：jstlView、freemarkerView、pdfView等。最常用的视图就是 jsp。一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面。

#### 3.3.3 SpringMVC注解解析

`@RequestMapping`

作用：用于建立请求 URL 和处理请求方法之间的对应关系 

位置： 

- 类上，请求URL 的第一级访问目录。此处不写的话，就相当于应用的根目录 
  
- 方法上，请求 URL 的第二级访问目录，与类上的使用`@ReqquestMapping`标注的一级目录一起组成访问虚拟路径

属性： 

- value：用于指定请求的URL。它和path属性的作用是一样的 

- method：用于指定请求的方式 

- params：用于指定限制请求参数的条件。它支持简单的表达式。要求请求参数的key和value必须和配置的一模一样

  例如： 
  -- `params = {"accountName"}`，表示请求参数必须有accountName
  -- `params = {"moeny!100"}`，表示请求参数中money不能是100



**mvc命名空间引入**

命名空间：`xmlns:context="http://www.springframework.org/schema/context" `
		 	    `xmlns:mvc="http://www.springframework.org/schema/mvc"`
约束地址：`http://www.springframework.org/schema/context `
		         `http://www.springframework.org/schema/context/spring-context.xsd `
                 `http://www.springframework.org/schema/mvc`
                 `http://www.springframework.org/schema/mvc/spring-mvc.xsd`

**组件扫描** 

SpringMVC基于Spring容器，所以在进行SpringMVC操作时，需要将Controller存储到Spring容器中，如果使用`@Controller`注解标注的话，就需要使用`<context:component-scan base-package=“com.itheima.controller"/>`进行组件扫描。



#### 3.3.4 SpringMVC的XML配置解析

**视图解析器** 

SpringMVC有默认组件配置，默认组件都是`DispatcherServlet.properties`配置文件中配置的，该配置文件地址 org/springframework/web/servlet/DispatcherServlet.properties，该文件中配置了默认的视图解析器，如下：

```java
org.springframework.web.servlet.ViewResolver=org.springframework.web.servlet.view.InternalResourceViewResolver
```

翻看该解析器源码，可以看到该解析器的默认设置，如下：

```java
REDIRECT_URL_PREFIX = "redirect:"  --重定向前缀
FORWARD_URL_PREFIX = "forward:"    --转发前缀（默认值）
prefix = ""; 	--视图名称前缀
suffix = "";	--视图名称后缀
```

可以通过属性注入的方式修改视图的的前后缀

```xml
<!--配置内部资源视图解析器--> 
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"> 
    <property name="prefix" value="/WEB-INF/views/"></property> 
    <property name="suffix" value=".jsp"></property>
</bean>
```
**参考资料:**

https://www.w3school.com.cn/xml/xml_namespaces.asp

https://www.runoob.com/schema/schema-intro.html

https://developer.aliyun.com/article/40353

### 3.4. XML 命名空间（XML Namespaces）

**XML 命名空间提供避免元素命名冲突的方法。**

#### 命名冲突

在 XML 中，元素名称是由开发者定义的，当两个不同的文档使用相同的元素名时，就会发生命名冲突。

#### 使用前缀来避免命名冲突

此文档带有某个表格中的信息：

```xml
<h:table>
   <h:tr>
   <h:td>Apples</h:td>
   <h:td>Bananas</h:td>
   </h:tr>
</h:table>
```

此 XML 文档携带着有关一件家具的信息：

```xml
<f:table>
   <f:name>African Coffee Table</f:name>
   <f:width>80</f:width>
   <f:length>120</f:length>
</f:table>
```

现在，命名冲突不存在了，这是由于两个文档都使用了不同的名称来命名它们的 `<table> `元素 (<h:table> 和 <f:table>)。

通过使用前缀，我们创建了两种不同类型的 `<table> `元素。

#### 使用命名空间（Namespaces）

这个 XML 文档携带着某个表格中的信息：

```xml
<h:table xmlns:h="http://www.w3.org/TR/html4/">
   <h:tr>
   <h:td>Apples</h:td>
   <h:td>Bananas</h:td>
   </h:tr>
</h:table>
```

此 XML 文档携带着有关一件家具的信息：

```xml
<f:table xmlns:f="http://www.w3school.com.cn/furniture">
   <f:name>African Coffee Table</f:name>
   <f:width>80</f:width>
   <f:length>120</f:length>
</f:table>
```

与仅仅使用前缀不同，我们为 `<table> `标签添加了一个 xmlns 属性，这样就为前缀==赋予了一个与某个命名空间相关联的限定名称==。

#### XML Namespace (xmlns) 属性

XML 命名空间属性被放置于元素的开始标签之中，并使用以下的语法：

```
xmlns:namespace-prefix="namespaceURI"
```

当命名空间被定义在元素的开始标签中时，所有带有相同前缀的子元素都会与同一个命名空间相关联。

**注释：**用于标示命名空间的地址不会被解析器用于查找信息。其惟一的作用是赋予命名空间一个惟一的名称。不过，很多公司常常会作为指针来使用命名空间指向实际存在的网页，这个网页包含关于命名空间的信息。

#### 默认的命名空间（Default Namespaces）

为元素定义默认的命名空间可以让我们省去在所有的子元素中使用前缀的工作。

请使用下面的语法：

```
xmlns="namespaceURI"
```



### 3.5. XML Schema (简单了解)

XML Schema 是基于 XML 的 DTD 替代者。

==XML Schema 可描述 XML 文档的结构。==

XML Schema 语言也可作为 XSD（XML Schema Definition）来引用。

一个XML Schema文档通常称之为模式文档（约束文档），遵循这个文档书写的xml文件称之为实例文档。

编写了一个XML Schema约束文档后，通常需要把这个文件中声明的元素绑定到一个URI地址上，在XML Schema技术中有一个专业术语来描述这个过程，即把XML Schema文档声明的元素绑定到一个命名空间上，以后XML文件就可以通过这个URI（即命名空间）来告诉解析引擎，XML文档中编写的元素来自哪里，被谁约束。为了在一个XML文档中声明它所遵循的Schema文件具体位置，通常需要在XML文档中的根节点中使用schemaLocation属性来指定。

#### 对 XML Schema 的引用

此文件包含对 XML Schema 的引用：

名为 "note.xsd" 的 XML Schema 文件定义了XML 文档（ "note.xml" ）的元素

```xml
<?xml version="1.0"?>

<note xmlns="http://www.runoob.com"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://www.runoob.com note.xsd">

<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```

```xml
xmlns="http://www.runoob.com"
```

规定了默认命名空间的声明。此声明会告知 schema 验证器，在此 XML 文档中使用的所有元素都被声明于 "http://www.runoob.com" 这个命名空间。

```xml
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance
```

显示 schema 中用到的元素和数据类型来自命名空间`"http://www.w3.org/2001/XMLSchema-instance"`, 同时它还规定了来自命名空间 `"http://www.w3.org/2001/XMLSchema-instance"` 的元素和数据类型应该使用命名空间前缀 `xsi:`

> 这个 `xmlns:xsi`在不同的 xml 文档中似乎都会出现。 这是因为，xsi 已经成为了一个业界默认的用于 XSD(（XML Schema Definition) 文件的命名空间。

schemaLocation 属性有两个值。第一个值是需要使用的命名空间。第二个值是供命名空间使用的 XML schema 的位置：

```xml
xsi:schemaLocation = "键" "值"
```

例如:

```xml
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd"
```

前一个"键" `http://maven.apache.org/POM/4.0.0` 指代 【命名空间】， 只是一个全局唯一字符串而已。

后一个值指代 【XSD location URI】 , 这个值指示了前一个命名空间所对应的 XSD 文件的位置， xml parser 可以利用这个信息获取到 XSD 文件， 从而通过 XSD 文件对所有属于 命名空间 `http://maven.apache.org/POM/4.0.0` 的元素结构进行校验， 因此这个值必然是可以访问的， 且访问到的内容是一个 XSD 文件的内容。

### 3.6. Spring中的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context 
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/mvc
                           http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <context:component-scan base-package="xxx.xxx.controller" />

    <context:annotation-config/>

    <mvc:default-servlet-handler/>

    <mvc:annotation-driven/>

    <mvc:resources mapping="/images/**" location="/images/" />

    <bean id="xxx" class="xxx.xxx.xxx.Xxx">
        <property name="xxx" value="xxxx"/>
    </bean>

</beans>
```



```xml
xmlns="http://www.springframework.org/schema/beans"
```

这一句表示该文档默认的XML Namespace为`http://www.springframwork.org/schema/beans`。**对于默认的Namespace中的元素，可以不使用前缀**。

`xsi:schemaLocation`属性其实是Namespace为`http://www.w3.org/2001/XMLSchema-instance`里的schemaLocation属性，正是因为我们一开始声明了：

```xml
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
```

这里才写作`xsi:schemaLocation`（当然一般都使用这个前缀）。

它定义了XML Namespace和对应的XSD（Xml Schema Definition）文档的位置的关系。

例如：

```xml
xsi:schemaLocation="http://www.springframework.org/schema/context"         
                   "http://www.springframework.org/schema/context/spring-context.xsd"
```

这里表示Namespace为`http://www.springframework.org/schema/context`的Schema的位置为`http://www.springframework.org/schema/context/spring-context.xsd`。

## 4.SpringMVC的请求和响应
### 4.1. SpringMVC的数据响应

**SpringMVC的数据响应方式** 

1）页面跳转 

- 直接返回字符串 
- 通过ModelAndView对象返回

2）回写数据 

- 直接返回字符串
- 返回对象或集合

#### 4.1.1 页面跳转

代码继承自课程03，前置的配置参考之。

##### 4.1）返回字符串形式

直接返回字符串：此种方式会将返回的字符串与视图解析器的前后缀拼接后跳转。

![image-20220322191857380](https://gitlab.com/apzs/image/-/raw/master/image/202203221918432.png)

返回带有前缀的字符串： 

转发：`forward:/WEB-INF/views/index.jsp`
重定向：`redirect:/index.jsp`



请求地址：http://localhost:8080/user/quick?username=tom

```java
@RequestMapping(value = "/quick", method = RequestMethod.GET, params = {"username"})
public String save() {
    System.out.println("Controller save running....");
    return "success";
}
```



##### 4.2）返回ModelAndView对象

使用ModelAndView类用来存储处理完后的结果数据，以及显示该数据的视图。业务处理器调用模型层处理完用户请求后，把结果数据存储在该类的model属性中，把要返回的视图信息存储在该类的view属性中，然后让该ModelAndView返回该Spring MVC框架。框架通过调用配置文件中定义的视图解析器，对该对象进行解析，最后把结果数据显示在指定的页面上。


```java
void  setViewName(StringviewName)  //此ModelAndView的设置视图名称，由通过一个ViewResolverDispatcherServlet会得到解决。
```



```java
@RequestMapping(value = "/quick2")
public ModelAndView save2() {
    ModelAndView modelAndView = new ModelAndView();
    //设置模型数据
    modelAndView.addObject("username", "itcast");
    //设置视图名称
    modelAndView.setViewName("success");
    return modelAndView;
}

@RequestMapping(value = "/quick3")
public ModelAndView save3(ModelAndView modelAndView) {
    modelAndView.addObject("username", "itheima");
    modelAndView.setViewName("success");
    return modelAndView;
}
```

##### 4.3）向request域存储数据 

在进行转发时，往往要向request域中存储数据，在jsp页面中显示，那么Controller中怎样向request 域中存储数据呢？

> request域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据
>
> **request可以作为数据流传的载体,解决了一次请求内的不同 Servlet 的数据(请求数据+其他数据)共享问题。**
>
> 作用域：基于请求转发，一次请求中的所有 Servlet 共享。

① 通过SpringMVC框架注入的request对象`setAttribute()`方法设置

```java
@RequestMapping(value = "/quick5")
public String save5(HttpServletRequest request) {
    request.setAttribute("username", "酷丁鱼");
    return "success";
}
```

② 通过ModelAndView的`addObject()`方法设置

```java
@RequestMapping(value = "/quick5-2")
public ModelAndView save5_2(){
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("forward:/jsp/success.jsp");
    modelAndView.addObject("name","lisi");
    return modelAndView;
}
```



#### 4.1.2 回写数据

##### 4.1）直接返回字符串 

Web基础阶段，客户端访问服务器端，如果想直接回写字符串作为响应体返回的话，只需要使用

```java
response.getWriter().print("hello world")
```

即可，那么在Controller中想直接回写字符串该怎样呢？

① 通过SpringMVC框架注入的response对象，使用`response.getWriter().print(“hello world”)` 回写数据，此时不需要视图跳转，业务方法返回值为`void`。

```java
@RequestMapping(value = "/quick6")
public void save6(HttpServletResponse response) throws IOException {
    response.getWriter().print("hello world");
}
```

② 将需要回写的字符串直接返回，但此时需要通过`@ResponseBody`注解告知SpringMVC框架，方法返回的字符串不是跳转是直接在http响应体中返回。

```java
@RequestMapping(value = "/quick7")
@ResponseBody  //告知SpringMVC框架 不进行视图跳转 直接进行数据响应
public String save7() throws IOException {
    return "hello world";
}
```

在异步项目中，客户端与服务器端往往要进行json格式字符串交互，此时我们可以手动拼接json字符串返回。

```java
@RequestMapping(value = "/quick8")
@ResponseBody
public String save8() throws IOException {
    return "{\"username\":\"zhangsan\",\"age\":18}";
}
```

上述方式手动拼接json格式字符串的方式很麻烦，开发中往往要将复杂的java对象转换成json格式的字符串， 我们可以使用web阶段学习过的json转换工具jackson进行转换，导入jackson坐标。

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.9.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.9.0</version>
</dependency>
```

通过jackson转换json格式字符串，回写字符串。

```java
@RequestMapping(value = "/quick9")
@ResponseBody
public String save9() throws IOException {
    User user = new User();
    user.setUsername("lisi");
    user.setAge(30);
    //使用json的转换工具将对象转换成json格式字符串在返回
    ObjectMapper objectMapper = new ObjectMapper();
    String json = objectMapper.writeValueAsString(user);

    return json;
}
```



##### 4.2）返回对象或集合

通过SpringMVC帮助我们对对象或集合进行json字符串的转换并回写，为处理器适配器配置消息转换参数， 指定使用jackson进行对象或集合的转换，因此需要在 **spring-mvc.xml** 中进行如下配置：

```xml
<!--配置处理器映射器-->
<bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
    <property name="messageConverters">
        <list>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
        </list>
    </property>
</bean>
```
在方法上添加`@ResponseBody`就可以返回json格式的字符串
```java
@RequestMapping(value = "/quick10")
@ResponseBody
//期望SpringMVC自动将User转换成json格式的字符串
public User save10() throws IOException {
    User user = new User();
    user.setUsername("tom");
    user.setAge(32);
    return user;
}
```

可以使用mvc的注解驱动代替上述配置。

```xml
<!--mvc的注解驱动-->
<mvc:annotation-driven conversion-service="conversionService"/>
```

在 SpringMVC的各个组件中，处理器映射器、处理器适配器、视图解析器称为 SpringMVC 的三大组件。 使用`<mvc:annotation-driven>`自动加载 RequestMappingHandlerMapping（处理映射器）和 RequestMappingHandlerAdapter（处理适配器），可用在Spring-mvc.xml配置文件中使用 `<mvc:annotation-driven>`替代注解处理器和适配器的配置。
同时使用`<mvc:annotation-driven>`默认底层就会集成jackson进行对象或集合的json格式字符串的转换。

### 4.2. SpringMVC获得请求数据

客户端请求参数的格式是：`name=value&name=value…`

#### 4.2.1 获得基本类型参数

Controller中的业务方法的参数名称要与请求参数的name一致，参数值会自动映射匹配。

```http
GET http://localhost:8080/user/quick11?username=zhangsan&age=12
```

```java
@RequestMapping(value = "/quick11")
@ResponseBody
public void save11(String username, int age) throws IOException {
    System.out.println(username);
    System.out.println(age);
}
```



#### 4.2.2 获得POJO类型参数

Controller中的业务方法的POJO参数的属性名与请求参数的name一致，参数值会自动映射匹配。

```http
GET http://localhost:8080/user/quick12?username=zhangsan&age=12
```



```java
@RequestMapping(value = "/quick12")
@ResponseBody
public void save12(User user) throws IOException {
    System.out.println(user);
}
```

out:

```
User{username='zhangsan', age=12}
```



#### 4.2.3 获得数组类型参数

Controller中的业务方法数组名称与请求参数的name一致，参数值会自动映射匹配。

```http
GET http://localhost:8080/user/quick13?strs=111&strs=222&strs=333
```



```java
@RequestMapping(value = "/quick13")
@ResponseBody
public void save13(String[] strs) throws IOException {
    System.out.println(Arrays.asList(strs));
}
```

out:

```
[111, 222, 333]
```



#### 4.2.4 获得集合类型参数

获得集合参数时，要将集合参数包装到一个POJO中才可以。

定义一个类VO

```java
public class VO {

    private List<User> userList;

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    @Override
    public String toString() {
        return "VO{" +
                "userList=" + userList +
                '}';
    }
}
```

定义一个上传表单form.jsp：

```jsp
<form action="${pageContext.request.contextPath}/user/quick14" method="post">
    <%--表明是第几个User对象的username age--%>
    <input type="text" name="userList[0].username"><br/>
    <input type="text" name="userList[0].age"><br/>
    <input type="text" name="userList[1].username"><br/>
    <input type="text" name="userList[1].age"><br/>
    <input type="submit" value="提交">
</form>
```



> `${pageContext.request.contextPath}`是JSP取得绝对路径的方法，等价于`<%=request.getContextPath()%>` 
>
>   也就是取出部署的应用程序名或者是当前的项目名称。
>
>   比如项目名称是demo1，在浏览器中输入为`**http://localhost:8080/demo1/a.jsp` ，使用`${pageContext.request.contextPath}`或`<%=request.getContextPath()%>`取出来的就是`/demo1`,而"/"代表的含义就是`http://localhost:8080`
>
>   故有时候项目中这样写 `${pageContext.request.contextPath}/a.jsp`





```java
@RequestMapping(value = "/quick14")
@ResponseBody
public void save14(VO vo) throws IOException {
    System.out.println(vo);
}
```

首先访问form.jsp，提交请求

out:

```
VO{userList=[User{username='tom', age=11}, User{username='jerry', age=12}]}
```



当使用ajax提交时，可以指定contentType为json形式，那么在==方法参数位置==使用`@RequestBody`可以直接接收集合数据而无需使用POJO进行包装。

```javascript
<script src="${pageContext.request.contextPath}/js/jquery-3.3.1.js"></script>
<script>
    var userList = new Array();
    userList.push({username:"zhangsan",age:18});
    userList.push({username:"lisi",age:28});

    $.ajax({
        type:"POST",
        url:"${pageContext.request.contextPath}/user/quick15",
        data:JSON.stringify(userList),
        contentType:"application/json;charset=utf-8"
    });

</script>
```



```java
@RequestMapping(value = "/quick15")
@ResponseBody
public void save15(@RequestBody List<User> userList) throws IOException {
    System.out.println(userList);
}
```

SpringMVC的前端控制器 DispatcherServlet的url-pattern配置的是/，代表对所有的资源都进行过滤操作，我们可以通过以下两种
方式指定放行静态资源，在**spring-mvc.xml**中

```xml
<!--开放资源的访问-->
<mvc:resources mapping="/js/**" location="/js/"/>
<mvc:resources mapping="/img/**" location="/img/"/>

<mvc:default-servlet-handler/>
```

#### 4.2.5 请求数据乱码问题

当post请求时，数据会出现乱码，我们可以设置一个过滤器来进行编码的过滤。

在web.xml中

```xml
<!--配置全局过滤的filter-->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```



#### 4.2.6 参数绑定注解@requestParam

当请求的参数名称与Controller的业务方法参数名称不一致时，就需要通过@RequestParam注解显示的绑定。

![image-20220322223233481](https://gitlab.com/apzs/image/-/raw/master/image/202203222232537.png)

注解@RequestParam还有如下参数可以使用： 

- value：与请求参数名称对应
- required：此在指定的请求参数是否必须包括，默认是true，提交时如果没有此参数则报错
- defaultValue：当没有指定请求参数时，则使用指定的默认值赋值



```java
@RequestMapping(value = "/quick16")
@ResponseBody
public void save16(@RequestParam(value = "name", required = false, defaultValue = "itcast") String username) throws IOException {
    System.out.println(username);
}
```

#### 4.2.7 获得Restful风格的参数

在SpringMVC中可以使用占位符进行参数绑定。地址`/user/1`可以写成 `/user/{id}`，占位符`{id}`对应的就是1的值。在业务方法中我们可以使用`@PathVariable`注解进行占位符的匹配获取工作。

```http	
GET localhost:8080/user/quick17/zhangsan
```



```java
@RequestMapping(value = "/quick17/{name}")
@ResponseBody
public void save17(@PathVariable(value = "name") String username) throws IOException {
    System.out.println(username);
}
```

#### 4.2.8 自定义类型转换器

SpringMVC 默认已经提供了一些常用的类型转换器，例如客户端提交的字符串转换成int型进行参数设置。 但是不是所有的数据类型都提供了转换器，没有提供的就需要自定义转换器，例如：日期类型的数据就需要自定义转换器。

**自定义类型转换器的开发步骤：** 

1. 定义转换器类实现Converter接口 

   ```java
   public class DateConverter implements Converter<String, Date> {
       public Date convert(String dateStr) {
           //将日期字符串转换成日期对象 返回
           SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
           Date date = null;
           try {
               date = format.parse(dateStr);
           } catch (ParseException e) {
               e.printStackTrace();
           }
           return date;
       }
   }
   ```

2. 在配置文件 **spring-mvc.xml** 中声明转换器

   ```xml
   <!--声明转换器-->
   <bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
       <property name="converters">
           <list>
               <bean class="com.itheima.converter.DateConverter"></bean>
           </list>
       </property>
   </bean>
   ```

   

3. 在`<annotation-driven>`中引用转换器

   ```xml
   <mvc:annotation-driven conversion-service="conversionService"/>
   ```

发送请求（参数必须为date）

```http
GET http://localhost:8080/user/quick18?date=2022-03-22
```

```java
@RequestMapping(value = "/quick18")
@ResponseBody
public void save18(Date date) throws IOException {
    System.out.println(date);
}
```



#### 4.2.9 获得Servlet相关API

SpringMVC支持使用原始ServletAPI对象作为控制器方法的参数进行注入，常用的对象如下： 

- HttpServletRequest 
- HttpServletResponse
- HttpSession

```java
@RequestMapping(value = "/quick19")
@ResponseBody
public void save19(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
    System.out.println(request);
    System.out.println(response);
    System.out.println(session);
}
```

out：

```
org.apache.catalina.connector.RequestFacade@36f0729d
org.apache.catalina.connector.ResponseFacade@38379a33
org.apache.catalina.session.StandardSessionFacade@3c0819ed
```

#### 4.2.10 获得请求头

**1）@RequestHeader**

使用`@RequestHeader`可以获得请求头信息，相当于web阶段学习的`request.getHeader(name)`

@RequestHeader注解的属性如下：

- value：请求头的名称
- required：是否必须携带此请求头

```java
@RequestMapping(value = "/quick20")
@ResponseBody
public void save20(@RequestHeader(value = "User-Agent", required = false) String user_agent) throws IOException {
    System.out.println(user_agent);
}
```

out:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36
```



**2）@CookieValue**

使用`@CookieValue`可以获得指定Cookie的值 

`@CookieValue`注解的属性如下： 

- value：指定cookie的名称
- required：是否必须携带此cookie

```java
@RequestMapping(value = "/quick21")
@ResponseBody
public void save21(@CookieValue(value = "JSESSIONID") String jsessionId) throws IOException {
    System.out.println(jsessionId);
}
```



#### 4.2.11 文件上传

**文件上传客户端三要素**

- 表单项`type=“file”` 
- 表单的提交方式是post
- 表单的`enctype`属性是多部分表单形式，及`enctype=“multipart/form-data”`

![image-20220322225720423](https://gitlab.com/apzs/image/-/raw/master/image/202203222257472.png)



**文件上传原理**

- 当form表单修改为多部分表单时，`request.getParameter()`将失效。 
- `enctype="application/x-www-form-urlencoded"`时，form表单的正文内容格式是： **key=value&key=value&key=value**
- 当form表单的enctype取值为`Mutilpart/form-data`时，请求正文内容就变成多部分形式：

![image-20220322225923088](https://gitlab.com/apzs/image/-/raw/master/image/202203222259155.png)



#### 4.2.12 单文件上传

① 导入fileupload和io坐标 

```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.3</version>
</dependency>
```

② 配置文件上传解析器

```xml
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"> 
    <!--上传文件总大小-->
    <property name="maxUploadSize" value="5242800"/> 
    <!--上传单个文件的大小--> 
    <property name="maxUploadSizePerFile" value="5242800"/> 
    <!--上传文件的编码类型--> 
    <property name="defaultEncoding" value="UTF-8"/>
</bean>
```

③ 编写文件上传代码

```java
@RequestMapping(value = "/quick22")
@ResponseBody
public void save22(String username, MultipartFile uploadFile, MultipartFile uploadFile2) throws IOException {
    System.out.println(username);
    //获得上传文件的名称
    String originalFilename = uploadFile.getOriginalFilename();
    uploadFile.transferTo(new File("D:\\迅雷下载\\upload\\" + originalFilename));
    String originalFilename2 = uploadFile2.getOriginalFilename();
    uploadFile2.transferTo(new File("D:\\迅雷下载\\upload\\" + originalFilename2));
}
```



多文件上传，只需要将页面修改为多个文件上传项，将方法参数MultipartFile类型修改为`MultipartFile[]`即可

```jsp
<body>
    <h1>分别上传</h1>
    <form action="${pageContext.request.contextPath}/user/quick22" method="post" enctype="multipart/form-data">
        名称<input type="text" name="username"><br/>
        文件1<input type="file" name="uploadFile"><br/>
        文件2<input type="file" name="uploadFile2"><br/>
        <input type="submit" value="提交">
    </form>

    <h1>多文件上传</h1>
    <form action="${pageContext.request.contextPath}/user/quick23" method="post" enctype="multipart/form-data">
        名称<input type="text" name="username"><br/>
        文件1<input type="file" name="uploadFiles"><br/>
        文件2<input type="file" name="uploadFiles"><br/>
        <input type="submit" value="提交">
    </form>
</body>
```



```java
@RequestMapping(value = "/quick23")
@ResponseBody
public void save23(String username, MultipartFile[] uploadFiles) throws IOException {
    System.out.println(username);
    for (MultipartFile multipartFile : uploadFiles) {
        String originalFilename = multipartFile.getOriginalFilename();
        multipartFile.transferTo(new File("D:\\迅雷下载\\upload\\" + originalFilename));
    }
}
```

## 5.JDBC模板
### JdbcTemplate基本使用

参考资料：[使用 JDBC 进行数据访问](https://www.docs4dev.com/docs/zh/spring-framework/4.3.21.RELEASE/reference/jdbc.html)

#### JdbcTemplate概述 

它是spring框架中提供的一个对象，是对原始繁琐的Jdbc API对象的简单封装。spring框架为我们提供了很多的操作模板类。例如：操作关系型数据的JdbcTemplate和HibernateTemplate，操作nosql数据库的RedisTemplate，操作消息队列的JmsTemplate等等。



| Action               | Spring   | You |
| ---------------------------- | ------ | ------ |
| 定义连接参数。               |        | X      |
| 打开连接。                   | X      |        |
| 指定 SQL 语句。              |        | X      |
| 声明参数并提供参数值         |        | X      |
| 准备并执行该语句。           | X      |        |
| 设置循环以遍历结果(如果有)。 | X      |        |
| 进行每次迭代的工作。         |        | X      |
| 处理任何异常。               | X      |        |
| Handle transactions.         | X      |        |
| 关闭连接，语句和结果集。     | X      |        |



#### JdbcTemplate开发步骤 

**① 导入spring-jdbc和spring-tx坐标** 

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

**② 创建数据库表和实体** 

![image-20220323214153205](https://gitlab.com/apzs/image/-/raw/master/image/202203232141241.png)

```java
public class Account { 
    private String name; 
    private double money; 
    //省略get和set方法
}
```

**③ 创建JdbcTemplate对象**

**④ 执行数据库操作**

```java
public void test1() throws PropertyVetoException {
    // 1.创建数据源对象
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass("com.mysql.cj.jdbc.Driver");
    dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test?serverTimezone=GMT%2B8");
    dataSource.setUser("root");
    dataSource.setPassword("root");
	// 2.创建JdbcTemplate对象
    JdbcTemplate jdbcTemplate = new JdbcTemplate();
    // 3.设置数据源对象(知道数据库在哪)
    jdbcTemplate.setDataSource(dataSource);
    // 4.执行操作
    int row = jdbcTemplate.update("insert into account values(?,?)", "jetty", 15000);
    System.out.println(row);
}
```



#### Spring产生JdbcTemplate对象

可以将JdbcTemplate的创建权交给Spring，将数据源DataSource的创建权也交给Spring，在Spring容器内部将数据源DataSource注入到JdbcTemplate模版对象中，配置如下：

> 有些参数在某些阶段中是常量。如在开发阶段我们连接数据库时的url，username，password等信息，分布式应用中client端的server地址，端口等。这些参数在不同阶段之间又往往需要改变。我们可以将这些信息写入到配置文件中，通过spring加载到容器进行使用。
>
> 使用`<context:property-placeholder>`元素可以解决，说明如下：
>
> Activates replacement of ${...} placeholders by registering a PropertySourcesPlaceholderConfigurer within the application context. Properties will be resolved against the specified properties file or Properties object -- so called "local properties", if any, and against the Spring Environment's current set of PropertySources.

```xml
<!--加载jdbc.properties-->
<context:property-placeholder location="classpath:jdbc.properties"/>

<!--数据源对象-->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>

<!--jdbc模板对象-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"/>
</bean>
```

从容器中获得JdbcTemplate进行添加操作

```java
public void test2() throws PropertyVetoException {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    JdbcTemplate jdbcTemplate = app.getBean(JdbcTemplate.class);
    int row = jdbcTemplate.update("insert into account values(?,?)", "lisi", 5000);
    System.out.println(row);
}
```



#### JdbcTemplate的常用操作

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class JdbcTemplateCRUDTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    // 测试查询单个简单数据操作(聚合查询)
    public void testQueryCount() {
        Long count = jdbcTemplate.queryForObject("select count(*) from account", Long.class);
        System.out.println(count);
    }

    @Test
    // 测试查询单个对象操作
    public void testQueryOne() {
        Account account = jdbcTemplate.queryForObject("select * from account where name=?", new BeanPropertyRowMapper<Account>(Account.class), "tom");
        System.out.println(account);
    }

    @Test
    public void testQueryAll() {
        List<Account> accountList = jdbcTemplate.query("select * from account", new BeanPropertyRowMapper<Account>(Account.class));
        System.out.println(accountList);
    }
	
    @Test
    // 测试修改
    public void testUpdate() {
        jdbcTemplate.update("update account set money=? where name=?", 10000, "tom");
    }
    
    @Test
    // 测试删除
    public void testDelete() {
        jdbcTemplate.update("delete from account where name=?", "tom");
    }
}
```



## 6.练习
### 6.1. Spring环境搭建步骤

① 创建工程（Project&Module） 

② 导入静态页面（见资料jsp页面） 

③ 导入需要坐标（见资料中的pom.xml）

④ 创建包结构（controller、service、dao、domain、utils） 

⑤ 导入数据库脚本（见资料test.sql） 

⑥ 创建POJO类（见资料User.java和Role.java）

⑦ 创建配置文件（applicationContext.xml、spring-mvc.xml、jdbc.properties、log4j.properties）



配置文件之间的关系：

在**web.xml**中通过`contextConfigLocation`配置spring，`contextConfigLocation`参数定义了要装入的 Spring 配置文件。



![image-20220323163240665](https://gitlab.com/apzs/image/-/raw/master/image/202203231632730.png)





### 6.2. 项目整体结构

```
--controller 根据请求，调用servive，返回视图
--service 调用dao对模型进行操作，返回对象
--dao 通过jdbcTemplate执行sql，返回对象和其它必要信息
--domain 定义模型
```



在视频教程中，controller层使用注解配置，service层和dao层使用xml配置。

在sql操作中没有使用【事务】，并发环境下可能出现问题。

- [ ] 将service层和dao层也改为注解配置

### 6.3. 表结构与domain层的设计

sys_user：用户数据表

sys_role：角色数据表

<img src="https://gitlab.com/apzs/image/-/raw/master/image/202203291520139.png" alt="img" style="zoom:67%;" />



sys_user_role表中设置了两个外键，存储了用户和角色之间的对应关系，一个用户可以有多个角色。

![image-20220323223053105](https://gitlab.com/apzs/image/-/raw/master/image/202203232230136.png)



**User类**

```java
public class User {

    private Long id;
    private String username;
    private String email;
    private String password;
    private String phoneNum;

    //当前用户具备哪些角色
    private List<Role> roles;

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
    ... // 省略set, get方法
}
```

**Role类**

```java
public class Role {

    private Long id;
    private String roleName;
    private String roleDesc;
	... // 省略set, get方法
}
```

### 6.4. DAO层

**RoleDao 接口设计：**

```java
public interface RoleDao {
    // 返回sys_role表中所有数据，并将每一条数据封装为Role对象
    List<Role> findAll();
	// 增加一条Role的数据
    void save(Role role);
	// 根据user id查找其所有的角色信息，并将每一条数据封装为Role对象，返回一个List<Role>
    List<Role> findRoleByUserId(Long id);
}
```



**UserDao 接口设计：**

```java
public interface UserDao {
    // 返回sys_user表中所有数据
    List<User> findAll();
	// 增加一条user的数据，返回当前保存用户的id 该id是数据库自动生成的
    Long save(User user);
	// 将一个user id对应role id全部插入sys_user_role表中
    void saveUserRoleRel(Long id, Long[] roleIds);
	// 将user id对应的角色数据从 sys_user_role
    void delUserRoleRel(Long userId);
	// 删除一条user的数据
    void del(Long userId);
}
```



### 6.5. Service层

**RoleService 接口设计**

```java
public interface RoleService {
    public List<Role> list() ;

    void save(Role role);
}
```

具体实现：

```java
public class RoleServiceImpl implements RoleService {

    private RoleDao roleDao;
    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    public List<Role> list() {
        List<Role> roleList = roleDao.findAll();
        return roleList;
    }

    public void save(Role role) {
        roleDao.save(role);
    }
}
```



**UserService 接口设计**

```java
public interface UserService {
    List<User> list();

    void save(User user, Long[] roleIds);

    void del(Long userId);
}
```

具体实现：

```java
public class UserServiceImpl implements UserService {

    private UserDao userDao;
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    private RoleDao roleDao;
    public void setRoleDao(RoleDao roleDao) {
        this.roleDao = roleDao;
    }
	
    // 查询sys_user表中所有的数据，将其主键作为参数查询相应role数据，并返回User对象(包含Role对象)的list
    public List<User> list() {
        List<User> userList = userDao.findAll();
        //封装userList中的每一个User的roles数据
        for (User user : userList) {
            //获得user的id
            Long id = user.getId();
            //将id作为参数 查询当前userId对应的Role集合数据
            List<Role> roles = roleDao.findRoleByUserId(id);
            user.setRoles(roles);
        }
        return userList;
    }
	
    public void save(User user, Long[] roleIds) {
        //第一步 向sys_user表中存储数据
        Long userId = userDao.save(user);
        //第二步 向sys_user_role 关系表中存储多条数据
        userDao.saveUserRoleRel(userId,roleIds);
    }

    public void del(Long userId) {
        //1、删除sys_user_role关系表
        userDao.delUserRoleRel(userId);
        //2、删除sys_user表
        userDao.del(userId);
    }
}
```



### 6.6. Controller层

User相关接口：

```http
### 查询user list
GET http://localhost:8080/user/list  
### 查询role list，返回视图user-add.jsp
GET http://localhost:8080/user/saveUI
### 增加一条user数据，重定向到user list视图
POST http://localhost:8080/user/save
### 删除一条user数据，重定向到user list视图
GET http://localhost:8080/user/del/{userID}
```

Role相关接口：

略



## 7.SpringMVC拦截器
### 7.1. 拦截器的作用

Spring MVC 的拦截器类似于 Servlet 开发中的过滤器 Filter，用于对处理器进行预处理和后处理。 

将拦截器按一定的顺序联结成一条链，这条链称为拦截器链（Interceptor Chain）。在访问被拦截的方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用。拦截器也是AOP思想的具体实现。



### 7.2. 拦截器和过滤器区别

| 区别 | 过滤器（Filter） |  拦截器（Interceptor）   |
| ---- | ------ | ---- |
| 使用范围 | 是 servlet 规范中的一部分，任何Java Web 工程都可以使用       |   是 SpringMVC 框架自己的，只有使用了 SpringMVC 框架的工程才能用   |
| 拦截范围 | 在 url-pattern 中配置了`/*`之后， 可以对所有要访问的资源拦截 | 在`<mvc:mapping path=“”/>`中配置了`/**`之 后，也可以对所有资源进行拦截，但是可以通过`<mvc:exclude-mapping path=“”/>`标签排除不需要拦截的资源。 |



> **拦截器路径通配符**
>
> | 通配符 |      | 说明                                                         |
> | ------ | ---- | ------------------------------------------------------------ |
> | *      |      | 匹配单个字符，如 `/user/*` 匹配的是 `/user/aa`，`/user/bb` 等，又如  `/user/*/ab` 匹配到 `/user/p/ab`； |
> | **     |      | 匹配任意多字符(包括多级路径)，如：`/user/**` 匹配到 `/user/aa`、`/user/p/bb` 等； |



### 7.3. 拦截器快速入门

**1、创建拦截器类实现`HandlerInterceptor`接口。**

```java
public class MyInterceptor1 implements HandlerInterceptor {
    //在目标方法执行之前执行
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ServletException, IOException {
        System.out.println("preHandle.....");
        String param = request.getParameter("param");
        if("yes".equals(param)){
            return true;
        }else{
            request.getRequestDispatcher("/error.jsp").forward(request,response);
            return false;//返回true代表放行  返回false代表不放行
        }
    }

    //在目标方法执行之后 视图对象返回之前执行
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        modelAndView.addObject("name","itheima");
        System.out.println("postHandle...");
    }

    //在流程都执行完毕后执行
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        System.out.println("afterCompletion....");
    }
}
```

**2、配置拦截器**

```xml
<!--配置拦截器-->
<mvc:interceptors>
    <mvc:interceptor>
        <!--对哪些资源执行拦截操作-->
        <mvc:mapping path="/**"/>
        <bean class="com.itheima.interceptor.MyInterceptor2"/>
    </mvc:interceptor>
    <mvc:interceptor>
        <!--对哪些资源执行拦截操作-->
        <mvc:mapping path="/**"/>
        <bean class="com.itheima.interceptor.MyInterceptor1"/>
    </mvc:interceptor>
</mvc:interceptors>
```



**拦截器方法说明**

| 方法名              | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `preHandle()`       | 方法将在请求处理之前进行调用，该方法的返回值是布尔值Boolean类型的， 当它返回为false 时，表示请求结束，后续的Interceptor 和Controller 都不会 再执行；当返回值为true 时就会继续调用下一个Interceptor 的preHandle 方法 |
| `postHandle()`      | 该方法是在当前请求进行处理之后被调用，前提是preHandle 方法的返回值为 true 时才能被调用，且它会在DispatcherServlet 进行视图返回渲染之前被调 用，所以我们可以在这个方法中对Controller 处理之后的ModelAndView 对象进行操作 |
| `afterCompletion()` | 该方法将在整个请求结束之后，也就是在DispatcherServlet 渲染了对应的视图 之后执行，前提是preHandle 方法的返回值为true 时才能被调用 |



### 7.4. 案例-用户登录权限控制

在[D:\learning-area\SSM\代码\6_itheima_spring_test](D:\learning-area\SSM\代码\6_itheima_spring_test)的基础上进行修改，使用拦截器实现根据session的登陆验证。

需求：用户没有登录的情况下，不能对后台菜单进行访问操作，点击菜单跳转到登录页面，只有用户登录成功后才能进行后台功能的操作。

![image-20220324160408777](https://gitlab.com/apzs/image/-/raw/master/image/202203241604838.png)



==特别说明！==

按照老师给的例子在spring-mvc.xml中配置拦截器，会把静态资源也拦截掉！**拦截器中需要增加针对静态资源不进行过滤**

```xml
<!--配置权限拦截器-->
<mvc:interceptors>
    <mvc:interceptor>
        <!--配置对哪些资源执行拦截操作-->
        <mvc:mapping path="/**"/>
        <!--配置哪些资源排除拦截操作-->
        <mvc:exclude-mapping path="/user/login"/>
        <mvc:exclude-mapping path="/**/fonts/*"/>
        <mvc:exclude-mapping path="/**/*.css"/>
        <mvc:exclude-mapping path="/**/*.js"/>
        <mvc:exclude-mapping path="/**/*.png"/>
        <mvc:exclude-mapping path="/**/*.gif"/>
        <mvc:exclude-mapping path="/**/*.jpg"/>
        <mvc:exclude-mapping path="/**/*.jpeg"/>
        <bean class="com.itheima.interceptor.PrivilegeInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

[更多解决方案](https://www.cnblogs.com/mophy/p/8465598.html)



首先实现一个自定义拦截器 PrivilegeInterceptor

```java
public class PrivilegeInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        //逻辑：判断用户是否登录  本质：判断session中有没有user
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            //没有登录
            response.sendRedirect(request.getContextPath() + "/login.jsp");
            return false;
        }
        //放行  访问目标资源
        return true;
    }
}
```

拦截器的逻辑非常简单，判断每个请求中的session（HttpSession）中，是否带有user。带有就认为是登陆，不带有就认为是未登录。

> **HttpSession 服务端的技术**
> 服务器会为每一个用户 创建一个独立的HttpSession
>
> **HttpSession原理**
> 当用户第一次访问Servlet时,服务器端会给用户创建一个独立的Session，并且生成一个SessionID，这个SessionID在响应浏览器的时候会被装进cookie中，从而被保存到浏览器中。
> 当用户再一次访问Servlet时，请求中会携带着cookie中的SessionID去访问
> 服务器会根据这个SessionID去查看是否有对应的Session对象，有就拿出来使用;没有就创建一个Session(相当于用户第一次访问)
>
> **域的范围:**
>     Context域 > Session域 > Request域
>     Session域 只要会话不结束就会存在 但是Session有默认的存活时间(30分钟)
>
> ![how HttpSession works](https://gitlab.com/apzs/image/-/raw/master/image/how-httpsession-works.jpg)
>
> **session进行身份验证的原理：**
>
> 当客户端第一次访问服务器的时候，此时客户端的请求中不携带任何标识给服务器，所以此时服务器无法找到与之对应的
>
> session，所以会新建session对象，当服务器进行响应的时候，服务器会将session标识放到响应头的Set-Cookie中，会以
>
> key-value的形式返回给客户端，例：JSESSIONID=7F149950097E7B5B41B390436497CD21；其中JSESSIONID是固定的，
>
> 而后面的value值对应的则是给该客户端新创建的session的ID，之后浏览器再次进行服务器访问的时候，客户端会将此key-value
>
> 放到cookie中一并请求服务器，服务器就会根据此ID寻找对应的session对象了；（当浏览器关闭后，会话结束，由于cookie消
>
> 失所以对应的session对象标识消失，而对应的session依然存在，但已经成为报废数据等待GC回收了）
>
> 对应session的ID可以利用此方法得到：`session.getId();`
>
> **个人理解：**
>
> cookie是一个存在本地浏览器端的词典，HttpSession是一个存在服务器端的词典。当用户登陆一个网站的时候，服务器端（假如是java web）给用户创建一个独立的Session，并且生成一个SessionID，SessionID在响应的时候给装到浏览器的cookie里。用户第二次访问的时候，请求中会携带着cookie中的SessionID去访问。
> 服务器端这个字典里，存的是{SessionID : HttpSession}，cookie里存的可能是{"SessionID" : SessionID}
>
> 不同网站的cookie是不同的，浏览器保证跨域隔离。



在UserController中，实现一个 /login 接口

```java
@RequestMapping("/login")
public String login(String username, String password, HttpSession session) {
    User user = userService.login(username, password);
    if (user != null) {
        //登录成功 将user存储到session
        session.setAttribute("user", user);
        return "redirect:/index.jsp";
    }
    return "redirect:/login.jsp";
}
```

在service层实现一个login方法，判断数据库中是否存在该用户且密码正确。

```java
public User login(String username, String password) {
    try {
        User user = userDao.findByUsernameAndPassword(username,password);
        return user;
    }catch (EmptyResultDataAccessException e){
        return null;
    }
}
```


## 8.异常处理机制
### 异常处理的思路

系统中异常包括两类：**预期异常**和**运行时异常RuntimeException**，前者通过捕获异常从而获取异常信息，后者主要通过规范代码开发、测试等手段减少运行时异常的发生。
系统的Dao、Service、Controller出现都通过throws Exception向上抛出，最后由SpringMVC前端控制器交
由异常处理器进行异常处理，如下图：

![image-20220324170254529](https://gitlab.com/apzs/image/-/raw/master/image/202203241702575.png)

### 异常处理两种方式

- 使用Spring MVC提供的简单异常处理器 `SimpleMappingExceptionResolver`
- 实现Spring的异常处理接口 `HandlerExceptionResolver` 自定义自己的异常处理器

### 简单异常处理器 SimpleMappingExceptionResolver 

SpringMVC已经定义好了该类型转换器，在使用时可以根据项目情况进行相应异常与视图的映射配置。

![image-20220324172101731](https://gitlab.com/apzs/image/-/raw/master/image/202203241721788.png)



自己定义了一个 MyException

```java
package com.itheima.exception;

public class MyException extends Exception {
}
```



### 自定义异常处理步骤

1、创建异常处理器类实现 `HandlerExceptionResolver`

```java
public class MyExceptionResolver implements HandlerExceptionResolver {
    /*
        参数Exception：异常对象
        返回值ModelAndView：跳转到错误视图信息
     */
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        ModelAndView modelAndView = new ModelAndView();

        if(e instanceof MyException){
            modelAndView.addObject("info","自定义异常");
        }else if(e instanceof ClassCastException){
            modelAndView.addObject("info","类转换异常");
        }

        modelAndView.setViewName("error");

        return modelAndView;
    }
}
```

2、配置异常处理器

```xml
<!--自定义异常处理器-->
<bean class="com.itheima.resolver.MyExceptionResolver"/>
```



3、编写异常页面

4、测试异常跳转

```java
@RequestMapping("/quick22") 
@ResponseBody 
public void quickMethod22() throws IOException, ParseException { 
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd"); 
    simpleDateFormat.parse("abcde");
}
```

即在Controller层抛出异常，让异常处理器进行处理。

## 9.AOP
### 9.1. Spring的AOP简介

#### 9.1.1 什么是AOP?

AOP 为 Aspect Oriented Programming 的缩写，意思为面向切面编程，是通过预编译方式和运行期动态代理 实现程序功能的统一维护的一种技术。
AOP 是 OOP 的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

**OOP 的局限性**

当有重复代码出现时，可以就将其封装出来然后复用。我们通过分层、分包、分类来规划不同的逻辑和职责。但这里的复用的都是**核心业务逻辑**，并不能复用一些**辅助逻辑**，比如：日志记录、性能统计、安全校验、事务管理，等等。这些边缘逻辑往往贯穿你整个核心业务，传统 OOP 很难将其封装：

![](https://gitlab.com/apzs/image/-/raw/master/image/1496775-20210203092605947-1239661656.jpg)

这一条条横线仿佛切开了 OOP 的树状结构，犹如一个大蛋糕被切开多层，每一层都会执行相同的辅助逻辑，所以大家将这些辅助逻辑称为层面或者切面。

#### 9.1.2 AOP 的作用及其优势

作用：在程序运行期间，在不修改源码的情况下对方法进行功能增强

优势：减少重复代码，提高开发效率，并且便于维护

#### 9.1.3 AOP 的底层实现

AOP 的底层是通过 Spring 提供的的动态代理技术实现的。在运行期间，Spring通过动态代理技术动态的生成代理对象，代理对象方法执行时进行增强功能的介入，在去调用目标对象的方法，从而完成功能的增强。

> 关于动态代理，见：[09_补充：代理模式](D:\BaiduNetdiskWorkspace\Md笔记\Java后端开发\Java框架\SSM\09_补充：代理模式.md)

#### 9.1.4 AOP的动态代理技术

常用的动态代理技术 

- JDK 代理 : 基于接口的动态代理技术
- cglib 代理：基于父类的动态代理技术



![image-20220325155728208](https://gitlab.com/apzs/image/-/raw/master/image/202203251557269.png)

#### 9.1.5 JDK的动态代理

1）目标类接口

```java
public interface TargetInterface {
    public void save();
}
```

2）目标类

```java
public class Target implements TargetInterface {
    public void save() {
        System.out.println("save running.....");
    }
}
```

3）动态代理代码

```java
public class ProxyTest {

    public static void main(String[] args) {
        //目标对象
        final Target target = new Target();
        //增强对象
        final Advice advice = new Advice();
        //返回值 就是动态生成的代理对象
        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
            	//目标对象类加载器
                target.getClass().getClassLoader(), 
            	//目标对象相同的接口字节码对象数组
                target.getClass().getInterfaces(), 
                new InvocationHandler() {
                    //调用代理对象的任何方法  实质执行的都是invoke方法
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        //前置增强
                        advice.before();
                        //执行目标方法
                        Object invoke = method.invoke(target, args);
                        //后置增强
                        advice.afterReturning();
                        return invoke;
                    }
                }
        );
        //调用代理对象的方法
        proxy.save();
    }
}
```

4）调用代理对象的方法测试

```java
// 测试,当调用接口的任何方法时，代理对象的代码都无需修改 
proxy.save();
```



#### 9.1.6 cglib 的动态代理（原理未学习）

1）目标类

```java
public class Target {
    public void save() {
        System.out.println("save running.....");
    }
}
```

2）增强类对象

```java
public class Advice {

    public void before(){
        System.out.println("前置增强....");
    }

    public void afterReturning(){
        System.out.println("后置增强....");
    }

}
```

3）动态代理代码

```java
public class ProxyTest {

    public static void main(String[] args) {

        //目标对象
        final Target target = new Target();

        //增强对象
        final Advice advice = new Advice();

        //返回值 就是动态生成的代理对象  基于cglib
        //1、创建增强器
        Enhancer enhancer = new Enhancer();
        //2、设置父类（目标）
        enhancer.setSuperclass(Target.class);
        //3、设置回调
        enhancer.setCallback(new MethodInterceptor() {
            public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
                advice.before(); //执行前置
                Object invoke = method.invoke(target, args);//执行目标
                advice.afterReturning(); //执行后置
                return invoke;
            }
        });
        //4、创建代理对象
        Target proxy = (Target) enhancer.create();

        proxy.save();
    }
}
```

#### 9.1.7 AOP的相关概念

Spring 的 AOP 实现底层就是对上面的动态代理的代码进行了封装，封装后我们只需要对需要关注的部分进行代码编 写，并通过配置的方式完成指定目标的方法增强。
AOP 常用的相关术语如下：

- **Target（目标对象）**：代理的目标对象 
- **Proxy （代理）**：一个类被 AOP 织入增强后，就产生一个结果代理类 
- **Joinpoint（连接点）**：所谓连接点是指那些被拦截到的点。在spring中,这些点指的是方法，因为spring只支持方 法类型的连接点
- **Pointcut（切入点）**：所谓切入点是指我们要对哪些 Joinpoint 进行拦截的定义 
- **Advice（通知/ 增强）**：所谓通知是指拦截到 Joinpoint 之后所要做的事情就是通知 
- **Aspect（切面）**：是切入点和通知（引介）的结合 
- **Weaving（织入）**：是指把增强应用到目标对象来创建新的代理对象的过程。spring采用动态代理织入，而AspectJ采用编译期织入和类装载期织入

#### 9.1.8 AOP 开发明确的事项 

1. 需要编写的内容
- 编写核心业务代码（目标类的目标方法） 
- 编写切面类，切面类中有通知(增强功能方法) 
- 在配置文件中，配置织入关系，即将哪些通知与哪些连接点进行结合

2. AOP 技术实现的内容
Spring 框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的 代理对象，根据通知类别，在代理对象的对应位置，将通知对应的功能织入，完成完整的代码逻辑运行。

3. AOP 底层使用哪种代理方式
在 spring 中，框架会根据目标类是否实现了接口来决定采用哪种动态代理的方式。

### 9.2. 基于XML的AOP开发

#### 9.2.1 快速入门

**步骤：**

1、导入 AOP 相关坐标 

2、创建目标接口和目标类（内部有切点） 

3、创建切面类（内部有增强方法） 

4、将目标类和切面类的对象创建权交给 spring 

5、在 applicationContext.xml 中配置织入关系

6、测试代码



**1、导入AOP相关坐标**

```xml
<!--导入spring的context坐标，context依赖aop-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<!-- aspectj的织入 -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.4</version>
</dependency>
```

**2、创建目标接口和目标类（内部有切点）** 

接口

```java
public interface TargetInterface {
    public void save();
}
```

目标类

```java
public class Target implements TargetInterface {
    public void save() {
        System.out.println("save running.....");
    }
}
```

**3、创建切面类（内部有增强方法）** 

```java
public class MyAspect {

    public void before() {
        System.out.println("前置增强..........");
    }

    public void afterReturning() {
        System.out.println("后置增强..........");
    }

    //Proceeding JoinPoint:  正在执行的连接点===切点
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕前增强....");
        Object proceed = pjp.proceed();//切点方法
        System.out.println("环绕后增强....");
        return proceed;
    }

    public void afterThrowing() {
        System.out.println("异常抛出增强..........");
    }

    public void after() {
        System.out.println("最终增强..........");
    }

}
```

**4、将目标类和切面类的对象创建权交给 spring** 

在`applicationContext.xml`中配置Bean

```xml
<!--配置目标类-->
<bean id="target" class="com.itheima.aop.Target"></bean>

<!--配置切面类-->
<bean id="myAspect" class="com.itheima.aop.MyAspect"></bean>
```

**5、在 applicationContext.xml 中配置织入关系**

导入aop命名空间

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
">
```

配置切点表达式和前置增强的织入关系：

```xml
    <!--配置织入：告诉spring框架 哪些方法(切点)需要进行哪些增强(前置、后置...)-->
    <aop:config>
        <!--声明切面-->
        <aop:aspect ref="myAspect">
		   <!--配置Target的save方法执行时要进行myAspect的before方法前置增强--> 
            <aop:before method="before" pointcut="execution(public void com.itheima.aop.Target.save())"/>
        </aop:aspect>
    </aop:config>
```

**6、测试代码**

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class AopTest {

    @Autowired
    private TargetInterface target;

    @Test
    public void test1() {
        target.save();
    }   
}
```

#### 9.2.2 XML 配置 AOP 详解

##### 9.1）切点表达式的写法

 表达式语法：

```
execution([修饰符] 返回值类型 包名.类名.方法名(参数))
```

- 访问修饰符可以省略 
- 返回值类型、包名、类名、方法名可以使用星号* 代表任意 
- 包名与类名之间一个点 `.` 代表当前包下的类，两个点 `..` 表示当前包及其子包下的类
- 参数列表可以使用两个点 `..` 表示任意个数，任意类型的参数列表

```shell
### 全
execution(public void com.itheima.aop.Target.method()) 
### 任意方法任意参数
execution(void com.itheima.aop.Target.*(..)) 
### 任意返回值com.itheima.aop包下任意类任意方法任意参数
execution(* com.itheima.aop.*.*(..)) 
### 你故意找茬是吧
execution(* *..*.*(..))
```

##### 9.2）通知的类型

通知的配置语法：

```xml
<aop:通知类型 method="切面类中方法名" pointcut="切点表达式"></aop:通知类型>
```



| 名称         | 标签                    | 说明                                                         |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| 前置通知     | `<aop:before>`          | 用于配置前置通知。指定增强的方法在切入点方法之前执行         |
| 后置通知     | `<aop:after-returning>` | 用于配置后置通知。指定增强的方法在切入点方法之后执行         |
| 环绕通知     | `<aop:around>`          |   于配置环绕通知。指定增强的方法在切入点方法之前和之后都 执行                                                           |
| 异常抛出通知 | `<aop:throwing>`        |   用用于配置异常抛出通知。指定增强的方法在出现异常时执行                                                           |
| 最终通知     | `<aop:after>`           | 用于配置最终通知。无论增强方式执行是否有异常都会执行 |

##### 9.3）切点表达式的抽取

当多个增强的切点表达式相同时，可以将切点表达式进行抽取，在增强中使用 `pointcut-ref` 属性代替 `pointcut` 属性来引用抽取后的切点表达式。

```xml
<aop:config>
    <!--引用myAspect的Bean为切面对象-->
    <aop:aspect ref="myAspect">
        <!--抽取切点表达式-->
        <aop:pointcut id="myPointcut" expression="execution(* com.itheima.aop.*.*(..))"></aop:pointcut>
        <aop:around method="around" pointcut-ref="myPointcut"/>
        <aop:after method="after" pointcut-ref="myPointcut"/>
    </aop:aspect>
</aop:config>
```

通知方法存在于切面类中，根据切点表达式，对切点增强。

### 9.3. 基于注解的AOP开发

#### 9.3.1 快速入门 

**步骤：** 
1、创建目标接口和目标类（内部有切点） 
2、创建切面类（内部有增强方法） 
3、将目标类和切面类的对象创建权交给 spring 
4、在切面类中使用注解配置织入关系 
5、在配置文件中开启组件扫描和 AOP 的自动代理
6、测试



**1、创建目标接口和目标类（内部有切点）** 

```java
public interface TargetInterface {
    public void save();
}
```

```java
public class Target implements TargetInterface {
    public void save() {
        System.out.println("save running.....");
    }
}
```

**2、创建切面类（内部有增强方法）** 

```java
public class MyAspect { 
    //前置增强方法 
    public void before(){ 
        System.out.println("前置代码增强.....");
	}
}
```

**3、将目标类和切面类的对象创建权交给 spring** 

配置相应注解 `@Component`

**4、在切面类中使用注解配置织入关系**

```java
@Component("myAspect")
@Aspect //标注当前MyAspect是一个切面类
public class MyAspect {
    //配置前置通知
    @Before("execution(* com.itheima.anno.*.*(..))")
    public void before(){
        System.out.println("前置增强..........");
    }
}
```

 **5、在配置文件中开启组件扫描和 AOP 的自动代理**

```xml
<!--组件扫描-->
<context:component-scan base-package="com.itheima.anno"/>

<!--aop自动代理-->
<aop:aspectj-autoproxy/>
```

**6、测试**

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class AnnoTest {

    @Autowired
    private TargetInterface target;

    @Test
    public void test1() {
        target.save();
    }
}
```

#### 9.3.2 注解配置 AOP 详解

##### 9.1）注解通知的类型

通知的配置语法：`@通知注解("切点表达式")`

| 名称         | 注解             | 说明                                                         |
| ------------ | ---------------- | ------------------------------------------------------------ |
| 前置通知     | `@Before`        | 用于配置前置通知。指定增强的方法在切入点方法之前执行         |
| 后置通知     | `@AfterReturning` | 用于配置后置通知。指定增强的方法在切入点方法之后执行         |
| 环绕通知     | `@Around`         | 用于配置环绕通知。指定增强的方法在切入点方法之前和之后都执行 |
| 异常抛出通知 | `@AfterThrowing`  | 用于配置异常抛出通知。指定增强的方法在出现异常时执行         |
| 最终通知     | `@After`          | 用于配置最终通知。无论增强方式执行是否有异常都会执行         |

##### 9.2）切点表达式的抽取

通xml 配置 aop 一样，我们可以将切点表达式抽取。**抽取方式是在切面内定义方法**，在该方法上使用`@Pointcut` 注解定义切点表达式，然后在在增强注解中进行引用。具体如下：

```java
@Component("myAspect")
@Aspect //标注当前MyAspect是一个切面类
public class MyAspect {

    //Proceeding JoinPoint:  正在执行的连接点===切点
    //@Around("execution(* com.itheima.anno.*.*(..))")
    @Around("pointcut()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕前增强....");
        Object proceed = pjp.proceed();//切点方法
        System.out.println("环绕后增强....");
        return proceed;
    }

    public void afterThrowing() {
        System.out.println("异常抛出增强..........");
    }

    //@After("execution(* com.itheima.anno.*.*(..))")
    @After("MyAspect.pointcut()")
    public void after() {
        System.out.println("最终增强..........");
    }

    //定义切点表达式
    @Pointcut("execution(* com.itheima.anno.*.*(..))")
    public void pointcut() {
    }
}
```



**疑问：**关于`@After("MyAspect.pointcut()")`一定会抛出的问题，如何解决？

## 9.补充：代理模式
**参考资料：**

[代理详解！静态代理+JDK/CGLIB 动态代理实战](https://javaguide.cn/java/basis/proxy.html)

[Java 动态代理作用是什么？ - bravo1988的回答 - 知乎](https://www.zhihu.com/question/20794107/answer/658139129) 



代理模式通过封装一个已有接口，并向调用方返回相同的接口类型，能让调用方在不改变任何代码的前提下增强某些功能（例如，鉴权、延迟加载、连接池复用等）。使用Proxy模式要求调用方持有接口，作为Proxy的类也必须实现相同的接口类型。



### 静态代理

为现有的每一个类都编写一个**对应的**代理类，并且让它实现和目标类相同的接口

![preview](https://gitlab.com/apzs/image/-/raw/master/image/202203242117464.png)

在创建代理对象时，通过构造器塞入一个目标对象，然后在代理对象的方法内部调用目标对象同名方法，并在调用前后打印日志。

也就是说，**代理对象 = 增强代码 + 目标对象（原对象）**。

有了代理对象后，就不用原对象了

![preview](https://gitlab.com/apzs/image/-/raw/master/image/202203242117251.jpeg)



![img](https://gitlab.com/apzs/image/-/raw/master/image/v2-28223a1c03c1800052a5dfe4e6cb8c53_720w.jpg?source=1940ef5c)



### 动态代理

![preview](https://gitlab.com/apzs/image/-/raw/master/image/202203242117140.jpeg)

JDK提供了`java.lang.reflect.InvocationHandler`接口和`java.lang.reflect.Proxy`类，这两个类相互配合，入口是Proxy。

Proxy有个静态方法：`getProxyClass(ClassLoader, interfaces)`，只要你给它传入类加载器和一组接口，它就给你返回代理Class对象。

用通俗的话说，`getProxyClass()`这个方法，会从你传入的接口Class中，“拷贝”类结构信息到一个新的Class对象中，但新的Class对象带有构造器，是可以创建对象的。所以，一旦我们明确接口，完全可以通过接口的Class对象，创建一个代理Class，通过代理Class即可创建代理对象。

![img](https://gitlab.com/apzs/image/-/raw/master/image/202203242121130.jpeg)

根据代理Class的构造器创建对象时，需要传入`InvocationHandler`。通过构造器传入一个引用，那么必然有个成员变量去接收。没错，代理对象的内部确实有个成员变量`invocationHandler`，而且代理对象的每个方法内部都会调用`handler.invoke()`！InvocationHandler对象成了代理对象和目标对象的桥梁，不像静态代理这么直接。

![preview](https://gitlab.com/apzs/image/-/raw/master/image/202203242145053.jpeg)



#### 基于JDK的动态代理

```java
public class ProxyTest {
	public static void main(String[] args) throws Throwable {
		CalculatorImpl target = new CalculatorImpl();
        //传入目标对象
        //目的：1.根据它实现的接口生成代理对象 2.代理对象调用目标对象方法
        // Calculator是接口类型
		Calculato calculatorProxy = (Calculator) getProxy(target);
		calculatorProxy.add(1, 2);
		calculatorProxy.subtract(2, 1);
	}

	private static Object getProxy(final Object target) throws Exception {
		//参数1：随便找个类加载器给它， 参数2：目标对象实现的接口，让代理对象实现相同接口
		Class proxyClazz = Proxy.getProxyClass(target.getClass().getClassLoader(), target.getClass().getInterfaces());
		Constructor constructor = proxyClazz.getConstructor(InvocationHandler.class);
		Object proxy = constructor.newInstance(new InvocationHandler() {
			@Override
			public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
				System.out.println(method.getName() + "方法开始执行...");
				Object result = method.invoke(target, args);
				System.out.println(result);
				System.out.println(method.getName() + "方法执行结束...");
				return result;
			}
		});
		return proxy;
	}
}
```

不过实际编程中，一般不用`getProxyClass()`，而是使用Proxy类的另一个静态方法：`Proxy.newProxyInstance()`，直接返回代理实例，连中间得到代理Class对象的过程都帮你隐藏：

```java
private static Object getProxy(final Object target) throws Exception {
    Object proxy = Proxy.newProxyInstance(
        target.getClass().getClassLoader(),/*类加载器*/
        target.getClass().getInterfaces(),/*让代理对象和目标对象实现相同接口*/
        new InvocationHandler(){/*代理对象的方法最终都会被JVM导向它的invoke方法*/
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println(method.getName() + "方法开始执行...");
                Object result = method.invoke(target, args);
                System.out.println(result);
                System.out.println(method.getName() + "方法执行结束...");
                return result;
            }
        }
    );
    return proxy;
}
```

![preview](https://gitlab.com/apzs/image/-/raw/master/image/202203242154855.jpeg)



## 10.声明式事务控制
### 10.1. 编程式事务控制相关对象（只需要了解）

#### 10.1.1 PlatformTransactionManager

`PlatformTransactionManager` 接口是spring 的事务管理器，它里面提供了我们常用的操作事务的方法。

| 方法                                                         | 说明               |
| ------------------------------------------------------------ | ------------------ |
| `TransactionStatus getTransaction(TransactionDefination defination)` | 获取事务的状态信息 |
| `void commit(TransactionStatus status)`                      | 提交事务           |
| `void rollback(TransactionStatus status)`                    | 回滚事务           |

==注意：==

PlatformTransactionManager 是接口类型，不同的 Dao 层技术则有不同的实现类，例如：

Dao 层技术是 jdbc 或 mybatis 时：`org.springframework.jdbc.datasource.DataSourceTransactionManager`
Dao 层技术是 hibernate 时：`org.springframework.orm.hibernate5.HibernateTransactionManager`

#### 10.1.2 TransactionDefinition

TransactionDefinition 是事务的定义信息对象，里面有如下方法： 

| 方法                           | 说明               |
| ------------------------------ | ------------------ |
| `int getIsolationLevel()`      | 获得事务的隔离级别 |
| `int getPropogationBehavior()` | 获得事务的传播行为 |
| `int getTimeout()`             | 获得超时时间       |
| `boolean isReadOnly()`         | 是否只读           |



**1）事务隔离级别** 

设置隔离级别，可以解决事务并发产生的问题，如脏读、不可重复读和虚读。

- ISOLATION_DEFAULT 
- ISOLATION_READ_UNCOMMITTED 
- ISOLATION_READ_COMMITTED 
- ISOLATION_REPEATABLE_READ
- ISOLATION_SERIALIZABLE



**2）事务传播行为**

- REQUIRED：如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。一般的选择（默认值） 

- SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行（没有事务） 

- MANDATORY：使用当前的事务，如果当前没有事务，就抛出异常 

- REQUERS_NEW：新建事务，如果当前在事务中，把当前事务挂起。 

- NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起 

- NEVER：以非事务方式运行，如果当前存在事务，抛出异常 

- NESTED：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行 REQUIRED 类似的操作 

- 超时时间：默认值是-1，没有超时限制。如果有，以秒为单位进行设置

- 是否只读：建议查询时设置为只读

#### 10.1.3 TransactionStatus

TransactionStatus 接口提供的是事务具体的运行状态，方法介绍如下：

| 方法                         | 说明           |
| ---------------------------- | -------------- |
| `boolean hasSavepoint()`     | 是否存储回滚点 |
| `boolean isCompleted()`      | 事务是否完成   |
| `boolean isNewTransaction()` | 是否是新事务   |
| `boolean isRollbackOnly()`   | 事务是否回滚   |



### 10.2. 基于 XML 的声明式事务控制

#### 10.2.1 什么是声明式事务控制

Spring 的声明式事务顾名思义就是采用声明的方式来处理事务。这里所说的声明，就是指在配置文件中声明 ，用在 Spring 配置文件中声明式的处理事务来代替代码式的处理事务。

**声明式事务处理的作用**

- 事务管理不侵入开发的组件。具体来说，业务逻辑对象就不会意识到正在事务管理之中，事实上也应该如此，因为事务管理是属于系统层面的服务，而不是业务逻辑的一部分，如果想要改变事务管理策划的话， 也只需要在定义文件中重新配置即可
- 在不需要事务管理的时候，只要在设定文件上修改一下，即可移去事务管理服务，无需改变代码重新编译 ，这样维护起来极其方便

==注意：Spring 声明式事务控制底层就是AOP。==



#### 10.2.2 声明式事务控制的实现

声明式事务控制明确事项： 

- 谁是切点？ 

- 谁是通知？

- 配置切面？



以简单的转账操作为例

**1、引入tx命名空间**

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
       http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd
">
```

**2、配置事务增强**

在`applicationContext.xml`中进行配置

```xml
<!--配置平台事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

<!--事务增强配置-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="*"/>
    </tx:attributes>
</tx:advice>
```

**3、配置事务 AOP 织入**

```xml
<!--配置事务的aop织入-->
<aop:config>
    <aop:pointcut id="txPointcut" expression="execution(* com.itheima.service.impl.*.*(..))"/>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>
</aop:config>
```

**4、测试事务控制转账业务代码**

```java
public class AccountServiceImpl implements AccountService {

    private AccountDao accountDao;

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public void transfer(String outMan, String inMan, double money) {
        accountDao.out(outMan, money);
        int i = 1 / 0; // 人为制造错误
        accountDao.in(inMan, money);
    }
}
```



#### 10.2.3 切点方法的事务参数的配置

```xml
<!--事务增强配置-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <!--设置事务的属性信息的-->
    <tx:attributes>
        <tx:method name="transfer" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>
        <tx:method name="save" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>
        <tx:method name="findAll" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="true"/>
        <tx:method name="update*" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="true"/>
        <tx:method name="*"/>
    </tx:attributes>
</tx:advice>
```



其中，`<tx:method>` 代表切点方法的事务参数的配置，例如： 

```xml
<tx:method name="transfer" isolation="REPEATABLE_READ" propagation="REQUIRED" timeout="-1" read-only="false"/>
```

- name：切点方法名称 
- isolation:事务的隔离级别 
- propogation：事务的传播行为 
- timeout：超时时间
- read-only：是否只读

### 10.3. 基于注解的声明式事务控制

**1、首先在`applicationContext。xml`中进行组件扫描：**

```xml
<context:component-scan base-package="com.itheima"/>
```



**2、编写 AccoutDao**

```java
@Repository("accountDao")
public class AccountDaoImpl implements AccountDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void out(String outMan, double money) {
        jdbcTemplate.update("update account set money=money-? where name=?", money, outMan);
    }

    public void in(String inMan, double money) {
        jdbcTemplate.update("update account set money=money+? where name=?", money, inMan);
    }
}
```



**3、编写 AccoutService**

```java
@Service("accountService")
@Transactional(isolation = Isolation.REPEATABLE_READ)
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void transfer(String outMan, String inMan, double money) {
        accountDao.out(outMan, money);
        int i = 1 / 0;
        accountDao.in(inMan, money);
    }
}
```

- 使用 `@Transactional` 在需要进行事务控制的类或是方法上修饰，注解可用的属性同 xml 配置方式，例如隔离级别、传播行为等。
- 注解使用在类上，那么该类下的所有方法都使用同一套注解参数配置。
- 使用在方法上，不同的方法可以采用不同的事务参数配置。
- Xml配置文件中要开启事务的注解驱动 `<tx:annotation-driven />`



**4、配置事务的注解驱动**

```xml
<!-- 之前省略datsSource、jdbcTemplate、平台事务管理器的配置--> 
<!--事务的注解驱动-->
<tx:annotation-driven/>
```

## 11.MyBatis入门操作
### 11.1. MyBatis的简介 

####  原始jdbc操作的分析

**原始jdbc开发存在的问题如下：**

1、数据库连接创建、释放频繁造成系统资源浪费从而影响系统性能 
2、sql 语句在代码中硬编码，造成代码不易维护，实际应用 sql 变化的可能较大，sql 变动需要改变java代码。 
3、查询操作时，需要手动将结果集中的数据手动封装到实体中。插入操作时，需要手动将实体的数据设置到 sql 语句的占位符位置

**应对上述问题给出的解决方案： **

1、使用数据库连接池初始化连接资源
2、将sql语句抽取到xml配置文件中
3、使用反射、内省等底层技术，自动将实体与表进行属性与字段的自动映射

#### 什么是MyBatis？

- MyBatis是一个优秀的基于java的持久层框架，它内部封装了 jdbc，使开发者只需要关注sql语句本身，而不需要花费精力去处理加载驱动、创建连接、创建statement等繁杂的过程。
- MyBatis通过xml或注解的方式将要执行的各种 statement配置起来，并通过java对象和statement中sql的动态参数进行映射生成最终执行的sql语句。
- 最后MyBatis框架执行sql并将结果映射为java对象并返回。采用ORM思想解决了实体和数据库映射的问题，对jdbc 进行了 封装，屏蔽了jdbc api 底层访问细节，使我们不用与jdbc api打交道，就可以完成对数据库的持久化操作。

> MyBatis参考文档：https://mybatis.org/mybatis-3/zh/index.html

### 11.2. MyBatis的快速入门 

**MyBatis开发步骤：** 

1）添加MyBatis的坐标 
2）创建user数据表 
3）编写User实体类 
4）编写映射文件UserMapper.xml 
5）编写核心文件SqlMapConfig.xml
6）编写测试类

#### 环境搭建

**1、导入MyBatis的坐标和其他相关坐标**

```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>x.x.x</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

**2、创建user数据表**

**3、创建User实体类**

```java
public class User {

    private int id;
    private String username;
    private String password;
    // 省略set,get方法
}
```

**4、编写UserMapper映射文件**

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="userMapper">
    <!--查询操作-->
    <select id="findAll" resultType="com.itheima.domain.User">
        select * from user
    </select>
</mapper>
```



**5、编写MyBatis核心文件**

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!--通过properties标签加载外部properties文件-->
    <properties resource="jdbc.properties"></properties>

    <!--数据源环境-->
    <environments default="developement">
        <environment id="developement">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    
    <!--加载映射文件-->
    <mappers>
        <mapper resource="com/itheima/mapper/UserMapper.xml"></mapper>
    </mappers>

</configuration>
```



#### 编写测试代码

以测试查询list为例：

```java
// 加载核心配置文件(路径相对于resources目录)
InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
// 获得sqlSession工厂对象
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
// 获得sqlSession对象
SqlSession sqlSession = sqlSessionFactory.openSession();
// 执行sql语句 参数：namespace+id
List<User> userList = sqlSession.selectList("userMapper.findAll");
// 打印结果
System.out.println(userList);
// 释放资源
sqlSession.close();
```

### 11.3. MyBatis的映射文件概述 

![image-20220328153847489](https://gitlab.com/apzs/image/-/raw/master/image/202203281538556.png)

### 11.4. MyBatis的增删改查操作 

#### 插入操作

**编写UserMapper.xml**

```xml-dtd
<!--插入操作-->
<insert id="save" parameterType="com.itheima.domain.User">
	insert into user values(#{id},#{username},#{password})
</insert>
```



> 注意区分`${}`和`#{}`
>
> `${}` 是 Properties ⽂件中的变量占位符，它可以⽤于标签属性值和 sql 内部，属于静态⽂本替换，⽐如`${driver}`会被静态替换为 `com.mysql.jdbc.Driver` 。 
>
> `#{}` 是 sql 的参数占位符，Mybatis 会将 sql 中的 `#{}` 替换为`?`号，在 sql 执⾏前会使⽤PreparedStatement 的参数设置⽅法，按序给 sql 的`?`号占位符设置参数值，⽐如 `ps.setInt(0, parameterValue)`， `#{item.name}` 的取值⽅式为使⽤反射从参数对象中获取，item 对象的 name 属性值，相当于 `param.getItem().getName()` 。

**编写插入实体User的代码**

```java
@Test
//插入操作
public void test2() throws IOException {

    //模拟user对象
    User user = new User();
    user.setUsername("xxxx");
    user.setPassword("abc");

    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    sqlSession.insert("userMapper.save", user);
    //mybatis执行更新操作  提交事务
    sqlSession.commit();
    sqlSession.close();
}
```



**插入操作注意问题** 

- 插入语句使用insert标签 

- 在映射文件中使用`parameterType`属性指定要插入的数据类型 

- Sql语句中使用`#{实体属性名}`方式引用实体中的属性值 

- 插入操作使用的API是`sqlSession.insert(“命名空间.id”,实体对象); `

- 插入操作涉及数据库数据变化，所以要使用sqlSession对象显示的提交事务，即`sqlSession.commit()`

#### 删除操作

**编写UserMapper.xml**

```xml-dtd
<!--删除操作-->
<delete id="delete" parameterType="int">
	delete from user where id=#{id}
</delete>
```

**编写删除数据的代码**

```java
@Test
//删除操作
public void test4() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    sqlSession.delete("userMapper.delete", 8);
    sqlSession.commit();
    sqlSession.close();
}
```

**删除操作注意问题** 

- 删除语句使用delete标签 
- Sql语句中使用#{任意字符串}方式引用传递的单个参数
- 删除操作使用的API是`sqlSession.delete(“命名空间.id”,Object);`

#### 查询操作

**编写UserMapper.xml**

```xml-dtd
<!--查询操作-->
<select id="findAll" resultType="user">
	select * from user
</select>

<!--根据id进行查询-->
<select id="findById" resultType="user" parameterType="int">
	select * from user where id=#{id}
</select>
```

单个查询和列表查询

```java
@Test
//查询一个对象
public void test5() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    User user = sqlSession.selectOne("userMapper.findById", 1);
    System.out.println(user);
    sqlSession.close();
}

@Test
//查询列表
public void test1() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    List<User> userList = sqlSession.selectList("userMapper.findAll");
    System.out.println(userList);
    sqlSession.close();
}
```

#### 修改操作

```xml-dtd
<!--修改操作-->
<update id="update" parameterType="com.itheima.domain.User">
	update user set username=#{username},password=#{password} where id=#{id}
</update>
```

```java
@Test
//修改操作
public void test3() throws IOException {

    //模拟user对象
    User user = new User();
    user.setId(7);
    user.setUsername("lucy");
    user.setPassword("123");

    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    //执行操作  参数：namespace+id
    sqlSession.update("userMapper.update", user);
    sqlSession.commit();
    sqlSession.close();
}
```

**修改操作注意问题** 

- 修改语句使用update标签
- 修改操作使用的API是`sqlSession.update(“命名空间.id”,实体对象);`

### 11.5. MyBatis的核心配置文件概述

#### MyBatis核心配置文件层级关系

MyBatis 的配置文件包含了会深深影响 MyBatis 行为的设置和属性信息。 配置文档的顶层结构如下：

- configuration（配置）
  - [properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)
  - [settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
  - [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)
  - [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
  - [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
  - [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
  - [environments（环境配置）](https://mybatis.org/mybatis-3/zh/configuration.html#environments)
    - environment（环境变量）
      - transactionManager（事务管理器）
      - dataSource（数据源）
  - [databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)
  - [mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

#### MyBatis常用配置解析

##### 11.1) environments标签

![image-20220328161136702](https://gitlab.com/apzs/image/-/raw/master/image/202203281611764.png)

**事务管理器（transactionManager）**

在 MyBatis 中有两种类型的事务管理器（也就是 type="[JDBC|MANAGED]"）：

- JDBC – 这个配置直接使用了 JDBC 的提交和回滚设施，它依赖从数据源获得的连接来管理事务作用域。

- MANAGED – 这个配置几乎没做什么。它从不提交或回滚一个连接，而是让容器来管理事务的整个生命周期（比如 JEE 应用服务器的上下文）。 默认情况下它会关闭连接。然而一些容器并不希望连接被关闭，因此需要将 closeConnection 属性设置为 false 来阻止默认的关闭行为。例如:

  ```xml
  <transactionManager type="MANAGED">
    <property name="closeConnection" value="false"/>
  </transactionManager>
  ```



数据源（dataSource）类型有三种： 

- UNPOOLED：这个数据源的实现只是每次被请求时打开和关闭连接。
- POOLED：这种数据源的实现利用“池”的概念将 JDBC 连接对象组织起来。 
- JNDI：这个数据源的实现是为了能在如 EJB 或应用服务器这类容器中使用，容器可以集中或在外部配置数据源，然后放置一个 JNDI 上下文的引用。



##### 11.2）mapper标签 

该标签的作用是加载映射的，需要告诉 MyBatis 到哪里去找到这些sql语句。

加载方式有如下几种： 

- **使用相对于类路径的资源引用，例如：`<mapper resource="org/mybatis/builder/AuthorMapper.xml"/>`**
- 使用完全限定资源定位符（URL），例如：`<mapper url="file:///var/mappers/AuthorMapper.xml"/>`
- 使用映射器接口实现类的完全限定类名，例如：`<mapper class="org.mybatis.builder.AuthorMapper"/>`
- 将包内的映射器接口实现全部注册为映射器，例如：`<package name="org.mybatis.builder"/>`



##### 11.3）properties标签

![image-20220328161922306](https://gitlab.com/apzs/image/-/raw/master/image/202203281619376.png)



##### 11.4）typeAliases标签

![image-20220328162349123](https://gitlab.com/apzs/image/-/raw/master/image/202203281623188.png)

下面是一些为常见的 Java 类型内建的类型别名。它们都是不区分大小写的，注意，为了应对原始类型的命名重复，采取了特殊的命名风格。

| 别名       | 映射的类型 |
| :--------- | :--------- |
| _byte      | byte       |
| _long      | long       |
| _short     | short      |
| _int       | int        |
| _integer   | int        |
| _double    | double     |
| _float     | float      |
| _boolean   | boolean    |
| string     | String     |
| byte       | Byte       |
| long       | Long       |
| short      | Short      |
| int        | Integer    |
| integer    | Integer    |
| double     | Double     |
| float      | Float      |
| boolean    | Boolean    |
| date       | Date       |
| decimal    | BigDecimal |
| bigdecimal | BigDecimal |
| object     | Object     |
| map        | Map        |
| hashmap    | HashMap    |
| list       | List       |
| arraylist  | ArrayList  |
| collection | Collection |
| iterator   | Iterator   |

### 11.6. MyBatis的相应API

#### SqlSession工厂构建器SqlSessionFactoryBuilder

常用API：`SqlSessionFactory build(InputStream inputStream) `

通过加载mybatis的核心文件的输入流的形式构建一个SqlSessionFactory对象

```java
String resource = "org/mybatis/example/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

其中， Resources 工具类，这个类在 `org.apache.ibatis.io` 包中。Resources 类帮助你从类路径下、文件系统或 一个 web URL 中加载资源文件。

#### SqlSession工厂对象SqlSessionFactory

```java
SqlSession openSession()
SqlSession openSession(boolean autoCommit) // 参数为是否自动提交，如果设置为true，那么不需要手动提交事务
```

默认的 openSession() 方法没有参数，它会创建具备如下特性的 SqlSession：

- 事务作用域将会开启（也就是不自动提交）。
- 将由当前环境配置的 DataSource 实例中获取 Connection 对象。
- 事务隔离级别将会使用驱动或数据源的默认设置。
- 预处理语句不会被复用，也不会批量处理更新。

#### SqlSession会话对象

SqlSession 在 MyBatis 中是非常强大的一个类。它包含了所有执行语句、提交或回滚事务以及获取映射器实例的方法。

##### 语句执行方法

这些方法被用来执行定义在 SQL 映射 XML 文件中的 SELECT、INSERT、UPDATE 和 DELETE 语句。你可以通过名字快速了解它们的作用，每一方法都接受语句的 ID 以及参数对象，参数可以是原始类型（支持自动装箱或包装类）、JavaBean、POJO 或 Map。

```java
<T> T selectOne(String statement, Object parameter)
<E> List<E> selectList(String statement, Object parameter)
<T> Cursor<T> selectCursor(String statement, Object parameter)
<K,V> Map<K,V> selectMap(String statement, Object parameter, String mapKey)
int insert(String statement, Object parameter)
int update(String statement, Object parameter)
int delete(String statement, Object parameter)
```

selectOne 和 selectList 的不同仅仅是 selectOne 必须返回一个对象或 null 值。如果返回值多于一个，就会抛出异常。如果你不知道返回对象会有多少，请使用 selectList。如果需要查看某个对象是否存在，最好的办法是查询一个 count 值（0 或 1）。selectMap 稍微特殊一点，它会将返回对象的其中一个属性作为 key 值，将对象作为 value 值，从而将多个结果集转为 Map 类型值。由于并不是所有语句都需要参数，所以这些方法都具有一个不需要参数的重载形式。

##### 事务控制方法

有四个方法用来控制事务作用域。当然，如果你已经设置了自动提交或你使用了外部事务管理器，这些方法就没什么作用了。然而，如果你正在使用由 Connection 实例控制的 JDBC 事务管理器，那么这四个方法就会派上用场：

```java
void commit()
void commit(boolean force)
void rollback()
void rollback(boolean force)
```

默认情况下 MyBatis 不会自动提交事务，除非它侦测到调用了插入、更新或删除方法改变了数据库。如果你没有使用这些方法提交修改，那么你可以在 commit 和 rollback 方法参数中传入 true 值，来保证事务被正常提交（注意，在自动提交模式或者使用了外部事务管理器的情况下，设置 force 值对 session 无效）。大部分情况下你无需调用 rollback()，因为 MyBatis 会在你没有调用 commit 时替你完成回滚操作。不过，当你要在一个可能多次提交或回滚的 session 中详细控制事务，回滚操作就派上用场了。

##### 确保 SqlSession 被关闭

```java
void close()
```

对于你打开的任何 session，你都要保证它们被妥善关闭，这很重要。保证妥善关闭的最佳代码模式是这样的：

```java
SqlSession session = sqlSessionFactory.openSession();
try (SqlSession session = sqlSessionFactory.openSession()) {
    // 假设下面三行代码是你的业务逻辑
    session.insert(...);
    session.update(...);
    session.delete(...);
    session.commit();
}
```

## 12.MyBatis的Dao层实现方式
### 代理开发方式介绍 

采用Mybatis 的代理开发方式实现 DAO 层的开发，这种方式是我们后面进入企业的主流。 

Mapper 接口开发方法只需要程序员编写Mapper 接口（相当于Dao 接口），由Mybatis 框架根据接口定义创建接口的动态代理对象，代理对象的方法体同上边Dao接口实现类方法。 

Mapper 接口开发需要遵循以下规范： 

1、Mapper.xml文件中的namespace与mapper接口的全限定名相同 

2、Mapper接口方法名和Mapper.xml中定义的每个statement的id相同 

3、Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql的parameterType的类型相同

4、Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同



![image-20220328171122676](https://gitlab.com/apzs/image/-/raw/master/image/202203281711720.png)

(修正了原课件中的错误)



**Dao层（Mapper层）中只定义了接口**

```java
public interface UserMapper {

    public List<User> findAll() throws IOException;

    public User findById(int id);

}
```

```java
public class ServiceDemo {

    public static void main(String[] args) throws IOException {

        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
	    // 获得MyBatis框架生成的UserMapper接口的实现类
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> all = mapper.findAll();
        System.out.println(all);

        User user = mapper.findById(1);
        System.out.println(user);

    }
}
```

## 13.MyBatis映射文件深入（动态SQL）
### 13.1. 动态SQL语句

动态 SQL 是 MyBatis 的强大特性之一。如果你使用过 JDBC 或其它类似的框架，你应该能理解根据不同条件拼接 SQL 语句有多痛苦，例如拼接时要确保不能忘记添加必要的空格，还要注意去掉列表最后一个列名的逗号。利用动态 SQL，可以彻底摆脱这种痛苦。

使用动态 SQL 并非一件易事，但借助可用于任何 SQL 映射语句中的强大的动态 SQL 语言，MyBatis 显著地提升了这一特性的易用性。

如果你之前用过 JSTL 或任何基于类 XML 语言的文本处理器，你对动态 SQL 元素可能会感觉似曾相识。在 MyBatis 之前的版本中，需要花时间了解大量的元素。借助功能强大的基于 OGNL 的表达式，MyBatis 3 替换了之前的大部分元素，大大精简了元素种类，现在要学习的元素种类比原来的一半还要少。

#### if

使用动态 SQL 最常见情景是根据条件包含 where 子句的一部分。比如：

```xml-dtd
<select id="findActiveBlogWithTitleLike"
     resultType="Blog">
  SELECT * FROM BLOG
  WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
</select>
```

这条语句提供了可选的查找文本功能。如果不传入 “title”，那么所有处于 “ACTIVE” 状态的 BLOG 都会返回；如果传入了 “title” 参数，那么就会对 “title” 一列进行模糊查找并返回对应的 BLOG 结果（细心的读者可能会发现，“title” 的参数值需要包含查找掩码或通配符字符）。

如果希望通过 “title” 和 “author” 两个参数进行可选搜索该怎么办呢？

```xml
<select id="findActiveBlogLike"
     resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
  <if test="author != null and author.name != null">
    AND author_name like #{author.name}
  </if>
</select>
```

#### foreach

动态 SQL 的另一个常见使用场景是对集合进行遍历（**尤其是在构建 IN 条件语句的时候**）。

> 你可以将任何可迭代对象（如 List、Set 等）、Map 对象或者数组对象作为集合参数传递给 *foreach*。
>
> 当使用可迭代对象或者数组时，index 是当前迭代的序号，item 的值是本次迭代获取到的元素。当使用 Map 对象（或者 Map.Entry 对象的集合）时，index 是键，item 是值。

循环执行sql的拼接操作，例如：`SELECT * FROM USER WHERE id IN (1,2,5)`

```xml
<select id="findByIds" parameterType="list" resultType="user"> 
    select * from User 
    <where> 
        <foreach collection="array" open="id in(" close=")" item="id" separator=","> 
            #{id}
        </foreach> 
    </where>
</select>
```

测试代码：

```java
UserMapper mapper = sqlSession.getMapper(UserMapper.class);

//模拟ids的数据
List<Integer> ids = new ArrayList<Integer>();
ids.add(1);
ids.add(2);

List<User> userList = mapper.findByIds(ids);
System.out.println(userList);
```

out:

```
18:51:26,142 DEBUG JdbcTransaction:137 - Opening JDBC Connection
18:51:26,303 DEBUG PooledDataSource:406 - Created connection 959629210.
18:51:26,303 DEBUG JdbcTransaction:101 - Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@3932c79a]
18:51:26,305 DEBUG findByIds:159 - ==>  Preparing: select * from user WHERE id in( ? , ? ) 
18:51:26,333 DEBUG findByIds:159 - ==> Parameters: 1(Integer), 2(Integer)
18:51:26,364 DEBUG findByIds:159 - <==      Total: 2
[User{id=1, username='tom', password='123456'}, User{id=2, username='jerry', password='123456'}]
```



foreach标签的属性含义如下： 
`<foreach>`标签用于遍历集合，它的属性： 

- collection：代表要遍历的集合元素，注意编写时不要写`#{}`
- open：代表语句的开始部分 
- close：代表结束部分
- item：代表遍历集合的每个元素，生成的变量名
- sperator：代表分隔符



### 13.2. SQL语句抽取

可将重复的 sql 提取出来，使用时用 `<include>` 引用即可，最终达到 sql 重用的目的

`<sql>`标签：sql片段抽取

将上面的语句改成：

```xml
<!--sql语句抽取-->
<sql id="selectUser">select * from user</sql>

<select id="findByCondition" parameterType="user" resultType="user">
    <include refid="selectUser"></include>
    <where>
        <if test="id!=0">
            and id=#{id}
        </if>
        <if test="username!=null">
            and username=#{username}
        </if>
        <if test="password!=null">
            and password=#{password}
        </if>
    </where>
</select>

<select id="findByIds" parameterType="list" resultType="user">
    <include refid="selectUser"></include>
    <where>
        <foreach collection="list" open="id in(" close=")" item="id" separator=",">
            #{id}
        </foreach>
    </where>
</select>
```



## 14.MyBatis核心配置文件深入
### 类型处理器（typeHandlers）

> 官方文档：https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers

MyBatis 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时， 都会用类型处理器将获取到的值以合适的方式转换成 Java 类型。下表描述了一些默认的类型处理器。

**默认的类型处理器无需设置！**

| 类型处理器              | Java 类型                      | JDBC 类型                            |
| :---------------------- | :----------------------------- | :----------------------------------- |
| `BooleanTypeHandler`    | `java.lang.Boolean`, `boolean` | 数据库兼容的 `BOOLEAN`               |
| `ByteTypeHandler`       | `java.lang.Byte`, `byte`       | 数据库兼容的 `NUMERIC` 或 `BYTE`     |
| `ShortTypeHandler`      | `java.lang.Short`, `short`     | 数据库兼容的 `NUMERIC` 或 `SMALLINT` |
| `IntegerTypeHandler`    | `java.lang.Integer`, `int`     | 数据库兼容的 `NUMERIC` 或 `INTEGER`  |
| `LongTypeHandler`       | `java.lang.Long`, `long`       | 数据库兼容的 `NUMERIC` 或 `BIGINT`   |
| `FloatTypeHandler`      | `java.lang.Float`, `float`     | 数据库兼容的 `NUMERIC` 或 `FLOAT`    |
| `DoubleTypeHandler`     | `java.lang.Double`, `double`   | 数据库兼容的 `NUMERIC` 或 `DOUBLE`   |
| `BigDecimalTypeHandler` | `java.math.BigDecimal`         | 数据库兼容的 `NUMERIC` 或 `DECIMAL`  |
| `StringTypeHandler`     | `java.lang.String`             | `CHAR`, `VARCHAR`                    |
|`DateTypeHandler`	| `java.util.Date`	| `TIMESTAMP`|

==**提示** 从 3.4.5 开始，MyBatis 默认支持 JSR-310（日期和时间 API） 。==

你可以重写已有的类型处理器或创建你自己的类型处理器来处理不支持的或非标准的类型。 

具体做法为：实现`org.apache.ibatis.type.TypeHandler` 接口， 或继承一个很便利的类 `org.apache.ibatis.type.BaseTypeHandler`， 并且可以（可选地）将它映射到一个 JDBC 类型。

**需求举例：**

一个Java中的Date数据类型，我想将之存到数据库的时候存成一个1970年至今的毫秒数，取出来时转换成java的Date，即java的Date与数据库的毫秒值（bigint）之间转换。

**开发步骤：** 

1、定义转换类继承类`BaseTypeHandler<T>`
2、覆盖4个未实现的方法，其中`setNonNullParameter`为java程序设置数据到数据库的回调方法，`getNullableResult` 为查询时mysql的字符串类型转换成 java的Type类型的方法
3、在MyBatis核心配置文件中进行注册
4、测试转换是否正确



```java
public class DateTypeHandler extends BaseTypeHandler<Date> {
    // 将java类型转换成数据库需要的类型
    // int i表示表中第几个字段
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, Date date, JdbcType jdbcType) throws SQLException {
        long time = date.getTime();
        preparedStatement.setLong(i, time);
    }

    // 将数据库中类型转换成java类型
    // String参数  要转换的字段名称
    // ResultSet 查询出的结果集
    public Date getNullableResult(ResultSet resultSet, String s) throws SQLException {
        // 获得结果集中需要的数据(long) 转换成Date类型 返回
        long aLong = resultSet.getLong(s);
        Date date = new Date(aLong);
        return date;
    }

    // 将数据库中类型转换成java类型
    public Date getNullableResult(ResultSet resultSet, int i) throws SQLException {
        long aLong = resultSet.getLong(i);
        Date date = new Date(aLong);
        return date;
    }

    // 将数据库中类型转换成java类型
    public Date getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        long aLong = callableStatement.getLong(i);
        Date date = new Date(aLong);
        return date;
    }
}
```

> `public abstract long getLong(String columnLabel)`方法
>
> 检索此ResultSet对象的当前行中指定列的值，作为Java编程语言中的long返回



在`sqlMapConfig.xml`中注册自定义的类型处理器

```xml-dtd
<!--注册类型处理器-->
<typeHandlers>
	<typeHandler handler="com.itheima.handler.DateTypeHandler"></typeHandler>
</typeHandlers>
```

测试代码：

```java
@Test
public void test1() throws IOException {
	... // 省略获取mapper
    //创建user
    User user = new User();
    user.setUsername("ceshi1");
    user.setPassword("abcdf");
    user.setBirthday(new Date());
    //执行保存操作
    mapper.save(user);

    sqlSession.commit();
    sqlSession.close();
}
```

数据库中的数据

![image-20220328224924958](https://gitlab.com/apzs/image/-/raw/master/image/202203282249989.png)

其中birthday字段以bigint方式存储

对刚插入的数据进行查询：

```
user中的birthday：Mon Mar 28 22:07:51 HKT 2022
```

返回的数据又被封装为Date类型

疑问：在表的设计中，birthday字段采用varchar和bigint都顺利完成了转换，为什么呢？

### plugins标签（使用分页助手PageHelper）

MyBatis可以使用第三方的插件来对功能进行扩展，分页助手**PageHelper**是将分页的复杂操作进行封装，使用简单的方式即 可获得分页的相关数据 

开发步骤：
1、导入通用PageHelper的坐标
2、在mybatis核心配置文件中配置PageHelper插件
3、测试分页数据获取



**1、导入通用PageHelper的坐标**

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>3.7.5</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>com.github.jsqlparser</groupId>
    <artifactId>jsqlparser</artifactId>
    <version>0.9.1</version>
</dependency>
```



**2、在mybatis核心配置文件中配置PageHelper插件**

```xml
<!--配置分页助手插件-->
<!-- 注意：分页助手的插件 配置在通用mapper之前 -->
<plugins>
    <plugin interceptor="com.github.pagehelper.PageHelper">
        <!-- 指定方言 -->
        <property name="dialect" value="mysql"></property>
    </plugin>
</plugins>
```



**3、测试分页代码实现**

```java
@Test
public void test3() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    //设置分页相关参数   当前页+每页显示的条数
    PageHelper.startPage(3,2); // 每页显示两条数据，获取第3页的数据

    List<User> userList = mapper.findAll();
    for (User user : userList) {
        System.out.println(user);
    }

    //获得与分页相关参数
    PageInfo<User> pageInfo = new PageInfo<User>(userList);
    System.out.println("当前页："+pageInfo.getPageNum());
    System.out.println("每页显示条数："+pageInfo.getPageSize());
    System.out.println("总条数："+pageInfo.getTotal());
    System.out.println("总页数："+pageInfo.getPages());
    System.out.println("上一页："+pageInfo.getPrePage());
    System.out.println("下一页："+pageInfo.getNextPage());
    System.out.println("是否是第一个："+pageInfo.isIsFirstPage());
    System.out.println("是否是最后一个："+pageInfo.isIsLastPage());

    sqlSession.close();
}
```

## 15.MyBatis的多表操作
### 15.1. 一对一查询

**一对一查询的模型**

用户表和订单表的关系为，一个用户有多个订单，**一个订单只从属于一个用户** 

一对一查询的需求：查询一个订单，与此同时查询出该订单所属的用户

![image-20220328230414547](https://gitlab.com/apzs/image/-/raw/master/image/202203282304584.png)



**一对一查询的sql语句**

sql查询语句（inner join）：

```sql
select * from orders o,user u where o.uid=u.id;
```

查询结果：

![image-20220329101203744](https://gitlab.com/apzs/image/-/raw/master/image/202203291012772.png)

**创建Order和User实体**

在创建Order和User实体时，不使用主键/外键，而使用【面向对象】的思想。

```java
public class Order {

    private int id;
    private Date ordertime;
    private double total;

    //当前订单属于哪一个用户
    private User user;
    
    // 省略set,get方法
}
```

```java
public class User {

    private int id;
    private String username;
    private String password;
    private Date birthday;

    //描述的是当前用户存在哪些订单
    private List<Order> orderList;
    // 省略set,get方法
}
```

创建OrderMapper接口

```java
public interface OrderMapper {

    //查询所有的订单（包含订单的用户信息）
    public List<Order> findAll();

}
```

配置OrderMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.itheima.mapper.OrderMapper">

    <resultMap id="orderMap" type="order">
        <!--手动指定字段与实体属性的映射关系
            column: 数据表的字段名称
            property：实体的属性名称
        -->
        <id column="oid" property="id"></id>
        <result column="ordertime" property="ordertime"></result>
        <result column="total" property="total"></result>
        <!--
            property: 当前实体(order)中的属性名称(private User user)
            javaType: 当前实体(order)中的属性的类型(User)
        -->
        <association property="user" javaType="user">
            <id column="uid" property="id"></id>
            <result column="username" property="username"></result>
            <result column="password" property="password"></result>
            <result column="birthday" property="birthday"></result>
        </association>

    </resultMap>

    <select id="findAll" resultMap="orderMap">
         SELECT *,o.id oid FROM orders o,USER u WHERE o.uid=u.id
    </select>

</mapper>
```

测试代码：

```java
public void test1() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    SqlSession sqlSession = sqlSessionFactory.openSession();

    OrderMapper mapper = sqlSession.getMapper(OrderMapper.class);
    List<Order> orderList = mapper.findAll();
    for (Order order : orderList) {
        System.out.println(order);
    }
    sqlSession.close();
}
```

out：

```
Order{id=1, ordertime=Mon Mar 28 00:00:00 HKT 2022, total=3000.0, user=User{id=1, username='tom', password='123456', birthday=null, roleList=null}}
Order{id=2, ordertime=Mon Mar 28 00:00:00 HKT 2022, total=5000.0, user=User{id=1, username='tom', password='123456', birthday=null, roleList=null}}
Order{id=3, ordertime=Sat Jan 01 00:00:00 HKT 2022, total=10000.0, user=User{id=2, username='jerry', password='123456', birthday=null, roleList=null}}
Order{id=4, ordertime=Wed Feb 02 00:00:00 HKT 2022, total=100.0, user=User{id=3, username='lucy', password='123', birthday=null, roleList=null}}
```

### 15.2. 一对多查询

用户表和订单表的关系为，一个用户有多个订单，一个订单只从属于一个用户 

一对多查询的需求：查询一个用户，与此同时查询出该用户具有的订单

![image-20220329101310578](https://gitlab.com/apzs/image/-/raw/master/image/202203291013619.png)

**一对一查询的sql语句**

sql查询语句（left join）：

> LEFT JOIN 关键字从左表（table1）返回所有的行，即使右表（table2）中没有匹配。如果右表中没有匹配，则结果为 NULL。

```sql
select *,o.id oid from user u left join orders o on u.id=o.uid;
```

查询结果：

![image-20220329102237944](https://gitlab.com/apzs/image/-/raw/master/image/202203291022975.png)

实体类沿用一对一查询中的User，Order

**创建UserMapper接口：**

```java
public interface UserMapper {
    
    public List<User> findAll();
    
}
```

**配置UserMapper.xml：**

```xml
<resultMap id="userMap" type="user">
	<id column="id" property="id"></id>
	<result column="username" property="username"></result>
	<result column="password" property="password"></result>
	<result column="birthday" property="birthday"></result>
	<!--配置集合信息
		property:集合名称
		ofType：当前集合中的数据类型
	-->
	<collection property="orderList" ofType="order">
		<!--封装order的数据-->
		<id column="oid" property="id"></id>
		<result column="ordertime" property="ordertime"></result>
		<result column="total" property="total"></result>
	</collection>
</resultMap>

<select id="findAll" resultMap="userMap">
	SELECT *,o.id oid FROM USER u,orders o WHERE u.id=o.uid
</select>
```

注：已在sqlMaoConfig.xml中设置了实体类的别名，user的id不应该使用列uid，左连接会出现null

查询代码：

```java
List<User> userList = mapper.findAll();

for (User user : userList) {
    List<Order> orderList = user.getOrderList();
    if (orderList.isEmpty()) {
        continue;
    }
    System.out.println(user.getUsername());
    for (Order order : orderList) {
        System.out.println(order);
    }
    System.out.println("----------------------------------");
}
```

out：

```
tom
Order{id=1, ordertime=Mon Mar 28 00:00:00 HKT 2022, total=3000.0, user=null}
Order{id=2, ordertime=Mon Mar 28 00:00:00 HKT 2022, total=5000.0, user=null}
----------------------------------
jerry
Order{id=3, ordertime=Sat Jan 01 00:00:00 HKT 2022, total=10000.0, user=null}
----------------------------------
lucy
Order{id=4, ordertime=Wed Feb 02 00:00:00 HKT 2022, total=100.0, user=null}
```

### 15.3. 多对多查询

**多对多查询的模型** 

用户表和角色表的关系为，一个用户有多个角色，一个角色被多个用户使用
多对多查询的需求：查询用户同时查询出该用户的所有角色

![image-20220329105517612](https://gitlab.com/apzs/image/-/raw/master/image/202203291055661.png)

多对多查询的语句对应的sql语句：
```sql
SELECT *
FROM USER u, sys_user_role ur, sys_role r
WHERE u.id = ur.userId
	AND ur.roleId = r.id;
```
查询的结果如下：

![image-20220329110120904](https://gitlab.com/apzs/image/-/raw/master/image/202203291101934.png)



**创建Role实体，修改User实体**

```java
public class User {
	// ...
    //描述的是当前用户具备哪些角色
    private List<Role> roleList;
}
```

```java
public class Role {

    private int id;
    private String roleName;
    private String roleDesc;
}
```

**添加UserMapper接口方法** 

```java
List<User> findAllUserAndRole();
```

**配置UserMapper.xml：**

```xml
<resultMap id="userRoleMap" type="user">
	<!--user的信息-->
	<id column="userId" property="id"></id>
	<result column="username" property="username"></result>
	<result column="password" property="password"></result>
	<result column="birthday" property="birthday"></result>
	<!--user内部的roleList信息-->
	<collection property="roleList" ofType="role">
		<id column="roleId" property="id"></id>
		<result column="roleName" property="roleName"></result>
		<result column="roleDesc" property="roleDesc"></result>
	</collection>
</resultMap>

<select id="findUserAndRoleAll" resultMap="userRoleMap">
	SELECT * FROM USER u,sys_user_role ur,sys_role r WHERE u.id=ur.userId AND ur.roleId=r.id
</select>
```

**测试代码：**

```java
UserMapper mapper = sqlSession.getMapper(UserMapper.class);
List<User> userAndRoleAll = mapper.findUserAndRoleAll();
for (User user : userAndRoleAll) {
    System.out.println(user);
}
```

out:

```
User{id=1, username='tom', password='123456', birthday=null, orderList=null, 
	roleList=[Role{id=1, roleName='院长', roleDesc='负责全面工作'}, 
			 Role{id=2, roleName='研究员', roleDesc='课程研发工作'}]}
User{id=2, username='jerry', password='123456', birthday=null, orderList=null, 
	roleList=[Role{id=2, roleName='研究员', roleDesc='课程研发工作'}, 
			 Role{id=3, roleName='讲师', roleDesc='授课工作'}]}
```



**MyBatis多表配置方式： **

- 一对一配置：使用`<resultMap>`做配置 
- 一对多配置：使用`<resultMap>`+`<collection>`做配置
- 多对多配置：使用`<resultMap>`+`<collection>`做配置

## 16.MyBatis注解开发
### MyBatis的常用注解

`@Insert`：实现新增 
`@Update`：实现更新 
`@Delete`：实现删除 
`@Select`：实现查询 
`@Result`：实现结果集封装 
`@Results`：可以与`@Result` 一起使用，封装多个结果集 
`@One`：实现一对一结果集封装
`@Many`：实现一对多结果集封装



### MyBatis的增删改查

不使用注解的操作见：[12_MyBatis入门操作](./12_MyBatis入门操作.md)

在增删查改的测试代码部分，可以统一获取 UserMapper 对象

注意这里的`@Before`不是切面的注解，而是 junit 的注解。

`@Before` – 表示在任意使用@Test注解标注的public void方法执行之前执行

```java
public class MyBatisTest {

    private UserMapper mapper;

    @Before
    public void before() throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        mapper = sqlSession.getMapper(UserMapper.class);
    }

    @Test
    public void testSave() {
        User user = new User();
        user.setUsername("tom");
        user.setPassword("abc");
        mapper.save(user);
    }

    @Test
    public void testUpdate() {
        User user = new User();
        user.setId(18);
        user.setUsername("lucy");
        user.setPassword("123");
        mapper.update(user);
    }

    @Test
    public void testDelete() {
        mapper.delete(18);
    }

    @Test
    public void testFindById() {
        User user = mapper.findById(2);
        System.out.println(user);
    }

    @Test
    public void testFindAll() {
        List<User> all = mapper.findAll();
        for (User user : all) {
            System.out.println(user);
        }
    }
}
```



修改MyBatis的核心配置文件，因为我们使用了注解替代的映射文件，所以只需要加载使用了注解的Mapper接口即可。

```xml
<mappers> 
	<!--扫描使用注解的类--> 
	<mapper class="com.itheima.mapper.UserMapper"></mapper>
</mappers>
```
或者指定扫描包含映射关系的接口所在的包
```xml
<mappers> 
	<!--扫描使用注解的类所在的包--> 
	<package name="com.itheima.mapper"></package>
</mappers>
```

**不再使用userMapper.xml**



**增删查改的注解实现（配置在userMapper接口中）：**

```java
public interface UserMapper {
	// 插入
    @Insert("insert into user values(#{id},#{username},#{password},#{birthday})")
    public void save(User user);
	// 修改
    @Update("update user set username=#{username},password=#{password} where id=#{id}")
    public void update(User user);
	// 删除
    @Delete("delete from user where id=#{id}")
    public void delete(int id);
	// 查一条
    @Select("select * from user where id=#{id}")
    public User findById(int id);
	// 查列表
    @Select("select * from user")
    public List<User> findAll();
}
```



### MyBatis的注解实现复杂映射开发

实现复杂关系映射之前我们可以在映射文件中通过配置`<resultMap>`来实现，使用注解开发后，可以使用@Results注解 ，@Result注解，@One注解，@Many注解组合完成复杂关系的配置

| 注解                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| `@Results`                | 代替的是标签`<resultMap>`，该注解中可以使用单个@Result注解，也可以使用@Result集合。<br/>使用格式：`@Results({@Result()，@Result()})`或`@Results(@Result())` |
| `@Result`                 | 代替了`<id>`标签和`<result>`标签 <br/>@Result中属性介绍： <br/>column：数据库的列名 <br/>property：需要装配的属性名 <br/>one：需要使用的@One注解<br/>many：需要使用的@Many 注解 |
| `@One`（一对一） | 代替了`<assocation> `标签，是多表查询的关键，在注解中用来指定子查询返回单一对象。<br/> @One注解属性介绍： select: 指定用来多表查询的 sqlmapper<br/>使用格式：`@Result(column=" ",property="",one=@One(select=""))` |
| `@Many`（多对一）    | 代替了`<collection>`标签, 是是多表查询的关键，在注解中用来指定子查询返回对象集合。<br/> 使用格式：`@Result(property="",column="",many=@Many(select=""))` |



查询逻辑和 [15_MyBatis的多表操作](./15_MyBatis的多表操作.md) 中的完全相同，不再赘述。

#### 一对一查询

查询一个订单，与此同时查询出该订单所属的用户



对应的sql语句（逻辑上不完全对应）：

```sql
select * from orders;
select * from user where id=[查询出订单的uid];
```



使用注解配置OrderMapper接口

```java
@Select("select * from orders")
@Results({
    @Result(column = "id", property = "id"),
    @Result(column = "ordertime", property = "ordertime"),
    @Result(column = "total", property = "total"),
    @Result(
        property = "user", //要封装的属性名称
        column = "uid", //根据哪个字段去查询user表的数据
        javaType = User.class, //要封装的实体类型
        one = @One(select = "com.itheima.mapper.UserMapper.findById") //select属性 代表查询那个接口的方法获得数据
    )
})
public List<Order> findAll();
```



![image-20220329202617324](https://gitlab.com/apzs/image/-/raw/master/image/202203292026401.png)



下面是只做一次查询的写法

```java
@Select("select *,o.id oid from orders o,user u where o.uid=u.id")
@Results({
        @Result(column = "oid",property = "id"),
        @Result(column = "ordertime",property = "ordertime"),
        @Result(column = "total",property = "total"),
        @Result(column = "uid",property = "user.id"),
        @Result(column = "username",property = "user.username"),
        @Result(column = "password",property = "user.password")
})
public List<Order> findAll();
```



#### 一对多查询

一对多查询的需求：查询一个用户，与此同时查询出该用户具有的订单

对应的sql语句： 

```sql
select * from user;
select * from orders where uid=查询出用户的id;
```

使用注解配置UserMapper接口

```java
@Select("select * from user")
@Results({
    @Result(id = true, column = "id", property = "id"),
    @Result(column = "username", property = "username"),
    @Result(column = "password", property = "password"),
    @Result(
        property = "orderList",
        column = "id",
        javaType = List.class,
        many = @Many(select = "com.itheima.mapper.OrderMapper.findByUid")
    )
})
public List<User> findUserAndOrderAll();
```



![image-20220329204846253](https://gitlab.com/apzs/image/-/raw/master/image/202203292049849.png)

#### 多对多查询

多对多查询的需求：查询用户同时查询出该用户的所有角色

对应的sql语句： 

```sql
select * from user; 
select * from role r,user_role ur where r.id=ur.role_id and ur.user_id=用户的id
```

使用注解配置RoleMapper接口

```java
@Select("SELECT * FROM sys_user_role ur,sys_role r WHERE ur.roleId=r.id AND ur.userId=#{uid}")
public List<Role> findByUid(int uid);
```

使用注解配置UserMapper接口

```java
@Select("select * from user")
@Results({
    @Result(id = true, column = "id", property = "id"),
    @Result(column = "username", property = "username"),
    @Result(column = "password", property = "password"),
    @Result(
        property = "roleList",
        column = "id",
        javaType = List.class,
        many = @Many(select = "com.itheima.mapper.RoleMapper.findByUid")
    )
})
public List<User> findUserAndRoleAll();
```



![image-20220329210529679](https://gitlab.com/apzs/image/-/raw/master/image/202203292105760.png)

## 17.SSM整合
这一章的内容主要是对已学习内容和复习，并在此基础上进行优化。

### 17.1. 原始方式整合

创建数据库和表

```sql
create database ssm; 
create table account(
	id int primary key auto_increment, name varchar(100), money double(7,2)
);
```

插入一些数据

![image-20220329211200929](https://gitlab.com/apzs/image/-/raw/master/image/202203292112953.png)

创建带webapp的maven工程（略）

导入Maven坐标

编写实体类Account

```java
public class Account {

    private Integer id;
    private String name;
    private Double money;
    // 省略set,get,toString()方法
}
```

编写Mapper接口 AccountMapper.java

```java
public interface AccountMapper {
    public void save(Account account);
    public List<Account> findAll();
}
```

编写Service接口

```java
public interface AccountService {
    public void save(Account account);
    public List<Account> findAll();
}
```

编写Service接口实现（未整合方式）

```java
@Service("accountService")
public class AccountServiceImpl implements AccountService {
    public void save(Account account) {
        SqlSession sqlSession = MyBatisUtils.openSession();
        AccountMapper accountMapper = sqlSession.getMapper(AccountMapper.class);
        accountMapper.save(account);
        sqlSession.commit();
        sqlSession.close();
    }

    public List<Account> findAll() {
        SqlSession sqlSession = MyBatisUtils.openSession();
        AccountMapper accountMapper = sqlSession.getMapper(AccountMapper.class);
        return accountMapper.findAll();
    }
}
```

发现需要编写工具类获得SqlSession，手动获得mapper，手动管理事务的提交等等。

编写Controller

```java
@Controller
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    //保存
    @RequestMapping(value = "/save", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String save(Account account) {
        accountService.save(account);
        return "保存成功";
    }

    //查询
    @RequestMapping("/findAll")
    public ModelAndView findAll() {
        List<Account> accountList = accountService.findAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("accountList", accountList);
        modelAndView.setViewName("accountList");
        return modelAndView;
    }
}
```

编写增加和查列表的jsp页面

1）新增数据页面

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>添加账户信息表单</h1>
<form name="accountForm" action="${pageContext.request.contextPath}/account/save" method="post">
    账户名称:<input type="text" name="name"><br>
    账户金额:<input type="text" name="money"><br>
    <input type="submit" value="保存"><br>
</form>
</body>
</html>
```

2）查询列表页面

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>展示账户数据列表</h1>
<table border="1">
    <tr>
        <th>账户id</th>
        <th>账户名称</th>
        <th>账户金额</th>
    </tr>

    <c:forEach items="${accountList}" var="account">
        <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.money}</td>
        </tr>
    </c:forEach>

</table>
</body>
</html>
```



**编写相应配置文件** 

- Spring配置文件：applicationContext.xml 
- SprngMVC配置文件：spring-mvc.xml 
- MyBatis映射文件：AccountMapper.xml 
- MyBatis核心文件：sqlMapConfig.xml 
- 数据库连接信息文件：jdbc.properties 
- Web.xml文件：web.xml
- 日志文件：log4j.xml



测试结果：

![image-20220329221457039](https://gitlab.com/apzs/image/-/raw/master/image/202203292214070.png)



**完成原始方式整合前进行的配置：**

Spring配置文件中：

- 组件扫描，扫描service

SprngMVC配置文件中：

- 组件扫描 ，主要扫描controller
- 配置mvc注解驱动
- 内部资源视图解析器（主要在controller中返回视图时简化jsp文件位置）
- 开放静态资源访问权限

MyBatis核心文件

- 加载properties文件
- 定义别名
- 配置数据源
- 加载映射

web.xml文件

- spring监听器
- springMVC的前端控制器
- 乱码过滤器



### 17.2. Spring整合MyBatis

**整合思路：**

![image-20220329215312683](https://gitlab.com/apzs/image/-/raw/master/image/202203292153804.png)

引入

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.1</version>
</dependency>
```



在applicationContext.xml中

将SqlSessionFactory配置到Spring容器中

```xml
<!--配置sessionFactory-->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <!--加载mybatis核心文件-->
    <property name="configLocation" value="classpath:sqlMapConfig-spring.xml"></property>
</bean>
```

扫描Mapper，让Spring容器产生Mapper实现类

```xml
    <!--扫描mapper所在的包 为mapper创建实现类-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.itheima.mapper"></property>
    </bean>
```

配置声明式事务控制

```xml
<!--配置声明式事务控制-->
<!--平台事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--配置事务增强-->
<tx:advice id="txAdvice">
    <tx:attributes>
        <!--默认配置-->
        <tx:method name="*"/>  
    </tx:attributes>
</tx:advice>

<!--事务的aop织入-->
<aop:config>
    <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.itheima.service.impl.*.*(..))"></aop:advisor>
</aop:config>
```

**修改Service实现类代码**

```java
@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public void save(Account account) {
        accountMapper.save(account);
    }

    @Override
    public List<Account> findAll() {
        return accountMapper.findAll();
    }
}
```



**完成整合后进行的配置：**

Spring配置文件中：

- ==组件扫描 扫描service和mapper（排除controller的扫描）==
- ==加载propeties文件==
- ==配置数据源信息==
- ==配置sessionFactory==
- ==扫描mapper所在的包 为mapper创建实现类==
- ==配置声明式事务控制==

SprngMVC配置文件中：

- 组件扫描 ，主要扫描controller
- 配置mvc注解驱动
- 内部资源视图解析器（主要在controller中返回视图时简化jsp文件位置）
- 开放静态资源访问权限

MyBatis核心文件

- ~~加载properties文件~~
- 定义别名
- ~~配置数据源~~
- ~~加载映射~~

web.xml文件

- spring监听器
- springMVC的前端控制器
- 乱码过滤器

**总结：**信息从MyBatis核心文件转移到Spring配置文件中

