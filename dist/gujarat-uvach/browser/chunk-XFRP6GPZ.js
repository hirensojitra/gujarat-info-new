import{a as U}from"./chunk-CX7QREXT.js";import{b as q,r as Q}from"./chunk-B6RUB2QQ.js";import"./chunk-VM5R3MMS.js";import"./chunk-UZIG45QV.js";import{a as O}from"./chunk-77ITHIYP.js";import{Aa as p,Da as M,E as f,Ea as R,Fa as V,Ga as k,Ha as s,Hb as G,Ia as z,J as D,Ja as v,Jb as L,K as _,Lb as y,P as d,Q as m,Qa as T,X as C,Xa as j,Z as S,aa as l,ba as u,fb as F,gb as A,la as w,ma as E,na as h,nb as B,ob as N,ta as r,ua as n,va as g,ya as x,za as c}from"./chunk-DET3BHZI.js";import"./chunk-CWTPBX7D.js";var J=["masonryGrid"],K=()=>[12,24,48];function X(t,b){if(t&1){let e=x();r(0,"div",25)(1,"div",26)(2,"img",27),c("load",function(){d(e);let o=p(2);return m(o.onSvgLoad())}),n(),r(3,"div",28)(4,"div",29)(5,"a",30),c("click",function(){let o=d(e).$implicit;return p(2).selectRecoverId(o.id),m(!1)}),g(6,"i",31),n(),r(7,"a",32),c("click",function(){let o=d(e).$implicit;return p(2).selectDeleteId(o.id),m(!1)}),g(8,"i",33),n()()(),r(9,"span",34),s(10),n()()()}if(t&2){let e=b.$implicit,i=p(2);l(2),h("src",i.imgUrl+e.id,S),E("alt",e.title),l(8),v(" ",e.download_counter," ")}}function Y(t,b){if(t&1&&(r(0,"div",23,1),w(2,X,11,3,"div",24),n()),t&2){let e=p();l(2),h("ngForOf",e.posts)}}function Z(t,b){if(t&1&&(r(0,"div",35)(1,"p"),s(2),n()()),t&2){let e=p();l(2),z(e.post_msg)}}var H=(()=>{class t{constructor(e,i,o,a){this.PS=e,this.route=i,this.router=o,this.platformId=a,this.posts=[],this.currentPage=1,this.totalPages=0,this.totalPosts=0,this.limit=12,this.post_msg="Loading deleted posts",this.imgUrl=O.MasterApi+"/thumb-images/",this.isBrowser=N(this.platformId)}ngOnInit(){this.route.queryParams.subscribe(e=>{this.currentPage=+e.page||1,this.limit=+e.limit||this.limit,this.loadPosts()}),this.window=window,this.confirmRecover=new bootstrap.Modal(document.getElementById("confirmRecover"),{}),this.hardDeleteModal=new bootstrap.Modal(document.getElementById("hardDeleteModal"),{})}ngAfterViewInit(){this.isBrowser&&window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()})}loadPosts(){this.PS.getAllSoftDeletedPosts({page:this.currentPage,limit:this.limit}).subscribe(e=>{this.posts=e.posts,this.totalPosts=e.pagination.totalPosts,this.totalPages=Math.ceil(this.totalPosts/this.limit),setTimeout(()=>this.initializeMasonry(),0),this.post_msg="No deleted posts available."})}initializeMasonry(){this.masonryGridRef&&(this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".col-lg-2",columnWidth:".col-lg-2",percentPosition:!0}))}selectRecoverId(e){this.selectedID=e,e&&this.confirmRecover.show()}selectDeleteId(e){this.selectedID=e,e&&this.hardDeleteModal.show()}recoverPost(){this.selectedID&&this.PS.recoverPost(this.selectedID).subscribe(()=>{this.confirmRecover.hide(),this.loadPosts()})}hardDelete(){this.selectedID&&this.PS.hardDeletePost(this.selectedID).subscribe(()=>{this.hardDeleteModal.hide(),this.loadPosts()})}onPageChange(e){this.currentPage!==e&&(this.currentPage=e,this.updateUrlParams())}changePage(e){this.currentPage!=e&&(this.currentPage=e,this.loadPosts())}changePageSize(e){this.limit!=e&&(this.limit=e,this.currentPage=1,this.loadPosts())}getPaginationControls(){return Array.from({length:this.totalPages},(e,i)=>i+1)}updateUrlParams(){this.router.navigate([],{queryParams:{page:this.currentPage,limit:this.limit},queryParamsHandling:"merge"})}onSvgLoad(){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"))}static{this.\u0275fac=function(i){return new(i||t)(u(U),u(G),u(L),u(C))}}static{this.\u0275cmp=D({type:t,selectors:[["app-image-deleted"]],viewQuery:function(i,o){if(i&1&&M(J,5),i&2){let a;R(a=V())&&(o.masonryGridRef=a.first)}},decls:45,vars:9,consts:[["noPosts",""],["masonryGrid",""],[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100","p-md-3","p-2"],["class","row g-md-3 g-2","data-masonry","{'percentPosition': true}",4,"ngIf","ngIfElse"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","confirmRecover","tabindex","-1","role","dialog",1,"modal","fade"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header","bg-success","text-white"],[1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button","id","btnDelete",1,"btn","btn-success",3,"click"],[1,"fa","fa-refresh","me-2"],["id","hardDeleteModal","tabindex","-1","role","dialog",1,"modal","fade"],[1,"modal-header","bg-danger","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close","text-white"],["type","button","id","btnDelete",1,"btn","btn-danger",3,"click"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-2 col-md-3 col-sm-4 col-6 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6","masonry-box"],[1,"position-relative","border","p-2"],[1,"w-100","img-fluid","d-block",3,"load","src"],[1,"d-flex","flex-column","position-absolute","start-0","top-0","h-100","w-100","p-3"],[1,"d-flex","mb-auto"],["href","#",1,"btn","btn-success","btn-sm","me-auto",3,"click"],[1,"fa","fa-refresh"],["href","#",1,"btn","btn-danger","btn-sm","ms-auto",3,"click"],[1,"fa","fa-trash"],[1,"position-absolute","top-100","start-50","translate-middle","badge","rounded-pill","bg-danger"],[1,"text-center","py-3"]],template:function(i,o){if(i&1){let a=x();r(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5),w(4,Y,3,1,"div",6)(5,Z,3,1,"ng-template",null,0,j),r(7,"div",7),c("currentPageChange",function(P){return d(a),m(o.changePage(P))})("pageSizeChange",function(P){return d(a),m(o.changePageSize(P))}),n()()()()(),r(8,"div",8)(9,"div",9)(10,"div",10)(11,"div",11)(12,"h5",12),s(13,"Confirm Restore"),n(),g(14,"button",13),n(),r(15,"div",14)(16,"p"),s(17,"Are you sure you want to Restore "),r(18,"b"),s(19),n(),s(20,"?"),n()(),r(21,"div",15)(22,"button",16),s(23,"Cancel"),n(),r(24,"button",17),c("click",function(){return d(a),m(o.recoverPost())}),g(25,"i",18),s(26,"Restore"),n()()()()(),r(27,"div",19)(28,"div",9)(29,"div",10)(30,"div",20)(31,"h5",12),s(32,"Confirm Delete"),n(),g(33,"button",21),n(),r(34,"div",14)(35,"p"),s(36,"Are you sure you want to delete "),r(37,"b"),s(38),n(),s(39,"?"),n()(),r(40,"div",15)(41,"button",16),s(42,"Cancel"),n(),r(43,"button",22),c("click",function(){return d(a),m(o.hardDelete())}),s(44,"Delete"),n()()()()()}if(i&2){let a=k(6);l(4),h("ngIf",o.posts.length)("ngIfElse",a),l(3),h("currentPage",o.currentPage)("totalItems",o.totalPosts)("pageSize",o.limit)("pageSizes",T(8,K)),l(12),v('"',o.selectedID,'"'),l(19),v('"',o.selectedID,'"')}},dependencies:[F,A,q]})}}return t})();var ee=[{path:"",component:H,data:{title:"Deleted Images",breadcrumb:"Deleted Images"}}],W=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=_({type:t})}static{this.\u0275inj=f({imports:[y.forChild(ee),y]})}}return t})();var Ie=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=_({type:t})}static{this.\u0275inj=f({imports:[B,W,Q]})}}return t})();export{Ie as ImageDeletedModule};
