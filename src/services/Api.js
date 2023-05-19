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
    }
}