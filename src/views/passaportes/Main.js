import React, { useEffect, useState, useRef, DatePicker, DateInput } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,
} from '@coreui/react'
import useApi from 'src/services/Api'
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react'
import LoadingSpinner from 'src/components/Loading'
import { Alert } from '@coreui/coreui';
import { Date } from 'core-js'

const Passaportes = () => {

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [trigramas, setTrigramas] = useState('');

  const [etapas, setEtapas] = useState([])
  const [etapasFiltered, setEtapasFiltered] = useState([])
  const [omis, setOmis] = useState('');
  const [ofrag, setOfrag] = useState('');
  const [esforcoAereo, setEsforcoAereo] = useState('');
  const [aeronave, setAeronave] = useState('');
  const [icao, setIcao] = useState('');
  const [esforcos, setEsforcos] = useState([]);
  const [aeronaves, setAeronaves] = useState([]);
  const [horasTotais, setHorasTotais] = useState(0);
  const [limite, setLimite] = useState(20)
  const [horasNoturnasTotais, setHorasNoturnasTotais] = useState('')
  const [passaportes, setPassaportes] = useState([])
  const [passaportesFiltered, setPassaportesFiltered] = useState([])
  
  const Api = useApi()

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
    width:80,
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
    fontSize: 12
  
  };

  const inputStyleLow = {
    width:'100%'
  };
  // Funções de ação para atualizar os estados quando os valores dos filtros mudarem
  const handleDataInicioChange = (e) => {
    setDataInicio(e.target.value);
  };

  const handleDataFimChange = (e) => {
    setDataFim(e.target.value);
  };

  const limites = [30,60,90,120]

  const handleChangeLimit = (e) => {
    setLimite(e.target.value);
  };

  const handleTrigramaChange = (e) => {
    setTrigramas(e.target.value);
  };

  const handleLimpar = () => {
    setDataInicio('');
    setDataFim('');
    setTrigramas('');
    setPassaportesFiltered(passaportes)
  }

  const getPassaportes = async () => {
    let res = await Api.getPassaportes()
    if(!res.error) {
    setPassaportes(res.data)}
    }
  

  useEffect(()=>{
    getPassaportes()},
    [])

  
  const handleFiltrarClick = () => {
    let new_passaportes = [...passaportes]
    
    if (dataInicio != '') {
      new_passaportes = passaportes.filter(i=>{
        let dataInicioDate = new Date(`${dataInicio}T23:59:59.000Z`)
        dataInicioDate.setHours(0, 0, 1);
        if(new Date(i.dep) >= dataInicioDate) {
          return i
        }
      })
    }

    if (dataFim != '') {
      new_passaportes = passaportes.filter(i=>{
        let dataFimDate = new Date(`${dataFim}T23:59:59.000Z`)
        dataFimDate.setHours(23, 59, 59);
        if(new Date(i.dep) <= dataFimDate) {
          return i
        }
      })
    }

    if(trigramas != '') {
      new_passaportes = passaportes.filter(i=>{
        let index = passaportes.findIndex(it=>(it.Trigrama.trigrama).toUpperCase() == (trigramas).toUpperCase())
        if(index > -1) {
          return i
        }
      })
    }

    setPassaportesFiltered(new_passaportes)
  };

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
      {/* Filtro de Data */}   
      <div style={{ marginRight: '20px' }}>
      
        <label>Data limite de vencimento:</label>
        <input type="date" value={dataFim} onChange={handleDataFimChange} />
      </div>
   
        {/* Botão "Filtrar" */}
        <div className='buttons'>
          <button style={botaoStyle} onClick={handleFiltrarClick}>Filtrar</button>
          <button style={botaoStyleRed} onClick={handleLimpar}>Limpar</button>
          <button style={botaoStyleRed} onClick={getPassaportes}>Atualizar</button>
        </div>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
    <div style={{ marginRight: '20px' }}>
        <label style={{marginRight: 5}}>Número de dias para o vencimento:</label>
        <select style={inputStyle} value={limite} onChange={handleChangeLimit}>
          <option value="">Selecione</option>
          {limites.map(i=>{
            return (
              <option value={i}>{i}</option>
            )
          })}
        </select>
        <input type="text" value={trigramas} placeholder="Digite os trigramas separados por vírgula..." /*onKeyPress={handleKeyPress}*/ onChange={handleTrigramaChange} style={inputStyleLow}/>
      </div>   

    </div>
         <table style={{marginBottom:50}}>
          <thead className='tabela-cabecalho'>
            <tr>
            <th colSpan={9}>PASSAPORTES</th>
            </tr>
            <tr className='bold'>
              <td>TRIG</td>
              <td>P/G</td>
              <td>NOME COMPLETO</td>
              <td>NOME DE GUERRA</td>
              <td>DATA DE NASCIMENTO</td> 
              <td>NÚMERO DO PASSAPORTE</td>
              <td>VALIDADE PASSAPORTE</td>
              <td>NÚMERO VISA</td>
              <td>VALIDADE VISA</td>                           
            </tr>
                                   

          {passaportesFiltered.map((item)=>{
             return (
              <tr className='tabelinha'>
              <td>{item.Trigrama.trigrama}</td> 
              <td>{item.Posto.nome}</td>
              <td>{item.nome_completo}</td>
              <td>{item.nome_guerra}</td>
              <td></td> 
              <td>{item.Passaportes[0].numero_pass}</td>
              <td>{item.Passaportes[0].valid_pass}</td>
              <td>{item.Passaportes[0].numero_visa}</td>
              <td>{item.Passaportes[0].valid_visa}</td>
              </tr> 
            )
          })}
                    </thead>
          </table> 
      </CCard>
     
    </>
  )
}

export default Passaportes
