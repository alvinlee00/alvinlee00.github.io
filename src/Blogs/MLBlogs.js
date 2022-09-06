import React from 'react'
import Navbar from "../components/Navbar";
import { MLBlogItems } from "./MLBlogItems"
import { Link } from 'react-router-dom'
import './Blogs.css'


function MLBlogs(){

	return(
		<div>
			<Navbar />
      
			<div className='latex-body'>
				<ul className='blog-list'>
					{MLBlogItems.map((item,index) => {
						return(
							<li key={index}>
								<h5>
								<Link className={item.cName} to = {item.url}>
									{item.label}
								</Link>
								</h5>
								<div className='h7'>{item.date}</div>
								<h6>{item.description}</h6>
								
							</li>
						)
					})}
				</ul>

      </div>
		</div>
	)
}

export default MLBlogs;