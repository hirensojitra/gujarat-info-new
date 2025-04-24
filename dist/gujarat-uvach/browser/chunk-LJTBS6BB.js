import{b as H,d as ot,r as ct}from"./chunk-VOIGYBPI.js";import{b as J,c as K,d as S,f as Q,g as X,j as Y,k as Z,o as tt,p as et,q as it,r as rt,w as nt,x as st,y as at}from"./chunk-R4GYVDXC.js";import"./chunk-RGVYU375.js";import{a as W}from"./chunk-32SRTGJU.js";import{$ as U,Aa as z,Ba as G,Ca as b,Da as m,Ea as g,J as T,K as y,La as o,M as V,Ma as v,Na as C,Ob as F,P as q,Pa as M,Q as w,Qa as P,Ra as A,Ua as k,V as h,Va as I,W as D,ga as c,ha as x,hb as B,ib as O,jb as j,pa as f,qb as L,ra as l,vb as R,xa as n,ya as r,za as p}from"./chunk-WT3K4JXK.js";import{a as E}from"./chunk-CWTPBX7D.js";var lt=(()=>{class s{constructor(t){this.http=t,this.graphUrl=W.GraphApi+"/graphql"}getDistrictStatsAndData(t,i){let e=`
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
          is_deleted
        }
        getDeletedDistricts(pagination: $getDeletedDistrictsPagination) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,a={pagination:t,getDeletedDistrictsPagination:i};return this.http.post(this.graphUrl,{query:e,variables:a})}getDistricts(t=1,i=10){let e=`
        query GetDistricts($pagination: PaginationInput) {
          getDistricts(pagination: $pagination) {
            id
            name
            gu_name
          }
        }
      `,a={pagination:{page:t,limit:i,sortBy:"name",sortOrder:"ASC"}};return this.http.post(this.graphUrl,{query:e,variables:a})}getDeletedDistricts(t=1,i=10){let e=`
        query GetDeletedDistricts($pagination: PaginationInput) {
          getDeletedDistricts(pagination: $pagination) {
            id
            name
            gu_name
          }
        }
      `,a={pagination:{page:t,limit:i,sortBy:"name",sortOrder:"ASC"}};return this.http.post(this.graphUrl,{query:e,variables:a})}createDistricts(t){let i=`
      mutation CreateDistricts($districts: [DistrictInput]!) {
        createDistricts(districts: $districts) {
          name
          gu_name
        }
      }
    `,e={districts:t};return this.http.post(this.graphUrl,{query:i,variables:e})}updateDistricts(t){let i=`
    mutation UpdateDistricts($districts: [UpdateDistrictInput]!) {
      updateDistricts(districts: $districts) {
        id
      }
    }
  `,e={districts:t};return this.http.post(this.graphUrl,{query:i,variables:e})}softDeleteDistricts(t){let i=`
      mutation Mutation($ids: [ID]!) {
        softDeleteDistricts(ids: $ids) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,e={ids:t};return this.http.post(this.graphUrl,{query:i,variables:e})}restoreDistricts(t){let i=`
      mutation Mutation($ids: [ID]!) {
        restoreDistricts(ids: $ids) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,e={ids:t};return this.http.post(this.graphUrl,{query:i,variables:e})}hardDeleteDistricts(t){let i=`
      mutation Mutation($ids: [ID]!) {
        hardDeleteDistricts(ids: $ids)
      }
    `,e={ids:t};return this.http.post(this.graphUrl,{query:i,variables:e})}softDeleteDistrict(t){let i=`
      mutation Mutation($softDeleteDistrictId: ID!) {
        softDeleteDistrict(id: $softDeleteDistrictId) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,e={softDeleteDistrictId:t};return this.http.post(this.graphUrl,{query:i,variables:e})}restoreDistrict(t){let i=`
      mutation Mutation($restoreDistrictId: ID!) {
        restoreDistrict(id: $restoreDistrictId) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,e={restoreDistrictId:t};return this.http.post(this.graphUrl,{query:i,variables:e})}getDistrictById(t){return this.http.post(this.graphUrl,{query:`
      query GetDistrictById($id: ID!) {
        getDistrictById(id: $id) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,variables:{id:t}})}getDeletedDistrictById(t){return this.http.post(this.graphUrl,{query:`
      query GetDeletedDistrictById($id: ID!) {
        getDeletedDistrictById(id: $id) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,variables:{id:t}})}createDistrict(t){let i=`
      mutation CreateDistrict($name: String!, $gu_name: String!, $is_deleted: Boolean!) {
        createDistrict(name: $name, gu_name: $gu_name, is_deleted: $is_deleted) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,e={name:t.name,gu_name:t.gu_name,is_deleted:t.is_deleted};return this.http.post(this.graphUrl,{query:i,variables:e})}updateDistrict(t){let i=`
      mutation UpdateDistrict(
        $id: ID!
        $name: String
        $gu_name: String
        $is_deleted: Boolean
      ) {
        updateDistrict(
          id: $id
          name: $name
          gu_name: $gu_name
          is_deleted: $is_deleted
        ) {
          id
          name
          gu_name
          is_deleted
        }
      }
    `,e={id:t.id,name:t.name,gu_name:t.gu_name,is_deleted:t.is_deleted};return this.http.post(this.graphUrl,{query:i,variables:e})}hardDeleteDistrict(t){return this.http.post(this.graphUrl,{query:`
      mutation HardDeleteDistrict($id: ID!) {
        hardDeleteDistrict(id: $id)
      }
    `,variables:{id:t}})}static{this.\u0275fac=function(i){return new(i||s)(V(R))}}static{this.\u0275prov=T({token:s,factory:s.\u0275fac,providedIn:"root"})}}return s})();var dt=()=>[10,20,30],mt=s=>({"table-secondary":s}),ht=s=>({"mb-3":s});function Dt(s,_){if(s&1){let t=b();n(0,"button",41),m("click",function(){h(t);let e=g();return D(e.deleteSelectedDistricts())}),p(1,"i",42),o(2,"Delete Selected "),r()}}function _t(s,_){if(s&1){let t=b();n(0,"button",43),m("click",function(){h(t);let e=g();return D(e.editSelectedDistricts())}),p(1,"i",44),o(2,"Edit Selected "),r()}}function ft(s,_){if(s&1){let t=b();n(0,"tr",45)(1,"td",46)(2,"input",47),A("ngModelChange",function(e){let a=h(t).$implicit;return P(a.selected,e)||(a.selected=e),D(e)}),m("change",function(){h(t);let e=g();return D(e.updateSelectedActiveDistricts())}),r()(),n(3,"td",46),o(4),r(),n(5,"td",46),o(6),r(),n(7,"td"),o(8),r(),n(9,"td"),o(10),r(),n(11,"td",46)(12,"button",48),m("click",function(){let e=h(t).$implicit,a=g();return D(a.editDistrict(e))}),p(13,"i",49),r(),n(14,"button",50),m("click",function(){let e=h(t).$implicit,a=g();return D(a.deleteDistrict(e.id))}),p(15,"i",51),r()()()}if(s&2){let t=_.$implicit,i=_.index,e=g();l("ngClass",I(10,mt,t.selected)),c(),l("width",50),c(),M("ngModel",t.selected),c(),l("width",80),c(),C("",i+e.activeDistrictPagination.limit*(e.activeDistrictPagination.page-1)+1," "),c(),l("width",80),c(),v(t.id),c(2),v(t.name),c(2),v(t.gu_name),c(),l("width",100)}}function bt(s,_){if(s&1){let t=b();n(0,"button",52),m("click",function(){h(t);let e=g();return D(e.restoreSelectedDistricts())}),p(1,"i",53),o(2," Restore Selected "),r()}}function vt(s,_){if(s&1){let t=b();n(0,"tr",45)(1,"td",46)(2,"input",47),A("ngModelChange",function(e){let a=h(t).$implicit;return P(a.selected,e)||(a.selected=e),D(e)}),m("change",function(){h(t);let e=g();return D(e.updateSelectedDeletedDistricts())}),r()(),n(3,"td",46),o(4),r(),n(5,"td",46),o(6),r(),n(7,"td"),o(8),r(),n(9,"td"),o(10),r(),n(11,"td",46)(12,"button",54),m("click",function(){let e=h(t).$implicit,a=g();return D(a.restoreDistrict(e.id))}),p(13,"i",55),r()()()}if(s&2){let t=_.$implicit,i=_.index,e=g();l("ngClass",I(10,mt,t.selected)),c(),l("width",50),c(),M("ngModel",t.selected),c(),l("width",80),c(),C(" ",i+e.deletedDistrictPagination.limit*(e.deletedDistrictPagination.page-1)+1," "),c(),l("width",80),c(),v(t.id),c(2),v(t.name),c(2),v(t.gu_name),c(),l("width",100)}}function St(s,_){if(s&1){let t=b();z(0),n(1,"button",64),m("click",function(){h(t);let e=g().index,a=g();return D(a.removeDistrict(e))}),p(2,"i",42),o(3,"Remove "),r(),G()}}function yt(s,_){if(s&1&&(n(0,"div",56)(1,"div",57)(2,"div",58)(3,"label",59),o(4,"Name"),r(),p(5,"input",60),r(),n(6,"div",58)(7,"label",61),o(8,"Gujarati Name"),r(),p(9,"input",62),r()(),f(10,St,4,0,"ng-container",63),r()),s&2){let t=_.index,i=g();l("ngClass",I(3,ht,t<i.districtsFormArray.controls.length-1)),c(),l("formGroupName",t),c(9),l("ngIf",i.currentForm.get("districts").value.length>1)}}function wt(s,_){if(s&1){let t=b();n(0,"button",65),m("click",function(){h(t);let e=g();return D(e.addDistrict())}),p(1,"i",16),o(2,"Add More "),r()}}var d=1,pt=(()=>{class s{constructor(t,i,e){this.districtService=t,this.fb=i,this.el=e,this.districtData={getDistrictStats:{activeDistrictLength:0,deletedDistrictLength:0,districtLength:0},getDeletedDistricts:[],getDistricts:[]},this.districts=[],this.deletedDistricts=[],this.needUpdate=!1,this.deletedDistrictCount=0,this.districtModalTitle="Add District",this.activeDistrictPagination={page:1,limit:10,sortBy:"name",sortOrder:"ASC"},this.deletedDistrictPagination={page:1,limit:10,sortBy:"name",sortOrder:"ASC"},this.totalActiveDistricts=0,this.totalDeletedDistricts=0,this.selectedActiveDistricts=[],this.selectedDeletedDistricts=[]}ngAfterViewInit(){console.log("ngAfterViewInit",d++),this.districtModalElement=this.el.nativeElement.querySelector("#districtModal"),this.districtModalOptions={backdrop:!1,keyboard:!1},this.districtModal=new bootstrap.Modal(this.districtModalElement,this.districtModalOptions)}ngOnInit(){console.log("ngOnInit",d++),this.loadDistrictData(),this.initForm()}updateSelectedActiveDistricts(){console.log("updateSelectedActiveDistricts",d++),this.selectedActiveDistricts=this.districts.filter(t=>t.selected).map(t=>t.id)}updateSelectedDeletedDistricts(){console.log("updateSelectedDeletedDistricts",d++),this.selectedDeletedDistricts=this.deletedDistricts.filter(t=>t.selected).map(t=>t.id)}loadDistrictData(){console.log("loadDistrictData",d++),this.districtService.getDistrictStatsAndData(this.activeDistrictPagination,this.deletedDistrictPagination).subscribe({next:t=>{this.districtData=t.data,this.districts=this.districtData.getDistricts,this.deletedDistricts=this.districtData.getDeletedDistricts,this.totalActiveDistricts=this.districtData.getDistrictStats.activeDistrictLength,this.totalDeletedDistricts=this.districtData.getDistrictStats.deletedDistrictLength},error:t=>console.error("Error fetching district data:",t)})}initForm(){console.log("initForm",d++),this.currentForm=this.fb.group({districts:this.fb.array([this.createDistrictForm()])})}createDistrictForm(){return console.log("createDistrictForm",d++),this.fb.group({name:["",S.required],gu_name:["",S.required]})}get districtsFormArray(){return this.currentForm.get("districts")}addDistrict(){console.log("addDistrict",d++),this.districtsFormArray.push(this.createDistrictForm())}removeDistrict(t){console.log("removeDistrict",d++);let e=this.districtsFormArray.at(t).value.id,a=this.districts.find(u=>u.id===e);a&&(a.selected=!1),this.districtsFormArray.length>1&&this.districtsFormArray.removeAt(t)}saveDistrict(){if(console.log("saveDistrict",d++),this.currentForm.invalid)return;let t=this.currentForm.value.districts;this.needUpdate?this.districtService.updateDistricts(t).subscribe({next:i=>{i.data.updateDistricts.forEach(a=>{let u=this.districts.findIndex(N=>N.id===a.id);if(u!==-1){let N=E(E({},this.districts[u]),a);this.districts[u]=N}}),this.districtModal.hide()},error:i=>console.error("Update error:",i)}):this.districtService.createDistricts(t).subscribe({next:()=>{this.loadDistrictData(),this.districtModal.hide()},error:i=>console.error("Create error:",i)})}openDistrictModal(){console.log("openDistrictModal",d++),this.districtModalTitle="Add New Districts",this.needUpdate=!1,this.districtsFormArray.clear(),this.addDistrict(),this.districtModal.show()}openMultipleEditModal(t){console.log("openMultipleEditModal",d++),this.districtModalTitle="Edit Multiple Districts",this.needUpdate=!0;let i=this.districtsFormArray;i.clear(),t.forEach(e=>{i.push(this.fb.group({id:[e.id],name:[e.name,S.required],gu_name:[e.gu_name,S.required],is_deleted:[e.is_deleted]}))}),this.districtModal.show()}deleteSelectedDistricts(){console.log("deleteSelectedDistricts",d++);let t=this.getSelectedDistricts(this.districts);t.length&&this.districtService.softDeleteDistricts(t).subscribe(()=>this.loadDistrictData())}restoreSelectedDistricts(){console.log("restoreSelectedDistricts",d++);let t=this.getSelectedDistricts(this.deletedDistricts);t.length&&this.districtService.restoreDistricts(t).subscribe(()=>this.loadDistrictData())}editSelectedDistricts(){console.log("editSelectedDistricts",d++);let t=this.getSelectedDistricts(this.districts);if(!t.length)return;let i=this.districts.filter(e=>t.includes(e.id));this.openMultipleEditModal(i)}getSelectedDistricts(t){return console.log("getSelectedDistricts",d++),t.filter(i=>i.selected).map(i=>i.id)}toggleDistrictSelection(t){console.log("toggleDistrictSelection",d++),t.selected=!t.selected}editDistrict(t){console.log("editDistrict",d++),this.districtModalTitle="Update District",this.needUpdate=!0;let i=this.districtsFormArray;i.clear(),i.push(this.fb.group({id:[t.id],name:[t.name,S.required],gu_name:[t.gu_name,S.required],is_deleted:[t.is_deleted]})),this.districtModal.show()}deleteDistrict(t){console.log("deleteDistrict",d++),this.districtService.softDeleteDistrict(t).subscribe(()=>this.loadDistrictData())}restoreDistrict(t){console.log("restoreDistrict",d++),this.districtService.restoreDistrict(t).subscribe(()=>this.loadDistrictData())}changeActivePage(t){console.log("changeActivePage",d++),this.activeDistrictPagination.page!==t&&(this.activeDistrictPagination.page=t,this.districtService.getDistricts(t,this.activeDistrictPagination.limit).subscribe(i=>{this.districts=i.data.getDistricts}))}changeActivePageSize(t){console.log("changeActivePageSize",d++),this.activeDistrictPagination.limit!==t&&(this.activeDistrictPagination.limit=t,this.activeDistrictPagination.page=1,this.districtService.getDistricts(1,t).subscribe(i=>{this.districts=i.data.getDistricts}))}changeDeletedPage(t){console.log("changeDeletedPage",d++),this.deletedDistrictPagination.page!==t&&(this.deletedDistrictPagination.page=t,this.districtService.getDeletedDistricts(t,this.deletedDistrictPagination.limit).subscribe(i=>{this.deletedDistricts=i.data.getDeletedDistricts}))}changeDeletedPageSize(t){console.log("changeDeletedPageSize",d++),this.deletedDistrictPagination.limit!==t&&(this.deletedDistrictPagination.limit=t,this.deletedDistrictPagination.page=1,this.districtService.getDeletedDistricts(1,t).subscribe(i=>{this.deletedDistricts=i.data.getDeletedDistricts}))}static{this.\u0275fac=function(i){return new(i||s)(x(lt),x(nt),x(U))}}static{this.\u0275cmp=q({type:s,selectors:[["app-district-new"]],decls:85,vars:19,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column"],[1,"navbar","navbar-expand-lg","navbar-light","bg-light","px-3"],["href","#",1,"navbar-brand"],["type","button","data-bs-toggle","collapse","data-bs-target","#districtNav","aria-controls","districtNav","aria-expanded","false","aria-label","Toggle navigation",1,"navbar-toggler"],[1,"navbar-toggler-icon"],["id","districtNav",1,"collapse","navbar-collapse"],["id","pills-tab","role","tablist",1,"navbar-nav","me-auto","mb-2","mb-lg-0","nav","nav-pills"],["role","presentation",1,"nav-item"],["id","tab1a","data-bs-toggle","pill","data-bs-target","#1a","type","button","role","tab","aria-controls","1a","aria-selected","true",1,"nav-link","active"],["id","tab2a","data-bs-toggle","pill","data-bs-target","#2a","type","button","role","tab","aria-controls","2a","aria-selected","false",1,"nav-link"],[1,"tab-content","flex-grow-1","p-3","bg-white"],["id","1a","role","tabpanel","aria-labelledby","tab1a",1,"tab-pane","fade","show","active","position-relative","h-100"],[1,"position-absolute","h-100","w-100","d-flex","flex-column"],[1,"row","g-2","align-items-center"],[1,"col-12","ms-auto","d-flex"],[1,"btn","btn-success","text-white","flex-grow-1",3,"click"],[1,"fa","fa-plus","me-2"],["class","btn btn-danger ms-2 flex-grow-1",3,"click",4,"ngIf"],["class","btn btn-secondary ms-2 flex-grow-1",3,"click",4,"ngIf"],[1,"flex-grow-1","position-relative"],[1,"position-absolute","overflow-y-auto","h-100","w-100"],[1,"table","table-responsive"],["class","align-middle",3,"ngClass",4,"ngFor","ngForOf"],["pagination","",1,"mt-0","mb-0","px-3",3,"currentPageChange","pageSizeChange","currentPage","totalItems","pageSize","pageSizes"],["id","2a","role","tabpanel","aria-labelledby","tab2a",1,"tab-pane","fade","position-relative","h-100"],["class","btn btn-secondary flex-grow-1",3,"click",4,"ngIf"],["id","districtModal","tabindex","-1","aria-labelledby","districtModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","districtModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn","ms-auto",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["formArrayName","districts"],["class","d-flex align-items-stretch border border-light rounded px-2 position-relative",3,"ngClass",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","class","btn btn-primary text-white",3,"click",4,"ngIf"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],[1,"btn","btn-danger","ms-2","flex-grow-1",3,"click"],[1,"fa","fa-trash","me-2"],[1,"btn","btn-secondary","ms-2","flex-grow-1",3,"click"],[1,"fa","fa-edit","me-2"],[1,"align-middle",3,"ngClass"],[3,"width"],["type","checkbox",3,"ngModelChange","change","ngModel"],[1,"btn","btn-dark","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-danger","btn-md",3,"click"],[1,"fa","fa-trash"],[1,"btn","btn-secondary","flex-grow-1",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"btn","btn-success","btn-md",3,"click"],[1,"fa","fa-refresh"],[1,"d-flex","align-items-stretch","border","border-light","rounded","px-2","position-relative",3,"ngClass"],[1,"py-3","flex-grow-1",3,"formGroupName"],[1,"form-group","p-2"],["for","district-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","name","id","district-name",1,"form-control"],["for","district-gu-name",1,"form-label","mb-2"],["type","text","placeholder","","formControlName","gu_name","id","district-gu-name",1,"form-control"],[4,"ngIf"],["type","button",1,"btn","btn-outline-danger","btn-sm","my-3","position-absolute","top-0","end-0","me-3",3,"click"],["type","button",1,"btn","btn-primary","text-white",3,"click"]],template:function(i,e){i&1&&(n(0,"div",0)(1,"nav",1)(2,"a",2),o(3,"Districts"),r(),n(4,"button",3),p(5,"span",4),r(),n(6,"div",5)(7,"ul",6)(8,"li",7)(9,"button",8),o(10," Active Districts "),r()(),n(11,"li",7)(12,"button",9),o(13," Deleted Districts "),r()()()()(),n(14,"div",10)(15,"div",11)(16,"div",12)(17,"div",13)(18,"div",14)(19,"button",15),m("click",function(){return e.openDistrictModal()}),p(20,"i",16),o(21," Add District "),r(),f(22,Dt,3,0,"button",17)(23,_t,3,0,"button",18),r()(),n(24,"div",19)(25,"div",20)(26,"table",21)(27,"thead")(28,"tr"),p(29,"th"),n(30,"th"),o(31,"SR."),r(),n(32,"th"),o(33,"ID"),r(),n(34,"th"),o(35,"Name"),r(),n(36,"th"),o(37,"Gujarati Name"),r(),n(38,"th"),o(39,"Actions"),r()()(),n(40,"tbody"),f(41,ft,16,12,"tr",22),r()()()(),n(42,"div",23),m("currentPageChange",function(u){return e.changeActivePage(u)})("pageSizeChange",function(u){return e.changeActivePageSize(u)}),r()()(),n(43,"div",24)(44,"div",12)(45,"div",13)(46,"div",14),f(47,bt,3,0,"button",25),r()(),n(48,"div",19)(49,"div",20)(50,"table",21)(51,"thead")(52,"tr"),p(53,"th"),n(54,"th"),o(55,"Sr."),r(),n(56,"th"),o(57,"ID"),r(),n(58,"th"),o(59,"Name"),r(),n(60,"th"),o(61,"Gujarati Name"),r(),n(62,"th"),o(63,"Actions"),r()()(),n(64,"tbody"),f(65,vt,14,12,"tr",22),r()()()(),n(66,"div",23),m("currentPageChange",function(u){return e.changeDeletedPage(u)})("pageSizeChange",function(u){return e.changeDeletedPageSize(u)}),r()()()()(),n(67,"div",26)(68,"div",27)(69,"div",28)(70,"div",29)(71,"h5",30),o(72),r(),n(73,"button",31),m("click",function(){return e.districtModal.hide()}),p(74,"i",32),r()(),n(75,"div",33)(76,"form",34)(77,"div",35),f(78,yt,11,5,"div",36),r()()(),n(79,"div",37),f(80,wt,3,0,"button",38),n(81,"button",39),m("click",function(){return e.saveDistrict()}),o(82," Save "),r(),n(83,"button",40),m("click",function(){return e.districtModal.hide(!1)}),o(84," Close "),r()()()()()),i&2&&(c(22),l("ngIf",e.selectedActiveDistricts.length>0),c(),l("ngIf",e.selectedActiveDistricts.length>0),c(18),l("ngForOf",e.districts),c(),l("currentPage",e.activeDistrictPagination.page)("totalItems",e.totalActiveDistricts)("pageSize",e.activeDistrictPagination.limit)("pageSizes",k(17,dt)),c(5),l("ngIf",e.selectedDeletedDistricts.length>0),c(18),l("ngForOf",e.deletedDistricts),c(),l("currentPage",e.deletedDistrictPagination.page)("totalItems",e.totalDeletedDistricts)("pageSize",e.deletedDistrictPagination.limit)("pageSizes",k(18,dt)),c(6),C(" ",e.districtModalTitle," "),c(4),l("formGroup",e.currentForm),c(2),l("ngForOf",e.districtsFormArray.controls),c(2),l("ngIf",!e.needUpdate))},dependencies:[B,O,j,ot,H,Z,K,J,Q,X,tt,rt,et,it,Y]})}}return s})();var xt=[{path:"",component:pt,data:{title:"District New",breadcrumb:"District New"}}],gt=(()=>{class s{static{this.\u0275fac=function(i){return new(i||s)}}static{this.\u0275mod=w({type:s})}static{this.\u0275inj=y({imports:[F.forChild(xt),F]})}}return s})();var jt=(()=>{class s{static{this.\u0275fac=function(i){return new(i||s)}}static{this.\u0275mod=w({type:s})}static{this.\u0275inj=y({imports:[L,gt,ct,at,st]})}}return s})();export{jt as DistrictNewModule};
