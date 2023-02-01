import React from "react";
import Post from '../../Helper/Post'
import "./styles.css";

const mockData = [
  {
    id: "23-9o2-302-23232",
    profileSrc: "https://pbs.twimg.com/profile_images/1604087525055746048/DPXtE-oy_400x400.jpg",
    accountName: "Pratham",
    accountHandle: "Prathkum",
    timeStamp: "Sun Jan 08 2023 11:46:01 GMT+0530 (India Standard Time)",
    tweetText: `Remote jobs are waiting for you:\n
  1. flexjobs .com\n
  2. whoishiring .io\n
  3. remoteml .com\n
  4. freelancer .com\n
  5. simplyhired .com\n
  6. freshersworld .com\n
  7. weworkremotely .com\n
  8. upwork .com\n
  9. remoteok .io\n
  10. devsnap .io\n
  11. remote .co\n
  12. dice .com\n
  13. angel .co`,
    verified: true,
    taggedHandles: [],
    whoCanReply: "Everyone can reply",
    typeOfVerification: null,
    views: "452.2K",
    replies: 156,
    retweets: 2754,
    likes: 8997,
    attachments: []
  },
  {
    id: "23-9o2-302-2323223",
    profileSrc: "https://pbs.twimg.com/profile_images/1610347888760217600/7iMvFccf_400x400.jpg",
    accountName: "Shakti Mani Tripathi",
    accountHandle: "shaktimanitripathi",
    timeStamp: "Sun Jan 08 2023 11:46:01 GMT+0530 (India Standard Time)",
    tweetText: `I cleared @Google Interview rounds for Software Engineering position (L4) a couple of months ago.
    
Sharing a COMPLETE practical guide on how to prepare for the interviews rom scratch and do wonders 🤩

A thread 🧵`,
    verified: true,
    taggedHandles: [],
    whoCanReply: "Everyone can reply",
    typeOfVerification: null,
    views: "",
    replies: 597,
    retweets: 4010,
    likes: "18.9K",
    attachments: []
  }
];
function Bookmarks() {
  return (
    <div id="bookmarks">
      <div id="bookmarks-topRow">
        <div id="bookmarks-topRow-left">
          <div id="bookmarks-topRow-left-top" style={{fontFamily:'Poppins'}}>Bookmarks</div>
          <div id="bookmarks-topRow-left-bottom" style={{fontFamily:'Poppins'}}>@lasertoch</div>
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
        {mockData.map((post, idx) => {
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
