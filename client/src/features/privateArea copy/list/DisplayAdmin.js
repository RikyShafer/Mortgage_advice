import React from 'react'
import useAuth from "../../../hooks//useAuth";
import { HiOutlinePencil } from "react-icons/hi2";
import './display.css'
import { useNavigate } from 'react-router-dom';

import { BsEnvelope } from "react-icons/bs";

const DisplayAdmin = () => {
    // const { _id, firstName, email, roles, isAdmin, isUser, image } = useAuth();

    const { firstName, email, roles, isAdmin, isUser, image } = useAuth();
    console.log("Display", firstName, email, roles, isAdmin, isUser, image);

    const navigate = useNavigate();

    const goToPutUserRegister = () => {
        // navigate(`/userPut/${_id}`);
        navigate(`/userPut`);

    }

    const goToUploadeDocuments = () => {
        //ללכת למלוי טוםס שאלון 
        navigate(`/questionnaireuser`);

    }
    const goToViewingDocuments = () => {
        //צפפיה במסמכים   
        navigate(`/questionnaireList`);

    }

    const goToViewingRegistrants = () => {
        ///צפייה בנרשמים 
        navigate(`/registerList`);

    }
    return (
        <div className="display-user">
            <div className="display-user-details">

                <img
                    src={image ? "http://localhost:3297/image/" + image : "/noavatar.png"}
                    alt=''
                    className='display-imag'
                />
                <button className='display-user-put-details'>
                    <HiOutlinePencil />
                </button>
                <h1 className="display-user-username">  {firstName} </h1>
            </div>
            <div className='buttonUserCorrespondence'>

                <div className='buttonUser'>
                    <button className='display-user-put' onClick={goToPutUserRegister}>  עדכון פרטיים אישים
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToViewingDocuments}>   צפייה במסמכים
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToViewingRegistrants}>  צפייה בנרשמים
                        <HiOutlinePencil />
                    </button>
                    <button className='display-user-put' onClick={goToUploadeDocuments}>   פרטי משכנתא
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

export default DisplayAdmin