import React from 'react'
import Navbar from "/Users/alvinlee/Desktop/Github/website1/src/components/Navbar.js";
import '/Users/alvinlee/Desktop/Github/website1/src/components/App.css';
import MathJax from 'react-mathjax'
import './MLBlogs.css'

function PhilAndCogML(){

	return(
		<div>
			<Navbar />
      <div className='latex-body'>
        <h5>Philisophical and Cognitive Underpinnings of ML</h5>
        <div>
          Throughout history we have taken inspiration from nature. For example, when looking at old paintings of flight, angels for example, often have wings. 
          Modern airplanes take inspiration from birds, although airplane wings look very different from bird wings.

          How does the mind work?

          Two schools of thought: Dualism and Monism 
            Dualism - We think of the mind as separate from the body
            Monism - Body and mind are manifestations of a single sustance
          Body lies in the physical world i.e. it can be observed - size, weight, shape, colour, motion through space and time
          Mind lies 

        </div>
				<hr/>
      </div>
		</div>
	)
}

export default PhilAndCogML;