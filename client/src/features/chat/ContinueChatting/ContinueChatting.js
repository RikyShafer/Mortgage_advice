import React, { useState } from 'react';

import { useChatMutation } from '../ChatApiSlice';
import './continue-chatting.css';
import SendIcon from '@mui/icons-material/Send';

const ContinueChatting = ({ conversationId, onMessageSent, className }) => {
    const [text, setText] = useState('');
    const [addMessage, { isError, error, isLoading }] = useChatMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text) {
            try {
                await addMessage({ ConversationId: conversationId, text }).unwrap();
                setText('');
                if (onMessageSent) onMessageSent();

            } catch (err) {
                console.error('Failed to send the message: ', err);
            }
        }
    };

   

    return (
        <form onSubmit={handleSubmit}  className={`continue-chatting-form-${className}`}>
            <div className={`continue-chatting-field-${className}`}>
                <input className={`continue-chatting-input-${className}`}
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='הזן את ההודעה שלך'
                />
                <button
                    className={`button ${!text && 'disabled'}`}
                    type='submit'
                    disabled={!text || isLoading}
                >
                    <SendIcon style={{ color: text ? 'rgba(45, 70, 196, 0.808)' : 'gray' }} />
                </button>
            </div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
        </form>
    );
};

export default ContinueChatting;
