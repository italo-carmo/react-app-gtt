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
  const [aeronaves, setAeronaves] = useState([])
  const [loadingExcluir, setLoadingExcluir] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [loadingCumprir, setLoadingCumprir] = useState(false)
  const [idMissaoEdit, setIdMissaoEdit] = useState('')
  const [trigrama, setTrigrama] = useState('')
  const [omis, setOmis] = useState('')
  const [comentarios, setComentarios] = useState('')
  const [ofragSelected, setOfragSelected] = useState('')
  const [ofrags, setOfrags] = useState([])
  const [combustivel, setCombustivel] = useState(0)
  const [disabledOmis, setDisabledOmis] = useState(true)

  const inputPousoRef = useRef(null)
  const inputAltRef = useRef(null)
  const divRef = useRef(null);

  const Api = useApi()

  const handleMouseEnter = (id,etapa) => {
    setId(id)
    
    let trip_show = etapa.tripulacao.map(item=>{
      return item.trigrama
    })

    setTripulacaoShow(trip_show.join('/'))
    setEtapaToShow(etapa)
    setCaixaVisible(true);
  };

  const handleMouseLeave = () => {
    setCaixaVisible(false);
  };

  const handleEditMission = (missao, missaoClicked) => {
    setLoadingExcluir(false)
    setLoadingSave(false)
    setEditMission(true)
    setEditEtapa(false)
    let id_missao = missaoClicked.missao.id_missao
    setIdMissaoEdit(id_missao)
    setOfragSelected(missao.eventos[0].id_documento)
    let etapas_copy = {...etapas}
    let tripulacao_get = []

    missaoClicked.missao.tripulacao.forEach(item=>{
      tripulacao_get.push(item)
    })
    let comentarios_get = missaoClicked.comentarios

    setComentarios(comentarios_get)

    let omis_get = missaoClicked.missao.omis
    setOmis(omis_get)

    setTripulacao(tripulacao_get)

    etapas_copy.eventos = missao.eventos.filter(i=>{
      if(i.missao.id_missao == id_missao) {
        return i
      }
    })
    console.log(etapas_copy)
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
      console.log(res)
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
    if(editMission) {
      setErrorCumprir('Exclua essa OMIS e crie outra para cumprir com OFRAG')
      return
    }
    if(ofragSelected != '') {
      let res = await Api.getOfrag(ofragSelected)
      
      if(!res.error) {
        let etapas_get = []
        var data_copy = {...data}

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
          let etapas_copy = {...etapas}
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
      let tripulacao = []
      console.log(etapas)
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
        omis: etapas.eventos[0].omis,
        ofrag: etapas.eventos[0].ofrag,
        horas: converterMinutosParaHoras(minutos_totais)
      }

      const dados = encodeURIComponent(JSON.stringify(item_dados));
      const url = `/omis?dados=${dados}`;
      window.open(url, '_blank');
  }

  const getCombustivelMinimo = async (dep, pouso, alternativa) => {
    console.log(dep, pouso, alternativa)
    if(dep != '' && pouso!= '' && alternativa != '' && dep.length == 4 && pouso.length == 4 && alternativa.length == 4) {
      let res = await Api.getCombMinimo({dep, pouso, alternativa})
      if(!res.error) {
        setCombustivel(res.data.combustivel)
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
      }
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
    setOmis('')
    setOfragSelected('')
    setEditMission(false)
    setEditEtapa(false)
    setTripulacao([])
    setCombustivel(0)
    getDias(firstDay, true)
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
    }
    setData(data_copy)
    setEtapas(etapas_copy)

    getNewEtapa(icaoDestinoAdd, dataEtapaPouso)
    return true
  }

  const getDadosEditEtapa = (index) => {
    let etapas_copy = {...etapas}
    let etapa = etapas_copy.eventos[index]
    //console.log(etapas_copy)
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
            <button onClick={handleCreate} className='calendario'>Criar Missão</button>
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
                            onClick={()=>handleEditMission(item, it)} className='missao-white white'
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
                            <p style={{fontSize: '1vw'}}>OMIS: {etapaToShow.omis}</p>
                            <p style={{fontSize: '1vw'}}>Tripulação: {tripulacaoShow}</p>
                            
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

          <div ref={divRef} className={caixaCreateVisible ? 'modal-create-visible' : 'modal-create'}>
            <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
              <div onClick={handleCloseModal} style={{color:'#fff'}}>X</div>
            </div>
            <div className='criar-div'>
              <h3 style={{color:'#fff'}}>{editMission ? 'Editar' :  'Criar'} Missão</h3>
              {editMission ? <button className='ver-omis' onClick={getOmis}>Ver OMIS</button>: null}
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
                      {option.numero}
                    </option>
                  )) : null}
                </select>
                {(ofragSelected != '' && !editMission && !cumprir) ? (!loadingCumprir ? <button onClick={getOfrag} className='cumprir'>Cumprir</button> : <LoadingSpinner/>) : null}
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
                      timeIntervals={10}
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
                        setEtapas(etapas_copy)
                      }} 
                      index={index} 
                      dep={item.missao.dep} 
                      pouso={item.missao.pouso} 
                      alternativa={item.missao.alternativa}
                      horaDep={item.missao.horaDep} 
                      horaPouso={item.missao.horaPouso} />
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
      <span style={{color:'#fff'}}>Comentários: </span>
      <textarea value={comentarios} onChange={(e)=>setComentarios(e.target.value)} style={{borderRadius: 10, padding:5}}></textarea>
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
       
    
      </CCard>


     
    </>
  )
}

export default Dashboard
