import React from 'react'
import Navbar from "./Navbar";
import './App.css';


function Resume(){
	return(
		<div>
		  <Navbar />
      <embed src="Resume_Final.pdf" type = "application/pdf" width="100%" height="1200px"></embed>
		</div>
	)
}

export default Resume;