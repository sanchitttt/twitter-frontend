import React from 'react';
import './styles.css';

function TweetsPreferenceTippy({ type, typeHandler }) {

    const clickHandler = () => {
        if (type === 'latest') typeHandler('home')
        else typeHandler('latest');
    }
    return (
        <div className='tweetsPreferenceTippy'>
            <div className='tweetsPreferenceTippyImgContainer'>
                <img className='tweetPreferenceTippyImg'
                    src={type === 'latest' ?
                        'https://cdn-icons-png.flaticon.com/512/1293/1293345.png' :
                        'https://i.postimg.cc/3NL5ZTVv/home-small.png'}
                    alt='updatedClock' />
            </div>
            <div className='tweetPreferenceMainText'>
                {type === 'latest' ?
                    'Latest Tweets show up as they happen' :
                    'Home shows you top Tweets first'
                }
            </div>
            {/* <div className='tippyWidgets-master-container'> */}
            <div className='tweetsPreferenceTippyWidget-container'
                onClick={clickHandler}
            >
                <div className='tweetsPreferenceTippyWidget-imgContainer'>
                    <img
                        src='https://cdn-icons-png.flaticon.com/512/3031/3031715.png'
                        alt='icon'
                        width={'18.75px'}
                        height='18.75px'
                    />
                </div>
                <div className='tweetsPreferenceTippyWidget-text'>
                    <div className='darkText'>
                        {type === 'latest' ?
                            'Go back Home' :
                            "See latest Tweets instead"
                        }
                    </div>
                    <div className='lightText'>
                        {type === 'latest' ?
                            "You'll see top Tweets first." :
                            "You'll see Twees show up as they happen."
                        }
                    </div>
                </div>
            </div>
            <div className='tweetsPreferenceTippyWidget-container borderR15'
            >
                <div className='tweetsPreferenceTippyWidget-imgContainer'>
                    <img
                        src="https://i.ibb.co/gFhLDhC/settings-icon.png"
                        alt="settingsIcon"
                        width={'18.75px'}
                        height='18.75px'
                        style={{ marginTop: '5px' }}
                    />
                </div>
                <div className='darkText'>
                    View content preferences
                </div>
            </div>
            {/* </div> */}

        </div>
    )
}

export default TweetsPreferenceTippy;