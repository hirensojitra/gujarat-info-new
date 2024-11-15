import './polyfills.server.mjs';
import{a as G}from"./chunk-RKRNFJJQ.mjs";import{O as Q,b as N,f as q}from"./chunk-3Q4L5IK4.mjs";import"./chunk-6EWG2IL2.mjs";import"./chunk-Z6IJNFE7.mjs";import{$ as b,Aa as s,Ba as r,Ca as P,E as h,Fa as I,Ga as g,Gb as L,Ha as m,Ib as O,K as D,Ka as S,L as u,La as M,Ma as R,Na as E,Oa as w,Pa as V,Q as l,Qa as z,R as d,S as x,T as C,Xa as T,cb as k,fc as A,ha as a,ia as c,ic as B,kc as y,sa as _,ua as p,yb as j,zb as F}from"./chunk-LNWWKHVG.mjs";import"./chunk-VVCT4QZE.mjs";var Y=["masonryGrid"],J=()=>[12,24,48];function K(t,f){if(t&1){let e=I();s(0,"div",10)(1,"div",11),x(),s(2,"svg",12),g("backgroundLoaded",function(){l(e);let o=m(2);return d(o.onSvgLoad())}),r(),C(),s(3,"div",13)(4,"div",14)(5,"a",15),g("click",function(){let o=l(e).$implicit;return m(2).selectRecoverId(o.id),d(!1)}),P(6,"i",16),r(),s(7,"a",17),g("click",function(){let o=l(e).$implicit;return m(2).selectDeleteId(o.id),d(!1)}),P(8,"i",18),r()()(),s(9,"span",19),w(10),r()()()}if(t&2){let e=f.$implicit;a(2),p("postDataSet",e)("loadOnly",!0),a(8),z(" ",e.download_counter," ")}}function X(t,f){if(t&1&&(s(0,"div",8,1),_(2,K,11,3,"div",9),r()),t&2){let e=m();a(2),p("ngForOf",e.posts)}}function Z(t,f){if(t&1&&(s(0,"div",20)(1,"p"),w(2),r()()),t&2){let e=m();a(2),V(e.post_msg)}}var H=(()=>{class t{constructor(e,i,o,n){this.PS=e,this.route=i,this.router=o,this.platformId=n,this.posts=[],this.currentPage=1,this.totalPages=0,this.totalPosts=0,this.limit=12,this.post_msg="Loading deleted posts",this.isBrowser=O(this.platformId)}ngOnInit(){this.window=window,this.route.queryParams.subscribe(e=>{this.currentPage=+e.page||1,this.limit=+e.limit||this.limit,this.loadPosts()}),this.confirmRecover=new bootstrap.Modal(document.getElementById("confirmRecover"),{}),this.hardDeleteModal=new bootstrap.Modal(document.getElementById("hardDeleteModal"),{})}ngAfterViewInit(){this.isBrowser&&window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()})}loadPosts(){this.PS.getAllSoftDeletedPosts({page:this.currentPage,limit:this.limit}).subscribe(e=>{this.posts=e.posts,this.totalPosts=e.pagination.totalPosts,this.totalPages=Math.ceil(this.totalPosts/this.limit),setTimeout(()=>this.initializeMasonry(),0),this.post_msg="No deleted posts available."})}initializeMasonry(){this.masonryGridRef&&(this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".col-lg-2",columnWidth:".col-lg-2",percentPosition:!0}))}selectRecoverId(e){this.selectedID=e,e&&this.confirmRecover.show()}selectDeleteId(e){this.selectedID=e,e&&this.hardDeleteModal.show()}recoverPost(){this.selectedID&&this.PS.recoverPost(this.selectedID).subscribe(()=>{this.confirmRecover.hide(),this.loadPosts()})}hardDelete(){this.selectedID&&this.PS.hardDeletePost(this.selectedID).subscribe(()=>{this.hardDeleteModal.hide(),this.loadPosts()})}onPageChange(e){this.currentPage!==e&&(this.currentPage=e,this.updateUrlParams())}changePage(e){this.currentPage!=e&&(this.currentPage=e,this.loadPosts())}changePageSize(e){this.limit!=e&&(this.limit=e,this.currentPage=1,this.loadPosts())}getPaginationControls(){return Array.from({length:this.totalPages},(e,i)=>i+1)}updateUrlParams(){this.router.navigate([],{queryParams:{page:this.currentPage,limit:this.limit},queryParamsHandling:"merge"})}onSvgLoad(){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"))}static{this.\u0275fac=function(i){return new(i||t)(c(G),c(A),c(B),c(b))}}static{this.\u0275cmp=D({type:t,selectors:[["app-image-deleted"]],viewQuery:function(i,o){if(i&1&&S(Y,5),i&2){let n;M(n=R())&&(o.masonryGridRef=n.first)}},decls:8,vars:7,consts:[["noPosts",""],["masonryGrid",""],[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100","p-md-3","p-2"],["class","row g-md-3 g-2","data-masonry","{'percentPosition': true}",4,"ngIf","ngIfElse"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-2 col-md-3 col-sm-4 col-6 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6","masonry-box"],[1,"position-relative","border","p-2"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","mx-auto","d-block",3,"backgroundLoaded","postDataSet","loadOnly"],[1,"d-flex","flex-column","position-absolute","start-0","top-0","h-100","w-100","p-3"],[1,"d-flex","mb-auto"],["href","#",1,"btn","btn-success","btn-sm","me-auto",3,"click"],[1,"fa","fa-refresh"],["href","#",1,"btn","btn-danger","btn-sm","ms-auto",3,"click"],[1,"fa","fa-trash"],[1,"position-absolute","top-100","start-50","translate-middle","badge","rounded-pill","bg-danger"],[1,"text-center","py-3"]],template:function(i,o){if(i&1){let n=I();s(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5),_(4,X,3,1,"div",6)(5,Z,3,1,"ng-template",null,0,k),s(7,"div",7),g("currentPageChange",function(v){return l(n),d(o.changePage(v))})("pageSizeChange",function(v){return l(n),d(o.changePageSize(v))}),r()()()()()}if(i&2){let n=E(6);a(4),p("ngIf",o.posts.length)("ngIfElse",n),a(3),p("currentPage",o.currentPage)("totalItems",o.totalPosts)("pageSize",o.limit)("pageSizes",T(6,J))}},dependencies:[j,F,N,q]})}}return t})();var ee=[{path:"",component:H,data:{title:"Deleted Images",breadcrumb:"Deleted Images"}}],U=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=u({type:t})}static{this.\u0275inj=h({imports:[y.forChild(ee),y]})}}return t})();var Ie=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=u({type:t})}static{this.\u0275inj=h({imports:[L,U,Q]})}}return t})();export{Ie as ImageDeletedModule};
