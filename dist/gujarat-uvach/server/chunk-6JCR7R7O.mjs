import './polyfills.server.mjs';
import{a as O}from"./chunk-HRTQ2G2J.mjs";import"./chunk-4PYPEGK6.mjs";import{a as W}from"./chunk-C6R3THEX.mjs";import{b as $,k as J,r as X}from"./chunk-JPPSYH5R.mjs";import{x as H,y as K}from"./chunk-X6RFGL5P.mjs";import{a as Q}from"./chunk-CGEXYLQB.mjs";import{a as q}from"./chunk-ZOQGZUTB.mjs";import{$ as S,Aa as c,Ba as l,Da as z,E as g,Ea as M,Fa as w,Ga as x,Gb as G,Ha as d,Ib as N,K as C,Ka as E,L as u,La as B,Ma as R,Oa as h,Pa as j,Q as f,Qa as P,R as v,Xa as k,ea as b,ec as T,ha as s,hc as V,ia as a,ic as U,jc as I,mb as A,sa as y,ta as L,ua as m,yb as D,zb as F}from"./chunk-YAE7DDPL.mjs";import{h as p}from"./chunk-VVCT4QZE.mjs";var rt=["masonryGrid"],nt=()=>[12,24,48];function st(e,_){if(e&1){let t=w();c(0,"div",12)(1,"h3",13),h(2),l(),c(3,"a",14)(4,"img",15),x("load",function(o){let r=f(t).$implicit,n=d(3);return v(n.onSvgLoad(r,o))}),l(),c(5,"span",16),h(6),c(7,"span",17),h(8,"unread messages"),l()()(),c(9,"p",18),h(10),l()()}if(e&2){let t=_.$implicit,i=d(3);s(2),P("",t.title," "),s(),m("routerLink","/poster/"+t.id),s(),m("src",i.imgUrl+t.id,b),L("alt",t.title),s(2),P(" Download: ",t.download_counter," "),s(4),j(t.info)}}function at(e,_){if(e&1&&(z(0),c(1,"div",9)(2,"div",10,0),y(4,st,11,6,"div",11),l()(),M()),e&2){let t=d(2);s(4),m("ngForOf",t.posts)}}function ct(e,_){if(e&1){let t=w();c(0,"div",2)(1,"div",3)(2,"div",4)(3,"div",5)(4,"div",6),y(5,at,5,1,"ng-container",7),l()()()(),c(6,"div",8),x("currentPageChange",function(o){f(t);let r=d();return v(r.changePage(o))})("pageSizeChange",function(o){f(t);let r=d();return v(r.changePageSize(o))}),l()()}if(e&2){let t=d();s(5),m("ngIf",t.posts.length),s(),m("currentPage",t.currentPage)("totalItems",t.pagination.totalPosts)("pageSize",t.limit)("pageSizes",k(5,nt))}}var Z=(()=>{class e{constructor(t,i,o,r,n,et,it,ot){this.PS=t,this.route=i,this.router=o,this.authService=r,this.platformId=n,this.cdr=et,this.platformService=it,this.colorService=ot,this.posts=[],this.currentPage=1,this.limit=12,this.search="",this.sortBy="created_at",this.order="desc",this.pagination={totalPosts:0,currentPage:1,totalPages:0},this.imgUrl=q.MasterApi+"/thumb-images/",this.isBrowser=N(this.platformId)}ngOnInit(){return p(this,null,function*(){this.route.queryParams.subscribe(t=>p(this,null,function*(){this.currentPage=+t.page||1,this.limit=+t.limit||this.limit,this.search=t.search||this.search,this.sortBy=t.sortBy||this.sortBy,this.order=t.order||this.order,yield this.getAllPosts()}))})}ngAfterViewInit(){this.isBrowser&&(this.initializeMasonry(),window.addEventListener("resize",()=>{this.masonryInstance&&this.masonryInstance.layout()}))}initializeMasonry(){this.masonryGridRef&&this.isBrowser&&(console.log("Initializing Masonry:",this.masonryGridRef.nativeElement),this.masonryInstance=new Masonry(this.masonryGridRef.nativeElement,{itemSelector:".masonry-box",percentPosition:!0}))}loadDeviceId(){return p(this,null,function*(){this.isBrowser&&(this.deviceId=yield this.platformService.getDeviceId(),console.log("Device ID:",this.deviceId))})}getAllPosts(){return p(this,null,function*(){this.PS.getAllPosts({page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order}).subscribe(t=>{this.posts=t.posts,this.pagination=t.pagination,this.cdr.detectChanges(),setTimeout(()=>{this.masonryInstance?(this.masonryInstance.reloadItems(),this.masonryInstance.layout()):this.initializeMasonry()},100)})})}changePage(t){this.currentPage!=t&&(this.currentPage=t,this.updateUrlParams(),this.getAllPosts())}changePageSize(t){this.limit!=t&&(this.limit=t,this.currentPage=1,this.updateUrlParams(),this.getAllPosts())}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage,limit:this.limit,search:this.search,sortBy:this.sortBy,order:this.order},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}onSvgLoad(t,i){this.masonryInstance&&this.isBrowser&&window.dispatchEvent(new Event("resize"));let o=i?.target?.parentElement,r=this.imgUrl+t.id;r&&o&&this.getColors(r,5).then(n=>{n.length>0&&(console.log(n),o.style.backgroundColor=n[2])}).catch(n=>{console.error("Failed to fetch colors:",n)})}getColors(t,i){return p(this,null,function*(){try{return yield this.colorService.getColors(t,i)}catch(o){return console.error("Error updating colors:",o),[]}})}static{this.\u0275fac=function(i){return new(i||e)(a(W),a(T),a(V),a(O),a(S),a(A),a(Q),a(J))}}static{this.\u0275cmp=C({type:e,selectors:[["app-latest"]],viewQuery:function(i,o){if(i&1&&E(rt,5),i&2){let r;B(r=R())&&(o.masonryGridRef=r.first)}},decls:1,vars:1,consts:[["masonryGrid",""],["class","h-100-vh d-flex flex-column",4,"ngIf"],[1,"h-100-vh","d-flex","flex-column"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container-fluid","h-100","w-100","py-3"],[1,"row","g-3"],[4,"ngIf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true}",1,"row","g-md-3","g-2"],["class","col-lg-3 col-md-6 col-4 masonry-box",4,"ngFor","ngForOf"],[1,"col-lg-3","col-md-6","col-4","masonry-box"],[1,"h5","fw-bold","m-0","p-3","bg-black","text-white","d-none","d-md-block"],["target","_blank",1,"position-relative","shadow-sm","p-2","text-decoration-none","d-block",3,"routerLink"],[1,"w-100","img-fluid","d-block",3,"load","src"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-md-block"],[1,"visually-hidden"],[1,"h6","m-0","p-3","bg-light","text-dark","d-none","d-md-block"]],template:function(i,o){i&1&&y(0,ct,7,6,"div",1),i&2&&m("ngIf",o.isBrowser)},dependencies:[D,F,U,$]})}}return e})();var lt=[{path:"",component:Z,data:{title:"Proposal for Web Application Poster Generation Service | PostNew",description:"Discover our web application for generating election campaign posters, festival posts, and other promotional activities. Customize posters with photos, names, addresses, designations, and contact details for efficient and personalized promotional material.",keywords:"poster generation, campaign posters, election posters, festival posts, promotional activities, customization, PostNew, web application",robots:"index, follow","og:image":"https://api.postnew.in/api/v1/img/uploads/wLmyK?quality=10","og:image:alt":"PostNew Logo","og:image:type":"image/svg+xml","og:image:width":"1200","og:image:height":"630","og:title":"Web Application Poster Generation Service | PostNew","og:description":"Generate personalized posters for campaigns and festivals with Gujarat Info\u2019s web application. Easily customize with your photos, names, and contact details."}}],tt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=u({type:e})}static{this.\u0275inj=g({imports:[I.forChild(lt),I]})}}return e})();var kt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=u({type:e})}static{this.\u0275inj=g({imports:[G,tt,X,H,K]})}}return e})();export{kt as LatestModule};
