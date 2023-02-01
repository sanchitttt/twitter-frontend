import React from 'react';
import './styles.css';

function StoryItem({ children, src }) {
    return (
        <div className='storyItemContainer'>
            <img src={src} />
            <div className='storyItemContainerText'>
                {children}
            </div>
        </div>
    )
}

export default StoryItem;