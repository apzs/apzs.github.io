const e=JSON.parse('{"key":"v-1bdc9f02","path":"/front-project/%E5%B0%8F%E5%85%94%E9%B2%9CPC%20(Vue3_Pinia_js)/12.%20%E6%94%AF%E4%BB%98%E9%A1%B5.html","title":"12. 支付页","lang":"zh-CN","frontmatter":{"title":"12. 支付页","icon":"gears","order":12,"category":["前端"],"tag":["vue3","前端项目"],"description":"基础数据渲染 1. 准备接口 import request from \'@/utils/http\' export const getOrderAPI = (id) =&gt; { return request({ url: `/member/order/${id}` }) }","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/front-project/%E5%B0%8F%E5%85%94%E9%B2%9CPC%20(Vue3_Pinia_js)/12.%20%E6%94%AF%E4%BB%98%E9%A1%B5.html"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:title","content":"12. 支付页"}],["meta",{"property":"og:description","content":"基础数据渲染 1. 准备接口 import request from \'@/utils/http\' export const getOrderAPI = (id) =&gt; { return request({ url: `/member/order/${id}` }) }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-10T13:06:08.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:tag","content":"vue3"}],["meta",{"property":"article:tag","content":"前端项目"}],["meta",{"property":"article:modified_time","content":"2024-03-10T13:06:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12. 支付页\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-10T13:06:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"","slug":"","link":"#","children":[]},{"level":2,"title":"基础数据渲染","slug":"基础数据渲染","link":"#基础数据渲染","children":[{"level":3,"title":"1. 准备接口","slug":"_1-准备接口","link":"#_1-准备接口","children":[]},{"level":3,"title":"2. 获取数据渲染内容","slug":"_2-获取数据渲染内容","link":"#_2-获取数据渲染内容","children":[]}]},{"level":2,"title":"支付功能实现","slug":"支付功能实现","link":"#支付功能实现","children":[{"level":3,"title":"1. 支付携带参数","slug":"_1-支付携带参数","link":"#_1-支付携带参数","children":[]},{"level":3,"title":"2. 支付宝沙箱账号信息","slug":"_2-支付宝沙箱账号信息","link":"#_2-支付宝沙箱账号信息","children":[]}]},{"level":2,"title":"支付结果页展示","slug":"支付结果页展示","link":"#支付结果页展示","children":[{"level":3,"title":"1. 准备模版","slug":"_1-准备模版","link":"#_1-准备模版","children":[]},{"level":3,"title":"2. 绑定路由","slug":"_2-绑定路由","link":"#_2-绑定路由","children":[]},{"level":3,"title":"3. 渲染数据","slug":"_3-渲染数据","link":"#_3-渲染数据","children":[]}]},{"level":2,"title":"倒计时逻辑函数封装","slug":"倒计时逻辑函数封装","link":"#倒计时逻辑函数封装","children":[]}],"git":{"createdTime":1709618715000,"updatedTime":1710075968000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":3}]},"readingTime":{"minutes":3.29,"words":986},"filePathRelative":"front-project/小兔鲜PC (Vue3+Pinia+js)/12. 支付页.md","localizedDate":"2024年3月5日","excerpt":"<h2> <img src=\\"https://gitlab.com/apzs/image/-/raw/master/image/1677761581263-68132341-71bc-44ad-87f1-a6f312237313.png\\" alt=\\"image.png\\" loading=\\"lazy\\"></h2>\\n<h2> 基础数据渲染</h2>\\n<h3> 1. 准备接口</h3>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">import</span> request <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'@/utils/http\'</span>\\n\\n<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">getOrderAPI</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">id</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token function\\">request</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token literal-property property\\">url</span><span class=\\"token operator\\">:</span> <span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">`</span><span class=\\"token string\\">/member/order/</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">${</span>id<span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token template-punctuation string\\">`</span></span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
