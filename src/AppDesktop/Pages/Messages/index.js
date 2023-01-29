import React, { useEffect, useState } from 'react';
import Messages from '../../Components/Middle/Messages';
import './styles.css';
import NewMessage from '../../Components/Right/MessageBox/NewMessage';
import LeftSide from '../../Components/LeftNavbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../../config/config';

function MessagesPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const makeReq = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/home`, { withCredentials: true });
        if (result.status === 200) {
        }
        else {
          navigate('/')
        }
      } catch (error) {
        navigate('/')
      }
    }
    makeReq();
  }, []);
  return (
    <div id='messagesPage'>
      {/* <LeftSide /> */}
      <Messages />
      <NewMessage />
    </div>
  )
}

export default MessagesPage;