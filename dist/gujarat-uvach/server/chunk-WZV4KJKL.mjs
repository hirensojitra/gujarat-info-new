import './polyfills.server.mjs';
import{a as d}from"./chunk-BYMCGR4G.mjs";import"./chunk-DPLFNKNB.mjs";import"./chunk-662JNBOM.mjs";import"./chunk-BHXUZULZ.mjs";import{Ib as m,Kb as p,Mb as i,U as a,gb as c,ia as u,q as r,w as s,x as n}from"./chunk-GKTD5S5R.mjs";import"./chunk-VVCT4QZE.mjs";var l=(()=>{class t{constructor(o,e){this.authService=o,this.router=e}ngAfterViewInit(){this.authService.isAuthenticated()&&this.router.navigate(["/dashboard"])}static{this.\u0275fac=function(e){return new(e||t)(a(d),a(p))}}static{this.\u0275cmp=s({type:t,selectors:[["app-auth"]],decls:1,vars:0,template:function(e,M){e&1&&u(0,"router-outlet")},dependencies:[m]})}}return t})();var g=[{path:"",component:l,data:{title:"Gujarat Uvach | Authentication",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"},children:[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",loadChildren:()=>import("./chunk-RHOK7YHL.mjs").then(t=>t.LoginModule)},{path:"register",loadChildren:()=>import("./chunk-5E3L4PEZ.mjs").then(t=>t.RegisterModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[i.forChild(g),i]})}}return t})();var G=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=n({type:t})}static{this.\u0275inj=r({imports:[c,i,f]})}}return t})();export{G as AuthModule};