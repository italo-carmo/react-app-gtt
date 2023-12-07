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
  const [loadingExterior, setLoadingExterior] = useState(false)
  const [quadrinhoSelected, setQuadrinhoSelected] = useState('')
  const [quadrinhos, setQuadrinhos] = useState([])
  const [exterior, setExterior] = useState(false)
  const [exteriorLista, setExteriorLista] = useState([])
  const [indexSelected, setIndexSelected] = useState('a')

  const funcoes = [{label: 'Pilotos', value: 'Piloto'}, {label: 'Mecânicos', value: 'Mecânico de Voo'}, {label: 'Loadmasters', value: 'Loadmaster'}, {label: 'Comissários', value: 'Comissário'}, {label: 'OE-3', value: 'O3'}]
  
  const Api = useApi()

  const getQuadrinhos = async () => {
    let res = await Api.getQuadrinhos()
    if(!res.error) {
      var dados = res.data
      dados.push({nome: 'Manobras', id: null})
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
    const selectedIndex = e.target.selectedIndex;
    const novoLabelSelecionado = e.target.options[selectedIndex].label;
    if(novoLabelSelecionado == 'BPEX' || novoLabelSelecionado == 'AMENOR' || novoLabelSelecionado == 'AMESUL' || novoLabelSelecionado == 'EUROPA' || novoLabelSelecionado == 'RESTO MUN') {
      setExterior(true)
    } else {
      setExterior(false)
    }
    setQuadrinhoSelected(e.target.value)
  }

  const handlePesquisar = async () => {
    if(!funcao || !quadrinhoSelected) {
      alert('Selecione o Quadrinho e a Função')
      return
    }
    setDados([])
    setExteriorLista([])
    setLoading(true)

    if(quadrinhoSelected == 'Manobras') {
      var res = await Api.getQuadrinhosManobras({funcao})
    } else {
      let item = {
        id_quadrinho: quadrinhoSelected,
        funcao
      }
      if(exterior) {
        setLoadingExterior(true)
        var res = await Api.getListaQuadrinhoFuncaoExterior(item)
        if(!res.error) { 
          setLoadingExterior(false)
          setExteriorLista(res.data)
        } else {
          alert(res.error)
          setLoadingExterior(false)
          return
        }
      } else {
        var res = await Api.getListaQuadrinhoFuncao(item)
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
      }

    }
    setLoading(false)
  }

  const handleChangeIndex = (index) => {
    if (index == indexSelected) {
      setIndexSelected('a')
      console.log('zerou')
    } else {
      console.log(index)
      setIndexSelected(index)
    }
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
        { !exterior ?
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
          </table> : 
          <table>
            <tr>
              <th style={{width: '20% !important', textAlign: 'left'}}>Trigrama</th>
              <th>Quantidade</th>
            </tr>
            {loadingExterior &&
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
              exteriorLista.map((it, idx)=>{
                function isLastro(missao) {
                  return missao === "LASTRO";
                }

                it.missoes.sort((a, b) => {
                  const isLastroA = isLastro(a);
                  const isLastroB = isLastro(b);
              
                  if (isLastroA && !isLastroB) {
                    return -1;
                  } else if (!isLastroA && isLastroB) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
                
                return (
                  <tr>
                    <td style={{width: '20% !important', textAlign: 'left'}}><img src="https://www.1gtt.com.br/fast-forward.png" onClick={()=>handleChangeIndex(idx)} width="20px" style={{marginRight:5}} />
                     {it.trigrama}
                    </td>
                    <td>
                      <div className='area-item-exterior'>
                      {it.missoes.map((item, index)=>{
                        if (item.toUpperCase() == 'LASTRO') {
                          if(idx == indexSelected) {
                            var color = '#fff'
                          } else {
                            var color = '#f1ad24'
                          }
                        } else {
                          if(idx == indexSelected) { 
                            var color = '#fff'
                          } else {
                            var color = '#000'
                          }

                        }
                        return (
                          <div className={item.toUpperCase() == 'LASTRO' ? 'item-missao-exterior-lastro' : 'item-missao-exterior'}>
                              <span style={{color}}>{idx == indexSelected ? item : '1'}</span>
                          </div>
                        )
                      })}
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        }
     
      </div>
      </CCard>
    </>
  )
}

export default ListaQuadrinhos
