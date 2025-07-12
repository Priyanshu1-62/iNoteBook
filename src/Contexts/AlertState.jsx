import AlertContext from "./alertcontext";
import React, { useState } from 'react'

function AlertState(props) {
  const [alertInfo, setalertInfo]=useState({ heading: "", message: "", colour: "" });
  const handleAlert = (data)=>{
    setalertInfo(data);
    setTimeout(()=>{
      setalertInfo({ heading: "", message: "", colour: "" });
    }, 2000);
  }
  return (
    <AlertContext.Provider value={{alertInfo, handleAlert}}>
        {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState