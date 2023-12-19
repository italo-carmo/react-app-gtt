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

const LancarQuadrinhos = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('para-lancar')
  const [missoes, setMissoes] = useState([])
  const [missoesCopy, setMissoesCopy] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [quadrinhoSelected, setquadrinhoSelected] = useState('')
  const [quadrinhoFilterSelected, setquadrinhoFilterSelected] = useState('')
  const [quadrinhos, setQuadrinhos] = useState('')
  const [quantidadeSelected, setQuantidadeSelected] = useState('')
  const [missaoShow, setMissaoShow] = useState('')
  const [editQuadrinho, setEditQuadrinho] = useState(false)
  const [editou, setEditou] = useState(false)
  
  let statusLista = [{label: 'Para Lançar', value: 'para-lancar'}, {label: 'Lançadas', value: 'lancadas'}]
  let dias = []

  for (let i=1;i<=50;i++) {
    dias.push({
      label: i.toString(),
      value: i
    })
  }

  const Api = useApi()

  const getMissoes = async () => {
    setMissoes([])
    setLoading(true)
    if(status == 'para-lancar') {
      var res = await Api.getMissoesLancarQuadrinhos()
    } else {
      var res = await Api.getMissoesLancadasQuadrinhos()
    }

    if(!res.error) {
      setMissoes(res.data)
      setMissoesCopy(res.data)
    }
    setLoading(false)
  }


  const getQuadrinhos = async () => {
    let res = await Api.getQuadrinhos()
    if(!res.error) {
      let dados = res.data.map(item=>{
        return (
          {label: item.nome,
            value: item.id
          }
        )
      })
      setQuadrinhos(dados)
    }
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleSeLectMissao = (item) => {
    if(missaoShow == item) {
      setMissaoShow('')
      setquadrinhoSelected('')
      setQuantidadeSelected('')
    } else {
      if(status == 'lancadas') {
        setEditQuadrinho(true)
        setquadrinhoSelected(item.id_quadrinho)
        setQuantidadeSelected(item.quantidade_quadrinhos)
      } else {
        setEditQuadrinho(false)
        setquadrinhoSelected('')
        setQuantidadeSelected('')
      }
      setMissaoShow(item)
    }
  }

  const handleChangeQuadrinhoSelected = (e) => {
    setquadrinhoSelected(e.target.value)
    setEditou(true)
  }

  const handleChangeQuadrinhoFiltered = (e) => {
    setquadrinhoFilterSelected(e.target.value)
    let missoes_copy = [...missoes]
    if(!e.target.value) {
      setMissoesCopy(missoes_copy)
      return
    }
    missoes_copy = missoes_copy.filter(i=>{
      if(i.id_quadrinho == e.target.value) {
        return i
      }
    })
    setMissoesCopy(missoes_copy)
  }

  

  const handleChangeQuantidadeSelected = (e) => {
    setQuantidadeSelected(e.target.value)
    setEditou(true)
  }

  const handleSaveQuadrinho = async () =>{
    setLoadingSave(true)
    let item = {
      id_quadrinho: quadrinhoSelected,
      quantidade: quantidadeSelected
    }
    let res = await Api.updateQuadrinho(missaoShow.id, item)
    if(res.error) {
      setLoadingSave(false)
      alert(res.error)
    } else {
      setLoadingSave(false)
      alert(res.msg)
      setMissaoShow('')
      setQuantidadeSelected('')
      setquadrinhoSelected('')
      getMissoes()
    }
  }

  useEffect(()=>{
    getQuadrinhos()
  },[])

  useEffect(()=>{
    getMissoes()
  },[status])

  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };



  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center', flex: 1 }}>
        <label style={{fontWeight: 'bold', marginRight: 5}}>Status:</label>
        <select style={inputStyle} value={status} onChange={handleChangeStatus}>
          <option value="">Selecione</option>
          {statusLista.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        {
          status == 'lancadas' && 
          <>
            <label style={{fontWeight: 'bold', marginRight: 5, marginLeft: 10}}>Quadrinho:</label>
            <select style={inputStyle} value={quadrinhoFilterSelected} onChange={handleChangeQuadrinhoFiltered}>
                  <option value="">Selecione</option>
                  {quadrinhos.map(i=>{
                    return (
                      <option value={i.value}>{i.label}</option>
                    )
                  })}
                </select>
                {
                  quadrinhoFilterSelected && 
                  <div onClick={()=>{
                    setMissoesCopy(missoes)
                    setquadrinhoFilterSelected('')
                    }} className='botao-limpar'>
                      Limpar
                  </div>
                }
        </>
      }
      </div>
      </div>
    {loading && <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:50}}><LoadingSpinner width="200px" black={true}/></div>}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {missoesCopy.map(i=>{
        if(i.Etapas.length > 0 && i.Etapas[0].dep) {
          var [data, hora] = i.Etapas[0].dep.split('T')
          var [data_termino, hora_termino] = i.Etapas[i.Etapas.length-1].pouso.split('T')
          var [ano, mes, dia] = data.split('-')
          var [ano_termino, mes_termino, dia_termino] = data_termino.split('-')
          var data_moment = dia+'/'+mes+'/'+ano
          var data_moment_fim = dia_termino+'/'+mes_termino+'/'+ano_termino

          const data_formatada_date_inicio = new Date(i.Etapas[0].dep);
          const data_formatada_date_termino = new Date(i.Etapas[i.Etapas.length-1].pouso);


          // O método getDay() retorna um número de 0 (domingo) a 6 (sábado)
          const diaDaSemanaInicio = data_formatada_date_inicio.getDay();
          const diaDaSemanatermino = data_formatada_date_termino.getDay();

          // Se você quiser o nome do dia da semana, pode criar um array
          const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
          var nomeDoDiaDaSemanaInicio = diasDaSemana[diaDaSemanaInicio];
          var nomeDoDiaDaSemanaTermino = diasDaSemana[diaDaSemanatermino];

        } else {
          var data_moment = ''
        }
        var rota = []
        var trip = []
        i.Etapas.forEach((itm, index) => {
          if(index == 0) {
            rota.push(itm.Dep.icao)
            rota.push(itm.Pouso.icao)
          } else {
            rota.push(itm.Pouso.icao)
          }

        })

        i.Usuarios.forEach((itm, index) => {
          trip.push(itm.Trigrama.trigrama)
        })
        return (
          <div className='card-missoes-quadrinhos'>
            <div className='left-quadrinhos'>
            <div className='row-card-quadrinhos'>
              <span className='bold'>OMIS:</span>
              <span> {i.numero}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Data Início:</span>
              <span> {data_moment.toString()} - {nomeDoDiaDaSemanaInicio}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Data Fim:</span>
              <span> {data_moment_fim.toString()} - {nomeDoDiaDaSemanaTermino}</span>
            </div>
              {missaoShow && missaoShow.id == i.id &&
              <>
              <div className='row-card-quadrinhos'>
                <span className='bold'>Rota:</span>
                <span> {rota.join('-')}</span>
              </div>
              <div className='row-card-quadrinhos'>
                <span className='bold'>Trip:</span>
                <span> {trip.join('-')}</span>
              </div>
              </>

              }
            </div>
    
            <div className='right-quadrinhos'>
              {missaoShow && missaoShow.id == i.id && 
              <div className='left-botoes-quadrinhos'>
              <div className='row-left-botos-quadrinhos'>
                <span className='bold'>Quadrinho: </span>
                <select style={inputStyle} value={quadrinhoSelected} onChange={handleChangeQuadrinhoSelected}>
                  <option value="">Selecione</option>
                  {quadrinhos.map(i=>{
                    return (
                      <option value={i.value}>{i.label}</option>
                    )
                  })}
                </select>
              </div>
              <div className='row-left-botos-quadrinhos'>
                <span className='bold'>Quantidade: </span>
                <select style={inputStyle} value={quantidadeSelected} onChange={handleChangeQuantidadeSelected}>
                  <option value="">Selecione</option>
        
                  {dias.map(i=>{
                    return (
                      <option value={i.value}>{i.label}</option>
                    )
                  })}
                </select>
              </div>
              {
                quadrinhoSelected != '' && quantidadeSelected != '' && !editQuadrinho &&
                <div className='row-left-botos-quadrinhos' style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                {!loadingSave ? <div style={{cursor: 'pointer'}} onClick={handleSaveQuadrinho} className='botao-salvar'>Salvar</div>
                :
              <LoadingSpinner black={true} width="50px" />
}
            </div>
              }
               {
                quadrinhoSelected != '' && quantidadeSelected != '' && editQuadrinho && editou &&
                <div className='row-left-botos-quadrinhos' style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                  {!loadingSave ? <div style={{cursor: 'pointer'}} onClick={handleSaveQuadrinho} className='botao-salvar'>Editar</div>
                :
                <LoadingSpinner black={true} width="50px" />
}
              </div>
              }

              </div>
              }
              <div className='right-botoes-quadrinhos'>
              {missaoShow && missaoShow.id == i.id ?               
              <img style={{cursor: 'pointer'}} onClick={()=>handleSeLectMissao(i)} width="20px" src="https://www.1gtt.com.br/up.png" />
              :
              <img style={{cursor: 'pointer'}} onClick={()=>handleSeLectMissao(i)} width="20px" src="https://www.1gtt.com.br/down.png" />
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

export default LancarQuadrinhos
