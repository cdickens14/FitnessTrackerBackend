import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import { HashRouter, Routes, Route } from "react-router-dom";
import Activities from "./Activities.js";
import Header from "./Header.js";
import Routines from "./Routines.js";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/api/activities" element={<Activities />}></Route>
        <Route path="/api/routines" element={<Routines />}></Route>
      </Routes>
      <Activities />
      <Routines />
    </React.Fragment>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
