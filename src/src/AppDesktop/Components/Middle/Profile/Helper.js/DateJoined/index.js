import React from 'react';
import './styles.css';

const monthsArr = [
    "Janurary",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
function DateJoined({ dateJoined }) {
    const newDate = new Date(`${dateJoined}`);
    const month = monthsArr[newDate.getMonth()];
    const year = newDate.getFullYear();
    // console.log(newDate.toISOString());
    return (
        <div className='dateJoined-container'>
            <div className='dateJoined-img'>
                <img src='https://i.ibb.co/y6T74C7/calendar-grey.png' alt='locationIcon' />
            </div>
            <div style={{fontFamily:'Poppins'}}>
                Joined {month}, {year}
            </div>
        </div>
    )
}

export default DateJoined;