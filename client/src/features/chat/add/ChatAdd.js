import React, { useState } from 'react';
import { useContinueChattingMutation } from '../ChatApiSlice';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../authSlice';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';
import './chat-add.css';

const ChatAdd = () => {
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
                // window.location.reload()
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
                                {users.data.map(user => (
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
