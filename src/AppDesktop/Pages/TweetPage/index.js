import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../../config/config';
import Post from '../../Components/Helper/Post';
import { DetailedPostStats, PostStats } from '../../Components/Helper/Post/Helper';
import HomePost from '../../Components/Middle/Home/HomePost';
import Posts from '../../Components/Middle/PostsFeed';
import './styles.css';

function TweetPage() {
    const { accountHandle, tweetId } = useParams();
    const [data, setData] = useState();
    const [likeCountState, setLikeCountState] = useState();
    const [retweetsCountState, setRetweetsCountsState] = useState();
    const [replyCountState, setReplyCountState] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await axios.get(
                    `${BACKEND_URL}/pages/home/${accountHandle}/status/${tweetId}`,
                    { withCredentials: true });
                setData(result.data);
                if (Array.isArray(result.data.tweets)) {
                    setLikeCountState(result.data.tweets[result.data.activeIndex].likes);
                    setRetweetsCountsState(result.data.tweets[result.data.activeIndex].retweets);
                    setReplyCountState(result.data.tweets[result.data.activeIndex].replyCount)
                }
                else {
                    setLikeCountState(result.data.tweets.likes);
                    setRetweetsCountsState(result.data.tweets.retweets);
                    setReplyCountState(result.data.tweets.replyCount)
                }
            } catch (error) {
                console.log('error', error);
            }
        }
        fetch();
    }, []);

    console.log(data, '************');
    return (
        <div id='tweetPage'>
            <div id='tweetPage-heading'>

                <div id='profile-top-heading-left' style={{ justifyContent: 'flex-start' }}>
                    <div id='profile-top-heading-left-imgContainer'>
                        <img
                            src='https://i.ibb.co/TTBVLht/left-arrow.png'
                            alt='searchBarCloseIcon'
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <div id='profile-top-heading-left-right'>
                        <div id='profile-top-heading-main' className='poppinText'>Tweets</div>
                    </div>
                </div>
                <div id='' className=''
                // onClick={toggleHandler}
                >

                    {/* {showTippy && <div id='tweetPreferenceTippyRef'><TweetsPreferenceTippy type={typeOfTweets} typeHandler={setTypeOfTweets} /></div>} */}
                </div>
            </div>
            <div style={{ width: '100%' }}>
                {data ? Array.isArray(data.tweets) ?
                    data.tweets.map((item, idx) => {
                        if (idx > data.activeIndex) return null;
                        return <>
                            <Post
                                length={data.tweets.length}
                                idx={idx}
                                key={data._id}
                                id={data._id}
                                index={idx}
                                activeIndex={data.activeIndex}
                                profileSrc={data.profileSrc}
                                accountName={data.accountName}
                                accountHandle={data.accountHandle}
                                verified={data.verified}
                                timeStamp={item.createdAt}
                                tweetText={item.tweetText}
                                poll={item.poll}
                                alreadyVoted={item.alreadyVoted}
                                forIndividualTweet={true}
                                isAThread={true}
                                // taggedHandles={data.taggedHandles}
                                views={item.views}
                                replies={item.replies}
                                typeOfVerification={data.typeOfVerification}
                                retweets={item.retweets}
                                whoCanReply={item.whoCanReply}
                                likes={item.likes}
                                attachments={item.attachments}
                                // relation={relation}
                                likedAlready={item.alreadyLiked}
                                retweetedAlready={item.retweetedAlready}
                                replyCount={item.replyCount}
                            />
                            {data.activeIndex === idx && <DetailedPostStats
                                repliesCount={replyCountState}
                                likeCount={likeCountState}
                                retweetsCount={retweetsCountState}
                            />}
                            {data.activeIndex === idx && <PostStats
                                accountHandle={item.accountHandle}
                                id={item._id}
                                likedAlready={data.tweets.alreadyLiked}
                                retweetedAlready={data.tweets.retweetedAlready}
                                forIndividualTweet={true}
                                setRetweetsCountsState={setRetweetsCountsState}
                                setLikeCountState={setLikeCountState}
                                likes={likeCountState}
                                retweets={retweetsCountState}
                            />}
                        </>

                    })

                    : <div style={{ borderLeft: '1px solid #eff3f4', borderRight: '1px solid #eff3f4' }}>
                        <Post
                            key={data._id}
                            id={data._id}
                            profileSrc={data.profileSrc}
                            accountName={data.accountName}
                            accountHandle={data.accountHandle}
                            verified={data.verified}
                            timeStamp={data.createdAt}
                            tweetText={data.tweets.tweetText}
                            poll={data.tweets.poll}
                            alreadyVoted={data.alreadyVoted}
                            forIndividualTweet={true}
                            // taggedHandles={data.taggedHandles}
                            views={data.tweets.views}
                            replies={data.tweets.replies}
                            typeOfVerification={data.typeOfVerification}
                            retweets={data.tweets.retweets}
                            whoCanReply={data.tweets.whoCanReply}
                            likes={data.tweets.likes}
                            attachments={data.tweets.attachments}
                            // relation={relation}
                            likedAlready={data.tweets.alreadyLiked}
                            retweetedAlready={data.tweets.retweetedAlready}
                            replyCount={data.tweets.replyCount}
                        />
                    </div>
                    : null}
                {data && !Array.isArray(data.tweets) &&
                    <DetailedPostStats
                        repliesCount={replyCountState}
                        likeCount={likeCountState}
                        retweetsCount={retweetsCountState}
                    />}
                {data && !Array.isArray(data.tweets) && <PostStats
                    id={data.tweets._id}
                    accountHandle={data.accountHandle}
                    likedAlready={data.tweets.alreadyLiked}
                    retweetedAlready={data.tweets.retweetedAlready}
                    forIndividualTweet={true}
                    likes={likeCountState}
                    retweets={retweetsCountState}
                    prevLikeState={likeCountState}
                    setLikesCountState={setLikeCountState}
                    setRetweetsCountsState={setRetweetsCountsState}
                    prevRetweetState={retweetsCountState}
                />}
            </div>
            <div id='tweetPage-tweetYorReply' style={{ zIndex: 100 }}>
                <HomePost
                    idd={data ? Array.isArray(data.tweets) ?
                        data.tweets[data.activeIndex]._id : data.tweets._id : null}
                    accountHandle={data && data.accountHandle}
                    forReply={true} 
                    prevReplyCountState={replyCountState}
                    setReplyCountState={setReplyCountState}
                    />
            </div>
            <div id='tweetPage-replies'>
                {data ?
                    Array.isArray(data.tweets) ?
                        data.tweets[data.activeIndex].replies && data.tweets[data.activeIndex].replies.map((item, idx) => {
                            return <Post
                                length={data.tweets[data.activeIndex].replies.length}
                                idx={idx}
                                key={item._id}
                                id={item._id}
                                index={idx}
                                activeIndex={data.activeIndex}
                                profileSrc={data.profileSrc}
                                accountName={data.accountName}
                                accountHandle={data.accountHandle}
                                verified={data.verified}
                                timeStamp={item.createdAt}
                                tweetText={item.tweetText}
                                poll={item.poll}
                                alreadyVoted={item.alreadyVoted}
                                isAThread={true}
                                // taggedHandles={data.taggedHandles}
                                views={item.views}
                                replies={item.replies}
                                typeOfVerification={data.typeOfVerification}
                                retweets={item.retweets}
                                whoCanReply={item.whoCanReply}
                                likes={item.likes}
                                attachments={item.attachments}
                                // relation={relation}
                                likedAlready={item.alreadyLiked}
                                retweetedAlready={item.retweetedAlready}
                                replyCount={item.replyCount}
                            />
                        })
                        :
                        data.tweets.replies ?
                            data.tweets.replies.map((item, idx) => {
                                return <Post
                                    length={data.tweets.length}
                                    idx={idx}
                                    key={data._id}
                                    id={data._id}
                                    index={idx}
                                    activeIndex={data.activeIndex}
                                    profileSrc={data.profileSrc}
                                    accountName={data.accountName}
                                    accountHandle={data.accountHandle}
                                    verified={data.verified}
                                    timeStamp={data.createdAt}
                                    tweetText={item.tweetText}
                                    poll={item.poll}
                                    alreadyVoted={item.alreadyVoted}
                                    isAThread={true}
                                    // taggedHandles={data.taggedHandles}
                                    views={item.views}
                                    replies={item.replies}
                                    typeOfVerification={data.typeOfVerification}
                                    retweets={item.retweets}
                                    whoCanReply={item.whoCanReply}
                                    likes={item.likes}
                                    attachments={item.attachments}
                                    // relation={relation}
                                    likedAlready={item.alreadyLiked}
                                    retweetedAlready={item.retweetedAlready}
                                    replyCount={item.replyCount}
                                />

                            })
                            : null
                    : <></>}
            </div>
        </div>
    )
}

export default TweetPage;
