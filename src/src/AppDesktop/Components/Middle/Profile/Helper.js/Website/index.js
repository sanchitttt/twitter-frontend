import React from 'react';
import './styles.css';

function Website({ url }) {
  return (
    <div className='website-container'>
      <div className='website-img'>
        <img src='https://i.ibb.co/8YSps4Y/link-grey.png' alt='urlIcon' />
      </div>
      <div className='isALink'>
        <a href={url} style={{ color:'#1D9BF0',fontSize: '15px', textDecoration: 'none', fontFamily: 'Poppins' }} target='_blank'>{url}</a>
      </div>
    </div>
  )
}

export default Website;