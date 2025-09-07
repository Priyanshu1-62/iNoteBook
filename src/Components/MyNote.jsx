import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import Navbar from './Navbar';

function MyNote() {
    const { id }=useParams();
    const [content, setContent]=useState("description");
    const [noteData, setNoteData]=useState({
        "title": "Dear Sunshine",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "tag": ["Sunflower"],
        "attachment": [
            {
                "fileType": "audio",
                "url": "<link>"
            },
            {
                "fileType": "image",
                "url": "<link>"
            }
        ]
    });
    const fetchData = () => {

    }
    return (
        <>
        <Navbar />
        <div className="flex mt-24 px-5">
            <h2 className="text-3xl font-bold text-gray-700">{noteData.title}</h2>
        </div>
        <div className=" mt-6 px-5">
            <div className="flex">
                <h4 className={`py-1 pr-4 border-slate-800 ${content==="description" ? "bg-white border-t-2 border-x-2" : ""}`}>Description</h4>
                <h4 className={`py-1 px-4 border-slate-800 ${content==="tags" ? "bg-white border-t-2 border-x-2" : ""}`}>Tags</h4>
                <h4 className={`py-1 px-4 border-slate-800 ${content==="audio" ? "bg-white border-t-2 border-x-2" : ""}`}>Audio</h4>
                <h4 className={`py-1 px-4 border-slate-800 ${content==="images" ? "bg-white border-t-2 border-x-2" : ""}`}>Images</h4>
            </div>
            <div className="h-[64vh] bg-white">
                {content==="description" && <div className="px-3 py-3 overflow-auto">
                    <p>{noteData.description}</p>
                </div>}
                {content==="tags" && <div>
                </div>}
                {content==="audio" && <div>
                </div>}
                {content==="images" && <div>
                </div>}
            </div>
        </div>
        </>
    )
}

export default MyNote