import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../../config/config';
import AccountDetailsContext from '../../../Contexts/AccountDetailsContext';
import DarkText from '../Helper/DarkText';
import LightText from '../Helper/LightText';
import UserTippy from '../Helper/UserTippy';
import './styles.css';

function NavBarBottom() {
    const [showTippy, setShowTippy] = useState(false);
    const [userData,setUserData] = useState({});
    const details = useContext(AccountDetailsContext);

    useEffect(() => {
        const fetch = async () => {
            try {
                let result = await axios.get(`${BACKEND_URL}/other/getAccountDetails`,{withCredentials:true});
                setUserData(result.data);
            } catch (error) {
                throw error;
            }
        }
        fetch();
    }, []);

    const toggler = () => {
        if (showTippy) setShowTippy(false);
        else setShowTippy(true);
    }
    useEffect(() => {
        document.addEventListener('click', (e) => {
            const userTippy = document.getElementById('user-tippy');
            const userTippyIcon = document.getElementById('leftBottom')
            const userTippyIconSmall = document.getElementById('leftBottomSmall');

            if (userTippy) {
                if (userTippy.contains(e.target) || userTippyIcon.contains(e.target) || userTippyIconSmall.contains(e.target)) {
                    // Do nothing
                }
                else {
                    if (showTippy) setShowTippy(false)
                }
            }
        })
        return () => {
            document.removeEventListener('click', () => {

            })
        }
    })
    
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div id='leftBottom' onClick={toggler}>
                <div id='leftBottomLeft'>
                    <div id='leftBottomLeftLeft'>
                        <img src={userData.profileSrc} className='rounded-image' />
                    </div>
                    <div id='leftBottomLeftRight'>
                        <DarkText>{userData.accountName}</DarkText>
                        <LightText>@{userData.accountHandle}</LightText>
                    </div>
                </div>
                <div id='leftBottomRight'>
                    <img src='https://i.ibb.co/Q66Fmyg/dots.png' width='18.75px' height='18.75px' />
                </div>
            </div>
            <div id='leftBottomSmall' onClick={toggler}>
                <img src={userData.profileSrc} className='rounded-image' />
            </div>
            {showTippy && <UserTippy accountHandle={userData.accountHandle} />}
        </div>

    )
}

export default NavBarBottom