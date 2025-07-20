import './polyfills.server.mjs';
import{g as se,m as le,r as ge}from"./chunk-BOGSDZCB.mjs";import"./chunk-IEFTK76M.mjs";import{a as H}from"./chunk-ILF7YMS7.mjs";import{A as re,B as ae,C as ne,b as W,c as Q,e as f,g as J,h as K,l as X,m as Z,q as ee,r as te,s as oe,t as ie}from"./chunk-6HIUZ7QP.mjs";import{A as M,c as B,z as j}from"./chunk-RMZWX6BJ.mjs";import{$b as p,Ad as z,Ea as u,Fa as y,Fb as h,Hb as g,Ma as V,Sb as r,Tb as i,Ub as C,Vb as U,Wb as q,Yb as _,bc as m,ka as k,la as b,lc as l,mb as s,mc as v,nb as E,nc as T,od as N,pa as F,pd as L,qc as I,qd as Y,rc as O,sc as w,va as $,wa as S,wc as R,xc as x}from"./chunk-34OSZFTC.mjs";import{a as A}from"./chunk-VVCT4QZE.mjs";var de=`
  mutation CreatePostCategories($postCategories: [PostCategoryInput!]!) {
    createPostCategories(postCategories: $postCategories) {
      id
      name
      description
      active
    }
  }
`,ce=`
  mutation CreatePostCategory($name: String!, $description: String!, $active: Boolean!) {
    createPostCategory(name: $name, description: $description, active: $active) {
      id
      name
      description
      active
    }
  }
`,pe=`
  mutation UpdatePostCategories($postCategories: [UpdatePostCategoryInput!]!) {
    updatePostCategories(postCategories: $postCategories) {
      id
      name
      description
      active
    }
  }
`,Ce=`
  mutation UpdatePostCategory($id: ID!, $name: String, $description: String, $active: Boolean) {
    updatePostCategory(id: $id, name: $name, description: $description, active: $active) {
      id
      name
      description
      active
    }
  }
`,me=`
  mutation SoftDeletePostCategories($ids: [ID!]!) {
    softDeletePostCategories(ids: $ids) {
      id
      name
      description
      active
    }
  }
`,ue=`
  mutation RestorePostCategories($ids: [ID!]!) {
    restorePostCategories(ids: $ids) {
      id
      name
      description
      active
    }
  }
`,ye=`
  mutation HardDeletePostCategories($ids: [ID!]!) {
    hardDeletePostCategories(ids: $ids)
  }
`,Pe=`
  mutation SoftDeletePostCategory($id: ID!) {
    softDeletePostCategory(id: $id) {
      id
      name
      description
      active
    }
  }
`,he=`
  mutation RestorePostCategory($id: ID!) {
    restorePostCategory(id: $id) {
      id
      name
      description
      active
    }
  }
`,_e=`
  mutation HardDeletePostCategory($id: ID!) {
    hardDeletePostCategory(id: $id)
  }
`;var ve=`
  query GetPostCategoryStatsAndData(
    $pagination: PaginationInput
    $getDeletedPostCategoriesPagination: PaginationInput
  ) {
    getPostCategoryStats {
      postCategoryLength
      activePostCategoryLength
      deletedPostCategoryLength
    }
    getPostCategories(pagination: $pagination) {
      id
      name
      description
      active
    }
    getDeletedPostCategories(pagination: $getDeletedPostCategoriesPagination) {
      id
      name
      description
      active
    }
  }
`,fe=`
  query GetPostCategories($pagination: PaginationInput) {
    getPostCategories(pagination: $pagination) {
      id
      name
      description
      active
    }
  }
`,be=`
  query GetDeletedPostCategories($pagination: PaginationInput) {
    getDeletedPostCategories(pagination: $pagination) {
      id
      name
      description
      active
    }
  }
`,Se=`
  query GetPostCategoryById($id: ID!) {
    getPostCategoryById(id: $id) {
      id
      name
      description
      active
    }
  }
`,Ee=`
  query GetDeletedPostCategoryById($id: ID!) {
    getDeletedPostCategoryById(id: $id) {
      id
      name
      description
      active
    }
  }
`;var Te=(()=>{class a{constructor(e){this.http=e,this.graphUrl=`${H.GraphApi}/graphql`}getPostCategoryStatsAndData(e,o){let t=ve,n={pagination:e,getDeletedPostCategoriesPagination:o};return console.log(`GraphQL Query:
`,t),console.log(`Variables:
`,JSON.stringify(n,null,2)),this.http.post(this.graphUrl,{query:t,variables:n})}getPostCategories(e=1,o=10,t="name",n="ASC"){let c={page:e,limit:o,sortBy:t,sortOrder:n};return this.http.post(this.graphUrl,{query:fe,variables:{pagination:c}})}getDeletedPostCategories(e=1,o=10,t="name",n="ASC"){let c={page:e,limit:o,sortBy:t,sortOrder:n};return this.http.post(this.graphUrl,{query:be,variables:{pagination:c}})}getPostCategoryById(e){return this.http.post(this.graphUrl,{query:Se,variables:{id:e}})}getDeletedPostCategoryById(e){return this.http.post(this.graphUrl,{query:Ee,variables:{id:e}})}createPostCategory(e){let{name:o,description:t,active:n=!0}=e;return this.http.post(this.graphUrl,{query:ce,variables:{name:o,description:t,active:n}})}createPostCategories(e){return this.http.post(this.graphUrl,{query:de,variables:{postCategories:e}})}updatePostCategory(e){let{id:o,name:t,description:n,active:c}=e;return this.http.post(this.graphUrl,{query:Ce,variables:{id:o,name:t,description:n,active:c}})}updatePostCategories(e){return this.http.post(this.graphUrl,{query:pe,variables:{postCategories:e}})}softDeletePostCategory(e){return this.http.post(this.graphUrl,{query:Pe,variables:{id:e}})}softDeletePostCategories(e){return this.http.post(this.graphUrl,{query:me,variables:{ids:e}})}restorePostCategory(e){return this.http.post(this.graphUrl,{query:he,variables:{id:e}})}restorePostCategories(e){return this.http.post(this.graphUrl,{query:ue,variables:{ids:e}})}hardDeletePostCategory(e){return this.http.post(this.graphUrl,{query:_e,variables:{id:e}})}hardDeletePostCategories(e){return this.http.post(this.graphUrl,{query:ye,variables:{ids:e}})}static{this.\u0275fac=function(o){return new(o||a)(F(B))}}static{this.\u0275prov=k({token:a,factory:a.\u0275fac,providedIn:"root"})}}return a})();var xe=()=>[10,20,30],De=a=>({"table-secondary":a}),we=a=>({"mb-3":a});function Re(a,P){if(a&1){let e=_();r(0,"button",41),p("click",function(){u(e);let t=m();return y(t.deleteSelectedPostCategories())}),C(1,"i",42),l(2,"Delete Selected "),i()}}function Me(a,P){if(a&1){let e=_();r(0,"button",43),p("click",function(){u(e);let t=m();return y(t.editSelectedPostCategories())}),C(1,"i",44),l(2,"Edit Selected "),i()}}function Ge(a,P){if(a&1){let e=_();r(0,"tr",45)(1,"td",46)(2,"input",47),w("ngModelChange",function(t){let n=u(e).$implicit;return O(n.selected,t)||(n.selected=t),y(t)}),p("change",function(){u(e);let t=m();return y(t.updateSelectedActivePostCategories())}),i()(),r(3,"td",46),l(4),i(),r(5,"td",46),l(6),i(),r(7,"td"),l(8),i(),r(9,"td"),l(10),i(),r(11,"td",46)(12,"button",48),p("click",function(){let t=u(e).$implicit,n=m();return y(n.editPostCategory(t))}),C(13,"i",49),i(),r(14,"button",50),p("click",function(){let t=u(e).$implicit,n=m();return y(n.deletePostCategory(t.id))}),C(15,"i",51),i()()()}if(a&2){let e=P.$implicit,o=P.index,t=m();g("ngClass",x(10,De,e.selected)),s(),g("width",50),s(),I("ngModel",e.selected),s(),g("width",80),s(),T("",o+t.activePostCategoryPagination.limit*(t.activePostCategoryPagination.page-1)+1," "),s(),g("width",80),s(),v(e.id),s(2),v(e.name),s(2),v(e.description),s(),g("width",100)}}function ke(a,P){if(a&1){let e=_();r(0,"button",52),p("click",function(){u(e);let t=m();return y(t.restoreSelectedPostCategories())}),C(1,"i",53),l(2," Restore Selected "),i()}}function Fe(a,P){if(a&1){let e=_();r(0,"tr",45)(1,"td",46)(2,"input",47),w("ngModelChange",function(t){let n=u(e).$implicit;return O(n.selected,t)||(n.selected=t),y(t)}),p("change",function(){u(e);let t=m();return y(t.updateSelectedDeletedPostCategories())}),i()(),r(3,"td",46),l(4),i(),r(5,"td",46),l(6),i(),r(7,"td"),l(8),i(),r(9,"td"),l(10),i(),r(11,"td",46)(12,"button",54),p("click",function(){let t=u(e).$implicit,n=m();return y(n.restorePostCategory(t.id))}),C(13,"i",55),i()()()}if(a&2){let e=P.$implicit,o=P.index,t=m();g("ngClass",x(10,De,e.selected)),s(),g("width",50),s(),I("ngModel",e.selected),s(),g("width",80),s(),T(" ",o+t.deletedPostCategoryPagination.limit*(t.deletedPostCategoryPagination.page-1)+1," "),s(),g("width",80),s(),v(e.id),s(2),v(e.name),s(2),v(e.description),s(),g("width",100)}}function $e(a,P){if(a&1){let e=_();U(0),r(1,"button",64),p("click",function(){u(e);let t=m().index,n=m();return y(n.removePostCategory(t))}),C(2,"i",42),l(3,"Remove "),i(),q()}}function Ve(a,P){if(a&1&&(r(0,"div",56)(1,"div",57)(2,"div",58)(3,"label",59),l(4,"Name"),i(),C(5,"input",60),i(),r(6,"div",58)(7,"label",61),l(8,"Description"),i(),C(9,"input",62),i()(),h(10,$e,4,0,"ng-container",63),i()),a&2){let e=P.index,o=m();g("ngClass",x(3,we,e<o.postCategoriesFormArray.controls.length-1)),s(),g("formGroupName",e),s(9),g("ngIf",o.currentForm.get("postCategories").value.length>1)}}function Ue(a,P){if(a&1){let e=_();r(0,"button",65),p("click",function(){u(e);let t=m();return y(t.addPostCategory())}),C(1,"i",16),l(2,"Add More "),i()}}var d=1,Ae=(()=>{class a{constructor(e,o,t){this.postCategoryService=e,this.fb=o,this.el=t,this.postCategoryData={getPostCategoryStats:{activePostCategoryLength:0,deletedPostCategoryLength:0,postCategoryLength:0},getDeletedPostCategories:[],getPostCategories:[]},this.postCategories=[],this.deletedPostCategories=[],this.needUpdate=!1,this.deletedPostCategoryCount=0,this.postCategoryModalTitle="Add PostCategory",this.activePostCategoryPagination={page:1,limit:10,sortBy:"name",sortOrder:"ASC"},this.deletedPostCategoryPagination={page:1,limit:10,sortBy:"name",sortOrder:"ASC"},this.totalActivePostCategories=0,this.totalDeletedPostCategories=0,this.selectedActivePostCategories=[],this.selectedDeletedPostCategories=[]}ngAfterViewInit(){console.log("ngAfterViewInit",d++),this.postCategoryModalElement=this.el.nativeElement.querySelector("#postCategoryModal"),this.postCategoryModalOptions={backdrop:!1,keyboard:!1},this.postCategoryModal=new bootstrap.Modal(this.postCategoryModalElement,this.postCategoryModalOptions)}ngOnInit(){console.log("ngOnInit",d++),this.loadPostCategoryData(),this.initForm()}updateSelectedActivePostCategories(){console.log("updateSelectedActivePostCategories",d++),this.selectedActivePostCategories=this.postCategories.filter(e=>e.selected).map(e=>e.id)}updateSelectedDeletedPostCategories(){console.log("updateSelectedDeletedPostCategories",d++),this.selectedDeletedPostCategories=this.deletedPostCategories.filter(e=>e.selected).map(e=>e.id)}loadPostCategoryData(){console.log("loadPostCategoryData",d++),this.postCategoryService.getPostCategoryStatsAndData(this.activePostCategoryPagination,this.deletedPostCategoryPagination).subscribe({next:e=>{this.postCategoryData=e.data,this.postCategories=this.postCategoryData.getPostCategories,this.deletedPostCategories=this.postCategoryData.getDeletedPostCategories,this.totalActivePostCategories=this.postCategoryData.getPostCategoryStats.activePostCategoryLength,this.totalDeletedPostCategories=this.postCategoryData.getPostCategoryStats.deletedPostCategoryLength,this.selectedActivePostCategories=[],this.selectedDeletedPostCategories=[],this.updateSelectedActivePostCategories(),this.updateSelectedDeletedPostCategories()},error:e=>console.error("Error fetching postCategory data:",e)})}initForm(){console.log("initForm",d++),this.currentForm=this.fb.group({postCategories:this.fb.array([this.createPostCategoryForm()])})}createPostCategoryForm(){return console.log("createPostCategoryForm",d++),this.fb.group({name:["",f.required],description:["",f.required]})}get postCategoriesFormArray(){return this.currentForm.get("postCategories")}addPostCategory(){console.log("addPostCategory",d++),this.postCategoriesFormArray.push(this.createPostCategoryForm())}removePostCategory(e){console.log("removePostCategory",d++);let t=this.postCategoriesFormArray.at(e).value.id,n=this.postCategories.find(c=>c.id===t);n&&(n.selected=!1),this.postCategoriesFormArray.length>1&&this.postCategoriesFormArray.removeAt(e)}savePostCategory(){if(console.log("savePostCategory",d++),this.currentForm.invalid)return;let e=this.currentForm.value.postCategories;this.needUpdate?this.postCategoryService.updatePostCategories(e).subscribe({next:o=>{o.data.updatePostCategories.forEach(n=>{let c=this.postCategories.findIndex(D=>D.id===n.id);if(c!==-1){let D=A(A({},this.postCategories[c]),n);this.postCategories[c]=D}}),this.postCategoryModal.hide()},error:o=>console.error("Update error:",o)}):this.postCategoryService.createPostCategories(e).subscribe({next:()=>{this.loadPostCategoryData(),this.postCategoryModal.hide()},error:o=>console.error("Create error:",o)})}openPostCategoryModal(){console.log("openPostCategoryModal",d++),this.postCategoryModalTitle="Add  PostCategories",this.needUpdate=!1,this.postCategoriesFormArray.clear(),this.addPostCategory(),this.postCategoryModal.show()}openMultipleEditModal(e){console.log("openMultipleEditModal",d++),this.postCategoryModalTitle="Edit Multiple PostCategories",this.needUpdate=!0;let o=this.postCategoriesFormArray;o.clear(),e.forEach(t=>{o.push(this.fb.group({id:[t.id],name:[t.name,f.required],description:[t.description,f.required],active:[t.active]}))}),this.postCategoryModal.show()}deleteSelectedPostCategories(){console.log("deleteSelectedPostCategories",d++);let e=this.getSelectedPostCategories(this.postCategories);e.length&&this.postCategoryService.softDeletePostCategories(e).subscribe(()=>this.loadPostCategoryData())}restoreSelectedPostCategories(){console.log("restoreSelectedPostCategories",d++);let e=this.getSelectedPostCategories(this.deletedPostCategories);e.length&&this.postCategoryService.restorePostCategories(e).subscribe(()=>this.loadPostCategoryData())}editSelectedPostCategories(){console.log("editSelectedPostCategories",d++);let e=this.getSelectedPostCategories(this.postCategories);if(!e.length)return;let o=this.postCategories.filter(t=>e.includes(t.id));this.openMultipleEditModal(o)}getSelectedPostCategories(e){return console.log("getSelectedPostCategories",d++),e.filter(o=>o.selected).map(o=>o.id)}togglePostCategorySelection(e){console.log("togglePostCategorySelection",d++),e.selected=!e.selected}editPostCategory(e){console.log("editPostCategory",d++),this.postCategoryModalTitle="Update PostCategory",this.needUpdate=!0;let o=this.postCategoriesFormArray;o.clear(),o.push(this.fb.group({id:[e.id],name:[e.name,f.required],description:[e.description,f.required],active:[e.active]})),this.postCategoryModal.show()}deletePostCategory(e){console.log("deletePostCategory",d++),this.postCategoryService.softDeletePostCategory(e).subscribe(()=>this.loadPostCategoryData())}restorePostCategory(e){console.log("restorePostCategory",d++),this.postCategoryService.restorePostCategory(e).subscribe(()=>this.loadPostCategoryData())}changeActivePage(e){console.log("changeActivePage",d++),this.activePostCategoryPagination.page!==e&&(this.activePostCategoryPagination.page=e,this.postCategoryService.getPostCategories(e,this.activePostCategoryPagination.limit).subscribe(o=>{this.postCategories=o.data.getPostCategories}))}changeActivePageSize(e){console.log("changeActivePageSize",d++),this.activePostCategoryPagination.limit!==e&&(this.activePostCategoryPagination.limit=e,this.activePostCategoryPagination.page=1,this.postCategoryService.getPostCategories(1,e).subscribe(o=>{this.postCategories=o.data.getPostCategories}))}changeDeletedPage(e){console.log("changeDeletedPage",d++),this.deletedPostCategoryPagination.page!==e&&(this.deletedPostCategoryPagination.page=e,this.postCategoryService.getDeletedPostCategories(e,this.deletedPostCategoryPagination.limit).subscribe(o=>{this.deletedPostCategories=o.data.getDeletedPostCategories}))}changeDeletedPageSize(e){console.log("changeDeletedPageSize",d++),this.deletedPostCategoryPagination.limit!==e&&(this.deletedPostCategoryPagination.limit=e,this.deletedPostCategoryPagination.page=1,this.postCategoryService.getDeletedPostCategories(1,e).subscribe(o=>{this.deletedPostCategories=o.data.getDeletedPostCategories}))}static{this.\u0275fac=function(o){return new(o||a)(E(Te),E(re),E(V))}}static{this.\u0275cmp=$({type:a,selectors:[["app-post-category"]],decls:85,vars:20,consts:[[1,"w-100","h-100","overflow-only-y","d-flex","flex-column","position-absolute"],[1,"navbar","navbar-expand-lg","navbar-light","bg-light","px-3"],[1,"navbar-brand",3,"routerLink"],["type","button","data-bs-toggle","collapse","data-bs-target","#postCategoryNav","aria-controls","postCategoryNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","postCategoryNav",1,"collapse","navbar-collapse"],["id","pills-tab","role","tablist",1,"navbar-nav","me-auto","mb-2","mb-lg-0","nav","nav-pills"],["role","presentation",1,"nav-item"],["id","tab1a","data-bs-toggle","pill","data-bs-target","#1a","type","button","role","tab","aria-controls","1a","aria-selected","true",1,"nav-link","active"],["id","tab2a","data-bs-toggle","pill","data-bs-target","#2a","type","button","role","tab","aria-controls","2a","aria-selected","false",1,"nav-link"],[1,"tab-content","flex-grow-1","p-3","bg-white"],["id","1a","role","tabpanel","aria-labelledby","tab1a",1,"tab-pane","fade","show","active","position-relative","h-100"],[1,"position-absolute","h-100","w-100","d-flex","flex-column"],[1,"row","g-2","align-items-center"],[1,"col-12","ms-auto","d-flex"],[1,"btn","btn-success","text-white","flex-grow-1",3,"click"],[1,"fa","fa-plus","me-2"],["class","btn btn-danger ms-2 flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-secondary ms-2 flex-grow-1",3,"click",4,"ngIf"],[1,"flex-grow-1","position-relative"],[1,"position-absolute","overflow-y-auto","h-100","w-100"],[1,"table","table-responsive"],["class","align-middle",3,"ngClass",4,"ngFor","ngForOf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","2a","role","tabpanel","aria-labelledby","tab2a",1,"tab-pane","fade","position-relative","h-100"],["class","btn btn-secondary flex-grow-1",3,"click",4,"ngIf"],["id","postCategoryModal","tabindex","-1","aria-labelledby","postCategoryModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","postCategoryModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","ms-auto",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["formArrayName","postCategories"],["class","d-flex align-items-stretch border border-light rounded px-2 position-relative",3,"ngClass",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","class","btn btn-primary text-white",3,"click",4,"ngIf"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],[1,"btn","btn-danger","ms-2","flex-grow-1",3,"click"],[1,"fa","fa-trash","me-2"],[1,"btn","btn-secondary","ms-2","flex-grow-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"align-middle",3,"ngClass"],[3,"width"],["type","checkbox",3,"ngModelChange","change","ngModel"],[1,"btn","btn-dark","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger","btn-md",3,"click"],[1,"fa","fa-trash"],[1,"btn","btn-secondary","flex-grow-1",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"btn","btn-success","btn-md",3,"click"],[1,"fa","fa-refresh"],[1,"d-flex","align-items-stretch","border","border-light","rounded","px-2","position-relative",3,"ngClass"],[1,"py-3","flex-grow-1",3,"formGroupName"],[1,"form-group","p-2"],["for","postCategory-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","name","id","postCategory-name",1,"form-control"],["for","postCategory-gu-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","description","id","postCategory-gu-name",1,"form-control"],[4,"ngIf"],["type","button",1,"btn","btn-outline-danger","btn-sm","my-3","position-absolute","top-0","end-0","me-3",3,"click"],["type","button",1,"btn","btn-primary","text-white",3,"click"]],template:function(o,t){o&1&&(r(0,"div",0)(1,"nav",1)(2,"a",2),l(3,"Post Categories"),i(),r(4,"button",3),C(5,"span",4),i(),r(6,"div",5)(7,"ul",6)(8,"li",7)(9,"button",8),l(10," Active Post Categories "),i()(),r(11,"li",7)(12,"button",9),l(13," Deleted Post Categories "),i()()()()(),r(14,"div",10)(15,"div",11)(16,"div",12)(17,"div",13)(18,"div",14)(19,"button",15),p("click",function(){return t.openPostCategoryModal()}),C(20,"i",16),l(21," Add PostCategory "),i(),h(22,Re,3,0,"button",17)(23,Me,3,0,"button",18),i()(),r(24,"div",19)(25,"div",20)(26,"table",21)(27,"thead")(28,"tr"),C(29,"th"),r(30,"th"),l(31,"SR."),i(),r(32,"th"),l(33,"ID"),i(),r(34,"th"),l(35,"Name"),i(),r(36,"th"),l(37,"Description"),i(),r(38,"th"),l(39,"Actions"),i()()(),r(40,"tbody"),h(41,Ge,16,12,"tr",22),i()()()(),r(42,"div",23),p("currentPageChange",function(c){return t.changeActivePage(c)})("pageSizeChange",function(c){return t.changeActivePageSize(c)}),i()()(),r(43,"div",24)(44,"div",12)(45,"div",13)(46,"div",14),h(47,ke,3,0,"button",25),i()(),r(48,"div",19)(49,"div",20)(50,"table",21)(51,"thead")(52,"tr"),C(53,"th"),r(54,"th"),l(55,"Sr."),i(),r(56,"th"),l(57,"ID"),i(),r(58,"th"),l(59,"Name"),i(),r(60,"th"),l(61,"Description"),i(),r(62,"th"),l(63,"Actions"),i()()(),r(64,"tbody"),h(65,Fe,14,12,"tr",22),i()()()(),r(66,"div",23),p("currentPageChange",function(c){return t.changeDeletedPage(c)})("pageSizeChange",function(c){return t.changeDeletedPageSize(c)}),i()()()()(),r(67,"div",26)(68,"div",27)(69,"div",28)(70,"div",29)(71,"h5",30),l(72),i(),r(73,"button",31),p("click",function(){return t.postCategoryModal.hide()}),C(74,"i",32),i()(),r(75,"div",33)(76,"form",34)(77,"div",35),h(78,Ve,11,5,"div",36),i()()(),r(79,"div",37),h(80,Ue,3,0,"button",38),r(81,"button",39),p("click",function(){return t.savePostCategory()}),l(82," Save "),i(),r(83,"button",40),p("click",function(){return t.postCategoryModal.hide(!1)}),l(84," Close "),i()()()()()),o&2&&(s(2),g("routerLink","/post-management/post-category"),s(20),g("ngIf",t.selectedActivePostCategories.length>0),s(),g("ngIf",t.selectedActivePostCategories.length>0),s(18),g("ngForOf",t.postCategories),s(),g("currentPage",t.activePostCategoryPagination.page)("totalItems",t.totalActivePostCategories)("pageSize",t.activePostCategoryPagination.limit)("pageSizes",R(18,xe)),s(5),g("ngIf",t.selectedDeletedPostCategories.length>0),s(18),g("ngForOf",t.deletedPostCategories),s(),g("currentPage",t.deletedPostCategoryPagination.page)("totalItems",t.totalDeletedPostCategories)("pageSize",t.deletedPostCategoryPagination.limit)("pageSizes",R(19,xe)),s(6),T(" ",t.postCategoryModalTitle," "),s(4),g("formGroup",t.currentForm),s(2),g("ngForOf",t.postCategoriesFormArray.controls),s(2),g("ngIf",!t.needUpdate))},dependencies:[N,L,Y,j,se,le,Z,Q,W,J,K,ee,ie,te,oe,X]})}}return a})();var qe=[{path:"",component:Ae,data:{title:"Post Category",breadcrumb:"Post Category"}}],Ie=(()=>{class a{static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275mod=S({type:a})}static{this.\u0275inj=b({imports:[M.forChild(qe),M]})}}return a})();var dt=(()=>{class a{static{this.\u0275fac=function(o){return new(o||a)}}static{this.\u0275mod=S({type:a})}static{this.\u0275inj=b({imports:[z,Ie,ge,ne,ae]})}}return a})();export{dt as PostCategoryModule};
