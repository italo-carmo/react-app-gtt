import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import useApi from 'src/services/Api'
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from 'src/components/Loading'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

const LancarManobras = () => {
  const navigate = useNavigate()
  const [manobras, setManobras] = useState([])
  const [manobraShow, setManobraShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  

  const Api = useApi()

  const getManobras = async () => {
    setManobras([])
    setLoading(true)
    var res = await Api.getManobras()

    if(!res.error) {
      setManobras(res.data)
    }
    setLoading(false)
  }

  useEffect(()=>{
    getManobras()
  },[])

  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };


  const handleSeLectManobra = (item) => {
    if(manobraShow == item) {
      setManobraShow('')
    } else {
      setManobraShow(item)
    }
  }




  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:10 }}>
        <div className='botao-lancar'>Lançar Manobra</div>
      </div>
      {loading && <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:50}}><LoadingSpinner width="200px" black={true}/></div>}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {manobras.map(i=>{
        var rota = []
        var trip = []
        i.usuarios.forEach((itm, index) => {
          trip.push(itm.Trigrama.trigrama)
        })
        return (
          <div className='card-missoes-quadrinhos'>
            <div className='left-quadrinhos'>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Nome:</span>
              <span> {i.nome}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Data Início:</span>
              <span> {i.inicio}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Data Fim:</span>
              <span> {i.fim}</span>
            </div>
            {manobraShow && manobraShow.id == i.id &&
              <>
              <div className='row-card-quadrinhos'>
                <span className='bold'>Trip:</span>
                <span> {trip.join('-')}</span>
              </div>
              </>

              }
            </div>
            <div className='rigth-quadrinhos'>
            <div className='right-botoes-quadrinhos'>
              {manobraShow && manobraShow.id == i.id ?               
              <img style={{cursor: 'pointer'}} onClick={()=>handleSeLectManobra(i)} width="20px" src="https://www.1gtt.com.br/up.png" />
              :
              <img style={{cursor: 'pointer'}} onClick={()=>handleSeLectManobra(i)} width="20px" src="https://www.1gtt.com.br/down.png" />
              }
            </div>
            </div>
          </div>
        )
      })}
      </div>
      </CCard>
    </>
  )
}

export default LancarManobras
