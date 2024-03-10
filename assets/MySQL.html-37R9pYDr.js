const l=JSON.parse('{"key":"v-f69e3762","path":"/back-base/4.mysql/MySQL.html","title":"mysql","lang":"zh-CN","frontmatter":{"title":"mysql","icon":"gears","order":1,"category":["后端"],"tag":["java","后端","mysql"],"description":"基础篇 通用语法及分类 DDL: 数据定义语言，用来定义数据库对象（数据库、表、字段） DML: 数据操作语言，用来对数据库表中的数据进行增删改 DQL: 数据查询语言，用来查询数据库中表的记录 DCL: 数据控制语言，用来创建数据库用户、控制数据库的控制权限 DDL（数据定义语言） 数据库操作 创建数据库： CREATE DATABASE [ IF NOT EXISTS ] 数据库名 [ DEFAULT CHARSET 字符集] [COLLATE 排序规则 ];","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/back-base/4.mysql/MySQL.html"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:title","content":"mysql"}],["meta",{"property":"og:description","content":"基础篇 通用语法及分类 DDL: 数据定义语言，用来定义数据库对象（数据库、表、字段） DML: 数据操作语言，用来对数据库表中的数据进行增删改 DQL: 数据查询语言，用来查询数据库中表的记录 DCL: 数据控制语言，用来创建数据库用户、控制数据库的控制权限 DDL（数据定义语言） 数据库操作 创建数据库： CREATE DATABASE [ IF NOT EXISTS ] 数据库名 [ DEFAULT CHARSET 字符集] [COLLATE 排序规则 ];"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-10T05:52:06.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"后端"}],["meta",{"property":"article:tag","content":"mysql"}],["meta",{"property":"article:modified_time","content":"2024-03-10T05:52:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-10T05:52:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"通用语法及分类","slug":"通用语法及分类","link":"#通用语法及分类","children":[{"level":3,"title":"DDL（数据定义语言）","slug":"ddl-数据定义语言","link":"#ddl-数据定义语言","children":[]},{"level":3,"title":"DML（数据操作语言）","slug":"dml-数据操作语言","link":"#dml-数据操作语言","children":[]},{"level":3,"title":"DQL（数据查询语言）","slug":"dql-数据查询语言","link":"#dql-数据查询语言","children":[]},{"level":3,"title":"DCL","slug":"dcl","link":"#dcl","children":[]}]},{"level":2,"title":"函数","slug":"函数","link":"#函数","children":[{"level":3,"title":"字符串函数","slug":"字符串函数","link":"#字符串函数","children":[]},{"level":3,"title":"数值函数","slug":"数值函数","link":"#数值函数","children":[]},{"level":3,"title":"日期函数","slug":"日期函数","link":"#日期函数","children":[]},{"level":3,"title":"流程函数","slug":"流程函数","link":"#流程函数","children":[]}]},{"level":2,"title":"约束","slug":"约束","link":"#约束","children":[{"level":3,"title":"常用约束","slug":"常用约束","link":"#常用约束","children":[]},{"level":3,"title":"外键约束","slug":"外键约束","link":"#外键约束","children":[]}]},{"level":2,"title":"多表查询","slug":"多表查询","link":"#多表查询","children":[{"level":3,"title":"多表关系","slug":"多表关系","link":"#多表关系","children":[]},{"level":3,"title":"查询","slug":"查询","link":"#查询","children":[]},{"level":3,"title":"内连接查询","slug":"内连接查询","link":"#内连接查询","children":[]},{"level":3,"title":"外连接查询","slug":"外连接查询","link":"#外连接查询","children":[]},{"level":3,"title":"自连接查询","slug":"自连接查询","link":"#自连接查询","children":[]},{"level":3,"title":"联合查询 union, union all","slug":"联合查询-union-union-all","link":"#联合查询-union-union-all","children":[]},{"level":3,"title":"子查询","slug":"子查询","link":"#子查询","children":[]}]},{"level":2,"title":"事务","slug":"事务","link":"#事务","children":[{"level":3,"title":"四大特性ACID","slug":"四大特性acid","link":"#四大特性acid","children":[]},{"level":3,"title":"并发事务","slug":"并发事务","link":"#并发事务","children":[]}]},{"level":2,"title":"存储引擎","slug":"存储引擎","link":"#存储引擎","children":[{"level":3,"title":"InnoDB","slug":"innodb","link":"#innodb","children":[]},{"level":3,"title":"MyISAM","slug":"myisam","link":"#myisam","children":[]},{"level":3,"title":"Memory","slug":"memory","link":"#memory","children":[]},{"level":3,"title":"存储引擎特点","slug":"存储引擎特点","link":"#存储引擎特点","children":[]},{"level":3,"title":"存储引擎的选择","slug":"存储引擎的选择","link":"#存储引擎的选择","children":[]}]},{"level":2,"title":"性能分析","slug":"性能分析","link":"#性能分析","children":[{"level":3,"title":"查看执行频次","slug":"查看执行频次","link":"#查看执行频次","children":[]},{"level":3,"title":"慢查询日志","slug":"慢查询日志","link":"#慢查询日志","children":[]},{"level":3,"title":"profile","slug":"profile","link":"#profile","children":[]},{"level":3,"title":"explain","slug":"explain","link":"#explain","children":[]}]},{"level":2,"title":"索引","slug":"索引","link":"#索引","children":[{"level":3,"title":"索引结构","slug":"索引结构","link":"#索引结构","children":[]},{"level":3,"title":"索引分类","slug":"索引分类","link":"#索引分类","children":[]},{"level":3,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":3,"title":"使用规则","slug":"使用规则","link":"#使用规则","children":[]},{"level":3,"title":"设计原则","slug":"设计原则","link":"#设计原则","children":[]}]},{"level":2,"title":"SQL 优化","slug":"sql-优化","link":"#sql-优化","children":[{"level":3,"title":"插入数据","slug":"插入数据","link":"#插入数据","children":[]},{"level":3,"title":"主键优化","slug":"主键优化","link":"#主键优化","children":[]},{"level":3,"title":"order by优化","slug":"order-by优化","link":"#order-by优化","children":[]},{"level":3,"title":"group by优化","slug":"group-by优化","link":"#group-by优化","children":[]},{"level":3,"title":"limit优化","slug":"limit优化","link":"#limit优化","children":[]},{"level":3,"title":"count优化","slug":"count优化","link":"#count优化","children":[]},{"level":3,"title":"update优化（避免行锁升级为表锁）","slug":"update优化-避免行锁升级为表锁","link":"#update优化-避免行锁升级为表锁","children":[]}]},{"level":2,"title":"视图","slug":"视图","link":"#视图","children":[{"level":3,"title":"创建视图","slug":"创建视图","link":"#创建视图","children":[]},{"level":3,"title":"查询视图","slug":"查询视图","link":"#查询视图","children":[]},{"level":3,"title":"修改视图","slug":"修改视图","link":"#修改视图","children":[]},{"level":3,"title":"删除视图","slug":"删除视图","link":"#删除视图","children":[]},{"level":3,"title":"视图检查选项","slug":"视图检查选项","link":"#视图检查选项","children":[]},{"level":3,"title":"更新及作用","slug":"更新及作用","link":"#更新及作用","children":[]}]},{"level":2,"title":"存储过程","slug":"存储过程","link":"#存储过程","children":[{"level":3,"title":"创建","slug":"创建","link":"#创建","children":[]},{"level":3,"title":"调用","slug":"调用","link":"#调用","children":[]},{"level":3,"title":"查看","slug":"查看","link":"#查看","children":[]},{"level":3,"title":"删除","slug":"删除","link":"#删除","children":[]},{"level":3,"title":"游标","slug":"游标","link":"#游标","children":[]}]},{"level":2,"title":"触发器","slug":"触发器","link":"#触发器","children":[]},{"level":2,"title":"锁","slug":"锁","link":"#锁","children":[]},{"level":2,"title":"InnoDB 引擎","slug":"innodb-引擎","link":"#innodb-引擎","children":[{"level":3,"title":"逻辑存储结构","slug":"逻辑存储结构","link":"#逻辑存储结构","children":[]},{"level":3,"title":"架构","slug":"架构","link":"#架构","children":[]}]},{"level":2,"title":"事务原理","slug":"事务原理","link":"#事务原理","children":[]},{"level":2,"title":"MVCC","slug":"mvcc","link":"#mvcc","children":[{"level":3,"title":"当前读:","slug":"当前读","link":"#当前读","children":[]},{"level":3,"title":"快照读:","slug":"快照读","link":"#快照读","children":[]},{"level":3,"title":"MVCC:","slug":"mvcc-1","link":"#mvcc-1","children":[]}]},{"level":2,"title":"整型","slug":"整型","link":"#整型","children":[]},{"level":2,"title":"浮点型","slug":"浮点型","link":"#浮点型","children":[]},{"level":2,"title":"日期和时间","slug":"日期和时间","link":"#日期和时间","children":[]},{"level":2,"title":"字符串","slug":"字符串","link":"#字符串","children":[]},{"level":2,"title":"二进制类型","slug":"二进制类型","link":"#二进制类型","children":[]}],"git":{"createdTime":1709618715000,"updatedTime":1710049926000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":2}]},"readingTime":{"minutes":66.04,"words":19811},"filePathRelative":"back-base/4.mysql/MySQL.md","localizedDate":"2024年3月5日","excerpt":"<h1> 基础篇</h1>\\n<h2> 通用语法及分类</h2>\\n<ul>\\n<li>DDL: 数据定义语言，用来定义数据库对象（数据库、表、字段）</li>\\n<li>DML: 数据操作语言，用来对数据库表中的数据进行增删改</li>\\n<li>DQL: 数据查询语言，用来查询数据库中表的记录</li>\\n<li>DCL: 数据控制语言，用来创建数据库用户、控制数据库的控制权限</li>\\n</ul>\\n<h3> DDL（数据定义语言）</h3>\\n<h4> 数据库操作</h4>\\n<p>创建数据库：</p>\\n<div class=\\"language-mysql line-numbers-mode\\" data-ext=\\"mysql\\"><pre class=\\"language-mysql\\"><code>CREATE DATABASE [ IF NOT EXISTS ] 数据库名 [ DEFAULT CHARSET 字符集] [COLLATE 排序规则 ];\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{l as data};