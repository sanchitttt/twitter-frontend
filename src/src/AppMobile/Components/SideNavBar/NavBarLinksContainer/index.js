import React from 'react';
import SideNavBarLink from '../SideNavBarLink';
import './styles.css';



const links = [
  ['Profile', 'https://i.ibb.co/k4zvv8N/user-inactive.png'],
  ['Topics', 'https://i.ibb.co/W6KG3ML/chat.png'],
  ['Bookmarks', 'https://i.ibb.co/F3qqdcX/bookmark-black-non-Filled.png'],
  ['Lists', 'https://i.ibb.co/Tgkj8VN/lists-black-non-Filled.png'],
  ['Twitter Circle', 'https://i.ibb.co/Y7qb4FK/twitter-circle.png'],
]

function SideNavBarLinksContainer() {
  return (
    <div id='sideNavBarLinksContainer'>
      {links.map((link) => {
        return <SideNavBarLink key={link[0]} src={link[1]}>{link[0]}</SideNavBarLink>
      })}
    </div>
  )
}

export default SideNavBarLinksContainer;