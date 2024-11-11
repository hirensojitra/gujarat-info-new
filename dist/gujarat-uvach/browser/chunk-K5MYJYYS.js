import{a as fe}from"./chunk-RB775GVS.js";import{a as ue}from"./chunk-L7P4BJVK.js";import{a as te,g as ce,m as ge,p as pe,q as he}from"./chunk-NND4OT42.js";import{c as ie,d as $,f as re,g as oe,k as ne,o as ae,r as se,w as le,x as de,y as me}from"./chunk-RYFY6OON.js";import{b as ee}from"./chunk-A2ITBMAQ.js";import"./chunk-3VPX4MHT.js";import{a as E}from"./chunk-QHXDM6TZ.js";import{$ as P,Aa as x,Ba as g,Ca as p,Da as G,F as N,G as I,I as U,Ja as m,Jb as Q,Ka as y,L as j,La as q,Lb as Y,M as C,Nb as T,R as h,S as u,Sa as k,T as z,Ta as F,U as L,X as A,ca as l,da as _,f as b,ga as D,gb as X,hb as Z,ib as J,na as w,oa as R,pa as c,pb as W,sa as B,tb as S,va as a,vb as K,wa as n,xa as d,ya as H,za as O}from"./chunk-R3Y3IJJQ.js";var _e=(()=>{class o{constructor(e){this.http=e,this.apiUrl=E.MasterApi+"/img"}createFolder(e){let t={folderName:e};return this.http.post(`${this.apiUrl}/folders`,t)}getFolders(e=1,t=10,i="",r="created_at",s="asc"){let f=new S().set("page",e).set("limit",t).set("search",i).set("sortBy",r).set("order",s);return this.http.get(`${this.apiUrl}/folders`,{params:f})}uploadImage(e,t,i){let r=new FormData;return r.append("image",t),r.append("metadata",JSON.stringify(i)),this.http.post(`${this.apiUrl}/folders/${e}/images`,r)}getImagesInFolder(e,t=1,i=10,r="",s="created_at",f="asc"){let M=new S().set("page",t).set("limit",i).set("search",r).set("sortBy",s).set("order",f);return this.http.get(`${this.apiUrl}/folders/${e}/images`,{params:M})}deleteImage(e,t){return this.http.delete(`${this.apiUrl}/folders/${e}/images/${t}`)}getImage(e,t,i,r){let s={};return t&&(s.quality=t.toString()),i&&(s.format=i),r&&(s.thumb="true"),this.http.get(`${this.apiUrl}/uploads/${e}`,{params:s,responseType:"blob"})}renameFolder(e,t){let i={folderName:t};return this.http.put(`${this.apiUrl}/folders/${e}/rename`,i)}deleteFolder(e){return this.http.delete(`${this.apiUrl}/folders/${e}`)}refreshImage(e,t,i){return this.http.post(`${this.apiUrl}/folders/${e}/images/${t}/refresh`,i)}getTotalFolderCount(e=""){let t=new S().set("search",e);return this.http.get(`${this.apiUrl}/folders/count`,{params:t})}getTotalImageCount(e){return this.http.get(`${this.apiUrl}/folders/${e}/images/count`)}static{this.\u0275fac=function(t){return new(t||o)(U(K))}}static{this.\u0275prov=N({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var be=()=>[8,16,32],xe=o=>({"bg-dark text-white":o}),ye=o=>({"bg-opacity-25":o}),Se=o=>({"active pe-none text-white":o}),Ee=o=>({"text-white":o});function Me(o,v){if(o&1){let e=x();a(0,"li",32)(1,"div",33)(2,"div",34)(3,"div",35)(4,"div",36),z(),a(5,"svg",37),d(6,"rect",38)(7,"path",39)(8,"path",40)(9,"path",41),n()(),L(),a(10,"div")(11,"p",42)(12,"a",43),g("click",function(){let i=h(e).$implicit,r=p();return r.selectedFolderId=i.id,r.fetchImages(),u(!1)}),m(13),n()(),a(14,"span",44),m(15),n()(),a(16,"div",45)(17,"div",46)(18,"a",47),d(19,"i",48),n(),a(20,"ul",49)(21,"li")(22,"a",50),g("click",function(){let i=h(e).$implicit;return p().openFolderDeleteModal(i.id,i.name),u(!1)}),d(23,"i",51),m(24,"Delete"),n()(),a(25,"li")(26,"a",50),g("click",function(){let i=h(e).$implicit;return p().openRenameFolderModal(i.id),u(!1)}),d(27,"i",52),m(28,"Rename"),n()(),a(29,"li")(30,"a",50),g("click",function(){return h(e),u(!1)}),d(31,"i",53),m(32,"Hide Folder "),n()()()()()(),a(33,"div")(34,"div",54),d(35,"div",55),n()()()()()}if(o&2){let e=v.$implicit,t=p();l(),c("ngClass",F(12,xe,t.selectedFolderId==e.id)),l(3),c("wPX",40)("hPX",40)("ngClass",F(14,ye,t.selectedFolderId==e.id)),l(8),c("ngClass",F(16,Se,t.selectedFolderId==e.id)),l(),y(e.name),l(2),q("",t.imageCounts[e.id]," Files"),l(4),c("ngClass",F(18,Ee,t.selectedFolderId==e.id)),l(16),B("width: "+t.imageCounts[e.id]+"%"),R("aria-valuenow",t.imageCounts[e.id])("aria-label","Image Folder capacity: "+t.imageCounts[e.id]+"%")}}function Pe(o,v){if(o&1){let e=x();a(0,"li",68)(1,"div",69)(2,"div",70),d(3,"img",71),n(),a(4,"div",72)(5,"div",73)(6,"button",74),g("click",function(){let i=h(e).$implicit,r=p(2);return u(r.refreshImage(i.id,r.selectedFolderId))}),d(7,"i",75),n()(),a(8,"div",73)(9,"a",76),g("click",function(i){let r=h(e).$implicit,s=p(2);return u(s.copyHrefToClipboard(i,s.getImagePath(r)))}),m(10),d(11,"i",77),n()(),a(12,"div",73)(13,"button",78),g("click",function(){let i=h(e).$implicit,r=p(2);return u(r.deleteImage(r.selectedFolderId,i.id))}),d(14,"i",79),n()()()()()}if(o&2){let e=v.$implicit,t=p(2);l(3),c("src",t.apiUrl+"/img"+t.getImagePath(e)+"?quality=30",P),l(6),G("href",t.getImagePath(e),P),l(),y(e.url)}}function ke(o,v){if(o&1){let e=x();H(0),a(1,"div",56)(2,"div",57)(3,"h6",58),m(4),n(),a(5,"div",59)(6,"label",60),d(7,"i",61),m(8,"Upload Image"),n(),a(9,"input",62),g("change",function(i){h(e);let r=p();return u(r.onFileSelected(i))}),n()()(),a(10,"div",63)(11,"div",64)(12,"ul",65),w(13,Pe,15,3,"li",66),n()()(),a(14,"div",67)(15,"div",9),g("currentPageChange",function(i){h(e);let r=p();return u(r.onImagePageChange(i))})("pageSizeChange",function(i){h(e);let r=p();return u(r.onImagePageSizeChange(i))}),n()()(),O()}if(o&2){let e=p();l(),c("minHPX",400),l(3),y(e.selectedFolderName),l(9),c("ngForOf",e.images),l(2),c("currentPage",e.imagePage)("totalItems",e.imageCounts[e.selectedFolderId])("pageSize",e.imageLimit)("pageSizes",k(7,be))}}var Fe=(()=>{class o{onFolderPageChange(e){return b(this,null,function*(){this.folderPage!==e&&(this.folderPage=e,this.fetchFolders())})}onFolderPageSizeChange(e){return b(this,null,function*(){this.folderLimit!==e&&(this.folderLimit=e,this.folderPage=1,this.fetchFolders())})}constructor(e,t,i,r,s,f,M,Ie,Ce){this.imageService=e,this.formBuilder=t,this.toast=i,this.elementRef=r,this.renderer=s,this.router=f,this.route=M,this.userImageService=Ie,this.userService=Ce,this.folders=[],this.images=[],this.selectedFile=null,this.selectedFolderId=null,this.selectedFolderName="",this.apiUrl=E.MasterApi,this.confirmationMessage="",this.confirmationTitle="",this.imagePage=1,this.imageLimit=32,this.totalImagePages=1,this.folderPage=1,this.folderItems=0,this.folderLimit=8,this.searchFolder="",this.imageCounts={},this.initializeForms()}ngOnInit(){return b(this,null,function*(){yield this.userService.getUser().subscribe(e=>b(this,null,function*(){this.userId!==e.id&&(this.userId=e.id,yield this.loadFolderCount(),yield this.fetchFolders())})),this.route.queryParams.subscribe(e=>{let t=e.folder;this.selectedFolderId=t,t&&this.fetchImages()})})}ngAfterViewInit(){return b(this,null,function*(){yield this.loadFolderCount(),yield this.fetchFolders()})}initializeForms(){this.addFolderForm=this.formBuilder.group({folderName:["",$.required]}),this.renameFolderForm=this.formBuilder.group({folderName:["",$.required]})}fetchFolders(){let e=this.searchFolder.trim(),t=this.sortFolderBy||"created_at",i=this.sortFolderOrder||"asc";this.folderLimit&&this.imageService.getFolders(this.folderPage,this.folderLimit,e,t,i).subscribe({next:r=>{this.folders=r.folders,this.folders.forEach(s=>{this.loadImageCount(s.id)})},error:()=>{this.toast.show("Error fetching folders!",{class:"bg-danger"})}})}onFileSelected(e){let t=e.target;t.files&&t.files[0]&&(this.selectedFile=t.files[0],this.selectedFolderId&&this.uploadImage(this.selectedFolderId))}uploadImage(e){if(this.selectedFile&&e){let t={description:"Sample Image"};this.imageService.uploadImage(e,this.selectedFile,t).subscribe({next:()=>{this.fetchImages(),this.loadFolderCount()},error:()=>this.toast.show("Error uploading image!",{class:"bg-danger"})})}}fetchImages(){let e=this.searchImage?.trim()||"",t=this.sortImageBy||"created_at",i=this.sortImageOrder||"asc",r=this.selectedFolderId||"";r&&this.imageLimit&&this.imageService.getImagesInFolder(r,this.imagePage,this.imageLimit,e,t,i).subscribe({next:s=>{this.images=s.images||[],this.selectedFolderId=r,this.selectedFolderName=this.folders.find(f=>f.id===r)?.name||"All Images",this.loadImageCount(r),this.router.navigate([],{relativeTo:this.route,queryParams:{folder:r||null,page:this.imagePage,limit:this.imageLimit},queryParamsHandling:"merge",replaceUrl:!0})},error:()=>{this.toast.show("Error fetching images!",{class:"bg-danger"})}})}deleteImage(e,t){this.userImageService.deleteImage(this.userId,e,t).subscribe({next:()=>{this.fetchImages()},error:()=>this.toast.show("Error deleting image!",{class:"bg-danger"})})}openAddFolderModal(){new bootstrap.Modal(document.getElementById("addFolderModal")).show()}openRenameFolderModal(e){let t=this.folders.find(i=>i.id===e);t&&(this.selectedFolderId=e,this.renameFolderForm.patchValue({folderName:t.name}),this.fetchImages(),new bootstrap.Modal(document.getElementById("renameFolderModal")).show())}addFolder(){if(this.addFolderForm.valid){let e=this.addFolderForm.value.folderName;this.imageService.createFolder(e).subscribe({next:()=>{this.fetchFolders(),this.addFolderForm.reset(),bootstrap.Modal.getInstance(document.getElementById("addFolderModal")).hide(),this.toast.show("Folder created successfully!",{class:"bg-success"}),this.loadFolderCount()},error:()=>{this.toast.show("Error creating folder!",{class:"bg-danger"})}})}}renameFolder(){if(this.renameFolderForm.valid){let e=this.renameFolderForm.value.folderName;this.imageService.renameFolder(this.selectedFolderId,e).subscribe({next:()=>{this.fetchFolders(),this.toast.show("Folder renamed successfully!",{class:"bg-success"}),bootstrap.Modal.getInstance(document.getElementById("renameFolderModal")).hide()},error:()=>{this.toast.show("Error renaming folder!",{class:"bg-danger"})}})}}deleteFolder(){this.selectedFolderId!==null&&this.imageService.deleteFolder(this.selectedFolderId).subscribe({next:()=>{this.toast.show("Folder deleted successfully!",{class:"bg-success"}),this.selectedFolderId=null,this.fetchFolders()},error:()=>{this.toast.show("Error deleting folder!",{class:"bg-danger"}),this.selectedFolderId=null}})}copyHrefToClipboard(e,t){e.preventDefault();let i=this.renderer.createElement("textarea");i.value=`${this.apiUrl}/img${t}`,this.renderer.appendChild(this.elementRef.nativeElement,i),i.select(),document.execCommand("copy"),this.renderer.removeChild(this.elementRef.nativeElement,i),this.toast.show("Image File path copied to clipboard",{title:"Copy Successed",class:"bg-success"})}refreshImage(e,t){let i=document.createElement("input");i.type="file",i.accept="image/*",i.onchange=r=>{let s=r.target;if(s.files&&s.files.length>0){let f=new FormData;f.append("image",s.files[0]),this.imageService.refreshImage(t,e,f).subscribe({next:()=>{this.fetchImages(),this.toast.show("Image replaced successfully!",{class:"bg-success"})},error:()=>{this.toast.show("Error replacing image!",{class:"bg-danger"})}})}},i.click()}openFolderDeleteModal(e,t){this.selectedFolderId=e,this.selectedFolderName=t,this.confirmationTitle="Confirm Folder Deletion",this.confirmationMessage=`Are you sure you want to delete the folder "${t}"? This action cannot be undone.`,new bootstrap.Modal(document.getElementById("confirmationModal")).show()}getImagePath(e){let t=e.image_url.split("/");return t.pop(),`${t.join("/")}/${e.id}`}loadFolderCount(e=""){this.imageService.getTotalFolderCount(e).subscribe({next:t=>{t&&typeof t.count=="number"?this.folderItems=t.count:console.warn("Unexpected response structure:",t)},error:t=>{console.error("Error fetching folder count:",t)},complete:()=>{}})}loadImageCount(e){return b(this,null,function*(){try{let t=yield this.userImageService.getTotalImageCount(e).toPromise();this.imageCounts[e]=t.totalCount}catch(t){console.error("Error fetching image count",t),this.imageCounts[e]=0}})}onImagePageChange(e){return b(this,null,function*(){this.imagePage!==e&&(this.imagePage=e,this.fetchImages())})}onImagePageSizeChange(e){return b(this,null,function*(){this.imageLimit!==e&&(this.imageLimit=e,this.imagePage=1,this.fetchImages())})}static{this.\u0275fac=function(t){return new(t||o)(_(_e),_(le),_(ue),_(A),_(D),_(Y),_(Q),_(fe),_(ee))}}static{this.\u0275cmp=j({type:o,selectors:[["app-img"]],decls:51,vars:11,consts:[[1,"h-100","w-100","d-flex","flex-column"],[1,"container"],[1,"btn","btn-success","btn-sm","my-2",3,"click"],[1,"fa","fa-plus","me-2"],[1,"flex-grow-1","overflow-y-auto","position-relative"],[1,"position-absolute","h-100","w-100"],[1,"container","pb-3","min-h-100-p","d-flex","flex-column"],[1,"row","g-2","list-unstyled","mb-0"],["class","col-lg-3 col-md-4 col-sm-6 col-6",4,"ngFor","ngForOf"],["pagination","",1,"rounded-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[4,"ngIf"],["id","addFolderModal","tabindex","-1","aria-labelledby","addFolderModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","addFolderModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[3,"formGroup"],[1,"mb-3"],["for","folderName",1,"form-label"],["type","text","formControlName","folderName","id","folderName",1,"form-control"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-primary",3,"click"],["id","renameFolderModal","tabindex","-1","aria-labelledby","renameFolderModalLabel","aria-hidden","true",1,"modal","fade"],["id","renameFolderModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal",1,"btn","btn-sm","btn-outline-danger"],[1,"fa","fa-close","me-2"],["type","button",1,"btn","btn-sm","btn-success","text-white",3,"click"],[1,"fa","fa-save","me-2"],[3,"confirm","title","message"],[1,"col-lg-3","col-md-4","col-sm-6","col-6"],[1,"card","border","shadow-none",3,"ngClass"],[1,"card-body"],[1,"mb-0","folder-svg-container","d-flex","flex-wrap","align-items-center"],["remSize","",1,"me-3","bg-lighter","avatar","avatar-lg","border","p-1","rounded",3,"wPX","hPX","ngClass"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 256 256"],["width","256","height","256","fill","none"],["d","M69.77,112H208V88a8,8,0,0,0-8-8H130.67a8,8,0,0,1-4.8-1.6L98.13,57.6a8,8,0,0,0-4.8-1.6H40a8,8,0,0,0-8,8V208l30.18-90.53A8,8,0,0,1,69.77,112Z","opacity","0.2"],["d","M32,208V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6l27.74,20.8a8,8,0,0,0,4.8,1.6H200a8,8,0,0,1,8,8v24","fill","none","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","16"],["d","M32,208l30.18-90.53A8,8,0,0,1,69.77,112H232a8,8,0,0,1,7.59,10.53L211.09,208Z","fill","none","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","16"],[1,"fs-14","fw-medium","mb-1","lh-1"],["href","#",1,"link","fw-bold","text-decoration-none",3,"click","ngClass"],[1,"fs-12"],[1,"float-end","ms-auto"],[1,"dropdown"],["href","#","data-bs-toggle","dropdown","aria-expanded","false","aria-label","More Option",1,"btn","btn-flat","btn-sm"],[1,"fa","fa-ellipsis-v",3,"ngClass"],[1,"dropdown-menu","dropdown-menu-end","bg-dark","dropdown-menu-dark"],["href","#",1,"dropdown-item",3,"click"],[1,"w-20-px","text-center","fa","fa-trash","me-2","text-danger"],[1,"w-20-px","text-center","fa","fa-pencil","me-2","text-primary"],[1,"w-20-px","text-center","fa","fa-eye-slash","me-2","text-mute"],[1,"progress","progress-xs","mt-3"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-primary","progress-bar-striped"],["remSize","",1,"card","shadow","flex-grow-1",3,"minHPX"],[1,"card-header","d-flex","align-items-center"],[1,"fw-bold","m-0"],[1,"ms-auto"],["for","uploadImage",1,"btn","btn-success","ms-2","btn-sm"],[1,"fa","fa-image","me-2"],["type","file","id","uploadImage",1,"d-none",3,"change"],[1,"card-body","position-relative","p-0"],[1,"p-sm-3","p-1","position-absolute","h-100","w-100","overflow-y-auto"],[1,"row","g-1","g-sm-2","list-unstyled","align-items-stretch","m-0","justify-content-center"],["class","col-lg-3 col-md-4 col-sm-6 col-4",4,"ngFor","ngForOf"],[1,"card-footer","p-0"],[1,"col-lg-3","col-md-4","col-sm-6","col-4"],[1,"d-flex","h-100","flex-column","p-0"],[1,"img-container","flex-grow-1","d-flex","align-items-end"],["alt","Image",1,"img-fluid","rounded","mx-auto",3,"src"],[1,"row","g-0"],[1,"col-4"],["aria-label","Replace",1,"btn","btn-sm","btn-success","w-100","text-white","rounded-0",3,"click"],[1,"fa","fa-refresh"],["aria-label","Copy",1,"btn","btn-sm","btn-dark","w-100","text-white","rounded-0",3,"click","href"],[1,"fa","fa-copy"],["aria-label","Delete",1,"btn","btn-sm","btn-danger","w-100","text-white","rounded-0",3,"click"],[1,"fa","fa-trash"]],template:function(t,i){t&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),g("click",function(){return i.openAddFolderModal()}),d(3,"i",3),m(4,"Add Folder "),n()(),a(5,"div",4)(6,"div",5)(7,"div",6)(8,"ul",7),w(9,Me,36,20,"li",8),n(),a(10,"div",9),g("currentPageChange",function(s){return i.onFolderPageChange(s)})("pageSizeChange",function(s){return i.onFolderPageSizeChange(s)}),n(),w(11,ke,16,8,"ng-container",10),n()()()(),a(12,"div",11)(13,"div",12)(14,"div",13)(15,"div",14)(16,"h5",15),m(17,"Add Folder"),n(),d(18,"button",16),n(),a(19,"div",17)(20,"form",18)(21,"div",19)(22,"label",20),m(23,"Folder Name"),n(),d(24,"input",21),n()()(),a(25,"div",22)(26,"button",23),m(27,"Close"),n(),a(28,"button",24),g("click",function(){return i.addFolder()}),m(29,"Add Folder"),n()()()()(),a(30,"div",25)(31,"div",12)(32,"div",13)(33,"div",14)(34,"h5",26),m(35,"Rename Folder"),n(),d(36,"button",16),n(),a(37,"div",17)(38,"form",18)(39,"div",19)(40,"label",20),m(41,"Folder Name"),n(),d(42,"input",21),n()()(),a(43,"div",22)(44,"button",27),d(45,"i",28),m(46,"Cancel"),n(),a(47,"button",29),g("click",function(){return i.renameFolder()}),d(48,"i",30),m(49,"Save"),n()()()()(),a(50,"app-confirmation-modal",31),g("confirm",function(){return i.deleteFolder()}),n()),t&2&&(l(9),c("ngForOf",i.folders),l(),c("currentPage",i.folderPage)("totalItems",i.folderItems)("pageSize",i.folderLimit)("pageSizes",k(10,be)),l(),c("ngIf",i.selectedFolderId),l(9),c("formGroup",i.addFolderForm),l(18),c("formGroup",i.renameFolderForm),l(12),c("title",i.confirmationTitle)("message",i.confirmationMessage))},dependencies:[X,Z,J,ne,ie,re,oe,ae,se,ce,ge,pe,te]})}}return o})();var Te=[{path:"",component:Fe,data:{title:"Images | Gujarat Uvach",description:"Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",keywords:"Gujarat Uvach, services, dashboard, user portal, features, access",robots:"index, follow"}}],ve=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=C({type:o})}static{this.\u0275inj=I({imports:[T.forChild(Te),T]})}}return o})();var ot=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=C({type:o})}static{this.\u0275inj=I({imports:[W,ve,de,me,he]})}}return o})();export{ot as ImgModule};
