import './polyfills.server.mjs';
import{a as U}from"./chunk-HRTQ2G2J.mjs";import"./chunk-4PYPEGK6.mjs";import{a as H}from"./chunk-C6R3THEX.mjs";import{b as Y,f as J,r as ne}from"./chunk-EA6B3TXH.mjs";import{c as K,f as X,j as Z,s as $,t as ee,u as te,x as ie}from"./chunk-X6RFGL5P.mjs";import{a as Q}from"./chunk-CGEXYLQB.mjs";import"./chunk-ZOQGZUTB.mjs";import{$ as V,Aa as o,Ba as s,Ca as x,Da as T,E as v,Ea as E,Fa as w,Ga as u,Gb as N,Ha as a,Ib as O,K as b,Ka as B,L as y,La as k,Ma as z,Oa as d,Q as l,Qa as R,R as m,S as L,Sa as C,T as M,Ta as I,Ua as S,Xa as A,ec as W,ha as c,hc as G,ia as p,ic as q,jc as P,mb as D,sa as _,ua as g,yb as j,zb as F}from"./chunk-YAE7DDPL.mjs";import{h as f}from"./chunk-VVCT4QZE.mjs";var me=["masonryGrid"],de=()=>[12,24,48];function ge(n,h){if(n&1){let e=w();o(0,"a",31),u("click",function(){l(e);let t=a().$implicit;return a(3).navigateToEdit(t.id),m(!1)}),x(1,"i",32),d(2,"Edit "),s()}}function pe(n,h){if(n&1){let e=w();o(0,"div",22)(1,"div",23),L(),o(2,"svg",24),u("backgroundLoaded",function(){l(e);let t=a(3);return m(t.onSvgLoad())}),s(),M(),o(3,"div",25),_(4,ge,3,0,"a",26),o(5,"a",27),x(6,"i",28),d(7,"View "),s()(),o(8,"span",29),d(9),o(10,"span",30),d(11,"unread messages"),s()()()()}if(n&2){let e=h.$implicit,i=a(3);c(2),g("postDataSet",e)("loadOnly",!0),c(2),g("ngIf",i.isAdmin()),c(),g("routerLink","/poster/"+e.id),c(4),R(" Download: ",e.download_counter," ")}}function ue(n,h){if(n&1&&(T(0),o(1,"div",19)(2,"div",20,0),_(4,pe,12,5,"div",21),s()(),E()),n&2){let e=a(2);c(4),g("ngForOf",e.posts)}}function _e(n,h){if(n&1){let e=w();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div",6)(5,"div",7)(6,"button",8),x(7,"i",9),d(8,"Image"),s()(),o(9,"div",7)(10,"div",10)(11,"input",11),S("ngModelChange",function(t){l(e);let r=a();return I(r.search,t)||(r.search=t),m(t)}),u("input",function(){l(e);let t=a();return m(t.changePage(1))}),s(),o(12,"select",12),S("ngModelChange",function(t){l(e);let r=a();return I(r.sortBy,t)||(r.sortBy=t),m(t)}),u("change",function(){l(e);let t=a();return m(t.changePage(1))}),o(13,"option",13),d(14,"Date Created"),s(),o(15,"option",14),d(16,"Title"),s()(),o(17,"select",12),S("ngModelChange",function(t){l(e);let r=a();return I(r.order,t)||(r.order=t),m(t)}),u("change",function(){l(e);let t=a();return m(t.changePage(1))}),o(18,"option",15),d(19,"Ascending"),s(),o(20,"option",16),d(21,"Descending"),s()()()(),_(22,ue,5,1,"ng-container",17),s(),o(23,"div",18),u("currentPageChange",function(t){l(e);let r=a();return m(r.changePage(t))})("pageSizeChange",function(t){l(e);let r=a();return m(r.changePageSize(t))}),s()()()()()}if(n&2){let e=a();c(6),g("routerLink","/images/generate"),c(5),C("ngModel",e.search),c(),C("ngModel",e.sortBy),c(5),C("ngModel",e.order),c(5),g("ngIf",e.posts.length),c(),g("currentPage",e.currentPage)("totalItems",e.pagination.totalPosts)("pageSize",e.limit)("pageSizes",A(9,de))}}var oe=(()=>{class n{constructor(e,i,t,r,se,ce,le){this.PS=e,this.route=i,this.router=t,this.authService=r,this.platformId=se,this.cdr=ce,this.platformService=le,this.posts=[],this.currentPage=1,this.limit=12,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.isBrowser=O(this.platformId)}ngOnInit(){return f(this,null,function*(){this.route.queryParams.subscribe(e=>f(this,null,function*(){this.currentPage=+e.page||1,this.limit=+e.limit||this.limit,this.search=e.search||this.search,this.sortBy=e.sortBy||this.sortBy,this.order=e.order||this.order,yield this.getAllPosts()}))})}ngAfterViewInit(){this.isBrowser&&(this.initializeMasonry(),window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()}))}initializeMasonry(){this.masonryGridRef&&this.isBrowser&&(console.log("Initializing Masonry:",this.masonryGridRef.nativeElement),this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}getAllPosts(){return f(this,null,function*(){this.PS.getAllPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order}).subscribe(e=>{this.posts=e.posts,this.pagination=e.pagination,this.cdr.detectChanges(),this.masonryInstance?(this.masonryInstance.reloadItems(),this.masonryInstance.layout()):this.initializeMasonry()})})}changePage(e){this.currentPage!=e&&(this.currentPage=e,this.updateUrlParams(),this.getAllPosts())}changePageSize(e){this.limit!=e&&(this.limit=e,this.currentPage=1,this.updateUrlParams(),this.getAllPosts())}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return console.log("Tests"),this.authService.hasRole(["admin","master"])}onSvgLoad(){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"))}navigateToEdit(e){let i={queryParams:{img:e}},t=this.router.createUrlTree(["/images/generate"],i),r=this.router.serializeUrl(t);window.open(r,"_blank")}static{this.\u0275fac=function(i){return new(i||n)(p(H),p(W),p(G),p(U),p(V),p(D),p(Q))}}static{this.\u0275cmp=b({type:n,selectors:[["app-image-list"]],viewQuery:function(i,t){if(i&1&&B(me,5),i&2){let r;k(r=z())&&(t.masonryGridRef=r.first)}},decls:1,vars:1,consts:[["masonryGrid",""],["class","h-100 d-flex flex-column p-3",4,"ngIf"],[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100"],[1,"row","g-3"],[1,"col-6","pb-3"],["target","_blank","type","button",1,"btn","btn-success",3,"routerLink"],[1,"fa","fa-plus","me-2"],[1,"search-sort-container"],["placeholder","Search posts",3,"ngModelChange","input","ngModel"],[3,"ngModelChange","change","ngModel"],["value","created_at"],["value","title"],["value","asc"],["value","desc"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-3 col-md-3 col-sm-4 col-6 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-3","col-md-3","col-sm-4","col-6","masonry-box"],[1,"position-relative","border","p-1"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","d-block","m-1",3,"backgroundLoaded","postDataSet","loadOnly"],["role","group",1,"btn-group","w-100"],["class","btn btn-secondary btn-sm rounded-0 m-1","target","_blank",3,"click",4,"ngIf"],["target","_blank",1,"btn","btn-secondary","btn-sm","rounded-0","m-1",3,"routerLink"],[1,"fa","fa-eye","me-2"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-none","d-md-block"],[1,"visually-hidden"],["target","_blank",1,"btn","btn-secondary","btn-sm","rounded-0","m-1",3,"click"],[1,"fa","fa-edit","me-2"]],template:function(i,t){i&1&&_(0,_e,24,10,"div",1),i&2&&g("ngIf",t.isBrowser)},dependencies:[j,F,q,Y,J,ee,te,K,$,X,Z]})}}return n})();var he=[{path:"",component:oe,data:{title:"Image List",breadcrumb:"Image List",description:"Your Page Description"}}],ae=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=y({type:n})}static{this.\u0275inj=v({imports:[P.forChild(he),P]})}}return n})();var Oe=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=y({type:n})}static{this.\u0275inj=v({imports:[N,ae,ne,ie]})}}return n})();export{Oe as ImageListModule};
