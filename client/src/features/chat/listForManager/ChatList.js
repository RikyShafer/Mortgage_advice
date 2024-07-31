import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Typography, Button, Avatar, useMediaQuery, IconButton } from '@mui/material';
import { Search, Chat as ChatIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useViewInChatToADMINQuery } from '../ChatApiSlice';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
import ChatConversation from './ChatConversation';
import ChatAdd from '../add/ChatAdd';
import './chat-list.css';  // Import the CSS file

const ChatList = () => {
    const [showChatAdd, setShowChatAdd] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(true);

    const { data: chat, isLoading, isError, error } = useViewInChatToADMINQuery();
    const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetAllUsersQuery();
    const { firstName } = useAuth();
    const token = useSelector((state) => state.auth.token);

    const isMobile = useMediaQuery('(max-width:768px)');
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
    }, [token]);

    useEffect(() => {
        if (selectedChatId && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChatId]);

    if (isLoading || isUserLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (isError) {
        return <Typography>Error: {error.message}</Typography>;
    }

    if (isUserError) {
        return <Typography>Error: {userError.message}</Typography>;
    }

    let chatsData = chat?.data || [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredChats = searchTerm
        ? users?.data.filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        })
        : chatsData.map((chat) => {
            const receiver = users?.data.find(user => user._id === chat.user2);
            return receiver ? { ...chat, receiver } : null;
        }).filter(Boolean);

    const handleChatClick = (userId) => {
        const existingChat = chatsData.find((chat) => chat.user2 === userId);
        if (existingChat) {
            setSelectedChatId(existingChat._id);
            setIsChatVisible(true);
        } else {
            setShowChatAdd(true);
        }
    };

    const handleChatAddClose = () => {
        setShowChatAdd(false);
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
        if (isChatVisible) {
            setSelectedChatId(null); // Close the chat
        }
    };

    return (
        <Box className="chat-list-container">
            <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                flexGrow={1}
                className="footer-padding"
            >
                {/* Sidebar - only displayed when no chat is selected and not in mobile view */}
                {(!isMobile || !selectedChatId || !isChatVisible) && (
                    <Box
                        className={`sidebar ${isMobile ? '' : 'sidebar'}`}
                    >
                        <Typography className="sidebar-title">
                            תצוגה של התכתבות עם כל הלקוחות
                        </Typography>
                        <Box
                            className="search-box"
                        >
                            <Search />
                            <TextField
                                variant="outlined"
                                placeholder="חפש לפי שם"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                fullWidth
                                InputProps={{
                                    style: { borderRadius: '20px' }
                                }}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                        <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
                            {filteredChats.map((item) => {
                                const user = searchTerm ? item : item.receiver;
                                return (
                                    <ListItem button key={user._id} onClick={() => handleChatClick(user._id)}>
                                        <Avatar sx={{ mr: 2 }}>
                                            {user.firstName.charAt(0)}
                                        </Avatar>
                                        <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Button
                            variant="contained"
                            startIcon={<ChatIcon />}
                            onClick={() => setShowChatAdd(!showChatAdd)}
                            className={`chat-button ${showChatAdd ? 'chat-button-centered' : ''}`}
                        >
                            {showChatAdd ? 'סגור התחלת שיחה חדשה' : 'התחל שיחה חדשה'}
                        </Button>
                        {showChatAdd && <ChatAdd onClose={handleChatAddClose} existingChats={chatsData} />}
                    </Box>
                )}
                
                {/* Chat Conversation */}
                <Box
                    flexGrow={1}
                    display="flex"
                    flexDirection="column"
                    p={2}
                    sx={{
                        display: isMobile ? 'block' : 'flex',
                        position: 'relative',
                        paddingBottom: '60px' // Leave space for footer
                    }}
                >
                    {/* Back Arrow Icon for Mobile View */}
                    {isMobile && selectedChatId && (
                        <IconButton
                            onClick={toggleChatVisibility}
                            className="back-arrow"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    {selectedChatId ? (
                        <Box flexGrow={1} display="flex" flexDirection="column" overflow="hidden">
                            <ChatConversation
                                chatId={selectedChatId}
                                firstName={firstName}
                                users={users}
                            />
                            {/* Scroll to Bottom */}
                            <Box ref={chatEndRef} />
                        </Box>
                    ) : (
                        !isMobile && (
                            <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
                                <Typography variant="h5">בחר שיחה כדי להתחיל</Typography>
                            </Box>
                        )
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ChatList;
