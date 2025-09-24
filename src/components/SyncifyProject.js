import React, { useEffect } from 'react';

function SyncifyProject({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
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
    <article className="project-detail" id="syncify-detail">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">Personal project · 2025-present</span>
          <span className="project-detail__tag">FastAPI · React · OAuth 2.0</span>
        </div>
        <h1 className="project-detail__title">Syncify</h1>
        <p className="project-detail__lede">
          I wanted Spotify's generative playlists without giving up Apple Music's sound quality, so I
          built a local bridge that keeps both libraries in sync without manual playlist rebuilds.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Focus</h2>
            <p>Designing an end-to-end workflow that mirrors curated playlists across services.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>FastAPI backend, React client, and local workers orchestrating long-running syncs.</p>
          </div>
          <div>
            <h2>Status</h2>
            <p>Running locally for my library with plans to self-host on a personal server.</p>
          </div>
        </div>
        <div className="project-detail__hero-image">
          <img src={resolvePublicPath('syncify/placeholder_project_syncify.png')} alt="Syncify hero overview" />
        </div>
      </header>

      <section className="project-detail__section">
        <h3>Why I Built It</h3>
        <p>
          Spotify's discovery features and collaborative playlists are unmatched, but my headphones
          sound noticeably better through Apple Music. Maintaining two ecosystems manually meant
          constant copy-paste work, broken metadata, and playlists that fell out of sync almost
          immediately.
        </p>
        <p>
          Syncify gives me the best of both worlds by automatically mirroring Spotify playlists into
          Apple Music using the official APIs, preserving descriptions and ordering without
          needing to re-create anything by hand.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>How It Works</h3>
        <ul>
          <li>
            FastAPI service brokers OAuth-secured access to Spotify and Apple Music, storing refresh
            tokens locally and rotating access keys automatically.
          </li>
          <li>
            Matching pipeline prioritizes ISRC identifiers and falls back to fuzzy artist/title checks
            to achieve ~97% match accuracy across my library.
          </li>
          <li>
            Background workers batch long-running sync jobs, while the React client streams progress
            updates so I can monitor matches in real time.
          </li>
        </ul>
      </section>

      <section className="project-detail__section">
        <h3>Product Walkthrough</h3>
        <div className="project-detail__highlights">
          <article>
            <h4>Connected services</h4>
            <p>
              Guided setup connects both providers, validates scopes, and confirms that playlists are
              ready for syncing before I start a job.
            </p>
          </article>
          <article>
            <h4>Live sync console</h4>
            <p>
              Progress modal surfaces track counts, unmatched items, and elapsed time so I know when a
              playlist is safe to play on Apple Music.
            </p>
          </article>
          <article>
            <h4>Playlist picker</h4>
            <p>
              A searchable playlist selector keeps large libraries manageable and shows ownership and
              track counts before syncing.
            </p>
          </article>
        </div>
      </section>

      <section className="project-detail__gallery">
        <figure>
          <img src={resolvePublicPath('syncify/sync_auth.png')} alt="Connected services dashboard showing Spotify and Apple Music" />
          <figcaption>Current connections stay green when both APIs are authenticated and healthy.</figcaption>
        </figure>
        <figure>
          <img src={resolvePublicPath('syncify/sync_complete.png')} alt="Sync progress modal showing completion stats" />
          <figcaption>Real-time sync modal reports match rate, duration, and unmatched tracks.</figcaption>
        </figure>
        <figure>
          <img src={resolvePublicPath('syncify/sync_playlist_ui.png')} alt="Playlist selector listing Spotify playlists" />
          <figcaption>Playlist picker makes it easy to target specific Spotify collections.</figcaption>
        </figure>
      </section>

      <section className="project-detail__section">
        <h3>Using It Day-to-Day</h3>
        <p>
          Syncify now handles every new playlist I create. A typical 600-track sync finishes in a few
          minutes and keeps playlist ordering intact, so my Apple Music devices always mirror what
          I discover on Spotify.
        </p>
        <p>
          Next steps include moving the stack to a lightweight home server and exploring adapters for
          YouTube Music once I am happy with the reliability of the core flow.
        </p>
      </section>

      <footer className="project-detail__footer">
        <button onClick={onBack} className="project-detail__back">
          ← Back to Projects
        </button>
      </footer>
    </article>
  );
}

export default SyncifyProject;
