import Link from "next/link";
import type { ReactNode } from "react";
import { statusLabels, type ProjectStatus } from "@/lib/demo-data";

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      className={"wordmark" + (inverse ? " wordmark-inverse" : "")}
      href="/"
      aria-label="AANTVYOG home"
    >
      <span className="wordmark-mark" aria-hidden="true">a</span>
      <span className="wordmark-copy">
        <strong>AANTVYOG</strong>
        <small>INTELLIGENCE. UNITED.</small>
      </span>
    </Link>
  );
}

export function DemoBadge({ children = "DEMO" }: { children?: ReactNode }) {
  return <span className="demo-badge">{children}</span>;
}

export function DemoNotice() {
  return (
    <div className="demo-notice" role="note">
      <span className="demo-notice-mark" aria-hidden="true">i</span>
      <span>
        <strong>Local demo preview</strong>
        <span className="demo-notice-divider" aria-hidden="true">·</span>
        sample records only
        <span className="demo-notice-divider" aria-hidden="true">·</span>
        nothing is saved to a database
      </span>
      <DemoBadge />
    </div>
  );
}

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={"status-pill status-" + status}>
      <span className="status-dot" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div className="page-heading-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action ? <div className="heading-action">{action}</div> : null}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {action ? <div className="section-heading-action">{action}</div> : null}
    </div>
  );
}

export function ArrowIcon({
  direction = "right",
}: {
  direction?: "right" | "up-right" | "down";
}) {
  if (direction === "up-right") {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="icon">
        <path d="M4 12 12 4M5 4h7v7" />
      </svg>
    );
  }
  if (direction === "down") {
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="icon">
        <path d="M8 3v10M3 8l5 5 5-5" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon">
      <path d="M3 8h10M8 3l5 5-5 5" />
    </svg>
  );
}

export function ArrowLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-state-mark" aria-hidden="true">a</span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action ? <div className="empty-state-action">{action}</div> : null}
    </div>
  );
}
