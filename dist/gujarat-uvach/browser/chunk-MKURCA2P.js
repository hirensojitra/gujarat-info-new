import{a as G}from"./chunk-GHA5QARD.js";import{a as Y}from"./chunk-EJW3GRWU.js";import"./chunk-B3LIIEQN.js";import{d as z,q as B}from"./chunk-RP67A22B.js";import"./chunk-RYFY6OON.js";import"./chunk-A2ITBMAQ.js";import"./chunk-3VPX4MHT.js";import"./chunk-QHXDM6TZ.js";import{Aa as x,Ba as m,Ca as a,Db as q,Eb as H,F as M,G as b,Hb as U,I as f,Ja as l,Jb as P,L as V,La as y,Lb as w,M as C,Nb as L,R as g,S as d,T as j,U as E,Ua as R,ca as r,da as _,gb as D,hb as N,ib as O,na as h,o as I,p as k,pa as s,pb as $,u as T,va as o,wa as c,xa as v,ya as F,za as A}from"./chunk-R3Y3IJJQ.js";var J=(()=>{class e{constructor(t,i,n,p){this.meta=t,this.router=i,this.route=n,this.titleService=p}setMetadata(){this.router.events.pipe(T(t=>t instanceof U),I(()=>this.route),I(t=>{for(;t.firstChild;)t=t.firstChild;return t}),k(t=>t.data)).subscribe(t=>{this.meta.updateTag({name:"description",content:t.description}),this.meta.updateTag({property:"og:title",content:t.title}),this.titleService.setTitle(t.title)})}static{this.\u0275fac=function(i){return new(i||e)(f(q),f(w),f(P),f(H))}}static{this.\u0275prov=M({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var tt=(e,u)=>({"btn-outline-dark":e,"btn-outline-primary active":u});function et(e,u){if(e&1){let t=x();o(0,"a",24),m("click",function(){g(t);let n=a().$implicit;return a(2).window.open("/images/generate?img="+n.id,"_blank"),d(!1)}),v(1,"i",25),l(2,"Edit"),c()}}function it(e,u){if(e&1){let t=x();o(0,"div",14)(1,"div",15),j(),v(2,"svg",16),E(),o(3,"div",17)(4,"div",18),h(5,et,3,0,"a",19),o(6,"a",20),m("click",function(){let n=g(t).$implicit;return a(2).window.open("/poster/"+n.id),d(!1)}),v(7,"i",21),l(8,"View"),c()()(),o(9,"span",22),l(10),o(11,"span",23),l(12,"unread messages"),c()()()()}if(e&2){let t=u.$implicit,i=a(2);r(2),s("postDataSet",t)("loadOnly",!0),r(3),s("ngIf",i.isAdmin()),r(5),y(" ",t.download_counter," ")}}function nt(e,u){if(e&1){let t=x();o(0,"button",26),m("click",function(){let n=g(t).$implicit,p=a(2);return d(p.onPageChange(n))}),l(1),c()}if(e&2){let t=u.$implicit,i=a(2);s("ngClass",R(2,tt,t!==i.currentPage,t===i.currentPage)),r(),y(" ",t," ")}}function ot(e,u){if(e&1){let t=x();F(0),h(1,it,13,4,"div",9),o(2,"div",10)(3,"div",11)(4,"button",12),m("click",function(){g(t);let n=a();return d(n.onPageChange(1))}),l(5,"First"),c(),o(6,"button",12),m("click",function(){g(t);let n=a();return d(n.onPageChange(n.currentPage-1))}),l(7,"Previous"),c(),h(8,nt,2,5,"button",13),o(9,"button",12),m("click",function(){g(t);let n=a();return d(n.onPageChange(n.currentPage+1))}),l(10,"Next"),c(),o(11,"button",12),m("click",function(){g(t);let n=a();return d(n.onPageChange(n.totalPages))}),l(12,"Last"),c()()(),A()}if(e&2){let t=a();r(),s("ngForOf",t.posts),r(3),s("disabled",t.currentPage===1),r(2),s("disabled",t.currentPage===1),r(2),s("ngForOf",t.getPaginationControls()),r(),s("disabled",t.currentPage===t.totalPages),r(2),s("disabled",t.currentPage===t.totalPages)}}var K=(()=>{class e{constructor(t,i,n,p,W){this.PS=t,this.metadataService=i,this.route=n,this.router=p,this.authService=W,this.posts=[],this.currentPage=1,this.totalPages=0,this.totalLength=0,this.metadataService.setMetadata()}ngOnInit(){this.window=window,this.route.queryParams.subscribe(t=>{this.currentPage=+t.page||1,this.getAllPosts(),this.getTotalPostLength()})}ngAfterViewInit(){}getAllPosts(){this.PS.getAllPosts(this.currentPage).subscribe(t=>{this.posts=t,console.log(this.posts)})}getTotalPostLength(){this.PS.getTotalPostLength().subscribe(t=>{this.totalLength=t.totalLength,this.calculateTotalPages()})}calculateTotalPages(){this.totalPages=Math.ceil(this.totalLength/12)}onPageChange(t){this.currentPage!==t&&(this.currentPage=t,this.updateUrlParams())}getPaginationControls(){return Array.from({length:this.totalPages},(t,i)=>i+1)}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage},queryParamsHandling:"merge"})}isAdmin(){return this.authService.hasRole(["admin","master"])}static{this.\u0275fac=function(i){return new(i||e)(_(G),_(J),_(P),_(w),_(Y))}}static{this.\u0275cmp=V({type:e,selectors:[["app-image-list"]],decls:10,vars:1,consts:[[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100"],[1,"row","g-3"],[1,"col-12","pb-3"],[1,"btn","btn-success",3,"click"],[1,"fa","fa-plus","me-2"],[4,"ngIf"],["class","col-lg-2 col-md-3 col-sm-4 col-6",4,"ngFor","ngForOf"],[1,"col-12"],[1,"btn-group","btn-group-toggle","py-3"],[1,"btn","btn-outline-dark",3,"click","disabled"],["class","btn",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6"],[1,"position-relative"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","m-auto","d-block",3,"postDataSet","loadOnly"],[1,"d-flex","flex-column","position-absolute","start-0","top-0","h-100","w-100","p-3"],[1,"d-flex","mb-auto"],["class","btn btn-secondary btn-sm me-auto","href","#",3,"click",4,"ngIf"],["href","#",1,"btn","btn-secondary","btn-sm","ms-auto",3,"click"],[1,"fa","fa-eye"],[1,"position-absolute","top-0","start-100","translate-middle","badge","rounded-pill","bg-danger"],[1,"visually-hidden"],["href","#",1,"btn","btn-secondary","btn-sm","me-auto",3,"click"],[1,"fa","fa-edit"],[1,"btn",3,"click","ngClass"]],template:function(i,n){i&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"button",6),m("click",function(){return n.window.open("/images/generate","_blank"),!1}),v(7,"i",7),l(8,"Image"),c()(),h(9,ot,13,6,"ng-container",8),c()()()()()),i&2&&(r(9),s("ngIf",n.posts.length))},dependencies:[D,N,O,z]})}}return e})();var rt=[{path:"",component:K,data:{title:"Image List",breadcrumb:"Image List",description:"Your Page Description"}}],Q=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=C({type:e})}static{this.\u0275inj=b({imports:[L.forChild(rt),L]})}}return e})();var Pt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=C({type:e})}static{this.\u0275inj=b({imports:[$,Q,B]})}}return e})();export{Pt as ImageListModule};