import React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../../config/config';
import './styles.css';

console.log(BACKEND_URL)
function LoginModal({ closeHandler }) {
    const loginHandler = async () => {
        try {
            window.open(
                `${BACKEND_URL}/auth/google`, "_self"
            )
        } catch (error) {
            throw error;
        }
    }
    return (
        <div id='login-modal'>
            <div id='login-modal-top'>
                <div id='login-modal-left'>
                    <div className='login-modal-closeIcon-imgContainer'
                        onClick={closeHandler}
                    >
                        <img
                            src="https://thumbs4.imagebam.com/33/54/cd/MEHU3AO_t.png"
                            alt="close-icon"
                            width="20px"
                            height="20px"
                        />
                    </div>
                    <div className='twitter-bird-container'>
                        <div className='twitter-bird-left' onClick={() => {
                        }}>
                            <img className='twitter-bird' src='https://i.ibb.co/SQZP6HT/twitter-icon.png' width='28.3px' height='23px' />
                        </div>
                        <div className='twitter-bird-right'></div>
                    </div>
                </div>
                <div></div>
            </div>
            <div id='login-modal-googleOption'
                onClick={loginHandler}
            >
                <div id='login-modal-googleOption-imgContainer'>
                    <img src='https://cdn-icons-png.flaticon.com/512/300/300221.png' />
                </div>
                <div className='poppins' id='signInWithGoogle'
                >
                    Sign in with Google
                </div>
            </div>
        </div>
    )
}

export default LoginModal;