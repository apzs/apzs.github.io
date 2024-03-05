---
tittle: 搭建spring-boot源码环境
---

## 安装软件
### 下载软件
#### 下载 spring-boot
spring-boot 源码网址: [https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot)
我准备构建的是 `v2.3..RELEASE`这个版本，，下载该版本的网址为：[https://github.com/spring-projects/spring-boot/archive/refs/tags/v2.3.4.RELEASE.zip](https://github.com/spring-projects/spring-boot/archive/refs/tags/v2.3.4.RELEASE.zip)
推荐构建带`RELEASE`的稳定版本，比其他版本好构建一些，如果直接克隆，最好全部都下载最新版本(`IDEA``gradle` 这些都要是最新的)，不然会有一些意想不到的bug。(当然都使用最新的也会有很多问题)
![image-20221113100246350](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113100246350.png)
#### 下载`gradle`
打开 `gradle\wrapper\gradle-wrapper.properties`这个文件，`distributionUrl`的值就是这个源码使用的 **gradle版本，去掉 **`https`后面的`\`就是下载地址，打开浏览器或`IDM`直接可以下载。
```groovy
https://services.gradle.org/distributions/gradle-6.6.1-bin.zip
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663573344484-affec3ae-2d2a-4108-afad-8af6b228bb66.png)
下载完成后，解压即可。
#### 修改源码的gradle地址
然后修改`gradle\wrapper\gradle-wrapper.properties`文件里的 `distributionUrl`的值为刚刚下载文件的地址 (注意使用的是正斜杠`/`)
```groovy
distributionUrl=file:///A:/gradle-6.6.1-bin.zip
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663576992159-86a3a90b-d22d-4467-b95c-d281fd681fae.png)
如果下载的是最新的项目源码，可以在以下网址里下载`bin`文件
下载地址  [https://gradle.org/releases/](https://gradle.org/releases/)
或使用如下地址 [https://services.gradle.org/distributions/](https://services.gradle.org/distributions/)
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663574354550-9deb7cef-f636-4160-8c15-c2bd0ae9da0b.png)
## 配置gradle
### 添加`gradle`配置
新建 `respository`文件夹，用来作为仓库
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663574575697-9fa69921-27c6-49e7-83ca-ef9e0880864d.png)
在 `init.d`里新建`init.gradle` 文件，在里面配置阿里云的镜像仓库地址
```groovy
gradle.projectsLoaded {
    rootProject.allprojects {
        buildscript {
            repositories {
                def JCENTER_URL = 'https://maven.aliyun.com/repository/jcenter'
                def GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
                def NEXUS_URL = 'http://maven.aliyun.com/nexus/content/repositories/jcenter'
                all { ArtifactRepository repo ->
                    if (repo instanceof MavenArtifactRepository) {
                        def url = repo.url.toString()
                        if (url.startsWith('https://jcenter.bintray.com/')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $JCENTER_URL."
                            println("buildscript ${repo.url} replaced by $JCENTER_URL.")
                            remove repo
                        }
                        else if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $GOOGLE_URL."
                            println("buildscript ${repo.url} replaced by $GOOGLE_URL.")
                            remove repo
                        }
                        else if (url.startsWith('https://repo1.maven.org/maven2')) {
                            project.logger.lifecycle "Repository ${repo.url} replaced by $REPOSITORY_URL."
                            println("buildscript ${repo.url} replaced by $REPOSITORY_URL.")
                            remove repo
                        }
                    }
                }
                jcenter {
                    url JCENTER_URL
                }
                google {
                    url GOOGLE_URL
                }
                maven {
                    url NEXUS_URL
                }
            }
        }
        repositories {
            def JCENTER_URL = 'https://maven.aliyun.com/repository/jcenter'
            def GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
            def NEXUS_URL = 'http://maven.aliyun.com/nexus/content/repositories/jcenter'
            all { ArtifactRepository repo ->
                if (repo instanceof MavenArtifactRepository) {
                    def url = repo.url.toString()
                    if (url.startsWith('https://jcenter.bintray.com/')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $JCENTER_URL."
                        println("buildscript ${repo.url} replaced by $JCENTER_URL.")
                        remove repo
                    }
                    else if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $GOOGLE_URL."
                        println("buildscript ${repo.url} replaced by $GOOGLE_URL.")
                        remove repo
                    }
                    else if (url.startsWith('https://repo1.maven.org/maven2')) {
                        project.logger.lifecycle "Repository ${repo.url} replaced by $REPOSITORY_URL."
                        println("buildscript ${repo.url} replaced by $REPOSITORY_URL.")
                        remove repo
                    }
                }
            }
            jcenter {
                url JCENTER_URL
            }
            google {
                url GOOGLE_URL
            }
            maven {
                url NEXUS_URL
            }
        }
    }
}
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663574653606-d0b4b1dc-291d-4a53-a914-9f5a4c70e467.png)
### 设置`gradle`的环境变量
#### 新建系统变量
点击高级里的环境变量
点击新建
输入 `GRADLE_HOME`
点击浏览目录，选中gradle安装目录(里面有bin等文件夹)
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663574942510-47abb83b-6034-4339-875e-d2e3f0006f70.png)
#### 配置gradle的二进制程序位置
双击Path 或 选中Path，点击编辑
在后面添加 `;%GRADLE_HOME%\bin`就行了 （如果不是这个界面，可以往后看）
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663503847504-e77bba02-6f11-4dd7-b104-e50a6f14422c.png)
如果想换回新的页面，可以在`Path`的变量值最前面输入`%SystemRoot%system32;`就行了。(这应该是以前设置java环境变量的时候，听信了别人的谗言，把java的环境变量移动到最前面，导致`%SystemRoot%system32;`到后面去了，`%SystemRoot%system32;`在最前面有效)
```groovy
%SystemRoot%system32;
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663575906459-b6ecb902-6202-4497-9c36-9bb23892dd94.png)
在这个界面里，点击新建，输入`%GRADLE_HOME%\bin`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663576294520-4b214446-e859-4799-89c0-e52c8b897b8e.png)
#### 配置仓库的地址
(类似于maven的本地仓库地址)
点击新建
输入 `GRADLE_USER_HOME`
点击浏览目录，选中gradle里新建的respository
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663576635901-f60be9d5-35d5-4623-b3ca-167308737773.png)

在命令行里输入 `gradle -v` ，出现版本信息就代表成功了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663576696062-d27ac252-caa6-4785-855e-aff3d7a0e1c0.png)
## 导入到IDEA
### 1. 设置 gradle
点击 `Customize`里的`All setting...`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663577262483-d60cadfd-6458-4280-b2fd-34b07b1948a8.png)
在 `Build, Execution, Deployment`-> `Build Tools`-> `Gradle`里设置 `Gradle user home:`(一般IDEA会自动识别，不过做好还是设置一下)
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663577428287-9c96f558-79ea-49a4-902d-2c5b1560112e.png)
### 2. 导入项目
点击`Open`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663577536530-53003c8d-eb7d-44e1-96f2-8f904902ef5c.png)
选择源码存放的目录，点击`OK`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663581786875-6badb4c3-fe69-4830-a658-b002d834ada0.png)
或者选择`build.gradle`文件也行，点击`OK`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663577590781-999ef76c-d7fb-4d4d-bf6b-dbb43fbd76d4.png)
点击`Open as Project`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663580943977-f130f38d-ee99-4518-b5fc-ee4bc1739749.png)
### 3. 修改源码配置
打开后首先停止`IDEA`下载各种jar包
参考链接： [https://www.jb51.net/article/201552.htm](https://www.jb51.net/article/201552.htm)  (一定要注意文件的位置，这篇有点坑，但又比较详细)
参考链接：[https://blog.csdn.net/caoniuniu25/article/details/120071167](https://blog.csdn.net/caoniuniu25/article/details/120071167)
#### 修改gradle的url
打开项目后，IDEA会自动下载指定版本的 **gradle **，可以停止下载，修改 `gradle/wrapper/gradle-wrapper.properties` 文件，指定我们离线的 **gradle** 压缩包 (这个以前已经修改过了)
```properties
##distributionUrl=https\://services.gradle.org/distributions/gradle-6.6.1-bin.zip
distributionUrl=file:///A:/gradle-6.6.1-bin.zip
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663582708450-cbc6c19e-5a3a-42c1-89b8-a27e6c94a888.png)
#### 在`build.gradle`里添加阿里云镜像
在`build.gradle`最前面添加如下配置
```groovy
buildscript {
	//阿里云镜像仓库
	repositories {
		maven { url 'https://maven.aliyun.com/nexus/content/groups/public/' }
		maven { url 'https://maven.aliyun.com/nexus/content/repositories/jcenter' }
		maven { url "https://repo.spring.io/plugins-release" }
	}
}
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663583117722-0d308b4f-6843-4803-92df-d4bd87106b54.png)
在本文件的`allprojects`-> `repositories`里添加阿里云镜像
```groovy
maven { url 'https://maven.aliyun.com/nexus/content/groups/public/' }
maven { url 'https://maven.aliyun.com/nexus/content/repositories/jcenter' }
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663583234658-47d405e5-f55b-47eb-9404-426df3bdb0ee.png)
#### 修改`settings.gradle`配置
在`settings.gradle`里的`pluginManagement`-> `repositories`里添加阿里云镜像
```properties
  maven { url 'https://maven.aliyun.com/nexus/content/groups/public/' }
  maven { url 'https://maven.aliyun.com/nexus/content/repositories/jcenter' }
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663583494690-8338ea49-f12c-42aa-ad32-d1312fddc5d9.png)
注释掉`plugins`里的`id "io.spring.gradle-enterprise-conventions" version "0.0.3"`，这行代码是用来做`gradle企业约束`的，不注释会报`Error resolving plugin [id: 'io.spring.gradle-enterprise-conventions', version: '0.0.3']`的错误
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663585385229-cb976828-a3bf-4086-a5e7-965bb8c8b328.png)
以下是错误的完整信息
```groovy
FAILURE: Build failed with an exception.

* Where:
Settings file 'B:\spring-boot-2.3.4.RELEASE\settings.gradle' line: 29

* What went wrong:
Error resolving plugin [id: 'io.spring.gradle-enterprise-conventions', version: '0.0.3']
> Could not resolve all dependencies for configuration 'detachedConfiguration2'.
   > Could not determine artifacts for io.spring.gradle-enterprise-conventions:io.spring.gradle-enterprise-conventions.gradle.plugin:0.0.3
      > Could not get resource 'https://repo.spring.io/plugins-release/io/spring/gradle-enterprise-conventions/io.spring.gradle-enterprise-conventions.gradle.plugin/0.0.3/io.spring.gradle-enterprise-conventions.gradle.plugin-0.0.3.jar'.
         > Could not HEAD 'https://repo.spring.io/plugins-release/io/spring/gradle-enterprise-conventions/io.spring.gradle-enterprise-conventions.gradle.plugin/0.0.3/io.spring.gradle-enterprise-conventions.gradle.plugin-0.0.3.jar'. Received status code 401 from server: Unauthorized

* Try:
Run with --info or --debug option to get more log output. Run with --scan to get full insights.
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663585610619-d686fec5-f94c-457f-84b2-940b3ec5b3c8.png)
#### 修改`buildSrc/build.gradle`配置
可能是原有的编译环境，注释掉`id "io.spring.javaformat" version "${javaFormatVersion}"`，否则报错
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663584959473-344d0906-3819-4127-ae64-2e83221c315f.png)
在`buildSrc/build.gradle`的`repositories`里添加阿里云镜像
```properties
	//阿里云镜像
	maven { url 'https://maven.aliyun.com/nexus/content/groups/public/' }
	maven { url 'https://maven.aliyun.com/nexus/content/repositories/jcenter' }
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663584935218-13227ffd-8762-4f79-b2f1-f5e40fd17a98.png)
#### 在`buildSrc/settings.gradle`里添加阿里云镜像
在`buildSrc/settings.gradle`里的`pluginManagement`-> `repositories`里添加阿里云镜像
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663584234947-037d245c-a99c-4e3c-9a6d-6104391ef984.png)
#### 修改`buildSrc/gradle.properties`配置
在`buildSrc/gradle.properties`里添加如下配置
```properties
gradlePropertiesProp=gradlePropertiesValue
sysProp=shouldBeOverWrittenBySysProp
systemProp.system=systemValue
org.gradle.caching=false
org.gradle.jvmargs=-Xms2048m -Xmx4096m
org.gradle.parallel=true
org.gradle.daemon=true
org.gradle.configureondemand=true
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663584408396-eba19bc6-ce87-43dc-b954-0d0ebcc3e3c2.png)
#### 修改 `buildSrc/build.gradle`文件
修改 `buildSrc/build.gradle`文件，注释掉 `id "io.spring.javaformat" version "${javaFormatVersion}"`
```groovy
plugins {
	id "java-gradle-plugin"
	//可能是原有的编译环境，注释掉，否则报错
	//id "io.spring.javaformat" version "${javaFormatVersion}"
	id "checkstyle"
}
```
## 准备编译
### 选择java版本
#### 设置项目的java版本
`README.adoc`文件提到`need JDK 1.8.`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663586488212-187eae66-0be8-4772-b300-875b31dcdf89.png)
`CONTRIBUTING.adoc`里也说了需要`JavaSE-1.8`环境
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663586638423-2466223e-b92b-4f34-a99a-29a650e651d5.png)
`buildSrc/build.gradle`里写了`sourceCompatibility`和`targetCompatibility`都为`1.8`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663586393935-d84c2cb9-87fa-4dec-834d-a7cbe1ad3d81.png)
因此点击 `File`->`Project Structure...` -> `Project`在`SDK`里选择`1.8`，在`Language level`里选择`8 - Lambdas, type annotations etc.`
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663586206986-cd735c4c-e262-44f2-88b6-4aa1ce3818ae.png)
#### 查看`Gradle JVM`版本
在设置里查看`Build, Execution, Deployment`->`Gradle`里的`Gradle JVM`是否为`1.8`
最好也看一下`Gradle user home`设置的是否为`gradle`本地仓库地址
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663587519543-9552a00c-179d-4e61-a0be-82d3a93b9049.png)
### 开始编译
点击`Gradle`的刷新按钮，`IDEA`将会编译项目
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663585097557-1ba32522-02b9-48ba-902b-57f14fce4f42.png)
然后就是漫长的下载文件的过程了，大概10~30分钟
编译的时候有个 `fatal: not a git repository (or any of the parent directories): .git`这个提示，这个不用管，这是检测到没有使用版本管理的提示
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663556620251-0cf81e6f-a17a-4caf-88a3-f26a5b3c9fd4.png)
报这个错也不用管
```groovy
Build scan background action failed.
org.gradle.process.internal.ExecException: Process 'command 'git'' finished with non-zero exit value 128
	at org.gradle.process.internal.DefaultExecHandle$ExecResultImpl.assertNormalExitValue(DefaultExecHandle.java:415)
	at org.gradle.process.internal.DefaultExecAction.execute(DefaultExecAction.java:38)
	at org.gradle.process.internal.DefaultExecActionFactory.exec(DefaultExecActionFactory.java:202)
	at io.spring.ge.WorkingDirectoryProcessOperations.exec(WorkingDirectoryProcessOperations.java:45)
	at io.spring.ge.BuildScanConventions.exec(BuildScanConventions.java:162)
	at io.spring.ge.BuildScanConventions.addGitMetadata(BuildScanConventions.java:111)
	at com.gradle.scan.plugin.internal.api.n.a(SourceFile:26)
	at com.gradle.scan.plugin.internal.api.o$a.a(SourceFile:112)
	at com.gradle.scan.plugin.internal.api.k.a(SourceFile:67)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
> Task :prepareKotlinBuildScriptModel UP-TO-DATE
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663556596339-b8a2b4d5-d937-4ea4-84c5-4b6e8084090b.png)
出现`BUILD SUCCESSFUL`就证明成功了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663593049269-fcfa63cc-79aa-4879-b402-f9f7d41c67a0.png)
#### 3. 新建 `gradle`模块
在自己新建的gradle模块的`build.gradle`里的`dependencies`里添加如下依赖，引入`spring-boot-starter`
```groovy
api(project(":spring-boot-project:spring-boot-starters:spring-boot-starter"))
```
结果报了如下错误
```groovy
Build file 'B:\spring-boot-2.3.4.RELEASE\my-test\build.gradle' line: 15

A problem occurred evaluating project ':my-test'.
> Could not find method api() for arguments [project ':spring-boot-project:spring-boot-starters:spring-boot-starter'] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663558487754-0ba58865-d92c-47df-ad81-32e927e5ce8d.png)
将 `_id 'java'_`_ 改为 _`id 'java-library'`，重新编译就好了 (git的错误不用管)
```groovy
BUILD SUCCESSFUL in 4s
12 actionable tasks: 1 executed, 11 up-to-date
Build scan background action failed.
org.gradle.process.internal.ExecException: Process 'command 'git'' finished with non-zero exit value 128
	at org.gradle.process.internal.DefaultExecHandle$ExecResultImpl.assertNormalExitValue(DefaultExecHandle.java:415)
	at org.gradle.process.internal.DefaultExecAction.execute(DefaultExecAction.java:38)
	at org.gradle.process.internal.DefaultExecActionFactory.exec(DefaultExecActionFactory.java:202)
	at io.spring.ge.WorkingDirectoryProcessOperations.exec(WorkingDirectoryProcessOperations.java:45)
	at io.spring.ge.BuildScanConventions.exec(BuildScanConventions.java:162)
	at io.spring.ge.BuildScanConventions.addGitMetadata(BuildScanConventions.java:111)
	at com.gradle.scan.plugin.internal.api.n.a(SourceFile:26)
	at com.gradle.scan.plugin.internal.api.o$a.a(SourceFile:112)
	at com.gradle.scan.plugin.internal.api.k.a(SourceFile:67)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
	at java.util.concurrent.FutureTask.run(FutureTask.java:266)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
11:38:47: Execution finished 'dependencies'.
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663558789224-bb522b96-f546-4d21-b58d-4a3ebc39136a.png)
主类有一个提示 `Cannot access org.springframework.context.ConfigurableApplicationContext`运行主类，报了如下错误，`spring-boot-starter` 里的依赖找不到
```groovy
Execution failed for task ':my-test:compileJava'.
> Could not resolve all files for configuration ':my-test:compileClasspath'.
   > Could not find jakarta.annotation:jakarta.annotation-api:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter
   > Could not find org.springframework:spring-core:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter > project :spring-boot-project:spring-boot
   > Could not find org.yaml:snakeyaml:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter
   > Could not find org.springframework:spring-context:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter > project :spring-boot-project:spring-boot
   > Could not find ch.qos.logback:logback-classic:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter > project :spring-boot-project:spring-boot-starters:spring-boot-starter-logging
   > Could not find org.apache.logging.log4j:log4j-to-slf4j:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter > project :spring-boot-project:spring-boot-starters:spring-boot-starter-logging
   > Could not find org.slf4j:jul-to-slf4j:.
     Required by:
         project :my-test > project :spring-boot-project:spring-boot-starters:spring-boot-starter > project :spring-boot-project:spring-boot-starters:spring-boot-starter-logging

Possible solution:
 - Declare repository providing the artifact, see the documentation at https://docs.gradle.org/current/userguide/declaring_repositories.html
```
![无标题.png](https://gitlab.com/apzs/image/-/raw/master/image/1663569154202-a3add081-87f2-4191-9d55-903b50e083f8.png)
查看我们模块的依赖可以看到 `spring-boot-starter` 的依赖报红了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663569503727-4ad2d2a6-6a32-4690-9684-cb9f001110af.png)
#### 可能遇见的错误
##### 测试类报错
```groovy
> Task :buildSrc:test

BomPluginIntegrationTests > libraryModulesAreIncludedInDependencyManagementOfGeneratedPom() FAILED
    org.opentest4j.AssertionFailedError at BomPluginIntegrationTests.java:74

BomPluginIntegrationTests > moduleExclusionsAreIncludedInDependencyManagementOfGeneratedPom() FAILED
    org.opentest4j.AssertionFailedError at BomPluginIntegrationTests.java:163

BomPluginIntegrationTests > libraryImportsAreIncludedInDependencyManagementOfGeneratedPom() FAILED
    org.opentest4j.AssertionFailedError at BomPluginIntegrationTests.java:134

74 tests completed, 3 failed

> Task :buildSrc:test FAILED

Execution failed for task ':buildSrc:test'.
> There were failing tests. See the report at: file:///B:/spring-boot-2.3.4.RELEASE/buildSrc/build/reports/tests/test/index.html

* Try:
> Run with --info or --debug option to get more log output.

* Exception is:
org.gradle.api.tasks.TaskExecutionException: Execution failed for task ':buildSrc:test'.
	at org.gradle.api.internal.tasks.execution.ExecuteActionsTaskExecuter.lambda$executeIfValid$1(ExecuteActionsTaskExecuter.java:142)
    ...
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663509687449-7283f1cb-5a82-4714-af83-01529d4109fd.png)
这是测试类报错，哪一行报错注释掉哪一行就行了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663509847887-16eed668-97c8-422f-b87b-b394a284f219.png)
```groovy
fatal: not a git repository (or any of the parent directories): .git
> Task :buildSrc:compileJava UP-TO-DATE
> Task :buildSrc:compileGroovy NO-SOURCE
> Task :buildSrc:pluginDescriptors UP-TO-DATE
> Task :buildSrc:processResources UP-TO-DATE
> Task :buildSrc:classes UP-TO-DATE
> Task :buildSrc:jar UP-TO-DATE
> Task :buildSrc:assemble UP-TO-DATE
> Task :buildSrc:checkstyleMain UP-TO-DATE
> Task :buildSrc:compileTestJava UP-TO-DATE
> Task :buildSrc:compileTestGroovy NO-SOURCE
> Task :buildSrc:processTestResources UP-TO-DATE
> Task :buildSrc:testClasses UP-TO-DATE
> Task :buildSrc:checkstyleTest UP-TO-DATE
> Task :buildSrc:pluginUnderTestMetadata UP-TO-DATE
> Task :buildSrc:test UP-TO-DATE
> Task :buildSrc:validatePlugins UP-TO-DATE
> Task :buildSrc:check UP-TO-DATE
> Task :buildSrc:build UP-TO-DATE
Download https://maven.aliyun.com/nexus/content/groups/public/org/jetbrains/kotlin/kotlin-gradle-plugin/1.3.72/kotlin-gradle-plugin-1.3.72.pom, took 295 ms (3.94 kB)
Download https://maven.aliyun.com/nexus/content/groups/public/io/spring/nohttp/nohttp-gradle/0.0.3.RELEASE/nohttp-gradle-0.0.3.RELEASE.pom, took 174 ms (2.51 kB)
...
Download https://repo.maven.apache.org/maven2/org/tukaani/xz/1.6/xz-1.6-sources.jar, took 431 ms (123.45 kB)
Download https://repo.maven.apache.org/maven2/org/assertj/assertj-core/3.11.1/assertj-core-3.11.1-sources.jar, took 1 s 57 ms (986.16 kB)
Download https://repo.maven.apache.org/maven2/org/apache/logging/log4j/log4j-core/2.12.1/log4j-core-2.12.1-sources.jar, took 3 s 169 ms (1.25 MB)
Download https://repo.maven.apache.org/maven2/org/junit/jupiter/junit-jupiter/5.6.0/junit-jupiter-5.6.0-sources.jar, took 169 ms (6.09 kB)
Download https://repo.maven.apache.org/maven2/org/apache/logging/log4j/log4j-api/2.12.1/log4j-api-2.12.1-sources.jar, took 208 ms (254.49 kB)
Download https://repo.maven.apache.org/maven2/org/junit/jupiter/junit-jupiter-params/5.6.0/junit-jupiter-params-5.6.0-sources.jar, took 177 ms (64.75 kB)
Download https://repo.maven.apache.org/maven2/org/junit/jupiter/junit-jupiter-api/5.6.0/junit-jupiter-api-5.6.0-sources.jar, took 198 ms (161.05 kB)
Download https://repo.maven.apache.org/maven2/org/junit/platform/junit-platform-commons/1.6.0/junit-platform-commons-1.6.0-sources.jar, took 181 ms (70.89 kB)
Download https://repo.maven.apache.org/maven2/org/junit/jupiter/junit-jupiter-engine/5.6.0/junit-jupiter-engine-5.6.0-sources.jar, took 421 ms (117.16 kB)
Download https://repo.maven.apache.org/maven2/org/junit/platform/junit-platform-engine/1.6.0/junit-platform-engine-1.6.0-sources.jar, took 364 ms (127.68 kB)

BUILD SUCCESSFUL in 49s
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663512882493-54e15362-ad34-42ef-8f62-783a8410f2b2.png)
##### 下载jar报失败
401代表没有权限，Spring从5.X之后访问**repo.spring.io**仓库需要权限认证了，所以可以用阿里云的镜像代替Spring官网的镜像。(这样后面还会有别的错误，因此建议把前面的修改配置的步骤做完)
```java
Could not HEAD 'https://repo.spring.io/plugins-release/io/spring/gradle-enterprise-conventions/io.spring.gradle-enterprise-conventions.gradle.plugin/0.0.3/io.spring.gradle-enterprise-conventions.gradle.plugin-0.0.3.jar'. Received status code 401 from server: Unauthorized
Disable Gradle 'offline mode' and sync project
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663503239137-522342c6-f68a-411d-b7cb-1c3cc0de4432.png)
阿里云镜像文档： [https://developer.aliyun.com/mvn/guide](https://developer.aliyun.com/mvn/guide)

| **仓库名称** | **阿里云仓库地址** | **阿里云仓库地址(老版)** | **源地址** |
| --- | --- | --- | --- |
| central | https://maven.aliyun.com/repository/central | https://maven.aliyun.com/nexus/content/repositories/central | https://repo1.maven.org/maven2/ |
| jcenter | https://maven.aliyun.com/repository/public | https://maven.aliyun.com/nexus/content/repositories/jcenter | http://jcenter.bintray.com/ |
| public | https://maven.aliyun.com/repository/public | https://maven.aliyun.com/nexus/content/groups/public | central仓和jcenter仓的聚合仓 |
| google | https://maven.aliyun.com/repository/google | https://maven.aliyun.com/nexus/content/repositories/google | https://maven.google.com/ |
| gradle-plugin | https://maven.aliyun.com/repository/gradle-plugin | https://maven.aliyun.com/nexus/content/repositories/gradle-plugin | https://plugins.gradle.org/m2/ |
| spring | https://maven.aliyun.com/repository/spring | https://maven.aliyun.com/nexus/content/repositories/spring | http://repo.spring.io/libs-milestone/ |
| spring-plugin | https://maven.aliyun.com/repository/spring-plugin | https://maven.aliyun.com/nexus/content/repositories/spring-plugin | http://repo.spring.io/plugins-release/ |
| grails-core | https://maven.aliyun.com/repository/grails-core | https://maven.aliyun.com/nexus/content/repositories/grails-core | https://repo.grails.org/grails/core |
| apache snapshots | https://maven.aliyun.com/repository/apache-snapshots | https://maven.aliyun.com/nexus/content/repositories/apache-snapshots | https://repository.apache.org/snapshots/ |

**搜索 **`https://repo.spring.io/plugins-release` 然后替换为 `https://maven.aliyun.com/repository/spring-plugin`就行了
##### 多个编译错误异常
**更换后又报了如下错误，以下错误就是**`**gradle**`**版本不对，需要更换为最新版本**
```groovy
Caused by: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663505478528-3aa67389-3557-4bef-887e-e664bc5f9af3.png)
## 新建测试模块
直接复制`spring-boot-2.3.4.RELEASE\spring-boot-tests\spring-boot-smoke-tests\spring-boot-smoke-test-actuator-log4j2`，粘贴到`spring-boot-2.3.4.RELEASE`这整个项目下，改名为`spring-boot-study`并修改里面的包名和启动类名
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663656540869-62e2ed26-aa17-4eb5-a93f-b949d998deca.png)
直接运行查看，这样就运行成功了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663656574819-13693c05-5bbb-4a99-8ea3-06b94aca89be.png)
写个简单的`Hello`
```groovy
package com.atguigu.boot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

	@ResponseBody
	@GetMapping("/hello")
	public String hello(){
		return "hello";
	}

}
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663656815190-b985ae86-aff3-402e-9e32-b517a94856c8.png)
输入这里的用户名和密码就访问成功了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663656891489-09ef6552-2fe7-4c3b-805a-84285b44a40e.png)
## ~~新建一个模块测试~~
**这个方法尝试了好多次，都没成功**
新建一个`Gradle`构建的模块，第一次构建时间可能会长一些，期间`project`目录里的文件会闪，这是正常现象。
![无标题.png](https://gitlab.com/apzs/image/-/raw/master/image/1663593358053-d1682591-2fce-4eb4-a775-09623c8df601.png)
直接运行，发现运行不了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663643396848-dec5dd85-4b2e-4283-8e7b-deb0427f5fe7.png)
在`Build and run`里将 `nodule not specified`修改为`jdk 1.8`，这样就输出`Hello world!`了
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663644549981-19bb6dcd-6d61-464c-8254-e90ea2f90b3c.png)
查看与`spring-boot-starter`不在同一个父项目的模块如何引入`spring-boot-starter`项目,例如`spring-boot-tests\spring-boot-smoke-tests\spring-boot-smoke-test-actuator-log4j2`里的`build.gradle`文件
```groovy
implementation(project(":spring-boot-project:spring-boot-starters:spring-boot-starter"))
implementation(project(":spring-boot-project:spring-boot-starters:spring-boot-starter-web"))
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663643278276-dbd0e6f7-e4b4-4d61-888e-59331c6f50bd.png)
先运行这个模块，可以看到这个模块可以运行
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663645137136-ac878def-cdda-40e3-bc02-793e40012ec5.png)
在自己项目的`build.gradle`文件的`dependencies`里引入`spring-boot-starter`和`spring-boot-starter-web`，然后点击`dependencies`左边的运行按钮，让其构建
```groovy
implementation(project(":spring-boot-project:spring-boot-starters:spring-boot-starter"))
implementation(project(":spring-boot-project:spring-boot-starters:spring-boot-starter-web"))
```
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663643501783-0c89c905-4e90-4050-809f-48c2bee2fae0.png)
修改`Main`类
```groovy
package com.atguigu.boot;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class Main {
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}
}
```
然后启动类使用的`@SpringBootApplication`注解和`SpringApplication`报红，点击右上角`gradle`的刷新
![image.png](https://gitlab.com/apzs/image/-/raw/master/image/1663643669007-ecf0df52-714e-4fd2-a753-cbf5b9b58beb.png)
出现了一条红色的下划线，提示`Cannot access org.springframework.context.ConfigurableApplicationContext`，不管它，直接运行报了如下错误。大概意思就是找不到这些依赖
```groovy
Execution failed for task ':spring-boot-study:compileJava'.
> Could not resolve all files for configuration ':spring-boot-study:compileClasspath'.
   > Could not find jakarta.annotation:jakarta.annotation-api:.
     Required by:
         project :spring-boot-study > project :spring-boot-project:spring-boot-starters:spring-boot-starter
         project :spring-boot-study > project :spring-boot-project:spring-boot-starters:spring-boot-starter-web > project :spring-boot-project:spring-boot-starters:spring-boot-starter-tomcat
   > Could not find org.springframework:spring-core:.
     Required by:
         project :spring-boot-study > project :spring-boot-project:spring-boot-starters:spring-boot-starter
         project :spring-boot-study > project :spring-boot-project:spring-boot-starters:spring-boot-starter > project :spring-boot-project:spring-boot
   ...
Possible solution:
 - Declare repository providing the artifact, see the documentation at https://docs.gradle.org/current/userguide/declaring_repositories.html
```
![无标题.png](https://gitlab.com/apzs/image/-/raw/master/image/1663644930442-9d4bb2cc-55d0-492b-a3e8-9a2a23562d65.png)
这里卡了很久，最后把所有软件全部卸载，重新运行也还是报这个错，才复制别的模块进来。
