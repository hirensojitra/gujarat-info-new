import{a as ce}from"./chunk-YJ5LORJV.js";import{a as W}from"./chunk-23VRB4EQ.js";import{a as me}from"./chunk-KYNNVPTE.js";import{a as J,b as K,h as se,q as le,r as de}from"./chunk-SPEEPGXE.js";import{c as Q,d as y,f as Y,g as ee,k as te,o as ie,r as re,w as oe,x as ne,y as ae}from"./chunk-ZEHMLBHC.js";import"./chunk-UN2CGVO7.js";import"./chunk-IHGCADJY.js";import{a as Z}from"./chunk-77ITHIYP.js";import{Aa as u,Ba as j,E as v,Ha as d,Hb as G,Ia as A,J as P,Ja as D,Jb as X,K as C,Ka as B,Lb as M,P as h,Q as p,Qa as E,R as k,Ra as b,S as U,V as T,Z as S,aa as s,ba as _,ea as V,eb as $,fb as H,gb as O,la as w,ma as N,na as g,nb as q,qa as z,ta as a,ua as o,va as l,wa as L,xa as R,ya as x,za as m}from"./chunk-VTNAYE3H.js";import{f}from"./chunk-CWTPBX7D.js";var _e=()=>[5,10,15],Ie=n=>({"bg-dark text-white":n}),be=n=>({"bg-opacity-25":n}),Fe=n=>({"active pe-none text-white":n}),ve=n=>({"text-white":n}),Ce=()=>[8,16,32];function we(n,F){if(n&1){let e=x();a(0,"li",32)(1,"div",33)(2,"div",34)(3,"div",35)(4,"div",36),k(),a(5,"svg",37),l(6,"rect",38)(7,"path",39)(8,"path",40)(9,"path",41),o()(),U(),a(10,"div")(11,"p",42)(12,"a",43),m("click",function(){let i=h(e).$implicit,r=u();return r.selectedFolderId=i.id,r.fetchImages(),p(!1)}),d(13),o()(),a(14,"span",44),d(15),o()(),a(16,"div",45)(17,"div",46)(18,"a",47),l(19,"i",48),o(),a(20,"ul",49)(21,"li")(22,"a",50),m("click",function(){let i=h(e).$implicit;return u().openFolderDeleteModal(i.id,i.name),p(!1)}),l(23,"i",51),d(24,"Delete"),o()(),a(25,"li")(26,"a",50),m("click",function(){let i=h(e).$implicit;return u().openRenameFolderModal(i.id),p(!1)}),l(27,"i",52),d(28,"Rename"),o()(),a(29,"li")(30,"a",50),m("click",function(){return h(e),p(!1)}),l(31,"i",53),d(32,"Hide Folder"),o()()()()()(),a(33,"div")(34,"div",54),l(35,"div",55),o()()()()()}if(n&2){let e=F.$implicit,t=u();s(),g("ngClass",b(12,Ie,t.selectedFolderId==e.id)),s(3),g("wPX",40)("hPX",40)("ngClass",b(14,be,t.selectedFolderId==e.id)),s(8),g("ngClass",b(16,Fe,t.selectedFolderId==e.id)),s(),A(e.name),s(2),D("",t.imageCounts[e.id]," Files"),s(4),g("ngClass",b(18,ve,t.selectedFolderId==e.id)),s(16),z("width: "+t.imageCounts[e.id]+"%"),N("aria-valuenow",t.imageCounts[e.id])("aria-label","Image Folder capacity: "+t.imageCounts[e.id]+"%")}}function xe(n,F){if(n&1){let e=x();a(0,"li",69)(1,"div",70)(2,"div",71),l(3,"img",72),o(),a(4,"div",73)(5,"div",74)(6,"button",75),m("click",function(){let i=h(e).$implicit,r=u(2);return p(r.refreshImage(i.id,r.selectedFolderId))}),l(7,"i",76),o()(),a(8,"div",74)(9,"a",77),m("click",function(i){let r=h(e).$implicit,c=u(2);return p(c.copyHrefToClipboard(i,c.getImagePath(r)))}),l(10,"i",78),o()(),a(11,"div",74)(12,"button",79),m("click",function(){let i=h(e).$implicit,r=u(2);return p(r.deleteImage(r.selectedFolderId,i.id))}),l(13,"i",80),o()()()()()}if(n&2){let e=F.$implicit,t=u(2);s(3),g("src",t.apiUrl+"/user-img"+t.getImagePath(e)+"?quality=30",S),s(6),j("href",t.getImagePath(e),S)}}function ye(n,F){if(n&1){let e=x();L(0),a(1,"div",56)(2,"div",57)(3,"h6",58),d(4),o(),a(5,"div",59)(6,"label",60),l(7,"i",61),d(8,"Upload Image"),o(),a(9,"input",62),m("change",function(i){h(e);let r=u();return p(r.onFileSelected(i))}),o()()(),a(10,"div",63)(11,"div",64)(12,"ul",65),w(13,xe,14,2,"li",66),o()()(),a(14,"div",67)(15,"div",68),m("currentPageChange",function(i){h(e);let r=u();return p(r.onImagePageChange(i))})("pageSizeChange",function(i){h(e);let r=u();return p(r.onImagePageSizeChange(i))}),o()()(),R()}if(n&2){let e=u();s(4),B("",e.selectedFolderName,"(",e.imageCounts[e.selectedFolderId],")"),s(9),g("ngForOf",e.images),s(2),g("currentPage",e.imagePage)("totalItems",e.imageCounts[e.selectedFolderId])("pageSize",e.imageLimit)("pageSizes",E(7,Ce))}}var ue=(()=>{class n{onFolderPageChange(e){return f(this,null,function*(){this.folderPage!==e&&(this.folderPage=e,this.fetchFolders())})}onFolderPageSizeChange(e){return f(this,null,function*(){this.folderLimit!==e&&(this.folderLimit=e,this.folderPage=1,this.fetchFolders())})}onImagePageChange(e){return f(this,null,function*(){this.imagePage!==e&&(this.imagePage=e,this.fetchImages())})}onImagePageSizeChange(e){return f(this,null,function*(){this.imageLimit!==e&&(this.imageLimit=e,this.imagePage=1,this.fetchImages())})}constructor(e,t,i,r,c,I,pe,fe){this.userImageService=e,this.formBuilder=t,this.toast=i,this.elementRef=r,this.renderer=c,this.router=I,this.route=pe,this.userService=fe,this.userId="",this.folders=[],this.images=[],this.selectedFile=null,this.selectedFolderId=null,this.selectedFolderName="",this.apiUrl=Z.MasterApi,this.confirmationMessage="",this.confirmationTitle="",this.imagePage=1,this.imageItems=0,this.imageLimit=8,this.folderPage=1,this.folderItems=0,this.folderLimit=5,this.searchFolder="",this.imageCounts={},this.initializeForms()}ngOnInit(){return f(this,null,function*(){})}ngAfterViewInit(){return f(this,null,function*(){yield this.userService.getUser().subscribe(e=>f(this,null,function*(){this.userId!==e.id&&(this.userId=e.id,yield this.loadFolderCount(),yield this.fetchFolders())})),this.route.queryParams.subscribe(e=>{let t=e.folder,i=e.page?+e.page:1,r=e.limit?+e.limit:8;t&&(this.selectedFolderId=t),this.imagePage=i,this.imageLimit=r,this.fetchImages()})})}initializeForms(){this.addFolderForm=this.formBuilder.group({folderName:["",y.required]}),this.renameFolderForm=this.formBuilder.group({folderName:["",y.required],folderId:["",y.required]})}fetchFolders(){let e=this.searchFolder.trim(),t=this.sortFolderBy||"created_at",i=this.sortFolderOrder||"asc";this.folderLimit&&this.userImageService.getFolders(this.userId,this.folderPage,this.folderLimit,e,t,i).subscribe({next:r=>{this.folders=r.folders},error:()=>{this.toast.show("Error fetching folders!",{class:"bg-danger"})}})}onFileSelected(e){let t=e.target;t.files&&t.files[0]&&(this.selectedFile=t.files[0],this.selectedFolderId&&this.uploadImage(this.selectedFolderId))}uploadImage(e){if(this.selectedFile&&e){let t={description:"Sample Image"};this.userImageService.uploadImage(this.userId,e,this.selectedFile,t).subscribe({next:()=>{this.fetchImages(),this.loadFolderCount(),this.loadImageCount(e)},error:()=>this.toast.show("Error uploading image!",{class:"bg-danger"})})}}fetchImages(){let e=this.searchImage?.trim()||"",t=this.sortImageBy||"created_at",i=this.sortImageOrder||"asc",r=this.selectedFolderId||"";r&&this.imageLimit&&this.userImageService.getImagesInFolder(this.userId,r,this.imagePage,this.imageLimit,e,t,i).subscribe({next:c=>{this.images=c.images||[],this.selectedFolderId=r,this.selectedFolderName=this.folders.find(I=>I.id===r)?.name||"All Images",this.loadImageCount(r),this.router.navigate([],{relativeTo:this.route,queryParams:{folder:r||null,page:this.imagePage,limit:this.imageLimit},queryParamsHandling:"merge",replaceUrl:!0})},error:()=>{this.toast.show("Error fetching images!",{class:"bg-danger"})}})}deleteImage(e,t){this.userImageService.deleteImage(this.userId,e,t).subscribe({next:()=>{this.fetchImages()},error:()=>this.toast.show("Error deleting image!",{class:"bg-danger"})})}openAddFolderModal(){new bootstrap.Modal(document.getElementById("addFolderModal")).show()}openRenameFolderModal(e){let t=this.folders.find(i=>i.id===e);t&&(this.selectedFolderId=e,this.renameFolderForm.patchValue({folderName:t.name,folderId:t.id}),new bootstrap.Modal(document.getElementById("renameFolderModal")).show())}addFolder(){if(this.addFolderForm.valid){let e=this.addFolderForm.value.folderName;this.userImageService.createFolder(this.userId,e).subscribe({next:()=>{this.fetchFolders(),this.addFolderForm.reset(),bootstrap.Modal.getInstance(document.getElementById("addFolderModal")).hide(),this.toast.show("Folder created successfully!",{class:"bg-success"}),this.loadFolderCount()},error:()=>{this.toast.show("Error creating folder!",{class:"bg-danger"})}})}}renameFolder(){if(this.renameFolderForm.valid){let e=this.renameFolderForm.value.folderName,t=this.renameFolderForm.value.folderId;this.userImageService.renameFolder(t,e).subscribe({next:()=>{this.fetchFolders(),this.toast.show("Folder renamed successfully!",{class:"bg-success"}),bootstrap.Modal.getInstance(document.getElementById("renameFolderModal")).hide()},error:()=>{this.toast.show("Error renaming folder!",{class:"bg-danger"})}})}}deleteFolder(){this.selectedFolderId!==null&&this.userImageService.deleteFolder(this.selectedFolderId).subscribe({next:()=>{this.toast.show("Folder deleted successfully!",{class:"bg-success"}),this.selectedFolderId=null,this.fetchFolders()},error:()=>{this.toast.show("Error deleting folder!",{class:"bg-danger"}),this.selectedFolderId=null}})}copyHrefToClipboard(e,t){e.preventDefault();let i=this.renderer.createElement("textarea");i.value=`${this.apiUrl}/user-img${t}`,this.renderer.appendChild(this.elementRef.nativeElement,i),i.select(),document.execCommand("copy"),this.renderer.removeChild(this.elementRef.nativeElement,i),this.toast.show("Image File path copied to clipboard",{title:"Copy Success",class:"bg-success"})}refreshImage(e,t){let i=document.createElement("input");i.type="file",i.accept="image/*",i.onchange=r=>{let c=r.target;if(c.files&&c.files.length>0){let I=new FormData;I.append("image",c.files[0]),this.userImageService.refreshImage(this.userId,t,e,I).subscribe({next:()=>{this.fetchImages(),this.toast.show("Image replaced successfully!",{class:"bg-success"})},error:()=>{this.toast.show("Error replacing image!",{class:"bg-danger"})}})}},i.click()}openFolderDeleteModal(e,t){this.selectedFolderId=e,this.selectedFolderName=t,this.confirmationTitle="Confirm Folder Deletion",this.confirmationMessage=`Are you sure you want to delete the folder "${t}"? This action cannot be undone.`,new bootstrap.Modal(document.getElementById("confirmationModal")).show()}getImagePath(e){let t=e.image_url.split("/");return t.pop(),`${t.join("/")}/${e.id}`}loadFolderCount(e=""){this.userImageService.getTotalFolderCount(this.userId,e).subscribe({next:t=>{t&&typeof t.count=="number"?this.folderItems=t.count:console.warn("Unexpected response structure:",t)},error:t=>{console.error("Error fetching folder count:",t)},complete:()=>{}})}loadImageCount(e){return f(this,null,function*(){try{if(!this.imageCounts[e]){let t=yield this.userImageService.getTotalImageCount(e).toPromise();this.imageCounts[e]=t.totalCount}}catch(t){console.error("Error fetching image count",t),this.imageCounts[e]=0}})}static{this.\u0275fac=function(t){return new(t||n)(_(ce),_(oe),_(me),_(T),_(V),_(X),_(G),_(W))}}static{this.\u0275cmp=P({type:n,selectors:[["app-user-img"]],decls:51,vars:11,consts:[[1,"h-100","w-100","d-flex","flex-column"],[1,"container"],[1,"btn","btn-success","btn-sm","my-2",3,"click"],[1,"fa","fa-plus","me-2"],[1,"flex-grow-1","overflow-y-auto","position-relative"],[1,"position-absolute","h-100","w-100"],[1,"container","pb-3","min-h-100-p","d-flex","flex-column"],[1,"row","g-2","list-unstyled","mb-0"],["class","col-lg-3 col-md-4 col-sm-6 col-6",4,"ngFor","ngForOf"],["pagination","",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[4,"ngIf"],["id","addFolderModal","tabindex","-1","aria-labelledby","addFolderModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","addFolderModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[3,"formGroup"],[1,"mb-3"],["for","folderName",1,"form-label"],["type","text","formControlName","folderName","id","folderName",1,"form-control"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-primary",3,"click"],["id","renameFolderModal","tabindex","-1","aria-labelledby","renameFolderModalLabel","aria-hidden","true",1,"modal","fade"],["id","renameFolderModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal",1,"btn","btn-sm","btn-outline-danger"],[1,"fa","fa-close","me-2"],["type","button",1,"btn","btn-sm","btn-success","text-white",3,"click"],[1,"fa","fa-save","me-2"],[3,"confirm","title","message"],[1,"col-lg-3","col-md-4","col-sm-6","col-6"],[1,"card","border","shadow-none",3,"ngClass"],[1,"card-body"],[1,"mb-0","folder-svg-container","d-flex","flex-wrap","align-items-center"],["remSize","",1,"me-3","bg-lighter","avatar","avatar-lg","border","p-1","rounded",3,"wPX","hPX","ngClass"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 256 256"],["width","256","height","256","fill","none"],["d","M69.77,112H208V88a8,8,0,0,0-8-8H130.67a8,8,0,0,1-4.8-1.6L98.13,57.6a8,8,0,0,0-4.8-1.6H40a8,8,0,0,0-8,8V208l30.18-90.53A8,8,0,0,1,69.77,112Z","opacity","0.2"],["d","M32,208V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6l27.74,20.8a8,8,0,0,0,4.8,1.6H200a8,8,0,0,1,8,8v24","fill","none","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","16"],["d","M32,208l30.18-90.53A8,8,0,0,1,69.77,112H232a8,8,0,0,1,7.59,10.53L211.09,208Z","fill","none","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","16"],[1,"fs-14","fw-medium","mb-1","lh-1"],["href","#",1,"link","fw-bold","text-decoration-none",3,"click","ngClass"],[1,"fs-12"],[1,"float-end","ms-auto"],[1,"dropdown"],["href","#","data-bs-toggle","dropdown","aria-expanded","false","aria-label","More Option",1,"btn","btn-flat","btn-sm"],[1,"fa","fa-ellipsis-v",3,"ngClass"],[1,"dropdown-menu","dropdown-menu-end","bg-dark","dropdown-menu-dark"],["href","#",1,"dropdown-item",3,"click"],[1,"w-20-px","text-center","fa","fa-trash","me-2","text-danger"],[1,"w-20-px","text-center","fa","fa-pencil","me-2","text-primary"],[1,"w-20-px","text-center","fa","fa-eye-slash","me-2","text-mute"],[1,"progress","progress-xs","mt-3"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-primary","progress-bar-striped"],[1,"card","shadow","flex-grow-1"],[1,"card-header","d-flex","align-items-center"],[1,"fw-bold","m-0"],[1,"ms-auto"],["for","uploadImage",1,"btn","btn-success","ms-2","btn-sm"],[1,"fa","fa-image","me-2"],["type","file","id","uploadImage",1,"d-none",3,"change"],[1,"card-body","position-relative","p-0"],[1,"p-sm-3","p-1","position-absolute","h-100","w-100","overflow-y-auto"],[1,"row","g-1","g-sm-2","list-unstyled","align-items-stretch","m-0","justify-content-center"],["class","col-lg-3 col-md-4 col-sm-6 col-4",4,"ngFor","ngForOf"],[1,"card-footer","p-0"],["pagination","",1,"m-0",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"col-lg-3","col-md-4","col-sm-6","col-4"],[1,"d-flex","h-100","flex-column","p-0"],[1,"img-container","flex-grow-1","d-flex","align-items-end"],["alt","Image",1,"img-fluid","m-auto",3,"src"],[1,"row","g-0"],[1,"col-4"],["aria-label","Replace",1,"btn","btn-sm","btn-success","w-100","text-white","rounded-0",3,"click"],[1,"fa","fa-refresh"],["aria-label","Copy",1,"btn","btn-sm","btn-dark","w-100","text-white","rounded-0",3,"click","href"],[1,"fa","fa-copy"],["aria-label","Delete",1,"btn","btn-sm","btn-danger","w-100","text-white","rounded-0",3,"click"],[1,"fa","fa-trash"]],template:function(t,i){t&1&&(a(0,"div",0)(1,"div",1)(2,"button",2),m("click",function(){return i.openAddFolderModal()}),l(3,"i",3),d(4,"Add Folder "),o()(),a(5,"div",4)(6,"div",5)(7,"div",6)(8,"ul",7),w(9,we,36,20,"li",8),o(),a(10,"div",9),m("currentPageChange",function(c){return i.onFolderPageChange(c)})("pageSizeChange",function(c){return i.onFolderPageSizeChange(c)}),o(),w(11,ye,16,8,"ng-container",10),o()()()(),a(12,"div",11)(13,"div",12)(14,"div",13)(15,"div",14)(16,"h5",15),d(17,"Add Folder"),o(),l(18,"button",16),o(),a(19,"div",17)(20,"form",18)(21,"div",19)(22,"label",20),d(23,"Folder Name"),o(),l(24,"input",21),o()()(),a(25,"div",22)(26,"button",23),d(27,"Close"),o(),a(28,"button",24),m("click",function(){return i.addFolder()}),d(29,"Add Folder"),o()()()()(),a(30,"div",25)(31,"div",12)(32,"div",13)(33,"div",14)(34,"h5",26),d(35,"Rename Folder"),o(),l(36,"button",16),o(),a(37,"div",17)(38,"form",18)(39,"div",19)(40,"label",20),d(41,"Folder Name"),o(),l(42,"input",21),o()()(),a(43,"div",22)(44,"button",27),l(45,"i",28),d(46,"Cancel"),o(),a(47,"button",29),m("click",function(){return i.renameFolder()}),l(48,"i",30),d(49,"Save"),o()()()()(),a(50,"app-confirmation-modal",31),m("confirm",function(){return i.deleteFolder()}),o()),t&2&&(s(9),g("ngForOf",i.folders),s(),g("currentPage",i.folderPage)("totalItems",i.folderItems)("pageSize",i.folderLimit)("pageSizes",E(10,_e)),s(),g("ngIf",i.selectedFolderId),s(9),g("formGroup",i.addFolderForm),s(18),g("formGroup",i.renameFolderForm),s(12),g("title",i.confirmationTitle)("message",i.confirmationMessage))},dependencies:[$,H,O,se,K,le,J,te,Q,Y,ee,ie,re]})}}return n})();var Se=[{path:"",component:ue,data:{title:"Images | PostNew",description:"Welcome to the PostNew dashboard. Access a variety of services and features designed to enhance your experience.",keywords:"PostNew, services, dashboard, user portal, features, access",robots:"index, follow"}}],he=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=C({type:n})}static{this.\u0275inj=v({imports:[M.forChild(Se),M]})}}return n})();var Je=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=C({type:n})}static{this.\u0275inj=v({imports:[q,he,de,ne,ae]})}}return n})();export{Je as UserImgModule};
