import React from 'react';
import './styles.css';

function DiscardChangesBox({discardHeading,setKeepItOpened,discardSubText,setEditProfileOpen, setShowDiscardChangesBox}) {
    return (
        <div className='discardThreadContainer'>
            <div className='discardThreadContainerMainText'>
                {discardHeading?discardHeading:'Discard changes?'}
            </div>
            <div className='discardThreadContainerSubText'>
            {discardSubText?discardSubText:'"This can’t be undone and you’ll lose your changes."'}
            </div>
            <div className='discardThreadContainerButtonsContainer'>
                <div className='discardThreadContainerButtonDiscard'
                onClick={() => setKeepItOpened?setKeepItOpened(false):setEditProfileOpen(false)}>
                        Discard
                </div>
                <div className='discardThreadContainerButtonCancel'
                onClick={() => setShowDiscardChangesBox(false)}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default DiscardChangesBox;