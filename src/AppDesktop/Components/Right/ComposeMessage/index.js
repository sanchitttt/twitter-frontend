import React, { useRef, useState } from 'react';
import './styles.css';

function ComposeMessage() {
    const [isHovered, setIsHovered] = useState(false);

    const [text, setText] = useState('');

    const textHandler = (e) => {
        setText(e.target.value);
    }

    const myRef = useRef(null);

    return (
        <div id='compose-message'>
            <div id='compose-message-heading'>
                <div id='compose-message-heading-image'>
                    <img src='https://i.postimg.cc/L4Y528fg/wrong-black.png' alt='closeIcon' />
                </div>
                <div id='compose-message-heading-text'>New message</div>
                <div id='compose-message-next-btn'>Next</div>
            </div>
            <div id='compose-message-searchBar' onClick={() => setIsHovered(true)}>
                <div id='compose-message-searchBar-left'>
                    <img
                        src={
                            isHovered
                                ? "https://i.ibb.co/cQ55252/search-blue.png"
                                : 'https://i.ibb.co/sJkgyPn/search-grey.png" alt="search-grey'
                        }
                        width="16px"
                        height="16px"
                        alt="searchIcon"
                    />
                </div>
                <div id='compose-message-searchBar-right'>
                    <input
                        style={{ fontFamily: 'Poppins' }}
                        type="text"
                        placeholder="Search people"
                        id="compose-message-searchBar-input"
                        ref={myRef}
                        value={text}
                        onChange={textHandler}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    )
}

export default ComposeMessage;