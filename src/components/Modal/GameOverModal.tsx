import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./modal.css";

export default function GameOverModal() {
  return (
    <div className="modal-background lightly-dimmed center">
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
          You've completed the game in <b>40 seconds</b>! Enter your name below to be
          ranked on the leaderboard:
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
