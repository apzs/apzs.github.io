# 初始java

## Java : 一个帝国的诞生

### 1、C语言帝国的统治

现在是公元1995年， C语言帝国已经统治了我们20多年， 实在是太久了。 

1972年， 随着C语言的诞生和Unix的问世， 帝国迅速建立统治， 从北美到欧洲， 从欧洲到亚洲，  无数程序员臣服在他的脚下。

帝国给我们提供了极好的福利：贴近硬件，  运行极快， 效率极高。  

使用这些福利， 程序员们用C 开发了很多系统级软件，操作系统， 编译器， 数据库，网络系统.....

但是帝国也给我们安上了两个沉重的枷锁： 指针和内存管理

虽然指针无比强大， 能直接操作内存， 但是帝国却没有给我们工具去做越界的检查， 导致很多新手程序员轻易犯错。

至于内存管理， 帝国更完全是放任的态度： 你自己分配的空间， 自己去释放 ！

更要命的是这些问题在编译期发现不了， 在运行时才会突然暴露， 常常让我们手忙脚乱， 昏天黑地去调试。 

我们的大量时间和宝贵的精力都被浪费在小心翼翼的处理指针和内存分配上。 

每个程序员都被这两个东西搞的焦头烂额！

帝国宣称的可移植性骗了我们，他宣称我们在一个机器上写的程序， 只要在另外一个机器上编译就可以了， 实际上不是这样。 他要求我们尽量用标准的C函数库。其次，如果遇到了一些针对特定平台的调用， 需要对每个平台都得写一份 ！  有一点点小错误，都会导致编译失败。 

1982年，帝国又推出了一门新的语言C++, 添加了面向对象的功能，兼容C, 有静态类型检查， 性能也很好。  

但是这门新的语言实在是太复杂了， 复杂到比我聪明的多的人都没有办法完全掌握这门语言，它的很多特性复杂的让人吃惊。 

C++在图形领域和游戏上取得了一些成功， 但是我一直学不好它。 

### 2、反抗

我决定反抗这个庞大的帝国，  我偷偷的带领着一帮志同道合的兄弟离开了，我们要新建一块清新自由的领地。 

为了吸引更多的程序员加入我们， 我们要建立一个新的语言，这个语言应该有这样的特性：

语法有点像C ， 这样大家容易接受

没有C语言那样的指针 

再也不要考虑内存管理了， 实在受不了了

真正的可移植性， 编写一次， 到处运行

面向对象

类型安全

还有，我们要提供一套高质量的类库， 随语言发行。 

我想把这个语言命名为C++--  , 即C++减减，  因为我想在C++的基础上改进，把它简化。 

后来发现不行， 设计理念差别太大。

干脆重启炉灶。 

我看到门口的一棵橡树， 就把这个语言叫做Oak。 

但是后来发布的时候， 发现Oak已经被别人用了， 我们讨论很久， 最终决定把这门新的语言叫做 Java。 

为了实现跨平台， 我们在操作系统和应用程序之间增加了一个抽象层： Java 虚拟机

用Java写的程序都跑在虚拟机上， 除非个别情况， 都不用看到操作系统。

### 3、一鸣惊人

为了吸引更多的人加入我们的新领地， 我们决定搞一个演示， 向大家展示Java 的能力。 

出世未久的Java其实还远不完善。 搞点什么好呢？

我们把眼光盯上了刚刚兴起的互联网， 1995年的网页简单而粗糙， 缺乏互动性。 于是我们在浏览器上弄了个小插件， 把java 运行环境放了上去。

然后在上面开发了一个图形界面的程序(Applet)， 让它看起来美轮美奂， 震撼人心。 

每一个看到他的序员都会发出“Wow”的惊叹 ！为之倾倒。 

Java 活了！

通过Applet , 无数的程序员看到了Java这门语言，了解了这门语言特性以后， 很多无法忍受C帝国暴政的程序员， 很快加入了我们， 我们的领地开始迅速扩大。 

连C语言帝国里的一些商业巨头也纷纷来和我们合作， 其中就包括Oracle , 微软这样的巨头 ， 微软的头领Bill Gates还说 ：这是迄今为止设计的最好的语言！

但是Bill Gates非常的不地道， 买了我们的Java 许可以后，虽然在自家的浏览器上也支持Applet, 但是他们却偷偷的试图修改Java ,  想把Java绑死在自家的操作系统上赚钱， Java会变的不可移植。 

这是我们难于忍受的， 我们和微软发起了一场旷日持久的游击战争， 逼着微软退出了Java领域， 开发了自己的.NET , 这是后话。

### 4、开拓疆土

从1995年到1997年，我们依靠 Java 不断的攻城略地， 开拓疆土，我们王国的子民不断增加， 达到了几十万之众， 已经是一个不可忽视的力量了。

但是大家发现， Java除了Applet, 以及一些小程序之外， 似乎干不了别的事情。 

C帝国的人还不断的嘲笑我们慢， 像个玩具。

到了1998年， 经过密谋， 我们Java 王国决定派出三只军队向外扩展：

Java 2 标准版(J2SE)： 去占领桌面

Java 2 移动版(J2ME)： 去占领手机

Java 2 企业版(J2EE)： 去占领服务器

其中的两只大军很快败下阵来。

J2SE 的首领发现， 开发桌面应用的程序员根本接受不了Java， 虽然我们有做的很优雅的Swing 可以开发界面， 但是开发出的界面非常难看， 和原生的桌面差距很大。 尤其是为了运行程序还得安装一个虚拟机， 大家都受不了。  

J2ME也是， 一直不受待见，  当然更重要的原因是乔布斯还没有重新发明手机， 移动互联网还没有启动。 

失之东隅，收之桑榆， J2EE赶上了好时候， 互联网大发展， 大家忽然发现， Java简直是为写服务器端程序所发明的！

强大， 健壮， 安全， 简单， 跨平台 ！

在J2EE规范的指导下， 特别适合团队开发复杂的大型项目。

我们授权BEA公司第一个使用J2EE许可证， 推出了Weblogic,  凭借其集群功能， 第一次展示了复杂应用的可扩展性和高可用性。 

这个后来被称为中间件的东西把程序员从事务管理，安全管理，权限管理等方面解放出来， 让他们专注于业务开发。  这立刻捕获了大量程序员的心。

很快Java 王国的子民就达到数百万之众。 

榜样的力量是无穷的， 很快其他商业巨头也纷纷入场， 尤其是IBM，在Java 上疯狂投入，不仅开发了自己的应用服务器 Websphere,  还推出了Eclipse这个极具魅力的开源开发平台。

当然IBM利用java 获得了非常可观的效益， 软件+硬件+服务  三驾马车滚滚向前， 把IBM推向了一个新的高峰。

### 5、帝国的诞生

大家也没有想到，除了商业巨头以外， 程序员们也会对Java王国 这么热爱， 他们基于Java 开发了巨多的平台，系统，工具，例如：

构建工具: Ant，Maven, Jekins

应用服务器： Tomcat，Jetty, Jboss, Websphere, weblogic

Web开发：  Struts,Spring,Hibernate, myBatis

开发工具： Eclipse, Netbean,intellij idea, Jbuilder

。。。。等等等等。。。。

并且绝大部分都是开源的 ！

微软眼睁睁的看着服务器端的市场被Java 王国占据， 岂能善罢甘休？ 他们赶紧推出.NET来对抗， 但我们已经不在乎了， 因为他的系统是封闭的，所有的软件都是自家的：

开发工具是Visual Studio, 应用服务器是IIS, 数据库是SQL Server，只要你用.NET，基本上就会绑定微软。 

另外他们的系统只能运行在Windows服务器上， 这个服务器在高端市场的占有率实在是太低了。 

2005年底， 一个新的王国突然崛起， 他们号称开发效率比java 快5-10倍， 由此吸引了大批程序员前往加盟。 

这个新的王国叫做Ruby on Rails, 它结合了PHP体系的优点（快速开发）和Java体系的优点（程序规整）， 特别适合快速的开发简单的Web网站。 

虽然发展很快， 但没有对Java 王国产生实质性的威胁， 使用Ruby on Rails搭建大型商业系统的还很少。

除了Ruby on Rails  ，还有PHP， Python ， 都适合快速开发不太复杂的Web系统。 但是关键的，复杂的商业系统开发还是Java 王国的统治之下。 所以我们和他们相安无事。

2006年， 一只叫Hadoop的军队让Java王国入侵了大数据领域， 由于使用Java 语言， 绝大多数程序员在理解了Map/Reduce , 分布式文件系统在Hadoop中的实现以后， 很快就能编写处理处理海量数据的程序， Java 王国的领地得到了极大的扩展。

2008年，  一个名叫Android 的系统横空出世， 并且随着移动互联网的爆发迅速普及，  运行在Android之上的正是Java ！  

Java 王国在Google的支持下， 以一种意想不到的方式占领了手机端， 完成了当年J2ME 壮志未酬的事业 ！

到今年为止， 全世界估计有1000万程序员加入了Java王国，它领土之广泛， 实力之强大， 是其他语言无法比拟的。 

Java 占据了大部分的服务器端开发，尤其是关键的复杂的系统， 绝大多数的手机端， 以及大部分的大数据领域。 

一个伟大的帝国诞生了。 

## Java的特性和优势

### 八大特性

**1、跨平台/可移植性**

这是Java的核心优势。Java在设计时就很注重移植和跨平台性。比如：Java的int永远都是32位。不像C++可能是16，32，可能是根据编译器厂商规定的变化。这样的话程序的移植就会非常麻烦。

 **2、安全性**

Java适合于网络/分布式环境，为了达到这个目标，在安全性方面投入了很大的精力，使Java可以很容易构建防病毒，防篡改的系统。

 **3、面向对象**

面向对象是一种程序设计技术，非常适合大型软件的设计和开发。由于C++为了照顾大量C语言使用者而兼容了C，使得自身仅仅成为了带类的C语言，多少影响了其面向对象的彻底性！

Java则是完全的面向对象语言。

**4、简单性**

Java就是C++语法的简化版，我们也可以将Java称之为“C++-”。跟我念“C加加减”，指的就是将C++的一些内容去掉；比如：头文件，指针运算，结构，联合，操作符重载，虚基类等等。

同时，由于语法基于C语言，因此学习起来完全不费力。

 **5、高性能**

Java最初发展阶段，总是被人诟病“性能低”；客观上，高级语言运行效率总是低于低级语言的，这个无法避免。Java语言本身发展中通过虚拟机的优化提升了几十倍运行效率。

比如，通过JIT(JUST IN TIME)即时编译技术提高运行效率。 将一些“热点”字节码编译成本地机器码，并将结果缓存起来，在需要的时候重新调用。这样的话，使Java程序的执行效率大大提高，

某些代码甚至接待C++的效率。因此，Java低性能的短腿，已经被完全解决了。业界发展上，我们也看到很多C++应用转到Java开发，很多C++程序员转型为Java程序员。

 **6、分布式**

Java是为Internet的分布式环境设计的，因为它能够处理TCP/IP协议。事实上，通过URL访问一个网络资源和访问本地文件是一样简单的。Java还支持远程方法调用(RMI,Remote Method Invocation)，

使程序能够通过网络调用方法。

 **7、多线程**

多线程的使用可以带来更好的交互响应和实时行为。 Java多线程的简单性是Java成为主流服务器端开发语言的主要原因之一。

 **8、健壮性**

Java是一种健壮的语言，吸收了C/C++ 语言的优点，但去掉了其影响程序健壮性的部分（如：指针、内存的申请与释放等）。Java程序不可能造成计算机崩溃。即使Java程序也可能有错误。

如果出现某种出乎意料之事，程序也不会崩溃，而是把该异常抛出，再通过异常处理机制加以处理。

### 核心优势

![img](https://gitlab.com/apzs/image/-/raw/master/image/v2-9992d6134d870ebd7d6b93c11440329d_720w.jpg)

　　跨平台是Java语言的核心优势，赶上最初互联网的发展，并随着互联网的发展而发展，建立了强大的生态体系，目前已经覆盖IT各行业的“第一大语言”，是计算机界的“英语”。

　　虽然，目前也有很多跨平台的语言，但是已经失去先机，无法和Java强大的生态体系抗衡。Java仍将在未来几十年成为编程语言的主流语言。

JAVA虚拟机是JAVA实现跨平台的核心。事实上，基于JAVA虚拟机(JVM)的编程语言还有很多种：

![img](https://gitlab.com/apzs/image/-/raw/master/image/v2-646ad77cd0889ca096285ba5f7e4f3ee_720w.jpg)

基于JAVA生态建立的产品将会越来越多；基于JAVA虚拟机的编程语言也将会越来越多；生态系统的强大，是JAVA能长盛不衰的根本。

## Java三大版本

**JAVA最大的特点：**

 Java的主要优势在于其做出的WORA：即一次编写（Write Once）、随处运行（Run Anywhere）。简单来讲，这意味着开发团队能够利用Java编写一款应用程序，并将其编译为可执行形式，而后将其运行 在任何支持Java的平台之上。这显然能够极大提高编程工作的实际效率，这种优势来源于Java Virtual Machine(JAVA虚拟机的缩写)，JVM是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在 实际的计算机上仿真模拟各种计算机功能来实现的。JAVA语言的一个非常重要的特点就是与平台的无关 性，而使用Java虚拟机是实现这一特点的关键。

**JAVA三大版本：**

1. JAVA SE：它是JAVA的标准版，是整个JAVA的基础和核心，这是我们主要学习的一个部分，也是 JAVAEE和JAVAME技术的基础，主要用于开发桌面应用程序。学会后可以做一些简单的桌面应用 如：扫雷，连连看等。 
2. JAVA ME：它是JAVA的微缩版，主要应用于嵌入式开发，比如手机程序的开发。目前来说就业范围不是很广，在一些城市可能相对的不好找工作。 
3. JAVA EE：也叫JAVA的企业版，它提供了企业级应用开发的完整解决方案，比如开发网站，还有企业的一些应用系统，是JAVA技术应用最广泛的领域。主要还是偏向于WEB的开发，而JAVA EE的基础就是JAVA SE，所以我们在学习JAVA SE的时候，基础一定要打好，因为这是最基本的，也是最核 心的。

## JDK 和 JRE

**JDK**

Java 2 SDK (Development Kit)包含：JRE的超集，包含编译器和调试器等用于程序开发的文件

**JRE**

Java Runtime Environment (JRE) 包含：Java虚拟机、库函数、运行Java应用程序和Applet所必须文件

Java运行环境的三项主要功能：

- 加载代码：由class loader 完成；
- 校验代码：由bytecode verifier 完成；
- 执行代码：由 runtime interpreter完成。

**区别和联系**：

sdk（也就是jdk）是jre的超集，是在jre的基础上增加了编译器及其他一些开发工具。

jre就是java运行时环境，包括了jvm和其它一些java核心api,任何一台电脑，只有安装了jre才可以行 java程序.

如果只是要运行JAVA程序，之需要JRE就可以。 JRE通常非常小，也包含了JVM.

如果要开发JAVA程序，就需要安装JDK。

## 初识JVM

JVM（JAVA Virtual Machine）

JVM是一种规范，可以使用软件来实现，也可以使用硬件来实现，就是一个虚拟的用于执byte-codes 字节码的计算机。他也定义了指令集、寄存器集、结构栈、垃圾收集堆、内存区域。

JVM负责将java字节码解释运行，边解释边运行，这样，速度就会受到一定的影响。JAVA提供了另一种 解释运行的方法JIT（just in time），可以一次解释完，再运行特定平台上的机器码，高级的JIT可以只能 分析热点代码，并将这些代码转成本地机器码，并将结果缓存起来，下次直接从内存中调用，这样就大 大提高了执行JAVA代码的效率。这样就实现了跨平台、可移植的功能。

1. JVM是指在一台计算机上由软件或硬件模拟的计算机；它类似一个小巧而高效的CPU。 

2. byte-code代码是与平台无关的是虚拟机的机器指令。 

3. java字节代码运行的两种方式:

   -  interpreter(解释)

      运行期解释字节码并执行

   -  Just-in-time(即时编译)

      由代码生成器将字节代码转换成本机的机器代码,然后可以以较高速度执行。

[^初识JVM]:  https://www.jianshu.com/p/17ab51b87a13
JAVA的跨平台实现的核心是不同平台使用不同的虚拟机 

不同的操作系统有不同的虚拟机。Java 虚拟机机制屏蔽了底层运行平台的差别，实现了“一次编译，随处运行”。



## JAVA程序运行机制

说到Java的运行机制，不得不提一下什么是编译型语言，什么是解释型语言。

### **编译型语言**

编译型语言是先将源代码编译成机器语言（机器可以读懂的语言），再由机器运行机器码，这样执行程序的效率比较高。像C和C++就是典型的编译型语言。

### **解释型语言**

其实解释型语言是相对编译型语言存在的，解释型语言是在运行的时候才进行编译，每次运行都需要编译，这样效率比较低。像JavaScript，Python就是典型的解释型语言

### **二者的区别**

简单的举个例子：同样一本英文书，找人翻译成中文版的书然后拿给你看就是编译，找一个翻译员在你旁边给你解读书的含义就是解释。两者各有利弊，编译型语言执行效率高，翻译一次可以多次运行。解释性语言执行效率低，每次运行都需要重新翻译。但是解释型的跨平台性相对要好，比如解释给一个懂中文和解释给一个懂日文的人就叫做兼容性。

### **Java的运行机制**

Java属于两者都有，既有编译过程，又是解释型语言

Java语言虽然比较接近解释型语言的特征，但在执行之前已经预先进行一次预编译，生成的代码是介 于机器码和Java源代码之间的中介代码，运行的时候则由JVM（Java的虚拟机平台，可视为解释器）解 释执行。它既保留了源代码的高抽象、可移植的特点，又已经完成了对源代码的大部分预编译工作，所以 执行起来比“纯解释型”程序要快许多。

总之，随着设计技术与硬件的不断发展，编译型与解释型两种方式的界限正在不断变得模糊。

::: tip 第一步：编译

:::

利用编译器（javac）将源程序编译成字节码à 字节码文件名：源文件名.class

::: tip 第二部：运行

:::



利用虚拟机（解释器，java）解释执行class字节码文件。

![image-20210319180207773](https://gitlab.com/apzs/image/-/raw/master/image/image-20210319180207773.png)


## Hello World

需要先配置好开发环境

参考链接：https://www.runoob.com/java/java-environment-setup.html

测试代码一定要写HelloWorld！代表你向这个世界的呐喊，仪式感很重要，就像你生活 中和家人，朋友，妻子在节日中或者纪念日一定要做一些事情，这就是仪式感。

1. 新建文件 Hello.java

2. 编写我们的HelloWorld程序！

   ```java
   public class Hello{
       public static void main(String[] args){
           System.out.println("Hello,World!");
       }
   }
   ```

3. 保存文件，cmd打开命令行，利用javac编译！

   ```cmd
   javac Hello.java
   # 如果没有报错，查看文件夹下是否有新的一个文件
   # Hello.class
   # 如果没有出现，恭喜！说明你遇到了你在学Java当中的第一个Bug
   ```

4. java 执行！

   ```cdm
   java Hello
   # 成功输出Hello，World！
   ```

如果出现错误，检查字母大小写是否有错误，或者是否标点符号错误，文件名错误等等，一定要确保成功输出

**编写 Java 程序时，应注意以下几点：**

- 大小写敏感

  Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。

- 类名

  对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 MyFirstJavaClass 。

- 方法名

  所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字 母大写。

- 源文件名

  源文件名必须和类名相同。当保存文件的时候，你应该使用类名作为文件名保存（切记 Java 是大小写敏感的），文件名的后缀为 .java。（如果文件名和类名不相同则会导致编译错误）。

- 主方法入口

  所有的 Java 程序由 public static void main(String []args) 方法开始执行。



# JavaSE-基础语法

## 注释

平时我们编写代码，在代码量比较少的时候，我们还可以看懂自己写的，但是当项目结构一旦复杂起来，我们就需要用到一个注释了，注释就类似于我们上学时候写的笔记，我们看着笔记就知道自己写的 什么东西了！在程序中也是如此。我们来看一下Java中的注释怎么写，看以下代码：

```java
/*
* @Description HelloWorld类
* @Author Diamond 狂神
**/
public class HelloWorld {
    /*
    这是我们Java程序的主入口，
    main方法也是程序的主线程。
    */
    public static void main(String[] args) {
        //输出HelloWorld！
        System.out.println("Hello,World!");
    }
}

```

注释并不会被执行，是给我们写代码的人看的，书写注释是一个非常好的习惯。

**Java中的注释有三种：**

单行注释：只能注释当前行，以//开始，直到行结束

```java
//输出HelloWorld！
```

多行注释：注释一段文字，以/*开始， */结束！

```java
/*
    这是我们Java程序的主入口，
    main方法也是程序的主线程。
*/
```

文档注释：用于生产API文档，配合JavaDoc。

```java
/*
* @Description HelloWorld类
* @Author Diamond 狂神
**/
```


## 标识符

每个人从出生开始就有一个名字，咋们生活中的所有事物也都有名字，这名字是谁规定呢？回答是：造物主，谁生产出来的谁规定名字，在我们的程序中也不例外。

我们作为造物主，需要给所有的东西给上一个名字，比如我们的HelloWorld程序：

HelloWorld是类名，也是我们的文件名。它前面的 public class是关键字，不过是搞Java那群人已经定 义好的有特殊作用的，下面的每一个代码都有自己的意思和名字对吧，就是用来作区分！和我们的名字 一样，拿来被叫或者称呼的，程序一切都源自于生活，一定要把学程序和生活中的一切联系起来，你会发现这一切都是息息相关的。

![image-20210319190451624](https://gitlab.com/apzs/image/-/raw/master/image/image-20210319190451624.png)

我们来看看有哪些是Java自己定义好的关键字呢？

![image-20210319190649910](https://gitlab.com/apzs/image/-/raw/master/image/image-20210319190649910.png)

我们自己起名字有哪些要求呢？ 

表示类名的标识符用大写字母开始。

> 如：Man, GoodMan

表示方法和变量的标识符用小写字母开始，后面的描述性词以大写开始。

> 如：eat(),eatFood()

具体可参考《阿里巴巴Java开发手册》

**关于 Java 标识符，有以下几点需要注意：**

- 所有的标识符都应该以字母（A-Z 或者 a-z）美元符（$）或者下划线（_）开始
- 首字符之后可以是字母（A-Z 或者 a-z）美元符（$）下划线（_）或数字的任何字符组合
- 不能使用关键字作为变量名或方法名。
- 标识符是大小写敏感的
- 合法标识符举例：age、$salary、_value、__1_value
- 非法标识符举例：123abc、-salary、#abc

JAVA不采用通常语言使用的ASCII字符集，而是采用unicode这样的标准的国际字符集。因此，这里的 字母的含义：可以表示英文、汉字等等。

可以使用中文命名，但是一般不建议这样去使用，也不建议使用拼音，很Low



## 数据类型

Java是一种强类型语言，每个变量都必须声明其类型。

扩展：各种字符集和编码详解(https://www.cnblogs.com/cmt/p/14553189.html)

### 1、强弱类型语言

- 强类型语言

  强类型语言是一种强制类型定义的语言，一旦某一个变量被定义类型，如果不经过强制转换，则它永远就是该数据类型了，强类型语言包括Java、.net 、Python、C++等语言。

  举个例子：定义了一个整数，如果不进行强制的类型转换，则不可以将该整数转化为字符串。

- 弱类型语言

  弱类型语言是一种弱类型定义的语言，某一个变量被定义类型，该变量可以根据环境变化自动进行转换，不需要经过显性强制转换。弱类型语言包括vb 、PHP、javascript等语言。

  在VB Script中，可以将字符串‘12’和整数3进行连接得到字符串‘123’，也可以把它看成整数123，而不需 要显示转换。是不是十分的随便，我们Java就不是这样的。

- 区别

  无论是强类型语言还是弱类型语言，判别的根本是是否会隐性的进行语言类型转变。强类型语言在速度上略逊于弱类型语言，但是强类型定义语言带来的严谨性又能避免不必要的错误。

### 2、数据类型

Java的数据类型分为两大类：基本类型（primitive type）和引用类型 （reference type）

![image-20210319191956137](https://gitlab.com/apzs/image/-/raw/master/image/image-20210319191956137.png)

【注：引用数据类型的大小统一为4个字节，记录的是其引用对象的地址！】

![image-20210319192043592](https://gitlab.com/apzs/image/-/raw/master/image/image-20210319192043592.png)

如果你看到这一堆头疼的话，没关系，不用记，JDK中类型对应的包装类都帮忙写好了，我们需要时候可 以直接看到！可以把以下代码拷贝进行查看结果：

```java
public static void main(String[] args) {
    // byte
    System.out.println("基本类型：byte 二进制位数：" + Byte.SIZE);
    System.out.println("包装类：java.lang.Byte");
    System.out.println("最小值：Byte.MIN_VALUE=" + Byte.MIN_VALUE);
    System.out.println("最大值：Byte.MAX_VALUE=" + Byte.MAX_VALUE);
    System.out.println();
    // short
    System.out.println("基本类型：short 二进制位数：" + Short.SIZE);
    System.out.println("包装类：java.lang.Short");
    System.out.println("最小值：Short.MIN_VALUE=" + Short.MIN_VALUE);
    System.out.println("最大值：Short.MAX_VALUE=" + Short.MAX_VALUE);
    System.out.println();
    // int
    System.out.println("基本类型：int 二进制位数：" + Integer.SIZE);
    System.out.println("包装类：java.lang.Integer");
    System.out.println("最小值：Integer.MIN_VALUE=" + Integer.MIN_VALUE);
    System.out.println("最大值：Integer.MAX_VALUE=" + Integer.MAX_VALUE);
    System.out.println();
    // long
    System.out.println("基本类型：long 二进制位数：" + Long.SIZE);
    System.out.println("包装类：java.lang.Long");
    System.out.println("最小值：Long.MIN_VALUE=" + Long.MIN_VALUE);
    System.out.println("最大值：Long.MAX_VALUE=" + Long.MAX_VALUE);
    System.out.println();
    // float
    System.out.println("基本类型：float 二进制位数：" + Float.SIZE);
    System.out.println("包装类：java.lang.Float");
    System.out.println("最小值：Float.MIN_VALUE=" + Float.MIN_VALUE);
    System.out.println("最大值：Float.MAX_VALUE=" + Float.MAX_VALUE);
    System.out.println();
    // double
    System.out.println("基本类型：double 二进制位数：" + Double.SIZE);
    System.out.println("包装类：java.lang.Double");
    System.out.println("最小值：Double.MIN_VALUE=" + Double.MIN_VALUE);
    System.out.println("最大值：Double.MAX_VALUE=" + Double.MAX_VALUE);
    System.out.println();
    // char
    System.out.println("基本类型：char 二进制位数：" + Character.SIZE);
    System.out.println("包装类：java.lang.Character");
    // 以数值形式而不是字符形式将Character.MIN_VALUE输出到控制台
    System.out.println("最小值：Character.MIN_VALUE="+ (int) Character.MIN_VALUE);
    // 以数值形式而不是字符形式将Character.MAX_VALUE输出到控制台
    System.out.println("最大值：Character.MAX_VALUE="+ (int) Character.MAX_VALUE);
}
```

字节相关知识：

> 位（bit）：是计算机 内部数据 储存的最小单位，11001100是一个八位二进制数。
>
> 字节（byte）：是计算机中 数据处理 的基本单位，习惯上用大写 B 来表示。
>
> 	1B（byte,字节）= 8bit（位）
>
> 字符：是指计算机中使用的字母、数字、字和符号

ASCIIS码：

| 内容                      | 占用大小 |
| ------------------------- | -------- |
| 1个英文字符（不分大小写） | 1个字节  |
| 1个中文汉字               | 2个字节  |
| 1个ASCII码                | 1个字节  |

UTF-8编码：

| 内容            | 占用大小 |
| --------------- | -------- |
| 1个英文字符     | 1个字节  |
| 英文标点        | 1个字节  |
| 1个中文（含繁体 | 3个字节  |
| 中文标点        | 3个字节  |

Unicode编码：

| 内容            | 占用大小 |
| --------------- | -------- |
| 1个英文字符     | 2个字节  |
| 英文标点        | 2个字节  |
| 1个中文（含繁体 | 2个字节  |
| 中文标点        | 2个字节  |

1bit表示1位
1Byte表示一个字节

1B=8b
1024B=1KB
1024KB=1M
1024M=1G

------

那有人会问：电脑的32位和64位的区别是什么呢？

- 32位操作系统只可以使用32位的cpu，而64位的CPU既可以安装32位操作系统也可以安装64位操作 系统。

- 寻址能力简单点说就是支持的内存大小能力，64位系统最多可以支达128 GB的内存，而32位系统最 多只可以支持4G内存。

- 32位操作系统只可以安装使用32位架构设计的软件，而64位的CPU既可以安装使用32位软件也可以 安装使用64位软件。

- 现在的电脑都是64位了！

回到正题，我们了解了这些知识后，我们自己定义一些变量来看！

```java
public static void main(String[] args) {
    //整型
    int i1=100;
    //长整型
    long i2=998877665544332211L;
    //短整型
    short i3=235;
    //浮点型
    double d1=3.5; //双精度
    double d2=3;
    float f1=(float)3.5; //单精度
    float f2=3.5f; //单精度
    //布尔类型 boolean true真/false假
    boolean isPass=true;
    boolean isOk=false;
    boolean isBig=5>8;
    if(isPass){
    System.out.println("通过了");
    }else{
    System.out.println("未通过");
    }
    //单字符
    char f='女';
    char m='男';
}
```

Java语言的整型常数默认为int型，浮点数默认是Double

### 3、整型拓展

在我们计算机中存在很多进制问题，十进制，八进制，十六进制等等的问题，他们怎么表示呢？

- 十进制整数，如：99, -500, 0。 

- 八进制整数，要求以 0 开头，如：015。 

- 十六进制数，要求 0x 或 0X 开头，如：0x15 。

演示：

```java
//整型
int i= 10;
int i2= 010;
int i3= 0x10;
System.out.println(i); //10
System.out.println(i2); //8
System.out.println(i3); //16
```

### 4、浮点型拓展

【金融面试问：银行金融业务用什么类型表示？】

浮点类型float, double的数据不适合在不容许舍入误差的金融计算领域。 

如果需要进行不产生舍入误差的精确数字计算，需要使用BigDecimal类。

```java
public static void main(String[] args) {
    float f = 0.1f;
    double d = 1.0/10;
    System.out.println(f==d); //false
    
    float d1 = 2131231231f;
    float d2 = d1+1;
    if(d1==d2){
        System.out.println("d1==d2");
    }else{
        System.out.println("d1!=d2");
    }
}
```

最后运行结果：

>false
>d1==d2

**主要理由：**

由于字长有限，浮点数能够精确表示的数是有限的，因而也是离散的。浮点数一般都存在舍入误差，很 多数字无法精确表示，其结果只能是接近，但不等于；二进制浮点数不能精确的表示0.1,0.01,0.001这样10的负次幂。并不是所有的小数都能可以精确的用二进制浮点数表示。

大数值：Java.math下面的两个有用的类：BigInteger和BigDecimal，这两个类可以处理任意长度的数 值。BigInteger实现了任意精度的整数运算。BigDecimal实现了任意精度的浮点运算。

**浮点数使用总结：**

1. 默认是double
2. 浮点数存在舍入误差，很多数字不能精确表示。如果需要进行不产生舍入误差的精确数字计算，需 要使用BigDecimal类。
3. 避免比较中使用浮点数

### 5、字符型拓展

单引号用来表示字符常量。例如‘A’是一个字符，它与“A”是不同的，“A”表示一个字符串。

 char 类型用来表示在Unicode编码表中的字符。

Unicode编码被设计用来处理各种语言的所有文字，它占2个字节，可允许有65536个字符；

科普：2字节=16位，2的16次方=65536，我们用的Excel原来就只有这么多行，并不是无限的

【代码演示：字符转int看结果】

```java
public static void main(String[] args) {
    char c1 = 'a';
    char c2 = '中';
    System.out.println(c1);
    System.out.println((int) c1); //97
    System.out.println(c2);
    System.out.println((int) c2); //20013
}
```

Unicode具有从0到65535之间的编码，他们通常用从’u0000’到’uFFFF’之间的十六进制值来表示（前缀为 u表示Unicode）

```java
char c3 = '\u0061';
System.out.println(c3); //a
```

Java 语言中还允许使用转义字符 ‘’ 来将其后的字符转变为其它的含义，有如下常用转义字符：

![image-20210326234124183](https://gitlab.com/apzs/image/-/raw/master/image/image-20210326234124183.png)

【以后我们学的String类，其实是字符序列(char sequence)。在这里给大家一个思考题】

```java
//代码1
String sa=new String("Hello world");
String sb=new String("Hello world");
System.out.println(sa==sb); // false
//代码2
String sc="Hello world";
String sd="Hello world";
System.out.println(sc==sd); // true
```

大家可以先思考下为什么，之后我们学到对象的时候，会给大家进行内存级别的分析，那时候你会恍然 大悟！

### 6、布尔型拓展

boolean类型（一位，不是一个字节），就是0|1 

boolean类型有两个值，true和false,不可以 0 或非 0 的整数替代 true 和 false ，这点和C语言不同。 

boolean 类型用来判断逻辑条件，一般用于程序流程控制。

```java
boolean flag = false;
if(flag){
    // true分支
}else{
    // false分支
}
```

【编码规范：很多新手程序员喜欢这样写】

```java
if (is == true && un == false ) {...}
```

只有新手才那么写。对于一个熟练的人来说，应该用如下方式来表示：

```java
if ( is && !un ) {....}
```

前面加个 ! 表示否定

这点都不难理解吧。所以要习惯去掉所有的==fasle 和 ==true。Less is More！！ 代码要精简易读！


## 类型转换

由于Java是强类型语言，所以要进行有些运算的时候的，需要用到类型转换。

整型、实型（常量）、字符型数据可以混合运算。

运算中，不同类型的数据先转化为同一类型，然后进行运算。

转换从低级到高级（根据容量来看）。

> 低 ------------------------------------> 高
>
> byte,short,char—> int —> long—> float —> double

数据类型转换必须满足如下规则：

- 不能对boolean类型进行类型转换。

- 不能把对象类型转换成不相关类的对象。

- 在把容量大的类型转换为容量小的类型时必须使用强制类型转换。

- 转换过程中可能导致溢出或损失精度，例如：

  ```java
  int i = 128;
  byte b = (byte)i;
  ```

  因为 byte 类型是 8 位，最大值为127，所以当 int 强制转换为 byte 类型时，值 128 时候就会导致溢出。

  推荐文章：[细谈为什么单字节的整数范围是[-128 ~ 127]](https://blog.csdn.net/lirui1212/article/details/114950520)

浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入，例如：

> (int)23.7 == 23;
> (int)-45.89f == -45

### 1、自动类型转换

自动类型转换：容量小的数据类型可以自动转换为容量大的数据类型。

例如: short数据类型的位数为16位，就可以自动转换位数为32的int类型，同样float数据类型的位数为 32，可以自动转换为64位的double类型。

```java
public static void main(String[] args) {
    char c1 = 'a';//定义一个char类型
    int i1 = c1;//char自动类型转换为int
    System.out.println("char自动类型转换为int后的值等于" + i1);
    char c2 = 'A';//定义一个char类型
    int i2 = c2 + 1;//char 类型和 int 类型计算
    System.out.println("char类型和int计算后的值等于" + i2);
}
```

解析：c1 的值为字符 a ,查 ASCII 码表可知对应的 int 类型值为 97，所以i1=97。 A 对应值为 65，所以 i2=65+1=66。

### 2、强制类型转换

强制类型转换，又被称为造型，用于显式的转换一个数值的类型。

在有可能丢失信息的情况下进行的转换是通过造型来完成的，但可能造成精度降低或溢出。

强制类型转换的语法格式：` (type)var` ，运算符 “()” 中的 type 表示将值var想要转换成的目标数据类型。 条件是转换的数据类型必须是兼容的。

```java
public static void main(String[] args) {
    double x = 3.14;
    int nx = (int) x; //值为3
    char c = 'a';
    int d = c + 1;
    System.out.println(d); //98
    System.out.println((char) d); //b
}
```

当将一种类型强制转换成另一种类型，而又超出了目标类型的表示范围，就会被截断成为一个完全不同 的值，溢出。

```java
public static void main(String[] args) {
    int x = 300;
    byte bx = (byte)x; //值为44
    System.out.println(bx);
}
```

### 3、常见错误和问题

- 操作比较大的数时，要留意是否溢出，尤其是整数操作时；

  ```java
  public static void main(String[] args) {
      int money = 1000000000; //10亿
      int years = 20;
      int total = money * years; //返回的是负数
      long total1 = money * years; //返回的仍然是负数。默认是int，因此结果会转成int值，再转成long。但是已经发生了数据丢失
      long total2 = money * ((long) years); //先将一个因子变成long，整个表达式发生提升。全部用long来计算。
      System.out.println(total); //-1474836480
      System.out.println(total1); //-1474836480
      System.out.println(total2); //20000000000
  }
  ```

- L和l 的问题：

  - 不要命名名字为l的变量

  - long类型使用大写L不要用小写。

    ```java
    public static void main(String[] args) {
        int l = 2;
        long a = 23451l;
        System.out.println(l + 1); //3
        System.out.println(a); //23451
    }
    ```

### 4、JDK7扩展

JDK7新特性: **二进制整数**

由于我们在开发中也经常使用二进制整数，因此JDK7为我们直接提供了二进制整数的类型。

我们只要以：0b开头即可。

```java
int a = 0b0101;
```

JDK7新特性：**下划线分隔符**

在实际开发和学习中，如果遇到特别长的数字，读懂它令人头疼！JDK7为我们提供了下划线分隔符，可 以按照自己的习惯进行分割。

```java
int b = 1_2234_5678;
```

我们很容易就知道这是1亿2234万5678啦！ 非常符合国人的习惯！

```java
public static void main(String[] args) {
    int a = 0b0101;
    int b = 1_2345_7893;
    System.out.println(a); //5
    System.out.println(b); //123457893
}
```



## 变量，常量

### 1、变量（variable）

变量是什么：就是可以变化的量！

我们通过变量来操纵存储空间中的数据，变量就是指代这个存储空间！空间位置是确定的，但是里面放 置什么值不确定！ 打个比方：

这就好像我们家里有一个大衣柜，里面有十分多的小格子，我们给格子上贴上标签，放衣服，放鞋子， 放手表等等，此时我们知道了哪里该放什么，但是，我们并不知道里面到底放的是什么牌子的鞋子，是 衣服还是裤子。那个标签就相当于我们的变量，我们给他起了个名字，但是里面要放什么需要我们自己 去放。

Java是一种强类型语言，每个变量都必须声明其类型。

Java变量是程序中最基本的存储单元，其要素包括变量名，变量类型和作用域。

变量在使用前必须对其声明, 只有在变量声明以后，才能为其分配相应长度的存储单元，声明格式为：

>数据类型 变量名 = 值；
>
>可以使用逗号隔开来声明多个同类型变量。

注意事项：

- 每个变量都有类型，类型可以是基本类型，也可以是引用类型。
- 变量名必须是合法的标识符。
- 变量声明是一条完整的语句，因此每一个声明都必须以分号结束

【演示】

```java
int a, b, c; // 声明三个int型整数：a、 b、c
int d = 3, e = 4, f = 5; // 声明三个整数并赋予初值
byte z = 22; // 声明并初始化 z
String s = "runoob"; // 声明并初始化字符串 s
double pi = 3.14159; // 声明了双精度浮点型变量 pi
char x = 'x'; // 声明变量 x 的值是字符 'x'。
```

【编码规范】

虽然可以在一行声明多个变量，但是不提倡这个风格，逐一声明每一个变量可以提高程序可读性。

### 2、变量作用域

变量根据作用域可划分为三种：

- 类变量（静态变量： static variable）：独立于方法之外的变量，用 static 修饰。
- 实例变量（成员变量：member variable）：独立于方法之外的变量，不过没有 static 修饰。
- 局部变量（lacal variable）：类的方法中的变量。

```java
public class Variable{
    static int allClicks = 0; // 类变量
    String str = "hello world"; // 实例变量
    
    public void method(){
        int i =0; // 局部变量
    }
}
```

#### 局部变量

方法或语句块内部定义的变量。生命周期是从声明位置开始到 ”}” 为止

在使用前必须先声明和初始化(赋初值)。

局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用。

```java
public static void main(String[] args) {
    int i;
    int j = i + 5; // 编译出错，变量i还未被初始化
    System.out.println(j);
}
```

修改为：

```java
public static void main(String[] args) {
    int i=10;
    int j = i+5 ;
    System.out.println(j);
}
```

#### 实例变量

方法外部、类的内部定义的变量。

从属于对象，生命周期伴随对象始终。

如果不自行初始化，他会自动初始化成该类型的默认初始值

（数值型变量初始化成0或0.0，字符型变量的初始化值是16位的0，布尔型默认是false）

```java
public class Test {
    // 这个实例变量对子类可见
    public String name;
    // 私有变量，仅在该类可见
    private double salary;
}
```

#### 静态变量

使用static定义。

从属于类，生命周期伴随类始终，从类加载到卸载。

(注：讲完内存分析后我们再深入！先放一放这个概念！)

> 不同的类之间需要对同一个变量进行操作，比如一个水池，同时打开入水口和出水口，进水和出水这两个动作会同时影响到池中的水量，此时池中的水量就可以认为是一个共享的变量。该变量就是静态变量
>
> 静态简单的说是 被类的所有对象共享，比如有一个类，有学校，姓名，年龄三个参数，调用就需要给这三个赋上值，假如这些人都是一个学校的，每次调用都需要赋值就太重复，加上静态的话，一个赋值了，每次调用则都是那个值

如果不自行初始化，他会自动初始化成该类型的默认初始值

（数值型变量初始化成0或0.0，字符型变量的初始化值是16位的0，布尔型默认是false）

```java
public class Employee {
    //salary是静态的私有变量
    private static double salary;
    // DEPARTMENT是一个常量
    public static final String DEPARTMENT = "开发人员";
    public static void main(String[] args){
        salary = 10000;
        System.out.println(DEPARTMENT+"平均工资:"+salary);
    }
}
```

### 3、常量

常量(Constant)：初始化(initialize)后不能再改变值！不会变动的值。

所谓常量可以理解成一种特殊的变量，它的值被设定后，在程序运行过程中不允许被改变。

```java
final 常量名=值;
final double PI=3.14;
final String LOVE="hello";
```

常量名一般使用大写字符。 

程序中使用常量可以提高代码的可维护性。例如，在项目开发时，我们需要指定用户的性别，此时可以 定义一个常量 SEX，赋值为 "男"，在需要指定用户性别的地方直接调用此常量即可，避免了由于用户的 不规范赋值导致程序出错的情况。

### 4、变量的命名规范

1. 所有变量、方法、类名：见名知意 
2. 类成员变量：首字母小写和驼峰原则 : monthSalary
3. 局部变量：首字母小写和驼峰原则 
4. 常量：大写字母和下划线：MAX_VALUE 
5. 类名：首字母大写和驼峰原则: Man, GoodMan 
6. 方法名：首字母小写和驼峰原则: run(), runRun()

具体可参考《阿里巴巴Java开发手册》


## 运算符

运算符operator

Java 语言支持如下运算符：

- 算术运算符  +，-，*，/，%，++，--
- 赋值运算符 =
- 关系运算符  >，<，>=，<=，==，!= instanceof
- 逻辑运算符 &&，||，!
- 位运算符  &，|，^，~ ， >>，<<，>>> (了解！！！)
- 条件运算符 ？：
- 扩展赋值运算符  +=，-=，*=，/=

### 1、二元运算符

两个操作数，来看看我们小时候的数学运算；

```java
public static void main(String[] args) {
    int a = 10;
    int b = 20;
    int c = 25;
    int d = 25;
    System.out.println("a + b = " + (a + b) );
    System.out.println("a - b = " + (a - b) );
    System.out.println("a * b = " + (a * b) );
    System.out.println("b / a = " + (b / a) );
}
```

**整数运算**

如果两个操作数有一个为Long, 则结果也为long

没有long时，结果为int。即使操作数全为shot,byte，结果也是int.

```java
public static void main(String[] args) {
    long a = 1231321311231231L;
    int b = 1213;
    short c = 10;
    byte d = 8;

    System.out.println(a + b + c + d); //Long类型
    System.out.println(b + c + d);//Int类型
    System.out.println(c + d);//Int类型
}
```

**浮点运算**

如果两个操作数有一个为double, 则结果为double

只有两个操作数都是float, 则结果才为float

```java
public static void main(String[] args) {
    float a = 3.14565F;
    double b = 3.194546464;
    float c = 1.3123123F;
    System.out.println(a+b); //double类型
    System.out.println(b+c); //double类型
    System.out.println(a+c); //float类型
}
```

**关系运算符**

返回布尔值！

![image-20210327143549464](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327143549464.png)

可参考 [菜鸟教程](https://www.runoob.com/java/java-operators.html)

### 2、取模运算

就是我们小学的取余； 

> 5%3 余 2

其操作数可以为浮点数,一般使用整数。如：5.9%3.9=2.000000004

**要点**：

负数%负数＝负数； 

负数%正数＝负数； 

正数%负数＝正数；

```java
public static void main(String[] args) {
    System.out.println(9 % 4); //1
    System.out.println(-9 % -4); //-1
    System.out.println(-10 % 4); //-2
    System.out.println(9 % -4); //1
}
```

【注：一般都是正整数运算，进行结果的判断！】

### 3、一元运算符

自增（++）自减（--）运算符是一种特殊的算术运算符，在算术运算符中需要两个操作数来进行运算， 而自增自减运算符是一个操作数，分为前缀和后缀两种。

```java
public static void main(String[] args) {
    int a = 3;
    int b = a++; //执行完后,b=3。先给b赋值，再自增。
    int c = ++a; //执行完后,c=5。先自增,再给b赋值
}
```

注意：java中的乘幂处理

```java
public static void main(String[] args) {
    int a = 3^2; //java中不能这么处理， ^是异或符号。
    double b = Math.pow(3, 2);
}
```

Math类提供了很多科学和工程计算需要的方法和常数。特殊的运算都需要运用到方法!

### 4、逻辑运算符

逻辑与：&&和&
逻辑或：||和|
逻辑非：！

![image-20210327144148985](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327144148985.png)

【演示】

```java
public static void main(String[] args) {
    boolean a = true;
    boolean b = false;
    System.out.println("a && b = " + (a&&b));
    System.out.println("a || b = " + (a||b) );
    System.out.println("!(a && b) = " + !(a && b));
}
```

**逻辑与** 和 **逻辑或** 采用短路的方式。从左到右计算，如果确定值则不会再计算下去。在两个操作数都为 true时，结果才为true，但是当得到第一个操作为false时，其结果就必定是false，这时候就不会再判断 第二个操作了。

逻辑与只要有一个为false, 则直接返回false.

逻辑或只要有一个为true, 则直接返回true;

```java
public static void main(String[] args){
    int a = 5;//定义一个变量；
    boolean b = (a<4)&&(a++<10);
    System.out.println("使用短路逻辑运算符的结果为"+b);
    System.out.println("a的结果为"+a);
}
```

解析： 该程序使用到了短路逻辑运算符(&&)，首先判断 a<4 的结果为 false，则 b 的结果必定是 false， 所以不再执行第二个操作 a++<10 的判断，所以 a 的值为 5。

### 5、位运算符

Java定义了位运算符，应用于整数类型(int)，长整型(long)，短整型(short)，字符型(char)，和字节型 (byte)等类型。位运算符作用在所有的位上，并且按位运算。

假设a = 60，b = 13;它们的二进制格式表示将如下：

```
A = 0011 1100
B = 0000 1101
-----------------
A&B = 0000 1100
A | B = 0011 1101
A ^ B = 0011 0001
~A= 1100 0011
```

![image-20210327144737549](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327144737549.png)

右移一位相当于除2取商。

左移一位相当于乘2。

【常见面试题：int a=2*8怎样运算效率最快？】

```java
public static void main(String[] args) {
    System.out.println(2 << 3);
}
```

用移位运算 int a=2<<3; 
a就是2乘以8 最后结果是16 这是最省内存 最有效率的方法

这个方法确实高效率的。我来解释一下： 
2的二进制是10 在32位存储器里面是0000 0000 0000 0010 
左移三位后变成 0000 0000 0001 0000 也就是16

解释一下，在系统中运算是以二进制的形式进行的。相比来说俩个二进制数相乘运算比移位运算慢一 些。

位操作是程序设计中对位模式按位或二进制数的一元和二元操作。 在许多古老的微处理器上， 位运算比加减运算略快， 通常位运算比乘除法运算要快很多。 在现代架构中， 情况并非如此：位运算的运算速度 通常与加法运算相同(仍然快于乘法运算). 详细的需要了解计算机的组成原理！

### 6、扩展运算符

![image-20210327150556669](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327150556669.png)

```java
public static void main(String[] args) {
    int a=10;
    int b=20;
    
    a+=b; // a = a + b
    
    System.out.println(a+":"+b);
}
```

### 7、字符串连接符

“+” 运算符两侧的操作数中只要有一个是字符串(String)类型，系统会自动将另一个操作数转换为字符串 然后再进行连接。

```java
//字符串
String s1="Hello 中文!";
String s2=1+""; //转换成String
//int
int c = 12;
System.out.println("c=" + c);
```

### 8、三目条件运算符

三目条件运算符，语法格式：

> x ? y : z

其中x为boolean类型表达式，先计算x的值，若为true，则整个三目运算的结果为表达式y的值，否则整个运算结果为表达式z的值。

【演示】

```java
public static void main(String[] args) {
    int score = 80;
    String type = score < 60 ? "不及格" : "及格";
    System.out.println("type= " + type);
}
```

三元运算符在真实开发中十分的常见，大家可以多练习使用，之后我们会讲解分支语句，可以利用三元运算符做到更加精简代码！便于理解！

### 9、运算符优先级

我们小学都学过：先加减，后乘除，所以优先级我们并不陌生。

当多个运算符出现在一个表达式中，谁先谁后呢？这就涉及到运算符的优先级别的问题。在一个多运算符的表达式中，运算符优先级不同会导致最后得出的结果差别甚大。

下表中具有最高优先级的运算符在的表的最上面，最低优先级的在表的底部。

| 类别     | 操作符                                     | 关联性   |
| :------- | :----------------------------------------- | :------- |
| 后缀     | () [] . (点操作符)                         | 左到右   |
| 一元     | expr++ expr--                              | 从左到右 |
| 一元     | ++expr --expr + - ～ ！                    | 从右到左 |
| 乘性     | * /％                                      | 左到右   |
| 加性     | + -                                        | 左到右   |
| 移位     | >> >>>  <<                                 | 左到右   |
| 关系     | > >= < <=                                  | 左到右   |
| 相等     | == !=                                      | 左到右   |
| 按位与   | ＆                                         | 左到右   |
| 按位异或 | ^                                          | 左到右   |
| 按位或   | \|                                         | 左到右   |
| 逻辑与   | &&                                         | 左到右   |
| 逻辑或   | \| \|                                      | 左到右   |
| 条件     | ？：                                       | 从右到左 |
| 赋值     | = + = - = * = / =％= >> = << =＆= ^ = \| = | 从右到左 |
| 逗号     | ，                                         | 左到右   |

大家不需要去刻意的记住，表达式里面优先使用小括号来组织！！方便理解和使用，不建议写非常冗余 的代码运算！

```java
public static void main(String[] args) {
    boolean flag = 1<4*5&&122>3||'q'+3<5;
    System.out.println(flag);
}
```


# 包机制

## 1、问题发现

存在这样一个问题：当定义了多个类的时候，可能会发生类名的重复问题。

解决方式：在java中采用包机制处理开发者定义的类名冲突问题。

就好比我们平时的用电脑，一个文件夹下不能存在同名的文件，我们要是有这样的需求，但是又不想换 名字，我们就可以考虑使用新建一个文件夹来存放！在我们的Java中也是这样的。

我们在idea中创建包，输入代码后，第一行idea默认会有：package 包名路径，例如

![image-20210327152247746](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327152247746.png)

![image-20210327152310010](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327152310010.png)

就要求此份java文件必须保存在这样一个目录下，这样Java解释器才能找到它。 在IDEA中能正确运行， 你可以去Windows下的工程中查看，HelloWorld这个文件必是在这样的目录结构下的。

3-6行是文档注释，便于把java文件打包成文档自动生成文件信息，以后会遇到，在阿里巴巴开发手册中，要求添加@author的注释信息 ，可以下载个阿里巴巴开发手册插件配置在ide里

## 2、包的作用

为了更好地组织类，Java 提供了包机制，用于区别类名的命名空间。

**包的作用：**

1、把功能相似或相关的类或接口组织在同一个包中，方便类的查找和使用。

2、如同文件夹一样，包也采用了树形目录的存储方式。同一个包中的类名字是不同的，不同的包中的类的名字是可以相同的，当同时调用两个不同包中相同类名的类时，应该加上包名加以区别。因此，包可以避免名字冲突。

3、包也限定了访问权限，拥有包访问权限的类才能访问某个包中的类。

Java 使用包（package）这种机制是为了防止命名冲突，访问控制，提供搜索和定位类（class）、接口、枚举（enumerations）和注释（annotation）等。

包语句的语法格式为：

```java
package pkg1[．pkg2[．pkg3…]];
```

例如,一个Something.java 文件它的内容:

```java
package net.java.util;
public class Something{
...
}
```

那么它的路径应该是 net/java/util/Something.java 这样保存的。

package(包) 的作用是把不同的 java 程序分类保存，更方便的被其他 java 程序调用。

一个包（package）可以定义为一组相互联系的类型（类、接口、枚举和注释），为这些类型提供访问 保护和命名空间管理的功能。

以下是一些 Java 中的包：

- java.lang-打包基础的类
- java.io-包含输入输出功能的函数

开发者可以自己把一组类和接口等打包，并定义自己的包。而且在实际开发中这样做是值得提倡的，当你自己完成类的实现之后，将相关的类分组，可以让其他的编程者更容易地确定哪些类、接口、枚举和 注释等是相关的。

由于包创建了新的命名空间（namespace），所以不会跟其他包中的任何名字产生命名冲突。使用包这 种机制，更容易实现访问控制，并且让定位相关类更加简单。

## 3、创建包

创建包的时候，你需要为这个包取一个合适的名字。之后，如果其他的一个源文件包含了这个包提供的类、接口、枚举或者注释类型的时候，都必须将这个包的声明放在这个源文件的开头。

包声明应该在源文件的第一行，每个源文件只能有一个包声明，这个文件中的每个类型都应用于它。

如果一个源文件中没有使用包声明，那么其中的类，函数，枚举，注释等将被放在一个无名的包 （unnamed package）中。

一般利用公司域名倒置作为报名；

例子：

www.baidu.com 包名：com.baidu.www

bbs.baidu.com 包名：com.baidu.bbs

我们平时也可以按照自己的公司域名去写，比如：com.kuangstudy.utils

## 4、import 关键字

为了能够使用某一个包的成员，我们需要在 Java 程序中明确导入该包。使用 "import" 语句可完成此功能。

在 java 源文件中 import 语句应位于 package 语句之后，所有类的定义之前，可以没有，也可以有多条，其语法格式为：

```java
import package1[.package2…].(classname|*);
```

如果在一个包中，一个类想要使用本包中的另一个类，那么该包名可以省略。

要是要用到其他包下的类，就必须要先导包！

如果两个类重名，需要导入对应的包，否则就需要写出完整地址：

```java
com.kuang.dao.Hello hello = new com.kuang.dao.Hello()
```

用 **import** 关键字引入，使用通配符 "*" , 导入io包下的所有类！

```java
import java.io.*;
```

【不建议这样使用，因为会全局扫描，影响速度！】

使用 **import** 关键字引入指定类:

```java
import com.kuang.Hello;
```

【注意】类文件中可以包含任意数量的 import 声明。import 声明必须在包声明之后，类声明之前。

【编码规范：推荐参考阿里巴巴开发手册编程规范】

## JavaDoc

### 1、简介

JavaDoc是一种将注释生成HTML文档的技术，生成的HTML文档类似于Java的API，易读且清晰明了。 在简略介绍JavaDoc写法之后，再看一下在Intellij Idea 中如何将代码中的注释生成HTML文档。

 javadoc是Sun公司提供的一个技术，它从程序源代码中抽取类、方法、成员等注释形成一个和源代码配 套的API帮助文档。也就是说，只要在编写程序时以一套特定的标签作注释，在程序编写完成后，通过 Javadoc就可以同时形成程序的开发文档了。javadoc命令是用来生成自己API文档的，使用方式：使用 命令行在目标文件所在目录输入javadoc +文件名.java。

先看一段样例代码：

```java
/**
 * 这是一个Javadoc测试程序
 *
 * @author Kuangshen
 * @version 1.0
 * @since 1.5
 */
public class HelloWorld {
    public String name;

    /**
     * @param name 姓名
     * @return 返回name姓名
     * @throws Exception 无异常抛出
     */
    public String function(String name) throws Exception {
        return name;
    }

}
```

解释一下：
以 /* 开始，以 / 结束。
@author 作者名
@version 版本号
@since 指明需要最早使用的jdk版本
@param 参数名
@return 返回值情况
@throws 异常抛出情况

### 2、命令行生成Doc

打开cmd

切换到文件当前目录  `cd /d E:\java\study\package\test`

输入指令： javadoc HelloWorld.java

一般会加上`-encoding UTF-8 -charset UTF-8 ` 解决GBK乱码问题，在中间添加编码设置

```
javadoc -encoding UTF-8 -charset UTF-8 HelloWorld.java
```

![image-20210327210911496](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327210911496.png)

之后会多出一堆文件，打开index.html查看


# JavaSE-流程控制

## 用户交互Scanner

### 1、Scanner对象

之前我们学的基本语法中我们并没有实现程序和人的交互，但是Java给我们提供了这样一个工具类，我 们可以获取用户的输入。java.util.Scanner 是 Java5 的新特征，我们可以通过 Scanner 类来获取用户的输入。

下面是创建 Scanner 对象的基本语法：

```java
Scanner s = new Scanner(System.in);
```

接下来我们演示一个最简单的数据输入，并通过 Scanner 类的 next() 与 nextLine() 方法获取输入的字符串，在读取前我们一般需要 使用 hasNext() 与 hasNextLine() 判断是否还有输入的数据。

### 2、next & nextLine

```java
public static void main(String[] args) {
    //创建一个扫描器对象，用于接收键盘数据
    Scanner scanner = new Scanner(System.in);
    //next方式接收字符串
    System.out.println("Next方式接收:");
    //判断用户还有没有输入字符
    if (scanner.hasNext()) {
        String str = scanner.next();
        System.out.println("输入内容：" + str);
    }
    //凡是属于IO流的类如果不关闭会一直占用资源.要养成好习惯用完就关掉.就好像你接水完了要关水龙头一样.很多下载软件或者视频软件如果你不彻底关, 都会自己上传下载从而占用资源, 你就会觉得卡, 这一个道理.
    scanner.close();
}
```

测试数据：Hello World！ 

结果：只输出了Hello。 

接下来我们使用另一个方法来接收数据：nextLine()

```java
public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    // 从键盘接收数据
    // nextLine方式接收字符串
    System.out.println("nextLine方式接收：");
    // 判断是否还有输入
    if (scan.hasNextLine()) {
        String str2 = scan.nextLine();
        System.out.println("输入内容：" + str2);
    }
    scan.close();
}
```

测试数据：Hello World！ 

结果：输出了Hello World！

**两者区别：**

next():

- 一定要读取到有效字符后才可以结束输入。 
- 对输入有效字符之前遇到的空白，next() 方法会自动将其去掉。 
- 只有输入有效字符后才将其后面输入的空白作为分隔符或者结束符。 
- next() 不能得到带有空格的字符串。

nextLine()：

- 以Enter为结束符,也就是说 nextLine()方法返回的是输入回车之前的所有字符。
- 可以获得空白。

### 3、其他方法

如果要输入 int 或 float 类型的数据，在 Scanner 类中也有支持，但是在输入之前最好先使用 hasNextXxx() 方法进行验证，再使用 nextXxx() 来读取：

```java
public static void main(String[] args) {
    Scanner scan = new Scanner(System.in);
    // 从键盘接收数据
    int i = 0;
    float f = 0.0f;
    System.out.print("输入整数：");
    if (scan.hasNextInt()) {
        // 判断输入的是否是整数
        i = scan.nextInt();
        // 接收整数
        System.out.println("整数数据：" + i);
    } else {
        // 输入错误的信息
        System.out.println("输入的不是整数！");
    }
    System.out.print("输入小数：");
    if (scan.hasNextFloat()) {
        // 判断输入的是否是小数
        f = scan.nextFloat();
        // 接收小数
        System.out.println("小数数据：" + f);
    } else {
        // 输入错误的信息
        System.out.println("输入的不是小数！");
    }
    scan.close();
}
```

具体Scanner类都有什么方法，可查看其中的源码，`ctrl`+`鼠标左键` 点中idea中的Scanner

以下实例我们可以输入多个数字，并求其总和与平均数，每输入一个数字用回车确认，通过输入非数字来结束输入，并输出执行结果：

```java
public static void main(String[] args) {
    //扫描器接收键盘数据
    Scanner scan = new Scanner(System.in);
    double sum = 0; //和
    int m = 0; //输入了多少个数字
    //通过循环判断是否还有输入，并在里面对每一次进行求和和统计
    while (scan.hasNextDouble()) {
        double x = scan.nextDouble();
        m = m + 1;
        sum = sum + x;
    }
    System.out.println(m + "个数的和为" + sum);
    System.out.println(m + "个数的平均值是" + (sum / m));
    scan.close();
}
```

可能很多小伙伴到这里就看不懂写的什么东西了！这里我们使用了我们一会要学的流程控制语句，我们 接下来就去学习这些语句的具体作用！

Java中的流程控制语句可以这样分类：顺序结构，选择结构，循环结构！这三种结构就足够解决所有的 问题了！

## 顺序结构

JAVA的基本结构就是顺序结构，除非特别指明，否则就按照顺序一句一句执行。

顺序结构是最简单的算法结构。

![image-20210327214132289](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327214132289.png)

语句与语句之间，框与框之间是按从上到下的顺序进行的，它是由若干个依次执行的处理步骤组成的， 它是任何一个算法都离不开的一种基本算法结构。

顺序结构在程序流程图中的体现就是用流程线将程序框自上而地连接起来，按顺序执行算法步骤。

```java
public static void main(String[] args) {
    System.out.println("Hello1");
    System.out.println("Hello2");
    System.out.println("Hello3");
    System.out.println("Hello4");
    System.out.println("Hello5");
}
//按照自上而下的顺序执行！依次输出。
```

## 选择结构

### 1、if单选择结构

我们很多时候需要去判断一个东西是否可行，然后我们才去执行，这样一个过程在程序中用if语句来表 示：

![image-20210327214322066](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327214322066.png)

```java
if(布尔表达式){
    //如果布尔表达式为true将执行的语句
}
```

意义：if语句对条件表达式进行一次测试，若测试为真，则执行下面的语句，否则跳过该语句。

【演示】比如我们来接收一个用户输入，判断输入的是否为Hello字符串：

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    //接收用户输入
    System.out.print("请输入内容：");
    String s = scanner.nextLine();
    
    if (s.equals("Hello")){
        System.out.println("输入的是："+s);
    }
    
    System.out.println("End");
    scanner.close();
}
```

equals方法是用来进行字符串的比较的，之后会详解，这里大家只需要知道他是用来比较字符串是否 一致的即可！和==是有区别的。

### 2、if双选择结构

那现在有个需求，公司要收购一个软件，成功了，给人支付100万元，失败了，自己找人开发。这样的 需求用一个if就搞不定了，我们需要有两个判断，需要一个双选择结构，所以就有了if-else结构。

![image-20210327214623634](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327214623634.png)

```java
if(布尔表达式){
    //如果布尔表达式的值为true
    }else{
    //如果布尔表达式的值为false
}
```

意义：当条件表达式为真时，执行语句块1，否则，执行语句块2。也就是else部分。

【演示】我们来写一个示例：考试分数大于60就是及格，小于60分就不及格。

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    
    System.out.print("请输入成绩：");
    int score = scanner.nextInt();
    
    if (score>60){
        System.out.println("及格");
    }else {
        System.out.println("不及格");
    }
    
    scanner.close();
}
```

### 3、if多选择结构

我们发现上面的示例不符合实际情况，真实的情况还可能存在ABCD，存在区间多级判断。比如90-100 就是A，80-90 就是B.....，在生活中我们很多时候的选择也不仅仅只有两个，所以我们需要一个多选 择结构来处理这类问题！

![image-20210327214751941](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327214751941.png)

```java
if(布尔表达式 1){
    //如果布尔表达式 1的值为true执行代码
}else if(布尔表达式 2){
    //如果布尔表达式 2的值为true执行代码
}else if(布尔表达式 3){
    //如果布尔表达式 3的值为true执行代码
}else {
    //如果以上布尔表达式都不为true执行代码
}
```

if 语句后面可以跟 else if…else 语句，这种语句可以检测到多种可能的情况。

使用 if，else if，else 语句的时候，需要注意下面几点：

- if 语句至多有 1 个 else 语句，else 语句在所有的 else if 语句之后。
- if 语句可以有若干个 else if 语句，它们必须在 else 语句之前。
- 一旦其中一个 else if 语句检测为 true，其他的 else if 以及 else 语句都将跳过执行。

【演示】我们来改造一下上面的成绩案例，学校根据分数区间分为ABCD四个等级！

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    
    System.out.print("请输入成绩：");
    int score = scanner.nextInt();
    
    if (score==100){
        System.out.println("恭喜满分");
    }else if (score<100 && score >=90){
        System.out.println("A级");
    }else if (score<90 && score >=80){
        System.out.println("B级");
    }else if (score<80 && score >=70){
        System.out.println("C级");
    }else if (score<70 && score >=60){
        System.out.println("D级");
    }else if (score<60 && score >=0){
        System.out.println("不及格！");
    }else {
        System.out.println("成绩输入不合法！");
    }
    scanner.close();
}
```

我们平时写程序一定要严谨，不然之后修补Bug是一件十分头疼的事情，要在编写代码的时候就把所有的问题都思考清除，再去一个个解决，这才是一个优秀的程序员应该做的事情，多思考，少犯错！

### 4、嵌套的if结构

使用嵌套的 if…else 语句是合法的。也就是说你可以在另一个 if 或者 else if 语句中使用 if 或者 else if 语 句。你可以像 if 语句一样嵌套 else if...else。

```java
if(布尔表达式 1){
    ////如果布尔表达式 1的值为true执行代码
    if(布尔表达式 2){
        ////如果布尔表达式 2的值为true执行代码
    }
}
```

有时候我们在解决某些问题的时候，需要缩小查找范围，需要有层级条件判断，提高效率。比如：我们需要寻找一个数，在1-100之间，我们不知道这个数是多少的情况下，我们最笨的方式就是一个个去对比，看他到底是多少，这会花掉你大量的时间，如果可以利用if嵌套比较，我们可以节省大量的成本，如果你有这个思想，你已经很优秀了，因为很多大量的工程师就在寻找能够快速提高，查找和搜索效率的方式。为此提出了一系列的概念，我们生活在大数据时代，我们需要不断的去思考如何提高效率，或许哪一天，你们想出一个算法，能够将分析数据效率提高，或许你就可以在历史的长河中留下一些痕迹了，当然这是后话。

【记住一点就好，所有的流程控制语句都可以互相嵌套，互不影响！】

### 5、switch多选择结构

多选择结构还有一个实现方式就是switch case 语句。

switch case 语句判断一个变量与一系列值中某个值是否相等，每个值称为一个分支。

```java
switch(expression){
    case value :
        //语句
        break; //可选
    case value :
        //语句
        break; //可选
    //你可以有任意数量的case语句
    default : //可选
        //语句
}
```

switch case 语句有如下规则：

- switch 语句中的变量类型可以是： byte、short、int 或者 char。从 Java SE 7 开始，switch 支持字符串 String 类型了，同时 case 标签必须为字符串常量或字面量。
- switch 语句可以拥有多个 case 语句。每个 case 后面跟一个要比较的值和冒号。
- case 语句中的值的数据类型必须与变量的数据类型相同，而且只能是常量或者字面常量。
- 当变量的值与 case 语句的值相等时，那么 case 语句之后的语句开始执行，直到 break 语句出现才会跳出 switch 语句。
- 当遇到 break 语句时，switch 语句终止。程序跳转到 switch 语句后面的语句执行。case 语句不必须要包含 break 语句。如果没有 break 语句出现，程序会继续执行下一条 case 语句，直到出现 break 语句。
- switch 语句可以包含一个 default 分支，该分支一般是 switch 语句的最后一个分支（可以在任何位置，但建议在最后一个）。default 在没有 case 语句的值和变量值相等的时候执行。default 分支不需要 break 语句。

switch case 执行时，一定会先进行匹配，匹配成功返回当前 case 的值，再根据是否有 break，判断是否继续输出，或是跳出判断。

```java
public static void main(String[] args) {
    char grade = 'C';
    switch (grade) {
        case 'A':
            System.out.println("优秀");
            break;
        case 'B':
            System.out.println("秀");
            break;
        case 'C':
            System.out.println("良好");
            break;
        case 'D':
            System.out.println("及格");
            break;
        case 'F':
            System.out.println("你需要再努力努力");
            break;
        default:
            System.out.println("未知等级");
    }
    System.out.println("你的等级是 " + grade);
}

```

如果 case 语句块中没有 break 语句时，匹配成功后，从当前 case 开始，后续所有 case 的值都会输 出。如果后续的 case 语句块有 break 语句则会跳出判断。

```java
public static void main(String[] args) {
    int i = 1;
    switch (i) {
        case 0:
            System.out.println("0");
        case 1:
            System.out.println("1");
        case 2:
            System.out.println("2");
        case 3:
            System.out.println("3");
            break;
        default:
            System.out.println("default");
    }
}
```

输出：1，2，3。

【JDK7增加了字符串表达式】

case 后边的可以是字符串的表达形式

```java
public static void main(String[] args) {
    String name = "你好";

    switch (name) {
        //JDK7的新特性，表达式结果可以是字符串！！！
        case "你好":
            System.out.println("你好");
            break;
        case "我好":
            System.out.println("我好");
            break;
        default:
            System.out.println("啥都不好");
            break;
    }
}
```
## 循环结构

上面选择结构中，我们始终无法让程序一直跑着，我们每次运行就停止了。我们需要规定一个程序运行多少次，运行多久，等等。所以按照我们编程是为了解决人的问题的思想，我们是不是得需要有一个结构来搞定这个事情！于是循环结构自然的诞生了！

顺序结构的程序语句只能被执行一次。如果您想要同样的操作执行多次,，就需要使用循环结构。

Java中有三种主要的循环结构：

- while 循环
- do…while 循环
- for 循环

在Java5中引入了一种主要用于数组的增强型for循环。

### 1、while 循环

while是最基本的循环，它的结构为：

```java
while( 布尔表达式 ) {
    //循环内容
}
```

![image-20210327220634511](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327220634511.png)

【图解】在循环刚开始时，会计算一次“布尔表达式”的值，若条件为真，执行循环体。而对于后来每一 次额外的循环，都会在开始前重新计算一次判断是否为真。直到条件不成立，则循环结束。

我们大多数情况是会让循环停止下来的，我们需要一个让表达式失效的方式来结束循环。

方式有：循环内部控制，外部设立标志位！等

```java
public static void main(String[] args) {
    int i = 0;
    //i小于100就会一直循环
    while (i<100){
        i++;
        System.out.println(i);
    }
}
```

少部分情况需要循环一直执行，比如服务器的请求响应监听等。

```java
public static void main(String[] args) {
    while (true){
        //等待客户端连接
        //定时检查
        //......
    }
}
```

循环条件一直为true就会造成无限循环【死循环】，我们正常的业务编程中应该尽量避免死循环。会影 响程序性能或者造成程序卡死奔溃！

【案例：计算1+2+3+…+100=?】

```java
public static void main(String[] args) {
    int i = 0;
    int sum = 0;
    while (i <= 100) {
        sum = sum+i;
        i++;
    }
    System.out.println("Sum= " + sum);
}
```

【高斯的故事】

德国大数学家高斯（Gauss）：高斯是一对普通夫妇的儿子。他的母亲是一个贫穷石匠的女儿，虽然十分聪明，但却没有接受过教育，近似于文盲。在她成为高斯父亲的第二个妻子之前，她从事女佣工作。他的父亲曾做过园丁，工头，商人的助手和一个小保险公司的评估师。当高斯三岁时便能够纠正他父亲的借债账目的事情， 已经成为一个轶事流传至今。他曾说，他在麦仙翁堆上学会计算。能够在头脑中进行复杂的计算，是上帝赐予他一生的天赋。

高斯用很短的时间计算出了小学老师布置的任务：对自然数从1到100的求和.他所使用的方法是：对50 对构造成和101的数列求和（1＋100,2＋99,3＋98……）,同时得到结果：5050.这一年,高斯9岁.

这个故事我们在高中数学中的“等差数列求和”听过，当时我们用的公式求解。

![img](https://gitlab.com/apzs/image/-/raw/master/image/5882b2b7d0a20cf4863461a066094b36acaf992d)

编程难的不是语言，是算法。数学能让你写的程序运算次数更少，效率更高。

如果求1+2+3.....+100万呢，虽然100万次的运算加法，对于计算机不算什么，但我们为了效率可以用数学公式进行求解。

有能力的同学可以看下编程程序比赛，考验算法能力的，例如：“传智杯”，“蓝桥杯”

### 2、do…while 循环

对于 while 语句而言，如果不满足条件，则不能进入循环。但有时候我们需要即使不满足条件，也至少 执行一次。

do…while 循环和 while 循环相似，不同的是，do…while 循环至少会执行一次。

```java
do {
    //代码语句
}while(布尔表达式);
```

![image-20210327222224162](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327222224162.png)

注意：布尔表达式在循环体的后面，所以语句块在检测布尔表达式之前已经执行了。 如果布尔表达式的值为 true，则语句块一直执行，直到布尔表达式的值为 false。

我们用do...while改造一下上面的案例！

```java
public static void main(String[] args) {
    int i = 0;
    int sum = 0;
    do {
        sum = sum+i;
        i++;
    }while (i <= 100);
    System.out.println("Sum= " + sum);
}
```

执行结果当然是一样的！

While和do-While的区别：

while先判断后执行。dowhile是先执行后判断！

Do...while总是保证循环体会被至少执行一次！这是他们的主要差别。

```java
public static void main(String[] args) {
    int a = 0;
    while(a<0){
        System.out.println(a);
        a++;
    }
    System.out.println("-----");
    do{
        System.out.println(a);
        a++;
    } while (a<0);
}
```

### 3、For循环

虽然所有循环结构都可以用 while 或者 do...while表示，但 Java 提供了另一种语句 —— for 循环，使一些循环结构变得更加简单。

for循环语句是支持迭代的一种通用结构，是最有效、最灵活的循环结构。

for循环执行的次数是在执行前就确定的。语法格式如下：

```java
for(初始化; 布尔表达式; 更新) {
    //代码语句
}
```

![image-20210327222651145](https://gitlab.com/apzs/image/-/raw/master/image/image-20210327222651145.png)

关于 for 循环有以下几点说明：

- 最先执行初始化步骤。可以声明一种类型，但可初始化一个或多个循环控制变量，也可以是空语句。
- 然后，检测布尔表达式的值。如果为 true，循环体被执行。如果为false，循环终止，开始执行循环体后面的语句。
- 执行一次循环后，更新循环控制变量(迭代因子控制循环变量的增减。
- 再次检测布尔表达式。循环执行上面的过程。

【演示：while和for输出】

```java
public static void main(String[] args) {
    int a = 1; //初始化
    
    while(a<=100){ //条件判断
        System.out.println(a); //循环体
        a+=2; //迭代
    }
    System.out.println("while循环结束！");
    
    for(int i = 1;i<=100;i++){ //初始化//条件判断 //迭代
        System.out.println(i); //循环体
    }
    System.out.println("while循环结束！");
}
```

我们发现，for循环在知道循环次数的情况下，简化了代码，提高了可读性。我们平时用到的最多的也是 我们的for循环！

### 4、练习

【练习1：计算0到100之间的奇数和偶数的和】

```java
public static void main(String[] args) {
    int oddSum = 0; //用来保存奇数的和
    int evenSum = 0; //用来存放偶数的和
    for (int i = 0; i <= 100; i++) {
        if (i % 2 != 0) {
            oddSum += i;
        } else {
            evenSum += i;
        }
    }
    System.out.println("奇数的和：" + oddSum);
    System.out.println("偶数的和：" + evenSum);
}
```

【练习2：用while或for循环输出1-1000之间能被5整除的数，并且每行输出3个】

```
public static void main(String[] args) {
    for (int j = 1; j <= 1000; j++) {
        if (j % 5 == 0) {
            System.out.print(j + "\t");
        }
        if (j % (5 * 3) == 0) {
            System.out.println();
        }
    }
}
```

【练习3：打印九九乘法表】

```
1*1=1
1*2=2 2*2=4
1*3=3 2*3=6 3*3=9
1*4=4 2*4=8 3*4=12 4*4=16
1*5=5 2*5=10 3*5=15 4*5=20 5*5=25
1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36
1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49
1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64
1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81
```

当然，成功的路不止一条，但是我们要追求最完美的一条，如果你做不到，不妨试试笨办法，依旧可以 完成任务！比如一行行输出，也是可以搞定的。一定要多分析！

我们使用嵌套for循环就可以很轻松解决这个问题了！

第一步：我们先打印第一列，这个大家应该都会

```java
for (int i = 1; i <= 9; i++) {
	System.out.println(1 + "*" + i + "=" + (1 * i));
}
```

第二步：我们把固定的1再用一个循环包起来

```java
for (int i = 1; i <= 9 ; i++) {
    for (int j = 1; j <= 9; j++) {
        System.out.println(i + "*" + j + "=" + (i * j));
    }
}
```

第三步：去掉重复项，j<=i

```java
for (int i = 1; i <= 9 ; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.println(j + "*" + i + "=" + (i * j));
    }
}
```

第四步：调整样式

```java
for (int i = 1; i <= 9 ; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(j + "*" + i + "=" + (i * j)+ "\t");
    }
    System.out.println();
}
```

通过本练习，大家要体会如何分析问题、如何切入问题！在我们以后写代码的过程中，一定要学会将一 个大问题分解成若干小问题，然后，由易到难，各个击破！这也是我们以后开发项目时的基本思维过程。希望大家好好体会！

### 5、增强for循环

Java5 引入了一种主要用于数组或集合的增强型 for 循环。

Java 增强 for 循环语法格式如下:

```java
for(声明语句 : 表达式)
{
    //代码句子
}
```

声明语句：声明新的局部变量，该变量的类型必须和数组元素的类型匹配。其作用域限定在循环语句 块，其值与此时数组元素的值相等。

表达式：表达式是要访问的数组名，或者是返回值为数组的方法。

【演示：增强for循环遍历输出数组元素】

```java
public static void main(String[] args) {
    
    int [] numbers = {10, 20, 30, 40, 50};
    for(int x : numbers ){
        System.out.print( x );
        System.out.print(",");
    }
    System.out.print("\n");
    
    String [] names ={"James", "Larry", "Tom", "Lacy"};
    for( String name : names ) {
        System.out.print( name );
        System.out.print(",");
    }
}
```

我们现在搞不懂这个没关系，就是拉出来和大家见一面，下章就讲解数组了！

## break & continue

### 1、break 关键字

break 主要用在循环语句或者 switch 语句中，用来跳出整个语句块。

break 跳出最里层的循环，并且继续执行该循环下面的语句。

【演示：跳出循环】

```java
public static void main(String[] args) {
    int i = 0;
    while (i < 100) {
        i++;
        System.out.println(i);
        if (i == 30) {
            break;
        }
    }
}
```

switch 语句中break在上面已经详细说明了

### 2、continue 关键字

continue 适用于任何循环控制结构中。作用是让程序立刻跳转到下一次循环的迭代。

在 for 循环中，continue 语句使程序立即跳转到更新语句。

在 while 或者 do…while 循环中，程序立即跳转到布尔表达式的判断语句。

```java
public static void main(String[] args) {
    int i = 0;
    while (i < 100) {
        i++;
        if (i % 10 == 0) {
            System.out.println();
            continue;
        }
        System.out.print(i);
    }
}
```

### 3、两者区别

break在任何循环语句的主体部分，均可用break控制循环的流程。break用于强行退出循环，不执行循环中剩余的语句。(break语句也在switch语句中使用)

continue 语句用在循环语句体中，用于终止某次循环过程，即跳过循环体中尚未执行的语句，接着进行下一次是否执行循环的判定。

### 4、带标签的continue

【了解即可】

1. goto关键字很早就在程序设计语言中出现。尽管goto仍是Java的一个保留字，但并未在语言中得到正式使用；Java没有goto。然而，在break和continue这两个关键字的身上，我们仍然能看出一些 goto的影子---带标签的break和continue。

2. “标签”是指后面跟一个冒号的标识符，例如：label:

3. 对Java来说唯一用到标签的地方是在循环语句之前。而在循环之前设置标签的唯一理由是：我们希望在其中嵌套另一个循环，由于break和continue关键字通常只中断当前循环，但若随同标签使用，它们就会中断到存在标签的地方。

4. 带标签的break和continue的例子：

   【演示：打印101-150之间所有的质数】

   ```java
   public static void main(String[] args) {
       int count = 0;
       outer: for (int i = 101; i < 150; i ++) {
           for (int j = 2; j < i / 2; j++) {
               if (i % j == 0){
                    continue outer;
               }
           }
           System.out.print(i+ " ");
       }
   }
   ```

【看不懂没关系，只是了解一下即可，知道goto这个保留字和标签的写法】


# JavaSE-方法

## 1、何谓方法？

在前面几个章节中我们经常使用到 System.out.println()，那么它是什么呢？

- println() 是一个方法。
- System 是系统类。
- out 是标准输出对象。 

这句话的用法是调用系统类 System 中的标准输出对象 out 中的方法 println()。

**那么什么是方法呢？**

Java方法是语句的集合，它们在一起执行一个功能。

- 方法是解决一类问题的步骤的有序组合
- 方法包含于类或对象中
- 方法在程序中被创建，在其他地方被引用

设计方法的原则：方法的本意是功能块，就是实现某个功能的语句块的集合。我们设计方法的时候，最 好保持方法的原子性，就是一个方法只完成1个功能，这样利于我们后期的扩展。

**方法的优点**

- 使程序变得更简短而清晰。
- 有利于程序维护。
- 可以提高程序开发的效率。
- 提高了代码的重用性。

回顾：方法的命名规则？

## 2、方法的定义

Java的方法类似于其它语言的函数，是一段用来完成特定功能的代码片段，一般情况下，定义一个方法 包含以下语法：

```
修饰符 返回值类型 方法名(参数类型 参数名){
    ...
    方法体
    ...
    return 返回值;
}
```

方法包含一个方法头和一个方法体。下面是一个方法的所有部分：

- 修饰符

  修饰符，这是可选的，告诉编译器如何调用该方法。定义了该方法的访问类型。

- 返回值类型

  方法可能会返回值。returnValueType 是方法返回值的数据类型。有些方法执行所需 的操作，但没有返回值。在这种情况下，returnValueType 是关键字void。

- 方法名

  是方法的实际名称。方法名和参数表共同构成方法签名。

- 参数类型

  参数像是一个占位符。当方法被调用时，传递值给参数。这个值被称为实参或变量。参数列表是指方法的参数类型、顺序和参数的个数。参数是可选的，方法可以不包含任何参数。

  - 形式参数：在方法被调用时用于接收外界输入的数据。
  - 实参：调用方法时实际传给方法的数据。

  ![image-20210328114438468](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328114438468.png)

- 方法体

  方法体包含具体的语句，定义该方法的功能。

比如我们写一个比大小的方法：

【演示】下面的方法包含 2 个参数 num1 和 num2，它返回这两个参数的最大值。

```java
/** 返回两个整型变量数据的较大值 */
public static int max(int num1, int num2) {
    int result;
    if (num1 > num2){
        result = num1;
    }
    else{
        result = num2;
    }
        
    return result;
}
```

【演示：加法】

```java
public int add(int num1, int num2) {
    return num1+num2;
}
```

## 3、方法调用

Java 支持两种调用方法的方式，根据方法是否返回值来选择。

当程序调用一个方法时，程序的控制权交给了被调用的方法。当被调用方法的返回语句执行或者到达方法体闭括号时候交还控制权给程序。

当方法返回一个值的时候，方法调用通常被当做一个值。例如：

```java
int larger = max(30, 40);
```

Java语言中使用下述形式调用方法：对象名.方法名(实参列表)

如果方法返回值是void，方法调用一定是一条语句。例如，方法println返回void。下面的调用是个语句：

```java
System.out.println("Hello,kuangshen!");
```

【演示：定义方法并且调用它】

```java
public static void main(String[] args) {
    int i = 5;
    int j = 2;
    int k = max(i, j);
    System.out.println( i + " 和 " + j + " 比较，最大值是：" + k);
}

/** 返回两个整数变量较大的值 */
public static int max(int num1, int num2) {
    int result;
    if (num1 > num2){
        result = num1;
    }  
    else{
        result = num2;
    }
    return result;
}
```

这个程序包含 main 方法和 max 方法。main 方法是被 JVM 调用的，除此之外，main 方法和其它方法 没什么区别。**JAVA中只有值传递！**

main 方法的头部是不变的，如例子所示，带修饰符 public 和 static,返回 void 类型值，方法名字是 main,此外带个一个 String[] 类型参数。String[] 表明参数是字符串数组。

## 4、方法的重载

上面使用的max方法仅仅适用于int型数据。但如果你想得到两个浮点类型数据的最大值呢？

解决方法是创建另一个有相同名字但参数不同的方法，如下面代码所示：

```java
public static double max(double num1, double num2) {
    if (num1 > num2)
    return num1;
    else
    return num2;
}

public static int max(int num1, int num2) {
    int result;
    if (num1 > num2)
    result = num1;
    else
    result = num2;
    return result;
}
```

如果你调用max方法时传递的是int型参数，则 int型参数的max方法就会被调用；

如果传递的是double型参数，则double类型的max方法体会被调用，这叫做方法重载；

就是说一个类的两个方法拥有相同的名字，但是有不同的参数列表。

Java编译器根据方法签名判断哪个方法应该被调用。

方法重载可以让程序更清晰易读。执行密切相关任务的方法应该使用相同的名字。

重载的方法必须拥有不同的参数列表。你不能仅仅依据修饰符或者返回类型的不同来重载方法。

## 5、拓展命令行传参

有时候你希望运行一个程序时候再传递给它消息。这要靠传递命令行参数给main()函数实现。

命令行参数是在执行程序时候紧跟在程序名字后面的信息。

【下面的程序打印所有的命令行参数】

```java
public class CommandLine {
	public static void main(String args[]){
		for(int i=0; i<args.length; i++){
			System.out.println("args[" + i + "]: " + args[i]);
		}
	}
}
```

【命令行】

```
javac CommandLine.java
java CommandLine this is a command line 200 -100
```

> args[0]: this
> args[1]: is
> args[2]: a
> args[3]: command
> args[4]: line
> args[5]: 200
> args[6]: -100

## 6、可变参数

JDK 1.5 开始，Java支持传递同类型的可变参数给一个方法。

方法的可变参数的声明如下所示：

> typeName... parameterName

在方法声明中，在指定参数类型后加一个省略号(...) 

一个方法中只能指定一个可变参数，它必须是方法的最后一个参数。任何普通的参数必须在它之前声明。

```java
public static void main(String[] args) {
    // 调用可变参数的方法
    printMax(34, 3, 3, 2, 56.5);
    printMax(new double[]{1, 2, 3});
}

public static void printMax(double... numbers) {
    if (numbers.length == 0) {
        System.out.println("No argument passed");
        return;
    }
    double result = numbers[0];
    //排序！
    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] > result) {
            result = numbers[i];
        }
    }
    System.out.println("The max value is " + result);
}
```

## 7、递归

A方法调用B方法，我们很容易理解！

递归就是：A方法调用A方法！就是自己调用自己，因此我们在设计递归算法时，一定要指明什么时候自己不调用自己。否则，就是个死循环！

**递归算法重点：**

递归是一种常见的解决问题的方法，即把问题逐渐简单化。递归的基本思想就是“自己调用自己”，一个使用递归技术的方法将会直接或者间接的调用自己。

利用递归可以用简单的程序来解决一些复杂的问题。它通常把一个大型复杂的问题层层转化为一个与原 问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计 算，大大地减少了程序的代码量。递归的能力在于用有限的语句来定义对象的无限集合。

递归结构包括两个部分：

- 递归头

  什么时候不调用自身方法。如果没有头，将陷入死循环。

-  递归体

  什么时候需要调用自身方法。

【演示：利用代码计算5的乘阶！】 

```java
//5*4*3*2*1
public static void main(String[] args) {
    System.out.println(f(5));
}
public static int f(int n) {
    if (1 == n)
    	return 1;
    else
    	return n*f(n-1);
}
```

![image-20210328140142727](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328140142727.png)

此题中，按照递归的三个条件来分析： 

(1)边界条件：阶乘，乘到最后一个数，即1的时候，返回1，程序执行到底；
(2)递归前进段：当前的参数不等于1的时候，继续调用自身； 
(3)递归返回段：从最大的数开始乘，如果当前参数是5，那么就是5* 4，即5 (5-1)，即n * (n-1)

递归其实是方便了程序员难为了机器，递归可以通过数学公式很方便的转换为程序。其优点就是易理 解，容易编程。但递归是用栈机制实现的，每深入一层，都要占去一块栈数据区域，对嵌套层数深的一 些算法，递归会力不从心，空间上会以内存崩溃而告终，而且递归也带来了大量的函数调用，这也有许 多额外的时间开销。所以在深度大时，它的时空性就不好了。（会占用大量的内存空间）

而迭代虽然效率高，运行时间只因循环次数增加而增加，没什么额外开销，空间上也没有什么增加，但 缺点就是不容易理解，编写复杂问题时困难。

能不用递归就不用递归，递归都可以用迭代来代替


# JavaSE-数组

## 数组概述

关于数组我们可以把它看作是一个类型的所有数据的一个集合，并用一个数组下标来区分或指定每一个数，例如一个足球队通常会有几十个人，但是我们来认识他们的时候首先会把他们看作是某某对的成员，然后再利用他们的号码来区分每一个队员，这时候，球队就是一个数组，而号码就是数组的下标， 当我们指明是几号队员的时候就找到了这个队员。 同样在编程中，如果我们有一组相同数据类型的数据，例如有10个数字，这时候如果我们要用变量来存放它们的话，就要分别使用10个变量，而且要记住这10个变量的名字，这会十分的麻烦，这时候我们就可以用一个数组变量来存放他们，例如在VB中我们 就可以使用dim a(9) as integer（注意：数组的下标是从0开始的，所以第10个数的话，下标就是 9，a(0)=1）。 使用数组会让程序变的简单，而且避免了定义多个变量的麻烦。

数组的定义：

- 数组是相同类型数据的有序集合
- 数组描述的是相同类型的若干个数据,按照一定的先后次序排列组合而成
- 其中,每一个数据称作一个数组元素,每个数组元素可以通过一个下标来访问它们.

**数组的四个基本特点：**

- 其长度是确定的。数组一旦被创建，它的大小就是不可以改变的。
-  其元素必须是相同类型，不允许出现混合类型。
- 数组中的元素可以是任何数据类型，包括基本类型和引用类型。
- 数组变量属引用类型，数组也可以看成是对象，数组中的每个元素相当于该对象的成员变量。数组本身就是对象，Java中对象是在堆中的，因此数组无论保存原始类型还是其他对象类型，数组对象本身是在堆中的。

## 数组声明创建

### 1、声明数组

首先必须声明数组变量，才能在程序中使用数组。下面是声明数组变量的语法：

```java
dataType[] arrayRefVar; // 首选的方法

dataType arrayRefVar[]; // 效果相同，但不是首选方法
```

建议使用 dataType[] arrayRefVar 的声明风格声明数组变量。 
dataType arrayRefVar[] 风格是来自 C/C++ 语言 ，在Java中采用是为了让 C/C++ 程序员能够快速理解java语言。

```java
double[] myList; // 首选的方法
double myList[]; // 效果相同，但不是首选方法
```

### 2、创建数组

Java语言使用new操作符来创建数组，语法如下：

```java
arrayRefVar = new dataType[arraySize];
```

上面的语法语句做了两件事：

- 使用 dataType[arraySize] 创建了一个数组。
- 把新创建的数组的引用赋值给变量 arrayRefVar。

数组变量的声明，和创建数组可以用一条语句完成，如下所示：

```java
dataType[] arrayRefVar = new dataType[arraySize];
//例如，创建一个类型ini，大小为10的数组
int[] myList =  new int[10];
```

获取数组长度：arrayRefVar.length

数组的元素是通过索引访问的。数组索引从 0 开始，所以索引值从 0 到 arrayRefVar.length-1

【演示创建一个数组，并赋值，进行访问】

```java
public static void main(String[] args) {
    //1.声明一个数组
    int[] myList = null;
    //2.创建一个数组
    myList = new int[10];
    //3.像数组中存值
    myList[0] = 1;
    myList[1] = 2;
    myList[2] = 3;
    myList[3] = 4;
    myList[4] = 5;
    myList[5] = 6;
    myList[6] = 7;
    myList[7] = 8;
    myList[8] = 9;
    myList[9] = 10;
    // 计算所有元素的总和
    double total = 0;
    for (int i = 0; i < myList.length; i++) {
        total += myList[i];
    }
    System.out.println("总和为： " + total);
}
```

### 3、内存分析

Java内存分析 ：

![image-20210328141316453](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328141316453.png)

1. 声明的时候并没有实例化任何对象，只有在实例化数组对象时，JVM才分配空间，这时才与长度有关。因此，声明数组时不能指定其长度(数组中元素的个数)

   例如： int a[5]; //非法

2. 声明一个数组的时候并没有数组被真正的创建。

3.  构造一个数组，必须指定长度

```java
//1.声明一个数组
int[] myList = null;
```

![image-20210328141500346](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328141500346.png)

```java
//2.创建一个数组
myList = new int[10];
```

![image-20210328141525203](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328141525203.png)

```java
//3.像数组中存值
myList[0] = 1;
myList[1] = 2;
myList[2] = 3;
myList[3] = 4;
myList[4] = 5;
myList[5] = 6;
myList[6] = 7;
myList[7] = 8;
myList[8] = 9;
myList[9] = 10;
```

![image-20210328141543324](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328141543324.png)

### 4、三种初始化

1、静态初始化

除了用new关键字来产生数组以外,还可以直接在定义数组的同时就为数组元素分配空间并赋值。

```java
int[] a = {1,2,3};
Man[] mans = {new Man(1,1),new Man(2,2)};
```

2、动态初始化

数组定义、为数组元素分配空间、赋值的操作、分开进行。

```java
int[] a = new int[2];
a[0]=1;
a[1]=2;
```

3、数组的默认初始化

数组是引用类型，它的元素相当于类的实例变量，因此数组一经分配空间，其中的每个元素也被按照实例变量同样的方式被隐式初始化。

```java
public static void main(String[] args) {
    int[] a=new int[2];
    boolean[] b = new boolean[2];
    String[] s = new String[2];
    System.out.println(a[0]+":"+a[1]); //0,0
    System.out.println(b[0]+":"+b[1]); //false,false
    System.out.println(s[0]+":"+s[1]); //null, null
}
```

### 5、数组边界

下标的合法区间：[0, length-1]，如果越界就会报错；

```java
public static void main(String[] args) {
    int[] a=new int[2];
    System.out.println(a[2]);
}
```

> Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 2

ArrayIndexOutOfBoundsException : 数组下标越界异常！

### 6、小结

数组是相同数据类型(数据类型可以为任意类型)的有序集合

数组也是对象。数组元素相当于对象的成员变量(详情请见内存图)

数组长度的确定的，不可变的。如果越界，则报：ArrayIndexOutofBounds



## 数组使用

数组的元素类型和数组的大小都是确定的，所以当处理数组元素时候，我们通常使用基本循环或者 ForEach 循环。

【该实例完整地展示了如何创建、初始化和操纵数组】

```java
public static void main(String[] args) {
    double[] myList = {1.9, 2.9, 3.4, 3.5};
    // 打印所有数组元素
    for (int i = 0; i < myList.length; i++) {
        System.out.println(myList[i] + " ");
    }
    // 计算所有元素的总和
    double total = 0;
    for (int i = 0; i < myList.length; i++) {
        total += myList[i];
    }
    System.out.println("Total is " + total);
    // 查找最大元素
    double max = myList[0];
    for (int i = 1; i < myList.length; i++) {
        if (myList[i] > max) {
            max = myList[i];
        }
    }
    System.out.println("Max is " + max);

}
```

### 1、For-Each 循环

JDK 1.5 引进了一种新的循环类型，被称为 For-Each 循环或者加强型循环，它能在不使用下标的情况下遍历数组。

```java
for(type element: array){
    System.out.println(element);
}
```

【示例】

```java
public static void main(String[] args) {
    double[] myList = {1.9, 2.9, 3.4, 3.5};
    
    // 打印所有数组元素
    for (double element: myList) {
        System.out.println(element);
    }
}
```

### 2、数组作方法入参

数组可以作为参数传递给方法。

例如，下面的例子就是一个打印 int 数组中元素的方法 :

```java
public static void printArray(int[] array) {
    for (int i = 0; i < array.length; i++) {
        System.out.print(array[i] + " ");
    }
}
```

### 3、数组作返回值

```java
public static int[] reverse(int[] list) {
    int[] result = new int[list.length];
    
    for (int i = 0, j = result.length - 1; i < list.length; i++, j--) {
        result[j] = list[i];
    }
    return result;
}
```

以上实例中 result 数组作为函数的返回值。

## 多维数组

多维数组可以看成是数组的数组，比如二维数组就是一个特殊的一维数组，其每一个元素都是一个一维数组。

**1、多维数组的动态初始化：（以二维数组为例）**

直接为每一维分配空间，格式如下：

```java
type[][] typeName = new type[typeLength1][typeLength2];
```



type 可以为基本数据类型和复合数据类型，arraylenght1 和 arraylenght2 必须为正整数， arraylenght1 为行数，arraylenght2 为列数。

比如定义一个二维数组：

```java
int a[][] = new int[2][5];
```

解析：二维数组 a 可以看成一个两行三列的数组。

**2、多维数组的引用（以二维数组为例）**

对二维数组中的每个元素，引用方式为 arrayName[index1] [index2]，例如：

> num[1] [0];

其实二维甚至多维数组十分好理解，我们把两个或者多个值当做定位就好。

原来的数组就是一条线，我们知道一个位置就好

二维就是一个面，两点确定一个位置

三维呢，就需要三个点来确定

**3、获取数组长度：**

a.length获取的二维数组第一维数组的长度，a[0].length才是获取第二维第一个数组长度。

## Arrays 类

数组的工具类java.util.Arrays

由于数组对象本身并没有什么方法可以供我们调用,但API中提供了一个工具类Arrays供我们使用,从 而可以对数据对象进行一些基本的操作。

**文档简介：**

![image-20210328143104527](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328143104527.png)

这个文档，百度即可下载：jdk1.8中文文档

Arrays类中的方法都是static修饰的静态方法,在使用的时候可以直接使用类名进行调用，而"不用"使用对象来调用(注意：是"不用" 而不是 "不能")

java.util.Arrays 类能方便地操作数组. 使用之前需要导包！

具有以下常用功能：

- 给数组赋值：通过 fill 方法。
- 对数组排序：通过 sort 方法,按升序。
- 比较数组：通过 equals 方法比较数组中元素值是否相等。
- 查找数组元素：通过 binarySearch 方法能对排序好的数组进行二分查找法操作。

具体说明请查看下表：

| 序号 | 方法和说明                                                   |
| :--- | :----------------------------------------------------------- |
| 1    | **public static int binarySearch(Object[] a, Object key)** 用二分查找算法在给定数组中搜索给定值的对象(Byte,Int,double等)。数组在调用前必须排序好的。如果查找值包含在数组中，则返回搜索键的索引；否则返回 (-(*插入点*) - 1)。 |
| 2    | **public static boolean equals(long[] a, long[] a2)** 如果两个指定的 long 型数组彼此*相等*，则返回 true。如果两个数组包含相同数量的元素，并且两个数组中的所有相应元素对都是相等的，则认为这两个数组是相等的。换句话说，如果两个数组以相同顺序包含相同的元素，则两个数组是相等的。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。 |
| 3    | **public static void fill(int[] a, int val)** 将指定的 int 值分配给指定 int 型数组指定范围中的每个元素。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。 |
| 4    | **public static void sort(Object[] a)** 对指定对象数组根据其元素的自然顺序进行升序排列。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。 |

来源[菜鸟教程](https://www.runoob.com/java/java-array.html)，一个编程的基础技术教程网站，适合初学者查看资料，我PHP基础就是在这里学的。

### 1、打印数组

```	java
public static void main(String[] args) {
    int[] a = {1,2};
    System.out.println(a); //[I@1b6d3586
    System.out.println(Arrays.toString(a)); //[1, 2]
}
```

### 2、数组排序

对指定的 int 型数组按数字升序进行排序

```java
public static void main(String[] args) {
    int[] a = {1,2,323,23,543,12,59};
    System.out.println(Arrays.toString(a));
    Arrays.sort(a);
    System.out.println(Arrays.toString(a));
}
```

### 3、二分法查找

在数组中查找指定元素并返回其下标

注意：使用二分搜索法来搜索指定的数组，以获得指定的值。必须在进行此调用之前对数组进行排序(通过sort方法等)。如果没有对数组进行排序，则结果是不确定的。

如果数组包含多个带有指定值的元素，则无法保证找到的是哪一个。

```java
public static void main(String[] args) {
    int[] a = {1,2,323,23,543,12,59};
    Arrays.sort(a); //使用二分法查找，必须先对数组进行排序
    System.out.println("该元素的索引："+Arrays.binarySearch(a, 12));
}
```

### 4、元素填充

```java
public static void main(String[] args) {
    int[] a = {1,2,323,23,543,12,59};
    Arrays.sort(a); //使用二分法查找，必须先对数组进行排序
    Arrays.fill(a, 2, 4, 100); //将2到4索引的元素替换为100
    System.out.println(Arrays.toString(a));//[1, 2, 100, 100, 59, 323, 543]
}
```

### 5、数组转换为List集合

```java
int[] a = {3,5,1,9,7};
List<int[]> list = Arrays.asList(a);
```

我们写代码的时候，可以不用刻意去记住`List<int[]>` 在idea中，输入`Arrays.asList(a);` 按下alt + 回车键，会自动补全全面的信息，非常方便。

学校中教学一般用的是eclipse，别问为啥，问就是这个免费，idea要钱。想用的小伙伴自行百度解决:muscle:，学计算机的人，pojie版的资源找不到就说不过去了。:blush:

## 常见排序算法

### 1、冒泡排序

冒泡排序（Bubble Sort），是一种计算机科学领域的较简单的排序算法。

它重复地走访过要排序的元素列，依次比较两个相邻的[元素](https://baike.baidu.com/item/元素/9563223)，如果顺序（如从大到小、首字母从Z到A）错误就把他们交换过来。走访元素的工作是重复地进行直到没有相邻元素需要交换，也就是说该元素列已经排序完成。

这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端（升序或降序排列），就如同碳酸饮料中[二氧化碳](https://baike.baidu.com/item/二氧化碳/349143)的气泡最终会上浮到顶端一样，故名“冒泡排序”。

冒泡排序算法的原理如下：

- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

 [冒泡排序——《图解算法》](https://blog.csdn.net/zcl_love_wx/article/details/83576962)

```java
class Bubble {
    public int[] sort(int[] array) {
        int temp = 0;
        // 外层循环，它决定一共走几趟 //-1为了防止溢出
        for (int i = 0; i < array.length - 1; i++) {
            int flag = 0; //通过符号位可以减少无谓的比较，如果已经有序了，就退出循环
            //内层循环，它决定每趟走一次
            for (int j = 0; j < array.length - i - 1; j++) {
                //如果后一个大于前一个,则换位
                if (array[j + 1] > array[j]) {
                    temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    flag = 1;
                }
            }
            if (flag == 0) {
                break;
            }
        }
        return array;
    }

    public static void main(String[] args) {
        Bubble bubble = new Bubble();
        int[] array = {2, 5, 1, 6, 4, 9, 8, 5, 3, 1, 2, 0};
        int[] sort = bubble.sort(array);
        for (int num : sort) {
            System.out.print(num + "\t");
        }
    }
}
```

### 2、选择排序

选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中
选出最小（或最大）的一个元素，存放在序列的起始位置，然后，再从剩余未排序元素中继续寻找最小
（大）元素，然后放到排序序列的末尾。以此类推，直到全部待排序的数据元素排完。 选择排序是不稳
定的排序方法。

```java
class SelectSort {
    public int[] sort(int arr[]) {
        int temp = 0;
        for (int i = 0; i < arr.length - 1; i++) {
            // 认为目前的数就是最小的, 记录最小数的下标
            int minIndex = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[minIndex] > arr[j]) {// 修改最小值的下标
                    minIndex = j;
                }
            }// 当退出for就找到这次的最小值,就需要交换位置了
            if (i != minIndex) {//交换当前值和找到的最小值的位置
                temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
        return arr;
    }

    public static void main(String[] args) {
        SelectSort selectSort = new SelectSort();
        int[] array = {2, 5, 1, 6, 4, 9, 8, 5, 3, 1, 2, 0};
        int[] sort = selectSort.sort(array);
        for (int num : sort) {
            System.out.print(num + "\t");
        }
    }
}
```

###  3、直接插入排序

排序原理：基本操作是将一条记录插入到已排好的有序表中，从而得到一个新的、记录数量增1的有序表。

例如：

```txt
原始数据： 49,38,65,97,76,13,27

[49],38,65,97,76,13,27 从1索引开始插入
[38,49],65,97,76,13,27
[38,49,65],97,76,13,27
[38,49,65,97],76,13,27
[38,49,65,76,97],13,27
[13,38,49,65,76,97],27
[13,27,38,49,65,76,97]
```

代码实现：

```java
int arr[]={49,38,65,97,76,13,27};
for (int i = 1; i < arr.length; i++) {
    for(int j=i; j>0;j--){
        if(arr[j]<arr[j-1]){
            int f=arr[j];
            arr[j]=arr[j-1];
            arr[j-1]=f;
        }
    }
}
System.out.println(Arrays.toString(arr));
```

### 4、希尔排序

### 5、快速排序

### 6、归并排序

### 7、基数排序

### 8、堆排序

##  稀疏数组

https://blog.csdn.net/baolingye/article/details/99943083


# JavaSE-异常机制

## 异常概念

在我们日常生活中，有时会出现各种各样的异常。例如：职工小王开车去上班，在正常情况下，小王会准时到达单位。但是天有不测风云，在小王去上班时，可能会遇到一些异常情况，比如小王的车子出了故障，小王只能改为步行。

实际工作中，遇到的情况不可能是非常完美的。比如：你写的某个模块，用户输入不一定符合你的要求、你的程序要打开某个文件，这个文件可能不存在或者文件格式不对，你要读取数据库的数据，数据可能是空的等。我们的程序再跑着，内存或硬盘可能满了。等等。

软件程序在运行过程中，非常可能遇到刚刚提到的这些异常问题，我们叫**异常**，英文是：`Exception`， 意思是例外。这些，例外情况，或者叫异常，怎么让我们写的程序做出合理的处理。而不至于程序崩溃。

**异常**：指程序运行中出现的不期而至的各种状况，如:文件找不到、网络连接失败、非法参数等。 异常发生在程序运行期间，它影响了正常的程序执行流程。

比如说，你的代码少了一个分号，那么运行出来结果是提示是错误 `java.lang.Error` ；

如果你用 `System.out.println(11/0)` ，因为你用0做了除数，会抛出 `java.lang.ArithmeticException` 的异常。

异常发生的原因有很多，通常包含以下几大类：

- 用户输入了非法数据。
- 要打开的文件不存在。
- 网络通信时连接中断，或者JVM内存溢出。

这些异常有的是因为用户错误引起，有的是程序错误引起的，还有其它一些是因为物理错误引起的。

要理解Java异常处理是如何工作的，你需要掌握以下三种类型的异常：

- **检查性异常**：

  最具代表的检查性异常是用户错误或问题引起的异常，这是程序员无法预见的。例如，要打开一个不存在文件时，一个异常就发生了，这些异常在编译时不能被简单地忽略。

- **运行时异常：**

  运行时异常是可能被程序员避免的异常。与检查性异常相反，运行时异常可以在编译时被忽略。

- **错误：**

  错误不是异常，而是脱离程序员控制的问题。错误在代码中通常被忽略。例如，当栈溢出 时，一个错误就发生了，它们在编译也检查不到的。

异常指不期而至的各种状况，如：文件找不到、网络连接失败、除0操作、非法参数等。异常是一个 事件，它发生在程序运行期间，干扰了正常的指令流程。

Java语言在设计的当初就考虑到这些问题，提出异常处理的框架的方案，所有的异常都可以用一个 异常类 来表示，不同类型的异常对应不同的子类异常（目前我们所说的异常包括错误概念），定义异常处理的规范，在 **JDK1.4** 版本以后增加了异常链机制，从而便于跟踪异常。

Java异常是一个描述在代码段中发生异常的对象，当发生异常情况时，一个代表该异常的对象被创建并且在导致该异常的方法中被抛出，而该方法可以选择自己处理异常或者传递该异常。

## 异常体系结构

Java把异常当作对象来处理，并定义一个基类 `java.lang.Throwable`作为所有异常的超类。

在Java API中已经定义了许多异常类，这些异常类分为两大类，错误**Error**和异常**Exception**。

Java异常层次结构图：

![image-20210329151713728](https://gitlab.com/apzs/image/-/raw/master/image/image-20210329151713728.png)

从图中可以看出所有异常类型都是内置类 `Throwable` 的子类，因而 `Throwable` 在异常类的层次结构的顶层。

接下来 `Throwable` 分成了两个不同的分支，一个分支是`Error`，它表示不希望被程序捕获或者是程序无法处理的错误。另一个分支是`Exception`，它表示用户程序可能捕捉的异常情况或者说是程序可以处理的异常。

其中异常类 `Exception` 又分为运行时异常( `RuntimeException` )和非运行时异常。Java异常又可以分为不受检查异常（ `Unchecked Exception` ）和检查异常（ `Checked Exception` ）。

## 异常之间的区别与联系

### 1、Error

`Error` 类对象由 Java 虚拟机生成并抛出，大多数错误与代码编写者所执行的操作无关。

比如说：

Java虚拟机运行错误（ `Virtual MachineError` ），当JVM不再有继续执行操作所需的内存资源时， 将出现 `OutOfMemoryError` 。这些异常发生时，Java虚拟机（JVM）一般会选择线程终止；

还有发生在虚拟机试图执行应用时，如类定义错误（ `NoClassDefFoundError` )、链接错误 (`LinkageError `) 
这些错误是不可查的，因为它们在应用程序的控制和处理能力之外，而且绝大多数是程序运行时不允许出现的状况。

对于设计合理的应用程序来说，即使确实发生了错误，本质上也不应该试图去处理它所引起的异常状 况。在Java中，错误通常是使用 Error 的子类描述。

### 2、Exception

在 `Exception` 分支中有一个重要的子类` RuntimeException` （运行时异常），该类型的异常自动为你所编写的程序定义 `ArrayIndexOutOfBoundsException` （数组下标越界）、 `NullPointerException` （空指针异常）、`ArithmeticException` （算术异常）、 `MissingResourceException` （丢失资源）、 `ClassNotFoundException` （找不到类）等异常，这些异常是不检查异常，程序中可以选择捕获处 理，也可以不处理。

这些异常一般是由程序逻辑错误引起的，程序应该从逻辑角度尽可能避免这类异常的发生；而 `RuntimeException` 之外的异常我们统称为非运行时异常，类型上属于 `Exception` 类及其子类，

从程序语法角度讲是必须进行处理的异常，如果不处理，程序就不能编译通过。如 `IOException` 、 `SQLException` 等以及用户自定义的 `Exception` 异常，一般情况下不自定义检查异常。

注意： `Error` 和 `Exception` 的区别： `Error` 通常是灾难性的致命的错误，是程序无法控制和处理的，当出现这些异常时，Java虚拟机（JVM）一般会选择终止线程； `Exception` 通常情况下是可以被程序处理的，并且在程序中应该尽可能的去处理这些异常。

### 3、检查异常和不受检查异常

**检查异常**：在正确的程序运行过程中，很容易出现的、情理可容的异常状况，在一定程度上这种异常的发生是可以预测的，并且一旦发生该种异常，就必须采取某种方式进行处理。

解析：除了`RuntimeException`及其子类以外，其他的`Exception`类及其子类都属于检查异常，当程序中可能出现这类异常，要么使用try-catch语句进行捕获，要么用throws子句抛出，否则编译无法通过。

**不受检查异常**：包括`RuntimeException`及其子类和`Error`。

分析： **不受检查异常** 为编译器不要求强制处理的异常， **检查异常** 则是编译器要求必须处置的异常。

## Java异常处理机制

java异常处理本质：抛出异常和捕获异常

### 1、抛出异常

要理解抛出异常，首先要明白什么是异常情形（exception condition），它是指阻止当前方法或作用域继续执行的问题。其次把异常情形和普通问题相区分，普通问题是指在当前环境下能得到足够的信息， 总能处理这个错误。

对于异常情形，已经无法继续下去了，因为在当前环境下无法获得必要的信息来解决问题，你所能做的就是从当前环境中跳出，并把问题提交给上一级环境，这就是抛出异常时所发生的事情。抛出异常后，会有几件事随之发生。

首先，是像创建普通的java对象一样将使用 new 在堆上创建一个异常对象；然后，当前的执行路径 （已经无法继续下去了）被终止，并且从当前环境中弹出对异常对象的引用。此时，异常处理机制接管程序，并开始寻找一个恰当的地方继续执行程序

这个恰当的地方就是异常处理程序或者异常处理器，它的任务是将程序从错误状态中恢复，以使程序要 么换一种方式运行，要么继续运行下去。

举例：

假使我们创建了一个学生对象Student的一个引用stu，在调用的时候可能还没有初始化。所以在使用这个对象引用调用其他方法之前，要先对它进行检查，可以创建一个代表错误信息的对象，并且将它从当前环境中抛出，这样就把错误信息传播到更大的环境中。

```java
if(stu == null){
    throw new NullPointerException();
}
```

### 2、捕获异常

在方法抛出异常之后，运行时系统将转为寻找合适的异常处理器（exception handler）。潜在的异常处理器是异常发生时依次存留在调用栈中的方法的集合。当异常处理器所能处理的异常类型与方法抛出的异常类型相符时，即为合适的异常处理器。运行时系统从发生异常的方法开始，依次回查调用栈中的方法，直至找到含有合适异常处理器的方法并执行。当运行时系统遍历调用栈而未找到合适的异常处理器，则运行时系统终止。同时，意味着Java程序的终止。

注意：

对于 运行时异常 、错误 和 检查异常 ，Java技术所要求的异常处理方式有所不同。

由于运行时异常及其子类的不可查性，为了更合理、更容易地实现应用程序，Java规定，运行时异常将由Java运行时系统自动抛出，允许应用程序忽略运行时异常。

对于方法运行中可能出现的`Error` ，当运行方法不欲捕捉时，Java允许该方法不做任何抛出声明。因为，大多数 `Error` 异常属于永远不能被允许发生的状况，也属于合理的应用程序不该捕捉的异常。

> 对于所有的检查异常，Java规定：一个方法必须捕捉，或者声明抛出方法之外。也就是说，当一个方法选择不捕捉检查异常时，它必须声明将抛出异常。

### 3、异常处理五个关键字

分别是： `try` 、 `catch` 、 `finally` 、 `throw` 、 `throws`

try ：用于监听。将要被监听的代码（可能抛出异常的代码）放在try语句块之内，当try语句块内发生异常时，异常就被抛出。

catch ： 用于捕获异常。catch用来捕获try语句块中发生的异常。

finally ：finally语句块总是会被执行。它主要用于回收在try块里打开的物力资源（如数据库连接、网络 连接和磁盘文件）。只有finally块，执行完成之后，才会回来执行try或者catch块中的return或者throw语 句，如果finally中使用了return或者throw等终止方法的语句，则就不会跳回执行，直接停止。

throw ： 用于抛出异常。

throws ： 用在方法签名中，用于声明该方法可能抛出的异常。

## 处理异常

### 1、try -catch

```java
try{
	//code that might generate exceptions
}catch(Exception e){
	//the code of handling exception1
}catch(Exception e){
	//the code of handling exception2
}
```

要明白异常捕获，还要理解 监控区域 （guarded region）的概念。它是一段可能产生异常的代码， 并且后面跟着处理这些异常的代码。

因而可知，上述 `try-catch` 所描述的即是监控区域，关键词 `try`后的一对大括号将一块可能发生异常的代码包起来，即为监控区域。Java方法在运行过程中发生了异常，则创建异常对象。

将异常抛出监控区域之外，由Java运行时系统负责寻找匹配的 catch 子句来捕获异常。若有一个 catch 语句匹配到了，则执行该 catch 块中的异常处理代码，就不再尝试匹配别的 catch 块 了。

匹配原则：如果抛出的异常对象属于 catch 子句的异常类，或者属于该异常类的子类，则认为生成的异常对象与 catch 块捕获的异常类型相匹配。

【演示】

```java
public class TestException {
    public static void main(String[] args) {
        int a = 1;
        int b = 0;
        try { // try监控区域
            if (b == 0) throw new ArithmeticException(); // 通过throw语句抛出
            异常
            System.out.println("a/b的值是：" + a / b);
            System.out.println("this will not be printed!");
        }
        catch (ArithmeticException e) { // catch捕捉异常
            System.out.println("程序出现异常，变量b不能为0！");
        }
        System.out.println("程序正常结束。");
    }
}
```

> 输出：
>
> 程序出现异常，变量b不能为0！ 
> 程序正常结束。

注意：显示一个异常的描述， `Throwable` 重载了 `toString( )` 方法（由 Object 定义），所以 它将返回一个包含异常描述的字符串。例如，将前面的 `catch` 块重写成：

```java
catch (ArithmeticException e) { // catch捕捉异常
    System.out.println("程序出现异常" + e);
}
//输出
// 程序出现异常java.lang.ArithmeticException
```

算术异常属于运行时异常，因而实际上该异常不需要程序抛出，运行时系统自动抛出。如果不用try-catch程序就不会往下执行了。

【演示】

```java
public class TestException {
    public static void main(String[] args) {
        int a = 1;
        int b = 0;
        System.out.println("a/b的值是：" + a / b);
        System.out.println("this will not be printed!");
    }
}
/*
结果：
Exception in thread "main" java.lang.ArithmeticException: / by zero
at TestException.main(TestException.java:7)
*/
```

**使用多重的catch语句**：很多情况下，由单个的代码段可能引起多个异常。处理这种情况，我们需要定义两个或者更多的 catch 子句，每个子句捕获一种类型的异常，当异常被引发时，每个 catch 子 句被依次检查，第一个匹配异常类型的子句执行，当一个 catch 子句执行以后，其他的子句将被旁路。

编写多重catch语句块注意事项：

顺序问题：先小后大，即先子类后父类

**注意：**

Java通过异常类描述异常类型。对于有多个 catch 子句的异常程序而言，应该尽量将捕获底层异常类的 catch 子句放在前面，同时尽量将捕获相对高层的异常类的 catch 子句放在后面。否则，捕获 底层异常类的 catch 子句将可能会被屏蔽。

**嵌套try语句**： try 语句可以被嵌套。也就是说，一个 try 语句可以在另一个 try 块的内部。每次进入 try 语句，异常的前后关系都会被推入堆栈。如果一个内部的 try 语句不含特殊异常的 catch 处理程序，堆栈将弹出，下一个 try 语句的 catch 处理程序将检查是否与之匹配。这个 过程将继续直到一个 catch 语句被匹配成功，或者是直到所有的嵌套 try 语句被检查完毕。如果没有 catch 语句匹配，Java运行时系统将处理这个异常。

【演示】

```java
public class NestTry {
    public static void main(String[] args) {
        try {
            int a = args.length;
            int b = 42 / a;
            System.out.println("a = " + a);
            try {
                if (a == 1) {
                    a = a / (a - a);
                }
                if (a == 2) {
                    int c[] = {1};
                    c[42] = 99;
                }
            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("ArrayIndexOutOfBounds :" + e);
            }
        } catch (ArithmeticException e) {
            System.out.println("Divide by 0" + e);
        }
    }
}
```

> 分析运行：
>
> javac NestTry.java
>
> java NestTry one
> a = 1
> Divide by 0java.lang.ArithmeticException: / by zero
>
> java NestTry one two
> a = 2
> ArrayIndexOutOfBounds :java.lang.ArrayIndexOutOfBoundsException: 42

分析：正如程序中所显示的，该程序在一个try块中嵌套了另一个 try 块。程序工作如下：当你在没有命令行参数的情况下执行该程序，外面的 try 块将产生一个被0除的异常。

程序在有一个命令行参数条件下执行，由嵌套的 try 块产生一个被0除的异常，由于内部的 catch 块不匹配这个异常，它将把异常传给外部的 try 块，在外部异常被处理。如果你在具有两个命令行参数的条件下执行该程序，将由内部 try 块产生一个数组边界异常。

**注意**：当有方法调用时， try 语句的嵌套可以很隐蔽的发生。例如，我们可以将对方法的调用放在一 个 try 块中。在该方法的内部，有另一个 try 语句。

在这种情况下，方法内部的 try 仍然是嵌套在外部调用该方法的 try 块中的。下面我们将对上述例子进行修改，嵌套的 try 块移到方法nesttry()的内部：结果依旧相同！

```java
public class NestTry {
    static void nesttry(int a) {
        try {
            if (a == 1) {
                a = a / (a - a);
            }
            if (a == 2) {
                int c[] = {1};
                c[42] = 99;
            }
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("ArrayIndexOutOfBounds :" + e);
        }
    }

    public static void main(String[] args) {
        try {
            int a = args.length;
            int b = 42 / a;
            System.out.println("a = " + a);
            nesttry(a);
        } catch (ArithmeticException e) {
            System.out.println("Divide by 0" + e);
        }
    }
}
```

### 2、thorw

到目前为止，我们只是获取了被Java运行时系统引发的异常。然而，我们还可以用`throw`语句抛出明确的异常。

语法形式：**throw ThrowableInstance;**

这里的ThrowableInstance一定是 Throwable 类类型或者 Throwable 子类类型的一个对象。简单的数据类型，例如 int ,char 以及非 Throwable 类，例如 String 或 Object ，不能用作异常。

有两种方法可以获取 Throwable 对象：在 catch 子句中使用参数或者使用 new 操作符创建。程序执行完 throw 语句之后立即停止；throw 后面的任何语句不被执行，最邻近的 try 块用来检 查它是否含有一个与异常类型匹配的 catch 语句。

如果发现了匹配的块，控制转向该语句；如果没有发现，次包围的 try 块来检查，以此类推。如果没有发现匹配的 catch 块，默认异常处理程序中断程序的执行并且打印堆栈轨迹。

```java
class TestThrow {
    static void proc() {
        try {
            throw new NullPointerException("demo");
        } catch (NullPointerException e) {
            System.out.println("Caught inside proc");
            throw e;
        }
    }

    public static void main(String[] args) {
        try {
            proc();
        } catch (NullPointerException e) {
            System.out.println("Recaught: " + e);
        }
    }
}
```

该程序两次处理相同的错误，首先， main() 方法设立了一个异常关系然后调用proc( )。proc( )方法设立了另一个异常处理关系并且立即抛出一个 `NullPointerException` 实例，`NullPointerException` 在 main() 中被再次捕获。

该程序阐述了怎样创建Java的标准异常对象，特别注意这一行：

```java
throw new NullPointerException("demo");
```

分析：此处 new 用来构造一个 `NullPointerException` 实例，所有的Java内置的运行时异常有两个构造方法：一个没有参数，一个带有一个字符串参数。

当用第二种形式时，参数指定描述异常的字符串。如果对象用作 print( ) 或者 println( ) 的参数 时，该字符串被显示。这同样可以通过调用getMessage( )来实现，getMessage( )是由 Throwable 定义的。

### 3、throws

如果一个方法可以导致一个异常但不处理它，它必须指定这种行为以使方法的调用者可以保护它们自己而不发生异常。要做到这点，我们可以在方法声明中包含一个 `throws` 子句。

一个 throws 子句列举了一个方法可能引发的所有异常类型。这对于除了 Error 或 RuntimeException 及它们子类以外类型的所有异常是必要的。一个方法可以引发的所有其他类型的异常必须在 throws 子句中声明，否则会导致编译错误。

```java
public void info() throws Exception
{
    //body of method
}
```

 Exception 是该方法可能引发的所有的异常，也可以是异常列表，中间以逗号隔开。

【例子】

```java
class TestThrows{
    static void throw1(){
        System.out.println("Inside throw1 . ");
        throw new IllegalAccessException("demo");
    }
    
    public static void main(String[] args){
        throw1();
    }
}
```

上述例子中有两个地方存在错误，你看出来了吗？

该例子中存在两个错误，首先，throw1( )方法不想处理所导致的异常，因而它必须声明 throws 子句 来列举可能引发的异常即 IllegalAccessException ；其次， main() 方法必须定义 try/catch 语句来捕获该异常。

正确例子如下：

```java
class TestThrows {
    static void throw1() throws IllegalAccessException {
        System.out.println("Inside throw1 . ");
        throw new IllegalAccessException("demo");
    }

    public static void main(String[] args) {
        try {
            throw1();
        } catch (IllegalAccessException e) {
            System.out.println("Caught " + e);
        }
    }
}
```

throws 抛出异常的规则：

- 如果是不受检查异常（ unchecked exception ），即 Error 、 RuntimeException 或它们的子类，那么可以不使用 throws 关键字来声明要抛出的异常，编译仍能顺利通过，但在运行时会被系统抛出。
- 必须声明方法可抛出的任何检查异常（ checked exception ）。即如果一个方法可能出现受可查异常，要么用 try-catch 语句捕获，要么用 throws 子句声明将它抛出，否则会导致编译错误
- 仅当抛出了异常，该方法的调用者才必须处理或者重新抛出该异常。当方法的调用者无力处理该异常的时候，应该继续抛出，而不是囫囵吞枣。
- 调用方法必须遵循任何可查异常的处理和声明规则。若覆盖一个方法，则不能声明与覆盖方法不同的异常。声明的任何异常必须是被覆盖方法所声明异常的同类或子类。

### 4、finally

当异常发生时，通常方法的执行将做一个陡峭的非线性的转向，它甚至会过早的导致方法返回。例如， 如果一个方法打开了一个文件并关闭，然后退出，你不希望关闭文件的代码被异常处理机制旁路。 `finally` 关键字为处理这种意外而设计。

finally 创建的代码块在 try/catch 块完成之后另一个 try/catch 出现之前执行。 finally 块无论有没有异常抛出都会执行。如果抛出异常，即使没有 catch 子句匹配， finally 也会执行。

一个方法将从一个 try/catch 块返回到调用程序的任何时候，经过一个未捕获的异常或者是一个明确的返回语句， finally 子句在方法返回之前仍将执行。这在关闭文件句柄和释放任何在方法开始时被分配的其他资源是很有用。

注意： finally 子句是可选项，可以有也可以无，但是每个 try 语句至少需要一个 catch 或 者 finally 子句。

【例子】

```java
class TestFinally {
    static void proc1() {
        try {
            System.out.println("inside proc1");
            throw new RuntimeException("demo");
        } finally {
            System.out.println("proc1's finally");
        }
    }

    static void proc2() {
        try {
            System.out.println("inside proc2");
            return;
        } finally {
            System.out.println("proc2's finally");
        }
    }

    static void proc3() {
        try {
            System.out.println("inside proc3");
        } finally {
            System.out.println("proc3's finally");
        }
    }

    public static void main(String[] args) {
        try {
            proc1();
        } catch (Exception e) {
            System.out.println("Exception caught");
        }
        proc2();
        proc3();
    }
}
```

> 执行结果：
>
> inside proc1
> proc1's finally
> Exception caught
> inside proc2
> proc2's finally
> inside proc3
> proc3's finally

注：如果 finally 块与一个 try 联合使用， finally 块将在 try 结束之前执行。

### 执行顺序

**try, catch,finally ,return 执行顺序**

1. 执行try，catch ， 给返回值赋值
2. 执行finally
3. return

## 自定义异常

使用Java内置的异常类可以描述在编程时出现的大部分异常情况。除此之外，用户还可以自定义异常。 用户自定义异常类，只需继承 `Exception` 类即可。

在程序中使用自定义异常类，大体可分为以下几个步骤：

- 创建自定义异常类。
- 在方法中通过 throw 关键字抛出异常对象。
- 如果在当前抛出异常的方法中处理异常，可以使用 try-catch 语句捕获并处理；否则在方法的声明处通过 throws 关键字指明要抛出给方法调用者的异常，继续进行下一步操作。
- 在出现异常方法的调用者中捕获并处理异常。

【举例】

```java
class MyException extends Exception {
    private int detail;
    MyException(int a){
        detail = a;
    }
    public String toString(){
        return "MyException ["+ detail + "]";
    }
}
```

```java
public class TestMyException {
    static void compute(int a) throws MyException {
        System.out.println("Called compute(" + a + ")");
        if (a > 10) {
            throw new MyException(a);
        }
        System.out.println("Normal exit!");
    }

    public static void main(String[] args) {
        try {
            compute(1);
            compute(20);
        } catch (MyException me) {
            System.out.println("Caught " + me);
        }
    }
}
```

> 输出：
>
> Called compute(1)
> Normal exit!
> Called compute(20)
> Caught MyException [20]

举例二：输入年龄时，年龄不能为负数，否则就报错

```java
public class AgeException extends Exception{
    public AgeException() {
    }

    public AgeException(String message) {
        super(message);
    }
}
```

```java
public class Demo {
    public static void main(String[] args) {
        try {
            check(-10);
        } catch (AgeException e) {
            e.printStackTrace();
        }
    }

    public static void check(int age) throws AgeException {
        if (age < 0) {
            throw new AgeException("年龄不能小于0");
        } else {
            System.out.println(age);
        }

    }
}
```

![image-20210329171254831](https://gitlab.com/apzs/image/-/raw/master/image/image-20210329171254831.png)

## 总结

![image-20210329171311748](https://gitlab.com/apzs/image/-/raw/master/image/image-20210329171311748.png)

**实际应用中的经验与总结**

1. 处理运行时异常时，采用逻辑去合理规避同时辅助try-catch处理

2. 在多重catch块后面，可以加一个catch ( Exception )来处理可能会被遗漏的异常

3. 对于不确定的代码，也可以加上try-catch，处理潜在的异常

4. 尽量去处理异常，切忌只是简单的调用printStackTrace)去打印输出
5. 具体如何处理异常，要根据不同的业务需求和异常类型去决定
6. 尽量添加finally语句块去释放占用的资源


# JavaSE-面向对象

## 面向过程&面向对象

语言的进化发展跟生物的进化发展其实是一回事，都是”物以类聚”。相近的感光细胞聚到一起变成了我们的眼睛，相近的嗅觉细胞聚到一起变成了我们的鼻子。

语句多了，我们将完成同样功能的相近的语句，聚到了一块儿，便于我们使用。于是，方法出现了！

变量多了，我们将功能相近的变量组在一起，聚到一起归类，便于我们调用。于是，结构体出现了！

再后来，方法多了，变量多了！结构体不够用了！我们就将功能相近的变量和方法聚到了一起，于是类和对象出现了！

寥寥数语，就深刻的展示了语言的进化历史！其实，都非常自然，”物以类聚”。希望大家能记住这句话。

企业的发展也是”物以类聚”的过程，完成市场推广的人员聚到一起形成了市场部。完成技术开发的人员聚到一起形成了开发部！

**面向过程的思维模式**

面向过程的思维模式是简单的线性思维，思考问题首先陷入第一步做什么、第二步做什么的细节中。这种思维模式适合处理简单的事情，比如：上厕所。

如果面对复杂的事情，这种思维模式会陷入令人发疯的状态！比如：如何造神舟十号！

**面向对象的思维模式**

面向对象的思维模式说白了就是分类思维模式。思考问题首先会解决问题需要哪些分类，然后对这些分类进行单独思考。最后，才对某个分类下的细节进行面向过程的思索。

这样就可以形成很好的协作分工。比如：设计师分了10个类，然后将10个类交给了10个人分别进行详细设计和编码！

显然，面向对象适合处理复杂的问题，适合处理需要多人协作的问题！

如果一个问题需要多人协作一起解决，那么你一定要用面向对象的方式来思考！

**对于描述复杂的事物，为了从宏观上把握、从整体上合理分析，我们需要使用面向对象的思路来分析整 个系统。但是，具体到微观操作，仍然需要面向过程的思路去处理。**

## OOP详解

### 1、什么是面向对象

 Java的编程语言是面向对象的，采用这种语言进行编程称为面向对象编程(Object-Oriented Programming, OOP)。

面向对象编程的本质就是：以类的方式组织代码，以对象的组织(封装)数据。

**抽象(abstract)**

忽略一个主题中与当前目标无关的那些方面，以便更充分地注意与当前目标有关的方面。抽象并不打算了
解全部问题，而只是选择其中的一部分，暂时不用关注细节。

> 例如：要设计一个学生成绩管理系统，那么对于学生，只关心他的班级、学号、成绩等，而不用去关心他的
> 身高、体重这些信息。 抽象是什么？就是将多个物体共同点归纳出来，就是抽出像的部分！

**封装(Encapsulation)**

封装是面向对象的特征之一，是对象和类概念的主要特性。封装是把过程和数据包围起来，对数据的访 问只能通过指定的方式。

在定义一个对象的特性的时候，有必要决定这些特性的可见性，即哪些特性对外部是可见的，哪些特性用于表示内部状态。

通常，应禁止直接访问一个对象中数据的实际表示，而应通过操作接口来访问，这称为信息隐藏。

信息隐藏是用户对封装性的认识，封装则为信息隐藏提供支持。

封装保证了模块具有较好的独立性，使得程序维护修改较为容易。对应用程序的修改仅限于类的内部， 因而可以将应用程序修改带来的影响减少到最低限度。

**继承(inheritance)**

继承是一种联结类的层次模型，并且允许和支持类的重用，它提供了一种明确表述共性的方法

新类继承了原始类后,新类就继承了原始类的特性，新类称为原始类的派生类(子类)，而原始类称为新类的基类(父类)。

派生类(子类)可以从它的基类(父类)那里继承方法和实例变量，并且派生类(子类)中可以修改或增加新的方法使之更适合特殊的需要继承性很好的解决了软件的可重用性问题。比如说，所有的Windows应用程序都有一个窗口，它们可以看作都是从一个窗口类派生出来的。但是有的应用程序用于文字处理，有的应用程序用于绘图，这是由于派生出了不同的子类，各个子类添加了不同的特性。

**多态(polymorphism)**

多态性是指允许不同类的对象对同一消息作出响应。

多态性语言具有灵活、抽象、行为共享、代码共享的优势，很好的解决了应用程序函数同名问题。

相同类域的不同对象,调用相同方法,表现出不同的结果

**从认识论角度考虑是先有对象后有类。对象，是具体的事物。类，是抽象的，是对对象的抽象。**

**从代码运行角度考虑是先有类后有对象。类是对象的模板。**

### 2、类与对象的关系

类是一种抽象的数据类型,它是对某一类事物整体描述/定义,但是并不能代表某一个具体的事物

> 例如：我们生活中所说的词语：动物、植物、手机、电脑等等。这些也都是抽象的概念，而不是指的某一个 具体的东西。

例如: Person类、Pet类、Car类等，这些类都是用来 描述/定义 某一类具体的事物应该具备的特点和行为

对象是抽象概念的具体实例

> 例如：张三就是人的一个具体实例，张三家里的旺财就是狗的一个具体实例。能够体现出特点，展现出功能的是具体的实例，而不是一个抽象的概念。

【示例】

```java
Student s = new Student(1,"tom",20);
s.study();

Car c = new Car(1,"BWM",500000);
c.run();
```

对象s就是Student类的一个实例，对象c就是Car类的一个具体实例，能够使用的是具体实例，而不是类。类只是给对象的创建提供了一个参考的模板而已。

但是在java中，没有类就没有对象，然而类又是根据具体的功能需求，进行实际的分析，最终抽象出来的。

### 3、对象和引用的关系

引用 "指向" 对象

使用类类型、数组类型、接口类型声明出的变量，都可以指向对象，这种变量就是引用类型变量，简称引用。

在程序中，创建出对象后，直接使用并不方便，所以一般会用一个引用类型的变量去接收这个对象，这个就是所说的引用指向对象。

总结：对象和引用的关系，就如电视机和遥控器，风筝和线的关系一样。

## 方法回顾及加深

方法一定是定义在类中的，属于类的成员。

### 1、方法的定义

> 格式： 修饰符 返回类型 方法名(参数列表)异常抛出类型{...}

1. **修饰符**

   public、static、abstract、final等等都是修饰符，一个方法可以有多个修饰符。例如程序入口 main方法，就使用了public static这个俩个修饰符

   注：如果一个方法或者属性有多个修饰符，这多个修饰符是没有先后顺序的

2. **返回类型**

   方法执行完如果有要返回的数据，那么就要声明返回数据的类型，如果没有返回的数据，那么返回类型就必须写void

   只有构造方法(构造器)不写任何返回类型也不写void

   【示例】

   ```java
   public String sayHello(){
       return "hello";
   }
   public int max(int a,int b){
       return a>b?a:b;
   }
   public void print(String msg){
       System.out.println(msg);
   }
   ```

   思考：声明返回类型的方法中一定要出现return语句，那么没有返回类型(void)的方法中，能不能出现 return语句?

   **break和return的区别**

   return 语句的作用

   > (1) return 从当前的方法中退出,返回到该调用的方法的语句处,继续执行。 
   > (2) return 返回一个值给调用该方法的语句，返回值的数据类型必须与方法的声明中的返回值的类型一致。 
   > (3) return后面也可以不带参数，不带参数就是返回空，其实主要目的就是用于想中断函数执行，返回 调用函数处。

   break语句的作用

   > (1)break在循环体内，强行结束循环的执行，也就是结束整个循环过程，不在判断执行循环的条件是否成立，直接转向循环语句下面的语句。
   >
   > (2)当break出现在循环体中的switch语句体内时，其作用只是跳出该switch语句体。

3. **方法名**

   遵守java中标示符的命名规则即可.

4. 参数列表

   根据需求定义,方法可以是无参的,也可以有一个参数,也可以有多个参数

5. 异常抛出类型

   如果方法中的代码在执行过程中，可能会出现一些异常情况，那么就可以在方法上把这些异常声明并抛出， 也可以同时声明抛出多个异常，使用逗号隔开即可。

   ```java
   public void readFile(String file)throws IOException{
   }
   
   public void readFile(String file)throws IOException,ClassNotFoundException{
   }
   ```

### 2、方法调用

在类中定义了方法，这个方法中的代码并不会执行，当这个方法被调用的时候，方法中的代码才会被一行一 行顺序执行。

1. **非静态方法**

   没有使用static修饰符修饰的方法，就是非静态方法。

   调用这种方法的时候，是"一定"要使用对象的调用。因为非静态方法是属于对象的。(非静态属性也是一样的)

   【例子】

   >public class Student{
   >	public void say(){}
   >}
   >
   >main: 
   >
   >Student s = new Student(); 
   >
   >s.say();

2. **静态方法**

   使用static修饰符修饰的方法,就是静态方法。

   调用这种方法的时候，"可以"使用对象调用，也"可以"使用类来调用，但是推荐使用类进行调用。因为静态方法是属于类的。(静态属性也是一样的)

   【例子】

   >public class Student{
   >	public static void say(){}
   >}
   >
   >
   >
   >main:
   >
   >Student.say();

3. **类中方法之间的调用**

   假设同一个类中有俩个方法，a方法和b方法，a和b都是非静态方法，相互之间可以直接调用。

   ```java
   public void a(){
       b();
   }
   public void b(){
       
   }
   ```

   a和b都是静态方法,相互之间可以直接调用

   ```java
   public static void a(){
       b();
   }
   public static void b(){
       
   }
   ```

   a静态方法，b是非静态方法，a方法中不能直接调用b方法，但是b方法中可以直接调用a方法。静态方法不能 调用非静态方法！

   ```java
   public static void a(){
       //b();报错
   }
   public void b(){
       a();
   }
   ```

   另外：在同一个类中，静态方法内不能直接访问到类中的非静态属性。

   总结：类中方法中的调用，两个方法都是静态或者非静态都可以互相调用，当一个方法是静态，一个方 法是非静态的时候，非静态方法可以调用静态方法，反之不能。

### 3、调用方法时的传参

**1、形参和实参**

```java
public static void test(int a){

}

public static void main(String[] args) {
    int x = 1;
    test(x);
}
```

参数列表中的a是方法test的形参(形式上的参数)
调用方法时的x是方法test的实参(实际上的参数)

注意：形参的名字和实参的名字都只是一个变量的名字,是可以随便写的,我们并不关心这个名字,而是关 心变量的类型以及变量接收的值。

**2、值传递和引用传递**

调用方法进行传参时，分为值传递和引用传递两种。

如果参数的类型是基本数据类型，那么就是值传递。

如果参数的类型是引用数据类型，那么就是引用传递。

值传递是实参把自己变量本身存的简单数值赋值给形参。
引用传递是实参把自己变量本身存的对象内存地址值赋值给形参。

所以值传递和引用传递本质上是一回事，只不过传递的东西的意义不同而已。

【示例：值传递】

```
public static void changeNum(int a) {
    a = 10;
}

public static void main(String[] args) {
    int a = 1;
    System.out.println("before: a = " + a); //1
    changeNum(a);
    System.out.println("after: a = " + a); //1
}
```

【示例：引用传递】

```
public class Test {
    public static void changeName(Student s) {
        s.name = "tom";
    }

    public static void main(String[] args) {
        Student s = new Student();
        System.out.println("before: name = " + s.name); //null
        changeName(s);
        System.out.println("after: name = " + s.name); //tom
    }

    static class Student {
        String name;
    }

}
```

### 4、this关键字

在类中，可以使用this关键字表示一些特殊的作用。

**1、this在类中的作用**

区别成员变量和局部变量

```java
public class Student{
    private String name;
    public void setName(String name){
        //this.name表示类中的属性name
        this.name = name;
    }
}
```

调用类中的其他方法

```java
public class Student{
    private String name;
    public void setName(String name){
        this.name = name;
    }
    public void print(){
        //表示调用当前类中的setName方法
        this.setName("tom");
    }
}
```

注：默认情况下，setName("tom")和this.setName("tom")的效果是一样的。

调用类中的其他构造器

```java
public class Student{
    private String name;
    public Student(){
        //调用一个参数的构造器,并且参数的类型是String
        this("tom");
    }
    public Student(String name){
        this.name = name;
    }
}
```

注：this的这种用法，只能在构造器中使用。普通的方法是不能用的。并且这局调用的代码只能出现在构造器中的第一句。

【示例】

```java
public class Student{
    private String name;
    //编译报错,因为this("tom")不是构造器中的第一句代码.
    public Student(){
        System.out.println("hello");
        this("tom");
    }
    public Student(String name){
        this.name = name;
    }
}
```

**2、this关键字在类中的意义**

this在类中表示当前类将来创建出的对象。

【例子】

```java
public class Student {
    private String name;

    public Student() {
        System.out.println("this = " + this);
    }

    public static void main(String[] args) {
        Student s = new Student();
        System.out.println("s = " + s);
    }
}
```

运行后看结果可知，this和s打印的结果是一样的，那么其实也就是变量s是从对象的外部执行对象，而this是在对象的内部执行对象本身。

这样也就能理解为什么this.name代表的是成员变量，this.setName("tom")代表的是调用成员方法。因为这俩句代码从本质上讲，和在对象外部使用变量s来调用是一样的，s.name和s.setName("tom")

【this和s打印出来的内存地址是一样的，使用==比较的结果为true。】

```java
public class Student{
    public Student getStudent(){
        return this;
    }
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = s1.getStudent();
        System.out.println(s1 == s2);//true
    }
}
```

【调用类中的this，s1和s2不相等】

```java
public class Student{
    private String name;
    public void test(){
        System.out.println(this);
    }
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student();
        s1.test();
        s2.test();
    }
}
```

注：这句话是要这么来描述的，s1对象中的this和s1相等，s2对象中的this和s2相等，因为类是模板，模板中写的this并不是只有一个，每个对象中都有一个属于自己的this，就是每个对象中都一个属于自己的name属性一样。

## 创建与初始化对象

**使用new关键字创建对象**

使用new关键字创建的时候，除了分配内存空间之外，还会给创建好的对象进行默认的初始化，以及对类中构造器的调用。

那么对main方法中的以下代码：Student s = new Student();

1） 为对象分配内存空间，将对象的实例变量自动初始化默认值为0/false/null。(实例变量的隐式赋值)

2） 如果代码中实例变量有显式赋值，那么就将之前的默认值覆盖掉。(之后可以通过例子看到这个现象)

   	例如：显式赋值，private String name = "tom";

3） 调用构造器

4） 把对象内存地址值赋值给变量。(=号赋值操作)

## 构造器

类中的构造器也称为构造方法，是在进行创建对象的时候必须要调用的。并且构造器有以下俩个特点:

1. 必须和类的名字相同
2. 必须没有返回类型,也不能写void

**构造器的作用:**

1. 使用new创建对象的时候必须使用类的构造器
2. 构造器中的代码执行后，可以给对象中的属性初始化赋值

【演示】

```java
public class Student{
    private String name;
    
    public Student(){
        name = "tom";
    }
}
```

**构造器重载**

除了无参构造器之外，很多时候我们还会使用有参构造器，在创建对象时候可以给属性赋值。

【例子】

```java
public class Student{
    private String name;
    public Student(){
        name = "tom";
    }
    public Student(String name){
        this.name = name;
    }
}
```

**构造器之间的调用**

使用this关键字，在一个构造器中可以调用另一个构造器的代码。

注意：this的这种用法不会产生新的对象，只是调用了构造器中的代码而已。一般情况下只有使用new关键字才会创建新对象。

【演示】

```java
public class Student{
    private String name;
    public Student(){
        this();
    }
    public Student(String name){
        this.name = name;
    }
}
```

**默认构造器**

在java中，即使我们在编写类的时候没有写构造器，那么在编译之后也会自动的添加一个无参构造器，这个无参构造器也被称为默认的构造器。

【示例】

```java
public class Student{
    
}

main:
//编译通过,因为有无参构造器
Student s = new Student();
```

但是,如果我们手动的编写了一个构造器,那么编译后就不会添加任何构造器了

【示例】

```java
public class Student{
    private String name;
    public Student(String name){
        this.name = name;
    }
}

main:
//编译报错,因为没有无参构造器
Student s = new Student();
```



## 内存分析

JAVA程序运行的内存分析

**栈 stack：**

1. 每个线程私有，不能实现线程间的共享！
2. 局部变量放置于栈中。
3. 栈是由系统自动分配，速度快！栈是一个连续的内存空间！

**堆 heap：**

1. 放置new出来的对象！
2. 堆是一个不连续的内存空间，分配灵活，速度慢！

**方法区(也是堆)：**

1. 被所有线程共享！
2. 用来存放程序中永远是不变或唯一的内容。（类代码信息、静态变量、字符串常量）

![image-20210328212049006](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328212049006.png)

注意：本次内存分析，我们的主要目的是让大家了解基本的内存概念。类加载器、Class对象这些更加详细的内容，我们将在后面专门讲反射的课程里面讲。

**引用类型的概念**

1. java中，除了基本数据类型之外的其他类型称之为引用类型。
2. java中的对象是通过引用来操作的。(引用：reference)说白了，引用指的就是对象的地址！

**属性（field，或者叫成员变量）**

1. 属性用于定义该类或该类对象包含的数据或者说静态属性。

2. 属性作用范围是整个类体。

3.  属性的默认初始化：

   在定义成员变量时可以对其初始化，如果不对其初始化，Java使用默认的值对其初始化(数值：0,0.0 char：u0000, boolean：false, 所有引用类型：null)

4. 属性定义格式：

   > [修饰符] 属性类型 属性名 = [默认值]

**类的方法**

方法是类和对象动态行为特征的抽象。方法很类似于面向过程中的函数。面向过程中，函数是最基本单位，整个程序有一个个函数调用组成；面向对象中，整个程序的基本单位是类，方法是从属于类或对象的。

方法定义格式：

```java
[修饰符] 方法返回值类型 方法名(形参列表) {
    // n条语句
}
```

**java对象的创建和使用**

- 必须使用 new 关键字创建对象。

  Person person= new Person ();

- 使用对象（引用）.成员变量来引用对象的成员变量。

  person.age

- 使用对象（引用）. 方法（参数列表）来调用对象的方法

  person.setAge(18)

类中就是：静态的数据 动态的行为

学习完类与对象终于认识到什么是类，什么是对象了。

接下来要看的就是java的三大特征：继承、封 装、多态。

## 封装

我要看电视，只需要按一下开关和换台就可以了。有必要了解电视机内部的结构吗？有必要碰碰显像管吗？

制造厂家为了方便我们使用电视，把复杂的内部细节全部封装起来，只给我们暴露简单的接口，比如： 电源开关。需要让用户知道的暴露出来，不需要让用户了解的全部隐藏起来。这就是封装。

白话：该露的露，该藏的藏

专业：我们程序设计要追求“高内聚，低耦合”。高内聚就是类的内部数据操作细节自己完成，不允许外部干涉；低耦合：仅暴露少量的方法给外部使用。

**封装（数据的隐藏）**

在定义一个对象的特性的时候，有必要决定这些特性的可见性，即哪些特性对外部是可见的，哪些特性用于表示内部状态。

通常，应禁止直接访问一个对象中数据的实际表示，而应通过操作接口来访问，这称为信息隐藏。

### 1、封装的步骤

1. 使用private 修饰需要封装的成员变量。

2. 提供一个公开的方法设置或者访问私有的属性

   设置 通过set方法，命名格式： set属性名（）; 属性的首字母要大写

   访问 通过get方法，命名格式： get属性名（）; 属性的首字母要大写

【演示】

```java
//对象能在类的外部"直接"访问
public class Student{
    public String name;
    public void println(){
        System.out.println(this.name);
    }
}
public class Test{
    public static void main(String[] args){
        Student s = new Student();
        s.name = "tom";
    }
}
```

在类中一般不会把数据直接暴露在外部的，而使用private(私有)关键字把数据隐藏起来

【演示】

```java
public class Student{
    private String name;
}
public class Test{
    public static void main(String[] args){
        Student s = new Student();
        //编译报错,在类的外部不能直接访问类中的私有成员
        s.name = "tom";
    }
}
```

如果在类的外部需要访问这些私有属性,那么可以在类中提供对于的get和set方法,以便让用户在类的外部 可以间接的访问到私有属性

【示例】

```java
//set负责给属性赋值
//get负责返回属性的值
public class Student{
    private String name;
    public void setName(String name){
    this.name = name;
	}
	public String getName(){
        return this.name;
	}
}
public class Test{
    public static void main(String[] args){
        Student s = new Student();
        s.setName("tom");
        System.out.println(s.getName());
    }
}

```

### 2、作用和意义

1. 提高程序的安全性，保护数据。
2. 隐藏代码的实现细节
3. 统一用户的调用接口
4. 提高系统的可维护性
5. 便于调用者调用。

良好的封装，便于修改内部代码，提高可维护性。

良好的封装，可进行数据完整性检测，保证数据的有效性。

### 3、方法重载

类中有多个方法，有着相同的方法名，但是方法的参数各不相同,这种情况被称为方法的重载。方法的重载可以提供方法调用的灵活性。

思考：HelloWorld中的System.out.println()方法，为什么可以把不同类型的参数传给这个方法?

【演示：查看println方法的重载】 idea中`ctrl`+`左键`点击`println`

例如:

```java
public class Test{
    public void test(String str){
        
    }
    public void test(int a){
        
    }
}
```

**方法重载必须满足以下条件**

1. 方法名必须相同

2. 参数列表必须不同(参数的类型、个数、顺序的不同)

   ```java
   public void test(Strig str){}
   public void test(int a){}
   
   public void test(Strig str,double d){}
   public void test(Strig str){}
   
   public void test(Strig str,double d){}
   public void test(double d,Strig str){}
   ```

3. 方法的返回值可以不同，也可以相同。

**在java中，判断一个类中的俩个方法是否相同，主要参考俩个方面：方法名字和参数列表**

## 继承

继承：extands

现实世界中的继承无处不在。比如：

动物：哺乳动物、爬行动物

哺乳动物：灵长目、鲸目等。

**继承的本质是对某一批类的抽象，从而实现对现实世界更好的建模。**

**为什么需要继承？继承的作用？**

第一好处：继承的本质在于抽象。类是对对象的抽象，继承是对某一批类的抽象。

第二好处：为了提高代码的复用性。

extands的意思是“扩展”。子类是父类的扩展。

【注】JAVA中类只有单继承，没有多继承！ 接口可以多继承！

### 1、继承

1. 继承是类和类之间的一种关系。除此之外,类和类之间的关系还有依赖、组合、聚合等。

2. 继承关系的俩个类，一个为子类(派生类),一个为父类(基类)。子类继承父类，使用关键字extends来表示。

   ```java
   public class student extends Person{
   }
   ```

3. 子类和父类之间，从意义上讲应该具有"is a"的关系。

   > student is a person 
   >
   > dog is a animal

4. 类和类之间的继承是单继承

   一个子类只能"直接"继承一个父类,就像是一个人只能有一个亲生父亲
   一个父类可以被多子类继承,就像一个父亲可以有多个孩子

   注:java中接口和接口之间,有可以继承,并且是多继承。

5. 父类中的属性和方法可以被子类继承

   子类中继承了父类中的属性和方法后,在子类中能不能直接使用这些属性和方法,是和这些属性和方法原有 的修饰符(public protected default private)相关的。

   例如：

   父类中的属性和方法使用public修饰，在子类中继承后"可以直接"使用
   父类中的属性和方法使用private修饰，在子类中继承后"不可以直接"使用
   
   **注：具体细则在修饰符部分详细说明**
   
   父类中的构造器是不能被子类继承的，但是子类的构造器中，会隐式的调用父类中的无参构造器（默认使用 super关键字）。
   
   **注:具体细节在super关键字部分详细说明**

### 2、Object类

 java中的每一个类都是"直接" 或者 "间接"的继承了Object类。所以每一个对象都和Object类有"is a"的关系。从API文档中，可以看到任何一个类最上层的父类都是Object。(Object类本身除外)AnyClass is a Object。

> System.out.println(任何对象 instanceof Object);
>
> 输出结果:true
> 注:任何对象也包含数组对象

例如:

```java
//编译后,Person类会默认继承Object
public class Person{}

//Student是间接的继承了Object
public class Student extends Person{}
```

在Object类中，提供了一些方法被子类继承，那么就意味着，在java中，任何一个对象都可以调用这些被继承过来的方法。(因为Object是所以类的父类)

例如：toString方法、equals方法、getClass方法等

### 3、Super关键字

子类继承父类之后，在子类中可以使用this来表示访问或调用子类中的属性或方法，使用super就表示访问或调用父类中的属性和方法。

**1、super的使用**

【访问父类中的属性】

```java
public class Person{
    protected String name = "zs";
}
```

```java
public class Student extends Person{
    private String name = "lisi";
    public void tes(String name){
        System.out.println(name);
        System.out.println(this.name);
        System.out.println(super.name);
    }
}
```

【调用父类中的方法】

```java
public class Person{
    public void print(){
        System.out.println("Person");
    }
}

```

```java
public class Student extends Person{
    public void print(){
        System.out.println("Student");
    }
    public void test(){
        print();
        this.print();
        super.print();
    }
}
```

【调用父类中的构造器】

```java
public class Person{
}

public class Student extends Person{
    //编译通过,子类构造器中会隐式的调用父类的无参构造器
    //super();
    public Student(){
    }
}
```

父类没有无参构造

```java
public class Person{
    protected String name;
    public Person(String name){
        this.name = name;
    }
}
public class Student extends Person{
    //编译报错,子类构造器中会隐式的调用父类的无参构造器,但是父类中没有无参构造器
    //super();
    public Student(){
        
    }
}
```

【显式的调用父类的有参构造器】

```java
public class Person{
    protected String name;
    public Person(String name){
    this.name = name;
	}
}

public class Student extends Person{
    //编译通过,子类构造器中显式的调用父类的有参构造器
    public Student(){
        super("tom");
    }
}
```

注：不管是显式还是隐式的父类的构造器，super语句一定要出现在子类构造器中第一行代码。所以this和 super不可能同时使用它们调用构造器的功能，因为它们都要出现在第一行代码位置。

【例子】

```java
public class Person{
    protected String name;
    public Person(String name){
        this.name = name;
    }
}

public class Student extends Person{
    //编译报错,super调用构造器的语句不是第一行代码
    public Student(){
        System.out.println("Student");
        super("tom");
    }
}
```

【例子】

```java
public class Person{
    protected String name;
    public Person(String name){
        this.name = name;
    }
}
//编译通过
public class Student extends Person{
    private int age;
    public Student(){
        this(20);
    }
    public Student(int age){
        super("tom");
        this.age = age;
    }
}
```

**super使用的注意的地方**

- 用super调用父类构造方法，必须是构造方法中的第一个语句。
- super只能出现在子类的方法或者构造方法中
- super 和 this 不能够同时调用构造方法。（因为this也是在构造方法的第一个语句）

**super 和 this 的区别**

1. 代表的事物不一样：

   this：代表所属方法的调用者对象。

   super：代表父类对象的引用空间。

2. 使用前提不一致：

   this：在非继承的条件下也可以使用。

   super：只能在继承的条件下才能使用。

3. 调用构造方法：

   this：调用本类的构造方法。

   super：调用的父类的构造方法



### 4、方法重写

方法的重写（override）

- 方法重写只存在于子类和父类(包括直接父类和间接父类)之间。在同一个类中方法只能被重载，不能被重写
- 静态方法不能重写
  1. 父类的静态方法不能被子类重写为非静态方法 //编译出错
  2. 父类的非静态方法不能被子类重写为静态方法；//编译出错
  3. 子类可以定义与父类的静态方法同名的静态方法(但是这个不是覆盖)

【例子】

> A类继承B类 A和B中都一个相同的静态方法test
>
> B a = new A(); 
> a.test();//调用到的是B类中的静态方法test
>
> A a = new A(); 
> a.test();//调用到的是A类中的静态方法test
>
> 可以看出静态方法的调用只和变量声明的类型相关
> 这个和非静态方法的重写之后的效果完全不同

私有方法不能被子类重写，子类继承父类后,是不能直接访问父类中的私有方法的,那么就更谈不上重写了

```java
public class Person{
    private void run(){}
    
}

//编译通过,但这不是重写,只是俩个类中分别有自己的私有方法
public class Student extends Person{
    private void run(){}
}
```

**重写的语法**

1. 方法名必须相同

2. 参数列表必须相同

3. 访问控制修饰符可以被扩大，但是不能被缩小： public protected default private

4. 抛出异常类型的范围可以被缩小,但是不能被扩大

   ClassNotFoundException ---> Exception（不能扩大）

5. 返回类型可以相同，也可以不同。

   如果不同的话，子类重写后的方法返回类型必须是父类方法返回类型的子类型。

   **例如**：父类方法的返回类型是Person，子类重写后的返回类可以是Person也可以是Person的子类型

**注**：一般情况下，重写的方法会和父类中的方法的声明完全保持一致，只有方法的实现不同。(也就是大括号中代码不一样)

```java
public class Person{
    public void run(){}
    protected Object test()throws Exception{
        return null;
    }
}

//编译通过,子类继承父类,重写了run和test方法.
public class Student extends Person{
    public void run(){}
    public String test(){
        return "";
    }
}
```

为什么要重写？

子类继承父类，继承了父类中的方法，但是父类中的方法并不一定能满足子类中的功能需要，所以子类中需要把方法进行重写。

**总结：**

1. 方法重写的时候，必须存在继承关系。
2. 方法重写的时候，方法名和形式参数必须跟父类是一致的。
3. 方法重写的时候，子类的权限修饰符必须要大于或者等于父类的权限修饰符。( private < protected < public，friendly < public )
4. 方法重写的时候，子类的返回值类型必须小于或者等于父类的返回值类型。( 子类 < 父类 ) 数据类型没有明确的上下级关系
5. 方法重写的时候，子类的异常类型要小于或者等于父类的异常类型。

## 多态

### 1、认识多态

多态性是OOP中的一个重要特性，主要是用来实现动态联编的，换句话说，就是程序的最终状态只有在执行过程中才被决定而非在编译期间就决定了。这对于大型系统来说能提高系统的灵活性和扩展性。

多态可以让我们不用关心某个对象到底是什么具体类型，就可以使用该对象的某些方法，从而实现更加灵活的编程，提高系统的可扩展性。

允许不同类的对象对同一消息做出响应。即同一消息可以根据发送对象的不同而采用多种不同的行为方式。

相同类域的不同对象,调用相同的方法,执行结果是不同的

1. 一个对象的实际类型是确定的

   例如: new Student(); new Person();等

2. 可以指向对象的引用的类型有很多

   一个对象的实现类型虽然是确定的，但是这个对象所属的类型可能有很多种。

   例如：Student继承了Person类

   ```java
   Student s1 = new Student();
   Person s2 = new Student();
   Object s3 = new Student();
   ```

   因为Person和Object都是Student的父类型

   ![image-20210328222401861](https://gitlab.com/apzs/image/-/raw/master/image/image-20210328222401861.png)

注：一个对象的实际类型是确定，但是可以指向这个对象的引用的类型，却是可以是这对象实际类型的任意父类型。

**一个父类引用可以指向它的任何一个子类对象**

例如：

```java
Object o = new AnyClass();
Person p = null;
p = new Student();
p = new Teacher();
p = new Person();
```

**多态中的方法调用**

```java
public class Person{
    public void run(){}
}

public class Student extends Person{

}
```

调用到的run方法,是Student从Person继承过来的run方法

```java
Person p = new Student();
p.run();
```

例如：

```java
public class Person{
    public void run(){}
}

public class Student extends Person{
    public void run(){
    //重写run方法
    }
}

//调用到的run方法,是Student中重写的run方法
public static void main(String[] args) {
    Person p = new Student();
    p.run();
}

```

注：子类继承父类,调用a方法，如果a方法在子类中没有重写,那么就是调用的是子类继承父类的a方法, 如果重写了,那么调用的就是重写之后的方法。

子类中独有方法的调用

```java
public class Person{
    public void run(){}
}

public class Student extends Person{
    public void test(){
    }
}

main:
Person p = new Student();
//调用到继承的run方法
p.run();

//编译报错,因为编译器检查变量p的类型是Person,但是在Person类中并没有发现test方法,所以编译报错.
p.test();
```

注：一个变量x，调用一个方法test，编译器是否能让其编译通过，主要是看声明变量x的类型中有没有定义 test方法，如果有则编译通过，如果没有则编译报错。而不是看x所指向的对象中有没有test方法。

原理：编译看左边，运行不一定看右边。

> 编译看左边的意思：java 编译器在编译的时候会检测引用类型中含有指定的成员，如果没有就会报错。 子类的成员是特有的，父类的没有的，所以他是找不到的。
>
> 所以看左边，Person 中没有test()方法，于是编译报错

**子类引用和父类引用指向对象的区别**

```java
Student s = new Student();
Person p = new Student();
```

变量s能调用的方法是Student中有的方法(包括继承过来的)，变量p能调用的方法是Person中有的方法(包括继承过来的)。

但是变量p是父类型的，p不仅可以指向Student对象，还可以指向Teacher类型对象等，但是变量s只能指 Studnet类型对象，及Student子类型对象。变量p能指向对象的范围是比变量s大的。

Object类型的变量o，能指向所有对象，它的范围最大，但是使用变量o能调用到的方法也是最少的，只能调用到Object中的声明的方法，因为变量o声明的类型就是Object。

注：java中的方法调用,是运行时动态和对象绑定的,不到运行的时候,是不知道到底哪个方法被调用的。

**多态的好处与弊端**

- 好处：提高了程序的拓展性

  具体表现：定义方法的时候，使用父类型作为参数，将来在使用的时候，使用具体的子类型参与操作

- 弊端：不能使用子类的特有功能

### 2、重写、重载和多态的关系

重载是编译时多态

> 调用重载的方法,在编译期间就要确定调用的方法是谁,如果不能确定则编译报错

重写是运行时多态

> 调用重写的方法，在运行期间才能确定这个方法到底是哪个对象中的。这个取决于调用方法的引用，在运行 期间所指向的对象是谁，这个引用指向哪个对象那么调用的就是哪个对象中的方法。(java中的方法调用，是运行时动态和对象绑定的)

### 3、多态的注意事项

1.  多态是方法的多态，属性没有多态性。
2. 编写程序时，如果想调用运行时类型的方法，只能进行类型转换。不然通不过编译器的检查。但是如果两个没有关联的类进行强制转换，会报：ClassCastException。 比如：本来是狗，我把它转成猫。就会报这个异常。
3. 多态的存在要有3个必要条件：要有继承，要有方法重写，父类引用指向子类对象



### 4、多态存在的条件

- 有继承关系
- 子类重写父类方法
- 父类引用指向子类对象

补充一下第二点，既然多态存在必须要有“子类重写父类方法”这一条件，那么以下三种类型的方法是没有办法表现出多态特性的（因为不能被重写）：

1. static方法，因为被static修饰的方法是属于类的，而不是属于实例的
2. final方法，因为被final修饰的方法无法被子类重写
3. private方法和protected方法，前者是因为被private修饰的方法对子类不可见，后者是因为尽管被 protected修饰的方法可以被子类见到，也可以被子类重写，但是它是无法被外部所引用的，一个不能被外部引用的方法，怎么能谈多态呢

### 5、方法绑定(method binding)

执行调用方法时，系统根据相关信息，能够执行内存地址中代表该方法的代码。分为静态绑定和动态绑定。

**静态绑定：**

在编译期完成，可以提高代码执行速度。

**动态绑定：**

通过对象调用的方法，采用动态绑定机制。这虽然让我们编程灵活，但是降低了代码的执行速度。这也是JAVA比C/C++速度慢的主要因素之一。JAVA中除了final类、final方、static方法，所有方法都是JVM在运行期才进行动态绑定的。

多态：如果编译时类型和运行时类型不一致，就会造成多态。

### 6、instanceof和类型转换

**1、instanceof**

三个不同java文件

```java
public class Person{
    public void run(){}
}

public class Student extends Person{
}

public class Teacher extends Person{
}
```

main：方法下

```java
Object o = new Student();
System.out.println(o instanceof Student);//true
System.out.println(o instanceof Person);//true
System.out.println(o instanceof Object);//true
System.out.println(o instanceof Teacher);//false
System.out.println(o instanceof String);//false
```

```java
Person o = new Student();
System.out.println(o instanceof Student);//true
System.out.println(o instanceof Person);//true
System.out.println(o instanceof Object);//true
System.out.println(o instanceof Teacher);//false
//编译报错
System.out.println(o instanceof String);
```

```java
Student o = new Student();
System.out.println(o instanceof Student);//true
System.out.println(o instanceof Person);//true
System.out.println(o instanceof Object);//true
//编译报错
System.out.println(o instanceof Teacher);
//编译报错
System.out.println(o instanceof String);
```

>  **System.out.println(x instanceof Y);**

【分析1】

该代码能否编译通过，主要是看声明变量x的类型和Y是否存在子父类的关系。有"子父类关"系就编译通过，没有子父类关系就是编译报错。

之后学习到的接口类型和这个是有点区别的。

【分析2】

输出结果是true还是false,主要是看变量x所指向的对象实际类型是不是Y类型的"子类型".

```java
Object o = new Person();
System.out.println(o instanceof Student);//false
System.out.println(o instanceof Person);//true
System.out.println(o instanceof Object);//true
System.out.println(o instanceof Teacher);//false
System.out.println(o instanceof String);//false
```

**2、类型转换**

```java
public class Person{
    public void run(){}
}

public class Student extends Person{
    public void go(){}
}

public class Teacher extends Person{
}
```

**为什么要类型转换**

```java
//编译报错,因为p声明的类型Person中没有go方法
Person p = new Student();
p.go();

//需要把变量p的类型进行转换
Person p = new Student();
Student s = (Student)p;
s.go();

//或者
//注意这种形式前面必须要俩个小括号
Person p = new Student();
((Student)p).go();
```

**类型转换中的问题**

```java
//编译通过 运行没问题
Object o = new Student();
Person p = (Person)o;

//编译通过 运行没问题
Object o = new Student();
Student s = (Student)o;

//编译通过,运行报错
Object o = new Teacher();
Student s = (Student)o;

```

即:   X x = (X)o; 

运行是否报错，主要是变量o所指向的对象实现类型，是不是X类型的子类型，如果不是则运行就会报错。

**【总结】**

1. 父类引用可以指向子类对象，子类引用不能指向父类对象。

2. 把子类对象直接赋给父类引用叫向上转型（upcasting），不用强制转型。

   如Father father = new Son();

3. 把指向子类对象的父类引用赋给子类引用叫向下转型（downcasting），要强制转型。

   如father就是一个指向子类对象的父类引用，把father赋给子类引用son

   即Son son =（Son） father；

   其中father前面的（Son）必须添加，进行强制转换。

4. upcasting 会丢失子类特有的方法，但是子类overriding 父类的方法，子类方法有效

5. 向上转型的作用，减少重复代码，父类为参数，调有时用子类作为参数，就是利用了向上转型。这样使代码变得简洁。体现了JAVA的抽象编程思想。

## 修饰符

### 1、static修饰符

**1、static变量**

在类中,使用static修饰的成员变量,就是静态变量,反之为非静态变量。

**静态变量和非静态变量的区别**

静态变量属于类的，"可以"使用类名来访问，非静态变量是属于对象的，"必须"使用对象来访问。

```java
public class Student{
    private static int age;
    private double score;
    public static void main(String[] args) {
        Student s = new Student();
        //推荐使用类名访问静态成员
        System.out.println(Student.age);
        System.out.println(s.age);
        
        System.out.println(s.score);
    }
}
```

静态变量对于类而言在内存中只有一个，能被类的所有实例所共享。实例变量对于类的每个实例都有一份, 它们之间互不影响。（在**基础语法**中粗略解释过静态变量）

```
public class Student {
    private static int count;
    private int num;

    public Student() {
        count++;
        num++;
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student();
        Student s3 = new Student();
        Student s4 = new Student();
        //因为还是在类中,所以可以直接访问私有属性
        System.out.println(s1.num);//1
        System.out.println(s2.num);
        System.out.println(s3.num);
        System.out.println(s4.num);
        System.out.println(Student.count);
        
        System.out.println(s1.count);//4
        System.out.println(s2.count);
        System.out.println(s3.count);
        System.out.println(s4.count);
    }
}
```

在加载类的过程中为静态变量分配内存，实例变量在创建对象时分配内存，所以静态变量可以使用类名来直接访问，而不需要使用对象来访问。

**2、static方法**

在类中，使用static修饰的成员方法，就是静态方法，反之为非静态方法。

**静态方法和非静态方法的区别**

> 静态方法数属于类的，"可以"使用类名来调用，非静态方法是属于对象的，"必须"使用对象来调用。

静态方法"不可以"直接访问类中的非静态变量和非静态方法，但是"可以"直接访问类中的静态变量和静态方法

注意：this和super在类中属于非静态的变量.(静态方法中不能使用)

```
public class Student {
    private static int count;
    private int num;
    public void run(){}
    public static void go(){}
    public static void test(){
        //编译通过
        System.out.println(count);
        go();
        
        //编译报错
        System.out.println(num);
        run();
    }
}
```

非静态方法"可以"直接访问类中的非静态变量和非静态方法，也"可以"直接访问类中的静态变量和静态方法

```
public class Student {
    private static int count;
    private int num;

    public void run() {
    }

    public static void go() {
    }
    public void test() {
        //编译通过
        System.out.println(count);
        go();
        //编译通过
        System.out.println(num);
        run();
    }
}
```

思考：为什么静态方法和非静态方法不能直接相互访问？ 加载顺序的问题！

父类的静态方法可以被子类继承，但是不能被子类重写

```java
public class Person {
    public static void method() {}
}

//编译报错
public class Student extends Person {
    public void method(){}
}

```

```java
public class Person {
    public static void test() {
        System.out.println("Person");
    }
}
//编译通过,但不是重写
public class Student extends Person {
    public static void test(){
        System.out.println("Student");
    }
}
```

```java
//main:
Perosn p = new Student();
p.test();//输出Person
p = new Person();
p.test();//输出Perosn
```

父类的非静态方法不能被子类重写为静态方法 ；

```java
public class Person {
    public void test() {
        System.out.println("Person");
    }
}
//编译报错
public class Student extends Person {
    public static void test(){
        System.out.println("Student");
    }
}
```

**3、代码块和静态代码块**

【类中可以编写代码块和静态代码块】

```java
public class Person {
    {
        //代码块(匿名代码块)
    }
    static{
        //静态代码块
    }
}
```

【匿名代码块和静态代码块的执行】

因为没有名字,在程序并不能主动调用这些代码块。

匿名代码块是在创建对象的时候自动执行的，并且在构造器执行之前，在静态代码块之后。同时匿名代码块在每次创建对象的时候都会自动执行。

静态代码块是在类加载完成之后就自动执行，并且只执行一次。

注：每个类在第一次被使用的时候就会被加载，并且一般只会加载一次。

```java
public class Student {
    {
        System.out.println("匿名代码块");
    }
    
    static{
        System.out.println("静态代码块");
    }
    
    public Student(){
        System.out.println("构造器");
    }
}
```

```java
//main:
Student s1 = new Student();
Student s2 = new Student();
Student s3 = new Student();
```

输出：

> 静态代码块
> 匿名代码块
> 构造器
>
> 匿名代码块
> 构造器
>
> 匿名代码块
> 构造器

【匿名代码块和静态代码块的作用】

匿名代码块的作用是给对象的成员变量初始化赋值，但是因为构造器也能完成这项工作，所以匿名代码块使用的并不多。

静态代码块的作用是给类中的静态成员变量初始化赋值。

```java
public class Person {
    public static String name;
    static{
        name = "tom";
    }
    public Person(){
        name = "zs";
    }
}
```

> main:
> System.out.println( Person.name ); //tom

**注**：在构造器中给静态变量赋值，并不能保证能赋值成功，因为构造器是在创建对象的时候才指向，但是静态变量可以不创建对象而直接使用类名来访问。

**4、创建和初始化对象的过程**

```java
Student s = new Student();
```

【Student类之前没有进行类加载的过程】

1. 类加载，同时初始化类中静态的属性
2. 执行静态代码块
3. 分配内存空间，同时初始化非静态的属性(赋默认值,0/false/null)
4. 调用Student的父类构造器
5. 对Student中的属性进行显示赋值(如果有的话)
6. 执行匿名代码块
7. 执行构造器
8. 返回内存地址

注：子类中非静态属性的显示赋值是在父类构造器执行完之后和子类中的匿名代码块执行之前的时候

```java
public class Person{
    private String name = "zs";
    public Person() {
        System.out.println("Person构造器");
        print();
    }
    public void print(){
        System.out.println("Person print方法: name = "+name);
    }
}
```

```java
public class Student extends Person{
    private String name = "tom";
    {
        System.out.println("Student匿名代码块");
    }
    static{
        System.out.println("Student静态代码块");
    }
    public Student(){
        System.out.println("Student构造器");
    }
    public void print(){
        System.out.println("student print方法: name = "+name);
    }
    public static void main(String[] args) {
        new Student();
    }
}
```

输出：

>Student静态代码块
>Person构造器
>student print方法: name = null
>Student匿名代码块
>Student构造器

```java
Student s = new Student();
//Student类之前已经进行了类加载
//1.分配内存空间,同时初始化非静态的属性(赋默认值,0/false/null)
//2.调用Student的父类构造器
//3.对Student中的属性进行显示赋值(如果有的话)
//4.执行匿名代码块
//5.执行构造器
//6.返回内存地址
```

**5、静态导入**

静态导包就是java包的静态导入，用import static代替import静态导入包是JDK1.5中的新特性。

意思是导入这个类里的静态方法。

好处：这种方法的好处就是可以简化一些操作，例如打印操作System.out.println(…);就可以将其写入一 个静态方法print(…)，在使用时直接print(…)就可以了。但是这种方法建议在有很多重复调用的时候使用，如果仅有一到两次调用，不如直接写来的方便。

```java
import static java.lang.Math.random;
import static java.lang.Math.PI;

public class Test {
    public static void main(String[] args) {
        //之前是需要Math.random()调用的
        System.out.println(random());
        System.out.println(PI);
    }
}
```

### 2、final修饰符

**1、修饰类**

用final修饰的**类**不能被继承，没有子类

例如：我们是无法写一个类去继承String类，然后对String类型扩展的。因为API中已经被String类定义为final

我们也可以定义final修饰的类:

```java
public final class Action{
    
}

//编译报错
public class Go extends Action{
    
}
```

**2、修饰方法**

用final修饰的**方法**可以被继承，但是不能被子类的重写。

例如：每个类都是Object类的子类，继承了Object中的众多方法，在子类中可以重写toString方法、equals方法等，但是不能重写getClass方法、wait方法等，因为这些方法都是使用fianl修饰的。

我们也可以定义final修饰的方法：

```java
public class Person{
    public final void print(){}
}

//编译报错
public class Student extends Person{
    public void print(){
    }
}
```

**3、修饰变量**

用final修饰的**变量**表示**常量**，只能被赋一次值。使用final修饰的变量也就成了常量了，因为值不会再变了。

【修饰局部变量】

```java
public class Person{
    public void print(final int a){
    //编译报错,不能再次赋值,传参的时候已经赋过了
    a = 1;
    }
}

public class Person{
    public void print(){
        final int a;
        a = 1;
        //编译报错,不能再次赋值
        a = 2;
    }
}
```

【修饰成员变量-非静态成员变量】

```java
public class Person{
    private final int a;
}
/*
只有一次机会,可以给此变量a赋值的位置:
声明的同时赋值
匿名代码块中赋值
构造器中赋值(类中出现的所有构造器都要写)
*/
```

【修饰成员变量-静态成员变量】

```java
public class Person{
    private static final int a;
}
/*
只有一次机会,可以给此变量a赋值的位置:
声明的同时赋值
静态代码块中赋值
*/
```

【修饰引用对象】

```java
final Student s = new Student();
//编译通过
s.setName("tom");
s.setName("zs");

//编译报错,不能修改引用s指向的内存地址
s = new Student();
```

### 3、abstract修饰符

 abstract修饰符可以用来修饰方法也可以修饰类，如果修饰方法，那么该方法就是抽象方法。如果修饰类，那么该类就是抽象类。

**1、抽象类和抽象方法的关系**

抽象类中可以没有抽象方法，但是有抽象方法的类一定要声明为抽象类。

**2、语法**

```java
public abstract class Action{
    public abstract void doSomething();
}

public void doSomething(){...}
```

对于这个普通方法来讲：

"public void doSomething()"这部分是方法的声明。
"{...}"这部分是方法的实现,如果大括号中什么都没写,就叫方法的空实现

声明类的同时，加上abstract修饰符就是抽象类
声明方法的时候，加上abstract修饰符，并且去掉方法的大口号，同时结尾加上分号，该方法就是抽象方法。

### 3、特点及作用

抽象类，不能使用new关键字来创建对象，它是用来让子类继承的。 
抽象方法，只有方法的声明，没有方法的实现，它是用来让子类实现的。

注：子类继承抽象类后，需要实现抽象类中没有实现的抽象方法，否则这个子类也要声明为抽象类。

```java
public abstract class Action{
    public abstract void doSomething();
}

main:
//编译报错,抽象类不能new对象
Action a = new Action();

//子类继承抽象类
public class Eat extends Action{
    //实现父类中没有实现的抽象方法
    public void doSomething(){
        //code
    }
}

main:
Action a = new Eat();
a.doSomething();
```

注：子类继承抽象类，那么就必须要实现抽象类没有实现的抽象方法，否则该子类也要声明为抽象类。

**4、思考**

思考1 : 抽象类不能new对象，那么抽象类中有没有构造器？

> 抽象类是不能被实例化，抽象类的目的就是为实现多态中的共同点，抽象类的构造器会在子类实例化时调用，因此它也是用来实现多态中的共同点构造，不建议这样使用！

思考2 : 抽象类和抽象方法意义（为什么要编写抽象类、抽象方法）

> 打个比方，要做一个游戏。如果要创建一个角色，如果反复创建类和方法会很繁琐和麻烦。建一个抽象类
> 后。若要创建角色可直接继承抽象类中的字段和方法，而抽象类中又有抽象方法。如果一个角色有很多种
> 职业，每个职业又有很多技能，要是依次实例这些技能方法会显得想当笨拙。定义抽象方法，在需要时继
> 承后重写调用，可以省去很多代码。
>
> 总之抽象类和抽象方法起到一个框架作用。很方便后期的调用和重写
> 抽象方法是为了程序的可扩展性。重写抽象方法时即可实现同名方法但又非同目的的要求。

## 接口

### 1、接口的本质

普通类：只有具体实现
抽象类：具体实现和规范(抽象方法) 都有！
接口：只有规范！

**为什么需要接口？接口和抽象类的区别？**

- 接口就是比“抽象类”还“抽象”的“抽象类”，可以更加规范的对子类进行约束。全面地专业地实现了：规范和具体实现的分离。
- 抽象类还提供某些具体实现，接口不提供任何实现，接口中所有方法都是抽象方法。接口是完全面向规范的，规定了一批类具有的公共方法规范。
- 从接口的实现者角度看，接口定义了可以向外部提供的服务。
- 从接口的调用者角度看，接口定义了实现者能提供那些服务。
- 接口是两个模块之间通信的标准，通信的规范。如果能把你要设计的系统之间模块之间的接口定义好，就相当于完成了系统的设计大纲，剩下的就是添砖加瓦的具体实现了。大家在工作以后，做系统时往往就是使用“面向接口”的思想来设计系统。

**接口的本质探讨**

- 接口就是规范，定义的是一组规则，体现了现实世界中”如果你是…则必须能…“的思想。如果你是天使，则必须能飞。如果你是汽车，则必须能跑。
- 接口的本质是契约，就像我们人间的法律一样。制定好后大家都遵守。
- OO的精髓，是对对象的抽象，最能体现这一点的就是接口。为什么我们讨论设计模式都只针对具备了抽象能力的语言（比如c++、java、c#等），就是因为设计模式所研究的，实际上就是如何合理的去抽象。

### 2、接口与抽象类的区别

抽象类也是类，除了可以写抽象方法以及不能直接new对象之外，其他的和普通类没有什么不一样的。接口已经另一种类型了，和类是有本质的区别的，所以不能用类的标准去衡量接口。

**声明类的关键字是class，声明接口的关键字是interface。**

抽象类是用来被继承的，java中的类是单继承。

类A继承了抽象类B，那么类A的对象就属于B类型了，可以使用多态
一个父类的引用，可以指向这个父类的任意子类对象
注：继承的关键字是extends

接口是用来被类实现的，java中的接口可以被多实现。
类A实现接口B、C、D、E..，那么类A的对象就属于B、C、D、E等类型了，可以使用多态
一个接口的引用，可以指向这个接口的任意实现类对象
注：实现的关键字是implements

### 3、接口中的方法都是抽象方法

接口中可以不写任何方法，但如果写方法了，该方法必须是抽象方法

```java
public interface Action{
    public abstract void run();
    
    //默认就是public abstract修饰的
    void test();
    public void go();
}
```

### 4、接口中的变量都是静态常量

public static final修饰

接口中可以不写任何属性，但如果写属性了，该属性必须是public static final修饰的静态常量。
注：可以直接使用接口名访问其属性。因为是public static修饰的

注：声明的同时就必须赋值(因为接口中不能编写静态代码块)

```java
public interface Action{
    public static final String NAME = "tom";
    //默认就是public static final修饰的
    int AGE = 20;
}

main:
System.out.println(Action.NAME);
System.out.println(Action.AGE);
```

### 5、一个类可以实现多个接口

```java
public class Student implements A,B,C,D{
    //Student需要实现接口A B C D中所有的抽象方法
    //否则Student类就要声明为抽象类,因为有抽象方法没实现
}

main:
A s1 = new Student();
B s2 = new Student();
C s3 = new Student();
D s4 = new Student();
```

注：
s1只能调用接口A中声明的方法以及Object中的方法
s2只能调用接口B中声明的方法以及Object中的方法
s3只能调用接口C中声明的方法以及Object中的方法
s4只能调用接口D中声明的方法以及Object中的方法

注：必要时可以类型强制转换

例如 : 接口A 中有test() ， 接口B 中有run()

### 6、一个接口可以继承多个父接口

```java
public interface A{
    public void testA();
}

public interface B{
    public void testB();
}

//接口C把接口A B中的方法都继承过来了
public interface C extends A,B{
    public void testC();
}

//Student相当于实现了A B C三个接口,需要实现所有的抽象方法
//Student的对象也就同时属于A类型 B类型 C类型
public class Student implements C{
    public viod testA(){}
    public viod testB(){}
    public viod testC(){}
}

main:

C o = new Student();
System.out.println(o instanceof A);//true
System.out.println(o instanceof B);//true
System.out.println(o instanceof C);//true
System.out.println(o instanceof Student);//true
System.out.println(o instanceof Object);//true
System.out.println(o instanceof Teacher);//false

//编译报错
System.out.println(o instanceof String);
```

注：System.out.println(o instanceof X);

> 如果o是一个接口类型声明的变量，那么只要X不是一个final修饰的类，该代码就能通过编译，至于其结果是不是true，就要看变量o指向的对象的实际类型，是不是X的子类或者实现类了。

注：一个引用所指向的对象，是有可能实现任何一个接口的。(java中的多实现)

### 7、接口的作用

接口的最主要的作用是达到统一访问，就是在创建对象的时候用接口创建

【接口名】 【对象名】= new 【实现接口的类】

这样你像用哪个类的对象就可以new哪个对象了，不需要改原来的代码。

假如我们两个类中都有个function()的方法，如果我用接口，那样我new a()；就是用a的方法，new b() 就是用b的方法。

这个就叫统一访问，因为你实现这个接口的类的方法名相同，但是实现内容不同

总结：

1. Java接口中的成员变量默认都是public,static,final类型的(都可省略)，必须被显示初始化，即接口中的成员变量为常量(大写,单词之间用"_"分隔)
2. Java接口中的方法默认都是public,abstract类型的(都可省略)，没有方法体,不能被实例化
3. Java接口中只能包含public,static,final类型的成员变量和public,abstract类型的成员方法
4. 接口中没有构造方法,不能被实例化
5. 一个接口不能实现(implements)另一个接口,但它可以继承多个其它的接口
6. Java接口必须通过类来实现它的抽象方法
7. 当类实现了某个Java接口时，它必须实现接口中的所有抽象方法，否则这个类必须声明为抽象类
8. 不允许创建接口的实例（实例化），但允许定义接口类型的引用变量，该引用变量引用实现了这个接口的类的实例
9. 一个类只能继承一个直接的父类，但可以实现多个接口，间接的实现了多继承。

```java
interface SwimInterface{
    void swim();
}

class Fish{
    int fins=4;
}

class Duck {
    int leg=2;
    void egg(){};
}

class Goldfish extends Fish implements SwimInterface {
    @Override
    public void swim() {
        System.out.println("Goldfish can swim ");
    }
}

class SmallDuck extends Duck implements SwimInterface {
    public void egg(){
        System.out.println("SmallDuck can lay eggs ");
    }
    @Override
    public void swim() {
  	  System.out.println("SmallDuck can swim ");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Goldfish goldfish=new Goldfish();
        goldfish.swim();
        
        SmallDuck smallDuck= new SmallDuck();
        smallDuck.swim();
        smallDuck.egg();
    }
}
```

## 内部类

上一小节，我们学习了接口，在以后的工作中接口是我们经常要碰到的，所以一定要多去回顾。接下来介绍一下内部类。很多时候我们创建类的对象的时候并不需要使用很多次，每次只使用一次，这个时候我们就可以使用内部类了。

### 1、内部类概述

内部类就是在一个类的内部在定义一个类，比如，A类中定义一个B类，那么B类相对A类来说就称为内部类，而A类相对B类来说就是外部类了。

内部类不是在一个java源文件中编写俩个平行的俩个类，而是在一个类的内部再定义另外一个类。 我们可以把外边的类称为外部类，在其内部编写的类称为内部类。

内部类分为四种：

1. 成员内部类
2. 静态内部类
3. 局部内部类
4.  匿名内部类

### 2、成员内部类

**成员内部类（实例内部类、非静态内部类）**

注：成员内部类中不能写静态属性和方法

【定义一个内部类】

```java
//在A类中申明了一个B类，此B类就在A的内部，并且在成员变量的位置上，所以就称为成员内部类
public class Outer {
    private int id;
    public void out(){
        System.out.println("这是外部类方法");
    }
    
    class Inner{
        public void in(){
     	   System.out.println("这是内部类方法");
        }
    }
}
```

【实例化内部类】

实例化内部类，首先需要实例化外部类，通过外部类去调用内部类

```java
public class Outer {
    private int id;
    public void out(){
  	  System.out.println("这是外部类方法");
    }
    
    class Inner{
        public void in(){
        System.out.println("这是内部类方法");
    }
    }
}

public class Test{
    public static void main(String[] args) {
        //实例化成员内部类分两步
        //1、实例化外部类
        Outer outObject = new Outer();
        //2、通过外部类调用内部类
        Outer.Inner inObject = outObject.new Inner();
        //测试，调用内部类中的方法
        inObject.in();//打印：这是内部类方法
    }
}
```

分析：想想如果你要使用一个类中方法或者属性，你就必须要先有该类的一个对象，同理，一个类在另 一个类的内部，那么想要使用这个内部类，就必须先要有外部类的一个实例对象，然后在通过该对象去使用内部类。

【成员内部类能干什么？】

- 访问外部类的所有属性(这里的属性包括私有的成员变量，方法)

```java
public class Outer {
    private int id;
    public void out(){
        System.out.println("这是外部类方法");
    }
    
    class Inner{
        public void in(){
            System.out.println("这是内部类方法");
        }
        //内部类访问外部类私有的成员变量
        public void useId(){
            System.out.println(id+3);。
        }
        //内部类访问外部类的方法
        public void useOut(){
            out();
        }
    }
}

public class Test{
    public static void main(String[] args) {
        //实例化成员内部类分两步
        //1、实例化外部类
        Outer outObject = new Outer();
        //2、通过外部类调用内部类
        Outer.Inner inObject = outObject.new Inner();
        //测试
        inObject.useId();//打印3，因为id初始化值为0，0+3就为3，其中在内部类就使用了外部类的私有成员变量id。
        inObject.useOut();//打印：这是外部类方法
    }
}
```

- 如果内部类中的变量名和外部类的成员变量名一样，要通过创建外部类对象"."属性来访问外部类属性，通过this.属性访问内部类成员属性

```java
public class Outer {
    private int id;//默认初始化0

    public void out() {
        System.out.println("这是外部类方法");
    }

    class Inner {
        private int id = 8; //这个id跟外部类的属性id名称一样。

        public void in() {
            System.out.println("这是内部类方法");
        }

        public void test() {
            System.out.println(id);//输出8，内部类中的变量会暂时将外部类的成员变量给隐藏
            // 如何调用外部类的成员变量呢？通过Outer.this
            // 想要知道为什么能通过这个来调用，就得明白下面这个原理
            // 想实例化内部类对象，就必须通过外部类对象，当外部类对象来new出内部类对象时，会把自己(外部类对象)的引用传到了内部类中，
            // 所以内部类就可以通过Outer.this来访问外部类的属性和方法
            // 到这里，你也就可以知道为什么内部类可以访问外部类的属性和方法，这里由于有两个相同的属性名称，

            // 所以需要显示的用Outer.this来调用外部类的属性，平常如果属性名不重复
            // 那么我们在内部类中调用外部类的属性和方法时，前面就隐式的调用了Outer.this。
            System.out.println(Outer.this.id);//输出外部类的属性id。也就是输出0
        }
    }
}
```

借助成员内部类，来总结内部类(包括4种内部类)的通用用法：

1. 要想访问内部类中的内容，必须通过外部类对象来实例化内部类。

2. 能够访问外部类所有的属性和方法，原理就是在通过外部类对象实例化内部类对象时，外部类对象把自己的引用传进了内部类，使内部类可以用通过Outer.this去调用外部类的属性和方法。

   一般都是隐式调用了，但是当内部类中有属性或者方法名和外部类中的属性或方法名相同的时候，就需要通过显式调用Outer.this了。

【写的一个小例子】

```java
public class MemberInnerClassTest {
    private String name;
    private static int age;

    public void run() {
    }

    public static void go() {
    }

    public class MemberInnerClass {
        private String name;

        //内部类访问外部类
        public void test(String name) {
            System.out.println(name);
            System.out.println(this.name);
            System.out.println(MemberInnerClassTest.this.name);
            System.out.println(MemberInnerClassTest.age);
            MemberInnerClassTest.this.run();
            MemberInnerClassTest.go();
        }
    }

    //外部类访问成员内部类
    //成员内部类的对象要 依赖于外部类的对象的存在
    public void test() {
        //MemberInnerClass mic = MemberInnerClassTest.this.new MemberInnerClass();
        //MemberInnerClass mic = this.new MemberInnerClass();
        MemberInnerClass mic = new MemberInnerClass();
        mic.name = "tom";
        mic.test("hua");
    }

    public static void main(String[] args) {
        //MemberInnerClass mic = new MemberInnerClass();这个是不行的，this是动态的。
        //所以要使用要先创建外部类对象，才能使用
        MemberInnerClassTest out = new MemberInnerClassTest();
        MemberInnerClass mic = out.new MemberInnerClass();
        //如果内部类是private,则不能访问，只能铜鼓内部方法来调用内部类
        mic.name = "jik";
        mic.test("kkk");
    }
}
```

### 3、静态内部类

看到名字就知道，使用static修饰的内部类就叫静态内部类。

既然提到了static，那我们就来复习一下它的用法：一般只修饰变量和方法，平常不可以修饰类，但是内部类却可以被static修饰。

1. static修饰成员变量：整个类的实例共享静态变量
2. static修饰方法：静态方法，只能够访问用static修饰的属性或方法，而非静态方法可以访问static修饰的方法或属性
3. 被static修饰了的成员变量和方法能直接被类名调用。
4. static不能修饰局部变量，切记，不要搞混淆了，static平常就用来修饰成员变量和方法。

例子：

```java
public class StaticInnerClassTest {

    private String name;
    private static int age;

    public void run() {
    }

    public static void go() {
    }

    //外部类访问静态内部类
    public void test() {
        StaticInnerClass sic = new StaticInnerClass(); //静态的内部类不需要依赖外部类，所以不用this
        sic.name = "tom";

        sic.test1("jack");
        StaticInnerClass.age = 10;
        StaticInnerClass.test2("xixi");
    }

    private static class StaticInnerClass {
        private String name;
        private static int age;

        public void test1(String name) {
            System.out.println(name);
            System.out.println(this.name);
            System.out.println(StaticInnerClass.age);
            System.out.println(StaticInnerClassTest.age);
            //System.out.println(StaticInnerClassTest.this.name);静态类不能访问非静态属性
            StaticInnerClassTest.go();
            //StaticInnerClassTest.this.run();静态类不能访问非静态方法
        }

        public static void test2(String name) {
            //只能访问自己和外部类的静态属性和方法
            System.out.println(name);
            //System.out.println(this.name);静态方法里面连自己类的非静态属性都不能访问
            System.out.println(StaticInnerClass.age);
            System.out.println(StaticInnerClassTest.age);
            //System.out.println(StaticInnerClassTest.this.name);静态方法不能访问非静态属性
            StaticInnerClassTest.go();
            //StaticInnerClassTest.this.run();静态方法不能访问非静态方法
        }
    }
}
```

注意：

1. 我们上面说的内部类能够调用外部类的方法和属性，在静态内部类中就行了，因为静态内部类没有 了指向外部类对象的引用。除非外部类中的方法或者属性也是静态的。这就回归到了static关键字的用法。

2. 静态内部类能够直接被外部类给实例化，不需要使用外部类对象

   ```jav
   Outer.Inner inner = new Outer.Inner();
   ```

3. 静态内部类中可以声明静态方法和静态变量，但是非静态内部类中就不可以声明静态方法和静态变量

### 4、局部内部类

局部内部类是在一个方法内部声明的一个类
局部内部类中可以访问外部类的成员变量及方法
局部内部类中如果要访问该内部类所在方法中的局部变量，那么这个局部变量就必须是final修饰的

```java
public class Outer {
    private int id;

    //在method01方法中有一个Inner内部类，这个内部类就称为局部内部类
    public void method01() {
        class Inner {
            public void in() {
                System.out.println("这是局部内部类");
            }
        }
    }
}
```

局部内部类一般的作用跟在成员内部类中总结的差不多，但是有两个要注意的地方：

**1、在局部内部类中，如果要访问局部变量，那么该局部变量要用final修饰**

为什么需要使用final？

final修饰变量：变为常量，会在常量池中放着，逆向思维想这个问题，如果不实用final修饰，当局部内部类被实例化后，方法弹栈，局部变量随着跟着消失，这个时候局部内部类对象在想去调用该局部变量，就会报错，因为该局部变量已经没了，当局部变量用fanal修饰后，就会将其加入常量池中，即使方法弹栈了，该局部变量还在常量池中呆着，局部内部类也就是够调用。所以局部内部类想要调用局部变 量时，需要使用final修饰，不使用，编译度通不过。

```java
public class Outer {
    private int id;

    public void method01() {
        //这个就是局部变量cid。要让局部内部类使用，就得变为final并且赋值，如果不使用final修饰，就会报错
        final int cid = 3;
        class Inner {
            //内部类的第一个方法
            public void in() {
                System.out.println("这是局部内部类");
            }

            //内部类中的使用局部变量cid的方法
            public void useCid() {
                System.out.println(cid);
            }
        }
    }
}
```

**2、局部内部类不能通过外部类对象直接实例化，而是在方法中实例化出自己来，然后通过内部类对象 调用自己类中的方法。**

看下面例子就知道如何用了。

```java
public class Outer {
    private int id;

    public void out() {
        System.out.println("外部类方法");
    }

    public void method01() {
        class Inner {
            public void in() {
                System.out.println("这是局部内部类");
            }
        }
        //关键在这里，如需要在method01方法中自己创建内部类实例，
        // 然后调用内部类中的方法，等待外部类调用method01方法，
        // 就可以执行到内部类中的方法了。
        Inner In = new Inner();
        In.in();
    }
}
```

使用局部内部类需要注意的地方就刚才上面说的：

1. 在局部内部类中，如果要访问局部变量，那么该局部变量要用final修饰

2. 如何调用局部内部类方法。

   ```java
   public class LocalInnerClassTest {
       private String name;
       private static int age;
   
       public void run() {
       }
   
       public static void go() {
       }
   
       //局部内部类要定义在方法中
       public void test() {
           final String myname = "";
           class LocalInnerClass {
               private String name;
   
               // private static int age;不能定义静态属性
               public void test(String name) {
                   System.out.println(name);
                   System.out.println(this.name);
                   System.out.println(myname);
                   System.out.println(LocalInnerClassTest.this.name);
                   LocalInnerClassTest.this.run();
                   LocalInnerClassTest.go();
               }
           }
           // 局部内部类只能在自己的方法中用
           // 因为局部内部类相当于一个局部变量，出了方法就找不到了。
           LocalInnerClass lic = new LocalInnerClass();
           lic.name = "tom";
           lic.test("test");
           
       }
       
   }
   ```

   

### 5、匿名内部类

在这四种内部类中，以后的工作可能遇到最多的是匿名内部类，所以说匿名内部类是最常用的一种 内部类。

什么是匿名对象？如果一个对象只要使用一次，那么我们就是需要new Object().method()。 就可以了，而不需要给这个实例保存到该类型变量中去。这就是匿名对象。

```java
public class Test {
    public static void main(String[] args) {
        //讲new出来的Apple实例赋给apple变量保存起来，但是我们只需要用一次，就可以这样写
        Apple apple = new Apple();
        apple.eat();
        //这种就叫做匿名对象的使用，不把实例保存到变量中。
        new Apple().eat();
    }
}

class Apple{
    public void eat(){
        System.out.println("我要被吃了");
	}
}
```

匿名内部类跟匿名对象是一个道理：

匿名对象：我只需要用一次，那么我就不用声明一个该类型变量来保存对象了，

匿名内部类：我也只需要用一次，那我就不需要在类中先定义一个内部类，而是等待需要用的时候，我就在临时实现这个内部类，因为用次数少，可能就这一次，那么这样写内部类，更方便。不然先写出一 个内部类的全部实现来，然后就调用它一次，岂不是用完之后就一直将其放在那，那就没必要那样。

1. 匿名内部类需要依托于其他类或者接口来创建
   - 如果依托的是类，那么创建出来的匿名内部类就默认是这个类的子类
   - 如果依托的是接口，那么创建出来的匿名内部类就默认是这个接口的实现类。
2. 匿名内部类的声明必须是在使用new关键字的时候
   - 匿名内部类的声明及创建对象必须一气呵成，并且之后能反复使用，因为没有名字

【示例】

A是一个类(普通类、抽象类都可以)，依托于A类创建一个匿名内部类对象

```java
main:

A a = new A(){
    //实现A中的抽象方法
    //或者重写A中的普通方法
};

注:这个大括号里面其实就是这个内部类的代码,只不过是声明该内部类的同时就是要new创建了其对象,
并且不能反复使用,因为没有名字。
    
例如:
B是一个接口，依托于B接口创建一个匿名内部类对象

B b = new B(){
	//实现B中的抽象方法
};
```

1. 匿名内部类除了依托的类或接口之外，不能指定继承或者实现其他类或接口，同时也不能被其他类所继承，因为没有名字。
2. 匿名内部中，我们不能写出其构造器，因为没有名字。
3. 匿名内部中，除了重写上面的方法外，一般不会再写其他独有的方法，因为从外部不能直接调用到。(间接是调用到的)

```java
public interface Work{
    void doWork();
}

public class AnonymousOutterClass{
    private String name;
    private static int age;
    public void say(){}
    public static void go(){}
    
    public void test(){
        final int i = 90;
        
        Work w = new Work(){
            public void doWork(){
                System.out.println(AnonymousOutterClass.this.name);
                System.out.println(AnonymousOutterClass.age);
                AnonymousOutterClass.this.say();
                AnonymousOutterClass.go();
                
                System.out.println(i);
            }
        };
        w.doWork();
    }
}
```

我们可以试一下不 用匿名内部类 和 用匿名内部类 实现一个接口中的方法的区别

【不用匿名内部类】

```java
public class Test {
    public static void main(String[] args) {
        // 如果我们需要使用接口中的方法，我们就需要走3步，
        // 1、实现接口 2、创建实现接口类的实例对象 3、通过对象调用方法
        //第二步
        Test02 test = new Test02();
        //第三步
        test.method();
    }
}

//接口Test1
interface Test01{
    public void method();
}

//第一步、实现Test01接口
class Test02 implements Test01{
    @Override
    public void method() {
        System.out.println("实现了Test接口的方法");
    }
}
```

【使用匿名内部类】

```java
public class Test {
    public static void main(String[] args) {
		//如果我们需要使用接口中的方法，我们只需要走一步，就是使用匿名内部类，直接将其类的对象创建出来。
        new Test1(){
            public void method(){
                System.out.println("实现了Test接口的方法");
            }
        }.method();
    }
}

interface Test1{
    public void method();
}
```

解析：

其实只要明白一点，new Test1( ){ 实现接口中方法的代码 }; 

Test1(){...} 这个的作用就是将接口给实现了，只不过这里实现该接口的是一个匿名类，也就是说这个类没名字，只能使用这一次，我们知道了这是一个类， 将其new出来，就能获得一个实现了Test1接口的类的实例对象，通过该实例对象，就能调用该类中的方法了，因为其匿名类是在一个类中实现的，所以叫其匿名内部类。

不要纠结为什么 Test1( ){...} 就相当于实现了Test1接口，这其中的原理等足够强大了，在去学习，不要钻牛角尖，这里就仅仅是需要知道他的作用是什么，做了些什么东西就行。
