import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'principles', label: 'Approach' },
  { id: 'contact', label: 'Contact' }
];

const DETAIL_NAV = {
  syncify: { label: '← Projects', target: 'work' },
  snowflake: { label: '← Projects', target: 'work' },
  pepsico: { label: '← Experience', target: 'experience' },
  blueflame: { label: '← Experience', target: 'experience' }
};

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch (e) {
    return null;
  }
};

const systemTheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => readStoredTheme() || systemTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {
      // Storage unavailable; the choice just won't persist.
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title="Toggle theme"
    >
      <span className="theme-toggle__dot" aria-hidden="true" />
    </button>
  );
}

function Navigation({ currentRoute = 'home', onNavigate }) {
  const isHome = currentRoute === 'home';
  const detail = DETAIL_NAV[currentRoute] || DETAIL_NAV.syncify;

  const scrollToSection = (sectionId) => {
    if (!isHome) {
      if (onNavigate) {
        onNavigate('home', { scrollTarget: sectionId });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button className="nav-logo" onClick={handleLogoClick}>
          Alvin Lee
        </button>

        <div className="nav-menu">
          {isHome ? (
            NAV_LINKS.map((link) => (
              <button key={link.id} className="nav-link" onClick={() => scrollToSection(link.id)}>
                {link.label}
              </button>
            ))
          ) : (
            <button className="nav-link nav-link--back" onClick={() => scrollToSection(detail.target)}>
              {detail.label}
            </button>
          )}
          <a className="nav-link nav-link--resume" href="/Resume_Final.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
