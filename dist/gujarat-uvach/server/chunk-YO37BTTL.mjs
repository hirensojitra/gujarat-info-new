import './polyfills.server.mjs';
import{a as r,b as n}from"./chunk-ZCGXSRXM.mjs";import"./chunk-QJKMKNYE.mjs";import"./chunk-DGFRUFEO.mjs";import"./chunk-G5X2RPFQ.mjs";import"./chunk-FE2KR4FI.mjs";import"./chunk-BHXUZULZ.mjs";import{A as o,Cb as l,G as d,H as a,cc as p,gc as m,ya as s}from"./chunk-S2DNEDKE.mjs";import"./chunk-VVCT4QZE.mjs";var u=(()=>{class t{ngOnInit(){}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-canvas-generator"]],decls:1,vars:0,template:function(e,C){e&1&&s(0,"router-outlet")},dependencies:[p]})}}return t})();var h=[{path:"",component:u,data:{title:"Canvas Generator",breadcrumb:"Canvas Generator",layout:"dense-layout"},children:[{path:"",pathMatch:"full",redirectTo:"list"},{path:"list",loadChildren:()=>import("./chunk-OKIZB4VF.mjs").then(t=>t.ImageListModule)},{path:"generate",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-4X2DGABW.mjs").then(t=>t.ImageGenerateModule)},{path:"deleted",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-YJULPO2W.mjs").then(t=>t.ImageDeletedModule)},{path:"uploaded-images",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-ROVZOKTM.mjs").then(t=>t.ImageDataModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[m.forChild(h),m]})}}return t})();var N=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[l,f]})}}return t})();export{N as CanvasGeneratorModule};