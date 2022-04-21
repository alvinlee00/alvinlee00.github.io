import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import './App.css';



function App() {
  return (
    
    <div>
      <Navbar />
      <span className="title">
        <span className="title-content">Portfolio</span>
        <span className="title-content title-second">by alvin lee</span>
        <span className="title-content title-third">an aspiring software engineer</span>
        <span className="title-content title-fourth">work in progress</span>
        <span className="one">.</span>
        <span className="two">.</span>
        <span className="three">.</span>
      </span>
      
    </div>
    
  );
}

export default App;
