import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

type Props = {
  posX: number;
  posY: number;
}

export default function SelectMenu({posX, posY}: Props) {
  //const handleClick = (e) => e.stopPropagation();

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
        padding: "8px"
      }}
    >
      <Button variant="text" sx={{ color: "white" }}>
        Farnsworth
      </Button>
      <Button variant="text" sx={{ color: "white" }}>
        Pac-Man
      </Button>
      <Button variant="text" sx={{ color: "white" }}>
        Mike
      </Button>
    </Stack>
  );
}
