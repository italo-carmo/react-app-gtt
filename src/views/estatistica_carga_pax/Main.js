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
  const [limite, setLimite] = useState(100)
  const [dados, setDados] = useState([])
  

  let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

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

  const getEtapas = async () => {
    setLoading(true)
    let res = await Api.getEtapas({limit:limite})
    if(!res.error) {
      const respostaQuery = res /* Sua resposta de query aqui */;
      const voosPorMes = [];
      
      respostaQuery.data.reverse()

      respostaQuery.data.forEach((voo) => {
        const mesPartida = new Date(voo.dep).getMonth();
        const mesExistente = voosPorMes.find((item) => item.mes === mesPartida);
      
        if (!mesExistente) {
          // Se o mês ainda não existir no array, adicione-o
          voosPorMes.push({
            mes: mesPartida,
            carga: voo.Cargas.reduce((total, carga) => total + carga.peso, 0) || 0,
            pqd: voo.Assaets.reduce((total, pqd) => total + pqd.quantidade_paraquedistas, 0) || 0,
            pax: voo.pax || 0,
            combustivel: voo.combustivel || 0,
          });
        } else {
          // Se o mês já existir no array, atualize as estatísticas existentes
          mesExistente.carga += voo.Cargas.reduce((total, carga) => total + carga.peso, 0) || 0;
          mesExistente.pqd += voo.Assaets.reduce((total, pqd) => total + pqd.quantidade_paraquedistas, 0) || 0,
          mesExistente.pax += voo.pax || 0;
          mesExistente.combustivel += voo.combustivel || 0;
        }
      });
      

    // Agora voosPorMes contém as estatísticas desejadas para cada mês
    console.log(voosPorMes);
   setDados(voosPorMes);

    }
    setLoading(false)
  }

  
  
  useEffect(()=>{
    getEtapas()
  },[])


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>

    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <table style={{width: '80%', marginBottom: 20}}>
      <tr>
        <th>
          Mês
        </th>
        <th>
          Carga - Kg
        </th>
        <th>
          Pax
        </th>
        <th>
          Pqd
        </th>
        <th>
          Combustível - Kg
        </th>
        <th>
          Combustível - Lt
        </th>
      </tr>
      {dados.map((item, index)=>{
        return (
          <tr>
            <td>{meses[item.mes]}</td>
            <td>{formatarNumero(item.carga)}</td>
            <td>{item.pax}</td>
            <td>{item.pqd}</td>
            <td>{formatarNumero(item.combustivel)}</td>
            <td>{formatarNumero(item.combustivel/0.8)}</td>
          </tr>
        )
      })}
    </table>
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
