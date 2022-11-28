import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Leaderboard from './components/Leaderboard';

export default function RouterSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}