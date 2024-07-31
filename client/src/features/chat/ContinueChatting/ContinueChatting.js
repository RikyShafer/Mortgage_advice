import React, { useState } from 'react';
import { TextField, IconButton, CircularProgress, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChatMutation } from '../ChatApiSlice';
import './continue-chatting.css'; // Import the CSS file

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
        <form onSubmit={handleSubmit} className={`continue-chatting-form ${className}`}>
            <div className={`continue-chatting-field ${className}`}>
                <TextField
                    className={`continue-chatting-input ${className}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='הזן את ההודעה שלך'
                    variant='outlined'
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                type='submit'
                                disabled={!text || isLoading}
                                className={`continue-chatting-submit-button ${!text || isLoading ? 'disabled' : ''}`}
                            >
                                <SendIcon />
                            </IconButton>
                        ),
                        style: { backgroundColor: '#fff', borderRadius: '20px' }
                    }}
                />
            </div>
            {isLoading && <CircularProgress />}
            {isError && <Typography className="continue-chatting-error">Error: {error.message}</Typography>}
        </form>
    );
};

export default ContinueChatting;
