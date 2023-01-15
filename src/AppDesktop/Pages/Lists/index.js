import React, { useEffect } from 'react';
import Lists from '../../Components/Middle/Lists/index';
import SearchBar from '../../Components/Helper/SearchBar/SearchBar';
import TrendingTweets from '../../Components/Right/TrendingTweets';
import LeftSide from '../../Components/LeftNavbar'
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const makeReq = async () => {
      try {
        const result = await axios.get('http://localhost:8082/pages/lists', { withCredentials: true });
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
    <div id='listsPage'>
      <LeftSide />
      <Lists />
      <div id='lists-right'>
        <SearchBar />
        <TrendingTweets />
      </div>
    </div>
  )
}

export default ListsPage;