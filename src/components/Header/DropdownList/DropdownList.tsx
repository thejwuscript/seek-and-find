import React from "react";
import List from "@mui/material/List";
import farnsworth from "../../../assets/images/farnsworth.png";
import pacman from "../../../assets/images/pacman.png";
import mike from "../../../assets/images/mike.png";
import "./dropdownList.css";
import CharacterListItem from "./CharacterListItem";
import { StyledEngineProvider } from "@mui/material/styles";

type Props = {
  isShowing: boolean;
};

export default function DropdownList({ isShowing }: Props) {
  const listClassName = `dropdown-character-list ${isShowing ? "" : "hidden"}`;

  return (
    <StyledEngineProvider injectFirst>
      <List className={listClassName}>
        <CharacterListItem imageSrc={farnsworth} name="Farnsworth" />
        <CharacterListItem imageSrc={pacman} name="Pac-Man" />
        <CharacterListItem imageSrc={mike} name="Mike" />
      </List>
    </StyledEngineProvider>
  );
}
