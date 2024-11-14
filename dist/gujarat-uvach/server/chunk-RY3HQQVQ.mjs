import './polyfills.server.mjs';
import{d as j,f as b,i as et}from"./chunk-3IM6DXQH.mjs";import{Cc as W,Ja as C,Na as J,R as G,T as U,ba as Q,ca as V,da as X,ja as $,mb as K,nb as tt,sa as Y,ta as M,xa as Z}from"./chunk-34FBJKO2.mjs";import{e as x,g as ut}from"./chunk-VVCT4QZE.mjs";var q=x((it,R)=>{(function(c,l){typeof define=="function"&&define.amd?define(l):typeof R=="object"&&R.exports?R.exports=l():c.EvEmitter=l()})(typeof window<"u"?window:it,function(){"use strict";function c(){}var l=c.prototype;return l.on=function(h,d){if(!(!h||!d)){var a=this._events=this._events||{},u=a[h]=a[h]||[];return u.indexOf(d)==-1&&u.push(d),this}},l.once=function(h,d){if(!(!h||!d)){this.on(h,d);var a=this._onceEvents=this._onceEvents||{},u=a[h]=a[h]||{};return u[d]=!0,this}},l.off=function(h,d){var a=this._events&&this._events[h];if(!(!a||!a.length)){var u=a.indexOf(d);return u!=-1&&a.splice(u,1),this}},l.emitEvent=function(h,d){var a=this._events&&this._events[h];if(!(!a||!a.length)){a=a.slice(0),d=d||[];for(var u=this._onceEvents&&this._onceEvents[h],r=0;r<a.length;r++){var s=a[r],m=u&&u[s];m&&(this.off(h,s),delete u[s]),s.apply(this,d)}return this}},l.allOff=function(){delete this._events,delete this._onceEvents},c})});var D=x((ct,P)=>{(function(c,l){typeof define=="function"&&define.amd?define(l):typeof P=="object"&&P.exports?P.exports=l():c.getSize=l()})(window,function(){"use strict";function l(o){var E=parseFloat(o),g=o.indexOf("%")==-1&&!isNaN(E);return g&&E}function h(){}var d=typeof console>"u"?h:function(o){console.error(o)},a=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=a.length;function r(){for(var o={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},E=0;E<u;E++){var g=a[E];o[g]=0}return o}function s(o){var E=getComputedStyle(o);return E||d("Style returned "+E+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),E}var m=!1,y;function f(){if(!m){m=!0;var o=document.createElement("div");o.style.width="200px",o.style.padding="1px 2px 3px 4px",o.style.borderStyle="solid",o.style.borderWidth="1px 2px 3px 4px",o.style.boxSizing="border-box";var E=document.body||document.documentElement;E.appendChild(o);var g=s(o);y=Math.round(l(g.width))==200,_.isBoxSizeOuter=y,E.removeChild(o)}}function _(o){if(f(),typeof o=="string"&&(o=document.querySelector(o)),!(!o||typeof o!="object"||!o.nodeType)){var E=s(o);if(E.display=="none")return r();var g={};g.width=o.offsetWidth,g.height=o.offsetHeight;for(var i=g.isBorderBox=E.boxSizing=="border-box",t=0;t<u;t++){var e=a[t],n=E[e],p=parseFloat(n);g[e]=isNaN(p)?0:p}var v=g.paddingLeft+g.paddingRight,I=g.paddingTop+g.paddingBottom,z=g.marginLeft+g.marginRight,T=g.marginTop+g.marginBottom,L=g.borderLeftWidth+g.borderRightWidth,S=g.borderTopWidth+g.borderBottomWidth,O=i&&y,w=l(E.width);w!==!1&&(g.width=w+(O?0:v+L));var k=l(E.height);return k!==!1&&(g.height=k+(O?0:I+S)),g.innerWidth=g.width-(v+L),g.innerHeight=g.height-(I+S),g.outerWidth=g.width+z,g.outerHeight=g.height+T,g}}return _})});var nt=x((pt,B)=>{(function(c,l){"use strict";typeof define=="function"&&define.amd?define(l):typeof B=="object"&&B.exports?B.exports=l():c.matchesSelector=l()})(window,function(){"use strict";var l=function(){var h=window.Element.prototype;if(h.matches)return"matches";if(h.matchesSelector)return"matchesSelector";for(var d=["webkit","moz","ms","o"],a=0;a<d.length;a++){var u=d[a],r=u+"MatchesSelector";if(h[r])return r}}();return function(d,a){return d[l](a)}})});var ot=x((mt,A)=>{(function(c,l){typeof define=="function"&&define.amd?define(["desandro-matches-selector/matches-selector"],function(h){return l(c,h)}):typeof A=="object"&&A.exports?A.exports=l(c,nt()):c.fizzyUIUtils=l(c,c.matchesSelector)})(window,function(l,h){"use strict";var d={};d.extend=function(r,s){for(var m in s)r[m]=s[m];return r},d.modulo=function(r,s){return(r%s+s)%s};var a=Array.prototype.slice;d.makeArray=function(r){if(Array.isArray(r))return r;if(r==null)return[];var s=typeof r=="object"&&typeof r.length=="number";return s?a.call(r):[r]},d.removeFrom=function(r,s){var m=r.indexOf(s);m!=-1&&r.splice(m,1)},d.getParent=function(r,s){for(;r.parentNode&&r!=document.body;)if(r=r.parentNode,h(r,s))return r},d.getQueryElement=function(r){return typeof r=="string"?document.querySelector(r):r},d.handleEvent=function(r){var s="on"+r.type;this[s]&&this[s](r)},d.filterFindElements=function(r,s){r=d.makeArray(r);var m=[];return r.forEach(function(y){if(y instanceof HTMLElement){if(!s){m.push(y);return}h(y,s)&&m.push(y);for(var f=y.querySelectorAll(s),_=0;_<f.length;_++)m.push(f[_])}}),m},d.debounceMethod=function(r,s,m){m=m||100;var y=r.prototype[s],f=s+"Timeout";r.prototype[s]=function(){var _=this[f];clearTimeout(_);var o=arguments,E=this;this[f]=setTimeout(function(){y.apply(E,o),delete E[f]},m)}},d.docReady=function(r){var s=document.readyState;s=="complete"||s=="interactive"?setTimeout(r):document.addEventListener("DOMContentLoaded",r)},d.toDashed=function(r){return r.replace(/(.)([A-Z])/g,function(s,m,y){return m+"-"+y}).toLowerCase()};var u=l.console;return d.htmlInit=function(r,s){d.docReady(function(){var m=d.toDashed(s),y="data-"+m,f=document.querySelectorAll("["+y+"]"),_=document.querySelectorAll(".js-"+m),o=d.makeArray(f).concat(d.makeArray(_)),E=y+"-options",g=l.jQuery;o.forEach(function(i){var t=i.getAttribute(y)||i.getAttribute(E),e;try{e=t&&JSON.parse(t)}catch(p){u&&u.error("Error parsing "+y+" on "+i.className+": "+p);return}var n=new r(i,e);g&&g.data(i,s,n)})})},d})});var rt=x((gt,H)=>{(function(c,l){typeof define=="function"&&define.amd?define(["ev-emitter/ev-emitter","get-size/get-size"],l):typeof H=="object"&&H.exports?H.exports=l(q(),D()):(c.Outlayer={},c.Outlayer.Item=l(c.EvEmitter,c.getSize))})(window,function(l,h){"use strict";function d(i){for(var t in i)return!1;return t=null,!0}var a=document.documentElement.style,u=typeof a.transition=="string"?"transition":"WebkitTransition",r=typeof a.transform=="string"?"transform":"WebkitTransform",s={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[u],m={transform:r,transition:u,transitionDuration:u+"Duration",transitionProperty:u+"Property",transitionDelay:u+"Delay"};function y(i,t){i&&(this.element=i,this.layout=t,this.position={x:0,y:0},this._create())}var f=y.prototype=Object.create(l.prototype);f.constructor=y,f._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},f.handleEvent=function(i){var t="on"+i.type;this[t]&&this[t](i)},f.getSize=function(){this.size=h(this.element)},f.css=function(i){var t=this.element.style;for(var e in i){var n=m[e]||e;t[n]=i[e]}},f.getPosition=function(){var i=getComputedStyle(this.element),t=this.layout._getOption("originLeft"),e=this.layout._getOption("originTop"),n=i[t?"left":"right"],p=i[e?"top":"bottom"],v=parseFloat(n),I=parseFloat(p),z=this.layout.size;n.indexOf("%")!=-1&&(v=v/100*z.width),p.indexOf("%")!=-1&&(I=I/100*z.height),v=isNaN(v)?0:v,I=isNaN(I)?0:I,v-=t?z.paddingLeft:z.paddingRight,I-=e?z.paddingTop:z.paddingBottom,this.position.x=v,this.position.y=I},f.layoutPosition=function(){var i=this.layout.size,t={},e=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),p=e?"paddingLeft":"paddingRight",v=e?"left":"right",I=e?"right":"left",z=this.position.x+i[p];t[v]=this.getXValue(z),t[I]="";var T=n?"paddingTop":"paddingBottom",L=n?"top":"bottom",S=n?"bottom":"top",O=this.position.y+i[T];t[L]=this.getYValue(O),t[S]="",this.css(t),this.emitEvent("layout",[this])},f.getXValue=function(i){var t=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!t?i/this.layout.size.width*100+"%":i+"px"},f.getYValue=function(i){var t=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&t?i/this.layout.size.height*100+"%":i+"px"},f._transitionTo=function(i,t){this.getPosition();var e=this.position.x,n=this.position.y,p=i==this.position.x&&t==this.position.y;if(this.setPosition(i,t),p&&!this.isTransitioning){this.layoutPosition();return}var v=i-e,I=t-n,z={};z.transform=this.getTranslate(v,I),this.transition({to:z,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},f.getTranslate=function(i,t){var e=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return i=e?i:-i,t=n?t:-t,"translate3d("+i+"px, "+t+"px, 0)"},f.goTo=function(i,t){this.setPosition(i,t),this.layoutPosition()},f.moveTo=f._transitionTo,f.setPosition=function(i,t){this.position.x=parseFloat(i),this.position.y=parseFloat(t)},f._nonTransition=function(i){this.css(i.to),i.isCleaning&&this._removeStyles(i.to);for(var t in i.onTransitionEnd)i.onTransitionEnd[t].call(this)},f.transition=function(i){if(!parseFloat(this.layout.options.transitionDuration)){this._nonTransition(i);return}var t=this._transn;for(var e in i.onTransitionEnd)t.onEnd[e]=i.onTransitionEnd[e];for(e in i.to)t.ingProperties[e]=!0,i.isCleaning&&(t.clean[e]=!0);if(i.from){this.css(i.from);var n=this.element.offsetHeight;n=null}this.enableTransition(i.to),this.css(i.to),this.isTransitioning=!0};function _(i){return i.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var o="opacity,"+_(r);f.enableTransition=function(){if(!this.isTransitioning){var i=this.layout.options.transitionDuration;i=typeof i=="number"?i+"ms":i,this.css({transitionProperty:o,transitionDuration:i,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(s,this,!1)}},f.onwebkitTransitionEnd=function(i){this.ontransitionend(i)},f.onotransitionend=function(i){this.ontransitionend(i)};var E={"-webkit-transform":"transform"};f.ontransitionend=function(i){if(i.target===this.element){var t=this._transn,e=E[i.propertyName]||i.propertyName;if(delete t.ingProperties[e],d(t.ingProperties)&&this.disableTransition(),e in t.clean&&(this.element.style[i.propertyName]="",delete t.clean[e]),e in t.onEnd){var n=t.onEnd[e];n.call(this),delete t.onEnd[e]}this.emitEvent("transitionEnd",[this])}},f.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(s,this,!1),this.isTransitioning=!1},f._removeStyles=function(i){var t={};for(var e in i)t[e]="";this.css(t)};var g={transitionProperty:"",transitionDuration:"",transitionDelay:""};return f.removeTransitionStyles=function(){this.css(g)},f.stagger=function(i){i=isNaN(i)?0:i,this.staggerDelay=i+"ms"},f.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},f.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration)){this.removeElem();return}this.once("transitionEnd",function(){this.removeElem()}),this.hide()},f.reveal=function(){delete this.isHidden,this.css({display:""});var i=this.layout.options,t={},e=this.getHideRevealTransitionEndProperty("visibleStyle");t[e]=this.onRevealTransitionEnd,this.transition({from:i.hiddenStyle,to:i.visibleStyle,isCleaning:!0,onTransitionEnd:t})},f.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},f.getHideRevealTransitionEndProperty=function(i){var t=this.layout.options[i];if(t.opacity)return"opacity";for(var e in t)return e},f.hide=function(){this.isHidden=!0,this.css({display:""});var i=this.layout.options,t={},e=this.getHideRevealTransitionEndProperty("hiddenStyle");t[e]=this.onHideTransitionEnd,this.transition({from:i.visibleStyle,to:i.hiddenStyle,isCleaning:!0,onTransitionEnd:t})},f.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},f.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},y})});var st=x((vt,F)=>{(function(c,l){"use strict";typeof define=="function"&&define.amd?define(["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(h,d,a,u){return l(c,h,d,a,u)}):typeof F=="object"&&F.exports?F.exports=l(c,q(),D(),ot(),rt()):c.Outlayer=l(c,c.EvEmitter,c.getSize,c.fizzyUIUtils,c.Outlayer.Item)})(window,function(l,h,d,a,u){"use strict";var r=l.console,s=l.jQuery,m=function(){},y=0,f={};function _(t,e){var n=a.getQueryElement(t);if(!n){r&&r.error("Bad element for "+this.constructor.namespace+": "+(n||t));return}this.element=n,s&&(this.$element=s(this.element)),this.options=a.extend({},this.constructor.defaults),this.option(e);var p=++y;this.element.outlayerGUID=p,f[p]=this,this._create();var v=this._getOption("initLayout");v&&this.layout()}_.namespace="outlayer",_.Item=u,_.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var o=_.prototype;a.extend(o,h.prototype),o.option=function(t){a.extend(this.options,t)},o._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&this.options[e]!==void 0?this.options[e]:this.options[t]},_.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},o._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),a.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},o.reloadItems=function(){this.items=this._itemize(this.element.children)},o._itemize=function(t){for(var e=this._filterFindItemElements(t),n=this.constructor.Item,p=[],v=0;v<e.length;v++){var I=e[v],z=new n(I,this);p.push(z)}return p},o._filterFindItemElements=function(t){return a.filterFindElements(t,this.options.itemSelector)},o.getItemElements=function(){return this.items.map(function(t){return t.element})},o.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=t!==void 0?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},o._init=o.layout,o._resetLayout=function(){this.getSize()},o.getSize=function(){this.size=d(this.element)},o._getMeasurement=function(t,e){var n=this.options[t],p;n?(typeof n=="string"?p=this.element.querySelector(n):n instanceof HTMLElement&&(p=n),this[t]=p?d(p)[e]:n):this[t]=0},o.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},o._getItemsForLayout=function(t){return t.filter(function(e){return!e.isIgnored})},o._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),!(!t||!t.length)){var n=[];t.forEach(function(p){var v=this._getItemLayoutPosition(p);v.item=p,v.isInstant=e||p.isLayoutInstant,n.push(v)},this),this._processLayoutQueue(n)}},o._getItemLayoutPosition=function(){return{x:0,y:0}},o._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(e,n){this._positionItem(e.item,e.x,e.y,e.isInstant,n)},this)},o.updateStagger=function(){var t=this.options.stagger;if(t==null){this.stagger=0;return}return this.stagger=i(t),this.stagger},o._positionItem=function(t,e,n,p,v){p?t.goTo(e,n):(t.stagger(v*this.stagger),t.moveTo(e,n))},o._postLayout=function(){this.resizeContainer()},o.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},o._getContainerSize=m,o._setContainerMeasure=function(t,e){if(t!==void 0){var n=this.size;n.isBorderBox&&(t+=e?n.paddingLeft+n.paddingRight+n.borderLeftWidth+n.borderRightWidth:n.paddingBottom+n.paddingTop+n.borderTopWidth+n.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},o._emitCompleteOnItems=function(t,e){var n=this;function p(){n.dispatchEvent(t+"Complete",null,[e])}var v=e.length;if(!e||!v){p();return}var I=0;function z(){I++,I==v&&p()}e.forEach(function(T){T.once(t,z)})},o.dispatchEvent=function(t,e,n){var p=e?[e].concat(n):n;if(this.emitEvent(t,p),s)if(this.$element=this.$element||s(this.element),e){var v=s.Event(e);v.type=t,this.$element.trigger(v,n)}else this.$element.trigger(t,n)},o.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},o.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},o.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},o.unstamp=function(t){t=this._find(t),t&&t.forEach(function(e){a.removeFrom(this.stamps,e),this.unignore(e)},this)},o._find=function(t){if(t)return typeof t=="string"&&(t=this.element.querySelectorAll(t)),t=a.makeArray(t),t},o._manageStamps=function(){!this.stamps||!this.stamps.length||(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},o._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},o._manageStamp=m,o._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,p=d(t),v={left:e.left-n.left-p.marginLeft,top:e.top-n.top-p.marginTop,right:n.right-e.right-p.marginRight,bottom:n.bottom-e.bottom-p.marginBottom};return v},o.handleEvent=a.handleEvent,o.bindResize=function(){l.addEventListener("resize",this),this.isResizeBound=!0},o.unbindResize=function(){l.removeEventListener("resize",this),this.isResizeBound=!1},o.onresize=function(){this.resize()},a.debounceMethod(_,"onresize",100),o.resize=function(){!this.isResizeBound||!this.needsResizeLayout()||this.layout()},o.needsResizeLayout=function(){var t=d(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},o.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},o.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},o.prepended=function(t){var e=this._itemize(t);if(e.length){var n=this.items.slice(0);this.items=e.concat(n),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(n)}},o.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),!(!t||!t.length)){var e=this.updateStagger();t.forEach(function(n,p){n.stagger(p*e),n.reveal()})}},o.hide=function(t){if(this._emitCompleteOnItems("hide",t),!(!t||!t.length)){var e=this.updateStagger();t.forEach(function(n,p){n.stagger(p*e),n.hide()})}},o.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},o.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},o.getItem=function(t){for(var e=0;e<this.items.length;e++){var n=this.items[e];if(n.element==t)return n}},o.getItems=function(t){t=a.makeArray(t);var e=[];return t.forEach(function(n){var p=this.getItem(n);p&&e.push(p)},this),e},o.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),!(!e||!e.length)&&e.forEach(function(n){n.remove(),a.removeFrom(this.items,n)},this)},o.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(n){n.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,s&&s.removeData(this.element,this.constructor.namespace)},_.data=function(t){t=a.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},_.create=function(t,e){var n=E(_);return n.defaults=a.extend({},_.defaults),a.extend(n.defaults,e),n.compatOptions=a.extend({},_.compatOptions),n.namespace=t,n.data=_.data,n.Item=E(u),a.htmlInit(n,t),s&&s.bridget&&s.bridget(t,n),n};function E(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}var g={ms:1,s:1e3};function i(t){if(typeof t=="number")return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),n=e&&e[1],p=e&&e[2];if(!n.length)return 0;n=parseFloat(n);var v=g[p]||1;return n*v}return _.Item=u,_})});var at=x((yt,N)=>{(function(c,l){typeof define=="function"&&define.amd?define(["outlayer/outlayer","get-size/get-size"],l):typeof N=="object"&&N.exports?N.exports=l(st(),D()):c.Masonry=l(c.Outlayer,c.getSize)})(window,function(l,h){"use strict";var d=l.create("masonry");d.compatOptions.fitWidth="isFitWidth";var a=d.prototype;return a._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var u=0;u<this.cols;u++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},a.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var u=this.items[0],r=u&&u.element;this.columnWidth=r&&h(r).outerWidth||this.containerWidth}var s=this.columnWidth+=this.gutter,m=this.containerWidth+this.gutter,y=m/s,f=s-m%s,_=f&&f<1?"round":"floor";y=Math[_](y),this.cols=Math.max(y,1)},a.getContainerWidth=function(){var u=this._getOption("fitWidth"),r=u?this.element.parentNode:this.element,s=h(r);this.containerWidth=s&&s.innerWidth},a._getItemLayoutPosition=function(u){u.getSize();var r=u.size.outerWidth%this.columnWidth,s=r&&r<1?"round":"ceil",m=Math[s](u.size.outerWidth/this.columnWidth);m=Math.min(m,this.cols);for(var y=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",f=this[y](m,u),_={x:this.columnWidth*f.col,y:f.y},o=f.y+u.size.outerHeight,E=m+f.col,g=f.col;g<E;g++)this.colYs[g]=o;return _},a._getTopColPosition=function(u){var r=this._getTopColGroup(u),s=Math.min.apply(Math,r);return{col:r.indexOf(s),y:s}},a._getTopColGroup=function(u){if(u<2)return this.colYs;for(var r=[],s=this.cols+1-u,m=0;m<s;m++)r[m]=this._getColGroupY(m,u);return r},a._getColGroupY=function(u,r){if(r<2)return this.colYs[u];var s=this.colYs.slice(u,u+r);return Math.max.apply(Math,s)},a._getHorizontalColPosition=function(u,r){var s=this.horizontalColIndex%this.cols,m=u>1&&s+u>this.cols;s=m?0:s;var y=r.size.outerWidth&&r.size.outerHeight;return this.horizontalColIndex=y?s+u:this.horizontalColIndex,{col:s,y:this._getColGroupY(s,u)}},a._manageStamp=function(u){var r=h(u),s=this._getElementOffset(u),m=this._getOption("originLeft"),y=m?s.left:s.right,f=y+r.outerWidth,_=Math.floor(y/this.columnWidth);_=Math.max(0,_);var o=Math.floor(f/this.columnWidth);o-=f%this.columnWidth?0:1,o=Math.min(this.cols-1,o);for(var E=this._getOption("originTop"),g=(E?s.top:s.bottom)+r.outerHeight,i=_;i<=o;i++)this.colYs[i]=Math.max(g,this.colYs[i])},a._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var u={height:this.maxY};return this._getOption("fitWidth")&&(u.width=this._getContainerFitWidth()),u},a._getContainerFitWidth=function(){for(var u=0,r=this.cols;--r&&this.colYs[r]===0;)u++;return(this.cols-u)*this.columnWidth-this.gutter},a.needsResizeLayout=function(){var u=this.containerWidth;return this.getContainerWidth(),u!=this.containerWidth},d})});var ht=ut(at(),1);var dt=["ngx-masonry",""],ft=["*"],lt=(()=>{class c{constructor(h,d){this.platformId=h,this._element=d,this.updateLayout=!1,this.ordered=!1,this.layoutComplete=new M,this.removeComplete=new M,this.itemsLoaded=new M,this.pendingItems=[]}ngOnInit(){this.options||(this.options={}),this.options.itemSelector||(this.options.itemSelector="[ngxMasonryItem], ngxMasonryItem"),this.options.transitionDuration="0s",W(this.platformId)&&(this.masonryInstance=new ht.default(this._element.nativeElement,this.options),this.masonryInstance.on("layoutComplete",h=>{this.layoutComplete.emit(h)}),this.masonryInstance.on("removeComplete",h=>{this.removeComplete.emit(h)}),this.masonryInstance.items=[])}ngOnChanges(h){h.updateLayout&&(h.updateLayout.firstChange||this.layout())}ngOnDestroy(){this.masonryInstance&&this.masonryInstance.destroy()}layout(){setTimeout(()=>{this.masonryInstance.layout()})}reloadItems(){setTimeout(()=>{this.masonryInstance.reloadItems()})}addPendingItem(h){this.pendingItems.push(h)}add(h){if(this.ordered){for(let[d,a]of this.pendingItems.entries())if(a)if(a.images&&a.images.size===0)this.pendingItems[d]=void 0,this.itemLoaded(a),d+1===this.pendingItems.length&&(this.itemsLoaded.emit(this.pendingItems.length),this.pendingItems=[]);else return}else this.itemLoaded(h)}itemLoaded(h){W(this.platformId)&&(h.prepend?this.masonryInstance.prepended(h.element.nativeElement):this.masonryInstance.appended(h.element.nativeElement),this.masonryInstance.items.length===1&&this.masonryInstance.layout(),h.playAnimation(!0))}remove(h){W(this.platformId)&&(this.masonryInstance.remove(h),this.layout())}}return c.\u0275fac=function(h){return new(h||c)(C(Z),C(Y))},c.\u0275cmp=Q({type:c,selectors:[["","ngx-masonry",""],["ngx-masonry"]],inputs:{options:"options",updateLayout:"updateLayout",ordered:"ordered"},outputs:{layoutComplete:"layoutComplete",removeComplete:"removeComplete",itemsLoaded:"itemsLoaded"},features:[$],attrs:dt,ngContentSelectors:ft,decls:1,vars:0,template:function(h,d){h&1&&(K(),tt(0))},styles:["[_nghost-%COMP%]{display:block}"]}),c})(),Mt=(()=>{class c{constructor(h,d,a,u){this.element=h,this.builder=d,this.parent=a,this.renderer=u,this.prepend=!1,this.animations={show:[b({opacity:0}),j("400ms ease-in",b({opacity:1}))],hide:[b({opacity:"*"}),j("400ms ease-in",b({opacity:0}))]}}ngOnInit(){this.parent.options.animations!==void 0&&(this.animations=this.parent.options.animations),this.renderer.setStyle(this.element.nativeElement,"position","fixed"),this.renderer.setStyle(this.element.nativeElement,"right","-150vw"),this.parent.addPendingItem(this)}ngAfterViewInit(){let h=Array.from(this.element.nativeElement.getElementsByTagName("img"));if(this.images=new Set(h),h.length===0)setTimeout(()=>{this.parent.add(this)});else for(let d of h)d.hasAttribute("masonryLazy")?this.imageLoaded(d):(this.renderer.listen(d,"load",a=>{this.imageLoaded(d)}),this.renderer.listen(d,"error",a=>{this.imageLoaded(d)}))}ngOnDestroy(){this.images&&this.images.size===0&&this.element.nativeElement.parentNode&&(this.playAnimation(!1),this.parent.remove(this.element.nativeElement))}imageLoaded(h){this.images.delete(h),this.images.size===0&&this.parent.add(this)}playAnimation(h){let d=h?this.animations.show:this.animations.hide;d&&this.builder.build(d).create(this.element.nativeElement).play()}}return c.\u0275fac=function(h){return new(h||c)(C(Y),C(et),C(G(()=>lt)),C(J))},c.\u0275dir=X({type:c,selectors:[["","ngxMasonryItem",""],["ngxMasonryItem"]],inputs:{prepend:"prepend"}}),c})(),Wt=(()=>{class c{}return c.\u0275fac=function(h){return new(h||c)},c.\u0275mod=V({type:c}),c.\u0275inj=U({}),c})();export{lt as NgxMasonryComponent,Mt as NgxMasonryDirective,Wt as NgxMasonryModule};
