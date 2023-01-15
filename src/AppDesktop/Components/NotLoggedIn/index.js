import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundContext from '../../Contexts/BackgroundContext'
import ColorContext from '../../Contexts/ColorContext';
import NavButton from '../LeftNavbar/NavButton';
import Explore from '../Middle/Explore';
import Footer from './Footer';
import './styles.css';

const navBar = [
    ['Explore', { blackNonFilled: 'https://i.ibb.co/YkDM6Lz/hashtag-black-non-Filled.png', blackFilled: 'https://i.ibb.co/T0CNL0J/hashtag-1.png', white: 'https://i.ibb.co/D80sjW9/hashtag-white-non-Filled.png', whiteFilled: 'https://i.ibb.co/NTY11Th/hashtag-white-filled.png' }, 'explore'],
]
function NotLoggedIn() {
    const { backgroundValue, backgroundHandler } = useContext(BackgroundContext);
    const { colorValue, colorHandler } = useContext(ColorContext);
    const [activeUrl, setActiveUrl] = useState('Explore');
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
        <>
            <div className='notLoggedIn-container'>
                <div>
                    <nav className='navbar-container' style={{ marginRight: '20px' }}>
                        <div className='twitter-bird-container'>
                            <div className='twitter-bird-left' onClick={() => {
                                // navigate('/home')
                            }}>
                                <img className='twitter-bird' src='https://i.ibb.co/SQZP6HT/twitter-icon.png' width='28.3px' height='23px' />
                            </div>
                            <div className='twitter-bird-right'></div>
                        </div>
                        {navBar.map((navItem, idx) => {
                            const text = navItem[0];
                            const url = activeUrl === text ? navItem[1].blackFilled : navItem[1].blackNonFilled;
                            const color = backgroundValue === 'white' ? 'black' : 'white';
                            return (
                                <NavButton navigateUrl={navItem[2]} setActiveUrl={setActiveUrl} key={idx} url={url} color={color}>{text}</NavButton>
                            )
                        })}
                    </nav>
                </div>
                <div><Explore /></div>

            </div>
            <Footer />
        </>

    )
}

export default NotLoggedIn;