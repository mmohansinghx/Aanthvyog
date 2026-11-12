import Link from "next/link";
import { AgentRolePreviews, WorkflowPreview } from "@/components/preview-cards";
import { ArrowIcon, DemoBadge, SectionHeading, Wordmark } from "@/components/ui";

const principles = [
  {
    number: "01",
    title: "Describe the outcome",
    copy: "Start with the people, problem, and change you want to make.",
  },
  {
    number: "02",
    title: "Review the scope",
    copy: "Make requirements and open questions visible before work begins.",
  },
  {
    number: "03",
    title: "Agree on the next step",
    copy: "Keep approval and delivery deliberate, with a clear handover.",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Structured project briefs",
    copy: "Capture product goals, users, requirements, and constraints in one readable request.",
    status: "Interface preview",
  },
  {
    number: "02",
    title: "Versioned decisions",
    copy: "Keep the specification under review visible and tie a future approval to a specific version.",
    status: "Planned",
  },
  {
    number: "03",
    title: "A visible project trail",
    copy: "Make future tasks, activity, and handover easy to inspect at each milestone.",
    status: "Planned",
  },
];

export default function Home() {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Wordmark />
        <nav aria-label="Product navigation" className="landing-nav-links">
          <a href="#product">Product</a>
          <a href="#how-it-works">How it works</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
        </nav>
        <div className="landing-nav-actions">
          <Link className="nav-access-link" href="/access">Access status</Link>
          <Link className="button button-primary button-small" href="/dashboard">
            Explore workspace <ArrowIcon />
          </Link>
        </div>
      </header>

      <section className="landing-hero" id="product">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="kicker-line" />
            PRODUCT DEVELOPMENT, WITH CLARITY
          </div>
          <p className="hero-tagline">Intelligence. United.</p>
          <h1>
            From an Idea to a <span>Complete Digital Product.</span>
          </h1>
          <p className="hero-description">
            Describe your vision. Structure the requirements. Build, validate
            and deliver your web application through a coordinated engineering
            workflow.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/dashboard">
              Explore Workspace <ArrowIcon />
            </Link>
            <a className="quiet-link" href="#how-it-works">
              Discover How It Works <ArrowIcon direction="down" />
            </a>
          </div>
          <div className="hero-proof">
            <DemoBadge>PREVIEW</DemoBadge>
            <span>
              The current application is a frontend preview.
              <strong>No account, database, or AI agents are connected.</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <WorkflowPreview />
          <div className="hero-visual-caption">
            <span className="caption-mark" aria-hidden="true">✳</span>
            <span>Designed for thoughtful handoffs, not rushed automation.</span>
          </div>
        </div>
      </section>

      <section className="landing-section how-section" id="how-it-works">
        <div className="section-intro">
          <p className="eyebrow">A CLEARER WAY TO BUILD</p>
          <h2>Good work starts with shared understanding.</h2>
          <p>
            AANTVYOG is being designed to bring a product request, review, and
            delivery plan into one considered workflow.
          </p>
          <DemoBadge>PROPOSED FLOW</DemoBadge>
        </div>
        <div className="principle-grid">
          {principles.map((item) => (
            <article className="principle-card" key={item.number}>
              <span className="principle-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section capability-section" id="capabilities">
        <SectionHeading
          eyebrow="PRODUCT CAPABILITIES"
          title="The important details stay in view."
          action={<DemoBadge>IN DEVELOPMENT</DemoBadge>}
        />
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.number}>
              <div className="capability-card-top">
                <span>{item.number}</span>
                <DemoBadge>{item.status === "Planned" ? "PLANNED" : "PREVIEW"}</DemoBadge>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section architecture-section">
        <div className="section-intro section-intro-wide">
          <p className="eyebrow">THREE PLANNED PRODUCT ROLES</p>
          <h2>Specialists with clear responsibilities.</h2>
          <p>
            These roles describe the intended product architecture. They are
            design previews only; no agents are connected or executing work.
          </p>
        </div>
        <AgentRolePreviews />
      </section>

      <section className="landing-section trust-section" id="about">
        <article className="trust-card trust-card-sage">
          <span className="trust-icon" aria-hidden="true">01</span>
          <p className="eyebrow">SECURITY-FIRST BY DESIGN</p>
          <h2>Control before execution.</h2>
          <p>
            Planned safeguards include invite-only access, server-side
            ownership checks, explicit approvals, and isolated handling of
            generated work.
          </p>
          <DemoBadge>DESIGN COMMITMENTS · NOT IMPLEMENTED</DemoBadge>
        </article>
        <article className="trust-card">
          <span className="trust-icon trust-icon-outline" aria-hidden="true">02</span>
          <p className="eyebrow">OWNERSHIP & HANDOVER</p>
          <h2>Your project should stay understandable.</h2>
          <p>
            The product is planned to keep project ownership, decisions, and
            delivery notes visible so a person can review and carry the work
            forward.
          </p>
          <DemoBadge>PLANNED</DemoBadge>
        </article>
      </section>

      <section className="landing-cta">
        <div>
          <p className="eyebrow">START WITH A CLEAR BRIEF</p>
          <h2>Bring your idea into focus.</h2>
          <p>Explore the current interface preview using clearly marked sample records.</p>
        </div>
        <Link className="button button-light" href="/dashboard">
          Explore Workspace <ArrowIcon />
        </Link>
      </section>

      <footer className="landing-footer">
        <Wordmark />
        <span>Local interface preview · M1 in progress</span>
        <Link href="/access">Access status <ArrowIcon direction="up-right" /></Link>
      </footer>
    </main>
  );
}
