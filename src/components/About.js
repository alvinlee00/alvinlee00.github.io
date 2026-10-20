import React from 'react';
import useReveal from '../useReveal';

const FACTS = [
  { k: 'Education', v: 'NYU, Math & CS' },
  { k: 'Toolbox', v: 'Python, SQL, AWS, Terraform' },
  { k: 'Off hours', v: 'Photography, cooking' }
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
            I studied mathematics and computer science at NYU, and I still approach systems the way I
            approach a proof: state the invariants, then check every case.
          </p>
          <p className="about__body">
            Before Blueflame I spent two and a half years on PepsiCo’s data platform, making Snowflake
            self-serve for the whole company. I care about small diffs, writing things down and proving a
            fix before shipping it. Away from the keyboard you’ll find me behind a camera or in the
            kitchen.
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
