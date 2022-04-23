import React from 'react'
import Navbar from "./Navbar";
import './App.css';
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack'
function Resume(){
	return(
		<div>
		  <Navbar />
      <Document file={"Resume_Final.pdf"} onLoadError={console.error}>
        <Page pageNumber={1}/>
      </Document>
      <div className = 'makeTall'></div>
    </div>
	)
}

export default Resume;