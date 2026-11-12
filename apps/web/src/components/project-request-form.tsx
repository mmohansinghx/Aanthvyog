"use client";

import { useState, type FormEvent } from "react";
import { validateProjectRequest, type ProjectRequestErrors, type ProjectRequestInput } from "@/lib/request-validation";

const emptyRequest: ProjectRequestInput = {
  name: "",
  objective: "",
  audience: "",
  features: "",
  constraints: "",
};

function FieldError({ children }: { children: string }) {
  return <span className="field-error">{children}</span>;
}

export function ProjectRequestForm() {
  const [request, setRequest] = useState(emptyRequest);
  const [errors, setErrors] = useState<ProjectRequestErrors>({});
  const [previewVisible, setPreviewVisible] = useState(false);

  function updateField(field: keyof ProjectRequestInput, value: string) {
    setRequest((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setPreviewVisible(false);
  }

  function previewRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateProjectRequest(request);
    setErrors(nextErrors);
    setPreviewVisible(Object.keys(nextErrors).length === 0);
  }

  return (
    <div className="request-layout">
      <form className="request-form" onSubmit={previewRequest} noValidate>
        <div className="form-step-heading"><span className="step-count">01</span><div><span className="eyebrow">THE PROJECT</span><h2>Start with the why.</h2><p>A useful brief begins with the change you want to make.</p></div></div>

        <div className="field-group">
          <label htmlFor="project-name">Project name <span aria-hidden="true">*</span></label>
          <input id="project-name" name="name" value={request.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "project-name-error" : undefined} placeholder="e.g. Studio operations portal" />
          {errors.name ? <div id="project-name-error"><FieldError>{errors.name}</FieldError></div> : <span className="field-hint">A short working title is enough for now.</span>}
        </div>

        <div className="field-group">
          <label htmlFor="project-objective">What should this project help people do? <span aria-hidden="true">*</span></label>
          <textarea id="project-objective" name="objective" rows={4} value={request.objective} onChange={(event) => updateField("objective", event.target.value)} aria-invalid={Boolean(errors.objective)} aria-describedby={errors.objective ? "project-objective-error" : "project-objective-hint"} placeholder="Describe the outcome, not the technical solution…" />
          {errors.objective ? <div id="project-objective-error"><FieldError>{errors.objective}</FieldError></div> : <span id="project-objective-hint" className="field-hint">20–800 characters. Keep it in everyday language.</span>}
        </div>

        <div className="field-group">
          <label htmlFor="project-audience">Who will use it? <span aria-hidden="true">*</span></label>
          <textarea id="project-audience" name="audience" rows={3} value={request.audience} onChange={(event) => updateField("audience", event.target.value)} aria-invalid={Boolean(errors.audience)} aria-describedby={errors.audience ? "project-audience-error" : "project-audience-hint"} placeholder="Describe the people and their context…" />
          {errors.audience ? <div id="project-audience-error"><FieldError>{errors.audience}</FieldError></div> : <span id="project-audience-hint" className="field-hint">10–240 characters.</span>}
        </div>

        <div className="form-divider" />
        <div className="form-step-heading form-step-secondary"><span className="step-count">02</span><div><span className="eyebrow">THE FIRST SCOPE</span><h2>What matters most?</h2><p>Start with a small set of needs. You can refine them in the review.</p></div></div>

        <div className="field-group">
          <label htmlFor="project-features">Key requirements <span aria-hidden="true">*</span></label>
          <textarea id="project-features" name="features" rows={5} value={request.features} onChange={(event) => updateField("features", event.target.value)} aria-invalid={Boolean(errors.features)} aria-describedby={errors.features ? "project-features-error" : "project-features-hint"} placeholder={"One requirement per line\nWeekly booking overview\nSimple follow-up list"} />
          {errors.features ? <div id="project-features-error"><FieldError>{errors.features}</FieldError></div> : <span id="project-features-hint" className="field-hint">Add up to 12 requirements, one per line.</span>}
        </div>

        <div className="field-group">
          <label htmlFor="project-constraints">Constraints or things to avoid</label>
          <textarea id="project-constraints" name="constraints" rows={3} value={request.constraints} onChange={(event) => updateField("constraints", event.target.value)} aria-invalid={Boolean(errors.constraints)} aria-describedby={errors.constraints ? "project-constraints-error" : "project-constraints-hint"} placeholder="Budget, privacy, integrations, timing…" />
          {errors.constraints ? <div id="project-constraints-error"><FieldError>{errors.constraints}</FieldError></div> : <span id="project-constraints-hint" className="field-hint">Optional · 500 characters maximum.</span>}
        </div>

        <div className="form-actions"><button type="submit" className="button button-dark">Preview this request <span aria-hidden="true">↗</span></button><span>Local preview only · not submitted</span></div>
        {previewVisible ? (
          <section className="request-preview-result" aria-live="polite" aria-label="Local request preview">
            <div className="preview-result-icon" aria-hidden="true">✓</div>
            <div><strong>Request preview is ready</strong><p>This summary exists only in this browser tab. It was not submitted to an API or saved to a database.</p><dl><dt>Project</dt><dd>{request.name.trim()}</dd><dt>Requirements</dt><dd>{request.features.split("\n").filter((feature) => feature.trim()).length} sample entries</dd></dl></div>
          </section>
        ) : null}
      </form>

      <aside className="request-aside">
        <div className="aside-card aside-dark">
          <span className="aside-spark" aria-hidden="true">✳</span>
          <span className="eyebrow">A THOUGHTFUL START</span>
          <h3>Clarity is a<br />team effort.</h3>
          <p>A strong request makes room for purpose, people and limits — before anyone talks about implementation.</p>
          <div className="aside-check-list"><span><i>✓</i>Outcome</span><span><i>✓</i>Intended users</span><span><i>✓</i>First requirements</span></div>
        </div>
        <div className="aside-info"><span className="info-mark">i</span><p><strong>About this preview</strong><br />There is no sign-in, server, or database behind this form yet. Keep personal or sensitive information out of sample requests.</p></div>
      </aside>
    </div>
  );
}
