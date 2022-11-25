import React, { useState } from "react";
import DropdownList from "../DropdownList/DropdownList";
import "./counter.css";

export default function Counter() {
  const [showingList, setShowingList] = useState(false);

  const handleCounterClick = () => {
    setShowingList(!showingList);
  };

  return (
    <div className="counter-container" onClick={handleCounterClick} style={{cursor: "pointer"}}>
      <span className="counter-number">3</span>
      <DropdownList isShowing={showingList} />
    </div>
  );
}
