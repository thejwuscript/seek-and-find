import React from "react";
import Counter from "../Counter/Counter";
import HomeIcon from "@mui/icons-material/Home";
import Timer from "../Timer/Timer";
import "./header.css";
import "../Timer/timer.css";

type Props = {
  gameStart: boolean;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  count: number;
  gameOver: boolean;
  foundCharacters: string[];
};

export default function Header({
  gameStart,
  setGameStart,
  count,
  gameOver,
  foundCharacters,
}: Props) {
  let timer = gameStart ? (
    <Timer gameOver={gameOver} />
  ) : (
    <div className="timer">00:00</div>
  );
  return (
    <header>
      <div className="header-content">
        <HomeIcon
          sx={{ color: "white", fontSize: "28px", cursor: "pointer" }}
          onClick={() => setGameStart(false)}
        />
        {timer}
        <Counter count={count} foundCharacters={foundCharacters} />
      </div>
    </header>
  );
}
