import React, { useEffect, useState, useRef } from 'react'
import { usePDF } from 'react-to-pdf';
import styles from './styles.css'
import {
  CButton,
  CCard,

} from '@coreui/react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useApi from 'src/services/Api'
import LoadingSpinner from 'src/components/Loading'
import { useLocation } from 'react-router-dom';

const Relatorio = ({match}) => {
  let Api = useApi()
  const [base64, setBase64] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false); // Novo estado

  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  const getEtapa = async () => {
    let res = await Api.getEtapaById(9474)

    if(!res.error) {
      setBase64(res.data.assinatura)
      setDataLoaded(true); // Marcar os dados como carregados
    }

  }

  useEffect(()=>{
    getEtapa()
  },[])


  return (
    <div>
    <button onClick={() => toPDF()}>Download PDF</button>
    <div ref={targetRef}>
    <img src={`data:image/png;base64,${base64}`} alt="Base64 Image" />
    </div>

 </div>
  )
}

export default Relatorio
