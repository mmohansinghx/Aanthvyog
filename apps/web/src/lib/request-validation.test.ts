import { describe, expect, it } from "vitest";
import { validateProjectRequest } from "@/lib/request-validation";

describe("validateProjectRequest", () => {
  it("accepts a concise, structured request", () => {
    expect(validateProjectRequest({
      name: "Studio portal",
      applicationType: "Internal tool",
      objective: "Help the team coordinate bookings and customer follow-ups.",
      audience: "A small team of studio coordinators.",
      features: "Booking overview\nFollow-up list",
      authentication: "Sign-in required",
      database: "Persistent records are required",
      preferredTechnology: "",
      constraints: "No payment integrations.",
      additionalRequirements: "",
    })).toEqual({});
  });

  it("returns field-specific errors for missing or oversized input", () => {
    expect(validateProjectRequest({
      name: "x",
      applicationType: "",
      objective: "too short",
      audience: "",
      features: "",
      authentication: "",
      database: "",
      preferredTechnology: "",
      constraints: "",
      additionalRequirements: "",
    })).toMatchObject({
      name: expect.any(String),
      applicationType: expect.any(String),
      objective: expect.any(String),
      audience: expect.any(String),
      features: expect.any(String),
      authentication: expect.any(String),
      database: expect.any(String),
    });
  });
});
