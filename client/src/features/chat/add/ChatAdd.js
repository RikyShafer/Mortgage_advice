import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Avatar } from '@mui/material';
import { useContinueChattingMutation } from '../ChatApiSlice';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
import './chat-add.css'; // Import the CSS file

const ChatAdd = ({ onClose, existingChats }) => {
    const [recipient, setRecipient] = useState('');
    const [text, setText] = useState('');
    const [addNewChat, { isError, error, isLoading }] = useContinueChattingMutation();
    const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetAllUsersQuery();

    const formSubmit = async (e) => {
        e.preventDefault();
        if (recipient && text) {
            try {
                await addNewChat({ recipient, text }).unwrap();
                setRecipient('');
                setText('');
                onClose();
            } catch (err) {
                console.error('Failed to send the message: ', err);
            }
        }
    };

    if (isUserLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isUserError) {
        return <Typography>Error: {userError.message}</Typography>;
    }

    const availableUsers = users.data.filter(user => 
        !existingChats.some(chat => chat.user2 === user._id)
    );

    return (
        <Box className="chat-box">
            <Box className="header">
                <Avatar src="/path/to/avatar.jpg" alt="User Avatar" className="header-avatar" />
                <Typography variant="h6">
                    התחל שיחה חדשה עם לקוח
                </Typography>
            </Box>
            <Box className="form-container">
                <form onSubmit={formSubmit}>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel id="recipient-label">Recipient</InputLabel>
                        <Select
                            labelId="recipient-label"
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            label="Recipient"
                        >
                            {availableUsers.map(user => (
                                <MenuItem key={user._id} value={user._id}>
                                    {`${user.firstName} ${user.lastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        className="styled-text-field"
                        label="Message"
                        variant="outlined"
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className="send-button"
                    >
                        Send
                    </Button>
                </form>
            </Box>
            {isError && <Typography className="error-message">{error.message}</Typography>}
        </Box>
    );
};

export default ChatAdd;
