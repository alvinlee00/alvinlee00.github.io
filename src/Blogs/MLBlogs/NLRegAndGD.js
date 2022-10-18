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
  				src="https://r4km70rx1rgro3.embednotionpage.com/Introduction-to-Gradients-fa987108648f48769903263c89ca645d"
  
></iframe>  
      </div>
		</div>
	)
}

export default NLRegAndGD;