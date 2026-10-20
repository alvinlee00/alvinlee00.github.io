import React, { useEffect } from 'react';

function PepsicoExperience({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <article className="project-detail experience-detail" id="pepsico-experience">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">Full-time role · Jul 2023 to Jan 2026</span>
          <span className="project-detail__tag">Software Engineer, Data Platform</span>
        </div>
        <h1 className="project-detail__title">PepsiCo: platform engineering for every data team</h1>
        <p className="project-detail__lede">
          PepsiCo relies on its Snowflake estate and platform tooling for decisions across supply chain, finance,
          and marketing. I owned the automation, infrastructure-as-code, and governance that keep that ecosystem
          fast, compliant, and self-serve.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Highlights</h2>
            <p>Self-service provisioning, brand integrations, global IaC standards, key rotation, and dbt
            lifecycle ownership.</p>
          </div>
          <div>
            <h2>Toolbox</h2>
            <p>Python, SQL, Airflow, Terraform, Snowflake, Azure Key Vault, Docker, Kubernetes, dbt.</p>
          </div>
          <div>
            <h2>Impact</h2>
            <p>Cut provisioning cycles from days to under an hour and scaled secure access across multi-region
            deployments.</p>
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h3>Shipping a self-service platform</h3>
        <p>
          I designed a provisioning backbone that connects Jira Service Management, GitHub webhooks, and
          Snowflake APIs. Airflow now orchestrates the entire workflow, so requests are fulfilled in under an
          hour instead of soaking up two days of manual approvals and SQL.
        </p>
        <p>
          Automations hand customers the exact roles, warehouses, and storage patterns they need, while
          logging every change for auditability.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Bringing new brands online</h3>
        <p>
          When PepsiCo acquired a brand I was on point to consolidate their data estate. That meant stitching
          together disparate pipelines and applying secure hashing so personally identifiable information
          meets corporate policy before it lands in Snowflake.
        </p>
        <p>
          The playbook now applies to any new acquisition: standard interfaces, data governance from day one,
          and zero friction for analysts inheriting those datasets.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Scaling infrastructure-as-code</h3>
        <p>
          As the global Terraform SME I codified reusable modules that stand up five multi-region Snowflake
          accounts. Thousands of objects (databases, schemas, system roles, users) are templated and peer
          reviewed. Provisioning time dropped by 60% and the same patterns now power new workloads within
          minutes.
        </p>
        <p>
          I also mentored 15+ engineers to contribute confidently, reviewing module design and pairing on pull
          requests so our standards scale with the team.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Earlier: Intern foundations</h3>
        <p>
          I originally joined as a data platform intern, where I built Python and SQL monitoring pipelines
          that track performance metrics and alert on anomalies. That observability work cut mean time to
          resolution by 40% and set the stage for the automation focus that followed.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Key stewardship and dbt</h3>
        <p>
          In my last stretch I led enterprise key stewardship, migrating 200+ Snowflake service accounts to
          RSA keys rotated through Azure Key Vault with zero downtime, and stewarded dbt upgrades so analytics teams inherit modern testing and
          documentation out of the box. The goal was always the same: a platform that stays reliable as PepsiCo grows.
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
