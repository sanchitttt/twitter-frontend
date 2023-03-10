import axios from 'axios';
import React, { useRef } from 'react';
import { BACKEND_URL } from '../../../../config/config';
import ReelItem from './ReelItem';
import './styles.css';


const reels = [
  {
    reelSrc: 'blob:http://localhost:3000/d8182cb4-8020-4dfa-98b2-f7be6ce6b511',
    profileSrc: 'https://lh3.googleusercontent.com/a/AEdFTp4eaL1ZMplUZjLVGKJDuWXpxxJxBeM0sDne0pw3iA=s96-c',
    accountName: 'sanchit',
    accountHandle: 'sanchit08'
  },
  {
    reelSrc: 'blob:http://localhost:3000/4cc6b206-3e87-42ee-8fa1-5c997716d519',
    profileSrc: 'https://lh3.googleusercontent.com/a/AEdFTp4eaL1ZMplUZjLVGKJDuWXpxxJxBeM0sDne0pw3iA=s96-c',
    accountName: 'sanchit',
    accountHandle: 'sanchit08'
  },

]
function Reels() {

  const inputRef = useRef(null);

  const addNewReelClickHandler = () => {
    inputRef.current.click();
  }

  const inputChangeHandler = (e) => {
    const video = e.target.files[0];
    const url = URL.createObjectURL(video);
    console.log('called',url);
    const postReels = async (url) => {
      try {
        console.log(`${BACKEND_URL}/pages/reels/postNew`)
        const result = await axios.post(`${BACKEND_URL}/pages/reels/postNew`, { videoSrc: url }, { withCredentials: true });
        console.log(result);
      }
      catch (err) {
        throw err;
      }
    }
    postReels(url);
  }


  return (
    <div id='reelsContainer'>
      <div id='reelsTopRow'>
        <input
          ref={inputRef}
          type='file'
          id='reelFileInput'
          accept=".mov,.mp4,.mkv"
          style={{ display: 'none' }}
          onChange={inputChangeHandler}
        />
        <div id='addNewReel'
          onClick={addNewReelClickHandler}
        >
          <img src='https://i.ibb.co/LCLSzgf/upload-reel.png'
            style={{ marginRight: '5px' }} width='24px' height='24px'
          />
          Add new reel
        </div>
      </div>
      {reels.map((reel, idx) => {
        return <ReelItem
          key={idx}
          profileSrc={reel.profileSrc}
          reelSrc={reel.reelSrc}
          accountHandle={reel.accountHandle}
          accountName={reel.accountName}
        />
      })}
    </div>
  )
}

export default Reels;