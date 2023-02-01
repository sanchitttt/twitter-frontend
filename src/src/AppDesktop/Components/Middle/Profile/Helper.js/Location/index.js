import React from 'react';
import './styles.css';

function Location({ location }) {
    return (
        <div className='location-container'>
            <div className='location-img'>
                <img src='https://i.ibb.co/sWSBFhm/location-grey.png' alt='locationIcon' />
            </div>
            <div style={{fontFamily:'Poppins'}}>
                {location}
            </div>
        </div>
    )
}

export default Location;