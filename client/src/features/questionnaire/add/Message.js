import React from 'react'
import { useNavigate } from 'react-router-dom';


const Message = () => {
    const navigate = useNavigate()
console.log("message");
    const submitForm = (e) => {
        e.preventDefault();
        navigate('/add');
    }
    return (
        <div className='message'>
            <h1>אופס... נראה שלא מלאתם את כל השדות שימו לב שהעלתם את כל הטפסים שנדרשים כדי שנוכל להמשיך את התהליך </h1>
            <button type="submit" onSubmit={submitForm}> הבנתי  </button>
        </div>

    )
}

export default Message