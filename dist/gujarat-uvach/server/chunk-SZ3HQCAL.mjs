import './polyfills.server.mjs';
import{a}from"./chunk-6EWG2IL2.mjs";import{D as o,G as r}from"./chunk-LNWWKHVG.mjs";import{a as e}from"./chunk-VVCT4QZE.mjs";var m=(()=>{class i{constructor(t){this.platformService=t,this.toasts=[]}show(t,s={}){s.show=!0,this.toasts.push(e({message:t},s)),this.platformService.isBrowser()&&this.scheduleAutoDismiss()}remove(t){this.toasts=this.toasts.filter(s=>s!==t)}scheduleAutoDismiss(){setTimeout(()=>{this.toasts.forEach((t,s)=>{setTimeout(()=>this.remove(t),500*(s+1))})},5e3)}static{this.\u0275fac=function(s){return new(s||i)(r(a))}}static{this.\u0275prov=o({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{m as a};
