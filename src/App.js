import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SyncifyProject from './components/SyncifyProject';
import SnowflakeProject from './components/SnowflakeProject';
import PepsicoExperience from './components/PepsicoExperience';
import BlueflameExperience from './components/BlueflameExperience';

const ROUTES = {
  HOME: 'home',
  SYNCIFY: 'syncify',
  SNOWFLAKE: 'snowflake',
  PEPSICO: 'pepsico',
  BLUEFLAME: 'blueflame'
};

const buildPath = (route) => {
  if (route === ROUTES.SYNCIFY) {
    return '/projects/syncify';
  }
  if (route === ROUTES.SNOWFLAKE) {
    return '/projects/snowflake-mcp';
  }
  if (route === ROUTES.PEPSICO) {
    return '/experience/pepsico';
  }
  if (route === ROUTES.BLUEFLAME) {
    return '/experience/blueflame';
  }
  return '/';
};

const getRouteFromPath = () => {
  const path = window.location.pathname || '/';
  if (path.startsWith('/projects/syncify')) {
    return ROUTES.SYNCIFY;
  }
  if (path.startsWith('/projects/snowflake-mcp')) {
    return ROUTES.SNOWFLAKE;
  }
  if (path.startsWith('/experience/pepsico')) {
    return ROUTES.PEPSICO;
  }
  if (path.startsWith('/experience/blueflame')) {
    return ROUTES.BLUEFLAME;
  }
  return ROUTES.HOME;
};

function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromPath());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromPath());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route, options = {}) => {
    const targetRoute = route || ROUTES.HOME;
    const { scrollTarget } = options;

    const maybeScrollToTarget = (behavior = 'smooth') => {
      if (!scrollTarget) {
        return false;
      }

      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior, block: 'start' });
        return true;
      }

      return false;
    };

    if (targetRoute === currentRoute) {
      if (!maybeScrollToTarget()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const path = buildPath(targetRoute);
    window.history.pushState({}, '', path);
    setCurrentRoute(targetRoute);

    if (targetRoute === ROUTES.HOME) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!maybeScrollToTarget()) {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const isHome = currentRoute === ROUTES.HOME;

  return (
    <div className="app">
      <Navigation currentRoute={currentRoute} onNavigate={navigateTo} />

      <main className="main-content">
        {isHome ? (
          <>
            <Hero />
            <Projects
              onProjectSelect={(slug) => {
                const routeMap = {
                  syncify: ROUTES.SYNCIFY,
                  'snowflake-mcp': ROUTES.SNOWFLAKE
                };
                const targetRoute = routeMap[slug];
                if (targetRoute) {
                  navigateTo(targetRoute);
                }
              }}
            />
            <Experience
              onExperienceSelect={(slug) => {
                const routeMap = { pepsico: ROUTES.PEPSICO, blueflame: ROUTES.BLUEFLAME };
                const targetRoute = routeMap[slug];
                if (targetRoute) {
                  navigateTo(targetRoute);
                }
              }}
            />
            <About />
            <Contact />
          </>
        ) : null}

        {currentRoute === ROUTES.SYNCIFY ? (
          <SyncifyProject onBack={() => navigateTo(ROUTES.HOME, { scrollTarget: 'work' })} />
        ) : null}

        {currentRoute === ROUTES.SNOWFLAKE ? (
          <SnowflakeProject onBack={() => navigateTo(ROUTES.HOME, { scrollTarget: 'work' })} />
        ) : null}

        {currentRoute === ROUTES.BLUEFLAME ? (
          <BlueflameExperience onBack={() => navigateTo(ROUTES.HOME, { scrollTarget: 'experience' })} />
        ) : null}

        {currentRoute === ROUTES.PEPSICO ? (
          <PepsicoExperience onBack={() => navigateTo(ROUTES.HOME, { scrollTarget: 'experience' })} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
