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
import MaskedObsTextArea from '../../components/masked-inpput-text-obs-textarea'

const ListaPauDeSebo = () => {
  const navigate = useNavigate()
  const [funcao, setFuncao] = useState('')
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const funcoes = [{label: 'Pilotos', value: 'Piloto'}, {label: 'Mecânicos', value: 'Mecânico de Voo'}, {label: 'Loadmasters', value: 'Loadmaster'}, {label: 'Comissários', value: 'Comissário'}, {label: 'OE-3', value: 'O3'}]
  
  const Api = useApi()
  
  useEffect(()=>{

  },[])

  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };

  const handlechangeFuncao = async (e) => {
      setDados([])
      setLoading(true)
      setFuncao(e.target.value)
      let res = await Api.getPauDeSebo({funcao: e.target.value})
      if (!res.error) {
        setDados(res.data)
      }
      setLoading(false)
  }


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center', flex: 1 }}>
        <label style={{fontWeight: 'bold', marginRight: 5}}>Função a Bordo:</label>
        <select style={inputStyle} value={funcao} onChange={handlechangeFuncao}>
          <option value="">Selecione</option>
          {funcoes.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
      </div>
      </div>
      <div class="table-area">
      <table style={{marginBottom:20}}>
        <tr>
          <th>Trigrama</th>
          <th>Horas</th>
          <th>Último Voo</th>
          <th>Dias sem Voar</th>
        </tr>
        {loading &&
                <div  style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40%',
                  transform: 'translate(-50%, -50%)',
                }}>
                  <LoadingSpinner black={true} width="200px" />
                </div>
        }
          {
            dados.map(it=>{
              let [data, horas] = it.Ultimo_voo.split('T')
              let [ano, mes, dia] = data.split('-')
              let [hora, minuto] = horas.split(':')
              


              return (
                <tr>
                  <td>{it.Trigrama}</td>
                  <td>{it.Horas}</td>
                  <td>{dia+'/'+mes+'/'+ano}</td>
                  <td>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <span>{it.Dias_sem_voar}</span>                        
                    {parseInt(it.Dias_sem_voar) > 45 && <div style={{marginLeft: 5}} className='situacao desadaptado blink'>Desadaptado</div>}
                      {parseInt(it.Dias_sem_voar) > 40 && parseInt(it.dias_sem_voar) < 45 &&  <div style={{marginLeft: 5}} className='situacao desadaptando blink'>Desadaptando</div>}
                      </div>
                    </td>
                </tr>
              )
            })
          }
      </table>
      </div>
      </CCard>
    </>
  )
}

export default ListaPauDeSebo
