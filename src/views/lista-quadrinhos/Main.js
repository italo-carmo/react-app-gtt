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
  const [funcao, setFuncao] = useState('')
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [quadrinhoSelected, setQuadrinhoSelected] = useState('')
  const [quadrinhos, setQuadrinhos] = useState([])
  const funcoes = [{label: 'Pilotos', value: 'Piloto'}, {label: 'Mecânicos', value: 'Mecânico de Voo'}, {label: 'Loadmasters', value: 'Loadmaster'}, {label: 'Comissários', value: 'Comissário'}, {label: 'OE-3', value: 'O3'}]
  
  const Api = useApi()

  const getQuadrinhos = async () => {
    let res = await Api.getQuadrinhos()
    if(!res.error) {
      var dados = res.data
      let dados_final = dados.map(item=>{
        return (
          {label: item.nome,
            value: item.id
          }
        )
      })
      setQuadrinhos(dados_final)
    }
  }
  
  useEffect(()=>{
    getQuadrinhos()
  },[])

  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };


  const handleChangeFuncao = (e) => {
    setFuncao(e.target.value)
  }

  const handleChangeQuadrinho = (e) => {
    setQuadrinhoSelected(e.target.value)
  }

  const handlePesquisar = async () => {
    if(!funcao || !quadrinhoSelected) {
      alert('Selecione o Quadrinho e a Função')
      return
    }
    setDados([])
    setLoading(true)
    let item = {
      id_quadrinho: quadrinhoSelected,
      funcao
    }

    let res = await Api.getListaQuadrinhoFuncao(item)

    if(!res.error) {
      res.data.sort((a, b) => {
        // Primeiro, compare pela quantidade de quadrinhos
        if (a.quantidade < b.quantidade) return -1;
        if (a.quantidade > b.quantidade) return 1;
      
        // Se a quantidade for igual, compare pela antiguidade
        if (a.antiguidade < b.antiguidade) return -1;
        if (a.antiguidade > b.antiguidade) return 1;
      
        // Se a quantidade e a antiguidade forem iguais, não é necessário fazer nada
        return 0;
      });
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
        <select style={inputStyle} value={funcao} onChange={handleChangeFuncao}>
          <option value="">Selecione</option>
          {funcoes.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        <label style={{fontWeight: 'bold', marginLeft: 10, marginRight: 5}}>Quadrinho:</label>
        <select style={inputStyle} value={quadrinhoSelected} onChange={handleChangeQuadrinho}>
          <option value="">Selecione</option>
          {quadrinhos.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        <div style={{marginLeft: 10, cursor: 'Pointer'}} onClick={handlePesquisar} className='botao-salvar'>Pesquisar</div>
      </div>
      </div>
      <div  class="table-area">
      <table style={{marginBottom:20}}>
        <tr>
          <th>Trigrama</th>
          <th>Quantidade</th>
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
                  <td>{it.trigrama}</td>
                  <td>{it.quantidade}</td>
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
