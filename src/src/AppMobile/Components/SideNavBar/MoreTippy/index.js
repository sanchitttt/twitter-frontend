import React from 'react';
import DropDown from './DropDown';
import './styles.css';


const dropdowns = [
    {
        heading: 'Creator Studio',
        items: [
            { text: 'Newsletters', src: 'https://i.postimg.cc/kXSXmj6P/newsletter.png' },
            { text: 'Analytics', src: 'https://i.postimg.cc/L6dnQy2w/stats-Edited.png' }
        ]
    },
    {
        heading: 'Professional Tools',
        items: [
            { text: 'Twitter for Professionals', src: 'https://i.postimg.cc/m2VF5Yks/rocket.png' },
            { text: 'Twitter Ads', src: 'https://i.postimg.cc/SNmMdTyd/ads.png' },
            { text: 'Monetization', src: 'https://i.postimg.cc/HW6yS0VC/monetization-2.png' }
        ]
    },
    {
        heading:'Settings and Support',
        items : [
            {text:'Settings and privacy' , src:'https://i.ibb.co/gFhLDhC/settings-icon.png'},
            {text:'Help Center'  , src:'https://i.postimg.cc/90YqVTBy/help.png'},
            {text:'Display', src:'https://i.postimg.cc/6qXGDzC9/brush.png'},
            {text:'Keyboard shortcuts' , src:'https://i.postimg.cc/k5LSy74R/keyboard-shortcuts.png'}
        ]
    }

]
function MoreTippy() {
    return (
        <div id='more-tippy-m'>
            <div id='more-tippy-bottom'>
                {dropdowns.map((dropdown,idx) => {
                    return <DropDown key={idx} heading={dropdown.heading} items={dropdown.items} />
                })}

            </div>

        </div>
    )
}

export default MoreTippy;