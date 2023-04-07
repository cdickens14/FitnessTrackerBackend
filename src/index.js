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
            <Header />
            {/* <Routes>
                <Route path='/api/activities' element={<Activities />}></Route>
                <Route path='/api/routines' element={<Routines />}></Route>
            </Routes> */}
            <Activities />
            <Routines />
           
        </React.Fragment>
        
    )
}

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
