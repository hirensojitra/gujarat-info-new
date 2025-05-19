import './polyfills.server.mjs';
import{f as at,m as ot,r as ct}from"./chunk-SIBFRYWF.mjs";import{a as H}from"./chunk-6R42DWSS.mjs";import"./chunk-NLHNYVOG.mjs";import{b as W,c as Y,d as S,f as J,g as K,j as Q,k as X,o as Z,p as tt,q as et,r as it,x as rt,y as nt,z as st}from"./chunk-G2SKTGLZ.mjs";import{$a as P,Ab as L,Bb as O,Cb as B,Ea as n,Fa as r,Ga as p,Ha as q,Ia as G,J as k,Ja as b,K as T,Ka as m,La as D,Lb as z,M as $,Q as V,R as C,Sa as a,Ta as v,Ua as E,Ub as j,W as u,Wa as A,X as h,Xa as N,Ya as M,aa as U,ab as x,na as o,oa as I,qc as R,wa as f,ya as l}from"./chunk-HA7GHLLK.mjs";import{a as w}from"./chunk-VVCT4QZE.mjs";var lt=`
  mutation CreateDistricts($districts: [DistrictInput]!) {
    createDistricts(districts: $districts) {
      name
      gu_name
    }
  }
`,dt=`
  mutation CreateDistrict($name: String!, $gu_name: String!, $is_deleted: Boolean!) {
    createDistrict(name: $name, gu_name: $gu_name, is_deleted: $is_deleted) {
      id
      name
      gu_name
    }
  }
`,mt=`
  mutation UpdateDistricts($districts: [UpdateDistrictInput]!) {
    updateDistricts(districts: $districts) {
      id
    }
  }
`,pt=`
  mutation UpdateDistrict($id: ID!, $name: String, $gu_name: String, $is_deleted: Boolean) {
    updateDistrict(id: $id, name: $name, gu_name: $gu_name, is_deleted: $is_deleted) {
      id
      name
      gu_name
    }
  }
`,Dt=`
  mutation Mutation($ids: [ID]!) {
    softDeleteDistricts(ids: $ids) {
      id
      name
      gu_name
      is_deleted
    }
  }
`,gt=`
  mutation Mutation($ids: [ID]!) {
    restoreDistricts(ids: $ids) {
      id
      name
      gu_name
    }
  }
`,ut=`
  mutation Mutation($ids: [ID]!) {
    hardDeleteDistricts(ids: $ids)
  }
`,ht=`
  mutation Mutation($softDeleteDistrictId: ID!) {
    softDeleteDistrict(id: $softDeleteDistrictId) {
      id
      name
      gu_name
    }
  }
`,_t=`
  mutation Mutation($restoreDistrictId: ID!) {
    restoreDistrict(id: $restoreDistrictId) {
      id
      name
      gu_name
    }
  }
`,ft=`
  mutation HardDeleteDistrict($id: ID!) {
    hardDeleteDistrict(id: $id)
  }
`;var bt=`
  query GetDistrictStats($pagination: PaginationInput, $getDeletedDistrictsPagination: PaginationInput) {
    getDistrictStats {
      activeDistrictLength
      deletedDistrictLength
      districtLength
    }
    getDistricts(pagination: $pagination) {
      id
      name
      gu_name
    }
    getDeletedDistricts(pagination: $getDeletedDistrictsPagination) {
      id
      name
      gu_name
    }
  }
`,vt=`
  query GetDistricts($pagination: PaginationInput) {
    getDistricts(pagination: $pagination) {
      id
      name
      gu_name
    }
  }
`,St=`
  query GetDeletedDistricts($pagination: PaginationInput) {
    getDeletedDistricts(pagination: $pagination) {
      id
      name
      gu_name
    }
  }
`,Tt=`
  query GetDistrictById($id: ID!) {
    getDistrictById(id: $id) {
      id
      name
      gu_name
    }
  }
`,Ct=`
  query GetDeletedDistrictById($id: ID!) {
    getDeletedDistrictById(id: $id) {
      id
      name
      gu_name
    }
  }
`;var It=(()=>{class s{constructor(t){this.http=t,this.graphUrl=H.GraphApi+"/graphql"}getDistrictStatsAndData(t,i){return this.http.post(this.graphUrl,{query:bt,variables:{pagination:t,getDeletedDistrictsPagination:i}})}getDistricts(t=1,i=10){let e={pagination:{page:t,limit:i,sortBy:"name",sortOrder:"ASC"}};return this.http.post(this.graphUrl,{query:vt,variables:e})}getDeletedDistricts(t=1,i=10){let e={pagination:{page:t,limit:i,sortBy:"name",sortOrder:"ASC"}};return this.http.post(this.graphUrl,{query:St,variables:e})}createDistricts(t){return this.http.post(this.graphUrl,{query:lt,variables:{districts:t}})}updateDistricts(t){return this.http.post(this.graphUrl,{query:mt,variables:{districts:t}})}softDeleteDistricts(t){return this.http.post(this.graphUrl,{query:Dt,variables:{ids:t}})}restoreDistricts(t){return this.http.post(this.graphUrl,{query:gt,variables:{ids:t}})}hardDeleteDistricts(t){return this.http.post(this.graphUrl,{query:ut,variables:{ids:t}})}softDeleteDistrict(t){return this.http.post(this.graphUrl,{query:ht,variables:{softDeleteDistrictId:t}})}restoreDistrict(t){return this.http.post(this.graphUrl,{query:_t,variables:{restoreDistrictId:t}})}getDistrictById(t){return this.http.post(this.graphUrl,{query:Tt,variables:{id:t}})}getDeletedDistrictById(t){return this.http.post(this.graphUrl,{query:Ct,variables:{id:t}})}createDistrict(t){let{name:i,gu_name:e}=t;return this.http.post(this.graphUrl,{query:dt,variables:{name:i,gu_name:e}})}updateDistrict(t){return this.http.post(this.graphUrl,{query:pt,variables:t})}hardDeleteDistrict(t){return this.http.post(this.graphUrl,{query:ft,variables:{id:t}})}static{this.\u0275fac=function(i){return new(i||s)($(j))}}static{this.\u0275prov=k({token:s,factory:s.\u0275fac,providedIn:"root"})}}return s})();var Et=()=>[10,20,30],xt=s=>({"table-secondary":s}),Nt=s=>({"mb-3":s});function Mt(s,_){if(s&1){let t=b();n(0,"button",41),m("click",function(){u(t);let e=D();return h(e.deleteSelectedDistricts())}),p(1,"i",42),a(2,"Delete Selected "),r()}}function Pt(s,_){if(s&1){let t=b();n(0,"button",43),m("click",function(){u(t);let e=D();return h(e.editSelectedDistricts())}),p(1,"i",44),a(2,"Edit Selected "),r()}}function Rt(s,_){if(s&1){let t=b();n(0,"tr",45)(1,"td",46)(2,"input",47),M("ngModelChange",function(e){let c=u(t).$implicit;return N(c.selected,e)||(c.selected=e),h(e)}),m("change",function(){u(t);let e=D();return h(e.updateSelectedActiveDistricts())}),r()(),n(3,"td",46),a(4),r(),n(5,"td",46),a(6),r(),n(7,"td"),a(8),r(),n(9,"td"),a(10),r(),n(11,"td",46)(12,"button",48),m("click",function(){let e=u(t).$implicit,c=D();return h(c.editDistrict(e))}),p(13,"i",49),r(),n(14,"button",50),m("click",function(){let e=u(t).$implicit,c=D();return h(c.deleteDistrict(e.id))}),p(15,"i",51),r()()()}if(s&2){let t=_.$implicit,i=_.index,e=D();l("ngClass",x(10,xt,t.selected)),o(),l("width",50),o(),A("ngModel",t.selected),o(),l("width",80),o(),E("",i+e.activeDistrictPagination.limit*(e.activeDistrictPagination.page-1)+1," "),o(),l("width",80),o(),v(t.id),o(2),v(t.name),o(2),v(t.gu_name),o(),l("width",100)}}function Ft(s,_){if(s&1){let t=b();n(0,"button",52),m("click",function(){u(t);let e=D();return h(e.restoreSelectedDistricts())}),p(1,"i",53),a(2," Restore Selected "),r()}}function kt(s,_){if(s&1){let t=b();n(0,"tr",45)(1,"td",46)(2,"input",47),M("ngModelChange",function(e){let c=u(t).$implicit;return N(c.selected,e)||(c.selected=e),h(e)}),m("change",function(){u(t);let e=D();return h(e.updateSelectedDeletedDistricts())}),r()(),n(3,"td",46),a(4),r(),n(5,"td",46),a(6),r(),n(7,"td"),a(8),r(),n(9,"td"),a(10),r(),n(11,"td",46)(12,"button",54),m("click",function(){let e=u(t).$implicit,c=D();return h(c.restoreDistrict(e.id))}),p(13,"i",55),r()()()}if(s&2){let t=_.$implicit,i=_.index,e=D();l("ngClass",x(10,xt,t.selected)),o(),l("width",50),o(),A("ngModel",t.selected),o(),l("width",80),o(),E(" ",i+e.deletedDistrictPagination.limit*(e.deletedDistrictPagination.page-1)+1," "),o(),l("width",80),o(),v(t.id),o(2),v(t.name),o(2),v(t.gu_name),o(),l("width",100)}}function $t(s,_){if(s&1){let t=b();q(0),n(1,"button",64),m("click",function(){u(t);let e=D().index,c=D();return h(c.removeDistrict(e))}),p(2,"i",42),a(3,"Remove "),r(),G()}}function Vt(s,_){if(s&1&&(n(0,"div",56)(1,"div",57)(2,"div",58)(3,"label",59),a(4,"Name"),r(),p(5,"input",60),r(),n(6,"div",58)(7,"label",61),a(8,"Gujarati Name"),r(),p(9,"input",62),r()(),f(10,$t,4,0,"ng-container",63),r()),s&2){let t=_.index,i=D();l("ngClass",x(3,Nt,t<i.districtsFormArray.controls.length-1)),o(),l("formGroupName",t),o(9),l("ngIf",i.currentForm.get("districts").value.length>1)}}function Ut(s,_){if(s&1){let t=b();n(0,"button",65),m("click",function(){u(t);let e=D();return h(e.addDistrict())}),p(1,"i",16),a(2,"Add More "),r()}}var d=1,yt=(()=>{class s{constructor(t,i,e){this.districtService=t,this.fb=i,this.el=e,this.districtData={getDistrictStats:{activeDistrictLength:0,deletedDistrictLength:0,districtLength:0},getDeletedDistricts:[],getDistricts:[]},this.districts=[],this.deletedDistricts=[],this.needUpdate=!1,this.deletedDistrictCount=0,this.districtModalTitle="Add District",this.activeDistrictPagination={page:1,limit:10,sortBy:"name",sortOrder:"ASC"},this.deletedDistrictPagination={page:1,limit:10,sortBy:"name",sortOrder:"ASC"},this.totalActiveDistricts=0,this.totalDeletedDistricts=0,this.selectedActiveDistricts=[],this.selectedDeletedDistricts=[]}ngAfterViewInit(){console.log("ngAfterViewInit",d++),this.districtModalElement=this.el.nativeElement.querySelector("#districtModal"),this.districtModalOptions={backdrop:!1,keyboard:!1},this.districtModal=new bootstrap.Modal(this.districtModalElement,this.districtModalOptions)}ngOnInit(){console.log("ngOnInit",d++),this.loadDistrictData(),this.initForm()}updateSelectedActiveDistricts(){console.log("updateSelectedActiveDistricts",d++),this.selectedActiveDistricts=this.districts.filter(t=>t.selected).map(t=>t.id)}updateSelectedDeletedDistricts(){console.log("updateSelectedDeletedDistricts",d++),this.selectedDeletedDistricts=this.deletedDistricts.filter(t=>t.selected).map(t=>t.id)}loadDistrictData(){console.log("loadDistrictData",d++),this.districtService.getDistrictStatsAndData(this.activeDistrictPagination,this.deletedDistrictPagination).subscribe({next:t=>{this.districtData=t.data,this.districts=this.districtData.getDistricts,this.deletedDistricts=this.districtData.getDeletedDistricts,this.totalActiveDistricts=this.districtData.getDistrictStats.activeDistrictLength,this.totalDeletedDistricts=this.districtData.getDistrictStats.deletedDistrictLength},error:t=>console.error("Error fetching district data:",t)})}initForm(){console.log("initForm",d++),this.currentForm=this.fb.group({districts:this.fb.array([this.createDistrictForm()])})}createDistrictForm(){return console.log("createDistrictForm",d++),this.fb.group({name:["",S.required],gu_name:["",S.required]})}get districtsFormArray(){return this.currentForm.get("districts")}addDistrict(){console.log("addDistrict",d++),this.districtsFormArray.push(this.createDistrictForm())}removeDistrict(t){console.log("removeDistrict",d++);let e=this.districtsFormArray.at(t).value.id,c=this.districts.find(g=>g.id===e);c&&(c.selected=!1),this.districtsFormArray.length>1&&this.districtsFormArray.removeAt(t)}saveDistrict(){if(console.log("saveDistrict",d++),this.currentForm.invalid)return;let t=this.currentForm.value.districts;this.needUpdate?this.districtService.updateDistricts(t).subscribe({next:i=>{i.data.updateDistricts.forEach(c=>{let g=this.districts.findIndex(y=>y.id===c.id);if(g!==-1){let y=w(w({},this.districts[g]),c);this.districts[g]=y}}),this.districtModal.hide()},error:i=>console.error("Update error:",i)}):this.districtService.createDistricts(t).subscribe({next:()=>{this.loadDistrictData(),this.districtModal.hide()},error:i=>console.error("Create error:",i)})}openDistrictModal(){console.log("openDistrictModal",d++),this.districtModalTitle="Add New Districts",this.needUpdate=!1,this.districtsFormArray.clear(),this.addDistrict(),this.districtModal.show()}openMultipleEditModal(t){console.log("openMultipleEditModal",d++),this.districtModalTitle="Edit Multiple Districts",this.needUpdate=!0;let i=this.districtsFormArray;i.clear(),t.forEach(e=>{i.push(this.fb.group({id:[e.id],name:[e.name,S.required],gu_name:[e.gu_name,S.required],is_deleted:[e.is_deleted]}))}),this.districtModal.show()}deleteSelectedDistricts(){console.log("deleteSelectedDistricts",d++);let t=this.getSelectedDistricts(this.districts);t.length&&this.districtService.softDeleteDistricts(t).subscribe(()=>this.loadDistrictData())}restoreSelectedDistricts(){console.log("restoreSelectedDistricts",d++);let t=this.getSelectedDistricts(this.deletedDistricts);t.length&&this.districtService.restoreDistricts(t).subscribe(()=>this.loadDistrictData())}editSelectedDistricts(){console.log("editSelectedDistricts",d++);let t=this.getSelectedDistricts(this.districts);if(!t.length)return;let i=this.districts.filter(e=>t.includes(e.id));this.openMultipleEditModal(i)}getSelectedDistricts(t){return console.log("getSelectedDistricts",d++),t.filter(i=>i.selected).map(i=>i.id)}toggleDistrictSelection(t){console.log("toggleDistrictSelection",d++),t.selected=!t.selected}editDistrict(t){console.log("editDistrict",d++),this.districtModalTitle="Update District",this.needUpdate=!0;let i=this.districtsFormArray;i.clear(),i.push(this.fb.group({id:[t.id],name:[t.name,S.required],gu_name:[t.gu_name,S.required],is_deleted:[t.is_deleted]})),this.districtModal.show()}deleteDistrict(t){console.log("deleteDistrict",d++),this.districtService.softDeleteDistrict(t).subscribe(()=>this.loadDistrictData())}restoreDistrict(t){console.log("restoreDistrict",d++),this.districtService.restoreDistrict(t).subscribe(()=>this.loadDistrictData())}changeActivePage(t){console.log("changeActivePage",d++),this.activeDistrictPagination.page!==t&&(this.activeDistrictPagination.page=t,this.districtService.getDistricts(t,this.activeDistrictPagination.limit).subscribe(i=>{this.districts=i.data.getDistricts}))}changeActivePageSize(t){console.log("changeActivePageSize",d++),this.activeDistrictPagination.limit!==t&&(this.activeDistrictPagination.limit=t,this.activeDistrictPagination.page=1,this.districtService.getDistricts(1,t).subscribe(i=>{this.districts=i.data.getDistricts}))}changeDeletedPage(t){console.log("changeDeletedPage",d++),this.deletedDistrictPagination.page!==t&&(this.deletedDistrictPagination.page=t,this.districtService.getDeletedDistricts(t,this.deletedDistrictPagination.limit).subscribe(i=>{this.deletedDistricts=i.data.getDeletedDistricts}))}changeDeletedPageSize(t){console.log("changeDeletedPageSize",d++),this.deletedDistrictPagination.limit!==t&&(this.deletedDistrictPagination.limit=t,this.deletedDistrictPagination.page=1,this.districtService.getDeletedDistricts(1,t).subscribe(i=>{this.deletedDistricts=i.data.getDeletedDistricts}))}static{this.\u0275fac=function(i){return new(i||s)(I(It),I(rt),I(U))}}static{this.\u0275cmp=V({type:s,selectors:[["app-district-new"]],decls:85,vars:19,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column"],[1,"navbar","navbar-expand-lg","navbar-light","bg-light","px-3"],["href","#",1,"navbar-brand"],["type","button","data-bs-toggle","collapse","data-bs-target","#districtNav","aria-controls","districtNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","districtNav",1,"collapse","navbar-collapse"],["id","pills-tab","role","tablist",1,"navbar-nav","me-auto","mb-2","mb-lg-0","nav","nav-pills"],["role","presentation",1,"nav-item"],["id","tab1a","data-bs-toggle","pill","data-bs-target","#1a","type","button","role","tab","aria-controls","1a","aria-selected","true",1,"nav-link","active"],["id","tab2a","data-bs-toggle","pill","data-bs-target","#2a","type","button","role","tab","aria-controls","2a","aria-selected","false",1,"nav-link"],[1,"tab-content","flex-grow-1","p-3","bg-white"],["id","1a","role","tabpanel","aria-labelledby","tab1a",1,"tab-pane","fade","show","active","position-relative","h-100"],[1,"position-absolute","h-100","w-100","d-flex","flex-column"],[1,"row","g-2","align-items-center"],[1,"col-12","ms-auto","d-flex"],[1,"btn","btn-success","text-white","flex-grow-1",3,"click"],[1,"fa","fa-plus","me-2"],["class","btn btn-danger ms-2 flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-secondary ms-2 flex-grow-1",3,"click",4,"ngIf"],[1,"flex-grow-1","position-relative"],[1,"position-absolute","overflow-y-auto","h-100","w-100"],[1,"table","table-responsive"],["class","align-middle",3,"ngClass",4,"ngFor","ngForOf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","2a","role","tabpanel","aria-labelledby","tab2a",1,"tab-pane","fade","position-relative","h-100"],["class","btn btn-secondary flex-grow-1",3,"click",4,"ngIf"],["id","districtModal","tabindex","-1","aria-labelledby","districtModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","districtModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","ms-auto",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["formArrayName","districts"],["class","d-flex align-items-stretch border border-light rounded px-2 position-relative",3,"ngClass",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","class","btn btn-primary text-white",3,"click",4,"ngIf"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],[1,"btn","btn-danger","ms-2","flex-grow-1",3,"click"],[1,"fa","fa-trash","me-2"],[1,"btn","btn-secondary","ms-2","flex-grow-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"align-middle",3,"ngClass"],[3,"width"],["type","checkbox",3,"ngModelChange","change","ngModel"],[1,"btn","btn-dark","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger","btn-md",3,"click"],[1,"fa","fa-trash"],[1,"btn","btn-secondary","flex-grow-1",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"btn","btn-success","btn-md",3,"click"],[1,"fa","fa-refresh"],[1,"d-flex","align-items-stretch","border","border-light","rounded","px-2","position-relative",3,"ngClass"],[1,"py-3","flex-grow-1",3,"formGroupName"],[1,"form-group","p-2"],["for","district-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","name","id","district-name",1,"form-control"],["for","district-gu-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","gu_name","id","district-gu-name",1,"form-control"],[4,"ngIf"],["type","button",1,"btn","btn-outline-danger","btn-sm","my-3","position-absolute","top-0","end-0","me-3",3,"click"],["type","button",1,"btn","btn-primary","text-white",3,"click"]],template:function(i,e){i&1&&(n(0,"div",0)(1,"nav",1)(2,"a",2),a(3,"Districts"),r(),n(4,"button",3),p(5,"span",4),r(),n(6,"div",5)(7,"ul",6)(8,"li",7)(9,"button",8),a(10," Active Districts "),r()(),n(11,"li",7)(12,"button",9),a(13," Deleted Districts "),r()()()()(),n(14,"div",10)(15,"div",11)(16,"div",12)(17,"div",13)(18,"div",14)(19,"button",15),m("click",function(){return e.openDistrictModal()}),p(20,"i",16),a(21," Add District "),r(),f(22,Mt,3,0,"button",17)(23,Pt,3,0,"button",18),r()(),n(24,"div",19)(25,"div",20)(26,"table",21)(27,"thead")(28,"tr"),p(29,"th"),n(30,"th"),a(31,"SR."),r(),n(32,"th"),a(33,"ID"),r(),n(34,"th"),a(35,"Name"),r(),n(36,"th"),a(37,"Gujarati Name"),r(),n(38,"th"),a(39,"Actions"),r()()(),n(40,"tbody"),f(41,Rt,16,12,"tr",22),r()()()(),n(42,"div",23),m("currentPageChange",function(g){return e.changeActivePage(g)})("pageSizeChange",function(g){return e.changeActivePageSize(g)}),r()()(),n(43,"div",24)(44,"div",12)(45,"div",13)(46,"div",14),f(47,Ft,3,0,"button",25),r()(),n(48,"div",19)(49,"div",20)(50,"table",21)(51,"thead")(52,"tr"),p(53,"th"),n(54,"th"),a(55,"Sr."),r(),n(56,"th"),a(57,"ID"),r(),n(58,"th"),a(59,"Name"),r(),n(60,"th"),a(61,"Gujarati Name"),r(),n(62,"th"),a(63,"Actions"),r()()(),n(64,"tbody"),f(65,kt,14,12,"tr",22),r()()()(),n(66,"div",23),m("currentPageChange",function(g){return e.changeDeletedPage(g)})("pageSizeChange",function(g){return e.changeDeletedPageSize(g)}),r()()()()(),n(67,"div",26)(68,"div",27)(69,"div",28)(70,"div",29)(71,"h5",30),a(72),r(),n(73,"button",31),m("click",function(){return e.districtModal.hide()}),p(74,"i",32),r()(),n(75,"div",33)(76,"form",34)(77,"div",35),f(78,Vt,11,5,"div",36),r()()(),n(79,"div",37),f(80,Ut,3,0,"button",38),n(81,"button",39),m("click",function(){return e.saveDistrict()}),a(82," Save "),r(),n(83,"button",40),m("click",function(){return e.districtModal.hide(!1)}),a(84," Close "),r()()()()()),i&2&&(o(22),l("ngIf",e.selectedActiveDistricts.length>0),o(),l("ngIf",e.selectedActiveDistricts.length>0),o(18),l("ngForOf",e.districts),o(),l("currentPage",e.activeDistrictPagination.page)("totalItems",e.totalActiveDistricts)("pageSize",e.activeDistrictPagination.limit)("pageSizes",P(17,Et)),o(5),l("ngIf",e.selectedDeletedDistricts.length>0),o(18),l("ngForOf",e.deletedDistricts),o(),l("currentPage",e.deletedDistrictPagination.page)("totalItems",e.totalDeletedDistricts)("pageSize",e.deletedDistrictPagination.limit)("pageSizes",P(18,Et)),o(6),E(" ",e.districtModalTitle," "),o(4),l("formGroup",e.currentForm),o(2),l("ngForOf",e.districtsFormArray.controls),o(2),l("ngIf",!e.needUpdate))},dependencies:[L,O,B,at,ot,X,Y,W,J,K,Z,it,tt,et,Q]})}}return s})();var qt=[{path:"",component:yt,data:{title:"District New",breadcrumb:"District New"}}],wt=(()=>{class s{static{this.\u0275fac=function(i){return new(i||s)}}static{this.\u0275mod=C({type:s})}static{this.\u0275inj=T({imports:[R.forChild(qt),R]})}}return s})();var ce=(()=>{class s{static{this.\u0275fac=function(i){return new(i||s)}}static{this.\u0275mod=C({type:s})}static{this.\u0275inj=T({imports:[z,wt,ct,st,nt]})}}return s})();export{ce as DistrictNewModule};
