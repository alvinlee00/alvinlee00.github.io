import React from 'react';

const NAV_LINKS = [
  { id: 'about', label: '01/ABOUT' },
  { id: 'experience', label: '02/EXP' },
  { id: 'work', label: '03/WORK' },
  { id: 'photography', label: '04/PHOTO' },
  { id: 'contact', label: '05/CONTACT' }
];

const DETAIL_NAV = {
  syncify: { label: '← BACK TO WORK', target: 'work' },
  snowflake: { label: '← BACK TO WORK', target: 'work' },
  pepsico: { label: '← BACK TO EXPERIENCE', target: 'experience' }
};

function Navigation({ currentRoute = 'home', onNavigate }) {
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogoClick = () => {
    if (isHome) {
      scrollToSection('top');
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <button onClick={handleLogoClick}>ALVIN&nbsp;LEE</button>
        </div>

        {isHome ? (
          <div className="nav-menu">
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}>
                {link.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="nav-menu nav-menu--detail">
            <button
              onClick={() => {
                const config = DETAIL_NAV[currentRoute] || DETAIL_NAV.syncify;
                if (onNavigate) {
                  onNavigate('home', { scrollTarget: config.target });
                }
              }}
            >
              {(DETAIL_NAV[currentRoute] || DETAIL_NAV.syncify).label}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
