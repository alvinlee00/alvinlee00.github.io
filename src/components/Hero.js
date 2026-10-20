import React from 'react';

const DISCIPLINES = ['Identity', 'Permissions', 'Data platforms', 'Infrastructure as code', 'AI products'];

function Marquee() {
  // Two identical runs let the track loop seamlessly at -50%.
  const run = (hidden) => (
    <span className="marquee__run" aria-hidden={hidden || undefined}>
      {DISCIPLINES.map((item) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          <span className="marquee__amp">&amp;</span>
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <div className="marquee">
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__meta">
        <span>Software Engineer</span>
        <span>Portfolio ©2026</span>
        <span>Open to new conversations</span>
      </div>

      <h1 className="hero__name">Alvin Lee</h1>

      <Marquee />

      <section className="intro">
        <p className="label">(01) Hello</p>
        <p className="intro__text">
          I’m a software engineer who likes <em>careful</em> systems: the identity, permission and data
          layers underneath products. Mathematician by training, builder by habit, currently at Blueflame
          AI.
        </p>
      </section>
    </header>
  );
}

export default Hero;
