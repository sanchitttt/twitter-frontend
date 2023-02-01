import TrendingTweet from '../../Helper/TrendingTweet/index';
import React from 'react';
import './styles.css';

const trendingTweetsArr = [
  {
    topText: "Trending in India",
    heading: "Leo Messi",
    subText: "30.8K Tweets"
  },
  {
    topText: "Entertainment · Trending",
    heading: "#VarisuTralier",
    subText: "Trending with #ThalapathyVijay, #RashmikaMandanna"
  },
  {
    topText: "Trending in India",
    heading: "#PathaanTrailer",
    subText: "17.5K Tweets"
  },
  {
    topText: "Trending in India",
    heading: "#PathaanTrailer",
    subText: "17.5K Tweets"
  },
  {
    topText: "Trending in India",
    heading: "#PathaanTrailer",
    subText: "17.5K Tweets"
  }
];

const TrendingTweets = () => {
  return (
    <div className="rightSide-whats-happening-trendingTweets-container">
      {trendingTweetsArr.map((trendingItem,idx) => {
        return (
          <TrendingTweet
          key={idx}
            topText={trendingItem.topText}
            heading={trendingItem.heading}
            subText={trendingItem.subText}
          />
        );
      })}
    </div>
  );
};

export default TrendingTweets;
