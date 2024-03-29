import React from 'react'
import Navbar from "./Navbar";
import './App.css';
import { Link } from 'react-router-dom';


function Projects(){
	return(
		<div>
			<Navbar />
      <div className="title">
        <h1 className="title-content bold">My Projects!</h1>
        <br></br>
        <span className="title-content title-third">Bellow you can find some projects I have worked on:</span>
        <span className="title-content title-fourth"><Link to='/MLBlogs' target='_self'>Machine Learning Blogs</Link></span>
        <span className="title-content title-fourth"><Link to='/AlgebraBlogs' target='_self'>Abstract Algebra Blogs</Link></span>
        <span className="title-content title-fifth"></span>
      </div>
		</div>
	)
}

export default Projects;