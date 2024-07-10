import React, { useState } from 'react';
import { useContinueChattingMutation } from '../ChatApiSlice';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
import './chat-add.css';

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
                onClose(); // Close the ChatAdd component
            } catch (err) {
                console.error('Failed to send the message: ', err);
            }
        }
    };

    if (isUserLoading) {
        return <h1>Loading...</h1>;
    }

    if (isUserError) {
        return <h1>Error: {userError.message}</h1>;
    }

    // Filter out users who already have an open conversation
    const availableUsers = users.data.filter(user => 
        !existingChats.some(chat => chat.user2 === user._id)
    );

    return (
        <div className='chat-add-container'>
            <div className='chat-add-wrap'>
                <form onSubmit={formSubmit} className='chat-add-form'>
                    <h2 className='chat-add-title'>התחל שיחה חדשה עם לקוח</h2>
                    <div className='chat-add-fields'>
                        <div className='chat-add-field'>
                            <label htmlFor='recipient'>Recipient</label>
                            <select
                                id='recipient'
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                            >
                                <option value='' disabled>Select a recipient</option>
                                {availableUsers.map(user => (
                                    <option key={user._id} value={user._id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='chat-add-field'>
                            <label htmlFor='text'>Message</label>
                            <input
                                type='text'
                                id='text'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder='Enter your message'
                            />
                        </div>
                    </div>
                    <button type='submit' disabled={isLoading}>Send Message</button>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error: {error.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ChatAdd;
