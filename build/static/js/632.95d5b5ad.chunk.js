"use strict";(self.webpackChunkApp_GTT=self.webpackChunkApp_GTT||[]).push([[632],{73281:function(e,t,a){a.r(t),a.d(t,{default:function(){return S}});var s=a(93433),n=a(74165),r=a(15861),o=a(1413),i=a(29439),c=a(72791),u=a(78983),l=a(21933),d=a(59513),m=a.n(d),p=(a(68639),a(80184)),f=function(e){var t=e.maxLength,a=e.value,s=e.onChange,n=e.erro,r=e.onKeyPress,o=e.id,i=void 0===o?"":o;return(0,p.jsx)("input",{type:"text",id:i,value:a,onChange:function(e){var a=e.target.value.toUpperCase().replace(/[^A-Z]/g,"").substring(0,t);s(a)},maxLength:t,style:{border:n?"1px solid #ff0000":"1px solid #000"},onKeyPress:r})},v=function(e){var t=e.maxLength,a=e.value,s=e.onChange,n=e.erro,r=e.onKeyPress;return(0,p.jsx)("input",{type:"text",value:a,onChange:function(e){var a=e.target.value.toUpperCase().replace(/[^A-Z]/g,"").substring(0,t);s(a)},maxLength:t,style:{border:n?"1px solid #ff0000":"1px solid #000"},onKeyPress:r})},h=function(e){var t=e.value,a=e.onChange,s=e.disabled;return(0,p.jsx)("input",{type:"number",value:t,onChange:function(e){var t=e.target.value.toUpperCase().replace(/[^0-9]/g,"").substring(0,5);a(t)},maxLength:5,disabled:s,style:{border:"1px solid #000",backgroundColor:"#fff"}})},x=function(e){var t=e.value,a=e.onChange;return(0,p.jsx)("input",{type:"number",value:t,onChange:function(e){var t=e.target.value.toUpperCase().replace(/[^0-9]/g,"").substring(0,5);a(t)},maxLength:5,style:{border:"1px solid #000"}})},g=function(e){var t=e.value,a=e.onChange;return(0,p.jsx)("input",{type:"number",value:t,onChange:function(e){var t=e.target.value.toUpperCase().replace(/[^0-9]/g,"").substring(0,5);a(t)},maxLength:5,style:{border:"1px solid #000",width:80}})},j=function(e){var t=e.value,a=e.onChange;return(0,p.jsx)("input",{type:"text",value:t,onChange:function(e){var t=e.target.value;a(t)},maxLength:7,style:{border:"1px solid #000",width:80}})},Z=a(72426),b=a.n(Z);a(73528);function y(e){var t=e.dep,a=e.pouso,s=e.alternativa,n=e.horaDep,r=e.horaPouso,o=e.index,i=e.edit,c=e.del,u=!1;return t&&a&&s&&n&&r&&""!=t&&""!=a&&""!=s&&""!=n&&""!=r&&(u=!0),(0,p.jsxs)("div",{className:u?"view-etapa complete":"view-etapa",children:[(0,p.jsxs)("div",{className:u?"complete-text":"",style:{color:"#000"},children:[o+1,"- ",n," ",t," - ",r," ",a]}),(0,p.jsxs)("div",{className:"botoes-etapa",children:[(0,p.jsx)("img",{src:u?"https://www.1gtt.com.br/app/pen-white.png":"https://www.1gtt.com.br/app/pen.png",onClick:i,width:20,height:20}),(0,p.jsx)("img",{src:u?"https://www.1gtt.com.br/app/close-white.png":"https://www.1gtt.com.br/app/close.png",onClick:c,width:20,height:20})]})]})}var w=a(5016);b().tz.setDefault("Etc/UTC");var S=function(){var e=(0,c.useState)([]),t=(0,i.Z)(e,2),a=t[0],d=t[1],Z=(0,c.useState)([]),b=(0,i.Z)(Z,2),S=b[0],C=b[1],N=(0,c.useState)([]),k=(0,i.Z)(N,2),I=k[0],O=k[1],M=(0,c.useState)(!1),D=(0,i.Z)(M,2),T=D[0],E=D[1],A=(0,c.useState)(!1),L=(0,i.Z)(A,2),_=L[0],P=L[1],z=(0,c.useState)(!1),F=(0,i.Z)(z,2),H=F[0],U=F[1],R=(0,c.useState)(!1),K=(0,i.Z)(R,2),B=K[0],G=K[1],V=(0,c.useState)(!1),Y=(0,i.Z)(V,2),J=Y[0],X=Y[1],q=(0,c.useState)([]),Q=(0,i.Z)(q,2),W=Q[0],$=Q[1],ee=(0,c.useState)(new Date),te=(0,i.Z)(ee,2),ae=te[0],se=te[1],ne=(0,c.useState)(new Date),re=(0,i.Z)(ne,2),oe=re[0],ie=(re[1],(0,c.useState)({avioes:[]})),ce=(0,i.Z)(ie,2),ue=ce[0],le=ce[1],de=(0,c.useState)(""),me=(0,i.Z)(de,2),pe=me[0],fe=me[1],ve=(0,c.useState)(!1),he=(0,i.Z)(ve,2),xe=he[0],ge=he[1],je=(0,c.useState)(""),Ze=(0,i.Z)(je,2),be=Ze[0],ye=Ze[1],we=(0,c.useState)(""),Se=(0,i.Z)(we,2),Ce=Se[0],Ne=Se[1],ke=(0,c.useState)(""),Ie=(0,i.Z)(ke,2),Oe=Ie[0],Me=Ie[1],De=(0,c.useState)(""),Te=(0,i.Z)(De,2),Ee=Te[0],Ae=Te[1],Le=(0,c.useState)(new Date),_e=(0,i.Z)(Le,2),Pe=_e[0],ze=_e[1],Fe=(0,c.useState)(new Date),He=(0,i.Z)(Fe,2),Ue=He[0],Re=He[1],Ke=(0,c.useState)(!1),Be=(0,i.Z)(Ke,2),Ge=Be[0],Ve=Be[1],Ye=(0,c.useState)(!1),Je=(0,i.Z)(Ye,2),Xe=Je[0],qe=Je[1],Qe=(0,c.useState)(!1),We=(0,i.Z)(Qe,2),$e=We[0],et=We[1],tt=(0,c.useState)(""),at=(0,i.Z)(tt,2),st=at[0],nt=at[1],rt=(0,c.useState)(!1),ot=(0,i.Z)(rt,2),it=ot[0],ct=ot[1],ut=(0,c.useState)(!1),lt=(0,i.Z)(ut,2),dt=lt[0],mt=lt[1],pt=(0,c.useState)({aviao:"",eventos:[]}),ft=(0,i.Z)(pt,2),vt=ft[0],ht=ft[1],xt=(0,c.useState)([]),gt=(0,i.Z)(xt,2),jt=gt[0],Zt=gt[1],bt=(0,c.useState)(""),yt=(0,i.Z)(bt,2),wt=yt[0],St=yt[1],Ct=(0,c.useState)([]),Nt=(0,i.Z)(Ct,2),kt=Nt[0],It=Nt[1],Ot=(0,c.useState)(!1),Mt=(0,i.Z)(Ot,2),Dt=Mt[0],Tt=Mt[1],Et=(0,c.useState)(!1),At=(0,i.Z)(Et,2),Lt=At[0],_t=At[1],Pt=(0,c.useState)(!1),zt=(0,i.Z)(Pt,2),Ft=zt[0],Ht=zt[1],Ut=(0,c.useState)(""),Rt=(0,i.Z)(Ut,2),Kt=Rt[0],Bt=Rt[1],Gt=(0,c.useState)(""),Vt=(0,i.Z)(Gt,2),Yt=Vt[0],Jt=Vt[1],Xt=(0,c.useState)(""),qt=(0,i.Z)(Xt,2),Qt=qt[0],Wt=qt[1],$t=(0,c.useState)(""),ea=(0,i.Z)($t,2),ta=ea[0],aa=ea[1],sa=(0,c.useState)(""),na=(0,i.Z)(sa,2),ra=na[0],oa=na[1],ia=(0,c.useState)([]),ca=(0,i.Z)(ia,2),ua=ca[0],la=ca[1],da=(0,c.useState)(0),ma=(0,i.Z)(da,2),pa=ma[0],fa=ma[1],va=(0,c.useState)(!0),ha=(0,i.Z)(va,2),xa=ha[0],ga=ha[1],ja=(0,c.useState)(!1),Za=(0,i.Z)(ja,2),ba=Za[0],ya=Za[1],wa=(0,c.useState)(""),Sa=(0,i.Z)(wa,2),Ca=Sa[0],Na=Sa[1],ka=(0,c.useState)(""),Ia=(0,i.Z)(ka,2),Oa=Ia[0],Ma=Ia[1],Da=(0,c.useState)(""),Ta=(0,i.Z)(Da,2),Ea=Ta[0],Aa=Ta[1],La=(0,c.useState)(""),_a=(0,i.Z)(La,2),Pa=_a[0],za=_a[1],Fa=(0,c.useState)(""),Ha=(0,i.Z)(Fa,2),Ua=Ha[0],Ra=Ha[1],Ka=(0,c.useState)(""),Ba=(0,i.Z)(Ka,2),Ga=Ba[0],Va=Ba[1],Ya=(0,c.useState)(""),Ja=(0,i.Z)(Ya,2),Xa=Ja[0],qa=Ja[1],Qa=(0,c.useRef)(null),Wa=(0,c.useRef)(null),$a=(0,c.useRef)(null),es=(0,l.Z)(),ts=function(){E(!1)},as=function(e){"Enter"===e.key&&(B?bs():ss())},ss=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ys();case 2:e.sent&&setTimeout((function(){var e=document.getElementById("icao-pouso");e&&e.focus()}),0);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ns=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t){var r,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(mt(!1),"Enter"!==t.key){e.next=8;break}return r=(0,s.Z)(a),e.next=5,es.getTrigrama(Yt);case 5:o=e.sent,console.log(o),o.error?mt(o.error):(r.push({id:o.data.id_user,trigrama:o.data.trigrama,funcao:o.data.Usuario.FuncoesAbordo.nome}),d(r),Jt(""));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),rs=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=new Date(e);a.setDate(a.getDate()-1);for(var s=[],n=0;n<=6;n++){if(0!=n)var r=a.setDate(a.getDate()+1);else r=a.setDate(a.getDate());var o=new Date(r),i=o.getDate(),c=o.getMonth()+1;i<=9&&(i="0"+i),c<=9&&(c="0"+c);var u=i+"/"+c+"/"+o.getFullYear();s.push(u)}$(s),cs(s,t)},os=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,es.getOfrags();case 2:(t=e.sent).error||la(t.data.reverse());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),is=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a,s,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Ae(""),nt(""),""!=jt){e.next=5;break}return nt("A aeronave \xe9 obrigat\xf3ria"),e.abrupt("return");case 5:if(!H){e.next=8;break}return nt("Exclua essa OMIS e crie outra para cumprir com OFRAG"),e.abrupt("return");case 8:if(""==ra){e.next=13;break}return e.next=11,es.getOfrag(ra);case 11:(t=e.sent).error||(a=[],s=(0,o.Z)({},ue),t.data.missoes[0].rotaOfrag.etapas.forEach((function(e){var t=e.dataHoraDecolagem.split("T"),n=(0,i.Z)(t,2),r=n[0],o=n[1],c=r.split("-"),u=(0,i.Z)(c,3),l=u[0],d=u[1],m=u[2],p=o.split(":"),f=(0,i.Z)(p,3),v=f[0],h=f[1];f[2];if(e.dataHoraPouso){var x=e.dataHoraPouso.split("T"),g=(0,i.Z)(x,2),j=g[0],Z=g[1],b=j.split("-"),y=(0,i.Z)(b,3),w=(y[0],y[1],y[2],Z.split(":")),S=(0,i.Z)(w,3),C=S[0],N=S[1];S[2]}var k={data:"".concat(m,"/").concat(d,"/").concat(l),tipo:"missao",missao:{id:Math.floor(1e4*Math.random())+1,dep:e.codigoIcaoOrigem,horaDep:"".concat(v,":").concat(h,"Z"),pouso:e.codigoIcaoDestino,horaPouso:e.dataHoraPouso?"".concat(C,":").concat(N,"Z"):"",depISO:e.dataHoraDecolagem,pousoISO:e.dataHoraPouso,tripulacao:[],omis:"",edicao:!0},manutencao:null},I=s.avioes.findIndex((function(e){return e.aviao==jt}));I>=0&&s.avioes[I].eventos.push(k),a.push(k)})),a.length>0&&((r=(0,o.Z)({},vt)).eventos=a,ht(r),Ae(""),Ht(!1),ct(!0),le(s)));case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),cs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t){var a,s,r,o,i,c,u=arguments;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.length>1&&void 0!==u[1]&&u[1],s=t[0],r=t[6],e.next=5,es.getMissoesAvioes({inicio:s,fim:r});case 5:(o=e.sent).error||(i=o.data,a||vt.eventos.length>0&&(c=i.findIndex((function(e){return e.aviao==jt})))>=0&&vt.eventos.forEach((function(e){i[c].eventos.push(e)})),le({avioes:i}),console.log({avioes:i}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),us=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,es.getAeronaves();case 2:(t=e.sent).error||(It(t.data),console.log("AERONAVES"),console.log(t.data));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ls=function(e,t){var a=new Date(ae);t?a.setDate(a.getDate()-e):a.setDate(a.getDate()+e),se(a)},ds=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Tt(!1),_t(!1),U(!1),P(!0),e.next=6,es.getUltimaMissao();case 6:(t=e.sent).error||Wt((parseInt(t.data[0].numero)+1).toString());case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ms=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a,s,r,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""==Pe||""==Ue||4!=be.length||4!=Ce.length){e.next=9;break}return Ve(!1),qe(!1),et(!1),Ae(""),e.next=7,es.getDistanciaAerodromos({origem:be,destino:Ce});case 7:(t=e.sent).error?(o=t.error,Ae(t.error),o.includes(be)&&Ve(!0),o.includes(Ce)&&qe(!0)):(a=t.data.distancia,s=Math.round(60*a/400),s=5*Math.ceil(s/5),(r=new Date(Pe)).setMinutes(r.getMinutes()+s),Re(r));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ps=function(e,t){Ne(""),Me(""),fa(0);var a=new Date(t);a.setMinutes(a.getMinutes()+120);var s=a.getTimezoneOffset();a.setMinutes(a.getMinutes()+s),ze(a),ye(e),Re(a),Wa.current&&Qa.current.focus()},fs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,s,o,i,c,u;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(_t(!0),""!=jt&&0!=vt.eventos.length){e.next=5;break}return alert("Todos os campos s\xe3o obrigat\xf3rios!"),_t(!1),e.abrupt("return");case 5:if(t=!1,vt.eventos.forEach((function(e){e.missao.pousoISO&&e.missao.depISO&&e.missao.alternativa&&""!=e.missao.alternativa||(t=!0)})),!t){e.next=11;break}return _t(!1),alert("Hor\xe1rios de DEP e POUSO e ICAO de ALTERNATIVA s\xe3o obrigat\xf3rios!"),e.abrupt("return");case 11:if(H){e.next=31;break}return s={},""!=Qt&&(s.numero=Qt),""!=ra&&(s.id_documento=ra),e.next=17,es.createMissao(s);case 17:if((o=e.sent).error){e.next=29;break}return i=o.data.id,vt.eventos.forEach(function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t,a){var s,r,c,u,l,d;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,es.getAerodromo(t.missao.dep);case 2:return s=e.sent,e.next=5,es.getAerodromo(t.missao.pouso);case 5:if(r=e.sent,c=0,u=null,!t.missao.alternativa){e.next=17;break}return e.next=11,es.getAerodromo(t.missao.alternativa);case 11:return l=e.sent,u=l.data.id,e.next=15,es.getCombMinimo(t.missao.dep,t.missao.pouso,t.missao.alternativa);case 15:e.sent.error||(c=o.data.combustivel);case 17:return d={dep:t.missao.depISO,pouso:t.missao.pousoISO,id_missao:i,id_aeronave:wt,id_dep:s.data.id,id_pouso:r.data.id,id_alternativa:u,combustivel_minimo:""!=t.missao.combustivel_minimo?t.missao.combustivel_minimo:c},e.next=20,es.createEtapa(d);case 20:if(!e.sent.error){e.next=26;break}return alert(o.etapa.error),e.abrupt("return");case 26:a==vt.eventos.length-1&&(P(!1),_t(!1),setTimeout((function(){location.reload()}),"2000"));case 27:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),c=[],a.forEach((function(e){c.push(e.id)})),u={id_missao:i,id_militares:c},e.next=26,es.createEscala(u);case 26:_t(!1),e.next=31;break;case 29:_t(!1),alert(o.error);case 31:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),vs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a,s,o,c,u,l,d,m,p,f,v;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m=function(e){var t=e%60,a=Math.floor(e/60).toString().padStart(2,"0"),s=t.toString().padStart(2,"0");return"".concat(a,":").concat(s)},l=function(){return(l=(0,r.Z)((0,n.Z)().mark((function e(){var t,r,u,l,d,m,p,f,v,h,x,g,j,Z,b,y,w;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:0,t=0;case 2:if(!(t<vt.eventos.length)){e.next=19;break}return r=vt.eventos[t],u="01:00",t!=vt.eventos.length-1&&(l=vt.eventos[t+1].missao.depISO,(d=new Date(l)-new Date(r.missao.pousoISO))<288e5&&(u=c(d))),m=s(r.missao.depISO),p=(0,i.Z)(m,2),f=p[0],v=p[1],h=s(r.missao.pousoISO),x=(0,i.Z)(h,2),x[0],g=x[1],j=c(new Date(r.missao.pousoISO)-new Date(r.missao.depISO)),Z="00:00",e.next=12,es.getDistanciaAerodromos({origem:r.missao.pouso,destino:r.missao.alternativa});case 12:(b=e.sent).error||(y=b.data.distancia,Z=o(y)),w={data:f,depIso:r.missao.depISO,horaDep:v,dep:r.missao.dep,horaPouso:g,pouso:r.missao.pouso,tev:j,solo:u,alternativa:r.missao.alternativa,tev_alt:Z,combustivel:r.missao.combustivel_minimo},a.push(w);case 16:t++,e.next=2;break;case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)},u=function(){return l.apply(this,arguments)},c=function(e){var t=Math.floor(e/36e5);t<=9&&(t="0"+t.toString());var a=Math.ceil(e%36e5/6e4);return a<=9&&(a="0"+a.toString()),t+":"+a},o=function(e){var t=e/400,a=Math.round(t%1*60);60===(a=5*Math.ceil(a/5))&&(t+=1,a=0);var s=Math.floor(t);return s<=9&&(s="0"+s.toString()),s+":"+(a<10?"0"+a:a)},t=[],console.log(vt),vt.eventos[0].missao.tripulacao.forEach((function(e){t.push(e)})),a=[],s=function(e){var t=e.split("T"),a=(0,i.Z)(t,2),s=a[0],n=a[1],r=s.split("-"),o=(0,i.Z)(r,3),c=o[0],u=o[1],l=o[2],d=n.split(":"),m=(0,i.Z)(d,3),p=m[0],f=m[1];m[2];return[l+"/"+u+"/"+c,p+":"+f]},e.next=12,u();case 12:t.sort((function(e,t){return e.antiguidade-t.antiguidade})),d=0,a.forEach((function(e){var t=e.tev.split(":"),a=(0,i.Z)(t,2),s=a[0],n=a[1],r=60*parseInt(s)+parseInt(n);d+=r})),p={tripulacao:t,etapas:a,comandante:t[0].posto+" "+t[0].nome_guerra.toUpperCase(),data:a[0].data,aviao:jt,omis:vt.eventos[0].missao.omis,ofrag:vt.eventos[0].ofrag,horas:m(d)},f=encodeURIComponent(JSON.stringify(p)),v="/omis?dados=".concat(f),window.open(v,"_blank");case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),hs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t,a,s){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(t,a,s),""==t||""==a||""==s||4!=t.length||4!=a.length||4!=s.length){e.next=6;break}return e.next=4,es.getCombMinimo({dep:t,pouso:a,alternativa:s});case 4:(r=e.sent).error||fa(r.data.combustivel);case 6:case"end":return e.stop()}}),e)})));return function(t,a,s){return e.apply(this,arguments)}}(),xs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,s,o,i,c,u,l,d;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(_t(!0),t=Kt,""==Qt){e.next=8;break}return s={numero:Qt},""!=ra&&(s.id_documento=ra),""!=ta&&(s.comentarios=ta),e.next=8,es.updateMissao(s,t);case 8:return o=vt.eventos.map(function(){var e=(0,r.Z)((0,n.Z)().mark((function e(t){var a,s,r,o,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={},e.next=3,es.getAerodromo(t.missao.dep);case 3:return s=e.sent,e.next=6,es.getAerodromo(t.missao.pouso);case 6:if(r=e.sent,o=null,!t.missao.alternativa){e.next=13;break}return e.next=11,es.getAerodromo(t.missao.alternativa);case 11:i=e.sent,o=i.data.id;case 13:return a.dep=t.missao.depISO,a.pouso=t.missao.pousoISO,a.id_aeronave=wt,a.id_dep=s.data.id,a.id_pouso=r.data.id,a.id_alternativa=o,a.combustivel_minimo=t.missao.combustivel_minimo,t.missao.edicao?a.id=null:a.id=t.missao.id,e.abrupt("return",a);case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=11,Promise.all(o);case 11:return i=e.sent,c={etapas:i,id_missao:t},e.next=15,es.updateEtapas(c);case 15:if(!(u=e.sent).error){e.next=22;break}return _t(!1),alert(u.error),e.abrupt("return");case 22:return l=[],a.forEach((function(e){l.push(e.id)})),d={id_missao:t,id_militares:l},e.next=27,es.updateEscala(d);case 27:Zs(),P(!1),rs(ae,!0);case 30:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),gs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Tt(!0),!window.confirm("Deseja mesmo excluir essa miss\xe3o?")){e.next=16;break}return t=vt.eventos[0].missao.id_missao,e.next=6,es.deleteMissao(t);case 6:if(!(a=e.sent).error){e.next=11;break}return Tt(!1),alert(a.error),e.abrupt("return");case 11:Tt(!1),le({avioes:[]}),Zs(),P(!1),rs(ae,!0);case 16:Tt(!1);case 17:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),js=function(e){var t=(0,s.Z)(a);t=t.filter((function(t){if(t.id!=e)return t})),d(t)},Zs=function(){ht({aviao:"",eventos:[]});var e=(0,o.Z)({},ue);le(e),Ne(""),ye(""),Me(""),ze(new Date),Re(new Date),Zt(""),aa(""),Wt(""),oa(""),U(!1),G(!1),d([]),fa(0),rs(ae,!0)},bs=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a,s,r,c,u,l,d,m,p,f,v,h,x,g,j,Z,b,y,w,S,C,N,k,I,O,M,D,T,E,A,L,_;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Ae(""),""!=Ce&&""!=be&&""!=Oe&&""!=Pe&&""!=Ue){e.next=4;break}return Ae("Todos os campos s\xe3o obrigat\xf3rios"),e.abrupt("return");case 4:if(""!=jt){e.next=7;break}return Ae("A aeronave \xe9 obrigat\xf3ria"),e.abrupt("return");case 7:return e.next=9,es.getAerodromo(Oe);case 9:if(!(t=e.sent).error){e.next=14;break}return Ae(t.error),et(!0),e.abrupt("return");case 14:et(!1),a=Pe.getTimezoneOffset(),Pe.setMinutes(Pe.getMinutes()-a),s=Ue.getTimezoneOffset(),Ue.setMinutes(Ue.getMinutes()-s),r=Pe.toISOString(),c=Ue.toISOString(),u=r.split("T"),l=(0,i.Z)(u,2),d=l[0],m=l[1],p=c.split("T"),f=(0,i.Z)(p,2),f[0],v=f[1],h=d.split("-"),x=(0,i.Z)(h,3),g=x[0],j=x[1],Z=x[2],b=m.split(":"),y=(0,i.Z)(b,3),w=y[0],S=y[1],y[2],C=v.split(":"),N=(0,i.Z)(C,3),k=N[0],I=N[1],N[2],O=(0,o.Z)({},vt),M=(0,o.Z)({},ue),D=O.eventos[J],T={data:"".concat(Z,"/").concat(j,"/").concat(g),tipo:"missao",missao:{id:D.missao.id,dep:be,horaDep:"".concat(w,":").concat(S,"Z"),pouso:Ce,horaPouso:"".concat(k,":").concat(I,"Z"),alternativa:Oe,depISO:Pe,pousoISO:Ue,tripulacao:[],omis:"",combustivel_minimo:pa,edicao:D.missao.edicao},manutencao:null},O.eventos[J]=T,ht(O),(E=M.avioes.findIndex((function(e){return e.aviao==jt})))>=0&&(A=M.avioes[E].eventos.findIndex((function(e){return e.missao.id==D.missao.id})))>=0&&(M.avioes[E].eventos[A]=T,le(M)),L=O.eventos[O.eventos.length-1].missao.pouso,_=O.eventos[O.eventos.length-1].missao.pousoISO,G(!1),X(""),ps(L,_);case 39:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ys=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a,s,r,c,u,l,d,m,p,f,v,h,x,g,j,Z,b,y,w,S,C,N,k,I,O,M,D,T;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Ae(""),""!=Ce&&""!=be&&""!=Oe&&""!=Pe&&""!=Ue){e.next=4;break}return Ae("Todos os campos s\xe3o obrigat\xf3rios"),e.abrupt("return");case 4:if(""!=jt){e.next=7;break}return Ae("A aeronave \xe9 obrigat\xf3ria"),e.abrupt("return");case 7:return e.next=9,es.getAerodromo(Oe);case 9:if(!(t=e.sent).error){e.next=14;break}return Ae(t.error),et(!0),e.abrupt("return",null);case 14:return et(!1),qe(!1),a=Pe.getTimezoneOffset(),Pe.setMinutes(Pe.getMinutes()-a),s=Ue.getTimezoneOffset(),Ue.setMinutes(Ue.getMinutes()-s),r=Pe.toISOString(),c=Ue.toISOString(),u=r.split("T"),l=(0,i.Z)(u,2),d=l[0],m=l[1],p=c.split("T"),f=(0,i.Z)(p,2),f[0],v=f[1],h=d.split("-"),x=(0,i.Z)(h,3),g=x[0],j=x[1],Z=x[2],b=m.split(":"),y=(0,i.Z)(b,3),w=y[0],S=y[1],y[2],C=v.split(":"),N=(0,i.Z)(C,3),k=N[0],I=N[1],N[2],O={data:"".concat(Z,"/").concat(j,"/").concat(g),tipo:"missao",missao:{id:Math.floor(1e4*Math.random())+1,dep:be,horaDep:"".concat(w,":").concat(S,"Z"),pouso:Ce,horaPouso:"".concat(k,":").concat(I,"Z"),alternativa:Oe,depISO:Pe,pousoISO:Ue,tripulacao:[],omis:"",combustivel_minimo:pa,edicao:!0},manutencao:null},(M=(0,o.Z)({},vt)).eventos.push(O),D=(0,o.Z)({},ue),(T=D.avioes.findIndex((function(e){return e.aviao==jt})))>=0&&D.avioes[T].eventos.push(O),le(D),ht(M),ps(Ce,Ue),e.abrupt("return",!0);case 37:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ws=function(){var e=(0,r.Z)((0,n.Z)().mark((function e(){var t,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!=Pa&&""!=Oa){e.next=3;break}return alert("Todos os campos s\xe3o obrigat\xf3rios"),e.abrupt("return");case 3:return t={situacao:Pa,ciclos:Ca,horas:Oa},e.next=6,es.updateAeronave(t,Xa);case 6:if(!(a=e.sent).error){e.next=12;break}return alert(a.error),e.abrupt("return");case 12:qa(""),Na(""),Ma(""),za(""),ya(!1),alert(a.msg),location.reload();case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){!function(){if(vt.eventos.length>0){var e=(0,o.Z)({},ue);e.avioes.forEach((function(t,a){if(t.eventos.length>0){var s=t.eventos.filter((function(e){if(vt.eventos.findIndex((function(t){return t.missao.id==e.missao.id}))<0)return e}));e.avioes[a].eventos=s}}));var t=e.avioes.findIndex((function(e){return e.aviao==jt}));t>=0&&vt.eventos.forEach((function(a){e.avioes[t].eventos.push(a)})),le(e)}}()}),[jt]),(0,c.useEffect)((function(){ms()}),[Ce,be,Pe]),(0,c.useEffect)((function(){hs(be,Ce,Oe)}),[Ce,be,Oe]),(0,c.useEffect)((function(){us(),os()}),[]),(0,c.useEffect)((function(){rs(ae)}),[ae]);var Ss=(0,c.forwardRef)((function(e,t){e.value;var a=e.onClick;return(0,p.jsx)("button",{className:"calendario",onClick:a,ref:t,children:ae.toLocaleString("pt-BR",{month:"long"}).toUpperCase()+"/"+ae.getFullYear()})})),Cs=function(e){e.value;var t=e.onClick;return(0,p.jsx)("button",{className:"calendario",onClick:t,children:"+"})};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(u.xH,{className:"mb-6",style:{flexDirection:"column"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",padding:10},children:[(0,p.jsx)("div",{className:"",children:(0,p.jsx)(m(),{selected:ae,timeInputLabel:ae.toLocaleString("pt-BR",{month:"long"}).toUpperCase()+"/"+ae.getFullYear(),onChange:function(e){return se(e)},customInput:(0,p.jsx)(Ss,{})})}),(0,p.jsxs)("div",{className:"botoes",children:[(0,p.jsx)("button",{className:"calendario",onClick:function(){return ls(7,!0)},children:"<<"}),(0,p.jsx)("button",{className:"calendario",onClick:function(){return ls(1,!0)},children:"<"}),(0,p.jsx)("button",{className:"calendario",onClick:function(){se(oe)},children:"HOJE"}),(0,p.jsx)("button",{className:"calendario",onClick:function(){return ls(1,!1)},children:">"}),(0,p.jsx)("button",{className:"calendario",onClick:function(){return ls(7,!1)},children:">>"})]}),(0,p.jsx)("div",{children:(0,p.jsx)("button",{onClick:ds,className:"calendario",children:"Criar Miss\xe3o"})})]}),(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",width:"100%"},children:[(0,p.jsxs)("div",{className:"topo",children:[(0,p.jsx)("div",{className:"missao",children:"Avi\xe3o"}),W.map((function(e,t){var a=oe.getDate(),s=oe.getMonth()+1;a<=9&&(a="0"+a),s<=9&&(s="0"+s);var n=a+"/"+s+"/"+oe.getFullYear();return(0,p.jsx)("div",{className:"missao",style:{backgroundColor:n==e?"#46a31d":"#000"},children:e})}))]}),(0,p.jsx)("div",{className:"missoes",children:ue.avioes.length>0&&ue.avioes.map((function(e){return(0,p.jsxs)("div",{className:"missao-item",children:[(0,p.jsxs)("div",{className:"IN"==e.situacao?"missao aviao in":"missao aviao",children:[(0,p.jsx)("span",{style:{cursor:"pointer"},onClick:function(){return function(e,t,a,s,n,r,o){Na(a),Ma(s),Aa(e),za(n),Ra(r),qa(t),Va(function(e){var t=e.split("T"),a=(0,i.Z)(t,2),s=a[0],n=a[1],r=s.split("-"),o=(0,i.Z)(r,3),c=o[0],u=o[1],l=o[2],d=n.split(":"),m=(0,i.Z)(d,3),p=m[0],f=m[1];return m[2],l+"/"+u+"/"+c+" - "+p+":"+f}(o)),ya(!0)}(e.aviao,e.id,e.ciclos,e.horas,e.situacao,e.atualizador,e.atualizado)},children:e.aviao}),(0,p.jsxs)("span",{className:"dados-aviao",children:["Situa\xe7\xe3o: ",e.situacao]}),(0,p.jsxs)("span",{className:"dados-aviao",children:["Ciclos: ",e.ciclos]}),(0,p.jsxs)("span",{className:"dados-aviao",children:["Horas: ",e.horas]})]}),W.map((function(t){return(0,p.jsx)("div",{className:"item-missao",children:e.eventos.length>0&&e.eventos.map((function(a){if(a.data==t)return(0,p.jsxs)("div",{onClick:function(){return function(e,t){Tt(!1),_t(!1),U(!0),G(!1);var a=t.missao.id_missao;Bt(a),oa(e.eventos[0].id_documento);var s=(0,o.Z)({},vt),n=[];t.missao.tripulacao.forEach((function(e){n.push(e)}));var r=t.comentarios;aa(r);var i=t.missao.omis;Wt(i),d(n),s.eventos=e.eventos.filter((function(e){if(e.missao.id_missao==a)return e})),console.log(s),ht(s),P(!0),Zt(e.aviao);var c=kt.findIndex((function(t){return t.aeronave==e.aviao}));c>=0&&St(kt[c].id)}(e,a)},className:"missao-white white",onMouseEnter:function(){return function(e,t){O(e);var a=t.tripulacao.map((function(e){return e.trigrama}));C(a.join("/")),fe(t),E(!0)}(a.missao.id,a.missao)},onMouseLeave:ts,children:[T&&I==a.missao.id&&null!=a.missao.id&&(0,p.jsxs)("div",{style:{position:"absolute",top:"100%",left:"0",background:"#000",color:"#fff",padding:"10px",border:"1px solid black",zIndex:1},children:[(0,p.jsxs)("p",{style:{fontSize:"1vw"},children:["OMIS: ",pe.omis]}),(0,p.jsxs)("p",{style:{fontSize:"1vw"},children:["Tripula\xe7\xe3o: ",S]})]}),(0,p.jsxs)("div",{className:"text-missao",children:[a.missao.horaDep," ",a.missao.dep]}),(0,p.jsxs)("div",{className:"text-missao",children:[a.missao.horaPouso," ",a.missao.pouso," "]})]})}))})}))]})}))})]}),(0,p.jsxs)("div",{ref:$a,className:_?"modal-create-visible":"modal-create",children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",margin:10,cursor:"pointer"},children:(0,p.jsx)("div",{onClick:function(){window.confirm("Deseja mesmo sair? Todos os dados adicionados at\xe9 o momento ser\xe3o perdidos")&&(Zs(),P(!1))},style:{color:"#fff"},children:"X"})}),(0,p.jsxs)("div",{className:"criar-div",children:[(0,p.jsxs)("h3",{style:{color:"#fff"},children:[H?"Editar":"Criar"," Miss\xe3o"]}),H?(0,p.jsx)("button",{className:"ver-omis",onClick:vs,children:"Ver OMIS"}):null]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:20,alignItems:"center"},children:[(0,p.jsx)("span",{style:{color:"#fff"},children:"Avi\xe3o:"}),kt.map((function(e){return(0,p.jsx)("button",{onClick:function(){Zt(e.aeronave),St(e.id);var t=(0,o.Z)({},vt);t.aviao=e.aeronave,ht(t)},style:{backgroundColor:jt==e.aeronave?"#28a745":"#FFF",color:jt==e.aeronave?"#fff":"#000"},className:"botao-aviao",children:e.aeronave})}))]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:20,alignItems:"center"},children:[(0,p.jsx)("span",{style:{color:"#fff"},children:"OMIS:"}),(0,p.jsxs)("div",{style:{color:"#fff"},children:[(0,p.jsx)(h,{value:Qt,onChange:Wt,disabled:xa}),xa&&(0,p.jsx)("button",{onClick:function(){return ga(!1)},className:"cumprir",children:"Editar"}),!xa&&(0,p.jsx)("button",{onClick:function(){return ga(!0)},className:"cumprir",children:"Salvar N\xfamero"})]})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:20,alignItems:"center"},children:[(0,p.jsx)("span",{style:{color:"#fff"},children:"OFRAG:"}),(0,p.jsxs)("div",{style:{color:"#fff"},children:[(0,p.jsxs)("select",{id:"select-box",style:{borderRadius:5},value:ra,onChange:function(e){oa(e.target.value)},children:[(0,p.jsx)("option",{value:"",children:"Selecione uma op\xe7\xe3o"}),ua.length>0?ua.map((function(e,t){return(0,p.jsx)("option",{style:{backgroundColor:"#fff"},value:e.id,children:e.numero},t)})):null]}),""==ra||H||it?null:Ft?(0,p.jsx)(w.Z,{}):(0,p.jsx)("button",{onClick:is,className:"cumprir",children:"Cumprir"}),""!=st&&(0,p.jsx)("div",{style:{marginTop:10},class:"alert alert-danger",role:"alert",children:st})]})]}),(0,p.jsxs)("div",{className:"add-etapa",children:[(0,p.jsx)("span",{style:{color:"#fff"},children:"Etapas:"}),(0,p.jsx)("img",{onClick:function(){if(!B&&xe&&ge(!1),!B&&!xe&&(ge(!0),vt.eventos.length>0)){var e=vt.eventos[vt.eventos.length-1].missao.pouso,t=vt.eventos[vt.eventos.length-1].missao.pousoISO;ps(e,t)}B&&G(!1)},style:{cursor:"pointer"},src:"https://www.1gtt.com.br/app/add-white.png",width:20,height:20})]}),(xe||B)&&(0,p.jsxs)("div",{className:"form-area",children:[(0,p.jsxs)("div",{className:"form-add",children:[(0,p.jsx)("span",{style:{color:"#000"},children:"DEP: "}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Pe.toLocaleString([],{year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"})+"Z",(0,p.jsx)("div",{className:"",style:{marginLeft:10},children:(0,p.jsx)(m(),{selected:Pe,timeInputLabel:Pe,onChange:function(e){ze(e)},customInput:(0,p.jsx)(Cs,{}),showTimeSelect:!0,timeFormat:"HH:mm",timeIntervals:10,dateFormat:"LLL",timeZone:"Etc/UTC",timeZoneData:[{value:"Etc/UTC",label:"Zulu (GMT 0)"}]})})]})]}),(0,p.jsxs)("div",{className:"form-add",children:[(0,p.jsx)("span",{style:{color:"#000"},children:"ICAO de Origem: "}),(0,p.jsx)(f,{erro:Ge,maxLength:4,value:be,onChange:ye})]}),(0,p.jsxs)("div",{className:"form-add",children:[(0,p.jsx)("span",{style:{color:"#000"},children:"ICAO de Destino: "}),(0,p.jsx)(f,{ref:Qa,id:"icao-pouso",onKeyPress:as,erro:Xe,maxLength:4,value:Ce,onChange:Ne})]}),(0,p.jsxs)("div",{className:"form-add",children:[(0,p.jsx)("span",{style:{color:"#000"},children:"ICAO de Alternativa: "}),(0,p.jsx)(f,{ref:Wa,onKeyPress:as,erro:$e,maxLength:4,value:Oe,onChange:Me})]}),(0,p.jsxs)("div",{className:"form-add",children:[(0,p.jsx)("span",{style:{color:"#000"},children:"Pouso: "}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Ue.toLocaleString([],{year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"})+"Z",(0,p.jsx)("div",{className:"",style:{marginLeft:10},children:(0,p.jsx)(m(),{selected:Ue,timeInputLabel:Ue,onChange:function(e){Re(e)},customInput:(0,p.jsx)(Cs,{}),showTimeSelect:!0,timeFormat:"HH:mm",timeIntervals:10,dateFormat:"LLL"})})]})]}),(0,p.jsxs)("div",{className:"form-add",children:[(0,p.jsx)("span",{style:{color:"#000"},children:"COMB M\xednimo: "}),(0,p.jsx)(x,{onKeyPress:as,value:pa,onChange:fa})]}),(0,p.jsxs)("div",{className:"botoes-add-etapa",children:[(0,p.jsx)("button",{onClick:function(){ye(""),Ne(""),ze(""),Re(""),ge(!1),G(!1)},className:"cancelar",children:"Cancelar"}),(0,p.jsx)("button",{className:"adicionar",onClick:B?bs:ys,children:B?"Editar":"Adicionar"})]}),""!=Ee&&(0,p.jsx)("div",{style:{marginTop:10},class:"alert alert-danger",role:"alert",children:Ee})]}),vt.eventos.map((function(e,t){return(0,p.jsx)(y,{edit:function(){X(t),G(!0),function(e){var t=(0,o.Z)({},vt).eventos[e];ye(t.missao.dep),Ne(t.missao.pouso),Me(t.missao.alternativa?t.missao.alternativa:""),fa(t.missao.combustivel_minimo?t.missao.combustivel_minimo:0),"string"==typeof t.missao.depISO&&(t.missao.depISO=new Date(t.missao.depISO)),"string"==typeof t.missao.pousoISO&&(t.missao.pousoISO=new Date(t.missao.pousoISO));var a=t.missao.depISO.getTimezoneOffset();if(t.missao.depISO.setMinutes(t.missao.depISO.getMinutes()+a),t.missao.pousoISO){var s=t.missao.pousoISO.getTimezoneOffset();t.missao.pousoISO.setMinutes(t.missao.pousoISO.getMinutes()+s),Re(t.missao.pousoISO)}else ms();ze(t.missao.depISO)}(t),$a.current.scrollTop=0},del:function(){var e=(0,o.Z)({},vt),a=e.eventos.filter((function(e,a){if(a!=t)return e}));e.eventos=a,ht(e)},index:t,dep:e.missao.dep,pouso:e.missao.pouso,alternativa:e.missao.alternativa,horaDep:e.missao.horaDep,horaPouso:e.missao.horaPouso})})),(0,p.jsxs)("div",{className:"add-trip",children:[(0,p.jsx)("span",{style:{color:"#fff"},children:"Tripula\xe7\xe3o:"}),(0,p.jsx)(v,{maxLength:3,value:Yt,onChange:Jt,onKeyPress:ns}),dt&&(0,p.jsx)("div",{style:{marginTop:10},class:"alert alert-danger",role:"alert",children:dt}),(0,p.jsx)("div",{className:"tripulante-row",children:(0,p.jsx)("span",{style:{color:"#fff"},className:"tripulante",children:"Pilotos:"})}),(0,p.jsx)("div",{className:"caixa-tripulante",children:a.map((function(e){if("Piloto"==e.funcao)return(0,p.jsxs)("div",{className:"tripulante-item",children:[e.trigrama,(0,p.jsx)("img",{style:{marginLeft:5,cursor:"pointer"},onClick:function(){return js(e.id)},src:"https://www.1gtt.com.br/app/close.png",width:"15px"})]})}))}),(0,p.jsx)("div",{className:"tripulante-row",children:(0,p.jsx)("span",{style:{color:"#fff"},className:"tripulante",children:"Mec\xe2nicos:"})}),(0,p.jsx)("div",{className:"caixa-tripulante",children:a.map((function(e){if("Mec\xe2nico de Voo"==e.funcao)return(0,p.jsxs)("div",{className:"tripulante-item",children:[e.trigrama,(0,p.jsx)("img",{style:{marginLeft:5,cursor:"pointer"},onClick:function(){return js(e.id)},src:"https://www.1gtt.com.br/app/close.png",width:"15px"})]})}))}),(0,p.jsx)("div",{className:"tripulante-row",children:(0,p.jsx)("span",{style:{color:"#fff"},className:"tripulante",children:"Loadmasters:"})}),(0,p.jsx)("div",{className:"caixa-tripulante",children:a.map((function(e){if("Loadmaster"==e.funcao)return(0,p.jsxs)("div",{className:"tripulante-item",children:[e.trigrama,(0,p.jsx)("img",{style:{marginLeft:5,cursor:"pointer"},onClick:function(){return js(e.id)},src:"https://www.1gtt.com.br/app/close.png",width:"15px"})]})}))}),(0,p.jsx)("div",{className:"tripulante-row",children:(0,p.jsx)("span",{style:{color:"#fff"},className:"tripulante",children:"Comiss\xe1rios:"})}),(0,p.jsx)("div",{className:"caixa-tripulante",children:a.map((function(e){if("Comiss\xe1rio"==e.funcao)return(0,p.jsxs)("div",{className:"tripulante-item",children:[e.trigrama,(0,p.jsx)("img",{style:{marginLeft:5,cursor:"pointer"},onClick:function(){return js(e.id)},src:"https://www.1gtt.com.br/app/close.png",width:"15px"})]})}))}),(0,p.jsx)("div",{className:"tripulante-row",children:(0,p.jsx)("span",{style:{color:"#fff"},className:"tripulante",children:"OE-3:"})}),(0,p.jsx)("div",{className:"caixa-tripulante",children:a.map((function(e){if("O3"==e.funcao)return(0,p.jsxs)("div",{className:"tripulante-item",children:[e.trigrama,(0,p.jsx)("img",{style:{marginLeft:5,cursor:"pointer"},onClick:function(){return js(e.id)},src:"https://www.1gtt.com.br/app/close.png",width:"15px"})]})}))})]}),(0,p.jsxs)("div",{style:{marginTop:30,display:"flex",flexDirection:"column"},children:[(0,p.jsx)("span",{style:{color:"#fff"},children:"Coment\xe1rios: "}),(0,p.jsx)("textarea",{value:ta,onChange:function(e){return aa(e.target.value)},style:{borderRadius:10,padding:5}})]}),(0,p.jsxs)("div",{className:"botoes-add-etapa",style:{marginTop:30},children:[(0,p.jsx)("button",{className:"cancelar",style:{fontSize:"1vw"},onClick:Zs,children:"Limpar"}),Lt?(0,p.jsx)(w.Z,{}):(0,p.jsx)("button",{className:"adicionar",style:{fontSize:"1vw"},onClick:H?xs:fs,children:H?"Editar Miss\xe3o":"Criar Miss\xe3o"})]}),(0,p.jsxs)("div",{className:"botoes-add-etapa",style:{marginTop:30,justifyContent:"center"},children:[Dt&&(0,p.jsx)(w.Z,{}),H?(0,p.jsx)("button",{className:"cancelar",style:{fontSize:"1.3vw"},onClick:gs,children:"Excluir Miss\xe3o"}):(0,p.jsx)(p.Fragment,{})]})]})]}),ba&&(0,p.jsxs)("div",{className:"modal-aviao",children:[(0,p.jsxs)("div",{className:"modal-topo",children:[(0,p.jsx)("div",{className:"nome-aviao",children:(0,p.jsxs)("span",{className:"title-modal",style:{color:"#fff"},children:["FAB ",Ea]})}),(0,p.jsx)("span",{onClick:function(){ya(!1)},className:"title-modal",style:{color:"#fff",cursor:"pointer"},children:"X"})]}),(0,p.jsxs)("div",{className:"modal-body",children:[(0,p.jsxs)("div",{className:"item-body-modal",children:[(0,p.jsx)("span",{className:"text-modal",style:{color:"#fff"},children:"Ciclos:"}),(0,p.jsx)(g,{value:Ca,onChange:Na})]}),(0,p.jsxs)("div",{className:"item-body-modal",children:[(0,p.jsx)("span",{className:"text-modal",style:{color:"#fff"},children:"Horas:"}),(0,p.jsx)(j,{value:Oa,onChange:Ma})]}),(0,p.jsxs)("div",{className:"item-body-modal",children:[(0,p.jsx)("span",{className:"text-modal",style:{color:"#fff"},children:"Situa\xe7\xe3o:"}),(0,p.jsx)("select",{style:{borderRadius:10},value:Pa,onChange:function(e){za(e.target.value)},children:["DI","DO","IN","IS"].map((function(e,t){return(0,p.jsx)("option",{value:e,children:e},t)}))})]}),(0,p.jsx)("div",{className:"item-body-modal",children:(0,p.jsxs)("span",{className:"text-modal",style:{color:"#fff"},children:["Atualizado por: ",Ua]})}),(0,p.jsx)("div",{className:"item-body-modal",children:(0,p.jsxs)("span",{className:"text-modal",style:{color:"#fff"},children:["Em: ",Ga," Z"]})})]}),(0,p.jsx)("div",{className:"modal-bottom",children:(0,p.jsx)("button",{onClick:ws,className:"salvar",children:"Salvar"})})]})]})}}}]);
//# sourceMappingURL=632.95d5b5ad.chunk.js.map