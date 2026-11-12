import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, DemoBadge, DemoNotice, Wordmark } from "@/components/ui";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: "overview" },
  { href: "/dashboard#projects", label: "Projects", icon: "projects" },
];

function NavGlyph({ type }: { type: string }) {
  if (type === "projects") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path d="M3 6.5h5l1.5 1.7H17v7.3H3z" />
        <path d="M3 6.5V5h5.4l1.4 1.5" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <rect x="3" y="3" width="5.5" height="5.5" rx="1.5" />
      <rect x="11.5" y="3" width="5.5" height="5.5" rx="1.5" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1.5" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.5" />
    </svg>
  );
}

export function ProductShell({
  children,
  active = "overview",
}: {
  children: ReactNode;
  active?: "overview" | "projects";
}) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="sidebar-brand"><Wordmark /></div>
        <div className="workspace-label">
          <span className="workspace-label-dot" />
          <span>PRODUCT WORKSPACE</span>
        </div>
        <nav className="side-nav">
          <p className="nav-caption">Workspace</p>
          {navigation.map((item) => {
            const selected = item.label.toLowerCase() === active;
            return (
              <Link
                className={"side-nav-link" + (selected ? " is-active" : "")}
                href={item.href}
                key={item.href}
                aria-current={selected ? "page" : undefined}
              >
                <NavGlyph type={item.icon} />
                <span>{item.label}</span>
                {item.label === "Projects" ? <DemoBadge /> : null}
              </Link>
            );
          })}
          <p className="nav-caption nav-caption-spaced">Planning</p>
          <Link className="side-nav-link" href="/projects/new">
            <svg aria-hidden="true" viewBox="0 0 20 20">
              <path d="M10 4v12M4 10h12" />
            </svg>
            <span>New request</span>
          </Link>
          <Link className="side-nav-link" href="/access">
            <svg aria-hidden="true" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="7" />
              <path d="M10 9v4M10 6.5v.1" />
            </svg>
            <span>Access status</span>
          </Link>
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-note">
          <span className="sidebar-note-mark" aria-hidden="true">✳</span>
          <p>Clear requests.<br />Thoughtful next steps.</p>
          <span>MILESTONE 1 · DESIGN PREVIEW</span>
        </div>
        <div className="sidebar-footer">
          <div className="preview-avatar" aria-hidden="true">A</div>
          <div><strong>Demo workspace</strong><span>No signed-in user</span></div>
          <DemoBadge />
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="mobile-brand"><Wordmark /></div>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>Preview</strong>
          </div>
          <div className="topbar-actions">
            <span className="preview-chip"><span className="preview-chip-dot" />Interface preview</span>
            <Link className="topbar-access" href="/access">Access status</Link>
          </div>
        </header>

        <nav className="mobile-nav" aria-label="Workspace navigation">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard#projects">Projects</Link>
          <Link href="/projects/new">New request</Link>
          <Link href="/access">Access</Link>
        </nav>

        <main className="main-content">
          <DemoNotice />
          {children}
        </main>
        <footer className="app-footer">
          <span>AANTVYOG · Intelligence. United.</span>
          <span>Sample interface · not a connected product</span>
          <Link href="/">Visit the overview <ArrowIcon direction="up-right" /></Link>
        </footer>
      </div>
    </div>
  );
}
