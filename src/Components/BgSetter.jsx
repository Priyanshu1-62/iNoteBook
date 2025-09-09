import React, { useEffect } from 'react';
import { useLocation } from "react-router";

function BgSetter() {
  const location=useLocation();
  useEffect(()=>{
    if(location.pathname=='/' || location.pathname=='/auth') document.body.className="bg-[url(./assets/bg_images/bg-img2-sea-light.jpg)] bg-cover bg-no-repeat bg-fixed";
    else document.body.className="bg-[#edede9] dark:bg-[#0d1b2a]";
  }, [location]);
  return (
    <div></div>
  )
}

export default BgSetter