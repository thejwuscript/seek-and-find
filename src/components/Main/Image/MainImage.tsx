import React from "react";
import SelectMenu from '../SelectMenu/SelectMenu';
import robotCity from "../../../assets/images/robot_city.jpg";
import "./mainImage.css";

type Props = {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageClick: React.MouseEventHandler<HTMLDivElement>;
  isMenuVisible: boolean;
};

export default function MainImage({ setImageLoaded, handleImageClick, isMenuVisible }: Props) {
  return (
    <div onClick={handleImageClick} >
      <img
        src={robotCity}
        alt="main"
        className="main-image"
        onLoad={() => setImageLoaded(true)}
      />
      {isMenuVisible && <SelectMenu />}
    </div>
  );
}
