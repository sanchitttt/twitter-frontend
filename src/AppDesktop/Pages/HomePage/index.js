import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LeftSide from '../../Components/LeftNavbar';
import Home from '../../Components/Middle/Home/index';
import ThreadTweet from '../../Components/Middle/ThreadTweet';
import RightSide from '../../Components/Right';
import './styles.css';

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const makeReq = async () => {
      try {
        const result = await axios.get('http://localhost:8082/pages/home', { withCredentials: true });
        if (result.status === 200) {
        }
        else{
          navigate('/')
        }
      } catch (error) {
        navigate('/')
      }
    }
    makeReq();
  }, []);
  return (
    <div id='homePage'>
      <LeftSide />
      <Home />
      <RightSide />
    </div>
  )
}

export default HomePage;