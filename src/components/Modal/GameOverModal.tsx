import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./modal.css";

export default function GameOverModal() {
  const minutes = useMemo((): string => {
    return document.querySelector(".timer .minutes")!.textContent!;
  }, []);

  const seconds = useMemo((): string => {
    return document.querySelector(".timer .seconds")!.textContent!;
  }, []);

  const displayableTime = () => {
    const min = parseInt(minutes, 10);
    const sec = parseInt(seconds, 10);
    let displayMin = "";
    let displaySec = "";
    if (min === 1) {
      displayMin = "1 minute";
    } else if (min > 1) {
      displayMin = `${min} minutes`;
    }
    if (sec === 1) {
      displaySec = " 1 second";
    } else if (sec > 1) {
      displaySec = ` ${sec} seconds`;
    }
    return `${displayMin}${displaySec}`;
  };

  useEffect(() => {});

  return (
    <div className="modal-background lightly-dimmed center no-scroll">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          backgroundColor: "white",
          width: "95%",
          maxWidth: "420px",
          padding: "14px 18px",
          borderRadius: "10px",
        }}
      >
        <h2>Nice one, Detective!</h2>
        <p>
          You've completed the game in <b>{displayableTime()}</b>! Enter your
          name below to be ranked on the leaderboard:
        </p>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          sx={{ marginBottom: "18px" }}
        />
        <Stack spacing={2} direction="row">
          <Button variant="contained">Submit</Button>
          <Button variant="outlined">Skip</Button>
        </Stack>
      </Box>
    </div>
  );
}
