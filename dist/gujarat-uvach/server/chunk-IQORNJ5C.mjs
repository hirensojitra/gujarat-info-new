import './polyfills.server.mjs';
import{g as c,h,p as n,q as u}from"./chunk-TUT776QX.mjs";import{p as l,s as f}from"./chunk-ZK6TCPG7.mjs";var g=(()=>{class i{constructor(r){this.fb=r,this.ReportDate=new Date}getDate(){let r=this.ReportDate.getFullYear(),t=String(this.ReportDate.getMonth()+1).padStart(2,"0"),e=String(this.ReportDate.getDate()).padStart(2,"0");return this.formattedDate=`${r}-${t}-${e}`,this.formattedDate}markFormGroupTouched(r){Object.keys(r.controls).forEach(t=>{let e=r?.get(t);e instanceof h?e.touched||(e.markAsTouched(),e.updateValueAndValidity()):e instanceof c?this.markFormGroupTouched(e):e instanceof n&&this.markFormArrayTouched(e)})}markFormArrayTouched(r){r.controls.forEach(t=>{t instanceof c?this.markFormGroupTouched(t):t instanceof n&&this.markFormArrayTouched(t)})}setControl(r,t,e,o){if(r.get(t))return;let a=this.fb.control(e,o);a.markAsUntouched,r.addControl(t,a)}removeControls(r,t){t.forEach(e=>{r.get(e)&&r.removeControl(e)})}filterAndSetValue(r){let t=r?.value;if(t!=null){let e=t.toString().replace(/^0+(?=\d)/,""),o=parseInt(e,10)||0;o.toString()!==e&&r?.setValue(o)}}calculateWH(r){let t=320,e=320,o=320,a=320,d=r.shape,s={circle:{ratio:1,divisor:1},rect:{ratio:1,divisor:1},ellipse:{ratio:1,divisor:1},rect_3_2:{ratio:3,divisor:2},rect_4_3:{ratio:4,divisor:3},rect_16_9:{ratio:16,divisor:9},rect_1_1:{ratio:1,divisor:1},rect_5_4:{ratio:5,divisor:4},rect_3_1:{ratio:3,divisor:1},rect_7_5:{ratio:7,divisor:5},rect_2_3:{ratio:2,divisor:3},rect_3_4:{ratio:3,divisor:4},rect_9_16:{ratio:9,divisor:16},rect_4_5:{ratio:4,divisor:5},rect_5_7:{ratio:5,divisor:7}}[d];if(s){let m=r.r;t=o,e=t*s.ratio/s.divisor,o=m*2,a=o*s.ratio/s.divisor}else console.error("Aspect ratio not defined for shape:",d);return{w:o,h:a,cW:t,cH:e}}static{this.\u0275fac=function(t){return new(t||i)(f(u))}}static{this.\u0275prov=l({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{g as a};
