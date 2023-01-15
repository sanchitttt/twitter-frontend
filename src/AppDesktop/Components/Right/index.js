import React from 'react';
import './styles.css';
import WhoToFollow from './WhoToFollow/index';
import SearchBar from '../Helper/SearchBar/SearchBar';
import TrendingTweets from './TrendingTweets/index';
import { TrendingTweetShowMoreTweets } from '../Helper/TrendingTweet/Helper/index';



function RightSide() {
  return (
    <div className='rightSideInsideContainer'>
      <div>
        <SearchBar />
      </div>
      <div style={{ marginTop: '20px', marginLeft: '15px' }}>
        <div className="rightSide-whats-happening">
          <div>
            <div className="rightSide-whats-happening-text">What's happening</div>
            <TrendingTweets />
          </div>
          <div>
            <TrendingTweetShowMoreTweets />
          </div>
        </div>

      </div>
      <div style={{ marginTop: '20px', marginLeft: '15px' }}>
        <WhoToFollow />
      </div>
    </div>
  )
}

export default RightSide;