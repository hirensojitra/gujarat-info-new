import{a as q}from"./chunk-MHLMN6HZ.js";import{B as H,C as W,O as K,b as Q,f as U}from"./chunk-FUQC5WGJ.js";import{a as N}from"./chunk-PSLVHKNI.js";import"./chunk-S2AHCA5Z.js";import"./chunk-CBCLPHDX.js";import{a as O}from"./chunk-IHGCADJY.js";import"./chunk-WVD7KDO5.js";import{Aa as m,Da as M,E as p,Ea as z,Fa as R,Ha as w,Hb as G,J as x,Ja as D,Jb as T,K as g,Kb as V,Lb as P,P as h,Q as u,Qa as B,R as I,S,X as C,_a as j,aa as a,ba as n,fb as A,gb as E,la as f,na as c,nb as k,ob as F,ta as s,ua as l,wa as b,xa as L,ya as y,za as _}from"./chunk-VTNAYE3H.js";import{f as d}from"./chunk-CWTPBX7D.js";var et=["masonryGrid"],it=()=>[12,24,48];function ot(e,v){if(e&1){let t=y();s(0,"div",12)(1,"a",13),I(),s(2,"svg",14),_("backgroundLoaded",function(){h(t);let o=m(3);return u(o.onSvgLoad())}),l(),S(),s(3,"span",15),w(4),s(5,"span",16),w(6,"unread messages"),l()()()()}if(e&2){let t=v.$implicit;a(),c("routerLink","/poster/"+t.id),a(),c("postDataSet",t)("loadOnly",!0),a(2),D(" Download: ",t.download_counter," ")}}function rt(e,v){if(e&1&&(b(0),s(1,"div",9)(2,"div",10,0),f(4,ot,7,4,"div",11),l()(),L()),e&2){let t=m(2);a(4),c("ngForOf",t.posts)}}function nt(e,v){if(e&1){let t=y();s(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div",6),f(5,rt,5,1,"ng-container",7),l(),s(6,"div",8),_("currentPageChange",function(o){h(t);let r=m();return u(r.changePage(o))})("pageSizeChange",function(o){h(t);let r=m();return u(r.changePageSize(o))}),l()()()()()}if(e&2){let t=m();a(5),c("ngIf",t.posts.length),a(),c("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",B(5,it))}}var $=(()=>{class e{constructor(t,i,o,r,X,Z,tt){this.PS=t,this.route=i,this.router=o,this.authService=r,this.platformId=X,this.cdr=Z,this.platformService=tt,this.posts=[],this.currentPage=1,this.limit=12,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.isBrowser=F(this.platformId)}ngOnInit(){return d(this,null,function*(){this.route.queryParams.subscribe(t=>d(this,null,function*(){this.currentPage=+t.page||1,this.limit=+t.limit||this.limit,this.search=t.search||this.search,this.sortBy=t.sortBy||this.sortBy,this.order=t.order||this.order,yield this.getAllPosts()}))})}ngAfterViewInit(){this.isBrowser&&(this.initializeMasonry(),window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()}))}initializeMasonry(){this.masonryGridRef&&this.isBrowser&&(console.log("Initializing Masonry:",this.masonryGridRef.nativeElement),this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadDeviceId(){return d(this,null,function*(){this.isBrowser&&(this.deviceId=yield this.platformService.getDeviceId(),console.log("Device ID:",this.deviceId))})}getAllPosts(){return d(this,null,function*(){this.PS.getAllPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order}).subscribe(t=>{this.posts=t.posts,this.pagination=t.pagination,this.cdr.detectChanges(),setTimeout(()=>{this.masonryInstance?(this.masonryInstance.reloadItems(),this.masonryInstance.layout()):this.initializeMasonry()},100)})})}changePage(t){this.currentPage!=t&&(this.currentPage=t,this.updateUrlParams(),this.getAllPosts())}changePageSize(t){this.limit!=t&&(this.limit=t,this.currentPage=1,this.updateUrlParams(),this.getAllPosts())}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}onSvgLoad(){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"))}static{this.\u0275fac=function(i){return new(i||e)(n(q),n(G),n(T),n(N),n(C),n(j),n(O))}}static{this.\u0275cmp=x({type:e,selectors:[["app-latest"]],viewQuery:function(i,o){if(i&1&&M(et,5),i&2){let r;z(r=R())&&(o.masonryGridRef=r.first)}},decls:1,vars:1,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column",4,"ngIf"],[1,"h-100-vh","d-flex","flex-column"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-4 col-md-6 col-sm-4 col-3 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-4","col-md-6","col-sm-4","col-3","masonry-box"],["target","_blank",1,"position-relative","border","p-1","text-decoration-none","d-block",3,"routerLink"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","d-block","m-1",3,"backgroundLoaded","postDataSet","loadOnly"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-none","d-md-block"],[1,"visually-hidden"]],template:function(i,o){i&1&&f(0,nt,7,6,"div",1),i&2&&c("ngIf",o.isBrowser)},dependencies:[A,E,V,Q,U]})}}return e})();var st=[{path:"",component:$,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],J=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=g({type:e})}static{this.\u0275inj=p({imports:[P.forChild(st),P]})}}return e})();var Rt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=g({type:e})}static{this.\u0275inj=p({imports:[k,J,K,H,W]})}}return e})();export{Rt as LatestModule};
