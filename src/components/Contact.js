import React from 'react';
import useReveal from '../useReveal';

const CONTACTS = [
  { platform: 'Email', handle: 'alvinlee225@gmail.com', url: 'mailto:alvinlee225@gmail.com' },
  { platform: 'LinkedIn', handle: 'Alvin Lee', url: 'https://www.linkedin.com/in/alvin-lee-2201081ab' },
  { platform: 'GitHub', handle: 'alvinlee00', url: 'https://github.com/alvinlee00' },
  { platform: 'Resume', handle: 'View PDF', url: '/Resume_Final.pdf' }
];

const isExternal = (url) => /^https?:\/\//.test(url) || url.endsWith('.pdf');

function Contact() {
  const [ref, visible] = useReveal();

  return (
    <section id="contact" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__index">
        <p className="section__index-num">(05)</p>
        <h2 className="section__index-title">Contact</h2>
        <p className="contact__statement">Let's connect.</p>
      </div>

      <div className="contact__list">
        {CONTACTS.map((contact) => (
          <a
            key={contact.platform}
            href={contact.url}
            className="contact__row"
            {...(isExternal(contact.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="contact__platform">{contact.platform}</span>
            <span className="contact__handle">{contact.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;
