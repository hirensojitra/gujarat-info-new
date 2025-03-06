import './polyfills.server.mjs';
import{a as N}from"./chunk-POGDKEDL.mjs";import"./chunk-IGSLI5BI.mjs";import{a as D}from"./chunk-SZ3HQCAL.mjs";import{h as L,r as T}from"./chunk-ZZZTVJUR.mjs";import{c as R,d as a,f as x,g as M,h as E,k as j,o as k,r as _,w as G,x as A,y as I}from"./chunk-U7I6TPIW.mjs";import"./chunk-6EWG2IL2.mjs";import"./chunk-ZOQGZUTB.mjs";import{Aa as r,Ba as o,Ca as u,E as g,Ga as S,Gb as w,K as b,L as f,Oa as n,Ya as h,ha as l,ia as p,ic as y,jc as C,kc as v,ua as d,xb as F}from"./chunk-LNWWKHVG.mjs";import"./chunk-VVCT4QZE.mjs";var P=e=>({"is-invalid":e}),U=(()=>{class e{constructor(i,t,s,m){this.fb=i,this.userService=t,this.router=s,this.toast=m,this.isSubmitting=!1,this.registrationForm=this.fb.group({username:["",[a.required,a.minLength(5),a.maxLength(20),a.pattern("^[a-zA-Z][a-zA-Z0-9_]*$")]],email:["",[a.required,a.email]],password:["",[a.required,a.minLength(6)]],roles:["user"],emailVerified:[!1]})}register(){if(this.registrationForm.invalid||this.isSubmitting){this.markFormGroupTouched(this.registrationForm);return}this.isSubmitting=!0;let i=this.registrationForm.value;this.userService.registerUser({username:i.username,password:i.password,email:i.email,roles:[i.roles],emailVerified:i.emailVerified}).subscribe({next:()=>{this.router.navigate(["/auth"]),this.toast.show("Registration successful!",{class:"bg-success"})},error:t=>{this.toast.show(t.message||"Registration failed",{class:"bg-danger"}),this.isSubmitting=!1},complete:()=>this.isSubmitting=!1})}markFormGroupTouched(i){Object.values(i.controls).forEach(t=>{t.markAsTouched(),t instanceof E&&this.markFormGroupTouched(t)})}static{this.\u0275fac=function(t){return new(t||e)(p(G),p(N),p(y),p(D))}}static{this.\u0275cmp=b({type:e,selectors:[["app-register"]],decls:29,vars:9,consts:[[1,"container","d-flex","align-items-center","justify-content-center","min-vh-100"],[1,"card","shadow","p-4",2,"width","400px","border-radius","15px"],[1,"text-center","mb-4"],["src","assets/images/svg/logo.svg","alt","logo",2,"width","60px"],[1,"mt-3"],[3,"ngSubmit","formGroup"],["type","hidden","formControlName","roles"],[1,"form-group","mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Enter your username",1,"form-control",3,"ngClass"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email","placeholder","Enter your email",1,"form-control",3,"ngClass"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password","placeholder","Password",1,"form-control"],["type","submit",1,"btn","btn-dark","w-100","mb-3",3,"disabled"],[1,"text-center"],[1,"text-decoration-none",3,"routerLink"]],template:function(t,s){if(t&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),u(3,"img",3),r(4,"h4",4),n(5,"Create an account"),o(),r(6,"p"),n(7,"Please fill in the details to sign up."),o()(),r(8,"form",5),S("ngSubmit",function(){return s.register()}),u(9,"input",6),r(10,"div",7)(11,"label",8),n(12,"Username"),o(),u(13,"input",9),o(),r(14,"div",7)(15,"label",10),n(16,"E-Mail Address"),o(),u(17,"input",11),o(),r(18,"div",7)(19,"label",12),n(20,"Password"),o(),u(21,"input",13),o(),r(22,"button",14),n(23,"Sign Up"),o()(),r(24,"div",15)(25,"p"),n(26,"Already have an account? "),r(27,"a",16),n(28,"Sign In"),o()()()()()),t&2){let m,c;l(8),d("formGroup",s.registrationForm),l(5),d("ngClass",h(5,P,((m=s.registrationForm.get("username"))==null?null:m.invalid)&&((m=s.registrationForm.get("username"))==null?null:m.touched))),l(4),d("ngClass",h(7,P,((c=s.registrationForm.get("email"))==null?null:c.invalid)&&((c=s.registrationForm.get("email"))==null?null:c.touched))),l(5),d("disabled",s.registrationForm.invalid),l(5),d("routerLink","/auth/login")}},dependencies:[F,C,j,R,x,M,k,_,L]})}}return e})();var z=[{path:"",component:U,data:{title:"PostNew | Register",description:"Login or register to PostNew portal for accessing services",keywords:"PostNew, login, register, portal",robots:"index, follow",image:"https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg"}}],q=(()=>{class e{static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=f({type:e})}static{this.\u0275inj=g({imports:[v.forChild(z),v]})}}return e})();var ne=(()=>{class e{static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=f({type:e})}static{this.\u0275inj=g({imports:[w,q,A,I,T]})}}return e})();export{ne as RegisterModule};
