import React from "react";
import ContextMenu from '../ContextMenu/ContextMenu';
import robotCity from "../../../assets/images/robot_city.jpg";
import "./mainImage.css";

type Props = {
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainImage({ setImageLoaded }: Props) {
  return (
    <div>
      <img
        src={robotCity}
        alt="main"
        className="main-image"
        onLoad={() => setImageLoaded(true)}
      />
      <ContextMenu />
    </div>
  );
}
