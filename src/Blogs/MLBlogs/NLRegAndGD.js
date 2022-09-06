import React from 'react'
import Navbar from "/Users/alvinlee/Desktop/Github/website1/src/components/Navbar.js";
import '/Users/alvinlee/Desktop/Github/website1/src/components/App.css';
import MathJax from 'react-mathjax'
import './MLBlogs.css'

const tex = `
\\begin{array}{}
a & b & c \\\\
d & e & f & g \\\\
& h & i & \\theta
\\end{array}
`

function NLRegAndGD(){

	return(
		<div>
			<Navbar />
      <div className='latex-body'>
        <h5>Non-Linear Regression and Gradient Descent</h5>
				<hr/>
        <MathJax.Provider>
					<div>
						Consider the following formula:
						<MathJax.Node formula={tex}/>
					</div>
				</MathJax.Provider>
      </div>
		</div>
	)
}

export default NLRegAndGD;