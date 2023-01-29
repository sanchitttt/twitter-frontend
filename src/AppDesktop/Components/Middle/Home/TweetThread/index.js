import { LinearProgress, Modal } from "@mui/material";
import React, { useReducer, useState } from "react";
import HomePost2 from '../HomePost2/index'
import ConfirmDialogueBox from './ConfirmDialogueBox';
import "./styles.css";

const tweets = [
  {
    tweetText: "",
    threadNumber: 1,
    audience: "Everyone",
    whoCanReply: "Everyone",
    attachments: [],
    poll: { expiresAt: null, options: null }
  },
  {
    tweetText: "",
    threadNumber: 1,
    audience: "Everyone",
    whoCanReply: "Everyone",
    attachments: [],
    poll: { expiresAt: null, options: null }
  }
];

export default function TweetsThread({fromANormalTweet, setShowTweetThread }) {
  const [count, setCount] = useState(fromANormalTweet?1:2);
  const [activeTweetInThread, setActiveTweetInThread] = useState(0);
  const [openConfirmDialogueBox, setOpenConfirmDialogueBox] = useState(false);
  const [tweetAllEnabled, setTweetAllEnabled] = useState(false);
  const [tweetsThreadAudience, setTweetsThreadAudience] = useState('Everyone');
  const [tweetsThreadWhoCanReply, setTweetsThreadWhoCanReply] = useState('Everyone');
  const [progress, setProgress] = React.useState(0);

  const incrementer = () => {
    setCount((count) => count + 1);
    tweets.push({
      tweetText: "",
      threadNumber: count,
      audience: tweetsThreadAudience === 'everyone' ? "Everyone" : "Twitter Circle",
      whoCanReply: tweetsThreadAudience === 'Twitter Circle' ? "Everyone" : tweetsThreadWhoCanReply,
      attachments: [],
      poll: { expiresAt: null, options: null }
    })
  };

  const decrementer = () => {
    setCount((count) => count - 1);
    tweets.pop();
  };

  const arr = [];
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      arr.push(
        <HomePost2
          idx={i}
          fromANormalTweet
          tweets={tweets}
          setTweetAllEnabled={setTweetAllEnabled}
          partOfAThread={true}
          tweetsThreadWhoCanReply={tweetsThreadWhoCanReply}
          setTweetsThreadWhoCanReply={setTweetsThreadWhoCanReply}
          tweetAllEnabled={tweetAllEnabled}
          setShowTweetThread={setShowTweetThread}
          firstItemInThread={true}
          setProgress={setProgress}
          decrementer={decrementer}
          incrementer={incrementer}
          setTweetsThreadAudience={setTweetsThreadAudience}
          tweetsThreadAudience={setTweetsThreadAudience}
        />
      );
    } else if (i === count - 1 && i !== 1) {
      arr.push(
        <HomePost2
          idx={i}
          fromANormalTweet
          tweets={tweets}
          setTweetAllEnabled={setTweetAllEnabled}
          partOfAThread={true}
          tweetsThreadWhoCanReply={tweetsThreadWhoCanReply}
          setTweetsThreadWhoCanReply={setTweetsThreadWhoCanReply}
          tweetAllEnabled={tweetAllEnabled}
          setProgress={setProgress}
          setShowTweetThread={setShowTweetThread}
          showAddMoreButton={true}
          showTweetButton={true}
          isTheLastTweet={true}
          decrementer={decrementer}
          incrementer={incrementer}
          setTweetsThreadAudience={setTweetsThreadAudience}
          tweetsThreadAudience={setTweetsThreadAudience}
        />
      );
    } else if (i === count - 1 && i === 1) {
      arr.push(
        <HomePost2
          idx={i}
          tweets={tweets}
          fromANormalTweet
          partOfAThread={true}
          tweetAllEnabled={tweetAllEnabled}
          setProgress={setProgress}
          setTweetAllEnabled={setTweetAllEnabled}
          setShowTweetThread={setShowTweetThread}
          tweetsThreadWhoCanReply={tweetsThreadWhoCanReply}
          setTweetsThreadWhoCanReply={setTweetsThreadWhoCanReply}
          showAddMoreButton={true}
          showTweetButton={true}
          decrementer={decrementer}
          incrementer={incrementer}
          setTweetsThreadAudience={setTweetsThreadAudience}
          tweetsThreadAudience={setTweetsThreadAudience}
        />
      );
    } else {
      arr.push(
        <HomePost2
          idx={i}
          tweets={tweets}
          fromANormalTweet
          setShowTweetThread={setShowTweetThread}
          tweetAllEnabled={tweetAllEnabled}
          setProgress={setProgress}
          setTweetAllEnabled={setTweetAllEnabled}
          partOfAThread={true}
          tweetsThreadWhoCanReply={tweetsThreadWhoCanReply}
          setTweetsThreadWhoCanReply={setTweetsThreadWhoCanReply}
          decrementer={decrementer}
          incrementer={incrementer}
          setTweetsThreadAudience={setTweetsThreadAudience}
          tweetsThreadAudience={setTweetsThreadAudience}
        />
      );
    }
  }
  return (
    <div className="threadTweetContainer">
      <LinearProgress
        aria-describedby="progress-bar"
        variant="determinate"
        value={progress}
      />
      <div className='threadTweetCloseIconContainer'
        onClick={() => setOpenConfirmDialogueBox(true)}
      ><img src='https://i.ibb.co/Hd13mN0/wrong-black.png' alt='closeIcon' /></div>
      <div className='threadTweetsContainerTweet'>
        {arr.map((threadTweet, idx) => {
          return (
            <div key={idx} style={{ position: 'relative', marginBottom: "30px" }}>
              {threadTweet}
            </div>
          );
        })}
      </div>
      {openConfirmDialogueBox && <Modal open={openConfirmDialogueBox}>
        <div id='discardTweetDialogueBoxMasterContainer'>
          <ConfirmDialogueBox setOpenConfirmDialogueBox={setOpenConfirmDialogueBox} setShowTweetThread={setShowTweetThread} />
        </div>
      </Modal>}

    </div>
  );
}
