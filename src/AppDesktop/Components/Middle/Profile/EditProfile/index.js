import React, { useState } from 'react';
import { Modal, TextField } from '@mui/material';
import styled from '@emotion/styled';

import './styles.css';
import DiscardChangesBox from './DiscardChanges';
import { BACKEND_URL } from '../../../../../config/config';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '.css-t44yq1-MuiInputBase-root-MuiFilledInput-root:before': {
        borderBottom: "1px solid rgb(207, 217, 222) !important",
    },
    '.css-160vmx7-MuiInputBase-root-MuiFilledInput-root:before': {
        borderBottom: "1px solid rgb(207, 217, 222) !important",
    },
    '& .MuiFilledInput-root': {
        fontFamily: 'Poppins',
        backgroundColor: 'white',
        borderTop: '1px solid rgb(207, 217, 222)',
        borderLeft: '1px solid rgb(207, 217, 222)',
        borderRight: '1px solid rgb(207, 217, 222)',
        overflow: 'hidden',
        borderRadius: 4,
        '&:hover': {
            backgroundColor: 'white',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            borderRight: '2px solid  rgb(29,155,240)',
            borderLeft: '2px solid rgb(29,155,240)',
            borderTop: '2px solid  rgb(29,155,240)',
            borderBottom: 'none',
            borderColor: '1px solid rgb(29,155,240)',

        },
    },
}));




function NameLengthLimit({ value, limit }) {
    return (
        <div className='editProfileNameLengthLimit'>
            {value} / {limit}
        </div>
    )
}

function EditProfile({ setEditProfileOpen, iAccountName, iBio, iLocation, iWebsite, iProfilePicture, iProfileBanner }) {
    const [accountName, setAccountName] = useState(iAccountName);
    const [accountBio, setAccountBio] = useState(iBio);
    const [location, setLocation] = useState(iLocation);
    const [website, setWebsite] = useState(iWebsite);
    const [profilePicture, setProfilePicture] = useState(iProfilePicture);
    const [showDiscardBox, setShowDiscardBox] = useState(false);
    const [profileBanner, setProfileBanner] = useState(iProfileBanner);

    const accountBioHandler = (e) => {
        if (accountName.length < 160) setAccountBio(e.target.value);
    }

    const accountNameHandler = (e) => {
        if (accountBio.length < 50) setAccountName(e.target.value);
    }

    const locationHandler = (e) => {
        if (location.length < 30) setLocation(e.target.value);
    }

    const websiteHandler = (e) => {
        if (website.length < 100) setWebsite(e.target.value);
    }

    const handleFiles = (files) => {
        setProfilePicture(files.base64);
    };

    const handleFilesForBanner = (files) => {
        setProfileBanner(files.base64)
    }
    const saveHandler = () => {
        const fetch = async () => {
            try {
                console.log(profileBanner.slice(0,5) , 'at edit profile frontend')
                const result = await axios.patch(
                    `${BACKEND_URL}/pages/profile/editProfile`,
                    {
                        location: location,
                        website: website,
                        accountBio: accountBio,
                        accountName: accountName,
                        profileSrc: profilePicture,
                        profileBanner: profileBanner

                    },
                    { withCredentials: true }
                )
                setEditProfileOpen(false);
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        fetch();
    }

    return (
        <div id='editProfileModal'>
            <div id='editProfileTopRow'>
                <div id='editProfileTopRowLeft'>
                    <div style={{ marginRight: '20px' }}>
                        <div id='editProfileTopRowLeftImgContainer' onClick={() => setShowDiscardBox(true)}>
                            <img src='https://i.ibb.co/Hd13mN0/wrong-black.png' alt='closeIcon' />
                        </div>
                    </div>
                    <div id='editProfileTopRowMainText'>
                        Edit Profile
                    </div>
                </div>
                <div id='editProfileTopRowRight'>
                    <div id='editProfileTopRowRightSave'
                        onClick={saveHandler}
                    >Save</div>
                </div>
            </div>
            <div id='editProfileBannerRow'>
                {profileBanner && <img src={profileBanner} width='100%' height={'100%'} />}
                <div id='editProfileBannerRowMiddleUploadIcon'>
                    <ReactFileReader
                        fileTypes={[".csv", ".zip", "png", "jpeg"]}
                        base64={true}
                        multipleFiles={false}
                        handleFiles={handleFilesForBanner}
                    >
                        <img src={'https://i.ibb.co/28Zb4PG/camera-white.png'} alt='uploadImg' />
                    </ReactFileReader>
                </div>
            </div>
            <div id='editProfileThirdRow'>
                <div id='editProfileThirdRowProfilePictureContainer'>
                    <img className='profilePictureSS' src={profilePicture} alt='' />
                    <ReactFileReader
                        fileTypes={[".csv", ".zip"]}
                        base64={true}
                        multipleFiles={false}
                        handleFiles={handleFiles}
                    >
                        <div style={{ borderRadius: '999px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%,-50%)", width: '30px', height: '30px', background: 'rgba(15, 20, 25, 0.75)' }}>
                            <img width='20px' height='20px' src='https://i.ibb.co/28Zb4PG/camera-white.png' alt='uploadImg' />
                        </div>
                    </ReactFileReader>


                </div>
            </div>
            <div id='editProfileFourthRow'>
                <div style={{ width: '95%' }}>
                    <RedditTextField
                        fullWidth
                        label="Name"
                        id="accountNameEdit"
                        variant="filled"
                        value={accountName}
                        onChange={accountNameHandler}
                        InputProps={{
                            endAdornment: <NameLengthLimit value={accountName.length} limit={50} />
                        }}
                    />
                </div>
            </div>
            <div id='editProfileFifthRow'>
                <div style={{ width: '95%' }}>
                    <RedditTextField
                        multiline
                        fullWidth
                        label="Bio"
                        id="accountBio"
                        variant="filled"
                        value={accountBio}
                        onChange={accountBioHandler}
                        InputProps={{
                            endAdornment: <NameLengthLimit value={accountBio.length} limit={160} />
                        }}
                    />
                </div>
            </div>
            <div id='editProfileSixthRow'>
                <div style={{ width: '95%' }}>
                    <RedditTextField
                        fullWidth
                        label="Location"
                        id="accountLocation"
                        variant="filled"
                        value={location}
                        onChange={locationHandler}
                        InputProps={{
                            endAdornment: <NameLengthLimit value={location.length} limit={30} />
                        }}
                    />
                </div>
            </div>
            <div id='editProfileSeventhRow'>
                <div style={{ width: '95%' }}>
                    <RedditTextField
                        fullWidth
                        label="Website"
                        id="accountWebsite"
                        variant="filled"
                        value={website}
                        onChange={websiteHandler}
                        InputProps={{
                            endAdornment: <NameLengthLimit value={website.length} limit={100} />
                        }}
                    />
                </div>
            </div>
            <div id='editProfileEightRow'>
                <div id='editProfileEditBirthdayText'>
                    Birth date <span style={{ fontSize: '9px' }}>•</span> <span id='editProfileEditDateHighlighted'>Edit</span>
                </div>
            </div>
            <div id='editProfileNinthRow'>
                February 8, 2002
            </div>
            <Modal open={showDiscardBox}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <DiscardChangesBox setShowDiscardChangesBox={setShowDiscardBox} setEditProfileOpen={setEditProfileOpen} />
                </div>

            </Modal>
        </div>
    )
}

export default EditProfile;