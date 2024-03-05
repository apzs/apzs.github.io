## 5.6、商城业务-异步

### 5.6.1、初始化线程的4种方式

初始化线程的4种方式
 1. 继承 Thread
 2. 实现 Runnable 接口
 3. 实现 Callable 接口 + FutureTask （可以拿到返回结果，可以处理异常）
 4. 线程池

在`gulimall-search`模块的`com.atguigu.gulimall.search`包下新建`thread`文件夹，在`thread`文件夹里新建`ThreadTest`类(线程的测试不适合使用测试方法来测试，只适合在`main`方法里测试)

#### 1、继承`Thread`类

运行以下测试代码：

```java
public static void main(String[] args) {
    System.out.println("==========main start==========");

    Thread01 thread01 = new Thread01();
    //启动线程
    thread01.start();

    System.out.println("==========main end============");
}

public static class Thread01 extends Thread{
    @SneakyThrows
    @Override
    public void run() {
        System.out.println("当前线程："+Thread.currentThread().getId());
        Thread.sleep(2000);
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
    }
}
```

运行结果：

```
==========main start==========
==========main end============
当前线程：12
运行结果：5
```

可以看出`main`线程和刚刚创建的线程是两个线程，`main`线程执行完后刚刚创建的线程依旧在执行

![image-20220731104410716](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.1.png)

#### 2、实现`Runnable`接口

运行以下测试代码：

```java
public static void main(String[] args) {
    System.out.println("==========main start==========");

    Runnable02 runnable02 = new Runnable02();
    Thread thread02 = new Thread(runnable02);
    thread02.start();

    System.out.println("==========main end============");
}


public static class Runnable02 implements Runnable{

    @SneakyThrows
    @Override
    public void run() {
        System.out.println("当前线程："+Thread.currentThread().getId());
        Thread.sleep(2000);
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
    }
}
```

运行结果：

```
==========main start==========
==========main end============
当前线程：12
运行结果：5
```

可以看出继承`Thread`类和实现`Runnable`接口达到的效果一样

![image-20220731104823314](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.2.png)

#### 3、实现 Callable 接口 + FutureTask

##### 1、实现 Callable 接口

运行以下测试代码：

```java
public static void main(String[] args) {
    System.out.println("==========main start==========");

    Callable03 callable03 = new Callable03();
    FutureTask<Integer> futureTask03 = new FutureTask<>(callable03);
    Thread thread03 = new Thread(futureTask03);
    thread03.start();
    System.out.println("==========main end============");
}

public static class Callable03 implements Callable<Integer>{

    @Override
    public Integer call() throws Exception {
        System.out.println("当前线程："+Thread.currentThread().getId());
        Thread.sleep(2000);
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
        return i;
    }
}
```

运行结果：

```
==========main start==========
==========main end============
当前线程：12
运行结果：5
```

可以看出如果不获取返回值，`实现 Callable 接口`和继承`Thread`类、实现`Runnable`接口达到的效果一样

![image-20220731105554127](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.1.png)

##### 2、获取返回值

运行以下测试代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    Callable03 callable03 = new Callable03();
    FutureTask<Integer> futureTask03 = new FutureTask<>(callable03);
    Thread thread03 = new Thread(futureTask03);
    thread03.start();
    //阻塞式等待整个线程执行完成，获取返回结果
    Integer integer = futureTask03.get();
    System.out.println("返回的结果：" + integer);

    System.out.println("==========main end============");
}

public static class Callable03 implements Callable<Integer>{

    @Override
    public Integer call() throws Exception {
        System.out.println("当前线程："+Thread.currentThread().getId());
        Thread.sleep(2000);
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
        return i;
    }
}
```

运行结果：

```
==========main start==========
当前线程：12
运行结果：5
返回的结果：5
==========main end============
```

可以看到`FutureTask`的`泛型类型`即为`返回类型`，其`get()`方法为阻塞方法，调用`get()`方法后，如果没有获取到返回结果会一直等待，获取到返回结果后才会往下执行

![image-20220731105922499](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.2.png)

##### 3、再次测试

运行以下测试代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    Callable03 callable03 = new Callable03();
    FutureTask<Integer> futureTask03 = new FutureTask<>(callable03);
    Thread thread03 = new Thread(futureTask03);
    thread03.start();
    System.out.println("开启线程之后，获取线程执行结果之前...");
    //阻塞式等待整个线程执行完成，获取返回结果
    Integer integer = futureTask03.get();
    System.out.println("返回的结果：" + integer);

    System.out.println("==========main end============");
}

public static class Callable03 implements Callable<Integer>{

    @Override
    public Integer call() throws Exception {
        System.out.println("当前线程："+Thread.currentThread().getId());
        Thread.sleep(2000);
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
        return i;
    }
}
```

运行结果：

```
==========main start==========
开启线程之后，获取线程执行结果之前...
当前线程：12
运行结果：5
返回的结果：5
==========main end============
```

可以看到只有调用`FutureTask`类的`get()`方法才会阻塞，其前面的代码可以执行

![image-20220731110952167](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.3.png)

##### 4、`FutureTask`参数

`FutureTask<V>`实现了`RunnableFuture<V>`接口，可以接收`FutureTask(Callable<V> callable)`和`FutureTask(Runnable runnable, V result)`

![image-20220731110130569](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.4.1.png)

其中`FutureTask<V>`实现的`RunnableFuture<V>`接口继承`Runnable`和` Future<V>`

:bookmark_tabs:接口可以多继承，但接口只能继承接口，接口不能实现接口、抽象类、实体类

抽象类不可以继承接口，但可以实现接口

抽象类可以继承实体类，但实体类必须有明确的构造函数。

```java
/**
 * A {@link Future} that is {@link Runnable}. Successful execution of
 * the {@code run} method causes completion of the {@code Future}
 * and allows access to its results.
 * @see FutureTask
 * @see Executor
 * @since 1.6
 * @author Doug Lea
 * @param <V> The result type returned by this Future's {@code get} method
 */
public interface RunnableFuture<V> extends Runnable, Future<V> {
    /**
     * Sets this Future to the result of its computation
     * unless it has been cancelled.
     */
    void run();
}
```

![image-20220731110517293](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.4.2.png)

`FutureTask<V>`的构造器可以传`Callable<V> callable`参数

```java
/**
 * Creates a {@code FutureTask} that will, upon running, execute the
 * given {@code Callable}.
 *
 * @param  callable the callable task
 * @throws NullPointerException if the callable is null
 */
public FutureTask(Callable<V> callable) {
    if (callable == null)
        throw new NullPointerException();
    this.callable = callable;
    this.state = NEW;       // ensure visibility of callable
}
```

![image-20220731110236524](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.4.3.png)

`FutureTask<V>`的构造器也可以传`Runnable runnable, V result`两个参数，其中`V result`为一个对象，可以通过这个对象获取结果的返回值

```java
/**
 * Creates a {@code FutureTask} that will, upon running, execute the
 * given {@code Runnable}, and arrange that {@code get} will return the
 * given result on successful completion.
 *
 * @param runnable the runnable task
 * @param result the result to return on successful completion. If
 * you don't need a particular result, consider using
 * constructions of the form:
 * {@code Future<?> f = new FutureTask<Void>(runnable, null)}
 * @throws NullPointerException if the runnable is null
 */
public FutureTask(Runnable runnable, V result) {
    this.callable = Executors.callable(runnable, result);
    this.state = NEW;       // ensure visibility of callable
}
```

![image-20220731110324080](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.3.4.4.png)

#### 4、线程池

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args){
    System.out.println("==========main start==========");
    executorService.execute(new Runnable02());


    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
==========main end============
当前线程：12
运行结果：5
```

可以看到固定线程数量的线程池创建线程后，该线程池不会消失，控制台可以看出还在一直运行

![image-20220731111834984](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.4.1.png)

`ExecutorService`类有`submit`方法，该方法有返回值。而`execute`方法没有返回值

![image-20220731111723003](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.4.2.png)

#### 5、线程池七大参数

    七大参数：
    1、int corePoolSize    [5]核心线程数; 线程池，创建好以后就准备就一直存在【除非设置(allowCoreThreadTimeOut)】
                           5个 Thread thread = new Thread(); thread.start();
    2、int maximumPoolSize 最大线程数量，控制资源
    3、long keepAliveTime  存活时间。如果当前的线程数量大于core数量，并且线程空闲时间大于指定的存活时间，就释放空闲的线程(最少保							留corePoolSize个)。
    4、TimeUnit unit       时间单位
    5、BlockingQueue<Runnable> workQueue 阻塞队列。如果任务有很多，就会将目前多的任务放在队列里面。
                                          只要有线程空用，就会去队列里面取出新的任务继续执行。
     6、ThreadFactory threadFactory 线程的创建工厂
    7、RejectedExecutionHandler handler 拒绝策略 如果队列满了，按照我们指定的拒绝策略拒绝执行任务

##### 1、拒绝策略

在`java.util.concurrent.RejectedExecutionHandler`类里，使用`ctrl + H`快捷键，查看其具体实现类，可以看到主要有以下四个常用拒绝测试

```
java.util.concurrent.ThreadPoolExecutor.DiscardOldestPolicy 丢弃最老的任务
java.util.concurrent.ThreadPoolExecutor.AbortPolicy         丢弃刚来的任务，并抛异常
java.util.concurrent.ThreadPoolExecutor.CallerRunsPolicy    不执行start()，直接调用run()方法
java.util.concurrent.ThreadPoolExecutor.DiscardPolicy       丢弃刚来的任务，不抛异常
```

![image-20220731131107234](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.5.1.png)

##### 2、测试代码

以下为`ThreadPoolExecutor`类创建对象的示例代码

```java
/**
 * 七大参数：
 * 1、int corePoolSize    [5]核心线程数; 线程池，创建好以后就准备就一直存在【除非设置(allowCoreThreadTimeOut)】
 *                        5个 Thread thread = new Thread(); thread.start();
 * 2、int maximumPoolSize 最大线程数量，控制资源
 * 3、long keepAliveTime  存活时间。如果当前的线程数量大于core数量，并且线程空闲时间大于指定的存活时间，就释放空闲的线程(最少保留corePoolSize个)。
 * 4、TimeUnit unit       时间单位
 * 5、BlockingQueue<Runnable> workQueue 阻塞队列。如果任务有很多，就会将目前多的任务放在队列里面。
 *                                      只要有线程空用，就会去队列里面取出新的任务继续执行。
 * 6、ThreadFactory threadFactory 线程的创建工厂
 * 7、RejectedExecutionHandler handler 拒绝策略 如果队列满了，按照我们指定的拒绝策略拒绝执行任务
 *
 * 运行流程：
 * 1、线程池创建，准备好 core  数量的核心线程，准备接受任务
 * 2、新的任务进来，用 core 准备好的空闲线程执行。
 *      (1)、core 满了，就将再进来的任务放入阻塞队列中。空闲的 core 就会自己去阻塞队列获取任务执行
 *      (2)、阻塞队列满了，就直接开新线程执行，最大只能开到 max  指定的数量
 *      (3)、max 都执行好了。max-core 数量空闲的线程会在 keepAliveTime 指定的时间后自动销毁。最终保持到 core 大小
 *      (4)、如果线程数开到了 max 的数量，还有新任务进来，就会使用 reject 指定的拒绝策略进行处理
 * 3、所有的线程创建都是由指定的 factory 创建的。
 */
ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(5,
        200,
        10,
        TimeUnit.SECONDS,
        //new LinkedBlockingDeque<>() 时一定要设置容量，默认是Integer.MAX_VALUE，会导致内存不够
        new LinkedBlockingDeque<>(100000),
        Executors.defaultThreadFactory(),
        new ThreadPoolExecutor.AbortPolicy());
```

![image-20220731132530881](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.5.2.png)

##### 3、线程池工具类

`Executors`工具类有以下4个常用方法

```java
/**
 *
 * 一个线程池core 7;max 20; queue 50， 100并发进来怎么分配的;
 * 答：7个会立即得到执行，50个会进入队列，再开13个进行执行。剩下的30个就使用拒绝策略。
 */

Executors.newCachedThreadPool();        //core是0，所有都可回收
Executors.newFixedThreadPool(5);        //固定大小，core=max; 都不可回收
Executors.newScheduledThreadPool(5);    //定时任务的线程池 DelayedWorkQueue
Executors.newSingleThreadExecutor();    //单线程的线程池，后台从队列里面获取任务，挨个执行
```

![image-20220731133132597](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.5.3.png)

##### 4、源代码

`ThreadPoolExecutor`类位于`java.util.concurrent.ThreadPoolExecutor`(JUC)包，其七大参数为

```java
/**
 * Creates a new {@code ThreadPoolExecutor} with the given initial
 * parameters.
 *使用给定的初始化参数创建一个新的{@code ThreadPoolExecutor}。 
 * @param corePoolSize the number of threads to keep in the pool, even
 *        if they are idle, unless {@code allowCoreThreadTimeOut} is set
 *        保留在池中的线程数，即使它们是空闲的，除非设置了 {@code allowCoreThreadTimeOut} 
 * @param maximumPoolSize the maximum number of threads to allow in the
 *        pool
 *		  池中允许的最大线程数 
 * @param keepAliveTime when the number of threads is greater than
 *        the core, this is the maximum time that excess idle threads
 *        will wait for new tasks before terminating.
 *        当线程数大于核心线程数时，这些多余的空闲线程在终止前等待新任务的最长时间。
 * @param unit the time unit for the {@code keepAliveTime} argument
 *        参数的时间单位
 * @param workQueue the queue to use for holding tasks before they are
 *        executed.  This queue will hold only the {@code Runnable}
 *        tasks submitted by the {@code execute} method.
 *		  用于在执行任务之前保存任务的队列。此队列将仅保存由 {@code execute} 方法提交的 {@code Runnable} 任务。 
 * @param threadFactory the factory to use when the executor
 *        creates a new thread
 *        执行程序创建新线程时使用的工厂 
 * @param handler the handler to use when execution is blocked
 *        because the thread bounds and queue capacities are reached
 		  执行因达到线程边界和队列容量而被阻塞时使用的处理程序
 * @throws IllegalArgumentException if one of the following holds:<br>
 *		   @throws IllegalArgumentException 如果满足以下条件之一：
 *         {@code corePoolSize < 0}<br>
 *         {@code keepAliveTime < 0}<br>
 *         {@code maximumPoolSize <= 0}<br>
 *         {@code maximumPoolSize < corePoolSize}
 * @throws NullPointerException if {@code workQueue}
 *         or {@code threadFactory} or {@code handler} is null
 */
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    if (workQueue == null || threadFactory == null || handler == null)
        throw new NullPointerException();
    this.acc = System.getSecurityManager() == null ?
            null :
            AccessController.getContext();
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}
```

![image-20220731123732874](https://gitlab.com/apzs/image/-/raw/master/image/5.6.1.5.4.png)

#### 6、开发中使用线程池的原因

- 降低资源的消耗
- 通过重复利用已经创建好的线程降低线程的创建和销毁带来的损耗
- 提高响应速度
- 因为线程池中的线程数没有超过线程池的最大上限时，有的线程处于等待分配任务的状态，当任务来时无需创建新的线程就能执行
- 提高线程的可管理性
- 线程池会根据当前系统特点对池内的线程进行优化处理，减少创建和销毁线程带来的系统开销。无限的创建和销毁线程不仅消耗系统资源，还降低系统的稳定性，使用线程池进行统一分配

#### 7、完整代码

[点击查看`ThreadTest`类完整代码](code/5.6.1.7.ThreadTest.java)

### 5.6.2、CompletableFuture 异步编排

`Future`的继承关系如下图所示

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.0.png" alt="image-20220801213339920" style="zoom:67%;" />

**业务场景**

查询商品详情页的逻辑比较复杂，有些数据还需要远程调用，必然需要花费更多的时间。

假如商品详情页的每个查询，需要如下标注的时间才能完成。那么，用户需要 5.5s 后才能看到商品详情页的内容。很显然是不能接受的。如果有多个线程同时完成这 6 步操作，也许只需要 1.5s 即可完成响应。

| 序号 | 要执行的业务                   | 耗时 |
| ---- | ------------------------------ | ---- |
| 1    | 获取sku的基本信息              | 0.5s |
| 2    | 获取sku的图片信息              | 0.5s |
| 3    | 获取sku的促销信息              | 1s   |
| 4    | 获取spu的所有销售属性          | 1s   |
| 5    | 获取规格参数组及组下的规格参数 | 1.5s |
| 6    | spu详情                        | 1s   |

`1`、`2`、`3`可以同时执行，而`4`、`5`、`6`必须得到`1`的返回结果后才能执行，`4`、`5`、`6`之间可以同时执行

#### 1、创建异步对象

##### 1、常用方法

`CompletableFuture`类提供了四个静态方法来创建一个异步操作。

```java
public static CompletableFuture<Void> runAsync(Runnable runnable);
public static CompletableFuture<Void> runAsync(Runnable runnable,Executor executor);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier,Executor executor);
```

- `runAsync`方法都是没有返回结果的
- ` supplyAsync`方法都是可以获取返回结果的
- 可以传入自定义的线程池，否则就用默认的线程池；

##### 2、`runAsync`方法

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) {
    System.out.println("==========main start==========");

    CompletableFuture.runAsync(()->{
        System.out.println("当前线程："+Thread.currentThread().getId());
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
    },executorService);

    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
==========main end============
当前线程：12
运行结果：5
```

可以看到该方法不需要有返回值，且该方法不会停止，线程池里的核心线程不会消失

![image-20220731140708664](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.1.2.png)

##### 3、`supplyAsync`方法

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) {
    System.out.println("==========main start==========");

    CompletableFuture.supplyAsync(()->{
        System.out.println("当前线程："+Thread.currentThread().getId());
        int i = 10 /2 ;
        System.out.println("运行结果：" + i);
        return i;
    },executorService);

    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
==========main end============
当前线程：12
运行结果：5
```

可以看到该方法有返回值，且该方法不会停止，线程池里的核心线程不会消失

![image-20220731140835585](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.1.3.png)

##### 4、`supplyAsync`方法获取返回值

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        System.out.println("运行结果：" + i);
        return i;
    }, executorService);

    System.out.println("开启线程之后，获取线程执行结果之前...");
    //阻塞式等待整个线程执行完成，获取返回结果
    System.out.println(future.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
开启线程之后，获取线程执行结果之前...
当前线程：12
运行结果：5
5
==========main end============
```

可以通过`future.get()`方法获取方法的返回值，且该方法是阻塞方法，没有获取到返回值会一直等待，直到获取到返回值后，才会执行下面的代码

![image-20220731141206092](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.1.4.png)

##### 5、源码

`CompletableFuture`类位于`java.util.concurrent`（JUC）包下

```java
/**
 * Returns a new CompletableFuture that is asynchronously completed
 * by a task running in the {@link ForkJoinPool#commonPool()} with
 * the value obtained by calling the given Supplier.
 *
 * @param supplier a function returning the value to be used
 * to complete the returned CompletableFuture
 * @param <U> the function's return type
 * @return the new CompletableFuture
 */
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier) {
    return asyncSupplyStage(asyncPool, supplier);
}

/**
 * Returns a new CompletableFuture that is asynchronously completed
 * by a task running in the given executor with the value obtained
 * by calling the given Supplier.
 *
 * @param supplier a function returning the value to be used
 * to complete the returned CompletableFuture
 * @param executor the executor to use for asynchronous execution
 * @param <U> the function's return type
 * @return the new CompletableFuture
 */
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier,
                                                   Executor executor) {
    return asyncSupplyStage(screenExecutor(executor), supplier);
}

/**
 * Returns a new CompletableFuture that is asynchronously completed
 * by a task running in the {@link ForkJoinPool#commonPool()} after
 * it runs the given action.
 *
 * @param runnable the action to run before completing the
 * returned CompletableFuture
 * @return the new CompletableFuture
 */
public static CompletableFuture<Void> runAsync(Runnable runnable) {
    return asyncRunStage(asyncPool, runnable);
}

/**
 * Returns a new CompletableFuture that is asynchronously completed
 * by a task running in the given executor after it runs the given
 * action.
 *
 * @param runnable the action to run before completing the
 * returned CompletableFuture
 * @param executor the executor to use for asynchronous execution
 * @return the new CompletableFuture
 */
public static CompletableFuture<Void> runAsync(Runnable runnable,
                                               Executor executor) {
    return asyncRunStage(screenExecutor(executor), runnable);
}
```

![image-20220731140402932](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.1.5.png)

#### 2、方法完成后的感知

##### 1、常用方法

`whenComplete`、`whenCompleteAsync`不可以修改返回结果，`exceptionally`可以修改返回结果

```java
//whenComplete  可以处理正常和异常的计算结果 (T为上一步的返回结果，? super Throwable为上一步的异常信息)
public CompletableFuture<T> whenComplete(BiConsumer<? super T, ? super Throwable> action);
public CompletableFuture<T> whenCompleteAsync(BiConsumer<? super T, ? super Throwable> action);
public CompletableFuture<T> whenCompleteAsync(BiConsumer<? super T, ? super Throwable> action, Executor executor);
//exceptionally  处理异常情况(可以修改返回结果)。((Throwable为上一步的异常信息,? extends T为这一步要返回的结果)
public CompletableFuture<T> exceptionally(Function<Throwable, ? extends T> fn);
```

whenComplete 和 whenCompleteAsync 的区别：

- whenComplete：是执行当前任务的线程执行继续执行  whenComplete  的任务。
- whenCompleteAsync：是执行把 whenCompleteAsync 这个任务继续提交给线程池来进行执行。
- 方法不以 Async 结尾，意味着 Action 使用相同的线程执行，而 Async 可能会使用其他线程执行（如果是使用相同的线程池，也可能会被同一个线程选中执行）

##### 2、`whenComplete`感知异常(没有异常)

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        System.out.println("运行结果：" + i);
        return i;
    }, executorService).whenComplete((result,exception)->{
        System.out.println("异步任务完成后的返回结果：" + result);
        System.out.println("异步任务抛出的异常：" + exception);
    });

    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
运行结果：5
异步任务完成后的返回结果：5
异步任务抛出的异常：null
==========main end============
```

可以看到`whenComplete`可以获取到该线程的`返回结果`和`异常信息`

![image-20220731145834946](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.2.2.png)

##### 3、`whenComplete`感知异常(有异常)

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 0;
        System.out.println("运行结果：" + i);
        return i;
    }, executorService).whenComplete((result,exception)->{
        System.out.println("异步任务完成后的返回结果：" + result);
        System.out.println("异步任务抛出的异常：" + exception);
    });

    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
异步任务完成后的返回结果：null
异步任务抛出的异常：java.util.concurrent.CompletionException: java.lang.ArithmeticException: / by zero
==========main end============
```

可以看到`whenComplete`可以获取到该线程的`返回结果`和`异常信息`

![image-20220731145952658](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.2.3.png)



##### 4、`exceptionally`处理异常

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 0;
        System.out.println("运行结果：" + i);
        return i;
    }, executorService).whenComplete((result,exception)->{
        //虽然能得到异常信息，但是没法修改返回数据。
        System.out.println("异步任务完成后的返回结果：" + result);
        System.out.println("异步任务抛出的异常：" + exception);
    }).exceptionally(throwable -> {
        //可以感知异常，同时返回默认值
        return 10;
    });
    System.out.println("线程返回的结果："+future.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
异步任务完成后的返回结果：null
异步任务抛出的异常：java.util.concurrent.CompletionException: java.lang.ArithmeticException: / by zero
线程返回的结果：10
==========main end============
```

`exceptionally`方法可以对该线程的异常进行处理，但是如果线程没有异常就不能对正常返回结果进行处理

![image-20220731150404465](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.2.4.png)

##### 5、源码

```java
public CompletableFuture<T> whenComplete(
    BiConsumer<? super T, ? super Throwable> action) {
    return uniWhenCompleteStage(null, action);
}

public CompletableFuture<T> whenCompleteAsync(
    BiConsumer<? super T, ? super Throwable> action) {
    return uniWhenCompleteStage(asyncPool, action);
}

public CompletableFuture<T> whenCompleteAsync(
    BiConsumer<? super T, ? super Throwable> action, Executor executor) {
    return uniWhenCompleteStage(screenExecutor(executor), action);
}

// not in interface CompletionStage

/**
 * Returns a new CompletableFuture that is completed when this
 * CompletableFuture completes, with the result of the given
 * function of the exception triggering this CompletableFuture's
 * completion when it completes exceptionally; otherwise, if this
 * CompletableFuture completes normally, then the returned
 * CompletableFuture also completes normally with the same value.
 * Note: More flexible versions of this functionality are
 * available using methods {@code whenComplete} and {@code handle}.
 *
 * @param fn the function to use to compute the value of the
 * returned CompletableFuture if this CompletableFuture completed
 * exceptionally
 * @return the new CompletableFuture
 */
public CompletableFuture<T> exceptionally(
    Function<Throwable, ? extends T> fn) {
    return uniExceptionallyStage(fn);
}
```

![image-20220731145421477](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.2.5.1.png)



![image-20220731145427210](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.2.5.2.png)

#### 3、方法完成后的处理(handle)

##### 1、常用方法

```java
//(? super T为上一步的返回结果,Throwable为上一步的异常信息,? extends U> fn为这一步的返回结果)
public <U> CompletableFuture<U> handle(BiFunction<? super T, Throwable, ? extends U> fn)
public <U> CompletableFuture<U> handleAsync(BiFunction<? super T, Throwable, ? extends U> fn)
public <U> CompletableFuture<U> handleAsync(BiFunction<? super T, Throwable, ? extends U> fn, Executor executor)
```

##### 2、`handle`处理`异常`或`返回值`(有异常)

可以修改返回结果

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 0;
        System.out.println("运行结果：" + i);
        return i;
    }, executorService).handle((result,throwable)->{
        if (result!=null){
            return result*2;
        }
        if (throwable!=null){
            return 0;
        }
        return 0;
    });
    System.out.println("线程返回的结果："+future.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
线程返回的结果：0
==========main end============
```

`handle`可以对该线程的`正常返回结果`和`异常返回结果`进行处理

![image-20220731151320171](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.3.2.png)

##### 3、`handle`处理`异常`或`返回值`(没有异常)

如果把`int i = 10 / 0;`改为

```
int i = 10 / 2;
```

运行结果：

```
==========main start==========
当前线程：12
运行结果：5
线程返回的结果：10
==========main end============
```

`handle`可以对该线程的`正常返回结果`和`异常返回结果`进行处理

![image-20220731151354996](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.3.3.png)

##### 4、源码

```java
public <U> CompletableFuture<U> handle(
    BiFunction<? super T, Throwable, ? extends U> fn) {
    return uniHandleStage(null, fn);
}

public <U> CompletableFuture<U> handleAsync(
    BiFunction<? super T, Throwable, ? extends U> fn) {
    return uniHandleStage(asyncPool, fn);
}

public <U> CompletableFuture<U> handleAsync(
    BiFunction<? super T, Throwable, ? extends U> fn, Executor executor) {
    return uniHandleStage(screenExecutor(executor), fn);
}
```

![image-20220731162118455](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.3.4.png)

#### 4、线程串行化方法

##### 1、常用方法

thenRun不能感知上一步结果，thenAccept能感知上一步处理结果

```java
//A处理完后B处理，B不需要A的返回结果
public CompletableFuture<Void> thenRun(Runnable action);
public CompletableFuture<Void> thenRunAsync(Runnable action);
public CompletableFuture<Void> thenRunAsync(Runnable action,Executor executor);
//A处理完后B处理，B需要A的返回结果
//(Consumer<? super T> action为上一步的返回结果)
public CompletableFuture<Void> thenAccept(Consumer<? super T> action);
public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action);
public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action,Executor executor);
//A处理完后B处理，B需要A的返回结果、B处理完后还需要返回本次处理后的结果，别人感知
//(Function<? super T为上一步的返回结果,? extends U> fn为这一步的返回结果)
public <U> CompletableFuture<U> thenApply(Function<? super T,? extends U> fn);
public <U> CompletableFuture<U> thenApplyAsync(Function<? super T,? extends U> fn);
public <U> CompletableFuture<U> thenApplyAsync(Function<? super T,? extends U> fn, Executor executor);
```

- thenRun 方法：只要上面的任务执行完成，就开始执行 thenRun，只是处理完任务后，执行 thenRun 的后续操作
- thenAccept 方法：消费处理结果。接收任务的处理结果，并消费处理，无返回结果。
- thenApply 方法：当一个线程依赖另一个线程时，获取上一个任务返回的结果，并返回当前任务的返回值。
- 方法不以 Async 结尾，意味着 Action 使用相同的线程执行，而 Async 可能会使用其他线程执行（如果是使用相同的线程池，也可能会被同一个线程选中执行）

##### 2、`thenRunAsync`B不需要A的返回值

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Void> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("运行结果：" + i);
        return i;
    }, executorService).thenRun(() -> {
        System.out.println("任务2启动了...");
    });
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
==========main end============
运行结果：5
任务2启动了...
```

`thenRunAsync`方法是`任务1`执行完后`任务2`再执行，`任务2`不能获取到`任务1`的返回值

![image-20220731153402668](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.4.2.png)

##### 3、`thenAcceptAsync`B需要A的返回值

运行以下测试代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Void> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("运行结果：" + i);
        return i;
    }, executorService).thenAccept((result) -> {
        System.out.println("任务2启动了...");
        System.out.println("获取到了上一步的返回结果：" + result);
    });
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
==========main end============
运行结果：5
任务2启动了...
获取到了上一步的返回结果：5
```

`thenAcceptAsync`方法是`任务1`执行完后`任务2`再执行，`任务2`可以获取到`任务1`的返回值

![image-20220731154341218](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.4.3.png)

##### 4、`thenApplyAsync`A、B都返回结果

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
        System.out.println("当前线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService).thenApply((result) -> {
        System.out.println("任务2启动了...");
        System.out.println("任务2获取到了任务1的返回结果：" + result);
        return "Hello " + result;
    });
    System.out.println("任务都完成后返回结果：" + future.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
当前线程：12
任务1运行结果：5
任务2启动了...
任务2获取到了任务1的返回结果：5
任务都完成后返回结果：Hello 5
==========main end============
```

`thenApplyAsync`方法是`任务1`执行完后`任务2`再执行，`任务2`可以获取到`任务1`的返回值，且`任务2`也需返回结果

![image-20220731154900573](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.4.4.png)

##### 5、源码

```java
public <U> CompletableFuture<U> thenApply(
    Function<? super T,? extends U> fn) {
    return uniApplyStage(null, fn);
}

public <U> CompletableFuture<U> thenApplyAsync(
    Function<? super T,? extends U> fn) {
    return uniApplyStage(asyncPool, fn);
}

public <U> CompletableFuture<U> thenApplyAsync(
    Function<? super T,? extends U> fn, Executor executor) {
    return uniApplyStage(screenExecutor(executor), fn);
}

public CompletableFuture<Void> thenAccept(Consumer<? super T> action) {
    return uniAcceptStage(null, action);
}

public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action) {
    return uniAcceptStage(asyncPool, action);
}

public CompletableFuture<Void> thenAcceptAsync(Consumer<? super T> action,
                                               Executor executor) {
    return uniAcceptStage(screenExecutor(executor), action);
}

public CompletableFuture<Void> thenRun(Runnable action) {
    return uniRunStage(null, action);
}

public CompletableFuture<Void> thenRunAsync(Runnable action) {
    return uniRunStage(asyncPool, action);
}

public CompletableFuture<Void> thenRunAsync(Runnable action,
                                            Executor executor) {
    return uniRunStage(screenExecutor(executor), action);
}
```

![image-20220731152222563](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.4.5.png)

#### 5、**两任务组合** - 都要完成

##### 1、常用方法

```java
//CompletableFuture<T> implements Future<T>, CompletionStage<T>
//任务1和任务2(CompletionStage<?> other)都做完后，再做Runnable action指定的事情
//不能获取任务1和任务2(CompletionStage<?> other)的返回结果，且这次执行不用返回结果
//CompletionStage<?> other:要完成的另一个任务(任务2)，Runnable action:接下来要完成的任务
public CompletableFuture<Void> runAfterBoth(CompletionStage<?> other,Runnable action)
public CompletableFuture<Void> runAfterBothAsync(CompletionStage<?> other,Runnable action)
public CompletableFuture<Void> runAfterBothAsync(CompletionStage<?> other,Runnable action,Executor executor)

//可以获取任务1和任务2(CompletionStage<?> other)的返回结果，这次执行不用返回结果
//CompletionStage<? extends U> other:要完成的另一个任务(任务2),BiConsumer<? super T, ? super U> action:任务1和任务2的返回值
public <U> CompletableFuture<Void> thenAcceptBoth(CompletionStage<? extends U> other,BiConsumer<? super T, ? super U> action)
public <U> CompletableFuture<Void> thenAcceptBothAsync(CompletionStage<? extends U> other,BiConsumer<? super T, ? super U> action)
public <U> CompletableFuture<Void> thenAcceptBothAsync(CompletionStage<? extends U> other,BiConsumer<? super T, ? super U> action, Executor executor)

//可以获取任务1和任务2(CompletionStage<?> other)的返回结果，并返回本次的执行结果
//CompletionStage<?> other:要完成的另一个任务(任务2)
//? super T:接下来要完成的任务的返回值，? super U:任务1的返回值,? extends V:任务2的返回值
public <U,V> CompletableFuture<V> thenCombine(CompletionStage<? extends U> other,BiFunction<? super T,? super U,? extends V> fn)
public <U,V> CompletableFuture<V> thenCombineAsync(CompletionStage<? extends U> other,BiFunction<? super T,? super U,? extends V> fn)
public <U,V> CompletableFuture<V> thenCombineAsync(CompletionStage<? extends U> other,BiFunction<? super T,? super U,? extends V> fn, Executor executor)
```

- runAfterBoth：组合两个 future，不需要获取 future 的结果，只需两个 future 处理完任务后，处理该任务。
- thenAcceptBoth：组合两个 future，获取两个 future 任务的返回结果，然后处理任务，没有返回值。
- thenCombine：组合两个 future，获取两个 future 的返回结果，并返回当前任务的返回值 
- 方法不以 Async 结尾，意味着 Action 使用相同的线程执行，而 Async 可能会使用其他线程执行（如果是使用相同的线程池，也可能会被同一个线程选中执行）

##### 2、`runAfterBothAsync`

运行以下测试代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    future1.runAfterBothAsync(future2,()->{
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务3运行结果：" + hello);
    },executorService);
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
==========main end============
任务1运行结果：5
任务2运行结果：hello2
任务3线程：15
任务3运行结果：hello3
```

`runAfterBothAsync`是`任务1`和`任务2`都执行完成后，`任务3`才能开始执行，且`任务3`不需要`任务1`、`任务2`的返回值

![image-20220731165058934](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.5.2.png)

##### 3、`thenAcceptBothAsync`

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    future1.thenAcceptBothAsync(future2,(f1,f2)->{
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        System.out.println("任务3获取到的任务1结果：" + f1);
        System.out.println("任务3获取到的任务2结果：" + f2);
        System.out.println("任务3运行结果：" + hello);
    },executorService);
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
==========main end============
任务1运行结果：5
任务2运行结果：hello2
任务3线程：15
任务3获取到的任务1结果：5
任务3获取到的任务2结果：hello2
任务3运行结果：hello3
```

`thenAcceptBothAsync`是`任务1`和`任务2`都执行完成后，`任务3`才能开始执行，且`任务3`可以获取到`任务1`、`任务2`的返回值

![image-20220731165718791](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.5.3.png)

##### 4、`thenCombineAsync`

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<String> future3 = future1.thenCombineAsync(future2, (f1, f2) -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        System.out.println("任务3获取到的任务1结果：" + f1);
        System.out.println("任务3获取到的任务2结果：" + f2);
        System.out.println("任务3运行结果：" + hello);
        return f1 + " => " + f2 + " => " + hello;
    }, executorService);
    System.out.println("三个任务执行完的返回结果：" + future3.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
任务2运行结果：hello2
任务1运行结果：5
任务3线程：14
任务3获取到的任务1结果：5
任务3获取到的任务2结果：hello2
任务3运行结果：hello3
三个任务执行完的返回结果：5 => hello2 => hello3
==========main end============
```

`thenCombineAsync`是`任务1`和`任务2`都执行完成后，`任务3`才能开始执行，`任务3`可以获取的`任务1`、`任务2`的返回值，且`任务3`需要有返回值

![image-20220731170401151](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.5.4.png)

##### 5、源码

```java
public CompletableFuture<Void> runAfterBoth(CompletionStage<?> other,
                                            Runnable action) {
    return biRunStage(null, other, action);
}

public CompletableFuture<Void> runAfterBothAsync(CompletionStage<?> other,
                                                 Runnable action) {
    return biRunStage(asyncPool, other, action);
}

public CompletableFuture<Void> runAfterBothAsync(CompletionStage<?> other,
                                                 Runnable action,
                                                 Executor executor) {
    return biRunStage(screenExecutor(executor), other, action);
}

public <U> CompletableFuture<Void> thenAcceptBoth(
    CompletionStage<? extends U> other,
    BiConsumer<? super T, ? super U> action) {
    return biAcceptStage(null, other, action);
}

public <U> CompletableFuture<Void> thenAcceptBothAsync(
    CompletionStage<? extends U> other,
    BiConsumer<? super T, ? super U> action) {
    return biAcceptStage(asyncPool, other, action);
}

public <U> CompletableFuture<Void> thenAcceptBothAsync(
    CompletionStage<? extends U> other,
    BiConsumer<? super T, ? super U> action, Executor executor) {
    return biAcceptStage(screenExecutor(executor), other, action);
}

public <U,V> CompletableFuture<V> thenCombine(
    CompletionStage<? extends U> other,
    BiFunction<? super T,? super U,? extends V> fn) {
    return biApplyStage(null, other, fn);
}

public <U,V> CompletableFuture<V> thenCombineAsync(
    CompletionStage<? extends U> other,
    BiFunction<? super T,? super U,? extends V> fn) {
    return biApplyStage(asyncPool, other, fn);
}

public <U,V> CompletableFuture<V> thenCombineAsync(
    CompletionStage<? extends U> other,
    BiFunction<? super T,? super U,? extends V> fn, Executor executor) {
    return biApplyStage(screenExecutor(executor), other, fn);
}
```

**`runAfterBothAsync`**

![image-20220731163529661](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.5.5.1.png)

**`thenAcceptBothAsync`**

![image-20220731163512341](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.5.5.2.png)

**`thenCombineAsync`**

![image-20220731163441464](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.5.5.3.png)

#### 6、**两任务组合** - 一个完成

##### 1、常用方法

```java
//任务1和任务2(CompletionStage<?> other)其中一个做完后，再做Runnable action指定的事情
//不能获取任务1和任务2(CompletionStage<?> other)的返回结果，且这次执行不用返回
//CompletionStage<?> other:要完成的另一个任务(任务2)，Runnable action:接下来要完成的任务
public CompletableFuture<Void> runAfterEither(CompletionStage<?> other,Runnable action)
public CompletableFuture<Void> runAfterEitherAsync(CompletionStage<?> other,Runnable action)
public CompletableFuture<Void> runAfterEitherAsync(CompletionStage<?> other,Runnable action,Executor executor)

//可以获取任务1或任务2(CompletionStage<?> other)的返回结果，这次执行不用返回结果
//CompletionStage<? extends U> other:要完成的另一个任务(任务2),Consumer<? super T> action:先执行完的那个任务的返回值
public CompletableFuture<Void> acceptEither(CompletionStage<? extends T> other, Consumer<? super T> action)
public CompletableFuture<Void> acceptEitherAsync(CompletionStage<? extends T> other, Consumer<? super T> action)
public CompletableFuture<Void> acceptEitherAsync(CompletionStage<? extends T> other, Consumer<? super T> action,Executor executor)

//可以获取任务1或任务2(CompletionStage<?> other)的返回结果，这次执行需要返回结果
//CompletionStage<? extends T> other:要完成的另一个任务(任务2)
//Function<? super T, U> fn:先执行完的那个任务的返回值 和 接下来要完成的任务的返回值
public <U> CompletableFuture<U> applyToEither(CompletionStage<? extends T> other, Function<? super T, U> fn)
public <U> CompletableFuture<U> applyToEitherAsync(CompletionStage<? extends T> other, Function<? super T, U> fn)
public <U> CompletableFuture<U> applyToEitherAsync(CompletionStage<? extends T> other, Function<? super T, U> fn,Executor executor)
```

##### 2、`runAfterEitherAsync`

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    future1.runAfterEitherAsync(future2, () -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        System.out.println("任务3运行结果：" + hello);
    }, executorService);
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
==========main end============
任务1运行结果：5
任务3线程：15
任务3运行结果：hello3
任务2运行结果：hello2
```

`runAfterEitherAsync`是`任务1`或`任务2`其中一个执行完成后，`任务3`才能开始执行，`任务3`不可以获取`任务1`或`任务2`的返回值

![image-20220731185139964](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.2.png)

##### 3、`acceptEitherAsync`

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Object> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<Object> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    future1.acceptEitherAsync(future2, (result) -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        System.out.println("任务3获取到的前两个任务其中一个执行完的返回值"+result);
        String hello = "hello3";
        System.out.println("任务3运行结果：" + hello);
    }, executorService);
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
==========main end============
任务1运行结果：5
任务3线程：15
任务3获取到的前两个任务其中一个执行完的返回值5
任务3运行结果：hello3
任务2运行结果：hello2
```

`acceptEitherAsync`是`任务1`或`任务2`其中一个执行完成后，`任务3`才能开始执行，`任务3`可以获取已成功执行的那个线程的返回值

`任务1`和`任务2`任务要求返回值必须是一致的，因为需要获取已成功执行的那个线程的返回值，所以两个任务都必须要有相同类型的返回值

![image-20220731185547647](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.3.1.png)

把`任务1`和`任务2`的返回值类型都修改为`Object`，可以看到已经不报错了

![image-20220731185639506](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.3.2.png)

执行成功后成功获取到`任务1`的返回值

![image-20220731190107420](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.3.3.png)

##### 4、`applyToEitherAsync`

运行以下测试代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Object> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<Object> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<String> future = future1.applyToEitherAsync(future2, (result) -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        System.out.println("任务3获取到的前两个任务其中一个执行完的返回值" + result);
        String hello = "hello3";
        System.out.println("任务3运行结果：" + hello);
        return result + " => " + hello;
    }, executorService);
    System.out.println("任务3执行完后的返回结果:" + future.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
任务1运行结果：5
任务3线程：14
任务3获取到的前两个任务其中一个执行完的返回值5
任务3运行结果：hello3
任务3执行完后的返回结果:5 => hello3
==========main end============
任务2运行结果：hello2
```

`applyToEitherAsync`是`任务1`或`任务2`其中一个执行完成后，`任务3`才能开始执行，`任务3`可以获取已成功执行的那个线程的返回值，且`任务3`需要有返回值

![image-20220731190543612](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.4.png)

##### 5、源码

```java
public CompletableFuture<Void> runAfterEither(CompletionStage<?> other,
                                              Runnable action) {
    return orRunStage(null, other, action);
}

public CompletableFuture<Void> runAfterEitherAsync(CompletionStage<?> other,
                                                   Runnable action) {
    return orRunStage(asyncPool, other, action);
}

public CompletableFuture<Void> runAfterEitherAsync(CompletionStage<?> other,
                                                   Runnable action,
                                                   Executor executor) {
    return orRunStage(screenExecutor(executor), other, action);
}

public CompletableFuture<Void> acceptEither(
    CompletionStage<? extends T> other, Consumer<? super T> action) {
    return orAcceptStage(null, other, action);
}

public CompletableFuture<Void> acceptEitherAsync(
    CompletionStage<? extends T> other, Consumer<? super T> action) {
    return orAcceptStage(asyncPool, other, action);
}

public CompletableFuture<Void> acceptEitherAsync(
    CompletionStage<? extends T> other, Consumer<? super T> action,
    Executor executor) {
    return orAcceptStage(screenExecutor(executor), other, action);
}

public <U> CompletableFuture<U> applyToEither(
    CompletionStage<? extends T> other, Function<? super T, U> fn) {
    return orApplyStage(null, other, fn);
}

public <U> CompletableFuture<U> applyToEitherAsync(
    CompletionStage<? extends T> other, Function<? super T, U> fn) {
    return orApplyStage(asyncPool, other, fn);
}

public <U> CompletableFuture<U> applyToEitherAsync(
    CompletionStage<? extends T> other, Function<? super T, U> fn,
    Executor executor) {
    return orApplyStage(screenExecutor(executor), other, fn);
}
```



当两个任务中，任意一个 future 任务完成的时候，执行任务。

applyToEither：两个任务有一个执行完成，获取它的返回值，处理任务并有新的返回值。 acceptEither：两个任务有一个执行完成，获取它的返回值，处理任务，没有新的返回值。 runAfterEither：两个任务有一个执行完成，不需要获取 future 的结果，处理任务，也没有返回值。



![image-20220731170716550](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.5.1.png)



![image-20220731170825404](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.5.2.png)



![image-20220731170916342](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.6.5.3.png)

#### 7、多任务组合

##### 1、常用方法

```java
//所有的都完成
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs)
//其中一个完成
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs)
```

##### 2、`allOf`都要完成

###### 1、测试1

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Object> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<Object> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<Object> future3 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务3运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<Void> future = CompletableFuture.allOf(future1, future2, future3);
    long start = System.currentTimeMillis();
    System.out.println("3个任务的返回结果：" + future.get());
    long end = System.currentTimeMillis();
    System.out.println("阻塞式等待所消耗：" + (end - start) + "s");
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
任务3线程：14
任务1运行结果：5
任务3运行结果：hello3
任务2运行结果：hello2
3个任务的返回结果：null
阻塞式等待所消耗：3000s
==========main end============
```

`allOf`方法要去所有任务都要完成，可以看到调用最终的`future.get()`会阻塞线程，其返回值为`null`

![image-20220731191825653](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.7.2.1.png)

###### 2、测试2

运行以下测试代码：

```java
//一个固定数量的线程池
public static ExecutorService executorService = Executors.newFixedThreadPool(10);

public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Object> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<Object> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<Object> future3 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务3运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<Void> future = CompletableFuture.allOf(future1, future2, future3);
    long start = System.currentTimeMillis();
    System.out.println("3个任务的返回结果：" + future.get());
    long end = System.currentTimeMillis();
    System.out.println("阻塞式等待所消耗：" + (end - start) + "s");
    System.out.println("获取任务1返回的结果：" + future1.get());
    System.out.println("获取任务2返回的结果：" + future2.get());
    System.out.println("获取任务3返回的结果：" + future3.get());
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
任务3线程：14
任务1运行结果：5
任务3运行结果：hello3
任务2运行结果：hello2
3个任务的返回结果：null
阻塞式等待所消耗：2999s
获取任务1返回的结果：5
获取任务2返回的结果：hello2
获取任务3返回的结果：hello3
==========main end============
```

可以通过各自的`future.get()`方法，来获取各自的返回值

![image-20220731192539083](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.7.2.2.png)

###### 3、测试3

如果注释掉最终的`future.get()`方法，则不会被阻塞，`main`方法先退出

```
future.get()
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
任务3线程：14
==========main end============
任务1运行结果：5
任务3运行结果：hello3
任务2运行结果：hello2
```

![image-20220731192051270](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.7.2.3.png)

##### 3、`anyOf`任何一个完成

运行以下测试代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    System.out.println("==========main start==========");

    CompletableFuture<Object> future1 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务1线程：" + Thread.currentThread().getId());
        int i = 10 / 2;
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务1运行结果：" + i);
        return i;
    }, executorService);

    CompletableFuture<Object> future2 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务2线程：" + Thread.currentThread().getId());
        String hello = "hello2";
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务2运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<Object> future3 = CompletableFuture.supplyAsync(() -> {
        System.out.println("任务3线程：" + Thread.currentThread().getId());
        String hello = "hello3";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("任务3运行结果：" + hello);
        return hello;
    }, executorService);

    CompletableFuture<Object> future = CompletableFuture.anyOf(future1, future2, future3);
    long start = System.currentTimeMillis();
    System.out.println("3个任务的返回结果：" + future.get());
    long end = System.currentTimeMillis();
    System.out.println("阻塞式等待所消耗：" + (end - start) + "s");
    System.out.println("==========main end============");
}
```

运行结果：

```
==========main start==========
任务1线程：12
任务2线程：13
任务3线程：14
任务1运行结果：5
3个任务的返回结果：5
阻塞式等待所消耗：1000s
==========main end============
任务3运行结果：hello3
任务2运行结果：hello2
```

`anyOf`方法要求，所有任务中，任何一个完成即可

![image-20220731192832799](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.7.3.png)

##### 4、源码

```java
/* ------------- Arbitrary-arity constructions -------------- */

/**
 * Returns a new CompletableFuture that is completed when all of
 * the given CompletableFutures complete.  If any of the given
 * CompletableFutures complete exceptionally, then the returned
 * CompletableFuture also does so, with a CompletionException
 * holding this exception as its cause.  Otherwise, the results,
 * if any, of the given CompletableFutures are not reflected in
 * the returned CompletableFuture, but may be obtained by
 * inspecting them individually. If no CompletableFutures are
 * provided, returns a CompletableFuture completed with the value
 * {@code null}.
 *
 * <p>Among the applications of this method is to await completion
 * of a set of independent CompletableFutures before continuing a
 * program, as in: {@code CompletableFuture.allOf(c1, c2,
 * c3).join();}.
 *
 * @param cfs the CompletableFutures
 * @return a new CompletableFuture that is completed when all of the
 * given CompletableFutures complete
 * @throws NullPointerException if the array or any of its elements are
 * {@code null}
 */
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs) {
    return andTree(cfs, 0, cfs.length - 1);
}

/**
 * Returns a new CompletableFuture that is completed when any of
 * the given CompletableFutures complete, with the same result.
 * Otherwise, if it completed exceptionally, the returned
 * CompletableFuture also does so, with a CompletionException
 * holding this exception as its cause.  If no CompletableFutures
 * are provided, returns an incomplete CompletableFuture.
 *
 * @param cfs the CompletableFutures
 * @return a new CompletableFuture that is completed with the
 * result or exception of any of the given CompletableFutures when
 * one completes
 * @throws NullPointerException if the array or any of its elements are
 * {@code null}
 */
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs) {
    return orTree(cfs, 0, cfs.length - 1);
}
```

![image-20220731191323588](https://gitlab.com/apzs/image/-/raw/master/image/5.6.2.7.4.png)

#### 8、完整代码

[点击查看`ThreadTest`类完整代码](code/5.6.2.8.ThreadTest.java)

### 5.6.3、商城业务-商品详情

#### 1、环境搭建

##### 1、修改`host`文件

打开`SwitchHosts`软件，点击`本地方案`里的`gulimall`，在里面添加`192.168.56.10 item.gulimall.com`域名映射，用于商品详情页展示

```properties
# gulimall
192.168.56.10 gulimall.com
192.168.56.10 search.gulimall.com
192.168.56.10 item.gulimall.com
```

<img src="https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.1.png" alt="image-20220731193725444" style="zoom:67%;" />



##### 2、添加`nginx`配置

打开`Xshell`，修改`/mydata/nginx/conf/gulimall.conf`文件

```bash
cd /mydata/nginx/conf/
ls
cd conf.d/
ls
vi gulimall.conf
```

![image-20220731194052069](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.2.1.png)

由于`server_name`配置的是`*.gulimall.com`，已经把`gulimall.com`的子域名都配置了，所有不用再配置了

![image-20220731193944867](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.2.2.png)

##### 3、配置`gateway`

在网关中添加如下配置，把`item.gulimall.com`域名下的请求负载均衡到`gulimall-product`服务

```yaml
spring:
  cloud:
    gateway:
      routes:
      	- id: gulimall_host_route
        uri: lb://gulimall-product
        predicates:
        - Host=gulimall.com,item.gulimall.com
```

![image-20220731194707345](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.3.png)

##### 4、导入文件

将资源里的`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\详情页`目录里的`shangpinxiangqing.html`文件复制到`gulimall-product`模块的`src/main/resources/templates`目录下，并将`shangpinxiangqing.html`文件修改为`item.html`

![image-20220731194607792](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.4.1.png)

在`linux虚拟机`里的`/mydata/nginx/html/static`目录里面新建`item`文件夹，将资源里的`2.分布式高级篇（微服务架构篇）\资料源码\代码\html\详情页`里的其他文件夹复制到`linux虚拟机`的`/mydata/nginx/html/static/item`目录里面

![GIF 2022-7-31 19-54-25](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.4.2.gif)



将`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的部分`href="`(除了`href="#"`)替换为`href="/static/item/`，将部分`src="`(除了`src="实际url"`)替换为`src="/static/item/`

[点击查看完整`item`页面](code/5.6.3.1.4.item.html)

##### 5、新建`skuItem`方法

在`gulimall-product`模块的`com.atguigu.gulimall.product.web.ItemController`包下新建`skuItem`方法

```java
package com.atguigu.gulimall.product.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author 无名氏
 * @date 2022/7/31
 * @Description: 商品的详情信息
 */
@Controller
public class ItemController {

    /**
     * 展示sku的详情
     * @param skuId
     * @return
     */
    @GetMapping("/{skuId}.html")
    public String skuItem(@PathVariable("skuId") Long skuId){

        System.out.println("准备查询" + skuId + "的详情");

        return "item";
    }
}
```

![image-20220731202407973](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.5.png)

##### 6、添加页面跳转

打开`http://search.gulimall.com/list.html?catalog3Id=225`页面，打开控制台，定位到`某个商品`，复制`class="da"`

![image-20220731201122217](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.6.1.png)

在` class="da"`的`<p>`标签里的`<a>`标签里添加`th:href="|http://item.gulimall.com/${prodect.skuId}.html|"`属性，点击该图片跳转到相应的页面，`|`为`thymeleaf`语法，可以快速拼串

```html
<!--排序内容-->
<div class="rig_tab">
    <div th:each="prodect:${result.getProducts()}">
        <div class="ico">
            <i class="iconfont icon-weiguanzhu"></i>
            <a href="#">关注</a>
        </div>
        <p class="da">
            <a th:href="|http://item.gulimall.com/${prodect.skuId}.html|">
                <img th:src="${prodect.skuImg}" class="dim">
            </a>
        </p>
        <ul class="tab_im">
            <li>
                <a href="#" title="黑色">
                    <img th:src="${prodect.skuImg}"></a>
            <li>
        </ul>
        <p class="tab_R">
            <span th:text="'¥'+${prodect.skuPrice}">¥5199.00</span>
        </p>
        <p class="tab_JE">
            <a href="#" th:utext="${prodect.skuTitle}">
                Apple iPhone 7 Plus (A1661) 32G 黑色 移动联通电信4G手机
            </a>
        </p>
        <p class="tab_PI">已有<span>11万+</span>热门评价
            <a href="#">二手有售</a>
        </p>
        <p class="tab_CP"><a href="#" title="谷粒商城Apple产品专营店">谷粒商城Apple产品...</a>
            <a href='#' title="联系供应商进行咨询">
                <img src="/static/search/img/xcxc.png">
            </a>
        </p>
        <div class="tab_FO">
            <div class="FO_one">
                <p>自营
                    <span>谷粒商城自营,品质保证</span>
                </p>
                <p>满赠
                    <span>该商品参加满赠活动</span>
                </p>
            </div>
        </div>
    </div>
</div>
```

![image-20220731202128687](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.6.2.png)

##### 7、测试

重启`GulimallProductApplication`服务和`GulimallGatewayApplication`服务，打开`http://search.gulimall.com/list.html`页面，定位到某个商品的`<a>`标签，可以看到其`href`属性已修改为`http://item.gulimall.com/9.html`

![image-20220731202040269](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.7.1.png)

点击该商品，已经跳转到了`http://item.gulimall.com/9.html`页面，不过不是动态的数据

![image-20220731202143743](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.7.2.png)

打开`GulimallProductApplication`服务的控制台，可以看到控制台输出`准备查询9的详情`

![image-20220731202258611](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.1.7.3.png)

#### 2、封装详情页数据

##### 1、准备工作

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo`包里新建`SkuItemVo`类用于封装商品详情页数据

```java
package com.atguigu.gulimall.product.vo;

/**
 * @author 无名氏
 * @date 2022/7/31
 * @Description: 商品详情页数据
 */
public class SkuItemVo {
}
```

![image-20220731202609160](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.1.1.png)

修改`gulimall-product`模块的`com.atguigu.gulimall.product.web.ItemController`类的`skuItem`方法

```java
@Autowired
SkuInfoService skuInfoService;

/**
 * 展示sku的详情
 * @param skuId
 * @return
 */
@GetMapping("/{skuId}.html")
public String skuItem(@PathVariable("skuId") Long skuId){

    //System.out.println("准备查询" + skuId + "的详情");

    SkuItemVo vo = skuInfoService.item(skuId);

    return "item";
}
```

![image-20220731203013826](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.1.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuInfoService`接口里添加`item`抽象方法

```java
SkuItemVo item(Long skuId);
```

![image-20220731203048457](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.1.3.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类里实现`item`抽象方法

```java
@Override
public SkuItemVo item(Long skuId) {
    SkuItemVo skuItemVo = new SkuItemVo();

    //1、sku基本信息获取pms_sku_info

    //2、sku的图片信息pms_sku_images

    //3、获取spu的销售属性组合。

    //4、获取spu的介绍

    //5、获取spu的规格参数信息。


    return skuItemVo;
}
```

![image-20220731203543095](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.1.4.png)

##### 2、查出详情页的数据

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SkuItemVo`类里添加需要封装的数据字段

[点击查看`SkuItemVo`类完整代码](code/5.6.3.2.2.SkuItemVo.java)

![image-20220731205828359](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.2.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类的`item`方法里添加具体实现

```java
@Override
public SkuItemVo item(Long skuId) {
    SkuItemVo skuItemVo = new SkuItemVo();

    //1、sku基本信息获取pms_sku_info
    SkuInfoEntity skuInfoEntity = this.getById(skuId);
    skuItemVo.setInfo(skuInfoEntity);
    Long spuId = skuInfoEntity.getSpuId();
    Long catalogId = skuInfoEntity.getCatalogId();

    //2、sku的图片信息pms_sku_images
    List<SkuImagesEntity> images = skuImagesService.getImagesBySkuId(skuId);
    skuItemVo.setImages(images);
    //3、获取spu的销售属性组合。
    List<SkuItemVo.SkuItemSaleAttrVo> skuItemSaleAttrVos = skuSaleAttrValueService.getSaleAttrsBySpuId(spuId);
    skuItemVo.setSaleAttr(skuItemSaleAttrVos);
    //4、获取spu的介绍 pms_spu_info_desc
    SpuInfoDescEntity spuInfoDescEntity = spuInfoDescService.getById(spuId);
    skuItemVo.setDesp(spuInfoDescEntity);
    //5、获取spu的规格参数信息。
    List<SkuItemVo.SpuItemAttrGroupVo> attrGroupVos = attrGroupService.getAttrGroupWithAttrsBySpuIdAndCatalogId(spuId,catalogId);
    skuItemVo.setGroupAttrs(attrGroupVos);

    return skuItemVo;
}
```

![image-20220802100658259](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.2.2.png)

##### 3、获取sku图片信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuImagesService`接口里添加`getImagesBySkuId`抽象方法

```java
List<SkuImagesEntity> getImagesBySkuId(Long skuId);
```

![image-20220802100745220](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.3.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuImagesServiceImpl`类里实现`getImagesBySkuId`抽象方法

```java
@Override
public List<SkuImagesEntity> getImagesBySkuId(Long skuId) {

   LambdaQueryWrapper<SkuImagesEntity> lambdaQueryWrapper = new LambdaQueryWrapper<>();
   lambdaQueryWrapper.eq(SkuImagesEntity::getSkuId, skuId);
    return this.baseMapper.selectList(lambdaQueryWrapper);
}
```

![image-20220802101301908](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.3.2.png)

##### 4、获取spu规格参数信息

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.AttrGroupService`接口里添加`getAttrGroupWithAttrsBySpuIdAndCatalogId`抽象方法

```java
List<SkuItemVo.SpuItemAttrGroupVo> getAttrGroupWithAttrsBySpuIdAndCatalogId(Long spuId, Long catalogId);
```

![image-20220802101801380](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.4.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.AttrGroupServiceImpl`类里实现`getAttrGroupWithAttrsBySpuIdAndCatalogId`抽象方法

```java
@Override
public List<SkuItemVo.SpuItemAttrGroupVo> getAttrGroupWithAttrsBySpuIdAndCatalogId(Long spuId, Long catalogId) {
    //查出当前spu对应的所有属性的分组信息以及当前分组下的所有属性对应的值
    return this.baseMapper.getAttrGroupWithAttrsBySpuIdAndCatalogId(spuId,catalogId);
}
```

![image-20220802102053960](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.4.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.dao.AttrGroupDao`接口里添加`getAttrGroupWithAttrsBySpuIdAndCatalogId`抽象方法

```java
List<SkuItemVo.SpuItemAttrGroupVo> getAttrGroupWithAttrsBySpuIdAndCatalogId(@Param("spuId") Long spuId, @Param("catalogId") Long catalogId);
```

![GIF 2022-8-2 10-23-33](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.4.3.gif)

##### 5、编写sql

想要封装的数据

```java
/**
 * 商品的基本属性分组
 * (基本信息:
 *    机身长度（mm） 150.5
 *    机身宽度（mm） 77.8
 *    机身厚度（mm） 8.2
 *    机身重量（g）  约186g（含电池）
 * )
 */
@Data
public static class SpuItemAttrGroupVo{
    /**
     * 组名
     */
    private String groupName;
    /**
     * 属性列表
     */
    private List<SpuBaseAttrVo> attrs;
}

/**
 * 商品详细信息里的基本属性
 */
@Data
public static class SpuBaseAttrVo{
    /**
     * 属性名
     */
    private String attrName;
    /**
     * 属性值
     */
    private String attrValue;
}
```

![image-20220804192407328](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.1.png)

在`gulimall_pms`数据库里，可以根据`catelog_id`可以在`pms_attr_group`表里查出`attr_group_name`和`attr_group_id`

![image-20220731212330393](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.2.png)

根据`catelog_id`在`pms_attr_group`表里查出`attr_group_name`和`attr_group_id`的`sql`语句

```
select * from pms_attr_group where catelog_id = 225;
```

![image-20220802090316099](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.3.png)

根据刚刚查出的`attr_group_id`可以在`pms_attr_attrgroup_relation`表里查出对应的所有`attr_id`

![image-20220804192923497](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.4.png)

根据刚刚查出的`attr_group_id`在`pms_attr_attrgroup_relation`表里查出对应的所有`attr_id`的`sql`语句

```
select pag.attr_group_name,pag.attr_group_id,paar.attr_id
from pms_attr_group pag
left join pms_attr_attrgroup_relation paar on pag.attr_group_id = paar.attr_group_id
where catelog_id = 225;
```

![image-20220802090959411](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.5.png)

根据刚刚查询到的`attr_id`可以在`pms_attr`表里查询出`attr_name`

:warning:这里的`pms_attr`表里`value_select`为可选的`value`列表，不是我们想要的`attrValue`

![image-20220804193530836](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.6.png)

根据查询到的`attr_id`在`pms_attr`表里查询出`attr_name`的`sql`语句

```mysql
select pag.attr_group_name,pag.attr_group_id,paar.attr_id,pattr.attr_name
from pms_attr_group pag
left join pms_attr_attrgroup_relation paar on pag.attr_group_id = paar.attr_group_id
left join pms_attr pattr on paar.attr_id = pattr.attr_id
where pag.catelog_id = 225;
```

![image-20220802091511570](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.7.png)

根据刚刚查出的`attr_id`可以在`pms_product_attr_value`表里查对应的`attr_value`(其实这里面有`attr_name`完全没有必要在`pms_attr`表里面查)

![image-20220804194438412](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.8.png)

根据刚刚查出的`attr_id`在`pms_product_attr_value`表里查对应的`attr_value`的`sql`语句

```mysql
select pag.attr_group_name,pag.attr_group_id,paar.attr_id,pattr.attr_name,ppav.attr_value
from pms_attr_group pag
left join pms_attr_attrgroup_relation paar on pag.attr_group_id = paar.attr_group_id
left join pms_attr pattr on paar.attr_id = pattr.attr_id
left join pms_product_attr_value ppav on pattr.attr_id = ppav.attr_id
where pag.catelog_id = 225;
```

![image-20220802092257211](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.9.png)

刚刚已经查询出了当前`catelog_id`的所有`attr_group_name`、`attr_name`、`attr_value`，再筛选掉不是当前`spu_id`的数据就行了(这样做感觉好像不太高效，我觉得应该先在`pms_product_attr_value`表里查询出当前`spu_id`的所有`attr_id`，在根据`attr_id`查出`attr_group_name`)

```mysql
select pag.attr_group_name,pag.attr_group_id,paar.attr_id,pattr.attr_name,ppav.attr_value,ppav.spu_id
from pms_attr_group pag
left join pms_attr_attrgroup_relation paar on pag.attr_group_id = paar.attr_group_id
left join pms_attr pattr on paar.attr_id = pattr.attr_id
left join pms_product_attr_value ppav on pattr.attr_id = ppav.attr_id
where pag.catelog_id = 225 and ppav.spu_id = 1;
```

![image-20220802092848294](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.10.png)

在`gulimall-product`模块的`src/main/resources/mapper/product/AttrGroupDao.xml`文件里添加如下代码（内部类前面使用`$`连接，而不是`.`）

```xml
<resultMap id="spuItemAttrGroupVo" type="com.atguigu.gulimall.product.vo.SkuItemVo$SpuItemAttrGroupVo">
    <result property="groupName" column="attr_group_name"/>
    <collection property="attrs" ofType="com.atguigu.gulimall.product.vo.SkuItemVo$SpuBaseAttrVo">
        <result property="attrName" column="attr_name"/>
        <result property="attrValues" column="attr_value"/>
    </collection>
</resultMap>

<select id="getAttrGroupWithAttrsBySpuIdAndCatalogId" resultMap="spuItemAttrGroupVo">
    select pag.attr_group_name,pag.attr_group_id,paar.attr_id,pattr.attr_name,ppav.attr_value,ppav.spu_id
    from gulimall_pms.pms_attr_group pag
             left join gulimall_pms.pms_attr_attrgroup_relation paar on pag.attr_group_id = paar.attr_group_id
             left join gulimall_pms.pms_attr pattr on paar.attr_id = pattr.attr_id
             left join gulimall_pms.pms_product_attr_value ppav on pattr.attr_id = ppav.attr_id
    where pag.catelog_id = #{catalogId} and ppav.spu_id = #{spuId};
</select>
```

![image-20220802104501856](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.5.11.png)

##### 6、测试

把`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类的`item`方法的`3、获取spu的销售属性组合。`的部分注释掉

```java
List<SkuItemVo.SkuItemSaleAttrVo> skuItemSaleAttrVos = skuSaleAttrValueService.getSaleAttrsBySpuId(spuId);
skuItemVo.setSaleAttr(skuItemSaleAttrVos);
```

![image-20220802104358079](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.6.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`测试类里添加如下代码，执行测试

```java
@Autowired
AttrGroupService attrGroupService;
@Test
public void attrGroupServiceTest(){
   System.out.println(attrGroupService.getAttrGroupWithAttrsBySpuIdAndCatalogId(1L, 225L));
```

报了如下错误

```
Caused by: java.lang.IllegalStateException: No typehandler found for property attrValues
	at org.apache.ibatis.mapping.ResultMapping$Builder.validate(ResultMapping.java:151)
	at org.apache.ibatis.mapping.ResultMapping$Builder.build(ResultMapping.java:140)
	at org.apache.ibatis.builder.MapperBuilderAssistant.buildResultMapping(MapperBuilderAssistant.java:391)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.buildResultMappingFromContext(XMLMapperBuilder.java:393)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.resultMapElement(XMLMapperBuilder.java:280)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.processNestedResultMappings(XMLMapperBuilder.java:402)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.buildResultMappingFromContext(XMLMapperBuilder.java:383)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.resultMapElement(XMLMapperBuilder.java:280)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.resultMapElement(XMLMapperBuilder.java:253)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.resultMapElements(XMLMapperBuilder.java:245)
	at org.apache.ibatis.builder.xml.XMLMapperBuilder.configurationElement(XMLMapperBuilder.java:118)
	... 95 more
```

![image-20220802104717746](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.6.2.png)

将`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SkuItemVo`类的`SpuBaseAttrVo`内部类的`private List<String> attrValues;`修改为`private String attrValue;`

![image-20220802104829696](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.6.3.png)

将`gulimall-product`模块的`src/main/resources/mapper/product/AttrGroupDao.xml`文件里的`<result property="attrValues" column="attr_value"/>`修改为`<result property="attrValue" column="attr_value"/>`

然后重启`GulimallProductApplication`模块，刷新`http://item.gulimall.com/9.html`页面，`GulimallProductApplication`服务的控制台成功输出了`skuItemVo`的数据

```json
[SkuItemVo.SpuItemAttrGroupVo(groupName=主体, attrs=[SkuItemVo.SpuBaseAttrVo(attrName=入网型号, attrValue=LIO-A00), SkuItemVo.SpuBaseAttrVo(attrName=上市年份, attrValue=2019)]), SkuItemVo.SpuItemAttrGroupVo(groupName=基本信息, attrs=[SkuItemVo.SpuBaseAttrVo(attrName=机身颜色, attrValue=黑色), SkuItemVo.SpuBaseAttrVo(attrName=机身长度(mm), attrValue=158.3), SkuItemVo.SpuBaseAttrVo(attrName=机身材质工艺, attrValue=其他)]), SkuItemVo.SpuItemAttrGroupVo(groupName=主芯片, attrs=[SkuItemVo.SpuBaseAttrVo(attrName=CPU品牌, attrValue=海思(Hisilicon)), SkuItemVo.SpuBaseAttrVo(attrName=CPU型号, attrValue=HUAWEI Kirin 980)])]
```

![image-20220802105046822](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.6.4.png)

##### 7、获取spu销售属性集合

去掉刚刚在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类的`item`方法的`3、获取spu的销售属性组合。`的注释

```java
List<SkuItemVo.SkuItemSaleAttrVo> skuItemSaleAttrVos = skuSaleAttrValueService.getSaleAttrsBySpuId(spuId);
skuItemVo.setSaleAttr(skuItemSaleAttrVos);
```

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuSaleAttrValueService`接口里添加`getSaleAttrsBySpuId`抽象方法

```java
List<SkuItemVo.SkuItemSaleAttrVo> getSaleAttrsBySpuId(Long spuId);
```

![image-20220802105245574](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.7.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuSaleAttrValueServiceImpl`类里实现`getSaleAttrsBySpuId`抽象方法

```java
@Override
public List<SkuItemVo.SkuItemSaleAttrVo> getSaleAttrsBySpuId(Long spuId) {

    return this.getBaseMapper().getSaleAttrsBySpuId(spuId);
}
```

![image-20220802105432422](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.7.2.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.dao.SkuSaleAttrValueDao`接口里添加`getSaleAttrsBySpuId`抽象方法

```java
List<SkuItemVo.SkuItemSaleAttrVo> getSaleAttrsBySpuId(@Param("spuId") Long spuId);
```

![GIF 2022-8-2 10-56-24](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.7.3.gif)

##### 8、编写sql

根据`spu_id`在`pms_sku_info`表里可以查出对应的`sku_id`

```mysql
select * from pms_sku_info where spu_id=1;
```

![image-20220802110511143](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.8.1.png)

根据`sku_id`可以在`pms_sku_sale_attr_value`表里查出对应的`attr_id`和`attr_value`

```mysql
select pssav.attr_id attr_id,pssav.attr_value attr_value
from pms_sku_info info
left join pms_sku_sale_attr_value pssav on info.sku_id = pssav.sku_id
where info.spu_id=1;
```

![image-20220802110549989](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.8.2.png)

可以对`pssav.attr_id`和`pssav.attr_name`进行分组，`group_concat(distinct pssav.attr_value)`函数可以将未分组的数据用`,`连接起来

```mysql
select pssav.attr_id attr_id,pssav.attr_name attr_name, group_concat(distinct pssav.attr_value) attr_value
from pms_sku_info info
left join pms_sku_sale_attr_value pssav on info.sku_id = pssav.sku_id
where info.spu_id=1
group by pssav.attr_id,pssav.attr_name
```

![image-20220802110623514](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.8.3.png)

在`gulimall-product`模块的`src/main/resources/mapper/product/SkuSaleAttrValueDao.xml`文件里添加如下代码（内部类前面使用`$`连接，而不是`.`）

```mysql
<resultMap id="skuItemSaleAttrVo" type="com.atguigu.gulimall.product.vo.SkuItemVo$SkuItemSaleAttrVo">
    <id property="attrId" column="attr_id"/>
    <result property="attrName" column="attr_name"/>
    <collection property="attrValues" ofType="java.lang.String">
        <result column="attr_value"/>
    </collection>
</resultMap>

<select id="getSaleAttrsBySpuId" resultMap="skuItemSaleAttrVo">
    select pssav.attr_id attr_id,pssav.attr_name attr_name,pssav.attr_value attr_value
    from gulimall_pms.pms_sku_info info
             left join gulimall_pms.pms_sku_sale_attr_value pssav on info.sku_id = pssav.sku_id
    where info.spu_id=#{spuId};
</select>
```

![image-20220802195353614](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.8.4.png)

##### 9、测试

在`gulimall-product`模块的`com.atguigu.gulimall.product.GulimallProductApplicationTests`测试类里添加如下代码。然后执行测试

```java
@Autowired
SkuSaleAttrValueService skuSaleAttrValueService;
@Test
public void skuSaleAttrValueServiceTest(){
   System.out.println(skuSaleAttrValueService.getSaleAttrsBySpuId(1L));
}
```

控制台已正确输出如下数据：

```json
[SkuItemVo.SkuItemSaleAttrVo(attrId=4, attrName=颜色, attrValues=[星河银, 亮黑色, 翡冷翠, 罗兰紫]), SkuItemVo.SkuItemSaleAttrVo(attrId=11, attrName=版本, attrValues=[8GB+128GB, 8GB+256GB])]
```

![image-20220802112111881](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.9.png)

##### 10、在`Model`里添加数据

修改`gulimall-product`模块的`com.atguigu.gulimall.product.web.ItemController`类的`skuItem`方法

```java
/**
 * 展示sku的详情
 * @param skuId
 * @return
 */
@GetMapping("/{skuId}.html")
public String skuItem(@PathVariable("skuId") Long skuId, Model model){

    //System.out.println("准备查询" + skuId + "的详情");
    SkuItemVo vo = skuInfoService.item(skuId);
    model.addAttribute("item",vo);
    return "item";
}
```

![image-20220802112435047](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.2.10.png)

#### 3、展示数据

##### 1、修改标题、价格、大图

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<html>`标签上添加`xmlns:th="http://www.thymeleaf.org"`属性，引入`thymeleaf`

```html
<html xmlns:th="http://www.thymeleaf.org">
```

![image-20220802150449195](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.1.png)

在`http://item.gulimall.com/9.html`页面里，打开控制台，定位到`华为 HUAWEI Mate 10 6GB+128GB 亮黑色 移动联通电信4G手机 双卡双待`，复制`华为 HUAWEI Mate 10 6GB+128GB 亮黑色 移动联通电信4G手机 双卡双待`

![image-20220804205800473](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.2.png)   

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`华为 HUAWEI Mate 10 6GB+128GB 亮黑色 移动联通电信4G手机 双卡双待`，在`class="box-name"`的`<div>`里添加`th:text="${item.info.skuTitle}"`属性，在`class="box-hide"`的`<div>`里添加` th:text="${item.info.skuSubtitle}"`属性，删除`class="box-hide"`的`<div>`里`<u></u>`里的内容

修改`主标题`和`副标题`，删除`优惠信息跳转`

```html
<div class="box-name" th:text="${item.info.skuTitle}">
   华为 HUAWEI Mate 10 6GB+128GB 亮黑色 移动联通电信4G手机 双卡双待
</div>
<div class="box-hide" th:text="${item.info.skuSubtitle}">预订用户预计11月30日左右陆续发货！麒麟970芯片！AI智能拍照！
   <a href=""><u></u></a>
</div>
```

![image-20220802150741326](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.3.png)

在`http://item.gulimall.com/9.html`页面里，打开控制台，定位到`大图`，复制`probox`

![image-20220802150947928](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.4.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`probox`，在` class="probox"`的`<div>`里的`<img>`标签上添加`th:src="${item.info.skuDefaultImg}"`属性，在`class="showbox"`的`<div>`里的`<img>`标签上添加`th:src="${item.info.skuDefaultImg}"`属性

```html
<div class="imgbox">
   <div class="probox">
      <!--商品大图图片-->
      <img class="img1" alt="" th:src="${item.info.skuDefaultImg}">
      <div class="hoverbox"></div>
   </div>
   <div class="showbox">
      <!--大图放大后的图片 -->
      <img class="img1" alt="" th:src="${item.info.skuDefaultImg}">
   </div>
</div>
```

![image-20220802151259345](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.5.png)

在`http://item.gulimall.com/9.html`页面里，打开控制台，定位到`4499.00`，复制`4499.00`

![image-20220802151427909](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.6.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`4499.00`，在该`<span>`标签里添加`th:text="${item.info.price}"`属性

```html
<span th:text="${item.info.price}">4499.00</span>
```

![image-20220802153343528](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.7.png)

重启`GulimallProductApplication`服务，刷新`http://item.gulimall.com/9.html`页面，可以看到`主标题`、`副标题`、`价格`、`大图`都已经动态显示出来了,但是价格显示了小数点后6位

![image-20220802153454603](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.8.png)

在`http://search.gulimall.com/list.html`页面里搜索`华为`，随便点击一个商品，可以看到在`http://item.gulimall.com/1.html`页面里已动态刷新出这些数据，但是价格精确到了小数点后三位

![GIF 2022-8-2 15-36-59](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.9.gif)

在`thymeleaf`里，有一个`#numbers.formatDecimal(final Number target, final Integer minIntegerDigits, final Integer decimalDigits)`方法，可以指定`最小整数位数`和`小数个数`

将刚刚的`<span th:text="${item.info.price}">4499.00</span>`修改为如下代码

```html
<span th:text="${#numbers.formatDecimal(item.info.price,1,2)}">4499.00</span>
```

![image-20220802154113758](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.10.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

打开`http://item.gulimall.com/7.html`页面，可以看到价格已只显示小数点后两位了

![image-20220802154150273](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.1.11.png)

##### 2、修改销售属性、小图

在`http://item.gulimall.com/7.html`页面里，，打开控制台，定位到`无货，此商品暂时售完`，复制`无货，此商品暂时售完`

![image-20220802154434635](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SkuItemVo`类里添加`hasStock`字段，用来指明是否有货

```java
/**
 * 是否有货
 */
boolean hasStock = true;
```

![image-20220802154552565](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.2.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`无货，此商品暂时售完`，在此`<span>`标签里添加`th:text`属性

```html
<li>
   <span th:text="${item.hasStock?'有货':'无货，此商品暂时售完'}">有货</span>
</li>
```

![image-20220802155031124](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.3.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

刷新`http://item.gulimall.com/7.html`页面，可以看到已经显示`有货`了

![image-20220802155138616](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.4.png)

在`http://item.gulimall.com/7.html`页面里，，打开控制台，定位到`选择颜色`，复制`选择颜色`

![image-20220802155237628](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.5.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`选择颜色`，只保留一个`class="box-attr clear"`的`<div>`，删掉其余同级`<div>`

![image-20220802155328193](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.6.png)

将其修改为如下代码

```html
<div class="box-attr-3">
   <div class="box-attr clear" th:each="attr : ${item.saleAttr}">
      <dl>
         <dt>选择[[${attr.attrName}]]</dt>
         <dd th:each="val : ${attr.attrValues}">
            <a href="#">
            <!--<img src="/static/item/img/59ddfcb1Nc3edb8f1.jpg" />-->
               [[${val}]]
            </a>
         </dd>
      </dl>
   </div>
</div>
```

![image-20220802162459901](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.7.png)

在`http://item.gulimall.com/3.html`页面里，，打开控制台，定位到小图片，复制`box-lh-one`

![image-20220813093708919](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.8.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`box-lh-one`，只保留一个`class="box-attr clear"`的`<div>`

```html
<div class="box-lh-one">
   <ul>
      <li th:each="image : ${item.images}"><img th:src="${image.imgUrl}"/></li>
   </ul>
</div>
```

![image-20220802160025226](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.9.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

![image-20220802160751563](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.10.png)

但图片有可能为空，因此需要加一个判断

```html
<div class="box-lh-one">
   <ul>
      <li th:each="image : ${item.images}" th:if="${!#strings.isEmpty(image.imgUrl)}">
         <img th:src="${image.imgUrl}"/>
      </li>
   </ul>
</div>
```

![image-20220802160526179](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.2.11.png)

##### 3、修改商品介绍、规格与包装

在`http://item.gulimall.com/3.html`页面里，，打开控制台，定位到商品详情的图片，复制`xiaoguo`

![image-20220802162621276](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.1.png)

把`class="xiaoguo"`的`<img>`标签的上面`<p>`标签和`<table>`标签注释掉

```
<p>
    <a href="#">品牌:华为（HUAWEI）</a>
</p>
```

把`class="xiaoguo"`的`<img>`标签修改为如下代码

```html
<img class="xiaoguo" th:each="desp : ${#strings.listSplit(item.desp.decript,',')}" th:src="${desp}" />
```

![image-20220802163541409](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.2.png)

在`http://item.gulimall.com/3.html`页面里，，打开控制台，定位到`规格与包装`，复制`规格与包装`

![image-20220802164153238](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.3.png)

将`规格与包装`所在的`<a>`标签的`href="##"`属性删掉，并删掉同级其他`<li>`标签里的`<a>`标签里的`href="#"`属性

```html
<ul class="shopjieshao">
   <li class="jieshoa" style="background: #e4393c;">
      <a style="color: white;">商品介绍</a>
   </li>
   <li class="baozhuang">
      <a >规格与包装</a>
   </li>
   <li class="baozhang">
      <a >售后保障</a>
   </li>
   <li class="pingjia">
      <a >商品评价(4万+)</a>
   </li>
   <li class="shuoming">
      <a>预约说明</a>
   </li>

</ul>
```

![image-20220802164419137](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.4.png)

重启`GulimallProductApplication`服务，刷新`http://item.gulimall.com/3.html`页面，可以看到点击`商品介绍`、`规格与包装`、`售后保障`、`商品评价(4万+)`、`预约说明`都没有什么问题，就是鼠标样式有点问题

![GIF 2022-8-2 16-45-37](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.5.gif)



在`gulimall-product`模块的`src/main/resources/templates/item.html`文件的`<head>`标签里修改鼠标样式

```html
<style  type="text/css">
   a:hover{
      cursor: pointer;
   }
</style>
```

![image-20220802165345938](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.6.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

刷新`http://item.gulimall.com/3.html`页面，可以看到鼠标样式已经正常了

![GIF 2022-8-2 16-54-19](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.7.gif)



在`http://item.gulimall.com/3.html`页面里，打开控制台，定位到商品介绍最下面的规格介绍，复制`guiGebox guiGebox1`

![image-20220802170417765](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.8.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`guiGebox guiGebox1`，只保留里面第一个`class="guiGe"`的`<div>`，删掉其他的`class="guiGe"`的`<div>`

![image-20220802170547221](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.9.png)

将其修改为如下样式

```html
<div class="guiGebox guiGebox1">
   <div class="guiGe" th:each="guige : ${item.groupAttrs}">
      <h3 th:text="${guige.groupName}" style="text-align: left">主体</h3>
      <dl>
         <div th:each="attr:${guige.attrs}">
            <dt th:text="${attr.attrName}" style="text-align: left">品牌</dt>
            <dd th:text="${attr.attrValue}" style="text-align: left">华为(HUAWEI)</dd>
         </div>
      </dl>
   </div>
   <div class="package-list">
      <h3>包装清单</h3>
      <p>手机（含内置电池） X 1、5A大电流华为SuperCharge充电器X 1、5A USB数据线 X 1、半入耳式线控耳机 X 1、快速指南X 1、三包凭证 X 1、取卡针 X 1、保护壳 X 1</p>
   </div>
</div>
```

![image-20220802172130594](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.10.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

刷新`http://item.gulimall.com/3.html`页面，可以看到商品介绍里的销售属性已经显示出来了

![image-20220802172158517](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.11.png)

在`http://item.gulimall.com/3.html`页面里，打开控制台，定位到规格与包装里的销售属性，复制`guiGebox`

![image-20220802163735252](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.12.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`guiGebox`，只保留里面第一个`class="guiGe"`的`<div>`，删掉其他的`class="guiGe"`的`<div>`

![image-20220802185536572](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.13.png)

将其修改为如下样式

```html
<div class="guiGebox">
   <div class="guiGe" th:each="guige : ${item.groupAttrs}">
      <h3 th:text="${guige.groupName}" style="text-align: left">主体</h3>
      <dl>
         <div th:each="attr:${guige.attrs}">
            <dt th:text="${attr.attrName}" style="text-align: left">品牌</dt>
            <dd th:text="${attr.attrValue}" style="text-align: left">华为(HUAWEI)</dd>
         </div>
      </dl>
   </div>
   <div class="package-list">
      <h3>包装清单</h3>
      <p>手机（含内置电池） X 1、5A大电流华为SuperCharge充电器X 1、5A USB数据线 X 1、半入耳式线控耳机 X 1、快速指南X 1、三包凭证 X 1、取卡针 X 1、保护壳 X 1</p>
   </div>
</div>
```

![image-20220802190210444](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.14.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

刷新`http://item.gulimall.com/3.html`页面，可以看到规格与包装里的销售属性已经显示出来了

![image-20220802190954869](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.15.png)

但是此时的`商品介绍`里的销售属性竟然显示了两次一模一样的数据

![GIF 2022-8-2 19-12-48](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.16.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`guiGebox guiGebox1`，注释掉该`class="guiGebox guiGebox1"`的`<div>`标签

![image-20220802191412216](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.17.png)

点击`Build` -> `Recompile 'item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

刷新`http://item.gulimall.com/3.html`页面，可以看到这次就只显示一次了

![GIF 2022-8-2 19-15-17](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.3.3.18.png)

#### 4、点击可选参数跳转到指定sku页面

##### 1、编写`sql`

当点击某一个具体的`颜色`或`内存容量`等时，可以查询哪些`sku`有这个具体的`颜色`或`内存容量`。修改上次写的查询该`sku`可选参数的sql，修改为如下`sql`，多查询一个`pssav.attr_name`

```mysql
select pssav.sku_id,pssav.attr_id attr_id,pssav.attr_name,pssav.attr_value attr_value
from pms_sku_info info
left join pms_sku_sale_attr_value pssav on info.sku_id = pssav.sku_id
where info.spu_id=1;
```

![image-20220802192144097](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.1.1.png)

可以根据`spu_id`查询该商品的所有可选参数的所有具体属性值，然后判断哪些`sku`有该属性值。当点击某一个可选参数的具体属性值时，修改该可选参数的属性值，其他可选参数的具体属性值不变，再查找`∩`交集，判断要选择的`sku`，要显示的`sku`就是满足所有可选参数的某一具体属性值的`sku`求`∩`交集。(eg: 当前`sku`的可选参数信息为：`颜色=亮黑色`(具有该可选参数的属性值的`sku`有`3,4`)、`版本=8GB+128GB`(具有该可选参数的属性值的`sku`有`1,3,5,7`)。因此如果点击`颜色=罗兰紫`就需要判断属性具有`颜色=罗兰紫`(sku=7,8)和`版本=8GB+128GB`(sku=1,3,5,7)的`sku` ,将满足这些属性值的`sku`求交集就为`7`，因此应该跳转到`sku_id`=`7`的商品页)

```mysql
select pssav.attr_id attr_id,pssav.attr_name attr_name,pssav.attr_value attr_value,
       group_concat(distinct pssav.sku_id) sku_id
from pms_sku_info info
         left join pms_sku_sale_attr_value pssav on info.sku_id = pssav.sku_id
where info.spu_id=1
group by pssav.attr_id,pssav.attr_name,pssav.attr_value;
```

![image-20220802193044714](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.1.2.png)

##### 2、修改代码

把`gulimall-product`模块的`com.atguigu.gulimall.product.vo.SkuItemVo`类里的`private List<String> attrValues;`修改为`private List<AttrValueWithSkuIdVo> attrValues;`

再新建`AttrValueWithSkuIdVo`匿名内部类

```java
@Data
public static class AttrValueWithSkuIdVo{
    /**
     * 属性值(如翡冷翠、8GB+128GB、8GB+256GB等)
     */
    private String attrValue;
    /**
     * 具有该属性值的skuId集合
     */
    private String skuIds;
}
```

![image-20220802194718825](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.2.1.png)

修改`gulimall-product`模块的`src/main/resources/mapper/product/SkuSaleAttrValueDao.xml`文件的id为`getSaleAttrsBySpuId`的查询语句

```html
<resultMap id="skuItemSaleAttrVo" type="com.atguigu.gulimall.product.vo.SkuItemVo$SkuItemSaleAttrVo">
    <id property="attrId" column="attr_id"/>
    <result property="attrName" column="attr_name"/>
    <collection property="attrValues" ofType="com.atguigu.gulimall.product.vo.SkuItemVo$AttrValueWithSkuIdVo">
        <result property="attrValue" column="attr_value"/>
        <result property="skuIds" column="sku_id"/>
    </collection>
</resultMap>

<select id="getSaleAttrsBySpuId" resultMap="skuItemSaleAttrVo">
    select pssav.attr_id attr_id,pssav.attr_name attr_name,pssav.attr_value attr_value,
           group_concat(distinct pssav.sku_id) sku_id
    from gulimall_pms.pms_sku_info info
             left join gulimall_pms.pms_sku_sale_attr_value pssav on info.sku_id = pssav.sku_id
    where info.spu_id=1
    group by pssav.attr_id,pssav.attr_name,pssav.attr_value;
</select>
```

![image-20220802195721440](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.2.2.png)

##### 3、修改页面

修改`gulimall-product`模块的`src/main/resources/templates/item.html`里` class="box-attr-3"`的`<div>`

```html
<div class="box-attr-3">
   <div class="box-attr clear" th:each="attr : ${item.saleAttr}">
      <dl>
         <dt>选择[[${attr.attrName}]]</dt>
         <dd th:each="val : ${attr.attrValues}">
            <a href="#" th:attr="skus=${val.skuIds}">
            <!--<img src="/static/item/img/59ddfcb1Nc3edb8f1.jpg" />-->
               [[${val.attrValue}]]
            </a>
         </dd>
      </dl>
   </div>
</div>
```

![image-20220802200349661](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.1.png)

重启`GulimallProductApplication`模块，在`http://item.gulimall.com/3.html`页面里，打开控制台，定位到选择颜色里的`星河银`和`8GB+256GB`

```html
<a href="#" skus="1,2">星河银</a>
<a href="#" skus="2,4,6,8">8GB+256GB</a>
```

可以看到`星河银`和`8GB+256GB`的`skus`集合的∩交集只有`2`，这就是想要的`sku`(边框颜色有问题)

![image-20220802200202794](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.2.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里搜索`box-attr clear`,跳转到可选参数这里，

将`class="box-attr clear"`的`<div>`里的`<a>`标签里的`href="#"`删掉，替换为` th:class="${#lists.contains(#strings.listSplit(val.skuIds,','),item.info.skuId.toString())?'sku_attr_value checked':'sku_attr_value'}"`，如果选择了该属性值就`class`属性里加上`checked`

```html
<div class="box-attr-3">
   <div class="box-attr clear" th:each="attr : ${item.saleAttr}">
      <dl>
         <dt>选择[[${attr.attrName}]]</dt>
         <dd th:each="val : ${attr.attrValues}">
            <a th:class="${#lists.contains(#strings.listSplit(val.skuIds,','),item.info.skuId.toString())?'sku_attr_value checked':'sku_attr_value'}"
               th:attr="skus=${val.skuIds}">
            <!--<img src="/static/item/img/59ddfcb1Nc3edb8f1.jpg" />-->
               [[${val.attrValue}]]
            </a>
         </dd>
      </dl>
   </div>
</div>
```

![image-20220802204646306](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.3.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

可以看到当前`3`号`sku`，里，attrValue 的`skus`属性里包含该`3`号的`sku`的标签`class`都为`sku_attr_value checked`，其他`attrValue`的`skus`属性里包不含该`3`号的`sku`的标签`class`都为`sku_attr_value`(边框颜色有问题)

![image-20220802204605054](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.4.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`里添加如下方法，去掉所有`class`里含有`sku_attr_value`的`<a>`标签的父标签的红色边框，并将`class='sku_attr_value checked'`的`<a>`标签的父标签添加红色边框

```javascript
// 页面加载时自动调用该方法
$(function () {
   $(".sku_attr_value").parent().css({"border":"solid 1px #ccc"});
   $("a[class='sku_attr_value checked']").parent().css({"border":"solid 1px red"});
})
```

![image-20220802205731494](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.5.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

可以看到当前`3`号`sku`，里，attrValue 的`skus`属性里包含该`3`号的`sku`的标签`class`都为`sku_attr_value checked`，其他`attrValue`的`skus`属性里包不含该`3`号的`sku`的标签`class`都为`sku_attr_value`，并且都应用上了红色边框样式

![image-20220802205829833](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.6.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`里添加如下方法，给`class`里含有`sku_attr_value`的标签添加点击事件，判断点击后可能要跳转的`sku`的集合

```javascript
$(".sku_attr_value").click(function () {
   //点击的元素先添加上自定义的属性。为了识别我们是刚才被点击的
   var skus = new Array();
   $(this).addClass("clicked");
   var curr = $(this).attr("skus").split(",");
   //当前被点击的所有sku组合数组放进去
   skus.push(curr);
   //去掉同一行的所有的checked
   $(this).parent().parent().find(".sku_attr_value").removeClass("checked");
   //其他行的被选中的skuIds也放到skus里
   $("a[class='sku_attr_value checked']").each(function(){
      skus.push($(this).attr("skus").split(","));
   });
   console.log(skus);
});
```

![image-20220802212245851](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.7.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

在`http://item.gulimall.com/2.html`页面里，如果点击`选择颜色`里的`星河银`，此时已求出符合满足所有可选参数的某个属性值的`sku`的集合

![image-20220802212145502](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.8.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`里在`.sku_attr_value`的点击事件方法里继续添加代码

```javascript
$(".sku_attr_value").click(function () {
   //点击的元素先添加上自定义的属性。为了识别我们是刚才被点击的
   var skus = new Array();
   $(this).addClass("clicked");
   var curr = $(this).attr("skus").split(",");
   //当前被点击的所有sku组合数组放进去
   skus.push(curr);
   //去掉同一行的所有的checked
   $(this).parent().parent().find(".sku_attr_value").removeClass("checked");
   //其他行的被选中的skuIds也放到skus里
   $("a[class='sku_attr_value checked']").each(function(){
      skus.push($(this).attr("skus").split(","));
   });
   console.log(skus);
   //取出他们的交集，得到skuId (skus[0]为刚刚点击的attrValue)
   var filterEle = skus[0];
   for(var i = 1;i<skus.length;i++){
      //使用 $(filterEle) 把 js对象 转为 Jquery对象
      filterEle = $(filterEle).filter(skus[i]);
   }
   //JQuery对象
   console.log(filterEle);
   //第0个元素即为想要获取的值
   console.log(filterEle[0]);
});
```

![image-20220802213251687](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.9.png)

在`http://item.gulimall.com/2.html`页面里，亮黑色和8GB+128GB都有的是3

![image-20220802212809885](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.10.png)

在`http://item.gulimall.com/1.html`页面里，在此页面点击选择颜色里的`亮黑色`，可以看到控制台输出3

![image-20220802213018996](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.11.png)

在`gulimall-product`模块的`src/main/resources/templates/item.html`文件里的`<script>`里在`.sku_attr_value`的点击事件方法里继续添加代码

```javascript
$(".sku_attr_value").click(function () {
   //点击的元素先添加上自定义的属性。为了识别我们是刚才被点击的
   var skus = new Array();
   $(this).addClass("clicked");
   var curr = $(this).attr("skus").split(",");
   //当前被点击的所有sku组合数组放进去
   skus.push(curr);
   //去掉同一行的所有的checked
   $(this).parent().parent().find(".sku_attr_value").removeClass("checked");
   //其他行的被选中的skuIds也放到skus里
   $("a[class='sku_attr_value checked']").each(function(){
      skus.push($(this).attr("skus").split(","));
   });
   console.log(skus);
   //取出他们的交集，得到skuId (skus[0]为刚刚点击的attrValue)
   var filterEle = skus[0];
   for(var i = 1;i<skus.length;i++){
      //使用 $(filterEle) 把 js对象 转为 Jquery对象
      filterEle = $(filterEle).filter(skus[i]);
   }
   //JQuery对象
   console.log(filterEle);
   //第0个元素即为想要获取的值
   console.log(filterEle[0]);
   //4、跳转
   location.href = "http://item.gulimall.com/"+filterEle[0]+".html";
});
```

![image-20220802213149530](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.12.png)

点击`Build` -> `Recompile "item.html'` 或按快捷键`Ctrl+ Shift+F9`，重新编译当前静态文件

在`http://item.gulimall.com/1.html`页面里点击选择颜色里的`亮黑色`，可以看到正确跳转到了`http://item.gulimall.com/3.html`页面

![GIF 2022-8-2 21-34-19](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.4.3.13.gif)

#### 5、异步编排

##### 1、配置线程池

在`gulimall-product`模块的`com.atguigu.gulimall.product.config`包里新建`MyThreadConfig`配置类，在这里面配置线程池，但这种固定配置的写法不是很好

```java
package com.atguigu.gulimall.product.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description: 线程池
 */
@Configuration
public class MyThreadConfig {

    @Bean
    public ThreadPoolExecutor threadPoolExecutor(){
        return new ThreadPoolExecutor(20,
                200, 10,
                TimeUnit.SECONDS, new LinkedBlockingDeque<>(100000),
                Executors.defaultThreadFactory(),
                new  ThreadPoolExecutor.AbortPolicy());
    }
}
```

![image-20220803092004898](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.1.1.png)

在`gulimall-product`模块的`com.atguigu.gulimall.product.config`包里新建`ThreadPollConfigProperties`类，在该类里定义线程池可能的参数，并和配置文件的`gulimall.thread`绑定

```java
package com.atguigu.gulimall.product.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description:
 */
@ConfigurationProperties(prefix = "gulimall.thread")
@Component
@Data
public class ThreadPollConfigProperties {

    private Integer corePoolSize;
    private Integer maximumPoolSize;
    private Integer keepAliveTime;
}
```

![image-20220803092437609](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.1.2.png)

可以根据提示添加如下依赖，启动该模块后，写自定义的配置可以有提示

![image-20220803092755205](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.1.3.png)

在`gulimall-product`模块的`pom.xml`里添加如下依赖

```xml
<!--添加注释处理器(使用idea添加自定义配置会有提示)-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

![image-20220803093240135](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.1.4.png)

在`gulimall-product`模块的`src/main/resources/application.properties`文件里添加如下配置

```properties
gulimall.thread.core-pool-size=20
gulimall.thread.maximum-pool-size=200
gulimall.thread.keep-alive-time=10
```

![image-20220803093858347](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.1.5.png)

修改`gulimall-product`模块的`com.atguigu.gulimall.product.config.MyThreadConfig`配置类，改为从配置文件里动态取值

```java
package com.atguigu.gulimall.product.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * @author 无名氏
 * @date 2022/8/3
 * @Description: 线程池
 */
//@EnableConfigurationProperties(ThreadPollConfigProperties.class)
@Configuration
public class MyThreadConfig {

    @Bean
    public ThreadPoolExecutor threadPoolExecutor(ThreadPollConfigProperties poll){
        return new ThreadPoolExecutor(poll.getCorePoolSize(),
                poll.getMaximumPoolSize(), poll.getKeepAliveTime(),
                TimeUnit.SECONDS, new LinkedBlockingDeque<>(100000),
                Executors.defaultThreadFactory(),
                new  ThreadPoolExecutor.AbortPolicy());
    }
}
```

![image-20220803093723240](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.1.6.png)

##### 2、使用异步编排

修改`gulimall-product`模块的`com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl`类的`item`方法，改用异步编排来获取信息

```java
@Override
public SkuItemVo item(Long skuId) throws ExecutionException, InterruptedException {
    SkuItemVo skuItemVo = new SkuItemVo();

    //1、sku基本信息获取pms_sku_info
    CompletableFuture<SkuInfoEntity> infoFuture = CompletableFuture.supplyAsync(() -> {
        SkuInfoEntity skuInfoEntity = this.getById(skuId);
        skuItemVo.setInfo(skuInfoEntity);
        return skuInfoEntity;
    }, executor);
    //3、获取spu的销售属性组合。
    CompletableFuture<Void> saleAttrFuture = infoFuture.thenAcceptAsync((info) -> {
        List<SkuItemVo.SkuItemSaleAttrVo> skuItemSaleAttrVos = skuSaleAttrValueService.getSaleAttrsBySpuId(info.getSpuId());
        skuItemVo.setSaleAttr(skuItemSaleAttrVos);
    },executor);
    //4、获取spu的介绍 pms_spu_info_desc
    CompletableFuture<Void> descFuture = infoFuture.thenAcceptAsync((info) -> {
        SpuInfoDescEntity spuInfoDescEntity = spuInfoDescService.getById(info.getSpuId());
        skuItemVo.setDesp(spuInfoDescEntity);
    }, executor);
    //5、获取spu的规格参数信息。
    CompletableFuture<Void> baseAttrFuture = infoFuture.thenAcceptAsync((info) -> {
        List<SkuItemVo.SpuItemAttrGroupVo> attrGroupVos = attrGroupService.getAttrGroupWithAttrsBySpuIdAndCatalogId(info.getSpuId(), info.getCatalogId());
        skuItemVo.setGroupAttrs(attrGroupVos);
    }, executor);

    //2、sku的图片信息pms_sku_images
    CompletableFuture<Void> imageFuture = CompletableFuture.runAsync(() -> {
        List<SkuImagesEntity> images = skuImagesService.getImagesBySkuId(skuId);
        skuItemVo.setImages(images);
    },executor);

    //不用添加infoFuture，因为 saleAttrFuture,descFuture,baseAttrFuture能完成在其之前的infoFuture必然能完成
    CompletableFuture.allOf(saleAttrFuture,descFuture,baseAttrFuture,imageFuture).get();
    return skuItemVo;
}
```

![image-20220803095329617](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.1.png)

鼠标放在` CompletableFuture.allOf(saleAttrFuture,descFuture,baseAttrFuture,imageFuture).get();`的`get`这里，按`alt+enter`快捷键，选择`Add exceptions to method signature`，再点击`yes`，给本类和本类的接口的`item`方法抛出异常

![GIF 2022-8-3 10-11-03](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.2.gif)

此时`gulimall-product`模块的`com.atguigu.gulimall.product.service.SkuInfoService`接口的`item`方法变为如下代码

```java
SkuItemVo item(Long skuId) throws ExecutionException, InterruptedException;
```

![image-20220813152500357](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.3.png)

`gulimall-product`模块的`com.atguigu.gulimall.product.web.ItemController`类的`skuItem`方法变为如下代码

```java
/**
 * 展示sku的详情
 * @param skuId
 * @return
 */
@GetMapping("/{skuId}.html")
public String skuItem(@PathVariable("skuId") Long skuId, Model model) throws ExecutionException, InterruptedException {

    System.out.println("准备查询" + skuId + "的详情");
    SkuItemVo vo = skuInfoService.item(skuId);
    model.addAttribute("item",vo);
    return "item";
}
```

![image-20220813152705939](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.4.png)



在`http://item.gulimall.com`页面里随便输一个关键词，然后点击搜索按钮，在`http://search.gulimall.com/list.html?keyword=华为`页面里，随便点一个商品，出现了异常

![GIF 2022-8-3 10-02-11](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.5.gif)

查看`GulimallProductApplication`服务的控制台，报了如下异常，原因说的很清除`Prohibited package name: java.util.concurrent`，包名不能以`java`开头

```
java.lang.SecurityException: Prohibited package name: java.util.concurrent
    at java.lang.ClassLoader.preDefineClass(ClassLoader.java:655) ~[na:1.8.0_301]
    at java.lang.ClassLoader.defineClass(ClassLoader.java:754) ~[na:1.8.0_301]
    at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142) ~[na:1.8.0_301]
    at java.net.URLClassLoader.defineClass(URLClassLoader.java:468) ~[na:1.8.0_301]
    at java.net.URLClassLoader.access$100(URLClassLoader.java:74) ~[na:1.8.0_301]
    at java.net.URLClassLoader$1.run(URLClassLoader.java:369) ~[na:1.8.0_301]
    at java.net.URLClassLoader$1.run(URLClassLoader.java:363) ~[na:1.8.0_301]
    at java.security.AccessController.doPrivileged(Native Method) ~[na:1.8.0_301]
    at java.net.URLClassLoader.findClass(URLClassLoader.java:362) ~[na:1.8.0_301]
    at org.springframework.boot.devtools.restart.classloader.RestartClassLoader.findClass(RestartClassLoader.java:159) ~[spring-boot-devtools-2.1.8.RELEASE.jar:2.1.8.RELEASE]
    at org.springframework.boot.devtools.restart.classloader.RestartClassLoader.loadClass(RestartClassLoader.java:141) ~[spring-boot-devtools-2.1.8.RELEASE.jar:2.1.8.RELEASE]
    at java.lang.ClassLoader.loadClass(ClassLoader.java:351) ~[na:1.8.0_301]
    at com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl.item(SkuInfoServiceImpl.java:133) ~[classes/:na]
    at com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl$$FastClassBySpringCGLIB$$f4bab3b6.invoke(<generated>) ~[classes/:na]
    at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218) ~[spring-core-5.1.9.RELEASE.jar:5.1.9.RELEASE]
    at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:684) ~[spring-aop-5.1.9.RELEASE.jar:5.1.9.RELEASE]
    at com.atguigu.gulimall.product.service.impl.SkuInfoServiceImpl$$EnhancerBySpringCGLIB$$204d922f.item(<generated>) ~[classes/:na]
    at com.atguigu.gulimall.product.web.ItemController.skuItem(ItemController.java:34) ~[classes/:na]
```

![image-20220803100300583](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.6.png)

经过查找发现`gulimall-common`模块不知道怎么多了`java.util.concurrent.CompletableFuture`和`java.util.concurrent.FutureTask`，删掉重启`gulimall-product`模块就好了

![image-20220804113632736](https://gitlab.com/apzs/image/-/raw/master/image/5.6.3.5.2.7.png)

