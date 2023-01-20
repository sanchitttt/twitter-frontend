import React, { useEffect } from 'react';
import Explore from '../../Components/Middle/Explore';
import WhoToFollow from '../../Components/Right/WhoToFollow';
import LeftSide from '../../Components/LeftNavbar'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../../config/config';

function ExplorePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const makeReq = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/home`, { withCredentials: true });
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
    <div id='explorePage'>
      <LeftSide />
      <div><Explore /></div>
      <div id='explorePageRight'><WhoToFollow /></div>
    </div>
  )
}

export default ExplorePage;