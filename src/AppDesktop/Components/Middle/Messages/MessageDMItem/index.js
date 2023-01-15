import React from 'react';
import './styles.css';
import {
  DotSeperator,
  TimeStamp,
  AccountHandle,
  Verified,
  AccountName,
} from '../../../Helper/Post/Helper';

const textTransformationForMessageContent = (text) => {
  if (text.length > 29) {
    return text.slice(0, 29) + '...'
  }
  return text;
}


function MessageDMItem
  ({ profileSrc, accountName, accountHandle, lastMessage, verified }) {
  let textToBeUsed;
  if (lastMessage.type === 'text') {
    textToBeUsed = textTransformationForMessageContent(lastMessage.content);
  }

  return (
    <div className='MessageDMItem'>
      <div className='MessageDMItem-LeftSideContainer'>
        <div className='MessageDMItem-LeftSide'><img src={profileSrc} alt='profileImg' /></div>
      </div>
      <div className='MessageDMItem-RightSide'>
        <div className='MessageDMItem-RightSide-Top'>
          <AccountName>{accountName}</AccountName>
          <Verified verified={verified} />
          <AccountHandle>{accountHandle}</AccountHandle>
          <DotSeperator />
          <TimeStamp timestamp={lastMessage.date} />
        </div>
        <div className='MessageDMItem-RightSide-Bottom'>
          {lastMessage.type === 'text' && textToBeUsed}
          {lastMessage.type === 'link' && 'Sent a link'}
          {lastMessage.type === 'attachment' && 'Sent a photo'}
        </div>
      </div>
    </div>
  )
}

export default MessageDMItem;