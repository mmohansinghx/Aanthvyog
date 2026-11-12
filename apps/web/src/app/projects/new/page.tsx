import Link from "next/link";
import { ProductShell } from "@/components/product-shell";
import { ProjectRequestForm } from "@/components/project-request-form";
import { PageHeading } from "@/components/ui";

export default function NewProjectPage() {
  return (
    <ProductShell active="projects">
      <div className="back-link-row"><Link className="back-link" href="/dashboard"><span aria-hidden="true">←</span> Back to overview</Link><span className="step-indicator">REQUEST BUILDER <b>·</b> 1 OF 1</span></div>
      <PageHeading eyebrow="NEW PROJECT REQUEST" title="Give the idea a good beginning." description="Shape a clear brief before any work starts. This local preview does not save or submit your request." action={null} />
      <ProjectRequestForm />
    </ProductShell>
  );
}
