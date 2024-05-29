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



const Etapas = () => {

  const [etapas, setEtapas] = useState([])
  const [etapasFiltered, setEtapasFiltered] = useState([])
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [omis, setOmis] = useState('');
  const [ofrag, setOfrag] = useState('');
  const [esforcoAereo, setEsforcoAereo] = useState('');
  const [aeronave, setAeronave] = useState('');
  const [trigrama, setTrigrama] = useState('');
  const [icao, setIcao] = useState('');
  const [esforcos, setEsforcos] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);
  const [horasTotais, setHorasTotais] = useState(0);
  const [loading, setLoading] = useState(false)
  const [limite, setLimite] = useState(20)
  const [horasNoturnasTotais, setHorasNoturnasTotais] = useState('')
  const [combTotais, setCombTotais] = useState(0)
  const [lubTotais, setLubTotais] = useState(0)
  const [paxTotais, setPaxTotais] = useState(0)
  const [horasIfrTotais, setHorasIfrTotais] = useState('')
  const [cargasTotais, setCargasTotais] = useState(0)
  const [pouosTotais, setPousosTotais] = useState(0)
  const [procedimentosTotais, setProcedimentosTotais] = useState(0)
  const [pqdsTotais, setPqdsTotais] = useState(0)

  const Api = useApi()

  const getEtapas = async () => {
    setLoading(true)
    setEtapas([])
    setEtapasFiltered([])
    let res = await Api.getEtapas({limit:limite})
    if(!res.error) {
      res.data.reverse()
      let res_filtered = res.data
      var horas_totais = 0
      var minutos_noturnos_totais = 0
      var comb_totais = 0
      var lub_totais = 0
      var pax_totais = 0
      var minutos_ifr_totais = 0
      var cargas_totais = 0
      var pousos_totais = 0
      var procedimentos_totais = 0
      var pqds_totais = 0

      res_filtered = res_filtered.map(it=>{
        if(it.Usuarios.length == 0) {
          it.tempo_de_voo = '00:00'
        }
        return it
      })

      res_filtered.forEach(item => {
        let [horasStr, minutosStr] = item.tempo_de_voo.split(':');
        const horas = parseInt(horasStr, 10);
        const minutos = parseInt(minutosStr, 10);
        
        const minutosTotais = horas * 60 + minutos;
        horas_totais += minutosTotais;

        let minutos_noturnos = item.horas_noturnas ? item.horas_noturnas : 0
        minutos_noturnos_totais += minutos_noturnos

        let minutos_ifr = item.horas_instrumento ? item.horas_instrumento : 0
        minutos_ifr_totais += minutos_ifr
        
        comb_totais += item.combustivel
        lub_totais += item.lubrificante
        pax_totais += item.pax
        cargas_totais += somaCargas(item.Cargas)
        pousos_totais += item.pousos
        procedimentos_totais += somaProcedimentos(item.Procedimentos)
        pqds_totais += somaPqds(item.Assaets)
      })

      setHorasTotais(horas_totais)
      setEtapas(res_filtered)
      setEtapasFiltered(res_filtered)
      setCombTotais(comb_totais)
      setLubTotais(lub_totais)
      setPaxTotais(pax_totais)
      setHorasIfrTotais(minutos_ifr_totais)
      setCargasTotais(cargas_totais)
      setPousosTotais(pousos_totais)
      setProcedimentosTotais(procedimentos_totais)
      setPqdsTotais(pqds_totais)
    }
    setLoading(false)
  }
  
  useEffect(()=>{
    getEtapas()
    getEsforcos()
    getAeronaves()
  },[limite])

  const limites = [10,20,50,100,200,1000,10000]


  const transformHora = (date) => {
    let [data, horas] =  date.split('T')
    let [hora, minuto, segundo] = horas.split(':')
    return hora+':'+minuto+'Z'
   }

   const transformData = (date) => {
    let [data, horas] =  date.split('T')
    let [ano, mes, dia] = data.split('-')
    return dia+'/'+mes+'/'+ano
   }

   const transformTime = (time) => {
    let [hora, minuto, segundo] = time.split(':')
    return hora+':'+minuto
   }

   const transformMinutesToTime = (minutes) => {
    if (minutes == 0) {
      return '00:00'
    }
    const horas = Math.floor(minutes / 60);
    const minutosRestantes = minutes % 60;

    const formatoHora = (num) => (num < 10 ? "0" + num : num);

    const horaFormatada = formatoHora(horas);
    const minutosFormatados = formatoHora(minutosRestantes);

    return horaFormatada + ":" + minutosFormatados;
   }

   const transformOfrag = (texto) => {
    const padrao = /(\d+)/; // Expressão regular para extrair dígitos consecutivos
    const correspondencia = texto.match(padrao); // Procura a correspondência na string
      if (correspondencia) {
        const numeroExtraido = correspondencia[0]; // O primeiro grupo capturado (dígitos)
        return (numeroExtraido)
      } else {
        return 'S/N'
      }
   }

   const somaCargas = (item) => {
    var cargas = 0
    item.forEach(it=>{
      cargas += it.peso
    })
    return cargas
   }

   const somaPqds = (item) => {
    var pqds = 0
    item.forEach(it=>{
      pqds += it.quantidade_paraquedistas
    })
    return pqds
   }

   const somaProcedimentos = (item) => {
    var procedimentos = 0
    item.forEach(it=>{
      procedimentos += it.quantidade
    })
    return procedimentos
   }

   const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
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

  const inputStyleLow = {
    width:100
  };
  
   // Funções de ação para atualizar os estados quando os valores dos filtros mudarem
   const handleDataInicioChange = (e) => {
    setDataInicio(e.target.value);
  };

  const handleDataFimChange = (e) => {
    setDataFim(e.target.value);
  };

  const handleOmisChange = (e) => {
    setOmis(e.target.value);
  };

  const handleOfragChange = (e) => {
    setOfrag(e.target.value);
  };

  const handleEsforcoAereoChange = (e) => {
    setEsforcoAereo(e.target.value);
  };

  const handleIcaoChange = (e) => {
    setIcao(e.target.value);
  };

  const handleAeronaveChange = (e) => {
    setAeronave(e.target.value);
  };

  const handleChangeLimit = (e) => {
    setLimite(e.target.value);
  };
  

  const handleTrigramaChange = (e) => {
    setTrigrama(e.target.value);
  };

  const getEsforcos = async () => {
    let res = await Api.getEsforcoAereo()
    if(!res.error) {
      setEsforcos(res.data)
    }
  }

  const getAeronaves = async () => {
    let res = await Api.getAeronaves()
    if(!res.error) {
      setAeronaves(res.data)
    }
  }

  const handleLimpar = () => {
    setDataInicio('');
    setDataFim('');
    setOmis('');
    setOfrag('');
    setEsforcoAereo('');
    setAeronave('');
    setTrigrama('');
    setIcao('');
    setEtapasFiltered(etapas)
  }

  const minutosParaHorasMinutos = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
  }

  const handleCheck = async (id, check, index) => {
    let res = await Api.checkEtapa(id, {check})
    if(res.error) {
      alert(res.error)
      return
    } else {
      alert(res.msg)
      let etapasFiltered_copy = [...etapasFiltered]
      etapasFiltered_copy[index].checada = true
      setEtapasFiltered(etapasFiltered_copy)
    }
  }

  // Função de ação para lidar com o clique no botão "Filtrar"
  const handleFiltrarClick = () => {
    let new_etapas = [...etapas]
    
    if (omis != '') {
       new_etapas = new_etapas.filter(i=>{
        if(i.Missao && (i.Missao.numero).toString().includes(omis)) {
          return i
        }
      })
    }

    if (ofrag != '') {
      new_etapas = new_etapas.filter(i=>{
       if(i.Missao && (i.Missao.Ofrag.numero).toString().includes(ofrag)) {
         return i
       }
     })
   }

   if (esforcoAereo != '') {
    new_etapas = new_etapas.filter(i=>{
     if(i.esforco_aereo && (i.esforco_aereo) == esforcoAereo) {
       return i
     }
   })
 }

  if (aeronave != '') {
    new_etapas = new_etapas.filter(i=>{
    if(i.Aeronave && (i.Aeronave.aeronave) == aeronave) {
      return i
    }
  })
  }

    if (dataInicio != '') {
      new_etapas = new_etapas.filter(i=>{
        let dataInicioDate = new Date(`${dataInicio}T23:59:59.000Z`)
        dataInicioDate.setHours(0, 0, 1);
        if(new Date(i.dep) >= dataInicioDate) {
          return i
        }
      })
    }

    if (dataFim != '') {
      new_etapas = new_etapas.filter(i=>{
        let dataFimDate = new Date(`${dataFim}T23:59:59.000Z`)
        dataFimDate.setHours(23, 59, 59);
        if(new Date(i.dep) <= dataFimDate) {
          return i
        }
      })
    }

    if(trigrama != '') {
      new_etapas = new_etapas.filter(i=>{
        let index = i.Usuarios.findIndex(it=>(it.Trigrama.trigrama).toUpperCase() == (trigrama).toUpperCase())
        if(index > -1) {
          return i
        }
      })
    }

    if(icao != '') {
      new_etapas = new_etapas.filter(i=>{
        if(i.Dep.icao.includes(icao.toUpperCase()) || i.Pouso.icao.includes(icao.toUpperCase())) {
          return i
        }
      })
    }

    var horas_totais = 0
    var minutos_noturnos_totais = 0
    var comb_totais = 0
    var lub_totais = 0
    var pax_totais = 0
    var minutos_ifr_totais = 0
    var cargas_totais = 0
    var pousos_totais = 0
    var procedimentos_totais = 0
    var pqds_totais = 0

    new_etapas.forEach(item => {
        let [horasStr, minutosStr] = item.tempo_de_voo.split(':');
        const horas = parseInt(horasStr, 10);
        const minutos = parseInt(minutosStr, 10);
        const minutosTotais = horas * 60 + minutos;
        horas_totais += minutosTotais;

        let minutos_noturnos = item.horas_noturnas ? item.horas_noturnas : 0
        minutos_noturnos_totais += minutos_noturnos

        let minutos_ifr = item.horas_instrumento ? item.horas_instrumento : 0
        minutos_ifr_totais += minutos_ifr
        
        comb_totais += item.combustivel
        lub_totais += item.lubrificante
        pax_totais += item.pax
        cargas_totais += somaCargas(item.Cargas)
        pousos_totais += item.pousos
        procedimentos_totais += somaProcedimentos(item.Procedimentos)
        pqds_totais += somaPqds(item.Assaets)
      })

      setHorasTotais(horas_totais)
      setHorasNoturnasTotais(minutos_noturnos_totais)
      
      setEtapasFiltered(new_etapas)
      setCombTotais(comb_totais)
      setLubTotais(lub_totais)
      setPaxTotais(pax_totais)
      setHorasIfrTotais(minutos_ifr_totais)
      setCargasTotais(cargas_totais)
      setPousosTotais(pousos_totais)
      setProcedimentosTotais(procedimentos_totais)
      setPqdsTotais(pqds_totais)
    };


  var horas_iniciais = 0
  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto'}}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
      {/* Filtro de Data */}
      <div style={{ marginRight: '20px' }}>
        <label>Data Início:</label>
        <input type="date" value={dataInicio} onChange={handleDataInicioChange} />
      </div>
      <div style={{ marginRight: '20px' }}>
        <label>Data Fim:</label>
        <input type="date" value={dataFim} onChange={handleDataFimChange} />
      </div>

       {/* Filtro de ICAO */}
       <div style={{ marginRight: '20px' }}>
        <label>ICAO:</label>
        <input type="text" value={icao} onChange={handleIcaoChange} style={inputStyleLow}/>
      </div>

      {/* Filtro de OMIS */}
      <div style={{ marginRight: '20px' }}>
        <label>OMIS:</label>
        <input type="text" value={omis} onChange={handleOmisChange} style={inputStyleLow}/>
      </div>

      {/* Filtro de OFRAG */}
      <div style={{ marginRight: '20px' }}>
        <label>OFRAG:</label>
        <input type="text" value={ofrag} onChange={handleOfragChange} style={inputStyleLow}/>
      </div>

      {/* Filtro de Esforço Aéreo */}
      <div style={{ marginRight: '20px' }}>
        <label>Esforço Aéreo:</label>
        <select style={inputStyle} value={esforcoAereo} onChange={handleEsforcoAereoChange}>
          <option value="">Selecione</option>
          {esforcos.map(i=>{
            return (
              <option value={i.nome}>{i.nome}</option>
            )
          })}
        </select>
      </div>

      {/* Filtro de Aeronave */}
      <div style={{ marginRight: '20px' }}>
        <label>Aeronave:</label>
        <select style={inputStyle} value={aeronave} onChange={handleAeronaveChange}>
          <option value="">Selecione</option>
          {aeronaves.map(i=>{
            return (
              <option value={i.aeronave}>{i.aeronave}</option>
            )
          })}
        </select>
      </div>

      {/* Filtro de Trigrama */}
      <div>
        <label>Trigrama:</label>
        <input type="text" maxLength="3" value={trigrama} onChange={handleTrigramaChange} style={inputStyleLow}/>
      </div>
        {/* Botão "Filtrar" */}
        <div className='buttons'>
          <button style={botaoStyle} onClick={handleFiltrarClick}>Filtrar</button>
          <button style={botaoStyleRed} onClick={handleLimpar}>Limpar</button>
        </div>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
    <div style={{ marginRight: '20px' }}>
        <label style={{marginRight: 5}}>Últimos:</label>
        <select style={inputStyle} value={limite} onChange={handleChangeLimit}>
          <option value="">Selecione</option>
          {limites.map(i=>{
            return (
              <option value={i}>{i}</option>
            )
          })}
        </select>
      </div>   

    </div>
        <table style={{marginBottom:50}}>
          <thead className='tabela-cabecalho'>
            <tr className='tabela-cabecalho'>
              <th>Checado</th>
              <th>Data</th>
              <th>OFRAG</th>
              <th>OMIS</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>DEP</th>
              <th>ARR</th>
              <th>TEV</th>
              <th>IFR</th>
              <th>Noturno</th>
              <th>Pousos</th>
              <th>NVG?</th>
              <th>Procedimentos</th>
              <th>Esforço Aéreo</th>
              <th>ANV</th>
              <th>1P</th>
              <th>2P</th>
              <th>AL</th>
              <th>IN</th>
              <th>MC</th>
              <th>IC</th>
              <th>AC</th>
              <th>LM</th>
              <th>LM2</th>
              <th>LM3</th>
              <th>LM4</th>
              <th>AG</th>
              <th>AG2</th>
              <th>AG3</th>
              <th>AG4</th>
              <th>IG</th>
              <th>IG2</th>
              <th>IG3</th>
              <th>IG4</th>
              <th>AF</th>
              <th>IF</th>
              <th>TF</th>
              <th>TF2</th>
              <th>TF3</th>
              <th>TF4</th>
              <th>O3</th>
              <th>I3</th>
              <th>A3</th>
              <th>PAX</th>
              <th>PQD</th>
              <th>CARGA</th>
              <th>COMB</th>
              <th>LUB</th>
            </tr>
          </thead>
          {etapasFiltered.map((item, index)=>{
            if(index == 0) {
              horas_iniciais = 0
            }

            if(item.Usuarios.length > 0) {
              var realizada = true
            } else {
              var realizada = false
            }
             let index_1p = item.Usuarios.findIndex(i=>i.posicao == '1P')
             let index_2p = item.Usuarios.findIndex(i=>i.posicao == '2P')
             let index_in = item.Usuarios.findIndex(i=>i.posicao == 'IN')
             let index_al = item.Usuarios.findIndex(i=>i.posicao == 'AL')
             let index_mc = item.Usuarios.findIndex(i=>i.posicao == 'MC')
             let index_ic = item.Usuarios.findIndex(i=>i.posicao == 'IC')
             let index_ac = item.Usuarios.findIndex(i=>i.posicao == 'AC')
             let index_lm = item.Usuarios.findIndex(i=>i.posicao == 'LM')
             let index_lm2 = item.Usuarios.findIndex(i=>i.posicao == 'LM2')
             let index_lm3 = item.Usuarios.findIndex(i=>i.posicao == 'LM3')
             let index_lm4 = item.Usuarios.findIndex(i=>i.posicao == 'LM4')
             let index_ag = item.Usuarios.findIndex(i=>i.posicao == 'AG')
             let index_ag2 = item.Usuarios.findIndex(i=>i.posicao == 'AG2')
             let index_ag3 = item.Usuarios.findIndex(i=>i.posicao == 'AG3')
             let index_ag4 = item.Usuarios.findIndex(i=>i.posicao == 'AG4')
             let index_ig = item.Usuarios.findIndex(i=>i.posicao == 'IG')
             let index_ig2 = item.Usuarios.findIndex(i=>i.posicao == 'IG2')
             let index_ig3 = item.Usuarios.findIndex(i=>i.posicao == 'IG3')
             let index_ig4 = item.Usuarios.findIndex(i=>i.posicao == 'IG4')
             let index_af = item.Usuarios.findIndex(i=>i.posicao == 'AF')
             let index_if = item.Usuarios.findIndex(i=>i.posicao == 'IF')
             let index_tf = item.Usuarios.findIndex(i=>i.posicao == 'TF')
             let index_tf2 = item.Usuarios.findIndex(i=>i.posicao == 'TF2')
             let index_tf3 = item.Usuarios.findIndex(i=>i.posicao == 'TF3')
             let index_tf4 = item.Usuarios.findIndex(i=>i.posicao == 'TF4')
             let index_o3 = item.Usuarios.findIndex(i=>i.posicao == 'O3')
             let index_i3 = item.Usuarios.findIndex(i=>i.posicao == 'I3')
             let index_a3 = item.Usuarios.findIndex(i=>i.posicao == 'A3')
            return (
              <tr className={realizada ? '' : 'prevista'}>
                  <td>
                    {!item.checada ? <button onClick={()=>handleCheck(item.id, !item.checada, index)} className='check'/> : 
                    <img onClick={()=>handleCheck(item.id, !item.checada)} className='correct' src='https://www.1gtt.com.br/app/correct.png' />
                     }
                    </td>
                  <td>{transformData(item.dep)}</td>
                  <td>{item.Missao.Ofrag.numero ? transformOfrag(item.Missao.Ofrag.numero) : ''}</td>
                  <td>{item.Missao.numero}</td>
                  <td>{item.Dep.icao}</td>
                  <td>{item.Pouso.icao}</td>
                  <td>{transformHora(item.dep)}</td>
                  <td>{transformHora(item.pouso)}</td>
                  <td>{transformTime(item.tempo_de_voo)}</td>
                  <td>{transformMinutesToTime(item.horas_instrumento)}</td>
                  <td>{transformMinutesToTime(item.horas_noturnas)}</td>
                  <td>{item.pousos}</td>
                  <td>{item.nvg ? 'SIM' : 'NÃO'}</td>
                  <td>
                    {
                      item.Procedimentos.map(it=>{
                        return (
                          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 5, border: '1px solid #000', padding:5, borderRadius: 5}}>
                          <span>{it.local}</span>
                          <span>{it.quantidade}</span>
                          <span>{it.procedimento}</span>
                          </div>
                        )
                      })
                    }</td>
                  <td>{item.esforco_aereo}</td>
                  <td>{item.Aeronave.aeronave}</td>
                  <td>{index_1p > -1 ? item.Usuarios[index_1p].Trigrama.trigrama : ''}</td>
                  <td>{index_2p > -1 ? item.Usuarios[index_2p].Trigrama.trigrama : ''}</td>
                  <td>{index_al > -1 ? item.Usuarios[index_al].Trigrama.trigrama : ''}</td>
                  <td>{index_in > -1 ? item.Usuarios[index_in].Trigrama.trigrama : ''}</td>
                  <td>{index_mc > -1 ? item.Usuarios[index_mc].Trigrama.trigrama : ''}</td>
                  <td>{index_ic > -1 ? item.Usuarios[index_ic].Trigrama.trigrama : ''}</td>
                  <td>{index_ac > -1 ? item.Usuarios[index_ac].Trigrama.trigrama : ''}</td>
                  <td>{index_lm > -1 ? item.Usuarios[index_lm].Trigrama.trigrama : ''}</td>
                  <td>{index_lm2 > -1 ? item.Usuarios[index_lm2].Trigrama.trigrama : ''}</td>
                  <td>{index_lm3 > -1 ? item.Usuarios[index_lm3].Trigrama.trigrama : ''}</td>
                  <td>{index_lm4 > -1 ? item.Usuarios[index_lm4].Trigrama.trigrama : ''}</td>
                  <td>{index_ag > -1 ? item.Usuarios[index_ag].Trigrama.trigrama : ''}</td>
                  <td>{index_ag2 > -1 ? item.Usuarios[index_ag2].Trigrama.trigrama : ''}</td>
                  <td>{index_ag3 > -1 ? item.Usuarios[index_ag3].Trigrama.trigrama : ''}</td>
                  <td>{index_ag4 > -1 ? item.Usuarios[index_ag4].Trigrama.trigrama : ''}</td>
                  <td>{index_ig > -1 ? item.Usuarios[index_ig].Trigrama.trigrama : ''}</td>
                  <td>{index_ig2 > -1 ? item.Usuarios[index_ig2].Trigrama.trigrama : ''}</td>
                  <td>{index_ig3 > -1 ? item.Usuarios[index_ig3].Trigrama.trigrama : ''}</td>
                  <td>{index_ig4 > -1 ? item.Usuarios[index_ig4].Trigrama.trigrama : ''}</td>
                  <td>{index_af > -1 ? item.Usuarios[index_af].Trigrama.trigrama : ''}</td>
                  <td>{index_if > -1 ? item.Usuarios[index_if].Trigrama.trigrama : ''}</td>
                  <td>{index_tf > -1 ? item.Usuarios[index_tf].Trigrama.trigrama : ''}</td>
                  <td>{index_tf2 > -1 ? item.Usuarios[index_tf2].Trigrama.trigrama : ''}</td>
                  <td>{index_tf3 > -1 ? item.Usuarios[index_tf3].Trigrama.trigrama : ''}</td>
                  <td>{index_tf4 > -1 ? item.Usuarios[index_tf4].Trigrama.trigrama : ''}</td>
                  <td>{index_o3 > -1 ? item.Usuarios[index_o3].Trigrama.trigrama : ''}</td>
                  <td>{index_i3 > -1 ? item.Usuarios[index_i3].Trigrama.trigrama : ''}</td>
                  <td>{index_a3 > -1 ? item.Usuarios[index_a3].Trigrama.trigrama : ''}</td>
                  <td>{item.pax}</td>
                  <td>{somaPqds(item.Assaets)}</td>
                  <td>{somaCargas(item.Cargas).toFixed(2)}</td>
                  <td>{item.combustivel}</td>
                  <td>{item.lubrificante}</td>
              </tr>
            )
          })}
          <thead className='tabela-cabecalho'>
          <tr className='bold tabela-total'>
                  <th colSpan={8} style={{textAlign: 'center !imprtant'}}>TOTAIS</th>
                  <th>{minutosParaHorasMinutos(horasTotais)}</th>
                  <th>{minutosParaHorasMinutos(horasIfrTotais)}</th>
                  <th>{minutosParaHorasMinutos(horasNoturnasTotais)}</th>
                  <th>{pouosTotais}</th>
                  <td></td>
                  <th>{procedimentosTotais}</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>{paxTotais}</th>
                  <th>{pqdsTotais}</th>
                  <th>{cargasTotais.toFixed(2)}</th>
                  <th>{combTotais.toFixed(0)}</th>
                  <th>{lubTotais.toFixed(1)}</th>
              </tr>
              </thead>
        </table>
        {loading &&
                <div  style={{
                  position: 'absolute',
                  left: '50%',
                  top: '80%',
                  transform: 'translate(-50%, -50%)',
                  zIndex:99
                }}>
                  <LoadingSpinner black={true} width="50px" />
                </div>
        }
      </CCard>
     
    </>
  )
}

export default Etapas
