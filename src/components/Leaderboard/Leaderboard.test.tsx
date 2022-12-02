import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Leaderboard from "./Leaderboard";
import { MemoryRouter } from "react-router-dom";

const mockPlayers = [
  {
    id: "1",
    name: "Justin",
    time: "01:00",
  },
  {
    id: "88",
    name: "Rose",
    time: "03:00",
  },
  {
    id: "37",
    name: "Bill",
    time: "02:00",
  },
];

jest.mock("../../hooks/usePlayers.tsx", () => () => {
  let players = mockPlayers;
  //const setPlayers = jest.fn((sorted) => (players = sorted));
  return { players };
});

jest.spyOn(window, "scrollTo");

describe("Leaderboard component", () => {
  it("renders the player names and times", () => {
    render(<Leaderboard />, { wrapper: MemoryRouter });

    expect(screen.getByText("Justin")).toBeVisible();
    expect(screen.getByText("Rose")).toBeVisible();
    expect(screen.getByText("Bill")).toBeVisible();
    expect(screen.getByText("01:00")).toBeVisible();
    expect(screen.getByText("02:00")).toBeVisible();
    expect(screen.getByText("03:00")).toBeVisible();
  });

  it("can be sorted in descending order by time", () => {
    render(<Leaderboard />, { wrapper: MemoryRouter });
    const sortTimeButton = screen.getByText("Time");

    userEvent.click(sortTimeButton);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows[1]).toHaveTextContent("03:00");
    expect(tableRows[2]).toHaveTextContent("02:00");
    expect(tableRows[3]).toHaveTextContent("01:00");
  });

  it("can be sorted in ascending order by time", () => {
    render(<Leaderboard />, { wrapper: MemoryRouter });
    const sortTimeButton = screen.getByText("Time");

    userEvent.click(sortTimeButton);
    userEvent.click(sortTimeButton);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows[1]).toHaveTextContent("01:00");
    expect(tableRows[2]).toHaveTextContent("02:00");
    expect(tableRows[3]).toHaveTextContent("03:00");
  });

  it("can be sorted in descending order by name", () => {
    render(<Leaderboard />, { wrapper: MemoryRouter });
    const sortNameButton = screen.getByText("Name");

    userEvent.click(sortNameButton);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows[1]).toHaveTextContent("Rose");
    expect(tableRows[2]).toHaveTextContent("Justin");
    expect(tableRows[3]).toHaveTextContent("Bill");
  });

  it("can be sorted in ascending order by name", () => {
    render(<Leaderboard />, { wrapper: MemoryRouter });
    const sortNameButton = screen.getByText("Name");

    userEvent.click(sortNameButton);
    userEvent.click(sortNameButton);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows[1]).toHaveTextContent("Bill");
    expect(tableRows[2]).toHaveTextContent("Justin");
    expect(tableRows[3]).toHaveTextContent("Rose");
  });
});
