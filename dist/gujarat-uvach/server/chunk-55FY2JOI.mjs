import './polyfills.server.mjs';
import{a as r,b as n}from"./chunk-KSJGMQNX.mjs";import"./chunk-XUT36YXJ.mjs";import"./chunk-XEPJSYDU.mjs";import"./chunk-NQ4NUOBL.mjs";import"./chunk-P3FJMRUS.mjs";import"./chunk-Z6IJNFE7.mjs";import{B as o,Db as l,H as d,I as a,dc as p,hc as m,za as s}from"./chunk-TUDO6VUL.mjs";import"./chunk-VVCT4QZE.mjs";var u=(()=>{class t{ngOnInit(){}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-canvas-generator"]],decls:1,vars:0,template:function(e,C){e&1&&s(0,"router-outlet")},dependencies:[p]})}}return t})();var h=[{path:"",component:u,data:{title:"Canvas Generator",breadcrumb:"Canvas Generator",layout:"dense-layout"},children:[{path:"",pathMatch:"full",redirectTo:"list"},{path:"list",loadChildren:()=>import("./chunk-PNW2HIHL.mjs").then(t=>t.ImageListModule)},{path:"generate",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-WLLVVE36.mjs").then(t=>t.ImageGenerateModule)},{path:"deleted",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-2XOYNVPL.mjs").then(t=>t.ImageDeletedModule)},{path:"uploaded-images",data:{role:["master","admin"]},canActivate:[r,n],loadChildren:()=>import("./chunk-IHEUROUZ.mjs").then(t=>t.ImageDataModule)}]}],f=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[m.forChild(h),m]})}}return t})();var N=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=a({type:t})}static{this.\u0275inj=o({imports:[l,f]})}}return t})();export{N as CanvasGeneratorModule};