import Link from "next/link";
import { ProductShell } from "@/components/product-shell";
import { ArrowIcon, ArrowLink, PageHeading, StatusPill } from "@/components/ui";
import { demoProjects } from "@/lib/demo-data";

function ActivityGlyph({ kind }: { kind: string }) {
  const glyph = kind === "approval" ? "✓" : kind === "requirements" ? "≋" : "↗";
  return <span className={`activity-glyph glyph-${kind}`} aria-hidden="true">{glyph}</span>;
}

export default function DashboardPage() {
  const pending = demoProjects.filter((project) => project.status === "awaiting_approval").length;
  const inFlight = demoProjects.filter((project) => project.status === "in_progress").length;

  return (
    <ProductShell active="overview">
      <PageHeading
        eyebrow="THURSDAY · 12 NOVEMBER"
        title="A little more clarity, every day."
        description="A preview of the project room, using sample records to show how the work could feel."
        action={<Link className="button button-dark" href="/projects/new">New project request <ArrowIcon /> </Link>}
      />

      <section className="metric-grid" aria-label="Example project counts">
        <article className="metric-card metric-highlight"><div className="metric-top"><span>EXAMPLE PROJECTS</span><span className="metric-spark">✳</span></div><div className="metric-value">{String(demoProjects.length).padStart(2, "0")}</div><p>Static preview records</p><div className="metric-foot"><span className="metric-caption">NOT ACCOUNT DATA</span><span className="foot-arrow"><ArrowIcon /></span></div></article>
        <article className="metric-card"><div className="metric-top"><span>AWAITING REVIEW</span><span className="metric-symbol">◷</span></div><div className="metric-value">{String(pending).padStart(2, "0")}</div><p>Example requests</p><div className="metric-foot"><span className="metric-caption">NO APPROVAL RECORDED</span><span className="foot-arrow"><ArrowIcon /></span></div></article>
        <article className="metric-card"><div className="metric-top"><span>IN PROGRESS</span><span className="metric-symbol">↗</span></div><div className="metric-value">{String(inFlight).padStart(2, "0")}</div><p>AI execution is not enabled</p><div className="metric-foot"><span className="metric-caption">INTERFACE PREVIEW ONLY</span><span className="foot-arrow"><ArrowIcon /></span></div></article>
      </section>

      <div className="dashboard-grid">
        <section className="panel projects-panel" id="projects">
          <div className="panel-heading"><div><p className="eyebrow">SAMPLE PROJECT ROOM</p><h2>Example projects <span className="count-tag">{demoProjects.length}</span></h2></div><Link className="panel-link" href="/projects/new">Start a request <ArrowIcon /></Link></div>
          <div className="project-list">
            {demoProjects.map((project) => (
              <article className="project-row" key={project.id}>
                <div className="project-monogram" aria-hidden="true">{project.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</div>
                <div className="project-row-main"><Link href={`/projects/${project.id}`} className="project-title">{project.name}</Link><p>{project.summary}</p><span className="project-updated">{project.updated} <span>·</span> {project.ownerLabel}</span></div>
                <div className="project-row-end"><StatusPill status={project.status} /><Link href={`/projects/${project.id}`} className="round-link" aria-label={`Open ${project.name}`}><ArrowIcon /></Link></div>
              </article>
            ))}
          </div>
          <div className="panel-bottom-note"><span className="info-mark">i</span>These are static UI fixtures, not saved user projects.<ArrowLink href="/access">Access status</ArrowLink></div>
        </section>

        <aside className="dashboard-side-column">
          <section className="next-step-card">
            <div className="next-step-kicker"><span className="sparkle">✳</span> A GOOD NEXT STEP</div>
            <h2>Bring an idea<br />into focus.</h2>
            <p>Capture the outcome, intended users and the first requirements in one structured brief.</p>
            <Link className="button button-cream" href="/projects/new">Preview a new request <ArrowIcon /></Link>
            <div className="next-step-orbit" aria-hidden="true" />
          </section>
          <section className="activity-panel">
            <div className="panel-heading compact"><div><p className="eyebrow">SAMPLE TIMELINE</p><h2>Recent activity</h2></div><Link href={`/projects/${demoProjects[0].id}/activity`} className="icon-link" aria-label="Open sample activity"><ArrowIcon /></Link></div>
            <div className="activity-list">
              {demoProjects[0].activity.slice(0, 2).map((event) => (
                <div className="activity-item" key={event.id}><ActivityGlyph kind={event.kind} /><div><strong>{event.title}</strong><p>{event.detail}</p><time>{event.time}</time></div></div>
              ))}
            </div>
            <p className="activity-footnote">No agents are running in this preview.</p>
          </section>
          <section className="agent-empty panel" aria-label="Agent activity status">
            <div className="agent-empty-icon" aria-hidden="true">✳</div>
            <div><p className="eyebrow">AGENT ACTIVITY</p><h2>Not connected</h2><p>No AI provider or agent execution is configured for this local preview.</p></div>
            <span className="status-pill status-draft">No runs</span>
          </section>
        </aside>
      </div>

      <section className="milestone-strip"><div className="milestone-icon" aria-hidden="true">✳</div><div><span className="eyebrow">MILESTONE 1 · FRONTEND FOUNDATION</span><strong>The screens are taking shape.</strong><p>Authentication, database persistence and approval recording are not connected yet.</p></div><Link href="/access" aria-label="See what is connected"><ArrowIcon direction="up-right" /></Link></section>
    </ProductShell>
  );
}
