import{a as d,b as k}from"./chunk-7IYWN3B2.js";import{a as v}from"./chunk-W7QLE4EB.js";import{a}from"./chunk-QHXDM6TZ.js";import{Ua as u,Xa as f,g as c,l,lb as m,p as h,v as p,y as i}from"./chunk-EFRF7YAV.js";var T=(()=>{class o{constructor(e,r,t,s,n){this.http=e,this.cookieService=r,this.userService=t,this.router=s,this.loaderService=n,this.apiUrl=a.MasterApi+"/auth"}loginUser(e,r){return this.http.post(`${this.apiUrl}/login`,{username:e,password:r})}setToken(e){this.cookieService.set("token",e,{path:"/",secure:!1})}getToken(){return this.cookieService.get("token")}isAuthenticated(){return!!this.getToken()}hasRole(e){let r=this.cookieService.get("user");if(!r)return console.warn("User cookie is missing or empty"),!1;let t=null;try{t=JSON.parse(r)}catch(s){return console.error("Error parsing user JSON:",s),!1}if(t&&t.roles){let s=t.roles;return e.some(n=>s.split(",").map(g=>g.trim()).includes(n))}return!1}resendVerificationEmail(e){let r={email:e};return this.http.post(`${this.apiUrl}/resend-verification`,r).pipe(h(this.handleError))}handleError(e){let r="An unknown error occurred";return e.error instanceof ErrorEvent?r=`Error: ${e.error.message}`:e.status===404?r="User not found":e.status===400?r="Email is already verified":r=`Server error: ${e.message}`,l(r)}validateToken(){let e=this.cookieService.get("token");if(!e)return new c(t=>{t.error({message:"No token provided"})});let r=new u({Authorization:`Bearer ${e}`});return this.http.post(`${a.MasterApi}/validate-token`,{},{headers:r})}logout(){this.cookieService.delete("token","/"),this.cookieService.delete("user","/"),this.router.navigate(["/login"])}static{this.\u0275fac=function(r){return new(r||o)(i(f),i(d),i(k),i(m),i(v))}}static{this.\u0275prov=p({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{T as a};
