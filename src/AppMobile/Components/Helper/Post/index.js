import React from "react";
import './styles.css';

import {
  PostStats,
  AccountDetailsAndScreenshotAndMore,
  TweetAttachments,
  TaggedHandles,
  TweetPostText,
  PostWhoLikedOrCommented
} from '../PostHelper';

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
  attachments
}) => {
  

  // useEffect(() => {
  //   document.addEventListener("click", (e) => {
  //     let textHelperDiv = document.getElementById("homePostTextHelper2");
  //     let tippy = document.getElementById(`post-tippy${idx}`);

  //     if (tippy) {
  //       if (textHelperDiv.contains(e.target) || tippy.contains(e.target)) {
  //         // Do nothing
  //       } else {
  //         setShowWhoCanReplyTippy(false);
  //       }
  //     }
  //   });
  //   return () => {
  //     document.removeEventListener("click", (e) => {});
  //   };
  // }, []);
  return (
    <>
    <div className='custom-card' style={{borderRadius:'0px',}}>
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
            Somebody liked your post
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
    </div>
      
    </>
  );
};

export default Post;
