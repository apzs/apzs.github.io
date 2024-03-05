# Mybatis源码分析

阅读源码时，特别留意一下四大对象

- `Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)`
- `ParameterHandler (getParameterObject, setParameters)`
- `ResultSetHandler (handleResultSets, handleOutputParameters)`
- `StatementHandler (prepare, parameterize, batch, update, query)`

## 准备工作

- 在MySQL数据库创建一数据库实例`learnmybatis`，在其创建一张表

```sql
CREATE TABLE employee(
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	last_name VARCHAR(255),
	gender CHAR(1),
	email VARCHAR(255)
);
```

再插进一条随意数据，用于测试

- 创建Maven工程，添加依赖

**pom.xml**

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.1</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>6.0.6</version>
</dependency>
```


- 创建对应的JavaBean

**Employee.java**

```java
package com.atguigu.boot.entry;

public class Employee {
	
	private Integer id;
	private String lastName;
	private String email;
	private String gender;

	//getter and setter and toString()
}
```

- 创建mybatis配置文件，sql映射文件
  - MyBatis 的全局配置文件包含了影响 MyBatis 行为甚深的设置（ settings）和属性（ properties）信息、如数据库连接池信息等。指导着MyBatis进行工作。我们可以参照官方文件的配置示例。
  - 映射文件的作用就相当于是定义Dao接口的实现类如何工作。这也是**我们使用MyBatis时编写的最多的文件**。

mybatis全局配置文件

**mybatis-config.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
 PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
 "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<environments default="development">
		<environment id="development">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.cj.jdbc.Driver" />
				<property name="url" value="jdbc:mysql://localhost:3306/learnmybatis?useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=CTT" />
				<property name="username" value="root" />
				<property name="password" value="root" />
			</dataSource>
		</environment>
	</environments>
	<!-- 将我们写好的sql映射文件（EmployeeMapper.xml）一定要注册到全局配置文件（mybatis-config.xml）中 -->
	<mappers>
		<mapper resource="mapper/EmployeeMapper.xml" />
	</mappers>
</configuration>
```

- 创建一个Dao接口

**EmployeeMapper.java**

```java
package com.atguigu.boot.mapper;

import com.atguigu.boot.entry.Employee;

public interface EmployeeMapper {
	
	public Employee getEmpById(Integer id);

}
```

- 添加Mapper文件（命名空间，id，returnType）

**EmployeeMapper.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
 PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
 "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.lun.c01.helloworld.dao.EmployeeMapper">
<!-- 
namespace:名称空间;指定为接口的全类名
id：唯一标识
resultType：返回值类型
#{id}：从传递过来的参数中取出id值

public Employee getEmpById(Integer id);
 -->
	<select id="getEmpById" resultType="com.lun.c01.helloworld.bean.Employee">
		select id,last_name lastName,email,gender from employee where id = #{id}
	</select>
</mapper>
```

- 测试

**HelloWorldTest.java**

```java
@Test
public void test() throws IOException {

    // 获取sqlSession实例，能直接执行已经映射的sql语句
    // sql的唯一标识：statement Unique identifier matching the statement to use.
    // 执行sql要用的参数：parameter A parameter object to pass to the statement.
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession openSession = sqlSessionFactory.openSession();
    try {
        EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
        Employee employee = mapper.getEmpById(1);
        System.out.println(employee);
    } finally {
        openSession.close();
    }
}
```

## 读取xml文件

首先创建`SqlSessionFactoryBuilder`对象，调用`build(inputStream)`方法

```java
@Test
public void test() throws IOException {

    // 2、获取sqlSession实例，能直接执行已经映射的sql语句
    // sql的唯一标识：statement Unique identifier matching the statement to use.
    // 执行sql要用的参数：parameter A parameter object to pass to the statement.
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession openSession = sqlSessionFactory.openSession();
    try {
        EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
        Employee employee = mapper.getEmpById(1);
        System.out.println(employee);
    } finally {
        openSession.close();
    }
}
```

![image-20221112111836983](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112111836983.png)

然后调用三个参数的`build`方法

```java
public SqlSessionFactory build(InputStream inputStream) {
  return build(inputStream, null, null);
}
```

![image-20221112111941494](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112111941494.png)

然后创建`XMLConfigBuilder`对象

```java
public SqlSessionFactory build(InputStream inputStream, String environment, Properties properties) {
  try {
    XMLConfigBuilder parser = new XMLConfigBuilder(inputStream, environment, properties);
    return build(parser.parse());
  } catch (Exception e) {
    throw ExceptionFactory.wrapException("Error building SqlSession.", e);
  } finally {
    ErrorContext.instance().reset();
    try {
      inputStream.close();
    } catch (IOException e) {
      // Intentionally ignore. Prefer previous error.
    }
  }
}
```

![image-20221112112608096](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112112608096.png)

这个构造方法会调用`XMLConfigBuilder(XPathParser parser, String environment, Properties props)`构造方法，根据`inputStream`创建`new XPathParser(inputStream, true, props, new XMLMapperEntityResolver())`，保存到类型为`XPathParser`的`parser`中

```java
public XMLConfigBuilder(InputStream inputStream, String environment, Properties props) {
  this(new XPathParser(inputStream, true, props, new XMLMapperEntityResolver()), environment, props);
}

private XMLConfigBuilder(XPathParser parser, String environment, Properties props) {
  super(new Configuration());
  ErrorContext.instance().resource("SQL Mapper Configuration");
  this.configuration.setVariables(props);
  this.parsed = false;
  this.environment = environment;
  this.parser = parser;
}
```

![image-20221112113305947](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112113305947.png)

创建完`XMLConfigBuilder`对象后，调用`parser.parse()`方法

![image-20221112112135388](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112112135388.png)

然后调用`parser.evalNode("/configuration")`解析`mybatis-config.xml`，这个`/configuration`就是`mybatis-config.xml`文件的根标签`<configuration> </configuration>`，拿到根节点后调用` parseConfiguration(XNode root)`解析根节点

```java
public Configuration parse() {
  if (parsed) {
    throw new BuilderException("Each XMLConfigBuilder can only be used once.");
  }
  parsed = true;
  parseConfiguration(parser.evalNode("/configuration"));
  return configuration;
}
```

![image-20221112112315992](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112112315992.png)

`parseConfiguration(XNode root)`方法会获取根标签`<configuration>`下面的子标签，比如`<settings>`、`<typeAliases>`、`<plugins>`、`<environments>`、`<mappers>`等，把`<settings>`里的数据封装为一个`Properties`对象，然后调用`settingsElement(settings);`

```java
private void parseConfiguration(XNode root) {
  try {
    // issue #117 read properties first
    propertiesElement(root.evalNode("properties"));
    Properties settings = settingsAsProperties(root.evalNode("settings"));
    loadCustomVfs(settings);
    loadCustomLogImpl(settings);
    typeAliasesElement(root.evalNode("typeAliases"));
    pluginElement(root.evalNode("plugins"));
    objectFactoryElement(root.evalNode("objectFactory"));
    objectWrapperFactoryElement(root.evalNode("objectWrapperFactory"));
    reflectorFactoryElement(root.evalNode("reflectorFactory"));
    settingsElement(settings);
    // read it after objectFactory and objectWrapperFactory issue #631
    environmentsElement(root.evalNode("environments"));
    databaseIdProviderElement(root.evalNode("databaseIdProvider"));
    typeHandlerElement(root.evalNode("typeHandlers"));
    mapperElement(root.evalNode("mappers"));
  } catch (Exception e) {
    throw new BuilderException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
  }
}
```

![image-20221112114115058](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112114115058.png)

然后设置一些默认的设置信息

```java
private void settingsElement(Properties props) {
  configuration.setAutoMappingBehavior(AutoMappingBehavior.valueOf(props.getProperty("autoMappingBehavior", "PARTIAL")));
  configuration.setAutoMappingUnknownColumnBehavior(AutoMappingUnknownColumnBehavior.valueOf(props.getProperty("autoMappingUnknownColumnBehavior", "NONE")));
  // 开启缓存
  configuration.setCacheEnabled(booleanValueOf(props.getProperty("cacheEnabled"), true));
  // 代理工厂
  configuration.setProxyFactory((ProxyFactory) createInstance(props.getProperty("proxyFactory")));
  // 全局启用或禁用懒加载。当禁用时，所有关联对象都会即时加载
  configuration.setLazyLoadingEnabled(booleanValueOf(props.getProperty("lazyLoadingEnabled"), false));
  // 当启用时，有延迟加载属性的对象在被调用时将会完全加载任意属性
  configuration.setAggressiveLazyLoading(booleanValueOf(props.getProperty("aggressiveLazyLoading"), false));
  configuration.setMultipleResultSetsEnabled(booleanValueOf(props.getProperty("multipleResultSetsEnabled"), true));
  configuration.setUseColumnLabel(booleanValueOf(props.getProperty("useColumnLabel"), true));
  configuration.setUseGeneratedKeys(booleanValueOf(props.getProperty("useGeneratedKeys"), false));
  configuration.setDefaultExecutorType(ExecutorType.valueOf(props.getProperty("defaultExecutorType", "SIMPLE")));
  configuration.setDefaultStatementTimeout(integerValueOf(props.getProperty("defaultStatementTimeout"), null));
  configuration.setDefaultFetchSize(integerValueOf(props.getProperty("defaultFetchSize"), null));
  configuration.setDefaultResultSetType(resolveResultSetType(props.getProperty("defaultResultSetType")));
  configuration.setMapUnderscoreToCamelCase(booleanValueOf(props.getProperty("mapUnderscoreToCamelCase"), false));
  configuration.setSafeRowBoundsEnabled(booleanValueOf(props.getProperty("safeRowBoundsEnabled"), false));
  configuration.setLocalCacheScope(LocalCacheScope.valueOf(props.getProperty("localCacheScope", "SESSION")));
  configuration.setJdbcTypeForNull(JdbcType.valueOf(props.getProperty("jdbcTypeForNull", "OTHER")));
  configuration.setLazyLoadTriggerMethods(stringSetValueOf(props.getProperty("lazyLoadTriggerMethods"), "equals,clone,hashCode,toString"));
  configuration.setSafeResultHandlerEnabled(booleanValueOf(props.getProperty("safeResultHandlerEnabled"), true));
  configuration.setDefaultScriptingLanguage(resolveClass(props.getProperty("defaultScriptingLanguage")));
  configuration.setDefaultEnumTypeHandler(resolveClass(props.getProperty("defaultEnumTypeHandler")));
  configuration.setCallSettersOnNulls(booleanValueOf(props.getProperty("callSettersOnNulls"), false));
  configuration.setUseActualParamName(booleanValueOf(props.getProperty("useActualParamName"), true));
  configuration.setReturnInstanceForEmptyRow(booleanValueOf(props.getProperty("returnInstanceForEmptyRow"), false));
  configuration.setLogPrefix(props.getProperty("logPrefix"));
  configuration.setConfigurationFactory(resolveClass(props.getProperty("configurationFactory")));
  configuration.setShrinkWhitespacesInSql(booleanValueOf(props.getProperty("shrinkWhitespacesInSql"), false));
  configuration.setDefaultSqlProviderType(resolveClass(props.getProperty("defaultSqlProviderType")));
}
```

![image-20221112150348869](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112150348869.png)

然后再解析`mappers`信息

![image-20221112150619747](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112150619747.png)

解析`<mappers>`标签

```java
private void mapperElement(XNode parent) throws Exception {
  if (parent != null) {
    for (XNode child : parent.getChildren()) {
      if ("package".equals(child.getName())) {
        //  <package name="org.mybatis.builder"/>
        String mapperPackage = child.getStringAttribute("name");
        configuration.addMappers(mapperPackage);
      } else {
        // <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
        String resource = child.getStringAttribute("resource");
        // <mapper url="file:///var/mappers/AuthorMapper.xml"/>
        String url = child.getStringAttribute("url");
        // <mapper class="org.mybatis.builder.AuthorMapper"/>
        String mapperClass = child.getStringAttribute("class");
        if (resource != null && url == null && mapperClass == null) {
          ErrorContext.instance().resource(resource);
          // 拿到resource里设置的sql映射文件的流
          InputStream inputStream = Resources.getResourceAsStream(resource);
          // 创建 XMLMapperBuilder 
          XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
          // 解析mapper
          mapperParser.parse();
        } else if (resource == null && url != null && mapperClass == null) {
          ErrorContext.instance().resource(url);
          InputStream inputStream = Resources.getUrlAsStream(url);
          XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, url, configuration.getSqlFragments());
          mapperParser.parse();
        } else if (resource == null && url == null && mapperClass != null) {
          Class<?> mapperInterface = Resources.classForName(mapperClass);
          configuration.addMapper(mapperInterface);
        } else {
          throw new BuilderException("A mapper element may only specify a url, resource or class, but not more than one.");
        }
      }
    }
  }
}
```

![image-20221112152052903](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112152052903.png)

拿到`<mapper>`根标签

```java
public void parse() {
  if (!configuration.isResourceLoaded(resource)) {
    configurationElement(parser.evalNode("/mapper"));
    configuration.addLoadedResource(resource);
    bindMapperForNamespace();
  }

  parsePendingResultMaps();
  parsePendingCacheRefs();
  parsePendingStatements();
}
```

![image-20221112152252643](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112152252643.png)

解析`<mapper>`根标签里的配置

```java
private void configurationElement(XNode context) {
  try {
    // 拿到namespace的值
    String namespace = context.getStringAttribute("namespace");
    if (namespace == null || namespace.isEmpty()) {
      throw new BuilderException("Mapper's namespace cannot be empty");
    }
    builderAssistant.setCurrentNamespace(namespace);
     // 如果写了 cache-ref 标签，则做缓存处理
    cacheRefElement(context.evalNode("cache-ref"));
    // 如果写了 cache 标签，则做缓存处理
    cacheElement(context.evalNode("cache"));
    // 如果写了 parameterMap 标签
    parameterMapElement(context.evalNodes("/mapper/parameterMap"));
    // 如果写了 resultMap 标签
    resultMapElements(context.evalNodes("/mapper/resultMap"));
    // 如果写了 sql 标签
    sqlElement(context.evalNodes("/mapper/sql"));
    // 解析 增删查改 对应的标签
    buildStatementFromContext(context.evalNodes("select|insert|update|delete"));
  } catch (Exception e) {
    throw new BuilderException("Error parsing Mapper XML. The XML location is '" + resource + "'. Cause: " + e, e);
  }
}
```

![image-20221112153021923](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112153021923.png)

调用`buildStatementFromContext(list, null);`方法继续进行解析

```java
private void buildStatementFromContext(List<XNode> list) {
  if (configuration.getDatabaseId() != null) {
    buildStatementFromContext(list, configuration.getDatabaseId());
  }
  buildStatementFromContext(list, null);
}
```

![image-20221112153214006](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112153214006.png)

然后创建能解析增删查改标签的`XMLStatementBuilder`，调用其`parseStatementNode()`方法

```java
private void buildStatementFromContext(List<XNode> list, String requiredDatabaseId) {
  for (XNode context : list) {
    final XMLStatementBuilder statementParser = new XMLStatementBuilder(configuration, builderAssistant, context, requiredDatabaseId);
    try {
      statementParser.parseStatementNode();
    } catch (IncompleteElementException e) {
      configuration.addIncompleteStatement(statementParser);
    }
  }
}
```

![image-20221112153613979](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112153613979.png)

解析这个`增/删/查/改`标签的所有属性，然后调用` builderAssistant`的`addMappedStatement`方法

```java
public void parseStatementNode() {
  String id = context.getStringAttribute("id");
  String databaseId = context.getStringAttribute("databaseId");

  if (!databaseIdMatchesCurrent(id, databaseId, this.requiredDatabaseId)) {
    return;
  }

  String nodeName = context.getNode().getNodeName();
  SqlCommandType sqlCommandType = SqlCommandType.valueOf(nodeName.toUpperCase(Locale.ENGLISH));
  boolean isSelect = sqlCommandType == SqlCommandType.SELECT;
  boolean flushCache = context.getBooleanAttribute("flushCache", !isSelect);
  boolean useCache = context.getBooleanAttribute("useCache", isSelect);
  boolean resultOrdered = context.getBooleanAttribute("resultOrdered", false);

  // Include Fragments before parsing
  XMLIncludeTransformer includeParser = new XMLIncludeTransformer(configuration, builderAssistant);
  includeParser.applyIncludes(context.getNode());

  String parameterType = context.getStringAttribute("parameterType");
  Class<?> parameterTypeClass = resolveClass(parameterType);

  String lang = context.getStringAttribute("lang");
  LanguageDriver langDriver = getLanguageDriver(lang);

  // Parse selectKey after includes and remove them.
  processSelectKeyNodes(id, parameterTypeClass, langDriver);

  // Parse the SQL (pre: <selectKey> and <include> were parsed and removed)
  KeyGenerator keyGenerator;
  String keyStatementId = id + SelectKeyGenerator.SELECT_KEY_SUFFIX;
  keyStatementId = builderAssistant.applyCurrentNamespace(keyStatementId, true);
  if (configuration.hasKeyGenerator(keyStatementId)) {
    keyGenerator = configuration.getKeyGenerator(keyStatementId);
  } else {
    keyGenerator = context.getBooleanAttribute("useGeneratedKeys",
        configuration.isUseGeneratedKeys() && SqlCommandType.INSERT.equals(sqlCommandType))
        ? Jdbc3KeyGenerator.INSTANCE : NoKeyGenerator.INSTANCE;
  }

  SqlSource sqlSource = langDriver.createSqlSource(configuration, context, parameterTypeClass);
  StatementType statementType = StatementType.valueOf(context.getStringAttribute("statementType", StatementType.PREPARED.toString()));
  Integer fetchSize = context.getIntAttribute("fetchSize");
  Integer timeout = context.getIntAttribute("timeout");
  String parameterMap = context.getStringAttribute("parameterMap");
  String resultType = context.getStringAttribute("resultType");
  Class<?> resultTypeClass = resolveClass(resultType);
  String resultMap = context.getStringAttribute("resultMap");
  String resultSetType = context.getStringAttribute("resultSetType");
  ResultSetType resultSetTypeEnum = resolveResultSetType(resultSetType);
  if (resultSetTypeEnum == null) {
    resultSetTypeEnum = configuration.getDefaultResultSetType();
  }
  String keyProperty = context.getStringAttribute("keyProperty");
  String keyColumn = context.getStringAttribute("keyColumn");
  String resultSets = context.getStringAttribute("resultSets");

  builderAssistant.addMappedStatement(id, sqlSource, statementType, sqlCommandType,
      fetchSize, timeout, parameterMap, parameterTypeClass, resultMap, resultTypeClass,
      resultSetTypeEnum, flushCache, useCache, resultOrdered,
      keyGenerator, keyProperty, keyColumn, databaseId, langDriver, resultSets);
}
```

![image-20221112154110103](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112154110103.png)



这个方法返回一个`MappedStatement`，每一个`MappedStatement`就代表着一个增删改查标签

```java
public MappedStatement addMappedStatement(
    String id,
    SqlSource sqlSource,
    StatementType statementType,
    SqlCommandType sqlCommandType,
    Integer fetchSize,
    Integer timeout,
    String parameterMap,
    Class<?> parameterType,
    String resultMap,
    Class<?> resultType,
    ResultSetType resultSetType,
    boolean flushCache,
    boolean useCache,
    boolean resultOrdered,
    KeyGenerator keyGenerator,
    String keyProperty,
    String keyColumn,
    String databaseId,
    LanguageDriver lang,
    String resultSets) {

  if (unresolvedCacheRef) {
    throw new IncompleteElementException("Cache-ref not yet resolved");
  }

  id = applyCurrentNamespace(id, false);
  boolean isSelect = sqlCommandType == SqlCommandType.SELECT;

  MappedStatement.Builder statementBuilder = new MappedStatement.Builder(configuration, id, sqlSource, sqlCommandType)
      .resource(resource)
      .fetchSize(fetchSize)
      .timeout(timeout)
      .statementType(statementType)
      .keyGenerator(keyGenerator)
      .keyProperty(keyProperty)
      .keyColumn(keyColumn)
      .databaseId(databaseId)
      .lang(lang)
      .resultOrdered(resultOrdered)
      .resultSets(resultSets)
      .resultMaps(getStatementResultMaps(resultMap, resultType, id))
      .resultSetType(resultSetType)
      .flushCacheRequired(valueOrDefault(flushCache, !isSelect))
      .useCache(valueOrDefault(useCache, isSelect))
      .cache(currentCache);

  ParameterMap statementParameterMap = getStatementParameterMap(parameterMap, parameterType, id);
  if (statementParameterMap != null) {
    statementBuilder.parameterMap(statementParameterMap);
  }

  MappedStatement statement = statementBuilder.build();
  // 将解析到的信息添加到configuration (configuration里包含了解析所有标签的信息)
  configuration.addMappedStatement(statement);
  return statement;
}
```

![image-20221112155026041](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112155026041.png)

这些都解析完了后会返回一个`configuration`

![image-20221112155735377](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112155735377.png)

这个`configuration`包含前面解析到的所有信息

![image-20221112155648206](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112155648206.png)

将配置文件的信息解析好后，封装成`Configuration`，然后调用本类的`build(Configuration config)`方法

![image-20221112161945973](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112161945973.png)

该`build(Configuration config)`方法返回一个`DefaultSqlSessionFactory`对象

```java
public SqlSessionFactory build(Configuration config) {
  return new DefaultSqlSessionFactory(config);
}
```

![image-20221112162150972](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112162150972.png)

至此，`new SqlSessionFactoryBuilder().build(inputStream)`已处理完毕

## 开启会话

接下来看`sqlSessionFactory.openSession()`

```java
public void test() throws IOException {

    // 2、获取sqlSession实例，能直接执行已经映射的sql语句
    // sql的唯一标识：statement Unique identifier matching the statement to use.
    // 执行sql要用的参数：parameter A parameter object to pass to the statement.
    String resource = "mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    SqlSession openSession = sqlSessionFactory.openSession();
    try {
        EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
        Employee employee = mapper.getEmpById(1);
        System.out.println(employee);
    } finally {
        openSession.close();
    }
}
```

![image-20221112162751574](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112162751574.png)

`openSession()`方法调用`openSessionFromDataSource(configuration.getDefaultExecutorType(), null, false)`，从数据源中开启一个会话，其中`configuration.getDefaultExecutorType()`获取一个普通的执行器。

> [defaultExecutorType](https://mybatis.org/mybatis-3/zh/configuration.html#%E8%AE%BE%E7%BD%AE%EF%BC%88settings%EF%BC%89)：配置默认的执行器。SIMPLE 就是普通的执行器；REUSE 执行器会重用预处理语句（PreparedStatement）； BATCH 执行器不仅重用语句还会执行批量更新。
> 有效值：`SIMPLE` `REUSE` `BATCH`  
> 默认值：`SIMPLE`

![image-20221112163932718](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112163932718.png)

```java
public SqlSession openSession() {
  return openSessionFromDataSource(configuration.getDefaultExecutorType(), null, false);
}
```

![image-20221112162906719](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112162906719.png)

从数据源中开启一个会话

```java
private SqlSession openSessionFromDataSource(ExecutorType execType, TransactionIsolationLevel level, boolean autoCommit) {
  Transaction tx = null;
  try {
    // 获取当前环境
    final Environment environment = configuration.getEnvironment();
    // 根据当前环境获取事务工厂
    final TransactionFactory transactionFactory = getTransactionFactoryFromEnvironment(environment);
    tx = transactionFactory.newTransaction(environment.getDataSource(), level, autoCommit);
    // 创建一个Executor
    final Executor executor = configuration.newExecutor(tx, execType);
    return new DefaultSqlSession(configuration, executor, autoCommit);
  } catch (Exception e) {
    closeTransaction(tx); // may have fetched a connection so lets call close()
    throw ExceptionFactory.wrapException("Error opening session.  Cause: " + e, e);
  } finally {
    ErrorContext.instance().reset();
  }
}
```

![image-20221112164505764](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112164505764.png)

根据配置的`Executor`类型，创建相应的`Executor`

```java
public Executor newExecutor(Transaction transaction, ExecutorType executorType) {
  executorType = executorType == null ? defaultExecutorType : executorType;
  executorType = executorType == null ? ExecutorType.SIMPLE : executorType;
  Executor executor;
  if (ExecutorType.BATCH == executorType) {
    executor = new BatchExecutor(this, transaction);
  } else if (ExecutorType.REUSE == executorType) {
    executor = new ReuseExecutor(this, transaction);
  } else {
    executor = new SimpleExecutor(this, transaction);
  }
  // 判断是否开启了二级缓存
  if (cacheEnabled) {
    executor = new CachingExecutor(executor);
  }
  executor = (Executor) interceptorChain.pluginAll(executor);
  return executor;
}
```

![image-20221112203259187](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112203259187.png)

注意：这个`Executor`是`org.apache.ibatis.executor.Executor`而不是`java.util.concurrent.Executor`，并不是`jdk`原生的线程池，而是定义的增删改查方法的`Executor`接口

![image-20221112204229047](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112204229047.png)

判断是否开启了二级缓存

![image-20221112204424664](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112204424664.png)

如果开启了二级缓存，就将该`Executor`包装一下，添加一些额外的功能并调用原来的方法。即在不改变现有对象结构的情况下，动态地给该对象增加一些职责，很明显用的是装饰者模式。

```java
public class CachingExecutor implements Executor {

  private final Executor delegate;
  private final TransactionalCacheManager tcm = new TransactionalCacheManager();
  ...
  @Override
  public boolean isClosed() {
    return delegate.isClosed();
  }

  @Override
  public int update(MappedStatement ms, Object parameterObject) throws SQLException {
    flushCacheIfRequired(ms);
    return delegate.update(ms, parameterObject);
  }
  // `RowBounds`是做逻辑分页的
  @Override
  public <E> Cursor<E> queryCursor(MappedStatement ms, Object parameter, RowBounds rowBounds) throws SQLException {
    flushCacheIfRequired(ms);
    return delegate.queryCursor(ms, parameter, rowBounds);
  }
    
  ...

  @Override
  public void clearLocalCache() {
    delegate.clearLocalCache();
  }

  private void flushCacheIfRequired(MappedStatement ms) {
    Cache cache = ms.getCache();
    if (cache != null && ms.isFlushCacheRequired()) {
      tcm.clear(cache);
    }
  }
  ...
}
```

![image-20221112204654057](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112204654057.png)

![image-20221112204851169](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112204851169.png)

![image-20221112205605085](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112205605085.png)

然后调用`interceptorChain` (拦截器链) 的`pluginAll(executor)`方法

![image-20221112205913182](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112205913182.png)

该方法会调用每个`interceptor`的`plugin(target)`方法

```java
public Object pluginAll(Object target) {
  for (Interceptor interceptor : interceptors) {
    target = interceptor.plugin(target);
  }
  return target;
}
```

![image-20221112210041892](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112210041892.png)

然后创建`DefaultSqlSession`，传入`configuration`（解析`xml`文件后保存数据的对象）、`executor`(刚刚创建的封装了增删查改的接口)、`autoCommit` (是否自动提交)

![image-20221112210259818](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112210259818.png)

这个`sqlSessionFactory.openSession()`方法执行完后会返回一个`DefaultSqlSession`

## 获取mapper代理对象

我们可以调用其`getMapper(Class<T> type)`方法

![image-20221112211025918](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112211025918.png)

`DefaultSqlSession`类的`getMapper(Class<T> type)`方法会调用`configuration.getMapper(type, this)`方法

```java
@Override
public <T> T getMapper(Class<T> type) {
  return configuration.getMapper(type, this);
}
```

![image-20221112211219641](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112211219641.png)

`configuration.getMapper(type, this)`方法调用`mapperRegistry.getMapper(type, sqlSession)`方法（这个`mapperRegistry`是`Configuration`类的字段，里面保存了每个`Mapper`的代理对象）

```java
public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
  return mapperRegistry.getMapper(type, sqlSession);
}
```

![image-20221112211339258](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112211339258.png)

从`knownMappers`里获取传入的`Mapper`

```java
public class MapperRegistry {

  private final Configuration config;
  private final Map<Class<?>, MapperProxyFactory<?>> knownMappers = new HashMap<>();

  public MapperRegistry(Configuration config) {
    this.config = config;
  }

  @SuppressWarnings("unchecked")
  public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
    // 从knownMappers里获取传入的Mapper
    final MapperProxyFactory<T> mapperProxyFactory = (MapperProxyFactory<T>) knownMappers.get(type);
    if (mapperProxyFactory == null) {
      throw new BindingException("Type " + type + " is not known to the MapperRegistry.");
    }
    try {
      // 调用Mapper代理对象的newInstance方法，创建对象
      return mapperProxyFactory.newInstance(sqlSession);
    } catch (Exception e) {
      throw new BindingException("Error getting mapper instance. Cause: " + e, e);
    }
  }
  ...
}
```

![image-20221112212650511](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112212650511.png)

`newInstance`方法首先根据`sqlSession` 、`mapperInterface`(原始的Mapper接口)、`methodCache`创建`Mapper`代理，然后调用本类的`newInstance(mapperProxy)`方法

```java
public T newInstance(SqlSession sqlSession) {
  final MapperProxy<T> mapperProxy = new MapperProxy<>(sqlSession, mapperInterface, methodCache);
  return newInstance(mapperProxy);
}
```

![image-20221112214236459](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112214236459.png)

`newInstance(mapperProxy)`方法调用`newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)`方法，这个方法就是`jdk`动态代理的方法

```java
@SuppressWarnings("unchecked")
protected T newInstance(MapperProxy<T> mapperProxy) {
  return (T) Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[] { mapperInterface }, mapperProxy);
}
```

![image-20221112214355194](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112214355194.png)

前面创建的`MapperProxy`实现了`java.lang.reflect.InvocationHandler`类

![image-20221112214618348](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112214618348.png)

`java.lang.reflect.Proxy`类的`newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)`方法就需要一个`InvocationHandler`

![image-20221112214723696](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112214723696.png)

此时`openSession.getMapper(EmployeeMapper.class)`就执行结束了

## 调用mapper方法

接下来查看`mapper.getEmpById(1)`是怎么查到数据的

![image-20221112215618245](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112215618245.png)

由于这里的`mapper`是`InvocationHandler`的代理对象`MapperProxy`，所以调用`mapper.getEmpById(1)`方法首先会执行代理对象的`invoke(Object proxy, Method method, Object[] args)`方法

```java
@Override
public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
  try {
    // 判断这个方法是不是Object的方法（接口里的方法有可能是自己的方法，有可能是继承Object类的方法）
    if (Object.class.equals(method.getDeclaringClass())) {
      // 如果是Object类的方法直接执行该方法 (比如toString()、hashCode()等)
      return method.invoke(this, args);
    } else {
      // 首先调用cachedInvoker(method)，获取一个MapperMethodInvoker,然后调用其invoke方法
      return cachedInvoker(method).invoke(proxy, method, args, sqlSession);
    }
  } catch (Throwable t) {
    throw ExceptionUtil.unwrapThrowable(t);
  }
}

private MapperMethodInvoker cachedInvoker(Method method) throws Throwable {
    ...
}
```

![image-20221112221446015](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112221446015.png)

然后调用`mapperMethod.execute(sqlSession, args)`方法

```java
@Override
public Object invoke(Object proxy, Method method, Object[] args, SqlSession sqlSession) throws Throwable {
  return mapperMethod.execute(sqlSession, args);
}
```

![image-20221112221129544](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112221129544.png)

执行`execute`方法判断这次调用方法的类型，进行响应的操作

```java
public Object execute(SqlSession sqlSession, Object[] args) {
  Object result;
  // 调用command.getType()方法，判断当前是INSERT、UPDATE、DELETE、SELECT中的哪一个
  switch (command.getType()) {
    case INSERT: {
      Object param = method.convertArgsToSqlCommandParam(args);
      result = rowCountResult(sqlSession.insert(command.getName(), param));
      break;
    }
    case UPDATE: {
      Object param = method.convertArgsToSqlCommandParam(args);
      result = rowCountResult(sqlSession.update(command.getName(), param));
      break;
    }
    case DELETE: {
      Object param = method.convertArgsToSqlCommandParam(args);
      result = rowCountResult(sqlSession.delete(command.getName(), param));
      break;
    }
    case SELECT:
      if (method.returnsVoid() && method.hasResultHandler()) {
        executeWithResultHandler(sqlSession, args);
        result = null;
      } else if (method.returnsMany()) {
        result = executeForMany(sqlSession, args);
      } else if (method.returnsMap()) {
        result = executeForMap(sqlSession, args);
      } else if (method.returnsCursor()) {
        result = executeForCursor(sqlSession, args);
      } else {
        // 先把我们的参数转换成能用的参数
        Object param = method.convertArgsToSqlCommandParam(args);
        result = sqlSession.selectOne(command.getName(), param);
        if (method.returnsOptional()
            && (result == null || !method.getReturnType().equals(result.getClass()))) {
          result = Optional.ofNullable(result);
        }
      }
      break;
    case FLUSH:
      result = sqlSession.flushStatements();
      break;
    default:
      throw new BindingException("Unknown execution method for: " + command.getName());
  }
  if (result == null && method.getReturnType().isPrimitive() && !method.returnsVoid()) {
    throw new BindingException("Mapper method '" + command.getName()
        + " attempted to return null from a method with a primitive return type (" + method.getReturnType() + ").");
  }
  return result;
}
```

![image-20221112221834306](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112221834306.png)

`method.convertArgsToSqlCommandParam(args)`先把我们的参数转换成能用的参数，其调用`paramNameResolver.getNamedParams(args)`方法

```java
public Object convertArgsToSqlCommandParam(Object[] args) {
  return paramNameResolver.getNamedParams(args);
}
```

![image-20221112222805405](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112222805405.png)

如果参数为`null`直接返回`null`，如果参数是一个转换成需要的类型进行返回，如果参数是多个封装成一个`Map<String, Object>`进行返回

```java
public Object getNamedParams(Object[] args) {
  final int paramCount = names.size();
  if (args == null || paramCount == 0) {
    // 如果参数为`null`直接返回`null`
    return null;
  } else if (!hasParamAnnotation && paramCount == 1) {
    // 如果参数是一个，转换成需要的类型进行返回
    Object value = args[names.firstKey()];
    return wrapToMapIfCollection(value, useActualParamName ? names.get(0) : null);
  } else {
    // 如果参数是多个封装成一个`Map<String, Object>`进行返回
    final Map<String, Object> param = new ParamMap<>();
    int i = 0;
    for (Map.Entry<Integer, String> entry : names.entrySet()) {
      param.put(entry.getValue(), args[entry.getKey()]);
      // add generic param names (param1, param2, ...)
      final String genericParamName = GENERIC_NAME_PREFIX + (i + 1);
      // ensure not to overwrite parameter named with @Param
      if (!names.containsValue(genericParamName)) {
        param.put(genericParamName, args[entry.getKey()]);
      }
      i++;
    }
    return param;
  }
}
```

![image-20221112223031491](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112223031491.png)

我们的这个例子`if`和`else if`都没走，直接进行返回

```java
public static Object wrapToMapIfCollection(Object object, String actualParamName) {
  // 如果 object 是集合
  if (object instanceof Collection) {
    ParamMap<Object> map = new ParamMap<>();
    // 先将 object 放到key为collection的map中
    map.put("collection", object);
    // 如果object还是列表，再将 object 放到key为list的map中
    if (object instanceof List) {
      map.put("list", object);
    }
    // 如果 actualParamName 不为空，再将 object 放到key为actualParamName的map中
    Optional.ofNullable(actualParamName).ifPresent(name -> map.put(name, object));
    return map;
  } else if (object != null && object.getClass().isArray()) {
    ParamMap<Object> map = new ParamMap<>();
    // 如果 object 不为空,不是集合,是数组时，先将 object 放到key为array的map中
    map.put("array", object);
    // 如果 actualParamName 不为空，再将 object 放到key为actualParamName的map中
    Optional.ofNullable(actualParamName).ifPresent(name -> map.put(name, object));
    return map;
  }
  return object;
}
```

![image-20221112223517163](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112223517163.png)

接下来调用`sqlSession`的`selectOne(command.getName(), param)`方法

![image-20221112223714636](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112223714636.png)

可以看到即使是`sqlSession.selectOne(command.getName(), param)`还是调用的是` this.selectList(statement, parameter)`方法，然后获取返回结果中的第一个

```java
@Override
public <T> T selectOne(String statement, Object parameter) {
  // Popular vote was to return null on 0 results and throw exception on too many.
  List<T> list = this.selectList(statement, parameter);
  if (list.size() == 1) {
    return list.get(0);
  } else if (list.size() > 1) {
    throw new TooManyResultsException("Expected one result (or null) to be returned by selectOne(), but found: " + list.size());
  } else {
    return null;
  }
}
```

![image-20221112223942844](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112223942844.png)

这个` this.selectList(statement, parameter)`调用三个参数的`selectList`，`RowBounds.DEFAULT`使用默认的逻辑分页

```java
@Override
public <E> List<E> selectList(String statement, Object parameter) {
  return this.selectList(statement, parameter, RowBounds.DEFAULT);
}
```

![image-20221112224121062](https://gitlab.com/apzs/image/-/raw/master/image/image-20221112224121062.png)



```java
@Override
public <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds) {
  try {
    // 根据statement从configuration中获取MappedStatement  (MappedStatement里封装了增删查改等信息)
    MappedStatement ms = configuration.getMappedStatement(statement);
    return executor.query(ms, wrapCollection(parameter), rowBounds, Executor.NO_RESULT_HANDLER);
  } catch (Exception e) {
    throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
  } finally {
    ErrorContext.instance().reset();
  }
}
```

![image-20221113104809402](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113104809402.png)

然后调用`wrapCollection(parameter)`方法，再调用`executor.query(...)`方法，执行`sql`

![image-20221113105216668](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113105216668.png)

`wrapCollection(final Object object)`方法调用`ParamNameResolver.wrapToMapIfCollection(object, null)`方法

```java
private Object wrapCollection(final Object object) {
  return ParamNameResolver.wrapToMapIfCollection(object, null);
}
```

![image-20221113105307146](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113105307146.png)

再次进到前面所说的 **`if`和`else if`都没走，直接进行返回** 的那个方法，这次还是`if`和`else if`都没走，直接进行返回

```java
public static Object wrapToMapIfCollection(Object object, String actualParamName) {
  if (object instanceof Collection) {
    ParamMap<Object> map = new ParamMap<>();
    map.put("collection", object);
    if (object instanceof List) {
      map.put("list", object);
    }
    Optional.ofNullable(actualParamName).ifPresent(name -> map.put(name, object));
    return map;
  } else if (object != null && object.getClass().isArray()) {
    ParamMap<Object> map = new ParamMap<>();
    map.put("array", object);
    Optional.ofNullable(actualParamName).ifPresent(name -> map.put(name, object));
    return map;
  }
  return object;
}
```

![image-20221113105445813](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113105445813.png)

`executor.query(...)`方法首先从`MappedStatement`中获取一个绑定的`sql`，然后创建缓存，然后调用query进行查询

```java
@Override
public <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler) throws SQLException {
  // 从 MappedStatement 中获取一个绑定的sql，代表着sql的详细信息 
  // (BoundSql是MappedStatement类的SqlSource字段的getBoundSql(Object parameterObject)方法的返回值)
  BoundSql boundSql = ms.getBoundSql(parameterObject);
  // 创建一个缓存 （保存了`方法id+sql+参数`等信息）
  CacheKey key = createCacheKey(ms, parameterObject, rowBounds, boundSql);
  // 调用query进行查询
  return query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
}
```

![image-20221113111708888](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113111708888.png)

![image-20221113115042722](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113115042722.png)

```java
public interface SqlSource {

  BoundSql getBoundSql(Object parameterObject);

}
```

![image-20221113115128752](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113115128752.png)

由于我们在`MappedStatement`里没有缓存，所以直接调用`delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql)`进行查询

```java
@Override
public <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql)
    throws SQLException {
  // 从二级缓存(MappedStatement)中获取缓存
  Cache cache = ms.getCache();
  if (cache != null) {
    flushCacheIfRequired(ms);
    if (ms.isUseCache() && resultHandler == null) {
      ensureNoOutParams(ms, boundSql);
      @SuppressWarnings("unchecked")
      List<E> list = (List<E>) tcm.getObject(cache, key);
      if (list == null) {
        list = delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
        tcm.putObject(cache, key, list); // issue #578 and #116
      }
      return list;
    }
  }
  return delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
}
```

![image-20221113112100519](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113112100519.png)

先从一级缓存中拿数据，如果没有就调用`queryFromDatabase`方法查数据

```java
@SuppressWarnings("unchecked")
@Override
public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {
  ErrorContext.instance().resource(ms.getResource()).activity("executing a query").object(ms.getId());
  if (closed) {
    throw new ExecutorException("Executor was closed.");
  }
  if (queryStack == 0 && ms.isFlushCacheRequired()) {
    clearLocalCache();
  }
  List<E> list;
  try {
    queryStack++;
    // 从一级缓存中获取数据，由于是第一次查询，所以缓存中没有数据
    list = resultHandler == null ? (List<E>) localCache.getObject(key) : null;
    if (list != null) {
      handleLocallyCachedOutputParameters(ms, key, parameter, boundSql);
    } else {
      list = queryFromDatabase(ms, parameter, rowBounds, resultHandler, key, boundSql);
    }
  } finally {
    queryStack--;
  }
  if (queryStack == 0) {
    for (DeferredLoad deferredLoad : deferredLoads) {
      deferredLoad.load();
    }
    // issue #601
    deferredLoads.clear();
    if (configuration.getLocalCacheScope() == LocalCacheScope.STATEMENT) {
      // issue #482
      clearLocalCache();
    }
  }
  return list;
}
```

![image-20221113112816908](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113112816908.png)



```java
private <E> List<E> queryFromDatabase(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {
  List<E> list;
  // 先在localCache一级缓存的当前key中保存一个值为"EXECUTION_PLACEHOLDER"的占位符
  localCache.putObject(key, EXECUTION_PLACEHOLDER);
  try {
    // 进行查询
    list = doQuery(ms, parameter, rowBounds, resultHandler, boundSql);
  } finally {
    // 移除当前key
    localCache.removeObject(key);
  }
  // 将当前key和查询结果的值放入localCache一级缓存中
  localCache.putObject(key, list);
  if (ms.getStatementType() == StatementType.CALLABLE) {
    localOutputParameterCache.putObject(key, parameter);
  }
  return list;
}
```

![image-20221113114444183](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113114444183.png)



```java
@Override
public <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) throws SQLException {
  // 原生的 java.sql.Statement
  Statement stmt = null;
  try {
    Configuration configuration = ms.getConfiguration();
    // 先创建一个 StatementHandler
    StatementHandler handler = configuration.newStatementHandler(wrapper, ms, parameter, rowBounds, resultHandler, boundSql);
    stmt = prepareStatement(handler, ms.getStatementLog());
    return handler.query(stmt, resultHandler);
  } finally {
    closeStatement(stmt);
  }
}
```

![image-20221113120000625](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113120000625.png)

首先创建`RoutingStatementHandler`对象

```java
public StatementHandler newStatementHandler(Executor executor, MappedStatement mappedStatement, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
  StatementHandler statementHandler = new RoutingStatementHandler(executor, mappedStatement, parameterObject, rowBounds, resultHandler, boundSql);
  statementHandler = (StatementHandler) interceptorChain.pluginAll(statementHandler);
  return statementHandler;
}
```

![image-20221113120117666](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113120117666.png)

`RoutingStatementHandler`的构造方法根据`ms.getStatementType()`创建不同类型的对象 （工厂方法模式）

```java
<select id="selectPerson" parameterType="int" parameterMap="deprecated" resultType="hashmap"                   resultMap="personResultMap" flushCache="false" useCache="true" timeout="10"  fetchSize="256"
  statementType="PREPARED"
  resultSetType="FORWARD_ONLY">
```

这个获取到的`statementType`是`<select>`标签的属性，[可选 STATEMENT，PREPARED 或 CALLABLE。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED。](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#select-1)

![image-20221113145718679](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113145718679.png)

```java
public RoutingStatementHandler(Executor executor, MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {

  switch (ms.getStatementType()) {
    case STATEMENT:
      delegate = new SimpleStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
      break;
    case PREPARED:
      delegate = new PreparedStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
      break;
    case CALLABLE:
      delegate = new CallableStatementHandler(executor, ms, parameter, rowBounds, resultHandler, boundSql);
      break;
    default:
      throw new ExecutorException("Unknown statement type: " + ms.getStatementType());
  }

}
```

![image-20221113120445610](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113120445610.png)

创建`PreparedStatementHandler`会调用父类的构造方法

```java
public PreparedStatementHandler(Executor executor, MappedStatement mappedStatement, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
  super(executor, mappedStatement, parameter, rowBounds, resultHandler, boundSql);
}
```

![image-20221113152028184](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113152028184.png)

在这里面会封装各种信息

```java
protected BaseStatementHandler(Executor executor, MappedStatement mappedStatement, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
  this.configuration = mappedStatement.getConfiguration();
  this.executor = executor;
  this.mappedStatement = mappedStatement;
  this.rowBounds = rowBounds;

  this.typeHandlerRegistry = configuration.getTypeHandlerRegistry();
  this.objectFactory = configuration.getObjectFactory();

  if (boundSql == null) { // issue #435, get the key before calculating the statement
    generateKeys(parameterObject);
    boundSql = mappedStatement.getBoundSql(parameterObject);
  }

  this.boundSql = boundSql;

  this.parameterHandler = configuration.newParameterHandler(mappedStatement, parameterObject, boundSql);
  this.resultSetHandler = configuration.newResultSetHandler(executor, mappedStatement, rowBounds, parameterHandler, resultHandler, boundSql);
}
```

![image-20221113152539492](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113152539492.png)

这个`ParameterHandler`的创建也是熟悉的流程，先创建`ParameterHandler`然后再调用拦截器链的`pluginAll(parameterHandler)`

```java
public ParameterHandler newParameterHandler(MappedStatement mappedStatement, Object parameterObject, BoundSql boundSql) {
  ParameterHandler parameterHandler = mappedStatement.getLang().createParameterHandler(mappedStatement, parameterObject, boundSql);
  parameterHandler = (ParameterHandler) interceptorChain.pluginAll(parameterHandler);
  return parameterHandler;
}
```

![image-20221113152644717](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113152644717.png)

该方法就是遍历所有`interceptor`，调用其`plugin(target)`方法

```java
public Object pluginAll(Object target) {
  for (Interceptor interceptor : interceptors) {
    target = interceptor.plugin(target);
  }
  return target;
}
```

![image-20221113152858458](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113152858458.png)

`RoutingStatementHandler`创建完后，还是熟悉的流程，再次执行`interceptorChain`的`pluginAll(statementHandler)`方法

```java
public StatementHandler newStatementHandler(Executor executor, MappedStatement mappedStatement, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) {
  StatementHandler statementHandler = new RoutingStatementHandler(executor, mappedStatement, parameterObject, rowBounds, resultHandler, boundSql);
  statementHandler = (StatementHandler) interceptorChain.pluginAll(statementHandler);
  return statementHandler;
}
```

![image-20221113150139010](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113150139010.png)

该方法就是遍历所有`interceptor`，调用其`plugin(target)`方法

```java
public Object pluginAll(Object target) {
  for (Interceptor interceptor : interceptors) {
    target = interceptor.plugin(target);
  }
  return target;
}
```

![image-20221113150249200](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113150249200.png)

然后调用`prepareStatement(handler, ms.getStatementLog())`方法，返回原生的`java.sql.Statement`对象

![image-20221113150446692](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113150446692.png)



```java
private Statement prepareStatement(StatementHandler handler, Log statementLog) throws SQLException {
  Statement stmt;
  // 获取连接
  Connection connection = getConnection(statementLog);
  // // 预编译sql
  stmt = handler.prepare(connection, transaction.getTimeout());
  // 参数预编译
  handler.parameterize(stmt);
  return stmt;
}
```

![image-20221113151101167](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113151101167.png)

这个`Connection`接口就是原生的`java.sql.Connection`

```java
protected Connection getConnection(Log statementLog) throws SQLException {
  Connection connection = transaction.getConnection();
  if (statementLog.isDebugEnabled()) {
    return ConnectionLogger.newInstance(connection, statementLog, queryStack);
  } else {
    return connection;
  }
}
```

![image-20221113151212260](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113151212260.png)

这个`handler.parameterize(stmt);`就是对参数进行预编译

![image-20221113151424260](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113151424260.png)

其会调用`delegate.parameterize(statement);`方法

```
@Override
public void parameterize(Statement statement) throws SQLException {
  delegate.parameterize(statement);
}
```

![image-20221113151524548](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113151524548.png)

`parameterize(Statement statement)`方法会调用` parameterHandler.setParameters((PreparedStatement) statement)`，`parameterHandler`是创建`PreparedStatementHandler`对象时封装的

```
@Override
public void parameterize(Statement statement) throws SQLException {
  parameterHandler.setParameters((PreparedStatement) statement);
}
```

![image-20221113151621230](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113151621230.png)

这里面会调用`TypeHandler`预编译参数

```java
@Override
public void setParameters(PreparedStatement ps) {
  ErrorContext.instance().activity("setting parameters").object(mappedStatement.getParameterMap().getId());
  List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
  if (parameterMappings != null) {
    for (int i = 0; i < parameterMappings.size(); i++) {
      ParameterMapping parameterMapping = parameterMappings.get(i);
      if (parameterMapping.getMode() != ParameterMode.OUT) {
        Object value;
        String propertyName = parameterMapping.getProperty();
        if (boundSql.hasAdditionalParameter(propertyName)) { // issue #448 ask first for additional params
          value = boundSql.getAdditionalParameter(propertyName);
        } else if (parameterObject == null) {
          value = null;
        } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
          value = parameterObject;
        } else {
          MetaObject metaObject = configuration.newMetaObject(parameterObject);
          value = metaObject.getValue(propertyName);
        }
        TypeHandler typeHandler = parameterMapping.getTypeHandler();
        JdbcType jdbcType = parameterMapping.getJdbcType();
        if (value == null && jdbcType == null) {
          jdbcType = configuration.getJdbcTypeForNull();
        }
        try {
          typeHandler.setParameter(ps, i + 1, value, jdbcType);
        } catch (TypeException | SQLException e) {
          throw new TypeException("Could not set parameters for mapping: " + parameterMapping + ". Cause: " + e, e);
        }
      }
    }
  }
```

![image-20221113153515411](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113153515411.png)

预编译完参数后，调用`handler.query(stmt, resultHandler)`查询数据

```java
@Override
public <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) throws SQLException {
  Statement stmt = null;
  try {
    Configuration configuration = ms.getConfiguration();
    StatementHandler handler = configuration.newStatementHandler(wrapper, ms, parameter, rowBounds, resultHandler, boundSql);
    stmt = prepareStatement(handler, ms.getStatementLog());
    return handler.query(stmt, resultHandler);
  } finally {
    closeStatement(stmt);
  }
}
```

![image-20221113153643842](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113153643842.png)

调用`delegate.query(statement, resultHandler)`查询结果

```java
@Override
public <E> List<E> query(Statement statement, ResultHandler resultHandler) throws SQLException {
  return delegate.query(statement, resultHandler);
}
```

![image-20221113154035676](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113154035676.png)



```java
@Override
public <E> List<E> query(Statement statement, ResultHandler resultHandler) throws SQLException {
  // 这个PreparedStatement为原生的 java.sql.PreparedStatement 接口
  PreparedStatement ps = (PreparedStatement) statement;
  // 执行方法
  ps.execute();
  // 处理返回结果
  return resultSetHandler.handleResultSets(ps);
}
```

![image-20221113154538736](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113154538736.png)



![image-20221113154542837](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113154542837.png)

再进入就是`com.mysql.cj.jdbc.ClientPreparedStatement`的`execute()`方法了，数据库厂商的代码就不看了

![image-20221113154723457](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113154723457.png)

查询完后，调用`resultSetHandler.handleResultSets(ps)`处理返回结果（`parameterHandler`和`resultSetHandler`都是在创建`PreparedStatementHandler`对象时创建的）

![image-20221113154913586](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113154913586.png)

调用`handleResultSets(Statement stmt)`处理返回结果

```java
@Override
public List<Object> handleResultSets(Statement stmt) throws SQLException {
  ErrorContext.instance().activity("handling results").object(mappedStatement.getId());

  final List<Object> multipleResults = new ArrayList<>();

  int resultSetCount = 0;
  ResultSetWrapper rsw = getFirstResultSet(stmt);

  List<ResultMap> resultMaps = mappedStatement.getResultMaps();
  int resultMapCount = resultMaps.size();
  validateResultMapsCount(rsw, resultMapCount);
  while (rsw != null && resultMapCount > resultSetCount) {
    ResultMap resultMap = resultMaps.get(resultSetCount);
    handleResultSet(rsw, resultMap, multipleResults, null);
    rsw = getNextResultSet(stmt);
    cleanUpAfterHandlingResultSet();
    resultSetCount++;
  }

  String[] resultSets = mappedStatement.getResultSets();
  if (resultSets != null) {
    while (rsw != null && resultSetCount < resultSets.length) {
      ResultMapping parentMapping = nextResultMaps.get(resultSets[resultSetCount]);
      if (parentMapping != null) {
        String nestedResultMapId = parentMapping.getNestedResultMapId();
        ResultMap resultMap = configuration.getResultMap(nestedResultMapId);
        handleResultSet(rsw, resultMap, null, parentMapping);
      }
      rsw = getNextResultSet(stmt);
      cleanUpAfterHandlingResultSet();
      resultSetCount++;
    }
  }

  return collapseSingleResultList(multipleResults);
}
```

![image-20221113161151514](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113161151514.png)



```java
private void handleResultSet(ResultSetWrapper rsw, ResultMap resultMap, List<Object> multipleResults, ResultMapping parentMapping) throws SQLException {
  try {
    if (parentMapping != null) {
      handleRowValues(rsw, resultMap, null, RowBounds.DEFAULT, parentMapping);
    } else {
      if (resultHandler == null) {
        DefaultResultHandler defaultResultHandler = new DefaultResultHandler(objectFactory);
        handleRowValues(rsw, resultMap, defaultResultHandler, rowBounds, null);
        multipleResults.add(defaultResultHandler.getResultList());
      } else {
        handleRowValues(rsw, resultMap, resultHandler, rowBounds, null);
      }
    }
  } finally {
    // issue #228 (close resultsets)
    closeResultSet(rsw.getResultSet());
  }
}
```

![image-20221113161559207](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113161559207.png)



```java
public void handleRowValues(ResultSetWrapper rsw, ResultMap resultMap, ResultHandler<?> resultHandler, RowBounds rowBounds, ResultMapping parentMapping) throws SQLException {
  if (resultMap.hasNestedResultMaps()) {
    ensureNoRowBounds();
    checkResultHandler();
    handleRowValuesForNestedResultMap(rsw, resultMap, resultHandler, rowBounds, parentMapping);
  } else {
    handleRowValuesForSimpleResultMap(rsw, resultMap, resultHandler, rowBounds, parentMapping);
  }
}
```

![image-20221113162704669](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113162704669.png)



```java
private void handleRowValuesForSimpleResultMap(ResultSetWrapper rsw, ResultMap resultMap, ResultHandler<?> resultHandler, RowBounds rowBounds, ResultMapping parentMapping)
    throws SQLException {
  DefaultResultContext<Object> resultContext = new DefaultResultContext<>();
  ResultSet resultSet = rsw.getResultSet();
  skipRows(resultSet, rowBounds);
  while (shouldProcessMoreRows(resultContext, rowBounds) && !resultSet.isClosed() && resultSet.next()) {
    ResultMap discriminatedResultMap = resolveDiscriminatedResultMap(resultSet, resultMap, null);
    Object rowValue = getRowValue(rsw, discriminatedResultMap, null);
    storeObject(resultHandler, resultContext, rowValue, parentMapping, resultSet);
  }
}
```

![image-20221113162737099](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113162737099.png)



```java
private Object getRowValue(ResultSetWrapper rsw, ResultMap resultMap, String columnPrefix) throws SQLException {
  final ResultLoaderMap lazyLoader = new ResultLoaderMap();
  Object rowValue = createResultObject(rsw, resultMap, lazyLoader, columnPrefix);
  if (rowValue != null && !hasTypeHandlerForResultObject(rsw, resultMap.getType())) {
    final MetaObject metaObject = configuration.newMetaObject(rowValue);
    boolean foundValues = this.useConstructorMappings;
    if (shouldApplyAutomaticMappings(resultMap, false)) {
      foundValues = applyAutomaticMappings(rsw, resultMap, metaObject, columnPrefix) || foundValues;
    }
    foundValues = applyPropertyMappings(rsw, resultMap, metaObject, lazyLoader, columnPrefix) || foundValues;
    foundValues = lazyLoader.size() > 0 || foundValues;
    rowValue = foundValues || configuration.isReturnInstanceForEmptyRow() ? rowValue : null;
  }
  return rowValue;
}
```

![image-20221113162929949](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113162929949.png)

调用`createAutomaticMappings(rsw, resultMap, metaObject, columnPrefix)`方法

```java
private boolean applyAutomaticMappings(ResultSetWrapper rsw, ResultMap resultMap, MetaObject metaObject, String columnPrefix) throws SQLException {
  List<UnMappedColumnAutoMapping> autoMapping = createAutomaticMappings(rsw, resultMap, metaObject, columnPrefix);
  boolean foundValues = false;
  if (!autoMapping.isEmpty()) {
    for (UnMappedColumnAutoMapping mapping : autoMapping) {
      final Object value = mapping.typeHandler.getResult(rsw.getResultSet(), mapping.column);
      if (value != null) {
        foundValues = true;
      }
      if (value != null || (configuration.isCallSettersOnNulls() && !mapping.primitive)) {
        // gcode issue #377, call setter on nulls (value is not 'found')
        metaObject.setValue(mapping.property, value);
      }
    }
  }
  return foundValues;
}
```

![image-20221113163003965](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113163003965.png)

创建`typeHandler`处理数据

```java
private List<UnMappedColumnAutoMapping> createAutomaticMappings(ResultSetWrapper rsw, ResultMap resultMap, MetaObject metaObject, String columnPrefix) throws SQLException {
  final String mapKey = resultMap.getId() + ":" + columnPrefix;
  List<UnMappedColumnAutoMapping> autoMapping = autoMappingsCache.get(mapKey);
  if (autoMapping == null) {
    autoMapping = new ArrayList<>();
    final List<String> unmappedColumnNames = rsw.getUnmappedColumnNames(resultMap, columnPrefix);
    for (String columnName : unmappedColumnNames) {
      String propertyName = columnName;
      if (columnPrefix != null && !columnPrefix.isEmpty()) {
        // When columnPrefix is specified,
        // ignore columns without the prefix.
        if (columnName.toUpperCase(Locale.ENGLISH).startsWith(columnPrefix)) {
          propertyName = columnName.substring(columnPrefix.length());
        } else {
          continue;
        }
      }
      final String property = metaObject.findProperty(propertyName, configuration.isMapUnderscoreToCamelCase());
      if (property != null && metaObject.hasSetter(property)) {
        if (resultMap.getMappedProperties().contains(property)) {
          continue;
        }
        final Class<?> propertyType = metaObject.getSetterType(property);
        if (typeHandlerRegistry.hasTypeHandler(propertyType, rsw.getJdbcType(columnName))) {
          final TypeHandler<?> typeHandler = rsw.getTypeHandler(propertyType, columnName);
          autoMapping.add(new UnMappedColumnAutoMapping(columnName, property, typeHandler, propertyType.isPrimitive()));
        } else {
          configuration.getAutoMappingUnknownColumnBehavior()
              .doAction(mappedStatement, columnName, property, propertyType);
        }
      } else {
        configuration.getAutoMappingUnknownColumnBehavior()
            .doAction(mappedStatement, columnName, (property != null) ? property : propertyName, null);
      }
    }
    autoMappingsCache.put(mapKey, autoMapping);
  }
  return autoMapping;
}
```

![image-20221113163159480](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113163159480.png)

老师说会调用`getPropertyMappingValue`方法，使用`typeHandler`来处理结果（但是我调试的时候并没有）

```java
private Object getPropertyMappingValue(ResultSet rs, MetaObject metaResultObject, ResultMapping propertyMapping, ResultLoaderMap lazyLoader, String columnPrefix)
    throws SQLException {
  if (propertyMapping.getNestedQueryId() != null) {
    return getNestedQueryMappingValue(rs, metaResultObject, propertyMapping, lazyLoader, columnPrefix);
  } else if (propertyMapping.getResultSet() != null) {
    addPendingChildRelation(rs, metaResultObject, propertyMapping);   // TODO is that OK?
    return DEFERRED;
  } else {
    final TypeHandler<?> typeHandler = propertyMapping.getTypeHandler();
    final String column = prependPrefix(propertyMapping.getColumn(), columnPrefix);
    return typeHandler.getResult(rs, column);
  }
}
```

![image-20221113163453241](https://gitlab.com/apzs/image/-/raw/master/image/image-20221113163453241.png)

## 小结 ##

1. 根据配置文件（全局，sql映射）初始化出Configuration对象
2. 创建一个DefaultSqlSession对象，它里面包含Configuration以及Executor（根据全局配置文件中的defaultExecutorType创建出对应的Executor）
3. DefaultSqlSession.getMapper（）：拿到Mapper接口对应的MapperProxy；
4. MapperProxy里面有（DefaultSqlSession）；
5. 执行增删改查方法：
   1. 调用DefaultSqlSession的增删改查（Executor）；
   2. 会创建一个StatementHandler对象。同时也会创建出ParameterHandler和ResultSetHandler）
   3. 调用StatementHandler预编译参数以及设置参数值，使用ParameterHandler来给sql设置参数
   4. 调用StatementHandler的增删改查方法；
   5. ResultSetHandler封装结果

**注意**：四大对象(Executor、ParameterHandler、ResultSetHandler)每个创建的时候都有一个`interceptorChain.pluginAll(parameterHandler);`