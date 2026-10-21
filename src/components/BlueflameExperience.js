import React, { useEffect } from 'react';

const DECISIONS = [
  {
    title: 'Link the records, don’t merge them',
    body:
      'Merging the two user tables would have meant moving data and credentials on a deadline, with no easy way back. Instead both products keep their own users, and a person on both is joined on one stable ID that only one side owns. Each customer can be moved over on their own and moved back. The cost is two records to keep in sync, which the rest of the design deals with.'
  },
  {
    title: 'Refuse conflicts instead of overwriting',
    body:
      'A link is written once. Replaying the same link succeeds, and anything that disagrees with it is rejected and surfaced. The tradeoff is that a mismatched user waits for someone to look at it, instead of quietly getting attached to another person’s data.'
  },
  {
    title: 'One owner for every shared field',
    body:
      'Each field that exists on both sides has exactly one system that owns it, and the field used for matching can’t be changed from either side. That removes most “which side wins” questions before they come up.'
  },
  {
    title: 'Revocations sync, grants don’t',
    body:
      'Removing someone’s access on one side removes it on the other. Granting access never crosses. A bug in the sync can lock someone out, which is visible and fixable, but it can’t give anyone access they shouldn’t have.'
  },
  {
    title: 'Write to the side that can say no first',
    body:
      'When a change has to land in both systems, it goes to the system that might reject it first and is saved locally only after that succeeds. A failure leaves both sides where they were.'
  },
  {
    title: 'Keep the integration small',
    body:
      'The first proposal for the shared service was large and generic. I argued it down to three operations, and the new code wraps the existing login path instead of rewriting it. Less surface meant less to get wrong before the deadline.'
  }
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
          Blueflame builds AI tools for investment firms. A big part of my work was letting people use
          Blueflame and Grata, a sister product, with one account, when each product has its own backend
          and its own user database.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Areas</h2>
            <p>Cross-system identity, data ownership, access control.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>Python, MongoDB, Redis, AWS, Terraform.</p>
          </div>
          <div>
            <h2>Context</h2>
            <p>Two products, two engineering teams, a fixed deadline.</p>
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h3>The problem</h3>
        <p>
          Each product had its own users, organizations, roles and login. A person could be on one
          product, the other, or both. The goal was one account across both, without moving anyone’s data
          and without changing how anyone signs in. Many users sign in through their company’s SSO, which
          neither team controls, so forcing a new login wasn’t an option.
        </p>
        <p>
          The design had to be settled in about two weeks, between two teams that didn’t know each other’s
          systems well. I wrote Blueflame’s side of the design and worked through it with the other team in
          a series of joint reviews.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Key decisions</h3>
        <div className="project-detail__highlights">
          {DECISIONS.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-detail__section">
        <h3>Working across two teams</h3>
        <p>
          Each team had its own picture of how the other system worked, and a lot of early disagreement came
          from that. What helped:
        </p>
        <ul>
          <li>
            Writing things down: a design doc, an access matrix checked against the code, and login sequence
            diagrams, so both teams argued about the same picture.
          </li>
          <li>
            Settling disagreements with evidence, by reading the code or testing the real APIs, rather than
            by who held the stronger opinion. I changed my own position more than once when the data showed
            I was wrong.
          </li>
          <li>
            Bringing people into the same room when we disagreed, instead of working around them.
          </li>
          <li>
            Holding firm in review on changes that could have linked a customer to the wrong data, until
            those paths were closed.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>What I’d do differently</h3>
        <p>
          Around launch I was Blueflame’s point of contact for identity issues. Most of them came from
          assumptions that crossed the boundary, such as one side retrying a request that the other side
          couldn’t safely receive twice. Next time I’d agree on idempotency, cutover order and a repair path
          for every cross-system write during design, not after. A write-once link is only safe if there’s a
          deliberate way to fix it when it’s wrong.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>Before that</h3>
        <div className="project-detail__highlights">
          <article>
            <h4>Data room sharing</h4>
            <p>
              Sharing for virtual data room content that fails closed and applies the same access scope to
              search, RAG and code execution. It rolled out through a staged, dry-run-first backfill.
            </p>
          </article>
          <article>
            <h4>Permissions foundation</h4>
            <p>
              Groups, ACLs and all-or-nothing bulk operations for a workflow product, benchmarked at 10K
              items before the design was settled.
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
