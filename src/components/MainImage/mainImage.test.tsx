import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MainImage from "./MainImage";

describe("MainImage component", () => {
  it("does not show menu selection on initial render", () => {
    render(
      <MainImage
        setImageLoaded={jest.fn()}
        changeFoundStatus={jest.fn()}
        changeFeedback={jest.fn()}
        characters={[]}
      />
    );
    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("shows menu selection on click", () => {
    render(
      <MainImage
        setImageLoaded={jest.fn()}
        changeFoundStatus={jest.fn()}
        changeFeedback={jest.fn()}
        characters={[]}
      />
    );
    const image = screen.getByRole("img");
    userEvent.click(image);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  it("does not show menu when it is clicked twice", () => {
    render(
      <MainImage
        setImageLoaded={jest.fn()}
        changeFoundStatus={jest.fn()}
        changeFeedback={jest.fn()}
        characters={[]}
      />
    );
    const image = screen.getByRole("img");
    userEvent.click(image);
    userEvent.click(image);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });
});
