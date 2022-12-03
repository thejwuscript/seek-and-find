import React, { useState, useRef } from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import robotCity from "../../assets/images/robot_city.jpg";
import type { Character } from "../../App";
import "./mainImage.css";
import Credit from "../Credits/Credits";

type Props = {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  characters: Character[];
  changeFoundStatus: (index: number) => void;
  changeFeedback: (message: string) => void;
};

export default function MainImage({
  setImageLoaded,
  characters,
  changeFoundStatus,
  changeFeedback,
}: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [position, setPosition] = useState<number[]>([]);
  const imgRef = useRef<HTMLImageElement>(null!);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsMenuVisible(!isMenuVisible);
    const { x, y } = imgRef.current.getBoundingClientRect(); // y starts at 56 due to sticky header, x starts at 0
    const X = e.clientX - x;
    const Y = e.clientY - y;
    setPosition([X, Y]);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    const target = e.target as HTMLButtonElement;
    const clickedPosX = position[0] / Math.max(window.innerWidth, 1024);
    const clickedPosY = position[1] / imgRef.current.height;
    const clickedName = target.value;
    const isAMatch = (character: Character) => {
      return (
        clickedName === character.name &&
        clickedPosX > character.posX.min &&
        clickedPosX < character.posX.max &&
        clickedPosY > character.posY.min &&
        clickedPosY < character.posY.max
      );
    };

    for (let i = 0; i < 3; i++) {
      if (isAMatch(characters[i])) {
        changeFoundStatus(i);
        changeFeedback(`You've found ${clickedName}!`);
        break;
      } else {
        changeFeedback("Keep looking!");
      }
    }
  };

  return (
    <div className="main-image-container" onClick={handleImageClick}>
      <img
        src={robotCity}
        width={1920}
        alt="main"
        className="main-image"
        onLoad={() => setImageLoaded(true)}
        ref={imgRef}
      />
      <Credit />
      {isMenuVisible && (
        <SelectMenu
          posX={position[0]}
          posY={position[1]}
          handleButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
}
