import React from 'react';
import useReveal from '../useReveal';

const EXPERIENCES = [
  {
    id: 'blueflame',
    company: 'BlueFlame AI',
    dates: 'Jan 2026 — Present',
    role: 'Software Engineer, Core Platform',
    description:
      'Re-architected the AI workflow-automation platform from a flat library into a shared, permissioned filesystem — folders, templates, and per-user copies — so teams can organize, share, and co-edit automations, backed by an account-scoped permission model and Redis lease/heartbeat edit locks.',
    focus: 'Permission models · Edit-lock concurrency · Bulk validation'
  },
  {
    id: 'pepsico',
    company: 'PepsiCo',
    dates: '2023 — 2025',
    role: 'Software Engineer, Data Platform',
    description:
      'Designed data platforms that get information into the right hands fast — shipping self-service tooling, IaC standards, and governed integrations for PepsiCo teams.',
    focus: 'Airflow automation · Terraform IaC · Snowflake governance',
    slug: 'pepsico-data-platform'
  }
];

function Experience({ onExperienceSelect }) {
  const [ref, visible] = useReveal();

  const activate = (slug) => {
    if (slug && onExperienceSelect) {
      onExperienceSelect(slug);
    }
  };

  return (
    <section id="experience" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__index">
        <p className="section__index-num">(02)</p>
        <h2 className="section__index-title">Experience</h2>
      </div>

      <div>
        {EXPERIENCES.map((exp) => {
          const clickable = Boolean(exp.slug);
          return (
            <article
              key={exp.id}
              className={`exp-item ${clickable ? 'is-link' : ''}`}
              onClick={clickable ? () => activate(exp.slug) : undefined}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={(event) => {
                if (clickable && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  activate(exp.slug);
                }
              }}
            >
              <div className="exp-item__meta">
                <span>{exp.company}</span>
                <span>{exp.dates}</span>
              </div>
              <h3 className="exp-item__role">{exp.role}</h3>
              <p className="exp-item__desc">{exp.description}</p>
              <p className="exp-item__focus">{exp.focus}</p>
              {clickable ? (
                <span className="detail-cue">
                  Read case study <span aria-hidden="true">→</span>
                </span>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;
