import React, { useEffect } from 'react';
import "./contact-message.css";

import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";



const ContactMessage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 20000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div className='process-completion-message'>
            <div className='process-completion-message-Check'> 
         
            <FiCheckCircle />
            <h1 className='message-process'>
                הפרטים שלך נשלחו 
              בקרוב נחזור אליך.
            </h1>
            </div>
        </div>
    );
};

export default ContactMessage;