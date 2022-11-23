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
  const textStyles = {
    fontSize: "20px",
    fontWeight: "600",
  };

  return (
    <StyledEngineProvider injectFirst>
      <List className={listClassName}>
        <CharacterListItem
          imageSrc={farnsworth}
          name="Farnsworth"
          itemStyles={{ gap: "28px" }}
          textStyles={textStyles}
        />
        <CharacterListItem
          imageSrc={pacman}
          name="Pac-Man"
          itemStyles={{ gap: "28px" }}
          textStyles={textStyles}
        />
        <CharacterListItem
          imageSrc={mike}
          name="Mike"
          itemStyles={{ gap: "28px" }}
          textStyles={textStyles}
        />
      </List>
    </StyledEngineProvider>
  );
}
