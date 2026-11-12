"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="route-state-page">
      <span className="eyebrow">AANTVYOG · LOCAL PREVIEW</span>
      <h1>This screen could not be loaded.</h1>
      <p>Nothing was submitted or changed. Try loading the preview again.</p>
      <button className="button button-dark" onClick={() => reset()} type="button">Try again</button>
    </main>
  );
}
