import React, { useReducer } from 'react';
import './styles.css';


const conditions = [
    { heading: 'Allow message requests from everyone', subText: 'Let people who you don’t follow send you message requests and add you to group conversations. To reply to their messages, you need to accept the request. Learn more' },
    { heading: 'Filter low-quality messages', subText: 'Hide message requests that have been detected as being potentially spam or low-quality. These will be sent to a separate inbox at the bottom of your message requests. You can still access them if you want. Learn more' },
    { heading: 'Show read receipts', subText: 'Let people you’re messaging with know when you’ve seen their messages. Read receipts are not shown on message requests. Learn more' },

]

const initialState = {
    '0': false,
    '1': false,
    '2': false
}

const reducerFn = (state, action) => {
    switch (action.type) {
        case 0:
            if (state[`${'0'}`]) return { ...state, '0': true }
            else return { ...state, '0': false }
        case 1:
            if (state[`${'1'}`]) return { ...state, '1': true }
            else return { ...state, '1': false }
        case 2:
            if (state[`${'2'}`]) return { ...state, '2': true }
            else return { ...state, '2': false }
    }
}

function MessageSettings() {
    const [checked, dispatch] = useReducer(reducerFn, initialState);
    return (
        <div id='message-settings-box'>
            <div id='message-settings-heading'>
                <div id='message-settings-heading-left'>
                    <div id='message-settings-heading-left-imgContainer'>
                        <img src='https://i.ibb.co/TTBVLht/left-arrow.png'
                            alt='searchBarCloseIcon' />
                    </div>
                    <div id='message-settings-heading-left-right'>
                        Direct messages
                    </div>
                </div>
                <div></div>
            </div>
            <div id='message-settings-bottom'>
                <div className='message-settings-bottom-small'>Manage who can message you directly.</div>
                {conditions.map((condition, idx) => {
                    return <div className='message-setting-bottom-container'>

                        <div className='message-setting-bottom-checkMark-container'>
                            <div className='message-setting-bottom-checkMark-container-text'>{condition.heading}</div>
                            <div>
                                <input type="checkbox" id={idx} name={idx} value={checked[`${idx}`]} />
                            </div>
                        </div>
                        <div className='message-settings-bottom-small'>
                            {condition.subText}
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default MessageSettings;