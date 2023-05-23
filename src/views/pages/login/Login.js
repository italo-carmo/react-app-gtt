import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useApi from 'src/services/Api'

const Login = () => {
  let Api = useApi()
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState(null)

  const handleLogin = async () => {
    setMsg(null)
    if(!email || !senha || email == '' || senha == '') {
      setMsg('Todos os campos são obrigatórios')
      return
    }
    let res = await Api.login(email, senha)
    if(res.error) {
      setMsg(res.error)
      return
    } else {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("id", res.data.id)
  
      let res_dados = await Api.getDados()
  
      if(!res_dados.error) {
        localStorage.setItem("funcao", res_dados.data.FuncoesAbordo.nome)
        localStorage.setItem("trigrama", res_dados.data.Trigrama.trigrama)
      }

    }
    

    navigate('/main')
  }


  return (
    <div className="min-vh-100 background">
      <CContainer>
        <CRow className='login'>
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4 loginBody">
                <CCardBody>
                  <CForm>
                    <div className='box-login' style={{display:'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <img style={{marginRight:20}} src="https://www.1gtt.com.br/app/gtt.png" width="30px" height="36px"/>
                      <h1 className='h1-login' style={{color:'#fff'}}>1º GTT</h1>
                      <h3 className='h3-login' style={{color:'#fff'}}>Login</h3>
                    </div>
                    <p style={{color:'#fff',opacity:0.7}} className="">Entre na sua conta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput onChange={(e)=>{setEmail(e.target.value)}} value={email}  placeholder="E-mail" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        value={senha}
                        onChange={(e)=>{setSenha(e.target.value)}}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleLogin} color="primary" className="px-4 background-login">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <a style={{color:'#fff',opacity:0.7}}>
                          Esqueceu a senha?
                        </a>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                {msg && 
                  <div style={{backgroundColor: '#ff0000', padding: 5, borderRadius:5, color:'#fff',display:'flex', alignItems: 'center', justifyContent:'center', opacity:0.8}}>{msg}</div>

                }
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
