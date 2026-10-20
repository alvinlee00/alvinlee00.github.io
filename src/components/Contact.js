import React from 'react';

const CONTACTS = [
  { platform: 'alvinlee225@gmail.com', url: 'mailto:alvinlee225@gmail.com' },
  { platform: 'LinkedIn ↗', url: 'https://www.linkedin.com/in/alvin-lee-2201081ab' },
  { platform: 'GitHub ↗', url: 'https://github.com/alvinlee00' },
  { platform: 'Resume ↗', url: '/Resume_Final.pdf' }
];

const isExternal = (url) => /^https?:\/\//.test(url) || url.endsWith('.pdf');

function Contact() {
  return (
    <section id="contact" className="contact">
      <p className="label">(05) Contact</p>
      <a className="contact__big" href="mailto:alvinlee225@gmail.com">
        Let’s <em>talk</em> <span aria-hidden="true">↗</span>
      </a>

      <ul className="contact__list">
        {CONTACTS.map((contact) => (
          <li key={contact.url}>
            <a
              href={contact.url}
              {...(isExternal(contact.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {contact.platform}
            </a>
          </li>
        ))}
      </ul>

      <div className="contact__foot">
        <span>© 2026 Alvin Lee</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </div>
    </section>
  );
}

export default Contact;
