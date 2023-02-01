import React, { useEffect } from 'react';
import Bookmarks from '../../Components/Middle/Bookmarks';
import SearchBar from '../../Components/Helper/SearchBar/SearchBar';
import TrendingTweets from '../../Components/Right/TrendingTweets';
import LeftSide from '../../Components/LeftNavbar'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookmarksPage() {
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
    <div id='bookmarksPage'>
      {/* <LeftSide /> */}
      <div id='bookmarks-main'>
        <Bookmarks />
      </div>
      <div id='bookmarks-right'>
        <SearchBar />
        <TrendingTweets />
      </div>
    </div>
  )
}

export default BookmarksPage;