import React, { useEffect } from 'react';

const DECISIONS = [
  {
    title: 'The forecast is saved before the price is read',
    body:
      'The agents never see the market price, volume or anything else that hints at what traders think. A question reaches them with its rules and close date only. The price is read after the forecast is saved, and only for paper trading and scoring. Otherwise it is too easy to build something that copies the market and looks accurate.'
  },
  {
    title: 'The date lives in the tool server, not the model',
    body:
      'Agents get no open web search. Their only tools are my own servers, each started with a fixed as-of time. A server drops anything dated after that time and logs every call before the agent sees the result. The same servers run with a past date for backtests, and a logged run can be replayed with the network off.'
  },
  {
    title: 'Independence comes from different evidence',
    body:
      'Each agent role gets a different slice of the tools and answers a different question, such as where the number that settles the contract stands now, or how often questions like this one resolve yes. Code decides how many agents run. When they disagree, code adds a second wave that goes after the disputed point.'
  },
  {
    title: 'Code combines the answers, not another model',
    body:
      'The agents each return a probability. Code averages them in log-odds and runs the result through a calibration map fitted on past outcomes. This is cheap, auditable and replayable to the digit. An LLM synthesis step is built, but it stays off unless it wins a fair comparison.'
  },
  {
    title: 'Every question ends with a forecast',
    body:
      'A simple fixed pipeline from an earlier version forecasts first and stays as the fallback. If the agents fail, time out, use a tool they shouldn’t, or the usage budget runs low, that forecast is saved instead, with the reason written next to it.'
  },
  {
    title: 'Changes ship as new versions',
    body:
      'The live version is pinned, and an unexpected edit stops the agents instead of changing them. A change is a new version that has to beat the live one on past questions, then again on fresh questions it could not have been tuned on. Rolling back is a single config change.'
  }
];

const chipWidth = (text) => text.length * 6.1 + 18;

function Markers({ id }) {
  return (
    <defs>
      {['ink', 'accent', 'muted'].map((tone) => (
        <marker
          key={tone}
          id={`${id}-${tone}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path className={`fg-head fg-head--${tone}`} d="M2,1.5 L8,5 L2,8.5" />
        </marker>
      ))}
      <pattern id={`${id}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line className="fg-hatch" x1="0" y1="0" x2="0" y2="8" />
      </pattern>
    </defs>
  );
}

function Node({ x, y, w, h, title, sub, tone = 'card', step, stack, pill }) {
  const lines = Array.isArray(sub) ? sub : sub ? [sub] : [];
  const top = y + h / 2 - (lines.length * 14) / 2 + 4;
  const r = pill ? h / 2 : 14;
  return (
    <g className={`fg-node fg-node--${tone}`}>
      {stack
        ? [12, 6].map((d) => (
            <rect key={d} className="fg-shape fg-shape--back" x={x + d} y={y - d} width={w} height={h} rx={r} />
          ))
        : null}
      <rect className="fg-shape" x={x} y={y} width={w} height={h} rx={r} />
      {step ? (
        <g>
          <circle className="fg-step" cx={x + 2} cy={y + 2} r="10" />
          <text className="fg-step-text" x={x + 2} y={y + 5.5} textAnchor="middle">
            {step}
          </text>
        </g>
      ) : null}
      <text className="fg-title" x={x + w / 2} y={top} textAnchor="middle">
        {title}
      </text>
      {lines.map((line, i) => (
        <text key={line} className="fg-sub" x={x + w / 2} y={top + 16 + i * 14} textAnchor="middle">
          {line}
        </text>
      ))}
    </g>
  );
}

function Chip({ x, y, text, tone = 'plain', anchor = 'middle' }) {
  const w = chipWidth(text);
  const left = anchor === 'start' ? x : x - w / 2;
  return (
    <g className={`fg-chip fg-chip--${tone}`}>
      <rect x={left} y={y - 10} width={w} height="20" rx="10" />
      <text x={left + w / 2} y={y + 3.5} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

function Edge({ d, id, tone = 'ink', dashed, both }) {
  const marker = `url(#${id}-${tone})`;
  return (
    <path
      className={`fg-edge fg-edge--${tone}${dashed ? ' fg-edge--dashed' : ''}`}
      d={d}
      markerEnd={marker}
      markerStart={both ? marker : undefined}
    />
  );
}

function QuestionPathFigure() {
  const id = 'fg1';
  return (
    <svg
      viewBox="0 0 720 382"
      role="img"
      aria-label="One question's path. The question, with rules only, gets a baseline forecast, then research agents call as-of tool servers. Code combines and calibrates their answers and the forecast is saved. If the agents can't run, the baseline is saved instead. Only after the save is the market price read, the forecast paper traded, and scored when the question resolves."
    >
      <Markers id={id} />

      <rect className="fg-zone" x="0" y="236" width="720" height="136" rx="18" />
      <rect className="fg-zone-hatch" x="0" y="236" width="720" height="136" rx="18" fill={`url(#${id}-hatch)`} />
      <Chip x={20} y={266} text="after the save · price visible" anchor="start" tone="ink" />
      <Chip x={8} y={20} text="blind to the market" anchor="start" />

      <Edge id={id} tone="muted" dashed d="M208 72 C 208 22, 660 22, 660 68" />
      <Chip x={434} y={35} text="fallback if the agents can’t run" />

      <Node x={8} y={76} w={112} h={64} title="Question" sub="rules, close date" step="1" />
      <Node x={150} y={76} w={116} h={64} title="Baseline" sub="fixed pipeline" step="2" />
      <Node x={298} y={82} w={136} h={58} title="Research agents" sub="count set by code" tone="accent" stack step="3" />
      <Node x={474} y={76} w={110} h={64} title="Combine" sub="log-odds, calibrate" step="4" />
      <Node x={608} y={76} w={104} h={64} title="Saved" sub="the forecast" tone="ink" step="5" />

      <Edge id={id} d="M122 108 H146" />
      <Edge id={id} d="M268 110 H294" />
      <Edge id={id} d="M450 108 H470" />
      <Edge id={id} d="M586 108 H604" />

      <Node x={302} y={170} w={128} h={38} title="As-of tools" tone="card" pill />
      <Edge id={id} tone="accent" both d="M366 142 V166" />

      <Edge id={id} d="M660 142 C 660 216, 370 214, 370 290" />

      <Node x={150} y={296} w={116} h={56} title="Market price" tone="ghost" />
      <Node x={310} y={296} w={120} h={56} title="Paper trade" />
      <Node x={560} y={296} w={140} h={56} title="Scored" sub="vs. outcome, vs. market" />
      <Edge id={id} d="M268 324 H306" />
      <Edge id={id} d="M432 324 H556" />
      <Chip x={494} y={306} text="at resolution" />
    </svg>
  );
}

function ToolServerFigure() {
  const id = 'fg2';
  const kept = [222, 258, 300, 334, 366];
  const dropped = [430, 462, 486];
  return (
    <svg
      viewBox="0 14 720 254"
      role="img"
      aria-label="An as-of tool server. The date is fixed when an agent run starts. The agent calls a tool, the server fetches from free public sources, keeps only what is dated before the as-of time, records the call in a ledger, and returns the result. In replay, the server answers from the ledger with the network off."
    >
      <Markers id={id} />

      <Node x={6} y={98} w={124} h={64} title="Agent" sub="no web, no price" tone="accent" stack />
      <Edge id={id} tone="accent" d="M134 112 C 156 96, 166 96, 184 100" />
      <Chip x={158} y={78} text="call" tone="accent" />
      <Edge id={id} d="M184 160 C 166 164, 156 164, 134 148" />
      <Chip x={150} y={186} text="result" />

      <rect className="fg-container" x="190" y="24" width="320" height="222" rx="20" />
      <text className="fg-title fg-title--left" x="212" y="56">
        As-of tool server
      </text>
      <Chip x={418} y={51} text="date fixed at launch" tone="accent" />

      <line className="fg-axis" x1="212" y1="140" x2="492" y2="140" />
      {kept.map((cx) => (
        <circle key={cx} className="fg-dot" cx={cx} cy="140" r="6" />
      ))}
      {dropped.map((cx) => (
        <g key={cx}>
          <circle className="fg-dot fg-dot--dropped" cx={cx} cy="140" r="6" />
          <line className="fg-strike" x1={cx - 5} y1="145" x2={cx + 5} y2="135" />
        </g>
      ))}
      <line className="fg-cut" x1="398" y1="98" x2="398" y2="182" />
      <Chip x={398} y={92} text="as-of" tone="accent" />
      <text className="fg-sub" x="294" y="174" textAnchor="middle">
        kept
      </text>
      <text className="fg-sub" x="458" y="174" textAnchor="middle">
        dropped
      </text>
      <text className="fg-sub fg-sub--left" x="212" y="222">
        Also strips any mention of market prices.
      </text>

      <Node x={570} y={40} w={146} h={58} title="Sources" sub="free public data" />
      <Node x={570} y={150} w={146} h={58} title="Ledger" sub="every call and result" tone="soft" />
      <Edge id={id} both d="M512 76 C 536 70, 546 69, 566 69" />
      <Chip x={538} y={52} text="fetch" />
      <Edge id={id} d="M512 172 C 536 178, 546 179, 566 179" />
      <Chip x={538} y={198} text="record" />
      <text className="fg-note fg-note--small" x="643" y="236" textAnchor="middle">
        replays read from here,
      </text>
      <text className="fg-note fg-note--small" x="643" y="254" textAnchor="middle">
        network off
      </text>
    </svg>
  );
}

const RING = { cx: 360, cy: 216, rx: 232, ry: 150 };
const onRing = (deg) => {
  const t = (deg * Math.PI) / 180;
  return [RING.cx + RING.rx * Math.cos(t), RING.cy - RING.ry * Math.sin(t)].map((v) => Math.round(v));
};
const ringArc = (from, to) => {
  const [x1, y1] = onRing(from);
  const [x2, y2] = onRing(to);
  return `M${x1} ${y1} A ${RING.rx} ${RING.ry} 0 0 1 ${x2} ${y2}`;
};

function LoopFigure() {
  const id = 'fg3';
  const chip = (deg, text, tone) => {
    const [x, y] = onRing(deg);
    return <Chip x={x} y={y} text={text} tone={tone} />;
  };
  return (
    <svg
      viewBox="0 12 720 400"
      role="img"
      aria-label="The improvement loop, drawn as a ring. The live cycle writes every forecast to a record, which the market's outcomes grade. A builder reads where the agents lost and makes a new version, backtested on past questions. A verifier on a different model re-tests it on fresh questions and either promotes it to the live cycle or rolls back."
    >
      <Markers id={id} />
      <ellipse className="fg-track" cx={RING.cx} cy={RING.cy} rx={RING.rx} ry={RING.ry} />

      <Edge id={id} tone="accent" d={ringArc(64, 26)} />
      <Edge id={id} tone="accent" d={ringArc(-26, -64)} />
      <Edge id={id} tone="accent" d={ringArc(-116, -154)} />
      <Edge id={id} tone="accent" d={ringArc(154, 116)} />
      {chip(45, 'forecasts')}
      {chip(-45, 'where it lost')}
      {chip(-135, 'nominate if it wins')}
      {chip(135, 'promote')}

      <Edge id={id} tone="muted" dashed d="M206 186 C 236 156, 262 130, 284 102" />
      <Chip x={258} y={168} text="or roll back" />

      <Node x={272} y={30} w={176} h={70} title="Live cycle" sub={['forecasts a batch of', 'questions, a few times a day']} tone="ink" step="1" />
      <Node x={506} y={182} w={176} h={70} title="Record" sub={['each forecast, the baseline,', 'and the outcome']} step="2" />
      <Node x={272} y={332} w={176} h={70} title="Builder" sub={['new version from misses,', 'backtested on past questions']} tone="accent" step="3" />
      <Node x={38} y={182} w={176} h={70} title="Verifier" sub={['a different model re-tests', 'it on unseen questions']} tone="accent" step="4" />

      <text className="fg-note" x="372" y="210" textAnchor="middle">
        the market’s outcome
      </text>
      <text className="fg-note" x="372" y="232" textAnchor="middle">
        grades every forecast
      </text>
    </svg>
  );
}

// Live record from the forecasting-agents scoreboard (docs/team/FORECASTER.md), as of 2026-10-22 14:00 UTC.
// Resolved questions with a Kalshi midpoint saved at forecast time; gap = forecaster Brier minus Kalshi Brier.
const RECORD = [
  { title: 'Single call', sub: 'GPT-5.6 Luna', dates: 'to Sep 22', n: 189, brier: 0.206, market: 0.121, gap: '+0.085' },
  { title: 'Single call', sub: 'GPT-6 Luna', dates: 'Sep 22–23', n: 17, brier: 0.299, market: 0.067, gap: '+0.232', thin: true },
  { title: 'Fixed pipeline', sub: 'Claude, no tools', dates: 'Sep 23–30', n: 231, brier: 0.226, market: 0.128, gap: '+0.099' },
  { title: 'Research agents', sub: 'Claude, as-of tools', dates: 'Sep 30 – now', n: 328, brier: 0.186, market: 0.147, gap: '+0.039' }
];

const SCORE_LABEL = `Brier score of each live forecaster version against Kalshi's price on the same questions, lower is better. ${RECORD.map(
  (r) => `${r.title} (${r.sub}, ${r.dates}, ${r.n} questions): ${r.brier} vs Kalshi ${r.market}, gap ${r.gap}.`
).join(' ')}`;

const PLOT = { left: 64, right: 704, top: 66, bottom: 296, max: 0.32 };
const yAt = (v) => PLOT.bottom - (v / PLOT.max) * (PLOT.bottom - PLOT.top);
const colX = (i) => PLOT.left + ((i + 0.5) * (PLOT.right - PLOT.left)) / RECORD.length - 14;

function ScoreFigure() {
  const id = 'fg4';
  const points = RECORD.map((r, i) => `${colX(i)},${yAt(r.brier).toFixed(1)}`).join(' ');
  return (
    <svg
      className="fg-wide"
      viewBox="0 0 720 392"
      role="img"
      aria-label={SCORE_LABEL}
    >
      <Markers id={id} />

      <Chip x={8} y={20} text="live forecasts · blind to price" anchor="start" tone="ink" />
      <g className="fg-key">
        <circle className="fg-mark fg-mark--agent" cx="498" cy="20" r="5.5" />
        <text className="fg-sub fg-sub--left" x="510" y="24">
          forecaster
        </text>
        <circle className="fg-mark fg-mark--market" cx="592" cy="20" r="5.5" />
        <text className="fg-sub fg-sub--left" x="604" y="24">
          Kalshi, same questions
        </text>
      </g>

      {[0, 0.1, 0.2, 0.3].map((v) => (
        <g key={v}>
          <line className="fg-grid" x1={PLOT.left} y1={yAt(v)} x2={PLOT.right} y2={yAt(v)} />
          <text className="fg-tick" x={PLOT.left - 12} y={yAt(v) + 3.5} textAnchor="end">
            {v.toFixed(2)}
          </text>
        </g>
      ))}
      <text className="fg-tick" x={PLOT.left - 12} y={PLOT.top - 22} textAnchor="end">
        Brier
      </text>
      <text className="fg-tick" x={PLOT.left - 12} y={PLOT.top - 10} textAnchor="end">
        ↓ better
      </text>

      <polyline className="fg-trend" points={points} />

      {RECORD.map((r, i) => {
        const x = colX(i);
        const yA = yAt(r.brier);
        const yM = yAt(r.market);
        const mid = (yA + yM) / 2;
        return (
          <g key={r.sub} className={r.thin ? 'fg-col fg-col--thin' : 'fg-col'}>
            <rect className="fg-gap" x={x - 7} y={yA - 7} width="14" height={yM - yA + 14} rx="7" />
            <circle className="fg-mark fg-mark--market" cx={x} cy={yM} r="6" />
            <circle className="fg-mark fg-mark--agent" cx={x} cy={yA} r="6.5" />
            <text className="fg-value" x={x - 14} y={yA + 4} textAnchor="end">
              {r.brier.toFixed(3)}
            </text>
            <text className="fg-value fg-value--muted" x={x - 14} y={yM + 4} textAnchor="end">
              {r.market.toFixed(3)}
            </text>
            <Chip x={x + 14} y={mid} text={`gap ${r.gap}`} anchor="start" tone={i === RECORD.length - 1 ? 'accent' : 'plain'} />
          </g>
        );
      })}

      {RECORD.map((r, i) => {
        const x = colX(i) + 14;
        return (
          <g key={`label-${r.sub}`}>
            <circle className="fg-step" cx={x} cy="322" r="10" />
            <text className="fg-step-text" x={x} y="325.5" textAnchor="middle">
              {i + 1}
            </text>
            <text className="fg-title" x={x} y="354" textAnchor="middle">
              {r.title}
            </text>
            <text className="fg-sub" x={x} y="370" textAnchor="middle">
              {r.sub}
            </text>
            <text className="fg-sub" x={x} y="385" textAnchor="middle">
              {r.dates} · {r.n} questions
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const ROW = { left: 24, right: 290, max: 0.3, top: 62, height: 96 };
const xAt = (v) => ROW.left + (v / ROW.max) * (ROW.right - ROW.left);

function ScoreFigureCompact() {
  const bottom = ROW.top + RECORD.length * ROW.height;
  return (
    <svg className="fg-compact" viewBox={`0 0 340 ${bottom + 44}`} role="img" aria-label={SCORE_LABEL}>
      <Chip x={4} y={14} text="live forecasts · blind to price" anchor="start" tone="ink" />
      <circle className="fg-mark fg-mark--agent" cx="10" cy="42" r="5.5" />
      <text className="fg-sub fg-sub--left" x="22" y="46">
        forecaster
      </text>
      <circle className="fg-mark fg-mark--market" cx="104" cy="42" r="5.5" />
      <text className="fg-sub fg-sub--left" x="116" y="46">
        Kalshi, same questions
      </text>

      {[0, 0.1, 0.2, 0.3].map((v) => (
        <g key={v}>
          {RECORD.map((r, i) => (
            <line
              key={r.sub}
              className="fg-grid"
              x1={xAt(v)}
              y1={ROW.top + i * ROW.height + 48}
              x2={xAt(v)}
              y2={ROW.top + i * ROW.height + 80}
            />
          ))}
          <text className="fg-tick" x={xAt(v)} y={bottom + 20} textAnchor="middle">
            {v.toFixed(2)}
          </text>
        </g>
      ))}
      <text className="fg-tick" x={ROW.right} y={bottom + 38} textAnchor="end">
        Brier · lower is better
      </text>

      {RECORD.map((r, i) => {
        const y0 = ROW.top + i * ROW.height;
        const y = y0 + 64;
        const xA = xAt(r.brier);
        const xM = xAt(r.market);
        const gap = `gap ${r.gap}`;
        return (
          <g key={r.sub} className={r.thin ? 'fg-col fg-col--thin' : 'fg-col'}>
            <circle className="fg-step" cx="14" cy={y0 + 18} r="10" />
            <text className="fg-step-text" x="14" y={y0 + 21.5} textAnchor="middle">
              {i + 1}
            </text>
            <text className="fg-title fg-title--left" x="32" y={y0 + 23}>
              {r.title}
            </text>
            <Chip
              x={336 - chipWidth(gap)}
              y={y0 + 18}
              text={gap}
              anchor="start"
              tone={i === RECORD.length - 1 ? 'accent' : 'plain'}
            />
            <text className="fg-sub fg-sub--left" x="32" y={y0 + 40}>
              {r.sub} · {r.dates} · {r.n} questions
            </text>
            <rect className="fg-gap" x={xM - 7} y={y - 7} width={xA - xM + 14} height="14" rx="7" />
            <circle className="fg-mark fg-mark--market" cx={xM} cy={y} r="6" />
            <circle className="fg-mark fg-mark--agent" cx={xA} cy={y} r="6.5" />
            <text className="fg-value fg-value--muted" x={xM - 12} y={y + 4} textAnchor="end">
              {r.market.toFixed(3)}
            </text>
            <text className="fg-value" x={xA + 12} y={y + 4} textAnchor="start">
              {r.brier.toFixed(3)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Figure({ number, caption, children }) {
  return (
    <figure className="project-detail__figure">
      <div className="project-detail__figure-art">{children}</div>
      <figcaption>
        <span className="label">Figure {number}</span>
        {caption}
      </figcaption>
    </figure>
  );
}

function ForecastingProject({ onBack }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <article className="project-detail" id="forecasting-project">
      <header className="project-detail__hero">
        <div className="project-detail__meta">
          <span className="project-detail__badge">2026</span>
          <span className="project-detail__tag">In progress</span>
        </div>
        <h1 className="project-detail__title">Forecasting agents</h1>
        <p className="project-detail__lede">
          A side project that forecasts Kalshi questions a few times a day. Research agents look things up
          through tools that only see what existed at forecast time, code combines their answers into one
          probability, and the market’s outcome grades it. Around that sits a loop that tries to improve the
          forecaster with as little input from me as possible.
        </p>
        <div className="project-detail__summary">
          <div>
            <h2>Areas</h2>
            <p>Agent orchestration, evaluation, calibration.</p>
          </div>
          <div>
            <h2>Stack</h2>
            <p>Python, MCP, Claude.</p>
          </div>
          <div>
            <h2>Status</h2>
            <p>Running on paper and a demo account. No real money.</p>
          </div>
        </div>
      </header>

      <section className="project-detail__section">
        <h3>Why forecasting</h3>
        <p>
          I’m interested in closed loops: systems that run, measure themselves and improve without someone
          steering every step. Most agent demos are hard to grade. Forecasting isn’t. Every question
          resolves, so every forecast gets a score, and the market’s own price at the same moment is a fair
          bar to beat. That makes it a good place to find out how far a mostly unattended agent loop can go.
        </p>
      </section>

      <section className="project-detail__section">
        <h3>One question, end to end</h3>
        <p>
          Each cycle picks a batch of open questions. For each one, a fixed pipeline makes a quick baseline
          forecast. Then a small team of research agents works the question with their own tools, and code
          turns their answers into the forecast that gets saved.
        </p>
        <Figure
          number="1"
          caption=" Everything outside the shaded area is blind to the market. The baseline is only read by code, to decide how much effort a question gets and to stand in if the agents can’t run."
        >
          <QuestionPathFigure />
        </Figure>
      </section>

      <section className="project-detail__section">
        <h3>Tools that can’t see the future</h3>
        <p>
          The hardest part to get right was making sure an agent only knows what existed at the time of the
          forecast. Web search returns today’s web, which leaks outcomes into backtests and makes them look
          much better than they are. So the agents only get tools I wrote, and the date is enforced on the
          server side.
        </p>
        <Figure
          number="2"
          caption=" The model never holds the date, so no prompt can talk it into a later one. Because every call is logged before the agent sees it, a run can be audited and replayed exactly."
        >
          <ToolServerFigure />
        </Figure>
      </section>

      <section className="project-detail__section">
        <h3>Key decisions</h3>
        <div className="project-detail__highlights">
          {DECISIONS.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-detail__section">
        <h3>The improvement loop</h3>
        <p>
          The forecaster is run by a few scheduled agents. One runs the live cycle. One reads where the
          forecasts lost to the market and builds a new version to fix it. A third, on a different model,
          checks that version on questions that closed after it was built, and only then promotes it. I get a
          daily summary and step in for decisions the loop can’t make on its own.
        </p>
        <Figure
          number="3"
          caption=" The builder can only nominate. Promotion needs a second check on fresh questions, so a version can’t win by being tuned to the questions it was tested on."
        >
          <LoopFigure />
        </Figure>
      </section>

      <section className="project-detail__section">
        <h3>Results so far</h3>
        <p>
          Short version: the agents are still well behind Kalshi. I’m keeping the numbers here anyway, because
          this page is partly a log of the project, and the starting point is part of that.
        </p>
        <p>
          Every live forecast is scored with the Brier score once its question settles: the squared distance
          between the probability and what happened, so 0 is perfect and always saying 50% scores 0.25. Each
          version was scored on the questions it forecast while it was live, and those sets differ, so the fair
          comparison is the gap to Kalshi’s own price on the same questions. A positive gap means the forecaster
          did worse than the market; zero would be a tie.
        </p>
        <p>
          Every version so far has a positive gap. The research agents are the closest, at +0.039, which still
          means their forecasts carry clearly more error than the market price. Most of the step down came from
          switching to research agents. The improvement loop hasn’t produced a measurable gain on top of that yet.
        </p>
        <Figure
          number="4"
          caption=" Live forecasts only, not backtests, as of October 22, 2026. Gap is the forecaster’s Brier minus Kalshi’s; above zero means behind the market. Each forecast was saved before the price was read; Kalshi’s score uses its midpoint at that moment. Counts are questions that have settled. The second version ran for one day, so its 17 questions say little. For the research agents, the gap’s 90% interval is +0.022 to +0.055, clear of the fixed pipeline’s +0.075 to +0.123."
        >
          <ScoreFigure />
          <ScoreFigureCompact />
        </Figure>
      </section>

      <section className="project-detail__section">
        <h3>Where it stands</h3>
        <p>
          The goal is to close that gap, then beat the market, on questions nobody tuned on. I don’t know yet
          whether that’s reachable. Next I want to see whether a lead agent that plans its own research does
          better than the fixed roles, and to widen the tools for topics where the agents keep losing. I’ll
          update the chart as new versions go live.
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

export default ForecastingProject;
