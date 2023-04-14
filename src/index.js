import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Activities from './Activities.js';
import Home from './Home.js';
import Routines from './Routines.js';
import Register from './Register.js';
import Login from './Login.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logOut = (token) => {
    setIsLoggedIn === false;
    window.localStorage.removeItem('token', `${token}`);
  }

  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn({...isLoggedIn, token: token });
  //   }
  // }, []);

    return (
        <React.Fragment>

            
            
            <Routes>
                <Route path='/api' element={<Home />}></Route>
                <Route path='/api/users/register' element={<Register />}></Route>
                <Route path='/api/users/login' element={<Login isLoggedin={isLoggedIn } setIsLogged={setIsLoggedIn}/>}></Route>
                <Route path='/api/activities' element={<Activities />}></Route>
                <Route path='/api/routines' element={<Routines />}></Route>
            </Routes> 

            {
                isLoggedIn === true ?
                <button onClick={() => logOut()}>Logout</button> : null
            }
          
        </React.Fragment>
        
    )
}

const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
