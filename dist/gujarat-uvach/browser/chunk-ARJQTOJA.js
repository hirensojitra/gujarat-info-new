import{d as D,r as P}from"./chunk-UTXLYHQK.js";import{c as R,d as p,f as N,g as x,k as L,o as j,r as G,w as I,x as T,y as q}from"./chunk-637AZWOF.js";import"./chunk-TF3KVUAE.js";import{a as E}from"./chunk-77ITHIYP.js";import{E as f,Ha as s,Ib as w,J as M,Jb as _,K as h,Kb as C,Ra as y,aa as m,ba as b,eb as k,k as c,na as d,nb as F,sb as S,ta as o,u,ua as r,va as a,za as v}from"./chunk-6SCNQMZS.js";import"./chunk-CWTPBX7D.js";var U=i=>({"is-invalid":i}),W=(()=>{class i{constructor(e,n,t){this.fb=e,this.http=n,this.router=t,this.isLoading=!1,this.errorMessage="",this.api=E.MasterApi}ngOnInit(){this.registrationForm=this.fb.group({username:["",p.required],email:["",[p.required,p.email]],password:["",p.required],roles:["user"]})}handleGoogleCredential(e){let n=e.credential;console.log("Google idToken:",n),this.http.post(this.api+"/auth/google",{idToken:n},{responseType:"json"}).pipe(u(t=>(this.errorMessage=t.error?.message||"Google authentication failed.",this.isLoading=!1,c(null)))).subscribe(t=>{this.isLoading=!1,t&&t.token?(localStorage.setItem("token",t.token),this.router.navigate(["/dashboard"])):this.errorMessage="Unable to process Google registration."})}register(){this.registrationForm.invalid||(this.isLoading=!0,this.errorMessage="",this.http.post("/api/auth/register",this.registrationForm.value).pipe(u(e=>(this.errorMessage=e.error?.message||"Registration failed.",this.isLoading=!1,console.log(this.errorMessage),c(null)))).subscribe(e=>{this.isLoading=!1,e&&e.success?this.router.navigate(["/auth/login"]):e&&e.error&&(this.errorMessage=e.error)}))}registerWithGoogle(){this.isLoading=!0,this.errorMessage="",google.accounts.id.initialize({client_id:"650577899089-eq5q93v869b5qvi6vllcq81o8v06ubsm.apps.googleusercontent.com",callback:e=>this.handleGoogleCredential(e)}),google.accounts.id.prompt()}registerWithFacebook(){this.isLoading=!0,this.errorMessage="",this.http.get(this.api+"/auth/facebook",{responseType:"json"}).pipe(u(e=>(this.errorMessage=e.error?.message||"Facebook registration failed.",this.isLoading=!1,c(null)))).subscribe(e=>{this.isLoading=!1,e&&e.redirectUrl?window.location.href=e.redirectUrl:this.errorMessage="Unable to process Facebook registration."})}static{this.\u0275fac=function(n){return new(n||i)(b(I),b(S),b(w))}}static{this.\u0275cmp=M({type:i,selectors:[["app-register"]],decls:39,vars:9,consts:[[1,"container","d-flex","align-items-center","justify-content-center","min-vh-100"],[1,"card","shadow","p-4",2,"width","400px","border-radius","15px"],[1,"text-center","mb-4"],["src","assets/images/svg/logo.svg","alt","logo",2,"width","60px"],[1,"mt-3"],[3,"ngSubmit","formGroup"],["type","hidden","formControlName","roles"],[1,"form-group","mb-3"],["for","username",1,"form-label"],["type","text","id","username","formControlName","username","placeholder","Enter your username",1,"form-control",3,"ngClass"],["for","email",1,"form-label"],["type","email","id","email","formControlName","email","placeholder","Enter your email",1,"form-control",3,"ngClass"],["for","password",1,"form-label"],["type","password","id","password","formControlName","password","placeholder","Password",1,"form-control"],["type","submit",1,"btn","btn-dark","w-100","mb-3",3,"disabled"],[1,"text-center","mb-3"],["type","button",1,"btn","btn-outline-danger","me-2",3,"click"],[1,"fab","fa-google"],["type","button",1,"btn","btn-outline-primary",3,"click"],[1,"fab","fa-facebook-f"],[1,"text-center"],[1,"text-decoration-none",3,"routerLink"],["id","googleSignInDiv"]],template:function(n,t){if(n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),a(3,"img",3),o(4,"h4",4),s(5,"Create an account"),r(),o(6,"p"),s(7,"Please fill in the details to sign up."),r()(),o(8,"form",5),v("ngSubmit",function(){return t.register()}),a(9,"input",6),o(10,"div",7)(11,"label",8),s(12,"Username"),r(),a(13,"input",9),r(),o(14,"div",7)(15,"label",10),s(16,"E-Mail Address"),r(),a(17,"input",11),r(),o(18,"div",7)(19,"label",12),s(20,"Password"),r(),a(21,"input",13),r(),o(22,"button",14),s(23,"Sign Up"),r()(),o(24,"div",15)(25,"p"),s(26,"Or register with"),r(),o(27,"button",16),v("click",function(){return t.registerWithGoogle()}),a(28,"i",17),s(29," Google "),r(),o(30,"button",18),v("click",function(){return t.registerWithFacebook()}),a(31,"i",19),s(32," Facebook "),r()(),o(33,"div",20)(34,"p"),s(35,"Already have an account? "),o(36,"a",21),s(37,"Sign In"),r()()(),a(38,"div",22),r()()),n&2){let l,g;m(8),d("formGroup",t.registrationForm),m(5),d("ngClass",y(5,U,((l=t.registrationForm.get("username"))==null?null:l.invalid)&&((l=t.registrationForm.get("username"))==null?null:l.touched))),m(4),d("ngClass",y(7,U,((g=t.registrationForm.get("email"))==null?null:g.invalid)&&((g=t.registrationForm.get("email"))==null?null:g.touched))),m(5),d("disabled",t.registrationForm.invalid),m(14),d("routerLink","/auth/login")}},dependencies:[k,_,L,R,N,x,j,G,D]})}}return i})();var O=[{path:"",component:W,data:{title:"PostNew | Register",description:"Login or register to PostNew portal for accessing services",keywords:"PostNew, login, register, portal",robots:"index, follow",image:"https://test-ssr-hiren.netlify.app/assets/images/jpg/register.jpg"}}],V=(()=>{class i{static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275mod=h({type:i})}static{this.\u0275inj=f({imports:[C.forChild(O),C]})}}return i})();var me=(()=>{class i{static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275mod=h({type:i})}static{this.\u0275inj=f({imports:[F,V,T,q,P]})}}return i})();export{me as RegisterModule};
