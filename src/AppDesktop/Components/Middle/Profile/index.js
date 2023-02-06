import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../../config/config';
import './styles.css';
import Location from './Helper.js/Location';
import Website from './Helper.js/Website';
import Birthday from './Helper.js/Birthday';
import DateJoined from './Helper.js/DateJoined';
import ProfileBottom from './ProfileBottom';
import { CircularProgress, Modal, Skeleton } from '@mui/material';
import EditProfile from './EditProfile';
import PrimaryButton from '../../Helper/PrimaryButton';
import { Stack } from '@mui/system';

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

// const initialState = {
//   "profileSrc": 'https://lh3.googleusercontent.com/a/AEdFTp4eaL1ZMplUZjLVGKJDuWXpxxJxBeM0sDne0pw3iA=s96-c',
//   "email": '',
//   "accountName": '',
//   "accountHandle": '2',
//   "bio": '',
//   "location": '',
//   "verified": false,
//   "typeOfVerification": null,
//   "tweets": [],
//   "following": [],
//   "followers": [],
//   "createdAt": "2023-01-15T11:27:06.373Z",
//   "updatedAt": "2023-01-15T11:27:06.373Z",
//   "__v": 0
// }
// const text = `
// Immortal Ranked 🎮
// 300 RR Peek ✨Final year 🎓
// Portfolio: http://bit.ly/3dg6rhD
// `
function Profile({ accountHandleGiven }) {
  const [profileData, setProfileData] = useState({});
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [userDoesntExist, setUserDoesntExist] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [unfollowHovered, setUnfollowHovered] = useState(false);
  const [doesFollow, setDoesFollow] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isProfilePictureClicked, setIsProfilePictureClicked] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  //(accountHandleGiven)


  const unFollowMouseOverHandler = () => {
    setUnfollowHovered(true);
  }

  const unFollowMouseDownHandler = () => {
    setUnfollowHovered(false);
  }

  useEffect(() => {
    const fetchUser = async (accountHandleGiven) => {
      try {
        if (accountHandleGiven) {

          const { data } = await axios.get(`${BACKEND_URL}/noauth/profile/${accountHandleGiven}`, { withCredentials: true });
          setProfileData(data);
          setFollowersCount(data.followers.length);
          setFollowingCount(data.following.length);
          setShowLoading(false);
        }
        else {
          const { data } = await axios.get(`${BACKEND_URL}/pages/profile`, { withCredentials: true });

          setProfileData(data);
          setFollowersCount(data.followers.length);
          setFollowingCount(data.following.length);
          setShowLoading(false);
        }

      }
      catch (err) {
        const { status } = err.response;
        if (status === 404 || status === 500) {
          setUserDoesntExist(true);
          setShowLoading(false);
        }
      }
    }
    fetchUser(accountHandleGiven);
  }, []);

  useEffect(() => {
    const fetchUser = async (accountHandleGiven) => {
      try {
        if (accountHandleGiven) {
          const { data } = await axios.get(`${BACKEND_URL}/noauth/profile/${accountHandleGiven}`, { withCredentials: true });
          setProfileData(data);
          setFollowersCount(data.followers.length);
          setFollowingCount(data.following.length);
          setDoesFollow(data.alreadyFollowing);
          setShowLoading(false);
        }
        else {
          const { data } = await axios.get(`${BACKEND_URL}/pages/profile`, { withCredentials: true });
          setProfileData(data);
          setFollowersCount(data.followers.length);
          setFollowingCount(data.following.length);
          setShowLoading(false);
        }

      }
      catch (err) {
        const { status } = err.response;
        if (status === 404 || status === 500) {
          setUserDoesntExist(true);
          setShowLoading(false);
        }
      }
    }
    fetchUser(accountHandleGiven);
    if (accountHandleGiven) setIsOwnProfile(false);
    else setIsOwnProfile(true);
  }, [accountHandleGiven]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      let profilePictureMaximized = document.getElementById('profilePictureMaximized');
      let actualProfilePicture = document.getElementById('profile-details-firstRow-profilePicture');
      if (actualProfilePicture) {
        if (profilePictureMaximized.contains(e.target) || actualProfilePicture.contains(e.target)) {
          //Do nothing
        }
        else {
          setIsProfilePictureClicked(false);
        }
      }
    });
    return () => {
      document.removeEventListener('click', () => {
      });
    }
  })

  const followHandler = () => {
    const fetch = async () => {
      try {
        const result = await axios.patch(`${BACKEND_URL}/pages/profile/follow`,
          {
            followRequestReciever:
            {
              accountHandle: accountHandleGiven,
              accountName: profileData.accountName,
              profileSrc: profileData.profileSrc,
              verified: profileData.verified,
              typeOfVerification: profileData.typeOfVerification,
              profileBanner: profileData.profileBanner
            }
          },
          { withCredentials: true });
        if (result.status === 204) {
          setDoesFollow(false)
          setFollowersCount(followersCount => followersCount - 1);
        }
        else {
          setDoesFollow(true);
          setFollowersCount(followersCount => followersCount + 1);
        }
      }
      catch (error) {
        throw error;
      }
    }
    fetch();
  }
  // let transformedText = textTransformation(text)
  const {
    website,
    location,
    accountHandle,
    accountName,
    bio,
    createdAt,
    followers,
    following,
    profileSrc,
    tweets,
    typeOfVerification,
    verified,
    poll,
    alreadyFollowing
  } = profileData;

  if (showLoading) {

    return <div id='profile-skeleton'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={600} height={40} />
        <Skeleton variant="rounded" width={600} height={200} />
      </Stack>
      <Skeleton variant="circular" sx={{ marginTop: '-75px' }} width={133} height={133} />
      <Skeleton variant="rounded" sx={{ marginTop: '-57px' }} width={600} height={200} />
      <Skeleton variant="rounded" sx={{ marginTop: '5px' }} width={600} height={50} />
      <div style={{ marginTop: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress variant="indeterminate" />
      </div>
    </div>
  }
  else {
    return (
      userDoesntExist
        ? <>
          <div id='profile'>

            <div id='profile-top'>
              <div id='profile-top-heading'>
                <div id='profile-top-heading-left'>
                  <div id='profile-top-heading-left-imgContainer'>
                    {/* <img src='https://i.ibb.co/TTBVLht/left-arrow.png' alt='searchBarCloseIcon' /> */}
                  </div>
                  <div id='profile-top-heading-left-right'>
                    {/* <div id='profile-top-heading-main' className='poppinText'>{accountName}</div>
                    <div id='profile-top-heading-subtext'>{tweets.length} Tweets</div> */}
                  </div>
                </div>
                <div></div>
              </div>

              <div id='profile-details'>
                <div id='profile-details-banner'></div>
                <div id='profile-details-container'>
                  <div id='profile-details-firstRow'>
                    <div id='profile-details-firstRow-profilePicture'>
                      <div style={{ background: '#f7f9f9', width: "133px", height: "133px", borderRadius: "999px" }}> </div>
                    </div>

                  </div>
                  <div id='profile-details-secondRow'>
                    <div style={{ fontFamily: 'Poppins' }}>@{accountHandleGiven}</div>
                    <div></div>
                  </div>
                  <div id='profile-details-thirdRow'>
                    {/* @{accountHandle} */}
                  </div>
                  {/* {profileData.bio.length > 1 && <pre id='profile-details-bio' dangerouslySetInnerHTML={{ __html: bio }} style={{ fontFamily: 'Poppins' }} />} */}
                  <div id='profile-details-fourthRow' style={{ marginLeft: '0px', marginTop: '100px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ fontFamily: 'Poppins', color: '#0f1419', fontSize: '31px', fontWeight: 'bold' }}>This account doesn’t exist</div>
                    <div style={{ fontFamily: 'Poppins', color: '#536471', fontSize: '15px' }}>Try searching for another.</div>
                  </div>
                </div>
              </div>
              {/* <ProfileBottom /> */}
            </div>
            <Modal open={editProfileOpen}>
              <div id='editProfileMasterContainer'>
                <EditProfile setEditProfileOpen={setEditProfileOpen} iAccountName={accountName} iBio={bio} iLocation={location} iWebsite={website} />
              </div>

            </Modal>

          </div>
        </>
        :
        <div id='profile'>
          <div id='profile-top'>
            <div id='profile-top-heading'>
              <div id='profile-top-heading-left'>
                <div id='profile-top-heading-left-imgContainer'>
                  <img src='https://i.ibb.co/TTBVLht/left-arrow.png' alt='searchBarCloseIcon' />
                </div>
                <div id='profile-top-heading-left-right'>
                  <div id='profile-top-heading-main' className='poppinText'>{accountName && accountName}</div>
                  <div id='profile-top-heading-subtext'>{tweets && tweets.length} Tweets</div>
                </div>
              </div>
              <div></div>
            </div>

            <div id='profile-details'>
              <div id='profile-details-banner'
                style={{ background: profileData.profileBanner?`url(${profileData.profileBanner})`:'rgb(207, 217, 222)', backgroundSize: 'cover' }}
              ></div>
              <div id='profile-details-container'>
                <div id='profile-details-firstRow'>
                  <div id='profile-details-firstRow-profilePicture'
                    onClick={() => setIsProfilePictureClicked(true)}
                  >
                    <img id='profile-details-firstRow-profilePicture-img' src={profileSrc} alt='profilePicture' />
                  </div>
                  {isOwnProfile
                    ? <div id='profile-details-firstRow-editButton'
                      onClick={() => {
                        setEditProfileOpen(true);
                      }}
                    >
                      Edit profile
                    </div>
                    : <div id='profile-details-firstRow-moreAndFollowButtons'
                    >
                      <div id='profile-details-firstRow-moreButtonContainer' style={{ marginRight: '10px' }}>
                        <img src='https://i.ibb.co/9WDgxSG/more.png' alt='moreOptions' />
                      </div>
                      {doesFollow
                        ? <>
                          <div id='alreadyFollowing-btn' style={{ color: unfollowHovered && '#f4212e', backgroundColor: unfollowHovered && 'rgba(244, 33, 46, 0.1)' }} onMouseEnter={unFollowMouseOverHandler} onMouseLeave={unFollowMouseDownHandler}
                            onClick={() => {
                              followHandler();
                            }}
                          >
                            {unfollowHovered ? "Unfollow" : "Following"}
                          </div>
                        </>
                        :
                        <div style={{ marginRight: '10px' }}
                          onClick={followHandler}
                        >
                          <PrimaryButton blackButton>
                            Follow
                          </PrimaryButton>
                        </div>
                      }


                    </div>
                  }
                </div>
                <div id='profile-details-secondRow'>
                  <div style={{ fontFamily: 'Poppins' }}>{accountName && accountName}</div>
                  <div></div>
                </div>
                <div id='profile-details-thirdRow'>
                  @{accountHandle && accountHandle}
                </div>
                {profileData.bio && profileData.bio.length > 1 && <pre id='profile-details-bio' dangerouslySetInnerHTML={{ __html: bio }} style={{ fontFamily: 'Poppins' }} />}
                <div id='profile-details-fourthRow'>
                  {profileData.location && profileData.location.length && <Location location={location && location} />}
                  {profileData.website && profileData.website.length && <Website url={website && website} />}
                  {profileData.dob && <Birthday birthday={'Born February 8, 2002'} />}
                  <DateJoined dateJoined={createdAt} />
                </div>
                <div id='profile-details-lastRow'>
                  <div id='profile-details-lastRow-left'>
                    <div id='profile-details-lastRow-left-left'>
                      <div className='darkText'>{followingCount && followingCount}</div>
                      <div className='lightText'>Following</div>
                    </div>
                    <div id='profile-details-lastRow-left-right'>
                      <div className='darkText'>{followersCount && followersCount}</div>
                      <div className='lightText'>Followers</div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <ProfileBottom poll={poll} accountName={accountName} accountHandle={accountHandle} createdAt={createdAt} profileSrc={profileSrc} postsArr={tweets} />
          </div>
          <Modal open={editProfileOpen}>
            <div id='editProfileMasterContainer'>
              <EditProfile
                setEditProfileOpen={setEditProfileOpen}
                iAccountName={accountName}
                iBio={bio}
                iLocation={location}
                iWebsite={website}
                iProfilePicture={profileSrc}
              />
            </div>

          </Modal>
          <Modal open={isProfilePictureClicked} onClose={() => setIsProfilePictureClicked(false)}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img id='profilePictureMaximized' src={profileSrc} style={{ borderRadius: '999px' }} width='368px' height='368px' />
            </div>
          </Modal>

        </div>

    )
  }

}

export default Profile;