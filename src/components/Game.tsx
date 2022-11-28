import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import MainImage from "./Main/Image/MainImage";
import HomeModal from "./Modal/HomeModal";
import Feedback from "./Feedback";
import GameOverModal from "./Modal/GameOverModal";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

type Character = {
  name: string;
  posX: Range;
  posY: Range;
  isFound: boolean;
};

type Range = {
  min: number;
  max: number;
};

export default function Game() {
  const [gameStart, setGameStart] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameStart || gameOver) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "overlay";

    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, [gameStart, gameOver]);

  useEffect(() => {
    const charactersData = async () => {
      let arrayOfCharacters: Character[] = [];
      const querySnapshot = await getDocs(collection(db, "Characters"));
      querySnapshot.forEach((doc) => {
        const { name, posX, posY } = doc.data();
        arrayOfCharacters.push({ name, posX, posY, isFound: false });
      });
      return arrayOfCharacters;
    };

    charactersData().then((data) => setCharacters(data));
  }, []);

  const remainingCount = characters.reduce((result, character) => {
    if (character.isFound) result -= 1;
    return result;
  }, 3);

  useEffect(() => {
    if (remainingCount === 0) setGameOver(true);
  }, [remainingCount]);

  const changeFoundStatus = (index: number): void => {
    const copiedListOfCharacters = characters.slice();
    const foundCharacter = { ...copiedListOfCharacters[index], isFound: true };
    copiedListOfCharacters[index] = foundCharacter;
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

  const foundCharacters = characters
    .filter((char) => char.isFound)
    .map((char) => char?.name);

  return (
    <div>
      <Header
        gameStart={gameStart}
        setGameStart={setGameStart}
        count={remainingCount}
        gameOver={gameOver}
        foundCharacters={foundCharacters}
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

export type { Character };