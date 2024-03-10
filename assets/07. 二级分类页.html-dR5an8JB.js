const n=JSON.parse(`{"key":"v-35fa59d5","path":"/front-project/%E5%B0%8F%E5%85%94%E9%B2%9CPC%20(Vue3_Pinia_js)/07.%20%E4%BA%8C%E7%BA%A7%E5%88%86%E7%B1%BB%E9%A1%B5.html","title":"7. 二级分类页","lang":"zh-CN","frontmatter":{"title":"7. 二级分类页","icon":"gears","order":7,"category":["前端"],"tag":["vue3","前端项目"],"description":"整体业务认识和路由配置 1. 准备组件模版 &lt;script setup&gt; &lt;/script&gt; &lt;template&gt; &lt;div class=\\"container \\"&gt; &lt;!-- 面包屑 --&gt; &lt;div class=\\"bread-container\\"&gt; &lt;el-breadcrumb separator=\\"&gt;\\"&gt; &lt;el-breadcrumb-item :to=\\"{ path: '/' }\\"&gt;首页&lt;/el-breadcrumb-item&gt; &lt;el-breadcrumb-item :to=\\"{ path: '/' }\\"&gt;居家 &lt;/el-breadcrumb-item&gt; &lt;el-breadcrumb-item&gt;居家生活用品&lt;/el-breadcrumb-item&gt; &lt;/el-breadcrumb&gt; &lt;/div&gt; &lt;div class=\\"sub-container\\"&gt; &lt;el-tabs&gt; &lt;el-tab-pane label=\\"最新商品\\" name=\\"publishTime\\"&gt;&lt;/el-tab-pane&gt; &lt;el-tab-pane label=\\"最高人气\\" name=\\"orderNum\\"&gt;&lt;/el-tab-pane&gt; &lt;el-tab-pane label=\\"评论最多\\" name=\\"evaluateNum\\"&gt;&lt;/el-tab-pane&gt; &lt;/el-tabs&gt; &lt;div class=\\"body\\"&gt; &lt;!-- 商品列表--&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/template&gt; &lt;style lang=\\"scss\\" scoped&gt; .bread-container { padding: 25px 0; color: #666; } .sub-container { padding: 20px 10px; background-color: #fff; .body { display: flex; flex-wrap: wrap; padding: 0 10px; } .goods-item { display: block; width: 220px; margin-right: 20px; padding: 20px 30px; text-align: center; img { width: 160px; height: 160px; } p { padding-top: 10px; } .name { font-size: 16px; } .desc { color: #999; height: 29px; } .price { color: $priceColor; font-size: 20px; } } .pagination-container { margin-top: 20px; display: flex; justify-content: center; } } &lt;/style&gt;","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/front-project/%E5%B0%8F%E5%85%94%E9%B2%9CPC%20(Vue3_Pinia_js)/07.%20%E4%BA%8C%E7%BA%A7%E5%88%86%E7%B1%BB%E9%A1%B5.html"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:title","content":"7. 二级分类页"}],["meta",{"property":"og:description","content":"整体业务认识和路由配置 1. 准备组件模版 &lt;script setup&gt; &lt;/script&gt; &lt;template&gt; &lt;div class=\\"container \\"&gt; &lt;!-- 面包屑 --&gt; &lt;div class=\\"bread-container\\"&gt; &lt;el-breadcrumb separator=\\"&gt;\\"&gt; &lt;el-breadcrumb-item :to=\\"{ path: '/' }\\"&gt;首页&lt;/el-breadcrumb-item&gt; &lt;el-breadcrumb-item :to=\\"{ path: '/' }\\"&gt;居家 &lt;/el-breadcrumb-item&gt; &lt;el-breadcrumb-item&gt;居家生活用品&lt;/el-breadcrumb-item&gt; &lt;/el-breadcrumb&gt; &lt;/div&gt; &lt;div class=\\"sub-container\\"&gt; &lt;el-tabs&gt; &lt;el-tab-pane label=\\"最新商品\\" name=\\"publishTime\\"&gt;&lt;/el-tab-pane&gt; &lt;el-tab-pane label=\\"最高人气\\" name=\\"orderNum\\"&gt;&lt;/el-tab-pane&gt; &lt;el-tab-pane label=\\"评论最多\\" name=\\"evaluateNum\\"&gt;&lt;/el-tab-pane&gt; &lt;/el-tabs&gt; &lt;div class=\\"body\\"&gt; &lt;!-- 商品列表--&gt; &lt;/div&gt; &lt;/div&gt; &lt;/div&gt; &lt;/template&gt; &lt;style lang=\\"scss\\" scoped&gt; .bread-container { padding: 25px 0; color: #666; } .sub-container { padding: 20px 10px; background-color: #fff; .body { display: flex; flex-wrap: wrap; padding: 0 10px; } .goods-item { display: block; width: 220px; margin-right: 20px; padding: 20px 30px; text-align: center; img { width: 160px; height: 160px; } p { padding-top: 10px; } .name { font-size: 16px; } .desc { color: #999; height: 29px; } .price { color: $priceColor; font-size: 20px; } } .pagination-container { margin-top: 20px; display: flex; justify-content: center; } } &lt;/style&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-10T13:06:08.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:tag","content":"vue3"}],["meta",{"property":"article:tag","content":"前端项目"}],["meta",{"property":"article:modified_time","content":"2024-03-10T13:06:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"7. 二级分类页\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-10T13:06:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"整体业务认识和路由配置","slug":"整体业务认识和路由配置","link":"#整体业务认识和路由配置","children":[{"level":3,"title":"1. 准备组件模版","slug":"_1-准备组件模版","link":"#_1-准备组件模版","children":[]},{"level":3,"title":"2. 配置路由关系","slug":"_2-配置路由关系","link":"#_2-配置路由关系","children":[]},{"level":3,"title":"3. 跳转配置","slug":"_3-跳转配置","link":"#_3-跳转配置","children":[]}]},{"level":2,"title":"面包屑导航实现","slug":"面包屑导航实现","link":"#面包屑导航实现","children":[{"level":3,"title":"1. 准备接口","slug":"_1-准备接口","link":"#_1-准备接口","children":[]},{"level":3,"title":"2. 获取数据渲染模版","slug":"_2-获取数据渲染模版","link":"#_2-获取数据渲染模版","children":[]}]},{"level":2,"title":"分类基础列表实现","slug":"分类基础列表实现","link":"#分类基础列表实现","children":[{"level":3,"title":"1. 准备接口","slug":"_1-准备接口-1","link":"#_1-准备接口-1","children":[]},{"level":3,"title":"2. 获取数据列表","slug":"_2-获取数据列表","link":"#_2-获取数据列表","children":[]}]},{"level":2,"title":"列表筛选实现","slug":"列表筛选实现","link":"#列表筛选实现","children":[]},{"level":2,"title":"无限加载实现","slug":"无限加载实现","link":"#无限加载实现","children":[]}],"git":{"createdTime":1710049926000,"updatedTime":1710075968000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":2}]},"readingTime":{"minutes":2.57,"words":770},"filePathRelative":"front-project/小兔鲜PC (Vue3+Pinia+js)/07. 二级分类页.md","localizedDate":"2024年3月10日","excerpt":"<h2> 整体业务认识和路由配置</h2>\\n<h3> 1. 准备组件模版</h3>\\n<div class=\\"language-vue line-numbers-mode\\" data-ext=\\"vue\\"><pre class=\\"language-vue\\"><code><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>script</span> <span class=\\"token attr-name\\">setup</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token script\\"><span class=\\"token language-javascript\\">\\n\\n\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>script</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>container <span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token comment\\">&lt;!-- 面包屑 --&gt;</span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>bread-container<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-breadcrumb</span> <span class=\\"token attr-name\\">separator</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>&gt;<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-breadcrumb-item</span> <span class=\\"token attr-name\\">:to</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>{ path: '/' }<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>首页<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-breadcrumb-item</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-breadcrumb-item</span> <span class=\\"token attr-name\\">:to</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>{ path: '/' }<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>居家\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-breadcrumb-item</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-breadcrumb-item</span><span class=\\"token punctuation\\">&gt;</span></span>居家生活用品<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-breadcrumb-item</span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-breadcrumb</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>sub-container<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-tabs</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-tab-pane</span> <span class=\\"token attr-name\\">label</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>最新商品<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>publishTime<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-tab-pane</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-tab-pane</span> <span class=\\"token attr-name\\">label</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>最高人气<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>orderNum<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-tab-pane</span><span class=\\"token punctuation\\">&gt;</span></span>\\n        <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>el-tab-pane</span> <span class=\\"token attr-name\\">label</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>评论最多<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">name</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>evaluateNum<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-tab-pane</span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>el-tabs</span><span class=\\"token punctuation\\">&gt;</span></span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">class</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>body<span class=\\"token punctuation\\">\\"</span></span><span class=\\"token punctuation\\">&gt;</span></span>\\n         <span class=\\"token comment\\">&lt;!-- 商品列表--&gt;</span>\\n      <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n    <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n  <span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>div</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>template</span><span class=\\"token punctuation\\">&gt;</span></span>\\n\\n\\n\\n<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>style</span> <span class=\\"token attr-name\\">lang</span><span class=\\"token attr-value\\"><span class=\\"token punctuation attr-equals\\">=</span><span class=\\"token punctuation\\">\\"</span>scss<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token attr-name\\">scoped</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token style\\"><span class=\\"token language-css\\">\\n<span class=\\"token selector\\">.bread-container</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token property\\">padding</span><span class=\\"token punctuation\\">:</span> 25px 0<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token property\\">color</span><span class=\\"token punctuation\\">:</span> #666<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token selector\\">.sub-container</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token property\\">padding</span><span class=\\"token punctuation\\">:</span> 20px 10px<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token property\\">background-color</span><span class=\\"token punctuation\\">:</span> #fff<span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token selector\\">.body</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">flex-wrap</span><span class=\\"token punctuation\\">:</span> wrap<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">padding</span><span class=\\"token punctuation\\">:</span> 0 10px<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token selector\\">.goods-item</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> block<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">width</span><span class=\\"token punctuation\\">:</span> 220px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">margin-right</span><span class=\\"token punctuation\\">:</span> 20px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">padding</span><span class=\\"token punctuation\\">:</span> 20px 30px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">text-align</span><span class=\\"token punctuation\\">:</span> center<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token selector\\">img</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token property\\">width</span><span class=\\"token punctuation\\">:</span> 160px<span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token property\\">height</span><span class=\\"token punctuation\\">:</span> 160px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token selector\\">p</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token property\\">padding-top</span><span class=\\"token punctuation\\">:</span> 10px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token selector\\">.name</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token property\\">font-size</span><span class=\\"token punctuation\\">:</span> 16px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token selector\\">.desc</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token property\\">color</span><span class=\\"token punctuation\\">:</span> #999<span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token property\\">height</span><span class=\\"token punctuation\\">:</span> 29px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token selector\\">.price</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token property\\">color</span><span class=\\"token punctuation\\">:</span> $priceColor<span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token property\\">font-size</span><span class=\\"token punctuation\\">:</span> 20px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token selector\\">.pagination-container</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token property\\">margin-top</span><span class=\\"token punctuation\\">:</span> 20px<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">display</span><span class=\\"token punctuation\\">:</span> flex<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token property\\">justify-content</span><span class=\\"token punctuation\\">:</span> center<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n\\n<span class=\\"token punctuation\\">}</span>\\n</span></span><span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>style</span><span class=\\"token punctuation\\">&gt;</span></span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{n as data};
