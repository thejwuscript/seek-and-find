import React, { useState } from "react";
import DropdownList from "../DropdownList/DropdownList";
import "./counter.css";

type Props = {
  count: number;
  foundCharacters: string[];
};

export default function Counter({ count, foundCharacters }: Props) {
  const [showingList, setShowingList] = useState(false);

  const handleCounterClick = () => {
    setShowingList(!showingList);
  };

  return (
    <div
      className="counter-container"
      onClick={handleCounterClick}
      style={{ cursor: "pointer" }}
    >
      <span className="counter-number">{count}</span>
      <DropdownList isShowing={showingList} foundCharacters={foundCharacters} />
    </div>
  );
}
