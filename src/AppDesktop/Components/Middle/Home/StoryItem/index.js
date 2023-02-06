import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FullScreenStory from '../Stories/FullScreenStory';
import './styles.css';

const transformation = (text) => {
    if (text.length > 1200) return text.slice(0, 1200);
    else return text;
}

function StoryItem({
    ownStory,
    wholeObj,
    children,
    imageSrc,
    scaleLevel,
    rotateLevel,
    text,
    fontFamily,
    textColor,
    backgroundColor,
    backgroundImage,
    stories
}) {
    const [showModal, setShowModal] = useState(false);
    const [textToBeDisplayed, setTextToBeDisplayed] = useState(text);

    // useEffect(() => {
    //     const afterTransformation = transformation(text);
    //     setTextToBeDisplayed(afterTransformation);
    // }, []);

    if (!children) return null;
    if (text) {
        console.log(backgroundColor, textColor)
        return (
            <>
                <div className='storyItemContainer'
                    style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                        backgroundImage: backgroundImage,
                        fontFamily: fontFamily,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onClick={() => setShowModal(true)}
                >
                    {text}
                </div>
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignContent: 'center' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div></div>
                            <FullScreenStory setShowModal={setShowModal} ownStory={ownStory} stories={stories} />
                            <div></div>
                        </div>

                    </div>
                </Modal>
            </>
        )
    }
    else {
        return (
            <>
                <div className='storyItemContainer'
                    onClick={() => setShowModal(true)}
                >
                    <img src={imageSrc} style={{ overflow: 'hidden', scale: scaleLevel * 0.1, rotate: `${rotateLevel}deg` }} />
                    <div className='storyItemContainerText'>
                        {children}
                    </div>
                </div>
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignContent: 'center' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div></div>
                            <FullScreenStory setShowModal={setShowModal} ownStory={ownStory} stories={stories} />
                            <div></div>
                        </div>

                    </div>
                </Modal>
            </>
        )
    }

}

export default StoryItem;