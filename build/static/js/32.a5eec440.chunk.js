"use strict";(self.webpackChunkApp_GTT=self.webpackChunkApp_GTT||[]).push([[32],{24032:(t,e,o)=>{o.r(e),o.d(e,{default:()=>i});var n=o(69060),r=o(3084),a=o(36856),s=(o(94412),o(30260)),l=o(82496);const i=()=>{const[t,e]=(0,n.useState)([]),[o,i]=(0,n.useState)([]),[c,d]=(0,n.useState)(!1),[h,u]=(0,n.useState)([]),[g,m]=(0,n.useState)({});let x=["Janeiro","Fevereiro","Mar\xe7o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],f=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];const p=(0,a.c)();const j=t=>{const e=t.split("-");return[parseInt(e[0],10),parseInt(e[1],10)-1,parseInt(e[2],10)]};return(0,n.useEffect)((()=>{(async()=>{let t=await p.getExercicios();if(!t.error){const e=t.data,o=x.map((()=>[]));e.forEach((t=>{const e=new Date(t.data_inicio+"T06:00:00Z"),n=new Date(t.data_fim+"T06:00:00Z"),r=e.getMonth(),a=n.getMonth();for(let s=r;s<=a;s++)o[s].push(t)})),m(o)}})()}),[]),(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(r.u0,{className:"mb-6",style:{flexDirection:"column"},children:[(0,l.jsx)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:(0,l.jsx)("div",{style:{maxWidth:"95%",overflowX:"auto",marginTop:30},children:(0,l.jsxs)("table",{style:{marginBottom:20},children:[(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"M\xeas"}),(0,l.jsx)("th",{children:"Nome"}),f.map((t=>(0,l.jsx)("th",{style:{fontSize:"0.6vw"},children:t})))]}),x.map(((t,e)=>{const o=g[e]||[],r=o.length>0?o.length:1;return o.sort(((t,e)=>new Date(t.data_inicio)-new Date(e.data_inicio))),(0,l.jsxs)(n.Fragment,{children:[o.map(((o,a)=>{let s=function(){let t;do{const e=Math.floor(256*Math.random()),o=Math.floor(256*Math.random()),n=Math.floor(256*Math.random());e+o+n>=384&&(t="#"+((1<<24)+(e<<16)+(o<<8)+n).toString(16).slice(1))}while(!t);return t}(),[i,c,d]=j(o.data_inicio),[h,u,g]=j(o.data_fim);const m=new Date(Date.UTC(i,c,d)),x=new Date(Date.UTC(h,u,g));return(0,l.jsx)(n.Fragment,{children:(0,l.jsxs)("tr",{children:[0===a&&(0,l.jsx)("td",{style:{backgroundColor:"#d6dce9"},rowSpan:r,children:t}),(0,l.jsx)("td",{style:{backgroundColor:s,fontWeight:"bold"},children:o.nome}),f.map((t=>{let n=new Date,r=new Date(Date.UTC(n.getFullYear(),e,t,0,0,0)),a=new Date(Date.UTC(n.getFullYear(),e,t,23,59,59));if(r<=x&&a>=m)var i=!0;return 6==t&&(console.log(o.nome),console.log("Inicio Dia: "+r.toISOString()),console.log(x.toISOString()),console.log("Fim Dia: "+a.toISOString()),console.log(m.toISOString()),console.log(i)),(0,l.jsx)("td",{style:{fontSize:"0.6vw",fontWeight:"bold",backgroundColor:i?s:""},children:i?t:""},t)}))]})},a)})),0===o.length&&(0,l.jsxs)("tr",{children:[(0,l.jsx)("td",{style:{backgroundColor:"#d6dce9"},children:t}),(0,l.jsx)("td",{}),f.map((()=>(0,l.jsx)("td",{})))]})]},e)}))]})})}),c&&(0,l.jsx)("div",{style:{position:"absolute",left:"50%",top:"80%",transform:"translate(-50%, -50%)",zIndex:99},children:(0,l.jsx)(s.c,{black:!0,width:"50px"})})]})})}}}]);
//# sourceMappingURL=32.a5eec440.chunk.js.map