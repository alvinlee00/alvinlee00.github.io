import React from 'react';

function Hero() {
  return (
    <header id="top" className="hero-section">
      <div className="hero-meta">
        <span>Software Engineer</span>
        <span>Portfolio — 2026</span>
      </div>

      <h1 className="hero-name">
        Alvin<br />Lee
      </h1>

      <div className="hero-lead">
        <p className="hero-lead__label">
          Currently<br />BlueFlame AI
        </p>
        <p className="hero-lead__text">
          Building meaningful, well-architected software — from governed data
          platforms to permissioned, concurrent systems.
        </p>
      </div>
    </header>
  );
}

export default Hero;
