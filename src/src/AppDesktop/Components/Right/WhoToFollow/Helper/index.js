import React,{ useState } from "react";
import { AccountHandle, AccountName, Verified } from '../../../Helper/Post/Helper';
import PrimaryButton from '../../../Helper/PrimaryButton/index';
import './styles.css';

export const WhoToFollowItemRight = () => {
  return (
    <div className="rightSide-whoToFollow-item-leftSide-rightSide">
      <PrimaryButton blackButton={true}>Follow</PrimaryButton>
    </div>
  );
};
export const WhoToFollowItemLeft = ({
  profileSrc,
  accountName,
  accountHandle,
  verified
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseLeaveHandler = () => {
    if (isHovered) setIsHovered(false);
  };

  const mouseOverHandler = () => {
    setIsHovered(true);
  };
  return (
    <div className="rightSide-whoToFollow-item-leftSide">
      <div className="rightSide-whoToFollow-item-leftSide-leftSide">
        <img
          src={profileSrc}
          alt="profileImg"
          width="48px"
          height="48px"
          style={{ borderRadius: "9999px" }}
        />
      </div>
      <div className="rightSide-whoToFollow-item-leftSide-rightSide">
        <div style={{ display: "flex" }}>
          {" "}
          <div
            onMouseOver={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
            style={{
              textDecoration: isHovered && "underline",
              transition: "0.2s"
            }}
          >
            <AccountName>{accountName}</AccountName>
          </div>
          <Verified verified={verified} />
        </div>
        <AccountHandle>{accountHandle}</AccountHandle>
      </div>
    </div>
  );
};

export default { WhoToFollowItemLeft, WhoToFollowItemRight };
