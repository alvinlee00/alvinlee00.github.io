import React from 'react'
import Navbar from "./Navbar";
import './App.css';


function About(){
	return(
		<div>
			<Navbar />
			<div className = "container">
				<div className = "row">
					<img className = "col2" src="alvin.jpg" alt="alvinlee"
							width = "50%"
							height = "50%"></img>
					<div className="title col">
						<h1 className="title-content bold">About Me</h1>
						<div className="space"></div>
						<span className="title-content title-second">
							I am currently an undergraduate student studying Computer Science and Mathematics at New York University.
							I have a lot of experience in Python and I am familiar with Java as well as Julia. I hope to leverage my background 
							in mathematics and computer science to make meaningful contributions to the world.
						</span>
						<div className="space"></div>
						<span className="title-content title-third">
							During my free time, I love to cook. I am always learning new recipes, flavors, and methods of cooking. 
							I also enjoy photography, capturing the many places that I explore.
						</span>
						<div className="space"></div>
						<span className="title-content title-fourth">
							For some more information about me, check out my resume and feel free to contact me!
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About;