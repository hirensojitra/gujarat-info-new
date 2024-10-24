import './polyfills.server.mjs';
import{a as b}from"./chunk-BHXUZULZ.mjs";import{Q as h,Ub as k,V as u,g as d,lc as I,qc as m,ra as g,rc as U,tc as x}from"./chunk-WB2NDY7X.mjs";var S=(()=>{class r{constructor(e,t){this.document=e,this.platformId=t,this.documentIsAccessible=I(this.platformId)}static getCookieRegExp(e){let t=e.replace(/([\[\]{}()|=;+?,.*^$])/gi,"\\$1");return new RegExp("(?:^"+t+"|;\\s*"+t+")=(.*?)(?:;|$)","g")}static safeDecodeURIComponent(e){try{return decodeURIComponent(e)}catch{return e}}check(e){return this.documentIsAccessible?(e=encodeURIComponent(e),r.getCookieRegExp(e).test(this.document.cookie)):!1}get(e){if(this.documentIsAccessible&&this.check(e)){e=encodeURIComponent(e);let s=r.getCookieRegExp(e).exec(this.document.cookie);return s[1]?r.safeDecodeURIComponent(s[1]):""}else return""}getAll(){if(!this.documentIsAccessible)return{};let e={},t=this.document;return t.cookie&&t.cookie!==""&&t.cookie.split(";").forEach(s=>{let[o,n]=s.split("=");e[r.safeDecodeURIComponent(o.replace(/^ /,""))]=r.safeDecodeURIComponent(n)}),e}set(e,t,s,o,n,a,p,l){if(!this.documentIsAccessible)return;if(typeof s=="number"||s instanceof Date||o||n||a||p){let f={expires:s,path:o,domain:n,secure:a,sameSite:p||"Lax",partitioned:l};this.set(e,t,f);return}let c=encodeURIComponent(e)+"="+encodeURIComponent(t)+";",i=s||{};if(i.expires)if(typeof i.expires=="number"){let f=new Date(new Date().getTime()+i.expires*1e3*60*60*24);c+="expires="+f.toUTCString()+";"}else c+="expires="+i.expires.toUTCString()+";";i.path&&(c+="path="+i.path+";"),i.domain&&(c+="domain="+i.domain+";"),i.secure===!1&&i.sameSite==="None"&&(i.secure=!0,console.warn(`[ngx-cookie-service] Cookie ${e} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`)),i.secure&&(c+="secure;"),i.sameSite||(i.sameSite="Lax"),c+="sameSite="+i.sameSite+";",i.partitioned&&(c+="Partitioned;"),this.document.cookie=c}delete(e,t,s,o,n="Lax"){if(!this.documentIsAccessible)return;let a=new Date("Thu, 01 Jan 1970 00:00:01 GMT");this.set(e,"",{expires:a,path:t,domain:s,secure:o,sameSite:n})}deleteAll(e,t,s,o="Lax"){if(!this.documentIsAccessible)return;let n=this.getAll();for(let a in n)n.hasOwnProperty(a)&&this.delete(a,e,t,s,o)}static{this.\u0275fac=function(t){return new(t||r)(u(k),u(g))}}static{this.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var N=(()=>{class r{constructor(e,t){this.http=e,this.cookieService=t,this.userSubject=new d(null),this.apiUrl=b.MasterApi+"/auth";let s=this.cookieService.get("user");if(s)try{let o=JSON.parse(s);this.userSubject.next(o)}catch(o){console.error("Error parsing stored user:",o),this.cookieService.delete("user")}}getUser(){return this.userSubject.asObservable()}getFullName(){let e=this.userSubject.value;if(e){let t=e.firstname||"",s=e.lastname||"";return`${t} ${s}`.trim()}return""}setUser(e){this.cookieService.set("user",JSON.stringify(e),{path:"/",secure:!1}),this.userSubject.next(e)}getAllUsers(e={}){let{page:t=1,limit:s=10,search:o="",sortBy:n="created_at",order:a="asc"}=e,p=new U().set("page",t.toString()).set("limit",s.toString()).set("search",o).set("sortBy",n).set("order",a),l=this.cookieService.get("token"),c=new m({Authorization:`Bearer ${l}`});return this.http.get(`${this.apiUrl}/users`,{headers:c,params:p})}updateUserData(e,t){let s=this.cookieService.get("token"),o=new m({Authorization:`Bearer ${s}`}),n=`${this.apiUrl}/updateUser/${e}`;return this.http.put(n,t,{headers:o})}verifyEmail(e,t){let s=new m({Authorization:`Bearer ${this.cookieService.get("token")}`});return this.http.get(`${this.apiUrl}/verify-email?token=${encodeURIComponent(e)}&email=${encodeURIComponent(t)}`,{headers:s})}registerUser(e,t,s,o,n){return this.http.post(`${this.apiUrl}/register`,{username:e,password:t,email:s,roles:o,emailVerified:n})}static{this.\u0275fac=function(t){return new(t||r)(u(x),u(S))}}static{this.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{S as a,N as b};
