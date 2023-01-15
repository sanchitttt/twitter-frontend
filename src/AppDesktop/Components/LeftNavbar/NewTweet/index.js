import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import PrimaryButton from '../../Helper/PrimaryButton/index';
import PostIcon from '../../Helper/PostIcon/index';
import HomeCheckbox from '../../Helper/HomeCheckbox/index';
import HomePostTextHelper from '../../Helper/HomePostTextHelper/index';
// import CircularProgress from '@mui/material/CircularProgress';
import HomePoll from '../../Helper/HomePoll/index';
import EmojiPicker from 'emoji-picker-react';
import ScheduleTweet from '../../Helper/ScheduleTweet/index';
import { Modal } from '@mui/material';
import UnsentTweets from '../../Helper/UnsentTweets/index';
import TippyAudience from '../../Helper/TippyAudience/index';


const postIconsArray = [
    ['file', 'https://i.ibb.co/Z83rNRs/gallery-1.png'],
    ['', 'https://i.ibb.co/BTGcgVR/gif-1.png'],
    ['poll', 'https://i.ibb.co/9GrphjN/polling-1.png'],
    ['emoji2', 'https://i.ibb.co/RQPpgRp/happy-1.png'],
    ['schedule', 'https://i.ibb.co/Y2wK2RK/event-1.png'],
]
const style = {
    display:'flex',
    justifyContent : 'center',
    alignItems:'center'
}
const NewTweet = React.forwardRef(({closeHandler},ref) => {
    const [text, setText] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [hasChanged, setHasChanged] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const [value, setValue] = useState(0);
    const [textAreaCols, setTextAreaCols] = useState(46);
    const [rowThreshold, setRowThreshold] = useState(40);
    const [audience, setAudience] = useState('everyone');
    const [activeOptionClicked, setActiveOptionClicked] = useState(null);
    const [isAScheduledTweet, setIsAScheduledTweet] = useState({ bool: false, text: '', month: null, year: null, date: null, hour: null, minute: null, amPm: null });
    const [whoCanReplyText, setWhoCanReplyText] = useState("Everyone");
    const [showWhoCanReplyTippy, setShowWhoCanReplyTippy] = useState(false);

    const myRef = useRef(null);


    useEffect(() => {
        const currWidth = document.documentElement.clientWidth;
        if (currWidth <= 700) {
            let diff = 700 - currWidth;
            let colsToBeRemoved = Math.floor(diff / 13);
            let finalCols = textAreaCols - colsToBeRemoved;
            let rowsThresholdAfterReduction = rowThreshold - colsToBeRemoved
            setTextAreaCols(finalCols);
            setRowThreshold(rowsThresholdAfterReduction);
        }
    }, []);


    const focusHandler = () => {
        if (!hasClicked) {
            setHasClicked(true);
        }
    }

    const textHandler = (e) => {
        setText(e.target.value);
        if (!hasChanged) {
            document.getElementById('home-post-input2').style.color = 'black';
            setHasChanged(true);
        }
        setTotalCount(myRef.current.value.length);
        if (myRef.current.value.length >= 280) {
            // Do nothing
        }
        else {
            setValue(Math.ceil((myRef.current.value.length / 280) * 100))
        }
        let currentWordLength = myRef.current.value.length;
        let rows = Math.ceil(currentWordLength / rowThreshold);
        document.getElementById('home-post-input2').rows = rows;
    }

    const emojiClickHandler = (e) => {
        setText(text => text + `${e.emoji}`);
    }

    useEffect(() => {
        document.addEventListener('click', (e) => {
            let emojiDiv = document.getElementById('emoji-picker2');
            let emojiImg = document.getElementById('home-emoji-image2');
            let unsentTweetsContainer = document.getElementById('unsent-tweets-master-container2');
            let scheduleTweetTextDiv = document.getElementById('schedule-footer-button-container2');

            if (emojiDiv) {
                if (emojiDiv.contains(e.target) || emojiImg.contains(e.target)) {
                    //Do nothing
                }
                else {
                    setActiveOptionClicked(null);
                }
            }
            else if (unsentTweetsContainer) {
                if (unsentTweetsContainer.contains(e.target) || scheduleTweetTextDiv.contains(e.target)) {
                    //Do nothing
                }
                else {
                    setActiveOptionClicked(null);
                }
            }
        });
        return () => {
            document.removeEventListener('click', () => {
            });
        }
    }, []);

    return (
        <div ref={ref}>
        <div id='home-post-modal-container'
            style={{ background: 'white', padding: '20px', borderRadius: '15px' }}
        >
            <div id='home-post-modal-top'>
                <div>
                    <img src='https://thumbs4.imagebam.com/33/54/cd/MEHU3AO_t.png'
                        alt='close-icon'
                        width='20px'
                        height='20px'
                        id='home-schedule-close-icon-img2'
                        onClick={() => {
                            closeHandler();
                        }}
                    />
                </div>

            </div>
            {/* <div id='home-post-modal-bottom'> */}
            <div id='home-post-container2'
                style={{
                    borderRadius: '15px'
                }}
            >
                <div id='home-post-left2'> <img src='https://i.ibb.co/p4R5q3P/1655230024525.jpg' className='rounded-image' width='40px' height='40px' /></div>
                <div id='home-post-right2'>
                    {isAScheduledTweet.bool &&
                        <div onClick={() => setActiveOptionClicked('schedule')} className='home-schedule-text-hover' style={{ display: 'flex', color: '#536471', fontSize: '13px', marginBottom: '15px' }}>
                            <img
                                src="https://thumbs4.imagebam.com/98/f9/99/MEHU2MK_t.png"
                                width="18px"
                                height="18px"
                                alt="schedule-date-picker-img"
                                style={{ marginRight: "5px" }}
                            />
                            {isAScheduledTweet.text}
                        </div>
                    }
                    {hasClicked && <HomeCheckbox audience={audience} audienceHandler={setAudience} />}
                    <textarea style={{ color: 'black' }} placeholder={activeOptionClicked === 'poll' ? "Ask a question" : "What's happening?"} ref={myRef} id='home-post-input2' rows='1' cols={textAreaCols} onFocus={focusHandler} value={text} onChange={textHandler} />
                    {activeOptionClicked === 'poll' && <HomePoll activeOptionHandler={setActiveOptionClicked} />}
                    {activeOptionClicked === 'emoji2' && <div id='emoji-picker2'><EmojiPicker onEmojiClick={emojiClickHandler} /></div>}
                    {activeOptionClicked === 'schedule' && <Modal sx={style} open={activeOptionClicked === 'schedule'}><ScheduleTweet scheduleHandler={setIsAScheduledTweet} scheduleObject={isAScheduledTweet} activeOptionHandler={setActiveOptionClicked} /></Modal>}
                    {activeOptionClicked === 'unsent-tweets' && <Modal sx={style} open={activeOptionClicked === 'unsent-tweets'}><div id='unsent-tweets-master-container2'><UnsentTweets activeOptionHandler={setActiveOptionClicked} /></div></Modal>}

                    {showWhoCanReplyTippy && (
                        <TippyAudience
                            whoCanReply={whoCanReplyText}
                            whoCanReplyHandler={setWhoCanReplyText}
                            showTippy={setShowWhoCanReplyTippy}
                        />
                    )}
                    {hasClicked &&
                        <div onClick={() => {
                            if (audience !== 'circle') setShowWhoCanReplyTippy(true)
                        }}>
                            <HomePostTextHelper
                                disabled={audience === 'circle'}
                                url={audience === 'circle' ? 'https://i.ibb.co/n7Gsfw7/lock-blue.png' : 'https://i.ibb.co/NnThJNG/earth-blue.png'}>
                                {audience === 'circle' ? 'Only your Twitter Circle can reply' : whoCanReplyText}
                            </HomePostTextHelper>
                        </div>

                    }




                    <div id='home-post-right-bottom2'>
                        <div id='home-post-right-bottom-left2'>
                            {postIconsArray.map((iconUrl, idx) => {
                                return <div style={{ marginRight: '15px' }} key={idx}>
                                    <PostIcon activeOptionHandler={setActiveOptionClicked} type={iconUrl[0]} url={iconUrl[1]} />
                                </div>
                            })}
                        </div>
                        <div id='home-post-right-bottom-middle2'>
                            {/* <CircularProgress className='progress-circle' color={totalCount > 240 ? totalCount >= 280 ? 'error' : 'warning' : 'primary'} variant="determinate" size='30px' value={value} /> */}
                            {totalCount >= 250 && <span style={{ color: totalCount > 240 ? totalCount >= 280 ? 'red' : 'orange' : 'black', display: totalCount > 250 ? 'inline' : 'none' }} id='word-limit2'>{280 - totalCount}</span>}
                        </div>
                        <div id='home-post-right-bottom-right2'><PrimaryButton isNotActive={text === ''} bgColor='1D98F0'>Tweet</PrimaryButton></div>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </div>
        </div>
    )
})


export default NewTweet;