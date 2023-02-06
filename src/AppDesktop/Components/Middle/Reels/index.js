import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BACKEND_URL } from '../../../../config/config';
import ReelItem from './ReelItem';
import './styles.css';


const reels = [
  {
    reelSrc: '"blob:http://localhost:3000/6a647ae8-fcbd-4641-ae49-df130751bd09"',
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/reels`, { withCredentials: true });
        console.log(result);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);
  const inputRef = useRef(null);

  const addNewReelClickHandler = () => {
    inputRef.current.click();
  }

  const inputChangeHandler = (e) => {
    const video = e.target.files[0];
    const url = URL.createObjectURL(video);
    console.log(url);
    const postReels = async (url) => {
      try {
        console.log(`${BACKEND_URL}/pages/reels/postNew`)
        const result = await axios.post(`${BACKEND_URL}/pages/reels/postNew`, { videoSrc: url }, { withCredentials: true });
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
        // console.log(reel)
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