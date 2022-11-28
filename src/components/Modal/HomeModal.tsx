import React from "react";
import CharacterListItem from "../Header/DropdownList/CharacterListItem";
import Image from "../../assets/images/robot_city.jpg";
import farnsworth from "../../assets/images/farnsworth.png";
import pacman from "../../assets/images/pacman.png";
import mike from "../../assets/images/mike.png";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./modal.css";

type Props = {
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  gameReady: boolean;
};

export default function HomeModal({ setGameStart, gameReady }: Props) {
  const textStyles = {
    fontSize: "14px",
    fontWeight: "normal",
  };

  const handleStartClick = () => {
    setGameStart(true);
  };

  let startButton;

  if (gameReady) {
    startButton = (
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ fontWeight: "800" }}
        onClick={handleStartClick}
        disableElevation
      >
        Start!
      </Button>
    );
  } else {
    startButton = (
      <CircularProgress
        color="inherit"
        style={{ width: "32px", height: "32px" }}
      />
    );
  }

  return (
    <div className="modal-background">
      <div>
        <h1 className="game-title">Seek 'n Find</h1>
        <div className="modal-box">
          <div className="image-preview-container">
            <img src={Image} alt="preview" className="image-preview" />
          </div>
          <div className="instructions">
            <h3>How To Play</h3>
            <p>
              Find the characters below by scrolling through the image and
              tagging them. You will be timed.
              <br />
              Good luck!
            </p>
          </div>
          <div className="characters">
            <CharacterListItem
              imageSrc={farnsworth}
              name="Farnsworth"
              itemStyles={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              textStyles={textStyles}
            />
            <CharacterListItem
              imageSrc={pacman}
              name="Pac-Man"
              itemStyles={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              textStyles={textStyles}
            />
            <CharacterListItem
              imageSrc={mike}
              name="Mike"
              itemStyles={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              textStyles={textStyles}
            />
          </div>
          <div className="modal-footer">{startButton}</div>
        </div>
      </div>
    </div>
  );
}
