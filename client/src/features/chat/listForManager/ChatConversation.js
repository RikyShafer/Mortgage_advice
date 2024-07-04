import React from 'react';
import ContinueChatting from '../ContinueChatting/ContinueChatting';
import DeletingMessage from '../DeletingMessage/DeletingMessage';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import './chat-conversation.css';
import { useViewInChatToADMINQuery } from '../ChatApiSlice';

const ChatConversation = ({ chatId, firstName, users }) => {
    const { data: chat } = useViewInChatToADMINQuery(); // השתמש בנתונים מקודמים

    const selectedChat = chat?.data.find(c => c._id === chatId);

    if (!selectedChat) {
        return <p>לא נמצאה שיחה.</p>;
    }

    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const now = new Date();
        const diffMs = now - messageDate;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 60) {
            return `${diffMins} דקות`;
        } else {
            const hours = messageDate.getHours().toString().padStart(2, '0');
            const minutes = messageDate.getMinutes().toString().padStart(2, '0');
            const distanceInWords = formatDistanceToNow(messageDate, { addSuffix: true, locale: he });

            return `${distanceInWords} בשעה ${hours}:${minutes}`;
        }
    };

    const receiver = users?.data.find(user => user._id === selectedChat.user2);

    return (
        <div className="chat-conversation">
            <h1>השולח- {firstName}</h1>
            <p>המקבל- {receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown"}</p>
            <div>
                {selectedChat.messages.map((m, index) => (
                    <div key={index}>
                        <h5 className={m.sender === selectedChat.user2 ? 'receiver-Timestamp' : 'sender-Timestamp'}>{formatTimestamp(m.timestamp)}</h5>
                        <p className={m.sender === selectedChat.user2 ? 'receiver-message' : 'sender-message'}>
                            {m.text}
                            {m.sender === selectedChat.user1 && (
                                <DeletingMessage conversationId={selectedChat._id} messageId={m._id} />
                            )}
                        </p>
                    </div>
                ))}
            </div>
            <ContinueChatting conversationId={selectedChat._id} className={"Manager"} onMessageSent={() => console.log('Message sent!')} />
        </div>
    );
};

export default ChatConversation;
