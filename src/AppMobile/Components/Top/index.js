import React from 'react';
import Posts from '../../../AppDesktop/Components/Middle/PostsFeed/index';
import './styles.css';

const postsArr = [
    {
      id: "23-9o2-302-3232",
      profileSrc: "https://i.ibb.co/hFgzVsH/1655230024525.jpg",
      accountName: "marKE9150",
      accountHandle: "lasertoch",
      timeStamp: "Wed Jan 04 2023 04:45:17 GMT+0530 (India Standard Time)",
      tweetText: "Hey this is my first tweet @twitter",
      verified: true,
      taggedHandles: ["Kibo"],
      whoCanReply: "Everyone can reply",
      typeOfVerification: null,
      views: 0,
      replies: 0,
      retweets: 0,
      likes: 1,
      attachments: [
        "https://i.ibb.co/BnmScDN/pragya-T-cottage-in-rainy-mountainhyper-realistic-4k-fecd39d4-8c45-4e47-8b27-108569a98a92.png"
      ]
    },
    {
      id: "23-9o2-302-301",
      profileSrc: "https://i.ibb.co/HNZQMnM/marvel.jpg",
      accountName: "Marvel Entertainment",
      accountHandle: "Marvel",
      timeStamp: "Wed Jan 04 2023 08:34:10 GMT+0530 (India Standard Time)",
      tweetText: "Taking the fight to the rink. 🛼 Watch a sneak peek of Marvel's #MoonGirlAndDevilDinosaur, premiering February 10 on @DisneyChannel.",
      verified: true,
      taggedHandles: [],
      whoCanReply: "Everyone can reply",
      typeOfVerification: 'business',
      views: '148.2K',
      replies: '14',
      retweets: '64',
      likes: 530,
      attachments: [
        "https://pbs.twimg.com/media/Flla2HYXwAAomKK?format=jpg&name=medium"
      ]
    },
    {
      id: "23-9o2-302-307",
      profileSrc: "https://i.ibb.co/hFgzVsH/1655230024525.jpg",
      accountName: "marKE9150",
      accountHandle: "lasertoch",
      timeStamp: "Wed Jan 04 2023 04:45:17 GMT+0530 (India Standard Time)",
      tweetText: "Hey this is my first tweet @twitter",
      verified: true,
      taggedHandles: ["Kibo"],
      whoCanReply: "Everyone can reply",
      typeOfVerification: null,
      views: 0,
      replies: 0,
      retweets: 0,
      likes: 1,
      attachments: [
        "https://i.ibb.co/BnmScDN/pragya-T-cottage-in-rainy-mountainhyper-realistic-4k-fecd39d4-8c45-4e47-8b27-108569a98a92.png"
      ]
    },
    {
      id: "23-9o2-302-308",
      profileSrc: "https://i.ibb.co/hFgzVsH/1655230024525.jpg",
      accountName: "marKE9150",
      accountHandle: "lasertoch",
      timeStamp: "Wed Jan 04 2023 04:45:17 GMT+0530 (India Standard Time)",
      tweetText: "Hey this is my first tweet @twitter",
      verified: true,
      taggedHandles: ["Kibo"],
      whoCanReply: "Everyone can reply",
      typeOfVerification: null,
      views: 0,
      replies: 0,
      retweets: 0,
      likes: 1,
      attachments: [
        "https://i.ibb.co/BnmScDN/pragya-T-cottage-in-rainy-mountainhyper-realistic-4k-fecd39d4-8c45-4e47-8b27-108569a98a92.png"
      ]
    },
    {
      id: "23-9o2-302-302",
      profileSrc: "https://i.ibb.co/hFgzVsH/1655230024525.jpg",
      accountName: "marKE9150",
      accountHandle: "lasertoch",
      timeStamp: "Wed Jan 04 2023 04:45:17 GMT+0530 (India Standard Time)",
      tweetText: "Hey this is my first tweet @twitter",
      verified: true,
      taggedHandles: ["Kibo"],
      whoCanReply: "Everyone can reply",
      typeOfVerification: null,
      views: 0,
      replies: 0,
      retweets: 0,
      likes: 1,
      attachments: [
        "https://i.ibb.co/BnmScDN/pragya-T-cottage-in-rainy-mountainhyper-realistic-4k-fecd39d4-8c45-4e47-8b27-108569a98a92.png"
      ]
    },
  ];

  
function Top() {
    return (
        <div id='home-timeline-m'>
            <Posts postsArr={postsArr} />
        </div>
    )
}

export default Top;