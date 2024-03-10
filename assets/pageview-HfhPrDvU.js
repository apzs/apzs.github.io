import{a7 as t}from"./app-YilgCgZO.js";var a={provider:"Waline",dark:'html[data-theme="dark"]',serverURL:"https://comment-rose-alpha.vercel.app"};const n=async()=>{try{const{pageviewCount:e}=await t(()=>import("./app-YilgCgZO.js").then(r=>r.af),__vite__mapDeps([]));return e({serverURL:a.serverURL})}catch{console.error("@waline/client is not installed!");return}};export{n as updatePageview};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}