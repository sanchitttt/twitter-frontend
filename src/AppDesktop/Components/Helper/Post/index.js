import React from "react";
import './styles.css';

import {
  PostStats,
  AccountDetailsAndScreenshotAndMore,
  TweetAttachments,
  TaggedHandles,
  TweetPostText,
  PostWhoLikedOrCommented
} from './Helper';

const Post = ({
  idx,
  profileSrc,
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
  relation

}) => {

  return (
    <>
    {/* <div className='custom-card'> */}
    <div className="post-card-container">
        <div className="postCard-leftSide-container">
          <img
            src={profileSrc}
            style={{ width: "48px", height: "48px", borderRadius: "999px" }}
            alt="profile_picture"
          />
        </div>
        <div className="postCard-rightSide-container">
          <PostWhoLikedOrCommented type="replied">
            {relation==='retweet' ? 'You retweeted':'Somebody liked your post'}
          </PostWhoLikedOrCommented>
          <AccountDetailsAndScreenshotAndMore
            accountName={accountName}
            accountHandle={accountHandle}
            verified={verified}
            typeOfVerification={typeOfVerification}
            timeStamp={timeStamp}
          />
          <TweetPostText>{tweetText}</TweetPostText>
          <TweetAttachments data={attachments} />
          <TaggedHandles data={taggedHandles} />
         
          <PostStats
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
