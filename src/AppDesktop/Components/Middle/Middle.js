import React from 'react';
import Home from './Home';
import Posts from './Post/Posts';
import '../../App.css';
import './styles.css';
import ThreadTweet from './ThreadTweet';



function Middle() {
  return (
    <div id='middle'>
      <Home />
      <ThreadTweet />
    </div>
  )
}

export default Middle