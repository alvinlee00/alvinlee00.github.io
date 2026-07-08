import React, { useCallback, useEffect, useState } from 'react';
import useReveal from '../useReveal';

/* Author-facing knobs (see design handoff "Configurable options"). */
const SLIDE_ASPECT = '3 / 2'; // '16 / 9' | '3 / 2' | '4 / 5'
const MATTED = false; // false = full-bleed (#0e0e0e), true = matted (#f4f4f2)
const AUTOPLAY = false; // default off
const AUTOPLAY_MS = 4200;

/* Drop real photos in later: give a slide a `src` (path under /public) and the
   placeholder is replaced by an <img>. `alt` recommended for each. */
const SLIDES = [
  { id: 'street', src: null, alt: 'Street photography' },
  { id: 'portrait', src: null, alt: 'Portrait' },
  { id: 'architecture', src: null, alt: 'Architecture' },
  { id: 'nature', src: null, alt: 'Nature' }
];

const pad2 = (n) => String(n).padStart(2, '0');

function Photography() {
  const [ref, visible] = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const count = SLIDES.length;

  const goTo = useCallback((i) => setActiveIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  useEffect(() => {
    if (!AUTOPLAY) {
      return undefined;
    }
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <section id="photography" ref={ref} className={`section reveal ${visible ? 'visible' : ''}`}>
      <div className="section__index">
        <p className="section__index-num">(04)</p>
        <h2 className="section__index-title">Photography</h2>
        <p className="photo__desc">Light, composition &amp; storytelling through the lens.</p>

        <div className="photo__counter-row">
          <span className="photo__counter">
            {pad2(activeIndex + 1)} / {pad2(count)}
          </span>
          <span className="photo__counter-rule" />
        </div>

        <div className="photo__arrows">
          <button className="photo__arrow" onClick={prev} aria-label="Previous photo">
            ←
          </button>
          <button className="photo__arrow" onClick={next} aria-label="Next photo">
            →
          </button>
        </div>

        <div className="photo__dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              className={`photo__dot ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>

      <div>
        <div
          className={`photo__stage ${MATTED ? 'photo__stage--matted' : ''}`}
          style={{ aspectRatio: SLIDE_ASPECT }}
        >
          <div
            className="photo__track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.id} className={`photo__slide ${MATTED ? 'photo__slide--matted' : ''}`}>
                <div className="photo__slide-inner">
                  {slide.src ? (
                    <img src={slide.src} alt={slide.alt || ''} />
                  ) : (
                    <div className="photo__placeholder">
                      <span>Drop a photo</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Photography;
