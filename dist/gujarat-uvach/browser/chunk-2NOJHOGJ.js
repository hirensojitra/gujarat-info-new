import{a}from"./chunk-YBESYLK4.js";import{a as e,v as o,y as r}from"./chunk-I3U5Q2FA.js";var m=(()=>{class i{constructor(t){this.platformService=t,this.toasts=[]}show(t,s={}){s.show=!0,this.toasts.push(e({message:t},s)),this.platformService.isBrowser()&&this.scheduleAutoDismiss()}remove(t){this.toasts=this.toasts.filter(s=>s!==t)}scheduleAutoDismiss(){setTimeout(()=>{this.toasts.forEach((t,s)=>{setTimeout(()=>this.remove(t),500*(s+1))})},5e3)}static{this.\u0275fac=function(s){return new(s||i)(r(a))}}static{this.\u0275prov=o({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{m as a};