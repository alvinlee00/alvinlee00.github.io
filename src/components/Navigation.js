import React, { useState, useEffect } from 'react';

function Navigation({ currentRoute = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentRoute === 'home';

  const scrollToSection = (sectionId) => {
    if (!sectionId) {
      return;
    }

    if (!isHome) {
      if (onNavigate) {
        onNavigate('home', { scrollTarget: sectionId });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      scrollToSection('hero');
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <button onClick={handleLogoClick}>
            ALVIN LEE
          </button>
        </div>
        
        {isHome ? (
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
        ) : (
          <div className="nav-menu nav-menu--detail">
            <button onClick={() => onNavigate && onNavigate('home', { scrollTarget: 'projects' })}>
              ← BACK TO PROJECTS
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
