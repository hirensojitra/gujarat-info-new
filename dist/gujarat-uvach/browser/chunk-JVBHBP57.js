import{a as x}from"./chunk-QBWMG5PC.js";import{a as W}from"./chunk-YRYSSATH.js";import{d as D,r as P}from"./chunk-UTXLYHQK.js";import{c as N,d as p,f as L,g as j,k as G,o as I,r as T,w as U,x as q,y as A}from"./chunk-637AZWOF.js";import{a as R}from"./chunk-NLE7UQJM.js";import"./chunk-64FAQS26.js";import"./chunk-TF3KVUAE.js";import{a as E}from"./chunk-77ITHIYP.js";import{E as h,Ha as s,Ib as F,J as C,Jb as _,K as b,Kb as y,Ra as S,aa as g,ba as m,eb as k,k as u,na as c,nb as w,sb as M,ta as o,u as f,ua as r,va as l,za as v}from"./chunk-6SCNQMZS.js";import"./chunk-CWTPBX7D.js";var V=i=>({"is-invalid":i}),z=(()=>{class i{constructor(e,n,t,a,d,H){this.fb=e,this.http=n,this.router=t,this.userService=a,this.authService=d,this.toast=H,this.isLoading=!1,this.errorMessage="",this.api=E.MasterApi}ngOnInit(){this.registrationForm=this.fb.group({username:["",p.required],email:["",[p.required,p.email]],password:["",p.required],roles:["user"]})}handleGoogleCredential(e){let n=e.credential;console.log("Google idToken:",n),this.http.post(this.api+"/auth/google",{idToken:n},{responseType:"json"}).pipe(f(t=>(this.isLoading=!1,this.toast.show(t.error?.message||"Google authentication failed.",{class:"bg-danger"}),u(null)))).subscribe({next:t=>{this.isLoading=!1,t&&t.token?(console.log(t),this.userService.setUser(t),this.authService.setToken(t.token),this.router.navigate(["/dashboard"])):this.toast.show("Unable to process Google registration.",{class:"bg-danger"})},error:t=>{this.isLoading=!1,this.toast.show(t.message||"Google authentication failed.",{class:"bg-danger"})},complete:()=>{this.isLoading=!1}})}register(){this.registrationForm.invalid||(this.isLoading=!0,this.errorMessage="",this.http.post("/api/auth/register",this.registrationForm.value).pipe(f(e=>(this.errorMessage=e.error?.message||"Registration failed.",this.isLoading=!1,console.log(this.errorMessage),u(null)))).subscribe(e=>{this.isLoading=!1,e&&e.success?this.router.navigate(["/auth/login"]):e&&e.error&&(this.errorMessage=e.error)}))}registerWithGoogle(){this.isLoading=!0,this.errorMessage="",google.accounts.id.initialize({client_id:"650577899089-eq5q93v869b5qvi6vllcq81o8v06ubsm.apps.googleusercontent.com",callback:e=>this.handleGoogleCredential(e)}),google.accounts.id.prompt()}registerWithFacebook(){this.isLoading=!0,this.errorMessage="",this.http.get(this.api+"/auth/facebook",{responseType:"json"}).pipe(f(e=>(this.errorMessage=e.error?.message||"Facebook registration failed.",this.isLoading=!1,u(null)))).subscribe(e=>{this.isLoading=!1,e&&e.redirectUrl?window.location.href=e.redirectUrl:this.errorMessage="Unable to process Facebook registration."})}static{this.\u0275fac=function(n){return new(n||i)(m(U),m(M),m(F),m(x),m(R),m(W))}}static{this.\u0275cmp=C({type:i,selectors:[["app-register"]],decls:39,vars:9,consts:[[1,"container","d-flex","align-items-center","justify-content-center","min-vh-100"],[1,"card","shadow","p-4",2,"width","400px","border-radius","15px"],[1,"text-center","mb-4"],["src","assets/images/svg/logo.svg","alt","logo",2,"width","60px"],[1,"mt-3"],[3,"ngSubmit","formGroup"],["type","hidden","formControlName","roles"],[1,"form-group","mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Enter your username",1,"form-control",3,"ngClass"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email","placeholder","Enter your email",1,"form-control",3,"ngClass"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password","placeholder","Password",1,"form-control"],["type","submit",1,"btn","btn-dark","w-100","mb-3",3,"disabled"],[1,"text-center","mb-3"],["type","button",1,"btn","btn-outline-danger","me-2",3,"click"],[1,"fab","fa-google"],["type","button",1,"btn","btn-outline-primary",3,"click"],[1,"fab","fa-facebook-f"],[1,"text-center"],[1,"text-decoration-none",3,"routerLink"],["id","googleSignInDiv"]],template:function(n,t){if(n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),l(3,"img",3),o(4,"h4",4),s(5,"Create an account"),r(),o(6,"p"),s(7,"Please fill in the details to sign up."),r()(),o(8,"form",5),v("ngSubmit",function(){return t.register()}),l(9,"input",6),o(10,"div",7)(11,"label",8),s(12,"Username"),r(),l(13,"input",9),r(),o(14,"div",7)(15,"label",10),s(16,"E-Mail Address"),r(),l(17,"input",11),r(),o(18,"div",7)(19,"label",12),s(20,"Password"),r(),l(21,"input",13),r(),o(22,"button",14),s(23,"Sign Up"),r()(),o(24,"div",15)(25,"p"),s(26,"Or register with"),r(),o(27,"button",16),v("click",function(){return t.registerWithGoogle()}),l(28,"i",17),s(29," Google "),r(),o(30,"button",18),v("click",function(){return t.registerWithFacebook()}),l(31,"i",19),s(32," Facebook "),r()(),o(33,"div",20)(34,"p"),s(35,"Already have an account? "),o(36,"a",21),s(37,"Sign In"),r()()(),l(38,"div",22),r()()),n&2){let a,d;g(8),c("formGroup",t.registrationForm),g(5),c("ngClass",S(5,V,((a=t.registrationForm.get("username"))==null?null:a.invalid)&&((a=t.registrationForm.get("username"))==null?null:a.touched))),g(4),c("ngClass",S(7,V,((d=t.registrationForm.get("email"))==null?null:d.invalid)&&((d=t.registrationForm.get("email"))==null?null:d.touched))),g(5),c("disabled",t.registrationForm.invalid),g(14),c("routerLink","/auth/login")}},dependencies:[k,_,G,N,L,j,I,T,D]})}}return i})();var J=[{path:"",component:z,data:{title:"PostNew | Register",description:"Login or register to PostNew portal for accessing services",keywords:"PostNew, login, register, portal",robots:"index, follow",image:"https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg"}}],B=(()=>{class i{static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=h({imports:[y.forChild(J),y]})}}return i})();var he=(()=>{class i{static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=h({imports:[w,B,q,A,P]})}}return i})();export{he as RegisterModule};
