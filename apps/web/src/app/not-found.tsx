import Link from "next/link";

export default function NotFound() {
  return (
    <main className="route-state-page">
      <span className="eyebrow">AANTVYOG · LOCAL PREVIEW</span>
      <h1>That example project is not here.</h1>
      <p>The project ID did not match a static preview fixture.</p>
      <Link className="button button-dark" href="/dashboard">Return to overview <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
