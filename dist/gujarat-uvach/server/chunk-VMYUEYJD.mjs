import './polyfills.server.mjs';
import{$ as n,D as h,G as i,Ib as d,ac as l,d as s,ka as a,w as o}from"./chunk-LNWWKHVG.mjs";var S=(()=>{class r{constructor(e,t,c){this.titleService=e,this.rendererFactory=t,this.platformId=c,this.showLoaderSubject=new s(!1),this.showLoaderTrans=new s(!1),this.showLoader$=this.showLoaderSubject.asObservable(),this.showLoaderTrans$=this.showLoaderTrans.asObservable(),this.renderer=this.rendererFactory.createRenderer(null,null),this.isBrowser=d(this.platformId)}show(e){if(this.showLoaderSubject.next(!0),this.showLoaderTrans.next(!!e),this.isBrowser){let t=document.body;this.renderer.setStyle(t,"overflow","hidden"),this.renderer.setStyle(t,"position","fixed"),this.renderer.setStyle(t,"width","100%"),this.renderer.setStyle(t,"height","100%")}}hide(){setTimeout(()=>{if(this.showLoaderSubject.next(!1),this.showLoaderTrans.next(!1),this.isBrowser){let e=document.body;this.renderer.removeStyle(e,"overflow"),this.renderer.removeStyle(e,"position"),this.renderer.removeStyle(e,"width"),this.renderer.removeStyle(e,"height")}},500)}getTitle(){return this.titleService.getTitle()}intercept(e,t){return this.show(0),t.handle(e).pipe(o(()=>{this.hide()}))}static{this.\u0275fac=function(t){return new(t||r)(i(l),i(a),i(n))}}static{this.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{S as a};
