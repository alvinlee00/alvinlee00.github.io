import React from 'react';
import Navbar from "./Navbar";
import './App.css';

function Home() {
  return (
    
    <div>
      <Navbar />
      
      <span className="title">
        <span className="title-content">Portfolio</span>
        <span className="title-content title-second">By Alvin Lee</span>
        <span className="title-content title-third">An Aspiring Software Engineer</span>
        <span className="title-content title-fourth">Work In Progress</span>
        <span className="one">.</span>
        <span className="two">.</span>
        <span className="three">.</span>
      </span>
      
    </div>
    
  );
}

export default Home;