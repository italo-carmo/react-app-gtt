import React, { useEffect, useState, useRef, DatePicker, DateInput } from 'react'
import styles from './styles.css'
import MaskedInputIcao from '../../components/masked-input-icao'
import {
  CButton,
  CCard,
} from '@coreui/react'
import useApi from 'src/services/Api'
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react'
import LoadingSpinner from 'src/components/Loading'
import { Alert } from '@coreui/coreui';
import { Date } from 'core-js'


const Navega = () => {

  const [dataZ, setDataZ] = useState('');
  const [horaZ, setHoraZ] = useState('');
  const [horaLocal, setHoraLocal] = useState(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataLocal, setDataLocal] = useState('');
  const [icao, setIcao] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [zone_name, setZone_name] = useState('');
  const [gmt_offset, setGmt_offset] = useState(0);
  const [dst, setDst] = useState(0)
  const [rota, setRota] = useState('')
  const [openHora, setOpenHora] = useState(false)
/*   const [hora, setHora] = useState(new Date()) */
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [tripulacao, setTripulacao] = useState('Simples')
  const [soloInicial, setSoloInicial] = useState(7200000)

  const Api = useApi()

  const transformHora = (date) => {
   /*  let [data, horas] =  date.split('T') */
    let [hora, minuto, segundo] = date.split(':')
    return [Number(hora*60) + Number(minuto)]
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
    fontSize: 12
  
  };

  

  const inputStyleLow = {
    width:100
  };
  
   // Funções de ação para atualizar os estados quando os valores dos filtros mudarem
   const handleDataZChange = (e) => {
    setDataZ(e.target.value);
  };
  const handleHoraZChange = (e) => {
    setHoraZ(e.target.value);
  };
  const handleHoraLocalChange = (e) => {
    setHoraZ(e.target.value);
  };

  const handleDataLocalChange = (e) => {
    setDataLocal(e.target.value);
  };

  const handleAbbreviationChange = (e) => {
    setAbbreviation(e.target.value);
  };

  const handleZone_nameChange = (e) => {
    setZone_name(e.target.value);
  };

  const handleGmt_offsetChange = (e) => {
    setGmt_offset(e.target.value);
  };

  const handleIcaoChange = (e) => {
    setIcao(e.target.value);
  };

  const handleDstChange = (e) => {
    setDst(e.target.value);
  };

  const handleDataInicioChange = (e) => {
    setDst(e.target.value);
  };
  const handleSetRota = (e) => {
    setRota(e.target.value);
  };

  const handleSoloInicialChange = (e) => {
    setSoloInicial(e.target.value);
  };



 
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
    const minutosRestantes = Math.round(Math.ceil(minutos % 60), 10);
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
  }

  const horasParaMinutos = (hora) => {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = Math.round(Math.ceil(minutos % 60), 10);
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
  }

 
  const handleTZ = async () => {
    let res = await Api.retornarTimeZone(dados)
    if(res.error) {
      console.log(dados)
      alert(res.error)
      return
    } else {
      setAbbreviation(res.data[0].abbreviation)
      setGmt_offset(res.data[0].gmt_offset)
      setDst(res.data[0].dst)
      setDataLocal(horaZ + gmt_offset)
      setZone_name(res.data[0].zone_name)
      setHoraLocal(minutosParaHorasMinutos(Number(transformHora(horaZ))+Number(gmt_offset/60)))
    }
  }
  const getDados = async () => {
    setLoading(true)
    setData([])
    if(rota == '') {
        alert('Preencha a rota!')
        return
    }

    const dados = []

    let rota_split = rota.split(' ')

    let res = await Api.getPlanejamento({rota:rota_split})
    if(res.error) {
        alert(res.error)
        setLoading(false)
        return
    }
    await res.data.forEach((item,index)=>{
        res.data[index].solo = 7200000
    })
    console.log(res.data)
    setData(res.data)
    setLoading(false)
}


  // Função de ação para lidar com o clique no botão "Filtrar"
  var dados = {
    "icao": icao,
    "data": dataZ + " " + horaZ
  }

  let verao = dst === "0" ? "" : "+";

 

  function obterSinal(numero) {
    if (numero > 0) {
        return '+';
    
    } else {
        return '';
    }
  }


  var horas_iniciais = 0
  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
      {/* Filtro de Data */}
      <div style={{ marginRight: '20px' }}>
        <label>Data:</label>
        <input type="date" value={dataZ} onChange={handleDataZChange} />
      </div>
      <div style={{ marginRight: '20px' }}>
        <label>Hora Z:</label>
        <input type="time" value={horaZ} onChange={handleHoraZChange} />
      </div>
      {/* Filtro de ICAO */}
      <div style={{ marginRight: '20px' }}>
        <label>ICAO:</label>
        <input type="text" value={icao} onChange={handleIcaoChange} style={inputStyleLow}/>
        <input type="text" value={rota} onChange={handleSetRota} style={inputStyleLow}/>
      </div>
      {/* Filtro de tz */}
      <div style={{ marginRight: '20px' }}>
        <label>TZ:</label>
        <input type="text" value={abbreviation} /*onChange={handleAbbreviationChange}*/ style={inputStyleLow}/>
      </div>
      {/* Filtro de ICAO */}
      <div style={{ marginRight: '20px' }}>
        <label>OFFSET:</label>
        <input type="text" value={obterSinal(gmt_offset)+(gmt_offset)/3600+"h"} /*onChange={handleGmt_offsetChange} */style={inputStyleLow}/>
      </div>
      {/* Filtro de ICAO */}
      <div style={{ marginRight: '20px' }}>
        <label>DST:</label>
        <input type="text" value={verao} /* onChange={handleDstChange}*/ style={inputStyleLow}/>
      </div>
      {/* Filtro de Data */}
      <div style={{ marginRight: '20px' }}>
        <label>Localização:</label>
        <input type="text" value={zone_name} /*onChange={handleDataLocalChange}*/ />
      </div>
      <div style={{ marginRight: '20px' }}>
        <label>Hora Local:</label>
        <input type="time" value={horaLocal} /*onChange={handleHoraZChange}*/ />
      </div>
      {/* Botão "Computar Fuso" */}
        <div className='buttons'>
          <button style={botaoStyleRed} onClick={handleTZ}>Computar Fuso</button>
          <button style={botaoStyleRed} onClick={getDados}>FADIGA</button>
        </div>

     </div>
         <table style={{marginBottom:50}}>
          <thead className='tabela-cabecalho'>
            <tr>
            <th colSpan={7}>ORIGEM</th>
            <th colSpan={2}>TEMPO</th>
            <th colSpan={6}>DESTINO</th>
            <th>DISPONIBILIDADE</th>
            <th colSpan={4}>ALTERNATIVA</th>
            </tr>
            <tr className='bold'>
              <td>DATA</td>
              <td>ICAO</td>
              <td>ZULU</td>
              <td>ZONA</td>
              <td>DST</td>
              <td>LOCAL</td>
              <td>CIDADE</td>
              <td>VOO</td> 
              <td>SOLO</td>  
              <td>ZULU</td>
              <td>ZONA</td>
              <td>DST</td>
              <td>LOCAL</td>
              <td>ICAO</td>
              <td>CIDADE</td>
              <td></td> 
              <td>ZONA</td>
              <td>DST</td>
              <td>ICAO</td>
              <td>CIDADE</td>
            </tr>
                                   

          {data.map((item)=>{
             return (
              <tr className='tabelinha'>
              <td><input type="date" value={dataZ} onChange={handleDataZChange}/></td>
              <td className='bold'>{(item.origem)}</td>
              <td><input type="time" value={horaZ} onChange={handleHoraZChange}/></td>
              <td>{"("+obterSinal(gmt_offset)+(gmt_offset)/3600+"h) "+abbreviation}</td>
              <td>{verao}</td>
              <td>{horaLocal}</td>{/* hora local */}
              <td>CIDADE</td>
              <td>{minutosParaHorasMinutos(item.tempo/60000)}</td>
              <td><input type="time" value={soloInicial} onChange={handleSoloInicialChange}/></td>  
              <td>{minutosParaHorasMinutos(Number(transformHora(horaZ))+Number(item.tempo/60000))}</td>
              <td>ZONA</td>
              <td>DST</td>
              <td>LOCAL</td>
              <td className='bold'>{(item.destino)}</td>
              <td>CIDADE</td>
              <td></td> 
              <td>ZONA</td>
              <td>DST</td>
              <td>ICAO</td>
              <td>CIDADE</td>
              </tr> 
            )
          })}
                    </thead>
          {/* {data.map((item, index)=>{
            if(index == 0) {
              horas_iniciais = 0
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
             let index_tf = item.Usuarios.findIndex(i=>i.posicao == 'TF')
             let index_tf2 = item.Usuarios.findIndex(i=>i.posicao == 'TF2')
             let index_tf3 = item.Usuarios.findIndex(i=>i.posicao == 'TF3')
             let index_tf4 = item.Usuarios.findIndex(i=>i.posicao == 'TF4')
             let index_o3 = item.Usuarios.findIndex(i=>i.posicao == 'O3')
             let index_i3 = item.Usuarios.findIndex(i=>i.posicao == 'I3')
             let index_a3 = item.Usuarios.findIndex(i=>i.posicao == 'A3')
            return (
              <tr>
                  <td>
                    {!item.checada ? <button onClick={()=>handleCheck(item.id, !item.checada)} className='check'/> : 
                    <img onClick={()=>handleCheck(item.id, !item.checada)} className='correct' src='https://www.1gtt.com.br/correct.png' />
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
                  <td>{index_tf > -1 ? item.Usuarios[index_tf].Trigrama.trigrama : ''}</td>
                  <td>{index_tf2 > -1 ? item.Usuarios[index_tf2].Trigrama.trigrama : ''}</td>
                  <td>{index_tf3 > -1 ? item.Usuarios[index_tf3].Trigrama.trigrama : ''}</td>
                  <td>{index_tf4 > -1 ? item.Usuarios[index_tf4].Trigrama.trigrama : ''}</td>
                  <td>{index_o3 > -1 ? item.Usuarios[index_o3].Trigrama.trigrama : ''}</td>
                  <td>{index_i3 > -1 ? item.Usuarios[index_i3].Trigrama.trigrama : ''}</td>
                  <td>{index_a3 > -1 ? item.Usuarios[index_a3].Trigrama.trigrama : ''}</td>
                  <td>{item.pax}</td>
                  <td>{somaCargas(item.Cargas)}</td>
                  <td>{item.combustivel}</td>
                  <td>{item.lubrificante}</td>
              </tr>
            )
          })}
          <tr className='bold'>
                  <td>TOTAL</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{minutosParaHorasMinutos(horasTotais)}</td>
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
                  <td></td>
                  <td></td>
        </tr> */}
        </table> 
        {/*{loading &&
                <div  style={{
                  position: 'absolute',
                  left: '50%',
                  top: '80%',
                  transform: 'translate(-50%, -50%)',
                  zIndex:99
                }}>
                  <LoadingSpinner black={true} width="50px" />
                </div>
        }*/}
      </CCard>
     
    </>
  )
}

export default Navega
