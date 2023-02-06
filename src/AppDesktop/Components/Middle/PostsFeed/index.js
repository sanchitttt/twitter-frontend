import React, { useState } from 'react';
import Post from '../../Helper/Post';
import './styles.css';

const Posts = ({ forTimeline, createdAt, accountNameGiven, accountHandleGiven, profileSrcGiven, postsArr, relation, poll }) => {

  if (forTimeline) {
    return (
      <>
        <div id="posts-container">
          {postsArr.map((post, idx) => {
            if (post.scheduledDate) {
              let currDate = new Date().getTime();
              let parsedDate = new Date(post.scheduledDate).getTime();
              if (currDate >= parsedDate) {
                if (!post.tweets) {
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
                      alreadyVoted={post.alreadyVoted}
                      typeOfVerification={post.typeOfVerification}
                      retweets={post.retweets}
                      whoCanReply={post.whoCanReply}
                      likes={post.likes}
                      attachments={post.attachments}
                      relation={relation}
                      likedAlready={post.likedAlready}
                      retweetedAlready={post.retweetedAlready}
                      replyCount={post.replyCount}
                    />
                  );
                }
                else {
                  return post.tweets.map((item, idx) => {
                    return (
                      <Post
                        length={post.tweets.length}
                        idx={idx}
                        key={item._id}
                        id={item._id}
                        profileSrc={profileSrcGiven ? profileSrcGiven : post.profileSrc}
                        accountName={accountNameGiven ? accountNameGiven : post.accountName}
                        accountHandle={accountHandleGiven ? accountHandleGiven : post.accountHandle}
                        verified={post.verified}
                        alreadyVoted={post.alreadyVoted}
                        timeStamp={item.createdAt}
                        tweetText={item.tweetText}
                        isAThread={idx === post.length - 1 ? false : true}
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
                        replyCount={item.replyCount}
                      />
                    );
                  })
                }
              }
            }
            else {
              if (!post.tweets) {
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
                    alreadyVoted={post.alreadyVoted}

                    // taggedHandles={post.taggedHandles}
                    views={post.views}
                    replies={post.replies}
                    typeOfVerification={post.typeOfVerification}
                    retweets={post.retweets}
                    whoCanReply={post.whoCanReply}
                    likes={post.likes}
                    attachments={post.attachments}
                    relation={relation}
                    likedAlready={post.alreadyLiked}
                    retweetedAlready={post.retweetedAlready}
                    replyCount={post.replyCount}
                  />
                );
              }
              else {
                return post.tweets.map((item, idx) => {
                  return (
                    <Post
                      length={post.tweets.length}
                      idx={idx}
                      key={item._id}
                      id={item._id}
                      profileSrc={profileSrcGiven ? profileSrcGiven : post.profileSrc}
                      accountName={accountNameGiven ? accountNameGiven : post.accountName}
                      accountHandle={accountHandleGiven ? accountHandleGiven : post.accountHandle}
                      verified={post.verified}
                      timeStamp={item.createdAt}
                      tweetText={item.tweetText}
                      isAThread={idx === post.length - 1 ? false : true}
                      // taggedHandles={item.taggedHandles}
                      poll={item.poll}
                      views={item.views}
                      alreadyVoted={post.alreadyVoted}
                      replies={item.replies}
                      typeOfVerification={item.typeOfVerification}
                      retweets={item.retweets}
                      whoCanReply={item.whoCanReply}
                      likes={item.likes}
                      attachments={item.attachments}
                      relation={relation}
                      likedAlready={item.alreadyLiked}
                      retweetedAlready={item.retweetedAlready}
                      originalTweetThread={post.tweets}
                      replyCount={item.replyCount}
                    />
                  );
                })
              }
            }
          })}
        </div>
      </>
    );
  };

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
                likedAlready={post.alreadyLiked}
                retweetedAlready={post.retweetedAlready}
              />
            );
          }
          else {
            return post.map((item, idx) => {
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
                  isAThread={idx === post.length - 1 ? false : true}
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
                  likedAlready={item.alreadyLiked}
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
