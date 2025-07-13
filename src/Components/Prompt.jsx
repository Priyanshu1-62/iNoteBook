import React from 'react'

function Prompt(props) {
  const {setShowPrompt, setDeletePrompt}=props;
  const handleYes = ()=>{
    setDeletePrompt(true);
    setShowPrompt(false);
  }
  const handleNo = ()=>{
    setShowPrompt(false);
  }
  return (
    <>
    <div className="fixed top-0 h-lvh w-lvw z-10 flex justify-center items-center">
        <div className="w-fit h-fit px-2 py-2 bg-white border-1 border-stone-700 dark:border-stone-300">
            <div className="flex justify-center items-center h-28 w-72">
                <h3 className="text-lg">Are you sure to delete it?</h3>
            </div>
            <div className="flex flex-row-reverse mx-1">
                <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-md py-1 px-7 ml-3" onClick={handleYes}>Yes</button>
                <button className="bg-stone-600 hover:bg-stone-700 active:bg-stone-800 text-white rounded-md py-1 px-7" onClick={handleNo}>No</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Prompt