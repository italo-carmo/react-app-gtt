import React, { useEffect, useState, useRef } from 'react'
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
import MaskedInputTrigrama from '../../components/masked-trigrama'
import MaskedNumeroOmis from '../../components/masked-numero-omis'
import MaskedCombustivel from '../../components/masked-combustivel'
import MaskedCiclos from '../../components/masked-ciclos'
import MaskedHoras from '../../components/masked-horas'
import MaskedObs from '../../components/masked-inpput-text-obs'
import MaskedString from '../../components/masked-string'
import MaskedObsTextArea from '../../components/masked-inpput-text-obs-textarea'
import TimeMaskedInput from 'src/components/masked-hours'
import DateMaskedInput from 'src/components/masked-date'
import moment from 'moment';
import 'moment-timezone';
import EtapaItem from 'src/components/etapaItemAdd'
import LoadingSpinner from 'src/components/Loading'

moment.tz.setDefault('Etc/UTC');

const Dashboard = () => {

  const [tripulacao,setTripulacao] = useState([])
  const [tripulacaoShow,setTripulacaoShow] = useState([])
  const [id,setId] = useState([])
  const [caixaVisible, setCaixaVisible] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [caixaCreateVisibleObs, setCaixaCreateVisibleObs] = useState(false)
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
  const [icaoAltAdd, setIcaoAltAdd] = useState('')
  const [errorEtapaAdd, setErrorEtapaAdd] = useState('')
  const [dataEtapa, setDataEtapa] = useState(new Date())
  const [dataEtapaPouso, setDataEtapaPouso] = useState(new Date())
  const [erroIcaoOrigem, setErroIcaoOrigem] = useState(false)
  const [erroIcaoPouso, setErroIcaoPouso] = useState(false)
  const [erroIcaoAlt, setErroIcaoAlt] = useState(false)
  const [errorCumprir, setErrorCumprir] = useState('')
  const [cumprir, setCumprir] = useState(false)
  const [errorTripulante, setErrorTripulante] = useState(false)
  const [etapas, setEtapas] = useState({aviao: '', eventos:[]})
  const [aeronaveMissao, setAeronaveMissao] = useState([])
  const [idAeronaveMissao,setIdAeronaveMissao] = useState('')
  const [idRascunhoToShow,setIdRascunhoToShow] = useState('')
  const [aeronaves, setAeronaves] = useState([])
  const [loadingExcluir, setLoadingExcluir] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [loadingCumprir, setLoadingCumprir] = useState(false)
  const [idMissaoEdit, setIdMissaoEdit] = useState('')
  const [trigrama, setTrigrama] = useState('')
  const [omis, setOmis] = useState('')
  const [comentarios, setComentarios] = useState('')
  const [esforco, setEsforco] = useState('')
  const [ofragSelected, setOfragSelected] = useState('')
  const [ofrags, setOfrags] = useState([])
  const [combustivel, setCombustivel] = useState(0)
  const [disabledOmis, setDisabledOmis] = useState(true)
  const [modalAviao, setModalAviao] = useState(false)
  const [ciclos, setCiclos] = useState('')
  const [horas, setHoras] = useState('')
  const [aviaoSelectedModal, setAviaoSelectedModal] = useState('')
  const [situacaoAviao, setSituacaoAviao] = useState('')
  const [atualizador, setAtualizador] = useState('')
  const [dataAtualizacao, setDataAtualizacao] = useState('')
  const [idAeronaveModal, setIdAeronaveModal] = useState('')
  const [observacoes, setObservacoes] = useState([])
  const [caixaObsVisible, setCaixaObsVisible] = useState(false)
  const [obsText, setObsText] = useState('')
  const [isEditObs, setIsEditObs] = useState(false)
  const [isEditRascunho, setIsEditRascunho] = useState(false)
  const [caixaCreateVisibleObsEdit, setCaixaCreateVisibleObsEdit]=useState(false)
  const [caixaCreateVisibleSobreaviso, setCaixaCreateVisibleSobreaviso]=useState(false)
  const [tituloObs, setTituloObs] = useState('')
  const [comentarioObs, setComentarioObs] = useState('')
  const [configuracao, setConfiguracao] = useState('')
  const [dataInicioObs, setDataInicioObs] = useState(new Date())
  const [dataFimObs, setDataFimObs] = useState(new Date())
  const [idObs, setIdObs] = useState('')
  const [manutencoes, setManutencoes] = useState([])
  const [isEditManut, setIsEditManut] = useState(false)
  const [caixaCreateManutencaoVisible, setCaixaCreateManutencaoVisible]=useState(false)
  const [tituloManutencao, setTituloManutencao] = useState('')
  const [comentariosManutencao, setComentariosManutencao] = useState('')
  const [dataInicioManut, setDataInicioManut] = useState(new Date())
  const [dataFimManut, setDataFimManut] = useState(new Date())
  const [idAeronaveManut, setIdAeronaveManut] = useState('')
  const [idManut, setIdManut] = useState('')
  const [aerononaveManut, setAerononaveManut] = useState('')
  const [ofragToShow, setOfragToShow] = useState('')
  const [sobreavisos, setSobreavisos] = useState([])
  const [dataSobreaviso,setDataSobreaviso] = useState(new Date())
  const [editSobreaviso, setEditSobreaviso] = useState(false)
  const [idSobreaviso,setIdSobreaviso] = useState('')
  const [rascunhos,setRascunhos] = useState([])
  const [caixaCreateVisibleRascunho, setCaixaCreateVisibleRascunho] = useState(false)
  const [planejamento, setPlanejamento] = useState('')
  const [ofrag, setOfrag] = useState('')
  const [trip, setTrip] = useState('')
  const [obs, setObs] = useState('')
  const [dataRascunho, setDataRascunho] = useState('')
  const [idAeronaveRascunho, setIdAeronaveRascunho] = useState('')
  const [cor, setCor] = useState('#ccc')
  const [statusSelected, setStatusSelected] = useState('#fff000')
  const [idRascunho, setIdRascunho] = useState('')
  const [selecao, setSelecao] = useState(false)
  const [selecionados, setSelecionados] = useState([])
  const [caixaCreateVisibleRascunhoAeronave, setCaixaCreateVisibleRascunhoAeronave] = useState(false)
  const [aeronaveRascunho, setAeronaveRascunho] = useState('')
  const [rascunhoToShow, setRascunhoToShow] = useState('')
  const [caixaVisibleRascunho, setCaixaVisibleRascunho] = useState(false)

  const [longPressTimer, setLongPressTimer] = useState(null);

  const situacoes = ["DI", "DO", "IN", "IS", "II"]
  const cores = [{label: 'Planejamento', value: '#fff000'}, {label: 'PRPO', value: '#00ffff'}, {label: 'OPFM', value: '#FC0FC0'}]
  const inputPousoRef = useRef(null)
  const inputAltRef = useRef(null)
  const divRef = useRef(null);

  const Api = useApi()

  const handleMouseEnter = (id,etapa, missao) => {
    setId(id)
    let trip_show = etapa.tripulacao.map(item=>{
      return item.trigrama
    })

    setTripulacaoShow(trip_show.join('/'))
    setEtapaToShow(etapa)
    if(missao.id_documento) {
      let index_ofrag = ofrags.findIndex(i =>i.id == missao.id_documento)
      if(index_ofrag > -1) {
        setOfragToShow(ofrags[index_ofrag].numero)
      } else {
        setOfragToShow('OFRAG S/N')
      }
    } else {
      setOfragToShow('OFRAG S/N')
    }
    setCaixaVisible(true);
  };

  const handleMouseEnterRascunho = (rascunho) =>{
    setIdRascunhoToShow(rascunho.id)
    setRascunhoToShow(rascunho)
    setCaixaVisibleRascunho(true);
  }

  const handleMouseLeave = () => {
    setCaixaVisible(false);
  };

  const handleMouseLeaveRascunho = () => {
    setCaixaVisibleRascunho(false)
  }

   const handleMouseEnterObs = (obs) => {
    setObsText(obs)
    setCaixaObsVisible(true);
  };

  const handleMouseLeaveObs = () => {
    setCaixaVisible(false);
  };

  const handleEditMission = async (missao, missaoClicked) => {
    setLoadingExcluir(false)
    setLoadingSave(false)
    setEditMission(true)
    setEditEtapa(false)
    let id_missao = missaoClicked.missao.id_missao
    setIdMissaoEdit(id_missao)
    let etapas_copy = {...etapas}
    let tripulacao_get = []

    missaoClicked.missao.tripulacao.forEach(item=>{
      tripulacao_get.push(item)
    })
    let comentarios_get = missaoClicked.comentarios
    let esforco_get = missaoClicked.esforco
    let configuracao_get = missaoClicked.configuracao

    setComentarios(comentarios_get)
    setEsforco(esforco_get)
    setConfiguracao(configuracao_get)

    let omis_get = missaoClicked.missao.omis
    setOmis(omis_get)

    setTripulacao(tripulacao_get)
    let missoes_id = await Api.getMissoesAvioesId(id_missao)
    
    let missoes_filtered = missoes_id.data.filter(i=>{
      if(i.eventos.length > 0) {
        return i
      }
    })
    etapas_copy.eventos = missoes_filtered[0].eventos
    setOfragSelected(etapas_copy.eventos[0].id_documento)
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
        handleAddEtapaAndFocus();
      }
   
    }
  };

  const handleAddEtapaAndFocus = async () => {
    let res = await handleAddEtapa();
    if(res) {
      setTimeout(() => {
        const inputPouso = document.getElementById('icao-pouso');
        if (inputPouso) {
          inputPouso.focus();
        }
      }, 0);
    }

  };

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



  

  const handleCloseModal = () => {
    const confirmacao = window.confirm('Deseja mesmo sair? Todos os dados adicionados até o momento serão perdidos');
    if (confirmacao) {
      handleLimparMissao()
     setCaixaCreateVisible(false)
    }
  }

  const getDias = (hoje, reseta = false) => {
    let hoje_copy = new Date(hoje)
    hoje_copy.setDate(hoje_copy.getDate() - 1);
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
    getSobreavisos(dias)
    getObservacoes(dias)
    getManutencoes(dias)
    getRascunhos(dias)
  }

  const getRascunhos = async (dias) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res = await Api.getRascunhos({inicio, fim})
    if(!res.error) {
      setRascunhos(res.data)
    }
  }

  const getObservacoes = async (dias) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res_obs = await Api.getObservacoesData({inicio, fim})
    if(!res_obs.error) {
      setObservacoes(res_obs.data)
    }
  }

  const getSobreavisos = async (dias) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res = await Api.getSobreavisos({inicio, fim})
    if(!res.error) {
      setSobreavisos(res.data)
    }
  }

  const getManutencoes = async (dias) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res_manutencoes = await Api.getManutencoesAvioes({inicio, fim})
    if(!res_manutencoes.error) {
      setManutencoes(res_manutencoes.data)
    }
  }

  const getOfrags = async () => {
    let res = await Api.getOfrags()
    if(!res.error) {
      setOfrags(res.data.reverse())
    }
  }

  const getOfrag = async () => {
    setErrorEtapaAdd('')
    setErrorCumprir('')
    if(aeronaveMissao == '') {
      setErrorCumprir('A aeronave é obrigatória')
      return
    }
    if(ofragSelected != '') {
      let res = await Api.getOfrag(ofragSelected)
      
      if(!res.error) {
        let etapas_get = []
        var data_copy = {...data}

        var etapas_copy = {...etapas}

        etapas_copy.eventos.forEach(it=>{
          var index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
          if(index >=0) {
            data_copy.avioes[index].eventos = data_copy.avioes[index].eventos.filter(i=>i.missao.depISO != it.missao.depISO && i.missao.dep != it.missao.dep)
          }
        })

        res.data.missoes[0].rotaOfrag.etapas.forEach(item=>{
          let [data, horas] = item.dataHoraDecolagem.split('T')
          let [ano, mes, dia] = data.split('-')
          let [hora, minuto, segundo] = horas.split(':')

          if(item.dataHoraPouso) {
            var [dataPouso, horasPouso] = item.dataHoraPouso.split('T')
            var [anoPouso, mesPouso, diaPouso] = dataPouso.split('-')
            var [horaPouso, minutoPouso, segundoPouso] = horasPouso.split(':')
          }

          let evento = {
            data: `${dia}/${mes}/${ano}`,
            tipo: "missao",
            missao: {
              id: Math.floor(Math.random() * 10000) + 1,
              dep: item.codigoIcaoOrigem,
              horaDep: `${hora}:${minuto}Z`,
              pouso: item.codigoIcaoDestino,
              horaPouso:  item.dataHoraPouso ? `${horaPouso}:${minutoPouso}Z` : '',
              depISO: item.dataHoraDecolagem,
              pousoISO: item.dataHoraPouso,
              tripulacao: [],
              omis: '',
              edicao: true
            },
            manutencao: null
          }
          var index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
          if(index >=0) {
            data_copy.avioes[index].eventos.push(evento)
          }
          etapas_get.push(evento)
        })
        if(etapas_get.length > 0) {
          etapas_copy.eventos = etapas_get
          setEtapas(etapas_copy)
          setErrorEtapaAdd('')
          setLoadingCumprir(false)
          setCumprir(true)
          setData(data_copy)
        }
      }
    }

  }

  const getMissoes = async (dias, reseta = false) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res = await Api.getMissoesAvioes({inicio, fim})
    if(!res.error) {
      let missoes = res.data
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

  const handleCreate = async () => {
    setLoadingExcluir(false)
    setLoadingSave(false)
    setEditMission(false)
    setCaixaCreateVisible(true)
    let res = await Api.getUltimaMissao()
    if(!res.error) {
      setOmis((parseInt(res.data[0].numero) + 1).toString())
    }
  }

  const handleCreateObs = async () => {
    setTituloObs('')
    setComentarioObs('')
    var hoje = new Date(); // Cria um objeto Date com a data e hora atuais
    hoje.setHours(0, 0, 0, 0); 
    setDataInicioObs(hoje)
    setDataFimObs(hoje)
    setIsEditObs(false)
    setCaixaCreateVisibleObsEdit(true)
  }

  const handleCreateSobreaviso = () => {
    setDataSobreaviso(new Date())
    setTripulacao([])
    setEditSobreaviso(false)
    setCaixaCreateVisibleSobreaviso(true)
  }

  const handleCreateManut = async () => {
    setTituloManutencao('')
    setComentariosManutencao('')
    var hoje = new Date(); // Cria um objeto Date com a data e hora atuais
    setDataInicioManut(hoje)
    setDataFimManut(hoje)
    setIsEditManut(false)
    setCaixaCreateManutencaoVisible(true)
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
      setErroIcaoAlt(false)
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
    setIcaoAltAdd('')
    setCombustivel(0)
    let new_date = new Date(horarioDep)
    new_date.setMinutes(new_date.getMinutes()+120)
    var offset = new_date.getTimezoneOffset();
    // Convertendo a data para UTC
    new_date.setMinutes(new_date.getMinutes() + offset);

    setDataEtapa(new_date)
    setIcaoOrigemAdd(icaoDep)
    setDataEtapaPouso(new_date)
    if (inputAltRef.current) {
    inputPousoRef.current.focus();
    }
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
    if(aeronaveMissao == '' || etapas.eventos.length == 0) {
      alert('Todos os campos são obrigatórios!')
      setLoadingSave(false)
      return
    }
    let erroEncontrado = false; 

      etapas.eventos.forEach(item=>{
        if(!item.missao.pousoISO || !item.missao.depISO || !item.missao.alternativa || item.missao.alternativa == '') {
          erroEncontrado = true;
          return
        }
      })

      if (erroEncontrado) {
        setLoadingSave(false);
        alert('Horários de DEP e POUSO e ICAO de ALTERNATIVA são obrigatórios!')
        return; // interrompe a execução da função
      }


    if(!editMission) {
      let item = {}
      if(omis != '') {
        item.numero = omis
      }
      if(ofragSelected != '') {
        item.id_documento = ofragSelected
      }
      if(esforco != '') {
        item.esforco = esforco
      }
      let res = await Api.createMissao(item)
      if(!res.error) {
         let id_missao = res.data.id
         etapas.eventos.forEach(async (item, index)=>{
           var res_dep = await Api.getAerodromo(item.missao.dep)
           var res_pouso = await Api.getAerodromo(item.missao.pouso)
           var comb = 0
           var id_alt = null
           if(item.missao.alternativa) {
            var res_alt = await Api.getAerodromo(item.missao.alternativa)
            var id_alt = res_alt.data.id
            var res_comb = await Api.getCombMinimo(item.missao.dep, item.missao.pouso, item.missao.alternativa)
            if(!res_comb.error) {
              var comb = res.data.combustivel
            }
           }

           let data_item = {
             dep: item.missao.depISO,
             pouso: item.missao.pousoISO,
             id_missao: id_missao,
             id_aeronave: idAeronaveMissao,
             id_dep: res_dep.data.id,
             id_pouso: res_pouso.data.id,
             id_alternativa: id_alt,
             combustivel_minimo: (item.missao.combustivel_minimo != '') ? item.missao.combustivel_minimo : comb
           }
           let res_etapa = await Api.createEtapa(data_item)
         
           if(res_etapa.error) {
             alert(res.etapa.error)
             return
           } else {
            if(index == (etapas.eventos.length -1)){
              //setData({avioes:[]})
              //handleLimparMissao()
             // getDias(firstDay, true)
              setCaixaCreateVisible(false)
              setLoadingSave(false)
              setTimeout(()=>{location.reload()},"2000")
             }
           }
    
         })
         let id_militares = []
         tripulacao.forEach(item=>{
          id_militares.push(item.id)
         })
         let escala = {id_missao, id_militares}

         await Api.createEscala(escala)

         setLoadingSave(false)
       } else {
        setLoadingSave(false)
        alert(res.error)
       }
    } 
  }

  const getOmis = async () => {
      let comentarios = etapas.eventos[0].comentarios
      let esforco_missao = etapas.eventos[0].esforco
      let configuracao_get = etapas.eventos[0].configuracao
      let tripulacao = []
      etapas.eventos[0].missao.tripulacao.forEach(item=>{
        tripulacao.push(item)
      })
      let etapas_final = []

      const editData = (data) => {
        let [dataSplit, horaSplit] = data.split('T')
        let [ano, mes, dia] = dataSplit.split('-')
        let [hora, minuto, segundo] = horaSplit.split(':')
        let data_formatted = dia+'/'+mes+'/'+ano
        let hora_formatted = hora+':'+minuto
        return [data_formatted, hora_formatted]
      }

      function calcularTempoDeVoo(distancia) {
        var velocidade = 400; // Velocidade em NM/hora
      
        // Calcula o tempo de voo em horas
        var tempoEmHoras = distancia / velocidade;
      
        // Calcula os minutos restantes
        var minutosRestantes = Math.round((tempoEmHoras % 1) * 60);
      
        // Ajusta os minutos para o múltiplo de 5 mais próximo
        minutosRestantes = Math.ceil(minutosRestantes / 5) * 5;
      
        // Se os minutos forem 60, ajusta para a próxima hora
        if (minutosRestantes === 60) {
          tempoEmHoras += 1;
          minutosRestantes = 0;
        }
      
        // Formata o resultado
        var horas = Math.floor(tempoEmHoras);
        if(horas <= 9) {
          horas = '0'+horas.toString()
        }
        
      
        // Adiciona um zero à esquerda se os minutos forem menores que 10
        var minutos = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;
      
        // Retorna o tempo de voo formatado
        return horas+':'+minutos;
      }

      function converterMilissegundosParaHoraMinuto(milissegundos) {
        // Calcula o número de horas
        var horas = Math.floor(milissegundos / 3600000);
        
        if(horas <= 9) {
          horas = '0'+horas.toString()
        }
        // Calcula o número de minutos restantes
        var minutosRestantes = Math.ceil((milissegundos % 3600000) / 60000);
        if(minutosRestantes <= 9) {
          minutosRestantes = '0'+minutosRestantes.toString()
        }
        // Formata o resultado
        var resultado = horas+":"+minutosRestantes
      
        return resultado;
      }

      async function processaEventos() {
        var horas_missao = 0
        for (let i = 0; i < etapas.eventos.length; i++) {
          let item = etapas.eventos[i]
          var horaSolo = "01:00"
          if (i != etapas.eventos.length - 1) {
            let horaProximaDep = etapas.eventos[i + 1].missao.depISO
            var horaSoloMili =
              new Date(horaProximaDep) - new Date(item.missao.pousoISO)
            if (horaSoloMili < 28800000) {
              var horaSolo = converterMilissegundosParaHoraMinuto(horaSoloMili)
            }
          }
          let [dataDep, horaDep] = editData(item.missao.depISO)
          let [dataPouso, horaPouso] = editData(item.missao.pousoISO)
          let tev = converterMilissegundosParaHoraMinuto(
            new Date(item.missao.pousoISO) - new Date(item.missao.depISO)
          )
          var tev_alt = "00:00"
          let res_alternativa = await Api.getDistanciaAerodromos({
            origem: item.missao.pouso,
            destino: item.missao.alternativa,
          })
          if (!res_alternativa.error) {
            let distancia = res_alternativa.data.distancia
            var tev_alt = calcularTempoDeVoo(distancia)
          }
          let dado = {
            data: dataDep,
            depIso: item.missao.depISO,
            horaDep: horaDep,
            dep: item.missao.dep,
            horaPouso: horaPouso,
            pouso: item.missao.pouso,
            tev: tev,
            solo: horaSolo,
            alternativa: item.missao.alternativa,
            tev_alt: tev_alt,
            combustivel: item.missao.combustivel_minimo,
          }
          etapas_final.push(dado)
        }
      }
      
      await processaEventos();

      tripulacao.sort(function(a, b) {
        return a.antiguidade - b.antiguidade
      });

      var minutos_totais = 0

      etapas_final.forEach(item=>{
        let [horas, minutos] = item.tev.split(':')
        let tempo = parseInt(horas)*60+(parseInt(minutos))
        minutos_totais+=tempo
      })

      function converterMinutosParaHoras(minutos) {
        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;
        const horasFormatadas = horas.toString().padStart(2, '0');
        const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
      
        return `${horasFormatadas}:${minutosFormatados}`;
      }
      let item_dados = {
        tripulacao,
        etapas: etapas_final,
        comandante: tripulacao[0].posto+' '+tripulacao[0].nome_guerra.toUpperCase(),
        data: etapas_final[0].data,
        aviao: aeronaveMissao,
        omis: etapas.eventos[0].missao.omis,
        ofrag: etapas.eventos[0].ofrag,
        comentarios,
        esforco: esforco_missao,
        configuracao: configuracao_get,
        horas: converterMinutosParaHoras(minutos_totais)
      }

      const form = document.createElement('form');
      form.method = 'post';
      form.action = '/omis';
      form.target = '_blank'; // Abre em uma nova aba
      
      // Crie um campo de input para cada parâmetro e adicione-os ao formulário
      for (const key in item_dados) {
        if (item_dados.hasOwnProperty(key)) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = JSON.stringify(item_dados[key]);
          form.appendChild(input);
        }
      }
      

      const dados = encodeURIComponent(JSON.stringify(item_dados));
      const url = `/omis?dados=${dados}`;
      window.open(url, '_blank');
  }

  const getLanche = async () => {
    let tripulacao = []
    etapas.eventos[0].missao.tripulacao.forEach(item=>{
      tripulacao.push(item)
    })
    let etapas_final = []

    const editData = (data) => {
      let [dataSplit, horaSplit] = data.split('T')
      let [ano, mes, dia] = dataSplit.split('-')
      let [hora, minuto, segundo] = horaSplit.split(':')
      let data_formatted = dia+'/'+mes+'/'+ano
      let hora_formatted = hora+':'+minuto
      return [data_formatted, hora_formatted]
    }

    function calcularTempoDeVoo(distancia) {
      var velocidade = 400; // Velocidade em NM/hora
    
      // Calcula o tempo de voo em horas
      var tempoEmHoras = distancia / velocidade;
    
      // Calcula os minutos restantes
      var minutosRestantes = Math.round((tempoEmHoras % 1) * 60);
    
      // Ajusta os minutos para o múltiplo de 5 mais próximo
      minutosRestantes = Math.ceil(minutosRestantes / 5) * 5;
    
      // Se os minutos forem 60, ajusta para a próxima hora
      if (minutosRestantes === 60) {
        tempoEmHoras += 1;
        minutosRestantes = 0;
      }
    
      // Formata o resultado
      var horas = Math.floor(tempoEmHoras);
      if(horas <= 9) {
        horas = '0'+horas.toString()
      }
      
    
      // Adiciona um zero à esquerda se os minutos forem menores que 10
      var minutos = minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes;
    
      // Retorna o tempo de voo formatado
      return horas+':'+minutos;
    }


    function converterMilissegundosParaHoraMinuto(milissegundos) {
      // Calcula o número de horas
      var horas = Math.floor(milissegundos / 3600000);
      
      if(horas <= 9) {
        horas = '0'+horas.toString()
      }
      // Calcula o número de minutos restantes
      var minutosRestantes = Math.ceil((milissegundos % 3600000) / 60000);
      if(minutosRestantes <= 9) {
        minutosRestantes = '0'+minutosRestantes.toString()
      }
      // Formata o resultado
      var resultado = horas+":"+minutosRestantes
    
      return resultado;
    }

    async function processaEventos() {
      var horas_missao = 0
      for (let i = 0; i < etapas.eventos.length; i++) {
        let item = etapas.eventos[i]
        var horaSolo = "01:00"
        if (i != etapas.eventos.length - 1) {
          let horaProximaDep = etapas.eventos[i + 1].missao.depISO
          var horaSoloMili =
            new Date(horaProximaDep) - new Date(item.missao.pousoISO)
          if (horaSoloMili < 28800000) {
            var horaSolo = converterMilissegundosParaHoraMinuto(horaSoloMili)
          }
        }
        let [dataDep, horaDep] = editData(item.missao.depISO)
        let [dataPouso, horaPouso] = editData(item.missao.pousoISO)
        let tev = converterMilissegundosParaHoraMinuto(
          new Date(item.missao.pousoISO) - new Date(item.missao.depISO)
        )
        var tev_alt = "00:00"
        let res_alternativa = await Api.getDistanciaAerodromos({
          origem: item.missao.pouso,
          destino: item.missao.alternativa,
        })
        if (!res_alternativa.error) {
          let distancia = res_alternativa.data.distancia
          var tev_alt = calcularTempoDeVoo(distancia)
        }
        let dado = {
          data: dataDep,
          depIso: item.missao.depISO,
          horaDep: horaDep,
          dep: item.missao.dep,
          horaPouso: horaPouso,
          pouso: item.missao.pouso,
          tev: tev,
          solo: horaSolo,
          alternativa: item.missao.alternativa,
          tev_alt: tev_alt,
          combustivel: item.missao.combustivel_minimo,
        }
        etapas_final.push(dado)
      }
    }
    
    await processaEventos();

    tripulacao.sort(function(a, b) {
      return a.antiguidade - b.antiguidade
    });

    var minutos_totais = 0
    etapas_final.forEach(item=>{
      let [horas, minutos] = item.tev.split(':')
      let tempo = parseInt(horas)*60+(parseInt(minutos))
      minutos_totais+=tempo
    })

    let item_dados = {
      tripulacao,
      etapas: etapas_final,
      data: etapas_final[0].data,
      aviao: aeronaveMissao,
      omis: etapas.eventos[0].missao.omis,
    }

    const dados = encodeURIComponent(JSON.stringify(item_dados));
    const url = `/lanche?dados=${dados}`;
    window.open(url, '_blank');
}


  const getCombustivelMinimo = async (dep, pouso, alternativa) => {
    if(dep != '' && pouso!= '' && alternativa != '' && dep.length == 4 && pouso.length == 4 && alternativa.length == 4) {
      let res = await Api.getCombMinimo({dep, pouso, alternativa})
      if(!res.error) {
        if(parseInt(res.data.combustivel) < 10000) {
          setCombustivel(10000)
        } else {
          setCombustivel(res.data.combustivel)
        }

      } 
    }
  }


  const handleEditSaveMission = async () => { 
    setLoadingSave(true)
    var id_missao = idMissaoEdit
    if(omis != '') {
      let item = {numero: omis}
      if(ofragSelected != '') {
        item.id_documento = ofragSelected
      }
      if(comentarios != '') {
        item.comentarios = comentarios
      } else {
        item.comentarios = 'NIL'
      }
      item.configuracao = configuracao
      item.esforco = esforco
      await Api.updateMissao(item, id_missao)
    }
    let etapas_map = etapas.eventos.map(async (i)=>{
        let item = {}
        var res_dep = await Api.getAerodromo(i.missao.dep)
        var res_pouso = await Api.getAerodromo(i.missao.pouso)
        var id_alt = null
        if(i.missao.alternativa) {
         var res_alt = await Api.getAerodromo(i.missao.alternativa)
         var id_alt = res_alt.data.id
        }
        item.dep = i.missao.depISO
        item.pouso = i.missao.pousoISO
        item.id_aeronave = idAeronaveMissao
        item.id_dep = res_dep.data.id
        item.id_pouso = res_pouso.data.id
        item.id_alternativa = id_alt
        item.combustivel_minimo = i.missao.combustivel_minimo
        if(i.missao.edicao) {
          item.id = null
        } else {
          item.id = i.missao.id
        }
        return item
      })
    
    let etapas_final = await Promise.all(etapas_map)
    let dados = {etapas:etapas_final, id_missao}
    
    let res = await Api.updateEtapas(dados)
    if(res.error) {
      setLoadingSave(false)
      alert(res.error)
      return
    } else {
      let id_militares = []
      tripulacao.forEach(item=>{
       id_militares.push(item.id)
      })
      let escala = {id_missao, id_militares}

      await Api.updateEscala(escala)

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
    setEtapas({aviao: '', eventos:[]})

    let data_copy = {...data}
    /*let index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)

    if(index>=0) {
      data_copy.avioes[index].eventos =  data_copy.avioes[index].eventos.filter(item=>{
        if(!item.missao.edicao) {
          return item
        }
      })
    }*/

    setData(data_copy)

    setIcaoDestinoAdd('')
    setIcaoOrigemAdd('')
    setIcaoAltAdd('')
    setDataEtapa(new Date())
    setDataEtapaPouso(new Date())
    setAeronaveMissao( '')
    setComentarios('')
    setEsforco('')
    setConfiguracao('')
    setOmis('')
    setOfragSelected('')
    setEditMission(false)
    setEditEtapa(false)
    setTripulacao([])
    setCombustivel(0)
    getDias(firstDay, true)
  }

  const handleLimparSobreaviso = () => {
    setTripulacao([])
    setDataSobreaviso(new Date())
  }

  const handleEditEtapa = async () => {
    setErrorEtapaAdd('')
    if(icaoDestinoAdd == '' || icaoOrigemAdd == '' || icaoAltAdd == '' || dataEtapa == '' || dataEtapaPouso == '') {
      setErrorEtapaAdd('Todos os campos são obrigatórios')
      return
    }
    if(aeronaveMissao == '') {
      setErrorEtapaAdd('A aeronave é obrigatória')
      return
    }

    let res_alt = await Api.getAerodromo(icaoAltAdd)
    if(res_alt.error) {
      setErrorEtapaAdd(res_alt.error)
      setErroIcaoAlt(true)
      return 
    }

    setErroIcaoAlt(false)

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
        alternativa: icaoAltAdd,
        depISO:dataEtapa,
        pousoISO: dataEtapaPouso,
        tripulacao: [],
        omis: '',
        combustivel_minimo: combustivel,
        edicao: find_item.missao.edicao
      },
      manutencao: null
    }
    etapas_copy.eventos[indexEditEtapa] = evento

    etapas_copy.eventos.sort((evento1, evento2) => new Date(evento1.missao.depISO) - new Date(evento2.missao.depISO));
    setEtapas(etapas_copy)

    var index = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
    if(index >=0) {
      let index_data = data_copy.avioes[index].eventos.findIndex(i=>i.missao.id == find_item.missao.id)
      if(index_data >=0) {
        data_copy.avioes[index].eventos[index_data] = evento
        data_copy.avioes[index].eventos.sort((evento1, evento2) => new Date(evento1.missao.depISO) - new Date(evento2.missao.depISO));
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
    if(icaoDestinoAdd == '' || icaoOrigemAdd == '' || icaoAltAdd == '' || dataEtapa == '' || dataEtapaPouso == '') {
      setErrorEtapaAdd('Todos os campos são obrigatórios')
      return
    }
    if(aeronaveMissao == '') {
      setErrorEtapaAdd('A aeronave é obrigatória')
      return
    }
    let res_alt = await Api.getAerodromo(icaoAltAdd)
    if(res_alt.error) {
      setErrorEtapaAdd(res_alt.error)
      setErroIcaoAlt(true)
      return null
    }
    setErroIcaoAlt(false)
    setErroIcaoPouso(false)
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
        alternativa: icaoAltAdd,
        depISO:dataEtapa,
        pousoISO: dataEtapaPouso,
        tripulacao: [],
        omis: '',
        combustivel_minimo: combustivel,
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
      data_copy.avioes[index].eventos.sort((evento1, evento2) => new Date(evento1.missao.depISO) - new Date(evento2.missao.depISO));
    }

    etapas_copy.eventos.sort((evento1, evento2) => new Date(evento1.missao.depISO) - new Date(evento2.missao.depISO));
    setData(data_copy)
    setEtapas(etapas_copy)

    getNewEtapa(icaoDestinoAdd, dataEtapaPouso)
    return true
  }

  const getDadosEditEtapa = (index) => {
    let etapas_copy = {...etapas}
    let etapa = etapas_copy.eventos[index]
    setIcaoOrigemAdd(etapa.missao.dep)
    setIcaoDestinoAdd(etapa.missao.pouso)
    setIcaoAltAdd(etapa.missao.alternativa ? etapa.missao.alternativa : '')
    setCombustivel(etapa.missao.combustivel_minimo ? etapa.missao.combustivel_minimo : 0)
    if(typeof(etapa.missao.depISO) == 'string') {
      etapa.missao.depISO = new Date(etapa.missao.depISO)
    }
    if(typeof(etapa.missao.pousoISO) == 'string') {
      etapa.missao.pousoISO = new Date(etapa.missao.pousoISO)
    }
    var offset_dep = etapa.missao.depISO.getTimezoneOffset();
    // Convertendo a data para UTC
    etapa.missao.depISO.setMinutes(etapa.missao.depISO.getMinutes() + offset_dep);

    if(etapa.missao.pousoISO) {
      var offset_pouso = etapa.missao.pousoISO.getTimezoneOffset();
      etapa.missao.pousoISO.setMinutes(etapa.missao.pousoISO.getMinutes() + offset_pouso);
      setDataEtapaPouso(etapa.missao.pousoISO)
    }else {
      getHorarioPouso()
    }
    // Convertendo a data para UTC

    setDataEtapa(etapa.missao.depISO)
  }

  const selectAviao = (aviao, id, ciclos, horas, situacao, atualizador, atualizado) => {
    setCiclos(ciclos)
    setHoras(horas)
    setAviaoSelectedModal(aviao)
    setSituacaoAviao(situacao)
    setAtualizador(atualizador)
    setIdAeronaveModal(id)
    const editData = (data) => {
      let [dataSplit, horaSplit] = data.split('T')
      let [ano, mes, dia] = dataSplit.split('-')
      let [hora, minuto, segundo] = horaSplit.split(':')
      let data_formatted = dia+'/'+mes+'/'+ano
      let hora_formatted = hora+':'+minuto
      return data_formatted+' - '+hora_formatted
    }
    setDataAtualizacao(editData(atualizado))
    setModalAviao(true)
  }

  const handleSaveAviao = async () => {
    if(situacaoAviao == '' || horas == '') {
      alert('Todos os campos são obrigatórios')
      return
    }

    let item = {
      situacao: situacaoAviao,
      ciclos,
      horas
    }

    let res = await Api.updateAeronave(item, idAeronaveModal)

    if(res.error) {
      alert(res.error)
      return
    } else {
      setIdAeronaveModal('')
      setCiclos('')
      setHoras('')
      setSituacaoAviao('')
      setModalAviao(false)
      alert(res.msg)
      location.reload()
    }
  }

  const handleEditObs = (obs) => {
    setIsEditObs(true)
    setTituloObs(obs.titulo)
    setComentarioObs(obs.observacoes)
    setIdObs(obs.id)
    setDataInicioObs(new Date(obs.inicio))
    setDataFimObs(new Date(obs.fim))
    setCaixaCreateVisibleObsEdit(true)
  }

  const handleEditaSobreaviso = (sobreaviso) => {
    setEditSobreaviso(true)
    setIdSobreaviso(sobreaviso.id)
    setDataEtapa(new Date(sobreaviso.data))
    setCaixaCreateVisibleSobreaviso(true)
    let trigramas_sobreaviso = []
    sobreaviso.Usuarios.forEach(i=>{
      trigramas_sobreaviso.push({id: i.id, trigrama: i.Trigrama.trigrama, funcao: i.FuncoesAbordo.nome}
  )
    })
    setTripulacao(trigramas_sobreaviso)
  }

  

  const handleEditmanut = (manut) => {
    setIsEditManut(true)
    setTituloManutencao(manut.titulo)
    setComentariosManutencao(manut.descricao)
    setIdManut(manut.id)
    setAerononaveManut(manut.Aeronave.aeronave)
    setIdAeronaveManut(manut.Aeronave.id)
    let inicio_Date = new Date(manut.inicio)
    let fim_Date = new Date(manut.fim)
    var offset_inicio = inicio_Date.getTimezoneOffset();
    // Convertendo a data para UTC
    inicio_Date.setMinutes(inicio_Date.getMinutes() + offset_inicio);
    var offset_fim = fim_Date.getTimezoneOffset();
    // Convertendo a data para UTC
    fim_Date.setMinutes(fim_Date.getMinutes() + offset_fim);
    setDataInicioManut(inicio_Date)
    setDataFimManut(fim_Date)
    setCaixaCreateManutencaoVisible(true)
  }

  const handleCloseModalSobreaviso = () => {
    handleLimparSobreaviso()
    setCaixaCreateVisibleSobreaviso(false)
  }


  const handleCriaSobreaviso = async () => {
    var id_usuarios = []
    tripulacao.forEach(item=>{
      id_usuarios.push(item.id)
    })
    let new_data = new Date(dataEtapa)
    new_data.setHours(3, 30, 0, 0);
    let item = {
      id_usuarios,
      data:new_data.toISOString()
    }

    let res = await Api.createSobreaviso(item)
    if(res.error) {
      alert(res.error)
      return
    } 

    alert(res.msg)
    handleLimparSobreaviso()
    setCaixaCreateVisibleSobreaviso(false)
    location.reload()
  }

  const handleEditaItemSobreaviso = async() =>{
    var id_usuarios = []
    tripulacao.forEach(item=>{
      id_usuarios.push(item.id)
    })

    let item = {
      id_usuarios,
    }

    let res = await Api.updateSobreaviso(idSobreaviso,item)
    if(res.error) {
      alert(res.error)
      return
    } 
    alert(res.msg)
    handleLimparSobreaviso()
    setCaixaCreateVisibleSobreaviso(false)
    location.reload()
  }
  

  const handleSaveObs = async () => {
    var item = {
      titulo: tituloObs,
      observacoes: comentarioObs,
      inicio: dataInicioObs,
      fim: dataFimObs
    }
    if(isEditObs) {
      let id = idObs
      let res = await Api.updateObservacao(item, id)
      if(!res.error) {
        setTituloObs('')
        setComentarioObs('')
        setDataInicioObs(new Date())
        setDataFimObs(new Date())
        setCaixaCreateVisibleObsEdit(false)
        setIsEditObs(false)
        alert(res.msg)
        location.reload()
      }
    } else {
      let res = await Api.createObservacao(item)
      if (!res.error) {
        setTituloObs('')
        setComentarioObs('')
        setDataInicioObs(new Date())
        setDataFimObs(new Date())
        setCaixaCreateVisibleObsEdit(false)
        setIsEditObs(false)
        alert(res.msg)
        location.reload()
      }
    }

  }

  const handleSaveManut = async () => {
    if(!aerononaveManut || aerononaveManut == '') {
      alert('A Aeronave é obrigatória')
      return
    }
    if(!tituloManutencao || tituloManutencao == '' || !comentariosManutencao || comentariosManutencao == '') {
      alert('O Título e descrição são obrigatórios')
      return
    }
    let inicio_copy = new Date(dataInicioManut)
    let fim_copy = new Date(dataFimManut)
    if(inicio_copy.getTime() > fim_copy.getTime()) {
      alert('Data de término menor do que a de início')
      return
    }
    var offset_inicio = inicio_copy.getTimezoneOffset();
    // Convertendo a data para UTC
    inicio_copy.setMinutes(inicio_copy.getMinutes() - offset_inicio);
    var offset_fim = fim_copy.getTimezoneOffset();
    // Convertendo a data para UTC
    fim_copy.setMinutes(fim_copy.getMinutes() - offset_fim);

    var item = {
      titulo: tituloManutencao,
      descricao: comentariosManutencao,
      inicio: inicio_copy.toISOString(),
      fim: fim_copy.toISOString(),
      id_aviao: idAeronaveManut
    }

    if(isEditManut) {
      let id = idManut
      let res = await Api.updateManutencao(item, id)
      if(res.error) {
        alert(res.error)
        return
      }
        setTituloManutencao('')
        setComentariosManutencao('')
        setDataInicioManut(new Date())
        setDataFimManut(new Date())
        setCaixaCreateManutencaoVisible(false)
        setIsEditManut(false)
        alert(res.msg)
        location.reload()
    } else {
      let res = await Api.createManutencao(item)
      if (!res.error) {
        setTituloManutencao('')
        setComentariosManutencao('')
        setDataInicioManut(new Date())
        setDataFimManut(new Date())
        setCaixaCreateManutencaoVisible(false)
        setIsEditManut(false)
        alert(res.msg)
        location.reload()
      }
    }

  }

  const handleExcluiObsAviso = () => {
    const confirmacao = window.confirm('Deseja mesmo excluir essa Observação?');
    if (confirmacao) {
      handleExcluiObs()
    }
  }

  const handleExcluiSobreavisAviso = () => {
    const confirmacao = window.confirm('Deseja mesmo excluir esse Sobreaviso?');
    if (confirmacao) {
      handleExcluiSobreaviso()
    }
  }

  const handleExcluiSobreaviso = async () => {
    let id = idSobreaviso
    let res = await Api.deleteSobreaviso(id)
    if(res.error) {
      alert(res.error)
      return
    }
    setDataEtapa(new Date())
    setCaixaCreateVisibleSobreaviso(false)
    setEditSobreaviso(false)
    alert(res.msg)
    location.reload()
  }

  const handleExcluiObs = async () => {
    let id = idObs
    let res = await Api.deleteObservacao(id)
    if(res.error) {
      alert(res.error)
      return
    }
    setTituloObs('')
    setComentarioObs('')
    setDataInicioObs(new Date())
    setDataFimObs(new Date())
    setCaixaCreateVisibleObsEdit(false)
    setIsEditObs(false)
    alert(res.msg)
    location.reload()
  }


  const handleExcluiManutAviso = () => {
    const confirmacao = window.confirm('Deseja mesmo excluir essa Manutenção?');
    if (confirmacao) {
      handleExcluiManut()
    }
  }

  const handleExcluiManut = async () => {
    let id = idManut
    let res = await Api.deleteManutencao(id)
    if(res.error) {
      alert(res.error)
      return
    }
    setTituloManutencao('')
    setComentariosManutencao('')
    setDataInicioManut(new Date())
    setDataFimManut(new Date())
    setCaixaCreateManutencaoVisible(false)
    setIsEditManut(false)
    alert(res.msg)
    location.reload()
  }

  const handleClickAddRascunho = (e,i, id_aeronave) =>{
    if (e.target === e.currentTarget) {
      // Verifique se o clique ocorreu na div maior e não na div menor
      setCaixaCreateVisibleRascunho(true)
      setDataRascunho(i)
      setIdAeronaveRascunho(id_aeronave)
    }
  }

  const handleEditarRascunho = (rascunho) => {
    if(!selecao) {
      setPlanejamento(rascunho.planejamento)
      setOfrag(rascunho.ofrag)
      setTrip(rascunho.trip)
      setObs(rascunho.obs)
      setIdAeronaveRascunho(rascunho.id_aeronave)
      let [ano, mes, dia] = rascunho.data.split('-')
      setDataRascunho(dia+'/'+mes+'/'+ano)
      setIdRascunho(rascunho.id)
      setStatusSelected(rascunho.cor)
      setIsEditRascunho(true)
      setCaixaCreateVisibleRascunho(true)
    }
  }

  const handleCriarRascunho = async () =>{
    if(!planejamento || planejamento == '') {
      alert('Digite o planejamento')
      return
    }
    let [dia_rascunho, mes_rascunho, ano_rascunho] = dataRascunho.split('/')
    let item = {
      data: ano_rascunho+'-'+mes_rascunho+'-'+dia_rascunho,
      id_aeronave: idAeronaveRascunho,
      planejamento,
      ofrag,
      trip, 
      obs,
      cor: statusSelected
    }
    if(isEditRascunho) {
      var res = await Api.editRascunho(idRascunho,item)
    } else {
      var res = await Api.createRascunho(item)
    }

    if(res.error) {
      alert(res.error)
      return
    }
    setCaixaCreateVisibleRascunho(false)
    setPlanejamento('')
    setObs('')
    setTrip('')
    setOfrag('')
    setIdAeronaveRascunho('')
    setIsEditRascunho(false)
    alert(res.msg)
    location.reload()
  }

  const handleMouseDown = () => {
    setLongPressTimer(setTimeout(handleLongPress, 1000)); // Defina o tempo limite para o clique longo (1 segundo, por exemplo).
  }

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
  }

  const handleLongPress = () => {
      setSelecao(true)
    // Realize a ação desejada para o clique longo aqui.
  }

  const handleBolaClick = (item) => {
    let selecionados_copy = [...selecionados]
    let index = selecionados_copy.findIndex(i=>i.id == item.id)
    if(index > -1) {
      selecionados_copy = selecionados_copy.filter(it=>it.id != item.id)
    } else {
      selecionados_copy.push(item)
    }
    setSelecionados(selecionados_copy)
  }

  const handleLimparSelecao = () => {
    setSelecionados([])
    setSelecao(false)
  }

  const handleTrocarAeronave = () => {
    if(selecionados.length < 1) {
      alert('Selecione ao menos de 1 item para trocar a Aeronave!')
      return
    }
    setCaixaCreateVisibleRascunhoAeronave(true)
  }

  const handleTrocarAeronaveSave = async () => {
    for (const selecionado of selecionados) {
      let item = {
        id_aeronave: aeronaveRascunho
      }

      let res = await Api.editRascunho(selecionado.id, item)
    }
    setSelecionados([])
    setSelecao(false)
    setAeronaveRascunho()
    alert('Aeronave trocada com sucesso')
    location.reload()
  }

  const handleMesclarRascunhos = () => {
    if(selecionados.length < 2) {
      alert('Selecione ao menos dois itens para mesclar!')
      return
    }
      const confirmacao = window.confirm('Deseja mesmo mesclar os itens selecionados?');
      if (confirmacao) {
        handleMesclarItens()
      }
  }

  const handleAvancarRascunho = async () => {
    if(selecionados.length < 1) {
      alert('Selecione ao menos 1 item para avançar!')
      return
    }
    for (const selecionado of selecionados) {
      const dataMoment = moment(selecionado.data, 'YYYY-MM-DD');
      const dataNova = dataMoment.add(1, 'days');
      const dataFormatada = dataNova.format('YYYY-MM-DD');
      let res = await Api.editRascunho(selecionado.id, {data:dataFormatada})
    }
    setSelecionados([])
    setSelecao(false)
    location.reload()
  }

  const handleRetrocederRascunho = async () => {
    if(selecionados.length < 1) {
      alert('Selecione ao menos 1 item para avançar!')
      return
    }
    for (const selecionado of selecionados) {
      const dataMoment = moment(selecionado.data, 'YYYY-MM-DD');
      const dataNova = dataMoment.subtract(1, 'days');
      const dataFormatada = dataNova.format('YYYY-MM-DD');
      let res = await Api.editRascunho(selecionado.id, {data:dataFormatada})
    }
    setSelecionados([])
    setSelecao(false)
    location.reload()
  }

  

  const handleExcluirItens = () => {
    if(selecionados.length < 1) {
      alert('Selecione ao menos 1 item para excluir!')
      return
    }
      const confirmacao = window.confirm('Deseja mesmo excluir os itens selecionados?');
      if (confirmacao) {
        handleExcluirItensConfirmacao()
      }
  }



  const handleExcluirItensConfirmacao = async () => {
    for (const selecionado of selecionados) {
      let res = await Api.excluirRascunho(selecionado.id)
    }
    setSelecionados([])
    setSelecao(false)
    alert('Itens excluidos com sucesso')
    location.reload()
  }

  const handleOcultaAviao = async (index, item) => {
    console.log(item)
    let data_copy =  {...data}
    let res = await Api.ocultarAnv(item.id, {oculta: !data_copy.avioes[index].oculta})
    data_copy.avioes[index].oculta = !data_copy.avioes[index].oculta
    setData(data_copy)
  }

  const handleMesclarItens = async () => {
    for (const [index, item] of selecionados.entries()) {
      if(index != 0) {
        let new_item = {
          ofrag: selecionados[0].ofrag,
          trip: selecionados[0].trip,
          obs: selecionados[0].obs,
          cor: selecionados[0].cor,
        }
        let res = await Api.editRascunho(item.id, new_item)
      }
    }
    setSelecionados([])
    setSelecao(false)
    alert('Itens mesclados com sucesso')
    location.reload()
  }

  useEffect(()=>{
    handleTrocaAviao()
  },[aeronaveMissao])

  useEffect(()=>{
    getHorarioPouso()
  },[icaoDestinoAdd, icaoOrigemAdd, dataEtapa])

  useEffect(()=>{
    getCombustivelMinimo(icaoOrigemAdd, icaoDestinoAdd, icaoAltAdd)
  },[icaoDestinoAdd, icaoOrigemAdd, icaoAltAdd])
  
  useEffect(()=>{
    getAeronaves()
    getOfrags()
  },[])

  useEffect(()=>{
    getDias(firstDay)
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

  const DateInputWhite = ({ value, onClick }) => (
    <button style={{backgroundColor: '#fff', color: '#000'}} className="calendario" onClick={onClick}>
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
            <button onClick={handleCreate} className='calendario'>Missão</button>
            <button onClick={handleCreateSobreaviso} className='calendario'>Sobreaviso</button>
            <button onClick={handleCreateObs} className='calendario'>OBS</button>
            <button onClick={handleCreateManut} className='calendario'>Manutenção</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          { selecao &&
          <div style={{display:'flex',alignItems: 'center', justifyContent: 'center'}}>
            <img onClick={handleRetrocederRascunho} style={{marginRight:10, cursor: 'pointer'}} width="50px" src="https://www.1gtt.com.br/fast-backward.png" />
            <button onClick={handleLimparSelecao} style={{marginRight:5}} className='calendario vermelho'>Limpar Seleção</button>
            <button onClick={handleTrocarAeronave} style={{marginRight:5}} className='calendario'>Trocar Aeronave</button>
            <button onClick={handleMesclarRascunhos} style={{marginRight:5}} className='calendario verde'>Mesclar</button>
            <button onClick={handleExcluirItens} style={{marginRight:5}} className='calendario vermelho'>Excluir Itens</button>
            <img onClick={handleAvancarRascunho} style={{marginLeft:10, cursor: 'pointer'}} width="50px" src="https://www.1gtt.com.br/fast-forward.png" />
          </div>
          }

        </div>
         <div style={{display: 'flex', flexDirection:'column', width:'100%'}}>
          <div className='topo'>
            <div className='missao'>Avião</div>
            {semana.map((item,index)=>{
              const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
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

                const partesData = item.split('/'); // Dividir a string em partes: [09, 08, 2023]
                const data = new Date(partesData[2], partesData[1] - 1, partesData[0]); // Mês é indexado em 0

                // Agora, pegamos o dia da semana (0 = Domingo, 1 = Segunda, ...)
                const diaDaSemanaIndex = data.getUTCDay(); // Retorna um número entre 0 e 6

                // Finalmente, pegamos o nome do dia da semana a partir do array
                const diaDaSemanaNome = diasDaSemana[diaDaSemanaIndex];

                return <div  className='missao data' style={{backgroundColor: hoje_string == item ? '#46a31d' : '#000'}}><span>{item}</span> <span>{diaDaSemanaNome}</span></div>
            })}
          </div>
          <div className='missoes'>
            
          <div className='missao-item'> 
            <div className='missao aviao'>OBS</div>
            {semana.map(i=>{
                return <div className='item-missao obs-style'>
                  {observacoes.map(it=>{
                    const [dia, mes, ano] = i.split("/");
                    const data = new Date(ano, mes - 1, dia);
                    let inicio_date = new Date(it.inicio)
                    let fim_date = new Date(it.fim)

                    if(data.getTime() <= fim_date.getTime() && data.getTime() >= inicio_date.getTime()) {
                      return <div className='missao-white white' 
                            //onMouseEnter={() => handleMouseEnterObs(it.observacoes)}
                            onClick={()=>handleEditObs(it)}
                            onMouseLeave={handleMouseLeaveObs}
                      >
                        
                        {it.titulo}</div>
                    }
                  })}

                </div>
            })}
          </div>
            {(data.avioes.length > 0 ) && data.avioes.map((item, index)=>{
              console.log(item)
              return <div className='missao-item'>
                <div className={(item.situacao == 'IN' || item.situacao == 'IS' || item.situacao == 'II') ? 'missao aviao in' : 'missao aviao'}>
                <span style={{cursor: 'pointer'}} onClick={()=>selectAviao(item.aviao, item.id, item.ciclos, item.horas, item.situacao, item.atualizador, item.atualizado)}>{item.aviao}</span>
                {
                  !item.oculta ? <><span className='dados-aviao'>Situação: {item.situacao}</span>
                <span className='dados-aviao'>Ciclos: {item.ciclos}</span>
                <span className='dados-aviao'>Horas: {item.horas}
                </span></> : null}
                {item.oculta ? <img onClick={()=>handleOcultaAviao(index, item)} style={{marginBottom: 5, cursor: 'pointer'}} width="20px" height="20px" src="https://1gtt.com.br/down-white.png"/> : <img onClick={()=>handleOcultaAviao(index, item)} style={{marginBottom: 5, cursor: 'pointer'}} width="20px" height="20px" src="https://1gtt.com.br/up-white.png"/>}
                </div>
                {semana.map(i=>{
                 return <div className='item-missao' style={{cursor: 'pointer'}} onClick={(e)=>handleClickAddRascunho(e, i, item.id)}>
                     {Object.keys(manutencoes).map((data) => {
                      const aeronaves = manutencoes[data];
                      return Object.keys(aeronaves).map((aeronave) => {
                        const manutencoesAeronave = aeronaves[aeronave];
                        return manutencoesAeronave.map((manutencao) => {
                          if ((aeronave == item.aviao) && data == i) {
                            return <div className='missao-red red' key={manutencao.id} onClick={()=>handleEditmanut(manutencao)}>
                            {manutencao.titulo}
                          </div>
                          }
                        });
                      });
                    })}
                      {
                        rascunhos.map(item_rascunho=>{
                          let [ano,mes,dia] = item_rascunho.data.split('-')
                          let new_date = dia+'/'+mes+'/'+ano
                          let trip_split = item_rascunho.trip.split('/')
                          if(trip_split.length > 0) {
                            var trip = trip_split.join('/ ')
                          } else {
                            var trip = item_rascunho.trip
                          }
                          if(new_date == i && item_rascunho.Aeronave.aeronave == item.aviao) {
                            if (trip.length > 25) {
                              trip = trip.slice(0, 25)+'...';
                            } else {
                              trip = trip.trip
                            }

                            return (
                              <div className={selecionados.findIndex(i=>i.id == item_rascunho.id) == 0 ? 'missao-white rascunho-dashed' :'missao-white rascunho' }
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                              onMouseEnter={() => handleMouseEnterRascunho(item_rascunho)}
                              onMouseLeave={handleMouseLeaveRascunho}
                              onClick={()=>handleEditarRascunho(item_rascunho)} 
                              style={{backgroundColor: item_rascunho.cor, borderRadius:5, display: 'flex', flexDirection: 'column'}}
                              >
                                         { caixaVisibleRascunho && idRascunhoToShow == item_rascunho.id && <div 
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
                            <p style={{fontSize: '1vw'}}>Trip: {rascunhoToShow.trip}</p>
                            
                          </div>}
                          <div className='right-rascunho'>
                                  {
                                    selecao && 
                                    <>
                                    {selecionados.findIndex(i=>i.id == item_rascunho.id) >= 0 ?
                                    <img width="14px" height="14px" src="http://www.1gtt.com.br/correct.png" onClick={()=>handleBolaClick(item_rascunho)} /> :
                                    <div className='bola' onClick={()=>handleBolaClick(item_rascunho)}>
                                    </div>}
                                    </>
                        
                                  }
                                 
                                </div>
                                <div className='left-rascunho' style={{display: 'flex', flexDirection: 'column'}}>
                                  <span className='item-rascunho'>{item_rascunho.planejamento}</span>
                                  <span className='item-rascunho'>{item_rascunho.ofrag}</span>
                                  <span className='item-rascunho'>{item_rascunho.trip}</span>
                                  <span className='item-rascunho'>{item_rascunho.obs}</span>
                                </div>
                              </div>
                            )
                          }
                        })
                      }
                      {item.eventos.length >0 && item.eventos.map(it=>{
                          if(it.data == i) {
                            return <div 
                            onClick={()=>handleEditMission(item, it)} className={it.missao.tripulacao.length<=0 ? 'missao-white white' : 'missao-white green'}
                            onMouseEnter={() => handleMouseEnter(it.missao.id, it.missao, it)}
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
                            <p style={{fontSize: '1vw'}}>OMIS: {etapaToShow.omis}</p>
                            <p style={{fontSize: '1vw'}}>{ofragToShow}</p>
                            <p style={{fontSize: '1vw'}}>Tripulação: {tripulacaoShow}</p>
                            
                          </div>}
                          {(it.missao.horaDep != it.missao.horaPouso) ? <>
                            <div className='text-missao'>{it.missao.horaDep} {it.missao.dep}</div>  
                            <div className='text-missao'>{it.missao.horaPouso} {it.missao.pouso} </div> </> :
                            <div className='text-missao'>{it.missao.dep}</div>  
                          }
                          </div>
                          }
                      })}
                    </div>
                })}
              </div>
            })}
            <div className='missao-item'>
              <div className='missao aviao'>Sobreaviso</div>
              {semana.map(i=>{
            
                return <div className='item-missao'>
                      {sobreavisos.map(it=>{
                        const [dia, mes, ano] = i.split("/");
                        const data = new Date(ano, mes - 1, dia);
                        let data_sobreaviso = new Date(it.data)

                        const diaData1 = data.getDate();
                        const mesData1 = data.getMonth();
                        const anoData1 = data.getFullYear();
                        
                        const diaData2 = data_sobreaviso.getDate();
                        const mesData2 = data_sobreaviso.getMonth();
                        const anoData2 = data_sobreaviso.getFullYear();

                        const saoIguais = diaData1 === diaData2 && mesData1 === mesData2 && anoData1 === anoData2;

                        if(saoIguais) {
                          var trigramas_pilotos = []
                          var trigramas_mecanicos = []
                          var trigramas_loadmasters = []
                          var trigramas_comissarios = []
                          it.Usuarios.forEach((itm,idx)=>{
                            if(itm.FuncoesAbordo.nome == 'Piloto') {
                              trigramas_pilotos.push(itm.Trigrama.trigrama)
                            }
                            if(itm.FuncoesAbordo.nome == 'Mecânico de Voo') {
                              trigramas_mecanicos.push(itm.Trigrama.trigrama)
                            }
                            if(itm.FuncoesAbordo.nome == 'Loadmaster') {
                              trigramas_loadmasters.push(itm.Trigrama.trigrama)
                            }
                            if(itm.FuncoesAbordo.nome == 'Comissário') {
                              trigramas_comissarios.push(itm.Trigrama.trigrama)
                            }
                          })
                          return <div className='div-trigramas-sobreaviso' onClick={()=>handleEditaSobreaviso(it)}>
                                    <span className='trigrama-sobreaviso'>{trigramas_pilotos.join(' / ')}</span>
                                    <span className='trigrama-sobreaviso'>{trigramas_mecanicos.join(' / ')}</span>
                                    <span className='trigrama-sobreaviso'>{trigramas_loadmasters.join(' / ')}</span>
                                    <span className='trigrama-sobreaviso'>{trigramas_comissarios.join(' / ')}</span>
                                  </div>
                        }
                      })}
                </div>
              })}
            </div>
            </div>
         </div>

          <div ref={divRef} className={caixaCreateVisible ? 'modal-create-visible' : 'modal-create'}>
            <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
              <div onClick={handleCloseModal} style={{color:'#fff'}}>X</div>
            </div>
            <div className='criar-div'>
              <h3 style={{color:'#fff'}}>{editMission ? 'Editar' :  'Criar'} Missão</h3>
              {editMission && tripulacao.length > 0 ? <button className='ver-omis' onClick={getOmis}>Ver OMIS</button>: null}
              {editMission && tripulacao.length > 0 ? <button className='ver-omis' onClick={getLanche}>Ver Lanche</button>: null}
            </div>
            

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:20, alignItems: 'center'}}>
              <span style={{color:'#fff'}}>Avião:</span>
              {aeronaves.map(item=>{
                return <button onClick={()=>{
                  setAeronaveMissao(item.aeronave)
                  setIdAeronaveMissao(item.id)
                  let etapas_copy = {...etapas}
                  etapas_copy.aviao = item.aeronave
              
                  setEtapas(etapas_copy)
                }} style={{backgroundColor: aeronaveMissao == item.aeronave ? '#28a745' : '#FFF' , color: aeronaveMissao == item.aeronave ? '#fff' : '#000'}} className='botao-aviao'>{item.aeronave}</button>
              })}
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:20, alignItems: 'center'}}>
              <span style={{color:'#fff'}}>OMIS:</span>
              <div style={{color: '#fff'}}>
                <MaskedNumeroOmis value={omis} onChange={setOmis} disabled={disabledOmis}/>
                { disabledOmis && <button onClick={()=>setDisabledOmis(false)} className='cumprir'>Editar</button>}
                { !disabledOmis && <button onClick={()=>setDisabledOmis(true)} className='cumprir'>Salvar Número</button>}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:20, alignItems: 'center'}}>
              <span style={{color:'#fff'}}>OFRAG:</span>
              <div style={{color: '#fff'}}>
                <select id="select-box" style={{borderRadius:5}} value={ofragSelected} onChange={(e)=>{

                  setOfragSelected(e.target.value)
                  }}>
                  <option value="">Selecione uma opção</option>
                  {(ofrags.length > 0) ?  ofrags.map((option, index) => (
                    <option style={{backgroundColor: '#fff'}} key={index} value={option.id}>
                      {option.numero} - V{option.versao}
                    </option>
                  )) : null}
                </select>
                {(ofragSelected != '' && !cumprir) ? (!loadingCumprir ? <button onClick={getOfrag} className='cumprir'>Cumprir</button> : <LoadingSpinner/>) : null}
                {errorCumprir != '' &&  <div style={{marginTop:10}} class="alert alert-danger" role="alert">
                    {errorCumprir}
                </div>}
              </div>
            </div>

            <div className='add-etapa'>
                <span style={{color:'#fff'}}>Etapas:</span>
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
                      timeIntervals={5}
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
                   <MaskedInputIcao ref={inputPousoRef} id='icao-pouso' onKeyPress={handleKeyPress} erro={erroIcaoPouso} maxLength={4} value={icaoDestinoAdd} onChange={setIcaoDestinoAdd}/>
                 </div>
                 <div className='form-add'>
                   <span style={{color:'#000'}}>ICAO de Alternativa: </span>
                   <MaskedInputIcao ref={inputAltRef} onKeyPress={handleKeyPress} erro={erroIcaoAlt} maxLength={4} value={icaoAltAdd} onChange={setIcaoAltAdd}/>
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
                      timeIntervals={5}
                      dateFormat="LLL"
                      />
                      </div>
                  </div>
                 </div>
                 <div className='form-add'>
                   <span style={{color:'#000'}}>COMB Mínimo: </span>
                   <MaskedCombustivel onKeyPress={handleKeyPress} value={combustivel} onChange={setCombustivel}/>
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
                        divRef.current.scrollTop = 0;
                      }} 
                      del={()=>{
                        let etapas_copy = {...etapas}
                        
                        let eventos_filter = etapas_copy.eventos.filter((it, id) => {
                          if(id != index) {
                            return it
                          }
                        })
                        etapas_copy.eventos = eventos_filter
                        let data_copy = {...data}
                        var index_data = data_copy.avioes.findIndex(i=>i.aviao == aeronaveMissao)
                        if(index_data >=0) {
                          data_copy.avioes[index_data].eventos = data_copy.avioes[index_data].eventos.filter((itm, idx)=>itm.missao.dep != item.missao.dep && itm.missao.horaDep != item.missao.horaDep && itm.missao.pouso != item.missao.pouso)
                          setData(data_copy)
                        }
                        setEtapas(etapas_copy)
                      }} 
                      index={index} 
                      dep={item.missao.dep} 
                      pouso={item.missao.pouso} 
                      alternativa={item.missao.alternativa}
                      horaDep={item.missao.horaDep} 
                      horaPouso={item.missao.horaPouso}
                      data={item.data}
                      />
            })}

    <div className='add-trip'>
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
    <div style={{marginTop: 30, display: 'flex', flexDirection: 'column'}}>
      <span style={{color:'#fff'}}>Configuração: </span>
      <textarea value={configuracao} onChange={(e)=>setConfiguracao(e.target.value)} style={{borderRadius: 10, padding:5}}></textarea>
    </div>
    <div style={{marginTop: 30, display: 'flex', flexDirection: 'column'}}>
      <span style={{color:'#fff'}}>Comentários: </span>
      <textarea value={comentarios} onChange={(e)=>setComentarios(e.target.value)} style={{borderRadius: 10, padding:5}}></textarea>
    </div>
    <div style={{marginTop: 30, display: 'flex', flexDirection: 'column'}}>
      <span style={{color:'#fff'}}>Esforço Aéreo: </span>
      <textarea value={esforco} onChange={(e)=>setEsforco(e.target.value)} style={{borderRadius: 10, padding:5}}></textarea>
    </div>

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

        <div ref={divRef} className={caixaCreateVisibleSobreaviso ? 'modal-create-visible' : 'modal-create'}>
        <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
          <div onClick={handleCloseModalSobreaviso} style={{color:'#fff'}}>X</div>
        </div>
        <div className='criar-div'>
          <h3 style={{color:'#fff'}}>{editSobreaviso ? 'Editar' :  'Criar'} Sobreaviso</h3>
        </div>
        <div className='form-area'>
        <div className='form-add' style={{alignItems: 'center'}}>
                   <span style={{color:'#000'}}>Data: </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  {dataEtapa.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit'})}
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
                      customInput={<DateInputWhite />}
                      //showTimeSelect
                      //timeFormat="HH:mm"
                      timeIntervals={5}
                      //dateFormat="LLL"
                      timeZone="Etc/UTC"
                      timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
                      />    
                      </div>
                  </div>
                 </div>
        </div>
        

        <div className='add-trip'>
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


</div>


<div className='botoes-add-etapa' style={{marginTop:30}}>
<button className='cancelar' style={{fontSize: '1vw'}} onClick={()=>{
  setTripulacao([])
}}>Limpar</button>
{loadingSave ? <LoadingSpinner/> : <button className='adicionar' style={{fontSize: '1vw'}} onClick={editSobreaviso ? handleEditaItemSobreaviso :handleCriaSobreaviso}>{editSobreaviso ? 'Editar Sobreaviso' : 'Criar Sobreaviso'}</button>}
</div>

<div className='botoes-add-etapa' style={{marginTop:30, justifyContent:'center'}}>
{loadingExcluir && <LoadingSpinner />}
{
editSobreaviso ? <button className='cancelar' style={{fontSize: '1.3vw'}} onClick={handleExcluiSobreavisAviso}>Excluir Sobreaviso</button>
:  <></>
}

</div>
</div>
    
      </CCard>

       { caixaObsVisible && <div className='modal-aviao' style={{alignItems: 'flex-end'}} onMouseLeave={handleMouseLeaveObs}>
       <span onClick={()=>{
          setCaixaObsVisible(false)
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
            <p style={{fontSize: '1vw', color: '#fff', marginTop: 20 }}>{obsText}</p>
                            
            </div>}

            { caixaCreateVisibleObs && <div className='modal-aviao' style={{alignItems: 'flex-end'}}>
       <span onClick={()=>{
          setCaixaCreateVisibleObs(false)
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
            <div className='modal-body'>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Título:</span>
                  <MaskedCiclos value={ciclos} onChange={setCiclos} />
                </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Observação:</span>
                  <MaskedCiclos value={ciclos} onChange={setCiclos} />
                </div>
            </div>
                            
            </div>}

            { caixaCreateVisibleObsEdit && <div className='modal-aviao' style={{alignItems: 'flex-end'}}>
       <span onClick={()=>{
          setCaixaCreateVisibleObsEdit(false)
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
            <div className='modal-body'>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Título:</span>
                  <MaskedObs value={tituloObs} onChange={setTituloObs} />
                </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Comentários:</span>
                </div>
                <MaskedObsTextArea linhas={4} value={comentarioObs} onChange={setComentarioObs} />
                <div className='item-modal-body'>
                <span style={{color:'#fff', marginRight:10}}>Inicio: </span>
                <div style={{display: 'flex', color:'#fff', alignItems: 'center'}}>
                  <div className='input-obs'>                  
                    {dataInicioObs.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit'})}
                  </div>
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataInicioObs}
                      timeInputLabel={dataInicioObs}
                      onChange={(date) => {
                        //var offset = date.getTimezoneOffset();
                        // Convertendo a data para UTC
                        //date.setMinutes(date.getMinutes() - offset);
                        setDataInicioObs(date);
                        }}
                      customInput={<DateInputWhite />}
                      //showTimeSelect
                      //timeFormat="HH:mm"
                      timeIntervals={5}
                      //dateFormat="LLL"
                      timeZone="Etc/UTC"
                      timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
                      />
                      </div>
                  </div>
                </div>

                <div className='item-modal-body'>
                <span style={{color:'#fff', marginRight:10}}>Fim: </span>
                <div style={{display: 'flex', color:'#fff', alignItems: 'center'}}>
                <div className='input-obs'>
                  {dataFimObs.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit'})}
                </div>
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataFimObs}
                      timeInputLabel={dataFimObs}
                      onChange={(date) => {
                        //var offset = date.getTimezoneOffset();
                        // Convertendo a data para UTC
                        //date.setMinutes(date.getMinutes() - offset);
                        setDataFimObs(date);
                        }}
                      customInput={<DateInputWhite />}
                      //showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      dateFormat="LLL"
                      timeZone="Etc/UTC"
                      timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
                      />
                      </div>
                  </div>
                </div>
                <div className='modal-bottom'>
                  <button onClick={handleSaveObs} className='salvar'>{isEditObs ? 'Editar' : 'Salvar'}</button>
                </div>
                {isEditObs && 
                <div className='modal-bottom'>
                  <button onClick={handleExcluiObsAviso} className='excluir'>{'Excluir'}</button>
                </div>}
            </div>
                            
            </div>}

            { caixaCreateManutencaoVisible && <div className='modal-aviao' style={{alignItems: 'flex-end'}}>
       <span onClick={()=>{
          setCaixaCreateManutencaoVisible(false)
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
            <div className='modal-body'>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:20, alignItems: 'center'}}>
              <span style={{color:'#fff'}}>Avião:</span>
              {aeronaves.map(item=>{
                return <button onClick={()=>{
                  setAerononaveManut(item.aeronave)
                  setIdAeronaveManut(item.id)
                  let etapas_copy = {...etapas}
                  etapas_copy.aviao = item.aeronave
              
                  setEtapas(etapas_copy)
                }} style={{backgroundColor: aerononaveManut == item.aeronave ? '#28a745' : '#FFF' , color: aerononaveManut == item.aeronave ? '#fff' : '#000'}} className='botao-aviao'>{item.aeronave}</button>
              })}
            </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Título:</span>
                  <MaskedObs value={tituloManutencao} onChange={setTituloManutencao} />
                </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Descricão:</span>
                </div>
                <MaskedObsTextArea linhas={4} value={comentariosManutencao} onChange={setComentariosManutencao} />
                <div className='item-modal-body'>
                <span style={{color:'#fff', marginRight:10}}>Inicio: </span>
                <div style={{display: 'flex', color:'#fff', alignItems: 'center'}}>
                  <div className='input-obs'>                  
                  {dataInicioManut.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric'})+'Z'}
                  </div>
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataInicioManut}
                      timeInputLabel={dataInicioManut}
                      onChange={(date) => {
                        setDataInicioManut(date);
                        }}
                      customInput={<DateInputWhite />}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      dateFormat="LLL"
                      timeZone="Etc/UTC"
                      timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
                      />
                      </div>
                  </div>
                </div>

                <div className='item-modal-body'>
                <span style={{color:'#fff', marginRight:10}}>Fim: </span>
                <div style={{display: 'flex', color:'#fff', alignItems: 'center'}}>
                <div className='input-obs'>
                {dataFimManut.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric'})+'Z'}
                </div>
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataFimManut}
                      timeInputLabel={dataFimManut}
                      onChange={(date) => {
                        setDataFimManut(date);
                        }}
                      customInput={<DateInputWhite />}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={5}
                      dateFormat="LLL"
                      timeZone="Etc/UTC"
                      timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
                      />
                      </div>
                  </div>
                </div>
                <div className='modal-bottom'>
                  <button onClick={handleSaveManut} className='salvar'>{isEditManut ? 'Editar' : 'Salvar'}</button>
                </div>
                {isEditManut && 
                <div className='modal-bottom'>
                  <button onClick={handleExcluiManutAviso} className='excluir'>{'Excluir'}</button>
                </div>}
            </div>
                            
            </div>}

            { caixaCreateVisibleRascunho && <div className='modal-aviao' style={{alignItems: 'flex-start', width:300}}>
       <span onClick={()=>{
          setCaixaCreateVisibleRascunho(false)
          setPlanejamento('')
          setObs('')
          setTrip('')
          setOfrag('')
          setIdAeronaveRascunho('')
          setIsEditRascunho(false)
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
            <div className='modal-body' style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <div className='item-body-modal' style={{display: 'flex', flexDirection: 'column'}}>
              <span className='text-modal' style={{color: '#fff'}}>Status:</span>
              <select style={{borderRadius: 10}} value={statusSelected} onChange={(e)=>{
              setStatusSelected(e.target.value)
              }}>
              {cores.map((item, index)=>{
                return <option key={index} value={item.value}>{item.label}</option>
              })}
            </select>
            </div>

                <div className='item-body-modal' style={{display: 'flex', flexDirection: 'column'}}>
                  <span className='text-modal' style={{color: '#fff'}}>Planejamento::</span>
                  <MaskedString value={planejamento} onChange={setPlanejamento} />
                </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Ofrag:</span>
                  <MaskedString style={{width: '100% !important'}} value={ofrag} onChange={setOfrag} />
                </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>Trip:</span>
                  <MaskedString value={trip} onChange={setTrip} />
                </div>
                <div className='item-body-modal'>
                  <span className='text-modal' style={{color: '#fff'}}>OBS:</span>
                  <MaskedString value={obs} onChange={setObs} />
                </div>
                <div className='modal-bottom' style={{marginTop:10}}>
                  <button onClick={handleCriarRascunho} className='salvar'>{isEditRascunho ? 'Editar' : 'Salvar'}</button>
                </div>
            </div>
                            
            </div>}

            { caixaCreateVisibleRascunhoAeronave && <div className='modal-aviao' style={{alignItems: 'flex-start'}}>
       <span onClick={()=>{
          setCaixaCreateVisibleRascunhoAeronave(false)
          setAeronaveRascunho('')
          setIdAeronaveRascunho('')
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
            <div className='modal-body' style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <div className='item-body-modal' style={{display: 'flex', flexDirection: 'column'}}>
              <span className='text-modal' style={{color: '#fff'}}>Aeronave:</span>
              <select style={{borderRadius: 10, marginTop:5}} value={aeronaveRascunho} onChange={(e)=>{
              setAeronaveRascunho(e.target.value)
              }}>
              {aeronaves.map((item, index)=>{
                return <option key={index} value={item.id}>{item.aeronave}</option>
              })}
            </select>
            </div>
                <div className='modal-bottom' style={{marginTop:10}}>
                  <button onClick={handleTrocarAeronaveSave} className='salvar'>Trocar Aeronave</button>
                </div>
            </div>
                            
            </div>}

      {
      modalAviao &&  <div className='modal-aviao'>
      <div className='modal-topo'>
      <div className='nome-aviao'>
        <span className='title-modal' style={{color: '#fff'}}>FAB {aviaoSelectedModal}</span>
      </div>
        <span onClick={()=>{
          setModalAviao(false)
        }}  className='title-modal' style={{color: '#fff', cursor: 'pointer'}}>X</span>
      </div>
      <div className='modal-body'>
        <div className='item-body-modal'>
          <span className='text-modal' style={{color: '#fff'}}>Ciclos:</span>
          <MaskedCiclos value={ciclos} onChange={setCiclos} />
        </div>
        <div className='item-body-modal'>
          <span className='text-modal' style={{color: '#fff'}}>Horas:</span>
          <MaskedHoras value={horas} onChange={setHoras} />
        </div>
        <div className='item-body-modal'>
          <span className='text-modal' style={{color: '#fff'}}>Situação:</span>
          <select style={{borderRadius: 10}} value={situacaoAviao} onChange={(e)=>{
            setSituacaoAviao(e.target.value)
            }}>
            {situacoes.map((item, index)=>{
              return <option key={index} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className='item-body-modal'>
            <span className='text-modal' style={{color: '#fff'}}>Atualizado por: {atualizador}</span>
        </div>
        <div className='item-body-modal'>
            <span className='text-modal' style={{color: '#fff'}}>Em: {dataAtualizacao} Z</span>
        </div>
      </div>
      <div className='modal-bottom'>
        <button onClick={handleSaveAviao} className='salvar'>Salvar</button>
      </div>
   </div>
     }
     
    </>
  )
}

export default Dashboard
