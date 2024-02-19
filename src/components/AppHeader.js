import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './style-header.css'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import useApi from 'src/services/Api'
import Loading from './Loading'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [horas, setHoras] = useState('')
  const [diasPrevistos, setDiasPrevistos] = useState('')
  const [diasRealizados, setDiasRealizados] = useState('')
  const [situacao, setSituacao] = useState('')
  const [loadingHoras, setLoadingHoras] = useState(false)
  const [loadingDias, setLoadingDias] = useState(false)

  const Api = useApi()

  const getDias = async () => {
    setLoadingDias(true)
    let res = await Api.getDias()
    let trigrama = localStorage.getItem("trigrama")
    if(!res.error) {
      let dados_filter = res.data.filter(item=>item.Trigrama == trigrama)
      setDiasPrevistos(dados_filter[0]['Dias Previstos'])
      setDiasRealizados(dados_filter[0]['Dias Totais'])
      if(dados_filter[0]['Situação'] == 'COMISSIONADO') {
        if(dados_filter[0]['Modulo'] == 'SIM') {
          setSituacao('COMISSIONADO')
        } else {
          setSituacao('COMISSIONADO')
        }
      } else {
        setSituacao('DIÁRIA')
      }
      setLoadingDias(false)
    } else {
      setLoadingDias(false)
    }
    
  }

  const getHoras = async () => {
    setLoadingHoras(true)
      let res = await Api.getHoras()

      if (!res.error) {
        setHoras(res.data[0].Horas)
        setLoadingHoras(false)
      } else {
        setLoadingHoras(false)
      }
      
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(()=>{
    getHoras()
    getDias()
  },[])

  return (
  <div>
      <CHeader style={{backgroundColor: '#191c24'}} position="sticky" className="mb-4">
      <CContainer fluid>
        
        <CHeaderNav style={{width: '100%', padding: 5, alignItems: 'center'}}>
          <CHeaderToggler
            className="ps-1 white-color"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <AppBreadcrumb />
        
          <div className="d-md-flex me-auto">
          <div className='teste'>
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>
              <img src="https://www.1gtt.com.br/app/plane.png" width="25px" height="25px" style={{padding: 2}}/>  Horas:</span>
          </div>
          <div className='teste'>
            {loadingHoras && <Loading width='30px'/>}
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>{horas}</span>
          </div>
          <div class="vertical-bar"></div>
          <div className='teste'>
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>
              <img src="https://www.1gtt.com.br/app/dollar.png" width="25px" height="25px" style={{padding: 2}}/>  Situação:</span>
          </div>
          <div className='teste'>
            {loadingDias && <Loading width='30px'/>}
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>{situacao}</span>
          </div>
          <div class="vertical-bar"></div>
          <div className='teste'>
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3, marginRight: 2}}>
              <img src="https://www.1gtt.com.br/app/calendar.png" width="25px" height="25px" style={{padding: 2}}/>  Dias Previstos:</span>
          </div>
          <div className='teste'>
            {loadingDias && <Loading width='30px'/>}
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>{diasPrevistos}</span>
          </div>
          <div class="vertical-bar"></div>
          <div className='teste'>
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>
              <img src="https://www.1gtt.com.br/app/appointment.png" width="25px" height="25px" style={{padding: 2}}/>  Dias Realizados:</span>
          </div>
          <div className='teste'>
            {loadingDias && <Loading width='30px'/>}
            <span style={{color: 'rgba(255,255,255)', padding:2, borderRadius:3}}>{diasRealizados}</span>
          </div>
          </div>
          <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        </CHeaderNav>
   
      </CContainer>

    </CHeader>
    

  </div>
  )
}

export default AppHeader
