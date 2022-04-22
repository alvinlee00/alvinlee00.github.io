import React from 'react'
import Navbar from "./Navbar";
import './App.css';


function About(){
	return(
		<div>
			<Navbar />
			<span className="title">
				<span className="title-content">
					I am currently an undergraduate student studying computer science and mathematics at New York University.
					I love learning many different languages and have some projects that I have worked on.
				</span>
				<br></br>
				<span className="title-content title-second">
					During my free time, I love cooking and learning new recipes. I enjoy photography and I am trying 
					to learn photo editing as well.
				</span>
				<br></br>
				<span className="title-content title-third">
					Check out my resume for more information, and feel free to contact me!
				</span>
			</span>
		</div>
	)
}

export default About;