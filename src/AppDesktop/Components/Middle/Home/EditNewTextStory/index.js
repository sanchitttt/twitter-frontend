import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import './styles.css';
import { FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import DiscardChangesBox from '../../Profile/EditProfile/DiscardChanges';
import { color } from '@mui/system';


const backgrounds = [
    {
        backgroundColor: '#4158D0',
        backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
    },
    {
        backgroundColor: '#0093E9',
        backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
    },
    {
        backgroundColor: '#8EC5FC',
        backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'
    },
    {
        backgroundColor: '#D9AFD9',
        backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)'
    },
    {
        backgroundColor: '#2D3436',
        backgroundImage: 'linear-gradient(0deg, black, black)'
    },
    {
        backgroundColor: '#FBAB7E',
        backgroundImage: ' linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'
    },
    {
        backgroundColor: '#85FFBD',
        backgroundImage: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)'
    },
    {
        backgroundColor: ' #08AEEA',
        backgroundImage: ' linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)'
    },
    {
        backgroundColor: ' #21D4FD',
        backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
    },
    {
        backgroundColor: '#FF9A8B',
        backgroundImage: 'linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)'
    },
    {
        backgroundColor: '#c31432',
        backgroundImage: 'linear-gradient(90deg, #c31432, #240b36)'
    }
]

function EditNewTextStory({ setShowEditTextStory }) {
    const [text, setText] = useState('');
    const [selectValue, setSelectValue] = useState('Simple');
    const [colorValue, setColorValue] = useState('#ffffff');
    const [fontFamily, setFontFamily] = useState('Poppins');
    const [selectedBackground, setSelectedBackground] = useState(4);
    const [showDiscardBox, setShowDiscardBox] = useState(false);


    useEffect(() => {
        document.getElementById('newTextStoryPreviewInputField').style.fontSize = '22px';
        document.getElementById('newTextStoryPreviewInputField').style.textAlign = 'center';
        document.getElementById('newTextStoryPreviewInputField').style.borderWidth = '0px';
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.getElementById('newTextStoryPreviewInputField').style.color = colorValue;
        }, 150);
        return () => clearTimeout(timeout);
    }, [colorValue]);

    useEffect(() => {
        if (selectValue === 'Simple') document.getElementById('newTextStoryPreviewInputField').style.fontFamily = 'Poppins';
        else if (selectValue === 'Clean') document.getElementById('newTextStoryPreviewInputField').style.fontFamily = 'Raleway';
        else if (selectValue === 'Casual') document.getElementById('newTextStoryPreviewInputField').style.fontFamily = 'Caveat';
        else if (selectValue === 'Fancy') document.getElementById('newTextStoryPreviewInputField').style.fontFamily = 'Permanent Marker';
        else if (selectValue === 'Headline') document.getElementById('newTextStoryPreviewInputField').style.fontFamily = 'Russo One';
    }, [selectValue])

    return (
        <div id='editNewTextStoryContainer'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div id='createNewStoryCloseContainer' onClick={() => setShowDiscardBox(true)}>
                    <img src='https://i.ibb.co/Hd13mN0/wrong-black.png' alt='closeIcon' />
                </div>
                <div>
                    <div className='shareToStoryText'>Share to story</div>
                </div>

            </div>

            <div id='editNewTextStory-secondRow'>
                <div id='editNewTextStory-secondRow-left'>
                    <div id='editNewTextStory-secondRow-left-textInput'>
                        <label htmlFor="head" style={{ fontFamily: 'Poppins', marginBottom: '5px' }}>Text</label>
                        <TextField
                            fullWidth
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={4}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div id='editNewTextStory-secondRow-left-selectInput'>
                        <label htmlFor="head" style={{ fontFamily: 'Poppins', marginBottom: '5px' }}>Font</label>
                        <FormControl fullWidth>
                            <Select
                                displayEmpty
                                // labelId="font-type"
                                id="font-type"
                                value={selectValue}
                                // label="Font"
                                onChange={(e) => setSelectValue(e.target.value)}
                            >
                                <MenuItem value={'Simple'}>Simple</MenuItem>
                                <MenuItem value={'Clean'}>Clean</MenuItem>
                                <MenuItem value={'Casual'}>Casual</MenuItem>
                                <MenuItem value={'Fancy'}>Fancy</MenuItem>
                                <MenuItem value={'Headline'}>Headline</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div id='editNewTextStory-secondRow-left-colorInput'>
                        <label htmlFor="head" style={{ fontFamily: 'Poppins', marginRight: '10px' }}>Color</label>
                        <input style={{ width: '100%' }} type="color" id="head" name="head" value={colorValue} onChange={(e) => setColorValue(e.target.value)} />
                    </div>
                    <div id='editNewTextStory-secondRow-left-backgroundInput'>
                        <label htmlFor="background" style={{ fontFamily: 'Poppins', marginLeft: '5px', marginBottom: '10px' }}>Background</label>
                        <div id='backgroundsContainer'>
                            {backgrounds.map((background, idx) => {
                                return (<div key={idx}
                                    onClick={() => setSelectedBackground(idx)}
                                    className='backgroundColorItem' style={{
                                        backgroundColor: background.backgroundColor,
                                        backgroundImage: background.backgroundImage,
                                        borderRadius: '15px',
                                        border: selectedBackground === idx && '4px solid #1d9bf0',
                                        width: selectedBackground === idx && '32px',
                                        height: selectedBackground === idx && '32px',
                                        marginRight: '15px',
                                        marginTop: '2.5px'
                                    }}>

                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div id='editNewTextStory-secondRow-right'

                >
                    <div id='editNewTextStory-secondRow-right-actualPreview'
                        style={{
                            backgroundColor: backgrounds[selectedBackground].backgroundColor,
                            backgroundImage: backgrounds[selectedBackground].backgroundImage,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'

                        }}
                    >
                        <div id='editNewTextStory-secondRow-right-centerText'>
                            <TextField
                                id='newTextStoryPreviewInputField'
                                fullWidth
                                value={text}
                                multiline={true}
                                sx={{
                                    border: 'none',
                                    fontFamily: fontFamily,
                                    textAlign: 'center',
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <Modal open={showDiscardBox}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <DiscardChangesBox
                        discardHeading="Discard story?"
                        discardSubText={"Are you sure that you want to discard this story? Your story won't be saved."}
                        setKeepItOpened={setShowEditTextStory}
                        setShowDiscardChangesBox={setShowDiscardBox} />
                </div>
            </Modal>
        </div>
    )
}

export default EditNewTextStory;