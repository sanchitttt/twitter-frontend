import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import './styles.css';

function DropDown({ heading, items }) {
    const [show, setShow] = useState(false);
    const toggler = () => {
        if (show) setShow(false)
        else setShow(true);
    }
    return (
        <div className='dropDown-container'>
            <div className='dropDown-heading blackHover' onClick={toggler}>
                <div className='dropDown-heading-text'>{heading}</div>
                <div className='dropDown-heading-imgContainer'>
                    <img
                        src={show ? 'https://i.postimg.cc/9QXjgV90/up-arrow-blue.png' : 'https://i.postimg.cc/Ss90YxBT/down-arrow.png'}
                        alt='icon'
                        width={'13px'}
                        height={'13px'}
                    /></div>
            </div>
            {show && <div className='dropDown-itemsContainer'>
                {items.map((item) => {
                    return <div className='dropDown-itemContainer blackHover'>

                            <div className='dropDown-item-imgContainer'>
                                <img src={item.src}
                                    alt='icon'
                                    width='18px'
                                    height='18px'
                                /></div>
                            <div className='dropDown-item-text'>{item.text}</div>
                        </div>
                })}
            </div>}

        </div >
    )
}

export default DropDown;