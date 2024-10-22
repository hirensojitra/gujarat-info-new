import './polyfills.server.mjs';
import{a as Y}from"./chunk-KHDBWRB6.mjs";import{d as G,p as z}from"./chunk-QZQW7QAL.mjs";import"./chunk-XWJV47QV.mjs";import"./chunk-KYP5X2ME.mjs";import"./chunk-OZOCKEKY.mjs";import"./chunk-BHXUZULZ.mjs";import{A as v,Aa as P,Ba as m,Bb as $,C as _,Ca as l,G as V,H as b,Ja as s,La as y,M as g,N as d,O as j,P as E,Ua as A,Wb as q,Xb as H,_b as U,ac as C,ca as r,da as f,dc as w,fc as L,i as I,j as S,na as x,o as T,pa as c,sb as D,tb as N,ub as O,va as o,wa as a,xa as h,ya as F,z as M,za as R}from"./chunk-DQOPYUJW.mjs";import"./chunk-VVCT4QZE.mjs";var B=(()=>{class e{constructor(t,i,n,p){this.meta=t,this.router=i,this.route=n,this.titleService=p}setMetadata(){this.router.events.pipe(T(t=>t instanceof U),I(()=>this.route),I(t=>{for(;t.firstChild;)t=t.firstChild;return t}),S(t=>t.data)).subscribe(t=>{this.meta.updateTag({name:"description",content:t.description}),this.meta.updateTag({property:"og:title",content:t.title}),this.titleService.setTitle(t.title)})}static{this.\u0275fac=function(i){return new(i||e)(_(q),_(w),_(C),_(H))}}static{this.\u0275prov=M({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var X=(e,u)=>({"btn-outline-dark":e,"btn-outline-primary active":u});function Z(e,u){if(e&1){let t=P();o(0,"div",14)(1,"div",15),j(),h(2,"svg",16),E(),o(3,"div",17)(4,"div",18)(5,"a",19),m("click",function(){let n=g(t).$implicit;return l(2).window.open("/images/generate?img="+n.id,"_blank"),d(!1)}),h(6,"i",20),s(7,"Edit"),a(),o(8,"a",21),m("click",function(){let n=g(t).$implicit;return l(2).window.open("/poster/"+n.id),d(!1)}),h(9,"i",22),s(10,"View"),a()()(),o(11,"span",23),s(12),o(13,"span",24),s(14,"unread messages"),a()()()()}if(e&2){let t=u.$implicit;r(2),c("postDataSet",t)("loadOnly",!0),r(10),y(" ",t.download_counter," ")}}function tt(e,u){if(e&1){let t=P();o(0,"button",25),m("click",function(){let n=g(t).$implicit,p=l(2);return d(p.onPageChange(n))}),s(1),a()}if(e&2){let t=u.$implicit,i=l(2);c("ngClass",A(2,X,t!==i.currentPage,t===i.currentPage)),r(),y(" ",t," ")}}function et(e,u){if(e&1){let t=P();F(0),x(1,Z,15,3,"div",9),o(2,"div",10)(3,"div",11)(4,"button",12),m("click",function(){g(t);let n=l();return d(n.onPageChange(1))}),s(5,"First"),a(),o(6,"button",12),m("click",function(){g(t);let n=l();return d(n.onPageChange(n.currentPage-1))}),s(7,"Previous"),a(),x(8,tt,2,5,"button",13),o(9,"button",12),m("click",function(){g(t);let n=l();return d(n.onPageChange(n.currentPage+1))}),s(10,"Next"),a(),o(11,"button",12),m("click",function(){g(t);let n=l();return d(n.onPageChange(n.totalPages))}),s(12,"Last"),a()()(),R()}if(e&2){let t=l();r(),c("ngForOf",t.posts),r(3),c("disabled",t.currentPage===1),r(2),c("disabled",t.currentPage===1),r(2),c("ngForOf",t.getPaginationControls()),r(),c("disabled",t.currentPage===t.totalPages),r(2),c("disabled",t.currentPage===t.totalPages)}}var J=(()=>{class e{constructor(t,i,n,p){this.PS=t,this.metadataService=i,this.route=n,this.router=p,this.posts=[],this.currentPage=1,this.totalPages=0,this.totalLength=0,this.metadataService.setMetadata()}ngOnInit(){this.window=window,this.route.queryParams.subscribe(t=>{this.currentPage=+t.page||1,this.getAllPosts(),this.getTotalPostLength()})}ngAfterViewInit(){}getAllPosts(){this.PS.getAllPosts(this.currentPage).subscribe(t=>{this.posts=t,console.log(this.posts)})}getTotalPostLength(){this.PS.getTotalPostLength().subscribe(t=>{this.totalLength=t.totalLength,this.calculateTotalPages()})}calculateTotalPages(){this.totalPages=Math.ceil(this.totalLength/12)}onPageChange(t){this.currentPage!==t&&(this.currentPage=t,this.updateUrlParams())}getPaginationControls(){return Array.from({length:this.totalPages},(t,i)=>i+1)}updateUrlParams(){this.router.navigate([],{relativeTo:this.route,queryParams:{page:this.currentPage},queryParamsHandling:"merge"})}static{this.\u0275fac=function(i){return new(i||e)(f(Y),f(B),f(C),f(w))}}static{this.\u0275cmp=V({type:e,selectors:[["app-image-list"]],decls:10,vars:1,consts:[[1,"h-100","d-flex","flex-column","p-3"],[1,"flex-grow-1","position-relative","overflow-hidden"],[1,"position-absolute","h-100","w-100","d-flex","overflow-auto","flex-column"],[1,"container","h-100","w-100"],[1,"row","g-3"],[1,"col-12","pb-3"],[1,"btn","btn-success",3,"click"],[1,"fa","fa-plus","me-2"],[4,"ngIf"],["class","col-lg-2 col-md-3 col-sm-4 col-6",4,"ngFor","ngForOf"],[1,"col-12"],[1,"btn-group","btn-group-toggle","py-3"],[1,"btn","btn-outline-dark",3,"click","disabled"],["class","btn",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6"],[1,"position-relative"],["preserveAspectRatio","xMidYMid meet","svgDraw","",1,"svg-content","max-w-100-p","max-h-100-p","img-fluid","m-auto","d-block",3,"postDataSet","loadOnly"],[1,"d-flex","flex-column","position-absolute","start-0","top-0","h-100","w-100","p-3"],[1,"d-flex","mb-auto"],["href","#",1,"btn","btn-secondary","btn-sm","me-auto",3,"click"],[1,"fa","fa-edit"],["href","#",1,"btn","btn-secondary","btn-sm","ms-auto",3,"click"],[1,"fa","fa-eye"],[1,"position-absolute","top-0","start-100","translate-middle","badge","rounded-pill","bg-danger"],[1,"visually-hidden"],[1,"btn",3,"click","ngClass"]],template:function(i,n){i&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"button",6),m("click",function(){return n.window.open("/images/generate","_blank"),!1}),h(7,"i",7),s(8,"Image"),a()(),x(9,et,13,6,"ng-container",8),a()()()()()),i&2&&(r(9),c("ngIf",n.posts.length))},dependencies:[D,N,O,G]})}}return e})();var it=[{path:"",component:J,data:{title:"Image List",breadcrumb:"Image List",description:"Your Page Description"}}],K=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=b({type:e})}static{this.\u0275inj=v({imports:[L.forChild(it),L]})}}return e})();var vt=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=b({type:e})}static{this.\u0275inj=v({imports:[$,K,z]})}}return e})();export{vt as ImageListModule};
