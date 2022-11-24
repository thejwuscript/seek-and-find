import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/Main/MainImage";
import HomeModal from "./components/Modal/HomeModal";

function App() {
  const [showingHome, setShowingHome] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  useEffect(() => {
    if (showingHome) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [showingHome]);

  return (
    <div>
      <Header />
      <MainImage setImageLoaded={setMainImageLoaded} />
      <HomeModal open={showingHome} gameReady={mainImageLoaded} />
    </div>
  );
}

export default App;
