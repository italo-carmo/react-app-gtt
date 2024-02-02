"use strict";(self.webpackChunkApp_GTT=self.webpackChunkApp_GTT||[]).push([[680],{36856:(e,t,a)=>{a.d(t,{c:()=>r});const o=async function(e,t,a){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e=e.toLowerCase();let r="".concat("https://servidor-app-gtt.herokuapp.com").concat(t);if(a)var n=JSON.stringify(a);else n=null;let s={"Content-Type":"application/json"};o&&(s.Authorization="Bearer ".concat(o));let l=await fetch(r,{method:e,headers:s,body:n});return await l.json()},r=()=>({getToken:()=>localStorage.getItem("token"),validateToken:async()=>{let e=localStorage.getItem("token");return await o("GET","/users/check/token",null,e)},login:async(e,t)=>await o("POST","/users/login",{email:e,senha:t},null),getDias:async()=>{let e=localStorage.getItem("token");return await o("GET","/comissionamento/dias",null,e)},getHoras:async()=>{let e=localStorage.getItem("token");return await o("GET","/etapas/user/horas/1",null,e)},getDados:async()=>{let e=localStorage.getItem("token");return await o("GET","/users/1",null,e)},getMissoesAvioes:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes/avioes/lista",e,t)},getManutencoesAvioes:async e=>{let t=localStorage.getItem("token");return await o("POST","/manutencoes/datas",e,t)},getMissoesAvioesId:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes/avioes/lista/".concat(e),null,t)},getEsforcoAereo:async e=>{let t=localStorage.getItem("token");return await o("GET","/esforcos",null,t)},getPauDeSebo:async e=>{let t=localStorage.getItem("token");return await o("GET","/etapas/paudesebo",null,t)},getDistanciaAerodromos:async e=>{let t=localStorage.getItem("token");return await o("POST","/coordenadas",e,t)},getAeronaves:async()=>{let e=localStorage.getItem("token");return await o("GET","/aeronaves",null,e)},createMissao:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes",e,t)},createEtapa:async e=>{let t=localStorage.getItem("token");return await o("POST","/etapas",e,t)},getAerodromo:async e=>{let t=localStorage.getItem("token");return await o("GET","/aerodromos/icao/".concat(e),null,t)},deleteMissao:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/missoes/".concat(e),null,t)},updateEtapas:async e=>{let t=localStorage.getItem("token");return await o("PUT","/etapas",e,t)},updateMissao:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes/".concat(t),e,a)},getMissao:async e=>{let t=localStorage.getItem("token");return await o("GET","/missoes/".concat(e),null,t)},getTrigrama:async e=>{let t=localStorage.getItem("token");return await o("GET","/trigramas/dados/".concat(e),null,t)},createEscala:async e=>{let t=localStorage.getItem("token");return await o("POST","/escalas",e,t)},updateEscala:async e=>{let t=localStorage.getItem("token");return await o("PUT","/escalas",e,t)},getOfrags:async()=>{let e=localStorage.getItem("token");return await o("GET","/ofrag",null,e)},getOfrag:async e=>{let t=localStorage.getItem("token");return await o("GET","/ofrag/id/".concat(e),null,t)},getCombMinimo:async e=>{let t=localStorage.getItem("token");return await o("POST","/planejamento/combustivel/aproximado",e,t)},getUltimaMissao:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/ultima/missao",null,e)},updateAeronave:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/aeronaves/".concat(t),e,a)},getObservacoesData:async e=>{let t=localStorage.getItem("token");return await o("POST","/observacoes/dias",e,t)},updateObservacao:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/observacoes/".concat(t),e,a)},createObservacao:async e=>{let t=localStorage.getItem("token");return await o("POST","/observacoes",e,t)},deleteObservacao:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/observacoes/".concat(e),null,t)},createManutencao:async e=>{let t=localStorage.getItem("token");return await o("POST","/manutencoes",e,t)},updateManutencao:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/manutencoes/".concat(t),e,a)},deleteManutencao:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/manutencoes/".concat(e),null,t)},getEtapas:async e=>{let t=localStorage.getItem("token");return await o("POST","/estatistica/paudesebo",e,t)},checkEtapa:async(e,t)=>{let a=localStorage.getItem("token");return await o("POST","/etapas/check/".concat(e),t,a)},getSobreavisos:async e=>{let t=localStorage.getItem("token");return await o("POST","/sobreaviso/data",e,t)},createSobreaviso:async e=>{let t=localStorage.getItem("token");return await o("POST","/sobreaviso",e,t)},updateSobreaviso:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/sobreaviso/".concat(e),t,a)},deleteSobreaviso:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/sobreaviso/".concat(e),null,t)},getEtapaById:async e=>{let t=localStorage.getItem("token");return await o("GET","/etapas/getbyid/".concat(e),null,t)},getPermissoes:async()=>{let e=localStorage.getItem("token");return await o("GET","/permissoes_usuarios/minhas",null,e)},getMissoesRevisar:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/revisar/lista",null,e)},getPernoitesMissao:async e=>{let t=localStorage.getItem("token");return await o("GET","/pernoites/missao/".concat(e),null,t)},getMeiasDiariasMissao:async e=>{let t=localStorage.getItem("token");return await o("GET","/meias-diarias/missao/".concat(e),null,t)},revisarOm:async e=>{let t=localStorage.getItem("token");return await o("GET","/missoes/revisar/om/".concat(e),null,t)},retornarOm:async(e,t)=>{let a=localStorage.getItem("token");return await o("POST","/missoes/retornar/om/".concat(e),t,a)},retornarMissaoRevisao:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes/retornar/revisao/om/".concat(e),null,t)},finalizarOm:async e=>{let t=localStorage.getItem("token");return await o("GET","/missoes/finalizar/".concat(e),null,t)},getFeriasSolicitadas:async()=>{let e=localStorage.getItem("token");return await o("GET","/ferias/get/solicitadas",null,e)},getPauDeSebo:async e=>{let t=localStorage.getItem("token");return await o("POST","/estatistica/paudesebo/tripulantes",e,t)},getRascunhos:async e=>{let t=localStorage.getItem("token");return await o("POST","/rascunhos/data",e,t)},createRascunho:async e=>{let t=localStorage.getItem("token");return await o("POST","/rascunhos/",e,t)},editRascunho:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/rascunhos/".concat(e),t,a)},excluirRascunho:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/rascunhos/".concat(e),null,t)},getMissoesLancarQuadrinhos:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/lancar/quadrinhos",null,e)},getMissoesLancadasQuadrinhos:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/lancar/quadrinhos/lancadas",null,e)},getQuadrinhos:async()=>{let e=localStorage.getItem("token");return await o("GET","/quadrinhos/lista/get/all",null,e)},updateQuadrinho:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes/quadrinho/".concat(e),t,a)},getListaQuadrinhoFuncao:async e=>{let t=localStorage.getItem("token");return await o("POST","/quadrinhos/lista/funcao",e,t)},getManobras:async()=>{let e=localStorage.getItem("token");return await o("GET","/manobras",null,e)},createManobra:async e=>{let t=localStorage.getItem("token");return await o("POST","/manobras",e,t)},createManobraUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/manobras/users",e,t)},excluirManobra:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/manobras/".concat(e),null,t)},editManobra:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/manobras/".concat(e),t,a)},editManobraUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/manobras/usuarios/".concat(e),t,a)},getQuadrinhosManobras:async e=>{let t=localStorage.getItem("token");return await o("POST","/manobras/quadrinhos/user",e,t)},getMissoesExterior:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes-exterior",null,e)},createMissaoExterior:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes-exterior",e,t)},createMissaoExteriorUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes-exterior/users",e,t)},getListaQuadrinhoFuncaoExterior:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes-exterior/quadrinhos/lista",e,t)},editMissaoExterior:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes-exterior/".concat(e),t,a)},editMissaoExteriorUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes-exterior/usuarios/".concat(e),t,a)},excluirMissaoExterior:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/missoes-exterior/".concat(e),null,t)},getTurmas:async e=>{let t=localStorage.getItem("token");return await o("GET","/users/lista/turma",e,t)},updateTurma:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/users/turma/".concat(e),t,a)},updateDataOperacional:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/users/data-operacional/".concat(e),t,a)},getIndisponibilidadesData:async e=>{let t=localStorage.getItem("token");return await o("POST","/indisponibilidades/data",e,t)},getSubprogramas:async()=>{let e=localStorage.getItem("token");return await o("GET","/subprogramas",null,e)},getFases:async e=>{let t=localStorage.getItem("token");return await o("GET","/fases/".concat(e),null,t)},filterUsers:async e=>{let t=localStorage.getItem("token");return await o("GET","/cois/filter/users/".concat(e),null,t)},getUsersOperacionalidades:async()=>{let e=localStorage.getItem("token");return await o("GET","/users/lista/operacionalidades",null,e)},updateOperacionalidade:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/users/operacionalidade/".concat(e),t,a)},getOperacionalidades:async()=>{let e=localStorage.getItem("token");return await o("GET","/operacionalidades",null,e)},getCois:async()=>{let e=localStorage.getItem("token");return await o("GET","/cois",null,e)},getProgramas:async()=>{let e=localStorage.getItem("token");return await o("GET","/programas",null,e)},getSubProgramas:async e=>{let t=localStorage.getItem("token");return await o("GET","/subprogramas/".concat(e),null,t)},getFuncoes:async()=>{let e=localStorage.getItem("token");return await o("GET","/funcoes_a_bordo",null,e)},getFases:async e=>{let t=localStorage.getItem("token");return await o("GET","/fases/".concat(e),null,t)},createCoi:async e=>{let t=localStorage.getItem("token");return await o("POST","/cois",e,t)},createCoiUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/coisusers",e,t)},createCoiFases:async e=>{let t=localStorage.getItem("token");return await o("POST","/coisfases",e,t)},deleteCoi:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/cois/".concat(e),null,t)},updateCoi:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/cois/".concat(e),t,a)},updateCoiUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/coisusers/".concat(e),t,a)},updateCoiFases:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/coisfases/".concat(e),t,a)},getEsforcos:async()=>{let e=localStorage.getItem("token");return await o("GET","/esforcos/lista/quantidade",null,e)},getQuadrinhosSobreaviso:async e=>{let t=localStorage.getItem("token");return await o("POST","/sobreaviso/quadrinhos/user",e,t)},getPlanejamento:async e=>{let t=localStorage.getItem("token");return await o("POST","/planejamento/lista",e,t)},getNotam:async e=>{let t=localStorage.getItem("token");return await o("POST","/notam",e,t)}})},70680:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var o=a(69060),r=a(51560),n=a(3084),s=a(37944),l=a(70464),c=a(1180),i=a(36856),g=a(82496);const u=()=>{let e=(0,i.c)(),t=(0,r.i6)();const[a,u]=(0,o.useState)(""),[m,S]=(0,o.useState)(""),[d,y]=(0,o.useState)(null);return(0,g.jsx)("div",{className:"min-vh-100 background",children:(0,g.jsx)(n.MG,{children:(0,g.jsx)(n.AX,{className:"login",children:(0,g.jsx)(n.oV,{md:4,children:(0,g.jsx)(n.oT,{children:(0,g.jsxs)(n.u0,{className:"p-4 loginBody",children:[(0,g.jsx)(n.Yj,{children:(0,g.jsxs)(n.YR,{children:[(0,g.jsxs)("div",{className:"box-login",style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,g.jsx)("img",{style:{marginRight:20},src:"https://www.1gtt.com.br/app/gtt.png",width:"30px",height:"36px"}),(0,g.jsx)("h1",{className:"h1-login",style:{color:"#fff"},children:"1\xba GTT"}),(0,g.jsx)("h3",{className:"h3-login",style:{color:"#fff"},children:"Login"})]}),(0,g.jsx)("p",{style:{color:"#fff",opacity:.7},className:"",children:"Entre na sua conta"}),(0,g.jsxs)(n.wv,{className:"mb-3",children:[(0,g.jsx)(n.AN,{children:(0,g.jsx)(s.c,{icon:l.a})}),(0,g.jsx)(n.Ip,{onChange:e=>{u(e.target.value)},value:a,placeholder:"E-mail",autoComplete:"username"})]}),(0,g.jsxs)(n.wv,{className:"mb-4",children:[(0,g.jsx)(n.AN,{children:(0,g.jsx)(s.c,{icon:c.S})}),(0,g.jsx)(n.Ip,{type:"password",placeholder:"Senha",autoComplete:"current-password",value:m,onChange:e=>{S(e.target.value)}})]}),(0,g.jsxs)(n.AX,{children:[(0,g.jsx)(n.oV,{xs:6,children:(0,g.jsx)(n.uE,{onClick:async()=>{if(y(null),!a||!m||""==a||""==m)return void y("Todos os campos s\xe3o obrigat\xf3rios");let o=await e.login(a,m);if(o.error)y(o.error);else{{localStorage.setItem("token",o.data.token),localStorage.setItem("id",o.data.id);let t=await e.getDados();t.error||(localStorage.setItem("funcao",t.data.FuncoesAbordo.nome),localStorage.setItem("trigrama",t.data.Trigrama.trigrama))}t("/main")}},color:"primary",className:"px-4 background-login",children:"Login"})}),(0,g.jsx)(n.oV,{xs:6,className:"text-right",children:(0,g.jsx)("a",{style:{color:"#fff",opacity:.7},children:"Esqueceu a senha?"})})]})]})}),d&&(0,g.jsx)("div",{style:{backgroundColor:"#ff0000",padding:5,borderRadius:5,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",opacity:.8},children:d})]})})})})})})}},1180:(e,t,a)=>{a.d(t,{S:()=>o});var o=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z' class='ci-primary'/>"]},70464:(e,t,a)=>{a.d(t,{a:()=>o});var o=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"]}}]);
//# sourceMappingURL=680.503fa7c8.chunk.js.map