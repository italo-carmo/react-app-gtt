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
import ReactDatePicker from 'react-datepicker';
const ListaQuadrinhos = () => {
  const navigate = useNavigate()
  const [funcao, setFuncao] = useState('')
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingExterior, setLoadingExterior] = useState(false)
  const [quadrinhoSelected, setQuadrinhoSelected] = useState('')
  const [quadrinhos, setQuadrinhos] = useState([])
  const [exterior, setExterior] = useState(false)
  const [exteriorLista, setExteriorLista] = useState([])
  const [indexSelected, setIndexSelected] = useState('a')
  const [dataInicioIndisp, setDataInicioIndisp] = useState(new Date())
  const [dataFimIndisp, setDataFimIndisp] = useState(new Date())
  const [indisponibilidades, setIndisponibilidades] = useState([])
  const [indisponibilidadeUser, setIndisponibilidadeUser] = useState('')
  const [caixaVisible,setCaixaVisible] = useState(true)
  const [pauDeSebo, setPauDeSebo] = useState([])
  const [fases, setFases] = useState([])
  const [subprogramas, setSubprogramas] = useState([])
  const [usersData, setUsersData] = useState([])
  const [subprograma, setSubprograma] = useState('')
  const [fase, setFase] = useState('')
  const [operacionalidades, setOperacionalidades] = useState([])
  const [comissionamento, setComissionamento] = useState([])
  const [criterio, setCriterio] = useState('quantidade')

  const funcoes = [{label: 'Pilotos', value: 'Piloto'}, {label: 'Mecânicos', value: 'Mecânico de Voo'}, {label: 'Loadmasters', value: 'Loadmaster'}, {label: 'Comissários', value: 'Comissário'}, {label: 'OE-3', value: 'O3'}]
  
  const Api = useApi()

  const getQuadrinhos = async () => {
    let res = await Api.getQuadrinhos()
    if(!res.error) {
      var dados = res.data
      dados.push({nome: 'Manobras', id: null})
      let dados_final = dados.map(item=>{
        return (
          {label: item.nome,
            value: item.id
          }
        )
      })
      setQuadrinhos(dados_final)
    }
  }

  const getComissionamento = async () => {
    var resultado = await fetch(`https://script.google.com/macros/s/AKfycbwSWZ_p3EgYGDL6HHGse8TJXIKc_N-yff5lliS0wLFZqVko-hhzr9icBdc6704cw725SQ/exec`, {
      method: 'GET'
  });
    let resultado_json = await resultado.json()
    setComissionamento(resultado_json)
  }

  const getOperacionalidades = async () => {
    setLoading(true)
    let res = await Api.getOperacionalidades()
    if(!res.error) {
      setOperacionalidades(res.data)

      setLoading(false)
    } else {
      alert(res.error)
      setLoading(false)
      return
    }
  }
  
  useEffect(()=>{
    getQuadrinhos()
    fetchSubprogramas()
    getOperacionalidades()
    getComissionamento()
  },[])

  useEffect(()=>{
    handleChangeCriterio()
  },[criterio])

  


  const inputStyle = {
    padding: '5px',
    borderRadius: '10px',
    border: '1px solid #000',
  };

  const DateInput = ({ value, onClick }) => (
    <img style={{cursor:'pointer'}} src='https://www.1gtt.com.br/app/calendar-black.png' width="30px" onClick={onClick}/>
  )


  const handleChangeFuncao = (e) => {
    setFuncao(e.target.value)
  }

  const handleChangeQuadrinho = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const novoLabelSelecionado = e.target.options[selectedIndex].label;
    if(novoLabelSelecionado == 'BPEX' || novoLabelSelecionado == 'AMENOR' || novoLabelSelecionado == 'AMESUL' || novoLabelSelecionado == 'EUROPA' || novoLabelSelecionado == 'RESTO MUN') {
      setExterior(true)
    } else {
      setExterior(false)
    }
    setQuadrinhoSelected(e.target.value)
  }

  const handlePesquisar = async () => {
    if(!funcao || !quadrinhoSelected) {
      alert('Selecione o Quadrinho e a Função')
      return
    }
    let item = {
      inicio: dataInicioIndisp.toISOString(),
      fim: dataFimIndisp.toISOString(),
      expediente: 'both'
    }
    setDados([])
    setExteriorLista([])
    setLoading(true)

    let res_indisp = await Api.getIndisponibilidadesData(item)

    if(!res_indisp.error) {
      setIndisponibilidades(res_indisp.data)
    }

    var res_pau_de_sebo = await Api.getPauDeSebo({funcao})
    if(!res_pau_de_sebo.error) {
      setPauDeSebo(res_pau_de_sebo.data)
    }

    if(quadrinhoSelected == 'Manobras') {
      var res = await Api.getQuadrinhosManobras({funcao})
      if(!res.error) {
        res.data = res.data.map(item=>{
          let index = res_pau_de_sebo.data.findIndex(i=>i.Trigrama == item.trigrama)
          if(index >=0) {
            item.horas = res_pau_de_sebo.data[index]['Horas']
            item.ultimo_voo = res_pau_de_sebo.data[index]['Ultimo_voo']
            item.dias_sem_voar = res_pau_de_sebo.data[index]['Dias_sem_voar']
          } else {
            item.horas = '00:00'
            item.ultimo_voo = '-'
            item.dias_sem_voar = '-'
          }
          return item
        })
        setDados(res.data)
        handleChangeCriterio()
      }
      
    } else {
      let item = {
        id_quadrinho: quadrinhoSelected,
        funcao
      }
      if(exterior) {
        setLoadingExterior(true)
        var res = await Api.getListaQuadrinhoFuncaoExterior(item)
        if(!res.error) { 
          const usuariosComData = res.data.filter(usuario => usuario.data_operacional);
          const usuariosSemData = res.data.filter(usuario => !usuario.data_operacional);
          const usuariosOrdenados = [...usuariosComData, ...usuariosSemData];
          setLoadingExterior(false)
          setExteriorLista(usuariosOrdenados)
        } else {
          alert(res.error)
          setLoadingExterior(false)
          return
        }
      } else {
        var res = await Api.getListaQuadrinhoFuncao(item)
        res.data = res.data.map(item=>{
          let index = res_pau_de_sebo.data.findIndex(i=>i.Trigrama == item.trigrama)
          if(index >=0) {
            item.horas = res_pau_de_sebo.data[index]['Horas']
            item.ultimo_voo = res_pau_de_sebo.data[index]['Ultimo_voo']
            item.dias_sem_voar = res_pau_de_sebo.data[index]['Dias_sem_voar']
          } else {
            item.horas = '00:00'
            item.ultimo_voo = '-'
            item.dias_sem_voar = '-'
          }
          return item
        })
        if(!res.error) {
          res.data.sort((a, b) => {
            // Primeiro, compare pela quantidade de quadrinhos
            if (a.quantidade < b.quantidade) return -1;
            if (a.quantidade > b.quantidade) return 1;
          
            // Se a quantidade for igual, compare pela antiguidade
            if (a.antiguidade < b.antiguidade) return -1;
            if (a.antiguidade > b.antiguidade) return 1;
          
            // Se a quantidade e a antiguidade forem iguais, não é necessário fazer nada
            return 0;
          });
          setDados(res.data)
        }
      }

    }
    setLoading(false)
  }

  const fetchSubprogramas = async () => {
    const subprogramas = await Api.getSubprogramas()
    const subprogramas_data = subprogramas.data
    const subprogramas_label = subprogramas_data.map(obj => obj.label)
    const subprogramas_id = subprogramas_data.map(obj => obj.id)
    const objetosubprogramasitems = subprogramas_label.map((nome, index) => ({ label: nome, value: subprogramas_id[index]}))
    setSubprogramas(objetosubprogramasitems)   
 }
 
 const fetchFases = async (idSubprograma) => {
   const fases = await Api.getFases(idSubprograma)
   const fases_data = fases.data
   const fases_descricao = fases_data.map(obj => obj.descricao)
   const fasesId = fases_data.map(obj => obj.id)
 
   const objetofasesitems = fases_descricao.map((nome, index) => ({ label: nome, value:fasesId[index]}))
   setFases(objetofasesitems)   
 }
 
 const fetchUsers = async (selectedfases) => {
  setUsersData([])
   const users = await Api.filterUsers(selectedfases)
   const users_data = users.data
   
   const nomesTermino = users_data.flatMap((obj) => {
     return obj.Cois.filter((coi) => coi.tipo === "TERMINO").flatMap((coi) => {
       return coi.Usuarios.map((user) => user.Trigrama.trigrama);
     });
   });
   setUsersData(nomesTermino)
   }

   const handleVerificar = () => {
    if (!subprograma || !fase) {
      alert('Selecione um Subprograma e uma Fase!')
      return
    }
    fetchUsers(fase)
   }

  const handleChangeIndex = (index) => {
    if (index == indexSelected) {
      setIndexSelected('a')
    } else {
      setIndexSelected(index)
    }
  }

  const handleMouseEnter = (index) => {
    setIndisponibilidadeUser(indisponibilidades[index])
    setCaixaVisible(true)
  }

  const handleMouseLeave = () => {
    setCaixaVisible(false);
  };

  const compararPorTrigramaCrescente = (a, b) => {
    const trigramaA = a.trigrama.toUpperCase(); // Converte para maiúsculas para garantir uma comparação sem distinção entre maiúsculas e minúsculas
    const trigramaB = b.trigrama.toUpperCase();

    if (trigramaA < trigramaB) {
        return -1;
    }
    if (trigramaA > trigramaB) {
        return 1;
    }
    return 0;
};

const compararPorTrigramaDecrescente = (a, b) => {
  const trigramaA = a.trigrama.toUpperCase(); // Converte para maiúsculas para garantir uma comparação sem distinção entre maiúsculas e minúsculas
  const trigramaB = b.trigrama.toUpperCase();

  if (trigramaA > trigramaB) {
      return -1;
  }
  if (trigramaA < trigramaB) {
      return 1;
  }
  return 0;
};

const compararPorQuantidadeCrescente = (a, b) => {
  const quantidadeA = parseInt(a.quantidade); // Converte para inteiro para garantir uma comparação sem distinção entre maiúsculas e minúsculas
  const quantidadeB = parseInt(b.quantidade);

  if (quantidadeA < quantidadeB) {
      return -1;
  }
  if (quantidadeA > quantidadeB) {
      return 1;
  }
  return 0;
};

const compararPorQuantidadeDecrescente = (a, b) => {
  const quantidadeA = parseInt(a.quantidade); // Converte para inteiro para garantir uma comparação sem distinção entre maiúsculas e minúsculas
  const quantidadeB = parseInt(b.quantidade);

  if (quantidadeA > quantidadeB) {
      return -1;
  }
  if (quantidadeA < quantidadeB) {
      return 1;
  }
  return 0;
};

const compararPorHorasCrescente = (a, b) => {
  // Supõe que a propriedade "Horas" é uma string no formato "HH:mm"
  const horasA = a.horas.split(':').map(Number);
  const horasB = b.horas.split(':').map(Number);

  if (horasA[0] < horasB[0]) {
      return -1;
  } else if (horasA[0] > horasB[0]) {
      return 1;
  } else {
      // Se as horas são iguais, compara os minutos
      if (horasA[1] < horasB[1]) {
          return -1;
      } else if (horasA[1] > horasB[1]) {
          return 1;
      } else {
          return 0; // Horas e minutos são iguais
      }
  }
};

const compararPorHorasDecrescente = (a, b) => {
  // Supõe que a propriedade "Horas" é uma string no formato "HH:mm"
  const horasA = a.horas.split(':').map(Number);
  const horasB = b.horas.split(':').map(Number);

  if (horasA[0] > horasB[0]) {
      return -1;
  } else if (horasA[0] < horasB[0]) {
      return 1;
  } else {
      // Se as horas são iguais, compara os minutos
      if (horasA[1] > horasB[1]) {
          return -1;
      } else if (horasA[1] < horasB[1]) {
          return 1;
      } else {
          return 0; // Horas e minutos são iguais
      }
  }
};

const compararPorUltimoVooCrescente = (a, b) => {
  const ultimoVooA = a.ultimo_voo === "-" ? null : new Date(a.ultimo_voo).getTime();
  const ultimoVooB = b.ultimo_voo === "-" ? null : new Date(b.ultimo_voo).getTime();

  if (ultimoVooA === null && ultimoVooB !== null) {
      return 1;
  } else if (ultimoVooA !== null && ultimoVooB === null) {
      return -1;
  } else if (ultimoVooA === null && ultimoVooB === null) {
      return 0;
  } else {
      return ultimoVooA - ultimoVooB;
  }
};

const compararPorUltimoVooDecrescente = (a, b) => {
  const ultimoVooA = a.ultimo_voo === "-" ? null : new Date(a.ultimo_voo).getTime();
  const ultimoVooB = b.ultimo_voo === "-" ? null : new Date(b.ultimo_voo).getTime();

  if (ultimoVooA === null && ultimoVooB !== null) {
      return 1;
  } else if (ultimoVooA !== null && ultimoVooB === null) {
      return -1;
  } else if (ultimoVooA === null && ultimoVooB === null) {
      return 0;
  } else {
      return ultimoVooB - ultimoVooA;
  }
};

const compararPorDiasSemVoarCrescente = (a, b) => {
  const diasA = a.dias_sem_voar === "-" ? Infinity : parseInt(a.dias_sem_voar, 10);
  const diasB = b.dias_sem_voar === "-" ? Infinity : parseInt(b.dias_sem_voar, 10);

  return diasA - diasB;
};

const compararPorDiasSemVoarDecrescente = (a, b) => {
  const diasA = a.dias_sem_voar === "-" ? Infinity : parseInt(a.dias_sem_voar, 10);
  const diasB = b.dias_sem_voar === "-" ? Infinity : parseInt(b.dias_sem_voar, 10);

  return diasB - diasA;
};

  const handleChangeCriterio = () => {
    var dados_copy = [...dados]
    switch(criterio) {
      case 'trigrama':
        var dados_copy_ordenado = dados_copy.sort(compararPorTrigramaCrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'trigrama-up':
        var dados_copy_ordenado = dados_copy.sort(compararPorTrigramaDecrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'quantidade':
        var dados_copy_ordenado = dados_copy.sort(compararPorQuantidadeCrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'quantidade-up':
        var dados_copy_ordenado = dados_copy.sort(compararPorQuantidadeDecrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'horas':
        var dados_copy_ordenado = dados_copy.sort(compararPorHorasCrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'horas-up':
        var dados_copy_ordenado = dados_copy.sort(compararPorHorasDecrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'ultimo':
        var dados_copy_ordenado = dados_copy.sort(compararPorUltimoVooCrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'ultimo-up':
        var dados_copy_ordenado = dados_copy.sort(compararPorUltimoVooDecrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'dias':
        var dados_copy_ordenado = dados_copy.sort(compararPorDiasSemVoarCrescente)
        setDados(dados_copy_ordenado)
      break;
      case 'dias-up':
        var dados_copy_ordenado = dados_copy.sort(compararPorDiasSemVoarDecrescente)
        setDados(dados_copy_ordenado)
      break;
      
    }
  }

  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', minHeight:600 }}>
      <div style={{display: 'flex', flexDirection: 'row' }}>
      <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center', flex: 1 }}>
        <label style={{fontWeight: 'bold', marginRight: 5}}>Função a Bordo:</label>
        <select style={inputStyle} value={funcao} onChange={handleChangeFuncao}>
          <option value="">Selecione</option>
          {funcoes.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        <label style={{fontWeight: 'bold', marginLeft: 10, marginRight: 5}}>Quadrinho:</label>
        <select style={inputStyle} value={quadrinhoSelected} onChange={handleChangeQuadrinho}>
          <option value="">Selecione</option>
          {quadrinhos.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        <div style={{marginLeft: 10, cursor: 'Pointer'}} onClick={handlePesquisar} className='botao-salvar'>Pesquisar</div>
      </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row' }}>
        <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center', flex: 1 }}>
        <label style={{fontWeight: 'bold', marginLeft: 10, marginRight: 5}}>Data de Início:</label>
           <div className='input-obs'>                  
                  {dataInicioIndisp.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',  timeZone: 'UTC'})+'Z'}
            </div>
            <div className='' style={{marginLeft:5}}>
              <ReactDatePicker
              selected={dataInicioIndisp}
              timeInputLabel={dataInicioIndisp}
              onChange={(date) => {
                // Certifique-se de armazenar a hora como UTC
                if (date) {
                  const utcDate = new Date(date);
                  utcDate.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds());
                  setDataInicioIndisp(utcDate);
                } 
              }}
              customInput={<DateInput />}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="LLL"
              timeZone="Etc/UTC"
              timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
              utcOffset={0} // Defina o offset UTC para 0
              />
            </div>
            <label style={{fontWeight: 'bold', marginLeft: 10, marginRight: 5}}>Data de Término:</label>
           <div className='input-obs'>                  
                  {dataFimIndisp.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})+'Z'}
            </div>
            <div className='' style={{marginLeft:5}}>
              <ReactDatePicker
              selected={dataFimIndisp}
              timeInputLabel={dataFimIndisp}
              onChange={(date) => {
                // Certifique-se de armazenar a hora como UTC
                if (date) {
                  const utcDate = new Date(date);
                  utcDate.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds());
                  setDataFimIndisp(utcDate);
                } 
              }}
              customInput={<DateInput />}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              dateFormat="LLL"
              timeZone="Etc/UTC"
              timeZoneData={[{ value: 'Etc/UTC', label: 'Zulu (GMT 0)' }]}
              utcOffset={0} // Defina o offset UTC para 0
              />
            </div>
      </div>
      </div>
      <div style={{ marginRight: '20px', marginTop: '10px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
      <label style={{fontWeight: 'bold', marginRight: 5}}>Subprograma:</label>
        <select style={inputStyle} value={subprograma} 
        onChange={(e)=>{
          setSubprograma(e.target.value)
          if(e.target.value) {
            fetchFases(e.target.value)
          } else {
            setUsersData([])
            setFases([])
          }
        }
        }>
          <option value="">Selecione</option>
          {subprogramas.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
        <label style={{fontWeight: 'bold', marginLeft: 10, marginRight: 5}}>Fase:</label>
        <select style={inputStyle} value={fase} 
        onChange={(e)=>{
          setFase(e.target.value)
        }
        }>
          <option value="">Selecione</option>
          {fases.map(i=>{
            return (
              <option value={i.value}>{i.label}</option>
            )
          })}
        </select>
          <div style={{marginLeft: 10, cursor: 'Pointer'}} onClick={handleVerificar} className='botao-salvar'>Verificar</div>
      </div>
      <div  class="table-area">
        { !exterior ?
          <table style={{marginBottom:20, alignItems: 'left'}}>
          <tr>
            <th>
              <span>Trigrama</span>
              { criterio == 'trigrama'? <img src="https://www.1gtt.com.br/app/jogar.png" onClick={()=>{}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza.png" onClick={()=>{setCriterio('trigrama')}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} />}
              { criterio == 'trigrama-up'? <img src="https://www.1gtt.com.br/app/jogar-up.png" onClick={()=>{}} width="15px" style={{marginRight:5, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza-up.png" onClick={()=>{setCriterio('trigrama-up')}} width="15px" style={{marginRight:5, cursor: 'pointer'}} />}
            </th>
            <th>
              <spna>Quantidade</spna>
              { criterio == 'quantidade'? <img src="https://www.1gtt.com.br/app/jogar.png" onClick={()=>{}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza.png" onClick={()=>{setCriterio('quantidade')}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} />}
              { criterio == 'quantidade-up'? <img src="https://www.1gtt.com.br/app/jogar-up.png" onClick={()=>{}} width="15px" style={{marginRight:5, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza-up.png" onClick={()=>{setCriterio('quantidade-up')}} width="15px" style={{marginRight:5, cursor: 'pointer'}} />}
              </th>
            <th>
              <span>Horas</span>
              { criterio == 'horas'? <img src="https://www.1gtt.com.br/app/jogar.png" onClick={()=>{}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza.png" onClick={()=>{setCriterio('horas')}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} />}
              { criterio == 'horas-up'? <img src="https://www.1gtt.com.br/app/jogar-up.png" onClick={()=>{}} width="15px" style={{marginRight:5, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza-up.png" onClick={()=>{setCriterio('horas-up')}} width="15px" style={{marginRight:5, cursor: 'pointer'}} />}
              </th>
            <th>Situação</th>
            <th>Dias</th>
            <th>
              <span>Dias sem voar</span>
              { criterio == 'dias'? <img src="https://www.1gtt.com.br/app/jogar.png" onClick={()=>{}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza.png" onClick={()=>{setCriterio('dias')}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} />}
              { criterio == 'dias-up'? <img src="https://www.1gtt.com.br/app/jogar-up.png" onClick={()=>{}} width="15px" style={{marginRight:5, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza-up.png" onClick={()=>{setCriterio('dias-up')}} width="15px" style={{marginRight:5, cursor: 'pointer'}} />}
            </th>
            <th>
              <span>Último Voo</span>
              { criterio == 'ultimo'? <img src="https://www.1gtt.com.br/app/jogar.png" onClick={()=>{}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza.png" onClick={()=>{setCriterio('ultimo')}} width="15px" style={{marginRight:5, marginLeft: 10, cursor: 'pointer'}} />}
              { criterio == 'ultimo-up'? <img src="https://www.1gtt.com.br/app/jogar-up.png" onClick={()=>{}} width="15px" style={{marginRight:5, cursor: 'pointer'}} /> : <img src="https://www.1gtt.com.br/app/jogar-cinza-up.png" onClick={()=>{setCriterio('ultimo-up')}} width="15px" style={{marginRight:5, cursor: 'pointer'}} />}
            </th>
          </tr>
          {loading &&
                  <div  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '60%',
                    transform: 'translate(-50%, -50%)',
                  }}>
                    <LoadingSpinner black={true} width="200px" />
                  </div>
          }
            {
              dados.map(it=>{
                let index = indisponibilidades.findIndex(i=>i.Usuario.Trigrama.trigrama == it.trigrama)
                let index_pau_de_sebo = pauDeSebo.findIndex(i=>i.Trigrama == it.trigrama)
                let index_operacionalidade = operacionalidades.findIndex(i=>i.id == it.id_operacionalidade)
                let index_comissionamento = comissionamento.findIndex(i=>i.Trigrama == it.trigrama)
                if(index_pau_de_sebo >=0) {
                  var [data, horas] = pauDeSebo[index_pau_de_sebo].Ultimo_voo.split('T')
                  var [ano, mes, dia] = data.split('-')
                  var [hora, minuto] = horas.split(':')
                }

                let index_qualificacao = usersData.findIndex(i=>i == it.trigrama)
                if(index_qualificacao >=0) {
                  var index_nome_qualificacao = subprogramas.findIndex(i=>i.value == subprograma)
                  if(index_nome_qualificacao >=0) {
                    var nome_qualificacao = subprogramas[index_nome_qualificacao].label
                  } else {
                    var nome_qualificacao = ''
                  }
                }

                var situacao = 'DIÁRIA'
                if(index_comissionamento >=0) {
                  if (comissionamento[index_comissionamento]['Situação'] == 'COMISSIONADO' ) {
                    situacao = 'COMISSIONADO'
                  }
                }

                let operacionalidade = index_operacionalidade >=0 ? operacionalidades[index_operacionalidade].nome : ''

                switch (operacionalidade) {
                  case 'AL':
                    var classe = 'aluno'
                    break;
                  case 'PB':
                    var classe = 'basico'
                    break;
                  case 'PO':
                    var classe = 'operacional'
                    break;
                  case 'IN':
                    var classe = 'instrutor'
                    break;
                    case 'AG':
                      var classe = 'aluno'
                      break;
                    case 'LM':
                      var classe = 'operacional'
                      break;
                    case 'IG':
                      var classe = 'instrutor'
                      break;
                    case 'AC':
                      var classe = 'aluno'
                      break;
                    case 'MC':
                      var classe = 'operacional'
                      break;
                    case 'IC':
                      var classe = 'instrutor'
                      break;
                    case 'A3':
                      var classe = 'aluno'
                      break;
                    case '03':
                      var classe = 'operacional'
                      break;
                    case 'I3':
                      var classe = 'instrutor'
                      break;
                    case 'AF':
                      var classe = 'aluno'
                      break;
                    case 'TF':
                      var classe = 'operacional'
                      break;
                    case 'IF':
                      var classe = 'instrutor'
                      break;
                }
                return (
                  <tr>
                    <td  
                      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    >
                      <span>{it.trigrama}</span>
                      {index_operacionalidade >=0 ? <div className={'operacionalidade'+' '+classe}>{operacionalidades[index_operacionalidade].nome}</div> : null}
                      {index_qualificacao >=0 ? <div className={'operacionalidade qualificacao'}>{nome_qualificacao}</div> : null}
                      {index >=0 ? 
                      <div
                      onMouseEnter={index >= 0 ? () => handleMouseEnter(index) : null}
                      onMouseLeave={handleMouseLeave}
                      className='indisp'
                       >INDISP
                                     {caixaVisible  && indisponibilidadeUser && (it.trigrama == indisponibilidadeUser.Usuario.Trigrama.trigrama) &&  <div
                            style={{
                              position: 'absolute',
                              top: '10%',
                              left: '10',
                              background: '#000',
                              color: '#fff',
                              padding: '10px',
                              border: '1px solid black',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              zIndex: 1, // Definindo uma ordem de empilhamento maior para a div das informações
                            }}
                          > {indisponibilidadeUser.motivo.substring(0, 3) != 'Voo' && indisponibilidadeUser.motivo.substring(0, 11) != 'Sobreaviso' && <p style={{fontSize: '1vw'}}>Indisponibilidade</p>}
                          {indisponibilidadeUser.motivo.substring(0, 3) == 'Voo' && <p style={{fontSize: '1vw'}}>Voo</p>}
                          {indisponibilidadeUser.motivo.substring(0, 11) == 'Sobreaviso' && <p style={{fontSize: '1vw'}}>Sobreaviso</p>}
                            {indisponibilidadeUser.motivo.substring(0, 3) != 'Voo' && indisponibilidadeUser.motivo.substring(0, 11) != 'Sobreaviso' && <p style={{fontSize: '0.7vw'}}>Início: {indisponibilidadeUser ? new Date (indisponibilidadeUser.data_inicio).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',  timeZone: 'UTC'})+'Z' : null}</p>}
                            {indisponibilidadeUser.motivo.substring(0, 3) != 'Voo' && indisponibilidadeUser.motivo.substring(0, 11) != 'Sobreaviso' && <p style={{fontSize: '0.7vw'}}>Fim: {indisponibilidadeUser ? new Date (indisponibilidadeUser.data_fim).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',  timeZone: 'UTC'})+'Z' : null}</p>}
                            <p style={{fontSize: '1vw'}}>Motivo: {indisponibilidadeUser ? indisponibilidadeUser.motivo : null}</p>
                          </div>}
                       
                       </div> : null}
                      </td>
                    <td >{it.quantidade}</td>
                    <td>{index_pau_de_sebo >=0 ? pauDeSebo[index_pau_de_sebo].Horas : '-'}</td>
                    <td><div className={situacao == 'DIÁRIA'? 'diaria' : 'comissionamento'}>{situacao}</div></td>
                    <td>{index_comissionamento >=0 ? comissionamento[index_comissionamento]['DETOT'] : ''}</td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <span>{it.dias_sem_voar}</span>
                        {parseInt(it.dias_sem_voar) > 45 && <div style={{marginLeft: 5}} className='situacao desadaptado blink'>Desadaptado</div>}
                        {parseInt(it.dias_sem_voar) > 40 && parseInt(it.dias_sem_voar) < 45 &&  <div style={{marginLeft: 5}} className='situacao desadaptando blink'>Desadaptando</div>}
                      </div>
                      </td>
                    <td>{index_pau_de_sebo >=0 ? dia+'/'+mes+'/'+ano : '-'}</td>
                  </tr>
                )
              })
            }
          </table> : 
          <table>
            <tr>
              <th style={{width: '20% !important', textAlign: 'left'}}>Trigrama</th>
              <th>Quantidade</th>
            </tr>
            {loadingExterior &&
                  <div  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '60%',
                    transform: 'translate(-50%, -50%)',
                  }}>
                    <LoadingSpinner black={true} width="200px" />
                  </div>
          }
            {
              exteriorLista.map((it, idx)=>{
                function isLastro(missao) {
                  return missao === "LASTRO";
                }

                it.missoes.sort((a, b) => {
                  const isLastroA = isLastro(a);
                  const isLastroB = isLastro(b);
              
                  if (isLastroA && !isLastroB) {
                    return -1;
                  } else if (!isLastroA && isLastroB) {
                    return 1;
                  } else {
                    return 0;
                  }
                });
                let index = indisponibilidades.findIndex(i=>i.Usuario.Trigrama.trigrama == it.trigrama)
                let index_operacionalidade = operacionalidades.findIndex(i=>i.id == it.id_operacionalidade)
                let operacionalidade = index_operacionalidade >=0 ? operacionalidades[index_operacionalidade].nome : ''
                let index_qualificacao = usersData.findIndex(i=>i == it.trigrama)
                if(index_qualificacao >=0) {
                  var index_nome_qualificacao = subprogramas.findIndex(i=>i.value == subprograma)
                  if(index_nome_qualificacao >=0) {
                    var nome_qualificacao = subprogramas[index_nome_qualificacao].label
                  } else {
                    var nome_qualificacao = ''
                  }
                }
                switch (operacionalidade) {
                  case 'AL':
                    var classe = 'aluno'
                    break;
                  case 'PB':
                    var classe = 'basico'
                    break;
                  case 'PO':
                    var classe = 'operacional'
                    break;
                  case 'IN':
                    var classe = 'instrutor'
                    break;
                    case 'AG':
                      var classe = 'aluno'
                      break;
                    case 'LM':
                      var classe = 'operacional'
                      break;
                    case 'IG':
                      var classe = 'instrutor'
                      break;
                    case 'AC':
                      var classe = 'aluno'
                      break;
                    case 'MC':
                      var classe = 'operacional'
                      break;
                    case 'IC':
                      var classe = 'instrutor'
                      break;
                    case 'A3':
                      var classe = 'aluno'
                      break;
                    case '03':
                      var classe = 'operacional'
                      break;
                    case 'I3':
                      var classe = 'instrutor'
                      break;
                    case 'AF':
                      var classe = 'aluno'
                      break;
                    case 'TF':
                      var classe = 'operacional'
                      break;
                    case 'IF':
                      var classe = 'instrutor'
                      break;
                }
                return (
                  <tr>
                    <td style={{ textAlign: 'left', position: 'relative'}}
                    ><div style={{display: 'flex', alignItems: 'center'}}>
                      <img src="https://www.1gtt.com.br/fast-forward.png" onClick={()=>handleChangeIndex(idx)} width="20px" style={{marginRight:5}} />
                     <span>{it.trigrama}</span>
                     {index_operacionalidade >=0 ? <div className={'operacionalidade'+' '+classe}>{operacionalidades[index_operacionalidade].nome}</div> : null}
                     {index_qualificacao >=0 ? <div className={'operacionalidade qualificacao'}>{nome_qualificacao}</div> : null}
                     {index >=0 ? 
                      <div
                      onMouseEnter={index >= 0 ? () => handleMouseEnter(index) : null}
                      onMouseLeave={handleMouseLeave}
                      className='indisp'
                       >INDISP
                                     {caixaVisible  && indisponibilidadeUser && (it.trigrama == indisponibilidadeUser.Usuario.Trigrama.trigrama) &&  <div
                            style={{
                              position: 'absolute',
                              top: '10%',
                              left: '10',
                              background: '#000',
                              color: '#fff',
                              padding: '10px',
                              border: '1px solid black',
                              display: 'flex',
                              width: '200px !important',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              zIndex: 1, // Definindo uma ordem de empilhamento maior para a div das informações
                            }}
                          > {indisponibilidadeUser.motivo.substring(0, 3) != 'Voo' && indisponibilidadeUser.motivo.substring(0, 11) != 'Sobreaviso' && <p style={{fontSize: '1vw'}}>Indisponibilidade</p>}
                          {indisponibilidadeUser.motivo.substring(0, 3) == 'Voo' && <p style={{fontSize: '1vw'}}>Voo</p>}
                          {indisponibilidadeUser.motivo.substring(0, 11) == 'Sobreaviso' && <p style={{fontSize: '1vw'}}>Sobreaviso</p>}
                            {indisponibilidadeUser.motivo.substring(0, 3) != 'Voo' && indisponibilidadeUser.motivo.substring(0, 11) != 'Sobreaviso' && <p style={{fontSize: '0.7vw'}}>Início: {indisponibilidadeUser ? new Date (indisponibilidadeUser.data_inicio).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',  timeZone: 'UTC'})+'Z' : null}</p>}
                            {indisponibilidadeUser.motivo.substring(0, 3) != 'Voo' && indisponibilidadeUser.motivo.substring(0, 11) != 'Sobreaviso' && <p style={{fontSize: '0.7vw'}}>Fim: {indisponibilidadeUser ? new Date (indisponibilidadeUser.data_fim).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric',  timeZone: 'UTC'})+'Z' : null}</p>}
                            <p style={{fontSize: '0.7vw'}}>Motivo: {indisponibilidadeUser ? indisponibilidadeUser.motivo : null}</p>
                          </div>}
                       
                       </div> : null}
                       </div>
                    </td>
                    <td>
                      <div className='area-item-exterior'>
                      {it.missoes.map((item, index)=>{
                        if (item.toUpperCase() == 'LASTRO') {
                          if(idx == indexSelected) {
                            var color = '#fff'
                          } else {
                            var color = '#f1ad24'
                          }
                        } else {
                          if(idx == indexSelected) { 
                            var color = '#fff'
                          } else {
                            var color = '#000'
                          }

                        }
                        return (
                          <div className={item.toUpperCase() == 'LASTRO' ? 'item-missao-exterior-lastro' : 'item-missao-exterior'}>
                              <span style={{color}}>{idx == indexSelected ? item : '1'}</span>
                          </div>
                        )
                      })}
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </table>
        }
     
      </div>
      </CCard>
    </>
  )
}

export default ListaQuadrinhos
