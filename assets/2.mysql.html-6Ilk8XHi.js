import{_ as l}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as d,o as t,c as r,a as n,b as e,d as a,e as i}from"./app-YilgCgZO.js";const c={},m=n("h1",{id:"二、mysql相关",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#二、mysql相关","aria-hidden":"true"},"#"),e(" 二、MySQL相关")],-1),o={id:"_2-1、添加索引",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#_2-1、添加索引","aria-hidden":"true"},"#",-1),p={href:"https://blog.csdn.net/Yetao1996/article/details/124006405",target:"_blank",rel:"noopener noreferrer"},v=n("strong",null,"隐式创建",-1),b={href:"https://so.csdn.net/so/search?q=%E4%B8%BB%E9%94%AE%E7%BA%A6%E6%9D%9F&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},_=i(`<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#CREATE TABLE时隐式创建索引
 
CREATE TABLE dept(
dept_id INT PRIMARY KEY AUTO_INCREMENT,
dept_name VARCHAR(20)
);
 
CREATE TABLE emp(
emp_id INT PRIMARY KEY AUTO_INCREMENT,
emp_name VARCHAR(20) UNIQUE,
dept_id INT,
CONSTRAINT emp_dept_id_fk FOREIGN KEY(dept_id) REFERENCES dept(dept_id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code>SHOW INDEX FROM 表名</code>，来查看索引，如下：<img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6I2J6I6T5pGH5pGH5aW25piULQ==,size_20,color_FFFFFF,t_70,g_se,x_16.png" alt="" loading="lazy"></p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6I2J6I6T5pGH5pGH5aW25piULQ==,size_20,color_FFFFFF,t_70,g_se,x_16-167092054531470.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>显示创建：</strong></p><ul><li>创建普通索引</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建普通索引
CREATE TABLE book(
book_id INT,
book_name VARCHAR(100),
\`authors\` VARCHAR(100),
info VARCHAR(100),
\`comment\` VARCHAR(100),
year_publication YEAR,
#声明普通索引
INDEX idx_bname(book_name)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6I2J6I6T5pGH5pGH5aW25piULQ==,size_20,color_FFFFFF,t_70,g_se,x_16-167092054531471.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>创建唯一索引</li></ul><p>声明有唯一索引的字段，在添加数据时，要保证唯一性，但是可以添加NULL值。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建唯一索引
CREATE TABLE book1(
book_id INT,
book_name VARCHAR(100),
\`authors\` VARCHAR(100),
info VARCHAR(100),
\`comment\` VARCHAR(100),
year_publication YEAR,
UNIQUE INDEX uk_idx_cmt(\`comment\`)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6I2J6I6T5pGH5pGH5aW25piULQ==,size_20,color_FFFFFF,t_70,g_se,x_16-167092054531572.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>创建主键索引</li></ul><p>通过定义主键约束的方式定义主键索引，如上所示。<strong>不能</strong>类比以PRIMARY KEY INDEX方式创建。</p><ul><li>创建单列索引</li></ul><p>这个没必要再赘述，以上作用于单个字段索引的都可称之为单列索引。</p><ul><li>创建联合索引</li></ul><p>如下表，联合索引会以book_id, book_name, info的顺序进行排序，声明时顺序颠倒排序也会变，即遵循最左前缀原则。所以要把最常检索的字段放在最前面！</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建联合索引
CREATE TABLE book2(
book_id INT,
book_name VARCHAR(100),
\`authors\` VARCHAR(100),
info VARCHAR(100),
\`comment\` VARCHAR(100),
year_publication YEAR,
#声明普通索引
INDEX mulidx_bid_bname_info(book_id, book_name, info)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6I2J6I6T5pGH5pGH5aW25piULQ==,size_20,color_FFFFFF,t_70,g_se,x_16-167092054531573.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>创建全文索引</li></ul><p>值得说明的是，全文索引比LIKE + %的方式快N倍！但要注意版本支不支持！此外，如果需要全文索引的是大量数据，建议先添加数据，后创建索引。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>#创建全文索引
CREATE TABLE book3(
book_id INT,
book_name VARCHAR(100),
\`authors\` VARCHAR(100),
info VARCHAR(100),
\`comment\` VARCHAR(100),
year_publication YEAR,
FULLTEXT INDEX futxt_idx_info(info(50))
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6I2J6I6T5pGH5pGH5aW25piULQ==,size_20,color_FFFFFF,t_70,g_se,x_16-167092054531574.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>在表已经创建之后再添加索引</strong></p><ul><li>通过 ALTER TABLE 表名 ADD 索引 这种方式来添加索引</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE TABLE book4(
book_id INT,
book_name VARCHAR(100),
\`authors\` VARCHAR(100),
info VARCHAR(100),
\`comment\` VARCHAR(100),
year_publication YEAR,
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加普通索引</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE book4 ADD INDEX idx_cmt(\`comment\`); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加主键</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter  table 表名  add  primary key(字段列表);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加外键</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>alter  table  需要添加外键的表名  add  constraint  外键名 foreign  key(本表字段列表)  references  主表名(字段列表);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>通过 CREATE INDEX 索引 ON 表(列)</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CREATE INDEX idx_cmt ON book4(comment);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,34),g={id:"_2-2、每隔m行选择n个",tabindex:"-1"},h=n("a",{class:"header-anchor",href:"#_2-2、每隔m行选择n个","aria-hidden":"true"},"#",-1),k={href:"https://www.jb51.cc/faq/1150469.html",target:"_blank",rel:"noopener noreferrer"},y=i(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">select</span>  <span class="token operator">*</span>
<span class="token keyword">from</span>    <span class="token punctuation">(</span>
        <span class="token keyword">select</span>  <span class="token operator">*</span>
        <span class="token punctuation">,</span>       <span class="token variable">@rn</span> :<span class="token operator">=</span> <span class="token variable">@rn</span> <span class="token operator">+</span> <span class="token number">1</span> <span class="token keyword">as</span> rn
        <span class="token keyword">from</span>    Table1
        <span class="token keyword">join</span>    <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token variable">@rn</span> :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> i
        <span class="token punctuation">)</span> s
<span class="token keyword">where</span>   rn mod <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">-- Use = 1 for the other set</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),R={id:"_2-3、mysql每隔n分钟汇总",tabindex:"-1"},A=n("a",{class:"header-anchor",href:"#_2-3、mysql每隔n分钟汇总","aria-hidden":"true"},"#",-1),F={href:"https://blog.csdn.net/gry729924315/article/details/92676287?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-92676287-blog-123919856.pc_relevant_recovery_v2&spm=1001.2101.3001.4242.1&utm_relevant_index=3",target:"_blank",rel:"noopener noreferrer"},f=i(`<p>​ 前些日子，在做项目的时候遇到一个比较奇葩（其实就是不会）的查询，就是根据传入的时间查询条件，对返回的数据做一次汇总，可能是按照n分钟、n小时或者n天（具体怎么根据时间控制间隔，我这里就不说了）。下面进入真题。</p><p><strong>思路</strong></p><p>时间间隔类型可分为分钟、小时、天，根据不同的时间间隔类型，有如下规则(其中小时、天的原理与分钟基本一致）：</p><p>1）按分钟汇总。</p><p>取数据中时间字段的【分钟】计为m，计时间间隔span，则当前分钟的取数为： m/span*span（取整，再乘以倍数，用于消余数），然后两位左补0。然后拼接上前面的年、月、日、时，处理后的时间极为time</p><p>2）按小时汇总。</p><p>取数据中时间字段的【小时】计为h，计时间间隔span，则当前小时的取数为： h/span*span（取整，再乘以倍数，用于消余数），然后两位左补0。然后拼接上前面的年、月、日，处理后的时间极为time</p><p>2）按天汇总。</p><p>取数据中时间字段的【天】计为d，计时间间隔span，则当前小时的取数为： d/span*span+1（取整，再乘以倍数，用于消余数，<code>并加1，因为天是从01开始的</code>），然后两位左补0。然后拼接上前面的年、月，处理后的时间极为time</p><p>获取到格式处理后的时间，然后根据time进行聚合查询（group by time）</p><p><strong>举例1（日期字段为bigint类型，yyyyMMddHHmm格式）</strong></p><p>我们有一张分级日志表m_minute_metric_log，里面有个字段minute，格式为yyyyMMddHHmm的bigint类型字段，用于每分钟记录一条监控日志。</p><ul><li>按每7分钟汇总</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>CONCAT(
        SUBSTR(m.minute FROM 1 FOR 10),
        LPAD(floor(SUBSTR(m.minute FROM 11 FOR 2) / 7) * 7,2,&#39;0&#39;)
      )  time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>按每3小时汇总</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token operator">--</span> 按小时（每<span class="token number">3</span>小时汇总）
      <span class="token function">CONCAT</span><span class="token punctuation">(</span>
        <span class="token function">SUBSTR</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>minute <span class="token constant">FROM</span> <span class="token number">1</span> <span class="token class-name">FOR</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">LPAD</span><span class="token punctuation">(</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token function">SUBSTR</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>minute <span class="token constant">FROM</span> <span class="token number">9</span> <span class="token class-name">FOR</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">/</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token char">&#39;00&#39;</span>
      <span class="token punctuation">)</span> time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>按每3天汇总</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token operator">--</span> 按天（每<span class="token number">3</span>天汇总）
      <span class="token function">CONCAT</span><span class="token punctuation">(</span>
        <span class="token function">SUBSTR</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>minute <span class="token constant">FROM</span> <span class="token number">1</span> <span class="token class-name">FOR</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token function">LPAD</span><span class="token punctuation">(</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token function">SUBSTR</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>minute <span class="token constant">FROM</span> <span class="token number">7</span> <span class="token class-name">FOR</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token char">&#39;0000&#39;</span>
      <span class="token punctuation">)</span> time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bigint类型的yyyyMMddHHmm日期汇总完整SQL</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT
    IFNULL(SUM(m.pass),0) total,
    IFNULL(SUM(m.success),0) normal,
    IFNULL(SUM(m.fail),0) fail,
   -- 按分钟（每7分钟汇总）
      CONCAT(
        SUBSTR(m.minute FROM 1 FOR 10),
        LPAD(floor(SUBSTR(m.minute FROM 11 FOR 2) / 7) * 7,2,&#39;0&#39;)
      )  time
--     -- 按小时（每3小时汇总）
--       CONCAT(
--         SUBSTR(m.minute FROM 1 FOR 8),
--         LPAD(floor(SUBSTR(m.minute FROM 9 FOR 2) /3) * 3,2,&#39;0&#39;),
--           &#39;00&#39;
--       ) time
--     -- 按天（每3天汇总）
--       CONCAT(
--         SUBSTR(m.minute FROM 1 FOR 6),
--         LPAD(floor(SUBSTR(m.minute FROM 7 FOR 2) / 3) * 3 + 1,2,&#39;0&#39;),
--         &#39;0000&#39;
--       ) time
  FROM
    m_minute_metric_log m
  GROUP BY
    time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按分钟汇总查询结果展示</p><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dyeTcyOTkyNDMxNQ==,size_16,color_FFFFFF,t_70.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>举例2（日期字段为Date类型）</strong></p><ul><li><pre><code>Date类型的汇总完整SQL
</code></pre></li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SELECT
		IFNULL(sum(d.elapsed),0) elapsed,
		count(*) total,
-- 		-- 按3分钟 
-- 			CONCAT(
-- 				DATE_FORMAT(d.req_time, &#39;%Y%m%d%H&#39;),
-- 				LPAD(FLOOR(DATE_FORMAT(d.req_time, &#39;%i&#39;) /  3) *  3,2,&#39;0&#39;)
-- 			) time
-- 		-- 按3小时
			CONCAT(
				DATE_FORMAT(d.req_time, &#39;%Y%m%d&#39;),
				LPAD(FLOOR(DATE_FORMAT(d.req_time, &#39;%H&#39;) /  3) *  3,2,&#39;0&#39;),
				&#39;00&#39;
			) time
-- 		-- 按3天 
-- 			CONCAT(
-- 				DATE_FORMAT(d.req_time, &#39;%Y%m&#39;),
-- 				LPAD(FLOOR(DATE_FORMAT(d.req_time, &#39;%d&#39;) / 3) *  3 + 1,2,&#39;0&#39;),
-- 				&#39;0000&#39;
-- 			) time
  	FROM
  		m_external_rpc_detail d
    GROUP BY
		time
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><pre><code>按小时汇总查询结果展示
</code></pre></li></ul><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dyeTcyOTkyNDMxNQ==,size_16,color_FFFFFF,t_70-167091749970434.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,27),q={id:"_2-4、查看容量",tabindex:"-1"},T=n("a",{class:"header-anchor",href:"#_2-4、查看容量","aria-hidden":"true"},"#",-1),E={href:"https://blog.csdn.net/zhongbeida_xue/article/details/124682834",target:"_blank",rel:"noopener noreferrer"},x=i(`<h3 id="_1-查看所有数据库容量大小" tabindex="-1"><a class="header-anchor" href="#_1-查看所有数据库容量大小" aria-hidden="true">#</a> 1. 查看所有数据库容量大小</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select 
table_schema as &#39;数据库&#39;,
sum(table_rows) as &#39;记录数&#39;,
sum(truncate(data_length/1024/1024, 2)) as &#39;数据容量(MB)&#39;,
sum(truncate(index_length/1024/1024, 2)) as &#39;索引容量(MB)&#39;
from information_schema.tables
group by table_schema
order by sum(data_length) desc, sum(index_length) desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-查看所有数据库各表容量大小" tabindex="-1"><a class="header-anchor" href="#_2-查看所有数据库各表容量大小" aria-hidden="true">#</a> 2. 查看所有数据库各表容量大小</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select 
table_schema as &#39;数据库&#39;,
table_name as &#39;表名&#39;,
table_rows as &#39;记录数&#39;,
truncate(data_length/1024/1024, 2) as &#39;数据容量(MB)&#39;,
truncate(index_length/1024/1024, 2) as &#39;索引容量(MB)&#39;
from information_schema.tables
order by data_length desc, index_length desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-查看指定数据库容量大小" tabindex="-1"><a class="header-anchor" href="#_3-查看指定数据库容量大小" aria-hidden="true">#</a> 3. 查看指定数据库容量大小</h3><blockquote><p>例：查看mysql库容量大小</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select 
table_schema as &#39;数据库&#39;,
sum(table_rows) as &#39;记录数&#39;,
sum(truncate(data_length/1024/1024, 2)) as &#39;数据容量(MB)&#39;,
sum(truncate(index_length/1024/1024, 2)) as &#39;索引容量(MB)&#39;
from information_schema.tables
where table_schema=&#39;mysql&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdHRsZV9wZXJzb24=,size_16,color_FFFFFF,t_70.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_4-查看指定数据库各表容量大小" tabindex="-1"><a class="header-anchor" href="#_4-查看指定数据库各表容量大小" aria-hidden="true">#</a> 4. 查看指定数据库各表容量大小</h3><blockquote><p>例：查看mysql库各表容量大小</p></blockquote><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>select 
table_schema as &#39;数据库&#39;,
table_name as &#39;表名&#39;,
table_rows as &#39;记录数&#39;,
truncate(data_length/1024/1024, 2) as &#39;数据容量(MB)&#39;,
truncate(index_length/1024/1024, 2) as &#39;索引容量(MB)&#39;
from information_schema.tables
where table_schema=&#39;mysql&#39;
order by data_length desc, index_length desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/image/-/raw/master/image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xpdHRsZV9wZXJzb24=,size_16,color_FFFFFF,t_70-16709143575011.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-5、导出为sql" tabindex="-1"><a class="header-anchor" href="#_2-5、导出为sql" aria-hidden="true">#</a> 2.5、导出为sql</h2><p>1.导出sql文件 导出sql文件可以使用mysqldump。主要有如下几种操作： ①导出整个数据库（包括数据库中的数据）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -u username -ppassword dbname &gt; dbname.sql；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>②导出数据库中的数据表（包括数据表中的数据）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -u username -ppassword dbname tablename &gt; tablename.sql；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>③导出数据库结构（不包括数据，只有创建数据表语句）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -u username -ppassword -d dbname &gt; dbname.sql；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>④导出数据库中数据表的表结构（不包括数据，只有创建数据表语句）：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysqldump -u username -ppassword -d dbname tablename &gt; tablename.sql;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,21);function L(N,O){const s=d("ExternalLinkIcon");return t(),r("div",null,[m,n("h2",o,[u,e(" 2.1、"),n("a",p,[e("添加索引"),a(s)])]),n("p",null,[v,e("：使用CREATE TABLE创建表时，在声明有"),n("a",b,[e("主键约束"),a(s)]),e("、唯一性约束、外键约束的字段上，会自动的添加相关的索引。")]),_,n("h2",g,[h,e(" 2.2、"),n("a",k,[e("每隔m行选择n个"),a(s)])]),y,n("h2",R,[A,e(" 2.3、"),n("a",F,[e("MySQL每隔N分钟汇总"),a(s)])]),f,n("h2",q,[T,e(" 2.4、"),n("a",E,[e("查看容量"),a(s)])]),x])}const H=l(c,[["render",L],["__file","2.mysql.html.vue"]]);export{H as default};
