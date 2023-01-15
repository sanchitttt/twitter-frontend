import React from 'react';
import SearchBar from '../../Helper/SearchBar';
import TrendingTweets from './TrendingTweets'
import NotLoggedInM from '../../Bottom/NotLoggedIn';
import './styles.css';

function NotLoggedIn() {
    return (
        <div id='notLoggedInPageM'>
            <div id='notLoggedInPageM-topRow'>
                <div class='ml8'>
                    <img
                        src='https://i.ibb.co/SQZP6HT/twitter-icon.png'
                        width='27px'
                        height='23px' />
                </div>
                <SearchBar />
                <div class='mr8'>
                    <img src='https://i.ibb.co/XY8jC2r/dots.png'
                        width='20px'
                        height='20px' />
                </div>
            </div>
            <TrendingTweets />
            <NotLoggedInM />
        </div>
    )
}

export default NotLoggedIn;