import React, { useState, useRef } from "react";
import SelectMenu from "../SelectMenu/SelectMenu";
import robotCity from "../../assets/images/robot_city.jpg";
import type { Character } from "../../App";
import "./mainImage.css";
import Credit from "../Credits/Credits";

type Props = {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  characters: Character[];
  changeFoundStatus: (id: string) => void;
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
    const { x, y } = imgRef.current.getBoundingClientRect(); // y starts at 52 due to sticky header, x starts at 0
    const X = e.clientX - x;
    const Y = e.clientY - y;
    setPosition([X, Y]);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const clickedX = position[0] / Math.max(window.innerWidth, 1024);
    const clickedY = position[1] / imgRef.current.height;
    const clickedName = target.value;
    const characterId = e.currentTarget.dataset.characterid!;

    fetch(
      `/.netlify/functions/validate-selection?id=${characterId}&clickedX=${clickedX}&clickedY=${clickedY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          changeFeedback("Keep looking!");
        } else {
          changeFoundStatus(characterId);
          changeFeedback(`You've found ${clickedName}!`);
        }
      });
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
          characters={characters}
        />
      )}
    </div>
  );
}
