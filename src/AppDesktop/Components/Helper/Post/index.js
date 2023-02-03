import React from "react";
import './styles.css';

import {
  PostStats,
  AccountDetailsAndScreenshotAndMore,
  TweetAttachments,
  TaggedHandles,
  TweetPostText,
  PostWhoLikedOrCommented,
  PollViewer
} from './Helper';
import axios from "axios";
import { BACKEND_URL } from "../../../../config/config";

const Post = ({
  length,
  idx,
  id,
  poll,
  profileSrc,
  isAThread,
  accountName,
  accountHandle,
  verified,
  typeOfVerification,
  timeStamp,
  tweetText,
  taggedHandles,
  whoCanReply,
  views,
  replies,
  retweets,
  likes,
  attachments,
  relation,
  likedAlready,
  alreadyVoted,
  retweetedAlready,
  originalTweetThread

}) => {

  const bookmarkTweetFn = () => {
    const fetch = async () => {
      try {
        const result = await axios.post(`${BACKEND_URL}/pages/bookmarks`,{
          tweetBody : {
            length:length,
            idx:idx,
            id:id,
            poll:poll,
            profileSrc:profileSrc,
            isAThread:isAThread,
            // tweets : isAThread?originalTweetThread:false,
            accountName:accountName,
            accountHandle:accountHandle,
            verified:verified,
            typeOfVerification:typeOfVerification,
            timeStamp:timeStamp,
            tweetText:tweetText,
            taggedHandles:taggedHandles,
            whoCanReply:whoCanReply,
            views:views,
            replies:replies,
            retweets:retweets,
            likes:likes,
            attachments:attachments,
            relation:relation,
            likedAlready:likedAlready,
            alreadyVoted:alreadyVoted,
            retweetedAlready:retweetedAlready
          }
         
        }, {withCredentials:true});
      } catch (error) {
        throw error;
      }
    }
    fetch();
  }
  let height;
  if (attachments && attachments.length && poll && poll.options) {
    let optionsLength = (poll.options.length) * 30 + 22.5;
    height = `${Math.ceil((tweetText.length / 70) * 23) + 65 + 500 + optionsLength}px`;
  }
  if (attachments && attachments.length && !poll || !poll.options || !poll.options.length) {
    height = `${Math.ceil((tweetText.length / 70) * 23) + 500}px`;
  }
  if (poll && poll.options) {
    let optionsLength = (poll.options.length) * 30 + 22.5;
    height = `${Math.ceil((tweetText.length / 70) * 23) + 85 + optionsLength}px`;
  }
  else {
    height = `${Math.ceil((tweetText.length / 70) * 23) + 65}px`;
  }
  return (
    <>
      <div className="post-card-container" id=''>
        <div className="postCard-leftSide-container" style={{ position: 'relative' }}>
          <img
            src={profileSrc}
            style={{ width: "48px", height: "48px", borderRadius: "999px" }}
            alt="profile_picture"
          />
          {isAThread && idx !== length - 1 && <div style={{ left: '24px', top: '48px', background: '#CFD9DE', width: '2px', height: height, position: 'absolute' }}></div>}
        </div>
        <div className="postCard-rightSide-container">
          {/* <PostWhoLikedOrCommented type="replied"> */}
          {/* {relation === 'retweet' ? 'You retweeted' : 'Somebody liked your post'} */}
          {/* </PostWhoLikedOrCommented> */}
          <AccountDetailsAndScreenshotAndMore
            idx={idx}
            accountName={accountName}
            accountHandle={accountHandle}
            verified={verified}
            typeOfVerification={typeOfVerification}
            timeStamp={timeStamp}
            bookmarkTweetFn={bookmarkTweetFn}
          />
          <TweetPostText>{tweetText}</TweetPostText>
          <PollViewer alreadyVoted={alreadyVoted} id={id} accountHandle={accountHandle} poll={poll} />
          <TweetAttachments data={attachments} />
          {/* <TaggedHandles data={taggedHandles} /> */}

          <PostStats
          accountHandle={accountHandle}
            id={id}
            likedAlready={likedAlready}
            retweetedAlready={likedAlready}
            views={views}
            replies={replies}
            retweets={retweets}
            likes={likes}
            share={null}
          />
        </div>
      </div>
      {/* </div> */}

    </>
  );
};

export default Post;
