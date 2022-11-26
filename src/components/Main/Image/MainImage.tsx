import React, { useState, useRef } from "react";
import SelectMenu from '../SelectMenu/SelectMenu';
import robotCity from "../../../assets/images/robot_city.jpg";
import type { Character } from '../../../App';
import "./mainImage.css";

type Props = {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  characters: Character[];
};

export default function MainImage({ setImageLoaded, characters }: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [position, setPosition] = useState<number[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsMenuVisible(!isMenuVisible);
    setPosition([e.pageX, e.pageY]);
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const clickedPosX = position[0] / (window.innerWidth);
    const clickedPosY = (position[1] - 56) / (imgRef.current!.height);
    const clickedName = target.value;
    for (let i = 0; i < 3; i++) {
      let character = characters[i];
      if (clickedName === character.name && (clickedPosX > character.posX.min && clickedPosX < character.posX.max) && (clickedPosY > character.posY.min && clickedPosY < character.posY.max)) {
        console.log("it's a hit!")
        break;
      } else {
        console.log("it's a miss!")
      }
    }
  }

  return (
    <div onClick={handleImageClick} >
      <img
        src={robotCity}
        alt="main"
        className="main-image"
        onLoad={() => setImageLoaded(true)}
        ref={imgRef}
      />
      {isMenuVisible && <SelectMenu posX={position[0]} posY={position[1]} handleButtonClick={handleButtonClick} />}
    </div>
  );
}
