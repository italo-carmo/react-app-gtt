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
import { cilUser } from '@coreui/icons'
import useApi from 'src/services/Api'
import Loading from '../../../components/Loading'

const EsqueciSenha = () => {
  let Api = useApi()
  let navigate = useNavigate()


  const [user_email, setUserEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [loadingMsg, setLoadingMsg] = useState(false)

  const handleEsqueciSenha = async () => {
    setMsg(null)

    if(!user_email || user_email == '') {
      setMsg('Favor preencher o e-mail')
      return
    }


    let res = await Api.esquecisenha(user_email)

    setLoadingMsg(true)

    if(res.msg) {
      setMsg(res.msg)
      setLoadingMsg(false)
      return
    } else {
      setMsg(res.error)
      setLoadingMsg(false)
      return}
  }

  const handleVoltar = async () => {
    navigate('/login')
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
                    <p style={{color:'#fff',opacity:0.7}} className="">Um e-mail será enviado para você com a nova senha de acesso!</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput onChange={(e)=>{setUserEmail(e.target.value)}} value={user_email}  placeholder="E-mail" autoComplete="username" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={5}>
                        <CButton onClick={handleEsqueciSenha} color="primary" className="px-4 background-login">
                          Redefinir
                        </CButton>
                      </CCol>
                      <CCol xs={7}>
                        <CButton onClick={handleVoltar} color="primary" className="px-4 background-login">
                         Voltar para Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
                {loadingMsg && <Loading/>}
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

export default EsqueciSenha
