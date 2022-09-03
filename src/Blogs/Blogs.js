import React from 'react'
import Navbar from "../components/Navbar";
import '/Users/alvinlee/Desktop/Github/website1/src/components/App.css';
import './Blogs.css'

var Latex = require("react-latex")

function Blogs(){
  const fraction = '$$\\frac{1}{2}$$'
	return(
		<div>
			<Navbar />
      <div className='latex-body'>
        <h5>Non-Linear Regression and Gradient Descent</h5>
        
      </div>
		</div>
	)
}

export default Blogs;