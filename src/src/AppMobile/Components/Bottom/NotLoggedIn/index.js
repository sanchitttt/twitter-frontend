import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function NotLoggedInButtons() {
 const navigate = useNavigate();
  return (
    <div id='notLoggedInBottomMContainer'
    onClick={() => navigate('/login')}
    >
      <div className='loginMButton'>
        Login
      </div>
      <div className='signupMButton'>
        Signup
      </div>
    </div>
  )
}

export default NotLoggedInButtons;