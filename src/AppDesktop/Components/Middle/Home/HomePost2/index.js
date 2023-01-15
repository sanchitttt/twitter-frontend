import React, { useEffect, useRef, useState } from 'react';
import '../HomePost/styles.css';
import PrimaryButton from '../../../Helper/PrimaryButton/index';
import PostIcon from '../../../Helper/PostIcon/index'
import HomeCheckbox from '../../../Helper/HomeCheckbox/index';
import HomePostTextHelper from '../../../Helper/HomePostTextHelper/index';
import ScheduleTweet from '../../../Helper/ScheduleTweet/index';
import UnsentTweets from '../../../Helper/UnsentTweets/index';
import TippyAudience from '../../../Helper/TippyAudience/index';
import HomePoll from '../../../Helper/HomePoll/index';
import { Dialog, Modal } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

const postIconsArray = [
  ['file', 'https://i.ibb.co/Z83rNRs/gallery-1.png'],
  ['', 'https://i.ibb.co/BTGcgVR/gif-1.png'],
  ['poll', 'https://i.ibb.co/9GrphjN/polling-1.png'],
  ['emoji', 'https://i.ibb.co/RQPpgRp/happy-1.png'],
  ['schedule', 'https://i.ibb.co/Y2wK2RK/event-1.png'],
  ['location', 'https://i.ibb.co/vhzdpVZ/location-1.png']
]

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

function HomePost2({
  decrementer,
  forTimeline,
  partOfAThread,
  isTheLastTweet,
  incrementer,
  firstItemInThread,
  showTweetButton,
  showAddMoreButton
}) {
  const [text, setText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [value, setValue] = useState(0);
  const [textAreaCols, setTextAreaCols] = useState(46);
  const [rowThreshold, setRowThreshold] = useState(46);
  const [audience, setAudience] = useState("everyone");
  const [activeOptionClicked, setActiveOptionClicked] = useState(null);
  const [isAScheduledTweet, setIsAScheduledTweet] = useState({
    bool: false,
    text: "",
    month: null,
    year: null,
    date: null,
    hour: null,
    minute: null,
    amPm: null
  });
  const [whoCanReplyText, setWhoCanReplyText] = useState("Everyone");
  const [showWhoCanReplyTippy, setShowWhoCanReplyTippy] = useState(false);

  const myRef = useRef(null);

  useEffect(() => {
    const currWidth = document.documentElement.clientWidth;
    if (currWidth <= 700) {
      let diff = 700 - currWidth;
      let colsToBeRemoved = Math.floor(diff / 13);
      let finalCols = textAreaCols - colsToBeRemoved;
      let rowsThresholdAfterReduction = rowThreshold - colsToBeRemoved;
      setTextAreaCols(finalCols);
      setRowThreshold(rowsThresholdAfterReduction);
    }
  }, []);

  const focusHandler = () => {
    if (!hasClicked) {
      setHasClicked(true);
    }
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setTotalCount((count) => count + rowThreshold);
    } else if (
      e.keyCode === 8 &&
      e.target.value.charCodeAt(e.target.value.length - 1) === 10
    ) {
      setTotalCount((count) => count - rowThreshold);
    } else if (e.keyCode === 8) {
      setTotalCount((count) => count - 1);
    } else {
      setTotalCount((count) => count + 1);
    }
  };
  const textHandler = (e) => {
    setText(e.target.value);
    // console.log(myRef.current.value.length)
    // if (myRef.current.value.length >= 280) {
    //     // Do nothing
    // }
    // else {
    console.log(value);
    setValue(Math.ceil((myRef.current.value.length / 280) * 100));
    // }
    let rows = Math.ceil(totalCount / rowThreshold);
    // console.log(myRef.current.value.length,currentWordLength,rowThreshold,rows);
    document.getElementById("home-post-input").rows = rows;
  };

  const emojiClickHandler = (e) => {
    setText((text) => text + e.emoji);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      let emojiDiv = document.getElementById("emoji-picker");
      let emojiImg = document.getElementById("home-emoji-image");
      let unsentTweetsContainer = document.getElementById(
        "unsent-tweets-master-container"
      );
      let scheduleTweetTextDiv = document.getElementById(
        "schedule-footer-button-container"
      );
      let textHelperDiv = document.getElementById("homePostTextHelper");
      let tippy = document.getElementById("post-tippy");

      if (emojiDiv) {
        if (emojiDiv.contains(e.target) || emojiImg.contains(e.target)) {
          //Do nothing
        } else {
          setActiveOptionClicked(null);
        }
      } else if (unsentTweetsContainer) {
        if (
          unsentTweetsContainer.contains(e.target) ||
          scheduleTweetTextDiv.contains(e.target)
        ) {
          //Do nothing
        } else {
          setActiveOptionClicked(null);
        }
      } else if (tippy) {
        if (textHelperDiv.contains(e.target) || tippy.contains(e.target)) {
          // Do nothing
        } else {
          setShowWhoCanReplyTippy(false);
        }
      }
    });
    return () => {
      document.removeEventListener("click", () => { });
    };
  }, []);

  return (
    <div
      id="home-post-container"
      style={{
        // padding : forTimeline? '50px':'0px',
        borderRadius: forTimeline ? "15px" : "0px"
      }}
    >
      <div id="home-post-left">
        <div id="home-post-left-top">
          <img
            alt="someImg"
            src="https://i.ibb.co/p4R5q3P/1655230 024525.jpg"
            className="rounded-image"
            width="48px"
            height="48px"
          />
        </div>
        <div></div>
      </div>

      <div id="home-post-right">
        {isAScheduledTweet.bool && (
          <div
            onClick={() => setActiveOptionClicked("schedule")}
            className="home-schedule-text-hover"
            style={{
              display: "flex",
              color: "#536471",
              fontSize: "13px",
              marginBottom: "15px"
            }}
          >
            <img
              src="https://thumbs4.imagebam.com/98/f9/99/MEHU2MK_t.png"
              width="18px"
              height="18px"
              alt="schedule-date-picker-img"
              style={{ marginRight: "5px" }}
            />
            {isAScheduledTweet.text}
          </div>
        )}

        {/* <div className="homeCheckBoxContainer"> */}
        {hasClicked && firstItemInThread && (
          <HomeCheckbox audience={audience} audienceHandler={setAudience} />
        )}
        {/* </div> */}
        {isTheLastTweet && hasClicked && (
          <div style={{display:'flex', justifyContent:'flex-end'}}>
          <div className="homePostCloseIconContainer" onClick={decrementer}>
            <img src="https://i.ibb.co/xsZmvWC/close-blue.png" alt="close" />
          </div>
          </div>
        )}
        <textarea
          style={{ color: "black" }}
          placeholder={
            !firstItemInThread
              ? ""
              : activeOptionClicked === "poll"
                ? "Ask a question"
                : "What's happening?"
          }
          ref={myRef}
          id="home-post-input"
          rows="1"
          cols={textAreaCols}
          onFocus={focusHandler}
          value={text}
          onKeyDown={keyDownHandler}
          onChange={textHandler}
        />

        {activeOptionClicked === "poll" && (
          <HomePoll activeOptionHandler={setActiveOptionClicked} />
        )}
        {activeOptionClicked === "emoji" && (
          <div id="emoji-picker">
            <EmojiPicker onEmojiClick={emojiClickHandler} />
          </div>
        )}
        {activeOptionClicked === "schedule" && (
          <Modal
            sx={style}
            onClose={() => setActiveOptionClicked(null)}
            open={activeOptionClicked === "schedule"}
          >
            <ScheduleTweet
              scheduleHandler={setIsAScheduledTweet}
              scheduleObject={isAScheduledTweet}
              activeOptionHandler={setActiveOptionClicked}
            />
          </Modal>
        )}
        {activeOptionClicked === "unsent-tweets" && (
          <Modal sx={style} open={activeOptionClicked === "unsent-tweets"}>
            <div id="unsent-tweets-master-container">
              <UnsentTweets activeOptionHandler={setActiveOptionClicked} />
            </div>
          </Modal>
        )}
        {showWhoCanReplyTippy && (
          <TippyAudience
            whoCanReply={whoCanReplyText}
            whoCanReplyHandler={setWhoCanReplyText}
            showTippy={setShowWhoCanReplyTippy}
          />
        )}
        {hasClicked && (
          <div
            onClick={() => {
              if (audience !== "circle") setShowWhoCanReplyTippy(true);
            }}
          >
            {firstItemInThread && (
              <HomePostTextHelper
                disabled={audience === "circle"}
                url={
                  audience === "circle"
                    ? "https://i.ibb.co/n7Gsfw7/lock-blue.png"
                    : "https://i.ibb.co/NnThJNG/earth-blue.png"
                }
              >
                {audience === "circle"
                  ? "Only your Twitter Circle can reply"
                  : whoCanReplyText}
              </HomePostTextHelper>
            )}
          </div>
        )}
        <div id="home-post-right-bottom">
          <div id="home-post-right-bottom-left">
            {postIconsArray.map((iconUrl, idx) => {
              return (
                <PostIcon
                  key={idx}
                  activeOptionHandler={setActiveOptionClicked}
                  type={iconUrl[0]}
                  url={iconUrl[1]}
                />
              );
            })}
          </div>

          <div id="home-post-right-bottom-middle">
            {/* <CircularProgress className='progress-circle' color={totalCount > 240 ? totalCount >= 280 ? 'error' : 'warning' : 'primary'} variant="determinate" size='30px' value={value} /> */}
            {value >= 250 && (
              <span
                style={{
                  color:
                    value > 240 ? (value >= 280 ? "red" : "orange") : "black",
                  display: value > 250 ? "inline" : "none"
                }}
                id="word-limit"
              >
                {280 - value}
              </span>
            )}
          </div>
          <div id="home-post-right-bottom-right">
            {showAddMoreButton && text.length > 0 && (
              <div className="addMoreTweetContainer" onClick={incrementer}>
                <img
                  src="https://i.ibb.co/XFtv1G1/plus-Icon-blue.png"
                  alt="addMoreTweetIcon"
                />
              </div>
            )}

            <div style={{ marginLeft: "20px" }}>
              {showTweetButton && partOfAThread && (
                <PrimaryButton isNotActive={text === ""} bgColor="1D98F0">
                  Tweet all
                </PrimaryButton>
              )}
              {!partOfAThread && (
                <PrimaryButton isNotActive={text === ""} bgColor="1D98F0">
                  Tweet all
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePost2;