import React, { useEffect } from 'react'
import { useUpdateUserMutation, useGetUserByIdQuery } from '../UserRegisterApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { WiDirectionLeft } from 'react-icons/wi';
import "./user-register-put.css";
const UserRegisterPut = () => {

    const { userId } = useParams(); // Ensure that userId is correctly retrieved
    console.log("User ID:", userId); // Verify if userId is correctly logged
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();

    const { data, isLoading, isError, error } = useGetUserByIdQuery(userId);
    const navigate = useNavigate();
    useEffect(() => {
        if (putIsSuccess) {
            navigate("/registerList");
        }
    }, [putIsSuccess, navigate]);

    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userObject = Object.fromEntries(formData.entries());
        console.log(userObject);
        putUser({ _id: userId, ...userObject }); // Make sure to include the user ID when updating
    };
    if (isLoading || putIsLoading)
        return <h1>Loading...</h1>;
    if (isError || putIsError)
        if (isError)
            return <h1>Error gat : {JSON.stringify(error)}</h1>;
        else
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
                                    placeholder={data.firstName || 'הקלידו כאן... '} />
                            </div>
                            <div className='dd-user-register-form-lastName'>
                                <h3 className='add-user-register-h3'> שם משפחה </h3>
                                <input
                                    type='text'
                                    name='lastName'
                                    placeholder={data.lastName || 'הקלידו כאן...'} />
                            </div>
                        </div>
                        <div className='div-register'>
                            <div className='dd-user-register-form-email'>
                                <h3 className='add-user-register-h3'> כתובת מייל </h3>
                                <input
                                    type='email'
                                    name='email' 
                                    placeholder={data.email || 'הקלידו כאן...'} />

                            </div>
                            <div className='dd-user-register-form-phone'>
                                <h3 className='add-user-register-h3'> מספר טלפון</h3>
                                <input
                                    type='text'
                                    name='phone'
                                    placeholder={data.phone || 'הקלידו כאן...'} />
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
                            <div className='dd-user-register-form-active'>
                                <h3 className='add-user-register-h3'>לעדכון כמשתמש פעיל</h3>
                                <select
                                    name='active'
                                    id='active'>
                                    <option value={true}>פעיל?</option>
                                    <option value={false}>לא פעיל</option>
                                    <option value={true}>פעיל</option>
                                </select>
                            </div>
                        </div>

                    <button type='submit'>  אני רוצה לעדכן {<WiDirectionLeft />}</button>
                </form>
            </div>
        </div>)
}

export default UserRegisterPut



// import React, { useEffect, useState } from 'react'
// import { useUpdateUserMutation, useGetUserByIdQuery } from '../UserRegisterApiSlice';
// import { useNavigate, useParams } from 'react-router-dom';
// import { WiDirectionLeft } from 'react-icons/wi';
// import "./user-register-put.css";

// const UserRegisterPut = () => {
//     const { userId } = useParams(); // Ensure that userId is correctly retrieved
//     console.log("User ID:", userId); // Verify if userId is correctly logged
//     const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();
//     const { data, isLoading, isError, error } = useGetUserByIdQuery(userId);
//     const navigate = useNavigate();

//     const [initialData, setInitialData] = useState(null);

//     useEffect(() => {
//         if (data) {
//             setInitialData(data); // Store initial data when available
//         }
//     }, [data]);

//     useEffect(() => {
//         if (putIsSuccess) {
//             navigate("/registerList");
//         }
//     }, [putIsSuccess, navigate]);

//     // const formSubmit = (e) => {
//     //     e.preventDefault();
//     //     const formData = new FormData(e.target);
//     //     const userObject = Object.fromEntries(formData.entries());
//     //     console.log(userObject);
//     //     putUser({ _id: userId, ...userObject }); // Make sure to include the user ID when updating
//     // };

//     const formSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const userObject = Object.fromEntries(formData.entries());
    
//         // Filter out unchanged fields
//         const updatedFields = {};
//         Object.keys(userObject).forEach((key) => {
//             if (initialData[key] !== userObject[key]) {
//                 updatedFields[key] = userObject[key];
//             }
//         });
    
//         // If no fields were changed, send the initial data for updating
//         if (Object.keys(updatedFields).length === 0) {
//             putUser({ _id: userId, ...initialData });
//         } else {
//             putUser({ _id: userId, ...updatedFields });
//         }
//     };

//     if (isLoading || putIsLoading)
//         return <h1>Loading...</h1>;

//     if (isError || putIsError) {
//         if (isError)
//             return <h1>Error gat : {JSON.stringify(error)}</h1>;
//         else
//             return <h1>Error put : {JSON.stringify(putError)}</h1>;
//     }

//     return (
//         <div className='put-user-register'>
//             <div className='put-user-register-wraps'>
//                 <form onSubmit={formSubmit} className='put-user-register-form'>
//                     <h2 className='put-user-register-h2'> בשביל להרשם לאתר נשמח שתענו על כמה שאלות ממש קצרות...</h2>
//                     <div className='div-register'>
//                         <div className='dd-user-register-form-firstName'>
//                             <h3 className='put-user-register-h3' >שם פרטי</h3>
//                             <input
//                                 type='text'
//                                 name='firstName'
//                                 placeholder={initialData ? initialData.firstName : 'הקלידו כאן...'} />
//                         </div>
//                         <div className='dd-user-register-form-lastName'>
//                             <h3 className='add-user-register-h3'> שם משפחה </h3>
//                             <input
//                                 type='text'
//                                 name='lastName'
//                                 placeholder={initialData ? initialData.lastName : 'הקלידו כאן...'} />
//                         </div>
//                     </div>
//                     <div className='div-register'>
//                         <div className='dd-user-register-form-email'>
//                             <h3 className='add-user-register-h3'> כתובת מייל </h3>
//                             <input
//                                 type='email'
//                                 name='email'
//                                 placeholder={initialData ? initialData.email : 'הקלידו כאן...'} />
//                         </div>
//                         <div className='dd-user-register-form-phone'>
//                             <h3 className='add-user-register-h3'> מספר טלפון</h3>
//                             <input
//                                 type='text'
//                                 name='phone'
//                                 placeholder={initialData ? initialData.phone : 'הקלידו כאן...'} />
//                         </div>
//                     </div>
//                     <div className='div-register'>
//                         <div className='dd-user-register-form-password'>
//                             <h3 className='add-user-register-h3'>לשינוי סיסמא</h3>
//                             <input
//                                 type='password'
//                                 name='password'
//                                 placeholder='הקלידו כאן...' />
//                         </div>
//                         <div className='dd-user-register-form-active'>
//                             <h3 className='add-user-register-h3'>לעדכון כמשתמש פעיל</h3>
//                             <select
//                                 name='active'
//                                 id='active'
//                                 defaultValue={initialData ? initialData.active : true}>
//                                 <option value={true}>פעיל?</option>
//                                 <option value={false}>לא פעיל</option>
//                                 <option value={true}>פעיל</option>
//                             </select>
//                         </div>
//                     </div>
//                     <button type='submit'>  אני רוצה לעדכן {<WiDirectionLeft />}</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default UserRegisterPut;
