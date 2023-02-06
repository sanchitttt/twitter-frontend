import React, { useEffect, useState } from 'react'
import LeftSide from './Components/LeftNavbar/index';
import BackgroundContext from './Contexts/BackgroundContext';
import ColorContext from './Contexts/ColorContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ExplorePage from './Pages/Explore/index';
import MessagesPage from './Pages/Messages/index';
import NotificationsPage from './Pages/Notifications/index';
import ListsPage from './Pages/Lists/index';
import ProfilePage from './Pages/Profile/index';
import BookmarksPage from './Pages/Bookmarks/index';
import './styles.css';
import MessageSettingsPage from './Pages/Messages/MessageSettings';
import MessageChatPage from './Pages/Messages/MessageChat';
import LogOutPage from './Pages/Logout';
import NotLoggedIn from './Components/NotLoggedIn';
import SuccessfullLogin from './Components/NotLoggedIn/SuccessfulLogin';
import axios from 'axios';
import { BACKEND_URL } from '../config/config';
import ErrorBoundary from '../ErrorBoundary';
import ReelsPage from './Pages/ReelsPage';
import AccountDetailsContext from './Contexts/AccountDetailsContext';
import TweetPage from './Pages/TweetPage';

let accountDetails;
function AppDesktop() {
  const [backgroundColorContext, setBackgroundColorContext] = useState('white');
  const [colorContext, setColorContext] = useState('#009BF0')
  const [whoToFollowArr, setWhoToFollowArr] = useState([]);
  const [userDetails, setUserDetails] = useState();


  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/other/whoToFollow`, { withCredentials: true });
        console.log(result.data);
        setWhoToFollowArr(result.data);
      } catch (error) {
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        let result = await axios.get(`${BACKEND_URL}/other/getAccountDetails`, { withCredentials: true });
        console.log(result.data);
        setUserDetails(result.data);
      } catch (error) {
        if (error.status === 401) {
        }
        // throw error;
      }
    }
    fetch();
  }, []);
  return (
    <div id="AppDesktop">
      <BackgroundContext.Provider value={{ backgroundValue: backgroundColorContext, backgroundHandler: setBackgroundColorContext }}>
        <ColorContext.Provider value={{ colorValue: colorContext, colorHandler: setColorContext }}>
          <AccountDetailsContext.Provider value={userDetails}>
           
              {/* <ErrorBoundary> */}
              <LeftSide />
              <Routes>
                <Route path="/" element={<NotLoggedIn />} />
                <Route path='/login/success' element={<SuccessfullLogin />} />
                <Route path='/logout' element={<LogOutPage />} />
                <Route path='/home' element={<HomePage whoToFollowArr={whoToFollowArr} />} />
                <Route path="/:accountHandle/status/:tweetId" element={<TweetPage />} />
                <Route path='/explore' element={<ExplorePage whoToFollowArr={whoToFollowArr} />} />
                <Route path='/reels' element={<ReelsPage whoToFollowArr={whoToFollowArr} />} />
                <Route path='/notifications' element={<NotificationsPage whoToFollowArr={whoToFollowArr} />} />
                <Route path='/profile/:accountHandle' element={<ProfilePage whoToFollowArr={whoToFollowArr} />} />
                <Route path='/messages'>
                  <Route path='' element={<MessagesPage />} />
                  <Route path='settings' element={<MessageSettingsPage />} />
                  <Route path='compose' />
                  <Route path=':id' element={<MessageChatPage />} />
                </Route>
                <Route path='/lists' element={<ListsPage />} />
                <Route path='/profile' element={<ProfilePage whoToFollowArr={whoToFollowArr} />} />
                <Route path='/bookmarks' element={<BookmarksPage whoToFollowArr={whoToFollowArr} />} />
              </Routes>
              {/* </ErrorBoundary> */}
            
          </AccountDetailsContext.Provider>
        </ColorContext.Provider>
      </BackgroundContext.Provider>

    </div >
  );
}

export default AppDesktop