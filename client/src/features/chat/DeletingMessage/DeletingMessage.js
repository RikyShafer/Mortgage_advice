import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../authSlice';
import { useDeleteMessageMutation } from '../ChatApiSlice';
import { CgTrash } from "react-icons/cg";
import './deleting-message.css';

const DeletingMessage = ({ conversationId, messageId, messages, setMessages }) => {
    const [deleteMessage, { isError, error, isLoading }] = useDeleteMessageMutation();
    const token = useSelector(selectToken);

    const handleDelete = async () => {
        if (token) {
            try {
                await deleteMessage({ conversationId, messageId }).unwrap();
                // Update the messages state to remove the deleted message
                setMessages(messages.filter(message => message.id !== messageId));
            } catch (err) {
                console.error('Failed to delete the message: ', err);
            }
        }
        
    };

    return (
        <button onClick={handleDelete} disabled={isLoading} className='delete-button'>
            {isLoading ? 'Deleting...' : <CgTrash />}
            {isError && <p>Error: {error.message}</p>}
        </button>
    );
};

export default DeletingMessage;