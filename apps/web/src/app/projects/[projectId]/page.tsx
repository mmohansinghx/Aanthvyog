import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductShell } from "@/components/product-shell";
import { ArrowIcon, PageHeading, StatusPill } from "@/components/ui";
import { getDemoProject } from "@/lib/demo-data";

function stageForStatus(status: string) {
  if (status === "draft") return 0;
  if (status === "requirements") return 1;
  if (status === "awaiting_approval") return 2;
  return 3;
}

export default async function ProjectWorkspacePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getDemoProject(projectId);
  if (!project) notFound();

  return (
    <ProductShell active="projects">
      <div className="back-link-row"><Link className="back-link" href="/dashboard#projects"><span aria-hidden="true">←</span> All example projects</Link><span className="sample-route-label">STATIC FIXTURE</span></div>
      <PageHeading eyebrow="PROJECT WORKSPACE · SAMPLE" title={project.name} description={project.summary} action={<StatusPill status={project.status} />} />
      <div className="workspace-tabs" role="navigation" aria-label="Project sections">
        <Link className="workspace-tab is-selected" href={`/projects/${project.id}`}>Overview</Link>
        <Link className="workspace-tab" href={`/projects/${project.id}/approval`}>Approval <span className="tab-dot" /></Link>
        <Link className="workspace-tab" href={`/projects/${project.id}/activity`}>Activity</Link>
      </div>

      <section className="stage-tracker" aria-label="Example project progress">
        <div className="stage-tracker-heading"><span className="eyebrow">SAMPLE PROJECT FLOW</span><span>Illustrative status only</span></div>
        <ol>{["Request", "Requirements", "Approval", "Delivery"].map((stage, index) => <li className={index < stageForStatus(project.status) ? "stage-done" : index === stageForStatus(project.status) ? "stage-current" : ""} key={stage}><span className="stage-marker">{index < stageForStatus(project.status) ? "✓" : String(index + 1).padStart(2, "0")}</span><span>{stage}</span></li>)}</ol>
      </section>

      <div className="workspace-grid">
        <section className="panel brief-panel">
          <div className="panel-heading"><div><p className="eyebrow">STRUCTURED REQUEST</p><h2>The brief at a glance</h2></div><span className="version-chip">SPEC v{project.request.specificationVersion}</span></div>
          <div className="brief-field"><span className="brief-label">INTENDED OUTCOME</span><p>{project.request.objective}</p></div>
          <div className="brief-field"><span className="brief-label">WHO IT IS FOR</span><p>{project.request.audience}</p></div>
          <div className="brief-field"><span className="brief-label">KEY REQUIREMENTS</span><ul className="check-list">{project.request.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul></div>
          <div className="brief-field"><span className="brief-label">CONSTRAINTS</span><ul className="constraint-list">{project.request.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></div>
          <div className="brief-bottom-note"><span className="info-mark">i</span>Example specification only. No user data is stored.</div>
        </section>

        <aside className="workspace-side-column">
          <section className="approval-card">
            <div className="approval-card-mark" aria-hidden="true">◷</div>
            <span className="eyebrow">NEXT CHECKPOINT</span>
            <h2>Review the<br />specification.</h2>
            <p>Confirm the scope before implementation begins. Approval recording is not connected in this preview.</p>
            <Link className="button button-dark button-full" href={`/projects/${project.id}/approval`}>Open approval preview <ArrowIcon /></Link>
            <span className="approval-note">No AI work is running.</span>
          </section>
          <section className="small-detail-card"><span className="eyebrow">PROJECT DETAILS</span><div className="detail-line"><span>Owner</span><strong>{project.ownerLabel}</strong></div><div className="detail-line"><span>Updated</span><strong>{project.updated}</strong></div><div className="detail-line"><span>Specification</span><strong>Version {project.request.specificationVersion}</strong></div></section>
        </aside>
      </div>
    </ProductShell>
  );
}
