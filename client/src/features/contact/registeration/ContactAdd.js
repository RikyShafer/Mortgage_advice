
import React, { useEffect } from 'react';
import "./contact-add.css";
import { useContactMutation } from '../contactApiSlice';
import { useNavigate } from 'react-router-dom';
import { WiDirectionLeft } from "react-icons/wi";

const ContactAdd = ({ onClose }) => {
    const [addUser, { isError, error, isSuccess, isLoading }] = useContactMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            onClose();  // קוראים לפונקציה שסוגרת את החלונית
            navigate("/messageContact");  // מבצעים ניתוב
        }
    }, [isSuccess, navigate, onClose]);
    

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        console.log(userObject);
        addUser(userObject);
    };

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

    return (
        <div className="modal-overlay">
            <div className='contemt-user-register'>
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className='contemt-user-register-wraps'>
                    <form onSubmit={formSubmit} className='contemt-user-register-form'>
                        <h2 className='contemt-user-register-h2'>ליצירת קשר...</h2>
                        <div className='contemt-div-register'>
                            <div className='contemt-user-register-form-firstName'>
                                <h3 className='contemt-user-register-h3'>שם פרטי</h3>
                                <input
                                    type='text'
                                    required
                                    name='name'
                                    placeholder='הקלידו כאן...' />
                            </div>
                            <div className='contemt-user-register-form-email'>
                                <h3 className='contemt-user-register-h3'>כתובת מייל</h3>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='הקלידו כאן...' />
                            </div>
                        </div>
                        <div className='contemt-div-register'>
                            <div className='contemt-user-register-form-phone'>
                                <h3 className='contemt-user-register-h3'>מספר טלפון</h3>
                                <input
                                    type='text'
                                    name='phone'
                                    placeholder='הקלידו כאן...' />
                            </div>
                            <div className='contemt-user-register-form-anotherQuestion'>
                                <h3 className='contemt-user-register-h3'>הודעה</h3>
                                <input
                                    type='text'
                                    name='message'
                                    placeholder='הקלידו כאן...' />
                            </div>
                        </div>
                        <button type='submit'>אני רוצה ליצור קשר <WiDirectionLeft /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactAdd;

