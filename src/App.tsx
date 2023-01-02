import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/MainImage/MainImage";
import HomeModal from "./components/Modal/HomeModal";
import Feedback from "./components/Feedback/Feedback";
import GameOverModal from "./components/Modal/GameOverModal";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

type Character = {
  id: string;
  name: string;
  isFound: boolean;
};

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameStart || gameOver) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "overlay";

    return () => {
      document.body.style.overflowY = "overlay";
    };
  }, [gameStart, gameOver]);

  useEffect(() => {
    const charactersData = async () => {
      let arrayOfCharacters: Character[] = [];
      const querySnapshot = await getDocs(collection(db, "Characters"));
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        arrayOfCharacters.push({ id: doc.id, name: name, isFound: false });
      });
      return arrayOfCharacters;
    };

    charactersData().then((data) => setCharacters(data));
  }, [gameStart]);

  const remainingCount = characters.reduce((result, character) => {
    if (character.isFound) result -= 1;
    return result;
  }, 3);

  useEffect(() => {
    if (remainingCount === 0) setGameOver(true);
  }, [remainingCount]);

  const changeFoundStatus = (id: string): void => {
    const copiedListOfCharacters = characters.slice();
    const character = copiedListOfCharacters.find(
      (character) => character.id === id
    );
    if (character) character.isFound = true;
    setCharacters(copiedListOfCharacters);
  };

  const changeFeedback = (message: string = ""): void => {
    setFeedback(""); // empty string to dismount Feedback
    setTimeout(() => setFeedback(message), 0); // then mount Feedback again with the proper message
  };

  const handleCloseSnackBar = (
    event: React.SyntheticEvent<any> | Event,
    reason: string | undefined
  ) => {
    if (reason === "clickaway") return; // prevent snackbar from closing on clickaway

    setFeedback("");
  };

  const foundCharacterNames = characters
    .filter((char) => char.isFound)
    .map((char) => char?.name);

  return (
    <div>
      <Header
        gameStart={gameStart}
        setGameStart={setGameStart}
        count={remainingCount}
        gameOver={gameOver}
        foundCharacterNames={foundCharacterNames}
      />
      <MainImage
        setImageLoaded={setMainImageLoaded}
        characters={characters}
        changeFoundStatus={changeFoundStatus}
        changeFeedback={changeFeedback}
      />
      {feedback && (
        <Feedback message={feedback} handleClose={handleCloseSnackBar} />
      )}
      {!gameStart && (
        <HomeModal setGameStart={setGameStart} gameReady={mainImageLoaded} />
      )}
      {gameOver && <GameOverModal />}
    </div>
  );
}

export default App;
export type { Character };
