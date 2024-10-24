import './polyfills.server.mjs';
import{a as L}from"./chunk-WZDTAKKS.mjs";import{d as V,q as F}from"./chunk-ARTYCH24.mjs";import"./chunk-OYOEMNDY.mjs";import"./chunk-OKDHBQJS.mjs";import"./chunk-BHXUZULZ.mjs";import{d as R,f as T,h as P}from"./chunk-524BPX2N.mjs";import{$ as b,Aa as a,Ba as v,Pa as x,R as _,Ra as s,Xa as n,Ya as r,Za as g,_ as w,ab as D,ac as S,bb as d,bc as E,cb as c,cc as k,fa as m,ga as u,ha as I,ia as C,jb as l,jc as M,lb as f,ub as y}from"./chunk-WB2NDY7X.mjs";import"./chunk-FME56UVT.mjs";var N=(t,p)=>({"btn-outline-dark":t,"btn-outline-primary active":p});function $(t,p){if(t&1){let e=D();n(0,"div",26)(1,"div",27),I(),g(2,"svg",28),C(),n(3,"div",29)(4,"div",30)(5,"a",31),d("click",function(){let i=m(e).$implicit;return c(2).selectRecoverId(i.id),u(!1)}),g(6,"i",32),r(),n(7,"a",33),d("click",function(){let i=m(e).$implicit;return c(2).selectDeleteId(i.id),u(!1)}),g(8,"i",34),r()()(),n(9,"span",35),l(10),n(11,"span",36),l(12,"unread messages"),r()()()()}if(t&2){let e=p.$implicit;a(2),s("postDataSet",e)("loadOnly",!0),a(8),f(" ",e.download_counter," ")}}function q(t,p){if(t&1){let e=D();n(0,"button",37),d("click",function(){let i=m(e).$implicit,h=c(2);return u(h.onPageChange(i))}),l(1),r()}if(t&2){let e=p.$implicit,o=c(2);s("ngClass",y(2,N,e!==o.currentPage,e===o.currentPage)),a(),f(" ",e," ")}}function H(t,p){if(t&1){let e=D();n(0,"div",20),x(1,$,13,3,"div",21),n(2,"div",22)(3,"div",23)(4,"button",24),d("click",function(){m(e);let i=c();return u(i.onPageChange(1))}),l(5,"First"),r(),n(6,"button",24),d("click",function(){m(e);let i=c();return u(i.onPageChange(i.currentPage-1))}),l(7,"Previous"),r(),x(8,q,2,5,"button",25),n(9,"button",24),d("click",function(){m(e);let i=c();return u(i.onPageChange(i.currentPage+1))}),l(10,"Next"),r(),n(11,"button",24),d("click",function(){m(e);let i=c();return u(i.onPageChange(i.totalPages))}),l(12,"Last"),r()()()()}if(t&2){let e=c();a(),s("ngForOf",e.posts),a(3),s("disabled",e.currentPage===1),a(2),s("disabled",e.currentPage===1),a(2),s("ngForOf",e.getPaginationControls()),a(),s("disabled",e.currentPage===e.totalPages),a(2),s("disabled",e.currentPage===e.totalPages)}}var O=(()=>{class t{constructor(e,o,i){this.PS=e,this.route=o,this.router=i,this.posts=[],this.currentPage=1,this.totalPages=0,this.totalLength=0}ngOnInit(){this.window=window,this.route.queryParams.subscribe(e=>{this.currentPage=+e.page||1,this.getAllPosts(),this.getTotalPostLength()}),this.confirmRecover=new bootstrap.Modal(document.getElementById("confirmRecover"),{focus:!1,keyboard:!1,static:!1}),this.confirmRecover._element.addEventListener("hide.bs.modal",()=>{}),this.confirmRecover._element.addEventListener("hidden.bs.modal",()=>{this.selectedID=void 0}),this.confirmRecover._element.addEventListener("show.bs.modal",()=>{}),this.confirmRecover._element.addEventListener("shown.bs.modal",()=>{}),this.hardDeleteModal=new bootstrap.Modal(document.getElementById("hardDeleteModal"),{focus:!1,keyboard:!1,static:!1}),this.hardDeleteModal._element.addEventListener("hide.bs.modal",()=>{}),this.hardDeleteModal._element.addEventListener("hidden.bs.modal",()=>{this.selectedID=void 0}),this.hardDeleteModal._element.addEventListener("show.bs.modal",()=>{}),this.hardDeleteModal._element.addEventListener("shown.bs.modal",()=>{})}ngAfterViewInit(){}selectRecoverId(e){this.selectedID=e,e&&this.confirmRecover.show()}selectDeleteId(e){this.selectedID=e,e&&this.hardDeleteModal.show()}getAllPosts(){this.PS.getAllSoftDeletedPosts(this.currentPage).subscribe(e=>{this.posts=e,console.log(this.posts)})}getTotalPostLength(){this.PS.getTotalPostLength().subscribe(e=>{this.totalLength=e.totalLength,this.calculateTotalPages()})}recoverPost(){this.selectedID&&this.PS.recoverPost(this.selectedID).subscribe(e=>{console.log("Restored successful:",e),this.confirmRecover.hide(),this.getAllPosts()},e=>{console.error("Error during Restore:",e)})}hardDelete(){this.selectedID&&this.PS.hardDeletePost(this.selectedID).subscribe(e=>{console.log("Hard deletion successful:",e),this.hardDeleteModal.hide(),window.close()},e=>{console.error("Error during hard deletion:",e)})}calculateTotalPages(){this.totalPages=Math.ceil(this.totalLength/12)}onPageChange(e){this.currentPage!=e&&(this.currentPage=e,this.updateUrlParams())}getPaginationControls(){return Array.from({length:this.totalPages},(e,o)=>o+1)}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage},queryParamsHandling:"merge"})}static{this.\u0275fac=function(o){return new(o||t)(v(L),v(R),v(T))}}static{this.\u0275cmp=w({type:t,selectors:[["app-image-deleted"]],decls:42,vars:3,consts:[[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100"],["class","row g-3",4,"ngIf"],["id","confirmRecover","tabindex","-1","role","dialog",1,"modal","fade"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header","bg-success","text-white"],[1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button","id","btnDelete",1,"btn","btn-success",3,"click"],[1,"fa","fa-refresh","me-2"],["id","hardDeleteModal","tabindex","-1","role","dialog",1,"modal","fade"],[1,"modal-header","bg-danger","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close","text-white"],["type","button","id","btnDelete",1,"btn","btn-danger",3,"click"],[1,"row","g-3"],["class","col-lg-2 col-md-3 col-sm-4 col-6",4,"ngFor","ngForOf"],[1,"col-12"],[1,"btn-group","btn-group-toggle","py-3"],[1,"btn","btn-outline-dark",3,"click","disabled"],["class","btn",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6"],[1,"position-relative","mt-3"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","mx-auto","d-block",3,"postDataSet","loadOnly"],[1,"d-flex","flex-column","position-absolute","start-0","top-0","h-100","w-100","p-3"],[1,"d-flex","mb-auto"],["href","#",1,"btn","btn-success","btn-sm","me-auto",3,"click"],[1,"fa","fa-refresh"],["href","#",1,"btn","btn-danger","btn-sm","ms-auto",3,"click"],[1,"fa","fa-trash"],[1,"position-absolute","top-0","start-100","translate-middle","badge","rounded-pill","bg-danger"],[1,"visually-hidden"],[1,"btn",3,"click","ngClass"]],template:function(o,i){o&1&&(n(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),x(4,H,13,6,"div",4),r()()()(),n(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"h5",9),l(10,"Confirm Restore"),r(),g(11,"button",10),r(),n(12,"div",11)(13,"p"),l(14,"Are you sure you want to Restore "),n(15,"b"),l(16),r(),l(17,"?"),r()(),n(18,"div",12)(19,"button",13),l(20,"Cancel"),r(),n(21,"button",14),d("click",function(){return i.recoverPost()}),g(22,"i",15),l(23,"Restore"),r()()()()(),n(24,"div",16)(25,"div",6)(26,"div",7)(27,"div",17)(28,"h5",9),l(29,"Confirm Delete"),r(),g(30,"button",18),r(),n(31,"div",11)(32,"p"),l(33,"Are you sure you want to delete "),n(34,"b"),l(35),r(),l(36,"?"),r()(),n(37,"div",12)(38,"button",13),l(39,"Cancel"),r(),n(40,"button",19),d("click",function(){return i.hardDelete()}),l(41,"Delete"),r()()()()()),o&2&&(a(4),s("ngIf",i.posts.length),a(12),f('"',i.selectedID,'"'),a(19),f('"',i.selectedID,'"'))},dependencies:[S,E,k,V]})}}return t})();var B=[{path:"",component:O,data:{title:"Deleted Images",breadcrumb:"Deleted Images"}}],j=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=b({type:t})}static{this.\u0275inj=_({imports:[P.forChild(B),P]})}}return t})();var ne=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=b({type:t})}static{this.\u0275inj=_({imports:[M,j,F]})}}return t})();export{ne as ImageDeletedModule};
