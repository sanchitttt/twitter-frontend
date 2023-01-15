import React from 'react';
import './styles.css';

function PostIcon({ url, type, activeOptionHandler }) {
  const fileHandler = () => {
    document.getElementById("imgupload").click();
  }

  switch (type) {
    case 'file':
      return (
        <div className='post-icon'>
          <input type="file" id="imgupload" style={{ display: "none" }} />
          <img onClick={fileHandler} src={url} width='20px' height='20px' />
        </div>
      )
    case 'poll':
      return (
        <div className='post-icon' id='emoji-icon'>
          <img onClick={() => activeOptionHandler('poll')} src={url} width='20px' height='20px' />
        </div>
      )
    case 'emoji':
      return (
        <div className='post-icon'>
          <img id='home-emoji-image' onClick={() => activeOptionHandler('emoji')} src={url} width='20px' height='20px' />
        </div>
      )
    case 'emoji2':
      return (
        <div className='post-icon'>
          <img id='home-emoji-image2' onClick={() => activeOptionHandler('emoji2')} src={url} width='20px' height='20px' />
        </div>
      )
    case 'schedule':
      return (
        <div className='post-icon'>
          <img id='home-schedule-image' onClick={() => {
            activeOptionHandler('schedule');
          }} src={url} width='20px' height='20px' />
        </div>
      )
    case 'location':
      return (
        <div className='post-icon' style={{ opacity: '0.4' }}>
          <img src={url} width='20px' height='20px' />
        </div>
      )
    default:
      return (
        <div className='post-icon'>
          <img src={url} width='20px' height='20px' />
        </div>
      )
  }
}

export default PostIcon;