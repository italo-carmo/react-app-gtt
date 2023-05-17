import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useApi from 'src/services/Api'
import {useNavigate} from 'react-router-dom' 

const DefaultLayout = () => {

  const Api = useApi()
  const navigate = useNavigate()

  const checkToken = async () => {
    if(Api.getToken()) {
        let res = await Api.validateToken()
        if(res.error) {
          navigate('/login')
          return
        }
    } else {
      navigate('/login')
    }
  }

  useEffect(()=>{
    checkToken()
  },[])

  return (
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
  )
}

export default DefaultLayout
