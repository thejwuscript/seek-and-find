import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Counter from "./Counter";

describe("Counter", () => {
  it("renders the count number", () => {
    render(<Counter count={2} foundCharacters={[]} />);
    const element = screen.getByText("2");
    expect(element).toBeVisible();
  });

  it("removes 'hidden' class from List when clicked", () => {
    render(<Counter count={2} foundCharacters={[]} />);
    const toggle = screen.getByRole("button");

    userEvent.click(toggle);

    const list = screen.queryByRole("list");
    expect(list).not.toHaveClass("hidden");
  });
});
