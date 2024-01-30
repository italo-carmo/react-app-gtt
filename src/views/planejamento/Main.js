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
import ReactDatePicker from 'react-datepicker';
import { getQuarter, setHours } from 'date-fns';

const Etapas = () => {

  const [planejamento, setPlanejamento] = useState([])
  const [rota, setRota] = useState('')
  const [dataInicio, setDataInicio] = useState(new Date());
  const [icao, setIcao] = useState('');
  const [horasTotais, setHorasTotais] = useState(0);
  const [loading, setLoading] = useState(false)
  const [tripulacao, setTripulacao] = useState('Simples')
  const [fadiga, setFadiga] = useState(new Date());
  const [fadigas, setFadigas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState('');

  const Api = useApi()

  const DateInput = ({ value, onClick }) => (
    <img style={{cursor:'pointer', marginLeft: 5}} src='https://www.1gtt.com.br/app/calendar-black.png' width="30px" onClick={onClick}/>
  )

  function millisToHoursAndMinutes(millis) {
    if (isNaN(millis) || millis < 0) {
      return "Invalid input";
    }
  
    // Calcula as horas e minutos
    const hours = Math.floor(millis / (1000 * 60 * 60));
    const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
  
    // Formata a representação da duração
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }

  const isoDateToHourMinutes = (date) => {
    try {
      if(typeof(date) != 'string') {
        date = date.toISOString()
      }
      let [data, horas] = date.split('T')
      let [hora, minuto, segundo] = horas.split(':')
      return hora+':'+minuto
    } catch {
      return '00:00'
    }
    
  }

  const isoDateToDate = (date) => {
    try {
      if(typeof(date) != 'string') {
        date = date.toISOString()
      }
      let [data, horas] = date.split('T')
      let [ano, mes, dia] = data.split('-')
      return dia+'/'+mes+'/'+ano
    }
    catch {
      return '00:00'
    }
  }

  const tripulacoes = ["Simples", "Composta", "Revezamento"]


  const calcularFadiga = (horaDecolagem) => {
    let fadigaBase;

    switch (tripulacao) {
      case 'SIMPLES':
        fadigaBase = 43200000; // 12 horas
        break;
      case 'COMPOSTA':
        fadigaBase = 50400000; // 14 horas
        break;
      case 'REVEZAMENTO':
        fadigaBase = 61200000; // 17 horas
        break;
      default:
        fadigaBase = 0;
    }

    // Verificar se a decolagem está entre 22h e 6h
    const horaLocal = horaDecolagem.getHours();
    if (horaLocal >= 22 || horaLocal < 6) {
      const intervalo = (horaLocal >= 22) ? horaLocal - 22 : horaLocal + 2; // Calcula o intervalo em horas
      fadigaBase -= intervalo * 30 * 60 * 1000; // Diminui a fadiga a cada hora no intervalo
    }

    return fadigaBase;
  };

    // Função para formatar o tempo de solo em hh:mm
    const formatarTempoSolo = (tempoSolo) => {
      const horas = Math.floor(tempoSolo / 60);
      const minutos = tempoSolo % 60;
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    };


    const getPlanejamento = async () => {
      let rota_split = rota.split(',')
      let res = await Api.getPlanejamento({rota: rota_split})
    
      if (res.error) {
        alert(res.error)
        return
      }
    
      // Iterar sobre os dados da rota e criar a tabela
      const tabelaVoos = [];
      let horaDecolagem = dataInicio;
    
      res.data.forEach((trecho, index) => {
        const horaPouso = new Date(horaDecolagem.getTime() + trecho.tempo);
        const tempoSoloMillis = 120 * 60 * 1000; // Tempo de solo inicial de 2 horas em milissegundos
    
        tabelaVoos.push({
          data: horaDecolagem.toISOString().split('T')[0],
          origem: trecho.origem,
          destino: trecho.destino,
          DEP: horaDecolagem.toISOString(),
          ARR: horaPouso.toISOString(),
          TEV: millisToHoursAndMinutes(trecho.tempo),
          tempoSolo: millisToHoursAndMinutes(tempoSoloMillis),
        });
    
        horaDecolagem = new Date(horaPouso.getTime() + tempoSoloMillis); // Atualiza o horário de decolagem para o próximo trecho
      });
    
      return(tabelaVoos)
    }
    

    const getDados = async () => {
      if (!rota) {
        alert('Rota é obrigatória')
        return
      }
      let rota_split = rota.split(',')

      if(rota_split.length<=1) {
        alert('Digite ao menos 2 ICAO')
        return
      }

      const allICAOsValid = rota_split.every(it => it.length === 4);

      if (!allICAOsValid) {
        alert('Confira os ICAOS');
        return;
      }

      if (!dataInicio) {
        alert('Data Inicial é obrigatória')
        return
      }
      if(!edit) {
       let dados = await getPlanejamento()
       dados.rota = rota
       var planejamento_copy = [...planejamento]
       planejamento_copy.push(dados)
      } else {
        let dados = await getPlanejamento()
       dados.rota = rota
       var planejamento_copy = [...planejamento]
       planejamento_copy[indexEdit] = dados
      }
      setPlanejamento(planejamento_copy)
      
      setRota(rota_split[rota_split.length - 1])
      setEdit(false)
      setIndexEdit('')
    }

  useEffect(()=>{
  },[])


   const transformTime = (time) => {
    let [hora, minuto, segundo] = time.split(':')
    return hora+':'+minuto
   }

     
  // Adicione esta constante para evitar repetição de cálculos
  const parseHorasMinutosParaMillis = (tempo) => {
    const [horas, minutos] = tempo.split(':');
    return parseInt(horas) * 60 * 60 * 1000 + parseInt(minutos) * 60 * 1000;
  };

  const atualizarProximaDecolagem = (planejamento, indice, novoTempoSolo) => {
    if (novoTempoSolo.length === 5) {
      const novoTempoSoloMillis = parseHorasMinutosParaMillis(novoTempoSolo);
      let horaProximaDecolagem = new Date(planejamento[indice - 1].ARR);

      let time = ((horaProximaDecolagem.getTime()))
      let mili = novoTempoSoloMillis
      horaProximaDecolagem.setTime(time +  mili)

      return horaProximaDecolagem
    } else {
      return planejamento[indice].DEP;
    }
  };
  

  

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
    width:500
  };
  
   // Funções de ação para atualizar os estados quando os valores dos filtros mudarem
   const handleChangeTrip = (e) => {
    setTripulacao(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // A tecla "Enter" foi pressionada, execute sua função aqui
      getDados();
    }
  };

  const handleRotaChange = (e) => {
    setRota(e.target.value.toUpperCase());
  };

  const minutosParaHorasMinutos = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
  }

  const getArr = (dep, tev) => {
 
    let data = new Date(dep)
    let [hora, minuto] = tev.split(':')
    let milisegundos = (parseInt(hora) * 3600000) + (parseInt(minuto) *60000)
    data.setTime(data.getTime() + milisegundos)
    return data
  }

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto',minHeight: 500,  maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginTop: '20px',  marginLeft:10, marginRight:10 }}>
      {/* Filtro de Data */}
      <div style={{ marginRight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label>Data Início:</label>
        <div className='input-obs' style={{marginLeft:5}}>                  
                  {dataInicio.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',  timeZone: 'UTC'})+'Z'}
        </div>
        <div style={{zIndex: 9999 }}>
            <ReactDatePicker
              selected={dataInicio}
              onChange={(date) => {
                if (date) {
                  const dataInicioCopia = new Date(date);
                  // Configura a hora diretamente como UTC
                  dataInicioCopia.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                  setDataInicio(dataInicioCopia)
                }
              }}
              customInput={<DateInput />}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="LLL"
              timeZone="UTC"
              timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
              utcOffset={0} // Defina o offset UTC para 0
              popperClassName="datePickerPopper" // Adicione uma classe específica para personalizar o popper
              calendarClassName="datePickerCalendar" // Adicione uma classe específica para personalizar o calendário
            />
        </div>
      </div>
       {/* Filtro de ICAO */}
       <div style={{ marginRight: '20px' }}>
        <label style={{marginRight:5}}>ROTA:</label>
        <input type="text" value={rota} onKeyPress={handleKeyPress} onChange={handleRotaChange} style={inputStyleLow}/>
      </div>
        {/* Botão "Pesquisar" */}
        <div className='buttons'>
          <button style={botaoStyle} onClick={()=>getDados()}>{edit ? 'Editar' : 'Adicionar'}</button>
        </div>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',  marginLeft:10, marginRight:10 }}>

              {/* Trip */}
              <div style={{ marginRight: '20px' }}>
        <label style={{marginRight:5}}>Tripulação:</label>
        <select style={inputStyle} value={tripulacao} onChange={handleChangeTrip}>
          <option value="">Selecione</option>
          {tripulacoes.map(i=>{
            return (
              <option value={i}>{i}</option>
            )
          })}
        </select>
      </div>
      </div>
          {
            planejamento.map((item, idx)=>{
              var limite_fadiga = new Date(item[0].DEP)
              var dep_inicial = new Date(item[0].DEP)

              if(tripulacao == 'Simples') {
                limite_fadiga.setTime(limite_fadiga.getTime() + 43200000)
              }
              if(tripulacao == 'Composta') {
                limite_fadiga.setTime(limite_fadiga.getTime() + 50400000)
              }
              if(tripulacao == 'Revezamento') {
                limite_fadiga.setTime(limite_fadiga.getTime() + 61200000)
              }

              var inicio_loop = dep_inicial

              while (limite_fadiga > inicio_loop) {

                let horas = inicio_loop.getHours()
                if (horas > 22 || horas < 6) {
                    limite_fadiga.setMilliseconds(limite_fadiga.getMilliseconds() - 1800000)
                } 
                inicio_loop.setMilliseconds(inicio_loop.getMilliseconds() + 3600000)
            }
              return (
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                    <span style={{fontWeight: 'bold', marginRight: 10}}>DIA {idx + 1}</span>
                    <img onClick={()=>{
                      setEdit(true)
                      setIndexEdit(idx)
                      setRota(item.rota)
                      let data = new Date(item[0].DEP)
                      setDataInicio(data)
                    }} width="15" height="15" src='https://www.1gtt.com.br/app/pen.png' />
                  </div>
              <table style={{marginBottom:20, zIndex: 2, width: '90%'}}>
              <thead className='tabela-cabecalho'>
                <tr>
                  <th>Data</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>DEP</th>
                  <th>ARR</th>
                  <th>TEV</th>
                  <th>Tempo Solo</th>
                </tr>
              </thead>
              {item.map((voo, index) => {
            

                try {
                  if(index == 0) {
                    var dep = voo.DEP
                  } else {
                    var tempos_solo = 0
                    var tempos_voo = 0
                    for(let i=0;i<index;i++) {
                      tempos_voo+= parseHorasMinutosParaMillis(item[i].TEV)
                      tempos_solo+= parseHorasMinutosParaMillis(item[i].tempoSolo)
                    }
                    var dep_date = new Date(item[0].DEP)
                    dep_date.setTime(dep_date.getTime() + tempos_solo + tempos_voo)
                    var dep = dep_date
                  }
                } catch(e) {
                  var dep = '00:00'
                }

                let pouso_edit = getArr(dep, voo.TEV)
                
                var isFadiga = false

                if(pouso_edit > limite_fadiga) {
                  isFadiga = true
                }

                return (
                <tr key={index} style={{color: isFadiga ? '#FF0000' : '#000'}}>
                  <td style={{fontWeight: 'bold'}}>
                  {voo.TEV.length == 5 ? isoDateToDate(dep) : ''}
                    </td>
                  <td>{voo.origem}</td>
                  <td>{voo.destino}</td>
                  <td>{voo.TEV.length == 5 ? isoDateToHourMinutes(dep) : ''}</td>
                  <td>{voo.TEV.length == 5 ? isoDateToHourMinutes(pouso_edit) : ''}</td>
                  <td>{voo.TEV}</td>
                  <td>
                  <input
                      type="text"
                      value={voo.tempoSolo}
                      onChange={(e) => {
                        const novoValor = e.target.value;
                        // Atualizar o valor de tempoSolo no estado
                        let planejamento_copy = [...planejamento]
                        let voo_map = item.map((it, i) => {
                            if(i === index) {
                              return { ...it, tempoSolo: novoValor }
                            } else {
                              return it
                            }
                          }
                        )
                        planejamento_copy[idx] = voo_map
                        setPlanejamento(planejamento_copy)
                      }
                    }
                    />
                  </td>
                </tr>
              )
            }
              )}
            </table>
            <span style={{fontWeight: 'bold', marginBottom: 50}}>Limite da Fadiga: {isoDateToDate(limite_fadiga)+' '+isoDateToHourMinutes(limite_fadiga)}</span>
            </div>
            )
            })
          }
       
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
