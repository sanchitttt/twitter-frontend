import React, { useState } from "react";
import './styles.css';

const UnsentTweetButton = ({ children, isActive }) => {
  return (
    <button
      className={
        isActive
          ? "unsent-tweet-button-active unsent-tweet-button"
          : "unsent-tweet-button-inactive unsent-tweet-button"
      }
    >
      {children}
    </button>
  );
};

const UnsentTweets = ({activeOptionHandler}) => {
  const [activeOption, setActiveOption] = useState("scheduled");
  return (
    <>
      <div
        style={{
          width: document.documentElement.clientWidth < 700 ? "100%" : "600px",
          height: document.documentElement.clientWidth < 700 ? "100%" : "600px",
          backgroundColor: "white",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column"
          // justifyContent: "space-between"
        }}
        id="unsent-and-scheduled-tweets"
      >
        <div className="row-flexbox ml-5">
          <div className="row-flexbox ai-center mt-10 ml-5">
            <img
              onClick={() => activeOptionHandler('schedule')}
              src="https://i.ibb.co/VHx6QFt/left-arrow.png"
              className="widthHeight25 unsent-tweet-button-back"
              alt="go-back-icon"
            />
            <div className="black-text large-text bold-text ml-25">
              Unsent tweets
            </div>
          </div>
          <div></div>
        </div>

        <div
          className="row-flexbox mt-10"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <div style={{ width: "50%" }}>
            <div onClick={() => setActiveOption("drafts")}>
              <UnsentTweetButton
                activeOptionHandler={setActiveOption}
                isActive={activeOption === "drafts"}
              >
                Drafts
              </UnsentTweetButton>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div onClick={() => setActiveOption("scheduled")}>
              <UnsentTweetButton isActive={activeOption === "scheduled"}>
                Scheduled
              </UnsentTweetButton>
            </div>
          </div>
        </div>
        <div
          className="row-flexbox mt-25 t-al-c "
          style={{ justifyContent: "center" }}
        >
          <div style={{ width: "50%" }}>
            <img
              style={{ width: "100%" }}
              src="https://i.ibb.co/18j8zMc/scheduled-img.png"
              alt="scheduled-img-icon"
            />
            <h2 className="bold-text">Hold that thought</h2>
            <div>
              Not ready to send a Tweet just yet? Save it to your drafts or
              schedule it for later.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default UnsentTweets;