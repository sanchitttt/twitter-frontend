import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../../config/config";
import './styles.css';

const postMoreTippyArr = [
  ['https://cdn-icons-png.flaticon.com/512/158/158398.png', 'Not interested in this tweet'],
  ['https://cdn-icons-png.flaticon.com/512/983/983886.png', 'Follow'],
  ['https://cdn-icons-png.flaticon.com/512/9511/9511721.png', 'Save']
]

export const PollViewer = ({ id, accountHandle, poll, alreadyVoted }) => {
  const [polls, setPolls] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [alreadyVotedState, setAlreadyVotedState] = useState(alreadyVoted || alreadyVoted === 0);


  useEffect(() => {
    if (poll) {
      const currDate = new Date().valueOf();
      const parsedDate = new Date(poll.expiresAt).valueOf();
      let diff = parsedDate.valueOf() - currDate.valueOf();
      if (diff <= 0) setTimeLeft('Final results')
      else if (diff >= 86400000) setTimeLeft(Math.floor(diff / 86400000) + ' days left');
      else if (diff >= 3600000) setTimeLeft(Math.floor(diff / 3600000) + ' hours left');
      else if (diff >= 60000) setTimeLeft(Math.floor(diff / 60000) + ' minutes left');
      else if (diff >= 1000) setTimeLeft(Math.floor(diff / 1000) + 'seconds left');
    }
  }, [])

  const clickHandler = async (idx) => {
    const fetch = async (idx) => {
      try {
        await axios.post(`${BACKEND_URL}/post/submitPollChoice`, { id: id, accountHandle: accountHandle, pollChoice: idx }, { withCredentials: true });
      } catch (error) {
      }
    }
    fetch(idx);
  }

  useEffect(() => {
    const transformation = () => {
      if (poll && poll.options) {
        let count = 0;
        setPolls(poll.options);
        for (let i = 0; i < poll.options.length; i++) {
          count += parseInt(poll.options[i][1]);
        }
        setTotalCount(count);
      }
    }
    transformation();
  }, []);

  if (!alreadyVotedState) {
    return polls.length ?
      <div className="poll-viewer-container">
        <div className='individualPollsContainer'>
          {polls.map((item, idx) => {
            return <div className='individualPollsItemBlue'
              onClick={() => {
                setAlreadyVotedState(true);
                setTotalCount(count => count + 1);
                const arr = [...polls];
                arr[idx][1] += 1;
                setPolls(arr);
                clickHandler(idx);
              }}
              key={idx}
            >
              <div style={{ borderRadius: '999px', width: `100%`, marginBottom: '5px', border: '1px solid rgb(29, 155, 240)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className='individualPollsItem-optionTextBlue'>{item[0]}</div>
              </div>
            </div>
          })}
        </div>
        <div className='poll-viewer-expiredDate'>
          {totalCount} votes · {timeLeft}
        </div>
      </div>
      : null
  }

  return (
    polls.length ?
      <div className="poll-viewer-container">
        <div className='individualPollsContainer'>
          {polls.map((item, idx) => {
            const width = (((parseInt(item[1]) / parseInt(totalCount) * 100) * 500) / 100) + 'px';
            let ans = parseInt(item[1]) / parseInt(totalCount) * 100;
            if (isNaN(ans)) ans = 0;
            return <div className='individualPollsItem'
              key={idx}
            // style={{ width:}}
            >
              <div style={{ width: `${width}`, backgroundColor: '#cfd9de', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='individualPollsItem-optionText'>
                  {item[0]}
                  {idx === alreadyVoted && <img style={{ marginLeft: '5px' }} src='https://cdn-icons-png.flaticon.com/512/1442/1442912.png' width='12px' height='12px' />}
                </div>
                <div className='individualPollsItem-percentage'>{Math.round(ans)}%</div>
              </div>
            </div>
          })}
        </div>
        <div className='poll-viewer-expiredDate'>
          {totalCount} votes · {timeLeft}
        </div>
      </div>
      : null


  );
}
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
  if (verified && verified === true) {
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

export const TimeStamp = ({ forReel, timestamp }) => {
  const [result, setResult] = useState('');
  useEffect(() => {
    const currentDate = new Date();
    const parsedDate = new Date(timestamp)
    const diff = currentDate - parsedDate;
    if (diff >= 31557600000) setResult(Math.floor(diff / 31557600000) + 'y')
    else if (diff >= 2629800000) setResult(Math.floor(diff / 2629800000) + 'm')
    else if (diff >= 86400000) setResult(Math.floor(diff / 86400000) + 'd')
    else if (diff >= 3600000) setResult(Math.floor(diff / 3600000) + 'h')
    else if (diff >= 60000) setResult(Math.floor(diff / 60000) + 'm')
    else if (diff >= 1000) setResult(Math.floor(diff / 1000) + 's')

  }, []);
  return <div style={{ color: forReel && '#0f1419', fontSize: forReel && '15px' }} className="post-timestamp-text">
    {result}
  </div>;
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

export const PostMoreTippy = ({ setShowTippy, idx, bookmarkTweetFn, showToastify }) => {
  const id = `post-more-tippy${idx}`;
  return (
    <div className='post-more-tippy' id={id}>
      {postMoreTippyArr.map((item, idx) => {
        return <div className='post-more-tippy-item' key={idx}
          onClick={() => {
            if (item[1] === 'Save') {
              bookmarkTweetFn();
              setShowTippy(false);
              showToastify();
            }
          }}
        >
          <div className='post-more-tippy-imgContainer'><img width='18px' height='18px' src={item[0]} alt='' /></div>
          <div className='post-more-tippy-item-text'>{item[1]}</div>
        </div>
      })}

    </div>
  )
}

export const MoreOptions = ({ idd, bookmarkTweetFn, showToastify }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTippy, setShowTippy] = useState(false);
  const id = `postMoreOptions${idd}`

  const clickHandler = () => {
    setShowTippy(true);
  }

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    if (setIsHovered) setIsHovered(false);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const moreOptionsContainer = document.getElementById(id);
      const actualTippy = document.getElementById(`post-more-tippy${idd}`);

      if (moreOptionsContainer) {
        if (moreOptionsContainer.contains(e.target) || actualTippy.contains(e.target)) {
          // do nothing
        }
        else {
          setShowTippy(false);
        }
      }
    });

    return () => {
      document.removeEventListener("click", () => {

      });
    }
  });
  return <div style={{ position: 'relative' }} id={id} >
    {isHovered ? (
      <div >
        <div
          className="blue-hover"
          style={{ marginLeft: "5px" }}
          onMouseLeave={mouseLeaveHandler}
          onMouseOver={mouseEnterHandler}
          onClick={clickHandler}
        >
          <img
            src="https://i.ibb.co/WyVK6vj/dots-1-1.png"
            width="16px"
            height="16px"
            alt="moreOptions-icon"
          />
        </div>
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
    )}
    {showTippy && <PostMoreTippy setShowTippy={setShowTippy} showToastify={showToastify} bookmarkTweetFn={bookmarkTweetFn} idx={idd} />}
  </div>

};

export const DotSeperator = () => {
  return <div style={{ fontSize: "15px", color: "grey", marginLeft: '2px', marginRight: '2px' }}>·</div>;
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
  if (data.length === 1) {
    return (
      <div className="imgListContainer1">
        <img src={data[0]} alt="icon" />
      </div>
    );
  }
  if (data.length === 2) {
    return (
      <div className="imgListContainer2">
        <div className="imgListContainer2Left">
          <img src={data[0]} alt="icon" />
        </div>
        <div className="imgListContainer2Right">
          <img src={data[1]} alt="icon" />
        </div>
      </div>
    );
  }
  if (data.length === 3) {
    return (
      <div className="imgListContainer3">
        <div className="imgListContainer3Left">
          <img src={data[0]} alt="icon" />
        </div>
        <div className="imgListContainer3RightContainer">
          <div className="imgListContainer3RightLeft">
            <img src={data[1]} alt="icon" />
          </div>
          <div className="imgListContainer3RightRight">
            <img src={data[2]} alt="icon" />
          </div>
        </div>
      </div>
    );
  }
  if (data.length === 4) {
    return (
      <div className="imgListContainer4">
        <div className="imgListContainer4Top">
          <img src={data[0]} alt="icon" />
          <img src={data[1]} alt="icon" />
        </div>
        <div className="imgListContainer4Bottom">
          <img src={data[2]} alt="icon" />
          <img src={data[3]} alt="icon" />

        </div>
      </div>
    );
  }
  return (
    <div>
      {data.map((img, idx) => {
        return <img key={idx} src={img} alt="icon" />;
      })}
    </div>
  );
};

export const AccountDetailsAndScreenshotAndMore = ({
  id,
  idx,
  accountName,
  accountHandle,
  timeStamp,
  typeOfVerification,
  verified,
  bookmarkTweetFn,
  showToastify
}) => {
  return (
    <div className="accountDetailsAndScreenshotAndMoreContainer">
      <div className="accountDetailsAndScreenshotAndMoreLeftSideContainer">
        <AccountName>{accountName}</AccountName>
        <Verified verified={verified} typeOfVerification={typeOfVerification} />
        <AccountHandle>{accountHandle}</AccountHandle>
        <DotSeperator />
        <TimeStamp timestamp={timeStamp} />
      </div>
      <div className="accountDetailsAndScreenshotAndMoreRightSideContainer">
        <Pikaso />
        <MoreOptions idd={id} showToastify={showToastify} bookmarkTweetFn={bookmarkTweetFn} idx={idx} />
      </div>
    </div>
  );
};

export const PostStat = ({ likedAlready, accountHandle, id, urlFilled, type, name, urlHovered, urlGrey }) => {
  const [likedAlreadyState, setLikedAlreadyState] = useState(likedAlready ? likedAlready : false);
  const [likesState, setLikesState] = useState(name ? name : name === null ? 0 : 0);
  // console.log('likedAlreadyState', likedAlreadyState)
  // console.log('likesState', likesState);
  useEffect(() => {
    // const fetch = async () => {
    //   let result = await axios.get(`${BACKEND_URL}/posts/`)
    // }
    // fetch();
  }, [])

  const likesToggler = () => {
    // console.log('likedAlreadyState', likedAlreadyState)
    // console.log('likesState', likesState);
    if (likedAlreadyState) setLikesState(likesState => likesState - 1);
    else setLikesState(likesState => likesState + 1);
  }

  const [statHovered, setStatHovered] = useState(false);

  const viewsMouseOverHandler = () => {
    setStatHovered(true);
  };
  const viewsMouseLeaveHandler = () => {
    setStatHovered(false);
  };
  let backgroundColor;
  let color;
  if (type === "view" || type === "reply" || type === 'share') {
    backgroundColor = "#1a8cd81a";
    color = "#1D9BF0";
  } else if (type === "retweet") {
    backgroundColor = "#b4e4d499";
    color = "#28c490";
  } else if (type === "like") {
    backgroundColor = "#f4cce4";
    color = "#fc288a";
  }

  const clickHandler = () => {
    if (type === 'like') {
      const fetch = async () => {
        const result = await axios.post(`${BACKEND_URL}/post/stats/like/toggle`, { tweetId: id, tweetsWriter: accountHandle }, { withCredentials: true });
        const { message } = result.data;
        if (message === "Successfully unliked!") {
          setLikesState(likesState => likesState - 1);
        }
        else {
          setLikesState(likesState => likesState + 1);
        }
        if (likedAlreadyState) setLikedAlreadyState(false);
        else setLikedAlreadyState(true);
      }
      fetch();
    }
  }
  // console.log(name);
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
          borderRadius: "999px",
          transition: '0.2s'
        }}
        onClick={clickHandler}
      >
        {statHovered ? (
          <img
            src={urlHovered}
            width="18.75px"
            height="18.75px"
            alt="post-stat"
            style={{ transition: '0.2s' }}
          />
        ) : (
          <img src={likedAlreadyState ? urlFilled : urlGrey} style={{ transition: '0.2s' }} width="18.75px" height="18.75px" alt="post-stat" />
        )}
      </div>
      <div className="post-stat-text" onClick={() => {
        if (type === 'like') likesToggler();
      }} style={{ color: (statHovered || likedAlreadyState) && color }}>
        {type === 'like'
          ? likesState
          : name || type == 'share' ? name : 0
        }
      </div>
    </div>
  );
};

export const PostStats = ({ id, likedAlready, retweetedAlready, accountHandle, views, replies, retweets, likes, share }) => {
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
        id={id}
        accountHandle={accountHandle}
        likedAlready={likedAlready}
        urlFilled={'https://i.ibb.co/L9m8FCt/heart-2.png'}
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
