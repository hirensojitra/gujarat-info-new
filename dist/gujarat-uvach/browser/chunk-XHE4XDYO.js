import{a as X}from"./chunk-HWTZJTMO.js";import{l as K,n as g}from"./chunk-AT2VF5OD.js";import{a as Y}from"./chunk-GBQP6ACW.js";import"./chunk-I4RV6RFQ.js";import{a as oe}from"./chunk-BOHDZTAQ.js";import{m as ae,r as ne}from"./chunk-Z47E2FOE.js";import{a as y}from"./chunk-WIB4C2YZ.js";import"./chunk-7URJ3TZA.js";import{c as Z,f as ee,j as te,y as ie,z as re}from"./chunk-BCINQI2X.js";import{c as J,w as P}from"./chunk-3SANXGOA.js";import{$a as S,$b as s,Aa as m,Ab as G,Ha as k,Ib as a,Jb as n,Kb as f,Nb as C,Pb as u,Rb as c,Zc as W,_b as U,_c as B,ac as x,bc as j,cd as H,dc as T,eb as l,ec as $,fa as R,fb as F,fc as D,ga as w,hd as Q,ic as q,jc as z,ka as M,lb as V,qa as A,ra as E,wb as v,xb as N,yb as p,z as _,za as d}from"./chunk-NIQGYGOG.js";import{f as L}from"./chunk-CWTPBX7D.js";var le=g`
  query GetFolders(
    $page: Int
    $limit: Int
    $search: String
    $sortBy: String
    $order: String
  ) {
    getFolders(
      page: $page
      limit: $limit
      search: $search
      sortBy: $sortBy
      order: $order
    ) {
      folders {
        id
        name
        created_at
      }
      total
    }
  }
`,se=g`
  query GetTotalFolderCount($search: String) {
    getTotalFolderCount(search: $search) {
      count
    }
  }
`,de=g`
  query GetImagesInFolder(
    $folderId: ID!
    $page: Int
    $limit: Int
    $search: String
    $sort: String
  ) {
    getImagesInFolder(
      folderId: $folderId
      page: $page
      limit: $limit
      search: $search
      sort: $sort
    ) {
      images {
        id
        image_url
        metadata
      }
      total
    }
  }
`,me=g`
  query GetTotalImageCountInFolder($folderId: String!, $search: String) {
    getTotalImageCountInFolder(folderId: $folderId, search: $search) {
      totalCount
    }
  }
`,ce=g`
  query GetInitialFolderData($folderLimit: Int!, $imageLimit: Int!) {
    getInitialFolderData(folderLimit: $folderLimit, imageLimit: $imageLimit) {
      folders {
        folders {
          id
          name
          created_at
        }
        total
      }
      folderImages {
        images {
          id
          folder_id
          image_url
          metadata
        }
        total
      }
    }
  }
`;var ge=g`
  mutation CreateFolder($name: String!) {
    createFolder(name: $name) {
      id
      name
      created_at
    }
  }
`,pe=g`
  mutation UploadImage($folderId: ID!, $image: Upload!, $metadata: String) {
    uploadImage(folderId: $folderId, image: $image, metadata: $metadata) {
      id
      folder_id
      image_url
      metadata
    }
  }
`,fe=g`
  mutation RefreshImage($folderId: ID!, $imageId: ID!, $image: Upload!) {
    refreshImage(folderId: $folderId, imageId: $imageId, image: $image)
  }
`,ue=g`
  mutation RenameFolder($folderId: ID!, $name: String!) {
    renameFolder(folderId: $folderId, name: $name)
  }
`,he=g`
  mutation DeleteFolder($folderId: ID!) {
    deleteFolder(folderId: $folderId)
  }
`,Ie=g`
  mutation DeleteImage($folderId: ID!, $imageId: ID!) {
    deleteImage(folderId: $folderId, imageId: $imageId)
  }
`;var _e=(()=>{class r{constructor(e,t){this.apollo=e,this.http=t}getInitialData(e,t){return this.apollo.watchQuery({query:ce,variables:{fetchPolicy:"no-cache",folderLimit:e,imageLimit:t},fetchPolicy:"network-only"}).valueChanges.pipe(_(i=>i.data.getInitialFolderData))}getFolders(e){return this.apollo.watchQuery({query:le,variables:e,fetchPolicy:"no-cache"}).valueChanges.pipe(_(t=>t.data.getFolders))}getTotalFolderCount(e=""){return this.apollo.watchQuery({query:se,variables:{search:e},fetchPolicy:"no-cache"}).valueChanges.pipe(_(t=>t.data.getTotalFolderCount.count))}createFolder(e){return this.apollo.mutate({mutation:ge,variables:{name:e},fetchPolicy:"no-cache"}).pipe(_(t=>t.data.createFolder))}renameFolder(e,t){return this.apollo.mutate({mutation:ue,variables:{folderId:e,name:t},fetchPolicy:"no-cache"}).pipe(_(i=>i.data.renameFolder))}deleteFolder(e){return this.apollo.mutate({mutation:he,variables:{folderId:e},fetchPolicy:"no-cache"}).pipe(_(t=>t.data.deleteFolder))}getImagesInFolder(e,t,i,o,h){return this.apollo.watchQuery({query:de,variables:{folderId:e,page:t,limit:i,search:o,sort:h},fetchPolicy:"no-cache"}).valueChanges.pipe(_(I=>I.data.getImagesInFolder))}getTotalImageCountInFolder(e,t=""){return this.apollo.watchQuery({query:me,variables:{folderId:e,search:t},fetchPolicy:"no-cache"}).valueChanges.pipe(_(i=>i.data.getTotalImageCountInFolder.totalCount))}uploadImage(e,t,i){return this.apollo.mutate({mutation:pe,variables:{folderId:e,image:t,metadata:i},fetchPolicy:"no-cache",context:{useMultipart:!0}})}deleteImage(e,t){return this.apollo.mutate({mutation:Ie,variables:{folderId:e,imageId:t},fetchPolicy:"no-cache"}).pipe(_(i=>i.data.deleteImage))}refreshImage(e,t,i){return this.apollo.mutate({mutation:fe,variables:{folderId:t,imageId:e,image:i},fetchPolicy:"no-cache"}).pipe(_(o=>o.data.refreshImage))}getImageUrl(e,t={}){let i=new URLSearchParams;return t.format&&i.append("format",t.format),t.quality&&i.append("quality",t.quality.toString()),t.thumb&&i.append("thumb","true"),`${y.MasterApi}/graphql/image/${e}?${i.toString()}`}static{this.\u0275fac=function(t){return new(t||r)(M(K),M(J))}}static{this.\u0275prov=R({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var Ce=r=>({"background-image":r,"background-size":"contain","background-position":"center","background-repeat":"no-repeat"}),xe=()=>[12,24,48];function ye(r,b){if(r&1){let e=C();a(0,"button",29),u("click",function(){d(e),c();let i=U(10);return m(i.click())}),f(1,"i",30),s(2,"Upload "),n()}}function we(r,b){if(r&1){let e=C();a(0,"div",31)(1,"input",32),D("ngModelChange",function(i){d(e);let o=c();return $(o.newFolderName,i)||(o.newFolderName=i),m(i)}),n(),a(2,"button",33),u("click",function(){d(e);let i=c();return m(i.createFolder())}),f(3,"i",34),n()()}if(r&2){let e=c();l(),T("ngModel",e.newFolderName),l(),p("disabled",!(e.newFolderName!=null&&e.newFolderName.trim()))}}function Ee(r,b){if(r&1){let e=C();a(0,"li",35),u("click",function(){let i=d(e).$implicit,o=c();return m(o.selectFolder(i))}),a(1,"span"),s(2),n(),a(3,"button",36),u("click",function(){let i=d(e).$implicit,o=c();return m(o.deleteFolder(i))}),f(4,"i",37),n()()}if(r&2){let e=b.$implicit,t=c();G("active",e.id===(t.selectedFolder==null?null:t.selectedFolder.id)),l(2),x(e.name)}}function Me(r,b){if(r&1){let e=C();a(0,"div",38)(1,"div",39),f(2,"div",40),a(3,"div",41)(4,"div",42)(5,"small",43),s(6),n(),a(7,"div",44)(8,"button",45),f(9,"i",46),n(),a(10,"ul",47)(11,"li")(12,"button",48),u("click",function(i){let o=d(e).$implicit,h=c();return m(h.copyHrefToClipboard(i,o))}),f(13,"i",49),s(14,"Copy URL"),n()(),a(15,"li")(16,"button",48),u("click",function(){let i=d(e).$implicit,o=c();return m(o.refreshImage(i))}),f(17,"i",50),s(18,"Refresh"),n()(),a(19,"li")(20,"button",51),u("click",function(){let i=d(e).$implicit,o=c();return m(o.openConfirmModal(i))}),f(21,"i",52),s(22,"Delete"),n()(),a(23,"li")(24,"a",53),f(25,"i",54),s(26,"Open"),n()(),a(27,"li")(28,"a",55),f(29,"i",56),s(30,"Download"),n()()()()()()()()}if(r&2){let e=b.$implicit,t=c();l(2),p("ngStyle",z(5,Ce,"url("+t.apiUrl+"/user-img/uploads/"+e.id+"?thumb=medium)")),N("aria-label",e.metadata||"Image"),l(4),x(e.image_url||"Unnamed"),l(18),p("href",t.apiUrl+"/user-img/uploads/"+e.id,S),l(4),p("href",t.apiUrl+"/user-img/uploads/"+e.id,S)}}function Se(r,b){if(r&1){let e=C();a(0,"div",57)(1,"div",58),u("currentPageChange",function(i){d(e);let o=c();return m(o.onImagePageChange(i))})("pageSizeChange",function(i){d(e);let o=c();return m(o.onImagePageSizeChange(i))}),n()()}if(r&2){let e=c();l(),p("currentPage",e.imagePage)("totalItems",e.totalImages)("pageSize",e.imageLimit)("pageSizes",q(4,xe))}}function Te(r,b){r&1&&(a(0,"div",59),s(1," You do not have permission to view this content. "),n())}var be=(()=>{class r{constructor(e,t,i,o,h,I){this.imgService=e,this.authService=t,this.roleService=i,this.elementRef=o,this.renderer=h,this.toastService=I,this.folders=[],this.images=[],this.selectedFolder=null,this.role="",this.search="",this.sort="DESC",this.folderPage=1,this.folderLimit=9999,this.totalFolders=0,this.imagePage=1,this.imageLimit=12,this.totalImages=0,this.uploads=[],this.apiUrl=y.MasterApi,this.loading={folders:!1,images:!1,uploading:!1},this.newFolderName="",this.folderError="",this.modalTitle="",this.modalMessage="",this.pendingDeleteImage=null}ngOnInit(){return L(this,null,function*(){let e=yield this.authService.getUser();e&&this.roleService.getRoles().subscribe(t=>{let i=t.find(o=>o.id===e.role_id);this.role=i?.code??"VIEWER",this.loadInitialData()})})}createFolder(){this.newFolderName.trim()&&this.imgService.createFolder(this.newFolderName.trim()).subscribe({next:e=>{this.folderError="",this.newFolderName="",this.loadFolders()},error:e=>{console.error("Folder creation failed",e),this.folderError=e?.message||"Error creating folder."}})}deleteFolder(e){!e||!e.id||!confirm(`Are you sure you want to delete the folder "${e.name}"?`)||this.imgService.deleteFolder(e.id).subscribe({next:i=>{e.id===this.selectedFolder?.id&&(this.selectedFolder=null,this.loadFolders(),this.images=[])},error:i=>{console.error("Failed to delete folder:",i),alert("Error deleting folder.")}})}loadInitialData(){this.loading.folders=!0,this.imgService.getFolders({page:1,limit:this.folderLimit,search:this.search,sortBy:"created_at",order:this.sort}).subscribe({next:e=>{this.folders=e.folders,this.totalFolders=e.total;let t=this.folders.length>0?this.folders[0]:null;this.selectedFolder=t,t?this.imgService.getImagesInFolder(t.id,1,this.imageLimit,"","DESC").subscribe(i=>{this.images=i.images,this.totalImages=i.total,this.loading.folders=!1}):this.loading.folders=!1},error:()=>{this.loading.folders=!1}})}loadFolders(){this.imgService.getFolders({page:this.folderPage,limit:this.folderLimit,search:this.search,sortBy:"created_at",order:this.sort}).subscribe(e=>{this.folders=e.folders,this.totalFolders=e.total,this.folders.length>0&&(this.selectedFolder=this.folders[0],this.loadImages())})}selectFolder(e){!e||e.id===this.selectedFolder?.id||(this.selectedFolder=e,this.imagePage=1,this.loadImages())}loadImages(){this.selectedFolder&&(this.loading.images=!0,this.imgService.getImagesInFolder(this.selectedFolder.id,this.imagePage,this.imageLimit,"","DESC").subscribe({next:e=>{this.images=e.images,this.totalImages=e.total,this.loading.images=!1},error:()=>{this.loading.images=!1}}))}onFolderPageChange(e){this.folderPage!==e&&(this.folderPage=e,this.loadFolders())}onFolderPageSizeChange(e){this.folderLimit!==e&&(this.folderLimit=e,this.folderPage=1,this.loadFolders())}onImagePageChange(e){this.imagePage!==e&&(this.imagePage=e,this.loadImages())}onImagePageSizeChange(e){this.imageLimit!==e&&(this.imageLimit=e,this.imagePage=1,this.loadImages())}onFileSelected(e){let i=e.target.files;i&&this.uploadImages(Array.from(i))}onDragOver(e){e.preventDefault()}onDrop(e){e.preventDefault(),e.dataTransfer?.files&&this.uploadImages(Array.from(e.dataTransfer.files))}uploadImages(e){if(this.selectedFolder)for(let t of e){let i=t.name.split(".").pop()?.toLowerCase();if(!["jpg","jpeg","png"].includes(i||"")){alert("Only JPG, JPEG, or PNG files are allowed.");continue}let o={name:t.name,progress:0,status:"uploading"};this.uploads.push(o),this.imgService.uploadImage(this.selectedFolder.id,t,JSON.stringify({description:"Sample Image"})).subscribe({next:()=>{o.progress=100,o.status="completed",this.loadImages()},error:()=>{o.status="error"}})}}refreshImage(e){let t=document.createElement("input");t.type="file",t.accept="image/jpeg,image/png,image/jpg",t.onchange=i=>{let o=i.target;if(o.files&&o.files.length>0){let h=o.files[0];if(!this.selectedFolder)return;this.imgService.refreshImage(e.id,this.selectedFolder.id,h).subscribe({next:()=>this.loadImages(),error:I=>{console.error("Error refreshing image:",I),alert("Failed to refresh image")}})}},t.click()}deleteImage(e){!this.selectedFolder||!confirm(`Are you sure you want to delete "${e.id}"?`)||this.imgService.deleteImage(this.selectedFolder.id,e.id).subscribe({next:()=>this.loadImages(),error:()=>alert("Failed to delete the image.")})}getImageUrl(e){return`${e.image_url}`}canUpload(){return this.role==="OWNER"||this.role==="ADMINISTRATOR"}canDelete(){return this.role==="OWNER"||this.role==="ADMINISTRATOR"}canView(){return this.role!=="VIEWER"}openConfirmModal(e){this.modalTitle="Confirm Delete",this.modalMessage=`Are you sure you want to delete "${e.id}"?`,this.pendingDeleteImage=e,new bootstrap.Modal(document.getElementById("confirmModal")).show()}confirmModal(){!this.selectedFolder||!this.pendingDeleteImage||(this.imgService.deleteImage(this.selectedFolder.id,this.pendingDeleteImage.id).subscribe({next:()=>this.loadImages(),error:()=>alert("Failed to delete image.")}),this.pendingDeleteImage=null)}copyHrefToClipboard(e,t){e.preventDefault();let i=this.renderer.createElement("textarea");i.value=y.MasterApi+"/user-img/uploads/"+t.id,this.renderer.appendChild(this.elementRef.nativeElement,i),i.select(),document.execCommand("copy"),this.renderer.removeChild(this.elementRef.nativeElement,i),this.toastService.show("Image File path copied to clipboard",{title:"Copy Successed",class:"bg-success"})}static{this.\u0275fac=function(t){return new(t||r)(F(_e),F(Y),F(X),F(k),F(V),F(oe))}}static{this.\u0275cmp=A({type:r,selectors:[["app-image-manager"]],decls:38,vars:10,consts:[["fileInput",""],[1,"h-100","d-flex","flex-column","container-fluid"],[1,"d-flex","flex-column","flex-md-row","align-items-start","align-items-md-center","justify-content-between","border-bottom","py-3","bg-white"],[1,"mb-1","fw-bold"],[1,"text-muted"],[1,"mt-2","mt-md-0"],["class","btn btn-primary",3,"click",4,"ngIf"],["type","file","hidden","","multiple","",3,"change"],[1,"row","flex-grow-1","m-0"],[1,"col-md-3","border-end","p-3","bg-light","overflow-auto"],["class","d-flex mb-2",4,"ngIf"],["type","text","placeholder","Search...",1,"form-control","mb-3",3,"ngModelChange","ngModel"],[1,"list-group"],["class","list-group-item list-group-item-action d-flex justify-content-between align-items-center",3,"active","click",4,"ngFor","ngForOf"],[1,"col-md-9","py-3","overflow-auto"],[1,"row","g-3"],["class","col-6 col-sm-4 col-md-3 col-lg-2",4,"ngFor","ngForOf"],["class","mt-4",4,"ngIf"],["class","alert alert-warning m-3",4,"ngIf"],["id","confirmModal","tabindex","-1","aria-labelledby","confirmModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-danger",3,"click"],[1,"btn","btn-primary",3,"click"],[1,"fa","fa-upload","me-2"],[1,"d-flex","mb-2"],["type","text","placeholder","New folder name",1,"form-control","me-1",3,"ngModelChange","ngModel"],[1,"btn","btn-success",3,"click","disabled"],[1,"fa","fa-plus"],[1,"list-group-item","list-group-item-action","d-flex","justify-content-between","align-items-center",3,"click"],[1,"btn","btn-sm","btn-outline-danger",3,"click"],[1,"fa","fa-trash"],[1,"col-6","col-sm-4","col-md-3","col-lg-2"],[1,"card","border","shadow-sm"],["role","img",1,"ratio","ratio-1x1","bg-light","bg-opacity-25",3,"ngStyle"],[1,"card-body","p-2"],[1,"d-flex","justify-content-between","align-items-center"],[1,"text-truncate",2,"max-width","75%"],[1,"dropdown"],["type","button","data-bs-toggle","dropdown",1,"btn","btn-sm"],[1,"fa","fa-ellipsis-v"],[1,"dropdown-menu","dropdown-menu-end"],[1,"dropdown-item",3,"click"],[1,"fa","fa-copy","me-2"],[1,"fa","fa-refresh","me-2"],[1,"dropdown-item","text-danger",3,"click"],[1,"fa","fa-trash","me-2"],["target","_blank",1,"dropdown-item",3,"href"],[1,"fa","fa-eye","me-2"],["download","",1,"dropdown-item",3,"href"],[1,"fa","fa-download","me-2"],[1,"mt-4"],["pagination","",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"alert","alert-warning","m-3"]],template:function(t,i){if(t&1){let o=C();a(0,"div",1)(1,"div",2)(2,"div")(3,"h3",3),s(4,"Image Manager"),n(),a(5,"small",4),s(6),n()(),a(7,"div",5),v(8,ye,3,0,"button",6),a(9,"input",7,0),u("change",function(I){return d(o),m(i.onFileSelected(I))}),n()()(),a(11,"div",8)(12,"div",9)(13,"h5"),s(14,"Folders"),n(),v(15,we,4,2,"div",10),a(16,"input",11),D("ngModelChange",function(I){return d(o),$(i.search,I)||(i.search=I),m(I)}),u("ngModelChange",function(){return d(o),m(i.loadFolders())}),n(),a(17,"ul",12),v(18,Ee,5,3,"li",13),n()(),a(19,"div",14)(20,"div",15),v(21,Me,31,7,"div",16),n(),v(22,Se,2,5,"div",17),n()(),v(23,Te,2,0,"div",18),a(24,"div",19)(25,"div",20)(26,"div",21)(27,"div",22)(28,"h5",23),s(29),n(),f(30,"button",24),n(),a(31,"div",25),s(32),n(),a(33,"div",26)(34,"button",27),s(35,"Cancel"),n(),a(36,"button",28),u("click",function(){return d(o),m(i.confirmModal())}),s(37,"Yes"),n()()()()()()}t&2&&(l(6),j(" ",i.selectedFolder?i.selectedFolder.name:"All folders"," "),l(2),p("ngIf",i.canUpload()),l(7),p("ngIf",i.canUpload()),l(),T("ngModel",i.search),l(2),p("ngForOf",i.folders),l(3),p("ngForOf",i.images),l(),p("ngIf",i.totalImages>0),l(),p("ngIf",!i.canView()),l(6),x(i.modalTitle),l(3),x(i.modalMessage))},dependencies:[W,B,H,Z,ee,te,ae],styles:[".upload-container[_ngcontent-%COMP%]{background:#fff;padding:1.5rem;border-radius:8px;width:400px;margin:auto;box-shadow:0 0 10px #0000001a}.dropzone[_ngcontent-%COMP%]{border:2px dashed #ccc;padding:1.5rem;text-align:center;border-radius:6px;margin:1rem 0;cursor:pointer}.file-list[_ngcontent-%COMP%]{margin-top:1rem}.file-item[_ngcontent-%COMP%]{background:#f8f9fa;padding:.75rem;border-radius:6px;margin-bottom:.5rem}.file-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px}.progress-bar[_ngcontent-%COMP%]{width:100%;height:6px;background:#e0e0e0;border-radius:3px;overflow:hidden}.progress-fill[_ngcontent-%COMP%]{height:100%;background:#007bff;transition:width .3s}.progress-fill.complete[_ngcontent-%COMP%]{background:#28a745}.folder-list[_ngcontent-%COMP%]{max-width:300px;margin-right:20px;float:left}.image-section[_ngcontent-%COMP%]{margin-left:320px}.image-grid[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.image-box[_ngcontent-%COMP%]{margin:10px;width:120px;overflow:hidden}.image-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;object-fit:cover}"]})}}return r})();var $e=[{path:"",component:be}],Fe=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=E({type:r})}static{this.\u0275inj=w({imports:[P.forChild($e),P]})}}return r})();var at=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=E({type:r})}static{this.\u0275inj=w({imports:[Q,Fe,ie,re,ne]})}}return r})();export{at as ImageManagerModule};
