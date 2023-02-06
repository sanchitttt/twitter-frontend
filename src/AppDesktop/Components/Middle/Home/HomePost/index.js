import React, { useContext, useEffect, useRef, useState } from 'react';
import '../HomePost/styles.css';
import PrimaryButton from '../../../Helper/PrimaryButton/index';
import PostIcon from '../../../Helper/PostIcon/index'
import HomeCheckbox from '../../../Helper/HomeCheckbox/index';
import HomePostTextHelper from '../../../Helper/HomePostTextHelper/index';
import ScheduleTweet from '../../../Helper/ScheduleTweet/index';
import UnsentTweets from '../../../Helper/UnsentTweets/index';
import TippyAudience from '../../../Helper/TippyAudience/index';
import HomePoll from '../../../Helper/HomePoll/index';
import { CircularProgress, LinearProgress, Modal, TextField } from '@mui/material';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import TweetsThread from '../TweetThread';
import { ImagePreview } from '../Helper/ImageSection';
import axios from 'axios';
import { BACKEND_URL } from '../../../../../config/config';
import AccountDetailsContext from '../../../../Contexts/AccountDetailsContext';





const postIconsArray = [
    ['file', 'https://i.ibb.co/Z83rNRs/gallery-1.png'],
    // ['', 'https://i.ibb.co/BTGcgVR/gif-1.png'],
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

const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function HomePost({ replyObj, idd, prevReplyCountState, setReplyCountState, accountHandle, forTimeline, setShowReplyModal, forReply, placeholder }) {
    const [text, setText] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [hasChanged, setHasChanged] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);
    const [value, setValue] = useState(0);
    const [textAreaCols, setTextAreaCols] = useState(46);
    const [rowThreshold, setRowThreshold] = useState(46);
    const [audience, setAudience] = useState('everyone');
    const [activeOptionClicked, setActiveOptionClicked] = useState(null);
    const [isAScheduledTweet, setIsAScheduledTweet] = useState({ bool: false, text: '', month: null, year: null, date: null, hour: null, minute: null, amPm: null });
    const [whoCanReplyText, setWhoCanReplyText] = useState("Everyone");
    const [showWhoCanReplyTippy, setShowWhoCanReplyTippy] = useState(false);
    const [showTweetThread, setShowTweetThread] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [progress, setProgress] = useState(0);
    const [pollDate, setPollDate] = useState({ changed: false, hours: null, minutes: null, days: null });
    const [pollOptions, setPollOptions] = useState({});


    const AccountDetails = useContext(AccountDetailsContext);

    const handleFiles = (files) => {
        setImageList(files.base64);
    };



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


    const tweetHandler = async () => {
        let tweetEnabled = text.length > 0;
        let id;
        const fetch = async () => {
            try {
                let now;
                let scheduledDate;
                let pollOptionsResult = [];
                if (isAScheduledTweet.bool) {
                    const { amPm, date, hour, minute, month, year } = isAScheduledTweet;
                    let monthIndex;
                    for (let i = 0; i < monthsArr.length; i++) if (monthsArr[i] === month) {
                        monthIndex = i;
                        break;
                    }
                    scheduledDate = new Date(year, monthIndex, date, amPm === "AM" ? hour : hour + 12, minute);
                }

                if (pollDate.changed) {
                    now = new Date();
                    if (pollDate.hours) now.setHours(now.getHours() + pollDate.hours);
                    if (pollDate.days) now.setDate(now.getDate() + pollDate.days);
                    if (pollDate.minutes) now.setMinutes(now.getMinutes() + pollDate.minutes);
                    let arr = Object.values(pollOptions);
                    let arr2 = Object.values(arr[0]);
                    for (let i = 0; i < arr[1] - 1; i++) {
                        pollOptionsResult.push([arr2[i], 0])
                    }
                }

                let obj = {
                    tweetText: text,
                    poll: { expiresAt: now, options: pollOptionsResult },
                    scheduledDate: scheduledDate ? scheduledDate : null,
                    audience: audience,
                    whoCanReply: whoCanReplyText,
                    attachments: imageList
                }

                const result = await axios.post(`${BACKEND_URL}/tweet/new/tweet`, obj, { withCredentials: true });
                if (result) {
                    id = setTimeout(() => {
                        setProgress(100);
                        setTimeout(() => {
                            setProgress(0);
                            setText('');
                            setIsAScheduledTweet({ changed: false, hours: null, minutes: null, days: null })
                            setImageList([]);
                            setWhoCanReplyText('Everyone');
                            setAudience('everyone');
                            setActiveOptionClicked(null);
                        }, 500)
                    }, 2000);
                }
            } catch (error) {
                setProgress(0);
            }
        }
        const fetch2 = async () => {
            try {
                let now;
                let scheduledDate;
                let pollOptionsResult = [];
                if (isAScheduledTweet.bool) {
                    const { amPm, date, hour, minute, month, year } = isAScheduledTweet;
                    let monthIndex;
                    for (let i = 0; i < monthsArr.length; i++) if (monthsArr[i] === month) {
                        monthIndex = i;
                        break;
                    }
                    scheduledDate = new Date(year, monthIndex, date, amPm === "AM" ? hour : hour + 12, minute);
                }

                if (pollDate.changed) {
                    now = new Date();
                    if (pollDate.hours) now.setHours(now.getHours() + pollDate.hours);
                    if (pollDate.days) now.setDate(now.getDate() + pollDate.days);
                    if (pollDate.minutes) now.setMinutes(now.getMinutes() + pollDate.minutes);
                    let arr = Object.values(pollOptions);
                    let arr2 = Object.values(arr[0]);
                    for (let i = 0; i < arr[1] - 1; i++) {
                        pollOptionsResult.push([arr2[i], 0])
                    }
                }

                let obj = {
                    tweetText: text,
                    poll: { expiresAt: now, options: pollOptionsResult },
                    scheduledDate: scheduledDate ? scheduledDate : null,
                    audience: audience,
                    whoCanReply: whoCanReplyText,
                    attachments: imageList,
                    createdAt: new Date(),
                    ...replyObj
                }

                const result = await axios.post(`${BACKEND_URL}/post/replies/addReply`,
                    { payload: obj, accountHandle: accountHandle, id: idd },
                    { withCredentials: true });
                console.log('result', result);
                setProgress(0);
                setText('');
                setIsAScheduledTweet({ changed: false, hours: null, minutes: null, days: null })
                setImageList([]);
                setWhoCanReplyText('Everyone');
                setAudience('everyone');
                setActiveOptionClicked(null);
                if (result) {
                    setProgress(0);
                    setShowReplyModal(false);
                    setText('');
                    setIsAScheduledTweet({ changed: false, hours: null, minutes: null, days: null })
                    setImageList([]);
                    setWhoCanReplyText('Everyone');
                    setAudience('everyone');
                    setActiveOptionClicked(null);
                }
            }
            catch (error) {
            }
        }
        if (tweetEnabled) {
            if (forReply) {
                fetch2();
                console.log(setReplyCountState, "000000000");
                console.log(prevReplyCountState, "111111111111");
                setReplyCountState(prevReplyCountState => prevReplyCountState + 1)
            }
            else {
                fetch();
            }
            return () => {
                clearTimeout(id);
            }
        }
    }

    const focusHandler = () => {
        if (!hasClicked) {
            setHasClicked(true);
        }
    }

    const keyDownHandler = (e) => {
        if (e.keyCode === 13) {
            setTotalCount(count => count + rowThreshold);
        }

        else if (e.keyCode === 8 && e.target.value.charCodeAt(e.target.value.length - 1) === 10) {
            setTotalCount(count => count - rowThreshold);
        }
        else if (e.keyCode === 8) {
            setTotalCount(count => count - 1);
        }
        else {
            setTotalCount(count => count + 1);
        }
    }

    const textHandler = (e) => {
        if (e.target.value.length <= 280) setText(e.target.value);
        if (e.target.value.length >= 280) setValue(100);
        else setValue(Math.ceil((e.target.value.length / 280) * 100));
        let rows = Math.ceil(totalCount / rowThreshold);
        document.getElementById('home-post-input').rows = rows;
    }

    const emojiClickHandler = (e) => {
        setText(text => text + e.native);
    }

    useEffect(() => {
        document.addEventListener('click', (e) => {
            let emojiDiv = document.getElementById('emoji-picker-normal');
            let emojiImg = document.getElementById('home-emoji-image');
            let unsentTweetsContainer = document.getElementById('unsent-tweets-master-container');
            let scheduleTweetTextDiv = document.getElementById('schedule-footer-button-container');
            let textHelperDiv = document.getElementById("homePostTextHelper");
            let tippy = document.getElementById('post-tippy');

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

            else if (tippy) {
                if (textHelperDiv.contains(e.target) || tippy.contains(e.target)) {
                    // Do nothing
                } else {
                    setShowWhoCanReplyTippy(false);
                }
            }
        });
        return () => {
            document.removeEventListener('click', () => {
            });
        }
    }, []);

    return (
        <div style={{ marginTop: '15px' }}>
            {progress > 0 && <div>
                <LinearProgress
                    aria-describedby="progress-bar"
                    variant="determinate"
                    value={progress}
                />
            </div>}


            <div id='home-post-container'
                style={{
                    borderRadius: forTimeline ? '15px' : '0px'
                }}
            >
                {/* <div style={{width:'100%'}}>
                
                </div> */}

                <div id='home-post-left'>
                    <div id='home-post-left-top'>
                        <img
                            alt='someImg'
                            src={AccountDetails && AccountDetails.profileSrc ? AccountDetails.profileSrc : 'https://i.ibb.co/p4R5q3P/1655230 024525.jpg'}
                            className='rounded-image'
                            width='48px'
                            height='48px'
                            style={{ zIndex: forReply && '2000' }}
                        />
                    </div>
                    <div>

                    </div>

                </div>

                <div id='home-post-right'>
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

                    {hasClicked && !forReply && <HomeCheckbox audience={audience} audienceHandler={setAudience} />}
                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <TextField
                            ref={myRef}
                            id='home-post-input'
                            fullWidth
                            value={text}
                            onKeyDown={keyDownHandler}
                            onChange={textHandler}
                            onFocus={focusHandler}
                            multiline={true}
                            placeholder={activeOptionClicked === 'poll' ? "Ask a question" : placeholder ? placeholder : forReply ? "Tweet your reply" : "What's happening?"}
                            sx={{

                                border: 'none',
                                fontFamily: 'Poppins',
                                textAlign: 'center',
                                color: 'black'
                            }}
                        />
                    </div>

                    {/* <textarea style={{ color: 'black' }} placeholder={activeOptionClicked === 'poll' ? "Ask a question" : "What's happening?"} ref={myRef} id='home-post-input' rows='1' cols={textAreaCols} onFocus={focusHandler} value={text} onKeyDown={keyDownHandler} onChange={textHandler} /> */}
                    <div style={{ maxWidth: '500px', maxHeight: '500px' }}><ImagePreview imageList={imageList} /></div>
                    {activeOptionClicked === 'poll' && <HomePoll pollOptions={pollOptions} pollDate={pollDate} setPollOptions={setPollOptions} setPollDate={setPollDate} activeOptionHandler={setActiveOptionClicked} />}
                    {activeOptionClicked === 'emoji' && <div id='emoji-picker-normal' style={{ width: '356px' }}>
                        <Picker
                            data={data}
                            onEmojiSelect={emojiClickHandler}
                        />
                    </div>}
                    {activeOptionClicked === 'schedule' && <Modal sx={style} onClose={() => setActiveOptionClicked(null)} open={activeOptionClicked === "schedule"}>
                        <ScheduleTweet scheduleHandler={setIsAScheduledTweet} scheduleObject={isAScheduledTweet} activeOptionHandler={setActiveOptionClicked} /></Modal>}
                    {activeOptionClicked === 'unsent-tweets' && <Modal sx={style} open={activeOptionClicked === 'unsent-tweets'}><div id='unsent-tweets-master-container'><UnsentTweets activeOptionHandler={setActiveOptionClicked} /></div></Modal>}
                    {showWhoCanReplyTippy && (
                        <TippyAudience
                            whoCanReply={whoCanReplyText}
                            whoCanReplyHandler={setWhoCanReplyText}
                            showTippy={setShowWhoCanReplyTippy}
                        />
                    )}
                    {hasClicked && !forReply &&
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
                    <div id='home-post-right-bottom'>
                        <div id='home-post-right-bottom-left'>
                            {postIconsArray.map((iconUrl, idx) => {
                                return <PostIcon handleFiles={handleFiles} key={idx} activeOptionHandler={setActiveOptionClicked} type={iconUrl[0]} url={iconUrl[1]} />
                            })}
                        </div>

                        <div id='home-post-right-bottom-middle'>
                            <CircularProgress className='progress-circle' color={text.length > 240 ? text.length >= 280 ? 'error' : 'warning' : 'primary'} variant="determinate" size='20px' value={value} />
                            {text.length >= 250 && <span style={{ color: text.length > 240 ? text.length >= 280 ? 'red' : 'orange' : 'black', display: text.length > 250 ? 'inline' : 'none' }} id='word-limit'>{280 - text.length}</span>}
                        </div>
                        <div id='home-post-right-bottom-right'>
                            {text.length > 0 && !forReply &&
                                <div
                                    className='addMoreTweetContainer'
                                    onClick={() => setShowTweetThread(true)}
                                >
                                    <img
                                        src='https://i.ibb.co/XFtv1G1/plus-Icon-blue.png' alt='addMoreTweetIcon' />
                                </div>}
                            <div style={{ marginLeft: '20px' }} onClick={
                                () => {
                                    setProgress(25);
                                    tweetHandler();
                                }
                            }>
                                <PrimaryButton isNotActive={text === ''} bgColor='1D98F0'>
                                    {forReply ? "Reply" : "Tweet"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal open={showTweetThread}><div className='tweetsThreadMasterContainer'><TweetsThread setShowTweetThread={setShowTweetThread} /></div></Modal>
        </div>
    )
}

export default HomePost