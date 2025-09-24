import React, { useEffect, useState, useRef } from 'react';

function Experience({ scrollY, onExperienceSelect }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const experiences = [
    {
      id: 1,
      role: 'Software Engineer - Data Platform',
      company: 'PepsiCo',
      dates: '2023 - Present',
      description: 'I design data platforms that get information into the right hands fast--shipping self-service tooling, IaC standards, and governed integrations for PepsiCo teams.',
      focus: 'Airflow automation, Terraform IaC, Snowflake governance',
      slug: 'pepsico-data-platform'
    },
    {
      id: 2,
      hidden: true,
      role: 'Future Role',
      company: 'Coming Soon',
      dates: '',
      description: 'Reserved for future experience entries.'
    },
    {
      id: 3,
      hidden: true,
      role: 'Future Role',
      company: 'Coming Soon',
      dates: '',
      description: 'Reserved for future experience entries.'
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

  const visibleExperiences = experiences.filter((experience) => !experience.hidden);

  return (
    <section id="experience" ref={sectionRef} className="experience-section">
      <div className="experience-container">
        <div className={`experience-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="experience-title">Experience</h2>
        </div>

        <div className="experience-grid">
          {visibleExperiences.map((experience) => (
            <article
              key={experience.id}
              className={`experience-card ${isVisible ? 'visible' : ''}`}
              onClick={() => experience.slug && onExperienceSelect ? onExperienceSelect(experience.slug) : null}
              role={experience.slug ? 'button' : 'article'}
              tabIndex={experience.slug ? 0 : -1}
              onKeyDown={(event) => {
                if (experience.slug && onExperienceSelect && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  onExperienceSelect(experience.slug);
                }
              }}
            >
              <div className="experience-card__meta">
                <span className="experience-card__dates">{experience.dates}</span>
                <span className="experience-card__focus">{experience.focus}</span>
              </div>

              <h3 className="experience-card__role">{experience.role}</h3>
              <h4 className="experience-card__company">{experience.company}</h4>

              <p className="experience-card__description">{experience.description}</p>

              {experience.slug ? (
                <div className="experience-card__cta">
                  <span>View journey</span>
                  <span aria-hidden="true">&gt;</span>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
