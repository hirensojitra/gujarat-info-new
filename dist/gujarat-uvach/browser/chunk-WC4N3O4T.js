import{a as Q}from"./chunk-IW2DFHXP.js";import{a as N}from"./chunk-23VRB4EQ.js";import{a as K}from"./chunk-KYNNVPTE.js";import{g as B,h as J,i as W,j as Y,k as z,r as H}from"./chunk-SPEEPGXE.js";import{c as T,d as p,f as V,g as M,k as j,o as U,r as O,s as q,t as $,u as A,w as G,x as R,y as L}from"./chunk-ZEHMLBHC.js";import"./chunk-UN2CGVO7.js";import"./chunk-IHGCADJY.js";import"./chunk-77ITHIYP.js";import{Aa as b,E as _,Ha as s,Ia as E,J as C,K as S,Kb as D,Lb as F,aa as n,ba as c,c as x,fb as P,gb as w,la as u,na as d,nb as I,ta as o,ua as i,va as g,z as k,za as y}from"./chunk-VTNAYE3H.js";import{f as v}from"./chunk-CWTPBX7D.js";function ie(t,m){t&1&&(o(0,"div",15)(1,"div",16)(2,"label",17),s(3,"First Name"),i(),g(4,"input",18),i()())}function re(t,m){t&1&&(o(0,"div",15)(1,"div",16)(2,"label",17),s(3,"Last Name"),i(),g(4,"input",19),i()())}function oe(t,m){t&1&&(o(0,"div",15)(1,"div",16)(2,"label",17),s(3,"Phone number"),i(),o(4,"div",20)(5,"div",21),s(6,"+91"),i(),g(7,"input",22),i()()())}function le(t,m){if(t&1&&(o(0,"option",27),s(1),i()),t&2){let e=m.$implicit;d("value",e.id),n(),E(e.name)}}function se(t,m){if(t&1&&(o(0,"div",16)(1,"label",23),s(2,"District"),i(),o(3,"select",24)(4,"option",25),s(5,"Select a district"),i(),u(6,le,2,2,"option",26),i()()),t&2){let e=b();n(3),d("options",e.districts),n(3),d("ngForOf",e.districts)}}function ae(t,m){if(t&1&&(o(0,"option",27),s(1),i()),t&2){let e=m.$implicit;d("value",e.id),n(),E(e.name)}}function ne(t,m){if(t&1&&(o(0,"div",16)(1,"label",28),s(2,"Taluka"),i(),o(3,"select",29)(4,"option",25),s(5,"Select a Taluka"),i(),u(6,ae,2,2,"option",26),i()()),t&2){let e=b();n(6),d("ngForOf",e.talukas)}}function de(t,m){if(t&1&&(o(0,"option",27),s(1),i()),t&2){let e=m.$implicit;d("value",e.id),n(),E(e.name)}}function me(t,m){if(t&1&&(o(0,"div",16)(1,"label",30),s(2,"Village"),i(),o(3,"select",31)(4,"option",25),s(5,"Select a Village"),i(),u(6,de,2,2,"option",26),i()()),t&2){let e=b();n(6),d("ngForOf",e.villages)}}var Z=(()=>{class t{constructor(e,r,l,a,f,h,te){this.fb=e,this.userService=r,this.districtService=l,this.talukaService=a,this.villageService=f,this.DS=h,this.toastService=te,this.districts=[],this.talukas=[],this.villages=[],this.destroy$=new x,this.userForm=this.fb.group({firstname:["",p.required],lastname:["",p.required],mobile:["",p.required],district_id:[null,p.required],taluka_id:[null,p.required],village_id:[null,p.required]})}ngOnInit(){this.userSubscription=this.userService.getUser().subscribe(e=>{if(e){this.user=e;let r={firstname:e.firstname||"",lastname:e.lastname||"",mobile:e.mobile||"",district_id:e.district_id||"",taluka_id:e.taluka_id||"",village_id:e.village_id||""},l=Object.keys(this.userForm.value).reduce((f,h)=>(f[h]=this.userForm.value[h]?.toString()||"",f),{});JSON.stringify(l)===JSON.stringify(r)||(this.userForm.patchValue(r,{emitEvent:!1}),this.loadDistricts())}}),this.userForm.get("district_id")?.valueChanges.pipe(k(this.destroy$)).subscribe(e=>v(this,null,function*(){this.userForm.get("taluka_id")?.markAsUntouched(),this.userForm.get("village_id")?.markAsUntouched(),this.selectedDistrict=this.districts.find(r=>r.id===e),this.talukas=[],this.villages=[],this.userForm.get("taluka_id")?.setValue(null),yield this.loadTalukas()})),this.userForm.get("taluka_id")?.valueChanges.pipe(k(this.destroy$)).subscribe(e=>v(this,null,function*(){this.userForm.get("village_id")?.markAsUntouched(),this.selectedTaluka=this.talukas.find(r=>r.id===e),this.villages=[],this.userForm.get("village_id")?.setValue(null),yield this.loadVillages()}))}loadDistricts(){return v(this,null,function*(){this.districts=yield this.districtService.getDistrict().toPromise(),this.districts.length&&(this.selectedDistrict=this.districts.find(e=>e.id===this.user?.district_id),this.userForm.get("district_id")?.setValue(this.selectedDistrict?.id||null))})}loadTalukas(){return v(this,null,function*(){let e=this.userForm.get("district_id")?.value;if(e&&(this.talukas=yield this.talukaService.getTalukaByDistrict(e).toPromise(),this.talukas.length)){let r=this.talukas.find(l=>l.id==this.user.taluka_id);this.userForm.get("taluka_id")?.setValue(r.id||null)}})}loadVillages(){return v(this,null,function*(){let e=this.userForm.get("taluka_id")?.value;if(e&&(this.villages=yield this.villageService.getVillageByTaluka(e).toPromise(),this.villages.length)){let r=this.villages.find(l=>l.id==this.user?.village_id);this.userForm.get("village_id")?.setValue(r?.id||null)}})}saveUser(){if(this.userForm.valid){if(this.user){let e=this.userForm.value;if(!Object.keys(e).some(a=>this.user[a]!==e[a])){this.toastService.show("User data has not changed. Skipping update.",{class:"bg-danger"});return}let l=this.user.id;if(!l){this.toastService.show("Invalid userid.",{class:"bg-danger"});return}this.userService.updateUser(l,e).subscribe(a=>{this.userService.setUser(a.user),this.toastService.show(a.message,{class:"bg-success"})},a=>{console.error("Error updating user:",a);let f=a&&typeof a.message=="string"?a.message:"Unexpected server response. Please check the network log.";this.toastService.show(f,{class:"bg-danger"})})}}else this.DS.markFormGroupTouched(this.userForm)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete(),this.userSubscription.unsubscribe()}static{this.\u0275fac=function(r){return new(r||t)(c(G),c(N),c(W),c(Y),c(z),c(Q),c(K))}}static{this.\u0275cmp=C({type:t,selectors:[["app-edit-profile"]],decls:24,vars:7,consts:[[1,"h-100","w-100","position-md-absolute","overflow-auto","d-flex","flex-column"],[1,"card-header","d-flex","align-items-center"],[1,"m-0"],["routerLink","/user-profile/view",1,"btn","btn-danger","btn-sm","ms-auto"],[1,"fa","fa-close","me-2"],[1,"card-body","flex-grow-1","position-relative","p-0"],[1,"h-100","w-100","p-3","position-md-absolute","start-0","top-0","overflow-auto"],[1,"row","g-3",3,"ngSubmit","formGroup"],["class","col-lg-3 col-md-4 col-sm-6",4,"ngIf"],[1,"col-6","col-lg-3"],["class","form-group mt-1",4,"ngIf"],[1,"row","gx-3","mt-3"],[1,"col-12"],[1,"btn","btn-success",3,"click"],[1,"fa","fa-save","me-2"],[1,"col-lg-3","col-md-4","col-sm-6"],[1,"form-group","mt-1"],[1,"form-label"],["type","text","placeholder","","aria-label","First name","formControlName","firstname",1,"form-control"],["type","text","placeholder","","aria-label","Last name","formControlName","lastname",1,"form-control"],[1,"input-group"],[1,"input-group-text"],["type","text","placeholder","","aria-label","Phone number","formControlName","mobile",1,"form-control"],["for","district_id",1,"form-label"],["id","district_id","formControlName","district_id","selectDropdown","",1,"form-select",3,"options"],["value","null","disabled","","selected",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["for","taluka_id",1,"form-label"],["id","taluka_id","formControlName","taluka_id",1,"form-select"],["for","village_id",1,"form-label"],["id","village_id","formControlName","village_id",1,"form-select"]],template:function(r,l){r&1&&(o(0,"div",0)(1,"div",1)(2,"h5",2),s(3,"Edit Profile"),i(),o(4,"button",3),g(5,"i",4),s(6,"Cancel"),i()(),o(7,"div",5)(8,"div",6)(9,"form",7),y("ngSubmit",function(){return!1}),u(10,ie,5,0,"div",8)(11,re,5,0,"div",8)(12,oe,8,0,"div",8),o(13,"div",9),u(14,se,7,2,"div",10),i(),o(15,"div",9),u(16,ne,7,1,"div",10),i(),o(17,"div",9),u(18,me,7,1,"div",10),i()(),o(19,"div",11)(20,"div",12)(21,"button",13),y("click",function(){return l.saveUser()}),g(22,"i",14),s(23,"Save"),i()()()()()()),r&2&&(n(9),d("formGroup",l.userForm),n(),d("ngIf",l.userForm.get("firstname")!==null),n(),d("ngIf",l.userForm.get("lastname")!==null),n(),d("ngIf",l.userForm.get("mobile")!==null),n(2),d("ngIf",l.userForm.get("district_id")),n(2),d("ngIf",l.userForm.get("taluka_id")),n(2),d("ngIf",l.userForm.get("village_id")))},dependencies:[P,w,D,j,$,A,T,q,V,M,U,O,B,J]})}}return t})();var ce=[{path:"",component:Z,data:{title:"Edit Profile - Your Website",description:"Edit your profile details including name, mobile, and location.",keywords:"edit profile, user settings, update user details",robots:"index, follow",image:"/assets/edit-profile-image.png",canonical:"https://gujarat-uvach.netlify.app/edit-profile",breadcrumb:"Edit Profile"}}],ee=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=S({type:t})}static{this.\u0275inj=_({imports:[F.forChild(ce),F]})}}return t})();var Oe=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275mod=S({type:t})}static{this.\u0275inj=_({imports:[I,ee,L,R,H]})}}return t})();export{Oe as EditProfileModule};
