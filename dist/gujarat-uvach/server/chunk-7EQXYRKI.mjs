import './polyfills.server.mjs';
import{a as te}from"./chunk-3TNL3QLQ.mjs";import{a as M}from"./chunk-VPLEGLDE.mjs";import"./chunk-MDNOCE5N.mjs";import{a as ee}from"./chunk-PD5LRMK3.mjs";import{c as z,d as H,e as K,f as Q,g as X,r as Z}from"./chunk-T6NNQOXW.mjs";import{c as U,d as E,f as O,g as $,k as A,o as q,r as G,s as R,t as B,u as L,w as J,x as W,y as Y}from"./chunk-PNSRZDSD.mjs";import"./chunk-BEZHLS4H.mjs";import"./chunk-ZOQGZUTB.mjs";import{$a as w,Aa as o,Ba as i,Ca as v,E as h,Eb as T,Ga as F,Gb as V,Ha as S,K as C,L as _,Oa as s,Pa as b,Qa as P,ab as I,c as x,ha as n,ia as c,jc as j,kc as y,sa as u,ua as d,yb as D,z as k,zb as N}from"./chunk-B7ADDBMS.mjs";import{h as f}from"./chunk-VVCT4QZE.mjs";function se(t,m){t&1&&(o(0,"div",15)(1,"div",16)(2,"label",17),s(3,"First Name"),i(),v(4,"input",18),i()())}function ne(t,m){t&1&&(o(0,"div",15)(1,"div",16)(2,"label",17),s(3,"Last Name"),i(),v(4,"input",19),i()())}function ae(t,m){t&1&&(o(0,"div",15)(1,"div",16)(2,"label",17),s(3,"Phone number"),i(),o(4,"div",20)(5,"div",21),s(6,"+91"),i(),v(7,"input",22),i()()())}function de(t,m){if(t&1&&(o(0,"option",27),s(1),i()),t&2){let e=m.$implicit;d("value",e.id),n(),b(e.name)}}function me(t,m){if(t&1&&(o(0,"div",16)(1,"label",23),s(2,"District"),i(),o(3,"select",24)(4,"option",25),s(5,"Select a district"),i(),u(6,de,2,2,"option",26),i()()),t&2){let e=S();n(3),d("options",e.districts),n(3),d("ngForOf",e.districts)}}function ce(t,m){if(t&1&&(o(0,"option",27),s(1),i()),t&2){let e=m.$implicit;d("value",e.id),n(),b(e.name)}}function ue(t,m){if(t&1&&(o(0,"div",16)(1,"label",28),s(2,"Taluka"),i(),o(3,"select",29)(4,"option",25),s(5,"Select a Taluka"),i(),u(6,ce,2,2,"option",26),i()()),t&2){let e=S();n(6),d("ngForOf",e.talukas)}}function pe(t,m){if(t&1&&(o(0,"option",27),s(1),i()),t&2){let e=m.$implicit;d("value",e.id),n(),b(e.name)}}function fe(t,m){if(t&1&&(o(0,"div",16)(1,"label",30),s(2,"Village"),i(),o(3,"select",31)(4,"option",25),s(5,"Select a Village"),i(),u(6,pe,2,2,"option",26),i()()),t&2){let e=S();n(6),d("ngForOf",e.villages)}}var re=(()=>{class t{constructor(e,r,l,a,p,g,le){this.fb=e,this.userService=r,this.districtService=l,this.talukaService=a,this.villageService=p,this.DS=g,this.toastService=le,this.districts=[],this.talukas=[],this.villages=[],this.destroy$=new x,this.userForm=this.fb.group({firstname:["",E.required],lastname:["",E.required],mobile:["",E.required],district_id:[null],taluka_id:[null],village_id:[null]})}ngOnInit(){this.userSubscription=this.userService.getUser().subscribe(e=>{if(e){this.user=e;let r={firstname:e.firstname||"",lastname:e.lastname||"",mobile:e.mobile||"",district_id:e.district_id||"",taluka_id:e.taluka_id||"",village_id:e.village_id||""},l=Object.keys(this.userForm.value).reduce((p,g)=>(p[g]=this.userForm.value[g]?.toString()||"",p),{});console.log(l),JSON.stringify(l)===JSON.stringify(r)||this.userForm.patchValue(r,{emitEvent:!1})}this.loadDistricts()}),this.userForm.get("district_id")?.valueChanges.pipe(k(this.destroy$)).subscribe(e=>f(this,null,function*(){this.userForm.get("taluka_id")?.markAsUntouched(),this.userForm.get("village_id")?.markAsUntouched(),this.selectedDistrict=this.districts.find(r=>r.id===e),this.talukas=[],this.villages=[],this.userForm.get("taluka_id")?.setValue(null),yield this.loadTalukas()})),this.userForm.get("taluka_id")?.valueChanges.pipe(k(this.destroy$)).subscribe(e=>f(this,null,function*(){this.userForm.get("village_id")?.markAsUntouched(),this.selectedTaluka=this.talukas.find(r=>r.id===e),this.villages=[],this.userForm.get("village_id")?.setValue(null),yield this.loadVillages()}))}loadDistricts(){return f(this,null,function*(){this.districts=yield this.districtService.getDistrict().toPromise(),this.districts.length&&(this.selectedDistrict=this.districts.find(e=>e.id===this.user?.district_id),this.userForm.get("district_id")?.setValue(this.selectedDistrict?.id||null))})}loadTalukas(){return f(this,null,function*(){let e=this.userForm.get("district_id")?.value;if(e&&(this.talukas=yield this.talukaService.getTalukaByDistrict(e).toPromise(),this.talukas.length)){let r=this.talukas.find(l=>l.id==this.user.taluka_id);this.userForm.get("taluka_id")?.setValue(r?r.id:null)}})}loadVillages(){return f(this,null,function*(){let e=this.userForm.get("taluka_id")?.value;if(e&&(this.villages=yield this.villageService.getVillageByTaluka(e).toPromise(),this.villages.length)){let r=this.villages.find(l=>l.id==this.user?.village_id);this.userForm.get("village_id")?.setValue(r?.id||null)}})}saveUser(){if(this.userForm.valid){if(this.user){let e=this.userForm.value;if(console.log(e),!Object.keys(e).some(a=>this.user[a]!==e[a])){this.toastService.show("User data has not changed. Skipping update.",{class:"bg-danger"});return}let l=this.user.id;if(!l){this.toastService.show("Invalid userid.",{class:"bg-danger"});return}this.userService.updateUser(l,e).subscribe(a=>{this.userService.setUser(a.user),this.toastService.show(a.message,{class:"bg-success"})},a=>{console.error("Error updating user:",a);let p=a&&typeof a.message=="string"?a.message:"Unexpected server response. Please check the network log.";this.toastService.show(p,{class:"bg-danger"})})}}else this.DS.markFormGroupTouched(this.userForm)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.userSubscription.unsubscribe()}static{this.\u0275fac=function(r){return new(r||t)(c(J),c(M),c(K),c(Q),c(X),c(te),c(ee))}}static{this.\u0275cmp=C({type:t,selectors:[["app-edit-profile"]],decls:27,vars:10,consts:[[1,"h-100","w-100","position-md-absolute","overflow-auto","d-flex","flex-column"],[1,"card-header","d-flex","align-items-center"],[1,"m-0"],["routerLink","/user-profile/view",1,"btn","btn-danger","btn-sm","ms-auto"],[1,"fa","fa-close","me-2"],[1,"card-body","flex-grow-1","position-relative","p-0"],[1,"h-100","w-100","p-3","position-md-absolute","start-0","top-0","overflow-auto"],[1,"row","g-3",3,"ngSubmit","formGroup"],["class","col-lg-3 col-md-4 col-sm-6",4,"ngIf"],[1,"col-6","col-lg-3"],["class","form-group mt-1",4,"ngIf"],[1,"row","gx-3","mt-3"],[1,"col-12"],[1,"btn","btn-success",3,"click"],[1,"fa","fa-save","me-2"],[1,"col-lg-3","col-md-4","col-sm-6"],[1,"form-group","mt-1"],[1,"form-label"],["type","text","placeholder","","aria-label","First name","formControlName","firstname",1,"form-control"],["type","text","placeholder","","aria-label","Last name","formControlName","lastname",1,"form-control"],[1,"input-group"],[1,"input-group-text"],["type","text","placeholder","","aria-label","Phone number","formControlName","mobile",1,"form-control"],["for","district_id",1,"form-label"],["id","district_id","formControlName","district_id","selectDropdown","",1,"form-select",3,"options"],["value","null","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["for","taluka_id",1,"form-label"],["id","taluka_id","formControlName","taluka_id",1,"form-select"],["for","village_id",1,"form-label"],["id","village_id","formControlName","village_id",1,"form-select"]],template:function(r,l){r&1&&(o(0,"div",0)(1,"div",1)(2,"h5",2),s(3,"Edit Profile"),i(),o(4,"button",3),v(5,"i",4),s(6,"Cancel"),i()(),o(7,"div",5)(8,"div",6)(9,"form",7),F("ngSubmit",function(){return!1}),u(10,se,5,0,"div",8)(11,ne,5,0,"div",8)(12,ae,8,0,"div",8),o(13,"div",9),u(14,me,7,2,"div",10),i(),o(15,"div",9),u(16,ue,7,1,"div",10),i(),o(17,"div",9),u(18,fe,7,1,"div",10),i()(),o(19,"div",11)(20,"div",12)(21,"button",13),F("click",function(){return l.saveUser()}),v(22,"i",14),s(23,"Save"),i()()(),o(24,"pre"),s(25),w(26,"json"),i()()()()),r&2&&(n(9),d("formGroup",l.userForm),n(),d("ngIf",l.userForm.get("firstname")!==null),n(),d("ngIf",l.userForm.get("lastname")!==null),n(),d("ngIf",l.userForm.get("mobile")!==null),n(2),d("ngIf",l.userForm.get("district_id")),n(2),d("ngIf",l.userForm.get("taluka_id")),n(2),d("ngIf",l.userForm.get("village_id")),n(7),P("                ",I(26,8,l.userForm.value),`
            `))},dependencies:[D,N,j,A,B,L,U,R,O,$,q,G,z,H,T]})}}return t})();var ve=[{path:"",component:re,data:{title:"Edit Profile - Your Website",description:"Edit your profile details including name, mobile, and location.",keywords:"edit profile, user settings, update user details",robots:"index, follow",image:"/assets/edit-profile-image.png",canonical:"https://gujarat-uvach.netlify.app/edit-profile",breadcrumb:"Edit Profile"}}],oe=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=_({type:t})}static{this.\u0275inj=h({imports:[y.forChild(ve),y]})}}return t})();var Ge=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=_({type:t})}static{this.\u0275inj=h({imports:[V,oe,Y,W,Z]})}}return t})();export{Ge as EditProfileModule};
