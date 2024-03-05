# 八、k8s 集群部署

Kubernetes 简称 k8s。是用于自动部署，扩展和管理容器化应用程序的开源系统。 

中文官网：https://kubernetes.io/zh/ 

中文社区：https://www.kubernetes.org.cn/ 

官方文档：https://kubernetes.io/zh/docs/home/ 

社区文档：http://docs.kubernetes.org.cn

## 8.1、基础知识

### 8.1.1、[概述 | Kubernetes](https://kubernetes.io/zh-cn/docs/concepts/overview/)

Kubernetes 是一个可移植、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化。 Kubernetes 拥有一个庞大且快速增长的生态，其服务、支持和工具的使用范围相当广泛。

**Kubernetes** 这个名字源于希腊语，意为“舵手”或“飞行员”。k8s 这个缩写是因为 k 和 s 之间有八个字符的关系。 Google 在 2014 年开源了 Kubernetes 项目。 Kubernetes 建立在 [Google 大规模运行生产工作负载十几年经验](https://research.google/pubs/pub43438)的基础上， 结合了社区中最优秀的想法和实践。

#### 1、时光回溯

让我们回顾一下为何 Kubernetes 能够裨益四方。

![部署演进](https://gitlab.com/apzs/image/-/raw/master/image/8.1.1.1.svg)

##### **传统部署时代：**

早期，各个组织是在物理服务器上运行应用程序。 由于无法限制在物理服务器中运行的应用程序资源使用，因此会导致资源分配问题。 例如，如果在同一台物理服务器上运行多个应用程序， 则可能会出现一个应用程序占用大部分资源的情况，而导致其他应用程序的性能下降。 一种解决方案是将每个应用程序都运行在不同的物理服务器上， 但是当某个应用程式资源利用率不高时，剩余资源无法被分配给其他应用程式， 而且维护许多物理服务器的成本很高。

##### **虚拟化部署时代：**

因此，虚拟化技术被引入了。虚拟化技术允许你在单个物理服务器的 CPU 上运行多台虚拟机（VM）。 虚拟化能使应用程序在不同 VM 之间被彼此隔离，且能提供一定程度的安全性， 因为一个应用程序的信息不能被另一应用程序随意访问。

虚拟化技术能够更好地利用物理服务器的资源，并且因为可轻松地添加或更新应用程序， 而因此可以具有更高的可扩缩性，以及降低硬件成本等等的好处。 通过虚拟化，你可以将一组物理资源呈现为可丢弃的虚拟机集群。

每个 VM 是一台完整的计算机，在虚拟化硬件之上运行所有组件，包括其自己的操作系统。

##### **容器部署时代：**

容器类似于 VM，但是更宽松的隔离特性，使容器之间可以共享操作系统（OS）。 因此，容器比起 VM 被认为是更轻量级的。且与 VM 类似，每个容器都具有自己的文件系统、CPU、内存、进程空间等。 由于它们与基础架构分离，因此可以跨云和 OS 发行版本进行移植。

容器因具有许多优势而变得流行起来，例如：

- 敏捷应用程序的创建和部署：与使用 VM 镜像相比，提高了容器镜像创建的简便性和效率。
- 持续开发、集成和部署：通过快速简单的回滚（由于镜像不可变性）， 提供可靠且频繁的容器镜像构建和部署。
- 关注开发与运维的分离：在构建、发布时创建应用程序容器镜像，而不是在部署时， 从而将应用程序与基础架构分离。
- 可观察性：不仅可以显示 OS 级别的信息和指标，还可以显示应用程序的运行状况和其他指标信号。
- 跨开发、测试和生产的环境一致性：在笔记本计算机上也可以和在云中运行一样的应用程序。
- 跨云和操作系统发行版本的可移植性：可在 Ubuntu、RHEL、CoreOS、本地、 Google Kubernetes Engine 和其他任何地方运行。
- 以应用程序为中心的管理：提高抽象级别，从在虚拟硬件上运行 OS 到使用逻辑资源在 OS 上运行应用程序。
- 松散耦合、分布式、弹性、解放的微服务：应用程序被分解成较小的独立部分， 并且可以动态部署和管理 - 而不是在一台大型单机上整体运行。
- 资源隔离：可预测的应用程序性能。
- 资源利用：高效率和高密度。

#### 2、为什么需要 Kubernetes，它能做什么？

容器是打包和运行应用程序的好方式。在生产环境中， 你需要管理运行着应用程序的容器，并确保服务不会下线。 例如，如果一个容器发生故障，则你需要启动另一个容器。 如果此行为交由给系统处理，是不是会更容易一些？

这就是 Kubernetes 要来做的事情！ Kubernetes 为你提供了一个可弹性运行分布式系统的框架。 Kubernetes 会满足你的扩展要求、故障转移你的应用、提供部署模式等。 例如，Kubernetes 可以轻松管理系统的 Canary 部署。

Kubernetes 为你提供：

- **服务发现和负载均衡**

  Kubernetes 可以使用 DNS 名称或自己的 IP 地址来曝露容器。 如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。

- **存储编排**

  Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。

- **自动部署和回滚**

  你可以使用 Kubernetes 描述已部署容器的所需状态， 它可以以受控的速率将实际状态更改为期望状态。 例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器。

- **自动完成装箱计算**

  你为 Kubernetes 提供许多节点组成的集群，在这个集群上运行容器化的任务。 你告诉 Kubernetes 每个容器需要多少 CPU 和内存 (RAM)。 Kubernetes 可以将这些容器按实际情况调度到你的节点上，以最佳方式利用你的资源。

- **自我修复**

  Kubernetes 将重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器， 并且在准备好服务之前不将其通告给客户端。

- **密钥与配置管理**

  Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。

#### 3、Kubernetes 不是什么

Kubernetes 不是传统的、包罗万象的 PaaS（平台即服务）系统。 由于 Kubernetes 是在容器级别运行，而非在硬件级别，它提供了 PaaS 产品共有的一些普遍适用的功能， 例如部署、扩展、负载均衡，允许用户集成他们的日志记录、监控和警报方案。 但是，Kubernetes 不是单体式（monolithic）系统，那些默认解决方案都是可选、可插拔的。 Kubernetes 为构建开发人员平台提供了基础，但是在重要的地方保留了用户选择权，能有更高的灵活性。

Kubernetes：

- 不限制支持的应用程序类型。 Kubernetes 旨在支持极其多种多样的工作负载，包括无状态、有状态和数据处理工作负载。 如果应用程序可以在容器中运行，那么它应该可以在 Kubernetes 上很好地运行。
- 不部署源代码，也不构建你的应用程序。 持续集成（CI）、交付和部署（CI/CD）工作流取决于组织的文化和偏好以及技术要求。
- 不提供应用程序级别的服务作为内置服务，例如中间件（例如消息中间件）、 数据处理框架（例如 Spark）、数据库（例如 MySQL）、缓存、集群存储系统 （例如 Ceph）。这样的组件可以在 Kubernetes 上运行，并且/或者可以由运行在 Kubernetes 上的应用程序通过可移植机制 （例如[开放服务代理](https://openservicebrokerapi.org/)）来访问。

- 不是日志记录、监视或警报的解决方案。 它集成了一些功能作为概念证明，并提供了收集和导出指标的机制。
- 不提供也不要求配置用的语言、系统（例如 jsonnet），它提供了声明性 API， 该声明性 API 可以由任意形式的声明性规范所构成。
- 不提供也不采用任何全面的机器配置、维护、管理或自我修复系统。
- 此外，Kubernetes 不仅仅是一个编排系统，实际上它消除了编排的需要。 编排的技术定义是执行已定义的工作流程：首先执行 A，然后执行 B，再执行 C。 而 Kubernetes 包含了一组独立可组合的控制过程，可以连续地将当前状态驱动到所提供的预期状态。 你不需要在乎如何从 A 移动到 C，也不需要集中控制，这使得系统更易于使用 且功能更强大、系统更健壮，更为弹性和可扩展。

docker原始方式

![image-20220903154614416](https://gitlab.com/apzs/image/-/raw/master/image/8.1.1.3.1.png)



![image-20220903162454242](https://gitlab.com/apzs/image/-/raw/master/image/8.1.1.3.2.png)

![image-20220903162514364](https://gitlab.com/apzs/image/-/raw/master/image/8.1.1.3.3.png)

![image-20220903162528981](https://gitlab.com/apzs/image/-/raw/master/image/8.1.1.3.4.png)

### 8.1.2、架构

#### 1、整体主从方式

一台服务器成为Master节点，负责管理Node节点。其他服务器成为Node节点（Node节点有运行时环境，包含`kubelet`和`docker`）

![image-20220903155155189](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.1.1.png)

一个`Master`管理多个`Node`，每一个`Node`都是一台服务器。想要操作`Kubernetes`，可以使用`可视化界面`或`命令行`通过`Kubernetes`暴露的`API`给`Master`发送请求，`Master`收到请求后，调度节点进行操作

![image-20220903155644137](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.1.2.png)

#### 2、Master 节点架构

![image-20220903160929236](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.2.png)

- **kube-apiserver**
   - 对外暴露 K8S 的 api 接口，是外界进行资源操作的唯一入口
  - 提供认证、授权、访问控制、API 注册和发现等机制
- **etcd**
  - etcd 是兼具一致性和高可用性的键值数据库，可以作为保存 Kubernetes 所有集群数据的后台数据库。
  - Kubernetes 集群的 etcd 数据库通常需要有个备份计划
- **kube-scheduler**
  - 主节点上的组件，该组件监视那些新创建的未指定运行节点的`Pod`，并选择节点让`Pod`在上面运行。
  - 所有对 k8s 的集群操作，都必须经过主节点进行调度
- **kube-controller-manager**
  - 在主节点上运行控制器的组件
  - 这些控制器包括:
    - 节点控制器（Node Controller）: 负责在节点出现故障时进行通知和响应。
    - 副本控制器（Replication Controller）: 负责为系统中的每个副本控制器对象维护正确数量的 Pod。
    - 端点控制器（Endpoints Controller）: 填充端点(Endpoints)对象(即加入 Service 与 Pod) 。
    - 服务帐户和令牌控制器（Service Account & Token Controllers）: 为新的命名空间创建默认帐户和 API 访问令牌

假设想要部署一个应用，给`Kubernetes`发送一个命令，指明我们想要部署一个应用。`API Server`收到以后，先把部署的信息存到`etcd`里，由`Scheduler`负责拿到存储在`etcd`的信息，然后进行调度。

#### 3、Node 节点架构

![image-20220903162558381](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.3.png)

- **kubelet**
  - 一个在集群中每个节点上运行的代理。它保证容器都运行在 Pod 中。(一个或多个有关联的容器可以成为一个Pod)
  - 负责维护容器的生命周期，同时也负责 Volume卷（CSI）和网络（CNI）的管理；
- **kube-proxy**
  - 负责为 Service 提供 cluster 内部的服务发现和负载均衡；(所有和网络相关的都是由kube-proxy代理。比如想访问Pod，所有的访问请求就会交给`kube-proxy`，`kube-proxy`负责帮我们查看`Pod`在哪，相当于一个路由器)
- **容器运行环境(Container Runtime)**
  - 容器运行环境是负责运行容器的软件。
  - Kubernetes 支持多个容器运行环境: Docker、 containerd、cri-o、 rktlet 以及任何实现 Kubernetes CRI (容器运行环境接口)。
- **fluentd**
  - 是一个守护进程，它有助于提供集群层面日志 集群层面的日志

`Kubelet`负责管理`Pod`，`Kube-proxy`负责`pod`的网络，`docker`提供运行环境，`Fluentd`负责`收集日志`

#### 4. 相关概念

![image-20220903164645855](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.4.1.png)

k8s就是一个管理者，简单说就是把N多个服务器资源全部给K8s，k8s进行分配。管理单元是pod，运行单元是docker

- **Container**：容器，可以是 docker 启动的一个容器
- **Pod**：
  - k8s 使用 Pod 来组织一组容器
  - 一个 Pod 中的所有容器共享同一网络。
  - Pod 是 k8s 中的最小部署单元
- **Volume**
  - 声明在 Pod 容器中可访问的文件目录
  - 可以被挂载在 Pod 中一个或多个容器指定路径下
  - 支持多种后端存储抽象(本地存储，分布式存储，云存 储…)

![image-20220903184017312](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.4.2.png)


- **Controllers**：更高层次对象，部署和管理 Pod；
  - ReplicaSet：确保预期的 Pod 副本数量
  - Deplotment：无状态应用部署 (比如一个订单服务崩了以后，关闭该应用，再创建一个订单服务就行了)
  - StatefulSet：有状态应用部署 (比如mysql会在本地磁盘里存储数据，如果这个mysql服务崩了，再拉取一个mysql也不能获取到这些数据)
  - DaemonSet：确保所有 Node 都运行一个指定 Pod
  - Job：一次性任务
  - Cronjob：定时任务
- **Deployment**：
  - 定义一组 Pod 的副本数目、版本等
  - 通过控制器（Controller）维持 Pod 数目(自动回复失败的 Pod)
  - 通过控制器以指定的策略控制版本（滚动升级，回滚等）

![image-20220903184105873](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.4.3.png)

- **Service**
  - 定义一组 Pod 的访问策略
  - Pod 的负载均衡，提供一个或者多个 Pod 的稳定访问地址
  - 支持多种方式（ClusterIP、NodePort、LoadBalance）

![image-20220903184202006](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.4.4.png)

- **Label**：标签，用于对象资源的查询，筛选

![image-20220903184224423](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.4.5.png)

- **Namespace**：命名空间，逻辑隔离
  - 一个集群内部的逻辑隔离机制（鉴权，资源）
  - 每个资源都属于一个 namespace
  - 同一个 namespace 所有资源名不能重复
  - 不同 namespace 可以资源名重复

![image-20220903184237412](https://gitlab.com/apzs/image/-/raw/master/image/8.1.2.4.6.png)

**API**：

我们通过 kubernetes 的 API 来操作整个集群。

可以通过 kubectl、ui、curl 最终发送 http+json/yaml 方式的请求给 API Server，然后控制 k8s 集群。**k8s 里的所有的资源对象都可以采用 yaml 或 JSON 格式的文件定义或描述**

### 8.1.3、使用`Centos`

#### 1、下载`Centos`

打开`Oracle VM VirtualBox`，点击`管理(F) -> 主机网络管理器`，只保留一个`ip`地址为`192.168.56.1`的。（如果更新了`Oracle VM VirtualBox`，可以点击`管理(F)  -> 工具  -> Network Manager`）

![GIF 2022-9-3 21-37-08](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.1.1.gif)

对比基础篇创建`centos`的`Vagrantfile`和现在高级篇准备创建的`3`台`centos`的`Vagrantfile`文件，将下载``centos``的地址修改为中科大的镜像

![image-20220904144701450](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.1.2.png)

在`node.vm.hostname="k8s-node#{i}"`下面添加`node.vm.box_url = "https://mirrors.ustc.edu.cn/centos-cloud/centos/7/vagrant/x86_64/images/CentOS-7.box"`，以使用中科大的镜像

```nginx
Vagrant.configure("2") do |config|
   (1..3).each do |i|
        config.vm.define "k8s-node#{i}" do |node|
            # 设置虚拟机的Box
            node.vm.box = "centos/7"

            # 设置虚拟机的主机名
            node.vm.hostname="k8s-node#{i}"

            node.vm.box_url = "https://mirrors.ustc.edu.cn/centos-cloud/centos/7/vagrant/x86_64/images/CentOS-7.box"

            # 设置虚拟机的IP
            node.vm.network "private_network", ip: "192.168.56.#{99+i}", netmask: "255.255.255.0"

            # 设置主机与虚拟机的共享目录
            # node.vm.synced_folder "~/Documents/vagrant/share", "/home/vagrant/share"

            # VirtaulBox相关配置
            node.vm.provider "virtualbox" do |v|
                # 设置虚拟机的名称
                v.name = "k8s-node#{i}"
                # 设置虚拟机的内存大小
                v.memory = 4096
                # 设置虚拟机的CPU个数
                v.cpus = 4
            end
        end
   end
end
```

![image-20220904144919027](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.1.3.png)

或用迅雷下载好`.box`文件，然后使用`vagrant box add centos/7 VirtualBox.box`命令，或者在`Oracle VM VirtualBox`里导入`.box`文件也行

然后使用`vagrant up`创建这`3`台`centos`虚拟主机

```bash
vagrant up
```

![image-20220904165612080](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.1.4.png)

#### 2、使用密码连接虚拟主机

##### 1、开启密码连接~~&允许连接root用户~~

`k8s-node1`应该使用`vi /etc/ssh/sshd_config`命令，而不是`vi /etc/ssh/ssh_config`，这里用错了

```bash
D:\k8s>vagrant ssh k8s-node1
[vagrant@k8s-node1 ~]$ su root
Password: #密码为 vagrant
[root@k8s-node1 vagrant]# vi /etc/ssh/ssh_config  #这里写错了应该为`vi /etc/ssh/sshd_config`
[root@k8s-node1 vagrant]# service sshd restart
Redirecting to /bin/systemctl restart sshd.service #重启sshd服务。然如果忘记重启sshd服务,重启一下虚拟机也可以
[root@k8s-node1 vagrant]# exit;
exit
[vagrant@k8s-node1 ~]$ exit;
logout
Connection to 127.0.0.1 closed.

D:\k8s>vagrant ssh k8s-node2
[vagrant@k8s-node2 ~]$ su root
Password:
[root@k8s-node2 vagrant]# vi /etc/ssh/sshd_config
[root@k8s-node2 vagrant]# [root@k8s-node2 vagrant]#
[root@k8s-node2 vagrant]# service sshd restart
Redirecting to /bin/systemctl restart sshd.service
[root@k8s-node2 vagrant]# exit;
exit
[vagrant@k8s-node2 ~]$ exit;
logout
Connection to 127.0.0.1 closed.

D:\k8s>vagrant ssh k8s-node3
[vagrant@k8s-node3 ~]$ su root
Password:
[root@k8s-node3 vagrant]# vi /etc/ssh/sshd_config
[root@k8s-node3 vagrant]# [root@k8s-node3 vagrant]#
[root@k8s-node3 vagrant]# service sshd restart
Redirecting to /bin/systemctl restart sshd.service
[root@k8s-node3 vagrant]# exit;
exit
[vagrant@k8s-node3 ~]$ exit;
logout
Connection to 127.0.0.1 closed.
```

![image-20220904171713858](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.1.1.png)

将`PasswordAuthentication no`改为`PasswordAuthentication yes`，允许通过密码访问`centos`主机

![image-20220904171020186](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.1.2.png)

##### 2、连接虚拟主机

然后使用`Xshell`工具连接虚拟主机

| 名称      | 协议 | 主机           | 端口号 | 用户名 | 密码    |
| --------- | ---- | -------------- | ------ | ------ | ------- |
| k8s-node1 | SSH  | 192.168.56.100 | 22     | root   | vagrant |
| k8s-node2 | SSH  | 192.168.56.101 | 22     | root   | vagrant |
| k8s-node3 | SSH  | 192.168.56.102 | 22     | root   | vagrant |

![GIF 2022-9-4 17-12-44](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.2.gif)

##### 3、常见错误一：

使用了错误的`vi /etc/ssh/ssh_config`命令，修改了`/etc/ssh/ssh_config`文件，发现没有`PasswordAuthentication no`这一行，手动添加`PasswordAuthentication yes`

![image-20220904170145185](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.3.1.png)

或错误的取消注释掉`Host *`里的`PasswordAuthentication yes`

![image-20220904162830913](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.3.2.png)

如果配置错误则会出现下面的情况，即不能输入密码，只能输入`Public Key(U)`

点击`新建会话`，在`名称`里输入`k8s-node1`，在`主机`里输入` 192.168.56.100`，然后点击`确定`

![image-20220904170150726](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.3.3.png)

在弹出的`SSH安全警告`里点击`接收并保持`

![image-20220904170247798](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.3.4.png)

在弹出的`SSH 用户名`里输入`root`，并点击`确定`

![image-20220904170242975](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.3.5.png)

可以看到不能输入密码，只能输入`Public Key(U)`

![image-20220904170322446](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.3.6.png)

##### 4、常见错误2：

错误的将前面的`#PasswordAuthentication yes`取消注释

正确做法应该把该语句下面的`PasswordAuthentication no`改为`PasswordAuthentication yes`

<img src="https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.4.1.png" alt="image-20220904180249070" style="zoom: 67%;" />

![GIF 2022-9-4 17-52-00](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.2.4.2.gif)

#### 3、使用密钥连接虚拟主机

##### 1、服务端生成秘钥

[SSH-publickey - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1179264?from=article.detail.1090656)

[linux ssh publickey登录 - 一江春水…… - 博客园 (cnblogs.com)](https://www.cnblogs.com/yjcs123/p/10876755.html)

[sshd_config配置文件详解_独孤柯灵的博客-CSDN博客_sshd_config](https://blog.csdn.net/u014721096/article/details/78559506)

[Linux使用Public Key方式远程登录 - 走看看 (zoukankan.com)](http://t.zoukankan.com/JeremyWYL-p-7268627.html)

[真正解决 windows OpenSSH WARNING: UNPROTECTED PRIVATE KEY FILE!_coder_jo的博客-CSDN博客](https://blog.csdn.net/joshua2011/article/details/90208741)

###### 1、生成密钥

```bash
ssh-keygen -b 1024 -t dsa
```

###### 2、修改文件名和密码

可以不修改，直接按`enter键`

###### 3、生成认证秘钥

```bash
cd /root/.ssh/
cat id_dsa.pub >> authorized_keys
```

[点击查看完整代码](code/8.1.3.3.1.md)

 <img src="https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.1.3.png" alt="image-20220904192706690" style="zoom:67%;" />

###### 4、复制`id_dsa`文件

复制`id_dsa`文件给客户端，客户端通过工具使用该密钥连接服务端

![GIF 2022-9-5 16-02-18](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.1.4.1.gif)

**或则手动用命令连接：**

分别把`id_dsa`、`id_dsa.pub`拷贝到Client端,

(1)windows下copy到C:\Users\youruser\.ssh
(2)mac下copy到/home/youruser/.ssh 或者 ~/.ssh

```bash
ssh -i privateKey2 -p 22 root@192.168.56.100
```

然后报了如下错误，说`“privateKey”权限太开放，要求您的私钥文件不能被其他人访问`，我们可以将`privateKey`文件设置成只允许我们现在使用的这个用户访问

```bash
D:\k8s>ssh -i privateKey -p 22 root@192.168.56.100
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions for 'privateKey' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "privateKey": bad permissions
root@192.168.56.100: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).

D:\k8s>whoami
desktop-uf6t5ih\无名氏
```

![GIF 2022-9-4 21-16-38](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.1.4.2.gif)

然后再次使用`ssh -i privateKey -p 22 root@192.168.56.100`命令，可以看到又报了`sign_and_send_pubkey：不支持相互签名`的错误，这是因为新版本的`OpenSHH`弃用了`ssh-rsa 算法`，

参考链接：[stackoverflow](https://stackoverflow.com/questions/71937335/cannot-update-git-repository-sign-and-send-pubkey-no-mutual-signature-support)，[atlassian](https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html)

```bash
D:\k8s>ssh -i privateKey -p 22 root@192.168.56.100
sign_and_send_pubkey: no mutual signature supported
root@192.168.56.100: Permission denied (publickey,gssapi-keyex,gssapi-with-mic).
```

在`‪C:\Users\[你的用户名]\.ssh\config`文件里添加如下配置就可以了（注意是修改的是本地文件，不是虚拟机里的文件）

```bash
Host *
PubkeyAcceptedKeyTypes=+ssh-dss
```

![GIF 2022-9-4 21-30-11](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.1.4.3.gif)

[点击查看`k8s-node1`节点使用的所有命令](code/8.1.3.3.4.md)

<img src="https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.1.4.4.png" alt="image-20220904194540017" style="zoom:50%;" />

##### 2、客户端生成密钥

###### 1、添加公钥

客户端生成密钥和服务端生成密钥一样，无非就是客户端获取私钥，服务端获取公钥（客户端生成密钥和服务器端生成密钥差不多，都是使用`ssh-keygen -b 1024 -t dsa`命令，然后公钥和私钥都放在`‪C:\Users\[你的用户名]\.ssh`文件夹里。当然也可以使用下图演示的方法，使用`Xshell`工具生成公钥）

可以看到`k8s-node3`节点使用`ssh-rsa`命令报了`ssh-rsa: command not found`异常

```bash
D:\k8s>vagrant ssh k8s-node3
Last login: Sun Sep  4 10:00:15 2022 from 10.0.2.2
[vagrant@k8s-node3 ~]$ su root
Password:
[root@k8s-node3 vagrant]# ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAzf0u5yn7gzbX/1N/CojUFsAaxbeYt7fhksQAVbngx8mr5ufAeL0nzXsuW8BsJm0+guiH6rBlAQ6vJJ83TSMD/2SwzWjlrEE36mPmsFMo7UjA4lGGI+cuZAofMES7k+KYMms4tVjyAL1UU+m1h9HswYrWC5qDgv+mSnRXlvzdm1UYC6ckGw6/tiTb1K3l0RHvqhFcWKds0cZtRVy0er2xrHzGFdIKYDRbaiT7VERZuML3Mh5cYey5HabiM7VG8fhjB3t0wfxEz46VrhYpRspvjWFaLwTDG4TTD8M3ELBx+UNZ1iG6Jbj5Q+RtKnXh6FAgXVjTeFGeu5qhldSQ5RG8uw==
bash: ssh-rsa: command not found
```

![GIF 2022-9-5 16-10-33](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.1.1.gif)

下载`openssh-clients`后再次添加，可以看到这次添加成功了

[点击查看`k8s-node3`完整命令](code/8.1.3.3.2.md)

![image-20220905163725422](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.1.2.png)

参考链接： https://www.reddit.com/r/netsecstudents/comments/7s2zgb/sshrsa_command_not_found/

<img src="https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.1.3.png" alt="image-20220905175237912" style="zoom: 33%;" />

###### 2、真实主机向虚拟机里上传文件

可以使用如下命令向虚拟主机里传文件

```bash
C:\Users\无名氏>scp -r A:\桌面\id_dsa_1024.pub root@192.168.56.102:/root
root@192.168.56.102's password:
id_dsa_1024.pub                                                                       100%  588   196.1KB/s   00:00
```

解释：

`scp`命令格式如下

```
scp  [可选参数]  file_source  file_target
```

完整命令如下，本地可以不写` 本地用户名@IP地址:`

```
scp 本地用户名@IP地址:文件名1  远程用户名@IP地址:文件名2
```

![image-20220905165249450](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.2.1.png)

使用如下命令向虚拟主机里添加公钥

```bash
[root@k8s-node3 vagrant]# pwd
/home/vagrant
[root@k8s-node3 vagrant]# cd /root
[root@k8s-node3 ~]# ls
anaconda-ks.cfg  id_dsa_1024.pub  original-ks.cfg
[root@k8s-node3 ~]# clear
[root@k8s-node3 ~]# ls
anaconda-ks.cfg  id_dsa_1024.pub  original-ks.cfg
[root@k8s-node3 ~]# rm id_dsa_1024.pub
rm: remove regular file ‘id_dsa_1024.pub’? yes
[root@k8s-node3 ~]# ll
total 16
-rw-------. 1 root root 5570 Apr 30  2020 anaconda-ks.cfg
-rw-------. 1 root root 5300 Apr 30  2020 original-ks.cfg
[root@k8s-node3 ~]# cd /home/vagrant/
[root@k8s-node3 vagrant]# clear
[root@k8s-node3 vagrant]# pwd
/home/vagrant
[root@k8s-node3 vagrant]# cd /root
[root@k8s-node3 ~]# ll
total 20
-rw-------. 1 root root 5570 Apr 30  2020 anaconda-ks.cfg
-rw-r--r--. 1 root root  588 Sep  5 08:47 id_dsa_1024.pub
-rw-------. 1 root root 5300 Apr 30  2020 original-ks.cfg
[root@k8s-node3 ~]# ssh -i id_dsa_1024.pub
usage: ssh [-1246AaCfGgKkMNnqsTtVvXxYy] [-b bind_address] [-c cipher_spec]
           [-D [bind_address:]port] [-E log_file] [-e escape_char]
           [-F configfile] [-I pkcs11] [-i identity_file]
           [-J [user@]host[:port]] [-L address] [-l login_name] [-m mac_spec]
           [-O ctl_cmd] [-o option] [-p port] [-Q query_option] [-R address]
           [-S ctl_path] [-W host:port] [-w local_tun[:remote_tun]]
           [user@]hostname [command]
```

![image-20220905165325271](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.2.2.png)

完整的添加公钥步骤如下图所示：

![GIF 2022-9-5 16-50-50](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.2.3.gif)

可以使用`scp -r A:\桌面\id_dsa_1024.pub root@192.168.56.102:/root`命令传输文件，使用`ssh -i A:\桌面\id_dsa_1024.pub root@192.168.56.102`命令连接虚拟主机

```bash
C:\Users\无名氏>scp -r A:\桌面\id_dsa_1024.pub root@192.168.56.102:/root
root@192.168.56.102's password:
id_dsa_1024.pub                                                                       100%  588   196.1KB/s   00:00

C:\Users\无名氏>ssh -i A:\桌面\id_dsa_1024.pub root@192.168.56.102
root@192.168.56.102's password:
Last login: Mon Sep  5 08:07:05 2022
[root@k8s-node3 ~]#
```

![image-20220905175619210](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.2.4.png)

完整过程如下：

![GIF 2022-9-5 17-58-20](https://gitlab.com/apzs/image/-/raw/master/image/8.1.3.3.2.2.5.gif)

### 8.1.4、使用k8s的前置准备

#### 1、设置网络环境

随便在一个会话标签里`右键`，选择`发送键输入到所有会话(K)`，对3个节点同样使用`ip route show`命令可以发现都是使用相同的`eth0`网卡，然后使用`ip addr`命令查看网卡和`ip`信息，可以看到这`3`个虚拟主机的`etho`网卡都是相同的`ip`地址

![GIF 2022-9-5 18-07-08](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.1.1.gif)

这是因为我们在各节点的设置的`网络`里设置的连接方式是`网络地址转换`，用的端口转发的方式连接本地主机

![GIF 2022-9-5 18-09-27](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.1.2.gif)

这种方式可以让所有的虚拟机都能连接上互联网，但是`Kubernetes`会把它们都当成一样的，容易产生问题

因此我们可以打开`Oracle VM VirtualBox`，点击`管理(F) -> 全局设定`在网络里点击添加以添加一个虚拟网卡；然后将各节点`网络`里的第一个网卡的连接方式设置为`NAT网络`，然后在高级里刷新一下`Mac地址`，而第二个网卡还是默认设置为`仅主机(Host-only)网络`，即只有本地主机能访问。（第一个网络是`Kubernetes`真正要用到的，第二个网络仅仅是为了能够连接上虚拟机）

![GIF 2022-9-5 18-20-31](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.1.3.gif)

可以发现`ping`相互的虚拟主机和百度都能`ping`得通

[点击查看`ping`的完整命令](code/8.1.3.4.md)

![GIF 2022-9-5 18-27-39](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.1.4.gif)

#### 2、添加各节点对应关系

##### 下面使用的主要命令

```bash
#关闭防火墙
#开发阶段可以把防火墙全部关掉，这样就不用配防火墙的各种进出规则了
systemctl stop firewalld
systemctl disable firewalld

#关闭 selinux
#禁用Linux默认的安全策略
cat /etc/selinux/config
sed -i 's/enforcing/disabled/' /etc/selinux/config
cat /etc/selinux/config
#也禁用当前会话
setenforce 0

#关闭swap
#关闭内存交换
swapoff -a	#临时
cat /etc/fstab
sed -ri 's/.*swap.*/#&/' /etc/fstab	#永久
cat /etc/fstab
#free -g 验证，swap 必须为 0；
```

查看主机名和各个节点的`ip`地址

```bash
hostname
#指定新的hostname
#hostnamectl set-hostname <newhostname>
ip addr
```

修改`hosts`文件

```
vi /etc/hosts
cat /etc/hosts
```

设置为自己`hostname`对应的`eth0`的`ip`

```
10.0.2.5    k8s-node1
10.0.2.4	k8s-node2
10.0.2.15	k8s-node3
```



```bash
#将桥接的IPv4 流量传递到iptables 的链：
cat > /etc/sysctl.d/k8s.conf << EOF 
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1 
EOF

sysctl --system
```

其他问题

```bash
#疑难问题：
#遇见提示是只读的文件系统，运行如下命令
mount -o remount rw /

date	#查看时间 （可选） 
yum install -y ntpdate
ntpdate time.windows.com	#同步最新时间
```

##### 1、关闭防火墙

```bash
[root@k8s-node1 ~]# systemctl stop firewalld
[root@k8s-node1 ~]# systemctl disable firewalld
```

![image-20220905203406410](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.1.png)

##### 2、关闭安全策略

```bash
[root@k8s-node1 ~]# cat /etc/selinux/config

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
SELINUX=enforcing
# SELINUXTYPE= can take one of three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected. 
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted


[root@k8s-node1 ~]# sed -i 's/enforcing/disabled/' /etc/selinux/config
[root@k8s-node1 ~]# cat /etc/selinux/config

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     disabled - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of disabled.
#     disabled - No SELinux policy is loaded.
SELINUX=disabled
# SELINUXTYPE= can take one of three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected. 
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted


[root@k8s-node1 ~]# setenforce 0
```

![image-20220905201935001](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.2.png)

##### 3、关闭`swap`分区

```bash
[root@k8s-node1 ~]# swapoff -a
[root@k8s-node1 ~]# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Thu Apr 30 22:04:55 2020
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=1c419d6c-5064-4a2b-953c-05b2c67edb15 /                       xfs     defaults        0 0
/swapfile none swap defaults 0 0
[root@k8s-node1 ~]# sed -ri 's/.*swap.*/#&/' /etc/fstab
[root@k8s-node1 ~]# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Thu Apr 30 22:04:55 2020
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=1c419d6c-5064-4a2b-953c-05b2c67edb15 /                       xfs     defaults        0 0
#/swapfile none swap defaults 0 0
```

![image-20220905203045902](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.3.png)

##### 4、添加主机名与IP 对应关系

如果hostname不对可以使用`hostnamectl set-hostname <newhostname>`命令指定新的`hostname`

```bash
[root@k8s-node1 ~]# hostname
k8s-node1
[root@k8s-node1 ~]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:6f:59:a6 brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.5/24 brd 10.0.2.255 scope global noprefixroute dynamic eth0
       valid_lft 1034sec preferred_lft 1034sec
    inet6 fe80::a00:27ff:fe6f:59a6/64 scope link 
       valid_lft forever preferred_lft forever
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:14:84:49 brd ff:ff:ff:ff:ff:ff
    inet 192.168.56.100/24 brd 192.168.56.255 scope global noprefixroute eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fe14:8449/64 scope link 
       valid_lft forever preferred_lft forever
```

![image-20220905203638362](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.4.1.png)

```bash
[root@k8s-node2 ~]# hostname
k8s-node2
[root@k8s-node2 ~]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:c2:6d:7c brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.4/24 brd 10.0.2.255 scope global noprefixroute dynamic eth0
       valid_lft 840sec preferred_lft 840sec
    inet6 fe80::a00:27ff:fec2:6d7c/64 scope link 
       valid_lft forever preferred_lft forever
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:d1:ba:93 brd ff:ff:ff:ff:ff:ff
    inet 192.168.56.101/24 brd 192.168.56.255 scope global noprefixroute eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fed1:ba93/64 scope link 
       valid_lft forever preferred_lft forever
```

![image-20220905203634770](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.4.2.png)

```bash
[root@k8s-node3 ~]# hostname
k8s-node3
[root@k8s-node3 ~]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:13:ee:da brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global noprefixroute dynamic eth0
       valid_lft 753sec preferred_lft 753sec
    inet6 fe80::a00:27ff:fe13:eeda/64 scope link 
       valid_lft forever preferred_lft forever
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 08:00:27:0a:41:b8 brd ff:ff:ff:ff:ff:ff
    inet 192.168.56.102/24 brd 192.168.56.255 scope global noprefixroute eth1
       valid_lft forever preferred_lft forever
    inet6 fe80::a00:27ff:fe0a:41b8/64 scope link 
       valid_lft forever preferred_lft forever
```

![image-20220905203707891](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.4.3.png)

##### 5、修改`hosts`文件

一定要使用自己`hostname`对应的`ip`

```bash
[root@k8s-node3 ~]# vi /etc/hosts
[root@k8s-node3 ~]# cat /etc/hosts
127.0.0.1	k8s-node3	k8s-node3
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.0.2.5 k8s-node1
10.0.2.4	k8s-node2
10.0.2.15	k8s-node3
```

![image-20220905204506638](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.5.1.png)

```properties
10.0.2.5 k8s-node1
10.0.2.4	k8s-node2
10.0.2.15	k8s-node3
```

![image-20220905204456782](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.5.2.png)

##### 6、防止流量指标统计消失

如果不设置，可能会有流量指标统计的消失

```bash
[root@k8s-node3 ~]# cat > /etc/sysctl.d/k8s.conf << EOF 
> net.bridge.bridge-nf-call-ip6tables = 1
> net.bridge.bridge-nf-call-iptables = 1 
> EOF
[root@k8s-node3 ~]# sysctl --system
* Applying /usr/lib/sysctl.d/00-system.conf ...
* Applying /usr/lib/sysctl.d/10-default-yama-scope.conf ...
kernel.yama.ptrace_scope = 0
* Applying /usr/lib/sysctl.d/50-default.conf ...
kernel.sysrq = 16
kernel.core_uses_pid = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.promote_secondaries = 1
net.ipv4.conf.all.promote_secondaries = 1
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
* Applying /etc/sysctl.d/99-sysctl.conf ...
* Applying /etc/sysctl.d/k8s.conf ...
* Applying /etc/sysctl.conf ...
```

![image-20220905205233002](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.2.6.png)

#### 3、创建备份

![GIF 2022-9-5 21-00-48](https://gitlab.com/apzs/image/-/raw/master/image/8.1.4.3.gif)

### 8.1.5、安装k8s

所有节点安装`docker`、`kubeadm`、`kubelet`、`kubectl`

#### 1、安装docker

 由于三个虚拟机下载不同步，因此必须确保都下载完成后再输入后面的命令

```
kubeadm 方便创建master节点，方便其他节点加入
kubelet：每一个node的代理创建pod，管理网络
kubectl:命令行操作Kubernetes集群
```

##### 1、卸载系统之前的 docker

```bash
sudo yum remove docker \
    docker-client \ docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

##### 2、安装docker

安装必须的依赖

```bash
sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
```

设置 docker repo 的 yum 位置

```bash
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

安装 docker，以及 docker-cli

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

##### 3、配置 docker 镜像

输入阿里云里面自己的镜像地址

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": ["https://82m9ar63.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

##### 4、设置 docker 开机自启

```bash
systemctl enable docker
```

[点击查看完整命令和完整截图](code/8.1.5.1.md)

#### 2、添加阿里云 yum 源

```bash
cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

#### 3、安装`kubeadm`、`kubelet`、`kubectl`

使用如下命令检查是否有`kube`的安装源

```bash
yum list|grep kube
```

安装`kubeadm`、`kubelet`、`kubectl`

```
yum install -y kubelet-1.17.3 kubeadm-1.17.3 kubectl-1.17.3
```

设置开机自启动

```bash
systemctl enable kubelet 
systemctl start kubelet
#这里查看kubelet的状态会启动不起来，这是正常的
systemctl status kubelet
```

[点击查看完整命令和完整截图](code/8.1.5.3.md)

![image-20220905213944360](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.3.1.png)

然后等待各节点下载完成

可以看到`k8s-node1`节点运行失败了，这是正常的。

![image-20220905214101692](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.3.2.png)

`k8s-node2`竟然运行起来了，运行起来了也没关系

![image-20220905214059076](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.3.3.png)

`k8s-node3`运行失败了，这是正常的

![image-20220905214104542](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.3.4.png)

#### 4、设置主节点

##### 1、方式一（不建议）

只让`k8s-node1`执行以下操作（我们将`k8s-node1`当作主节点）

主要命令如下，但由于要下载很多东西，失败了都不知道，所以要等很久，因此不建议立即执行

**注意：`--apiserver-advertise-address`一定要用自己的节点对应的ip**

```bash
kubeadm init \
--apiserver-advertise-address=自己的master节点的ip \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
--kubernetes-version v1.17.3 \
#service由多个pod组成，对外提供服务，对应用具有负载均衡能力
--service-cidr=10.96.0.0/16 \
#pod之间通讯
--pod-network-cidr=10.244.0.0/16
```

##### 2、方式二（建议）

###### 1、执行如下命令

建议先执行如下语句

```bash
[root@k8s-node1 ~]# ls
anaconda-ks.cfg  k8s  original-ks.cfg
[root@k8s-node1 ~]# cd k8s/
[root@k8s-node1 k8s]# ll
total 64
-rw-r--r--. 1 root root  7149 Sep  5 13:53 get_helm.sh
-rw-r--r--. 1 root root  6310 Sep  5 13:53 ingress-controller.yaml
-rw-r--r--. 1 root root   209 Sep  5 13:53 ingress-demo.yml
-rw-r--r--. 1 root root 15016 Sep  5 13:53 kube-flannel.yml
-rw-r--r--. 1 root root  4737 Sep  5 13:53 kubernetes-dashboard.yaml
-rw-r--r--. 1 root root  3841 Sep  5 13:53 kubesphere-complete-setup.yaml
-rw-r--r--. 1 root root   392 Sep  5 13:53 master_images.sh
-rw-r--r--. 1 root root   283 Sep  5 13:53 node_images.sh
-rw-r--r--. 1 root root  1053 Sep  5 13:53 product.yaml
-rw-r--r--. 1 root root   931 Sep  5 13:53 Vagrantfile
[root@k8s-node1 k8s]# chmod master_images.sh 
chmod: missing operand after ‘master_images.sh’
Try 'chmod --help' for more information.
[root@k8s-node1 k8s]# chmod 700 master_images.sh 
[root@k8s-node1 k8s]# ./master_images.sh 
v1.17.3: Pulling from google_containers/kube-apiserver
597de8ba0c30: Pull complete 
694976bfeffd: Pull complete 
Digest: sha256:33400ea29255bd20714b6b8092b22ebb045ae134030d6bf476bddfed9d33e900
......
67ddbfb20a22: Pull complete 
Digest: sha256:f78411e19d84a252e53bff71a4407a5686c46983a2c2eeed83929b888179acea
Status: Downloaded newer image for registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.1
```

![image-20220905220146386](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.1.1.png)

完整过程：

![GIF 2022-9-5 21-54-36](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.1.2.gif)

附件：`master_images.sh`文件

```bash
#!/bin/bash

images=(
	kube-apiserver:v1.17.3
    kube-proxy:v1.17.3
	kube-controller-manager:v1.17.3
	kube-scheduler:v1.17.3
	coredns:1.6.5
	etcd:3.4.3-0
    pause:3.1
)

for imageName in ${images[@]} ; do
    docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName
#   docker tag registry.cn-hangzhou.aliyuncs.com/google_containers/$imageName  k8s.gcr.io/$imageName
done
```

###### 2、安装

先查看主节点（`k8s-node1`节点）的`ip`

```
ip addr
```

然后再执行如下命令：注意修改`--apiserver-advertise-address`为自己`mater`节点的ip

```bash
kubeadm init \
--apiserver-advertise-address=10.0.2.5 \
--image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
--kubernetes-version v1.17.3 \
--service-cidr=10.96.0.0/16 \
--pod-network-cidr=10.244.0.0/16
```

由于默认拉取镜像地址 k8s.gcr.io 国内无法访问，这里指定阿里云镜像仓库地址。可以手动按照我们的 images.sh 先拉取镜像，

地址变为`registry.aliyuncs.com/google_containers`也可以。

科普：无类别域间路由（Classless Inter-Domain Routing、CIDR）是一个用于给用户分配 IP 地址以及在互联网上有效地路由 IP 数据包的对 IP 地址进行归类的方法。

拉取可能失败，需要下载镜像。

运行完成提前复制：加入集群的令牌

[点击查看完整命令和完整截图](code/8.1.5.4.2.2.md)

![8.1.5.4.2.2.1](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.2.png)

根据执行安装`kubeadm`的提示，执行如下命令

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

这个文档写了如何搭建网络： https://kubernetes.io/docs/concepts/cluster-administration/addons/

###### 3、安装Pod 网络插件（CNI）

本次使用的`联网和网络策略`是`Flannel`

![image-20220906161136485](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.1.png)

**主要命令：**

这条命令为其他节点加入到该master节点的命令，在`k8s-node2`和`k8s-node3`会执行该命令，该命令2小时有效

注意：使用的是安装`kubeadm`时提示的命令

```
kubeadm join 10.0.2.5:6443 --token ltl7rz.akblvi5kpzmeej8i \
    --discovery-token-ca-cert-hash sha256:d3393d20305a60a6324836be8601a4be2e28c52c90a18aac9110b5504617de48
```

如果过期了可以执行如下命令

```bash
kubeadm token create --print-join-command
kubeadm token create --ttl 0 --print-join-command #生成一个永久的tocken

kubeadm	join	--token	y1eyw5.ylg568kvohfdsfco	--discovery-token-ca-cert-hash
sha256: 6c35e4f73f72afd89bf1c8c303ee55677d2cdb1342d67bb23c852aba2efc7c73
```

**详细步骤：**

可以执行如下命令，指定创建多少个pod，多少个service，但是国内无法访问

```bash
kubectl apply -f \
https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

因此可以使用如下方式应用本地的`kube-flannel.yml`

```bash
[root@k8s-node1 ~]# cd k8s
[root@k8s-node1 k8s]# ls
get_helm.sh              ingress-demo.yml  kubernetes-dashboard.yaml       master_images.sh  product.yaml
ingress-controller.yaml  kube-flannel.yml  kubesphere-complete-setup.yaml  node_images.sh    Vagrantfile
[root@k8s-node1 k8s]# kubectl apply -f kube-flannel.yml
podsecuritypolicy.policy/psp.flannel.unprivileged created
clusterrole.rbac.authorization.k8s.io/flannel created
clusterrolebinding.rbac.authorization.k8s.io/flannel created
serviceaccount/flannel created
configmap/kube-flannel-cfg created
daemonset.apps/kube-flannel-ds-amd64 created
daemonset.apps/kube-flannel-ds-arm64 created
daemonset.apps/kube-flannel-ds-arm created
daemonset.apps/kube-flannel-ds-ppc64le created
daemonset.apps/kube-flannel-ds-s390x created
```

网络应用完了并不是立马就能用的，可以使用`kubectl get pods`(相当于docker ps)获取当前所有节点的`pod`，执行该命令需要指明名称空间，各名称空间是相互隔离的

```
kubectl get pods
```

可以看到如下信息

```bash
[root@k8s-node1 k8s]# kubectl get pods
No resources found in default namespace.
[root@k8s-node1 k8s]# kubectl get ns
NAME              STATUS   AGE
default           Active   27m
kube-node-lease   Active   27m
kube-public       Active   27m
kube-system       Active   27m
[root@k8s-node1 k8s]# kubectl get pods --all-namespaces
NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE
kube-system   coredns-7f9c544f75-klr4j            1/1     Running   0          28m
kube-system   coredns-7f9c544f75-mckd4            1/1     Running   0          28m
kube-system   etcd-k8s-node1                      1/1     Running   0          28m
kube-system   kube-apiserver-k8s-node1            1/1     Running   0          28m
kube-system   kube-controller-manager-k8s-node1   1/1     Running   0          28m
kube-system   kube-flannel-ds-amd64-wc8rd         1/1     Running   0          6m17s
kube-system   kube-proxy-p2b9m                    1/1     Running   0          28m
kube-system   kube-scheduler-k8s-node1            1/1     Running   0          28m
```

![image-20220906162623618](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.2.png)

等待`kube-flannel-ds`是运行状态后，网络才配置好

配置好后，让其他节点加入到master节点

```bash
[root@k8s-node1 k8s]# kubectl get nodes
NAME        STATUS   ROLES    AGE   VERSION
k8s-node1   Ready    master   33m   v1.17.3
[root@k8s-node1 k8s]# kubectl get nodes
NAME        STATUS     ROLES    AGE   VERSION
k8s-node1   Ready      master   36m   v1.17.3
k8s-node2   NotReady   <none>   81s   v1.17.3
k8s-node3   NotReady   <none>   41s   v1.17.3
```

状态为`none`的原因是都要下载`flannel`网络插件

![image-20220906165744360](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.3.png)

让`k8s-node2`节点加入进来

```bash
[root@k8s-node2 ~]# kubeadm join 10.0.2.5:6443 --token ltl7rz.akblvi5kpzmeej8i \
>     --discovery-token-ca-cert-hash sha256:d3393d20305a60a6324836be8601a4be2e28c52c90a18aac9110b5504617de48 
W0906 08:31:23.494805    3457 join.go:346] [preflight] WARNING: JoinControlPane.controlPlane settings will be ignored when control-plane flag is not set.
[preflight] Running pre-flight checks
	[WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
	[WARNING SystemVerification]: this Docker version is not on the list of validated versions: 20.10.17. Latest validated version: 19.03
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -oyaml'
[kubelet-start] Downloading configuration for the kubelet from the "kubelet-config-1.17" ConfigMap in the kube-system namespace
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
```

![image-20220906165746644](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.4.png)

让`k8s-node3`节点加入进来

```bash
[root@k8s-node3 ~]# kubeadm join 10.0.2.5:6443 --token ltl7rz.akblvi5kpzmeej8i \
>     --discovery-token-ca-cert-hash sha256:d3393d20305a60a6324836be8601a4be2e28c52c90a18aac9110b5504617de48 
W0906 08:32:03.994689    3499 join.go:346] [preflight] WARNING: JoinControlPane.controlPlane settings will be ignored when control-plane flag is not set.
[preflight] Running pre-flight checks
	[WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
	[WARNING SystemVerification]: this Docker version is not on the list of validated versions: 20.10.17. Latest validated version: 19.03
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -oyaml'
[kubelet-start] Downloading configuration for the kubelet from the "kubelet-config-1.17" ConfigMap in the kube-system namespace
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Starting the kubelet
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.
```

![image-20220906165748695](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.5.png)

使用`watch`命令监控一下状态，`-o wide`以`更多信息`的方式输出详细信息，可以看到现在都运行好了

```bash
watch kubectl get pod -n kube-system -o wide
```

![image-20220906204106910](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.6.png)

使用`kubectl get nodes`命令查看节点状态

```bash
[root@k8s-node1 k8s]# watch kubectl get pod -n kube-system -o wide
[root@k8s-node1 k8s]# kubectl get nodes
NAME        STATUS   ROLES    AGE     VERSION
k8s-node1   Ready    master   4h45m   v1.17.3
k8s-node2   Ready    <none>   4h9m    v1.17.3
k8s-node3   Ready    <none>   4h8m    v1.17.3
```

![image-20220906204303032](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.2.3.7.png)

###### 完整命令

[点击查看完整命令和完整图片](code/8.1.5.4.2.4.md)

##### 下载失败问题

如果执行`kubectl apply -f kube-flannel.yml`失败，是因为`kube-flannel.yml`文件里指定的`quay.io/coreos/flannel:v0.11.0-amd64`镜像不能访问

![image-20220906205155430](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.3.1.png)

可以去[docker hub](https://hub.docker.com/)里面搜`flannel`，找`from quay.io/coreos/flannel`的镜像

![image-20220906205857894](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.3.2.png)

然后找到`v0.11.0-amd64`这个版本的，复制`jmgao1983/flannel:v0.11.0-amd64`

![image-20220906210007187](https://gitlab.com/apzs/image/-/raw/master/image/8.1.5.4.3.3.png)

使用如下命令可以对指定文件的资源全部删除

```bash
kubectl delete -f kube-flannel.yml
```

然后将`kube-flannel.yml`文件里的`quay.io/coreos/flannel:v0.11.0-amd64`镜像替换为刚刚复制的`jmgao1983/flannel:v0.11.0-amd64`即可，然后再次执行`kubectl apply -f kube-flannel.yml`

### 8.1.6、部署`tomcat`

#### 1、部署一个`tomcat`

使用如下命令即可创建一个部署

```bash
kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8
```

`pod`是`tomcat6+唯一标识`，容器还没准备好

`service`就是一个服务

`deployment.apps/tomcat6`：做了一次部署，但还没成功

`replicaset.apps`:要复制`1`份，但还没准备好

```bash
[root@k8s-node1 k8s]# kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8
deployment.apps/tomcat6 created
[root@k8s-node1 k8s]# kubectl get all
NAME                           READY   STATUS              RESTARTS   AGE
pod/tomcat6-5f7ccf4cb9-rr4ns   0/1     ContainerCreating   0          20s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   5h12m

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/tomcat6   0/1     1            0           20s

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/tomcat6-5f7ccf4cb9   1         1         0       20s
```

![image-20220906211138571](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.1.png)

如何知道部署到哪个节点呢？使用`kubectl get all -o wide`打印更宽泛的内容

可以看到在`node3`节点运行

```bash
[root@k8s-node1 k8s]# kubectl get all -o wide
NAME                           READY   STATUS    RESTARTS   AGE     IP           NODE        NOMINATED NODE   READINESS GATES
pod/tomcat6-5f7ccf4cb9-rr4ns   1/1     Running   0          3m36s   10.244.2.2   k8s-node3   <none>           <none>

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE     SELECTOR
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   5h15m   <none>

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE     CONTAINERS   IMAGES               SELECTOR
deployment.apps/tomcat6   1/1     1            1           3m36s   tomcat       tomcat:6.0.53-jre8   app=tomcat6

NAME                                 DESIRED   CURRENT   READY   AGE     CONTAINERS   IMAGES               SELECTOR
replicaset.apps/tomcat6-5f7ccf4cb9   1         1         1       3m36s   tomcat       tomcat:6.0.53-jre8   app=tomcat6,pod-template-hash=5f7ccf4cb9
```

![image-20220906211441091](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.2.png)

在`node3`节点查看`docker`镜像和运行的容器，可以看到已经成功运行了

[点击查看完整运行命令](code/8.1.6.1.1.md)

![image-20220906211604278](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.3.png)

我们部署的应用默认都在`default`名称空间里，而其他系统的`pod`服务都在`kube-system`名称空间里

```bash
[root@k8s-node1 k8s]# kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
tomcat6-5f7ccf4cb9-rr4ns   1/1     Running   0          8m22s
[root@k8s-node1 k8s]# kubectl get pods --all-namespaces
NAMESPACE     NAME                                READY   STATUS    RESTARTS   AGE
default       tomcat6-5f7ccf4cb9-rr4ns            1/1     Running   0          8m47s
kube-system   coredns-7f9c544f75-klr4j            1/1     Running   0          5h20m
kube-system   coredns-7f9c544f75-mckd4            1/1     Running   0          5h20m
kube-system   etcd-k8s-node1                      1/1     Running   0          5h20m
kube-system   kube-apiserver-k8s-node1            1/1     Running   0          5h20m
kube-system   kube-controller-manager-k8s-node1   1/1     Running   0          5h20m
kube-system   kube-flannel-ds-amd64-mb9dw         1/1     Running   0          4h45m
kube-system   kube-flannel-ds-amd64-wc8rd         1/1     Running   0          4h58m
kube-system   kube-flannel-ds-amd64-xccgq         1/1     Running   0          4h44m
kube-system   kube-proxy-52tnk                    1/1     Running   0          4h45m
kube-system   kube-proxy-7nwdt                    1/1     Running   0          4h44m
kube-system   kube-proxy-p2b9m                    1/1     Running   0          5h20m
kube-system   kube-scheduler-k8s-node1            1/1     Running   0          5h20m
```

![image-20220906211822557](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.4.png)

可以使用`kubectl get pods -o wide`命令查看更为详细的`pod`信息，使用`kubectl get all`命令可以查看`pod`、`service`、`deployment`等信息。

```bash
[root@k8s-node1 k8s]# kubectl get pods -o wide
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE        NOMINATED NODE   READINESS GATES
tomcat6-5f7ccf4cb9-rr4ns   1/1     Running   0          12m   10.244.2.2   k8s-node3   <none>           <none>
[root@k8s-node1 k8s]# kubectl get all
NAME                           READY   STATUS    RESTARTS   AGE
pod/tomcat6-5f7ccf4cb9-rr4ns   1/1     Running   0          12m

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   5h24m

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/tomcat6   1/1     1            1           12m

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/tomcat6-5f7ccf4cb9   1         1         1       12m
```

![image-20220906212627477](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.5.png)

如果我们将`node3`的`tomcat`停掉，就会自动删除不能运行的再重新拉取一个并运行

[点击查看完整运行命令](code/8.1.6.1.2.md)

![image-20220906213103763](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.6.png)

将`node3`虚拟机关机，模拟`node3`节点宕机，此时可以看到重新在`node2`又拉起了一个来启动`tomcat`

[点击查看完整命令](code/8.1.6.1.3.md)

![image-20220906215631690](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.7.png)

在在`node2`节点使用`docker ps`命令即可看到此时已经在运行了

[点击查看完整命令](code/8.1.6.1.4.md)

![image-20220906215635942](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.1.8.png)

#### 2、暴露 tomcat 访问

可以使用如下命令暴露`tomcat6`的端口

```bash
kubectl expose deployment tomcat6 --port=80 --target-port=8080 --type=NodePort
```

`tomcat`的默认端口是`8080`，如果以前我们使用`docker`容器时，会把`8080`映射为一个端口

现在`docker`用`Pod`封装，`--target-port=8080`指的是`Pod`里面的这个容器暴露的端口是`8080`，但是访问`Pod`使用`80`端口（`--port=80`），然后把整个`Pod`作为一个`Service`暴露出去，使用`--type=NodePort`（节点端口模式）随机生成一个端口暴露`Service`。

Pod 的`80`端口映射容器的`8080`端口；`service`会代理`Pod`的`80`

![image-20221114095015908](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.2.1.png)

使用`kubectl get svc -o wide`命令可以查看暴露在哪个端口，可以看到这次暴露在`31224`端口

```bash
kubectl get svc -o wide
```

![image-20221114095215628](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.2.2.png)

也可以使用`kubectl get all`命令查看详细信息

```bash
[root@k8s-node1 ~]# kubectl get all
NAME                           READY   STATUS    RESTARTS   AGE
pod/tomcat6-5f7ccf4cb9-gjmkw   1/1     Running   2          68d

NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        68d
#封装为service，对外暴露31244
service/tomcat6      NodePort    10.96.9.217   <none>        80:31224/TCP   7m20s 

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
#这个pod的产生是由于这次部署
deployment.apps/tomcat6   1/1     1            1           68d

NAME                                 DESIRED   CURRENT   READY   AGE
#副本信息
replicaset.apps/tomcat6-5f7ccf4cb9   1         1         1       68d
```

![image-20221114095640094](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.2.3.png)

访问 http://192.168.56.101:31224/ 可以看到toncat已经访问成功了

![image-20221114095459654](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.2.4.png)

#### 3、扩容&缩容&删除

使用`kubectl scale --replicas=3 deployment tomcat6`命令可以进行扩容（`--replicas=3`指部署`3`台，`kubectl get svc -o wide`里的`svc`是`service`的缩写）

```bash
[root@k8s-node1 ~]# kubectl scale --replicas=3 deployment tomcat6
deployment.apps/tomcat6 scaled
[root@k8s-node1 ~]# kubectl get pods -o wide
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE        NOMINATED NODE   READINESS GATES
tomcat6-5f7ccf4cb9-fvtp7   1/1     Running   0          62s   10.244.2.3   k8s-node3   <none>           <none>
tomcat6-5f7ccf4cb9-gjmkw   1/1     Running   2          68d   10.244.1.4   k8s-node2   <none>           <none>
tomcat6-5f7ccf4cb9-hj6cz   1/1     Running   0          62s   10.244.2.4   k8s-node3   <none>           <none>
[root@k8s-node1 ~]# kubectl get svc -o wide
NAME         TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE   SELECTOR
kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        68d   <none>
tomcat6      NodePort    10.96.9.217   <none>        80:31224/TCP   14m   app=tomcat6
```

![image-20221114100426024](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.3.1.png)

同理，使用`kubectl scale --replicas=1 deployment tomcat6`命令只部署一台，即可达到缩容的目的

```bash
[root@k8s-node1 ~]# kubectl scale --replicas=1 deployment tomcat6
deployment.apps/tomcat6 scaled
[root@k8s-node1 ~]# kubectl get pods -o wide
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE        NOMINATED NODE   READINESS GATES
tomcat6-5f7ccf4cb9-gjmkw   1/1     Running   2          68d   10.244.1.4   k8s-node2   <none>           <none>
```

![image-20221114100923800](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.3.2.png)

使用`kubectl delete xxx`可以删除`service`、`deployment`

使用`kubectl delete deployment.apps/tomcat6`命令把这次部署删掉

```bash
[root@k8s-node1 ~]# kubectl get all
NAME                           READY   STATUS    RESTARTS   AGE
pod/tomcat6-5f7ccf4cb9-gjmkw   1/1     Running   2          68d

NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        68d
service/tomcat6      NodePort    10.96.9.217   <none>        80:31224/TCP   23m

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/tomcat6   1/1     1            1           68d

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/tomcat6-5f7ccf4cb9   1         1         1       68d
[root@k8s-node1 ~]# kubectl delete deployment.apps/tomcat6
deployment.apps "tomcat6" deleted
[root@k8s-node1 ~]# kubectl get all
NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        68d
service/tomcat6      NodePort    10.96.9.217   <none>        80:31224/TCP   24m
[root@k8s-node1 ~]# kubectl get pods
No resources found in default namespace.
```

![image-20221114101439209](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.3.3.png)

如果你有强迫症，可以使用`kubectl delete service/tomcat6`把这个`service/tomcat6`记录也删掉

```bash
[root@k8s-node1 ~]# kubectl get all
NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        68d
service/tomcat6      NodePort    10.96.9.217   <none>        80:31224/TCP   24m
[root@k8s-node1 ~]# kubectl get pods
No resources found in default namespace.
[root@k8s-node1 ~]# kubectl delete service/tomcat6
service "tomcat6" deleted
[root@k8s-node1 ~]# kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   68d
```

![image-20221114102718643](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.3.4.png)

#### 4、文档

1、[kubectl 文档](https://kubernetes.io/zh/docs/reference/kubectl/overview/ )

2、[资源类型](https://kubernetes.io/zh/docs/reference/kubectl/overview/#%E8%B5%84%E6%BA%90%E7%B1%BB%E5%9E%8B)

3、[格式化输出](https://kubernetes.io/zh/docs/reference/kubectl/overview/#%E6%A0%BC%E5%BC%8F%E5%8C%96%E8%BE%93%E5%87%BA)

4、[常用操作](https://kubernetes.io/zh/docs/reference/kubectl/overview/#%E7%A4%BA%E4%BE%8B-%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C)

5、[命令参考](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

#### 5、查看对应的`yaml`文件

##### 1、创建部署

在输入的命令后面添加` --help`可以看到帮助信息

```bash
kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8 --help
```

![image-20221114104747761](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.1.1.png)

在帮助信息中可以看到可以添加`--dry-run`测试这个命令（不真正执行）

我们使用`kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8 --dry-run -o yaml`命令让创建`tomcat:6.0.53-jre8`的命令输出为`yaml`格式

```bash
[root@k8s-node1 ~]# kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8 --dry-run -o yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: tomcat6
  name: tomcat6
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tomcat6
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: tomcat6
    spec:
      containers:
      - image: tomcat:6.0.53-jre8
        name: tomcat
        resources: {}
status: {}
```

![image-20221114105345073](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.1.2.png)

可以使用`>`符号，把输出重定向到`tomcat6.yaml`文件

```bash
[root@k8s-node1 ~]# kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8 --dry-run -o yaml > tomcat6.yaml
[root@k8s-node1 ~]# ls
anaconda-ks.cfg  k8s  original-ks.cfg  tomcat6.yaml
[root@k8s-node1 ~]# vi tomcat6.yaml 
[root@k8s-node1 ~]# kubectl apply -f tomcat6.yaml 
deployment.apps/tomcat6 created
[root@k8s-node1 ~]# kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
tomcat6-5f7ccf4cb9-7md7d   1/1     Running   0          18s
tomcat6-5f7ccf4cb9-m7zxs   1/1     Running   0          18s
tomcat6-5f7ccf4cb9-wbtpl   1/1     Running   0          18s
```

![image-20221114110249902](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.1.3.png)

修改`tomcat6.yaml`文件，把空的信息删掉，然后`spec:replicas`的值修改为`3`，表示部署`3`个节点

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: tomcat6
  name: tomcat6
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: tomcat6
  name: tomcat6
spec:
  replicas: 3
  selector:
    matchLabels:
      app: tomcat6
  template:
    metadata:
      labels:
        app: tomcat6
    spec:
      containers:
      - image: tomcat:6.0.53-jre8
        name: tomcat
```

![image-20221114110014198](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.1.4.png)、

##### 2、暴露端口

如果查看暴露端口的`yaml`可以看到`kind`为`Service`，而部署一个`tomcat`的`kind`为`Deployment`

```bash
kubectl expose deployment tomcat6 --port=80 --target-port=8080 --type=NodePort --dry-run -o yaml
```

![image-20221114110716611](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.2.png)

##### 3、创建`pod`

也可以复制一个`pod`，可以看到此时的`kind:`为`Pod`

```bash
[root@k8s-node1 ~]# kubectl get pods
NAME                       READY   STATUS    RESTARTS   AGE
tomcat6-5f7ccf4cb9-7md7d   1/1     Running   0          9m46s
tomcat6-5f7ccf4cb9-m7zxs   1/1     Running   0          9m46s
tomcat6-5f7ccf4cb9-wbtpl   1/1     Running   0          9m46s
[root@k8s-node1 ~]# kubectl get pod tomcat6-5f7ccf4cb9-7md7d
NAME                       READY   STATUS    RESTARTS   AGE
tomcat6-5f7ccf4cb9-7md7d   1/1     Running   0          10m
[root@k8s-node1 ~]# kubectl get pod tomcat6-5f7ccf4cb9-7md7d -o yaml
apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: "2022-11-14T03:01:24Z"
  generateName: tomcat6-5f7ccf4cb9-
  labels:
    app: tomcat6
    pod-template-hash: 5f7ccf4cb9
    ...
[root@k8s-node1 ~]# kubectl get pod tomcat6-5f7ccf4cb9-7md7d -o yaml > mypod.yaml
[root@k8s-node1 ~]# ls
anaconda-ks.cfg  k8s  mypod.yaml  original-ks.cfg  tomcat6.yaml
[root@k8s-node1 ~]# vi mypod.yaml 
[root@k8s-node1 ~]# kubectl apply -f mypod.yaml 
pod/tomcat6-new created
[root@k8s-node1 ~]# kubectl get pods
NAME                       READY   STATUS              RESTARTS   AGE
tomcat6-5f7ccf4cb9-7md7d   1/1     Running             0          22m
tomcat6-5f7ccf4cb9-m7zxs   1/1     Running             0          22m
tomcat6-5f7ccf4cb9-wbtpl   1/1     Running             0          22m
tomcat6-new                0/2     ContainerCreating   0          7s

```

![image-20221114112638897](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.3.1.png)

![image-20221114112514891](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.3.2.png)

将`mypod.yaml`修改为如下内容，部署`tomcat:6.0.53-jre8`的同时再部署一个`nginx`

```yaml
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: tomcat6-new
  name: tomcat6-new
  namespace: default
spec:
  containers:
  - image: tomcat:6.0.53-jre8
    imagePullPolicy: IfNotPresent
    name: tomcat6-new
  - image: nginx
    imagePullPolicy: IfNotPresent
    name: nginx
```

![image-20221114112256881](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.5.3.3.png)

##### **完整命令**

[点击查看完整命令和完整截图](code/8.1.6.5.4.md)

#### 6、[相关术语](https://kubernetes.io/zh-cn/docs/concepts/workloads/)

> #### [Pod](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/)
>
> **Pod** 是可以在 Kubernetes 中创建和管理的、最小的可部署的计算单元。
>
> **Pod**（就像在鲸鱼荚或者豌豆荚中）是一组（一个或多个） [容器](https://kubernetes.io/zh-cn/docs/concepts/overview/what-is-kubernetes/#why-containers)； 这些容器共享存储、网络、以及怎样运行这些容器的声明。 Pod 中的内容总是并置（colocated）的并且一同调度，在共享的上下文中运行。 Pod 所建模的是特定于应用的 “逻辑主机”，其中包含一个或多个应用容器， 这些容器相对紧密地耦合在一起。 在非云环境中，在相同的物理机或虚拟机上运行的应用类似于在同一逻辑主机上运行的云应用。
>
> #### [ReplicaSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/)
>
> ReplicaSet 的目的是维护一组在任何时候都处于运行状态的 Pod 副本的稳定集合。 因此，它通常用来保证给定数量的、完全相同的 Pod 的可用性。
>
> ##### 何时使用 ReplicaSet
>
> ReplicaSet 确保任何时间都有指定数量的 Pod 副本在运行。 然而，Deployment 是一个更高级的概念，它管理 ReplicaSet，并向 Pod 提供声明式的更新以及许多其他有用的功能。 因此，我们建议使用 Deployment 而不是直接使用 ReplicaSet， 除非你需要自定义更新业务流程或根本不需要更新。
>
> #### [Deployments](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/)
>
> 一个 Deployment 为 [Pod](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/) 和 [ReplicaSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/) 提供声明式的更新能力。
>
> 你负责描述 Deployment 中的 **目标状态**，而 Deployment [控制器（Controller）](https://kubernetes.io/zh-cn/docs/concepts/architecture/controller/) 以受控速率更改实际状态， 使其变为期望状态。你可以定义 Deployment 以创建新的 ReplicaSet，或删除现有 Deployment， 并通过新的 Deployment 收养其资源。
>
> 以下是 Deployments 的典型用例：
>
> - [创建 Deployment 以将 ReplicaSet 上线](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#creating-a-deployment)。ReplicaSet 在后台创建 Pod。 检查 ReplicaSet 的上线状态，查看其是否成功。
> - 通过更新 Deployment 的 PodTemplateSpec，[声明 Pod 的新状态](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#updating-a-deployment) 。 新的 ReplicaSet 会被创建，Deployment 以受控速率将 Pod 从旧 ReplicaSet 迁移到新 ReplicaSet。 每个新的 ReplicaSet 都会更新 Deployment 的修订版本。
>
> - 如果 Deployment 的当前状态不稳定，[回滚到较早的 Deployment 版本](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)。 每次回滚都会更新 Deployment 的修订版本。
> - [扩大 Deployment 规模以承担更多负载](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#scaling-a-deployment)。
> - [暂停 Deployment 的上线](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#pausing-and-resuming-a-deployment) 以应用对 PodTemplateSpec 所作的多项修改， 然后恢复其执行以启动新的上线版本。
> - [使用 Deployment 状态](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#deployment-status)来判定上线过程是否出现停滞。
> - [清理较旧的不再需要的 ReplicaSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#clean-up-policy) 。
>
> #### [StatefulSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/)
>
> StatefulSet 是用来管理有状态应用的工作负载 API 对象。(比如`mysql`，如果一个节点宕机的话，再拉起一个节点，如果数据没有同步过来，在新的节点上就查不到老节点的数据了)
>
> StatefulSet 用来管理某 [Pod](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/) 集合的部署和扩缩， 并为这些 Pod 提供持久存储和持久标识符。
>
> 和 [Deployment](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/) 类似， StatefulSet 管理基于相同容器规约的一组 Pod。但和 Deployment 不同的是， StatefulSet 为它们的每个 Pod 维护了一个有粘性的 ID。这些 Pod 是基于相同的规约来创建的， 但是不能相互替换：无论怎么调度，每个 Pod 都有一个永久不变的 ID。
>
> 如果希望使用存储卷为工作负载提供持久存储，可以使用 StatefulSet 作为解决方案的一部分。 尽管 StatefulSet 中的单个 Pod 仍可能出现故障， 但持久的 Pod 标识符使得将现有卷与替换已失败 Pod 的新 Pod 相匹配变得更加容易。
>
> StatefulSet 对于需要满足以下一个或多个需求的应用程序很有价值：
>
> - 稳定的、唯一的网络标识符。
> - 稳定的、持久的存储。
> - 有序的、优雅的部署和扩缩。
> - 有序的、自动的滚动更新。
>
> #### [DaemonSet](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/daemonset/) 
>
> 确保全部（或者某些）节点上运行一个 Pod 的副本。 当有节点加入集群时， 也会为他们新增一个 Pod 。 当有节点从集群移除时，这些 Pod 也会被回收。删除 DaemonSet 将会删除它创建的所有 Pod。
>
> DaemonSet 的一些典型用法：
>
> - 在每个节点上运行集群守护进程
> - 在每个节点上运行日志收集守护进程
> - 在每个节点上运行监控守护进程
>
> 一种简单的用法是为每种类型的守护进程在所有的节点上都启动一个 DaemonSet。 一个稍微复杂的用法是为同一种守护进程部署多个 DaemonSet；每个具有不同的标志， 并且对不同硬件类型具有不同的内存、CPU 要求。

##### 1、Pod 是什么，Controller 是什么

![image-20221114140535845](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.6.1.png)

`pod`是`kubernetes`的最小单元，一个`pod`里面可以有多个容器，在同一个`Node`的`pod`网络是互通的，彼此之间可以互相访问

控制器（`controller`）可以创建和管理多个 Pod，管理副本和上线，并在集群范围内提供自修复能力。 例如，如果一个节点失败，控制器可以在不同的节点上调度一样的替身来自动替换 Pod

##### 2、Deployment&Service 是什么

![image-20221114140557160](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.6.2.png)

`Deployment`是`master`节点保存的部署状态信息，`Service`用于组合多个`Pod`，节点内的`Pod`是可以`ping`通的，但是节点之间是`ping`不同的，想让`Pod`整体可以访问，可以把他们暴露成一个`Service`，这样只要访问`Service`的端口，会自动转到相应的`Pod`，`Service`相当于是对`Pod`的负载均衡

##### 3、Service 的意义

1、部署一个 nginx

kubectl create deployment nginx --image=nginx 

2、暴露 nginx 访问

kubectl expose deployment nginx --port=80 --type=NodePort

统一应用访问入口； Service 管理一组 Pod。

防止 Pod 失联（服务发现）、定义一组 Pod 的访问策略

现在 Service 我们使用 NodePort 的方式暴露，这样访问每个节点的端口，都可以访问到这个 Pod，如果节点宕机，就会出现问题。

![image-20221114142032540](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.6.3.png)

##### 4、labels and selectors

可以给相同的`Pod`打上不同的标签，然后可以通过`Label Selector`来选择不同的标签（类似于`css`选择器）

![image-20221114142447034](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.6.4.png)

#### 7、再次部署

##### 1、通过`ip`访问

先把这些都删了，然后再进行测试

```bash
kubectl get all
kubectl delete deployment.apps/tomcat6
kubectl get all
kubectl delete pod/tomcat6-new
kubectl get all
ls
rm -f tomcat6.yaml
ls
```

![image-20221114155610020](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.1.1.png)

使用如下命令部署`tomcat6`

```bash
[root@k8s-node1 ~]# kubectl create deployment tomcat6 --image=tomcat:6.0.53-jre8 --dry-run -o yaml > tomcat6-deployment.yaml
[root@k8s-node1 ~]# vi tomcat6-deployment.yaml 
[root@k8s-node1 ~]# kubectl apply -f tomcat6-deployment.yaml 
deployment.apps/tomcat6 created
```

![image-20221114160842164](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.1.2.png)

`tomcat6-deployment.yaml`文件：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: tomcat6
  name: tomcat6
spec:
  replicas: 3
  selector:
    matchLabels:
      app: tomcat6
  template:
    metadata:
      labels:
        app: tomcat6
    spec:
      containers:
      - image: tomcat:6.0.53-jre8
        name: tomcat
```

![image-20221114152917146](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.1.3.png)

也可以同时部署和暴露，只需要都写进`yaml`文件里，使用`---`分割即可

[点击查看完整命令](code/8.1.6.7.1.md)

![image-20221114163249935](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.1.4.png)

yml允许多个文档片段，中间使用三个短横杠(`---`)分割

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: tomcat6
  name: tomcat6
spec:
  replicas: 3
  selector:
    matchLabels:
      app: tomcat6
  template:
    metadata:
      labels:
        app: tomcat6
    spec:
      containers:
      - image: tomcat:6.0.53-jre8
        name: tomcat
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: tomcat6
  name: tomcat6
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8080
  selector:
    app: tomcat6
  type: NodePort
```

![image-20221114161419652](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.1.5.png)

访问该暴露的端口即可访问到`tomcat`：    http://192.168.56.101:31992/

![image-20221114163418797](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.1.6.png)

##### 2、通过域名访问

这种用ip访问的方式有很大的缺陷，因此可以使用`Ingress`（底层使用的是`nginx`）来通过域名访问

```bash
ls
cd k8s/
ls
vi ingress-controller.yaml       
kubectl apply -f ingress-controller.yaml 
kubectl get pods
kubectl get pods --all-namespaces
```

![image-20221114195534833](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.2.1.png)

应用`ingress-tomcat6.yaml`配置

```bash
[root@k8s-node1 k8s]# ls
get_helm.sh              ingress-demo.yml  kubernetes-dashboard.yaml       master_images.sh  product.yaml
ingress-controller.yaml  kube-flannel.yml  kubesphere-complete-setup.yaml  node_images.sh    Vagrantfile
[root@k8s-node1 k8s]# rm -rf ingress-demo.yml
[root@k8s-node1 k8s]# vi ingress-tomcat6.yaml
[root@k8s-node1 k8s]# kubectl apply -f ingress-tomcat6.yaml
ingress.extensions/web created
[root@k8s-node1 k8s]# kubectl get all
NAME                           READY   STATUS    RESTARTS   AGE
pod/tomcat6-5f7ccf4cb9-4hfzv   1/1     Running   0          3h52m
pod/tomcat6-5f7ccf4cb9-8nthk   1/1     Running   0          3h52m
pod/tomcat6-5f7ccf4cb9-tzwml   1/1     Running   0          3h52m

NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)        AGE
service/kubernetes   ClusterIP   10.96.0.1     <none>        443/TCP        69d
service/tomcat6      NodePort    10.96.1.153   <none>        80:31992/TCP   3h52m

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/tomcat6   3/3     3            3           3h52m

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/tomcat6-5f7ccf4cb9   3         3         3       3h52m
```

![image-20221114201122015](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.2.2.png)

我们前面把`tomcat`的`8080`暴露到`pod`的`80`端口，所以我们`servicePort`这里只用写`80`端口

注意：`backend`和`serviceName`、`servicePort`不是对齐的

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: web
spec:
  rules:
  - host: tomcat6.atguigu.com
    http:
      paths:
        - backend:
           serviceName: tomcat6
           servicePort: 80
```

![image-20221114201516887](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.2.3.png)

使用`SwitchHosts`软件，在`hosts`文件里将`tomcat6.atguigu.com`域名映射到`192.168.56.101`

```bash
192.168.56.101 tomcat6.atguigu.com
```

![image-20221114201832095](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.2.4.png)

此时，通过 http://tomcat6.atguigu.com/ 也可以访问成功了

![image-20221114202011960](https://gitlab.com/apzs/image/-/raw/master/image/8.1.6.7.2.5.png)

##### 完整命令

[点击查看完整命令](code/8.1.6.7.2.md)

### 8.1.7、[安装Helm](https://helm.sh/zh/docs/intro/install/)

Helm 是 Kubernetes 的包管理器。包管理器类似于我们在 Ubuntu 中使用的 apt、Centos 中使用的 yum 或者 Python 中的 pip 一样，能快速查找、下载和安装软件包。Helm 由客 户端组件 helm 和服务端组件 Tiller 组成, 能够将一组 K8S 资源打包统一管理, 是查找、共 享和使用为 Kubernetes 构建的软件的最佳方式。

> # 安装Helm
>
> 该指南展示了如何安装Helm CLI。Helm可以用源码或构建的二进制版本安装。
>
> ## 用Helm项目安装
>
> Helm项目提供了两种获取和安装Helm的方式。这是官方提供的获取Helm发布版本的方法。另外， Helm社区提供了通过不同包管理器安装Helm的方法。这些方法可以在下面的官方方法之后看到。
>
> ### 用二进制版本安装
>
> 每个Helm [版本](https://github.com/helm/helm/releases)都提供了各种操作系统的二进制版本，这些版本可以手动下载和安装。
>
> 1. 下载 [需要的版本](https://github.com/helm/helm/releases)
> 2. 解压(`tar -zxvf helm-v3.0.0-linux-amd64.tar.gz`)
> 3. 在解压目中找到`helm`程序，移动到需要的目录中(`mv linux-amd64/helm /usr/local/bin/helm`)
>
> 然后就可以执行客户端程序并 [添加稳定仓库](https://helm.sh/zh/docs/intro/quickstart/#初始化): `helm help`.
>
> **注意** 针对Linux AMD64，Helm的自动测试只有在CircleCi构建和发布时才会执行。测试其他操作系统是社区针对系统问题请求Helm的责任。
>
> ### 使用脚本安装
>
> Helm现在有个安装脚本可以自动拉取最新的Helm版本并在 [本地安装](https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3)。
>
> 您可以获取这个脚本并在本地执行。它良好的文档会让您在执行之前知道脚本都做了什么。
>
> ```console
> $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
> $ chmod 700 get_helm.sh
> $ ./get_helm.sh
> ```
>
> 如果想直接执行安装，运行`curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`。

Helm 是 Kubernetes 的包管理器。包管理器类似于我们在 Ubuntu 中使用的 apt、Centos 中使用的 yum 或者 Python 中的 pip 一样，能快速查找、下载和安装软件包。Helm 由客 户端组件 helm 和服务端组件 Tiller 组成, 能够将一组 K8S 资源打包统一管理, 是查找、共 享和使用为 Kubernetes 构建的软件的最佳方式。

完整命令：

```bash
## 在mster节点随便找一个文件加解压这个文件
tar -zxvf helm-v2.16.3-linux-amd64.tar.gz
## 把helm 文件移动到/usr/local/bin/helm 目录下
mv linux-amd64/helm /usr/local/bin/helm
## 把tiller 文件移动到/usr/local/bin/tiller 目录下
mv linux-amd64/tiller /usr/local/bin/tiller
kubectl get pods --all-namespaces
## 创建权限（master 执行）新建一个文件，helm-rbac.yaml 文件的内容在下方
vi helm-rbac.yaml
## 执行这个文件 新建tiller
kubectl apply -f helm-rbac.yaml
## 初始化装好 –tiller-image 指定镜像，否则会被墙，等待节点上部署的tiller完成即可。这个过程可能需要4-5分钟，请耐心等待
helm init --service-account=tiller --tiller-image=sapcc/tiller:v2.17.0 --history-max 300 
## 查看版本，会发现有两个版本，一个服务端的，一个客户端的。
helm version
## 查看安装情况(等待STATUS都变为Runing)
kubectl get pods --all-namespaces
```

**helm-rbac.yaml 文件内容如下**

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: kubernetes-dashboard
    namespace: kube-system
```

参考1：[ Kubesphere安装_星夜孤帆的博客-CSDN博客_kubesphere 安装](https://blog.csdn.net/qq_38826019/article/details/115455878)

参考2： [KubeSphere的使用_阿门之恋的博客-CSDN博客_kubesphere使用](https://blog.csdn.net/fen_dou_shao_nian/article/details/119314716)

查看`helm`的历史版本，找到[v2.16.3](https://github.com/helm/helm/releases/tag/v2.16.3)这个版本，选择下载[helm-v2.16.3-linux-amd64.tar.gz](https://get.helm.sh/helm-v2.16.3-linux-amd64.tar.gz)

（使用浏览器下载超级慢，可以使用`IDM`下载，或者使用迅雷。一般下载国外网站里的文件使用迅雷下载都很快）

![image-20221114224705701](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.1.png)

将下载的`helm-v2.16.3-linux-amd64.tar.gz`移动到`/root/k8s`里

![image-20221114230007262](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.2.png)

然后执行如下命令安装`helm`，可以看到`Client`安装成功了，但是`Server`安装失败了

```bash
[root@k8s-node1 k8s]# ll
total 24736
-rwx------  1 root root     7153 Nov 14 14:19 get_helm.sh
-rw-r--r--  1 root root 25263741 Nov 14 14:59 helm-v2.16.3-linux-amd64.tar.gz
-rw-r--r--. 1 root root     6310 Sep  5 13:53 ingress-controller.yaml
-rw-r--r--  1 root root      215 Nov 14 12:10 ingress-tomcat6.yaml
-rw-r--r--. 1 root root    15016 Sep  5 13:53 kube-flannel.yml
-rw-r--r--. 1 root root     4737 Sep  5 13:53 kubernetes-dashboard.yaml
-rw-r--r--. 1 root root     3841 Sep  5 13:53 kubesphere-complete-setup.yaml
-rwx------. 1 root root      392 Sep  5 13:53 master_images.sh
-rw-r--r--. 1 root root      283 Sep  5 13:53 node_images.sh
-rw-r--r--. 1 root root     1053 Sep  5 13:53 product.yaml
-rw-r--r--. 1 root root      931 Sep  5 13:53 Vagrantfile
[root@k8s-node1 k8s]# tar -zxvf helm-v2.16.3-linux-amd64.tar.gz 
linux-amd64/
linux-amd64/helm
linux-amd64/tiller
linux-amd64/LICENSE
linux-amd64/README.md
[root@k8s-node1 k8s]# mv linux-amd64/helm /usr/local/bin/helm
[root@k8s-node1 k8s]# helm version
Client: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
Error: could not find tiller
```

![image-20221114230634640](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.3.png)

可以使用如下命令安装`helm`，可以看到这次`Client`和`Server`都成功了

```bash
[root@k8s-node1 ~]# helm version
Client: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
Error: could not find tiller
[root@k8s-node1 ~]# ls
anaconda-ks.cfg  k8s  mypod.yaml  original-ks.cfg  tomcat6-deployment.yaml
[root@k8s-node1 ~]# cd k8s
[root@k8s-node1 k8s]# ls
get_helm.sh                      ingress-controller.yaml  kube-flannel.yml           kubesphere-complete-setup.yaml  master_images.sh  product.yaml
helm-v2.16.3-linux-amd64.tar.gz  ingress-tomcat6.yaml     kubernetes-dashboard.yaml  linux-amd64                     node_images.sh    Vagrantfile
[root@k8s-node1 k8s]# mv linux-amd64/tiller /usr/local/bin/tiller
[root@k8s-node1 k8s]# vi helm_rbac.yaml
[root@k8s-node1 k8s]# ls
get_helm.sh     helm-v2.16.3-linux-amd64.tar.gz  ingress-tomcat6.yaml  kubernetes-dashboard.yaml       linux-amd64       node_images.sh  Vagrantfile
helm_rbac.yaml  ingress-controller.yaml          kube-flannel.yml      kubesphere-complete-setup.yaml  master_images.sh  product.yaml
[root@k8s-node1 k8s]# kubectl apply -f helm_rbac.yaml
serviceaccount/tiller created
clusterrolebinding.rbac.authorization.k8s.io/tiller created
[root@k8s-node1 k8s]# helm init --service-account=tiller --tiller-image=jessestuart/tiller:v2.16.3 --history-max 300
$HELM_HOME has been configured at /root/.helm.

Tiller (the Helm server-side component) has been installed into your Kubernetes Cluster.

Please note: by default, Tiller is deployed with an insecure 'allow unauthenticated users' policy.
To prevent this, run `helm init` with the --tiller-tls-verify flag.
For more information on securing your installation see: https://docs.helm.sh/using_helm/#securing-your-helm-installation
[root@k8s-node1 k8s]# helm version
Client: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"dirty"}
```

![image-20221115103013633](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.4.png)

`helm_rbac.yaml`文件内容

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: kubernetes-dashboard
    namespace: kube-system
```

![image-20221115093516679](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.5.png)



ps:

> 使用老师的命令：
>
> ```
> curl -L https://git.io/get_helm.sh | bash
> ```
>
> 墙原因，上传我们给定的 get_helm.sh，chmod 700 然后./get_helm.sh 可能有文件格式兼容性问题，用 vi 打开该 sh 文件，输入：
> `:set ff`回车，显示 fileformat=dos，重新设置下文件格式`:set ff=unix`    保存退出    `:wq`

按照老师的步骤会出错：

```bash
[root@k8s-node1 k8s]# helm version
-bash: helm: command not found
[root@k8s-node1 k8s]# curl -L https://git.io/get_helm.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:02:06 --:--:--     0curl: (7) Failed to connect to 2001::6ca0:adcf: Network is unreachable
[root@k8s-node1 k8s]# ls
get_helm.sh              ingress-tomcat6.yaml  kubernetes-dashboard.yaml       master_images.sh  product.yaml
ingress-controller.yaml  kube-flannel.yml      kubesphere-complete-setup.yaml  node_images.sh    Vagrantfile
[root@k8s-node1 k8s]# chmod 700 get_helm.sh 
[root@k8s-node1 k8s]# ll
total 64
-rwx------. 1 root root  7149 Sep  5 13:53 get_helm.sh
-rw-r--r--. 1 root root  6310 Sep  5 13:53 ingress-controller.yaml
-rw-r--r--  1 root root   215 Nov 14 12:10 ingress-tomcat6.yaml
-rw-r--r--. 1 root root 15016 Sep  5 13:53 kube-flannel.yml
-rw-r--r--. 1 root root  4737 Sep  5 13:53 kubernetes-dashboard.yaml
-rw-r--r--. 1 root root  3841 Sep  5 13:53 kubesphere-complete-setup.yaml
-rwx------. 1 root root   392 Sep  5 13:53 master_images.sh
-rw-r--r--. 1 root root   283 Sep  5 13:53 node_images.sh
-rw-r--r--. 1 root root  1053 Sep  5 13:53 product.yaml
-rw-r--r--. 1 root root   931 Sep  5 13:53 Vagrantfile
[root@k8s-node1 k8s]# vi get_helm.sh 
[root@k8s-node1 k8s]# ./get_helm.sh 
Downloading https://get.helm.sh/helm--linux-amd64.tar.gz
SHA sum of /tmp/helm-installer-9SplrP/helm--linux-amd64.tar.gz does not match. Aborting.
Failed to install helm
	For support, go to https://github.com/helm/helm.
```

![image-20221114221038530](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.6.png)



<img src="https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.7.png" alt="GIF 2022-11-14 21-39-05" style="zoom:67%;" />

> 给的文件无法使用: 获取不到版本信息: 建议直接修改第 114 行yaml配置为: `HELM_DIST="helm-v2.16.3-$OS-$ARCH.tar.gz"`（命令模式下输入`:set number`可以显示行号）
>
> 老师演示的kubespher版本已经不被推荐使用了，新版本的不需要安装helm和tiller,也就是说，这段直接去官网下载即可。

查看输出的控制台信息可以看到：`Downloading https://get.helm.sh/helm--linux-amd64.tar.gz` 丢失了版本，因此可以直接修改第 114 行yaml配置为: `HELM_DIST="helm-v2.16.3-$OS-$ARCH.tar.gz"`

![image-20221114222214601](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.8.png)

此时获取到了版本信息，但是连接超时了（这个下载超级慢）

```bash
[root@k8s-node1 k8s]# vi get_helm.sh
[root@k8s-node1 k8s]# ./get_helm.sh 
Downloading https://get.helm.sh/helm--linux-amd64.tar.gz
SHA sum of /tmp/helm-installer-9SplrP/helm--linux-amd64.tar.gz does not match. Aborting.
Failed to install helm
	For support, go to https://github.com/helm/helm.
[root@k8s-node1 k8s]# vi get_helm.sh 
[root@k8s-node1 k8s]# ./get_helm.sh 
Downloading https://get.helm.sh/helm-v2.16.3-linux-amd64.tar.gz
curl: (28) Operation timed out after 300140 milliseconds with 0 out of 0 bytes received
Failed to install helm
	For support, go to https://github.com/helm/helm.
```

![image-20221114223035023](https://gitlab.com/apzs/image/-/raw/master/image/8.1.7.9.png)



### 8.1.8、安装`Taint`

```bash
## 查看所有节点，找到主节点名称
kubectl get node -o wide
## 在主节点上查看有没有污点有污点，表示被人占用
kubectl describe node k8s-node1 | grep Taint
## 去除污点
kubectl taint nodes k8s-node1 node-role.kubernetes.io/master:NoSchedule-
## 创建 openebs 为存储器
kubectl apply -f https://openebs.github.io/charts/openebs-operator-1.5.0.yaml
## 查看安装情况(等待STATUS都变为Runing)
kubectl get pods --all-namespaces
## 安装 OpenEBS 后将自动创建 4 个 StorageClass
kubectl get sc --all-namespaces
##如下将 openebs-hostpath设置为 默认的 StorageClass
kubectl patch storageclass openebs-hostpath -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
## 将污点重新设置回来
kubectl taint nodes k8s-node1 node-role.kubernetes.io/master=:NoSchedule
## 测试存储类型是否安装成功demo-openebs-hostpath.yaml
# kubectl apply -f demo-openebs-hostpath.yaml -n openebs
## 如果 PVC 的状态为 Bound并且 Pod 状态为 running，则说明已经成功挂载，证明了默认的 StorageClass（openebs-hostpath）是正常工作的
# kubectl get pvc -n openebs
```

[点击查看`demo-openebs-hostpath.yaml`文件](code/8.1.8.1.md)

[点击查看完整命令](code/8.1.8.2.md)

### 8.1.9、最小化安装

#### 1、最小化安装

```bash
[root@k8s-node1 ~]# clear
[root@k8s-node1 ~]# vi kubesphere-minimal.yaml
[root@k8s-node1 ~]# ll
total 32
-rw-------. 1 root root 5570 Apr 30  2020 anaconda-ks.cfg
drwxr-xr-x. 3 root root 4096 Nov 15 01:36 k8s
-rw-r--r--  1 root root 3625 Nov 15 12:47 kubesphere-minimal.yaml
-rw-r--r--  1 root root  280 Nov 14 03:23 mypod.yaml
-rw-------. 1 root root 5300 Apr 30  2020 original-ks.cfg
-rw-r--r--  1 root root  502 Nov 14 08:15 tomcat6-deployment.yaml
#最小化安装，创建大概等了5分钟
[root@k8s-node1 ~]# kubectl apply -f kubesphere-minimal.yaml 
namespace/kubesphere-system created
configmap/ks-installer created
serviceaccount/ks-installer created
clusterrole.rbac.authorization.k8s.io/ks-installer created
clusterrolebinding.rbac.authorization.k8s.io/ks-installer created
deployment.apps/ks-installer created
#查看安装过程发现失败了
[root@k8s-node1 ~]# kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
Error from server (BadRequest): container "installer" in pod "ks-installer-75b8d89dff-rldjq" is waiting to start: ContainerCreating
#等全部状态为Running，再查看安装过程（安装过程大概十几分钟）
[root@k8s-node1 ~]# kubectl get pods --all-namespaces
NAMESPACE           NAME                                          READY   STATUS              RESTARTS   AGE
default             tomcat6-5f7ccf4cb9-4hfzv                      1/1     Running             4          28h
default             tomcat6-5f7ccf4cb9-8nthk                      1/1     Running             4          28h
default             tomcat6-5f7ccf4cb9-tzwml                      1/1     Running             4          28h
ingress-nginx       nginx-ingress-controller-fzkxq                1/1     Running             4          10h
ingress-nginx       nginx-ingress-controller-l5bsm                1/1     Running             8          25h
ingress-nginx       nginx-ingress-controller-tnpsh                1/1     Running             7          25h
kube-system         coredns-7f9c544f75-klr4j                      1/1     Running             6          70d
kube-system         coredns-7f9c544f75-mckd4                      1/1     Running             6          70d
kube-system         etcd-k8s-node1                                1/1     Running             6          70d
kube-system         kube-apiserver-k8s-node1                      1/1     Running             6          70d
kube-system         kube-controller-manager-k8s-node1             1/1     Running             6          70d
kube-system         kube-flannel-ds-amd64-mb9dw                   1/1     Running             8          70d
kube-system         kube-flannel-ds-amd64-wc8rd                   1/1     Running             9          70d
kube-system         kube-flannel-ds-amd64-xccgq                   1/1     Running             8          70d
kube-system         kube-proxy-52tnk                              1/1     Running             7          70d
kube-system         kube-proxy-7nwdt                              1/1     Running             7          70d
kube-system         kube-proxy-p2b9m                              1/1     Running             6          70d
kube-system         kube-scheduler-k8s-node1                      1/1     Running             6          70d
kube-system         tiller-deploy-6ffcfbc8df-7mhg5                1/1     Running             2          11h
kubesphere-system   ks-installer-75b8d89dff-rldjq                 0/1     ContainerCreating   0          79s
openebs             openebs-admission-server-5cf6864fbf-dlvqh     1/1     Running             2          9h
#如果`ks-account`状态为Init:1/2 或则 ks-apigateway状态为ContainerCreating、Error可以使用如下命令重启一下
kubectl -n kubesphere-system rollout restart deployment/ks-account
#使用如下命令可以查看日志
kubectl -n kubesphere-system logs pod ks-apigateway-xxxxx
```

![image-20221115212352614](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.1.1.png)

![image-20221115212803782](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.1.2.png)

打开浏览器，访问  http://10.0.2.5:30880  输入`node1`节点控制台的用户名和密码即可进入仪表盘

![image-20221115221948001](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.1.3.png)

进入仪表盘后会显示如下界面

![image-20221115221958312](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.1.4.png)

[kubesphere-minimal.yaml在线文件](https://raw.githubusercontent.com/kubesphere/ks-installer/v2.1.1/kubesphere-minimal.yaml)

[kubesphere-minimal.yaml离线文件](code\kubesphere-minimal.yaml)

[点击查看完整命令和完整截图](code/8.1.9.1.md)

#### 2、开启其他功能

`devops`、`devops/sonarqube`代码检查，`notification`、`alerting`

[安装 Metrics-server 开启 HPA | KubeSphere Documents](https://v2-1.docs.kubesphere.io/docs/zh-CN/installation/install-metrics-server/)

```bash
#编辑ks-installer文件
kubectl edit cm -n kubesphere-system ks-installer
#查看安装guo'c（大概需要20多分钟）
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
```

![image-20221116195239645](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.1.png)

再次输入`node1`节点控制台的用户邮箱和密码

![image-20221116201531819](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.2.png)

进入仪表盘后会显示如下界面

![image-20221116205533929](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.3.png)

企业空间：一个独立的团队，比如说`尚硅谷`；一个企业空间下可以有多个项目，比如说`谷粒商城`、`谷粒学苑`

![image-20221116203423493](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.4.png)

项目管理：每一个项目都属于某一个企业空间

![image-20221116203355170](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.5.png)

账户管理：就是管理账户，可以对帐户授予各种权限

![image-20221116203646929](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.6.png)

基础设施：可以看到企业当前的所有资源信息

![image-20221116203835141](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.7.png)

点进去还可以查看`节点状态`，`容器组`等详细信息

`运行状态`：

![image-20221116203943490](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.8.png)

`容器组`：

![image-20221116204155509](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.9.png)

点击容器组下的某个容器组，还可以查看该容器组里某个容器的日志

![image-20221116204218402](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.10.png)

点击仪表盘的`kubernetes` -> `DevOps`即可查看自动化部署信息

![image-20221116205447934](https://gitlab.com/apzs/image/-/raw/master/image/8.1.9.2.11.png)

[点击查看完整`ks-installer`文件](code/8.1.9.2.md)

```bash
task monitoring status is successful
task alerting status is successful
total: 4     completed:3
**************************************************
task notification status is successful
task monitoring status is successful
task alerting status is successful
total: 4     completed:3
**************************************************
task notification status is successful
task monitoring status is successful
task alerting status is successful
total: 4     completed:3
**************************************************
task notification status is successful
task monitoring status is successful
task devops status is successful
task alerting status is successful
total: 4     completed:4
**************************************************
#####################################################
###              Welcome to KubeSphere!           ###
#####################################################

Console: http://10.0.2.5:30880
Account: admin
Password: P@88w0rd

NOTES：
  1. After logging into the console, please check the
     monitoring status of service components in
     the "Cluster Status". If the service is not
     ready, please wait patiently. You can start
     to use when all components are ready.
  2. Please modify the default password after login.

#####################################################
```

## 8.2、使用K8s

### 8.2.1、多租户管理快速入门

[多租户管理快速入门 | KubeSphere Documents](https://v2-1.docs.kubesphere.io/docs/zh-CN/quick-start/admin-quick-start/)

[多租户管理快速入门 | 离线版](code\多租户管理快速入门.md)

![kubesphere用户系统](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.0.png)

| 操作人账号    | 操作                                                         | 添加的账号         |                             |                                                              | 密码                    |
| ------------- | ------------------------------------------------------------ | ------------------ | --------------------------- | ------------------------------------------------------------ | ----------------------- |
| admin         | 创建平台角色                                                 | user-manager       | CRUD用户、角色              |                                                              |                         |
| admin         | 创建账户                                                     | atguigu-hr         | atguigu-hr@atguigu.com      | user-manager(用户、角色管理)                                 | atguigu-hr-A123456      |
| atguigu-hr    | 创建账户                                                     | ws-manager         | ws-manager@atguigu.com      | workspaces-manager(工作空间管理员，可以创建工作空间、邀请成员，查看所有企业空间成员) | ws-manager-A123456      |
| atguigu-hr    | 创建账户                                                     | ws-admin           | ws-admin@atguigu.com        | cluster-regular(先设置为普通用户)                            | ws-admin-A123456        |
| atguigu-hr    | 创建账户                                                     | project-admin      | project-admin@atguigu.com   | cluster-regular(先设置为普通用户)                            | project-admin-A123456   |
| atguigu-hr    | 创建账户                                                     | project-regular    | project-regular@atguigu.com | cluster-regular(先设置为普通用户)                            | project-regular-A123456 |
| ws-manager    | 创建企业空间                                                 | gulimall-workspace | ws-manager                  | 谷粒商城企业空间                                             |                         |
| ws-manager    | 创建企业空间                                                 | guliedu-workspace  | ws-manager                  |                                                              |                         |
| ws-manager    | 添加ws-admin为管理员(管理员可以管理项目，邀请成员，查看成员) |                    |                             |                                                              |                         |
| ws-admin      | 邀请project-admin进入企业空间，并授予workspace-regular权限(regular可以创建项目，邀请项目成员。不能查看企业空间成员) |                    |                             |                                                              |                         |
| ws-admin      | 邀请project-regular进入企业空间，并授予workspace-viewer权限(viewer可以查看项目、企业空间成员) |                    |                             |                                                              |                         |
| project-admin | 创建gulimall项目，并邀请project-regular作为项目的operator开发人员(可以部署应用) | gulimall           | 谷粒商城                    |                                                              |                         |
| project-admin | 创建gulimall-devops项目，并邀请project-regular作为项目的maintainer维护者(可以设置github账号密码等) | gulimall-devops    | 谷粒商城的自动化部署        |                                                              |                         |

#### 1、新建角色

首先，新建`user-manager`角色：

使用控制台显示的用户名和密码进入系统后，点击`平台管理`  -> `平台角色`  -> `创建` ，在名称里输入`user-manager`，描述信息输入`CRUD用户、角色`，点击下一步，在权限设置中选择`账户管理`和`角色管理`，然后点击创建。

![GIF 2022-11-16 21-16-52](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.1.gif)

#### 2、新建账号

新建账号：`atguigu-hr`

在`平台管理`  -> `账户管理` 里，点击`创建`，用户名输入`atguigu-hr`，邮箱输入`atguigu-hr@atguigu.com`，角色选择` user-manager`，密码输入`atguigu-hr-A123456`，然后点击`确定`

![GIF 2022-11-16 21-28-01](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.2.1.gif)

新建账户：`ws-manager`

在`平台管理`  -> `账户管理` 里，点击`创建`，用户名输入`ws-manager`，邮箱输入`ws-manager@atguigu.com`，角色选择` workspaces-manager`，密码输入`ws-manager-A123456`，然后点击`确定`

![GIF 2022-11-17 21-27-03](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.2.2.gif)

创建账户：`ws-admin`

在`平台管理`  -> `账户管理` 里，点击`创建`，用户名输入`ws-admin`，邮箱输入`ws-admin@atguigu.com`，角色选择` cluster-regular`，密码输入`ws-admin-A123456`，然后点击`确定`

![GIF 2022-11-17 21-31-21](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.2.3.gif)

新建账户：`project-admin`

在`平台管理`  -> `账户管理` 里，点击`创建`，用户名输入` project-admin`，邮箱输入`project-admin@atguigu.com`，角色选择` cluster-regular`，密码输入`project-admin-A123456`，然后点击`确定`

![GIF 2022-11-17 21-33-18](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.2.4.gif)

新建账户：`project-regular`

在`平台管理`  -> `账户管理` 里，点击`创建`，用户名输入`project-regular`，邮箱输入`project-regular@atguigu.com`，角色选择`cluster-regular`，密码输入`project-regular-A123456`，然后点击`确定`

![GIF 2022-11-17 21-34-59](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.2.5.gif)

#### 3、新建企业空间

新建企业空间：`gulimall-workspace`

使用使用`ws-manager`账户，`ws-manager-A123456`密码登录，在企业空间里点击`创建`，在企业空间名称里输入`gulimall-workspace`，企业空间管理员保持默认为`ws-manager`，描述信息里`谷粒商城企业空间`，然后点击`确定`

![GIF 2022-11-17 21-37-16](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.3.1.gif)

新建企业空间：`guliedu-workspace`

在企业空间里点击`创建`，在企业空间名称里输入`guliedu-workspace`，企业空间管理员保持默认为`ws-manager`，然后点击`确定`

![GIF 2022-11-17 21-42-42](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.3.2.gif)

#### 4、添加管理员

添加`ws-admin`为管理员

在企业空间里点击`gulimall-workspace`，点击`企业空间设置`  ->  `企业成员`  ->  `邀请成员`  -> 点击`ws-admin` 右侧的`+`，点击`workspace-admin`

![GIF 2022-11-17 21-52-25](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.4.gif)

#### 5、邀请进入企业空间并添加权限

使用` ws-admin`账号，`ws-admin-A123456`密码登录系统，点击`企业空间 gulimall-workspace`下方的`进入企业空间`，点击`企业空间设置`  -> `企业成员`  ->  `邀请成员` ，邀请`project-admin`进入企业空间，并授予`workspace-regular`权限(regular可以创建项目，查看成员)，邀请`project-regular`进入企业空间，并授予`workspace-viewer`权限(viewer可以查看项目、成员)，然后点击`关闭`

![GIF 2022-11-17 22-14-12](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.5.gif)

#### 6、创建项目

使用`project-admin`账号，`project-admin-A123456`密码登录系统，然后点击`创建`，选择`创建资源型项目`，在基本信息里名称输入`gulimall`，别名输入`谷粒商城`，然后点击`下一步`，在高级设置里保持默认配置，然后点击`创建`。在`gulimall`项目里的`项目设置`  ->  `项目成员`里点击`邀请成员`，邀请`project-regular`作为`operator`项目的开发人员(可以部署应用)

![GIF 2022-11-17 22-28-51](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.6.1.gif)

在工作台里点击`创建`，选择`创建一个DevOps 工程`；在基本信息里，名称输入`gulimall-devops`，描述信息输入`谷粒商城的自动化部署`，然后点击`创建`，然后点进`gulimall-devops`里，在`工程管理`的`工程成员`里点击`邀请成员`，邀请`project-regular`作为`maintainer`项目的维护者(可以设置github账号密码等)

![GIF 2022-11-17 22-36-11](https://gitlab.com/apzs/image/-/raw/master/image/8.2.1.6.2.gif)

### 8.2.2、创建 Wordpress并发布至 K8s

[创建 Wordpress 应用并发布至 Kubernetes | KubeSphere Documents](https://v2-1.docs.kubesphere.io/docs/zh-CN/quick-start/wordpress-deployment/)

[创建 Wordpress 应用并发布至 Kubernetes | 离线版](code\创建 Wordpress 应用并发布至 Kubernetes.md)

#### 1、创建密钥

##### 1、创建 MySQL 密钥

可以在配置中心设置密钥，以隐藏敏感信息。密钥密钥的`key`即为以前创建`docker`容器的参数，可以设置哪些属性可以再`docker hub`中查看。

使用`project-regular`账号，`project-regular-A123456`密码登录系统，在项目里点击`gulimall(谷粒商城)`项目，在`配置中心`  -> `密钥`里点击`创建`，在基本信息里名称输入`mysql-secret`，别名输入`MYSQL 密钥`，然后点击`下一步`；在密钥设置里，点击`添加数据`，然后`键`输入`MYSQL_ROOT_PASSWORD`，值里输入`123456`，点击对钩，然后再点击`创建`

![GIF 2022-11-17 22-51-20](https://gitlab.com/apzs/image/-/raw/master/image/8.2.2.1.1.1.gif)

点进`mysql-secret(MYSQL 密钥)`里，可以看到此时键为`MYSQL_ROOT_PASSWORD`的值已经被加密了

![image-20221117225604081](https://gitlab.com/apzs/image/-/raw/master/image/8.2.2.1.1.2.png)

可以配置的环境变量在 [docker hub](https://hub.docker.com/_/mysql) 上有显示，上面会告诉我们可以配置哪些环境变量

![image-20221201201518931](https://gitlab.com/apzs/image/-/raw/master/image/8.2.2.1.1.3.png)

##### 2、创建 WordPress 密钥

在项目里点击`gulimall(谷粒商城)`项目，在`配置中心`  -> `密钥`里点击`创建`，在基本信息里名称输入`wordpress-secret`，然后点击`下一步`；在密钥设置里，点击`添加数据`，然后`键`输入`WORDPRESS_DB_PASSWORD`，值里输入`123456`，点击对钩，然后再点击`创建`。创建好后，点击`wordpress-secret`右边的三个点，选择`编辑配置文件`，然后即可看到这次操作生成的`yaml`配置文件

![GIF 2022-12-1 20-32-24](https://gitlab.com/apzs/image/-/raw/master/image/8.2.2.1.2.gif)

#### 2、创建存储卷

在`gulimall`项目里，点击存储卷里的`创建`按钮，在基本信息的名称里输入`mysql-pvc`，然后点击下一步，在存储卷设置里保持默认设置，然后点击`下一步`，在高级设置里保持默认设置，然后点击`创建`，即可创建一个存储卷。

![GIF 2022-12-1 20-39-24](https://gitlab.com/apzs/image/-/raw/master/image/8.2.2.2.gif)

#### 3、创建应用

##### 添加 MySQL 组件

在 `video/QQ录屏20221201212746.mp4`文件里查看


##### 添加 WordPress 组件

在`video/QQ录屏20221201213610.mp4`文件里查看



### 8.2.3、更新`Windows`后报错

电脑升级windows11后，访问  http://192.168.56.100:30880/  就一直打不开，然后执行`kubectl get pods --all-namespaces`发现报了个不能连接的错，我以为是kubernetes的问题，然后搜了一下找到了个解决方式

> 具体输出如下：
>
> 场景：高可用集群 master 节点，当我执行：kubectl get nodes，出现如下错误：
>
>     kubectl Unable to connect to the server: dial tcp 10.12.2.199:6443: i/o timeout
> 原因是 Master 节点初始化集群的时候，没有执行：
>
> ```
> $ mkdir -p $HOME/.kube
> $ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
> $ sudo chown $(id -u):$(id -g) $HOME/.kube/config
> ```
>
> 执行完毕即可。
>
> https://blog.csdn.net/qq_19734597/article/details/106574376

但我使用后亲测不行

```bash
[root@k8s-node1 ~]# kubectl get pods --all-namespaces
Unable to connect to the server: dial tcp 10.0.2.5:6443: connect: network is unreachable
[root@k8s-node1 ~]# mkdir -p $HOME/.kube
[root@k8s-node1 ~]# cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
cp: overwrite ‘/root/.kube/config’? yes
[root@k8s-node1 ~]# chown $(id -u):$(id -g) $HOME/.kube/config
[root@k8s-node1 ~]# kubectl get pods --all-namespaces
Unable to connect to the server: dial tcp 10.0.2.5:6443: connect: network is unreachable
```

![image-20221230203737247](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.1.png)

使用`ip addr`查看ip信息，可以发现`eth0`没有对应的ip

![image-20221230210543936](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.2.png)

遇到这种问题首先不要想着修改网卡设置；遇到虚拟机网络突然不能用的这种情况首先应该想到的是`VirtualBox`虚拟机或`WMware`虚拟机的虚拟网卡配置问题
选中` VirtualBox`里的`k8s-node1`，然后点击`设置`

![image-20221230211729509](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.3.png)

在`k8s-node1 - 设置`里点击`网路`，可以看到在网卡1里提示了`发现无效配置`（`网络:网卡1页:未指定NAT网络名称。`）

![image-20221230211701074](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.4.png)

关闭三个虚拟机，点击`管理(F) -> 全局设定`在网络里点击添加以添加一个虚拟网卡；然后将各节点`网络`里的第一个网卡的高级里刷新一下`Mac地址`，然后点击`OK`即可。

![GIF 2022-12-30 21-28-00](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.5.gif)

再次执行`kubectl get pods --all-namespaces`命令

[点击查看完整过程](code/8.2.3.md)

![image-20221230214110606](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.6.png)

访问  http://192.168.56.100:30880/login  页面，可以看到已经访问成功了

![image-20221230214303055](https://gitlab.com/apzs/image/-/raw/master/image/8.2.3.7.png)
