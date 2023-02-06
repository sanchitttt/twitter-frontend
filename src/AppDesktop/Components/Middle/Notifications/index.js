import React from 'react';
import NavBarLink from '../../Helper/NavBarLink';
import NotificationsNavBar from './NotificationsNavBar';
import './styles.css';


function Notifications() {

  return (
    <div id="notifications">
      <div id="notifications-topRow">
        <div id="notifications-topRow-left" style={{fontFamily:'Poppins'}}>
          Notifications
        </div>
        <div id="notifications-topRow-right">
          <img
            src="https://i.ibb.co/gFhLDhC/settings-icon.png"
            alt="settingsIcon"
          />
        </div>
      </div>
      {/* <NotificationsNavBar /> */}
      <div>
      </div>
    </div>
  )
}

export default Notifications;