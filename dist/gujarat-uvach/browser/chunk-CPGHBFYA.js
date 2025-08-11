import{m as Q,o as T}from"./chunk-SQRP6PMK.js";import{g as ce,i as me,n as pe}from"./chunk-VONR4PMN.js";import"./chunk-ZMNXU5KO.js";import{A as se,B as de,C as ue,b as H,c as J,e as v,g as X,h as Y,l as Z,m as ee,q as te,r as ae,s as ie,t as ne,u as le,v as re,w as oe}from"./chunk-ZDPQXU7Z.js";import{w as L}from"./chunk-KB4EY57F.js";import{$b as m,Db as h,Ea as p,Fa as k,Fb as d,Ma as O,Qb as i,Qc as K,Rb as n,Sb as g,Tb as R,Ub as q,Wb as b,Zb as u,ka as $,kb as o,kc as r,kd as B,la as x,lb as S,lc as f,ld as j,mc as D,md as z,nc as M,pa as U,pc as E,qc as A,rc as I,va as G,vc as V,wa as C,wc as w,wd as W}from"./chunk-YECJCXI6.js";import{a as P,b as F,f as y}from"./chunk-CWTPBX7D.js";var ke=T`
  mutation CreateTalukas($talukas: [TalukaInput]!) {
    createTalukas(talukas: $talukas) {
      id
      name
      gu_name
      district_id
    }
  }
`,ge=T`
  mutation UpdateTalukas($talukas: [UpdateTalukaInput]!) {
    updateTalukas(talukas: $talukas) {
      id
      name
      gu_name
      district_id
    }
  }
`,Te=T`
  mutation SoftDeleteTaluka($id: ID!) {
    softDeleteTaluka(id: $id) {
      id
      name
    }
  }
`,_e=T`
  mutation SoftDeleteTalukas($ids: [ID]!) {
    softDeleteTalukas(ids: $ids) {
      id
      name
    }
  }
`,he=T`
  mutation RestoreTaluka($id: ID!) {
    restoreTaluka(id: $id) {
      id
      name
    }
  }
`,fe=T`
  mutation RestoreTalukas($ids: [ID]!) {
    restoreTalukas(ids: $ids) {
      id
      name
    }
  }
`;var be=T`
  query GetSelectedDistrictId {
    getSelectedDistrictId
  }
`,ve=T`
  query GetDistricts {
    getDistricts {
      id
      name
      gu_name
    }
  }
`,Se=T`
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
`,ye=T`
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
`,xe=T`
  query GetDeletedTalukas($page: Int!, $limit: Int!) {
    getDeletedTalukas(pagination: { page: $page, limit: $limit }) {
      id
      name
      gu_name
      district_id
    }
  }
`;var Ce=(()=>{class l{constructor(e){this.apollo=e}getSelectedDistrictId(){return this.apollo.watchQuery({query:be}).valueChanges}getAllDistricts(){return this.apollo.watchQuery({query:ve}).valueChanges}getTalukaStatsAndData(e,a,t){return this.apollo.watchQuery({query:Se,variables:{district_id:e,activePagination:a,deletedPagination:t},fetchPolicy:"network-only"}).valueChanges}getTalukas(e,a,t){return this.apollo.watchQuery({query:ye,variables:{district_id:e,page:a,limit:t},fetchPolicy:"network-only"}).valueChanges}getDeletedTalukas(e,a){return this.apollo.watchQuery({query:xe,variables:{page:e,limit:a},fetchPolicy:"network-only"}).valueChanges}createTalukas(e){return this.apollo.mutate({mutation:ke,variables:{talukas:e}})}updateTalukas(e){return console.log({talukas:e}),this.apollo.mutate({mutation:ge,variables:{talukas:e}})}softDeleteTaluka(e){return this.apollo.mutate({mutation:Te,variables:{id:e}})}softDeleteTalukas(e){return this.apollo.mutate({mutation:_e,variables:{ids:e}})}restoreTaluka(e){return this.apollo.mutate({mutation:he,variables:{id:e}})}restoreTalukas(e){return this.apollo.mutate({mutation:fe,variables:{ids:e}})}static{this.\u0275fac=function(a){return new(a||l)(U(Q))}}static{this.\u0275prov=$({token:l,factory:l.\u0275fac,providedIn:"root"})}}return l})();var De=()=>[10,20,30],Ee=l=>({"table-secondary":l}),Pe=l=>({"mb-3":l});function Fe(l,c){if(l&1&&(i(0,"option",44),r(1),n()),l&2){let e=c.$implicit;d("ngValue",e.id),o(),M(" ",e.name," (",e.gu_name,") ")}}function Me(l,c){if(l&1){let e=b();i(0,"button",45),u("click",function(){p(e);let t=m();return k(t.deleteSelectedTalukas())}),g(1,"i",46),r(2," Delete Selected "),n()}}function Ve(l,c){if(l&1){let e=b();i(0,"button",47),u("click",function(){p(e);let t=m();return k(t.editSelectedTalukas())}),g(1,"i",48),r(2," Edit Selected "),n()}}function Le(l,c){if(l&1){let e=b();i(0,"tr",49)(1,"td")(2,"input",50),I("ngModelChange",function(t){let s=p(e).$implicit;return A(s.selected,t)||(s.selected=t),k(t)}),u("change",function(){p(e);let t=m();return k(t.updateSelectedActiveTalukas())}),n()(),i(3,"td"),r(4),n(),i(5,"td"),r(6),n(),i(7,"td"),r(8),n(),i(9,"td"),r(10),n(),i(11,"td")(12,"button",51),u("click",function(){let t=p(e).$implicit,s=m();return k(s.editTaluka(t))}),g(13,"i",52),n(),i(14,"button",53),u("click",function(){let t=p(e).$implicit,s=m();return k(s.deleteTaluka(t.id))}),g(15,"i",54),n()()()}if(l&2){let e=c.$implicit,a=c.index,t=m();d("ngClass",w(6,Ee,e.selected)),o(2),E("ngModel",e.selected),o(2),D("",a+t.activeTalukaPagination.limit*(t.activeTalukaPagination.page-1)+1," "),o(2),f(e.id),o(2),f(e.name),o(2),f(e.gu_name)}}function Ne(l,c){if(l&1){let e=b();i(0,"button",55),u("click",function(){p(e);let t=m();return k(t.restoreSelectedTalukas())}),g(1,"i",56),r(2," Restore Selected "),n()}}function $e(l,c){if(l&1){let e=b();i(0,"tr",49)(1,"td")(2,"input",50),I("ngModelChange",function(t){let s=p(e).$implicit;return A(s.selected,t)||(s.selected=t),k(t)}),u("change",function(){p(e);let t=m();return k(t.updateSelectedDeletedTalukas())}),n()(),i(3,"td"),r(4),n(),i(5,"td"),r(6),n(),i(7,"td"),r(8),n(),i(9,"td"),r(10),n(),i(11,"td")(12,"button",57),u("click",function(){let t=p(e).$implicit,s=m();return k(s.restoreTaluka(t.id))}),g(13,"i",58),n()()()}if(l&2){let e=c.$implicit,a=c.index,t=m();d("ngClass",w(6,Ee,e.selected)),o(2),E("ngModel",e.selected),o(2),D("",a+t.deletedTalukaPagination.limit*(t.deletedTalukaPagination.page-1)+1," "),o(2),f(e.id),o(2),f(e.name),o(2),f(e.gu_name)}}function Ue(l,c){l&1&&(i(0,"div",59)(1,"div",60)(2,"span",61),r(3,"Loading..."),n()()())}function Ge(l,c){if(l&1&&(i(0,"option",73),r(1),n()),l&2){let e=c.$implicit;d("value",e.id),o(),M(" ",e.name," (",e.gu_name,") ")}}function Oe(l,c){if(l&1){let e=b();R(0),i(1,"button",74),u("click",function(){p(e);let t=m().index,s=m();return k(s.removeTaluka(t))}),g(2,"i",46),r(3,"Remove "),n(),q()}}function Re(l,c){if(l&1&&(i(0,"div",62)(1,"div",63)(2,"div",64)(3,"label",65),r(4,"Name"),n(),g(5,"input",66),n(),i(6,"div",64)(7,"label",67),r(8,"Gujarati Name"),n(),g(9,"input",68),n(),i(10,"div",64)(11,"label",69),r(12,"District"),n(),i(13,"select",70),h(14,Ge,2,3,"option",71),n()()(),h(15,Oe,4,0,"ng-container",72),n()),l&2){let e=c.index,a=m();d("ngClass",w(4,Pe,e<a.talukasFormArray.controls.length-1)),o(),d("formGroupName",e),o(13),d("ngForOf",a.districts),o(),d("ngIf",a.talukasFormArray.length>1)}}function qe(l,c){if(l&1){let e=b();i(0,"button",75),u("click",function(){p(e);let t=m();return k(t.addTaluka())}),g(1,"i",19),r(2,"Add More "),n()}}var Ke=1,Ae=(()=>{class l{constructor(e,a,t,s){this.talukaService=e,this.fb=a,this.el=t,this.cdr=s,this.selectedActiveTalukas=[],this.selectedDeletedTalukas=[],this.talukaData={},this.talukas=[],this.deletedTalukas=[],this.districts=[],this.needUpdate=!1,this.talukaModalOptions={backdrop:!1,keyboard:!1},this.talukaModalTitle="Add Taluka",this.activeTalukaPagination={page:1,limit:10},this.deletedTalukaPagination={page:1,limit:10},this.totalActiveTalukas=0,this.totalDeletedTalukas=0,this.selectedDistrictId="",this.loading=!0}ngAfterViewInit(){this.talukaModalElement=this.el.nativeElement.querySelector("#talukaModal"),this.talukaModal=new bootstrap.Modal(this.talukaModalElement,this.talukaModalOptions)}ngOnDestroy(){this.talukaModal&&this.talukaModal.hide()}ngOnInit(){return y(this,null,function*(){this.initForm(),this.selectedDistrictId||(yield this.loadSelectedId()),yield this.loadAllDistricts(),yield this.loadTalukaData(),this.loading=!1})}initForm(){this.currentForm=this.fb.group({talukas:this.fb.array([this.createTalukaForm()])})}createTalukaForm(){return this.fb.group({id:[""],name:["",v.required],gu_name:["",v.required],district_id:["",v.required],is_deleted:[!1]})}buildTalukaForm(e){return this.fb.group({id:[e.id],name:[e.name,v.required],gu_name:[e.gu_name,v.required],district_id:[e.district?.id||this.selectedDistrictId,v.required]})}updateSelectedActiveTalukas(){this.selectedActiveTalukas=this.talukas.filter(e=>e.selected)}updateSelectedDeletedTalukas(){this.selectedDeletedTalukas=this.deletedTalukas.filter(e=>e.selected)}onDistrictChange(){this.activeTalukaPagination={page:1,limit:10},this.deletedTalukaPagination={page:1,limit:10},this.loadTalukaData()}loadSelectedId(){return y(this,null,function*(){return new Promise((e,a)=>{this.talukaService.getSelectedDistrictId().subscribe(t=>{this.selectedDistrictId=t?.data?.getSelectedDistrictId,e()},t=>a(t))})})}loadAllDistricts(){return y(this,null,function*(){return new Promise((e,a)=>{this.talukaService.getAllDistricts().subscribe(t=>{this.districts=t?.data?.getDistricts||[],e()},t=>a(t))})})}loadTalukaData(){this.loading=!0,this.talukaService.getTalukaStatsAndData(this.selectedDistrictId,this.activeTalukaPagination,this.deletedTalukaPagination).subscribe({next:e=>{let a=e?.data?.getTalukaStatsByDistrict;a&&(this.talukaData=a,this.selectedDistrictId=a.selectedId,this.talukas=(a.activeTalukasByDistrictId||[]).map(t=>F(P({},t),{selected:!1})),this.deletedTalukas=(a.deletedTalukasByDistrictId||[]).map(t=>F(P({},t),{selected:!1})),this.selectedActiveTalukas=[],this.selectedDeletedTalukas=[],this.totalActiveTalukas=a.totalActiveTalukasByDistrictId,this.totalDeletedTalukas=a.totalDeletedTalukasByDistrictId,this.districts=a.districts,this.loading=!1,this.cdr.detectChanges())},error:e=>{console.error(`${Ke++} - loadTalukaData error`,e),this.loading=!1,this.cdr.detectChanges()}})}get talukasFormArray(){return this.currentForm.get("talukas")}addTaluka(){this.talukasFormArray.push(this.createTalukaForm())}removeTaluka(e){this.talukasFormArray.length>1&&this.talukasFormArray.removeAt(e)}saveTaluka(){if(this.currentForm.invalid)return;let e=this.currentForm.value.talukas;(this.needUpdate?this.talukaService.updateTalukas(e):this.talukaService.createTalukas(e)).subscribe({next:()=>{this.loadTalukaData(),this.talukaModal.hide()},error:t=>console.error(this.needUpdate?"Update failed:":"Create failed:",t)})}openTalukaModal(){this.talukaModalTitle="Add New Talukas",this.needUpdate=!1,this.currentForm.setControl("talukas",this.fb.array([this.createTalukaForm()])),this.talukaModal.show()}editTaluka(e){this.needUpdate=!0,this.talukaModalTitle="Edit Taluka",this.currentForm.setControl("talukas",this.fb.array([this.buildTalukaForm(e)])),this.talukaModal.show()}editSelectedTalukas(){let e=this.getSelectedTalukas(this.talukas);if(!e.length)return;this.needUpdate=!0,this.talukaModalTitle="Edit Selected Talukas";let a=e.map(t=>this.buildTalukaForm(t));this.currentForm.setControl("talukas",this.fb.array(a)),this.talukaModal.show()}deleteTaluka(e){this.talukaService.softDeleteTaluka(e).subscribe({next:()=>this.loadTalukaData()})}restoreTaluka(e){this.talukaService.restoreTaluka(e).subscribe({next:()=>this.loadTalukaData()})}deleteSelectedTalukas(){let e=this.getSelectedTalukas(this.talukas).map(a=>a.id);e.length&&this.talukaService.softDeleteTalukas(e).subscribe({next:()=>this.loadTalukaData()})}restoreSelectedTalukas(){let e=this.getSelectedTalukas(this.deletedTalukas).map(a=>a.id);e.length&&this.talukaService.restoreTalukas(e).subscribe({next:()=>this.loadTalukaData()})}getSelectedTalukas(e){return e.filter(a=>typeof a=="object"&&a.selected)}changeActivePage(e){this.activeTalukaPagination.page!==e&&(this.activeTalukaPagination.page=e,this.loadTalukaData())}changeActivePageSize(e){this.activeTalukaPagination.limit!==e&&(this.activeTalukaPagination.limit=e,this.activeTalukaPagination.page=1,this.loadTalukaData())}changeDeletedPage(e){this.deletedTalukaPagination.page!==e&&(this.deletedTalukaPagination.page=e,this.loadTalukaData())}changeDeletedPageSize(e){this.deletedTalukaPagination.limit!==e&&(this.deletedTalukaPagination.limit=e,this.deletedTalukaPagination.page=1,this.loadTalukaData())}static{this.\u0275fac=function(a){return new(a||l)(S(Ce),S(se),S(O),S(K))}}static{this.\u0275cmp=G({type:l,selectors:[["app-taluka"]],decls:91,vars:25,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column","position-absolute","w-100"],["role","tablist",1,"nav","nav-pills","p-3","pb-0"],["role","presentation",1,"nav-item","me-2"],[1,"form-select",3,"ngModelChange","change","ngModel"],["disabled","",3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],["role","presentation",1,"nav-item"],["id","tab-taluka-active","data-bs-toggle","pill","data-bs-target","#taluka-active","type","button","role","tab",1,"nav-link","active"],[1,"badge","bg-success","ms-1"],["id","tab-taluka-deleted","data-bs-toggle","pill","data-bs-target","#taluka-deleted","type","button","role","tab",1,"nav-link"],[1,"badge","bg-danger","ms-1"],[1,"tab-content","flex-grow-1","p-3","bg-white"],["id","taluka-active","role","tabpanel",1,"tab-pane","fade","show","active","position-relative","h-100"],[1,"position-absolute","h-100","w-100","d-flex","flex-column"],[1,"row","g-2","align-items-center"],[1,"col-12","ms-auto","d-flex"],["class","btn btn-danger me-2 flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-secondary me-2 flex-grow-1",3,"click",4,"ngIf"],[1,"btn","btn-success","text-white","flex-grow-1",3,"click"],[1,"fa","fa-plus","me-2"],[1,"flex-grow-1","position-relative"],[1,"position-absolute","overflow-y-auto","h-100","w-100"],[1,"table"],["class","align-middle",3,"ngClass",4,"ngFor","ngForOf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","taluka-deleted","role","tabpanel",1,"tab-pane","fade","position-relative","h-100"],[1,"col-auto","ms-auto","d-flex"],["class","btn btn-primary flex-grow-1",3,"click",4,"ngIf"],["class","text-center py-3 position-absolute h-100 w-100 start-0 top-0 bg-dark bg-opacity-25",4,"ngIf"],["id","talukaModal","tabindex","-1","aria-labelledby","talukaModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","talukaModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","ms-auto",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["formArrayName","talukas"],["class","d-flex align-items-stretch border border-light rounded px-2 position-relative",3,"ngClass",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","class","btn btn-primary text-white",3,"click",4,"ngIf"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],[3,"ngValue"],[1,"btn","btn-danger","me-2","flex-grow-1",3,"click"],[1,"fa","fa-trash","me-2"],[1,"btn","btn-secondary","me-2","flex-grow-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"align-middle",3,"ngClass"],["type","checkbox",3,"ngModelChange","change","ngModel"],[1,"btn","btn-dark","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger","btn-md",3,"click"],[1,"fa","fa-trash"],[1,"btn","btn-primary","flex-grow-1",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"btn","btn-success","btn-md",3,"click"],[1,"fa","fa-refresh"],[1,"text-center","py-3","position-absolute","h-100","w-100","start-0","top-0","bg-dark","bg-opacity-25"],["role","status",1,"spinner-border","text-success"],[1,"visually-hidden"],[1,"d-flex","align-items-stretch","border","border-light","rounded","px-2","position-relative",3,"ngClass"],[1,"py-3","flex-grow-1",3,"formGroupName"],[1,"form-group","p-2"],["for","taluka-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","name","id","taluka-name",1,"form-control"],["for","taluka-gu-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","gu_name","id","taluka-gu-name",1,"form-control"],["for","taluka-district",1,"form-label","mb-2"],["formControlName","district_id","id","taluka-district",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"value"],["type","button",1,"btn","btn-outline-danger","btn-sm","my-3","position-absolute","top-0","end-0","me-3",3,"click"],["type","button",1,"btn","btn-primary","text-white",3,"click"]],template:function(a,t){a&1&&(i(0,"div",0)(1,"ul",1)(2,"li",2)(3,"select",3),I("ngModelChange",function(_){return A(t.selectedDistrictId,_)||(t.selectedDistrictId=_),_}),u("change",function(){return t.onDistrictChange()}),i(4,"option",4),r(5,"Select District"),n(),h(6,Fe,2,3,"option",5),n()(),i(7,"li",6)(8,"button",7),r(9," Active Talukas "),i(10,"span",8),r(11),n()()(),i(12,"li",6)(13,"button",9),r(14," Deleted Talukas "),i(15,"span",10),r(16),n()()()(),i(17,"div",11)(18,"div",12)(19,"div",13)(20,"div",14)(21,"div",15),h(22,Me,3,0,"button",16)(23,Ve,3,0,"button",17),i(24,"button",18),u("click",function(){return t.openTalukaModal()}),g(25,"i",19),r(26," Add Taluka "),n()()(),i(27,"div",20)(28,"div",21)(29,"table",22)(30,"thead")(31,"tr")(32,"th"),r(33,"Select"),n(),i(34,"th"),r(35,"#"),n(),i(36,"th"),r(37,"ID"),n(),i(38,"th"),r(39,"Name"),n(),i(40,"th"),r(41,"Gujarati Name"),n(),i(42,"th"),r(43,"Actions"),n()()(),i(44,"tbody"),h(45,Le,16,8,"tr",23),n()()()(),i(46,"div",24),u("currentPageChange",function(_){return t.changeActivePage(_)})("pageSizeChange",function(_){return t.changeActivePageSize(_)}),n()()(),i(47,"div",25)(48,"div",13)(49,"div",14)(50,"div",26),h(51,Ne,3,0,"button",27),n()(),i(52,"div",20)(53,"div",21)(54,"table",22)(55,"thead")(56,"tr")(57,"th"),r(58,"Select"),n(),i(59,"th"),r(60,"#"),n(),i(61,"th"),r(62,"ID"),n(),i(63,"th"),r(64,"Name"),n(),i(65,"th"),r(66,"Gujarati Name"),n(),i(67,"th"),r(68,"Actions"),n()()(),i(69,"tbody"),h(70,$e,14,8,"tr",23),n()()()(),i(71,"div",24),u("currentPageChange",function(_){return t.changeDeletedPage(_)})("pageSizeChange",function(_){return t.changeDeletedPageSize(_)}),n()()()(),h(72,Ue,4,0,"div",28),n(),i(73,"div",29)(74,"div",30)(75,"div",31)(76,"div",32)(77,"h5",33),r(78),n(),i(79,"button",34),u("click",function(){return t.talukaModal.hide()}),g(80,"i",35),n()(),i(81,"div",36)(82,"form",37)(83,"div",38),h(84,Re,16,6,"div",39),n()()(),i(85,"div",40),h(86,qe,3,0,"button",41),i(87,"button",42),u("click",function(){return t.saveTaluka()}),r(88," Save "),n(),i(89,"button",43),u("click",function(){return t.talukaModal.hide(!1)}),r(90," Close "),n()()()()()),a&2&&(o(3),E("ngModel",t.selectedDistrictId),o(),d("ngValue",null),o(2),d("ngForOf",t.districts),o(5),f(t.totalActiveTalukas),o(5),f(t.totalDeletedTalukas),o(6),d("ngIf",t.selectedActiveTalukas.length>0),o(),d("ngIf",t.selectedActiveTalukas.length>0),o(22),d("ngForOf",t.talukas),o(),d("currentPage",t.activeTalukaPagination.page)("totalItems",t.totalActiveTalukas)("pageSize",t.activeTalukaPagination.limit)("pageSizes",V(23,De)),o(5),d("ngIf",t.selectedDeletedTalukas.length>0),o(19),d("ngForOf",t.deletedTalukas),o(),d("currentPage",t.deletedTalukaPagination.page)("totalItems",t.totalDeletedTalukas)("pageSize",t.deletedTalukaPagination.limit)("pageSizes",V(24,De)),o(),d("ngIf",t.loading),o(6),D(" ",t.talukaModalTitle," "),o(4),d("formGroup",t.currentForm),o(2),d("ngForOf",t.talukasFormArray.controls),o(2),d("ngIf",!t.needUpdate))},dependencies:[B,j,z,ce,me,ee,re,oe,J,H,le,X,Y,te,ne,ae,ie,Z]})}}return l})();var Be=[{path:"",component:Ae,data:{title:"Taluka",breadcrumb:"Taluka"}}],Ie=(()=>{class l{static{this.\u0275fac=function(a){return new(a||l)}}static{this.\u0275mod=C({type:l})}static{this.\u0275inj=x({imports:[L.forChild(Be),L]})}}return l})();var kt=(()=>{class l{static{this.\u0275fac=function(a){return new(a||l)}}static{this.\u0275mod=C({type:l})}static{this.\u0275inj=x({imports:[W,Ie,pe,ue,de]})}}return l})();export{kt as TalukaModule};
