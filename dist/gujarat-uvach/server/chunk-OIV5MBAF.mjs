import './polyfills.server.mjs';
import{a as j}from"./chunk-XUT36YXJ.mjs";import"./chunk-XEPJSYDU.mjs";import{b as D}from"./chunk-NQ4NUOBL.mjs";import"./chunk-Z6IJNFE7.mjs";import{B as o,Ca as l,Da as b,Db as M,Ea as g,H as c,I as s,La as v,N as m,O as d,fa as n,fc as C,hc as a,pa as u,ra as p,wb as y,xa as f,ya as h}from"./chunk-TUDO6VUL.mjs";import"./chunk-VVCT4QZE.mjs";function w(e,V){if(e&1){let t=l();f(0,"button",1),b("click",function(){m(t);let r=g();return d(r.resendVerification())}),v(1,"Verify Email"),h()}}var x=(()=>{class e{constructor(t,i,r){this.authService=t,this.router=i,this.userService=r,this.email="",this.message="",this.errorMessage=""}ngOnInit(){this.userService.getUser().subscribe(t=>{this.user=t})}resendVerification(){this.user.email&&this.authService.resendVerificationEmail(this.user.email).subscribe(t=>{this.message=t.message,this.errorMessage=""},t=>{this.errorMessage=t,this.message=""})}static{this.\u0275fac=function(i){return new(i||e)(n(j),n(C),n(D))}}static{this.\u0275cmp=c({type:e,selectors:[["app-dashboard"]],decls:1,vars:1,consts:[["class","btn btn-primay",3,"click",4,"ngIf"],[1,"btn","btn-primay",3,"click"]],template:function(i,r){i&1&&u(0,w,2,0,"button",0),i&2&&p("ngIf",r.user&&!r.user.emailverified)},dependencies:[y]})}}return e})();var S=[{path:"",component:x,data:{title:"Dashboard | Gujarat Uvach",description:"Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",keywords:"Gujarat Uvach, services, dashboard, user portal, features, access",robots:"index, follow"}}],I=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=s({type:e})}static{this.\u0275inj=o({imports:[a.forChild(S),a]})}}return e})();var z=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=s({type:e})}static{this.\u0275inj=o({imports:[M,I]})}}return e})();export{z as DashboardModule};