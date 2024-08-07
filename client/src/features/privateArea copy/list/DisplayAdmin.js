import React, { useEffect, useRef, useState } from 'react';
import useAuth from "../../../hooks/useAuth";
import { HiOutlinePencil } from "react-icons/hi2";
import './display-admin.css';
import { useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { useSendLogoutMutation } from '../../auth/authApiSlice';
import { useGetAllUsersQuery, useUpdateUserMutation } from '../../userRegister/UserRegisterApiSlice';

const DisplayAdmin = () => {
    const { firstName, image ,_id } = useAuth();
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();
    const fileInputRef = useRef(null);

    const { data: users, isLoading, isError, error, isSuccess } = useGetAllUsersQuery();
    const [logout] = useSendLogoutMutation();
    const [, setImageBuffer] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (putIsSuccess) {
            navigate("/aprivate-area");
        }
    }, [putIsSuccess, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageBuffer(file);
            console.log(file);
            formSubmit(file);
        } else {
            setImageBuffer(null);
        }
    };

    const handleEditImage = () => {
        fileInputRef.current.click();
    };
    const formSubmit = (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('_id', _id);
        putUser(formData);
    };

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
    if (putIsLoading) return <h1>Loading...</h1>;
    if (putIsError) return <h1>Error put: {JSON.stringify(putError)}</h1>;
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h2>Error: {error.message}</h2>;
    // סינון המשתמשים שמצב ה-view שלהם הוא false
    let usersData = users?.data || [];
    let filteredUsers = usersData.filter(admin => admin.view === false ||admin.view === "false" );
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
                    className='display-imag'
                />
                <button className='display-admin-put-details' onClick={handleEditImage}>
                    <HiOutlinePencil />
                </button>
                <div className='display-admin-username-put'>
                <h1 className="display-admin-username"> {firstName} </h1>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
                </div>
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
                        lastThreeUsers.map((admin, index) => (
                            <div key={index} className={"directorDiv-admin"} onClick={() => handleUserClick(admin._id)}>
                                <p className='director-admin'>
                                    <p>שם פרטי: {admin.firstName}</p>
                                    <p>שם משפחה: {admin.lastName}</p>
                                    <p>מייל: {admin.email}</p>
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
