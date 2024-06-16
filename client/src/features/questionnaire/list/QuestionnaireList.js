import React, { useEffect } from 'react';
import { useGetQueryQuery } from '../QueryAPICalls';
import { useSelector } from 'react-redux';
import { HiOutlineDownload } from "react-icons/hi";
import { AiFillPrinter } from "react-icons/ai";


// import { HiOutlineUser } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';

import "./questionnaire-list.css";

const printList = (questionnaireDetails) => {
    const printContents = document.getElementById(`print-content-${questionnaireDetails._id}`).innerHTML;
    const popupWin = window.open('', '_blank', 'width=600,height=600');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
        <head>
            <title>Print</title>
            <style>
                /* Add your styles for printing here */
                body {
                    padding: 20px;
                    border: 3px solid #1A7D99; /* Blue border */
                    border-radius: 10px;
                    font-family: "Noto Sans Hebrew", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: 400;
                    font-style: normal;
                    font-variation-settings: "wdth" 100;
                    direction: rtl;
                    text-align: right;
                    line-height: 1.5; 
                }
                /* Add any other styles you need for printing */
            </style>
        </head>
        <body onload="window.print();window.close()">
            ${printContents}
        </body>
        </html>
    `);
    popupWin.document.close();
};

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
            console.log(fileName);
            const fixedFileName = fileName
                return (
                    <div>
                        לחץ בשביל לראות או להוריד
                        <a 
                            href={fullUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download={fixedFileName} // This suggests a fixed file name for download
                        >  
                            <HiOutlineDownload style={{ color: '#1A7D99' }} /> 
                        </a>
                    </div>
                );
            } else {
                return null;
            }
        };
        
    // const goToPut = (userId) => {
    //     console.log("User ID:", userId);
    //     navigate(`/registerList/${userId}`);
    // };\\\
    const format = (ID) => {
        const date = new Date(ID);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate
    }
    if (isLoading || !isSuccess) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    console.log("questionnaire:", questionnaire);

    let questionnaireData = questionnaire || [];
    console.log("questionnaireData:", questionnaireData);
    return (
        <div  >

            <div className="register-list-title" >תצוגה של אנשים שלחו טפסים </div>
            <div className="register-list">
                {questionnaireData.map((questionnaire) => (
                    <div className="registerMap" id={`print-content-${questionnaire._id}`} key={questionnaire._id}>
                        <button onClick={() => printList(questionnaire)} className="print-button">
                            <AiFillPrinter />
                        </button>
                        <div className="customer-info">
                            <img className="side-bar-menu-img" src="./Rectangle.png" alt="User avatar" />
                            <h1 className='customer_name' style={{ color: '#1A7D99' }}>שם הלקוח -  {questionnaire.UserRegister?.firstName}</h1>
                        </div>
                        <p className='details'>תעודת זהות -  {format(questionnaire.ID)}</p>
                        <p className='details'>תאריך הנפקת תעודת זהות -  {format(questionnaire.roCertificateIssueDteles)}</p>
                        <p className='details'>תאריך לידה - {format(questionnaire.dateBirth)}</p>
                        <p className='details'>מצב משפחתי - {questionnaire.maritalStatus}</p>
                        <p className='details'>השכלה -  {questionnaire.education}</p>
                        <p className='details'>עיר מגורים - {questionnaire.city}</p>
                        <p className='details'>כתובת מגורים - {questionnaire.address}</p>
                        <p className='details'>מיקוד -  {questionnaire.postalCode}</p>
                        <p className='details'>גיל -  {questionnaire.age}</p>
                        <p className='details'>מספר ילדים מתחת לגיל 18 -  {questionnaire.theirNativeNumber}</p>
                        <p className='details'>מספר דרכון -  {questionnaire.passport}</p>
                        <p className='details'>אזרחות זרה -  {questionnaire.foreignCitizenship}</p>
                        <p className='details'>קירבה לאיש ציבור -  {questionnaire.proximityPublicFigure}</p>
                        <p className='details'>תעסוקה -  {questionnaire.employment}</p>
                        <p className='details'>מקום עובדה -  {questionnaire.job}</p>
                        <p className='details'>תפקיד בעבודה - {questionnaire.jobTitle}</p>
                        <p className='details'>וותק -  {questionnaire.seniority}</p>
                        <p className='details'>מקום עבודה קודם -  {questionnaire.previousWorkplace}</p>
                        <p className='details'>תוקף האישור -  {format(questionnaire.validityOfApprovalOfCPAFromPreviousYear)}</p>
                        <p className='details'> אישור רו"ח משנה נוכחית -  {renderDocumentField(questionnaire.cpaApprovalForCurrentSub, 'אישור רו"ח משנה נוכחית ')}</p>
                        <p className='details'> תוקף האישור - {format(questionnaire.validityOfApprovalOfCPAFromPreviousYear)}</p>
                        <p className='details'> אישור רו"ח משנה קודמת -  {renderDocumentField(questionnaire.antecedentModifierMole,'אישור רו"ח משנה קודמת ' )}</p>
                        <p className='details'> שומה משנה קודמת -  {renderDocumentField(questionnaire.adiposityPreviousVariables1,'שומה משנה קודמת ')}</p>
                        <p className='details'> שומה משתנים קודמות -  {renderDocumentField(questionnaire.adiposityPreviousVariables2,'שומה משתנים קודמות ')}</p>
                        <p className='details'> תלוש נטו ראשון - {renderDocumentField(questionnaire.firstNetSlip,'תלוש נטו ראשון ')}</p>
                        <p className='details'> תלוש נטו שני -  {renderDocumentField(questionnaire.secondNetSlip,'תלוש נטו שני ')}</p>
                        <p className='details'> תלוש נטו שלישי -  {renderDocumentField(questionnaire.thirdNetSlip,' תלוש נטו שלישי‪.docx')}</p>
                        <p className='details'>הכנסה ממוצעת -  {questionnaire.averageIncome}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionnaireList;

