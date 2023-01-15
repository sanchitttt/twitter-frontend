import React from 'react';
import SideNavBarLinksContainer from './NavBarLinksContainer';
import MoreTippy from './MoreTippy'
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SideNavBar() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
      const result = await axios.post('http://localhost:8082/auth/logout', {}, {withCredentials:true});
      navigate('/');
  }
  return (
    <div id='sideNavBar'>
      <div id='sideNavBarTop'>
        <div id='sideNavBarTopText'>Account Info</div>
        <div id='sideNavBarTopImageContainer'>
          <img
            src='https://i.postimg.cc/L4Y528fg/wrong-black.png'
            alt='closeIcon'
          />
        </div>
      </div>
      <div id='sideNavBarSecondRow'>
        <div id='sideNavBarSecondRowFirst'>
          <img
          class='rounded-img'
            src='https://pbs.twimg.com/profile_images/1555754123420913664/P0uQDM-b_400x400.jpg'
            alt='closeIcon'
            width='40px'
            height='40px'
          />
          <div style={{marginRight:'10px'}}
          onClick={logoutHandler}
          >
            <img
              src='https://cdn-icons-png.flaticon.com/512/1828/1828479.png'
              alt='closeIcon'
              width='22px'
              height='22px'
              id='sideNavBarLogoutIcon'
            />
          </div>

        </div>
        <div id='sideNavBarThirdRow'>
          marKE9150
        </div>
        <div id='sideNavBarFourthRow'>
          @lasertoch
        </div>
        <div id='sideNavBarFifthRow'>
          <div className='flexbox-row mr-10'><span className='fontBold'>521 </span> Following</div>
          <div className='flexbox-row'><span className='fontBold'>37 </span> Followers</div>
        </div>
        <SideNavBarLinksContainer />
        <MoreTippy />
      </div>
    </div>
  )
}

export default SideNavBar;