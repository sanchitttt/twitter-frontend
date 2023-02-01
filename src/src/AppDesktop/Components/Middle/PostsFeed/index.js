import React from 'react';
import Post from '../../Helper/Post';
import './styles.css';

const Posts = ({createdAt, accountNameGiven, accountHandleGiven, profileSrcGiven, postsArr, relation,poll }) => {

  return (
    <>
      <div id="posts-container">
        {postsArr.map((post, idx) => {
          if (!Array.isArray(post)) {
            return (
              <Post
                idx={idx}
                key={post._id}
                id={post._id}
                profileSrc={profileSrcGiven ? profileSrcGiven : post.profileSrc}
                accountName={accountNameGiven ? accountNameGiven : post.accountName}
                accountHandle={accountHandleGiven ? accountHandleGiven : post.accountHandle}
                verified={post.verified}
                timeStamp={post.createdAt}
                tweetText={post.tweetText}
                poll={post.poll}
                // taggedHandles={post.taggedHandles}
                views={post.views}
                replies={post.replies}
                typeOfVerification={post.typeOfVerification}
                retweets={post.retweets}
                whoCanReply={post.whoCanReply}
                likes={post.likes}
                attachments={post.attachments}
                relation={relation}
                likedAlready={post.likedAlready}
                retweetedAlready={post.retweetedAlready}
              />
            );
          }
          else{
            return post.map((item,idx) => {
              return (
                <Post
                  idx={idx}
                  key={item._id}
                  id={item._id}
                  profileSrc={profileSrcGiven ? profileSrcGiven : item.profileSrc}
                  accountName={accountNameGiven ? accountNameGiven : item.accountName}
                  accountHandle={accountHandleGiven ? accountHandleGiven : item.accountHandle}
                  verified={item.verified}
                  timeStamp={item.createdAt}
                  tweetText={item.tweetText}
                  isAThread={idx===post.length-1?false:true}
                  // taggedHandles={item.taggedHandles}
                  poll={item.poll}
                  views={item.views}
                  replies={item.replies}
                  typeOfVerification={item.typeOfVerification}
                  retweets={item.retweets}
                  whoCanReply={item.whoCanReply}
                  likes={item.likes}
                  attachments={item.attachments}
                  relation={relation}
                  likedAlready={item.likedAlready}
                  retweetedAlready={item.retweetedAlready}
                />
              );
            })
          }

        })}
      </div>
    </>
  );
};

export default Posts;
