import React from "react";
import robotCity from "../../assets/images/robot_city.jpg";
import "./mainImage.css";

export default function MainImage() {
  return (
    <div>
      <img src={robotCity} alt="main" className="main-image" />
    </div>
  );
}
