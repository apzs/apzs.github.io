import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,e as t}from"./app-AMUHiwF7.js";const l={},s=t(`<h1 id="机房预约系统" tabindex="-1"><a class="header-anchor" href="#机房预约系统" aria-hidden="true">#</a> 机房预约系统</h1><h2 id="_1、机房预约系统需求" tabindex="-1"><a class="header-anchor" href="#_1、机房预约系统需求" aria-hidden="true">#</a> 1、机房预约系统需求</h2><h3 id="_1-1-系统简介" tabindex="-1"><a class="header-anchor" href="#_1-1-系统简介" aria-hidden="true">#</a> 1.1 系统简介</h3><ul><li>学校现有几个规格不同的机房，由于使用时经常出现&quot;撞车&quot;现象,现开发一套机房预约系统，解决这一问题。</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682783885.png" alt="1548682783885" tabindex="0" loading="lazy"><figcaption>1548682783885</figcaption></figure><h3 id="_1-2-身份简介" tabindex="-1"><a class="header-anchor" href="#_1-2-身份简介" aria-hidden="true">#</a> 1.2 身份简介</h3><p>分别有三种身份使用该程序</p><ul><li><strong>学生代表</strong>：申请使用机房</li><li><strong>教师</strong>：审核学生的预约申请</li><li><strong>管理员</strong>：给学生、教师创建账号</li></ul><h3 id="_1-3-机房简介" tabindex="-1"><a class="header-anchor" href="#_1-3-机房简介" aria-hidden="true">#</a> 1.3 机房简介</h3><p>机房总共有3间</p><ul><li>1号机房 --- 最大容量20人</li><li>2号机房 --- 最多容量50人</li><li>3号机房 --- 最多容量100人</li></ul><h3 id="_1-4-申请简介" tabindex="-1"><a class="header-anchor" href="#_1-4-申请简介" aria-hidden="true">#</a> 1.4 申请简介</h3><ul><li>申请的订单每周由管理员负责清空。</li><li>学生可以预约未来一周内的机房使用，预约的日期为周一至周五，预约时需要选择预约时段（上午、下午）</li><li>教师来审核预约，依据实际情况审核预约通过或者不通过</li></ul><h3 id="_1-5-系统具体需求" tabindex="-1"><a class="header-anchor" href="#_1-5-系统具体需求" aria-hidden="true">#</a> 1.5 系统具体需求</h3><ul><li>首先进入登录界面，可选登录身份有： <ul><li>学生代表</li><li>老师</li><li>管理员</li><li>退出</li></ul></li><li>每个身份都需要进行验证后，进入子菜单 <ul><li>学生需要输入 ：学号、姓名、登录密码</li><li>老师需要输入：职工号、姓名、登录密码</li><li>管理员需要输入：管理员姓名、登录密码</li></ul></li><li>学生具体功能 <ul><li>申请预约 --- 预约机房</li><li>查看自身的预约 --- 查看自己的预约状态</li><li>查看所有预约 --- 查看全部预约信息以及预约状态</li><li>取消预约 --- 取消自身的预约，预约成功或审核中的预约均可取消</li><li>注销登录 --- 退出登录</li></ul></li><li>教师具体功能 <ul><li>查看所有预约 --- 查看全部预约信息以及预约状态</li><li>审核预约 --- 对学生的预约进行审核</li><li>注销登录 --- 退出登录</li></ul></li><li>管理员具体功能 <ul><li>添加账号 --- 添加学生或教师的账号，需要检测学生编号或教师职工号是否重复</li><li>查看账号 --- 可以选择查看学生或教师的全部信息</li><li>查看机房 --- 查看所有机房的信息</li><li>清空预约 --- 清空所有预约记录</li><li>注销登录 --- 退出登录</li></ul></li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682206670.png" alt="1548682206670" tabindex="0" loading="lazy"><figcaption>1548682206670</figcaption></figure><h2 id="_2、创建项目" tabindex="-1"><a class="header-anchor" href="#_2、创建项目" aria-hidden="true">#</a> 2、创建项目</h2><p>创建项目步骤如下：</p><ul><li>创建新项目</li><li>添加文件</li></ul><h3 id="_2-1-创建项目" tabindex="-1"><a class="header-anchor" href="#_2-1-创建项目" aria-hidden="true">#</a> 2.1 创建项目</h3><ul><li>打开vs2017后，点击创建新项目，创建新的C++项目</li></ul><p>如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682413343.png" alt="1548682413343" tabindex="0" loading="lazy"><figcaption>1548682413343</figcaption></figure><ul><li>填写项目名称以及选取项目路径，点击确定生成项目</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682522544.png" alt="1548682522544" tabindex="0" loading="lazy"><figcaption>1548682522544</figcaption></figure><h3 id="_2-2-添加文件" tabindex="-1"><a class="header-anchor" href="#_2-2-添加文件" aria-hidden="true">#</a> 2.2 添加文件</h3><ul><li>右键源文件，进行添加文件操作</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682597721.png" alt="1548682597721" tabindex="0" loading="lazy"><figcaption>1548682597721</figcaption></figure><ul><li>填写文件名称，点击添加</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682679989.png" alt="1548682679989" tabindex="0" loading="lazy"><figcaption>1548682679989</figcaption></figure><ul><li>生成文件成功，效果如下图</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548682733912.png" alt="1548682733912" tabindex="0" loading="lazy"><figcaption>1548682733912</figcaption></figure><h2 id="_3、创建主菜单" tabindex="-1"><a class="header-anchor" href="#_3、创建主菜单" aria-hidden="true">#</a> 3、创建主菜单</h2><p><strong>功能描述：</strong></p><ul><li>设计主菜单，与用户进行交互</li></ul><h3 id="_3-1-菜单实现" tabindex="-1"><a class="header-anchor" href="#_3-1-菜单实现" aria-hidden="true">#</a> 3.1 菜单实现</h3><ul><li>在主函数main中添加菜单提示，代码如下：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int main() {

	cout &lt;&lt; &quot;======================  欢迎来到传智播客机房预约系统  =====================&quot; 
         &lt;&lt; endl;
	cout &lt;&lt; endl &lt;&lt; &quot;请输入您的身份&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;\\t\\t -------------------------------\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          1.学生代表           |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          2.老    师           |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          3.管 理 员           |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          0.退    出           |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t -------------------------------\\n&quot;;
	cout &lt;&lt; &quot;输入您的选择: &quot;;

	system(&quot;pause&quot;);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548557945611.png" alt="1548557945611" tabindex="0" loading="lazy"><figcaption>1548557945611</figcaption></figure><h3 id="_3-2-搭建接口" tabindex="-1"><a class="header-anchor" href="#_3-2-搭建接口" aria-hidden="true">#</a> 3.2 搭建接口</h3><ul><li>接受用户的选择，搭建接口</li><li>在main中添加代码</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int main() {

	int select = 0;

	while (true)
	{

		cout &lt;&lt; &quot;======================  欢迎来到传智播客机房预约系统  =====================&quot; &lt;&lt; endl;
		cout &lt;&lt; endl &lt;&lt; &quot;请输入您的身份&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;\\t\\t -------------------------------\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|          1.学生代表           |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|          2.老    师           |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|          3.管 理 员           |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|          0.退    出           |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t|                               |\\n&quot;;
		cout &lt;&lt; &quot;\\t\\t -------------------------------\\n&quot;;
		cout &lt;&lt; &quot;输入您的选择: &quot;;

		cin &gt;&gt; select; //接受用户选择

		switch (select)
		{
		case 1:  //学生身份
			break;
		case 2:  //老师身份
			break;
		case 3:  //管理员身份
			break;
		case 0:  //退出系统
			break;
		default:
             cout &lt;&lt; &quot;输入有误，请重新选择！&quot; &lt;&lt; endl;
		    system(&quot;pause&quot;);
			system(&quot;cls&quot;);
			break;
		}

	}
	system(&quot;pause&quot;);
	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，输入0、1、2、3会重新回到界面，输入其他提示输入有误，清屏后重新选择</p><p>效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548558694230.png" alt="1548558694230" tabindex="0" loading="lazy"><figcaption>1548558694230</figcaption></figure><p>至此，界面搭建完毕</p><h2 id="_4、-退出功能实现" tabindex="-1"><a class="header-anchor" href="#_4、-退出功能实现" aria-hidden="true">#</a> 4、 退出功能实现</h2><h3 id="_4-1-退出功能实现" tabindex="-1"><a class="header-anchor" href="#_4-1-退出功能实现" aria-hidden="true">#</a> 4.1 退出功能实现</h3><p>在main函数分支 0 选项中，添加退出程序的代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>cout &lt;&lt; &quot;欢迎下一次使用&quot;&lt;&lt;endl;
system(&quot;pause&quot;);
return 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548558992754.png" alt="1548558992754" tabindex="0" loading="lazy"><figcaption>1548558992754</figcaption></figure><h3 id="_4-2-测试退出功能" tabindex="-1"><a class="header-anchor" href="#_4-2-测试退出功能" aria-hidden="true">#</a> 4.2 测试退出功能</h3><p>运行程序，效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548559026436.png" alt="1548559026436" tabindex="0" loading="lazy"><figcaption>1548559026436</figcaption></figure><p>至此，退出程序功能实现</p><h2 id="_5、-创建身份类" tabindex="-1"><a class="header-anchor" href="#_5、-创建身份类" aria-hidden="true">#</a> 5、 创建身份类</h2><h3 id="_5-1-身份的基类" tabindex="-1"><a class="header-anchor" href="#_5-1-身份的基类" aria-hidden="true">#</a> 5.1 身份的基类</h3><ul><li>在整个系统中，有三种身份，分别为：学生代表、老师以及管理员</li><li>三种身份有其共性也有其特性，因此我们可以将三种身份抽象出一个身份基类<strong>identity</strong></li><li>在头文件下创建Identity.h文件</li></ul><p>Identity.h中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;

//身份抽象类
class Identity
{
public:

	//操作菜单
	virtual void operMenu() = 0;

	string m_Name; //用户名
	string m_Pwd;  //密码
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548573329273.png" alt="1548573329273" tabindex="0" loading="lazy"><figcaption>1548573329273</figcaption></figure><h3 id="_5-2-学生类" tabindex="-1"><a class="header-anchor" href="#_5-2-学生类" aria-hidden="true">#</a> 5.2 学生类</h3><h4 id="_5-2-1-功能分析" tabindex="-1"><a class="header-anchor" href="#_5-2-1-功能分析" aria-hidden="true">#</a> 5.2.1 功能分析</h4><ul><li><p>学生类主要功能是可以通过类中成员函数，实现预约实验室操作</p></li><li><p>学生类中主要功能有：</p><ul><li>显示学生操作的菜单界面</li><li>申请预约</li><li>查看自身预约</li><li>查看所有预约</li><li>取消预约</li></ul></li></ul><h4 id="_5-2-2-类的创建" tabindex="-1"><a class="header-anchor" href="#_5-2-2-类的创建" aria-hidden="true">#</a> 5.2.2 类的创建</h4><ul><li>在头文件以及源文件下创建 student.h 和 student.cpp文件</li></ul><p>student.h中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;
#include &quot;identity.h&quot;

//学生类
class Student :public Identity
{
public:
	//默认构造
	Student();

	//有参构造(学号、姓名、密码)
	Student(int id, string name, string pwd);

	//菜单界面
	virtual void operMenu(); 

	//申请预约
	void applyOrder(); 

	//查看我的预约
	void showMyOrder(); 

	//查看所有预约
	void showAllOrder(); 

	//取消预约
	void cancelOrder();
	
	//学生学号
	int m_Id;

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>student.cpp中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;student.h&quot;

//默认构造
Student::Student()
{
}

//有参构造(学号、姓名、密码)
Student::Student(int id, string name, string pwd)
{
}

//菜单界面
void Student::operMenu()
{
}

//申请预约
void Student::applyOrder()
{

}

//查看我的预约
void Student::showMyOrder()
{

}

//查看所有预约
void Student::showAllOrder()
{

}

//取消预约
void Student::cancelOrder()
{

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-老师类" tabindex="-1"><a class="header-anchor" href="#_5-3-老师类" aria-hidden="true">#</a> 5.3 老师类</h3><h4 id="_5-3-1-功能分析" tabindex="-1"><a class="header-anchor" href="#_5-3-1-功能分析" aria-hidden="true">#</a> 5.3.1 功能分析</h4><ul><li><p>教师类主要功能是查看学生的预约，并进行审核</p></li><li><p>教师类中主要功能有：</p><ul><li><p>显示教师操作的菜单界面</p></li><li><p>查看所有预约</p></li><li><p>审核预约</p></li></ul></li></ul><h4 id="_5-3-2-类的创建" tabindex="-1"><a class="header-anchor" href="#_5-3-2-类的创建" aria-hidden="true">#</a> 5.3.2 类的创建</h4><ul><li>在头文件以及源文件下创建 teacher.h 和 teacher.cpp文件</li></ul><p>teacher.h中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#define _CRT_SECURE_NO_WARNINGS
#include&lt;iostream&gt;
using namespace std;
#include &quot;identity.h&quot;

class Teacher :public Identity
{
public:

	//默认构造
	Teacher();

	//有参构造 (职工编号，姓名，密码)
	Teacher(int empId, string name, string pwd);

	//菜单界面
	virtual void operMenu();

	//查看所有预约
	void showAllOrder(); 

	//审核预约
	void validOrder(); 

	int m_EmpId; //教师编号

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>teacher.cpp中添加如下代码:</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include&quot;teacher.h&quot;

//默认构造
Teacher::Teacher()
{
}

//有参构造 (职工编号，姓名，密码)
Teacher::Teacher(int empId, string name, string pwd)
{
}

//菜单界面
void Teacher::operMenu()
{
}

//查看所有预约
void Teacher::showAllOrder()
{
}

//审核预约
void Teacher::validOrder()
{
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-管理员类" tabindex="-1"><a class="header-anchor" href="#_5-4-管理员类" aria-hidden="true">#</a> 5.4 管理员类</h3><h4 id="_5-4-1-功能分析" tabindex="-1"><a class="header-anchor" href="#_5-4-1-功能分析" aria-hidden="true">#</a> 5.4.1 功能分析</h4><ul><li><p>管理员类主要功能是对学生和老师账户进行管理，查看机房信息以及清空预约记录</p></li><li><p>管理员类中主要功能有：</p><ul><li><p>显示管理员操作的菜单界面</p></li><li><p>添加账号</p></li><li><p>查看账号</p></li><li><p>查看机房信息</p></li><li><p>清空预约记录</p></li></ul></li></ul><h4 id="_5-4-2-类的创建" tabindex="-1"><a class="header-anchor" href="#_5-4-2-类的创建" aria-hidden="true">#</a> 5.4.2 类的创建</h4><ul><li>在头文件以及源文件下创建 manager.h 和 manager.cpp文件</li></ul><p>manager.h中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;
#include &quot;identity.h&quot;

class Manager :public Identity
{
public:

	//默认构造
	Manager();

	//有参构造  管理员姓名，密码
	Manager(string name, string pwd);

	//选择菜单
	virtual void operMenu();

	//添加账号  
	void addPerson();

	//查看账号
	void showPerson();

	//查看机房信息
	void showComputer();

	//清空预约记录
	void cleanFile();

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>manager.cpp中添加如下代码:</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;manager.h&quot;

//默认构造
Manager::Manager()
{
}

//有参构造
Manager::Manager(string name, string pwd)
{
}

//选择菜单
void Manager::operMenu()
{
}

//添加账号  
void Manager::addPerson()
{
}

//查看账号
void Manager::showPerson()
{
}

//查看机房信息
void Manager::showComputer()
{
}

//清空预约记录
void Manager::cleanFile()
{
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，所有身份类创建完毕，效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548574390768.png" alt="1548574390768" tabindex="0" loading="lazy"><figcaption>1548574390768</figcaption></figure><h2 id="_6、-登录模块" tabindex="-1"><a class="header-anchor" href="#_6、-登录模块" aria-hidden="true">#</a> 6、 登录模块</h2><h3 id="_6-1-全局文件添加" tabindex="-1"><a class="header-anchor" href="#_6-1-全局文件添加" aria-hidden="true">#</a> 6.1 全局文件添加</h3><p>功能描述：</p><ul><li>不同的身份可能会用到不同的文件操作，我们可以将所有的文件名定义到一个全局的文件中</li><li>在头文件中添加 <strong>globalFile.h</strong> 文件</li><li>并添加如下代码：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once 

//管理员文件
#define ADMIN_FILE     &quot;admin.txt&quot;
//学生文件
#define STUDENT_FILE   &quot;student.txt&quot;
//教师文件
#define TEACHER_FILE   &quot;teacher.txt&quot;
//机房信息文件
#define COMPUTER_FILE  &quot;computerRoom.txt&quot;
//订单文件
#define ORDER_FILE     &quot;order.txt&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并且在同级目录下，创建这几个文件</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548575650130.png" alt="1548575650130" tabindex="0" loading="lazy"><figcaption>1548575650130</figcaption></figure><h3 id="_6-2-登录函数封装" tabindex="-1"><a class="header-anchor" href="#_6-2-登录函数封装" aria-hidden="true">#</a> 6.2 登录函数封装</h3><p>功能描述：</p><ul><li>根据用户的选择，进入不同的身份登录</li></ul><p>在预约系统的.cpp文件中添加全局函数 <code>void LoginIn(string fileName, int type)</code></p><p>参数：</p><ul><li>fileName --- 操作的文件名</li><li>type --- 登录的身份 （1代表学生、2代表老师、3代表管理员）</li></ul><p>LoginIn中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &quot;globalFile.h&quot;
#include &quot;identity.h&quot;
#include &lt;fstream&gt;
#include &lt;string&gt;


//登录功能
void LoginIn(string fileName, int type)
{

	Identity * person = NULL;

	ifstream ifs;
	ifs.open(fileName, ios::in);

	//文件不存在情况
	if (!ifs.is_open())
	{
		cout &lt;&lt; &quot;文件不存在&quot; &lt;&lt; endl;
		ifs.close();
		return;
	}

	int id = 0;
	string name;
	string pwd;

	if (type == 1)	//学生登录
	{
		cout &lt;&lt; &quot;请输入你的学号&quot; &lt;&lt; endl;
		cin &gt;&gt; id;
	}
	else if (type == 2) //教师登录
	{
		cout &lt;&lt; &quot;请输入你的职工号&quot; &lt;&lt; endl;
		cin &gt;&gt; id;
	}

	cout &lt;&lt; &quot;请输入用户名：&quot; &lt;&lt; endl;
	cin &gt;&gt; name;

	cout &lt;&lt; &quot;请输入密码： &quot; &lt;&lt; endl;
	cin &gt;&gt; pwd;


	if (type == 1)
	{
		//学生登录验证
	}
	else if (type == 2)
	{
		//教师登录验证
	}
	else if(type == 3)
	{
		//管理员登录验证
	}
	
	cout &lt;&lt; &quot;验证登录失败!&quot; &lt;&lt; endl;

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
	return;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在main函数的不同分支中，填入不同的登录接口</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548575945985.png" alt="1548575945985" tabindex="0" loading="lazy"><figcaption>1548575945985</figcaption></figure><h3 id="_6-3-学生登录实现" tabindex="-1"><a class="header-anchor" href="#_6-3-学生登录实现" aria-hidden="true">#</a> 6.3 学生登录实现</h3><p>在student.txt文件中添加两条学生信息，用于测试</p><p>添加信息:</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>1 张三 123
2 李四 123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p><ul><li>第一列 代表 <strong>学号</strong></li><li>第二列 代表 <strong>学生姓名</strong></li><li>第三列 代表 <strong>密码</strong></li></ul><p>效果图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548583693555.png" alt="1548583693555" tabindex="0" loading="lazy"><figcaption>1548583693555</figcaption></figure><p>在Login函数的学生分支中加入如下代码，验证学生身份</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//学生登录验证
int fId;
string fName;
string fPwd;
while (ifs &gt;&gt; fId &amp;&amp; ifs &gt;&gt; fName &amp;&amp; ifs &gt;&gt; fPwd)
{
    if (id == fId &amp;&amp; name == fName &amp;&amp; pwd == fPwd)
    {
        cout &lt;&lt; &quot;学生验证登录成功!&quot; &lt;&lt; endl;
        system(&quot;pause&quot;);
        system(&quot;cls&quot;);
        person = new Student(id, name, pwd);

        return;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加代码效果图</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548583915819.png" alt="1548583915819" tabindex="0" loading="lazy"><figcaption>1548583915819</figcaption></figure><p>测试：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548583950828.png" alt="1548583950828" tabindex="0" loading="lazy"><figcaption>1548583950828</figcaption></figure><h3 id="_6-4-教师登录实现" tabindex="-1"><a class="header-anchor" href="#_6-4-教师登录实现" aria-hidden="true">#</a> 6.4 教师登录实现</h3><p>在teacher.txt文件中添加一条老师信息，用于测试</p><p>添加信息:</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>1 老王 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中：</p><ul><li>第一列 代表 <strong>教师职工编号</strong></li><li>第二列 代表 <strong>教师姓名</strong></li><li>第三列 代表 <strong>密码</strong></li></ul><p>效果图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548584030522.png" alt="1548584030522" tabindex="0" loading="lazy"><figcaption>1548584030522</figcaption></figure><p>在Login函数的教师分支中加入如下代码，验证教师身份</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//教师登录验证
int fId;
string fName;
string fPwd;
while (ifs &gt;&gt; fId &amp;&amp; ifs &gt;&gt; fName &amp;&amp; ifs &gt;&gt; fPwd)
{
    if (id == fId &amp;&amp; name == fName &amp;&amp; pwd == fPwd)
    {
        cout &lt;&lt; &quot;教师验证登录成功!&quot; &lt;&lt; endl;
        system(&quot;pause&quot;);
        system(&quot;cls&quot;);
        person = new Teacher(id, name, pwd);
        return;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加代码效果图</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548584158339.png" alt="1548584158339" tabindex="0" loading="lazy"><figcaption>1548584158339</figcaption></figure><p>测试：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548584177003.png" alt="1548584177003" tabindex="0" loading="lazy"><figcaption>1548584177003</figcaption></figure><h3 id="_6-5-管理员登录实现" tabindex="-1"><a class="header-anchor" href="#_6-5-管理员登录实现" aria-hidden="true">#</a> 6.5 管理员登录实现</h3><p>在admin.txt文件中添加一条管理员信息，由于我们只有一条管理员，因此本案例中没有添加管理员的功能</p><p>添加信息:</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>admin 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中：<code>admin</code>代表管理员用户名，<code>123</code>代表管理员密码</p><p>效果图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548577855190.png" alt="1548577855190" tabindex="0" loading="lazy"><figcaption>1548577855190</figcaption></figure><p>在Login函数的管理员分支中加入如下代码，验证管理员身份</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//管理员登录验证
string fName;
string fPwd;
while (ifs &gt;&gt; fName &amp;&amp; ifs &gt;&gt; fPwd)
{
    if (name == fName &amp;&amp; pwd == fPwd)
    {
        cout &lt;&lt; &quot;验证登录成功!&quot; &lt;&lt; endl;
        //登录成功后，按任意键进入管理员界面
        system(&quot;pause&quot;);
        system(&quot;cls&quot;);
        //创建管理员对象
        person = new Manager(name,pwd);
        return;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548588322712.png" alt="1548588322712" tabindex="0" loading="lazy"><figcaption>1548588322712</figcaption></figure><p>测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548583245072.png" alt="1548583245072" tabindex="0" loading="lazy"><figcaption>1548583245072</figcaption></figure><p>至此，所有身份的登录功能全部实现！</p><h2 id="_7、-管理员模块" tabindex="-1"><a class="header-anchor" href="#_7、-管理员模块" aria-hidden="true">#</a> 7、 管理员模块</h2><h3 id="_7-1-管理员登录和注销" tabindex="-1"><a class="header-anchor" href="#_7-1-管理员登录和注销" aria-hidden="true">#</a> 7.1 管理员登录和注销</h3><h4 id="_7-1-1-构造函数" tabindex="-1"><a class="header-anchor" href="#_7-1-1-构造函数" aria-hidden="true">#</a> 7.1.1 构造函数</h4><ul><li>在Manager类的构造函数中，初始化管理员信息，代码如下：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//有参构造
Manager::Manager(string name, string pwd)
{
	this-&gt;m_Name = name;
	this-&gt;m_Pwd = pwd;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-1-2-管理员子菜单" tabindex="-1"><a class="header-anchor" href="#_7-1-2-管理员子菜单" aria-hidden="true">#</a> 7.1.2 管理员子菜单</h4><ul><li>在机房预约系统.cpp中，当用户登录的是管理员，添加管理员菜单接口</li><li>将不同的分支提供出来 <ul><li>添加账号</li><li>查看账号</li><li>查看机房</li><li>清空预约</li><li>注销登录</li></ul></li><li>实现注销功能</li></ul><p>添加全局函数 <code>void managerMenu(Identity * &amp;manager)</code>，代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//管理员菜单
void managerMenu(Identity * &amp;manager)
{
	while (true)
	{
		//管理员菜单
		manager-&gt;operMenu();

		Manager* man = (Manager*)manager;
		int select = 0;

		cin &gt;&gt; select;
        
		if (select == 1)  //添加账号
		{
			cout &lt;&lt; &quot;添加账号&quot; &lt;&lt; endl;
			man-&gt;addPerson();
		}
		else if (select == 2) //查看账号
		{
			cout &lt;&lt; &quot;查看账号&quot; &lt;&lt; endl;
			man-&gt;showPerson(); 
		}
		else if (select == 3) //查看机房
		{
			cout &lt;&lt; &quot;查看机房&quot; &lt;&lt; endl;
			man-&gt;showComputer();
		}
		else if (select == 4) //清空预约
		{
			cout &lt;&lt; &quot;清空预约&quot; &lt;&lt; endl;
			man-&gt;cleanFile();
		}
		else
		{
			delete manager;
			cout &lt;&lt; &quot;注销成功&quot; &lt;&lt; endl;
			system(&quot;pause&quot;);
			system(&quot;cls&quot;);
			return;
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-1-3-菜单功能实现" tabindex="-1"><a class="header-anchor" href="#_7-1-3-菜单功能实现" aria-hidden="true">#</a> 7.1.3 菜单功能实现</h4><ul><li>在实现成员函数<code>void Manager::operMenu()</code> 代码如下：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//选择菜单
void Manager::operMenu()
{
	cout &lt;&lt; &quot;欢迎管理员：&quot;&lt;&lt;this-&gt;m_Name &lt;&lt; &quot;登录！&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;\\t\\t ---------------------------------\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          1.添加账号            |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          2.查看账号            |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          3.查看机房            |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          4.清空预约            |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          0.注销登录            |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t ---------------------------------\\n&quot;;
	cout &lt;&lt; &quot;请选择您的操作： &quot; &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-1-4-接口对接" tabindex="-1"><a class="header-anchor" href="#_7-1-4-接口对接" aria-hidden="true">#</a> 7.1.4 接口对接</h4><ul><li>管理员成功登录后，调用管理员子菜单界面</li><li>在管理员登录验证分支中，添加代码：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>				//进入管理员子菜单
				managerMenu(person);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加效果如：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548589297779.png" alt="1548589297779" tabindex="0" loading="lazy"><figcaption>1548589297779</figcaption></figure><p>测试对接，效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548589344206.png" alt="1548589344206" tabindex="0" loading="lazy"><figcaption>1548589344206</figcaption></figure><p>登录成功</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548589328710.png" alt="1548589328710" tabindex="0" loading="lazy"><figcaption>1548589328710</figcaption></figure><p>注销登录：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548589416576.png" alt="1548589416576" tabindex="0" loading="lazy"><figcaption>1548589416576</figcaption></figure><p>至此，管理员身份可以成功登录以及注销</p><h3 id="_7-2-添加账号" tabindex="-1"><a class="header-anchor" href="#_7-2-添加账号" aria-hidden="true">#</a> 7.2 添加账号</h3><p>功能描述：</p><ul><li>给学生或教师添加新的账号</li></ul><p>功能要求：</p><ul><li>添加时学生学号不能重复、教师职工号不能重复</li></ul><h4 id="_7-2-1-添加功能实现" tabindex="-1"><a class="header-anchor" href="#_7-2-1-添加功能实现" aria-hidden="true">#</a> 7.2.1 添加功能实现</h4><p>在Manager的<strong>addPerson</strong>成员函数中，实现添加新账号功能，代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//添加账号  
void Manager::addPerson()
{

	cout &lt;&lt; &quot;请输入添加账号的类型&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1、添加学生&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;2、添加老师&quot; &lt;&lt; endl;

	string fileName;
	string tip;
	ofstream ofs;

	int select = 0;
	cin &gt;&gt; select;

	if (select == 1)
	{
		fileName = STUDENT_FILE;
		tip = &quot;请输入学号： &quot;;
	}
	else
	{
		fileName = TEACHER_FILE;
		tip = &quot;请输入职工编号：&quot;;
	}

	ofs.open(fileName, ios::out | ios::app);
	int id;
	string name;
	string pwd;
	cout &lt;&lt;tip &lt;&lt; endl;
	cin &gt;&gt; id;

	cout &lt;&lt; &quot;请输入姓名： &quot; &lt;&lt; endl;
	cin &gt;&gt; name;

	cout &lt;&lt; &quot;请输入密码： &quot; &lt;&lt; endl;
	cin &gt;&gt; pwd;

	ofs &lt;&lt; id &lt;&lt; &quot; &quot; &lt;&lt; name &lt;&lt; &quot; &quot; &lt;&lt; pwd &lt;&lt; &quot; &quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;添加成功&quot; &lt;&lt; endl;

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);

	ofs.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试添加学生：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548641024216.png" alt="1548641024216" tabindex="0" loading="lazy"><figcaption>1548641024216</figcaption></figure><p>成功在学生文件中添加了一条信息</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548641141027.png" alt="1548641141027" tabindex="0" loading="lazy"><figcaption>1548641141027</figcaption></figure><p>测试添加教师：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548641195834.png" alt="1548641195834" tabindex="0" loading="lazy"><figcaption>1548641195834</figcaption></figure><p>成功在教师文件中添加了一条信息</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548641237513.png" alt="1548641237513" tabindex="0" loading="lazy"><figcaption>1548641237513</figcaption></figure><h4 id="_7-2-2-去重操作" tabindex="-1"><a class="header-anchor" href="#_7-2-2-去重操作" aria-hidden="true">#</a> 7.2.2 去重操作</h4><p>功能描述：添加新账号时，如果是重复的学生编号，或是重复的教师职工编号，提示有误</p><h5 id="_7-2-2-1-读取信息" tabindex="-1"><a class="header-anchor" href="#_7-2-2-1-读取信息" aria-hidden="true">#</a> 7.2.2.1 读取信息</h5><ul><li>要去除重复的账号，首先要先将学生和教师的账号信息获取到程序中，方可检测</li><li>在manager.h中，添加两个容器，用于存放学生和教师的信息</li><li>添加一个新的成员函数 <code>void initVector()</code> 初始化容器</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//初始化容器
void initVector();

//学生容器
vector&lt;Student&gt; vStu;

//教师容器
vector&lt;Teacher&gt; vTea;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加位置如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548644354561.png" alt="1548644354561" tabindex="0" loading="lazy"><figcaption>1548644354561</figcaption></figure><p>在Manager的有参构造函数中，获取目前的学生和教师信息</p><p>代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void Manager::initVector()
{
	//读取学生文件中信息
	ifstream ifs;
	ifs.open(STUDENT_FILE, ios::in);
	if (!ifs.is_open())
	{
		cout &lt;&lt; &quot;文件读取失败&quot; &lt;&lt; endl;
		return;
	}
    
	vStu.clear();
     vTea.clear();
    
	Student s;
	while (ifs &gt;&gt; s.m_Id &amp;&amp; ifs &gt;&gt; s.m_Name &amp;&amp;  ifs &gt;&gt; s.m_Pwd)
	{
		vStu.push_back(s);
	}
	cout &lt;&lt; &quot;当前学生数量为： &quot; &lt;&lt; vStu.size() &lt;&lt; endl;
	ifs.close(); //学生初始化

	//读取老师文件信息
	ifs.open(TEACHER_FILE, ios::in);

	Teacher t;
	while (ifs &gt;&gt; t.m_EmpId &amp;&amp; ifs &gt;&gt; t.m_Name &amp;&amp;  ifs &gt;&gt; t.m_Pwd)
	{
		vTea.push_back(t);
	}
	cout &lt;&lt; &quot;当前教师数量为： &quot; &lt;&lt; vTea.size() &lt;&lt; endl;

	ifs.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在有参构造函数中，调用初始化容器函数</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//有参构造
Manager::Manager(string name, string pwd)
{
	this-&gt;m_Name = name;
	this-&gt;m_Pwd = pwd;
    
	//初始化容器
	this-&gt;initVector();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，运行代码可以看到测试代码获取当前学生和教师数量</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548642488049.png" alt="1548642488049" tabindex="0" loading="lazy"><figcaption>1548642488049</figcaption></figure><h5 id="_7-2-2-2-去重函数封装" tabindex="-1"><a class="header-anchor" href="#_7-2-2-2-去重函数封装" aria-hidden="true">#</a> 7.2.2.2 去重函数封装</h5><p>在manager.h文件中添加成员函数<code> bool checkRepeat(int id, int type);</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//检测重复 参数:(传入id，传入类型) 返回值：(true 代表有重复，false代表没有重复)
bool checkRepeat(int id, int type);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在manager.cpp文件中实现成员函数 <code> bool checkRepeat(int id, int type);</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>bool Manager::checkRepeat(int id, int type)
{
	if (type == 1)
	{
		for (vector&lt;Student&gt;::iterator it = vStu.begin(); it != vStu.end(); it++)
		{
			if (id == it-&gt;m_Id)
			{
				return true;
			}
		}
	}
	else
	{
		for (vector&lt;Teacher&gt;::iterator it = vTea.begin(); it != vTea.end(); it++)
		{
			if (id == it-&gt;m_EmpId)
			{
				return true;
			}
		}
	}
	return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_7-2-2-3-添加去重操作" tabindex="-1"><a class="header-anchor" href="#_7-2-2-3-添加去重操作" aria-hidden="true">#</a> 7.2.2.3 添加去重操作</h5><p>在添加学生编号或者教师职工号时，检测是否有重复，代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	string errorTip; //重复错误提示

	if (select == 1)
	{
		fileName = STUDENT_FILE;
		tip = &quot;请输入学号： &quot;;
		errorTip = &quot;学号重复，请重新输入&quot;;
	}
	else
	{
		fileName = TEACHER_FILE;
		tip = &quot;请输入职工编号：&quot;;
		errorTip = &quot;职工号重复，请重新输入&quot;;
	}
	ofs.open(fileName, ios::out | ios::app);
	int id;
	string name;
	string pwd;
	cout &lt;&lt;tip &lt;&lt; endl;

	while (true)
	{
		cin &gt;&gt; id;

		bool ret = this-&gt;checkRepeat(id, 1);

		if (ret) //有重复
		{
			cout &lt;&lt; errorTip &lt;&lt; endl;
		}
		else
		{
			break;
		}
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码位置如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548643909979.png" alt="1548643909979" tabindex="0" loading="lazy"><figcaption>1548643909979</figcaption></figure><p>检测效果：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548644151974.png" alt="1548644151974" tabindex="0" loading="lazy"><figcaption>1548644151974</figcaption></figure><h5 id="_7-2-2-4-bug解决" tabindex="-1"><a class="header-anchor" href="#_7-2-2-4-bug解决" aria-hidden="true">#</a> 7.2.2.4 bug解决</h5><p>bug描述：</p><ul><li>虽然可以检测重复的账号，但是刚添加的账号由于没有更新到容器中，因此不会做检测</li><li>导致刚加入的账号的学生号或者职工编号，再次添加时依然可以重复</li></ul><p>解决方案：</p><ul><li>在每次添加新账号时，重新初始化容器</li></ul><p>在添加完毕后，加入代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>	//初始化容器
	this-&gt;initVector();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>位置如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548644779578.png" alt="1548644779578" tabindex="0" loading="lazy"><figcaption>1548644779578</figcaption></figure><p>再次测试，刚加入的账号不会重复添加了！</p><h3 id="_7-3-显示账号" tabindex="-1"><a class="header-anchor" href="#_7-3-显示账号" aria-hidden="true">#</a> 7.3 显示账号</h3><p>功能描述：显示学生信息或教师信息</p><h4 id="_7-3-1-显示功能实现" tabindex="-1"><a class="header-anchor" href="#_7-3-1-显示功能实现" aria-hidden="true">#</a> 7.3.1 显示功能实现</h4><p>在Manager的<strong>showPerson</strong>成员函数中，实现显示账号功能，代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void printStudent(Student &amp; s)
{
	cout &lt;&lt; &quot;学号： &quot; &lt;&lt; s.m_Id &lt;&lt; &quot; 姓名： &quot; &lt;&lt; s.m_Name &lt;&lt; &quot; 密码：&quot; &lt;&lt; s.m_Pwd &lt;&lt; endl;
}
void printTeacher(Teacher &amp; t)
{
	cout &lt;&lt; &quot;职工号： &quot; &lt;&lt; t.m_EmpId &lt;&lt; &quot; 姓名： &quot; &lt;&lt; t.m_Name &lt;&lt; &quot; 密码：&quot; &lt;&lt; t.m_Pwd &lt;&lt; endl;
}

void Manager::showPerson()
{
	cout &lt;&lt; &quot;请选择查看内容：&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1、查看所有学生&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;2、查看所有老师&quot; &lt;&lt; endl;

	int select = 0;

	cin &gt;&gt; select;
    
	if (select == 1)
	{
		cout &lt;&lt; &quot;所有学生信息如下： &quot; &lt;&lt; endl;
		for_each(vStu.begin(), vStu.end(), printStudent);
	}
	else
	{
		cout &lt;&lt; &quot;所有老师信息如下： &quot; &lt;&lt; endl;
		for_each(vTea.begin(), vTea.end(), printTeacher);
	}
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-3-2-测试" tabindex="-1"><a class="header-anchor" href="#_7-3-2-测试" aria-hidden="true">#</a> 7.3.2 测试</h4><p>测试查看学生效果</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548646791248.png" alt="1548646791248" tabindex="0" loading="lazy"><figcaption>1548646791248</figcaption></figure><p>测试查看教师效果</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548646833665.png" alt="1548646833665" tabindex="0" loading="lazy"><figcaption>1548646833665</figcaption></figure><p>至此，显示账号功能实现完毕</p><h3 id="_7-4-查看机房" tabindex="-1"><a class="header-anchor" href="#_7-4-查看机房" aria-hidden="true">#</a> 7.4 查看机房</h3><h4 id="_7-4-1-添加机房信息" tabindex="-1"><a class="header-anchor" href="#_7-4-1-添加机房信息" aria-hidden="true">#</a> 7.4.1 添加机房信息</h4><p>案例需求中，机房一共有三个，其中1号机房容量20台机器，2号50台，3号100台</p><p>我们可以将信息录入到computerRoom.txt中</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548647538570.png" alt="1548647538570" tabindex="0" loading="lazy"><figcaption>1548647538570</figcaption></figure><h4 id="_7-4-2-机房类创建" tabindex="-1"><a class="header-anchor" href="#_7-4-2-机房类创建" aria-hidden="true">#</a> 7.4.2 机房类创建</h4><p>在头文件下，创建新的文件 computerRoom.h</p><p>并添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;
//机房类
class ComputerRoom
{
public:

	int m_ComId; //机房id号

	int m_MaxNum; //机房最大容量
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_7-4-3-初始化机房信息" tabindex="-1"><a class="header-anchor" href="#_7-4-3-初始化机房信息" aria-hidden="true">#</a> 7.4.3 初始化机房信息</h4><p>在Manager管理员类下，添加机房的容器,用于保存机房信息</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//机房容器
vector&lt;ComputerRoom&gt; vCom;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在Manager有参构造函数中，追加如下代码，初始化机房信息</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//获取机房信息
ifstream ifs;

ifs.open(COMPUTER_FILE, ios::in);

ComputerRoom c;
while (ifs &gt;&gt; c.m_ComId &amp;&amp; ifs &gt;&gt; c.m_MaxNum)
{
    vCom.push_back(c);
}
cout &lt;&lt; &quot;当前机房数量为： &quot; &lt;&lt; vCom.size() &lt;&lt; endl;

ifs.close();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>位置如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548647976462.png" alt="1548647976462" tabindex="0" loading="lazy"><figcaption>1548647976462</figcaption></figure><p>因为机房信息目前版本不会有所改动，如果后期有修改功能，最好封装到一个函数中，方便维护</p><h4 id="_7-4-4-显示机房信息" tabindex="-1"><a class="header-anchor" href="#_7-4-4-显示机房信息" aria-hidden="true">#</a> 7.4.4 显示机房信息</h4><p>在Manager类的showComputer成员函数中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//查看机房信息
void Manager::showComputer()
{
	cout &lt;&lt; &quot;机房信息如下： &quot; &lt;&lt; endl;
	for (vector&lt;ComputerRoom&gt;::iterator it = vCom.begin(); it != vCom.end(); it++)
	{
		cout &lt;&lt; &quot;机房编号： &quot; &lt;&lt; it-&gt;m_ComId &lt;&lt; &quot; 机房最大容量： &quot; &lt;&lt; it-&gt;m_MaxNum &lt;&lt; endl;
	}
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试显示机房信息功能：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548648276929.png" alt="1548648276929" tabindex="0" loading="lazy"><figcaption>1548648276929</figcaption></figure><h3 id="_7-5-清空预约" tabindex="-1"><a class="header-anchor" href="#_7-5-清空预约" aria-hidden="true">#</a> 7.5 清空预约</h3><p>功能描述：</p><p>清空生成的<code>order.txt</code>预约文件</p><h4 id="_7-5-1-清空功能实现" tabindex="-1"><a class="header-anchor" href="#_7-5-1-清空功能实现" aria-hidden="true">#</a> 7.5.1 清空功能实现</h4><p>在Manager的cleanFile成员函数中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//清空预约记录
void Manager::cleanFile()
{
	ofstream ofs(ORDER_FILE, ios::trunc);
	ofs.close();

	cout &lt;&lt; &quot;清空成功！&quot; &lt;&lt; endl;
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试清空，可以随意写入一些信息在order.txt中，然后调用cleanFile清空文件接口，查看是否清空干净</p><h2 id="_8、-学生模块" tabindex="-1"><a class="header-anchor" href="#_8、-学生模块" aria-hidden="true">#</a> 8、 学生模块</h2><h3 id="_8-1-学生登录和注销" tabindex="-1"><a class="header-anchor" href="#_8-1-学生登录和注销" aria-hidden="true">#</a> 8.1 学生登录和注销</h3><h4 id="_8-1-1-构造函数" tabindex="-1"><a class="header-anchor" href="#_8-1-1-构造函数" aria-hidden="true">#</a> 8.1.1 构造函数</h4><ul><li>在Student类的构造函数中，初始化学生信息，代码如下：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//有参构造(学号、姓名、密码)
Student::Student(int id, string name, string pwd)
{
	//初始化属性
	this-&gt;m_Id = id;
	this-&gt;m_Name = name;
	this-&gt;m_Pwd = pwd;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-1-2-管理员子菜单" tabindex="-1"><a class="header-anchor" href="#_8-1-2-管理员子菜单" aria-hidden="true">#</a> 8.1.2 管理员子菜单</h4><ul><li>在机房预约系统.cpp中，当用户登录的是学生，添加学生菜单接口</li><li>将不同的分支提供出来 <ul><li>申请预约</li><li>查看我的预约</li><li>查看所有预约</li><li>取消预约</li><li>注销登录</li></ul></li><li>实现注销功能</li></ul><p>添加全局函数 <code>void studentMenu(Identity * &amp;manager)</code> 代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//学生菜单
void studentMenu(Identity * &amp;student)
{
	while (true)
	{
		//学生菜单
		student-&gt;operMenu();

		Student* stu = (Student*)student;
		int select = 0;

		cin &gt;&gt; select;

		if (select == 1) //申请预约
		{
			stu-&gt;applyOrder();
		}
		else if (select == 2) //查看自身预约
		{
			stu-&gt;showMyOrder();
		}
		else if (select == 3) //查看所有预约
		{
			stu-&gt;showAllOrder();
		}
		else if (select == 4) //取消预约
		{
			stu-&gt;cancelOrder();
		}
		else
		{
			delete student;
			cout &lt;&lt; &quot;注销成功&quot; &lt;&lt; endl;
			system(&quot;pause&quot;);
			system(&quot;cls&quot;);
			return;
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-1-3-菜单功能实现" tabindex="-1"><a class="header-anchor" href="#_8-1-3-菜单功能实现" aria-hidden="true">#</a> 8.1.3 菜单功能实现</h4><ul><li>在实现成员函数<code>void Student::operMenu()</code> 代码如下：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//菜单界面
void Student::operMenu()
{
	cout &lt;&lt; &quot;欢迎学生代表：&quot; &lt;&lt; this-&gt;m_Name &lt;&lt; &quot;登录！&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;\\t\\t ----------------------------------\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                 |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          1.申请预约              |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                 |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          2.查看我的预约          |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                 |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          3.查看所有预约          |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                 |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          4.取消预约              |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                 |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          0.注销登录              |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                 |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t ----------------------------------\\n&quot;;
	cout &lt;&lt; &quot;请选择您的操作： &quot; &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-1-4-接口对接" tabindex="-1"><a class="header-anchor" href="#_8-1-4-接口对接" aria-hidden="true">#</a> 8.1.4 接口对接</h4><ul><li>学生成功登录后，调用学生的子菜单界面</li><li>在学生登录分支中，添加代码：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//进入学生子菜单
studentMenu(person);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548659552298.png" alt="1548659552298" tabindex="0" loading="lazy"><figcaption>1548659552298</figcaption></figure><p>测试对接，效果如图：</p><p>登录验证通过：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548659590221.png" alt="1548659590221" tabindex="0" loading="lazy"><figcaption>1548659590221</figcaption></figure><p>学生子菜单：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548659670651.png" alt="1548659670651" tabindex="0" loading="lazy"><figcaption>1548659670651</figcaption></figure><p>注销登录：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548659682402.png" alt="1548659682402" tabindex="0" loading="lazy"><figcaption>1548659682402</figcaption></figure><h3 id="_8-2-申请预约" tabindex="-1"><a class="header-anchor" href="#_8-2-申请预约" aria-hidden="true">#</a> 8.2 申请预约</h3><h4 id="_8-2-1-获取机房信息" tabindex="-1"><a class="header-anchor" href="#_8-2-1-获取机房信息" aria-hidden="true">#</a> 8.2.1 获取机房信息</h4><ul><li>在申请预约时，学生可以看到机房的信息，因此我们需要让学生获取到机房的信息</li></ul><p>在student.h中添加新的成员函数如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//机房容器
vector&lt;ComputerRoom&gt; vCom;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在学生的有参构造函数中追加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//获取机房信息
ifstream ifs;
ifs.open(COMPUTER_FILE, ios::in);

ComputerRoom c;
while (ifs &gt;&gt; c.m_ComId &amp;&amp; ifs &gt;&gt; c.m_MaxNum)
{
    vCom.push_back(c);
}

ifs.close();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>追加位置如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548661562158.png" alt="1548661562158" tabindex="0" loading="lazy"><figcaption>1548661562158</figcaption></figure><p>至此，vCom容器中保存了所有机房的信息</p><h4 id="_8-2-2-预约功能实现" tabindex="-1"><a class="header-anchor" href="#_8-2-2-预约功能实现" aria-hidden="true">#</a> 8.2.2 预约功能实现</h4><p>在student.cpp中实现成员函数 <code>void Student::applyOrder()</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//申请预约
void Student::applyOrder()
{
	cout &lt;&lt; &quot;机房开放时间为周一至周五！&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;请输入申请预约的时间：&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1、周一&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;2、周二&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;3、周三&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;4、周四&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;5、周五&quot; &lt;&lt; endl;
	int date = 0;
	int interval = 0;
	int room = 0;

	while (true)
	{
		cin &gt;&gt; date;
		if (date &gt;= 1 &amp;&amp; date &lt;= 5)
		{
			break;
		}
		cout &lt;&lt; &quot;输入有误，请重新输入&quot; &lt;&lt; endl;
	}


	cout &lt;&lt; &quot;请输入申请预约的时间段：&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1、上午&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;2、下午&quot; &lt;&lt; endl;

	while (true)
	{
		cin &gt;&gt; interval;
		if (interval &gt;= 1 &amp;&amp; interval &lt;= 2)
		{
			break;
		}
		cout &lt;&lt; &quot;输入有误，请重新输入&quot; &lt;&lt; endl;
	}

	cout &lt;&lt; &quot;请选择机房：&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1号机房容量：&quot; &lt;&lt; vCom[0].m_MaxNum &lt;&lt; endl;
	cout &lt;&lt; &quot;2号机房容量：&quot; &lt;&lt; vCom[1].m_MaxNum &lt;&lt; endl;
	cout &lt;&lt; &quot;3号机房容量：&quot; &lt;&lt; vCom[2].m_MaxNum &lt;&lt; endl;

	while (true)
	{
		cin &gt;&gt; room;
		if (room &gt;= 1 &amp;&amp; room &lt;= 3)
		{
			break;
		}
		cout &lt;&lt; &quot;输入有误，请重新输入&quot; &lt;&lt; endl;
	}

	cout &lt;&lt; &quot;预约成功！审核中&quot; &lt;&lt; endl;

	ofstream ofs(ORDER_FILE, ios::app);
	ofs &lt;&lt; &quot;date:&quot; &lt;&lt; date &lt;&lt; &quot; &quot;;
	ofs &lt;&lt; &quot;interval:&quot; &lt;&lt; interval &lt;&lt; &quot; &quot;;
	ofs &lt;&lt; &quot;stuId:&quot; &lt;&lt; this-&gt;m_Id &lt;&lt; &quot; &quot;;
	ofs &lt;&lt; &quot;stuName:&quot; &lt;&lt; this-&gt;m_Name &lt;&lt; &quot; &quot;;
	ofs &lt;&lt; &quot;roomId:&quot; &lt;&lt; room &lt;&lt; &quot; &quot;;
	ofs &lt;&lt; &quot;status:&quot; &lt;&lt; 1 &lt;&lt; endl;

	ofs.close();

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序，测试代码:</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548728936052.png" alt="1548728936052" tabindex="0" loading="lazy"><figcaption>1548728936052</figcaption></figure><p>在order.txt文件中生成如下内容：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548662281801.png" alt="1548662281801" tabindex="0" loading="lazy"><figcaption>1548662281801</figcaption></figure><h3 id="_8-3-显示预约" tabindex="-1"><a class="header-anchor" href="#_8-3-显示预约" aria-hidden="true">#</a> 8.3 显示预约</h3><h4 id="_8-3-1-创建预约类" tabindex="-1"><a class="header-anchor" href="#_8-3-1-创建预约类" aria-hidden="true">#</a> 8.3.1 创建预约类</h4><p>功能描述：显示预约记录时，需要从文件中获取到所有记录，用来显示，创建预约的类来管理记录以及更新</p><p>在头文件以及源文件下分别创建<strong>orderFile.h</strong> 和 <strong>orderFile.cpp</strong>文件</p><p>orderFile.h中添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;
#include &lt;map&gt;
#include &quot;globalFile.h&quot;

class OrderFile
{
public:

	//构造函数
	OrderFile();

	//更新预约记录
	void updateOrder();

	//记录的容器  key --- 记录的条数  value --- 具体记录的键值对信息
	map&lt;int, map&lt;string, string&gt;&gt; m_orderData;

	//预约记录条数
	int m_Size;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构造函数</strong>中获取所有信息，并存放在容器中，添加如下代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>OrderFile::OrderFile()
{
	ifstream ifs;
	ifs.open(ORDER_FILE, ios::in);

	string date;      //日期
	string interval;  //时间段
	string stuId;     //学生编号
	string stuName;   //学生姓名
	string roomId;    //机房编号
	string status;    //预约状态


	this-&gt;m_Size = 0; //预约记录个数

	while (ifs &gt;&gt; date &amp;&amp; ifs &gt;&gt; interval &amp;&amp; ifs &gt;&gt; stuId &amp;&amp; ifs &gt;&gt; stuName &amp;&amp; ifs &gt;&gt; roomId &amp;&amp;  ifs &gt;&gt; status)
	{
		//测试代码
		/*
		cout &lt;&lt; date &lt;&lt; endl;
		cout &lt;&lt; interval &lt;&lt; endl;
		cout &lt;&lt; stuId &lt;&lt; endl;
		cout &lt;&lt; stuName &lt;&lt; endl;
		cout &lt;&lt; roomId &lt;&lt; endl;
		cout &lt;&lt; status &lt;&lt; endl;
		*/

		string key;
		string value;
		map&lt;string, string&gt; m;

		int pos = date.find(&quot;:&quot;);
		if (pos != -1)
		{
			key = date.substr(0, pos);
			value = date.substr(pos + 1, date.size() - pos -1);
			m.insert(make_pair(key, value));
		}

		pos = interval.find(&quot;:&quot;);
		if (pos != -1)
		{
			key = interval.substr(0, pos);
			value = interval.substr(pos + 1, interval.size() - pos -1 );
			m.insert(make_pair(key, value));
		}

		pos = stuId.find(&quot;:&quot;);
		if (pos != -1)
		{
			key = stuId.substr(0, pos);
			value = stuId.substr(pos + 1, stuId.size() - pos -1 );
			m.insert(make_pair(key, value));
		}

		pos = stuName.find(&quot;:&quot;);
		if (pos != -1)
		{
			key = stuName.substr(0, pos);
			value = stuName.substr(pos + 1, stuName.size() - pos -1);
			m.insert(make_pair(key, value));
		}

		pos = roomId.find(&quot;:&quot;);
		if (pos != -1)
		{
			key = roomId.substr(0, pos);
			value = roomId.substr(pos + 1, roomId.size() - pos -1 );
			m.insert(make_pair(key, value));
		}

		pos = status.find(&quot;:&quot;);
		if (pos != -1)
		{
			key = status.substr(0, pos);
			value = status.substr(pos + 1, status.size() - pos -1);
			m.insert(make_pair(key, value));
		}


		this-&gt;m_orderData.insert(make_pair(this-&gt;m_Size, m));
		this-&gt;m_Size++;
	}

	//测试代码
	//for (map&lt;int, map&lt;string, string&gt;&gt;::iterator it = m_orderData.begin(); it != m_orderData.end();it++)
	//{
	//	cout &lt;&lt; &quot;key = &quot; &lt;&lt; it-&gt;first &lt;&lt; &quot; value = &quot; &lt;&lt; endl;
	//	for (map&lt;string, string&gt;::iterator mit = it-&gt;second.begin(); mit != it-&gt;second.end(); mit++)
	//	{
	//		cout &lt;&lt; mit-&gt;first &lt;&lt; &quot; &quot; &lt;&lt; mit-&gt;second &lt;&lt; &quot; &quot;;
	//	}
	//	cout &lt;&lt; endl;
	//}
    
    ifs.close();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新预约记录的成员函数updateOrder代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void OrderFile::updateOrder()
{
	if (this-&gt;m_Size == 0)
	{
		return;
	}

	ofstream ofs(ORDER_FILE, ios::out | ios::trunc);
	for (int i = 0; i &lt; m_Size;i++)
	{
		ofs &lt;&lt; &quot;date:&quot; &lt;&lt; this-&gt;m_orderData[i][&quot;date&quot;] &lt;&lt; &quot; &quot;;
		ofs &lt;&lt; &quot;interval:&quot; &lt;&lt; this-&gt;m_orderData[i][&quot;interval&quot;] &lt;&lt; &quot; &quot;;
		ofs &lt;&lt; &quot;stuId:&quot; &lt;&lt; this-&gt;m_orderData[i][&quot;stuId&quot;] &lt;&lt; &quot; &quot;;
		ofs &lt;&lt; &quot;stuName:&quot; &lt;&lt; this-&gt;m_orderData[i][&quot;stuName&quot;] &lt;&lt; &quot; &quot;;
		ofs &lt;&lt; &quot;roomId:&quot; &lt;&lt; this-&gt;m_orderData[i][&quot;roomId&quot;] &lt;&lt; &quot; &quot;;
		ofs &lt;&lt; &quot;status:&quot; &lt;&lt; this-&gt;m_orderData[i][&quot;status&quot;] &lt;&lt; endl;
	}
    ofs.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_8-3-2-显示自身预约" tabindex="-1"><a class="header-anchor" href="#_8-3-2-显示自身预约" aria-hidden="true">#</a> 8.3.2 显示自身预约</h4><p>首先我们先添加几条预约记录，可以用程序添加或者直接修改order.txt文件</p><p>order.txt文件内容如下： 比如我们有三名同学分别产生了3条预约记录</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548667534747.png" alt="1548667534747" tabindex="0" loading="lazy"><figcaption>1548667534747</figcaption></figure><p>在Student类的<code>void Student::showMyOrder()</code>成员函数中，添加如下代码</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//查看我的预约
void Student::showMyOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout &lt;&lt; &quot;无预约记录&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
		return;
	}
	for (int i = 0; i &lt; of.m_Size; i++)
	{
		if (atoi(of.m_orderData[i][&quot;stuId&quot;].c_str()) == this-&gt;m_Id)
		{
			cout &lt;&lt; &quot;预约日期： 周&quot; &lt;&lt; of.m_orderData[i][&quot;date&quot;];
			cout &lt;&lt; &quot; 时段：&quot; &lt;&lt; (of.m_orderData[i][&quot;interval&quot;] == &quot;1&quot; ? &quot;上午&quot; : &quot;下午&quot;);
			cout &lt;&lt; &quot; 机房：&quot; &lt;&lt; of.m_orderData[i][&quot;roomId&quot;];
			string status = &quot; 状态： &quot;;  // 0 取消的预约   1 审核中   2 已预约 -1 预约失败
			if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot;)
			{
				status += &quot;审核中&quot;;
			}
			else if (of.m_orderData[i][&quot;status&quot;] == &quot;2&quot;)
			{
				status += &quot;预约成功&quot;;
			}
			else if (of.m_orderData[i][&quot;status&quot;] == &quot;-1&quot;)
			{
				status += &quot;审核未通过，预约失败&quot;;
			}
			else
			{
				status += &quot;预约已取消&quot;;
			}
			cout &lt;&lt; status &lt;&lt; endl;

		}
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548667252474.png" alt="1548667252474" tabindex="0" loading="lazy"><figcaption>1548667252474</figcaption></figure><h4 id="_8-3-3-显示所有预约" tabindex="-1"><a class="header-anchor" href="#_8-3-3-显示所有预约" aria-hidden="true">#</a> 8.3.3 显示所有预约</h4><p>在Student类的<code>void Student::showAllOrder()</code>成员函数中，添加如下代码</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//查看所有预约
void Student::showAllOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout &lt;&lt; &quot;无预约记录&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
		return;
	}

	for (int i = 0; i &lt; of.m_Size; i++)
	{
		cout &lt;&lt; i + 1 &lt;&lt; &quot;、 &quot;;

		cout &lt;&lt; &quot;预约日期： 周&quot; &lt;&lt; of.m_orderData[i][&quot;date&quot;];
		cout &lt;&lt; &quot; 时段：&quot; &lt;&lt; (of.m_orderData[i][&quot;interval&quot;] == &quot;1&quot; ? &quot;上午&quot; : &quot;下午&quot;);
		cout &lt;&lt; &quot; 学号：&quot; &lt;&lt; of.m_orderData[i][&quot;stuId&quot;];
		cout &lt;&lt; &quot; 姓名：&quot; &lt;&lt; of.m_orderData[i][&quot;stuName&quot;];
		cout &lt;&lt; &quot; 机房：&quot; &lt;&lt; of.m_orderData[i][&quot;roomId&quot;];
		string status = &quot; 状态： &quot;;  // 0 取消的预约   1 审核中   2 已预约 -1 预约失败
		if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot;)
		{
			status += &quot;审核中&quot;;
		}
		else if (of.m_orderData[i][&quot;status&quot;] == &quot;2&quot;)
		{
			status += &quot;预约成功&quot;;
		}
		else if (of.m_orderData[i][&quot;status&quot;] == &quot;-1&quot;)
		{
			status += &quot;审核未通过，预约失败&quot;;
		}
		else
		{
			status += &quot;预约已取消&quot;;
		}
		cout &lt;&lt; status &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548667591734.png" alt="1548667591734" tabindex="0" loading="lazy"><figcaption>1548667591734</figcaption></figure><h3 id="_8-4-取消预约" tabindex="-1"><a class="header-anchor" href="#_8-4-取消预约" aria-hidden="true">#</a> 8.4 取消预约</h3><p>在Student类的<code>void Student::cancelOrder()</code>成员函数中，添加如下代码</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//取消预约
void Student::cancelOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout &lt;&lt; &quot;无预约记录&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
		return;
	}
	cout &lt;&lt; &quot;审核中或预约成功的记录可以取消，请输入取消的记录&quot; &lt;&lt; endl;

	vector&lt;int&gt;v;
	int index = 1;
	for (int i = 0; i &lt; of.m_Size; i++)
	{
		if (atoi(of.m_orderData[i][&quot;stuId&quot;].c_str()) == this-&gt;m_Id)
		{
			if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot; || of.m_orderData[i][&quot;status&quot;] == &quot;2&quot;)
			{
				v.push_back(i);
				cout &lt;&lt;  index ++  &lt;&lt; &quot;、 &quot;;
				cout &lt;&lt; &quot;预约日期： 周&quot; &lt;&lt; of.m_orderData[i][&quot;date&quot;];
				cout &lt;&lt; &quot; 时段：&quot; &lt;&lt; (of.m_orderData[i][&quot;interval&quot;] == &quot;1&quot; ? &quot;上午&quot; : &quot;下午&quot;);
				cout &lt;&lt; &quot; 机房：&quot; &lt;&lt; of.m_orderData[i][&quot;roomId&quot;];
				string status = &quot; 状态： &quot;;  // 0 取消的预约   1 审核中   2 已预约  -1 预约失败
				if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot;)
				{
					status += &quot;审核中&quot;;
				}
				else if (of.m_orderData[i][&quot;status&quot;] == &quot;2&quot;)
				{
					status += &quot;预约成功&quot;;
				}
				cout &lt;&lt; status &lt;&lt; endl;

			}
		}
	}

	cout &lt;&lt; &quot;请输入取消的记录,0代表返回&quot; &lt;&lt; endl;
	int select = 0;
	while (true)
	{
		cin &gt;&gt; select;
		if (select &gt;= 0 &amp;&amp; select &lt;= v.size())
		{
			if (select == 0)
			{
				break;
			}
			else
			{
				//	cout &lt;&lt; &quot;记录所在位置： &quot; &lt;&lt; v[select - 1] &lt;&lt; endl;
				of.m_orderData[v[select - 1]][&quot;status&quot;] = &quot;0&quot;;
				of.updateOrder();
				cout &lt;&lt; &quot;已取消预约&quot; &lt;&lt; endl;
				break;
			}

		}
		cout &lt;&lt; &quot;输入有误，请重新输入&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试取消预约：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548669551036.png" alt="1548669551036" tabindex="0" loading="lazy"><figcaption>1548669551036</figcaption></figure><p>再次查看个人预约记录：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548669728023.png" alt="1548669728023" tabindex="0" loading="lazy"><figcaption>1548669728023</figcaption></figure><p>查看所有预约</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548669753496.png" alt="1548669753496" tabindex="0" loading="lazy"><figcaption>1548669753496</figcaption></figure><p>查看order.txt预约文件</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548669798037.png" alt="1548669798037" tabindex="0" loading="lazy"><figcaption>1548669798037</figcaption></figure><p>至此，学生模块功能全部实现</p><h2 id="_9、-教师模块" tabindex="-1"><a class="header-anchor" href="#_9、-教师模块" aria-hidden="true">#</a> 9、 教师模块</h2><h3 id="_9-1-教师登录和注销" tabindex="-1"><a class="header-anchor" href="#_9-1-教师登录和注销" aria-hidden="true">#</a> 9.1 教师登录和注销</h3><h4 id="_9-1-1-构造函数" tabindex="-1"><a class="header-anchor" href="#_9-1-1-构造函数" aria-hidden="true">#</a> 9.1.1 构造函数</h4><ul><li>在Teacher类的构造函数中，初始化教师信息，代码如下：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//有参构造 (职工编号，姓名，密码)
Teacher::Teacher(int empId, string name, string pwd)
{
	//初始化属性
	this-&gt;m_EmpId = empId;
	this-&gt;m_Name = name;
	this-&gt;m_Pwd = pwd;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-1-2-教师子菜单" tabindex="-1"><a class="header-anchor" href="#_9-1-2-教师子菜单" aria-hidden="true">#</a> 9.1.2 教师子菜单</h4><ul><li>在机房预约系统.cpp中，当用户登录的是教师，添加教师菜单接口</li><li>将不同的分支提供出来 <ul><li>查看所有预约</li><li>审核预约</li><li>注销登录</li></ul></li><li>实现注销功能</li></ul><p>添加全局函数 <code>void TeacherMenu(Person * &amp;manager)</code> 代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//教师菜单
void TeacherMenu(Identity * &amp;teacher)
{
	while (true)
	{
		//教师菜单
		teacher-&gt;operMenu();

		Teacher* tea = (Teacher*)teacher;
		int select = 0;

		cin &gt;&gt; select;

		if (select == 1)
		{
			//查看所有预约
			tea-&gt;showAllOrder();
		}
		else if (select == 2)
		{
			//审核预约
			tea-&gt;validOrder();
		}
		else
		{
			delete teacher;
			cout &lt;&lt; &quot;注销成功&quot; &lt;&lt; endl;
			system(&quot;pause&quot;);
			system(&quot;cls&quot;);
			return;
		}

	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-1-3-菜单功能实现" tabindex="-1"><a class="header-anchor" href="#_9-1-3-菜单功能实现" aria-hidden="true">#</a> 9.1.3 菜单功能实现</h4><ul><li>在实现成员函数<code>void Teacher::operMenu()</code> 代码如下：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//教师菜单界面
void Teacher::operMenu()
{
	cout &lt;&lt; &quot;欢迎教师：&quot; &lt;&lt; this-&gt;m_Name &lt;&lt; &quot;登录！&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;\\t\\t ----------------------------------\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                  |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          1.查看所有预约          |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                  |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          2.审核预约              |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                  |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|          0.注销登录              |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t|                                  |\\n&quot;;
	cout &lt;&lt; &quot;\\t\\t ----------------------------------\\n&quot;;
	cout &lt;&lt; &quot;请选择您的操作： &quot; &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-1-4-接口对接" tabindex="-1"><a class="header-anchor" href="#_9-1-4-接口对接" aria-hidden="true">#</a> 9.1.4 接口对接</h4><ul><li>教师成功登录后，调用教师的子菜单界面</li><li>在教师登录分支中，添加代码：</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//进入教师子菜单
TeacherMenu(person);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548670866708.png" alt="1548670866708" tabindex="0" loading="lazy"><figcaption>1548670866708</figcaption></figure><p>测试对接，效果如图：</p><p>登录验证通过：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548670949885.png" alt="1548670949885" tabindex="0" loading="lazy"><figcaption>1548670949885</figcaption></figure><p>教师子菜单：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548670958602.png" alt="1548670958602" tabindex="0" loading="lazy"><figcaption>1548670958602</figcaption></figure><p>注销登录：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548670966988.png" alt="1548670966988" tabindex="0" loading="lazy"><figcaption>1548670966988</figcaption></figure><h3 id="_9-2-查看所有预约" tabindex="-1"><a class="header-anchor" href="#_9-2-查看所有预约" aria-hidden="true">#</a> 9.2 查看所有预约</h3><h4 id="_9-2-1-所有预约功能实现" tabindex="-1"><a class="header-anchor" href="#_9-2-1-所有预约功能实现" aria-hidden="true">#</a> 9.2.1 所有预约功能实现</h4><p>该功能与学生身份的查看所有预约功能相似，用于显示所有预约记录</p><p>在Teacher.cpp中实现成员函数 <code>void Teacher::showAllOrder()</code></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void Teacher::showAllOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout &lt;&lt; &quot;无预约记录&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
		return;
	}
	for (int i = 0; i &lt; of.m_Size; i++)
	{
		cout &lt;&lt; i + 1 &lt;&lt; &quot;、 &quot;;

		cout &lt;&lt; &quot;预约日期： 周&quot; &lt;&lt; of.m_orderData[i][&quot;date&quot;];
		cout &lt;&lt; &quot; 时段：&quot; &lt;&lt; (of.m_orderData[i][&quot;interval&quot;] == &quot;1&quot; ? &quot;上午&quot; : &quot;下午&quot;);
		cout &lt;&lt; &quot; 学号：&quot; &lt;&lt; of.m_orderData[i][&quot;stuId&quot;];
		cout &lt;&lt; &quot; 姓名：&quot; &lt;&lt; of.m_orderData[i][&quot;stuName&quot;];
		cout &lt;&lt; &quot; 机房：&quot; &lt;&lt; of.m_orderData[i][&quot;roomId&quot;];
		string status = &quot; 状态： &quot;;  // 0 取消的预约   1 审核中   2 已预约 -1 预约失败
		if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot;)
		{
			status += &quot;审核中&quot;;
		}
		else if (of.m_orderData[i][&quot;status&quot;] == &quot;2&quot;)
		{
			status += &quot;预约成功&quot;;
		}
		else if (of.m_orderData[i][&quot;status&quot;] == &quot;-1&quot;)
		{
			status += &quot;审核未通过，预约失败&quot;;
		}
		else
		{
			status += &quot;预约已取消&quot;;
		}
		cout &lt;&lt; status &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-2-2-测试功能" tabindex="-1"><a class="header-anchor" href="#_9-2-2-测试功能" aria-hidden="true">#</a> 9.2.2 测试功能</h4><p>运行测试教师身份的查看所有预约功能</p><p>测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548676922678.png" alt="1548676922678" tabindex="0" loading="lazy"><figcaption>1548676922678</figcaption></figure><h3 id="_9-3-审核预约" tabindex="-1"><a class="header-anchor" href="#_9-3-审核预约" aria-hidden="true">#</a> 9.3 审核预约</h3><h4 id="_9-3-1-审核功能实现" tabindex="-1"><a class="header-anchor" href="#_9-3-1-审核功能实现" aria-hidden="true">#</a> 9.3.1 审核功能实现</h4><p>功能描述：教师审核学生的预约，依据实际情况审核预约</p><p>在Teacher.cpp中实现成员函数 <code>void Teacher::validOrder()</code></p><p>代码如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//审核预约
void Teacher::validOrder()
{
	OrderFile of;
	if (of.m_Size == 0)
	{
		cout &lt;&lt; &quot;无预约记录&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
		return;
	}
	cout &lt;&lt; &quot;待审核的预约记录如下：&quot; &lt;&lt; endl;

	vector&lt;int&gt;v;
	int index = 0;
	for (int i = 0; i &lt; of.m_Size; i++)
	{
		if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot;)
		{
			v.push_back(i);
			cout &lt;&lt; ++index &lt;&lt; &quot;、 &quot;;
			cout &lt;&lt; &quot;预约日期： 周&quot; &lt;&lt; of.m_orderData[i][&quot;date&quot;];
			cout &lt;&lt; &quot; 时段：&quot; &lt;&lt; (of.m_orderData[i][&quot;interval&quot;] == &quot;1&quot; ? &quot;上午&quot; : &quot;下午&quot;);
			cout &lt;&lt; &quot; 机房：&quot; &lt;&lt; of.m_orderData[i][&quot;roomId&quot;];
			string status = &quot; 状态： &quot;;  // 0取消的预约   1 审核中   2 已预约  -1 预约失败
			if (of.m_orderData[i][&quot;status&quot;] == &quot;1&quot;)
			{
				status += &quot;审核中&quot;;
			}
			cout &lt;&lt; status &lt;&lt; endl;
		}
	}
	cout &lt;&lt; &quot;请输入审核的预约记录,0代表返回&quot; &lt;&lt; endl;
	int select = 0;
	int ret = 0;
	while (true)
	{
		cin &gt;&gt; select;
		if (select &gt;= 0 &amp;&amp; select &lt;= v.size())
		{
			if (select == 0)
			{
				break;
			}
			else
			{
				cout &lt;&lt; &quot;请输入审核结果&quot; &lt;&lt; endl;
				cout &lt;&lt; &quot;1、通过&quot; &lt;&lt; endl;
				cout &lt;&lt; &quot;2、不通过&quot; &lt;&lt; endl;
				cin &gt;&gt; ret;

				if (ret == 1)
				{
					of.m_orderData[v[select - 1]][&quot;status&quot;] = &quot;2&quot;;
				}
				else
				{
					of.m_orderData[v[select - 1]][&quot;status&quot;] = &quot;-1&quot;;
				}
				of.updateOrder();
				cout &lt;&lt; &quot;审核完毕！&quot; &lt;&lt; endl;
				break;
			}
		}
		cout &lt;&lt; &quot;输入有误，请重新输入&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-3-2-测试审核预约" tabindex="-1"><a class="header-anchor" href="#_9-3-2-测试审核预约" aria-hidden="true">#</a> 9.3.2 测试审核预约</h4><p>测试 - 审核通过</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548677286679.png" alt="1548677286679" tabindex="0" loading="lazy"><figcaption>1548677286679</figcaption></figure><p>审核通过情况</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548677383681.png" alt="1548677383681" tabindex="0" loading="lazy"><figcaption>1548677383681</figcaption></figure><p>测试-审核未通过</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548677402705.png" alt="1548677402705" tabindex="0" loading="lazy"><figcaption>1548677402705</figcaption></figure><p>审核未通过情况：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548677632792.png" alt="1548677632792" tabindex="0" loading="lazy"><figcaption>1548677632792</figcaption></figure><p>学生身份下查看记录：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548677798815.png" alt="1548677798815" tabindex="0" loading="lazy"><figcaption>1548677798815</figcaption></figure><p>审核预约成功！</p><p>至此本案例制作完毕！ <code>^_^</code></p>`,395),d=[s];function a(u,r){return n(),e("div",null,d)}const m=i(l,[["render",a],["__file","7.机房预约系统.html.vue"]]);export{m as default};
