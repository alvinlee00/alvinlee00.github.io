import React from 'react'
import Navbar from "./Navbar";
import './App.css';

function Contact(){
	return(
		<div>
			<Navbar />
			<div className="title">
				<span className="title-content">
					Email: alvinlee225@gmail.com
				</span>
				<br></br>
				<span className="title-content title-second">
					Alternative Email: al6178@nyu.edu
				</span>
			</div>
    </div>
	)
}

export default Contact;
