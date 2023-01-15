import React from 'react';
import Messages from '../../../Components/Middle/Messages';
import MessageChat from '../../../Components/Right/MessageBox/MessageChat';
import './styles.css';

function MessageChatPage() {
  return (
    <div id='messageChatPage'>
        <Messages />
        <MessageChat />
    </div>
  )
}

export default MessageChatPage