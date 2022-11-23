import React, {useState} from 'react';
import Header from './components/Header/Header';
import MainImage from './components/Main/MainImage';
import HomeModal from './components/Modal/HomeModal';

function App() {
  const [showingHome, setShowingHome] = useState(true);
  return (
    <div>
      <Header />
      <MainImage />
      <HomeModal open={showingHome}/>
    </div>
  );
}

export default App;
