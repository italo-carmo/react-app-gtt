import React, { useEffect, useState } from 'react'
import styles from './styles.css'
import {
  CCard,

} from '@coreui/react'
import { Alert } from '@coreui/coreui'


const Dashboard = () => {

  const [tripulacao,setTripulacao] = useState([])
  const [id,setId] = useState([])
  const [caixaVisible, setCaixaVisible] = useState(false)
  const [caixaCreateVisible, setCaixaCreateVisible] = useState(false)
  const [idEdit, setIdEdit] = useState('')
  const [semana, setSemana] = useState([])
  const [firstDay, setFirstDay] = useState(new Date())
  const [hoje, setHoje] = useState(new Date())

  let aviao1 = [
    {
      data: '17/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 1,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
            omis:'001'
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 2,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
          omis:'001'
        }
    },
    ]
    },
    {
      data: '18/05',
      missoes:[]
    },
    {
      data: '19/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 3,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
            omis:'002'
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 4,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
          omis:'002'
        }
    },]
    },
    {
      data: '20/05',
      missoes:[]
    },
    {
      data: '21/05',
      missoes:[]
    },
    {
      data: '22/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 5,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
            omis:'003'
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 6,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
          omis:'003'
        }
    },
    {
      tipo: 'missao',
      missao: {
        id: 7,
        dep: 'SBBR',
        horaDep: '1430',
        pouso: 'SBGL',
        horaPouso: '1600',
        tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
        omis:'003'
      }
  },
  {
    tipo: 'missao',
    missao: {
      id: 8,
      dep: 'SBBR',
      horaDep: '1430',
      pouso: 'SBGL',
      horaPouso: '1600',
      tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
      omis:'003'
    }
}
  
  ]
    },
    {
      data: '23/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 9,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
            omis:'004'
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 10,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
          omis:'004'
        }
    }]
    },
  ]

  let aviao2 = [
    {
      data: '17/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 11,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 12,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },
    ]
    },
    {
      data: '18/05',
      missoes:[]
    },
    {
      data: '19/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 13,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 14,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },]
    },
    {
      data: '20/05',
      missoes:[]
    },
    {
      data: '21/05',
      missoes:[]
    },
    {
      data: '22/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 15,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 16,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },]
    },
    {
      data: '23/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 17,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 18,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    }]
    },
  ]

  let aviao3 = [
    {
      data: '17/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 19,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 20,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },
    ]
    },
    {
      data: '18/05',
      missoes:[]
    },
    {
      data: '19/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 21,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id:22,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },]
    },
    {
      data: '20/05',
      missoes:[]
    },
    {
      data: '21/05',
      missoes:[]
    },
    {
      data: '22/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 23,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 24,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },]
    },
    {
      data: '23/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 25,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 26,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    }]
    },
  ]

  let aviao4 = [
    {
      data: '17/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 27,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 28,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },
    ]
    },
    {
      data: '18/05',
      missoes:[]
    },
    {
      data: '19/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 29,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 30,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },]
    },
    {
      data: '20/05',
      missoes:[]
    },
    {
      data: '21/05',
      missoes:[]
    },
    {
      data: '22/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 31,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 32,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    },]
    },
    {
      data: '23/05',
      missoes:[
        {
          tipo: 'missao',
          missao: {
            id: 33,
            dep: 'SBAN',
            horaDep: '1200',
            pouso: 'SBBR',
            horaPouso: '1230',
            tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
          }
      },
      {
        tipo: 'missao',
        missao: {
          id: 34,
          dep: 'SBBR',
          horaDep: '1430',
          pouso: 'SBGL',
          horaPouso: '1600',
          tripulacao: ['ITL', 'AIS', 'WSL', 'OTO']
        }
    }]
    },
  ]


  let data = {
    avioes:[
      {
        aviao: '2853',
        eventos: [
          {
            data: '17/05',
            tipo: 'missao',
            missao: {
              id: 1,
              dep: 'SBAN',
              horaDep: '1200',
              pouso: 'SBBR',
              horaPouso: '1230',
              tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
              omis:'001'
            },
            manutencao: null
        },
        {
          data: '17/05',
          tipo: 'missao',
          missao: {
            id: 2,
            dep: 'SBBR',
            horaDep: '1430',
            pouso: 'SBGL',
            horaPouso: '1600',
            tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
            omis:'001'
          },
          manutencao: null
      },
      {
        data: '17/05',
        tipo: 'missao',
        missao: {
          id: 2,
          dep: 'SBGL',
          horaDep: '1730',
          pouso: 'SBAN',
          horaPouso: '1900',
          tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
          omis:'001'
        },
        manutencao: null
    },
      ]
      },
      {
        aviao: '2854',
        eventos: [
          {
            data: '19/05',
            tipo: 'missao',
            missao: {
              id: 2,
              dep: 'SBAN',
              horaDep: '1200',
              pouso: 'SBBR',
              horaPouso: '1230',
              tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
              omis:'001'
            },
            manutencao: null
        },
        {
          data: '19/05',
          tipo: 'missao',
          missao: {
            id: 2,
            dep: 'SBBR',
            horaDep: '1400',
            pouso: 'SBAN',
            horaPouso: '1430',
            tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
            omis:'001'
          },
          manutencao: null
      },
        ]
      },
      {
        aviao: '2855',
       eventos: [
          {
            data: '17/05',
            tipo: 'missao',
            missao: {
              id: 1,
              dep: 'SBAN',
              horaDep: '1200',
              pouso: 'SBBR',
              horaPouso: '1230',
              tripulacao: ['ITL', 'AIS', 'WSL', 'OTO'],
              omis:'001'
            },
            manutencao: null
        },
        {
          data: '17/05',
          tipo: 'missao',
          missao: {
            id: 2,
            dep: 'SBBR',
            horaDep: '1430',
            pouso: 'SBGL',
            horaPouso: '1600',
            tripulacao: ['TNT', 'GMR', 'THA', 'MRC'],
            omis:'001'
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

  const handleMouseEnter = (id,trip) => {
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
    for(var i=0;i<=6;i++) {
      if(i!=0){
        var hoje_sum = hoje_copy.setDate(hoje_copy.getDate() + 1);
      } else {
        var hoje_sum = hoje_copy.setDate(hoje_copy.getDate());
      }
      let hoje_sum_date = new Date(hoje_sum)
      let dia = hoje_sum_date.getDate()
      let mes = (hoje_sum_date.getMonth()+1)
      if(dia<=9) {
        dia= '0'+dia
      }
      if(mes<=9) {
        mes= '0'+mes
      }
      let hoje_sum_formatted = dia+'/'+mes
      dias.push(hoje_sum_formatted)
    }
    setSemana(dias)
  }

  const editDates = (data) => {
    let data_edit = new Date(data)
    setFirstDay(data_edit)
  }

  const handleCheckDate = (numero, tipo) => {
    let firstDayCopy = new Date(firstDay);
    if(tipo) {
      firstDayCopy.setDate(firstDayCopy.getDate() - numero);
    } else {
      firstDayCopy.setDate(firstDayCopy.getDate() + numero);
    }
    setFirstDay(firstDayCopy)
  }

  const getHoje = () => {
    setFirstDay(hoje)
  }

  useEffect(()=>{
    getDias(firstDay)
  },[firstDay])

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column'}}>
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', padding:10}}>
          <div className='calendario'>
            {(firstDay.toLocaleString('pt-BR', { month: 'long' }).toUpperCase())+'/'+(firstDay.getFullYear())}
          </div>
          <div className='botoes'>
              <div className='item-botao' onClick={()=>handleCheckDate(7, true)}>&lt;&lt;</div>
              <div className='item-botao' onClick={()=>handleCheckDate(1, true)}>&lt;</div>
              <div className='item-botao' style={{marginLeft:5, marginRight:5}} onClick={getHoje}>HOJE</div>
              <div className='item-botao' onClick={()=>handleCheckDate(1, false)}>&gt;</div>
              <div className='item-botao' onClick={()=>handleCheckDate(7, false)}>&gt;&gt;</div>
          </div>
          </div>
         <div style={{display: 'flex', flexDirection:'column', width:'100%'}}>
          <div className='topo'>
            <div className='missao'>Avião</div>
            {semana.map((item,index)=>{
                var hoje_dia = hoje.getDate()
                let hoje_mes = (hoje.getMonth()+1)
                if(hoje_dia <=9) {
                  hoje_dia = '0'+hoje_dia
                }
                if(hoje_mes <=9) {
                  hoje_mes = '0'+hoje_mes
                }
                let hoje_string = hoje_dia+'/'+hoje_mes

                return <div className='missao' style={{backgroundColor: hoje_string == item ? '#46a31d' : '#000'}}>{item}</div>
            })}
          </div>
          <div className='missoes'>
            

            {data.avioes.map(item=>{
              return <div className='missao-item'>
                <div className='missao aviao'>{item.aviao}</div>
                {semana.map(i=>{
                 return <div className='item-missao'>
                      {item.eventos.map(it=>{
                          if(it.data == i) {
                            return <div className='missao white'>{it.missao.horaDep}Z {it.missao.dep} - {it.missao.pouso} {it.missao.horaPouso}Z</div>
                          }
                      })}
                    </div>
                })}
              </div>
            })}
            </div>
         </div>
        
        {
          caixaCreateVisible &&  <div className='modal-create'>
            <div style={{display: 'flex', justifyContent:'flex-end',margin:10, cursor: 'pointer'}}>
              <div onClick={()=>setCaixaCreateVisible(false)} style={{color:'#fff'}}>X</div>
            </div>
          OIIII
        </div>
        }
       
    
      </CCard>


     
    </>
  )
}

export default Dashboard
