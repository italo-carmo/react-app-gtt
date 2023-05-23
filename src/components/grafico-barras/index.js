import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin
);


const BarChart = ({ data, media }) => {
  const chartRef = useRef(null);
  
  const convertDurationToHours = (duration) => {
    if (duration !== '00:00') {
      const [hours, minutes] = duration.split(':');
      const totalHours = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
      return totalHours;
    } else {
      return 0;
    }
  };




  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((item) => item.trigrama);
      let hours = []
      data.forEach((item) => {

        hours.push(convertDurationToHours(item.horas))
    });
      const ctx = document.getElementById('bar-chart').getContext('2d');

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Horas Voadas',
              data: hours,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              display: true,
              title: {
                display: true,
                text: 'Horas Voadas',
              },
              suggestedMax: 140,
              suggestedMin: 0, // Adicione essa linha
              ticks: {
                stepSize: 10,
              },
            },
            x: {
              display: true,
              title: {
                display: true,
                text: 'Trigramas',
              },
            },
          },
          plugins: {
            annotation: {
                annotations: {
                  line1: {
                    type: 'line',
                    yMin: media,
                    yMax: media,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                  }
                }
              }
          },
        },
      });

      chartRef.current = chart;
    }
  }, [data]);

  return <canvas id="bar-chart" width="400" height="200" />;
};

export default BarChart;
