import './polyfills.server.mjs';
import{a as r,b as n}from"./chunk-Z4YNIAP6.mjs";import"./chunk-52XCC6EH.mjs";import"./chunk-IGSLI5BI.mjs";import"./chunk-6EWG2IL2.mjs";import"./chunk-ZOQGZUTB.mjs";import{Ca as d,E as o,Gb as l,K as s,L as a,gc as p,kc as m}from"./chunk-LNWWKHVG.mjs";import"./chunk-VVCT4QZE.mjs";var u=(()=>{class t{ngOnInit(){}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=s({type:t,selectors:[["app-canvas-generator"]],decls:1,vars:0,template:function(e,C){e&1&&d(0,"router-outlet")},dependencies:[p]})}}return t})();var h=[{path:"",component:u,data:{title:"Canvas Generator",breadcrumb:"Canvas Generator",layout:"dense-layout"},children:[{path:"",pathMatch:"full",redirectTo:"list"},{path:"list",loadChildren:()=>import("./chunk-VD5G4ZXL.mjs").then(t=>t.ImageListModule)},{path:"generate",data:{roles:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-6PODWWQB.mjs").then(t=>t.ImageGenerateModule)},{path:"deleted",data:{roles:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-ANHSNDOZ.mjs").then(t=>t.ImageDeletedModule)},{path:"uploaded-images",data:{roles:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-NIMOCG7O.mjs").then(t=>t.ImageDataModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[m.forChild(h),m]})}}return t})();var N=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[l,f]})}}return t})();export{N as CanvasGeneratorModule};
