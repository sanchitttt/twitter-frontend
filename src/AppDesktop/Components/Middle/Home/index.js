import React, { useEffect, useState } from 'react';
import HomePost from './HomePost/index';
import './styles.css';
import Posts from '../PostsFeed/index';
import TweetsPreferenceTippy from './Helper/Tippy';
import Stories from './Stories';
import axios from 'axios';
import { BACKEND_URL } from '../../../../config/config';



// const postsArr = [
//   {
//     _id: "23-9o2-302-302",
//     profileSrc: "https://i.ibb.co/hFgzVsH/1655230024525.jpg",
//     accountName: "marKE9150",
//     accountHandle: "lasertoch",
//     timeStamp: "Wed Jan 04 2023 04:45:17 GMT+0530 (India Standard Time)",
//     tweetText: "Hey this is my first tweet @twitter",
//     verified: true,
//     taggedHandles: ["Kibo"],
//     whoCanReply: "Everyone can reply",
//     typeOfVerification: null,
//     views: 0,
//     replies: 0,
//     retweets: 0,
//     likes: 1,
//     attachments: [
//       "https://i.ibb.co/BnmScDN/pragya-T-cottage-in-rainy-mountainhyper-realistic-4k-fecd39d4-8c45-4e47-8b27-108569a98a92.png"
//     ],
//     likedAlready:true,
//     retweetedAlready:false
//   },
//   // {
//   //   id: "23-9o2-302-301",
//   //   profileSrc: "https://i.ibb.co/HNZQMnM/marvel.jpg",
//   //   accountName: "Marvel Entertainment",
//   //   accountHandle: "Marvel",
//   //   timeStamp: "Wed Jan 04 2023 08:34:10 GMT+0530 (India Standard Time)",
//   //   tweetText: "Taking the fight to the rink. 🛼 Watch a sneak peek of Marvel's #MoonGirlAndDevilDinosaur, premiering February 10 on @DisneyChannel.",
//   //   verified: true,
//   //   taggedHandles: [],
//   //   whoCanReply: "Everyone can reply",
//   //   typeOfVerification: 'business',
//   //   views: '148.2K',
//   //   replies: '14',
//   //   retweets: '64',
//   //   likes: 530,
//   //   attachments: [
//   //     "https://pbs.twimg.com/media/Flla2HYXwAAomKK?format=jpg&name=medium"
//   //   ]
//   // }
// ];

function Home() {
  const [showTweetPreferenceTippy, setShowTweetPreferenceTippy] = useState(false);
  const [showTippy, setShowTippy] = useState(false);
  const [typeOfTweets, setTypeOfTweets] = useState('latest');
  const [postsArr,setPostsArr] = useState([]);
  const [currentPost,setCurrentPost] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/home/timeline`,{withCredentials:true});
        setPostsArr(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  },[]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const tweetPreferenceTippy = document.getElementById('tweetPreferenceTippyRef');
      const tweetPreferenceTippyImg = document.getElementById('tweetPreferenceTippyImgRef');

      if (tweetPreferenceTippy) {
        if (tweetPreferenceTippy.contains(e.target) || tweetPreferenceTippyImg.contains(e.target)) {
          // Do nothing
        }
        else {
            setShowTippy(false);
        }
      }
    })
    return () => {
      document.removeEventListener('click' , () => {

      })
    }
  })

  const toggleHandler = () => {
    if(showTippy) setShowTippy(false);
    else setShowTippy(true);
  }
  return (
    <div className='custom-card' style={{ height: '100vh' }}>
      <div id='home'>
        <div id='home-top-heading'>
          <div id='home-top-heading-text' style={{fontFamily:'Poppins'}}>
            Home
          </div>
          <div id='tweetPreferenceTippyImgRef' className='home-top-heading-img-container'
            onClick={toggleHandler}
          >
            <img
              src='https://i.ibb.co/ZBQj15g/star-needed.png'
              width='24px'
              height='24px'
              alt='load-fresh-tweets'
            />
            {showTippy && <div id='tweetPreferenceTippyRef'><TweetsPreferenceTippy type={typeOfTweets} typeHandler={setTypeOfTweets} /></div>}
          </div>
        </div>
        <div id='homeStoriesContainer'>
            <Stories />
        </div>
        <HomePost />
        <div id='home-timeline'>
          <Posts forTimeline postsArr={postsArr} />
        </div>
      </div>
    </div>

  )
}

export default Home