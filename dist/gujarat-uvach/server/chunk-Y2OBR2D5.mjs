import './polyfills.server.mjs';
import{a as u}from"./chunk-662JNBOM.mjs";import{a as m}from"./chunk-BHXUZULZ.mjs";import{nb as o,ob as h,p as d,qb as l,s as c}from"./chunk-GKTD5S5R.mjs";var w=(()=>{class a{constructor(t,e){this.http=t,this.cookieService=e,this.apiUrl=m.MasterApi+"/user-img"}createFolder(t,e){let r=this.cookieService.get("token"),i=new o({Authorization:`Bearer ${r}`}),s={folderName:e,userid:t};return this.http.post(`${this.apiUrl}/folders`,s,{headers:i})}getFolders(t,e=1,r=10,i="",s="created_at",n="asc"){let p=new h().set("userid",t).set("page",e).set("limit",r).set("search",i).set("sortBy",s).set("order",n);return this.http.get(`${this.apiUrl}/folders`,{params:p})}uploadImage(t,e,r,i){let s=new FormData;s.append("image",r),s.append("metadata",JSON.stringify(i)),s.append("userid",t),s.append("folderId",e.toString());let n=this.cookieService.get("token"),p=new o({Authorization:`Bearer ${n}`});return this.http.post(`${this.apiUrl}/folders/${e}/images`,s,{headers:p})}getImagesInFolder(t,e,r=1,i=10,s="",n="asc"){let p=new h().set("userid",t).set("page",r).set("limit",i).set("search",s).set("sort",n);return this.http.get(`${this.apiUrl}/folders/${e}/images`,{params:p})}deleteImage(t,e,r){let i=this.cookieService.get("token"),s=new o({Authorization:`Bearer ${i}`});return this.http.delete(`${this.apiUrl}/folders/${e}/images/${r}`,{headers:s,params:{userid:t}})}getTotalFolderCount(t,e=""){let r=new h().set("userid",t).set("search",e);return this.http.get(`${this.apiUrl}/folders/count`,{params:r})}getTotalImageCount(t,e=""){let r=new h().set("search",e);return this.http.get(`${this.apiUrl}/folders/${t}/images/count`,{params:r})}refreshImage(t,e,r,i){return i.append("userid",t),this.http.post(`${this.apiUrl}/folders/${e}/images/${r}/refresh`,i)}getImage(t,e,r,i){let s={};return e&&(s.quality=e.toString()),r&&(s.format=r),i&&(s.thumb="true"),this.http.get(`${this.apiUrl}/uploads/${t}`,{params:s,responseType:"blob"})}deleteFolder(t){let e=this.cookieService.get("token"),r=new o({Authorization:`Bearer ${e}`});return this.http.delete(`${this.apiUrl}/folders/${t}`,{headers:r})}renameFolder(t,e){let r=this.cookieService.get("token"),i=new o({Authorization:`Bearer ${r}`,"Content-Type":"application/json"}),s={folderName:e};return this.http.put(`${this.apiUrl}/folders/${t}/rename`,s,{headers:i})}static{this.\u0275fac=function(e){return new(e||a)(c(l),c(u))}}static{this.\u0275prov=d({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})();export{w as a};