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
import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import { usePDF } from 'react-to-pdf';
import MaskedObsTextArea from '../../components/masked-inpput-text-obs-textarea'

const ListaPauDeSebo = () => {
  const navigate = useNavigate()
  const [funcao, setFuncao] = useState('')
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [meta, setMeta] = useState(80)
  const [operacionalidades, setOperacionalidades] = useState([])
  const funcoes = [{label: 'Pilotos', value: 'Piloto'}, {label: 'Mecânicos', value: 'Mecânico de Voo'}, {label: 'Loadmasters', value: 'Loadmaster'}, {label: 'Comissários', value: 'Comissário'}, {label: 'OE-3', value: 'O3'}]
  const metas = [{label: '120', value: 120}, {label: '110', value: 110}, {label: '100', value: 100}, {label: '90', value: 90}, {label: '80', value: 80}]
  
  const Api = useApi()
  
  useEffect(()=>{

  },[])

  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };

  const getOperacionalidades = async () => {
    setLoading(true)
    let res = await Api.getOperacionalidades()
    if(!res.error) {
      setOperacionalidades(res.data)

      setLoading(false)
    } else {
      alert(res.error)
      setLoading(false)
      return
    }
  }

  const handlechangeFuncao = async (e) => {
      setDados([])
      setLoading(true)
      setFuncao(e.target.value)
      let res = await Api.getPauDeSebo({funcao: e.target.value})
      if (!res.error) {
        setDados(res.data)
      }
      switch(e.target.value) {
        case('Piloto'):
        setMeta(120)
        break;
      }
      setLoading(false)
  }

  const handlechangeMeta = async (e) => {
    setMeta(e.target.value)
}

  const calcularMeta = (horas_get) => {
    let [horas, minutos] = horas_get.split(':')
    let minutos_totais = horas*60 + minutos
    let meta_atual = (minutos_totais*100)/(meta*60)

    return (meta_atual/100).toFixed(2)+'%'
  }

  const getOperacionalidadeMilitar = (id_operacionalidade) => {
    let index = operacionalidades.findIndex(i=>i.id == id_operacionalidade)
    if (index >=0) {
      return operacionalidades[index].nome
    } else {
      return 'NIL'
    }
  }

  function convertToMinutes(horaString) {
    const [hours, minutes] = horaString.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function convertToHourString(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  
  function calculateAverageTime(arr) {
    // Filtrar itens do array
    const filteredArray = arr.filter(item => {
      const operationality = getOperacionalidadeMilitar(item.id_operacionalidade);
      return !['AL', 'AG', 'AC', 'AF', 'A3'].includes(operationality);
    });

    console.log(filteredArray)
  
    if (filteredArray.length === 0) return '0:00';
  
    // Calcular total de minutos
    const totalMinutes = filteredArray.reduce((sum, item) => sum + convertToMinutes(item.Horas), 0);
    
    // Calcular média de minutos arredondada
    const averageMinutes = Math.round(totalMinutes / filteredArray.length);
    
    return convertToHourString(averageMinutes*0.75);
  }

  const calcularMedia = (dados) => {
    if(funcao == 'Piloto') {
      return meta+':00'
    } else {
      const averageTime = calculateAverageTime(dados)

      return averageTime
    }

  }

    
  useEffect(()=>{
    getOperacionalidades()
  },[])

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center', flex: 1 }}>
        <label style={{fontWeight: 'bold', marginRight: 5}}>Função a Bordo:</label>
        <select style={inputStyle} value={funcao} onChange={handlechangeFuncao}>
          <option value="">Selecione</option>
          {funcoes.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        {
          funcao == 'Piloto' &&
          <>
          <label style={{fontWeight: 'bold', marginRight: 5, marginLeft: 10}}>Meta de Horas:</label>
          <select style={inputStyle} value={meta} onChange={handlechangeMeta}>
          <option value="">Selecione</option>
          {metas.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        </>
        }

      </div>
      </div>
      <div class="table-area">
      <table style={{marginBottom:20}}>
        <tr>
          <th>Trigrama</th>
          <th>Horas</th>
          <th>% Voada</th>
          <th>Operacionalidade</th>
          <th>Último Voo</th>
          <th>Dias sem Voar</th>
        </tr>
        {loading &&
                <div  style={{
                  position: 'absolute',
                  left: '50%',
                  top: '40%',
                  transform: 'translate(-50%, -50%)',
                }}>
                  <LoadingSpinner black={true} width="200px" />
                </div>
        }
          {
            dados.map(it=>{
              let [data, horas] = it.Ultimo_voo.split('T')
              let [ano, mes, dia] = data.split('-')
              let [hora, minuto] = horas.split(':')

              return (
                <tr>
                  <td>{it.Trigrama}</td>
                  <td>{it.Horas}</td>
                  <td>{calcularMeta(it.Horas)}</td>
                  <td>{getOperacionalidadeMilitar(it.id_operacionalidade)}</td>
                  <td>{dia+'/'+mes+'/'+ano}</td>
                  <td>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <span>{it.Dias_sem_voar}</span>                        
                    {parseInt(it.Dias_sem_voar) > 45 && <div style={{marginLeft: 5}} className='situacao desadaptado blink'>Desadaptado</div>}
                      {parseInt(it.Dias_sem_voar) > 40 && parseInt(it.dias_sem_voar) < 45 &&  <div style={{marginLeft: 5}} className='situacao desadaptando blink'>Desadaptando</div>}
                      </div>
                    </td>
                </tr>
              )
            })
          }
          <tr>
          <td style={{fontWeight: 'bold'}}>Meta</td>
          <td style={{fontWeight: 'bold'}}>{calcularMedia(dados)}</td>
          <td colSpan={4}></td>
          </tr>
      </table>
      </div>
      </CCard>
    </>
  )
}

export default ListaPauDeSebo
