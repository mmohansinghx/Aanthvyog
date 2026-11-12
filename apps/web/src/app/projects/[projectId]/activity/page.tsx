import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductShell } from "@/components/product-shell";
import { PageHeading, StatusPill } from "@/components/ui";
import { getDemoProject } from "@/lib/demo-data";

function EventMarker({ kind }: { kind: string }) {
  const marker = kind === "approval" ? "✓" : kind === "requirements" ? "≋" : "↗";
  return <span className={`timeline-marker glyph-${kind}`} aria-hidden="true">{marker}</span>;
}

export default async function ProjectActivityPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getDemoProject(projectId);
  if (!project) notFound();

  return (
    <ProductShell active="projects">
      <div className="back-link-row"><Link className="back-link" href={`/projects/${project.id}`}><span aria-hidden="true">←</span> Project overview</Link><span className="sample-route-label">SAMPLE TIMELINE</span></div>
      <PageHeading eyebrow="PROJECT ACTIVITY · EXAMPLE" title="A visible trail of decisions." description={`A static example timeline for ${project.name}. No events are written to an audit log.`} action={<StatusPill status={project.status} />} />
      <div className="workspace-tabs" role="navigation" aria-label="Project sections">
        <Link className="workspace-tab" href={`/projects/${project.id}`}>Overview</Link>
        <Link className="workspace-tab" href={`/projects/${project.id}/approval`}>Approval</Link>
        <Link className="workspace-tab is-selected" href={`/projects/${project.id}/activity`}>Activity</Link>
      </div>

      <section className="panel timeline-panel">
        <div className="panel-heading"><div><p className="eyebrow">PROJECT HISTORY</p><h2>Recent events</h2></div><span className="sample-route-label">DEMO FIXTURE</span></div>
        <div className="timeline-list">
          {project.activity.map((event, index) => (
            <article className="timeline-event" key={event.id}>
              <div className="timeline-rail"><EventMarker kind={event.kind} />{index < project.activity.length - 1 ? <span className="timeline-stem" /> : null}</div>
              <div className="timeline-copy"><div className="timeline-copy-head"><h3>{event.title}</h3><time>{event.time}</time></div><p>{event.detail}</p><span className="event-source">EXAMPLE EVENT · {event.kind.toUpperCase()}</span></div>
            </article>
          ))}
        </div>
        <div className="timeline-disclaimer"><span className="info-mark">i</span><p><strong>Audit events are not implemented yet.</strong><br />These sample rows only demonstrate the activity interface; no user action, approval, or agent run has been recorded.</p></div>
      </section>
    </ProductShell>
  );
}
