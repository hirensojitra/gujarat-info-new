import './polyfills.server.mjs';
import{h as c,i as f,v as n,w as u}from"./chunk-OZOCKEKY.mjs";import{C as h,z as l}from"./chunk-DQOPYUJW.mjs";var F=(()=>{class i{constructor(o){this.fb=o,this.ReportDate=new Date}getDate(){let o=this.ReportDate.getFullYear(),t=String(this.ReportDate.getMonth()+1).padStart(2,"0"),r=String(this.ReportDate.getDate()).padStart(2,"0");return this.formattedDate=`${o}-${t}-${r}`,this.formattedDate}markFormGroupTouched(o){Object.keys(o.controls).forEach(t=>{let r=o?.get(t);r instanceof f?r.touched||(r.markAsTouched(),r.updateValueAndValidity()):r instanceof c?this.markFormGroupTouched(r):r instanceof n&&this.markFormArrayTouched(r)})}markFormArrayTouched(o){o.controls.forEach(t=>{t instanceof c?this.markFormGroupTouched(t):t instanceof n&&this.markFormArrayTouched(t)})}setControl(o,t,r,e){if(o.get(t))return;let a=this.fb.control(r,e);a.markAsUntouched,o.addControl(t,a)}removeControls(o,t){t.forEach(r=>{o.get(r)&&o.removeControl(r)})}filterAndSetValue(o){let t=o?.value;if(t!=null){let r=t.toString().replace(/^0+(?=\d)/,""),e=parseInt(r,10)||0;e.toString()!==r&&o?.setValue(e)}}calculateWH(o){let t=320,r=320,e=320,a=320,d=o.shape,s={circle:{ratio:1,divisor:1},rect:{ratio:1,divisor:1},ellipse:{ratio:1,divisor:1},rect_3_2:{ratio:3,divisor:2},rect_4_3:{ratio:4,divisor:3},rect_16_9:{ratio:16,divisor:9},rect_1_1:{ratio:1,divisor:1},rect_5_4:{ratio:5,divisor:4},rect_3_1:{ratio:3,divisor:1},rect_7_5:{ratio:7,divisor:5},rect_2_3:{ratio:2,divisor:3},rect_3_4:{ratio:3,divisor:4},rect_9_16:{ratio:9,divisor:16},rect_4_5:{ratio:4,divisor:5},rect_5_7:{ratio:5,divisor:7}}[d];if(s){let m=o.r;t=e,r=t*s.ratio/s.divisor,e=m*2,a=e*s.ratio/s.divisor}else console.error("Aspect ratio not defined for shape:",d);return{w:e,h:a,cW:t,cH:r}}makeCall(o){let t=`tel:+91${o}`;window.location.href=t}sendMail(o,t="",r=""){let e=`mailto:${o}?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(r)}`;window.location.href=e}static{this.\u0275fac=function(t){return new(t||i)(h(u))}}static{this.\u0275prov=l({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{F as a};
