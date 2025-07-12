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
    <div className={`w-full ${bgColour[alertInfo.colour]} mt-12 h-12 flex items-center transition-opacity duration-150 ease-in-out opacity-${70*(alertInfo.heading !== "")}`}>
      <div className="ml-6">
        <h3 className="font-bold inline">{`${alertInfo.heading} :`}</h3>
        <h3 className="inline">{`\u00A0 ${alertInfo.message}`}</h3>
      </div>
    </div>
  )
}

export default Alert