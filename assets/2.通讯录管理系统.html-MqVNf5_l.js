import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as n,e as t}from"./app-DPu-SEhm.js";const l={},s=t(`<h1 id="通讯录管理系统" tabindex="-1"><a class="header-anchor" href="#通讯录管理系统" aria-hidden="true">#</a> 通讯录管理系统</h1><h2 id="_1、系统需求" tabindex="-1"><a class="header-anchor" href="#_1、系统需求" aria-hidden="true">#</a> 1、系统需求</h2><p>通讯录是一个可以记录亲人、好友信息的工具。</p><p>本教程主要利用C++来实现一个通讯录管理系统</p><p>系统中需要实现的功能如下：</p><ul><li>添加联系人：向通讯录中添加新人，信息包括（姓名、性别、年龄、联系电话、家庭住址）最多记录1000人</li><li>显示联系人：显示通讯录中所有联系人信息</li><li>删除联系人：按照姓名进行删除指定联系人</li><li>查找联系人：按照姓名查看指定联系人信息</li><li>修改联系人：按照姓名重新修改指定联系人</li><li>清空联系人：清空通讯录中所有信息</li><li>退出通讯录：退出当前使用的通讯录</li></ul><h2 id="_2、创建项目" tabindex="-1"><a class="header-anchor" href="#_2、创建项目" aria-hidden="true">#</a> 2、创建项目</h2><p>创建项目步骤如下：</p><ul><li>创建新项目</li><li>添加文件</li></ul><h3 id="_2-1-创建项目" tabindex="-1"><a class="header-anchor" href="#_2-1-创建项目" aria-hidden="true">#</a> 2.1 创建项目</h3><p>打开vs2017后，点击创建新项目，创建新的C++项目</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544151401138.png" alt="1544151401138" tabindex="0" loading="lazy"><figcaption>1544151401138</figcaption></figure><p>填写项目名称，选择项目路径</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544151579620.png" alt="1544151579620" tabindex="0" loading="lazy"><figcaption>1544151579620</figcaption></figure><h3 id="_2-2添加文件" tabindex="-1"><a class="header-anchor" href="#_2-2添加文件" aria-hidden="true">#</a> 2.2添加文件</h3><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544161551746.png" alt="1544161551746" tabindex="0" loading="lazy"><figcaption>1544161551746</figcaption></figure><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544161648175.png" alt="1544161648175" tabindex="0" loading="lazy"><figcaption>1544161648175</figcaption></figure><p>添加成功后，效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544162344057.png" alt="1544162344057" tabindex="0" loading="lazy"><figcaption>1544162344057</figcaption></figure><p>至此，项目已创建完毕</p><h2 id="_3、菜单功能" tabindex="-1"><a class="header-anchor" href="#_3、菜单功能" aria-hidden="true">#</a> 3、菜单功能</h2><p><strong>功能描述：</strong> 用户选择功能的界面</p><p>菜单界面效果如下图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544149559893.png" alt="1544149559893" tabindex="0" loading="lazy"><figcaption>1544149559893</figcaption></figure><p><strong>步骤：</strong></p><ul><li>封装函数显示该界面 如 <code>void showMenu()</code></li><li>在main函数中调用封装好的函数</li></ul><p><strong>代码：</strong></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include&lt;iostream&gt;
using namespace std;

//菜单界面
void showMenu()
{
	cout &lt;&lt; &quot;***************************&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  1、添加联系人  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  2、显示联系人  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  3、删除联系人  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  4、查找联系人  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  5、修改联系人  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  6、清空联系人  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;*****  0、退出通讯录  *****&quot; &lt;&lt; endl;
	cout &lt;&lt; &quot;***************************&quot; &lt;&lt; endl;
}

int main() {

	showMenu();

	system(&quot;pause&quot;);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4、退出功能" tabindex="-1"><a class="header-anchor" href="#_4、退出功能" aria-hidden="true">#</a> 4、退出功能</h2><p>功能描述：退出通讯录系统</p><p>思路：根据用户不同的选择，进入不同的功能，可以选择switch分支结构，将整个架构进行搭建</p><p>当用户选择0时候，执行退出，选择其他先不做操作，也不会退出程序</p><p><strong>代码：</strong></p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int main() {

	int select = 0;

	while (true)
	{
		showMenu();

		cin &gt;&gt; select;
		
		switch (select)
		{
		case 1:  //添加联系人
			break;
		case 2:  //显示联系人
			break;
		case 3:  //删除联系人
			break;
		case 4:  //查找联系人
			break;
		case 5:  //修改联系人
			break;
		case 6:  //清空联系人
			break;
		case 0:  //退出通讯录
			cout &lt;&lt; &quot;欢迎下次使用&quot; &lt;&lt; endl;
			system(&quot;pause&quot;);
			return 0;
			break;
		default:
			break;
		}
	}

	system(&quot;pause&quot;);

	return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>效果图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544163868043.png" alt="1544163868043" tabindex="0" loading="lazy"><figcaption>1544163868043</figcaption></figure><h2 id="_5、添加联系人" tabindex="-1"><a class="header-anchor" href="#_5、添加联系人" aria-hidden="true">#</a> 5、添加联系人</h2><p>功能描述：</p><p>实现添加联系人功能，联系人上限为1000人，联系人信息包括（姓名、性别、年龄、联系电话、家庭住址）</p><p>添加联系人实现步骤：</p><ul><li>设计联系人结构体</li><li>设计通讯录结构体</li><li>main函数中创建通讯录</li><li>封装添加联系人函数</li><li>测试添加联系人功能</li></ul><h3 id="_5-1-设计联系人结构体" tabindex="-1"><a class="header-anchor" href="#_5-1-设计联系人结构体" aria-hidden="true">#</a> 5.1 设计联系人结构体</h3><p>联系人信息包括：姓名、性别、年龄、联系电话、家庭住址</p><p>设计如下：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;string&gt;  //string头文件
//联系人结构体
struct Person
{
	string m_Name; //姓名
	int m_Sex; //性别：1男 2女
	int m_Age; //年龄
	string m_Phone; //电话
	string m_Addr; //住址
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-设计通讯录结构体" tabindex="-1"><a class="header-anchor" href="#_5-2-设计通讯录结构体" aria-hidden="true">#</a> 5.2 设计通讯录结构体</h3><p>设计时候可以在通讯录结构体中，维护一个容量为1000的存放联系人的数组，并记录当前通讯录中联系人数量</p><p>设计如下</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#define MAX 1000 //最大人数

//通讯录结构体
struct Addressbooks
{
	struct Person personArray[MAX]; //通讯录中保存的联系人数组
	int m_Size; //通讯录中人员个数
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-main函数中创建通讯录" tabindex="-1"><a class="header-anchor" href="#_5-3-main函数中创建通讯录" aria-hidden="true">#</a> 5.3 main函数中创建通讯录</h3><p>添加联系人函数封装好后，在main函数中创建一个通讯录变量，这个就是我们需要一直维护的通讯录</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>mian函数起始位置添加：
	//创建通讯录
	Addressbooks abs;
	//初始化通讯录中人数
	abs.m_Size = 0;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-封装添加联系人函数" tabindex="-1"><a class="header-anchor" href="#_5-4-封装添加联系人函数" aria-hidden="true">#</a> 5.4 封装添加联系人函数</h3><p>思路：添加联系人前先判断通讯录是否已满，如果满了就不再添加，未满情况将新联系人信息逐个加入到通讯录</p><p>添加联系人代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//1、添加联系人信息
void addPerson(Addressbooks *abs)
{
	//判断电话本是否满了
	if (abs-&gt;m_Size == MAX)
	{
		cout &lt;&lt; &quot;通讯录已满，无法添加&quot; &lt;&lt; endl;
		return;
	}
	else
	{
		//姓名
		string name;
		cout &lt;&lt; &quot;请输入姓名：&quot; &lt;&lt; endl;
		cin &gt;&gt; name;
		abs-&gt;personArray[abs-&gt;m_Size].m_Name = name;

		cout &lt;&lt; &quot;请输入性别：&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;1 -- 男&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;2 -- 女&quot; &lt;&lt; endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin &gt;&gt; sex;
			if (sex == 1 || sex == 2)
			{
				abs-&gt;personArray[abs-&gt;m_Size].m_Sex = sex;
				break;
			}
			cout &lt;&lt; &quot;输入有误，请重新输入&quot;;
		}

		//年龄
		cout &lt;&lt; &quot;请输入年龄：&quot; &lt;&lt; endl;
		int age = 0;
		cin &gt;&gt; age;
		abs-&gt;personArray[abs-&gt;m_Size].m_Age = age;

		//联系电话
		cout &lt;&lt; &quot;请输入联系电话：&quot; &lt;&lt; endl;
		string phone = &quot;&quot;;
		cin &gt;&gt; phone;
		abs-&gt;personArray[abs-&gt;m_Size].m_Phone = phone;

		//家庭住址
		cout &lt;&lt; &quot;请输入家庭住址：&quot; &lt;&lt; endl;
		string address;
		cin &gt;&gt; address;
		abs-&gt;personArray[abs-&gt;m_Size].m_Addr = address;

		//更新通讯录人数
		abs-&gt;m_Size++;

		cout &lt;&lt; &quot;添加成功&quot; &lt;&lt; endl;
		system(&quot;pause&quot;);
		system(&quot;cls&quot;);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5-测试添加联系人功能" tabindex="-1"><a class="header-anchor" href="#_5-5-测试添加联系人功能" aria-hidden="true">#</a> 5.5 测试添加联系人功能</h3><p>选择界面中，如果玩家选择了1，代表添加联系人，我们可以测试下该功能</p><p>在switch case 语句中，case1里添加：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>case 1:  //添加联系人
	addPerson(&amp;abs);
	break;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544165554002.png" alt="1544165554002" tabindex="0" loading="lazy"><figcaption>1544165554002</figcaption></figure><h2 id="_6、显示联系人" tabindex="-1"><a class="header-anchor" href="#_6、显示联系人" aria-hidden="true">#</a> 6、显示联系人</h2><p>功能描述：显示通讯录中已有的联系人信息</p><p>显示联系人实现步骤：</p><ul><li>封装显示联系人函数</li><li>测试显示联系人功能</li></ul><h3 id="_6-1-封装显示联系人函数" tabindex="-1"><a class="header-anchor" href="#_6-1-封装显示联系人函数" aria-hidden="true">#</a> 6.1 封装显示联系人函数</h3><p>思路：判断如果当前通讯录中没有人员，就提示记录为空，人数大于0，显示通讯录中信息</p><p>显示联系人代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//2、显示所有联系人信息
void showPerson(Addressbooks * abs)
{
	if (abs-&gt;m_Size == 0)
	{
		cout &lt;&lt; &quot;当前记录为空&quot; &lt;&lt; endl;
	}
	else
	{
		for (int i = 0; i &lt; abs-&gt;m_Size; i++)
		{
			cout &lt;&lt; &quot;姓名：&quot; &lt;&lt; abs-&gt;personArray[i].m_Name &lt;&lt; &quot;\\t&quot;;
			cout &lt;&lt; &quot;性别：&quot; &lt;&lt; (abs-&gt;personArray[i].m_Sex == 1 ? &quot;男&quot; : &quot;女&quot;) &lt;&lt; &quot;\\t&quot;;
			cout &lt;&lt; &quot;年龄：&quot; &lt;&lt; abs-&gt;personArray[i].m_Age &lt;&lt; &quot;\\t&quot;;
			cout &lt;&lt; &quot;电话：&quot; &lt;&lt; abs-&gt;personArray[i].m_Phone &lt;&lt; &quot;\\t&quot;;
			cout &lt;&lt; &quot;住址：&quot; &lt;&lt; abs-&gt;personArray[i].m_Addr &lt;&lt; endl;
		}
	}
	
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-测试显示联系人功能" tabindex="-1"><a class="header-anchor" href="#_6-2-测试显示联系人功能" aria-hidden="true">#</a> 6.2 测试显示联系人功能</h3><p>在switch case语句中，case 2 里添加</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>case 2:  //显示联系人
	showPerson(&amp;abs);
	break;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544166401582.png" alt="1544166401582" tabindex="0" loading="lazy"><figcaption>1544166401582</figcaption></figure><h2 id="_7、删除联系人" tabindex="-1"><a class="header-anchor" href="#_7、删除联系人" aria-hidden="true">#</a> 7、删除联系人</h2><p>功能描述：按照姓名进行删除指定联系人</p><p>删除联系人实现步骤：</p><ul><li>封装检测联系人是否存在</li><li>封装删除联系人函数</li><li>测试删除联系人功能</li></ul><h3 id="_7-1-封装检测联系人是否存在" tabindex="-1"><a class="header-anchor" href="#_7-1-封装检测联系人是否存在" aria-hidden="true">#</a> 7.1 封装检测联系人是否存在</h3><p>设计思路：</p><p>删除联系人前，我们需要先判断用户输入的联系人是否存在，如果存在删除，不存在提示用户没有要删除的联系人</p><p>因此我们可以把检测联系人是否存在封装成一个函数中，如果存在，返回联系人在通讯录中的位置，不存在返回-1</p><p>检测联系人是否存在代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//判断是否存在查询的人员，存在返回在数组中索引位置，不存在返回-1
int isExist(Addressbooks * abs, string name)
{
	for (int i = 0; i &lt; abs-&gt;m_Size; i++)
	{
		if (abs-&gt;personArray[i].m_Name == name)
		{
			return i;
		}
	}
	return -1;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-封装删除联系人函数" tabindex="-1"><a class="header-anchor" href="#_7-2-封装删除联系人函数" aria-hidden="true">#</a> 7.2 封装删除联系人函数</h3><p>根据用户输入的联系人判断该通讯录中是否有此人</p><p>查找到进行删除，并提示删除成功</p><p>查不到提示查无此人。</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//3、删除指定联系人信息
void deletePerson(Addressbooks * abs)
{
	cout &lt;&lt; &quot;请输入您要删除的联系人&quot; &lt;&lt; endl;
	string name;
	cin &gt;&gt; name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		for (int i = ret; i &lt; abs-&gt;m_Size; i++)
		{
			abs-&gt;personArray[i] = abs-&gt;personArray[i + 1];
		}
         abs-&gt;m_Size--;
		cout &lt;&lt; &quot;删除成功&quot; &lt;&lt; endl;
	}
	else
	{
		cout &lt;&lt; &quot;查无此人&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-测试删除联系人功能" tabindex="-1"><a class="header-anchor" href="#_7-3-测试删除联系人功能" aria-hidden="true">#</a> 7.3 测试删除联系人功能</h3><p>在switch case 语句中，case3里添加：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>case 3:  //删除联系人
	deletePerson(&amp;abs);
	break;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><p>存在情况：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544167951559.png" alt="1544167951559" tabindex="0" loading="lazy"><figcaption>1544167951559</figcaption></figure><p>不存在情况：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544168010831.png" alt="1544168010831" tabindex="0" loading="lazy"><figcaption>1544168010831</figcaption></figure><h2 id="_8、查找联系人" tabindex="-1"><a class="header-anchor" href="#_8、查找联系人" aria-hidden="true">#</a> 8、查找联系人</h2><p>功能描述：按照姓名查看指定联系人信息</p><p>查找联系人实现步骤</p><ul><li>封装查找联系人函数</li><li>测试查找指定联系人</li></ul><h3 id="_8-1-封装查找联系人函数" tabindex="-1"><a class="header-anchor" href="#_8-1-封装查找联系人函数" aria-hidden="true">#</a> 8.1 封装查找联系人函数</h3><p>实现思路：判断用户指定的联系人是否存在，如果存在显示信息，不存在则提示查无此人。</p><p>查找联系人代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//4、查找指定联系人信息
void findPerson(Addressbooks * abs)
{
	cout &lt;&lt; &quot;请输入您要查找的联系人&quot; &lt;&lt; endl;
	string name;
	cin &gt;&gt; name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		cout &lt;&lt; &quot;姓名：&quot; &lt;&lt; abs-&gt;personArray[ret].m_Name &lt;&lt; &quot;\\t&quot;;
		cout &lt;&lt; &quot;性别：&quot; &lt;&lt; abs-&gt;personArray[ret].m_Sex &lt;&lt; &quot;\\t&quot;;
		cout &lt;&lt; &quot;年龄：&quot; &lt;&lt; abs-&gt;personArray[ret].m_Age &lt;&lt; &quot;\\t&quot;;
		cout &lt;&lt; &quot;电话：&quot; &lt;&lt; abs-&gt;personArray[ret].m_Phone &lt;&lt; &quot;\\t&quot;;
		cout &lt;&lt; &quot;住址：&quot; &lt;&lt; abs-&gt;personArray[ret].m_Addr &lt;&lt; endl;
	}
	else
	{
		cout &lt;&lt; &quot;查无此人&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-测试查找指定联系人" tabindex="-1"><a class="header-anchor" href="#_8-2-测试查找指定联系人" aria-hidden="true">#</a> 8.2 测试查找指定联系人</h3><p>在switch case 语句中，case4里添加：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>case 4:  //查找联系人
	findPerson(&amp;abs);
	break;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图</p><p>存在情况：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544170057646.png" alt="1544170057646" tabindex="0" loading="lazy"><figcaption>1544170057646</figcaption></figure><p>不存在情况：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544170254021.png" alt="1544170254021" tabindex="0" loading="lazy"><figcaption>1544170254021</figcaption></figure><h2 id="_9、修改联系人" tabindex="-1"><a class="header-anchor" href="#_9、修改联系人" aria-hidden="true">#</a> 9、修改联系人</h2><p>功能描述：按照姓名重新修改指定联系人</p><p>修改联系人实现步骤</p><ul><li>封装修改联系人函数</li><li>测试修改联系人功能</li></ul><h3 id="_9-1-封装修改联系人函数" tabindex="-1"><a class="header-anchor" href="#_9-1-封装修改联系人函数" aria-hidden="true">#</a> 9.1 封装修改联系人函数</h3><p>实现思路：查找用户输入的联系人，如果查找成功进行修改操作，查找失败提示查无此人</p><p>修改联系人代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//5、修改指定联系人信息
void modifyPerson(Addressbooks * abs)
{
	cout &lt;&lt; &quot;请输入您要修改的联系人&quot; &lt;&lt; endl;
	string name;
	cin &gt;&gt; name;

	int ret = isExist(abs, name);
	if (ret != -1)
	{
		//姓名
		string name;
		cout &lt;&lt; &quot;请输入姓名：&quot; &lt;&lt; endl;
		cin &gt;&gt; name;
		abs-&gt;personArray[ret].m_Name = name;

		cout &lt;&lt; &quot;请输入性别：&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;1 -- 男&quot; &lt;&lt; endl;
		cout &lt;&lt; &quot;2 -- 女&quot; &lt;&lt; endl;

		//性别
		int sex = 0;
		while (true)
		{
			cin &gt;&gt; sex;
			if (sex == 1 || sex == 2)
			{
				abs-&gt;personArray[ret].m_Sex = sex;
				break;
			}
			cout &lt;&lt; &quot;输入有误，请重新输入&quot;;
		}

		//年龄
		cout &lt;&lt; &quot;请输入年龄：&quot; &lt;&lt; endl;
		int age = 0;
		cin &gt;&gt; age;
		abs-&gt;personArray[ret].m_Age = age;

		//联系电话
		cout &lt;&lt; &quot;请输入联系电话：&quot; &lt;&lt; endl;
		string phone = &quot;&quot;;
		cin &gt;&gt; phone;
		abs-&gt;personArray[ret].m_Phone = phone;

		//家庭住址
		cout &lt;&lt; &quot;请输入家庭住址：&quot; &lt;&lt; endl;
		string address;
		cin &gt;&gt; address;
		abs-&gt;personArray[ret].m_Addr = address;

		cout &lt;&lt; &quot;修改成功&quot; &lt;&lt; endl;
	}
	else
	{
		cout &lt;&lt; &quot;查无此人&quot; &lt;&lt; endl;
	}

	system(&quot;pause&quot;);
	system(&quot;cls&quot;);

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-测试修改联系人功能" tabindex="-1"><a class="header-anchor" href="#_9-2-测试修改联系人功能" aria-hidden="true">#</a> 9.2 测试修改联系人功能</h3><p>在switch case 语句中，case 5里添加：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>case 5:  //修改联系人
	modifyPerson(&amp;abs);
	break;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><p>查不到指定联系人情况：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544172265676.png" alt="1544172265676" tabindex="0" loading="lazy"><figcaption>1544172265676</figcaption></figure><p>查找到联系人，并修改成功：</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544172164141.png" alt="1544172164141" tabindex="0" loading="lazy"><figcaption>1544172164141</figcaption></figure><p>再次查看通讯录，确认修改完毕</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544172228627.png" alt="1544172228627" tabindex="0" loading="lazy"><figcaption>1544172228627</figcaption></figure><h2 id="_10、清空联系人" tabindex="-1"><a class="header-anchor" href="#_10、清空联系人" aria-hidden="true">#</a> 10、清空联系人</h2><p>功能描述：清空通讯录中所有信息</p><p>清空联系人实现步骤</p><ul><li>封装清空联系人函数</li><li>测试清空联系人</li></ul><h3 id="_10-1-封装清空联系人函数" tabindex="-1"><a class="header-anchor" href="#_10-1-封装清空联系人函数" aria-hidden="true">#</a> 10.1 封装清空联系人函数</h3><p>实现思路： 将通讯录所有联系人信息清除掉，只要将通讯录记录的联系人数量置为0，做逻辑清空即可。</p><p>清空联系人代码：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>//6、清空所有联系人
void cleanPerson(Addressbooks * abs)
{
	abs-&gt;m_Size = 0;
	cout &lt;&lt; &quot;通讯录已清空&quot; &lt;&lt; endl;
	system(&quot;pause&quot;);
	system(&quot;cls&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-2-测试清空联系人" tabindex="-1"><a class="header-anchor" href="#_10-2-测试清空联系人" aria-hidden="true">#</a> 10.2 测试清空联系人</h3><p>在switch case 语句中，case 6 里添加：</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>case 6:  //清空联系人
	cleanPerson(&amp;abs);
	break;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果如图：</p><p>清空通讯录</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544172909693.png" alt="1544172909693" tabindex="0" loading="lazy"><figcaption>1544172909693</figcaption></figure><p>再次查看信息，显示记录为空</p><figure><img src="https://gitlab.com/apzs/apzs/-/raw/master/cpp/image/1544172943653.png" alt="1544172943653" tabindex="0" loading="lazy"><figcaption>1544172943653</figcaption></figure><p><strong>至此，通讯录管理系统完成！</strong></p>`,149),a=[s];function d(r,u){return e(),n("div",null,a)}const m=i(l,[["render",d],["__file","2.通讯录管理系统.html.vue"]]);export{m as default};
