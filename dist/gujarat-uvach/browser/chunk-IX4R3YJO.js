import{a as j}from"./chunk-UBCLRJQM.js";import"./chunk-RXSEZ7R6.js";import{b as D}from"./chunk-PDKTMBXV.js";import"./chunk-WVD7KDO5.js";import{Ba as l,Ca as b,Da as g,H as o,Ka as v,M as c,Mb as C,N as s,Ob as a,S as m,T as d,ea as n,jb as y,oa as u,qa as p,qb as M,wa as f,xa as h}from"./chunk-U3VKK5QX.js";function w(e,V){if(e&1){let t=l();f(0,"button",1),b("click",function(){m(t);let r=g();return d(r.resendVerification())}),v(1,"Verify Email"),h()}}var x=(()=>{class e{constructor(t,i,r){this.authService=t,this.router=i,this.userService=r,this.email="",this.message="",this.errorMessage=""}ngOnInit(){this.userService.getUser().subscribe(t=>{this.user=t})}resendVerification(){this.user.email&&this.authService.resendVerificationEmail(this.user.email).subscribe(t=>{this.message=t.message,this.errorMessage=""},t=>{this.errorMessage=t,this.message=""})}static{this.\u0275fac=function(i){return new(i||e)(n(j),n(C),n(D))}}static{this.\u0275cmp=c({type:e,selectors:[["app-dashboard"]],decls:1,vars:1,consts:[["class","btn btn-primay",3,"click",4,"ngIf"],[1,"btn","btn-primay",3,"click"]],template:function(i,r){i&1&&u(0,w,2,0,"button",0),i&2&&p("ngIf",r.user&&!r.user.emailverified)},dependencies:[y]})}}return e})();var S=[{path:"",component:x,data:{title:"Dashboard | Gujarat Uvach",description:"Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",keywords:"Gujarat Uvach, services, dashboard, user portal, features, access",robots:"index, follow"}}],I=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=s({type:e})}static{this.\u0275inj=o({imports:[a.forChild(S),a]})}}return e})();var z=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=s({type:e})}static{this.\u0275inj=o({imports:[M,I]})}}return e})();export{z as DashboardModule};