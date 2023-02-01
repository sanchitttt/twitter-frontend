import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkText from './Helper/DarkText/index';
import LightText from './Helper/LightText/index';
import NavBar from './Navbar/index';
import NavBarBottom from './NavbarBottom';
import './styles.css';

function LeftSide() {
  const navigate = useNavigate();
  const [showLeftNavBar, setShowLeftNavBar] = useState(true);
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') if (showLeftNavBar) setShowLeftNavBar(false);
  }, []);

  return (
    showLeftNavBar &&
    <div id='leftSide'>
      <div id='leftTop'>
        <div className='twitter-bird-container'>
          <div className='twitter-bird-left' onClick={() => {
            navigate('/home')
          }}>
            <img className='twitter-bird' src='https://i.ibb.co/SQZP6HT/twitter-icon.png' width='28.3px' height='23px' />
          </div>
          <div className='twitter-bird-right'></div>
        </div>
        <NavBar />
      </div>
      <NavBarBottom />
    </div>
  )
}

export default LeftSide