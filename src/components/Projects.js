import React from 'react';
import useReveal from '../useReveal';

const PROJECTS = [
  {
    id: 'snowflake',
    year: '2025',
    title: 'Snowflake Analytics MCP Server',
    description:
      'An MCP server with 15+ tools that turns Snowflake ACCOUNT_USAGE telemetry into plain-language security audits, cost breakdowns and performance triage, secured with RSA key auth.',
    tech: ['Python', 'FastMCP', 'pandas', 'Snowflake'],
    image: 'mcp-snowflake/placeholder_project_snowflake_mcp.png',
    slug: 'snowflake-mcp'
  },
  {
    id: 'syncify',
    year: '2025',
    title: 'Syncify',
    description:
      'Keeps Spotify and Apple Music libraries in step using ISRC matching with fuzzy fallbacks, reaching ~95% track match accuracy, with live sync feedback and OAuth-secured connections.',
    tech: ['FastAPI', 'React', 'OAuth 2.0'],
    image: 'syncify/placeholder_project_syncify.png',
    slug: 'syncify'
  }
];

const resolvePublicPath = (assetPath) => {
  const base = process.env.PUBLIC_URL || '';
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  return `${base}${normalized}`;
};

function Projects({ onProjectSelect }) {
  const [ref, visible] = useReveal();

  return (
    <section id="work" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <h2 className="section__label">Projects</h2>

      <div className="cards">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            className="card"
            onClick={() => onProjectSelect && onProjectSelect(project.slug)}
          >
            <span className="card__image">
              <img src={resolvePublicPath(project.image)} alt="" />
            </span>
            <span className="card__meta">{project.year}</span>
            <span className="card__title">
              {project.title} <span aria-hidden="true">→</span>
            </span>
            <span className="card__desc">{project.description}</span>
            <span className="tags">
              {project.tech.map((tech) => (
                <span key={tech} className="tags__item">
                  {tech}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Projects;
