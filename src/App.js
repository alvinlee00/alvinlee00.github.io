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
    let isScrolling = false;
    let scrollEndTimer = null;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (!isScrolling) {
        isScrolling = true;
        document.body.style.scrollBehavior = 'smooth';
      }
      
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Enable custom smooth scrolling with slower transitions
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '100px';
    
    // Add CSS for slower scroll timing
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      html {
        scroll-behavior: smooth !important;
      }
      
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth !important;
        }
      }
      
      /* Slower scroll for smoother experience */
      body {
        scroll-behavior: smooth;
        scroll-snap-type: y proximity;
      }
    `;
    document.head.appendChild(styleSheet);
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
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