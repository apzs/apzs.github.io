import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as i,c as n,e as t}from"./app-AMUHiwF7.js";const d={},s=t(`<h1 id="cmo研究" tabindex="-1"><a class="header-anchor" href="#cmo研究" aria-hidden="true">#</a> CMO研究</h1><h2 id="主界面" tabindex="-1"><a class="header-anchor" href="#主界面" aria-hidden="true">#</a> 🍑主界面</h2><h3 id="界面截图" tabindex="-1"><a class="header-anchor" href="#界面截图" aria-hidden="true">#</a> 🐟 界面截图</h3><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423111404148.png" alt="image-20260423111404148" tabindex="0" loading="lazy"><figcaption>image-20260423111404148</figcaption></figure><h3 id="对话框代码" tabindex="-1"><a class="header-anchor" href="#对话框代码" aria-hidden="true">#</a> 🐟 对话框代码</h3><p>程序启动后，会弹出对话框，对话框左侧是一个图片，右侧是一些按钮。进入游戏首先就要创建新想定，因此我们全局搜索<code>创建新想定</code>，搜索出来3个，而很明显<code>Command/Command/StartGameMenuWindow.xaml</code>文件是最符合的。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423111844907.png" alt="image-20260423111844907" tabindex="0" loading="lazy"><figcaption>image-20260423111844907</figcaption></figure><p>我们在其对应的<code>C#</code>文件的构造方法上打断点。</p><blockquote><p>怎么知道这个<code>xaml</code>的<code>c#</code>文件呢，<code>Rider</code>里面直接有提示，或者点击<code>x:Class</code>的<code>Command.StartGameMenuWindow</code>或<code>MouseDown</code>的<code>ConcatInterruptibleRecord</code>。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423112619001.png" alt="image-20260423112619001" tabindex="0" loading="lazy"><figcaption>image-20260423112619001</figcaption></figure><p>如果没有使用<code>Rider</code>怎么办呢？其实他们就放在同一个文件夹下。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423112809275.png" alt="image-20260423112809275" tabindex="0" loading="lazy"><figcaption>image-20260423112809275</figcaption></figure></blockquote><p>打完断点后重新启动调试，查看调用栈后可以看到，先调用的<code>EnableInterruptibleRecord</code>方法，<code>EnableInterruptibleRecord</code>方法创建的<code>StartGameMenuWindow</code>对象。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423113123550.png" alt="image-20260423113123550" tabindex="0" loading="lazy"><figcaption>image-20260423113123550</figcaption></figure><p>根据代码可以看到<code>EnableInterruptibleRecord</code>方法是在<code>ShowStartWindow</code>方法里创建一个线程，调用线程的<code>Start</code>方法启动线程执行的。因此我们在<code>ShowStartWindow</code>方法的开头打一个断点，看看<code>ShowStartWindow</code>方法是怎么被调用的。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public partial class StartGameMenuWindow : Window
{

	public static Thread StartGameWindowThread;

	public static Dispatcher StartGameWindowThreadDispatcher;

	public StartGameMenuWindow()
	{
		base.Closing += InitInterruptibleRecord; 
		InitializeComponent(); // 解析 XAML 并构建 UI 树
	}

	private static void EnableInterruptibleRecord()
	{
		Client.startGameMenuWindow_0 = new StartGameMenuWindow(); // 创建窗口对象
		StartGameWindowThreadDispatcher = Dispatcher.CurrentDispatcher; // 抓取当前新线程的调度器，主线程正是利用这个调度器发号施令的。
		Dispatcher.Run(); // 启动消息循环：开启了 WPF 的事件循环，开始监听鼠标点击、重绘等系统消息。
	}
	
	public static void ShowStartWindow()
	{
		if (StartGameWindowThread == null)
		{
			StartGameWindowThread = new Thread(EnableInterruptibleRecord); // 创建线程，执行 EnableInterruptibleRecord 方法
			StartGameWindowThread.Name = &quot;StartGameWindowThread&quot;;
			StartGameWindowThread.SetApartmentState(ApartmentState.STA); // WPF 规定，任何创建和操作UI元素的线程都必须是单线程单元（STA）
			StartGameWindowThread.IsBackground = true; // 后台线程： 确保主程序退出时，这个线程也会随之自动关闭。
			StartGameWindowThread.Start(); // 开启线程
			while (StartGameWindowThreadDispatcher == null)
			{  // 自旋锁。调用方（通常是主线程）会在这里稍微暂停，直到新线程把它的调度器（Dispatcher）准备好。
				Thread.Sleep(1);
			}
		}
		if (Client.startGameMenuWindow_0 == null &amp;&amp; Debugger.IsAttached)
		{
			Debugger.Break();
		}
		StartGameWindowThreadDispatcher.InvokeAsync(delegate // 使用 InvokeAsync 进行跨线程委托
		{
			if (!Client.startGameMenuWindow_0.IsVisible) // 如果窗口还没显示
			{
				Client.startGameMenuWindow_0.WindowState = WindowState.Normal; // 恢复正常大小
				Client.startGameMenuWindow_0.WindowStyle = WindowStyle.None; // 去掉 Windows 默认的标题栏和边框，实现无边框效果。
				Client.startGameMenuWindow_0.Show(); // 调用 WPF 原生的 Show() 方法，渲染界面到屏幕上。
			}
			Client.startGameMenuWindow_0.Focus(); // 获取焦点：强行将窗口置于前端，确保用户可以直接与之交互。
		});
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423113316460.png" alt="image-20260423113316460" tabindex="0" loading="lazy"><figcaption>image-20260423113316460</figcaption></figure><p>可以看到<code>ShowStartWindow</code>方法是在<code>RateInterruptibleMap</code>方法里被调用的。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal class AdapterCallbackCandidate : WindowsFormsApplicationBase
{
	
	internal static void Main(string[] args)             // &lt;====   Main方法
	{
		Application.SetCompatibleTextRenderingDefault(defaultValue: false);
		ItemExporter.RevertInterruptibleMap.Run(args);
	}

	private void RateInterruptibleMap(object sender, StartupEventArgs e)
	{
		// 省略
		try
		{
			// 省略
			Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher; // 获取当前正在执行该代码的线程关联的 Dispatcher（消息调度器），并赋值到\`Client.MainThreadDispatcher\`字段上，方便对相关UI进行进行控制。这里的线程是 主 UI 线程（主线程绑定的Startup事件执行的RateInterruptibleMap方法）。
			ItemExporter.RevertInterruptibleMap.DoEvents();
			StartGameMenuWindow.ShowStartWindow();                      // &lt;== 调用 开始游戏的对话框界面
			ItemExporter.RevertInterruptibleMap.DoEvents();
		}
		catch (Exception projectError3)
		{
			ProjectData.SetProjectError(projectError3);
			ProjectData.ClearProjectError();
		}
	}


	[DebuggerStepThrough]
	public AdapterCallbackCandidate()
		: base(AuthenticationMode.Windows)
	{
		base.NetworkAvailabilityChanged += ResetInterruptibleMap;
		base.Shutdown += MapInterruptibleMap;
		base.Startup += RateInterruptibleMap;                       // &lt;== Startup事件绑定RateInterruptibleMap方法
		base.IsSingleInstance = false;
		base.EnableVisualStyles = true;
		base.SaveMySettingsOnExit = true;
		base.ShutdownStyle = ShutdownMode.AfterMainFormCloses;
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423113945125.png" alt="image-20260423113945125" tabindex="0" loading="lazy"><figcaption>image-20260423113945125</figcaption></figure><p>接着看<code>RateInterruptibleMap</code>是怎么调用的，这个方法是在本类<code>AdapterCallbackCandidate</code>的构造方法里使用<code>base.Startup</code>绑定上去的。本类继承<code>WindowsFormsApplicationBase</code>类。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423114111002.png" alt="image-20260423114111002" tabindex="0" loading="lazy"><figcaption>image-20260423114111002</figcaption></figure><p>点击<code>Startup</code>可以进到<code>WindowsFormsApplicationBase</code>类的<code>Startup</code>事件上，上面注释写着<code>在应用程序启动时发生</code>。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423114500811.png" alt="image-20260423114500811" tabindex="0" loading="lazy"><figcaption>image-20260423114500811</figcaption></figure><p>然后我们搜索<code>StartupEventHandler</code>，发现其在<code>OnStartup</code>方法里被使用，顺腾摸瓜就发现了其具体的逻辑：</p><p><code>Run</code>方法调用了<code>DoApplicationModel</code>方法,<code>DoApplicationModel</code>方法调用了<code>OnStartup</code>方法，<code>OnStartup</code>方法里触发了我们的事件。</p><blockquote><p><strong>编译器生成的委托字段</strong>：</p><p>当声明事件时：</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public event StartupEventHandler Startup;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译器会自动生成一个<strong>私有委托字段</strong> <code>StartupEvent</code>（名称可能略有不同，实际为编译器生成的后备字段）</p><p><strong>事件订阅的存储</strong>：</p><p>当外部代码订阅事件：</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>app.Startup += MyStartupHandler;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>订阅的方法会被添加到<code>StartupEvent</code>委托链中</p><p><strong>触发原理</strong>：</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>// 获取当前所有订阅者
StartupEventHandler startupEvent = this.StartupEvent;

// 安全触发事件（避免null引用）
if (startupEvent != null) 
 startupEvent(this, eventArgs);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里直接调用委托字段<code>StartupEvent</code>，等效于触发所有订阅了<code>Startup</code>事件的方法。</p></blockquote><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public class WindowsFormsApplicationBase : ConsoleApplicationBase
{
  // 省略
  public event StartupEventHandler Startup;

  public event StartupNextInstanceEventHandler StartupNextInstance;
    
  public event ShutdownEventHandler Shutdown;

  [SecuritySafeCritical]
  [MethodImpl(MethodImplOptions.NoInlining)]
  public void Run(string[] commandLine)
  {
    this.InternalCommandLine = new ReadOnlyCollection&lt;string&gt;((IList&lt;string&gt;) commandLine);
    if (!this.IsSingleInstance)     // 软件是否是单实例
    {
      this.DoApplicationModel();   // &lt;== 调用 DoApplicationModel 方法
    }
    else
    {
      // 省略
      if (createdNew)
      {
        try
        {
          TcpServerChannel tcpServerChannel = (TcpServerChannel) this.RegisterChannel(WindowsFormsApplicationBase.ChannelType.Server, ChannelIsSecure);
           // 省略
          this.DoApplicationModel();  // &lt;== 调用 DoApplicationModel 方法
        }
        finally
        {
        }
      }
      else
      {
         // 省略
        if (!this.m_MessageRecievedSemaphore.WaitOne(2500, false))
          throw new CantStartSingleInstanceException();
      }
    }
  }

  [EditorBrowsable(EditorBrowsableState.Advanced)]
  protected virtual bool OnStartup(StartupEventArgs eventArgs)  // &lt;== OnStartup方法
  {
    eventArgs.Cancel = false;
    if (this.m_TurnOnNetworkListener &amp; this.m_NetworkObject == null)
    {
      this.m_NetworkObject = new Network();
      this.m_NetworkObject.NetworkAvailabilityChanged += new NetworkAvailableEventHandler(this.NetworkAvailableEventAdaptor);
    }
    // ISSUE: reference to a compiler-generated field
    StartupEventHandler startupEvent = this.StartupEvent; // 编译器会自动生成的私有委托字段 StartupEvent  (调用base.Startup += RateInterruptibleMap;会自动添加到StartupEvent委托链中)
    if (startupEvent != null)
      startupEvent((object) this, eventArgs); // 直接调用委托字段StartupEvent，等效于触发所有订阅了Startup事件的方法
    return !eventArgs.Cancel;
  }

    private void DoApplicationModel()                       // &lt;== DoApplicationModel方法
  {
    StartupEventArgs eventArgs = new StartupEventArgs(this.CommandLineArgs);
    if (!Debugger.IsAttached)
    {
      try
      {
        if (!this.OnInitialize(this.CommandLineArgs) || !this.OnStartup(eventArgs)) // DoApplicationModel方法里调用OnStartup方法
          return;
        // 省略
      }
    }
    else
    {
      if (!this.OnInitialize(this.CommandLineArgs) || !this.OnStartup(eventArgs))  // DoApplicationModel方法里调用OnStartup方法
        return;
      this.OnRun();
      this.OnShutdown();
    }
  }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么<code>WindowsFormsApplicationBase</code>的<code>Run</code>方法是怎么被调用的呢？</p><p>根据查找，是<code>AdapterCallbackCandidate</code>类的<code>Main</code>方法（也就是程序的入口）调用的。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal class AdapterCallbackCandidate : WindowsFormsApplicationBase
{
	
	internal static void Main(string[] args)
	{
		Application.SetCompatibleTextRenderingDefault(defaultValue: false);
		ItemExporter.RevertInterruptibleMap.Run(args); // 调用的 \`WindowsFormsApplicationBase\`(本组件的父组件)的\`Run\`方法（这里的ItemExporter.RevertInterruptibleMap其实返回的是本类即AdapterCallbackCandidate，和RateInterruptibleMap方法没有任何关系）
	}


	private void RateInterruptibleMap(object sender, StartupEventArgs e)
	{
		// 省略
		try
		{
			// 省略
			Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;
			ItemExporter.RevertInterruptibleMap.DoEvents();
			StartGameMenuWindow.ShowStartWindow();
			ItemExporter.RevertInterruptibleMap.DoEvents();
		}
		
		// 省略
	}

	public AdapterCallbackCandidate()
		: base(AuthenticationMode.Windows)
	{
		base.NetworkAvailabilityChanged += ResetInterruptibleMap;
		base.Shutdown += MapInterruptibleMap;
		base.Startup += RateInterruptibleMap;      //  订阅\`WindowsFormsApplicationBase\`的Startup事件
		base.IsSingleInstance = false;
		base.EnableVisualStyles = true;
		base.SaveMySettingsOnExit = true;
		base.ShutdownStyle = ShutdownMode.AfterMainFormCloses;
	}

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看一下<code>ItemExporter.RevertInterruptibleMap.Run(args);</code>方法为什么调用的是 <code>WindowsFormsApplicationBase</code>的<code>Run</code>方法。</p><p>调用<code>ItemExporter.RevertInterruptibleMap</code>时首先会加载<code>ItemExporter</code>类调用其静态代码块，初始化<code>_CreatorExporter = new CustomerRuleWatcher&lt;AdapterCallbackCandidate&gt;();</code>。然后执行<code>ItemExporter.RevertInterruptibleMap</code>的<code>get</code>方法返回<code>_CreatorExporter.PushInterruptiblePolicy()</code>。即返回创建的<code>AdapterCallbackCandidate</code>类型对象。</p><p>调用<code>ItemExporter.RevertInterruptibleMap.Run(args);</code>方法也就是调用<code>AdapterCallbackCandidate</code>类型对象的<code>Run</code>方法，而<code>AdapterCallbackCandidate</code>类型的<code>Run</code>方法继承至 <code>WindowsFormsApplicationBase</code>。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal sealed class ItemExporter
{
    
    internal sealed class CustomerRuleWatcher&lt;T&gt; where T : new()
	{
		internal static object m_StubMapping;
        private static T _TokenizerMapping; // T类型的对象

		internal T PushInterruptiblePolicy() // 调用该方法返回该泛型类型的单例对象（懒加载）
		{
			if (_TokenizerMapping == null)
			{
				_TokenizerMapping = new T(); // 如果_TokenizerMapping为空就创建该泛型类型的对象
			}
			return _TokenizerMapping; // _TokenizerMapping不为空直接返回
        }

		public CustomerRuleWatcher()
		{
		}
	}
    
    private static readonly CustomerRuleWatcher&lt;AdapterCallbackCandidate&gt; _CreatorExporter;
    
    [HelpKeyword(&quot;My.Application&quot;)]
    internal static AdapterCallbackCandidate RevertInterruptibleMap // &lt;== ItemExporter.RevertInterruptibleMap
    {
       [DebuggerHidden]
       get
       {  // 返回的是 _CreatorExporter.PushInterruptiblePolicy()即_CreatorExporter存的单例对象AdapterCallbackCandidate
          return _CreatorExporter.PushInterruptiblePolicy();
       }
    }

    static ItemExporter()
    {
       setterExporter = new CustomerRuleWatcher&lt;ComparatorExporter&gt;();
       _CreatorExporter = new CustomerRuleWatcher&lt;AdapterCallbackCandidate&gt;(); // _CreatorExporter里存入是AdapterCallbackCandidate的单例对象
       _TemplateExporter = new CustomerRuleWatcher&lt;User&gt;();
       m_MappingExporter = new CustomerRuleWatcher&lt;WatcherListenerMapping&gt;();
       _MockExporter = new CustomerRuleWatcher&lt;MethodCallbackCandidate&gt;();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结一下：<code>AdapterCallbackCandidate</code>的<code>Main</code>方法访问<code>ItemExporter.RevertInterruptibleMap</code>，创建了<code>AdapterCallbackCandidate</code>对象，<code>AdapterCallbackCandidate</code>的构造方法的<code>Startup</code>事件添加了<code>RateInterruptibleMap</code>。<code>RateInterruptibleMap</code>方法里调用了<code>StartGameMenuWindow.ShowStartWindow();</code>，<code>StartGameMenuWindow.ShowStartWindow()</code>里创建了线程，线程执行<code>EnableInterruptibleRecord</code>方法，然后<code>EnableInterruptibleRecord</code>方法创建了<code>StartGameMenuWindow</code>对象。</p><h3 id="创建新想定" tabindex="-1"><a class="header-anchor" href="#创建新想定" aria-hidden="true">#</a> 🐟 创建新想定</h3><p><code>Command/Command/StartGameMenuWindow.xaml</code>文件的<code>创建新想定</code>按钮没有使用传统的点击事件（如 <code>OnClick</code>），而是使用了 <strong>数据绑定 (Data Binding)</strong>。<code>Command=&quot;{Binding CreateScenCommand}&quot;</code> 的意思是：“当按钮被点击时，请去当前上下文（DataContext）中寻找名为 <code>CreateScenCommand</code> 的命令并执行它”。全集搜索创建新想定绑定的<code>CreateScenCommand</code>方法，我们可以在<code>Command/Command/StartGameMenuWindowViewModel.cs</code>类里找到这个方法。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423161837090.png" alt="image-20260423161837090" tabindex="0" loading="lazy"><figcaption>image-20260423161837090</figcaption></figure><p>我们可以给<code>StartGameMenuWindowViewModel</code>类的所有包含<code>CreateScenCommand</code>的地方都打上断点，然后启动调试。</p><blockquote><p>这里的<code>m_TokenizerException = startGameMenuWindow_0;</code>是将当前窗口赋值到<code>m_TokenizerException </code>上，等会点击创建新想定时调用了<code>m_TokenizerException.Close();</code>关闭对话框。</p></blockquote><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423162305210.png" alt="image-20260423162305210" tabindex="0" loading="lazy"><figcaption>image-20260423162305210</figcaption></figure><p>可以看到，在<code>StartGameMenuWindowViewModel</code>是构造方法里绑定的<code>CreateScenCommand</code>字段。</p><p>接下来，我们查看调用栈，发现其是在<code>ChangeInterruptibleRecord</code>的构造方法里创建的<code>StartGameMenuWindowViewModel</code>对象。前面<code>ChangeInterruptibleRecord</code>怎么创建的前面已经讲过了，这里就不再赘述了。</p><blockquote><p><code>base.DataContext = new StartGameMenuWindowViewModel(this);</code>的作用是将数据和命令都绑定到 <code>StartGameMenuWindowViewModel</code> 这个类里。这里的<code>this</code>是当前对话框窗口，这个窗口被赋值到<code>m_TokenizerException </code>字段上了。</p></blockquote><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423171846195.png" alt="image-20260423171846195" tabindex="0" loading="lazy"><figcaption>image-20260423171846195</figcaption></figure><p>接下来我们看<code>StartGameMenuWindowViewModel</code>类的相关逻辑。其实就是点击<code>CreateScenCommand</code>执行<code>InstantiateInterruptibleRecord</code>方法，该方法里使用主UI调度器执行切换到编辑模式、创建新想定功能。</p><blockquote><p><code>Client.MainThreadDispatcher</code>是主UI线程的消息调度器，前面已经讲过了。</p></blockquote><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class StartGameMenuWindowViewModel : INotifyPropertyChanged
{
    [CompilerGenerated]
	private RelayCommand invocationException;
	
	public RelayCommand CreateScenCommand
	{
		[CompilerGenerated]
		get
		{
			return invocationException;
		}
		[CompilerGenerated]
		set
		{
			if (invocationException != value)
			{
				invocationException = value;
				OnPropertyChanged(&quot;CreateScenCommand&quot;);
			}
		}
	}

	private void InstantiateInterruptibleRecord(object object_0)
	{
		Client.MainThreadDispatcher.InvokeAsync(delegate // 主UI线程消息调度器执行相关代码
		{   // 检查授权
			if (Licensing.GetModuleIsLicensed(Licensing.ModuleLicense.CommandFullVersion)) // GetModuleIsLicensed直接返回true
			{ // 如果拥有完整版授权，进入编辑器模式并创建新想定
				Client.CurrentGame.GameMode = Game._GameMode.ScenEdit; // 切换到编辑模式
				Client.CreateNewScenario(); // 创建新想定
			}
			else
			{   // 如果没有授权，弹出“授权不足”提示窗口
				ItemExporter.ConnectInterruptibleTemplate.InsufficientLicenseWindow.theNeededModules = new List&lt;Licensing.ModuleLicense&gt; { Licensing.ModuleLicense.CommandFullVersion };
				ItemExporter.ConnectInterruptibleTemplate.InsufficientLicenseWindow.Show();
			}
		});
		m_TokenizerException.Close(); // // 关闭当前的主菜单窗口 (m_TokenizerException 实际上是 StartGameMenuWindow 的引用，前面创建StartGameMenuWindowViewModel时提到了)这里的Close调用的是原生Window的Close方法。
	}
	

	public StartGameMenuWindowViewModel(StartGameMenuWindow startGameMenuWindow_0)
	{
		// 省略
		CreateScenCommand = new RelayCommand(InstantiateInterruptibleRecord); // 给CreateScenCommand赋值，使其点击后调用InstantiateInterruptibleRecord方法
        // 省略
		
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于<code>Client.CreateNewScenario()</code>内容比较多，等会我们再看。我们先看<code>new RelayCommand(InstantiateInterruptibleRecord)</code>做了什么。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class RelayCommand : ICommand
{
	private readonly Action&lt;object&gt; expressionPredicate;

	private readonly Predicate&lt;object&gt; dispatcherPredicate;

	public RelayCommand(Action&lt;object&gt; action_0)
		: this(action_0, null)
	{
	}

	public RelayCommand(Action&lt;object&gt; action_0, Predicate&lt;object&gt; predicate_0)
	{
		if (action_0 == null)
		{
			throw new ArgumentNullException(&quot;execute&quot;);
		}
		expressionPredicate = action_0; // &lt;== 将InstantiateInterruptibleRecord赋值到expressionPredicate字段上
		dispatcherPredicate = predicate_0;
	}
	
	public void Execute(object parameter) // 按钮点击后会调用ICommand接口实现类的Execute方法
	{
		expressionPredicate(RuntimeHelpers.GetObjectValue(parameter)); // 执行InstantiateInterruptibleRecord方法的代码
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>new RelayCommand(InstantiateInterruptibleRecord)</code>将<code>InstantiateInterruptibleRecord</code>赋值到<code>expressionPredicate</code>字段上，当按钮点击后会调用ICommand接口实现类的<code>Execute</code>方法，<code>Execute</code>方法也就执行<code>InstantiateInterruptibleRecord</code>方法里的代码了。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423172254002.png" alt="image-20260423172254002" tabindex="0" loading="lazy"><figcaption>image-20260423172254002</figcaption></figure><p>下面我们看<code>Client.CreateNewScenario()</code>创建新想定做了什么。这套逻辑可以分为三个核心阶段。</p><p><strong>1. 实例化全新的 <code>Scenario</code> 对象</strong></p><p>方法首先调用 <code>new Scenario(hash)</code>。根据重载方法的不同，传入的数据库哈希值<code>algoClass.Hash</code>（默认数据库）或用户指定的 <code>string_0</code>。 在 <code>Scenario</code> 的构造函数中，引擎做了大量的基础初始化工作：</p><ul><li><strong>分配唯一ID</strong>：为新想定生成全新的 <code>TimelineID</code> 和 <code>_ObjectID</code>（使用 <code>Guid.NewGuid()</code>）。</li><li><strong>绑定数据库</strong>：将传入的哈希值赋给 <code>DBUsed</code>，后续引擎会根据这个值去加载对应的数据库（DB）。</li><li><strong>初始化海量集合与缓存</strong>：创建了用于存储单位（<code>ActiveUnits</code>）、编组（<code>Groups</code>）、武器（<code>_GuidedWeapons</code> 等）、事件引擎（<code>EventTriggers</code>, <code>SimEvents</code>）以及各类缓存（传感器、横截面积、油量计算等）的并发字典和列表。</li><li><strong>设定零点时间</strong>：将当前UTC时间（<code>DateAndTime.Now.ToUniversalTime()</code>）设为想定的初始时间 <code>_Time</code> 和 <code>ZeroHour</code>。</li></ul><p><strong>2. 卸载旧想定并挂载新想定 (<code>SetCurrentScenario</code>)</strong></p><p>接着，方法调用了 <code>SetCurrentScenario(..., bool_0: false)</code>。主要在 UI 线程（<code>Dispatcher.Invoke</code>）中执行：</p><ul><li><strong>垃圾回收与清理</strong>：如果当前已经存在一个想定，它会清空所有的武器缓存、通知消息（<code>Notification_Barks</code>）、UI引用（通过 <code>ReleaseReferences</code>），并彻底销毁旧想定的实例以释放内存。</li><li><strong>重置子窗口</strong>：将通讯、传感器、损管、任务规划等窗口全部置空，并重新 <code>new</code> 出全新的窗口对象。</li><li><strong>加载数据库实体</strong>：调用 <code>DBOps.GetDBRecordByHash</code>，根据第一步中传入的 <code>DBUsed</code> 真正从本地加载数据库文件。如果加载失败，会抛出异常。</li><li><strong>启动 Lua 沙盒</strong>：为新想定绑定 Lua 环境（<code>Scenario_LuaSandbox</code>）并初始化。</li></ul><p><strong>3. 配置新想定的默认参数与 UI 状态</strong></p><p>在 <code>SetCurrentScenario</code> 完成基础环境的替换后，<code>CreateNewScenario</code> 方法接着对这个全新的想定初始化状态。包括清理 UI 日志、重置时间与流速、修改文件与保存状态、启用默认的模拟特性、重置阵营与刷新 UI等。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>[StandardModule]
public sealed class Client
{
	internal static Mount _ManagerClass;
	
	internal static WeaponSalvo getterClass;
	
	public static ReferencePoint SelectedRefPoint;
	
	public static List&lt;Module_Unit.Unit&gt; MapVisibleUnits;

	public static Dictionary&lt;Module_Unit.Unit, Tuple&lt;int, int&gt;&gt; MapVisibleUnit_ScreenCoords;

	public static List&lt;Module_Unit.Unit&gt; MapSelectableUnits;
	
	[AccessedThroughProperty(&quot;_CurrentScenario&quot;)]
	[CompilerGenerated]
	private static Scenario composerRequest;
	
	[SpecialName]
	[CompilerGenerated]
	private static Scenario CompareConfiguration()
	{
		return composerRequest;
	}
	
	public static void ReleaseReferences() // 清空本类的相关数据
	{
		try
		{
			if (MapVisibleUnits != null)
			{
				MapVisibleUnits.Clear();
			}
			if (MapVisibleUnit_ScreenCoords != null)
			{
				MapVisibleUnit_ScreenCoords.Clear();
			}
			if (MapSelectableUnits != null)
			{
				MapSelectableUnits.Clear();
			}
			SelectedRefPoint = null;
			_ManagerClass = null;
			getterClass = null;
			ClearMessageLog();
			stubRequest?.ReleaseReferences();
		}
		catch (Exception projectError)
		{
			ProjectData.SetProjectError(projectError);
			ProjectData.ClearProjectError();
		}
	}

	public static void SetCurrentScenario(Scenario scenario_0, bool bool_0)
    	{
    		Game Local_theGameContext = new Game();
    		if (composerRequest != null)
    		{
    			Local_theGameContext = composerRequest.GameContext;
    		}
    		Dispatcher.Invoke(delegate
    		{
    			try
    			{
    				Scenario scenario_ = CompareConfiguration(); // 1. 获取当前正在运行的旧想定
    				bool flag = scenario_0 != CompareConfiguration(); // 确认确实是在切换不同的想定
    				ConcurrentDictionary&lt;int, Weapon&gt; cache_Weapons = null;
    				try
    				{
    					if (scenario_ != null)
    					{
    						cache_Weapons = scenario_.Cache_Weapons;
    					}
    					if (flag &amp;&amp; CompareConfiguration() != null) // 垃圾回收与旧数据清理
    					{
    						InsertConfiguration(null);
    						ReleaseReferences();  // 释放旧想定的全局引用
    						ItemExporter.ConnectInterruptibleTemplate.MainForm.ReleaseReferences();
    						Command_Core.GlobalSingleton.GetInstance().Notification_Barks.Clear(); // // 清空旧的系统通知
    						GameGeneral.ReleaseReferences();
    					}
    				}
    				catch (Exception ex)
    				{
    					// 省略
    				}
    				ReadConfiguration(scenario_0); // 挂载新想定 (将全局当前想定指针指向新实例)
    				bool godsEye = false;
    				if (CurrentSide != null)
    				{
    					godsEye = CurrentMapProfile.GodsEye;
    				}
    				if (flag &amp;&amp; bool_0)
    				{
    					CompareConfiguration().Cache_Weapons = cache_Weapons;
    				}
    				cache_Weapons = null;
    				if (flag)
    				{
    					try
    					{
    						CompareConfiguration().GameContext = Local_theGameContext;
    						if (Information.IsNothing(CompareConfiguration()))
    						{
    							GameGeneral.Debug_LastLoadedScenario = &quot;N/A&quot;;
    						}
    						else
    						{
    							GameGeneral.Debug_LastLoadedScenario = CompareConfiguration().Title;
    						}
    						m_DescriptorRequest = null;
    						Dispatcher.CurrentDispatcher.InvokeAsync(delegate
    						{
    							ItemExporter.ConnectInterruptibleTemplate.MainForm?.objectError?.VM?.DeleteInterruptibleRegistry();
    						});
    						if (scenario_ != null)
    						{
    							_ = ItemExporter.ConnectInterruptibleTemplate.MainForm.gclass5_0;
    							if (ItemExporter.ConnectInterruptibleTemplate.VerifyInterruptibleCandidate().Visible)
    							{
    								ItemExporter.ConnectInterruptibleTemplate.VerifyInterruptibleCandidate().Close();
    							}
    							GameGeneral.DestroyPreviousScenario(ref scenario_, bool_1: true);
    						}
    						SelectThisUnit(null, bool_0: true);
    						SelectedWaypoint = null;
    						paramsClass = null;
    						theCommsWindow = null;
    						theSensorsWindow = null;
    						theDamageControlWindow = null;
    						ListConfiguration(null);
    						NewMissionWindow = null;
    						OpenMessageWindows = null;
    						theCommsWindow = new UnitComms();  // 通信窗口
    						theSensorsWindow = new UnitSensors(); // 传感器窗口
    						theDamageControlWindow = new DamageControlWindow(); // 损管窗口
    						ListConfiguration(new BackgroundWorker());
    						NewMissionWindow = new NewMission();             // 想定编辑器窗口
    						OpenMessageWindows = new Dictionary&lt;LoggedMessage.MessageType, NewMessageForm&gt;();
    						AutosaveCountdown = 20000.0;
    						m_CallbackRequest = null;
    						m_CallbackRequest = new Queue&lt;string&gt;();
    						RunToThisTime = null;
    						if (scenario_ != null)
    						{
    							scenario_.ReleaseReferences(); // 彻底销毁旧想定的底层对象
    							scenario_ = null;
    						}
    					}
    					catch (Exception ex2)
    					{
    						// 省略
    					}
    					bool bool_ = true;
    					try
    					{
    						DBOps.DBFileCheckResult dbfileCheckResult_ = DBOps.DBFileCheckResult.Undefined; // 5. 根据绑定的 DB Hash，真正从本地读取并加载数据库实体文件！
    						CurrentDB = DBOps.GetDBRecordByHash(CompareConfiguration().DBUsed, ref dbfileCheckResult_, bool_0: true, bool_);
    						if (CurrentDB == null)
    						{
    							throw new Exception(DBOps.PublishImporter(dbfileCheckResult_)); // 找不到对应数据库直接崩溃报错
    						}
    						Game._GameMode gameMode = CurrentGame.GameMode;
    						CurrentGame.GameMode = gameMode;
    					}
    					catch (Exception ex3)
    					{
    						// 省略
    					}
    					// 省略
    					if (CurrentScenario != null)
    					{
    						// 省略
    						try
    						{
    							if (CurrentGame.Status == Game._GameStatus.Running)  // 引擎管线重启
    							{
    								CurrentGame.Pause();  // 强制暂停游戏引擎
    							}
    							advisorRequest?.Invoke();
    							CurrentScenario.Scenario_LuaSandbox = LuaSandbox; // 绑定新的 Lua 脚本执行环境
    							CurrentScenario.Scenario_LuaSandbox.RefreshStats(CurrentScenario);
    							CurrentScenario.Initialize(); // 触发想定的内部初始化运算
    							if (!bool_0)
    							{
    								Scenario currentScenario = CurrentScenario;
    								string string_ = &quot;&quot;;
    								ValidateScenarioAreas(currentScenario, bool_0: false, ref string_);
    							}
    							StrategyRegistryFilter.SelectInterruptibleComparator(CurrentScenario);
    							// 省略
    							if (SimConfiguration.DefaultGamePreferences.MessageLogInWindow &amp;&amp; MainFormShownComplete)
    							{
    								ItemExporter.ConnectInterruptibleTemplate.MainForm.RefreshMessageLogWindowWPF();
    							}
    							iteratorClass = CurrentScenario.ActiveUnits.Count;
    							ItemExporter.ConnectInterruptibleTemplate.MainForm.RefreshCaption();  // 刷新窗口标题栏
    							return;
    						}
    						catch (Exception ex9)
    						{
    							// 省略
    						}
    					}
    				}
    			}
    			catch (Exception ex10)
    			{
    				// 省略
    			}
    		});
    	}

	public static void CreateNewScenario()
	{
		SetCurrentScenario(new Scenario(algoClass.Hash), bool_0: false); // // 1. 核心：实例化一个新的想定对象（传入默认的数据库Hash值），并交给 SetCurrentScenario 执行全局切换
		ItemExporter.ConnectInterruptibleTemplate.MainForm?.MessageLogControlViewModel?.ResetLog(); // 清理旧的UI日志残留
		composerRequest.SetTime(bool_0: false, DateAndTime.Now.ToUniversalTime()); // 设定想定时间为当前现实时间的零点
		composerRequest.GameResolution = 1f; 
		composerRequest.TimeCompression_Set(Scenario.enumTimeCompression.OneSec); // 1:1真实时间流速
		composerRequest.LastSavedInScenEdit = true;
		composerRequest.FileName = null; // 新建文件，尚未命名
		// 强制开启一系列高级真实度模拟特征
		composerRequest.DeclaredFeatures.Add(Scenario.ScenarioFeatureOption.AircraftDamage); // 启用飞机精细损伤模型
		composerRequest.DeclaredFeatures.Add(Scenario.ScenarioFeatureOption.LandTypeEffects); // 启用地形对单位移动/隐蔽的影响
		composerRequest.DeclaredFeatures.Add(Scenario.ScenarioFeatureOption.WeatherAffectsShipSpeed); // 启用恶劣天气对舰艇航速的影响
		composerRequest.DeclaredFeatures.Add(Scenario.ScenarioFeatureOption.ACS_NAW_Limitations); // 启用通信与导航限制
		ScenarioWasLoadedAsBlank = true; // 标记为空白编辑器工程
		SaveScenarioPath = null;
		CurrentSide = null; // 初始化时没有任何阵营
		MustRefreshMainForm = true; // 唤醒主界面，准备进行全局重绘
	}

	public static void CreateNewScenario(string string_0)
	{
		SetCurrentScenario(new Scenario(string_0), bool_0: false);
		// 省略
	}
	
	public static void ClearMessageLog() // 清理消息日志
    	{
    		composerRequest.ClearMessageLog();
    		if (ItemExporter.ConnectInterruptibleTemplate.MainForm.objectError.VM != null)
    		{
    			ItemExporter.ConnectInterruptibleTemplate.MainForm.objectError.VM.ClearLog();
    			ItemExporter.ConnectInterruptibleTemplate.MainForm.objectError.VM.RefreshLoggedMessages();
    		}
    		if (ItemExporter.ConnectInterruptibleTemplate.VerifyInterruptibleCandidate().Visible || ItemExporter.ConnectInterruptibleTemplate.MainForm.gclass5_0 != null)
    		{
    			ItemExporter.ConnectInterruptibleTemplate.MainForm.MessageLogControlViewModel.ClearLog();
    			ItemExporter.ConnectInterruptibleTemplate.MainForm.MessageLogControlViewModel.RefreshLoggedMessages();
    		}
    		MustRefreshMainForm = true;
    	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们看一下<code>SetCurrentScenario(new Scenario(algoClass.Hash), bool_0: false);</code>里面的<code>new Scenario(algoClass.Hash)</code>做了什么。</p><h3 id="主菜单代码" tabindex="-1"><a class="header-anchor" href="#主菜单代码" aria-hidden="true">#</a> 🐟主菜单代码</h3><p>我们在这里介绍<code>文件</code>菜单是如何被加载进来的，其他也是同一个方法被加载进来的（点击事件相关的会在添加阵营时详细介绍）。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423152237169.png" alt="image-20260423152237169" tabindex="0" loading="lazy"><figcaption>image-20260423152237169</figcaption></figure><p>全局搜索<code>文件</code>，发现<code>Command/Command/MainForm.cs</code>是最符合的。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20260423151456728.png" alt="image-20260423151456728" tabindex="0" loading="lazy"><figcaption>image-20260423151456728</figcaption></figure><p>这段代码在<code>Command/Command/MainForm.cs</code>类的<code>ResetState</code>方法里，其代码结构如下所示。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class MainForm : Form
{
	
	[AccessedThroughProperty(&quot;Sides_TSMI&quot;)]
	[CompilerGenerated]
	private DarkToolStripMenuItem m_MapperAdvisor;
	
	internal DarkToolStripMenuItem Sides_TSMI
	{
		// 省略
	}
	
	public MainForm() // &lt;== 构造方法
	{
		base.Resize += CheckState;
		base.FormClosing += SortState;
		// 省略
		m_WrapperAdvisor = new List&lt;ActiveUnit&gt;();
		m_ObserverAdvisor = false;
		_IssuerAdvisor = new List&lt;System.Drawing.Point&gt;();
		// 省略
		paramConnection = new ThreadLocal&lt;List&lt;System.Drawing.Point&gt;&gt;();
		_PageConnection = new ThreadLocal&lt;Dictionary&lt;float, System.Drawing.Point&gt;&gt;();
		ResetState();  // &lt;== 调用了ResetState()方法
	}

	private void ResetState()
	{
		productAdvisor = new Container();
		QComponentResourceManager componentResourceManager = new QComponentResourceManager(typeof(MainForm));
		MenuStrip1 = new DarkMenuStrip();   // &lt;== 主菜单控件
		FileToolStripMenuItem = new DarkToolStripMenuItem(); // 文件菜单
		
		MenuStrip1.SuspendLayout();

		MenuStrip1.BackColor = System.Drawing.SystemColors.ScrollBar;
		MenuStrip1.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		MenuStrip1.ImageScalingSize = new System.Drawing.Size(24, 24);
		MenuStrip1.Items.AddRange(new ToolStripItem[13]
		{   // 主菜单控件 添加 文件菜单
			FileToolStripMenuItem, ViewToolStripMenuItem1, ReportsToolStripMenuItem, TSMI_MapSettings, QuickJumpTSMI, TSMI_UnitOrders, UnitOrdersToolStripMenuItem, MissionsToolStripMenuItem, ContactsToolStripMenuItem, TSMI_Editor,
			HelpToolStripMenuItem, TSMI_Scripts, TSMI_Testing
		});
		MenuStrip1.Location = new System.Drawing.Point(0, 0);
		MenuStrip1.Name = &quot;MenuStrip1&quot;;
		MenuStrip1.Padding = new Padding(3, 2, 0, 2);
		MenuStrip1.Size = new System.Drawing.Size(1162, 24);
		MenuStrip1.TabIndex = 4;
		MenuStrip1.Text = &quot;MenuStrip1&quot;;
		FileToolStripMenuItem.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		FileToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[8] { MaiToolStripMenuItem, TSMI_NewScenario, TSMI_LoadScenario, TSMI_LoadRecent, TSMI_SaveScen, TSMI_SaveAs, TSMI_Benchmark, ExitToolStripMenuItem });
		FileToolStripMenuItem.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		FileToolStripMenuItem.Name = &quot;FileToolStripMenuItem&quot;;
		FileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
		FileToolStripMenuItem.Text = &quot;文件&quot;;
		
		// 省略
		base.Controls.Add(MenuStrip1);
		// 省略
		base.MainMenuStrip = MenuStrip1;
		base.Name = &quot;MainForm&quot;;
		base.StartPosition = FormStartPosition.CenterScreen;
		Text = &quot;Command&quot;;
		MenuStrip1.ResumeLayout(performLayout: false);
		MenuStrip1.PerformLayout();
		// 省略
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们查看<code>MainForm</code>是怎么被创建的。</p><p>在<code>MainForm</code>的构造方法方法开头打上断点。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809142043504.png" alt="image-20250809142043504" tabindex="0" loading="lazy"><figcaption>image-20250809142043504</figcaption></figure><p>然后启动项目，查看调用栈就知道了：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809142236524.png" alt="image-20250809142236524" tabindex="0" loading="lazy"><figcaption>image-20250809142236524</figcaption></figure><p>第一个执行的是<code>Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;</code>，其所在的方法为<span id="AdapterCallbackCandidate.RateInterruptibleMap"><code>RateInterruptibleMap</code></span>，由于对话框代码里已经介绍过了这里就不用再重复叙述了（主菜单代码里调用的是下面的<code>StartGameMenuWindow.ShowStartWindow();</code>开启的对话框）。</p><blockquote><p><code>Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;</code>的作用是将 主 UI 线程 赋值到<code>Client.MainThreadDispatcher</code>字段上，方便对主UI进行进行相关控制。</p></blockquote><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809142418032.png" alt="image-20250809142418032" tabindex="0" loading="lazy"><figcaption>image-20250809142418032</figcaption></figure><hr><p>接下来我们看第二帧的代码。</p><p>第一帧中执行了<code>Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;</code>自然要加载<code>Client</code>类，从而执行了该类的静态代码块。代码块里创建了<code>RecorderForm</code>对象。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Client
{
    
    internal static RecorderForm messageClass;

    static Client()
    {
       _CandidateClass = false;
       AreaInPolygonDraw = null;
       messageClass = new RecorderForm(); // 创建 RecorderForm对象
       // 省略
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809154303061.png" alt="image-20250809154303061" tabindex="0" loading="lazy"><figcaption>image-20250809154303061</figcaption></figure><hr><p>接下来我们看第三帧。第三帧执行<code>RecorderForm</code>构造方法，该构造方法调用了<code>RemoveInterruptibleStatus</code>方法</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809155040591.png" alt="image-20250809155040591" tabindex="0" loading="lazy"><figcaption>image-20250809155040591</figcaption></figure><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class RecorderForm : DarkSecondaryFormBase
{
    
    public RecorderForm()          // 构造方法
    {
       base.Load += PrepareInterruptibleStatus;
       base.KeyDown += CancelInterruptibleStatus;
       base.FormClosing += VerifyInterruptibleStatus;
       base.Closing += ListInterruptibleStatus;
       RemoveInterruptibleStatus(); // 调用了RemoveInterruptibleStatus方法
    }
    
    private void RemoveInterruptibleStatus()
    {
       // 省略
       Text = &quot;回放查看器&quot;;
       base.TopMost = true;       // 执行base.TopMost = true 将窗口置顶
       ((ISupportInitialize)TB_Snapshots).EndInit();
       ToolStrip1.ResumeLayout(performLayout: false);
       ToolStrip1.PerformLayout();
       DarkToolStrip1.ResumeLayout(performLayout: false);
       DarkToolStrip1.PerformLayout();
       ResumeLayout(performLayout: false);
       PerformLayout();
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>接下来看第四帧。这一帧调用<code>base.TopMost = true;</code>将<code>RecorderForm</code>窗口置顶。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809155208805.png" alt="image-20250809155208805" tabindex="0" loading="lazy"><figcaption>image-20250809155208805</figcaption></figure><hr><p>接着看第五帧。这一帧调用用了<code>DarkSecondaryFormBase</code>类的<code>LogoutServer</code>方法。<code>DarkSecondaryFormBase</code>类的<code>LogoutServer</code>方法为<code>Activated</code>事件的处理函数。<code>Activated</code>事件在窗口被激活（即当前操作的是该窗口，每次选择该窗口都会触发）时触发。<code>RecorderForm</code>的父类是<code>DarkSecondaryFormBase</code>，当<code>RecorderForm</code>设置<code>base.TopMost = true;</code>时窗口被置顶，从而执行了该窗口的<code>Activated</code>事件。</p><blockquote><p><strong>Load</strong>： 初始化窗体、加载窗体资源（窗体上的各种控件），在窗体句柄创建之后、显示之前，为显示做准备。只触发一次。 <strong>Shown</strong>：在窗体加载后显示窗体，设置窗体属性<code>Visible=true</code>或<code>form.show()</code>才会触发。触发一次或者不触发。 <strong>Activated</strong>：每次窗体获得焦点均会触发（从别的窗体或对话框切回来时）。可触发多次。</p></blockquote><div class="language-C# line-numbers-mode" data-ext="C#"><pre class="language-C#"><code>public class DarkSecondaryFormBase : DarkForm
{
    public DarkSecondaryFormBase()
    {
       base.Activated += LogoutServer;
       tokenValue = true;
       _IndexerValue = true;
       SelectServer();
    }

    private void LogoutServer(object sender, EventArgs e)
    {
       if (!Client.infoClass)
       {
          base.Owner = ItemExporter.ConnectInterruptibleTemplate.MainForm;
       }
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809155433524.png" alt="image-20250809155433524" tabindex="0" loading="lazy"><figcaption>image-20250809155433524</figcaption></figure><hr><p>接着我们看第六帧。上一帧调用<code>base.Owner = ItemExporter.ConnectInterruptibleTemplate.MainForm;</code>时执行了<code>MainForm</code>的<code>get</code>方法。其作用就是懒加载创建<code>MainForm</code>对象实例。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal sealed class ItemExporter
{
    internal sealed class WatcherListenerMapping
    {
        public MainForm databaseTemplate;

        public MainForm MainForm
        {
            get
            {
                databaseTemplate = CountInterruptibleService(databaseTemplate); // 懒加载创建MainForm对象
                return databaseTemplate;
            }
            set
            {
                if (value != databaseTemplate)
                {
                    if (value != null)
                    {
                        throw new ArgumentException(&quot;Property can only be set to Nothing&quot;);
                    }

                    CustomizeInterruptibleService(ref databaseTemplate);
                }
            }
        }

        private static T CountInterruptibleService&lt;T&gt;(T instance) where T : Form, new()
        {
            if (instance != null &amp;&amp; !instance.IsDisposed)
            {
                return instance; // 如果有这个对象实例直接返回
            }

            if (ruleTemplate == null)
            {
                ruleTemplate = new Hashtable();
            }
            else if (ruleTemplate.ContainsKey(typeof(T)))
            {
                throw new InvalidOperationException(
                    Microsoft.VisualBasic.CompilerServices.Utils.GetResourceString(&quot;WinForms_RecursiveFormCreate&quot;));
            }

            ruleTemplate.Add(typeof(T), null);
            TargetInvocationException ex = default(TargetInvocationException);
            try
            {
                return new T(); // 如果没有这个对象实例，创建实例并返回
            }
            catch (TargetInvocationException ex2) 
            {
                // 省略
            }
            finally
            {
                ruleTemplate.Remove(typeof(T));
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809161157882.png" alt="image-20250809161157882" tabindex="0" loading="lazy"><figcaption>image-20250809161157882</figcaption></figure><hr><p>接着看第七帧。此时<code>MainForm</code>的构造方法就执行了。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809161113010.png" alt="image-20250809161113010" tabindex="0" loading="lazy"><figcaption>image-20250809161113010</figcaption></figure><h2 id="添加阵营" tabindex="-1"><a class="header-anchor" href="#添加阵营" aria-hidden="true">#</a> 🍑 添加阵营</h2><p>创建一个新想定后，首先要做的就是添加阵营，要不然添加单位、创建矩形区域等很多事情都做不了。</p><h3 id="界面交互" tabindex="-1"><a class="header-anchor" href="#界面交互" aria-hidden="true">#</a> 🐟 界面交互</h3><p>添加阵营功能在<code>编辑</code>菜单下的<code>添加/编辑阵营</code>下。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250806132852671.png" alt="image-20250806132852671" tabindex="0" loading="lazy"><figcaption>image-20250806132852671</figcaption></figure><p>我们点击后会弹出<code>编辑阵营</code>的对话框。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250806133114051.png" alt="image-20250806133114051" tabindex="0" loading="lazy"><figcaption>image-20250806133114051</figcaption></figure><p>点击添加后会再次弹出一个对话框让我们输入阵营的名称。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250806133239420.png" alt="image-20250806133239420" tabindex="0" loading="lazy"><figcaption>image-20250806133239420</figcaption></figure><p>点击确定后，编辑阵营的对话框就会出现刚刚添加的<code>红方</code>，选中该名称后<code>删除</code>、<code>对抗关系</code>等按钮会亮起</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250806133420820.png" alt="image-20250806133420820" tabindex="0" loading="lazy"><figcaption>image-20250806133420820</figcaption></figure><h3 id="入口代码" tabindex="-1"><a class="header-anchor" href="#入口代码" aria-hidden="true">#</a> 🐟 入口代码</h3><p>首先我们要找出这个功能的入口位置，我们全局搜索<code>添加/编辑阵营</code>，相关代码在<code>MainForm.cs</code>的<code>ResetState</code>方法里面。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250806133701843.png" alt="image-20250806133701843" tabindex="0" loading="lazy"><figcaption>image-20250806133701843</figcaption></figure><p>其代码结构如下所示，<code>MainForm</code>的构造方法调用了<code>ResetState()</code>方法，<code>ResetState()</code>方法创建了<code>添加/编辑阵营</code>菜单项。由于主菜单代码里已经讲过了，这里就不再重复了。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class MainForm : Form
{
	
	[AccessedThroughProperty(&quot;Sides_TSMI&quot;)]
	[CompilerGenerated]
	private DarkToolStripMenuItem m_MapperAdvisor;
	
	internal DarkToolStripMenuItem Sides_TSMI
	{
		// 省略
	}
	
	public MainForm() // &lt;== 构造方法
	{
		base.Resize += CheckState;
		base.FormClosing += SortState;
		// 省略
		m_WrapperAdvisor = new List&lt;ActiveUnit&gt;();
		m_ObserverAdvisor = false;
		_IssuerAdvisor = new List&lt;System.Drawing.Point&gt;();
		// 省略
		paramConnection = new ThreadLocal&lt;List&lt;System.Drawing.Point&gt;&gt;();
		_PageConnection = new ThreadLocal&lt;Dictionary&lt;float, System.Drawing.Point&gt;&gt;();
		ResetState();  // &lt;== 调用了ResetState()方法
	}

	private void ResetState()
	{
	    // 省略
        Sides_TSMI = new DarkToolStripMenuItem();
		// 省略
		Sides_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		Sides_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		Sides_TSMI.Name = &quot;Sides_TSMI&quot;;
		Sides_TSMI.Size = new System.Drawing.Size(267, 22);
		Sides_TSMI.Text = &quot;添加/编辑阵营&quot;;                         // &lt;== TSMI_Editor&quot;编辑&quot;菜单项
		SwitchTo_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		SwitchTo_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		SwitchTo_TSMI.Name = &quot;SwitchTo_TSMI&quot;;
		SwitchTo_TSMI.Size = new System.Drawing.Size(267, 22);
		SwitchTo_TSMI.Text = &quot;切换到...&quot;;
		// 省略
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="界面代码" tabindex="-1"><a class="header-anchor" href="#界面代码" aria-hidden="true">#</a> 🐟 界面代码</h3><p>在<code>MainForm</code>的构造方法里,首先进行了一系列的初始化工作，最后调用了<code>ResetState()</code>。在<code>ResetState()</code>方法里，创建了<code>MenuStrip1主菜单</code>，在<code>MenuStrip1主菜单</code>里添加了<code>TSMI_Editor编辑</code>菜单项，在<code>TSMI_Editor编辑</code>菜单项里添加了<code>Sides_TSMI添加/编辑阵营</code>菜单项，然后将<code>MenuStrip1主菜单</code>添加到了控件中。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>
public sealed class MainForm : Form
{
	
	[AccessedThroughProperty(&quot;Sides_TSMI&quot;)]
	[CompilerGenerated]
	private DarkToolStripMenuItem m_MapperAdvisor;
	
	internal DarkToolStripMenuItem Sides_TSMI
	{
		[CompilerGenerated]
		get
		{
			return m_MapperAdvisor;
		}
		[MethodImpl(MethodImplOptions.Synchronized)]
		[CompilerGenerated]
		set
		{
			EventHandler value2 = FindAuthentication;
			DarkToolStripMenuItem mapperAdvisor = m_MapperAdvisor;
			if (mapperAdvisor != null)
			{
				mapperAdvisor.Click -= value2;
			}
			m_MapperAdvisor = value;
			mapperAdvisor = m_MapperAdvisor;
			if (mapperAdvisor != null)
			{
				mapperAdvisor.Click += value2;
			}
		}
	}
	
	public MainForm() // &lt;== 构造方法
	{
		base.Resize += CheckState;
		base.FormClosing += SortState;
		// 省略
		m_WrapperAdvisor = new List&lt;ActiveUnit&gt;();
		m_ObserverAdvisor = false;
		_IssuerAdvisor = new List&lt;System.Drawing.Point&gt;();
		// 省略
		paramConnection = new ThreadLocal&lt;List&lt;System.Drawing.Point&gt;&gt;();
		_PageConnection = new ThreadLocal&lt;Dictionary&lt;float, System.Drawing.Point&gt;&gt;();
		ResetState();  // &lt;== 调用了ResetState()方法
	}

	private void ResetState()
	{
		productAdvisor = new Container();
		QComponentResourceManager componentResourceManager = new QComponentResourceManager(typeof(MainForm));
		MenuStrip1 = new DarkMenuStrip();
		// 省略
		TSMI_Editor = new DarkToolStripMenuItem();
        // 省略
        Sides_TSMI = new DarkToolStripMenuItem();
		// 省略
		MenuStrip1.BackColor = System.Drawing.SystemColors.ScrollBar;
		MenuStrip1.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		MenuStrip1.ImageScalingSize = new System.Drawing.Size(24, 24);
		MenuStrip1.Items.AddRange(new ToolStripItem[13] // &lt;== 将TSMI_Editor&quot;编辑&quot;添加到了主菜单中
		{
			FileToolStripMenuItem, ViewToolStripMenuItem1, ReportsToolStripMenuItem, TSMI_MapSettings, QuickJumpTSMI, TSMI_UnitOrders, UnitOrdersToolStripMenuItem, MissionsToolStripMenuItem, ContactsToolStripMenuItem, TSMI_Editor,
			HelpToolStripMenuItem, TSMI_Scripts, TSMI_Testing
		});
		MenuStrip1.Location = new System.Drawing.Point(0, 0);
		MenuStrip1.Name = &quot;MenuStrip1&quot;;
		MenuStrip1.Padding = new Padding(3, 2, 0, 2);
		MenuStrip1.Size = new System.Drawing.Size(1162, 24);
		MenuStrip1.TabIndex = 4;
		MenuStrip1.Text = &quot;MenuStrip1&quot;;
		
		// 省略
		TSMI_Editor.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		TSMI_Editor.DropDownItems.AddRange(new ToolStripItem[35] // &lt;== 将Sides_TSMI&quot;添加/编辑阵营&quot;菜单项添加到TSMI_Editor&quot;编辑&quot;里面
		{
			StartDurationToolStripMenuItem, TitleDescriptionToolStripMenuItem, ToolStripSeparator_2, DarkToolStripMenuItem_2, ToolStripSeparator4, TSMI_Campaign, ToolStripSeparator_24, Sides_TSMI, SwitchTo_TSMI, BriefingToolStripMenuItem,
			TSMI_EditScoring, GodsEyeViewToolStripMenuItem, MinefieldsToolStripMenuItem, ToolStripSeparator_4, WeatherToolStripMenuItem, RealismSettingsToolStripMenuItem, TSMI_MergeScenarios, EventEditorToolStripMenuItem, DarkToolStripMenuItem_0, ToolStripSeparator5,
			TSMI_UnitOps, TSMI_IsolatedUnitPOV, ToolStripSeparator_0, KillAllUnitsofThisSideToolStripMenuItem, TSMI_RemoveAllSideContacts, ToolStripMenuItem9, TSMI_PublishToSteam, TSMI_PackageScen, InstallationsToolStripMenuItem, ScenarioMigrationTSMI,
			TSMI_ScriptingConsole, ToolStripSeparator_33, TSMI_MonteCarloAnalysis, TSMI_InteractivAnalysisConfig, TSMI_CustomIcon
		});
		TSMI_Editor.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		TSMI_Editor.Name = &quot;TSMI_Editor&quot;;
		TSMI_Editor.Size = new System.Drawing.Size(50, 20);
		TSMI_Editor.Text = &quot;编辑&quot;;
		TSMI_Editor.Visible = false;
		// 省略
		Sides_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		Sides_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		Sides_TSMI.Name = &quot;Sides_TSMI&quot;;
		Sides_TSMI.Size = new System.Drawing.Size(267, 22);
		Sides_TSMI.Text = &quot;添加/编辑阵营&quot;;                         // &lt;== TSMI_Editor&quot;编辑&quot;菜单项
		SwitchTo_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		SwitchTo_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		SwitchTo_TSMI.Name = &quot;SwitchTo_TSMI&quot;;
		SwitchTo_TSMI.Size = new System.Drawing.Size(267, 22);
		SwitchTo_TSMI.Text = &quot;切换到...&quot;;
		
		// 省略
		base.Controls.Add(MenuStrip1); // &lt;== 主菜单添加到控件中
		base.Controls.Add(Panel_WW);
		base.Controls.Add(ToolStrip_Status);
		DoubleBuffered = true;
		base.Icon = (Icon)componentResourceManager.GetIcon(&quot;$this.Icon&quot;);
		base.KeyPreview = true;
		base.MainMenuStrip = MenuStrip1;
		base.Name = &quot;MainForm&quot;;
		base.StartPosition = FormStartPosition.CenterScreen;
		Text = &quot;Command&quot;;
		MenuStrip1.ResumeLayout(performLayout: false);
		MenuStrip1.PerformLayout();
		// 省略
		PerformLayout();
		WindowDarkMode.UseImmersiveDarkMode(base.Handle, bool_0: true);
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Sides_TSMI添加/编辑阵营</code>使用了<code>get/set</code>方法，在<code>get</code>方法里返回了<code>m_MapperAdvisor</code>，在<code>set</code>方法里给按钮绑定了<code>FindAuthentication</code>事件。<code>FindAuthentication()</code>方法里调用了<code>ItemExporter.ConnectInterruptibleTemplate.Sides.Show()</code>方法，打开一个对话框。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>
public sealed class MainForm : Form
{
	
	[AccessedThroughProperty(&quot;Sides_TSMI&quot;)]
	[CompilerGenerated]
	private DarkToolStripMenuItem m_MapperAdvisor;
	
	internal DarkToolStripMenuItem Sides_TSMI
	{
		[CompilerGenerated]
		get
		{
			return m_MapperAdvisor;
		}
		[MethodImpl(MethodImplOptions.Synchronized)]
		[CompilerGenerated]
		set
		{
			EventHandler value2 = FindAuthentication;   // 事件
			DarkToolStripMenuItem mapperAdvisor = m_MapperAdvisor; // mapperAdvisor 赋值为老的菜单项
			if (mapperAdvisor != null)
			{ // 目的： 防止事件重复绑定：避免同一个事件处理程序被多次附加到同一个控件 。内存管理：防止旧对象无法被垃圾回收
				mapperAdvisor.Click -= value2; // 老的菜单项移除 FindAuthentication 事件
			}
			m_MapperAdvisor = value; // mapperAdvisor 赋值为 新设置的菜单项 (value为新设置的值)
			mapperAdvisor = m_MapperAdvisor; // mapperAdvisor 赋值为 新设置的菜单项
			if (mapperAdvisor != null)
			{
				mapperAdvisor.Click += value2; // 新设置的菜单项 绑定 FindAuthentication 事件
			}
		}
	}
    
    private void FindAuthentication(object sender, EventArgs e)
	{
		ItemExporter.ConnectInterruptibleTemplate.Sides.Show(); // 打开 编辑阵营 对话框
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ItemExporter.ConnectInterruptibleTemplate.Sides</code>其实就是返回一个<code>Sides</code>对象，这段代码不重要。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal sealed class ItemExporter
{
	[EditorBrowsable(EditorBrowsableState.Never)]
	[MyGroupCollection(&quot;System.Windows.Forms.Form&quot;, &quot;Create__Instance__&quot;, &quot;Dispose__Instance__&quot;, &quot;My.MyProject.Forms&quot;)]
	internal sealed class WatcherListenerMapping
	{
		
		[EditorBrowsable(EditorBrowsableState.Never)]
		public Sides definitionMapping;
		
		// 省略
		
		public Sides Sides
		{
			get
			{   // 懒加载Sides对象
				definitionMapping = CountInterruptibleService(definitionMapping);
				return definitionMapping;
			}
			set
			{
				if (value != definitionMapping)
				{
					if (value != null)
					{
						throw new ArgumentException(&quot;Property can only be set to Nothing&quot;);
					}
					CustomizeInterruptibleService(ref definitionMapping);
				}
			}
		}

		// 省略

		[DebuggerHidden]
		private static T CountInterruptibleService&lt;T&gt;(T instance) where T : Form, new()
		{
			if (instance != null &amp;&amp; !instance.IsDisposed)
			{
				return instance; //  &lt;== 如果definitionMapping设置了Sides对象，直接返回
			}
			if (ruleTemplate == null)
			{
				ruleTemplate = new Hashtable();
			}
			else if (ruleTemplate.ContainsKey(typeof(T)))
			{
                throw new InvalidOperationException(Microsoft.VisualBasic.CompilerServices.Utils.GetResourceString(&quot;WinForms_RecursiveFormCreate&quot;));
            }
			ruleTemplate.Add(typeof(T), null);
			TargetInvocationException ex = default(TargetInvocationException);
			try
			{
				return new T(); //  &lt;== 创建Sides对象
			}
			catch (TargetInvocationException ex2) when (((Func&lt;bool&gt;)delegate
			{
				// Could not convert BlockContainer to single expression
				ex = ex2;
				return ((Func&lt;bool&gt;)delegate
				{
					ProjectData.SetProjectError(ex);
					return ex.InnerException != null;
				})();
			}).Invoke())
			{
				throw new InvalidOperationException(Microsoft.VisualBasic.CompilerServices.Utils.GetResourceString(&quot;WinForms_SeeInnerException&quot;, ex.InnerException.Message), ex.InnerException);
			}
			finally
			{
				ruleTemplate.Remove(typeof(T));
			}
		}

		[DebuggerHidden]
		private void CustomizeInterruptibleService&lt;T&gt;(ref T gparam_0) where T : Form
		{
			gparam_0.Dispose();
			gparam_0 = null;
		}

	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编辑阵营对话框" tabindex="-1"><a class="header-anchor" href="#编辑阵营对话框" aria-hidden="true">#</a> 🐟 编辑阵营对话框</h3><p><code>Sides</code>类调用了<code>InvokeInterruptibleAdapter()</code>方法，这个方法里就是对话框的页面，里面有<code>Button1添加</code>、<code>Button2删除</code>等按钮。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    public Sides()
    {
       base.FormClosing += SetupInterruptibleAdapter;
       base.Load += ExcludeInterruptibleAdapter;
       base.KeyDown += FillInterruptibleAdapter;
       InvokeInterruptibleAdapter();                  // &lt;== 调用 InvokeInterruptibleAdapter()生成对话框
    }

    [DebuggerStepThrough]
    private void InvokeInterruptibleAdapter()
    {
       LB_Sides = new DarkListView();
       Button1 = new DarkUIButton();
       Button2 = new DarkUIButton();
       // 省略
       ((ISupportInitialize)TrackBar_Proficiency).BeginInit();
       DarkToolStrip1.SuspendLayout();
       SuspendLayout();
       LB_Sides.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left;
       LB_Sides.Location = new Point(1, 9);
       LB_Sides.Name = &quot;LB_Sides&quot;;                               // &lt;== 阵营列表组件
       LB_Sides.RelatedInfos = null;
       LB_Sides.Size = new Size(213, 435);
       LB_Sides.TabIndex = 0;
       Button1.BackColor = Color.Transparent;
       Button1.DialogResult = DialogResult.None;
       Button1.Font = new Font(&quot;Segoe UI&quot;, 10f);
       Button1.ForeColor = SystemColors.Control;
       Button1.Location = new Point(220, 9);
       Button1.Name = &quot;Button1&quot;;
       Button1.RoundRadius = 0;
       Button1.Size = new Size(134, 23);
       Button1.TabIndex = 1;
       Button1.Text = &quot;添加&quot;;                                     // &lt;== 添加按钮
       Button2.BackColor = Color.Transparent;
       Button2.DialogResult = DialogResult.None;
       Button2.Font = new Font(&quot;Segoe UI&quot;, 10f);
       Button2.ForeColor = SystemColors.Control;
       Button2.Location = new Point(220, 38);
       Button2.Name = &quot;Button2&quot;;
       Button2.RoundRadius = 0;
       Button2.Size = new Size(133, 23);
       Button2.TabIndex = 2;
       Button2.Text = &quot;删除&quot;;                                     // &lt;== 删除按钮
       // 省略
       base.Controls.Add(Button2);
       base.Controls.Add(Button1);
       base.Controls.Add(LB_Sides);
       base.Controls.Add(DarkToolStrip1);
       base.FormBorderStyle = FormBorderStyle.FixedToolWindow;
       base.KeyPreview = true;
       base.MaximizeBox = false;
       base.MinimizeBox = false;
       base.Name = &quot;Sides&quot;;
       base.ShowIcon = false;
       base.StartPosition = FormStartPosition.CenterScreen;
       Text = &quot;编辑阵营&quot;;
       ((ISupportInitialize)TrackBar_Proficiency).EndInit();
       DarkToolStrip1.ResumeLayout(performLayout: false);
       DarkToolStrip1.PerformLayout();
       ResumeLayout(performLayout: false);
       PerformLayout();
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取阵营列表" tabindex="-1"><a class="header-anchor" href="#获取阵营列表" aria-hidden="true">#</a> 🐟 获取阵营列表</h3><p>我们首先看看阵营列表数据是怎么来的，根据推断<code>LB_Sides</code>应该是阵营列表（因为添加的其他控件都是有名字的按钮，只有<code>LB_Sides</code>是<code>DarkListView列表</code>，而且代码是从左到右，从上到下生成的页面，只有<code>LB_Sides</code>最符合）。下面是<code>DarkListView</code>类的主要代码，<code>DarkListView</code>的构造方法里给<code>Items</code>赋值为空的<code>DarkListItem</code>列表项。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class DarkListView : DarkScrollView
{

    private ObservableCollection&lt;DarkListItem&gt; readerExpression;

    public ObservableCollection&lt;DarkListItem&gt; Items
    {
       get
       {
          return readerExpression;
       }
       set
       {
          if (readerExpression != null)
          {
             readerExpression.CollectionChanged -= CheckRegistry;
          }
          readerExpression = value;
          readerExpression.CollectionChanged += CheckRegistry;
          FindRegistry();
       }
    }

    public DarkListView()
    {
       Items = new ObservableCollection&lt;DarkListItem&gt;();
       _PropertyExpression = new List&lt;int&gt;();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此我们要查看这个列表是怎么获取到的只需在<code>Side</code>类里搜索<code>LB_Sides.Items</code>看在哪被赋值的就行了。经过搜索可以看到具体的逻辑是<code>Sides</code>的构造方法里设置在组件加载时调用<code>ExcludeInterruptibleAdapter</code>方法，<code>ExcludeInterruptibleAdapter</code>方法了会调用<span id="Sides.RefreshForm"><code>RefreshForm()</code></span>方法，<code>RefreshForm()</code>方法里搜选清空阵营列表数据。调用<code>Client.CurrentScenario.Sides_ReadOnly.OrderBy((Side theS) =&gt; theS.Name)</code>获取当前想定的阵营列表并按名称排序，并依次调用<code>LB_Sides.Items.Add(new DarkListItem(item.Name));</code>添加到阵营列表里。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    public Sides()
    {
       base.FormClosing += SetupInterruptibleAdapter;
       base.Load += ExcludeInterruptibleAdapter;      // &lt;== 加载时调用ExcludeInterruptibleAdapter
       base.KeyDown += FillInterruptibleAdapter;
       InvokeInterruptibleAdapter();                  // &lt;== 调用 InvokeInterruptibleAdapter()生成对话框
    }

    private void ExcludeInterruptibleAdapter(object sender, EventArgs e)
    {
       if (Client._StateClass == 1f)
       {
          base.AutoScaleMode = AutoScaleMode.None;
       }
       RefreshForm();                             // &lt;== ExcludeInterruptibleAdapter方法调用RefreshForm()方法
    }
    
    public void RefreshForm()
    {
       LB_Sides.Items.Clear(); // RefreshForm()方法首先清空 LB_Sides.Items 列表数据
       foreach (Side item in Client.CurrentScenario.Sides_ReadOnly.OrderBy((Side theS) =&gt; theS.Name))
       {  // 将 Client.CurrentScenario.Sides_ReadOnly按名称排序添加到 LB_Sides.Items 列表里
          LB_Sides.Items.Add(new DarkListItem(item.Name));
       }
       Button2.Enabled = (LB_Sides.Items.Count &gt; 0) &amp; (LB_Sides.SelectedIndices.Count &gt; 0); // 删除按钮
       Button3.Enabled = (LB_Sides.Items.Count &gt; 0) &amp; (LB_Sides.SelectedIndices.Count &gt; 0);
       Label_Proficiency.Visible = (LB_Sides.Items.Count &gt; 0) &amp; (LB_Sides.SelectedIndices.Count &gt; 0);
       TrackBar_Proficiency.Visible = (LB_Sides.Items.Count &gt; 0) &amp; (LB_Sides.SelectedIndices.Count &gt; 0);
       RefreshSideColorControls();
       if (ItemExporter.ConnectInterruptibleTemplate.AddUnit.Visible)
       {
          ItemExporter.ConnectInterruptibleTemplate.AddUnit.RefreshSides();
       }
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Client.CurrentScenario.Sides_ReadOnly</code>返回的就是想定类的<code>_Sides</code>字段</p><blockquote><p>🙈 <code>Client.CurrentScenario.Sides_ReadOnly</code>的数据是怎么来的呢❔</p><p>🙉 初始化是通过加载想定文件设置的，这个以后会讲；添加阵营后会继续添加，我们接下来会讲。</p></blockquote><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Scenario
{

    private Side[] _Sides; // 阵营列表
    
    public Side[] Sides_ReadOnly =&gt; _Sides; // Sides_ReadOnly 返回的就是阵营列表

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加阵营-1" tabindex="-1"><a class="header-anchor" href="#添加阵营-1" aria-hidden="true">#</a> 🐟添加阵营</h3><p>添加阵营按钮绑定<code>IncludeInterruptibleAdapter</code>方法，该方法会调用<code>ItemExporter.ConnectInterruptibleTemplate.AddSide.Show()</code></p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Sides : DarkSecondaryFormBase, GInterface9
{
	
	[CompilerGenerated]
	[AccessedThroughProperty(&quot;Button1&quot;)]
	private DarkUIButton methodSingleton;

	internal DarkUIButton Button1
	{
		[CompilerGenerated]
		get
		{
			return methodSingleton;
		}
		[MethodImpl(MethodImplOptions.Synchronized)]
		[CompilerGenerated]
		set
		{
			EventHandler value2 = IncludeInterruptibleAdapter;   // &lt;== 添加阵营按钮事件绑定 IncludeInterruptibleAdapter方法
			DarkUIButton darkUIButton = methodSingleton;
			if (darkUIButton != null)
			{
				darkUIButton.Click -= value2;
			}
			methodSingleton = value;
			darkUIButton = methodSingleton;
			if (darkUIButton != null)
			{
				darkUIButton.Click += value2;
			}
		}
	}
	
	private void InvokeInterruptibleAdapter()
	{
		LB_Sides = new DarkListView();
		Button1 = new DarkUIButton();
		// 省略
		Button1.BackColor = Color.Transparent;
		Button1.DialogResult = DialogResult.None;
		Button1.Font = new Font(&quot;Segoe UI&quot;, 10f);
		Button1.ForeColor = SystemColors.Control;
		Button1.Location = new Point(220, 9);
		Button1.Name = &quot;Button1&quot;;
		Button1.RoundRadius = 0;
		Button1.Size = new Size(134, 23);
		Button1.TabIndex = 1;
		Button1.Text = &quot;添加&quot;;                                  // &lt;== 添加按钮名为 Button1
		// 省略
		base.Controls.Add(Button1);
		// 省略
	}

	private void IncludeInterruptibleAdapter(object sender, EventArgs e)
	{
		ItemExporter.ConnectInterruptibleTemplate.AddSide.Show();  // &lt;== 调用AddSide.Show()
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>AddSide</code>的get方法也是调用<code>CountInterruptibleService</code>方法返回一个<code>AddSide</code>对象</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal sealed class ItemExporter
{
	
	internal sealed class WatcherListenerMapping
	{

		[EditorBrowsable(EditorBrowsableState.Never)]
		public AddSide _ValTemplate;

		public AddSide AddSide
		{
			get
			{   // 懒加载创建AddSide对象
				_ValTemplate = CountInterruptibleService(_ValTemplate);
				return _ValTemplate;
			}
			set
			{
				if (value != _ValTemplate)
				{
					if (value != null)
					{
						throw new ArgumentException(&quot;Property can only be set to Nothing&quot;);
					}

					CustomizeInterruptibleService(ref _ValTemplate);
				}
			}
		}

	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>AddSide</code>类比较简单，构造方法调用<code>DestroyTests()</code>方法，该方法只有<code>Label1名称文本</code>组件、<code>TextBox1输入框</code>组件、<code>Button1确定</code>按钮、<code>Button2取消</code>按钮。<code>Button1确定</code>按钮的点击事件绑定 <code>ComputeTests</code> 方法，该方法调用 <code>Client.AddSide(string_, ref scenario_)</code> 添加阵营</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class AddSide : DarkSecondaryFormBase
{

    internal DarkUIButton Button1
    {
       [CompilerGenerated]
       get
       {
          return m_SystemProperty;
       }
       [MethodImpl(MethodImplOptions.Synchronized)]
       [CompilerGenerated]
       set
       {
          EventHandler value2 = ComputeTests;             // &lt;== 确定按钮点击事件绑定 ComputeTests 方法
          EventHandler value3 = PatchTests;
          DarkUIButton systemProperty = m_SystemProperty;
          if (systemProperty != null)
          {
             systemProperty.Click -= value2;
             systemProperty.DoubleClick -= value3;
          }
          m_SystemProperty = value;
          systemProperty = m_SystemProperty;
          if (systemProperty != null)
          {
             systemProperty.Click += value2;
             systemProperty.DoubleClick += value3;
          }
       }
    }


    public AddSide()
    {
       base.FormClosing += CallTests;
       base.Load += LogoutTests;
       base.KeyDown += ValidateTests;
       DestroyTests();                              // &lt;== 构造方法调用 DestroyTests() 方法
    }

    [DebuggerStepThrough]
    private void DestroyTests()
    {
       Label1 = new DarkLabel();
       TextBox1 = new DarkUITextBox();
       Button1 = new DarkUIButton();
       Button2 = new DarkUIButton();
       SuspendLayout();
       Label1.ForeColor = Color.FromArgb(220, 220, 220);
       Label1.Location = new Point(13, 13);
       Label1.Name = &quot;Label1&quot;;
       Label1.Size = new Size(54, 17);
       Label1.TabIndex = 0;
       Label1.Text = &quot;名称:&quot;;
       TextBox1.AutoCompleteCustomSource = null;
       TextBox1.AutoCompleteMode = AutoCompleteMode.None;
       TextBox1.AutoCompleteSource = AutoCompleteSource.None;
       TextBox1.BackColor = Color.Transparent;
       TextBox1.ForeColor = Color.FromArgb(189, 189, 189);
       TextBox1.Image = null;
       TextBox1.Lines = null;
       TextBox1.Location = new Point(57, 10);
       TextBox1.MaxLength = 32767;
       TextBox1.Multiline = false;
       TextBox1.Name = &quot;TextBox1&quot;;
       TextBox1.ReadOnly = false;
       TextBox1.ScrollBars = ScrollBars.None;
       TextBox1.SelectionStart = 0;
       TextBox1.Size = new Size(212, 20);
       TextBox1.TabIndex = 0;
       TextBox1.TextAlign = HorizontalAlignment.Left;
       TextBox1.UseSystemPasswordChar = false;
       TextBox1.WatermarkText = &quot;&quot;;
       Button1.BackColor = Color.Transparent;
       Button1.DialogResult = DialogResult.None;
       Button1.ForeColor = SystemColors.Control;
       Button1.Location = new Point(57, 36);
       Button1.Name = &quot;Button1&quot;;
       Button1.RoundRadius = 0;
       Button1.Size = new Size(75, 23);
       Button1.TabIndex = 2;
       Button1.Text = &quot;确定&quot;;                             // &lt;== 确定按钮
       Button2.BackColor = Color.Transparent;
       Button2.DialogResult = DialogResult.Cancel;
       Button2.ForeColor = SystemColors.Control;
       Button2.Location = new Point(194, 36);
       Button2.Name = &quot;Button2&quot;;
       Button2.RoundRadius = 0;
       Button2.Size = new Size(75, 23);
       Button2.TabIndex = 3;
       Button2.Text = &quot;取消&quot;;
       base.AcceptButton = Button1;
       base.AutoScaleMode = AutoScaleMode.None;
       base.CancelButton = Button2;
       base.ClientSize = new Size(281, 68);
       base.ControlBox = false;
       base.Controls.Add(Button2);
       base.Controls.Add(Button1);
       base.Controls.Add(TextBox1);
       base.Controls.Add(Label1);
       base.FormBorderStyle = FormBorderStyle.FixedToolWindow;
       base.KeyPreview = true;
       base.MaximizeBox = false;
       base.MinimizeBox = false;
       base.Name = &quot;AddSide&quot;;
       base.ShowIcon = false;
       base.StartPosition = FormStartPosition.CenterScreen;
       Text = &quot;创建一个新阵营&quot;;
       ResumeLayout(performLayout: false);
    }

    private void ComputeTests(object sender, EventArgs e)
    {
       string string_ = TextBox1.Text;
       Scenario scenario_ = Client.CurrentScenario;   // &lt;== Client.CurrentScenario 获取当前想定
       Client.AddSide(string_, ref scenario_);        // &lt;== 调用 Client.AddSide(string_, ref scenario_)添加阵营
       Close();
    }

    private void PatchTests(object sender, EventArgs e)
    {
       string string_ = TextBox1.Text;
       Scenario scenario_ = Client.CurrentScenario;
       Client.AddSide(string_, ref scenario_);
       Close();
    }

    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Client.AddSide</code>方法调用<code>composerRequest.AddSide(side)</code>方法添加阵营。如果只有一个阵营，就设置当前阵营为这个阵营。如果阵营可见就更新阵营界面列表，其会调用<code>Sides.RefreshForm()</code>，这个方法我们<a href="#Sides.RefreshForm">添加阵营列表</a>里讲过，其作用就是更新编辑阵营对话框左边的阵营列表和右侧的按钮状态。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Client
{
    
    [AccessedThroughProperty(&quot;_CurrentScenario&quot;)]
    [CompilerGenerated]
    private static Scenario composerRequest;
    
    // Client.CurrentScenario 获取当前想定就是 返回的就是composerRequest
	public static Scenario CurrentScenario //=&gt; composerRequest;
	{
		get
		{   // 如果composerRequest有值就直接返回，没有就创建想定对象并返回
			if (composerRequest != null) return composerRequest;
			var newscen = new Scenario();
			composerRequest = newscen;

            return newscen;
		}
	}

    public static void AddSide(string string_0, ref Scenario scenario_0)
    {
       Side side = new Side(string_0, ref scenario_0); // 创建阵营对象
       composerRequest.AddSide(side); // 调用想定的AddSide方法
       if (composerRequest.Sides_ReadOnly.Length == 1)
       {
          CurrentSide = side; // 如果只有一个阵营，就设置当前阵营为这个阵营
       }
       if (ItemExporter.ConnectInterruptibleTemplate.Sides.Visible) // 如果阵营可见就更新阵营界面列表
       {
          ItemExporter.ConnectInterruptibleTemplate.Sides.RefreshForm(); // 调用Sides的RefreshForm()方法
       }
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们看<code>composerRequest.AddSide(side)</code>方法，这个方法调用<code>ArrayExtensions.Add(ref _Sides, side_0)</code>方法，并调用订阅<code>SidesChanged</code>事件的方法。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Scenario
{

	public delegate void SidesChangedEventHandler(Scenario theScen, SideAdditionOrRemoval AddOrRemove); // SidesChangedEventHandler规定了订阅SidesChanged事件的方法必须接收两个参数(分别为Scenario当前想定 和 SideAdditionOrRemoval 是添加阵营还是删除阵营)并且没有返回值
    
    private Side[] _Sides; // 阵营列表
    
    public Side[] Sides_ReadOnly =&gt; _Sides; // Sides_ReadOnly 返回的就是阵营列表（获取阵营列表里调用的Client.CurrentScenario.Sides_ReadOnly就是返回的该字段）
	
	public static event SidesChangedEventHandler SidesChanged; // SidesChanged事件类型为SidesChangedEventHandler
	

	public void AddSide(Side side_0)
	{
		if (!_Sides.Contains(side_0))
		{
			ArrayExtensions.Add(ref _Sides, side_0); // 调用工具类，将side_0添加到_Sides列表中
			Scenario.SidesChanged?.Invoke(this, SideAdditionOrRemoval.Addition); // 执行订阅SidesChanged事件的方法
		}
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>ArrayExtensions</code>是一个工具类，<code>Add</code>方法是将第二个参数的对象添加到第一个参数的集合里面</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class ArrayExtensions
{
    public static void Add&lt;T&gt;(ref T[] gparam_0, T theAC)
    {   // 创建一个比原集合大1个空间的集合，并拷贝该集合到新的集合
        gparam_0 = (T[])Microsoft.VisualBasic.CompilerServices.Utils.CopyArray(gparam_0, new T[gparam_0.Length + 1]);
        gparam_0[gparam_0.Length - 1] = theAC; // 将第二个参数对象的值 设置到刚创建的集合的最后一位里
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们看<code>Scenario.SidesChanged</code>的订阅者做了什么事情。全局搜索<code>Scenario.SidesChanged</code>发现<code>Client</code>类的<code>Initialize</code>方法订阅了该事件。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250806174030074.png" alt="image-20250806174030074" tabindex="0" loading="lazy"><figcaption>image-20250806174030074</figcaption></figure><p><code>Client</code>类的<code>SelectConfiguration</code>方法主要逻辑是删除当前阵营时重新设置一个新的阵营为当前阵营。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Client
{
	
	[AccessedThroughProperty(&quot;_CurrentScenario&quot;)]
	[CompilerGenerated]
	private static Scenario composerRequest;
	
	[CompilerGenerated]
	[AccessedThroughProperty(&quot;_CurrentSide&quot;)]
	private static Side m_ModelRequest;
	
	public static Side CurrentSide
	{
		get
		{
			return m_ModelRequest;
		}
		set
		{
			// 省略
		}
	}
    
    public static void Initialize()
	{
		try
		{
			Dispatcher = Dispatcher.CurrentDispatcher;
			PlatformComponent.StatusChanged += CallConfiguration;
			ActiveUnit_Damage.DamageSustained += LogoutConfiguration;
			Scenario.CurrentSideChanged += PatchConfiguration;
			Scenario.SidesChanged += SelectConfiguration;           // &lt;== 订阅了 Scenario.SidesChanged 事件
			Scenario.ScenCompleted += AddConfiguration;
			Scenario.CurrentScenarioChanged += CountConfiguration;
		}
		catch (Exception ex2)
		{
			// 省略
			throw;
		}
	}

	private static void SelectConfiguration(object object_0, Scenario.SideAdditionOrRemoval sideAdditionOrRemoval_0)
	{   // 如果触发该事件的是删除操作，并且 阵营列表里没有当前阵营（删除的是当前阵营）就重新设置当前阵营
		if (sideAdditionOrRemoval_0 == Scenario.SideAdditionOrRemoval.Removal &amp;&amp; !composerRequest.Sides_ReadOnly.Contains(m_ModelRequest)) // m_ModelRequest就是Client.CurrentSide即当前阵营
		{
			if (composerRequest.Sides_ReadOnly.Length == 0)
			{
				composerRequest.SetCurrentSide(null);     //  如果没有阵营了就将当前阵营置空
			}
			else
			{
				composerRequest.SetCurrentSide(composerRequest.Sides_ReadOnly[0]); // 如果还有阵营，就设置当前阵营为第一个阵营
			}
		}
		if (composerRequest.Sides_ReadOnly.Length == 1)
		{   // 如果阵营列表里只有一个，则设置这个阵营为当前阵营
			composerRequest.SetCurrentSide(composerRequest.Sides_ReadOnly[0]);
		}
	}

	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那<code>Client</code>类的<code>Initialize</code>方法又是怎么被执行的呢？</p><p>我们在<code>Client</code>类的<code>Initialize</code>方法里打上断点，就可以发现如下调用栈。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809161822500.png" alt="image-20250809161822500" tabindex="0" loading="lazy"><figcaption>image-20250809161822500</figcaption></figure><p>我们打开第一个调用栈，发现<code>MainSplash</code>类的<code>VerifyInterruptibleConfig</code>方法调用了<code>Client</code>类的<code>Initialize</code>方法。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809161916170.png" alt="image-20250809161916170" tabindex="0" loading="lazy"><figcaption>image-20250809161916170</figcaption></figure><p>经过查找发现<code>MainSplash</code>的构造方法里订阅了<code>Show</code>事件执行<code>VerifyInterruptibleConfig</code>方法。我们在<code>base.Shown += VerifyInterruptibleConfig;</code>这行打上断点，重新运行项目，看看<code>MainSplash</code>对象是在哪被创建的。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809162040978.png" alt="image-20250809162040978" tabindex="0" loading="lazy"><figcaption>image-20250809162040978</figcaption></figure><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class MainSplash : Form
{
    public MainSplash()
    {
       base.Shown += VerifyInterruptibleConfig;
       CancelInterruptibleConfig();
    }

    private void VerifyInterruptibleConfig(object sender, EventArgs e)
    {
       base.Visible = false;
       // 省略
       try
       {
          GameGeneral.WriteLogDebugInfoToFile(&quot;Client.Initalize&quot;);
          Client.Initialize();
       }
       catch (Exception projectError3)
       {
          ProjectData.SetProjectError(projectError3);
          GameGeneral.WriteLogDebugInfoToFile(&quot;Client.Initalize FAILED&quot;);
          ProjectData.ClearProjectError();
       }
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建<code>MainSplash</code>有三个调用栈帧。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809162518954.png" alt="image-20250809162518954" tabindex="0" loading="lazy"><figcaption>image-20250809162518954</figcaption></figure><p>第一个栈帧的<code>RateInterruptibleMap</code>方法我们在<a href="#AdapterCallbackCandidate.RateInterruptibleMap"><code>入口代码</code></a>里讲过。具体逻辑是程序的入口<code>Main</code>方法执行<code>Run</code>方法触发<code>Startup</code>事件，该类订阅了<code>Startup</code>事件执行了<code>RateInterruptibleMap</code>方法。<code>RateInterruptibleMap</code>方法调用<code>ItemExporter.ConnectInterruptibleTemplate.MainSplash.Show()</code>显示<code>MainSplash</code>窗体。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal class AdapterCallbackCandidate : WindowsFormsApplicationBase
{
    internal static void Main(string[] args)   // Main函数
    {
       Application.SetCompatibleTextRenderingDefault(defaultValue: false);
       ItemExporter.RevertInterruptibleMap.Run(args);  // 执行run方法，触发Startup事件
    }
    
    private void RateInterruptibleMap(object sender, StartupEventArgs e)
    {
       // 省略
       try
       {
          // 省略
          Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher; // 入口代码里讲的代码
          ItemExporter.RevertInterruptibleMap.DoEvents();
          StartGameMenuWindow.ShowStartWindow();
          ItemExporter.RevertInterruptibleMap.DoEvents();
       }
       try
       {
          // 省略
          try
          {
             ItemExporter.ConnectInterruptibleTemplate.MainSplash.Show(); // RateInterruptibleMap方法执行显示MainSplash窗体
          }
          
       }
       
    }

    
    public AdapterCallbackCandidate()
       : base(AuthenticationMode.Windows)
    {
       base.NetworkAvailabilityChanged += ResetInterruptibleMap;
       base.Shutdown += MapInterruptibleMap;
       base.Startup += RateInterruptibleMap; // 订阅Startup事件执行RateInterruptibleMap方法
       base.IsSingleInstance = false;
       base.EnableVisualStyles = true;
       base.SaveMySettingsOnExit = true;
       base.ShutdownStyle = ShutdownMode.AfterMainFormCloses;
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809163201690.png" alt="image-20250809163201690" tabindex="0" loading="lazy"><figcaption>image-20250809163201690</figcaption></figure><p>第一帧的<code>ItemExporter.ConnectInterruptibleTemplate.MainSplash.Show()</code>调用了<code>ItemExporter.ConnectInterruptibleTemplate.MainSplash</code>就进入了第二帧，懒加载<code>MainSplash</code>创建<code>MainSplash</code>对象。这个<code>CountInterruptibleService</code>方法讲过，其作用就是懒加载创建对象。</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>internal sealed class ItemExporter
{

	internal sealed class WatcherListenerMapping
	{

		public MainSplash _InterceptorTemplate;
		
		public MainSplash MainSplash
		{
			get
			{
				_InterceptorTemplate = CountInterruptibleService(_InterceptorTemplate); // 懒加载创建MainSplash对象
				return _InterceptorTemplate;
			}
			set
			{
				if (value != _InterceptorTemplate)
				{
					if (value != null)
					{
						throw new ArgumentException(&quot;Property can only be set to Nothing&quot;);
					}

					CustomizeInterruptibleService(ref _InterceptorTemplate);
				}
			}
		}

		private static T CountInterruptibleService&lt;T&gt;(T instance) where T : Form, new()
		{
			if (instance != null &amp;&amp; !instance.IsDisposed)
			{
				return instance; // 如果有对象实例直接返回
			}
			// 省略
			try
			{
				return new T(); // 如果没有对象实例则创建实例并返回
			}
			// 省略
		}1
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20250809164318230.png" alt="image-20250809164318230" tabindex="0" loading="lazy"><figcaption>image-20250809164318230</figcaption></figure><h3 id="删除阵营" tabindex="-1"><a class="header-anchor" href="#删除阵营" aria-hidden="true">#</a> 🐟删除阵营</h3><p>添加阵营后，<code>删除</code>按钮是置灰状态的。</p><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/@source/cmo/image/image-20250809173628706.png" alt="image-20250809173628706" style="zoom:50%;"><p>当我们选中一方后<code>删除</code>按钮才能正常点击。</p><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/@source/cmo/image/image-20250809173717359.png" alt="image-20250809173717359" style="zoom:50%;"><p>点击<code>删除</code>按钮会出现确认框</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20251016102925282.png" alt="image-20251016102925282" tabindex="0" loading="lazy"><figcaption>image-20251016102925282</figcaption></figure><p>点击<code>Ok</code>后就删除了<code>蓝方</code>阵营，此时<code>删除</code>、<code>对抗关系</code>重新置灰。</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cmo/image/image-20251016102955478.png" alt="image-20251016102955478" tabindex="0" loading="lazy"><figcaption>image-20251016102955478</figcaption></figure><p>首先我们看看选中后，<code>删除</code>按钮可以点击是怎么做的。</p><p>选中某个阵营后<code>LB_Sides</code>（阵营列表）会触发<code>SelectedIndicesChanged</code>事件（根据名称推算而来，判断是不是这个事件也很简单，直接在<code>EnableInterruptibleAdapter</code>方法的开头打断点，看能不能进去就行了），然后执行<code>EnableInterruptibleAdapter</code>方法，这个方法用于更新<code>删除</code>、<code>对抗关系</code>、<code>能力</code>等数据。</p><blockquote><p><code>SelectedIndexChanged</code> 事件：在 <code>SelectedIndex</code> 属性更改后发生（即列表里选中的索引发生变化）。</p></blockquote><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    [AccessedThroughProperty(&quot;LB_Sides&quot;)]
    private DarkListView rulesSingleton;
    
    internal DarkListView LB_Sides
    {
       [CompilerGenerated]
       get
       {
          return rulesSingleton;
       }
       [MethodImpl(MethodImplOptions.Synchronized)]
       [CompilerGenerated]
       set
       {
          MouseEventHandler value2 = SearchInterruptibleAdapter; // 双击触发的事件
          EventHandler value3 = EnableInterruptibleAdapter; // 选中的索引改变触发的事件
          DarkListView darkListView = rulesSingleton;
          if (darkListView != null)
          {
             darkListView.MouseDoubleClick -= value2;
             darkListView.SelectedIndicesChanged -= value3;
          }
          rulesSingleton = value;
          darkListView = rulesSingleton;
          if (darkListView != null)
          {
             darkListView.MouseDoubleClick += value2;
             darkListView.SelectedIndicesChanged += value3;
          }
       }
    }

    public Sides()
    {
       base.FormClosing += SetupInterruptibleAdapter;
       base.Load += ExcludeInterruptibleAdapter;
       base.KeyDown += FillInterruptibleAdapter;
       InvokeInterruptibleAdapter();
    }
    
    private void InvokeInterruptibleAdapter()
    {
       LB_Sides = new DarkListView(); // 阵营列表
       // 省略
       LB_Sides.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left;
       LB_Sides.Location = new Point(1, 9);
       LB_Sides.Name = &quot;LB_Sides&quot;;
       LB_Sides.RelatedInfos = null;
       LB_Sides.Size = new Size(213, 435);
       LB_Sides.TabIndex = 0;
    }

    private void EnableInterruptibleAdapter(object sender, EventArgs e)
    {
       if (LB_Sides.SelectedIndices.Count == 0) // LB_Sides.SelectedIndices下面会讲
       { // 选中的阵营索引数量为0证明没有选中阵营了
          return;
       }
       Side[] sides_ReadOnly = Client.CurrentScenario.Sides_ReadOnly;
       foreach (Side side in sides_ReadOnly)
       {  // 比较阵营列表里的阵营名称 哪个 与 LB_Sides.SelectedItems[0].Text 的值相等（LB_Sides.SelectedItems下面会讲）
          if (Operators.CompareString(side.Name, LB_Sides.SelectedItems[0].Text, TextCompare: true) == 0)
          {
             factorySingleton = side; // 如果相等则退出循环，并将值设置到factorySingleton里面（点击删除按钮的时候会用到）
             break;
          }
       }
       Button2.Enabled = LB_Sides.Items.Count &gt; 0; // 如果还有阵营就设置删除按钮可用（调用EnableInterruptibleAdapter方法则要么选中的阵营变为了别的阵营，要么没有选中的阵营了。）
       Button3.Enabled = LB_Sides.Items.Count &gt; 0; // 对抗关系
       CB_AIOnly.Enabled = LB_Sides.Items.Count &gt; 0; // 阵营是AI控制的
       CB_CollRespons.Enabled = LB_Sides.Items.Count &gt; 0; // 集体责任
       CB_AIOnly.Checked = factorySingleton.IsAIOnly;
       CB_CollRespons.Checked = factorySingleton.AssignsCollectiveResponsibility;
       CB_AutoTrackCivs.Checked = factorySingleton.CanAutoTrackCivs; // 可自动探测民用目标
       switch (factorySingleton.AwarenessLevel)
       {
       case Side.AwarenessLevel_Enum.Blind:
          CB_Awareness.SelectedIndex = 0;
          break;
       case Side.AwarenessLevel_Enum.Normal:
          CB_Awareness.SelectedIndex = 1;
          break;
       case Side.AwarenessLevel_Enum.AutoSideID:
          CB_Awareness.SelectedIndex = 2;
          break;
       case Side.AwarenessLevel_Enum.AutoSideAndUnitID:
          CB_Awareness.SelectedIndex = 3;
          break;
       case Side.AwarenessLevel_Enum.Omniscient:
          CB_Awareness.SelectedIndex = 4;
          break;
       }
       Label_Proficiency.Visible = true;
       TrackBar_Proficiency.Visible = true;
       Label_Proficiency.Text = &quot;能力：&quot; + Misc.TestRequest(factorySingleton.Proficiency); // 能力
       TrackBar_Proficiency.Value = (int)factorySingleton.Proficiency;
       RefreshSideColorControls();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除按钮点击后会调用<code>ChangeInterruptibleAdapter</code>方法。首先弹出确认删除的对话框，用户点击Ok后遍历阵营单位将其收集到collection中，然后遍历collection列表，调用当前想定的<code>DeleteUnitImmediately</code>方法，传入对当前阵营的单位，以立即删除当前想定的该单位。然后再找出属于该阵营的所有非制导武器并将其从非制导武器集合中删除。然后将属于该阵营的所有非制导武器从武器齐射列表中删除。最后从阵营列表中删除当前阵营并调用<code>RefreshForm</code>方法，这个方法我们<a href="#Sides.RefreshForm">添加阵营列表</a>里讲过，其作用就是更新编辑阵营对话框左边的阵营列表和右侧的按钮状态。（简单来说就是删除属于当前阵营的单元、非制导武器、武器齐射，然后删除当前阵营，最后刷新页面）</p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    [AccessedThroughProperty(&quot;LB_Sides&quot;)]
    private DarkListView rulesSingleton;
    
    [CompilerGenerated]
    [AccessedThroughProperty(&quot;Button2&quot;)]
    private DarkUIButton m_ServiceSingleton;

    internal DarkUIButton Button2
    {
       [CompilerGenerated]
       get
       {
          return m_ServiceSingleton;
       }
       [MethodImpl(MethodImplOptions.Synchronized)]
       [CompilerGenerated]
       set
       {
          EventHandler value2 = ChangeInterruptibleAdapter;     // &lt;== 删除按钮点击事件调用的方法
          DarkUIButton serviceSingleton = m_ServiceSingleton;
          if (serviceSingleton != null)
          {
             serviceSingleton.Click -= value2;
          }
          m_ServiceSingleton = value;
          serviceSingleton = m_ServiceSingleton;
          if (serviceSingleton != null)
          {
             serviceSingleton.Click += value2;
          }
       }
    }

    
    public Sides()
    {
       base.FormClosing += SetupInterruptibleAdapter;
       base.Load += ExcludeInterruptibleAdapter;
       base.KeyDown += FillInterruptibleAdapter;
       InvokeInterruptibleAdapter();
    }

    [DebuggerStepThrough]
    private void InvokeInterruptibleAdapter()
    {
       LB_Sides = new DarkListView();  // 阵营列表
       Button1 = new DarkUIButton();
       Button2 = new DarkUIButton();   // 删除按钮
       // 省略
       Button2.BackColor = Color.Transparent;
       Button2.DialogResult = DialogResult.None;
       Button2.Font = new Font(&quot;Segoe UI&quot;, 10f);
       Button2.ForeColor = SystemColors.Control;
       Button2.Location = new Point(220, 38);
       Button2.Name = &quot;Button2&quot;;
       Button2.RoundRadius = 0;
       Button2.Size = new Size(133, 23);
       Button2.TabIndex = 2;
       Button2.Text = &quot;删除&quot;;
       // 省略
    }

    private void ChangeInterruptibleAdapter(object sender, EventArgs e)
    {  // 弹出 “确认是否删除” 的对话框，factorySingleton为要删除的阵营（上面设置的，阵营列表里选择当前阵营时会将当前阵营设置到factorySingleton里面）
       if (DarkMessageBox.ShowWarning(&quot;你确定吗？所有单元，任务和该方的任何其他对象将被删除！&quot;, &quot;删除阵营：&quot; + factorySingleton.Name, DarkDialogButton.OkCancel) != DialogResult.OK)
       {
          return;
       }
       Collection&lt;ActiveUnit&gt; collection = new Collection&lt;ActiveUnit&gt;();
       foreach (ActiveUnit unit in factorySingleton.Units)
       {
          collection.Add(unit); // 遍历当前阵营的单位，并将单位添加到collection中
       }
       foreach (ActiveUnit item in collection)
       {  // 遍历当前阵营单位并调用DeleteUnitImmediately方法立即删除单位
          Client.CurrentScenario.DeleteUnitImmediately(item.ObjectID, bool_0: true, &quot;Unit deleted&quot;);
       }
       List&lt;string&gt; list = new List&lt;string&gt;();
       foreach (KeyValuePair&lt;string, UnguidedWeapon&gt; unguidedWeapon in Client.CurrentScenario.UnguidedWeapons) // 遍历当前想定的非制导武器集合
       {
          if (unguidedWeapon.Value.GetUnitSide() == factorySingleton)
          {
             list.Add(unguidedWeapon.Key); // 如果非制导武器的阵营是当前阵营，将其添加到list里
          }
       }
       foreach (string item2 in list)
       {
          string string_ = item2;
          Client.CurrentScenario.UnguidedWeapons.Remove(string_); // 遍历list，将当前阵营的非制导武器从集合中删除（UnguidedWeapons是Key、value类型的集合）
          Side side = factorySingleton;
          Scenario scenario_ = Client.CurrentScenario;
          side.RemoveWeaponFromSalvos(ref scenario_, ref string_); // 从武器齐射（可以理解为万箭齐发，比如：多门火炮同时开火、多枚鱼雷同时发射）列表中删除当前非制导武器
       }
       Client.CurrentScenario.RemoveSide(factorySingleton); // 将当前阵营从阵营列表里删除
       Client.MustRefreshMainForm = true;
       RefreshForm(); // 刷新页面里的阵营列表和按钮状态
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="想定录制" tabindex="-1"><a class="header-anchor" href="#想定录制" aria-hidden="true">#</a> 🍑 想定录制</h2><p>Command/Command/AttackTarget.cs</p>`,184),l=[s];function a(r,v){return i(),n("div",null,l)}const u=e(d,[["render",a],["__file","index.html.vue"]]);export{u as default};
