import React, { useState } from 'react';
import NavLink from '../../../Helper/NavBarLink';
import Posts from '../../PostsFeed';
import './styles.css';

const links = [
    'Tweets',
    'Tweets & replies',
    'Media',
    'Likes'
]

const postsArr = [
    {
        id: "23-9o2-302-3064",
        profileSrc: "https://pbs.twimg.com/profile_images/1575621624140791814/tmulS7aX_400x400.jpg",
        accountName: "100T bang",
        accountHandle: "bangzerra",
        timeStamp: "Mon Jan 09 2023 21:26:58 GMT+0530 (India Standard Time)",
        tweetText: "I am doing a PC giveaway thanks to winning the FaZe Smeag Cup!\n-Follow\n-Like and retweet\n-Picking a winner November 21st",
        verified: true,
        taggedHandles: [],
        typeOfVerification: null,
        views: 0,
        replies: '1,545',
        retweets: '15.3K',
        likes: '19.2K',
        attachments: [
          "https://pbs.twimg.com/media/FhjqMQ_UUAEWStZ?format=jpg&name=small"
        ]
      },
]
function ProfileBottom() {
    const [activeLink, activeLinkHandler] = useState('Tweets');
    return (
        <div id='profile-bottom'>
            <div id='profile-navBar-Container'>
                {links.map((link) => {
                    return (<div key={link} className='profile-navBarItem' onClick={() => activeLinkHandler(link)}>
                        <NavLink activeLink={activeLink} activeLinkHandler={activeLinkHandler}>
                            {link}
                        </NavLink>
                    </div>)
                })}
            </div>
            <Posts postsArr={postsArr} relation={'retweet'} />
        </div>
    )
}

export default ProfileBottom;