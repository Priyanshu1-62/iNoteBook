import React from 'react'
import { HashRouter, Routes, Route } from "react-router";
import Navbar from './Components/Navbar'
import Landing from './Components/Landing';
import Authorize from './Components/Authorize';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Contexts/NoteState';
import AuthState from './Contexts/AuthState';
import AlertState from './Contexts/AlertState';
import BgSetter from './Components/BgSetter';

function App() {
  return (
    <>
    <HashRouter>
      <AlertState>
        <AuthState>
          <NoteState>
            <BgSetter/>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Landing/>} />
              <Route path='/auth' element={<Authorize/>} />
              <Route path='/home' element={<Home/>} />
              <Route path='/about' element={<About/>} />
            </Routes>
          </NoteState>
        </AuthState>
      </AlertState>
    </HashRouter>
    </>
  )
}

export default App