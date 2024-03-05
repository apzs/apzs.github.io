# 一、tomcat源码运行

### 1. 下载源码

官方下载地址：http://archive.apache.org/dist/tomcat/

本次编译使用的是`apache-tomcat-9.0.44-src`，下载地址：http://archive.apache.org/dist/tomcat/tomcat-9/v9.0.44/src/apache-tomcat-9.0.44-src.zip

![image-20220929163947621](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929163947621.png)

> 下载源代码点击`src/`，如果不需要源码可以点击`bin/`，然后根据对应的文件后缀来下载对应的文件

### 2. 添加pom文件

在根目录下添加`pom.xml`文件

![image-20220929164933589](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929164933589.png)

然后添加如下内容：(如何知道需要哪些依赖呢？可以先不写依赖，运行期间报缺少哪个类就加上这个类对应的依赖)

这个`pom`文件版本有问题，可用复制<a href="#完整`pom`文件" name="添加pom文件">完整`pom`文件</a>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat9</artifactId>
    <name>tomcat-9.0.44</name>
    <version>9.0.44</version>
    <build>
        <finalName>tomcat-9.0.44</finalName>
        <sourceDirectory>java</sourceDirectory>
        <!--<testSourceDirectory>test</testSourceDirectory>  test 下的有些文件报错，因此将test文件夹去掉了-->
        <resources>
            <resource>
                <directory>java</directory>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <directory>test</directory>
            </testResource>
        </testResources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.6.0</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.0.2</version>
            </plugin>
        </plugins>
    </build>
    <dependencies>
        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant</artifactId>
            <version>1.9.5</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/biz.aQute.bnd/annotation -->
        <!-- https://mvnrepository.com/artifact/biz.aQute.bnd/biz.aQute.bndlib -->
        <dependency>
            <groupId>biz.aQute.bnd</groupId>
            <artifactId>biz.aQute.bndlib</artifactId>
            <version>5.2.0</version>
            <scope>provided</scope>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.jasper/org.apache.jasper -->
        <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jasper -->
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-jasper</artifactId>
            <version>9.0.41</version>
        </dependency>
        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant-apache-log4j</artifactId>
            <version>1.9.5</version>
        </dependency>
        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant-commons-logging</artifactId>
            <version>1.9.5</version>
        </dependency>
        <dependency>
            <groupId>javax.xml.rpc</groupId>
            <artifactId>javax.xml.rpc-api</artifactId>
            <version>1.1</version>
        </dependency>
        <dependency>
            <groupId>wsdl4j</groupId>
            <artifactId>wsdl4j</artifactId>
            <version>1.6.2</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jdt.core.compiler</groupId>
            <artifactId>ecj</artifactId>
            <version>4.6.1</version>
        </dependency>
    </dependencies>
</project>
```

修改`Maven`仓库，然后使用`IDEA`打开该项目

![image-20220929200303924](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929200303924.png)

### 3. 解决报错

报了3个`找不到符号`的错误

![image-20220929190217661](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929190217661.png)

#### 方案一：

可以把所有`VERSION_15`改为`VERSION_1_8`

![image-20220929190413492](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929190413492.png)

#### 方案二：

查看`CompilerOptions`类的源码可用看到到`VERSION`到`14`就没有了，所以就报了`找不到符号`的错误

![image-20220929191043075](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929191043075.png)

查看同版本的不含源码的包，可用看到`ecj`的版本为`4.18` 

下载地址：http://archive.apache.org/dist/tomcat/tomcat-9/v9.0.44/bin/apache-tomcat-9.0.44.zip

![image-20220929190451061](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929190451061.png)

查看`pom`文件依赖，发现其是`tomcat-jasper`的子包

![image-20220929191326629](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929191326629.png)

到仓库看，发现最新的版本是`3.31.0`，我也是服了，这不是误导人吗?

![image-20220929192612713](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929192612713.png)

排除`tomcat-jasper`里的`ecj`依赖，然后再添加新的`ecj`依赖，此时就成功了

```xml
<dependency>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat-jasper</artifactId>
    <version>9.0.41</version>
    <exclusions>
        <exclusion>
            <groupId>org.eclipse.jdt</groupId>
            <artifactId>ecj</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.eclipse.jdt</groupId>
    <artifactId>ecj</artifactId>
    <version>3.31.0</version>
</dependency>
```

![image-20220929192804962](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929192804962.png)

### 4. 运行项目

#### 1.  运行启动类

非源码运行`tomcat`，在`Windows`系统下运行的是`startup.bat`，在`linux`系统下运行的是`startup.sh`

由于`tomcat`是由`java`写的，因此肯定会有一个启动类，打开`startup.bat`，可用看到`call "%EXECUTABLE%" start %CMD_LINE_ARGS%`执行的就是`set "EXECUTABLE=%CATALINA_HOME%\bin\catalina.bat"`

![image-20220929194007336](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929194007336.png)

查看`catalina.bat`文件，有如下配置`set MAINCLASS=org.apache.catalina.startup.Bootstrap`

![image-20220929194317748](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929194317748.png)

搜索`MAINCLASS`就可以看到在最后面执行了改主类

```bash
if not "%JPDA%" == "" goto doJpda
if not "%SECURITY_POLICY_FILE%" == "" goto doSecurity
%_EXECJAVA% %CATALINA_LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -D%ENDORSED_PROP%="%JAVA_ENDORSED_DIRS%" -classpath "%CLASSPATH%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
:doSecurity
%_EXECJAVA% %CATALINA_LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -D%ENDORSED_PROP%="%JAVA_ENDORSED_DIRS%" -classpath "%CLASSPATH%" -Djava.security.manager -Djava.security.policy=="%SECURITY_POLICY_FILE%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
:doJpda
if not "%SECURITY_POLICY_FILE%" == "" goto doSecurityJpda
%_EXECJAVA% %CATALINA_LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %JPDA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -D%ENDORSED_PROP%="%JAVA_ENDORSED_DIRS%" -classpath "%CLASSPATH%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
:doSecurityJpda
%_EXECJAVA% %CATALINA_LOGGING_CONFIG% %LOGGING_MANAGER% %JAVA_OPTS% %JPDA_OPTS% %CATALINA_OPTS% %DEBUG_OPTS% -D%ENDORSED_PROP%="%JAVA_ENDORSED_DIRS%" -classpath "%CLASSPATH%" -Djava.security.manager -Djava.security.policy=="%SECURITY_POLICY_FILE%" -Dcatalina.base="%CATALINA_BASE%" -Dcatalina.home="%CATALINA_HOME%" -Djava.io.tmpdir="%CATALINA_TMPDIR%" %MAINCLASS% %CMD_LINE_ARGS% %ACTION%
goto end
```

![image-20220929194543054](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929194543054.png)

根据路径，然后就发现了主类

![image-20220929194733730](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929194733730.png)

运行后报了`6`个错误

```bash
B:\apache-tomcat-9.0.44-src\java\org\apache\catalina\mbeans\JmxRemoteLifecycleListener.java:610:62
java: 程序包sun.rmi.registry不存在
B:\apache-tomcat-9.0.44-src\java\org\apache\catalina\mbeans\JmxRemoteLifecycleListener.java:620:9
java: 方法不会覆盖或实现超类型的方法
B:\apache-tomcat-9.0.44-src\java\org\apache\catalina\mbeans\JmxRemoteLifecycleListener.java:625:9
java: 方法不会覆盖或实现超类型的方法
B:\apache-tomcat-9.0.44-src\java\org\apache\catalina\mbeans\JmxRemoteLifecycleListener.java:629:9
java: 方法不会覆盖或实现超类型的方法
B:\apache-tomcat-9.0.44-src\java\org\apache\catalina\mbeans\JmxRemoteLifecycleListener.java:633:9
java: 方法不会覆盖或实现超类型的方法
B:\apache-tomcat-9.0.44-src\java\org\apache\catalina\mbeans\JmxRemoteLifecycleListener.java:637:9
java: 方法不会覆盖或实现超类型的方法
```

![image-20220929195119586](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929195119586.png)

#### 2. 修改java版本

按`ctrl`点击`registry`，发现我用的java是`17`，在`File` -> `Project Structure... Ctrl+ Alt+ Shift+S`的`Project`里将`SDK:`和`Language level: `都改为`1.8`版本 （这`tomcat`好奇怪，`install`之前我还特意检查了一下版本都是`1.8`，而且我环境变量也是`1.8`，都不知道他从哪检测到`java 17`的）

![image-20220929195248952](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929195248952.png)

在`File` -> `Settings... Ctrl+Alt+S`  -> `Build, Execution, Deployment` -> `Compiler` -> `Java Compiler`里也检查一下版本

![image-20220929195853445](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929195853445.png)

#### 3. 修改jar包版本

然后启动报了这个错，这个错一般就是jar包版本不对

```
B:\apache-tomcat-9.0.44-src\java\org\apache\jasper\compiler\JDTCompiler.java:40:37
java: 无法访问org.eclipse.jdt.core.compiler.IProblem
  错误的类文件: /A:/maven/apache-maven-3.8.2/mvn_respository/org/eclipse/jdt/ecj/3.31.0/ecj-3.31.0.jar!/org/eclipse/jdt/core/compiler/IProblem.class
    类文件具有错误的版本 55.0, 应为 52.0
    请删除该文件或确保该文件位于正确的类路径子目录中。
```

![image-20220929200709070](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929200709070.png)

查看`ecj-4.18.jar`包的`META-INF\MANIFEST.MF`文件，可用看到版本为`3.24.0`

```
Bundle-Version: 3.24.0.v20201123-0742
```

![image-20220929201755903](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929201755903.png)

查找改版本

![image-20220929201941931](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929201941931.png)



修改为该版本后，成功启动

```xml
<dependency>
    <groupId>org.eclipse.jdt</groupId>
    <artifactId>ecj</artifactId>
    <version>3.24.0</version>
</dependency>
```

不过有乱码

![image-20220929202048497](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929202048497.png)

报了以下错误不用管

```
信息: è³å°æä¸ä¸ªJARè¢«æ«æç¨äºTLDä½å°æªåå«TLDã ä¸ºæ­¤è®°å½å¨å¯ç¨è°è¯æ¥å¿è®°å½ï¼ä»¥è·åå·²æ«æä½æªå¨å¶ä¸­æ¾å°TLDçå®æ´JARåè¡¨ã å¨æ«ææé´è·³è¿ä¸éè¦çJARå¯ä»¥ç¼©ç­å¯å¨æ¶é´åJSPç¼è¯æ¶é´ã
九月 29, 2022 8:16:53 下午 org.apache.catalina.core.StandardContext listenerStart
严重: éç½®åºç¨ç¨åºçå¬å¨[listeners.ContextListener]éè¯¯
java.lang.ClassNotFoundException: listeners.ContextListener
	at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1364)
	at org.apache.catalina.loader.WebappClassLoaderBase.loadClass(WebappClassLoaderBase.java:1187)
	at org.apache.catalina.core.DefaultInstanceManager.loadClass(DefaultInstanceManager.java:539)
	at org.apache.catalina.core.DefaultInstanceManager.loadClassMaybePrivileged(DefaultInstanceManager.java:520)
	at org.apache.catalina.core.DefaultInstanceManager.newInstance(DefaultInstanceManager.java:150)
	at org.apache.catalina.core.StandardContext.listenerStart(StandardContext.java:4640)
	at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5177)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.core.ContainerBase.addChildInternal(ContainerBase.java:717)
	at org.apache.catalina.core.ContainerBase.addChild(ContainerBase.java:690)
	at org.apache.catalina.core.StandardHost.addChild(StandardHost.java:706)
	at org.apache.catalina.startup.HostConfig.deployDirectory(HostConfig.java:1184)
	at org.apache.catalina.startup.HostConfig$DeployDirectory.run(HostConfig.java:1925)
```

![image-20220929202210437](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929202210437.png)



#### 完整`pom`文件

<a href="#添加pom文件" name="完整`pom`文件">点击跳转到`添加pom文件`</a>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.apache.tomcat</groupId>
    <artifactId>tomcat9</artifactId>
    <name>tomcat-9.0.44</name>
    <version>9.0.44</version>
    <build>
        <finalName>tomcat-9.0.44</finalName>
        <sourceDirectory>java</sourceDirectory>
        <!--<testSourceDirectory>test</testSourceDirectory>  test 下的有些文件报错，因此将test文件夹去掉了-->
        <resources>
            <resource>
                <directory>java</directory>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <directory>test</directory>
            </testResource>
        </testResources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.6.0</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.0.2</version>
            </plugin>
        </plugins>
    </build>
    <dependencies>
        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant</artifactId>
            <version>1.9.5</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/biz.aQute.bnd/annotation -->
        <!-- https://mvnrepository.com/artifact/biz.aQute.bnd/biz.aQute.bndlib -->
        <dependency>
            <groupId>biz.aQute.bnd</groupId>
            <artifactId>biz.aQute.bndlib</artifactId>
            <version>5.2.0</version>
            <scope>provided</scope>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.jasper/org.apache.jasper -->
        <!-- https://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jasper -->
        <dependency>
            <groupId>org.apache.tomcat</groupId>
            <artifactId>tomcat-jasper</artifactId>
            <version>9.0.41</version>
            <exclusions>
                <exclusion>
                    <groupId>org.eclipse.jdt</groupId>
                    <artifactId>ecj</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.eclipse.jdt</groupId>
            <artifactId>ecj</artifactId>
            <version>3.24.0</version>
        </dependency>




        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant-apache-log4j</artifactId>
            <version>1.9.5</version>
        </dependency>
        <dependency>
            <groupId>org.apache.ant</groupId>
            <artifactId>ant-commons-logging</artifactId>
            <version>1.9.5</version>
        </dependency>
        <dependency>
            <groupId>javax.xml.rpc</groupId>
            <artifactId>javax.xml.rpc-api</artifactId>
            <version>1.1</version>
        </dependency>
        <dependency>
            <groupId>wsdl4j</groupId>
            <artifactId>wsdl4j</artifactId>
            <version>1.6.2</version>
        </dependency>
        <dependency>
            <groupId>org.eclipse.jdt.core.compiler</groupId>
            <artifactId>ecj</artifactId>
            <version>4.6.1</version>
        </dependency>
    </dependencies>
</project>
```

### 5 修改启动参数

添加启动类的运行参数，设置字符编码

```
-Duser.language=en
-Duser.region=US
-Dfile.encoding=UTF-8
-Dsun.jnu.encoding=UTF-8
```

![image-20220929202910639](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929202910639.png)

设置字符编码后，就没有乱码了

![image-20220929203043109](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929203043109.png)

# 二、tomcat总体架构

关系：`Server` -> `Service` -> `Connector` -> `Engine` -> `Host` -> `Context` -> `Wrapper` -> `Servlet`

**理解server.xml**

server：即服务器，每个tomcat程序启动后，就是一个server。
service：这是一种抽象的服务，通常是在日志或者管理时使用这样一个概念。它把连接器和处理引擎结合在一起。
connector：用于处理连接和并发，通常包括两种方式HTTP和AJP。HTTP是用于网页地址栏http这种访问方式；AJP一般用于搭配Apache服务器。
engine：处理引擎，所有的请求都是通过处理引擎处理的。
host：虚拟主机，用于进行请求的映射处理。每个虚拟主机可以看做独立的请求文件。
realm：用于配置安全管理角色，通常读取tomcat-uesrs.xml进行验证。
context：上下文，对应于web应用。

### 1. server.xml文件

要想知道`tomcat`有什么，需要先看`conf/server.xml`文件

`Server`：首先是`Server`大标签，代表整个tomcat服务器。

`Listener`：里面配了几个`Listener`监听器。

`GlobalNamingResources`：根据注释可以知道该标签内可以配置`JNDI` (Java Naming and Directory Interface,Java命名和目录接口)。可以在里面定义一些资源，比如指定数据库连接池，可以使用 @Resource 注解获取这些资源。

`Service`：一个Service是一组连接器可以共享一个容器，一个`Server`可以有多个`Service`，每个`Service`可以完成不同的功能。

这里配了一个`Catalina`服务，Catalina服务[Tomcat请求处理服务]，使用Connector可以接收数据，处理请求。我们也可以自定义自己的服务，完成自己想要的功能，比如操作`redis`。

`Connector`：其`port`属性可以指定我们要监听的端口，每一个`Connector`可以监听一个不同的端口，一个`Service`可以有多个`Connector`。

`Engine`：正真的请求会交给引擎进行处理，引擎控制整个的处理逻辑。

`Realm`：认证信息

`Host`：主机。一个`Engine`可以有多个`Host`，每一个Host代表一个虚拟域名映射系统，根据Host可以进行虚拟主机隔离。`name="localhost"  appBase="webapps"`说明了为什么访问`localhost`会在`webapps`里找，` unpackWARs="true"`自动解压war包，`autoDeploy="true"`自动部署，一个`webapp`里可以有多个`web`应用。

`Context`：一个web应用就是一个context

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />

  <!-- Global JNDI resources
       Documentation at /docs/jndi-resources-howto.html
  -->
  <GlobalNamingResources>
    <!-- Editable user database that can also be used by
         UserDatabaseRealm to authenticate users
    -->
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>

  <!-- A "Service" is a collection of one or more "Connectors" that share
       a single "Container" Note:  A "Service" is not itself a "Container",
       so you may not define subcomponents such as "Valves" at this level.
       Documentation at /docs/config/service.html
   -->
  <Service name="Catalina">
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <Engine name="Catalina" defaultHost="localhost">
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>

      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
      </Host>
    </Engine>
  </Service>
</Server>
```

![image-20220929210248640](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929210248640.png)

### 2. `Server`接口

`Server`接口主要指定Tomcat能干什么

```java
public interface Server extends Lifecycle {
    ...
    /**
     * @return the outer Catalina startup/shutdown component if present.
     */
    public Catalina getCatalina();

    /**
     * Set the outer Catalina startup/shutdown component if present.
     *
     * @param catalina the outer Catalina component
     */
    public void setCatalina(Catalina catalina);

    public File getCatalinaBase();

    public void setCatalinaBase(File catalinaBase);

    public File getCatalinaHome();

    public void setCatalinaHome(File catalinaHome);

    /**
     * Add a new Service to the set of defined Services.
     * 添加我们自定义的服务
     * @param service The Service to be added
     */
    public void addService(Service service);
    ...
}
```

该接口定义了获取和修改`Catalina`的方法以及其相关的方法。

![image-20220929210336501](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929210336501.png)

当然其也有`addService`方法，添加我们自定义的服务

![image-20220929210536919](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929210536919.png)

### 3. `Service`接口

`Service`接口指定该功能怎么做

```java
public interface Service extends Lifecycle {
    
    /** TODO `Catalina`里的`Service`是处理请求的服务，真正会交给引擎进行处理，引擎控制整个的处理逻辑
     * @return the <code>Engine</code> that handles requests for all
     * <code>Connectors</code> associated with this Service.
     */
    public Engine getContainer();

    public void setContainer(Engine engine);
    
    public String getName();

    public void setName(String name);

    public Server getServer();

    public void setServer(Server server);

    public ClassLoader getParentClassLoader();

    public void setParentClassLoader(ClassLoader parent);

    public String getDomain();

    public void addConnector(Connector connector);

    public Connector[] findConnectors();

    public void removeConnector(Connector connector);

    public void addExecutor(Executor ex);

    public Executor[] findExecutors();

    public Executor getExecutor(String name);

    public void removeExecutor(Executor ex);

    Mapper getMapper();
}
```

`Service`接口里可以是在很多个`Connector`，其`port`属性可以指定我们要监听的端口，每一个`Connector`可以监听一个不同的端口。

![image-20220929211707977](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929211707977.png)

`Catalina`里的`Service`是处理请求的服务，真正会交给引擎进行处理，引擎控制整个的处理逻辑。

![image-20220929211316820](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929211316820.png)

### 4. `Connector`类

每一个`Connector`可以监听一个不同的端口

```java
public class Connector extends LifecycleMBeanBase  {

    private static final Log log = LogFactory.getLog(Connector.class);
    ...
    public Connector() {
        this("HTTP/1.1");
    }


    public Connector(String protocol) {
        boolean apr = AprStatus.isAprAvailable() &&
            AprStatus.getUseAprConnector();
        ProtocolHandler p = null;
        try {
            p = ProtocolHandler.create(protocol, apr);
        } catch (Exception e) {
            log.error(sm.getString(
                    "coyoteConnector.protocolHandlerInstantiationFailed"), e);
        }
        if (p != null) {
            protocolHandler = p;
            protocolHandlerClassName = protocolHandler.getClass().getName();
        } else {
            protocolHandler = null;
            protocolHandlerClassName = protocol;
        }
        // Default for Connector depends on this system property
        setThrowOnFailure(Boolean.getBoolean("org.apache.catalina.startup.EXIT_ON_INIT_FAILURE"));
    }


    public Connector(ProtocolHandler protocolHandler) {
        protocolHandlerClassName = protocolHandler.getClass().getName();
        this.protocolHandler = protocolHandler;
        // Default for Connector depends on this system property
        setThrowOnFailure(Boolean.getBoolean("org.apache.catalina.startup.EXIT_ON_INIT_FAILURE"));
    }
    ...
    /**
     * Return a property from the protocol handler.
     *
     * @param name the property name
     * @return the property value
     *
     * @deprecated Use {@link #getProperty(String)}. This will be removed in
     *             Tomcat 10 onwards.
     */
    @Deprecated
    public Object getAttribute(String name) {
        return getProperty(name);
    }


    /**
     * Set a property on the protocol handler.
     *
     * @param name the property name
     * @param value the property value
     *
     * @deprecated Use {@link #setProperty(String, String)}. This will be
     *             removed in Tomcat 10 onwards.
     */
    @Deprecated
    public void setAttribute(String name, Object value) {
        setProperty(name, String.valueOf(value));
    }


    /**
     * @return the <code>Service</code> with which we are associated (if any).
     */
    public Service getService() {
        return this.service;
    }


    /**
     * Set the <code>Service</code> with which we are associated (if any).
     *
     * @param service The service that owns this Engine
     */
    public void setService(Service service) {
        this.service = service;
    }
    ...
    /**
     * @return the port number on which this connector is configured to listen
     * for requests. The special value of 0 means select a random free port
     * when the socket is bound.
     */
    public int getPort() {
        // Try shortcut that should work for nearly all uses first as it does
        // not use reflection and is therefore faster.
        if (protocolHandler instanceof AbstractProtocol<?>) {
            return ((AbstractProtocol<?>) protocolHandler).getPort();
        }
        // Fall back for custom protocol handlers not based on AbstractProtocol
        Object port = getProperty("port");
        if (port instanceof Integer) {
            return ((Integer) port).intValue();
        }
        // Usually means an invalid protocol has been configured
        return -1;
    }


    /**
     * Set the port number on which we listen for requests.
     *
     * @param port The new port number
     */
    public void setPort(int port) {
        setProperty("port", String.valueOf(port));
    }
    ...
    public String getProxyName() {
        return this.proxyName;
    }

    public void setProxyName(String proxyName) {

        if(proxyName != null && proxyName.length() > 0) {
            this.proxyName = proxyName;
        } else {
            this.proxyName = null;
        }
        setProperty("proxyName", this.proxyName);
    }

    public int getProxyPort() {
        return this.proxyPort;
    }

    public void setProxyPort(int proxyPort) {
        this.proxyPort = proxyPort;
        setProperty("proxyPort", String.valueOf(proxyPort));
    }

    public int getRedirectPort() {
        return this.redirectPort;
    }

    public void setRedirectPort(int redirectPort) {
        this.redirectPort = redirectPort;
        setProperty("redirectPort", String.valueOf(redirectPort));
    }


    public int getRedirectPortWithOffset() {
        return getRedirectPort() + getPortOffset();
    }

    public String getScheme() {
        return this.scheme;
    }

    public void setScheme(String scheme) {
        this.scheme = scheme;
    }
    ...
    public String getURIEncoding() {
        return uriCharset.name();
    }

    public Charset getURICharset() {
        return uriCharset;
    }

    public void setURIEncoding(String URIEncoding) {
        try {
             Charset charset = B2CConverter.getCharset(URIEncoding);
             if (!CharsetUtil.isAsciiSuperset(charset)) {
                 log.error(sm.getString("coyoteConnector.notAsciiSuperset", URIEncoding));
             }
             uriCharset = charset;
        } catch (UnsupportedEncodingException e) {
            log.error(sm.getString("coyoteConnector.invalidEncoding", URIEncoding, uriCharset.name()), e);
        }
    }

    public boolean getUseBodyEncodingForURI() {
        return this.useBodyEncodingForURI;
    }

    public void setUseBodyEncodingForURI(boolean useBodyEncodingForURI) {
        this.useBodyEncodingForURI = useBodyEncodingForURI;
        setProperty("useBodyEncodingForURI", String.valueOf(useBodyEncodingForURI));
    }
}
```

![image-20220930085223433](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930085223433.png)

### 5. `Engine`接口

`Engine`引擎控制整个的处理逻辑

```java
public interface Engine extends Container {

    public String getDefaultHost();

    public void setDefaultHost(String defaultHost);

    public String getJvmRoute();

    public void setJvmRoute(String jvmRouteId);

    public Service getService();

    public void setService(Service service);
}
```

![image-20220930084657547](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930084657547.png)

### 6. `Host`接口

`Host`：主机。一个引擎可以有多个`Host`，每一个Host代表一个虚拟域名映射系统，根据Host可以进行虚拟主机隔离。

该接口唯一实现类`StandardHost`有一个`addChild`方法可以添加一个子节点，首先会判断其传来的参数类型是不是`Context`

```java
public class StandardHost extends ContainerBase implements Host {

    private static final Log log = LogFactory.getLog(StandardHost.class);
    ...
    /**
     * Add a child Container, only if the proposed child is an implementation
     * of Context.
     *
     * @param child Child container to be added
     */
    @Override
    public void addChild(Container child) {

        if (!(child instanceof Context))
            throw new IllegalArgumentException
                (sm.getString("standardHost.notContext"));

        child.addLifecycleListener(new MemoryLeakTrackingListener());

        // Avoid NPE for case where Context is defined in server.xml with only a
        // docBase
        Context context = (Context) child;
        if (context.getPath() == null) {
            ContextName cn = new ContextName(context.getDocBase(), true);
            context.setPath(cn.getPath());
        }

        super.addChild(child);

    }
    ...
}
```

![image-20220929220450107](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929220450107.png)



### 7. `Context`接口

一个web应用就是一个context，一个web应用有很多个 servlet、Filter、listener

该接口其中一个实现类`StandardContext`有一个`addChild`方法可以添加一个子节点，首先会判断其传来的参数类型是不是`Wrapper`

```java
public class StandardContext extends ContainerBase
        implements Context, NotificationEmitter {

    private static final Log log = LogFactory.getLog(StandardContext.class);
    ...
    @Override
    public void addChild(Container child) {

        // Global JspServlet
        Wrapper oldJspServlet = null;

        if (!(child instanceof Wrapper)) {
            throw new IllegalArgumentException
                (sm.getString("standardContext.notWrapper"));
        }

        boolean isJspServlet = "jsp".equals(child.getName());

        // Allow webapp to override JspServlet inherited from global web.xml.
        if (isJspServlet) {
            oldJspServlet = (Wrapper) findChild("jsp");
            if (oldJspServlet != null) {
                removeChild(oldJspServlet);
            }
        }

        super.addChild(child);

        if (isJspServlet && oldJspServlet != null) {
            /*
             * The webapp-specific JspServlet inherits all the mappings
             * specified in the global web.xml, and may add additional ones.
             */
            String[] jspMappings = oldJspServlet.findMappings();
            for (int i=0; jspMappings!=null && i<jspMappings.length; i++) {
                addServletMappingDecoded(jspMappings[i], child.getName());
            }
        }
    }
    ...
}
```

![image-20220929221748725](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929221748725.png)



### 8. `Wrapper`接口

该接口其中一个实现类`StandardWrapper`有一个`addChild`方法，里面就什么都不能加了

```java
@SuppressWarnings("deprecation") // SingleThreadModel
public class StandardWrapper extends ContainerBase
    implements ServletConfig, Wrapper, NotificationEmitter {

    private final Log log = LogFactory.getLog(StandardWrapper.class); // must not be static
    ...
    @Override
    public void addChild(Container child) {

        throw new IllegalStateException
            (sm.getString("standardWrapper.notChild"));

    }
    ...
}
```

![image-20220929222349000](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929222349000.png)

每一个`Servlet`被封装为一个`Wrapper`

![image-20220929222830331](https://gitlab.com/apzs/image/-/raw/master/image/image-20220929222830331.png)

# 三、tomcat核心组件生命周期

## 1. `Lifecycle`生命周期

关系：`Server` -> `Service` -> `Connector` -> `Engine` -> `Host` -> `Context` -> `Wrapper` -> `Servlet`

(`Servlet`接口没有继承`Lifecycle`)

![image-20220930091222392](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930091222392.png)

```java
/**
 *            start()
 *  -----------------------------
 *  |                           |
 *  | init()                    |
 * NEW -»-- INITIALIZING        |
 * | |           |              |     ------------------«-----------------------
 * | |           |auto          |     |                                        |
 * | |          \|/    start() \|/   \|/     auto          auto         stop() |
 * | |      INITIALIZED --»-- STARTING_PREP --»- STARTING --»- STARTED --»---  |
 * | |         |                                                            |  |
 * | |destroy()|                                                            |  |
 * | --»-----«--    ------------------------«--------------------------------  ^
 * |     |          |                                                          |
 * |     |         \|/          auto                 auto              start() |
 * |     |     STOPPING_PREP ----»---- STOPPING ------»----- STOPPED -----»-----
 * |    \|/                               ^                     |  ^
 * |     |               stop()           |                     |  |
 * |     |       --------------------------                     |  |
 * |     |       |                                              |  |
 * |     |       |    destroy()                       destroy() |  |
 * |     |    FAILED ----»------ DESTROYING ---«-----------------  |
 * |     |                        ^     |                          |
 * |     |     destroy()          |     |auto                      |
 * |     --------»-----------------    \|/                         |
 * |                                 DESTROYED                     |
 * |                                                               |
 * |                            stop()                             |
 * ----»-----------------------------»------------------------------
 */
public interface Lifecycle {
    ...
    /**
     * Add a LifecycleEvent listener to this component.
     *
     * @param listener The listener to add
     */
    public void addLifecycleListener(LifecycleListener listener);


    /**
     * Get the life cycle listeners associated with this life cycle.
     *
     * @return An array containing the life cycle listeners associated with this
     *         life cycle. If this component has no listeners registered, a
     *         zero-length array is returned.
     */
    public LifecycleListener[] findLifecycleListeners();


    /**
     * Remove a LifecycleEvent listener from this component.
     *
     * @param listener The listener to remove
     */
    public void removeLifecycleListener(LifecycleListener listener);


    /**
     * Prepare the component for starting. This method should perform any
     * initialization required post object creation. The following
     * {@link LifecycleEvent}s will be fired in the following order:
     * <ol>
     *   <li>INIT_EVENT: On the successful completion of component
     *                   initialization.</li>
     * </ol>
     *
     * @exception LifecycleException if this component detects a fatal error
     *  that prevents this component from being used
     */
    public void init() throws LifecycleException;

    /**
     * Prepare for the beginning of active use of the public methods other than
     * property getters/setters and life cycle methods of this component. This
     * method should be called before any of the public methods other than
     * property getters/setters and life cycle methods of this component are
     * utilized. The following {@link LifecycleEvent}s will be fired in the
     * following order:
     * <ol>
     *   <li>BEFORE_START_EVENT: At the beginning of the method. It is as this
     *                           point the state transitions to
     *                           {@link LifecycleState#STARTING_PREP}.</li>
     *   <li>START_EVENT: During the method once it is safe to call start() for
     *                    any child components. It is at this point that the
     *                    state transitions to {@link LifecycleState#STARTING}
     *                    and that the public methods other than property
     *                    getters/setters and life cycle methods may be
     *                    used.</li>
     *   <li>AFTER_START_EVENT: At the end of the method, immediately before it
     *                          returns. It is at this point that the state
     *                          transitions to {@link LifecycleState#STARTED}.
     *                          </li>
     * </ol>
     *
     * @exception LifecycleException if this component detects a fatal error
     *  that prevents this component from being used
     */
    public void start() throws LifecycleException;


    /**
     * Gracefully terminate the active use of the public methods other than
     * property getters/setters and life cycle methods of this component. Once
     * the STOP_EVENT is fired, the public methods other than property
     * getters/setters and life cycle methods should not be used. The following
     * {@link LifecycleEvent}s will be fired in the following order:
     * <ol>
     *   <li>BEFORE_STOP_EVENT: At the beginning of the method. It is at this
     *                          point that the state transitions to
     *                          {@link LifecycleState#STOPPING_PREP}.</li>
     *   <li>STOP_EVENT: During the method once it is safe to call stop() for
     *                   any child components. It is at this point that the
     *                   state transitions to {@link LifecycleState#STOPPING}
     *                   and that the public methods other than property
     *                   getters/setters and life cycle methods may no longer be
     *                   used.</li>
     *   <li>AFTER_STOP_EVENT: At the end of the method, immediately before it
     *                         returns. It is at this point that the state
     *                         transitions to {@link LifecycleState#STOPPED}.
     *                         </li>
     * </ol>
     *
     * Note that if transitioning from {@link LifecycleState#FAILED} then the
     * three events above will be fired but the component will transition
     * directly from {@link LifecycleState#FAILED} to
     * {@link LifecycleState#STOPPING}, bypassing
     * {@link LifecycleState#STOPPING_PREP}
     *
     * @exception LifecycleException if this component detects a fatal error
     *  that needs to be reported
     */
    public void stop() throws LifecycleException;

    /**
     * Prepare to discard the object. The following {@link LifecycleEvent}s will
     * be fired in the following order:
     * <ol>
     *   <li>DESTROY_EVENT: On the successful completion of component
     *                      destruction.</li>
     * </ol>
     *
     * @exception LifecycleException if this component detects a fatal error
     *  that prevents this component from being used
     */
    public void destroy() throws LifecycleException;


    /**
     * Obtain the current state of the source component.
     *
     * @return The current state of the source component.
     */
    public LifecycleState getState();


    /**
     * Obtain a textual representation of the current component state. Useful
     * for JMX. The format of this string may vary between point releases and
     * should not be relied upon to determine component state. To determine
     * component state, use {@link #getState()}.
     *
     * @return The name of the current component state.
     */
    public String getStateName();


    /**
     * Marker interface used to indicate that the instance should only be used
     * once. Calling {@link #stop()} on an instance that supports this interface
     * will automatically call {@link #destroy()} after {@link #stop()}
     * completes.
     */
    public interface SingleUse {
    }
}
```



### 1. `Listener`

各个生命周期都可以添加、获取、移除一些监听器

```java
public void addLifecycleListener(LifecycleListener listener);


/**
 * Get the life cycle listeners associated with this life cycle.
 *
 * @return An array containing the life cycle listeners associated with this
 *         life cycle. If this component has no listeners registered, a
 *         zero-length array is returned.
 */
public LifecycleListener[] findLifecycleListeners();


/**
 * Remove a LifecycleEvent listener from this component.
 *
 * @param listener The listener to remove
 */
public void removeLifecycleListener(LifecycleListener listener);
```

![image-20220930091957192](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930091957192.png)

### 2. 生命周期

#### 1. `init`

`init`方法会对组件进行初始化

```java
/**
 * Prepare the component for starting. This method should perform any
 * initialization required post object creation. The following
 * {@link LifecycleEvent}s will be fired in the following order:
 * <ol>
 *   <li>INIT_EVENT: On the successful completion of component
 *                   initialization.</li>
 * </ol>
 * // TODO 组件初始化
 * @exception LifecycleException if this component detects a fatal error
 *  that prevents this component from being used
 */
public void init() throws LifecycleException;
```

![image-20220930092340663](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930092340663.png)

`LifecycleBase`是`Lifecycle`接口的一个抽象实现类，其`init`定义了组件初始化的步骤，其调用的`initInternal()`由具体类实现，具体类实现其核心初始化步骤。

```java
@Override
public final synchronized void init() throws LifecycleException {
    if (!state.equals(LifecycleState.NEW)) {
        invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
    }

    try {
        setStateInternal(LifecycleState.INITIALIZING, null, false);
        initInternal();
        setStateInternal(LifecycleState.INITIALIZED, null, false);
    } catch (Throwable t) {
        handleSubClassException(t, "lifecycleBase.initFail", toString());
    }
}


/**
 * Sub-classes implement this method to perform any instance initialisation
 * required.
 *
 * @throws LifecycleException If the initialisation fails
 */
protected abstract void initInternal() throws LifecycleException;
```

![image-20220930143855362](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930143855362.png)

#### 2. `start`

`start`方法会启动组件

```java
/**
 * Prepare for the beginning of active use of the public methods other than
 * property getters/setters and life cycle methods of this component. This
 * method should be called before any of the public methods other than
 * property getters/setters and life cycle methods of this component are
 * utilized. The following {@link LifecycleEvent}s will be fired in the
 * following order:
 * <ol>
 *   <li>BEFORE_START_EVENT: At the beginning of the method. It is as this
 *                           point the state transitions to
 *                           {@link LifecycleState#STARTING_PREP}.</li>
 *   <li>START_EVENT: During the method once it is safe to call start() for
 *                    any child components. It is at this point that the
 *                    state transitions to {@link LifecycleState#STARTING}
 *                    and that the public methods other than property
 *                    getters/setters and life cycle methods may be
 *                    used.</li>
 *   <li>AFTER_START_EVENT: At the end of the method, immediately before it
 *                          returns. It is at this point that the state
 *                          transitions to {@link LifecycleState#STARTED}.
 *                          </li>
 * </ol>
 * TODO 组件启动
 * @exception LifecycleException if this component detects a fatal error
 *  that prevents this component from being used
 */
public void start() throws LifecycleException;
```

![image-20220930092522273](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930092522273.png)

`LifecycleBase`是`Lifecycle`接口的一个抽象实现类，其`start`定义了组件启动的步骤

```java
@Override
public final synchronized void start() throws LifecycleException {
    // TODO 组件状态流转判断
    if (LifecycleState.STARTING_PREP.equals(state) || LifecycleState.STARTING.equals(state) ||
            LifecycleState.STARTED.equals(state)) {

        if (log.isDebugEnabled()) {
            Exception e = new LifecycleException();
            log.debug(sm.getString("lifecycleBase.alreadyStarted", toString()), e);
        } else if (log.isInfoEnabled()) {
            log.info(sm.getString("lifecycleBase.alreadyStarted", toString()));
        }

        return;
    }

    if (state.equals(LifecycleState.NEW)) {
        init();
    } else if (state.equals(LifecycleState.FAILED)) {
        stop();
    } else if (!state.equals(LifecycleState.INITIALIZED) &&
            !state.equals(LifecycleState.STOPPED)) {
        invalidTransition(Lifecycle.BEFORE_START_EVENT);
    }

    try {
        setStateInternal(LifecycleState.STARTING_PREP, null, false);
        startInternal();
        if (state.equals(LifecycleState.FAILED)) {
            // This is a 'controlled' failure. The component put itself into the
            // FAILED state so call stop() to complete the clean-up.
            stop();
        } else if (!state.equals(LifecycleState.STARTING)) {
            // Shouldn't be necessary but acts as a check that sub-classes are
            // doing what they are supposed to.
            invalidTransition(Lifecycle.AFTER_START_EVENT);
        } else {
            setStateInternal(LifecycleState.STARTED, null, false);
        }
    } catch (Throwable t) {
        // This is an 'uncontrolled' failure so put the component into the
        // FAILED state and throw an exception.
        handleSubClassException(t, "lifecycleBase.startFail", toString());
    }
}
```

![image-20220930144237971](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930144237971.png)

其调用的`startInternal()`由具体类实现，具体类实现其核心启动步骤

```java
/**
 * Sub-classes must ensure that the state is changed to
 * {@link LifecycleState#STARTING} during the execution of this method.
 * Changing state will trigger the {@link Lifecycle#START_EVENT} event.
 *
 * If a component fails to start it may either throw a
 * {@link LifecycleException} which will cause it's parent to fail to start
 * or it can place itself in the error state in which case {@link #stop()}
 * will be called on the failed component but the parent component will
 * continue to start normally.
 *
 * @throws LifecycleException Start error occurred
 */
protected abstract void startInternal() throws LifecycleException;
```

![image-20220930143104695](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930143104695.png)

#### 3. `stop`

`stop`方法会停止组件的运行

```java
/**
 * Gracefully terminate the active use of the public methods other than
 * property getters/setters and life cycle methods of this component. Once
 * the STOP_EVENT is fired, the public methods other than property
 * getters/setters and life cycle methods should not be used. The following
 * {@link LifecycleEvent}s will be fired in the following order:
 * <ol>
 *   <li>BEFORE_STOP_EVENT: At the beginning of the method. It is at this
 *                          point that the state transitions to
 *                          {@link LifecycleState#STOPPING_PREP}.</li>
 *   <li>STOP_EVENT: During the method once it is safe to call stop() for
 *                   any child components. It is at this point that the
 *                   state transitions to {@link LifecycleState#STOPPING}
 *                   and that the public methods other than property
 *                   getters/setters and life cycle methods may no longer be
 *                   used.</li>
 *   <li>AFTER_STOP_EVENT: At the end of the method, immediately before it
 *                         returns. It is at this point that the state
 *                         transitions to {@link LifecycleState#STOPPED}.
 *                         </li>
 * </ol>
 *
 * Note that if transitioning from {@link LifecycleState#FAILED} then the
 * three events above will be fired but the component will transition
 * directly from {@link LifecycleState#FAILED} to
 * {@link LifecycleState#STOPPING}, bypassing
 * {@link LifecycleState#STOPPING_PREP}
 * TODO 组件停止
 * @exception LifecycleException if this component detects a fatal error
 *  that needs to be reported
 */
public void stop() throws LifecycleException;
```

![image-20220930093325110](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930093325110.png)

`LifecycleBase`是`Lifecycle`接口的一个抽象实现类，其`stop`定义了组件停止的步骤，其调用的`stopInternal()`由具体类实现，具体类实现其核心停止步骤。

```java
@Override
public final synchronized void stop() throws LifecycleException {

    if (LifecycleState.STOPPING_PREP.equals(state) || LifecycleState.STOPPING.equals(state) ||
            LifecycleState.STOPPED.equals(state)) {

        if (log.isDebugEnabled()) {
            Exception e = new LifecycleException();
            log.debug(sm.getString("lifecycleBase.alreadyStopped", toString()), e);
        } else if (log.isInfoEnabled()) {
            log.info(sm.getString("lifecycleBase.alreadyStopped", toString()));
        }

        return;
    }

    if (state.equals(LifecycleState.NEW)) {
        state = LifecycleState.STOPPED;
        return;
    }

    if (!state.equals(LifecycleState.STARTED) && !state.equals(LifecycleState.FAILED)) {
        invalidTransition(Lifecycle.BEFORE_STOP_EVENT);
    }

    try {
        if (state.equals(LifecycleState.FAILED)) {
            // Don't transition to STOPPING_PREP as that would briefly mark the
            // component as available but do ensure the BEFORE_STOP_EVENT is
            // fired
            fireLifecycleEvent(BEFORE_STOP_EVENT, null);
        } else {
            setStateInternal(LifecycleState.STOPPING_PREP, null, false);
        }

        stopInternal();

        // Shouldn't be necessary but acts as a check that sub-classes are
        // doing what they are supposed to.
        if (!state.equals(LifecycleState.STOPPING) && !state.equals(LifecycleState.FAILED)) {
            invalidTransition(Lifecycle.AFTER_STOP_EVENT);
        }

        setStateInternal(LifecycleState.STOPPED, null, false);
    } catch (Throwable t) {
        handleSubClassException(t, "lifecycleBase.stopFail", toString());
    } finally {
        if (this instanceof Lifecycle.SingleUse) {
            // Complete stop process first
            setStateInternal(LifecycleState.STOPPED, null, false);
            destroy();
        }
    }
}


/**
 * Sub-classes must ensure that the state is changed to
 * {@link LifecycleState#STOPPING} during the execution of this method.
 * Changing state will trigger the {@link Lifecycle#STOP_EVENT} event.
 *
 * @throws LifecycleException Stop error occurred
 */
protected abstract void stopInternal() throws LifecycleException;
```

![image-20220930144112583](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930144112583.png)

#### 4. `destroy`

 `destroy`方法会销毁组件

```java
/**
 * Prepare to discard the object. The following {@link LifecycleEvent}s will
 * be fired in the following order:
 * <ol>
 *   <li>DESTROY_EVENT: On the successful completion of component
 *                      destruction.</li>
 * </ol>
 * TODO 组件销毁
 * @exception LifecycleException if this component detects a fatal error
 *  that prevents this component from being used
 */
public void destroy() throws LifecycleException;
```

![image-20220930093521438](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930093521438.png)

`LifecycleBase`是`Lifecycle`接口的一个抽象实现类，其`destroy`定义了组件销毁的步骤，其调用的`destroyInternal()`由具体类实现，具体类实现其核心销毁步骤。

```java
@Override
public final synchronized void destroy() throws LifecycleException {
    if (LifecycleState.FAILED.equals(state)) {
        try {
            // Triggers clean-up
            stop();
        } catch (LifecycleException e) {
            // Just log. Still want to destroy.
            log.error(sm.getString("lifecycleBase.destroyStopFail", toString()), e);
        }
    }

    if (LifecycleState.DESTROYING.equals(state) || LifecycleState.DESTROYED.equals(state)) {
        if (log.isDebugEnabled()) {
            Exception e = new LifecycleException();
            log.debug(sm.getString("lifecycleBase.alreadyDestroyed", toString()), e);
        } else if (log.isInfoEnabled() && !(this instanceof Lifecycle.SingleUse)) {
            // Rather than have every component that might need to call
            // destroy() check for SingleUse, don't log an info message if
            // multiple calls are made to destroy()
            log.info(sm.getString("lifecycleBase.alreadyDestroyed", toString()));
        }

        return;
    }

    if (!state.equals(LifecycleState.STOPPED) && !state.equals(LifecycleState.FAILED) &&
            !state.equals(LifecycleState.NEW) && !state.equals(LifecycleState.INITIALIZED)) {
        invalidTransition(Lifecycle.BEFORE_DESTROY_EVENT);
    }

    try {
        setStateInternal(LifecycleState.DESTROYING, null, false);
        destroyInternal();
        setStateInternal(LifecycleState.DESTROYED, null, false);
    } catch (Throwable t) {
        handleSubClassException(t, "lifecycleBase.destroyFail", toString());
    }
}


/**
 * Sub-classes implement this method to perform any instance destruction
 * required.
 *
 * @throws LifecycleException If the destruction fails
 */
protected abstract void destroyInternal() throws LifecycleException;
```

![image-20220930144326592](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930144326592.png)

### 3. 获取组件状态

```java
/**
 * Obtain the current state of the source component.
 *
 * @return The current state of the source component.
 */
public LifecycleState getState();


/**
 * Obtain a textual representation of the current component state. Useful
 * for JMX. The format of this string may vary between point releases and
 * should not be relied upon to determine component state. To determine
 * component state, use {@link #getState()}.
 *
 * @return The name of the current component state.
 */
public String getStateName();
```

![image-20220930093655756](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930093655756.png)

## 2. `Container`容器

`Container`的继承关系

![image-20220930094459417](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930094459417.png)

### 1. `addChild`

容器可以添加子容器

```java
/**
 * Add a new child Container to those associated with this Container,
 * if supported.  Prior to adding this Container to the set of children,
 * the child's <code>setParent()</code> method must be called, with this
 * Container as an argument.  This method may thrown an
 * <code>IllegalArgumentException</code> if this Container chooses not
 * to be attached to the specified Container, in which case it is not added
 *
 * @param child New child Container to be added
 *
 * @exception IllegalArgumentException if this exception is thrown by
 *  the <code>setParent()</code> method of the child Container
 * @exception IllegalArgumentException if the new child does not have
 *  a name unique from that of existing children of this Container
 * @exception IllegalStateException if this Container does not support
 *  child Containers
 */
public void addChild(Container child);
```

![image-20220930095356068](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930095356068.png)

### 2. `getParent`

容器有父容器

```java
/**
 * Get the parent container.
 * TODO 容器有父容器
 * @return Return the Container for which this Container is a child, if
 *         there is one. If there is no defined parent, return
 *         <code>null</code>.
 */
public Container getParent();
```

![image-20220930100618122](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930100618122.png)

### 3. `Pipeline`

容器中还有管道

```java
/**
 * Return the Pipeline object that manages the Valves associated with
 * this Container.
 *
 * @return The Pipeline
 */
public Pipeline getPipeline();
```

![image-20220930100740533](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930100740533.png)

### 4. `Valve`

#### 阀门

每一个容器里面都有管道，管道里面有很多的Valve (阀门)，阀门可以预处理请求

```java
public interface Pipeline extends Contained {

    /**
     * @return the Valve instance that has been distinguished as the basic
     * Valve for this Pipeline (if any).
     */
    public Valve getBasic();


    /**
     * <p>Set the Valve instance that has been distinguished as the basic
     * Valve for this Pipeline (if any).  Prior to setting the basic Valve,
     * the Valve's <code>setContainer()</code> will be called, if it
     * implements <code>Contained</code>, with the owning Container as an
     * argument.  The method may throw an <code>IllegalArgumentException</code>
     * if this Valve chooses not to be associated with this Container, or
     * <code>IllegalStateException</code> if it is already associated with
     * a different Container.</p>
     *
     * @param valve Valve to be distinguished as the basic Valve
     */
    public void setBasic(Valve valve);


    /**
     * <p>Add a new Valve to the end of the pipeline associated with this
     * Container.  Prior to adding the Valve, the Valve's
     * <code>setContainer()</code> method will be called, if it implements
     * <code>Contained</code>, with the owning Container as an argument.
     * The method may throw an
     * <code>IllegalArgumentException</code> if this Valve chooses not to
     * be associated with this Container, or <code>IllegalStateException</code>
     * if it is already associated with a different Container.</p>
     *
     * <p>Implementation note: Implementations are expected to trigger the
     * {@link Container#ADD_VALVE_EVENT} for the associated container if this
     * call is successful.</p>
     *
     * @param valve Valve to be added
     *
     * @exception IllegalArgumentException if this Container refused to
     *  accept the specified Valve
     * @exception IllegalArgumentException if the specified Valve refuses to be
     *  associated with this Container
     * @exception IllegalStateException if the specified Valve is already
     *  associated with a different Container
     */
    public void addValve(Valve valve);


    /**
     * @return the set of Valves in the pipeline associated with this
     * Container, including the basic Valve (if any).  If there are no
     * such Valves, a zero-length array is returned.
     */
    public Valve[] getValves();


    /**
     * Remove the specified Valve from the pipeline associated with this
     * Container, if it is found; otherwise, do nothing.  If the Valve is
     * found and removed, the Valve's <code>setContainer(null)</code> method
     * will be called if it implements <code>Contained</code>.
     *
     * <p>Implementation note: Implementations are expected to trigger the
     * {@link Container#REMOVE_VALVE_EVENT} for the associated container if this
     * call is successful.</p>
     *
     * @param valve Valve to be removed
     */
    public void removeValve(Valve valve);


    /**
     * @return the Valve instance that has been distinguished as the basic
     * Valve for this Pipeline (if any).
     */
    public Valve getFirst();


    /**
     * Returns true if all the valves in this pipeline support async, false otherwise
     * @return true if all the valves in this pipeline support async, false otherwise
     */
    public boolean isAsyncSupported();


    /**
     * Identifies the Valves, if any, in this Pipeline that do not support
     * async.
     *
     * @param result The Set to which the fully qualified class names of each
     *               Valve in this Pipeline that does not support async will be
     *               added
     */
    public void findNonAsyncValves(Set<String> result);
}
```

![image-20220930102317782](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930102317782.png)

#### 阀门的方法

阀门是一个责任链，可以执行该阀门，也可以获取、修改下一个阀门

```java
public interface Valve {

    /**
     * @return the next Valve in the pipeline containing this Valve, if any.
     */
    public Valve getNext();


    /**
     * Set the next Valve in the pipeline containing this Valve.
     *
     * @param valve The new next valve, or <code>null</code> if none
     */
    public void setNext(Valve valve);

    public void backgroundProcess();
    /**
     *  ...
     *
     * @param request The servlet request to be processed
     * @param response The servlet response to be created
     *
     * @exception IOException if an input/output error occurs, or is thrown
     *  by a subsequently invoked Valve, Filter, or Servlet
     * @exception ServletException if a servlet error occurs, or is thrown
     *  by a subsequently invoked Valve, Filter, or Servlet
     */
    public void invoke(Request request, Response response)
        throws IOException, ServletException;


    public boolean isAsyncSupported();
}
```

![image-20220930105207116](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930105207116.png)



#### 访问日志阀门

在`server.xml`里配置了一个`AccessLogValve`，访问日志阀门

```java
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
       prefix="localhost_access_log" suffix=".txt"
       pattern="%h %l %u %t &quot;%r&quot; %s %b" />
```

![image-20220930102744681](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930102744681.png)

`AccessLogValve`类可以记录日志

```java
/**
 * Log the specified message to the log file, switching files if the date
 * has changed since the previous log call.
 *
 * @param message Message to be logged
 */
@Override
public void log(CharArrayWriter message) {

    rotate();

    /* In case something external rotated the file instead */
    if (checkExists) {
        synchronized (this) {
            if (currentLogFile != null && !currentLogFile.exists()) {
                try {
                    close(false);
                } catch (Throwable e) {
                    ExceptionUtils.handleThrowable(e);
                    log.info(sm.getString("accessLogValve.closeFail"), e);
                }

                /* Make sure date is correct */
                dateStamp = fileDateFormatter.format(
                        new Date(System.currentTimeMillis()));

                open();
            }
        }
    }

    // Log this message
    try {
        message.write(System.lineSeparator());
        synchronized(this) {
            if (writer != null) {
                message.writeTo(writer);
                if (!buffered) {
                    writer.flush();
                }
            }
        }
    } catch (IOException ioe) {
        log.warn(sm.getString(
                "accessLogValve.writeFail", message.toString()), ioe);
    }
}
```

![image-20220930103045789](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930103045789.png)

# 四、tomcat启动的初始化流程

### 1.创建`Bootstrap`对象

首先**加锁**创建一个`Bootstrap`对象，然后调用其`init`方法

```java
public static void main(String args[]) {

    synchronized (daemonLock) {
        if (daemon == null) {
            // Don't set daemon until init() has completed
            Bootstrap bootstrap = new Bootstrap();
            try {
                bootstrap.init();
            } catch (Throwable t) {
                handleThrowable(t);
                t.printStackTrace();
                return;
            }
            daemon = bootstrap;
        } else {
            // When running as a service the call to stop will be on a new
            // thread so make sure the correct class loader is used to
            // prevent a range of class not found exceptions.
            Thread.currentThread().setContextClassLoader(daemon.catalinaLoader);
        }
    }
    ...
}
```

![image-20220930145025410](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930145025410.png)

### 2. 调用`bootstrap.init()`

#### 1. 初始化三个类加载器

该方法首先会调用`initClassLoaders()`，初始化类加载器

```java
public void init() throws Exception {

    initClassLoaders();

    Thread.currentThread().setContextClassLoader(catalinaLoader);

    SecurityClassLoad.securityClassLoad(catalinaLoader);

    // Load our startup class and call its process() method
    if (log.isDebugEnabled())
        log.debug("Loading startup class");
    Class<?> startupClass = catalinaLoader.loadClass("org.apache.catalina.startup.Catalina");
    Object startupInstance = startupClass.getConstructor().newInstance();

    // Set the shared extensions class loader
    if (log.isDebugEnabled())
        log.debug("Setting startup class properties");
    String methodName = "setParentClassLoader";
    Class<?> paramTypes[] = new Class[1];
    paramTypes[0] = Class.forName("java.lang.ClassLoader");
    Object paramValues[] = new Object[1];
    paramValues[0] = sharedLoader;
    Method method =
        startupInstance.getClass().getMethod(methodName, paramTypes);
    method.invoke(startupInstance, paramValues);

    catalinaDaemon = startupInstance;
}
```

![image-20220930145227122](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930145227122.png)

其会加载`tomcat`其中三个类加载器：`commonLoader`、`catalinaLoader`、`sharedLoader`

##### 2. `commonLoader`

是位于Tomcat 应用服务器顶层的公用类加载器,默认是加载`${catalina.base}/lib`下的`jar`包

```java
private void initClassLoaders() {
    try {
        commonLoader = createClassLoader("common", null);
        if (commonLoader == null) {
            // no config file, default to this loader - we might be in a 'single' env.
            commonLoader = this.getClass().getClassLoader();
        }
        catalinaLoader = createClassLoader("server", commonLoader);
        sharedLoader = createClassLoader("shared", commonLoader);
    } catch (Throwable t) {
        handleThrowable(t);
        log.error("Class loader creation threw exception", t);
        System.exit(1);
    }
}
```

![image-20220930152802075](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930152802075.png)

加载的详细过程：（下面的不重要）

![image-20220930153203056](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930153203056.png)

`CatalinaProperties`类的静态代码块会调用静态的`loadProperties()`方法，该方法会读取`catalina.properties`文件

```java
public class CatalinaProperties {

    private static final Log log = LogFactory.getLog(CatalinaProperties.class);

    private static Properties properties = null;


    static {
        loadProperties();
    }


    /**
     * @param name The property name
     * @return specified property value
     */
    public static String getProperty(String name) {
        return properties.getProperty(name);
    }


    /**
     * Load properties.
     */
    private static void loadProperties() {

        InputStream is = null;
        String fileName = "catalina.properties";

        try {
             // configUrl为null
            String configUrl = System.getProperty("catalina.config");
            if (configUrl != null) {
                if (configUrl.indexOf('/') == -1) {
                    // No '/'. Must be a file name rather than a URL
                    fileName = configUrl;
                } else {
                    is = (new URL(configUrl)).openStream();
                }
            }
        } catch (Throwable t) {
            handleThrowable(t);
        }

        if (is == null) {
            try {
                // B:\apache-tomcat-9.0.44-src (项目的根目录)
                File home = new File(Bootstrap.getCatalinaBase());
                // B:\apache-tomcat-9.0.44-src\conf
                File conf = new File(home, "conf");
                // B:\apache-tomcat-9.0.44-src\conf\catalina.properties
                File propsFile = new File(conf, fileName);
                is = new FileInputStream(propsFile);
            } catch (Throwable t) {
                handleThrowable(t);
            }
        }

        if (is == null) {
            try {
                is = CatalinaProperties.class.getResourceAsStream
                    ("/org/apache/catalina/startup/catalina.properties");
            } catch (Throwable t) {
                handleThrowable(t);
            }
        }

        if (is != null) {
            try {
                properties = new Properties();
                //加载配置文件
                properties.load(is);
            } catch (Throwable t) {
                handleThrowable(t);
                log.warn(t);
            } finally {
                try {
                    // 关闭文件输入流
                    is.close();
                } catch (IOException ioe) {
                    log.warn("Could not close catalina properties file", ioe);
                }
            }
        }

        if ((is == null)) {
            // Do something
            log.warn("Failed to load catalina properties file");
            // That's fine - we have reasonable defaults.
            properties = new Properties();
        }

        // Register the properties as system properties
        Enumeration<?> enumeration = properties.propertyNames();
        while (enumeration.hasMoreElements()) {
            String name = (String) enumeration.nextElement();
            String value = properties.getProperty(name);
            if (value != null) {
                System.setProperty(name, value);
            }
        }
    }
    ...
}
```

![image-20220930154942200](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930154942200.png)

该文件会指定`common.loader`加载的路径

```properties
#
#
# List of comma-separated paths defining the contents of the "common"
# classloader. Prefixes should be used to define what is the repository type.
# Path may be relative to the CATALINA_HOME or CATALINA_BASE path or absolute.
# If left as blank,the JVM system loader will be used as Catalina's "common"
# loader.
# Examples:
#     "foo": Add this folder as a class repository
#     "foo/*.jar": Add all the JARs of the specified folder as class
#                  repositories
#     "foo/bar.jar": Add bar.jar as a class repository
#
# Note: Values are enclosed in double quotes ("...") in case either the
#       ${catalina.base} path or the ${catalina.home} path contains a comma.
#       Because double quotes are used for quoting, the double quote character
#       may not appear in a path.
common.loader="${catalina.base}/lib","${catalina.base}/lib/*.jar","${catalina.home}/lib","${catalina.home}/lib/*.jar"

server.loader=

shared.loader=
```

![image-20220930154136220](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930154136220.png)

加载到`lib`里的jar包后，调用`replace(value)`方法，把`${catalina.base}`替换为项目根路径

```java
private ClassLoader createClassLoader(String name, ClassLoader parent)
    throws Exception {
//"${catalina.base}/lib","${catalina.base}/lib/*.jar","${catalina.home}/lib","${catalina.home}/lib/*.jar"
    String value = CatalinaProperties.getProperty(name + ".loader");
    if ((value == null) || (value.equals("")))
        return parent;
    //将【${catalina.base}】替换为项目根路径  "B:\apache-tomcat-9.0.44-src/lib","B:\apache-tomcat-9.0.44-src/lib/*.jar","B:\apache-tomcat-9.0.44-src/lib","B:\apache-tomcat-9.0.44-src/lib/*.jar"
    value = replace(value);

    List<Repository> repositories = new ArrayList<>();

    String[] repositoryPaths = getPaths(value);

    for (String repository : repositoryPaths) {
        // Check for a JAR URL repository
        try {
            @SuppressWarnings("unused")
            URL url = new URL(repository);
            repositories.add(new Repository(repository, RepositoryType.URL));
            continue;
        } catch (MalformedURLException e) {
            // Ignore
        }

        // Local repository
        if (repository.endsWith("*.jar")) {
            repository = repository.substring
                (0, repository.length() - "*.jar".length());
            repositories.add(new Repository(repository, RepositoryType.GLOB));
        } else if (repository.endsWith(".jar")) {
            repositories.add(new Repository(repository, RepositoryType.JAR));
        } else {
            repositories.add(new Repository(repository, RepositoryType.DIR));
        }
    }

    return ClassLoaderFactory.createClassLoader(repositories, parent);
}
```

![image-20220930155507951](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930155507951.png)

`Bootstrap`类的静态代码块会调用`System.getProperty("user.dir")` （返回`B:\apache-tomcat-9.0.44-src`），然后根据路径初始化这些变量

```java
protected String replace(String str) {
    // Implementation is copied from ClassLoaderLogManager.replace(),
    // but added special processing for catalina.home and catalina.base.
    String result = str;
    int pos_start = str.indexOf("${");
    if (pos_start >= 0) {
        StringBuilder builder = new StringBuilder();
        int pos_end = -1;
        while (pos_start >= 0) {
            builder.append(str, pos_end + 1, pos_start);
            pos_end = str.indexOf('}', pos_start + 2);
            if (pos_end < 0) {
                pos_end = pos_start - 1;
                break;
            }
            String propName = str.substring(pos_start + 2, pos_end);
            String replacement;
            if (propName.length() == 0) {
                replacement = null;
            } else if (Constants.CATALINA_HOME_PROP.equals(propName)) {
                replacement = getCatalinaHome();
            } else if (Constants.CATALINA_BASE_PROP.equals(propName)) {
                replacement = getCatalinaBase();
            } else {
                replacement = System.getProperty(propName);
            }
            if (replacement != null) {
                builder.append(replacement);
            } else {
                builder.append(str, pos_start, pos_end + 1);
            }
            pos_start = str.indexOf("${", pos_end + 1);
        }
        builder.append(str, pos_end + 1, str.length());
        result = builder.toString();
    }
    return result;
}
```

![image-20220930155702526](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930155702526.png)

##### 3. `catalinaLoader`

`catalinaLoader`直接返回其父加载器`commonLoader`

![image-20220930161852779](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930161852779.png)

```java
private ClassLoader createClassLoader(String name, ClassLoader parent)
    throws Exception {

    String value = CatalinaProperties.getProperty(name + ".loader");
    if ((value == null) || (value.equals("")))
        return parent;

    value = replace(value);
    ...
}
```

![image-20220930161812291](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930161812291.png)

##### 4. `sharedLoader`

`sharedLoader`也是直接返回其父加载器`commonLoader`

![image-20220930162001997](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930162001997.png)

![image-20220930162027230](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930162027230.png)

#### 2. 创建`Catalina`对象

加载完类加载器后，将当前线程的类加载器设置为`catalinaLoader`，然后使用`catalinaLoader`类加载器创建`Catalina`对象

```java
    public void init() throws Exception {

        initClassLoaders();

        Thread.currentThread().setContextClassLoader(catalinaLoader);

        SecurityClassLoad.securityClassLoad(catalinaLoader);

        // Load our startup class and call its process() method
        if (log.isDebugEnabled())
            log.debug("Loading startup class");
        Class<?> startupClass = catalinaLoader.loadClass("org.apache.catalina.startup.Catalina");
        Object startupInstance = startupClass.getConstructor().newInstance();

        // Set the shared extensions class loader
        if (log.isDebugEnabled())
            log.debug("Setting startup class properties");
        String methodName = "setParentClassLoader";
        Class<?> paramTypes[] = new Class[1];
        paramTypes[0] = Class.forName("java.lang.ClassLoader");
        Object paramValues[] = new Object[1];
        paramValues[0] = sharedLoader;
        Method method =
            startupInstance.getClass().getMethod(methodName, paramTypes);
        method.invoke(startupInstance, paramValues);  //设置Catalina的父加载器为sharedLoader
        // catalina的后台线程
        catalinaDaemon = startupInstance;
    }
```

![image-20220930163243238](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930163243238.png)

获取到`Catalina`对象的`setParentClassLoader`方法，然携带`sharedLoader`参数执行该方法，表示使用`sharedLoader`作为`parentClassLoader`

![image-20220930163923441](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930163923441.png)

### 3. 加载命令行参数

#### 1. 调用`daemon.load(args)`方法

```java
public static void main(String args[]) {

    synchronized (daemonLock) {
        if (daemon == null) {
            // Don't set daemon until init() has completed
            Bootstrap bootstrap = new Bootstrap();
            try {
                bootstrap.init();
            } catch (Throwable t) {
                handleThrowable(t);
                t.printStackTrace();
                return;
            }
            daemon = bootstrap;
        } else {
            // When running as a service the call to stop will be on a new
            // thread so make sure the correct class loader is used to
            // prevent a range of class not found exceptions.
            Thread.currentThread().setContextClassLoader(daemon.catalinaLoader);
        }
    }

    try {
        String command = "start";
        if (args.length > 0) {
            command = args[args.length - 1];
        }

        if (command.equals("startd")) {
            args[args.length - 1] = "start";
            daemon.load(args);
            daemon.start();
        } else if (command.equals("stopd")) {
            args[args.length - 1] = "stop";
            daemon.stop();
        } else if (command.equals("start")) {
            daemon.setAwait(true);
            daemon.load(args);
            daemon.start();
            if (null == daemon.getServer()) {
                System.exit(1);
            }
        } else if (command.equals("stop")) {
            daemon.stopServer(args);
        } else if (command.equals("configtest")) {
            daemon.load(args);
            if (null == daemon.getServer()) {
                System.exit(1);
            }
            System.exit(0);
        } else {
            log.warn("Bootstrap: command \"" + command + "\" does not exist.");
        }
    } catch (Throwable t) {
        // Unwrap the Exception for clearer error reporting
        if (t instanceof InvocationTargetException &&
                t.getCause() != null) {
            t = t.getCause();
        }
        handleThrowable(t);
        t.printStackTrace();
        System.exit(1);
    }
}
```

然后将`command`初始化为`start`

![image-20220930165143056](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930165143056.png)

然后加载命令行参数

![image-20220930165354321](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930165354321.png)

#### 2. 利用反射执行`catalinaDaemon.load()`

利用反射执行`catalinaDaemon`的`load()`方法

```java
private void load(String[] arguments) throws Exception {

    // Call the load() method
    String methodName = "load";
    Object param[];
    Class<?> paramTypes[];
    if (arguments==null || arguments.length==0) {
        paramTypes = null;
        param = null;
    } else {
        paramTypes = new Class[1];
        paramTypes[0] = arguments.getClass();
        param = new Object[1];
        param[0] = arguments;
    }
    Method method =
        catalinaDaemon.getClass().getMethod(methodName, paramTypes);
    if (log.isDebugEnabled()) {
        log.debug("Calling startup class " + method);
    }
    method.invoke(catalinaDaemon, param);
}
```

![image-20220930170107930](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930170107930.png)

#### 3. 解析 server.xml

```java
public void load() {

    if (loaded) {
        return;
    }
    loaded = true;

    long t1 = System.nanoTime();
    // 初始化目录
    initDirs();
    // 初始化命名服务 (JNDI)
    // Before digester - it may be needed
    initNaming();
    // 解析server.xml文件
    // Parse main server.xml
    parseServerXml(true);
    Server s = getServer();
    if (s == null) {
        return;
    }
    ...
}
```

![image-20220930170845132](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930170845132.png)

首先获取`B:\apache-tomcat-9.0.44-src\conf\server.xml`文件

![image-20220930171537222](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930171537222.png)

准备解析xml文件

```java
protected void parseServerXml(boolean start) {
    // Set configuration source
    ConfigFileLoader.setSource(new CatalinaBaseConfigurationSource(Bootstrap.getCatalinaBaseFile(), getConfigFile()));
    File file = configFile();
    ...
    ServerXml serverXml = null;
    if (useGeneratedCode) {
        serverXml = (ServerXml) Digester.loadGeneratedClass(xmlClassName);
    }

    if (serverXml != null) {
        serverXml.load(this);
    } else {
        try (ConfigurationSource.Resource resource = ConfigFileLoader.getSource().getServerXml()) {
            // Create and execute our Digester 
            // Digester是解析xml的工具
            Digester digester = start ? createStartDigester() : createStopDigester();
            InputStream inputStream = resource.getInputStream();
            InputSource inputSource = new InputSource(resource.getURI().toURL().toString());
            inputSource.setByteStream(inputStream);
            digester.push(this);
            if (generateCode) {
                digester.startGeneratingCode();
                generateClassHeader(digester, start);
            }
            // 解析xml文件
            digester.parse(inputSource);
            if (generateCode) {
                generateClassFooter(digester);
                try (FileWriter writer = new FileWriter(new File(serverXmlLocation,
                        start ? "ServerXml.java" : "ServerXmlStop.java"))) {
                    writer.write(digester.getGeneratedCode().toString());
                }
                digester.endGeneratingCode();
                Digester.addGeneratedClass(xmlClassName);
            }
        } catch (Exception e) {
            log.warn(sm.getString("catalina.configFail", file.getAbsolutePath()), e);
            if (file.exists() && !file.canRead()) {
                log.warn(sm.getString("catalina.incorrectPermissions"));
            }
        }
    }
}
```

![image-20220930171757396](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930171757396.png)

使用xml读取器读取`server.xml`文件

```java
/**
 * Parse the content of the specified input source using this Digester.
 * Returns the root element from the object stack (if any).
 *
 * @param input Input source containing the XML data to be parsed
 * @return the root object
 * @exception IOException if an input/output error occurs
 * @exception SAXException if a parsing exception occurs
 */
public Object parse(InputSource input) throws IOException, SAXException {
    configure();
    // xml读取器读取xml文件
    getXMLReader().parse(input);
    return root;
}
```

![image-20220930215255412](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930215255412.png)

调用`super.parse(inputSource);`

```java
public void parse(InputSource inputSource)
    throws SAXException, IOException {
    if (fSAXParser != null && fSAXParser.fSchemaValidator != null) {
        if (fSAXParser.fSchemaValidationManager != null) {
            fSAXParser.fSchemaValidationManager.reset();
            fSAXParser.fUnparsedEntityHandler.reset();
        }
        resetSchemaValidator();
    }
    super.parse(inputSource);
}
```

![image-20220930215529954](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930215529954.png)



```java
public void parse(InputSource inputSource)
    throws SAXException, IOException {

    // parse document
    try {
        XMLInputSource xmlInputSource =
            new XMLInputSource(inputSource.getPublicId(),
                               inputSource.getSystemId(),
                               null);
        xmlInputSource.setByteStream(inputSource.getByteStream());
        xmlInputSource.setCharacterStream(inputSource.getCharacterStream());
        xmlInputSource.setEncoding(inputSource.getEncoding());
        parse(xmlInputSource);
    }
    ...
}
```

![image-20220930215908744](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930215908744.png)

`inputSource`解析的所有资源都会放到`fConfiguration`里

```java
public void parse(XMLInputSource inputSource)
    throws XNIException, IOException {
    // null indicates that the parser is called directly, initialize them
    if (securityManager == null) {
        securityManager = new XMLSecurityManager(true);
        fConfiguration.setProperty(Constants.SECURITY_MANAGER, securityManager);
    }
    if (securityPropertyManager == null) {
        securityPropertyManager = new XMLSecurityPropertyManager();
        fConfiguration.setProperty(Constants.XML_SECURITY_PROPERTY_MANAGER, securityPropertyManager);
    }

    reset();
    fConfiguration.parse(inputSource);

} // parse(XMLInputSource)
```

![image-20220930220051352](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930220051352.png)



```java
public void parse(XMLInputSource source) throws XNIException, IOException {

    if (fParseInProgress) {
        // REVISIT - need to add new error message
        throw new XNIException("FWK005 parse may not be called while parsing.");
    }
    fParseInProgress = true;

    try {
        setInputSource(source);
        parse(true);
    } catch (XNIException ex) {
        ...
    } finally {
        fParseInProgress = false;
        // close all streams opened by xerces
        this.cleanup();
    }

} // parse(InputSource)
```

![image-20220930220342735](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930220342735.png)



```java
public boolean parse(boolean complete) throws XNIException, IOException {
    //
    // reset and configure pipeline and set InputSource.
    if (fInputSource != null) {
        try {
            fValidationManager.reset();
            fVersionDetector.reset(this);
            fConfigUpdated = true;
            resetCommon();

            short version = fVersionDetector.determineDocVersion(fInputSource);
            if (version == Constants.XML_VERSION_1_1) {
                initXML11Components();
                configureXML11Pipeline();
                resetXML11();
            } else {
                configurePipeline();
                reset();
            }

            // mark configuration as fixed
            fConfigUpdated = false;

            // resets and sets the pipeline.
            fVersionDetector.startDocumentParsing((XMLEntityHandler) fCurrentScanner, version);
            fInputSource = null;
        } catch (XNIException ex) {
            ...
        }
    }

    try {
        return fCurrentScanner.scanDocument(complete);
    } catch (XNIException ex) {
        ...
    }

} // parse(boolean):boolean
```

![image-20220930220532368](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930220532368.png)



```java
protected void configurePipeline() {
    super.configurePipeline();
    if (fXIncludeEnabled) {
        // If the XInclude handler was not in the pipeline insert it.
        if (fXIncludeHandler == null) {
            fXIncludeHandler = new XIncludeHandler();
            // add XInclude component
            setProperty(XINCLUDE_HANDLER, fXIncludeHandler);
            addCommonComponent(fXIncludeHandler);
            fXIncludeHandler.reset(this);
        }
        ...
    }
    else {
        // Setup NamespaceContext
        if (fCurrentNSContext != fNonXIncludeNSContext) {
            fCurrentNSContext = fNonXIncludeNSContext;
            setProperty(NAMESPACE_CONTEXT, fNonXIncludeNSContext);
        }
    }
} // configurePipeline()
```

![image-20220930220831657](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930220831657.png)

`configurePipeline`前面都是与`DTD`有关的，`addComponent((XMLComponent) fNonNSScanner)`会将解析到的资源添加到组件

```java
protected void configurePipeline() {
    ...
    // setup document pipeline
    if (fFeatures.get(NAMESPACES) == Boolean.TRUE) {
        if (fCurrentScanner != fNamespaceScanner) {
            fCurrentScanner = fNamespaceScanner;
            setProperty(DOCUMENT_SCANNER, fNamespaceScanner);
            setProperty(DTD_VALIDATOR, fDTDValidator);
        }
        fNamespaceScanner.setDTDValidator(fDTDValidator);
        fNamespaceScanner.setDocumentHandler(fDTDValidator);
        fDTDValidator.setDocumentSource(fNamespaceScanner);
        fDTDValidator.setDocumentHandler(fDocumentHandler);
        if (fDocumentHandler != null) {
            fDocumentHandler.setDocumentSource(fDTDValidator);
        }
        fLastComponent = fDTDValidator;
    } else {
        // create components
        if (fNonNSScanner == null) {
            fNonNSScanner = new XMLDocumentScannerImpl();
            fNonNSDTDValidator = new XMLDTDValidator();
            // add components
            addComponent((XMLComponent) fNonNSScanner);
            addComponent((XMLComponent) fNonNSDTDValidator);
        }
        ...
    }
    ...
} // configurePipeline()
```

![image-20220930221134681](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930221134681.png)

xml解析到J哪些标签就创建出对象，然后都层级封装到Catalina里面

![image-20220930221809623](https://gitlab.com/apzs/image/-/raw/master/image/image-20220930221809623.png)



#### 4. 解析标签

在`StandardService`类里添加无参构造，给该无参构造打上断点

```java
public StandardService(){
    log.info("创建StandardService对象");
}
```

![GIF 2022-9-30 23-03-59](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-9-30 23-03-59.gif)

根据栈轨迹可以查到到`AbstractSAXParser`类的`startElement`方法。` fContentHandler.startElement(uri, localpart, element.rawname,fAttributesProxy);`可以解析到`server.xml`文件里的标签

```java
public void startElement(QName element, XMLAttributes attributes, Augmentations augs)
    throws XNIException {

    try {
        // SAX1
        if (fDocumentHandler != null) {
            // REVISIT: should we support schema-normalized-value for SAX1 events
            //
            fAttributesProxy.setAttributes(attributes);
            fDocumentHandler.startElement(element.rawname, fAttributesProxy);
        }

        // SAX2
        if (fContentHandler != null) {
            ...

            fAugmentations = augs;

            String uri = element.uri != null ? element.uri : "";
            String localpart = fNamespaces ? element.localpart : "";
            fAttributesProxy.setAttributes(attributes);
            fContentHandler.startElement(uri, localpart, element.rawname,
                                         fAttributesProxy);
        }
    }
    catch (SAXException e) {
        throw new XNIException(e);
    }

} // startElement(QName,XMLAttributes)
```

![GIF 2022-9-30 23-07-06](https://gitlab.com/apzs/image/-/raw/master/image/GIF 2022-9-30 23-07-06.gif)



```java
@Override
public void startElement(String namespaceURI, String localName, String qName, Attributes list)
        throws SAXException {
    ...
    // Fire "begin" events for all relevant rules
    List<Rule> rules = getRules().match(namespaceURI, match);
    matches.push(rules); //封装解析到的标签信息
    if ((rules != null) && (rules.size() > 0)) {
        for (Rule value : rules) {
            try {
                Rule rule = value;
                if (debug) {
                    log.debug("  Fire begin() for " + rule);
                }
                rule.begin(namespaceURI, name, list); // 开始解析
            } catch (Exception e) {
                log.error(sm.getString("digester.error.begin"), e);
                throw createSAXException(e);
            } catch (Error e) {
                log.error(sm.getString("digester.error.begin"), e);
                throw e;
            }
        }
    } else {
        if (debug) {
            log.debug(sm.getString("digester.noRulesFound", match));
        }
    }

}
```

![image-20221001210322051](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001210322051.png)

解析标签的信息，然后创建对象

```java
public class ObjectCreateRule extends Rule {
    ...
    protected String attributeName = null;

    protected String className = null;
    ...
    @Override
    public void begin(String namespace, String name, Attributes attributes)
            throws Exception {

        String realClassName = getRealClassName(attributes);

        if (realClassName == null) {
            throw new NullPointerException(sm.getString("rule.noClassName", namespace, name));
        }

        // Instantiate the new object and push it on the context stack
        Class<?> clazz = digester.getClassLoader().loadClass(realClassName);
        Object instance = clazz.getConstructor().newInstance();
        digester.push(instance);

        StringBuilder code = digester.getGeneratedCode();
        if (code != null) {
            code.append(System.lineSeparator());
            code.append(System.lineSeparator());
            code.append(realClassName).append(' ').append(digester.toVariableName(instance)).append(" = new ");
            code.append(realClassName).append("();").append(System.lineSeparator());
        }
    }

    protected String getRealClassName(Attributes attributes) {
        // Identify the name of the class to instantiate
        String realClassName = className;
        if (attributeName != null) {
            String value = attributes.getValue(attributeName);
            if (value != null) {
                realClassName = value;
            }
        }
        return realClassName;
    }
    ...
}
```

![image-20221001210625918](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001210625918.png)

如何查看`className`在何处设的值？只需给`protected String className = null;`打上断点，然后查看栈轨迹就行了

![image-20221001212435950](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001212435950.png)

解析`server.xml`值 (`Host`里面并不会在此时扫描到所有应用Context的存在，加载`Host`类后会扫描当前主机有多少个应用)

![image-20221001213645756](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001213645756.png)

## 4. 服务器初始化

### 1. `StandardServer`初始化

解析为`server.xml`文件后，调用`getServer().init();`方法，对服务器进行初始化

```java
public void load() {

    if (loaded) {
        return;
    }
    loaded = true;

    long t1 = System.nanoTime();
    // TODO 初始化目录
    initDirs();
    // TODO 初始化命名服务 (JNDI)
    // Before digester - it may be needed
    initNaming();
    // TODO 解析server.xml文件
    // Parse main server.xml
    parseServerXml(true);
    Server s = getServer();
    if (s == null) {
        return;
    }

    getServer().setCatalina(this);
    getServer().setCatalinaHome(Bootstrap.getCatalinaHomeFile());
    getServer().setCatalinaBase(Bootstrap.getCatalinaBaseFile());

    // Stream redirection
    initStreams();

    // Start the new server TODO 服务执行初始化
    try {
        getServer().init();
    } catch (LifecycleException e) {
        if (Boolean.getBoolean("org.apache.catalina.startup.EXIT_ON_INIT_FAILURE")) {
            throw new java.lang.Error(e);
        } else {
            log.error(sm.getString("catalina.initError"), e);
        }
    }

    if(log.isInfoEnabled()) {
        log.info(sm.getString("catalina.init", Long.toString(TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - t1))));
    }
}
```

![image-20221001215025333](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001215025333.png)

`getServer().init();`方法跳到了`StandardServer`类的父类`LifecycleBase`的`init()`方法。然后其调用` initInternal();`，调用子类的该方法，执行初始化核心逻辑。

```java
@Override
public final synchronized void init() throws LifecycleException {
    if (!state.equals(LifecycleState.NEW)) {
        invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
    }

    try {
        setStateInternal(LifecycleState.INITIALIZING, null, false);
        initInternal();
        setStateInternal(LifecycleState.INITIALIZED, null, false);
    } catch (Throwable t) {
        handleSubClassException(t, "lifecycleBase.initFail", toString());
    }
}
```

![image-20221001215257544](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001215257544.png)



```java
@Override
protected void initInternal() throws LifecycleException {

    super.initInternal();

    // Initialize utility executor
    reconfigureUtilityExecutor(getUtilityThreadsInternal(utilityThreads));
    register(utilityExecutor, "type=UtilityExecutor");

    // Register global String cache
    // Note although the cache is global, if there are multiple Servers
    // present in the JVM (may happen when embedding) then the same cache
    // will be registered under multiple names
    onameStringCache = register(new StringCache(), "type=StringCache");

    // Register the MBeanFactory
    MBeanFactory factory = new MBeanFactory();
    factory.setContainer(this);
    onameMBeanFactory = register(factory, "type=MBeanFactory");

    // Register the naming resources JNDI初始化
    globalNamingResources.init();

    // Populate the extension validator with JARs from common and shared
    // class loaders
    if (getCatalina() != null) {
        ClassLoader cl = getCatalina().getParentClassLoader();
        ...
    }
    // Initialize our defined Services
    for (Service service : services) {
        service.init(); // 初始化所有服务
    }
}
```

`initInternal()`会让`globalNamingResources` （JNDI） 初始化

![image-20221001215943469](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001215943469.png)

然后会让所有的所有的`service`初始化

![image-20221001220026088](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001220026088.png)

### 2. `StandardService`初始化

`service.init()`方法跳到了`StandardService`类的父类`LifecycleBase`的`init()`方法。然后其调用` initInternal();`，调用子类的该方法，执行初始化核心逻辑。

```java
@Override
public final synchronized void init() throws LifecycleException {
    if (!state.equals(LifecycleState.NEW)) {
        invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
    }

    try {
        setStateInternal(LifecycleState.INITIALIZING, null, false);
        initInternal();
        setStateInternal(LifecycleState.INITIALIZED, null, false);
    } catch (Throwable t) {
        handleSubClassException(t, "lifecycleBase.initFail", toString());
    }
}
```

![image-20221001220606794](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001220606794.png)

`StandardService`先让引擎初始化

```java
@Override
protected void initInternal() throws LifecycleException {

    super.initInternal();

    if (engine != null) {
        engine.init();
    }

    // Initialize any Executors
    for (Executor executor : findExecutors()) {
        if (executor instanceof JmxEnabled) {
            ((JmxEnabled) executor).setDomain(getDomain());
        }
        executor.init();
    }

    // Initialize mapper listener
    mapperListener.init();

    // Initialize our defined Connectors
    synchronized (connectorsLock) {
        for (Connector connector : connectors) {
            connector.init();
        }
    }
}
```

![image-20221001220908180](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001220908180.png)



#### 1. `StandardEngine`引擎初始化

```java
@Override
public final synchronized void init() throws LifecycleException {
    if (!state.equals(LifecycleState.NEW)) {
        invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
    }

    try {
        setStateInternal(LifecycleState.INITIALIZING, null, false);
        initInternal();
        setStateInternal(LifecycleState.INITIALIZED, null, false);
    } catch (Throwable t) {
        handleSubClassException(t, "lifecycleBase.initFail", toString());
    }
}
```

![image-20221001221208188](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001221208188.png)



```java
@Override
protected void initInternal() throws LifecycleException {
    // Ensure that a Realm is present before any attempt is made to start
    // one. This will create the default NullRealm if necessary.
    getRealm();
    super.initInternal();
}
```

![image-20221001221347657](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001221347657.png)





```java
protected void initInternal() throws LifecycleException {
    reconfigureStartStopExecutor(getStartStopThreads()); //配置线程池
    super.initInternal();
}
```

![image-20221001221537425](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001221537425.png)

注册一些可能用到的属性

```java
@Override
protected void initInternal() throws LifecycleException {
    // If oname is not null then registration has already happened via
    // preRegister().
    if (oname == null) {
        mserver = Registry.getRegistry(null, null).getMBeanServer();

        oname = register(this, getObjectNameKeyProperties());
    }
}
```

![image-20221001221641869](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001221641869.png)

#### 2. `MapperListener`监听器初始化

监听器的初始化，这里面什么都初始化

![image-20221001221901439](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001221901439.png)



![image-20221001222036345](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001222036345.png)

```java
@Override
protected void initInternal() throws LifecycleException {
    // If oname is not null then registration has already happened via
    // preRegister().
    if (oname == null) {
        mserver = Registry.getRegistry(null, null).getMBeanServer();

        oname = register(this, getObjectNameKeyProperties());
    }
}
```

![image-20221001222055400](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001222055400.png)



![image-20221001222418798](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001222418798.png)



#### 3. `Connector`连接器初始化

![image-20221001222449799](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001222449799.png)

`连接器`初始化会让`协议处理器`初始化，为什么要让`协议处理器`初始化呢？连接器监听8080端口，8080端口传过来的都是HTTP协议的数据

```java
@Override // TODO 连接器要启动监听端口
protected void initInternal() throws LifecycleException {

    super.initInternal();

    if (protocolHandler == null) {
        throw new LifecycleException(
                sm.getString("coyoteConnector.protocolHandlerInstantiationFailed"));
    }

    // Initialize adapter TODO 协议转换器
    adapter = new CoyoteAdapter(this);
    protocolHandler.setAdapter(adapter);
    if (service != null) {
        protocolHandler.setUtilityExecutor(service.getServer().getUtilityExecutor());
    }

    // Make sure parseBodyMethodsSet has a default
    if (null == parseBodyMethodsSet) {
        setParseBodyMethods(getParseBodyMethods());
    }

    if (protocolHandler.isAprRequired() && !AprStatus.isInstanceCreated()) {
        throw new LifecycleException(sm.getString("coyoteConnector.protocolHandlerNoAprListener",
                getProtocolHandlerClassName()));
    }
    if (protocolHandler.isAprRequired() && !AprStatus.isAprAvailable()) {
        throw new LifecycleException(sm.getString("coyoteConnector.protocolHandlerNoAprLibrary",
                getProtocolHandlerClassName()));
    }
    if (AprStatus.isAprAvailable() && AprStatus.getUseOpenSSL() &&
            protocolHandler instanceof AbstractHttp11JsseProtocol) {
        AbstractHttp11JsseProtocol<?> jsseProtocolHandler =
                (AbstractHttp11JsseProtocol<?>) protocolHandler;
        if (jsseProtocolHandler.isSSLEnabled() &&
                jsseProtocolHandler.getSslImplementationName() == null) {
            // OpenSSL is compatible with the JSSE configuration, so use it if APR is available
            jsseProtocolHandler.setSslImplementationName(OpenSSLImplementation.class.getName());
        }
    }

    try {
        protocolHandler.init();
    } catch (Exception e) {
        throw new LifecycleException(
                sm.getString("coyoteConnector.protocolHandlerInitializationFailed"), e);
    }
}
```

![image-20221001222730562](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001222730562.png)



#####  `AbstractHttp11Protocol`协议初始化

```java
@Override
public void init() throws Exception {
    // Upgrade protocols have to be configured first since the endpoint
    // init (triggered via super.init() below) uses this list to configure
    // the list of ALPN protocols to advertise
    for (UpgradeProtocol upgradeProtocol : upgradeProtocols) {
        configureUpgradeProtocol(upgradeProtocol);
    }

    super.init();

    // Set the Http11Protocol (i.e. this) for any upgrade protocols once
    // this has completed initialisation as the upgrade protocols may expect this
    // to be initialised when the call is made
    for (UpgradeProtocol upgradeProtocol : upgradeProtocols) {
        upgradeProtocol.setHttp11Protocol(this);
    }
}
```

![image-20221001223121660](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001223121660.png)



```java
@Override
public void init() throws Exception {
    if (getLog().isInfoEnabled()) {
        getLog().info(sm.getString("abstractProtocolHandler.init", getName()));
        logPortOffset();
    }

    if (oname == null) {
        // Component not pre-registered so register it
        oname = createObjectName();
        if (oname != null) {
            Registry.getRegistry(null, null).registerComponent(this, oname, null);
        }
    }

    if (this.domain != null) {
        ObjectName rgOname = new ObjectName(domain + ":type=GlobalRequestProcessor,name=" + getName());
        this.rgOname = rgOname;
        Registry.getRegistry(null, null).registerComponent(
                getHandler().getGlobal(), rgOname, null);
    }

    String endpointName = getName();
    endpoint.setName(endpointName.substring(1, endpointName.length()-1));
    endpoint.setDomain(domain);
    // TODO 端口初始化
    endpoint.init();
}
```

![image-20221001223344086](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001223344086.png)

###### 端点（端口）初始化

```java
public final void init() throws Exception {
    if (bindOnInit) {
        bindWithCleanup();
        bindState = BindState.BOUND_ON_INIT;
    }
    if (this.domain != null) {
        // Register endpoint (as ThreadPool - historical name)
        oname = new ObjectName(domain + ":type=ThreadPool,name=\"" + getName() + "\"");
        Registry.getRegistry(null, null).registerComponent(this, oname, null);

        ObjectName socketPropertiesOname = new ObjectName(domain +
                ":type=SocketProperties,name=\"" + getName() + "\"");
        socketProperties.setObjectName(socketPropertiesOname);
        Registry.getRegistry(null, null).registerComponent(socketProperties, socketPropertiesOname, null);

        for (SSLHostConfig sslHostConfig : findSslHostConfigs()) {
            registerJmx(sslHostConfig);
        }
    }
}
```

![image-20221001223544150](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001223544150.png)



```java
private void bindWithCleanup() throws Exception {
    try {
        bind();
    } catch (Throwable t) {
        // Ensure open sockets etc. are cleaned up if something goes
        // wrong during bind
        ExceptionUtils.handleThrowable(t);
        unbind();
        throw t;
    }
}
```

![image-20221001223630892](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001223630892.png)



###### `ServerSocket`初始化

```java
@Override
public void bind() throws Exception {
    initServerSocket();

    setStopLatch(new CountDownLatch(1));

    // Initialize SSL if needed
    initialiseSsl();

    selectorPool.open(getName());
}
```

![image-20221001223739760](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001223739760.png)

在这里面开通道，绑端口，这就是`java`里面`nio`里最底层的东西。 （此时还没有接收数据）

```java
@Override
public void bind() throws Exception {
    initServerSocket(); // TODO 初始化ServerSocket

    setStopLatch(new CountDownLatch(1));

    // Initialize SSL if needed
    initialiseSsl();

    selectorPool.open(getName());
}

// Separated out to make it easier for folks that extend NioEndpoint to
// implement custom [server]sockets
protected void initServerSocket() throws Exception {
    if (getUseInheritedChannel()) {
        // Retrieve the channel provided by the OS
        Channel ic = System.inheritedChannel();
        if (ic instanceof ServerSocketChannel) {
            serverSock = (ServerSocketChannel) ic;
        }
        if (serverSock == null) {
            throw new IllegalArgumentException(sm.getString("endpoint.init.bind.inherited"));
        }
    } else if (getUnixDomainSocketPath() != null) {
        SocketAddress sa = JreCompat.getInstance().getUnixDomainSocketAddress(getUnixDomainSocketPath());
        serverSock = JreCompat.getInstance().openUnixDomainServerSocketChannel();
        serverSock.bind(sa, getAcceptCount());
        if (getUnixDomainSocketPathPermissions() != null) {
            Path path = Paths.get(getUnixDomainSocketPath());
            Set<PosixFilePermission> permissions =
                    PosixFilePermissions.fromString(getUnixDomainSocketPathPermissions());
            if (path.getFileSystem().supportedFileAttributeViews().contains("posix")) {
                FileAttribute<Set<PosixFilePermission>> attrs = PosixFilePermissions.asFileAttribute(permissions);
                Files.setAttribute(path, attrs.name(), attrs.value());
            } else {
                java.io.File file = path.toFile();
                if (permissions.contains(PosixFilePermission.OTHERS_READ) && !file.setReadable(true, false)) {
                    log.warn(sm.getString("endpoint.nio.perms.readFail", file.getPath()));
                }
                if (permissions.contains(PosixFilePermission.OTHERS_WRITE) && !file.setWritable(true, false)) {
                    log.warn(sm.getString("endpoint.nio.perms.writeFail", file.getPath()));
                }
            }
        }
    } else {
        serverSock = ServerSocketChannel.open();  // 开通道
        socketProperties.setProperties(serverSock.socket());
        InetSocketAddress addr = new InetSocketAddress(getAddress(), getPortWithOffset());
        serverSock.bind(addr, getAcceptCount()); // 绑定端口
    }
    serverSock.configureBlocking(true); //mimic APR behavior
}
```

![image-20221001224059981](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001224059981.png)



```java
@Override
public void bind() throws Exception {
    initServerSocket(); // TODO 初始化ServerSocket

    setStopLatch(new CountDownLatch(1));

    // Initialize SSL if needed TODO 初始化SSL安全协议
    initialiseSsl();
    // TODO selector准备在池子里监听数据
    selectorPool.open(getName());
}
```

![image-20221001224841836](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001224841836.png)



然后`端口初始化`结束，`协议初始化`结束，`连接器初始化`结束，`service`初始化结束，`server`初始化结束

# 五、服务器启动

## 1. `StandardServer`启动

主类调用`daemon.start();`

```java
public static void main(String args[]) {
    ...
    try {
        String command = "start";
        if (args.length > 0) {
            command = args[args.length - 1];
        }

        if (command.equals("startd")) {
            args[args.length - 1] = "start";
            daemon.load(args);
            daemon.start();
        } else if (command.equals("stopd")) {
            args[args.length - 1] = "stop";
            daemon.stop();
        } else if (command.equals("start")) {
            daemon.setAwait(true);
            daemon.load(args);
            daemon.start();
            if (null == daemon.getServer()) {
                System.exit(1);
            }
        } else if (command.equals("stop")) {
            daemon.stopServer(args);
        } else if (command.equals("configtest")) {
            daemon.load(args);
            if (null == daemon.getServer()) {
                System.exit(1);
            }
            System.exit(0);
        } else {
            log.warn("Bootstrap: command \"" + command + "\" does not exist.");
        }
    } catch (Throwable t) {
        ...
    }
}
```

![image-20221001214548211](https://gitlab.com/apzs/image/-/raw/master/image/image-20221001214548211.png)



调用`public void org.apache.catalina.startup.Catalina.start()`方法

```java
public void start() throws Exception {
    if (catalinaDaemon == null) {
        init();
    }

    Method method = catalinaDaemon.getClass().getMethod("start", (Class [])null);
    method.invoke(catalinaDaemon, (Object [])null);
}
```

![image-20221003104245686](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003104245686.png)

​	然后调用`StandardServer`的`start()`

```java
public void start() {

    if (getServer() == null) {
        load();
    }

    if (getServer() == null) {
        log.fatal(sm.getString("catalina.noServer"));
        return;
    }

    long t1 = System.nanoTime();

    // Start the new server
    try {
        getServer().start();
    } catch (LifecycleException e) {
        log.fatal(sm.getString("catalina.serverStartFail"), e);
        try {
            getServer().destroy();
        } catch (LifecycleException e1) {
            log.debug("destroy() failed for failed Server ", e1);
        }
        return;
    }
    ...
    if (await) {
        await();
        stop();
    }
}
```

![image-20221003104610167](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003104610167.png)

调用`StandardServer`父类 (`LifecycleBase`) 的`start()`

```java
@Override
public final synchronized void start() throws LifecycleException {
    // TODO 组件状态流转判断
    if (LifecycleState.STARTING_PREP.equals(state) || LifecycleState.STARTING.equals(state) ||
            LifecycleState.STARTED.equals(state)) {

        if (log.isDebugEnabled()) {
            Exception e = new LifecycleException();
            log.debug(sm.getString("lifecycleBase.alreadyStarted", toString()), e);
        } else if (log.isInfoEnabled()) {
            log.info(sm.getString("lifecycleBase.alreadyStarted", toString()));
        }

        return;
    }

    if (state.equals(LifecycleState.NEW)) {
        init();
    } else if (state.equals(LifecycleState.FAILED)) {
        stop();
    } else if (!state.equals(LifecycleState.INITIALIZED) &&
            !state.equals(LifecycleState.STOPPED)) {
        invalidTransition(Lifecycle.BEFORE_START_EVENT);
    }

    try {
        setStateInternal(LifecycleState.STARTING_PREP, null, false);
        startInternal();
        if (state.equals(LifecycleState.FAILED)) {
            // This is a 'controlled' failure. The component put itself into the
            // FAILED state so call stop() to complete the clean-up.
            stop();
        } else if (!state.equals(LifecycleState.STARTING)) {
            // Shouldn't be necessary but acts as a check that sub-classes are
            // doing what they are supposed to.
            invalidTransition(Lifecycle.AFTER_START_EVENT);
        } else {
            setStateInternal(LifecycleState.STARTED, null, false);
        }
    } catch (Throwable t) {
        // This is an 'uncontrolled' failure so put the component into the
        // FAILED state and throw an exception.
        handleSubClassException(t, "lifecycleBase.startFail", toString());
    }
}
```

![image-20221003105103798](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003105103798.png)

然后先初始化`JDNI`，然后遍历`services`执行` service.start();`方法 （下面的流程都和初始化类似）

```java
@Override
protected void startInternal() throws LifecycleException {

    fireLifecycleEvent(CONFIGURE_START_EVENT, null);
    setState(LifecycleState.STARTING);

    globalNamingResources.start();

    // Start our defined Services
    synchronized (servicesLock) {
        for (Service service : services) {
            service.start();
        }
    }

    if (periodicEventDelay > 0) {
        monitorFuture = getUtilityExecutor().scheduleWithFixedDelay(
                () -> startPeriodicLifecycleEvent(), 0, 60, TimeUnit.SECONDS);
    }
}
```

![image-20221003105959252](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003105959252.png)

## 2. `StandardService`启动

调用`StandardService`的父类`LifecycleMBeanBase`的`start()`方法

![image-20221003110321628](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003110321628.png)

调用`StandardService`类的`startInternal()`方法，实现核心逻辑

然后还是 启动引擎 -> 启动监听器 -> 启动连接器

```java
@Override
protected void startInternal() throws LifecycleException {

    if(log.isInfoEnabled())
        log.info(sm.getString("standardService.start.name", this.name));
    setState(LifecycleState.STARTING);

    // Start our defined Container first
    if (engine != null) {
        synchronized (engine) {
            engine.start();
        }
    }

    synchronized (executors) {
        for (Executor executor: executors) {
            executor.start();
        }
    }

    mapperListener.start();

    // Start our defined Connectors second
    synchronized (connectorsLock) {
        for (Connector connector: connectors) {
            // If it has already failed, don't try and start it
            if (connector.getState() != LifecycleState.FAILED) {
                connector.start();
            }
        }
    }
}
```

![image-20221003112939238](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003112939238.png)

### 1. `StandardEngine`引擎启动

![image-20221003113033279](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003113033279.png)

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    // Log our server identification information
    if (log.isInfoEnabled()) {
        log.info(sm.getString("standardEngine.start", ServerInfo.getServerInfo()));
    }

    // Standard container startup
    super.startInternal();
}
```

![image-20221003113109809](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003113109809.png)

首先判断是不是集群模式，如果是集群模式则先启动集群。然后找到引擎下的所有子容器(Host、Context、Wrapper)，然后交给线程池，并发启动。

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    // Start our subordinate components, if any
    logger = null;
    getLogger();
    Cluster cluster = getClusterInternal(); // TODO 如果是集群模式(我们的不是)，获取集群
    if (cluster instanceof Lifecycle) {
        ((Lifecycle) cluster).start(); // TODO 启动集群
    }
    Realm realm = getRealmInternal();
    if (realm instanceof Lifecycle) {
        ((Lifecycle) realm).start();
    }

    // Start our child containers, if any
    Container children[] = findChildren(); // TODO 找到引擎下的所有子容器(Host、Context、Wrapper)
    List<Future<Void>> results = new ArrayList<>();
    for (Container child : children) {
        results.add(startStopExecutor.submit(new StartChild(child)));
    }
    ...
}
```

![image-20221003125047730](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003125047730.png)

遍历子容器，将子容器封装为`StartChild`（`new StartChild(child))`），然后调用`InlineExecutorService`类的`submit(Callable<T> task)`方法

![image-20221003130046483](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003130046483.png)

这个`StartChild`是一个`Callable`，里面的`call()`就会执行` child.start()`方法

```java
private static class StartChild implements Callable<Void> {

    private Container child;

    public StartChild(Container child) {
        this.child = child;
    }

    @Override
    public Void call() throws LifecycleException {
        child.start();
        return null;
    }
}
```

![image-20221003130211420](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003130211420.png)

调用`InlineExecutorService`类父类`AbstractExecutorService`的`submit(Callable<T> task)`方法，执行这些线程并获得返回结果，并将获得的返回结果返回。【1、执行`StartChild`类的`call()`方法里的代码 2、调用`child.start();` （`LifecycleBase`类的`start()`方法）3、调用具体类 (例如`StandardHost`) 的`startInternal()`方法 】

```java
public <T> Future<T> submit(Callable<T> task) {
    if (task == null) throw new NullPointerException();
    RunnableFuture<T> ftask = newTaskFor(task);
    execute(ftask);
    return ftask;
}
```

![image-20221003130619091](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003130619091.png)

#### 子容器`StandardHost`异步启动

子容器启动调用`command.run();`方法，新开了一个线程

```java
@Override
public void execute(Runnable command) {
    synchronized (lock) {
        if (shutdown) {
            throw new RejectedExecutionException();
        }
        taskRunning = true;
    }
    command.run();
    synchronized (lock) {
        taskRunning = false;
        if (shutdown) {
            terminated = true;
            lock.notifyAll();
        }
    }
}
```

![image-20221003133320404](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003133320404.png)

由于是异步任务，直接点`Step Into F7`进不来，可以在`child.start();`上打个断点，然后再执行到下一个断点，此时可以看到已经新开了一个线程

```java
private static class StartChild implements Callable<Void> {

    private Container child;

    public StartChild(Container child) {
        this.child = child;
    }

    @Override
    public Void call() throws LifecycleException {
        child.start();
        return null;
    }
}
```

![image-20221003145438189](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003145438189.png)

没有异步栈轨迹的，点击一个栈轨迹，右键选中`Async Stack Traces`

![image-20221003152026574](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003152026574.png)

调用`StandardHost`类的父类`LifecycleBase`的`start()`方法，然后调用`StandardHost`类的`startInternal()`方法，执行其核心逻辑

![image-20221003133527666](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003133527666.png)

获得管道中的所有阀门，判断是否有与`ErrorReportValve`相同名字的管道，然后调用`super.startInternal();`方法

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    // Set error report valve
    String errorValve = getErrorReportValveClass();
    if ((errorValve != null) && (!errorValve.equals(""))) {
        try {
            boolean found = false;
            Valve[] valves = getPipeline().getValves(); // 获得管道中的所有阀门
            for (Valve valve : valves) {
                if (errorValve.equals(valve.getClass().getName())) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                Valve valve = ErrorReportValve.class.getName().equals(errorValve) ?
                    new ErrorReportValve() :
                    (Valve) Class.forName(errorValve).getConstructor().newInstance();
                getPipeline().addValve(valve);
            }
        } catch (Throwable t) {
            ExceptionUtils.handleThrowable(t);
            log.error(sm.getString(
                    "standardHost.invalidErrorReportValveClass",
                    errorValve), t);
        }
    }
    super.startInternal();
}
```

![image-20221003134045277](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003134045277.png)

##### 子容器的子容器异步启动

该子容器没有子容器。根据栈轨迹可以直到，这是另一个线程，该子容器线程调用的`super.startInternal();`方法，因此与父容器的线程一样，执行了同一个`ContainerBase`类的`startInternal()`方法（根据栈轨迹也可以看出父容器线程此时停在了`ContainerBase`类的`startInternal()`方法的`results.add(startStopExecutor.submit(new StartChild(child)));`这一行，新建一个线程，执行子容器的`start()`方法）

![image-20221003143956940](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003143956940.png)

##### 子容器的管道启动

子容器的子容器异步启动后，遍历子容器返回的结果，查看执行是否有异常。(我们的子容器没有子容器，因此`results`为空，因此增强for里面的语句根本就不会执行)

然后再让管道启动`((Lifecycle) pipeline).start();` 

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    // Start our subordinate components, if any
    logger = null;
    getLogger();
    Cluster cluster = getClusterInternal(); // TODO 如果是集群模式(我们的不是)，获取集群
    if (cluster instanceof Lifecycle) {
        ((Lifecycle) cluster).start(); // TODO 启动集群
    }
    Realm realm = getRealmInternal();
    if (realm instanceof Lifecycle) {
        ((Lifecycle) realm).start();
    }

    // Start our child containers, if any
    Container children[] = findChildren(); // TODO 找到引擎下的所有子容器(Host、Context、Wrapper)
    List<Future<Void>> results = new ArrayList<>();
    for (Container child : children) {
        results.add(startStopExecutor.submit(new StartChild(child)));
    }

    MultiThrowable multiThrowable = null;

    for (Future<Void> result : results) {
        try {
            result.get();
        } catch (Throwable e) {
            log.error(sm.getString("containerBase.threadedStartFailed"), e);
            if (multiThrowable == null) {
                multiThrowable = new MultiThrowable();
            }
            multiThrowable.add(e);
        }

    }
    if (multiThrowable != null) {
        throw new LifecycleException(sm.getString("containerBase.threadedStartFailed"),
                multiThrowable.getThrowable());
    }

    // Start the Valves in our pipeline (including the basic), if any
    if (pipeline instanceof Lifecycle) {
        ((Lifecycle) pipeline).start(); 
    }

    setState(LifecycleState.STARTING);

    // Start our thread
    if (backgroundProcessorDelay > 0) {
        monitorFuture = Container.getService(ContainerBase.this).getServer()
                .getUtilityExecutor().scheduleWithFixedDelay(
                        new ContainerBackgroundProcessorMonitor(), 0, 60, TimeUnit.SECONDS);
    }
}
```

![image-20221003131329035](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003131329035.png)

调用`StandardPipeline`类的父类`LifecycleBase`的`start()`方法，然后调用`StandardPipeline`类的`startInternal()`方法

![image-20221003140303820](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003140303820.png)

将`current`的阀门初始化为`first`，如果当前为`null`  (`first`为`null`)  就把`current`设置为基础的阀门。然后调用当前阀门的`start()`方法，调用完成后`当前阀门current`指向下一个阀门，然后再次调用`current`的`start()`方法，再将`current`指向下一个阀门，直到没有下一个阀门为止

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    // Start the Valves in our pipeline (including the basic), if any
    Valve current = first;
    if (current == null) {
        current = basic;
    }
    while (current != null) {
        if (current instanceof Lifecycle)
            ((Lifecycle) current).start();
        current = current.getNext();
    }

    setState(LifecycleState.STARTING);
}
```

![image-20221003140852117](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003140852117.png)



![image-20221003141411607](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003141411607.png)

##### 子容器的阀门启动

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    // Initialize the Date formatters
    String format = getFileDateFormat();
    fileDateFormatter = new SimpleDateFormat(format, Locale.US);
    fileDateFormatter.setTimeZone(TimeZone.getDefault());
    dateStamp = fileDateFormatter.format(new Date(System.currentTimeMillis()));
    if (rotatable && renameOnRotate) {
        restore();
    }
    open();

    super.startInternal();
}
```

![image-20221003141601636](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003141601636.png)

阀门的启动就是给阀门设置了一个状态

```java
@Override
protected synchronized void startInternal() throws LifecycleException {

    setState(LifecycleState.STARTING);
}
```

![image-20221003141714004](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003141714004.png)

##### 子容器启动`StandardContext`

给`StandardContext`类的`startInternal()`方法的这样行打个断点，使其运行到这一行

```java
WebappLoader webappLoader = new WebappLoader();
```

![image-20221003154334230](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003154334230.png)

根据栈轨迹可以看出是`StandardHost`子容器在启动阀门后的`setState(LifecycleState.STARTING);`方法里

```
setState(LifecycleState.STARTING);
```

![image-20221003154954929](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003154954929.png)

一步步调用`HostConfig`类的`deployDirectories(File appBase, String[] files)`方法里的`results.add(es.submit(new DeployDirectory(this, cn, dir)));`启动的

```java
results.add(es.submit(new DeployDirectory(this, cn, dir)));
```

![image-20221003155146821](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003155146821.png)

##### 子容器启动`StandardWrapper`

给`StandardWrapper`类的`startInternal()`方法的`super.startInternal();`这一行打上断点

![image-20221003160058700](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003160058700.png)

然后分析栈轨迹，可以发现，前面打的`StandardContext`类的`startInternal()`方法的`WebappLoader webappLoader = new WebappLoader();`这一行的这个断点一直执行，即可执行到`fireLifecycleEvent(Lifecycle.CONFIGURE_START_EVENT, null);`这一行，然后在这里面启动的`StandardWrapper` （没有新开线程）

```
fireLifecycleEvent(Lifecycle.CONFIGURE_START_EVENT, null);
```

![image-20221003160143290](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003160143290.png)

下面是**子容器启动`StandardContext`**和**子容器启动`StandardWrapper`**栈轨迹对比图

![StandardContext与StandardWrapper栈轨迹对比图](https://gitlab.com/apzs/image/-/raw/master/image/StandardContext与StandardWrapper栈轨迹对比图.png)

#### 管道启动

由于启动很多个线程都会调用`ContainerBase`类的`startInternal()`方法，不好回到主线程调用的这个方法，因此可以在`MultiThrowable multiThrowable = null;`这里打一个条件为`children.length>0`的断点(子容器的线程`children.length`都为`0`)，让其回到主线程（注意查看栈轨迹，判断其是否只有一个`Main`线程，当然自带的线程不算）

![image-20221003162719838](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003162719838.png)

`results`的长度为`1`，获取到的异步执行的结果为`null`，表示执行没有遇到异常

![image-20221003163252061](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003163252061.png)

然后让管道启动（这里就和子容器里管道启动流程差不多）

![image-20221003163531796](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003163531796.png)



![image-20221003163616268](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003163616268.png)

此时的`current`被赋为`basic`了 （子容器的为`AccessLogValve`）

![image-20221003163800852](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003163800852.png)

### 2. `MapperListener`监听器启动

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20221003164155441.png" alt="image-20221003164155441" style="zoom:67%;" />



![image-20221003164231721](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003164231721.png)

添加监听器

```java
@Override
public void startInternal() throws LifecycleException {

    setState(LifecycleState.STARTING);

    Engine engine = service.getContainer();
    if (engine == null) {
        return;
    }

    findDefaultHost();

    addListeners(engine);

    Container[] conHosts = engine.findChildren();
    for (Container conHost : conHosts) {
        Host host = (Host) conHost;
        if (!LifecycleState.NEW.equals(host.getState())) {
            // Registering the host will register the context and wrappers
            registerHost(host);
        }
    }
}
```

![image-20221003164748152](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003164748152.png)

子容器全部添加到监听器

```java
private void addListeners(Container container) {
    container.addContainerListener(this);
    container.addLifecycleListener(this);
    for (Container child : container.findChildren()) {
        addListeners(child);
    }
}
```

![image-20221003164840803](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003164840803.png)

`findChildren()`方法里只有一段加锁的代码

```java
public Container[] findChildren() {
    synchronized (children) {
        Container results[] = new Container[children.size()];
        return children.values().toArray(results);
    }
}
```

![image-20221003165045238](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003165045238.png)

然后再调用`engine.findChildren()`方法 （这调用两遍同样参数的加锁方法不浪费性能吗？）

让后注册不是新建状态的`Host`虚拟主机

```java
@Override
public void startInternal() throws LifecycleException {

    setState(LifecycleState.STARTING);

    Engine engine = service.getContainer();
    if (engine == null) {
        return;
    }

    findDefaultHost();

    addListeners(engine);

     Container[] conHosts = engine.findChildren();
    for (Container conHost : conHosts) {
        Host host = (Host) conHost;
        if (!LifecycleState.NEW.equals(host.getState())) {
            // Registering the host will register the context and wrappers
            registerHost(host);
        }
    }
}
```

![image-20221003183752106](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003183752106.png)

### 3. `Connector`连接器启动

![image-20221003184247601](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003184247601.png)



![image-20221003110923197](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003110923197.png)

#### 协议处理器启动

```java
@Override
protected void startInternal() throws LifecycleException {

    // Validate settings before starting
    String id = (protocolHandler != null) ? protocolHandler.getId() : null;
    if (id == null && getPortWithOffset() < 0) {
        throw new LifecycleException(sm.getString(
                "coyoteConnector.invalidPort", Integer.valueOf(getPortWithOffset())));
    }

    setState(LifecycleState.STARTING);

    try {
        protocolHandler.start();
    } catch (Exception e) {
        throw new LifecycleException(
                sm.getString("coyoteConnector.protocolHandlerStartFailed"), e);
    }
}
```

![image-20221003111153083](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003111153083.png)

##### 端点启动

```java
@Override
public void start() throws Exception {
    if (getLog().isInfoEnabled()) {
        getLog().info(sm.getString("abstractProtocolHandler.start", getName()));
        logPortOffset();
    }

    endpoint.start();
    monitorFuture = getUtilityExecutor().scheduleWithFixedDelay(
            () -> {
                if (!isPaused()) {
                    startAsyncTimeout();
                }
            }, 0, 60, TimeUnit.SECONDS);
}
```



![image-20221003112058303](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003112058303.png)



```java
public final void start() throws Exception {
    if (bindState == BindState.UNBOUND) {
        bindWithCleanup();
        bindState = BindState.BOUND_ON_START;
    }
    startInternal();
}
```

![image-20221003112302612](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003112302612.png)

### 处理请求核心

#### 创建10个`worker`集合

`worker`就是真正干活的，这里创建了十个`worker`

```java
@Override
public void startInternal() throws Exception {

    if (!running) {
        running = true;
        paused = false;

        if (socketProperties.getProcessorCache() != 0) {
            processorCache = new SynchronizedStack<>(SynchronizedStack.DEFAULT_SIZE,
                    socketProperties.getProcessorCache());
        }
        if (socketProperties.getEventCache() != 0) {
            eventCache = new SynchronizedStack<>(SynchronizedStack.DEFAULT_SIZE,
                    socketProperties.getEventCache());
        }
        if (socketProperties.getBufferPool() != 0) {
            nioChannels = new SynchronizedStack<>(SynchronizedStack.DEFAULT_SIZE,
                    socketProperties.getBufferPool());
        }

        // Create worker collection
        if (getExecutor() == null) {
            createExecutor();
        }

        initializeConnectionLatch();

        // Start poller thread
        poller = new Poller();
        Thread pollerThread = new Thread(poller, getName() + "-ClientPoller");
        pollerThread.setPriority(threadPriority);
        pollerThread.setDaemon(true);
        pollerThread.start();

        startAcceptorThread();
    }
}
```

![image-20221003184955503](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003184955503.png)

创建有十个线程的`worker`线程池

```java
public void createExecutor() {
    internalExecutor = true;
    TaskQueue taskqueue = new TaskQueue();
    TaskThreadFactory tf = new TaskThreadFactory(getName() + "-exec-", daemon, getThreadPriority());
    executor = new ThreadPoolExecutor(getMinSpareThreads(), getMaxThreads(), 60, TimeUnit.SECONDS,taskqueue, tf);
    taskqueue.setParent( (ThreadPoolExecutor) executor);
}
```

![image-20221003185409784](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003185409784.png)

##### 进行连接限制

![image-20221003185806412](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003185806412.png)

创建限制锁 （这就是`juc`里面`CountDownLatch`里的内容）

```java
protected LimitLatch initializeConnectionLatch() {
    if (maxConnections==-1) return null;
    if (connectionLimitLatch==null) {
        connectionLimitLatch = new LimitLatch(getMaxConnections()); // 最大处理8*1024=8192
    }
    return connectionLimitLatch;
}
```

![image-20221003190142775](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003190142775.png)

#### 创建一个`Poller`

创建一个`Poller`，然后单线程启动`poller` （拉取者），`8080`端口

![image-20221003190656290](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003190656290.png)



```java
@Override // 这里面都是nio的写法
public void run() {
    // Loop until destroy() is called
    while (true) {

        boolean hasEvents = false;

        try {
            if (!close) {
                hasEvents = events(); // TODO 监听事件
                if (wakeupCounter.getAndSet(-1) > 0) {
                    // If we are here, means we have other stuff to do
                    // Do a non blocking select
                    keyCount = selector.selectNow();
                } else {
                    keyCount = selector.select(selectorTimeout);
                }
                wakeupCounter.set(0);
            }
            if (close) {
                events();
                timeout(0, false);
                try {
                    selector.close();
                } catch (IOException ioe) {
                    log.error(sm.getString("endpoint.nio.selectorCloseFail"), ioe);
                }
                break;
            }
            // Either we timed out or we woke up, process events first
            if (keyCount == 0) {
                hasEvents = (hasEvents | events());
            }
        } catch (Throwable x) {
            ExceptionUtils.handleThrowable(x);
            log.error(sm.getString("endpoint.nio.selectorLoopError"), x);
            continue;
        }

        Iterator<SelectionKey> iterator =
            keyCount > 0 ? selector.selectedKeys().iterator() : null;
        // Walk through the collection of ready keys and dispatch
        // any active event.
        while (iterator != null && iterator.hasNext()) {
            SelectionKey sk = iterator.next();
            iterator.remove();
            NioSocketWrapper socketWrapper = (NioSocketWrapper) sk.attachment();
            // Attachment may be null if another thread has called
            // cancelledKey()
            if (socketWrapper != null) {
                processKey(sk, socketWrapper); // TODO 处理事件
            }
        }

        // Process timeouts
        timeout(keyCount,hasEvents);
    }

    getStopLatch().countDown();
}
```

#### 创建一个`Acceptor`

然后调用`startAcceptorThread();`启动一个接受者线程，在后台接收数据。

![image-20221003191035728](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003191035728.png)

这个`Acceptor`也是只创建一个，然后单线程启动，监听`8080`端口

```java
protected void startAcceptorThread() {
    acceptor = new Acceptor<>(this);
    String threadName = getName() + "-Acceptor";
    acceptor.setThreadName(threadName);
    Thread t = new Thread(acceptor, threadName);
    t.setPriority(getAcceptorThreadPriority());
    t.setDaemon(getDaemon()); // 设置为守护线程
    t.start();
}
```

![image-20221003191457637](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003191457637.png)



```java
@Override
public void run() {

    int errorDelay = 0;

    try {
        // Loop until we receive a shutdown command
        while (!stopCalled) { // TODO 服务器不是停止状态

            // Loop if endpoint is paused
            while (endpoint.isPaused() && !stopCalled) { // TODO 端口停了并且服务器没关，就将AcceptorState的状态设置为PAUSED
                state = AcceptorState.PAUSED;
                try {
                    Thread.sleep(50); // TODO 每隔50ms循环检查
                } catch (InterruptedException e) {
                    // Ignore
                }
            }

            if (stopCalled) {
                break;
            }
            state = AcceptorState.RUNNING;

            try {
                //if we have reached max connections, wait
                endpoint.countUpOrAwaitConnection();

                // Endpoint might have been paused while waiting for latch
                // If that is the case, don't accept new connections
                if (endpoint.isPaused()) {
                    continue;
                }

                U socket = null;
                try {
                    // Accept the next incoming connection from the server
                    // socket TODO 不断地调用 serverSock.accept() 接收数据 【java.nio.channels里的ServerSocketChannel通道的accept()】
                    socket = endpoint.serverSocketAccept();
                } catch (Exception ioe) {
                    // We didn't get a socket
                    endpoint.countDownConnection();
                    if (endpoint.isRunning()) {
                        // Introduce delay if necessary
                        errorDelay = handleExceptionWithDelay(errorDelay);
                        // re-throw
                        throw ioe;
                    } else {
                        break;
                    }
                }
                // Successful accept, reset the error delay
                ...
    } finally {
        stopLatch.countDown();
    }
    state = AcceptorState.ENDED;
}
```

#### 监听给服务器发送的命令

切换到`Catalina`类的`start()`方法的`getServer().start(); `这个栈，在后面的`await();`方法上打个断点

![image-20221003193434494](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003193434494.png)

调用`getServer().await();`

```java
public void await() {

    getServer().await();

}
```

![image-20221003193711023](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003193711023.png)

然后在这里面服务器一直等待接收命令，这里才是`java.net`里的`ServerSocket`使用操作系统底层网卡的`8005`端口接收数据 （这里接收的数据为二进制流）

```java
@Override
public void await() {
    ...
    // Set up a server socket to wait on
    try { // java.net里的ServerSocket
        awaitSocket = new ServerSocket(getPortWithOffset(), 1,
                InetAddress.getByName(address));
    } catch (IOException e) {
        log.error(sm.getString("standardServer.awaitSocket.fail", address,
                String.valueOf(getPortWithOffset()), String.valueOf(getPort()),
                String.valueOf(getPortOffset())), e);
        return;
    }

    try {
        awaitThread = Thread.currentThread();

        // Loop waiting for a connection and a valid command
        while (!stopAwait) {
            ServerSocket serverSocket = awaitSocket;
            if (serverSocket == null) {
                break;
            }

            // Wait for the next connection
            Socket socket = null;
            StringBuilder command = new StringBuilder();
            try {
                InputStream stream;
                long acceptStartTime = System.currentTimeMillis();
                try { // TODO 使用8005端口，用于对服务器执行命令
                    socket = serverSocket.accept(); // TODO 开启端口接收数据（这里开的是操作系统底层网卡的端口，这里接收的数据为二进制流）
                    socket.setSoTimeout(10 * 1000);  // Ten secondserverSocket = {ServerSocket@2613} "ServerSocket[addr=localhost/127.0.0.1,localport=8005]"sserverSocket =serverSocket = {ServerSocket@2613} "ServerSocket[addr=localhost/127.0.0.1,localport=8005]" {ServerSocket@2613} "ServerSocket[addr=localhost/127.0.0.1,localport=8005]"
                    stream = socket.getInputStream();
                } catch (...) {
         ......
    }
```

![image-20221003195444980](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003195444980.png)

此处服务器就启动完成了

# 六、`Accepor`、`Poller` 、`Worker`关系

![image-20221003210201765](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003210201765.png)



1、 `Accepor`一直接受`8080`的请求， 会尝试`endpoint.setSocketOptions(socket) `
2、`socke`t封装为`socketWrapper`
3、`poller`先来注册事件`socketWrapper`
4、创建一个`PollerEvent`，添加到事件队列`SynchronizedQueue < PollerEvent>`

1、`Poller` 一 直判断是否有事件`events.poll(); `事件就拿到
2、读取`socket`的内容并处理`processSocket (socketWrapper)`
3、`processSocket`的时候`poller`会拿到`Worker`线程池，我们的`socketWrapper`会被封装到`SocketProcessorBase`里面，把这个`SocketProcessorBase`直接给线程池
4、`SocketProcessorBase`会被线程池的一个线程进行处理，最终会被`ConnectorHandler.process`进行处理。交给`Http11Processor.process`进行处理
5、`Http11Processor.service`会接手这个`Socket`

### 1. `Acceptor`接收数据

给`Acceptor<U>`类的`run()`方法的`socket = endpoint.serverSocketAccept();`和`if (!endpoint.setSocketOptions(socket)) {`打上断点

![image-20221003211600163](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003211600163.png)

重启`tomcat`，浏览器访问`localhost:8080`，此时会先调用`endpoint.serverSocketAccept();`然后调用`endpoint.setSocketOptions(socket)`方法

![image-20221003211935527](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003211935527.png)

`NioEndpoint`类的`setSocketOptions(SocketChannel socket)`方法会调用`poller.register(socketWrapper);`向`poller`里注册一个`NioEndpoint$NioSocketWrapper` (`NioEndpoint`的内部类`NioSocketWrapper`)

![image-20221003212433493](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003212433493.png)

#### 接收到的数据放到事件队列

```java
public void register(final NioSocketWrapper socketWrapper) {
    socketWrapper.interestOps(SelectionKey.OP_READ);//this is what OP_REGISTER turns into. TODO 准备读数据
    PollerEvent event = null;
    if (eventCache != null) {
        event = eventCache.pop();
    }
    if (event == null) {
        event = new PollerEvent(socketWrapper, OP_REGISTER); // TODO 新建一个PollerEvent
    } else {
        event.reset(socketWrapper, OP_REGISTER);
    }
    addEvent(event); // TODO 添加到事件队列【SynchronizedQueue<PollerEvent>】
}
```

![image-20221003213828556](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003213828556.png)

调用`NioEndpoint`类的内部类`Poller`的`addEvent`方法

```java
private void addEvent(PollerEvent event) {
    events.offer(event);
    if (wakeupCounter.incrementAndGet() == 0) {
        selector.wakeup();
    }
}
```

![image-20221003213443939](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003213443939.png)

很明显这是向队列中添加一个元素

```java
public synchronized boolean offer(T t) {
    queue[insert++] = t;

    // Wrap
    if (insert == size) {
        insert = 0;
    }

    if (insert == remove) {
        expand();
    }
    return true;
}
```

![image-20221003213603166](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003213603166.png)

### `Poller`获取事件队列

然后给`Poller`类的内部类`Poller`的`events();`方法打个断点，该方法会循环监听事件

```java
@Override
public void run() {
    // Loop until destroy() is called
    while (true) {

        boolean hasEvents = false;

        try {
            if (!close) {
                hasEvents = events(); // TODO 监听事件
                if (wakeupCounter.getAndSet(-1) > 0) {
                    // If we are here, means we have other stuff to do
                    // Do a non blocking select
                    keyCount = selector.selectNow();
                } else {
                    keyCount = selector.select(selectorTimeout);
                }
                wakeupCounter.set(0);
            }
            ...
        }

        Iterator<SelectionKey> iterator =
            keyCount > 0 ? selector.selectedKeys().iterator() : null;
        // Walk through the collection of ready keys and dispatch
        // any active event.
        while (iterator != null && iterator.hasNext()) {
            SelectionKey sk = iterator.next();
            iterator.remove();
            NioSocketWrapper socketWrapper = (NioSocketWrapper) sk.attachment();
            // Attachment may be null if another thread has called
            // cancelledKey()
            if (socketWrapper != null) {
                processKey(sk, socketWrapper); // TODO 处理事件
            }
        }

        // Process timeouts
        timeout(keyCount,hasEvents);
    }

    getStopLatch().countDown();
}
```

![image-20221003214943057](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003214943057.png)

然后`events`方法会调用`events.poll()`把事件拿出来

```java
public boolean events() {
    boolean result = false;

    PollerEvent pe = null;
    for (int i = 0, size = events.size(); i < size && (pe = events.poll()) != null; i++ ) {
        result = true;
        ...
    }
}
```

![image-20221003215454922](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003215454922.png)

#### 封装数据，交给`worker`

判断到有事件后，调用`processKey(sk, socketWrapper);`方法读通道里的数据，处理事件

![image-20221003215904896](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003215904896.png)



```java
protected void processKey(SelectionKey sk, NioSocketWrapper socketWrapper) {
    try {
        if (close) {
            cancelledKey(sk, socketWrapper);
        } else if (sk.isValid() && socketWrapper != null) {
            if (sk.isReadable() || sk.isWritable()) {
                if (socketWrapper.getSendfileData() != null) {
                    processSendfile(sk, socketWrapper, false);
                } else {
                    unreg(sk, socketWrapper, sk.readyOps()); // TODO 防止重读读取socket的数据
                    boolean closeSocket = false;
                    // Read goes before write
                    if (sk.isReadable()) { // TODO 判断当前是否是读状态
                        if (socketWrapper.readOperation != null) {
                            if (!socketWrapper.readOperation.process()) {
                                closeSocket = true;
                            }
                        } else if (!processSocket(socketWrapper, SocketEvent.OPEN_READ, true)) { // TODO 处理Socket
                            closeSocket = true;
                        }
                    }
        ......
    }
}
```

![image-20221003220414817](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003220414817.png)

在里面获取到`worker`的线程池，然后直接让`worker`线程池执行`NioEndpoint$SocketProcessor` (`SocketProcessor`继承了`SocketProcessorBase<NioChannel>`，`SocketProcessorBase<S>`实现了`Runnable`)

```java
public boolean processSocket(SocketWrapperBase<S> socketWrapper,
        SocketEvent event, boolean dispatch) {
    try {
        if (socketWrapper == null) {
            return false;
        }
        SocketProcessorBase<S> sc = null;
        if (processorCache != null) {
            sc = processorCache.pop();
        }
        if (sc == null) {
            sc = createSocketProcessor(socketWrapper, event);
        } else { // sc重置
            sc.reset(socketWrapper, event);
        }
        Executor executor = getExecutor();
        if (dispatch && executor != null) {
            executor.execute(sc);
        } else {
            sc.run();
        }
    } catch (RejectedExecutionException ree) {
        getLog().warn(sm.getString("endpoint.executor.fail", socketWrapper) , ree);
        return false;
    } catch (Throwable t) {
        ExceptionUtils.handleThrowable(t);
        // This means we got an OOM or similar creating a thread, or that
        // the pool and its queue are full
        getLog().error(sm.getString("endpoint.process.fail"), t);
        return false;
    }
    return true;
}
```

![image-20221003221220635](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003221220635.png)

### `worker`处理数据

给`SocketProcessorBase<S>`类的`run()`方法的第一行打上断点，然后执行下一个断点就来到了这

```java
@Override
public final void run() {
    synchronized (socketWrapper) {
        // It is possible that processing may be triggered for read and
        // write at the same time. The sync above makes sure that processing
        // does not occur in parallel. The test below ensures that if the
        // first event to be processed results in the socket being closed,
        // the subsequent events are not processed.
        if (socketWrapper.isClosed()) {
            return;
        }
        doRun();
    }
}
```

![image-20221003222000185](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003222000185.png)

调用`doRun();`方法

![image-20221003222143194](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003222143194.png)

调用`AbstractProtocol<S>`类的内部类`ConnectionHandler<S>`的`process(SocketWrapperBase<S> wrapper, SocketEvent status)`方法

```java
@Override
protected void doRun() {
    /*
     * Do not cache and re-use the value of socketWrapper.getSocket() in
     * this method. If the socket closes the value will be updated to
     * CLOSED_NIO_CHANNEL and the previous value potentially re-used for
     * a new connection. That can result in a stale cached value which
     * in turn can result in unintentionally closing currently active
     * connections.
     */
    Poller poller = NioEndpoint.this.poller;
    if (poller == null) {
        socketWrapper.close();
        return;
    }

    try {
        int handshake = -1;
        try { // HTTPS的握手环节（我们没有使用https）
            if (socketWrapper.getSocket().isHandshakeComplete()) {
                ...
            } else if (event == SocketEvent.STOP || event == SocketEvent.DISCONNECT ||
                    event == SocketEvent.ERROR) {
                ...
            } else {
                ...
            }
        } catch (..) {
           ...
        }
        if (handshake == 0) {
            SocketState state = SocketState.OPEN;
            // Process the request from this socket
            if (event == null) {
                state = getHandler().process(socketWrapper, SocketEvent.OPEN_READ);
            } else {
                state = getHandler().process(socketWrapper, event); //处理socket
            }
            if (state == SocketState.CLOSED) {
                poller.cancelledKey(getSelectionKey(), socketWrapper);
            }
        } else if (...) {
            ...
        }
    } catch (...) {
		...
    } finally {
        socketWrapper = null;
        event = null;
        //return to cache
        if (running && !paused && processorCache != null) {
            processorCache.push(this);
        }
    }
}
```

![image-20221003222645217](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003222645217.png)

把`Http11Processor`注册进去

```java
@Override
public SocketState process(SocketWrapperBase<S> wrapper, SocketEvent status) {
	...
    // TODO 先拿到真正的socket
    S socket = wrapper.getSocket();
	...
    ContainerThreadMarker.set();

    try {
        ...
        if (processor == null) {
            processor = recycledProcessors.pop(); // 查看已回收的协议里面有没有
            if (getLog().isDebugEnabled()) {
                getLog().debug(sm.getString("abstractConnectionHandler.processorPop", processor));
            }
        }
        if (processor == null) {
            processor = getProtocol().createProcessor(); // TODO 拿到当前协议，创建一个processor
            register(processor);
            if (getLog().isDebugEnabled()) {
                getLog().debug(sm.getString("abstractConnectionHandler.processorCreate", processor));
            }
        }
        // 设置ssl支持
        processor.setSslSupport(
                wrapper.getSslSupport(getProtocol().getClientCertProvider()));

        // Associate the processor with the connection
        wrapper.setCurrentProcessor(processor);

        SocketState state = SocketState.CLOSED;
        do {
            state = processor.process(wrapper, status); // TODO 处理器处理Socket数据
			...
        } while ( state == SocketState.UPGRADING);
	......
}
```

![image-20221003223726852](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003223726852.png)

然后处理器处理Socket数据

![image-20221003224216781](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003224216781.png)

当前`SocketEvent`是读状态

```java
@Override
public SocketState process(SocketWrapperBase<?> socketWrapper, SocketEvent status)
        throws IOException {

    SocketState state = SocketState.CLOSED; // TODO 先把Socket的状态设置为关闭
    Iterator<DispatchType> dispatches = null;
    do { // TODO 判断SocketEvent的状态
        if (dispatches != null) {
            DispatchType nextDispatch = dispatches.next();
            if (getLog().isDebugEnabled()) {
                getLog().debug("Processing dispatch type: [" + nextDispatch + "]");
            }
            state = dispatch(nextDispatch.getSocketStatus());
            if (!dispatches.hasNext()) {
                state = checkForPipelinedData(state, socketWrapper);
            }
        } else if (status == SocketEvent.DISCONNECT) {
            // Do nothing here, just wait for it to get recycled
        } else if (isAsync() || isUpgrade() || state == SocketState.ASYNC_END) {
            state = dispatch(status);
            state = checkForPipelinedData(state, socketWrapper);
        } else if (status == SocketEvent.OPEN_WRITE) {
            // Extra write event likely after async, ignore
            state = SocketState.LONG;
        } else if (status == SocketEvent.OPEN_READ) {
            state = service(socketWrapper); // 当前`SocketEvent`是读状态
        } else if (status == SocketEvent.CONNECT_FAIL) {
            logAccess(socketWrapper);
        } else {
            // Default to closing the socket if the SocketEvent passed in
            // is not consistent with the current state of the Processor
            state = SocketState.CLOSED;
        }
		...
    return state;
}
```

![image-20221003224752639](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003224752639.png)



```java
@Override
public SocketState service(SocketWrapperBase<?> socketWrapper)
    throws IOException {
    RequestInfo rp = request.getRequestProcessor();
    rp.setStage(org.apache.coyote.Constants.STAGE_PARSE);

    // Setting up the I/O TODO 初始化inputBuffer和outputBuffer
    setSocketWrapper(socketWrapper);
	...
    while (!getErrorState().isError() && keepAlive && !isAsync() && upgradeToken == null &&
            sendfileState == SendfileState.DONE && !protocol.isPaused()) {

        // Parsing the request header
        try {
            if (!inputBuffer.parseRequestLine(keptAlive, protocol.getConnectionTimeout(), // TODO 解析请求首行（获取超时事件、获取协议里的存活时间）
                    protocol.getKeepAliveTimeout())) {
                if (inputBuffer.getParsingRequestLinePhase() == -1) {
                    return SocketState.UPGRADING;
                } else if (handleIncompleteRequestLineRead()) {
                    break;
                }
            }
            prepareRequestProtocol(); // TODO 准备请求协议
			...
        } catch (IOException e) {
            if (log.isDebugEnabled()) {
                log.debug(sm.getString("http11processor.header.parse"), e);
            }
            setErrorState(ErrorState.CLOSE_CONNECTION_NOW, e);
            break;
        } catch (Throwable t) {
			...
        }

        // Has an upgrade been requested?
        if (isConnectionToken(request.getMimeHeaders(), "upgrade")) {
            // Check the protocol
            String requestedProtocol = request.getHeader("Upgrade");

            UpgradeProtocol upgradeProtocol = protocol.getUpgradeProtocol(requestedProtocol);
            if (upgradeProtocol != null) {
                if (upgradeProtocol.accept(request)) {
                    response.setStatus(HttpServletResponse.SC_SWITCHING_PROTOCOLS); // TODO 给response里设置一些东西
                    response.setHeader("Connection", "Upgrade");
                    response.setHeader("Upgrade", requestedProtocol);
					...
                    return SocketState.UPGRADING;
                }
            }
        }

        if (getErrorState().isIoAllowed()) {
            // Setting up filters, and parse some request headers
            rp.setStage(org.apache.coyote.Constants.STAGE_PREPARE);
            try {
                prepareRequest(); // TODO 准备请求 (解析请求头的信息，例如user-agent、host等)
            } catch (Throwable t) {
				...
            }
        }
		...
        // Process the request in the adapter
        if (getErrorState().isIoAllowed()) {
            try {
                rp.setStage(org.apache.coyote.Constants.STAGE_SERVICE);
                getAdapter().service(request, response); // TODO 调用真正的请求处理流程
                if(keepAlive && !getErrorState().isError() && !isAsync() &&
                        statusDropsConnection(response.getStatus())) {
                    setErrorState(ErrorState.CLOSE_CLEAN, null);
                }
            } catch (...) {
				...
            }
        }
	......
}
```

![image-20221003225743033](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003225743033.png)

`prepareRequest()`方法会解析请求头里的各种数据

![image-20221003225904579](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003225904579.png)

让`Http11Processor`类的`service(SocketWrapperBase<?> socketWrapper)`方法一直执行到这，这里处理`request`和`response`，执行真正的请求处理逻辑

![image-20221003230115497](https://gitlab.com/apzs/image/-/raw/master/image/image-20221003230115497.png)

`CoyoteAdapter`类的`service(org.apache.coyote.Request req, org.apache.coyote.Response res)`方法就是真正的请求处理了

```java
@Override
public void service(org.apache.coyote.Request req, org.apache.coyote.Response res)
        throws Exception {
    // 把org.apache.coyote的Request强转为org.apache.catalina.connector的Request(connector的Request实现了javax.servlet.http的HttpServletRequest)
    Request request = (Request) req.getNote(ADAPTER_NOTES);
    Response response = (Response) res.getNote(ADAPTER_NOTES); // 强转Response

    if (request == null) { // TODO req.getNote(ADAPTER_NOTES)里的请求为空
        // Create objects TODO 准备请求和响应
        request = connector.createRequest(); // 创建一个connector的请求
        request.setCoyoteRequest(req);      // 设置coyote的Request为req
        response = connector.createResponse();
        response.setCoyoteResponse(res);

        // Link objects
        request.setResponse(response);
        response.setRequest(request);

        // Set as notes
        req.setNote(ADAPTER_NOTES, request);
        res.setNote(ADAPTER_NOTES, response);

        // Set query string encoding TODO 设置查询字符串的编码格式
        req.getParameters().setQueryStringCharset(connector.getURICharset());
    }

    if (connector.getXpoweredBy()) {
        response.addHeader("X-Powered-By", POWERED_BY);
    }

    boolean async = false;
    boolean postParseSuccess = false;

    req.getRequestProcessor().setWorkerThreadName(THREAD_NAME.get());

    try {
        // Parse and set Catalina and configuration specific
        // request parameters TODO 后置解析请求 （解析scheme、处理url编码、SessionCookiesId、SessionSslId，根据情况[重定向]或[跳转到405错误页]或[放行请求]）
        postParseSuccess = postParseRequest(req, request, res, response);
        if (postParseSuccess) {
            //check valves if we support async
            request.setAsyncSupported( // TODO 异步处理支持（我们没用到异步）
                    connector.getService().getContainer().getPipeline().isAsyncSupported());
            // Calling the container TODO 获取service里的Engine，拿到管道，获取第一个阀门，然后执行
            connector.getService().getContainer().getPipeline().getFirst().invoke(
                    request, response);
        }
		...
    }
}
```

![image-20221004112931783](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004112931783.png)

# 七、请求处理流程

这些方法的执行顺序

`CoyoteAdapter` -> `StandardEngineValve` -> `StandardWrapperValve` (`AbstractAccessLogValve`) -> `ErrorReportValve` -> `StandardHostValve` -> `AuthenticatorBase` -> `NonLoginAuthenticator`(`StandardContextValve`) -> `StandardWrapperValve`

![请求执行顺序](https://gitlab.com/apzs/image/-/raw/master/image/请求执行顺序.png)

## `CoyoteAdapter`的`service()`获取 `Engine`引擎的第一个`Valve`阀门

`getService()`获取`Service`，`getContainer()`获取`Engine`，`getPipeline()`获取管道，`getFirst()`获取第一个`Valve`阀门，执行第一个阀门

```java
@Override
public void service(org.apache.coyote.Request req, org.apache.coyote.Response res)
        throws Exception {
    // 把org.apache.coyote的Request强转为org.apache.catalina.connector的Request(connector的Request实现了javax.servlet.http的HttpServletRequest)
    Request request = (Request) req.getNote(ADAPTER_NOTES);
    Response response = (Response) res.getNote(ADAPTER_NOTES); // 强转Response

    if (request == null) { // TODO req.getNote(ADAPTER_NOTES)里的请求为空
        // Create objects TODO 准备请求和响应
        request = connector.createRequest(); // 创建一个connector的请求
        request.setCoyoteRequest(req);      // 设置coyote的Request为req
        response = connector.createResponse();
        response.setCoyoteResponse(res);

        // Link objects
        request.setResponse(response);
        response.setRequest(request);

        // Set as notes
        req.setNote(ADAPTER_NOTES, request);
        res.setNote(ADAPTER_NOTES, response);

        // Set query string encoding TODO 设置查询字符串的编码格式
        req.getParameters().setQueryStringCharset(connector.getURICharset());
    }

    if (connector.getXpoweredBy()) {
        response.addHeader("X-Powered-By", POWERED_BY);
    }

    boolean async = false;
    boolean postParseSuccess = false;

    req.getRequestProcessor().setWorkerThreadName(THREAD_NAME.get());

    try {
        // Parse and set Catalina and configuration specific
        // request parameters TODO 后置解析请求 （解析scheme、处理url编码、SessionCookiesId、SessionSslId，根据情况[重定向]或[跳转到405错误页]或[放行请求]）
        postParseSuccess = postParseRequest(req, request, res, response);
        if (postParseSuccess) {
            //check valves if we support async
            request.setAsyncSupported( // TODO 异步处理支持（我们没用到异步）
                    connector.getService().getContainer().getPipeline().isAsyncSupported());
            // Calling the container TODO 获取service里的Engine，拿到管道，获取第一个阀门，然后执行
            connector.getService().getContainer().getPipeline().getFirst().invoke(
                    request, response);
        }
		...
    }
}
```

![image-20221004095123298](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004095123298.png)

如果有第一个阀门就返回第一个阀门，没有第一个阀门就返回`basic`

```java
@Override
public Valve getFirst() {
    if (first != null) {
        return first;
    }

    return basic;
}
```

![image-20221004094845912](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004094845912.png)

### `StandardEngineValve`

引擎里的管道的第一个阀门会获取`Host`主机，然后执行主机里的管道的第一个阀门

```java
@Override
public final void invoke(Request request, Response response)
    throws IOException, ServletException {

    // Select the Host to be used for this Request
    Host host = request.getHost();
    if (host == null) {
        // HTTP 0.9 or HTTP 1.0 request without a host when no default host
        // is defined.
        // Don't overwrite an existing error
        if (!response.isError()) {
            response.sendError(404);
        }
        return;
    }
    if (request.isAsyncSupported()) {
        request.setAsyncSupported(host.getPipeline().isAsyncSupported());
    }

    // Ask this Host to process this request
    host.getPipeline().getFirst().invoke(request, response);
}
```

![image-20221004095932119](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004095932119.png)

#### `AccessLogValve`

将请求放到`CachedElement`里缓存着，然后执行下一个阀门 （`AccessLogValve`访问日志阀门）

由于`AccessLogValve`类没有重写父类`AbstractAccessLogValve`的`invoke`方法，所以就跳到了父类的该方法

```java
@Override
public void invoke(Request request, Response response) throws IOException,
        ServletException {
    if (tlsAttributeRequired) {
        // The log pattern uses TLS attributes. Ensure these are populated
        // before the request is processed because with NIO2 it is possible
        // for the connection to be closed (and the TLS info lost) before
        // the access log requests the TLS info. Requesting it now causes it
        // to be cached in the request.
        request.getAttribute(Globals.CERTIFICATES_ATTR);
    }
    if (cachedElements != null) {
        for (CachedElement element : cachedElements) {
            element.cache(request);
        }
    }
    getNext().invoke(request, response);
}
```

![image-20221004103510716](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004103510716.png)



#### `ErrorReportValve`

`ErrorReportValve`阀门先让下一个阀门执行，执行完后再判断有没有出错

```java
@Override
public void invoke(Request request, Response response) throws IOException, ServletException {

    // Perform the request
    getNext().invoke(request, response);

    if (response.isCommitted()) {
        if (response.setErrorReported()) {
            // Error wasn't previously reported but we can't write an error
            // page because the response has already been committed.

            // See if IO is allowed
            AtomicBoolean ioAllowed = new AtomicBoolean(true);
            response.getCoyoteResponse().action(ActionCode.IS_IO_ALLOWED, ioAllowed);

            if (ioAllowed.get()) {
                // I/O is currently still allowed. Flush any data that is
                // still to be written to the client.
                try {
                    response.flushBuffer();
                } catch (Throwable t) {
                    ExceptionUtils.handleThrowable(t);
                }
                // Now close immediately to signal to the client that
                // something went wrong
                response.getCoyoteResponse().action(ActionCode.CLOSE_NOW,
                        request.getAttribute(RequestDispatcher.ERROR_EXCEPTION));
            }
        }
        return;
    }

    Throwable throwable = (Throwable) request.getAttribute(RequestDispatcher.ERROR_EXCEPTION);

    // If an async request is in progress and is not going to end once this
    // container thread finishes, do not process any error page here.
    if (request.isAsync() && !request.isAsyncCompleting()) {
        return;
    }

    if (throwable != null && !response.isError()) {
        // Make sure that the necessary methods have been called on the
        // response. (It is possible a component may just have set the
        // Throwable. Tomcat won't do that but other components might.)
        // These are safe to call at this point as we know that the response
        // has not been committed.
        response.reset();
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }

    // One way or another, response.sendError() will have been called before
    // execution reaches this point and suspended the response. Need to
    // reverse that so this valve can write to the response.
    response.setSuspended(false);

    try {
        report(request, response, throwable);
    } catch (Throwable tt) {
        ExceptionUtils.handleThrowable(tt);
    }
}
```

![image-20221004103953460](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004103953460.png)



#### `StandardHostValve`标准主机阀门

`Host`的`StandardHostValve`阀门又会主动调用`Context`管道里的第一个阀门

```java
@Override
public final void invoke(Request request, Response response)
    throws IOException, ServletException {

    // Select the Context to be used for this Request
    Context context = request.getContext();
    if (context == null) {
        // Don't overwrite an existing error
        if (!response.isError()) {
            response.sendError(404);
        }
        return;
    }

    if (request.isAsyncSupported()) {
        request.setAsyncSupported(context.getPipeline().isAsyncSupported());
    }

    boolean asyncAtStart = request.isAsync();

    try {
        context.bind(Globals.IS_SECURITY_ENABLED, MY_CLASSLOADER);
		...
        try {
            if (!response.isErrorReportRequired()) {
                context.getPipeline().getFirst().invoke(request, response); //调用context管道里的第一个阀门
            }
        } catch (Throwable t) {
			...
            }
        }
		...
    } finally {
        // Access a session (if present) to update last accessed time, based
        // on a strict interpretation of the specification
        if (ACCESS_SESSION) {
            request.getSession(false);
        }

        context.unbind(Globals.IS_SECURITY_ENABLED, MY_CLASSLOADER);
    }
}
```

![image-20221004104310028](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004104310028.png)



##### `NonLoginAuthenticator`

这个阀门主要是做身份相关的

![image-20221004105123068](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004105123068.png)

##### `StandardContextValve`

判断如果请求是"/META-INF"或"/WEB-INF/"下的直接发送错误，因此这些路径下的资源是受保护的

`Context`的`StandardContextValve`阀门又会主动调用`Wrapper`管道里的第一个阀门

```java
@Override
public final void invoke(Request request, Response response)
    throws IOException, ServletException {

    // Disallow any direct access to resources under WEB-INF or META-INF
    MessageBytes requestPathMB = request.getRequestPathMB();
    if ((requestPathMB.startsWithIgnoreCase("/META-INF/", 0))
            || (requestPathMB.equalsIgnoreCase("/META-INF"))
            || (requestPathMB.startsWithIgnoreCase("/WEB-INF/", 0))
            || (requestPathMB.equalsIgnoreCase("/WEB-INF"))) {
        response.sendError(HttpServletResponse.SC_NOT_FOUND); // TODO 如果请求是"/META-INF"或"/WEB-INF/"下的直接发送错误，因此这些路径下的资源是受保护的
        return;
    }

    // Select the Wrapper to be used for this Request
    Wrapper wrapper = request.getWrapper();
    if (wrapper == null || wrapper.isUnavailable()) {
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
        return;
    }

    // Acknowledge the request
    try {
        response.sendAcknowledgement(ContinueResponseTiming.IMMEDIATELY);
    } catch (IOException ioe) {
        container.getLogger().error(sm.getString(
                "standardContextValve.acknowledgeException"), ioe);
        request.setAttribute(RequestDispatcher.ERROR_EXCEPTION, ioe);
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        return;
    }

    if (request.isAsyncSupported()) {
        request.setAsyncSupported(wrapper.getPipeline().isAsyncSupported());
    }
    wrapper.getPipeline().getFirst().invoke(request, response);
}
```

![image-20221004105954863](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004105954863.png)

###### `StandardWrapperValve`

在`StandardWrapperValve`类的`invoke(Request request, Response response)`方法里调用`wrapper.allocate()`创建一个`javax.servlet.Servlet`对象 （每个请求都会调用`wrapper.allocate()`，但只会创建一个同类型的Servlet，即没有才会创建）

![image-20221004110820391](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004110820391.png)

 

###### 调试遇到的问题：`instance`不为`null`

```java
@Override
public Servlet allocate() throws ServletException {

    // If we are currently unloading this servlet, throw an exception
    if (unloading) {
        throw new ServletException(sm.getString("standardWrapper.unloading", getName()));
    }

    boolean newInstance = false;

    // If not SingleThreadedModel, return the same instance every time
    if (!singleThreadModel) {
        // Load and initialize our instance if necessary
        if (instance == null || !instanceInitialized) {
            synchronized (this) {
                if (instance == null) {
                    try {
                        if (log.isDebugEnabled()) {
                            log.debug("Allocating non-STM instance");
                        }

                        // Note: We don't know if the Servlet implements
                        // SingleThreadModel until we have loaded it.
                        instance = loadServlet(); // 加载Servlet
                        newInstance = true;
                        if (!singleThreadModel) {
                            // For non-STM, increment here to prevent a race
                            // condition with unload. Bug 43683, test case
                            // #3
                            countAllocated.incrementAndGet();
                        }
                    } catch (ServletException e) {
                        throw e;
                    } catch (Throwable e) {
                        ExceptionUtils.handleThrowable(e);
                        throw new ServletException(sm.getString("standardWrapper.allocate"), e);
                    }
                }
                if (!instanceInitialized) {
                    initServlet(instance);
                }
            }
        }
		...
    }
}
```

访问`jsp`时`instance`会变为`JspServlet` （例如：http://localhost:8080/index.jsp ）

![image-20221004124844030](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004124844030.png)

访问其他的资源时`instance`会变为`DefaultServlet` （例如：http://localhost:8080/docs/api/index.html  ）

![image-20221004150558757](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004150558757.png)

老师的`instance`为`null`而我的试了几遍都不为`null`

![image-20221004124416674](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004124416674.png)

给`protected volatile Servlet instance = null;`打上断点

![image-20221004124615906](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004124615906.png)

重启项目，最开始`instance`是空的，自动调用` loadServlet()`后，`instance`就非空了

```java
@Override
public synchronized void load() throws ServletException {
    instance = loadServlet();

    if (!instanceInitialized) {
        initServlet(instance);
    }

    if (isJspServlet) {
        StringBuilder oname = new StringBuilder(getDomain());

        oname.append(":type=JspMonitor");

        oname.append(getWebModuleKeyProperties());

        oname.append(",name=");
        oname.append(getName());

        oname.append(getJ2EEKeyProperties());

        try {
            jspMonitorON = new ObjectName(oname.toString());
            Registry.getRegistry(null, null).registerComponent(instance, jspMonitorON, null);
        } catch (Exception ex) {
            log.warn(sm.getString("standardWrapper.jspMonitorError", instance));
        }
    }
}
```

![image-20221004123213358](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004123213358.png)

这个`StandardWrapper`类的`loadServlet()`会返回一个`DefaultServlet`，就是它让`instance`不为`null`的

```java
public synchronized Servlet loadServlet() throws ServletException {

    // Nothing to do if we already have an instance or an instance pool
    if (!singleThreadModel && (instance != null))
        return instance;
	...
    Servlet servlet;
    try {
		...
        InstanceManager instanceManager = ((StandardContext)getParent()).getInstanceManager();
        try {
            servlet = (Servlet) instanceManager.newInstance(servletClass); //TODO 利用反射，创建Servlet对象
        } catch (ClassCastException e) {
            unavailable(null);
            // Restore the context ClassLoader
            throw new ServletException
                (sm.getString("standardWrapper.notServlet", servletClass), e);
        } catch (Throwable e) {
			...
        }
		...
        initServlet(servlet); // TODO 初始化刚刚创建的Servlet

        fireContainerEvent("load", this);

        loadTime=System.currentTimeMillis() -t1;
    } finally {
		...
    }
    return servlet;

}
```

![image-20221004123429455](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004123429455.png)



调试的过程中还发现了获取当前`Host`的所有应用的方法

![image-20221004124001259](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004124001259.png)



```java
protected void deployApps() {
    File appBase = host.getAppBaseFile();
    File configBase = host.getConfigBaseFile();
    String[] filteredAppPaths = filterAppPaths(appBase.list());
    // Deploy XML descriptors from configBase
    deployDescriptors(configBase, configBase.list());
    // Deploy WARs
    deployWARs(appBase, filteredAppPaths);
    // Deploy expanded folders
    deployDirectories(appBase, filteredAppPaths);
}
```

![image-20221004124258823](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004124258823.png)



###### 解决方法

点击`instance`弹出框的左下角的`Set value`重新将其设为`null`

![image-20221004152401953](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004152401953.png)

这个`StandardWrapper`类的`loadServlet()`方法就是前面说的让`instance`不为`null`的方法

```java
public synchronized Servlet loadServlet() throws ServletException {

    // Nothing to do if we already have an instance or an instance pool
    if (!singleThreadModel && (instance != null))
        return instance;

    PrintStream out = System.out;
    if (swallowOutput) {
        SystemLogHandler.startCapture();
    }

    Servlet servlet;
    try {
        long t1=System.currentTimeMillis();
        // Complain if no servlet class has been specified
        if (servletClass == null) {
            unavailable(null);
            throw new ServletException
                (sm.getString("standardWrapper.notClass", getName()));
        }

        InstanceManager instanceManager = ((StandardContext)getParent()).getInstanceManager();
        try {
            servlet = (Servlet) instanceManager.newInstance(servletClass); //TODO 利用反射，创建Servlet对象
        } catch (ClassCastException e) {
			...
        }
		...
        initServlet(servlet); // TODO 初始化刚刚创建的Servlet

        fireContainerEvent("load", this);

        loadTime=System.currentTimeMillis() -t1;
    } finally {
		...
    }
    return servlet;

}
```

`loadServlet()`方法会利用反射，创建一个`Servlet`对象

![image-20221004152908408](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004152908408.png)

然后`loadServlet()`方法调用`initServlet(servlet);`

![image-20221004153208943](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004153208943.png)

`initServlet(servlet);`方法调用了` servlet.init(facade);`方法

```java
private synchronized void initServlet(Servlet servlet)
        throws ServletException {

    if (instanceInitialized && !singleThreadModel) return;

    // Call the initialization method of this servlet
    try {
        if( Globals.IS_SECURITY_ENABLED) {
            boolean success = false;
            try {
                Object[] args = new Object[] { facade };
                SecurityUtil.doAsPrivilege("init",
                                           servlet,
                                           classType,
                                           args);
                success = true;
            } finally {
                if (!success) {
                    // destroy() will not be called, thus clear the reference now
                    SecurityUtil.remove(servlet);
                }
            }
        } else {
            servlet.init(facade);
        }

        instanceInitialized = true;
    } catch (...) {
		...
    }
}
```

![image-20221004154235417](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004154235417.png)

这` servlet.init(facade);`方法就初始化了一些参数

![image-20221004154445262](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004154445262.png)



在`StandardWrapperValve`类的`invoke(Request request, Response response)`方法调用的`wrapper.allocate()`方法初始化一个`Servlet`后，会初始化一个`filterChain` （过滤器链）

![image-20221004155758361](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004155758361.png)

然后调用`filterChain.doFilter(request.getRequest(), response.getResponse());`方法

![image-20221004160756799](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004160756799.png)



`filterChain.doFilter(request.getRequest(), response.getResponse());`会调用`internalDoFilter(request,response);`方法

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response)
    throws IOException, ServletException {

    if( Globals.IS_SECURITY_ENABLED ) {
		...
    } else {
        internalDoFilter(request,response); // TODO 内部过滤
    }
}
```

![image-20221004160931559](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004160931559.png)

如果有的话，会执行`javax.servlet`包下的`Filter`类的`doFilter(ServletRequest request, ServletResponse response,FilterChain chain)`方法

```java
public final class ApplicationFilterChain implements FilterChain {
	...
    @Override
    public void doFilter(ServletRequest request, ServletResponse response)
        throws IOException, ServletException {

        if( Globals.IS_SECURITY_ENABLED ) {
			...
        } else {
            internalDoFilter(request,response); // TODO 内部过滤
        }
    }

    private void internalDoFilter(ServletRequest request,
                                  ServletResponse response)
        throws IOException, ServletException {

        // Call the next filter if there is one
        if (pos < n) {
            ApplicationFilterConfig filterConfig = filters[pos++];
            try {
                Filter filter = filterConfig.getFilter();
				...
                if( Globals.IS_SECURITY_ENABLED ) {
					...
                } else {
                    filter.doFilter(request, response, this); // TODO 执行 javax.servlet.Filter.doFilter(ServletRequest request, ServletResponse response,FilterChain chain)
                }
            } catch (IOException | ServletException | RuntimeException e) {
                throw e;
            } catch (Throwable e) {
                e = ExceptionUtils.unwrapInvocationTargetException(e);
                ExceptionUtils.handleThrowable(e);
                throw new ServletException(sm.getString("filterChain.filter"), e);
            }
            return;
        }
 // We fell off the end of the chain -- call the servlet instance
        try {
			...
            // Use potentially wrapped request from this point
            if ((request instanceof HttpServletRequest) &&
                    (response instanceof HttpServletResponse) &&
                    Globals.IS_SECURITY_ENABLED ) {
					...
            } else {
                servlet.service(request, response); // 执行封装的servlet.service(req,resp) 
            }
        } catch (...) {
			...
        } finally {
			...
        }
    }
	...
}
```

![image-20221004161233825](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004161233825.png)

`filterChain`执行完没有任何异常就会调用`servlet.service(request, response);`方法

![image-20221004162102856](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004162102856.png)

HttpServlet抽象类继承的GenericServlet抽象类的Servlet接口里的service(ServletRequest req, ServletResponse res)方法，HttpServlet抽象类的service方法调用doGet(req, resp)、doPost(req, resp)等方法

```java
package org.apache.catalina.servlets;

...
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
...

public class DefaultServlet extends HttpServlet {
    ...
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        if (req.getDispatcherType() == DispatcherType.ERROR) {
            doGet(req, resp);
        } else {
            super.service(req, resp);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
        throws IOException, ServletException {

        // Serve the requested resource, including the data content
        serveResource(request, response, true, fileEncoding);

    }

    @Override
    protected void doHead(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
            ...
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {

        resp.setHeader("Allow", determineMethodsAllowed(req));
    }


    protected String determineMethodsAllowed(HttpServletRequest req) {
        StringBuilder allow = new StringBuilder();

        // Start with methods that are always allowed
        allow.append("OPTIONS, GET, HEAD, POST");

        // PUT and DELETE depend on readonly
        if (!readOnly) {
            allow.append(", PUT, DELETE");
        }

        // Trace - assume disabled unless we can prove otherwise
        if (req instanceof RequestFacade &&
                ((RequestFacade) req).getAllowTrace()) {
            allow.append(", TRACE");
        }

        return allow.toString();
    }

    ...
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
        throws IOException, ServletException {
        doGet(request, response);
    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
            ...
    }

    ...

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException {
            ...
    }
	...
}
```

![image-20221004163013107](https://gitlab.com/apzs/image/-/raw/master/image/image-20221004163013107.png)
