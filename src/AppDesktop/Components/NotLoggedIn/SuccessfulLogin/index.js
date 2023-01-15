import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css';

function SuccessfullLogin() {
    const navigate = useNavigate();
    useEffect(() => {
        const makeReq = async () => {
            try {
                const result = await axios.get('http://localhost:8082/auth/login/success',{withCredentials:true});
                if(result.status === 200){
                    navigate('/home');
                }
            } catch (error) {
                console.log(error);
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