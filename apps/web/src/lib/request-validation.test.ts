import { describe, expect, it } from "vitest";
import { validateProjectRequest } from "@/lib/request-validation";

describe("validateProjectRequest", () => {
  it("accepts a concise, structured request", () => {
    expect(validateProjectRequest({
      name: "Studio portal",
      objective: "Help the team coordinate bookings and customer follow-ups.",
      audience: "A small team of studio coordinators.",
      features: "Booking overview\nFollow-up list",
      constraints: "No payment integrations.",
    })).toEqual({});
  });

  it("returns field-specific errors for missing or oversized input", () => {
    expect(validateProjectRequest({
      name: "x",
      objective: "too short",
      audience: "",
      features: "",
      constraints: "",
    })).toMatchObject({
      name: expect.any(String),
      objective: expect.any(String),
      audience: expect.any(String),
      features: expect.any(String),
    });
  });
});
