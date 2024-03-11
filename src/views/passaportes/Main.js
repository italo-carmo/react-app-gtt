import React, { useEffect, useState, useRef, DatePicker, DateInput } from 'react'
import styles from './styles.css'
import MaskedInputIcao from '../../components/masked-input-icao'
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
  const [trigrama, setTrigrama] = useState('');

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
    width:100
  };
  // Funções de ação para atualizar os estados quando os valores dos filtros mudarem
  const handleDataInicioChange = (e) => {
    setDataInicio(e.target.value);
  };

  const handleDataFimChange = (e) => {
    setDataFim(e.target.value);
  };

  const limites = [10,20,50,100,200,1000,10000]

  const handleChangeLimit = (e) => {
    setLimite(e.target.value);
  };

  const handleTrigramaChange = (e) => {
    setTrigrama(e.target.value);
  };

  const handleLimpar = () => {
    setDataInicio('');
    setDataFim('');
    setOmis('');
    setOfrag('');
    setEsforcoAereo('');
    setAeronave('');
    setTrigrama('');
    setIcao('');
    setEtapasFiltered(etapas)
  }


  const handleOmisChange = (e) => {
    setOmis(e.target.value);
  };

  const handleOfragChange = (e) => {
    setOfrag(e.target.value);
  };

  const handleEsforcoAereoChange = (e) => {
    setEsforcoAereo(e.target.value);
  };

  const handleIcaoChange = (e) => {
    setIcao(e.target.value);
  };

  const handleAeronaveChange = (e) => {
    setAeronave(e.target.value);
  };

  const handleFiltrarClick = () => {
    let new_etapas = [...etapas]
   setData([
		{
			"nome_guerra": "Assis",
			"nome_completo": "Lucas Araújo Lisboa Assis",
			"Passaportes": [
				{
					"id": 1,
					"id_user": 214,
					"numero_pass": "agoravai",
					"valid_pass": "2024-05-03T00:00:00.000Z",
					"numero_visa": "asdasdasd",
					"valid_visa": "2024-03-05T00:00:00.000Z"
				},
				{
					"id": 2,
					"id_user": 214,
					"numero_pass": "SB045424",
					"valid_pass": "2024-05-03T00:00:00.000Z",
					"numero_visa": "A2145457",
					"valid_visa": "2024-03-05T00:00:00.000Z"
				}
			],
			"Posto": {
				"id": 7,
				"nome": "CP"
			},
			"Trigrama": {
				"id": 224,
				"trigrama": "AIS",
				"id_user": 214
			}
		}
	])
    
    if (omis != '') {
       new_etapas = new_etapas.filter(i=>{
        if(i.Missao && (i.Missao.numero).toString().includes(omis)) {
          return i
        }
      })
    }

    if (ofrag != '') {
      new_etapas = new_etapas.filter(i=>{
       if(i.Missao && (i.Missao.Ofrag.numero).toString().includes(ofrag)) {
         return i
       }
     })
   }

   if (esforcoAereo != '') {
    new_etapas = new_etapas.filter(i=>{
     if(i.esforco_aereo && (i.esforco_aereo) == esforcoAereo) {
       return i
     }
   })
 }

  if (aeronave != '') {
    new_etapas = new_etapas.filter(i=>{
    if(i.Aeronave && (i.Aeronave.aeronave) == aeronave) {
      return i
    }
  })
  }

    if (dataInicio != '') {
      new_etapas = new_etapas.filter(i=>{
        let dataInicioDate = new Date(`${dataInicio}T23:59:59.000Z`)
        dataInicioDate.setHours(0, 0, 1);
        if(new Date(i.dep) >= dataInicioDate) {
          return i
        }
      })
    }

    if (dataFim != '') {
      new_etapas = new_etapas.filter(i=>{
        let dataFimDate = new Date(`${dataFim}T23:59:59.000Z`)
        dataFimDate.setHours(23, 59, 59);
        if(new Date(i.dep) <= dataFimDate) {
          return i
        }
      })
    }

    if(trigrama != '') {
      new_etapas = new_etapas.filter(i=>{
        let index = i.Usuarios.findIndex(it=>(it.Trigrama.trigrama).toUpperCase() == (trigrama).toUpperCase())
        if(index > -1) {
          return i
        }
      })
    }

    if(icao != '') {
      new_etapas = new_etapas.filter(i=>{
        if(i.Dep.icao.includes(icao.toUpperCase()) || i.Pouso.icao.includes(icao.toUpperCase())) {
          return i
        }
      })
    }

    var horas_totais = 0
    new_etapas.forEach(item => {
      let [horasStr, minutosStr] = item.tempo_de_voo.split(':');
      const horas = parseInt(horasStr, 10);
      const minutos = parseInt(minutosStr, 10);
      
      const minutosTotais = horas * 60 + minutos;
      horas_totais += minutosTotais;
    });

    setHorasTotais(horas_totais)

    setEtapasFiltered(new_etapas)
  };

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
      {/* Filtro de Data */}
      <div style={{ marginRight: '20px' }}>
        <label>Data Início:</label>
        <input type="date" value={dataInicio} onChange={handleDataInicioChange} />
      </div>
      <div style={{ marginRight: '20px' }}>
        <label>Data Fim:</label>
        <input type="date" value={dataFim} onChange={handleDataFimChange} />
      </div>

      {/* Filtro de Trigrama */}
      <div>
        <label>Trigrama:</label>
        <input type="text" maxLength="3" value={trigrama} onChange={handleTrigramaChange} style={inputStyleLow}/>
      </div>
        {/* Botão "Filtrar" */}
        <div className='buttons'>
          <button style={botaoStyle} onClick={handleFiltrarClick}>Filtrar</button>
          <button style={botaoStyleRed} onClick={handleLimpar}>Limpar</button>
        </div>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
    <div style={{ marginRight: '20px' }}>
        <label style={{marginRight: 5}}>Últimos:</label>
        <select style={inputStyle} value={limite} onChange={handleChangeLimit}>
          <option value="">Selecione</option>
          {limites.map(i=>{
            return (
              <option value={i}>{i}</option>
            )
          })}
        </select>
      </div>   

    </div>
         <table style={{marginBottom:50}}>
          <thead className='tabela-cabecalho'>
            <tr>
            <th colSpan={8}>PASSAPORTES</th>
            </tr>
            <tr className='bold'>
              <td>POSTO/GRAD</td>
              <td>NOME COMPLETO</td>
              <td>NOME DE GUERRA</td>
              <td>DATA DE NASCIMENTO</td> 
              <td>NÚMERO DO PASSAPORTE</td>
              <td>VALIDADE PASSAPORTE</td>
              <td>NÚMERO VISA</td>
              <td>VALIDADE VISA</td>                           
            </tr>
                                   

          {data.map((item)=>{
             return (
              <tr className='tabelinha'>
              <td>{item.Posto.nome}</td>
              <td>{item.nome_completo}</td>
              <td>{item.nome_guerra}</td>
              <td>27/03/1991</td> 
              <td>{item.Passaportes[0].numero_pass}</td>
              <td>20/05/2024</td>
              <td>A123456789</td>
              <td>30/06/2024</td>
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
