import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from '../../../../config/config';
import axios from 'axios';


const SearchItem = () => {
  return <div>
    hi
  </div>
};
const SearchItems = ({ items }) => {
  return (
    <div id="searchBarTippy">
      {items.length === 0 ? (
        <div id="searchBarTippyNoItemsText">
          Try searching for people, topics, or keywords
        </div>
      ) : (
        items.map((item, idx) => {
          return <SearchItem key={idx} />;
        })
      )}
    </div>
  );
};

export default function SearchBar() {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        let result = await axios.get(`${BACKEND_URL}/other/searchBar`, {
          withCredentials: true, params: {
            text: text
          }
        });
        console.log(result.data)
        setItems(result.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    let timeoutId = setTimeout(() => {
      fetch();
    }, 750)

    return () => {
      clearTimeout(timeoutId);
    }
  }, [text]);
  const clickHandler = () => {
    setIsHovered(true);
    myRef.current.focus();
  };

  const textHandler = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const searchBar = document.getElementById(
        "rightSide-searchBar-container"
      );

      if (searchBar) {
        if (searchBar.contains(e.target)) {
          // Do nothing
        } else {
          setIsHovered(false);
        }
      }

    });
    return () => {
      document.removeEventListener("click", (e) => { });
    };
  }, []);
  const myRef = useRef(null);

  useEffect(() => {
    setItems(text.split(""));
  }, [text]);
  return (
    <div id="searchBarMasterContainer">
      <div
        id="rightSide-searchBar-container"
        onClick={clickHandler}
        style={{
          border:
            isHovered
              ? "1px solid #1D9BF0"
              : "1px solid white",
          transition: isHovered && "0.2s"
        }}
      >
        <div id="rightSide-searchIcon">
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
        {/* <div className="rightSide-searchBar"> */}
        <input
          style={{ fontFamily: 'Poppins' }}
          type="text"
          placeholder="Search Twitter"
          id="rightSideSearchBarInput"
          ref={myRef}
          value={text}
          onChange={textHandler}
          autoComplete="off"
        />
        <div
          id="searchBarCloseIcon"
          onClick={() => {
            setText("");
          }}
        >
          {text.length !== 0 && (
            <img
              src="https://i.ibb.co/M6KDn1J/remove-blue.png"
              width="22px"
              height="22px"
              alt="close_icon"
            />
          )}
        </div>
      </div>
      {isHovered && <SearchItems items={items} />}
    </div>
  );
}
