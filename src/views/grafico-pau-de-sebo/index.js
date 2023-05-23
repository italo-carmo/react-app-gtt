import React, { useEffect, useState } from 'react'
import styles from './styles.css'
import GraficoBarras from '../../components/grafico-barras/index'
import LoadingSpinner from 'src/components/Loading'
import {
  CCard,

} from '@coreui/react'
import { Alert } from '@coreui/coreui'
import useApi from 'src/services/Api'


const PauDeSebo = () => {

  const Api = useApi()
  const [dados, setDados] = useState([])
  const [funcao, setFuncao] = useState('Piloto')
  const [media, setMedia] = useState(0)
  const [mediaTotal, setMediaTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  var dados_excessao = {
    excessoes: [{
        trigrama: 'LTE',
        horas: '20:00'
      },
      {
        trigrama: 'FAC',
        horas: '20:00'
      },
      {
        trigrama: 'PTS',
        horas: '60:00'
      }]
    }

  var porcentagens = [0.04, 0.08, 0.16, 0.24, 0.32, 0.4, 0.5, 0.61, 0.72, 0.82, 0.92, 1]
  var hoje = new Date()
  var mes_atual = hoje.getMonth()
  var porcentagem_atual = porcentagens[mes_atual]

  const convertDurationToHours = (duration) => {
    if (duration !== '00:00') {
      const [hours, minutes] = duration.split(':');
      const totalHours = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
      return totalHours;
    } else {
      return 0;
    }
  };
  

  const getDados = async () => {
    setLoading(true)
    let res_esforco = await Api.getEsforcoAereo()
    var horas_totais = 0
    res_esforco.data.forEach(item => {
        if((item.nome).trim() == 'TOTAL') {
          horas_totais = item.alocado
        }
      })
    let horas_parsed = convertDurationToHours(horas_totais)
    let horas_excessao = 0
    let res = await Api.getPauDeSebo()
    let dados_to_add = []
    if(!res.error) {
      res.data.forEach(item => {
        if(item.Funcao == funcao) {
          console.log(item.Trigrama)
          dados_to_add.push({trigrama:item.Trigrama, horas: item.Horas})
          if(funcao == 'Piloto') {
            let index = dados_excessao.excessoes.findIndex(i=>i.trigrama == item.Trigrama)
            if(index >=0) {
                horas_excessao += convertDurationToHours(dados_excessao.excessoes[index].horas)
            }
          }
        }
      });
      setMediaTotal(((horas_parsed-horas_excessao)/((dados_to_add.length-dados_excessao.excessoes.length)/2)))
      setMedia(((horas_parsed-horas_excessao)/((dados_to_add.length-dados_excessao.excessoes.length)/2)*porcentagem_atual))
      setDados(dados_to_add)
      setLoading(false)
    }
  }

  const formatDuration = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };



  useEffect(()=>{
    getDados()
  },[])

  //let dados = [{trigrama: 'ITL', horas:'120:00'},{trigrama: 'POR', horas:'110:00'},{trigrama: 'TNT', horas:'130:00'}]
  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column'}}>
        {loading && <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:50}}><LoadingSpinner width="150px" black={true}/></div>}
        <GraficoBarras data={dados} media={media}/>
        <div className="point-info" style={{display:'flex', flexDirection:'column', alignItens: 'center', justifyContent: 'center', marginTop:10, marginBottom:10}}>
          <span style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>Média de horas anuais: {formatDuration(mediaTotal)}</span>
          <span style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>Média de horas esse mês: {formatDuration(media)}</span>
        </div>
      </CCard>
     
    </>
  )
}

export default PauDeSebo
