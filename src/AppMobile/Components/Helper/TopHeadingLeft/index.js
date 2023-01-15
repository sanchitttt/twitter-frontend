import React from 'react';
import './styles.css';

function TopHeadingLeft({url,url1Handler,children}) {
  return (
    
    <div className='topHeadingLeft'>
        <div className='topHeadingLeftImg'
        onClick={url1Handler}
        >
            <img 
            src={url}
            alt='icon'
            />
        </div>
        <div className='topHeadingLeftText'>
            {children}
        </div>
    </div>
  )
}

export default TopHeadingLeft;