import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Timer from "./Timer";

describe("Timer component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("starts the timer when it mounts", () => {
    render(<Timer gameOver={false} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const wrapper = screen.getByRole("timer");
    expect(wrapper.textContent).toEqual("00:03");
  });

  it("stops the timer when the game is over", () => {
    const { rerender } = render(<Timer gameOver={false} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    rerender(<Timer gameOver={true} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByRole("timer")).toHaveTextContent("00:05");
  });
});
