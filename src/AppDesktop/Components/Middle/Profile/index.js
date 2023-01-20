import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../../config/config';
import './styles.css';
import Location from './Helper.js/Location';
import Website from './Helper.js/Website';
import Birthday from './Helper.js/Birthday';
import DateJoined from './Helper.js/DateJoined';
import ProfileBottom from './ProfileBottom';
import { Modal } from '@mui/material';
import EditProfile from './EditProfile';

const textTransformation = (text) => {
  const textArr = text.split(' ');
  const result = [];
  for (let i = 0; i < textArr.length; i++) {
    if (textArr[i].includes('http') || textArr[i].includes('https') || textArr[i].includes('.com') || textArr[i].includes('.org') || textArr[i].includes('.gov')) {
      result.push(`<span class='isALink'>${textArr[i]}</span>`)
    }
    else {
      result.push(textArr[i]);
    }
  }
  return result.join(' ');
}

const initialState = {
  "profileSrc": 'https://lh3.googleusercontent.com/a/AEdFTp4eaL1ZMplUZjLVGKJDuWXpxxJxBeM0sDne0pw3iA=s96-c',
  "email": 'sanchittewari222@gmail.com',
  "accountName": 'Sanchit Tewari',
  "accountHandle": 'sanchittewari22',
  "bio": '',
  "location": '',
  "verified": false,
  "typeOfVerification": null,
  "tweets": [],
  "following": [],
  "followers": [],
  "createdAt": "2023-01-15T11:27:06.373Z",
  "updatedAt": "2023-01-15T11:27:06.373Z",
  "__v": 0
}
const text = `
Immortal Ranked 🎮
300 RR Peek ✨Final year 🎓
Portfolio: http://bit.ly/3dg6rhD
`
function Profile() {
  const [profileData, setProfileData] = useState(initialState);
  const [editProfileOpen, setEditProfileOpen] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/pages/profile`, { withCredentials: true });
        setProfileData(data);
      }
      catch (err) {
        throw err;
      }
    }
    fetchUser();
  }, []);
  let transformedText = textTransformation(text)
  const {website, location,accountHandle, accountName, bio, createdAt, followers, following, profileSrc, tweets, typeOfVerification, verified } = profileData;
  return (
    <div id='profile'>

      <div id='profile-top'>
        <div id='profile-top-heading'>
          <div id='profile-top-heading-left'>
            <div id='profile-top-heading-left-imgContainer'><img src='https://i.ibb.co/TTBVLht/left-arrow.png' alt='searchBarCloseIcon' /></div>
            <div id='profile-top-heading-left-right'>
              <div id='profile-top-heading-main' className='poppinText'>{accountName}</div>
              <div id='profile-top-heading-subtext'>{tweets.length} Tweets</div>
            </div>
          </div>
          <div></div>
        </div>

        <div id='profile-details'>
          <div id='profile-details-banner'></div>
          <div id='profile-details-container'>
            <div id='profile-details-firstRow'>
              <div id='profile-details-firstRow-profilePicture'>
                <img src='https://pbs.twimg.com/profile_images/1555754123420913664/P0uQDM-b_400x400.jpg' alt='profilePicture' />
              </div>
              <div id='profile-details-firstRow-editButton'
                onClick={() => {
                  setEditProfileOpen(true);
                }}
              >
                Edit profile
              </div>
            </div>
            <div id='profile-details-secondRow'>
              <div style={{ fontFamily: 'Poppins' }}>{accountName}</div>
              <div></div>
            </div>
            <div id='profile-details-thirdRow'>
              @{accountHandle}
            </div>
            {profileData.bio.length > 1 && <pre id='profile-details-bio' dangerouslySetInnerHTML={{ __html: bio }} style={{ fontFamily: 'Poppins' }} />}
            <div id='profile-details-fourthRow'>
              {profileData.location && profileData.location.length && <Location location={'Ghaziabad'} />}
              {profileData.website && profileData.website.length && <Website url={'https://www.linkedin.com/in/sanchittewari/'} />}
              {profileData.dob && <Birthday birthday={'Born February 8, 2002'} />}
              <DateJoined dateJoined={createdAt} />
            </div>
            <div id='profile-details-lastRow'>
              <div id='profile-details-lastRow-left'>
                <div id='profile-details-lastRow-left-left'>
                  <div className='darkText'>{following.length}</div>
                  <div className='lightText'>Following</div>
                </div>
                <div id='profile-details-lastRow-left-right'>
                  <div className='darkText'>{followers.length}</div>
                  <div className='lightText'>Followers</div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <ProfileBottom />
      </div>
      <Modal open={editProfileOpen}>
        <div id='editProfileMasterContainer'>
          <EditProfile setEditProfileOpen={setEditProfileOpen} iAccountName={accountName} iBio={bio} iLocation={location}  iWebsite={website} />
        </div>

      </Modal>

    </div>
  )
}

export default Profile;