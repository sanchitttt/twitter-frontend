import React, { useContext } from 'react';
import ColorContext from '../../../Contexts/ColorContext';
import './styles.css';

function TweetButton() {
    const { colorValue } = useContext(ColorContext);

    return (
        <div id='navbar-tweet-btn'>
            <div style={{ background: colorValue }} id='navBarTweetButtonBig'>
                Tweet
            </div>

            <div style={{ background: colorValue }} id='navBarTweetButtonSmall'>
                <img src='https://i.ibb.co/jgBCDD7/tweet-white.png' width='24px' height='24px' alt='tweet-icon' />
            </div>
        </div>

    )
}

export default TweetButton