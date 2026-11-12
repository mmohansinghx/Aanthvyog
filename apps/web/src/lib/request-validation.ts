export type ProjectRequestInput = {
  name: string;
  applicationType: string;
  objective: string;
  audience: string;
  features: string;
  authentication: string;
  database: string;
  preferredTechnology: string;
  constraints: string;
  additionalRequirements: string;
};

export type ProjectRequestErrors = Partial<
  Record<keyof ProjectRequestInput, string>
>;

export function validateProjectRequest(
  input: ProjectRequestInput,
): ProjectRequestErrors {
  const errors: ProjectRequestErrors = {};
  const name = input.name.trim();
  const applicationType = input.applicationType.trim();
  const objective = input.objective.trim();
  const audience = input.audience.trim();
  const features = input.features
    .split("\n")
    .map((feature) => feature.trim())
    .filter(Boolean);
  const authentication = input.authentication.trim();
  const database = input.database.trim();

  if (name.length < 3 || name.length > 80) {
    errors.name = "Use a project name between 3 and 80 characters.";
  }
  if (!applicationType) {
    errors.applicationType = "Choose an application type.";
  }
  if (objective.length < 20 || objective.length > 800) {
    errors.objective = "Describe the outcome in 20 to 800 characters.";
  }
  if (audience.length < 10 || audience.length > 240) {
    errors.audience = "Describe the intended users in 10 to 240 characters.";
  }
  if (
    features.length === 0 ||
    features.length > 12 ||
    features.some((item) => item.length > 120)
  ) {
    errors.features =
      "Add 1 to 12 requirements, one per line, up to 120 characters each.";
  }
  if (!authentication) {
    errors.authentication = "Choose an authentication requirement.";
  }
  if (!database) {
    errors.database = "Choose a data and database requirement.";
  }
  if (input.preferredTechnology.trim().length > 80) {
    errors.preferredTechnology = "Keep the technology preference to 80 characters or fewer.";
  }
  if (input.constraints.trim().length > 500) {
    errors.constraints = "Keep constraints to 500 characters or fewer.";
  }
  if (input.additionalRequirements.trim().length > 1000) {
    errors.additionalRequirements =
      "Keep additional requirements to 1,000 characters or fewer.";
  }

  return errors;
}
