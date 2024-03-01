import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';


function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
              <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
              </Routes>
            
        </BrowserRouter>
       
    </div>
  );
}

export default App;