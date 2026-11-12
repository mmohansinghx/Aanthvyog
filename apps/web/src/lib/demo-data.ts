export type ProjectStatus =
  | "draft"
  | "requirements"
  | "awaiting_approval"
  | "approved"
  | "in_progress"
  | "paused"
  | "cancelled"
  | "completed";

export type DemoProject = {
  id: string;
  name: string;
  summary: string;
  status: ProjectStatus;
  updated: string;
  ownerLabel: string;
  request: {
    objective: string;
    audience: string;
    features: string[];
    constraints: string[];
    specificationVersion: number;
  };
  activity: Array<{
    id: string;
    title: string;
    detail: string;
    time: string;
    kind: "request" | "requirements" | "approval";
  }>;
};

/** Static UI fixtures only. This module has no database, API, or auth connection. */
export const demoProjects: DemoProject[] = [
  {
    id: "studio-operations",
    name: "Studio operations portal",
    summary: "A calmer place to organise bookings, people, and follow-ups.",
    status: "awaiting_approval",
    updated: "Sample · 12 Nov",
    ownerLabel: "Demo owner",
    request: {
      objective:
        "Bring studio bookings and follow-up work into one clear view so the team can see what needs attention.",
      audience: "A small studio team coordinating schedules and customer requests.",
      features: [
        "Weekly booking overview",
        "Simple request intake form",
        "Follow-up list with due dates",
      ],
      constraints: [
        "Keep the first version focused on desktop and mobile web.",
        "Do not connect to payment systems.",
      ],
      specificationVersion: 3,
    },
    activity: [
      {
        id: "event-1",
        title: "Request preview prepared",
        detail: "Example event from a static frontend fixture.",
        time: "12 Nov · 10:20",
        kind: "request",
      },
      {
        id: "event-2",
        title: "Requirements grouped",
        detail: "The sample brief is shown as specification v3.",
        time: "12 Nov · 10:08",
        kind: "requirements",
      },
      {
        id: "event-3",
        title: "Approval is waiting",
        detail: "No approval has been recorded in this preview.",
        time: "12 Nov · 09:54",
        kind: "approval",
      },
    ],
  },
  {
    id: "quiet-spaces",
    name: "Quiet spaces directory",
    summary: "A small directory concept for finding peaceful places nearby.",
    status: "draft",
    updated: "Sample · 11 Nov",
    ownerLabel: "Demo owner",
    request: {
      objective:
        "Make it easier to browse a curated list of quiet places and understand what each place offers.",
      audience: "People looking for a calm place to read or work for a while.",
      features: ["Search by area", "Place detail cards", "Accessibility notes"],
      constraints: ["No user location tracking in the first version."],
      specificationVersion: 1,
    },
    activity: [
      {
        id: "event-q1",
        title: "Draft requirements added",
        detail: "Example event from a static frontend fixture.",
        time: "11 Nov · 16:20",
        kind: "requirements",
      },
    ],
  },
];

export function getDemoProject(projectId: string): DemoProject | undefined {
  return demoProjects.find((project) => project.id === projectId);
}

export const statusLabels: Record<ProjectStatus, string> = {
  draft: "Draft",
  requirements: "Requirements",
  awaiting_approval: "Awaiting approval",
  approved: "Approved",
  in_progress: "In progress",
  paused: "Paused",
  cancelled: "Cancelled",
  completed: "Completed",
};
