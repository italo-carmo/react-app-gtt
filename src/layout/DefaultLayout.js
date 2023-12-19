import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useApi from 'src/services/Api'
import {useNavigate} from 'react-router-dom' 
import LoadingSpinner from 'src/components/Loading'

const DefaultLayout = () => {

  const Api = useApi()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const checkToken = async () => {
    setLoading(true)
    if(Api.getToken()) {
        let res = await Api.validateToken()
        if(res.error) {
          navigate('/login')
          return
        }
        setLoading(false)
    } else {
      navigate('/login')
    }
  }

  useEffect(()=>{
    checkToken()
  },[])

  return (
    <>
        {loading ?  
         <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <LoadingSpinner width="250px" black={true} />
        </div> 
        :
        <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
      }
    </>
  )
}

export default DefaultLayout
