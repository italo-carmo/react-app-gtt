"use strict";(self.webpackChunkApp_GTT=self.webpackChunkApp_GTT||[]).push([[236],{30260:(e,t,a)=>{a.d(t,{c:()=>s});a(69060);var o=a(82496);function s(e){let{black:t=null,width:a="40px"}=e;return(0,o.jsx)("div",{class:"spinner",children:(0,o.jsx)("img",{class:"fas fa-plane",src:t?"https://www.1gtt.com.br/app/rec-black.png":"https://www.1gtt.com.br/app/rec.png",width:a})})}},36856:(e,t,a)=>{a.d(t,{c:()=>s});const o=async function(e,t,a){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;e=e.toLowerCase();let s="".concat("https://servidor-app-gtt.herokuapp.com").concat(t);if(a)var r=JSON.stringify(a);else r=null;let n={"Content-Type":"application/json"};o&&(n.Authorization="Bearer ".concat(o));let l=await fetch(s,{method:e,headers:n,body:r});return await l.json()},s=()=>({getToken:()=>localStorage.getItem("token"),validateToken:async()=>{let e=localStorage.getItem("token");return await o("GET","/users/check/token",null,e)},login:async(e,t)=>await o("POST","/users/login",{email:e,senha:t},null),getDias:async()=>{let e=localStorage.getItem("token");return await o("GET","/comissionamento/dias",null,e)},getHoras:async()=>{let e=localStorage.getItem("token");return await o("GET","/etapas/user/horas/1",null,e)},getDados:async()=>{let e=localStorage.getItem("token");return await o("GET","/users/1",null,e)},getMissoesAvioes:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes/avioes/lista",e,t)},getManutencoesAvioes:async e=>{let t=localStorage.getItem("token");return await o("POST","/manutencoes/datas",e,t)},getMissoesAvioesId:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes/avioes/lista/".concat(e),null,t)},getEsforcoAereo:async e=>{let t=localStorage.getItem("token");return await o("GET","/esforcos",null,t)},getPauDeSebo:async e=>{let t=localStorage.getItem("token");return await o("GET","/etapas/paudesebo",null,t)},getDistanciaAerodromos:async e=>{let t=localStorage.getItem("token");return await o("POST","/coordenadas",e,t)},getAeronaves:async()=>{let e=localStorage.getItem("token");return await o("GET","/aeronaves",null,e)},createMissao:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes",e,t)},createEtapa:async e=>{let t=localStorage.getItem("token");return await o("POST","/etapas",e,t)},getAerodromo:async e=>{let t=localStorage.getItem("token");return await o("GET","/aerodromos/icao/".concat(e),null,t)},deleteMissao:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/missoes/".concat(e),null,t)},updateEtapas:async e=>{let t=localStorage.getItem("token");return await o("PUT","/etapas",e,t)},updateMissao:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes/".concat(t),e,a)},getMissao:async e=>{let t=localStorage.getItem("token");return await o("GET","/missoes/".concat(e),null,t)},getTrigrama:async e=>{let t=localStorage.getItem("token");return await o("GET","/trigramas/dados/".concat(e),null,t)},createEscala:async e=>{let t=localStorage.getItem("token");return await o("POST","/escalas",e,t)},updateEscala:async e=>{let t=localStorage.getItem("token");return await o("PUT","/escalas",e,t)},getOfrags:async()=>{let e=localStorage.getItem("token");return await o("GET","/ofrag",null,e)},getOfrag:async e=>{let t=localStorage.getItem("token");return await o("GET","/ofrag/id/".concat(e),null,t)},getCombMinimo:async e=>{let t=localStorage.getItem("token");return await o("POST","/planejamento/combustivel/aproximado",e,t)},getUltimaMissao:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/ultima/missao",null,e)},updateAeronave:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/aeronaves/".concat(t),e,a)},getObservacoesData:async e=>{let t=localStorage.getItem("token");return await o("POST","/observacoes/dias",e,t)},updateObservacao:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/observacoes/".concat(t),e,a)},createObservacao:async e=>{let t=localStorage.getItem("token");return await o("POST","/observacoes",e,t)},deleteObservacao:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/observacoes/".concat(e),null,t)},createManutencao:async e=>{let t=localStorage.getItem("token");return await o("POST","/manutencoes",e,t)},updateManutencao:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/manutencoes/".concat(t),e,a)},deleteManutencao:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/manutencoes/".concat(e),null,t)},getEtapas:async e=>{let t=localStorage.getItem("token");return await o("POST","/estatistica/paudesebo",e,t)},checkEtapa:async(e,t)=>{let a=localStorage.getItem("token");return await o("POST","/etapas/check/".concat(e),t,a)},getSobreavisos:async e=>{let t=localStorage.getItem("token");return await o("POST","/sobreaviso/data",e,t)},createSobreaviso:async e=>{let t=localStorage.getItem("token");return await o("POST","/sobreaviso",e,t)},updateSobreaviso:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/sobreaviso/".concat(e),t,a)},deleteSobreaviso:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/sobreaviso/".concat(e),null,t)},getEtapaById:async e=>{let t=localStorage.getItem("token");return await o("GET","/etapas/getbyid/".concat(e),null,t)},getPermissoes:async()=>{let e=localStorage.getItem("token");return await o("GET","/permissoes_usuarios/minhas",null,e)},getMissoesRevisar:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/revisar/lista",null,e)},getPernoitesMissao:async e=>{let t=localStorage.getItem("token");return await o("GET","/pernoites/missao/".concat(e),null,t)},getMeiasDiariasMissao:async e=>{let t=localStorage.getItem("token");return await o("GET","/meias-diarias/missao/".concat(e),null,t)},revisarOm:async e=>{let t=localStorage.getItem("token");return await o("GET","/missoes/revisar/om/".concat(e),null,t)},retornarOm:async(e,t)=>{let a=localStorage.getItem("token");return await o("POST","/missoes/retornar/om/".concat(e),t,a)},retornarMissaoRevisao:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes/retornar/revisao/om/".concat(e),null,t)},finalizarOm:async e=>{let t=localStorage.getItem("token");return await o("GET","/missoes/finalizar/".concat(e),null,t)},getFeriasSolicitadas:async()=>{let e=localStorage.getItem("token");return await o("GET","/ferias/get/solicitadas",null,e)},getPauDeSebo:async e=>{let t=localStorage.getItem("token");return await o("POST","/estatistica/paudesebo/tripulantes",e,t)},getRascunhos:async e=>{let t=localStorage.getItem("token");return await o("POST","/rascunhos/data",e,t)},createRascunho:async e=>{let t=localStorage.getItem("token");return await o("POST","/rascunhos/",e,t)},editRascunho:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/rascunhos/".concat(e),t,a)},excluirRascunho:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/rascunhos/".concat(e),null,t)},getMissoesLancarQuadrinhos:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/lancar/quadrinhos",null,e)},getMissoesLancadasQuadrinhos:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes/lancar/quadrinhos/lancadas",null,e)},getQuadrinhos:async()=>{let e=localStorage.getItem("token");return await o("GET","/quadrinhos/lista/get/all",null,e)},updateQuadrinho:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes/quadrinho/".concat(e),t,a)},getListaQuadrinhoFuncao:async e=>{let t=localStorage.getItem("token");return await o("POST","/quadrinhos/lista/funcao",e,t)},getManobras:async()=>{let e=localStorage.getItem("token");return await o("GET","/manobras",null,e)},createManobra:async e=>{let t=localStorage.getItem("token");return await o("POST","/manobras",e,t)},createManobraUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/manobras/users",e,t)},excluirManobra:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/manobras/".concat(e),null,t)},editManobra:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/manobras/".concat(e),t,a)},editManobraUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/manobras/usuarios/".concat(e),t,a)},getQuadrinhosManobras:async e=>{let t=localStorage.getItem("token");return await o("POST","/manobras/quadrinhos/user",e,t)},getMissoesExterior:async()=>{let e=localStorage.getItem("token");return await o("GET","/missoes-exterior",null,e)},createMissaoExterior:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes-exterior",e,t)},createMissaoExteriorUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes-exterior/users",e,t)},getListaQuadrinhoFuncaoExterior:async e=>{let t=localStorage.getItem("token");return await o("POST","/missoes-exterior/quadrinhos/lista",e,t)},editMissaoExterior:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes-exterior/".concat(e),t,a)},editMissaoExteriorUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/missoes-exterior/usuarios/".concat(e),t,a)},excluirMissaoExterior:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/missoes-exterior/".concat(e),null,t)},getTurmas:async e=>{let t=localStorage.getItem("token");return await o("GET","/users/lista/turma",e,t)},updateTurma:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/users/turma/".concat(e),t,a)},updateDataOperacional:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/users/data-operacional/".concat(e),t,a)},getIndisponibilidadesData:async e=>{let t=localStorage.getItem("token");return await o("POST","/indisponibilidades/data",e,t)},getSubprogramas:async()=>{let e=localStorage.getItem("token");return await o("GET","/subprogramas",null,e)},getFases:async e=>{let t=localStorage.getItem("token");return await o("GET","/fases/".concat(e),null,t)},filterUsers:async e=>{let t=localStorage.getItem("token");return await o("GET","/cois/filter/users/".concat(e),null,t)},getUsersOperacionalidades:async()=>{let e=localStorage.getItem("token");return await o("GET","/users/lista/operacionalidades",null,e)},updateOperacionalidade:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/users/operacionalidade/".concat(e),t,a)},getOperacionalidades:async()=>{let e=localStorage.getItem("token");return await o("GET","/operacionalidades",null,e)},getCois:async()=>{let e=localStorage.getItem("token");return await o("GET","/cois",null,e)},getProgramas:async()=>{let e=localStorage.getItem("token");return await o("GET","/programas",null,e)},getSubProgramas:async e=>{let t=localStorage.getItem("token");return await o("GET","/subprogramas/".concat(e),null,t)},getFuncoes:async()=>{let e=localStorage.getItem("token");return await o("GET","/funcoes_a_bordo",null,e)},getFases:async e=>{let t=localStorage.getItem("token");return await o("GET","/fases/".concat(e),null,t)},createCoi:async e=>{let t=localStorage.getItem("token");return await o("POST","/cois",e,t)},createCoiUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/coisusers",e,t)},createCoiFases:async e=>{let t=localStorage.getItem("token");return await o("POST","/coisfases",e,t)},deleteCoi:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/cois/".concat(e),null,t)},updateCoi:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/cois/".concat(e),t,a)},updateCoiUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/coisusers/".concat(e),t,a)},updateCoiFases:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/coisfases/".concat(e),t,a)},getEsforcos:async()=>{let e=localStorage.getItem("token");return await o("GET","/esforcos/lista/quantidade",null,e)},getQuadrinhosSobreaviso:async e=>{let t=localStorage.getItem("token");return await o("POST","/sobreaviso/quadrinhos/user",e,t)},getPlanejamento:async e=>{let t=localStorage.getItem("token");return await o("POST","/planejamento/lista",e,t)},getNotam:async e=>{let t=localStorage.getItem("token");return await o("POST","/notam",e,t)},ocultarAnv:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/aeronaves/oculta/".concat(e),t,a)},getExercicios:async()=>{let e=localStorage.getItem("token");return await o("GET","/exercicios",null,e)},createExercicio:async e=>{let t=localStorage.getItem("token");return await o("POST","/exercicios",e,t)},createExercicioUsuarios:async e=>{let t=localStorage.getItem("token");return await o("POST","/exercicios/users",e,t)},excluirExercicio:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/exercicios/".concat(e),null,t)},editExercicio:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/exercicios/".concat(e),t,a)},editExercicioUsuarios:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/exercicios/usuarios/".concat(e),t,a)},deleteExercicio:async e=>{let t=localStorage.getItem("token");return await o("DELETE","/exercicios/".concat(e),null,t)},getExerciciosData:async e=>{let t=localStorage.getItem("token");return await o("POST","/exercicios/data",e,t)},updateExercicio:async(e,t)=>{let a=localStorage.getItem("token");return await o("PUT","/exercicios/".concat(e),t,a)}})},19236:(e,t,a)=>{a.r(t),a.d(t,{default:()=>n});a(69060),a(3084);var o=a(36856),s=(a(30260),a(51560)),r=a(82496);const n=e=>{let{match:t}=e;(0,o.c)();const a=(0,s.IT)(),n=new URLSearchParams(a.search).get("dados"),l=JSON.parse(decodeURIComponent(n));if(console.log(l),l){var c=l.aviao,i=l.data,g=(l.hora,l.etapas[0].dep),u=l.etapas[0].pouso,d=new Date(l.etapas[0].depIso);var m=new Intl.DateTimeFormat("pt-BR",{hour:"2-digit",minute:"2-digit"}).format(d),S=l.omis,T=l.tripulacao}else c="",i="",g="",u="",m="",S="",T=[];return(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)("div",{className:"topo",children:[(0,r.jsx)("div",{className:"topo-left",children:(0,r.jsx)("span",{className:"solicitante",children:"Solicitante/Comandante da Aeronave."})}),(0,r.jsxs)("div",{className:"topo-center",children:[(0,r.jsx)("span",{className:"titulo",children:"COMANDO DA AERON\xc1UTICA"}),(0,r.jsx)("span",{className:"titulo",children:"GRUPAMENTO DE APOIO DE AN\xc1POLIS"}),(0,r.jsx)("span",{className:"titulo",children:"SE\xc7\xc3O DE SUBSIST\xcaNCIA"})]}),(0,r.jsx)("div",{className:"topo-right",children:(0,r.jsx)("span",{className:"solicitante",children:"Chefe da SUB"})})]}),(0,r.jsxs)("div",{className:"center",children:[(0,r.jsx)("div",{className:"topo-center",children:(0,r.jsx)("span",{className:"titulo",children:(0,r.jsx)("u",{children:"Requisi\xe7\xe3o de Lanche de Bordo/Apoio"})})}),(0,r.jsxs)("div",{className:"topo-center-dois",children:[(0,r.jsx)("div",{className:"topo-center-left",children:(0,r.jsxs)("ol",{children:[(0,r.jsx)("li",{children:"MISS\xc3O: TRANSPORTE AERO LOG\xcdSTICO"}),(0,r.jsxs)("li",{children:["AERONAVE TIPO: KC-390 MATR\xcdCULA: ",c]}),(0,r.jsx)("li",{children:"ORGANIZA\xc7\xc3O MILITAR DA ANV/VTR: 1\xbaGTT"}),(0,r.jsxs)("li",{children:["DATA DA MISS\xc3O: ",i]}),(0,r.jsxs)("li",{children:["HORA DA DECOLAGEM/PARTIDA: ",m," H"]}),(0,r.jsxs)("li",{children:["PROCED\xcaNCIA: ",g]}),(0,r.jsxs)("li",{children:["DESTINO: ",u]}),(0,r.jsx)("li",{children:"TIPO DE LANCHE (preenchimento da SUB):"}),(0,r.jsx)("li",{children:"VALOR DO LANCHE (preenchimento da SUB):"}),(0,r.jsx)("li",{children:"DURA\xc7\xc3O DO V\xd4O: 03H00MIN"}),(0,r.jsxs)("li",{children:["N\xb0 DA ORDEM DE MISS\xc3O: ",S," 1GTT"]})]})}),(0,r.jsxs)("div",{className:"topo-center-right",children:[(0,r.jsxs)("table",{className:"borda-tabela",children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"MATERIAL"}),(0,r.jsx)("th",{children:"QTD"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"\xc1GUA"}),(0,r.jsxs)("td",{children:[T.length," GARRAFAS"]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"GELO"}),(0,r.jsx)("td",{children:"-"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"CAF\xc9"}),(0,r.jsx)("td",{children:"2,5 LITROS"})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"COPOS"}),(0,r.jsxs)("td",{children:[2*T.length," UNIDADES"]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"TALHERES"}),(0,r.jsxs)("td",{children:[2*T.length," UNIDADES"]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"GUARDANAPOS"}),(0,r.jsx)("td",{children:"1 PACOTE"})]})]}),(0,r.jsxs)("div",{className:"quantidades",children:[(0,r.jsxs)("span",{children:["QTD LANCHES: ",T.length]}),(0,r.jsxs)("span",{children:["QTD REFEI\xc7\xd5ES (CONGELADAS): ",T.length]})]})]})]}),(0,r.jsx)("div",{className:"tripulantes",children:(0,r.jsxs)("table",{className:"borda-tabela",children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"POSTO/GRAD"}),(0,r.jsx)("th",{children:"NOME COMPLETO"}),(0,r.jsx)("th",{children:"UNIDADE"})]}),T.map((e=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:e.posto}),(0,r.jsx)("td",{children:e.nome_completo}),(0,r.jsx)("td",{children:"1\xba GTT"})]})))]})}),(0,r.jsxs)("div",{className:"data",children:[(0,r.jsx)("span",{children:"Data da Retirada: _____/_____/_____"}),(0,r.jsx)("span",{className:"responsavel",children:"Respons\xe1vel:_______________________"})]})]})]})}}}]);
//# sourceMappingURL=236.ff4abaa5.chunk.js.map