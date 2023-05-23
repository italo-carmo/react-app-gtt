/*! For license information please see 430.64d12e09.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkApp_GTT=self.webpackChunkApp_GTT||[]).push([[430],{21933:function(t,r,e){var n=e(74165),o=e(15861),a=function(){var t=(0,o.Z)((0,n.Z)().mark((function t(r,e,o){var a,i,c,u,s,l,f=arguments;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=f.length>3&&void 0!==f[3]?f[3]:null,r=r.toLowerCase(),i="".concat("https://servidor-app-gtt.herokuapp.com").concat(e),c=o?JSON.stringify(o):null,u={"Content-Type":"application/json"},a&&(u.Authorization="Bearer ".concat(a)),t.next=8,fetch(i,{method:r,headers:u,body:c});case 8:return s=t.sent,t.next=11,s.json();case 11:return l=t.sent,t.abrupt("return",l);case 13:case"end":return t.stop()}}),t)})));return function(r,e,n){return t.apply(this,arguments)}}();r.Z=function(){return{getToken:function(){return localStorage.getItem("token")},validateToken:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var r,e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=localStorage.getItem("token"),t.next=3,a("GET","/users/check/token",null,r);case 3:return e=t.sent,t.abrupt("return",e);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),login:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(r,e){var o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a("POST","/users/login",{email:r,senha:e},null);case 2:return o=t.sent,t.abrupt("return",o);case 4:case"end":return t.stop()}}),t)})));return function(r,e){return t.apply(this,arguments)}}(),getDias:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var r,e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=localStorage.getItem("token"),t.next=3,a("GET","/comissionamento/dias",null,r);case 3:return e=t.sent,t.abrupt("return",e);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),getHoras:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var r,e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=localStorage.getItem("token"),t.next=3,a("GET","/etapas/user/horas/1",null,r);case 3:return e=t.sent,t.abrupt("return",e);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),getDados:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var r,e;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=localStorage.getItem("token"),t.next=3,a("GET","/users/1",null,r);case 3:return e=t.sent,t.abrupt("return",e);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),getMissoesAvioes:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(r){var e,o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=localStorage.getItem("token"),t.next=3,a("POST","/missoes/avioes/lista",r,e);case 3:return o=t.sent,t.abrupt("return",o);case 5:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}(),getEsforcoAereo:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(r){var e,o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=localStorage.getItem("token"),t.next=3,a("GET","/esforcos",null,e);case 3:return o=t.sent,t.abrupt("return",o);case 5:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}(),getPauDeSebo:function(){var t=(0,o.Z)((0,n.Z)().mark((function t(r){var e,o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=localStorage.getItem("token"),t.next=3,a("GET","/etapas/paudesebo",null,e);case 3:return o=t.sent,t.abrupt("return",o);case 5:case"end":return t.stop()}}),t)})));return function(r){return t.apply(this,arguments)}}()}}},32430:function(t,r,e){e.r(r),e.d(r,{default:function(){return d}});var n=e(74165),o=e(15861),a=e(29439),i=e(72791),c=e(57689),u=e(78983),s=e(24846),l=e(99161),f=e(93647),h=e(21933),p=e(80184),d=function(){var t=(0,h.Z)(),r=(0,c.s0)(),e=(0,i.useState)(""),d=(0,a.Z)(e,2),v=d[0],g=d[1],y=(0,i.useState)(""),m=(0,a.Z)(y,2),x=m[0],w=m[1],b=(0,i.useState)(null),j=(0,a.Z)(b,2),Z=j[0],k=j[1],E=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var o,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(k(null),v&&x&&""!=v&&""!=x){e.next=4;break}return k("Todos os campos s\xe3o obrigat\xf3rios"),e.abrupt("return");case 4:return e.next=6,t.login(v,x);case 6:if(!(o=e.sent).error){e.next=12;break}return k(o.error),e.abrupt("return");case 12:return localStorage.setItem("token",o.data.token),localStorage.setItem("id",o.data.id),e.next=16,t.getDados();case 16:(a=e.sent).error||(localStorage.setItem("funcao",a.data.FuncoesAbordo.nome),localStorage.setItem("trigrama",a.data.Trigrama.trigrama));case 18:r("/main");case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,p.jsx)("div",{className:"min-vh-100 background",children:(0,p.jsx)(u.KB,{children:(0,p.jsx)(u.rb,{className:"login",children:(0,p.jsx)(u.b7,{md:4,children:(0,p.jsx)(u.dL,{children:(0,p.jsxs)(u.xH,{className:"p-4 loginBody",children:[(0,p.jsx)(u.sl,{children:(0,p.jsxs)(u.lx,{children:[(0,p.jsxs)("div",{className:"box-login",style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,p.jsx)("img",{style:{marginRight:20},src:"https://www.1gtt.com.br/app/gtt.png",width:"30px",height:"36px"}),(0,p.jsx)("h1",{className:"h1-login",style:{color:"#fff"},children:"1\xba GTT"}),(0,p.jsx)("h3",{className:"h3-login",style:{color:"#fff"},children:"Login"})]}),(0,p.jsx)("p",{style:{color:"#fff",opacity:.7},className:"",children:"Entre na sua conta"}),(0,p.jsxs)(u.YR,{className:"mb-3",children:[(0,p.jsx)(u.wV,{children:(0,p.jsx)(s.Z,{icon:l.E})}),(0,p.jsx)(u.jO,{onChange:function(t){g(t.target.value)},value:v,placeholder:"E-mail",autoComplete:"username"})]}),(0,p.jsxs)(u.YR,{className:"mb-4",children:[(0,p.jsx)(u.wV,{children:(0,p.jsx)(s.Z,{icon:f.U})}),(0,p.jsx)(u.jO,{type:"password",placeholder:"Senha",autoComplete:"current-password",value:x,onChange:function(t){w(t.target.value)}})]}),(0,p.jsxs)(u.rb,{children:[(0,p.jsx)(u.b7,{xs:6,children:(0,p.jsx)(u.u5,{onClick:E,color:"primary",className:"px-4 background-login",children:"Login"})}),(0,p.jsx)(u.b7,{xs:6,className:"text-right",children:(0,p.jsx)("a",{style:{color:"#fff",opacity:.7},children:"Esqueceu a senha?"})})]})]})}),Z&&(0,p.jsx)("div",{style:{backgroundColor:"#ff0000",padding:5,borderRadius:5,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",opacity:.8},children:Z})]})})})})})})}},93647:function(t,r,e){e.d(r,{U:function(){return n}});var n=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"]},99161:function(t,r,e){e.d(r,{E:function(){return n}});var n=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"]},15861:function(t,r,e){function n(t,r,e,n,o,a,i){try{var c=t[a](i),u=c.value}catch(s){return void e(s)}c.done?r(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var r=this,e=arguments;return new Promise((function(o,a){var i=t.apply(r,e);function c(t){n(i,o,a,c,u,"next",t)}function u(t){n(i,o,a,c,u,"throw",t)}c(void 0)}))}}e.d(r,{Z:function(){return o}})},74165:function(t,r,e){e.d(r,{Z:function(){return o}});var n=e(71002);function o(){o=function(){return t};var t={},r=Object.prototype,e=r.hasOwnProperty,a=Object.defineProperty||function(t,r,e){t[r]=e.value},i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function l(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{l({},"")}catch(O){l=function(t,r,e){return t[r]=e}}function f(t,r,e,n){var o=r&&r.prototype instanceof d?r:d,i=Object.create(o.prototype),c=new S(n||[]);return a(i,"_invoke",{value:Z(t,e,c)}),i}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(O){return{type:"throw",arg:O}}}t.wrap=f;var p={};function d(){}function v(){}function g(){}var y={};l(y,c,(function(){return this}));var m=Object.getPrototypeOf,x=m&&m(m(T([])));x&&x!==r&&e.call(x,c)&&(y=x);var w=g.prototype=d.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(r){l(t,r,(function(t){return this._invoke(r,t)}))}))}function j(t,r){function o(a,i,c,u){var s=h(t[a],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==(0,n.Z)(f)&&e.call(f,"__await")?r.resolve(f.__await).then((function(t){o("next",t,c,u)}),(function(t){o("throw",t,c,u)})):r.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,u)}))}u(s.arg)}var i;a(this,"_invoke",{value:function(t,e){function n(){return new r((function(r,n){o(t,e,r,n)}))}return i=i?i.then(n,n):n()}})}function Z(t,r,e){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return N()}for(e.method=o,e.arg=a;;){var i=e.delegate;if(i){var c=k(i,e);if(c){if(c===p)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var u=h(t,r,e);if("normal"===u.type){if(n=e.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n="completed",e.method="throw",e.arg=u.arg)}}}function k(t,r){var e=r.method,n=t.iterator[e];if(void 0===n)return r.delegate=null,"throw"===e&&t.iterator.return&&(r.method="return",r.arg=void 0,k(t,r),"throw"===r.method)||"return"!==e&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+e+"' method")),p;var o=h(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,p;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,p):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function E(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function L(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function T(t){if(t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return o.next=o}}return{next:N}}function N(){return{value:void 0,done:!0}}return v.prototype=g,a(w,"constructor",{value:g,configurable:!0}),a(g,"constructor",{value:v,configurable:!0}),v.displayName=l(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===v||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,s,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(j.prototype),l(j.prototype,u,(function(){return this})),t.AsyncIterator=j,t.async=function(r,e,n,o,a){void 0===a&&(a=Promise);var i=new j(f(r,e,n,o),a);return t.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(w),l(w,s,"Generator"),l(w,c,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=T,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return i.type="throw",i.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=e.call(a,"catchLoc"),u=e.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=r,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),p},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),L(e),p}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;L(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:T(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),p}},t}}}]);
//# sourceMappingURL=430.64d12e09.chunk.js.map