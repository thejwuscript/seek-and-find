import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import MainImage from "./components/Main/Image/MainImage";
import HomeModal from "./components/Modal/HomeModal";
import Feedback from './components/Feedback';
import { db } from "./firebase-config";
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

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!gameStart) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "scroll";
  }, [gameStart]);

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

  const changeFoundStatus = (index: number): void => {
    const copiedListOfCharacters = characters.slice();
    const foundCharacter = { ...copiedListOfCharacters[index], isFound: true };
    copiedListOfCharacters[index] = foundCharacter;
    setCharacters(copiedListOfCharacters);
  };

  const changeFeedback = (message: string = ''): void => {
    setFeedback(''); // empty string to dismount Feedback
    setTimeout(() => setFeedback(message), 0); // then mount Feedback again with the proper message
  }

  const handleCloseSnackBar = (event: React.SyntheticEvent<any> | Event, reason: string | undefined) => {
    if (reason === 'clickaway') return; // prevent snackbar from closing on clickaway

    setFeedback('');
  }

  return (
    <div>
      <Header gameStart={gameStart} setGameStart={setGameStart} />
      <MainImage
        setImageLoaded={setMainImageLoaded}
        characters={characters}
        changeFoundStatus={changeFoundStatus}
        changeFeedback={changeFeedback}
      />
      {feedback && <Feedback message={feedback} handleClose={handleCloseSnackBar}/>}
      {!gameStart && (
        <HomeModal setGameStart={setGameStart} gameReady={mainImageLoaded} />
      )}
    </div>
  );
}

export default App;
export type { Character };
