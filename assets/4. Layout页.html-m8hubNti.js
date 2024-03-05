const n=JSON.parse('{"key":"v-e884bcd2","path":"/front-project/%E5%B0%8F%E5%85%94%E9%B2%9CPC%20(Vue3_Pinia_js)/4.%20Layout%E9%A1%B5.html","title":"组件结构快速搭建","lang":"zh-CN","frontmatter":{"description":"组件结构快速搭建 &lt;script setup&gt; &lt;/script&gt; &lt;template&gt; &lt;nav class=\\"app-topnav\\"&gt; &lt;div class=\\"container\\"&gt; &lt;ul&gt; &lt;template v-if=\\"true\\"&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"\\"&gt;&lt;i class=\\"iconfont icon-user\\"&gt;&lt;/i&gt;周杰伦&lt;/a&gt;&lt;/li&gt; &lt;li&gt; &lt;el-popconfirm title=\\"确认退出吗?\\" confirm-button-text=\\"确认\\" cancel-button-text=\\"取消\\"&gt; &lt;template #reference&gt; &lt;a href=\\"javascript:;\\"&gt;退出登录&lt;/a&gt; &lt;/template&gt; &lt;/el-popconfirm&gt; &lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;我的订单&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;会员中心&lt;/a&gt;&lt;/li&gt; &lt;/template&gt; &lt;template v-else&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;请先登录&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;帮助中心&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;关于我们&lt;/a&gt;&lt;/li&gt; &lt;/template&gt; &lt;/ul&gt; &lt;/div&gt; &lt;/nav&gt; &lt;/template&gt; &lt;style scoped lang=\\"scss\\"&gt; .app-topnav { background: #333; ul { display: flex; height: 53px; justify-content: flex-end; align-items: center; li { a { padding: 0 15px; color: #cdcdcd; line-height: 1; display: inline-block; i { font-size: 14px; margin-right: 2px; } &amp;:hover { color: $xtxColor; } } ~li { a { border-left: 2px solid #666; } } } } } &lt;/style&gt;","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/front-project/%E5%B0%8F%E5%85%94%E9%B2%9CPC%20(Vue3_Pinia_js)/4.%20Layout%E9%A1%B5.html"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:title","content":"组件结构快速搭建"}],["meta",{"property":"og:description","content":"组件结构快速搭建 &lt;script setup&gt; &lt;/script&gt; &lt;template&gt; &lt;nav class=\\"app-topnav\\"&gt; &lt;div class=\\"container\\"&gt; &lt;ul&gt; &lt;template v-if=\\"true\\"&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"\\"&gt;&lt;i class=\\"iconfont icon-user\\"&gt;&lt;/i&gt;周杰伦&lt;/a&gt;&lt;/li&gt; &lt;li&gt; &lt;el-popconfirm title=\\"确认退出吗?\\" confirm-button-text=\\"确认\\" cancel-button-text=\\"取消\\"&gt; &lt;template #reference&gt; &lt;a href=\\"javascript:;\\"&gt;退出登录&lt;/a&gt; &lt;/template&gt; &lt;/el-popconfirm&gt; &lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;我的订单&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;会员中心&lt;/a&gt;&lt;/li&gt; &lt;/template&gt; &lt;template v-else&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;请先登录&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;帮助中心&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href=\\"javascript:;\\"&gt;关于我们&lt;/a&gt;&lt;/li&gt; &lt;/template&gt; &lt;/ul&gt; &lt;/div&gt; &lt;/nav&gt; &lt;/template&gt; &lt;style scoped lang=\\"scss\\"&gt; .app-topnav { background: #333; ul { display: flex; height: 53px; justify-content: flex-end; align-items: center; li { a { padding: 0 15px; color: #cdcdcd; line-height: 1; display: inline-block; i { font-size: 14px; margin-right: 2px; } &amp;:hover { color: $xtxColor; } } ~li { a { border-left: 2px solid #666; } } } } } &lt;/style&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-05T06:05:15.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:modified_time","content":"2024-03-05T06:05:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"组件结构快速搭建\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-05T06:05:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"1. 准备组件静态结构","slug":"_1-准备组件静态结构","link":"#_1-准备组件静态结构","children":[]},{"level":2,"title":"2. 渲染基础数据","slug":"_2-渲染基础数据","link":"#_2-渲染基础数据","children":[]},{"level":2,"title":"3. 实现吸顶交互","slug":"_3-实现吸顶交互","link":"#_3-实现吸顶交互","children":[]}],"git":{"createdTime":1709618715000,"updatedTime":1709618715000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":1}]},"readingTime":{"minutes":5.64,"words":1693},"filePathRelative":"front-project/小兔鲜PC (Vue3+Pinia+js)/4. Layout页.md","localizedDate":"2024年3月5日","excerpt":"<h1> 组件结构快速搭建</h1>\\n<div class=\\"language-vue line-numbers-mode\\" data-ext=\\"vue\\"><pre class=\\"language-vue\\"><code><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>script</span> <span class=\\"token attr-name\\">setup</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token script\\"><span class=\\"token language-javascript\\">\\n\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>script</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>nav</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>app-topnav<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>container<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>ul</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span> <span class=\\"token attr-name\\">v-if</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>true<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token attr-name\\">\\"</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>i</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>iconfont icon-user<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>i</span><span class=\\"token punctuation\\">&gt;</span></span>周杰伦<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n            <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-popconfirm</span> <span class=\\"token attr-name\\">title</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>确认退出吗?<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">confirm-button-text</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>确认<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">cancel-button-text</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>取消<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n              <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span> <span class=\\"token attr-name\\">#reference</span><span class=\\"token punctuation\\">&gt;</span></span>\\n                <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>退出登录<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span>\\n              <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n            <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-popconfirm</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>我的订单<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>会员中心<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span> <span class=\\"token attr-name\\">v-else</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>请先登录<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>帮助中心<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n          <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>li</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>a</span> <span class=\\"token attr-name\\">href</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>javascript:;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>关于我们<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>a</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>li</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>ul</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>nav</span><span class=\\"token punctuation\\">&gt;</span></span>\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>style</span> <span class=\\"token attr-name\\">scoped</span> <span class=\\"token attr-name\\">lang</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>scss<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token style\\"><span class=\\"token language-css\\">\\n<span class=\\"token selector\\">.app-topnav</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token property\\">background</span><span class=\\"token punctuation\\">:</span> #333<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token selector\\">ul</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">height</span><span class=\\"token punctuation\\">:</span> 53px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">justify-content</span><span class=\\"token punctuation\\">:</span> flex-end<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">align-items</span><span class=\\"token punctuation\\">:</span> center<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token selector\\">li</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token selector\\">a</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token property\\">padding</span><span class=\\"token punctuation\\">:</span> 0 15px<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token property\\">color</span><span class=\\"token punctuation\\">:</span> #cdcdcd<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token property\\">line-height</span><span class=\\"token punctuation\\">:</span> 1<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> inline-block<span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token selector\\">i</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token property\\">font-size</span><span class=\\"token punctuation\\">:</span> 14px<span class=\\"token punctuation\\">;</span>\\n          <span class=\\"token property\\">margin-right</span><span class=\\"token punctuation\\">:</span> 2px<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n\\n        <span class=\\"token selector\\">&amp;:hover</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token property\\">color</span><span class=\\"token punctuation\\">:</span> $xtxColor<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n      <span class=\\"token punctuation\\">}</span>\\n\\n      <span class=\\"token selector\\">~li</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token selector\\">a</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token property\\">border-left</span><span class=\\"token punctuation\\">:</span> 2px solid #666<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>style</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
