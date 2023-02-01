import React, { useState } from "react";
import {
  TrendingTweetThirdRow,
  TrendingTweetFirstRow,
  TrendingTweetSecondRow
} from "./Helper/index";

const TrendingTweet = ({ topText, heading, subText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseLeaveHandler = () => {
    if (isHovered) setIsHovered(false);
  };

  const mouseOverHandler = () => {
    setIsHovered(true);
  };
  return (
    <div
      className="rightSide-whats-happening-trendingTweet-container"
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{
        backgroundColor: isHovered && "#eff3f4",
        paddingTop: "10px",
        paddingBottom: "10px",
        transition: "0.2s"
      }}
    >
      <div className="rightSide-whats-happening-trendingTweet-item">
        <TrendingTweetFirstRow>{topText}</TrendingTweetFirstRow>
        <TrendingTweetSecondRow>{heading}</TrendingTweetSecondRow>
        <TrendingTweetThirdRow>{subText}</TrendingTweetThirdRow>
      </div>
    </div>
  );
};

export default TrendingTweet;
