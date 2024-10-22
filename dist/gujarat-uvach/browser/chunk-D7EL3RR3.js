import{a as d}from"./chunk-YZI2CCND.js";import"./chunk-2Z3YAJXA.js";import"./chunk-QBRTSGNY.js";import"./chunk-QHXDM6TZ.js";import{G as r,Jb as m,Kb as p,L as s,M as n,Mb as i,ca as a,ob as c,wa as u}from"./chunk-6PSXH6NM.js";var l=(()=>{class t{constructor(o,e){this.authService=o,this.router=e}ngAfterViewInit(){this.authService.isAuthenticated()&&this.router.navigate(["/dashboard"])}static{this.\u0275fac=function(e){return new(e||t)(a(d),a(p))}}static{this.\u0275cmp=s({type:t,selectors:[["app-auth"]],decls:1,vars:0,template:function(e,M){e&1&&u(0,"router-outlet")},dependencies:[m]})}}return t})();var g=[{path:"",component:l,data:{title:"Gujarat Uvach | Authentication",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"},children:[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",loadChildren:()=>import("./chunk-64FNKI5A.js").then(t=>t.LoginModule)},{path:"register",loadChildren:()=>import("./chunk-UNFCES4X.js").then(t=>t.RegisterModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[i.forChild(g),i]})}}return t})();var G=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[c,i,f]})}}return t})();export{G as AuthModule};
