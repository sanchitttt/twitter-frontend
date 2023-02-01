import React, { useState } from 'react';
import './styles.css';

function Tippy({audience,audienceHandler,setTweetsThreadAudience}) {
  
  const everyoneHandler = () => {
    if(setTweetsThreadAudience){
      setTweetsThreadAudience('everyone');
      audienceHandler('everyone');
    }
    else{
      audienceHandler('everyone');
    }


  }

  const circleHandler = () => {
    if(setTweetsThreadAudience){
      setTweetsThreadAudience('circle');
      audienceHandler('circle');
    }
    else{
      audienceHandler('circle');
    }
  }

  return (
    <div className="tippy">
      <div className="tippy-text">Choose audience</div>
      <div className="tippyWidget-container">
        <div className="tippyWidget" onClick={everyoneHandler}>
          <div className="tippyWidget-left">
            {" "}
            <div className="tippyWidget-img">
              <img
                src="https://i.ibb.co/SP79Phq/earth-blue.png"
                width="40px"
                height="40px"
                alt="globe"
              />
            </div>
            <div className="tippyWidget-text">Everyone</div>
          </div>
          <div className="tippyWidget-right">
            {audience === 'everyone' && <img src='https://i.ibb.co/Vqw2ggw/checkmark-blue.png' width='20px' height='18.75px'/>}
          </div>
        </div>

        <div className="tippyWidget" onClick={circleHandler}>
          <div className="tippyWidget-left">
            <div className="tippyWidget-img">
              <img
                src="https://i.ibb.co/1K0sCP0/people.png"
                width="40px"
                height="40px"
                alt="people"
              />
            </div>
            <div className="tippyWidget-text">Twitter Circle</div>
          </div>
          <div className="tippyWidget-right">
            {audience === 'circle' && <img src='https://i.ibb.co/Vqw2ggw/checkmark-blue.png' width='20px' height='18.75px'/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tippy;