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
    <div className="relative h-28 text-black dark:text-white bg-[#5e548e] dark:bg-[#50467d] mx-3 my-3 rounded-bl-xl transition-all duration-300 ease-in">
      <div className="absolute top-2 -right-2 h-24 w-full flex items-center justify-between px-3 bg-[#e0b1cb] dark:bg-[#0d1b2a] border-2 border-gray-600 rounded-bl-xl">
        <p className="w-full mr-2 truncate">{note.title}</p>
        <button className="px-3 py-2 text-white bg-pink-700 hover:bg-[#922b2d] border-1 border-gray-700 rounded-full shadow-xl/30 hover:cursor-pointer transition-all ease-in-out duration-200" onClick={()=>{handleOpenMyNote(note._id)}}>Go</button>
      </div>
    </div>
    </>
  )
}

export default NoteItem