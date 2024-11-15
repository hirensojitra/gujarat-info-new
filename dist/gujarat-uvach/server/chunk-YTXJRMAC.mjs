import './polyfills.server.mjs';
import{a as ie}from"./chunk-FUEJJ5CE.mjs";import{a as te}from"./chunk-SZ3HQCAL.mjs";import{A as J,B as K,C as Q,D as W,E as X,F as Y,G as Z,O as ee,h as U,i as v,j as G,k as R,o as q,s as $,v as H,w as B,x as P,y as z}from"./chunk-M3R2DYLK.mjs";import{Aa as i,Ba as t,Ca as c,E as x,Fa as E,Ga as h,Gb as V,Ha as p,K as M,L as S,Oa as o,Pa as u,Q as g,Qa as I,R as b,W as F,fc as A,ha as r,ia as k,ic as j,jc as O,kc as y,sa as f,ua as d,yb as N,zb as L}from"./chunk-LNWWKHVG.mjs";function de(a,s){if(a&1&&(i(0,"option",44),o(1),t()),a&2){let e=s.$implicit;d("value",e.id),r(),u(e.name)}}function se(a,s){if(a&1&&(i(0,"div",37)(1,"div",38)(2,"label",39),o(3,"District"),t()(),i(4,"div",40)(5,"select",41)(6,"option",42),o(7,"Select a district"),t(),f(8,de,2,2,"option",43),t()()()),a&2){let e=p();r(5),d("options",e.districts),r(3),d("ngForOf",e.districts)}}function me(a,s){if(a&1){let e=E();i(0,"button",45),h("click",function(){g(e);let n=p();return b(n.openDeletedModal())}),c(1,"i",46),o(2,"Restore"),t()}}function ce(a,s){if(a&1){let e=E();i(0,"tr",47)(1,"td")(2,"button",48),c(3,"i",49),t()(),i(4,"td"),o(5),t(),i(6,"td"),o(7),t(),i(8,"td"),o(9),t(),i(10,"td"),o(11),t(),i(12,"td",50)(13,"button",51),h("click",function(){let n=g(e).$implicit,m=p();return b(m.editTaluka(n))}),c(14,"i",52),t(),i(15,"button",53),h("click",function(){let n=g(e).$implicit,m=p();return b(m.deleteTaluka(n.id))}),c(16,"i",54),t()()()}if(a&2){let e=s.$implicit,l=s.index,n=p();r(2),d("routerLink","/view/village/"+n.paramDist+"/"+e.id),r(3),u(l+1),r(2),u(e.id),r(2),u(e.name),r(2),u(e.gu_name)}}function ue(a,s){a&1&&c(0,"input",55)}function pe(a,s){if(a&1&&(i(0,"div",56)(1,"div",38)(2,"label",57),o(3,"Taluka ID"),t()(),i(4,"div",40)(5,"div",58),o(6),c(7,"input",59),t()()()),a&2){let e,l=p();r(6),I(" ",(e=l.currentForm.get("id"))==null?null:e.value," ")}}function he(a,s){if(a&1&&(i(0,"option",44),o(1),t()),a&2){let e=s.$implicit;d("value",e.id),r(),u(e.name)}}function ke(a,s){if(a&1&&(i(0,"select",63)(1,"option",42),o(2,"Select a district"),t(),f(3,he,2,2,"option",43),t()),a&2){let e=p(2);r(3),d("ngForOf",e.districts)}}function fe(a,s){if(a&1&&(i(0,"div",64)(1,"div",65),o(2),t(),c(3,"input",66),t()),a&2){let e=p(2);r(2),u(e.selectedDistrict==null?null:e.selectedDistrict.name)}}function _e(a,s){if(a&1&&(i(0,"div",56)(1,"div",38)(2,"label",60),o(3,"District"),t()(),i(4,"div",40),f(5,ke,4,1,"select",61)(6,fe,4,1,"div",62),t()()),a&2){let e=p();r(5),d("ngIf",e.needUpdate),r(),d("ngIf",!e.needUpdate)}}function ve(a,s){a&1&&(i(0,"div",56)(1,"div",38)(2,"label",67),o(3,"Taluka Name"),t()(),i(4,"div",40),c(5,"input",68),t()())}function ge(a,s){a&1&&(i(0,"div",56)(1,"div",38)(2,"label",69),o(3,"Gujarati Name"),t()(),i(4,"div",40),c(5,"input",70),t()())}function be(a,s){if(a&1){let e=E();i(0,"tr")(1,"th",71),o(2),t(),i(3,"td"),o(4),t(),i(5,"td"),o(6),t(),i(7,"td"),o(8),t(),i(9,"td",50)(10,"button",72),h("click",function(){let n=g(e).$implicit,m=p();return b(m.toggleTalukaActive(n.id))}),o(11,"Restore"),t()()()}if(a&2){let e=s.$implicit,l=s.index;r(2),u(l+1),r(2),u(e.id),r(2),u(e.name),r(2),u(e.gu_name)}}var le=(()=>{class a{constructor(e,l,n,m,D,C,_,T){this.districtService=e,this.talukaService=l,this.fb=n,this.DS=m,this.el=D,this.toastService=C,this.router=_,this.route=T,this.talukas=[],this.districts=[],this.newTaluka={id:"",name:""},this.needUpdate=!1,this.needAdd=!1,this.talukaDeletedModalTitle="Deleted Taluka";let w=this.fb.group({name:["",[v.required]],gu_name:[""],district_id:["",v.required],is_deleted:[!1]});this.talukaForm=w;let oe=this.fb.group({id:["",[v.required]],name:["",v.required],gu_name:[""],district_id:["",v.required],is_deleted:[!1]});this.talukaUpdateForm=oe,this.currentForm=w,this.filterTaluka=this.fb.group({district:["",v.required]}),this.route.params.subscribe(re=>{this.paramDist=re.distId||1,this.paramDist&&this.loadDistrict()})}ngOnInit(){}updateDistId(e){this.router.navigate(["../",e],{relativeTo:this.route,queryParamsHandling:"merge",replaceUrl:!0})}ngAfterViewInit(){this.loadDistrict(),this.filterTaluka.get("district")?.valueChanges.subscribe(_=>{if(!_)return this.selectedDistrict=null,!1;this.updateDistId(_),this.districtService.getDistrictById(_).subscribe(T=>{T&&(this.loadTaluka(),this.selectedDistrict=T,this.loadDeletedTalukaLength())})}),this.talukaModalElement=this.el.nativeElement.querySelector("#talukaModal"),this.talukaModalOptions={backdrop:!0,keyboard:!1},this.talukaModal=new bootstrap.Modal(this.talukaModalElement,this.talukaModalOptions);let e=()=>{this.currentForm.get("district_id")?.setValue(this.selectedDistrict?.id)},l=()=>{this.talukaData=null,this.talukaModalTitle="",this.currentForm.reset(),this.talukaUpdateForm.reset(),this.talukaForm.reset(),this.needUpdate=!1,this.needAdd=!1},n=_=>{console.log(_)};this.talukaModalElement.addEventListener("show.bs.modal",e),this.talukaModalElement.addEventListener("hidden.bs.modal",l),this.talukaModalElement.addEventListener("hide.bs.modal",n),this.talukaDeletedModalElement=this.el.nativeElement.querySelector("#talukaDeletedModal"),this.talukaDeletedModalOptions={backdrop:!0,keyboard:!1},this.talukaDeletedModal=new bootstrap.Modal(this.talukaDeletedModalElement,this.talukaDeletedModalOptions);let m=()=>{},D=()=>{},C=()=>{};this.talukaDeletedModalElement.addEventListener("show.bs.modal",m),this.talukaDeletedModalElement.addEventListener("hidden.bs.modal",D),this.talukaDeletedModalElement.addEventListener("hide.bs.modal",C)}editTaluka(e){this.currentForm=this.talukaUpdateForm,this.currentForm.reset(),this.talukaData=e,this.talukaModalTitle="Edit "+e.name,this.currentForm.get("id")?.setValue(e.id),this.currentForm.get("name")?.setValue(e.name),this.currentForm.get("gu_name")?.setValue(e.gu_name),this.currentForm.get("district_id")?.setValue(e.district_id),this.talukaModal.show(),this.needUpdate=!0}addTaluka(){console.log(this.talukaForm.controls),this.currentForm=this.talukaForm,this.currentForm.reset(),this.needAdd=!0,this.currentForm.get("is_deleted")?.setValue(!1),this.currentForm.get("district_id")?.setValue(this.selectedDistrict.id),this.talukaModalTitle="Add Taluka",this.talukaModal.show()}saveTaluka(){if(this.DS.markFormGroupTouched(this.currentForm),this.currentForm.valid)this.needUpdate&&this.updateTaluka(this.currentForm.value),this.needAdd&&this.addNewTaluka(),this.talukaModal.hide();else{console.log(this.currentForm.value);let e=this.needUpdate?"Please enter valid data to update 'Taluka'":"Please enter valid data for 'New Taluka'";this.toastService.show(e,{class:"bg-danger"})}}loadDistrict(){this.districtService.getDistrict().subscribe(e=>{this.districts=e,e.length&&(e.sort((l,n)=>(l.name||"").localeCompare(n.name||"")),this.selectedDistrict=this.paramDist!==void 0&&e.find(l=>l.id==this.paramDist)||e[0],this.filterTaluka.get("district")?.setValue(this.selectedDistrict?.id))})}loadTaluka(){this.talukaService.getTalukaByDistrict(this.filterTaluka.get("district")?.value).subscribe(e=>{e.sort((l,n)=>(l.name||"").localeCompare(n.name||"")),this.talukas=e})}addNewTaluka(){console.log(this.currentForm.value),this.talukaService.addTaluka(this.currentForm.value).subscribe(e=>{console.log("Taluka added successfully:",e),this.loadTaluka()})}deleteTaluka(e){this.talukaService.deleteTaluka(e).subscribe(l=>{console.log("Taluka deleted successfully:",l),this.loadTaluka(),this.loadDeletedTalukaLength()})}updateTaluka(e){let l=e.id,n={name:e.name,gu_name:e.gu_name,district_id:e.district_id,is_deleted:e.is_deleted||!1};console.log(l,n),this.talukaService.updateTaluka(l,n).subscribe(m=>{console.log("Taluka updated successfully:",m),this.loadTaluka()},m=>{console.error("Error updating taluka:",m)})}loadDeletedTalukaLength(){let e=this.selectedDistrict?.id;e&&this.talukaService.getDeletedTalukaLength(e).subscribe(l=>{this.deletedTalukaCount=l.deletedtalukacount,l.deletedTalukasLength||this.talukaDeletedModal.hide()},l=>{console.error("Error loading deleted talukas count:",l)})}loadDeletedTaluka(){let e=this.selectedDistrict?.id;this.talukaService.getDeletedTaluka(e).subscribe(l=>{console.log(l),this.deletedTalukaList=l},l=>{console.error("Error loading deleted talukas:",l)})}toggleTalukaActive(e){this.talukaService.toggleTalukaActive(e).subscribe(l=>{this.loadDeletedTalukaLength(),this.loadDeletedTaluka(),this.loadTaluka()},l=>{console.error("Error toggling taluka active state:",l)})}openDeletedModal(){this.loadDeletedTaluka(),this.talukaDeletedModal.show()}static{this.\u0275fac=function(l){return new(l||a)(k(Y),k(Z),k(J),k(ie),k(F),k(te),k(j),k(A))}}static{this.\u0275cmp=M({type:a,selectors:[["app-taluka"]],decls:73,vars:15,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column"],[1,"container","pt-3"],["action","",1,"row","g-2","align-items-center",3,"formGroup"],[1,"col-lg-4","col-6"],["class","form-group row g-2 align-items-center",4,"ngIf"],[1,"col-auto","ms-auto"],[1,"btn","btn-success","me-2",3,"click"],[1,"fa","fa-plus","me-2"],["class","btn btn-primary",3,"click",4,"ngIf"],[1,"flex-grow-1","p-3","m-3","bg-white"],[1,"h-100","container","position-relative","overflow-y-auto","p-0"],[1,"position-absolute","h-100","w-100","table-responsive"],[1,"table","w-100","m-0","max-h-100-p","max-w-100-p","bg-white","text-nowrap"],[1,"sticky-top","bg-light"],[1,"text-center",3,"width"],["class","align-middle",4,"ngFor","ngForOf"],["id","talukaModal","tabindex","-1","aria-labelledby","talukaModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","talukaModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["type","hidden","placeholder","","formControlName","is_deleted",4,"ngIf"],["class","form-group row g-2 align-items-center mb-3",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],["id","talukaDeletedModal","tabindex","-1","aria-labelledby","talukaDeletedModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","modal-xl","p-0","my-0","modal-dialog-centered","position-relative","h-100"],["id","talukaDeletedModalLabel",1,"modal-title","text-white"],[1,"table"],["scope","col"],["scope","col",1,"w-80-px","text-center"],[4,"ngFor","ngForOf"],[1,"form-group","row","g-2","align-items-center"],[1,"col-4","text-end"],["for","district",1,"form-label","mb-0"],[1,"col-8"],["id","district","formControlName","district","selectDropdown","",1,"form-select",3,"options"],["value","","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[1,"btn","btn-primary",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"align-middle"],[1,"btn","btn-success","btn-sm","text-white",3,"routerLink"],[1,"fa","fa-plus"],[1,"text-center"],[1,"btn","btn-flat","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-flat","btn-md",3,"click"],[1,"fa","fa-trash"],["type","hidden","placeholder","","formControlName","is_deleted"],[1,"form-group","row","g-2","align-items-center","mb-3"],["for","taluka-id",1,"form-label","mb-0"],[1,"form-control","bg-light"],["type","hidden","placeholder","","formControlName","id"],["for","district_id",1,"form-label","mb-0"],["class","form-select","id","district_id","formControlName","district_id",4,"ngIf"],["class","div",4,"ngIf"],["id","district_id","formControlName","district_id",1,"form-select"],[1,"div"],[1,"form-control"],["type","hidden","placeholder","","formControlName","district_id"],["for","taluka-name",1,"form-label","mb-0"],["type","text","placeholder","","formControlName","name","id","taluka-name",1,"form-control"],["for","gu_name",1,"form-label","mb-0"],["type","text","placeholder","","formControlName","gu_name","id","gu_name",1,"form-control"],["scope","row"],[1,"btn","btn-success","btn-sm",3,"click"]],template:function(l,n){l&1&&(i(0,"div",0)(1,"div",1)(2,"form",2)(3,"div",3),f(4,se,9,2,"div",4),t(),i(5,"div",5)(6,"button",6),h("click",function(){return n.addTaluka()}),c(7,"i",7),o(8,"Add Taluka"),t(),f(9,me,3,0,"button",8),t()()(),i(10,"div",9)(11,"div",10)(12,"div",11)(13,"table",12)(14,"thead",13)(15,"tr"),c(16,"th",14),i(17,"th"),o(18,"No."),t(),i(19,"th"),o(20,"Code"),t(),i(21,"th"),o(22,"Name"),t(),i(23,"th"),o(24,"Gujarati Name"),t(),i(25,"th",14),o(26,"Action"),t()()(),i(27,"tbody"),f(28,ce,17,5,"tr",15),t()()()()()(),i(29,"div",16)(30,"div",17)(31,"div",18)(32,"div",19)(33,"h5",20),o(34),t(),i(35,"button",21),h("click",function(){return n.talukaModal.hide()}),c(36,"i",22),t()(),i(37,"div",23)(38,"form",24),f(39,ue,1,0,"input",25)(40,pe,8,1,"div",26)(41,_e,7,2,"div",26)(42,ve,6,0,"div",26)(43,ge,6,0,"div",26),t()(),i(44,"div",27)(45,"button",28),h("click",function(){return n.saveTaluka()}),o(46,"Save"),t(),i(47,"button",29),h("click",function(){return n.talukaModal.hide(!1)}),o(48,"Close"),t()()()()(),i(49,"div",30)(50,"div",31)(51,"div",18)(52,"div",19)(53,"h5",32),o(54),t(),i(55,"button",21),h("click",function(){return n.talukaDeletedModal.hide()}),c(56,"i",22),t()(),i(57,"div",23)(58,"table",33)(59,"thead")(60,"tr")(61,"th",34),o(62,"No."),t(),i(63,"th",34),o(64,"ID"),t(),i(65,"th",34),o(66,"Name"),t(),i(67,"th",34),o(68,"Gujarati Name"),t(),i(69,"th",35),o(70,"Actions"),t()()(),i(71,"tbody"),f(72,be,12,4,"tr",36),t()()()()()()),l&2&&(r(2),d("formGroup",n.filterTaluka),r(2),d("ngIf",n.filterTaluka.get("district")),r(5),d("ngIf",n.deletedTalukaCount>0),r(7),d("width",50),r(9),d("width",100),r(3),d("ngForOf",n.talukas),r(6),u(n.talukaModalTitle),r(4),d("formGroup",n.currentForm),r(),d("ngIf",n.currentForm.get("is_deleted")!==null),r(),d("ngIf",n.currentForm.get("id")!==null&&n.needUpdate),r(),d("ngIf",n.currentForm.get("district_id")),r(),d("ngIf",n.currentForm.get("name")!==null),r(),d("ngIf",n.currentForm.get("gu_name")!==null),r(11),u(n.talukaDeletedModalTitle),r(18),d("ngForOf",n.deletedTalukaList))},dependencies:[N,L,O,W,X,q,P,z,U,B,G,R,$,H]})}}return a})();var Te=[{path:"",component:le,data:{title:"Taluka",breadcrumb:"Taluka"}}],ne=(()=>{class a{static{this.\u0275fac=function(l){return new(l||a)}}static{this.\u0275mod=S({type:a})}static{this.\u0275inj=x({imports:[y.forChild(Te),y]})}}return a})();var $e=(()=>{class a{static{this.\u0275fac=function(l){return new(l||a)}}static{this.\u0275mod=S({type:a})}static{this.\u0275inj=x({imports:[V,ne,ee,Q,K]})}}return a})();export{$e as a};
