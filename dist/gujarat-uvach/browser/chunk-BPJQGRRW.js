import{a as g}from"./chunk-S2AHCA5Z.js";import{a as k,b as v}from"./chunk-2L72KUHO.js";import{a as c}from"./chunk-F32RMVOI.js";import{D as d,G as i,Jb as m,b as n,l,n as u,qb as h,tb as f,u as a}from"./chunk-VTNAYE3H.js";var R=(()=>{class o{constructor(e,t,r,s,p){this.http=e,this.cookieService=t,this.userService=r,this.router=s,this.loaderService=p,this.apiUrl=c.MasterApi+"/auth"}loginUser(e,t){return this.http.post(`${this.apiUrl}/login`,{username:e,password:t})}setToken(e){this.cookieService.set("token",e,{path:"/",secure:!1})}getToken(){return this.cookieService.get("token")}isAuthenticated(){let e=this.getToken();if(!e)return new n(r=>{r.next(!1),r.complete()});let t=new h({Authorization:`Bearer ${e}`});return this.http.post(`${c.MasterApi}/validate-token`,{},{headers:t}).pipe(u(()=>!0),a(()=>new n(r=>{r.next(!1),r.complete()})))}hasRole(e){let t=this.cookieService.get("user");if(!t)return console.warn("User cookie is missing or empty"),!1;let r=null;try{r=JSON.parse(t)}catch(s){return console.error("Error parsing user JSON:",s),!1}if(r&&r.roles){let s=r.roles;return e.some(p=>s.split(",").map(S=>S.trim()).includes(p))}return!1}resendVerificationEmail(e){let t={email:e};return this.http.post(`${this.apiUrl}/resend-verification`,t).pipe(a(this.handleError))}handleError(e){let t="An unknown error occurred";return e.error instanceof ErrorEvent?t=`Error: ${e.error.message}`:e.status===404?t="User not found":e.status===400?t="Email is already verified":t=`Server error: ${e.message}`,l(t)}validateToken(){let e=this.cookieService.get("token");if(!e)return new n(r=>{r.error({message:"No token provided"})});let t=new h({Authorization:`Bearer ${e}`});return this.http.post(`${c.MasterApi}/validate-token`,{},{headers:t})}logout(){this.cookieService.delete("token","/"),this.cookieService.delete("user","/"),this.router.navigate(["/login"])}requestPasswordReset(e){return this.http.post(`${this.apiUrl}/forgot-password`,{email:e})}resetPassword(e,t,r){return this.http.post(`${this.apiUrl}/reset-password`,{token:e,email:t,password:r})}validateResetToken(e,t){return alert(`${this.apiUrl}/validate-reset-token `+e+" "+t),this.http.post(`${this.apiUrl}/validate-reset-token`,{token:e,email:t}).pipe(a(r=>l(r.error.message||"Error validating token")))}static{this.\u0275fac=function(t){return new(t||o)(i(f),i(k),i(v),i(m),i(g))}}static{this.\u0275prov=d({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{R as a};