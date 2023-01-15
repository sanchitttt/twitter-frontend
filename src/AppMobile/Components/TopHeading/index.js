import React from 'react';
import TopHeadingLeft from '../Helper/TopHeadingLeft';
import './styles.css';

function TopHeading({ url1, url2, url1Handler, children }) {
    return (
        <div className='pageTop'>
            <TopHeadingLeft 
            url={url1} url1Handler={url1Handler}>
            Home
            </TopHeadingLeft>
            <div className='pageTopRight'>
                {url2 !== null &&
                    <img
                        src={url2}
                        alt='icon'
                    />
                }

            </div>
        </div>
    )
}

export default TopHeading;