import React, { useEffect } from "react";
import {Navigate} from 'react-router-dom'


export default function LoadingSpinner({black = null, width = '40px'}) {

  useEffect(()=>{
    localStorage.setItem('token', '')

  },[])

  return (
    <>
        <Navigate to="/login"/>
    </>
  );
}