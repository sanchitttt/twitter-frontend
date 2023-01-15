import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';


function UserTippy() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log('called');
    navigate('/logout')
  }
  return (
    <div id='user-tippy'>
      <div className='user-tippyWidget'>
        <div>Add an existing account</div>
      </div>
      <div className='user-tippyWidget'
        onClick={logoutHandler}
        style={{
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px'
        }}
      ><div >Log out @lasertoch</div></div>
    </div>
  )
}

export default UserTippy;