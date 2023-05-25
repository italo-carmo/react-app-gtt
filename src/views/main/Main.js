import React, { useEffect, useState } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import { Alert } from '@coreui/coreui'
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
moment.tz.setDefault('Etc/UTC');

const Dashboard = () => {

  const [tripulacao,setTripulacao] = useState([])
  const [id,setId] = useState([])
  const [caixaVisible, setCaixaVisible] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [idEdit, setIdEdit] = useState('')
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
  const [aeronaves, setAeronaves] = useState([])

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

  const handleEditMission = (id) => {
    setIdEdit(id)
    setCaixaCreateVisible(true)
  }

  const getDias = (hoje) => {
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
    getMissoes(dias)
  }

  const getMissoes = async (dias) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res = await Api.getMissoesAvioes({inicio, fim})
    if(!res.error) {
      let missoes = res.data
      let index_missoes = missoes.findIndex(i=>i.aviao == etapas.aviao)
       if(index_missoes >=0) {
        etapas.eventos.forEach(it=>{
            missoes[index_missoes].eventos.push(it)
          })
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
    setCaixaCreateVisible(true)
  }

  const handleCancel = () => {
    setIcaoOrigemAdd('')
    setIcaoDestinoAdd('')
    setDataEtapa('')
    setDataEtapaPouso('')
    setAddEtapa(false)
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
    setDataEtapa(new_date)
    setIcaoOrigemAdd(icaoDep)
    setDataEtapaPouso(new_date)
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
    let data_dep_string = dataEtapa.toISOString()
    let data_pouso_string = dataEtapaPouso.toISOString()
    let [data_dep, hora_dep] = data_dep_string.split('T')
    let [data_pouso, hora_pouso] = data_pouso_string.split('T')

    let [ano_dep, mes_dep, dia_dep] = data_dep.split('-')
    let [ano_pouso, mes_pouso, dia_pouso] = data_pouso.split('-')

    let [hora_dep_split, minuto_dep, segundo_dep] = hora_dep.split(':')
    let [hora_pouso_split, minuto_pouso, segundo_pouso] = hora_pouso.split(':')

    let evento = {
      "data": `${dia_dep}/${mes_dep}/${ano_dep}`,
      "tipo": "missao",
      "missao": {
        "id": null,
        "dep": icaoOrigemAdd,
        "horaDep": `${hora_dep_split}:${minuto_dep}Z`,
        "pouso": icaoDestinoAdd,
        "horaPouso":  `${hora_pouso_split}:${minuto_pouso}Z`,
        "tripulacao": [],
        "omis": ''
      },
      "manutencao": null
    }

    let etapas_copy = {...etapas}
    etapas_copy.eventos.push(evento)
    setEtapas(etapas_copy)
    getNewEtapa(icaoDestinoAdd, dataEtapaPouso)
    getDias(firstDay)
  }

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
                            onClick={()=>setCaixaCreateVisible(true)} className='missao white'
                            onMouseEnter={() => handleMouseEnter(it.missao.id, it.missao)}
                            onMouseLeave={handleMouseLeave}
                            >  
                         {caixaVisible && (id ==it.missao.id)  &&  <div
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
                          {it.missao.horaDep} {it.missao.dep} - {it.missao.pouso} {it.missao.horaPouso}</div>
                          }
                      })}
                    </div>
                })}
              </div>
            })}
            </div>
         </div>
        
        {
          caixaCreateVisible &&  <div className='modal-create'>
            <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
              <div onClick={()=>setCaixaCreateVisible(false)} style={{color:'#fff'}}>X</div>
            </div>
            <div className='criar-div'>
              <h3 style={{color:'#fff'}}>Criar Missão</h3>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop:20, alignItems: 'center'}}>
              <h5 style={{color:'#fff'}}>Avião:</h5>
              {aeronaves.map(item=>{
                return <button onClick={()=>{
                  setAeronaveMissao(item.aeronave)
                  let etapas_copy = {...etapas}
                  etapas_copy.aviao = item.aeronave
              
                  setEtapas(etapas_copy)
                }} style={{backgroundColor: aeronaveMissao == item.aeronave ? '#28a745' : '#FFF' , color: aeronaveMissao == item.aeronave ? '#fff' : '#000' }} className='calendario'>{item.aeronave}</button>
              })}
            </div>
            <div className='add-etapa'>
                <h5 style={{color:'#fff'}}>Etapas:</h5>
                <img onClick={()=>setAddEtapa(true)} style={{cursor: 'pointer'}} src='https://www.1gtt.com.br/app/add-white.png' width={20} height={20} />
            </div>
            {addEtapa && 
                 <div className='form-area'>
                    <div className='form-add'>
                   <span style={{color:'#000'}}>DEP: </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  {dataEtapa.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',timeZone: 'UTC' })+'Z'}
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataEtapa}
                      timeInputLabel={dataEtapa}
                      onChange={(date) => {
                        var offset = date.getTimezoneOffset();
                        // Convertendo a data para UTC
                        date.setMinutes(date.getMinutes() - offset);
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
                   <MaskedInputIcao erro={erroIcaoPouso} maxLength={4} value={icaoDestinoAdd} onChange={setIcaoDestinoAdd}/>
                 </div>
                 <div className='form-add'>
                   <span style={{color:'#000'}}>Pouso: </span>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                  {dataEtapaPouso.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' })+'Z'}
                   <div className='' style={{marginLeft:10}}>
                      <DatePicker 
                      selected={dataEtapaPouso}
                      timeInputLabel={dataEtapaPouso}
                      onChange={(date) => {
                        var offset = date.getTimezoneOffset();
                        // Convertendo a data para UTC
                        date.setMinutes(date.getMinutes() - offset);
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
                  <button className='adicionar' onClick={handleAddEtapa}>Adicionar</button>
                 </div>
                {errorEtapaAdd != '' &&  <div style={{marginTop:10}} class="alert alert-danger" role="alert">
                    {errorEtapaAdd}
                </div>}
               </div>
            }

            {etapas.eventos.map((item, index)=>{
              return <EtapaItem index={index} dep={item.missao.dep} pouso={item.missao.pouso} horaDep={item.missao.horaDep} horaPouso={item.missao.horaPouso} />
            })}
       
        </div>
        }
       
    
      </CCard>


     
    </>
  )
}

export default Dashboard
