import React from "react";
import { ListItem, ListItemText } from "@mui/material";

type CharacterListItemProps = {
  imageSrc: string;
  name: string;
  itemStyles: object;
  textStyles: object;
  isFound?: boolean;
};

export default function CharacterListItem({
  imageSrc,
  name,
  itemStyles,
  textStyles,
  isFound,
}: CharacterListItemProps) {
  if (isFound) itemStyles = { ...itemStyles, filter: "brightness(50%)" };

  return (
    <ListItem alignItems="center" sx={itemStyles}>
      <img src={imageSrc} alt={name} className="character-image" />
      <ListItemText
        primary={name}
        primaryTypographyProps={{ style: textStyles }}
      />
    </ListItem>
  );
}
