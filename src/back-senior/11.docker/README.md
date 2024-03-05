## 3.1、[Docker 安装](https://www.runoob.com/docker/centos-docker-install.html)

------

**使用官方安装脚本自动安装**

安装命令如下：

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

也可以使用yum安装docker（推荐）

```bash
yum install -y docker
```

------

**手动安装**

- 卸载旧版本

较旧的 Docker 版本称为 docker 或 docker-engine 。如果已安装这些程序，请卸载它们以及相关的依赖项。

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

- 安装工具包

在新主机上首次安装 Docker Engine-Community 之前，需要设置 Docker 仓库。之后，您可以从仓库安装和更新 Docker。

安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。

```bash
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

- 设置仓库

使用官方源地址（比较慢，不推荐）

```bash
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

阿里云（推荐）

```bash
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

清华大学源

```bash
sudo yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

- 安装 Docker Engine-Community

安装最新版本的 Docker Engine-Community 和 containerd，或者转到下一步安装特定版本：

```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

如果提示您接受 GPG 密钥，请选是。

> **有多个 Docker 仓库吗？**
>
> 如果启用了多个 Docker 仓库，则在未在 yum install 或 yum update 命令中指定版本的情况下，进行的安装或更新将始终安装最高版本，这可能不适合您的稳定性需求。

Docker 安装完默认未启动。并且已经创建好 docker 用户组，但该用户组下没有用户。

**要安装特定版本的 Docker Engine-Community，请在存储库中列出可用版本，然后选择并安装：**

1、列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序。

```bash
yum list docker-ce --showduplicates | sort -r

docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
```

2、通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：`docker-ce-18.09.1`。

```java
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

启动 Docker。

```
sudo systemctl start docker
```

通过运行 hello-world 镜像来验证是否正确安装了 Docker Engine-Community 。

```
sudo docker run hello-world
```

**卸载 docker**

删除安装包：

```bash
yum remove docker-ce
```

删除镜像、容器、配置文件等内容：

```bash
rm -rf /var/lib/docker
```

## 3.2、[常用命令](https://blog.csdn.net/leilei1366615/article/details/106267225)


个人理解 docker中的镜像 就像是咱们java 中的Class ，而容器呢 是基于这个镜像构建出的实例 类似于咱java 中 根据Class构造出的一个个实例对象 ，本人是初学者 理解有误还请见谅，并麻烦您说说您的看法让彼此相互学习…

按我理解 简言之

    docker 镜像： ----java中 class
    
    docker容器 ： ----java中 class new 出来的实例对象


本篇文章不仅仅是生硬的命令大全，也是我个人对docker学习使用的一步步总结，通过一个个示例来加深各位看官对docker相关命令的理解以及记忆，在有趣的同时穿插知识点，您花费半小时时间，照着我的思路走一遍，一定会有所收获。

### （一）docker 基础命令

**启动docker**

```bash
systemctl start docker
```


**关闭docker**

```bash
systemctl stop docker
```


**重启docker**

```bash
systemctl restart docker
```

**docker设置随服务启动而自启动**

```bash
systemctl enable docker
```


**查看docker 运行状态**

\------如果是在运行中 输入命令后 会看到绿色的active

```bash
systemctl status docker
```


**查看docker 版本号信息**

```bash
docker version
```


```bash
docker info
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png.png)

**docker 帮助命令**

忘记了某些命令便可使用此进行查看与回顾

```bash
docker --help
```


比如 咱忘记了 拉取命令 不知道可以带哪些参数 咱可以这样使用

```bash
docker pull --help
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349641.png)

### （二）docker 镜像命令

**查看自己服务器中docker 镜像列表**

```bash
docker images
```


**搜索镜像**

```bash
docker search 镜像名
docker search --filter=STARS=9000 mysql 搜索 STARS >9000的 mysql 镜像
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349642.png)

**拉取镜像** 不加tag(版本号) 即拉取docker仓库中 该镜像的最新版本latest 加:tag 则是拉取指定版本

```bash
docker pull 镜像名 
docker pull 镜像名:tag
```


拉取最新版 mysql

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349643.png)

咱再来拉取一个指定版本号 镜像 至于版本号呢 可以在docker hub中查看

[docker官方镜像搜索](https://hub.docker.com/search?type=image)

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349654.png)

例如 拉取 mysql 5.7.30 ------------------这里出现了一些小东西 感觉挺新奇的 随着学习深入再回过头来看吧

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349655.png)

为什么提示文件存在 >>>> 请戳： [docker 文件分层与数据卷挂载](https://blog.csdn.net/leilei1366615/article/details/106269231)

**运行镜像** ----咱拉取一个tomcat 跑起来试一试

```bash
docker run 镜像名
docker run 镜像名:Tag
```


**ex：**

```bash
docker pull tomcat

docker run tomcat
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349656.png)

发现咱运行后 出现tomcat 默认占用的8080 端口 说明该镜像已经是启动了 ，但是 咱好像鼠标没有回到咱服务器上了 ，这怎么办呢 ？

使用 `Ctrl+C` （注：此方式虽然可以退出容器，但此种命令操作方式却是错误的，详细缘由请见下文的容器命令）

**docker中 run 命令是十分复杂的 有什么持久运行 映射端口 设置容器别名 数据卷挂载等**

* * *

一通测试，发现我们拉了好多镜像了，但我们现在根本用不着，这些无用镜像怎么删除呢？

**删除镜像** ------当前镜像没有被任何容器使用才可以删除

```bash
#删除一个
docker rmi -f 镜像名/镜像ID

#删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

#删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)
```


**强制删除镜像**

```bash
docker image rm 镜像名称/镜像ID
```


镜像的基础命令就到这里 下方会使用更复杂的 docker run 命令 来根据镜像启动容器

**保存镜像**  
将我们的镜像 保存为tar 压缩文件 这样方便镜像转移和保存 ,然后 可以在任何一台安装了docker的服务器上 加载这个镜像

命令:

```bash
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字
```


exmaple:

```bash
docker save tomcat -o /myimg.tar
```


![](https://gitlab.com/apzs/image/-/raw/master/image/2020061321233250.png)

**保存镜像任务执行完毕，我们来看下指定位置下是否有该tar？**

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlaWxlaTEzNjY2MTU=,size_16,color_FFFFFF,t_70.png)

**加载镜像**  
任何装 docker 的地方加载镜像保存文件,使其恢复为一个镜像

```bash
docker load -i 镜像保存文件位置
```


![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlaWxlaTEzNjY2MTU=,size_16,color_FFFFFF,t_70-16709865349657.png)

**加载文件 恢复为镜像**

![](https://gitlab.com/apzs/image/-/raw/master/image/20200613213225208.png)

**查看镜像 测试镜像功能是否正常**

我们来把解压的镜像 run一下。

![](https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlaWxlaTEzNjY2MTU=,size_16,color_FFFFFF,t_70-16709865349668.png)

**镜像标签**  
有的时候呢，我们需要对一个镜像进行分类或者版本迭代操作，比如我们一个微服务已经打为docker镜像，但是想根据环境进行区分为develop环境与alpha环境，这个时候呢，我们就可以使用Tag，来进对镜像做一个标签添加，从而行进区分；版本迭代逻辑也是一样，根据不同的tag进行区分

```bash
app:1.0.0 基础镜像
# 分离为开发环境
app:develop-1.0.0   
# 分离为alpha环境
app:alpha-1.0.0   
```


```bash
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

docker tag 源镜像名:TAG 想要生成新的镜像名:新的TAG

# 如果省略TAG 则会为镜像默认打上latest TAG
docker tag aaa bbb
# 上方操作等于 docker tag aaa:latest bbb:test
```


ex：

```bash
# 我们根据镜像 quay.io/minio/minio 添加一个新的镜像 名为 aaa 标签Tag设置为1.2.3
docker tag quay.io/minio/minio:1.2.3 aaa:1.2.3

# 我们根据镜像 app-user:1.0.0 添加一个新的镜像 名为 app-user 标签Tag设置为alpha-1.0.0
docker tag app-user:1.0.0 app-user:alpha-1.0.0
```


![](https://gitlab.com/apzs/image/-/raw/master/image/3a312631bd04dbc67a1a1d41560858a8.png)

### （三）docker 容器命令

前言已经说了 docker 容器 就好比 咱java中的new出来对象（docker run 镜像 产生一个该镜像具体容器实例）,docker 容器的启动需要 镜像的支持

先放上 docker 容器查看命令

**查看正在运行容器列表**

```bash
docker ps
```


**查看所有容器** -----包含正在运行 和已停止的

```bash
docker ps -a
```

**容器怎么来呢 可以通过run 镜像 来构建 自己的容器实例**

**运行一个容器**

```bash
# -it 表示 与容器进行交互式启动 -d 表示可后台运行容器 （守护式运行）  --name 给要运行的容器 起的名字  /bin/bash  交互路径
docker run -it -d --name 要取的别名 镜像名:Tag /bin/bash 
```


例如我们要启动一个redis 把它的别名取为redis001 并交互式运行 需要的命令 —我这里指定版本号为5.0.5

```bash
#1. 拉取redis 镜像
docker pull redis:5.0.5
#2.命令启动
docker run -it -d --name redis001 redis:5.0.5 /bin/bash
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-16709865349669.png)

```bash
#3.查看已运行容器
docker ps
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496610.png)

修改容器为自启动

```bash
docker  update --restart=always 容器名
```

发现看到了 redis 使用了6379 端口 那么我们在关闭防火墙或开启了安全组的情况下 是否可以进行访问呢？

为了 区分 咱们使用linux 命令 查看一下

```bash
# netstat是控制台命令,是一个监控TCP/IP网络的非常有用的工具，它可以显示路由表、实际的网络连接以及每一个网络接口设备的状态信息
netstat -untlp
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496611.png)

**惊讶的发现，我们redis容器启动占用的 6379端口netstat 没有显示出来？什么情况？赶紧使用 redis desktop manger 连接测试一下**

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496612.png)

**为什么不行呢 已经确定了 docker 中 redis 容器已经是在运行中 且占有端口 6379啊？**

**因为：占用的6379端口 仅仅是在容器中内部本身的端口,与宿主机的6379端口并无联系，我们通过宿主机Ip:6379访问此redis示例，那自然是找不到的哟！**

* * *

**这里，来补充一点Docker容器的知识！**

**每一个 Docker容器都是独立和安全的应用平台（我们可以理解为，每一个docker容器都相当于在我们的服务器上占用资源然后开辟了属于自己的一个空间（也可以理解为服务器））**

![](https://gitlab.com/apzs/image/-/raw/master/image/d3ffd76e30f032506708efe7608ade2d.png)

**这是Docker 一大特点，每个容器之间环境都是隔离的!!!**

我们甚至可以在一个服务器上，使用docker镜像，来跑出N个 mysql实例（尽管，他们的默认端口都是一样的，但还是那句话，容器间，环境是隔离的。A容器中的3306 与B容器的3306毫无关系，因为其不在一个世界呀!）

**默认情况下，我们是无法通过宿主机（安装docker的服务器）端口来直接访问容器的 ,因为docker容器自己开辟空间的端口与宿主机端口没有联系…**

如果外部想要访问容器，那必须得让容器中的端口与宿主机的端口建立联系绑定起来，这个正式的概念叫做 `容器端口映射`

有了端口映射，我们就可以将宿主机端口与 容器端口绑定起来，比如 我们建立宿主机的6379端口与容器redis6379端口绑定起来，那么再访问宿主机Ip:6379 就可以访问到对应容器了！

接下来 进行 **容器端口映射**演示

首先**停止容器**

```bash
# 先停止咱之前运行的 redis 容器 
docker stop 容器名/容器ID
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496713.png)

然后**删除容器** -----不经意间 咱发现已经运行过这么多容器了 咱进行清理一下

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496714.png)

```bash
#删除一个容器
docker rm -f 容器名/容器ID
#删除多个容器 空格隔开要删除的容器名或容器ID
docker rm -f 容器名/容器ID 容器名/容器ID 容器名/容器ID
#删除全部容器
docker rm -f $(docker ps -aq)
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496715.png)

这样 容器就已经删除完毕了 ，咱们接着弄 前边说的 端口映射

**容器端口与服务器端口映射**

命令：

```bash
-p 宿主机端口:容器端口
```


还是使用前方的 redis 镜像 尝试 将6379端口 映射到服务器的8888 如果成功了的话 那么咱们访问服务器的8888端口就会访问到咱们的 docker 中 的容器 redis002

\-p 8888:6379 解析 将容器内部的 6379端口与docker 宿主机（docker装在哪台服务器 哪台服务器就是宿主机）8888 端口进行映射 那通过外部访问宿主机8888端口 即可访问到 docker 容器 6379 端口了

```bash
docker run -itd --name redis002 -p 8888:6379 redis:5.0.5 /bin/bash
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496716.png)

在运行后 发现服务器的 8888 端口显示已被docker-proxy 所占用了 那么此时咱再用工具进行连接测试呢？

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496717.png)

**那么容器端口映射有没有什么限制呢？**

有的，虽说每个容器之间，环境都是隔离的，但是宿主机每个端口都是一个，8888端口被redis002容器绑定了，那么其他所有的容器都不可以使用8888这个端口了!!!

* * *

有时候，我们需要进入容器内部，修改其配置文件，那么如何才能进入容器内呢？

**进入容器方式一** 这里咱就进入 前面的 redis001容器

```bash
docker exec -it 容器名/容器ID /bin/bash

#进入 前面的 redis001容器   
docker exec -it redis001 /bin/bash
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496718.png)

可以看到 我已经从主机alibyleilei 跳到了容器ID 对应下的 /data 已经是进入到容器内部了

**进入容器方式二** —推荐使用 exec 方式

```bash
docker attach 容器名/容器ID
```


那怎么退出容器呢 ？

**从容器内 退出到自己服务器中** 需注意 两个退出命令的区别

```bash
#-----直接退出  未添加 -d(持久化运行容器) 时 执行此参数 容器会被关闭  
exit
```


```bash
# 优雅退出 --- 无论是否添加-d 参数 执行此命令容器都不会被关闭
Ctrl + p + q
```


**停止容器**

```bash
docker stop 容器ID/容器名
```


**重启容器**

```bash
docker restart 容器ID/容器名
```


**启动容器**

```bash
docker start 容器ID/容器名
```


**kill 容器**

```bash
docker kill 容器ID/容器名
```


**容器文件拷贝** —无论容器是否开启 都可以进行拷贝

```bash
#docker cp 容器ID/名称:文件路径  要拷贝到外部的路径   |     要拷贝到外部的路径  容器ID/名称:文件路径
#从容器内 拷出
docker cp 容器ID/名称: 容器内路径  容器外路径
#从外部 拷贝文件到容器内
docker  cp 容器外路径 容器ID/名称: 容器内路径
```


​    **查看容器日志**

```bash
docker logs -f --tail=要查看末尾多少行 默认all 容器ID
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496719.png)

我们在运维的时候，通常给一些软件喜欢设置开机自启动，例如 mysql、redis,这样测试环境服务器重启时可节省不少运维时间成本，那么我们如果是docker容器 是否也可以设置开机自启动容器呢？

答案是 OKKKKK!

启动容器时，使用docker run命令时 添加参数`--restart=always` 便表示，该容器随docker服务启动而自动启动

ex:

```bash
docker run -itd --name redis002 -p 8888:6379 --restart=always  redis:5.0.5 /bin/bash
```


**这个时候有小伙伴着急了，我都已经启动一个容器好久了，跑了很多数据了，现在才告诉我可以设置自启动？我把容器删了再启动，我数据咋办？？？**

**哎！小伙汁，这个时候不要慌，我告诉你两个办法！**

**方法一：担心数据丢了，这说明你在跑容器的时候没有进行数据挂载吧？？？**

**你问我，什么是数据挂载？**

简单来讲，就是将容器内的数据与外部宿主机文件绑定起来，类似一个双持久化，当容器删除时，宿主机文件数据目录仍在，下次启动容器只要将数据目录指向宿主机数据所在位置即可恢复！

具体请参考：[docker 文件分层与数据卷挂载](https://blog.csdn.net/leilei1366615/article/details/106269231)

命令:

```bash
-v 宿主机文件存储位置:容器内文件位置
```


如此操作，就将 容器内指定文件挂载到了宿主机对应位置，-v命令可以多次使用，即一个容器可以同时挂载多个文件

```bash
-v 宿主机文件存储位置:容器内文件位置 -v 宿主机文件存储位置:容器内文件位置 -v 宿主机文件存储位置:容器内文件位置
```


示例：

```bash
# 运行一个docker redis 容器 进行 端口映射 两个数据卷挂载 设置开机自启动
docker run -d -p 6379:6379 --name redis505 --restart=always  -v /var/lib/redis/data/:/data -v /var/lib/redis/conf/:/usr/local/etc/redis/redis.conf  redis:5.0.5 --requirepass "password"
```


**此方法完了你很无语？那还不是得删容器？是呀！没错！那么为什么你有数据恢复需求而没有想到数据持久化，数据恢复备份，数据卷挂载？自己DEMO的吃亏，是为了平时开发少扣脑壳多摸鱼！**

**方法二：不想删容器，又想让这个容器设置开机自启动，那么我们修改其启动配置即可！**

命令:

```bash
docker  update --restart=always 容器Id 或者 容器名

或

docker container update --restart=always 容器Id 或者 容器名
```


如上，虽然不删容器就设置了自启动需求满足了，但是，危不危险，这个容器有没有需要数据恢复的情况？自己考量吧！！！

**更换容器名**

想给容器换个霸气炫酷吊炸天的名字？

```bash
docker rename 容器ID/容器名 新容器名
```


**ex:**

![](https://gitlab.com/apzs/image/-/raw/master/image/cba7a339ffed1980db842f87276661f3.png)

### （四）自己提交一个镜像

我们运行的容器可能在镜像的基础上做了一些修改，有时候我们希望保存起来，封装成一个更新的镜像，这时候我们就需要使用 commit 命令来构建一个新的镜像

```bash
docker commit -m="提交信息" -a="作者信息" 容器名/容器ID 提交后的镜像名:Tag
```


我们拉取一个tomcat镜像 并持久化运行 且设置与宿主机进行端口映射

```bash
docker pull tomcat

docker run -itd -p8080:8080 --name tom tomcat /bin/bash
```


访问 咱的端口 发现访问404 这是因为咱配置了阿里云镜像后 所拉取得镜像都是最基础班的 仅仅包含其容器必要数据 例如 容器中 vim vi ll 命令都没有

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496720.png)
![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496721.png)

咱们的webapps 下一个文件都没有 ，访问肯定404罗

不断查看 发现咱 webapps.dist 下是有文件的 我们把它拷贝的webapps 下 然后打包成一个新的镜像 后 访问查看是否进入到首页 不进入404页面

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496822.png)

exit 退出容器

使用 提交命令 将在运行的tomcat 容器 打包为一个全新的镜像 名字为tom Tag为1.0

```bash
docker commit -a="leilei" -m="第一次打包镜像，打包后直接访问还会404吗" 231f2eae6896 tom:1.0
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496823.png)  
为了区分 咱停止并删除之前tomcat 的容器  
![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496824.png)

接下来 运行咱自己打包的镜像 tom:1.0

设置容器名字为lei 映射端口为6500:8080

```bash
docker run -d -it  -p6500:8080 --name lei tom:1.0 /bin/bash
```


![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496825.png)

![](https://gitlab.com/apzs/image/-/raw/master/image/format,png-167098653496826.png)

访问6500 端口进入到了 tomcat 首页 说明 咱commit 镜像成功了

### （五）docker 运维命令

可能有时候发布会遇到如下错误:

`docker: write /var/lib/docker/tmp/GetImageBlob325372670: no space left on device`

这个错误是docker在写入的时候报错无机器无空间

![](https://gitlab.com/apzs/image/-/raw/master/image/fbd50d429b6161ccf7d73687bc63ef06.png)

**查看docker工作目录**

```bash
sudo docker info | grep "Docker Root Dir"
```


![](https://gitlab.com/apzs/image/-/raw/master/image/9e6acfeb2e77bb2d25e63a7c1bff7709.png)

**查看docker磁盘占用总体情况**

```bash
du -hs /var/lib/docker/ 
```


**查看Docker的磁盘使用具体情况**

```bash
docker system df
```


![](https://gitlab.com/apzs/image/-/raw/master/image/a33dbf0f51a3f2ac179d102466e6517f.png)

**删除 无用的容器和 镜像**

```bash
#  删除异常停止的容器
docker rm `docker ps -a | grep Exited | awk '{print $1}'` 
 
#  删除名称或标签为none的镜像
docker rmi -f  `docker images | grep '<none>' | awk '{print $3}'`
```


**清除所有无容器使用的镜像**

注意，此命令只要是镜像无容器使用（容器正常运行）都会被删除，包括容器临时停止

```bash
docker system prune -a
```


**查找大文件**

```bash
find / -type f -size +100M -print0 | xargs -0 du -h | sort -nr
```


![](https://gitlab.com/apzs/image/-/raw/master/image/f19ff29dbc1a1cd739f26dd9e69d2f96.png)

**查找指定docker使用目录下大于指定大小文件**

```
find / -type f -size +100M -print0 | xargs -0 du -h | sort -nr |grep '/var/lib/docker/overlay2/*'
```


ex：我这里是查找 /var/lib/docker/overlay2/\* 开头的且大于100m的文件

![](https://gitlab.com/apzs/image/-/raw/master/image/5b95b414c6fa466b71ea2c507019df8d.png)

**如果看到了这里，大兄弟，你的docker便是入门了；但前路还长，让我们再继续深入，攀登技术的高峰吧，记得点个关注哟！**

### （六）手动部署jar文件

目录结构：

![image-20221215161858131](https://gitlab.com/apzs/image/-/raw/master/image/image-20221215161858131.png)

`Dockerfile`文件

```dockerfile
# 基础镜像为centos
FROM centos:centos7

# 作者
MAINTAINER apzs

# 为Dockerfile中所有RUN、CMD、ENTRYPOINT、COPY和ADD指令设定工作目录
WORKDIR /usr/local/mydata

# 添加jdk压缩包至 /usr/local 目录，压缩包会自动解压，解压后目录名称为jdk1.8.0_101 (如果不知道名字，可以在自己电脑上先把tar.gz这个文件解压，即可看到命名为 jdk1.8.0_101 )
ADD jdk-8u101-linux-x64.tar.gz /usr/local/env/jdk/

# 配置JAVA_HOME环境变量
ENV JAVA_HOME /usr/local/env/jdk/jdk1.8.0_101/
 
# 将JAVA_HOME/bin 添加至PATH环境变量
ENV PATH $JAVA_HOME/bin:$PATH

# 将这两个文件移动到指定目录
ADD librxtxSerial.so $JAVA_HOME/jre/lib/amd64
ADD RXTXcomm.jar $JAVA_HOME/jre/lib/ext

# 开放的端口
EXPOSE 8080

# VOLUME 指定了临时文件目录为/env/jdk/tmp
# 其效果是在主机 /var/lib/docker 目录下创建了一个临时文件，并链接到容器的/env/jdk/tmp
VOLUME /env/jdk/tmp

# 把本路径的sensor.jar复制到相对于相对于WORKDIR的位置(即/usr/local/mydata/sensor.jar)
COPY sensor.jar sensor.jar

# 容器启动时执行的命令(sensor.jar相对于WORKDIR,即/usr/local/mydata/sensor.jar)
ENTRYPOINT ["java","-jar","sensor.jar"]

# 安装vim
# RUN yum -y install vim
```

构建镜像命令(`.`表示寻找当前目录的Dockerfile文件)

```bash
docker build -f ./Dockerfile -t sensorImage .
```

创建容器

如果docker部署`spring boot`应用需要连接`mysql`不能使用`127.0.0.1`连接，这是因为docker部署的`spring boot`应用也是一个小型的`linux`虚拟机，因此不能访问外面的宿主机（即安装`docker`应用的主机）因此可以在`spring.datasource.url`里配置域名访问，然后创建容器时指定在`Hosts`文件添加域名映射 (相当于让yml里指定的`jdbc:mysql://www.sensor.com:3306/tonrain`找到真正的ip)

```bash
docker run --name sensor --add-host www.sensor.com:192.168.56.10 -p 8080:8080 -d sensorImage
```

或者通过设置`Environment`添加启动参数（启动参数配置比yml里的配置优先级高）

```bash
docker run --name sensor -e spring.datasource.url='jdbc:mysql://192.168.56.10:3306/tonrain?useSSL=false' -p 8080:8080 -d sensorImage
```

**导出镜像**

```bash
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字
```


exmaple:

```bash
docker save tomcat -o /myimg.tar
```

**导入镜像**

```bash
docker load -i 镜像保存文件位置
```
