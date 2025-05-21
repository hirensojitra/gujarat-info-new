import './polyfills.server.mjs';
import{m as oe,r as ae}from"./chunk-KT5B7YV3.mjs";import{a as w}from"./chunk-AJBY5M5H.mjs";import{l as T,n as d}from"./chunk-I67FLMAD.mjs";import{a as re}from"./chunk-BU7MML7M.mjs";import"./chunk-HQ7JXNLN.mjs";import{a as K}from"./chunk-2FFNLZ4S.mjs";import{c as X,f as Z,j as ee,y as te,z as ie}from"./chunk-FQ62UDCK.mjs";import"./chunk-6WXAOSAP.mjs";import{B as L,c as Y}from"./chunk-5ILMJD4Z.mjs";import{Aa as c,Ab as u,Cb as j,Ha as V,Kb as a,Lb as n,Mb as f,Pb as C,Rb as h,Tb as g,ac as U,bb as D,bc as s,cc as y,dc as q,dd as W,ed as Q,fa as E,fc as P,ga as M,gb as l,gc as O,hb as v,hc as R,id as H,ka as x,kc as z,lc as B,nb as N,nd as J,qa as k,ra as S,yb as F,z as p,za as m,zb as G}from"./chunk-3PBKWUS3.mjs";import{h as A}from"./chunk-VVCT4QZE.mjs";var ne=d`
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
`,le=d`
  query GetTotalFolderCount($search: String) {
    getTotalFolderCount(search: $search) {
      count
    }
  }
`,se=d`
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
`,de=d`
  query GetTotalImageCountInFolder($folderId: String!, $search: String) {
    getTotalImageCountInFolder(folderId: $folderId, search: $search) {
      totalCount
    }
  }
`,me=d`
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
`;var ce=d`
  mutation CreateFolder($name: String!) {
    createFolder(name: $name) {
      id
      name
      created_at
    }
  }
`,ge=d`
  mutation UploadImage($folderId: ID!, $image: Upload!, $metadata: String) {
    uploadImage(folderId: $folderId, image: $image, metadata: $metadata) {
      id
      folder_id
      image_url
      metadata
    }
  }
`,pe=d`
  mutation RefreshImage($folderId: ID!, $imageId: ID!, $image: Upload!) {
    refreshImage(folderId: $folderId, imageId: $imageId, image: $image)
  }
`,ue=d`
  mutation RenameFolder($folderId: ID!, $name: String!) {
    renameFolder(folderId: $folderId, name: $name)
  }
`,fe=d`
  mutation DeleteFolder($folderId: ID!) {
    deleteFolder(folderId: $folderId)
  }
`,he=d`
  mutation DeleteImage($folderId: ID!, $imageId: ID!) {
    deleteImage(folderId: $folderId, imageId: $imageId)
  }
`;var Ie=(()=>{class r{constructor(e,t){this.apollo=e,this.http=t}getInitialData(e,t){return this.apollo.watchQuery({query:me,variables:{fetchPolicy:"no-cache",folderLimit:e,imageLimit:t},fetchPolicy:"network-only"}).valueChanges.pipe(p(i=>i.data.getInitialFolderData))}getFolders(e){return this.apollo.watchQuery({query:ne,variables:e,fetchPolicy:"no-cache"}).valueChanges.pipe(p(t=>t.data.getFolders))}getTotalFolderCount(e=""){return this.apollo.watchQuery({query:le,variables:{search:e},fetchPolicy:"no-cache"}).valueChanges.pipe(p(t=>t.data.getTotalFolderCount.count))}createFolder(e){return this.apollo.mutate({mutation:ce,variables:{name:e},fetchPolicy:"no-cache"}).pipe(p(t=>t.data.createFolder))}renameFolder(e,t){return this.apollo.mutate({mutation:ue,variables:{folderId:e,name:t},fetchPolicy:"no-cache"}).pipe(p(i=>i.data.renameFolder))}deleteFolder(e){return this.apollo.mutate({mutation:fe,variables:{folderId:e},fetchPolicy:"no-cache"}).pipe(p(t=>t.data.deleteFolder))}getImagesInFolder(e,t,i,o,I){return this.apollo.watchQuery({query:se,variables:{folderId:e,page:t,limit:i,search:o,sort:I},fetchPolicy:"no-cache"}).valueChanges.pipe(p(_=>_.data.getImagesInFolder))}getTotalImageCountInFolder(e,t=""){return this.apollo.watchQuery({query:de,variables:{folderId:e,search:t},fetchPolicy:"no-cache"}).valueChanges.pipe(p(i=>i.data.getTotalImageCountInFolder.totalCount))}uploadImage(e,t,i){return this.apollo.mutate({mutation:ge,variables:{folderId:e,image:t,metadata:i},fetchPolicy:"no-cache",context:{useMultipart:!0}})}deleteImage(e,t){return this.apollo.mutate({mutation:he,variables:{folderId:e,imageId:t},fetchPolicy:"no-cache"}).pipe(p(i=>i.data.deleteImage))}refreshImage(e,t,i){return this.apollo.mutate({mutation:pe,variables:{folderId:t,imageId:e,image:i},fetchPolicy:"no-cache"}).pipe(p(o=>o.data.refreshImage))}getImageUrl(e,t={}){let i=new URLSearchParams;return t.format&&i.append("format",t.format),t.quality&&i.append("quality",t.quality.toString()),t.thumb&&i.append("thumb","true"),`${w.MasterApi}/graphql/image/${e}?${i.toString()}`}static{this.\u0275fac=function(t){return new(t||r)(x(T),x(Y))}}static{this.\u0275prov=E({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var xe=d`
  query GetRoles {
    roles {
      id
      code
      name
      description
    }
  }
`,ye=d`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      code
      name
      description
    }
  }
`,_e=(()=>{class r{constructor(e){this.apollo=e}getRoles(){return this.apollo.watchQuery({query:xe}).valueChanges.pipe(p(({data:e})=>e.roles))}getRoleById(e){return this.apollo.watchQuery({query:ye,variables:{id:e}}).valueChanges.pipe(p(({data:t})=>(console.log(t),t.role)))}static{this.\u0275fac=function(t){return new(t||r)(x(T))}}static{this.\u0275prov=E({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var Ee=r=>({"background-image":r,"background-size":"contain","background-position":"center","background-repeat":"no-repeat"}),Me=()=>[12,24,48];function Se(r,b){if(r&1){let e=C();a(0,"button",29),h("click",function(){m(e),g();let i=U(10);return c(i.click())}),f(1,"i",30),s(2,"Upload "),n()}}function Te(r,b){if(r&1){let e=C();a(0,"div",31)(1,"input",32),R("ngModelChange",function(i){m(e);let o=g();return O(o.newFolderName,i)||(o.newFolderName=i),c(i)}),n(),a(2,"button",33),h("click",function(){m(e);let i=g();return c(i.createFolder())}),f(3,"i",34),n()()}if(r&2){let e=g();l(),P("ngModel",e.newFolderName),l(),u("disabled",!(e.newFolderName!=null&&e.newFolderName.trim()))}}function $e(r,b){if(r&1){let e=C();a(0,"li",35),h("click",function(){let i=m(e).$implicit,o=g();return c(o.selectFolder(i))}),a(1,"span"),s(2),n(),a(3,"button",36),h("click",function(){let i=m(e).$implicit,o=g();return c(o.deleteFolder(i))}),f(4,"i",37),n()()}if(r&2){let e=b.$implicit,t=g();j("active",e.id===(t.selectedFolder==null?null:t.selectedFolder.id)),l(2),y(e.name)}}function De(r,b){if(r&1){let e=C();a(0,"div",38)(1,"div",39),f(2,"div",40),a(3,"div",41)(4,"div",42)(5,"small",43),s(6),n(),a(7,"div",44)(8,"button",45),f(9,"i",46),n(),a(10,"ul",47)(11,"li")(12,"button",48),h("click",function(i){let o=m(e).$implicit,I=g();return c(I.copyHrefToClipboard(i,o))}),f(13,"i",49),s(14,"Copy URL"),n()(),a(15,"li")(16,"button",48),h("click",function(){let i=m(e).$implicit,o=g();return c(o.refreshImage(i))}),f(17,"i",50),s(18,"Refresh"),n()(),a(19,"li")(20,"button",51),h("click",function(){let i=m(e).$implicit,o=g();return c(o.openConfirmModal(i))}),f(21,"i",52),s(22,"Delete"),n()(),a(23,"li")(24,"a",53),f(25,"i",54),s(26,"Open"),n()(),a(27,"li")(28,"a",55),f(29,"i",56),s(30,"Download"),n()()()()()()()()}if(r&2){let e=b.$implicit,t=g();l(2),u("ngStyle",B(5,Ee,"url("+t.apiUrl+"/user-img/uploads/"+e.id+"?thumb=medium)")),G("aria-label",e.metadata||"Image"),l(4),y(e.image_url||"Unnamed"),l(18),u("href",t.apiUrl+"/user-img/uploads/"+e.id,D),l(4),u("href",t.apiUrl+"/user-img/uploads/"+e.id,D)}}function Pe(r,b){if(r&1){let e=C();a(0,"div",57)(1,"div",58),h("currentPageChange",function(i){m(e);let o=g();return c(o.onImagePageChange(i))})("pageSizeChange",function(i){m(e);let o=g();return c(o.onImagePageSizeChange(i))}),n()()}if(r&2){let e=g();l(),u("currentPage",e.imagePage)("totalItems",e.totalImages)("pageSize",e.imageLimit)("pageSizes",z(4,Me))}}function Oe(r,b){r&1&&(a(0,"div",59),s(1," You do not have permission to view this content. "),n())}var be=(()=>{class r{constructor(e,t,i,o,I,_){this.imgService=e,this.authService=t,this.roleService=i,this.elementRef=o,this.renderer=I,this.toastService=_,this.folders=[],this.images=[],this.selectedFolder=null,this.role="",this.search="",this.sort="DESC",this.folderPage=1,this.folderLimit=9999,this.totalFolders=0,this.imagePage=1,this.imageLimit=12,this.totalImages=0,this.uploads=[],this.apiUrl=w.MasterApi,this.loading={folders:!1,images:!1,uploading:!1},this.newFolderName="",this.folderError="",this.modalTitle="",this.modalMessage="",this.pendingDeleteImage=null}ngOnInit(){return A(this,null,function*(){let e=yield this.authService.getUser();e&&this.roleService.getRoles().subscribe(t=>{let i=t.find(o=>o.id===e.role_id);this.role=i?.code??"VIEWER",this.loadInitialData()})})}createFolder(){this.newFolderName.trim()&&this.imgService.createFolder(this.newFolderName.trim()).subscribe({next:e=>{this.folderError="",this.newFolderName="",this.loadFolders()},error:e=>{console.error("Folder creation failed",e),this.folderError=e?.message||"Error creating folder."}})}deleteFolder(e){!e||!e.id||!confirm(`Are you sure you want to delete the folder "${e.name}"?`)||this.imgService.deleteFolder(e.id).subscribe({next:i=>{e.id===this.selectedFolder?.id&&(this.selectedFolder=null,this.loadFolders(),this.images=[])},error:i=>{console.error("Failed to delete folder:",i),alert("Error deleting folder.")}})}loadInitialData(){this.loading.folders=!0,this.imgService.getFolders({page:1,limit:this.folderLimit,search:this.search,sortBy:"created_at",order:this.sort}).subscribe({next:e=>{this.folders=e.folders,this.totalFolders=e.total;let t=this.folders.length>0?this.folders[0]:null;this.selectedFolder=t,t?this.imgService.getImagesInFolder(t.id,1,this.imageLimit,"","DESC").subscribe(i=>{this.images=i.images,this.totalImages=i.total,this.loading.folders=!1}):this.loading.folders=!1},error:()=>{this.loading.folders=!1}})}loadFolders(){this.imgService.getFolders({page:this.folderPage,limit:this.folderLimit,search:this.search,sortBy:"created_at",order:this.sort}).subscribe(e=>{this.folders=e.folders,this.totalFolders=e.total,this.folders.length>0&&(this.selectedFolder=this.folders[0],this.loadImages())})}selectFolder(e){!e||e.id===this.selectedFolder?.id||(this.selectedFolder=e,this.imagePage=1,this.loadImages())}loadImages(){this.selectedFolder&&(this.loading.images=!0,this.imgService.getImagesInFolder(this.selectedFolder.id,this.imagePage,this.imageLimit,"","DESC").subscribe({next:e=>{this.images=e.images,this.totalImages=e.total,this.loading.images=!1},error:()=>{this.loading.images=!1}}))}onFolderPageChange(e){this.folderPage!==e&&(this.folderPage=e,this.loadFolders())}onFolderPageSizeChange(e){this.folderLimit!==e&&(this.folderLimit=e,this.folderPage=1,this.loadFolders())}onImagePageChange(e){this.imagePage!==e&&(this.imagePage=e,this.loadImages())}onImagePageSizeChange(e){this.imageLimit!==e&&(this.imageLimit=e,this.imagePage=1,this.loadImages())}onFileSelected(e){let i=e.target.files;i&&this.uploadImages(Array.from(i))}onDragOver(e){e.preventDefault()}onDrop(e){e.preventDefault(),e.dataTransfer?.files&&this.uploadImages(Array.from(e.dataTransfer.files))}uploadImages(e){if(this.selectedFolder)for(let t of e){let i=t.name.split(".").pop()?.toLowerCase();if(!["jpg","jpeg","png"].includes(i||"")){alert("Only JPG, JPEG, or PNG files are allowed.");continue}let o={name:t.name,progress:0,status:"uploading"};this.uploads.push(o),this.imgService.uploadImage(this.selectedFolder.id,t,JSON.stringify({description:"Sample Image"})).subscribe({next:()=>{o.progress=100,o.status="completed",this.loadImages()},error:()=>{o.status="error"}})}}refreshImage(e){let t=document.createElement("input");t.type="file",t.accept="image/jpeg,image/png,image/jpg",t.onchange=i=>{let o=i.target;if(o.files&&o.files.length>0){let I=o.files[0];if(!this.selectedFolder)return;this.imgService.refreshImage(e.id,this.selectedFolder.id,I).subscribe({next:()=>this.loadImages(),error:_=>{console.error("Error refreshing image:",_),alert("Failed to refresh image")}})}},t.click()}deleteImage(e){!this.selectedFolder||!confirm(`Are you sure you want to delete "${e.id}"?`)||this.imgService.deleteImage(this.selectedFolder.id,e.id).subscribe({next:()=>this.loadImages(),error:()=>alert("Failed to delete the image.")})}getImageUrl(e){return`${e.image_url}`}canUpload(){return this.role==="OWNER"||this.role==="ADMINISTRATOR"}canDelete(){return this.role==="OWNER"||this.role==="ADMINISTRATOR"}canView(){return this.role!=="VIEWER"}openConfirmModal(e){this.modalTitle="Confirm Delete",this.modalMessage=`Are you sure you want to delete "${e.id}"?`,this.pendingDeleteImage=e,new bootstrap.Modal(document.getElementById("confirmModal")).show()}confirmModal(){!this.selectedFolder||!this.pendingDeleteImage||(this.imgService.deleteImage(this.selectedFolder.id,this.pendingDeleteImage.id).subscribe({next:()=>this.loadImages(),error:()=>alert("Failed to delete image.")}),this.pendingDeleteImage=null)}copyHrefToClipboard(e,t){e.preventDefault();let i=this.renderer.createElement("textarea");i.value=w.MasterApi+"/user-img/uploads/"+t.id,this.renderer.appendChild(this.elementRef.nativeElement,i),i.select(),document.execCommand("copy"),this.renderer.removeChild(this.elementRef.nativeElement,i),this.toastService.show("Image File path copied to clipboard",{title:"Copy Successed",class:"bg-success"})}static{this.\u0275fac=function(t){return new(t||r)(v(Ie),v(K),v(_e),v(V),v(N),v(re))}}static{this.\u0275cmp=k({type:r,selectors:[["app-image-manager"]],decls:38,vars:10,consts:[["fileInput",""],[1,"h-100","d-flex","flex-column"],[1,"d-flex","flex-column","flex-md-row","align-items-start","align-items-md-center","justify-content-between","border-bottom","py-3","bg-white"],[1,"mb-1","fw-bold"],[1,"text-muted"],[1,"mt-2","mt-md-0"],["class","btn btn-primary",3,"click",4,"ngIf"],["type","file","hidden","","multiple","",3,"change"],[1,"row","flex-grow-1","m-0"],[1,"col-md-3","border-end","p-3","bg-light","overflow-auto"],["class","d-flex mb-2",4,"ngIf"],["type","text","placeholder","Search...",1,"form-control","mb-3",3,"ngModelChange","ngModel"],[1,"list-group"],["class","list-group-item list-group-item-action d-flex justify-content-between align-items-center",3,"active","click",4,"ngFor","ngForOf"],[1,"col-md-9","py-3","px-0","overflow-auto"],[1,"row","g-3"],["class","col-6 col-sm-4 col-md-3 col-lg-2",4,"ngFor","ngForOf"],["class","mt-4",4,"ngIf"],["class","alert alert-warning m-3",4,"ngIf"],["id","confirmModal","tabindex","-1","aria-labelledby","confirmModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-danger",3,"click"],[1,"btn","btn-primary",3,"click"],[1,"fa","fa-upload","me-2"],[1,"d-flex","mb-2"],["type","text","placeholder","New folder name",1,"form-control","me-1",3,"ngModelChange","ngModel"],[1,"btn","btn-success",3,"click","disabled"],[1,"fa","fa-plus"],[1,"list-group-item","list-group-item-action","d-flex","justify-content-between","align-items-center",3,"click"],[1,"btn","btn-sm","btn-outline-danger",3,"click"],[1,"fa","fa-trash"],[1,"col-6","col-sm-4","col-md-3","col-lg-2"],[1,"card","border","shadow-sm"],["role","img",1,"ratio","ratio-1x1","bg-light","bg-opacity-25",3,"ngStyle"],[1,"card-body","p-2"],[1,"d-flex","justify-content-between","align-items-center"],[1,"text-truncate",2,"max-width","75%"],[1,"dropdown"],["type","button","data-bs-toggle","dropdown",1,"btn","btn-sm"],[1,"fa","fa-ellipsis-v"],[1,"dropdown-menu","dropdown-menu-end"],[1,"dropdown-item",3,"click"],[1,"fa","fa-copy","me-2"],[1,"fa","fa-refresh","me-2"],[1,"dropdown-item","text-danger",3,"click"],[1,"fa","fa-trash","me-2"],["target","_blank",1,"dropdown-item",3,"href"],[1,"fa","fa-eye","me-2"],["download","",1,"dropdown-item",3,"href"],[1,"fa","fa-download","me-2"],[1,"mt-4"],["pagination","",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"alert","alert-warning","m-3"]],template:function(t,i){if(t&1){let o=C();a(0,"div",1)(1,"div",2)(2,"div")(3,"h3",3),s(4,"Image Manager"),n(),a(5,"small",4),s(6),n()(),a(7,"div",5),F(8,Se,3,0,"button",6),a(9,"input",7,0),h("change",function(_){return m(o),c(i.onFileSelected(_))}),n()()(),a(11,"div",8)(12,"div",9)(13,"h5"),s(14,"Folders"),n(),F(15,Te,4,2,"div",10),a(16,"input",11),R("ngModelChange",function(_){return m(o),O(i.search,_)||(i.search=_),c(_)}),h("ngModelChange",function(){return m(o),c(i.loadFolders())}),n(),a(17,"ul",12),F(18,$e,5,3,"li",13),n()(),a(19,"div",14)(20,"div",15),F(21,De,31,7,"div",16),n(),F(22,Pe,2,5,"div",17),n()(),F(23,Oe,2,0,"div",18),a(24,"div",19)(25,"div",20)(26,"div",21)(27,"div",22)(28,"h5",23),s(29),n(),f(30,"button",24),n(),a(31,"div",25),s(32),n(),a(33,"div",26)(34,"button",27),s(35,"Cancel"),n(),a(36,"button",28),h("click",function(){return m(o),c(i.confirmModal())}),s(37,"Yes"),n()()()()()()}t&2&&(l(6),q(" ",i.selectedFolder?i.selectedFolder.name:"All folders"," "),l(2),u("ngIf",i.canUpload()),l(7),u("ngIf",i.canUpload()),l(),P("ngModel",i.search),l(2),u("ngForOf",i.folders),l(3),u("ngForOf",i.images),l(),u("ngIf",i.totalImages>0),l(),u("ngIf",!i.canView()),l(6),y(i.modalTitle),l(3),y(i.modalMessage))},dependencies:[W,Q,H,X,Z,ee,oe],styles:[".upload-container[_ngcontent-%COMP%]{background:#fff;padding:1.5rem;border-radius:8px;width:400px;margin:auto;box-shadow:0 0 10px #0000001a}.dropzone[_ngcontent-%COMP%]{border:2px dashed #ccc;padding:1.5rem;text-align:center;border-radius:6px;margin:1rem 0;cursor:pointer}.file-list[_ngcontent-%COMP%]{margin-top:1rem}.file-item[_ngcontent-%COMP%]{background:#f8f9fa;padding:.75rem;border-radius:6px;margin-bottom:.5rem}.file-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px}.progress-bar[_ngcontent-%COMP%]{width:100%;height:6px;background:#e0e0e0;border-radius:3px;overflow:hidden}.progress-fill[_ngcontent-%COMP%]{height:100%;background:#007bff;transition:width .3s}.progress-fill.complete[_ngcontent-%COMP%]{background:#28a745}.folder-list[_ngcontent-%COMP%]{max-width:300px;margin-right:20px;float:left}.image-section[_ngcontent-%COMP%]{margin-left:320px}.image-grid[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.image-box[_ngcontent-%COMP%]{margin:10px;width:120px;overflow:hidden}.image-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;object-fit:cover}"]})}}return r})();var Re=[{path:"",component:be}],ve=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=S({type:r})}static{this.\u0275inj=M({imports:[L.forChild(Re),L]})}}return r})();var dt=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=S({type:r})}static{this.\u0275inj=M({imports:[J,ve,te,ie,ae]})}}return r})();export{dt as ImageManagerModule};
