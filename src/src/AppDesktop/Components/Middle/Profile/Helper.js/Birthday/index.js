import React from 'react';
import './styles.css';

function Birthday({ birthday }) {
    return (
        <div className='birthday-container'>
            <div className='birthday-img'>
                <img src='https://i.ibb.co/sWSBFhm/location-grey.png' alt='locationIcon' />
            </div>
            <div style={{fontFamily:'Poppins'}}>
                {birthday}
            </div>
        </div>
    )
}

export default Birthday;