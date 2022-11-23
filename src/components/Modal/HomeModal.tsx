import React from "react";
import "./homeModal.css";

type Props = {
  open: boolean;
};

export default function HomeModal({ open }: Props) {
  return (
    <div className="modal-background">
      <div>
        <h1 className="game-title">Seek 'n Find</h1>
        <div className="modal-box"></div>
      </div>
    </div>
  );
}
