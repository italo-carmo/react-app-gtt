import React, { useEffect, useState, useRef, DatePicker, DateInput } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,
} from '@coreui/react'
import useApi from 'src/services/Api'
import LoadingSpinner from 'src/components/Loading'

const AddCursos = () => {
  const [cursos,setCursos] = useState([])
  const [cursoEdit, setCursoEdit] = useState(0)
  const [cursoSigla, setCursoSigla] = useState('')
  const [cursoDescricao, setCursoDescricao] = useState('')
  const [cursoGestor, setCursoGestor] = useState('')
  const [cursoSiglaAdd, setCursoSiglaAdd] = useState('')
  const [cursoDescricaoAdd, setCursoDescricaoAdd] = useState('')
  const [cursoGestorAdd, setCursoGestorAdd] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingCurso, setLoadingCurso] = useState(false)
  const [add, setAdd] = useState(false)
  const [verCurso, setVerCurso] = useState(false)
  const [idCursoVerMilitares, setIdCursoVerMilitares] = useState(0)
  const [militaresCurso, setMilitaresCurso] = useState([])
  const [users, setUsers] = useState([])
  const [militarSelected,setMilitarSelected] = useState('')

  const Api = useApi()

  const getCursos = async () => {
    setLoading(true)
      let res = await Api.getCursos()
      if(!res.error) {
        setCursos(res.data)
      }
      setLoading(false)
  }

  const inputStyle = {
    borderRadius: '10px',
    border: '1px solid #000',
    marginRight: '10px'
  };


  const getUsers = async () => {
      let res = await Api.getUsers()
      if(!res.error) {
        setUsers(res.data)
      }
  }

  const getCursosUsuarios = async (id_cursos) => {
    setLoadingCurso(true)
    let res = await Api.getCursosUsuarios({id_cursos,nome: 'todos',filter_type: 'yes'})
      if(!res.error) {
        setMilitaresCurso(res.data)
      }
      setLoadingCurso(false)
  }

  const excluirMilitar = async (item) => {
    const confirmacao = window.confirm('Deseja mesmo excluir o '+item.item+' deste curso?')
    if (confirmacao) {
      let res = await Api.deleteCursosUsuario(idCursoVerMilitares,{id_user: item.id})
      if(res.error) {
        alert(res.error)
        return
      } else {
        alert(res.msg)
        getCursosUsuarios(idCursoVerMilitares)
      }
    }
  }

  const handleSalvar = async () => {
    if (cursoDescricao == '' || cursoSigla == '' || cursoGestor == '') {
      alert('Todos os campos são obrigatórios')
      return
    }
    let res = await Api.updateCurso(cursoEdit, {descricao: cursoDescricao, sigla: cursoSigla, gestor: cursoGestor})
    if (res.error) {
      alert(res.error)
    } else {
      setCursoEdit(0)
      alert(res.msg)
    }
    getCursos()
  }

  const handleAdd = async () => {
    if (cursoDescricaoAdd == '' || cursoSiglaAdd == '' || cursoGestorAdd == '') {
      alert('Todos os campos são obrigatórios')
      return
    }
    let res = await Api.createCurso({descricao: cursoDescricaoAdd, sigla: cursoSiglaAdd, gestor: cursoGestorAdd})
    if (res.error) {
      alert(res.error)
    } else {
      setAdd(false)
      setCursoSiglaAdd('')
      setCursoDescricaoAdd('')
      setCursoGestorAdd('')
      alert(res.msg)
      getCursos()
    }
  }

  const handleAdicionarMilitar = async () => {
    if(militarSelected == '') {
      alert('Selecione o militar a ser adicionado')
      return
    }
    let index = militaresCurso.findIndex(i=>i.id == militarSelected)
    if(index >=0) {
      alert('Esse militar já possui esse curso!')
      return
    }
    let res = await Api.createCursosUsuarios({id_cursos: idCursoVerMilitares, id_user: militarSelected})
    if(res.error) {
      alert(res.error)
      return
    } else {
      alert(res.msg)
      getCursosUsuarios(idCursoVerMilitares)
    }
  }

  const handleChangeMilitarSelected = (e) => {
    setMilitarSelected(e.target.value)
  }

  useEffect(()=>{
    getCursos()
    getUsers()
  },[])



  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>

    </div>
    <div style={{ display: 'flex', height:'100%', flexDirection: 'column', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
    {
      loading &&
      <div><LoadingSpinner black={true} width='200px'/></div>
    }
    <div>
    <div className='add-curso-div'>
      {add && <div className='curso-div'>
        <span>
                <span style={{fontWeight: 'bold'}}>Sigla:</span> 
                  <input value={cursoSiglaAdd} onChange={(e)=>setCursoSiglaAdd(e.target.value)}/>
                <span style={{fontWeight: 'bold'}}>Descrição:</span> 
                <input value={cursoDescricaoAdd} onChange={(e)=>setCursoDescricaoAdd(e.target.value)}/> 
                <span style={{fontWeight: 'bold'}}>Gestor:</span> 
                <input value={cursoGestorAdd} onChange={(e)=>setCursoGestorAdd(e.target.value)}/> 
        </span>
      </div>}
      <div className='buttons'>
        {add ?
        <div style={{width: '100%', display: 'flex', flexDirection:'column', alignItems: 'flex-end'}}>
          <button className='excluir' onClick={()=>setAdd(false)}>Cancelar</button>
          <button className='salvar' onClick={handleAdd}>Criar</button>
          </div> :
        <img onClick={()=>setAdd(!add)} src='https://www.1gtt.com.br/app/add.png' width='30px' height='30px' />
      }
      </div>
      </div>
    </div>
    {
    cursos.map(i=>{
      return (
        <div className='curso'>
          <div className='curso-topo'>
          <div className='curso-div'>
            <span>
              <span style={{fontWeight: 'bold'}}>Sigla:</span> 
              {i.id == cursoEdit ? 
              <input value={cursoSigla} onChange={(e)=>setCursoSigla(e.target.value)}/> :
              <span style={{marginLeft:5}}>{i.sigla}</span>
              }
            </span>
            <span>
              <span style={{fontWeight: 'bold'}}>Descrição:</span> 
              {i.id == cursoEdit ? 
              <input value={cursoDescricao} onChange={(e)=>setCursoDescricao(e.target.value)} /> :
              <span style={{marginLeft:5}}>{i.descricao}</span>
              }
            </span>
            <span>
              <span style={{fontWeight: 'bold'}}>Gestor:</span> 
              {i.id == cursoEdit ? 
              <input value={cursoGestor} onChange={(e)=>setCursoGestor(e.target.value)}/> :
              <span style={{marginLeft:5}}>{i.gestor}</span>
              }
            </span>
          </div>
          <div className='buttons'>
            {
              i.id == cursoEdit ?
              <>
                <button className='excluir' onClick={()=>setCursoEdit(0)}>Cancelar</button>
                <button className='salvar' onClick={handleSalvar}>Salvar</button>
              </> :
              <>
              <img onClick={()=>{
                setCursoEdit(i.id)
                setCursoSigla(i.sigla)
                setCursoDescricao(i.descricao)
                setCursoGestor(i.gestor)
              }} src="https://www.1gtt.com.br/app/pen.png" width="20px" height="20px"/>
              {
                idCursoVerMilitares == i.id ?
                <img onClick={()=>{
                  setIdCursoVerMilitares(0)
                  setMilitaresCurso([])
                }} src="https://www.1gtt.com.br/down.png" style={{marginTop:10, cursor: 'pointer'}} width="20px" height="20px"/> :
                <img onClick={()=>{
                  setIdCursoVerMilitares(i.id)
                  getCursosUsuarios(i.id)
                }} src="https://www.1gtt.com.br/up.png" style={{marginTop:10, cursor: 'pointer'}} width="20px" height="20px"/>
              }
              
              </>
            }

          </div>
        </div>
        {idCursoVerMilitares == i.id &&
        <div className='cursos-bottom'>
           {loadingCurso && <div><LoadingSpinner black={true} width='100px'/></div>}
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <select style={inputStyle} value={militarSelected} onChange={handleChangeMilitarSelected}>
                  <option value="">Selecione</option>
                  {users.map(i=>{
                    return (
                      <option value={i.id}>{i.Posto.nome+' '+i.nome_guerra}</option>
                    )
                  })}
            </select>
            <button className='salvar-militar' onClick={handleAdicionarMilitar}>Adicionar Militar</button>
          </div>
          {militaresCurso.map(i=>{
            return  (
              <span className='item-curso'>
                <span>{i.item}</span>
                <button className='excluir-militar' onClick={()=>excluirMilitar(i)}>Excluir</button>
              </span>
            )
          })}
        </div>}
        </div>
      )
    })
    }
    </div>
      </CCard>

    </>
  )
}

export default AddCursos
