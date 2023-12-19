const baseUrl = 'https://servidor-app-gtt.herokuapp.com'

//https://servidor-app-gtt.herokuapp.com

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase()
    let fullUrl = `${baseUrl}${endpoint}`
    if(params) {
        var body = JSON.stringify(params)
    }else {
        var body = null
    }
    

    let headers = {'Content-Type': 'application/json'}
    if(token) {
        headers.Authorization = `Bearer ${token}`
    }
    let req = await fetch(fullUrl, {method, headers, body})
    let json = await req.json()
    return json
}

export default () => {
    return {
        getToken: () => {
            return localStorage.getItem('token')
        },
        validateToken: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/users/check/token' , null, token)
            return json
        },
        login: async (email, senha) => {
            let json = await request('POST', '/users/login', {email, senha}, null)
            return json
        },
        getDias: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/comissionamento/dias' , null, token)
            return json
        },
        getHoras: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/etapas/user/horas/1' , null, token)
            return json
        },
        getDados: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/users/1' , null, token)
            return json
        },
        getMissoesAvioes: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/missoes/avioes/lista' , body, token)
            return json
        },
        getManutencoesAvioes: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/manutencoes/datas' , body, token)
            return json
        },
        getMissoesAvioesId: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/missoes/avioes/lista/${id}` , null, token)
            return json
        },
        getEsforcoAereo: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/esforcos' , null, token)
            return json
        },
        getPauDeSebo: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/etapas/paudesebo' , null, token)
            return json
        },
        getDistanciaAerodromos: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/coordenadas' , body, token)
            return json
        },
        getAeronaves: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/aeronaves' , null, token)
            return json
        },
        createMissao: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/missoes' , body, token)
            return json
        },
        createEtapa: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/etapas' , body, token)
            return json
        },
        getAerodromo: async (icao) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/aerodromos/icao/${icao}` , null, token)
            return json
        },
        deleteMissao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/missoes/${id}` , null, token)
            return json
        },
        updateEtapas: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/etapas` , body, token)
            return json
        },
        updateMissao: async (body, id) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/missoes/${id}` , body, token)
            return json
        },
        getMissao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes/${id}` , null, token)
            return json
        },
        getTrigrama: async (trigrama) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/trigramas/dados/${trigrama}` , null, token)
            return json
        },
        createEscala: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/escalas' , body, token)
            return json
        },
        updateEscala: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', '/escalas' , body, token)
            return json
        },
        getOfrags: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/ofrag` , null, token)
            return json
        },
        getOfrag: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/ofrag/id/${id}` , null, token)
            return json
        },
        getCombMinimo: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/planejamento/combustivel/aproximado' , body, token)
            return json
        },
        getUltimaMissao: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/missoes/ultima/missao' , null, token)
            return json
        },
        updateAeronave: async (body, id) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/aeronaves/${id}` , body, token)
            return json
        },
        getObservacoesData: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/observacoes/dias' , body, token)
            return json
        },
        updateObservacao: async (body, id) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/observacoes/${id}` , body, token)
            return json
        },
        createObservacao: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/observacoes' , body, token)
            return json
        },
        deleteObservacao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/observacoes/${id}` , null, token)
            return json
        },
        createManutencao: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/manutencoes' , body, token)
            return json
        },
        updateManutencao: async (body, id) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/manutencoes/${id}` , body, token)
            return json
        },
        deleteManutencao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/manutencoes/${id}` , null, token)
            return json
        },
        getEtapas: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', '/estatistica/paudesebo' , null, token)
            return json
        },
        checkEtapa: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/etapas/check/${id}` , body, token)
            return json
        },
        getSobreavisos: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/sobreaviso/data' , body, token)
            return json
        },
        createSobreaviso: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', '/sobreaviso' , body, token)
            return json
        },
        updateSobreaviso: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/sobreaviso/${id}` , body, token)
            return json
        },
        deleteSobreaviso: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/sobreaviso/${id}` , null, token)
            return json
        },
        getEtapaById: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/etapas/getbyid/${id}` , null, token)
            return json
        },
        getPermissoes: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/permissoes_usuarios/minhas` , null, token)
            return json
        },
        getMissoesRevisar: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes/revisar/lista` , null, token)
            return json
        },
        getPernoitesMissao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/pernoites/missao/${id}` , null, token)
            return json
        },
        getMeiasDiariasMissao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/meias-diarias/missao/${id}` , null, token)
            return json
        },
        revisarOm: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes/revisar/om/${id}` , null, token)
            return json
        },
        retornarOm: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/missoes/retornar/om/${id}`, body, token)
            return json
        },
        retornarMissaoRevisao: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/missoes/retornar/revisao/om/${id}` , null, token)
            return json
        },
        finalizarOm: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes/finalizar/${id}` , null, token)
            return json
        },
        getFeriasSolicitadas: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/ferias/get/solicitadas` , null, token)
            return json
        },
        getPauDeSebo: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/estatistica/paudesebo/tripulantes` , body, token)
            return json
        },
        getRascunhos: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/rascunhos/data` , body, token)
            return json
        },
        createRascunho: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/rascunhos/` , body, token)
            return json
        },
        editRascunho: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/rascunhos/${id}` , body, token)
            return json
        },
        excluirRascunho: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/rascunhos/${id}` , null, token)
            return json
        },
        getMissoesLancarQuadrinhos: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes/lancar/quadrinhos` , null, token)
            return json
        },
        getMissoesLancadasQuadrinhos: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes/lancar/quadrinhos/lancadas` , null, token)
            return json
        },
        getQuadrinhos: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/quadrinhos/lista/get/all` , null, token)
            return json
        },
        updateQuadrinho: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/missoes/quadrinho/${id}` , body, token)
            return json
        },
        getListaQuadrinhoFuncao: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/quadrinhos/lista/funcao` , body, token)
            return json
        },
        getManobras: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/manobras` , null, token)
            return json
        },
        createManobra: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/manobras` , body, token)
            return json
        },
        createManobraUsuarios: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/manobras/users` , body, token)
            return json
        },
        excluirManobra: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/manobras/${id}` , null, token)
            return json
        },
        editManobra: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/manobras/${id}` , body, token)
            return json
        },
        editManobraUsuarios: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/manobras/usuarios/${id}` , body, token)
            return json
        },
        getQuadrinhosManobras: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/manobras/quadrinhos/user` , body, token)
            return json
        },
        getMissoesExterior: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/missoes-exterior` , null, token)
            return json
        },
        createMissaoExterior: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/missoes-exterior` , body, token)
            return json
        },
        createMissaoExteriorUsuarios: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/missoes-exterior/users` , body, token)
            return json
        },
        getListaQuadrinhoFuncaoExterior: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/missoes-exterior/quadrinhos/lista` , body, token)
            return json
        },

        editMissaoExterior: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/missoes-exterior/${id}` , body, token)
            return json
        },
        editMissaoExteriorUsuarios: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/missoes-exterior/usuarios/${id}` , body, token)
            return json
        },
        excluirMissaoExterior: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/missoes-exterior/${id}` , null, token)
            return json
        },
        getTurmas: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/users/lista/turma` , body, token)
            return json
        },
        updateTurma: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/users/turma/${id}` , body, token)
            return json
        },
        updateDataOperacional: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/users/data-operacional/${id}` , body, token)
            return json
        },
        getIndisponibilidadesData: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/indisponibilidades/data` , body, token)
            return json
        },

        getSubprogramas: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/subprogramas` , null, token)
            return json
        },

        getFases: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/fases/${id}` , null, token)
            return json
        },
        filterUsers: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/cois/filter/users/${id}` , null, token)
            return json
        },
        getUsersOperacionalidades: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/users/lista/operacionalidades` , null, token)
            return json
        },
        updateOperacionalidade: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/users/operacionalidade/${id}` , body, token)
            return json
        },
        getOperacionalidades: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/operacionalidades` , null, token)
            return json
        },
        getCois: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/cois` , null, token)
            return json
        },
        getProgramas: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/programas` , null, token)
            return json
        },
        getSubProgramas: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/subprogramas/${id}` , null, token)
            return json
        },
        getFuncoes: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/funcoes_a_bordo` , null, token)
            return json
        },
        getFases: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/fases/${id}` , null, token)
            return json
        },

        createCoi: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/cois` , body, token)
            return json
        },
        createCoiUsuarios: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/coisusers` , body, token)
            return json
        },
        createCoiFases: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/coisfases` , body, token)
            return json
        },
        deleteCoi: async (id) => {
            let token = localStorage.getItem('token')
            let json = await request('DELETE', `/cois/${id}` , null, token)
            return json
        },

        updateCoi: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/cois/${id}` , body, token)
            return json
        },
        updateCoiUsuarios: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/coisusers/${id}` , body, token)
            return json
        },
        updateCoiFases: async (id, body) => {
            let token = localStorage.getItem('token')
            let json = await request('PUT', `/coisfases/${id}` , body, token)
            return json
        },
        getEsforcos: async () => {
            let token = localStorage.getItem('token')
            let json = await request('GET', `/esforcos/lista/quantidade` , null, token)
            return json
        },
        getQuadrinhosSobreaviso: async (body) => {
            let token = localStorage.getItem('token')
            let json = await request('POST', `/sobreaviso/quadrinhos/user` , body, token)
            return json
        },
    }

}