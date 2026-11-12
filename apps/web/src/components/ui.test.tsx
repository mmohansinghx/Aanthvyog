import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DemoNotice, StatusPill } from "@/components/ui";

describe("preview and status labels", () => {
  it("makes the non-persistent fixture state visible", () => {
    render(<DemoNotice />);
    expect(screen.getByRole("note")).toHaveTextContent("Local demo preview");
    expect(screen.getByRole("note")).toHaveTextContent("nothing is saved to a database");
  });

  it("renders the human-readable project status", () => {
    render(<StatusPill status="awaiting_approval" />);
    expect(screen.getByText("Awaiting approval")).toBeInTheDocument();
  });
});
