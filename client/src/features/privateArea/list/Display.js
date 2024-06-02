import React, { useEffect, useRef, useState } from 'react'
import useAuth from "../../../hooks//useAuth";
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
    // const { _id, firstName, email, roles, isAdmin, isUser, image } = useAuth();

    const { firstName, email, roles, isAdmin, isUser, image, _id } = useAuth();
    console.log("Display", firstName, email, roles, isAdmin, isUser, image);
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();
    const page = 1;
    const limit = 4;
    const { data: chat, isLoading, isError, error } = useViewInChatQuery({ page, limit });
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [imgBuffer, setImageBuffer] = useState(null)
    const [logout] = useSendLogoutMutation();
    useEffect(() => {
        if (putIsSuccess) {
            navigate("/private-area");
        }
    }, [putIsSuccess, navigate]);
    const handleImageChange = (e) => {
        if (e.target.files)
            setImageBuffer(e.target.files[0]);
        else
            setImageBuffer(null);

        formSubmit(e); // Pass the event object to formSubmit
    };


    const handleEditImage = () => {
        fileInputRef.current.click();
    };

    const formSubmit = (e) => {
        e.preventDefault(); // Now e is defined, so e.preventDefault() should work
        const formData = new FormData();
        formData.append('image', imgBuffer);
        formData.append('_id', _id)
        putUser(formData);
    };
    const goToPutUserRegister = () => {
        // navigate(`/userPut/${_id}`);
        navigate(`/userPut`);

    }

    const goToUploadeDocuments = () => {
        //ללכת למלוי טוםס שאלון 
        navigate(`/questionnaireuser`);

    }

    const goToPutUploadeDocuments = () => {
        ///צפייה ועדכון 
        navigate(`/userPut`);

    }
    const goToViewInChat = () => {
        ///התכתבות ן 
        navigate(`/ViewInChat`);

    }

    const logOutClick = async () => {
        await logout();
        navigate("/");
    }
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear().toString().slice(2);

        return `${day}.${month}.${year}`;
    };
    if (putIsLoading)
        return <h1>Loading...</h1>;
    if (putIsError)
        return <h1>Error put : {JSON.stringify(putError)}</h1>;
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    let chatsData = chat || [];
    return (
        <div className="display-user">
            <button onClick={logOutClick} className="side-bar-logout">
             התנתקות       
            <TbLogout />
            </button>
            <div className="display-user-details">

                <img
                    src={image ? "http://localhost:3297/image/" + image : "/noavatar.png"}
                    alt=''
                    className='display-imag'
                />

                <button className='display-user-put-details' onClick={handleEditImage}>
                    <HiOutlinePencil />
                </button>
                <h1 className="display-user-username">  {firstName} </h1>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} ref={fileInputRef} />
            </div>
            <div className='buttonUserCorrespondence'>

                <div className='buttonUser'>
                    <button className='display-user-put' onClick={goToPutUserRegister}>  עדכון פרטיים אישים
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToUploadeDocuments}>   פרטי משכנתא
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToPutUploadeDocuments}>  עדכון פרטי משכנתא
                        <HiOutlinePencil />
                    </button>
                    {/* <button className='display-user-put' onClick={goToViewInChat}>  עדכון פרטי משכנתא
                        <HiOutlinePencil />
                    </button> */}
                </div>
                <div className='correspondence'>   {/* התכתבות  */}

                    {chatsData.map((chat) => {
                        const lastFourMessages = chat.messages.slice(-4);
                        return (
                            lastFourMessages.map((m, index) => (
                                <div key={index} className={m.sender._id === chat.user2._id ? 'directorDiv' : 'clientDiv'}>
                                    <p className={m.sender._id === chat.user2._id ? 'director' : 'client'}>
                                        <p>  {m.text}  <BsEnvelope className='iconBsEnvelope' BsEnvelope /> </p>

                                        <p className='timestamp'>   {formatTimestamp(m.timestamp)}</p>

                                    </p>

                                </div>
                            ))
                        );

                    }
                    )}
                    <div className='Chatting&ViewChat'>
                        <div>
                            <ContinueChatting conversationId={chatsData[0]._id} className={"userC"} onMessageSent={() => console.log('Message sent!')} />
                        </div>
                        <div>
                            <button className='correspondence-button' onClick={goToViewInChat}> הצג הודעות ישנות</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Display