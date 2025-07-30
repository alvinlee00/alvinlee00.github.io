import React, { useEffect, useState, useRef } from 'react';

function Photography({ scrollY }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const photographyStyles = [
    {
      style: "Street Photography",
      description: "Capturing candid moments in urban landscapes and city life"
    },
    {
      style: "Portraits",
      description: "Natural light and environmental portraits with authentic emotion"
    },
    {
      style: "Architecture",
      description: "Geometric compositions and structural details in modern design"
    },
    {
      style: "Nature",
      description: "Landscapes and natural textures showcasing organic beauty"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="photography" ref={sectionRef} className="section photography-section">
      <div className="photography-container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">
            Photography Portfolio
          </h2>
          <p className="section-subtitle">
            Exploring light, composition, and storytelling through the lens
          </p>
        </div>
        
        <div className={`gallery-placeholder ${isVisible ? 'visible' : ''}`}>
          <div className="placeholder-text">Gallery Coming Soon</div>
          <p className="placeholder-subtitle">
            Curating a collection of my favorite shots
          </p>
        </div>
        
        <div className="photography-styles">
          {photographyStyles.map((item, index) => (
            <div 
              key={index} 
              className={`style-card ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <h4 className="style-name">{item.style}</h4>
              <p className="style-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Photography;