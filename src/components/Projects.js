import React from 'react'
import Navbar from "./Navbar";
import './App.css';


function Projects(){
	return(
		<div>
			<Navbar />
      <div className="title">
        <h1 className="title-content bold">My Projects!</h1>
        <br></br>
        <span className="title-content title-third">Bellow you can find some projects I have worked on:</span>
        <span className="title-content title-fourth"></span>
        <span className="title-content title-fifth"></span>
      </div>
		</div>
	)
}

export default Projects;