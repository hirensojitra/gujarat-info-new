import './polyfills.server.mjs';
import{a as p,b as c}from"./chunk-KT54PDG2.mjs";import"./chunk-BYMCGR4G.mjs";import"./chunk-DPLFNKNB.mjs";import"./chunk-IKPEBCM7.mjs";import"./chunk-662JNBOM.mjs";import"./chunk-BHXUZULZ.mjs";import{Ib as d,Mb as n,gb as s,ia as a,q as e,w as m,x as i}from"./chunk-GKTD5S5R.mjs";import"./chunk-VVCT4QZE.mjs";var l=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=m({type:t,selectors:[["app-admin"]],decls:1,vars:0,template:function(o,g){o&1&&a(0,"router-outlet")},dependencies:[d]})}}return t})();var h=[{path:"",component:l,data:{title:"Gujarat Uvach | Admin",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"},children:[{path:"",pathMatch:"full",redirectTo:"users"},{path:"users",loadChildren:()=>import("./chunk-XTBX4LTC.mjs").then(t=>t.UsersModule),data:{role:["admin"]},canActivate:[p,c]}]}],f=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=e({imports:[n.forChild(h),n]})}}return t})();var U=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=i({type:t})}static{this.\u0275inj=e({imports:[s,f]})}}return t})();export{U as AdminModule};
