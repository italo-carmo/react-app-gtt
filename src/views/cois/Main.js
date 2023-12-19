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

  const [cois, setCois] = useState([])
  const [coisCopy, setCoisCopy] = useState([])
  const [manobraShow, setManobraShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [tripulacao, setTripulacao] = useState([])
  const [loadingExcluir, setLoadingExcluir] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [editMission, setEditMission] = useState(false)
  const [trigrama, setTrigrama] = useState('')
  const [errorTripulante, setErrorTripulante] = useState(false)
  const [numero, setNumero] = useState('')
  const [dataInicio, setDataInicio] = useState(new Date())
  const [dataFim, setDataFim] = useState(new Date())
  const [idManobraEdit, setIdManobraEdit] = useState('')
  const [tipoSelected, setTipoSelected] = useState('')
  const [quantidadeSelected, setQuantidadeSelected] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [programas, setProgramas] = useState([])
  const [ano, setAno] = useState('')
  const [funcoes, setFuncoes] = useState([])
  const [funcaoSelected, setFuncaoSelected] = useState('')
  const [programaSelected, setProgramaSelected] = useState('')
  const [subprogramas, setSubprogramas] = useState([])
  const [subprogramaSelected,setSubprogramaSelected] = useState('')
  const [fases, setFases] = useState([])
  const [faseSelected, setFaseSelected] = useState('')
  const [anoFilter, setAnoFilter] = useState('')
  const [funcaoFilter, setFuncaoFilter] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [programaFilter, setProgramaFilter] = useState('')
  const [subprogramaFilter, setSubprogramaFilter] = useState('')
  

  const Api = useApi()


  const inputStyleLow = {
    width:100
  };

  const botaoStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '2px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: 12,
    width:80,
    marginBottom:5
  };

  const botaoStyleRed = {
    backgroundColor: 'black',
    color: 'white',
    padding: '2px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginLeft:5,
    fontSize: 12,
    width:80
  };

  const getCois = async () => {
    setCois([])
    setLoading(true)
    var res = await Api.getCois()

    if(!res.error) {
      setCois(res.data)
      setCoisCopy(res.data)
    }
    setLoading(false)
  }

  const getFuncoes = async () => {
    setFuncoes([])
    setLoading(true)
    var res = await Api.getFuncoes()

    if(!res.error) {
      setFuncoes(res.data)
    }
    setLoading(false)
  }

  const getProgramas = async () => {
    let res = await Api.getProgramas()
    if(!res.error) {
      setProgramas(res.data)
    }
  }

  const getSubprogramas = async (id) => {
    let res = await Api.getSubProgramas(id)
    if(!res.error) {
      setSubprogramas(res.data)
    }
  }

  const getFases = async (id, fases = false) => {
    let res = await Api.getFases(id)
    if(!res.error) {
      let fases_edit = res.data.map(item=>{
        item.add = false 
        return item
      })
      if(fases) {
        let new_fases = fases_edit.map(i=>{
          let index = fases.findIndex(it=>it.id == i.id)
          if(index >=0) {
            i.add = true
          }
          return i
        })
        setFases(new_fases)
      } else {
        setFases(fases_edit)
      }
      
    }
  }

  const copyCois = () => {
    setCoisCopy(cois)
  }

  useEffect(()=>{
    getCois()
    getProgramas()
    getFuncoes()
  },[])

  useEffect(()=>{
    copyCois()
  },[cois])


  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '2px solid #000',
  };

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
    setNumero('')
    setAno('')
    setFuncaoSelected('')
    setProgramaSelected('')
    setSubprogramaSelected('')
    setFases([])
    setEditMission(false)
    setIdManobraEdit('')
    setTipoSelected('')
    setQuantidadeSelected('')
    setTripulacao([])
  }

  const handleChangeTipo = (e) => {
    setTipoSelected(e.target.value)
  }

  const handleChangePrograma = (e) => {
    setProgramaSelected(e.target.value)
    getSubprogramas(e.target.value)
  }

  const handleChangeFuncao= (e) => {
    setFuncaoSelected(e.target.value)
  }

  const handleChangeSubPrograma= (e) => {
    setSubprogramaSelected(e.target.value)
    getFases(e.target.value)
  }

  const handleChangeFase= (index, add) => {
    let fases_copy = [...fases]

    fases_copy[index].add = add

    setFases(fases_copy)

  }

  const handleEditSaveMission = async () => {
    setLoadingSave(true)
    if(!numero) {
      alert('Número é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(!ano) {
      alert('Ano é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(tripulacao.length < 1) {
      alert('Ao menos um tripulante é necessário!')
      setLoadingSave(false)
      return
    }
    if(tipoSelected == '') {
      alert('Tipo é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(funcaoSelected == '') {
      alert('Função é obrigatória!')
      setLoadingSave(false)
      return
    }
    if(programaSelected == '') {
      alert('Programa é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(subprogramaSelected == '') {
      alert('Subprograma é obrigatório!')
      setLoadingSave(false)
      return
    }
    let fases_add = fases.filter(i=>{
      if (i.add) {
        return i
      }
    })

    let fases_add_map = fases_add.map(i=>{
      return i.id
    })

    if(fases_add.length <=0) {
      alert('Ao menos uma fase é obrigatória!')
      setLoadingSave(false)
      return
    }


    let item = {
      numero,
      ano,
      tipo: tipoSelected,
      funcao: funcaoSelected
    }

    let coi = await Api.updateCoi(idManobraEdit ,item)

    let id_usuarios = tripulacao.map(i=>i.id)

    if(coi.error) {
      alert(coi.error)
      setLoadingSave(false)
      return
    }

    let item_coi_usuarios = {
      users: id_usuarios
    }

    let coi_usuarios = await Api.updateCoiUsuarios(idManobraEdit, item_coi_usuarios)

    if(coi_usuarios.error) {
      alert(coi_usuarios.error)
      setLoadingSave(false)
      return
    }

    let item_coi_fases = {
      fases: fases_add_map
    }

    let coi_fases = await Api.updateCoiFases(idManobraEdit, item_coi_fases)

    if(coi_fases.error) {
      alert(coi_fases.error)
      setLoadingSave(false)
      return
    }

    handleLimparMissao()
    setCaixaCreateVisible(false)
    getCois()
    setLoadingSave(false)
    alert(coi.msg)


  }

  const handleExcluirAviso = (id) => {
    const confirmacao = window.confirm('Deseja mesmo excluir esse COI?');
    if (confirmacao) {
      handleExcluirCoi(id)
    }
  }

  const handleExcluirCoi = async (id) => {
    let res = await Api.deleteCoi(id)
    if(res.error) {
      alert(res.error)
      return
    }
    getCois()
    alert(res.msg)
  }

  const handleEditarCoi = (i) => {
    let tripulacao_get = i.Usuarios.map(it=>{
      return {
        funcao: i.FuncoesAbordo.nome,
        id: it.Trigrama.id_user,
        trigrama: it.Trigrama.trigrama
      }
    })
    setTripulacao(tripulacao_get)
    setNumero(i.numero)
    setAno(i.ano)
    setTipoSelected(i.tipo)
    setFuncaoSelected(i.FuncoesAbordo.id)
    let programa = i.Fases[0].Subprograma.Programa.id
    let subprograma = i.Fases[0].Subprograma.id
    setProgramaSelected(programa)
    setSubprogramaSelected(subprograma)
    getSubprogramas(programa)
    getFases(subprograma, i.Fases)
    setEditMission(true)
    setIdManobraEdit(i.id)
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
    if(!numero) {
      alert('Número é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(!ano) {
      alert('Ano é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(tripulacao.length < 1) {
      alert('Ao menos um tripulante é necessário!')
      setLoadingSave(false)
      return
    }
    if(tipoSelected == '') {
      alert('Tipo é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(funcaoSelected == '') {
      alert('Função é obrigatória!')
      setLoadingSave(false)
      return
    }
    if(programaSelected == '') {
      alert('Programa é obrigatório!')
      setLoadingSave(false)
      return
    }
    if(subprogramaSelected == '') {
      alert('Subprograma é obrigatório!')
      setLoadingSave(false)
      return
    }
    let fases_add = fases.filter(i=>{
      if (i.add) {
        return i
      }
    })

    let fases_add_map = fases_add.map(i=>{
      return i.id
    })

    if(fases_add.length <=0) {
      alert('Ao menos uma fase é obrigatória!')
      setLoadingSave(false)
      return
    }


    let item = {
      numero,
      ano,
      tipo: tipoSelected,
      funcao: funcaoSelected
    }

    let coi = await Api.createCoi(item)

    let id_usuarios = tripulacao.map(i=>i.id)

    if(coi.error) {
      alert(coi.error)
      setLoadingSave(false)
      return
    }

    let item_coi_usuarios = {
      coiId: coi.data.id,
      userlistId: id_usuarios
    }

    let coi_usuarios = await Api.createCoiUsuarios(item_coi_usuarios)

    if(coi_usuarios.error) {
      alert(coi_usuarios.error)
      setLoadingSave(false)
      return
    }

    let item_coi_fases = {
      coiId: coi.data.id,
      faseslistId: fases_add_map
    }

    let coi_fases = await Api.createCoiFases(item_coi_fases)

    if(coi_fases.error) {
      alert(coi_fases.error)
      setLoadingSave(false)
      return
    }

    handleLimparMissao()
    setCaixaCreateVisible(false)
    getCois()
    setLoadingSave(false)
    alert(coi.msg)

  }

  const handleExcluir = () => {

  }

  const handleChangeAnoFilter = (e) => {

    setAnoFilter(e.target.value)

  }

  const handleChangeTipoFilter = (e) => {
    setTipoFilter(e.target.value)
  }
  

  const handleFiltrarClick = () => {
    let dados_copy = [...cois] 

    if(funcaoFilter != '') {
      dados_copy = dados_copy.filter(i=>{
        if(i.FuncoesAbordo.nome == funcaoFilter) {
          return i
        }
      })
    } 

    if(anoFilter != '') {
      dados_copy = dados_copy.filter(i=>{
        if(i.ano == anoFilter) {
          return i
        }
      })
    } 

    if(tipoFilter != '') {
      dados_copy = dados_copy.filter(i=>{
        if(i.tipo == tipoFilter) {
          return i
        }
      })
    } 

    if(programaFilter != '') {
      dados_copy = dados_copy.filter(i=>{
        if(i.Fases.length > 0) {
          if(i.Fases[0].Subprograma.Programa.id == programaFilter) {
            return i
          }
        } 
      })
    } 

    if(subprogramaFilter != '') {
      dados_copy = dados_copy.filter(i=>{
        if(i.Fases.length > 0) {
          if(i.Fases[0].Subprograma.id == subprogramaFilter) {
            return i
          }
        } 
      })
    } 

    setCoisCopy(dados_copy)
    
  }

  const handleLimpar = () => {
    setCoisCopy(cois)
  }

  const handleChangeFuncaoFilter = (e) => {
    setFuncaoFilter(e.target.value)
  }

  const handleChangeProgramaFilter = (e) => {
    setProgramaFilter(e.target.value)
    getSubprogramas(e.target.value)
  }

  const handleChangeSubprogramaFilter = (e) => {
    setSubprogramaFilter(e.target.value)
  }

  const editIsoDate = (date) => {

    let [data, hora] = date.split('T')
    let [ano, mes, dia] = data.split('-')

    return dia+'/'+mes+'/'+ano
  }

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{ display: 'flex', alignItems: 'center',marginTop: '20px', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
           
           {/* Filtro de Ano */}
      <div style={{ marginRight: '20px' }}>
        <label style={{fontWeight: 'bold', marginRight:5}}>Ano:</label>
        <input type="text" value={anoFilter} onChange={handleChangeAnoFilter} style={inputStyleLow}/>
      </div>

          {/* Filtro de Funçao */}
      <div style={{ marginRight: '20px' }}>
        <label style={{fontWeight: 'bold', marginRight:5}}>Função:</label>
        <select style={inputStyle} value={funcaoFilter} onChange={handleChangeFuncaoFilter}>
          <option value="">Selecione</option>
          {funcoes.map(i=>{
            return (
              <option value={i.nome}>{i.nome}</option>
              )
          })}
        </select>
      </div>

             {/* Filtro de Tipo */}
             <div style={{ marginRight: '20px' }}>
        <label style={{fontWeight: 'bold', marginRight:5}}>Tipo:</label>
        <select style={inputStyle} value={tipoFilter} onChange={handleChangeTipoFilter}>
              <option value="">Selecione</option>
                <option value="INICIO">Início</option>
                <option value="TERMINO">Término</option>
                <option value="OUTROS">Outros</option>
            </select>
      </div>

      {/* Filtro de Programa */}
      <div style={{ marginRight: '20px' }}>
        <label style={{fontWeight: 'bold', marginRight:5}}>Programa:</label>
        <select style={inputStyle} value={programaFilter} onChange={handleChangeProgramaFilter}>
          <option value="">Selecione</option>
          {programas.map(i=>{
            return (
              <option value={i.id}>{i.sigla}</option>
              )
          })}
        </select>
      </div>


      {/* Filtro de Subprograma */}
      <div style={{ marginRight: '20px' }}>
        <label style={{fontWeight: 'bold', marginRight:5}}>Subprograma:</label>
        <select style={inputStyle} value={subprogramaFilter} onChange={handleChangeSubprogramaFilter}>
          <option value="">Selecione</option>
          {subprogramas.map(i=>{
            return (
              <option value={i.id}>{i.sigla}</option>
              )
          })}
        </select>
      </div>

      <div className='buttons'>
          <button style={botaoStyle} onClick={handleFiltrarClick}>Filtrar</button>
          <button style={botaoStyleRed} onClick={handleLimpar}>Limpar</button>
        </div>

      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:10 }}>
        <div className='botao-lancar' onClick={()=>setCaixaCreateVisible(true)}>Criar COI</div>
      </div>
      {loading && <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:50}}><LoadingSpinner width="200px" black={true}/></div>}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {coisCopy.map(i=>{
        var trip = []
        var fases = []
        i.Usuarios.forEach((itm, index) => {
          trip.push(itm.Trigrama.trigrama)
        })
        i.Fases.forEach(itm=>{
          fases.push(itm.descricao)
        })
        return (
          <div className='card-missoes-quadrinhos'>
            <div className='left-quadrinhos'>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Número:</span>
              <span> {i.numero}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Ano:</span>
              <span> {i.ano}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Tipo:</span>
              <span> {i.tipo}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Função:</span>
              <span> {i.FuncoesAbordo.nome}</span>
            </div>
            <div className='row-card-quadrinhos'>
                <span className='bold'>Programa:</span>
                <span> {i.Fases.length > 0 ?  i.Fases[0].Subprograma.Programa.sigla : ''}</span>
            </div>
            <div className='row-card-quadrinhos'>
                <span className='bold'>Subprograma:</span>
                <span> {i.Fases.length > 0 ?  i.Fases[0].Subprograma.sigla : ''}</span>
            </div>
            <div className='row-card-quadrinhos'>
                <span className='bold'>Fases:</span>
                <span> {fases.join(' / ')}</span>
            </div>
            <div className='row-card-quadrinhos'>
              <span className='bold'>Data de Criação:</span>
              <span> {editIsoDate(i.data)}</span>
            </div>
            <div className='row-card-quadrinhos'>
                <span className='bold'>Envolvidos:</span>
                <span> {trip.join('-')}</span>
              </div>
            </div>
            <div className='rigth-quadrinhos' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <button className='cancelar' style={{backgroundColor: '#000', marginRight: 5}} onClick={()=>handleEditarCoi(i)}>Editar</button>
            <button className='cancelar' style={{marginRight: 5}} onClick={()=>handleExcluirAviso(i.id)}>Excluir</button>
            <div className='right-botoes-quadrinhos'>
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
              <h3 style={{color:'#fff'}}>{editMission ? 'Editar' :  'Criar'} COI</h3>
            </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
      <span style={{color:'#fff'}}>Número: </span>
      <input type="number" disabled={disabled} value={numero} onChange={(e)=>setNumero(e.target.value)} style={{borderRadius: 10, padding:5}}/>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
      <span style={{color:'#fff'}}>Ano: </span>
      <input type="number" disabled={disabled} value={ano} onChange={(e)=>setAno(e.target.value)} style={{borderRadius: 10, padding:5}}/>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
    <span style={{color:'#fff'}}>Tipo: </span>
            <select style={inputStyle} value={tipoSelected} onChange={handleChangeTipo}>
              <option value="">Selecione</option>
                <option value="INICIO">Início</option>
                <option value="TERMINO">Término</option>
                <option value="OUTROS">Outros</option>
            </select>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
    <span style={{color:'#fff'}}>Função a Bordo: </span>
            <select style={inputStyle} value={funcaoSelected} onChange={handleChangeFuncao}>
              <option value="">Selecione</option>
                {funcoes.map(itm=>{
                  return (
                    <option value={itm.id}>{itm.nome}</option>
                  )
                })}
            </select>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column', marginTop:50}}>
    <span style={{color:'#fff'}}>Programa: </span>
            <select style={inputStyle} value={programaSelected} onChange={handleChangePrograma}>
              <option value="">Selecione</option>
                {programas.map(itm=>{
                  return (
                    <option value={itm.id}>{itm.sigla}</option>
                  )
                })}
            </select>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
    <span style={{color:'#fff'}}>Sub Programa: </span>
            <select style={inputStyle} value={subprogramaSelected} onChange={handleChangeSubPrograma}>
              <option value="">Selecione</option>
                {subprogramas.map(itm=>{
                  return (
                    <option value={itm.id}>{itm.sigla}</option>
                  )
                })}
            </select>
    </div>
    <div style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
    <span style={{color:'#fff'}}>Fases: </span>
        {fases.map((item, index)=>{
          return (
            <div className='item-fase'>
              <span>{item.descricao}</span>
              {item.add ? 
              <img src={'https://1gtt.com.br/app/correct.png'} style={{cursor: 'pointer', marginRight:10}} width='20px' onClick={()=>{handleChangeFase(index, false)}} /> :
              <div className='select-area' style={{cursor: 'pointer'}} onClick={()=>{handleChangeFase(index, true)}}>
              </div>
            }
            </div>
          )
        })}
    </div>

    <div className='add-trip' style={{marginTop:50}}>
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
      {loadingSave ? <LoadingSpinner/> : <button className='adicionar' style={{fontSize: '1vw'}} onClick={editMission ? handleEditSaveMission : handleSaveMissao}>{editMission ? 'Editar COI' : 'Criar COI'}</button>}
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
