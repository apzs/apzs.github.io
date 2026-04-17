# CMO研究

## :peach: 添加阵营

创建一个新想定后，首先要做的就是添加阵营，要不然添加单位、创建矩形区域等很多事情都做不了。

### :fish: 界面交互

添加阵营功能在`编辑`菜单下的`添加/编辑阵营`下。

![image-20250806132852671](./image/image-20250806132852671.png)

我们点击后会弹出`编辑阵营`的对话框。

![image-20250806133114051](./image/image-20250806133114051.png)

点击添加后会再次弹出一个对话框让我们输入阵营的名称。

![image-20250806133239420](./image/image-20250806133239420.png)

点击确定后，编辑阵营的对话框就会出现刚刚添加的`红方`，选中该名称后`删除`、`对抗关系`等按钮会亮起

![image-20250806133420820](./image/image-20250806133420820.png)

### :fish: 入口代码

首先我们要找出这个功能的入口位置，我们全局搜索`添加/编辑阵营`，相关代码在`MainForm.cs`的`ResetState`方法里面。

![image-20250806133701843](./image/image-20250806133701843.png)

其代码结构如下所示，`MainForm`的构造方法调用了`ResetState()`方法，`ResetState()`方法创建了`添加/编辑阵营`菜单项：

```c#
public sealed class MainForm : Form
{
	
	[AccessedThroughProperty("Sides_TSMI")]
	[CompilerGenerated]
	private DarkToolStripMenuItem m_MapperAdvisor;
	
	internal DarkToolStripMenuItem Sides_TSMI
	{
		// 省略
	}
	
	public MainForm() // <== 构造方法
	{
		base.Resize += CheckState;
		base.FormClosing += SortState;
		// 省略
		m_WrapperAdvisor = new List<ActiveUnit>();
		m_ObserverAdvisor = false;
		_IssuerAdvisor = new List<System.Drawing.Point>();
		// 省略
		paramConnection = new ThreadLocal<List<System.Drawing.Point>>();
		_PageConnection = new ThreadLocal<Dictionary<float, System.Drawing.Point>>();
		ResetState();  // <== 调用了ResetState()方法
	}

	private void ResetState()
	{
	    // 省略
        Sides_TSMI = new DarkToolStripMenuItem();
		// 省略
		Sides_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		Sides_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		Sides_TSMI.Name = "Sides_TSMI";
		Sides_TSMI.Size = new System.Drawing.Size(267, 22);
		Sides_TSMI.Text = "添加/编辑阵营";                         // <== TSMI_Editor"编辑"菜单项
		SwitchTo_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		SwitchTo_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		SwitchTo_TSMI.Name = "SwitchTo_TSMI";
		SwitchTo_TSMI.Size = new System.Drawing.Size(267, 22);
		SwitchTo_TSMI.Text = "切换到...";
		// 省略
	}

}
```

接下来我们查看`MainForm`是怎么被创建的。

在`MainForm`的构造方法方法开头打上断点。

![image-20250809142043504](./image/image-20250809142043504.png)

然后启动项目，查看调用栈就知道了：

![image-20250809142236524](./image/image-20250809142236524.png)

第一个执行的是`Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;`，其所在的方法为<span id="AdapterCallbackCandidate.RateInterruptibleMap">`RateInterruptibleMap`</span>，我们再看`RateInterruptibleMap`方法是怎么被执行的。

![image-20250809142418032](./image/image-20250809142418032.png)

根据搜索发现该方法绑定的是父类的`Startup`事件。

![image-20250809142634774](./image/image-20250809142634774.png)

按住`ctrl`然后点击`Startup`就跳转到了`WindowsFormsApplicationBase`的`Startup`。

![image-20250809145427569](./image/image-20250809145427569.png)

然后我们搜索`StartupEventHandler`，发现其在`OnStartup`方法里被使用，顺腾摸瓜就发现了其具体的逻辑：

`Run`方法调用了`DoApplicationModel`方法,`DoApplicationModel`方法调用了`OnStartup`方法，`OnStartup`方法里触发了我们的事件。

> **编译器生成的委托字段**：
>
> 当声明事件时：
>
> ```c#
> public event StartupEventHandler Startup;
> ```
>
> 编译器会自动生成一个**私有委托字段** `StartupEvent`（名称可能略有不同，实际为编译器生成的后备字段）
>
> **事件订阅的存储**：
>
> 当外部代码订阅事件：
>
> ```c#
> app.Startup += MyStartupHandler;
> ```
>
> 订阅的方法会被添加到`StartupEvent`委托链中
>
> **触发原理**：
>
> ```c#
> // 获取当前所有订阅者
> StartupEventHandler startupEvent = this.StartupEvent;
> 
> // 安全触发事件（避免null引用）
> if (startupEvent != null) 
>     startupEvent(this, eventArgs);
> ```
>
> 这里直接调用委托字段`StartupEvent`，等效于触发所有订阅了`Startup`事件的方法。

```c#
public class WindowsFormsApplicationBase : ConsoleApplicationBase
{
  // 省略
  public event StartupEventHandler Startup;

  public event StartupNextInstanceEventHandler StartupNextInstance;
    
  public event ShutdownEventHandler Shutdown;

  [SecuritySafeCritical]
  [MethodImpl(MethodImplOptions.NoInlining)]
  public void Run(string[] commandLine)
  {
    this.InternalCommandLine = new ReadOnlyCollection<string>((IList<string>) commandLine);
    if (!this.IsSingleInstance)     // 软件是否是单实例
    {
      this.DoApplicationModel();   // <== 调用 DoApplicationModel 方法
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
          this.DoApplicationModel();  // <== 调用 DoApplicationModel 方法
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
  protected virtual bool OnStartup(StartupEventArgs eventArgs)  // <== OnStartup方法
  {
    eventArgs.Cancel = false;
    if (this.m_TurnOnNetworkListener & this.m_NetworkObject == null)
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

    private void DoApplicationModel()                       // <== DoApplicationModel方法
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
```

那么`WindowsFormsApplicationBase`的`Run`方法是怎么被调用的呢？

根据查找，是`AdapterCallbackCandidate`类的`Main`方法（也就是程序的入口）调用的。

```c#
internal class AdapterCallbackCandidate : WindowsFormsApplicationBase
{
	
	internal static void Main(string[] args)
	{
		Application.SetCompatibleTextRenderingDefault(defaultValue: false);
		ItemExporter.RevertInterruptibleMap.Run(args); // 调用的 `WindowsFormsApplicationBase`(本组件的父组件)的`Run`方法（这里的ItemExporter.RevertInterruptibleMap其实返回的是本类即AdapterCallbackCandidate，和RateInterruptibleMap方法没有任何关系）
	}


	private void RateInterruptibleMap(object sender, StartupEventArgs e)
	{
		// 省略
		try
		{
			// 省略
			Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher; // 断点的第一个调用栈
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
		base.Startup += RateInterruptibleMap;      //  订阅`WindowsFormsApplicationBase`的Startup事件
		base.IsSingleInstance = false;
		base.EnableVisualStyles = true;
		base.SaveMySettingsOnExit = true;
		base.ShutdownStyle = ShutdownMode.AfterMainFormCloses;
	}

}

```

我们看一下`ItemExporter.RevertInterruptibleMap.Run(args);`方法为什么调用的是 `WindowsFormsApplicationBase`的`Run`方法。

调用`ItemExporter.RevertInterruptibleMap`时首先会加载`ItemExporter`类调用其静态代码块，初始化`_CreatorExporter = new CustomerRuleWatcher<AdapterCallbackCandidate>();`。然后执行`ItemExporter.RevertInterruptibleMap`的`get`方法返回`_CreatorExporter.PushInterruptiblePolicy()`。即返回创建的`AdapterCallbackCandidate`类型对象。

调用`ItemExporter.RevertInterruptibleMap.Run(args);`方法也就是调用`AdapterCallbackCandidate`类型对象的`Run`方法，而`AdapterCallbackCandidate`类型的`Run`方法继承至 `WindowsFormsApplicationBase`。

```c#
internal sealed class ItemExporter
{
    
    internal sealed class CustomerRuleWatcher<T> where T : new()
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
    
    private static readonly CustomerRuleWatcher<AdapterCallbackCandidate> _CreatorExporter;
    
    [HelpKeyword("My.Application")]
    internal static AdapterCallbackCandidate RevertInterruptibleMap // <== ItemExporter.RevertInterruptibleMap
    {
       [DebuggerHidden]
       get
       {  // 返回的是 _CreatorExporter.PushInterruptiblePolicy()即_CreatorExporter存的单例对象AdapterCallbackCandidate
          return _CreatorExporter.PushInterruptiblePolicy();
       }
    }

    static ItemExporter()
    {
       setterExporter = new CustomerRuleWatcher<ComparatorExporter>();
       _CreatorExporter = new CustomerRuleWatcher<AdapterCallbackCandidate>(); // _CreatorExporter里存入是AdapterCallbackCandidate的单例对象
       _TemplateExporter = new CustomerRuleWatcher<User>();
       m_MappingExporter = new CustomerRuleWatcher<WatcherListenerMapping>();
       _MockExporter = new CustomerRuleWatcher<MethodCallbackCandidate>();
    }
}
```

因此第一个调用栈的逻辑大概是`AdapterCallbackCandidate`类的`Main`方法调用`ItemExporter.RevertInterruptibleMap.Run(args);`触发了`Startup`事件。`AdapterCallbackCandidate`订阅了`Startup`事件执行`RateInterruptibleMap`方法。`RateInterruptibleMap`方法里执行了`Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;`。

------

接下来我们看第二帧的代码。

第一帧中执行了`Client.MainThreadDispatcher = Dispatcher.CurrentDispatcher;`自然要加载`Client`类，从而执行了该类的静态代码块。代码块里创建了`RecorderForm`对象

```c#
public sealed class Client
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
```

![image-20250809154303061](./image/image-20250809154303061.png)

------

接下来我们看第三帧。第三帧执行`RecorderForm`构造方法，该构造方法调用了`RemoveInterruptibleStatus`方法

![image-20250809155040591](./image/image-20250809155040591.png)

```c#
public sealed class RecorderForm : DarkSecondaryFormBase
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
       Text = "回放查看器";
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
```

------

接下来看第四帧。这一帧调用`base.TopMost = true;`将`RecorderForm`窗口置顶。

![image-20250809155208805](./image/image-20250809155208805.png)

------

接着看第五帧。这一帧调用用了`DarkSecondaryFormBase`类的`LogoutServer`方法。`DarkSecondaryFormBase`类的`LogoutServer`方法为`Activated`事件的处理函数。`Activated`事件在窗口被激活（即当前操作的是该窗口，每次选择该窗口都会触发）时触发。`RecorderForm`的父类是`DarkSecondaryFormBase`，当`RecorderForm`设置`base.TopMost = true;`时窗口被置顶，从而执行了该窗口的`Activated`事件。

> **Load**： 初始化窗体、加载窗体资源（窗体上的各种控件），在窗体句柄创建之后、显示之前，为显示做准备。只触发一次。
> **Shown**：在窗体加载后显示窗体，设置窗体属性`Visible=true`或`form.show()`才会触发。触发一次或者不触发。
> **Activated**：每次窗体获得焦点均会触发（从别的窗体或对话框切回来时）。可触发多次。

```C#
public class DarkSecondaryFormBase : DarkForm
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
```

![image-20250809155433524](./image/image-20250809155433524.png)

------

接着我们看第六帧。上一帧调用`base.Owner = ItemExporter.ConnectInterruptibleTemplate.MainForm;`时执行了`MainForm`的`get`方法。其作用就是懒加载创建`MainForm`对象实例。

```c#
internal sealed class ItemExporter
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
                        throw new ArgumentException("Property can only be set to Nothing");
                    }

                    CustomizeInterruptibleService(ref databaseTemplate);
                }
            }
        }

        private static T CountInterruptibleService<T>(T instance) where T : Form, new()
        {
            if (instance != null && !instance.IsDisposed)
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
                    Microsoft.VisualBasic.CompilerServices.Utils.GetResourceString("WinForms_RecursiveFormCreate"));
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
```

![image-20250809161157882](./image/image-20250809161157882.png)

------

接着看第七帧。此时`MainForm`的构造方法就执行了。

![image-20250809161113010](./image/image-20250809161113010.png)

### :fish: 界面代码

在`MainForm`的构造方法里,首先进行了一系列的初始化工作，最后调用了`ResetState()`。在`ResetState()`方法里，创建了`MenuStrip1主菜单`，在`MenuStrip1主菜单`里添加了`TSMI_Editor编辑`菜单项，在`TSMI_Editor编辑`菜单项里添加了`Sides_TSMI添加/编辑阵营`菜单项，然后将`MenuStrip1主菜单`添加到了控件中。

```c#

public sealed class MainForm : Form
{
	
	[AccessedThroughProperty("Sides_TSMI")]
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
	
	public MainForm() // <== 构造方法
	{
		base.Resize += CheckState;
		base.FormClosing += SortState;
		// 省略
		m_WrapperAdvisor = new List<ActiveUnit>();
		m_ObserverAdvisor = false;
		_IssuerAdvisor = new List<System.Drawing.Point>();
		// 省略
		paramConnection = new ThreadLocal<List<System.Drawing.Point>>();
		_PageConnection = new ThreadLocal<Dictionary<float, System.Drawing.Point>>();
		ResetState();  // <== 调用了ResetState()方法
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
		MenuStrip1.Items.AddRange(new ToolStripItem[13] // <== 将TSMI_Editor"编辑"添加到了主菜单中
		{
			FileToolStripMenuItem, ViewToolStripMenuItem1, ReportsToolStripMenuItem, TSMI_MapSettings, QuickJumpTSMI, TSMI_UnitOrders, UnitOrdersToolStripMenuItem, MissionsToolStripMenuItem, ContactsToolStripMenuItem, TSMI_Editor,
			HelpToolStripMenuItem, TSMI_Scripts, TSMI_Testing
		});
		MenuStrip1.Location = new System.Drawing.Point(0, 0);
		MenuStrip1.Name = "MenuStrip1";
		MenuStrip1.Padding = new Padding(3, 2, 0, 2);
		MenuStrip1.Size = new System.Drawing.Size(1162, 24);
		MenuStrip1.TabIndex = 4;
		MenuStrip1.Text = "MenuStrip1";
		
		// 省略
		TSMI_Editor.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		TSMI_Editor.DropDownItems.AddRange(new ToolStripItem[35] // <== 将Sides_TSMI"添加/编辑阵营"菜单项添加到TSMI_Editor"编辑"里面
		{
			StartDurationToolStripMenuItem, TitleDescriptionToolStripMenuItem, ToolStripSeparator_2, DarkToolStripMenuItem_2, ToolStripSeparator4, TSMI_Campaign, ToolStripSeparator_24, Sides_TSMI, SwitchTo_TSMI, BriefingToolStripMenuItem,
			TSMI_EditScoring, GodsEyeViewToolStripMenuItem, MinefieldsToolStripMenuItem, ToolStripSeparator_4, WeatherToolStripMenuItem, RealismSettingsToolStripMenuItem, TSMI_MergeScenarios, EventEditorToolStripMenuItem, DarkToolStripMenuItem_0, ToolStripSeparator5,
			TSMI_UnitOps, TSMI_IsolatedUnitPOV, ToolStripSeparator_0, KillAllUnitsofThisSideToolStripMenuItem, TSMI_RemoveAllSideContacts, ToolStripMenuItem9, TSMI_PublishToSteam, TSMI_PackageScen, InstallationsToolStripMenuItem, ScenarioMigrationTSMI,
			TSMI_ScriptingConsole, ToolStripSeparator_33, TSMI_MonteCarloAnalysis, TSMI_InteractivAnalysisConfig, TSMI_CustomIcon
		});
		TSMI_Editor.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		TSMI_Editor.Name = "TSMI_Editor";
		TSMI_Editor.Size = new System.Drawing.Size(50, 20);
		TSMI_Editor.Text = "编辑";
		TSMI_Editor.Visible = false;
		// 省略
		Sides_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		Sides_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		Sides_TSMI.Name = "Sides_TSMI";
		Sides_TSMI.Size = new System.Drawing.Size(267, 22);
		Sides_TSMI.Text = "添加/编辑阵营";                         // <== TSMI_Editor"编辑"菜单项
		SwitchTo_TSMI.BackColor = System.Drawing.Color.FromArgb(60, 63, 65);
		SwitchTo_TSMI.ForeColor = System.Drawing.Color.FromArgb(220, 220, 220);
		SwitchTo_TSMI.Name = "SwitchTo_TSMI";
		SwitchTo_TSMI.Size = new System.Drawing.Size(267, 22);
		SwitchTo_TSMI.Text = "切换到...";
		
		// 省略
		base.Controls.Add(MenuStrip1); // <== 主菜单添加到控件中
		base.Controls.Add(Panel_WW);
		base.Controls.Add(ToolStrip_Status);
		DoubleBuffered = true;
		base.Icon = (Icon)componentResourceManager.GetIcon("$this.Icon");
		base.KeyPreview = true;
		base.MainMenuStrip = MenuStrip1;
		base.Name = "MainForm";
		base.StartPosition = FormStartPosition.CenterScreen;
		Text = "Command";
		MenuStrip1.ResumeLayout(performLayout: false);
		MenuStrip1.PerformLayout();
		// 省略
		PerformLayout();
		WindowDarkMode.UseImmersiveDarkMode(base.Handle, bool_0: true);
	}

}
```

`Sides_TSMI添加/编辑阵营`使用了`get/set`方法，在`get`方法里返回了`m_MapperAdvisor`，在`set`方法里给按钮绑定了`FindAuthentication`事件。`FindAuthentication()`方法里调用了`ItemExporter.ConnectInterruptibleTemplate.Sides.Show()`方法，打开一个对话框。

```c#

public sealed class MainForm : Form
{
	
	[AccessedThroughProperty("Sides_TSMI")]
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
```

`ItemExporter.ConnectInterruptibleTemplate.Sides`其实就是返回一个`Sides`对象，这段代码不重要。

```c#
internal sealed class ItemExporter
{
	[EditorBrowsable(EditorBrowsableState.Never)]
	[MyGroupCollection("System.Windows.Forms.Form", "Create__Instance__", "Dispose__Instance__", "My.MyProject.Forms")]
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
						throw new ArgumentException("Property can only be set to Nothing");
					}
					CustomizeInterruptibleService(ref definitionMapping);
				}
			}
		}

		// 省略

		[DebuggerHidden]
		private static T CountInterruptibleService<T>(T instance) where T : Form, new()
		{
			if (instance != null && !instance.IsDisposed)
			{
				return instance; //  <== 如果definitionMapping设置了Sides对象，直接返回
			}
			if (ruleTemplate == null)
			{
				ruleTemplate = new Hashtable();
			}
			else if (ruleTemplate.ContainsKey(typeof(T)))
			{
                throw new InvalidOperationException(Microsoft.VisualBasic.CompilerServices.Utils.GetResourceString("WinForms_RecursiveFormCreate"));
            }
			ruleTemplate.Add(typeof(T), null);
			TargetInvocationException ex = default(TargetInvocationException);
			try
			{
				return new T(); //  <== 创建Sides对象
			}
			catch (TargetInvocationException ex2) when (((Func<bool>)delegate
			{
				// Could not convert BlockContainer to single expression
				ex = ex2;
				return ((Func<bool>)delegate
				{
					ProjectData.SetProjectError(ex);
					return ex.InnerException != null;
				})();
			}).Invoke())
			{
				throw new InvalidOperationException(Microsoft.VisualBasic.CompilerServices.Utils.GetResourceString("WinForms_SeeInnerException", ex.InnerException.Message), ex.InnerException);
			}
			finally
			{
				ruleTemplate.Remove(typeof(T));
			}
		}

		[DebuggerHidden]
		private void CustomizeInterruptibleService<T>(ref T gparam_0) where T : Form
		{
			gparam_0.Dispose();
			gparam_0 = null;
		}

	}
	
}
```

### :fish: 编辑阵营对话框

`Sides`类调用了`InvokeInterruptibleAdapter()`方法，这个方法里就是对话框的页面，里面有`Button1添加`、`Button2删除`等按钮。

```c#
public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    public Sides()
    {
       base.FormClosing += SetupInterruptibleAdapter;
       base.Load += ExcludeInterruptibleAdapter;
       base.KeyDown += FillInterruptibleAdapter;
       InvokeInterruptibleAdapter();                  // <== 调用 InvokeInterruptibleAdapter()生成对话框
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
       LB_Sides.Name = "LB_Sides";                               // <== 阵营列表组件
       LB_Sides.RelatedInfos = null;
       LB_Sides.Size = new Size(213, 435);
       LB_Sides.TabIndex = 0;
       Button1.BackColor = Color.Transparent;
       Button1.DialogResult = DialogResult.None;
       Button1.Font = new Font("Segoe UI", 10f);
       Button1.ForeColor = SystemColors.Control;
       Button1.Location = new Point(220, 9);
       Button1.Name = "Button1";
       Button1.RoundRadius = 0;
       Button1.Size = new Size(134, 23);
       Button1.TabIndex = 1;
       Button1.Text = "添加";                                     // <== 添加按钮
       Button2.BackColor = Color.Transparent;
       Button2.DialogResult = DialogResult.None;
       Button2.Font = new Font("Segoe UI", 10f);
       Button2.ForeColor = SystemColors.Control;
       Button2.Location = new Point(220, 38);
       Button2.Name = "Button2";
       Button2.RoundRadius = 0;
       Button2.Size = new Size(133, 23);
       Button2.TabIndex = 2;
       Button2.Text = "删除";                                     // <== 删除按钮
       // 省略
       base.Controls.Add(Button2);
       base.Controls.Add(Button1);
       base.Controls.Add(LB_Sides);
       base.Controls.Add(DarkToolStrip1);
       base.FormBorderStyle = FormBorderStyle.FixedToolWindow;
       base.KeyPreview = true;
       base.MaximizeBox = false;
       base.MinimizeBox = false;
       base.Name = "Sides";
       base.ShowIcon = false;
       base.StartPosition = FormStartPosition.CenterScreen;
       Text = "编辑阵营";
       ((ISupportInitialize)TrackBar_Proficiency).EndInit();
       DarkToolStrip1.ResumeLayout(performLayout: false);
       DarkToolStrip1.PerformLayout();
       ResumeLayout(performLayout: false);
       PerformLayout();
    }
    
}
```

### :fish: 获取阵营列表

我们首先看看阵营列表数据是怎么来的，根据推断`LB_Sides`应该是阵营列表（因为添加的其他控件都是有名字的按钮，只有`LB_Sides`是`DarkListView列表`，而且代码是从左到右，从上到下生成的页面，只有`LB_Sides`最符合）。下面是`DarkListView`类的主要代码，`DarkListView`的构造方法里给`Items`赋值为空的`DarkListItem`列表项。

```c#
public sealed class DarkListView : DarkScrollView
{

    private ObservableCollection<DarkListItem> readerExpression;

    public ObservableCollection<DarkListItem> Items
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
       Items = new ObservableCollection<DarkListItem>();
       _PropertyExpression = new List<int>();
    }

}
```

因此我们要查看这个列表是怎么获取到的只需在`Side`类里搜索`LB_Sides.Items`看在哪被赋值的就行了。经过搜索可以看到具体的逻辑是`Sides`的构造方法里设置在组件加载时调用`ExcludeInterruptibleAdapter`方法，`ExcludeInterruptibleAdapter`方法了会调用<span id="Sides.RefreshForm">`RefreshForm()`</span>方法，`RefreshForm()`方法里搜选清空阵营列表数据。调用`Client.CurrentScenario.Sides_ReadOnly.OrderBy((Side theS) => theS.Name)`获取当前想定的阵营列表并按名称排序，并依次调用`LB_Sides.Items.Add(new DarkListItem(item.Name));`添加到阵营列表里。

```c#
public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    public Sides()
    {
       base.FormClosing += SetupInterruptibleAdapter;
       base.Load += ExcludeInterruptibleAdapter;      // <== 加载时调用ExcludeInterruptibleAdapter
       base.KeyDown += FillInterruptibleAdapter;
       InvokeInterruptibleAdapter();                  // <== 调用 InvokeInterruptibleAdapter()生成对话框
    }

    private void ExcludeInterruptibleAdapter(object sender, EventArgs e)
    {
       if (Client._StateClass == 1f)
       {
          base.AutoScaleMode = AutoScaleMode.None;
       }
       RefreshForm();                             // <== ExcludeInterruptibleAdapter方法调用RefreshForm()方法
    }
    
    public void RefreshForm()
    {
       LB_Sides.Items.Clear(); // RefreshForm()方法首先清空 LB_Sides.Items 列表数据
       foreach (Side item in Client.CurrentScenario.Sides_ReadOnly.OrderBy((Side theS) => theS.Name))
       {  // 将 Client.CurrentScenario.Sides_ReadOnly按名称排序添加到 LB_Sides.Items 列表里
          LB_Sides.Items.Add(new DarkListItem(item.Name));
       }
       Button2.Enabled = (LB_Sides.Items.Count > 0) & (LB_Sides.SelectedIndices.Count > 0); // 删除按钮
       Button3.Enabled = (LB_Sides.Items.Count > 0) & (LB_Sides.SelectedIndices.Count > 0);
       Label_Proficiency.Visible = (LB_Sides.Items.Count > 0) & (LB_Sides.SelectedIndices.Count > 0);
       TrackBar_Proficiency.Visible = (LB_Sides.Items.Count > 0) & (LB_Sides.SelectedIndices.Count > 0);
       RefreshSideColorControls();
       if (ItemExporter.ConnectInterruptibleTemplate.AddUnit.Visible)
       {
          ItemExporter.ConnectInterruptibleTemplate.AddUnit.RefreshSides();
       }
    }
    
}
```

`Client.CurrentScenario.Sides_ReadOnly`返回的就是想定类的`_Sides`字段

> :see_no_evil:  `Client.CurrentScenario.Sides_ReadOnly`的数据是怎么来的呢:grey_question:
>
> :hear_no_evil: 初始化是通过加载想定文件设置的，这个以后会讲；添加阵营后会继续添加，我们接下来会讲。

```c#
public sealed class Scenario
{

    private Side[] _Sides; // 阵营列表
    
    public Side[] Sides_ReadOnly => _Sides; // Sides_ReadOnly 返回的就是阵营列表

}
```

### :fish:添加阵营

添加阵营按钮绑定`IncludeInterruptibleAdapter`方法，该方法会调用`ItemExporter.ConnectInterruptibleTemplate.AddSide.Show()`

```c#
public sealed class Sides : DarkSecondaryFormBase, GInterface9
{
	
	[CompilerGenerated]
	[AccessedThroughProperty("Button1")]
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
			EventHandler value2 = IncludeInterruptibleAdapter;   // <== 添加阵营按钮事件绑定 IncludeInterruptibleAdapter方法
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
		Button1.Font = new Font("Segoe UI", 10f);
		Button1.ForeColor = SystemColors.Control;
		Button1.Location = new Point(220, 9);
		Button1.Name = "Button1";
		Button1.RoundRadius = 0;
		Button1.Size = new Size(134, 23);
		Button1.TabIndex = 1;
		Button1.Text = "添加";                                  // <== 添加按钮名为 Button1
		// 省略
		base.Controls.Add(Button1);
		// 省略
	}

	private void IncludeInterruptibleAdapter(object sender, EventArgs e)
	{
		ItemExporter.ConnectInterruptibleTemplate.AddSide.Show();  // <== 调用AddSide.Show()
	}

}
```

`AddSide`的get方法也是调用`CountInterruptibleService`方法返回一个`AddSide`对象

```c#
internal sealed class ItemExporter
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
						throw new ArgumentException("Property can only be set to Nothing");
					}

					CustomizeInterruptibleService(ref _ValTemplate);
				}
			}
		}

	}
}
```

`AddSide`类比较简单，构造方法调用`DestroyTests()`方法，该方法只有`Label1名称文本`组件、`TextBox1输入框`组件、`Button1确定`按钮、`Button2取消`按钮。`Button1确定`按钮的点击事件绑定 `ComputeTests` 方法，该方法调用 `Client.AddSide(string_, ref scenario_)` 添加阵营

```c#
public sealed class AddSide : DarkSecondaryFormBase
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
          EventHandler value2 = ComputeTests;             // <== 确定按钮点击事件绑定 ComputeTests 方法
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
       DestroyTests();                              // <== 构造方法调用 DestroyTests() 方法
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
       Label1.Name = "Label1";
       Label1.Size = new Size(54, 17);
       Label1.TabIndex = 0;
       Label1.Text = "名称:";
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
       TextBox1.Name = "TextBox1";
       TextBox1.ReadOnly = false;
       TextBox1.ScrollBars = ScrollBars.None;
       TextBox1.SelectionStart = 0;
       TextBox1.Size = new Size(212, 20);
       TextBox1.TabIndex = 0;
       TextBox1.TextAlign = HorizontalAlignment.Left;
       TextBox1.UseSystemPasswordChar = false;
       TextBox1.WatermarkText = "";
       Button1.BackColor = Color.Transparent;
       Button1.DialogResult = DialogResult.None;
       Button1.ForeColor = SystemColors.Control;
       Button1.Location = new Point(57, 36);
       Button1.Name = "Button1";
       Button1.RoundRadius = 0;
       Button1.Size = new Size(75, 23);
       Button1.TabIndex = 2;
       Button1.Text = "确定";                             // <== 确定按钮
       Button2.BackColor = Color.Transparent;
       Button2.DialogResult = DialogResult.Cancel;
       Button2.ForeColor = SystemColors.Control;
       Button2.Location = new Point(194, 36);
       Button2.Name = "Button2";
       Button2.RoundRadius = 0;
       Button2.Size = new Size(75, 23);
       Button2.TabIndex = 3;
       Button2.Text = "取消";
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
       base.Name = "AddSide";
       base.ShowIcon = false;
       base.StartPosition = FormStartPosition.CenterScreen;
       Text = "创建一个新阵营";
       ResumeLayout(performLayout: false);
    }

    private void ComputeTests(object sender, EventArgs e)
    {
       string string_ = TextBox1.Text;
       Scenario scenario_ = Client.CurrentScenario;   // <== Client.CurrentScenario 获取当前想定
       Client.AddSide(string_, ref scenario_);        // <== 调用 Client.AddSide(string_, ref scenario_)添加阵营
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
```

`Client.AddSide`方法调用`composerRequest.AddSide(side)`方法添加阵营。如果只有一个阵营，就设置当前阵营为这个阵营。如果阵营可见就更新阵营界面列表，其会调用`Sides.RefreshForm()`，这个方法我们<a href="#Sides.RefreshForm">添加阵营列表</a>里讲过，其作用就是更新编辑阵营对话框左边的阵营列表和右侧的按钮状态。

```c#
public sealed class Client
{
    
    [AccessedThroughProperty("_CurrentScenario")]
    [CompilerGenerated]
    private static Scenario composerRequest;
    
    // Client.CurrentScenario 获取当前想定就是 返回的就是composerRequest
	public static Scenario CurrentScenario //=> composerRequest;
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
```

接下来我们看`composerRequest.AddSide(side)`方法，这个方法调用`ArrayExtensions.Add(ref _Sides, side_0)`方法，并调用订阅`SidesChanged`事件的方法。

```c#
public sealed class Scenario
{

	public delegate void SidesChangedEventHandler(Scenario theScen, SideAdditionOrRemoval AddOrRemove); // SidesChangedEventHandler规定了订阅SidesChanged事件的方法必须接收两个参数(分别为Scenario当前想定 和 SideAdditionOrRemoval 是添加阵营还是删除阵营)并且没有返回值
    
    private Side[] _Sides; // 阵营列表
    
    public Side[] Sides_ReadOnly => _Sides; // Sides_ReadOnly 返回的就是阵营列表（获取阵营列表里调用的Client.CurrentScenario.Sides_ReadOnly就是返回的该字段）
	
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
```

`ArrayExtensions`是一个工具类，`Add`方法是将第二个参数的对象添加到第一个参数的集合里面

```c#
public sealed class ArrayExtensions
{
    public static void Add<T>(ref T[] gparam_0, T theAC)
    {   // 创建一个比原集合大1个空间的集合，并拷贝该集合到新的集合
        gparam_0 = (T[])Microsoft.VisualBasic.CompilerServices.Utils.CopyArray(gparam_0, new T[gparam_0.Length + 1]);
        gparam_0[gparam_0.Length - 1] = theAC; // 将第二个参数对象的值 设置到刚创建的集合的最后一位里
    }
    
}
```

接下来我们看`Scenario.SidesChanged`的订阅者做了什么事情。全局搜索`Scenario.SidesChanged`发现`Client`类的`Initialize`方法订阅了该事件。

![image-20250806174030074](./image/image-20250806174030074.png)

`Client`类的`SelectConfiguration`方法主要逻辑是删除当前阵营时重新设置一个新的阵营为当前阵营。

```c#
public sealed class Client
{
	
	[AccessedThroughProperty("_CurrentScenario")]
	[CompilerGenerated]
	private static Scenario composerRequest;
	
	[CompilerGenerated]
	[AccessedThroughProperty("_CurrentSide")]
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
			Scenario.SidesChanged += SelectConfiguration;           // <== 订阅了 Scenario.SidesChanged 事件
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
		if (sideAdditionOrRemoval_0 == Scenario.SideAdditionOrRemoval.Removal && !composerRequest.Sides_ReadOnly.Contains(m_ModelRequest)) // m_ModelRequest就是Client.CurrentSide即当前阵营
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
```

那`Client`类的`Initialize`方法又是怎么被执行的呢？

我们在`Client`类的`Initialize`方法里打上断点，就可以发现如下调用栈。

![image-20250809161822500](./image/image-20250809161822500.png)

我们打开第一个调用栈，发现`MainSplash`类的`VerifyInterruptibleConfig`方法调用了`Client`类的`Initialize`方法。

![image-20250809161916170](./image/image-20250809161916170.png)

经过查找发现`MainSplash`的构造方法里订阅了`Show`事件执行`VerifyInterruptibleConfig`方法。我们在`base.Shown += VerifyInterruptibleConfig;`这行打上断点，重新运行项目，看看`MainSplash`对象是在哪被创建的。

![image-20250809162040978](./image/image-20250809162040978.png)

```c#
public sealed class MainSplash : Form
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
          GameGeneral.WriteLogDebugInfoToFile("Client.Initalize");
          Client.Initialize();
       }
       catch (Exception projectError3)
       {
          ProjectData.SetProjectError(projectError3);
          GameGeneral.WriteLogDebugInfoToFile("Client.Initalize FAILED");
          ProjectData.ClearProjectError();
       }
    }

}
```

创建`MainSplash`有三个调用栈帧。

![image-20250809162518954](./image/image-20250809162518954.png)

第一个栈帧的`RateInterruptibleMap`方法我们在<a href="#AdapterCallbackCandidate.RateInterruptibleMap">`入口代码`</a>里讲过。具体逻辑是程序的入口`Main`方法执行`Run`方法触发`Startup`事件，该类订阅了`Startup`事件执行了`RateInterruptibleMap`方法。`RateInterruptibleMap`方法调用`ItemExporter.ConnectInterruptibleTemplate.MainSplash.Show()`显示`MainSplash`窗体。

```c#
internal class AdapterCallbackCandidate : WindowsFormsApplicationBase
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
```

![image-20250809163201690](./image/image-20250809163201690.png)

第一帧的`ItemExporter.ConnectInterruptibleTemplate.MainSplash.Show()`调用了`ItemExporter.ConnectInterruptibleTemplate.MainSplash`就进入了第二帧，懒加载`MainSplash`创建`MainSplash`对象。这个`CountInterruptibleService`方法讲过，其作用就是懒加载创建对象。

```c#
internal sealed class ItemExporter
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
						throw new ArgumentException("Property can only be set to Nothing");
					}

					CustomizeInterruptibleService(ref _InterceptorTemplate);
				}
			}
		}

		private static T CountInterruptibleService<T>(T instance) where T : Form, new()
		{
			if (instance != null && !instance.IsDisposed)
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

```

![image-20250809164318230](./image/image-20250809164318230.png)

### :fish:删除阵营

添加阵营后，`删除`按钮是置灰状态的。

<img src="./image/image-20250809173628706.png" alt="image-20250809173628706" style="zoom: 50%;" />

当我们选中一方后`删除`按钮才能正常点击。

<img src="./image/image-20250809173717359.png" alt="image-20250809173717359" style="zoom:50%;" />

点击`删除`按钮会出现确认框

![image-20251016102925282](./image/image-20251016102925282.png)

点击`Ok`后就删除了`蓝方`阵营，此时`删除`、`对抗关系`重新置灰。

![image-20251016102955478](./image/image-20251016102955478.png)



首先我们看看选中后，`删除`按钮可以点击是怎么做的。

选中某个阵营后`LB_Sides`（阵营列表）会触发`SelectedIndicesChanged`事件（根据名称推算而来，判断是不是这个事件也很简单，直接在`EnableInterruptibleAdapter`方法的开头打断点，看能不能进去就行了），然后执行`EnableInterruptibleAdapter`方法，这个方法用于更新`删除`、`对抗关系`、`能力`等数据。

> `SelectedIndexChanged` 事件：在 `SelectedIndex` 属性更改后发生（即列表里选中的索引发生变化）。

```c#
public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    [AccessedThroughProperty("LB_Sides")]
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
       LB_Sides.Name = "LB_Sides";
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
       Button2.Enabled = LB_Sides.Items.Count > 0; // 如果还有阵营就设置删除按钮可用（调用EnableInterruptibleAdapter方法则要么选中的阵营变为了别的阵营，要么没有选中的阵营了。）
       Button3.Enabled = LB_Sides.Items.Count > 0; // 对抗关系
       CB_AIOnly.Enabled = LB_Sides.Items.Count > 0; // 阵营是AI控制的
       CB_CollRespons.Enabled = LB_Sides.Items.Count > 0; // 集体责任
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
       Label_Proficiency.Text = "能力：" + Misc.TestRequest(factorySingleton.Proficiency); // 能力
       TrackBar_Proficiency.Value = (int)factorySingleton.Proficiency;
       RefreshSideColorControls();
    }

}
```

删除按钮点击后会调用`ChangeInterruptibleAdapter`方法。首先弹出确认删除的对话框，用户点击Ok后遍历阵营单位将其收集到collection中，然后遍历collection列表，调用当前想定的`DeleteUnitImmediately`方法，传入对当前阵营的单位，以立即删除当前想定的该单位。然后再找出属于该阵营的所有非制导武器并将其从非制导武器集合中删除。然后将属于该阵营的所有非制导武器从武器齐射列表中删除。最后从阵营列表中删除当前阵营并调用`RefreshForm`方法，这个方法我们<a href="#Sides.RefreshForm">添加阵营列表</a>里讲过，其作用就是更新编辑阵营对话框左边的阵营列表和右侧的按钮状态。（简单来说就是删除属于当前阵营的单元、非制导武器、武器齐射，然后删除当前阵营，最后刷新页面）

```c#
public sealed class Sides : DarkSecondaryFormBase, GInterface9
{

    [AccessedThroughProperty("LB_Sides")]
    private DarkListView rulesSingleton;
    
    [CompilerGenerated]
    [AccessedThroughProperty("Button2")]
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
          EventHandler value2 = ChangeInterruptibleAdapter;     // <== 删除按钮点击事件调用的方法
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
       Button2.Font = new Font("Segoe UI", 10f);
       Button2.ForeColor = SystemColors.Control;
       Button2.Location = new Point(220, 38);
       Button2.Name = "Button2";
       Button2.RoundRadius = 0;
       Button2.Size = new Size(133, 23);
       Button2.TabIndex = 2;
       Button2.Text = "删除";
       // 省略
    }

    private void ChangeInterruptibleAdapter(object sender, EventArgs e)
    {  // 弹出 “确认是否删除” 的对话框，factorySingleton为要删除的阵营（上面设置的，阵营列表里选择当前阵营时会将当前阵营设置到factorySingleton里面）
       if (DarkMessageBox.ShowWarning("你确定吗？所有单元，任务和该方的任何其他对象将被删除！", "删除阵营：" + factorySingleton.Name, DarkDialogButton.OkCancel) != DialogResult.OK)
       {
          return;
       }
       Collection<ActiveUnit> collection = new Collection<ActiveUnit>();
       foreach (ActiveUnit unit in factorySingleton.Units)
       {
          collection.Add(unit); // 遍历当前阵营的单位，并将单位添加到collection中
       }
       foreach (ActiveUnit item in collection)
       {  // 遍历当前阵营单位并调用DeleteUnitImmediately方法立即删除单位
          Client.CurrentScenario.DeleteUnitImmediately(item.ObjectID, bool_0: true, "Unit deleted");
       }
       List<string> list = new List<string>();
       foreach (KeyValuePair<string, UnguidedWeapon> unguidedWeapon in Client.CurrentScenario.UnguidedWeapons) // 遍历当前想定的非制导武器集合
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
```

## :peach:  想定录制







Command/Command/AttackTarget.cs
