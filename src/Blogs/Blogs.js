import React from 'react'
import Navbar from "../components/Navbar";
import './App.css';
var Latex = require("react-latex")

function Blogs(){
  const fraction = '$$\\frac{1}{2}$$'
	return(
		<div>
			<Navbar />
      test
      <Latex>
        {fraction}
      </Latex>
		</div>
	)
}

export default Blogs;