import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Projects from './components/Projects';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/website1" element={<Home />}/>
            <Route path="/website1/About" element={<About />}/>
            <Route path="/website1/Contact" element={<Contact />}/>
            <Route path="/website1/Resume" element={<Resume />}/>
            <Route path="/website1/Projects" element={<Projects />}/>
        </Routes>    
    </Router>
);


