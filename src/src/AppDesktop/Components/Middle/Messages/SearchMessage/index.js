import React, { useState } from 'react';
import './styles.css';
import NavBarLink from '../../../Helper/NavBarLink';

const links = [
    'All',
    'People',
    'Groups',
    'Messages'
]
function SearchMessage({searchString}) {
    const [activeLink, setActiveLink] = useState('All');
    return (
        <div id='searchMessageNavBarLinksContainer'>
            {searchString.length?
             links.map((link) => {
                return <div key={link} className='searchMessageNavBarLink' onClick={() => setActiveLink(link)}>
                    <NavBarLink activeLink={activeLink} activeLinkHandler={setActiveLink}>{link}</NavBarLink>
                </div>
            }):
            <div>Try searching for people, groups, or messages</div>
            }
           
        </div>
    )
}

export default SearchMessage;