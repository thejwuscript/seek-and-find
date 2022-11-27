import React, { MouseEventHandler } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type Props = {
  posX: number;
  posY: number;
  handleButtonClick: MouseEventHandler;
};

export default function SelectMenu({ posX, posY, handleButtonClick }: Props) {
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
    >
      <Button
        variant="text"
        sx={{ color: "white" }}
        value="Farnsworth"
        onClick={handleButtonClick}
      >
        Farnsworth
      </Button>
      <Button
        variant="text"
        sx={{ color: "white" }}
        value="Pac-Man"
        onClick={handleButtonClick}
      >
        Pac-Man
      </Button>
      <Button
        variant="text"
        sx={{ color: "white" }}
        value="Mike"
        onClick={handleButtonClick}
      >
        Mike
      </Button>
    </Stack>
  );
}
