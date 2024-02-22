import{a9 as t}from"./app-UkKvjHmR.js";var a={provider:"Waline",dark:'html[data-theme="dark"]',serverURL:"https://comment-rose-alpha.vercel.app"};const n=async()=>{try{const{pageviewCount:e}=await t(()=>import("./app-UkKvjHmR.js").then(r=>r.ah),__vite__mapDeps([]));return e({serverURL:a.serverURL})}catch{console.error("@waline/client is not installed!");return}};export{n as updatePageview};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}