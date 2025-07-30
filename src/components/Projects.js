import React, { useEffect, useState, useRef } from 'react';

function Projects({ scrollY }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A minimalist React portfolio featuring smooth animations, gradient backgrounds, and responsive design. Built with modern web technologies and deployed on GitHub Pages.",
      tech: "React, CSS Animations, GitHub Pages",
      year: "2024",
      category: "Web Development",
      size: "large"
    },
    {
      id: 2,
      title: "Machine Learning Platform",
      description: "Interactive platform for exploring ML algorithms with real-time visualizations and educational content. Features dynamic data processing and algorithm comparisons.",
      tech: "Python, JavaScript, D3.js, Flask",
      year: "2023", 
      category: "Machine Learning",
      size: "medium"
    },
    {
      id: 3,
      title: "E-Commerce Application",
      description: "Full-stack e-commerce solution with inventory management, payment processing, and user authentication. Scalable architecture with modern frameworks.",
      tech: "React, Node.js, MongoDB, Stripe API",
      year: "2023",
      category: "Full Stack",
      size: "small"
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      description: "Real-time analytics dashboard for business intelligence with interactive charts, filtering capabilities, and export functionality.",
      tech: "Vue.js, Chart.js, Firebase, REST APIs",
      year: "2024",
      category: "Data Visualization", 
      size: "medium"
    },
    {
      id: 5,
      title: "Mobile Productivity App",
      description: "Cross-platform mobile application for task management and productivity tracking with offline functionality and cloud sync.",
      tech: "React Native, SQLite, Firebase, Redux",
      year: "2023",
      category: "Mobile Development",
      size: "large"
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
              <div className="project-image">
                <div className="project-placeholder">
                  <span className="project-category">{project.category}</span>
                </div>
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