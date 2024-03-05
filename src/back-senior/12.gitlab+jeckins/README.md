> 目标：开发提交代码到git服务器后，Jenkins自动构建，并将其部署到测试服务器上

![image-20230601104404720](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601104404720.png)

# 1、gitlab简单使用

## 1、安装gitlab

### 1、手动安装（不推荐）

#### 1. 安装和配置必须的依赖项

在 CentOS 7上，下面的命令也会在系统防火墙中打开 HTTP、HTTPS 和 SSH 访问。这是一个可选步骤，如果您打算仅从本地网络访问极狐GitLab，则可以跳过它。

```bash
sudo yum install -y curl policycoreutils-python openssh-server perl
sudo systemctl enable sshd
sudo systemctl start sshd
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld
```

（可选）下一步，安装 Postfix 以发送电子邮件通知。如果您想使用其他解决方案发送电子邮件，请跳过此步骤并在安装极狐GitLab 后[配置外部 SMTP 服务器](https://docs.gitlab.cn/omnibus/settings/smtp.html)。

```bash
sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
```

在安装 Postfix 的过程中可能会出现一个配置界面，在该界面中选择“Internet Site”并按下回车。把“mail name”设置为您服务器的外部 DNS 域名并按下回车。如果还有其它配置界面出现，继续按下回车以接受默认配置。

#### 2. 下载/安装极狐GitLab

配置极狐GitLab 软件源镜像。

```bash
curl -fsSL https://packages.gitlab.cn/repository/raw/scripts/setup.sh | /bin/bash
```

接下来，安装极狐GitLab。确保您已正确[设置您的 DNS](https://docs.gitlab.cn/omnibus/settings/dns.html)，并更改 https://gitlab.example.com 为您要访问极狐GitLab 实例的 URL。安装包将在该 URL 上自动配置和启动极狐GitLab。

> 如果没有域名或者不想修改Hosts文件，可以使用能访问这台配置有GitLab的主机的ip

对于 `https` 站点，极狐GitLab 将使用 Let's Encrypt 自动请求 SSL 证书，这需要有效的主机名和入站 HTTP 访问。您也可以使用自己的证书或仅使用 `http://`（不带`s`）。

如果您想为初始管理员用户(`root`)指定自定义密码，请查看[文档](https://docs.gitlab.cn/omnibus/installation/index.html#设置初始密码)。如果未指定密码，将自动生成随机密码。

执行如下命令开始安装：

```bash
sudo EXTERNAL_URL="https://gitlab.example.com" yum install -y gitlab-jh
# 可以使用 ip addr 命令查看ip，然后使用ip访问这台主机
# sudo EXTERNAL_URL="192.168.56.11" yum install -y gitlab-jh
# 也可以修改端口
# sudo EXTERNAL_URL="192.168.56.11:8081" yum install -y gitlab-jh
```

> 如果发现url写错了可以执行以下命令
>
> ```bash
> vi /etc/gitlab/gitlab.rb
> ```
>
> 修改该文件的`external_url`
>
> ![image-20230514163310393](https://gitlab.com/apzs/image/-/raw/master/image/image-20230514163310393.png)
>
> 然后再执行`gitlab-ctl reconfigure`重新加载配置
>
> ```bash
> gitlab-ctl reconfigure
> ```
>
> 然后再重启gitlab
>
> ```bash
> gitlab-ctl restart
> ```

#### 3. 访问极狐GitLab 实例并登录

```
Notes:
Default admin account has been configured with following details:
Username: root
Password: You didn't opt-in to print initial root password to STDOUT.
Password stored to /etc/gitlab/initial_root_password. This file will be cleaned up in first reconfigure run after 24 hours.
```

除非您在安装过程中指定了自定义密码，否则将随机生成一个密码并存储在 `/etc/gitlab/initial_root_password` 文件中(出于安全原因，24 小时后，此文件会被第一次 `gitlab-ctl reconfigure` 自动删除，因此若使用随机密码登录，建议安装成功初始登录成功之后，立即修改初始密码）。使用此密码和用户名 `root` 登录。

执行`cat /etc/gitlab/initial_root_password`就可以看到密码为`eoEPtKv4Sh1I1uYN1Mslp2kVgFU1tbqutXZYJj/2KOI=`

```bash
[root@localhost ~]# cat /etc/gitlab/initial_root_password
# WARNING: This value is valid only in the following conditions
#          1. If provided manually (either via `GITLAB_ROOT_PASSWORD` environment variable or via `gitlab_rails['initial_root_password']` setting in `gitlab.rb`, it was provided before database was seeded for the first time (usually, the first reconfigure run).
#          2. Password hasn't been changed manually, either via UI or via command line.
#
#          If the password shown here doesn't work, you must reset the admin password following https://docs.gitlab.com/ee/security/reset_user_password.html#reset-your-root-password.

Password: eoEPtKv4Sh1I1uYN1Mslp2kVgFU1tbqutXZYJj/2KOI=

# NOTE: This file will be automatically deleted in the first reconfigure run after 24 hours.
```

如果出现了`502`，不用着急，等一下即可；如果一直这样你需要看以下是不是内存不足或`8080`、`80`等端口被占用

![image-20230514160606167](https://gitlab.com/apzs/image/-/raw/master/image/image-20230514160606167.png)

#### 4、常用命令

```bash
gitlab-ctl start     #启动所有gitlab组件;
gitlab-ctl stop      #停止所有git1ab组件;
gitlab-ctl restart   #重启所有gitlab组件;
gitlab-ctl status    #查看服务状态;
gitlab-ctl reconfigure       #更新配置
vi /etc/gitlab/gitlab.rb   #修改默认的配置文件: 
gitlab-ctl tail      #查看日志;
```

### 2、docker安装（推荐）

可以执行如下命令，指定gatlab家目录的位置

```bash
export GITLAB_HOME=/mydata/gitlab
```

使用root用户执行以下命令（需要安装docker）

> 注意修改`hostname`为自己的主机ip，其中需要`443`端口的`HTTPS`、`80`端口的`HTTP`，`22`端口的`ssh`
>
> 我们还要使用ssh来上传代码和拉取代码，但是虚拟机的ssh的22端口已经被我们用来连接虚拟机了，因此我们将gitlab的ssh端口修改为2222，并映射到虚拟主机的2222端口
>
> 本次演示使用`81`端口来访问web服务，2222端口访问ssh
>
> 其实也可以修改为`--publish 1443:443 --publish 81:80 --publish 2222:22`，只修改访问虚拟机的端口，不修改容器内部实际应用使用的端口

```bash
sudo docker run --detach \
  --hostname 192.168.56.10:81 \
  --publish 1443:443 --publish 81:81 --publish 2222:2222 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab:Z \
  --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
  --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
  --shm-size 256m \
  registry.gitlab.cn/omnibus/gitlab-jh:latest
```

使用如下命令进入容器内部

```
docker exec -it gitlab /bin/bash
```

进入容器后，执行如下命令查看管理员密码（需要及时修改管理员密码，密码类似于`+9meeRS9aMclaHyqbHsHFcumRNpMflJaagS2r+ZobCs=`）

```
cat /etc/gitlab/initial_root_password
```

使用如下命令查看剩余内存

```
free -m
```

------

我们可以执行`vi /etc/gitlab/gitlab.rb`进入`/etc/gitlab/gitlab.rb`文件来修改配置

```
vi /etc/gitlab/gitlab.rb
```

> 在命令模式下，输入`/external_url`即可进行查找，输入`n`查找下一个，输入`N`查找上一个



然后将`external_url`的注释打开，修改为如下配置；或者也可以想我一样，重新另起一行

> 这里修改对应的是`--publish 81:81`里的第一个`81`，也就是外部访问本虚拟机的81端口

```
external_url 'http://192.168.56.10:81'
```

![image-20230521110406056](https://gitlab.com/apzs/image/-/raw/master/image/image-20230521110406056.png)

然后继续修改`nginx['listen_port']`

> 这里的修改对应的是`--publish 81:81`里的第二个`81`，也就是本容器运行nginx实际使用的的端口

```
nginx['listen_port'] = 81
```

![image-20230521110619272](https://gitlab.com/apzs/image/-/raw/master/image/image-20230521110619272.png)

然后继续修改`gitlab_rails['gitlab_shell_ssh_port']`

> 这里的修改对应的是`--publish 2222:2222`里的第一个`2222`，也就是外部访问本虚拟机的2222端口

```
gitlab_rails['gitlab_shell_ssh_port'] = 2222
```

![image-20230521110744671](https://gitlab.com/apzs/image/-/raw/master/image/image-20230521110744671.png)

然后进入`/assets/sshd_config`文件里，修改`Port`

> 这里的修改对应的是`--publish 2222:2222`里的第二个`2222`，也就是本容器运行sshd实际使用的端口

```
vi /assets/sshd_config
```

![image-20230521110839263](https://gitlab.com/apzs/image/-/raw/master/image/image-20230521110839263.png)

然后执行如下命令，重新加载配置并重启gitlab

```bash
gitlab-ctl reconfigure
gitlab-ctl restart
```

访问`Monitoring`项目，点击克隆即可查看`ssh`和`http`的端口

![image-20230528121708916](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528121708916.png)

如果发现访问不了，可以执行`gitlab-ctl tail`命令查看日志，看运行的端口对不对

```
gitlab-ctl tail
```

> 请添加`:Z`参数，否则执行`docker logs gitlab`查看日志，将显示如下错误
>
> ```bash
> Thank you for using GitLab Docker Image!
> Current version: gitlab-jh=15.11.3-jh.0
> Configure GitLab for your system by editing /etc/gitlab/gitlab.rb file
> And restart this container to reload settings.
> To do it use docker exec:
> docker exec -it gitlab editor /etc/gitlab/gitlab.rb
> docker restart gitlab
> For a comprehensive list of configuration options please see the Omnibus GitLab readme
> https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/README.md
> If this container fails to start due to permission problems try to fix it by executing:
> docker exec -it gitlab update-permissions
> docker restart gitlab
> Cleaning stale PIDs & sockets
> cat: /var/opt/gitlab/gitlab-rails/VERSION: No such file or directory
> Installing gitlab.rb config...
> cp: cannot create regular file '/etc/gitlab/gitlab.rb': Permission denied
> ```
>

------

**极狐GitLab Docker 镜像 [所有级别私有化部署](https://about.gitlab.cn/pricing/)**

极狐GitLab Docker 镜像是极狐GitLab 的整体镜像，在单个容器中运行所有必要的服务。

Docker 镜像不包括邮件传输代理 (MTA)。推荐的解决方案是添加在单独容器中运行的 MTA（例如 Postfix 或 Sendmail）。作为另一种选择，您可以直接在极狐GitLab 容器中安装 MTA，但这会增加维护开销，因为您可能需要在每次升级或重新启动后重新安装 MTA。

您不应在 Kubernetes 中部署极狐GitLab Docker 镜像，因为它会造成单点故障。

Docker for Windows 不受官方支持。存在卷权限的已知问题，以及潜在的其他未知问题。

**先决条件**

Docker 是必需的。查看[官方安装文档](https://docs.docker.com/get-docker/)。

**设置卷位置**

在设置其他所有内容之前，请配置一个新的环境变量 `$GITLAB_HOME`，指向配置、日志和数据文件所在的目录。 确保该目录存在并且已授予适当的权限。

对于 Linux 用户，将路径设置为 `/srv/gitlab`：

```
export GITLAB_HOME=/srv/gitlab
```

对于 macOS 用户，使用用户的 `$HOME/gitlab` 目录：

```
export GITLAB_HOME=$HOME/gitlab
```

极狐GitLab 容器使用主机装载的卷来存储持久数据：

| 本地位置              | 容器位置          | 使用                          |
| :-------------------- | :---------------- | :---------------------------- |
| `$GITLAB_HOME/data`   | `/var/opt/gitlab` | 用于存储应用程序数据。        |
| `$GITLAB_HOME/logs`   | `/var/log/gitlab` | 用于存储日志。                |
| `$GITLAB_HOME/config` | `/etc/gitlab`     | 用于存储极狐GitLab 配置文件。 |

**安装**

极狐GitLab Docker 镜像可以通过多种方式运行：

- [使用 Docker Engine](https://docs.gitlab.cn/jh/install/docker.html#使用-docker-engine-安装极狐gitlab)
- [使用 Docker Compose](https://docs.gitlab.cn/jh/install/docker.html#使用-docker-compose-安装极狐gitlab)
- [使用 Docker swarm 模式](https://docs.gitlab.cn/jh/install/docker.html#使用-docker-swarm-模式安装极狐gitlab)

**使用 Docker Engine 安装极狐GitLab**

您可以微调这些目录以满足您的要求。 一旦设置了 `GITLAB_HOME` 变量，您就可以运行镜像：

```
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  --shm-size 256m \
  registry.gitlab.cn/omnibus/gitlab-jh:latest
```

这将下载并启动极狐GitLab 容器，并发布访问 SSH、HTTP 和 HTTPS 所需的端口。所有极狐GitLab 数据将存储在 `$GITLAB_HOME` 的子目录中。系统重启后，容器将自动 `restart`。

如果您使用的是 SELinux，请改为运行以下命令：

```
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab:Z \
  --volume $GITLAB_HOME/logs:/var/log/gitlab:Z \
  --volume $GITLAB_HOME/data:/var/opt/gitlab:Z \
  --shm-size 256m \
  registry.gitlab.cn/omnibus/gitlab-jh:latest
```

这将确保 Docker 进程有足够的权限在挂载的卷中创建配置文件。

如果您使用 Kerberos 集成 ，您还必须发布您的 Kerberos 端口（例如，`--publish 8443:8443`）。否则会阻止使用 Kerberos 进行 Git 操作。

初始化过程可能需要很长时间。 您可以通过以下方式跟踪此过程：

```
sudo docker logs -f gitlab
```

启动容器后，您可以访问 `gitlab.example.com`（如果您在 macOS 上使用 boot2docker，则可以访问 `http://192.168.59.103`）。Docker 容器开始响应查询可能需要一段时间。

访问极狐GitLab URL，并使用用户名 root 和来自以下命令的密码登录：

```
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

> 密码文件将在 24 小时后的第一次重新配置运行中自动删除。

## 2、修改语言

登录成功后，可以在`Preferences`的`Localization`里修改语言

![image-20230514162004930](https://gitlab.com/apzs/image/-/raw/master/image/image-20230514162004930.png)

## 3、修改密码

可以点击`三个横杠`  -> `管理员`  `用户`  -> `Administrator`  -> `编辑`里修改密码

```
apzs20001118
```

![GIF 2023-5-14 16-26-09](https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-5-14%2016-26-09.gif)

## 4、修改头像

头像无法显示是因为被墙了，执行如下命令修改`/var/opt/gitlab/gitlab-rails/etc/gitlab.yml`文件

```
vi /etc/gitlab/gitlab.rb
```

修改`plain_url`和`ssl_url`为如下内容

```
gitlab_rails['gravatar_ssl_url'] = 'https://sdn.geekzu.org/avatar/%{hash}?s=%{size}&d=identicon'
gitlab_rails['gravatar_ssl_url'] = 'https://sdn.geekzu.org/avatar/%{hash}?s=%{size}&d=identicon'
```

![image-20230514231621243](https://gitlab.com/apzs/image/-/raw/master/image/image-20230514231621243.png)



![image-20230514164748799](https://gitlab.com/apzs/image/-/raw/master/image/image-20230514164748799.png)

然后再执行`gitlab-ctl reconfigure`重新加载配置（执行时间稍微长一点）

```
gitlab-ctl reconfigure
```

再执行`gitlab-ctl restart`重启服务

```
gitlab-ctl restart
```

## 5、提交代码

### 1、生成密钥

可以使用如下命令生成一个ssh密钥，这个密钥在`C:\Users\[用户名]\.ssh`下，`-C`参数为你的邮箱

```bash
ssh-keygen -t rsa -C 'apzs@foxmail.com'
```

![image-20230520212202774](https://gitlab.com/apzs/image/-/raw/master/image/image-20230520212202774.png)

> 如果你以前已经生成过ssh密钥，想给gitlab单独申请一个密钥可以执行如下命令，再增加一个`gitlab_id_rsa`密钥
>
> ```bash
> ssh-keygen -t rsa -C 'apzs@foxmail.com' -f ~/.ssh/gitlab_id_rsa
> ```
>
> ![image-20230520212558349](https://gitlab.com/apzs/image/-/raw/master/image/image-20230520212558349.png)
>
> 如果你有多个密钥，需要增加一个`config`文件
>
> ![image-20230530204010553](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530204010553.png)
>
> ```
> # github
> Host github.com
> HostName github.com
> User git
> PreferredAuthentications publickey
> IdentityFile ~/.ssh/id_rsa
> 
> # gitlab
> Host gitlab
> HostName 192.168.56.10
> Port 2222
> User git
> PreferredAuthentications publickey
> IdentityFile ~/.ssh/gitlab_id_rsa
> ```

然后可以使用如下命令复制`id_rsa.pub`文件的内容（如果生成的是`gitlab_id_rsa`，别忘了修改文件为`gitlab_id_rsa.pub`）

```bash
clip < ~/.ssh/id_rsa.pub    #windows系统
pbcopy < ~/.ssh/id_rsa.pub  #mac os系统
```

然后在gitlab里添加密钥

![image-20230520214929834](https://gitlab.com/apzs/image/-/raw/master/image/image-20230520214929834.png)

### 2、测试连接

可以使用如下命令测试连接

使用别名(`~/.ssh/config`里配置的`Host`)会查找`~/.ssh/config`文件，然后按照配置使用指定的端口和密钥进行连接

```bash
ssh -T git@gitlab
```

如果直接使用ip进行访问，则不会按照`~/.ssh/config`文件里的配置进行连接，需要在命令中添加需要的所有参数

```bash
ssh -T -i ~/.ssh/gitlab_id_rsa -p 2222 git@192.168.56.10
```

第一次连接时，需要手动输入`yes`，后续则不用。出现`Welcome to GitLab`就证明成功了

```bash
$ ssh -T git@gitlab
The authenticity of host '[192.168.56.10]:2222 ([192.168.56.10]:2222)' can't be established.
ED25519 key fingerprint is SHA256:GzNOzBP26KNqIJeqfRySNTdOo3OwuM4WZ+T7j13TQeY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[192.168.56.10]:2222' (ED25519) to the list of known hosts.
Welcome to GitLab, @root!

无名氏@DESKTOP-UF6T5IH MINGW64 ~/.ssh
$ ssh -T -i ~/.ssh/gitlab_id_rsa -p 2222 git@192.168.56.10
Welcome to GitLab, @root!
```

### 3、创建项目

然后新建一个空白项目

![image-20230517212929458](https://gitlab.com/apzs/image/-/raw/master/image/image-20230517212929458.png)

然后复制ssh链接

![image-20230530213930378](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530213930378.png)

然后使用IDEA新建一个SpringBoot项目

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230517213325617.png" alt="image-20230517213325617" style="zoom:50%;" />

先写个简单的`hello`，注意添加`@RestController`注解

![image-20230601103138456](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601103138456.png)

然后测试一下能不能访问

![image-20230601103108088](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601103108088.png)

然后打包一下，看能不能构建成功，构建成功了再提交代码

![image-20230531223423975](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531223423975.png)

然后点击`VCS`里的`Create Git Repository...`

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230517213700275.png" alt="image-20230517213700275" style="zoom:50%;" />

然后选择自己的项目

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230517213805764.png" alt="image-20230517213805764" style="zoom:50%;" />

然后点击`Git`里的`Manage Remotes...`

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230517213928459.png" alt="image-20230517213928459" style="zoom:50%;" />



直接使用ip不行，前面已经说过了。使用别名(`~/.ssh/config`里配置的`Host`)会查找`~/.ssh/config`文件，然后按照配置使用指定的端口和密钥进行连接，而直接使用ip不行

![image-20230530213730505](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530213730505.png)

使用`~/.ssh/config`里配置的`gitlab`对应的`Host`就可以了

![image-20230530213840900](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530213840900.png)

然后将项目代码添加到版本控制

![image-20230530214959315](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530214959315.png)

然后提交代码

![image-20230530215048473](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530215048473.png)



![image-20230530220523013](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530220523013.png)

然后提交代码

![image-20230530220022407](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530220022407.png)

已经提交成功了

![image-20230530220459587](https://gitlab.com/apzs/image/-/raw/master/image/image-20230530220459587.png)

# 2、安装其他软件

## 1、安装jenkins

> 官方中文文档：https://www.jenkins.io/zh/doc/

执行`yum search java | grep jdk`命令查看可以下载的jdk

```
yum search java | grep jdk
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230528101922264.png" alt="image-20230528101922264" style="zoom:50%;" />

执行`yum install -y java-1.8.0-openjdk`下载jdk1.8（这个其实安装的是jdk）

```
yum install -y java-1.8.0-openjdk
```

我们执行完上面的命令后可以再使用如下命令安装jdk

```bash
yum install -y java-devel
```

在[jenkins官网](http://www.jenkins.io/download/)里，最新的长久支持版最少需要jdk11，因此我们可以下载[2.346.2](https://mirrors.jenkins.io/war-stable/2.346.2/)这个版本，这是最后一个支持jdk1.8的版本

![image-20230528104059249](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528104059249.png)

可以使用如下命令，使用本地的当前用户将存在D盘的`jenkins.war`文件，使用远程的root用户传到`192.168.56.10`这台主机的`/root`目录，期间会提示输入远程的root用户的密码

```
scp D:\jenkins.war root@121.40.49.203:/root
```

或者也可以使用一些工具上传

上传好后执行`java -jar jenkins.war`命令即可，jenkins会运行在8080端口；如果该端口被占用可以执行如下命令，让jenkins运行在8888端口

```
java -jar jenkins.war --httpPort=8888
```

> 也可以使用nohup命令将Jenkins作为后台进程启动，并将输出重定向到nohup.out文件中。这样可以在后台运行Jenkins的同时继续使用终端。
>
> ```bash
> nohup java -jar jenkins.war --httpPort=8888 &
> ```
>
> 使用以下命令可以找到Jenkins进程的PID：
>
> ```bash
> ps -ef | grep jenkins
> ```
>
> 使用kill命令终止jenkins进程：
>
> ```bash
> kill <PID>
> ```
>
> 请将上述命令中的`<PID>`替换为上一步中找到的Jenkins进程的PID。

运行成功后，会在控制台显示admin用户的密码，信息可以在当前用户目录的`.jenkins/secrets/initialAdminPassword`文件里查看

![image-20230528105215469](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528105215469.png)

然后在浏览器上访问`http://121.40.49.203:8888`，输入密码即可

![image-20230528110007762](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528110007762.png)

然后选择安装推荐的插件

![image-20230528110219765](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528110219765.png)

然后一直等待就好了

![image-20230528110314930](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528110314930.png)

下载插件完成后，输入用户名密码等信息，密码直接输入`123456`就可以，点击保存并完成

![image-20230528112121710](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528112121710.png)

然后检查一下url，点击保存并完成

![image-20230528112108286](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528112108286.png)

然后点击`开始使用jenkins`

![image-20230528112257017](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528112257017.png)

然后就来到了后台界面

![image-20230528112402776](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528112402776.png)

## 2、安装maven

由于jenkins需要使用maven，因此我们还有安装maven，在[官网](https://maven.apache.org/download.cgi)下载最新的`tar.gz`格式的压缩包，然后放到运行jenkins的机器上

![image-20230528110549702](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528110549702.png)

然后执行如下命令解压压缩包

```bash
tar -zxvf apache-maven-3.9.2-bin.tar.gz
```

![image-20230528112815558](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528112815558.png)

然后执行mv命令，将`apache-maven-3.9.2`文件夹里的内容移到`/usr/local/maven`目录下

```
mkdir /usr/local/maven
mv apache-maven-3.9.2/* /usr/local/maven
```

进入到`/usr/local/maven/bin`目录下

```
cd /usr/local/maven/bin
```

执行`./mvn -v`命令即可看到使用的jdk的版本号

```
./mvn -v
```

![image-20230528113906482](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528113906482.png)



## 3、下载插件

由于默认不能构建maven项目，因此我们需要下载一个maven插件。

点击`Manage Jenkins`里的`Manage Plugins`即可管理插件

![image-20230528114347288](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528114347288.png)

然后再`可选插件`里输入`maven`，然后勾选` Maven Integration`这个插件，选择`Install without restart`即可安装插件

![image-20230528114630507](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528114630507.png)

然后划到最下面，即可查看刚刚安装的插件的状态

![image-20230528114806411](https://gitlab.com/apzs/image/-/raw/master/image/image-20230528114806411.png)

# 3、新建maven项目任务

## 1、新建任务

点击`新建任务`

![image-20230531202040049](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531202040049.png)

然后输入项目名，选择`构建一个maven项目`，然后点击确定

![image-20230531202125253](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531202125253.png)

## 2、配置git

然后需要添加git仓库，由于需要使用git,因此我们需要在安装jenkins的机器上安装git

![image-20230531204806614](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531204806614.png)

使用`yum install -y git`命令安装git

```bash
yum install -y git
```

然后使用如下命令生成密钥文件

```
ssh-keygen -t rsa -C 'apzs@foxmail.com'
```

然后使用如下命令查看公钥文件，由于没有GUI，所以没有复制到剪贴板的命令，因此需要我们手动复制

```
cat ~/.ssh/id_rsa.pub
```

然后在gitlab上粘贴即可（由于自己运行gitlab比较占内存，就没用自己的了）

![image-20230531210556386](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531210556386.png)

然后可以使用`ssh -T git@gitlab.com`测试能否连接。第一次连接时，需要手动输入`yes`，后续则不用。出现`Welcome to GitLab`就证明成功了

```
ssh -T git@gitlab.com
```

详细内容

```
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# ssh -T git@gitlab.com
The authenticity of host 'gitlab.com (172.65.251.78)' can't be established.
ECDSA key fingerprint is SHA256:HbW3g8zUjNSksFbqTiUWPWg2Bq1x8xdGUrliXFzSnUw.
ECDSA key fingerprint is MD5:f1:d0:fb:46:73:7a:70:92:5a:ab:5d:ef:43:e2:1c:35.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'gitlab.com,172.65.251.78' (ECDSA) to the list of known hosts.
Welcome to GitLab, @apzs!
```

![image-20230531211824799](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531211824799.png)

填上地址后，如果出现如下错误，刷新一下页面就行了

![image-20230531211357336](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531211357336.png)

```
**An internal error occurred during form field validation (HTTP 403). Please reload the page and if the problem persists, ask the administrator for help.**
```

刷新后，再次填入就不报错了

![image-20230531211559743](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531211559743.png)

由于我的主分支是master分支，因此不用修改`Branches to build`配置

> 如果你的是`main`分支需要修改`Branches to build`为`*/main`

![image-20230531210857178](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531210857178.png)

![image-20230531203627289](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531203627289.png)

## 3、配置maven

接着我们需要修改maven

![image-20230531211918377](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531211918377.png)

往下滑到底，点击`新增Maven`，取消勾选`自动安装`，输入自己的maven安装路径，然后保存即可

![image-20230531212924901](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531212924901.png)

配置完成刷新`构建一个maven项目`页面，将前面配置的git再重新添加一下

由于我这个`pom.xm`就是再根目录，因此不需要修改`Root POM`

> 如果你的`pom.xml`文件位置为`demo-1/pom.xml`，则需要修改`Root POM`的值为`demo-1/pom.xml`

![image-20230531213329200](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531213329200.png)

![image-20230531213151982](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531213151982.png)

然后点击保存即可

![image-20230531214048397](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531214048397.png)

## 4、构建任务

我们返回`Dashboard`，点击这个名称右边的运行按钮，就可以在左下角的`构建执行状态`里看到构建任务，点击这个构建任务

![image-20230531214639048](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531214639048.png)

然后再点击左下角的这个任务的时间这个地方

![image-20230531214817843](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531214817843.png)

然后带你就`控制台输出`即可看到输出信息

![image-20230531215011269](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531215011269.png)

如果安装的是jre，会报如下的错误，这是因为我们安装的其实是jre，而不是jdk

可以使用如下命令安装jdk（注意不要删除前面安装的jre）

```bash
yum install -y java-devel
```

完整错误（如果不是这个错误，证明在下载jar包的时候就报错了）

```bash
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-utils/3.5.0/plexus-utils-3.5.0.jar (267 kB at 29 kB/s)
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/com/thoughtworks/qdox/qdox/2.0.3/qdox-2.0.3.jar (334 kB at 29 kB/s)
[INFO] Changes detected - recompiling the module! :dependency
[INFO] Compiling 1 source file with javac [debug release 17] to target/classes
[INFO] -------------------------------------------------------------
[ERROR] COMPILATION ERROR : 
[INFO] -------------------------------------------------------------
[ERROR] No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?
[INFO] 1 error
[INFO] -------------------------------------------------------------
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  05:12 min
[INFO] Finished at: 2023-05-31T21:51:38+08:00
[INFO] ------------------------------------------------------------------------
Waiting for Jenkins to finish collecting data
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.11.0:compile (default-compile) on project demo: Compilation failure
[ERROR] No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?
[ERROR] -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
[JENKINS] Archiving /root/.jenkins/workspace/first/pom.xml to com.example/demo/0.0.1-SNAPSHOT/demo-0.0.1-SNAPSHOT.pom
channel stopped
Finished: FAILURE
```

![image-20230531215344860](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531215344860.png)

最后面告诉我们pom文件的位置为`/root/.jenkins/workspace/first/pom.xml`

我们可以自己执行maven命令进行构建

```bash
cd /root/.jenkins/workspace/first

/usr/local/maven/bin/mvn clean package -Dmaven.test.skip=true
```

![image-20230531225340345](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531225340345.png)

![image-20230531224859642](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531224859642.png)

能够构建成功了，再使用jenkins进行构建

![image-20230531224549870](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531224549870.png)

我们可以看到jar包位置为`/root/.jenkins/workspace/first/target/demo-0.0.1-SNAPSHOT.jar`，我们可以进到这个目录执行这个jar包，由于jenkins默认用的也是8080端口，因此需要修改一下端口

```bash
cd /root/.jenkins/workspace/first/target/
java -jar demo-0.0.1-SNAPSHOT.jar --server.port=8088
```

![image-20230601103511406](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601103511406.png)

访问一下，发现可以访问成功

![image-20230601104107373](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601104107373.png)

## 4、修改配置

如果需要修改配置，需要返回到`Dashboard`，点击这个名称

![image-20230531214242444](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531214242444.png)

然后点击`配置`即可修改这次的任务配置

![image-20230531214404262](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531214404262.png)



![image-20230531214214192](https://gitlab.com/apzs/image/-/raw/master/image/image-20230531214214192.png)

# 4、运行到测试服务器

## 1、添加测试服务器

我们可以安装一个`Publish Over SSH`插件

![image-20230601104815577](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601104815577.png)

安装完成后在系统管理里，选择系统配置

![image-20230601105342998](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601105342998.png)

然后一直划到最后，找到`SSH Servers`，点击新增

![image-20230601105653028](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601105653028.png)

输入`Name`、主机的ip、和主机的用户名，和家目录后，点击高级

![image-20230601105807088](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601105807088.png)

点击高级后，勾选`Use password authentication, or use a different key`，然后输入密码

![image-20230601110142073](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601110142073.png)

如果需要代理服务器才能访问测试机，则还需要添加代理配置。

配置完后点击`Test Configuration`后出现`Success`就证明成功了，然后点击保存即可

![image-20230601110545258](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601110545258.png)

## 2、修改配置

修改`first`的`Add post-build step`为`Send files or execute commands over SSH`

![image-20230601110709330](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601110709330.png)

我们选择刚刚添加的测试服务器；`Source files`默认的根目录为`workspace`目录，也就是`/root/.jenkins/workspace/first`。可以输入`**/*.jar`也就是上传所有的jar包

> 这个workspace可以在运行任务时看到
>
> <img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230604155651253.png" alt="image-20230604155651253" style="zoom:50%;" />

![image-20230601111251628](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601111251628.png)

> 最好点击**Send files or execute commands over SSH**里的SSH Publishers里的SSH Server里的高级
>
> ![image-20230604164828148](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604164828148.png)
>
> 把`Verbose output in console`勾选上，这样就能够看到连接ssh后执行的命令和执行命令后的结果了
>
> ![image-20230604164831621](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604164831621.png)

`Exec command`可以简单输一个`echo 1`，然后点击保存。

![image-20230601113059417](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601113059417.png)

点击高级，我们可以配置执行的超时时间，默认为2分钟，如果文件比较大或执行命令的时间比较长可以适当修改超时时间

![image-20230601121926746](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601121926746.png)

然后再次执行一下`first`任务，查看控制台，可以看到文件已经传输成功了。

默认会把项目放到测试服务器的`root`目录下（我们前面添加测试服务器的时候指定了`Remote directory`为`root`），例如`jenkins`的`jar`包位置为`/root/.jenkins/workspace/first/target/demo-0.0.1-SNAPSHOT.jar`，那上传到测试服务器的路径就为`/root/target/demo-0.0.1-SNAPSHOT.jar`

![image-20230601112440558](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601112440558.png)

打开测试服务器，执行`java -jar demo-0.0.1-SNAPSHOT.jar`，可以看到已经运行成功了

> 测试服务器注意安装jre
>
> ```
> yum install -y java-1.8.0-openjdk
> ```

```bash
[root@iZuf64go38e6sks55pfasaZ ~]# cd /root/target
[root@iZuf64go38e6sks55pfasaZ target]# ls
demo-0.0.1-SNAPSHOT.jar
[root@iZuf64go38e6sks55pfasaZ target]# java -jar demo-0.0.1-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.1)

2023-06-01 11:27:10.986  INFO 13062 --- [           main] com.example.demo.DemoApplication         : Starting DemoApplication v0.0.1-SNAPSHOT using Java 1.8.0_372 on iZuf64go38e6sks55pfasaZ with PID 13062 (/root/target/demo-0.0.1-SNAPSHOT.jar started by root in /root/target)
```

![image-20230601112729241](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601112729241.png)

访问一下，可以发现能够访问

![image-20230601120943518](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601120943518.png)

> 注意关闭测试服务器运行的java项目

我们可以修改`Remove prefix`为`target`，`Remote directory`为`/mydata`

这样原本的`/root/target/demo-0.0.1-SNAPSHOT.jar`路径就变为了`/root/mydata/demo-0.0.1-SNAPSHOT.jar`

【`添加测试服务器配置的目录` + `这个构建任务配置的目录` + （`/root/.jenkins/workspace/first`后面的目录 - `Remove prefix`配置的目录前缀）】

![image-20230601113721560](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601113721560.png)

然后再次构建这个任务，报了如下错误

```
Waiting for Jenkins to finish collecting data
[JENKINS] Archiving /root/.jenkins/workspace/first/pom.xml to com.example/demo/0.0.1-SNAPSHOT/demo-0.0.1-SNAPSHOT.pom
[JENKINS] Archiving /root/.jenkins/workspace/first/target/demo-0.0.1-SNAPSHOT.jar to com.example/demo/0.0.1-SNAPSHOT/demo-0.0.1-SNAPSHOT.jar
channel stopped
SSH: Connecting from host [iZbp1asdy4uxt0pu8ywpiqZ]
SSH: Connecting with configuration [TestServer] ...
SSH: Disconnecting configuration [TestServer] ...
ERROR: Exception when publishing, exception message [Failed to remove prefix from file named [.mvn/wrapper/maven-wrapper.jar]. Prefix [target/] must be present in all file paths]
Build step 'Send files or execute commands over SSH' changed build result to UNSTABLE
Finished: UNSTABLE
```

![image-20230601114557764](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601114557764.png)

这是因为我们还有一个`.mvn/wrapper/maven-wrapper.jar`的jar包

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230601114648874.png" alt="image-20230601114648874" style="zoom:50%;" />

我们可以修改一下`Source files`为`**/target/*.jar`，只传输`target`目录下的`jar`包

![image-20230601115219033](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601115219033.png)

重新构建就构建成功了

![image-20230601115215050](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601115215050.png)

进入到测试服务器，可以发现能够正常运行

```bash
[root@iZuf64go38e6sks55pfasaZ ~]# cd /root/mydata
[root@iZuf64go38e6sks55pfasaZ mydata]# ls
demo-0.0.1-SNAPSHOT.jar
[root@iZuf64go38e6sks55pfasaZ mydata]# java -jar demo-0.0.1-SNAPSHOT.jar

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.7.1)

2023-06-01 11:51:51.500  INFO 13379 --- [           main] com.example.demo.DemoApplication         : Starting DemoApplication v0.0.1-SNAPSHOT using Java 1.8.0_372 on iZuf64go38e6sks55pfasaZ with PID 13379 (/root/mydata/demo-0.0.1-SNAPSHOT.jar started by root in /root/mydata)
```

![image-20230601115210597](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601115210597.png)

访问一下，可以发现能够访问

![image-20230601120943518](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601120943518.png)

> 注意关闭测试服务器运行的java项目

我们可以需改一下`Exec command`为`nohup java -jar /root/mydata/demo*.jar &`，让传输文件完成后，以后台的方式运行程序

```bash
nohup java -jar /root/mydata/demo*.jar &
```

> 如果测试服务器已经以后台运行的方式运行过这个jar包了，不管以前的jar包是否在运行再次执行都会卡住（卡住用于提示我们日志输出在默认的`nohup.out`文件，需要再次敲一下回车才会进入到命令输入状态），导致连接超时。下面有解决办法
>
> 输入命令后的状态
>
> ![image-20230601123159908](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601123159908.png)
>
> 回车后的状态
>
> ![image-20230601123228703](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601123228703.png)

![image-20230601120059188](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601120059188.png)

重新构建，如果显示的为如下信息就证明成功了

```
[WARNING] For more or less details, use 'maven.plugin.validation' property with one of the values (case insensitive): [BRIEF, DEFAULT, VERBOSE]
[WARNING] 
Waiting for Jenkins to finish collecting data
[JENKINS] Archiving /root/.jenkins/workspace/first/pom.xml to com.example/demo/0.0.1-SNAPSHOT/demo-0.0.1-SNAPSHOT.pom
[JENKINS] Archiving /root/.jenkins/workspace/first/target/demo-0.0.1-SNAPSHOT.jar to com.example/demo/0.0.1-SNAPSHOT/demo-0.0.1-SNAPSHOT.jar
channel stopped
SSH: Connecting from host [iZbp1asdy4uxt0pu8ywpiqZ]
SSH: Connecting with configuration [TestServer] ...
SSH: Disconnecting configuration [TestServer] ...
ERROR: Exception when publishing, exception message [Exec timed out or was interrupted after 120,001 ms]
Build step 'Send files or execute commands over SSH' changed build result to UNSTABLE
Finished: UNSTABLE
```

![image-20230601120738678](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601120738678.png)

查看测试服务器，可以看到`java`已经占用`8080`端口了，并且进程就是`demo-0.0.1-SNAPSHOT.jar`

```bash
[root@iZuf65a756qrqtm37hr12kZ ~]# cd /root/mydata
[root@iZuf65a756qrqtm37hr12kZ mydata]# ls
demo-0.0.1-SNAPSHOT.jar
[root@iZuf65a756qrqtm37hr12kZ mydata]# netstat -tulnp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1098/sshd           
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      1954/java           
udp        0      0 127.0.0.1:323           0.0.0.0:*                           560/chronyd         
udp        0      0 0.0.0.0:68              0.0.0.0:*                           796/dhclient        
udp6       0      0 ::1:323                 :::*                                560/chronyd         
[root@iZuf65a756qrqtm37hr12kZ mydata]# jps
1954 demo-0.0.1-SNAPSHOT.jar
11908 Jps
```

![image-20230601121527358](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601121527358.png)

访问一下测试服务器的`8080`端口，可以直接访问

![image-20230601120911765](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601120911765.png)

## 3、优化配置

### 1、防止后台运行卡住

如果测试服务器已经以后台运行的方式运行过这个jar包了，不管以前的jar包是否在运行再次执行都会卡住（卡住用于提示我们日志输出在默认的`nohup.out`文件，需要再次敲一下回车才会进入到命令输入状态），而执行如下命令指定输出的文件可以让程序不会被卡住

> 数据流重定向
> 数据流重定向就是将某个命令执行后应该要出现在屏幕上的数据传输到其他地方
> 标准输入(stdin) :代码为0,使用<或<<;
> 标准输出(stdout) :代码为1,使用>或>>;（`>`表示覆盖，`>>`表示追加）
> 标准错误输出(stderr) :代码为2，使用2>或2>>

```bash
nohup java -jar /root/mydata/demo*.jar >mylog.log 2>&1 &

# 或者执行以下简化写法
nohup java -jar /root/mydata/demo*.jar &>mylog.log &
```

![image-20230601123905850](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601123905850.png)

修改一下`Post Steps`即可

![image-20230601141046408](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601141046408.png)

### 2、清理以前的文件

我们在执行构建之前还需要清理以前的文件，并把之前运行的程序停掉，因此我们需要使用shell脚本来完成这个功能

执行shell脚本的难点在于如何获取到那个java程序的pid

我们可以执行`ps -ef | grep demo`命令筛选有`demo`，可以看到执行命令后有两个结果，一个是`java`，另一个是`grep`

我们可以再次执行`ps -ef | grep demo | grep 'java -jar'`命令在筛选出有`java -jar`的，这样就只有一个结果了

或者我们可以执行`ps -ef | grep demo | grep -v grep`命令过滤掉带有`grep`的，`grep -v`是执行过滤操作，与`grep`相反

然后再执行`ps -ef | grep demo | grep 'java -jar' | awk '{printf $2}'`，获取第二列的结果就获取到这个pid了

```bash
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# cd /root/mydata
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# ps -ef | grep demo
root     23693     1  1 21:45 ?        00:00:06 java -jar /root/mydata/demo-0.0.1-SNAPSHOT.jar
root     23736 23393  0 21:55 pts/2    00:00:00 grep --color=auto demo
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# ps -ef | grep demo | grep 'java -jar'
root     23693     1  1 21:45 ?        00:00:06 java -jar /root/mydata/demo-0.0.1-SNAPSHOT.jar
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# ps -ef | grep demo | grep -v grep
root     23693     1  1 21:45 ?        00:00:06 java -jar /root/mydata/demo-0.0.1-SNAPSHOT.jar
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# ps -ef | grep demo | grep 'java -jar' | awk '{printf $2}'
23693[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# 
```

![image-20230601215728390](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601215728390.png)

因此我们可以在测试服务器的`/root`目录下新增`x.sh`文件，内容为如下（我们可以在`root`目录下执行`./x.sh demo`命令删除文件并杀死进程）

> 注意将`x.sh`文件的访问权限修改为`777`
>
> ```
> chmod 777 x.sh
> ```

```bash
# 声明使用bash执行命令，按照规范应该添加
#!/bin/bash

# 删除/root/mydata目录里的文件
rm -rf /root/mydata/*

# 获取传进来的第一个参数，将值赋给appname
appname=$1

# 获取pid，注意等号前后没有空格
pid=`ps -ef | grep $1 | grep 'java -jar' | awk '{printf $2}'`
# 输出pid
echo $pid

# 如果pid为空，提示一下，否则执行kill命令。注意"-z $pid"前后都要留空格
if [ -z $pid ];
# 使用-z 做空值判断
    then
        echo "$appname not started"
    else
        kill -9 $pid
        echo "$appname stoping..."
# 闭口（结束if）
fi
# -w表示精确匹配，防止误杀其他含有该数字的进程
check=`ps -ef | grep -w $pid | grep java`

if [ -z $check ];
# 使用-z 做空值判断
    then
        echo "$appname pid:$pid is stop"
    else
        echo "$appname stop failed"
# 闭口（结束if）
fi
```

可以看到执行这个脚本能够杀死指定的进程，并删除`/root/mydata`里的文件

```bash
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# jps
23859 Jps
15196 war
23693 demo-0.0.1-SNAPSHOT.jar
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# ./x.sh demo
23693
demo stoping...
demo pid:23693 is stop
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# jps
23884 Jps
15196 war
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# cd /root/mydata
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# ls
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]
```

![image-20230601221235498](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601221235498.png)

我们在构建之前还需要将前面构建的程序停止，并且删掉前面上传的文件，我们可以在`Pre Steps`里执行命令，做一些构建之前的事情

![image-20230601142010683](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601142010683.png)

修改`Exec command`为`./x.sh demo`，`Source files`报红不用管，至少填写`Source files`和`Exec command`其中一个即可，然后点击保存，然后再次测试可以发现已经能将`/root/mydata`里的文件删掉，并将以前的程序停掉，构建成功后，能够自动运行程序。

![image-20230601150801730](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601150801730.png)

最好点击**Send files or execute commands over SSH**里的SSH Publishers里的SSH Server里的高级

![image-20230604165225912](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604165225912.png)

把`Verbose output in console`勾选上，这样就能够看到连接ssh后执行的命令和执行命令后的结果了

![image-20230604165231604](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604165231604.png)

## 4、提交代码后自动构建

我们这个任务的构建触发器里勾选`触发远程构建`，然后配置身份验证令牌，然后浏览器访问`JENKINS_URL/job/first/build?token=TOKEN_NAME`（也就是   http://121.40.49.203:8888/job/first/build?token=123123  ）

![image-20230601152212021](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601152212021.png)

可以看到当同一个浏览器访问 http://121.40.49.203:8888/job/first/build?token=123123  后，会执行这个任务

![image-20230601152250731](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601152250731.png)

但是当其他浏览器访问时，会提示我们需要进行登录

![image-20230601152458382](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601152458382.png)

为了解决这个问题我们需要安装`Build Authorization Token Root`这个插件

![image-20230601221828874](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601221828874.png)

安装插件完成后，需要将url修改为`buildByToken/build?job=NAME&token=SECRET`

![image-20230601222418685](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601222418685.png)

也就是 [http://121.40.49.203:8888/buildByToken/build?job=first&token=123123](http://121.40.49.203:8888/buildByToken/build?job=first&token=123123)  就可以匿名访问了

![image-20230601222309534](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601222309534.png)

然后在项目的设置里点击`Webhooks`，输入`URL`，勾选`推送事件`和`合并请求事件`，取消勾选`启用SSL验证`，然后点击`添加Webhooks`即可

（工作中最好使用`推送到指定的分支`。`合并请求事件`不推荐，因为`合并请求事件`在`已有的合并请求被更新`、`有新的合并请求被创建`、`合并请求被合并`时都会触发。只不过为了测试方便我们勾选了`推送所有分支事件`和`合并请求事件`）

![image-20230601223045058](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601223045058.png)

如果使用的是本地的url，会报`Url is blocked: Requests to the local network are not allowed`的错误

![image-20230601223652293](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601223652293.png)

我们可以切换到管理员身份，然后在`设置` -> `网路`里，把`允许来自web hooks和服务对本地网络的请求`勾上

![image-20230601223901931](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601223901931.png)

我们可以点击测试里的`推送事件`，可以看到已经能够自动化运行了

![image-20230601224257011](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601224257011.png)

我们修改一下接口返回的内容，然后提交代码后，可以发现能够自动化构建

![GIF 2023-6-1 22-46-55.gif](https://gitlab.com/apzs/image/-/raw/master/image/GIF%202023-6-1%2022-46-55.gif)

访问一下就可以访问成功了，返回的内容也修改了

> 如果自动构建成功，但是请求返回的内容没有改变，有可能是因为`jenkins`里拉取的是`main`分支，而提交的是`master`分支。我们可以修改一下拉取的分支，或者将master分支合并到main分支

![image-20230601224257012](https://gitlab.com/apzs/image/-/raw/master/image/image-20230601224257012.png)

## 5、其他自动化构建方式

- `Build whenever a SNAPSHOT dependency is built`：当依赖的快照版本库被构建时，构建此任务

假设您正在开发一个Java Web应用程序，并且您的应用程序依赖于一个名为"my-lib"的Maven库。在您的项目的pom.xml文件中，您将指定"my-lib"库的版本号为1.0-SNAPSHOT。每当您在"my-lib"库的源代码中进行更改并构建该库时，Jenkins将自动触发您的应用程序构建作业。这对于确保您的应用程序与最新版本的"my-lib"库兼容非常有用。如果您没有使用SNAPSHOT依赖项，那么您将需要手动触发构建作业以确保您的应用程序与最新版本的"my-lib"库兼容。

![image-20230602202221171](https://gitlab.com/apzs/image/-/raw/master/image/image-20230602202221171.png)

- `触发远程构建`：当`gitlab`上有提交、合并等事件时，gitlab调用我们配置的jenkins接口，以完成构建

![image-20230602202806513](https://gitlab.com/apzs/image/-/raw/master/image/image-20230602202806513.png)

- `其他工程构建后触发`：当父项目构建后，构建此子项目（或者其他项目构建完成后，想构建此项目，不一定是父子项目）

![image-20230602203024732](https://gitlab.com/apzs/image/-/raw/master/image/image-20230602203024732.png)

- `定时构建`：使用`corn`表达式，定时进行构建

![image-20230602203310126](https://gitlab.com/apzs/image/-/raw/master/image/image-20230602203310126.png)

- `GitHub hook trigger for GITScm polling`：跟我们前面的gitlab类似，当`github`上有提交、合并等事件时，github调用我们配置的jenkins接口，以完成构建

![image-20230602203341540](https://gitlab.com/apzs/image/-/raw/master/image/image-20230602203341540.png)

- `轮询 SCM`：jenkins主动定时查看`git`服务器的jenkins拉取的分支的代码有没有更改，如果有更改则进行构建

![image-20230602203450435](https://gitlab.com/apzs/image/-/raw/master/image/image-20230602203450435.png)

标准的corn表达式网站： https://crontab.guru/

`corn`有很多种，标准的corn表达式有5个参数，最多的有`7`个参数依次为 `<秒> <分> <小时> <日> <月> <星期> <年>`

| 名称       | 允许值                        | 特殊值             |
| ---------- | ----------------------------- | ------------------ |
| 秒         | 0-59                          | `*`、`,`、`-`、`/` |
| 分         | 0-59                          | `*`、`,`、`-`、`/` |
| 时         | 0-23                          | `*`、`,`、`-`、`/` |
| 每月第几天 | 1-31                          | `*`、`,`、`-`、`/` |
| 月         | 1-12 或 JAN-DEC               | `*`、`,`、`-`、`/` |
| 每周第几天 | 0-6 （7:不标准的周日） 或 SUN-SAT | `*`、`,`、`-`、`/` |
| 年         | 1970-2099                     | `*`、`,`、`-`、`/` |

`*`：表示任意，例如 `* * * * * * *`每秒执行一次，`0 * * * * * *`当秒值为0，其他为任意时执行

`,`：使用逗号分割多组，例如 `0,10 * * * * * *`当秒值为0或10，其他为任意时执行

`-`：表示范围，例如`0 0 0 * * 1-6 *` 或 `0 0 0 * * MON-SAT *` 表示周一到周六各执行一次，每周共六次。

​							`0 0 0 0 1-6,10-12 * *`：1-6月10-12月各执行一次，共9次（表达式的`1-6,10-12`表示1到6月或6到12月共9个月）

`/`：表示每隔一段时间执行一次，例如`*/5 * * * * * *`表示每隔5秒执行一次

> `*/10 * * * * * *` （标准）表示每隔10秒执行一次任务。(一般是从0秒开始)
>
>  `0/10 * * * * * *` （不标准）表示从每分钟的0秒开始，每隔10秒执行一次任务
>
>  `1/10 * * * * * *` （不标准）表示从每分钟的1秒开始，每隔10秒执行一次任务
>
> `0-20/5 * * * * * *` （标准）表示0-20秒之间，从0秒开始每隔5秒执行一次，即当秒为 0  5  10 15  20 时执行一次
>
> `1-20/5 * * * * * *` （标准）表示1-20秒之间，从1秒开始每隔5秒执行一次，即当秒为 1  6  11 16 时执行一次
>
> `0/10` 不是标准的corn表达式，使用 `*/10` 和 `0/10` 可能会产生略微不同的行为，但在大多数情况下，它们的效果是相同的。

`SUN-SAT`为如下意义：

- SUN：代表Sunday（星期日）
- MON：代表Monday（星期一）
- TUE：代表Tuesday（星期二）
- WED：代表Wednesday（星期三）
- THU：代表Thursday（星期四）
- FRI：代表Friday（星期五）
- SAT：代表Saturday（星期六）

`JAN-DEC`为如下意义：

- JAN：代表January（一月）
- FEB：代表February（二月）
- MAR：代表March（三月）
- APR：代表April（四月）
- MAY：代表May（五月）
- JUN：代表June（六月）
- JUL：代表July（七月）
- AUG：代表August（八月）
- SEP：代表September（九月）
- OCT：代表October（十月）
- NOV：代表November（十一月）
- DEC：代表December（十二月）

### 定时任务

jenkins支持的corn有五个参数：`<分> <小时> <日> <月> <星期>`

由于`*/10 * * * *`每隔10分钟执行一次，这样会导致所有任务都在同一刻触发，因此jenkins引入了`H`，即任务名的hash值，我们可以配置为`H(0-5)/10 * * * *`，这样会每隔10分钟执行一次但是每个任务的开始时间不一样，但都在0-5(左闭右闭)之间，这样可以防止同一时刻运行大量任务

> 任务名不变`H(0-5)`去的值就不会变

`1/10 * * * *`：从1分钟开始每隔10分钟执行一次，1  11  21  31  41  51 分钟会执行

`H * * * *`：每月每天每小时的某一分钟执行一次，比如 在分钟为 26 的时候执行一次

`H(0-5)/10 * * * *`：每隔10秒执行一次，但开始分钟数是在0-5之间。比如分钟数在`0  10  20  30  40  50` 、 `1  11  21  31  41  51`、`5  15  25  35  45  55` 等会执行

> 在 Jenkins 的 cron 表达式中，`H(0-5)/10 * * * *` 表示的是一个任务在每小时的 0 到 5 分钟之间，按照 10 分钟的间隔触发一次。这里的 `0-5` 是左闭右闭的区间，即包含 0 和 5 这两个数字。
>
> 这个表达式中的 `H` 是一个哈希化的取值，它将任务的名称或其他唯一标识符映射到 0 到 5 之间的一个值，然后将结果除以 10。这样可以将任务均匀地分布在这个时间区间内，避免了所有任务都在同一时间开始执行。
>
> 因此，`H(0-5)/10 * * * *` 的含义是：在每小时的 0 到 5 分钟之间，基于任务名称的哈希值和 10 分钟间隔，触发一次任务。




Cron表达式结构
1.Cron表达式是一个字符串，字符串以5或6个空格隔开，分为6或7个域，每一个域代表一个含义。
2.Corn从左到右（用空格隔开）：{秒数} {分钟} {小时} {日期} {月份} {星期} {年份(可为空)}。

Cron字段值范围
1.{秒数}：值【0-59】或特殊字符【, - * /】
2.{分钟}：值【0-59】或特殊字符【, - * /】
3.{小时}：值【0-23】或特殊字符【, - * /】
4.{日期}：值【1-31】或特殊字符【,- * ? / L W C】
5.{月份}：值【1-12】或特殊字符【, - * /】
6.{星期}：值【0-6】或【SUN-SAT】（0或7都是SUN）或特殊字符【, - * ? / L C #】
7.{年份}：值【1970~2099】或特殊字符【, - * /】

Cron特殊字符解释
1.【*】：表示匹配该域的任意值。假如在{分钟}域使用*, 即表示每分钟都会触发事件。
2.【?】：只能用在{日期}{星期}两个域。它也匹配域的任意值，但实际不会。因为{日期}和{星期}会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法： 13 13 15 20 * ?, 其中最后一位只能用？，而不能使用*，如果使用*表示不管星期几都会触发，实际上并不是这样。
3.【-】：表示范围。例如在{分钟}域使用5-20，表示从5分到20分钟每分钟触发一次。
4.【/】：表示起始时间开始触发，然后每隔固定时间触发一次。例如在{分钟}域使用5/20,则意味着5分钟触发一次，然后隔20s触发，即25，45等分别触发一次。
5.【,】：表示列出枚举值。例如：在{分钟}域使用5,20，则意味着在5和20分每分钟触发一次。
6.【L】：表示最后，只能出现在{星期}和{日期}域。如果在{星期}域使用5L,意味着在最后的一个星期五触发。如果在{日期}域使用L,意味着在每月的最后一天触发
7.【W】：表示有效工作日(周一到周五),只能出现在{日期}域，系统将在离指定日期的最近的有效工作日触发事件。例如：在{日期}使用5W，如果5日是星期六，则将在最近的工作日：星期五，即4日触发。如果5日是星期天，则在6日(周一)触发；如果5日在星期一到星期五中的一天，则就在5日触发。另外一点，W的最近寻找不会跨过月份。
8.【LW】：这两个字符可以连用，表示在某个月最后一个工作日，即最后一个星期五。
9.【#】：用于确定每个月第几个星期几，只能出现在{日期}域。例如在4#2，表示某月的第二个星期四。


# 5、邮箱通知

目标：使用网易邮箱的SMTP服务，给qq邮箱发送消息

## 1、开启SMTP服务

点击网易邮箱的设置里的`POP3/SMTP/IMAP`，开启`POP3/SMTP服务`

![image-20230603111435058](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603111435058.png)

点击`继续开启`

![image-20230603111454990](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603111454990.png)

可以使用浏览器或者其他软件扫描二维码，然后跳转到短信，然后点击发送即可

![image-20230603111440287](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603111440287.png)

或者可以点击`手动发送短信`，自己手输电话号和短信内容

![image-20230603111501507](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603111501507.png)

发送完成后，点击`我已发送`就会出来一个授权码，复制该授权码

```
BBCAQKAKUXWTQDVD
```

![image-20230603111604842](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603111604842.png)

## 2、配置管理员邮箱

在jenkins的系统管理 -> 系统配置里的`Jenkins Location`里输入自己的系统管理员邮件地址

![image-20230603112038438](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603112038438.png)

## 3、添加自定义邮件服务

然后在**Extended E-mail Notification**里添加smtp服务器地址，这里添加的是自定义的邮箱通知

> 如果没有，是因为没有安装推荐的插件，可以下载`Email Extension`这个插件

![image-20230603112921340](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603112921340.png)

SMTP服务器地址在邮件服务商的`POP3/SMTP/IMAP`的相关位置都会写

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230603112936313.png" alt="image-20230603112936313" style="zoom:50%;" />

然后点击`高级`，选择添加Jenkins凭据提供者

![image-20230603113838106](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603113838106.png)

然后输入用户名和密码

> 注意这里的密码是给的用户凭证，不是邮箱的密码

![image-20230603114041605](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603114041605.png)

然后选择刚刚添加的邮箱

![image-20230603114324109](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603114324109.png)

我们可以在`Default Content`里定制化一些内容

![image-20230603114443493](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603114443493.png)

> 如果使用的是国内的邮件服务器默认禁止使用25端口，因此我们需要修改SMTP端口为465，并勾选`Use SSL`，以使用SSL进行连接
>
> ![image-20230603211133292](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603211133292.png)

可以在`Default Triggers`里配置哪些情况下会被触发

![image-20230603114550984](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603114550984.png)

## 4、添加系统级邮件服务

在邮件通知里俗人SMTP服务器，然后点击`高级`

![image-20230603115106242](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603115106242.png)

然后勾选`使用SMTP认证`

然后输入用户名和密码

> 注意这里的密码是给的用户凭证，不是邮箱的密码

![image-20230603114836170](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603114836170.png)

可以点击`通过发送测试邮件测试配置`，填写qq邮箱地址进行测试

我的机器部署在阿里云上，报了如下错误

```
Caused: com.sun.mail.util.MailConnectException: Couldn't connect to host, port: smtp.163.com, 25; timeout 60000;
  nested exception is:
	java.net.SocketTimeoutException: connect timed out
```

![image-20230603120359248](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603120359248.png)

我以为是安全组的问题，所以添加了如下安全组（其实添加安全组没什么用，安全组是配置别人允许访问我们哪些端口，而`SMTP`是我们使用我们的25端口访问别人的服务）

![image-20230603121510383](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603121510383.png)

然后还是报错，测试一下连接，发现阿里云禁用了25号端口。可以申请`25`号端口解封，不过大部分都会被拒绝

![image-20230603123435539](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603123435539.png)

我们可以使用`ssl`的`465`端口（其实配不配都无所谓，安全组是配置别人允许访问我们哪些端口，而`SMTP`是我们使用我们的465端口（ssl加密）访问别人的服务）

![image-20230603123255090](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603123255090.png)

我们可以勾选`使用SSL协议`，`SMTP端口`修改为`465`，再次测试就显示发送邮件成功了

![image-20230603205204408](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603205204408.png)

登录qq邮箱，已经接收到邮件了

![image-20230603205242043](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603205242043.png)

因此，我们还要修改前面配置的自定义邮件服务的SMTP端口为465，并勾选`Use SSL`

![image-20230603211133292](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603211133292.png)

> 我在阿里云ECS上安装了Jenkins，然后使用163邮箱的哦邮件服务器给qq邮箱发送邮件，那么jenkins与邮件服务器通讯时双方使用的分别是什么端口？邮件服务器与qq邮箱通讯时双方使用的分别是什么端口？
>
> 
>
> 在阿里云ECS上安装的Jenkins与163邮箱服务器通信时，通常会使用以下端口：
>
> 1. SMTP（Simple Mail Transfer Protocol）协议用于发送邮件。对于163邮箱，通常使用的端口有25（非加密）、465（SSL加密）和994（TLS加密）。Jenkins可能会使用这些端口之一发送邮件到163邮箱服务器。
>
> 2. IMAP（Internet Message Access Protocol）协议用于接收邮件。对于163邮箱，通常使用的端口有143（非加密）和993（SSL加密）。Jenkins可能会使用这些端口之一从163邮箱服务器接收邮件。
>
> 在163邮箱服务器与qq邮箱通信时，通常会使用以下端口：
>
> 1. SMTP协议用于发送邮件。对于qq邮箱，通常使用的端口有25（非加密）、465（SSL加密）和587（TLS加密）。163邮箱服务器可能会使用这些端口之一发送邮件到qq邮箱。
>
> 2. IMAP协议用于接收邮件。对于qq邮箱，通常使用的端口有143（非加密）和993（SSL加密）。163邮箱服务器可能会使用这些端口之一从qq邮箱接收邮件。
>
> 需要注意的是，在实际应用中，端口的使用可能会受到网络环境、防火墙策略等因素的影响。请根据实际情况选择合适的端口。

## 5、添加任务构建后操作

然后修改我们的first任务，在`构建后操作`里，点击`增加构建后操作步骤`，选择`Editable Email Notihcation`

![image-20230603211718848](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603211718848.png)

然后点击`Advanced Settings...`

![image-20230603211857761](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603211857761.png)

然后在`Triggers`的 `Always` 、`Failure - Any` 、`Success`的`Send To`里都添加上`Build User`

![image-20230603212036386](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603212036386.png)

![image-20230603212039466](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603212039466.png)

![image-20230603212042053](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603212042053.png)

## 6、测试

然后我们构建first项目，在控制台可以看到已经将构建的信息发送邮箱了，这个邮箱就是最开始初始化jenkins时配置的邮箱

![image-20230603213404623](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603213404623.png)

此时邮件已经收到消息了

![image-20230604142629810](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604142629810.png)

如果想要修改邮箱，可以点击自己用户名右边的设置

![image-20230603212655694](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603212655694.png)

下滑找到E-mail，在这里可以修改我们的邮箱

![image-20230603213011284](https://gitlab.com/apzs/image/-/raw/master/image/image-20230603213011284.png)

# 6、使用docker

一般使用jenkins自动化运行到docker有3种方式

第一种（小型公司）：可以让docker容器的某个目录挂载到宿主主机的某个目录，然后我们使用jenkins停止docker容器，删除宿主主机的目录里的jar文件并推送新的jar文件，最后再重启dokcer容器即可，这种方式比较轻量、简单，适合比较小的项目

第二种（中型公司）：使用jenkins推送`dockerfile`和`jar包`，然后再制作镜像、生成容器、运行容器。这种方式比较重量，但非常适合云原生环境。

第三种（大厂）：使用jenkins推送`dockerfile`和`jar包`，然后制作镜像，将镜像推送到harbor私服里，然后再使用k8s构建docker集群

## 方式一

### 1、挂载目录

#### 方式一（推荐）

> 我们需要在测试服务器上安装好docker，然后运行一个docker容器
>
> 如果镜像创建失败，可以使用如下命令，运行一个临时的容器，并设置执行`/bin/bash`进入控制台，当关闭后容器将被删除
>
> ```
> docker run --rm -it --entrypoint=/bin/bash image-name
> ```

我们可以在`/root`目录下创建`dockerfile`文件，然后引入`/root/mydata`目录下的`demo-0.0.1-SNAPSHOT.jar`文件，之所以要将dockerfile文件放在`/root`目录下，是因为jenkins在向测试服务器发送jar包之前，会将`/root/mydata`目录里的文件都删掉

> 注意1：在宿主机的`/root/mydata`目录下，要有一个遵循`demo*.jar`通配符的文件，比如`demo-0.0.1-SNAPSHOT.jar`。如果写成`ADD mydata/demo*.jar /root/demo01.jar`那么只允许有一个匹配通配符的文件。如果想要复制多个jar包可以写为`ADD mydata/demo*.jar /root/`即将匹配的文件全部放到`/root`目录下，不过执行`java -jar /root/demo*.jar`也只能运行第一个匹配的jar包
>
> 注意2：由于`ENTRYPOINT`命令不能使用通配符，也就是不能写成`ENTRYPOINT ["java","-jar","/root/demo*.jar"]`这样，即不能直接运行`java -jar /root/demo*.jar`这个命令。因此可以指定为`ENTRYPOINT ["sh", "-c", "java -jar /root/demo*.jar"]`这样，即运行`sh - c 'java -jar /root/demo*.jar'`，这样运行sh命令就没有通配符了（我们使用通配符的目的就是为了在更新版本信息后仍能运行这个项目）

在root目录下编写 dockerfile 文件

```dockerfile
FROM openjdk:11
EXPOSE 8080

WORKDIR /root

ADD mydata/demo*.jar /root/demo01.jar
ENTRYPOINT ["sh", "-c", "java -jar /root/demo*.jar"]
```

然后在root目录构建镜像

```
docker build -t demo .
```

然后使用这个镜像运行一个容器

```
docker run -d --name demo -p 8080:8080 -v /root/mydata:/root demo
```

使用如下命令查看所有容器

```
docker ps -a
```

#### 方式二（不推荐）

我们可以使用如下命令直接启动一个容器，而不需要镜像，这样的缺点就是当我们变更版本后，需要在jenkins里修改这个命令

```
docker run -d --name demo -p 8080:8080 -v /root/mydata/demo-0.0.1-SNAPSHOT.jar:/app.jar openjdk:11 java -jar app.jar
```

### 2、修改jenkins任务

修改first任务的Pre Steps的`Exec command`，先停止容器，然后移除`/root/mydata`里的文件

```
docker stop demo
rm -rf /root/mydata/*
```

> 如果是方式二，我们还需要
>
> ```
> docker stop demo
> rm -rf /root/mydata/*
> docker rm demo
> docker rmi demo
> ```

![image-20230604160808649](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604160808649.png)

然后修改first任务的Post Steps的`Exec command`，启动demo容器

```
docker start demo
```

![image-20230604155059562](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604155059562.png)

### 3、修改版本

我们可以再我们的项目里修改一下版本

![image-20230604180055473](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604180055473.png)

然后修改一下hello接口的返回内容

![image-20230604180136531](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604180136531.png)

此时直接提交代码并构建jenkins任务会发现jenkins会向测试服务器发送`demo-0.0.1-SNAPSHOT.jar`和`demo-0.0.2-SNAPSHOT.jar`两个文件

![image-20230604180438838](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604180438838.png)

这是因为我们在更改版本号后，没有执行`mvn clean`命令，导致`target`目录里面原来的文件没有删除

```bash
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# cd /root/.jenkins/workspace/first
[root@iZbp1asdy4uxt0pu8ywpiqZ first]# cd target
[root@iZbp1asdy4uxt0pu8ywpiqZ target]# ls
classes                           demo-0.0.2-SNAPSHOT.jar           generated-test-sources  surefire-reports
demo-0.0.1-SNAPSHOT.jar           demo-0.0.2-SNAPSHOT.jar.original  maven-archiver          test-classes
demo-0.0.1-SNAPSHOT.jar.original  generated-sources                 maven-status
```

![image-20230604174002294](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604174002294.png)

就像我们在IDEA里执行`isntall`命令一样，并不会删除target文件里的目录

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230604174946549.png" alt="image-20230604174946549" style="zoom:50%;" />

如果我们使用IDEA，可以运行`clean`和`install`命令，但是jenkins不行啊。因此我们可以给项目添加一个`maven-clean-plugin`插件（添加后别忘了提交代码到远程仓库）

```xml
<plugin>
    <artifactId>maven-clean-plugin</artifactId>
    <version>3.1.0</version>
    <executions>
        <execution>
            <id>auto-clean</id>
            <phase>initialize</phase>
            <goals>
                <goal>clean</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

![image-20230604180848505](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604180848505.png)

这样直接执行install命令就能将target目录里的文件删除了

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230604180958491.png" alt="image-20230604180958491" style="zoom:50%;" />

### 4、测试

修改版本前：

```
[root@iZuf67qk2gigu0s3sn5fs2Z mydata]# pwd
/root/mydata
[root@iZuf67qk2gigu0s3sn5fs2Z mydata]# ls
demo-0.0.1-SNAPSHOT.jar
[root@iZuf67qk2gigu0s3sn5fs2Z mydata]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
f3b80165733e        demo                "sh -c 'java -jar ..."   24 seconds ago      Up 23 seconds       0.0.0.0:8080->8080/tcp   demo
```

![image-20230604175234428](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604175234428.png)

![image-20230604175237547](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604175237547.png)

修改版本后：可以看到修改版本后jar包名修改了，接口返回的内容也修改了

```bash
[root@iZuf67qk2gigu0s3sn5fs2Z ~]# cd /root/mydata
[root@iZuf67qk2gigu0s3sn5fs2Z mydata]# ls
demo-0.0.2-SNAPSHOT.jar
[root@iZuf67qk2gigu0s3sn5fs2Z mydata]# docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
f3b80165733e        demo                "sh -c 'java -jar ..."   27 minutes ago      Up 3 minutes        0.0.0.0:8080->8080/tcp   demo
```

![image-20230604175237546](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604175237546.png)

![image-20230604175237548](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604175237548.png)



## 方式二



![image-20230604182856330](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604182856330.png)



![image-20230605213934828](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605213934828.png)



```bash
docker stop demo
docker rm demo
docker rmi demo
rm -rf /root/mydata/*
```

![image-20230604183308293](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604183308293.png)



删除`Exec command`，然后点击`Add Transfer Set`

![image-20230604183012771](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604183012771.png)

然后我们再添加一个

> ~~注意：我们把dockerfile文件放到了`/root/mydata`目录下，由于执行命令是在`/root`目录，因此创建镜像时文件的路径为`./mydata`，也就是`/root/mydata`~~(使用这种方式dockerfile文件)

```
docker build -t demo ./mydata
docker run -d --name demo -p 8080:8080 -v /root/mydata:/root demo
```

![image-20230604183523519](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604183523519.png)



```
SSH: EXEC: STDOUT/STDERR from command [docker build -t demo ./mydata
docker run -d --name demo -p 8080:8080 -v /root/mydata:/root demo] ...
SSH: EXEC: connected
Sending build context to Docker daemon 17.62 MB

Step 1/5 : FROM openjdk:11
 ---> 47a932d998b7
Step 2/5 : EXPOSE 8080
 ---> Using cache
 ---> 03e0f935f99b
Step 3/5 : WORKDIR /root
 ---> Using cache
 ---> bfd8401bbd46
Step 4/5 : ADD mydata/demo*.jar /root/demo01.jar
No source files were specified
```

![image-20230605213420809](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605213420809.png)



```bash
[root@iZuf606rgryt1n8gpd88spZ ~]# docker build -t demo ./mydata
Sending build context to Docker daemon 17.62 MB
Step 1/5 : FROM openjdk:11
 ---> 47a932d998b7
Step 2/5 : EXPOSE 8080
 ---> Using cache
 ---> 03e0f935f99b
Step 3/5 : WORKDIR /root
 ---> Using cache
 ---> bfd8401bbd46
Step 4/5 : ADD mydata/demo*.jar /root/demo01.jar
No source files were specified
[root@iZuf606rgryt1n8gpd88spZ ~]# mv /root/mydata/dockerfile /root
[root@iZuf606rgryt1n8gpd88spZ ~]# ls
dockerfile  mydata  userdata.txt
[root@iZuf606rgryt1n8gpd88spZ ~]# docker build -t demo .
Sending build context to Docker daemon 17.63 MB
Step 1/5 : FROM openjdk:11
 ---> 47a932d998b7
Step 2/5 : EXPOSE 8080
 ---> Using cache
 ---> 03e0f935f99b
Step 3/5 : WORKDIR /root
 ---> Using cache
 ---> bfd8401bbd46
Step 4/5 : ADD mydata/demo*.jar /root/demo01.jar
 ---> b83170d78500
Removing intermediate container 5a2207342fd3
Step 5/5 : ENTRYPOINT sh -c java -jar /root/demo*.jar
 ---> Running in 90c90c3f35fb
 ---> 2e2fafb48f27
Removing intermediate container 90c90c3f35fb
Successfully built 2e2fafb48f27
```

![image-20230605212338143](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605212338143.png)



```
[root@iZuf606rgryt1n8gpd88spZ ~]# cat dockerfile
FROM openjdk:11
EXPOSE 8080

WORKDIR /root/mydata

ADD demo*.jar /root/demo01.jar
ENTRYPOINT ["sh", "-c", "java -jar /root/demo*.jar"]
[root@iZuf606rgryt1n8gpd88spZ ~]# pwd
/root
[root@iZuf606rgryt1n8gpd88spZ ~]# mv dockerfile /root/mydata
[root@iZuf606rgryt1n8gpd88spZ ~]# docker build -t demo ./mydata
Sending build context to Docker daemon 17.62 MB
Step 1/5 : FROM openjdk:11
 ---> 47a932d998b7
Step 2/5 : EXPOSE 8080
 ---> Using cache
 ---> 03e0f935f99b
Step 3/5 : WORKDIR /root/mydata
 ---> 79603f738a13
Removing intermediate container ba959f26dbd4
Step 4/5 : ADD demo*.jar /root/demo01.jar
 ---> c5fd5e65e95a
Removing intermediate container d713f88c14be
Step 5/5 : ENTRYPOINT sh -c java -jar /root/demo*.jar
 ---> Running in dbcbcedaef22
 ---> ff3f7cf42fb7
Removing intermediate container dbcbcedaef22
Successfully built ff3f7cf42fb7
```

![image-20230605212734741](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605212734741.png)![image-20230605212734883](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605212734883.png)

我们可以修改项目的`docker/dockerfile`文件，并将修改推送到远程仓库

```
FROM openjdk:11
EXPOSE 8080

WORKDIR /root/mydata

ADD demo*.jar /root/demo01.jar
ENTRYPOINT ["sh", "-c", "java -jar /root/demo*.jar"]
```

![image-20230605213526696](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605213526696.png)



![image-20230605234615822](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605234615822.png)



```
[root@iZbp1asdy4uxt0pu8ywpiqZ ~]# cd mydata
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# ls
demo-0.0.2-SNAPSHOT.jar  dockerfile  mydata
[root@iZbp1asdy4uxt0pu8ywpiqZ mydata]# docker exec -it demo /bin/bash
root@d4ed0b5a958b:~/mydata# ls
root@d4ed0b5a958b:~/mydata# cd ..
root@d4ed0b5a958b:~# ls
demo-0.0.2-SNAPSHOT.jar  dockerfile  mydata
```

![image-20230606085930623](https://gitlab.com/apzs/image/-/raw/master/image/image-20230606085930623.png)



![image-20230605234615821](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605234615821.png)





```
Step 5/5 : ENTRYPOINT sh -c java -jar /root/demo*.jar
 ---> Running in 9275b8925c41
 ---> 8d3794f4c2cc
Removing intermediate container 9275b8925c41
Successfully built 8d3794f4c2cc
0ac00e88c033163b83365203b93067253b8ba4e734003657517f9ca309c4d938
/usr/bin/docker-current: Error response from daemon: oci runtime error: container_linux.go:290: starting container process caused "chdir to cwd (\"/root/mydata\") set in config.json failed: no such file or directory".
```

![image-20230605221128662](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605221128662.png)



```
[root@iZuf606rgryt1n8gpd88spZ ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@iZuf606rgryt1n8gpd88spZ ~]# docker run -d --name demo -p 8080:8080 -v /root/mydata:/root demo
83683fc622777c5b2855cedf22250d5c301f837d814e982439d3472c43971308
/usr/bin/docker-current: Error response from daemon: oci runtime error: container_linux.go:290: starting container process caused "chdir to cwd (\"/root/mydata\") set in config.json failed: no such file or directory".
```

![image-20230605222220917](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605222220917.png)

# 7、集群



![image-20230604201147685](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201147685.png)

新建节点

![image-20230604201209903](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201209903.png)



`Number of executors` 为当前节点允许的并发执行的个数

![image-20230604203931942](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604203931942.png)

指定远程工作目录和标签，标签比较有用，以后我们指定在哪台机器上运行时，可以使用标签

![image-20230604201550734](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201550734.png)

在这里输入登录这台主机的用户名和密码

![image-20230604201748131](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201748131.png)

然后选择我们刚刚添加的，再点击报错即可

![image-20230604201845913](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201845913.png)



![image-20230604202034839](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604202034839.png)

我们点击这个节点，在日志里就可以看到这台主机正在干嘛

![image-20230604202047284](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604202047284.png)



再添加一个节点

![image-20230604202359111](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604202359111.png)





 指定远程工作目录和标签，标签比较有用，以后我们指定在哪台机器上运行时，可以使用标签



![image-20230604201550734](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201550734.png)

在这里输入登录这台主机的用户名和密码

![image-20230604201748131](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604201748131.png)

注意选择最下面的这个凭证

![image-20230604203319250](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604203319250.png)





```
[06/04/23 20:28:45] [SSH] WARNING: No entry currently exists in the Known Hosts file for this host. Connections will be denied until this new host and its associated key is added to the Known Hosts file.
Key exchange was not finished, connection is closed.
SSH Connection failed with IOException: "Key exchange was not finished, connection is closed.", retrying in 15 seconds. There are 1 more retries left.
Searching for 139.196.238.44 in /root/.ssh/known_hosts
Searching for 139.196.238.44:22 in /root/.ssh/known_hosts
[06/04/23 20:29:00] [SSH] WARNING: No entry currently exists in the Known Hosts file for this host. Connections will be denied until this new host and its associated key is added to the Known Hosts file.
Key exchange was not finished, connection is closed.
ERROR: Connection is not established!
java.lang.IllegalStateException: Connection is not established!
	at com.trilead.ssh2.Connection.getRemainingAuthMethods(Connection.java:988)
	at com.cloudbees.jenkins.plugins.sshcredentials.impl.TrileadSSHPasswordAuthenticator.canAuthenticate(TrileadSSHPasswordAuthenticator.java:83)
```

![image-20230604203047664](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604203047664.png)

![image-20230604203131546](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604203131546.png)



![image-20230604203207585](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604203207585.png)





![image-20230604205336138](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604205336138.png)



我们可以选择`在必要的时候并发构建`，这样就会随机分配一个节点

![image-20230604210027848](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604210027848.png)

让我们点击多次，可以看到这些任务能够并发构建

![image-20230604210331879](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604210331879.png)

我们还可以选择`限制项目的运行节点`，这样就只在`jenkins-02`或`jenkins-03`中的一个节点运行了

```
jenkins-02  || jenkins-03
```

![image-20230604205928263](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604205928263.png)



![image-20230604205959551](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604205959551.png)





# mypipeline



```
pipeline:整条流水线
agent:指定执行器
stages:所有阶段
stage:某一阶段，可有多个
steps:阶段内的每一步， 可执行命令
```

![image-20230604210756288](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604210756288.png)



```groovy
pipeline {
    agent any

    stages {
        stage('拉取代码') {
            steps {
                echo '拉取成功'
            }
        }
		
		stage('执行构建') {
            steps {
                echo '构建完成'
            }
        }
    }
}
```

取消`使用 Groovy 沙盒`的选中状态，然后点击保存

![image-20230604211657437](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604211657437.png)

然后执行这个任务，再点击这个任务即可看到执行的这一次构建所使用的时间

![image-20230604212053796](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604212053796.png)

点击这个构建，然后点击`Console Output`，可以看到控制台信息，而且这个控制台信息可以点击

![image-20230604212314611](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604212314611.png)

我们还可以从指定阶段重新运行

![image-20230604212406109](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604212406109.png)

我们可以下载`Blue Ocean`这个插件，这个插件有更加友好的界面和更加丰富的功能

![image-20230604212623896](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604212623896.png)

我们点击`打开 Blue Ocean`就能看到非常美观的页面

![image-20230604212759466](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604212759466.png)



![image-20230604212955452](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604212955452.png)



![image-20230604213002086](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604213002086.png)



![image-20230604213006379](https://gitlab.com/apzs/image/-/raw/master/image/image-20230604213006379.png)





post
流水线完成后可执行的任务

- always 无论流水线或者阶段的完成状态。
- changed 只有当流水线或者阶段完成状态与之前不同时。
- failure 只有当流水线或者阶段状态为"failure '运行。
- success 只有当流水线或者阶段状态为"success' "运行。
- unstable只有当流水线或者阶段状态为"unstable"运行。例如:测试失败。
- aborted 只有当流水线或者阶段状态为"aborted "运行。例如:手动取消。

## 2、



![image-20230605195248308](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605195248308.png)



![image-20230605195225799](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605195225799.png)



![image-20230605195054108](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605195054108.png)

> 注意修改为自己项目的分支

![image-20230605195218863](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605195218863.png)

然后我们点击`生成流水线脚本`，就可以看到了



![image-20230605195808934](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605195808934.png)

由于我的jenkins的这台机器已经配置了git的ssh密钥了，因此不需要凭证

![image-20230605195918596](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605195918596.png)

然后我们写在steps里

```groovy
pipeline {
    agent any

    stages {
        stage('拉取代码') {
            steps {
                git 'git@gitlab.com:apzs/demo.git'
                echo '拉取成功'
            }
        }
		
		stage('执行构建') {
            steps {
                echo '构建完成'
            }
        }
    }
}
```

![image-20230605200230185](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605200230185.png)

由于在bash我们可以直接使用git命令，但是我们不能直接使用maven的相关命令，需要引入相关的maven配置才行

这个maven我们在`全局工具配置`里已经添加了，我们需要复制这个名字

![image-20230605200523118](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605200523118.png)

我们可以使用` tools { maven "maven3" }`，表示我们需要maven3这个工具（这里的maven3是全局工具配置里添加的maven的名字）

如果我们想要执行条命令可以写`sh """ 要执行的命令   """`在三引号里面写命令即可（注意要换行，这是groovy的写法），由于执行这条命令的目录在`/root/.jenkins/workspace/mypipeline`，而我们拉取的代码也在这个目录，并且我们的pom.xml文件也在这个目录，因此我们直接执行`sh "mvn clean package"`就行了，如果项目的pom.xml文件不在根目录，可以向下面一样，执行多条shell命令

```groovy
pipeline {
    agent any

	tools {
		maven "maven3"
	}
	
    stages {
        stage('拉取代码') {
            steps {
                git 'git@gitlab.com:apzs/demo.git'
                echo '拉取成功'
            }
        }
		
		stage('执行构建') {
            steps {
				// sh "mvn clean package"
				sh """
				  cd .
				  mvn clean package
				"""
                echo '构建完成'
            }
        }
    }
}
```

![image-20230605202433574](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605202433574.png)

在片段生成器的示例步骤里选择`sshPublisher: Send build artifacts over SSH`，然后设置和first任务的`Pre Step`里一样的配置

![image-20230609113811443](https://gitlab.com/apzs/image/-/raw/master/image/image-20230609113811443.png)





```groovy
pipeline {
    agent any

	tools {
		maven "maven3"
	}
	
    stages {
        stage('拉取代码') {
            steps {
                git 'git@gitlab.com:apzs/demo.git'
                echo '拉取成功'
            }
        }
		
        stage('删除文件') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'TestServer', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''docker stop demo
                docker rm demo
                docker rmi demo
                rm -rf /root/mydata/*''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/mydata', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

		stage('执行构建') {
            steps {
				// sh "mvn clean package"
				sh """
				  cd .
				  mvn clean package
				"""
                echo '构建完成'
            }
        }
    }
}
```



![image-20230609120300258](https://gitlab.com/apzs/image/-/raw/master/image/image-20230609120300258.png)



```groovy
pipeline {
    agent any

	tools {
		maven "maven3"
	}
	
    stages {
        stage('拉取代码') {
            steps {
                git 'git@gitlab.com:apzs/demo.git'
                echo '拉取成功'
            }
        }
		
        stage('删除文件和容器') {
            steps {
                sshPublisher(publishers: [sshPublisherDesc(configName: 'TestServer', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''docker stop demo
                docker rm demo
                docker rmi demo
                rm -rf /root/mydata/*''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/mydata', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }

		stage('执行构建') {
            steps {
				// sh "mvn clean package"
				sh """
				  cd .
				  mvn clean package
				"""
                echo '构建完成'
            }
        }
        stage('生成容器并启动') {
            steps {
               sshPublisher(publishers: [sshPublisherDesc(configName: 'TestServer', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/mydata', remoteDirectorySDF: false, removePrefix: 'target', sourceFiles: '**/target/*.jar'), sshTransfer(cleanRemote: false, excludes: '', execCommand: '''docker build -t demo ./mydata
               
               docker run -d --name demo -p 8080:8080 -v /root/mydata:/root demo''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/mydata', remoteDirectorySDF: false, removePrefix: 'docker', sourceFiles: 'docker/dockerfile')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
            }
        }
    }
}
```



![image-20230609140734583](https://gitlab.com/apzs/image/-/raw/master/image/image-20230609140734583.png)



![image-20230609115625094](https://gitlab.com/apzs/image/-/raw/master/image/image-20230609115625094.png)



![image-20230609140816137](https://gitlab.com/apzs/image/-/raw/master/image/image-20230609140816137.png)







![image-20230609120300259](https://gitlab.com/apzs/image/-/raw/master/image/image-20230609120300259.png)

# 9、多分支job

![image-20230605203731556](https://gitlab.com/apzs/image/-/raw/master/image/image-20230605203731556.png)





![image-20230612170050709](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612170050709.png)



```groovy
pipeline {
    agent any

    stages {
        stage('Master拉取代码') {
            steps {
                echo '拉取Master分支代码成功'
            }
        }

		stage('执行构建') {
            steps {
                echo '构建完成'
            }
        }
    }
}
```

![image-20230612170935936](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612170935936.png)



![image-20230612170807110](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612170807110.png)



![image-20230612171305267](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612171305267.png)



![image-20230612171301164](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612171301164.png)



![image-20230612171341797](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612171341797.png)



![image-20230612172135860](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612172135860.png)





![image-20230612172140180](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612172140180.png)



![image-20230612172417915](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612172417915.png)



![image-20230612172517046](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612172517046.png)



![image-20230612172456536](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612172456536.png)



![image-20230612172500336](https://gitlab.com/apzs/image/-/raw/master/image/image-20230612172500336.png)
