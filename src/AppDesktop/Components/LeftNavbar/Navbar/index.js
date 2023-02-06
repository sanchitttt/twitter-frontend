import React, { useContext, useState } from 'react';
import BackgroundContext from '../../../Contexts/BackgroundContext';
import ColorContext from '../../../Contexts/ColorContext';
import NavButton from '../NavButton/index';
import TweetButton from '../TweetButton/index';
import NewTweet from '../NewTweet/index';
// import Modal from '../../Helper/Modal/index'
import { Modal } from '@mui/material';
import './styles.css';
import { createPortal } from 'react-dom';


const navBar = [
    ['Home', { blackNonFilled: 'https://i.ibb.co/DrhfvL5/home-black-non-Filled.png', blackFilled: 'https://i.ibb.co/h7z1Ng3/home-black-filled.png', white: 'https://i.ibb.co/N9ZmzM0/home-white.png', whiteFilled: 'https://i.ibb.co/F5LSjNb/home-white-filled.png' }, '/home'],
    // ['Explore', { blackNonFilled: 'https://i.ibb.co/YkDM6Lz/hashtag-black-non-Filled.png', blackFilled: 'https://i.ibb.co/T0CNL0J/hashtag-1.png', white: 'https://i.ibb.co/D80sjW9/hashtag-white-non-Filled.png', whiteFilled: 'https://i.ibb.co/NTY11Th/hashtag-white-filled.png' }, '/explore'],
    ['Reels', { blackNonFilled: 'https://cdn-icons-png.flaticon.com/512/5948/5948543.png', blackFilled: 'https://cdn-icons-png.flaticon.com/512/7264/7264012.png' }, '/reels'],
    // ['Notifications', { blackNonFilled: 'https://i.ibb.co/tZwMbRF/bell.png', blackFilled: 'https://i.ibb.co/Ns4qcPK/bell-ring.png', white: '' }, '/notifications'],
    // ['Messages', { blackNonFilled: 'https://i.ibb.co/QrT16Lc/email-unfilled.png', blackFilled: 'https://i.ibb.co/k9mCxBF/email-filled.png', white: '' }, '/messages'],
    ['Bookmarks', { blackNonFilled: 'https://i.ibb.co/F3qqdcX/bookmark-black-non-Filled.png', blackFilled: 'https://i.ibb.co/wrjM6vy/bookmark-black-filled.png', white: '' }, '/bookmarks'],
    // ['Lists', { blackNonFilled: 'https://i.ibb.co/Tgkj8VN/lists-black-non-Filled.png', blackFilled: 'https://i.ibb.co/sQFYVy4/lists-black-filled.png', white: '' }, '/lists',],
    ['Profile', { blackNonFilled: 'https://i.ibb.co/k4zvv8N/user-inactive.png', blackFilled: 'https://i.ibb.co/KF3mN2f/user-active.png', white: '' }, '/profile'],
    ['More', { blackNonFilled: 'https://i.ibb.co/wJPPF41/more-black-non-Filled.png', blackFilled: '', white: '' }, 'notifications']
]


function NavBar() {
    const { backgroundValue, backgroundHandler } = useContext(BackgroundContext);
    const { colorValue, colorHandler } = useContext(ColorContext);
    const [activeUrl, setActiveUrl] = useState('Home');


    return (
        <div>
            <nav className='navbar-container'>
                {navBar.map((navItem, idx) => {
                    const text = navItem[0];
                    const url = activeUrl === text ? navItem[1].blackFilled : navItem[1].blackNonFilled;
                    const color = backgroundValue === 'white' ? 'black' : 'white';
                    return (
                        <NavButton navigateUrl={navItem[2]} setActiveUrl={setActiveUrl} key={idx} url={url} color={color}>{text}</NavButton>
                    )
                })}

                <TweetButton />
            </nav>
        </div>
    )
}

export default NavBar;
