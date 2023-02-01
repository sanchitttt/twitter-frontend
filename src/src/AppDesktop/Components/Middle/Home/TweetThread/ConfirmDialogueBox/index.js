import React from 'react';
import './styles.css';

function ConfirmDialogueBox({ setShowTweetThread , setOpenConfirmDialogueBox }) {
    return (
        <div className='discardThreadContainer'>
            <div className='discardThreadContainerMainText'>
                Discard thread?
            </div>
            <div className='discardThreadContainerSubText'>
                {"This can’t be undone and you’ll lose your draft."}
            </div>
            <div className='discardThreadContainerButtonsContainer'>
                <div className='discardThreadContainerButtonDiscard'
                onClick={() => setShowTweetThread(false)}>
                        Discard
                </div>
                <div className='discardThreadContainerButtonCancel'
                onClick={() => setOpenConfirmDialogueBox(false)}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialogueBox;