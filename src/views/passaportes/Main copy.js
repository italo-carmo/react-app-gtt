import React, { useEffect, useState, useRef, DatePicker, DateInput } from 'react'
import styles from './styles.css'
import {
  CButton,
  CCard,
} from '@coreui/react'
import useApi from 'src/services/Api'
import LoadingSpinner from 'src/components/Loading'

const AddCursos = () => {
  const Api = useApi()

  useEffect(()=>{
    },
    [])


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'column', overflowX: 'auto', maxHeight:700 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>

    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', marginLeft:10, marginRight:10 }}>

    </div>
      </CCard>
     
    </>
  )
}

export default AddCursos
