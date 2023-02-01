import React, { useEffect, useRef, useState } from 'react';
import MessagesDMS from '../MessagesDMS';
import SearchMessage from '../SearchMessage';
import './styles.css';

function MessageSearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [showDmsOrShowResults, setShowDmsOrShowResults] = useState('dms');
  const [isClicked,setIsClicked] = useState(false);


  const myRef = useRef(null);


  const clickHandler = () => {
    setIsFocused(true);
    if(!isClicked) setIsClicked(true);
    myRef.current.focus();
  }

  const textHandler = (e) => {
    setText(e.target.value);
  }

  const blurHandler = () => {
    setIsFocused(false);
  }

  const focusHandler = () => {
    if(!isClicked) setIsClicked(true);
    setIsFocused(true);
  }


  return (
    <div id='messageSearchBarAndDMSContainer'>
      <div id='messageSearchBarContainer' onClick={clickHandler}>
        {isClicked && <div id='messageSearchBarCloseIcon'
        onClick={() => {
          setIsClicked(false);
          setText('');
        }}
        >
          <img src='https://i.ibb.co/TTBVLht/left-arrow.png' alt='searchBarCloseIcon' />
        </div>}
        <div id='messageSearchBar'
          style={{
            border: isFocused ? '1px solid rgb(29, 155, 240)' : '1px solid #eff3f4'
          }}
        >
          <div id='messageSearchBarImgContainer'>
            <img
              id='messageSearchBarImg'
              src='https://i.ibb.co/sJkgyPn/search-grey.png" alt="search-grey'
              width="15px"
              height="15px"
              alt="searchIcon"
            />
          </div>
          <div>
            <input
              id='messageSearchBarInput'
              placeholder='Search Direct Messages'
              ref={myRef}
              value={text}
              onChange={textHandler}
              onFocus={focusHandler}
              onBlur={blurHandler}
            />
          </div>

        </div>
      </div>
      <div>
        {!isClicked ? <MessagesDMS /> : <SearchMessage searchString={text} />}
      </div>
    </div>
  )
}

export default MessageSearchBar;