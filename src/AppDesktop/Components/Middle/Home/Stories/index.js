import { Modal } from '@mui/material';
import React, { useState } from 'react'
import CreateNewStory from '../CreateNewStory';
import StoryItem from '../StoryItem';
import './styles.css';


const storiesArr = [
  {
    profileSrc: 'https://images.unsplash.com/photo-1674664799224-dd87403f5049?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    accountName: 'User 12020'
  },
  {
    profileSrc: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80',
    accountName: 'Windows'
  },
  {
    profileSrc: 'https://plus.unsplash.com/premium_photo-1661698060476-81f96b60ed30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    accountName: 'User someone'
  },
  {
    profileSrc: 'https://images.unsplash.com/photo-1674674614545-f53dfddd3071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    accountName: 'Someone'
  },
  {
    profileSrc: 'https://images.unsplash.com/photo-1674697711016-3a2ef6d9e573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    accountName: 'User 20202'
  },

]

function Stories() {
  const [showCreateNewStory,setShowCreateNewStory] = useState(false);

  return (
    <div id='storiesMasterContainer'>
      <div id='newStoryContainer'
      onClick={() => setShowCreateNewStory(true)}
      >
        <div id='newStoryProfilePictureContainer'>
          <img src='https://i.ibb.co/Gd2WKW1/image-1.png' />
        </div>
        <div id='newStoryButtonContainer'>
          <img src='https://cdn-icons-png.flaticon.com/512/1828/1828817.png' />
        </div>
        <div id='newStoryTextContainer'>
           Create story
        </div>
      </div>
      {storiesArr.map((story,idx) => {
        return <StoryItem key={idx} src={story.profileSrc}>{story.accountName}</StoryItem>
      })}
      {<Modal open={showCreateNewStory}>
        <div 
        style={{display:'flex', width:'100%',height:'100%', justifyContent:'center',alignItems:'center'}}
        ><CreateNewStory setShowCreateNewStory={setShowCreateNewStory} /></div>
      </Modal>}
    </div>
  )
}

export default Stories;