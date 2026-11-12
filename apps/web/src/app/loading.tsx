export default function Loading() {
  return (
    <main className="loading-page" role="status" aria-busy="true" aria-label="Loading AANTVYOG preview">
      <span className="loading-mark" aria-hidden="true">a</span>
      <span className="eyebrow">AANTVYOG · LOCAL PREVIEW</span>
      <div className="loading-lines"><i /><i /><i /></div>
    </main>
  );
}
