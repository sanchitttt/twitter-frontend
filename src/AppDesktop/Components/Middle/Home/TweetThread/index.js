import React, { useReducer, useState } from "react";
import HomePost2 from '../HomePost2/index'
import "./styles.css";

export default function TweetsThread() {
  const [count, setCount] = useState(2);
  const [activeTweetInThread, setActiveTweetInThread] = useState(0);

  const incrementer = () => {
    setCount((count) => count + 1);
  };

  const decrementer = () => {
    setCount((count) => count - 1);
  };

  const arr = [];
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      arr.push(
        <HomePost2
          partOfAThread={true}
          firstItemInThread={true}
          decrementer={decrementer}
          incrementer={incrementer}
        />
      );
    } else if (i === count - 1 && i !== 1) {
      arr.push(
        <HomePost2
          partOfAThread={true}
          showAddMoreButton={true}
          showTweetButton={true}
          isTheLastTweet={true}
          decrementer={decrementer}
          incrementer={incrementer}
        />
      );
    } else if (i === count - 1 && i === 1) {
      arr.push(
        <HomePost2
          partOfAThread={true}
          showAddMoreButton={true}
          showTweetButton={true}
          decrementer={decrementer}
          incrementer={incrementer}
        />
      );
    } else {
      arr.push(
        <HomePost2
          partOfAThread={true}
          decrementer={decrementer}
          incrementer={incrementer}
        />
      );
    }
  }
  return (
    <div className="threadTweetContainer">
      {arr.map((threadTweet, idx) => {
        return (
          <div key={idx} style={{ position:'relative', marginBottom: "30px" }}>
            {threadTweet}
          </div>
        );
      })}
    </div>
  );
}
