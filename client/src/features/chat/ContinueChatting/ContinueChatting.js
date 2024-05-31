import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../authSlice';
import { useChatMutation } from '../ChatApiSlice';
import './continue-chatting.css';
import SendIcon from '@mui/icons-material/Send';

const ContinueChatting = ({ conversationId, onMessageSent }) => {
    const [text, setText] = useState('');
    const [addMessage, { isError, error, isSuccess, isLoading }] = useChatMutation();
    // const token = useSelector(selectToken); // Get token from Redux store

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text) {
            try {
                await addMessage({ ConversationId: conversationId, text }).unwrap();
                setText('');
                if (onMessageSent) onMessageSent();
                // window.location.reload()

            } catch (err) {
                console.error('Failed to send the message: ', err);
            }
        }
    };

    // if (!token) {
    //     return <h2>You are not authorized to view this page. Please log in.</h2>;
    // }

    return (
        <form onSubmit={handleSubmit} className='continue-chatting-form'>
            <div className='continue-chatting-field'>
                <input className='continue-chatting-input'
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
            {/* {isSuccess && <p>Message sent successfully!</p>} */}
        </form>
    );
};

export default ContinueChatting;
