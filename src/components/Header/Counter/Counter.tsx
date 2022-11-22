import DropdownList from "../DropdownList/DropdownList";
import './counter.css';

export default function Counter() {
  return (
    <div className="counter-container">
      <span className="counter-number">3</span>
      <DropdownList />
    </div>
  );
}
