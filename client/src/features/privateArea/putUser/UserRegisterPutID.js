import React, { useEffect } from 'react'
import useAuth from "../../../hooks//useAuth";

import { useUpdateUserMutation } from '../../userRegister/UserRegisterApiSlice';
import { useNavigate } from 'react-router-dom';
import { WiDirectionLeft } from 'react-icons/wi';
import "./user-register-put.css";
const UserRegisterPutID = () => {
   const { _id, firstName, email ,phone,lastName } = useAuth();

    
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();

    const navigate = useNavigate();
    useEffect(() => {
        if (putIsSuccess) {
            navigate("/private area");
        }
    }, [putIsSuccess, navigate]);

    const formSubmit = (e) => {
        // // e.preventDefault();
        // // const formData = new FormData(e.target);
        // // const userObject = Object.fromEntries(formData.entries());
        // e.preventDefault();
        // const formData = new FormData(e.target);
        // console.log(formData);
        // putUser({ _id: _id, ...formData }); // Make sure to include the user ID when updating

        e.preventDefault();
    
    const formData = new FormData(e.target);

    // Handle file separately
    const imageFile = e.target.image.files[0]; // Assuming 'image' is the name of your file input
    formData.append('image', imageFile);

    putUser({ _id: _id, ...formData });
    };
    if ( putIsLoading)
        return <h1>Loading...</h1>;
    if ( putIsError)
            return <h1>Error put : {JSON.stringify(putError)}</h1>;
    return (
        <div className='put-user-register'>
            <div className='put-user-register-wraps'>
                <form onSubmit={formSubmit} className='put-user-register-form'>
                    <h2 className='put-user-register-h2'> בשביל להרשם לאתר נשמח שתענו על כמה שאלות ממש קצרות...</h2>
                        <div className='div-register'>
                            <div className='dd-user-register-form-firstName'>
                                <h3 className='put-user-register-h3' >שם פרטי</h3>
                                <input
                                    type='text'
                                    name='firstName'
                                    placeholder={firstName || 'הקלידו כאן... '} />
                            </div>
                            <div className='dd-user-register-form-lastName'>
                                <h3 className='add-user-register-h3'> שם משפחה </h3>
                                <input
                                    type='text'
                                    name='lastName'
                                    placeholder={lastName || 'הקלידו כאן...'} />
                            </div>
                        </div>
                        <div className='div-register'>
                            <div className='dd-user-register-form-email'>
                                <h3 className='add-user-register-h3'> כתובת מייל </h3>
                                <input
                                    type='email'
                                    name='email' 
                                    placeholder={email || 'הקלידו כאן...'} />

                            </div>
                            <div className='dd-user-register-form-phone'>
                                <h3 className='add-user-register-h3'> מספר טלפון</h3>
                                <input
                                    type='text'
                                    name='phone'
                                    placeholder={phone || 'הקלידו כאן...'} />
                            </div>
                        </div>
                        <div className='div-register'>
                            <div className='dd-user-register-form-password'>
                                <h3 className='add-user-register-h3'>לשינוי סיסמא</h3>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='הקלידו כאן...' />
                            </div>
                        </div>
                        <div className='div-register'>
                        <div className='dd-user-register-form-image'>
                        <input type='file' name='image' />
                        </div>
                        </div>
                    <button type='submit'>  אני רוצה לעדכן {<WiDirectionLeft />}</button>
                </form>
            </div>
        </div>)
}

export default UserRegisterPutID


