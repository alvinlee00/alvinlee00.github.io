import React from 'react'
import Navbar from "./Navbar";
import './App.css';


function About(){
	return(
		<div>
			<Navbar />
			<div className="title">
				<span className="title-content">
					I am currently an undergraduate student studying Computer Science and Mathematics at New York University.
					I have a lot of experience in Python and I am familiar with Java as well as Julia. I hope to leverage my background 
					in mathematics and computer science to make meaningful contributions to the world.
				</span>
				<br></br>
				<span className="title-content title-second">
					During my free time, I love to cook. I am always learning new recipes, flavors, and methods of cooking. 
					I also enjoy photography, capturing the many places that I explore.
				</span>
				<br></br>
				<span className="title-content title-third">
					For some more information about me, check out my resume and feel free to contact me!
				</span>
			</div>
		</div>
	)
}

export default About;