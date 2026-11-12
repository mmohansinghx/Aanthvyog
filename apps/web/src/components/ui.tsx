import Link from "next/link";
import type { ReactNode } from "react";
import { statusLabels, type ProjectStatus } from "@/lib/demo-data";

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`wordmark${inverse ? " wordmark-inverse" : ""}`} href="/" aria-label="AANTVYOG home">
      <span className="wordmark-mark" aria-hidden="true">a</span>
      <span>AANTVYOG</span>
    </Link>
  );
}

export function DemoNotice() {
  return (
    <div className="demo-notice" role="note">
      <span className="demo-dot" aria-hidden="true" />
      <span><strong>Local demo preview</strong> · example records only · nothing is saved to a database</span>
    </div>
  );
}

export function StatusPill({ status }: { status: ProjectStatus }) {
  return <span className={`status-pill status-${status}`}>{statusLabels[status]}</span>;
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
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action ? <div className="heading-action">{action}</div> : null}
    </div>
  );
}

export function ArrowIcon({ direction = "right" }: { direction?: "right" | "up-right" }) {
  return direction === "up-right" ? (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon"><path d="M4 12 12 4M5 4h7v7" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="icon"><path d="M3 8h10M8 3l5 5-5 5" /></svg>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowIcon /></Link>;
}
