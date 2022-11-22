import React from "react";
import List from "@mui/material/List";
import farnsworth from "../../../assets/images/farnsworth.png";
import pacman from "../../../assets/images/pacman.png";
import mike from "../../../assets/images/mike.png";
import "./dropdownList.css";
import CharacterListItem from "./CharacterListItem";
import { StyledEngineProvider } from '@mui/material/styles';

export default function DropdownList() {
  return (
    <StyledEngineProvider injectFirst>
      <List className="dropdown-character-list">
        <CharacterListItem imageSrc={farnsworth} name="Farnsworth" />
        <CharacterListItem imageSrc={pacman} name="Pac-Man" />
        <CharacterListItem imageSrc={mike} name="Mike" />
      </List>
    </StyledEngineProvider>
  );
}
