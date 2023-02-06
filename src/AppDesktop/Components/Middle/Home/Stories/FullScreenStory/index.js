import styled from '@emotion/styled';
import { LinearProgress, linearProgressClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './styles.css';

let interval;
let interval2;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 5,
    backgroundColor: "pink",
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "grey"
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: "white"
    }
}));


function FullScreenStory({ stories, setShowModal }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [leftHovered, setLeftHovered] = useState(false);
    const [rightHovered, setRightHovered] = useState(false);

    if (currentIndex >= stories.length) {
        // clearInterval(interval);
        setShowModal(false);
    }

    const goBack = () => {
        if (currentIndex === 0) {
            setProgress(0);
        }
        else {
            setProgress(0);
            setCurrentIndex(currentIndex => currentIndex - 1);
            clearInterval(interval);
            interval = setInterval(() => {
                setCurrentIndex(currentIndex => currentIndex + 1);
            }, 4500);
        }
    }
    const goAhead = () => {
        if (currentIndex === stories.length) {
            setShowModal(false);
        }
        else {
            setProgress(0);
            setCurrentIndex(currentIndex => currentIndex + 1);
            clearInterval(interval);
            interval = setInterval(() => {
                setCurrentIndex(currentIndex => currentIndex + 1);
            }, 4500);
        }
    }
    useEffect(() => {
        if (progress >= 100) setProgress(0);
    }, [progress]);

    useEffect(() => {
        let interval2 = setInterval(() => {
            setProgress(progress => progress + 1);
        }, 55);
        interval = setInterval(() => {
            setCurrentIndex(currentIndex => currentIndex + 1);
        }, 4500);


        return () => {
            clearInterval(interval);
            clearInterval(interval2);
        }
    }, [])
    if (!stories) return null;
    return (
        <div className='fullScreenStoryContainer'>
            <div style={{ marginRight: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'absolute', top: '35px', left: '70px' }}>
                    <img src='https://gcdnb.pbrd.co/images/ZzqtrAXSQj7c.png?o=1'
                        width='40px'
                        height='40px'
                        onClick={() => setShowModal(false)}
                    />
                </div>


                <img
                    width='48px'
                    height='48px'
                    src={leftHovered ? 'https://i.postimg.cc/FKrQm26y/image-left-white.png' : 'https://i.postimg.cc/0ydqT8V5/image-left-grey.png'}
                    onMouseOver={() => setLeftHovered(true)}
                    onMouseLeave={() => setLeftHovered(false)}
                    style={{ transition: '0.2s' }}
                    onClick={goBack}
                />


            </div>
            {/*  */}
            {/* */}
            <div className='fullScreenStoryItem'>
                <BorderLinearProgress
                    variant="determinate"
                    value={progress} />
                {stories[currentIndex].type === 'text' ?
                    <div
                        style={{
                            height:'100%',
                            backgroundImage: stories[currentIndex].backgroundImage,
                            color : stories[currentIndex].textColor,
                            fontFamily : stories[currentIndex].fontFamily,
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        {stories[currentIndex].text}
                    </div> :
                    <img
                        src={stories[currentIndex].imageSrc}
                        width='100%'
                        height='100%'

                    />
                }
            </div>
            <div style={{ marginLeft: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    width='48px'
                    height='48px'
                    src={rightHovered ? 'https://i.postimg.cc/L6jdP9Kk/image-8.png ' : 'https://i.postimg.cc/52mZPst6/image-7.png'}
                    onMouseOver={() => setRightHovered(true)}
                    onMouseLeave={() => setRightHovered(false)}
                    style={{ transition: '0.2s' }}
                    onClick={goAhead}
                />
            </div>
            {/* */}
        </div>
    )
}

export default FullScreenStory;