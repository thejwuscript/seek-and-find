import React from "react";
import Counter from "./Counter/Counter";
import HomeIcon from "@mui/icons-material/Home";
import Timer from "./Timer/Timer";
import "./header.css";
import "./Timer/timer.css";

type Props = {
  gameStart: boolean;
};

export default function Header({ gameStart }: Props) {
  let timer = gameStart ? <Timer /> : <div className="timer">00:00</div>;
  return (
    <header>
      <div className="header-content">
        <HomeIcon sx={{ color: "white", fontSize: "28px" }} />
        {timer}
        <Counter />
      </div>
    </header>
  );
}
