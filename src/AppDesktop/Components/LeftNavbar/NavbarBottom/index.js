import React, { useEffect, useState } from 'react';
import DarkText from '../Helper/DarkText';
import LightText from '../Helper/LightText';
import UserTippy from '../Helper/UserTippy';
import './styles.css';

function NavBarBottom() {
    const [showTippy, setShowTippy] = useState(false);
    const toggler = () => {
        if (showTippy) setShowTippy(false);
        else setShowTippy(true);
    }
    useEffect(() => {
        document.addEventListener('click', (e) => {
            const userTippy = document.getElementById('user-tippy');
            const userTippyIcon = document.getElementById('leftBottom')
            const userTippyIconSmall = document.getElementById('leftBottomSmall');

            if(userTippy){
                if(userTippy.contains(e.target) || userTippyIcon.contains(e.target) || userTippyIconSmall.contains(e.target)){
                    // Do nothing
                }
                else{
                    if(showTippy) setShowTippy(false)
                }
            }
        })
        return () => {
            document.removeEventListener('click', () => {

            })
        }
    })

    return (
        <div style={{position:'relative',width:'100%'}}>
            <div id='leftBottom' onClick={toggler}>
                <div id='leftBottomLeft'>
                    <div id='leftBottomLeftLeft'>
                        <img src='https://i.ibb.co/p4R5q3P/1655230024525.jpg' className='rounded-image' />
                    </div>
                    <div id='leftBottomLeftRight'>
                        <DarkText>marKE9150</DarkText>
                        <LightText>@lasertoch</LightText>
                    </div>
                </div>
                <div id='leftBottomRight'>
                    <img src='https://i.ibb.co/Q66Fmyg/dots.png' width='18.75px' height='18.75px' />
                </div>
            </div>
            <div id='leftBottomSmall' onClick={toggler}>
                <img src='https://i.ibb.co/p4R5q3P/1655230024525.jpg' className='rounded-image' />
            </div>
            {showTippy && <UserTippy />}
        </div>

    )
}

export default NavBarBottom