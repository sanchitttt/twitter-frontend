import React, { useEffect } from 'react';
import Profile from  '../../Components/Middle/Profile/index';
import SearchBar from '../../Components/Helper/SearchBar/SearchBar';
import TrendingTweets from '../../Components/Right/TrendingTweets';
import WhoToFollow from '../../Components/Right/WhoToFollow';
import LeftSide from '../../Components/LeftNavbar'
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import {BACKEND_URL} from '../../../config/config';
import axios from 'axios';

function ProfilePage({whoToFollowArr}) {
  const navigate = useNavigate();
  const {accountHandle} = useParams();
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
    <div id='profilePage'>
      {/* <LeftSide /> */}
      <Profile accountHandleGiven={accountHandle} />
      <div id='profilePage-right'>
        <SearchBar />
        <TrendingTweets />
        <WhoToFollow  whoToFollowArr={whoToFollowArr} />
      </div>
    </div>
  )
}

export default ProfilePage;