import React, { useEffect } from 'react';
import SearchBar from '../../Components/Helper/SearchBar';
import TrendingTweets from '../../Components/Top/TrendingTweets';
import NotLoggedInM from '../../Components/Bottom/NotLoggedIn';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NotLoggedIn() {
    const navigate = useNavigate();
    useEffect(() => {
        const makeReq = async () => {
            try {
                const result = await axios.get('http://localhost:8082/auth/login/success', { withCredentials: true });
                if (result.status === 200) {
                    navigate('/home');
                }
            } catch (error) {
                // Do nothing
            }
        }
        makeReq();
    }, []);
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