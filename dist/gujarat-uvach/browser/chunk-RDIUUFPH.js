import{b as E}from"./chunk-QBRTSGNY.js";import{Aa as b,Ba as y,Ia as a,Ib as _,Ja as g,Kb as x,L as u,R as m,S as d,ba as l,ca as n,f,hb as V,ma as v,oa as h,ua as o,va as s,za as p}from"./chunk-6PSXH6NM.js";function S(r,I){if(r&1){let e=p();o(0,"button",2),b("click",function(){m(e);let t=y();return d(t.redirectToLogin())}),a(1,"Go to Login"),s()}}var j=(()=>{class r{constructor(e,i,t){this.route=e,this.router=i,this.userservice=t,this.verificationStatus="Verifying...",this.isVerified=!1}ngOnInit(){return f(this,null,function*(){yield this.userservice.getUser().subscribe(e=>{this.user=e}),yield this.route.queryParams.subscribe(e=>{let i=e.token,t=e.email;i&&t?this.user&&!this.user.emailverified?this.userservice.verifyEmail(i,t).subscribe(c=>{c.success?(this.verificationStatus="Your email has been successfully verified!",this.user&&(this.user.emailverified=!0),this.isVerified=!0,this.userservice.setUser(this.user)):(this.verificationStatus="Email verification failed. The token may be expired or invalid.",this.isVerified=!1)},c=>{console.error(c),this.verificationStatus="An error occurred while verifying your email. Please try again later.",this.isVerified=!1}):(this.verificationStatus="Your email has been successfully verified already!",this.isVerified=!0):this.verificationStatus="Invalid verification link."})})}redirectToLogin(){this.isVerified&&this.router.navigate(["/login"])}static{this.\u0275fac=function(i){return new(i||r)(n(_),n(x),n(E))}}static{this.\u0275cmp=u({type:r,selectors:[["app-email-verification"]],decls:6,vars:2,consts:[[1,"h-100-vh","d-flex","flex-column","align-items-center","justify-content-center"],["class","btn btn-primary",3,"click",4,"ngIf"],[1,"btn","btn-primary",3,"click"]],template:function(i,t){i&1&&(o(0,"div",0)(1,"h2"),a(2,"Email Verification"),s(),o(3,"p"),a(4),s(),v(5,S,2,0,"button",1),s()),i&2&&(l(4),g(t.verificationStatus),l(),h("ngIf",t.isVerified))},dependencies:[V]})}}return r})();export{j as a};
