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

function Arrowheads({ id }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path className="fg-head" d="M0,0 L10,5 L0,10 z" />
      </marker>
    </defs>
  );
}

function Box({ x, y, w, h, title, sub, variant }) {
  const lines = Array.isArray(sub) ? sub : sub ? [sub] : [];
  const top = y + h / 2 - (lines.length * 14) / 2 + 4;
  return (
    <g>
      <rect className={`fg-box${variant ? ` fg-box--${variant}` : ''}`} x={x} y={y} width={w} height={h} />
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

function QuestionPathFigure() {
  const m = 'url(#fg-a1)';
  return (
    <svg
      viewBox="0 0 680 320"
      role="img"
      aria-label="One question's path. The question, with rules only, gets a baseline forecast, then research agents call as-of tool servers. Code combines and calibrates their answers and the forecast is saved. If the agents can't run, the baseline is saved instead. Below the blind boundary the market price is read, the forecast is paper traded, and it is scored when the question resolves."
    >
      <Arrowheads id="fg-a1" />

      <path className="fg-line fg-line--dashed" d="M195 44 V18 H625 V42" markerEnd={m} />
      <text className="fg-label" x="410" y="12" textAnchor="middle">
        fallback if the agents can’t run
      </text>

      <Box x={0} y={44} w={110} h={56} title="Question" sub="rules, close date" />
      <Box x={140} y={44} w={110} h={56} title="Baseline" sub="fixed pipeline" />
      <Box x={280} y={44} w={120} h={56} title="Research agents" sub="count set by code" variant="strong" />
      <Box x={430} y={44} w={110} h={56} title="Combine" sub="log-odds, calibrate" />
      <Box x={570} y={44} w={110} h={56} title="Saved forecast" variant="strong" />

      <line className="fg-line" x1="110" y1="72" x2="138" y2="72" markerEnd={m} />
      <line className="fg-line" x1="250" y1="72" x2="278" y2="72" markerEnd={m} />
      <line className="fg-line" x1="400" y1="72" x2="428" y2="72" markerEnd={m} />
      <line className="fg-line" x1="540" y1="72" x2="568" y2="72" markerEnd={m} />

      <Box x={280} y={132} w={120} h={44} title="As-of tools" variant="soft" />
      <line className="fg-line" x1="325" y1="100" x2="325" y2="130" markerEnd={m} markerStart={m} />
      <text className="fg-label" x="333" y="120">
        calls
      </text>

      <line className="fg-boundary" x1="0" y1="206" x2="680" y2="206" />
      <text className="fg-label fg-label--ink" x="0" y="198">
        BLIND BOUNDARY · the market price is read only below this line
      </text>

      <line className="fg-line" x1="625" y1="100" x2="625" y2="232" markerEnd={m} />

      <Box x={280} y={234} w={120} h={50} title="Scored" sub="vs. outcome, vs. market" />
      <Box x={430} y={234} w={110} h={50} title="Market price" variant="soft" />
      <Box x={570} y={234} w={110} h={50} title="Paper trade" />

      <line className="fg-line" x1="540" y1="259" x2="568" y2="259" markerEnd={m} />
      <path className="fg-line" d="M625 284 V306 H340 V286" markerEnd={m} />
      <text className="fg-label" x="482" y="300" textAnchor="middle">
        at resolution
      </text>
    </svg>
  );
}

function ToolServerFigure() {
  const m = 'url(#fg-a2)';
  return (
    <svg
      viewBox="0 0 680 230"
      role="img"
      aria-label="An as-of tool server. When an agent run starts, the server is launched with a fixed date. The agent calls a tool, the server fetches from the source, drops anything dated after the as-of time, records the call in a ledger, and returns the result. In replay, the server answers from the ledger with the network off."
    >
      <Arrowheads id="fg-a2" />

      <Box x={0} y={50} w={120} h={56} title="Agent" sub="no web, no price" />
      <rect className="fg-box fg-box--strong" x={200} y={24} width={220} height={108} />
      <text className="fg-title" x="310" y="50" textAnchor="middle">
        As-of tool server
      </text>
      <text className="fg-sub" x="310" y="74" textAnchor="middle">
        date fixed at launch
      </text>
      <text className="fg-sub" x="310" y="90" textAnchor="middle">
        drops anything after it
      </text>
      <text className="fg-sub" x="310" y="106" textAnchor="middle">
        strips talk of market prices
      </text>

      <Box x={500} y={24} w={180} h={44} title="Sources" sub="free public data" />
      <Box x={500} y={88} w={180} h={44} title="Ledger" sub="every call and result" variant="soft" />
      <Box x={200} y={176} w={220} h={44} title="Run starts" sub="sets the as-of time" variant="soft" />

      <line className="fg-line" x1="120" y1="68" x2="198" y2="68" markerEnd={m} />
      <text className="fg-label" x="159" y="61" textAnchor="middle">
        call
      </text>
      <line className="fg-line" x1="200" y1="92" x2="122" y2="92" markerEnd={m} />
      <text className="fg-label" x="159" y="108" textAnchor="middle">
        result
      </text>
      <line className="fg-line" x1="420" y1="46" x2="498" y2="46" markerEnd={m} markerStart={m} />
      <text className="fg-label" x="459" y="39" textAnchor="middle">
        fetch
      </text>
      <line className="fg-line" x1="420" y1="110" x2="498" y2="110" markerEnd={m} />
      <text className="fg-label" x="459" y="103" textAnchor="middle">
        record
      </text>
      <line className="fg-line" x1="310" y1="176" x2="310" y2="134" markerEnd={m} />

      <text className="fg-label" x="590" y="152" textAnchor="middle">
        replay: answer from here,
      </text>
      <text className="fg-label" x="590" y="166" textAnchor="middle">
        network off
      </text>
    </svg>
  );
}

function LoopFigure() {
  const m = 'url(#fg-a3)';
  return (
    <svg
      viewBox="0 0 680 300"
      role="img"
      aria-label="The improvement loop. The live cycle writes every forecast to a record, which the market's outcomes grade. A builder reads where the agents missed and makes a new version, backtested on past questions. A verifier on a different model re-tests it on fresh questions and either promotes it to the live cycle or rolls back."
    >
      <Arrowheads id="fg-a3" />

      <Box x={20} y={30} w={220} h={76} title="Live cycle" sub={['forecasts a batch of questions', 'a few times a day']} variant="strong" />
      <Box x={440} y={30} w={220} h={76} title="Record" sub={['each forecast, the baseline', 'beside it, and the outcome']} />
      <Box x={440} y={194} w={220} h={76} title="Builder" sub={['makes a new version from misses,', 'backtests it on past questions']} />
      <Box x={20} y={194} w={220} h={76} title="Verifier" sub={['a different model re-tests it', 'on questions it hasn’t seen']} />

      <line className="fg-line" x1="240" y1="68" x2="438" y2="68" markerEnd={m} />
      <text className="fg-label" x="339" y="60" textAnchor="middle">
        forecasts
      </text>
      <line className="fg-line" x1="550" y1="106" x2="550" y2="192" markerEnd={m} />
      <text className="fg-label" x="560" y="146">
        where it lost
      </text>
      <text className="fg-label" x="560" y="160">
        to the market
      </text>
      <line className="fg-line" x1="440" y1="232" x2="242" y2="232" markerEnd={m} />
      <text className="fg-label" x="341" y="224" textAnchor="middle">
        nominate if it wins
      </text>
      <line className="fg-line" x1="90" y1="194" x2="90" y2="108" markerEnd={m} />
      <text className="fg-label" x="82" y="154" textAnchor="end">
        promote
      </text>
      <line className="fg-line fg-line--dashed" x1="170" y1="194" x2="170" y2="108" markerEnd={m} />
      <text className="fg-label" x="178" y="154">
        roll back
      </text>

      <text className="fg-note" x="341" y="150" textAnchor="middle">
        the market’s outcome
      </text>
      <text className="fg-note" x="341" y="166" textAnchor="middle">
        grades every forecast
      </text>
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
          caption=" Everything above the dashed line is blind to the market. The baseline is only read by code, to decide how much effort a question gets and to stand in if the agents can’t run."
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
        <h3>Where it stands</h3>
        <p>
          The agentic version went live this fall, and I’m still measuring it. The honest question is whether
          the agents beat the simple baseline, and then the market, on questions nobody tuned on. That takes a
          few months of resolved questions to answer. Next I want to see whether a lead agent that plans its
          own research does better than the fixed roles, and to widen the tools for topics where the agents
          keep losing.
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
