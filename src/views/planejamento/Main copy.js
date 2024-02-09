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
import { setHours } from 'date-fns';

const Etapas = () => {

  const [planejamento, setPlanejamento] = useState([])
  const [rota, setRota] = useState('')
  const [dataInicio, setDataInicio] = useState(new Date());
  const [icao, setIcao] = useState('');
  const [horasTotais, setHorasTotais] = useState(0);
  const [loading, setLoading] = useState(false)
  const [tripulacao, setTripulacao] = useState('Simples')
  const [fadiga, setFadiga] = useState(new Date());

  const Api = useApi()

  let pouso_anterior = ''

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

  const tripulacoes = ["Simples", "Composta", "Revezamento"]

 const getPlanejamento = async () => {
  if (!rota) {
    alert('Rota é obrigatória')
    return
  }
  if (!dataInicio) {
    alert('Data Inicial é obrigatória')
    return
  }
  let rota_split = rota.split(',')
  let res = await Api.getPlanejamento({rota:rota_split})

  if(res.error) {
    alert(res.error)
    return
  }

  await res.data.forEach((item,index)=>{
    res.data[index].solo = 7200000
})
  setPlanejamento(res.data)
 }

 const getFadiga = () => {
  let limite_fadiga = new Date()
  limite_fadiga.setMilliseconds(limite_fadiga.getMilliseconds() + 43200000)
  setFadiga(limite_fadiga)
 }

  useEffect(()=>{
    getFadiga()
  },[])


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
        <div style={{ position: 'relative', zIndex: 9999 }}>
            <ReactDatePicker
              selected={dataInicio}
              onChange={(date) => {
                if (date) {
                  const dataInicioCopia = new Date(date);
                  // Configura a hora diretamente como UTC
                  dataInicioCopia.setMinutes(date.getMinutes() - date.getTimezoneOffset());

                  var limite_fadiga = new Date(dataInicioCopia);

                  setDataInicio(dataInicioCopia)

                  

                  if(tripulacao == 'Simples') {
                      limite_fadiga.setMilliseconds(limite_fadiga.getMilliseconds() + 43200000)
                  }
              
                  if(tripulacao == 'Composta') {
                      limite_fadiga.setMilliseconds(limite_fadiga.getMilliseconds() + 50400000)
                  }
              
                  if(tripulacao == 'Revezamento') {
                      limite_fadiga.setMilliseconds(limite_fadiga.getMilliseconds() + 61200000)
                  }
                  let inicio_loop = date
              
                  while (limite_fadiga > inicio_loop) {
              
                      let horas = inicio_loop.getHours()
              
                      if (horas >= 22 || horas < 6) {
              
                          limite_fadiga.setMilliseconds(limite_fadiga.getMilliseconds() - 1800000)
                      } 
                      inicio_loop.setMilliseconds(inicio_loop.getMilliseconds() + 3600000)
                  }


                  setFadiga(limite_fadiga)
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
              popperPlacement="bottom-end" // Adicione esta propriedade para ajustar o posicionamento
            />
        </div>
      </div>
       {/* Filtro de ICAO */}
       <div style={{ marginRight: '20px' }}>
        <label>ROTA:</label>
        <input type="text" value={rota} onChange={handleRotaChange} style={inputStyleLow}/>
      </div>
        {/* Botão "Pesquisar" */}
        <div className='buttons'>
          <button style={botaoStyle} onClick={getPlanejamento}>Planejar</button>
        </div>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px',  marginLeft:10, marginRight:10 }}>

              {/* Trip */}
              <div style={{ marginRight: '20px' }}>
        <label>Tripulação:</label>
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
        <table style={{marginBottom:50, zIndex: 2}}>
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
          {
            planejamento.map((item, index)=>{
              
              let dep_atual = pouso_anterior
              
              let horaSolo = new Date(item.solo)
              if(index == 0) {
                var dep = new Date(dataInicio)
                var pouso =  new Date(dataInicio)
                pouso.setMilliseconds(pouso.getMilliseconds() + item.tempo)
               } else {
                let i; // Declare a variável i aqui
                   var dep = new Date(dataInicio)
                   for(i=0;i<index;i++) {
                       dep.setMilliseconds(dep.getMilliseconds() + planejamento[i].tempo)
                       dep.setMilliseconds(dep.getMilliseconds() + planejamento[i].solo)
                   }
               }
           
               let tempo_voo = new Date(item.tempo)
             

                function addMillisecondsToDate(date, milliseconds) {
                  return new Date(date.getTime() + milliseconds);
                }

                if (index == 0) {
                  var hora_dep = dep
                  var pouso = new Date(hora_dep)
                  pouso.setMilliseconds(pouso.getMilliseconds() + item.tempo)
                } else {
                  var dep_edit =  addMillisecondsToDate(dep_atual, item.solo)
                  var hora_dep = dep_edit
                  var pouso = new Date(hora_dep)
                  pouso.setMilliseconds(pouso.getMilliseconds() + item.tempo)
                }
                
                pouso_anterior = pouso
                if(dep > fadiga || pouso > fadiga) {
                  var is_fadiga = true
                  console.log('true')
               } else {
                  var is_fadiga = false
                  console.log('false')
               }
                
              return (
                <tr className={is_fadiga ? 'fadiga' : ''}>
                  <td>{hora_dep.toLocaleString([],{  
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: 'UTC',
                    timeZone: 'UTC'})}
                  </td>
                  <td>{item.origem.toUpperCase()}</td>
                  <td>{item.destino.toUpperCase()}</td>
                  <td>{hora_dep.toLocaleString([], {hour: '2-digit', minute:'2-digit', timeZone: 'UTC'})}</td>
                  <td>{pouso.toLocaleString([], {hour: '2-digit', minute:'2-digit', timeZone: 'UTC'})}</td>
                  <td>{tempo_voo.toLocaleString([], {hour: '2-digit', minute:'2-digit', timeZone: 'UTC'})}</td>
                  <td>{millisToHoursAndMinutes(item.solo)}</td>
                </tr>
              )
            })
          }
        </table>
        <span>{fadiga.toISOString()}</span>
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
