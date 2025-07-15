import React, { useContext } from 'react'
import AlertContext from '../Contexts/alertcontext'

function Alert(props) {
  const {alertInfo}=useContext(AlertContext);
  const bgColour={
    red: "bg-red-400",
    green: "bg-green-400",
    yellow: "bg-yellow-400"
  };
  return (
    <div className={`fixed top-12 z-50 h-12 w-full ${bgColour[alertInfo.colour]} flex items-center transition-opacity duration-150 ease-in-out opacity-${100*(alertInfo.heading !== "")}`}>
      <div className="ml-6">
        <h3 className="font-bold inline">{`${alertInfo.heading} :`}</h3>
        <h3 className="inline">{`\u00A0 ${alertInfo.message}`}</h3>
      </div>
    </div>
  )
}

export default Alert