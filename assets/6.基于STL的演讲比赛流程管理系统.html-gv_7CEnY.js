import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as n,e as l}from"./app-DPu-SEhm.js";const a={},t=l(`<h1 id="演讲比赛流程管理系统" tabindex="-1"><a class="header-anchor" href="#演讲比赛流程管理系统" aria-hidden="true">#</a> 演讲比赛流程管理系统</h1><h2 id="_1、-演讲比赛程序需求" tabindex="-1"><a class="header-anchor" href="#_1、-演讲比赛程序需求" aria-hidden="true">#</a> 1、 演讲比赛程序需求</h2><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548154762048.png" alt="1548154762048" tabindex="0" loading="lazy"><figcaption>1548154762048</figcaption></figure><h3 id="_1-1-比赛规则" tabindex="-1"><a class="header-anchor" href="#_1-1-比赛规则" aria-hidden="true">#</a> 1.1 比赛规则</h3><ul><li>学校举行一场演讲比赛，共有<strong>12个人</strong>参加。<strong>比赛共两轮</strong>，第一轮为淘汰赛，第二轮为决赛。</li><li>比赛方式：<strong>分组比赛，每组6个人</strong>；选手每次要随机分组，进行比赛</li><li>每名选手都有对应的<strong>编号</strong>，如 10001 ~ 10012</li><li>第一轮分为两个小组，每组6个人。 整体按照选手编号进行<strong>抽签</strong>后顺序演讲。</li><li>当小组演讲完后，淘汰组内排名最后的三个选手，<strong>前三名晋级</strong>，进入下一轮的比赛。</li><li>第二轮为决赛，<strong>前三名胜出</strong></li><li>每轮比赛过后需要<strong>显示晋级选手的信息</strong></li></ul><h3 id="_1-2-程序功能" tabindex="-1"><a class="header-anchor" href="#_1-2-程序功能" aria-hidden="true">#</a> 1.2 程序功能</h3><ul><li>开始演讲比赛：完成整届比赛的流程，每个比赛阶段需要给用户一个提示，用户按任意键后继续下一个阶段</li><li>查看往届记录：查看之前比赛前三名结果，每次比赛都会记录到文件中，文件用.csv后缀名保存</li><li>清空比赛记录：将文件中数据清空</li><li>退出比赛程序：可以退出当前程序</li></ul><h3 id="_1-3-程序效果图" tabindex="-1"><a class="header-anchor" href="#_1-3-程序效果图" aria-hidden="true">#</a> 1.3 程序效果图：</h3><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548155966702.png" alt="1548155966702" tabindex="0" loading="lazy"><figcaption>1548155966702</figcaption></figure><h2 id="_2、-项目创建" tabindex="-1"><a class="header-anchor" href="#_2、-项目创建" aria-hidden="true">#</a> 2、 项目创建</h2><p>创建项目步骤如下：</p><ul><li>创建新项目</li><li>添加文件</li></ul><h3 id="_2-1-创建项目" tabindex="-1"><a class="header-anchor" href="#_2-1-创建项目" aria-hidden="true">#</a> 2.1 创建项目</h3><ul><li>打开vs2017后，点击创建新项目，创建新的C++项目</li></ul><p>如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548121881969.png" alt="1548121881969" tabindex="0" loading="lazy"><figcaption>1548121881969</figcaption></figure><ul><li>填写项目名称以及选取项目路径，点击确定生成项目</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548122271773.png" alt="1548122271773" tabindex="0" loading="lazy"><figcaption>1548122271773</figcaption></figure><h3 id="_2-2-添加文件" tabindex="-1"><a class="header-anchor" href="#_2-2-添加文件" aria-hidden="true">#</a> 2.2 添加文件</h3><ul><li>右键源文件，进行添加文件操作</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548122420253.png" alt="1548122420253" tabindex="0" loading="lazy"><figcaption>1548122420253</figcaption></figure><ul><li>填写文件名称，点击添加</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548122510869.png" alt="1548122510869" tabindex="0" loading="lazy"><figcaption>1548122510869</figcaption></figure><ul><li>生成文件成功，效果如下图</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548122619712.png" alt="1548122619712" tabindex="0" loading="lazy"><figcaption>1548122619712</figcaption></figure><ul><li>至此，项目已创建完毕</li></ul><h2 id="_3、-创建管理类" tabindex="-1"><a class="header-anchor" href="#_3、-创建管理类" aria-hidden="true">#</a> 3、 创建管理类</h2><p><strong>功能描述：</strong></p><ul><li>提供菜单界面与用户交互</li><li>对演讲比赛流程进行控制</li><li>与文件的读写交互</li></ul><h3 id="_3-1创建文件" tabindex="-1"><a class="header-anchor" href="#_3-1创建文件" aria-hidden="true">#</a> 3.1创建文件</h3><ul><li>在头文件和源文件的文件夹下分别创建speechManager.h 和 speechManager.cpp文件</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548123402593.png" alt="1548123402593" tabindex="0" loading="lazy"><figcaption>1548123402593</figcaption></figure><h3 id="_3-2-头文件实现" tabindex="-1"><a class="header-anchor" href="#_3-2-头文件实现" aria-hidden="true">#</a> 3.2 头文件实现</h3><p>在speechManager.h中设计管理类</p><p>代码如下：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;

//演讲管理类
class SpeechManager
{
public:

	//构造函数
	SpeechManager();


	//析构函数
	~SpeechManager();
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-源文件实现" tabindex="-1"><a class="header-anchor" href="#_3-3-源文件实现" aria-hidden="true">#</a> 3.3 源文件实现</h3><p>在speechManager.cpp中将构造和析构函数空实现补全</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;speechManager.h&quot;

SpeechManager::SpeechManager()
{
}

SpeechManager::~SpeechManager()
{
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>至此演讲管理类以创建完毕</li></ul><h2 id="_4、-菜单功能" tabindex="-1"><a class="header-anchor" href="#_4、-菜单功能" aria-hidden="true">#</a> 4、 菜单功能</h2><p>功能描述：与用户的沟通界面</p><h3 id="_4-1-添加成员函数" tabindex="-1"><a class="header-anchor" href="#_4-1-添加成员函数" aria-hidden="true">#</a> 4.1 添加成员函数</h3><p>在管理类speechManager.h中添加成员函数 <code>void show_Menu();</code></p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548123942072.png" alt="1548123942072" tabindex="0" loading="lazy"><figcaption>1548123942072</figcaption></figure><h3 id="_4-2-菜单功能实现" tabindex="-1"><a class="header-anchor" href="#_4-2-菜单功能实现" aria-hidden="true">#</a> 4.2 菜单功能实现</h3><ul><li>在管理类speechManager.cpp中实现 show_Menu()函数</li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void SpeechManager::show_Menu()
{
	cout &lt;&lt; &quot;********************************************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  欢迎参加演讲比赛 ************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  1.开始演讲比赛  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  2.查看往届记录  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  3.清空比赛记录  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*************  0.退出比赛程序  *************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;********************************************&quot; &lt;&lt; endl;
	cout &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-测试菜单功能" tabindex="-1"><a class="header-anchor" href="#_4-3-测试菜单功能" aria-hidden="true">#</a> 4.3 测试菜单功能</h3><ul><li>在演讲比赛流程管理系统.cpp中测试菜单功能</li></ul><p>代码：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include&lt;iostream&gt;
using namespace std;
#include &quot;speechManager.h&quot;

int main() {

	SpeechManager sm;

	sm.show_Menu();

	system(&quot;pause&quot;);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>运行效果如图：</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548124599641.png" alt="1548124599641" tabindex="0" loading="lazy"><figcaption>1548124599641</figcaption></figure><ul><li>菜单界面搭建完毕</li></ul><h2 id="_5、-退出功能" tabindex="-1"><a class="header-anchor" href="#_5、-退出功能" aria-hidden="true">#</a> 5、 退出功能</h2><h3 id="_5-1-提供功能接口" tabindex="-1"><a class="header-anchor" href="#_5-1-提供功能接口" aria-hidden="true">#</a> 5.1 提供功能接口</h3><ul><li>在main函数中提供分支选择，提供每个功能接口</li></ul><p>代码：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int main() {

	SpeechManager sm;

	int choice = 0; //用来存储用户的选项

	while (true)
	{
		sm.show_Menu();

		cout &lt;&lt; &quot;请输入您的选择： &quot; &lt;&lt; endl;
		cin &gt;&gt; choice; // 接受用户的选项

		switch (choice)
		{
		case 1:  //开始比赛
			break;
		case 2:  //查看记录
			break;
		case 3:  //清空记录
			break;
		case 0:  //退出系统
			break;
		default:
			system(&quot;cls&quot;); //清屏
			break;
		}
	}

	system(&quot;pause&quot;);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-实现退出功能" tabindex="-1"><a class="header-anchor" href="#_5-2-实现退出功能" aria-hidden="true">#</a> 5.2 实现退出功能</h3><p>在speechManager.h中提供退出系统的成员函数 <code> void exitSystem();</code></p><p>在speechManager.cpp中提供具体的功能实现</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void SpeechManager::exitSystem()
{
	cout &lt;&lt; &quot;欢迎下次使用&quot; &lt;&lt; endl;
	system(&quot;pause&quot;);
	exit(0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3测试功能" tabindex="-1"><a class="header-anchor" href="#_5-3测试功能" aria-hidden="true">#</a> 5.3测试功能</h3><p>在main函数分支 0 选项中，调用退出程序的接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548124853576.png" alt="1548124853576" tabindex="0" loading="lazy"><figcaption>1548124853576</figcaption></figure><p>运行测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548124888578.png" alt="1548124888578" tabindex="0" loading="lazy"><figcaption>1548124888578</figcaption></figure><h2 id="_6、演讲比赛功能" tabindex="-1"><a class="header-anchor" href="#_6、演讲比赛功能" aria-hidden="true">#</a> 6、演讲比赛功能</h2><h3 id="_6-1-功能分析" tabindex="-1"><a class="header-anchor" href="#_6-1-功能分析" aria-hidden="true">#</a> 6.1 功能分析</h3><p>比赛流程分析：</p><p>抽签 → 开始演讲比赛 → 显示第一轮比赛结果 →</p><p>抽签 → 开始演讲比赛 → 显示前三名结果 → 保存分数</p><h3 id="_6-2-创建选手类" tabindex="-1"><a class="header-anchor" href="#_6-2-创建选手类" aria-hidden="true">#</a> 6.2 创建选手类</h3><ul><li>选手类中的属性包含：选手姓名、分数</li><li>头文件中创建 speaker.h文件，并添加代码：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#pragma once
#include&lt;iostream&gt;
using namespace std;

class Speaker
{
public:
	string m_Name;  //姓名
	double m_Score[2]; //分数  最多有两轮得分
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-比赛" tabindex="-1"><a class="header-anchor" href="#_6-3-比赛" aria-hidden="true">#</a> 6.3 比赛</h3><h4 id="_6-3-1-成员属性添加" tabindex="-1"><a class="header-anchor" href="#_6-3-1-成员属性添加" aria-hidden="true">#</a> 6.3.1 成员属性添加</h4><ul><li>在speechManager.h中添加属性</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//比赛选手 容器  12人
vector&lt;int&gt;v1;

//第一轮晋级容器  6人
vector&lt;int&gt;v2;

//胜利前三名容器  3人
vector&lt;int&gt;vVictory;

//存放编号 以及对应的 具体选手 容器
map&lt;int, Speaker&gt; m_Speaker;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-3-2-初始化属性" tabindex="-1"><a class="header-anchor" href="#_6-3-2-初始化属性" aria-hidden="true">#</a> 6.3.2 初始化属性</h4><ul><li>在speechManager.h中提供开始比赛的的成员函数 <code>void initSpeech();</code></li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>//初始化属性
void initSpeech();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现<code>void initSpeech();</code></li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void SpeechManager::initSpeech()
{
	//容器保证为空
	this-&gt;v1.clear();  
	this-&gt;v2.clear();
	this-&gt;vVictory.clear();
	this-&gt;m_Speaker.clear();
	//初始化比赛轮数
	this-&gt;m_Index = 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>SpeechManager构造函数中调用<code>void initSpeech();</code></li></ul><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>SpeechManager::SpeechManager()
{
	//初始化属性
	this-&gt;initSpeech();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-3-3-创建选手" tabindex="-1"><a class="header-anchor" href="#_6-3-3-创建选手" aria-hidden="true">#</a> 6.3.3 创建选手</h4><ul><li>在speechManager.h中提供开始比赛的的成员函数 <code>void createSpeaker();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//初始化创建12名选手
void createSpeaker();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现<code>void createSpeaker();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::createSpeaker()
{
	string nameSeed = &quot;ABCDEFGHIJKL&quot;;
	for (int i = 0; i &lt; nameSeed.size(); i++)
	{
		string name = &quot;选手&quot;;
		name += nameSeed[i];

		Speaker sp;
		sp.m_Name = name;
		for (int i = 0; i &lt; 2; i++)
		{
			sp.m_Score[i] = 0;
		}

		//12名选手编号
		this-&gt;v1.push_back(i + 10001);

		//选手编号 以及对应的选手 存放到map容器中
		this-&gt;m_Speaker.insert(make_pair(i + 10001, sp));
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>SpeechManager类的 构造函数中调用<code>void createSpeaker();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>SpeechManager::SpeechManager()
{
    //初始化属性
	this-&gt;initSpeech();
    
	//创建选手
	this-&gt;createSpeaker();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>测试 在main函数中，可以在创建完管理对象后，使用下列代码测试12名选手初始状态</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>for (map&lt;int, Speaker&gt;::iterator it = sm.m_Speaker.begin(); it != sm.m_Speaker.end(); it++)
{
	cout  &lt;&lt; &quot;选手编号：&quot; &lt;&lt; it-&gt;first 
          &lt;&lt; &quot; 姓名： &quot; &lt;&lt; it-&gt;second.m_Name 
          &lt;&lt; &quot; 成绩： &quot; &lt;&lt; it-&gt;second.m_Score[0] &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548141605742.png" alt="1548141605742" tabindex="0" loading="lazy"><figcaption>1548141605742</figcaption></figure><ul><li>测试效果如图：</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548141560164.png" alt="1548141560164" tabindex="0" loading="lazy"><figcaption>1548141560164</figcaption></figure><ul><li>测试完毕后，可以将测试代码删除或注释。</li></ul><h4 id="_6-3-4-开始比赛成员函数添加" tabindex="-1"><a class="header-anchor" href="#_6-3-4-开始比赛成员函数添加" aria-hidden="true">#</a> 6.3.4 开始比赛成员函数添加</h4><ul><li>在speechManager.h中提供开始比赛的的成员函数 <code>void startSpeech();</code></li><li>该函数功能是主要控制比赛的流程</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//开始比赛 - 比赛流程控制
void startSpeech();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中将startSpeech的空实现先写入</li><li>我们可以先将整个比赛的流程 写到函数中</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//开始比赛
void SpeechManager::startSpeech()
{
	//第一轮比赛
	//1、抽签
	
	//2、比赛

	//3、显示晋级结果

	//第二轮比赛

	//1、抽签

	//2、比赛

	//3、显示最终结果

	//4、保存分数
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-3-5-抽签" tabindex="-1"><a class="header-anchor" href="#_6-3-5-抽签" aria-hidden="true">#</a> 6.3.5 抽签</h4><p><strong>功能描述：</strong></p><ul><li><p>正式比赛前，所有选手的比赛顺序需要打乱，我们只需要将存放选手编号的容器 打乱次序即可</p></li><li><p>在speechManager.h中提供抽签的的成员函数 <code>void speechDraw();</code></p></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//抽签
void speechDraw();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void speechDraw();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::speechDraw()
{
	cout &lt;&lt; &quot;第 &lt;&lt; &quot; &lt;&lt; this-&gt;m_Index &lt;&lt; &quot; &gt;&gt; 轮比赛选手正在抽签&quot;&lt;&lt;endl;
	cout &lt;&lt; &quot;---------------------&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;抽签后演讲顺序如下：&quot; &lt;&lt; endl;
	if (this-&gt;m_Index == 1)
	{
		random_shuffle(v1.begin(), v1.end());
		for (vector&lt;int&gt;::iterator it = v1.begin(); it != v1.end(); it++)
		{
			cout &lt;&lt; *it &lt;&lt; &quot; &quot;;
		}
		cout &lt;&lt; endl;
	}
	else
	{
		random_shuffle(v2.begin(), v2.end());
		for (vector&lt;int&gt;::iterator it = v2.begin(); it != v2.end(); it++)
		{
			cout &lt;&lt; *it &lt;&lt; &quot; &quot;;
		}
		cout &lt;&lt; endl;
	}
	cout &lt;&lt; &quot;---------------------&quot; &lt;&lt; endl;
	system(&quot;pause&quot;);
	cout &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在startSpeech比赛流程控制的函数中，调用抽签函数</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548143871202.png" alt="1548143871202" tabindex="0" loading="lazy"><figcaption>1548143871202</figcaption></figure><ul><li>在main函数中，分支1选项中，调用开始比赛的接口</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548143543475.png" alt="1548143543475" tabindex="0" loading="lazy"><figcaption>1548143543475</figcaption></figure><ul><li>测试</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548143610682.png" alt="1548143610682" tabindex="0" loading="lazy"><figcaption>1548143610682</figcaption></figure><h4 id="_6-3-6-开始比赛" tabindex="-1"><a class="header-anchor" href="#_6-3-6-开始比赛" aria-hidden="true">#</a> 6.3.6 开始比赛</h4><ul><li>在speechManager.h中提供比赛的的成员函数 <code>void speechContest();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//比赛
void speechContest();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void speechContest();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::speechContest()
{
	cout &lt;&lt; &quot;------------- 第&quot;&lt;&lt; this-&gt;m_Index &lt;&lt; &quot;轮正式比赛开始：------------- &quot; &lt;&lt; endl;

	multimap&lt;double, int, greater&lt;int&gt;&gt; groupScore; //临时容器，保存key分数 value 选手编号

	int num = 0; //记录人员数，6个为1组

	vector &lt;int&gt;v_Src;   //比赛的人员容器
	if (this-&gt;m_Index == 1)
	{
		v_Src = v1;
	}
	else
	{
		v_Src = v2;
	}

	//遍历所有参赛选手
	for (vector&lt;int&gt;::iterator it = v_Src.begin(); it != v_Src.end(); it++)
	{
		num++;

		//评委打分
		deque&lt;double&gt;d;
		for (int i = 0; i &lt; 10; i++)
		{
			double score = (rand() % 401 + 600) / 10.f;  // 600 ~ 1000
			//cout &lt;&lt; score &lt;&lt; &quot; &quot;;
			d.push_back(score);
		}

		sort(d.begin(), d.end(), greater&lt;double&gt;());				//排序
		d.pop_front();												//去掉最高分
		d.pop_back();												//去掉最低分

		double sum = accumulate(d.begin(), d.end(), 0.0f);				//获取总分
		double avg = sum / (double)d.size();									//获取平均分

		//每个人平均分
		//cout &lt;&lt; &quot;编号： &quot; &lt;&lt; *it  &lt;&lt; &quot; 选手： &quot; &lt;&lt; this-&gt;m_Speaker[*it].m_Name &lt;&lt; &quot; 获取平均分为： &quot; &lt;&lt; avg &lt;&lt; endl;  //打印分数
		this-&gt;m_Speaker[*it].m_Score[this-&gt;m_Index - 1] = avg;

		//6个人一组，用临时容器保存
		groupScore.insert(make_pair(avg, *it));
		if (num % 6 == 0)
		{

			cout &lt;&lt; &quot;第&quot; &lt;&lt; num / 6 &lt;&lt; &quot;小组比赛名次：&quot; &lt;&lt; endl;
			for (multimap&lt;double, int, greater&lt;int&gt;&gt;::iterator it = groupScore.begin(); it != groupScore.end(); it++)
			{
				cout &lt;&lt; &quot;编号: &quot; &lt;&lt; it-&gt;second &lt;&lt; &quot; 姓名： &quot; &lt;&lt; this-&gt;m_Speaker[it-&gt;second].m_Name &lt;&lt; &quot; 成绩： &quot; &lt;&lt; this-&gt;m_Speaker[it-&gt;second].m_Score[this-&gt;m_Index - 1] &lt;&lt; endl;
			}

			int count = 0;
			//取前三名
			for (multimap&lt;double, int, greater&lt;int&gt;&gt;::iterator it = groupScore.begin(); it != groupScore.end() &amp;&amp; count &lt; 3; it++, count++)
			{
				if (this-&gt;m_Index == 1)
				{
					v2.push_back((*it).second);
				}
				else
				{
					vVictory.push_back((*it).second);
				}
			}

			groupScore.clear();

			cout &lt;&lt; endl;

		}
	}
	cout &lt;&lt; &quot;------------- 第&quot; &lt;&lt; this-&gt;m_Index &lt;&lt; &quot;轮比赛完毕  ------------- &quot; &lt;&lt; endl;
	system(&quot;pause&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在startSpeech比赛流程控制的函数中，调用比赛函数</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548144491984.png" alt="1548144491984" tabindex="0" loading="lazy"><figcaption>1548144491984</figcaption></figure><ul><li>再次运行代码，测试比赛</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548144765146.png" alt="1548144765146" tabindex="0" loading="lazy"><figcaption>1548144765146</figcaption></figure><h4 id="_6-3-7-显示比赛分数" tabindex="-1"><a class="header-anchor" href="#_6-3-7-显示比赛分数" aria-hidden="true">#</a> 6.3.7 显示比赛分数</h4><ul><li>在speechManager.h中提供比赛的的成员函数 <code>void showScore();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//显示比赛结果
void showScore();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void showScore();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::showScore()
{
	cout &lt;&lt; &quot;---------第&quot; &lt;&lt; this-&gt;m_Index &lt;&lt; &quot;轮晋级选手信息如下：-----------&quot; &lt;&lt; endl;
	vector&lt;int&gt;v;
	if (this-&gt;m_Index == 1)
	{
		v = v2;
	}
	else
	{
		v = vVictory;
	}

	for (vector&lt;int&gt;::iterator it = v.begin(); it != v.end(); it++)
	{
		cout &lt;&lt; &quot;选手编号：&quot; &lt;&lt; *it &lt;&lt; &quot; 姓名： &quot; &lt;&lt; m_Speaker[*it].m_Name &lt;&lt; &quot; 得分： &quot; &lt;&lt; m_Speaker[*it].m_Score[this-&gt;m_Index - 1] &lt;&lt; endl;
	}
	cout &lt;&lt; endl;

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
	this-&gt;show_Menu(); 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在startSpeech比赛流程控制的函数中，调用显示比赛分数函数</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548146903960.png" alt="1548146903960" tabindex="0" loading="lazy"><figcaption>1548146903960</figcaption></figure><ul><li>运行代码，测试效果</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548146961550.png" alt="1548146961550" tabindex="0" loading="lazy"><figcaption>1548146961550</figcaption></figure><h4 id="_6-3-8-第二轮比赛" tabindex="-1"><a class="header-anchor" href="#_6-3-8-第二轮比赛" aria-hidden="true">#</a> 6.3.8 第二轮比赛</h4><p>第二轮比赛流程同第一轮，只是比赛的轮是+1，其余流程不变</p><ul><li>在startSpeech比赛流程控制的函数中，加入第二轮的流程</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548148593215.png" alt="1548148593215" tabindex="0" loading="lazy"><figcaption>1548148593215</figcaption></figure><p>测试，将整个比赛流程都跑通</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548148536395.png" alt="1548148536395" tabindex="0" loading="lazy"><figcaption>1548148536395</figcaption></figure><h3 id="_6-4-保存分数" tabindex="-1"><a class="header-anchor" href="#_6-4-保存分数" aria-hidden="true">#</a> 6.4 保存分数</h3><p><strong>功能描述：</strong></p><ul><li>将每次演讲比赛的得分记录到文件中</li></ul><p><strong>功能实现：</strong></p><ul><li>在speechManager.h中添加保存记录的成员函数 <code>void saveRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//保存记录
void saveRecord();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void saveRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::saveRecord()
{
	ofstream ofs;
	ofs.open(&quot;speech.csv&quot;, ios::out | ios::app); // 用输出的方式打开文件  -- 写文件

	//将每个人数据写入到文件中
	for (vector&lt;int&gt;::iterator it = vVictory.begin(); it != vVictory.end(); it++)
	{
		ofs &lt;&lt; *it &lt;&lt; &quot;,&quot;
			&lt;&lt; m_Speaker[*it].m_Score[1] &lt;&lt; &quot;,&quot;;
	}
	ofs &lt;&lt; endl;
    
	//关闭文件
	ofs.close();
    
	cout &lt;&lt; &quot;记录已经保存&quot; &lt;&lt; endl;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在startSpeech比赛流程控制的函数中，最后调用保存记录分数函数</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548149937860.png" alt="1548149937860" tabindex="0" loading="lazy"><figcaption>1548149937860</figcaption></figure><ul><li>测试，整个比赛完毕后记录保存情况</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548149912863.png" alt="1548149912863" tabindex="0" loading="lazy"><figcaption>1548149912863</figcaption></figure><p>利用记事本打开文件 speech.csv，里面保存了前三名选手的编号以及得分</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548150047975.png" alt="1548150047975" tabindex="0" loading="lazy"><figcaption>1548150047975</figcaption></figure><p>至此，整个演讲比赛功能制作完毕！</p><h2 id="_7、-查看记录" tabindex="-1"><a class="header-anchor" href="#_7、-查看记录" aria-hidden="true">#</a> 7、 查看记录</h2><h3 id="_7-1-读取记录分数" tabindex="-1"><a class="header-anchor" href="#_7-1-读取记录分数" aria-hidden="true">#</a> 7.1 读取记录分数</h3><ul><li>在speechManager.h中添加保存记录的成员函数 <code>void loadRecord();</code></li><li>添加判断文件是否为空的标志 <code>bool fileIsEmpty;</code></li><li>添加往届记录的容器<code>map&lt;int, vector&lt;string&gt;&gt; m_Record;</code></li></ul><p>其中m_Record 中的key代表第几届，value记录具体的信息</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//读取记录
void loadRecord();

//文件为空的标志
bool fileIsEmpty;

//往届记录
map&lt;int, vector&lt;string&gt;&gt; m_Record;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void loadRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::loadRecord()
{
	ifstream ifs(&quot;speech.csv&quot;, ios::in); //输入流对象 读取文件

	if (!ifs.is_open())
	{
		this-&gt;fileIsEmpty = true;
		cout &lt;&lt; &quot;文件不存在！&quot; &lt;&lt; endl;
		ifs.close();
		return;
	}

	char ch;
	ifs &gt;&gt; ch;
	if (ifs.eof())
	{
		cout &lt;&lt; &quot;文件为空!&quot; &lt;&lt; endl;
		this-&gt;fileIsEmpty = true;
		ifs.close();
		return;
	}

	//文件不为空
	this-&gt;fileIsEmpty = false;

	ifs.putback(ch); //读取的单个字符放回去

	string data;
	int index = 0;
	while (ifs &gt;&gt; data)
	{
		//cout &lt;&lt; data &lt;&lt; endl;
		vector&lt;string&gt;v;

		int pos = -1;
		int start = 0;

		while (true)
		{
			pos = data.find(&quot;,&quot;, start); //从0开始查找 &#39;,&#39;
			if (pos == -1)
			{
				break; //找不到break返回
			}
			string tmp = data.substr(start, pos - start); //找到了,进行分割 参数1 起始位置，参数2 截取长度
			v.push_back(tmp);
			start = pos + 1;
		}

		this-&gt;m_Record.insert(make_pair(index, v));
		index++;
	}

	ifs.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在SpeechManager构造函数中调用获取往届记录函数</li></ul><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548151977242.png" alt="1548151977242" tabindex="0" loading="lazy"><figcaption>1548151977242</figcaption></figure><h3 id="_7-2-查看记录功能" tabindex="-1"><a class="header-anchor" href="#_7-2-查看记录功能" aria-hidden="true">#</a> 7.2 查看记录功能</h3><ul><li>在speechManager.h中添加保存记录的成员函数 <code>void showRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//显示往届得分
void showRecord();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void showRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::showRecord()
{
	for (int i = 0; i &lt; this-&gt;m_Record.size(); i++)
	{
		cout &lt;&lt; &quot;第&quot; &lt;&lt; i + 1 &lt;&lt; &quot;届 &quot; &lt;&lt;
			&quot;冠军编号：&quot; &lt;&lt; this-&gt;m_Record[i][0] &lt;&lt; &quot; 得分：&quot; &lt;&lt; this-&gt;m_Record[i][1] &lt;&lt; &quot; &quot;
			&quot;亚军编号：&quot; &lt;&lt; this-&gt;m_Record[i][2] &lt;&lt; &quot; 得分：&quot; &lt;&lt; this-&gt;m_Record[i][3] &lt;&lt; &quot; &quot;
			&quot;季军编号：&quot; &lt;&lt; this-&gt;m_Record[i][4] &lt;&lt; &quot; 得分：&quot; &lt;&lt; this-&gt;m_Record[i][5] &lt;&lt; endl;
	}
    system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-测试功能" tabindex="-1"><a class="header-anchor" href="#_7-3-测试功能" aria-hidden="true">#</a> 7.3 测试功能</h3><p>在main函数分支 2 选项中，调用查看记录的接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548152359604.png" alt="1548152359604" tabindex="0" loading="lazy"><figcaption>1548152359604</figcaption></figure><p>显示效果如图：（本次测试添加了4条记录）</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548152394715.png" alt="1548152394715" tabindex="0" loading="lazy"><figcaption>1548152394715</figcaption></figure><h3 id="_7-4-bug解决" tabindex="-1"><a class="header-anchor" href="#_7-4-bug解决" aria-hidden="true">#</a> 7.4 bug解决</h3><p>目前程序中有几处bug未解决：</p><ol><li>查看往届记录，若文件不存在或为空，并未提示</li></ol><p>解决方式：在showRecord函数中，开始判断文件状态并加以判断</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548152803116.png" alt="1548152803116" tabindex="0" loading="lazy"><figcaption>1548152803116</figcaption></figure><ol start="2"><li>若记录为空或不存在，比完赛后依然提示记录为空</li></ol><p>解决方式：saveRecord中更新文件为空的标志</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548153005042.png" alt="1548153005042" tabindex="0" loading="lazy"><figcaption>1548153005042</figcaption></figure><ol start="3"><li>比完赛后查不到本届比赛的记录，没有实时更新</li></ol><p>解决方式：比赛完毕后，所有数据重置</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548153319587.png" alt="1548153319587" tabindex="0" loading="lazy"><figcaption>1548153319587</figcaption></figure><ol start="4"><li>在初始化时，没有初始化记录容器</li></ol><p>解决方式：initSpeech中添加 初始化记录容器</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548154340974.png" alt="1548154340974" tabindex="0" loading="lazy"><figcaption>1548154340974</figcaption></figure><ol start="5"><li>每次记录都是一样的</li></ol><p>解决方式：在main函数一开始 添加随机数种子</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>srand((unsigned int)time(NULL));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所有bug解决后 测试：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548153571603.png" alt="1548153571603" tabindex="0" loading="lazy"><figcaption>1548153571603</figcaption></figure><h2 id="_8、-清空记录" tabindex="-1"><a class="header-anchor" href="#_8、-清空记录" aria-hidden="true">#</a> 8、 清空记录</h2><h3 id="_8-1-清空记录功能实现" tabindex="-1"><a class="header-anchor" href="#_8-1-清空记录功能实现" aria-hidden="true">#</a> 8.1 清空记录功能实现</h3><ul><li>在speechManager.h中添加保存记录的成员函数 <code>void clearRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//清空记录
void clearRecord();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在speechManager.cpp中实现成员函数 <code>void clearRecord();</code></li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>void SpeechManager::clearRecord()
{
	cout &lt;&lt; &quot;确认清空？&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;1、确认&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;2、返回&quot; &lt;&lt; endl;

	int select = 0;
	cin &gt;&gt; select;

	if (select == 1)
	{
		//打开模式 ios::trunc 如果存在删除文件并重新创建
		ofstream ofs(&quot;speech.csv&quot;, ios::trunc);
		ofs.close();

		//初始化属性
		this-&gt;initSpeech();

		//创建选手
		this-&gt;createSpeaker();

		//获取往届记录
		this-&gt;loadRecord();
		

		cout &lt;&lt; &quot;清空成功！&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-测试清空" tabindex="-1"><a class="header-anchor" href="#_8-2-测试清空" aria-hidden="true">#</a> 8.2 测试清空</h3><p>在main函数分支 3 选项中，调用清空比赛记录的接口</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548154674242.png" alt="1548154674242" tabindex="0" loading="lazy"><figcaption>1548154674242</figcaption></figure><p>运行程序，测试清空记录：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548154004738.png" alt="1548154004738" tabindex="0" loading="lazy"><figcaption>1548154004738</figcaption></figure><p>speech.csv中记录也为空</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1548154508831.png" alt="1548154508831" tabindex="0" loading="lazy"><figcaption>1548154508831</figcaption></figure><ul><li>至此本案例结束！ <code>^_^</code></li></ul>`,209),d=[t];function s(r,c){return e(),n("div",null,d)}const m=i(a,[["render",s],["__file","6.基于STL的演讲比赛流程管理系统.html.vue"]]);export{m as default};
