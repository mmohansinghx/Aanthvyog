import { DemoBadge } from "@/components/ui";

const workflowStages = [
  { number: "01", name: "Requirements", note: "Example brief", state: "demo" },
  { number: "02", name: "Architecture", note: "Planned", state: "planned" },
  { number: "03", name: "Engineering", note: "Planned", state: "planned" },
  { number: "04", name: "Quality assurance", note: "Planned", state: "planned" },
  { number: "05", name: "Delivery", note: "Planned", state: "planned" },
];

export function WorkflowPreview({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={"workflow-preview" + (compact ? " workflow-preview-compact" : "")}
      aria-label="Illustrative product workflow"
    >
      <div className="workflow-preview-header">
        <div>
          <p className="eyebrow">A COORDINATED WORKFLOW</p>
          <h2>One clear step at a time.</h2>
        </div>
        <DemoBadge>DESIGN PREVIEW</DemoBadge>
      </div>
      <ol className="workflow-steps">
        {workflowStages.map((stage) => (
          <li className={"workflow-step workflow-step-" + stage.state} key={stage.number}>
            <span className="workflow-step-number">{stage.number}</span>
            <span className="workflow-step-copy">
              <strong>{stage.name}</strong>
              <small>{stage.note}</small>
            </span>
            <span className="workflow-step-state">
              {stage.state === "demo" ? "SAMPLE" : "PLANNED"}
            </span>
          </li>
        ))}
      </ol>
      <p className="workflow-preview-note">
        This visual describes the intended flow. No AI work is running.
      </p>
    </section>
  );
}

const rolePreviews = [
  {
    number: "01",
    title: "Architect Agent",
    description: "Would shape an approved brief into a reviewed technical plan.",
    handoff: "Architecture proposal",
  },
  {
    number: "02",
    title: "Engineer Agent",
    description: "Would implement work only after the specification is approved.",
    handoff: "Reviewed code changes",
  },
  {
    number: "03",
    title: "QA & Delivery Agent",
    description: "Would verify acceptance criteria and prepare a handover.",
    handoff: "Test evidence and release notes",
  },
];

export function AgentRolePreviews() {
  return (
    <div className="agent-role-grid">
      {rolePreviews.map((role) => (
        <article className="agent-role-card" key={role.number}>
          <div className="agent-role-top">
            <span className="agent-role-number">{role.number}</span>
            <DemoBadge>PLANNED</DemoBadge>
          </div>
          <h3>{role.title}</h3>
          <p>{role.description}</p>
          <div className="agent-role-handoff">
            <span>INTENDED HANDOFF</span>
            <strong>{role.handoff}</strong>
          </div>
          <span className="agent-role-footnote">Design preview · not connected</span>
        </article>
      ))}
    </div>
  );
}

const taskLanes = [
  {
    name: "Request",
    task: "Clarify the booking request",
    detail: "Example task card",
  },
  {
    name: "Requirements",
    task: "Confirm team roles",
    detail: "Example task card",
  },
  {
    name: "Review",
    task: "Agree on delivery checks",
    detail: "Example task card",
  },
];

export function TaskBoardPreview() {
  return (
    <section className="task-board-panel panel" aria-labelledby="task-board-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">TASK BOARD</p>
          <h2 id="task-board-title">A view of the planned work</h2>
        </div>
        <DemoBadge>DESIGN PREVIEW</DemoBadge>
      </div>
      <div className="task-board">
        {taskLanes.map((lane, index) => (
          <article className="task-lane" key={lane.name}>
            <div className="task-lane-heading">
              <span>{lane.name}</span>
              <span className="task-lane-number">0{index + 1}</span>
            </div>
            <div className="task-card">
              <DemoBadge>PLANNED</DemoBadge>
              <h3>{lane.task}</h3>
              <p>{lane.detail} · not persisted</p>
            </div>
          </article>
        ))}
      </div>
      <p className="task-board-note">
        Example cards only. No team or agent is working on these tasks.
      </p>
    </section>
  );
}
