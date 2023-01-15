import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageSearchBar from './MessageSearchBar';
import './styles.css';

function Messages() {
  const navigate = useNavigate();
  return (
    <div id='messages'>
      <div id='messages-topRow'>
        <div id='messages-topRowLeftText' style={{ fontFamily: 'Poppins' }}>
          Messages
        </div>
        <div id='messages-topRowRight'>
          <div className='messages-topRowRight'
            onClick={() => {
              navigate('/messages/settings');
            }}
          >
            <img src="https://i.ibb.co/gFhLDhC/settings-icon.png"
              alt='settingsIcon' />
          </div>
          <div className='messages-topRowRight'
          >
            <img src='https://i.ibb.co/4tZmtsk/new-message.png'
              alt='newMessageIcon' />
          </div>
        </div>
      </div>
      <MessageSearchBar />
    </div>
  )
}

export default Messages;