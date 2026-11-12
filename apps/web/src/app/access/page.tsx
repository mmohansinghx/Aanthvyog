import Link from "next/link";
import { Wordmark } from "@/components/ui";

export default function AccessStatusPage() {
  return (
    <main className="access-page">
      <header className="access-header"><Wordmark /><Link className="back-link" href="/"><span aria-hidden="true">←</span> Back to home</Link></header>
      <section className="access-card">
        <div className="access-icon" aria-hidden="true"><span>◌</span><i>•</i></div>
        <p className="eyebrow">ACCOUNT ACCESS · NOT CONNECTED</p>
        <h1>Invitations will come later.</h1>
        <p className="access-copy">This is a local interface preview. Authentication has not been connected, and this page does not accept credentials or create an account.</p>
        <div className="access-status-list">
          <div><span className="status-check">✓</span><span><strong>Invite-only access is the approved direction</strong><small>Implementation still requires account and server verification.</small></span><b>PLANNED</b></div>
          <div><span className="status-pending">◷</span><span><strong>Sign-in and recovery</strong><small>No real sign-in, invitation, recovery or session handling exists.</small></span><b>NOT CONNECTED</b></div>
        </div>
        <Link className="button button-dark button-full" href="/dashboard">Return to the demo preview <span aria-hidden="true">↗</span></Link>
        <p className="access-footnote">Do not enter private or sensitive information in this local preview.</p>
      </section>
      <footer className="access-footer"><Wordmark /><span>Local preview · no user account or database connection</span></footer>
    </main>
  );
}
