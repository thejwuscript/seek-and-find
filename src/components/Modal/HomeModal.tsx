import React from "react";
import "./homeModal.css";
import Image from "../../assets/images/robot_city.jpg";

type Props = {
  open: boolean;
};

export default function HomeModal({ open }: Props) {
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
            
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
