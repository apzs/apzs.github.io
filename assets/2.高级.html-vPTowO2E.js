const e=JSON.parse('{"key":"v-4c074e4c","path":"/front-advance/webpack/2.%E9%AB%98%E7%BA%A7.html","title":"介绍","lang":"zh-CN","frontmatter":{"description":"介绍 本章节主要介绍 Webpack 高级配置。 所谓高级配置其实就是进行 Webpack 优化，让我们代码在编译/运行时性能更好~ 我们会从以下角度来进行优化： 提升开发体验 提升打包构建速度 减少代码体积 优化代码运行性能 提升开发体验 SourceMap 为什么 开发时我们运行的代码是经过 webpack 编译后的，例如下面这个样子： /* * ATTENTION: The \\"eval\\" devtool has been used (maybe by default in mode: \\"development\\"). * This devtool is neither made for production nor for readable output files. * It uses \\"eval()\\" calls to create a separate source file in the browser devtools. * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/) * or disable the default devtool with \\"devtool: false\\". * If you are looking for production-ready output files, see mode: \\"production\\" (https://webpack.js.org/configuration/mode/). */ /******/ (() =&gt; { // webpackBootstrap /******/ \\"use strict\\"; /******/ var __webpack_modules__ = ({ /***/ \\"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less\\": /*!**********************************************************************************************************!*\\\\ !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less ***! \\\\**********************************************************************************************************/ /***/ ((module, __webpack_exports__, __webpack_require__) =&gt; { eval(\\"__webpack_require__.r(__webpack_exports__);\\\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\\\n/* harmony export */ \\\\\\"default\\\\\\": () =&gt; (__WEBPACK_DEFAULT_EXPORT__)\\\\n/* harmony export */ });\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \\\\\\"./node_modules/css-loader/dist/runtime/noSourceMaps.js\\\\\\");\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \\\\\\"./node_modules/css-loader/dist/runtime/api.js\\\\\\");\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\\\\n// Imports\\\\n\\\\n\\\\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\\\\n// Module\\\\n___CSS_LOADER_EXPORT___.push([module.id, \\\\\\".box2 {\\\\\\\\n width: 100px;\\\\\\\\n height: 100px;\\\\\\\\n background-color: deeppink;\\\\\\\\n}\\\\\\\\n\\\\\\", \\\\\\"\\\\\\"]);\\\\n// Exports\\\\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\\\\n\\\\n\\\\n//# sourceURL=webpack://webpack5/./src/less/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js\\"); /***/ }), // 其他省略","head":[["meta",{"property":"og:url","content":"https://apzs.github.io/front-advance/webpack/2.%E9%AB%98%E7%BA%A7.html"}],["meta",{"property":"og:site_name","content":"apzs"}],["meta",{"property":"og:title","content":"介绍"}],["meta",{"property":"og:description","content":"介绍 本章节主要介绍 Webpack 高级配置。 所谓高级配置其实就是进行 Webpack 优化，让我们代码在编译/运行时性能更好~ 我们会从以下角度来进行优化： 提升开发体验 提升打包构建速度 减少代码体积 优化代码运行性能 提升开发体验 SourceMap 为什么 开发时我们运行的代码是经过 webpack 编译后的，例如下面这个样子： /* * ATTENTION: The \\"eval\\" devtool has been used (maybe by default in mode: \\"development\\"). * This devtool is neither made for production nor for readable output files. * It uses \\"eval()\\" calls to create a separate source file in the browser devtools. * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/) * or disable the default devtool with \\"devtool: false\\". * If you are looking for production-ready output files, see mode: \\"production\\" (https://webpack.js.org/configuration/mode/). */ /******/ (() =&gt; { // webpackBootstrap /******/ \\"use strict\\"; /******/ var __webpack_modules__ = ({ /***/ \\"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less\\": /*!**********************************************************************************************************!*\\\\ !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less ***! \\\\**********************************************************************************************************/ /***/ ((module, __webpack_exports__, __webpack_require__) =&gt; { eval(\\"__webpack_require__.r(__webpack_exports__);\\\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\\\n/* harmony export */ \\\\\\"default\\\\\\": () =&gt; (__WEBPACK_DEFAULT_EXPORT__)\\\\n/* harmony export */ });\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \\\\\\"./node_modules/css-loader/dist/runtime/noSourceMaps.js\\\\\\");\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \\\\\\"./node_modules/css-loader/dist/runtime/api.js\\\\\\");\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\\\\n// Imports\\\\n\\\\n\\\\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\\\\n// Module\\\\n___CSS_LOADER_EXPORT___.push([module.id, \\\\\\".box2 {\\\\\\\\n width: 100px;\\\\\\\\n height: 100px;\\\\\\\\n background-color: deeppink;\\\\\\\\n}\\\\\\\\n\\\\\\", \\\\\\"\\\\\\"]);\\\\n// Exports\\\\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\\\\n\\\\n\\\\n//# sourceURL=webpack://webpack5/./src/less/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js\\"); /***/ }), // 其他省略"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-05T06:05:15.000Z"}],["meta",{"property":"article:author","content":"apzs"}],["meta",{"property":"article:modified_time","content":"2024-03-05T06:05:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"介绍\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-05T06:05:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"apzs\\",\\"url\\":\\"https://apzs.eu.org\\"}]}"]]},"headers":[{"level":2,"title":"SourceMap","slug":"sourcemap","link":"#sourcemap","children":[{"level":3,"title":"为什么","slug":"为什么","link":"#为什么","children":[]},{"level":3,"title":"是什么","slug":"是什么","link":"#是什么","children":[]},{"level":3,"title":"怎么用","slug":"怎么用","link":"#怎么用","children":[]}]},{"level":2,"title":"HotModuleReplacement","slug":"hotmodulereplacement","link":"#hotmodulereplacement","children":[{"level":3,"title":"为什么","slug":"为什么-1","link":"#为什么-1","children":[]},{"level":3,"title":"是什么","slug":"是什么-1","link":"#是什么-1","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-1","link":"#怎么用-1","children":[]}]},{"level":2,"title":"OneOf","slug":"oneof","link":"#oneof","children":[{"level":3,"title":"为什么","slug":"为什么-2","link":"#为什么-2","children":[]},{"level":3,"title":"是什么","slug":"是什么-2","link":"#是什么-2","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-2","link":"#怎么用-2","children":[]}]},{"level":2,"title":"Include/Exclude","slug":"include-exclude","link":"#include-exclude","children":[{"level":3,"title":"为什么","slug":"为什么-3","link":"#为什么-3","children":[]},{"level":3,"title":"是什么","slug":"是什么-3","link":"#是什么-3","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-3","link":"#怎么用-3","children":[]}]},{"level":2,"title":"Cache","slug":"cache","link":"#cache","children":[{"level":3,"title":"为什么","slug":"为什么-4","link":"#为什么-4","children":[]},{"level":3,"title":"是什么","slug":"是什么-4","link":"#是什么-4","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-4","link":"#怎么用-4","children":[]}]},{"level":2,"title":"Thead","slug":"thead","link":"#thead","children":[{"level":3,"title":"为什么","slug":"为什么-5","link":"#为什么-5","children":[]},{"level":3,"title":"是什么","slug":"是什么-5","link":"#是什么-5","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-5","link":"#怎么用-5","children":[]}]},{"level":2,"title":"Tree Shaking","slug":"tree-shaking","link":"#tree-shaking","children":[{"level":3,"title":"为什么","slug":"为什么-6","link":"#为什么-6","children":[]},{"level":3,"title":"是什么","slug":"是什么-6","link":"#是什么-6","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-6","link":"#怎么用-6","children":[]}]},{"level":2,"title":"Babel","slug":"babel","link":"#babel","children":[{"level":3,"title":"为什么","slug":"为什么-7","link":"#为什么-7","children":[]},{"level":3,"title":"是什么","slug":"是什么-7","link":"#是什么-7","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-7","link":"#怎么用-7","children":[]}]},{"level":2,"title":"Image Minimizer","slug":"image-minimizer","link":"#image-minimizer","children":[{"level":3,"title":"为什么","slug":"为什么-8","link":"#为什么-8","children":[]},{"level":3,"title":"是什么","slug":"是什么-8","link":"#是什么-8","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-8","link":"#怎么用-8","children":[]}]},{"level":2,"title":"Code Split","slug":"code-split","link":"#code-split","children":[{"level":3,"title":"为什么","slug":"为什么-9","link":"#为什么-9","children":[]},{"level":3,"title":"是什么","slug":"是什么-9","link":"#是什么-9","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-9","link":"#怎么用-9","children":[]}]},{"level":2,"title":"Preload / Prefetch","slug":"preload-prefetch","link":"#preload-prefetch","children":[{"level":3,"title":"为什么","slug":"为什么-10","link":"#为什么-10","children":[]},{"level":3,"title":"是什么","slug":"是什么-10","link":"#是什么-10","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-10","link":"#怎么用-10","children":[]}]},{"level":2,"title":"Network Cache","slug":"network-cache","link":"#network-cache","children":[{"level":3,"title":"为什么","slug":"为什么-11","link":"#为什么-11","children":[]},{"level":3,"title":"是什么","slug":"是什么-11","link":"#是什么-11","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-11","link":"#怎么用-11","children":[]}]},{"level":2,"title":"Core-js","slug":"core-js","link":"#core-js","children":[{"level":3,"title":"为什么","slug":"为什么-12","link":"#为什么-12","children":[]},{"level":3,"title":"是什么","slug":"是什么-12","link":"#是什么-12","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-12","link":"#怎么用-12","children":[]}]},{"level":2,"title":"PWA","slug":"pwa","link":"#pwa","children":[{"level":3,"title":"为什么","slug":"为什么-13","link":"#为什么-13","children":[]},{"level":3,"title":"是什么","slug":"是什么-13","link":"#是什么-13","children":[]},{"level":3,"title":"怎么用","slug":"怎么用-13","link":"#怎么用-13","children":[]}]}],"git":{"createdTime":1708674856000,"updatedTime":1709618715000,"contributors":[{"name":"zhaoshuo","email":"apzs@foxmaill.com","commits":2}]},"readingTime":{"minutes":50.37,"words":15111},"filePathRelative":"front-advance/webpack/2.高级.md","localizedDate":"2024年2月23日","excerpt":"<h1> 介绍</h1>\\n<p>本章节主要介绍 Webpack 高级配置。</p>\\n<p>所谓高级配置其实就是进行 Webpack 优化，让我们代码在编译/运行时性能更好~</p>\\n<p>我们会从以下角度来进行优化：</p>\\n<ol>\\n<li>提升开发体验</li>\\n<li>提升打包构建速度</li>\\n<li>减少代码体积</li>\\n<li>优化代码运行性能</li>\\n</ol>\\n<h1> 提升开发体验</h1>\\n<h2> SourceMap</h2>\\n<h3> 为什么</h3>\\n<p>开发时我们运行的代码是经过 webpack 编译后的，例如下面这个样子：</p>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token comment\\">/*\\n * ATTENTION: The \\"eval\\" devtool has been used (maybe by default in mode: \\"development\\").\\n * This devtool is neither made for production nor for readable output files.\\n * It uses \\"eval()\\" calls to create a separate source file in the browser devtools.\\n * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)\\n * or disable the default devtool with \\"devtool: false\\".\\n * If you are looking for production-ready output files, see mode: \\"production\\" (https://webpack.js.org/configuration/mode/).\\n */</span>\\n<span class=\\"token doc-comment comment\\">/******/</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=&gt;</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token comment\\">// webpackBootstrap</span>\\n<span class=\\"token doc-comment comment\\">/******/</span>  <span class=\\"token string\\">\\"use strict\\"</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token doc-comment comment\\">/******/</span>  <span class=\\"token keyword\\">var</span> __webpack_modules__ <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span>\\n\\n<span class=\\"token doc-comment comment\\">/***/ \\"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less\\":\\n/*!**********************************************************************************************************!*\\\\\\n  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less ***!\\n  \\\\**********************************************************************************************************/</span>\\n<span class=\\"token doc-comment comment\\">/***/ ((module, __webpack_exports__, __webpack_require__) =&gt; <span class=\\"token punctuation\\">{</span>\\n\\neval(\\"__webpack_require__.r(__webpack_exports__);\\\\n/* harmony export */</span> __webpack_require__<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">d</span><span class=\\"token punctuation\\">(</span>__webpack_exports__<span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">{</span>\\\\n<span class=\\"token comment\\">/* harmony export */</span>   \\\\<span class=\\"token string\\">\\"default\\\\\\": () =&gt; (__WEBPACK_DEFAULT_EXPORT__)\\\\n/* harmony export */ });\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \\\\\\"./node_modules/css-loader/dist/runtime/noSourceMaps.js\\\\\\");\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \\\\\\"./node_modules/css-loader/dist/runtime/api.js\\\\\\");\\\\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\\\\n// Imports\\\\n\\\\n\\\\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\\\\n// Module\\\\n___CSS_LOADER_EXPORT___.push([module.id, \\\\\\".box2 {\\\\\\\\n  width: 100px;\\\\\\\\n  height: 100px;\\\\\\\\n  background-color: deeppink;\\\\\\\\n}\\\\\\\\n\\\\\\", \\\\\\"\\\\\\"]);\\\\n// Exports\\\\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\\\\n\\\\n\\\\n//# sourceURL=webpack://webpack5/./src/less/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token doc-comment comment\\">/***/ <span class=\\"token punctuation\\">}</span>),\\n// 其他省略\\n</span></code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
