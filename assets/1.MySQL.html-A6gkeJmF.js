import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as t,c as r,a as e,b as i,d as l,e as a}from"./app-YilgCgZO.js";const c={},m=a(`<h1 id="javaweb基础1——mysql" tabindex="-1"><a class="header-anchor" href="#javaweb基础1——mysql" aria-hidden="true">#</a> JavaWeb基础1——MySQL</h1><hr><h2 id="一、概念" tabindex="-1"><a class="header-anchor" href="#一、概念" aria-hidden="true">#</a> 一、概念</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/3fafbaaee1204e73a9d8559b5b52e05b-17094405191761.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>常用关系型数据库管理系统：</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/18d0337f064b4f23a2247ce4d5cdad64-17094405191763.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="二、下载安装配置卸载" tabindex="-1"><a class="header-anchor" href="#二、下载安装配置卸载" aria-hidden="true">#</a> 二、下载安装配置卸载</h2><p><strong>第一步</strong>：去官网下载安装</p><p><strong>第二步</strong>：先解压，然后在mysql下创建一个<strong>my.ini</strong>文件，更改my.ini文件里面的前两行安装目录，第二行加上\\data，my.ini文件不能多一个符号或者少一个符号，在path（<strong>环境变量</strong>里面）加上mysql路径（;E:\\mysql\\mysql-8.0.25-winx64\\bin）</p><p>(填写自己的mysql安装路径)</p><p><strong>第三步</strong>：进入命令指示符（在bin目录下运行cmd）,</p><p>输入mysqld --initialize-insecure --user=mysql,初始化数据库，并设置默认root为空，初始化完成后，在mysql根目录中会自动生成data文件</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqld --initialize-insecure --user=mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再输入mysqld -install,为windows安装mysql服务，默认服务名为mysql</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqld -install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>出现service successfully installed.表示配置完成</p><p>启动数据库</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>net start mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入mysql -u root -p进行登录 ，其中mysql是安装目录bin下的mysql.exe与服务mysql间进行通信，-u后跟账户名root，-p后先不设置密码,不用输入密码直接回车</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql -u root -p
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>出现mysql&gt;配置完成</p><p><strong>修改密码：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter user user() identified by &quot;密码&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>mysql退出 mysql&gt;quit;</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>exit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入net stop mysql关闭数据库</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>net stop mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,27),o={href:"https://www.bilibili.com/video/BV1EJ411p7Ty?spm_id_from=333.337.search-card.all.click&vd_source=c38767bfbfd3bca708f14e8cf62220b4",title:"(全网最详细)Mysql下载安装和配置方法(看了必成功)_哔哩哔哩_bilibili",target:"_blank",rel:"noopener noreferrer"},v=a(`<p><strong>卸载</strong></p><p>cmd先停止服务</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>net stop mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>再卸载服务</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqld -remove mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后删除目录和环境变量</p><h2 id="三、关系型数据库" tabindex="-1"><a class="header-anchor" href="#三、关系型数据库" aria-hidden="true">#</a> 三、关系型数据库</h2><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/71d13a2f344d48688b48a88a2901fcbe-17094405191765.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>例如下面关系模型的二维表：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/9c14c94f0a54428685fafd9d2534a0d4-17094405191767.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>数据库在mysql的data目录下。</p><h2 id="四、sql语句" tabindex="-1"><a class="header-anchor" href="#四、sql语句" aria-hidden="true">#</a> 四、SQL语句</h2><h3 id="_4-1-概述" tabindex="-1"><a class="header-anchor" href="#_4-1-概述" aria-hidden="true">#</a> 4.1 概述</h3><p><img src="https://gitlab.com/apzs/image/-/raw/master/image/34a5f6704fe64e5b88b24de5c20287f8-17094405191769.png" alt="" loading="lazy"><img src="https://gitlab.com/apzs/image/-/raw/master/image/1eac223a7dd44da994c9b74d920529b9-170944051917711.png" alt="" loading="lazy"></p><p>注意单行注释--后有空格。</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/f037bed50bf4422a93ce6814a30499a4-170944051917713.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c822a978c3704ae596c430a2fe084338-170944051917715.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-2-ddl数据定义语言" tabindex="-1"><a class="header-anchor" href="#_4-2-ddl数据定义语言" aria-hidden="true">#</a> 4.2 DDL数据定义语言</h3><h4 id="_4-2-0-mysql自带数据库" tabindex="-1"><a class="header-anchor" href="#_4-2-0-mysql自带数据库" aria-hidden="true">#</a> 4.2.0 mysql自带数据库</h4><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/53afd00277fa4989bcbe24fe4b65aaa1-170944051917717.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>information_schema 是信息数据库。</strong></p><p>其中保存着关于MySQL服务器所维护的所有其他数据库的信息。如数据库名，数据库的表，表栏的数据类型与访问权 限等。在INFORMATION_SCHEMA中，有数个只读表。它们实际上是视图，而不是基本表，因此，你将无法看到与之相关的任何文件。</p><p><strong>mysql核心数据库</strong>，存储MySQL数据库里最核心的信息，例如权限、安全。</p><p><strong>sys：系统数据库。</strong></p><p><strong>performance_schema</strong>主要用于收集数据库服务器性能参数（研究性能调优要用到）</p><h4 id="_4-2-1-数据库的增删查、使用" tabindex="-1"><a class="header-anchor" href="#_4-2-1-数据库的增删查、使用" aria-hidden="true">#</a> 4.2.1 数据库的增删查、使用</h4><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/d7f8ecad8ca248c1932f5d8bdfb905c1-170944051917719.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-2-2-ddl查询表" tabindex="-1"><a class="header-anchor" href="#_4-2-2-ddl查询表" aria-hidden="true">#</a> 4.2.2 DDL查询表</h4><p><strong>查询当前数据库下所有表名称</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SHOW TABLES;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查询表结构</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DESC 表名称;        #desc是describe缩写，译为描述
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-2-3-ddl创建表" tabindex="-1"><a class="header-anchor" href="#_4-2-3-ddl创建表" aria-hidden="true">#</a> 4.2.3 DDL创建表</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE 表名 (
	字段名1  数据类型1,
	字段名2  数据类型2,
	…
	字段名n  数据类型n
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：字段名是列名。</p><p>最后一行末尾，不能加逗号</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table tb_user (
	id int,
    username varchar(20),    #sql语句中字符串是char和varchar类型
    password varchar(32)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/7557f33b994e4652ac6a80d2e6cf9696-170944051917721.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_4-2-4-三类数据类型-数值、日期、字符串" tabindex="-1"><a class="header-anchor" href="#_4-2-4-三类数据类型-数值、日期、字符串" aria-hidden="true">#</a> 4.2.4 三类数据类型，数值、日期、字符串</h4><ul><li><p><strong>数值</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>tinyint : 小整数型，占一个字节
int ： 大整数类型，占四个字节
    eg ： age int
double ： 浮点类型
    使用格式： 字段名 double(总长度,小数点后保留的位数)
    eg ： score double(5,2)   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>日期</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>date ： 日期值要带引号。只包含年月日
    eg ：birthday date 
time :  时间值或持续时间
year :  年分值
datetime ： 混合日期和时间值。包含年月日时分秒
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>字符串。要带引号</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>char ： 定长字符串。
    优点：存储性能高
    缺点：浪费空间
    eg ： name char(10)  如果存储的数据字符个数不足10个，也会占10个的空间，汉字占1个字符
varchar ： 变长字符串。
    优点：节约空间
    缺点：存储性能底
    eg ： name varchar(10) 如果存储的数据字符个数不足10个，那就数据字符个数是几就占几个的空间    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_4-2-5-ddl删除表" tabindex="-1"><a class="header-anchor" href="#_4-2-5-ddl删除表" aria-hidden="true">#</a> 4.2.5 DDL删除表</h4><ul><li><strong>删除表</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP TABLE 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>删除表时判断表是否存在</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP TABLE IF EXISTS 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-2-6-ddl修改表" tabindex="-1"><a class="header-anchor" href="#_4-2-6-ddl修改表" aria-hidden="true">#</a> 4.2.6 DDL修改表</h4><p>关键字rename，add，modify，change，drop</p><ul><li><strong>修改表名</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 RENAME TO 新的表名;

-- 将表名student修改为stu
alter table student rename to stu;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>添加一列</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 ADD 列名 数据类型;

-- 给stu表添加一列address，该字段类型是varchar(50)
alter table stu add address varchar(50);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>修改数据类型</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 MODIFY 列名 新数据类型;

-- 将stu表中的address字段的类型改为 char(50)
alter table stu modify address char(50);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>修改列名和数据类型</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;

-- 将stu表中的address字段名改为 addr，类型改为varchar(50)
alter table stu change address addr varchar(50);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>删除列</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 DROP 列名;

-- 将stu表中的addr字段 删除
alter table stu drop addr;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>删除外键约束</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-3-navicat的使用" tabindex="-1"><a class="header-anchor" href="#_4-3-navicat的使用" aria-hidden="true">#</a> 4.3 Navicat的使用</h3>`,59),u={href:"https://download.navicat.com.cn/download/navicat160_premium_cs_x64.exe",title:"Navicat Premiem16",target:"_blank",rel:"noopener noreferrer"},g=a(`<p>可在网上找教程永久使用，注意注册时要管理员运行和断网，版本必须是我这个版本的16，最新的版本只能购买。</p><p>主机那里填localhost或127.0.0.1，端口3306。</p><p>可以通过“美化sql”格式化代码：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/06681c1bbee746a8a19b9bc1cca47d5a-170944051917723.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-4-数据操作语言dml" tabindex="-1"><a class="header-anchor" href="#_4-4-数据操作语言dml" aria-hidden="true">#</a> <strong>4.4 数据操作语言DML</strong></h3><h4 id="_4-4-1-dml添加数据" tabindex="-1"><a class="header-anchor" href="#_4-4-1-dml添加数据" aria-hidden="true">#</a> 4.4.1 DML添加数据</h4><ul><li><strong>给指定列添加数据</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO 表名(列名1,列名2,…) VALUES(值1,值2,…);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>给全部列添加数据</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO 表名 VALUES(值1,值2,…);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>批量添加数据</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>INSERT INTO 表名(列名1,列名2,…) VALUES(值1,值2,…),(值1,值2,…),(值1,值2,…)…;
INSERT INTO 表名 VALUES(值1,值2,…),(值1,值2,…),(值1,值2,…)…;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意添加字符串时候要加引号</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 给指定列添加数据
INSERT INTO stu (id, NAME) VALUES (1, &#39;张三&#39;);
-- 给所有列添加数据，列名的列表可以省略的
INSERT INTO stu (id,NAME,sex,birthday,score,email,tel,STATUS) VALUES (2,&#39;李四&#39;,&#39;男&#39;,&#39;1999-11-11&#39;,88.88,&#39;lisi@itcast.cn&#39;,&#39;13888888888&#39;,1);
 
INSERT INTO stu VALUES (2,&#39;李四&#39;,&#39;男&#39;,&#39;1999-11-11&#39;,88.88,&#39;lisi@itcast.cn&#39;,&#39;13888888888&#39;,1);
 
-- 批量添加数据
INSERT INTO stu VALUES 
	(2,&#39;李四&#39;,&#39;男&#39;,&#39;1999-11-11&#39;,88.88,&#39;lisi@itcast.cn&#39;,&#39;13888888888&#39;,1),
	(2,&#39;李四&#39;,&#39;男&#39;,&#39;1999-11-11&#39;,88.88,&#39;lisi@itcast.cn&#39;,&#39;13888888888&#39;,1),
	(2,&#39;李四&#39;,&#39;男&#39;,&#39;1999-11-11&#39;,88.88,&#39;lisi@itcast.cn&#39;,&#39;13888888888&#39;,1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-4-2-修改数据" tabindex="-1"><a class="header-anchor" href="#_4-4-2-修改数据" aria-hidden="true">#</a> 4.4.2 修改数据</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE 表名 SET 列名1=值1,列名2=值2,… [WHERE 条件] ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p><strong>注意：</strong></p><ol><li><p>修改语句中如果不加条件，则将所有记录都修改！</p></li><li><p>像上面的语句中的中括号，表示在写sql语句中可以省略这部分</p></li></ol></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>update stu set sex = &#39;女&#39; where name = &#39;张三&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-4-3-删除数据" tabindex="-1"><a class="header-anchor" href="#_4-4-3-删除数据" aria-hidden="true">#</a> 4.4.3 删除数据</h4><ul><li><strong>删除数据</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM 表名 [WHERE 条件] ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>练习</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 删除张三记录
delete from stu where name = &#39;张三&#39;;

-- 删除stu表中所有的数据
delete from stu;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>注意：</strong></p><ol><li><p>和上面一样，删除语句中如果不加条件，所有记录都将被删除，慎重！</p></li><li><p>中括号，表示在写sql语句中可以省略的部分</p></li></ol></blockquote><h3 id="_4-5-数据查询语言dql" tabindex="-1"><a class="header-anchor" href="#_4-5-数据查询语言dql" aria-hidden="true">#</a> 4.5 数据查询语言DQL</h3><h4 id="_4-5-1-查询的完整语法" tabindex="-1"><a class="header-anchor" href="#_4-5-1-查询的完整语法" aria-hidden="true">#</a> 4.5.1 <strong>查询的完整语法</strong></h4><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/sql编写顺序和执行顺序图.png" alt="sql编写顺序和执行顺序图" tabindex="0" loading="lazy"><figcaption>sql编写顺序和执行顺序图</figcaption></figure><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 
    字段列表
FROM 
    表名列表 
WHERE 
    条件列表
GROUP BY
    分组字段
HAVING
    分组后条件
ORDER BY
    排序字段
LIMIT
    分页限定
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-5-2-创建练习查询的表" tabindex="-1"><a class="header-anchor" href="#_4-5-2-创建练习查询的表" aria-hidden="true">#</a> 4.5.2 创建练习查询的表</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 删除stu表
drop table if exists stu;
 
 
-- 创建stu表
CREATE TABLE stu (
 id int, -- 编号
 name varchar(20), -- 姓名
 age int, -- 年龄
 sex varchar(5), -- 性别
 address varchar(100), -- 地址
 math double(5,2), -- 数学成绩
 english double(5,2), -- 英语成绩
 hire_date date -- 入学时间
);
 
-- 添加数据
INSERT INTO stu(id,NAME,age,sex,address,math,english,hire_date) 
VALUES 
(1,&#39;马运&#39;,55,&#39;男&#39;,&#39;杭州&#39;,66,78,&#39;1995-09-01&#39;),
(2,&#39;马花疼&#39;,45,&#39;女&#39;,&#39;深圳&#39;,98,87,&#39;1998-09-01&#39;),
(3,&#39;马斯克&#39;,55,&#39;男&#39;,&#39;香港&#39;,56,77,&#39;1999-09-02&#39;),
(4,&#39;柳白&#39;,20,&#39;女&#39;,&#39;湖南&#39;,76,65,&#39;1997-09-05&#39;),
(5,&#39;柳青&#39;,20,&#39;男&#39;,&#39;湖南&#39;,86,NULL,&#39;1998-09-01&#39;),
(6,&#39;刘德花&#39;,57,&#39;男&#39;,&#39;香港&#39;,99,99,&#39;1998-09-01&#39;),
(7,&#39;张学右&#39;,22,&#39;女&#39;,&#39;香港&#39;,99,99,&#39;1998-09-01&#39;),
(8,&#39;德玛西亚&#39;,18,&#39;男&#39;,&#39;南京&#39;,56,65,&#39;1994-09-02&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-5-3-基础查询" tabindex="-1"><a class="header-anchor" href="#_4-5-3-基础查询" aria-hidden="true">#</a> 4.5.3 基础查询</h4><ul><li><strong>示例</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DISTINCT name AS &#39;名字&#39;,age AS &#39;年龄&#39; FROM stu;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/3ab152b845974c18be6b0e1acaae2527-170944051917725.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><strong>查询多个字段</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 字段列表 FROM 表名;
SELECT * FROM 表名; -- 查询所有数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>查询字段并去除重复记录</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DISTINCT 字段列表 FROM 表名;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://gitlab.com/apzs/image/-/raw/master/image/315c2e2ee0624a669c86e0b1d2d60fae-170944051917727.png" alt="" loading="lazy">去重后<img src="https://gitlab.com/apzs/image/-/raw/master/image/a32778c2a1e343ff9efd5bdb308c40a5-170944051917729.png" alt="" loading="lazy"></p><ul><li><strong>起别名</strong></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>AS: AS 也可以省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-5-4-条件查询-包括模糊查询" tabindex="-1"><a class="header-anchor" href="#_4-5-4-条件查询-包括模糊查询" aria-hidden="true">#</a> 4.5.4 条件查询（包括模糊查询）</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 字段列表 FROM 表名 WHERE 条件列表;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT DISTINCT name AS &#39;名字&#39;,age AS &#39;年龄&#39; FROM stu WHERE age&gt;20 &amp;&amp; age&lt;=40;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ddc740c79210457b98b79dd575e0bf62-170944051917731.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>模糊查询：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT  * FROM stu WHERE name LIKE &#39;_斯%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c39edd4068e44107acea7ae3aa1aaa7f-170944051917733.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>模糊查询替换符：</strong></p><p>下划线是必须一个字符，百分号替换0-多个字符</p><ul><li><strong>条件</strong></li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/2c69ca66aefc4553844df2c244c782bb-170944051917835.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p><strong>注意：</strong></p><ol><li>null不能和等号运算，要 IS NULL或 IS NOT NULL，而不是=null</li><li>SQL语句没有==，相等是=，没有赋值的概念。</li></ol></blockquote><h4 id="_4-5-5-排序查询" tabindex="-1"><a class="header-anchor" href="#_4-5-5-排序查询" aria-hidden="true">#</a> 4.5.5 排序查询</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 字段列表 FROM 表名 ORDER BY 排序字段名1 [排序方式1],排序字段名2 [排序方式2] …;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>查询学生信息，按照数学成绩降序排列，如果数学成绩一样，再按照英语成绩升序排列</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from stu order by math desc , english asc ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/89f64c7fde47401fbdcb59187de0eb27-170944051917837.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></li></ul><p>上述语句中的排序方式有两种，分别是：</p><ul><li><p><strong>ASC ：</strong> 升序排列 <strong>（默认值）</strong><em>ascending</em> /əˈsendɪŋ/</p></li><li><p><strong>DESC ：</strong> 降序排列，descending /dɪˈsendɪŋ/</p></li></ul><blockquote><p>**注意：**如果有多个排序条件，当前边的条件值一样时，才会根据第二条件进行排序</p></blockquote><h4 id="_4-5-6-聚合函数" tabindex="-1"><a class="header-anchor" href="#_4-5-6-聚合函数" aria-hidden="true">#</a> 4.5.6 聚合函数</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 聚合函数名(列名) FROM 表;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>示例：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select count(id) from stu;    #统计id字段非null的记录数量
select count(*) from stu;# 统计“存在非null字段”的记录数量，* 表示所有字段数据，只要某行有一个非空数据，就会被统计在内
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gitlab.com/apzs/image/-/raw/master/image/7ad711a9b074461480c36b47e45de626-170944051917939.png" alt="" loading="lazy"><img src="https://gitlab.com/apzs/image/-/raw/master/image/0c23e9ada91b4fbc87b54c2c6d81b960-170944051917941.png" alt="" loading="lazy"><img src="https://gitlab.com/apzs/image/-/raw/master/image/d44c872e2b454a9999a5e52603b96b0d-170944051917943.png" alt="" loading="lazy"></p><blockquote><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/0783e43c712647fe910cc9520ff74c7a-170944051917945.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></blockquote><p><strong>聚合函数：</strong></p><table><thead><tr><th style="text-align:left;">函数名</th><th style="text-align:left;">功能</th></tr></thead><tbody><tr><td style="text-align:left;">count(列名)</td><td style="text-align:left;">统计数量（选用不为null的列）</td></tr><tr><td style="text-align:left;">max(列名)</td><td style="text-align:left;">最大值</td></tr><tr><td style="text-align:left;">min(列名)</td><td style="text-align:left;">最小值</td></tr><tr><td style="text-align:left;">sum(列名)</td><td style="text-align:left;">求和</td></tr><tr><td style="text-align:left;">avg(列名)</td><td style="text-align:left;">平均值</td></tr></tbody></table><blockquote><p><strong>注意：null 值不参与所有聚合函数运算</strong></p></blockquote><h4 id="_4-5-7-带条件的聚合函数-count-name-abcd-or-null" tabindex="-1"><a class="header-anchor" href="#_4-5-7-带条件的聚合函数-count-name-abcd-or-null" aria-hidden="true">#</a> 4.5.7 带条件的聚合函数：count(name=&#39;abcd&#39; or null)</h4><p>统计所有名字为‘abcd’的学生：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT count(name=&#39;abcd&#39; or null) FROM student;#使用count带条件统计数量必须or null
SELECT count(date  between &#39;2019-01-01&#39; and &#39;2019-03-31&#39; or null) #使用count带条件统计数量必须or null
SELECT count(distinct name) FROM student;#注意distinct不能or null
 
#使用sum带条件统计数量不用or null。尽量别用sum，因为sum主要用来取和，如果这个name字段是数字型，则会是取和。
SELECT sum(name=&#39;abcd&#39;) FROM student;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个和第四个结果都是1：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/af23963217614601879e5c0210a0e0f2-170944051917947.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p><strong>注意：</strong></p><ul><li>使用count带条件统计数量必须or null，否则是统计总数量（条件是distinct除外）</li><li>使用sum带条件统计数量不用or null</li></ul><p>示例：使用count带条件统计数量如果不加or null，就会统计这个字段总数量</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT count(name=&#39;abcd&#39;) FROM student;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/158cd1a13cc047638cb96538552332c1-170944051918049.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></blockquote><h4 id="_4-5-7-分组查询" tabindex="-1"><a class="header-anchor" href="#_4-5-7-分组查询" aria-hidden="true">#</a> 4.5.7 分组查询</h4><p>常常和聚合函数一起用。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 字段列表 FROM 表名 [WHERE 分组前条件限定] GROUP BY 分组字段名 [HAVING 分组后条件过滤];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>**注意：**分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义</p></blockquote><p><strong>练习：</strong></p><p>查询男同学和女同学各自的数学平均分：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#根据性别分组，每组统计平均值
select sex, avg(math) from stu group by sex;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/942c5b4a5b2147fb8907c53715b2d120-170944051918051.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p><strong>注意：<strong>在分组的情况下，查询字段为聚合函数时，这个聚合函数统计的将是</strong>每组的信息</strong></p></blockquote><p>查询男同学和女同学各自的数学平均分，以及各自人数；要求：分数低于70分的不参与分组，分组之后人数大于2个。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#根据性别分组，每组统计数学平均值、人数；分组前过滤math &gt; 70，分组后过滤只展示人数&gt;2的分组
select sex, avg(math),count(*) from stu where math &gt; 70 group by sex having count(*)&gt;2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/054c49471721496c9d488a41bea8cb92-170944051918053.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>因为分组后男性人数没满足having条件，所以男性分组没展示。</p></blockquote><blockquote><p><strong>where 和 having 区别：</strong></p><ul><li><p>执行时机不一样：where 是分组之前进行限定，不满足where条件，则不参与分组，而having是分组之后对结果进行过滤。</p></li><li><p>可判断的条件不一样：where 不能对聚合函数进行判断，having 可以。执行顺序where&gt;聚合函数&gt;having，不可能判断后面执行的条件。</p></li></ul></blockquote><h4 id="_4-5-8-分页查询" tabindex="-1"><a class="header-anchor" href="#_4-5-8-分页查询" aria-hidden="true">#</a> 4.5.8 分页查询</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 字段列表 FROM 表名 LIMIT  起始索引 , 查询条目数;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>练习：</strong></p><p>起始索引 = (当前页码 - 1) * 每页显示的条数</p><ul><li><p>从0开始查询，查询3条数据</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from stu limit 0 , 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>每页显示3条数据，查询第1页数据</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from stu limit 0 , 3;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="五、约束" tabindex="-1"><a class="header-anchor" href="#五、约束" aria-hidden="true">#</a> 五、约束</h2><h3 id="_5-1-概念" tabindex="-1"><a class="header-anchor" href="#_5-1-概念" aria-hidden="true">#</a> 5.1 概念</h3><ul><li><p>约束是作用于表中<strong>列上的规则</strong>，<strong>用于限制加入表的数据</strong></p><p>例如：我们可以给id列加约束，让其值不能重复，不能为null值。</p></li><li><p>添加约束可以在添加数据的时候就限制不正确的数据。例如把年龄是3000，数学成绩是-5分这样无效的数据限制掉，继而保障数据的完整性。</p></li></ul><h3 id="_5-2-常用约束" tabindex="-1"><a class="header-anchor" href="#_5-2-常用约束" aria-hidden="true">#</a> <strong>5.2 常用约束</strong></h3><h4 id="_5-2-1-介绍" tabindex="-1"><a class="header-anchor" href="#_5-2-1-介绍" aria-hidden="true">#</a> 5.2.1 介绍</h4><table><thead><tr><th style="text-align:left;">约束名</th><th style="text-align:left;">约束关键字</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">主键</td><td style="text-align:left;">primary key</td><td style="text-align:left;">唯一，非空</td></tr><tr><td style="text-align:left;">唯一</td><td style="text-align:left;">unique</td><td style="text-align:left;">不能重复，最多只有一个非空记录</td></tr><tr><td style="text-align:left;">默认</td><td style="text-align:left;">default</td><td style="text-align:left;">没有输入值，使用默认值</td></tr><tr><td style="text-align:left;">非空</td><td style="text-align:left;">not null</td><td style="text-align:left;">必须输入</td></tr><tr><td style="text-align:left;">外键</td><td style="text-align:left;">foreign key … references</td><td style="text-align:left;">外键在从表 主表：1方 从表：多方</td></tr><tr><td style="text-align:left;">自增</td><td style="text-align:left;">auto_increment</td><td style="text-align:left;">从1开始自增，只有唯一和主键约束能用</td></tr><tr><td style="text-align:left;">检查(mysql不支持)</td><td style="text-align:left;">check</td><td style="text-align:left;">保证列中的值满足某一条件。</td></tr></tbody></table><h4 id="_5-2-2-常用命令" tabindex="-1"><a class="header-anchor" href="#_5-2-2-常用命令" aria-hidden="true">#</a> 5.2.2 常用命令</h4><p>查询表中所有约束</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    TABLE_SCHEMA = &#39;表名&#39;
    AND TABLE_NAME = &#39;表名&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除约束（DROP CONSTRAINT）:</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE table_name
DROP PRIMARY KEY; 
-- 或 DROP FOREIGN KEY, DROP UNIQUE, 等等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-增删约束" tabindex="-1"><a class="header-anchor" href="#_5-3-增删约束" aria-hidden="true">#</a> <strong>5.3 增删约束</strong></h3><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a750fe19b6b340dab79c0312e7d04e19-170944051918055.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>示例：</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/1fc52f436f004b128852ccbcf0fbd766-170944051918057.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_5-4-外键约束" tabindex="-1"><a class="header-anchor" href="#_5-4-外键约束" aria-hidden="true">#</a> 5.4 外键约束</h3><h4 id="_5-4-1-概述" tabindex="-1"><a class="header-anchor" href="#_5-4-1-概述" aria-hidden="true">#</a> 5.4.1 概述</h4><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 创建表时添加外键约束
CREATE TABLE 表名(
   列名 数据类型,
   …
   [CONSTRAINT] [外键取名名称] FOREIGN KEY(外键列名) REFERENCES 主表(主表列名) 
); 
 
-- 创建表时添加外键约束，constraint译作限制，束缚；references译作关联，参考，提及
create table 表名(
   列名 数据类型,
   …
   [constraint] [外键取名名称] foreign key(外键列名) references 主表(主表列名) 
); 

-- 建完表后添加外键约束
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称);
 
-- 建完表后添加外键约束
alter table 表名 add constraint 外键名称 foreign key (外键字段名称) references 主表名称(主表列名称);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>删除外键约束</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_5-4-2-练习" tabindex="-1"><a class="header-anchor" href="#_5-4-2-练习" aria-hidden="true">#</a> 5.4.2 练习</h4><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/613b5552b3774d08a530317d3765e45b-170944051918059.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 删除表
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
 
-- 部门表
CREATE TABLE dept(
	id int primary key auto_increment,
	dep_name varchar(20),
	addr varchar(20)
);
-- 员工表 
CREATE TABLE emp(
	id int primary key auto_increment,
	name varchar(20),
	age int,
	dep_id int,
 
	-- 添加外键 dep_id,关联 dept 表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id)	
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加数据</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 添加 2 个部门
insert into dept(dep_name,addr) values
(&#39;研发部&#39;,&#39;广州&#39;),(&#39;销售部&#39;, &#39;深圳&#39;);

-- 添加员工,dep_id 表示员工所在的部门
INSERT INTO emp (name, age, dep_id) VALUES 
(&#39;张三&#39;, 20, 1),
(&#39;李四&#39;, 20, 1),
(&#39;王五&#39;, 20, 1),
(&#39;赵六&#39;, 20, 2),
(&#39;孙七&#39;, 22, 2),
(&#39;周八&#39;, 18, 2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时删除 <code>研发部</code> 这条数据，会发现无法删除。</p><p>删除外键</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table emp drop FOREIGN key fk_emp_dept;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重新添加外键</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter table emp add CONSTRAINT fk_emp_dept FOREIGN key(dep_id) REFERENCES dept(id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/16d3b20347d94303967400fd0f3adfd7-170944051918161.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>右键逆向到表模型，可以查看关系:<img src="https://gitlab.com/apzs/image/-/raw/master/image/b16d241d741c4aa98e86e8b2f064b776-170944051918163.png" alt="" loading="lazy"></p><h2 id="六、数据库设计" tabindex="-1"><a class="header-anchor" href="#六、数据库设计" aria-hidden="true">#</a> 六、数据库设计</h2><h3 id="_6-1-概念" tabindex="-1"><a class="header-anchor" href="#_6-1-概念" aria-hidden="true">#</a> 6.1 概念</h3><ul><li><p>软件的研发步骤<img src="https://gitlab.com/apzs/image/-/raw/master/image/0e7e23a46ca74b9f80638597a48a38aa-170944051918165.png" alt="" loading="lazy"></p></li><li><p><strong>数据库设计概念</strong></p><ul><li><p>设计方向：有哪些表？表里有哪些字段？表和表之间有什么关系？</p></li><li><p><strong>数据库设计就是根据业务系统的具体需求，结合我们所选用的DBMS，为这个业务系统构造出最优的数据存储模型。</strong></p></li><li><p>建立数据库中的<strong>表结构</strong>以及<strong>表与表之间的关联关系</strong>的过程。</p></li></ul></li><li><p><strong>数据库设计的步骤</strong></p><ul><li><p>需求分析（数据是什么? 数据具有哪些属性? 数据与属性的特点是什么）</p></li><li><p>逻辑分析（通过ER图对数据库进行逻辑建模，不需要考虑我们所选用的数据库管理系统）</p><p>如下图就是ER(Entity/Relation)图：<img src="https://gitlab.com/apzs/image/-/raw/master/image/962a7371d24d4fbba06293c85fe4e784-170944051918167.png" alt="" loading="lazy"></p></li></ul></li><li><ul><li><p>物理设计（根据数据库自身的特点把逻辑设计转换为物理设计）</p></li><li><p>维护设计（1.对新的需求进行建表；2.表优化）</p></li></ul></li></ul><h3 id="_6-2-表关系" tabindex="-1"><a class="header-anchor" href="#_6-2-表关系" aria-hidden="true">#</a> 6.2 表关系</h3><h4 id="_6-2-1-一对多" tabindex="-1"><a class="header-anchor" href="#_6-2-1-一对多" aria-hidden="true">#</a> 6.2.1 一对多</h4><p>如：部门 和 员工</p><p>一个部门对应多个员工，一个员工对应一个部门。</p><p><strong>实现方式</strong></p><p><strong>在多的一方建立外键，指向一的一方的主键</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/cdb45d19fb044983b1c2747fd51ff67b-170944051918169.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>建表语句：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 删除表
DROP TABLE IF EXISTS tb_emp;
DROP TABLE IF EXISTS tb_dept;
 
-- 部门表
CREATE TABLE tb_dept(
	id int primary key auto_increment,
	dep_name varchar(20),
	addr varchar(20)
);
-- 员工表 
CREATE TABLE tb_emp(
	id int primary key auto_increment,
	name varchar(20),
	age int,
	dep_id int,
 
	-- 添加外键 dep_id,关联 dept 表的id主键
	CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES tb_dept(id)	
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-2-2-多对多" tabindex="-1"><a class="header-anchor" href="#_6-2-2-多对多" aria-hidden="true">#</a> 6.2.2 多对多</h4><p>如：商品 和 订单</p><p>一个商品对应多个订单，一个订单包含多个商品。</p><p><strong>实现方式：</strong></p><p>建立第三张<strong>中间表</strong>，中间表至少包含<strong>两个外键</strong>，分别<strong>关联两方主键</strong>。</p><p><strong>案例：</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/fe300ef5aeaa4a70a056fa0f884311b9-170944051918171.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>建表语句：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 删除表
DROP TABLE IF EXISTS tb_order_goods;
DROP TABLE IF EXISTS tb_order;
DROP TABLE IF EXISTS tb_goods;
 
-- 订单表
CREATE TABLE tb_order(
	id int primary key auto_increment,
	payment double(10,2),
	payment_type TINYINT,
	status TINYINT
);
 
-- 商品表
CREATE TABLE tb_goods(
	id int primary key auto_increment,
	title varchar(100),
	price double(10,2)
);
 
-- 订单商品中间表
CREATE TABLE tb_order_goods(
	id int primary key auto_increment,
	order_id int,
	goods_id int,
	count int
);
 
-- 建完表后，添加外键
alter table tb_order_goods add CONSTRAINT fk_order_id FOREIGN key(order_id) REFERENCES tb_order(id);
alter table tb_order_goods add CONSTRAINT fk_goods_id FOREIGN key(goods_id) REFERENCES tb_goods(id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表结构模型：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/d7a0bf88cd8445a6a78890582e87ee27-170944051918173.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="_6-2-3-一对一" tabindex="-1"><a class="header-anchor" href="#_6-2-3-一对一" aria-hidden="true">#</a> 6.2.3 一对一</h4><p>如：用户 和 用户详情</p><p>一对一关系多用于表拆分，将一个实体中经常使用的字段放一张表，不经常使用的字段放另一张表，用于提升查询性能。</p><p><strong>实现方式：</strong></p><p>在任意一方加入外键，关联另一方主键，并且设置外键为唯一(UNIQUE)</p><p><strong>案例：</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/87326bacb5d2471c94c5584426387029-170944051918175.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>而在真正使用过程中发现 id、photo、nickname、age、gender 字段比较常用，此时就可以将这张表查分成两张表：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/5506c47719e243908d809b725abb9eee-170944051918177.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>建表语句如下：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>create table tb_user_desc (
    id int primary key auto_increment,
    city varchar(20),
    edu varchar(10),
    income int,
    status char(2),
    des varchar(100)
);
​
create table tb_user (
    id int primary key auto_increment,
    photo varchar(100),
    nickname varchar(50),
    age int,
    gender char(1),
    desc_id int unique,
    -- 添加外键
    CONSTRAINT fk_user_desc FOREIGN KEY(desc_id) REFERENCES tb_user_desc(id)    
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看表结构模型图：</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/17fe81e5ded34f0e809f84d956c7b500-170944051918179.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="七、多表查询" tabindex="-1"><a class="header-anchor" href="#七、多表查询" aria-hidden="true">#</a> 七、多表查询</h2><h3 id="_7-1-创建练习的表" tabindex="-1"><a class="header-anchor" href="#_7-1-创建练习的表" aria-hidden="true">#</a> 7.1 创建练习的表</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
 
 
# 创建部门表
	CREATE TABLE dept(
        did INT PRIMARY KEY AUTO_INCREMENT,
        dname VARCHAR(20)
    );
 
	# 创建员工表
	CREATE TABLE emp (
        id INT PRIMARY KEY AUTO_INCREMENT,
        NAME VARCHAR(10),
        gender CHAR(1), -- 性别
        salary DOUBLE, -- 工资
        join_date DATE, -- 入职日期
        dep_id INT,
        FOREIGN KEY (dep_id) REFERENCES dept(did) -- 外键，关联部门表(部门表的主键)
    );
	-- 添加部门数据
	INSERT INTO dept (dNAME) VALUES (&#39;研发部&#39;),(&#39;市场部&#39;),(&#39;财务部&#39;),(&#39;销售部&#39;);
	-- 添加员工数据
	INSERT INTO emp(NAME,gender,salary,join_date,dep_id) VALUES
	(&#39;孙悟空&#39;,&#39;男&#39;,7200,&#39;2013-02-24&#39;,1),
	(&#39;猪八戒&#39;,&#39;男&#39;,3600,&#39;2010-12-02&#39;,2),
	(&#39;唐僧&#39;,&#39;男&#39;,9000,&#39;2008-08-08&#39;,2),
	(&#39;白骨精&#39;,&#39;女&#39;,5000,&#39;2015-10-07&#39;,3),
	(&#39;蜘蛛精&#39;,&#39;女&#39;,4500,&#39;2011-03-14&#39;,1),
	(&#39;小白龙&#39;,&#39;男&#39;,2500,&#39;2011-02-14&#39;,null);	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>员工表：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/e809a1e401dd4864b48a88a9718cb9b7-170944051918181.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>部门表：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/55da6b0f18194baba285e9c25410c834-170944051918183.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_7-2-连接查询" tabindex="-1"><a class="header-anchor" href="#_7-2-连接查询" aria-hidden="true">#</a> 7.2 连接查询</h3><h4 id="_7-2-1-概念" tabindex="-1"><a class="header-anchor" href="#_7-2-1-概念" aria-hidden="true">#</a> 7.2.1 概念</h4><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/06e8d376006348d2aef052eddb179858-170944051918185.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>内连接查询 ：相当于查询AB交集数据</p></li><li><p>外连接查询</p><ul><li><p>左外连接查询 ：相当于查询A表所有数据和交集部门数据</p></li><li><p>右外连接查询 ： 相当于查询B表所有数据和交集部分数据</p></li></ul></li></ul><p>**关联查询结果行数：**假设a表x行，b表y行；</p><ul><li>**a左连接b：**x行~x*y行</li><li>**a右连接b：**y行~y*x行</li><li>**内连接：**0行~min(x,y)行</li></ul><h4 id="_7-2-2-内连接查询" tabindex="-1"><a class="header-anchor" href="#_7-2-2-内连接查询" aria-hidden="true">#</a> 7.2.2 内连接查询</h4><p>相当于查询AB交集数据。</p><p><strong>语句：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 隐式内连接。没有JOIN关键字，条件使用WHERE指定。书写简单，多表时效率低
SELECT 字段列表 FROM 表1,表2… WHERE 条件;
 
-- 显示内连接。使用INNER JOIN ... ON语句, 可以省略INNER。书写复杂，多表时效率高
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 条件;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>隐式连接好理解好书写，语法简单，担心的点较少。</p><p>但是<strong>显式连接</strong>可以减少字段的扫描，有<strong>更快的执行速度</strong>。这种速度优势在3张或更多表连接时比较明显</p></blockquote><p><strong>示例：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#隐式内连接
SELECT
	emp. NAME,
	emp.gender,
	dept.dname
FROM
	emp,
	dept
WHERE
	emp.dep_id = dept.did;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#显式内连接
select * from emp inner join dept on emp.dep_id = dept.did;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/c8944eb2480a4b2a9c80fdab4b0e81c0-170944051918287.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>员工表：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/e809a1e401dd4864b48a88a9718cb9b7-170944051918181.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>部门表：</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/55da6b0f18194baba285e9c25410c834-170944051918183.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure></blockquote><h4 id="_7-2-3-自连接" tabindex="-1"><a class="header-anchor" href="#_7-2-3-自连接" aria-hidden="true">#</a> 7.2.3 自连接</h4>`,186),b={href:"https://baike.baidu.com/item/%E5%86%85%E8%BF%9E%E6%8E%A5?fromModule=lemma_inlink",title:"内连接",target:"_blank",rel:"noopener noreferrer"},p=e("strong",null,"逻辑上",-1),h=a(`<blockquote><p><strong>注意：自连接查询的列名必须是“表名.*”，而不是直接写“*”</strong></p></blockquote><p>案例：</p><p>要求检索出学号为<strong>20210</strong>的学生的同班同学的信息</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT stu.*        #一定注意是stu.*，不是*
 
FROM stu JOIN stu AS stu1 ON stu.grade= stu1.grade
 
WHERE stu1.id=&#39;20210&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-2-4-递归查询" tabindex="-1"><a class="header-anchor" href="#_7-2-4-递归查询" aria-hidden="true">#</a> 7.2.4 递归查询</h4><p>with语法：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>   WITH [RECURSIVE]
        cte_name [(col_name [, col_name] ...)] AS (subquery)
        [, cte_name [(col_name [, col_name] ...)] AS (subquery)] ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>recurslve译为递归。</p><p><strong>with：<strong>在mysql中被称为</strong>公共表达式</strong>,可以作为一个<strong>临时表</strong>然后在其他结构中调用.如果是自身调用那么就是后面讲的递归.</p><p>cte_name :公共表达式的名称,可以理解为表名,用来表示as后面跟着的子查询</p><p>col_name :公共表达式包含的列名,可以写也可以不写</p></blockquote><p><strong>例子：使用MySQL临时表遍历1~5</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>with RECURSIVE t1  AS    #这里t1函数名，也是临时表的表名
(
  SELECT 1 as n        #n是列的别名，1是初始记录
  UNION ALL        #把递归结果（2,3,4,5）合并到t1表中
  SELECT n + 1 FROM t1 WHERE n &lt; 5    #n+1是参数，t1是函数名，n&lt;5是遍历终止条件
)
SELECT * FROM t1;        #正常查询t1这个临时表，相当于调用这个函数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/b00f80066b59494bbceda2ae669aab7d-170944051918289.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p><strong>说明：</strong></p><p>t1 相当于一个表名</p><p>select 1 相当于这个表的初始值，这里使用UNION ALL 不断将每次递归得到的数据加入到表中。</p><p>n&lt;5为递归执行的条件，当n&gt;=5时结束递归调用。</p></blockquote><p><strong>案例，递归查询课程多级分类：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>with recursive t1 as (        #t1是函数名、临时表名
select * from  course_category where  id= &#39;1&#39;   #初始记录，也就是根节点
union all         #把递归结果合并到t1表中
 select t2.* from course_category as t2 inner join t1 on t1.id = t2.parentid    #递归，用分类表t和临时表t1内连接查询
)
 
select *  from t1 order by t1.id, t1.orderby    #查t1表，相当于调用这个函数。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/53252175022343bdab773c9da2f9b5ac-170944051918291.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>mysql递归特点，对比Java递归的优势</strong></p><p><strong>mysql递归次数限制：</strong></p><p>mysql为了避免无限递归默认递归次数为1000，可以通过设置cte_max_recursion_depth参数增加递归深度，还可以通过max_execution_time限制执行时间，超过此时间也会终止递归操作。</p><p><strong>对比Java递归的优势：</strong></p><p>mysql递归相当于在存储过程中执行若干次sql语句，java程序仅与数据库建立一次链接执行递归操作。相比之下，Java递归性能就很差，每次递归都会建立一次数据库连接。</p><h4 id="_7-2-5-外连接查询" tabindex="-1"><a class="header-anchor" href="#_7-2-5-外连接查询" aria-hidden="true">#</a> 7.2.5 外连接查询</h4><p><strong>语句：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 左外连接
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件;
 
-- 右外连接
SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般都用左外连接，因为右外连接可用左外连接实现，可读性更好。</p><p><strong>示例：</strong></p><p>查询emp表所有数据和对应的部门信息（左外连接）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from emp left join dept on emp.dep_id = dept.did;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/0b998abdac6b44afa91caa195373e2b3-170944051918293.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>查询dept表所有数据和对应的员工信息（右外连接）</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from emp right join dept on emp.dep_id = dept.did;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/a8ffd61c9099421f85d687cb6556d290-170944051918295.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_7-3-子查询" tabindex="-1"><a class="header-anchor" href="#_7-3-子查询" aria-hidden="true">#</a> 7.3 子查询</h3><p>查询中嵌套查询，称嵌套查询为子查询。</p><blockquote><p>注意：子语句没有分号。</p></blockquote><p><strong>子查询根据查询结果不同，作用不同，可分为：</strong></p><ul><li><strong>子查询语句结果是单行单列</strong>，子查询语句作为条件值，使用 = != &gt; &lt; 等进行条件判断</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/cfe891f0e64549b69f5598cbbe269745-170944051918297.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>示例：</p><p>查询比猪八戒薪水高的员工：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM emp WHERE salary &gt;(SELECT salary FROM emp WHERE name=&#39;猪八戒&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>子查询语句结果是多行单列</strong>，子查询语句作为条件值，使用 in 等关键字进行条件判断</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/ae2bd8e4ad7941ca90f5d6e9651231ef-170944051918299.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>示例：</p><p>查询 &#39;财务部&#39; 和 &#39;市场部&#39; 所有的员工信息：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT * FROM emp WHERE dep_id in (SELECT did FROM dept WHERE dname IN (&#39;财务部&#39;,&#39;市场部&#39;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>子查询语句结果是多行多列</strong>，子查询语句作为虚拟表</li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/4d0d116169a74593bc53007763749519-1709440519182101.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>示例：</p><p>查询入职日期是 &#39;2011-11-11&#39; 之后的员工信息和部门信息：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select * from (select * from emp where join_date &gt; &#39;2011-11-11&#39; ) AS t1, dept where t1.dep_id = dept.did;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-4-多表查询练习题" tabindex="-1"><a class="header-anchor" href="#_7-4-多表查询练习题" aria-hidden="true">#</a> 7.4 多表查询练习题：</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS salarygrade;
 
-- 部门表
CREATE TABLE dept (
  did INT PRIMARY KEY PRIMARY KEY, -- 部门id
  dname VARCHAR(50), -- 部门名称
  loc VARCHAR(50) -- 部门所在地
);
 
-- 职务表，职务名称，职务描述
CREATE TABLE job (
  id INT PRIMARY KEY,
  jname VARCHAR(20),
  description VARCHAR(50)
);
 
-- 员工表
CREATE TABLE emp (
  id INT PRIMARY KEY, -- 员工id
  ename VARCHAR(50), -- 员工姓名
  job_id INT, -- 职务id
  mgr INT , -- 上级领导
  joindate DATE, -- 入职日期
  salary DECIMAL(7,2), -- 工资
  bonus DECIMAL(7,2), -- 奖金
  dept_id INT, -- 所在部门编号
  CONSTRAINT emp_jobid_ref_job_id_fk FOREIGN KEY(job_id) REFERENCES job(id),
  CONSTRAINT emp_deptid_ref_dept_id_fk FOREIGN KEY(dept_id) REFERENCES dept(did)
);
-- 工资等级表
CREATE TABLE salarygrade (
  grade INT PRIMARY KEY,   -- 级别
  losalary INT,  -- 最低工资
  hisalary INT -- 最高工资
);
				
-- 添加4个部门
INSERT INTO dept(did,dname,loc) VALUES 
(10,&#39;教研部&#39;,&#39;北京&#39;),
(20,&#39;学工部&#39;,&#39;上海&#39;),
(30,&#39;销售部&#39;,&#39;广州&#39;),
(40,&#39;财务部&#39;,&#39;深圳&#39;);
 
-- 添加4个职务
INSERT INTO job (id, jname, description) VALUES
(1, &#39;董事长&#39;, &#39;管理整个公司，接单&#39;),
(2, &#39;经理&#39;, &#39;管理部门员工&#39;),
(3, &#39;销售员&#39;, &#39;向客人推销产品&#39;),
(4, &#39;文员&#39;, &#39;使用办公软件&#39;);
 
 
-- 添加员工
INSERT INTO emp(id,ename,job_id,mgr,joindate,salary,bonus,dept_id) VALUES 
(1001,&#39;孙悟空&#39;,4,1004,&#39;2000-12-17&#39;,&#39;8000.00&#39;,NULL,20),
(1002,&#39;卢俊义&#39;,3,1006,&#39;2001-02-20&#39;,&#39;16000.00&#39;,&#39;3000.00&#39;,30),
(1003,&#39;林冲&#39;,3,1006,&#39;2001-02-22&#39;,&#39;12500.00&#39;,&#39;5000.00&#39;,30),
(1004,&#39;唐僧&#39;,2,1009,&#39;2001-04-02&#39;,&#39;29750.00&#39;,NULL,20),
(1005,&#39;李逵&#39;,4,1006,&#39;2001-09-28&#39;,&#39;12500.00&#39;,&#39;14000.00&#39;,30),
(1006,&#39;宋江&#39;,2,1009,&#39;2001-05-01&#39;,&#39;28500.00&#39;,NULL,30),
(1007,&#39;刘备&#39;,2,1009,&#39;2001-09-01&#39;,&#39;24500.00&#39;,NULL,10),
(1008,&#39;猪八戒&#39;,4,1004,&#39;2007-04-19&#39;,&#39;30000.00&#39;,NULL,20),
(1009,&#39;罗贯中&#39;,1,NULL,&#39;2001-11-17&#39;,&#39;50000.00&#39;,NULL,10),
(1010,&#39;吴用&#39;,3,1006,&#39;2001-09-08&#39;,&#39;15000.00&#39;,&#39;0.00&#39;,30),
(1011,&#39;沙僧&#39;,4,1004,&#39;2007-05-23&#39;,&#39;11000.00&#39;,NULL,20),
(1012,&#39;李逵&#39;,4,1006,&#39;2001-12-03&#39;,&#39;9500.00&#39;,NULL,30),
(1013,&#39;小白龙&#39;,4,1004,&#39;2001-12-03&#39;,&#39;30000.00&#39;,NULL,20),
(1014,&#39;关羽&#39;,4,1007,&#39;2002-01-23&#39;,&#39;13000.00&#39;,NULL,10);
 
 
-- 添加5个工资等级
INSERT INTO salarygrade(grade,losalary,hisalary) VALUES 
(1,7000,12000),
(2,12010,14000),
(3,14010,20000),
(4,20010,30000),
(5,30010,99990);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需求</p><ol><li><p>查询所有员工信息。查询员工编号，员工姓名，工资，职务名称，职务描述</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>/*
    分析：
        1. 员工编号，员工姓名，工资 信息在emp 员工表中
        2. 职务名称，职务描述 信息在 job 职务表中
        3. job 职务表 和 emp 员工表 是 一对多的关系 emp.job_id = job.id
*/
-- 方式一 ：隐式内连接
SELECT
    emp.id,
    emp.ename,
    emp.salary,
    job.jname,
    job.description
FROM
    emp,
    job
WHERE
    emp.job_id = job.id;

-- 方式二 ：显式内连接
SELECT
    emp.id,
    emp.ename,
    emp.salary,
    job.jname,
    job.description
FROM
    emp
INNER JOIN job ON emp.job_id = job.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查询员工编号，员工姓名，工资，职务名称，职务描述，部门名称，部门位置</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>/*
    分析：
        1. 员工编号，员工姓名，工资 信息在emp 员工表中
        2. 职务名称，职务描述 信息在 job 职务表中
        3. job 职务表 和 emp 员工表 是 一对多的关系 emp.job_id = job.id

        4. 部门名称，部门位置 来自于 部门表 dept
        5. dept 和 emp 一对多关系 dept.id = emp.dept_id
*/

-- 方式一 ：隐式内连接
SELECT
    emp.id,
    emp.ename,
    emp.salary,
    job.jname,
    job.description,
    dept.dname,
    dept.loc
FROM
    emp,
    job,
    dept
WHERE
    emp.job_id = job.id
    and dept.id = emp.dept_id
;

-- 方式二 ：显式内连接
SELECT
    emp.id,
    emp.ename,
    emp.salary,
    job.jname,
    job.description,
    dept.dname,
    dept.loc
FROM
    emp
INNER JOIN job ON emp.job_id = job.id
INNER JOIN dept ON dept.id = emp.dept_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查询员工姓名，工资，工资等级</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>/*
    分析：
        1. 员工姓名，工资 信息在emp 员工表中
        2. 工资等级 信息在 salarygrade 工资等级表中
        3. emp.salary &gt;= salarygrade.losalary  and emp.salary &lt;= salarygrade.hisalary
*/
SELECT
    emp.ename,
    emp.salary,
    t2.*
FROM
    emp,
    salarygrade t2
WHERE
    emp.salary &gt;= t2.losalary
AND emp.salary &lt;= t2.hisalary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查询员工姓名，工资，职务名称，职务描述，部门名称，部门位置，工资等级</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>/*
    分析：
        1. 员工编号，员工姓名，工资 信息在emp 员工表中
        2. 职务名称，职务描述 信息在 job 职务表中
        3. job 职务表 和 emp 员工表 是 一对多的关系 emp.job_id = job.id
​
        4. 部门名称，部门位置 来自于 部门表 dept
        5. dept 和 emp 一对多关系 dept.id = emp.dept_id
        6. 工资等级 信息在 salarygrade 工资等级表中
        7. emp.salary &gt;= salarygrade.losalary  and emp.salary &lt;= salarygrade.hisalary
*/
SELECT
    emp.id,
    emp.ename,
    emp.salary,
    job.jname,
    job.description,
    dept.dname,
    dept.loc,
    t2.grade
FROM
    emp
INNER JOIN job ON emp.job_id = job.id
INNER JOIN dept ON dept.id = emp.dept_id
INNER JOIN salarygrade t2 ON emp.salary BETWEEN t2.losalary and t2.hisalary;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="八、事务" tabindex="-1"><a class="header-anchor" href="#八、事务" aria-hidden="true">#</a> 八、事务</h2><h3 id="_8-1-概念" tabindex="-1"><a class="header-anchor" href="#_8-1-概念" aria-hidden="true">#</a> 8.1 概念</h3><p>数据库的事务（Transaction）是一种机制、一个操作序列，包含了<strong>一组数据库操作命令</strong>。</p><p>事务把所有的命令作为一个整体一起向系统提交或撤销操作请求，即这一组数据库命令<strong>要么同时成功，要么同时失败</strong>。</p><p>事务是一个不可分割的工作逻辑单元。</p><p><strong>示例：</strong></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/b95bc735a1b64e5285565707a24acc4f-1709440519182103.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在转账前开启事务，如果出现了异常回滚事务，三步正常执行就提交事务，这样就可以完美解决问题。</p><h3 id="_8-2-语法" tabindex="-1"><a class="header-anchor" href="#_8-2-语法" aria-hidden="true">#</a> 8.2 语法</h3><ul><li><p>开启事务</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>START TRANSACTION;        --transaction译为事务，业务，交易
或者  
BEGIN;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>提交事务</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>commit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p><strong>示例：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 开启事务
BEGIN;
-- 转账操作
-- 1. 查询李四账户金额是否大于500
 
-- 2. 李四账户 -500
UPDATE account set money = money - 500 where name = &#39;李四&#39;;
 
出现异常了...  -- 此处不是注释，在整体执行时会出问题，后面的sql则不执行
-- 3. 张三账户 +500
UPDATE account set money = money + 500 where name = &#39;张三&#39;;
 
-- 提交事务
COMMIT;
 
-- 回滚事务
ROLLBACK;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面sql中的执行成功进选择执行提交事务，而出现问题则执行回滚事务的语句。以后我们肯定不可能这样操作，而是在java中进行操作，在java中可以抓取异常，没出现异常提交事务，出现异常回滚事务。</p><h3 id="_8-3-事务的四大特征" tabindex="-1"><a class="header-anchor" href="#_8-3-事务的四大特征" aria-hidden="true">#</a> 8.3 事务的四大特征</h3><ul><li><p>原子性（Atomicity）: 事务是不可分割的最小操作单位，要么同时成功，要么同时失败</p></li><li><p>一致性（Consistency） :事务完成时，必须使所有的数据都保持一致状态</p></li><li><p>隔离性（Isolation） :多个事务之间，操作的可见性</p></li><li><p>持久性（Durability） :事务一旦提交或回滚，它对数据库中的数据的改变就是永久的</p></li></ul><blockquote><p><strong>说明</strong>：</p><p>mysql中事务是自动提交的。</p><p>也就是说我们不添加事务执行sql语句，语句执行完毕会自动的提交事务。</p><p>可以通过下面语句查询默认提交方式：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT @@autocommit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询到的结果是1 则表示自动提交，结果是0表示手动提交。当然也可以通过下面语句修改提交方式</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>set @@autocommit = 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><h2 id="九、函数" tabindex="-1"><a class="header-anchor" href="#九、函数" aria-hidden="true">#</a> 九、函数</h2><h3 id="_9-1-数值型函数" tabindex="-1"><a class="header-anchor" href="#_9-1-数值型函数" aria-hidden="true">#</a> 9.1 数值型函数</h3>`,72),_=e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"left"}},"函数名称"),e("th",{style:{"text-align":"left"}},"作 用")])],-1),y={style:{"text-align":"left"}},f={href:"http://c.biancheng.net/mysql/abc.html",target:"_blank",rel:"noopener noreferrer"},E=e("td",{style:{"text-align":"left"}},"求绝对值",-1),q={style:{"text-align":"left"}},x={href:"http://c.biancheng.net/mysql/sqrt.html",target:"_blank",rel:"noopener noreferrer"},T=e("td",{style:{"text-align":"left"}},"求二次方根",-1),R={style:{"text-align":"left"}},N={href:"http://c.biancheng.net/mysql/mod.html",target:"_blank",rel:"noopener noreferrer"},A=e("td",{style:{"text-align":"left"}},"求余数",-1),I={style:{"text-align":"left"}},S={href:"http://c.biancheng.net/mysql/ceil_celing.html",target:"_blank",rel:"noopener noreferrer"},L=e("td",{style:{"text-align":"left"}},"两个函数功能相同，都是返回不小于参数的最小整数，即向上取整",-1),O={style:{"text-align":"left"}},k={href:"http://c.biancheng.net/mysql/floor.html",target:"_blank",rel:"noopener noreferrer"},C=e("td",{style:{"text-align":"left"}},"向下取整，返回值转化为一个BIGINT",-1),z={style:{"text-align":"left"}},M={href:"http://c.biancheng.net/mysql/rand.html",target:"_blank",rel:"noopener noreferrer"},F=e("td",{style:{"text-align":"left"}},"生成一个0~1之间的随机数，传入整数参数是，用来产生重复序列",-1),w={style:{"text-align":"left"}},D={href:"http://c.biancheng.net/mysql/round.html",target:"_blank",rel:"noopener noreferrer"},U=e("td",{style:{"text-align":"left"}},"对所传参数进行四舍五入。例如round(3.1415926,3)是四舍五入保留三位小数",-1),B={style:{"text-align":"left"}},j={href:"http://c.biancheng.net/mysql/sign.html",target:"_blank",rel:"noopener noreferrer"},P=e("td",{style:{"text-align":"left"}},"返回参数的符号",-1),Y={style:{"text-align":"left"}},H={href:"http://c.biancheng.net/mysql/pow_power.html",target:"_blank",rel:"noopener noreferrer"},V=e("td",{style:{"text-align":"left"}},"两个函数的功能相同，都是所传参数的次方的结果值",-1),G={style:{"text-align":"left"}},W={href:"http://c.biancheng.net/mysql/sin.html",target:"_blank",rel:"noopener noreferrer"},K=e("td",{style:{"text-align":"left"}},"求正弦值",-1),X={style:{"text-align":"left"}},J={href:"http://c.biancheng.net/mysql/asin.html",target:"_blank",rel:"noopener noreferrer"},Q=e("td",{style:{"text-align":"left"}},"求反正弦值，与函数 SIN 互为反函数",-1),Z={style:{"text-align":"left"}},$={href:"http://c.biancheng.net/mysql/cos.html",target:"_blank",rel:"noopener noreferrer"},ee=e("td",{style:{"text-align":"left"}},"求余弦值",-1),ie={style:{"text-align":"left"}},ne={href:"http://c.biancheng.net/mysql/acos.html",target:"_blank",rel:"noopener noreferrer"},le=e("td",{style:{"text-align":"left"}},"求反余弦值，与函数 COS 互为反函数",-1),ae={style:{"text-align":"left"}},se={href:"http://c.biancheng.net/mysql/tan.html",target:"_blank",rel:"noopener noreferrer"},de=e("td",{style:{"text-align":"left"}},"求正切值",-1),te={style:{"text-align":"left"}},re={href:"http://c.biancheng.net/mysql/atan.html",target:"_blank",rel:"noopener noreferrer"},ce=e("td",{style:{"text-align":"left"}},"求反正切值，与函数 TAN 互为反函数",-1),me={style:{"text-align":"left"}},oe={href:"http://c.biancheng.net/mysql/cot.html",target:"_blank",rel:"noopener noreferrer"},ve=e("td",{style:{"text-align":"left"}},"求余切值",-1),ue=e("h3",{id:"_9-2-字符串函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_9-2-字符串函数","aria-hidden":"true"},"#"),i(" 9.2 字符串函数")],-1),ge=e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"left"}},"函数名称"),e("th",{style:{"text-align":"left"}},"作 用")])],-1),be={style:{"text-align":"left"}},pe={href:"http://c.biancheng.net/mysql/length.html",target:"_blank",rel:"noopener noreferrer"},he=e("td",{style:{"text-align":"left"}},"计算字符串长度函数，返回字符串的字节长度",-1),_e={style:{"text-align":"left"}},ye={href:"http://c.biancheng.net/mysql/concat.html",target:"_blank",rel:"noopener noreferrer"},fe=e("td",{style:{"text-align":"left"}},"合并字符串函数，返回结果为连接参数产生的字符串，参数可以使一个或多个",-1),Ee={style:{"text-align":"left"}},qe={href:"http://c.biancheng.net/mysql/insert.html",target:"_blank",rel:"noopener noreferrer"},xe=e("td",{style:{"text-align":"left"}},"替换字符串函数",-1),Te={style:{"text-align":"left"}},Re={href:"http://c.biancheng.net/mysql/lower.html",target:"_blank",rel:"noopener noreferrer"},Ne=e("td",{style:{"text-align":"left"}},"将字符串中的字母转换为小写",-1),Ae={style:{"text-align":"left"}},Ie={href:"http://c.biancheng.net/mysql/upper.html",target:"_blank",rel:"noopener noreferrer"},Se=e("td",{style:{"text-align":"left"}},"将字符串中的字母转换为大写",-1),Le={style:{"text-align":"left"}},Oe={href:"http://c.biancheng.net/mysql/left.html",target:"_blank",rel:"noopener noreferrer"},ke=e("td",{style:{"text-align":"left"}},"从左侧字截取符串，返回字符串左边的若干个字符",-1),Ce={style:{"text-align":"left"}},ze={href:"http://c.biancheng.net/mysql/right.html",target:"_blank",rel:"noopener noreferrer"},Me=e("td",{style:{"text-align":"left"}},"从右侧字截取符串，返回字符串右边的若干个字符",-1),Fe={style:{"text-align":"left"}},we={href:"http://c.biancheng.net/mysql/trim.html",target:"_blank",rel:"noopener noreferrer"},De=e("td",{style:{"text-align":"left"}},"删除字符串左右两侧的空格",-1),Ue={style:{"text-align":"left"}},Be={href:"http://c.biancheng.net/mysql/replace.html",target:"_blank",rel:"noopener noreferrer"},je=e("td",{style:{"text-align":"left"}},"字符串替换函数，返回替换后的新字符串",-1),Pe={style:{"text-align":"left"}},Ye={href:"http://c.biancheng.net/mysql/substring.html",target:"_blank",rel:"noopener noreferrer"},He=e("td",{style:{"text-align":"left"}},"截取字符串，返回从指定位置开始的指定长度的字符换",-1),Ve={style:{"text-align":"left"}},Ge={href:"http://c.biancheng.net/mysql/reverse.html",target:"_blank",rel:"noopener noreferrer"},We=e("td",{style:{"text-align":"left"}},"字符串反转（逆序）函数，返回与原始字符串顺序相反的字符串",-1),Ke=e("h3",{id:"_9-3-日期和时间函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_9-3-日期和时间函数","aria-hidden":"true"},"#"),i(" 9.3 日期和时间函数")],-1),Xe=e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"left"}},"函数名称"),e("th",{style:{"text-align":"left"}},"作 用")])],-1),Je={style:{"text-align":"left"}},Qe={href:"http://c.biancheng.net/mysql/curdate_current_date.html",target:"_blank",rel:"noopener noreferrer"},Ze=e("td",{style:{"text-align":"left"}},"两个函数作用相同，返回当前系统的日期值",-1),$e={style:{"text-align":"left"}},ei={href:"http://c.biancheng.net/mysql/curtime_current_time.html",target:"_blank",rel:"noopener noreferrer"},ii=e("td",{style:{"text-align":"left"}},"两个函数作用相同，返回当前系统的时间值",-1),ni={style:{"text-align":"left"}},li={href:"http://c.biancheng.net/mysql/now_sysdate.html",target:"_blank",rel:"noopener noreferrer"},ai=e("td",{style:{"text-align":"left"}},"两个函数作用相同，返回当前系统的日期和时间值",-1),si={style:{"text-align":"left"}},di={href:"http://c.biancheng.net/mysql/unix_timestamp.html",target:"_blank",rel:"noopener noreferrer"},ti=e("td",{style:{"text-align":"left"}},"获取UNIX时间戳函数，返回一个以 UNIX 时间戳为基础的无符号整数",-1),ri={style:{"text-align":"left"}},ci={href:"http://c.biancheng.net/mysql/from_unixtime.html",target:"_blank",rel:"noopener noreferrer"},mi=e("td",{style:{"text-align":"left"}},"将 UNIX 时间戳转换为时间格式，与UNIX_TIMESTAMP互为反函数",-1),oi={style:{"text-align":"left"}},vi={href:"http://c.biancheng.net/mysql/month.html",target:"_blank",rel:"noopener noreferrer"},ui=e("td",{style:{"text-align":"left"}},"获取指定日期中的月份",-1),gi={style:{"text-align":"left"}},bi={href:"http://c.biancheng.net/mysql/monthname.html",target:"_blank",rel:"noopener noreferrer"},pi=e("td",{style:{"text-align":"left"}},"获取指定日期中的月份英文名称",-1),hi={style:{"text-align":"left"}},_i={href:"http://c.biancheng.net/mysql/dayname.html",target:"_blank",rel:"noopener noreferrer"},yi=e("td",{style:{"text-align":"left"}},"获取指定曰期对应的星期几的英文名称",-1),fi={style:{"text-align":"left"}},Ei={href:"http://c.biancheng.net/mysql/dayofweek.html",target:"_blank",rel:"noopener noreferrer"},qi=e("td",{style:{"text-align":"left"}},"获取指定日期对应的一周的索引位置值",-1),xi={style:{"text-align":"left"}},Ti={href:"http://c.biancheng.net/mysql/week.html",target:"_blank",rel:"noopener noreferrer"},Ri=e("td",{style:{"text-align":"left"}},"获取指定日期是一年中的第几周，返回值的范围是否为 0〜52 或 1〜53",-1),Ni={style:{"text-align":"left"}},Ai={href:"http://c.biancheng.net/mysql/dayofyear.html",target:"_blank",rel:"noopener noreferrer"},Ii=e("td",{style:{"text-align":"left"}},"获取指定曰期是一年中的第几天，返回值范围是1~366",-1),Si={style:{"text-align":"left"}},Li={href:"http://c.biancheng.net/mysql/dayofmonth.html",target:"_blank",rel:"noopener noreferrer"},Oi=e("td",{style:{"text-align":"left"}},"获取指定日期是一个月中是第几天，返回值范围是1~31",-1),ki={style:{"text-align":"left"}},Ci={href:"http://c.biancheng.net/mysql/year.html",target:"_blank",rel:"noopener noreferrer"},zi=e("td",{style:{"text-align":"left"}},"获取年份，返回值范围是 1970〜2069",-1),Mi={style:{"text-align":"left"}},Fi={href:"http://c.biancheng.net/mysql/time_to_sec.html",target:"_blank",rel:"noopener noreferrer"},wi=e("td",{style:{"text-align":"left"}},"将时间参数转换为秒数",-1),Di={style:{"text-align":"left"}},Ui={href:"http://c.biancheng.net/mysql/sec_to_time.html",target:"_blank",rel:"noopener noreferrer"},Bi=e("td",{style:{"text-align":"left"}},"将秒数转换为时间，与TIME_TO_SEC 互为反函数",-1),ji={style:{"text-align":"left"}},Pi={href:"http://c.biancheng.net/mysql/date_add_adddate.html",target:"_blank",rel:"noopener noreferrer"},Yi=e("td",{style:{"text-align":"left"}},"两个函数功能相同，都是向日期添加指定的时间间隔",-1),Hi={style:{"text-align":"left"}},Vi={href:"http://c.biancheng.net/mysql/date_sub_subdate.html",target:"_blank",rel:"noopener noreferrer"},Gi=e("td",{style:{"text-align":"left"}},"两个函数功能相同，都是向日期减去指定的时间间隔",-1),Wi={style:{"text-align":"left"}},Ki={href:"http://c.biancheng.net/mysql/addtime.html",target:"_blank",rel:"noopener noreferrer"},Xi=e("td",{style:{"text-align":"left"}},"时间加法运算，在原始时间上添加指定的时间",-1),Ji={style:{"text-align":"left"}},Qi={href:"http://c.biancheng.net/mysql/subtime.html",target:"_blank",rel:"noopener noreferrer"},Zi=e("td",{style:{"text-align":"left"}},"时间减法运算，在原始时间上减去指定的时间",-1),$i={style:{"text-align":"left"}},en={href:"http://c.biancheng.net/mysql/datediff.html",target:"_blank",rel:"noopener noreferrer"},nn=e("td",{style:{"text-align":"left"}},"获取两个日期之间间隔，返回参数 1 减去参数 2 的值",-1),ln={style:{"text-align":"left"}},an={href:"http://c.biancheng.net/mysql/date_format.html",target:"_blank",rel:"noopener noreferrer"},sn=e("td",{style:{"text-align":"left"}},"格式化指定的日期，根据参数返回指定格式的值",-1),dn={style:{"text-align":"left"}},tn={href:"http://c.biancheng.net/mysql/weekday.html",target:"_blank",rel:"noopener noreferrer"},rn=e("td",{style:{"text-align":"left"}},"获取指定日期在一周内的对应的工作日索引",-1),cn=e("h3",{id:"_9-4-聚合函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_9-4-聚合函数","aria-hidden":"true"},"#"),i(" 9.4 聚合函数")],-1),mn=e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"left"}},"函数名称"),e("th",{style:{"text-align":"left"}},"作用")])],-1),on={style:{"text-align":"left"}},vn={href:"http://c.biancheng.net/mysql/max.html",target:"_blank",rel:"noopener noreferrer"},un=e("td",{style:{"text-align":"left"}},"查询指定列的最大值",-1),gn={style:{"text-align":"left"}},bn={href:"http://c.biancheng.net/mysql/min.html",target:"_blank",rel:"noopener noreferrer"},pn=e("td",{style:{"text-align":"left"}},"查询指定列的最小值",-1),hn={style:{"text-align":"left"}},_n={href:"http://c.biancheng.net/mysql/count.html",target:"_blank",rel:"noopener noreferrer"},yn=e("td",{style:{"text-align":"left"}},"统计查询结果的行数",-1),fn={style:{"text-align":"left"}},En={href:"http://c.biancheng.net/mysql/sum.html",target:"_blank",rel:"noopener noreferrer"},qn=e("td",{style:{"text-align":"left"}},"求和，返回指定列的总和",-1),xn={style:{"text-align":"left"}},Tn={href:"http://c.biancheng.net/mysql/avg.html",target:"_blank",rel:"noopener noreferrer"},Rn=e("td",{style:{"text-align":"left"}},"求平均值，返回指定列数据的平均值",-1),Nn=e("h3",{id:"_9-5-流程控制函数",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_9-5-流程控制函数","aria-hidden":"true"},"#"),i(" 9.5 流程控制函数")],-1),An=e("thead",null,[e("tr",null,[e("th",{style:{"text-align":"left"}},"函数名称"),e("th",{style:{"text-align":"left"}},"作用")])],-1),In={style:{"text-align":"left"}},Sn={href:"http://c.biancheng.net/mysql/if.html",target:"_blank",rel:"noopener noreferrer"},Ln=e("td",{style:{"text-align":"left"}},"判断，流程控制。expr1 的值为 TRUE，则返回值为 expr2 。否则返回 expr3",-1),On={style:{"text-align":"left"}},kn={href:"http://c.biancheng.net/mysql/ifnull.html",target:"_blank",rel:"noopener noreferrer"},Cn=e("td",{style:{"text-align":"left"}},"判断是否为空。例如select ifnull(age,0) from stu where id=0;如果这个学生年龄是null则返回0",-1),zn={style:{"text-align":"left"}},Mn={href:"http://c.biancheng.net/mysql/case.html",target:"_blank",rel:"noopener noreferrer"},Fn=e("td",{style:{"text-align":"left"}},"搜索语句",-1),wn=e("h2",{id:"十、sql练习题-高频-sql-50-题-基础版",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#十、sql练习题-高频-sql-50-题-基础版","aria-hidden":"true"},"#"),i(" 十、SQL练习题：高频 SQL 50 题（基础版）")],-1),Dn=e("p",null,"初学者可以每天做一道，或者每周做一道，提高自己写SQL的能力。",-1),Un={href:"https://leetcode.cn/studyplan/sql-free-50/",title:"高频 SQL 50 题（基础版） - 学习计划 - 力扣（LeetCode）全球极客挚爱的技术成长平台",target:"_blank",rel:"noopener noreferrer"};function Bn(jn,Pn){const n=d("ExternalLinkIcon");return t(),r("div",null,[m,e("p",null,[i("视频教程"),e("a",o,[i("(全网最详细)Mysql下载安装和配置方法(看了必成功)_哔哩哔哩_bilibili"),l(n)])]),v,e("p",null,[i("正版下载链接："),e("a",u,[i("Navicat Premiem16"),l(n)])]),g,e("p",null,[i("自连接是一种特殊的"),e("a",b,[i("内连接"),l(n)]),i("，它是指相互连接的表在物理上为同一张表，但可以在"),p,i("分为两张表。")]),h,e("table",null,[_,e("tbody",null,[e("tr",null,[e("td",y,[e("a",f,[i("ABS"),l(n)])]),E]),e("tr",null,[e("td",q,[e("a",x,[i("SQRT"),l(n)])]),T]),e("tr",null,[e("td",R,[e("a",N,[i("MOD"),l(n)])]),A]),e("tr",null,[e("td",I,[e("a",S,[i("CEIL 和 CEILING"),l(n)])]),L]),e("tr",null,[e("td",O,[e("a",k,[i("FLOOR"),l(n)])]),C]),e("tr",null,[e("td",z,[e("a",M,[i("RAND"),l(n)])]),F]),e("tr",null,[e("td",w,[e("a",D,[i("ROUND"),l(n)])]),U]),e("tr",null,[e("td",B,[e("a",j,[i("SIGN"),l(n)])]),P]),e("tr",null,[e("td",Y,[e("a",H,[i("POW 和 POWER"),l(n)])]),V]),e("tr",null,[e("td",G,[e("a",W,[i("SIN"),l(n)])]),K]),e("tr",null,[e("td",X,[e("a",J,[i("ASIN"),l(n)])]),Q]),e("tr",null,[e("td",Z,[e("a",$,[i("COS"),l(n)])]),ee]),e("tr",null,[e("td",ie,[e("a",ne,[i("ACOS"),l(n)])]),le]),e("tr",null,[e("td",ae,[e("a",se,[i("TAN"),l(n)])]),de]),e("tr",null,[e("td",te,[e("a",re,[i("ATAN"),l(n)])]),ce]),e("tr",null,[e("td",me,[e("a",oe,[i("COT"),l(n)])]),ve])])]),ue,e("table",null,[ge,e("tbody",null,[e("tr",null,[e("td",be,[e("a",pe,[i("LENGTH"),l(n)])]),he]),e("tr",null,[e("td",_e,[e("a",ye,[i("CONCAT"),l(n)])]),fe]),e("tr",null,[e("td",Ee,[e("a",qe,[i("INSERT"),l(n)])]),xe]),e("tr",null,[e("td",Te,[e("a",Re,[i("LOWER"),l(n)])]),Ne]),e("tr",null,[e("td",Ae,[e("a",Ie,[i("UPPER"),l(n)])]),Se]),e("tr",null,[e("td",Le,[e("a",Oe,[i("LEFT"),l(n)])]),ke]),e("tr",null,[e("td",Ce,[e("a",ze,[i("RIGHT"),l(n)])]),Me]),e("tr",null,[e("td",Fe,[e("a",we,[i("TRIM"),l(n)])]),De]),e("tr",null,[e("td",Ue,[e("a",Be,[i("REPLACE"),l(n)])]),je]),e("tr",null,[e("td",Pe,[e("a",Ye,[i("SUBSTRING"),l(n)])]),He]),e("tr",null,[e("td",Ve,[e("a",Ge,[i("REVERSE"),l(n)])]),We])])]),Ke,e("table",null,[Xe,e("tbody",null,[e("tr",null,[e("td",Je,[e("a",Qe,[i("CURDATE 和 CURRENT_DATE"),l(n)])]),Ze]),e("tr",null,[e("td",$e,[e("a",ei,[i("CURTIME 和 CURRENT_TIME"),l(n)])]),ii]),e("tr",null,[e("td",ni,[e("a",li,[i("NOW 和 SYSDATE"),l(n)])]),ai]),e("tr",null,[e("td",si,[e("a",di,[i("UNIX_TIMESTAMP"),l(n)])]),ti]),e("tr",null,[e("td",ri,[e("a",ci,[i("FROM_UNIXTIME"),l(n)])]),mi]),e("tr",null,[e("td",oi,[e("a",vi,[i("MONTH"),l(n)])]),ui]),e("tr",null,[e("td",gi,[e("a",bi,[i("MONTHNAME"),l(n)])]),pi]),e("tr",null,[e("td",hi,[e("a",_i,[i("DAYNAME"),l(n)])]),yi]),e("tr",null,[e("td",fi,[e("a",Ei,[i("DAYOFWEEK"),l(n)])]),qi]),e("tr",null,[e("td",xi,[e("a",Ti,[i("WEEK"),l(n)])]),Ri]),e("tr",null,[e("td",Ni,[e("a",Ai,[i("DAYOFYEAR"),l(n)])]),Ii]),e("tr",null,[e("td",Si,[e("a",Li,[i("DAYOFMONTH"),l(n)])]),Oi]),e("tr",null,[e("td",ki,[e("a",Ci,[i("YEAR"),l(n)])]),zi]),e("tr",null,[e("td",Mi,[e("a",Fi,[i("TIME_TO_SEC"),l(n)])]),wi]),e("tr",null,[e("td",Di,[e("a",Ui,[i("SEC_TO_TIME"),l(n)])]),Bi]),e("tr",null,[e("td",ji,[e("a",Pi,[i("DATE_ADD 和 ADDDATE"),l(n)])]),Yi]),e("tr",null,[e("td",Hi,[e("a",Vi,[i("DATE_SUB 和 SUBDATE"),l(n)])]),Gi]),e("tr",null,[e("td",Wi,[e("a",Ki,[i("ADDTIME"),l(n)])]),Xi]),e("tr",null,[e("td",Ji,[e("a",Qi,[i("SUBTIME"),l(n)])]),Zi]),e("tr",null,[e("td",$i,[e("a",en,[i("DATEDIFF"),l(n)])]),nn]),e("tr",null,[e("td",ln,[e("a",an,[i("DATE_FORMAT"),l(n)])]),sn]),e("tr",null,[e("td",dn,[e("a",tn,[i("WEEKDAY"),l(n)])]),rn])])]),cn,e("table",null,[mn,e("tbody",null,[e("tr",null,[e("td",on,[e("a",vn,[i("MAX"),l(n)])]),un]),e("tr",null,[e("td",gn,[e("a",bn,[i("MIN"),l(n)])]),pn]),e("tr",null,[e("td",hn,[e("a",_n,[i("COUNT"),l(n)])]),yn]),e("tr",null,[e("td",fn,[e("a",En,[i("SUM"),l(n)])]),qn]),e("tr",null,[e("td",xn,[e("a",Tn,[i("AVG"),l(n)])]),Rn])])]),Nn,e("table",null,[An,e("tbody",null,[e("tr",null,[e("td",In,[e("a",Sn,[i("IF(expr1,expr2,expr3)"),l(n)])]),Ln]),e("tr",null,[e("td",On,[e("a",kn,[i("IFNULL"),l(n)]),i("（expr1,expr2）")]),Cn]),e("tr",null,[e("td",zn,[e("a",Mn,[i("CASE"),l(n)])]),Fn])])]),wn,Dn,e("p",null,[e("a",Un,[i("高频 SQL 50 题（基础版） - 学习计划 - 力扣（LeetCode）全球极客挚爱的技术成长平台"),l(n)])])])}const Vn=s(c,[["render",Bn],["__file","1.MySQL.html.vue"]]);export{Vn as default};
