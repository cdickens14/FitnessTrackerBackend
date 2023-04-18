import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Activities from "./Activities.js";
import Home from "./Home.js";
import Routines from "./Routines.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Header from "./Header.js";
import MyRoutines from "./MyRoutines.js";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logOut = (token) => {
    setIsLoggedIn(false);
    window.localStorage.removeItem("token", `${token}`);
  };

  return (
    <React.Fragment>
      <Header />

      <Routes>
        <Route path="/api" element={<Home isLoggedIn={isLoggedIn} />}></Route>
        <Route
          path="/api/users/register"
          element={
            <Register setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        ></Route>
        <Route
          path="/api/users/login"
          element={
            <Login isLoggedin={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        ></Route>
        <Route
          path="/api/activities"
          element={<Activities isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route
          path="/api/routines"
          element={<Routines isLoggedIn={isLoggedIn} />}
        ></Route>
        <Route path="/api/users/me" element={<MyRoutines />}></Route>
      </Routes>

      {isLoggedIn === true ? (
        <button onClick={() => logOut()}>Logout</button>
      ) : null}
    </React.Fragment>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
