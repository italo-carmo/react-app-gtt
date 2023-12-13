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
import { useNavigate, useSearchParams } from 'react-router-dom';
import moment from 'moment'
import { usePDF } from 'react-to-pdf';
import MaskedObsTextArea from '../../components/masked-inpput-text-obs-textarea'

const AlterarOperacionalidades = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataEdit, setDataEdit] = useState('')
  const [operacionalidades, setOperacionalidades] = useState([])
  
  const Api = useApi()


  const getDados = async () => {
    setLoading(true)
    let res = await Api.getUsersOperacionalidades()
    if(!res.error) {
      setDados(res.data)
      setLoading(false)
    } else {
      alert(res.error)
      setLoading(false)
      return
    }
  }

  const getOperacionalidades = async () => {
    setLoading(true)
    let res = await Api.getOperacionalidades()
    if(!res.error) {
      res.data.unshift({
        id: null,
        nome: "Falta Selecionar"
      })
      setOperacionalidades(res.data)

      setLoading(false)
    } else {
      alert(res.error)
      setLoading(false)
      return
    }
  }
  
  useEffect(()=>{
    getDados()
    getOperacionalidades()
  },[])


  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };

  const handleChangeItem = async (id_operacionalidade, id) => {
    let res = await Api.updateOperacionalidade(id, {id_operacionalidade})
    if(res.error) {
      alert(res.error)
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
            <th>Operacionalidade</th>
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
              dados.map((it, idx)=>{
                return (
                  <tr>
                    <td>{it.Trigrama.trigrama}</td>
                    <td>{it.Posto.nome+' '+it.nome_guerra}</td>
                    <td>
                    <select
                value={it.id_operacionalidade}
                onChange={(e) =>
                  handleChangeItem(Number(e.target.value), it.id)
                }
              >
                {operacionalidades.map(i=>{
                  return (
                    <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                  )
                })
              }
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

export default AlterarOperacionalidades
