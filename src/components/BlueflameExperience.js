import React, { useEffect } from 'react';

function BlueflameExperience({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <article className="project-detail experience-detail" id="blueflame-experience">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">Full-time role · Jan 2026 to Present</span>
          <span className="project-detail__tag">Software Engineer</span>
        </div>
        <h1 className="project-detail__title">Blueflame AI: identity and access for a cross-company launch</h1>
        <p className="project-detail__lede">
          Blueflame builds AI tools for investment firms. In my first year I went from customer bug fixes to
          owning Blueflame’s half of the Auth0 identity integration with Grata, a hard-deadline platform
          launch spanning two companies, four repositories and two Auth0 regions.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Scope</h2>
            <p>Identity model, privileged M2M API, login handoff, provisioning, launch incidents.</p>
          </div>
          <div>
            <h2>Toolbox</h2>
            <p>Python, Auth0, OAuth 2.0 / OIDC, JWT, MongoDB / DocumentDB, Redis, AWS, Terraform.</p>
          </div>
          <div>
            <h2>By the numbers</h2>
            <p>160 PRs across 9 repositories and 2 GitHub orgs, plus 47 reviews for teammates.</p>
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h3>Learning identity from zero, then designing it</h3>
        <p>
          When the integration kicked off I had never worked with Auth0. I wrote my own guides to the auth
          stack, then authored the RFC for Auth0 as Blueflame’s identity provider. Its thesis was that Auth0
          becomes the credential while Blueflame’s account user remains the identity, and that accounts move
          over one at a time, reversibly.
        </p>
        <p>
          I built a roles and access matrix verified cell by cell against the code, which surfaced real
          over-permissioned roles, and login sequence diagrams that caught several contradictions in the RFC
          itself. I then called the design sync that settled the cross-system key and cut the planned user
          service from about 28 methods to about 7, wrapping the existing login path so nothing about login
          had to change before launch.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Building the integration</h3>
        <ul>
          <li>
            A privileged machine-to-machine API for reading and correlating identities across both systems,
            with each review finding pinned by a regression test that failed on the old code.
          </li>
          <li>
            The login handoff across four repositories and the Auth0 tenant configuration for dev, staging
            and production, plus a rollout runbook covering every system involved.
          </li>
          <li>
            Org, user and seat provisioning between both platforms. Regions pair US to US and EU to EU and
            refuse anything else, and seats are written to the partner first and saved locally only once it
            accepts, so neither side can hold a user the other refused.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>Launch window</h3>
        <p>
          Through launch I was the Blueflame contact for most cross-system login and provisioning
          incidents. I ran triage on a production login loop affecting roughly 1,900 logins, hand-repaired
          affected users reversibly with documented undo steps, and root-caused about 670 duplicate
          production accounts to a retry and timeout race by lining up AWS CloudWatch and Datadog
          timestamps to the millisecond. I also predicted a refresh-token expiry problem three weeks before
          it surfaced in production, then proved its mechanism from raw Auth0 events when it did.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Before identity: permissions and data sharing</h3>
        <div className="project-detail__highlights">
          <article>
            <h4>Datasite VDR sharing</h4>
            <p>
              A fail-closed, least-privilege sharing model with one resolved scope for search, RAG and code
              execution. Local testing caught metadata leaks before release, and the production backfill
              went from dry runs to a one-grant pilot to an all-accounts pass over ~15K workspaces.
            </p>
          </article>
          <article>
            <h4>Permission foundation</h4>
            <p>
              Groups, ACLs, atomic all-or-nothing bulk operations and edit-lock leases for a workflow
              platform, benchmarked at 10K items and rehearsed against production-scale migrations.
            </p>
          </article>
          <article>
            <h4>Performance</h4>
            <p>
              An index that took a workspace query from a full scan to an index scan, 90 ms to 0.8 ms, and
              removed a 7 to 8 second per-member scan.
            </p>
          </article>
        </div>
      </section>

      <section className="project-detail__section">
        <h3>What I took from it</h3>
        <p>
          Cross-system cutovers need an agreed order and a named owner on each side, and every write-once
          field needs a repair story designed up front. The most useful thing I did all year was often
          choosing a teammate’s smaller design over mine and then spending my time finding where it could
          break.
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

export default BlueflameExperience;
