import React, { useContext } from 'react'
import { Edit, Trash2 } from 'lucide-react'

function NoteItem(props) {
  const {note, handleOpenMyNote}=props;
  const getDate = (str)=>{
    const date=new Date(str);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }
  return (
    <>
    {/* <div className="bg-[#b8ceba] dark:bg-[#1c273b] mx-3 my-3 border-2 border-b-gray-600 rounded-lg px-2 py-2 h-fit">
      <div className="flex justify-between items-center w-full mb-2 mx-1">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold truncate text-gray-700 dark:text-amber-50 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800">{note.title}</h2>
        <div className="flex pr-2 py-2 w-fit">
          <Edit className="text-blue-600 dark:text-blue-300 mr-4 cursor-pointer" onClick={()=>{handleupdateNote(note._id, note)}}/>
          <Trash2 className="text-red-600 dark:text-red-300 cursor-pointer" onClick={()=>{handleDeleteNote(note._id)}}/>
        </div>
      </div>
      <div className="bg-white dark:bg-[#000814] text-black dark:text-amber-50 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800 h-fit max-h-64 overflow-y-auto break-words whitespace-pre-wrap">
        <h3 className="mx-1 my-1">
          {note.description}
        </h3>
      </div>
      <div className="text-sm text-black dark:text-amber-50 caret-pink-600 selection:bg-pink-300 dark:selection:bg-pink-800 font-bold mt-2">
        {getDate(note.date?note.date:"2025-06-05T06:56:47.578+00:00")}
      </div>
    </div> */}
    <div className="relative h-28 bg-[#b9fbc0] dark:bg-[#1c273b] mx-3 my-3">
      <div className="absolute top-2 -right-2 h-24 w-full flex items-center bg-[#b8ceba] border-2 border-gray-200">
        <p>Check</p>
        <button onClick={()=>{handleOpenMyNote(note._id)}}>Go</button>
      </div>
    </div>
    </>
  )
}

export default NoteItem