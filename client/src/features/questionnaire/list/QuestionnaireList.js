import React, { useEffect } from 'react';
import { useGetQueryQuery } from '../QueryAPICalls';
import { useSelector } from 'react-redux';
// import { HiOutlineUser } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';

import "./questionnaire-list.css";

const QuestionnaireList = () => {
    const { data: questionnaire, isLoading, isError, error, isSuccess } = useGetQueryQuery();
    const token = useSelector((state) => state.auth.token); // Get token from Redux store

    // const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            console.log("Fetching users...");
        }
    }, [token]);
    // const renderDocumentField = (fileUrl) => {
    //     if (fileUrl) {
    //         if (fileUrl.endsWith('.pdf')) {
    //             return <iframe src={fileUrl} width="100%" height="500px" title="PDF Document" />;
    //         } else if (fileUrl.endsWith('.docx')) {
    //             // For Word document, provide a download link
    //             return (
    //                 <div>
    //                     <p>This is a Word document. Click below to download:</p>
    //                     <a href={fileUrl} download>Download Word Document</a>
    //                 </div>
    //             );
    //         } else if (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png') || fileUrl.endsWith('.gif')) {
    //             return <img src={fileUrl} alt="Image" />;
    //         } else {
    //             // If the file format is not supported, display a message
    //             return <p>Unsupported file format</p>;
    //         }
    //     } else {
    //         // If file URL is empty, display a placeholder or nothing
    //         return null;
    //     }
    // };
    const renderDocumentField = (fileUrl, fileName) => {
        const baseUrl = 'http://localhost:3297/uploads'; // Base URL of the uploads folder on port 2937
    
        if (fileUrl) {
            // Construct the complete URL by appending the fileUrl to the base URL
            const fullUrl = `${baseUrl}/${fileUrl}`;
    
            return (
                <div>
                    <p>Click below to open the file:</p>
                    <a href={fullUrl} target="_blank" rel="noopener noreferrer">Open File</a>
                </div>
            );
        } else {
            // If file URL is empty, display a placeholder or nothing
            return null;
        }
    };
    // const goToPut = (userId) => {
    //     console.log("User ID:", userId);
    //     navigate(`/registerList/${userId}`);
    // };
    if (isLoading || !isSuccess) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    console.log("questionnaire:", questionnaire);

    let questionnaireData = questionnaire || [];
    console.log("questionnaireData:",questionnaireData);
    return (
        <div  >

            <div className="register-list-title" >תצוגה של אנשים שלחו טפסים </div>
            <div className="register-list">
                {questionnaireData.map((questionnaire) => (
    <div className="registerMap" key={questionnaire._id} >
                        <h1>שם פרטי  - {questionnaire.UserRegister?.firstName}</h1>
                        <p>תעודת זהות - {questionnaire.ID}</p>
                        <p>תאריך הנפקת תעודת זהות - {questionnaire.roCertificateIssueDteles}</p>
                        <p>תאריך לידה - {questionnaire.dateBirth}</p>
                        <p>מצב משפחתי - {questionnaire.maritalStatus}</p>
                        <p>השכלה - {questionnaire.education}</p>
                        <p>עיר מגורים - {questionnaire.city}</p>
                        <p>כתובת מגורים - {questionnaire.address}</p>
                        <p>מיקוד - {questionnaire.postalCode}</p>
                        <p>גיל - {questionnaire.age}</p>
                        <p>מספר ילדים מתחת לגיל 18 - {questionnaire.theirNativeNumber}</p>
                        <p>מספר דרכון - {questionnaire.passport}</p>
                        <p>אזרחות זרה - {questionnaire.foreignCitizenship}</p>
                        <p>קירבה לאיש ציבור - {questionnaire.proximityPublicFigure}</p>
                        <p>תעסוקה - {questionnaire.employment}</p>
                        <p>מקום עובדה - {questionnaire.job}</p>
                        <p>תפקיד בעבודה - {questionnaire.jobTitle}</p>
                        <p>וותק - {questionnaire.seniority}</p>
                        <p>מקום עבודה קודם - {questionnaire.previousWorkplace}</p>
                        <p>תוקף האישור - {questionnaire.validityOfApprovalOfCPAFromPreviousYear}</p>
                        <p>אישור רו"ח משנה נוכחית - {renderDocumentField(questionnaire.cpaApprovalForCurrentSub)}</p>
                        <p>תוקף האישור - {questionnaire.validityOfApprovalOfCPAFromPreviousYear}</p>
                        <p>אישור רו"ח משנה קודמת - {renderDocumentField(questionnaire.antecedentModifierMole)}</p>
                        <p>שומה משנה קודמת - {renderDocumentField(questionnaire.adiposityPreviousVariables1)}</p>
                        <p>שומה משתנים קודמות - {renderDocumentField(questionnaire.adiposityPreviousVariables2)}</p>
                        <p>תלוש נטו ראשון - {renderDocumentField(questionnaire.firstNetSlip)}</p>
                        <p>תלוש נטו שני - {renderDocumentField(questionnaire.secondNetSlip)}</p>
                        <p>תלוש נטו שלישי - {renderDocumentField(questionnaire.thirdNetSlip)}</p>
                        <p>הכנסה ממוצעת - {questionnaire.averageIncome}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionnaireList;

