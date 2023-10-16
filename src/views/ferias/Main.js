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

const Ferias = () => {
  const Api = useApi()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [solicitadas, setSolicitadas] = useState([])

  const getSolicitadas = async () => {
    let res = await Api.getFeriasSolicitadas()
    if(!res.error) {
      setSolicitadas(res.data)
    }
  }

  useEffect(()=>{
    getSolicitadas()
  },[])


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto' }}>
      <div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      <div className='left-side' >
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Solicitadas</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Conferidas</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Autorizadas</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Lançadas no Sistema</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Em andamento</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Finalizadas</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Interrompidas</span>
        </div>
        <div className='menu-item'>
          <img src="https://www.1gtt.com.br/fast-forward.png" width="30px" />
          <span className='item-menu'>Canceladas</span>
        </div>
      </div>
      <div className='right-side'>
      {loading && 
      <div  style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <LoadingSpinner black={true} width="150px" />
      </div>
      }
       <div className='area-top'>
          <div className='card-sap'>
            <img src="https://www.1gtt.com.br/solicitar.png" width="80px;" />
            <div className='card-right'>
              <span className='title-card'>Solicitadas</span>
              <span className='numero-card'>{solicitadas.length}</span>
            </div>
          </div>
          <div className='card-sap' style={{backgroundColor: '#ccc'}}>
            <img src="https://www.1gtt.com.br/computador-pessoal.png" width="80px;" />
            <div className='card-right'>
              <span className='title-card'>Para Lançar</span>
              <span className='numero-card'>2</span>
            </div>
          </div>
          <div className='card-sap' style={{backgroundColor: '#84d077'}}>
            <img src="https://www.1gtt.com.br/decolagem.png" width="80px;" />
            <div className='card-right'>
              <span className='title-card' style={{color: '#fff'}}>Para Início</span>
              <span className='numero-card' style={{color: '#fff'}}>4</span>
            </div>
          </div>
          <div className='card-sap' style={{backgroundColor: '#84d077'}}>
            <img src="https://www.1gtt.com.br/pouso.png" width="80px;" />
            <div className='card-right'>
              <span className='title-card' style={{color: '#fff'}}>Para Término</span>
              <span className='numero-card' style={{color: '#fff'}}>4</span>
            </div>
          </div>
       </div>
      </div>
      </div>
      </CCard>
     
    </>
  )
}

export default Ferias
