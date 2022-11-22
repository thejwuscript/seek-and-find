import React from 'react';
import Counter from './Counter/Counter';
import HomeIcon from '@mui/icons-material/Home';
import Timer from './Timer/Timer';
import './header.css';

export default function Header() {
  return (
    <header>
      <div className='header-content'>
        <HomeIcon sx={{color: "white", fontSize: "28px"}} />
        <Timer />
        <Counter />
      </div>
    </header>
  )
};