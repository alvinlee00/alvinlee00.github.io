import React, { useEffect, useState, useRef } from 'react';

function Contact({ scrollY }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const contactLinks = [
    {
      platform: "Email",
      handle: "alvinlee225@gmail.com",
      url: "mailto:alvinlee225@gmail.com"
    },
    {
      platform: "LinkedIn",
      handle: "Alvin Lee",
      url: "https://www.linkedin.com/in/alvin-lee-2201081ab"
    },
    {
      platform: "GitHub",
      handle: "alvinlee00",
      url: "https://github.com/alvinlee00"
    },
    {
      platform: "Resume",
      handle: "View PDF",
      url: "/Resume_Final.pdf"
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
    <section id="contact" ref={sectionRef} className="section contact-section">
      <div className="contact-container">
        <div className={`section-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">
            Let's Connect
          </h2>
          <p className="section-subtitle">
            Always interested in new opportunities and collaborations
          </p>
        </div>
        
        <div className="contact-links">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="contact-link"
              {...(link.platform === "Resume" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="contact-platform">{link.platform}</span>
              <span className="contact-handle">{link.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;