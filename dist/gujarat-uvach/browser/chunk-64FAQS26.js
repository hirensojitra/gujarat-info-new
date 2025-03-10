import{D as p,G as f,X as m,db as l,ob as h}from"./chunk-6SCNQMZS.js";var R=(()=>{class i{constructor(e,t){this.document=e,this.platformId=t,this.documentIsAccessible=h(this.platformId)}static getCookieRegExp(e){let t=e.replace(/([\[\]{}()|=;+?,.*^$])/gi,"\\$1");return new RegExp("(?:^"+t+"|;\\s*"+t+")=(.*?)(?:;|$)","g")}static safeDecodeURIComponent(e){try{return decodeURIComponent(e)}catch{return e}}check(e){return this.documentIsAccessible?(e=encodeURIComponent(e),i.getCookieRegExp(e).test(this.document.cookie)):!1}get(e){if(this.documentIsAccessible&&this.check(e)){e=encodeURIComponent(e);let s=i.getCookieRegExp(e).exec(this.document.cookie);return s[1]?i.safeDecodeURIComponent(s[1]):""}else return""}getAll(){if(!this.documentIsAccessible)return{};let e={},t=this.document;return t.cookie&&t.cookie!==""&&t.cookie.split(";").forEach(s=>{let[n,c]=s.split("=");e[i.safeDecodeURIComponent(n.replace(/^ /,""))]=i.safeDecodeURIComponent(c)}),e}set(e,t,s,n,c,a,u,g){if(!this.documentIsAccessible)return;if(typeof s=="number"||s instanceof Date||n||c||a||u){let d={expires:s,path:n,domain:c,secure:a,sameSite:u||"Lax",partitioned:g};this.set(e,t,d);return}let r=encodeURIComponent(e)+"="+encodeURIComponent(t)+";",o=s||{};if(o.expires)if(typeof o.expires=="number"){let d=new Date(new Date().getTime()+o.expires*1e3*60*60*24);r+="expires="+d.toUTCString()+";"}else r+="expires="+o.expires.toUTCString()+";";o.path&&(r+="path="+o.path+";"),o.domain&&(r+="domain="+o.domain+";"),o.secure===!1&&o.sameSite==="None"&&(o.secure=!0,console.warn(`[ngx-cookie-service] Cookie ${e} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`)),o.secure&&(r+="secure;"),o.sameSite||(o.sameSite="Lax"),r+="sameSite="+o.sameSite+";",o.partitioned&&(r+="Partitioned;"),this.document.cookie=r}delete(e,t,s,n,c="Lax"){if(!this.documentIsAccessible)return;let a=new Date("Thu, 01 Jan 1970 00:00:01 GMT");this.set(e,"",{expires:a,path:t,domain:s,secure:n,sameSite:c})}deleteAll(e,t,s,n="Lax"){if(!this.documentIsAccessible)return;let c=this.getAll();for(let a in c)c.hasOwnProperty(a)&&this.delete(a,e,t,s,n)}static{this.\u0275fac=function(t){return new(t||i)(f(l),f(m))}}static{this.\u0275prov=p({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{R as a};
