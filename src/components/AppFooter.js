import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div style={{display: 'flex', justifyContent: 'center', width:'100%'}}>
        <span  className="ms-1">1º GTT - 2023</span>
      </div>

    </CFooter>
  )
}

export default React.memo(AppFooter)
