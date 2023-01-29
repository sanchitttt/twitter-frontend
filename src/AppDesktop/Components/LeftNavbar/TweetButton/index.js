import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import ColorContext from '../../../Contexts/ColorContext';
import TweetsThread from '../../Middle/Home/TweetThread';
import './styles.css';

function TweetButton() {
    const { colorValue } = useContext(ColorContext);
    const [showTweetThread, setShowTweetThread] = useState(false);

    return (
        <>
            <div id='navbar-tweet-btn' onClick={() => setShowTweetThread(true)}>
                <div style={{ background: colorValue }} id='navBarTweetButtonBig'>
                    Tweet
                </div>

                <div style={{ background: colorValue }} id='navBarTweetButtonSmall'>
                    <img src='https://i.ibb.co/jgBCDD7/tweet-white.png' width='24px' height='24px' alt='tweet-icon' />
                </div>
            </div>
            <Modal open={showTweetThread}>
                <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <TweetsThread setShowTweetThread={setShowTweetThread} />
                </div>
            </Modal>
        </>
    )
}

export default TweetButton