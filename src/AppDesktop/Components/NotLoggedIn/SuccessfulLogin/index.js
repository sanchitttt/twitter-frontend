import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {BACKEND_URL} from '../../../../config/config';
import './styles.css';

function SuccessfullLogin() {
    const navigate = useNavigate();
    useEffect(() => {
        const makeReq = async () => {
            console.log('mai hua')
            try {
                const result = await axios.get(`${BACKEND_URL}/auth/login/success`,{withCredentials:true});
                console.log(result);
                if(result.status === 200){
                    navigate('/home');
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        makeReq();
    },[]);
    return (
        <div>
            <h1>Successfull Login</h1>
            <p>Redirecting you to twitter...</p>
        </div>
    )
}

export default SuccessfullLogin;