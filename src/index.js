import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Activities from './Activities.js';
import Home from './Home.js';
import Routines from './Routines.js';
import Register from './Register.js';
import Login from './Login.js';

const App = () => {
    
    return (
        <React.Fragment>
            <Routes>
                <Route path='/api' element={<Home />}></Route>
                <Route path='/api/users/register' element={<Register />}></Route>
                <Route path='/api/users/login' element={<Login />}></Route>
                <Route path='/api/activities' element={<Activities />}></Route>
                <Route path='/api/routines' element={<Routines />}></Route>
            </Routes> 
           
        </React.Fragment>
        
    )
}

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
