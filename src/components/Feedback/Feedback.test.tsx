import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Feedback from "./Feedback";
import userEvent from "@testing-library/user-event";

describe("Feedback component", () => {
  it("shows the message passed in as a prop", () => {
    const handleCloseMock = jest.fn();
    const { container } = render(
      <Feedback message="Test message" handleClose={handleCloseMock} />
    );

    expect(container).toHaveTextContent("Test message");
  });

  it("calls handleClose when button is clicked", () => {
    const handleCloseMock = jest.fn();
    render(<Feedback message="Test message" handleClose={handleCloseMock} />);
    const button = screen.getByRole("button");

    userEvent.click(button);

    expect(handleCloseMock).toHaveBeenCalled();
  });

  it("does not show the snackbar when message is empty", () => {
    const handleCloseMock = jest.fn();
    render(<Feedback message="" handleClose={handleCloseMock} />);
    const snackbar = screen.queryByRole("notification");
    expect(snackbar).toBe(null);
  });
});
