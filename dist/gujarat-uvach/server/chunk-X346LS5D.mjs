import './polyfills.server.mjs';
import{a as G}from"./chunk-RIQUXMK6.mjs";import{b as L,r as A}from"./chunk-JPPSYH5R.mjs";import{x as $}from"./chunk-X6RFGL5P.mjs";import"./chunk-CGEXYLQB.mjs";import{a as K}from"./chunk-ZOQGZUTB.mjs";import{Aa as o,Ba as n,Ca as g,D as b,E as v,Fa as y,G as x,Ga as u,Gb as O,Ha as I,Ia as M,K as j,L as _,Na as T,Nb as P,Oa as d,Ob as B,Pa as F,Pb as S,Q as m,R as c,W as z,Xa as N,ea as w,ha as r,ia as f,jc as k,la as U,sa as C,ua as s,wa as V,yb as R,zb as H}from"./chunk-YAE7DDPL.mjs";import"./chunk-VVCT4QZE.mjs";var J=(()=>{class a{constructor(e){this.http=e,this.apiUrl="https://api.imgbb.com/1/upload",this.apiKey="7271ebac17911e06d3b28f77e14f1c23"}uploadImage(e){let t=new FormData;return t.append("key",this.apiKey),t.append("image",e),this.http.post(this.apiUrl,t)}getUploadedImages(){let e="https://api.imgbb.com/1/images?key="+this.apiKey;return this.http.get(e)}static{this.\u0275fac=function(t){return new(t||a)(x(S))}}static{this.\u0275prov=b({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})();var q=(()=>{class a{constructor(e){this.http=e,this.baseUrl=K.MasterApi+"/images"}uploadImage(e){return this.http.post(this.baseUrl,e)}getImages(e,t){let i=new B().set("page",e.toString()).set("limit",t.toString()),l={headers:new P({"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}),params:i};return this.http.get(this.baseUrl,l)}deleteImages(e){let t={headers:new P({"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"}),body:{ids:e}};return this.http.delete(`${this.baseUrl}`,t)}static{this.\u0275fac=function(t){return new(t||a)(x(S))}}static{this.\u0275prov=b({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})();var ee=()=>[10,20,30,50,100];function te(a,E){if(a&1){let e=y();o(0,"button",24),u("click",function(){m(e);let i=I();return c(i.onDeleteImages())}),g(1,"i",25),n()}}function ie(a,E){if(a&1){let e=y();o(0,"div",26)(1,"div",27)(2,"div",28)(3,"input",29),u("change",function(){let i=m(e).$implicit,l=I();return c(l.onImageSelectionChange(i))}),n(),o(4,"label",30)(5,"div",31),g(6,"img",32),n(),o(7,"div",33)(8,"span",34),d(9),n(),o(10,"small",35)(11,"b"),d(12),n()()()(),o(13,"a",36),u("click",function(i){let l=m(e).$implicit,p=I();return c(p.copyHrefToClipboard(i,l.url))}),g(14,"i",37),d(15," Copy"),n()()()()}if(a&2){let e=E.$implicit,t=I();r(),V("border-primary",e.selected)("bg-primary",e.selected),r(2),s("value",e.selected)("id",e.id),r(),s("for",e.id)("title",e.filename),r(2),s("src","https://dummyimage.com/400x600/C5C5C5/c5c5c5.jpg",w),r(3),F(e.filename),r(3),F(t.formatSize(e.size)),r(),M("href",e.url,w)}}function ae(a,E){if(a&1&&(o(0,"div",38),g(1,"img",39),n()),a&2){let e=I();r(),s("src",e.imageUrl,w)}}var Q=(()=>{class a{constructor(e,t,i,l,p){this.imageDataService=e,this.imageService=t,this.elementRef=i,this.renderer=l,this.toastService=p,this.cacheBuster=Math.random().toString(36).substring(7),this.selected=!1,this.selectedImage=null,this.images=[],this.currentPage=1,this.pageSize=5,this.totalPages=0,this.totalItems=0,this.imageUrl=null,this.imageName=null}onFileSelected(e){let t=e.target.files[0];t&&["image/svg+xml","image/jpeg","image/png"].includes(t.type)?(this.selectedImage=t,this.previewImage(t)):(this.selectedImage=null,this.imageUrl=null,alert("Only SVG, JPG, and PNG files are allowed."))}previewImage(e){let t=new FileReader;t.readAsDataURL(e),t.onload=()=>{this.imageUrl=t.result,this.imageName=e.name,this.uploadFile.show()}}onUpload(){this.selectedImage&&this.imageDataService.uploadImage(this.selectedImage).subscribe(e=>{console.log("Image uploaded successfully:",e),e.success&&(this.uploadImage(e),this.uploadFile.hide())},e=>{console.error("Error uploading image:",e)})}loadImages(e,t){this.imageService.getImages(e,t).subscribe(i=>{this.images=i.data,this.totalPages=i.pagination.totalPages,this.totalItems=i.pagination.totalItems},i=>{console.error("Error fetching images:",i)})}uploadImage(e){this.imageService.uploadImage(e).subscribe(t=>{console.log("Image data uploaded successfully:",t)},t=>{console.error("Error uploading image data:",t)})}deleteImages(e){this.imageService.deleteImages(e).subscribe(t=>{console.log("Images deleted successfully:",t),this.loadImages(this.currentPage,this.pageSize)},t=>{console.error("Error deleting images:",t)})}onDeleteImages(){let e=this.images.filter(t=>t.selected).map(t=>t.id);e.length>0&&this.deleteImages(e)}onImageSelectionChange(e){e.selected===void 0?e.selected=!0:e.selected=!e.selected,this.selected=!!this.images.filter(t=>t.selected).length}onCurrentPageChange(e){this.currentPage=e,this.loadImages(this.currentPage,this.pageSize)}onPageSizeChange(e){this.pageSize=e}copyHrefToClipboard(e,t){e.preventDefault();let i=this.renderer.createElement("textarea");i.value=t,this.renderer.appendChild(this.elementRef.nativeElement,i),i.select(),document.execCommand("copy"),this.renderer.removeChild(this.elementRef.nativeElement,i),this.toastService.show("Image File path copied to clipboard",{title:"Copy Successed",class:"bg-success"})}formatSize(e){let t=e/1024,i=e/(1024*1024);return i>=1?i.toFixed(2)+" MB":t.toFixed(2)+" KB"}ngOnInit(){this.loadImages(this.currentPage,this.pageSize),this.uploadFile=new bootstrap.Modal(document.getElementById("uploadFile"),{focus:!1,keyboard:!1,static:!1}),this.uploadFile._element.addEventListener("hidde.bs.modal",()=>{this.imageUrl=null,this.imageName=null,this.selectedImage=null}),this.uploadFile._element.addEventListener("show.bs.modal",()=>{})}static{this.\u0275fac=function(t){return new(t||a)(f(J),f(q),f(z),f(U),f(G))}}static{this.\u0275cmp=j({type:a,selectors:[["app-image-upload"]],decls:30,vars:9,consts:[["fileInput",""],[1,"container-fluid","p-0","h-100","d-flex","flex-column"],[1,"d-flex","align-items-center","w-100","p-3","shadow","border-bottom"],["type","file","accept",".svg, .jpg, .jpeg, .png",2,"display","none",3,"change"],[1,"btn","btn-success",3,"click"],[1,"fa","fa-plus","me-2"],["class","btn btn-danger ms-auto","type","button",3,"click",4,"ngIf"],[1,"d-flex","align-items-center","w-100","flex-grow-1","flex-column","position-relative"],[1,"w-100","h-100","posistion-absolute","overflow-y-auto","p-3"],[1,"row","g-3"],["class","col-lg-2 col-md-3 col-sm-4 col-6",4,"ngFor","ngForOf"],["pagination","",1,"d-flex","align-items-center","justify-content-center","mt-3","sticky-bottom","flex-md-row","flex-column","bg-white","p-3","shadow",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","uploadFile","tabindex","-1","aria-labelledby","uploadFileLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable"],[1,"modal-content"],[1,"modal-header","bg-success","text-white"],["id","uploadFileLabel",1,"modal-title"],[1,"modal-body","d-flex","flex-column"],["class","d-flex align-items-center mx-auto w-auto",4,"ngIf"],[1,"modal-footer","d-flex"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","btn-danger","ms-auto"],[1,"fa","fa-close","me-2"],[1,"btn","btn-success","ms-2",3,"click","disabled"],[1,"fa","fa-upload","me-2"],["type","button",1,"btn","btn-danger","ms-auto",3,"click"],[1,"fa","fa-trash"],[1,"col-lg-2","col-md-3","col-sm-4","col-6"],[1,"border","rounded-2","p-2","h-100"],[1,"h-100","w-100","d-flex","flex-column"],["type","checkbox",1,"d-none",3,"change","value","id"],[1,"flex-grow-1","bg-light","d-flex","flex-column",3,"for","title"],[1,"flex-grow-1","bg-light"],["alt","Image",1,"img-fluid","m-auto","d-block",3,"src"],[1,"d-flex","w-100","justify-content-between","align-items-center","py-1","px-2","bg-dark","text-white"],[1,"text-truncate","text-nowrap"],[1,"ps-3","text-end","text-nowrap"],[1,"btn","btn-outline-dark","mt-2",3,"click","href"],[1,"fa","fa-copy"],[1,"d-flex","align-items-center","mx-auto","w-auto"],["alt","Selected Image Preview",1,"max-w-200-px","max-h-300-px",3,"src"]],template:function(t,i){if(t&1){let l=y();o(0,"div",1)(1,"div",2)(2,"input",3,0),u("change",function(h){return m(l),c(i.onFileSelected(h))}),n(),o(4,"button",4),u("click",function(){m(l);let h=T(3);return c(h.click())}),g(5,"i",5),d(6,"Add Image"),n(),C(7,te,2,0,"button",6),n(),o(8,"div",7)(9,"div",8)(10,"div",9),C(11,ie,16,12,"div",10),n()()(),o(12,"div",11),u("currentPageChange",function(h){return m(l),c(i.onCurrentPageChange(h))})("pageSizeChange",function(h){return m(l),c(i.onPageSizeChange(h))}),n()(),o(13,"div",12)(14,"div",13)(15,"div",14)(16,"div",15)(17,"h5",16),d(18,"Upload Image File"),n()(),o(19,"div",17)(20,"h5"),d(21,"Hiren Sojitra"),n(),C(22,ae,2,1,"div",18),n(),o(23,"div",19)(24,"button",20),g(25,"i",21),d(26,"Close"),n(),o(27,"button",22),u("click",function(){return m(l),c(i.onUpload())}),g(28,"i",23),d(29,"Upload Image"),n()()()()()}t&2&&(r(7),s("ngIf",i.selected),r(4),s("ngForOf",i.images),r(),s("currentPage",1)("totalItems",i.totalItems)("pageSize",i.pageSize)("pageSizes",N(8,ee)),r(10),s("ngIf",i.selectedImage),r(5),s("disabled",!i.selectedImage))},dependencies:[R,H,L]})}}return a})();var ne=[{path:"",component:Q,data:{title:"Uploaded Images",breadcrumb:"Deleted Images"}}],W=(()=>{class a{static{this.\u0275fac=function(t){return new(t||a)}}static{this.\u0275mod=_({type:a})}static{this.\u0275inj=v({imports:[k.forChild(ne),k]})}}return a})();var xe=(()=>{class a{static{this.\u0275fac=function(t){return new(t||a)}}static{this.\u0275mod=_({type:a})}static{this.\u0275inj=v({imports:[O,W,$,A]})}}return a})();export{xe as ImageDataModule};
