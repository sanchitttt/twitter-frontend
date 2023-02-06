import React, { useEffect, useState } from "react";
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  PostStats,
  AccountDetailsAndScreenshotAndMore,
  TweetAttachments,
  TaggedHandles,
  TweetPostText,
  PostWhoLikedOrCommented,
  PollViewer,
  PostStatForIndividualTweet,
  DetailedPostStats
} from './Helper';
import axios from "axios";
import { BACKEND_URL } from "../../../../config/config";
import HomePost from "../../Middle/Home/HomePost";
import { Modal } from "@mui/material";
import DiscardChangesBox from "../../Middle/Profile/EditProfile/DiscardChanges";
import { useNavigate } from 'react-router-dom';


const showToastify = () => {
  toast.success('Tweet bookmarked!', {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

const showFollowedToastify = (accountHandle) => {
  toast.success(`You're noow following ${accountHandle} !`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

const showErrorToastify = () => {
  toast.error('Bookmark already saved!', {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

const alreadyFollowToastify = (accountHandle) => {
  toast.warn(`You're already following ${accountHandle}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}


const showInfoToastify = () => {
  toast.info('Feedback noted!', {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

const Post = ({
  length,
  idx,
  index,
  activeIndex,
  id,
  poll,
  profileSrc,
  isAThread,
  accountName,
  accountHandle,
  verified,
  typeOfVerification,
  timeStamp,
  tweetText,
  taggedHandles,
  whoCanReply,
  views,
  replies,
  retweets,
  likes,
  attachments,
  relation,
  likedAlready,
  alreadyVoted,
  retweetedAlready,
  originalTweetThread,
  replyCount,
  forIndividualTweet

}) => {
  const navigate = useNavigate();
  const [replyModal, setShowReplyModal] = useState(false);
  const [showDiscardBox, setShowDiscardBox] = useState(false);

  const bookmarkTweetFn = () => {
    const fetch = async () => {
      try {
        const payload = {
          length: length,
          idx: idx,
          id: id,
          poll: poll,
          profileSrc: profileSrc,
          // isAThread: isAThread,
          // tweets: isAThread ? originalTweetThread : false,
          accountName: accountName,
          accountHandle: accountHandle,
          verified: verified,
          typeOfVerification: typeOfVerification,
          timeStamp: timeStamp,
          tweetText: tweetText,
          taggedHandles: taggedHandles,
          whoCanReply: whoCanReply,
          views: views,
          replies: replies,
          retweets: retweets,
          likes: likes,
          attachments: attachments,
          relation: relation,
          retweetedAlready: retweetedAlready,
          likedAlready: likedAlready,
          alreadyVoted: alreadyVoted,

        }
        // isAThread ? {
        //   length: length,
        //   idx: idx,
        //   id: id,
        //   poll: poll,
        //   profileSrc: profileSrc,
        //   isAThread: isAThread,
        //   tweets: isAThread ? originalTweetThread : false,
        //   accountName: accountName,
        //   accountHandle: accountHandle,
        //   verified: verified,
        //   typeOfVerification: typeOfVerification,
        // } : 
        const result = await axios.post(`${BACKEND_URL}/pages/bookmarks`, {
          tweetBody: {
            ...payload
          }
        }, { withCredentials: true });
      } catch (error) {
        throw error;
      }
    }
    fetch();
  }
  let height;
  let height2;

  if (attachments && attachments.length && poll && poll.options) {
    let optionsLength = (poll.options.length) * 30 + 22.5;
    height = `${Math.ceil((tweetText.length / 70) * 23) + 65 + 500 + optionsLength}px`;
    height2 = `${Math.ceil((tweetText.length / 70) * 23) + 35 + 500 + optionsLength}px`;
  }
  if (attachments && attachments.length && !poll || !poll.options || !poll.options.length) {
    height = `${Math.ceil((tweetText.length / 70) * 23) + 500}px`;
    height2 = `${Math.ceil((tweetText.length / 70) * 23) + 500}px`;
  }
  if (poll && poll.options) {
    let optionsLength = (poll.options.length) * 30 + 22.5;
    height = `${Math.ceil((tweetText.length / 70) * 23) + 85 + optionsLength}px`;
    height2 = `${Math.ceil((tweetText.length / 70) * 23) + 55}px`;
  }
  else {
    height = `${Math.ceil((tweetText.length / 70) * 23) + 65}px`;
    height2 = `${Math.ceil((tweetText.length / 70) * 23) + 55}px`;
  }
  return (
    <>
      <div className="post-card-container" id=''

      >
        <div className="postCard-leftSide-container" style={{ position: 'relative' }}>
          <img
            src={profileSrc}
            style={{ width: "48px", height: "48px", borderRadius: "999px" }}
            alt="profile_picture"
          />
          {isAThread && idx !== length - 1 && idx < activeIndex && <div style={{ left: '24px', top: '48px', background: '#CFD9DE', width: '2px', height: height, position: 'absolute' }}></div>}
        </div>
        <div className="postCard-rightSide-container">
          {/* <PostWhoLikedOrCommented type="replied"> */}
          {/* {relation === 'retweet' ? 'You retweeted' : 'Somebody liked your post'} */}
          {/* </PostWhoLikedOrCommented> */}
          <AccountDetailsAndScreenshotAndMore
            idx={idx}
            accountName={accountName}
            accountHandle={accountHandle}
            verified={verified}
            typeOfVerification={typeOfVerification}
            timeStamp={timeStamp}
            bookmarkTweetFn={bookmarkTweetFn}
            showToastify={showToastify}
            showErrorToastify={showErrorToastify}
            showInfoToastify={showInfoToastify}
            showFollowToastify={showFollowedToastify}
            alreadyFollowToastify={alreadyFollowToastify}
            id={id}
          />
          <div onClick={() =>
            navigate(`/${accountHandle}/status/${id}`)
          }><TweetPostText>{tweetText}</TweetPostText></div>
          <PollViewer alreadyVoted={alreadyVoted} id={id} accountHandle={accountHandle} poll={poll} />
          <TweetAttachments data={attachments} />
          {/* <TaggedHandles data={taggedHandles} /> */}

          {(!forIndividualTweet || (index !== null && activeIndex !== null && index !== activeIndex)) &&
            <PostStats
              accountHandle={accountHandle}
              id={id}
              likedAlready={likedAlready}
              retweetedAlready={retweetedAlready}
              views={views}
              replies={replies}
              retweets={retweets}
              likes={likes}
              share={null}
              setShowReplyModal={setShowReplyModal}
              replyCount={replyCount}
            />}
          {forIndividualTweet && idx === activeIndex &&
            <PostStatForIndividualTweet timestamp={timeStamp}
            />}

        </div>

      </div>
      <Modal open={replyModal}>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ borderRadius: '15px', width: '600px', height: '525px', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <div id='editProfileTopRowLeftImgContainer' onClick={() => setShowDiscardBox(true)}>
                  <img src='https://i.ibb.co/Hd13mN0/wrong-black.png' alt='closeIcon' />
                </div>
              </div>
              <div>
                <div className="post-card-container" id=''
                  style={{ border: 'none', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                >
                  <div className="postCard-leftSide-container" style={{ marginLeft: '10px', position: 'relative', marginTop: '5px !important' }}>
                    <img
                      src={profileSrc}
                      style={{ width: "48px", height: "48px", borderRadius: "999px", zIndex: '2000' }}
                      alt="profile_picture"

                    />
                    <div style={{ left: '24px', top: '48px', background: '#CFD9DE', width: '2px', height: height2, position: 'absolute' }}></div>
                  </div>
                  <div className="postCard-rightSide-container">
                    {/* <PostWhoLikedOrCommented type="replied"> */}
                    {/* {relation === 'retweet' ? 'You retweeted' : 'Somebody liked your post'} */}
                    {/* </PostWhoLikedOrCommented> */}
                    <AccountDetailsAndScreenshotAndMore
                      idx={idx}
                      forReply={true}
                      accountName={accountName}
                      accountHandle={accountHandle}
                      verified={verified}
                      typeOfVerification={typeOfVerification}
                      timeStamp={timeStamp}
                      bookmarkTweetFn={bookmarkTweetFn}
                      showToastify={showToastify}
                      id={id}
                    />
                    <TweetPostText>{tweetText}</TweetPostText>
                    <PollViewer alreadyVoted={alreadyVoted} id={id} accountHandle={accountHandle} poll={poll} />
                    <TweetAttachments data={attachments} />
                    {/* <TaggedHandles data={taggedHandles} /> */}

                    {!forIndividualTweet && <PostStats
                      accountHandle={accountHandle}
                      id={id}
                      likedAlready={likedAlready}
                      retweetedAlready={likedAlready}
                      views={views}
                      replies={replies}
                      retweets={retweets}
                      likes={likes}
                      share={null}
                    />}
                  </div>

                </div>
                <HomePost replyObj={
                  {
                    accountHandle: accountHandle,
                    accountName: accountName,
                    profileSrc: profileSrc,
                    verified: verified,
                    typeOfVerification: typeOfVerification
                  }
                } idd={id} accountHandle={accountHandle} setShowReplyModal={setShowReplyModal} forReply={true} placeholder={"Tweet your reply"} />
              </div>
            </div>
            {showDiscardBox && <Modal open={showDiscardBox}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <DiscardChangesBox setShowDiscardChangesBox={setShowDiscardBox} setEditProfileOpen={setShowReplyModal} />
              </div>
            </Modal>}
          </div>


        </div>
      </Modal>

      {/* </div> */}
      <ToastContainer

        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </>
  );
};

export default Post;
