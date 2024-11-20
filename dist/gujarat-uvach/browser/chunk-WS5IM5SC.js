import{a as U}from"./chunk-MHLMN6HZ.js";import{B as $,C as K,J as Y,O as J,b as H,f as W}from"./chunk-SM3E4O5B.js";import{a as q}from"./chunk-PSLVHKNI.js";import"./chunk-S2AHCA5Z.js";import"./chunk-CBCLPHDX.js";import{a as Q}from"./chunk-IHGCADJY.js";import"./chunk-WVD7KDO5.js";import{Aa as p,Da as E,E as h,Ea as R,Fa as k,Ha as g,Hb as V,Ia as P,J as S,Ja as D,Jb as N,K as u,Kb as O,Lb as I,P as f,Q as v,Qa as B,R as C,S as b,X as L,_a as j,aa as a,ba as c,fb as A,gb as F,la as y,na as d,nb as G,ob as T,ta as n,ua as l,wa as M,xa as z,ya as _,za as x}from"./chunk-VTNAYE3H.js";import{f as m}from"./chunk-CWTPBX7D.js";var rt=["masonryGrid"],nt=()=>[12,24,48];function st(e,w){if(e&1){let t=_();n(0,"div",12)(1,"h3",13),g(2),l(),n(3,"a",14),C(),n(4,"svg",15),x("backgroundLoaded",function(o){let r=f(t).$implicit,s=p(3);return v(s.onSvgLoad(r,o))}),l(),b(),n(5,"span",16),g(6),n(7,"span",17),g(8,"unread messages"),l()()(),n(9,"p",18),g(10),l()()}if(e&2){let t=w.$implicit;a(2),P(t.title),a(),d("routerLink","/poster/"+t.id),a(),d("postDataSet",t)("loadOnly",!0),a(2),D(" Download: ",t.download_counter," "),a(4),P(t.info)}}function at(e,w){if(e&1&&(M(0),n(1,"div",9)(2,"div",10,0),y(4,st,11,6,"div",11),l()(),z()),e&2){let t=p(2);a(4),d("ngForOf",t.posts)}}function ct(e,w){if(e&1){let t=_();n(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div",6),y(5,at,5,1,"ng-container",7),l()()()(),n(6,"div",8),x("currentPageChange",function(o){f(t);let r=p();return v(r.changePage(o))})("pageSizeChange",function(o){f(t);let r=p();return v(r.changePageSize(o))}),l()()}if(e&2){let t=p();a(5),d("ngIf",t.posts.length),a(),d("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",B(5,nt))}}var Z=(()=>{class e{constructor(t,i,o,r,s,et,it,ot){this.PS=t,this.route=i,this.router=o,this.authService=r,this.platformId=s,this.cdr=et,this.platformService=it,this.colorService=ot,this.posts=[],this.currentPage=1,this.limit=12,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.isBrowser=T(this.platformId)}ngOnInit(){return m(this,null,function*(){this.route.queryParams.subscribe(t=>m(this,null,function*(){this.currentPage=+t.page||1,this.limit=+t.limit||this.limit,this.search=t.search||this.search,this.sortBy=t.sortBy||this.sortBy,this.order=t.order||this.order,yield this.getAllPosts()}))})}ngAfterViewInit(){this.isBrowser&&(this.initializeMasonry(),window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()}))}initializeMasonry(){this.masonryGridRef&&this.isBrowser&&(console.log("Initializing Masonry:",this.masonryGridRef.nativeElement),this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadDeviceId(){return m(this,null,function*(){this.isBrowser&&(this.deviceId=yield this.platformService.getDeviceId(),console.log("Device ID:",this.deviceId))})}getAllPosts(){return m(this,null,function*(){this.PS.getAllPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order}).subscribe(t=>{this.posts=t.posts,this.pagination=t.pagination,this.cdr.detectChanges(),setTimeout(()=>{this.masonryInstance?(this.masonryInstance.reloadItems(),this.masonryInstance.layout()):this.initializeMasonry()},100)})})}changePage(t){this.currentPage!=t&&(this.currentPage=t,this.updateUrlParams(),this.getAllPosts())}changePageSize(t){this.limit!=t&&(this.limit=t,this.currentPage=1,this.updateUrlParams(),this.getAllPosts())}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}onSvgLoad(t,i){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"));let o=i?.target?.parentElement;console.log(t.backgroundurl);let r=t.backgroundurl;r&&o&&this.getColors(r,5).then(s=>{s.length>0&&(console.log(s),o.style.backgroundColor=s[2])}).catch(s=>{console.error("Failed to fetch colors:",s)})}getColors(t,i){return m(this,null,function*(){try{return yield this.colorService.getColors(t,i)}catch(o){return console.error("Error updating colors:",o),[]}})}static{this.\u0275fac=function(i){return new(i||e)(c(U),c(V),c(N),c(q),c(L),c(j),c(Q),c(Y))}}static{this.\u0275cmp=S({type:e,selectors:[["app-latest"]],viewQuery:function(i,o){if(i&1&&E(rt,5),i&2){let r;R(r=k())&&(o.masonryGridRef=r.first)}},decls:1,vars:1,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column",4,"ngIf"],[1,"h-100-vh","d-flex","flex-column"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container-fluid","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-3 col-md-6 col-4 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-3","col-md-6","col-4","masonry-box"],[1,"h5","fw-bold","m-0","p-3","bg-black","text-white"],["target","_blank",1,"position-relative","shadow-sm","p-1","text-decoration-none","d-block",3,"routerLink"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","d-block","m-1",3,"backgroundLoaded","postDataSet","loadOnly"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-none","d-md-block"],[1,"visually-hidden"],[1,"h6","m-0","p-3","bg-light","text-dark"]],template:function(i,o){i&1&&y(0,ct,7,6,"div",1),i&2&&d("ngIf",o.isBrowser)},dependencies:[A,F,O,H,W]})}}return e})();var lt=[{path:"",component:Z,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],tt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=u({type:e})}static{this.\u0275inj=h({imports:[I.forChild(lt),I]})}}return e})();var Bt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=u({type:e})}static{this.\u0275inj=h({imports:[G,tt,J,$,K]})}}return e})();export{Bt as LatestModule};
