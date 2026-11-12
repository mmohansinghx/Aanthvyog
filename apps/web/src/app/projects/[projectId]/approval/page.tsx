import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductShell } from "@/components/product-shell";
import { PageHeading, StatusPill } from "@/components/ui";
import { getDemoProject } from "@/lib/demo-data";

export default async function ApprovalPreviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getDemoProject(projectId);
  if (!project) notFound();

  return (
    <ProductShell active="projects">
      <div className="back-link-row"><Link className="back-link" href={`/projects/${project.id}`}><span aria-hidden="true">←</span> Project overview</Link><span className="sample-route-label">APPROVAL PREVIEW</span></div>
      <PageHeading eyebrow="REVIEW CHECKPOINT" title="A clear yes starts with a clear scope." description="Read the specification version that this approval would refer to." action={<StatusPill status={project.status} />} />
      <div className="workspace-tabs" role="navigation" aria-label="Project sections">
        <Link className="workspace-tab" href={`/projects/${project.id}`}>Overview</Link>
        <Link className="workspace-tab is-selected" href={`/projects/${project.id}/approval`}>Approval <span className="tab-dot" /></Link>
        <Link className="workspace-tab" href={`/projects/${project.id}/activity`}>Activity</Link>
      </div>

      <div className="approval-layout">
        <section className="panel approval-spec-panel">
          <div className="spec-heading"><div><span className="eyebrow">SPECIFICATION UNDER REVIEW</span><h2>{project.name}</h2><p>Specification version {project.request.specificationVersion}</p></div><span className="version-chip">v{project.request.specificationVersion}</span></div>
          <div className="spec-summary"><span className="brief-label">APPLICATION TYPE</span><p>{project.request.applicationType}</p></div>
          <div className="spec-summary"><span className="brief-label">OUTCOME</span><p>{project.request.objective}</p></div>
          <div className="spec-summary"><span className="brief-label">INTENDED USERS</span><p>{project.request.audience}</p></div>
          <div className="spec-review-columns"><div><span className="brief-label">INCLUDED</span><ul className="check-list">{project.request.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul></div><div><span className="brief-label">CONSTRAINTS</span><ul className="constraint-list">{project.request.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></div></div>
          <div className="spec-review-columns"><div><span className="brief-label">AUTHENTICATION</span><p>{project.request.authentication}</p></div><div><span className="brief-label">DATA REQUIREMENT</span><p>{project.request.database}</p></div></div>
          <div className="spec-summary"><span className="brief-label">ADDITIONAL CONTEXT</span><p>{project.request.additionalRequirements}</p></div>
          <div className="spec-summary"><span className="brief-label">OPEN QUESTIONS</span><ul className="constraint-list">{project.request.reviewQuestions.map((question) => <li key={question}>{question}</li>)}</ul></div>
          <div className="spec-footer"><span>Example specification · static fixture</span><span>Approval v{project.request.specificationVersion} · no record exists</span></div>
        </section>

        <aside className="approval-action-panel">
          <div className="approval-illustration" aria-hidden="true"><span className="approval-orbit"/><span className="approval-check">✓</span><span className="approval-star">✳</span></div>
          <span className="eyebrow">DECISION STATUS</span>
          <h2>Awaiting your review</h2>
          <p>This screen shows the intended checkpoint. Approval is not enabled because there is no authenticated user or server to record it.</p>
          <button className="button button-dark button-full" type="button" disabled aria-describedby="approval-disabled-note">Approve specification</button>
          <button className="button button-outline button-full" type="button" disabled>Request changes</button>
          <span className="disabled-hint" id="approval-disabled-note">Actions disabled: no signed-in user or server-side approval endpoint is connected.</span>
          <div className="version-lock"><span className="lock-mark" aria-hidden="true">⌑</span><p><strong>Approval scope</strong><br />In M1, a real approval must point to one immutable specification version.</p></div>
        </aside>
      </div>
    </ProductShell>
  );
}
