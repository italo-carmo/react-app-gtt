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

const ListaQuadrinhos = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataEdit, setDataEdit] = useState('')
  const [dataEditInput, setDataEditInput] = useState('')
  
  const Api = useApi()


  const editFormatData = (data) => {

    let [ano, mes, dia] = data.split('-')
    return dia+'/'+mes+'/'+ano
  }

  const editFormatDataBack = (data) => {

    let [dia, mes, ano] = data.split('/')
    return ano+'-'+mes+'-'+dia
  }

  const getDados = async () => {
    setLoading(true)
    let res = await Api.getTurmas()
    if(!res.error) {
      let dados_get = res.data.map(item=>{
        if(item.data_operacional) {
          item.data_operacional = editFormatData(item.data_operacional)
          return item
        } else {
          item.data_operacional = '00/00/0000'
          return item
        }
      })
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

  const editData = (event) => {
    const inputValue = event.target.value;

    // Remove caracteres não numéricos
    const numericValue = inputValue.replace(/\D/g, '');

    // Formata o valor no formato de data
    let formattedValue = '';
    if (numericValue.length > 0) {
      formattedValue += numericValue.substring(0, 2);
      if (numericValue.length >= 3) {
        formattedValue += '/' + numericValue.substring(2, 4);
        if (numericValue.length >= 5) {
          formattedValue += '/' + numericValue.substring(4, 8);
        }
      }
    }

    return(formattedValue);
  };
  

  const handleChangeDataItem = (event) => {

    let dados_copy = [...dados] 
    dados_copy = dados_copy.map(item=>{
      if(item.id == dataEdit.id) {
        item.data_operacional = editData(event)
        return item
      } else {
        return item
      }
    })
    setDataEditInput(editData(event))
    setDados(dados_copy)

  }

  const handleClickEdit = (item) => {
    setDataEdit(item)
  }

  const handleSalvar = async (item) => {
    let res = await Api.updateDataOperacional(item.id, {data_operacional: editFormatDataBack(item.data_operacional)})
    if(res.error) {
      alert(res.error)
      setDataEdit('')
      return
    } else {
      setDataEdit('')
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
            <th>Data Operacional</th>
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
                    <td>
                      <div style={{display: 'flex', justifycontent:'center', alignItems: 'center', alignSelf: 'center'}}>
                    <input
                      disabled={dataEdit.id == it.id ? false : true}
                      value={it.data_operacional}
                      onChange={handleChangeDataItem}
                      maxLength={10}
                      style={{border: '1px solid #000', width:100, textAlign: 'center'}}
                    />
                    {
                      dataEdit.id == it.id ? 
                      <button onClick={()=>handleSalvar(it)}  style={{marginLeft:5}} className='botao-salvar'>Salvar</button>
                      :
                      <img onClick={()=>handleClickEdit(it)} style={{marginLeft:3}} src="https://www.1gtt.com.br/app/pen.png" width="20px" />
                    }
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

export default ListaQuadrinhos
