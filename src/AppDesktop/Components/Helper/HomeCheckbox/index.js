import React, { useState } from 'react';
import './styles.css';
import Tippy from '../Tippy';

function HomeCheckbox({audience,audienceHandler}) {
    const [tippyOn, setTippyOn] = useState(false);

    const showTippy = () => {
        setTippyOn(true);
    }

    const closeTippy = () => {
        setTippyOn(false)
    }
    return (
        <>
         <div id='homeCheckBox' style={{width: audience==='circle'?'134.5px':'106.8px',border:audience==='circle'?'1px solid #00BA7C':'1px solid #536471'}} onClick={showTippy}>
            <div style={{color:audience==='circle'?'#00BA7C':'#1D9BF0'}} id='homeCheckBoxText'>
                {audience==='everyone'?'Everyone':'Twitter Circle'}
            </div>
            <div id='homeCheckBoxImg'>
                {audience==='circle'
                ?<img src='https://i.ibb.co/zrcbhNT/down-arrow-green.png' width='16px' height='16px' />
                :<img src='https://i.ibb.co/ggSzc77/down-arrow-blue.png' width='16px' height='16px' />}
            </div>
        </div>
       
        {tippyOn &&  <div onClick={closeTippy}><Tippy audience={audience} audienceHandler={audienceHandler} /></div> }
        </>
       
    )
}

export default HomeCheckbox