import React, { useEffect } from 'react'
import "./user-register-add.css"
import { useAddUserMutation } from '../UserRegisterApiSlice';
import { useNavigate } from 'react-router-dom';
import { WiDirectionLeft } from "react-icons/wi";

const UserRegisterAdd = () => {
    const [addUser, { isError, error, isSuccess, isLoading }] = useAddUserMutation();

    const navigate = useNavigate();

    useEffect(() => {

        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        console.log(userObject);
        addUser(userObject);

        // e.preventDefault();
        // const formData = new FormData(e.target);
        // addUser("formData",formData);
    };
    if (isLoading)
        return <h1>Loading...</h1>;
    if (isError)
        return <h1>Error: {JSON.stringify(error)}</h1>;
    return (
        <div className='add-user-register'>
            <div className='add-user-register-wraps'>
                <form onSubmit={formSubmit} className='add-user-register-form'>

                    <h2 className='add-user-register-h2'> בשביל להרשם לאתר נשמח שתענו על כמה שאלות ממש קצרות...</h2>
                    <div className='div-register'>
                        {/* <input
                            type='file'
                            name="image"
                            defaultValue='../../../../public/noavatar.png'
                            readOnly 
                        /> */}
                        <div className='dd-user-register-form-firstName'>
                            <h3 className='add-user-register-h3' >שם פרטי</h3>
                            <input
                                type='text'
                                required
                                name='firstName'
                                placeholder='הקלידו כאן... ' />
                        </div>
                        <div className='dd-user-register-form-lastName'>
                            <h3 className='add-user-register-h3'> שם משפחה </h3>
                            <input
                                type='text'
                                required
                                name='lastName'
                                placeholder='הקלידו כאן...' />
                        </div>
                    </div>
                    <div className='div-register'>
                        <div className='dd-user-register-form-email'>
                            <h3 className='add-user-register-h3'> כתובת מייל </h3>
                            <input
                                type='email'
                                name='email'
                                placeholder='הקלידו כאן...' />
                        </div>
                        <div className='dd-user-register-form-phone'>
                            <h3 className='add-user-register-h3'> מספר טלפון</h3>
                            <input
                                type='text'
                                name='phone'
                                placeholder='הקלידו כאן...' />
                        </div>
                    </div>
                    <div className='div-register'>
                        <div className='dd-user-register-form-password'>
                            <h3 className='add-user-register-h3'> יצירת סיסמא</h3>
                            <input
                                type='password'
                                required
                                name='password'
                                placeholder='הקלידו כאן...' />
                        </div>
                        <div className='dd-user-register-form-anotherQuestion'>
                            <h3 className='add-user-register-h3'> שאלה נוספת </h3>
                            <input
                                type='text'
                                name='anotherQuestion'
                                placeholder='הקלידו כאן...' />
                        </div>
                    </div>
                    <button type='submit'>  אני רוצה להירשם {<WiDirectionLeft />}</button>
                </form>
                <img className='add-user-register-form-img' src='./user.png' alt='' />
            </div>
        </div>)
}

export default UserRegisterAdd

