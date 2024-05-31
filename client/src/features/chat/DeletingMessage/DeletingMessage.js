import React from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../authSlice';
import { useDeleteMessageMutation } from '../ChatApiSlice';
import { CgTrash } from "react-icons/cg";
import './deleting-message.css'
const DeletingMessage = ({ conversationId, messageId, onMessageDeleted }) => {
    const [deleteMessage, { isError, error, isSuccess, isLoading }] = useDeleteMessageMutation();
    const token = useSelector(selectToken); // Get token from Redux store

    const handleDelete = async () => {
        if (token) {
            try {
                await deleteMessage({ conversationId, messageId }).unwrap();
                if (onMessageDeleted) onMessageDeleted(messageId);
                // window.location.reload()

            } catch (err) {
                console.error('Failed to delete the message: ', err);
            }
        }
    };



    return (
        <div>
            <button onClick={handleDelete} disabled={isLoading} className='delete-button'>
                {isLoading ? 'Deleting...' :  <CgTrash />}
               
            </button>
            {isError && <p>Error: {error.message}</p>}
            {/* {isSuccess && <p>Message deleted successfully!</p>} */}
        </div>
    );
};

export default DeletingMessage;
