import React, { useState } from "react";
import { WhoToFollowItemLeft, WhoToFollowItemRight } from '../Helper/index';
import './styles.css';

const WhoToFollowItem = ({
  profileSrc,
  accountName,
  accountHandle,
  verified,
  typeOfVerification
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseLeaveHandler = () => {
    if (isHovered) setIsHovered(false);
  };

  const mouseOverHandler = () => {
    setIsHovered(true);
  };
  return (
    <div
      className="rightSide-whoToFollow-item-container"
      onMouseOver={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
      style={{
        backgroundColor: isHovered && "#eff3f4",
        paddingTop: "10px",
        paddingBottom: "10px",
        transition: "0.2s"
      }}
    >
      <WhoToFollowItemLeft
        profileSrc={profileSrc}
        accountName={accountName}
        accountHandle={accountHandle}
        verified={verified}
        typeOfVerification={typeOfVerification}
      />
      <WhoToFollowItemRight />
    </div>
  );
};

export default WhoToFollowItem;