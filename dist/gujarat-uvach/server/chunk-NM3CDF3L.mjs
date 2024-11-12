import './polyfills.server.mjs';
import{a as m}from"./chunk-XUT36YXJ.mjs";import"./chunk-XEPJSYDU.mjs";import"./chunk-NQ4NUOBL.mjs";import"./chunk-Z6IJNFE7.mjs";import{B as r,Db as d,H as s,I as n,dc as c,fa as a,fc as p,hc as i,za as u}from"./chunk-TUDO6VUL.mjs";import"./chunk-VVCT4QZE.mjs";var l=(()=>{class t{constructor(o,e){this.authService=o,this.router=e}ngAfterViewInit(){this.authService.isAuthenticated()&&this.router.navigate(["/dashboard"])}static{this.\u0275fac=function(e){return new(e||t)(a(m),a(p))}}static{this.\u0275cmp=s({type:t,selectors:[["app-auth"]],decls:1,vars:0,template:function(e,M){e&1&&u(0,"router-outlet")},dependencies:[c]})}}return t})();var g=[{path:"",component:l,data:{title:"Gujarat Uvach | Authentication",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"},children:[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",loadChildren:()=>import("./chunk-BMTXQ3CT.mjs").then(t=>t.LoginModule)},{path:"register",loadChildren:()=>import("./chunk-MO53CHIF.mjs").then(t=>t.RegisterModule)},{path:"forgot-password",loadChildren:()=>import("./chunk-KTITQKSR.mjs").then(t=>t.ForgotPasswordModule)},{path:"reset-password",loadChildren:()=>import("./chunk-4NZKNQXN.mjs").then(t=>t.ResetPasswordModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[i.forChild(g),i]})}}return t})();var G=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[d,i,f]})}}return t})();export{G as AuthModule};