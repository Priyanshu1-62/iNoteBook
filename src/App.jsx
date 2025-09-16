import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from './Components/Landing';
import Authorize from './Components/Authorize';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/NoteState';
import AuthState from './Contexts/AuthState';
import AlertState from './Contexts/AlertState';
import BgSetter from './Components/BgSetter';
import MyNote from './Components/MyNote';

function App() {
  return (
    <>
    <BrowserRouter>
      <AlertState>
        <AuthState>
          <NoteState>
            <BgSetter/>
            <Routes>
              <Route path='/' element={<Landing/>} />
              <Route path='/auth' element={<Authorize/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/feedback' element={<About/>} />
              <Route path='/notes/:id' element={<MyNote/>} />
            </Routes>
          </NoteState>
        </AuthState>
      </AlertState>
    </BrowserRouter>
    </>
  )
}

export default App