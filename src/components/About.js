import React from 'react';
import useReveal from '../useReveal';

const FACTS = [
  { k: 'Education', v: 'New York University, B.A. Mathematics & Computer Science, 2023' },
  { k: 'Focus', v: 'Identity & access, permission systems, data platforms, infrastructure as code' },
  { k: 'Beyond code', v: 'Photography, cooking, mathematics' }
];

function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <h2 className="section__label">About</h2>

      <div>
        <p className="prose">
          I studied math and computer science at NYU, and I still approach systems the way I approach a
          proof: state the invariants, then check every case. That habit is why I gravitate toward
          permissions, identity and anything where a wrong answer is worse than a refused one.
        </p>
        <dl className="facts">
          {FACTS.map((fact) => (
            <div key={fact.k} className="facts__row">
              <dt>{fact.k}</dt>
              <dd>{fact.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default About;
