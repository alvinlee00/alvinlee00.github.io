import React, { useEffect } from 'react';

const STATS = [
  { value: '4', label: 'Repositories in the login handoff and provisioning work' },
  { value: '~1,900', label: 'Logins affected by the launch login loop I triaged' },
  { value: '15K', label: 'Workspaces in the VDR sharing backfill' },
  { value: '47', label: 'PRs reviewed across both companies' }
];

function BlueflameExperience({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <article className="project-detail experience-detail" id="blueflame-experience">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">Jan 2026 to Present</span>
          <span className="project-detail__tag">Software Engineer</span>
        </div>
        <h1 className="project-detail__title">Blueflame AI</h1>
        <p className="project-detail__lede">
          Blueflame builds AI tools for investment firms. I started on customer bugs, moved to permissions
          and data sharing, and then co-owned Blueflame’s side of the Auth0 identity integration with
          Grata for a joint launch.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Areas</h2>
            <p>Identity and login, provisioning, permissions, data sharing.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>Python, Auth0, OAuth 2.0 / OIDC, MongoDB / DocumentDB, Redis, AWS, Terraform.</p>
          </div>
          <div>
            <h2>Context</h2>
            <p>A joint launch between two companies, on a fixed date.</p>
          </div>
        </div>
        <dl className="project-detail__stats">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="project-detail__section">
        <h3>Identity integration with Grata</h3>
        <p>
          I hadn’t used Auth0 before this project, so I spent the first couple of weeks learning it and
          writing notes for myself. I then wrote the RFC for Blueflame’s side: Auth0 holds the
          credential, Blueflame’s own account stays the identity, and accounts move over one at a time so
          the change can be reversed.
        </p>
        <p>
          Two decisions I pushed for: key both systems on Grata’s stable user ID instead of an Auth0 ID,
          and wrap the existing login path rather than rewrite it, so login itself didn’t change right
          before launch.
        </p>
        <ul>
          <li>SSO login handoff between the two products, across four repositories.</li>
          <li>A privileged machine-to-machine API for looking up and linking users across both systems.</li>
          <li>
            Org, user and seat provisioning. Data stays in its region (US to US, EU to EU), and writes go to
            Grata first, so a rejected write can’t leave an orphaned user on our side.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>Launch</h3>
        <p>
          Around launch I was Blueflame’s main contact for identity incidents. The biggest was a production
          login loop affecting about 1,900 logins, which I triaged and helped fix. I also traced about 670
          duplicate accounts to a retry and timeout race by matching timestamps between our AWS logs and
          Grata’s Datadog logs.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Before that</h3>
        <div className="project-detail__highlights">
          <article>
            <h4>Datasite VDR sharing</h4>
            <p>
              Sharing for virtual data room content that fails closed and applies the same access scope to
              search, RAG and code execution. It rolled out through a staged backfill across 142 accounts
              and about 15K workspaces.
            </p>
          </article>
          <article>
            <h4>Permissions for Blueprints V3</h4>
            <p>
              Groups, ACLs and all-or-nothing bulk operations, tested at 10K items and against
              production-sized migrations.
            </p>
          </article>
        </div>
      </section>

      <footer className="project-detail__footer">
        <button onClick={onBack} className="project-detail__back">
          ← Back to Experience
        </button>
      </footer>
    </article>
  );
}

export default BlueflameExperience;
