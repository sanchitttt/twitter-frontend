import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../config/config";
import Post from '../../Helper/Post'
import Posts from "../PostsFeed";
import "./styles.css";


function Bookmarks() {
  const [data,setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/pages/bookmarks`, { withCredentials: true });
        console.log(`result.data = `, result.data);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [])
  return (
    <div id="bookmarks">
      <div id="bookmarks-topRow">
        <div id="bookmarks-topRow-left">
          <div id="bookmarks-topRow-left-top" style={{ fontFamily: 'Poppins' }}>Bookmarks</div>
          <div id="bookmarks-topRow-left-bottom" style={{ fontFamily: 'Poppins' }}>@lasertoch</div>
        </div>
        <div id="bookmarks-topRow-right">
          <img
            src="https://i.ibb.co/TkBBFTj/dots-1.png"
            width="16px"
            height="16px"
            alt="moreOptions-icon"
          />
        </div>
      </div>
      <div id="bookmarked-posts">
        {data.map((post, idx) => {
          return (
            <Posts
              idx={idx}
              key={idx}
              profileSrc={post.profileSrc}
              accountName={post.accountName}
              accountHandle={post.accountHandle}
              verified={post.verified}
              postsArr={data}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
