import './polyfills.server.mjs';
import{a as d}from"./chunk-ZOQGZUTB.mjs";import{D as n,G as h,Ob as o,Pb as l,n as i}from"./chunk-B7ADDBMS.mjs";var f=(()=>{class r{constructor(t){this.http=t,this.baseUrl=d.MasterApi+"/post-detail"}getAllPosts(t){let e=new o().set("page",t.page.toString()).set("limit",(t.limit||12).toString()).set("search",t.search||"").set("sortBy",t.sortBy||"created_at").set("order",t.order||"desc");return t.published!==void 0&&(e=e.set("published",t.published.toString())),t.info_show!==void 0&&(e=e.set("info_show",t.info_show.toString())),this.http.get(this.baseUrl,{params:e})}addPost(t){return this.http.post(`${this.baseUrl}`,t).pipe(i(e=>{let s=e.id;return t.id=s,t}))}getPostById(t){return this.http.get(`${this.baseUrl}/get/${t}`)}updatePost(t){return this.http.put(`${this.baseUrl}/update/`,t)}uploadThumbnail(t,e){return this.http.post(`${this.baseUrl}/${t}/thumbnail`,e)}softDeletePost(t){return this.http.delete(`${this.baseUrl}/soft-delete/${t}`)}recoverPost(t){return this.http.delete(`${this.baseUrl}/recover/${t}`)}hardDeletePost(t){return this.http.delete(`${this.baseUrl}/hard-delete/${t}`)}downloadCounter(t){return this.http.get(`${this.baseUrl}/download-counter/${t}`)}updateDownloadCounter(t){return this.http.get(`${this.baseUrl}/update-download-counter/${t}`)}getAllSoftDeletedPosts(t){let e=new o().set("page",t.page.toString()).set("limit",(t.limit||12).toString()).set("search",t.search||"").set("sortBy",t.sortBy||"created_at").set("order",t.order||"desc"),s=`${this.baseUrl}/soft-deleted?${e.toString()}`;return console.log("Full URL:",s),this.http.get(s)}getTotalPostLength(){return this.http.get(`${this.baseUrl}/post-length`)}getTotalDeletedPostLength(){return this.http.get(`${this.baseUrl}/post-deleted-length`)}static{this.\u0275fac=function(e){return new(e||r)(h(l))}}static{this.\u0275prov=n({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{f as a};
