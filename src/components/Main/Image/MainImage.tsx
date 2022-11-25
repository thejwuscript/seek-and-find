import React, { useState, useRef } from "react";
import SelectMenu from '../SelectMenu/SelectMenu';
import robotCity from "../../../assets/images/robot_city.jpg";
import "./mainImage.css";

type Props = {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  //handleImageClick: React.MouseEventHandler<HTMLDivElement>;
  //isMenuVisible: boolean;
};

export default function MainImage({ setImageLoaded }: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [position, setPosition] = useState<number[]>([]);
  const imgRef = useRef(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsMenuVisible(!isMenuVisible);
    // if (e.target === imgRef.current) {
    //   const posX = e.pageX / window.innerWidth;
    //   const posY = (e.pageY - 56) / (e.target['height']);
    //   setPosition([posX, posY]);
    // }
    setPosition([e.pageX, e.pageY]);
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
      {isMenuVisible && <SelectMenu posX={position[0]} posY={position[1]} />}
    </div>
  );
}
