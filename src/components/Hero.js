import React from 'react';

const LINKS = [
  { label: 'Resume', url: '/Resume_Final.pdf' },
  { label: 'GitHub', url: 'https://github.com/alvinlee00' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alvin-lee-2201081ab' },
  { label: 'Email', url: 'mailto:alvinlee225@gmail.com' }
];

const STATS = [
  { value: '160', label: 'PRs shipped across 9 repos in 2026' },
  { value: '99%', label: 'Workspace query latency cut, 90 ms to 0.8 ms' },
  { value: '15K', label: 'Workspaces covered by a staged, fail-closed backfill' },
  { value: '<1 hr', label: 'Snowflake provisioning, down from 2 days at PepsiCo' }
];

function Hero() {
  return (
    <header id="top" className="hero">
      <p className="eyebrow">
        <span className="status-dot" aria-hidden="true" />
        Software Engineer at Blueflame AI
      </p>

      <h1 className="hero__title">
        Alvin Lee builds the identity, permission and data layers that AI products depend on.
      </h1>

      <p className="hero__lead">
        At Blueflame I led our side of the Auth0 identity integration with Grata for a cross-company
        platform launch, from the RFC through the launch-week incidents. Before that I spent two and a
        half years on PepsiCo's data platform. I like careful systems, small diffs and proof before fixes.
      </p>

      <div className="hero__links">
        {LINKS.map((link) => {
          const external = /^https?:\/\//.test(link.url) || link.url.endsWith('.pdf');
          return (
            <a
              key={link.label}
              href={link.url}
              className={`pill ${link.label === 'Resume' ? 'pill--solid' : ''}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          );
        })}
      </div>

      <dl className="stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="stats__item">
            <dt className="stats__value">{stat.value}</dt>
            <dd className="stats__label">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export default Hero;
