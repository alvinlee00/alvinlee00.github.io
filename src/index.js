import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Blogs from './Blogs/MLBlogs';
import NLRegAndGD from './Blogs/MLBlogs/NLRegAndGD';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="" element={<Home />}/>
            <Route path="/About" element={<About />}/>
            <Route path="/Contact" element={<Contact />}/>
            <Route path="/Resume" element={<Resume />}/>
            <Route path="/Projects" element={<Projects />}/>
            
            <Route path="/Blogs" element={<Blogs />}/>
                <Route path="/Blogs/non-linear-regression-and-gradient-descent" element={<NLRegAndGD/>}/>
                

        </Routes>    
    </Router>
);


