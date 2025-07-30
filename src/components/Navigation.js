import React, { useState, useEffect } from 'react';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <button onClick={() => scrollToSection('hero')}>
            ALVIN LEE
          </button>
        </div>
        
        <div className="nav-menu">
          <button onClick={() => scrollToSection('projects')}>
            PROJECTS
          </button>
          <button onClick={() => scrollToSection('photography')}>
            PHOTOGRAPHY
          </button>
          <button onClick={() => scrollToSection('contact')}>
            CONTACT
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;