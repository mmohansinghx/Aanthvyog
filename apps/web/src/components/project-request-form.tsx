"use client";

import { useState, type FormEvent } from "react";
import type { ReactNode } from "react";
import { ArrowIcon, DemoBadge } from "@/components/ui";
import {
  validateProjectRequest,
  type ProjectRequestErrors,
  type ProjectRequestInput,
} from "@/lib/request-validation";

const emptyRequest: ProjectRequestInput = {
  name: "",
  applicationType: "",
  objective: "",
  audience: "",
  features: "",
  authentication: "",
  database: "",
  preferredTechnology: "",
  constraints: "",
  additionalRequirements: "",
};

function FieldError({ id, children }: { id: string; children: string }) {
  return <p className="field-error" id={id} role="alert">{children}</p>;
}

function RequestField({
  id,
  label,
  required = false,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const hintId = id + "-hint";
  const errorId = id + "-error";
  return (
    <div className="field-group">
      <label htmlFor={id}>
        {label}
        {required ? <span className="required-mark" aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <FieldError id={errorId}>{error}</FieldError>
      ) : hint ? (
        <span className="field-hint" id={hintId}>{hint}</span>
      ) : null}
    </div>
  );
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

  const featureCount = request.features
    .split("\n")
    .map((feature) => feature.trim())
    .filter(Boolean).length;

  return (
    <div className="request-layout">
      <form className="request-form panel" onSubmit={previewRequest} noValidate>
        <div className="request-form-header">
          <div>
            <p className="eyebrow">PROJECT REQUEST · STEP 01</p>
            <h2>Start with the outcome.</h2>
            <p>Give the idea enough shape for a thoughtful review.</p>
          </div>
          <DemoBadge>LOCAL PREVIEW</DemoBadge>
        </div>

        <div className="request-safety-note" role="note">
          <span className="note-icon" aria-hidden="true">i</span>
          <p>
            <strong>No server is connected.</strong> Avoid entering personal or
            sensitive details. This form does not persist project records.
          </p>
        </div>

        <div className="form-section">
          <div className="form-section-heading">
            <span className="form-section-number">01</span>
            <div>
              <h3>Project basics</h3>
              <p>Name the product and describe the change you want to make.</p>
            </div>
          </div>
          <div className="field-grid">
            <RequestField
              id="project-name"
              label="Project name"
              required
              hint="A short working title is enough."
              error={errors.name}
            >
              <input
                id="project-name"
                name="name"
                required
                value={request.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "project-name-error" : "project-name-hint"}
                autoComplete="off"
                placeholder="e.g. Studio operations portal"
              />
            </RequestField>

            <RequestField
              id="application-type"
              label="Application type"
              required
              hint="Choose the closest starting point."
              error={errors.applicationType}
            >
              <select
                id="application-type"
                name="applicationType"
                required
                value={request.applicationType}
                onChange={(event) => updateField("applicationType", event.target.value)}
                aria-invalid={Boolean(errors.applicationType)}
                aria-describedby={errors.applicationType ? "application-type-error" : "application-type-hint"}
              >
                <option value="">Select an application type</option>
                <option value="Web application">Web application</option>
                <option value="Internal tool">Internal tool</option>
                <option value="Marketplace">Marketplace</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Mobile companion">Mobile companion</option>
                <option value="Other">Other</option>
              </select>
            </RequestField>

            <RequestField
              id="project-objective"
              label="Product description"
              required
              hint="20–800 characters. Describe the outcome, not the technical solution."
              error={errors.objective}
            >
              <textarea
                id="project-objective"
                name="objective"
                required
                rows={4}
                value={request.objective}
                onChange={(event) => updateField("objective", event.target.value)}
                aria-invalid={Boolean(errors.objective)}
                aria-describedby={errors.objective ? "project-objective-error" : "project-objective-hint"}
                placeholder="What should this product help people do?"
              />
            </RequestField>

            <RequestField
              id="project-audience"
              label="Target users"
              required
              hint="10–240 characters."
              error={errors.audience}
            >
              <textarea
                id="project-audience"
                name="audience"
                required
                rows={4}
                value={request.audience}
                onChange={(event) => updateField("audience", event.target.value)}
                aria-invalid={Boolean(errors.audience)}
                aria-describedby={errors.audience ? "project-audience-error" : "project-audience-hint"}
                placeholder="Who will use it, and in what context?"
              />
            </RequestField>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-heading">
            <span className="form-section-number">02</span>
            <div>
              <h3>Scope and requirements</h3>
              <p>Separate the essential needs from the nice-to-haves.</p>
            </div>
          </div>
          <div className="field-grid">
            <RequestField
              id="project-features"
              label="Required features"
              required
              hint="Add 1–12 requirements, one per line, up to 120 characters each."
              error={errors.features}
            >
              <textarea
                id="project-features"
                name="features"
                required
                rows={5}
                value={request.features}
                onChange={(event) => updateField("features", event.target.value)}
                aria-invalid={Boolean(errors.features)}
                aria-describedby={errors.features ? "project-features-error" : "project-features-hint"}
                placeholder={"One requirement per line\nWeekly booking overview\nFollow-up list with due dates"}
              />
              <span className="field-counter" aria-live="polite">{featureCount} / 12</span>
            </RequestField>

            <RequestField
              id="project-authentication"
              label="Authentication requirements"
              required
              hint="A choice of “Not sure yet” is fine."
              error={errors.authentication}
            >
              <select
                id="project-authentication"
                name="authentication"
                required
                value={request.authentication}
                onChange={(event) => updateField("authentication", event.target.value)}
                aria-invalid={Boolean(errors.authentication)}
                aria-describedby={errors.authentication ? "project-authentication-error" : "project-authentication-hint"}
              >
                <option value="">Select one</option>
                <option value="Sign-in required">Sign-in required</option>
                <option value="No sign-in required">No sign-in required</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </RequestField>

            <RequestField
              id="project-database"
              label="Database requirements"
              required
              hint="This describes your need; no database is connected in this preview."
              error={errors.database}
            >
              <select
                id="project-database"
                name="database"
                required
                value={request.database}
                onChange={(event) => updateField("database", event.target.value)}
                aria-invalid={Boolean(errors.database)}
                aria-describedby={errors.database ? "project-database-error" : "project-database-hint"}
              >
                <option value="">Select one</option>
                <option value="Persistent records are required">Persistent records are required</option>
                <option value="No persistent records required">No persistent records required</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </RequestField>

            <RequestField
              id="project-technology"
              label="Preferred technology"
              hint="Optional · up to 80 characters."
              error={errors.preferredTechnology}
            >
              <input
                id="project-technology"
                name="preferredTechnology"
                value={request.preferredTechnology}
                onChange={(event) => updateField("preferredTechnology", event.target.value)}
                aria-invalid={Boolean(errors.preferredTechnology)}
                aria-describedby={errors.preferredTechnology ? "project-technology-error" : "project-technology-hint"}
                placeholder="e.g. React, Python, or let the team recommend"
              />
            </RequestField>
          </div>
        </div>

        <div className="form-section form-section-last">
          <div className="form-section-heading">
            <span className="form-section-number">03</span>
            <div>
              <h3>Constraints and context</h3>
              <p>Include boundaries that should shape the review.</p>
            </div>
          </div>
          <div className="field-grid">
            <RequestField
              id="project-constraints"
              label="Constraints or things to avoid"
              hint="Optional · 500 characters maximum."
              error={errors.constraints}
            >
              <textarea
                id="project-constraints"
                name="constraints"
                rows={3}
                value={request.constraints}
                onChange={(event) => updateField("constraints", event.target.value)}
                aria-invalid={Boolean(errors.constraints)}
                aria-describedby={errors.constraints ? "project-constraints-error" : "project-constraints-hint"}
                placeholder="Budget, privacy, integrations, timing…"
              />
            </RequestField>

            <RequestField
              id="project-additional"
              label="Additional requirements"
              hint="Optional · 1,000 characters maximum."
              error={errors.additionalRequirements}
            >
              <textarea
                id="project-additional"
                name="additionalRequirements"
                rows={3}
                value={request.additionalRequirements}
                onChange={(event) => updateField("additionalRequirements", event.target.value)}
                aria-invalid={Boolean(errors.additionalRequirements)}
                aria-describedby={errors.additionalRequirements ? "project-additional-error" : "project-additional-hint"}
                placeholder="Anything else a reviewer should know?"
              />
            </RequestField>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            Review this request <ArrowIcon />
          </button>
          <span>This does not submit or save your request.</span>
        </div>

        {previewVisible ? (
          <section
            className="request-preview-result"
            aria-live="polite"
            aria-label="Local request preview"
          >
            <div className="request-preview-heading">
              <div>
                <p className="eyebrow">REVIEW BEFORE SUBMITTING</p>
                <h3>Your request preview is ready.</h3>
              </div>
              <DemoBadge />
            </div>
            <p className="preview-notice">
              This summary exists only in the current page state. It was not
              sent to an API or saved to a database.
            </p>
            <dl className="request-summary">
              <div><dt>Project</dt><dd>{request.name.trim()}</dd></div>
              <div><dt>Application type</dt><dd>{request.applicationType}</dd></div>
              <div><dt>Product description</dt><dd>{request.objective.trim()}</dd></div>
              <div><dt>Target users</dt><dd>{request.audience.trim()}</dd></div>
              <div><dt>Required features</dt><dd>{request.features.trim()}</dd></div>
              <div><dt>Authentication</dt><dd>{request.authentication}</dd></div>
              <div><dt>Database</dt><dd>{request.database}</dd></div>
              {request.preferredTechnology.trim() ? (
                <div><dt>Preferred technology</dt><dd>{request.preferredTechnology.trim()}</dd></div>
              ) : null}
              <div><dt>Constraints</dt><dd>{request.constraints.trim() || "None specified"}</dd></div>
              <div><dt>Additional requirements</dt><dd>{request.additionalRequirements.trim() || "None specified"}</dd></div>
            </dl>
          </section>
        ) : null}
      </form>

      <aside className="request-aside">
        <div className="request-aside-card">
          <div className="request-aside-top">
            <span className="aside-icon" aria-hidden="true">✳</span>
            <DemoBadge>PREVIEW</DemoBadge>
          </div>
          <p className="eyebrow">A THOUGHTFUL START</p>
          <h2>Clarity is a team effort.</h2>
          <p>
            A strong brief makes room for purpose, people, requirements, and
            limits before implementation is discussed.
          </p>
          <ul>
            <li>Outcome and audience</li>
            <li>Required features</li>
            <li>Authentication and data needs</li>
            <li>Constraints for review</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
