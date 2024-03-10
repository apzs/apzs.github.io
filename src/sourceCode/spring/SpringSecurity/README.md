## 认证

## 一

以往，我们使用继承`WebSecurityConfigurerAdapter`抽象接口的方式，修改自己的配置，但是至Spring Security5.7后，该方式就不被推荐了（注意将配置类加入至容器）

```java
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

    }

    @Override
    public void configure(WebSecurity web) throws Exception {

    }
}
```

![image-20230101141749370](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101141749370.png)

我们可以根据`WebSecurityConfigurerAdapter`抽象类的描述知道应该使用哪些Spring官方推荐的做法，根据描述我们可以使用`SecurityFilterChain`来配置`HttpSecurity`，使用`WebSecurityCustomizer`来配置`WebSecurity`

```java
/**
 * ...
 * @author Rob Winch
 * @see EnableWebSecurity
 * @deprecated Use a {@link org.springframework.security.web.SecurityFilterChain} Bean to
 * configure {@link HttpSecurity} or a {@link WebSecurityCustomizer} Bean to configure
 * {@link WebSecurity}. <pre>
 *     &#64;Bean
 *     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 *         http
 *             .authorizeHttpRequests((authz) ->
 *                 authz.anyRequest().authenticated()
 *             );
 *             // ...
 *         return http.build();
 *     }
 *
 *    &#64;Bean
 *    public WebSecurityCustomizer webSecurityCustomizer(WebSecurity web) {
 *        return (web) -> web.ignoring().antMatchers("/resources/**");
 *    }
 * </pre> See the <a href=
 * "https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter">Spring
 * Security without WebSecurityConfigurerAdapter</a> for more details.
 */
@Order(100)
@Deprecated
public abstract class WebSecurityConfigurerAdapter implements WebSecurityConfigurer<WebSecurity> {
    ...
}
```

![image-20230101142632262](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101142632262.png)

即应该配置成类似如下这样（注意将配置类加入至容器）

```java
public class SecurityConfig {

    @Bean
    protected DefaultSecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.formLogin().
                and().csrf().disable();
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer configure() throws Exception {
        return web -> {
            web.ignoring().mvcMatchers();
        };
    }
}
```

![image-20230101163516128](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101163516128.png)

### `HttpSecurity`的结构（构建SecurityFilterChain）

`HttpSecurity`继承自`AbstractConfiguredSecurityBuilder`抽象类，而`AbstractConfiguredSecurityBuilder`继承自`AbstractSecurityBuilder`抽象类，而`AbstractSecurityBuilder`抽象类实现了`SecurityBuilder`接口

![image-20230101143303005](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101143303005.png)

`SecurityBuilder`这个接口非常简单，就一个`build`方法，用于构建一个泛型`O`对象

![image-20230101143456115](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101143456115.png)

`HttpSecurity`用于构建一个`DefaultSecurityFilterChain`，即默认的安全过滤器链

```java
public final class HttpSecurity extends AbstractConfiguredSecurityBuilder<DefaultSecurityFilterChain, HttpSecurity> implements SecurityBuilder<DefaultSecurityFilterChain>, HttpSecurityBuilder<HttpSecurity> {
		...
}
```

![image-20230101144147132](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101144147132.png)

`DefaultSecurityFilterChain`结构非常简单，其就是实现了`SecurityFilterChain`接口

![image-20230101144420412](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101144420412.png)

`SecurityFilterChain`接口就两个方法，一个`matches`方法用于判断这个请求能不能应用这些`Filter`，一个`getFilters`方法返回要应用的所有过滤器（即`matches`方法返回`true`后，会将`getFilters`方法返回的所有`Filter`都应用到这个请求上）

```java
/**
 * Defines a filter chain which is capable of being matched against an
 * {@code HttpServletRequest}. in order to decide whether it applies to that request.
 * <p>
 * Used to configure a {@code FilterChainProxy}.
 *
 * @author Luke Taylor
 * @since 3.1
 */
public interface SecurityFilterChain {

	boolean matches(HttpServletRequest request);

	List<Filter> getFilters();

}
```

![image-20230101144705029](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101144705029.png)

### `WebSecurity`的结构（构建Filter）

可以看到`WebSecurity`也继承自`AbstractConfiguredSecurityBuilder`抽象类，而`AbstractConfiguredSecurityBuilder`继承自`AbstractSecurityBuilder`抽象类，而`AbstractSecurityBuilder`抽象类实现了`SecurityBuilder`接口

![image-20230101143631569](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101143631569.png)

而`WebSecurity`用于构建一个`Filter`对象，这个`Filter`就是`javax.servlet.Filter`

```java
public final class WebSecurity extends AbstractConfiguredSecurityBuilder<Filter, WebSecurity>
		implements SecurityBuilder<Filter>, ApplicationContextAware, ServletContextAware {
		...
}
```

![image-20230101143910431](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101143910431.png)

> `HttpSecurity`和`WebSecurity`结构非常相似，只不过`HttpSecurity`要构建的是`DefaultSecurityFilterChain`对象，而`WebSecurity`要构建的是`Filter`对象

### 构建对象

`HttpSecurity`和`WebSecurity`在哪里构建的对象呢？

首先我们来到最开始的`SecurityBuilder`接口，点击`build`方法的`下箭头接口`图标

```java
public interface SecurityBuilder<O> {

   /**
    * Builds the object and returns it or null.
    * @return the Object to be built or null if the implementation allows it.
    * @throws Exception if an error occurred when building the Object
    */
   O build() throws Exception;

}
```

![image-20230101150400062](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101150400062.png)

来到了`AbstractSecurityBuilder`抽象类，该类的`build`方法首先判断`building`是否为false。如果为false就将其修改为true，并调用doBuild方法，然后返回doBuild方法的返回值；如果为true，就表明已经构建过了，直接抛出已经构建异常（该抽象放法实现了`build`方法就是为了让其子类只有一个去构建，正真的构建逻辑在`doBuild`方法，其在该抽象类并定义为抽象方法，要求其具体子类必须去实现）

```java
public abstract class AbstractSecurityBuilder<O> implements SecurityBuilder<O> {

   private AtomicBoolean building = new AtomicBoolean();

   private O object;

   @Override
   public final O build() throws Exception {
      if (this.building.compareAndSet(false, true)) {
         this.object = doBuild();
         return this.object;
      }
      throw new AlreadyBuiltException("This object has already been built");
   }
	
   ...
   /**
    * Subclasses should implement this to perform the build.
    * @return the object that should be returned by {@link #build()}.
    * @throws Exception if an error occurs
    */
   protected abstract O doBuild() throws Exception;

}
```

![image-20230101150404906](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101150404906.png)

点击`AbstractSecurityBuilder`抽象类`doBuild`方法的`下箭头接口`图标，就来到了`AbstractConfiguredSecurityBuilder`抽象类

在`AbstractConfiguredSecurityBuilder`类里定义了一个`buildState`作为构建状态，在初始换之前调用`beforeInit();`方法，在配置之前调用`beforeConfigure();`方法，最后调用`performBuild();`方法构建对象。我们关心构建状态，可以实现`beforeInit();`或`beforeConfigure();`方法。当然如果不关心也可以不实现这两个中的任何方法，但都必须实现`performBuild();`方法，这个方法是构建对象的核心方法，必须实现。

```java
public abstract class AbstractConfiguredSecurityBuilder<O, B extends SecurityBuilder<O>>
		extends AbstractSecurityBuilder<O> {
	...
	private BuildState buildState = BuildState.UNBUILT;
	...
	@Override
	protected final O doBuild() throws Exception {
		synchronized (this.configurers) {
			this.buildState = BuildState.INITIALIZING;
			beforeInit();
			init();
			this.buildState = BuildState.CONFIGURING;
			beforeConfigure();
			configure();
			this.buildState = BuildState.BUILDING;
			O result = performBuild();
			this.buildState = BuildState.BUILT;
			return result;
		}
	}

	protected void beforeInit() throws Exception {
	}

	protected void beforeConfigure() throws Exception {
	}

	protected abstract O performBuild() throws Exception;
	...

	private enum BuildState {
		UNBUILT(0),
		INITIALIZING(1),
		CONFIGURING(2),
		BUILDING(3),
		BUILT(4);

		private final int order;
		...
	}

}
```

![image-20230101150626554](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101150626554.png)

#### HttpSecurity构建DefaultSecurityFilterChain

点击`AbstractConfiguredSecurityBuilder`抽象类`performBuild()`方法的`下箭头接口`图标，选择`HttpSecurity`，`HttpSecurity`返回的是`DefaultSecurityFilterChain`对象

```java
@SuppressWarnings("unchecked")
@Override
protected DefaultSecurityFilterChain performBuild() {
   ExpressionUrlAuthorizationConfigurer<?> expressionConfigurer = getConfigurer(
         ExpressionUrlAuthorizationConfigurer.class);
   AuthorizeHttpRequestsConfigurer<?> httpConfigurer = getConfigurer(AuthorizeHttpRequestsConfigurer.class);
   boolean oneConfigurerPresent = expressionConfigurer == null ^ httpConfigurer == null;
   Assert.state((expressionConfigurer == null && httpConfigurer == null) || oneConfigurerPresent,
         "authorizeHttpRequests cannot be used in conjunction with authorizeRequests. Please select just one.");
   this.filters.sort(OrderComparator.INSTANCE);
   List<Filter> sortedFilters = new ArrayList<>(this.filters.size());
   for (Filter filter : this.filters) {
      sortedFilters.add(((OrderedFilter) filter).filter);
   }
   return new DefaultSecurityFilterChain(this.requestMatcher, sortedFilters);
}
```

![image-20230101152532151](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101152532151.png)

#### WebSecurity构建FilterChainProxy

点击`AbstractConfiguredSecurityBuilder`抽象类`performBuild()`方法的`下箭头接口`图标，选择`WebSecurity`，`WebSecurity`返回的是`FilterChainProxy`对象

```java
@Override
protected Filter performBuild() throws Exception {
   ...
   FilterChainProxy filterChainProxy = new FilterChainProxy(securityFilterChains);
   if (this.httpFirewall != null) {
      filterChainProxy.setFirewall(this.httpFirewall);
   }
   if (this.requestRejectedHandler != null) {
      filterChainProxy.setRequestRejectedHandler(this.requestRejectedHandler);
   }
   filterChainProxy.afterPropertiesSet();

   Filter result = filterChainProxy;
   if (this.debugEnabled) {
      this.logger.warn("\n\n" + "********************************************************************\n"
            + "**********        Security debugging is enabled.       *************\n"
            + "**********    This may include sensitive information.  *************\n"
            + "**********      Do not use in a production system!     *************\n"
            + "********************************************************************\n\n");
      result = new DebugFilter(filterChainProxy);
   }
   this.postBuildAction.run();
   return result;
}
```

![image-20230101152841367](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101152841367.png)

`FilterChainProxy`继承`GenericFilterBean`抽象类，`GenericFilterBean`抽象类实现`Filter`方法

![image-20230101154743297](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101154743297.png)

FilterChainProxy类的构造方法需要SecurityFilterChain集合，该类会实现`Filter`类的`doFilter`方法，实现的`doFilter`方法会执行` doFilterInternal(request, response, chain);`方法来实现正真的逻辑，在`doFilterInternal`方法里首先调用`getFilters(firewallRequest)`获取所有的`Filter`，然后创建被包装后的`FilterChain`对象：`VirtualFilterChain`，然后使用被包装后的`VirtualFilterChain`对象的`doFilter`方法

```java
public class FilterChainProxy extends GenericFilterBean {
   ...
   private List<SecurityFilterChain> filterChains;
   ...
   public FilterChainProxy() {
   }

   public FilterChainProxy(SecurityFilterChain chain) {
      this(Arrays.asList(chain));
   }

   public FilterChainProxy(List<SecurityFilterChain> filterChains) {
      this.filterChains = filterChains;
   }
   ...
   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      boolean clearContext = request.getAttribute(FILTER_APPLIED) == null;
      if (!clearContext) {
         doFilterInternal(request, response, chain);
         return;
      }
      try {
         request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
         doFilterInternal(request, response, chain);
      }
      catch (Exception ex) {
         ...
      }
      finally {
         SecurityContextHolder.clearContext();
         request.removeAttribute(FILTER_APPLIED);
      }
   }

   private void doFilterInternal(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      ...
      List<Filter> filters = getFilters(firewallRequest);
      ...
      VirtualFilterChain virtualFilterChain = new VirtualFilterChain(firewallRequest, chain, filters);
      virtualFilterChain.doFilter(firewallRequest, firewallResponse);
   }
   ...
}
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230101155034966.png" alt="image-20230101155034966" style="zoom:25%;" />

该`getFilters`方法会遍历构造方法传过来的`List<SecurityFilterChain>`，调用其`matches`方法，如果返回`true`，就调用其`getFilters()`方法作为该方法的返回值（即只会使用第一个匹配的）

```java
private List<Filter> getFilters(HttpServletRequest request) {
   int count = 0;
   for (SecurityFilterChain chain : this.filterChains) {
      if (logger.isTraceEnabled()) {
         logger.trace(LogMessage.format("Trying to match request against %s (%d/%d)", chain, ++count,
               this.filterChains.size()));
      }
      if (chain.matches(request)) {
         return chain.getFilters();
      }
   }
   return null;
}
```

![image-20230101162218624](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101162218624.png)

`VirtualFilterChain`类的`doFilter`就是将`FilterChainProxy`类的构造方法传来的`SecurityFilterChain`里的所有`Filter`都应用一遍，如果`SecurityFilterChain`里的`Filter`都应用完了，就调用原始过滤器链的`doFilter`方法

```java
public class FilterChainProxy extends GenericFilterBean {
   ...
   private static final class VirtualFilterChain implements FilterChain {

      private final FilterChain originalChain;

      private final List<Filter> additionalFilters;

      private final FirewalledRequest firewalledRequest;

      private final int size;

      private int currentPosition = 0;

      private VirtualFilterChain(FirewalledRequest firewalledRequest, FilterChain chain,
            List<Filter> additionalFilters) {
         this.originalChain = chain;
         this.additionalFilters = additionalFilters;
         this.size = additionalFilters.size();
         this.firewalledRequest = firewalledRequest;
      }

      @Override
      public void doFilter(ServletRequest request, ServletResponse response) throws IOException, ServletException {
        // 最开始currentPosition = 0 ，如果当前位置和传过来的Filter相等就证明SecurityFilterChain里的Filter为空
        // 随着currentPosition++ 当this.currentPosition == this.size(执行完Filter)就调用原生过滤器链的doFilter方法
         if (this.currentPosition == this.size) {
            if (logger.isDebugEnabled()) {
               logger.debug(LogMessage.of(() -> "Secured " + requestLine(this.firewalledRequest)));
            }
            // Deactivate path stripping as we exit the security filter chain
            this.firewalledRequest.reset();
            this.originalChain.doFilter(request, response);
            return;
         }
         // 如果 this.currentPosition != this.size，先让currentPosition++获取第一个
         this.currentPosition++;
         // 获取第一个需要 将currentPosition -1 
         Filter nextFilter = this.additionalFilters.get(this.currentPosition - 1);
         if (logger.isTraceEnabled()) {
            logger.trace(LogMessage.format("Invoking %s (%d/%d)", nextFilter.getClass().getSimpleName(),
                  this.currentPosition, this.size));
         }
         // 调用nextFilter，继续让currentPosition++,直到this.currentPosition == this.size证明已经没有了
         nextFilter.doFilter(request, response, this);
      }

   }
   ...
}
```

![image-20230101160045307](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101160045307.png)

## 二

### 1、AbstractConfiguredSecurityBuilder

接着我们查看`AbstractConfiguredSecurityBuilder`的`add(C configurer)`方法，这个方法用于添加配置，再配置Spring Security时都直接或间接调用了该方法

```java
@SuppressWarnings("unchecked")
private <C extends SecurityConfigurer<O, B>> void add(C configurer) {
   Assert.notNull(configurer, "configurer cannot be null");
   Class<? extends SecurityConfigurer<O, B>> clazz = (Class<? extends SecurityConfigurer<O, B>>) configurer
         .getClass();
    // 首先加个锁，防止并发访问
   synchronized (this.configurers) {
     //如果现在的构建状态是已经配置或正在配置(this.order>=CONFIGURING.order)就抛出异常（已经或正在配置时就不允许添加配置）
      if (this.buildState.isConfigured()) {
         throw new IllegalStateException("Cannot apply " + configurer + " to already built object");
      }
      List<SecurityConfigurer<O, B>> configs = null;
      // 如果允许相同类型的配置，就将configurers.get(clazz)类的值赋给configs（即获取到之前在configurers里的配置，然后调用configs.add(configurer)方法，添加新的配置，然后再put到configurers里）
      if (this.allowConfigurersOfSameType) {
         configs = this.configurers.get(clazz);
      }
      // 如果不为空（允许相同类型的配置）就不变
      // 如果为空（不允许相同类型的配置）就创建一个初始容量为1的ArrayList赋给configs（即重新创建一个新的配置，put到configurers里时覆盖掉之前的配置，如果之前有该配置的话）
      configs = (configs != null) ? configs : new ArrayList<>(1);
      // 将方法传过来configurer添加到configs里，即添加配置
      configs.add(configurer);
      // 将clazz作为key，configs作为value,添加到configurers里
      this.configurers.put(clazz, configs);
      if (this.buildState.isInitializing()) {
         // 如果是正在初始化，将这个配置添加到configurersAddedInInitializing里
         // 也就是把已有的configs调完完成了后，再把在初始化过程中加入的config需要再调用一遍
         this.configurersAddedInInitializing.add(configurer);
      }
   }
}
```

![image-20230101201241080](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101201241080.png)

### 2、SecurityConfigurer

前面我们说到，`AbstractConfiguredSecurityBuilder`抽象类的`doBuild`方法在初始换之前调用`beforeInit();`方法，在配置之前调用`beforeConfigure();`方法，最后调用`performBuild();`方法构建对象。而初始化的`init`方法里会调用所有`SecurityConfigurer<O, B>`接口的`configurer.init((B) this);`方法，而进行配置的`configure`方法里会调用所有`SecurityConfigurer<O, B>`接口的`configurer.configure((B) this);`方法

```java
@SuppressWarnings("unchecked")
private void init() throws Exception {
   Collection<SecurityConfigurer<O, B>> configurers = getConfigurers();
   for (SecurityConfigurer<O, B> configurer : configurers) {
      configurer.init((B) this);
   }
   for (SecurityConfigurer<O, B> configurer : this.configurersAddedInInitializing) {
      configurer.init((B) this);
   }
}

@SuppressWarnings("unchecked")
private void configure() throws Exception {
   Collection<SecurityConfigurer<O, B>> configurers = getConfigurers();
   for (SecurityConfigurer<O, B> configurer : configurers) {
      configurer.configure((B) this);
   }
}
```

![image-20230101164417385](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101164417385.png)

我们查看`SecurityConfigurer<O, B>`这个接口，这个接口也就`init(B builder)`和`configure(B builder)`两个方法（一般`init(B builder)`是初始化和设置共享对象的，`configure(B builder)`是创建相应的过滤器的）

```java
public interface SecurityConfigurer<O, B extends SecurityBuilder<O>> {

	/**
	 * Initialize the {@link SecurityBuilder}. Here only shared state should be created
	 * and modified, but not properties on the {@link SecurityBuilder} used for building
	 * the object. This ensures that the {@link #configure(SecurityBuilder)} method uses
	 * the correct shared objects when building. Configurers should be applied here.
	 * @param builder
	 * @throws Exception
	 */
	void init(B builder) throws Exception;

	/**
	 * Configure the {@link SecurityBuilder} by setting the necessary properties on the
	 * {@link SecurityBuilder}.
	 * @param builder
	 * @throws Exception
	 */
	void configure(B builder) throws Exception;

}
```

![image-20230101195916279](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101195916279.png)

在`init()`和`configure()`方法里，首先会调用`getConfigurers()`方法，这个方法也比较简单，遍历前面刚刚提到的`configurers`的`values`，然后调用`result.addAll(configs);`方法，也就是遍历` this.configurers.values()`时，每一项是一个集合，将这些集合批量添加到`result`里（相当于`flatMap`，类似于将双层数组给展开成一层数组）

```java
private Collection<SecurityConfigurer<O, B>> getConfigurers() {
   List<SecurityConfigurer<O, B>> result = new ArrayList<>();
   for (List<SecurityConfigurer<O, B>> configs : this.configurers.values()) {
      result.addAll(configs);
   }
   return result;
}
```

![image-20230101203338987](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101203338987.png)

在`init()`方法里可以看到先执行`getConfigurers()`把`configurers`里的配置都调用一遍`configurer.init((B) this);`方法，在把`configurersAddedInInitializing`里的配置也调用一遍`configurer.init((B) this);`方法

```java
@SuppressWarnings("unchecked")
private void init() throws Exception {
   Collection<SecurityConfigurer<O, B>> configurers = getConfigurers();
   for (SecurityConfigurer<O, B> configurer : configurers) {
      configurer.init((B) this);
   }
   for (SecurityConfigurer<O, B> configurer : this.configurersAddedInInitializing) {
      configurer.init((B) this);
   }
}
```

![image-20230101204642592](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101204642592.png)

`configure()`方法比较简单，直接遍历`configurers`调用其`configure`方法

```java
@SuppressWarnings("unchecked")
private void configure() throws Exception {
   Collection<SecurityConfigurer<O, B>> configurers = getConfigurers();
   for (SecurityConfigurer<O, B> configurer : configurers) {
      configurer.configure((B) this);
   }
}
```

![image-20230101210140782](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101210140782.png)

接下来，我们继续说`HttpSecurity`类的`performBuild()`，返回了一个`DefaultSecurityFilterChain`对象，参数里的`sortedFilters`就是本类`filters`字段里所有的过滤器

```java
@SuppressWarnings("unchecked")
@Override
protected DefaultSecurityFilterChain performBuild() {
   // 获取 ExpressionUrlAuthorizationConfigurer类型的配置
   ExpressionUrlAuthorizationConfigurer<?> expressionConfigurer = getConfigurer(
         ExpressionUrlAuthorizationConfigurer.class);
   // 获取AuthorizeHttpRequestsConfigurer类型的配置
   AuthorizeHttpRequestsConfigurer<?> httpConfigurer = getConfigurer(AuthorizeHttpRequestsConfigurer.class);
   // 判断这两个配置是不是有且只有一个配置不为null (^ 异或，相同为false，不同为true)
   // boolean oneConfigurerPresent = (expressionConfigurer == null) ^ (httpConfigurer == null); 
   boolean oneConfigurerPresent = expressionConfigurer == null ^ httpConfigurer == null;
   Assert.state((expressionConfigurer == null && httpConfigurer == null) || oneConfigurerPresent,
         "authorizeHttpRequests cannot be used in conjunction with authorizeRequests. Please select just one.");
   this.filters.sort(OrderComparator.INSTANCE);
   List<Filter> sortedFilters = new ArrayList<>(this.filters.size());
   for (Filter filter : this.filters) {
      sortedFilters.add(((OrderedFilter) filter).filter);
   }
   return new DefaultSecurityFilterChain(this.requestMatcher, sortedFilters);
}
```

![image-20230101211348363](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101211348363.png)

`requestMatcher`参数是`AnyRequestMatcher.INSTANCE`，也就是管理所有请求

```java
public final class HttpSecurity extends AbstractConfiguredSecurityBuilder<DefaultSecurityFilterChain, HttpSecurity>
      implements SecurityBuilder<DefaultSecurityFilterChain>, HttpSecurityBuilder<HttpSecurity> {

   private final RequestMatcherConfigurer requestMatcherConfigurer;

   private List<OrderedFilter> filters = new ArrayList<>();

   private RequestMatcher requestMatcher = AnyRequestMatcher.INSTANCE;

   private FilterOrderRegistration filterOrders = new FilterOrderRegistration();

   private AuthenticationManager authenticationManager;
   ...
}
```

![image-20230101212828147](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101212828147.png)

`AnyRequestMatcher.INSTANCE`用的是懒汉式创建的单例对象，其`matches`返回`true`，也就是配置所有请求路径

```java
public final class AnyRequestMatcher implements RequestMatcher {

   public static final RequestMatcher INSTANCE = new AnyRequestMatcher();

   private AnyRequestMatcher() {
   }

   @Override
   public boolean matches(HttpServletRequest request) {
      return true;
   }

   @Override
   @SuppressWarnings("deprecation")
   public boolean equals(Object obj) {
      return obj instanceof AnyRequestMatcher
            || obj instanceof org.springframework.security.web.util.matcher.AnyRequestMatcher;
   }

   @Override
   public int hashCode() {
      return 1;
   }

   @Override
   public String toString() {
      return "any request";
   }

}
```

![image-20230101212953678](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101212953678.png)

当然，我们也可以不使用默认的`AnyRequestMatcher`，自己设置`RequestMatcher`也可以

```java
public HttpSecurity requestMatcher(RequestMatcher requestMatcher) {
   this.requestMatcher = requestMatcher;
   return this;
}
```

![image-20230101213230307](https://gitlab.com/apzs/image/-/raw/master/image/image-20230101213230307.png)

## 三

### AuthenticationManager

`AuthenticationManager`有一个`authenticate`方法，对传来的`Authentication`做认证，如果账号被禁用了抛出`DisabledException`异常，账号被锁住了抛出`LockedException`异常，密码输错了抛出`BadCredentialsException`异常

```java
public interface AuthenticationManager {
   Authentication authenticate(Authentication authentication) throws AuthenticationException;
}
```

![image-20230102092537227](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102092537227.png)

### AuthenticationManagerBuilder

![image-20230102093131724](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102093131724.png)

`performBuild`方法用于构建`ProviderManager`

```java
@Override
protected ProviderManager performBuild() throws Exception {
   if (!isConfigured()) {
      this.logger.debug("No authenticationProviders and no parentAuthenticationManager defined. Returning null.");
      return null;
   }
   // 创建ProviderManager对象（传递认证提供者和父类的认证管理器）
   ProviderManager providerManager = new ProviderManager(this.authenticationProviders,
         this.parentAuthenticationManager);
   // 身份认证后擦除凭据(即认证成功后将用户输入的存放在内存中密码字段重新设为null)
   if (this.eraseCredentials != null) {
      providerManager.setEraseCredentialsAfterAuthentication(this.eraseCredentials);
   }
   // 设置认证事件发布器（发布认证成功或认证失败的消息）
   if (this.eventPublisher != null) {
      providerManager.setAuthenticationEventPublisher(this.eventPublisher);
   }
   // 返回前调用后置处理方法
   providerManager = postProcess(providerManager);
   return providerManager;
}
```

![image-20230102093634950](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102093634950.png)

`postProcess`方法会调用`this.objectPostProcessor`的`postProcess`方法

```java
private ObjectPostProcessor<Object> objectPostProcessor;

protected <P> P postProcess(P object) {
   return this.objectPostProcessor.postProcess(object);
}
```

![image-20230102094151412](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102094151412.png)

![image2-20230102094052946](https://gitlab.com/apzs/image/-/raw/master/image/image2-20230102094052946.png)

而`ObjectPostProcessor`接口就一个`postProcess`方法，用于进行后置处理，可以拓展Spring Security的功能

```java
public interface ObjectPostProcessor<T> {

   /**
    * Initialize the object possibly returning a modified instance that should be used
    * instead.
    * @param object the object to initialize
    * @return the initialized version of the object
    */
   <O extends T> O postProcess(O object);

}
```

![image-20230102094657680](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102094657680.png)

### ProviderManager

而`ProviderManager`实现了`AuthenticationManager`接口

![image-20230102093749723](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102093749723.png)

`ProviderManager`类的构造方法需要传递`AuthenticationProvider`集合

```java
public ProviderManager(AuthenticationProvider... providers) {
   this(Arrays.asList(providers), null);
}

public ProviderManager(List<AuthenticationProvider> providers) {
   this(providers, null);
}

public ProviderManager(List<AuthenticationProvider> providers, AuthenticationManager parent) {
   Assert.notNull(providers, "providers list cannot be null");
   this.providers = providers;
   this.parent = parent;
   checkState();
}
```

![image-20230102095602776](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102095602776.png)

### AuthenticationProvider

`AuthenticationProvider`接口有两个方法`authenticate`和`supports`。这个`authenticate`方法和前面说的`AuthenticationManager`接口的`authenticate`方法简直一模一样；`supports`方法就是判断支不支持传过来的`authentication`

```java
public interface AuthenticationProvider {
   
   Authentication authenticate(Authentication authentication) throws AuthenticationException;

   boolean supports(Class<?> authentication);

}
```

![image-20230102095840728](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102095840728.png)

### Authentication

`Authentication`接口有如下几个接口

```java
public interface Authentication extends Principal, Serializable {
   // 获取所有的授权（获取角色和权限）
   Collection<? extends GrantedAuthority> getAuthorities();
   // 获取凭证（密码，code，token等等都有可能作为凭据）
   Object getCredentials();
   // 获取详细信息（ip地址，字符编号等）
   Object getDetails();
   // 这个登录人的主体（用户名）
   Object getPrincipal();
   // 是否认证了
   boolean isAuthenticated();
   // 设置是否认证了
   void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;

}
```

![image-20230102100921620](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102100921620.png)

`ProviderManager`类最重要的就是`authentication`方法

```java
@Override
public Authentication authenticate(Authentication authentication) throws AuthenticationException {
   Class<? extends Authentication> toTest = authentication.getClass();
   AuthenticationException lastException = null;
   AuthenticationException parentException = null;
   Authentication result = null;
   Authentication parentResult = null;
   int currentPosition = 0;
   int size = this.providers.size();
   // 首先遍历所有的providers，看是否支持传过来的Authentication类
   // providers由AuthenticationManagerBuilder类的performBuild方法创建该对象传递
   for (AuthenticationProvider provider : getProviders()) {
      // 如果不支持获取下一个，看下一个是否支持
      if (!provider.supports(toTest)) {
         continue;
      }
      if (logger.isTraceEnabled()) {
         logger.trace(LogMessage.format("Authenticating request with %s (%d/%d)",
               provider.getClass().getSimpleName(), ++currentPosition, size));
      }
      try {
         // 如果支持就调用支持者的authenticate方法进行认证
         result = provider.authenticate(authentication);
         // 认证的结果不为空就复制详细信息并退出循环
         if (result != null) {
            copyDetails(authentication, result);
            break;
         }
      }
      catch (AccountStatusException | InternalAuthenticationServiceException ex) {
         prepareException(ex, authentication);
         // SEC-546: Avoid polling additional providers if auth failure is due to
         // invalid account status
         throw ex;
      }
      catch (AuthenticationException ex) {
         lastException = ex;
      }
   }
   // 如果result为空(providers都不支持或支持的provider调用其authenticate方法却返回空)，且父亲不为空的话
   if (result == null && this.parent != null) {
      // Allow the parent to try.
      try {
         // 调用父亲的authenticate方法
         // // parent由AuthenticationManagerBuilder类的performBuild方法创建该对象传递
         parentResult = this.parent.authenticate(authentication);
         result = parentResult;
      }
      catch (ProviderNotFoundException ex) {
         // ignore as we will throw below if no other exception occurred prior to
         // calling parent and the parent
         // may throw ProviderNotFound even though a provider in the child already
         // handled the request
      }
      catch (AuthenticationException ex) {
         parentException = ex;
         lastException = ex;
      }
   }
   // result != null 即认证成功
   if (result != null) {
      if (this.eraseCredentialsAfterAuthentication && (result instanceof CredentialsContainer)) {
         // Authentication is complete. Remove credentials and other secret data
         // from authentication
         // 擦除凭证 （其实就是将输入的密码清空，不让敏感信息存在内存中）
         ((CredentialsContainer) result).eraseCredentials();
      }
      // If the parent AuthenticationManager was attempted and successful then it
      // will publish an AuthenticationSuccessEvent
      // This check prevents a duplicate AuthenticationSuccessEvent if the parent
      // AuthenticationManager already published it
      // 如果parentResult为空（即首先遍历的providers中有provider调用authenticate方法认证成功），发布认证成功的消息
      if (parentResult == null) {
         this.eventPublisher.publishAuthenticationSuccess(result);
      }

      return result;
   }
    // result == null 即认证失败，准备抛出异常
	// Parent was null, or didn't authenticate (or throw an exception).
	if (lastException == null) {
		lastException = new ProviderNotFoundException(this.messages.getMessage("ProviderManager.providerNotFound",
				new Object[] { toTest.getName() }, "No AuthenticationProvider found for {0}"));
	}
	// If the parent AuthenticationManager was attempted and failed then it will
	// publish an AbstractAuthenticationFailureEvent
	// This check prevents a duplicate AbstractAuthenticationFailureEvent if the
	// parent AuthenticationManager already published it
	if (parentException == null) {
        // 发布认证失败的消息
		prepareException(lastException, authentication);
	}
	throw lastException;
}

@SuppressWarnings("deprecation")
private void prepareException(AuthenticationException ex, Authentication auth) {
	this.eventPublisher.publishAuthenticationFailure(ex, auth);
}
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230102103940382.png" alt="image-20230102103940382" style="zoom: 25%;" />

`AuthenticationEventPublisher`接口就两个方法，一个方法是发布认证成功的消息，一个方法是发布认证失败的消息

```java
public interface AuthenticationEventPublisher {

   void publishAuthenticationSuccess(Authentication authentication);

   void publishAuthenticationFailure(AuthenticationException exception, Authentication authentication);

}
```

![image-20230102104105892](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102104105892.png)

## 四、

### DaoAuthenticationProvider

我们看`DaoAuthenticationProvider`，他继承于`AbstractUserDetailsAuthenticationProvider`

(`MessageSourceAware`是做国际化的，我们不用管，一般国际化都是前端来做的)

(`AuthenticationManager`管理`AuthenticationProvider`，`DaoAuthenticationProvider`是`AuthenticationProvider`接口的实现类，`UsernamePasswordAuthenticationFilter`里调用的`this.getAuthenticationManager().authenticate(authRequest);`就是`DaoAuthenticationProvider`)

![image-20230102151516274](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102151516274.png)

AbstractUserDetailsAuthenticationProvider类

> A base AuthenticationProvider that allows subclasses to override and work with UserDetails objects. The class is designed to respond to UsernamePasswordAuthenticationToken authentication requests.
>
> 允许子类覆盖和使用 UserDetails 对象的基本 AuthenticationProvider。 该类被设计用于响应 UsernamePasswordAuthenticationToken 认证请求。

```java
@Override
public Authentication authenticate(Authentication authentication) throws AuthenticationException {
   Assert.isInstanceOf(UsernamePasswordAuthenticationToken.class, authentication,
         () -> this.messages.getMessage("AbstractUserDetailsAuthenticationProvider.onlySupports",
               "Only UsernamePasswordAuthenticationToken is supported"));
   // 确定用户名
   String username = determineUsername(authentication);
   // 先设置使用缓存中的用户信息
   boolean cacheWasUsed = true;
   // 从缓存中根据用户名获取用户信息
   UserDetails user = this.userCache.getUserFromCache(username);
   if (user == null) {
      // 如果缓存中没有，设置不是使用缓存中的
      cacheWasUsed = false;
      try {
         // 检索用户，获取用户信息（该方法为抽象方法，留给子类去实现）
         user = retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);
      }
      catch (UsernameNotFoundException ex) {
         this.logger.debug("Failed to find user '" + username + "'");
         // 如果设置了不隐藏用户没有找到异常就抛出用户名没找到异常（类似于用户名不存在）
         if (!this.hideUserNotFoundExceptions) {
            throw ex;
         }
         // 如果想要隐藏用户没有找到异常就抛出错误的凭证异常（类似于用户名或密码不正确）
         throw new BadCredentialsException(this.messages
               .getMessage("AbstractUserDetailsAuthenticationProvider.badCredentials", "Bad credentials"));
      }
      Assert.notNull(user, "retrieveUser returned null - a violation of the interface contract");
   }
   try {
      // 预认证检查
      this.preAuthenticationChecks.check(user);
      // 额外的认证检查（判断用户输入的密码和真实的密码是否正确，该方法为抽象方法，留给子类去实现）
      additionalAuthenticationChecks(user, (UsernamePasswordAuthenticationToken) authentication);
   }
   catch (AuthenticationException ex) {
      // 如果认证失败且不是缓存中的，则抛出认证失败异常
      if (!cacheWasUsed) {
         throw ex;
      }
      // 如果认证失败但是是缓存中的，有可能是缓存更新不及时导致的，设置用户信息不是缓存中的，重新在检索用户一次，再进行额外的认证检查
      // There was a problem, so try again after checking
      // we're using latest data (i.e. not from the cache)
      cacheWasUsed = false;
      user = retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);
      this.preAuthenticationChecks.check(user);
      additionalAuthenticationChecks(user, (UsernamePasswordAuthenticationToken) authentication);
   }
   this.postAuthenticationChecks.check(user);
   // 如果用户信息不是缓存中的，将用户信息放到缓存中
   if (!cacheWasUsed) {
      this.userCache.putUserInCache(user);
   }
   Object principalToReturn = user;
   if (this.forcePrincipalAsString) {
      principalToReturn = user.getUsername();
   }
   // 创建成功认证对象（设置authenticated为true，代表已经认证成功了）
   return createSuccessAuthentication(principalToReturn, authentication, user);
}
```

![image-20230102201535815](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102201535815.png)

接着我们看`创建成功认证对象`调用的`createSuccessAuthentication(principalToReturn, authentication, user);`

这个方法还是比较简单的，调用`UsernamePasswordAuthenticationToken`类的`authenticated`静态方法，将用户的凭证、权限等信息传进来即可（使用带权限的构造方法会设置`authenticated`字段为`true`）

```java
protected Authentication createSuccessAuthentication(Object principal, Authentication authentication,
      UserDetails user) {
   // Ensure we return the original credentials the user supplied,
   // so subsequent attempts are successful even with encoded passwords.
   // Also ensure we return the original getDetails(), so that future
   // authentication events after cache expiry contain the details
   UsernamePasswordAuthenticationToken result = UsernamePasswordAuthenticationToken.authenticated(principal,
         authentication.getCredentials(), this.authoritiesMapper.mapAuthorities(user.getAuthorities()));
   result.setDetails(authentication.getDetails());
   this.logger.debug("Authenticated user");
   return result;
}
```

![image-20230102203322803](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102203322803.png)

调用`UsernamePasswordAuthenticationToken`类的`authenticated`方法会构造有权限参数的对象，在有权限参数的构造方法中会设置`authenticated`字段为`true`

```java
public class UsernamePasswordAuthenticationToken extends AbstractAuthenticationToken {

   private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

   private final Object principal;

   private Object credentials;

   public UsernamePasswordAuthenticationToken(Object principal, Object credentials) {
      super(null);
      this.principal = principal;
      this.credentials = credentials;
      setAuthenticated(false);
   }

   public UsernamePasswordAuthenticationToken(Object principal, Object credentials,
         Collection<? extends GrantedAuthority> authorities) {
      super(authorities);
      this.principal = principal;
      this.credentials = credentials;
      // 有权限的构造参数会设置authenticated字段为true，代表已经认证通过了
      super.setAuthenticated(true); // must use super, as we override
   }

   public static UsernamePasswordAuthenticationToken unauthenticated(Object principal, Object credentials) {
      return new UsernamePasswordAuthenticationToken(principal, credentials);
   }
   // authenticated方法会使用带有权限参数的构造器， 有权限的构造参数会设置authenticated字段为true，代表已经认证通过了
   public static UsernamePasswordAuthenticationToken authenticated(Object principal, Object credentials,
         Collection<? extends GrantedAuthority> authorities) {
      return new UsernamePasswordAuthenticationToken(principal, credentials, authorities);
   }
   ...
   @Override
   public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
      Assert.isTrue(!isAuthenticated,
            "Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead");
      super.setAuthenticated(false);
   }
   ...
}
```

![image-20230108183834658](https://gitlab.com/apzs/image/-/raw/master/image/image-20230108183834658.png)

#### retrieveUser

 查看`DaoAuthenticationProvider`类实现的`AbstractUserDetailsAuthenticationProvider`抽象类的`retrieveUser`抽象方法（检索用户，获取用户信息）该方法非常简单，调用`UserDetailsService`的`loadUserByUsername`方法，返回`UserDetails`，并且返回的不能为空，否则抛出`内部认证服务异常`（UserDetailsService 返回 null，这是一个违反锲约的接口）

```java
@Override
protected final UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication)
      throws AuthenticationException {
   // 为计时攻击的防御做准备
   prepareTimingAttackProtection();
   try {
      UserDetails loadedUser = this.getUserDetailsService().loadUserByUsername(username);
      if (loadedUser == null) {
         throw new InternalAuthenticationServiceException(
               "UserDetailsService returned null, which is an interface contract violation");
      }
      return loadedUser;
   }
   catch (UsernameNotFoundException ex) {
      // 缓解计时攻击
      mitigateAgainstTimingAttack(authentication);
      throw ex;
   }
   catch (InternalAuthenticationServiceException ex) {
      throw ex;
   }
   catch (Exception ex) {
      throw new InternalAuthenticationServiceException(ex.getMessage(), ex);
   }
}
```

![image-20230102203907158](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102203907158.png)

`UserDetailsService`接口只有`loadUserByUsername`方法，根据用户名返回用户信息，其返回值为`完全填充的用户记录(从不为null)`，所以如果返回null，就抛出`内部认证服务异常`，并告诉我们违反接口契约。常用的实现类有`InMemoryUserDetailsManager`和`JdbcUserDetailsManager`

> 有些同学可能问了，数据库里面没有这个用户名，不返回null返回什么？
>
> 其实Spring Security的意思是如果数据库里面没有这个用户名，我们可以抛出UsernameNotFoundException异常

```java
public interface UserDetailsService {

   /**
    * Locates the user based on the username. In the actual implementation, the search
    * may possibly be case sensitive, or case insensitive depending on how the
    * implementation instance is configured. In this case, the <code>UserDetails</code>
    * object that comes back may have a username that is of a different case than what
    * was actually requested..
    * @param username the username identifying the user whose data is required.
    * @return a fully populated user record (never <code>null</code>)
    * @throws UsernameNotFoundException if the user could not be found or the user has no
    * GrantedAuthority
    */
   UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

}
```

![image-20230102151248037](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102151248037.png)

Spring Security如何防止计时攻击呢？

> [计时攻击是旁路攻击的一种，在密码学中，旁道攻击又称侧信道攻击、边信道攻击(Side-channel attack)。](http://www.nndssk.com/dngz/332204gXbicg.html)
>
> 这种攻击方式并非利用加密算法的理论弱点，也不是暴力破解，而是从密码系统的物理实现中获取的信息。例如：时间信息、功率消耗、电磁泄露等额外的信息源，这些信息可被用于对系统的进一步破解。
>
> 假设 Spring Security从数据库中没有查到用户信息就直接抛出异常了，没有去执行mitigateAgainstTimingAttack方法，那么黑客经过大量的测试，再经过统计分析，就会发现有一些登录验证耗时明显少于其他登录，进而推断出登录验证时间较短的都是不存在的用户，而登录耗时较长的是数据库中存在的用户。

首先在从数据库中加载用户名之前调用`prepareTimingAttackProtection`方法 为计时攻击的防御做准备，将`userNotFoundPassword`使用密码编码器进行加密，如果抛出了用户名没有找到异常就调用`mitigateAgainstTimingAttack`方法，使用加密后的`userNotFoundPassword`与输入的密码进行比较以浪费时间，使处理用户名不存在和处理密码错误所以需要的时间基本一致，防止黑客根据执行时间判断是用户名不存在还是密码错误。

```java
private static final String USER_NOT_FOUND_PASSWORD = "userNotFoundPassword";
// 为计时攻击的防御做准备
private void prepareTimingAttackProtection() {
   if (this.userNotFoundEncodedPassword == null) {
      this.userNotFoundEncodedPassword = this.passwordEncoder.encode(USER_NOT_FOUND_PASSWORD);
   }
}
// 缓解计时攻击
private void mitigateAgainstTimingAttack(UsernamePasswordAuthenticationToken authentication) {
   if (authentication.getCredentials() != null) {
      String presentedPassword = authentication.getCredentials().toString();
      this.passwordEncoder.matches(presentedPassword, this.userNotFoundEncodedPassword);
   }
}
```

![image-20230102210418341](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102210418341.png)

#### additionalAuthenticationChecks

查看`DaoAuthenticationProvider`类实现的`AbstractUserDetailsAuthenticationProvider`抽象类的`additionalAuthenticationChecks`抽象方法（额外的认证检查，判断用户输入的密码和真实的密码是否正确）

```java
@Override
@SuppressWarnings("deprecation")
protected void additionalAuthenticationChecks(UserDetails userDetails,
      UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
   // 获取用户输入的凭据（凭据可以为密码，token等，这里指的是密码）
   if (authentication.getCredentials() == null) {
      this.logger.debug("Failed to authenticate since no credentials provided");
      // 如果没有凭据，抛出坏的凭据异常
      throw new BadCredentialsException(this.messages
            .getMessage("AbstractUserDetailsAuthenticationProvider.badCredentials", "Bad credentials"));
   }
   // 将凭据信息转为字符串
   String presentedPassword = authentication.getCredentials().toString();
   // 使用容器中的密码编码器判断用户输入的明文密码是否与系统中存储的密文密码匹配
   if (!this.passwordEncoder.matches(presentedPassword, userDetails.getPassword())) {
      this.logger.debug("Failed to authenticate since password does not match stored value");
      throw new BadCredentialsException(this.messages
            .getMessage("AbstractUserDetailsAuthenticationProvider.badCredentials", "Bad credentials"));
   }
}
```

![image-20230102201804903](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102201804903.png)

`PasswordEncoder`密码编码器有`3`个方法，常用的就是`encode`和`matches`方法，`encode`方法用来对传来的信息进行加密，`matches`方法用于判断明文信息和密文信息是否匹配，`upgradeEncoding`用于设置是否想要升级加密算法（最常用的实现类为`BCryptPasswordEncoder`）

```java
public interface PasswordEncoder {

   String encode(CharSequence rawPassword);

   boolean matches(CharSequence rawPassword, String encodedPassword);
    
   default boolean upgradeEncoding(String encodedPassword) {
      return false;
   }

}
```

![image-20230102202507842](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102202507842.png)

`DaoAuthenticationProvider`类覆盖了`AbstractUserDetailsAuthenticationProvider`抽象类的`createSuccessAuthentication`方法，如果`PasswordEncoder`接口的实现类将`upgradeEncoding`设为`true`，则重新将认证的凭证使用密码编码器加密一下，并通知给`UserDetailsPasswordService`类，告述其密码更新了，最后再调用父类的`createSuccessAuthentication`方法（主要用于更新系统的加密算法，即加密方式平滑的切换）

```java
@Override
protected Authentication createSuccessAuthentication(Object principal, Authentication authentication,
      UserDetails user) {
   boolean upgradeEncoding = this.userDetailsPasswordService != null
         && this.passwordEncoder.upgradeEncoding(user.getPassword());
   if (upgradeEncoding) {
      String presentedPassword = authentication.getCredentials().toString();
      String newPassword = this.passwordEncoder.encode(presentedPassword);
      user = this.userDetailsPasswordService.updatePassword(user, newPassword);
   }
   return super.createSuccessAuthentication(principal, authentication, user);
}
```

![image-20230102211930471](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102211930471.png)

### UsernamePasswordAuthenticationFilter

`UsernamePasswordAuthenticationFilter`继承自`AbstractAuthenticationProcessingFilter`

![image-20230102213419975](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102213419975.png)

`AbstractAuthenticationProcessingFilter`既然是`Filter`，最重要的肯定是`doFilter`方法

```java
@Override
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
   doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
}

private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {
   // 如果不需要认证，则直接放行
   if (!requiresAuthentication(request, response)) {
      chain.doFilter(request, response);
      return;
   }
   try {
      // 尝试认证 （该方法为抽象方法，由子类去实现）
      Authentication authenticationResult = attemptAuthentication(request, response);
      if (authenticationResult == null) {
         // return immediately as subclass has indicated that it hasn't completed
         return;
      }
      // 调用SessionAuthenticationStrategy接口的onAuthentication方法(可以实现多次登陆后让前面几次登录的下线之类的功能)
      this.sessionStrategy.onAuthentication(authenticationResult, request, response);
      // Authentication success
      if (this.continueChainBeforeSuccessfulAuthentication) {
         chain.doFilter(request, response);
      }
      successfulAuthentication(request, response, chain, authenticationResult);
   }
   catch (InternalAuthenticationServiceException failed) {
      this.logger.error("An internal error occurred while trying to authenticate the user.", failed);
      unsuccessfulAuthentication(request, response, failed);
   }
   catch (AuthenticationException ex) {
      // Authentication failed
      unsuccessfulAuthentication(request, response, ex);
   }
}
```

![image-20230102213609548](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102213609548.png)

认证成功后会执行的方法，先会在上下文中存放一些信息，调用`RememberMeServices`的`loginSuccess`方法，然后调用`ApplicationEventPublisher`类的`publishEvent`方法发布交互的认证成功事件，再调用`AuthenticationSuccessHandler`类的`onAuthenticationSuccess`方法，也就是我们配置的认证成功后做的处理（比如返回json、跳转到成功页等）

```java
protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
      Authentication authResult) throws IOException, ServletException {
   SecurityContext context = SecurityContextHolder.createEmptyContext();
   context.setAuthentication(authResult);
   SecurityContextHolder.setContext(context);
   this.securityContextRepository.saveContext(context, request, response);
   if (this.logger.isDebugEnabled()) {
      this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
   }
   this.rememberMeServices.loginSuccess(request, response, authResult);
   if (this.eventPublisher != null) {
      this.eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(authResult, this.getClass()));
   }
   this.successHandler.onAuthenticationSuccess(request, response, authResult);
}
```

![image-20230102214118669](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102214118669.png)

认证失败后会调用的方法，清空`SecurityContextHolder`上下文，然后调用`RememberMeServices`类的`loginFail`方法，再调用`AuthenticationFailureHandler`类的`onAuthenticationFailure`方法，也就是我们配置的认证失败后做的处理（比如返回json、跳转到失败页等）

```java
protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException failed) throws IOException, ServletException {
   SecurityContextHolder.clearContext();
   this.logger.trace("Failed to process authentication request", failed);
   this.logger.trace("Cleared SecurityContextHolder");
   this.logger.trace("Handling authentication failure");
   this.rememberMeServices.loginFail(request, response);
   this.failureHandler.onAuthenticationFailure(request, response, failed);
}
```

![image-20230102214259842](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102214259842.png)

接着回到`UsernamePasswordAuthenticationFilter`类的`attemptAuthentication`尝试认证方法

```java
public static final String SPRING_SECURITY_FORM_USERNAME_KEY = "username";
public static final String SPRING_SECURITY_FORM_PASSWORD_KEY = "password";

private String usernameParameter = SPRING_SECURITY_FORM_USERNAME_KEY;
private String passwordParameter = SPRING_SECURITY_FORM_PASSWORD_KEY;

@Override
public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {
   if (this.postOnly && !request.getMethod().equals("POST")) {
      throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
   }
   // 获取用户名
   String username = obtainUsername(request);
   username = (username != null) ? username.trim() : "";
   // 获取密码
   String password = obtainPassword(request);
   password = (password != null) ? password : "";
   // 使用UsernamePasswordAuthenticationToken类的unauthenticated静态方法，构造UsernamePasswordAuthenticationToken对象
   UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username,
         password);
   // Allow subclasses to set the "details" property
   // 设置一些额外的详细信息
   setDetails(request, authRequest);
   // 调用AuthenticationManager接口的authenticate方法进行认证，这里使用的实现类是DaoAuthenticationProvider
   return this.getAuthenticationManager().authenticate(authRequest);
}
// 获取密码
@Nullable
protected String obtainPassword(HttpServletRequest request) {
   return request.getParameter(this.passwordParameter);
}
// 获取用户名
@Nullable
protected String obtainUsername(HttpServletRequest request) {
   return request.getParameter(this.usernameParameter);
}
```

![image-20230102215131873](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102215131873.png)

### FormLoginConfigurer

这个方法主要用于配置表单登录

![image-20230102220200090](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102220200090.png)

我们先看`SecurityConfigurerAdapter`抽象类，该类主要就是维护了一个`objectPostProcessor`，然后遍历其内部的`postProcessors`，调用其`postProcess`方法；提供了一个`and`方法用于进行链式调用

```java
public abstract class SecurityConfigurerAdapter<O, B extends SecurityBuilder<O>> implements SecurityConfigurer<O, B> {

   private B securityBuilder;

   private CompositeObjectPostProcessor objectPostProcessor = new CompositeObjectPostProcessor();
   ...
   public B and() {
      return getBuilder();
   }

   protected final B getBuilder() {
      Assert.state(this.securityBuilder != null, "securityBuilder cannot be null");
      return this.securityBuilder;
   }

   @SuppressWarnings("unchecked")
   protected <T> T postProcess(T object) {
      return (T) this.objectPostProcessor.postProcess(object);
   }
   ...
   public void setBuilder(B builder) {
      this.securityBuilder = builder;
   }
    
   private static final class CompositeObjectPostProcessor implements ObjectPostProcessor<Object> {

      private List<ObjectPostProcessor<?>> postProcessors = new ArrayList<>();

      @Override
      @SuppressWarnings({ "rawtypes", "unchecked" })
      public Object postProcess(Object object) {
         for (ObjectPostProcessor opp : this.postProcessors) {
            Class<?> oppClass = opp.getClass();
            Class<?> oppType = GenericTypeResolver.resolveTypeArgument(oppClass, ObjectPostProcessor.class);
            if (oppType == null || oppType.isAssignableFrom(object.getClass())) {
               object = opp.postProcess(object);
            }
         }
         return object;
      }
      ...
   }

}
```

![image-20230102220422314](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102220422314.png)

`AbstractHttpConfigurer`抽象类有`disable`方法和`withObjectPostProcessor`方法，`disable`方法用于移除配置并返回`HttpSecurityBuilder`用于链式调用。`withObjectPostProcessor`方法会调用`addObjectPostProcessor`方法并返回自己

```java
public abstract class AbstractHttpConfigurer<T extends AbstractHttpConfigurer<T, B>, B extends HttpSecurityBuilder<B>>
      extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, B> {

   /**
    * Disables the {@link AbstractHttpConfigurer} by removing it. After doing so a fresh
    * version of the configuration can be applied.
    * @return the {@link HttpSecurityBuilder} for additional customizations
    */
   @SuppressWarnings("unchecked")
   public B disable() {
      getBuilder().removeConfigurer(getClass());
      return getBuilder();
   }

   @SuppressWarnings("unchecked")
   public T withObjectPostProcessor(ObjectPostProcessor<?> objectPostProcessor) {
      addObjectPostProcessor(objectPostProcessor);
      return (T) this;
   }

}
```

![image-20230102220854227](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102220854227.png)

`AbstractHttpConfigurer`类继承的抽象类`SecurityConfigurerAdapter`的泛型继承于`SecurityBuilder`，`SecurityBuilder`接口有一个抽象类`AbstractConfiguredSecurityBuilder`，其有`removeConfigurer`方法（这个类我们最开始就说过，其`doBuild()`方法会调用子类的`O result = performBuild();`方法，返回构建的对象，`AbstractConfiguredSecurityBuilder`子类有`HttpSecurity`和`WebSecurity`）

```java
@SuppressWarnings("unchecked")
public <C extends SecurityConfigurer<O, B>> C removeConfigurer(Class<C> clazz) {
   List<SecurityConfigurer<O, B>> configs = this.configurers.remove(clazz);
   if (configs == null) {
      return null;
   }
   Assert.state(configs.size() == 1,
         () -> "Only one configurer expected for type " + clazz + ", but got " + configs);
   return (C) configs.get(0);
}
```

![image-20230102221732457](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102221732457.png)

接着我们说`AbstractAuthenticationFilterConfigurer`抽象类，其间接继承`SecurityConfigurer`接口，就必有`init(B builder)`方法和`configure(B builder)`方法，`init(B builder)`方法就是做一些初始化工作就没什么好看的了，直接看`configure(B builder)`方法

```java
@Override
public void configure(B http) throws Exception {
   PortMapper portMapper = http.getSharedObject(PortMapper.class);
   if (portMapper != null) {
      this.authenticationEntryPoint.setPortMapper(portMapper);
   }
   // requestCache用于登录过期重新登陆后返回到上次访问的页面，而不是首页，给用户带来良好的体验
   RequestCache requestCache = http.getSharedObject(RequestCache.class);
   if (requestCache != null) {
      this.defaultSuccessHandler.setRequestCache(requestCache);
   }
   // 设置认证管理器
   this.authFilter.setAuthenticationManager(http.getSharedObject(AuthenticationManager.class));
   // 设置认证成功的处理器
   this.authFilter.setAuthenticationSuccessHandler(this.successHandler);
   // 设置认证失败的处理器
   this.authFilter.setAuthenticationFailureHandler(this.failureHandler);
   if (this.authenticationDetailsSource != null) {
      this.authFilter.setAuthenticationDetailsSource(this.authenticationDetailsSource);
   }
   // session认证策略
   SessionAuthenticationStrategy sessionAuthenticationStrategy = http
         .getSharedObject(SessionAuthenticationStrategy.class);
   if (sessionAuthenticationStrategy != null) {
      this.authFilter.setSessionAuthenticationStrategy(sessionAuthenticationStrategy);
   }
   // 记住我
   RememberMeServices rememberMeServices = http.getSharedObject(RememberMeServices.class);
   if (rememberMeServices != null) {
      this.authFilter.setRememberMeServices(rememberMeServices);
   }
   SecurityContextConfigurer securityContextConfigurer = http.getConfigurer(SecurityContextConfigurer.class);
   if (securityContextConfigurer != null && securityContextConfigurer.isRequireExplicitSave()) {
      SecurityContextRepository securityContextRepository = securityContextConfigurer
            .getSecurityContextRepository();
      this.authFilter.setSecurityContextRepository(securityContextRepository);
   }
   F filter = postProcess(this.authFilter);
   // 添加一个过滤器
   http.addFilter(filter);
}
```

![image-20230102223621051](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102223621051.png)

`FormLoginConfigurer`页没干很多事情，就是初始化了一些参数，然后可以进行配置

```java
@Override
public void init(H http) throws Exception {
   super.init(http);
   initDefaultLoginFilter(http);
}
...
private void initDefaultLoginFilter(H http) {
   // 默认登录页面生成过滤器
   DefaultLoginPageGeneratingFilter loginPageGeneratingFilter = http
         .getSharedObject(DefaultLoginPageGeneratingFilter.class);
   if (loginPageGeneratingFilter != null && !isCustomLoginPage()) {
      loginPageGeneratingFilter.setFormLoginEnabled(true);
      loginPageGeneratingFilter.setUsernameParameter(getUsernameParameter());
      loginPageGeneratingFilter.setPasswordParameter(getPasswordParameter());
      loginPageGeneratingFilter.setLoginPageUrl(getLoginPage());
      loginPageGeneratingFilter.setFailureUrl(getFailureUrl());
      loginPageGeneratingFilter.setAuthenticationUrl(getLoginProcessingUrl());
   }
}
```

![image-20230102223621052](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102223621052.png)

`DefaultLoginPageGeneratingFilter`默认登录页面生成过滤器生成的页面就长下面这样

![image-20230102224841514](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102224841514.png)

如果没有配置的话，控制台会打印如下信息，输出随机生成的密码

```bash
2023-01-02 22:48:17.033  WARN 7692 --- [           main] .s.s.UserDetailsServiceAutoConfiguration : 

Using generated security password: 90655204-f82d-4c49-a7b4-6f14aca7c157

This generated password is for development use only. Your security configuration must be updated before running your application in production.
```

![image-20230102225203468](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102225203468.png)

查看`UserDetailsServiceAutoConfiguration`可以看到默认配置了一个`InMemoryUserDetailsManager`（使用`SecurityProperties`配置类的信息），并且如果密码是自动生成的还会打印密码信息

```java
@Bean
@Lazy
public InMemoryUserDetailsManager inMemoryUserDetailsManager(SecurityProperties properties,
      ObjectProvider<PasswordEncoder> passwordEncoder) {
   SecurityProperties.User user = properties.getUser();
   List<String> roles = user.getRoles();
   return new InMemoryUserDetailsManager(
         User.withUsername(user.getName()).password(getOrDeducePassword(user, passwordEncoder.getIfAvailable()))
               .roles(StringUtils.toStringArray(roles)).build());
}

private String getOrDeducePassword(SecurityProperties.User user, PasswordEncoder encoder) {
   String password = user.getPassword();
   if (user.isPasswordGenerated()) {
      logger.warn(String.format(
            "%n%nUsing generated security password: %s%n%nThis generated password is for development use only. "
                  + "Your security configuration must be updated before running your application in "
                  + "production.%n",
            user.getPassword()));
   }
   if (encoder != null || PASSWORD_ALGORITHM_PATTERN.matcher(password).matches()) {
      return password;
   }
   return NOOP_PASSWORD_PREFIX + password;
}
```

![image-20230102225335189](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102225335189.png)

`org.springframework.boot.autoconfigure.security.SecurityProperties`类的静态内部类`User`里有`name`、`password`、`passwordGenerated`等字段

```java
public static class User {

   /**
    * Default user name.
    */
   private String name = "user";

   /**
    * Password for the default user name.
    */
   private String password = UUID.randomUUID().toString();

   /**
    * Granted roles for the default user name.
    */
   private List<String> roles = new ArrayList<>();

   private boolean passwordGenerated = true;
   ...
}
```

![image-20230102225548176](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102225548176.png)



## 源码调试

```java
@Override
public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {
   if (this.postOnly && !request.getMethod().equals("POST")) {
      throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
   }
   // user
   String username = obtainUsername(request);
   username = (username != null) ? username.trim() : "";
   // 控制台输出的密码
   String password = obtainPassword(request);
   password = (password != null) ? password : "";
   // 封装成UsernamePasswordAuthenticationToken
   UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username,
         password);
   // Allow subclasses to set the "details" property
   // 设置remoteAddress、sessionId等信息
   setDetails(request, authRequest);
   // 调用ProviderManager的authenticate方法
   return this.getAuthenticationManager().authenticate(authRequest);
}
```

![image-20230102230819024](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102230819024.png)

这个`ProviderManager`对象的`providers`里的为`AnonymousAuthenticationProvider`（匿名的认证提供者）不是我们需要的，而`parent`的`providers`里的`DaoAuthenticationProvider`才是我们需要的

![image-20230102231240621](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102231240621.png)

因此首先找自己的`providers`没找到

![image-20230102231630933](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102231630933.png)

然后递归调用其父类的`authenticate`方法

![image-20230102231723596](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102231723596.png)

父类的`DaoAuthenticationProvider`提供者支持

![image-20230102232138900](https://gitlab.com/apzs/image/-/raw/master/image/image-20230102232138900.png)

然后进入到`AbstractUserDetailsAuthenticationProvider`抽象类的`authenticate`方法，其会调用`retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);`方法检索用户

![image-20230103194334392](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103194334392.png)

`retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);`方法为其子类`DaoAuthenticationProvider`实现的，这里面的`UserDetailsService`默认是`InMemoryUserDetailsManager`，即在内存中的用户，`password`里的`{noop}`表示使用的是明文密码

![image-20230103194711965](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103194711965.png)

获取用户信息后准备调用`additionalAuthenticationChecks(user, (UsernamePasswordAuthenticationToken) authentication);`做密码校验

![image-20230103195033174](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103195033174.png)

在这个方法里校验通过了

![image-20230103195204396](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103195204396.png)

然后判断如果不是在缓存中获取的用户信息，将用户信息放入缓存中

![image-20230103195251813](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103195251813.png)

然后调用` createSuccessAuthentication(principalToReturn, authentication, user);`方法，这个方法判断密码需要升级，因此升级密码后再调用父类的`createSuccessAuthentication(principal, authentication, user);`方法

![image-20230103195510794](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103195510794.png)

父类的`createSuccessAuthentication`方法比较简单，调用`UsernamePasswordAuthenticationToken`类的`authenticated`静态方法，返回一个`UsernamePasswordAuthenticationToken`

![image-20230103195653631](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103195653631.png)

在`ProviderManager`类里，认证成功后将密码擦除，然后发布认证成功的消息

![image-20230103195923315](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103195923315.png)

调用`attemptAuthentication(request, response);`方法尝试认证成功后，做认证成功的逻辑

![image-20230103200213215](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103200213215.png)

将认证成功的信息封装到`SecurityContext`里面，然后发布事件，执行`successHandler`成功处理器

![image-20230103200401362](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103200401362.png)

在里面可以重定向到成功页

![image-20230103200544040](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103200544040.png)

## 五、

### SecurityContext

SecurityContext接口提供了与当前线程相关联的最小化安全信息，其方法也比较简单，一个是获取`Authentication`，一个是设置`Authentication`

```java
/**
 * Interface defining the minimum security information associated with the current thread
 * of execution.
 *
 * <p>
 * The security context is stored in a {@link SecurityContextHolder}.
 * </p>
 *
 * @author Ben Alex
 */
public interface SecurityContext extends Serializable {
    
   Authentication getAuthentication();

   void setAuthentication(Authentication authentication);

}
```

![image-20230103201735712](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103201735712.png)

`SecurityContext`接口的常用实现了`SecurityContextImpl`非常简单，就是维护一个`Authentication`

```java
public class SecurityContextImpl implements SecurityContext {

   private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

   private Authentication authentication;

   public SecurityContextImpl() {
   }

   public SecurityContextImpl(Authentication authentication) {
      this.authentication = authentication;
   }

   @Override
   public boolean equals(Object obj) {
      if (obj instanceof SecurityContextImpl) {
         SecurityContextImpl other = (SecurityContextImpl) obj;
         if ((this.getAuthentication() == null) && (other.getAuthentication() == null)) {
            return true;
         }
         if ((this.getAuthentication() != null) && (other.getAuthentication() != null)
               && this.getAuthentication().equals(other.getAuthentication())) {
            return true;
         }
      }
      return false;
   }

   @Override
   public Authentication getAuthentication() {
      return this.authentication;
   }

   @Override
   public int hashCode() {
      return ObjectUtils.nullSafeHashCode(this.authentication);
   }

   @Override
   public void setAuthentication(Authentication authentication) {
      this.authentication = authentication;
   }

   @Override
   public String toString() {
      StringBuilder sb = new StringBuilder();
      sb.append(getClass().getSimpleName()).append(" [");
      if (this.authentication == null) {
         sb.append("Null authentication");
      }
      else {
         sb.append("Authentication=").append(this.authentication);
      }
      sb.append("]");
      return sb.toString();
   }

}
```

![image-20230103204042981](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103204042981.png)

### SecurityContextHolder

`SecurityContextHolder`维护一个`SecurityContext`，提供了增删查改方法，不过该类也不真正实现，全部委托给`SecurityContextHolderStrategy`安全上下文拥有者策略去实现

![image-20230103202430076](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103202430076.png)

### SecurityContextHolderStrategy

在`SecurityContextHolderStrategy`接口里主要定义了获取、修改、删除`SecurityContext`的方法

```java
public interface SecurityContextHolderStrategy {

   void clearContext();

   SecurityContext getContext();

   void setContext(SecurityContext context);

   SecurityContext createEmptyContext();

}
```

![image-20230103203409008](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103203409008.png)

我们常常用到的是`ThreadLocalSecurityContextHolderStrategy`，这个类也非常简单，就是从`ThreadLocal`里获取、修改、删除`SecurityContext`

```java
final class ThreadLocalSecurityContextHolderStrategy implements SecurityContextHolderStrategy {

   private static final ThreadLocal<SecurityContext> contextHolder = new ThreadLocal<>();

   @Override
   public void clearContext() {
      contextHolder.remove();
   }

   @Override
   public SecurityContext getContext() {
      SecurityContext ctx = contextHolder.get();
      if (ctx == null) {
         ctx = createEmptyContext();
         contextHolder.set(ctx);
      }
      return ctx;
   }

   @Override
   public void setContext(SecurityContext context) {
      Assert.notNull(context, "Only non-null SecurityContext instances are permitted");
      contextHolder.set(context);
   }

   @Override
   public SecurityContext createEmptyContext() {
      return new SecurityContextImpl();
   }

}
```

![image-20230103203723012](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103203723012.png)

那我们怎么知道默认使用的是`ThreadLocalSecurityContextHolderStrategy`呢？

查看`SecurityContextHolder`的静态代码块，可以看到其会调用`initialize();`方法，而`initialize();`方法又会调用`initializeStrategy()`方法，如果没有设置系统属性，则默认使用`ThreadLocalSecurityContextHolderStrategy()`

```java
public class SecurityContextHolder {

   public static final String MODE_THREADLOCAL = "MODE_THREADLOCAL";

   public static final String MODE_INHERITABLETHREADLOCAL = "MODE_INHERITABLETHREADLOCAL";

   public static final String MODE_GLOBAL = "MODE_GLOBAL";

   private static final String MODE_PRE_INITIALIZED = "MODE_PRE_INITIALIZED";

   public static final String SYSTEM_PROPERTY = "spring.security.strategy";

   private static String strategyName = System.getProperty(SYSTEM_PROPERTY);

   private static SecurityContextHolderStrategy strategy;

   private static int initializeCount = 0;

   static {
      initialize();
   }

   private static void initialize() {
      initializeStrategy();
      initializeCount++;
   }

   private static void initializeStrategy() {
      // 如果配置的strategyName为MODE_PRE_INITIALIZED表示已经设置过策略了，直接返回
      if (MODE_PRE_INITIALIZED.equals(strategyName)) {
         Assert.state(strategy != null, "When using " + MODE_PRE_INITIALIZED
               + ", setContextHolderStrategy must be called with the fully constructed strategy");
         return;
      }
      // 如果strategyName没有内容，则将strategyName设置为MODE_THREADLOCAL
      if (!StringUtils.hasText(strategyName)) {
         // Set default
         strategyName = MODE_THREADLOCAL;
      }
      // 如果strategyName为MODE_THREADLOCAL，设置策略为ThreadLocalSecurityContextHolderStrategy()
      if (strategyName.equals(MODE_THREADLOCAL)) {
         strategy = new ThreadLocalSecurityContextHolderStrategy();
         return;
      }
      // 如果strategyName为MODE_INHERITABLETHREADLOCAL，设置策略为InheritableThreadLocalSecurityContextHolderStrategy() (线程可以被继承，即创建新的线程执行任务的时候，可以继承父线程的ThreadLocal的信息)
      if (strategyName.equals(MODE_INHERITABLETHREADLOCAL)) {
         strategy = new InheritableThreadLocalSecurityContextHolderStrategy();
         return;
      }
      // 如果strategyName为MODE_GLOBAL,设置策略为GlobalSecurityContextHolderStrategy()（全局就一个上下文，一般不会用到）
      if (strategyName.equals(MODE_GLOBAL)) {
         strategy = new GlobalSecurityContextHolderStrategy();
         return;
      }
      // Try to load a custom strategy
      try {
         Class<?> clazz = Class.forName(strategyName);
         Constructor<?> customStrategy = clazz.getConstructor();
         strategy = (SecurityContextHolderStrategy) customStrategy.newInstance();
      }
      catch (Exception ex) {
         ReflectionUtils.handleReflectionException(ex);
      }
   }
   ...
}
```

![image-20230103204531604](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103204531604.png)

### SecurityContextRepository

用于持久化存储`SecurityContext`的策略，让用户第一次请求登陆后，下次请求不用再次登录

`SecurityContextRepository`接口主要有加载上下文、保存上下文、判断上下文中是否有`SecurityContext`等方法，自定义实现该接口比较常用（比如分布式系统中，将用户信息保存在`redis`中，在`redis`里获取用户信息）

```java
public interface SecurityContextRepository {

   @Deprecated
   SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder);

   default Supplier<SecurityContext> loadContext(HttpServletRequest request) {
      return SingletonSupplier.of(() -> loadContext(new HttpRequestResponseHolder(request, null)));
   }

   void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response);

   boolean containsContext(HttpServletRequest request);

}
```

![image-20230103210504362](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103210504362.png)

### SecurityContextPersistenceFilter

`SecurityContextPersistenceFilter`：安全上下文持久化过滤器，根据`SecurityContextRepository`的信息填充`SecurityContextHolder`，这个类已经被弃用了，推荐使用`SecurityContextHolderFilter`

![image-20230103211114688](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103211114688.png)

这个类里最重要的就是`doFilter`方法

```java
@Deprecated
public class SecurityContextPersistenceFilter extends GenericFilterBean {

   static final String FILTER_APPLIED = "__spring_security_scpf_applied";

   private SecurityContextRepository repo;

   private boolean forceEagerSessionCreation = false;

   public SecurityContextPersistenceFilter() {
      this(new HttpSessionSecurityContextRepository());
   }

   public SecurityContextPersistenceFilter(SecurityContextRepository repo) {
      this.repo = repo;
   }

   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
   }

   private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      // 确保每个请求只应用一次过滤器
      // ensure that filter is only applied once per request
      if (request.getAttribute(FILTER_APPLIED) != null) {
         chain.doFilter(request, response);
         return;
      }
      request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
      if (this.forceEagerSessionCreation) {
         HttpSession session = request.getSession();
         if (this.logger.isDebugEnabled() && session.isNew()) {
            this.logger.debug(LogMessage.format("Created session %s eagerly", session.getId()));
         }
      }
      HttpRequestResponseHolder holder = new HttpRequestResponseHolder(request, response);
      // 从SecurityContextRepository里加载SecurityContext
      SecurityContext contextBeforeChainExecution = this.repo.loadContext(holder);
      try {
         // 向SecurityContextHolder里设置SecurityContext信息
         SecurityContextHolder.setContext(contextBeforeChainExecution);
         if (contextBeforeChainExecution.getAuthentication() == null) {
            logger.debug("Set SecurityContextHolder to empty SecurityContext");
         }
         else {
            if (this.logger.isDebugEnabled()) {
               this.logger
                     .debug(LogMessage.format("Set SecurityContextHolder to %s", contextBeforeChainExecution));
            }
         }
         chain.doFilter(holder.getRequest(), holder.getResponse());
      }
      finally {
         // 将SecurityContextHolder里的SecurityContext拿出来
         SecurityContext contextAfterChainExecution = SecurityContextHolder.getContext();
         // Crucial removal of SecurityContextHolder contents before anything else.
         // 将SecurityContext从SecurityContextHolder里清除掉，为什么要清除呢？因为默认使用的策略是ThreadLocalSecurityContextHolderStrategy()，如果不清除的话，容易造成内存泄漏
         SecurityContextHolder.clearContext();
         // 将SecurityContext保存到仓库中
         this.repo.saveContext(contextAfterChainExecution, holder.getRequest(), holder.getResponse());
         request.removeAttribute(FILTER_APPLIED);
         this.logger.debug("Cleared SecurityContextHolder to complete request");
      }
   }

   public void setForceEagerSessionCreation(boolean forceEagerSessionCreation) {
      this.forceEagerSessionCreation = forceEagerSessionCreation;
   }

}
```

![image-20230103211815527](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103211815527.png)

### SecurityContextHolderFilter

`SecurityContextPersistenceFilter`类被弃用，推荐使用`SecurityContextHolderFilter`类

一个使用 SecurityContextRepository 获取 SecurityContext 并将其设置在 SecurityContextHolder 上的 javax.servlet.Filter。 类似于 SecurityContextPersistenceFilter，除了必须显式调用 SecurityContextRepository.saveContext(SecurityContext, HttpServletRequest, HttpServletResponse) 来保存 SecurityContext。 通过允许不同的身份验证机制单独选择是否应保留身份验证，这提高了效率并提供了更好的灵活性。（意思就是我们使用这个类需要手动调用` SecurityContextRepository`类的`saveContext`方法）

这个类比`SecurityContextPersistenceFilter`简单，主要少了将SecurityContext保存到仓库中这一步，因此需要我们手动调用`SecurityContextRepository`类的`saveContext`方法

```java
/**
 * A {@link javax.servlet.Filter} that uses the {@link SecurityContextRepository} to
 * obtain the {@link SecurityContext} and set it on the {@link SecurityContextHolder}.
 * This is similar to {@link SecurityContextPersistenceFilter} except that the
 * {@link SecurityContextRepository#saveContext(SecurityContext, HttpServletRequest, HttpServletResponse)}
 * must be explicitly invoked to save the {@link SecurityContext}. This improves the
 * efficiency and provides better flexibility by allowing different authentication
 * mechanisms to choose individually if authentication should be persisted.
 */
public class SecurityContextHolderFilter extends OncePerRequestFilter {

   private final SecurityContextRepository securityContextRepository;

   private boolean shouldNotFilterErrorDispatch;

   /**
    * Creates a new instance.
    * @param securityContextRepository the repository to use. Cannot be null.
    */
   public SecurityContextHolderFilter(SecurityContextRepository securityContextRepository) {
      Assert.notNull(securityContextRepository, "securityContextRepository cannot be null");
      this.securityContextRepository = securityContextRepository;
   }

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {
      // 从SecurityContextRepository里加载SecurityContext
      SecurityContext securityContext = this.securityContextRepository.loadContext(request).get();
      try {
         // 向SecurityContextHolder里设置SecurityContext信息
         SecurityContextHolder.setContext(securityContext);
         filterChain.doFilter(request, response);
      }
      finally {
         // 将SecurityContext从SecurityContextHolder里清除掉
         SecurityContextHolder.clearContext();
      }
   }
   ...
}
```

![image-20230103213205884](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103213205884.png)

### SecurityContextConfigurer

这个类主要就是用来配置`SecurityContextHolderFilter`和`SecurityContextPersistenceFilter`的

![image-20230103214326767](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103214326767.png)

```java
@Override
@SuppressWarnings("unchecked")
public void configure(H http) {
   SecurityContextRepository securityContextRepository = getSecurityContextRepository();
   // 如果要求显式保存（自己手动保存到SecurityContextRepository里），就使用SecurityContextHolderFilter
   if (this.requireExplicitSave) {
      SecurityContextHolderFilter securityContextHolderFilter = postProcess(
            new SecurityContextHolderFilter(securityContextRepository));
      http.addFilter(securityContextHolderFilter);
   }
   else {
      // 不要显示保存，就使用SecurityContextPersistenceFilter
      SecurityContextPersistenceFilter securityContextFilter = new SecurityContextPersistenceFilter(
            securityContextRepository);
      SessionManagementConfigurer<?> sessionManagement = http.getConfigurer(SessionManagementConfigurer.class);
      SessionCreationPolicy sessionCreationPolicy = (sessionManagement != null)
            ? sessionManagement.getSessionCreationPolicy() : null;
      if (SessionCreationPolicy.ALWAYS == sessionCreationPolicy) {
         securityContextFilter.setForceEagerSessionCreation(true);
         http.addFilter(postProcess(new ForceEagerSessionCreationFilter()));
      }
      securityContextFilter = postProcess(securityContextFilter);
      http.addFilter(securityContextFilter);
   }
}
```

![image-20230103213901854](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103213901854.png)

### FilterChainProxy

Spring Security的核心就是`FilterChainProxy`，里面维护了一堆的`SecurityFilterChain`

![image-20230103214538781](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103214538781.png)

在`HttpSecurity`类的`performBuild`方法里返回了一个默认的`SecurityFilterChain`

```java
@SuppressWarnings("unchecked")
@Override
protected DefaultSecurityFilterChain performBuild() {
   ExpressionUrlAuthorizationConfigurer<?> expressionConfigurer = getConfigurer(
         ExpressionUrlAuthorizationConfigurer.class);
   AuthorizeHttpRequestsConfigurer<?> httpConfigurer = getConfigurer(AuthorizeHttpRequestsConfigurer.class);
   boolean oneConfigurerPresent = expressionConfigurer == null ^ httpConfigurer == null;
   Assert.state((expressionConfigurer == null && httpConfigurer == null) || oneConfigurerPresent,
         "authorizeHttpRequests cannot be used in conjunction with authorizeRequests. Please select just one.");
   this.filters.sort(OrderComparator.INSTANCE);
   List<Filter> sortedFilters = new ArrayList<>(this.filters.size());
   for (Filter filter : this.filters) {
      sortedFilters.add(((OrderedFilter) filter).filter);
   }
   return new DefaultSecurityFilterChain(this.requestMatcher, sortedFilters);
}
```

![image-20230103214727211](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103214727211.png)

而在`WebSecurity`的`performBuild`方法里返回了一个`FilterChainProxy`

```java
@Override
protected Filter performBuild() throws Exception {
   Assert.state(!this.securityFilterChainBuilders.isEmpty(),
         () -> "At least one SecurityBuilder<? extends SecurityFilterChain> needs to be specified. "
               + "Typically this is done by exposing a SecurityFilterChain bean. "
               + "More advanced users can invoke " + WebSecurity.class.getSimpleName()
               + ".addSecurityFilterChainBuilder directly");
   int chainSize = this.ignoredRequests.size() + this.securityFilterChainBuilders.size();
   List<SecurityFilterChain> securityFilterChains = new ArrayList<>(chainSize);
   List<RequestMatcherEntry<List<WebInvocationPrivilegeEvaluator>>> requestMatcherPrivilegeEvaluatorsEntries = new ArrayList<>();
   // 将忽略拦截的请求路径放到SecurityFilterChain里
   for (RequestMatcher ignoredRequest : this.ignoredRequests) {
      WebSecurity.this.logger.warn("You are asking Spring Security to ignore " + ignoredRequest
            + ". This is not recommended -- please use permitAll via HttpSecurity#authorizeHttpRequests instead.");
      SecurityFilterChain securityFilterChain = new DefaultSecurityFilterChain(ignoredRequest);
      securityFilterChains.add(securityFilterChain);
      requestMatcherPrivilegeEvaluatorsEntries
            .add(getRequestMatcherPrivilegeEvaluatorsEntry(securityFilterChain));
   }
   for (SecurityBuilder<? extends SecurityFilterChain> securityFilterChainBuilder : this.securityFilterChainBuilders) {
      SecurityFilterChain securityFilterChain = securityFilterChainBuilder.build();
      securityFilterChains.add(securityFilterChain);
      requestMatcherPrivilegeEvaluatorsEntries
            .add(getRequestMatcherPrivilegeEvaluatorsEntry(securityFilterChain));
   }
   if (this.privilegeEvaluator == null) {
      this.privilegeEvaluator = new RequestMatcherDelegatingWebInvocationPrivilegeEvaluator(
            requestMatcherPrivilegeEvaluatorsEntries);
   }
   // 使用securityFilterChains创建FilterChainProxydui'xia
   FilterChainProxy filterChainProxy = new FilterChainProxy(securityFilterChains);
   if (this.httpFirewall != null) {
      filterChainProxy.setFirewall(this.httpFirewall);
   }
   if (this.requestRejectedHandler != null) {
      filterChainProxy.setRequestRejectedHandler(this.requestRejectedHandler);
   }
   filterChainProxy.afterPropertiesSet();

   Filter result = filterChainProxy;
   if (this.debugEnabled) {
      this.logger.warn("\n\n" + "********************************************************************\n"
            + "**********        Security debugging is enabled.       *************\n"
            + "**********    This may include sensitive information.  *************\n"
            + "**********      Do not use in a production system!     *************\n"
            + "********************************************************************\n\n");
      result = new DebugFilter(filterChainProxy);
   }
   this.postBuildAction.run();
   return result;
}
```

![image-20230103215058677](https://gitlab.com/apzs/image/-/raw/master/image/image-20230103215058677.png)

## 六.

### RememberMeAuthenticationFilter

```java
private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {
   // 已经认证过了，不需要再次认证了，直接放行
   if (SecurityContextHolder.getContext().getAuthentication() != null) {
      this.logger.debug(LogMessage
            .of(() -> "SecurityContextHolder not populated with remember-me token, as it already contained: '"
                  + SecurityContextHolder.getContext().getAuthentication() + "'"));
      chain.doFilter(request, response);
      return;
   }
   // 首先调用RememberMeServices类的autoLogin方法，获得Authentication
   Authentication rememberMeAuth = this.rememberMeServices.autoLogin(request, response);
   if (rememberMeAuth != null) {
      // Attempt authenticaton via AuthenticationManager
      try {
         // 调用authenticationManager的authenticate方法进行认证，如果认证失败会抛出AuthenticationException
         rememberMeAuth = this.authenticationManager.authenticate(rememberMeAuth);
         // Store to SecurityContextHolder
         SecurityContext context = SecurityContextHolder.createEmptyContext();
         context.setAuthentication(rememberMeAuth);
         // 将SecurityContext保存到SecurityContextHolder里
         SecurityContextHolder.setContext(context);
         onSuccessfulAuthentication(request, response, rememberMeAuth);
         this.logger.debug(LogMessage.of(() -> "SecurityContextHolder populated with remember-me token: '"
               + SecurityContextHolder.getContext().getAuthentication() + "'"));
         // 将登录信息保存到仓库里
         this.securityContextRepository.saveContext(context, request, response);
         // 发布交互式身份验证成功事件
         if (this.eventPublisher != null) {
            this.eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(
                  SecurityContextHolder.getContext().getAuthentication(), this.getClass()));
         }
         // 登录成功后的处理
         if (this.successHandler != null) {
            this.successHandler.onAuthenticationSuccess(request, response, rememberMeAuth);
            return;
         }
      }
      catch (AuthenticationException ex) {
         this.logger.debug(LogMessage
               .format("SecurityContextHolder not populated with remember-me token, as AuthenticationManager "
                     + "rejected Authentication returned by RememberMeServices: '%s'; "
                     + "invalidating remember-me token", rememberMeAuth),
               ex);
         // 通知登录失败
         this.rememberMeServices.loginFail(request, response);
         // 认证失败，内容为空，意思就是认证失败了也不继续抛异常了，接着调用chain.doFilter(request, response);继续往后面的逻辑走，让用户登录即可（只是尝试登录一下，即便没有登录成功也不要紧，不直接将线程终止掉）
         onUnsuccessfulAuthentication(request, response, ex);
      }
   }
   chain.doFilter(request, response);
}
```

![image-20230104203745475](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104203745475.png)

### RememberMeServices

`RememberMeServices`接口有`3`个方法，`autoLogin`方法用于构造一个`Authentication`（这个`Authentication`必须要`AuthenticationManager`和`AuthenticationProvider`所接受，推荐使用`RememberMeAuthenticationToken`），然后拿着`Authentication`尝试调用`authenticationManager.authenticate(Authentication authentication)`去登录，`loginFail`就是登录失败的处理，`loginSuccess`就是登录成功的处理

```java
public interface RememberMeServices {

	/**
	 * The returned <code>Authentication</code> must be acceptable to
	 * {@link org.springframework.security.authentication.AuthenticationManager} or
	 * {@link org.springframework.security.authentication.AuthenticationProvider} defined
	 * by the web application. It is recommended
	 * {@link org.springframework.security.authentication.RememberMeAuthenticationToken}
	 * be used in most cases, as it has a corresponding authentication provider.
	 * @param request to look for a remember-me token within
	 * @param response to change, cancel or modify the remember-me token
	 * @return a valid authentication object, or <code>null</code> if the request should
	 * not be authenticated
	 */
	Authentication autoLogin(HttpServletRequest request, HttpServletResponse response);

	void loginFail(HttpServletRequest request, HttpServletResponse response);

	void loginSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication successfulAuthentication);

}

```

![image-20230104204536982](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104204536982.png)

### RememberMeAuthenticationToken

`RememberMeAuthenticationToken`继承自`AbstractAuthenticationToken`（`UsernamePasswordAuthenticationToken`也继承自`AbstractAuthenticationToken`）

![image-20230104205137142](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104205137142.png)

`UsernamePasswordAuthenticationToken`的继承结构

![image-20230104205239718](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104205239718.png)

`RememberMeAuthenticationToken`比较简单，不管是哪个构造方法，只要`authorities`权限信息传过来，就认为是已经认证的状态了

```java
public class RememberMeAuthenticationToken extends AbstractAuthenticationToken {

   private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;
   // 主体
   private final Object principal;

   private final int keyHash;

   public RememberMeAuthenticationToken(String key, Object principal,
         Collection<? extends GrantedAuthority> authorities) {
      // 设置权限
      super(authorities);
      if ((key == null) || ("".equals(key)) || (principal == null) || "".equals(principal)) {
         throw new IllegalArgumentException("Cannot pass null or empty values to constructor");
      }
      this.keyHash = key.hashCode();
      this.principal = principal;
      // 设置已经认证过了
      setAuthenticated(true);
   }

   private RememberMeAuthenticationToken(Integer keyHash, Object principal,
         Collection<? extends GrantedAuthority> authorities) {
      // 设置权限
      super(authorities);
      this.keyHash = keyHash;
      this.principal = principal;
      // 设置已经认证过了
      setAuthenticated(true);
   }
   ...
}
```

![image-20230104205712263](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104205712263.png)

`AbstractAuthenticationToken`类比较简单，就权限信息、详情、是否已认证 这3个信息

```java
public abstract class AbstractAuthenticationToken implements Authentication, CredentialsContainer {
   // 权限信息
   private final Collection<GrantedAuthority> authorities;
   // 详情
   private Object details;
   // 是否已经认证了
   private boolean authenticated = false;
   
   ...
}
```

![image-20230104205421786](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104205421786.png)

### RememberMeAuthenticationProvider

`AuthenticationProvider`接口有一个实现类叫`RememberMeAuthenticationProvider`，因此`RememberMeAuthenticationToken`的这个`Authentication`肯定能被`AuthenticationProvider`接口的实现类`RememberMeAuthenticationProvider`所接受。

`AuthenticationProvider`这个接口我们以前提到过，就是`ProviderManager`类的构造方法需要传递`AuthenticationProvider`集合，这个接口有两个方法，一个是`supports`方法，判断是否支持；另一个是`authenticate`执行认证逻辑。这是经典的策略模式，先判断是否支持，然后再调用具体的业务方法。

```java
public interface AuthenticationProvider {

   Authentication authenticate(Authentication authentication) throws AuthenticationException;

   boolean supports(Class<?> authentication);

}
```

![image-20230104211734834](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104211734834.png)

因此`RememberMeAuthenticationProvider`类最重要的就是`authenticate`、`supports`这两个方法了

```java
public class RememberMeAuthenticationProvider implements AuthenticationProvider, InitializingBean, MessageSourceAware {

   protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

   private String key;
   ...
   @Override
   public Authentication authenticate(Authentication authentication) throws AuthenticationException {
      // 首先判断是否支持想要授权的类（其实执行authenticate方法之前肯定会判断是否支持的，只有支持了才会调用authenticate方法，不过这里判断一下也行）
      if (!supports(authentication.getClass())) {
         return null;
      }
      // 判断key的hashCode()和authentication.getKeyHash()是否相同，不相同直接抛出异常
      if (this.key.hashCode() != ((RememberMeAuthenticationToken) authentication).getKeyHash()) {
         throw new BadCredentialsException(this.messages.getMessage("RememberMeAuthenticationProvider.incorrectKey",
               "The presented RememberMeAuthenticationToken does not contain the expected key"));
      }
      return authentication;
   }

   ...
   @Override
   public boolean supports(Class<?> authentication) {
      // 如果传来的authentication是RememberMeAuthenticationToken就支持
      return (RememberMeAuthenticationToken.class.isAssignableFrom(authentication));
   }

}
```

![image-20230104211344976](https://gitlab.com/apzs/image/-/raw/master/image/image-20230104211344976.png)

### AbstractRememberMeServices

`AbstractRememberMeServices`抽象类实现了`RememberMeServices`接口，`AbstractRememberMeServices`抽象类的实现类有两个，分别是`PersistentTokenBasedRememberMeServices`（持久化的）和`TokenBasedRememberMeServices` （非持久化的）

```java
public abstract class AbstractRememberMeServices
      implements RememberMeServices, InitializingBean, LogoutHandler, MessageSourceAware {

   public static final String SPRING_SECURITY_REMEMBER_ME_COOKIE_KEY = "remember-me";
   public static final String DEFAULT_PARAMETER = "remember-me";
   public static final int TWO_WEEKS_S = 1209600;
   private static final String DELIMITER = ":";
   ...
   private UserDetailsService userDetailsService;
   private UserDetailsChecker userDetailsChecker = new AccountStatusUserDetailsChecker();
   ...   
   @Override
   public final Authentication autoLogin(HttpServletRequest request, HttpServletResponse response) {
      // 获取key为remember-me的cookie
      String rememberMeCookie = extractRememberMeCookie(request);
      // 如果没有这个cookie直接返回null
      if (rememberMeCookie == null) {
         return null;
      }
      this.logger.debug("Remember-me cookie detected");
      if (rememberMeCookie.length() == 0) {
         this.logger.debug("Cookie was empty");
         // 删除key为remember-me的cookie
         // 将key为remember-me的cookie的值设为null,并设置maxAge为0（设置maxAge表示删除这个cookie）
         cancelCookie(request, response);
         return null;
      }
      try {
         // 解码为BASE64编码
         String[] cookieTokens = decodeCookie(rememberMeCookie);
         // 处理自动登录的cookie（最重要的方法，该方法为抽象方法，留给子类去实现）
         UserDetails user = processAutoLoginCookie(cookieTokens, request, response);
         // 检查用户状态 （登陆过期、已停用 等状态）
         this.userDetailsChecker.check(user);
         this.logger.debug("Remember-me cookie accepted");
         // 创建成功的认证
         return createSuccessfulAuthentication(request, user);
      }
      catch (CookieTheftException ex) {
         cancelCookie(request, response);
         throw ex;
      }
      catch (UsernameNotFoundException ex) {
         this.logger.debug("Remember-me login was valid but corresponding user not found.", ex);
      }
      catch (InvalidCookieException ex) {
         this.logger.debug("Invalid remember-me cookie: " + ex.getMessage());
      }
      catch (AccountStatusException ex) {
         this.logger.debug("Invalid UserDetails: " + ex.getMessage());
      }
      catch (RememberMeAuthenticationException ex) {
         this.logger.debug(ex.getMessage());
      }
      cancelCookie(request, response);
      return null;
   }

   // 获取key为remember-me的cookie
   protected String extractRememberMeCookie(HttpServletRequest request) {
      Cookie[] cookies = request.getCookies();
      if ((cookies == null) || (cookies.length == 0)) {
         return null;
      }
      // 获取key为remember-me的cookie
      for (Cookie cookie : cookies) {
         if (this.cookieName.equals(cookie.getName())) {
            return cookie.getValue();
         }
      }
      return null;
   }
  
   protected Authentication createSuccessfulAuthentication(HttpServletRequest request, UserDetails user) {
      // RememberMeAuthenticationToken的构造方法里只要将将用户的权限传进去，则构造方法里会设置认证成功
      RememberMeAuthenticationToken auth = new RememberMeAuthenticationToken(this.key, user,
            this.authoritiesMapper.mapAuthorities(user.getAuthorities()));
      auth.setDetails(this.authenticationDetailsSource.buildDetails(request));
      return auth;
   }

   /**
    * Decodes the cookie and splits it into a set of token strings using the ":" delimiter.
    * @param cookieValue the value obtained from the submitted cookie
    * @return the array of tokens.
    * @throws InvalidCookieException if the cookie was not base64 encoded.
    */
   protected String[] decodeCookie(String cookieValue) throws InvalidCookieException {
      // 将字符串后面缺少的"="补齐，使其能被4整除 (2的4次方等于64)
      for (int j = 0; j < cookieValue.length() % 4; j++) {
         cookieValue = cookieValue + "=";
      }
      String cookieAsPlainText;
      try {
         // 将cookieValue使用Base64编码进行解码
         cookieAsPlainText = new String(Base64.getDecoder().decode(cookieValue.getBytes()));
      }
      catch (IllegalArgumentException ex) {
         throw new InvalidCookieException("Cookie token was not Base64 encoded; value was '" + cookieValue + "'");
      }
      // 将解码后的字符串使用:（冒号）做分隔符，分割成字符串数组
      String[] tokens = StringUtils.delimitedListToStringArray(cookieAsPlainText, DELIMITER);
      for (int i = 0; i < tokens.length; i++) {
         try {
            // 将分割后的字符串数组里的每一项使用URL解码工具解码
            tokens[i] = URLDecoder.decode(tokens[i], StandardCharsets.UTF_8.toString());
         }
         catch (UnsupportedEncodingException ex) {
            this.logger.error(ex.getMessage(), ex);
         }
      }
      return tokens;
   }

  
   protected abstract UserDetails processAutoLoginCookie(String[] cookieTokens, HttpServletRequest request,
         HttpServletResponse response) throws RememberMeAuthenticationException, UsernameNotFoundException;


   // 删除key为remember-me的cookie
   protected void cancelCookie(HttpServletRequest request, HttpServletResponse response) {
      this.logger.debug("Cancelling cookie");
      // 将key为remember-me的cookie的值设为null
      Cookie cookie = new Cookie(this.cookieName, null);
      // 设置maxAge为0（设置maxAge表示删除这个cookie）
      cookie.setMaxAge(0);
      cookie.setPath(getCookiePath(request));
      if (this.cookieDomain != null) {
         cookie.setDomain(this.cookieDomain);
      }
      cookie.setSecure((this.useSecureCookie != null) ? this.useSecureCookie : request.isSecure());
      response.addCookie(cookie);
   }
   ...
}
```

![image-20230105195802217](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105195802217.png)

#### TokenBasedRememberMeServices

```java
public class TokenBasedRememberMeServices extends AbstractRememberMeServices {
   ...
   @Override
   protected UserDetails processAutoLoginCookie(String[] cookieTokens, HttpServletRequest request,
         HttpServletResponse response) {
      // cookieTokens的长度必须为3
      if (cookieTokens.length != 3) {
         throw new InvalidCookieException(
               "Cookie token did not contain 3" + " tokens, but contained '" + Arrays.asList(cookieTokens) + "'");
      }
      // 获取token的过期时间，值为cookieTokens[1]，即数组里第二个数
      long tokenExpiryTime = getTokenExpiryTime(cookieTokens);
      // 判断是否过期（过期时间小于当前系统时间），过期了就抛出异常
      if (isTokenExpired(tokenExpiryTime)) {
         throw new InvalidCookieException("Cookie token[1] has expired (expired on '" + new Date(tokenExpiryTime)
               + "'; current time is '" + new Date() + "')");
      }
      // Check the user exists. Defer lookup until after expiry time checked, to
      // possibly avoid expensive database call.
      // cookieTokens[0]为用户名，根据用户名获取用户信息
      UserDetails userDetails = getUserDetailsService().loadUserByUsername(cookieTokens[0]);
      Assert.notNull(userDetails, () -> "UserDetailsService " + getUserDetailsService()
            + " returned null for username " + cookieTokens[0] + ". " + "This is an interface contract violation");
      // Check signature of token matches remaining details. Must do this after user
      // lookup, as we need the DAO-derived password. If efficiency was a major issue,
      // just add in a UserCache implementation, but recall that this method is usually
      // only called once per HttpSession - if the token is valid, it will cause
      // SecurityContextHolder population, whilst if invalid, will cause the cookie to
      // be cancelled.
      // 构造token签名
      String expectedTokenSignature = makeTokenSignature(tokenExpiryTime, userDetails.getUsername(),
            userDetails.getPassword());
      // 判断签名是否和cookieTokens[2]的值相同
      if (!equals(expectedTokenSignature, cookieTokens[2])) {
         throw new InvalidCookieException("Cookie token[2] contained signature '" + cookieTokens[2]
               + "' but expected '" + expectedTokenSignature + "'");
      }
      return userDetails;
   }
   // 获取token的过期时间
   private long getTokenExpiryTime(String[] cookieTokens) {
      try {
         return new Long(cookieTokens[1]);
      }
      catch (NumberFormatException nfe) {
         throw new InvalidCookieException(
               "Cookie token[1] did not contain a valid number (contained '" + cookieTokens[1] + "')");
      }
   }

   /**
    * Calculates the digital signature to be put in the cookie. Default value is MD5
    * ("username:tokenExpiryTime:password:key")  构造token签名
    */
   protected String makeTokenSignature(long tokenExpiryTime, String username, String password) {
      String data = username + ":" + tokenExpiryTime + ":" + password + ":" + getKey();
      try {
         // java.security.MessageDigest信息摘要类（使用MD5算法）
         MessageDigest digest = MessageDigest.getInstance("MD5");
         // 转为16进制
         return new String(Hex.encode(digest.digest(data.getBytes())));
      }
      catch (NoSuchAlgorithmException ex) {
         throw new IllegalStateException("No MD5 algorithm available!");
      }
   }
   // 判断token是否过期
   protected boolean isTokenExpired(long tokenExpiryTime) {
      return tokenExpiryTime < System.currentTimeMillis();
   }
   ...
}
```

![image-20230105195846642](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105195846642.png)

#### PersistentTokenBasedRememberMeServices

`PersistentTokenBasedRememberMeServices`和`TokenBasedRememberMeServices`很类似，只不过`PersistentTokenBasedRememberMeServices`可以持久化，`TokenBasedRememberMeServices`不可以持久化；`PersistentTokenBasedRememberMeServices`的`cookieTokens`长度为`2`，`TokenBasedRememberMeServices`的`cookieTokens`长度为`3`。核心代码都是调用`UserDetailsService`类的`loadUserByUsername`方法，根据用户名查询`UserDetails`

```java
public class PersistentTokenBasedRememberMeServices extends AbstractRememberMeServices {

   private PersistentTokenRepository tokenRepository = new InMemoryTokenRepositoryImpl();
    
   ...
       
   @Override
   protected UserDetails processAutoLoginCookie(String[] cookieTokens, HttpServletRequest request,
         HttpServletResponse response) {
      if (cookieTokens.length != 2) {
         throw new InvalidCookieException("Cookie token did not contain " + 2 + " tokens, but contained '"
               + Arrays.asList(cookieTokens) + "'");
      }
      String presentedSeries = cookieTokens[0];
      String presentedToken = cookieTokens[1];
      PersistentRememberMeToken token = this.tokenRepository.getTokenForSeries(presentedSeries);
      if (token == null) {
         // No series match, so we can't authenticate using this cookie
         throw new RememberMeAuthenticationException("No persistent token found for series id: " + presentedSeries);
      }
      // We have a match for this user/series combination
      if (!presentedToken.equals(token.getTokenValue())) {
         // Token doesn't match series value. Delete all logins for this user and throw
         // an exception to warn them.
         this.tokenRepository.removeUserTokens(token.getUsername());
         throw new CookieTheftException(this.messages.getMessage(
               "PersistentTokenBasedRememberMeServices.cookieStolen",
               "Invalid remember-me token (Series/token) mismatch. Implies previous cookie theft attack."));
      }
      if (token.getDate().getTime() + getTokenValiditySeconds() * 1000L < System.currentTimeMillis()) {
         throw new RememberMeAuthenticationException("Remember-me login has expired");
      }
      // Token also matches, so login is valid. Update the token value, keeping the
      // *same* series number.
      this.logger.debug(LogMessage.format("Refreshing persistent login token for user '%s', series '%s'",
            token.getUsername(), token.getSeries()));
      PersistentRememberMeToken newToken = new PersistentRememberMeToken(token.getUsername(), token.getSeries(),
            generateTokenData(), new Date());
      try {
         this.tokenRepository.updateToken(newToken.getSeries(), newToken.getTokenValue(), newToken.getDate());
         addCookie(newToken, request, response);
      }
      catch (Exception ex) {
         this.logger.error("Failed to update token: ", ex);
         throw new RememberMeAuthenticationException("Autologin failed due to data access problem");
      }
      return getUserDetailsService().loadUserByUsername(token.getUsername());
   }
   ...
}
```

### RememberMeConfigurer

![image-20230105200836312](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105200836312.png)

```java
public final class RememberMeConfigurer<H extends HttpSecurityBuilder<H>>
      extends AbstractHttpConfigurer<RememberMeConfigurer<H>, H> {
   ...
   @SuppressWarnings("unchecked")
   @Override
   public void init(H http) throws Exception {
      validateInput();
      String key = getKey();
      RememberMeServices rememberMeServices = getRememberMeServices(http, key);
      // 设置共享对象
      http.setSharedObject(RememberMeServices.class, rememberMeServices);
      LogoutConfigurer<H> logoutConfigurer = http.getConfigurer(LogoutConfigurer.class);
      if (logoutConfigurer != null && this.logoutHandler != null) {
         logoutConfigurer.addLogoutHandler(this.logoutHandler);
      }
      RememberMeAuthenticationProvider authenticationProvider = new RememberMeAuthenticationProvider(key);
      // 做一些后置处理（Spring Security很多类都有这个方法）
      authenticationProvider = postProcess(authenticationProvider);
      http.authenticationProvider(authenticationProvider);
      initDefaultLoginFilter(http);
   }

   @Override
   public void configure(H http) {
      // 添加 RememberMeAuthenticationFilter 记住我认证过滤器
      RememberMeAuthenticationFilter rememberMeFilter = new RememberMeAuthenticationFilter(
            http.getSharedObject(AuthenticationManager.class), this.rememberMeServices);
      if (this.authenticationSuccessHandler != null) {
         rememberMeFilter.setAuthenticationSuccessHandler(this.authenticationSuccessHandler);
      }
      rememberMeFilter = postProcess(rememberMeFilter);
      http.addFilter(rememberMeFilter);
   }
   ...
}
```

![image-20230105201515809](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105201515809.png)

## 六..

### SessionManagementFilter

![image-20230105202222504](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105202222504.png)

```java
public class SessionManagementFilter extends GenericFilterBean {

   static final String FILTER_APPLIED = "__spring_security_session_mgmt_filter_applied";

   private final SecurityContextRepository securityContextRepository;

   private SessionAuthenticationStrategy sessionAuthenticationStrategy;

   private AuthenticationTrustResolver trustResolver = new AuthenticationTrustResolverImpl();

   private InvalidSessionStrategy invalidSessionStrategy = null;

   private AuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();

   public SessionManagementFilter(SecurityContextRepository securityContextRepository) {
      this(securityContextRepository, new SessionFixationProtectionStrategy());
   }

   public SessionManagementFilter(SecurityContextRepository securityContextRepository,
         SessionAuthenticationStrategy sessionStrategy) {
      Assert.notNull(securityContextRepository, "SecurityContextRepository cannot be null");
      Assert.notNull(sessionStrategy, "SessionAuthenticationStrategy cannot be null");
      this.securityContextRepository = securityContextRepository;
      this.sessionAuthenticationStrategy = sessionStrategy;
   }

   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
   }

   private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      // 有key为__spring_security_session_mgmt_filter_applied的session则直接放行
      if (request.getAttribute(FILTER_APPLIED) != null) {
         chain.doFilter(request, response);
         return;
      }
      request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
      // SecurityContextRepository安全上下文仓库里有这个request才走下面的逻辑，否则直接放行
      if (!this.securityContextRepository.containsContext(request)) {
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         if (authentication != null && !this.trustResolver.isAnonymous(authentication)) {
            // The user has been authenticated during the current request, so call the
            // session strategy
            try {
               // authentication不为空且不是匿名的，才调用SessionAuthenticationStrategy会话认证策略的onAuthentication方法
               this.sessionAuthenticationStrategy.onAuthentication(authentication, request, response);
            }
            catch (SessionAuthenticationException ex) {
               // The session strategy can reject the authentication
               this.logger.debug("SessionAuthenticationStrategy rejected the authentication object", ex);
               // 清空安全上下文
               SecurityContextHolder.clearContext();
               // 失败处理器
               this.failureHandler.onAuthenticationFailure(request, response, ex);
               return;
            }
            // Eagerly save the security context to make it available for any possible
            // re-entrant requests which may occur before the current request
            // completes. SEC-1396.
            // 如果没有抛出异常就保存上下文信息到SecurityContextRepository安全上下文仓库里
            this.securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
         }
         else {
            // No security context or authentication present. Check for a session
            // timeout
            if (request.getRequestedSessionId() != null && !request.isRequestedSessionIdValid()) {
               if (this.logger.isDebugEnabled()) {
                  this.logger.debug(LogMessage.format("Request requested invalid session id %s",
                        request.getRequestedSessionId()));
               }
               if (this.invalidSessionStrategy != null) {
                  this.invalidSessionStrategy.onInvalidSessionDetected(request, response);
                  return;
               }
            }
         }
      }
      chain.doFilter(request, response);
   }
   ...
}
```

### SessionAuthenticationStrategy

`onAuthentication`方法尝试认证，如果认证失败就抛`SessionAuthenticationException`异常

```java
public interface SessionAuthenticationStrategy {

   /**
    * 在发生新的身份验证时执行与 Http 会话相关的功能
    * Performs Http session-related functionality when a new authentication occurs.
    * @throws SessionAuthenticationException if it is decided that the authentication is
    * not allowed for the session. This will typically be because the user has too many
    * sessions open at once.
    */
   void onAuthentication(Authentication authentication, HttpServletRequest request, HttpServletResponse response)
         throws SessionAuthenticationException;

}
```

![image-20230105203327894](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105203327894.png)

#### RegisterSessionAuthenticationStrategy

`SessionAuthenticationStrategy`接口有一个实现类是`RegisterSessionAuthenticationStrategy`，该类是用于在身份验证成功后向 `SessionRegistry` 注册用户的策略类。

这个类的`onAuthentication`方法就是调用`SessionRegistry`接口的`registerNewSession`方法

```java
public class RegisterSessionAuthenticationStrategy implements SessionAuthenticationStrategy {

   private final SessionRegistry sessionRegistry;

   /**
    * @param sessionRegistry the session registry which should be updated when the
    * authenticated session is changed.
    */
   public RegisterSessionAuthenticationStrategy(SessionRegistry sessionRegistry) {
      Assert.notNull(sessionRegistry, "The sessionRegistry cannot be null");
      this.sessionRegistry = sessionRegistry;
   }

   /**
    * In addition to the steps from the superclass, the sessionRegistry will be updated
    * with the new session information.
    */
   @Override
   public void onAuthentication(Authentication authentication, HttpServletRequest request,
         HttpServletResponse response) {
      this.sessionRegistry.registerNewSession(request.getSession().getId(), authentication.getPrincipal());
   }

}
```

![image-20230105205209651](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105205209651.png)

#### ConcurrentSessionControlAuthenticationStrategy

`SessionAuthenticationStrategy`接口有一个实现类叫`ConcurrentSessionControlAuthenticationStrategy`（并发会话控制认证策略），该类是用作控制并发session的

```java
public class ConcurrentSessionControlAuthenticationStrategy
      implements MessageSourceAware, SessionAuthenticationStrategy {

   protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

   private final SessionRegistry sessionRegistry;
   // 超出最大并发数量了是否需要抛出异常
   private boolean exceptionIfMaximumExceeded = false;
   // 最大的会话数量
   private int maximumSessions = 1;
   ...
   @Override
   public void onAuthentication(Authentication authentication, HttpServletRequest request,
         HttpServletResponse response) {
      // 获取这个用户最大允许有多少个session
      int allowedSessions = getMaximumSessionsForThisUser(authentication);
      if (allowedSessions == -1) {
         // We permit unlimited logins
         // 如果是-1，则不限制
         return;
      }
      // 从SessionRegistry里获取session信息
      List<SessionInformation> sessions = this.sessionRegistry.getAllSessions(authentication.getPrincipal(), false);
      int sessionCount = sessions.size();
      // 如果SessionRegistry里session的数量小于允许的数量，证明还可以创建session，应该啥也不干，直接返回
      if (sessionCount < allowedSessions) {
         // They haven't got too many login sessions running at present
         return;
      }
      // 如果SessionRegistry里session的数量等于允许的数量，此时不能创建session了，如果这个用户的session已经存储到SessionRegistry了则可以直接返回，但是如果这个用户的session没有存储在SessionRegistry里则意味着可能需要创建这个session，但是如果再创建session就超过最大允许的seeson数量了，此时需要处理是否允许会话数量超出
      if (sessionCount == allowedSessions) {
         // 设置false，如果session不存在也不创建session
         HttpSession session = request.getSession(false);
         if (session != null) {
            // Only permit it though if this request is associated with one of the
            // already registered sessions
            for (SessionInformation si : sessions) {
               // 判断从SessionRegistry里获取的sessions有没有sessionId等于这个请求的session的id，如果有则啥也不干，直接返回
               if (si.getSessionId().equals(session.getId())) {
                  return;
               }
            }
         }
         // 如果能走到这，说明从SessionRegistry里获取的sessions没有sessionId等于这个请求的session的id，可能需要创建一个新的session，但是如果创建session则会超过允许的session数量
         // If the session is null, a new one will be created by the parent class,
         // exceeding the allowed number
      }
      // 是否允许会话数量超出
      allowableSessionsExceeded(sessions, allowedSessions, this.sessionRegistry);
   }
   ...
   protected void allowableSessionsExceeded(List<SessionInformation> sessions, int allowableSessions,
         SessionRegistry registry) throws SessionAuthenticationException {
      // 如果设置超出最大数量抛异常 或 sessions为空了就抛异常（接口契约规定sessionRegistry.getAllSessions方法不能返回null，而且如果为null了，前面sessions.size()就报空指针异常了，因此这个sessions == null的判断可以忽略）
      if (this.exceptionIfMaximumExceeded || (sessions == null)) {
         throw new SessionAuthenticationException(
               this.messages.getMessage("ConcurrentSessionControlAuthenticationStrategy.exceededAllowed",
                     new Object[] { allowableSessions }, "Maximum sessions of {0} for this principal exceeded"));
      }
      // Determine least recently used sessions, and mark them for invalidation
      // 将这些session按照时间排个序，索引越大请求越新，将老的session删除掉，让新的session加入进来
      sessions.sort(Comparator.comparing(SessionInformation::getLastRequest));
      int maximumSessionsExceededBy = sessions.size() - allowableSessions + 1;
      // 截取到老的session，将这些session失效
      List<SessionInformation> sessionsToBeExpired = sessions.subList(0, maximumSessionsExceededBy);
      for (SessionInformation session : sessionsToBeExpired) {
         // 将这些老的session失效
         session.expireNow();
      }
   }

   /**
    * Sets the <tt>exceptionIfMaximumExceeded</tt> property, which determines whether the
    * user should be prevented from opening more sessions than allowed. If set to
    * <tt>true</tt>, a <tt>SessionAuthenticationException</tt> will be raised which means
    * the user authenticating will be prevented from authenticating. if set to
    * <tt>false</tt>, the user that has already authenticated will be forcibly logged
    * out.
    * @param exceptionIfMaximumExceeded defaults to <tt>false</tt>.
    */
   public void setExceptionIfMaximumExceeded(boolean exceptionIfMaximumExceeded) {
      this.exceptionIfMaximumExceeded = exceptionIfMaximumExceeded;
   }

   /**
    * Sets the <tt>maxSessions</tt> property. The default value is 1. Use -1 for
    * unlimited sessions.
    * @param maximumSessions the maximimum number of permitted sessions a user can have
    * open simultaneously.
    */
   public void setMaximumSessions(int maximumSessions) {
      Assert.isTrue(maximumSessions != 0,
            "MaximumLogins must be either -1 to allow unlimited logins, or a positive integer to specify a maximum");
      this.maximumSessions = maximumSessions;
   }

   /**
    * Sets the {@link MessageSource} used for reporting errors back to the user when the
    * user has exceeded the maximum number of authentications.
    */
   @Override
   public void setMessageSource(MessageSource messageSource) {
      Assert.notNull(messageSource, "messageSource cannot be null");
      this.messages = new MessageSourceAccessor(messageSource);
   }

}
```

![image-20230105213922175](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105213922175.png)

#### CompositeSessionAuthenticationStrategy

`SessionAuthenticationStrategy`接口有一个实现类叫`CompositeSessionAuthenticationStrategy`，`CompositeSessionAuthenticationStrategy`类（组合的session认证策略）维护了一堆的`SessionAuthenticationStrategy`，比如说你即想要`RegisterSessionAuthenticationStrategy`策略又想要`ConcurrentSessionControlAuthenticationStrategy`策略捷克语使用该类。该类就是遍历`SessionAuthenticationStrategy`，调其`onAuthentication`方法。

```java
public class CompositeSessionAuthenticationStrategy implements SessionAuthenticationStrategy {

   private final Log logger = LogFactory.getLog(getClass());

   private final List<SessionAuthenticationStrategy> delegateStrategies;

   public CompositeSessionAuthenticationStrategy(List<SessionAuthenticationStrategy> delegateStrategies) {
      Assert.notEmpty(delegateStrategies, "delegateStrategies cannot be null or empty");
      for (SessionAuthenticationStrategy strategy : delegateStrategies) {
         Assert.notNull(strategy, () -> "delegateStrategies cannot contain null entires. Got " + delegateStrategies);
      }
      this.delegateStrategies = delegateStrategies;
   }

   @Override
   public void onAuthentication(Authentication authentication, HttpServletRequest request,
         HttpServletResponse response) throws SessionAuthenticationException {
      int currentPosition = 0;
      int size = this.delegateStrategies.size();
      for (SessionAuthenticationStrategy delegate : this.delegateStrategies) {
         if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.format("Preparing session with %s (%d/%d)",
                  delegate.getClass().getSimpleName(), ++currentPosition, size));
         }
         delegate.onAuthentication(authentication, request, response);
      }
   }

   @Override
   public String toString() {
      return getClass().getName() + " [delegateStrategies = " + this.delegateStrategies + "]";
   }

}
```

![image-20230105214243787](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105214243787.png)

#### AbstractSessionFixationProtectionStrategy

`SessionAuthenticationStrategy`接口有一个实现类是`RegisterSessionAuthenticationStrategy`，该类为抽象类，用于防止session的固定会话攻击（即如果sessionId不变的话，容易被截取到，然后黑客使用截取的sessionId做一些非法的操作），主要通过生成一个新的sessionId来防止。

```java
public abstract class AbstractSessionFixationProtectionStrategy
      implements SessionAuthenticationStrategy, ApplicationEventPublisherAware {
   ...
   @Override
   public void onAuthentication(Authentication authentication, HttpServletRequest request,
         HttpServletResponse response) {
      boolean hadSessionAlready = request.getSession(false) != null;
      if (!hadSessionAlready && !this.alwaysCreateSession) {
         // Session fixation isn't a problem if there's no session
         return;
      }
      // Create new session if necessary
      // 如果需要，创建一个新的session
      HttpSession session = request.getSession();
      if (hadSessionAlready && request.isRequestedSessionIdValid()) {
         // 原始sessionId
         String originalSessionId;
         // 新的sessionId
         String newSessionId;
         Object mutex = WebUtils.getSessionMutex(session);
         // 锁住
         synchronized (mutex) {
            // We need to migrate to a new session
            // 获取原始sessionId
            originalSessionId = session.getId();
            // 创建一个新的session（该方法为抽象方法，留给子类去实现）
            session = applySessionFixation(request);
            newSessionId = session.getId();
         }
         if (originalSessionId.equals(newSessionId)) {
            this.logger.warn("Your servlet container did not change the session ID when a new session "
                  + "was created. You will not be adequately protected against session-fixation attacks");
         }
         else {
            if (this.logger.isDebugEnabled()) {
               this.logger.debug(LogMessage.format("Changed session id from %s", originalSessionId));
            }
         }
         onSessionChange(originalSessionId, session, authentication);
      }
   }
   ...
}
```

![image-20230105215257048](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105215257048.png)

##### ChangeSessionIdAuthenticationStrategy

`AbstractSessionFixationProtectionStrategy`抽象类的实现类有两个，一个是`ChangeSessionIdAuthenticationStrategy`，一个是`SessionFixationProtectionStrategy`。

`ChangeSessionIdAuthenticationStrategy`类的`applySessionFixation`方法非常简单，调用`request.changeSessionId();`方法改变`sessionId`（这个方法只会改变`sessionId`，不会删除`session`），然后返回`request.getSession();`

```java
public final class ChangeSessionIdAuthenticationStrategy extends AbstractSessionFixationProtectionStrategy {

   @Override
   HttpSession applySessionFixation(HttpServletRequest request) {
      request.changeSessionId();
      return request.getSession();
   }

}
```

![image-20230105215453689](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105215453689.png)

##### SessionFixationProtectionStrategy

`AbstractSessionFixationProtectionStrategy`抽象类的实现类有两个，一个是`ChangeSessionIdAuthenticationStrategy`，一个是`SessionFixationProtectionStrategy`。

`SessionFixationProtectionStrategy`这个类的`applySessionFixation`方法稍微复杂一些，首先设置让老的`session`失效，然后创建一个新的`session`

```java
@Override
final HttpSession applySessionFixation(HttpServletRequest request) {
   HttpSession session = request.getSession();
   String originalSessionId = session.getId();
   this.logger.debug(LogMessage.of(() -> "Invalidating session with Id '" + originalSessionId + "' "
         + (this.migrateSessionAttributes ? "and" : "without") + " migrating attributes."));
   Map<String, Object> attributesToMigrate = extractAttributes(session);
   // 获取老的session的过期时间
   int maxInactiveIntervalToMigrate = session.getMaxInactiveInterval();
   // 将老的session失效
   session.invalidate();
   // 参数设置true，如果不存在session就创建一个session
   session = request.getSession(true); // we now have a new session
   this.logger.debug(LogMessage.format("Started new session: %s", session.getId()));
   transferAttributes(attributesToMigrate, session);
   if (this.migrateSessionAttributes) {
      // 将新的session的过期时间设置为 老的session的过期时间
      session.setMaxInactiveInterval(maxInactiveIntervalToMigrate);
   }
   return session;
}
```

![image-20230105215941205](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105215941205.png)

### SessionRegistry

SessionRegistry： 维护`SessionInformation`实例的注册表。

```java
public interface SessionRegistry {

   List<Object> getAllPrincipals();

   List<SessionInformation> getAllSessions(Object principal, boolean includeExpiredSessions);

   SessionInformation getSessionInformation(String sessionId);

   void refreshLastRequest(String sessionId);
    
   void registerNewSession(String sessionId, Object principal);

   void removeSessionInformation(String sessionId);

}
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230105204623184.png" alt="image-20230105204623184" style="zoom: 50%;" />

`SessionRegistry`接口只有一个实现类为`SessionRegistryImpl`，该类就是维护两个`ConcurrentHashMap`

```java
public class SessionRegistryImpl implements SessionRegistry, ApplicationListener<AbstractSessionEvent> {

   protected final Log logger = LogFactory.getLog(SessionRegistryImpl.class);

   // <principal:Object,SessionIdSet>
   private final ConcurrentMap<Object, Set<String>> principals;

   // <sessionId:Object,SessionInformation>
   private final Map<String, SessionInformation> sessionIds;

   public SessionRegistryImpl() {
      this.principals = new ConcurrentHashMap<>();
      this.sessionIds = new ConcurrentHashMap<>();
   }

   public SessionRegistryImpl(ConcurrentMap<Object, Set<String>> principals,
         Map<String, SessionInformation> sessionIds) {
      this.principals = principals;
      this.sessionIds = sessionIds;
   }
   ...
}
```

![image-20230105204858723](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105204858723.png)

### ConcurrentSessionFilter

```java
public class ConcurrentSessionFilter extends GenericFilterBean {
   ...
   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
   }

   private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      HttpSession session = request.getSession(false);
      if (session != null) {
         // 调用SessionRegistry的getSessionInformation方法，根据sessionId获取一个SessionInformation
         SessionInformation info = this.sessionRegistry.getSessionInformation(session.getId());
         if (info != null) {
            // 如果过期了
            if (info.isExpired()) {
               // Expired - abort processing
               this.logger.debug(LogMessage
                     .of(() -> "Requested session ID " + request.getRequestedSessionId() + " has expired."));
               // 调用 doLogout 方法执行退出逻辑
               doLogout(request, response);
               // 调用sessionInformationExpiredStrategy的onExpiredSessionDetected方法
               // 这个SessionInformationExpiredStrategy接口只有一个onExpiredSessionDetected方法，有两个具体实现，ResponseBodySessionInformationExpiredStrategy响应一个文本，SimpleRedirectSessionInformationExpiredStrategy做重定向
               this.sessionInformationExpiredStrategy
                     .onExpiredSessionDetected(new SessionInformationExpiredEvent(info, request, response));
               return;
            }
            // Non-expired - update last request date/time
            // 调用SessionRegistry的refreshLastRequest方法，刷新这个SessionInformation
            this.sessionRegistry.refreshLastRequest(info.getSessionId());
         }
      }
      chain.doFilter(request, response);
   }
   ...
}
```

![image-20230105220723140](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105220723140.png)

### SessionManagementConfigurer

`SessionManagementConfigurer`和前面的`xxxConfigurer`差不多

![image-20230105221757041](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105221757041.png)

`init`方法就是做共享的

![image-20230105221945006](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105221945006.png)

`configure`是用来配置过滤器的（创建了一个SimpleUrlAuthenticationFailureHandler，然后设置各种值）

![image-20230105222620672](https://gitlab.com/apzs/image/-/raw/master/image/image-20230105222620672.png)

```java
public final class SessionManagementConfigurer<H extends HttpSecurityBuilder<H>>
      extends AbstractHttpConfigurer<SessionManagementConfigurer<H>, H> {
   ...
   @Override
   public void init(H http) {
      SecurityContextRepository securityContextRepository = http.getSharedObject(SecurityContextRepository.class);
      boolean stateless = isStateless();
      if (securityContextRepository == null) {
         if (stateless) {
            http.setSharedObject(SecurityContextRepository.class, new NullSecurityContextRepository());
         }
         else {
            HttpSessionSecurityContextRepository httpSecurityRepository = new HttpSessionSecurityContextRepository();
            httpSecurityRepository.setDisableUrlRewriting(!this.enableSessionUrlRewriting);
            httpSecurityRepository.setAllowSessionCreation(isAllowSessionCreation());
            AuthenticationTrustResolver trustResolver = http.getSharedObject(AuthenticationTrustResolver.class);
            if (trustResolver != null) {
               httpSecurityRepository.setTrustResolver(trustResolver);
            }
            http.setSharedObject(SecurityContextRepository.class, httpSecurityRepository);
         }
      }
      RequestCache requestCache = http.getSharedObject(RequestCache.class);
      if (requestCache == null) {
         if (stateless) {
            http.setSharedObject(RequestCache.class, new NullRequestCache());
         }
      }
      http.setSharedObject(SessionAuthenticationStrategy.class, getSessionAuthenticationStrategy(http));
      http.setSharedObject(InvalidSessionStrategy.class, getInvalidSessionStrategy());
   }
   // 创建了一个SimpleUrlAuthenticationFailureHandler，然后设置各种值
   @Override
   public void configure(H http) {
      SecurityContextRepository securityContextRepository = http.getSharedObject(SecurityContextRepository.class);
      SessionManagementFilter sessionManagementFilter = new SessionManagementFilter(securityContextRepository,
            getSessionAuthenticationStrategy(http));
      if (this.sessionAuthenticationErrorUrl != null) {
         sessionManagementFilter.setAuthenticationFailureHandler(
               new SimpleUrlAuthenticationFailureHandler(this.sessionAuthenticationErrorUrl));
      }
      InvalidSessionStrategy strategy = getInvalidSessionStrategy();
      if (strategy != null) {
         sessionManagementFilter.setInvalidSessionStrategy(strategy);
      }
      AuthenticationFailureHandler failureHandler = getSessionAuthenticationFailureHandler();
      if (failureHandler != null) {
         sessionManagementFilter.setAuthenticationFailureHandler(failureHandler);
      }
      AuthenticationTrustResolver trustResolver = http.getSharedObject(AuthenticationTrustResolver.class);
      if (trustResolver != null) {
         sessionManagementFilter.setTrustResolver(trustResolver);
      }
      sessionManagementFilter = postProcess(sessionManagementFilter);
      http.addFilter(sessionManagementFilter);
      if (isConcurrentSessionControlEnabled()) {
         ConcurrentSessionFilter concurrentSessionFilter = createConcurrencyFilter(http);

         concurrentSessionFilter = postProcess(concurrentSessionFilter);
         http.addFilter(concurrentSessionFilter);
      }
      if (!this.enableSessionUrlRewriting) {
         http.addFilter(new DisableEncodeUrlFilter());
      }
      if (this.sessionPolicy == SessionCreationPolicy.ALWAYS) {
         http.addFilter(new ForceEagerSessionCreationFilter());
      }
   }
   ...
}
```

## 七

### 1、默认配置的过滤器

在`return http.build();`这一行上打个断点，然后以`debug`方式运行项目，断点停在该行上后，点击`Step Over`步过按钮，运行到下一行。

![image-20230106203653757](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106203653757.png)

跳转到了`SimpleInstantiationStrategy`类的`instantiate`方法里。此时`args[0]` -> `filters`里有13个过滤器

![image-20230106203830977](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106203830977.png)

#### DisableEncodeUrlFilter

该类是防止`sessionId`泄露的

```java
/**
 * Disables encoding URLs using the {@link HttpServletResponse} to prevent including the
 * session id in URLs which is not considered URL because the session id can be leaked in
 * things like HTTP access logs.
 * 使用 HttpServletResponse 禁用编码 URL，以防止在不被视为 URL 的 URL 中包含会话 ID，
 * 因为会话 ID 可能会在 HTTP 访问日志 等内容中泄露。
 */
public class DisableEncodeUrlFilter extends OncePerRequestFilter {

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {
      // 该类只将response进行了包装（装饰器模式） Wrapper就是包装的意思
      filterChain.doFilter(request, new DisableEncodeUrlResponseWrapper(response));
   }

   private static final class DisableEncodeUrlResponseWrapper extends HttpServletResponseWrapper {
      ...
      //直接让将session编码到url里的类的功能失效（覆盖了将session编码到url里的类的encodeURL，不让其将seesion编码到url里）
      @Override
      public String encodeURL(String url) {
         return url;
      }

   }

}
```

![image-20230106205324407](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106205324407.png)

#### WebAsyncManagerIntegrationFilter

默认执行方法是同步的，访问的策略是`ThreadLocalSecurityContextHolderStrategy`，即同一个线程共享`SecurityContext`信息。如果开启异步后，访问方法是会再开一个线程，这样线程之间就不能共享`SecurityContext`信息了。该类就是解决这个问题，本质就是通过过滤器将老的线程的`SecurityContext`信息设置到新开的线程里。

`WebAsyncManagerIntegrationFilter`注册了一个`SecurityContextCallableProcessingInterceptor`拦截器

```java
public final class WebAsyncManagerIntegrationFilter extends OncePerRequestFilter {

   private static final Object CALLABLE_INTERCEPTOR_KEY = new Object();

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {
      WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);
      SecurityContextCallableProcessingInterceptor securityProcessingInterceptor = (SecurityContextCallableProcessingInterceptor) asyncManager
            .getCallableInterceptor(CALLABLE_INTERCEPTOR_KEY);
      if (securityProcessingInterceptor == null) {
         asyncManager.registerCallableInterceptor(CALLABLE_INTERCEPTOR_KEY,
               new SecurityContextCallableProcessingInterceptor());
      }
      filterChain.doFilter(request, response);
   }

}
```

![image-20230106210209845](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106210209845.png)

该`SecurityContextCallableProcessingInterceptor`拦截器在目标方法执行之前将维护的`SecurityContext`设置到新开的线程中了，在目标执行之后将新开的那个线程的`SecurityContext`删除掉。

```java
public final class SecurityContextCallableProcessingInterceptor extends CallableProcessingInterceptorAdapter {

   private volatile SecurityContext securityContext;
   ...

   @Override
   public <T> void preProcess(NativeWebRequest request, Callable<T> task) {
      SecurityContextHolder.setContext(this.securityContext);
   }

   @Override
   public <T> void postProcess(NativeWebRequest request, Callable<T> task, Object concurrentResult) {
      SecurityContextHolder.clearContext();
   }

   private void setSecurityContext(SecurityContext securityContext) {
      this.securityContext = securityContext;
   }

}
```

![image-20230106210542362](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106210542362.png)

#### HeaderWriterFilter

顾名思义，就是向`Header`写东西的，该类维护了一个`HeaderWriter`列表

```java
public class HeaderWriterFilter extends OncePerRequestFilter {

   private final List<HeaderWriter> headerWriters;
   ...
   public HeaderWriterFilter(List<HeaderWriter> headerWriters) {
      Assert.notEmpty(headerWriters, "headerWriters cannot be null or empty");
      this.headerWriters = headerWriters;
   }

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {
      if (this.shouldWriteHeadersEagerly) {
         doHeadersBefore(request, response, filterChain);
      }
      else {
         doHeadersAfter(request, response, filterChain);
      }
   }
   ...
}
```

![image-20230106211904977](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106211904977.png)

以前最常听到的`HeaderWriter`是`XFrameOptionsHeaderWriter`，默认情况下使用`Spring Security`后，会禁止使用`<iframe>`标签，该标签是用来嵌套`html`页面的（以前用的比较多，现在基本不用了），可以配置`headers().frameOptions().disable()`将这个`XFrameOptionsHeaderWriter`禁用掉就可以使用`<iframe>`标签了

```java
@Bean
protected DefaultSecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.formLogin().and()
            .headers().frameOptions().disable();
    return http.build();
}
```

![image-20230106211934452](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106211934452.png)

#### CsrfFilter

`CsrfFilter`是做防止跨站脚本攻击的，其默认使用`HttpSession`存储，使用模板引擎时可以直接拿到`session`里的数据，然后在表单里设置个隐藏的`name`，值为`token`，提交表单时会带上这个`token`，然后与存储的`token`做比较。前后端分离后`CsrfFilter`就很少使用了。

```java
public final class CsrfFilter extends OncePerRequestFilter {
   ...
   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {
      request.setAttribute(HttpServletResponse.class.getName(), response);
      CsrfToken csrfToken = this.tokenRepository.loadToken(request);
      boolean missingToken = (csrfToken == null);
      if (missingToken) {
         csrfToken = this.tokenRepository.generateToken(request);
         this.tokenRepository.saveToken(csrfToken, request, response);
      }
      request.setAttribute(CsrfToken.class.getName(), csrfToken);
      request.setAttribute(csrfToken.getParameterName(), csrfToken);
      if (!this.requireCsrfProtectionMatcher.matches(request)) {
         if (this.logger.isTraceEnabled()) {
            this.logger.trace("Did not protect against CSRF since request did not match "
                  + this.requireCsrfProtectionMatcher);
         }
         filterChain.doFilter(request, response);
         return;
      }
      String actualToken = request.getHeader(csrfToken.getHeaderName());
      if (actualToken == null) {
         actualToken = request.getParameter(csrfToken.getParameterName());
      }
      if (!equalsConstantTime(csrfToken.getToken(), actualToken)) {
         this.logger.debug(
               LogMessage.of(() -> "Invalid CSRF token found for " + UrlUtils.buildFullRequestUrl(request)));
         AccessDeniedException exception = (!missingToken) ? new InvalidCsrfTokenException(csrfToken, actualToken)
               : new MissingCsrfTokenException(actualToken);
         this.accessDeniedHandler.handle(request, response, exception);
         return;
      }
      filterChain.doFilter(request, response);
   }

   public static void skipRequest(HttpServletRequest request) {
      request.setAttribute(SHOULD_NOT_FILTER, Boolean.TRUE);
   }
   ...
}
```

![image-20230106212933296](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106212933296.png)

#### LogoutFilter

退出登录的过滤器

```java
public class LogoutFilter extends GenericFilterBean {

   private RequestMatcher logoutRequestMatcher;

   private final LogoutHandler handler;

   private final LogoutSuccessHandler logoutSuccessHandler;
   ...
   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
   }

   private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      if (requiresLogout(request, response)) {
         Authentication auth = SecurityContextHolder.getContext().getAuthentication();
         if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Logging out [%s]", auth));
         }
         // 执行退出登录的逻辑
         this.handler.logout(request, response, auth);
         // 退出登录成功后的处理（比如返回一个退出登录成功的json）
         this.logoutSuccessHandler.onLogoutSuccess(request, response, auth);
         return;
      }
      chain.doFilter(request, response);
   }
   ...  
}
```

![image-20230106213207654](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106213207654.png)

#### RequestCacheAwareFilter

该类的功能是没有登陆了跳转到登录页，登陆成功后访问最开的那个请求的，现在前后端分离的项目用不到了。该类主要就是将请求的所有信息保存起来，登录成功后在复原登录之前访问的那个请求。（最常使用的`RequestCache`接口的实现类还是`HttpSessionRequestCache`）

```java
public class RequestCacheAwareFilter extends GenericFilterBean {

   private RequestCache requestCache;

   public RequestCacheAwareFilter() {
      this(new HttpSessionRequestCache());
   }

   public RequestCacheAwareFilter(RequestCache requestCache) {
      Assert.notNull(requestCache, "requestCache cannot be null");
      this.requestCache = requestCache;
   }

   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      HttpServletRequest wrappedSavedRequest = this.requestCache.getMatchingRequest((HttpServletRequest) request,
            (HttpServletResponse) response);
      chain.doFilter((wrappedSavedRequest != null) ? wrappedSavedRequest : request, response);
   }

}
```

![image-20230106214056361](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106214056361.png)

#### SecurityContextHolderAwareRequestFilter

`xxxAware`就是用来感知`xxx`的，比如说`ApplicationContextAware`就是用来感知`ApplicationContext`的，同理`SecurityContextHolderAwareRequestFilter`就是用来感知`SecurityContextHolder`的（`aware`是`意识到`、`注意到`、`察觉`的意思）

该类就将`req`换了一下，覆盖了标准的`javax.servlet.http.HttpServletRequestWrapper`类的一些方法

```java
public class SecurityContextHolderAwareRequestFilter extends GenericFilterBean {
	private String rolePrefix = "ROLE_";
	private HttpServletRequestFactory requestFactory;
   ...
   @Override
   public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
         throws IOException, ServletException {
      chain.doFilter(this.requestFactory.create((HttpServletRequest) req, (HttpServletResponse) res), res);
   }
   ...
}
```

![image-20230106215326500](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106215326500.png)

`HttpServletRequestFactory`接口只有一个`create`方法

```java
interface HttpServletRequestFactory {

   HttpServletRequest create(HttpServletRequest request, HttpServletResponse response);

}
```

![image-20230106215430310](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106215430310.png)

`HttpServletRequestFactory`接口只有一个实现类为`HttpServlet3RequestFactory`，`HttpServlet3RequestFactory`类的`create`方法创建了一个`Servlet3SecurityContextHolderAwareRequestWrapper`对象。（`Wrapper`是包装的意思，看到`Wrapper`就知道这个类使用的是装饰器模式）

```java
final class HttpServlet3RequestFactory implements HttpServletRequestFactory {
   ...
   @Override
   public HttpServletRequest create(HttpServletRequest request, HttpServletResponse response) {
      return new Servlet3SecurityContextHolderAwareRequestWrapper(request, this.rolePrefix, response);
   }

   private class Servlet3SecurityContextHolderAwareRequestWrapper extends SecurityContextHolderAwareRequestWrapper {

      private final HttpServletResponse response;

      Servlet3SecurityContextHolderAwareRequestWrapper(HttpServletRequest request, String rolePrefix,
            HttpServletResponse response) {
         super(request, HttpServlet3RequestFactory.this.trustResolver, rolePrefix);
         this.response = response;
      }
      ...
   }

   private static class SecurityContextAsyncContext implements AsyncContext {

      private final AsyncContext asyncContext;

      SecurityContextAsyncContext(AsyncContext asyncContext) {
         this.asyncContext = asyncContext;
      }
      ...
   }

}
```

![image-20230106215826624](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106215826624.png)

`Servlet3SecurityContextHolderAwareRequestWrapper`类继承自`SecurityContextHolderAwareRequestWrapper`，`SecurityContextHolderAwareRequestWrapper`覆盖了`HttpServletRequestWrapper`类的`getRemoteUser`和`getUserPrincipal`方法。

```java
public class SecurityContextHolderAwareRequestWrapper extends HttpServletRequestWrapper {
   ...
   /**
    * Returns the principal's name, as obtained from the
    * <code>SecurityContextHolder</code>. Properly handles both <code>String</code>-based
    * and <code>UserDetails</code>-based principals.
    * @return the username or <code>null</code> if unavailable
    */
   @Override
   public String getRemoteUser() {
      Authentication auth = getAuthentication();
      if ((auth == null) || (auth.getPrincipal() == null)) {
         return null;
      }
      if (auth.getPrincipal() instanceof UserDetails) {
         return ((UserDetails) auth.getPrincipal()).getUsername();
      }
      if (auth instanceof AbstractAuthenticationToken) {
         return auth.getName();
      }
      return auth.getPrincipal().toString();
   }

   /**
    * Returns the <code>Authentication</code> (which is a subclass of
    * <code>Principal</code>), or <code>null</code> if unavailable.
    * @return the <code>Authentication</code>, or <code>null</code>
    */
   @Override
   public Principal getUserPrincipal() {
      Authentication auth = getAuthentication();
      if ((auth == null) || (auth.getPrincipal() == null)) {
         return null;
      }
      return auth;
   }
   ...
}
```

![image-20230106220647335](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106220647335.png)

而`HttpServletRequestWrapper`类为`java`原生的类

```java
package javax.servlet.http;

public class HttpServletRequestWrapper extends ServletRequestWrapper implements
        HttpServletRequest {
    ...
    /**
     * The default behavior of this method is to return getRemoteUser() on the
     * wrapped request object.
     */
    @Override
    public String getRemoteUser() {
        return this._getHttpServletRequest().getRemoteUser();
    }
    ...
    /**
     * The default behavior of this method is to return getUserPrincipal() on
     * the wrapped request object.
     */
    @Override
    public java.security.Principal getUserPrincipal() {
        return this._getHttpServletRequest().getUserPrincipal();
    }
    ...
}
```

![image-20230106221005384](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106221005384.png)

#### AnonymousAuthenticationFilter

匿名的认证过滤器，如果没有权限就创建一个匿名的AuthenticationToken（如果用户没有登录，他就是匿名的；如果登录了又分为两种，一种是认证的，一种是完全认证的，通过记住我登录的是认证的，而通过用户名密码登录的是完全认证的）

```java
public class AnonymousAuthenticationFilter extends GenericFilterBean implements InitializingBean {
   ...
   // 这个类只会处理SecurityContextHolder.getContext().getAuthentication()为null的情况
   @Override
   public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
         throws IOException, ServletException {
      if (SecurityContextHolder.getContext().getAuthentication() == null) {
         // 如果SecurityContextHolder.getContext().getAuthentication()为null，就创建一个Authentication
         Authentication authentication = createAuthentication((HttpServletRequest) req);
         // 创建一个空的SecurityContext
         SecurityContext context = SecurityContextHolder.createEmptyContext();
         // 设置SecurityContext的权限
         context.setAuthentication(authentication);
         // 设置SecurityContext到SecurityContextHolder里
         SecurityContextHolder.setContext(context);
         if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.of(() -> "Set SecurityContextHolder to "
                  + SecurityContextHolder.getContext().getAuthentication()));
         }
         else {
            this.logger.debug("Set SecurityContextHolder to anonymous SecurityContext");
         }
      }
      else {
         if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.of(() -> "Did not set SecurityContextHolder since already authenticated "
                  + SecurityContextHolder.getContext().getAuthentication()));
         }
      }
      chain.doFilter(req, res);
   }

   protected Authentication createAuthentication(HttpServletRequest request) {
      // 创建一个匿名的AuthenticationToken
      AnonymousAuthenticationToken token = new AnonymousAuthenticationToken(this.key, this.principal,
            this.authorities);
      token.setDetails(this.authenticationDetailsSource.buildDetails(request));
      return token;
   }
   ...
}
```

![image-20230106222610599](https://gitlab.com/apzs/image/-/raw/master/image/image-20230106222610599.png)

#### ExceptionTranslationFilter

转换异常的过滤器，该类先执行`chain.doFilter(request, response);`，如果抛出异常了就进行处理

```java
public class ExceptionTranslationFilter extends GenericFilterBean implements MessageSourceAware {

   private AccessDeniedHandler accessDeniedHandler = new AccessDeniedHandlerImpl();

   private AuthenticationEntryPoint authenticationEntryPoint;

   private AuthenticationTrustResolver authenticationTrustResolver = new AuthenticationTrustResolverImpl();

   private ThrowableAnalyzer throwableAnalyzer = new DefaultThrowableAnalyzer();

   private RequestCache requestCache = new HttpSessionRequestCache();

   protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();
   ...
   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
   }

   private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      try {
         // 先放行，如果出现了异常就处理
         chain.doFilter(request, response);
      }
      catch (IOException ex) {
         // 如果是IO异常，直接抛出
         throw ex;
      }
      catch (Exception ex) {
         // Try to extract a SpringSecurityException from the stacktrace
         // 尝试从堆栈跟踪中提取 SpringSecurityException
         Throwable[] causeChain = this.throwableAnalyzer.determineCauseChain(ex);
         // 拿到第一个AuthenticationException异常
         RuntimeException securityException = (AuthenticationException) this.throwableAnalyzer
               .getFirstThrowableOfType(AuthenticationException.class, causeChain);
         if (securityException == null) {
            // 如果没有AuthenticationException异常就尝试拿AccessDeniedException异常
            securityException = (AccessDeniedException) this.throwableAnalyzer
                  .getFirstThrowableOfType(AccessDeniedException.class, causeChain);
         }
         if (securityException == null) {
            // 如果这两个异常都没有就重新抛出（这个类只处理AuthenticationException异常和AccessDeniedException异常）
            rethrow(ex);
         }
         if (response.isCommitted()) {
            throw new ServletException("Unable to handle the Spring Security Exception "
                  + "because the response is already committed.", ex);
         }
         handleSpringSecurityException(request, response, chain, securityException);
      }
   }
   // 处理不了的异常重新抛出
   private void rethrow(Exception ex) throws ServletException {
      // Rethrow ServletExceptions and RuntimeExceptions as-is
      if (ex instanceof ServletException) {
         throw (ServletException) ex;
      }
      if (ex instanceof RuntimeException) {
         throw (RuntimeException) ex;
      }
      // Wrap other Exceptions. This shouldn't actually happen
      // as we've already covered all the possibilities for doFilter
      throw new RuntimeException(ex);
   }
   ...
   // 处理AuthenticationException异常和AccessDeniedException异常
   private void handleSpringSecurityException(HttpServletRequest request, HttpServletResponse response,
         FilterChain chain, RuntimeException exception) throws IOException, ServletException {
      if (exception instanceof AuthenticationException) {
         // 如果是AuthenticationException异常就执行handleAuthenticationException方法
         handleAuthenticationException(request, response, chain, (AuthenticationException) exception);
      }
      else if (exception instanceof AccessDeniedException) {
         // 如果是AccessDeniedException异常就执行handleAccessDeniedException方法
         handleAccessDeniedException(request, response, chain, (AccessDeniedException) exception);
      }
   }
  // 处理认证异常
   private void handleAuthenticationException(HttpServletRequest request, HttpServletResponse response,
         FilterChain chain, AuthenticationException exception) throws ServletException, IOException {
      this.logger.trace("Sending to authentication entry point since authentication failed", exception);
      // 重新认证
      sendStartAuthentication(request, response, chain, exception);
   }
   // 处理权限拒绝异常
   private void handleAccessDeniedException(HttpServletRequest request, HttpServletResponse response,
         FilterChain chain, AccessDeniedException exception) throws ServletException, IOException {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      boolean isAnonymous = this.authenticationTrustResolver.isAnonymous(authentication);
      if (isAnonymous || this.authenticationTrustResolver.isRememberMe(authentication)) {
         // 如果是匿名的（未登录的）和记住我登录的，重新认证
         if (logger.isTraceEnabled()) {
            logger.trace(LogMessage.format("Sending %s to authentication entry point since access is denied",
                  authentication), exception);
         }
         sendStartAuthentication(request, response, chain,
               new InsufficientAuthenticationException(
                     this.messages.getMessage("ExceptionTranslationFilter.insufficientAuthentication",
                           "Full authentication is required to access this resource")));
      }
      else {
         // 否则就调用权限拒绝的处理器
         if (logger.isTraceEnabled()) {
            logger.trace(
                  LogMessage.format("Sending %s to access denied handler since access is denied", authentication),
                  exception);
         }
         this.accessDeniedHandler.handle(request, response, exception);
      }
   }
   // 发送重新认证
   protected void sendStartAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
         AuthenticationException reason) throws ServletException, IOException {
      // SEC-112: Clear the SecurityContextHolder's Authentication, as the
      // existing Authentication is no longer considered valid
      SecurityContext context = SecurityContextHolder.createEmptyContext();
      SecurityContextHolder.setContext(context);
      // 先将想要访问的请i去保存起来，登录成功后在复原登录之前访问的那个请求(RequestCacheAwareFilter类里说过)
      this.requestCache.saveRequest(request, response);
      // 认证端点（访问的入口） 返回json或重定向到登录页
      this.authenticationEntryPoint.commence(request, response, reason);
   }
   ...
}
```

![image-20230107102203033](https://gitlab.com/apzs/image/-/raw/master/image/image-20230107102203033.png)

`ThrowableAnalyzer`类相当于是个管理者，里面的`extractorMap`维护了一堆的`ThrowableCauseExtractor`

```java
public class ThrowableAnalyzer {
   ...
   private final Map<Class<? extends Throwable>, ThrowableCauseExtractor> extractorMap;

   /**
    * Creates a new <code>ThrowableAnalyzer</code> instance.
    */
   public ThrowableAnalyzer() {
      this.extractorMap = new TreeMap<>(CLASS_HIERARCHY_COMPARATOR);
      initExtractorMap();
   }
   ...
}
```

![image-20230107104742234](https://gitlab.com/apzs/image/-/raw/master/image/image-20230107104742234.png)

### 2、加载过程

这一整条链到底如何装配起来了，HttpSecurity到底做 了什么? SpringSecurity 顶层流程:
**DelegatingFilterProxy -> FilterChainProxy -> SecurityFilterChain ->具体的Filter**
HttpSecurityConfiguration配置了基础的HttpSecurity 对象以供我们注入使用
WebSecurityConfiguration注入了我们自己的SecurityFilterChain Bean然后 添加到WebSecurity中
最终由WebSecurity 构建出FilterChainProxy 来执行SpringSecurity的过滤逻辑

#### HttpSecurityConfiguration

```java
@Configuration(proxyBeanMethods = false)
class HttpSecurityConfiguration {

   private static final String BEAN_NAME_PREFIX = "org.springframework.security.config.annotation.web.configuration.HttpSecurityConfiguration.";

   private static final String HTTPSECURITY_BEAN_NAME = BEAN_NAME_PREFIX + "httpSecurity";

   private ObjectPostProcessor<Object> objectPostProcessor;

   private AuthenticationManager authenticationManager;

   private AuthenticationConfiguration authenticationConfiguration;

   private ApplicationContext context;

   @Autowired
   void setObjectPostProcessor(ObjectPostProcessor<Object> objectPostProcessor) {
      this.objectPostProcessor = objectPostProcessor;
   }

   void setAuthenticationManager(AuthenticationManager authenticationManager) {
      this.authenticationManager = authenticationManager;
   }

   @Autowired
   void setAuthenticationConfiguration(AuthenticationConfiguration authenticationConfiguration) {
      this.authenticationConfiguration = authenticationConfiguration;
   }

   @Autowired
   void setApplicationContext(ApplicationContext context) {
      this.context = context;
   }
   // 创建多例的HttpSecurity（@Scope("prototype")表示多例的，即容器中可以配置多个HttpSecurity）
   @Bean(HTTPSECURITY_BEAN_NAME)
   @Scope("prototype")
   HttpSecurity httpSecurity() throws Exception {
      WebSecurityConfigurerAdapter.LazyPasswordEncoder passwordEncoder = new WebSecurityConfigurerAdapter.LazyPasswordEncoder(
            this.context);
      AuthenticationManagerBuilder authenticationBuilder = new WebSecurityConfigurerAdapter.DefaultPasswordEncoderAuthenticationManagerBuilder(
            this.objectPostProcessor, passwordEncoder);
      authenticationBuilder.parentAuthenticationManager(authenticationManager());
      authenticationBuilder.authenticationEventPublisher(getAuthenticationEventPublisher());
      HttpSecurity http = new HttpSecurity(this.objectPostProcessor, authenticationBuilder, createSharedObjects());
      // @formatter:off
      http
         .csrf(withDefaults())
         .addFilter(new WebAsyncManagerIntegrationFilter())
         .exceptionHandling(withDefaults())
         .headers(withDefaults())
         .sessionManagement(withDefaults())
         .securityContext(withDefaults())
         .requestCache(withDefaults())
         .anonymous(withDefaults())
         .servletApi(withDefaults())
         .apply(new DefaultLoginPageConfigurer<>());
      http.logout(withDefaults());
      // @formatter:on
      // 加载spring.factory文件里配置的key为AbstractHttpConfigurer的所有类
      applyDefaultConfigurers(http);
      return http;
   }

   private AuthenticationManager authenticationManager() throws Exception {
      return (this.authenticationManager != null) ? this.authenticationManager
            : this.authenticationConfiguration.getAuthenticationManager();
   }

   private AuthenticationEventPublisher getAuthenticationEventPublisher() {
      if (this.context.getBeanNamesForType(AuthenticationEventPublisher.class).length > 0) {
         return this.context.getBean(AuthenticationEventPublisher.class);
      }
      return this.objectPostProcessor.postProcess(new DefaultAuthenticationEventPublisher());
   }

   private void applyDefaultConfigurers(HttpSecurity http) throws Exception {
      ClassLoader classLoader = this.context.getClassLoader();
      // 加载spring.factory文件里配置的key为AbstractHttpConfigurer的所有类
      List<AbstractHttpConfigurer> defaultHttpConfigurers = SpringFactoriesLoader
            .loadFactories(AbstractHttpConfigurer.class, classLoader);
      for (AbstractHttpConfigurer configurer : defaultHttpConfigurers) {
         // 挨个调用apply方法
         http.apply(configurer);
      }
   }

   private Map<Class<?>, Object> createSharedObjects() {
      Map<Class<?>, Object> sharedObjects = new HashMap<>();
      sharedObjects.put(ApplicationContext.class, this.context);
      return sharedObjects;
   }

}
```

![image-20230107105844021](https://gitlab.com/apzs/image/-/raw/master/image/image-20230107105844021.png)

那这些配置在哪用到呢？

#### WebSecurityConfiguration

在`WebSecurityConfiguration`类的`springSecurityFilterChain`方法里

```java
@Configuration(proxyBeanMethods = false)
public class WebSecurityConfiguration implements ImportAware, BeanClassLoaderAware {

   private WebSecurity webSecurity;

   private Boolean debugEnabled;

   private List<SecurityConfigurer<Filter, WebSecurity>> webSecurityConfigurers;

   private List<SecurityFilterChain> securityFilterChains = Collections.emptyList();

   private List<WebSecurityCustomizer> webSecurityCustomizers = Collections.emptyList();
   ...
   // Bean的名字叫springSecurityFilterChain
   @Bean(name = AbstractSecurityWebApplicationInitializer.DEFAULT_FILTER_NAME)
   public Filter springSecurityFilterChain() throws Exception {
      boolean hasConfigurers = this.webSecurityConfigurers != null && !this.webSecurityConfigurers.isEmpty();
      boolean hasFilterChain = !this.securityFilterChains.isEmpty();
      Assert.state(!(hasConfigurers && hasFilterChain),
            "Found WebSecurityConfigurerAdapter as well as SecurityFilterChain. Please select just one.");
      if (!hasConfigurers && !hasFilterChain) {
         WebSecurityConfigurerAdapter adapter = this.objectObjectPostProcessor
               .postProcess(new WebSecurityConfigurerAdapter() {
               });
         this.webSecurity.apply(adapter);
      }
      for (SecurityFilterChain securityFilterChain : this.securityFilterChains) {
         this.webSecurity.addSecurityFilterChainBuilder(() -> securityFilterChain);
         for (Filter filter : securityFilterChain.getFilters()) {
            if (filter instanceof FilterSecurityInterceptor) {
               this.webSecurity.securityInterceptor((FilterSecurityInterceptor) filter);
               break;
            }
         }
      }
      for (WebSecurityCustomizer customizer : this.webSecurityCustomizers) {
         customizer.customize(this.webSecurity);
      }
      return this.webSecurity.build();
   }
   ...
}
```

![image-20230107110542168](https://gitlab.com/apzs/image/-/raw/master/image/image-20230107110542168.png)

这些`Filter`又在哪用到呢？

#### DelegatingFilterProxy

在`org.springframework.web.filter.DelegatingFilterProxy`类的`doFilter`方法里（该类是`web`模块的）

```java
public class DelegatingFilterProxy extends GenericFilterBean {

   @Nullable
   private String contextAttribute;

   @Nullable
   private WebApplicationContext webApplicationContext;

   @Nullable
   private String targetBeanName;

   private boolean targetFilterLifecycle = false;

   @Nullable
   private volatile Filter delegate;
   ...

   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
         throws ServletException, IOException {

      // Lazily initialize the delegate if necessary.
      Filter delegateToUse = this.delegate;
      // 双检锁
      if (delegateToUse == null) {
         synchronized (this.delegateMonitor) {
            delegateToUse = this.delegate;
            if (delegateToUse == null) {
               WebApplicationContext wac = findWebApplicationContext();
               if (wac == null) {
                  throw new IllegalStateException("No WebApplicationContext found: " +
                        "no ContextLoaderListener or DispatcherServlet registered?");
               }
               // 初始化
               delegateToUse = initDelegate(wac);
            }
            this.delegate = delegateToUse;
         }
      }

      // Let the delegate perform the actual doFilter operation.
      invokeDelegate(delegateToUse, request, response, filterChain);
   }
   ...
   @Nullable
   protected WebApplicationContext findWebApplicationContext() {
      if (this.webApplicationContext != null) {
         // The user has injected a context at construction time -> use it...
         if (this.webApplicationContext instanceof ConfigurableApplicationContext) {
            ConfigurableApplicationContext cac = (ConfigurableApplicationContext) this.webApplicationContext;
            if (!cac.isActive()) {
               // The context has not yet been refreshed -> do so before returning it...
               cac.refresh();
            }
         }
         return this.webApplicationContext;
      }
      String attrName = getContextAttribute();
      if (attrName != null) {
         return WebApplicationContextUtils.getWebApplicationContext(getServletContext(), attrName);
      }
      else {
         return WebApplicationContextUtils.findWebApplicationContext(getServletContext());
      }
   }

   protected Filter initDelegate(WebApplicationContext wac) throws ServletException {
      String targetBeanName = getTargetBeanName();
      Assert.state(targetBeanName != null, "No target bean name set");
      // 获取Bean的名字为springSecurityFilterChain的过滤器（就是上面的过滤器）
      Filter delegate = wac.getBean(targetBeanName, Filter.class);
      if (isTargetFilterLifecycle()) {
         // 调用其init方法
         delegate.init(getFilterConfig());
      }
      return delegate;
   }
   ...
}
```

![image-20230107111656995](https://gitlab.com/apzs/image/-/raw/master/image/image-20230107111656995.png)

## 授权

## AuthorizeHttpRequestsConfigurer

![image-20230113211130577](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113211130577.png)

### AuthorizationFilter

AuthorizationManager：授权过滤器

```java
public class AuthorizationFilter extends GenericFilterBean {

   private final AuthorizationManager<HttpServletRequest> authorizationManager;

   private AuthorizationEventPublisher eventPublisher = AuthorizationFilter::noPublish;
   ...
   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
         throws ServletException, IOException {

      HttpServletRequest request = (HttpServletRequest) servletRequest;
      HttpServletResponse response = (HttpServletResponse) servletResponse;

      if (this.observeOncePerRequest && isApplied(request)) {
         chain.doFilter(request, response);
         return;
      }

      if (skipDispatch(request)) {
         chain.doFilter(request, response);
         return;
      }

      String alreadyFilteredAttributeName = getAlreadyFilteredAttributeName();
      request.setAttribute(alreadyFilteredAttributeName, Boolean.TRUE);
      try {
         // 授权决策 （第一个参数传递本类getAuthentication方法的返回值Authentication）
         AuthorizationDecision decision = this.authorizationManager.check(this::getAuthentication, request);
         // 发布事件
         this.eventPublisher.publishAuthorizationEvent(this::getAuthentication, request, decision);
         // 如果授权决策不为null，且没有派发权限 (Granted是动词，派发权限) 就抛出权限拒绝异常
         // decision为null证明不需要授权，decision.isGranted()为true表明该用户已yong'yo
         if (decision != null && !decision.isGranted()) {
            throw new AccessDeniedException("Access Denied");
         }
         chain.doFilter(request, response);
      }
      finally {
         request.removeAttribute(alreadyFilteredAttributeName);
      }
   }
   ...
   private Authentication getAuthentication() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication == null) {
         throw new AuthenticationCredentialsNotFoundException(
            "An Authentication object was not found in the SecurityContext");
      }
      return authentication;
   }
    ...
}
```

![image-20230110210423380](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110210423380.png)

### AuthorizationManager

AuthorizationManager：一个授权管理器，它可以确定一个认证是否可以访问特定对象。

```java

/**
 * An Authorization manager which can determine if an {@link Authentication} has access to
 * a specific object.
 * 一个授权管理器，它可以确定一个认证是否可以访问特定对象。
 * @param <T> the type of object that the authorization check is being done one.
 * 泛型<T>就是授权检查能否访问的那个特定对象
 * @author Evgeniy Cheban
 */
@FunctionalInterface
public interface AuthorizationManager<T> {
    // 调用check方法进行校验，如果授权决策不为null，且没有派发权限 (Granted是动词，派发权限) 就抛出权限拒绝异常
	default void verify(Supplier<Authentication> authentication, T object) {
		AuthorizationDecision decision = check(authentication, object);
		if (decision != null && !decision.isGranted()) {
			throw new AccessDeniedException("Access Denied");
		}
	}

	/**
	 * Supplier是java8新增的函数式接口，他是一个提供器，通过其get()方法可以获得该泛型对象，即Authentication
	 * AuthorizationFilter类的doFilter方法里使用的this.authorizationManager.check(this::getAuthentication, request); 里this::getAuthentication返回的就是AuthorizationFilter
	 */
	@Nullable
	AuthorizationDecision check(Supplier<Authentication> authentication, T object);

}
```

![image-20230110210632947](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110210632947.png)

**Supplier接口**

```java
@FunctionalInterface
public interface Supplier<T> {

    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
```

![image-20230110213645851](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110213645851.png)

> [Supplier应用场景](https://blog.csdn.net/SVDJASFHIAU/article/details/125238970)
>
> Supplier可以返回一个对象的接口; 但实际Supplier和Functin一样有实现回调的功能,基于此特性可以实现类似设计模式中的装饰模式;可以在开发中对一些功能一致的操作进行封装
> 例子: 演示 回调场景,基于此可以实现很多功能,例如 mq的消费幂等,分布式锁等等
> 抽象类：做一些通用的逻辑
>
> ```java
> package com.qdone.utils.test;
>  
>  
> import java.util.function.Supplier;
>  
> /**
>  * @author ：xiangyuan.zhou
>  * @date ：Created at 2022年06月09日 10:43
>  * @description：当A2执行时
>  */
> public abstract class A1 {
>     protected void idempotentMessageBody(String msgKey, Supplier<Boolean> supplier){
>         //对消息体进行md5加密做为key, 放入redis, 有效时间暂定60s, 重复消息抛弃并告警
>         System.out.println("获得锁"+ msgKey);
>  
>         //开始执行A2的printString()方法,  就可以在前后进行一些修饰
>         supplier.get();
>  
>         System.out.println("释放锁");
>     }
> }
> ```
>
> 实现类：实现特殊的业务
>
> ```java
> package com.qdone.utils.test;
>  
> /**
>  * @author ：xiangyuan.zhou
>  * @date ：Created at 2022年06月09日 10:44
>  * @description：
>  */
> public class A2 extends A1{
>  
>     public void execution(){
>         System.out.println("开始执行");
>         String value = "hugo";
>         idempotentMessageBody(value, ()-> printString(value));
>     }
>  
>  
>     public boolean printString(String aaa){
>         System.out.println("printString方法开始执行"+ aaa);
>         return true;
>     }
>  
>     //测试类,可以debug下看下执行流程
>     public static void main(String[] args) {
>         A2 a2 = new A2();
>         a2.execution();
>     }
> }
> ```

### AuthorizationDecision

`AuthorizationDecision`类非常简单，就一个`boolean`类型的`granted`

```java
public class AuthorizationDecision {

   private final boolean granted;

   public AuthorizationDecision(boolean granted) {
      this.granted = granted;
   }

   public boolean isGranted() {
      return this.granted;
   }

   @Override
   public String toString() {
      return getClass().getSimpleName() + " [granted=" + this.granted + "]";
   }

}
```

![image-20230110213857079](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110213857079.png)

### AuthorizeHttpRequestsConfigurer

接下来，我们看`AuthorizeHttpRequestsConfigurer`，下图是其继承关系

![image-20230110214243350](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110214243350.png)

既然是`Configurer`，首先应该看的就是`init`方法和`configure`方法（这个类没有`init`方法，也就是该类不用设置一些共享对象）

```java
public final class AuthorizeHttpRequestsConfigurer<H extends HttpSecurityBuilder<H>>
      extends AbstractHttpConfigurer<AuthorizeHttpRequestsConfigurer<H>, H> {

   static final AuthorizationManager<RequestAuthorizationContext> permitAllAuthorizationManager = (a,
         o) -> new AuthorizationDecision(true);
   // 授权管理器请求匹配器的注册器
   private final AuthorizationManagerRequestMatcherRegistry registry;

   private final AuthorizationEventPublisher publisher;
   ...
   @Override
   public void configure(H http) {
      // 通过registry的createAuthorizationManager方法返回一个AuthorizationManager（创建授权管理器是一个复杂的过程）
      AuthorizationManager<HttpServletRequest> authorizationManager = this.registry.createAuthorizationManager();
      // 创建AuthorizationFilter，构造方法传递刚刚创建的authorizationManager
      AuthorizationFilter authorizationFilter = new AuthorizationFilter(authorizationManager);
      authorizationFilter.setAuthorizationEventPublisher(this.publisher);
      authorizationFilter.setShouldFilterAllDispatcherTypes(this.registry.shouldFilterAllDispatcherTypes);
      // 添加过滤器
      http.addFilter(postProcess(authorizationFilter));
   }
   ...
   public final class AuthorizationManagerRequestMatcherRegistry
         extends AbstractRequestMatcherRegistry<AuthorizedUrl> {
      ...
   }
}
```

![image-20230110215625697](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110215625697.png)

### AuthorizationManagerRequestMatcherRegistry

`AuthorizationManagerRequestMatcherRegistry`类是`AuthorizeHttpRequestsConfigurer`类的内部类，其继承自`AbstractRequestMatcherRegistry`

![image-20230110215747805](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110215747805.png)

#### AbstractRequestMatcherRegistry

`AuthorizationManagerRequestMatcherRegistry`类继承自`AbstractRequestMatcherRegistry`，`AbstractRequestMatcherRegistry`用于注册 RequestMatcher 的基类。 例如，它可能允许指定哪个 RequestMatcher 需要特定级别的授权。

查看该抽象类的方法，可以看到有些方法我们非常熟悉，比如说`anyRequest`、`antMatchers`等

<img src="https://gitlab.com/apzs/image/-/raw/master/image/image-20230110220043930.png" alt="image-20230110220043930" style="zoom: 80%;" />

`antMatchers`方法首先会判断`this.anyRequestConfigured`的值，然后调用`chainRequestMatchers`方法，并传递`List<RequestMatcher>`。`chainRequestMatchers`方法为抽象方法，交由子类去实现。

（泛型`C`为返回的对象，这些是一个链，也就是我们可以链式编程，调用完一个方法后可以输入`.`再调用其他方法）

```java
public abstract class AbstractRequestMatcherRegistry<C> {
    ...
	public C antMatchers(HttpMethod method, String... antPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
		return chainRequestMatchers(RequestMatchers.antMatchers(method, antPatterns));
	}

	public C antMatchers(String... antPatterns) {
		Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
		return chainRequestMatchers(RequestMatchers.antMatchers(antPatterns));
	}
    ...
    // 子类实现该抽象方法
    protected abstract C chainRequestMatchers(List<RequestMatcher> requestMatchers);
    
	private static final class RequestMatchers {

		private RequestMatchers() {
		}

		static List<RequestMatcher> antMatchers(HttpMethod httpMethod, String... antPatterns) {
			String method = (httpMethod != null) ? httpMethod.toString() : null;
			List<RequestMatcher> matchers = new ArrayList<>();
			for (String pattern : antPatterns) {
                // 循环创建AntPathRequestMatcher
				matchers.add(new AntPathRequestMatcher(pattern, method));
			}
			return matchers;
		}
        ...
	}
}
```

![image-20230110220401669](https://gitlab.com/apzs/image/-/raw/master/image/image-20230110220401669.png)

#### AuthorizationManagerRequestMatcherRegistry

`AuthorizationManagerRequestMatcherRegistry`类是`AuthorizeHttpRequestsConfigurer`类的内部类，其实现了`AbstractRequestMatcherRegistry`抽象类的`chainRequestMatchers`方法

创建的`AuthorizedUrl`类也是`AuthorizeHttpRequestsConfigurer`类的内部类

```java
@Override
protected AuthorizedUrl chainRequestMatchers(List<RequestMatcher> requestMatchers) {
   this.unmappedMatchers = requestMatchers;
   return new AuthorizedUrl(requestMatchers);
}
```

![image-20230111210407089](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111210407089.png)

`AuthorizedUrl`类的有些方法我们应该非常熟悉，他们最终都调用了`access`方法

![image-20230111210551740](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111210551740.png)

这个`access`方法调用了本`AuthorizedUrl`内部内外部的`AuthorizeHttpRequestsConfigurer`类的`addMapping`方法

```java
public AuthorizationManagerRequestMatcherRegistry access(
      AuthorizationManager<RequestAuthorizationContext> manager) {
   Assert.notNull(manager, "manager cannot be null");
   return AuthorizeHttpRequestsConfigurer.this.addMapping(this.matchers, manager);
}
```

![image-20230111211351194](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111211351194.png)

参数`manager`的泛型为`RequestAuthorizationContext`，其维护了`request`和`variables`

```java
public final class RequestAuthorizationContext {

   private final HttpServletRequest request;

   private final Map<String, String> variables;
   ...
}
```

![image-20230111212524191](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111212524191.png)

`AuthorizeHttpRequestsConfigurer`类的`addMapping`方法，循环调用了`registry`对象的`addMapping`方法，这个`registry`就是本类的`AuthorizationManagerRequestMatcherRegistry`内部类

```java
private AuthorizationManagerRequestMatcherRegistry addMapping(List<? extends RequestMatcher> matchers,
      AuthorizationManager<RequestAuthorizationContext> manager) {
   for (RequestMatcher matcher : matchers) {
      this.registry.addMapping(matcher, manager);
   }
   return this.registry;
}
```

![image-20230111211649189](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111211649189.png)

`AuthorizationManagerRequestMatcherRegistry`类的`addMapping`方法调用了`managerBuilder`对象的`add`方法，`managerBuilder`对象的值为`RequestMatcherDelegatingAuthorizationManager.builder()`

```java
public final class AuthorizationManagerRequestMatcherRegistry
      extends AbstractRequestMatcherRegistry<AuthorizedUrl> {

   private final RequestMatcherDelegatingAuthorizationManager.Builder managerBuilder = RequestMatcherDelegatingAuthorizationManager
         .builder();
   ...
   private void addMapping(RequestMatcher matcher, AuthorizationManager<RequestAuthorizationContext> manager) {
      this.unmappedMatchers = null;
      this.managerBuilder.add(matcher, manager);
      this.mappingCount++;
   }
   ...
}
```

![image-20230111211932746](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111211932746.png)

```java
public final class AuthorizeHttpRequestsConfigurer<H extends HttpSecurityBuilder<H>>
		extends AbstractHttpConfigurer<AuthorizeHttpRequestsConfigurer<H>, H> {
	static final AuthorizationManager<RequestAuthorizationContext> permitAllAuthorizationManager = (a,
			o) -> new AuthorizationDecision(true);
	private final AuthorizationManagerRequestMatcherRegistry registry;
	private final AuthorizationEventPublisher publisher;
    ...
	@Override
	public void configure(H http) {
        // 创建认证管理器，chaung类型为RequestMatcherDelegatingAuthorizationManager
		AuthorizationManager<HttpServletRequest> authorizationManager = this.registry.createAuthorizationManager();
		AuthorizationFilter authorizationFilter = new AuthorizationFilter(authorizationManager);
		authorizationFilter.setAuthorizationEventPublisher(this.publisher);
		authorizationFilter.setShouldFilterAllDispatcherTypes(this.registry.shouldFilterAllDispatcherTypes);
		http.addFilter(postProcess(authorizationFilter));
	}

	private AuthorizationManagerRequestMatcherRegistry addMapping(List<? extends RequestMatcher> matchers,
			AuthorizationManager<RequestAuthorizationContext> manager) {
		for (RequestMatcher matcher : matchers) {
			this.registry.addMapping(matcher, manager);
		}
		return this.registry;
	}
    ...
	public final class AuthorizationManagerRequestMatcherRegistry
			extends AbstractRequestMatcherRegistry<AuthorizedUrl> {
		private final RequestMatcherDelegatingAuthorizationManager.Builder managerBuilder = RequestMatcherDelegatingAuthorizationManager
				.builder();
		private List<RequestMatcher> unmappedMatchers;
        ...
		private void addMapping(RequestMatcher matcher, AuthorizationManager<RequestAuthorizationContext> manager) {
			this.unmappedMatchers = null;
			this.managerBuilder.add(matcher, manager);
			this.mappingCount++;
		}
        ...
        // 创建认证管理器
		private AuthorizationManager<HttpServletRequest> createAuthorizationManager() {
			Assert.state(this.unmappedMatchers == null,
					() -> "An incomplete mapping was found for " + this.unmappedMatchers
							+ ". Try completing it with something like requestUrls().<something>.hasRole('USER')");
			Assert.state(this.mappingCount > 0,
					"At least one mapping is required (for example, authorizeHttpRequests().anyRequest().authenticated())");
            // 处理managerBuilder.build()，managerBuilder对象的类型为RequestMatcherDelegatingAuthorizationManager.Builder
            // 该build方法返回RequestMatcherDelegatingAuthorizationManager
			return postProcess(this.managerBuilder.build());
		} 
        ...
		@Override
		protected AuthorizedUrl chainRequestMatchers(List<RequestMatcher> requestMatchers) {
			this.unmappedMatchers = requestMatchers;
			return new AuthorizedUrl(requestMatchers);
		}
        ...
		public H and() {
			return AuthorizeHttpRequestsConfigurer.this.and();
		}

	}
    ...
	public class AuthorizedUrl {

		private final List<? extends RequestMatcher> matchers;
        
        AuthorizedUrl(List<? extends RequestMatcher> matchers) {
			this.matchers = matchers;
		}
        ...
		public AuthorizationManagerRequestMatcherRegistry permitAll() {
			return access(permitAllAuthorizationManager);
		}

		public AuthorizationManagerRequestMatcherRegistry denyAll() {
			return access((a, o) -> new AuthorizationDecision(false));
		}

		public AuthorizationManagerRequestMatcherRegistry hasRole(String role) {
			return access(AuthorityAuthorizationManager.hasRole(role));
		}

		public AuthorizationManagerRequestMatcherRegistry hasAnyRole(String... roles) {
			return access(AuthorityAuthorizationManager.hasAnyRole(roles));
		}

		public AuthorizationManagerRequestMatcherRegistry hasAuthority(String authority) {
			return access(AuthorityAuthorizationManager.hasAuthority(authority));
		}

		public AuthorizationManagerRequestMatcherRegistry hasAnyAuthority(String... authorities) {
			return access(AuthorityAuthorizationManager.hasAnyAuthority(authorities));
		}

		public AuthorizationManagerRequestMatcherRegistry authenticated() {
			return access(AuthenticatedAuthorizationManager.authenticated());
		}

		public AuthorizationManagerRequestMatcherRegistry access(
				AuthorizationManager<RequestAuthorizationContext> manager) {
			Assert.notNull(manager, "manager cannot be null");
			return AuthorizeHttpRequestsConfigurer.this.addMapping(this.matchers, manager);
		}

	}

}
```

### RequestMatcherDelegatingAuthorizationManager

`managerBuilder`对象是`RequestMatcherDelegatingAuthorizationManager`类的内部类`Builder`，`RequestMatcherDelegatingAuthorizationManager`类的`builder`方法很简单，就创建了一个`Builder`对象。

`RequestMatcherDelegatingAuthorizationManager`实现了`AuthorizationManager`接口，其维护了一堆的`AuthorizationManager`，它的`check`方法根据请求匹配的结果调用其维护的`AuthorizationManager`的`check`方法

```java
public final class RequestMatcherDelegatingAuthorizationManager implements AuthorizationManager<HttpServletRequest> {

   private final Log logger = LogFactory.getLog(getClass());
   // 维护一个mappings，这个类里面泛型套了个泛型又套了个泛型
   private final List<RequestMatcherEntry<AuthorizationManager<RequestAuthorizationContext>>> mappings;
   ...
	@Override
   public AuthorizationDecision check(Supplier<Authentication> authentication, HttpServletRequest request) {
		if (this.logger.isTraceEnabled()) {
			this.logger.trace(LogMessage.format("Authorizing %s", request));
		}
	for (RequestMatcherEntry<AuthorizationManager<RequestAuthorizationContext>> mapping : this.mappings) {
            // 匹配请求
			RequestMatcher matcher = mapping.getRequestMatcher();
			MatchResult matchResult = matcher.matcher(request);
			if (matchResult.isMatch()) {
				AuthorizationManager<RequestAuthorizationContext> manager = mapping.getEntry();
				if (this.logger.isTraceEnabled()) {
					this.logger.trace(LogMessage.format("Checking authorization on %s using %s", request, manager));
				}
                // 调用AuthorizationManager接口的check方法
				return manager.check(authentication,
						new RequestAuthorizationContext(request, matchResult.getVariables()));
			}
		}
		this.logger.trace("Abstaining since did not find matching RequestMatcher");
		return null;
	}
   // builder方法创建了一个Builder对象
   public static Builder builder() {
      return new Builder();
   }

   public static final class Builder {
      // 这里维护的mappings类型和这个内部类的外部类维护的mappings类型一模一样
      private final List<RequestMatcherEntry<AuthorizationManager<RequestAuthorizationContext>>> mappings = new ArrayList<>();
      // add方法就是在mappings里添加RequestMatcherEntry
      public Builder add(RequestMatcher matcher, AuthorizationManager<RequestAuthorizationContext> manager) {
         Assert.notNull(matcher, "matcher cannot be null");
         Assert.notNull(manager, "manager cannot be null");
         this.mappings.add(new RequestMatcherEntry<>(matcher, manager));
         return this;
      }
      // Consumer是java8新增的消费器，mappings方法就是把mappingsConsumer传给我们，然后调用Consumer的accept方法，然后我们自己实现添加逻辑（我们可以高度自定义）
      public Builder mappings(
            Consumer<List<RequestMatcherEntry<AuthorizationManager<RequestAuthorizationContext>>>> mappingsConsumer) {
         Assert.notNull(mappingsConsumer, "mappingsConsumer cannot be null");
         mappingsConsumer.accept(this.mappings);
         return this;
      }
      // managerBuilder对象的类型为RequestMatcherDelegatingAuthorizationManager.Builder，这是其build方法
      public RequestMatcherDelegatingAuthorizationManager build() {
         return new RequestMatcherDelegatingAuthorizationManager(this.mappings);
      }
   }
}
```

![image-20230111215210144](https://gitlab.com/apzs/image/-/raw/master/image/image-20230111215210144.png)

### AuthorityAuthorizationManager

这是实际干活的类，用于判断某个请求是否需要某些权限，该类实现了`AuthorizationManager`接口。而`RequestMatcherDelegatingAuthorizationManager`也实现了`AuthorizationManager`接口，其维护了一堆的`AuthorizationManager`，它的`check`方法根据请求匹配的结果调用其维护的`AuthorizationManager`的`check`方法

```java
public final class AuthorityAuthorizationManager<T> implements AuthorizationManager<T> {

   private static final String ROLE_PREFIX = "ROLE_";

   private final List<GrantedAuthority> authorities;

   private AuthorityAuthorizationManager(String... authorities) {
      this.authorities = AuthorityUtils.createAuthorityList(authorities);
   }
   ...
   @Override
   public AuthorizationDecision check(Supplier<Authentication> authentication, T object) {
      boolean granted = isGranted(authentication.get());
      return new AuthorityAuthorizationDecision(granted, this.authorities);
   }
   ...
}
```

![image-20230113205625845](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113205625845.png)

### 配置过程

![image-20230113211648769](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113211648769.png)

当我们`.authorizeHttpRequests()`时返回了一个`AuthorizeHttpRequestsConfigurer<HttpSecurity>`的内部类`AuthorizationManagerRequestMatcherRegistry`

![image-20230113211750416](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113211750416.png)

这个`AuthorizationManagerRequestMatcherRegistry`内部类继承了`AbstractRequestMatcherRegistry`抽象类

![image-20230113212226894](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113212226894.png)

`AbstractRequestMatcherRegistry`抽象类有一个`antMatchers`方法返回一个`C`，这个`C`就是`AuthorizationManagerRequestMatcherRegistry`类继承该类时指定的泛型，即`AuthorizedUrl`，因此当我们在`IDEA`里配置`.antMatchers("/admin/**")`时，右边显示的是`AuthorizeHttpRequestsConfigurer<...>.AuthorizedUrl`，也就是`AuthorizeHttpRequestsConfigurer<HttpSecurity>`类的`AuthorizedUrl`内部类

```java
public abstract class AbstractRequestMatcherRegistry<C> {
   ...
   public C antMatchers(String... antPatterns) {
      Assert.state(!this.anyRequestConfigured, "Can't configure antMatchers after anyRequest");
      return chainRequestMatchers(RequestMatchers.antMatchers(antPatterns));
   }
   ...
}
```

![image-20230113212338460](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113212338460.png)

该`AuthorizedUrl`类就有我们常见的`hasRole`、`hasAnyRole`、`hasAuthority`、`hasAnyAuthority`等方法，不过这些方法都会调用`access`方法，而`access`方法调用的是`AuthorizeHttpRequestsConfigurer`类的`addMapping`方法。当我们`.hasRole("ADMIN")`时又返回了一个`AuthorizationManagerRequestMatcherRegistry`，我们可以接着`.antMatchers("/user/**").hasRole("USER")`

![image-20230113213218230](https://gitlab.com/apzs/image/-/raw/master/image/image-20230113213218230.png)

## --------------------分割线-----------------------------

## FilterSecurityInterceptor

授权有两个过滤器，分别是`AuthorizationFilter`和`FilterSecurityInterceptor`，而`FilterSecurityInterceptor`是最常使用也是最复杂的过滤器。

![image-20230119182819009](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119182819009.png)

```java
public class FilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {
   ...
   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      invoke(new FilterInvocation(request, response, chain));
   }
   ...
}
```

`FilterSecurityInterceptor`类的`doFilter`方法创建了一个`FilterInvocation`对象，然后调用`invoke`方法

### FilterInvocation

这个`FilterInvocation`比较简单，就维护了`FilterChain`、`HttpServletRequest`、`HttpServletResponse`三个属性

```java
public class FilterInvocation {

   static final FilterChain DUMMY_CHAIN = (req, res) -> {
      throw new UnsupportedOperationException("Dummy filter chain");
   };

   private FilterChain chain;

   private HttpServletRequest request;

   private HttpServletResponse response;

   public FilterInvocation(ServletRequest request, ServletResponse response, FilterChain chain) {
      Assert.isTrue(request != null && response != null && chain != null, "Cannot pass null values to constructor");
      this.request = (HttpServletRequest) request;
      this.response = (HttpServletResponse) response;
      this.chain = chain;
   }
   ...
}
```

![image-20230119183326572](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119183326572.png)

### FilterSecurityInterceptor

```java
public class FilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {

   private static final String FILTER_APPLIED = "__spring_security_filterSecurityInterceptor_filterApplied";

   private FilterInvocationSecurityMetadataSource securityMetadataSource;

   private boolean observeOncePerRequest = true;
   ...
   public void invoke(FilterInvocation filterInvocation) throws IOException, ServletException {
      // 如果应用过了并且只应用了一次，直接放行
      if (isApplied(filterInvocation) && this.observeOncePerRequest) {
         // filter already applied to this request and user wants us to observe
         // once-per-request handling, so don't re-do security checking
         filterInvocation.getChain().doFilter(filterInvocation.getRequest(), filterInvocation.getResponse());
         return;
      }
      // 这个请求第一次被调用，在request里添加key为__spring_security_filterSecurityInterceptor_filterApplied，value为TRUE的session
      // first time this request being called, so perform security checking
      if (filterInvocation.getRequest() != null && this.observeOncePerRequest) {
         filterInvocation.getRequest().setAttribute(FILTER_APPLIED, Boolean.TRUE);
      }
      InterceptorStatusToken token = super.beforeInvocation(filterInvocation);
      try {
         // 执行过滤器链
         filterInvocation.getChain().doFilter(filterInvocation.getRequest(), filterInvocation.getResponse());
      }
      finally {
         // 将动态修改后的新的SecurityContext重新设置回老的SecurityContext
         super.finallyInvocation(token);
      }
      // 基于方法级别的校验的后置处理（@PostAuthorize、@PostFilter ）把需要的数据过滤出来
      super.afterInvocation(token, null);
   }
   // 是否已经应用过了
   private boolean isApplied(FilterInvocation filterInvocation) {
      return (filterInvocation.getRequest() != null)
            && (filterInvocation.getRequest().getAttribute(FILTER_APPLIED) != null);
   }
   ...
}
```

![image-20230119184312043](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119184312043.png)

### AbstractSecurityInterceptor

```java
public abstract class AbstractSecurityInterceptor
      implements InitializingBean, ApplicationEventPublisherAware, MessageSourceAware {
   ...
   public abstract SecurityMetadataSource obtainSecurityMetadataSource();
   ...
   protected InterceptorStatusToken beforeInvocation(Object object) {
      Assert.notNull(object, "Object was null");
      if (!getSecureObjectClass().isAssignableFrom(object.getClass())) {
         throw new IllegalArgumentException("Security invocation attempted for object " + object.getClass().getName()
               + " but AbstractSecurityInterceptor only configured to support secure objects of type: "
               + getSecureObjectClass());
      }
      // 通过元信息类获取一些属性
      Collection<ConfigAttribute> attributes = this.obtainSecurityMetadataSource().getAttributes(object);
      // 没用获取到元信息（一般不会走到这里来）
      if (CollectionUtils.isEmpty(attributes)) {
      //拒绝公共调用为false时，抛出异常（没有配置的是否让访问，一般我们最后会配置anyRequest，用于设置其他没有特殊配置的请求）
         Assert.isTrue(!this.rejectPublicInvocations,
               () -> "Secure object invocation " + object
                     + " was denied as public invocations are not allowed via this interceptor. "
                     + "This indicates a configuration error because the "
                     + "rejectPublicInvocations property is set to 'true'");
         if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Authorized public object %s", object));
         }
         publishEvent(new PublicInvocationEvent(object));
         return null; // no further work post-invocation
      }
      // 该用户没有认证，不能进行授权
      if (SecurityContextHolder.getContext().getAuthentication() == null) {
         credentialsNotFound(this.messages.getMessage("AbstractSecurityInterceptor.authenticationNotFound",
               "An Authentication object was not found in the SecurityContext"), object, attributes);
      }
      // 拿到认证信息
      Authentication authenticated = authenticateIfRequired();
      if (this.logger.isTraceEnabled()) {
         this.logger.trace(LogMessage.format("Authorizing %s with attributes %s", object, attributes));
      }
      // Attempt authorization
      // 尝试授权（核心方法）（如果授权失败，则抛出异常）
      attemptAuthorization(object, attributes, authenticated);
      if (this.logger.isDebugEnabled()) {
         this.logger.debug(LogMessage.format("Authorized %s with attributes %s", object, attributes));
      }
      // 发布授权成功了事件
      if (this.publishAuthorizationSuccess) {
         publishEvent(new AuthorizedEvent(object, attributes, authenticated));
      }

      // Attempt to run as a different user
      // 将原有的authenticated替换成为新的Authentication,可能增加原先没有的角色信息和权限信息（一般为null）
      Authentication runAs = this.runAsManager.buildRunAs(authenticated, object, attributes);
      if (runAs != null) {
         // 把原有的SecurityContext保存一份
         SecurityContext origCtx = SecurityContextHolder.getContext();
         // 创建一个新的SecurityContext
         SecurityContext newCtx = SecurityContextHolder.createEmptyContext();
         // 把替换后的Authentication设置进去（其子类FilterSecurityInterceptor会调用super.finallyInvocation(token);进行复原）
         newCtx.setAuthentication(runAs);
         SecurityContextHolder.setContext(newCtx);

         if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Switched to RunAs authentication %s", runAs));
         }
         // need to revert to token.Authenticated post-invocation
         // 创建一个动态修改过Authentication的InterceptorStatusToken
         return new InterceptorStatusToken(origCtx, true, attributes, object);
      }
      this.logger.trace("Did not switch RunAs authentication since RunAsManager returned null");
      // no further work post-invocation
      // 创建一个Authentication，保存一些属性
      return new InterceptorStatusToken(SecurityContextHolder.getContext(), false, attributes, object);

   }
   // 尝试进行授权
   private void attemptAuthorization(Object object, Collection<ConfigAttribute> attributes,
         Authentication authenticated) {
      try {
         // 访问决策管理器决策是否放行
         this.accessDecisionManager.decide(authenticated, object, attributes);
      }
      catch (AccessDeniedException ex) {
         if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.format("Failed to authorize %s with attributes %s using %s", object,
                  attributes, this.accessDecisionManager));
         }
         else if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Failed to authorize %s with attributes %s", object, attributes));
         }
         publishEvent(new AuthorizationFailureEvent(object, attributes, authenticated, ex));
         throw ex;
      }
   }

   // 将SecurityContext复原
   protected void finallyInvocation(InterceptorStatusToken token) {
      // 如果token不为空，并且需要被刷新，就将老的SecurityContext设置回去
      if (token != null && token.isContextHolderRefreshRequired()) {
         SecurityContextHolder.setContext(token.getSecurityContext());
         if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.of(
                  () -> "Reverted to original authentication " + token.getSecurityContext().getAuthentication()));
         }
      }
   }
   // 后置处理
   protected Object afterInvocation(InterceptorStatusToken token, Object returnedObject) {
      if (token == null) {
         // public object
         return returnedObject;
      }
      // 有可能我们实现AbstractSecurityInterceptor抽象类时没有调用finallyInvocation方法，因此这里消极地再调一遍（比如我们临时把普通用户升级为管理员，为了防止后面还是管理员，SpringSecurity宁愿多调一次也不让这种事情发生）
      finallyInvocation(token); // continue to clean in this method for passivity
      // 基于方法级别的校验的后置处理（@PostAuthorize、@PostFilter ）
      if (this.afterInvocationManager != null) {
         // Attempt after invocation handling
         try {
            // 把需要的数据过滤出来
            returnedObject = this.afterInvocationManager.decide(token.getSecurityContext().getAuthentication(),
                  token.getSecureObject(), token.getAttributes(), returnedObject);
         }
         catch (AccessDeniedException ex) {
            publishEvent(new AuthorizationFailureEvent(token.getSecureObject(), token.getAttributes(),
                  token.getSecurityContext().getAuthentication(), ex));
            throw ex;
         }
      }
      return returnedObject;
   }

   private Authentication authenticateIfRequired() {
      // 拿到认证信息
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      // 如果已经认证过了，直接返回
      if (authentication.isAuthenticated() && !this.alwaysReauthenticate) {
         if (this.logger.isTraceEnabled()) {
            this.logger.trace(LogMessage.format("Did not re-authenticate %s before authorizing", authentication));
         }
         return authentication;
      }
      // 如果还没有认证，调用authenticationManager认证管理器的authenticate方法进行认证（如果认证失败了会抛出异常）
      authentication = this.authenticationManager.authenticate(authentication);
      // Don't authenticated.setAuthentication(true) because each provider does that
      if (this.logger.isDebugEnabled()) {
         this.logger.debug(LogMessage.format("Re-authenticated %s before authorizing", authentication));
      }
      // 创建空的SecurityContext
      SecurityContext context = SecurityContextHolder.createEmptyContext();
      // 将认证信息设置到上下文中
      context.setAuthentication(authentication);
      SecurityContextHolder.setContext(context);
      return authentication;
   }
   ...
}
```

![image-20230119193824426](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119193824426.png)

`this.obtainSecurityMetadataSource().getAttributes(object);`调用本类抽象的`obtainSecurityMetadataSource();`方法

![image-20230119194601566](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119194601566.png)

其返回类型为`SecurityMetadataSource`，该接口维护了一些`Collection<ConfigAttribute>`

```java
public interface SecurityMetadataSource extends AopInfrastructureBean {

   Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException;

   Collection<ConfigAttribute> getAllConfigAttributes();

   boolean supports(Class<?> clazz);

}
```

![image-20230120174126010](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120174126010.png)

`ConfigAttribute`接口维护了一些属性，可以维护一些`角色`、`权限`等信息

```java
public interface ConfigAttribute extends Serializable {

   String getAttribute();

}
```

![image-20230120174310582](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120174310582.png)

其子类`FilterSecurityInterceptor`返回`this.securityMetadataSource`

```java
@Override
public SecurityMetadataSource obtainSecurityMetadataSource() {
   return this.securityMetadataSource;
}
```

![image-20230119194645208](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119194645208.png)

其类型为`FilterInvocationSecurityMetadataSource`

![image-20230119194743723](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119194743723.png)

#### InterceptorStatusToken

```java
public class InterceptorStatusToken {

   private SecurityContext securityContext;

   private Collection<ConfigAttribute> attr;
   // 一般是FilterInvocation
   private Object secureObject;
   // ContextHolder是否已经被替换过了（即this.runAsManager.buildRunAs是否返回不为null）（一般不会被替换）
   private boolean contextHolderRefreshRequired;

   public InterceptorStatusToken(SecurityContext securityContext, boolean contextHolderRefreshRequired,
         Collection<ConfigAttribute> attributes, Object secureObject) {
      this.securityContext = securityContext;
      this.contextHolderRefreshRequired = contextHolderRefreshRequired;
      this.attr = attributes;
      this.secureObject = secureObject;
   }
   ...
}
```

![image-20230119191208712](https://gitlab.com/apzs/image/-/raw/master/image/image-20230119191208712.png)

授权配置有`UrlAuthorizationConfigurer`（基于`url`配置）和`ExpressionUrlAuthorizationConfigurer`（基于`el`表达式的`url`配置），`ExpressionUrlAuthorizationConfigurer`是最常使用的类，但是比较复杂，因此我们先研究较为简单的`UrlAuthorizationConfigurer` 。

`UrlAuthorizationConfigurer`类并没有实现`init`方法和`configure`方法，其父类`AbstractInterceptUrlConfigurer`实现了`configure`方法

### AbstractInterceptUrlConfigurer

```java
public abstract class AbstractInterceptUrlConfigurer<C extends AbstractInterceptUrlConfigurer<C, H>, H extends HttpSecurityBuilder<H>>
      extends AbstractHttpConfigurer<C, H> {
   ...
   @Override
   public void configure(H http) throws Exception {
      // 创建元数据源
      FilterInvocationSecurityMetadataSource metadataSource = createMetadataSource(http);
      if (metadataSource == null) {
         return;
      }
      // 创建FilterSecurityInterceptor
      FilterSecurityInterceptor securityInterceptor = createFilterSecurityInterceptor(http, metadataSource,
            http.getSharedObject(AuthenticationManager.class));
      if (this.filterSecurityInterceptorOncePerRequest != null) {
         securityInterceptor.setObserveOncePerRequest(this.filterSecurityInterceptorOncePerRequest);
      }
      securityInterceptor = postProcess(securityInterceptor);
      // 添加这个过滤器
      http.addFilter(securityInterceptor);
      // 设置共享属性
      http.setSharedObject(FilterSecurityInterceptor.class, securityInterceptor);
   }

   abstract FilterInvocationSecurityMetadataSource createMetadataSource(H http);

   abstract List<AccessDecisionVoter<?>> getDecisionVoters(H http);
   // 创建默认的访问决策管理器
   private AccessDecisionManager createDefaultAccessDecisionManager(H http) {
      // 投票策略，该类是有一个同意即可（调用getDecisionVoters抽象方法获取决策投票器，让子类去实现该方法）
      AffirmativeBased result = new AffirmativeBased(getDecisionVoters(http));
      return postProcess(result);
   }
   // 获取访问决策管理器
   private AccessDecisionManager getAccessDecisionManager(H http) {
      if (this.accessDecisionManager == null) {
         this.accessDecisionManager = createDefaultAccessDecisionManager(http);
      }
      return this.accessDecisionManager;
   }

   private FilterSecurityInterceptor createFilterSecurityInterceptor(H http,
         FilterInvocationSecurityMetadataSource metadataSource, AuthenticationManager authenticationManager)
         throws Exception {
      // 创建一个FilterSecurityInterceptor
      FilterSecurityInterceptor securityInterceptor = new FilterSecurityInterceptor();
      // 设置安全元数据源
      securityInterceptor.setSecurityMetadataSource(metadataSource);
      // 设置权限决策管理器
      securityInterceptor.setAccessDecisionManager(getAccessDecisionManager(http));
      // 设置认证管理器
      securityInterceptor.setAuthenticationManager(authenticationManager);
      // 校验操作
      securityInterceptor.afterPropertiesSet();
      return securityInterceptor;
   }
   ...
}
```

![image-20230122162035392](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122162035392.png)

#### UrlAuthorizationConfigurer

`AbstractInterceptUrlConfigurer`抽象类的子类`UrlAuthorizationConfigurer`实现的`createMetadataSource`方法里返回`DefaultFilterInvocationSecurityMetadataSource`对象

![image-20230122162243872](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122162243872.png)

##### DefaultFilterInvocationSecurityMetadataSource

`DefaultFilterInvocationSecurityMetadataSource`里面维护了一个`requestMap`，也就是`RequestMatcher`请求匹配器需要哪些配置属性。我们可以很明显的看到其是为`FilterInvocation`服务的。

```java
public class DefaultFilterInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

   protected final Log logger = LogFactory.getLog(getClass());

   private final Map<RequestMatcher, Collection<ConfigAttribute>> requestMap;
   ...
   @Override
   public Collection<ConfigAttribute> getAttributes(Object object) {
      final HttpServletRequest request = ((FilterInvocation) object).getRequest();
      int count = 0;
      for (Map.Entry<RequestMatcher, Collection<ConfigAttribute>> entry : this.requestMap.entrySet()) {
         ...
      }
      return null;
   }

   @Override
   public boolean supports(Class<?> clazz) {
      return FilterInvocation.class.isAssignableFrom(clazz);
   }

}
```

![image-20230122162654863](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122162654863.png)

`AbstractInterceptUrlConfigurer`抽象类的子类`UrlAuthorizationConfigurer`实现的`getDecisionVoters`方法里向`decisionVoters`里添加了`RoleVoter`（角色投票器）和`AuthenticatedVoter`（认证投票器）

```java
public final class UrlAuthorizationConfigurer<H extends HttpSecurityBuilder<H>>
      extends AbstractInterceptUrlConfigurer<UrlAuthorizationConfigurer<H>, H> {
   ...
   @Override
   @SuppressWarnings("rawtypes")
   List<AccessDecisionVoter<?>> getDecisionVoters(H http) {
      List<AccessDecisionVoter<?>> decisionVoters = new ArrayList<>();
      decisionVoters.add(new RoleVoter());
      decisionVoters.add(new AuthenticatedVoter());
      return decisionVoters;
   }
   ...
}
```

![image-20230120190939867](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120190939867.png)

##### StandardInterceptUrlRegistry

![image-20230122162243872](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122162243872.png)

`new DefaultFilterInvocationSecurityMetadataSource(this.registry.createRequestMap());`传的`this.registry`类型为`StandardInterceptUrlRegistry`

![image-20230122170233184](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122170233184.png)

`StandardInterceptUrlRegistry`结构如下图所示，其顶层继承于`AbstractRequestMatcherRegistry`（前面提到的`AuthorizationManagerRequestMatcherRegistry`也是继承该抽象类）

![image-20230122170537697](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122170537697.png)

##### AbstractRequestMatcherRegistry

调用的`this.registry.createRequestMap()`就是调用`StandardInterceptUrlRegistry`抽象类`AbstractRequestMatcherRegistry`的`createRequestMap`方法

```java
public abstract class AbstractConfigAttributeRequestMatcherRegistry<C> extends AbstractRequestMatcherRegistry<C> {

	private List<UrlMapping> urlMappings = new ArrayList<>();

	private List<RequestMatcher> unmappedMatchers;
    ...
	@Override
	protected final C chainRequestMatchers(List<RequestMatcher> requestMatchers) {
		this.unmappedMatchers = requestMatchers;
		return chainRequestMatchersInternal(requestMatchers);
	}

	protected abstract C chainRequestMatchersInternal(List<RequestMatcher> requestMatchers);
    ...
	final LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> createRequestMap() {
		Assert.state(this.unmappedMatchers == null, () -> "An incomplete mapping was found for " + this.unmappedMatchers
				+ ". Try completing it with something like requestUrls().<something>.hasRole('USER')");
		LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> requestMap = new LinkedHashMap<>();
		for (UrlMapping mapping : getUrlMappings()) {
			RequestMatcher matcher = mapping.getRequestMatcher();
			Collection<ConfigAttribute> configAttrs = mapping.getConfigAttrs();
			requestMap.put(matcher, configAttrs);
		}
		return requestMap;
	}

	static final class UrlMapping {

		private final RequestMatcher requestMatcher;

		private final Collection<ConfigAttribute> configAttrs;
        ...
	}
}
```

![image-20230122171313158](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122171313158.png)

![image-20230122171342103](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122171342103.png)

`AbstractConfigAttributeRequestMatcherRegistry`抽象类实现了`chainRequestMatchers`方法，其最终会调用`chainRequestMatchersInternal`方法，而`chainRequestMatchersInternal`又为抽象方法，留给子类去实现。

![image-20230122173757957](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122173757957.png)

```java
public final class UrlAuthorizationConfigurer<H extends HttpSecurityBuilder<H>>
      extends AbstractInterceptUrlConfigurer<UrlAuthorizationConfigurer<H>, H> {

   private final StandardInterceptUrlRegistry registry;

   public UrlAuthorizationConfigurer(ApplicationContext context) {
      this.registry = new StandardInterceptUrlRegistry(context);
   }
   ...
   @Override
   @SuppressWarnings("rawtypes")
   List<AccessDecisionVoter<?>> getDecisionVoters(H http) {
      List<AccessDecisionVoter<?>> decisionVoters = new ArrayList<>();
      decisionVoters.add(new RoleVoter());
      decisionVoters.add(new AuthenticatedVoter());
      return decisionVoters;
   }

   @Override
   FilterInvocationSecurityMetadataSource createMetadataSource(H http) {
      return new DefaultFilterInvocationSecurityMetadataSource(this.registry.createRequestMap());
   }
   ...
   private StandardInterceptUrlRegistry addMapping(Iterable<? extends RequestMatcher> requestMatchers,
		Collection<ConfigAttribute> configAttributes) {
      for (RequestMatcher requestMatcher : requestMatchers) {
	     this.registry.addMapping(
				new AbstractConfigAttributeRequestMatcherRegistry.UrlMapping(requestMatcher, configAttributes));
	   }
	   return this.registry;
   }
   
   private static String hasRole(String role) {
      Assert.isTrue(!role.startsWith("ROLE_"), () -> role
            + " should not start with ROLE_ since ROLE_ is automatically prepended when using hasRole. Consider using hasAuthority or access instead.");
      return "ROLE_" + role;
   }
   ...

   public final class StandardInterceptUrlRegistry extends
         UrlAuthorizationConfigurer<H>.AbstractInterceptUrlRegistry<StandardInterceptUrlRegistry, AuthorizedUrl> {
      ...
      @Override
      protected AuthorizedUrl chainRequestMatchersInternal(List<RequestMatcher> requestMatchers) {
         return new AuthorizedUrl(requestMatchers);
      }
      ...
      public H and() {
         return UrlAuthorizationConfigurer.this.and();
      }
   }
   ...
   public class AuthorizedUrl {

      private final List<? extends RequestMatcher> requestMatchers;

      AuthorizedUrl(List<? extends RequestMatcher> requestMatchers) {
         Assert.notEmpty(requestMatchers, "requestMatchers must contain at least one value");
         this.requestMatchers = requestMatchers;
      }

      public StandardInterceptUrlRegistry hasRole(String role) {
         return access(UrlAuthorizationConfigurer.hasRole(role));
      }

      public StandardInterceptUrlRegistry hasAnyRole(String... roles) {
         return access(UrlAuthorizationConfigurer.hasAnyRole(roles));
      }

      public StandardInterceptUrlRegistry hasAuthority(String authority) {
         return access(authority);
      }

      public StandardInterceptUrlRegistry hasAnyAuthority(String... authorities) {
         return access(UrlAuthorizationConfigurer.hasAnyAuthority(authorities));
      }

      public StandardInterceptUrlRegistry anonymous() {
         return hasRole("ANONYMOUS");
      }

      public StandardInterceptUrlRegistry access(String... attributes) {
         addMapping(this.requestMatchers, SecurityConfig.createList(attributes));
         return UrlAuthorizationConfigurer.this.registry;
      }

      protected List<? extends RequestMatcher> getMatchers() {
         return this.requestMatchers;
      }

   }

}
```

`UrlAuthorizationConfigurer`类的内部类`StandardInterceptUrlRegistry`实现的`chainRequestMatchersInternal`直接`new`了一个`AuthorizedUrl`

![image-20230122174712057](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122174712057.png)

`UrlAuthorizationConfigurer`类的`AuthorizedUrl`和前面的配置类一样，也有`hasRole`、`hasAnyRole`、`hasAuthority`、`hasAnyAuthority`等方法，其最终还是调用`access`方法

```java
public StandardInterceptUrlRegistry access(String... attributes) {
   addMapping(this.requestMatchers, SecurityConfig.createList(attributes));
   return UrlAuthorizationConfigurer.this.registry;
}
```

`SecurityConfig`类只有一个`attrib`属性，其`createList`方法根据`attributeNames`创建`SecurityConfig`对象，添加到`attributes`集合中

```java
public class SecurityConfig implements ConfigAttribute {

   private final String attrib;
   ...
   public static List<ConfigAttribute> createList(String... attributeNames) {
      Assert.notNull(attributeNames, "You must supply an array of attribute names");
      List<ConfigAttribute> attributes = new ArrayList<>(attributeNames.length);
      for (String attribute : attributeNames) {
         attributes.add(new SecurityConfig(attribute.trim()));
      }
      return attributes;
   }

}
```

![image-20230122180318520](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122180318520.png)

`addMapping`方法是本类`UrlAuthorizationConfigurer`的方法，将`requestMatchers`里全部的`requestMatcher`全部应用上`configAttributes`配置属性。

```java
private StandardInterceptUrlRegistry addMapping(Iterable<? extends RequestMatcher> requestMatchers,
      Collection<ConfigAttribute> configAttributes) {
   for (RequestMatcher requestMatcher : requestMatchers) {
      this.registry.addMapping(
            new AbstractConfigAttributeRequestMatcherRegistry.UrlMapping(requestMatcher, configAttributes));
   }
   return this.registry;
}
```

##### RoleVoter

```java
public class RoleVoter implements AccessDecisionVoter<Object> {

   private String rolePrefix = "ROLE_";

   public String getRolePrefix() {
      return this.rolePrefix;
   }

   public void setRolePrefix(String rolePrefix) {
      this.rolePrefix = rolePrefix;
   }
   // 如果配置的属性不为null，并且属性以ROLE_开头
   @Override
   public boolean supports(ConfigAttribute attribute) {
      return (attribute.getAttribute() != null) && attribute.getAttribute().startsWith(getRolePrefix());
   }

   @Override
   public boolean supports(Class<?> clazz) {
      return true;
   }
   // 根据authentication判断是否具有访问object需要的attributes
   @Override
   public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
      if (authentication == null) {
         // 如果没有authentication直接拒绝访问
         return ACCESS_DENIED;
      }
      // 先默认弃权
      int result = ACCESS_ABSTAIN;
      // 获取权限信息，有可能有角色和权限
      Collection<? extends GrantedAuthority> authorities = extractAuthorities(authentication);
      for (ConfigAttribute attribute : attributes) {
         if (this.supports(attribute)) {
            // 如果有支持的，默认先拒绝
            result = ACCESS_DENIED;
            // Attempt to find a matching granted authority
            for (GrantedAuthority authority : authorities) {
               // 如果有一个权限相等就赞成
               if (attribute.getAttribute().equals(authority.getAuthority())) {
                  return ACCESS_GRANTED;
               }
            }
         }
      }
      return result;
   }

   Collection<? extends GrantedAuthority> extractAuthorities(Authentication authentication) {
      return authentication.getAuthorities();
   }

}
```

![image-20230120192101683](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120192101683.png)

##### AuthenticatedVoter

```java
public class AuthenticatedVoter implements AccessDecisionVoter<Object> {
   ...
   @Override
   public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
      // 先默认弃权
      int result = ACCESS_ABSTAIN;
      for (ConfigAttribute attribute : attributes) {
         if (this.supports(attribute)) {
            // 如果有支持的，默认先拒绝
            result = ACCESS_DENIED;
            if (IS_AUTHENTICATED_FULLY.equals(attribute.getAttribute())) {
               // 如果需要是完全认证（通过用户名密码登陆的），则访问者需要是完全认证
               if (isFullyAuthenticated(authentication)) {
                  return ACCESS_GRANTED;
               }
            }
            if (IS_AUTHENTICATED_REMEMBERED.equals(attribute.getAttribute())) {
               // 如果需要是记住我认证（通过记住我登陆的），则访问者需要是完全认证或记住我认证
               if (this.authenticationTrustResolver.isRememberMe(authentication)
                     || isFullyAuthenticated(authentication)) {
                  return ACCESS_GRANTED;
               }
            }
            if (IS_AUTHENTICATED_ANONYMOUSLY.equals(attribute.getAttribute())) {
               // 如果需要是匿名认证（没有登陆的），则访问者需要是完全认证或记住我认证或匿名认证的
               if (this.authenticationTrustResolver.isAnonymous(authentication)
                     || isFullyAuthenticated(authentication)
                     || this.authenticationTrustResolver.isRememberMe(authentication)) {
                  return ACCESS_GRANTED;
               }
            }
         }
      }
      return result;
   }

}
```

![image-20230122160025836](https://gitlab.com/apzs/image/-/raw/master/image/image-20230122160025836.png)

#### AbstractAccessDecisionManager

`createDefaultAccessDecisionManager`方法返回一个`AccessDecisionManager`，我们先看实现了`AccessDecisionManager`接口的抽象类`AbstractAccessDecisionManager`

```java
public abstract class AbstractAccessDecisionManager
      implements AccessDecisionManager, InitializingBean, MessageSourceAware {
   ...
   // 访问决策投票
   private List<AccessDecisionVoter<?>> decisionVoters;

   protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

   private boolean allowIfAllAbstainDecisions = false;

   protected AbstractAccessDecisionManager(List<AccessDecisionVoter<?>> decisionVoters) {
      Assert.notEmpty(decisionVoters, "A list of AccessDecisionVoters is required");
      this.decisionVoters = decisionVoters;
   }

   @Override
   public void afterPropertiesSet() {
      Assert.notEmpty(this.decisionVoters, "A list of AccessDecisionVoters is required");
      Assert.notNull(this.messages, "A message source must be set");
   }
   // 如果所有投票者都弃权了是否让其访问（默认false）
   protected final void checkAllowIfAllAbstainDecisions() {
      if (!this.isAllowIfAllAbstainDecisions()) {
         throw new AccessDeniedException(
               this.messages.getMessage("AbstractAccessDecisionManager.accessDenied", "Access is denied"));
      }
   }
  
   public List<AccessDecisionVoter<?>> getDecisionVoters() {
      return this.decisionVoters;
   }

   public boolean isAllowIfAllAbstainDecisions() {
      return this.allowIfAllAbstainDecisions;
   }

   public void setAllowIfAllAbstainDecisions(boolean allowIfAllAbstainDecisions) {
      this.allowIfAllAbstainDecisions = allowIfAllAbstainDecisions;
   }

   @Override
   public void setMessageSource(MessageSource messageSource) {
      this.messages = new MessageSourceAccessor(messageSource);
   }

   @Override
   public boolean supports(ConfigAttribute attribute) {
      // 只要一个支持了，就返回true
      for (AccessDecisionVoter<?> voter : this.decisionVoters) {
         if (voter.supports(attribute)) {
            return true;
         }
      }
      return false;
   }

   @Override
   public boolean supports(Class<?> clazz) {
      // 只要有一个拒绝了就返回false
      for (AccessDecisionVoter<?> voter : this.decisionVoters) {
         if (!voter.supports(clazz)) {
            return false;
         }
      }
      return true;
   }
   ...
}
```

`AbstractAccessDecisionManager`抽象类维护的`AccessDecisionVoter`如下所示

```java
public interface AccessDecisionVoter<S> {
   // 同意
   int ACCESS_GRANTED = 1;
   // 弃权
   int ACCESS_ABSTAIN = 0;
   // 拒绝
   int ACCESS_DENIED = -1;
   // 判断这个配置是否支持投票
   boolean supports(ConfigAttribute attribute);
   // 判断这个类是否支持投票
   boolean supports(Class<?> clazz);
   // 判断拥有这个authentication和attributes能不能访问这个object
   int vote(Authentication authentication, S object, Collection<ConfigAttribute> attributes);

}
```

![image-20230120183246502](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120183246502.png)

`AbstractAccessDecisionManager`抽象类的实现类有三个：`AffirmativeBased`只要一个同意就允许访问；`ConsensusBased`少数服从多数，超过一半才允许访问（如果同意数和拒绝数相等且不为0可以进行单独配置，默认true即允许访问）；`UnanimousBased`全部同意了才允许访问

![image-20230120181859789](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120181859789.png)

```java
public class AffirmativeBased extends AbstractAccessDecisionManager {

   public AffirmativeBased(List<AccessDecisionVoter<?>> decisionVoters) {
      super(decisionVoters);
   }

   @Override
   @SuppressWarnings({ "rawtypes", "unchecked" })
   public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes)
         throws AccessDeniedException {
      int deny = 0;
      for (AccessDecisionVoter voter : getDecisionVoters()) {
         int result = voter.vote(authentication, object, configAttributes);
         switch (result) {
         // 如果有一个同意了直接放行
         case AccessDecisionVoter.ACCESS_GRANTED:
            return;
         // 如果有一个拒绝了直接抛出异常
         case AccessDecisionVoter.ACCESS_DENIED:
            deny++;
            break;
         default:
            break;
         }
      }
      // 如果有一个拒绝了直接抛出异常
      if (deny > 0) {
         throw new AccessDeniedException(
               this.messages.getMessage("AbstractAccessDecisionManager.accessDenied", "Access is denied"));
      }
      // 如果全部弃权了调用父类的checkAllowIfAllAbstainDecisions方法判断是否允许访问（默认不允许）
      // To get this far, every AccessDecisionVoter abstained
      checkAllowIfAllAbstainDecisions();
   }

}
```

![image-20230120185309108](https://gitlab.com/apzs/image/-/raw/master/image/image-20230120185309108.png)

#### ExpressionUrlAuthorizationConfigurer

```groovy
import org.springframework.expression.spel.standard.SpelExpressionParser
import org.springframework.expression.spel.support.StandardEvaluationContext

class Person {
    String name;
    Integer age;

    Person(String name, Integer age) {
        this.name = name
        this.age = age
    }

    String getName() {
        return name
    }

    Integer getAge() {
        return age
    }
}

def parser = new SpelExpressionParser()
def expression = parser.parseExpression("#name + '的爱好是: ' + #hobby + ',他的朋友是' + name + ',年龄是' + age  ")
def context = new StandardEvaluationContext()
context.setVariable("name","张三")
context.setVariable("hobby","打游戏")
context.setRootObject(new Person("李四",28))
println expression.getValue(context)
```

##### createMetadataSource：

`UrlAuthorizationConfigurer`和`ExpressionUrlAuthorizationConfigurer`差不多，只是`ExpressionUrlAuthorizationConfigurer`可以使用`SpEL`（`el`表达式）。`ExpressionUrlAuthorizationConfigurer`父类的`configure`方法里调用抽象的`createMetadataSource`方法，委派给其子类去实现。

![image-20230123140856907](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123140856907.png)

`ExpressionUrlAuthorizationConfigurer`类的`createMetadataSource`方法首先还是调用`this.REGISTRY.createRequestMap()`构建`requestMap`，然后返回`ExpressionBasedFilterInvocationSecurityMetadataSource`，可以看到比`UrlAuthorizationConfigurer`的`createMetadataSource`方法多了一个表达式处理器的参数

```java
@Override
ExpressionBasedFilterInvocationSecurityMetadataSource createMetadataSource(H http) {
   LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> requestMap = this.REGISTRY.createRequestMap();
   Assert.state(!requestMap.isEmpty(),
         "At least one mapping is required (i.e. authorizeRequests().anyRequest().authenticated())");
   return new ExpressionBasedFilterInvocationSecurityMetadataSource(requestMap, getExpressionHandler(http));
}

private SecurityExpressionHandler<FilterInvocation> getExpressionHandler(H http) {
    ...
}
```

![image-20230123141952897](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123141952897.png)

###### SecurityExpressionHandler

`SecurityExpressionHandler`接口有两个方法，一个返回`ExpressionParser`，一个返回`EvaluationContext`

![image-20230123142107635](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123142107635.png)

`ExpressionParser`接口的其中一个实现类是`SpelExpressionParser`

![image-20230123142502679](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123142502679.png)

`EvaluationContext`接口的其中一个实现类是`StandardEvaluationContext`

![image-20230123142420033](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123142420033.png)

可以看到实现`SecurityExpressionHandler`接口的抽象类使用的就是`SpelExpressionParser`和`StandardEvaluationContext`

```java
public abstract class AbstractSecurityExpressionHandler<T>
      implements SecurityExpressionHandler<T>, ApplicationContextAware {

   private ExpressionParser expressionParser = new SpelExpressionParser();

   private BeanResolver beanResolver;

   private RoleHierarchy roleHierarchy;

   private PermissionEvaluator permissionEvaluator = new DenyAllPermissionEvaluator();
   ...
   protected StandardEvaluationContext createEvaluationContextInternal(Authentication authentication, T invocation) {
      return new StandardEvaluationContext();
   }
   ...
}
```

![image-20230123143131098](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123143131098.png)

其子类`DefaultWebSecurityExpressionHandler`的`createSecurityExpressionRoot`方法里创建了`WebSecurityExpressionRoot`对象，因此我们可以直接使用其拥有的属性和方法

![image-20230123144122614](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123144122614.png)

因此可以使用`request`对象和`hasIpAddress`方法，以及其父类的`hasAuthority`、`hasAnyAuthority`、`hasRole`、`hasAnyRole`等方法

![image-20230123144327379](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123144327379.png)

###### ExpressionBasedFilterInvocationSecurityMetadataSource

`ExpressionBasedFilterInvocationSecurityMetadataSource`类直接继承自`DefaultFilterInvocationSecurityMetadataSource`

```java
public final class ExpressionBasedFilterInvocationSecurityMetadataSource
      extends DefaultFilterInvocationSecurityMetadataSource {

   private static final Log logger = LogFactory.getLog(ExpressionBasedFilterInvocationSecurityMetadataSource.class);

   public ExpressionBasedFilterInvocationSecurityMetadataSource(
         LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> requestMap,
         SecurityExpressionHandler<FilterInvocation> expressionHandler) {
      // 调用父类的构造器时，先调用本类的processMap方法
      super(processMap(requestMap, expressionHandler.getExpressionParser()));
      Assert.notNull(expressionHandler, "A non-null SecurityExpressionHandler is required");
   }

   private static LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> processMap(
         LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> requestMap, ExpressionParser parser) {
      Assert.notNull(parser, "SecurityExpressionHandler returned a null parser object");
      // 先将requestMap里的数据存到processed里
      LinkedHashMap<RequestMatcher, Collection<ConfigAttribute>> processed = new LinkedHashMap<>(requestMap);
      // 遍历requestMap，对于每一个键值对，都调用process方法，然后再添加到processed里
      requestMap.forEach((request, value) -> process(parser, request, value, processed::put));
      // 返回processed
      return processed;
   }

   private static void process(ExpressionParser parser, RequestMatcher request, Collection<ConfigAttribute> value,
         BiConsumer<RequestMatcher, Collection<ConfigAttribute>> consumer) {
      // 拿到配置属性的属性值
      String expression = getExpression(request, value);
      if (logger.isDebugEnabled()) {
         logger.debug(LogMessage.format("Adding web access control expression [%s] for %s", expression, request));
      }
      // 创建后置处理
      AbstractVariableEvaluationContextPostProcessor postProcessor = createPostProcessor(request);
      // 创建一个processed集合
      ArrayList<ConfigAttribute> processed = new ArrayList<>(1);
      try {
         // 构造WebExpressionConfigAttribute对象，添加到本方法的processed上去
         processed.add(new WebExpressionConfigAttribute(parser.parseExpression(expression), postProcessor));
      }
      catch (ParseException ex) {
         throw new IllegalArgumentException("Failed to parse expression '" + expression + "'");
      }
      // 调用外面传过来的processed.put(request, processed)方法  （consumer为processed::put的引用）
      consumer.accept(request, processed);
   }

   private static String getExpression(RequestMatcher request, Collection<ConfigAttribute> value) {
      // value的大小必须为1
      Assert.isTrue(value.size() == 1, () -> "Expected a single expression attribute for " + request);
      // 拿到这个配置属性的属性值
      return value.toArray(new ConfigAttribute[1])[0].getAttribute();
   }
   
   private static AbstractVariableEvaluationContextPostProcessor createPostProcessor(RequestMatcher request) {
      // 直接创建一个RequestVariablesExtractorEvaluationContextPostProcessor
      return new RequestVariablesExtractorEvaluationContextPostProcessor(request);
   }
   ...
   static class RequestVariablesExtractorEvaluationContextPostProcessor
         extends AbstractVariableEvaluationContextPostProcessor {

      private final RequestMatcher matcher;

      RequestVariablesExtractorEvaluationContextPostProcessor(RequestMatcher matcher) {
         this.matcher = matcher;
      }

      @Override
      Map<String, String> extractVariables(HttpServletRequest request) {
         // 将request里的变量提取出来
         return this.matcher.matcher(request).getVariables();
      }

   }

}
```

![image-20230123155326929](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123155326929.png)

`RequestVariablesExtractorEvaluationContextPostProcessor`的核心逻辑都在其抽象类`AbstractVariableEvaluationContextPostProcessor`里

```java
abstract class AbstractVariableEvaluationContextPostProcessor
		implements EvaluationContextPostProcessor<FilterInvocation> {

	@Override
	public final EvaluationContext postProcess(EvaluationContext context, FilterInvocation invocation) {
        // 直接创建了一个VariableEvaluationContext
		return new VariableEvaluationContext(context, invocation.getHttpRequest());
	}

	abstract Map<String, String> extractVariables(HttpServletRequest request);

    // VariableEvaluationContext继承自DelegatingEvaluationContext
	class VariableEvaluationContext extends DelegatingEvaluationContext {

		private final HttpServletRequest request;

		private Map<String, String> variables;

		VariableEvaluationContext(EvaluationContext delegate, HttpServletRequest request) {
			super(delegate);
            // 自己又维护了一个请求
			this.request = request;
		}
        
        // 如果代理的SpEl找不到，调用lookupVariable方法去找（我们可以直接使用在request里定义的）
		@Override
		public Object lookupVariable(String name) {
			Object result = super.lookupVariable(name);
			if (result != null) {
				return result;
			}
			if (this.variables == null) {
				this.variables = extractVariables(this.request);
			}
			return this.variables.get(name);
		}

	}

}
```

![image-20230123155515984](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123155515984.png)

##### createFilterSecurityInterceptor：

`AbstractInterceptUrlConfigurer`类的`createFilterSecurityInterceptor`方法里就调用的`getAccessDecisionManager`方法返回的不一样

![image-20230123154403102](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123154403102.png)

`getAccessDecisionManager`方法会调用`createDefaultAccessDecisionManager`方法，`createDefaultAccessDecisionManager`方法会调用`getDecisionVoters`方法

![image-20230123154820989](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123154820989.png)

这个`getDecisionVoters`方法为抽象方法，留给子类去实现

![image-20230123154902852](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123154902852.png)

`ExpressionUrlAuthorizationConfigurer`类里的`getDecisionVoters`方法创建的是基于表达式的投票器

```java
@Override
@SuppressWarnings("rawtypes")
List<AccessDecisionVoter<?>> getDecisionVoters(H http) {
   List<AccessDecisionVoter<?>> decisionVoters = new ArrayList<>();
   WebExpressionVoter expressionVoter = new WebExpressionVoter();
   expressionVoter.setExpressionHandler(getExpressionHandler(http));
   decisionVoters.add(expressionVoter);
   return decisionVoters;
}
```

![image-20230123155754270](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123155754270.png)



```java
public class WebExpressionVoter implements AccessDecisionVoter<FilterInvocation> {
   ...
   @Override
   public int vote(Authentication authentication, FilterInvocation filterInvocation,
         Collection<ConfigAttribute> attributes) {
      Assert.notNull(authentication, "authentication must not be null");
      Assert.notNull(filterInvocation, "filterInvocation must not be null");
      Assert.notNull(attributes, "attributes must not be null");
      // 找到第一个类型为WebExpressionConfigAttribute的配置属性
      WebExpressionConfigAttribute webExpressionConfigAttribute = findConfigAttribute(attributes);
      if (webExpressionConfigAttribute == null) {
         this.logger
               .trace("Abstained since did not find a config attribute of instance WebExpressionConfigAttribute");
         return ACCESS_ABSTAIN;
      }
      EvaluationContext ctx = webExpressionConfigAttribute.postProcess(
            this.expressionHandler.createEvaluationContext(authentication, filterInvocation), filterInvocation);
      // 判断是否同意
      boolean granted = ExpressionUtils.evaluateAsBoolean(webExpressionConfigAttribute.getAuthorizeExpression(), ctx);
      if (granted) {
         return ACCESS_GRANTED;
      }
      this.logger.trace("Voted to deny authorization");
      return ACCESS_DENIED;
   }

   private WebExpressionConfigAttribute findConfigAttribute(Collection<ConfigAttribute> attributes) {
      // 遍历寻找第一个类型为WebExpressionConfigAttribute的配置属性
      for (ConfigAttribute attribute : attributes) {
         if (attribute instanceof WebExpressionConfigAttribute) {
            return (WebExpressionConfigAttribute) attribute;
         }
      }
      return null;
   }
   ...
}
```

![image-20230123160438070](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123160438070.png)

`ExpressionUtils`类的`evaluateAsBoolean`方法就是调用`expr.getValue(ctx, Boolean.class);`，期待返回一个布尔值

```java
public final class ExpressionUtils {

   private ExpressionUtils() {
   }

   public static boolean evaluateAsBoolean(Expression expr, EvaluationContext ctx) {
      try {
         return expr.getValue(ctx, Boolean.class);
      }
      catch (EvaluationException ex) {
         throw new IllegalArgumentException("Failed to evaluate expression '" + expr.getExpressionString() + "'",
               ex);
      }
   }

}
```

![image-20230123160540132](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123160540132.png)

代码示例：

```java
httpSecurity
    .authorizeRequests()
	.mvcMatchers("/admin/**")
	.access("hasRole('ADMIN') && hasAnyAuthority('GROUP_ADMIN') && hasIpAddress('92.168.1.0/24')")
```

![image-20230123161428856](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123161428856.png)

## 基于token的认证方式

`SecurityContextPersistenceFilter`或`SecurityContextHolderFilter`过滤器会把信息放到`SecurityContext`里，这两个过滤器的主要区别是`SecurityContextPersistenceFilter`每次在最后都会保存`SecurityContext`（这样比较消耗性能，没有必要每次都保存，因此该类被弃用了），而`SecurityContextHolderFilter`类不会保存（需要我们每次都手动保存）

![image-20230123164507762](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123164507762.png)

![image-20230123164636037](https://gitlab.com/apzs/image/-/raw/master/image/image-20230123164636037.png)



![image-20230128145255300](https://gitlab.com/apzs/image/-/raw/master/image/image-20230128145255300.png)



![image-20230128145535457](https://gitlab.com/apzs/image/-/raw/master/image/image-20230128145535457.png)
