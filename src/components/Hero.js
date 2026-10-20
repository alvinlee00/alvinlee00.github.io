import React from 'react';

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__meta">
        <span>Software Engineer</span>
        <span>Blueflame AI</span>
        <span>NYU Math &amp; CS ’23</span>
      </div>

      <h1 className="hero__name">Alvin Lee</h1>

      <section className="intro">
        <p className="label">(01) Hello</p>
        <div className="intro__body">
          <p className="intro__text">
            I’m a software engineer at Blueflame AI, working mostly on backend systems: authentication,
            permissions and data infrastructure.
          </p>
          <p className="intro__aside">
            Before that I was on PepsiCo’s data platform. On the side I’m building forecasting agents.
          </p>
        </div>
      </section>
    </header>
  );
}

export default Hero;
