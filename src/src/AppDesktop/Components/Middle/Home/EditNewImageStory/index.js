import styled from '@emotion/styled';
import { LinearProgress, Modal, Slider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../../../config/config';
import DiscardChangesBox from '../../Profile/EditProfile/DiscardChanges';
import ImageCarousel from './ImageCarousel';
import './styles.css';

const IOSSlider = styled(Slider)(({ theme }) => ({
    height: 2,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
        height: 28,
        width: 28,
        backgroundColor: "#fff",
        boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)",
        "&:focus, &:hover, &.Mui-active": {
            boxShadow:
                "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
                boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)"
            }
        }
    }
}));


function EditNewImageStory({ imageList, setShowEditmageStory }) {
    const [scaleValue, setScaleValue] = useState(34);
    const [rotateValue, setRotateValues] = useState(90);
    const [showDiscardBox, setShowDiscardBox] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.getElementById('newImageStoryActualImage0').style.scale = 0.45 + scaleValue * 0.03;
    }, [scaleValue])

    const rotateValueHandler = () => {
        document.getElementById('newImageStoryActualImage0').style.rotate = rotateValue + 'deg';
        setRotateValues(rotateValue => (rotateValue + 90) % 360);
    }

    const addTextHandler = () => {

    }

    const clickHandler = () => {
        let id;
        setProgress(25);
        const fetch = async () => {
            try {
                const result = await axios.post(`${BACKEND_URL}/pages/home/stories/newStory`,
                    { scaleValue: scaleValue, rotateValue: rotateValue, imgSrc: imageList[0] },
                    { withCredentials: true })

                if (result) {
                    id = setTimeout(() => {
                        setProgress(100);
                        setTimeout(() => {
                            setProgress(0);
                            setShowEditmageStory(false);
                        }, 500)
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
            }
        }
        // console.log(payload)
        fetch();
        return () => {
            clearTimeout(id);
        }
    }

    return (
        <div id='editNewImageStoryContainer'>
            {progress > 0 && <div>
                <LinearProgress
                    aria-describedby="progress-bar"
                    variant="determinate"
                    value={progress}
                />
            </div>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div id='createNewStoryCloseContainer' onClick={() => setShowDiscardBox(true)}>
                    <img src='https://i.ibb.co/Hd13mN0/wrong-black.png' alt='closeIcon' />
                </div>
                <div>
                    <div className='shareToStoryText'
                        onClick={clickHandler}
                    >Share to story</div>
                </div>
            </div>


            <div id='editNewImageStoryPreviewContainer' style={{ marginBottom: '10px' }}>
                <div id='editNewImageStoryActualPreview'>
                    <img id='newImageStoryActualImage0' src={imageList[0]} alt='img' />
                </div>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <div id='editImageButtonControls' style={{ justifyContent: 'space-between', width: '458px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '410px' }}>
                        <IOSSlider value={scaleValue} onChange={(e) => setScaleValue(e.target.value)} />
                    </div>

                    <div className='editImageStoryButton' onClick={rotateValueHandler}>
                        <img src='https://i.ibb.co/XtgbG80/image-4.png' />
                    </div>
                    <div className='editImageStoryButton' onClick={addTextHandler}>
                        <img src='https://i.ibb.co/McWFDP2/image-5.png' />
                    </div>
                </div>
            </div>

            <div id='editNewImageStoryImages'>
                <ImageCarousel />
            </div>
            <Modal open={showDiscardBox}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <DiscardChangesBox
                        discardHeading="Discard story?"
                        discardSubText={"Are you sure that you want to discard this story? Your story won't be saved."}
                        setKeepItOpened={setShowEditmageStory}
                        setShowDiscardChangesBox={setShowDiscardBox} />
                </div>
            </Modal>
        </div>
    )
}

export default EditNewImageStory;