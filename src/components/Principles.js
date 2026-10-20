import React from 'react';
import useReveal from '../useReveal';

const PRINCIPLES = [
  {
    title: 'Proof before fixes',
    body: 'I reproduce the failure and confirm the cause in logs, data or a direct probe before changing code. Cross-system bugs get matched timestamps, not guesses.'
  },
  {
    title: 'Small, in-scope diffs',
    body: 'The smallest change that solves the problem, even when that means adopting someone else’s smaller design over my own.'
  },
  {
    title: 'Production safety',
    body: 'Dry runs by default, flags that ship off with a tested rollback, one-record pilots before account-wide backfills, and undo steps written down.'
  },
  {
    title: 'Write it down',
    body: 'RFCs, access matrices checked cell by cell against the code, sequence diagrams, rollout runbooks and repair recipes that the next engineer can follow.'
  }
];

function Principles() {
  const [ref, visible] = useReveal();

  return (
    <section id="principles" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <h2 className="section__label">Approach</h2>

      <ol className="principles">
        {PRINCIPLES.map((item, i) => (
          <li key={item.title} className="principles__item">
            <span className="principles__num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="principles__title">{item.title}</h3>
            <p className="principles__body">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Principles;
