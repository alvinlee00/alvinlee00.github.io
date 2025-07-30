import React from 'react';

function Hero({ scrollY }) {
  // Parallax effect for hero content
  const parallaxOffset = scrollY * 0.3;

  return (
    <section id="hero" className="hero-section">
      <div 
        className="hero-content"
        style={{
          transform: `translateY(${parallaxOffset}px)`
        }}
      >
        <div className="hero-intro">
          <p className="hero-greeting">Hello, I'm</p>
        </div>
        
        <h1 className="hero-name">
          Alvin Lee
        </h1>
        
        <div className="hero-description">
          <p className="hero-role">
            Software Engineer & Creative Developer
          </p>
          <p className="hero-subtitle">
            Crafting digital experiences through clean code and thoughtful design.
            Currently studying Computer Science and Mathematics at NYU.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;