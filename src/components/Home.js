import React from 'react';
import Navbar from "./Navbar";
import './App.css';

function Home() {
  return (
    
    <div>
      <Navbar />
      
      <div className="title">
        <h1 className="title-content bold">Welcome!</h1>
        <br></br>
        <span className="title-content title-third">My name is Alvin Lee</span>
        <span className="title-content title-fourth">Computer Science Enthusiast</span>
        <span className="title-content title-fifth">Work In Progress</span>
        <span className="one">.</span>
        <span className="two">.</span>
        <span className="three">.</span>
      </div>
      
    </div>
    
  );
}

export default Home;