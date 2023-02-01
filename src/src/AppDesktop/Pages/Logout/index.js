import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BACKEND_URL} from '../../../config/config';
import './styles.css';

function LogoutPage() {
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const result = await axios.post(`${BACKEND_URL}/auth/logout`, {}, {withCredentials:true});
            console.log(result);
            navigate('/');
            
        } catch (error) {
            // throw error;
        }
    }
    const cancelHandler = () => {
        navigate(-1);
    }
    return (
        <div id='logoutPage'>
            <div id='logoutPageTippy'>
                <div id='logoutPageTippyImageContainer'>
                    <img src='https://i.ibb.co/SQZP6HT/twitter-icon.png'
                        alt='twitterIcon' />
                </div>
                <div id='logoutTippyHeading'>
                    Log out of Twitter?
                </div>
                <div id='logoutTippySubtext'>
                    You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.
                </div>
                <div id='logoutButtonsContainer'>
                    <div id='logoutBlackBtn'
                        onClick={logoutHandler}
                    >
                        Log out
                    </div>
                    <div id='logoutCancelBtn'
                    onClick={cancelHandler}
                    >
                        Cancel
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LogoutPage;