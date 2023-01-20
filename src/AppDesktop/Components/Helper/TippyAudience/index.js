import React from "react";
import "./styles.css";

export default function TippyAudience({ setTweetsThreadWhoCanReply,whoCanReply, tweetThread, id, whoCanReplyHandler, showTippy }) {
  const everyoneHandler = () => {
    if(setTweetsThreadWhoCanReply){
      setTweetsThreadWhoCanReply('Everyone')
      whoCanReplyHandler("Everyone");
      showTippy(false);
    }
    else{
      whoCanReplyHandler("Everyone");
      showTippy(false);
    }
    
  };

  const peopleFollowHandler = () => {
    if(setTweetsThreadWhoCanReply){
      setTweetsThreadWhoCanReply('People you follow')
      whoCanReplyHandler("People you follow");
      showTippy(false);
    }
    else{
      whoCanReplyHandler("People you follow");
      showTippy(false);
    }
   
  };

  const onlyYouMentionHandler = () => {
    if(setTweetsThreadWhoCanReply){
      setTweetsThreadWhoCanReply('Only people you mention')
      whoCanReplyHandler("Only people you mention");
      showTippy(false);
    }
    else{
      whoCanReplyHandler("Only people you mention");
      showTippy(false);
    }
   

  };

  return (
    <div className="post-tippy" id={tweetThread ? id : 'post-tippy'}>
      <div className="post-tippy-text">Who can reply</div>
      <div className="post-tippy-light-text">
        Choose who can reply to this Tweet. <br />
        Anyone mentioned can always reply.
      </div>
      <div className="post-tippyWidget-container">
        <div className="post-tippyWidget" onClick={everyoneHandler}>
          <div className="post-tippyWidget-left">
            <div className="post-tippyWidget-img">
              <img
                src="https://i.ibb.co/SP79Phq/earth-blue.png"
                width="40px"
                height="40px"
                alt="globe"
              />
            </div>
            <div className="post-tippyWidget-text">Everyone</div>
          </div>
          <div className="post-tippyWidget-right">
            {whoCanReply === "Everyone" &&
              <img
                src="https://i.ibb.co/Vqw2ggw/checkmark-blue.png"
                width="20px"
                height="18.75px"
                alt="checkmarkIcon"
              />
            }
          </div>
        </div>

        <div className="post-tippyWidget" onClick={peopleFollowHandler}>
          <div className="post-tippyWidget-left">
            <div className="post-tippyWidget-img">
              <img
                src="https://i.ibb.co/RcGKCFV/user-blue-checked.png"
                width="40px"
                height="40px"
                alt="people"
              />
            </div>
            <div className="post-tippyWidget-text">People you follow</div>
          </div>
          <div className="post-tippyWidget-right">
            {whoCanReply === "People you follow" &&
              <img
                src="https://i.ibb.co/Vqw2ggw/checkmark-blue.png"
                width="20px"
                height="18.75px"
                alt="checkmarkIcon"
              />
            }
          </div>
        </div>
        <div className="post-tippyWidget" onClick={onlyYouMentionHandler}>
          <div className="post-tippyWidget-left">
            <div className="post-tippyWidget-img">
              <img
                src="https://i.ibb.co/4SvWvPK/arroba.png"
                width="40px"
                height="40px"
                alt="people"
              />
            </div>
            <div className="post-tippyWidget-text">Only people you mention</div>
          </div>
          <div className="post-tippyWidget-right">
            {whoCanReply === "Only people you mention" &&
              <img
                src="https://i.ibb.co/Vqw2ggw/checkmark-blue.png"
                width="20px"
                height="18.75px"
                alt="checkmarkIcon"
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
