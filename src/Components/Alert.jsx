import React, { useContext } from 'react'
import AlertContext from '../Contexts/alertcontext'

function Alert(props) {
  const {alertInfo}=useContext(AlertContext);
  const bgColour={
    red: "bg-[#ff758f]", 
    green: "bg-[#06d6a0]",
    yellow: "bg-[#ffbe0b]"
  };
  return (
    <div className={`fixed top-14 z-50 h-12 w-full ${bgColour[alertInfo.colour]} flex items-center transition-opacity duration-150 ease-in-out opacity-${100*(alertInfo.heading !== "")}`}>
      <div className="ml-6">
        <h3 className="font-bold inline">{`${alertInfo.heading} :`}</h3>
        <h3 className="inline">{`\u00A0 ${alertInfo.message}`}</h3>
      </div>
    </div>
  )
}

export default Alert