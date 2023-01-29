import React from 'react';
import ReactFileReader from 'react-file-reader';
import './styles.css';

function PostIcon({ url, homeEmojiThreadImageId, type, handleFiles, activeOptionHandler, partOfAThread }) {
  switch (type) {
    case 'file':
      return (
        <div className='post-icon'>
          <ReactFileReader
            fileTypes={[".csv", ".zip"]}
            base64={true}
            multipleFiles={true}
            handleFiles={handleFiles}
          >
            <img src={url} width='20px' height='20px' />
          </ReactFileReader>
        </div>
      )
    case 'poll':
      return (
        <div className='post-icon'>
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
    case 'emoji3':
      return (
        <div className='post-icon'>
          <img id={homeEmojiThreadImageId} onClick={() => activeOptionHandler('emoji3')} src={url} width='20px' height='20px' />
        </div>
      )
    case 'schedule':
      return (
        <div className='post-icon' style={{ opacity: partOfAThread && '0.4' }}>
          <img id='home-schedule-image' onClick={() => {
            activeOptionHandler('schedule');
          }} src={url} width='20px' height='20px' />
        </div>
      )
    case 'schedule2':
      return (
        <div className='post-icon' style={{ opacity: '0.4' }}>
          <img id='home-schedule-image' src={url} width='20px' height='20px' />
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