import React, { useEffect, useRef, useState } from 'react'
import useAuth from "../../../hooks/useAuth";
import { HiOutlinePencil } from "react-icons/hi2";
import './display.css'
import { useNavigate } from 'react-router-dom';

import { BsEnvelope } from "react-icons/bs";
import { useUpdateUserMutation } from '../../userRegister/UserRegisterApiSlice';
import { useViewInChatQuery } from '../../chat/ChatApiSlice';
import ContinueChatting from '../../chat/ContinueChatting/ContinueChatting';
import { TbLogout } from "react-icons/tb";
import { useSendLogoutMutation } from '../../auth/authApiSlice';

const Display = () => {
    const { firstName, email, roles, isAdmin, isUser, image, _id, active } = useAuth();
    console.log("Display", firstName, email, roles, isAdmin, isUser, image, "dfg", active, "dfg");
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();
    const page = 1;
    const limit = 4;
    const { data: chat, isLoading, isError, error } = useViewInChatQuery({ page, limit });
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [, setImageBuffer] = useState(null);
    const [logout] = useSendLogoutMutation();
    
    useEffect(() => {
        if (putIsSuccess) {
            navigate("/private-area");
        }
        const handleLogout = async () => {
            if (!active) {
                await logout();
                navigate("/inactive-account");
            }
        };
        handleLogout();
    }, [putIsSuccess, navigate, active, logout]);

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
        navigate(`/userPut`);
    };

    const goToUploadeDocuments = () => {
        navigate(`/questionnaireuser`);
    };

    const goToPutUploadeDocuments = () => {
        navigate(`/userPut`);
    };

    const goToViewInChat = () => {
        navigate(`/ViewInChat`);
    };

    const logOutClick = async () => {
        await logout();
        navigate("/");
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);
        return `${day}.${month}.${year}`;
    };

    if (putIsLoading) return <h1>Loading...</h1>;
    if (putIsError) return <h1>Error put: {JSON.stringify(putError)}</h1>;
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h2>Error: {error.message}</h2>;

    let chatsData = chat || [];
    return (
        <div className="display-user">
            <button onClick={logOutClick} className="side-bar-logout">
                התנתקות       
                <TbLogout />
            </button>
            <div className="display-user-details">
                <img
                    src={image ? `http://localhost:3297/image/${image}` : "/noavatar.png"}
                    alt=''
                    className='display-imag'
                />
                <button className='display-user-put-details' onClick={handleEditImage}>
                    <HiOutlinePencil />
                </button>
                <div className='display-user-username-put'>
                <h1 className="display-user-username"> {firstName} </h1>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
                </div>
            </div>
            <div className='buttonUserCorrespondence'>
                <div className='buttonUser'>
                    <button className='display-user-put' onClick={goToPutUserRegister}> עדכון פרטיים אישים
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToUploadeDocuments}> פרטי משכנתא
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToPutUploadeDocuments}> עדכון פרטי משכנתא
                        <HiOutlinePencil />
                    </button>
                </div>
                <div className='correspondence'>
                    {chatsData.length > 0 ? (
                        chatsData.map((chat) => {
                            const lastFourMessages = chat.messages.slice(-4);
                            return lastFourMessages.map((m, index) => (
                                <div key={index} className={m.sender._id === chat.user2._id ? 'directorDiv' : 'clientDiv'}>
                                    <p className={m.sender._id === chat.user2._id ? 'director' : 'client'}>
                                        <p> {m.text} <BsEnvelope className='iconBsEnvelope' /> </p>
                                        <p className='timestamp'> {formatTimestamp(m.timestamp)}</p>
                                    </p>
                                </div>
                            ));
                        })
                    ) : (
                        <div> 
                        <p className='client' >הצאט אינו פעיל </p>
                        <p className='client'>לפעלה יש לפנות ליעוץ המשכנאות  </p>
                        </div> 
                    )}
                    <div className='Chatting&ViewChat'>
                        {chatsData.length > 0 && (
                            <div>
                                <ContinueChatting conversationId={chatsData[0]._id} className={"userC"} onMessageSent={() => console.log('Message sent!')} />
                            </div>
                        )}
                        <div>
                            <button className='correspondence-button' onClick={goToViewInChat}> הצג הודעות ישנות</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
