import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../config/config';
import DarkText from './Helper/DarkText/index';
import LightText from './Helper/LightText/index';
import NavBar from './Navbar/index';
import NavBarBottom from './NavbarBottom';
import './styles.css';

function LeftSide() {
  const navigate = useNavigate();
  const [showLeftNavBar, setShowLeftNavBar] = useState(true);
  const [userData, setUserData] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  // console.log('executed');

  useEffect(() => {
    setShowLoading(true);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        let result = await axios.get(`${BACKEND_URL}/other/getAccountDetails`, { withCredentials: true });
        setUserData({ isLoggedIn: true, data: result.data });
        console.log('called2');
        setShowLoading(false);
      } catch (error) {
        setUserData({ isLoggedIn: false })
        setShowLoading(false);
      }
    }
    fetch();
  }, []);

  if (showLoading) {
    return <div style={{ width: '256px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <CircularProgress variant="indeterminate" />
    </div>
  }
  return (
    showLeftNavBar && userData.isLoggedIn &&
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
      <NavBarBottom userData={userData} />

    </div>
  )
}

export default LeftSide