import React, { useRef, useState } from 'react';
import { DotSeperator, MoreOptions, PostStat, TimeStamp } from '../../../Helper/Post/Helper';
import './styles.css';

function ReelItem({ profileSrc, accountName, accountHandle, reelSrc }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMute, setIsMute] = useState(true);
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);

    const toggleMute = () => {
        if (isMute) setIsMute(false)
        else setIsMute(true);
    }
    const togglePlay = () => {
        if (videoRef.current.paused) videoRef.current.play();
        else videoRef.current.pause();
    }

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    return (
        <div className='reelItem-container' onMouseLeave={() => setHovered(false)} onMouseOver={() => setHovered(true)}>
            <div className='reelItem-firstRow'>
                <div className='reelItem-firstRow-left'>
                    <div className='reelItem-firstRow-left-left'>
                        <img src={profileSrc} alt='img' />
                    </div>
                    <div className='reelItem-firstRow-left-right'>
                        <div className='reelItem-firstRow-left-right-top' style={{ display: 'flex' }}>
                            {accountName}
                            <DotSeperator />
                            <TimeStamp forReel='15px' />
                        </div>
                        <div className='reelItem-firstRow-left-right-bottom'>
                            {accountHandle}
                        </div>
                    </div>
                </div>
                <div className='reelItem-firstRow-right'><MoreOptions /></div>
            </div>
            <div className='reelItem-videoContainer' style={{ width: '100%', position: 'relative' }} >
                <video
                    style={{ width: '100%', position: 'relative' }}
                    // onClick={togglePlay}
                    onPlay={onPlay}
                    onPause={onPause}
                    ref={videoRef}
                    muted={isMute}
                    controls
                    className='reelItem-video'
                    src={reelSrc}
                />
                {/* <div style={{
                    position: 'absolute',
                    top: '5px',
                    backgroundColor: 'transparent',
                    width: '100%',
                    color: 'white',
                    // display:hovered?'flex':'none',
                    display: 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins'
                }}>
                    Title of the video
                </div>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    backgroundColor: 'transparent',
                    width: '100%',
                    color: 'white',
                    display: isPlaying ? 'none' : 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins'

                }}
                    onClick={togglePlay}
                >
                    <img src='https://i.ibb.co/pZ2tDqr/play-pause.png' alt='play/Pause' />
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '565px',
                    backgroundColor: 'transparent',
                    width: '100%',
                    color: 'white',
                    // display: isPlaying ? 'none' : 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    fontFamily: 'Poppins'

                }}
                    onClick={toggleMute}
                >
                    <img width='25px' height='25px' src={isMute ? 'https://i.ibb.co/hMgDWYF/mutegrey2.png' : 'https://i.ibb.co/PQ0Rk3Z/unmutegrey.png'} alt='play/Pause' />
                </div> */}

            </div>
            <div className='reelItem-iconsRow'>
                <div style={{ display: 'flex' }}>
                    <div>
                        <PostStat
                            type="view"
                            urlHovered={"https://i.ibb.co/SNJkZ73/views-blue.png"}
                            urlGrey={"https://i.ibb.co/JcZ4Fvh/views-grey.png"}
                            name={0}
                        />
                    </div>
                    <div>
                        <PostStat
                            type="like"
                            urlHovered={"https://i.ibb.co/2KkyVfp/heart-2.png"}
                            urlGrey={"https://i.ibb.co/qmB8Cp0/heart-1.png"}
                            name={0}
                        />
                    </div>
                    <div>
                        <PostStat
                            type="reply"
                            urlHovered={"https://i.ibb.co/Z8gC171/chat-1-1.png"}
                            urlGrey={"https://i.ibb.co/9WsBcdb/chat-1.png"}
                            name={0}
                        />
                    </div>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div className='greyHover' style={{ width: '34px', height: '34px' }}>
                        <img width='18.75px' height='18.75px' src="https://cdn-icons-png.flaticon.com/512/2099/2099085.png"
                        />
                    </div>
                    <div className='greyHover' style={{ width: '34px', height: '34px' }}>
                        <img width='18.75px' height='18.75px' src='https://i.ibb.co/F3qqdcX/bookmark-black-non-Filled.png' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReelItem