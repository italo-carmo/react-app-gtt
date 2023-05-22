import React, { useEffect, useState } from 'react'
import styles from './styles.css'
import {
  CCard,

} from '@coreui/react'
import { Alert } from '@coreui/coreui'
import useApi from 'src/services/Api'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react'



const Dashboard = () => {

  const [tripulacao, setTripulacao] = useState([])
  const [id, setId] = useState([])
  const [caixaVisible, setCaixaVisible] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [idEdit, setIdEdit] = useState('')
  const [semana, setSemana] = useState([])
  const [firstDay, setFirstDay] = useState(new Date())
  const [hoje, setHoje] = useState(new Date())
  const [data, setData] = useState({ avioes: [] })

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const Api = useApi()

  let data2 = {
    avioes: [
      {
        aviao: '2853',
        eventos: [
          {
            data: '17/05/2023',
            tipo: 'missao',
            missao: {
              id: 1,
              dep: 'SBAN',
              horaDep: '1200',
              pouso: 'SBBR',
              horaPouso: '1230',
              tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
              omis: '001'
            },
            manutencao: null
          },
          {
            data: '17/05/2023',
            tipo: 'missao',
            missao: {
              id: 2,
              dep: 'SBBR',
              horaDep: '1430',
              pouso: 'SBGL',
              horaPouso: '1600',
              tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
              omis: '001'
            },
            manutencao: null
          },
          {
            data: '17/05/2023',
            tipo: 'missao',
            missao: {
              id: 2,
              dep: 'SBGL',
              horaDep: '1730',
              pouso: 'SBAN',
              horaPouso: '1900',
              tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
              omis: '001'
            },
            manutencao: null
          },
        ]
      },
      {
        aviao: '2854',
        eventos: [
          {
            data: '19/05/2023',
            tipo: 'missao',
            missao: {
              id: 2,
              dep: 'SBAN',
              horaDep: '1200',
              pouso: 'SBBR',
              horaPouso: '1230',
              tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
              omis: '001'
            },
            manutencao: null
          },
          {
            data: '19/05/2023',
            tipo: 'missao',
            missao: {
              id: 2,
              dep: 'SBBR',
              horaDep: '1400',
              pouso: 'SBAN',
              horaPouso: '1430',
              tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
              omis: '001'
            },
            manutencao: null
          },
        ]
      },
      {
        aviao: '2855',
        eventos: [
          {
            data: '17/05/2023',
            tipo: 'missao',
            missao: {
              id: 1,
              dep: 'SBAN',
              horaDep: '1200',
              pouso: 'SBBR',
              horaPouso: '1230',
              tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
              omis: '001'
            },
            manutencao: null
          },
          {
            data: '17/05/2023',
            tipo: 'missao',
            missao: {
              id: 2,
              dep: 'SBBR',
              horaDep: '1430',
              pouso: 'SBGL',
              horaPouso: '1600',
              tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
              omis: '001'
            },
            manutencao: null
          },
        ]
      },
      {
        aviao: '2856',
        eventos: []
      }
    ]
  }

  const handleMouseEnter = (id, trip) => {
    setId(id)
    setTripulacao(trip)
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
    for (var i = 0; i <= 6; i++) {
      if (i != 0) {
        var hoje_sum = hoje_copy.setDate(hoje_copy.getDate() + 1);
      } else {
        var hoje_sum = hoje_copy.setDate(hoje_copy.getDate());
      }
      let hoje_sum_date = new Date(hoje_sum)
      let dia = hoje_sum_date.getDate()
      let mes = (hoje_sum_date.getMonth() + 1)
      let ano = (hoje_sum_date.getFullYear())
      if (dia <= 9) {
        dia = '0' + dia
      }
      if (mes <= 9) {
        mes = '0' + mes
      }
      let hoje_sum_formatted = dia + '/' + mes + '/' + ano
      dias.push(hoje_sum_formatted)
    }
    setSemana(dias)
    getMissoes(dias)
  }

  const getMissoes = async (dias) => {
    let inicio = dias[0]
    let fim = dias[6]
    let res = await Api.getMissoesAvioes({ inicio, fim })
    if (!res.error) {
      setData({ avioes: res.data })
    }
  }

  const editDates = (data) => {
    let data_edit = new Date(data)
    setFirstDay(data_edit)
  }

  const handleCheckDate = (numero, tipo) => {
    let firstDayCopy = new Date(firstDay);
    if (tipo) {
      firstDayCopy.setDate(firstDayCopy.getDate() - numero);
    } else {
      firstDayCopy.setDate(firstDayCopy.getDate() + numero);
    }
    setFirstDay(firstDayCopy)
  }

  const getHoje = () => {
    setFirstDay(hoje)
  }

  useEffect(() => {
    getDias(firstDay)
  }, [firstDay]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="calendario" onClick={onClick} ref={ref}>
      {(firstDay.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()) + '/' + firstDay.getFullYear()}
    </button>
  ));

  return (
    <>
      <CCard className="mb-6" style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <div className='calendario'>
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
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div className='topo'>
            <div className='missao'>Avião</div>
            {semana.map((item, index) => {
              var hoje_dia = hoje.getDate()
              let hoje_mes = (hoje.getMonth() + 1)
              let hoje_ano = hoje.getFullYear()
              if (hoje_dia <= 9) {
                hoje_dia = '0' + hoje_dia
              }
              if (hoje_mes <= 9) {
                hoje_mes = '0' + hoje_mes
              }
              let hoje_string = hoje_dia + '/' + hoje_mes + '/' + hoje_ano

              return <div className='missao' style={{ backgroundColor: hoje_string == item ? '#46a31d' : '#000' }}>{item}</div>
            })}
          </div>
          <div className='missoes'>


            {(data.avioes.length > 0) && data.avioes.map(item => {
              return <div className='missao-item'>
                <div className='missao aviao'>{item.aviao}</div>
                {semana.map(i => {
                  return <div className='item-missao'>
                    {item.eventos.length > 0 && item.eventos.map(it => {
                      if (it.data == i) {
                        return <div
                          onClick={() => setCaixaCreateVisible(true)} className='missao white'
                          onMouseEnter={() => handleMouseEnter(it.missao.id, it.missao.tripulacao)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {caixaVisible && (id == it.missao.id) && <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              left: '0',
                              background: 'white',
                              padding: '10px',
                              border: '1px solid black',
                              zIndex: 1, // Definindo uma ordem de empilhamento maior para a div das informações
                            }}
                          >
                            {tripulacao}
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
          caixaCreateVisible && <div className='modal-create'>
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 10, cursor: 'pointer' }}>
              <div onClick={() => setCaixaCreateVisible(false)} style={{ color: '#fff' }}>X</div>
            </div>
            OIIII
          </div>
        }


      </CCard>



    </>
  )
}

export default Dashboard
