import React from 'react';
import useReveal from '../useReveal';

const FACTS = [
  { k: 'Education', v: 'NYU, B.A. Math & CS, 2023' },
  { k: 'Day to day', v: 'Python, AWS, MongoDB, Redis, Terraform' },
  { k: 'Side interests', v: 'Trading, prediction markets, photography, coffee, cooking' }
];

function About() {
  const [ref, visible] = useReveal();
  const portrait = `${process.env.PUBLIC_URL || ''}/alvin.jpg`;

  return (
    <section id="about" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__head">
        <h2 className="section__title">About</h2>
        <span className="label">(04)</span>
      </div>

      <div className="about">
        <div className="about__portrait">
          <img src={portrait} alt="Alvin Lee" />
        </div>
        <div className="about__copy">
          <p className="about__lead">
            I enjoy math and software architecture, and I like learning things I don’t know yet.
          </p>
          <p className="about__body">
            I studied math and computer science at NYU. Lately I’m most interested in building agents:
            closed loops that run end to end with as little human intervention as possible. Forecasting
            agents are where I’m exploring that. I’m interested in forecasting itself, and building the
            loop that runs it is the other half of the project.
          </p>
          <p className="about__body">
            Outside work I’m into trading and prediction markets, and I take a lot of photos. I also like
            coffee and cooking. Right now that means light roasts and turbo shots, and getting better at
            sauces.
          </p>
          <dl className="facts">
            {FACTS.map((fact) => (
              <div key={fact.k} className="facts__item">
                <dt>{fact.k}</dt>
                <dd>{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default About;
