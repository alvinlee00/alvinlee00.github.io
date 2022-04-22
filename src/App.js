import React from 'react';
import './App.css';
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import  { Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/Contact" element={<Contact />}/>
      </Routes>      
      
    </div>
    
  );
}

export default App;
