import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectRequestForm } from "@/components/project-request-form";

describe("ProjectRequestForm local preview", () => {
  it("shows validation feedback without preparing an invalid request", async () => {
    const user = userEvent.setup();
    render(<ProjectRequestForm />);

    await user.type(screen.getByLabelText(/Project name/), "xy");
    await user.click(screen.getByRole("button", { name: /Review this request/ }));

    expect(screen.getByText("Use a project name between 3 and 80 characters.")).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Local request preview" })).not.toBeInTheDocument();
  });

  it("prepares an in-browser preview and clearly says it is not submitted or saved", async () => {
    const user = userEvent.setup();
    render(<ProjectRequestForm />);

    await user.type(screen.getByLabelText(/Project name/), "Studio portal");
    await user.selectOptions(screen.getByLabelText(/Application type/), "Internal tool");
    await user.type(screen.getByLabelText(/Product description/), "Help the studio team coordinate bookings and follow-ups.");
    await user.type(screen.getByLabelText(/Target users/), "A small team of studio coordinators.");
    await user.type(screen.getByLabelText(/Required features/), "Booking overview\nFollow-up list");
    await user.selectOptions(screen.getByLabelText(/Authentication requirements/), "Sign-in required");
    await user.selectOptions(screen.getByLabelText(/Database requirements/), "Persistent records are required");
    await user.click(screen.getByRole("button", { name: /Review this request/ }));

    expect(screen.getByRole("region", { name: "Local request preview" })).toBeInTheDocument();
    expect(screen.getByText("Your request preview is ready.")).toBeInTheDocument();
    expect(screen.getByText(/not sent to an API or saved to a database/i)).toBeInTheDocument();
    expect(screen.getByText("Studio portal")).toBeInTheDocument();
  });
});
