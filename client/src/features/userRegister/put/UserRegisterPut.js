
import React, { useEffect } from 'react';
import { useUpdateUserMutation, useGetUserByIdQuery } from '../UserRegisterApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { WiDirectionLeft } from 'react-icons/wi';
import "./user-register-put.css";

const UserRegisterPut = () => {
    const { userId } = useParams();
    console.log("User ID from params:", userId);

    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();
    const { data, isLoading, isError, error } = useGetUserByIdQuery(userId);
    const navigate = useNavigate();

    useEffect(() => {
        if (putIsSuccess) {
            navigate("/registerList");
        }
        console.log("User ID from params:", userId);
    }, [putIsSuccess, navigate, userId]);

    useEffect(() => {
        if (data) {
            console.log("User data:", data);
        }
    }, [data]);

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        console.log(userObject);
        putUser({ _id: userId, ...userObject });
    };

    if (isLoading || putIsLoading) return <h1>Loading...</h1>;
    if (isError || putIsError) return <h1>Error: {JSON.stringify(error || putError)}</h1>;

    return (
        <div className='put-user-registerID'>
            <div className='put-user-registerID-wraps'>
                <form onSubmit={formSubmit} className='put-user-registerID-form'>
                    <h2 className='put-user-registerID-h2'>עדכון פרטי משתמש {data?.data?.firstName || ''} </h2>
                    <div className='div-register'>
                        <div className='dd-user-register-form-firstName'>
                            <h3 className='put-user-registerID-h3'>שם פרטי</h3>
                            <input type='text' name='firstName' defaultValue={data?.data?.firstName || ''} placeholder='הקלידו כאן...' />
                        </div>
                        <div className='dd-user-register-form-lastName'>
                            <h3 className='put-user-registerID-h3'>שם משפחה</h3>
                            <input type='text' name='lastName' defaultValue={data?.data?.lastName || ''} placeholder='הקלידו כאן...'  />
                        </div>
                    </div>
                    <div className='div-register'>
                        <div className='dd-user-register-form-email'>
                            <h3 className='put-user-registerID-h3'>כתובת מייל</h3>
                            <input type='email' name='email' defaultValue={data?.data?.email || ''} placeholder='הקלידו כאן...'  />
                        </div>
                        <div className='dd-user-register-form-phone'>
                            <h3 className='put-user-registerID-h3'>מספר טלפון</h3>
                            <input type='text' name='phone' defaultValue={data?.data?.phone || ''} placeholder='הקלידו כאן...'   />
                        </div>
                    </div>
                    <div className='div-register'>
                       
                        <div className='dd-user-register-form-active'>
                            <h3 className='put-user-registerID-h3'>לעדכון כמשתמש פעיל</h3>
                            <select  className='add-user-register-option-active' name='active' id='active'>
                                <option value={true}>פעיל?</option>
                                <option value={false}>לא פעיל</option>
                                <option value={true}>פעיל</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit'>אני רוצה לעדכן <WiDirectionLeft /></button>
                </form>
            </div>
        </div>
    );
};

export default UserRegisterPut;
