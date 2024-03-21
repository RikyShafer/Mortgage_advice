import React, { useEffect } from 'react'
import "./contact-add.css"
import { useContactMutation } from '../contactApiSlice';
import { useNavigate } from 'react-router-dom';
import { WiDirectionLeft } from "react-icons/wi";

const ContactAdd = () => {
    const [addUser, { isError, error, isSuccess, isLoading }] = useContactMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/messageContact");
        }
    }, [isSuccess, navigate]);

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        console.log(userObject);
        addUser(userObject);
    };
    if (isLoading)
        return <h1>Loading...</h1>;
    if (isError)
        return <h1>Error: {JSON.stringify(error)}</h1>;
    return (
        <div className='add-user-register'>
    <div className='add-user-register-wraps'> 
        <form onSubmit={formSubmit} className='add-user-register-form'>
            <h2 className='add-user-register-h2'>ליצרת קשר...</h2>
            <div className='div-register'>
                <div className='dd-user-register-form-firstName'>
                    <h3 className='add-user-register-h3'>שם פרטי</h3>
                    <input
                        type='text'
                        required
                        name='name'
                        placeholder='הקלידו כאן...' />
                </div>
                <div className='dd-user-register-form-email'>
                    <h3 className='add-user-register-h3'>כתובת מייל</h3>
                    <input
                        type='email'
                        name='email'
                        placeholder='הקלידו כאן...' />
                </div>
            </div>
            <div className='div-register'>
                <div className='dd-user-register-form-phone'>
                    <h3 className='add-user-register-h3'>מספר טלפון</h3>
                    <input
                        type='text'
                        name='phone'
                        placeholder='הקלידו כאן...' />
                </div>
                <div className='dd-user-register-form-anotherQuestion'>
                    <h3 className='add-user-register-h3'>הודעה</h3>
                    <input
                        type='text'
                        name='message'
                        placeholder='הקלידו כאן...' />
                </div>
            </div>
            <button type='submit'>אני רוצה ליצור קשר <WiDirectionLeft /></button>
        </form>
        <img className='add-user-register-form-img' src='./user.png' alt='' />
    </div>
</div>)

}

export default ContactAdd
