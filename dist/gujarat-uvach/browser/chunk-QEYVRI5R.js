import{a as q}from"./chunk-EVP4VJJQ.js";import"./chunk-FYMUTNXZ.js";import"./chunk-KKZIYGGL.js";import{a as G}from"./chunk-EPALUPX2.js";import{N as Y,e as H}from"./chunk-26MFHNYG.js";import{a as $}from"./chunk-ADA2GC6O.js";import"./chunk-WVD7KDO5.js";import{r as B,t as U,u as N,v as y}from"./chunk-IQ323PG2.js";import{Ac as O,Ba as S,Hb as M,Jb as V,Ka as o,Kb as F,La as u,X as h,_a as f,ab as a,fa as C,ga as x,gb as r,hb as s,ib as I,jb as k,kb as T,lb as v,mb as p,nb as c,oa as d,pa as g,pc as D,qa as w,qc as E,ra as L,rc as j,wb as l,wc as R,yb as b,yc as A}from"./chunk-ZATDRLX4.js";import{f as P}from"./chunk-CWTPBX7D.js";var X=(e,m)=>({"btn-outline-dark":e,"btn-outline-primary active":m});function Z(e,m){if(e&1){let t=v();r(0,"a",26),p("click",function(){d(t);let n=c().$implicit;return c(3).navigateToEdit(n.id),g(!1)}),I(1,"i",27),l(2,"Edit "),s()}}function tt(e,m){if(e&1){let t=v();r(0,"div",17)(1,"div",18),w(),r(2,"svg",19),p("backgroundLoaded",function(){d(t);let n=c(3);return g(n.onSvgLoad())}),s(),L(),r(3,"div",20),f(4,Z,3,0,"a",21),r(5,"a",22),I(6,"i",23),l(7,"View "),s()(),r(8,"span",24),l(9),r(10,"span",25),l(11,"unread messages"),s()()()()}if(e&2){let t=m.$implicit,i=c(3);o(2),a("postDataSet",t)("loadOnly",!0),o(2),a("ngIf",i.isAdmin()),o(),a("routerLink","/poster/"+t.id),o(4),b(" Download: ",t.download_counter," ")}}function et(e,m){if(e&1){let t=v();r(0,"button",28),p("click",function(){let n=d(t).$implicit,_=c(3);return g(_.onPageChange(n))}),l(1),s()}if(e&2){let t=m.$implicit,i=c(3);a("ngClass",M(2,X,t!==i.currentPage,t===i.currentPage)),o(),b(" ",t," ")}}function it(e,m){if(e&1){let t=v();k(0),r(1,"div",10)(2,"div",11),f(3,tt,12,5,"div",12),s()(),r(4,"div",13)(5,"div",14)(6,"button",15),p("click",function(){d(t);let n=c(2);return g(n.onPageChange(1))}),l(7,"First"),s(),r(8,"button",15),p("click",function(){d(t);let n=c(2);return g(n.onPageChange(n.currentPage-1))}),l(9,"Previous"),s(),f(10,et,2,5,"button",16),r(11,"button",15),p("click",function(){d(t);let n=c(2);return g(n.onPageChange(n.currentPage+1))}),l(12,"Next"),s(),r(13,"button",15),p("click",function(){d(t);let n=c(2);return g(n.onPageChange(n.totalPages))}),l(14,"Last"),s()()(),T()}if(e&2){let t=c(2);o(3),a("ngForOf",t.posts),o(3),a("disabled",t.currentPage===1),o(2),a("disabled",t.currentPage===1),o(2),a("ngForOf",t.getPaginationControls()),o(),a("disabled",t.currentPage===t.totalPages),o(2),a("disabled",t.currentPage===t.totalPages)}}function nt(e,m){if(e&1&&(r(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"div",6)(6,"button",7),I(7,"i",8),l(8,"Image"),s()(),l(9),V(10,"json"),f(11,it,15,6,"ng-container",9),s()()()()()),e&2){let t=c();o(6),a("routerLink","/images/generate"),o(3),b(" ",F(10,3,t.deviceInfo)," "),o(2),a("ngIf",t.posts.length)}}var J=(()=>{class e{constructor(t,i,n,_,Q,W){this.PS=t,this.route=i,this.router=n,this.authService=_,this.platformId=Q,this.platformService=W,this.posts=[],this.imageUrls=[],this.currentPage=1,this.totalPages=0,this.totalLength=0,this.deviceId=null,this.isBrowser=O(this.platformId),this.loadDeviceId()}ngOnInit(){return P(this,null,function*(){if(this.isBrowser){let t=yield import("./chunk-YU24AFE3.js")}this.route.queryParams.subscribe(t=>{this.currentPage=+t.page||1,this.getAllPosts(),this.getTotalPostLength()}),this.deviceFingerprint=yield this.platformService.getDeviceFingerprint(),console.log("Device Fingerprint Information:",this.deviceFingerprint),this.deviceInfo=this.platformService.getDeviceInfo(),console.log("Device Information:",this.deviceInfo)})}ngAfterViewInit(){setTimeout(()=>{if(this.isBrowser){let t=document.getElementById("masonry-grid");this.masonryInstance=new Masonry(t,{itemSelector:".masonry-box",percentPosition:!0})}},1500)}loadDeviceId(){return P(this,null,function*(){this.isBrowser&&(this.deviceId=yield this.platformService.getDeviceId(),console.log("Device ID:",this.deviceId))})}getAllPosts(){this.PS.getAllPosts(this.currentPage).subscribe(t=>{this.posts=t,this.generateImageUrls()})}generateImageUrls(){this.imageUrls=this.posts.map(()=>this.getRandomImage(1080,1920))}getTotalPostLength(){this.PS.getTotalPostLength().subscribe(t=>{this.totalLength=t.totalLength,this.calculateTotalPages()})}calculateTotalPages(){this.totalPages=Math.ceil(this.totalLength/12)}onPageChange(t){this.currentPage!==t&&(this.currentPage=t,this.updateUrlParams())}getPaginationControls(){return Array.from({length:this.totalPages},(t,i)=>i+1)}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}getRandomImage(t,i){return"https://dummyimage.com/"+(Math.floor(Math.random()*(i-t+1))+t)+"x"+(Math.floor(Math.random()*(i-t+1))+t)+"/F5F5F5/000"}onSvgLoad(){this.masonryInstance&&this.masonryInstance.layout()}navigateToEdit(t){let i={queryParams:{img:t}},n=this.router.createUrlTree(["/images/generate"],i),_=this.router.serializeUrl(n);window.open(_,"_blank")}static{this.\u0275fac=function(i){return new(i||e)(u(G),u(B),u(U),u(q),u(S),u($))}}static{this.\u0275cmp=C({type:e,selectors:[["app-image-list"]],decls:1,vars:1,consts:[["class","h-100 d-flex flex-column p-3",4,"ngIf"],[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100"],[1,"row","g-3"],[1,"col-12","pb-3"],["target","_blank","type","button",1,"btn","btn-success",3,"routerLink"],[1,"fa","fa-plus","me-2"],[4,"ngIf"],[1,"col-12","px-md-3","px-2"],["data-masonry","{'percentPosition': true }","id","masonry-grid",1,"row","g-md-3","g-2"],["class","col-lg-2 col-md-3 col-sm-4 col-6 masonry-box",4,"ngFor","ngForOf"],[1,"col-12"],[1,"btn-group","btn-group-toggle","py-3"],[1,"btn","btn-outline-dark",3,"click","disabled"],["class","btn",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6","masonry-box"],[1,"position-relative","border","p-1"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","d-block","m-1",3,"backgroundLoaded","postDataSet","loadOnly"],["role","group",1,"btn-group","w-100"],["class","btn btn-secondary btn-sm rounded-0 m-1","target","_blank",3,"click",4,"ngIf"],["target","_blank",1,"btn","btn-secondary","btn-sm","rounded-0","m-1",3,"routerLink"],[1,"fa","fa-eye","me-2"],[1,"position-absolute","top-0","start-50","translate-middle","badge","rounded-pill","bg-danger","d-none","d-md-block"],[1,"visually-hidden"],["target","_blank",1,"btn","btn-secondary","btn-sm","rounded-0","m-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"btn",3,"click","ngClass"]],template:function(i,n){i&1&&f(0,nt,12,5,"div",0),i&2&&a("ngIf",n.isBrowser)},dependencies:[D,E,j,N,H,R]})}}return e})();var ot=[{path:"",component:J,data:{title:"Image List",breadcrumb:"Image List",description:"Your Page Description"}}],K=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=x({type:e})}static{this.\u0275inj=h({imports:[y.forChild(ot),y]})}}return e})();var wt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=x({type:e})}static{this.\u0275inj=h({imports:[A,K,Y]})}}return e})();export{wt as ImageListModule};
