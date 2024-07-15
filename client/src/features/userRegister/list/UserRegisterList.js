
import React, { useEffect, useState } from 'react';
import { useGetAllUsersQuery, useUpdateUserMutation } from '../UserRegisterApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./user-register-list.css";

const UserRegisterList = () => {
    const { data: users, isLoading, isError, error, isSuccess } = useGetAllUsersQuery();
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();

    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
        if (putIsSuccess) {
            navigate("/registerList");
        }
    }, [token,putIsSuccess, navigate]);

    const goToPut = (userId) => {
        console.log("User ID:", userId);
        navigate(`/registerList/${userId}`);
    };
    const handleToggleChange = (userId) => {
        setIsActive(!isActive);
        putUser({ _id: userId, active: !isActive });
    };
    if (isLoading || !isSuccess) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }
    if ( putIsLoading) return <h1>Loading...</h1>;
    if ( putIsError) return <h1>Error: {JSON.stringify(putError)}</h1>;
    console.log("Users:", users);

    let usersData = users?.data || [];

    return (
        <div>
            <div className="register-list-title">תצוגה איזה אנשים נרשמו לאתר</div>
            <div className="register-list">
                {usersData.map((user) => (
                    <div className="register-list-Map" key={user._id}>
                        <img
                            src={
                                user.image
                                    ? user.image.startsWith('https')
                                        ? user.image
                                        : "http://localhost:3297/image/" + user.image
                                    : "/noavatar.png"
                            }
                            alt={` `}
                            className="user-image"
                        />
                        <p >שם פרטי - {user.firstName}</p>
                        <p>שם משפחה - {user.lastName}</p>
                        <p>דוא"ל - <a href={`mailto:${user.email}`} className="google-link">{user.email}</a></p>
                        <p>טלפון - <a href={`tel:${user.phone}`} className="google-link">{user.phone}</a></p>
                        <p>שאלה נוספת - {user.anotherQuestion}</p>
                        <p>פעיל -
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={user.active}
                                    onChange={(e) => handleToggleChange(user._id, e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </p>
                        <button className='update-details' onClick={() => goToPut(user._id)}>לעדכון פרטים</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRegisterList;
