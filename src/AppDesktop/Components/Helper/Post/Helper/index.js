import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../../config/config";
import './styles.css';

const postMoreTippyArr = [
  ['https://cdn-icons-png.flaticon.com/512/158/158398.png', 'Not interested in this tweet'],
  ['https://cdn-icons-png.flaticon.com/512/983/983886.png', 'Follow'],
  ['https://cdn-icons-png.flaticon.com/512/9511/9511721.png', 'Save']
]

const monthsArr = [
  "Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const DetailedPostStats = (
  { repliesCount, retweetsCount, likeCount, }
) => {

  console.log(repliesCount, 'adadadad')

  const [arr, setArr] = useState([]);
  useEffect(() => {
    const obj = [
      ['Retweets', retweetsCount !== null ? retweetsCount : 0],
      ['Replies', repliesCount !== null ? repliesCount : 0],
      ['Likes', likeCount !== null ? likeCount : 0],
    ]
    setArr(obj);
  }, []);

  useEffect(() => {
    const obj = [
      ['Retweets', retweetsCount !== null ? retweetsCount : 0],
      ['Replies', repliesCount !== null ? repliesCount : 0],
      ['Likes', likeCount !== null ? likeCount : 0],
    ]
    setArr(obj);
  }, [likeCount, retweetsCount, repliesCount]);


  return (
    <div className="detailed-postStats-container">
      <div className='detailed-postStats-container-left'>
        {arr.map((item) => {
          return <div className='detailed-postStats-item-container'>
            <div className='detailed-postStats-item-count'>{item[1] === 0 || item[1] ? item[1] : 0}</div>
            <div className='detailed-postStats-item-text'>{item[0]}</div>
          </div>
        })}

      </div>
      <div style={{ width: '50%' }}></div>
    </div>
  )
}
export const PostStatForIndividualTweet = ({ timestamp }) => {
  const [result, setResult] = useState('')

  useEffect(() => {
    if (timestamp) {
      let amPm;
      const newDate = new Date(timestamp);
      const hours = newDate.getHours();
      const minutes = newDate.getMinutes();
      const seconds = newDate.getSeconds();
      const month = newDate.getMonth();
      const currDate = newDate.getDate();
      const year = newDate.getFullYear();
      if (hours <= 12) amPm = 'AM';
      else amPm = 'PM';
      let convertedHours = hours > 12 ? hours - 12 : hours;
      setResult(`${convertedHours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm} · ${monthsArr[month]} ${currDate}, ${year}`);
    }
  }, []);
  return (
    <div className='post-stat-individualTweet'>
      {result}
    </div>
  )
}
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

export const PostMoreTippy = (
  { idd, showFollowToastify,
    showInfoToastify,
    showErrorToastify,
    setShowTippy, idx,
    bookmarkTweetFn,
    accountHandle,
    alreadyFollowToastify,
    accountName,
    verified,
    typeOfVerification,
    showToastify }) => {
  const id = `post-more-tippy${idx}`;
  return (
    <div className='post-more-tippy' id={id}>
      {postMoreTippyArr.map((item, idx) => {
        return <div className='post-more-tippy-item' key={idx}
          onClick={() => {
            if (item[1] === 'Save') {
              const fetch = async () => {
                try {
                  const { data } = await axios.post(`${BACKEND_URL}/pages/bookmark/alreadyExists`, { id: idd }, { withCredentials: true });
                  const { message } = data;
                  if (message === "Exists") {
                    showErrorToastify();
                  }
                  else {
                    bookmarkTweetFn();
                    showToastify();
                  }
                }
                catch (err) {
                  console.log('err', err);
                }
              }
              fetch();
            }
            else if (item[1] === "Follow") {
              const fetch = async () => {
                try {
                  const alreadyFollowing = await axios.post(`${BACKEND_URL}/pages/alreadyFollows`, { accountHandle: accountHandle }, { withCredentials: true })
                  if (alreadyFollowing.data) {
                    alreadyFollowToastify(accountHandle);
                  }
                  else{
                    const alreadyFollowing = await axios.post(`${BACKEND_URL}/pages/newFollow`, { accountHandle: accountHandle }, { withCredentials: true })
                    showFollowToastify(accountHandle);
                  }
                }
                catch (error) {
                  throw error;
                }
              }
              fetch();
             
            }
            else if (item[1] === "Not interested in this tweet") {
              showInfoToastify();
            }
            setShowTippy(false);
          }}
        >
          <div className='post-more-tippy-imgContainer'><img width='18px' height='18px' src={item[0]} alt='' /></div>
          <div className='post-more-tippy-item-text'>{item[1]}</div>
        </div>
      })}

    </div>
  )
}

export const MoreOptions = ({
  showErrorToastify,
  idd,
  bookmarkTweetFn,
  showToastify,
  showInfoToastify,
  showFollowToastify,
  accountHandle,
  alreadyFollowToastify,
  accountName,
  verified,
  typeOfVerification,
}) => {
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
    {showTippy && <PostMoreTippy idd={idd}
      showFollowToastify={showFollowToastify}
      showErrorToastify={showErrorToastify}
      showInfoToastify={showInfoToastify}
      setShowTippy={setShowTippy}
      showToastify={showToastify}
      bookmarkTweetFn={bookmarkTweetFn}
      accountHandle={accountHandle}
      accountName={accountName}
      verified={verified}
      typeOfVerification={typeOfVerification}
      alreadyFollowToastify={alreadyFollowToastify}
      idx={idd} />}
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
  showToastify,
  forReply,
  showErrorToastify,
  showFollowToastify,
  showInfoToastify,
  alreadyFollowToastify,
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
      {!forReply && <div className="accountDetailsAndScreenshotAndMoreRightSideContainer">
        <Pikaso />
        <MoreOptions showInfoToastify={showInfoToastify}
          showFollowToastify={showFollowToastify}
          showErrorToastify={showErrorToastify}
          idd={id} showToastify={showToastify}
          bookmarkTweetFn={bookmarkTweetFn}
          accountHandle={accountHandle}
          alreadyFollowToastify={alreadyFollowToastify}
          accountName={accountName}
          verified={verified}
          typeOfVerification={typeOfVerification}
          idx={idx} />
      </div>}
    </div>
  );
};

export const PostStat = ({ prevLikeState, prevRetweetState, incrementerOrDecrementer, forIndividualTweet, setShowReplyModal, initialAlready, accountHandle, id, urlFilled, type, name, urlHovered, urlGrey }) => {
  const [initialAlreadyState, setInitialAlreadyState] = useState(initialAlready ? initialAlready : false);
  const [count, setCount] = useState(name ? name : name === null ? 0 : 0);

  useEffect(() => {

  }, [])

  const likesToggler = () => {
    if (initialAlreadyState) setCount(likesState => likesState - 1);
    else setCount(likesState => likesState + 1);
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
          if (forIndividualTweet) {
            incrementerOrDecrementer(prevLikeState => prevLikeState - 1);
          }
          else {
            setCount(count => count - 1);
          }
          if (initialAlreadyState) setInitialAlreadyState(false);
          else setInitialAlreadyState(true);
        }
        else {
          if (forIndividualTweet) {
            incrementerOrDecrementer(prevLikeState => prevLikeState + 1);
          }
          else {
            setCount(count => count + 1);
          }
          if (initialAlreadyState) setInitialAlreadyState(false);
          else setInitialAlreadyState(true);

        }
      }
      fetch();
    }
    else if (type === 'retweet') {
      const fetch = async () => {
        try {
          const { data } = await axios.post(`${BACKEND_URL}/post/toggleRetweet`, { id: id, accountHandle: accountHandle }, { withCredentials: true });
          const { message } = data;
          if (message === "Successfully retweeted!") {
            if (forIndividualTweet) {
              incrementerOrDecrementer(prevRetweetState => prevRetweetState + 1);
            }
            else {
              setCount(count => count + 1);
            }

          }
          else if (message === "Successfully removed retweet!") {
            if (forIndividualTweet) {
              incrementerOrDecrementer(prevRetweetState => prevRetweetState - 1);
            }
            else {
              setCount(count => count - 1);

            }
          }
          if (initialAlreadyState) setInitialAlreadyState(false);
          else setInitialAlreadyState(true);
        } catch (error) {
          console.log(error)
        }
      }
      fetch();
    }
    else if (type === 'reply') {
      setShowReplyModal(true);
    }
  }
  // console.log(name);
  return (
    <div
      className="post-stat"
      onMouseOver={viewsMouseOverHandler}
      onMouseLeave={viewsMouseLeaveHandler}>
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
          <img src={initialAlreadyState ? urlFilled : urlGrey} style={{ transition: '0.2s' }} width="18.75px" height="18.75px" alt="post-stat" />
        )}
      </div>
      {!forIndividualTweet && <div className="post-stat-text" style={{ color: (statHovered || initialAlreadyState) && color }}>
        {type == 'share' ?
          null
          : count
        }

      </div>}
    </div>
  );
};

export const PostStats = ({ prevLikeState, prevRetweetState, setLikesCountState, setRetweetsCountsState, forIndividualTweet, replyCount, setShowReplyModal, id, likedAlready, retweetedAlready, accountHandle, views, replies, retweets, likes, share }) => {
  return (
    <div className="post-stats">
      {/* <PostStat
        type="view"
        urlHovered={"https://i.ibb.co/SNJkZ73/views-blue.png"}
        urlGrey={"https://i.ibb.co/JcZ4Fvh/views-grey.png"}
        name={views}
        forIndividualTweet={forIndividualTweet}
      /> */}
      <PostStat
        setShowReplyModal={setShowReplyModal}
        type="reply"
        urlHovered={"https://i.ibb.co/Z8gC171/chat-1-1.png"}
        urlGrey={"https://i.ibb.co/9WsBcdb/chat-1.png"}
        name={replyCount}
        forIndividualTweet={forIndividualTweet}
      />
      <PostStat
        id={id}
        accountHandle={accountHandle}
        initialAlready={retweetedAlready}
        type="retweet"
        prevRetweetState={prevRetweetState}
        urlFilled={"https://i.ibb.co/DgT2MYg/repeat-2.png"}
        urlHovered={"https://i.ibb.co/DgT2MYg/repeat-2.png"}
        urlGrey={"https://i.ibb.co/Tg30CRt/repeat-1.png"}
        name={retweets}
        forIndividualTweet={forIndividualTweet}
        incrementerOrDecrementer={setRetweetsCountsState}
      />
      <PostStat
        id={id}
        accountHandle={accountHandle}
        initialAlready={likedAlready}
        urlFilled={'https://i.ibb.co/L9m8FCt/heart-2.png'}
        type="like"
        prevLikeState={prevLikeState}
        urlHovered={"https://i.ibb.co/2KkyVfp/heart-2.png"}
        urlGrey={"https://i.ibb.co/qmB8Cp0/heart-1.png"}
        name={likes}
        forIndividualTweet={forIndividualTweet}
        incrementerOrDecrementer={setLikesCountState}
      />
      <PostStat
        type="share"
        urlHovered={"https://i.ibb.co/64yk2H3/upload-blue.png"}
        urlGrey={"https://i.ibb.co/8X0jQKm/upload-grey.png"}
        name={share}
        forIndividualTweet={forIndividualTweet}
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
  PostWhoLikedOrCommented,
  PostStatForIndividualTweet
};
