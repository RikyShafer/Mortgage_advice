
import React, { useState, useEffect } from 'react';
import { useViewInChatToADMINQuery } from '../ChatApiSlice';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
import './chat-list.css';
import { IoIosSearch } from "react-icons/io";
import ChatConversation from './ChatConversation';
import ChatAdd from '../add/ChatAdd';

const ChatList = () => {
    const [showChatAdd, setShowChatAdd] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(null);
    const { data: chat, isLoading, isError, error } = useViewInChatToADMINQuery();
    const { data: users, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetAllUsersQuery();
    const { firstName } = useAuth();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
    }, [token]);

    if (isLoading || isUserLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    if (isUserError) {
        return <h2>Error: {userError.message}</h2>;
    }

    let chatsData = chat?.data || [];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredChats = chatsData.filter((chat) => {
        const receiver = users?.data.find(user => user._id === chat.user2);
        const fullName = receiver ? `${receiver.firstName} ${receiver.lastName}`.toLowerCase() : '';
        return fullName.includes(searchTerm.toLowerCase());
    });

    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId);
    };

    const handleChatAddClose = () => {
        setShowChatAdd(false);
    };

    return (
        <div className="chat-container">
            <div className="chat-list-container">
                <div className="messages-list-title">תצוגה של התכתבות עם כל הלקוחות</div>
                <div className="search-box">
                    <IoIosSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="חפש לפי שם"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
               
                <div className="messages-list">
                    {filteredChats.map((chat) => {
                        const receiver = users?.data.find(user => user._id === chat.user2);
                        return (
                            <div
                                className="chat-item"
                                key={chat._id}
                                onClick={() => handleChatClick(chat._id)}
                            >
                                <p>{receiver ? `${receiver.firstName} ${receiver.lastName}` : "Unknown"}</p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => setShowChatAdd(!showChatAdd)} className="new-conversation-button">
                    {showChatAdd ? 'סגור התחלת שיחה חדשה' : 'התחל שיחה חדשה'}
                </button>
                {showChatAdd && <ChatAdd onClose={handleChatAddClose} existingChats={chatsData} />}
            </div>
            <div className="chat-conversation-container">
                {selectedChatId && (
                    <ChatConversation
                        chatId={selectedChatId}
                        firstName={firstName}
                        users={users}
                    />
                )}
            </div>
            
        </div>
    );
};

export default ChatList;
