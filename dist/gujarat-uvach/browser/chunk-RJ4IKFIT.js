import{a as r,b as n}from"./chunk-UJKZ4SHD.js";import"./chunk-HKWYHM3I.js";import"./chunk-UN2CGVO7.js";import"./chunk-IHGCADJY.js";import"./chunk-77ITHIYP.js";import{E as o,Ib as p,J as s,K as a,Lb as m,nb as l,va as d}from"./chunk-VTNAYE3H.js";import"./chunk-CWTPBX7D.js";var u=(()=>{class t{ngOnInit(){}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=s({type:t,selectors:[["app-canvas-generator"]],decls:1,vars:0,template:function(e,C){e&1&&d(0,"router-outlet")},dependencies:[p]})}}return t})();var h=[{path:"",component:u,data:{title:"Canvas Generator",breadcrumb:"Canvas Generator",layout:"dense-layout"},children:[{path:"",pathMatch:"full",redirectTo:"list"},{path:"list",loadChildren:()=>import("./chunk-66YBP2IS.js").then(t=>t.ImageListModule)},{path:"generate",data:{roles:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-UXMB5Q4E.js").then(t=>t.ImageGenerateModule)},{path:"deleted",data:{roles:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-GP2RFIR6.js").then(t=>t.ImageDeletedModule)},{path:"uploaded-images",data:{roles:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-QIIASC7B.js").then(t=>t.ImageDataModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[m.forChild(h),m]})}}return t})();var N=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[l,f]})}}return t})();export{N as CanvasGeneratorModule};
