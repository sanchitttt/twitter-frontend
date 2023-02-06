import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../config/config";
import Post from '../../Helper/Post'
import Posts from "../PostsFeed";
import "./styles.css";


function Bookmarks() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/bookmarks`, { withCredentials: true });
        console.log(`result.data = `, result.data);
        setData(result.data);
        // console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [])
  return (
    <div id="bookmarks">
      <div id="bookmarks-topRow">
        <div id="bookmarks-topRow-left">
          <div id="bookmarks-topRow-left-top" style={{ fontFamily: 'Poppins' }}>Bookmarks</div>
          <div id="bookmarks-topRow-left-bottom" style={{ fontFamily: 'Poppins' }}>@lasertoch</div>
        </div>
        <div id="bookmarks-topRow-right">
          <img
            src="https://i.ibb.co/TkBBFTj/dots-1.png"
            width="16px"
            height="16px"
            alt="moreOptions-icon"
          />
        </div>
      </div>
      <div id="bookmarked-posts">
        {data.map((post, idx) => {
          // if (!post.tweets) {
            // console.log('!data.tweets executed')
            return (
              <Post
                idx={idx}
                key={post.id}
                id={post.id}
                profileSrc={post.profileSrc}
                accountName={post.accountName}
                accountHandle={post.accountHandle}
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
                // relation={relation}
                likedAlready={post.likedAlready}
                retweetedAlready={post.retweetedAlready}
              />
            );
          // }
          // else {
          //   return post.tweets.map((item, idx) => {
          //     console.log('yes')
          //     return (
          //       <Post
          //         length={post.tweets.length}
          //         idx={idx}
          //         key={item._id}
          //         id={item._id}
          //         profileSrc={post.profileSrc}
          //         accountName={post.accountName}
          //         accountHandle={post.accountHandle}
          //         verified={post.verified}
          //         timeStamp={item.createdAt}
          //         tweetText={item.tweetText}
          //         isAThread={idx === post.length - 1 ? false : true}
          //         // taggedHandles={item.taggedHandles}
          //         poll={item.poll}
          //         views={item.views}
          //         alreadyVoted={post.alreadyVoted}
          //         replies={item.replies}
          //         typeOfVerification={item.typeOfVerification}
          //         retweets={item.retweets}
          //         whoCanReply={item.whoCanReply}
          //         likes={item.likes}
          //         attachments={item.attachments}
          //         // relation={relation}
          //         likedAlready={item.alreadyLiked}
          //         retweetedAlready={item.retweetedAlready}
          //         originalTweetThread={post.tweets}
          //       />
          //     );
          //   })
          // }
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
