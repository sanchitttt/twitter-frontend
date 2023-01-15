import React  from 'react';
import Post from '../../Helper/Post';
import './styles.css';

const Posts = ({ postsArr,relation }) => {
  return (
    <>
      <div id="posts-container">
        {postsArr.map((post,idx) => {
          return (
            <Post
              idx={idx}
              key={post.id}
              profileSrc={post.profileSrc}
              accountName={post.accountName}
              accountHandle={post.accountHandle}
              verified={post.verified}
              timeStamp={post.timeStamp}
              tweetText={post.tweetText}
              taggedHandles={post.taggedHandles}
              views={post.views}
              replies={post.replies}
              typeOfVerification={post.typeOfVerification}
              retweets={post.retweets}
              whoCanReply={post.whoCanReply}
              likes={post.likes}
              attachments={post.attachments}
              relation = {relation}
            />
          );
        })}
      </div>
    </>
  );
};

export default Posts;
