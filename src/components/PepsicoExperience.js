import React, { useEffect } from 'react';

function PepsicoExperience({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <article className="project-detail experience-detail" id="pepsico-experience">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">Jul 2023 to Jan 2026</span>
          <span className="project-detail__tag">Software Engineer, Data Platform</span>
        </div>
        <h1 className="project-detail__title">PepsiCo</h1>
        <p className="project-detail__lede">
          I was on the data platform team, which runs PepsiCo’s Snowflake accounts and the tooling other
          data teams use to get access, build pipelines and manage infrastructure.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Areas</h2>
            <p>Self-service provisioning, Terraform, key rotation, acquisitions, dbt.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>Python, SQL, Airflow, Terraform, Snowflake, Azure Key Vault, Docker, Kubernetes, dbt.</p>
          </div>
          <div>
            <h2>Result</h2>
            <p>Access requests went from about 2 days of manual work to under an hour.</p>
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h3>Self-service provisioning</h3>
        <p>
          Snowflake access used to mean a ticket, an approval and someone writing SQL by hand. I connected
          Jira Service Management, GitHub webhooks and the Snowflake APIs, with Airflow running the
          workflow, so most requests are fulfilled in under an hour. Every change is logged for audits.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Onboarding acquired brands</h3>
        <p>
          When PepsiCo acquired a brand, I helped move its data into our Snowflake estate. That meant
          joining up different pipelines and hashing personal data to meet company policy before it landed.
          We reused the same approach for later acquisitions.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Terraform</h3>
        <p>
          I was the team’s go-to person for Terraform and wrote reusable modules for five multi-region
          Snowflake accounts, covering databases, schemas, roles and users. Provisioning time dropped by
          about 60%. I also reviewed module changes and paired with the 15 or so engineers who contributed
          to them.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Key rotation and dbt</h3>
        <p>
          Near the end I moved 200+ Snowflake service accounts to RSA key authentication with zero downtime,
          with keys rotated automatically through Terraform and Azure Key Vault. I also handled dbt
          upgrades for the analytics teams.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Internship</h3>
        <p>
          I started as an intern on the same team, building Python and SQL monitoring for pipelines that
          alerted on anomalies. It cut the time to resolve pipeline issues by about 40%.
        </p>
      </section>

      <footer className="project-detail__footer">
        <button onClick={onBack} className="project-detail__back">
          ← Back to Experience
        </button>
      </footer>
    </article>
  );
}

export default PepsicoExperience;
