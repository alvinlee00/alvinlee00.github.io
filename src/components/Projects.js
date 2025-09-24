import React, { useEffect, useState, useRef } from 'react';

function Projects({ scrollY }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const projects = [
    {
      id: 1,
      title: "Snowflake MCP Server",
      description: "Model Context Protocol server that turns Snowflake ACCOUNT_USAGE data into natural-language insights. Includes AI-assisted query builder, schema exploration, security anomaly detection, and performance/cost optimization tooling surfaced directly inside Claude.",
      tech: "Python, Snowflake, MCP Protocol",
      year: "2025",
      category: "Data Infrastructure",
      size: "large",
      image: "syncify/placeholder_project_snowflake_mcp.png",
      imageClass: "project-image--contain"
    },
    {
      id: 2,
      title: "Syncify",
      description: "Universal playlist synchronization service enabling seamless transfer between Spotify and Apple Music. Features ISRC-based matching with fuzzy fallback algorithms, achieving 97% track matching accuracy. Real-time progress tracking with detailed sync reports and OAuth authentication for secure API access.",
      tech: "FastAPI, Python, JavaScript, Spotify API, Apple Music API, OAuth 2.0",
      year: "2025",
      category: "Web Application",
      size: "large",
      image: "syncify/placeholder_project_syncify.png"
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
            >
              <div className={`project-image ${project.imageClass ? project.imageClass : ''}`}>
                <img src={project.image} alt={project.title} />
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
