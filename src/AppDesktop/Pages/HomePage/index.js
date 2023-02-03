import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LeftSide from '../../Components/LeftNavbar';
import Home from '../../Components/Middle/Home/index';
import ThreadTweet from '../../Components/Middle/ThreadTweet';
import RightSide from '../../Components/Right';
import { BACKEND_URL } from '../../../config/config';
import './styles.css';
import ErrorBoundary from '../../../ErrorBoundary';

function HomePage({whoToFollowArr}) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const makeReq = async () => {
  //     try {
  //       const result = await axios.get(`${BACKEND_URL}/pages/home`, { withCredentials: true });

  //       if (result.status === 200) {
  //       }
  //       else {
  //         // throw new Error("Unauthorized");
  //         navigate('/')
  //       }
  //     } catch (error) {
  //       // throw error;
  //       navigate('/')

  //     }
  //   }
  //   makeReq();
  // }, []);
  return (
    <div id='homePage'>
      <ErrorBoundary>
        {/* <LeftSide /> */}
        <Home />
        <RightSide whoToFollowArr={whoToFollowArr} />
      </ErrorBoundary>

    </div>
  )
}

export default HomePage;