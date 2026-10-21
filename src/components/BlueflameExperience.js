import React, { useEffect } from 'react';

const CASES = [
  {
    title: 'On Grata, new to Blueflame',
    body:
      'Grata creates the user on Blueflame through a privileged API. Creation is idempotent on email: the same email in the same account links to the existing user, and the same email in a different account is refused. They keep their Grata password.'
  },
  {
    title: 'On Blueflame, new to Grata',
    body:
      'Blueflame creates the user on Grata, and first creates a Grata org for the account if it doesn’t have one, in the account’s own region. They keep their Blueflame login: Grata’s login page sends them to Blueflame and back.'
  },
  {
    title: 'Already on both',
    body:
      'Matched once by email, then linked by writing Grata’s user ID onto the existing Blueflame user. The link is write-once. Replaying the same ID is fine, and a different ID is refused instead of overwritten. Nothing on the Blueflame side is copied or moved.'
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
          Blueflame builds AI tools for investment firms. Most of my second half there went into one
          problem: letting customers of Blueflame and Grata use both products with one login, when each
          product has its own backend and its own user database.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Areas</h2>
            <p>Cross-system identity, account merging, provisioning, permissions.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>Python, MongoDB / DocumentDB, Redis, AWS, Terraform, Auth0.</p>
          </div>
          <div>
            <h2>Context</h2>
            <p>Two companies, two backends, a fixed launch date, and two weeks of design reviews.</p>
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h3>The problem</h3>
        <p>
          Grata and Blueflame each had their own users, orgs, roles and login. For the joint launch, a
          customer had to be able to move between the two without losing anything on either side, and
          most Blueflame users signed in through their company’s SSO, which we couldn’t move on our
          schedule.
        </p>
        <p>
          The design was settled in about two weeks of meetings between the two teams. Neither team knew
          the other’s system well, so a lot of the work was finding out which proposals rested on wrong
          assumptions about the other side.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>The approach</h3>
        <p>
          Link the two records instead of merging them. Both products keep their own user table. A person
          on both is matched once, then joined on Grata’s stable user ID. No data and no passwords move,
          so a customer’s history stays where it was, and each account can be moved over on its own and
          moved back.
        </p>
        <p>
          I wrote Blueflame’s RFC for this, and the shared design came out of the joint reviews. That left
          three cases to get right.
        </p>
        <div className="project-detail__highlights">
          {CASES.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-detail__section">
        <h3>Decisions I made or pushed for</h3>
        <ul>
          <li>
            Refuse conflicts instead of overwriting them. If two users claim the same ID, or one user is
            offered a different ID, the request fails and someone looks at it. A bad match can’t quietly
            attach one person’s data to another account.
          </li>
          <li>
            Give every shared field one owner. Grata owns the user ID. Blueflame owns licenses, modules and
            seats. Names can be edited on either side. The primary email can’t change from either side,
            because it’s what the match is based on.
          </li>
          <li>
            Revoking access crosses between the systems, granting never does. Removing someone on one side
            removes them on the other, but the sync can’t give anyone new access.
          </li>
          <li>
            Seat limits go to Grata first and are saved on our side only after Grata accepts, so a limit Grata
            rejects never takes effect on our side.
          </li>
          <li>Never guess a region. US accounts pair with US, EU with EU, and anything else is refused.</li>
          <li>
            No automatic re-pairing when a link goes missing. One misconfigured URL would have relinked
            every customer.
          </li>
          <li>
            Keep the shared service small. The first proposal was a large generated service. I argued it
            down to three operations (resolve a user, resolve an org, create a user) and wrapped the
            existing login path instead of rewriting it right before launch.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>Working across the two teams</h3>
        <p>
          Each team had its own idea of how the other system worked. A few of the disagreements I led on
          our side:
        </p>
        <ul>
          <li>
            Where the sync to Grata should run. The Grata side wanted it out of Blueflame’s user save, which
            they read as the persistence layer. I showed from the code that it was a business layer, and
            set up a joint meeting instead of working around them. We settled on a service layer above
            save that kept my sync rules.
          </li>
          <li>
            Which Auth0 ID to key on. I started out arguing for keeping Auth0 IDs. Tests I ran against
            Auth0’s API showed lookups lagged right after a create, so I changed my position: look users
            up by email and tag every Auth0 record a person has.
          </li>
          <li>
            Mapping one Grata org to several Blueflame accounts, which firms keep separate for information
            barriers. I held Grata’s changes until secondary orgs were opt-in and promoting an org was
            refused once Blueflame had already paired it. Both were adopted.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>Launch</h3>
        <p>
          Around launch I was Blueflame’s main contact for identity incidents. One example: duplicate
          accounts turned out to be Grata retrying account creation on a timeout shorter than our create
          took. I found it by matching timestamps between our AWS logs and Grata’s Datadog logs.
        </p>
        <p>
          The lesson I took from it: a write-once link needs a repair path. When a Grata test database was
          restored from an old snapshot, the links on our side pointed at orgs that no longer existed, and
          the only fix was a manual repair.
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
