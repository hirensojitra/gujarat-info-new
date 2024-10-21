import{a as ce}from"./chunk-KZKL3566.js";import{b as ee}from"./chunk-BZ4WNHHA.js";import{a as pe,b as ge,c as he,k as ue}from"./chunk-TJWJNSQN.js";import"./chunk-IHKJZOZL.js";import{a as me}from"./chunk-2NOJHOGJ.js";import{b as te,c as T,e as ie,f as re,j as oe,k as ne,l as ae,q as le,r as se,s as de}from"./chunk-HEJRWA2U.js";import"./chunk-YBESYLK4.js";import{a as E}from"./chunk-QHXDM6TZ.js";import{Aa as q,B as U,Ba as _,C,G as u,H as f,I as j,J as A,L as D,Na as Z,Oa as J,P as k,Pa as W,R as s,S as h,Ta as K,V as R,Xa as S,Y as w,Z as B,Za as Q,_ as p,ba as L,ea as a,f as F,fa as n,ga as d,ha as H,ia as z,ja as x,ka as c,la as g,lb as X,ma as O,nb as Y,pb as $,sa as m,ta as y,ua as G,v as P,w as I,y as V}from"./chunk-I3U5Q2FA.js";var fe=(()=>{class r{constructor(e){this.http=e,this.apiUrl=E.MasterApi+"/img"}createFolder(e){let t={folderName:e};return this.http.post(`${this.apiUrl}/folders`,t)}getFolders(e=1,t=10,i="",o="created_at",l="asc"){let b=new S().set("page",e).set("limit",t).set("search",i).set("sortBy",o).set("order",l);return this.http.get(`${this.apiUrl}/folders`,{params:b})}uploadImage(e,t,i){let o=new FormData;return o.append("image",t),o.append("metadata",JSON.stringify(i)),this.http.post(`${this.apiUrl}/folders/${e}/images`,o)}getImagesInFolder(e,t=1,i=10,o="",l="created_at",b="asc"){let M=new S().set("page",t).set("limit",i).set("search",o).set("sortBy",l).set("order",b);return this.http.get(`${this.apiUrl}/folders/${e}/images`,{params:M})}deleteImage(e,t){return this.http.delete(`${this.apiUrl}/folders/${e}/images/${t}`)}getImage(e,t,i,o){let l={};return t&&(l.quality=t.toString()),i&&(l.format=i),o&&(l.thumb="true"),this.http.get(`${this.apiUrl}/uploads/${e}`,{params:l,responseType:"blob"})}renameFolder(e,t){let i={folderName:t};return this.http.put(`${this.apiUrl}/folders/${e}/rename`,i)}deleteFolder(e){return this.http.delete(`${this.apiUrl}/folders/${e}`)}refreshImage(e,t,i){return this.http.post(`${this.apiUrl}/folders/${e}/images/${t}/refresh`,i)}getTotalFolderCount(e=""){let t=new S().set("search",e);return this.http.get(`${this.apiUrl}/folders/count`,{params:t})}getTotalImageCount(e){return this.http.get(`${this.apiUrl}/folders/${e}/images/count`)}static{this.\u0275fac=function(t){return new(t||r)(V(Q))}}static{this.\u0275prov=P({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var Ce=()=>[30,50,100],we=r=>({"bg-dark text-white":r}),xe=r=>({"bg-opacity-25":r}),ye=r=>({"active pe-none text-white":r}),Se=r=>({"text-white":r});function Ee(r,v){if(r&1){let e=x();a(0,"li",28)(1,"div",29)(2,"div",30)(3,"div",31)(4,"div",32),j(),a(5,"svg",33),d(6,"rect",34)(7,"path",35)(8,"path",36)(9,"path",37),n()(),A(),a(10,"div")(11,"p",38)(12,"a",39),c("click",function(){let i=u(e).$implicit;return g().fetchImages(i.id),f(!1)}),m(13),n()(),a(14,"span",40),m(15),n()(),a(16,"div",41)(17,"div",42)(18,"a",43),d(19,"i",44),n(),a(20,"ul",45)(21,"li")(22,"a",46),c("click",function(){let i=u(e).$implicit;return g().openFolderDeleteModal(i.id,i.name),f(!1)}),d(23,"i",47),m(24,"Delete"),n()(),a(25,"li")(26,"a",46),c("click",function(){let i=u(e).$implicit;return g().openRenameFolderModal(i.id),f(!1)}),d(27,"i",48),m(28,"Rename"),n()(),a(29,"li")(30,"a",46),c("click",function(){return u(e),f(!1)}),d(31,"i",49),m(32,"Hide Folder "),n()()()()()(),a(33,"div")(34,"div",50),d(35,"div",51),n()()()()()}if(r&2){let e=v.$implicit,t=g();s(),p("ngClass",_(10,we,t.selectedFolderId==e.id)),s(3),p("ngClass",_(12,xe,t.selectedFolderId==e.id)),s(8),p("ngClass",_(14,ye,t.selectedFolderId==e.id)),s(),y(e.name),s(2),G("",t.imageCounts[e.id]," Files"),s(4),p("ngClass",_(16,Se,t.selectedFolderId==e.id)),s(16),L("width: "+t.imageCounts[e.id]+"%"),B("aria-valuenow",t.imageCounts[e.id])("aria-label","Image Folder capacity: "+t.imageCounts[e.id]+"%")}}function Me(r,v){if(r&1){let e=x();a(0,"li",61)(1,"div",62)(2,"div",63),d(3,"img",64),n(),a(4,"div",65)(5,"div",66)(6,"button",67),c("click",function(){let i=u(e).$implicit,o=g(2);return f(o.refreshImage(i.id,o.selectedFolderId))}),d(7,"i",68),n()(),a(8,"div",66)(9,"a",69),c("click",function(i){let o=u(e).$implicit,l=g(2);return f(l.copyHrefToClipboard(i,l.getImagePath(o)))}),m(10),d(11,"i",70),n()(),a(12,"div",66)(13,"button",71),c("click",function(){let i=u(e).$implicit,o=g(2);return f(o.deleteImage(o.selectedFolderId,i.id))}),d(14,"i",72),n()()()()()}if(r&2){let e=v.$implicit,t=g(2);s(3),p("src",t.apiUrl+"/img"+t.getImagePath(e)+"?quality=30",k),s(6),O("href",t.getImagePath(e),k),s(),y(e.url)}}function ke(r,v){if(r&1){let e=x();H(0),a(1,"div",52)(2,"div",53)(3,"h6",54),m(4),n(),a(5,"div",55)(6,"label",56),d(7,"i",57),m(8,"Upload Image"),n(),a(9,"input",58),c("change",function(i){u(e);let o=g();return f(o.onFileSelected(i))}),n()()(),a(10,"div",30)(11,"ul",59),w(12,Me,15,3,"li",60),n()()(),z()}if(r&2){let e=g();s(4),y(e.selectedFolderName),s(8),p("ngForOf",e.images)}}var be=(()=>{class r{onFolderPageChange(e){return F(this,null,function*(){this.folderPage!==e&&(this.folderPage=e,this.fetchFolders())})}onFolderPageSizeChange(e){return F(this,null,function*(){this.folderLimit!==e&&(this.folderLimit=e,this.folderPage=1,this.fetchFolders())})}constructor(e,t,i,o,l,b,M,_e,ve){this.imageService=e,this.formBuilder=t,this.toast=i,this.elementRef=o,this.renderer=l,this.router=b,this.route=M,this.userImageService=_e,this.userService=ve,this.folders=[],this.images=[],this.selectedFile=null,this.selectedFolderId=null,this.selectedFolderName="",this.apiUrl=E.MasterApi,this.confirmationMessage="",this.confirmationTitle="",this.imagePage=1,this.imageLimit=10,this.totalImagePages=1,this.folderPage=1,this.folderItems=0,this.folderLimit=30,this.searchFolder="",this.imageCounts={},this.initializeForms()}ngOnInit(){return F(this,null,function*(){yield this.userService.getUser().subscribe(e=>F(this,null,function*(){this.userId!==e.id&&(this.userId=e.id,yield this.loadFolderCount(),yield this.fetchFolders())})),this.route.queryParams.subscribe(e=>{let t=e.folder;t&&this.fetchImages(t)})})}ngAfterViewInit(){return F(this,null,function*(){yield this.loadFolderCount(),yield this.fetchFolders()})}initializeForms(){this.addFolderForm=this.formBuilder.group({folderName:["",T.required]}),this.renameFolderForm=this.formBuilder.group({folderName:["",T.required]})}fetchFolders(){let e=this.searchFolder.trim(),t=this.sortFolderBy||"created_at",i=this.sortFolderOrder||"asc";this.folderLimit&&this.imageService.getFolders(this.folderPage,this.folderLimit,e,t,i).subscribe({next:o=>{this.folders=o.folders,this.folders.forEach(l=>{this.loadImageCount(l.id)})},error:()=>{this.toast.show("Error fetching folders!",{class:"bg-danger"})}})}onFileSelected(e){let t=e.target;t.files&&t.files[0]&&(this.selectedFile=t.files[0],this.selectedFolderId&&this.uploadImage(this.selectedFolderId))}uploadImage(e){if(this.selectedFile&&e){let t={description:"Sample Image"};this.imageService.uploadImage(e,this.selectedFile,t).subscribe({next:()=>{this.fetchImages(e),this.loadFolderCount()},error:()=>this.toast.show("Error uploading image!",{class:"bg-danger"})})}}fetchImages(e,t=1,i=10){this.imageService.getImagesInFolder(e,t,i).subscribe({next:o=>{this.images=o.images,this.selectedFolderId=e,this.selectedFolderName=this.folders.find(l=>l.id===e)?.name||"",this.router.navigate([],{relativeTo:this.route,queryParams:{folder:e},queryParamsHandling:"merge"})},error:()=>{this.toast.show("Error fetching images!",{class:"bg-danger"})}})}deleteImage(e,t){this.userImageService.deleteImage(this.userId,e,t).subscribe({next:()=>{this.fetchImages(e)},error:()=>this.toast.show("Error deleting image!",{class:"bg-danger"})})}openAddFolderModal(){new bootstrap.Modal(document.getElementById("addFolderModal")).show()}openRenameFolderModal(e){let t=this.folders.find(i=>i.id===e);t&&(this.selectedFolderId=e,this.renameFolderForm.patchValue({folderName:t.name}),this.fetchImages(e),new bootstrap.Modal(document.getElementById("renameFolderModal")).show())}addFolder(){if(this.addFolderForm.valid){let e=this.addFolderForm.value.folderName;this.imageService.createFolder(e).subscribe({next:()=>{this.fetchFolders(),this.addFolderForm.reset(),bootstrap.Modal.getInstance(document.getElementById("addFolderModal")).hide(),this.toast.show("Folder created successfully!",{class:"bg-success"}),this.loadFolderCount()},error:()=>{this.toast.show("Error creating folder!",{class:"bg-danger"})}})}}renameFolder(){if(this.renameFolderForm.valid){let e=this.renameFolderForm.value.folderName;this.imageService.renameFolder(this.selectedFolderId,e).subscribe({next:()=>{this.fetchFolders(),this.toast.show("Folder renamed successfully!",{class:"bg-success"}),bootstrap.Modal.getInstance(document.getElementById("renameFolderModal")).hide()},error:()=>{this.toast.show("Error renaming folder!",{class:"bg-danger"})}})}}deleteFolder(){this.selectedFolderId!==null&&this.imageService.deleteFolder(this.selectedFolderId).subscribe({next:()=>{this.toast.show("Folder deleted successfully!",{class:"bg-success"}),this.selectedFolderId=null,this.fetchFolders()},error:()=>{this.toast.show("Error deleting folder!",{class:"bg-danger"}),this.selectedFolderId=null}})}copyHrefToClipboard(e,t){e.preventDefault();let i=this.renderer.createElement("textarea");i.value=`${this.apiUrl}/img${t}`,this.renderer.appendChild(this.elementRef.nativeElement,i),i.select(),document.execCommand("copy"),this.renderer.removeChild(this.elementRef.nativeElement,i),this.toast.show("Image File path copied to clipboard",{title:"Copy Successed",class:"bg-success"})}refreshImage(e,t){let i=document.createElement("input");i.type="file",i.accept="image/*",i.onchange=o=>{let l=o.target;if(l.files&&l.files.length>0){let b=new FormData;b.append("image",l.files[0]),this.imageService.refreshImage(t,e,b).subscribe({next:()=>{this.fetchImages(this.selectedFolderId),this.toast.show("Image replaced successfully!",{class:"bg-success"})},error:()=>{this.toast.show("Error replacing image!",{class:"bg-danger"})}})}},i.click()}openFolderDeleteModal(e,t){this.selectedFolderId=e,this.selectedFolderName=t,this.confirmationTitle="Confirm Folder Deletion",this.confirmationMessage=`Are you sure you want to delete the folder "${t}"? This action cannot be undone.`,new bootstrap.Modal(document.getElementById("confirmationModal")).show()}getImagePath(e){let t=e.image_url.split("/");return t.pop(),`${t.join("/")}/${e.id}`}loadFolderCount(e=""){this.imageService.getTotalFolderCount(e).subscribe({next:t=>{t&&typeof t.count=="number"?this.folderItems=t.count:console.warn("Unexpected response structure:",t)},error:t=>{console.error("Error fetching folder count:",t)},complete:()=>{}})}loadImageCount(e){return F(this,null,function*(){try{let t=yield this.userImageService.getTotalImageCount(e).toPromise();this.imageCounts[e]=t.totalCount}catch(t){console.error("Error fetching image count",t),this.imageCounts[e]=0}})}static{this.\u0275fac=function(t){return new(t||r)(h(fe),h(le),h(me),h(D),h(R),h(Y),h(X),h(ce),h(ee))}}static{this.\u0275cmp=U({type:r,selectors:[["app-img"]],decls:47,vars:11,consts:[[1,"container"],[1,"btn","btn-success","btn-sm","my-2",3,"click"],[1,"fa","fa-plus","me-2"],[1,"row","g-2","list-unstyled"],["class","col-lg-3 col-md-4 col-sm-6 col-6",4,"ngFor","ngForOf"],["pagination","",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[4,"ngIf"],["id","addFolderModal","tabindex","-1","aria-labelledby","addFolderModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","addFolderModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[3,"formGroup"],[1,"mb-3"],["for","folderName",1,"form-label"],["type","text","formControlName","folderName","id","folderName",1,"form-control"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-primary",3,"click"],["id","renameFolderModal","tabindex","-1","aria-labelledby","renameFolderModalLabel","aria-hidden","true",1,"modal","fade"],["id","renameFolderModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal",1,"btn","btn-sm","btn-outline-danger"],[1,"fa","fa-close","me-2"],["type","button",1,"btn","btn-sm","btn-success","text-white",3,"click"],[1,"fa","fa-save","me-2"],[3,"confirm","title","message"],[1,"col-lg-3","col-md-4","col-sm-6","col-6"],[1,"card","border","shadow-none",3,"ngClass"],[1,"card-body"],[1,"mb-0","folder-svg-container","d-flex","flex-wrap","align-items-center"],[1,"me-3","bg-lighter","avatar","avatar-lg","border","h-40-px","w-40-px","p-1","rounded",3,"ngClass"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 256 256"],["width","256","height","256","fill","none"],["d","M69.77,112H208V88a8,8,0,0,0-8-8H130.67a8,8,0,0,1-4.8-1.6L98.13,57.6a8,8,0,0,0-4.8-1.6H40a8,8,0,0,0-8,8V208l30.18-90.53A8,8,0,0,1,69.77,112Z","opacity","0.2"],["d","M32,208V64a8,8,0,0,1,8-8H93.33a8,8,0,0,1,4.8,1.6l27.74,20.8a8,8,0,0,0,4.8,1.6H200a8,8,0,0,1,8,8v24","fill","none","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","16"],["d","M32,208l30.18-90.53A8,8,0,0,1,69.77,112H232a8,8,0,0,1,7.59,10.53L211.09,208Z","fill","none","stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","16"],[1,"fs-14","fw-medium","mb-1","lh-1"],["href","#",1,"link","fw-bold","text-decoration-none",3,"click","ngClass"],[1,"fs-12"],[1,"float-end","ms-auto"],[1,"dropdown"],["href","#","data-bs-toggle","dropdown","aria-expanded","false","aria-label","More Option",1,"btn","btn-flat","btn-sm"],[1,"fa","fa-ellipsis-v",3,"ngClass"],[1,"dropdown-menu","dropdown-menu-end","bg-dark","dropdown-menu-dark"],["href","#",1,"dropdown-item",3,"click"],[1,"w-20-px","text-center","fa","fa-trash","me-2","text-danger"],[1,"w-20-px","text-center","fa","fa-pencil","me-2","text-primary"],[1,"w-20-px","text-center","fa","fa-eye-slash","me-2","text-mute"],[1,"progress","progress-xs","mt-3"],["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"progress-bar","bg-primary","progress-bar-striped"],[1,"card","shadow"],[1,"card-header","d-flex","align-items-center"],[1,"fw-bold","m-0"],[1,"ms-auto"],["for","uploadImage",1,"btn","btn-success","ms-2","btn-sm"],[1,"fa","fa-image","me-2"],["type","file","id","uploadImage",1,"d-none",3,"change"],[1,"row","g-2","list-unstyled","align-items-stretch"],["class","col-lg-2 col-md-3 col-sm-4 col-6 d-flex flex-column",4,"ngFor","ngForOf"],[1,"col-lg-2","col-md-3","col-sm-4","col-6","d-flex","flex-column"],[1,"d-flex","mt-auto","flex-column","p-2","border","rounded","shadow-sm","w-100"],[1,"img-container","flex-grow-1","d-flex","align-items-end","mb-2"],["alt","Image",1,"img-fluid","rounded","mx-auto",3,"src"],[1,"row","g-2"],[1,"col-4"],["aria-label","Replace",1,"btn","btn-sm","btn-outline-success","w-100",3,"click"],[1,"fa","fa-refresh"],["aria-label","Copy",1,"btn","btn-sm","btn-outline-dark","w-100",3,"click","href"],[1,"fa","fa-copy"],["aria-label","Delete",1,"btn","btn-sm","btn-outline-danger","w-100",3,"click"],[1,"fa","fa-trash"]],template:function(t,i){t&1&&(a(0,"div",0)(1,"button",1),c("click",function(){return i.openAddFolderModal()}),d(2,"i",2),m(3,"Add Folder "),n(),a(4,"ul",3),w(5,Ee,36,18,"li",4),n(),a(6,"div",5),c("currentPageChange",function(l){return i.onFolderPageChange(l)})("pageSizeChange",function(l){return i.onFolderPageSizeChange(l)}),n(),w(7,ke,13,2,"ng-container",6),n(),a(8,"div",7)(9,"div",8)(10,"div",9)(11,"div",10)(12,"h5",11),m(13,"Add Folder"),n(),d(14,"button",12),n(),a(15,"div",13)(16,"form",14)(17,"div",15)(18,"label",16),m(19,"Folder Name"),n(),d(20,"input",17),n()()(),a(21,"div",18)(22,"button",19),m(23,"Close"),n(),a(24,"button",20),c("click",function(){return i.addFolder()}),m(25,"Add Folder"),n()()()()(),a(26,"div",21)(27,"div",8)(28,"div",9)(29,"div",10)(30,"h5",22),m(31,"Rename Folder"),n(),d(32,"button",12),n(),a(33,"div",13)(34,"form",14)(35,"div",15)(36,"label",16),m(37,"Folder Name"),n(),d(38,"input",17),n()()(),a(39,"div",18)(40,"button",23),d(41,"i",24),m(42,"Cancel"),n(),a(43,"button",25),c("click",function(){return i.renameFolder()}),d(44,"i",26),m(45,"Save"),n()()()()(),a(46,"app-confirmation-modal",27),c("confirm",function(){return i.deleteFolder()}),n()),t&2&&(s(5),p("ngForOf",i.folders),s(),p("currentPage",i.folderPage)("totalItems",i.folderItems)("pageSize",i.folderLimit)("pageSizes",q(10,Ce)),s(),p("ngIf",i.selectedFolderId),s(9),p("formGroup",i.addFolderForm),s(18),p("formGroup",i.renameFolderForm),s(12),p("title",i.confirmationTitle)("message",i.confirmationMessage))},dependencies:[Z,J,W,oe,te,ie,re,ne,ae,pe,ge,he]})}}return r})();var $e=[{path:"",component:be,data:{title:"Images | Gujarat Uvach",description:"Welcome to the Gujarat Uvach dashboard. Access a variety of services and features designed to enhance your experience.",keywords:"Gujarat Uvach, services, dashboard, user portal, features, access",robots:"index, follow"}}],Fe=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=C({type:r})}static{this.\u0275inj=I({imports:[$.forChild($e),$]})}}return r})();var it=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=C({type:r})}static{this.\u0275inj=I({imports:[K,Fe,se,de,ue]})}}return r})();export{it as ImgModule};
