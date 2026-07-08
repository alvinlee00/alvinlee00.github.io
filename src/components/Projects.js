import React from 'react';
import useReveal from '../useReveal';

const PROJECTS = [
  {
    id: 'snowflake',
    year: '2025',
    category: 'Data Infrastructure',
    title: 'Snowflake MCP Server',
    description:
      'A personal MCP server I also rely on at work to turn Snowflake ACCOUNT_USAGE telemetry into natural-language insights — security audits, cost breakdowns, and performance triage without hand-writing SQL.',
    tech: 'Python · Snowflake · MCP Protocol',
    image: 'mcp-snowflake/placeholder_project_snowflake_mcp.png',
    imageLabel: 'snowflake mcp — screenshot',
    slug: 'snowflake-mcp'
  },
  {
    id: 'syncify',
    year: '2025',
    category: 'Web Application',
    title: 'Syncify',
    description:
      'Keeps my Spotify discoveries in lockstep with Apple Music using ISRC matching with fuzzy fallbacks, real-time sync feedback, and OAuth-secured connections.',
    tech: 'FastAPI · Spotify API · Apple Music API · OAuth 2.0',
    image: 'syncify/placeholder_project_syncify.png',
    imageLabel: 'syncify — screenshot',
    slug: 'syncify'
  }
];

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

function Projects({ onProjectSelect }) {
  const [ref, visible] = useReveal();

  const activate = (slug) => {
    if (slug && onProjectSelect) {
      onProjectSelect(slug);
    }
  };

  return (
    <section id="work" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__index">
        <p className="section__index-num">(03)</p>
        <h2 className="section__index-title">Selected Work</h2>
      </div>

      <div>
        {PROJECTS.map((project) => {
          const clickable = Boolean(project.slug);
          return (
            <article
              key={project.id}
              className={`work-item ${clickable ? 'is-link' : ''}`}
              onClick={clickable ? () => activate(project.slug) : undefined}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              onKeyDown={(event) => {
                if (clickable && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  activate(project.slug);
                }
              }}
            >
              <div>
                <div className="work-item__meta">
                  <span>{project.year}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="work-item__title">{project.title}</h3>
                <p className="work-item__desc">{project.description}</p>
                <p className="work-item__tech">{project.tech}</p>
                {clickable ? (
                  <span className="detail-cue">
                    Read case study <span aria-hidden="true">→</span>
                  </span>
                ) : null}
              </div>

              <div className="work-item__image">
                {project.image ? (
                  <img src={resolvePublicPath(project.image)} alt={project.title} />
                ) : (
                  <span className="work-item__image-label">{project.imageLabel}</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
