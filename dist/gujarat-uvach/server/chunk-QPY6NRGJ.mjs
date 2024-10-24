import './polyfills.server.mjs';
import{b as j}from"./chunk-4V5MA2UD.mjs";import{a as D}from"./chunk-PWQXQSDJ.mjs";import{f as V,q as A}from"./chunk-ARTYCH24.mjs";import{c as E,d as p,f as M,g as R,h as N,k,o as G,r as I,w as U,x as _,y as T}from"./chunk-OYOEMNDY.mjs";import"./chunk-OKDHBQJS.mjs";import"./chunk-BHXUZULZ.mjs";import{f as w,g as x,h as b}from"./chunk-524BPX2N.mjs";import{$ as h,Aa as l,Ba as c,R as f,Ra as d,Xa as i,Ya as n,Za as u,_ as F,ac as y,bb as S,jb as o,jc as C,tb as v}from"./chunk-WB2NDY7X.mjs";import"./chunk-FME56UVT.mjs";var L=e=>({"is-invalid":e}),q=(()=>{class e{constructor(s,r,t,a){this.fb=s,this.userService=r,this.router=t,this.toast=a,this.registrationForm=this.fb.group({username:["",[p.required]],email:["",[p.required,p.email]],password:["",[p.required,p.minLength(6)]],roles:["user"],emailVerified:[!1]})}ngOnInit(){}register(){let s=this.registrationForm.get("password")?.value;if(this.registrationForm.valid){let{username:r,password:t,email:a,emailVerified:m}=this.registrationForm.value,B=["user"];this.userService.registerUser(r,t,a,B,m).subscribe(g=>{g.error?this.toast.show(g.error,{class:"bg-danger"}):this.router.navigate(["/auth"])},g=>{console.error("Error registering user:",g)})}else this.markFormGroupTouched(this.registrationForm);this.registrationForm.get("password")?.setValue(s)}markFormGroupTouched(s){Object.keys(s.controls).forEach(r=>{let t=s.controls[r];t.markAsTouched(),t instanceof N&&this.markFormGroupTouched(t)})}static{this.\u0275fac=function(r){return new(r||e)(c(U),c(j),c(w),c(D))}}static{this.\u0275cmp=F({type:e,selectors:[["app-register"]],decls:35,vars:9,consts:[[1,"container","d-flex","align-items-center","justify-content-center","min-vh-100"],[1,"card","shadow","p-4",2,"width","400px","border-radius","15px"],[1,"text-center","mb-4"],["src","assets/images/svg/logo.svg","alt","logo",2,"width","60px"],[1,"mt-3"],[3,"ngSubmit","formGroup"],["type","hidden","formControlName","roles"],[1,"form-group","mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Enter your username",1,"form-control",3,"ngClass"],[1,"invalid-feedback"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email","placeholder","Enter your email",1,"form-control",3,"ngClass"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password","placeholder","Password",1,"form-control"],["type","submit",1,"btn","btn-dark","w-100","mb-3",3,"disabled"],[1,"text-center"],[1,"text-decoration-none",3,"routerLink"]],template:function(r,t){if(r&1&&(i(0,"div",0)(1,"div",1)(2,"div",2),u(3,"img",3),i(4,"h4",4),o(5,"Create an account"),n(),i(6,"p"),o(7,"Please fill in the details to sign up."),n()(),i(8,"form",5),S("ngSubmit",function(){return t.register()}),u(9,"input",6),i(10,"div",7)(11,"label",8),o(12,"Username"),n(),u(13,"input",9),i(14,"div",10),o(15,"Username is required."),n()(),i(16,"div",7)(17,"label",11),o(18,"E-Mail Address"),n(),u(19,"input",12),i(20,"div",10),o(21,"Please enter a valid email."),n()(),i(22,"div",7)(23,"label",13),o(24,"Password"),n(),u(25,"input",14),i(26,"div",10),o(27,"Password must be at least 6 characters long."),n()(),i(28,"button",15),o(29,"Sign Up"),n()(),i(30,"div",16)(31,"p"),o(32,"Already have an account? "),i(33,"a",17),o(34,"Sign In"),n()()()()()),r&2){let a,m;l(8),d("formGroup",t.registrationForm),l(5),d("ngClass",v(5,L,((a=t.registrationForm.get("username"))==null?null:a.invalid)&&((a=t.registrationForm.get("username"))==null?null:a.touched))),l(6),d("ngClass",v(7,L,((m=t.registrationForm.get("email"))==null?null:m.invalid)&&((m=t.registrationForm.get("email"))==null?null:m.touched))),l(9),d("disabled",t.registrationForm.invalid),l(5),d("routerLink","/auth/login")}},dependencies:[y,x,k,E,M,R,G,I,V]})}}return e})();var z=[{path:"",component:q,data:{title:"Gujarat Uvach | Register",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, portal",robots:"index, follow",image:"https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg"}}],O=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275mod=h({type:e})}static{this.\u0275inj=f({imports:[b.forChild(z),b]})}}return e})();var me=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275mod=h({type:e})}static{this.\u0275inj=f({imports:[C,O,_,T,A]})}}return e})();export{me as RegisterModule};
