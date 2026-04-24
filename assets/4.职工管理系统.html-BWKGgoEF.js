import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as n,e as t}from"./app-uyb0nfWQ.js";const a={},d=t(`<h1 id="职工管理系统" tabindex="-1"><a class="header-anchor" href="#职工管理系统" aria-hidden="true">#</a> 职工管理系统</h1><h2 id="_1、管理系统需求" tabindex="-1"><a class="header-anchor" href="#_1、管理系统需求" aria-hidden="true">#</a> 1、管理系统需求</h2><p><strong>职工管理系统可以用来管理公司内所有员工的信息</strong></p><p>本教程主要利用C++来实现一个基于多态的职工管理系统</p><p>公司中职工分为三类：普通员工、经理、老板，显示信息时，需要显示职工编号、职工姓名、职工岗位、以及职责</p><p>普通员工职责：完成经理交给的任务</p><p>经理职责：完成老板交给的任务，并下发任务给员工</p><p>老板职责：管理公司所有事务</p><p><strong>管理系统中需要实现的功能如下：</strong></p><ul><li>退出管理程序：退出当前管理系统</li></ul><ul><li>增加职工信息：实现批量添加职工功能，将信息录入到文件中，职工信息为：职工编号、姓名、部门编号</li><li>显示职工信息：显示公司内部所有职工的信息</li><li>删除离职职工：按照编号删除指定的职工</li><li>修改职工信息：按照编号修改职工个人信息</li><li>查找职工信息：按照职工的编号或者职工的姓名进行查找相关的人员信息</li><li>按照编号排序：按照职工编号，进行排序，排序规则由用户指定</li><li>清空所有文档：清空文件中记录的所有职工信息 （清空前需要再次确认，防止误删）</li></ul><p><strong>系统界面效果图如下：</strong></p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546511409198.png" alt="1546511409198" tabindex="0" loading="lazy"><figcaption>1546511409198</figcaption></figure><p>需根据用户不同的选择，完成不同的功能！</p><h2 id="_2、创建项目" tabindex="-1"><a class="header-anchor" href="#_2、创建项目" aria-hidden="true">#</a> 2、创建项目</h2><p>创建项目步骤如下：</p><ul><li>创建新项目</li><li>添加文件</li></ul><h3 id="_2-1-创建项目" tabindex="-1"><a class="header-anchor" href="#_2-1-创建项目" aria-hidden="true">#</a> 2.1 创建项目</h3><p>打开vs2017后，点击创建新项目，创建新的C++项目</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/15441512014652.png" alt="1544151201465" tabindex="0" loading="lazy"><figcaption>1544151201465</figcaption></figure><p>填写项目名称以及项目路径，点击确定</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546349209805.png" alt="1546349209805" tabindex="0" loading="lazy"><figcaption>1546349209805</figcaption></figure><h3 id="_2-2-添加文件" tabindex="-1"><a class="header-anchor" href="#_2-2-添加文件" aria-hidden="true">#</a> 2.2 添加文件</h3><p>右键源文件，进行添加文件操作</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546349360960.png" alt="1546349360960" tabindex="0" loading="lazy"><figcaption>1546349360960</figcaption></figure><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546349421496.png" alt="1546349421496" tabindex="0" loading="lazy"><figcaption>1546349421496</figcaption></figure><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546349488752.png" alt="1546349488752" tabindex="0" loading="lazy"><figcaption>1546349488752</figcaption></figure><p>至此，项目已创建完毕</p><h2 id="_3、创建管理类" tabindex="-1"><a class="header-anchor" href="#_3、创建管理类" aria-hidden="true">#</a> 3、创建管理类</h2><p>​ 管理类负责的内容如下：</p><ul><li>与用户的沟通菜单界面</li><li>对职工增删改查的操作</li><li>与文件的读写交互</li></ul><h3 id="_3-1创建文件" tabindex="-1"><a class="header-anchor" href="#_3-1创建文件" aria-hidden="true">#</a> 3.1创建文件</h3><p>在头文件和源文件的文件夹下分别创建workerManager.h 和 workerManager.cpp文件</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546349904944.png" alt="1546349904944" tabindex="0" loading="lazy"><figcaption>1546349904944</figcaption></figure><h3 id="_3-2-头文件实现" tabindex="-1"><a class="header-anchor" href="#_3-2-头文件实现" aria-hidden="true">#</a> 3.2 头文件实现</h3><p>在workerManager.h中设计管理类</p><p>代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;


class WorkerManager
{
public:

	//构造函数
	WorkerManager();

	//析构函数
	~WorkerManager();

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-源文件实现" tabindex="-1"><a class="header-anchor" href="#_3-3-源文件实现" aria-hidden="true">#</a> 3.3 源文件实现</h3><p>在workerManager.cpp中将构造和析构函数空实现补全</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;workerManager.h&quot;

WorkerManager::WorkerManager()
{
}

WorkerManager::~WorkerManager()
{
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此职工管理类以创建完毕</p><h2 id="_4、菜单功能" tabindex="-1"><a class="header-anchor" href="#_4、菜单功能" aria-hidden="true">#</a> 4、菜单功能</h2><p>功能描述：与用户的沟通界面</p><h3 id="_4-1-添加成员函数" tabindex="-1"><a class="header-anchor" href="#_4-1-添加成员函数" aria-hidden="true">#</a> 4.1 添加成员函数</h3><p>在管理类workerManager.h中添加成员函数 <code>void Show_Menu();</code></p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546351543942.png" alt="1546351543942" tabindex="0" loading="lazy"><figcaption>1546351543942</figcaption></figure><h3 id="_4-2-菜单功能实现" tabindex="-1"><a class="header-anchor" href="#_4-2-菜单功能实现" aria-hidden="true">#</a> 4.2 菜单功能实现</h3><p>在管理类workerManager.cpp中实现 Show_Menu()函数</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void WorkerManager::Show_Menu()
{
	cout &lt;&lt; &quot;********************************************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*********  欢迎使用职工管理系统！ **********&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  0.退出管理程序  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  1.增加职工信息  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  2.显示职工信息  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  3.删除离职职工  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  4.修改职工信息  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  5.查找职工信息  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  6.按照编号排序  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  7.清空所有文档  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;********************************************&quot; &lt;&lt; endl;
	cout &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-测试菜单功能" tabindex="-1"><a class="header-anchor" href="#_4-3-测试菜单功能" aria-hidden="true">#</a> 4.3 测试菜单功能</h3><p>在职工管理系统.cpp中测试菜单功能</p><p>代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include&lt;iostream&gt;
using namespace std;
#include &quot;workerManager.h&quot;

int main() {

	WorkerManager wm;

	wm.Show_Menu();

	system(&quot;pause&quot;);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546352771191.png" alt="1546352771191" tabindex="0" loading="lazy"><figcaption>1546352771191</figcaption></figure><h2 id="_5、退出功能" tabindex="-1"><a class="header-anchor" href="#_5、退出功能" aria-hidden="true">#</a> 5、退出功能</h2><h3 id="_5-1-提供功能接口" tabindex="-1"><a class="header-anchor" href="#_5-1-提供功能接口" aria-hidden="true">#</a> 5.1 提供功能接口</h3><p>在main函数中提供分支选择，提供每个功能接口</p><p>代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int main() {

	WorkerManager wm;
	int choice = 0;
	while (true)
	{
		//展示菜单
		wm.Show_Menu();
		cout &lt;&lt; &quot;请输入您的选择:&quot; &lt;&lt; endl;
		cin &gt;&gt; choice;

		switch (choice)
		{
		case 0: //退出系统
			break;
		case 1: //添加职工
			break;
		case 2: //显示职工
			break;
		case 3: //删除职工
			break;
		case 4: //修改职工
			break;
		case 5: //查找职工
			break;
		case 6: //排序职工
			break;
		case 7: //清空文件
			break;
		default:
			system(&quot;cls&quot;);
			break;
		}
	}

	system(&quot;pause&quot;);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-实现退出功能" tabindex="-1"><a class="header-anchor" href="#_5-2-实现退出功能" aria-hidden="true">#</a> 5.2 实现退出功能</h3><p>在workerManager.h中提供退出系统的成员函数 <code> void exitSystem();</code></p><p>在workerManager.cpp中提供具体的功能实现</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void WorkerManager::exitSystem()
{
	cout &lt;&lt; &quot;欢迎下次使用&quot; &lt;&lt; endl;
	system(&quot;pause&quot;);
	exit(0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3测试功能" tabindex="-1"><a class="header-anchor" href="#_5-3测试功能" aria-hidden="true">#</a> 5.3测试功能</h3><p>在main函数分支 0 选项中，调用退出程序的接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546353199424.png" alt="1546353199424" tabindex="0" loading="lazy"><figcaption>1546353199424</figcaption></figure><p>运行测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546353155490.png" alt="1546353155490" tabindex="0" loading="lazy"><figcaption>1546353155490</figcaption></figure><h2 id="_6、创建职工类" tabindex="-1"><a class="header-anchor" href="#_6、创建职工类" aria-hidden="true">#</a> 6、创建职工类</h2><h3 id="_6-1-创建职工抽象类" tabindex="-1"><a class="header-anchor" href="#_6-1-创建职工抽象类" aria-hidden="true">#</a> 6.1 创建职工抽象类</h3><p>职工的分类为：普通员工、经理、老板</p><p>将三种职工抽象到一个类（worker）中,利用多态管理不同职工种类</p><p>职工的属性为：职工编号、职工姓名、职工所在部门编号</p><p>职工的行为为：岗位职责信息描述，获取岗位名称</p><p>头文件文件夹下 创建文件worker.h 文件并且添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
#include&lt;string&gt;
using namespace std;

//职工抽象基类
class Worker
{
public:

	//显示个人信息
	virtual void showInfo() = 0;
	//获取岗位名称
	virtual string getDeptName() = 0;

	int m_Id; //职工编号
	string m_Name; //职工姓名
	int m_DeptId; //职工所在部门名称编号
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-创建普通员工类" tabindex="-1"><a class="header-anchor" href="#_6-2-创建普通员工类" aria-hidden="true">#</a> 6.2 创建普通员工类</h3><p>普通员工类<strong>继承</strong>职工抽象类，并重写父类中纯虚函数</p><p>在头文件和源文件的文件夹下分别创建employee.h 和 employee.cpp文件</p><p>employee.h中代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once 
#include&lt;iostream&gt;
using namespace std;
#include &quot;worker.h&quot;

//员工类
class Employee :public Worker
{
public:

	//构造函数
	Employee(int id, string name, int dId);

	//显示个人信息
	virtual void showInfo();

	//获取职工岗位名称
	virtual string getDeptName();
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>employee.cpp中代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;employee.h&quot;

Employee::Employee(int id, string name, int dId)
{
	this-&gt;m_Id = id;
	this-&gt;m_Name = name;
	this-&gt;m_DeptId = dId;
}

void Employee::showInfo()
{
	cout &lt;&lt; &quot;职工编号： &quot; &lt;&lt; this-&gt;m_Id
		&lt;&lt; &quot; \\t职工姓名： &quot; &lt;&lt; this-&gt;m_Name
		&lt;&lt; &quot; \\t岗位：&quot; &lt;&lt; this-&gt;getDeptName()
		&lt;&lt; &quot; \\t岗位职责：完成经理交给的任务&quot; &lt;&lt; endl;
}


string Employee::getDeptName()
{
	return string(&quot;员工&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-创建经理类" tabindex="-1"><a class="header-anchor" href="#_6-3-创建经理类" aria-hidden="true">#</a> 6.3 创建经理类</h3><p>经理类<strong>继承</strong>职工抽象类，并重写父类中纯虚函数，和普通员工类似</p><p>在头文件和源文件的文件夹下分别创建manager.h 和 manager.cpp文件</p><p>manager.h中代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;
#include &quot;worker.h&quot;

//经理类
class Manager :public Worker
{
public:

	Manager(int id, string name, int dId);

	//显示个人信息
	virtual void showInfo();

	//获取职工岗位名称
	virtual string getDeptName();
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>manager.cpp中代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;manager.h&quot;

Manager::Manager(int id, string name, int dId)
{
	this-&gt;m_Id = id;
	this-&gt;m_Name = name;
	this-&gt;m_DeptId = dId;

}

void Manager::showInfo()
{
	cout &lt;&lt; &quot;职工编号： &quot; &lt;&lt; this-&gt;m_Id
		&lt;&lt; &quot; \\t职工姓名： &quot; &lt;&lt; this-&gt;m_Name
		&lt;&lt; &quot; \\t岗位：&quot; &lt;&lt; this-&gt;getDeptName()
		&lt;&lt; &quot; \\t岗位职责：完成老板交给的任务,并下发任务给员工&quot; &lt;&lt; endl;
}

string Manager::getDeptName()
{
	return string(&quot;经理&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-创建老板类" tabindex="-1"><a class="header-anchor" href="#_6-4-创建老板类" aria-hidden="true">#</a> 6.4 创建老板类</h3><p>老板类<strong>继承</strong>职工抽象类，并重写父类中纯虚函数，和普通员工类似</p><p>在头文件和源文件的文件夹下分别创建boss.h 和 boss.cpp文件</p><p>boss.h中代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;
#include &quot;worker.h&quot;

//老板类
class Boss :public Worker
{
public:

	Boss(int id, string name, int dId);

	//显示个人信息
	virtual void showInfo();

	//获取职工岗位名称
	virtual string getDeptName();
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>boss.cpp中代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;boss.h&quot;

Boss::Boss(int id, string name, int dId)
{
	this-&gt;m_Id = id;
	this-&gt;m_Name = name;
	this-&gt;m_DeptId = dId;

}

void Boss::showInfo()
{
	cout &lt;&lt; &quot;职工编号： &quot; &lt;&lt; this-&gt;m_Id
		&lt;&lt; &quot; \\t职工姓名： &quot; &lt;&lt; this-&gt;m_Name
		&lt;&lt; &quot; \\t岗位：&quot; &lt;&lt; this-&gt;getDeptName()
		&lt;&lt; &quot; \\t岗位职责：管理公司所有事务&quot; &lt;&lt; endl;
}

string Boss::getDeptName()
{
	return string(&quot;总裁&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-5-测试多态" tabindex="-1"><a class="header-anchor" href="#_6-5-测试多态" aria-hidden="true">#</a> 6.5 测试多态</h3><p>在职工管理系统.cpp中添加测试函数，并且运行能够产生多态</p><p>测试代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;worker.h&quot;
#include &quot;employee.h&quot;
#include &quot;manager.h&quot;
#include &quot;boss.h&quot;


void test()
{
	Worker * worker = NULL;
	worker = new Employee(1, &quot;张三&quot;, 1);
	worker-&gt;showInfo();
	delete worker;
	
	worker = new Manager(2, &quot;李四&quot;, 2);
	worker-&gt;showInfo();
	delete worker;

	worker = new Boss(3, &quot;王五&quot;, 3);
	worker-&gt;showInfo();
	delete worker;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果如图</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546398236081.png" alt="1546398236081" tabindex="0" loading="lazy"><figcaption>1546398236081</figcaption></figure><p>测试成功后，测试代码可以注释保留，或者选择删除</p><h2 id="_7、添加职工" tabindex="-1"><a class="header-anchor" href="#_7、添加职工" aria-hidden="true">#</a> 7、添加职工</h2><p>功能描述：批量添加职工，并且保存到文件中</p><h3 id="_7-1-功能分析" tabindex="-1"><a class="header-anchor" href="#_7-1-功能分析" aria-hidden="true">#</a> 7.1 功能分析</h3><p>分析：</p><p>用户在批量创建时，可能会创建不同种类的职工</p><p>如果想将所有不同种类的员工都放入到一个数组中，可以将所有员工的指针维护到一个数组里</p><p>如果想在程序中维护这个不定长度的数组，可以将数组创建到堆区，并利用Worker **的指针维护</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546399491099.png" alt="1546399491099" tabindex="0" loading="lazy"><figcaption>1546399491099</figcaption></figure><h3 id="_7-2-功能实现" tabindex="-1"><a class="header-anchor" href="#_7-2-功能实现" aria-hidden="true">#</a> 7.2 功能实现</h3><p>在WokerManager.h头文件中添加成员属性 代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	//记录文件中的人数个数
	int m_EmpNum;

	//员工数组的指针
	Worker ** m_EmpArray;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在WorkerManager构造函数中初始化属性</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>WorkerManager::WorkerManager()
{
	//初始化人数
	this-&gt;m_EmpNum = 0;

	//初始化数组指针
	this-&gt;m_EmpArray = NULL;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在workerManager.h中添加成员函数</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	//增加职工
	void Add_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>workerManager.cpp中实现该函数</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//增加职工
void WorkerManager::Add_Emp()
{
	cout &lt;&lt; &quot;请输入增加职工数量： &quot; &lt;&lt; endl;

	int addNum = 0;
	cin &gt;&gt; addNum;

	if (addNum &gt; 0)
	{
		//计算新空间大小
		int newSize = this-&gt;m_EmpNum + addNum;

		//开辟新空间
		Worker ** newSpace = new Worker*[newSize];

		//将原空间下内容存放到新空间下
		if (this-&gt;m_EmpArray != NULL)
		{
			for (int i = 0; i &lt; this-&gt;m_EmpNum; i++)
			{
				newSpace[i] = this-&gt;m_EmpArray[i];
			}
		}

		//输入新数据
		for (int i = 0; i &lt; addNum; i++)
		{
			int id;
			string name;
			int dSelect;

			cout &lt;&lt; &quot;请输入第 &quot; &lt;&lt; i + 1 &lt;&lt; &quot; 个新职工编号：&quot; &lt;&lt; endl;
			cin &gt;&gt; id;


			cout &lt;&lt; &quot;请输入第 &quot; &lt;&lt; i + 1 &lt;&lt; &quot; 个新职工姓名：&quot; &lt;&lt; endl;
			cin &gt;&gt; name;


			cout &lt;&lt; &quot;请选择该职工的岗位：&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;1、普通职工&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;2、经理&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;3、老板&quot; &lt;&lt; endl;
			cin &gt;&gt; dSelect;


			Worker * worker = NULL;
			switch (dSelect)
			{
			case 1: //普通员工
				worker = new Employee(id, name, 1);
				break;
			case 2: //经理
				worker = new Manager(id, name, 2);
				break;
			case 3:  //老板
				worker = new Boss(id, name, 3);
				break;
			default:
				break;
			}


			newSpace[this-&gt;m_EmpNum + i] = worker;
		}

		//释放原有空间
		delete[] this-&gt;m_EmpArray;

		//更改新空间的指向
		this-&gt;m_EmpArray = newSpace;

		//更新新的个数
		this-&gt;m_EmpNum = newSize;

		//提示信息
		cout &lt;&lt; &quot;成功添加&quot; &lt;&lt; addNum &lt;&lt; &quot;名新职工！&quot; &lt;&lt; endl;
	}
	else
	{
		cout &lt;&lt; &quot;输入有误&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在WorkerManager.cpp的析构函数中，释放堆区数据</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>WorkerManager::~WorkerManager()
{
	if (this-&gt;m_EmpArray != NULL)
	{
		delete[] this-&gt;m_EmpArray;
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-测试添加" tabindex="-1"><a class="header-anchor" href="#_7-3-测试添加" aria-hidden="true">#</a> 7.3 测试添加</h3><p>在main函数分支 1 选项中，调用添加职工接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546401705277.png" alt="1546401705277" tabindex="0" loading="lazy"><figcaption>1546401705277</figcaption></figure><p>效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546401763461.png" alt="1546401763461" tabindex="0" loading="lazy"><figcaption>1546401763461</figcaption></figure><p>至此，添加职工到程序中功能实现完毕</p><h2 id="_8、文件交互-写文件" tabindex="-1"><a class="header-anchor" href="#_8、文件交互-写文件" aria-hidden="true">#</a> 8、文件交互 - 写文件</h2><p>功能描述：对文件进行读写</p><p>​ 在上一个添加功能中，我们只是将所有的数据添加到了内存中，一旦程序结束就无法保存了</p><p>​ 因此文件管理类中需要一个与文件进行交互的功能，对于文件进行读写操作</p><h3 id="_8-1-设定文件路径" tabindex="-1"><a class="header-anchor" href="#_8-1-设定文件路径" aria-hidden="true">#</a> 8.1 设定文件路径</h3><p>首先我们将文件路径，在workerManager.h中添加宏常量,并且包含头文件 fstream</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;fstream&gt;
#define  FILENAME &quot;empFile.txt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-成员函数声明" tabindex="-1"><a class="header-anchor" href="#_8-2-成员函数声明" aria-hidden="true">#</a> 8.2 成员函数声明</h3><p>在workerManager.h中类里添加成员函数 <code>void save()</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//保存文件
void save();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-保存文件功能实现" tabindex="-1"><a class="header-anchor" href="#_8-3-保存文件功能实现" aria-hidden="true">#</a> 8.3 保存文件功能实现</h3><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void WorkerManager::save()
{
	ofstream ofs;
	ofs.open(FILENAME, ios::out);


	for (int i = 0; i &lt; this-&gt;m_EmpNum; i++)
	{
		ofs &lt;&lt; this-&gt;m_EmpArray[i]-&gt;m_Id &lt;&lt; &quot; &quot; 
			&lt;&lt; this-&gt;m_EmpArray[i]-&gt;m_Name &lt;&lt; &quot; &quot; 
			&lt;&lt; this-&gt;m_EmpArray[i]-&gt;m_DeptId &lt;&lt; endl;
	}

	ofs.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-4-保存文件功能测试" tabindex="-1"><a class="header-anchor" href="#_8-4-保存文件功能测试" aria-hidden="true">#</a> 8.4 保存文件功能测试</h3><p>在添加职工功能中添加成功后添加保存文件函数</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546432469465.png" alt="1546432469465" tabindex="0" loading="lazy"><figcaption>1546432469465</figcaption></figure><p>再次运行代码，添加职工</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546401763461.png" alt="1546401763461" tabindex="0" loading="lazy"><figcaption>1546401763461</figcaption></figure><p>同级目录下多出文件，并且保存了添加的信息</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546432343078.png" alt="1546432343078" tabindex="0" loading="lazy"><figcaption>1546432343078</figcaption></figure><h2 id="_9、文件交互-读文件" tabindex="-1"><a class="header-anchor" href="#_9、文件交互-读文件" aria-hidden="true">#</a> 9、文件交互 - 读文件</h2><p>功能描述：将文件中的内容读取到程序中</p><p>虽然我们实现了添加职工后保存到文件的操作，但是每次开始运行程序，并没有将文件中数据读取到程序中</p><p>而我们的程序功能中还有清空文件的需求</p><p>因此构造函数初始化数据的情况分为三种</p><ol><li>第一次使用，文件未创建</li><li>文件存在，但是数据被用户清空</li><li>文件存在，并且保存职工的所有数据</li></ol><h3 id="_9-1-文件未创建" tabindex="-1"><a class="header-anchor" href="#_9-1-文件未创建" aria-hidden="true">#</a> 9.1 文件未创建</h3><p>在workerManager.h中添加新的成员属性 m_FileIsEmpty标志文件是否为空</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//标志文件是否为空
bool m_FileIsEmpty;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改WorkerManager.cpp中构造函数代码</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>WorkerManager::WorkerManager()
{
	ifstream ifs;
	ifs.open(FILENAME, ios::in);

	//文件不存在情况
	if (!ifs.is_open())
	{
		cout &lt;&lt; &quot;文件不存在&quot; &lt;&lt; endl; //测试输出
		this-&gt;m_EmpNum = 0;  //初始化人数
		this-&gt;m_FileIsEmpty = true; //初始化文件为空标志
		this-&gt;m_EmpArray = NULL; //初始化数组
		ifs.close(); //关闭文件
		return;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除文件后，测试文件不存在时初始化数据功能</p><h3 id="_9-2-文件存在且数据为空" tabindex="-1"><a class="header-anchor" href="#_9-2-文件存在且数据为空" aria-hidden="true">#</a> 9.2 文件存在且数据为空</h3><p>在workerManager.cpp中的构造函数追加代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	//文件存在，并且没有记录
	char ch;
	ifs &gt;&gt; ch;
	if (ifs.eof())
	{
		cout &lt;&lt; &quot;文件为空!&quot; &lt;&lt; endl;
		this-&gt;m_EmpNum = 0;
		this-&gt;m_FileIsEmpty = true;
		this-&gt;m_EmpArray = NULL;
		ifs.close();
		return;
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>追加代码位置如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546435197575.png" alt="1546435197575" tabindex="0" loading="lazy"><figcaption>1546435197575</figcaption></figure><p>将文件创建后清空文件内容，并测试该情况下初始化功能</p><p>我们发现文件不存在或者为空清空 m_FileIsEmpty 判断文件是否为空的标志都为真，那何时为假？</p><p>成功添加职工后，应该更改文件不为空的标志</p><p>在<code>void WorkerManager::Add_Emp() </code>成员函数中添加：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//更新职工不为空标志
this-&gt;m_FileIsEmpty = false;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546656256176.png" alt="1546656256176" tabindex="0" loading="lazy"><figcaption>1546656256176</figcaption></figure><h3 id="_9-3-文件存在且保存职工数据" tabindex="-1"><a class="header-anchor" href="#_9-3-文件存在且保存职工数据" aria-hidden="true">#</a> 9.3 文件存在且保存职工数据</h3><h4 id="_9-3-1-获取记录的职工人数" tabindex="-1"><a class="header-anchor" href="#_9-3-1-获取记录的职工人数" aria-hidden="true">#</a> 9.3.1 获取记录的职工人数</h4><p>在workerManager.h中添加成员函数 <code> int get_EmpNum();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	//统计人数
	int get_EmpNum();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>workerManager.cpp中实现</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int WorkerManager::get_EmpNum()
{
	ifstream ifs;
	ifs.open(FILENAME, ios::in);

	int id;
	string name;
	int dId;

	int num = 0;

	while (ifs &gt;&gt; id &amp;&amp; ifs &gt;&gt; name &amp;&amp; ifs &gt;&gt; dId)
	{
        //记录人数
		num++;
	}
	ifs.close();

	return num;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在workerManager.cpp构造函数中继续追加代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	int num =  this-&gt;get_EmpNum();
	cout &lt;&lt; &quot;职工个数为：&quot; &lt;&lt; num &lt;&lt; endl;  //测试代码
	this-&gt;m_EmpNum = num;  //更新成员属性 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动添加一些职工数据，测试获取职工数量函数</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546436429055.png" alt="1546436429055" tabindex="0" loading="lazy"><figcaption>1546436429055</figcaption></figure><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546436385793.png" alt="1546436385793" tabindex="0" loading="lazy"><figcaption>1546436385793</figcaption></figure><h4 id="_9-3-2-初始化数组" tabindex="-1"><a class="header-anchor" href="#_9-3-2-初始化数组" aria-hidden="true">#</a> 9.3.2 初始化数组</h4><p>根据职工的数据以及职工数据，初始化workerManager中的Worker ** m_EmpArray 指针</p><p>在WorkerManager.h中添加成员函数 <code>void init_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//初始化员工
void init_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在WorkerManager.cpp中实现</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void WorkerManager::init_Emp()
{
	ifstream ifs;
	ifs.open(FILENAME, ios::in);

	int id;
	string name;
	int dId;
	
	int index = 0;
	while (ifs &gt;&gt; id &amp;&amp; ifs &gt;&gt; name &amp;&amp; ifs &gt;&gt; dId)
	{
		Worker * worker = NULL;
		//根据不同的部门Id创建不同对象
		if (dId == 1)  // 1普通员工
		{
			worker = new Employee(id, name, dId);
		}
		else if (dId == 2) //2经理
		{
			worker = new Manager(id, name, dId);
		}
		else //总裁
		{
			worker = new Boss(id, name, dId);
		}
		//存放在数组中
		this-&gt;m_EmpArray[index] = worker;
		index++;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在workerManager.cpp构造函数中追加代码</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//根据职工数创建数组
this-&gt;m_EmpArray = new Worker *[this-&gt;m_EmpNum];
//初始化职工
init_Emp();

//测试代码
for (int i = 0; i &lt; m_EmpNum; i++)
{
    cout &lt;&lt; &quot;职工号： &quot; &lt;&lt; this-&gt;m_EmpArray[i]-&gt;m_Id
        &lt;&lt; &quot; 职工姓名： &quot; &lt;&lt; this-&gt;m_EmpArray[i]-&gt;m_Name
        &lt;&lt; &quot; 部门编号： &quot; &lt;&lt; this-&gt;m_EmpArray[i]-&gt;m_DeptId &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序，测试从文件中获取的数据</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546436938152.png" alt="1546436938152" tabindex="0" loading="lazy"><figcaption>1546436938152</figcaption></figure><p>至此初始化数据功能完毕，测试代码可以注释或删除掉！</p><h2 id="_10、显示职工" tabindex="-1"><a class="header-anchor" href="#_10、显示职工" aria-hidden="true">#</a> 10、显示职工</h2><p>功能描述：显示当前所有职工信息</p><h4 id="_10-1-显示职工函数声明" tabindex="-1"><a class="header-anchor" href="#_10-1-显示职工函数声明" aria-hidden="true">#</a> 10.1 显示职工函数声明</h4><p>在workerManager.h中添加成员函数 <code>void Show_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//显示职工
void Show_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-2-显示职工函数实现" tabindex="-1"><a class="header-anchor" href="#_10-2-显示职工函数实现" aria-hidden="true">#</a> 10.2 显示职工函数实现</h4><p>在workerManager.cpp中实现成员函数 <code>void Show_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//显示职工
void WorkerManager::Show_Emp()
{
	if (this-&gt;m_FileIsEmpty)
	{
		cout &lt;&lt; &quot;文件不存在或记录为空！&quot; &lt;&lt; endl;
	}
	else
	{
		for (int i = 0; i &lt; m_EmpNum; i++)
		{
			//利用多态调用接口
			this-&gt;m_EmpArray[i]-&gt;showInfo();
		}
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-3-测试显示职工" tabindex="-1"><a class="header-anchor" href="#_10-3-测试显示职工" aria-hidden="true">#</a> 10.3 测试显示职工</h4><p>在main函数分支 2 选项中，调用显示职工接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546497336465.png" alt="1546497336465" tabindex="0" loading="lazy"><figcaption>1546497336465</figcaption></figure><p>测试时分别测试 文件为空和文件不为空两种情况</p><p>测试效果：</p><p>测试1-文件不存在或者为空情况</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546497082135.png" alt="1546497082135" tabindex="0" loading="lazy"><figcaption>1546497082135</figcaption></figure><p>测试2 - 文件存在且有记录情况</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546496947671.png" alt="1546496947671" tabindex="0" loading="lazy"><figcaption>1546496947671</figcaption></figure><p>测试完毕，至此，显示所有职工信息功能实现</p><h2 id="_11、删除职工" tabindex="-1"><a class="header-anchor" href="#_11、删除职工" aria-hidden="true">#</a> 11、删除职工</h2><p>功能描述：按照职工的编号进行删除职工操作</p><h4 id="_11-1-删除职工函数声明" tabindex="-1"><a class="header-anchor" href="#_11-1-删除职工函数声明" aria-hidden="true">#</a> 11.1 删除职工函数声明</h4><p>在workerManager.h中添加成员函数 <code>void Del_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//删除职工
void Del_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-2-职工是否存在函数声明" tabindex="-1"><a class="header-anchor" href="#_11-2-职工是否存在函数声明" aria-hidden="true">#</a> 11.2 职工是否存在函数声明</h4><p>很多功能都需要用到根据职工是否存在来进行操作如：删除职工、修改职工、查找职工</p><p>因此添加该公告函数，以便后续调用</p><p>在workerManager.h中添加成员函数 <code>int IsExist(int id);</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//按照职工编号判断职工是否存在,若存在返回职工在数组中位置，不存在返回-1
int IsExist(int id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-3-职工是否存在函数实现" tabindex="-1"><a class="header-anchor" href="#_11-3-职工是否存在函数实现" aria-hidden="true">#</a> 11.3 职工是否存在函数实现</h4><p>在workerManager.cpp中实现成员函数 <code>int IsExist(int id);</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int WorkerManager::IsExist(int id)
{
	int index = -1;

	for (int i = 0; i &lt; this-&gt;m_EmpNum; i++)
	{
		if (this-&gt;m_EmpArray[i]-&gt;m_Id == id)
		{
			index = i;

			break;
		}
	}

	return index;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-4-删除职工函数实现" tabindex="-1"><a class="header-anchor" href="#_11-4-删除职工函数实现" aria-hidden="true">#</a> 11.4 删除职工函数实现</h4><p>在workerManager.cpp中实现成员函数 <code> void Del_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//删除职工
void WorkerManager::Del_Emp()
{
	if (this-&gt;m_FileIsEmpty)
	{
		cout &lt;&lt; &quot;文件不存在或记录为空！&quot; &lt;&lt; endl;
	}
	else
	{
		//按职工编号删除
		cout &lt;&lt; &quot;请输入想要删除的职工号：&quot; &lt;&lt; endl;
		int id = 0;
		cin &gt;&gt; id;

		int index = this-&gt;IsExist(id);

		if (index != -1)  //说明index上位置数据需要删除
		{
			for (int i = index; i &lt; this-&gt;m_EmpNum - 1; i++)
			{
				this-&gt;m_EmpArray[i] = this-&gt;m_EmpArray[i + 1];
			}
			this-&gt;m_EmpNum--;

			this-&gt;save(); //删除后数据同步到文件中
			cout &lt;&lt; &quot;删除成功！&quot; &lt;&lt; endl;
		}
		else
		{
			cout &lt;&lt; &quot;删除失败，未找到该职工&quot; &lt;&lt; endl;
		}
	}
	
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_11-5-测试删除职工" tabindex="-1"><a class="header-anchor" href="#_11-5-测试删除职工" aria-hidden="true">#</a> 11.5 测试删除职工</h4><p>在main函数分支 3 选项中，调用删除职工接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546502698622.png" alt="1546502698622" tabindex="0" loading="lazy"><figcaption>1546502698622</figcaption></figure><p>测试1 - 删除不存在职工情况</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546500324196.png" alt="1546500324196" tabindex="0" loading="lazy"><figcaption>1546500324196</figcaption></figure><p>测试2 - 删除存在的职工情况</p><p>删除成功提示图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546500350526.png" alt="1546500350526" tabindex="0" loading="lazy"><figcaption>1546500350526</figcaption></figure><p>再次显示所有职工信息，确保已经删除</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546500361889.png" alt="1546500361889" tabindex="0" loading="lazy"><figcaption>1546500361889</figcaption></figure><p>查看文件中信息，再次核实员工已被完全删除</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546500383570.png" alt="1546500383570" tabindex="0" loading="lazy"><figcaption>1546500383570</figcaption></figure><p>至此，删除职工功能实现完毕！</p><h2 id="_12、修改职工" tabindex="-1"><a class="header-anchor" href="#_12、修改职工" aria-hidden="true">#</a> 12、修改职工</h2><p>功能描述：能够按照职工的编号对职工信息进行修改并保存</p><h4 id="_12-1-修改职工函数声明" tabindex="-1"><a class="header-anchor" href="#_12-1-修改职工函数声明" aria-hidden="true">#</a> 12.1 修改职工函数声明</h4><p>在workerManager.h中添加成员函数 <code>void Mod_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//修改职工
void Mod_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_12-2-修改职工函数实现" tabindex="-1"><a class="header-anchor" href="#_12-2-修改职工函数实现" aria-hidden="true">#</a> 12.2 修改职工函数实现</h4><p>在workerManager.cpp中实现成员函数 <code> void Mod_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//修改职工
void WorkerManager::Mod_Emp()
{
	if (this-&gt;m_FileIsEmpty)
	{
		cout &lt;&lt; &quot;文件不存在或记录为空！&quot; &lt;&lt; endl;
	}
	else
	{
		cout &lt;&lt; &quot;请输入修改职工的编号：&quot; &lt;&lt; endl;
		int id;
		cin &gt;&gt; id;

		int ret = this-&gt;IsExist(id);
		if (ret != -1)
		{ 
			//查找到编号的职工

			delete this-&gt;m_EmpArray[ret];
			
			int newId = 0;
			string newName = &quot;&quot;;
			int dSelect = 0;

			cout &lt;&lt; &quot;查到： &quot; &lt;&lt; id &lt;&lt; &quot;号职工，请输入新职工号： &quot; &lt;&lt; endl;
			cin &gt;&gt; newId;

			cout &lt;&lt; &quot;请输入新姓名： &quot; &lt;&lt; endl;
			cin &gt;&gt; newName;

			cout &lt;&lt; &quot;请输入岗位： &quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;1、普通职工&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;2、经理&quot; &lt;&lt; endl;
			cout &lt;&lt; &quot;3、老板&quot; &lt;&lt; endl;
			cin &gt;&gt; dSelect;

			Worker * worker = NULL;
			switch (dSelect)
			{
			case1:
				worker = new Employee(newId, newName, dSelect);
				break;
			case2:
				worker = new Manager(newId, newName, dSelect);
				break;
			case 3:
				worker = new Boss(newId, newName, dSelect);
				break;
			default:
				break;
			}

			//更改数据 到数组中
			this-&gt;m_EmpArray[ret]= worker;
			
			cout &lt;&lt; &quot;修改成功！&quot; &lt;&lt; endl;

			//保存到文件中
			this-&gt;save();
		}
		else
		{
			cout &lt;&lt; &quot;修改失败，查无此人&quot; &lt;&lt; endl;
		}
	}

	//按任意键 清屏
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_12-3-测试修改职工" tabindex="-1"><a class="header-anchor" href="#_12-3-测试修改职工" aria-hidden="true">#</a> 12.3 测试修改职工</h4><p>在main函数分支 4 选项中，调用修改职工接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546502651922.png" alt="1546502651922" tabindex="0" loading="lazy"><figcaption>1546502651922</figcaption></figure><p>测试1 - 修改不存在职工情况</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546502759643.png" alt="1546502759643" tabindex="0" loading="lazy"><figcaption>1546502759643</figcaption></figure><p>测试2 - 修改存在职工情况，例如将职工 &quot;李四&quot; 改为 &quot;赵四&quot;</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546502830350.png" alt="1546502830350" tabindex="0" loading="lazy"><figcaption>1546502830350</figcaption></figure><p>修改后再次查看所有职工信息，并确认修改成功</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546502865443.png" alt="1546502865443" tabindex="0" loading="lazy"><figcaption>1546502865443</figcaption></figure><p>再次确认文件中信息也同步更新</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546502898653.png" alt="1546502898653" tabindex="0" loading="lazy"><figcaption>1546502898653</figcaption></figure><p>至此，修改职工功能已实现！</p><h2 id="_13、查找职工" tabindex="-1"><a class="header-anchor" href="#_13、查找职工" aria-hidden="true">#</a> 13、查找职工</h2><p>功能描述：提供两种查找职工方式，一种按照职工编号，一种按照职工姓名</p><h4 id="_13-1-查找职工函数声明" tabindex="-1"><a class="header-anchor" href="#_13-1-查找职工函数声明" aria-hidden="true">#</a> 13.1 查找职工函数声明</h4><p>在workerManager.h中添加成员函数 <code>void Find_Emp();</code></p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//查找职工
void Find_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_13-2-查找职工函数实现" tabindex="-1"><a class="header-anchor" href="#_13-2-查找职工函数实现" aria-hidden="true">#</a> 13.2 查找职工函数实现</h4><p>在workerManager.cpp中实现成员函数 <code> void Find_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//查找职工
void WorkerManager::Find_Emp()
{
	if (this-&gt;m_FileIsEmpty)
	{
		cout &lt;&lt; &quot;文件不存在或记录为空！&quot; &lt;&lt; endl;
	}
	else
	{
		cout &lt;&lt; &quot;请输入查找的方式：&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;1、按职工编号查找&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;2、按姓名查找&quot; &lt;&lt; endl;

		int select = 0;
		cin &gt;&gt; select;


		if (select == 1) //按职工号查找
		{
			int id;
			cout &lt;&lt; &quot;请输入查找的职工编号：&quot; &lt;&lt; endl;
			cin &gt;&gt; id;

			int ret = IsExist(id);
			if (ret != -1)
			{
				cout &lt;&lt; &quot;查找成功！该职工信息如下：&quot; &lt;&lt; endl;
				this-&gt;m_EmpArray[ret]-&gt;showInfo();
			}
			else
			{
				cout &lt;&lt; &quot;查找失败，查无此人&quot; &lt;&lt; endl;
			}
		}
		else if(select == 2) //按姓名查找
		{
			string name;
			cout &lt;&lt; &quot;请输入查找的姓名：&quot; &lt;&lt; endl;
			cin &gt;&gt; name;

			bool flag = false;  //查找到的标志
			for (int i = 0; i &lt; m_EmpNum; i++)
			{
				if (m_EmpArray[i]-&gt;m_Name == name)
				{
					cout &lt;&lt; &quot;查找成功,职工编号为：&quot;
                           &lt;&lt; m_EmpArray[i]-&gt;m_Id
                           &lt;&lt; &quot; 号的信息如下：&quot; &lt;&lt; endl;
					
					flag = true;

					this-&gt;m_EmpArray[i]-&gt;showInfo();
				}
			}
			if (flag == false)
			{
				//查无此人
				cout &lt;&lt; &quot;查找失败，查无此人&quot; &lt;&lt; endl;
			}
		}
		else
		{
			cout &lt;&lt; &quot;输入选项有误&quot; &lt;&lt; endl;
		}
	}


	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_13-3-测试查找职工" tabindex="-1"><a class="header-anchor" href="#_13-3-测试查找职工" aria-hidden="true">#</a> 13.3 测试查找职工</h4><p>在main函数分支 5 选项中，调用查找职工接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546504714318.png" alt="1546504714318" tabindex="0" loading="lazy"><figcaption>1546504714318</figcaption></figure><p>测试1 - 按照职工编号查找 - 查找不存在职工</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546504767229.png" alt="1546504767229" tabindex="0" loading="lazy"><figcaption>1546504767229</figcaption></figure><p>测试2 - 按照职工编号查找 - 查找存在职工</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546505046521.png" alt="1546505046521" tabindex="0" loading="lazy"><figcaption>1546505046521</figcaption></figure><p>测试3 - 按照职工姓名查找 - 查找不存在职工</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546505115610.png" alt="1546505115610" tabindex="0" loading="lazy"><figcaption>1546505115610</figcaption></figure><p>测试4 - 按照职工姓名查找 - 查找存在职工（如果出现重名，也一并显示，在文件中可以添加重名职工）</p><p>例如 添加两个王五的职工，然后按照姓名查找王五</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546507850441.png" alt="1546507850441" tabindex="0" loading="lazy"><figcaption>1546507850441</figcaption></figure><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546507760284.png" alt="1546507760284" tabindex="0" loading="lazy"><figcaption>1546507760284</figcaption></figure><p>至此，查找职工功能实现完毕！</p><h2 id="_14、排序" tabindex="-1"><a class="header-anchor" href="#_14、排序" aria-hidden="true">#</a> 14、排序</h2><p>功能描述：按照职工编号进行排序，排序的顺序由用户指定</p><h4 id="_14-1-排序函数声明" tabindex="-1"><a class="header-anchor" href="#_14-1-排序函数声明" aria-hidden="true">#</a> 14.1 排序函数声明</h4><p>在workerManager.h中添加成员函数 <code>void Sort_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//排序职工
void Sort_Emp();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-2-排序函数实现" tabindex="-1"><a class="header-anchor" href="#_14-2-排序函数实现" aria-hidden="true">#</a> 14.2 排序函数实现</h4><p>在workerManager.cpp中实现成员函数 <code> void Sort_Emp();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//排序职工
void WorkerManager::Sort_Emp()
{
	if (this-&gt;m_FileIsEmpty)
	{
		cout &lt;&lt; &quot;文件不存在或记录为空！&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
	}
	else
	{
		cout &lt;&lt; &quot;请选择排序方式： &quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;1、按职工号进行升序&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;2、按职工号进行降序&quot; &lt;&lt; endl;

		int select = 0;
		cin &gt;&gt; select;


		for (int i = 0; i &lt; m_EmpNum; i++)
		{
			int minOrMax = i;
			for (int j = i + 1; j &lt; m_EmpNum; j++)
			{
				if (select == 1) //升序
				{
					if (m_EmpArray[minOrMax]-&gt;m_Id &gt; m_EmpArray[j]-&gt;m_Id)
					{
						minOrMax = j;
					}
				}
				else  //降序
				{
					if (m_EmpArray[minOrMax]-&gt;m_Id &lt; m_EmpArray[j]-&gt;m_Id)
					{
						minOrMax = j;
					}
				}
			}

			if (i != minOrMax)
			{
				Worker * temp = m_EmpArray[i];
				m_EmpArray[i] = m_EmpArray[minOrMax];
				m_EmpArray[minOrMax] = temp;
			}

		}

		cout &lt;&lt; &quot;排序成功,排序后结果为：&quot; &lt;&lt; endl;
		this-&gt;save();
		this-&gt;Show_Emp();
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-3-测试排序功能" tabindex="-1"><a class="header-anchor" href="#_14-3-测试排序功能" aria-hidden="true">#</a> 14.3 测试排序功能</h4><p>在main函数分支 6 选项中，调用排序职工接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546510145181.png" alt="1546510145181" tabindex="0" loading="lazy"><figcaption>1546510145181</figcaption></figure><p>测试：</p><p>首先我们添加一些职工，序号是无序的，例如：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546658169987.png" alt="1546658169987" tabindex="0" loading="lazy"><figcaption>1546658169987</figcaption></figure><p>测试 - 升序排序</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546658190479.png" alt="1546658190479" tabindex="0" loading="lazy"><figcaption>1546658190479</figcaption></figure><p>文件同步更新</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546658273581.png" alt="1546658273581" tabindex="0" loading="lazy"><figcaption>1546658273581</figcaption></figure><p>测试 - 降序排序</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546658288936.png" alt="1546658288936" tabindex="0" loading="lazy"><figcaption>1546658288936</figcaption></figure><p>文件同步更新</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546658313704.png" alt="1546658313704" tabindex="0" loading="lazy"><figcaption>1546658313704</figcaption></figure><p>至此，职工按照编号排序的功能实现完毕！</p><h2 id="_15、清空文件" tabindex="-1"><a class="header-anchor" href="#_15、清空文件" aria-hidden="true">#</a> 15、清空文件</h2><p>功能描述：将文件中记录数据清空</p><h4 id="_15-1-清空函数声明" tabindex="-1"><a class="header-anchor" href="#_15-1-清空函数声明" aria-hidden="true">#</a> 15.1 清空函数声明</h4><p>在workerManager.h中添加成员函数 <code>void Clean_File();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//清空文件
void Clean_File();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_15-2-清空函数实现" tabindex="-1"><a class="header-anchor" href="#_15-2-清空函数实现" aria-hidden="true">#</a> 15.2 清空函数实现</h4><p>在workerManager.cpp中实现员函数 <code> void Clean_File();</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//清空文件
void WorkerManager::Clean_File()
{
	cout &lt;&lt; &quot;确认清空？&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1、确认&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;2、返回&quot; &lt;&lt; endl;

	int select = 0;
	cin &gt;&gt; select;

	if (select == 1)
	{
		//打开模式 ios::trunc 如果存在删除文件并重新创建
		ofstream ofs(FILENAME, ios::trunc);
		ofs.close();

		if (this-&gt;m_EmpArray != NULL)
		{
            for (int i = 0; i &lt; this-&gt;m_EmpNum; i++)
			{
				if (this-&gt;m_EmpArray[i] != NULL)
				{
					delete this-&gt;m_EmpArray[i];
				}
			}
			this-&gt;m_EmpNum = 0;
			delete[] this-&gt;m_EmpArray;
			this-&gt;m_EmpArray = NULL;
			this-&gt;m_FileIsEmpty = true;
		}
		cout &lt;&lt; &quot;清空成功！&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_15-3-测试清空文件" tabindex="-1"><a class="header-anchor" href="#_15-3-测试清空文件" aria-hidden="true">#</a> 15.3 测试清空文件</h4><p>在main函数分支 7 选项中，调用清空文件接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546511085541.png" alt="1546511085541" tabindex="0" loading="lazy"><figcaption>1546511085541</figcaption></figure><p>测试：确认清空文件</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546510976745.png" alt="1546510976745" tabindex="0" loading="lazy"><figcaption>1546510976745</figcaption></figure><p>再次查看文件中数据，记录已为空</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546510994196.png" alt="1546510994196" tabindex="0" loading="lazy"><figcaption>1546510994196</figcaption></figure><p>打开文件，里面数据已确保清空，该功能需要慎用！</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1546511018517.png" alt="1546511018517" tabindex="0" loading="lazy"><figcaption>1546511018517</figcaption></figure><p>随着清空文件功能实现，本案例制作完毕 ^ _ ^</p>`,325),l=[d];function s(r,v){return e(),n("div",null,l)}const m=i(a,[["render",s],["__file","4.职工管理系统.html.vue"]]);export{m as default};
