import './polyfills.server.mjs';
import{a as Q}from"./chunk-HRTQ2G2J.mjs";import"./chunk-4PYPEGK6.mjs";import{a as Y}from"./chunk-C6R3THEX.mjs";import{b as J,r as ne}from"./chunk-JPPSYH5R.mjs";import{c as K,f as X,j as Z,s as $,t as ee,u as te,x as ie}from"./chunk-X6RFGL5P.mjs";import{a as H}from"./chunk-CGEXYLQB.mjs";import{a as q}from"./chunk-ZOQGZUTB.mjs";import{$ as L,Aa as o,Ba as a,Ca as x,Da as E,E as v,Ea as T,Fa as w,Ga as u,Gb as N,Ha as s,Ib as W,K as b,Ka as B,L as y,La as z,Ma as k,Oa as d,Q as c,Qa as A,R as m,Sa as C,Ta as I,Ua as P,Xa as R,ea as M,ec as U,ha as l,hc as O,ia as p,ic as G,jc as S,mb as j,sa as h,ta as V,ua as g,yb as D,zb as F}from"./chunk-YAE7DDPL.mjs";import{h as f}from"./chunk-VVCT4QZE.mjs";var me=["masonryGrid"],de=()=>[12,24,48];function ge(n,_){if(n&1){let e=w();o(0,"a",31),u("click",function(){c(e);let t=s().$implicit;return s(3).navigateToEdit(t.id),m(!1)}),x(1,"i",32),d(2,"Edit "),a()}}function pe(n,_){if(n&1){let e=w();o(0,"div",22)(1,"div",23)(2,"img",24),u("load",function(){c(e);let t=s(3);return m(t.onSvgLoad())}),a(),o(3,"div",25),h(4,ge,3,0,"a",26),o(5,"a",27),x(6,"i",28),d(7,"View "),a()(),o(8,"span",29),d(9),o(10,"span",30),d(11,"unread messages"),a()()()()}if(n&2){let e=_.$implicit,i=s(3);l(2),g("src",i.imgUrl+e.id,M),V("alt",e.title),l(2),g("ngIf",i.isAdmin()),l(),g("routerLink","/poster/"+e.id),l(4),A(" Download: ",e.download_counter," ")}}function ue(n,_){if(n&1&&(E(0),o(1,"div",19)(2,"div",20,0),h(4,pe,12,5,"div",21),a()(),T()),n&2){let e=s(2);l(4),g("ngForOf",e.posts)}}function he(n,_){if(n&1){let e=w();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div",6)(5,"div",7)(6,"button",8),x(7,"i",9),d(8,"Image"),a()(),o(9,"div",7)(10,"div",10)(11,"input",11),P("ngModelChange",function(t){c(e);let r=s();return I(r.search,t)||(r.search=t),m(t)}),u("input",function(){c(e);let t=s();return m(t.changePage(1))}),a(),o(12,"select",12),P("ngModelChange",function(t){c(e);let r=s();return I(r.sortBy,t)||(r.sortBy=t),m(t)}),u("change",function(){c(e);let t=s();return m(t.changePage(1))}),o(13,"option",13),d(14,"Date Created"),a(),o(15,"option",14),d(16,"Title"),a()(),o(17,"select",12),P("ngModelChange",function(t){c(e);let r=s();return I(r.order,t)||(r.order=t),m(t)}),u("change",function(){c(e);let t=s();return m(t.changePage(1))}),o(18,"option",15),d(19,"Ascending"),a(),o(20,"option",16),d(21,"Descending"),a()()()(),h(22,ue,5,1,"ng-container",17),a(),o(23,"div",18),u("currentPageChange",function(t){c(e);let r=s();return m(r.changePage(t))})("pageSizeChange",function(t){c(e);let r=s();return m(r.changePageSize(t))}),a()()()()()}if(n&2){let e=s();l(6),g("routerLink","/images/generate"),l(5),C("ngModel",e.search),l(),C("ngModel",e.sortBy),l(5),C("ngModel",e.order),l(5),g("ngIf",e.posts.length),l(),g("currentPage",e.currentPage)("totalItems",e.pagination.totalPosts)("pageSize",e.limit)("pageSizes",R(9,de))}}var oe=(()=>{class n{constructor(e,i,t,r,ae,le,ce){this.PS=e,this.route=i,this.router=t,this.authService=r,this.platformId=ae,this.cdr=le,this.platformService=ce,this.posts=[],this.currentPage=1,this.limit=12,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.imgUrl=q.MasterApi+"/thumb-images/",this.isBrowser=W(this.platformId)}ngOnInit(){return f(this,null,function*(){this.route.queryParams.subscribe(e=>f(this,null,function*(){this.currentPage=+e.page||1,this.limit=+e.limit||this.limit,this.search=e.search||this.search,this.sortBy=e.sortBy||this.sortBy,this.order=e.order||this.order,yield this.getAllPosts()}))})}ngAfterViewInit(){this.isBrowser&&(this.initializeMasonry(),window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()}))}initializeMasonry(){this.masonryGridRef&&this.isBrowser&&(console.log("Initializing Masonry:",this.masonryGridRef.nativeElement),this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}getAllPosts(){return f(this,null,function*(){this.PS.getAllPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order}).subscribe(e=>{this.posts=e.posts,this.pagination=e.pagination,this.cdr.detectChanges(),this.masonryInstance?(this.masonryInstance.reloadItems(),this.masonryInstance.layout()):this.initializeMasonry()})})}changePage(e){this.currentPage!=e&&(this.currentPage=e,this.updateUrlParams(),this.getAllPosts())}changePageSize(e){this.limit!=e&&(this.limit=e,this.currentPage=1,this.updateUrlParams(),this.getAllPosts())}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return console.log("Tests"),this.authService.hasRole(["admin","master"])}onSvgLoad(){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"))}navigateToEdit(e){let i={queryParams:{img:e}},t=this.router.createUrlTree(["/images/generate"],i),r=this.router.serializeUrl(t);window.open(r,"_blank")}static{this.\u0275fac=function(i){return new(i||n)(p(Y),p(U),p(O),p(Q),p(L),p(j),p(H))}}static{this.\u0275cmp=b({type:n,selectors:[["app-image-list"]],viewQuery:function(i,t){if(i&1&&B(me,5),i&2){let r;z(r=k())&&(t.masonryGridRef=r.first)}},decls:1,vars:1,consts:[["masonryGrid",""],["class","h-100 d-flex flex-column p-3",4,"ngIf"],[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100"],[1,"row","g-3"],[1,"col-6","pb-3"],["target","_blank","type","button",1,"btn","btn-success",3,"routerLink"],[1,"fa","fa-plus","me-2"],[1,"search-sort-container"],["placeholder","Search posts",3,"ngModelChange","input","ngModel"],[3,"ngModelChange","change","ngModel"],["value","created_at"],["value","title"],["value","asc"],["value","desc"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-3 col-md-3 col-sm-4 col-6 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-3","col-md-3","col-sm-4","col-6","masonry-box"],[1,"position-relative","border","p-1"],[1,"w-100","img-fluid","d-block",3,"load","src"],["role","group",1,"btn-group","w-100"],["class","btn btn-secondary btn-sm rounded-0 m-1","target","_blank",3,"click",4,"ngIf"],["target","_blank",1,"btn","btn-secondary","btn-sm","rounded-0","m-1",3,"routerLink"],[1,"fa","fa-eye","me-2"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-none","d-md-block"],[1,"visually-hidden"],["target","_blank",1,"btn","btn-secondary","btn-sm","rounded-0","m-1",3,"click"],[1,"fa","fa-edit","me-2"]],template:function(i,t){i&1&&h(0,he,24,10,"div",1),i&2&&g("ngIf",t.isBrowser)},dependencies:[D,F,G,J,ee,te,K,$,X,Z]})}}return n})();var _e=[{path:"",component:oe,data:{title:"Image List",breadcrumb:"Image List",description:"Your Page Description"}}],se=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=y({type:n})}static{this.\u0275inj=v({imports:[S.forChild(_e),S]})}}return n})();var We=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=y({type:n})}static{this.\u0275inj=v({imports:[N,se,ne,ie]})}}return n})();export{We as ImageListModule};
