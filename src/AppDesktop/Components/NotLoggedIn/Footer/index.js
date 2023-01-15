import { Modal } from '@mui/material';
import React, { useState } from 'react';
import LoginModal from '../LoginModal';
import './styles.css';

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}


function Footer() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const showHandler = () => {
        setShowLoginModal(true);
    }
    const closeHandler = () => {
        setShowLoginModal(false);
    }
    return (
        <div className='notLoggedIn-footer'>
            <div className='notLoggedIn-footer-items-container' >
                <div className='notLoggedIn-footer-leftText'>
                    <div className='poppins notLoggedIn-footer-leftText-big'>Don't miss what's happening</div>
                    <div className='poppins notLoggedIn-footer-leftText-small'>People on Twitter are the first to know.</div>
                </div>
                <div className='notLoggedIn-footer-btnContainer'>
                    <div className='w50'>
                        <div className='login-btn' onClick={showHandler}>
                            Log in
                        </div>
                    </div>
                    <div className='w50'>
                        <div className='signup-btn'>
                            Sign up
                        </div>
                    </div>
                </div>
            </div>
            <Modal sx={style} open={showLoginModal}><div><LoginModal closeHandler={closeHandler} /></div></Modal>
        </div>
    )
}

export default Footer;