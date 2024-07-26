import React from 'react';
import useAuth from "../../../hooks/useAuth";
import { HiOutlinePencil } from "react-icons/hi2";
import './display-admin.css';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { useSendLogoutMutation } from '../../auth/authApiSlice';
import { useGetAllUsersQuery } from '../../userRegister/UserRegisterApiSlice';

const DisplayAdmin = () => {
    const { firstName, image } = useAuth();
    const { data: users, isLoading, isError, error, isSuccess } = useGetAllUsersQuery();
    const [logout] = useSendLogoutMutation();
    const navigate = useNavigate();

    const goToPutUserRegister = () => {
        navigate(`/update-details`);
    }

    const goToUploadeDocuments = () => {
        navigate(`/questionnaireuser`);
    }

    const goToViewingDocuments = () => {
        navigate(`/questionnaireList`);
    }

    const goToViewingRegistrants = () => {
        navigate(`/registerList`);
    }

    const goToViewChatList = () => {
        navigate(`/ChatList`);
    }

    const logOutClick = async () => {
        await logout();
        navigate("/");
    }

    const handleUserClick = (id) => {
        navigate(`/registerList/${id}`);
    }

    if (isLoading || !isSuccess) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    // סינון המשתמשים שמצב ה-view שלהם הוא false
    let usersData = users?.data || [];
    let filteredUsers = usersData.filter(user => user.view === false ||user.view === "false" );
    let lastThreeUsers = filteredUsers.slice(-5);

    return (
        <div className="display-admin">
            <button onClick={logOutClick} className="side-bar-logout">
                התנתקות
                <TbLogout />
            </button>
            <div className="display-admin-details">
                <img
                    src={image ? `http://localhost:3297/image/${image}` : "/noavatar.png"}
                    alt=''
                    className='display-imag-admin'
                />
                <button className='display-admin-put-details'>
                    <HiOutlinePencil />
                </button>
                <h1 className="display-admin-username">{firstName}</h1>
            </div>
            <div className='button-Correspondence-admin'>
                <div className='button-admin'>
                    <button className='display-admin-put' onClick={goToPutUserRegister}>עדכון פרטיים אישים <HiOutlinePencil /></button>
                    <button className='display-admin-put' onClick={goToViewingDocuments}>צפייה במסמכים <HiOutlinePencil /></button>
                    <button className='display-admin-put' onClick={goToViewingRegistrants}>צפייה בנרשמים <HiOutlinePencil /></button>
                    <button className='display-admin-put' onClick={goToUploadeDocuments}>פרטי משכנתא <HiOutlinePencil /></button>
                    <button className='display-admin-put' onClick={goToViewChatList}>Chat List <HiOutlinePencil /></button>
                </div>
                <div className='correspondence-admin'>
                    <h1 className='correspondence-message-admin'>אנשים חדשים שהצטרפו אלינו</h1>
                    {lastThreeUsers.length > 0 ? (
                        lastThreeUsers.map((user, index) => (
                            <div key={index} className={"directorDiv-admin"} onClick={() => handleUserClick(user._id)}>
                                <p className='director-admin'>
                                    <p>שם פרטי: {user.firstName}</p>
                                    <p>שם משפחה: {user.lastName}</p>
                                    <p>מייל: {user.email}</p>
                                </p>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className='client-admin'>אין משתמשים להצגה</p>
                        </div>
                    )}

                    <button className='correspondence-button-admin' onClick={goToViewingRegistrants}>צפייה בכל הלקוחות</button>
                </div>
            </div>
        </div>
    );
}

export default DisplayAdmin;
