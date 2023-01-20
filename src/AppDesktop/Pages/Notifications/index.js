import React, { useEffect } from 'react';
import Notifications from '../../Components/Middle/Notifications';
import SearchBar from '../../Components/Helper/SearchBar/SearchBar';
import TrendingTweets from '../../Components/Right/TrendingTweets';
import WhoToFollow from '../../Components/Right/WhoToFollow';
import LeftSide from '../../Components/LeftNavbar';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../../config/config';

function NotificationsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const makeReq = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/home`, { withCredentials: true });
        if (result.status === 200) {
        }
        else {
          navigate('/')
        }
      } catch (error) {
        navigate('/')
      }
    }
    makeReq();
  }, []);
  return (
    <div id='notificationsPage'>
      <LeftSide />
      <Notifications />
      <div id='notificationsPage-right'>
        <SearchBar />
        <TrendingTweets />
        <WhoToFollow />
      </div>
    </div>
  )
}

export default NotificationsPage;