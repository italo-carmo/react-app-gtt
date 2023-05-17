import React from 'react'
import styles from './styles.css'
import {
  CCard,

} from '@coreui/react'


const Dashboard = () => {

  let semana = ['17/05','18/05','19/05','20/05','21/05','22/05','23/05']

  let aviao1 = ['12Z AN BR AN', '12Z AN BR AN', '12Z AN BR AN', '12Z AN BR AN', '', '12Z AN BR AN', '']
  let aviao2 = ['12Z AN GL AN', '-', '12Z AN BGLR AN', '12Z AN BR AN', '-', '12Z AN GL AN', '-']
  let aviao3 = ['12Z AN CG AN', '', '', '12Z AN CG AN', '', '', '']
  let aviao4 = ['', '12Z AN BR AN', '', '', '', '', '']


  return (
    <>
      <CCard className="mb-6" style={{flexDirection: 'row'}}>
         <div className='tabela'>
            <div className='aviao-item-topo'>Avião</div>
            <div className='aviao-item'>FAB 2854</div>
            <div className='aviao-item'>FAB 2855</div>
            <div className='aviao-item'>FAB 2856</div>
            <div className='aviao-item'>FAB 2857</div>
         </div>
         <div style={{display: 'flex', flexDirection:'column', width:'100%'}}>
          <div className='topo'>
            {semana.map(item=>{
              return <div className='dia'>{item}</div>
            })}
          </div>
          <div className='missoes'>
            <div className='missao-item'>
                {aviao1.map(item=>{
                  return <div>{item}</div>
                })}
            </div>
            <div className='missao-item'>
            {aviao2.map((item, index)=>{
              if(item == '-') {
                return <div>{index.toString()}</div>
              } else {
                <div>{item}</div>
              }
                })}
            </div>
            <div className='missao-item'>
            {aviao3.map(item=>{
                  return <div>{item}</div>
                })}
            </div>
            <div className='missao-item'>
            {aviao4.map(item=>{
                  return <div>{item}</div>
                })}
            </div>
            </div>
         </div>
      </CCard>


     
    </>
  )
}

export default Dashboard
