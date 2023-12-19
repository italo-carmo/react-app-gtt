import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import useApi from 'src/services/Api'
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react'
import LoadingSpinner from 'src/components/Loading'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { usePDF } from 'react-to-pdf';

const Solicitadas = ({solicitadas}) => {
  const Api = useApi()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
  },[])


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', border:0 }}>
        {solicitadas.map(item=>{
          let [ano_inicio, mes_inicio, dia_inicio] = item.data_inicio.split('-')
          let [ano_termino, mes_termino, dia_termino] = item.data_inicio.split('-')
          return (
            <div className='card-solicitadas'>
              <div className='left-solicitadas'>
              <div className='row-solicitadas'>
                <span className='bold'>Militar:</span>
                <span> {item.Usuario.Posto.nome+' '+item.Usuario.nome_guerra}</span>
              </div>
              <div className='row-solicitadas'>
                <span className='bold'>Início:</span>
                <span> {dia_inicio+'/'+mes_inicio+'/'+ano_inicio}</span>
              </div>
              <div className='row-solicitadas'>
                <span className='bold'>Término:</span>
                <span> {dia_termino+'/'+mes_termino+'/'+ano_termino}</span>
              </div>
              <div className='row-solicitadas'>
                <span className='bold'>Período Concessivo:</span>
                <span> {item.periodo_concessivo}</span>
              </div>
              <div className='row-solicitadas'>
                <span className='bold'>Tipo:</span>
                <span> {item.FeriasTipo.tipo}</span>
              </div>
              <div className='row-solicitadas'>
                <span className='bold'>Adiantamento do 13º:</span>
                <span> {item.adiantamento13 ? 'Sim' : 'Não'}</span>
              </div>
              <div className='row-solicitadas'>
                <span className='bold'>Adiantamento 70%:</span>
                <span> {item.adiantamento70 ? 'Sim' : 'Não'}</span>
              </div>
              </div>
              <div className='right-solicitadas'>
                <div className='row-solicitadas botao-solitadas'>
                  <img src="https://www.1gtt.com.br/avancar-white.png" width="25"/>
                  <span style={{color:'#fff'}}> Avançar no Fluxo</span>
                </div>
                <div className='row-solicitadas botao-solitadas' style={{backgroundColor: '#e31818'}}>
                  <img src="https://www.1gtt.com.br/close-white.png" width="25"/>
                  <span style={{color:'#fff'}}> Cancelar</span>
                </div>
              </div>
            </div>
          )
        })}
      </CCard>
     
    </>
  )
}

export default Solicitadas
