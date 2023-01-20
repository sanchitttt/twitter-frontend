import React from 'react';
import './styles.css';

function DiscardChangesBox({setEditProfileOpen, setShowDiscardChangesBox}) {
    return (
        <div className='discardThreadContainer'>
            <div className='discardThreadContainerMainText'>
                Discard changes?
            </div>
            <div className='discardThreadContainerSubText'>
                {"This can’t be undone and you’ll lose your changes."}
            </div>
            <div className='discardThreadContainerButtonsContainer'>
                <div className='discardThreadContainerButtonDiscard'
                onClick={() => setEditProfileOpen(false)}>
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