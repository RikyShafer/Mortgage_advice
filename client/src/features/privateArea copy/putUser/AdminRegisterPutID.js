import React, { useEffect, useState } from 'react'
import useAuth from "../../../hooks//useAuth";

import { useUpdateUserMutation } from '../../userRegister/UserRegisterApiSlice';
import { useNavigate } from 'react-router-dom';
import { WiDirectionLeft } from 'react-icons/wi';
import "./admin-register-put.css";
import { FaArrowUpFromBracket } from 'react-icons/fa6';
const AdminRegisterPutID = () => {
    const { _id, firstName, email, phone, lastName, isAdmin, isUser } = useAuth();
    const [imgBuffer, setImageBuffer] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();

    const navigate = useNavigate();
    useEffect(() => {
        if (putIsSuccess) {
            if (isAdmin) {
                navigate("/aprivate-area");
            } else if (isUser) {
                navigate("/private-area");
            }
        }
    }, [putIsSuccess, navigate, isAdmin, isUser]);
    const updateImage = (e) => {
        if (e.target.files) {
            setImageBuffer(e.target.files[0]);
            setUploadSuccess(true);
        }
        else
            setImageBuffer(null)
    }
    const formSubmit = (e) => {


        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('image', imgBuffer);
        formData.append('_id', _id)

        putUser(formData);
    };
    if (putIsLoading)
        return <h1>Loading...</h1>;
    if (putIsError)
        return <h1>Error put : {JSON.stringify(putError)}</h1>;
    return (
        <div className='put-admin-register'>
            <div className='put-admin-register-wraps'>
                <form onSubmit={formSubmit} className='put-admin-register-form'>
                    <h2 className='put-admin-register-h2'> בשביל להרשם לאתר נשמח שתענו על כמה שאלות ממש קצרות...</h2>
                    <div className='div-register'>
                        <div className='dd-admin-register-form-firstName'>
                            <h3 className='put-admin-register-h3' >שם פרטי</h3>
                            <input
                                type='text'
                                name='firstName'
                                placeholder={firstName || 'הקלידו כאן... '} />
                        </div>
                        <div className='dd-admin-register-form-lastName'>
                            <h3 className='add-admin-register-h3'> שם משפחה </h3>
                            <input
                                type='text'
                                name='lastName'
                                placeholder={lastName || 'הקלידו כאן...'} />
                        </div>
                    </div>
                    <div className='div-register'>
                        <div className='dd-admin-register-form-email'>
                            <h3 className='add-admin-register-h3'> כתובת מייל </h3>
                            <input
                                type='email'
                                name='email'
                                placeholder={email || 'הקלידו כאן...'} />

                        </div>
                        <div className='dd-admin-register-form-phone'>
                            <h3 className='add-admin-register-h3'> מספר טלפון</h3>
                            <input
                                type='text'
                                name='phone'
                                placeholder={phone || 'הקלידו כאן...'} />
                        </div>
                    </div>
                    <div className='div-register'>
                        <div className='dd-admin-register-form-password'>
                            <h3 className='add-admin-register-h3'>לשינוי סיסמא</h3>
                            <input
                                type='password'
                                name='password'
                                placeholder='הקלידו כאן...' />
                        </div>

                        <div className='dd-admin-register-form-image'>
                            <input
                                id="file-upload"
                                onChange={updateImage}
                                type='file'
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload" className='add-admin-register-h3'>
                                {uploadSuccess ? 'התמונה עלתה בהצלחה!' : 'שינוי תמונות פרופיל...'}
                            </label>
                            <label htmlFor="file-upload" className="file-upload-span">
                                <FaArrowUpFromBracket />
                            </label>
                        </div>
                    </div>
                    <button type='submit'>  אני רוצה לעדכן {<WiDirectionLeft />}</button>
                </form>
            </div>
        </div>)
}

export default AdminRegisterPutID