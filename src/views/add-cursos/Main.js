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
  const [loading, setLoading] = useState(true)
  const [add, setAdd] = useState(false)
  const Api = useApi()

  const getCursos = async () => {
    setLoading(true)
      let res = await Api.getCursos()
      if(!res.error) {
        setCursos(res.data)
      }
      setLoading(false)
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

  useEffect(()=>{
    getCursos()},[])



  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>

    </div>
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', marginLeft:10, marginRight:10 }}>
    {
      loading &&
      <LoadingSpinner black={true} width='200px'/>
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
              <img onClick={()=>{
                setCursoEdit(i.id)
                setCursoSigla(i.sigla)
                setCursoDescricao(i.descricao)
                setCursoGestor(i.gestor)
              }} src="https://www.1gtt.com.br/app/pen.png" width="20px" height="20px"/>
            }

          </div>
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
