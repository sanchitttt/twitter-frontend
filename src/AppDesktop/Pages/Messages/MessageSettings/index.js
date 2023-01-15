import React from 'react';
import Messages from '../../../Components/Middle/Messages';
import MessageSettings from '../../../Components/Right/MessageBox/MessageSettings';
import './styles.css';

function MessageSettingsPage() {
  return (
    <div id='messageSettingsPage'>
      <Messages />
      <MessageSettings />
    </div>
  )
}

export default MessageSettingsPage;