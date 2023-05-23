import React, { useEffect, useState } from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineController, LineElement, Legend } from 'chart.js';
import LoadingSpinner from 'src/components/Loading'
Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement, Legend);
import styles from './styles.css'
import {
  CCard,

} from '@coreui/react'
import { Alert } from '@coreui/coreui'
import useApi from 'src/services/Api'


const Dashboard = () => {

  const [chart, setChart] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [loading, setLoading] = useState(false)

  const convertDurationToHours = (duration, percentage) => {
    if(duration != '00:00') {
      if(duration == 0) {
        return 0
      } else {
        const [hours, minutes] = duration.split(':');
        const totalHours = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
        return totalHours * percentage;
      }
    } else {
        return null
      }
    }
      
  const formatDuration = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

    const handlePointClick = (event, chart) => {
      const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
  
      if (activePoints.length > 0) {
        const datasetIndex = activePoints[0].datasetIndex;
        const dataIndex = activePoints[0].index;
        const datasetLabel = chart.data.datasets[datasetIndex].label;
        const dataValue = chart.data.datasets[datasetIndex].data[dataIndex];
        setSelectedPoint({ datasetLabel, dataValue });
      }
    };

  const Api = useApi()
  const fetchData = async () => {
    setLoading(true)
    let res = await Api.getEsforcoAereo()

    let effortAvailableHours = []
    let effortFlownHours = [] 
    let porcentagens = [0.04, 0.08, 0.16, 0.24, 0.32, 0.4, 0.5, 0.61, 0.72, 0.82, 0.92, 1]

    let esforco_total = ''

    res.data.forEach(item => {
        if((item.nome).trim() == 'TOTAL') {
          esforco_total = item.alocado
          let items = [item.jan, item.fev, item.mar, item.abr, item.mai, item.jun, item.jul, item.ago, item.set, item.out, item.nov, item.dez]
          var acumulado = 0
          items.forEach(item=>{
            if(item != '00:00') {
              let item_parsed = convertDurationToHours(item,1)
              effortFlownHours.push(item_parsed + acumulado)
              acumulado += item_parsed
            } 

          })

          porcentagens.forEach(it=>{
            let novo_esforco = (convertDurationToHours(esforco_total, it))
            effortAvailableHours.push(novo_esforco)
          })
        }
    });
    
    

    // Preencher os meses restantes com zeros
    const numMissingMonths = 12 - effortFlownHours.length;
    var acumulado = effortFlownHours[effortFlownHours.length - 1]
    var average = acumulado/effortFlownHours.length;


    for (let i = 0; i < numMissingMonths; i++) {
      console.log('MEDIA: '+average)
      effortFlownHours.push(average + acumulado);
      acumulado+= average
    }

    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const ctx = document.getElementById('air-effort-chart').getContext('2d');

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Esforço Aéreo Disponível',
            data: effortAvailableHours,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Esforço Aéreo Voado (estimando próximos meses)',
            data: effortFlownHours,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'x',
        onClick: (event) => handlePointClick(event, newChart),
        scales: {
          y: {
            display: true,
            title: {
              display: true,
              text: 'Horas Voadas',
            },
            suggestedMax: 1800,
            ticks: {
                stepSize: 100, // Defina o intervalo entre as marcas de escala
              }, // Defina o máximo desejado para o eixo Y
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 12,
            },
          },
        },
      },
    });
    setLoading(false)
    setChart(newChart);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column'}}>
      {loading && <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginTop:50}}><LoadingSpinner width="150px" black={true}/></div>}
      <canvas id="air-effort-chart" width="400" height="200" />
      </CCard>
      {selectedPoint && (
        <div className="point-info" style={{display:'flex', alignItens: 'center', justifyContent: 'center'}}>
          <span>{selectedPoint.datasetLabel}: </span>
          <span style={{marginLeft:5}}> {formatDuration(selectedPoint.dataValue)}</span>
        </div>
      )}


     
    </>
  )
}

export default Dashboard
