import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/Main/Image/MainImage";
import HomeModal from "./components/Modal/HomeModal";
import { db } from "./firebase-config";
import { collection, DocumentData, getDocs } from "firebase/firestore";

type Character = {
  name: string;
  posX: Range;
  poxY: Range;
};

type Range = {
  min: number;
  max: number;
};

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [characters, setCharacters] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (!gameStart) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [gameStart]);

  useEffect(() => {
    const charactersData = async () => {
      let array: DocumentData[] = [];
      const querySnapshot = await getDocs(collection(db, "Characters"));
      querySnapshot.forEach((doc) => array.push(doc.data()));
      return array;
    };

    charactersData().then((data) => setCharacters(data));
  }, []);

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
