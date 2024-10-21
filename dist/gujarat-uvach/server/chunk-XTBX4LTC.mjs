import './polyfills.server.mjs';
import{a as Y}from"./chunk-KMC6O6YC.mjs";import"./chunk-IKPEBCM7.mjs";import{e as A,i as B,m as D,n as G,o as W,r as $,s as L}from"./chunk-PXE2FO54.mjs";import{b as V}from"./chunk-662JNBOM.mjs";import"./chunk-BHXUZULZ.mjs";import{Aa as w,B as h,C as _,Ca as b,Ea as F,Ga as I,Ia as N,Mb as U,T as s,U as S,_ as v,aa as d,ab as k,bb as R,ca as x,cb as T,eb as j,ga as n,gb as O,ha as o,la as C,ma as p,na as u,q as g,ua as a,va as m,w as E,wa as y,x as f,ya as P,za as M}from"./chunk-GKTD5S5R.mjs";import"./chunk-VVCT4QZE.mjs";var J=()=>[],K=(t,l)=>({"text-success":t,"text-danger":l});function Q(t,l){if(t&1&&(n(0,"option",16),a(1),o()),t&2){let e=l.$implicit;d("value",e),s(),m(e)}}function X(t,l){if(t&1){let e=C();n(0,"tr")(1,"td"),a(2),o(),n(3,"td"),a(4),o(),n(5,"td"),a(6),o(),n(7,"td"),a(8),o(),n(9,"td")(10,"span",13),a(11),o()(),n(12,"td"),a(13),I(14,"date"),o(),n(15,"td")(16,"select",14),w("ngModelChange",function(r){let c=h(e).$implicit;return M(c.selectedRole,r)||(c.selectedRole=r),_(r)}),p("change",function(){let r=h(e).$implicit,c=u();return _(c.updateUserRole(r.id,r.selectedRole))}),v(17,Q,2,2,"option",15),o()()()}if(t&2){let e=l.$implicit,i=l.index,r=u();s(2),m((r.currentPage-1)*r.limit+(i+1)),s(2),m(e.email),s(2),m(e.username),s(2),m(e.roles||"No roles assigned"),s(2),d("ngClass",F(12,K,e.emailverified,!e.emailverified)),s(),y(" ",e.emailverified?"Yes":"No"," "),s(2),m(N(14,9,e.created_at,"short")),s(3),P("ngModel",e.selectedRole),s(),d("ngForOf",r.availableRoles)}}function Z(t,l){t&1&&(n(0,"tr")(1,"td",17),a(2,"No users found."),o()())}function ee(t,l){if(t&1){let e=C();n(0,"li",8)(1,"a",18),p("click",function(){let r=h(e).index,c=u();return _(c.changePage(r+1))}),a(2),o()()}if(t&2){let e=l.index,i=u();x("active",i.currentPage===e+1),s(2),m(e+1)}}var z=(()=>{class t{constructor(e,i){this.userService=e,this.toastService=i,this.users=[],this.pagination={},this.currentPage=1,this.limit=10,this.availableRoles=["master","admin","moderator","curator","poster creator","premium user","free user","guest"]}ngOnInit(){this.loadUsers()}loadUsers(e=this.currentPage){this.userService.getAllUsers({page:e,limit:this.limit}).subscribe(i=>{this.users=i.users,this.pagination=i.pagination,this.currentPage=i.pagination.currentPage},i=>{this.toastService.show(i.error.error,{class:"bg-danger",title:"Error fetching users:"})})}changePage(e){this.loadUsers(e)}updateUserRole(e,i){confirm(`Are you sure you want to assign the role "${i}" to this user?`)&&this.toastService.show("User role updated successfully!",{class:"bg-success",title:"Success:"})}static{this.\u0275fac=function(i){return new(i||t)(S(V),S(Y))}}static{this.\u0275cmp=E({type:t,selectors:[["app-users"]],decls:34,vars:8,consts:[[1,"container","mt-4"],[1,"mb-4"],[1,"table","table-striped","table-hover"],["scope","col"],[4,"ngFor","ngForOf"],[4,"ngIf"],["aria-label","Page navigation"],[1,"pagination","justify-content-center"],[1,"page-item"],["aria-label","Previous",1,"page-link",3,"click"],["aria-hidden","true"],["class","page-item",3,"active",4,"ngFor","ngForOf"],["aria-label","Next",1,"page-link",3,"click"],[3,"ngClass"],[3,"ngModelChange","change","ngModel"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["colspan","7",1,"text-center"],[1,"page-link",3,"click"]],template:function(i,r){i&1&&(n(0,"div",0)(1,"h2",1),a(2,"User Management"),o(),n(3,"table",2)(4,"thead")(5,"tr")(6,"th",3),a(7,"#"),o(),n(8,"th",3),a(9,"Email"),o(),n(10,"th",3),a(11,"Username"),o(),n(12,"th",3),a(13,"Roles"),o(),n(14,"th",3),a(15,"Email Verified"),o(),n(16,"th",3),a(17,"Created At"),o(),n(18,"th",3),a(19,"Actions"),o()()(),n(20,"tbody"),v(21,X,18,15,"tr",4)(22,Z,3,0,"tr",5),o()(),n(23,"nav",6)(24,"ul",7)(25,"li",8)(26,"a",9),p("click",function(){return r.changePage(r.currentPage-1)}),n(27,"span",10),a(28,"\xAB"),o()()(),v(29,ee,3,3,"li",11),n(30,"li",8)(31,"a",12),p("click",function(){return r.changePage(r.currentPage+1)}),n(32,"span",10),a(33,"\xBB"),o()()()()()()),i&2&&(s(21),d("ngForOf",r.users),s(),d("ngIf",r.users.length===0),s(3),x("disabled",r.currentPage===1),s(4),d("ngForOf",b(7,J).constructor(r.pagination.totalPages)),s(),x("disabled",r.currentPage===r.pagination.totalPages))},dependencies:[k,R,T,G,W,D,A,B,j]})}}return t})();var te=[{path:"",component:z,data:{title:"Gujarat Uvach | Authentication",description:"Login or register to Gujarat Uvach portal for accessing services",keywords:"Gujarat Uvach, login, register, authentication, portal",robots:"index, follow"}}],H=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=f({type:t})}static{this.\u0275inj=g({imports:[U.forChild(te),U]})}}return t})();var fe=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275mod=f({type:t})}static{this.\u0275inj=g({imports:[O,H,$,L]})}}return t})();export{fe as UsersModule};