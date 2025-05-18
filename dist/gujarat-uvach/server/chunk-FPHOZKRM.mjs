import './polyfills.server.mjs';
import{m as re,r as ae,s as oe}from"./chunk-FB7IJT3G.mjs";import{a as T}from"./chunk-V3XCU73E.mjs";import{l as $,n as m}from"./chunk-GBKCLE7P.mjs";import"./chunk-UTLWTILM.mjs";import{a as K}from"./chunk-OS2FCO7E.mjs";import{c as X,f as Z,j as ee,y as te,z as ie}from"./chunk-HHJGTDKF.mjs";import"./chunk-FKHLV6NY.mjs";import{$a as U,Aa as P,Bb as Q,Cb as W,Ea as o,Fa as n,Ga as I,Ib as H,J as E,Ja as v,K as S,Ka as h,La as d,Lb as J,M as x,Q as V,R as y,Ra as L,Sa as s,Ta as C,Ua as b,Ub as Y,W as c,Wa as k,X as p,Xa as q,Ya as N,db as j,fb as z,gb as B,ka as M,na as l,oa as w,qc as R,t as g,wa as _,ya as u,za as G}from"./chunk-BBEXDNKP.mjs";import{h as A}from"./chunk-VVCT4QZE.mjs";var ne=m`
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
`,le=m`
  query GetTotalFolderCount($search: String) {
    getTotalFolderCount(search: $search) {
      count
    }
  }
`,se=m`
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
`,de=m`
  query GetTotalImageCountInFolder($folderId: String!, $search: String) {
    getTotalImageCountInFolder(folderId: $folderId, search: $search) {
      totalCount
    }
  }
`,me=m`
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
`;var ge=m`
  mutation CreateFolder($name: String!) {
    createFolder(name: $name) {
      message
      folderId
      createdAt
    }
  }
`,ce=m`
  mutation UploadImage($folderId: ID!, $image: Upload!, $metadata: String) {
    uploadImage(folderId: $folderId, image: $image, metadata: $metadata) {
      id
      folder_id
      image_url
      metadata
    }
  }
`,pe=m`
  mutation RefreshImage($folderId: ID!, $imageId: ID!, $image: Upload!) {
    refreshImage(folderId: $folderId, imageId: $imageId, image: $image)
  }
`,ue=m`
  mutation RenameFolder($folderId: String!, $name: String!) {
    renameFolder(folderId: $folderId, name: $name) {
      message
    }
  }
`,fe=m`
  mutation DeleteFolder($folderId: String!) {
    deleteFolder(folderId: $folderId) {
      message
    }
  }
`,he=m`
  mutation DeleteImage($folderId: ID!, $imageId: ID!) {
    deleteImage(folderId: $folderId, imageId: $imageId)
  }
`;var _e=(()=>{class r{constructor(e,t){this.apollo=e,this.http=t}getInitialData(e,t){return this.apollo.watchQuery({query:me,variables:{folderLimit:e,imageLimit:t},fetchPolicy:"network-only"}).valueChanges.pipe(g(i=>i.data.getInitialFolderData))}getFolders(e){return this.apollo.watchQuery({query:ne,variables:e}).valueChanges.pipe(g(t=>t.data.getFolders))}getTotalFolderCount(e=""){return this.apollo.watchQuery({query:le,variables:{search:e}}).valueChanges.pipe(g(t=>t.data.getTotalFolderCount.count))}createFolder(e){return this.apollo.mutate({mutation:ge,variables:{name:e}}).pipe(g(t=>t.data.createFolder))}renameFolder(e,t){return this.apollo.mutate({mutation:ue,variables:{folderId:e,name:t}}).pipe(g(i=>i.data.renameFolder))}deleteFolder(e){return this.apollo.mutate({mutation:fe,variables:{folderId:e}}).pipe(g(t=>t.data.deleteFolder))}getImagesInFolder(e,t,i,a,F){return this.apollo.watchQuery({query:se,variables:{folderId:e,page:t,limit:i,search:a,sort:F}}).valueChanges.pipe(g(O=>O.data.getImagesInFolder))}getTotalImageCountInFolder(e,t=""){return this.apollo.watchQuery({query:de,variables:{folderId:e,search:t}}).valueChanges.pipe(g(i=>i.data.getTotalImageCountInFolder.totalCount))}uploadImage(e,t,i){return this.apollo.mutate({mutation:ce,variables:{folderId:e,image:t,metadata:i},context:{useMultipart:!0}})}deleteImage(e,t){return this.apollo.mutate({mutation:he,variables:{folderId:e,imageId:t}}).pipe(g(i=>i.data.deleteImage))}refreshImage(e,t,i){return this.apollo.mutate({mutation:pe,variables:{folderId:t,imageId:e,image:i}}).pipe(g(a=>a.data.refreshImage))}getImageUrl(e,t={}){let i=new URLSearchParams;return t.format&&i.append("format",t.format),t.quality&&i.append("quality",t.quality.toString()),t.thumb&&i.append("thumb","true"),`${T.MasterApi}/graphql/image/${e}?${i.toString()}`}static{this.\u0275fac=function(t){return new(t||r)(x($),x(Y))}}static{this.\u0275prov=E({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var Fe=m`
  query GetRoles {
    roles {
      id
      code
      name
      description
    }
  }
`,Ee=m`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      code
      name
      description
    }
  }
`,Ie=(()=>{class r{constructor(e){this.apollo=e}getRoles(){return this.apollo.watchQuery({query:Fe}).valueChanges.pipe(g(({data:e})=>e.roles))}getRoleById(e){return this.apollo.watchQuery({query:Ee,variables:{id:e}}).valueChanges.pipe(g(({data:t})=>(console.log(t),t.role)))}static{this.\u0275fac=function(t){return new(t||r)(x($))}}static{this.\u0275prov=E({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();var ye=()=>[12,24,36];function Me(r,f){if(r&1&&(o(0,"div",23)(1,"div",24)(2,"strong"),s(3),n(),o(4,"small"),s(5),n()(),o(6,"div",25)(7,"div",26),s(8),n()()()),r&2){let e=f.$implicit;l(3),C(e.name),l(2),b("",e.progress,"%"),l(2),G("width",e.progress,"%"),P("bg-success",e.status==="completed")("bg-danger",e.status==="error"),l(),b(" ",e.status==="uploading"?"Uploading...":e.status==="completed"?"Completed":"Failed"," ")}}function we(r,f){if(r&1&&(o(0,"div",21),_(1,Me,9,9,"div",22),n()),r&2){let e=d(2);l(),u("ngForOf",e.uploads)}}function Te(r,f){if(r&1){let e=v();o(0,"div",15)(1,"h4"),s(2,"Upload Files"),n(),o(3,"div",16),h("dragover",function(i){c(e);let a=d();return p(a.onDragOver(i))})("drop",function(i){c(e);let a=d();return p(a.onDrop(i))}),o(4,"p",17),s(5,"Choose files or drag & drop them here."),n(),o(6,"button",18),h("click",function(){c(e);let i=L(9);return p(i.click())}),s(7,"Browse Files"),n(),o(8,"input",19,1),h("change",function(i){c(e);let a=d();return p(a.onFileSelected(i))}),n()(),_(10,we,2,1,"div",20),n()}if(r&2){let e=d();l(10),u("ngIf",e.uploads.length>0)}}function $e(r,f){if(r&1){let e=v();o(0,"li",36),h("click",function(){let i=c(e).$implicit,a=d(2);return p(a.selectFolder(i))}),s(1),o(2,"small",37),s(3),j(4,"date"),n()()}if(r&2){let e=f.$implicit,t=d(2);P("active",e.id===(t.selectedFolder==null?null:t.selectedFolder.id)),l(),b(" ",e.name," "),l(2),C(z(4,4,e.created_at,"short"))}}function De(r,f){if(r&1){let e=v();o(0,"div",38)(1,"div",39)(2,"div",40),I(3,"img",41),n(),o(4,"div",42)(5,"button",43),s(6," \u22EF "),n(),o(7,"ul",44)(8,"li")(9,"button",45),h("click",function(){let i=c(e).$implicit,a=d(2);return p(a.refreshImage(i))}),I(10,"i",46),s(11,"Refresh "),n()(),o(12,"li")(13,"button",47),h("click",function(){let i=c(e).$implicit,a=d(2);return p(a.openConfirmModal(i))}),I(14,"i",48),s(15,"Delete "),n()(),o(16,"li")(17,"a",49),I(18,"i",50),s(19,"Open"),n()(),o(20,"li")(21,"a",51),I(22,"i",52),s(23,"Download"),n()()()()()()}if(r&2){let e=f.$implicit,t=d(2);l(),u("squareSize","width"),l(2),u("src",t.apiUrl+"/user-img/uploads/"+e.id+"?quality=30",M)("alt",e.metadata||"Image preview"),l(14),u("href",t.apiUrl+"/user-img/uploads/"+e.id,M),l(4),u("href",t.apiUrl+"/user-img/uploads/"+e.id,M)}}function Oe(r,f){if(r&1){let e=v();o(0,"div",53),h("currentPageChange",function(i){c(e);let a=d(2);return p(a.onImagePageChange(i))})("pageSizeChange",function(i){c(e);let a=d(2);return p(a.onImagePageSizeChange(i))}),n()}if(r&2){let e=d(2);u("currentPage",e.imagePage)("totalItems",e.totalImages)("pageSize",e.imageLimit)("pageSizes",U(4,ye))}}function Pe(r,f){if(r&1){let e=v();o(0,"div")(1,"div",27)(2,"div",28)(3,"h5"),s(4,"Folders"),n(),o(5,"input",29),N("ngModelChange",function(i){c(e);let a=d();return q(a.search,i)||(a.search=i),p(i)}),h("ngModelChange",function(){c(e);let i=d();return p(i.loadFolders())}),n(),o(6,"ul",30),_(7,$e,5,7,"li",31),n()(),o(8,"div",32)(9,"h5",23),s(10),n(),o(11,"div",33),_(12,De,24,5,"div",34),n(),_(13,Oe,1,5,"div",35),n()()()}if(r&2){let e=d();l(5),k("ngModel",e.search),l(2),u("ngForOf",e.folders),l(3),b('Images in "',e.selectedFolder==null?null:e.selectedFolder.name,'"'),l(2),u("ngForOf",e.images),l(),u("ngIf",e.totalImages>0)}}function Le(r,f){r&1&&(o(0,"div",54),s(1,"You do not have permission to view this content."),n())}var ve=(()=>{class r{constructor(e,t,i){this.imgService=e,this.authService=t,this.roleService=i,this.folders=[],this.images=[],this.selectedFolder=null,this.role="",this.search="",this.sort="DESC",this.folderPage=1,this.folderLimit=9999,this.totalFolders=0,this.imagePage=1,this.imageLimit=12,this.totalImages=0,this.uploads=[],this.apiUrl=T.MasterApi,this.loading={folders:!1,images:!1,uploading:!1},this.modalTitle="",this.modalMessage="",this.pendingDeleteImage=null}ngOnInit(){return A(this,null,function*(){let e=yield this.authService.getUser();e&&this.roleService.getRoles().subscribe(t=>{let i=t.find(a=>a.id===e.role_id);this.role=i?.code??"VIEWER",this.loadInitialData()})})}loadInitialData(){this.loading.folders=!0,this.imgService.getFolders({page:1,limit:this.folderLimit,search:this.search,sortBy:"created_at",order:this.sort}).subscribe({next:e=>{this.folders=e.folders,this.totalFolders=e.total;let t=this.folders.length>0?this.folders[0]:null;this.selectedFolder=t,t?this.imgService.getImagesInFolder(t.id,1,this.imageLimit,"","DESC").subscribe(i=>{this.images=i.images,this.totalImages=i.total,this.loading.folders=!1}):this.loading.folders=!1},error:()=>{this.loading.folders=!1}})}loadFolders(){this.imgService.getFolders({page:this.folderPage,limit:this.folderLimit,search:this.search,sortBy:"created_at",order:this.sort}).subscribe(e=>{this.folders=e.folders,this.totalFolders=e.total,this.folders.length>0&&(this.selectedFolder=this.folders[0],this.loadImages())})}selectFolder(e){!e||e.id===this.selectedFolder?.id||(this.selectedFolder=e,this.imagePage=1,this.loadImages())}loadImages(){this.selectedFolder&&(this.loading.images=!0,this.imgService.getImagesInFolder(this.selectedFolder.id,this.imagePage,this.imageLimit,"","DESC").subscribe({next:e=>{this.images=e.images,this.totalImages=e.total,this.loading.images=!1},error:()=>{this.loading.images=!1}}))}onFolderPageChange(e){this.folderPage!==e&&(this.folderPage=e,this.loadFolders())}onFolderPageSizeChange(e){this.folderLimit!==e&&(this.folderLimit=e,this.folderPage=1,this.loadFolders())}onImagePageChange(e){this.imagePage!==e&&(this.imagePage=e,this.loadImages())}onImagePageSizeChange(e){this.imageLimit!==e&&(this.imageLimit=e,this.imagePage=1,this.loadImages())}onFileSelected(e){let i=e.target.files;i&&this.uploadImages(Array.from(i))}onDragOver(e){e.preventDefault()}onDrop(e){e.preventDefault(),e.dataTransfer?.files&&this.uploadImages(Array.from(e.dataTransfer.files))}uploadImages(e){if(this.selectedFolder)for(let t of e){let i=t.name.split(".").pop()?.toLowerCase();if(!["jpg","jpeg","png"].includes(i||"")){alert("Only JPG, JPEG, or PNG files are allowed.");continue}let a={name:t.name,progress:0,status:"uploading"};this.uploads.push(a),this.imgService.uploadImage(this.selectedFolder.id,t,JSON.stringify({description:"Sample Image"})).subscribe({next:()=>{a.progress=100,a.status="completed",this.loadImages()},error:()=>{a.status="error"}})}}refreshImage(e){let t=document.createElement("input");t.type="file",t.accept="image/jpeg,image/png,image/jpg",t.onchange=i=>{let a=i.target;if(a.files&&a.files.length>0){let F=a.files[0];if(!this.selectedFolder)return;this.imgService.refreshImage(e.id,this.selectedFolder.id,F).subscribe({next:()=>this.loadImages(),error:O=>{console.error("Error refreshing image:",O),alert("Failed to refresh image")}})}},t.click()}deleteImage(e){!this.selectedFolder||!confirm(`Are you sure you want to delete "${e.id}"?`)||this.imgService.deleteImage(this.selectedFolder.id,e.id).subscribe({next:()=>this.loadImages(),error:()=>alert("Failed to delete the image.")})}getImageUrl(e){return`${e.image_url}`}canUpload(){return this.role==="OWNER"||this.role==="ADMINISTRATOR"}canDelete(){return this.role==="OWNER"||this.role==="ADMINISTRATOR"}canView(){return this.role!=="VIEWER"}openConfirmModal(e){this.modalTitle="Confirm Delete",this.modalMessage=`Are you sure you want to delete "${e.id}"?`,this.pendingDeleteImage=e,new bootstrap.Modal(document.getElementById("confirmModal")).show()}confirmModal(){!this.selectedFolder||!this.pendingDeleteImage||(this.imgService.deleteImage(this.selectedFolder.id,this.pendingDeleteImage.id).subscribe({next:()=>this.loadImages(),error:()=>alert("Failed to delete image.")}),this.pendingDeleteImage=null)}static{this.\u0275fac=function(t){return new(t||r)(w(_e),w(K),w(Ie))}}static{this.\u0275cmp=V({type:r,selectors:[["app-image-manager"]],decls:19,vars:5,consts:[["noAccess",""],["fileInput",""],[1,"container-fluid","py-3"],["class","mb-4",4,"ngIf"],[4,"ngIf","ngIfElse"],["id","confirmModal","tabindex","-1","aria-labelledby","confirmModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","confirmModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body"],[1,"modal-footer"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-danger",3,"click"],[1,"mb-4"],[1,"border","border-2","rounded","p-3","text-center","bg-light",3,"dragover","drop"],[1,"mb-2"],["type","button",1,"btn","btn-primary",3,"click"],["type","file","hidden","","multiple","",3,"change"],["class","mt-3",4,"ngIf"],[1,"mt-3"],["class","mb-3",4,"ngFor","ngForOf"],[1,"mb-3"],[1,"d-flex","justify-content-between","align-items-center","mb-1"],[1,"progress"],["role","progressbar",1,"progress-bar"],[1,"row"],[1,"col-md-3"],["type","text","placeholder","Search folders...",1,"form-control","mb-2",3,"ngModelChange","ngModel"],[1,"list-group"],["class","list-group-item list-group-item-action",3,"active","click",4,"ngFor","ngForOf"],[1,"col-md-9"],[1,"row","g-3"],["class","col-lg-2 col-sm-4 col-md-3",4,"ngFor","ngForOf"],["pagination","","class","rounded-3 mt-3",3,"currentPage","totalItems","pageSize","pageSizes","currentPageChange","pageSizeChange",4,"ngIf"],[1,"list-group-item","list-group-item-action",3,"click"],[1,"text-muted","d-block"],[1,"col-lg-2","col-sm-4","col-md-3"],[1,"position-relative","image-card","d-flex","flex-column",3,"squareSize"],[1,"position-absolute","p-2","overflow-hidden","h-100","w-100","d-flex","justify-content-center","align-items-center","bg-light","rounded-3","border","bg-opacity-25","shadow-sm"],["loading","lazy",1,"img-fluid","max-w-100","max-h-100","rounded-3",3,"src","alt"],[1,"dropdown","position-absolute","top-0","end-0","m-2"],["type","button","data-bs-toggle","dropdown","aria-expanded","false",1,"btn","btn-sm","btn-secondary","dropdown-toggle"],[1,"dropdown-menu"],["title","Refresh",1,"dropdown-item",3,"click"],[1,"fa","fa-refresh","me-2"],["title","Delete",1,"dropdown-item",3,"click"],[1,"fa","fa-trash","me-2"],["target","_blank",1,"dropdown-item",3,"href"],[1,"fa","fa-folder","me-2"],["download","",1,"dropdown-item",3,"href"],[1,"fa","fa-download","me-2"],["pagination","",1,"rounded-3","mt-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],[1,"alert","alert-warning","mt-3"]],template:function(t,i){if(t&1){let a=v();o(0,"div",2),_(1,Te,11,1,"div",3)(2,Pe,14,5,"div",4)(3,Le,2,0,"ng-template",null,0,B),o(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"h5",9),s(10),n(),I(11,"button",10),n(),o(12,"div",11),s(13),n(),o(14,"div",12)(15,"button",13),s(16,"Cancel"),n(),o(17,"button",14),h("click",function(){return c(a),p(i.confirmModal())}),s(18,"Yes"),n()()()()()()}if(t&2){let a=L(4);l(),u("ngIf",i.canUpload()),l(),u("ngIf",i.canView())("ngIfElse",a),l(8),C(i.modalTitle),l(3),C(i.modalMessage)}},dependencies:[Q,W,X,Z,ee,re,ae,H],styles:[".upload-container[_ngcontent-%COMP%]{background:#fff;padding:1.5rem;border-radius:8px;width:400px;margin:auto;box-shadow:0 0 10px #0000001a}.dropzone[_ngcontent-%COMP%]{border:2px dashed #ccc;padding:1.5rem;text-align:center;border-radius:6px;margin:1rem 0;cursor:pointer}.file-list[_ngcontent-%COMP%]{margin-top:1rem}.file-item[_ngcontent-%COMP%]{background:#f8f9fa;padding:.75rem;border-radius:6px;margin-bottom:.5rem}.file-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:14px;margin-bottom:5px}.progress-bar[_ngcontent-%COMP%]{width:100%;height:6px;background:#e0e0e0;border-radius:3px;overflow:hidden}.progress-fill[_ngcontent-%COMP%]{height:100%;background:#007bff;transition:width .3s}.progress-fill.complete[_ngcontent-%COMP%]{background:#28a745}.folder-list[_ngcontent-%COMP%]{max-width:300px;margin-right:20px;float:left}.image-section[_ngcontent-%COMP%]{margin-left:320px}.image-grid[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.image-box[_ngcontent-%COMP%]{margin:10px;width:120px;overflow:hidden}.image-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:100%;object-fit:cover}"]})}}return r})();var Re=[{path:"",component:ve}],xe=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=y({type:r})}static{this.\u0275inj=S({imports:[R.forChild(Re),R]})}}return r})();var mt=(()=>{class r{static{this.\u0275fac=function(t){return new(t||r)}}static{this.\u0275mod=y({type:r})}static{this.\u0275inj=S({imports:[J,xe,te,ie,oe]})}}return r})();export{mt as ImageManagerModule};
