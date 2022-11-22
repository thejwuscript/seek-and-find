import React from "react";
import { ListItem, ListItemText } from "@mui/material";

type CharacterListItemProps = {
  imageSrc: string;
  name: string;
};

export default function CharacterListItem({
  imageSrc,
  name,
}: CharacterListItemProps) {
  return (
    <ListItem alignItems="center" sx={{gap: "28px"}}>
      <img src={imageSrc} alt={name} className="character-image" />
      <ListItemText primary={name} />
    </ListItem>
  );
}
