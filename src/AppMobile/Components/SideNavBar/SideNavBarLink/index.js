import React from 'react';
import './styles.css';

function SideNavBarLink({src,children}) {
  return (
    <div className='sideNavBarLink'>
        <div className='sideNavBarLink-imgContainer'>
        <img src={src} alt='navBarItemIcon' />
        </div>
        <div className='sideNavBarLink-text'>
            {children}
        </div>
      
    </div>
  )
}

export default SideNavBarLink;