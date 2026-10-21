import React from 'react';
import useReveal from '../useReveal';

const EXPERIENCES = [
  {
    id: 'blueflame',
    company: 'Blueflame AI',
    role: 'Software Engineer',
    blurb: 'Account merging across two products, and permissions for AI tools in finance',
    dates: '2026 — Now',
    slug: 'blueflame'
  },
  {
    id: 'pepsico',
    company: 'PepsiCo',
    role: 'Software Engineer, Data Platform',
    blurb: 'Self-serve Snowflake, Terraform and Airflow for every data team',
    dates: '2023 — 2026',
    slug: 'pepsico'
  },
  {
    id: 'pepsico-intern',
    company: 'PepsiCo',
    role: 'Software Engineering Intern',
    blurb: 'Pipeline monitoring and alerting',
    dates: '2022'
  }
];

function ExperienceRow({ exp, onSelect }) {
  const content = (
    <>
      <span className="exp-row__company">{exp.company}</span>
      <span className="exp-row__role">
        {exp.role}
        <span className="exp-row__blurb">{exp.blurb}</span>
      </span>
      <span className="exp-row__dates">{exp.dates}</span>
      <span className="exp-row__arrow" aria-hidden="true">
        {exp.slug ? '→' : ''}
      </span>
    </>
  );

  if (!exp.slug) {
    return <div className="exp-row">{content}</div>;
  }

  return (
    <button
      className="exp-row is-link"
      onClick={() => onSelect(exp.slug)}
      aria-label={`${exp.company}, ${exp.role}: read the case study`}
    >
      {content}
    </button>
  );
}

function Experience({ onExperienceSelect }) {
  const [ref, visible] = useReveal();

  const activate = (slug) => {
    if (onExperienceSelect) {
      onExperienceSelect(slug);
    }
  };

  return (
    <section id="experience" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__head">
        <h2 className="section__title">Experience</h2>
        <span className="label">(03)</span>
      </div>

      <div className="exp-list">
        {EXPERIENCES.map((exp) => (
          <ExperienceRow key={exp.id} exp={exp} onSelect={activate} />
        ))}
      </div>
    </section>
  );
}

export default Experience;
