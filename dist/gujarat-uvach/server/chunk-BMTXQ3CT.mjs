import './polyfills.server.mjs';
import{a as k}from"./chunk-XUT36YXJ.mjs";import"./chunk-XEPJSYDU.mjs";import{b as y}from"./chunk-NQ4NUOBL.mjs";import{a as R}from"./chunk-CGSNVN6E.mjs";import{A as G,C as I,N as D,g as L,h as p,i as M,j,m as C,q as E,t as F,y as N,z as U}from"./chunk-VRILDO4X.mjs";import"./chunk-P3FJMRUS.mjs";import"./chunk-Z6IJNFE7.mjs";import{B as c,Da as v,Db as S,H as b,I as u,La as o,ea as l,fa as s,fc as w,gc as x,hc as f,ra as d,xa as t,ya as r,za as n}from"./chunk-TUDO6VUL.mjs";import{h}from"./chunk-VVCT4QZE.mjs";var P=(()=>{class i{constructor(a,e,m,g,V){this.fb=a,this.userService=e,this.authService=m,this.router=g,this.toast=V,this.loginForm=this.fb.group({username:["",[p.required]],password:["",[p.required,p.minLength(6)]]})}ngOnInit(){return h(this,null,function*(){})}onSubmit(){if(this.loginForm.valid){let a=this.loginForm.value;this.authService.loginUser(a.username,a.password).subscribe(e=>{e.token?(this.userService.setUser(e),this.authService.setToken(e.token),this.userService.getUser().subscribe(m=>{console.log(m)}),this.router.navigate(["/dashboard"])):e.error&&this.toast.show(e.error,{class:"bg-danger"})},e=>{console.error("Login error:",e),this.toast.show("An error occurred during login",{class:"bg-danger"})})}}static{this.\u0275fac=function(e){return new(e||i)(s(N),s(y),s(k),s(w),s(R))}}static{this.\u0275cmp=b({type:i,selectors:[["app-login"]],decls:40,vars:4,consts:[[1,"container","d-flex","align-items-center","justify-content-center","min-vh-100"],[1,"card","shadow","p-4",2,"width","400px","border-radius","15px"],[1,"text-center","mb-4"],["src","assets/images/svg/logo.svg","alt","logo",2,"width","60px"],[1,"mt-3"],[1,"d-flex","justify-content-between","mb-3"],[1,"btn","btn-outline-light","border","w-100","me-2"],[1,"fa","fa-apple","text-dark"],[1,"fa","fa-google","text-danger"],[1,"btn","btn-outline-light","border","w-100"],[1,"fa","fa-twitter","text-primary"],[1,"or-container"],[3,"ngSubmit","formGroup"],[1,"form-group","mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Enter your username",1,"form-control"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password","placeholder","Password",1,"form-control"],[1,"invalid-feedback"],[1,"form-group","form-check","mb-3"],["type","checkbox","id","rememberMe",1,"form-check-input"],["for","rememberMe",1,"form-check-label"],[1,"float-end","text-decoration-none",3,"routerLink"],["type","submit",1,"btn","btn-dark","w-100","mb-3",3,"disabled"],[1,"text-center"],[1,"text-decoration-none",3,"routerLink"]],template:function(e,m){e&1&&(t(0,"div",0)(1,"div",1)(2,"div",2),n(3,"img",3),t(4,"h4",4),o(5,"Welcome to Gujarat Uvach"),r(),t(6,"p"),o(7,"Please enter your details to sign in."),r()(),t(8,"div",5)(9,"button",6),n(10,"i",7),r(),t(11,"button",6),n(12,"i",8),r(),t(13,"button",9),n(14,"i",10),r()(),n(15,"span",11),t(16,"form",12),v("ngSubmit",function(){return m.onSubmit()}),t(17,"div",13)(18,"label",14),o(19,"Username"),r(),n(20,"input",15),r(),t(21,"div",13)(22,"label",16),o(23,"Password"),r(),n(24,"input",17),t(25,"div",18),o(26,"Password must be at least 6 characters."),r()(),t(27,"div",19),n(28,"input",20),t(29,"label",21),o(30,"Remember me"),r(),t(31,"a",22),o(32,"Forgot password?"),r()(),t(33,"button",23),o(34,"Sign in"),r()(),t(35,"div",24)(36,"p"),o(37,"Don't have an account yet? "),t(38,"a",25),o(39,"Sign Up"),r()()()()()),e&2&&(l(16),d("formGroup",m.loginForm),l(15),d("routerLink","/auth/forgot-password"),l(2),d("disabled",m.loginForm.invalid),l(5),d("routerLink","/auth/register"))},dependencies:[x,C,L,M,j,E,F,I]})}}return i})();var _=[{path:"",component:P,data:{title:"Gujarat Uvach | Authentication",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"}}],T=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=u({type:i})}static{this.\u0275inj=c({imports:[f.forChild(_),f]})}}return i})();var ne=(()=>{class i{static{this.\u0275fac=function(e){return new(e||i)}}static{this.\u0275mod=u({type:i})}static{this.\u0275inj=c({imports:[S,T,U,G,D]})}}return i})();export{ne as LoginModule};
