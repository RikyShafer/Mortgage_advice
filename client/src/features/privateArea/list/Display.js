import React, { useEffect, useRef, useState } from 'react'
import useAuth from "../../../hooks//useAuth";
import { HiOutlinePencil } from "react-icons/hi2";
import './display.css'
import { useNavigate } from 'react-router-dom';

import { BsEnvelope } from "react-icons/bs";
import { useUpdateUserMutation } from '../../userRegister/UserRegisterApiSlice';

const Display = () => {
    // const { _id, firstName, email, roles, isAdmin, isUser, image } = useAuth();

    const { firstName, email, roles, isAdmin, isUser, image ,_id} = useAuth();
    console.log("Display", firstName, email, roles, isAdmin, isUser, image);
    const [putUser, { isError: putIsError, error: putError, isSuccess: putIsSuccess, isLoading: putIsLoading }] = useUpdateUserMutation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [imgBuffer, setImageBuffer]  = useState(null)

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
        ///צפייה ועדכון 
        navigate(`/ViewInChat`);

    }
    if ( putIsLoading)
        return <h1>Loading...</h1>;
    if ( putIsError)
            return <h1>Error put : {JSON.stringify(putError)}</h1>;
    return (
        <div className="display-user">
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
                    <button className='display-user-put' onClick={goToViewInChat}>  עדכון פרטי משכנתא
                        <HiOutlinePencil />
                    </button>
                </div>
                <div className='correspondence'>   {/* התכתבות  */}
                    <div className='directorDiv'>
                        <p className='director'> לקוח יקר, אנא וודא שיש בידך את כל הטפסים...              <BsEnvelope className='iconBsEnvelope' BsEnvelope /></p>
                    </div>
                    <div className='clientDiv'>
                        <p className='client'>שלחתי את הכל אשמח שתעבור על זה  <BsEnvelope className='iconBsEnvelope' BsEnvelope /></p>
                    </div>
                    <div className='directorDiv'>

                        <p className='director'> קבלתי... <BsEnvelope className='iconBsEnvelope' BsEnvelope /> </p>
                    </div>
                    <button className='correspondence-button' >  הצג הודעות ישנות יותר 
              
                    </button>

                </div>
            </div>
        </div>

    )
}

export default Display