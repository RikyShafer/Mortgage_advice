import React, { useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { useViewInChatToADMINQuery } from '../ChatApiSlice';
import DeletingMessage from '../DeletingMessage/DeletingMessage';
import ContinueChatting from '../ContinueChatting/ContinueChatting';
import './chat-conversation.css'; // Import the CSS file

const ChatConversation = ({ chatId, firstName, users }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { data: chat } = useViewInChatToADMINQuery();
    const selectedChat = chat?.data.find(c => c._id === chatId);
    const listRef = useRef(null);

    // הקוד הזה גורם לזה שמסך רגיל הוא יתחיל להציג מלמטה 
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [selectedChat]);

    // הקוד זה גורם שבמצב מוביל הוא יתיחל מלמטה 
    useEffect(() => {
        if (!isMobile && listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [selectedChat, isMobile]);  // Added isMobile to dependencies

    if (!selectedChat) {
        return <Typography>לא נמצאה שיחה.</Typography>;
    }

    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const distanceInWords = formatDistanceToNow(messageDate, { addSuffix: true, locale: he });

        return distanceInWords;
    };

    const receiver = users?.data.find(user => user._id === selectedChat.user2);

    return (
        <Box className="chat-container">
            <Box className="chat-header">
                <Avatar className="chat-avatar">{receiver ? receiver.firstName.charAt(0) : "?"}</Avatar>
                <Typography variant="h6">
                    {receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown"}
                </Typography>
            </Box>
            <Box ref={listRef} className="chat-messages">
                <List>
                    {selectedChat.messages.map((m, index) => (
                        <ListItem key={index} className={`chat-message ${m.sender === selectedChat.user2 ? '' : 'chat-message-reverse'}`}>
                            <Box className={`chat-message-box ${m.sender === selectedChat.user2 ? 'chat-message-receiver' : ''}`}>
                                <ListItemText
                                    primary={m.text}
                                    secondary={formatTimestamp(m.timestamp)}
                                    primaryTypographyProps={{ style: { wordBreak: 'break-word' } }}
                                    secondaryTypographyProps={{ className: "chat-message-time" }}
                                />
                            </Box>
                            {m.sender === selectedChat.user1 && (
                                <IconButton size="small">
                                    <DeletingMessage conversationId={selectedChat._id} messageId={m._id} />
                                </IconButton>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className="chat-footer">
                <ContinueChatting conversationId={selectedChat._id} className={"Manager"} onMessageSent={() => console.log('Message sent!')} />
            </Box>
        </Box>
    );
};

export default ChatConversation;
