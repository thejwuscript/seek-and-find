import React from "react";
import List from "@mui/material/List";
import farnsworth from "../../../assets/images/farnsworth.png";
import pacman from "../../../assets/images/pacman.png";
import mike from "../../../assets/images/mike.png";
import "./dropdownList.css";
import CharacterListItem from "./CharacterListItem";

export default function DropdownList() {
  return (
    <>
      <List
        sx={{
          position: "absolute",
          right: 0,
          top: "45px",
          backgroundColor: "#696969",
          opacity: "0.9",
          width: "280px",
        }}
      >
        <CharacterListItem imageSrc={farnsworth} name="Farnsworth" />
        <CharacterListItem imageSrc={pacman} name="Pac-Man" />
        <CharacterListItem imageSrc={mike} name="Mike" />
      </List>
    </>
  );
}
