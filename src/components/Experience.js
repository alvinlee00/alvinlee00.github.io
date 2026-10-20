import React from 'react';
import useReveal from '../useReveal';

const EXPERIENCES = [
  {
    id: 'blueflame',
    company: 'Blueflame AI',
    dates: 'Jan 2026 — Present',
    role: 'Software Engineer',
    highlights: [
      'Led Blueflame’s engineering for the Auth0 identity integration with Grata: the shared identity model, a privileged M2M API and a login handoff across 4 repositories.',
      'Owned org, user and seat provisioning between both platforms, with US/EU data residency and a write contract that never leaves orphaned users.',
      'Incident lead for identity through launch, including triage of a production login loop affecting ~1,900 logins.',
      'Shipped Datasite VDR sharing with a fail-closed, least-privilege model enforced across search, RAG and code execution.'
    ],
    tags: ['Python', 'Auth0', 'OAuth / OIDC', 'MongoDB', 'Redis', 'AWS', 'Terraform'],
    slug: 'blueflame'
  },
  {
    id: 'pepsico',
    company: 'PepsiCo',
    dates: 'Jul 2023 — Jan 2026',
    role: 'Software Engineer, Data Platform',
    highlights: [
      'Built self-service Snowflake provisioning on Jira, GitHub and Airflow, cutting turnaround from 2 days to under 1 hour.',
      'Migrated 200+ service accounts to RSA key auth with zero downtime and automated rotation in Terraform and Azure Key Vault.',
      'Global Terraform SME for 5 multi-region Snowflake accounts; mentored 15+ engineers.'
    ],
    tags: ['Python', 'SQL', 'Airflow', 'Terraform', 'Snowflake', 'Azure'],
    slug: 'pepsico'
  },
  {
    id: 'pepsico-intern',
    company: 'PepsiCo',
    dates: 'May 2022 — Aug 2022',
    role: 'Software Engineering Intern, Data Platform',
    highlights: ['Built pipeline monitoring and alerting in Python and SQL that reduced MTTR by ~40%.'],
    tags: []
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
      <h2 className="section__label">Experience</h2>

      <ol className="timeline">
        {EXPERIENCES.map((exp) => (
          <li key={exp.id} className="timeline__item">
            <p className="timeline__dates">{exp.dates}</p>
            <div className="timeline__body">
              <h3 className="timeline__role">
                {exp.role} <span className="timeline__company">· {exp.company}</span>
              </h3>
              <ul className="timeline__highlights">
                {exp.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {exp.tags.length ? (
                <ul className="tags" aria-label="Technologies">
                  {exp.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}
              {exp.slug ? (
                <button className="text-link" onClick={() => activate(exp.slug)}>
                  Read the case study <span aria-hidden="true">→</span>
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Experience;
