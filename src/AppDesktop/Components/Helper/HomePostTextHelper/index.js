import React from 'react'
import './styles.css';


function HomePostTextHelper({ disabled, id, tweetThread, url, children }) {
  return (
    <div className='homePostTextHelper' id={tweetThread? id:'homePostTextHelper'} style={{ opacity: disabled && '0.3'}}>
      <img src={url} width='16px' height='16px' alt='someImg' />
      <div id='homePostTextHelperText'>{children}</div>
    </div>
  )
}

export default HomePostTextHelper