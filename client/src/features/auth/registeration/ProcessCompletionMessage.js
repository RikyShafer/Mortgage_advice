import React, { useEffect } from 'react';
import "./process-completion-message.css";

import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";


const ProcessCompletionMessage = () => {
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
            <h1>
                תהליך פתיחת תיק הושלם בהצלחה,
                בקרוב נתקשר אליך להמשך התהליך.
            </h1>
            </div>
        </div>
    );
};

export default ProcessCompletionMessage;