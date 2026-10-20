import React from 'react';
import useReveal from '../useReveal';

const PROJECTS = [
  {
    id: 'snowflake',
    title: 'Snowflake MCP Server',
    meta: '2025 · Python, MCP',
    description:
      'Plain-language security audits, cost breakdowns and performance triage over Snowflake telemetry, with 15+ tools behind one MCP server.',
    image: 'mcp-snowflake/placeholder_project_snowflake_mcp.png',
    slug: 'snowflake-mcp'
  },
  {
    id: 'syncify',
    title: 'Syncify',
    meta: '2025 · FastAPI, React',
    description:
      'Keeps Spotify and Apple Music libraries in step using ISRC matching with fuzzy fallbacks, at ~95% track match accuracy.',
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
      <div className="section__head">
        <h2 className="section__title">
          Selected <em>work</em>
        </h2>
        <span className="label">(02)</span>
      </div>

      <div className="cards">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            className="card"
            onClick={() => onProjectSelect && onProjectSelect(project.slug)}
          >
            <span className="card__image">
              <img src={resolvePublicPath(project.image)} alt="" />
              <span className="card__cta" aria-hidden="true">
                View case study ↗
              </span>
            </span>
            <span className="card__row">
              <span className="card__title">{project.title}</span>
              <span className="card__meta">{project.meta}</span>
            </span>
            <span className="card__desc">{project.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Projects;
