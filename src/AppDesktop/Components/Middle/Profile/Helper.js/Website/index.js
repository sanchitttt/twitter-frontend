import React from 'react';
import './styles.css';

function Website({url}) {
  return (
    <div className='website-container'>
        <div className='website-img'>
            <img src='https://i.ibb.co/8YSps4Y/link-grey.png' alt='urlIcon' />
        </div>
        <div className='isALink' style={{fontFamily:'Poppins'}}>
            {url}
        </div>
    </div>
  )
}

export default Website;