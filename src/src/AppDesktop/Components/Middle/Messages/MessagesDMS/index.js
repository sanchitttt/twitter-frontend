import React, { useState } from 'react';
import MessageDMItem from '../MessageDMItem';
import './styles.css';


const mockDms = [
    {
        id: 'asda',
        profileSrc: 'https://pbs.twimg.com/profile_images/1380722632207704069/yiSrtrqz_400x400.jpg',
        accountName: 'Ruchit G Garg',
        verified: true,
        accountHandle: 'ruchitgarg',
        lastMessage: {
            type: 'attachment',
            content: 'You sent a photo',
            date: 'Jan 7'
        }
    },
    {
        id: '012056',
        profileSrc: 'https://pbs.twimg.com/profile_images/1525037434962321409/UJnneSkR_400x400.jpg',
        accountName: 'Vishwas',
        accountHandle: 'Codevolution',
        lastMessage: {
            type: 'text',
            content: 'Can you make some on React Suspense component and hooks like useTransition, useDeferredValue and all',
            date: 'Dec 31,2022'
        }
    },
    {
        id: '012052',
        profileSrc: 'https://pbs.twimg.com/profile_images/1524107439821721600/8gsW8QdB_400x400.jpg',
        accountName: 'Sagnik Roy',
        accountHandle: 'SagnikRoy',
        lastMessage: {
            type: 'link',
            content: '',
            date: 'Oct 30, 2022'
        }
    },

]
function MessagesDMS() {
    const [messages, setMessages] = useState(mockDms);
    return (
        <div id='dmsContainer'>
            {messages.map((message) => {
                return <MessageDMItem
                    key={message.id}
                    profileSrc={message.profileSrc}
                    accountName={message.accountName}
                    accountHandle={message.accountHandle}
                    lastMessage={message.lastMessage}
                    verified={message.verified}
                />
            })}
        </div>
    )
}

export default MessagesDMS;