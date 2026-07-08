import React from 'react';
import useReveal from '../useReveal';

const FACTS = [
  { k: 'Education', v: 'NYU — Mathematics & Computer Science' },
  { k: 'Currently', v: 'BlueFlame AI · Core Platform' },
  { k: 'Previously', v: 'PepsiCo · Data Platform' },
  { k: 'Beyond code', v: 'Photography · Cooking · Mathematics' }
];

function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__index">
        <p className="section__index-num">(01)</p>
        <h2 className="section__index-title">About</h2>
      </div>

      <div>
        <p className="about__lead">
          I studied Mathematics and Computer Science at NYU, and I like reasoning
          about systems the way I like reasoning about math — carefully, from
          first principles.
        </p>
        <p className="about__body">
          I'm currently on the Core Platform team at BlueFlame AI, and was
          previously at PepsiCo building data platforms. Away from the keyboard
          you'll usually find me behind a camera or in the kitchen.
        </p>

        <div className="about__facts">
          {FACTS.map((fact) => (
            <div key={fact.k} className="about__fact">
              <p className="about__fact-key">{fact.k}</p>
              <p className="about__fact-val">{fact.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
