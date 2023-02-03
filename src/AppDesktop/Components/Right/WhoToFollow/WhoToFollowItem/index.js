import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WhoToFollowItemLeft, WhoToFollowItemRight } from '../Helper/index';
import './styles.css';

const WhoToFollowItem = ({
  profileSrc,
  accountName,
  accountHandle,
  verified,
  typeOfVerification
}) => {
  const navigate = useNavigate();
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
      onClick={() => navigate(`/profile/${accountHandle}`)}
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