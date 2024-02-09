/*! For license information please see 744.7b792f1f.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkApp_GTT=self.webpackChunkApp_GTT||[]).push([[744],{58364:(t,e,o)=>{o.d(e,{c:()=>Ft});var n=o(50504),r=o(75368);const i={modes:{point:(t,e)=>a(t,e,{intersect:!0}),nearest:(t,e,o)=>function(t,e,o){let n=Number.POSITIVE_INFINITY;return a(t,e,o).reduce(((t,i)=>{const s=i.getCenterPoint(),a=function(t,e,o){if("x"===o)return{x:t.x,y:e.y};if("y"===o)return{x:e.x,y:t.y};return e}(e,s,o.axis),d=(0,r.aE)(e,a);return d<n?(t=[i],n=d):d===n&&t.push(i),t}),[]).sort(((t,e)=>t._index-e._index)).slice(0,1)}(t,e,o),x:(t,e,o)=>a(t,e,{intersect:o.intersect,axis:"x"}),y:(t,e,o)=>a(t,e,{intersect:o.intersect,axis:"y"})}};function s(t,e,o){return(i.modes[o.mode]||i.modes.nearest)(t,e,o)}function a(t,e,o){return t.visibleElements.filter((t=>o.intersect?t.inRange(e.x,e.y):function(t,e,o){return"x"!==o&&"y"!==o?t.inRange(e.x,e.y,"x",!0)||t.inRange(e.x,e.y,"y",!0):t.inRange(e.x,e.y,o,!0)}(t,e,o.axis)))}const d=(t,e)=>e>t||t.length>e.length&&t.slice(0,e.length)===e,l=.001,c=(t,e,o)=>Math.min(o,Math.max(e,t));function h(t,e,o){for(const n of Object.keys(t))t[n]=c(t[n],e,o);return t}function u(t,e,o,n){let{x:r,y:i,x2:s,y2:a}=e;const d=n/2,c=t.x>=r-d-l&&t.x<=s+d+l,h=t.y>=i-d-l&&t.y<=a+d+l;return"x"===o?c:("y"===o||c)&&h}function f(t,e){const{centerX:o,centerY:n}=t.getProps(["centerX","centerY"],e);return{x:o,y:n}}const x=t=>"string"===typeof t&&t.endsWith("%"),y=t=>parseFloat(t)/100,p=t=>c(y(t),0,1);function b(t,e){return"start"===e?0:"end"===e?t:x(e)?p(e)*t:t/2}function g(t,e){let o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return"number"===typeof e?e:x(e)?(o?p(e):y(e))*t:t}function m(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"center";return(0,r.i)(t)?{x:(0,r.v)(t.x,e),y:(0,r.v)(t.y,e)}:{x:t=(0,r.v)(t,e),y:t}}function v(t){return t&&((0,r.h)(t.xValue)||(0,r.h)(t.yValue))}function w(t,e,o){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];const i=o.init;if(i)return!0===i?S(e,n):function(t,e,o){if(!0===o)return S(t,e);if((0,r.i)(o))return o}(e,n,(0,r.Q)(i,[{chart:t,properties:e,options:o}]))}function M(t,e,o){let n=!1;return e.forEach((e=>{(0,r.a7)(t[e])?(n=!0,o[e]=t[e]):(0,r.h)(o[e])&&delete o[e]})),n}function S(t,e){let{centerX:o,centerY:n}=t;return e?{centerX:o,centerY:n,radius:0,width:0,height:0}:{x:o,y:n,x2:o,y2:n,width:0,height:0}}const k=new Map,C=t=>t.reduce((function(t,e){return t+=e.string}),"");function P(t){if(t&&"object"===typeof t){const e=t.toString();return"[object HTMLImageElement]"===e||"[object HTMLCanvasElement]"===e}}function D(t,e,o){let{x:n,y:i}=e;o&&(t.translate(n,i),t.rotate((0,r.t)(o)),t.translate(-n,-i))}function j(t,e){if(e&&e.borderWidth)return t.lineCap=e.borderCapStyle,t.setLineDash(e.borderDash),t.lineDashOffset=e.borderDashOffset,t.lineJoin=e.borderJoinStyle,t.lineWidth=e.borderWidth,t.strokeStyle=e.borderColor,!0}function T(t,e){t.shadowColor=e.backgroundShadowColor,t.shadowBlur=e.shadowBlur,t.shadowOffsetX=e.shadowOffsetX,t.shadowOffsetY=e.shadowOffsetY}function O(t,e){const o=e.content;if(P(o))return{width:g(o.width,e.width),height:g(o.height,e.height)};const n=e.font,i=(0,r.b)(n)?n.map((t=>(0,r.a0)(t))):[(0,r.a0)(n)],s=e.textStrokeWidth,a=(0,r.b)(o)?o:[o],d=a.join()+C(i)+s+(t._measureText?"-spriting":"");return k.has(d)||k.set(d,function(t,e,o,n){t.save();const r=e.length;let i=0,s=n;for(let a=0;a<r;a++){const r=o[Math.min(a,o.length-1)];t.font=r.string;const d=e[a];i=Math.max(i,t.measureText(d).width+n),s+=r.lineHeight}return t.restore(),{width:i,height:s}}(t,a,i,s)),k.get(d)}function A(t,e,o){const{x:n,y:i,width:s,height:a}=e;t.save(),T(t,o);const d=j(t,o);t.fillStyle=o.backgroundColor,t.beginPath(),(0,r.au)(t,{x:n,y:i,w:s,h:a,radius:h((0,r.aw)(o.borderRadius),0,Math.min(s,a)/2)}),t.closePath(),t.fill(),d&&(t.shadowColor=o.borderShadowColor,t.stroke()),t.restore()}function Y(t,e,o){const n=o.content;if(P(n))return t.save(),t.globalAlpha=function(t,e){const o=(0,r.x)(t)?t:e;return(0,r.x)(o)?c(o,0,1):1}(o.opacity,n.style.opacity),t.drawImage(n,e.x,e.y,e.width,e.height),void t.restore();const i=(0,r.b)(n)?n:[n],s=o.font,a=(0,r.b)(s)?s.map((t=>(0,r.a0)(t))):[(0,r.a0)(s)],d=o.color,l=(0,r.b)(d)?d:[d],h=function(t,e){const{x:o,width:n}=t,r=e.textAlign;return"center"===r?o+n/2:"end"===r||"right"===r?o+n:o}(e,o),u=e.y+o.textStrokeWidth/2;t.save(),t.textBaseline="middle",t.textAlign=o.textAlign,function(t,e){if(e.textStrokeWidth>0)return t.lineJoin="round",t.miterLimit=2,t.lineWidth=e.textStrokeWidth,t.strokeStyle=e.textStrokeColor,!0}(t,o)&&function(t,e,o,n){let{x:r,y:i}=e;t.beginPath();let s=0;o.forEach((function(e,o){const a=n[Math.min(o,n.length-1)],d=a.lineHeight;t.font=a.string,t.strokeText(e,r,i+d/2+s),s+=d})),t.stroke()}(t,{x:h,y:u},i,a),function(t,e,o,n){let{x:r,y:i}=e,{fonts:s,colors:a}=n,d=0;o.forEach((function(e,o){const n=a[Math.min(o,a.length-1)],l=s[Math.min(o,s.length-1)],c=l.lineHeight;t.beginPath(),t.font=l.string,t.fillStyle=n,t.fillText(e,r,i+c/2+d),d+=c,t.fill()}))}(t,{x:h,y:u},i,{fonts:a,colors:l}),t.restore()}function X(t,e,o,n){const{radius:i,options:s}=e,a=s.pointStyle,d=s.rotation;let l=(d||0)*r.b3;if(P(a))return t.save(),t.translate(o,n),t.rotate(l),t.drawImage(a,-a.width/2,-a.height/2,a.width,a.height),void t.restore();(t=>isNaN(t)||t<=0)(i)||function(t,e){let o,n,i,s,{x:a,y:d,radius:l,rotation:c,style:h,rad:u}=e;switch(t.beginPath(),h){default:t.arc(a,d,l,0,r.T),t.closePath();break;case"triangle":t.moveTo(a+Math.sin(u)*l,d-Math.cos(u)*l),u+=r.b5,t.lineTo(a+Math.sin(u)*l,d-Math.cos(u)*l),u+=r.b5,t.lineTo(a+Math.sin(u)*l,d-Math.cos(u)*l),t.closePath();break;case"rectRounded":s=.516*l,i=l-s,o=Math.cos(u+r.b4)*i,n=Math.sin(u+r.b4)*i,t.arc(a-o,d-n,s,u-r.P,u-r.H),t.arc(a+n,d-o,s,u-r.H,u),t.arc(a+o,d+n,s,u,u+r.H),t.arc(a-n,d+o,s,u+r.H,u+r.P),t.closePath();break;case"rect":if(!c){i=Math.SQRT1_2*l,t.rect(a-i,d-i,2*i,2*i);break}u+=r.b4;case"rectRot":o=Math.cos(u)*l,n=Math.sin(u)*l,t.moveTo(a-o,d-n),t.lineTo(a+n,d-o),t.lineTo(a+o,d+n),t.lineTo(a-n,d+o),t.closePath();break;case"crossRot":u+=r.b4;case"cross":o=Math.cos(u)*l,n=Math.sin(u)*l,t.moveTo(a-o,d-n),t.lineTo(a+o,d+n),t.moveTo(a+n,d-o),t.lineTo(a-n,d+o);break;case"star":o=Math.cos(u)*l,n=Math.sin(u)*l,t.moveTo(a-o,d-n),t.lineTo(a+o,d+n),t.moveTo(a+n,d-o),t.lineTo(a-n,d+o),u+=r.b4,o=Math.cos(u)*l,n=Math.sin(u)*l,t.moveTo(a-o,d-n),t.lineTo(a+o,d+n),t.moveTo(a+n,d-o),t.lineTo(a-n,d+o);break;case"line":o=Math.cos(u)*l,n=Math.sin(u)*l,t.moveTo(a-o,d-n),t.lineTo(a+o,d+n);break;case"dash":t.moveTo(a,d),t.lineTo(a+Math.cos(u)*l,d+Math.sin(u)*l)}t.fill()}(t,{x:o,y:n,radius:i,rotation:d,style:a,rad:l})}const I={xScaleID:{min:"xMin",max:"xMax",start:"left",end:"right",startProp:"x",endProp:"x2"},yScaleID:{min:"yMin",max:"yMax",start:"bottom",end:"top",startProp:"y",endProp:"y2"}};function W(t,e,o){return e="number"===typeof e?e:t.parse(e),(0,r.g)(e)?t.getPixelForValue(e):o}function R(t,e,o){const n=e[o];if(n||"scaleID"===o)return n;const r=o.charAt(0),i=Object.values(t).filter((t=>t.axis&&t.axis===r));return i.length?i[0].id:r}function E(t,e){if(t){const o=t.options.reverse;return{start:W(t,e.min,o?e.end:e.start),end:W(t,e.max,o?e.start:e.end)}}}function _(t,e){const{chartArea:o,scales:n}=t,r=n[R(n,e,"xScaleID")],i=n[R(n,e,"yScaleID")];let s=o.width/2,a=o.height/2;return r&&(s=W(r,e.xValue,r.left+r.width/2)),i&&(a=W(i,e.yValue,i.top+i.height/2)),{x:s,y:a}}function z(t,e){const o=t.scales,n=o[R(o,e,"xScaleID")],r=o[R(o,e,"yScaleID")];if(!n&&!r)return{};let{left:i,right:s}=n||t.chartArea,{top:a,bottom:d}=r||t.chartArea;const l=B(n,{min:e.xMin,max:e.xMax,start:i,end:s});i=l.start,s=l.end;const c=B(r,{min:e.yMin,max:e.yMax,start:d,end:a});return a=c.start,d=c.end,{x:i,y:a,x2:s,y2:d,width:s-i,height:d-a,centerX:i+(s-i)/2,centerY:a+(d-a)/2}}function N(t,e){if(!v(e)){const o=z(t,e);let n=e.radius;n&&!isNaN(n)||(n=Math.min(o.width,o.height)/2,e.radius=n);const r=2*n,i=o.centerX+e.xAdjust,s=o.centerY+e.yAdjust;return{x:i-n,y:s-n,x2:i+n,y2:s+n,centerX:i,centerY:s,width:r,height:r,radius:n}}return function(t,e){const o=_(t,e),n=2*e.radius;return{x:o.x-e.radius+e.xAdjust,y:o.y-e.radius+e.yAdjust,x2:o.x+e.radius+e.xAdjust,y2:o.y+e.radius+e.yAdjust,centerX:o.x+e.xAdjust,centerY:o.y+e.yAdjust,radius:e.radius,width:n,height:n}}(t,e)}function H(t,e){const{scales:o,chartArea:n}=t,r=o[e.scaleID],i={x:n.left,y:n.top,x2:n.right,y2:n.bottom};return r?function(t,e,o){const n=W(t,o.value,NaN),r=W(t,o.endValue,n);t.isHorizontal()?(e.x=n,e.x2=r):(e.y=n,e.y2=r)}(r,i,e):function(t,e,o){for(const n of Object.keys(I)){const r=t[R(t,o,n)];if(r){const{min:t,max:i,start:s,end:a,startProp:d,endProp:l}=I[n],c=E(r,{min:o[t],max:o[i],start:r[s],end:r[a]});e[d]=c.start,e[l]=c.end}}}(o,i,e),i}function V(t,e,o){const n=z(t,e);return n.initProperties=w(t,n,e,o),n.elements=[{type:"label",optionScope:"label",properties:J(t,n,e),initProperties:n.initProperties}],n}function B(t,e){const o=E(t,e)||e;return{start:Math.min(o.start,o.end),end:Math.max(o.start,o.end)}}function L(t,e){const{start:o,end:n,borderWidth:r}=t,{position:i,padding:{start:s,end:a},adjust:d}=e;return o+r/2+d+b(n-r-o-s-a-e.size,i)}function J(t,e,o){const n=o.label;n.backgroundColor="transparent",n.callout.display=!1;const i=m(n.position),s=(0,r.E)(n.padding),a=O(t.ctx,n),d=function(t,e,o,n){let{properties:r,options:i}=t;const{x:s,x2:a,width:d}=r;return L({start:s,end:a,size:d,borderWidth:i.borderWidth},{position:o.x,padding:{start:n.left,end:n.right},adjust:i.label.xAdjust,size:e.width})}({properties:e,options:o},a,i,s),l=function(t,e,o,n){let{properties:r,options:i}=t;const{y:s,y2:a,height:d}=r;return L({start:s,end:a,size:d,borderWidth:i.borderWidth},{position:o.y,padding:{start:n.top,end:n.bottom},adjust:i.label.yAdjust,size:e.height})}({properties:e,options:o},a,i,s),c=a.width+s.width,h=a.height+s.height;return{x:d,y:l,x2:d+c,y2:l+h,width:c,height:h,centerX:d+c/2,centerY:l+h/2,rotation:n.rotation}}function F(t,e,o){const n=Math.cos(o),r=Math.sin(o),i=e.x,s=e.y;return{x:i+n*(t.x-i)-r*(t.y-s),y:s+r*(t.x-i)+n*(t.y-s)}}const $=["enter","leave"],U=$.concat("click");function Q(t,e,o){if(t.listened)switch(e.type){case"mousemove":case"mouseout":return function(t,e,o){if(!t.moveListened)return;let n;n="mousemove"===e.type?s(t,e,o.interaction):[];const r=t.hovered;t.hovered=n;const i={state:t,event:e};let a=q(i,"leave",r,n);return q(i,"enter",n,r)||a}(t,e,o);case"click":return function(t,e,o){const n=t.listeners,r=s(t,e,o.interaction);let i;for(const s of r)i=G(s.options.click||n.click,s,e)||i;return i}(t,e,o)}}function q(t,e,o,n){let r,{state:i,event:s}=t;for(const a of o)n.indexOf(a)<0&&(r=G(a.options[e]||i.listeners[e],a,s)||r);return r}function G(t,e,o){return!0===(0,r.Q)(t,[e.$context,o])}const K=["afterDraw","beforeDraw"];function Z(t,e,o){if(t.hooked){const n=e.options[o]||t.hooks[o];return(0,r.Q)(n,[e.$context])}}function tt(t,e,o){const n=function(t,e,o){const n=e.axis,i=e.id,s=n+"ScaleID",a={min:(0,r.v)(e.min,Number.NEGATIVE_INFINITY),max:(0,r.v)(e.max,Number.POSITIVE_INFINITY)};for(const r of o)r.scaleID===i?rt(r,e,["value","endValue"],a):R(t,r,s)===i&&rt(r,e,[n+"Min",n+"Max",n+"Value"],a);return a}(t.scales,e,o);let i=et(e,n,"min","suggestedMin");i=et(e,n,"max","suggestedMax")||i,i&&(0,r.a7)(e.handleTickRangeOptions)&&e.handleTickRangeOptions()}function et(t,e,o,n){if((0,r.g)(e[o])&&!function(t,e,o){return(0,r.h)(t[e])||(0,r.h)(t[o])}(t.options,o,n)){const n=t[o]!==e[o];return t[o]=e[o],n}}function ot(t,e){for(const o of["scaleID","xScaleID","yScaleID"]){const n=R(e,t,o);n&&!e[n]&&nt(t,o)&&console.warn("No scale found with id '".concat(n,"' for annotation '").concat(t.id,"'"))}}function nt(t,e){if("scaleID"===e)return!0;const o=e.charAt(0);for(const n of["Min","Max","Value"])if((0,r.h)(t[o+n]))return!0;return!1}function rt(t,e,o,n){for(const i of o){const o=t[i];if((0,r.h)(o)){const t=e.parse(o);n.min=Math.min(n.min,t),n.max=Math.max(n.max,t)}}}class it extends n.gr{inRange(t,e,o,n){const{x:i,y:s}=F({x:t,y:e},this.getCenterPoint(n),(0,r.t)(-this.options.rotation));return u({x:i,y:s},this.getProps(["x","y","x2","y2"],n),o,this.options.borderWidth)}getCenterPoint(t){return f(this,t)}draw(t){t.save(),D(t,this.getCenterPoint(),this.options.rotation),A(t,this,this.options),t.restore()}get label(){return this.elements&&this.elements[0]}resolveElementProperties(t,e){return V(t,e)}}it.id="boxAnnotation",it.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderRadius:0,borderShadowColor:"transparent",borderWidth:1,display:!0,init:void 0,label:{backgroundColor:"transparent",borderWidth:0,callout:{display:!1},color:"black",content:null,display:!1,drawTime:void 0,font:{family:void 0,lineHeight:void 0,size:void 0,style:void 0,weight:"bold"},height:void 0,opacity:void 0,padding:6,position:"center",rotation:void 0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,width:void 0,xAdjust:0,yAdjust:0,z:void 0},rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,xMax:void 0,xMin:void 0,xScaleID:void 0,yMax:void 0,yMin:void 0,yScaleID:void 0,z:0},it.defaultRoutes={borderColor:"color",backgroundColor:"color"},it.descriptors={label:{_fallback:!0}};const st=["left","bottom","top","right"];class at extends n.gr{inRange(t,e,o,n){const{x:i,y:s}=F({x:t,y:e},this.getCenterPoint(n),(0,r.t)(-this.rotation));return u({x:i,y:s},this.getProps(["x","y","x2","y2"],n),o,this.options.borderWidth)}getCenterPoint(t){return f(this,t)}draw(t){const e=this.options,o=!(0,r.h)(this._visible)||this._visible;e.display&&e.content&&o&&(t.save(),D(t,this.getCenterPoint(),this.rotation),function(t,e){const{pointX:o,pointY:n,options:i}=e,s=i.callout,a=s&&s.display&&function(t,e){const o=e.position;if(st.includes(o))return o;return function(t,e){const{x:o,y:n,x2:i,y2:s,width:a,height:d,pointX:l,pointY:c,centerX:h,centerY:u,rotation:f}=t,x={x:h,y:u},y=e.start,p=g(a,y),b=g(d,y),m=[o,o+p,o+p,i],v=[n+b,s,n,s],w=[];for(let g=0;g<4;g++){const t=F({x:m[g],y:v[g]},x,(0,r.t)(f));w.push({position:st[g],distance:(0,r.aE)(t,{x:l,y:c})})}return w.sort(((t,e)=>t.distance-e.distance))[0].position}(t,e)}(e,s);if(!a||function(t,e,o){const{pointX:n,pointY:r}=t,i=e.margin;let s=n,a=r;"left"===o?s+=i:"right"===o?s-=i:"top"===o?a+=i:"bottom"===o&&(a-=i);return t.inRange(s,a)}(e,s,a))return;t.save(),t.beginPath();const d=j(t,s);if(!d)return t.restore();const{separatorStart:l,separatorEnd:c}=function(t,e){const{x:o,y:n,x2:r,y2:i}=t,s=function(t,e){const{width:o,height:n,options:r}=t,i=r.callout.margin+r.borderWidth/2;if("right"===e)return o+i;if("bottom"===e)return n+i;return-i}(t,e);let a,d;"left"===e||"right"===e?(a={x:o+s,y:n},d={x:a.x,y:i}):(a={x:o,y:n+s},d={x:r,y:a.y});return{separatorStart:a,separatorEnd:d}}(e,a),{sideStart:h,sideEnd:u}=function(t,e,o){const{y:n,width:r,height:i,options:s}=t,a=s.callout.start,d=function(t,e){const o=e.side;if("left"===t||"top"===t)return-o;return o}(e,s.callout);let l,c;"left"===e||"right"===e?(l={x:o.x,y:n+g(i,a)},c={x:l.x+d,y:l.y}):(l={x:o.x+g(r,a),y:o.y},c={x:l.x,y:l.y+d});return{sideStart:l,sideEnd:c}}(e,a,l);(s.margin>0||0===i.borderWidth)&&(t.moveTo(l.x,l.y),t.lineTo(c.x,c.y));t.moveTo(h.x,h.y),t.lineTo(u.x,u.y);const f=F({x:o,y:n},e.getCenterPoint(),(0,r.t)(-e.rotation));t.lineTo(f.x,f.y),t.stroke(),t.restore()}(t,this),A(t,this,e),Y(t,function(t){let{x:e,y:o,width:n,height:i,options:s}=t;const a=s.borderWidth/2,d=(0,r.E)(s.padding);return{x:e+d.left+a,y:o+d.top+a,width:n-d.left-d.right-s.borderWidth,height:i-d.top-d.bottom-s.borderWidth}}(this),e),t.restore())}resolveElementProperties(t,e){let o;if(v(e))o=_(t,e);else{const{centerX:n,centerY:r}=z(t,e);o={x:n,y:r}}const n=(0,r.E)(e.padding),i=function(t,e,o,n){const r=e.width+n.width+o.borderWidth,i=e.height+n.height+o.borderWidth,s=m(o.position,"center"),a=dt(t.x,r,o.xAdjust,s.x),d=dt(t.y,i,o.yAdjust,s.y);return{x:a,y:d,x2:a+r,y2:d+i,width:r,height:i,centerX:a+r/2,centerY:d+i/2}}(o,O(t.ctx,e),e,n);return{initProperties:w(t,i,e),pointX:o.x,pointY:o.y,...i,rotation:e.rotation}}}function dt(t,e){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return t-b(e,arguments.length>3?arguments[3]:void 0)+o}at.id="labelAnnotation",at.defaults={adjustScaleRange:!0,backgroundColor:"transparent",backgroundShadowColor:"transparent",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderRadius:0,borderShadowColor:"transparent",borderWidth:0,callout:{borderCapStyle:"butt",borderColor:void 0,borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:1,display:!1,margin:5,position:"auto",side:5,start:"50%"},color:"black",content:null,display:!0,font:{family:void 0,lineHeight:void 0,size:void 0,style:void 0,weight:void 0},height:void 0,init:void 0,opacity:void 0,padding:6,position:"center",rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,textAlign:"center",textStrokeColor:void 0,textStrokeWidth:0,width:void 0,xAdjust:0,xMax:void 0,xMin:void 0,xScaleID:void 0,xValue:void 0,yAdjust:0,yMax:void 0,yMin:void 0,yScaleID:void 0,yValue:void 0,z:0},at.defaultRoutes={borderColor:"color"};const lt=(t,e,o)=>({x:t.x+o*(e.x-t.x),y:t.y+o*(e.y-t.y)}),ct=(t,e,o)=>lt(e,o,Math.abs((t-e.y)/(o.y-e.y))).x,ht=(t,e,o)=>lt(e,o,Math.abs((t-e.x)/(o.x-e.x))).y,ut=t=>t*t,ft=(t,e,o,n)=>(1-n)*(1-n)*t+2*(1-n)*n*e+n*n*o,xt=(t,e,o,n)=>({x:ft(t.x,e.x,o.x,n),y:ft(t.y,e.y,o.y,n)}),yt=(t,e,o,n)=>2*(1-n)*(e-t)+2*n*(o-e),pt=(t,e,o,n)=>-Math.atan2(yt(t.x,e.x,o.x,n),yt(t.y,e.y,o.y,n))+.5*r.P;class bt extends n.gr{inRange(t,e,o,n){const r=this.options.borderWidth/2;if("x"!==o&&"y"!==o){const o={mouseX:t,mouseY:e},{path:i,ctx:s}=this;if(i){j(s,this.options);const{chart:r}=this.$context,a=t*r.currentDevicePixelRatio,d=e*r.currentDevicePixelRatio,l=s.isPointInStroke(i,a,d)||vt(this,o,n);return s.restore(),l}return function(t,e){let{mouseX:o,mouseY:n}=e,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l,i=arguments.length>3?arguments[3]:void 0;const{x:s,y:a,x2:d,y2:c}=t.getProps(["x","y","x2","y2"],i),h=d-s,u=c-a,f=ut(h)+ut(u),x=0===f?-1:((o-s)*h+(n-a)*u)/f;let y,p;x<0?(y=s,p=a):x>1?(y=d,p=c):(y=s+x*h,p=a+x*u);return ut(o-y)+ut(n-p)<=r}(this,o,ut(r),n)||vt(this,o,n)}return function(t,e,o,n){let{mouseX:r,mouseY:i}=e,{hBorderWidth:s,useFinalPosition:a}=n;const d=((t,e,o,n)=>{let{x:r,y:i,x2:s,y2:a}=o;return"y"===n?{start:Math.min(i,a),end:Math.max(i,a),value:e}:{start:Math.min(r,s),end:Math.max(r,s),value:t}})(r,i,t.getProps(["x","y","x2","y2"],a),o);return d.value>=d.start-s&&d.value<=d.end+s||vt(t,{mouseX:r,mouseY:i},a,o)}(this,{mouseX:t,mouseY:e},o,{hBorderWidth:r,useFinalPosition:n})}getCenterPoint(t){return f(this,t)}draw(t){const{x:e,y:o,x2:n,y2:i,cp:s,options:a}=this;if(t.save(),!j(t,a))return t.restore();T(t,a);const d=Math.sqrt(Math.pow(n-e,2)+Math.pow(i-o,2));if(a.curve&&s)return function(t,e,o,n){const{x:i,y:s,x2:a,y2:d,options:l}=e,{startOpts:c,endOpts:h,startAdjust:u,endAdjust:f}=St(e),x={x:i,y:s},y={x:a,y:d},p=pt(x,o,y,0),b=pt(x,o,y,1)-r.P,g=xt(x,o,y,u/n),m=xt(x,o,y,1-f/n),v=new Path2D;t.beginPath(),v.moveTo(g.x,g.y),v.quadraticCurveTo(o.x,o.y,m.x,m.y),t.shadowColor=l.borderShadowColor,t.stroke(v),e.path=v,e.ctx=t,Pt(t,g,{angle:p,adjust:u},c),Pt(t,m,{angle:b,adjust:f},h)}(t,this,s,d),t.restore();const{startOpts:l,endOpts:c,startAdjust:h,endAdjust:u}=St(this),f=Math.atan2(i-o,n-e);t.translate(e,o),t.rotate(f),t.beginPath(),t.moveTo(0+h,0),t.lineTo(d-u,0),t.shadowColor=a.borderShadowColor,t.stroke(),Ct(t,0,h,l),Ct(t,d,-u,c),t.restore()}get label(){return this.elements&&this.elements[0]}resolveElementProperties(t,e){const o=H(t,e),{x:n,y:i,x2:s,y2:a}=o,d=function(t,e){let{x:o,y:n,x2:r,y2:i}=t,{top:s,right:a,bottom:d,left:l}=e;return!(o<l&&r<l||o>a&&r>a||n<s&&i<s||n>d&&i>d)}(o,t.chartArea),l=d?function(t,e,o){const{x:n,y:r}=mt(t,e,o),{x:i,y:s}=mt(e,t,o);return{x:n,y:r,x2:i,y2:s,width:Math.abs(i-n),height:Math.abs(s-r)}}({x:n,y:i},{x:s,y:a},t.chartArea):{x:n,y:i,x2:s,y2:a,width:Math.abs(s-n),height:Math.abs(a-i)};if(l.centerX=(s+n)/2,l.centerY=(a+i)/2,l.initProperties=w(t,l,e),e.curve){const t={x:l.x,y:l.y},o={x:l.x2,y:l.y2};l.cp=function(t,e,o){const{x:n,y:r,x2:i,y2:s,centerX:a,centerY:d}=t,l=Math.atan2(s-r,i-n),c=m(e.controlPoint,0);return F({x:a+g(o,c.x,!1),y:d+g(o,c.y,!1)},{x:a,y:d},l)}(l,e,(0,r.aE)(t,o))}const c=function(t,e,o){const n=o.borderWidth,i=(0,r.E)(o.padding),s=O(t.ctx,o),a=s.width+i.width+n,d=s.height+i.height+n;return function(t,e,o,n){const{width:i,height:s,padding:a}=o,{xAdjust:d,yAdjust:l}=e,c={x:t.x,y:t.y},h={x:t.x2,y:t.y2},u="auto"===e.rotation?function(t){const{x:e,y:o,x2:n,y2:i}=t,s=Math.atan2(i-o,n-e);return s>r.P/2?s-r.P:s<r.P/-2?s+r.P:s}(t):(0,r.t)(e.rotation),f=function(t,e,o){const n=Math.cos(o),r=Math.sin(o);return{w:Math.abs(t*n)+Math.abs(e*r),h:Math.abs(t*r)+Math.abs(e*n)}}(i,s,u),x=function(t,e,o,n){let r;const i=function(t,e){const{x:o,x2:n,y:r,y2:i}=t,s=Math.min(r,i)-e.top,a=Math.min(o,n)-e.left,d=e.bottom-Math.max(r,i),l=e.right-Math.max(o,n);return{x:Math.min(a,l),y:Math.min(s,d),dx:a<=l?1:-1,dy:s<=d?1:-1}}(t,n);r="start"===e.position?wt({w:t.x2-t.x,h:t.y2-t.y},o,e,i):"end"===e.position?1-wt({w:t.x-t.x2,h:t.y-t.y2},o,e,i):b(1,e.position);return r}(t,e,{labelSize:f,padding:a},n),y=t.cp?xt(c,t.cp,h,x):lt(c,h,x),p={size:f.w,min:n.left,max:n.right,padding:a.left},g={size:f.h,min:n.top,max:n.bottom,padding:a.top},m=Mt(y.x,p)+d,v=Mt(y.y,g)+l;return{x:m-i/2,y:v-s/2,x2:m+i/2,y2:v+s/2,centerX:m,centerY:v,pointX:y.x,pointY:y.y,width:i,height:s,rotation:(0,r.U)(u)}}(e,o,{width:a,height:d,padding:i},t.chartArea)}(t,l,e.label);return c._visible=d,l.elements=[{type:"label",optionScope:"label",properties:c,initProperties:l.initProperties}],l}}bt.id="lineAnnotation";const gt={backgroundColor:void 0,backgroundShadowColor:void 0,borderColor:void 0,borderDash:void 0,borderDashOffset:void 0,borderShadowColor:void 0,borderWidth:void 0,display:void 0,fill:void 0,length:void 0,shadowBlur:void 0,shadowOffsetX:void 0,shadowOffsetY:void 0,width:void 0};function mt(t,e,o){let{x:n,y:r}=t,{top:i,right:s,bottom:a,left:d}=o;return n<d&&(r=ht(d,{x:n,y:r},e),n=d),n>s&&(r=ht(s,{x:n,y:r},e),n=s),r<i&&(n=ct(i,{x:n,y:r},e),r=i),r>a&&(n=ct(a,{x:n,y:r},e),r=a),{x:n,y:r}}function vt(t,e,o,n){let{mouseX:r,mouseY:i}=e;const s=t.label;return s.options.display&&s.inRange(r,i,n,o)}function wt(t,e,o,n){const{labelSize:r,padding:i}=e,s=t.w*n.dx,a=t.h*n.dy,d=s>0&&(r.w/2+i.left-n.x)/s,l=a>0&&(r.h/2+i.top-n.y)/a;return c(Math.max(d,l),0,.25)}function Mt(t,e){const{size:o,min:n,max:r,padding:i}=e,s=o/2;return o>r-n?(r+n)/2:(n>=t-i-s&&(t=n+i+s),r<=t+i+s&&(t=r-i-s),t)}function St(t){const e=t.options,o=e.arrowHeads&&e.arrowHeads.start,n=e.arrowHeads&&e.arrowHeads.end;return{startOpts:o,endOpts:n,startAdjust:kt(t,o),endAdjust:kt(t,n)}}function kt(t,e){if(!e||!e.display)return 0;const{length:o,width:n}=e,r=t.options.borderWidth/2,i={x:o,y:n+r},s={x:0,y:r};return Math.abs(ct(0,i,s))}function Ct(t,e,o,n){if(!n||!n.display)return;const{length:r,width:i,fill:s,backgroundColor:a,borderColor:d}=n,l=Math.abs(e-r)+o;t.beginPath(),T(t,n),j(t,n),t.moveTo(l,-i),t.lineTo(e+o,0),t.lineTo(l,i),!0===s?(t.fillStyle=a||d,t.closePath(),t.fill(),t.shadowColor="transparent"):t.shadowColor=n.borderShadowColor,t.stroke()}function Pt(t,e,o,n){let{x:r,y:i}=e,{angle:s,adjust:a}=o;n&&n.display&&(t.save(),t.translate(r,i),t.rotate(s),Ct(t,0,-a,n),t.restore())}bt.defaults={adjustScaleRange:!0,arrowHeads:{display:!1,end:Object.assign({},gt),fill:!1,length:12,start:Object.assign({},gt),width:6},borderDash:[],borderDashOffset:0,borderShadowColor:"transparent",borderWidth:2,curve:!1,controlPoint:{y:"-50%"},display:!0,endValue:void 0,init:void 0,label:{backgroundColor:"rgba(0,0,0,0.8)",backgroundShadowColor:"transparent",borderCapStyle:"butt",borderColor:"black",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderRadius:6,borderShadowColor:"transparent",borderWidth:0,callout:Object.assign({},at.defaults.callout),color:"#fff",content:null,display:!1,drawTime:void 0,font:{family:void 0,lineHeight:void 0,size:void 0,style:void 0,weight:"bold"},height:void 0,opacity:void 0,padding:6,position:"center",rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,textAlign:"center",textStrokeColor:void 0,textStrokeWidth:0,width:void 0,xAdjust:0,yAdjust:0,z:void 0},scaleID:void 0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,value:void 0,xMax:void 0,xMin:void 0,xScaleID:void 0,yMax:void 0,yMin:void 0,yScaleID:void 0,z:0},bt.descriptors={arrowHeads:{start:{_fallback:!0},end:{_fallback:!0},_fallback:!0}},bt.defaultRoutes={borderColor:"color"};class Dt extends n.gr{inRange(t,e,o,n){const i=this.options.rotation,s=this.options.borderWidth;if("x"!==o&&"y"!==o)return function(t,e,o,n){const{width:i,height:s,centerX:a,centerY:d}=e,l=i/2,c=s/2;if(l<=0||c<=0)return!1;const h=(0,r.t)(o||0),u=n/2||0,f=Math.cos(h),x=Math.sin(h),y=Math.pow(f*(t.x-a)+x*(t.y-d),2),p=Math.pow(x*(t.x-a)-f*(t.y-d),2);return y/Math.pow(l+u,2)+p/Math.pow(c+u,2)<=1.0001}({x:t,y:e},this.getProps(["width","height","centerX","centerY"],n),i,s);const{x:a,y:d,x2:c,y2:h}=this.getProps(["x","y","x2","y2"],n),u=s/2,f="y"===o?{start:d,end:h}:{start:a,end:c},x=F({x:t,y:e},this.getCenterPoint(n),(0,r.t)(-i));return x[o]>=f.start-u-l&&x[o]<=f.end+u+l}getCenterPoint(t){return f(this,t)}draw(t){const{width:e,height:o,centerX:n,centerY:i,options:s}=this;t.save(),D(t,this.getCenterPoint(),s.rotation),T(t,this.options),t.beginPath(),t.fillStyle=s.backgroundColor;const a=j(t,s);t.ellipse(n,i,o/2,e/2,r.P/2,0,2*r.P),t.fill(),a&&(t.shadowColor=s.borderShadowColor,t.stroke()),t.restore()}get label(){return this.elements&&this.elements[0]}resolveElementProperties(t,e){return V(t,e,!0)}}Dt.id="ellipseAnnotation",Dt.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderDash:[],borderDashOffset:0,borderShadowColor:"transparent",borderWidth:1,display:!0,init:void 0,label:Object.assign({},it.defaults.label),rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,xMax:void 0,xMin:void 0,xScaleID:void 0,yMax:void 0,yMin:void 0,yScaleID:void 0,z:0},Dt.defaultRoutes={borderColor:"color",backgroundColor:"color"},Dt.descriptors={label:{_fallback:!0}};class jt extends n.gr{inRange(t,e,o,n){const{x:r,y:i,x2:s,y2:a,width:d}=this.getProps(["x","y","x2","y2","width"],n),l=this.options.borderWidth;if("x"!==o&&"y"!==o)return function(t,e,o,n){if(!t||!e||o<=0)return!1;const r=n/2;return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)<=Math.pow(o+r,2)}({x:t,y:e},this.getCenterPoint(n),d/2,l);const c=l/2,h="y"===o?{start:i,end:a,value:e}:{start:r,end:s,value:t};return h.value>=h.start-c&&h.value<=h.end+c}getCenterPoint(t){return f(this,t)}draw(t){const e=this.options,o=e.borderWidth;if(e.radius<.1)return;t.save(),t.fillStyle=e.backgroundColor,T(t,e);const n=j(t,e);X(t,this,this.centerX,this.centerY),n&&!P(e.pointStyle)&&(t.shadowColor=e.borderShadowColor,t.stroke()),t.restore(),e.borderWidth=o}resolveElementProperties(t,e){const o=N(t,e);return o.initProperties=w(t,o,e,!0),o}}jt.id="pointAnnotation",jt.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderDash:[],borderDashOffset:0,borderShadowColor:"transparent",borderWidth:1,display:!0,init:void 0,pointStyle:"circle",radius:10,rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,xAdjust:0,xMax:void 0,xMin:void 0,xScaleID:void 0,xValue:void 0,yAdjust:0,yMax:void 0,yMin:void 0,yScaleID:void 0,yValue:void 0,z:0},jt.defaultRoutes={borderColor:"color",backgroundColor:"color"};class Tt extends n.gr{inRange(t,e,o,n){if("x"!==o&&"y"!==o)return this.options.radius>=.1&&this.elements.length>1&&function(t,e,o,n){let r=!1,i=t[t.length-1].getProps(["bX","bY"],n);for(const s of t){const t=s.getProps(["bX","bY"],n);t.bY>o!==i.bY>o&&e<(i.bX-t.bX)*(o-t.bY)/(i.bY-t.bY)+t.bX&&(r=!r),i=t}return r}(this.elements,t,e,n);const i=F({x:t,y:e},this.getCenterPoint(n),(0,r.t)(-this.options.rotation)),s=this.elements.map((t=>"y"===o?t.bY:t.bX)),a=Math.min(...s),d=Math.max(...s);return i[o]>=a&&i[o]<=d}getCenterPoint(t){return f(this,t)}draw(t){const{elements:e,options:o}=this;t.save(),t.beginPath(),t.fillStyle=o.backgroundColor,T(t,o);const n=j(t,o);let r=!0;for(const i of e)r?(t.moveTo(i.x,i.y),r=!1):t.lineTo(i.x,i.y);t.closePath(),t.fill(),n&&(t.shadowColor=o.borderShadowColor,t.stroke()),t.restore()}resolveElementProperties(t,e){const o=N(t,e),{sides:n,rotation:i}=e,s=[],a=2*r.P/n;let d=i*r.b3;for(let r=0;r<n;r++,d+=a){const n=Ot(o,e,d);n.initProperties=w(t,o,e),s.push(n)}return o.elements=s,o}}function Ot(t,e,o){let{centerX:n,centerY:r}=t,{radius:i,borderWidth:s}=e;const a=s/2,d=Math.sin(o),l=Math.cos(o),c={x:n+d*i,y:r-l*i};return{type:"point",optionScope:"point",properties:{x:c.x,y:c.y,centerX:c.x,centerY:c.y,bX:n+d*(i+a),bY:r-l*(i+a)}}}Tt.id="polygonAnnotation",Tt.defaults={adjustScaleRange:!0,backgroundShadowColor:"transparent",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderShadowColor:"transparent",borderWidth:1,display:!0,init:void 0,point:{radius:0},radius:10,rotation:0,shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,sides:3,xAdjust:0,xMax:void 0,xMin:void 0,xScaleID:void 0,xValue:void 0,yAdjust:0,yMax:void 0,yMin:void 0,yScaleID:void 0,yValue:void 0,z:0},Tt.defaultRoutes={borderColor:"color",backgroundColor:"color"};const At={box:it,ellipse:Dt,label:at,line:bt,point:jt,polygon:Tt};Object.keys(At).forEach((t=>{r.d.describe("elements.".concat(At[t].id),{_fallback:"plugins.annotation.common"})}));const Yt={update:Object.assign},Xt=U.concat(K),It=(t,e)=>(0,r.i)(e)?Vt(t,e):t,Wt=t=>"color"===t||"font"===t;function Rt(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"line";return At[t]?t:(console.warn("Unknown annotation type: '".concat(t,"', defaulting to 'line'")),"line")}function Et(t,e,o,i){const s=function(t,e,o){if("reset"===o||"none"===o||"resize"===o)return Yt;return new n.s1(t,e)}(t,o.animations,i),a=e.annotations,d=function(t,e){const o=e.length,n=t.length;if(n<o){const e=o-n;t.splice(n,0,...new Array(e))}else n>o&&t.splice(o,n-o);return t}(e.elements,a);for(let n=0;n<a.length;n++){const e=a[n],o=Nt(d,n,e.type),i=e.setContext(Bt(t,o,e)),l=o.resolveElementProperties(t,i);l.skip=_t(l),"elements"in l&&(zt(o,l.elements,i,s),delete l.elements),(0,r.h)(o.x)||Object.assign(o,l),Object.assign(o,l.initProperties),l.options=Ht(i),s.update(o,l)}}function _t(t){return isNaN(t.x)||isNaN(t.y)}function zt(t,e,o,n){const r=t.elements||(t.elements=[]);r.length=e.length;for(let i=0;i<e.length;i++){const t=e[i],s=t.properties,a=Nt(r,i,t.type,t.initProperties),d=o[t.optionScope].override(t);s.options=Ht(d),n.update(a,s)}}function Nt(t,e,o,n){const r=At[Rt(o)];let i=t[e];return i&&i instanceof r||(i=t[e]=new r,Object.assign(i,n)),i}function Ht(t){const e=At[Rt(t.type)],o={};o.id=t.id,o.type=t.type,o.drawTime=t.drawTime,Object.assign(o,Vt(t,e.defaults),Vt(t,e.defaultRoutes));for(const n of Xt)o[n]=t[n];return o}function Vt(t,e){const o={};for(const n of Object.keys(e)){const i=e[n],s=t[n];Wt(n)&&(0,r.b)(s)?o[n]=s.map((t=>It(t,i))):o[n]=It(s,i)}return o}function Bt(t,e,o){return e.$context||(e.$context=Object.assign(Object.create(t.getContext()),{element:e,id:o.id,type:"annotation"}))}const Lt=new Map,Jt=U.concat(K);var Ft={id:"annotation",version:"2.2.1",beforeRegister(){!function(t,e,o){let n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];const r=o.split(".");let i=0;for(const s of e.split(".")){const a=r[i++];if(parseInt(s,10)<parseInt(a,10))break;if(d(a,s)){if(n)throw new Error("".concat(t," v").concat(o," is not supported. v").concat(e," or newer is required."));return!1}}}("chart.js","3.7",n.kR.version)},afterRegister(){n.kR.register(At)},afterUnregister(){n.kR.unregister(At)},beforeInit(t){Lt.set(t,{annotations:[],elements:[],visibleElements:[],listeners:{},listened:!1,moveListened:!1,hooks:{},hooked:!1,hovered:[]})},beforeUpdate(t,e,o){const n=Lt.get(t).annotations=[];let i=o.annotations;(0,r.i)(i)?Object.keys(i).forEach((t=>{const e=i[t];(0,r.i)(e)&&(e.id=t,n.push(e))})):(0,r.b)(i)&&n.push(...i),function(t,e){for(const o of t)ot(o,e)}(n,t.scales)},afterDataLimits(t,e){const o=Lt.get(t);tt(t,e.scale,o.annotations.filter((t=>t.display&&t.adjustScaleRange)))},afterUpdate(t,e,o){const n=Lt.get(t);!function(t,e,o){e.listened=M(o,U,e.listeners),e.moveListened=!1,e._getElements=s,$.forEach((t=>{(0,r.a7)(o[t])&&(e.moveListened=!0)})),e.listened&&e.moveListened||e.annotations.forEach((t=>{!e.listened&&(0,r.a7)(t.click)&&(e.listened=!0),e.moveListened||$.forEach((o=>{(0,r.a7)(t[o])&&(e.listened=!0,e.moveListened=!0)}))}))}(0,n,o),Et(t,n,o,e.mode),n.visibleElements=n.elements.filter((t=>!t.skip&&t.options.display)),function(t,e,o){const n=e.visibleElements;e.hooked=M(o,K,e.hooks),e.hooked||n.forEach((t=>{e.hooked||K.forEach((o=>{(0,r.a7)(t.options[o])&&(e.hooked=!0)}))}))}(0,n,o)},beforeDatasetsDraw(t,e,o){$t(t,"beforeDatasetsDraw",o.clip)},afterDatasetsDraw(t,e,o){$t(t,"afterDatasetsDraw",o.clip)},beforeDraw(t,e,o){$t(t,"beforeDraw",o.clip)},afterDraw(t,e,o){$t(t,"afterDraw",o.clip)},beforeEvent(t,e,o){Q(Lt.get(t),e.event,o)&&(e.changed=!0)},afterDestroy(t){Lt.delete(t)},_getState:t=>Lt.get(t),defaults:{animations:{numbers:{properties:["x","y","x2","y2","width","height","centerX","centerY","pointX","pointY","radius"],type:"number"}},clip:!0,interaction:{mode:void 0,axis:void 0,intersect:void 0},common:{drawTime:"afterDatasetsDraw",init:!1,label:{}}},descriptors:{_indexable:!1,_scriptable:t=>!Jt.includes(t)&&"init"!==t,annotations:{_allKeys:!1,_fallback:(t,e)=>"elements.".concat(At[Rt(e.type)].id)},interaction:{_fallback:!0},common:{label:{_indexable:Wt,_fallback:!0},_indexable:Wt}},additionalOptionScopes:[""]};function $t(t,e,o){const{ctx:n,chartArea:i}=t,s=Lt.get(t);o&&(0,r.Y)(n,i);const a=function(t,e){const o=[];for(const n of t)if(n.options.drawTime===e&&o.push({element:n,main:!0}),n.elements&&n.elements.length)for(const t of n.elements)t.options.display&&t.options.drawTime===e&&o.push({element:t});return o}(s.visibleElements,e).sort(((t,e)=>t.element.options.z-e.element.options.z));for(const r of a)Ut(n,i,s,r);o&&(0,r.$)(n)}function Ut(t,e,o,n){const r=n.element;n.main?(Z(o,r,"beforeDraw"),r.draw(t,e),Z(o,r,"afterDraw")):r.draw(t,e)}}}]);
//# sourceMappingURL=744.7b792f1f.chunk.js.map