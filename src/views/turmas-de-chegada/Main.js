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

const ListaQuadrinhos = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingExterior, setLoadingExterior] = useState(false)

  
  const Api = useApi()

  const getDados = async () => {
    setLoading(true)
    let res = await Api.getTurmas()
    if(!res.error) {
      setDados(res.data)
      setLoading(false)
    } else {
      alert(res.error)
      setLoading(false)
      return
    }
  }
  
  useEffect(()=>{
    getDados()
  },[])


  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };

  const handleChangeItem = async (turma, id) => {
    let res = await Api.updateTurma(id, {turma})
    if(res.error) {
      alert(res.error)
      return
    } else {
      alert(res.msg)
      return
    }

  }

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div  class="table-area">
          <table style={{marginBottom:20}}>
          <tr>
            <th>Trigrama</th>
            <th>Nome de Guerra</th>
            <th>Turma</th>
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
                return (
                  <tr>
                    <td>{it.Trigrama.trigrama}</td>
                    <td>{it.Posto.nome+' '+it.nome_guerra}</td>
                    <td>
                    <select
                value={it.turma}
                onChange={(e) =>
                  handleChangeItem(Number(e.target.value), it.id)
                }
              >
                {Array.from({ length: 30 }, (_, i) => i + 0).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
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

export default ListaQuadrinhos
