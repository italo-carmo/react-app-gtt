import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import useApi from 'src/services/Api'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from 'src/components/Loading'
import { useAsyncError, useNavigate } from 'react-router-dom';
import moment from 'moment'
import MaskedInputTrigrama from '../../components/masked-trigrama'

const LancarMissoesExterior = () => {
  const navigate = useNavigate()
  const divRef = useRef(null);

  const [manobras, setManobras] = useState([])
  const [manobraShow, setManobraShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [tripulacao, setTripulacao] = useState([])
  const [loadingExcluir, setLoadingExcluir] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [editMission, setEditMission] = useState(false)
  const [trigrama, setTrigrama] = useState('')
  const [errorTripulante, setErrorTripulante] = useState(false)
  const [comentarios, setComentarios] = useState('')
  const [dataInicio, setDataInicio] = useState(new Date())
  const [dataFim, setDataFim] = useState(new Date())
  const [idManobraEdit, setIdManobraEdit] = useState('')
  const [quadrinhos, setQuadrinhos] = useState([])
  const [quadrinhoSelected, setQuadrinhoSelected] = useState('')
  const [quantidadeSelected, setQuantidadeSelected] = useState('')
  const [exterior, setExterior] = useState(false)
  const [lastro, setLastro] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const Api = useApi()

  const getMissoes = async () => {
    setManobras([])
    setLoading(true)
    var res = await Api.getMissoesExterior()

    if(!res.error) {
      setManobras(res.data)
    }
    setLoading(false)
  }

  const getQuadrinhos = async () => {
    let res = await Api.getQuadrinhos()
    if(!res.error) {
      var dados = res.data
      let dados_final = dados.filter(item=>{
        if(item.nome == 'BPEX' || item.nome == 'AMENOR' || item.nome == 'AMESUL' || item.nome == 'EUROPA' || item.nome == 'RESTO MUN') {
          return (
           item
          )
        }
      })
      dados_final = dados_final.map(item=>{
        return (
          {label: item.nome,
            value: item.id
          }
        )
      })
      console.log(dados_final)
      setQuadrinhos(dados_final)
    }
  }


  useEffect(()=>{
    getMissoes()
    getQuadrinhos()
  },[])


  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };

  const DateInput = ({ value, onClick }) => (
    <button className="calendarioBranco" onClick={onClick}>
    +
    </button>
  )



  const handleSeLectManobra = (item) => {
    if(manobraShow == item) {
      setManobraShow('')
    } else {
      setManobraShow(item)
    }
  }


 
  const handleCloseModal = () => {
    const confirmacao = window.confirm('Deseja mesmo sair? Todos os dados adicionados até o momento serão perdidos');
    if (confirmacao) {
      handleLimparMissao()
     setCaixaCreateVisible(false)
    }
  }

  const handleKeyPressTripulante = async (event) => {
    setErrorTripulante(false)
    if (event.key === 'Enter') {
      
      let tripulacao_copy = [...tripulacao]
      let res = await Api.getTrigrama(trigrama)
      if(!res.error) {
        tripulacao_copy.push({id: res.data.id_user, trigrama: res.data.trigrama, funcao: res.data.Usuario.FuncoesAbordo.nome})
        setTripulacao(tripulacao_copy)
        setTrigrama('')
      } else {
        setErrorTripulante(res.error)
      }
    }
  };

  const handleDeleteTrip = (id) => {
    let tripulacao_copy = [...tripulacao]
    tripulacao_copy = tripulacao_copy.filter(item=>{
      if(item.id != id) {
        return item
      }
    })
    setTripulacao(tripulacao_copy)
  }

  const handleLimparMissao = () => {
    setComentarios('')
    setEditMission(false)
    setIdManobraEdit('')
    setQuadrinhoSelected('')
    setQuantidadeSelected('')
    setTripulacao([])
  }

  const handleChangeQuadrinho = (e) => {
    setQuadrinhoSelected(e.target.value)
  }

  const handleChangeLastro = (e) => {
    setLastro(e.target.value)
    if(e.target.value == 'true') {
      console.log('entrou')
      setComentarios('LASTRO')
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  

  const handleEditSaveMission = async () => {
    setLoadingSave(true)
    if(!comentarios) {
      alert('Nome da Missão é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(tripulacao.length < 1) {
      alert('Ao menos um tripulante é necessário!')
      setLoadingSave(false)
      return
    }
    if(quadrinhoSelected == '') {
      alert('Quadrinho é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(quantidadeSelected == '') {
      alert('Quantidade é obrigatória!')
      setLoadingSave(false)
      return
    }
    if(dataInicio == '' || dataFim == '') {
      alert('Data de início e término obrigatórias!')
      setLoadingSave(false)
      return
    }
    let [dataInicioEditada, restoInicio] = dataInicio.toISOString().split('T')
    let [dataFimEditada, restoFim] = dataFim.toISOString().split('T')

    let item = {
      nome: comentarios,
      inicio: dataInicioEditada,
      fim: dataFimEditada,
      quantidade: quantidadeSelected,
      id_quadrinho: quadrinhoSelected
    }

    let id_usuarios = tripulacao.map(i=>i.id)
    let missao = await Api.editMissaoExterior(idManobraEdit, item)

    if(missao.error) {
      alert(missao.error)
      setLoadingSave(false)
      return
    }



    let item_missao_usuarios = {
      id_usuarios
    }

    let missao_exterior_usuarios = await Api.editMissaoExteriorUsuarios(idManobraEdit, item_missao_usuarios)

    if(missao_exterior_usuarios.error) {
      alert(missao_exterior_usuarios.error)
      setLoadingSave(false)
      return
    }
    setLoadingSave(false)
    setCaixaCreateVisible(false)
    handleLimparMissao()
    getMissoes()

    alert(missao_exterior_usuarios.msg)

  }

  const handleExcluirAviso = (id) => {
    const confirmacao = window.confirm('Deseja mesmo excluir essa Manobra?');
    if (confirmacao) {
      handleExcluirManobra(id)
    }
  }

  const handleExcluirManobra = async (id) => {
    let res = await Api.excluirMissaoExterior(id)
    if(res.error) {
      alert(res.error)
      return
    }
    getMissoes()
    alert(res.msg)
  }

  const handleEditarManobra = (i) => {
    let tripulacao_get = i.usuarios.map(it=>{
      return {
        funcao: it.FuncoesAbordo.nome,
        id: it.Trigrama.id_user,
        trigrama: it.Trigrama.trigrama
      }
    })
    setTripulacao(tripulacao_get)
    setComentarios(i.nome)
    setQuantidadeSelected(i.quantidade)
    const inicio = new Date(i.inicio+'T10:00:00Z')
    const fim = new Date(i.fim+'T10:00:00Z')
    setDataInicio(inicio)
    setDataFim(fim)
    setQuadrinhoSelected(i.Quadrinho.id)
    setIdManobraEdit(i.id)
    setEditMission(true)
    setCaixaCreateVisible(true)
  }

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Remove caracteres não numéricos usando uma expressão regular
    const numericValue = value.replace(/\D/g, '');

    // Atualiza o estado apenas se o valor for numérico
    setQuantidadeSelected(numericValue);
  };

  const handleSaveMissao = async () => {
    setLoadingSave(true)
    if(!comentarios) {
      alert('Nome da Missão é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(tripulacao.length < 1) {
      alert('Ao menos um tripulante é necessário!')
      setLoadingSave(false)
      return
    }
    if(quadrinhoSelected == '') {
      alert('Quadrinho é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(dataInicio == '' || dataFim == '') {
      alert('Data de início e término obrigatórias!')
      setLoadingSave(false)
      return
    }
    let [dataInicioEditada, restoInicio] = dataInicio.toISOString().split('T')
    let [dataFimEditada, restoFim] = dataFim.toISOString().split('T')

    let item = {
      nome: comentarios,
      inicio: dataInicioEditada,
      fim: dataFimEditada,
      quantidade: quantidadeSelected,
      id_quadrinho: quadrinhoSelected
    }

    let id_usuarios = tripulacao.map(i=>i.id)
    let missao = await Api.createMissaoExterior(item)

    if(missao.error) {
      alert(missao.error)
      setLoadingSave(false)
      return
    }



    let item_missao_usuarios = {
      id_missao: missao.data.id,
      id_usuarios
    }

    let missoes_usuarios = await Api.createMissaoExteriorUsuarios(item_missao_usuarios)

    if(missoes_usuarios.error) {
      alert(missoes_usuarios.error)
      setLoadingSave(false)
      return
    }

    handleLimparMissao()
    setCaixaCreateVisible(false)
    getMissoes()
    setLoadingSave(false)
    alert(missoes_usuarios.msg)

  }

  const handleExcluir = () => {

  }

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:10 }}>
        <div className='botao-lancar' onClick={()=>setCaixaCreateVisible(true)}>Lançar Missão Exterior</div>
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
            <div className='row-card-quadrinhos'>
              <span className='bold'>Quadrinho:</span>
              <span> {i.Quadrinho.nome}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Quantidade:</span>
              <span> {i.quantidade}</span>
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
            <div className='rigth-quadrinhos' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <button className='cancelar' style={{backgroundColor: '#000', marginRight: 5}} onClick={()=>handleEditarManobra(i)}>Editar</button>
            <button className='cancelar' style={{marginRight: 5}} onClick={()=>handleExcluirAviso(i.id)}>Excluir</button>
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

      <div ref={divRef} className={caixaCreateVisible ? 'modal-create-visible' : 'modal-create'}>
            <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
              <div onClick={handleCloseModal} style={{color:'#fff'}}>X</div>
            </div>
            <div className='criar-div'>
              <h3 style={{color:'#fff'}}>{editMission ? 'Editar' :  'Criar'} Missão Exterior</h3>
            </div>
      <div style={{marginTop: 30, display: 'flex', flexDirection: 'row' , alignItems: 'center', justifyContent: 'space-between'}}>
        <span style={{color:'#fff'}}>Lastro?: </span>
        <select style={inputStyle} value={lastro} onChange={handleChangeLastro}>
                <option value="">Selecione</option>
                <option value={false}>NÃO</option>
                <option value={true}>SIM</option>
              </select>
      </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
      <span style={{color:'#fff'}}>Nome da Missão: </span>
      <input disabled={disabled} value={comentarios} onChange={(e)=>setComentarios(e.target.value)} style={{borderRadius: 10, padding:5}}/>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
    <span style={{color:'#fff'}}>Quadrinho: </span>
            <select style={inputStyle} value={quadrinhoSelected} onChange={handleChangeQuadrinho}>
              <option value="">Selecione</option>
              {quadrinhos.map(i=>{
                return (
                  <option value={i.value}>{i.label}</option>
                )
              })}
            </select>
    </div>
    <div style={{marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <span style={{color:'#fff'}}>Data de Início: </span>
      <span style={{color:'#fff'}}>{dataInicio.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit'})}
 </span>
      <div className='' style={{marginLeft:10}}>
                        <DatePicker 
                        selected={dataInicio}
                        timeInputLabel={dataInicio}
                        onChange={(date) => {
                          date.setHours(10)
                          setDataInicio(date);
                        }}
                        customInput={<DateInput />}
                        dateFormat="LL"
                        />
      </div>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <span style={{color:'#fff'}}>Data de Término: </span>
      <span style={{color:'#fff'}}>{dataFim.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit'})}
 </span>
      <div className='' style={{marginLeft:10}}>
                        <DatePicker 
                        selected={dataFim}
                        timeInputLabel={dataFim}
                        onChange={(date) => {
                          date.setHours(10)
                          setDataFim(date);
                        }}
                        customInput={<DateInput />}
                        dateFormat="LL"
                        />
      </div>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <span style={{color:'#fff'}}>Quantidade: </span>
      <input value={quantidadeSelected} onChange={handleInputChange} style={{borderRadius: 10, padding:5}}/>
    </div>
    <div className='add-trip' style={{marginTop:20}}>
    <span style={{color:'#fff'}}>Tripulação:</span>
    <MaskedInputTrigrama maxLength={3} value={trigrama} onChange={setTrigrama} onKeyPress={handleKeyPressTripulante} />

    {errorTripulante &&
    <div style={{marginTop:10}} class="alert alert-danger" role="alert">
          {errorTripulante}
      </div>}
    <div className='tripulante-row'>
      <span style={{color:'#fff'}} className='tripulante'>Pilotos:</span>
    </div>
    <div className='caixa-tripulante'>
      {tripulacao.map(item=>{
        if (item.funcao == 'Piloto') {
          return (
            <div className='tripulante-item' >
            {item.trigrama}
            <img style={{marginLeft:5, cursor: 'pointer'}} onClick={()=>handleDeleteTrip(item.id)} src='https://www.1gtt.com.br/app/close.png' width='15px'/>
          </div>
          )
        }
        })}
    </div>

    <div className='tripulante-row'>
      <span style={{color:'#fff'}} className='tripulante'>Mecânicos:</span>
    </div>
    <div className='caixa-tripulante'>
      {tripulacao.map(item=>{
        if (item.funcao == 'Mecânico de Voo') {
          return (
            <div className='tripulante-item' >
            {item.trigrama}
            <img style={{marginLeft:5, cursor: 'pointer'}} onClick={()=>handleDeleteTrip(item.id)} src='https://www.1gtt.com.br/app/close.png' width='15px'/>
          </div>
          )
        }
        })}
    </div>

    <div className='tripulante-row'>
      <span style={{color:'#fff'}} className='tripulante'>Loadmasters:</span>
    </div>
    <div className='caixa-tripulante'>
      {tripulacao.map(item=>{
        if (item.funcao == 'Loadmaster') {
          return (
            <div className='tripulante-item' >
            {item.trigrama}
            <img style={{marginLeft:5, cursor: 'pointer'}} onClick={()=>handleDeleteTrip(item.id)} src='https://www.1gtt.com.br/app/close.png' width='15px'/>
          </div>
          )
        }
        })}
    </div>

    <div className='tripulante-row'>
      <span style={{color:'#fff'}} className='tripulante'>Comissários:</span>
    </div>
    <div className='caixa-tripulante'>
      {tripulacao.map(item=>{
        if (item.funcao == 'Comissário') {
          return (
            <div className='tripulante-item' >
            {item.trigrama}
            <img style={{marginLeft:5, cursor: 'pointer'}} onClick={()=>handleDeleteTrip(item.id)} src='https://www.1gtt.com.br/app/close.png' width='15px'/>
          </div>
          )
        }
        })}
    </div>

    <div className='tripulante-row'>
      <span style={{color:'#fff'}} className='tripulante'>Equipe Médica:</span>
    </div>
    <div className='caixa-tripulante'>
      {tripulacao.map(item=>{
        if (item.funcao == 'Médico' || item.funcao == 'Enfermeiro') {
          return (
            <div className='tripulante-item' >
            {item.trigrama}
            <img style={{marginLeft:5, cursor: 'pointer'}} onClick={()=>handleDeleteTrip(item.id)} src='https://www.1gtt.com.br/app/close.png' width='15px'/>
          </div>
          )
        }
        })}
    </div>

    <div className='tripulante-row'>
      <span style={{color:'#fff'}} className='tripulante'>OE-3:</span>
    </div>
    <div className='caixa-tripulante'>
      {tripulacao.map(item=>{
        if (item.funcao == 'O3') {
          return (
            <div className='tripulante-item' >
            {item.trigrama}
            <img style={{marginLeft:5, cursor: 'pointer'}} onClick={()=>handleDeleteTrip(item.id)} src='https://www.1gtt.com.br/app/close.png' width='15px'/>
          </div>
          )
        }
        })}
    </div>

    </div>

    <div className='botoes-add-etapa' style={{marginTop:30}}>
    <button className='cancelar' style={{fontSize: '1vw'}} onClick={handleLimparMissao}>Limpar</button>
      {loadingSave ? <LoadingSpinner/> : <button className='adicionar' style={{fontSize: '1vw'}} onClick={editMission ? handleEditSaveMission : handleSaveMissao}>{editMission ? 'Editar Missao' : 'Criar Missão'}</button>}
    </div>

    <div className='botoes-add-etapa' style={{marginTop:30, justifyContent:'center'}}>
      {loadingExcluir && <LoadingSpinner />}
      {
        editMission ? <button className='cancelar' style={{fontSize: '1.3vw'}} onClick={()=>handleExcluirAviso(idManobraEdit)}>Excluir Missão</button>
         :  <></>
      }

    </div>
        </div>
      </CCard>
    </>
  )
}

export default LancarMissoesExterior
