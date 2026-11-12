import Link from "next/link";
import type { ReactNode } from "react";
import { DemoNotice, Wordmark } from "@/components/ui";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: "grid" },
  { href: "/dashboard#projects", label: "Projects", icon: "layers" },
];

function NavGlyph({ type }: { type: string }) {
  if (type === "layers") {
    return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="m10 3 7 4-7 4-7-4 7-4Zm-7 8 7 4 7-4M3 14l7 4 7-4" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 20 20"><rect x="3" y="3" width="5" height="5" rx="1" /><rect x="12" y="3" width="5" height="5" rx="1" /><rect x="3" y="12" width="5" height="5" rx="1" /><rect x="12" y="12" width="5" height="5" rx="1" /></svg>;
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
        <p className="nav-caption">Workspace preview</p>
        <nav className="side-nav">
          {navigation.map((item) => {
            const selected = item.label.toLowerCase() === active;
            return (
              <Link className={`side-nav-link${selected ? " is-active" : ""}`} href={item.href} key={item.href} aria-current={selected ? "page" : undefined}>
                <NavGlyph type={item.icon} />{item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-help">
          <span className="help-orbit" aria-hidden="true">✳</span>
          <p>One clear request at a time.</p>
          <span>Milestone 1 · local UI</span>
        </div>
        <div className="sidebar-footer">
          <div className="preview-avatar" aria-hidden="true">D</div>
          <div><strong>Demo preview</strong><span>No signed-in user</span></div>
          <span className="more-dots" aria-hidden="true">···</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="mobile-brand"><Wordmark /></div>
          <div className="breadcrumb"><span>Workspace</span><span aria-hidden="true">/</span><strong>Local preview</strong></div>
          <div className="topbar-actions">
            <span className="local-chip"><span className="local-chip-dot" />Local only</span>
            <Link className="topbar-access" href="/access">Access status</Link>
          </div>
        </header>
        <main className="main-content">
          <DemoNotice />
          {children}
        </main>
      </div>
    </div>
  );
}
