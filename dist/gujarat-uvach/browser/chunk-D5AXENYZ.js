import{a as d}from"./chunk-HHHNYFS4.js";import"./chunk-7IYWN3B2.js";import"./chunk-W7QLE4EB.js";import"./chunk-QHXDM6TZ.js";import{B as s,C as n,Ra as c,S as a,ga as u,kb as m,lb as p,nb as i,w as r}from"./chunk-EFRF7YAV.js";var l=(()=>{class t{constructor(o,e){this.authService=o,this.router=e}ngAfterViewInit(){this.authService.isAuthenticated()&&this.router.navigate(["/dashboard"])}static{this.\u0275fac=function(e){return new(e||t)(a(d),a(p))}}static{this.\u0275cmp=s({type:t,selectors:[["app-auth"]],decls:1,vars:0,template:function(e,M){e&1&&u(0,"router-outlet")},dependencies:[m]})}}return t})();var g=[{path:"",component:l,data:{title:"Gujarat Uvach | Authentication",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"},children:[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",loadChildren:()=>import("./chunk-WOF42GVI.js").then(t=>t.LoginModule)},{path:"register",loadChildren:()=>import("./chunk-GZMWAHPQ.js").then(t=>t.RegisterModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[i.forChild(g),i]})}}return t})();var G=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[c,i,f]})}}return t})();export{G as AuthModule};