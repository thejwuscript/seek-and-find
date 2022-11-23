import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/Main/MainImage";
import HomeModal from "./components/Modal/HomeModal";

function App() {
  const [showingHome, setShowingHome] = useState(true);

  useEffect(() => {
    if (showingHome) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [showingHome]);

  return (
    <div>
      <Header />
      <MainImage />
      <HomeModal open={showingHome} />
    </div>
  );
}

export default App;
