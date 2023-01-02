import React, { useState } from "react";
import DropdownList from "../List/DropdownList";
import "./counter.css";

type Props = {
  count: number;
  foundCharacterNames: string[];
};

export default function Counter({ count, foundCharacterNames }: Props) {
  const [showingList, setShowingList] = useState(false);

  const handleCounterClick = () => {
    setShowingList(!showingList);
  };

  return (
    <div
      className="counter-container"
      role="button"
      onClick={handleCounterClick}
      style={{ cursor: "pointer" }}
    >
      <span className="counter-number">{count}</span>
      <DropdownList isShowing={showingList} foundCharacterNames={foundCharacterNames} />
    </div>
  );
}
