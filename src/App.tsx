import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/Main/Image/MainImage";
import HomeModal from "./components/Modal/HomeModal";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  useEffect(() => {
    if (!gameStart) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [gameStart]);

  const handleImageClick = (): void => {
    setIsContextMenuVisible(!isContextMenuVisible);
  }

  return (
    <div>
      <Header gameStart={gameStart} setGameStart={setGameStart} />
      <MainImage setImageLoaded={setMainImageLoaded} handleImageClick={handleImageClick} isMenuVisible={isContextMenuVisible} />
      {!gameStart && (
        <HomeModal setGameStart={setGameStart} gameReady={mainImageLoaded} />
      )}
    </div>
  );
}

export default App;
