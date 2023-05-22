import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.css'
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
    if (!res.error) {
      let dados_filter = res.data.filter(item => item.Trigrama == trigrama)
      setDiasPrevistos(dados_filter[0]['Dias Previstos'])
      setDiasRealizados(dados_filter[0]['Dias Totais'])
      if (dados_filter[0]['Situação'] == 'COMISSIONADO') {
        if (dados_filter[0]['Modulo'] == 'SIM') {
          setSituacao('COMISSIONADO COM MÓDULO')
        } else {
          setSituacao('COMISSIONADO SEM MÓDULO')
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

  useEffect(() => {
    getHoras()
    getDias()
  }, [])

  return (
    <div>
      <CHeader style={{ backgroundColor: '#191c24' }} position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1 white-color"
            onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <AppBreadcrumb />
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
          </CHeaderNav>


          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>

      </CHeader>
      <div className='bottom-header'>
        <div className='card-header card-background '>
          <div >
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Horas Voadas este ano</p>
          </div>
          <div>
            {loadingHoras && <Loading />}
            <p>{horas}</p>
          </div>
        </div>
        <div className='card-header card-model'>
          <img src='./dollar.png' width="15%" />
          <div style={{ marginLeft: 20 }}>
            <div >
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Situação</p>
            </div>
            <div>
              {loadingDias && <Loading />}
              <p>{situacao}</p>
            </div>
          </div>
        </div>
        <div className='card-header card-model'>
          <img src='./calendar.png' width="15%" />
          <div style={{ marginLeft: 20 }}>
            <div >
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Dias Previstos</p>
            </div>
            <div>
              {loadingDias && <Loading />}
              <p>{diasPrevistos}</p>
            </div>
          </div>
        </div>
        <div className='card-header card-model'>
          <img src='./appointment.png' width="15%" />
          <div style={{ marginLeft: 20 }}>
            <div >
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Dias Realizados</p>
            </div>
            <div>
              {loadingDias && <Loading />}
              <p>{diasRealizados}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
