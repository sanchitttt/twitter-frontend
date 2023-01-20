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
import { Dialog, LinearProgress, Modal } from '@mui/material';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import axios from 'axios';
import { BACKEND_URL } from '../../../../../config/config';
import { ImagePreview } from '../Helper/ImageSection';

const postIconsArray = [
  ['file', 'https://i.ibb.co/Z83rNRs/gallery-1.png'],
  ['', 'https://i.ibb.co/BTGcgVR/gif-1.png'],
  ['poll', 'https://i.ibb.co/9GrphjN/polling-1.png'],
  ['emoji3', 'https://i.ibb.co/RQPpgRp/happy-1.png'],
  ['schedule', 'https://i.ibb.co/Y2wK2RK/event-1.png'],
  ['location', 'https://i.ibb.co/vhzdpVZ/location-1.png']
]

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const verifyAllPollOptionsExists = (arr, count) => {
  for (let i = 0; i < count - 1; i++) {
    if (arr[i] === '') {
      return false;
    }
  }
  return true;
}

function HomePost2({
  decrementer,
  forTimeline,
  partOfAThread,
  isTheLastTweet,
  incrementer,
  firstItemInThread,
  showTweetButton,
  showAddMoreButton,
  idx,
  setTweetAllEnabled,
  tweetAllEnabled,
  tweets,
  tweetsThreadAudience,
  setTweetsThreadAudience,
  tweetsThreadWhoCanReply,
  setTweetsThreadWhoCanReply,
  setShowTweetThread,
  setProgress
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
  const [pollDate, setPollDate] = useState({ changed: false, hours: null, minutes: null, days: null });
  const [pollOptions, setPollOptions] = useState({});
  const [imageList, setImageList] = useState([]);


  const myRef = useRef(null);
  const emojiPickerId = `emoji-picker${idx}`
  const homeEmojiThreadImageId = `home-emoji-thread-image${idx}`
  const homePostTextHelperId = `homePostTextHelper${idx}`;
  const postTippyId = `post-tippy${idx}`;
  const unsentTweetsMasterContainerId = `unsentTweetsMasterContainer${idx}`
  const scheduleFooterButtonContainerId = `scheduleFooterButtonContainer${idx};`
  const homePostInputId = `homePostInput${idx}`;

  const handleFiles = (files) => {
    tweets[idx].attachments = files.base64;
    setImageList(files.base64);
  };

  useEffect(() => {
    if (pollDate.changed) {

      const result = verifyAllPollOptionsExists(Object.values(pollOptions.values), pollOptions.count);
      if (result) {
        if (!tweetAllEnabled && text.length) setTweetAllEnabled(true)
        tweets[idx].poll.expiresAt = pollDate;
        tweets[idx].poll.options = pollOptions;
      }
      else {
        if (tweetAllEnabled) setTweetAllEnabled(false);
        tweets[idx].poll.expiresAt = null;
        tweets[idx].poll.options = null;
      }

    }
  }, [pollOptions, pollDate])

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
    tweets[idx].tweetText = e.target.value;
    setText(e.target.value);
    const input1 = document.getElementById('homePostInput1').value;
    if (e.target.value.length === 0) {
      if (tweetAllEnabled) setTweetAllEnabled(false);
    }
    else if (!tweetAllEnabled && input1.length) {
      setTweetAllEnabled(true);
    }
    setValue(Math.ceil((myRef.current.value.length / 280) * 100));
    let rows = Math.ceil(totalCount / rowThreshold);
    document.getElementById(homePostInputId).rows = rows;
  };

  const emojiClickHandler = (e) => {
    setText((text) => text + e.native);
    tweets[idx].tweetText = tweets[idx].tweetText + e.native;
  };

  const tweetAllHandler = async () => {
    let id;
    const fetch = async () => {
      try {
        const result = await axios.post(`${BACKEND_URL}/tweet/new/thread`, tweets, { withCredentials: true });
        if (result) {
          id = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
              setShowTweetThread(false);
            }, 400);
          }, 2000);
        }
      } catch (error) {
        setProgress(0);
      }
    }
    if (tweetAllEnabled) {
      fetch();
      return () => {
        clearTimeout(id);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      let emojiDiv = document.getElementById(emojiPickerId);
      let emojiImg = document.getElementById(homeEmojiThreadImageId);
      let unsentTweetsContainer = document.getElementById(
        unsentTweetsMasterContainerId
      );
      let scheduleTweetTextDiv = document.getElementById(
        scheduleFooterButtonContainerId
      );
      let textHelperDiv = document.getElementById(homePostTextHelperId);
      let tippy = document.getElementById(postTippyId);

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

        {hasClicked && firstItemInThread && (
          <HomeCheckbox audience={audience} setTweetsThreadAudience={setTweetsThreadAudience} audienceHandler={setAudience} />
        )}
        {isTheLastTweet && hasClicked && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          id={homePostInputId}
          rows="1"
          cols={textAreaCols}
          onFocus={focusHandler}
          value={text}
          onKeyDown={keyDownHandler}
          onChange={textHandler}
        />
        <div style={{ maxWidth: '500px', maxHeight: '500px' }}><ImagePreview imageList={imageList} /></div>
        {activeOptionClicked === "poll" && (
          <HomePoll pollOptions={pollOptions} pollDate={pollDate} setPollOptions={setPollOptions} setPollDate={setPollDate} activeOptionHandler={setActiveOptionClicked} />
        )}
        {activeOptionClicked === "emoji3" && (
          <div id={emojiPickerId} style={{ width: '356px' }}>
            <Picker
              data={data}
              onEmojiSelect={emojiClickHandler}
            />
          </div>
        )}
        {activeOptionClicked === "schedule" && (
          <Modal
            sx={style}
            onClose={() => setActiveOptionClicked(null)}
            open={activeOptionClicked === "schedule"}
          >
            <ScheduleTweet
              tweetThread={true}
              id={scheduleFooterButtonContainerId}
              scheduleHandler={setIsAScheduledTweet}
              scheduleObject={isAScheduledTweet}
              activeOptionHandler={setActiveOptionClicked}
            />
          </Modal>
        )}
        {activeOptionClicked === "unsent-tweets" && (
          <Modal sx={style} open={activeOptionClicked === "unsent-tweets"}>
            <div id={unsentTweetsMasterContainerId}>
              <UnsentTweets activeOptionHandler={setActiveOptionClicked} />
            </div>
          </Modal>
        )}
        {showWhoCanReplyTippy && (
          <TippyAudience
            setTweetsThreadWhoCanReply={setTweetsThreadWhoCanReply}
            tweetThread={true}
            id={postTippyId}
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

                tweetThread={true}
                id={homePostTextHelperId}
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
                  homeEmojiThreadImageId={homeEmojiThreadImageId}
                  handleFiles={handleFiles}
                  partOfAThread={partOfAThread}
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
                <div onClick={() => {
                  setProgress(25);
                  tweetAllHandler();

                }}  >
                  <PrimaryButton isNotActive={text === "" || tweetAllEnabled === false} bgColor="1D98F0">
                    Tweet all
                  </PrimaryButton>
                </div>

              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePost2;