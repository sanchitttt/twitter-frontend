import React, { useEffect, useState } from 'react';
import NavBarLink from '../../../Helper/NavBarLink';
import './styles.css';

const links = [
  'All',
  'Verified',
  'Mentions'
]


function NotificationsNavBar() {
  const [activeLink, setActiveLink] = useState("All");
 
  
  return (
    <div id='notifications-navBarAndItems'>
        <div id="notifications-navBar">
        {links.map((link, idx) => {
          return <div key={idx} 
          className='notificationsNavBarLinkContainer' 
          onClick={() => setActiveLink(link)}>
            <NavBarLink activeLink={activeLink} activeLinkHandler={setActiveLink}>{link}</NavBarLink>
          </div>
        })}
        <div id='notifications-navBarItems'>
          {/* {activeLink === 'Verified' && } */}
        </div>
      </div>
    </div>
  
  )
}

export default NotificationsNavBar;