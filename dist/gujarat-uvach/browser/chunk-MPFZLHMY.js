import{a as p,b as c}from"./chunk-34IDFFOG.js";import"./chunk-BPJQGRRW.js";import"./chunk-S2AHCA5Z.js";import"./chunk-2L72KUHO.js";import"./chunk-IHGCADJY.js";import"./chunk-F32RMVOI.js";import{E as e,Ib as a,J as m,K as i,Lb as n,nb as d,va as s}from"./chunk-VTNAYE3H.js";import"./chunk-CWTPBX7D.js";var u=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=m({type:t,selectors:[["app-admin"]],decls:1,vars:0,template:function(o,g){o&1&&s(0,"router-outlet")},dependencies:[a]})}}return t})();var h=[{path:"",component:u,data:{title:"PostNew | Admin",description:"Login or register to PostNew portal for accessing services",keywords:"PostNew, login, register, authentication, portal",robots:"index, follow"},children:[{path:"",pathMatch:"full",redirectTo:"users"},{path:"users",loadChildren:()=>import("./chunk-7ICQ27DL.js").then(t=>t.UsersModule),data:{role:["admin"]},canActivate:[p,c]}]}],f=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=e({imports:[n.forChild(h),n]})}}return t})();var P=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=e({imports:[d,f]})}}return t})();export{P as AdminModule};
