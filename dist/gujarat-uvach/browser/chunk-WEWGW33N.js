import{a as J}from"./chunk-4LGYRGM3.js";import{a as z}from"./chunk-YWBLPZ74.js";import{A as $,C as H,D as B,N as P,g as V,h as v,i as A,j,m as O,q as G,t as R,y as U,z as q}from"./chunk-26MFHNYG.js";import"./chunk-ADA2GC6O.js";import"./chunk-WVD7KDO5.js";import{u as T,v as C}from"./chunk-IQ323PG2.js";import{Ka as l,La as D,X as E,_a as b,ab as a,fa as y,ga as S,gb as e,hb as i,ib as c,lb as w,mb as p,nb as h,oa as _,pa as g,qc as I,rc as L,wa as F,wb as d,xb as u,yb as k,yc as N}from"./chunk-ZATDRLX4.js";import"./chunk-CWTPBX7D.js";function X(r,m){if(r&1){let t=w();e(0,"button",35),p("click",function(){_(t);let n=h();return g(n.openDeletedModal())}),c(1,"i",36),d(2,"Restore"),i()}}function Y(r,m){if(r&1){let t=w();e(0,"tr",37)(1,"td")(2,"button",38),c(3,"i",39),i()(),e(4,"td"),d(5),i(),e(6,"td"),d(7),i(),e(8,"td"),d(9),i(),e(10,"td"),d(11),i(),e(12,"td",40)(13,"button",41),p("click",function(){let n=_(t).$implicit,s=h();return g(s.editDistrict(n))}),c(14,"i",42),i(),e(15,"button",43),p("click",function(){let n=_(t).$implicit,s=h();return g(s.deleteDistrict(n.id))}),c(16,"i",44),i()()()}if(r&2){let t=m.$implicit,o=m.index;l(2),a("routerLink","/view/taluka/"+t.id),l(3),u(o+1),l(2),u(t.id),l(2),u(t.name),l(2),u(t.gu_name)}}function Z(r,m){r&1&&c(0,"input",45)}function tt(r,m){if(r&1&&(e(0,"div",51),d(1),c(2,"input",52),i()),r&2){let t,o=h(2);l(),k(" ",(t=o.currentForm.get("id"))==null?null:t.value," ")}}function et(r,m){if(r&1&&(e(0,"div",46)(1,"div",47)(2,"label",48),d(3,"District ID"),i()(),e(4,"div",49),b(5,tt,3,1,"div",50),i()()),r&2){let t=h();l(5),a("ngIf",t.needUpdate)}}function it(r,m){r&1&&(e(0,"div",46)(1,"div",47)(2,"label",53),d(3,"Name"),i()(),e(4,"div",49),c(5,"input",54),i()())}function rt(r,m){r&1&&(e(0,"div",46)(1,"div",47)(2,"label",53),d(3,"Gujarati Name"),i()(),e(4,"div",49),c(5,"input",55),i()())}function nt(r,m){if(r&1){let t=w();e(0,"tr")(1,"th",56),d(2),i(),e(3,"td"),d(4),i(),e(5,"td"),d(6),i(),e(7,"td"),d(8),i(),e(9,"td",40)(10,"button",57),p("click",function(){let n=_(t).$implicit,s=h();return g(s.toggleDistrictActive(n.id))}),d(11,"Restore"),i()()()}if(r&2){let t=m.$implicit,o=m.index;l(2),u(o+1),l(2),u(t.id),l(2),u(t.name),l(2),u(t.gu_name)}}var Q=(()=>{class r{constructor(t,o,n,s,f){this.districtService=t,this.fb=o,this.DS=n,this.el=s,this.toastService=f,this.districts=[],this.newDistrict={name:"",is_deleted:!1},this.needUpdate=!1,this.needAdd=!1,this.districtDeletedModalTitle="Deleted District";let x=this.fb.group({is_deleted:[!1,[v.required]],name:["",[v.required]],gu_name:[""]});this.districtForm=x;let M=this.fb.group({id:["",[v.required]],is_deleted:[!1,[v.required]],name:["",[v.required]],gu_name:[""]});this.districtUpdateForm=M,this.currentForm=x}ngAfterViewInit(){this.districtModalElement=this.el.nativeElement.querySelector("#districtModal"),this.districtModalOptions={backdrop:!1,keyboard:!1},this.districtModal=new bootstrap.Modal(this.districtModalElement,this.districtModalOptions);let t=()=>{},o=()=>{this.districtData=null,this.districtModalTitle="",this.currentForm.reset(),this.needUpdate=!1,this.needAdd=!1},n=M=>{console.log(M)};this.districtModalElement.addEventListener("show.bs.modal",t),this.districtModalElement.addEventListener("hidden.bs.modal",o),this.districtModalElement.addEventListener("hide.bs.modal",n),this.districtDeletedModalElement=this.el.nativeElement.querySelector("#districtDeletedModal"),this.districtDeletedModalOptions={backdrop:!1,keyboard:!1},this.districtDeletedModal=new bootstrap.Modal(this.districtDeletedModalElement,this.districtModalOptions);let s=()=>{},f=()=>{},x=()=>{};this.districtDeletedModalElement.addEventListener("show.bs.modal",s),this.districtDeletedModalElement.addEventListener("hidden.bs.modal",f),this.districtDeletedModalElement.addEventListener("hide.bs.modal",x)}editDistrict(t){this.currentForm=this.districtUpdateForm,this.currentForm.reset(),this.districtData=t,this.districtModalTitle="Edit "+t.name,this.currentForm.get("is_deleted")?.setValue(!!t.is_deleted),this.currentForm.get("id")?.setValue(t.id),this.currentForm.get("name")?.setValue(t.name),this.currentForm.get("gu_name")?.setValue(t.gu_name||""),this.districtModal.show(),this.needUpdate=!0}addDistrict(){this.currentForm=this.districtForm,this.currentForm.reset(),this.currentForm.get("is_deleted")?.setValue(!1),this.needAdd=!0,this.districtModalTitle="Add District",this.districtModal.show()}saveDistrict(){if(this.DS.markFormGroupTouched(this.currentForm),this.currentForm.valid)this.needUpdate&&this.updateDistrict(this.currentForm.value),this.needAdd&&(this.newDistrict=this.currentForm.value,this.addNewDistrict()),this.districtModal.hide();else{let t=this.needUpdate?"Please enter valid data to update 'District'":"Please enter valid data for 'New District'";this.toastService.show(t,{class:"bg-danger"})}}ngOnInit(){this.loadDistrict(),this.loadDeletedDistrictLength()}loadDistrict(){this.districtService.getDistrict().subscribe(t=>{this.districts=t.sort((o,n)=>{let s=o.name.toLowerCase(),f=n.name.toLowerCase();return s<f?-1:s>f?1:0})})}addNewDistrict(){console.log(this.newDistrict),this.districtService.addDistrict(this.newDistrict).subscribe(t=>{console.log("District added successfully:",t),this.loadDistrict()})}deleteDistrict(t){this.districtService.deleteDistrict(t).subscribe(o=>{console.log("District deleted successfully:",o),this.loadDistrict(),this.loadDeletedDistrictLength()})}updateDistrict(t){let o=t.id;this.districtService.updateDistrict(o,t).subscribe(n=>{n.success?this.loadDistrict():console.error("Failed to update district:",n.message)},n=>{console.error("Error:",n)})}loadDeletedDistrictLength(){this.districtService.getDeletedDistrictLength().subscribe(t=>{this.deletedDistrictCount=t.deletedDistrictCount,t.deletedDistrictCount||this.districtDeletedModal.hide()},t=>{console.error("Error loading deleted districts count:",t)})}loadDeletedDistrict(){this.districtService.getDeletedDistrict().subscribe(t=>{this.deletedDistrictList=t},t=>{console.error("Error loading deleted districts:",t)})}toggleDistrictActive(t){this.districtService.toggleDistrictActive(t).subscribe(o=>{this.loadDeletedDistrictLength(),this.loadDeletedDistrict(),this.loadDistrict()},o=>{console.error("Error toggling district active state:",o)})}openDeletedModal(){this.loadDeletedDistrict(),this.districtDeletedModal.show()}static{this.\u0275fac=function(o){return new(o||r)(D(B),D(U),D(J),D(F),D(z))}}static{this.\u0275cmp=y({type:r,selectors:[["app-district"]],decls:70,vars:12,consts:[[1,"h-100","overflow-only-y","d-flex","flex-column"],[1,"container","pt-3"],[1,"row","g-2","align-items-center"],[1,"col-auto","ms-auto"],[1,"btn","btn-success","me-2",3,"click"],[1,"fa","fa-plus","me-2"],["class","btn btn-primary",3,"click",4,"ngIf"],[1,"flex-grow-1","p-3","m-3","bg-white"],[1,"h-100","container","position-relative","overflow-y-auto","p-0"],[1,"position-absolute","h-100","w-100","table-responsive"],[1,"table","w-100","m-0","max-h-100-p","max-w-100-p","bg-white","text-nowrap"],[1,"sticky-top","bg-light"],[1,"text-center",3,"width"],["class","align-middle",4,"ngFor","ngForOf"],["id","districtModal","tabindex","-1","aria-labelledby","districtModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","p-0","my-0","modal-dialog-centered","position-relative","h-100"],[1,"modal-content"],[1,"modal-header","bg-success","py-2"],["id","districtModalLabel",1,"modal-title","text-white"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn",3,"click"],[1,"fa","fa-close","btn-flat","text-white"],[1,"modal-body","h-100","overflow-auto","py-0","my-3","d-flex","flex-column"],[1,"mt-3",3,"formGroup"],["type","hidden","placeholder","","formControlName","is_deleted",4,"ngIf"],["class","form-group row align-items-center mb-3",4,"ngIf"],[1,"modal-footer"],[1,"btn","btn-md","btn-success","ms-2",3,"click"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary",3,"click"],["id","districtDeletedModal","tabindex","-1","aria-labelledby","districtDeletedModalLabel",1,"modal","fade"],[1,"modal-dialog","modal-dialog-scrollable","modal-xl","p-0","my-0","modal-dialog-centered","position-relative","h-100"],["id","districtDeletedModalLabel",1,"modal-title","text-white"],[1,"table"],["scope","col"],["scope","col",1,"w-80-px","text-center"],[4,"ngFor","ngForOf"],[1,"btn","btn-primary",3,"click"],[1,"fa","fa-refresh","me-2"],[1,"align-middle"],[1,"btn","btn-success","btn-sm","text-white",3,"routerLink"],[1,"fa","fa-plus"],[1,"text-center"],[1,"btn","btn-flat","btn-md","me-2",3,"click"],[1,"fa","fa-edit"],[1,"btn","btn-flat","btn-md",3,"click"],[1,"fa","fa-trash"],["type","hidden","placeholder","","formControlName","is_deleted"],[1,"form-group","row","align-items-center","mb-3"],[1,"col-4","text-end"],["for","district-id",1,"form-label","mb-0"],[1,"col-8"],["class","form-control bg-light",4,"ngIf"],[1,"form-control","bg-light"],["type","hidden","placeholder","","formControlName","id"],["for","district-name",1,"form-label","mb-0"],["type","text","placeholder","","formControlName","name","id","district-name",1,"form-control"],["type","text","placeholder","","formControlName","gu_name","id","district-name",1,"form-control"],["scope","row"],[1,"btn","btn-success","btn-sm",3,"click"]],template:function(o,n){o&1&&(e(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"button",4),p("click",function(){return n.addDistrict()}),c(5,"i",5),d(6," Add District"),i(),b(7,X,3,0,"button",6),i()()(),e(8,"div",7)(9,"div",8)(10,"div",9)(11,"table",10)(12,"thead",11)(13,"tr"),c(14,"th",12),e(15,"th"),d(16,"No."),i(),e(17,"th"),d(18,"Code"),i(),e(19,"th"),d(20,"Name"),i(),e(21,"th"),d(22,"Gujarati Name"),i(),e(23,"th",12),d(24,"Action"),i()()(),e(25,"tbody"),b(26,Y,17,5,"tr",13),i()()()()()(),e(27,"div",14)(28,"div",15)(29,"div",16)(30,"div",17)(31,"h5",18),d(32),i(),e(33,"button",19),p("click",function(){return n.districtModal.hide()}),c(34,"i",20),i()(),e(35,"div",21)(36,"form",22),b(37,Z,1,0,"input",23)(38,et,6,1,"div",24)(39,it,6,0,"div",24)(40,rt,6,0,"div",24),i()(),e(41,"div",25)(42,"button",26),p("click",function(){return n.saveDistrict()}),d(43,"Save"),i(),e(44,"button",27),p("click",function(){return n.districtModal.hide(!1)}),d(45,"Close"),i()()()()(),e(46,"div",28)(47,"div",29)(48,"div",16)(49,"div",17)(50,"h5",30),d(51),i(),e(52,"button",19),p("click",function(){return n.districtDeletedModal.hide()}),c(53,"i",20),i()(),e(54,"div",21)(55,"table",31)(56,"thead")(57,"tr")(58,"th",32),d(59,"No."),i(),e(60,"th",32),d(61,"ID"),i(),e(62,"th",32),d(63,"Name"),i(),e(64,"th",32),d(65,"Gujarati Name"),i(),e(66,"th",33),d(67,"Actions"),i()()(),e(68,"tbody"),b(69,nt,12,4,"tr",34),i()()()()()()),o&2&&(l(7),a("ngIf",n.deletedDistrictCount>0),l(7),a("width",50),l(9),a("width",100),l(3),a("ngForOf",n.districts),l(6),u(n.districtModalTitle),l(4),a("formGroup",n.currentForm),l(),a("ngIf",n.currentForm.get("is_deleted")!==null),l(),a("ngIf",n.currentForm.get("id")!==null),l(),a("ngIf",n.currentForm.get("name")!==null),l(),a("ngIf",n.currentForm.get("gu_name")!==null),l(11),u(n.districtDeletedModalTitle),l(18),a("ngForOf",n.deletedDistrictList))},dependencies:[I,L,T,H,O,V,A,j,G,R]})}}return r})();var ot=[{path:"",component:Q,data:{title:"District",breadcrumb:"District"}}],W=(()=>{class r{static{this.\u0275fac=function(o){return new(o||r)}}static{this.\u0275mod=S({type:r})}static{this.\u0275inj=E({imports:[C.forChild(ot),C]})}}return r})();var wt=(()=>{class r{static{this.\u0275fac=function(o){return new(o||r)}}static{this.\u0275mod=S({type:r})}static{this.\u0275inj=E({imports:[N,W,P,$,q]})}}return r})();export{wt as DistrictModule};
