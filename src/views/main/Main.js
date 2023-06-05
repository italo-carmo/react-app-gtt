import React, { useEffect, useState } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useApi from 'src/services/Api'
import DatePicker, {registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react'
import MaskedInputIcao from '../../components/masked-input-icao'
import TimeMaskedInput from 'src/components/masked-hours'
import DateMaskedInput from 'src/components/masked-date'
import moment from 'moment';
import 'moment-timezone';
import EtapaItem from 'src/components/etapaItemAdd'
import LoadingSpinner from 'src/components/Loading'

moment.tz.setDefault('Etc/UTC');

const Dashboard = () => {

  const [tripulacao,setTripulacao] = useState([])
  const [id,setId] = useState([])
  const [caixaVisible, setCaixaVisible] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [editMission, setEditMission] = useState(false)
  const [editEtapa, setEditEtapa] = useState(false)
  const [indexEditEtapa, setIndexEditEtapa] = useState(false)
  const [semana, setSemana] = useState([])
  const [firstDay, setFirstDay] = useState(new Date())
  const [hoje, setHoje] = useState(new Date())
  const [data, setData] = useState({avioes:[]})
  const [etapaToShow, setEtapaToShow] = useState('')
  const [addEtapa, setAddEtapa] = useState(false)
  const [icaoOrigemAdd, setIcaoOrigemAdd] = useState('')
  const [icaoDestinoAdd, setIcaoDestinoAdd] = useState('')
  const [errorEtapaAdd, setErrorEtapaAdd] = useState('')
  const [dataEtapa, setDataEtapa] = useState(new Date())
  const [dataEtapaPouso, setDataEtapaPouso] = useState(new Date())
  const [erroIcaoOrigem, setErroIcaoOrigem] = useState(false)
  const [erroIcaoPouso, setErroIcaoPouso] = useState(false)
  const [etapas, setEtapas] = useState({aviao: '', eventos:[]})
  const [aeronaveMissao, setAeronaveMissao] = useState([])
  const [idAeronaveMissao,setIdAeronaveMissao] = useState('')
  const [aeronaves, setAeronaves] = useState([])
  const [loadingExcluir, setLoadingExcluir] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [idMissaoEdit, setIdMissaoEdit] = useState('')

  const Api = useApi()

  const handleMouseEnter = (id,etapa) => {
    setId(id)
    setTripulacao(etapa.tripulacao.join('/'))
    setEtapaToShow(etapa)
    setCaixaVisible(true);
  };

  const handleMouseLeave = () => {
    setCaixaVisible(false);
  };

  const handleEditMission = (missao) => {
    setLoadingExcluir(false)
    setLoadingSave(false)
    setEditMission(true)
    setEditEtapa(false)
    let id_missao = missao.eventos[0].missao.id_missao
    setIdMissaoEdit(id_missao)
    console.log(id_missao)
    let etapas_copy = {...etapas}
    etapas_copy.eventos = missao.eventos
    setEtapas(etapas_copy)
    setCaixaCreateVisible(true)
    setAeronaveMissao(missao.aviao)
    let index = aeronaves.findIndex(i=>i.aeronave == missao.aviao)
    if(index >=0) {
      setIdAeronaveMissao(aeronaves[index].id)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(editEtapa) {
        handleEditEtapa()
      } else {
        handleAddEtapa();
      }
   
    }
  };

  const handleCloseModal = () => {
    const confirmacao = window.confirm('Deseja mesmo sair? Todos os dados adicionados até o momento serão perdidos');
    if (confirmacao) {
      handleLimparMissao()
     setCaixaCreateVisible(false)
    }
  }

  const   getDias = (hoje, reseta = false) => {
    console.log('get dias')
    let hoje_copy = new Date(hoje)
    hoje_copy.setDate(hoje_copy.getDate() - 3);
    let dias = []
    for(var i=0;i<=6;i++) {
      if(i!=0){
        var hoje_sum = hoje_copy.setDate(hoje_copy.getDate() + 1);
      } else {
        var hoje_sum = hoje_copy.setDate(hoje_copy.getDate());
      }
      let hoje_sum_date = new Date(hoje_sum)
      let dia = hoje_sum_date.getDate()
      let mes = (hoje_sum_date.getMonth()+1)
      let ano = (hoje_sum_date.getFullYear())
      if(dia<=9) {
        dia= '0'+dia
      }
      if(mes<=9) {
        mes= '0'+mes
      }
      let hoje_sum_formatted = dia+'/'+mes+'/'+ano
      dias.push(hoje_sum_formatted)
    }
    setSemana(dias)
    getMissoes(dias, reseta)
  }

  const getMissoes = async (dias, reseta = false) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res = await Api.getMissoesAvioes({inicio, fim})

    if(!res.error) {
      let missoes = res.data
      /*let index_missoes = missoes.findIndex(i=>i.aviao == etapas.aviao)
       if(index_missoes >=0) {
        etapas.eventos.forEach(it=>{
            missoes[index_missoes].eventos.push(it)
          })
        }*/

      if(!reseta) {
        if(etapas.eventos.length > 0) {
          let index = missoes.findIndex(i=>i.aviao ==aeronaveMissao)
          if(index >=0) {
            etapas.eventos.forEach(it=>{
              missoes[index].eventos.push(it)
            })
          }
        }
      }
      setData({avioes:missoes})
    }
  }

  const getAeronaves = async () => {
    let res = await Api.getAeronaves()
    if(!res.error) {
      setAeronaves(res.data)
    }
  }

  const handleCheckDate = (numero, tipo) => {
    let firstDayCopy = new Date(firstDay);
    if(tipo) {
      firstDayCopy.setDate(firstDayCopy.getDate() - numero);
    } else {
      firstDayCopy.setDate(firstDayCopy.getDate() + numero);
    }
    setFirstDay(firstDayCopy)
  }

  const getHoje = () => {
    setFirstDay(hoje)
  }

  const handleCreate = () => {
    setLoadingExcluir(false)
    setLoadingSave(false)
    setEditMission(false)
    setCaixaCreateVisible(true)
  }

  const handleCancel = () => {
    setIcaoOrigemAdd('')
    setIcaoDestinoAdd('')
    setDataEtapa('')
    setDataEtapaPouso('')
    setAddEtapa(false)
    setEditEtapa(false)
  }

  const getHorarioPouso = async () => {
    if(dataEtapa != '' && dataEtapaPouso != '' && icaoOrigemAdd.length == 4 && icaoDestinoAdd.length == 4 ) {
      setErroIcaoOrigem(false)
      setErroIcaoPouso(false)
      setErrorEtapaAdd('')
      let res = await Api.getDistanciaAerodromos({origem:icaoOrigemAdd, destino:icaoDestinoAdd})
      if(!res.error) {
        let distancia = res.data.distancia
        let minutos = Math.round((distancia*60)/400)
        minutos = Math.ceil(minutos / 5) * 5
        let data_dep_copy = new Date(dataEtapa)
        data_dep_copy.setMinutes(data_dep_copy.getMinutes() + minutos)
        setDataEtapaPouso(data_dep_copy)
      } else {
        let error = res.error
        setErrorEtapaAdd(res.error)
        if(error.includes(icaoOrigemAdd)) {
          setErroIcaoOrigem(true)
        }
        if(error.includes(icaoDestinoAdd)) {
          setErroIcaoPouso(true)
        }
      }
    }
  }

  const getNewEtapa = (icaoDep, horarioDep) => {
    setIcaoDestinoAdd('')
    let new_date = new Date(horarioDep)
    new_date.setMinutes(new_date.getMinutes()+120)
    var offset = new_date.getTimezoneOffset();
    // Convertendo a data para UTC
    new_date.setMinutes(new_date.getMinutes() + offset);

    setDataEtapa(new_date)
    setIcaoOrigemAdd(icaoDep)
    setDataEtapaPouso(new_date)
  }

 

  const handleTrocaAviao = () => {
    if(etapas.eventos.length > 0) {

      let data_copy = {...data}

      data_copy.avioes.forEach((item, idx)=>{
      if(item.eventos.length > 0) {
        let new_item = item.eventos.filter(i=>{
          let index = etapas.eventos.findIndex(it=>it.missao.id==i.missao.id)
          if(index<0) {
            return i
          }
        })
        data_copy.avioes[idx].eventos = new_item
      }
      })

      let index_data = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
      if(index_data >= 0) {
        etapas.eventos.forEach(i=>{
          data_copy.avioes[index_data].eventos.push(i)
        })
      }
      setData(data_copy)
    }
  }

  const handleSaveMissao =  async() => {
    setLoadingSave(true)
    if(!editMission) {
      if(aeronaveMissao == '' || etapas.eventos.length == 0) {
        alert('Todos os campos são obrigatórios!')
        setLoadingSave(false)
        return
      }
      let res = await Api.createMissao()
      if(!res.error) {
         let id_missao = res.data.id
         etapas.eventos.forEach(async (item, index)=>{
           var res_dep = await Api.getAerodromo(item.missao.dep)
           var res_pouso = await Api.getAerodromo(item.missao.pouso)
           let data_item = {
             dep: item.missao.depISO,
             pouso: item.missao.pousoISO,
             id_missao: id_missao,
             id_aeronave: idAeronaveMissao,
             id_dep: res_dep.data.id,
             id_pouso: res_pouso.data.id,
           }
           let res_etapa = await Api.createEtapa(data_item)
         
           if(res_etapa.error) {
             alert(res.etapa.error)
             return
           } else {
            if(index == (etapas.eventos.length -1)){
              setData({avioes:[]})
              console.log('setou data')
              handleLimparMissao()
              getDias(firstDay, true)
              setCaixaCreateVisible(false)
              setLoadingSave(false)
              console.log(etapas)
              console.log(data)
             }
           }
    
         })
         setLoadingSave(false)
       } else {
        setLoadingSave(false)
        alert(res.error)
       }
    } 
    getDias(firstDay)
  }


  const handleEditSaveMission = async () => { 
    setLoadingSave(true)
    var id_missao = idMissaoEdit
    
    let etapas_map = etapas.eventos.map(async (i)=>{
        let item = {}
        var res_dep = await Api.getAerodromo(i.missao.dep)
        var res_pouso = await Api.getAerodromo(i.missao.pouso)
        item.dep = i.missao.depISO
        item.pouso = i.missao.pousoISO
        item.id_aeronave = idAeronaveMissao
        item.id_dep = res_dep.data.id
        item.id_pouso = res_pouso.data.id
        if(i.missao.edicao) {
          item.id = null
        } else {
          item.id = i.missao.id
        }
        return item
      })
    
    let etapas_final = await Promise.all(etapas_map)
    let dados = {etapas:etapas_final, id_missao}
    console.log(dados)
    let res = await Api.updateMissao(dados)
    if(res.error) {
      setLoadingSave(false)
      alert(res.error)
      return
    } else {
      handleLimparMissao()
      setCaixaCreateVisible(false)
      getDias(firstDay, true)
    }

  }

  const handleExcluir = async () => {
    setLoadingExcluir(true)
    const confirmacao = window.confirm('Deseja mesmo excluir essa missão?');
    if (confirmacao) {
      let id = etapas.eventos[0].missao.id_missao
      let res = await Api.deleteMissao(id)
      if(res.error) {
        setLoadingExcluir(false)
        alert(res.error)
        return
      }
      setLoadingExcluir(false)
      setData({avioes:[]})
      handleLimparMissao()
      setCaixaCreateVisible(false)
      getDias(firstDay, true)
    }
    setLoadingExcluir(false)

  }

  const handleLimparMissao = () => {
    console.log('limpou missoes')
    setEtapas({aviao: '', eventos:[]})

    let data_copy = {...data}
    let index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)

    if(index>=0) {
      data_copy.avioes[index].eventos =  data_copy.avioes[index].eventos.filter(item=>{
        if(!item.missao.edicao) {
          return item
        }
      })
    }

    setData(data_copy)

    setIcaoDestinoAdd('')
    setIcaoOrigemAdd('')
    setDataEtapa(new Date())
    setDataEtapaPouso(new Date())
    setAeronaveMissao( '')
    setEditMission(false)
    setEditEtapa(false)
    getDias(firstDay)
  }

  const handleEditEtapa = () => {
    setErrorEtapaAdd('')
    if(icaoDestinoAdd == '' || icaoOrigemAdd == '' || dataEtapa == '' || dataEtapaPouso == '') {
      setErrorEtapaAdd('Todos os campos são obrigatórios')
      return
    }
    if(aeronaveMissao == '') {
      setErrorEtapaAdd('A aeronave é obrigatória')
      return
    }

    var offset_dep = dataEtapa.getTimezoneOffset();
    // Convertendo a data para UTC
    dataEtapa.setMinutes(dataEtapa.getMinutes() - offset_dep);
    var offset_pouso = dataEtapaPouso.getTimezoneOffset();
    // Convertendo a data para UTC
    dataEtapaPouso.setMinutes(dataEtapaPouso.getMinutes() - offset_pouso);

    let data_dep_string = dataEtapa.toISOString()
    let data_pouso_string = dataEtapaPouso.toISOString()
    let [data_dep, hora_dep] = data_dep_string.split('T')
    let [data_pouso, hora_pouso] = data_pouso_string.split('T')

    let [ano_dep, mes_dep, dia_dep] = data_dep.split('-')

    let [hora_dep_split, minuto_dep, segundo_dep] = hora_dep.split(':')
    let [hora_pouso_split, minuto_pouso, segundo_pouso] = hora_pouso.split(':')

    let etapas_copy = {...etapas}
    let data_copy = {...data}

    let find_item = etapas_copy.eventos[indexEditEtapa]

    let evento = {
      data: `${dia_dep}/${mes_dep}/${ano_dep}`,
      tipo: "missao",
      missao: {
        id: find_item.missao.id,
        dep: icaoOrigemAdd,
        horaDep: `${hora_dep_split}:${minuto_dep}Z`,
        pouso: icaoDestinoAdd,
        horaPouso:  `${hora_pouso_split}:${minuto_pouso}Z`,
        depISO:dataEtapa,
        pousoISO: dataEtapaPouso,
        tripulacao: [],
        omis: '',
        edicao: find_item.missao.edicao
      },
      manutencao: null
    }
    etapas_copy.eventos[indexEditEtapa] = evento
    setEtapas(etapas_copy)

    var index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
    if(index >=0) {
      let index_data = data_copy.avioes[index].eventos.findIndex(i=>i.missao.id == find_item.missao.id)
      if(index_data >=0) {
        data_copy.avioes[index].eventos[index_data] = evento
        setData(data_copy)
      }
    }

    let last_icao = etapas_copy.eventos[etapas_copy.eventos.length -1].missao.pouso
    let last_pouso = etapas_copy.eventos[etapas_copy.eventos.length -1].missao.pousoISO
    setEditEtapa(false)
    setIndexEditEtapa('')
    getNewEtapa(last_icao, last_pouso)
  }

  const handleAddEtapa = async () => {
    setErrorEtapaAdd('')
    if(icaoDestinoAdd == '' || icaoOrigemAdd == '' || dataEtapa == '' || dataEtapaPouso == '') {
      setErrorEtapaAdd('Todos os campos são obrigatórios')
      return
    }
    if(aeronaveMissao == '') {
      setErrorEtapaAdd('A aeronave é obrigatória')
      return
    }
    var offset_dep = dataEtapa.getTimezoneOffset();
    // Convertendo a data para UTC
    dataEtapa.setMinutes(dataEtapa.getMinutes() - offset_dep);
    var offset_pouso = dataEtapaPouso.getTimezoneOffset();
    // Convertendo a data para UTC
    dataEtapaPouso.setMinutes(dataEtapaPouso.getMinutes() - offset_pouso);

    let data_dep_string = dataEtapa.toISOString()
    let data_pouso_string = dataEtapaPouso.toISOString()
    let [data_dep, hora_dep] = data_dep_string.split('T')
    let [data_pouso, hora_pouso] = data_pouso_string.split('T')

    let [ano_dep, mes_dep, dia_dep] = data_dep.split('-')

    let [hora_dep_split, minuto_dep, segundo_dep] = hora_dep.split(':')
    let [hora_pouso_split, minuto_pouso, segundo_pouso] = hora_pouso.split(':')

    let evento = {
      data: `${dia_dep}/${mes_dep}/${ano_dep}`,
      tipo: "missao",
      missao: {
        id: Math.floor(Math.random() * 10000) + 1,
        dep: icaoOrigemAdd,
        horaDep: `${hora_dep_split}:${minuto_dep}Z`,
        pouso: icaoDestinoAdd,
        horaPouso:  `${hora_pouso_split}:${minuto_pouso}Z`,
        depISO:dataEtapa,
        pousoISO: dataEtapaPouso,
        tripulacao: [],
        omis: '',
        edicao: true
      },
      manutencao: null
    }

    let etapas_copy = {...etapas}

    etapas_copy.eventos.push(evento)
    let data_copy = {...data}

    var index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
    if(index >=0) {
      data_copy.avioes[index].eventos.push(evento)
    }
    setData(data_copy)
    setEtapas(etapas_copy)

    getNewEtapa(icaoDestinoAdd, dataEtapaPouso)
  }

  const getDadosEditEtapa = (index) => {
    let etapas_copy = {...etapas}
    let etapa = etapas_copy.eventos[index]
    //console.log(etapas_copy)
    setIcaoOrigemAdd(etapa.missao.dep)
    setIcaoDestinoAdd(etapa.missao.pouso)

    if(typeof(etapa.missao.depISO) == 'string') {
      etapa.missao.depISO = new Date(etapa.missao.depISO)
    }
    if(typeof(etapa.missao.pousoISO) == 'string') {
      etapa.missao.pousoISO = new Date(etapa.missao.pousoISO)
    }
    var offset_dep = etapa.missao.depISO.getTimezoneOffset();
    // Convertendo a data para UTC
    etapa.missao.depISO.setMinutes(etapa.missao.depISO.getMinutes() + offset_dep);

    var offset_pouso = etapa.missao.pousoISO.getTimezoneOffset();
    // Convertendo a data para UTC
    etapa.missao.pousoISO.setMinutes(etapa.missao.pousoISO.getMinutes() + offset_pouso);
    setDataEtapa(etapa.missao.depISO)
    setDataEtapaPouso(etapa.missao.pousoISO)
  }

  /*useEffect(()=>{
    getDias(firstDay)
  }, [etapas])*/

  useEffect(()=>{
    handleTrocaAviao()
  },[aeronaveMissao])

  useEffect(()=>{
    getHorarioPouso()
  },[icaoDestinoAdd, icaoOrigemAdd, dataEtapa])
  

  useEffect(()=>{
    getDias(firstDay)
    getAeronaves()
  },[firstDay])

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendario" onClick={onClick} ref={ref}>
      {(firstDay.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()) + '/' + firstDay.getFullYear()}
    </button>
  ));

  const DateInput = ({ value, onClick }) => (
    <button className="calendario" onClick={onClick}>
    +
    </button>
  )

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column'}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <div className=''>
          <DatePicker 
          selected={firstDay}
          timeInputLabel={(firstDay.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()) + '/' + firstDay.getFullYear()}
          onChange={(date) => setFirstDay(date)}
          customInput={<ExampleCustomInput />}
          />
          </div>
          <div className='botoes'>
          <button className="calendario" onClick={() => handleCheckDate(7, true)}>&lt;&lt;</button>
          <button className="calendario" onClick={() => handleCheckDate(1, true)}>&lt;</button>
          <button className="calendario" onClick={getHoje}>HOJE</button>
          <button className="calendario" onClick={() => handleCheckDate(1, false)}>&gt;</button>
          <button className="calendario" onClick={() => handleCheckDate(7, false)}>&gt;&gt;</button>
          </div>
          <div>
            <button onClick={handleCreate} className='criar'>Criar Missão</button>
          </div>
        </div>
         <div style={{display: 'flex', flexDirection:'column', width:'100%'}}>
          <div className='topo'>
            <div className='missao'>Avião</div>
            {semana.map((item,index)=>{
                var hoje_dia = hoje.getDate()
                let hoje_mes = (hoje.getMonth()+1)
                let hoje_ano = hoje.getFullYear()
                if(hoje_dia <=9) {
                  hoje_dia = '0'+hoje_dia
                }
                if(hoje_mes <=9) {
                  hoje_mes = '0'+hoje_mes
                }
                let hoje_string = hoje_dia+'/'+hoje_mes+'/'+hoje_ano

                return <div  className='missao' style={{backgroundColor: hoje_string == item ? '#46a31d' : '#000'}}>{item}</div>
            })}
          </div>
          <div className='missoes'>
            

            {(data.avioes.length > 0 ) && data.avioes.map(item=>{
              return <div className='missao-item'>
                <div className='missao aviao'>{item.aviao}</div>
                {semana.map(i=>{
                 return <div className='item-missao'>
                      {item.eventos.length >0 && item.eventos.map(it=>{
                          if(it.data == i) {
                            return <div 
                            onClick={()=>handleEditMission(item)} className='missao-white white'
                            onMouseEnter={() => handleMouseEnter(it.missao.id, it.missao)}
                            onMouseLeave={handleMouseLeave}
                            >  
                         {caixaVisible && (id ==it.missao.id) && (it.missao.id != null)  &&  <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: '0',
                              background: '#000',
                              color: '#fff',
                              padding: '10px',
                              border: '1px solid black',
                              zIndex: 1, // Definindo uma ordem de empilhamento maior para a div das informações
                            }}
                          >
                            <p>OMIS: {etapaToShow.omis}</p>
                            <p>Tripulação: {tripulacao}</p>
                            
                          </div>}
                          <div className='text-missao'>{it.missao.horaDep} {it.missao.dep}</div>  
                          <div className='text-missao'>{it.missao.horaPouso} {it.missao.pouso} </div>
                          </div>
                          }
                      })}
                    </div>
                })}
              </div>
            })}
            </div>
         </div>

          <div className={caixaCreateVisible ? 'modal-create-visible' : 'modal-create'}>
            <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
              <div onClick={handleCloseModal} style={{color:'#fff'}}>X</div>
            </div>
            <div className='criar-div'>
              <h3 style={{color:'#fff'}}>{editMission ? 'Editar' :  'Criar'} Missão</h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:20, alignItems: 'center'}}>
              <h5 style={{color:'#fff'}}>Avião:</h5>
              {aeronaves.map(item=>{
                return <button onClick={()=>{
                  setAeronaveMissao(item.aeronave)
                  setIdAeronaveMissao(item.id)
                  let etapas_copy = {...etapas}
                  etapas_copy.aviao = item.aeronave
              
                  setEtapas(etapas_copy)
                }} style={{backgroundColor: aeronaveMissao == item.aeronave ? '#28a745' : '#FFF' , color: aeronaveMissao == item.aeronave ? '#fff' : '#000' }} className='calendario'>{item.aeronave}</button>
              })}
            </div>
            <div className='add-etapa'>
                <h5 style={{color:'#fff'}}>Etapas:</h5>
                <img onClick={()=>{
                  if(!editEtapa && addEtapa) {
                    setAddEtapa(false)
                  }
                  if(!editEtapa && !addEtapa) {
                    setAddEtapa(true)
                    if(etapas.eventos.length > 0) {
                      let icao = etapas.eventos[etapas.eventos.length - 1].missao.pouso
                      let horarioPouso = etapas.eventos[etapas.eventos.length - 1].missao.pousoISO
                      getNewEtapa(icao, horarioPouso)
  
                    }
                  }
                  if(editEtapa) {
                    setEditEtapa(false)
                  }
                  }} style={{cursor: 'pointer'}} src='https://www.1gtt.com.br/app/add-white.png' width={20} height={20} />
            </div>
            {(addEtapa || editEtapa) && 
                 <div className='form-area'>
                    <div className='form-add'>
                   <span style={{color:'#000'}}>DEP: </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  {dataEtapa.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric'})+'Z'}
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataEtapa}
                      timeInputLabel={dataEtapa}
                      onChange={(date) => {
                        //var offset = date.getTimezoneOffset();
                        // Convertendo a data para UTC
                        //date.setMinutes(date.getMinutes() - offset);
                        setDataEtapa(date);
                        }}
                      customInput={<DateInput />}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={10}
                      dateFormat="LLL"
                      timeZone="Etc/UTC"
                      timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
                      />
                      </div>
                  </div>
                 </div>
                 <div className='form-add'>
                   <span style={{color:'#000'}}>ICAO de Origem: </span>
                   <MaskedInputIcao erro={erroIcaoOrigem}  maxLength={4} value={icaoOrigemAdd} onChange={setIcaoOrigemAdd}/>
                 </div>
                 <div className='form-add'>
                   <span style={{color:'#000'}}>ICAO de Destino: </span>
                   <MaskedInputIcao onKeyPress={handleKeyPress} erro={erroIcaoPouso} maxLength={4} value={icaoDestinoAdd} onChange={setIcaoDestinoAdd}/>
                 </div>
                 <div className='form-add'>
                   <span style={{color:'#000'}}>Pouso: </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  {dataEtapaPouso.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })+'Z'}
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataEtapaPouso}
                      timeInputLabel={dataEtapaPouso}
                      onChange={(date) => {
                        //var offset = date.getTimezoneOffset();
                        // Convertendo a data para UTC
                        //date.setMinutes(date.getMinutes() - offset);
                        setDataEtapaPouso(date);
                      }}
                      customInput={<DateInput />}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={10}
                      dateFormat="LLL"
                      />
                      </div>
                  </div>
                 </div>
                 <div className='botoes-add-etapa'>
                 <button onClick={handleCancel} className='cancelar'>Cancelar</button>
                  <button  className='adicionar' onClick={editEtapa ? handleEditEtapa : handleAddEtapa}>{editEtapa ? 'Editar' : 'Adicionar'}</button>
                 </div>
                {errorEtapaAdd != '' &&  <div style={{marginTop:10}} class="alert alert-danger" role="alert">
                    {errorEtapaAdd}
                </div>}
               </div>
            }

            {etapas.eventos.map((item, index)=>{
              return <EtapaItem 
                      edit={()=>{
                        setIndexEditEtapa(index)
                        setEditEtapa(true)
                        getDadosEditEtapa(index)
                      }} 
                      del={()=>{
                        let etapas_copy = {...etapas}
                        
                        let eventos_filter = etapas_copy.eventos.filter((it, id) => {
                          if(id != index) {
                            return it
                          }
                        })
                        etapas_copy.eventos = eventos_filter
                        setEtapas(etapas_copy)
                      }} 
                      index={index} 
                      dep={item.missao.dep} 
                      pouso={item.missao.pouso} 
                      horaDep={item.missao.horaDep} 
                      horaPouso={item.missao.horaPouso} />
            })}
    <div className='botoes-add-etapa' style={{marginTop:30}}>
    <button className='cancelar' style={{fontSize: '1vw'}} onClick={handleLimparMissao}>Limpar</button>
      {loadingSave ? <LoadingSpinner/> : <button className='adicionar' style={{fontSize: '1vw'}} onClick={editMission ? handleEditSaveMission : handleSaveMissao}>{editMission ? 'Editar Missão' : 'Criar Missão'}</button>}
    </div>

    <div className='botoes-add-etapa' style={{marginTop:30, justifyContent:'center'}}>
      {loadingExcluir && <LoadingSpinner />}
      {
        editMission ? <button className='cancelar' style={{fontSize: '1.3vw'}} onClick={handleExcluir}>Excluir Missão</button>
         :  <></>
      }

    </div>
        </div>
       
    
      </CCard>


     
    </>
  )
}

export default Dashboard
