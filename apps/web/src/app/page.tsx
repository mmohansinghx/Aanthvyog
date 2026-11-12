import Link from "next/link";
import { ArrowIcon, Wordmark } from "@/components/ui";

const principles = [
  { number: "01", title: "Start with the brief", copy: "Turn an early idea into requirements a team can review." },
  { number: "02", title: "Keep decisions visible", copy: "Make approvals and project changes easy to follow." },
  { number: "03", title: "Move with intention", copy: "Build only after people understand what they are agreeing to." },
];

export default function Home() {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Wordmark />
        <nav aria-label="Main navigation" className="landing-nav-links">
          <a href="#approach">Approach</a>
          <Link href="/access">Access status</Link>
          <Link className="button button-small button-dark" href="/dashboard">Open preview <ArrowIcon /></Link>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-line" />A clearer way to shape software</div>
          <h1>Make the idea<br />clear <span>before</span><br />the build begins.</h1>
          <p className="hero-description">AANTVYOG gives project requests a thoughtful home — from the first rough brief to a reviewed specification and a visible next step.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/dashboard">Explore the local preview <ArrowIcon /></Link>
            <Link className="quiet-link" href="/access">How access will work <ArrowIcon /></Link>
          </div>
          <div className="hero-proof"><span className="proof-mark">✳</span><span><strong>Milestone 1 interface preview</strong><br />No AI execution · no account connection · no database writes</span></div>
        </div>

        <div className="hero-art" aria-label="Illustration of an example project request moving through review">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-label art-label-top"><span>01</span> IDEA</div>
          <div className="idea-card">
            <div className="idea-card-top"><span className="tiny-spark">✳</span><span>REQUEST PREVIEW</span><span className="sample-tag">SAMPLE</span></div>
            <h2>A space for studio work</h2>
            <p>Bookings, follow-ups and the small details that keep a day moving.</p>
            <div className="idea-card-divider" />
            <div className="idea-list-row"><span className="check-outline">✓</span> Weekly booking overview</div>
            <div className="idea-list-row"><span className="check-outline">✓</span> Clear request intake</div>
            <div className="idea-list-row"><span className="check-outline">✓</span> Follow-up list</div>
            <div className="idea-card-footer"><span>SPECIFICATION</span><strong>v3</strong><span className="footer-rule" /><span className="footer-pending">Awaiting review</span></div>
          </div>
          <div className="floating-note note-review"><span className="note-icon">◷</span><span><strong>Review first</strong><small>Every decision in view</small></span></div>
          <div className="floating-note note-calm"><span className="note-sun">✳</span><span><strong>Thoughtful by design</strong><small>Clear steps, calm pace</small></span></div>
          <div className="art-label art-label-bottom"><span>02</span> CLARITY</div>
          <div className="art-bottom-caption">An example only. This preview is not connected to a database.</div>
        </div>
      </section>

      <section className="landing-strip" id="approach">
        <div className="strip-intro"><span className="eyebrow">THE AANTVYOG APPROACH</span><h2>Make the next step<br />feel considered.</h2></div>
        {principles.map((item) => (
          <article className="principle" key={item.number}>
            <span className="principle-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
      <footer className="landing-footer"><Wordmark /><span>Local interface preview · M1 in progress</span><Link href="/dashboard">Explore the preview <ArrowIcon /></Link></footer>
    </main>
  );
}
