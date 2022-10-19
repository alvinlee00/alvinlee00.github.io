import React from 'react'
import Navbar from "/Users/alvinlee/Desktop/Github/website1/src/components/Navbar.js";
import '/Users/alvinlee/Desktop/Github/website1/src/components/App.css';

import './MLBlogs.css'



function NLRegAndGD(){

	return(
		<div>
			<Navbar />
      <div className='latex-body'>
        <h5>Non-Linear Regression and Gradient Descent</h5>
				<hr/>
				<iframe className = 'notion'
  				src="https://leealvin.dev/notion_notes/"
  
></iframe>  
      </div>
		</div>
	)
}

export default NLRegAndGD;