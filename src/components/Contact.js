import React from 'react';
import useReveal from '../useReveal';

const CONTACTS = [
  { platform: 'Email', handle: 'alvinlee225@gmail.com', url: 'mailto:alvinlee225@gmail.com' },
  { platform: 'LinkedIn', handle: 'in/alvin-lee', url: 'https://www.linkedin.com/in/alvin-lee-2201081ab' },
  { platform: 'GitHub', handle: 'alvinlee00', url: 'https://github.com/alvinlee00' },
  { platform: 'Resume', handle: 'PDF', url: '/Resume_Final.pdf' }
];

const isExternal = (url) => /^https?:\/\//.test(url) || url.endsWith('.pdf');

function Contact() {
  const [ref, visible] = useReveal();

  return (
    <section id="contact" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <h2 className="section__label">Contact</h2>

      <div>
        <p className="contact__lead">
          Open to conversations about senior engineering roles, identity and platform work.
        </p>
        <a className="contact__email" href="mailto:alvinlee225@gmail.com">
          alvinlee225@gmail.com <span aria-hidden="true">↗</span>
        </a>

        <ul className="contact__list">
          {CONTACTS.map((contact) => (
            <li key={contact.platform}>
              <a
                href={contact.url}
                className="contact__row"
                {...(isExternal(contact.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span>{contact.platform}</span>
                <span className="contact__handle">
                  {contact.handle} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
