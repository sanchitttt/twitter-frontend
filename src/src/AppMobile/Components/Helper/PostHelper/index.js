import React, { useState } from "react";
import './styles.css';

export const PostWhoLikedOrCommented = ({ children, type }) => {
  return (
    <div className="post_who_liked_or_commented_container">
      <div className="post_who_liked_or_commented_leftSide">
        <div className="post_who_liked_or_commented_leftSide_img">
          {type === "replied" && (
            <img
              src="https://i.ibb.co/NFNjQk0/comment-grey.png"
              alt="replied_icon"
              width="15px"
              height="15px"
            />
          )}
          {type === "liked" && (
            <img
              src="https://i.ibb.co/852VXbX/heartt-filled-grey.png"
              alt="heart_icon"
              width="15px"
              height="15px"
            />
          )}
        </div>
        <div className="post_who_liked_or_commented_leftSide_text">
          {children}
        </div>
      </div>
      <div className="post_who_liked_or_commented_rightSide"></div>
    </div>
  );
};

export const AccountName = ({ children }) => {
  return <div className="post-accountName">{children}</div>;
};

export const Verified = ({ verified, typeOfVerification }) => {
  if (verified) {
    if (typeOfVerification && typeOfVerification === "business") {
      return (
        <img
          className="verified-badge-img-icon"
          src="https://i.ibb.co/yXdht1w/verify-gold.png"
          width="16px"
          height="16px"
          alt="verified_badge"
        />
      );
    } else {
      return (
        <img
          className="verified-badge-img-icon"
          src="https://i.ibb.co/nknWhJS/verified.png"
          width="16px"
          height="16px"
          alt="verified_badge"
        />
      );
    }
  }
  return null;
};

export const AccountHandle = ({ children }) => {
  return <div className="post-accountHandle">@{children}</div>;
};

export const TimeStamp = ({ timestamp }) => {
  const currentDate = new Date();
  const parsedDate = Date.parse(timestamp);
  return <div className="post-timestamp-text">1hr</div>;
};

export const Pikaso = () => {
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
        src="https://i.ibb.co/xYHs3BS/camera-1.png"
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
        src="https://i.ibb.co/tbGQvWT/camera-2.png"
        width="16px"
        height="16px"
        alt="moreOptions-icon"
      />
    </div>
  );
};

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

export const DotSeperator = () => {
  return <div style={{ fontSize: "15px", color: "grey", marginLeft:'2px' ,marginRight:'2px' }}>·</div>;
};

export const TweetPostText = ({ children }) => {
  const textArr = children.split(" ");
  let result = [];
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i][0] === "@") {
      result.push(
        `<span class='tweet-post-text-highlighted'>${textArr[i]}</span>`
      );
    } else {
      result.push(textArr[i]);
    }
  }
  let text = result.join(" ");

  return (
    <div className="tweetPostText" dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export const TaggedHandles = ({ data }) => {
  if (!data.length) {
    return null;
  }
  if (data.length === 1) {
    return (
      <div className="post-taggedPeople-container">
        <div className="post-taggedPeople-img-container">
          <img
            src="https://i.ibb.co/PGjZyPK/user-active-grey.png"
            width="12px"
            height="12px"
            alt="profile_icon"
          />
        </div>
        <div className="post-taggedPeople-text"> {data[0]}</div>
      </div>
    );
  } else if (data.length === 2) {
    let str = `${data[0]} and ${data[1]}`;
    return (
      <div className="post-taggedPeople-container">
        <div className="post-taggedPeople-img-container">
          <img
            src="https://i.ibb.co/PGjZyPK/user-active-grey.png"
            width="12px"
            height="12px"
            alt="profile_icon"
          />
        </div>
        <div className="post-taggedPeople-text"> {str}</div>
      </div>
    );
  } else {
    let str = `${data[0]} and ${data.length - 1} more`;
    return (
      <div className="post-taggedPeople-container">
        <div className="post-taggedPeople-img-container">
          <img
            src="https://i.ibb.co/PGjZyPK/user-active-grey.png"
            width="12px"
            height="12px"
            alt="profile_icon"
          />
        </div>
        <div className="post-taggedPeople-text"> {str}</div>
      </div>
    );
  }
};

export function HomePostTextHelper({ url, children }) {
  return (
    <div id="homePostTextHelper2">
      <img src={url} width="16px" height="16px" alt="someImg" />
      <div id="homePostTextHelperText2">{children}</div>
    </div>
  );
}

export const TweetAttachments = ({ data }) => {
  if (!data.length) {
    return null;
  }
  if (data.length === 1) {
    return (
      <div className="tweet-attachments-single-attachment">
        <img src={data[0]} alt="post_image" />
      </div>
    );
  }
  if (data.length === 2) {
    return null;
  }
  if (data.length === 3) {
    return null;
  }
  if (data.length === 4) {
    return null;
  }
};

export const AccountDetailsAndScreenshotAndMore = ({
  accountName,
  accountHandle,
  timeStamp,
  typeOfVerification,
  verified
}) => {
  return (
    <div className="accountDetailsAndScreenshotAndMoreContainer">
      <div className="accountDetailsAndScreenshotAndMoreLeftSideContainer">
        <AccountName>{accountName}</AccountName>
        <Verified verified={verified} typeOfVerification={typeOfVerification} />
        <AccountHandle>{accountHandle}</AccountHandle>
        <DotSeperator />
        <TimeStamp />
      </div>
      <div className="accountDetailsAndScreenshotAndMoreRightSideContainer">
        <Pikaso />
        <MoreOptions />
      </div>
    </div>
  );
};

export const PostStat = ({ type, name, urlHovered, urlGrey }) => {
  const [statHovered, setStatHovered] = useState(false);

  const viewsMouseOverHandler = () => {
    setStatHovered(true);
  };
  const viewsMouseLeaveHandler = () => {
    setStatHovered(false);
  };
  let backgroundColor;
  let color;
  if (type === "view" || type === "reply" || type==='share') {
    backgroundColor = "#1a8cd81a";
    color = "#1D9BF0";
  } else if (type === "retweet") {
    backgroundColor = "#b4e4d499";
    color = "#28c490";
  } else if (type === "like") {
    backgroundColor = "#f4cce4";
    color = "#fc288a";
  }

  return (
    <div
      className="post-stat"
      onMouseOver={viewsMouseOverHandler}
      onMouseLeave={viewsMouseLeaveHandler}
    >
      <div
        className="post-stat-img-container"
        style={{
          backgroundColor: statHovered && backgroundColor,
          borderRadius: "999px"
        }}
      >
        {statHovered ? (
          <img
            src={urlHovered}
            width="18.75px"
            height="18.75px"
            alt="post-stat"
          />
        ) : (
          <img src={urlGrey} width="18.75px" height="18.75px" alt="post-stat" />
        )}
      </div>
      <div className="post-stat-text" style={{ color: statHovered && color }}>
        {name}
      </div>
    </div>
  );
};

export const PostStats = ({ views, replies, retweets, likes ,share}) => {
  return (
    <div className="post-stats">
      <PostStat
        type="view"
        urlHovered={"https://i.ibb.co/SNJkZ73/views-blue.png"}
        urlGrey={"https://i.ibb.co/JcZ4Fvh/views-grey.png"}
        name={views}
      />
      <PostStat
        type="reply"
        urlHovered={"https://i.ibb.co/Z8gC171/chat-1-1.png"}
        urlGrey={"https://i.ibb.co/9WsBcdb/chat-1.png"}
        name={replies}
      />
      <PostStat
        type="retweet"
        urlHovered={"https://i.ibb.co/DgT2MYg/repeat-2.png"}
        urlGrey={"https://i.ibb.co/Tg30CRt/repeat-1.png"}
        name={retweets}
      />
      <PostStat
        type="like"
        urlHovered={"https://i.ibb.co/2KkyVfp/heart-2.png"}
        urlGrey={"https://i.ibb.co/qmB8Cp0/heart-1.png"}
        name={likes}
      />
       <PostStat
        type="share"
        urlHovered={"https://i.ibb.co/64yk2H3/upload-blue.png"}
        urlGrey={"https://i.ibb.co/8X0jQKm/upload-grey.png"}
        name={share}
      />
    </div>
  );
};

export default {
  PostStats,
  PostStat,
  AccountDetailsAndScreenshotAndMore,
  TweetAttachments,
  HomePostTextHelper,
  TaggedHandles,
  TweetPostText,
  DotSeperator,
  MoreOptions,
  Pikaso,
  TimeStamp,
  AccountHandle,
  Verified,
  AccountName,
  PostWhoLikedOrCommented
};
