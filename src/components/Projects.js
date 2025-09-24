import React, { useEffect, useState, useRef } from 'react';

function Projects({ scrollY, onProjectSelect }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const projects = [
    {
      id: 1,
      title: "Snowflake MCP Server",
      description: "Personal MCP server that I also rely on at work to turn Snowflake ACCOUNT_USAGE telemetry into natural-language insights. Claude-powered workflows cover security audits, cost breakdowns, and performance triage without hand-writing SQL.",
      tech: "Python, Snowflake, MCP Protocol",
      year: "2025",
      category: "Data Infrastructure",
      size: "large",
      image: "mcp-snowflake/placeholder_project_snowflake_mcp.png",
      imageClass: "project-image--contain",
      slug: "snowflake-mcp"
    },
    {
      id: 2,
      title: "Syncify",
      description: "Personal project that keeps my Spotify discoveries in lockstep with Apple Music. Uses ISRC matching with fuzzy fallbacks, real-time sync feedback, and OAuth-secured connections so every playlist stays identical across both services without manual upkeep.",
      tech: "FastAPI, Python, JavaScript, Spotify API, Apple Music API, OAuth 2.0",
      year: "2025",
      category: "Web Application",
      size: "large",
      image: "syncify/placeholder_project_syncify.png",
      slug: "syncify"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-container">
        <div className={`projects-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="projects-title">Projects</h2>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-item ${project.size} ${isVisible ? 'visible' : ''}`}
              onClick={() => project.slug && onProjectSelect ? onProjectSelect(project.slug) : null}
              role={project.slug ? 'button' : 'article'}
              tabIndex={project.slug ? 0 : -1}
              onKeyDown={(event) => {
                if (project.slug && onProjectSelect && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  onProjectSelect(project.slug);
                }
              }}
            >
              <div className={`project-image ${project.imageClass ? project.imageClass : ''}`}>
                <img src={resolvePublicPath(project.image)} alt={project.title} />
              </div>
              
              <div className="project-content">
                <div className="project-meta">
                  <span className="project-year">{project.year}</span>
                  <span className="project-tech-summary">{project.tech.split(',')[0]}</span>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  <span>{project.tech}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
