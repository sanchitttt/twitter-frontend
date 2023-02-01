import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoreTippy from '../Helper/MoreTippy';
import './styles.css';


function NavButton({ url, children, color, navigateUrl, setActiveUrl }) {
    const [showTippy,setShowTippy] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('click',(e)=>{
            let moreTippy = document.getElementById('more-tippy');
            let moreTippyIcon = document.getElementById('nav-button-container-More');

            if(moreTippy){
                if(moreTippy.contains(e.target) || moreTippyIcon.contains(e.target)){
                    // Do nothing
                }
                else{
                    if(showTippy) setShowTippy(false);
                }
            }
        })
        return () => {
            document.removeEventListener('click',() => {

            })
        }
    })

    let id = 'nav-button-container-'+ children;
    return (
        <div className='nav-button-container' id={id}>
            <div className='nav-button-leftSide' onClick={() => {
                if (children !== 'More') {
                    setActiveUrl(children)
                    navigate(navigateUrl)
                }
                else{
                    setShowTippy(true);
                }
            }}>
                <div className='nav-button-img'>
                    <img src={url} alt='navButtonImg' width='25px' height='25px' />
                </div>
                <div style={{ color: color }} className='nav-button-text'>
                    {children}
                </div>
            </div>
            {showTippy && <MoreTippy />}
            <div className='nav-button-rightSide'>
            </div>

        </div>
    )
}

export default NavButton;