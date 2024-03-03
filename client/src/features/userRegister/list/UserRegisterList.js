import React, { useEffect } from 'react';
import { useGetAllUsersQuery } from '../UserRegisterApiSlice';
import { useSelector } from 'react-redux';
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

import "./user-register-list.css";

const UserRegisterList = () => {
    const { data: users, isLoading, isError, error, isSuccess } = useGetAllUsersQuery();
    const token = useSelector((state) => state.auth.token); // Get token from Redux store
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
    }, [token]);
// const goToPut = async (e) => {
//     const id = e.target instanceof HTMLButtonElement ? e.target.id : e.target.parentElement instanceof HTMLButtonElement ? e.target.parentElement.id : e.target.parentElement.parentElement.id
//     console.log("User ID:", id);
//     navigate( `/registerList/${id}`);
// }
const goToPut = (userId) => {
    console.log("User ID:", userId);
    navigate(`/registerList/${userId}`);
};
    if (isLoading || !isSuccess) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    console.log("Users:", users); // Debugging statement to see what data is received

    let usersData = users?.data || [];

    return (
        <div  >
            <div className="register-list-title" >תצוגה איזה אנשים שלחו שאלון ליצרת קשר</div>
            <div className="register-list">
                {usersData.map((user) => (
                    <div className="registerMap" key={user._id} >
                     
                        <h1> <HiOutlineUser /> שם פרטי -{user.firstName}</h1>
                        <p>  שם משפחה-{user.lastName} </p>
                        <p> דוא"ל-<a href={`mailto:${user.email}`} className="google-link">{user.email}</a></p>
                        <p> טלפון -<a href={`tel:${user.phone}`} className="google-link">{user.phone}</a></p>
                        <p>  שאלה נוספת -{user.anotherQuestion}</p>
                        <p>  פעיל?- {user.active ? "פעיל" : "לא פעיל"} </p>
                        {/* <button onClick={goToPut}  id={user._id}> לעדכון פרטים </button> */}
                        <button onClick={() => goToPut(user._id)} id={user._id}> לעדכון פרטים </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRegisterList;

