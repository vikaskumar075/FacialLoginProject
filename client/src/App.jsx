import React from "react";
import Signup from "./components/Signup";
import "../src/App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
