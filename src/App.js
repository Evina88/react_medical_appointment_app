import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import Notification from './Components/Notification/Notification';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Notification>
       
                <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="/notification" element={<Notification/>}/>
                </Routes>
            </Notification>    
        </BrowserRouter>
       
    </div>
  );
}

export default App;