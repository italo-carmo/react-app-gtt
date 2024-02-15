import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import useApi from 'src/services/Api'
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from 'src/components/Loading'
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

const EsforcosAereos = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState([])
  const [dadosCopy, setDadosCopy] = useState([])
  const [tipos, setTipos] = useState([])
  const [quantidade, setQuantidade] = useState('')
  const [voado, setVoado] = useState('')
  const [saldo, setSaldo] = useState('')
  const [tipoSelected, setTipoSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [jan, setJan] = useState(0)
  const [fev, setFev] = useState(0)
  const [mar, setMar] = useState(0)
  const [abr, setAbr] = useState(0)
  const [mai, setMai] = useState(0)
  const [jun, setJun] = useState(0)
  const [jul, setJul] = useState(0)
  const [ago, setAgo] = useState(0)
  const [set, setSet] = useState(0)
  const [out, setOut] = useState(0)
  const [nov, setNov] = useState(0)
  const [dez, setDez] = useState(0)
  
  const Api = useApi()

  const getDados = async () => {
    setLoading(true)
    let res = await Api.getEsforcos()
    if(!res.error) {
      setLoading(false)
      // Inicializando variáveis para armazenar as somas
  let somaQuantidade = 0;
  let somaVoado = 0;
  let somaSaldo = 0;
  const tiposSet = new Set();


  // Iterando sobre o array
  for (let i = 0; i < res.data.length; i++) {
      tiposSet.add(res.data[i].tipo);
      }
      setTipos(Array.from(tiposSet));
      setDados(res.data)
      setDadosCopy(res.data)
    } else {
      alert(res.error)
      setLoading(false)
    }
  }

  const handleChangeTipo = (e) => {
    setTipoSelected(e.target.value)
    let dados_copy = [...dados]
    console.log(e.target.value)
    if(e.target.value == 'TODOS') {
      setDadosCopy(dados)
    } else {
      dados_copy = dados_copy.filter(i=>{
        if(i.tipo == e.target.value) {
          return i
        }
      })
      setDadosCopy(dados_copy)
    }

  }

  const minutosParaHorasMinutos = (minutos) => {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');
    return `${horasFormatadas}:${minutosFormatados}`;
  }

  // Função para formatar o tempo com dois dígitos
const formatarTempo = (horas, minutos) => {
  const horasFormatadas = horas.toString().padStart(2, '0');
  const minutosFormatados = minutos.toString().padStart(2, '0');
  return `${horasFormatadas}:${minutosFormatados}`;
};

  const getQuantidade = () => {
    let somaQuantidade = 0;
  let somaVoado = 0;
  let somaSaldo = 0;
  let jan = 0
  let fev = 0
  let mar = 0
  let abr = 0
  let mai = 0
  let jun = 0
  let jul = 0
  let ago = 0
  let set = 0
  let out = 0
  let nov = 0
  let dez = 0

  // Iterando sobre o array
  for (let i = 0; i < dadosCopy.length; i++) {
      // Convertendo os valores de tempo para minutos (assumindo que o formato é horas:minutos)
      const quantidadeArray = dadosCopy[i].quantidade.split(':');
      const voadoArray = dadosCopy[i].voado.split(':');
      const saldoArray = dadosCopy[i].saldo.split(':');
      const janArray = dadosCopy[i].voosPorMes[0].voado
      const fevArray = dadosCopy[i].voosPorMes[1].voado
      const marArray = dadosCopy[i].voosPorMes[2].voado
      const abrArray = dadosCopy[i].voosPorMes[3].voado
      const maiArray = dadosCopy[i].voosPorMes[4].voado
      const junArray = dadosCopy[i].voosPorMes[5].voado
      const julArray = dadosCopy[i].voosPorMes[6].voado
      const agoArray = dadosCopy[i].voosPorMes[7].voado
      const setArray = dadosCopy[i].voosPorMes[8].voado
      const outArray = dadosCopy[i].voosPorMes[9].voado
      const novArray = dadosCopy[i].voosPorMes[10].voado
      const dezArray = dadosCopy[i].voosPorMes[11].voado

      // Somando os valores convertidos
      somaQuantidade += parseInt(quantidadeArray[0]) * 60 + parseInt(quantidadeArray[1]);
      somaVoado += parseInt(voadoArray[0]) * 60 + parseInt(voadoArray[1]);
      somaSaldo += parseInt(saldoArray[0]) * 60 + parseInt(saldoArray[1]);
      jan += janArray
      fev += fevArray
      mar += marArray
      abr += abrArray
      mai += maiArray
      jun += junArray
      jul += julArray
      ago += agoArray
      set += setArray
      out += outArray
      nov += novArray
      dez += dezArray
      }

  

        // Convertendo os totais de volta para o formato horas:minutos
        const totalQuantidadeHoras = Math.floor(somaQuantidade / 60);
        const totalQuantidadeMinutos = somaQuantidade % 60;
        const totalQuantidadeFormatado = formatarTempo(totalQuantidadeHoras, totalQuantidadeMinutos);

        const totalVoadoHoras = Math.floor(somaVoado / 60);
        const totalVoadoMinutos = somaVoado % 60;
        const totalVoadoFormatado = formatarTempo(totalVoadoHoras, totalVoadoMinutos);


        const totalSaldoHoras = Math.floor(somaSaldo / 60);
        const totalSaldoMinutos = somaSaldo % 60;
        const totalSaldoFormatado = formatarTempo(totalSaldoHoras, totalSaldoMinutos);

        // Calculando a porcentagem relativa ao valor de quantidade
        const porcentagemVoado = ((somaVoado / somaQuantidade) * 100).toFixed(2);
        const porcentagemSaldo = ((somaSaldo / somaQuantidade) * 100).toFixed(2);

        // Adicionando a porcentagem aos valores formatados
        const voadoComPorcentagem = `${totalVoadoFormatado} (${porcentagemVoado}%)`;
        const saldoComPorcentagem = `${totalSaldoFormatado} (${porcentagemSaldo}%)`;
      
      setJan(jan)
      setFev(fev)
      setMar(mar)
      setAbr(abr)
      setMai(mai)
      setJun(jun)
      setJul(jul)
      setAgo(ago)
      setSet(set)
      setOut(out)
      setNov(nov)
      setDez(dez)
      setQuantidade(totalQuantidadeFormatado)
      setVoado(voadoComPorcentagem)
      setSaldo(saldoComPorcentagem)
  }
  
  useEffect(()=>{
    getDados()
  },[])

  useEffect(()=>{
    getQuantidade()
  },[dadosCopy])

  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };



  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center', flex: 1 }}>
        <label style={{fontWeight: 'bold', marginRight: 5}}>Tipo:</label>
        <select style={inputStyle} value={tipoSelected} onChange={handleChangeTipo}>
          <option value="TODOS">TODOS</option>
          {tipos.map(i=>{
            return (
              <option value={i}>{i}</option>
            )
          })}
        </select>
      </div>
      </div>
      <div class="table-area">
      <table style={{marginBottom:20}}>
        <tr>
          <th>Tipo</th>
          <th>Nome</th>
          <th>JAN</th>
          <th>FEV</th>
          <th>MAR</th>
          <th>ABR</th>
          <th>MAI</th>
          <th>JUN</th>
          <th>JUL</th>
          <th>AGO</th>
          <th>SET</th>
          <th>OUT</th>
          <th>NOV</th>
          <th>DEZ</th>
          <th>Ano</th>
          <th>Alocado</th>
          <th>Voado</th>
          <th>Saldo</th>
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
            dadosCopy.map(it=>{
              return (
                <tr className={it.saldo.includes("-") ? 'red' : ''}>
                  <td>{it.tipo}</td>
                  <td>{it.nome}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[0].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[1].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[2].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[3].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[4].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[5].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[6].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[7].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[8].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[9].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[10].voado)}</td>
                  <td>{minutosParaHorasMinutos(it.voosPorMes[11].voado)}</td>
                  <td>{it.ano}</td>
                  <td>{it.quantidade}</td>
                  <td>{it.voado}</td>
                  <td>{it.saldo}</td>
                </tr>
              )
            })
          }
           <tr>
                  <td colSpan={2} style={{fontWeight:'bold'}}>TOTAL</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(jan)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(fev)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(mar)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(abr)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(mai)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(jun)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(jul)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(ago)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(set)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(out)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(nov)}</td>
                  <td style={{fontWeight:'bold'}}>{minutosParaHorasMinutos(dez)}</td>
                  <td></td>
                  <td style={{fontWeight:'bold'}}>{quantidade}</td>
                  <td style={{fontWeight:'bold'}}>{voado}</td>
                  <td style={{fontWeight:'bold'}}>{saldo}</td>
                </tr>
      </table>
      </div>
      </CCard>
    </>
  )
}

export default EsforcosAereos
