import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterListItem from "./CharacterListItem";

describe("CharacterListItem component", () => {
  it("renders a list item", () => {
    render(
      <CharacterListItem
        imageSrc="stub"
        name="testName"
        itemStyles={{}}
        textStyles={{}}
      />
    );
    const item = screen.getByRole("listitem");
    expect(item).toBeVisible();
  });

  it("shows the character name", () => {
    render(
      <CharacterListItem
        imageSrc="stub"
        name="Superman"
        itemStyles={{}}
        textStyles={{}}
      />
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("Superman");
  });

  it("has a brightness of 50% if the character is found", () => {
    render(
      <CharacterListItem
        imageSrc="stub"
        name="testName"
        itemStyles={{}}
        textStyles={{}}
        isFound={true}
      />
    );
    const item = screen.getByRole("listitem");
    const styles = getComputedStyle(item);

    expect(styles.filter).toEqual("brightness(50%)");
  });
});
