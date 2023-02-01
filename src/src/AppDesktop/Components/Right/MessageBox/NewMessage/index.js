import React from 'react';
import './styles.css';

function NewMessage() {
    return (
        <div id='new-message'>
            <div id='new-message-center'>
                <div id='new-message-center-firstRow'>
                    Select a message
                </div>
                <div id='new-message-center-secondRow'>
                    Choose from your existing conversations, start a 
                    new one, or just keep swimming.
                </div>
                <div id='new-message-center-thirdRow'>
                    New message
                </div>
            </div>
        </div>
    )
}

export default NewMessage;