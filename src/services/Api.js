const baseUrl = 'https://servidor-app-gtt.herokuapp.com'

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
    }
}