import { Modal, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../../../../config/config';
import CreateNewStory from '../CreateNewStory';
import StoryItem from '../StoryItem';
import './styles.css';


const storiesArr = [
  {
    profileSrc: 'https://images.unsplash.com/photo-1674664799224-dd87403f5049?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    accountName: 'User 12020',
    accountHandle: "",
    storyItems: [
      {
        type: '',
        imageSrc: '',
        scaleLevel: '',
        rotateLevel: '',
        text: '',
        fontFamily: { type: String, default: 'Poppins', enum: ['Poppins', 'Raleway', 'Caveat', 'Permanent Marker', 'Russo One'] },
        textColor: '',
        backgroundColor: '',
        backgroundImage: ''
      }
    ]
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
  const [showCreateNewStory, setShowCreateNewStory] = useState(false);
  const [ownStory, setOwnStory] = useState();
  const [otherStories, setOtherStories] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [showOtherLoading,setShowOtherLoading] = useState(true);

  useEffect(() => {
    const fetchOwnStory = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/ownStory`, { withCredentials: true });
        if(result.data){
          setOwnStory(result.data)
          setShowLoading(false);
        }
      } catch (error) {
        console.log(error);
        // setShowLoading(false);
      }
    }

    const fetchOtherStories = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/otherStories`, { withCredentials: true });
        if(result.data){
          setOtherStories(result.data);
          setShowOtherLoading(false);
        }

      } catch (error) {
        console.log(error);
        // setShowLoading(false);
      }
    }
    fetchOwnStory();
    fetchOtherStories();
  }, []);
  if (showLoading) {
    return <div id='storiesMasterContainer'>
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
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '600px' }}>
        <Skeleton variant="rounded" width={112} height={200} />
        <Skeleton variant="rounded" width={112} height={200} />
        <Skeleton variant="rounded" width={112} height={200} />
        <Skeleton variant="rounded" width={112} height={200} />
      </div>
    </div>
  }

  else{
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
        {ownStory && ownStory.storyItems.length
          && <StoryItem
            ownStory={true}
            stories={ownStory.storyItems}
            imageSrc={ownStory.storyItems[0].imageSrc}
            scaleLevel={ownStory.storyItems[0].scaleLevel}
            rotateLevel={ownStory.storyItems[0].rotateLevel}
            text={ownStory.storyItems[0].text}
            fontFamily={ownStory.storyItems[0].fontFamily}
            textColor={ownStory.storyItems[0].textColor}
            backgroundColor={ownStory.storyItems[0].backgroundColor}
            backgroundImage={ownStory.storyItems[0].backgroundImage}
          >
            {ownStory.accountName ? ownStory.accountName : null}
          </StoryItem>
        }
        {showOtherLoading ? 
         <div style={{ display: 'flex', justifyContent: 'space-around', width: '400px' }}>
         <Skeleton variant="rounded" width={112} height={200} />
         <Skeleton variant="rounded" width={112} height={200} />
         <Skeleton variant="rounded" width={112} height={200} />
       </div>
        : otherStories
          &&
          otherStories.map((otherStory) => {
            return otherStory.storyItems.length ? <StoryItem
              stories={otherStory.storyItems}
              imageSrc={otherStory.storyItems[0].imageSrc}
              scaleLevel={otherStory.storyItems[0].scaleLevel}
              rotateLevel={otherStory.storyItems[0].rotateLevel}
              text={otherStory.storyItems[0].text}
              fontFamily={otherStory.storyItems[0].fontFamily}
              textColor={otherStory.storyItems[0].textColor}
              backgroundColor={otherStory.storyItems[0].backgroundColor}
              backgroundImage={otherStory.storyItems[0].backgroundImage}
            >
              {otherStory.accountName ? otherStory.accountName : null}
            </StoryItem> : <></>
          })
        }
        {<Modal open={showCreateNewStory}>
          <div
            style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <CreateNewStory setShowCreateNewStory={setShowCreateNewStory} />
          </div>
        </Modal>}
      </div>
    )
  }
  }
  

export default Stories;