import React from 'react';
import Navbar from "./Navbar";
import './App.css';
import './Home.css';

function Home() {
  return (
    
    <div>
      <Navbar />
      
      <div className="title home">
        <h1 className='spacing'>Welcome to my <span class="type-animation animating">Portfolio</span></h1>
      </div>
    </div>
    
  );
}

export default Home;