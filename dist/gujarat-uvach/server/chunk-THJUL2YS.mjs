import './polyfills.server.mjs';
import{a as O}from"./chunk-KVUOGU7F.mjs";import"./chunk-VMYUEYJD.mjs";import"./chunk-SB4F3AJP.mjs";import{a as Q}from"./chunk-RKRNFJJQ.mjs";import{B as W,C as $,J as K,O as Y,b as U,f as H}from"./chunk-JRG2B4KM.mjs";import{a as q}from"./chunk-6EWG2IL2.mjs";import"./chunk-Z6IJNFE7.mjs";import{$ as b,Aa as a,Ba as m,Da as L,E as g,Ea as M,Fa as _,Ga as w,Gb as F,Ha as p,Ib as G,K as C,Ka as z,L as h,La as R,Ma as D,Oa as P,Q as u,Qa as B,R as f,S as I,T as S,Xa as E,fc as T,ha as c,ia as s,ic as V,jc as N,kc as x,mb as j,sa as v,ua as l,yb as k,zb as A}from"./chunk-LNWWKHVG.mjs";import{h as d}from"./chunk-VVCT4QZE.mjs";var ot=["masonryGrid"],rt=()=>[12,24,48];function nt(e,y){if(e&1){let t=_();a(0,"div",12)(1,"a",13),I(),a(2,"svg",14),w("backgroundLoaded",function(o){let r=u(t).$implicit,n=p(3);return f(n.onSvgLoad(r,o))}),m(),S(),a(3,"span",15),P(4),a(5,"span",16),P(6,"unread messages"),m()()()()}if(e&2){let t=y.$implicit;c(),l("routerLink","/poster/"+t.id),c(),l("postDataSet",t)("loadOnly",!0),c(2),B(" Download: ",t.download_counter," ")}}function st(e,y){if(e&1&&(L(0),a(1,"div",9)(2,"div",10,0),v(4,nt,7,4,"div",11),m()(),M()),e&2){let t=p(2);c(4),l("ngForOf",t.posts)}}function at(e,y){if(e&1){let t=_();a(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div",6),v(5,st,5,1,"ng-container",7),m()()()(),a(6,"div",8),w("currentPageChange",function(o){u(t);let r=p();return f(r.changePage(o))})("pageSizeChange",function(o){u(t);let r=p();return f(r.changePageSize(o))}),m()()}if(e&2){let t=p();c(5),l("ngIf",t.posts.length),c(),l("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",E(5,rt))}}var X=(()=>{class e{constructor(t,i,o,r,n,tt,et,it){this.PS=t,this.route=i,this.router=o,this.authService=r,this.platformId=n,this.cdr=tt,this.platformService=et,this.colorService=it,this.posts=[],this.currentPage=1,this.limit=12,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.isBrowser=G(this.platformId)}ngOnInit(){return d(this,null,function*(){this.route.queryParams.subscribe(t=>d(this,null,function*(){this.currentPage=+t.page||1,this.limit=+t.limit||this.limit,this.search=t.search||this.search,this.sortBy=t.sortBy||this.sortBy,this.order=t.order||this.order,yield this.getAllPosts()}))})}ngAfterViewInit(){this.isBrowser&&(this.initializeMasonry(),window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()}))}initializeMasonry(){this.masonryGridRef&&this.isBrowser&&(console.log("Initializing Masonry:",this.masonryGridRef.nativeElement),this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadDeviceId(){return d(this,null,function*(){this.isBrowser&&(this.deviceId=yield this.platformService.getDeviceId(),console.log("Device ID:",this.deviceId))})}getAllPosts(){return d(this,null,function*(){this.PS.getAllPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order}).subscribe(t=>{this.posts=t.posts,this.pagination=t.pagination,this.cdr.detectChanges(),setTimeout(()=>{this.masonryInstance?(this.masonryInstance.reloadItems(),this.masonryInstance.layout()):this.initializeMasonry()},100)})})}changePage(t){this.currentPage!=t&&(this.currentPage=t,this.updateUrlParams(),this.getAllPosts())}changePageSize(t){this.limit!=t&&(this.limit=t,this.currentPage=1,this.updateUrlParams(),this.getAllPosts())}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}onSvgLoad(t,i){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"));let o=i?.target?.parentElement;console.log(t.backgroundurl);let r=t.backgroundurl;r&&o&&this.getColors(r,5).then(n=>{n.length>0&&(console.log(n),o.style.backgroundColor=n[2])}).catch(n=>{console.error("Failed to fetch colors:",n)})}getColors(t,i){return d(this,null,function*(){try{return yield this.colorService.getColors(t,i)}catch(o){return console.error("Error updating colors:",o),[]}})}static{this.\u0275fac=function(i){return new(i||e)(s(Q),s(T),s(V),s(O),s(b),s(j),s(q),s(K))}}static{this.\u0275cmp=C({type:e,selectors:[["app-latest"]],viewQuery:function(i,o){if(i&1&&z(ot,5),i&2){let r;R(r=D())&&(o.masonryGridRef=r.first)}},decls:1,vars:1,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column",4,"ngIf"],[1,"h-100-vh","d-flex","flex-column"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container-fluid","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-3 col-md-6 col-4 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-3","col-md-6","col-4","masonry-box"],["target","_blank",1,"position-relative","shadow-sm","p-1","text-decoration-none","d-block",3,"routerLink"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","d-block","m-1",3,"backgroundLoaded","postDataSet","loadOnly"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-none","d-md-block"],[1,"visually-hidden"]],template:function(i,o){i&1&&v(0,at,7,6,"div",1),i&2&&l("ngIf",o.isBrowser)},dependencies:[k,A,N,U,H]})}}return e})();var ct=[{path:"",component:X,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],Z=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=h({type:e})}static{this.\u0275inj=g({imports:[x.forChild(ct),x]})}}return e})();var Et=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=h({type:e})}static{this.\u0275inj=g({imports:[F,Z,Y,W,$]})}}return e})();export{Et as LatestModule};
