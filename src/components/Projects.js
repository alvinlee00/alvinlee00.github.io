import React from 'react';
import useReveal from '../useReveal';

const PROJECTS = [
  {
    id: 'forecasting',
    title: 'Forecasting agents',
    description:
      'A closed loop that forecasts Kalshi markets four times a day with minimal human input. Research agents gather data through tools that only see what existed at forecast time, code combines and calibrates their answers, and every forecast is scored against the market. Results so far: across 181 settled questions since its Oct 10 design, its Brier score is 0.204 against Kalshi’s 0.192, a gap within the margin of error.',
    tech: 'Python, MCP, Claude',
    year: '2026',
    status: 'In progress',
    slug: 'forecasting'
  },
  {
    id: 'snowflake',
    title: 'Snowflake MCP server',
    description: 'An MCP server with 15+ tools for Snowflake cost, security and anomaly analysis.',
    tech: 'Python, FastMCP, pandas',
    year: '2025',
    slug: 'snowflake-mcp'
  },
  {
    id: 'syncify',
    title: 'Syncify',
    description: 'Moves Spotify playlists to Apple Music, matching ~95% of tracks by ISRC with fuzzy fallbacks.',
    tech: 'FastAPI, React, OAuth 2.0',
    year: '2025',
    slug: 'syncify'
  }
];

function ProjectRow({ project, onSelect }) {
  const content = (
    <>
      <span className="exp-row__company">
        {project.title}
        {project.status ? <span className="badge">{project.status}</span> : null}
      </span>
      <span className="exp-row__role">
        {project.description}
        <span className="exp-row__blurb">{project.tech}</span>
      </span>
      <span className="exp-row__dates">{project.year}</span>
      <span className="exp-row__arrow" aria-hidden="true">
        {project.slug ? '→' : ''}
      </span>
    </>
  );

  if (!project.slug) {
    return <div className="exp-row">{content}</div>;
  }

  return (
    <button
      className="exp-row is-link"
      onClick={() => onSelect(project.slug)}
      aria-label={`${project.title}: read more`}
    >
      {content}
    </button>
  );
}

function Projects({ onProjectSelect }) {
  const [ref, visible] = useReveal();

  const activate = (slug) => {
    if (onProjectSelect) {
      onProjectSelect(slug);
    }
  };

  return (
    <section id="work" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__head">
        <h2 className="section__title">Projects</h2>
        <span className="label">(02)</span>
      </div>

      <div className="exp-list">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.id} project={project} onSelect={activate} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
