import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/Main/MainImage";
import HomeModal from "./components/Modal/HomeModal";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  useEffect(() => {
    if (!gameStart) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [gameStart]);

  return (
    <div>
      <Header gameStart={gameStart} setGameStart={setGameStart} />
      <MainImage setImageLoaded={setMainImageLoaded} />
      {!gameStart && (
        <HomeModal setGameStart={setGameStart} gameReady={mainImageLoaded} />
      )}
    </div>
  );
}

export default App;
