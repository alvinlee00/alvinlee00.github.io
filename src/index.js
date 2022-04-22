import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from "./serviceWorker";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/About" element={<About />}/>
            <Route path="/Contact" element={<Contact />}/>
        </Routes>    
    </Router>

);

ReactDOM.render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>,
  
    document.getElementById("root")
  );
  

serviceWorker.unregister();