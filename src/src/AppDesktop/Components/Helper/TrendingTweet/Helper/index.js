import React, { useState } from "react";
import "./styles.css";

export const MoreOptions = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    if (setIsHovered) setIsHovered(false);
  };
  return isHovered ? (
    <div
      className="blue-hover"
      style={{ marginLeft: "5px" }}
      onMouseLeave={mouseLeaveHandler}
      onMouseOver={mouseEnterHandler}
    >
      <img
        src="https://i.ibb.co/WyVK6vj/dots-1-1.png"
        width="16px"
        height="16px"
        alt="moreOptions-icon"
      />
    </div>
  ) : (
    <div
      className="blue-hover"
      style={{ marginLeft: "5px" }}
      onMouseLeave={mouseLeaveHandler}
      onMouseOver={mouseEnterHandler}
    >
      <img
        src="https://i.ibb.co/TkBBFTj/dots-1.png"
        width="16px"
        height="16px"
        alt="moreOptions-icon"
      />
    </div>
  );
};

export const TrendingTweetFirstRow = ({ children }) => {
  return (
    <div className="rightSide-whats-happening-trendingTweet-item-firstRow">
      <div className="rightSide-whats-happening-trendingTweet-item-firstRow-leftSide">
        {children}
      </div>
      <div style={{ marginRight: "10px" }}>
        <MoreOptions />
      </div>
    </div>
  );
};

export const TrendingTweetSecondRow = ({ children }) => {
  return (
    <div className="rightSide-whats-happening-trendingTweet-item-secondRow">
      <div className="rightSide-whats-happening-trendingTweet-item-secondRow-leftSide">
        {children}
      </div>
      <div></div>
    </div>
  );
};

export const TrendingTweetThirdRow = ({ children }) => {
  const textArr = children.split(" ");
  let result = [];
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i][0] === "@" || textArr[i][0] === "#") {
      result.push(
        `<span class='tweet-post-text-highlighted'>${textArr[i]}</span>`
      );
    } else {
      result.push(textArr[i]);
    }
  }
  let text = result.join(" ");

  return (
    <div className="rightSide-whats-happening-trendingTweet-item-thirdRow">
      <div className="rightSide-whats-happening-trendingTweet-item-thirdRow-leftSide">
        <div
          className="rightSide-whats-happening-trendingTweet-item-thirdRow-leftSide"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export const TrendingTweetShowMoreTweets = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseLeaveHandler = () => {
    if (isHovered) setIsHovered(false);
  };

  const mouseOverHandler = () => {
    setIsHovered(true);
  };
  return (
    <div
      className="rightSide-whats-happening-trendingTweet-item-lastRow"
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{
        backgroundColor: isHovered && "#eff3f4",
        paddingTop: "10px",
        paddingBottom: "10px",
        transition: "0.2s"
      }}
    >
      <div className="rightSide-whats-happening-trendingTweet-item-lastRow-leftSide">
        Show more
      </div>
      <div></div>
    </div>
  );
};

export default {
  TrendingTweetShowMoreTweets,
  TrendingTweetThirdRow,
  TrendingTweetFirstRow,
  TrendingTweetSecondRow,
  MoreOptions
};
