import{e as ge,g as h}from"./chunk-GRAPUKMD.js";import{b as H,d as me,r as pe}from"./chunk-F3KBCKKL.js";import{b as J,c as X,d as b,f as Y,g as Z,j as ee,k as te,o as ae,p as ie,q as ne,r as le,s as oe,t as re,u as se,w as de,x as ue,y as ce}from"./chunk-R4GYVDXC.js";import"./chunk-RGVYU375.js";import"./chunk-WIB4C2YZ.js";import{$ as L,Aa as z,Ba as B,Ca as S,Da as c,Ea as p,J as G,K as C,La as o,M as O,Ma as v,Na as D,Oa as M,Ob as $,P as U,Pa as I,Q as x,Qa as E,Ra as A,Ua as V,V as g,Va as N,W as k,cb as R,ga as r,ha as w,hb as j,ib as K,jb as W,pa as f,qb as Q,ra as u,xa as i,ya as n,za as _}from"./chunk-WT3K4JXK.js";import{a as P,b as F,f as y}from"./chunk-CWTPBX7D.js";var ke=(()=>{class l{constructor(e){this.apollo=e}getSelectedDistrictId(){let e=h`
      query Query {
        getSelectedDistrictId
      }
    `;return this.apollo.watchQuery({query:e}).valueChanges}getAllDistricts(){let e=h`
      query GetDistricts {
        getDistricts {
          id
          name
          gu_name
          is_deleted
        }
      }
    `;return this.apollo.watchQuery({query:e}).valueChanges}getTalukaStatsAndData(e,a,t){let s=h`
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
            is_deleted
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
    `;return this.apollo.watchQuery({query:s,variables:{district_id:e,activePagination:a,deletedPagination:t},fetchPolicy:"network-only"}).valueChanges}getTalukas(e,a,t){let s=h`
      query GetTalukas($district_id: ID!, $page: Int!, $limit: Int!) {
        getTalukas(
          district_id: $district_id
          pagination: { page: $page, limit: $limit }
        ) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;return this.apollo.watchQuery({query:s,variables:{district_id:e,page:a,limit:t}}).valueChanges}getDeletedTalukas(e,a){let t=h`
      query GetDeletedTalukas($page: Int!, $limit: Int!) {
        getDeletedTalukas(pagination: { page: $page, limit: $limit }) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;return this.apollo.watchQuery({query:t,variables:{page:e,limit:a}}).valueChanges}createTalukas(e){let a=h`
      mutation CreateTalukas($districts: [TalukaInput]!) {
        createTalukas(districts: $districts) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;return this.apollo.mutate({mutation:a,variables:{districts:e}})}updateTalukas(e){let a=h`
      mutation UpdateTalukas($districts: [UpdateTalukaInput]!) {
        updateTalukas(districts: $districts) {
          id
          name
          gu_name
          district_id
          is_deleted
        }
      }
    `;return this.apollo.mutate({mutation:a,variables:{districts:e}})}softDeleteTaluka(e){let a=h`
      mutation SoftDeleteTaluka($id: ID!) {
        softDeleteTaluka(id: $id) {
          id
          name
          is_deleted
        }
      }
    `;return this.apollo.mutate({mutation:a,variables:{id:e}})}softDeleteTalukas(e){let a=h`
      mutation SoftDeleteTalukas($ids: [ID]!) {
        softDeleteTalukas(ids: $ids) {
          id
          name
          is_deleted
        }
      }
    `;return this.apollo.mutate({mutation:a,variables:{ids:e}})}restoreTaluka(e){let a=h`
      mutation RestoreTaluka($id: ID!) {
        restoreTaluka(id: $id) {
          id
          name
          is_deleted
        }
      }
    `;return this.apollo.mutate({mutation:a,variables:{id:e}})}restoreTalukas(e){let a=h`
      mutation RestoreTalukas($ids: [ID]!) {
        restoreTalukas(ids: $ids) {
          id
          name
          is_deleted
        }
      }
    `;return this.apollo.mutate({mutation:a,variables:{ids:e}})}static{this.\u0275fac=function(a){return new(a||l)(O(ge))}}static{this.\u0275prov=G({token:l,factory:l.\u0275fac,providedIn:"root"})}}return l})();var _e=()=>[10,20,30],he=l=>({"table-secondary":l}),ve=l=>({"mb-3":l});function Se(l,m){if(l&1&&(i(0,"option",44),o(1),n()),l&2){let e=m.$implicit;u("ngValue",e.id),r(),M(" ",e.name," (",e.gu_name,") ")}}function we(l,m){if(l&1){let e=S();i(0,"button",45),c("click",function(){g(e);let t=p();return k(t.deleteSelectedTalukas())}),_(1,"i",46),o(2," Delete Selected "),n()}}function ye(l,m){if(l&1){let e=S();i(0,"button",47),c("click",function(){g(e);let t=p();return k(t.editSelectedTalukas())}),_(1,"i",48),o(2," Edit Selected "),n()}}function Ce(l,m){if(l&1){let e=S();i(0,"tr",49)(1,"td")(2,"input",50),A("ngModelChange",function(t){let s=g(e).$implicit;return E(s.selected,t)||(s.selected=t),k(t)}),c("change",function(){g(e);let t=p();return k(t.updateSelectedActiveTalukas())}),n()(),i(3,"td"),o(4),n(),i(5,"td"),o(6),n(),i(7,"td"),o(8),n(),i(9,"td"),o(10),n(),i(11,"td")(12,"button",51),c("click",function(){let t=g(e).$implicit,s=p();return k(s.editTaluka(t))}),_(13,"i",52),n(),i(14,"button",53),c("click",function(){let t=g(e).$implicit,s=p();return k(s.deleteTaluka(t.id))}),_(15,"i",54),n()()()}if(l&2){let e=m.$implicit,a=m.index,t=p();u("ngClass",N(6,he,e.selected)),r(2),I("ngModel",e.selected),r(2),D("",a+t.activeTalukaPagination.limit*(t.activeTalukaPagination.page-1)+1," "),r(2),v(e.id),r(2),v(e.name),r(2),v(e.gu_name)}}function xe(l,m){if(l&1){let e=S();i(0,"button",55),c("click",function(){g(e);let t=p();return k(t.restoreSelectedTalukas())}),_(1,"i",56),o(2," Restore Selected "),n()}}function De(l,m){if(l&1){let e=S();i(0,"tr",49)(1,"td")(2,"input",50),A("ngModelChange",function(t){let s=g(e).$implicit;return E(s.selected,t)||(s.selected=t),k(t)}),c("change",function(){g(e);let t=p();return k(t.updateSelectedDeletedTalukas())}),n()(),i(3,"td"),o(4),n(),i(5,"td"),o(6),n(),i(7,"td"),o(8),n(),i(9,"td"),o(10),n(),i(11,"td")(12,"button",57),c("click",function(){let t=g(e).$implicit,s=p();return k(s.restoreTaluka(t.id))}),_(13,"i",58),n()()()}if(l&2){let e=m.$implicit,a=m.index,t=p();u("ngClass",N(6,he,e.selected)),r(2),I("ngModel",e.selected),r(2),D("",a+t.deletedTalukaPagination.limit*(t.deletedTalukaPagination.page-1)+1," "),r(2),v(e.id),r(2),v(e.name),r(2),v(e.gu_name)}}function Ie(l,m){l&1&&(i(0,"div",59)(1,"div",60)(2,"span",61),o(3,"Loading..."),n()()())}function Ee(l,m){if(l&1&&(i(0,"option",73),o(1),n()),l&2){let e=m.$implicit;u("value",e.id),r(),M(" ",e.name," (",e.gu_name,") ")}}function Ae(l,m){if(l&1){let e=S();z(0),i(1,"button",74),c("click",function(){g(e);let t=p().index,s=p();return k(s.removeTaluka(t))}),_(2,"i",46),o(3,"Remove "),n(),B()}}function Ne(l,m){if(l&1&&(i(0,"div",62)(1,"div",63)(2,"div",64)(3,"label",65),o(4,"Name"),n(),_(5,"input",66),n(),i(6,"div",64)(7,"label",67),o(8,"Gujarati Name"),n(),_(9,"input",68),n(),i(10,"div",64)(11,"label",69),o(12,"District"),n(),i(13,"select",70),f(14,Ee,2,3,"option",71),n()()(),f(15,Ae,4,0,"ng-container",72),n()),l&2){let e=m.index,a=p();u("ngClass",N(4,ve,e<a.talukasFormArray.controls.length-1)),r(),u("formGroupName",e),r(13),u("ngForOf",a.districts),r(),u("ngIf",a.talukasFormArray.length>1)}}function Pe(l,m){if(l&1){let e=S();i(0,"button",75),c("click",function(){g(e);let t=p();return k(t.addTaluka())}),_(1,"i",19),o(2,"Add More "),n()}}var d=1,Te=(()=>{class l{constructor(e,a,t,s){this.talukaService=e,this.fb=a,this.el=t,this.cdr=s,this.selectedActiveTalukas=[],this.selectedDeletedTalukas=[],this.talukaData={},this.talukas=[],this.deletedTalukas=[],this.districts=[],this.needUpdate=!1,this.talukaModalTitle="Add Taluka",this.activeTalukaPagination={page:1,limit:10},this.deletedTalukaPagination={page:1,limit:10},this.totalActiveTalukas=0,this.totalDeletedTalukas=0,this.selectedDistrictId="",this.loading=!0}ngAfterViewInit(){console.log("ngAfterViewInit",d++),this.talukaModalElement=this.el.nativeElement.querySelector("#talukaModal"),this.talukaModalOptions={backdrop:!1,keyboard:!1},this.talukaModal=new bootstrap.Modal(this.talukaModalElement,this.talukaModalOptions)}ngOnInit(){return y(this,null,function*(){console.log("ngOnInit",d++),this.initForm(),this.selectedDistrictId||(yield this.loadSelectedId()),yield this.loadAllDistricts(),yield this.loadTalukaData(),this.loading=!1})}updateSelectedActiveTalukas(){this.selectedActiveTalukas=this.talukas.filter(e=>e.selected)}updateSelectedDeletedTalukas(){this.selectedDeletedTalukas=this.deletedTalukas.filter(e=>e.selected)}loadSelectedId(){return y(this,null,function*(){return console.log("loadSelectedId",d++),new Promise((e,a)=>{this.talukaService.getSelectedDistrictId().subscribe(t=>{this.selectedDistrictId=t?.data?.getSelectedDistrictId,e()},t=>a(t))})})}loadAllDistricts(){return y(this,null,function*(){return console.log("loadAllDistricts",d++),new Promise((e,a)=>{this.talukaService.getAllDistricts().subscribe(t=>{this.districts=t?.data?.getDistricts||[],e()},t=>a(t))})})}initForm(){console.log("initForm",d++),this.currentForm=this.fb.group({talukas:this.fb.array([this.createTalukaForm()])})}createTalukaForm(){return console.log("createTalukaForm",d++),this.fb.group({id:[""],name:["",b.required],gu_name:["",b.required],district_id:["",b.required],is_deleted:[!1]})}get talukasFormArray(){return this.currentForm.get("talukas")}onDistrictChange(){console.log("onDistrictChange",d++),this.activeTalukaPagination={page:1,limit:10},this.deletedTalukaPagination={page:1,limit:10},this.loadTalukaData()}loadTalukaData(){console.log("loadTalukaData",++d),this.loading=!0,this.talukaService.getTalukaStatsAndData(this.selectedDistrictId,this.activeTalukaPagination,this.deletedTalukaPagination).subscribe({next:e=>{let a=e?.data?.getTalukaStatsByDistrict;a&&(this.talukaData=a,this.selectedDistrictId=a.selectedId,this.talukas=(a.activeTalukasByDistrictId||[]).map(t=>F(P({},t),{selected:!1})),this.deletedTalukas=(a.deletedTalukasByDistrictId||[]).map(t=>F(P({},t),{selected:!1})),this.selectedActiveTalukas=[],this.selectedDeletedTalukas=[],this.totalActiveTalukas=a.totalActiveTalukasByDistrictId,this.totalDeletedTalukas=a.totalDeletedTalukasByDistrictId,this.districts=a.districts,this.loading=!1,this.cdr.detectChanges())},error:e=>{this.loading=!1,console.error("Error loading taluka data:",e),this.cdr.detectChanges()}})}addTaluka(){console.log("addTaluka",d++),this.talukasFormArray.push(this.createTalukaForm())}removeTaluka(e){console.log("removeTaluka",d++),this.talukasFormArray.length>1&&this.talukasFormArray.removeAt(e)}saveTaluka(){if(console.log("saveTaluka",d++),this.currentForm.invalid)return;let e=this.currentForm.value.talukas;(this.needUpdate?this.talukaService.updateTalukas(e):this.talukaService.createTalukas(e)).subscribe(()=>{this.loadTalukaData(),this.talukaModal.hide()},t=>console.error(this.needUpdate?"Update failed:":"Create failed:",t))}openTalukaModal(){console.log("openTalukaModal",d++),this.talukaModalTitle="Add New Talukas",this.needUpdate=!1,this.currentForm.reset(),this.currentForm.setControl("talukas",this.fb.array([this.createTalukaForm()])),this.talukaModal.show()}editTaluka(e){console.log("editTaluka",d++),this.needUpdate=!0,this.talukaModalTitle="Edit Taluka";let a=this.fb.group({id:[e.id],name:[e.name,b.required],gu_name:[e.gu_name,b.required],district_id:[this.selectedDistrictId,b.required],is_deleted:[e.is_deleted]});this.currentForm.setControl("talukas",this.fb.array([a])),this.talukaModal.show()}editSelectedTalukas(){console.log("editSelectedTalukas",d++);let e=this.getSelectedTalukas(this.talukas);if(!e.length)return;this.needUpdate=!0,this.talukaModalTitle="Edit Selected Talukas";let a=e.map(t=>this.fb.group({id:[t.id],name:[t.name,b.required],gu_name:[t.gu_name,b.required],district_id:[t.district?.id||this.selectedDistrictId,b.required],is_deleted:[t.is_deleted]}));this.currentForm.setControl("talukas",this.fb.array(a)),this.talukaModal.show()}deleteTaluka(e){console.log("deleteTaluka",d++),this.talukaService.softDeleteTaluka(e).subscribe(()=>this.loadTalukaData())}restoreTaluka(e){console.log("restoreTaluka",d++),this.talukaService.restoreTaluka(e).subscribe(()=>this.loadTalukaData())}deleteSelectedTalukas(){console.log("deleteSelectedTalukas",d++);let e=this.getSelectedTalukas(this.talukas).map(a=>a.id);e.length&&this.talukaService.softDeleteTalukas(e).subscribe(()=>this.loadTalukaData())}restoreSelectedTalukas(){console.log("restoreSelectedTalukas",d++);let e=this.getSelectedTalukas(this.deletedTalukas).map(a=>a.id);e.length&&this.talukaService.restoreTalukas(e).subscribe(()=>this.loadTalukaData())}getSelectedTalukas(e){return console.log("getSelectedTalukas",d++),e.filter(a=>typeof a=="object"&&a.selected)}changeActivePage(e){console.log("changeActivePage",d++),this.activeTalukaPagination.page!==e&&(this.activeTalukaPagination.page=e,this.loadTalukaData())}changeActivePageSize(e){console.log("changeActivePageSize",d++),this.activeTalukaPagination.limit!==e&&(this.activeTalukaPagination.limit=e,this.activeTalukaPagination.page=1,this.loadTalukaData())}changeDeletedPage(e){console.log("changeDeletedPage",d++),this.deletedTalukaPagination.page!==e&&(this.deletedTalukaPagination.page=e,this.loadTalukaData())}changeDeletedPageSize(e){console.log("changeDeletedPageSize",d++),this.deletedTalukaPagination.limit!==e&&(this.deletedTalukaPagination.limit=e,this.deletedTalukaPagination.page=1,this.loadTalukaData())}static{this.\u0275fac=function(a){return new(a||l)(w(ke),w(de),w(L),w(R))}}static{this.\u0275cmp=U({type:l,selectors:[["app-taluka-new"]],decls:91,vars:25,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column","position-relative"],["role","tablist",1,"nav","nav-pills","p-3","pb-0"],["role","presentation",1,"nav-item","me-2"],[1,"form-select",3,"ngModelChange","change","ngModel"],["disabled","",3,"ngValue"],[3,"ngValue",4,"ngFor","ngForOf"],["role","presentation",1,"nav-item"],["id","tab-taluka-active","data-bs-toggle","pill","data-bs-target","#taluka-active","type","button","role","tab",1,"nav-link","active"],[1,"badge","bg-success","ms-1"],["id","tab-taluka-deleted","data-bs-toggle","pill","data-bs-target","#taluka-deleted","type","button","role","tab",1,"nav-link"],[1,"badge","bg-danger","ms-1"],[1,"tab-content","flex-grow-1","p-3","bg-white"],["id","taluka-active","role","tabpanel",1,"tab-pane","fade","show","active","position-relative","h-100"],[1,"position-absolute","h-100","w-100","d-flex","flex-column"],[1,"row","g-2","align-items-center"],[1,"col-12","ms-auto","d-flex"],["class","btn btn-danger me-2 flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-secondary me-2 flex-grow-1",3,"click",4,"ngIf"],[1,"btn","btn-success","text-white","flex-grow-1",3,"click"],[1,"fa","fa-plus","me-2"],[1,"flex-grow-1","position-relative"],[1,"position-absolute","overflow-y-auto","h-100","w-100"],[1,"table"],["class","align-middle",3,"ngClass",4,"ngFor","ngForOf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","taluka-deleted","role","tabpanel",1,"tab-pane","fade","position-relative","h-100"],[1,"col-auto","ms-auto","d-flex"],["class","btn btn-primary flex-grow-1",3,"click",4,"ngIf"],["class","text-center py-3 position-absolute h-100 w-100 start-0 top-0 bg-dark bg-opacity-25",4,"ngIf"],["id","talukaModal","tabindex","-1","aria-labelledby","talukaModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","talukaModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","ms-auto",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["formArrayName","talukas"],["class","d-flex align-items-stretch border border-light rounded px-2 position-relative",3,"ngClass",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","class","btn btn-primary text-white",3,"click",4,"ngIf"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],[3,"ngValue"],[1,"btn","btn-danger","me-2","flex-grow-1",3,"click"],[1,"fa","fa-trash","me-2"],[1,"btn","btn-secondary","me-2","flex-grow-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"align-middle",3,"ngClass"],["type","checkbox",3,"ngModelChange","change","ngModel"],[1,"btn","btn-dark","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger","btn-md",3,"click"],[1,"fa","fa-trash"],[1,"btn","btn-primary","flex-grow-1",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"btn","btn-success","btn-md",3,"click"],[1,"fa","fa-refresh"],[1,"text-center","py-3","position-absolute","h-100","w-100","start-0","top-0","bg-dark","bg-opacity-25"],["role","status",1,"spinner-border","text-success"],[1,"visually-hidden"],[1,"d-flex","align-items-stretch","border","border-light","rounded","px-2","position-relative",3,"ngClass"],[1,"py-3","flex-grow-1",3,"formGroupName"],[1,"form-group","p-2"],["for","taluka-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","name","id","taluka-name",1,"form-control"],["for","taluka-gu-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","gu_name","id","taluka-gu-name",1,"form-control"],["for","taluka-district",1,"form-label","mb-2"],["formControlName","district_id","id","taluka-district",1,"form-select"],[3,"value",4,"ngFor","ngForOf"],[4,"ngIf"],[3,"value"],["type","button",1,"btn","btn-outline-danger","btn-sm","my-3","position-absolute","top-0","end-0","me-3",3,"click"],["type","button",1,"btn","btn-primary","text-white",3,"click"]],template:function(a,t){a&1&&(i(0,"div",0)(1,"ul",1)(2,"li",2)(3,"select",3),A("ngModelChange",function(T){return E(t.selectedDistrictId,T)||(t.selectedDistrictId=T),T}),c("change",function(){return t.onDistrictChange()}),i(4,"option",4),o(5,"Select District"),n(),f(6,Se,2,3,"option",5),n()(),i(7,"li",6)(8,"button",7),o(9," Active Talukas "),i(10,"span",8),o(11),n()()(),i(12,"li",6)(13,"button",9),o(14," Deleted Talukas "),i(15,"span",10),o(16),n()()()(),i(17,"div",11)(18,"div",12)(19,"div",13)(20,"div",14)(21,"div",15),f(22,we,3,0,"button",16)(23,ye,3,0,"button",17),i(24,"button",18),c("click",function(){return t.openTalukaModal()}),_(25,"i",19),o(26," Add Taluka "),n()()(),i(27,"div",20)(28,"div",21)(29,"table",22)(30,"thead")(31,"tr")(32,"th"),o(33,"Select"),n(),i(34,"th"),o(35,"#"),n(),i(36,"th"),o(37,"ID"),n(),i(38,"th"),o(39,"Name"),n(),i(40,"th"),o(41,"Gujarati Name"),n(),i(42,"th"),o(43,"Actions"),n()()(),i(44,"tbody"),f(45,Ce,16,8,"tr",23),n()()()(),i(46,"div",24),c("currentPageChange",function(T){return t.changeActivePage(T)})("pageSizeChange",function(T){return t.changeActivePageSize(T)}),n()()(),i(47,"div",25)(48,"div",13)(49,"div",14)(50,"div",26),f(51,xe,3,0,"button",27),n()(),i(52,"div",20)(53,"div",21)(54,"table",22)(55,"thead")(56,"tr")(57,"th"),o(58,"Select"),n(),i(59,"th"),o(60,"#"),n(),i(61,"th"),o(62,"ID"),n(),i(63,"th"),o(64,"Name"),n(),i(65,"th"),o(66,"Gujarati Name"),n(),i(67,"th"),o(68,"Actions"),n()()(),i(69,"tbody"),f(70,De,14,8,"tr",23),n()()()(),i(71,"div",24),c("currentPageChange",function(T){return t.changeDeletedPage(T)})("pageSizeChange",function(T){return t.changeDeletedPageSize(T)}),n()()()(),f(72,Ie,4,0,"div",28),n(),i(73,"div",29)(74,"div",30)(75,"div",31)(76,"div",32)(77,"h5",33),o(78),n(),i(79,"button",34),c("click",function(){return t.talukaModal.hide()}),_(80,"i",35),n()(),i(81,"div",36)(82,"form",37)(83,"div",38),f(84,Ne,16,6,"div",39),n()()(),i(85,"div",40),f(86,Pe,3,0,"button",41),i(87,"button",42),c("click",function(){return t.saveTaluka()}),o(88," Save "),n(),i(89,"button",43),c("click",function(){return t.talukaModal.hide(!1)}),o(90," Close "),n()()()()()),a&2&&(r(3),I("ngModel",t.selectedDistrictId),r(),u("ngValue",null),r(2),u("ngForOf",t.districts),r(5),v(t.totalActiveTalukas),r(5),v(t.totalDeletedTalukas),r(6),u("ngIf",t.selectedActiveTalukas.length>0),r(),u("ngIf",t.selectedActiveTalukas.length>0),r(22),u("ngForOf",t.talukas),r(),u("currentPage",t.activeTalukaPagination.page)("totalItems",t.totalActiveTalukas)("pageSize",t.activeTalukaPagination.limit)("pageSizes",V(23,_e)),r(5),u("ngIf",t.selectedDeletedTalukas.length>0),r(19),u("ngForOf",t.deletedTalukas),r(),u("currentPage",t.deletedTalukaPagination.page)("totalItems",t.totalDeletedTalukas)("pageSize",t.deletedTalukaPagination.limit)("pageSizes",V(24,_e)),r(),u("ngIf",t.loading),r(6),D(" ",t.talukaModalTitle," "),r(4),u("formGroup",t.currentForm),r(2),u("ngForOf",t.talukasFormArray.controls),r(2),u("ngIf",!t.needUpdate))},dependencies:[j,K,W,me,H,te,re,se,X,J,oe,Y,Z,ae,le,ie,ne,ee]})}}return l})();var Fe=[{path:"",component:Te,data:{title:"Taluka New",breadcrumb:"Taluka New"}}],fe=(()=>{class l{static{this.\u0275fac=function(a){return new(a||l)}}static{this.\u0275mod=x({type:l})}static{this.\u0275inj=C({imports:[$.forChild(Fe),$]})}}return l})();var Ye=(()=>{class l{static{this.\u0275fac=function(a){return new(a||l)}}static{this.\u0275mod=x({type:l})}static{this.\u0275inj=C({imports:[Q,fe,pe,ce,ue]})}}return l})();export{Ye as TalukaNewModule};
