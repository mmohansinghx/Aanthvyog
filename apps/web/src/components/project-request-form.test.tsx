import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProjectRequestForm } from "@/components/project-request-form";

describe("ProjectRequestForm local preview", () => {
  it("shows validation feedback without preparing an invalid request", async () => {
    const user = userEvent.setup();
    render(<ProjectRequestForm />);

    await user.type(screen.getByLabelText(/Project name/), "xy");
    await user.click(screen.getByRole("button", { name: /Preview this request/ }));

    expect(screen.getByText("Use a project name between 3 and 80 characters.")).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Local request preview" })).not.toBeInTheDocument();
  });

  it("prepares an in-browser preview and clearly says it is not submitted or saved", async () => {
    const user = userEvent.setup();
    render(<ProjectRequestForm />);

    await user.type(screen.getByLabelText(/Project name/), "Studio portal");
    await user.type(screen.getByLabelText(/What should this project help people do/), "Help the studio team coordinate bookings and follow-ups.");
    await user.type(screen.getByLabelText(/Who will use it/), "A small team of studio coordinators.");
    await user.type(screen.getByLabelText(/Key requirements/), "Booking overview\nFollow-up list");
    await user.click(screen.getByRole("button", { name: /Preview this request/ }));

    expect(screen.getByRole("region", { name: "Local request preview" })).toBeInTheDocument();
    expect(screen.getByText("Request preview is ready")).toBeInTheDocument();
    expect(screen.getByText(/not submitted to an API or saved to a database/i)).toBeInTheDocument();
    expect(screen.getByText("Studio portal")).toBeInTheDocument();
  });
});
