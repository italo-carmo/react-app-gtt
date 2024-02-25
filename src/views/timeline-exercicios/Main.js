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
  const [loading, setLoading] = useState(false)
  const [exercicios, setExercicios] = useState([])
  const [exerciciosPorMes, setExerciciosPorMes] = useState({})
  

  let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  let dias = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  const Api = useApi()

  function formatarNumero(numero) {
    // Converte o número para uma string e substitui o ponto por vírgula
    const numeroString = numero.toFixed(2).replace('.', ',');
  
    // Separa a parte inteira da parte decimal
    const partes = numeroString.split(',');
  
    // Adiciona ponto como separador de milhares na parte inteira
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Junta as partes novamente
    const numeroFormatado = partes.join(',');
  
    return numeroFormatado;
  }

  const splitData = (stringData) => {
    // Dividir a string em partes (ano, mês, dia)
    const partesData = stringData.split("-");
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10) - 1; // Subtraia 1 do mês (0 para janeiro, 1 para fevereiro, etc.)
    const dia = parseInt(partesData[2], 10);
    return [ano, mes, dia]
  }

  const getExercicios = async () => {
    let res = await Api.getExercicios();
    if (!res.error) {
      const exerciciosData = res.data;
  
      const exerciciosPorMesCopy = meses.map(() => []); // Cria uma matriz vazia para armazenar os exercícios de cada mês
  
      exerciciosData.forEach(exercicio => {
        const dataInicio = new Date(exercicio.data_inicio + 'T06:00:00Z');
        const dataFim = new Date(exercicio.data_fim + 'T06:00:00Z');
  
        // Verifica se o exercício abrange mais de um mês
        const primeiroMes = dataInicio.getMonth();
        const ultimoMes = dataFim.getMonth();
  
        // Adiciona o exercício a cada mês entre o primeiro e o último (inclusive)
        for (let i = primeiroMes; i <= ultimoMes; i++) {
          exerciciosPorMesCopy[i].push(exercicio);
        }
      });
  
      setExerciciosPorMes(exerciciosPorMesCopy);
    }
  };
  
  

  function gerarCorAleatoria() {
    let cor;
    do {
      // Gera valores aleatórios para os canais de cor vermelho, verde e azul
      const r = Math.floor(Math.random() * 256); // Red (0-255)
      const g = Math.floor(Math.random() * 256); // Green (0-255)
      const b = Math.floor(Math.random() * 256); // Blue (0-255)
  
      // Garante que a cor resultante seja mais clara
      const somaCores = r + g + b;
      const minSomaCores = 384; // Este é um terço de 255 * 3 (o valor máximo para cada canal)
      if (somaCores >= minSomaCores) {
        // Converte os valores para representação hexadecimal
        cor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
    } while (!cor); // Repete o processo até encontrar uma cor válida
  
    return cor;
  }
  
  
  
  useEffect(()=>{
    getExercicios()
  },[])


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column' }}>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{maxWidth: '95%', overflowX: 'auto', marginTop:30}}>
    <table style={{marginBottom: 20}}>
  <tr>
    <th>
      Mês
    </th>
    <th>
      Nome
    </th>
    {dias.map(i => {
      return <th style={{fontSize: '0.6vw'}}>{i}</th>
    })}
  </tr>
  {meses.map((mes, index) => {
    const exerciciosDoMes = exerciciosPorMes[index] || [];

    const rowspan = exerciciosDoMes.length > 0 ? exerciciosDoMes.length : 1;

      // Ordena os exercícios pelo data_inicio
    exerciciosDoMes.sort((a, b) => {
      return new Date(a.data_inicio) - new Date(b.data_inicio);
    });

    return (
      <React.Fragment key={index}>
        {exerciciosDoMes.map((exercicio, idx) => {
          let cor = gerarCorAleatoria();

          // Converte as datas de início e fim do exercício para objetos Date
          let [ano_inicio, mes_inicio, dia_inicio] = splitData(exercicio.data_inicio)
          let [ano_fim, mes_fim, dia_fim] = splitData(exercicio.data_fim)
          const dataInicio = new Date(Date.UTC(ano_inicio, mes_inicio, dia_inicio))
          const dataFim = new Date(Date.UTC(ano_fim, mes_fim, dia_fim));
          return (
            <React.Fragment key={idx}>
              {/* Renderiza apenas se o exercício estiver dentro do intervalo do mês */}
              { (
                <tr>
                  {idx === 0 && <td style={{backgroundColor: '#d6dce9'}} rowSpan={rowspan}>{mes}</td>}
                  <td style={{ backgroundColor: cor, fontWeight: 'bold' }}>{exercicio.nome}</td>
                  {dias.map(dia => {
                    let date = new Date()
                    let data_inicio_dia = new Date(Date.UTC(date.getFullYear(),index, dia, 0, 0, 0))
                    let data_fim_dia = new Date(Date.UTC(date.getFullYear(),index, dia, 23, 59, 59))
                    if(data_inicio_dia <= dataFim && data_fim_dia >= dataInicio) {
                      var dentroDoIntervalo = true
                    }
                    if(dia == 6) {
                      console.log(exercicio.nome)
                      console.log('Inicio Dia: '+data_inicio_dia.toISOString())
                      console.log(dataFim.toISOString())
                      console.log('Fim Dia: '+data_fim_dia.toISOString())
                      console.log(dataInicio.toISOString())
                      console.log(dentroDoIntervalo)
                    }
                      
                    return (
                      <td key={dia} style={{ fontSize: '0.6vw', fontWeight: 'bold', backgroundColor: dentroDoIntervalo ? cor : '' }}>
                        {dentroDoIntervalo ? dia : ''}
                      </td>
                    );
                  })}
                </tr>
              )}
            </React.Fragment>
          );
        })}
        {exerciciosDoMes.length === 0 && (
          <tr>
            <td style={{backgroundColor: '#d6dce9'}}>{mes}</td>
            <td></td>
            {dias.map(() => <td></td>)}
          </tr>
        )}
      </React.Fragment>
    );
  })}
</table>

    </div>
    </div>

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
