import React, { useEffect } from 'react';

function SnowflakeProject({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const resolvePublicPath = (assetPath) => {
    if (!assetPath) {
      return '';
    }

    if (/^https?:\/\//.test(assetPath)) {
      return assetPath;
    }

    const base = process.env.PUBLIC_URL || '';
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
    return `${base}${normalized}`;
  };

  return (
    <article className="project-detail" id="snowflake-detail">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">Personal project + work accelerator · 2025-present</span>
          <span className="project-detail__tag">MCP · Snowflake · Python</span>
        </div>
        <h1 className="project-detail__title">Snowflake MCP Server</h1>
        <p className="project-detail__lede">
          I built a Model Context Protocol server so Claude Desktop can interrogate Snowflake ACCOUNT_USAGE
          telemetry, turning raw operational data into natural-language insights I rely on personally and
          share with teammates at work.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Focus</h2>
            <p>Automating cost, security, and performance reviews with conversational prompts.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>Python MCP server orchestrating Snowflake SQL, Pandas analysis, and Claude interpretations.</p>
          </div>
          <div>
            <h2>Status</h2>
            <p>Runs locally for my account and powers weekly health checks for my team.</p>
          </div>
        </div>
        <div className="project-detail__hero-image project-detail__hero-image--compact">
          <img
            src={resolvePublicPath('mcp-snowflake/mcp_server_in_action.png')}
            alt="Claude Desktop running the Snowflake MCP server session"
          />
        </div>
      </header>

      <section className="project-detail__section">
        <h3>Why I Built It</h3>
        <p>
          I got curious about Model Context Protocol after seeing how Claude servers could extend desktop
          workflows. On nights and weekends I spun up this Snowflake integration as a way to experiment with
          MCP primitives while building something immediately useful for my team.
        </p>
        <p>
          The result lets me trigger performance, security, and cost investigations from plain-language
          prompts. It solves a real reporting gap at work, but the initial prototype and iteration all
          happened on my own time so I could learn the MCP stack properly.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>How It Works</h3>
        <ul>
          <li>
            Registering a custom MCP server inside Claude exposes targeted tools—like performance analyzers
            and role audits—that compile safe SQL against Snowflake ACCOUNT_USAGE.
          </li>
          <li>
            Each tool wraps purpose-built queries with Pandas post-processing so responses include charts,
            summaries, and follow-up recommendations generated from the results.
          </li>
          <li>
            Performance tooling such as <code>performance.py</code> surfaces slow queries, repeated patterns,
            and execution time distributions with actionable remediation steps.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>Product Walkthrough</h3>
        <div className="project-detail__highlights">
          <article>
            <h4>Conversational console</h4>
            <p>
              Natural-language prompts kick off investigations in Claude, and the MCP server handles
              authentication, SQL generation, and result narration without leaving the chat window.
            </p>
          </article>
          <article>
            <h4>Role and access audits</h4>
            <p>
              Dedicated security tools track privilege changes, authentication methods, and anomalies so I
              can verify compliance before handing reports to leadership.
            </p>
          </article>
          <article>
            <h4>Warehouse optimization</h4>
            <p>
              Cost analysis compares warehouse credits, usage trends, and saving opportunities—actionable
              both for my personal budget and the workloads I maintain at the office.
            </p>
          </article>
        </div>
      </section>

      <section className="project-detail__gallery project-detail__gallery--snowflake">
        <figure className="project-detail__gallery-item project-detail__gallery-item--wide">
          <img
            src={resolvePublicPath('mcp-snowflake/mcp_server_in_action.png')}
            alt="Claude Desktop conversation showing the Snowflake MCP server responding"
          />
          <figcaption>Claude drives the MCP server to run Snowflake health checks without manual SQL.</figcaption>
        </figure>
        <figure className="project-detail__gallery-item">
          <img
            src={resolvePublicPath('mcp-snowflake/role_audit.png')}
            alt="Role audit report highlighting permission changes"
          />
          <figcaption>Security tooling highlights role grants and authentication patterns that need review.</figcaption>
        </figure>
        <figure className="project-detail__gallery-item">
          <img
            src={resolvePublicPath('mcp-snowflake/warehouse_optimization_result.png')}
            alt="Warehouse optimization results summarizing credits and opportunities"
          />
          <figcaption>Warehouse optimization calls out costly patterns and credit savings opportunities.</figcaption>
        </figure>
      </section>

      <section className="project-detail__section">
        <h3>Using It Day-to-Day</h3>
        <p>
          The server now handles my weekly Snowflake hygiene checklist—surfacing slow queries, validating
          access, and capturing cost drifts in a couple of prompts. I copy the same summaries into work
          status updates, so personal experiments and production monitoring stay aligned.
        </p>
        <p>
          Next on the roadmap: packaging the server for teammates and layering in alerting so Claude can
          proactively notify me when patterns spike.
        </p>
      </section>

      <footer className="project-detail__footer">
        <button onClick={onBack} className="project-detail__back">
          ← Back to Projects
        </button>
      </footer>
    </article>
  );
}

export default SnowflakeProject;
