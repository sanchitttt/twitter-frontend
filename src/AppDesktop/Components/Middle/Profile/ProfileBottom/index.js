import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../../../config/config';
import NavLink from '../../../Helper/NavBarLink';
import Posts from '../../PostsFeed';
import Post from '../../../Helper/Post';
import './styles.css';
import { CircularProgress } from '@mui/material';

const links = [
    'Tweets',
    // 'Tweets & replies',
    'Media',
    'Likes',
    // 'Reels'
]

// const postsArr = [
//     {
//         id: "23-9o2-302-3064",
//         profileSrc: "https://pbs.twimg.com/profile_images/1575621624140791814/tmulS7aX_400x400.jpg",
//         accountName: "100T bang",
//         accountHandle: "bangzerra",
//         timeStamp: "Mon Jan 09 2023 21:26:58 GMT+0530 (India Standard Time)",
//         tweetText: "I am doing a PC giveaway thanks to winning the FaZe Smeag Cup!\n-Follow\n-Like and retweet\n-Picking a winner November 21st",
//         verified: true,
//         taggedHandles: [],
//         typeOfVerification: null,
//         views: 0,
//         replies: '1,545',
//         retweets: '15.3K',
//         likes: '19.2K',
//         attachments: [
//           "https://pbs.twimg.com/media/FhjqMQ_UUAEWStZ?format=jpg&name=small"
//         ]
//       },
// ]
function ProfileBottom({ createdAt, profileSrc, accountName, accountHandle, postsArr, poll }) {
    const [activeLink, activeLinkHandler] = useState('Tweets');
    const [items, setItems] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    console.log(accountHandle)
    useEffect(() => {
        setShowLoading(true);
        const fetch = async (activeLink) => {
            try {
                if (activeLink === "Media") {
                    const { data } = await axios.get(`${BACKEND_URL}/pages/profile/getTweetsByAttachment/${accountHandle}`, { withCredentials: true });
                    console.log(data);
                    setItems(data);
                    setShowLoading(false);
                }
                else if (activeLink === "Likes") {
                    const { data } = await axios.get(`${BACKEND_URL}/pages/profile/getTweetsByLikes/${accountHandle}`, { withCredentials: true });

                    if(!data.length) setItems(null)
                    else setItems(data);
                    
                    setShowLoading(false);
                }
                else {
                    setItems(postsArr);
                }
            } catch (error) {
                console.log('errorRRRRRRRRRRRRRR', activeLink, error);
            }
        }
        fetch(activeLink)
    }, [activeLink])
    useEffect(() => {
        if (Array.isArray(postsArr)) {
            setItems(postsArr.reverse())
        }
    }, [postsArr]);

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
            {showLoading && activeLink !== 'Tweets' &&
                <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress variant="indeterminate" />
                </div>}

            {items ? activeLink === 'Media' ?
                items.tweets && items.tweets.length ?
                    items.tweets.map((item) => {
                        return <Post
                            id={item._id}
                            poll={item.poll}
                            profileSrc={items.profileSrc}
                            accountName={items.accountName}
                            accountHandle={items.accountHandle}
                            verified={item.verified}
                            typeOfVerification={items.typeOfVerification}
                            timeStamp={item.createdAt}
                            tweetText={item.tweetText}
                            whoCanReply={item.whoCanReply}
                            views={item.views}
                            retweets={item.retweets}
                            likes={item.likes}
                            attachments={item.attachments}
                            likedAlready={true}
                        />
                    }) : <div id='noTweetsExist'>{!showLoading && "No tweets found"}</div> :
                activeLink === 'Likes' ?
                    Array.isArray(items) && items[0].tweets && !Array.isArray(items[0].tweets) ?
                        items.map((item, idx) => {
                            return <Post
                                id={item.tweets._id}
                                poll={item.tweets.poll}
                                profileSrc={item.profileSrc}
                                accountName={item.accountName}
                                accountHandle={item.accountHandle}
                                verified={item.verified}
                                typeOfVerification={item.typeOfVerification}
                                timeStamp={item.tweets.createdAt}
                                tweetText={item.tweets.tweetText}
                                whoCanReply={item.tweets.whoCanReply}
                                views={item.tweets.views}
                                retweets={item.tweets.retweets}
                                likes={item.tweets.likes}
                                attachments={item.tweets.attachments}
                                likedAlready={true}
                            />
                        })
                        :
                        <div id='noTweetsExist'>{!showLoading && "No tweets found"}</div>
                    :
                    items.length
                        ?
                        <Posts
                            accountNameGiven={accountName}
                            accountHandleGiven={accountHandle}
                            profileSrcGiven={profileSrc}
                            createdAt={createdAt}
                            postsArr={postsArr}
                            poll={poll}
                        />
                        : <>
                            <div id='noTweetsExist'>{!showLoading && "No tweets found"}</div>
                        </> : <div id='noTweetsExist'>{!showLoading && "No tweets found"}</div>
            }

            {/* <Posts postsArr={postsArr} relation={'retweet'} /> */}
        </div>
    )
}

export default ProfileBottom;