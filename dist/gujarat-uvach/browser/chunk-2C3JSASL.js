import{Bb as p,Cb as a,D as o,Fb as u,G as r,Hb as w,Jb as v,X as s,d as c,da as f,n as d,ob as n,s as l,w as m}from"./chunk-VTNAYE3H.js";var x=(()=>{class i{constructor(e,t,h){this.titleService=e,this.rendererFactory=t,this.platformId=h,this.showLoaderSubject=new c(!1),this.showLoaderTrans=new c(!1),this.showLoader$=this.showLoaderSubject.asObservable(),this.showLoaderTrans$=this.showLoaderTrans.asObservable(),this.renderer=this.rendererFactory.createRenderer(null,null),this.isBrowser=n(this.platformId)}show(e){if(this.showLoaderSubject.next(!0),this.showLoaderTrans.next(!!e),this.isBrowser){let t=document.body;this.renderer.setStyle(t,"overflow","hidden"),this.renderer.setStyle(t,"position","fixed"),this.renderer.setStyle(t,"width","100%"),this.renderer.setStyle(t,"height","100%")}}hide(){setTimeout(()=>{if(this.showLoaderSubject.next(!1),this.showLoaderTrans.next(!1),this.isBrowser){let e=document.body;this.renderer.removeStyle(e,"overflow"),this.renderer.removeStyle(e,"position"),this.renderer.removeStyle(e,"width"),this.renderer.removeStyle(e,"height")}},500)}getTitle(){return this.titleService.getTitle()}intercept(e,t){return this.show(0),t.handle(e).pipe(m(()=>{this.hide()}))}static{this.\u0275fac=function(t){return new(t||i)(r(a),r(f),r(s))}}static{this.\u0275prov=o({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var D=(()=>{class i{constructor(e,t,h,y,S){this.titleService=e,this.metaService=t,this.router=h,this.activatedRoute=y,this.platformId=S}initSEO(){this.router.events.pipe(l(e=>e instanceof u),d(()=>{let e=this.activatedRoute;for(;e.firstChild;)e=e.firstChild;return e.snapshot.data})).subscribe(e=>{n(this.platformId)?(this.updateTitle(e.title),this.updateMetaTags(e)):(this.updateTitle(e.title),this.updateMetaTags(e))})}updateTitle(e){e&&this.titleService.setTitle(e)}updateMetaTags(e){e.description&&this.metaService.updateTag({name:"description",content:e.description}),e.keywords&&this.metaService.updateTag({name:"keywords",content:e.keywords}),e.robots&&this.metaService.updateTag({name:"robots",content:e.robots}),e.image&&(this.metaService.updateTag({property:"og:image",content:e.image}),this.metaService.updateTag({property:"twitter:image",content:e.image}))}static{this.\u0275fac=function(t){return new(t||i)(r(a),r(p),r(v),r(w),r(s))}}static{this.\u0275prov=o({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();export{x as a,D as b};
