import React, { MouseEventHandler } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import type { Character } from "../../App";

type Props = {
  posX: number;
  posY: number;
  handleButtonClick: MouseEventHandler;
  characters: Character[];
};

export default function SelectMenu({
  posX,
  posY,
  handleButtonClick,
  characters,
}: Props) {
  return (
    <Stack
      spacing={2}
      direction="column"
      style={{
        position: "absolute",
        left: `${posX}px`,
        top: `${posY}px`,
        backgroundColor: "var(--black)",
        borderRadius: "10px",
        padding: "8px",
      }}
      role="menu"
    >
      {characters.map((character) => (
        <Button
          variant="text"
          sx={{ color: "white" }}
          value={character.name}
          data-characterid={character.id}
          key={character.id}
          onClick={handleButtonClick}
        >
          {character.name}
        </Button>
      ))}
    </Stack>
  );
}
