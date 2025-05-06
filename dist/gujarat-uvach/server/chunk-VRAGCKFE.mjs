import './polyfills.server.mjs';
import{f as me,m as pe,r as ge}from"./chunk-YJ3LUOSH.mjs";import"./chunk-ILF7YMS7.mjs";import{e as H,g as _}from"./chunk-S3WKFLAG.mjs";import"./chunk-5YCABAQK.mjs";import{b as J,c as X,d as S,f as Y,g as Z,j as ee,k as te,o as ae,p as ie,q as le,r as ne,s as oe,t as re,u as se,x as de,y as ue,z as ce}from"./chunk-EJYM4EAR.mjs";import{$a as M,Ab as B,Bb as j,Cb as W,Ea as i,Fa as l,Ga as T,Ha as q,Ia as K,J as U,Ja as v,K as x,Ka as c,Kb as Q,La as p,M as G,Q as O,R as D,Sa as o,Ta as b,Ua as C,Va as $,W as g,Wa as E,X as k,Xa as A,Ya as I,aa as R,ab as N,na as r,oa as w,pc as V,qb as z,wa as f,ya as u}from"./chunk-UPVURMLA.mjs";import{a as P,b as F,h as y}from"./chunk-VVCT4QZE.mjs";var ke=_`
  mutation CreateTalukas($talukas: [TalukaInput]!) {
    createTalukas(talukas: $talukas) {
      id
      name
      gu_name
      district_id
    }
  }
`,Te=_`
  mutation UpdateTalukas($talukas: [UpdateTalukaInput]!) {
    updateTalukas(talukas: $talukas) {
      id
      name
      gu_name
      district_id
    }
  }
`,_e=_`
  mutation SoftDeleteTaluka($id: ID!) {
    softDeleteTaluka(id: $id) {
      id
      name
    }
  }
`,he=_`
  mutation SoftDeleteTalukas($ids: [ID]!) {
    softDeleteTalukas(ids: $ids) {
      id
      name
    }
  }
`,fe=_`
  mutation RestoreTaluka($id: ID!) {
    restoreTaluka(id: $id) {
      id
      name
    }
  }
`,be=_`
  mutation RestoreTalukas($ids: [ID]!) {
    restoreTalukas(ids: $ids) {
      id
      name
    }
  }
`;var ve=_`
  query GetSelectedDistrictId {
    getSelectedDistrictId
  }
`,Se=_`
  query GetDistricts {
    getDistricts {
      id
      name
      gu_name
    }
  }
`,we=_`
  query GetTalukaStatsByDistrict(
    $district_id: ID
    $activePagination: PaginationInput
    $deletedPagination: PaginationInput
  ) {
    getTalukaStatsByDistrict(
      district_id: $district_id
      activePagination: $activePagination
      deletedPagination: $deletedPagination
    ) {
      selectedId
      totalActiveTalukasByDistrictId
      totalDeletedTalukasByDistrictId
      totalTalukasByDistrictId
      districts {
        id
        name
        gu_name
      }
      activeTalukasByDistrictId {
        id
        name
        gu_name
      }
      deletedTalukasByDistrictId {
        id
        name
        gu_name
      }
    }
  }
`,ye=_`
  query GetTalukas($district_id: ID!, $page: Int!, $limit: Int!) {
    getTalukas(
      district_id: $district_id
      pagination: { page: $page, limit: $limit }
    ) {
      id
      name
      gu_name
      district_id
    }
  }
`,xe=_`
  query GetDeletedTalukas($page: Int!, $limit: Int!) {
    getDeletedTalukas(pagination: { page: $page, limit: $limit }) {
      id
      name
      gu_name
      district_id
    }
  }
`;var De=(()=>{class n{constructor(e){this.apollo=e}getSelectedDistrictId(){return this.apollo.watchQuery({query:ve}).valueChanges}getAllDistricts(){return this.apollo.watchQuery({query:Se}).valueChanges}getTalukaStatsAndData(e,a,t){return this.apollo.watchQuery({query:we,variables:{district_id:e,activePagination:a,deletedPagination:t},fetchPolicy:"network-only"}).valueChanges}getTalukas(e,a,t){return this.apollo.watchQuery({query:ye,variables:{district_id:e,page:a,limit:t},fetchPolicy:"network-only"}).valueChanges}getDeletedTalukas(e,a){return this.apollo.watchQuery({query:xe,variables:{page:e,limit:a},fetchPolicy:"network-only"}).valueChanges}createTalukas(e){return this.apollo.mutate({mutation:ke,variables:{talukas:e}})}updateTalukas(e){return console.log({talukas:e}),this.apollo.mutate({mutation:Te,variables:{talukas:e}})}softDeleteTaluka(e){return this.apollo.mutate({mutation:_e,variables:{id:e}})}softDeleteTalukas(e){return this.apollo.mutate({mutation:he,variables:{ids:e}})}restoreTaluka(e){return this.apollo.mutate({mutation:fe,variables:{id:e}})}restoreTalukas(e){return this.apollo.mutate({mutation:be,variables:{ids:e}})}static{this.\u0275fac=function(a){return new(a||n)(G(H))}}static{this.\u0275prov=U({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})();var Ce=()=>[10,20,30],Ee=n=>({"table-secondary":n}),Pe=n=>({"mb-3":n});function Fe(n,m){if(n&1&&(i(0,"option",44),o(1),l()),n&2){let e=m.$implicit;u("ngValue",e.id),r(),$(" ",e.name," (",e.gu_name,") ")}}function $e(n,m){if(n&1){let e=v();i(0,"button",45),c("click",function(){g(e);let t=p();return k(t.deleteSelectedTalukas())}),T(1,"i",46),o(2," Delete Selected "),l()}}function Me(n,m){if(n&1){let e=v();i(0,"button",47),c("click",function(){g(e);let t=p();return k(t.editSelectedTalukas())}),T(1,"i",48),o(2," Edit Selected "),l()}}function Ve(n,m){if(n&1){let e=v();i(0,"tr",49)(1,"td")(2,"input",50),I("ngModelChange",function(t){let d=g(e).$implicit;return A(d.selected,t)||(d.selected=t),k(t)}),c("change",function(){g(e);let t=p();return k(t.updateSelectedActiveTalukas())}),l()(),i(3,"td"),o(4),l(),i(5,"td"),o(6),l(),i(7,"td"),o(8),l(),i(9,"td"),o(10),l(),i(11,"td")(12,"button",51),c("click",function(){let t=g(e).$implicit,d=p();return k(d.editTaluka(t))}),T(13,"i",52),l(),i(14,"button",53),c("click",function(){let t=g(e).$implicit,d=p();return k(d.deleteTaluka(t.id))}),T(15,"i",54),l()()()}if(n&2){let e=m.$implicit,a=m.index,t=p();u("ngClass",N(6,Ee,e.selected)),r(2),E("ngModel",e.selected),r(2),C("",a+t.activeTalukaPagination.limit*(t.activeTalukaPagination.page-1)+1," "),r(2),b(e.id),r(2),b(e.name),r(2),b(e.gu_name)}}function Le(n,m){if(n&1){let e=v();i(0,"button",55),c("click",function(){g(e);let t=p();return k(t.restoreSelectedTalukas())}),T(1,"i",56),o(2," Restore Selected "),l()}}function Ue(n,m){if(n&1){let e=v();i(0,"tr",49)(1,"td")(2,"input",50),I("ngModelChange",function(t){let d=g(e).$implicit;return A(d.selected,t)||(d.selected=t),k(t)}),c("change",function(){g(e);let t=p();return k(t.updateSelectedDeletedTalukas())}),l()(),i(3,"td"),o(4),l(),i(5,"td"),o(6),l(),i(7,"td"),o(8),l(),i(9,"td"),o(10),l(),i(11,"td")(12,"button",57),c("click",function(){let t=g(e).$implicit,d=p();return k(d.restoreTaluka(t.id))}),T(13,"i",58),l()()()}if(n&2){let e=m.$implicit,a=m.index,t=p();u("ngClass",N(6,Ee,e.selected)),r(2),E("ngModel",e.selected),r(2),C("",a+t.deletedTalukaPagination.limit*(t.deletedTalukaPagination.page-1)+1," "),r(2),b(e.id),r(2),b(e.name),r(2),b(e.gu_name)}}function Ge(n,m){n&1&&(i(0,"div",59)(1,"div",60)(2,"span",61),o(3,"Loading..."),l()()())}function Oe(n,m){if(n&1&&(i(0,"option",73),o(1),l()),n&2){let e=m.$implicit;u("value",e.id),r(),$(" ",e.name," (",e.gu_name,") ")}}function Re(n,m){if(n&1){let e=v();q(0),i(1,"button",74),c("click",function(){g(e);let t=p().index,d=p();return k(d.removeTaluka(t))}),T(2,"i",46),o(3,"Remove "),l(),K()}}function qe(n,m){if(n&1&&(i(0,"div",62)(1,"div",63)(2,"div",64)(3,"label",65),o(4,"Name"),l(),T(5,"input",66),l(),i(6,"div",64)(7,"label",67),o(8,"Gujarati Name"),l(),T(9,"input",68),l(),i(10,"div",64)(11,"label",69),o(12,"District"),l(),i(13,"select",70),f(14,Oe,2,3,"option",71),l()()(),f(15,Re,4,0,"ng-container",72),l()),n&2){let e=m.index,a=p();u("ngClass",N(4,Pe,e<a.talukasFormArray.controls.length-1)),r(),u("formGroupName",e),r(13),u("ngForOf",a.districts),r(),u("ngIf",a.talukasFormArray.length>1)}}function Ke(n,m){if(n&1){let e=v();i(0,"button",75),c("click",function(){g(e);let t=p();return k(t.addTaluka())}),T(1,"i",19),o(2,"Add More "),l()}}var s=1,Ae=(()=>{class n{constructor(e,a,t,d){this.talukaService=e,this.fb=a,this.el=t,this.cdr=d,this.selectedActiveTalukas=[],this.selectedDeletedTalukas=[],this.talukaData={},this.talukas=[],this.deletedTalukas=[],this.districts=[],this.needUpdate=!1,this.talukaModalOptions={backdrop:!1,keyboard:!1},this.talukaModalTitle="Add Taluka",this.activeTalukaPagination={page:1,limit:10},this.deletedTalukaPagination={page:1,limit:10},this.totalActiveTalukas=0,this.totalDeletedTalukas=0,this.selectedDistrictId="",this.loading=!0}ngAfterViewInit(){console.log(`${s++} - ngAfterViewInit`),this.talukaModalElement=this.el.nativeElement.querySelector("#talukaModal"),this.talukaModal=new bootstrap.Modal(this.talukaModalElement,this.talukaModalOptions)}ngOnDestroy(){console.log(`${s++} - ngOnDestroy`),this.talukaModal&&this.talukaModal.hide()}ngOnInit(){return y(this,null,function*(){console.log(`${s++} - ngOnInit`),this.initForm(),this.selectedDistrictId||(yield this.loadSelectedId()),yield this.loadAllDistricts(),yield this.loadTalukaData(),this.loading=!1})}initForm(){console.log(`${s++} - initForm`),this.currentForm=this.fb.group({talukas:this.fb.array([this.createTalukaForm()])})}createTalukaForm(){return console.log(`${s++} - createTalukaForm`),this.fb.group({id:[""],name:["",S.required],gu_name:["",S.required],district_id:["",S.required],is_deleted:[!1]})}buildTalukaForm(e){return console.log(`${s++} - buildTalukaForm`),this.fb.group({id:[e.id],name:[e.name,S.required],gu_name:[e.gu_name,S.required],district_id:[e.district?.id||this.selectedDistrictId,S.required]})}updateSelectedActiveTalukas(){console.log(`${s++} - updateSelectedActiveTalukas`),this.selectedActiveTalukas=this.talukas.filter(e=>e.selected)}updateSelectedDeletedTalukas(){console.log(`${s++} - updateSelectedDeletedTalukas`),this.selectedDeletedTalukas=this.deletedTalukas.filter(e=>e.selected)}onDistrictChange(){console.log(`${s++} - onDistrictChange`),this.activeTalukaPagination={page:1,limit:10},this.deletedTalukaPagination={page:1,limit:10},this.loadTalukaData()}loadSelectedId(){return y(this,null,function*(){return console.log(`${s++} - loadSelectedId`),new Promise((e,a)=>{this.talukaService.getSelectedDistrictId().subscribe(t=>{this.selectedDistrictId=t?.data?.getSelectedDistrictId,e()},t=>a(t))})})}loadAllDistricts(){return y(this,null,function*(){return console.log(`${s++} - loadAllDistricts`),new Promise((e,a)=>{this.talukaService.getAllDistricts().subscribe(t=>{this.districts=t?.data?.getDistricts||[],e()},t=>a(t))})})}loadTalukaData(){console.log(`${s++} - loadTalukaData`),this.loading=!0,this.talukaService.getTalukaStatsAndData(this.selectedDistrictId,this.activeTalukaPagination,this.deletedTalukaPagination).subscribe({next:e=>{let a=e?.data?.getTalukaStatsByDistrict;a&&(this.talukaData=a,this.selectedDistrictId=a.selectedId,this.talukas=(a.activeTalukasByDistrictId||[]).map(t=>F(P({},t),{selected:!1})),this.deletedTalukas=(a.deletedTalukasByDistrictId||[]).map(t=>F(P({},t),{selected:!1})),this.selectedActiveTalukas=[],this.selectedDeletedTalukas=[],this.totalActiveTalukas=a.totalActiveTalukasByDistrictId,this.totalDeletedTalukas=a.totalDeletedTalukasByDistrictId,this.districts=a.districts,this.loading=!1,this.cdr.detectChanges())},error:e=>{console.error(`${s++} - loadTalukaData error`,e),this.loading=!1,this.cdr.detectChanges()}})}get talukasFormArray(){return this.currentForm.get("talukas")}addTaluka(){console.log(`${s++} - addTaluka`),this.talukasFormArray.push(this.createTalukaForm())}removeTaluka(e){console.log(`${s++} - removeTaluka`),this.talukasFormArray.length>1&&this.talukasFormArray.removeAt(e)}saveTaluka(){if(console.log(`${s++} - saveTaluka`),this.currentForm.invalid)return;let e=this.currentForm.value.talukas;(this.needUpdate?this.talukaService.updateTalukas(e):this.talukaService.createTalukas(e)).subscribe({next:()=>{this.loadTalukaData(),this.talukaModal.hide()},error:t=>console.error(this.needUpdate?"Update failed:":"Create failed:",t)})}openTalukaModal(){console.log(`${s++} - openTalukaModal`),this.talukaModalTitle="Add New Talukas",this.needUpdate=!1,this.currentForm.setControl("talukas",this.fb.array([this.createTalukaForm()])),this.talukaModal.show()}editTaluka(e){console.log(`${s++} - editTaluka`),this.needUpdate=!0,this.talukaModalTitle="Edit Taluka",this.currentForm.setControl("talukas",this.fb.array([this.buildTalukaForm(e)])),this.talukaModal.show()}editSelectedTalukas(){console.log(`${s++} - editSelectedTalukas`);let e=this.getSelectedTalukas(this.talukas);if(!e.length)return;this.needUpdate=!0,this.talukaModalTitle="Edit Selected Talukas";let a=e.map(t=>this.buildTalukaForm(t));this.currentForm.setControl("talukas",this.fb.array(a)),this.talukaModal.show()}deleteTaluka(e){console.log(`${s++} - deleteTaluka`),this.talukaService.softDeleteTaluka(e).subscribe({next:()=>this.loadTalukaData()})}restoreTaluka(e){console.log(`${s++} - restoreTaluka`),this.talukaService.restoreTaluka(e).subscribe({next:()=>this.loadTalukaData()})}deleteSelectedTalukas(){console.log(`${s++} - deleteSelectedTalukas`);let e=this.getSelectedTalukas(this.talukas).map(a=>a.id);e.length&&this.talukaService.softDeleteTalukas(e).subscribe({next:()=>this.loadTalukaData()})}restoreSelectedTalukas(){console.log(`${s++} - restoreSelectedTalukas`);let e=this.getSelectedTalukas(this.deletedTalukas).map(a=>a.id);e.length&&this.talukaService.restoreTalukas(e).subscribe({next:()=>this.loadTalukaData()})}getSelectedTalukas(e){return console.log(`${s++} - getSelectedTalukas`),e.filter(a=>typeof a=="object"&&a.selected)}changeActivePage(e){console.log(`${s++} - changeActivePage`),this.activeTalukaPagination.page!==e&&(this.activeTalukaPagination.page=e,this.loadTalukaData())}changeActivePageSize(e){console.log(`${s++} - changeActivePageSize`),this.activeTalukaPagination.limit!==e&&(this.activeTalukaPagination.limit=e,this.activeTalukaPagination.page=1,this.loadTalukaData())}changeDeletedPage(e){console.log(`${s++} - changeDeletedPage`),this.deletedTalukaPagination.page!==e&&(this.deletedTalukaPagination.page=e,this.loadTalukaData())}changeDeletedPageSize(e){console.log(`${s++} - changeDeletedPageSize`),this.deletedTalukaPagination.limit!==e&&(this.deletedTalukaPagination.limit=e,this.deletedTalukaPagination.page=1,this.loadTalukaData())}static{this.\u0275fac=function(a){return new(a||n)(w(De),w(de),w(R),w(z))}}static{this.\u0275cmp=O({type:n,selectors:[["app-taluka-new"]],decls:91,vars:25,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column","position-relative"],["role","tablist",1,"nav","nav-pills","p-3","pb-0"],["role","presentation",1,"nav-item","me-2"],[1,"form-select",3,"ngModelChange","change","ngModel"],["disabled","",3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],["role","presentation",1,"nav-item"],["id","tab-taluka-active","data-bs-toggle","pill","data-bs-target","#taluka-active","type","button","role","tab",1,"nav-link","active"],[1,"badge","bg-success","ms-1"],["id","tab-taluka-deleted","data-bs-toggle","pill","data-bs-target","#taluka-deleted","type","button","role","tab",1,"nav-link"],[1,"badge","bg-danger","ms-1"],[1,"tab-content","flex-grow-1","p-3","bg-white"],["id","taluka-active","role","tabpanel",1,"tab-pane","fade","show","active","position-relative","h-100"],[1,"position-absolute","h-100","w-100","d-flex","flex-column"],[1,"row","g-2","align-items-center"],[1,"col-12","ms-auto","d-flex"],["class","btn btn-danger me-2 flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-secondary me-2 flex-grow-1",3,"click",4,"ngIf"],[1,"btn","btn-success","text-white","flex-grow-1",3,"click"],[1,"fa","fa-plus","me-2"],[1,"flex-grow-1","position-relative"],[1,"position-absolute","overflow-y-auto","h-100","w-100"],[1,"table"],["class","align-middle",3,"ngClass",4,"ngFor","ngForOf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","taluka-deleted","role","tabpanel",1,"tab-pane","fade","position-relative","h-100"],[1,"col-auto","ms-auto","d-flex"],["class","btn btn-primary flex-grow-1",3,"click",4,"ngIf"],["class","text-center py-3 position-absolute h-100 w-100 start-0 top-0 bg-dark bg-opacity-25",4,"ngIf"],["id","talukaModal","tabindex","-1","aria-labelledby","talukaModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","talukaModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","ms-auto",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["formArrayName","talukas"],["class","d-flex align-items-stretch border border-light rounded px-2 position-relative",3,"ngClass",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","class","btn btn-primary text-white",3,"click",4,"ngIf"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],[3,"ngValue"],[1,"btn","btn-danger","me-2","flex-grow-1",3,"click"],[1,"fa","fa-trash","me-2"],[1,"btn","btn-secondary","me-2","flex-grow-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"align-middle",3,"ngClass"],["type","checkbox",3,"ngModelChange","change","ngModel"],[1,"btn","btn-dark","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger","btn-md",3,"click"],[1,"fa","fa-trash"],[1,"btn","btn-primary","flex-grow-1",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"btn","btn-success","btn-md",3,"click"],[1,"fa","fa-refresh"],[1,"text-center","py-3","position-absolute","h-100","w-100","start-0","top-0","bg-dark","bg-opacity-25"],["role","status",1,"spinner-border","text-success"],[1,"visually-hidden"],[1,"d-flex","align-items-stretch","border","border-light","rounded","px-2","position-relative",3,"ngClass"],[1,"py-3","flex-grow-1",3,"formGroupName"],[1,"form-group","p-2"],["for","taluka-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","name","id","taluka-name",1,"form-control"],["for","taluka-gu-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","gu_name","id","taluka-gu-name",1,"form-control"],["for","taluka-district",1,"form-label","mb-2"],["formControlName","district_id","id","taluka-district",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"value"],["type","button",1,"btn","btn-outline-danger","btn-sm","my-3","position-absolute","top-0","end-0","me-3",3,"click"],["type","button",1,"btn","btn-primary","text-white",3,"click"]],template:function(a,t){a&1&&(i(0,"div",0)(1,"ul",1)(2,"li",2)(3,"select",3),I("ngModelChange",function(h){return A(t.selectedDistrictId,h)||(t.selectedDistrictId=h),h}),c("change",function(){return t.onDistrictChange()}),i(4,"option",4),o(5,"Select District"),l(),f(6,Fe,2,3,"option",5),l()(),i(7,"li",6)(8,"button",7),o(9," Active Talukas "),i(10,"span",8),o(11),l()()(),i(12,"li",6)(13,"button",9),o(14," Deleted Talukas "),i(15,"span",10),o(16),l()()()(),i(17,"div",11)(18,"div",12)(19,"div",13)(20,"div",14)(21,"div",15),f(22,$e,3,0,"button",16)(23,Me,3,0,"button",17),i(24,"button",18),c("click",function(){return t.openTalukaModal()}),T(25,"i",19),o(26," Add Taluka "),l()()(),i(27,"div",20)(28,"div",21)(29,"table",22)(30,"thead")(31,"tr")(32,"th"),o(33,"Select"),l(),i(34,"th"),o(35,"#"),l(),i(36,"th"),o(37,"ID"),l(),i(38,"th"),o(39,"Name"),l(),i(40,"th"),o(41,"Gujarati Name"),l(),i(42,"th"),o(43,"Actions"),l()()(),i(44,"tbody"),f(45,Ve,16,8,"tr",23),l()()()(),i(46,"div",24),c("currentPageChange",function(h){return t.changeActivePage(h)})("pageSizeChange",function(h){return t.changeActivePageSize(h)}),l()()(),i(47,"div",25)(48,"div",13)(49,"div",14)(50,"div",26),f(51,Le,3,0,"button",27),l()(),i(52,"div",20)(53,"div",21)(54,"table",22)(55,"thead")(56,"tr")(57,"th"),o(58,"Select"),l(),i(59,"th"),o(60,"#"),l(),i(61,"th"),o(62,"ID"),l(),i(63,"th"),o(64,"Name"),l(),i(65,"th"),o(66,"Gujarati Name"),l(),i(67,"th"),o(68,"Actions"),l()()(),i(69,"tbody"),f(70,Ue,14,8,"tr",23),l()()()(),i(71,"div",24),c("currentPageChange",function(h){return t.changeDeletedPage(h)})("pageSizeChange",function(h){return t.changeDeletedPageSize(h)}),l()()()(),f(72,Ge,4,0,"div",28),l(),i(73,"div",29)(74,"div",30)(75,"div",31)(76,"div",32)(77,"h5",33),o(78),l(),i(79,"button",34),c("click",function(){return t.talukaModal.hide()}),T(80,"i",35),l()(),i(81,"div",36)(82,"form",37)(83,"div",38),f(84,qe,16,6,"div",39),l()()(),i(85,"div",40),f(86,Ke,3,0,"button",41),i(87,"button",42),c("click",function(){return t.saveTaluka()}),o(88," Save "),l(),i(89,"button",43),c("click",function(){return t.talukaModal.hide(!1)}),o(90," Close "),l()()()()()),a&2&&(r(3),E("ngModel",t.selectedDistrictId),r(),u("ngValue",null),r(2),u("ngForOf",t.districts),r(5),b(t.totalActiveTalukas),r(5),b(t.totalDeletedTalukas),r(6),u("ngIf",t.selectedActiveTalukas.length>0),r(),u("ngIf",t.selectedActiveTalukas.length>0),r(22),u("ngForOf",t.talukas),r(),u("currentPage",t.activeTalukaPagination.page)("totalItems",t.totalActiveTalukas)("pageSize",t.activeTalukaPagination.limit)("pageSizes",M(23,Ce)),r(5),u("ngIf",t.selectedDeletedTalukas.length>0),r(19),u("ngForOf",t.deletedTalukas),r(),u("currentPage",t.deletedTalukaPagination.page)("totalItems",t.totalDeletedTalukas)("pageSize",t.deletedTalukaPagination.limit)("pageSizes",M(24,Ce)),r(),u("ngIf",t.loading),r(6),C(" ",t.talukaModalTitle," "),r(4),u("formGroup",t.currentForm),r(2),u("ngForOf",t.talukasFormArray.controls),r(2),u("ngIf",!t.needUpdate))},dependencies:[B,j,W,me,pe,te,re,se,X,J,oe,Y,Z,ae,ne,ie,le,ee]})}}return n})();var ze=[{path:"",component:Ae,data:{title:"Taluka New",breadcrumb:"Taluka New"}}],Ie=(()=>{class n{static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275mod=D({type:n})}static{this.\u0275inj=x({imports:[V.forChild(ze),V]})}}return n})();var gt=(()=>{class n{static{this.\u0275fac=function(a){return new(a||n)}}static{this.\u0275mod=D({type:n})}static{this.\u0275inj=x({imports:[Q,Ie,ge,ce,ue]})}}return n})();export{gt as TalukaNewModule};
