import{a as r,b as n}from"./chunk-BO5MWAXF.js";import"./chunk-EVP4VJJQ.js";import"./chunk-FYMUTNXZ.js";import"./chunk-KKZIYGGL.js";import"./chunk-ADA2GC6O.js";import"./chunk-WVD7KDO5.js";import{s as p,v as m}from"./chunk-IQ323PG2.js";import{X as o,fa as d,ga as a,ib as s,yc as l}from"./chunk-ZATDRLX4.js";import"./chunk-CWTPBX7D.js";var u=(()=>{class t{ngOnInit(){}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-canvas-generator"]],decls:1,vars:0,template:function(e,C){e&1&&s(0,"router-outlet")},dependencies:[p]})}}return t})();var h=[{path:"",component:u,data:{title:"Canvas Generator",breadcrumb:"Canvas Generator",layout:"dense-layout"},children:[{path:"",pathMatch:"full",redirectTo:"list"},{path:"list",loadChildren:()=>import("./chunk-QEYVRI5R.js").then(t=>t.ImageListModule)},{path:"generate",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-M7SODMRM.js").then(t=>t.ImageGenerateModule)},{path:"deleted",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-HCB3DV46.js").then(t=>t.ImageDeletedModule)},{path:"uploaded-images",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-6IHYNYZ3.js").then(t=>t.ImageDataModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[m.forChild(h),m]})}}return t})();var N=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[l,f]})}}return t})();export{N as CanvasGeneratorModule};
