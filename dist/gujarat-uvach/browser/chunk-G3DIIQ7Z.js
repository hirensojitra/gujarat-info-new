import{a as r,b as n}from"./chunk-34IDFFOG.js";import"./chunk-BPJQGRRW.js";import"./chunk-S2AHCA5Z.js";import"./chunk-2L72KUHO.js";import"./chunk-IHGCADJY.js";import"./chunk-F32RMVOI.js";import{E as o,Ib as p,J as d,K as a,Lb as m,nb as l,va as s}from"./chunk-VTNAYE3H.js";import"./chunk-CWTPBX7D.js";var u=(()=>{class t{ngOnInit(){}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-canvas-generator"]],decls:1,vars:0,template:function(e,C){e&1&&s(0,"router-outlet")},dependencies:[p]})}}return t})();var h=[{path:"",component:u,data:{title:"Canvas Generator",breadcrumb:"Canvas Generator",layout:"dense-layout"},children:[{path:"",pathMatch:"full",redirectTo:"list"},{path:"list",loadChildren:()=>import("./chunk-HL7JXZXG.js").then(t=>t.ImageListModule)},{path:"generate",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-OHAMGAWJ.js").then(t=>t.ImageGenerateModule)},{path:"deleted",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-7CMWWMVM.js").then(t=>t.ImageDeletedModule)},{path:"uploaded-images",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-XZUIFWE4.js").then(t=>t.ImageDataModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[m.forChild(h),m]})}}return t})();var N=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[l,f]})}}return t})();export{N as CanvasGeneratorModule};