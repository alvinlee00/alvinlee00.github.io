import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Photography from './components/Photography';
import Contact from './components/Contact';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <Navigation />
      
      <main className="main-content">
        <Hero scrollY={scrollY} />
        <Projects scrollY={scrollY} />
        <Photography scrollY={scrollY} />
        <Contact scrollY={scrollY} />
      </main>
    </div>
  );
}

export default App;