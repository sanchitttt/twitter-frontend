import React, { useContext } from 'react'
import NavButtonM from '../NavButtonM/index';
import './styles.css';


const navBar = [
    ['https://i.ibb.co/DrhfvL5/home-black-non-Filled.png',],
    ['https://i.ibb.co/9vt0Qxj/search-non-Filled.png',],
    ['https://i.ibb.co/VY72bVB/bell-black-non-Filled.png',],
    ['https://i.ibb.co/Xp5827F/email-black-non-Filled.png'],
]


function NavbarM() {
    return (
        <div>
                <nav className='navbar-container-m'>
                    {navBar.map((navItem, idx) => {
                        const url = navItem;
                        return (
                            <NavButtonM key={idx} url={url} />
                        )
                    })}
                </nav>
        </div>
    )
}

export default NavbarM