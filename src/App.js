import React, { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Photography from './components/Photography';
import Contact from './components/Contact';
import SyncifyProject from './components/SyncifyProject';
import SnowflakeProject from './components/SnowflakeProject';

const ROUTES = {
  HOME: 'home',
  SYNCIFY: 'syncify',
  SNOWFLAKE: 'snowflake'
};

const buildPath = (route) => {
  if (route === ROUTES.SYNCIFY) {
    return '/projects/syncify';
  }
  if (route === ROUTES.SNOWFLAKE) {
    return '/projects/snowflake-mcp';
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
  return ROUTES.HOME;
};

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentRoute, setCurrentRoute] = useState(getRouteFromPath());

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
      <Navigation 
        currentRoute={currentRoute}
        onNavigate={navigateTo}
      />
      
      <main className="main-content">
        {isHome ? (
          <>
            <Hero scrollY={scrollY} />
            <Projects scrollY={scrollY} onProjectSelect={(slug) => {
              const routeMap = {
                syncify: ROUTES.SYNCIFY,
                'snowflake-mcp': ROUTES.SNOWFLAKE
              };
              const targetRoute = routeMap[slug];
              if (targetRoute) {
                navigateTo(targetRoute);
              }
            }} />
            <Photography scrollY={scrollY} />
            <Contact scrollY={scrollY} />
          </>
        ) : null}

        {currentRoute === ROUTES.SYNCIFY ? (
          <SyncifyProject onBack={() => navigateTo(ROUTES.HOME, { scrollTarget: 'projects' })} />
        ) : null}

        {currentRoute === ROUTES.SNOWFLAKE ? (
          <SnowflakeProject onBack={() => navigateTo(ROUTES.HOME, { scrollTarget: 'projects' })} />
        ) : null}
      </main>
    </div>
  );
}

export default App;
