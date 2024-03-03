
import React from "react";
import { useGetQueryQuery } from "../../API calls/QueryAPICalls";

const PresentationOfFillingOutTheQuestionnaire = () => {
  const { data: blogs, isLoading, isError, error } = useGetQueryQuery(); // Corrected usage of useGetQueryQuery
  if (isLoading)
    return <h1>Loading...</h1>;
  if (isError)
    return <h2>Error: {error}</h2>;
  return (
    <div>
      <div>סיכום איך נראה השאלון אחרי המילוי ללקוח תצוגה של זה</div>
      <div className="Questionnaire-list">
        {blogs ? ( // Check if blogs is not undefined or null
          blogs.map((Questionnaire) => (
            <div className="QuestionnaireMap"> 
            <h1 key={Questionnaire.id}>{Questionnaire.firstName} - שם פרטי </h1>
            <p> {Questionnaire.lastName} - שם משפחה</p>
            <p> {Questionnaire.ID} - מספר זיהוי</p>
            <p> {Questionnaire.roCertificateIssueDteles}- תאריך הנפקת תעודת השורה</p>
            <p> {Questionnaire.phone}- טלפון</p>
            <p> {Questionnaire.email}- דוא"ל</p>
            <p> {Questionnaire.dateBirth} - תאריך לידה</p>
            <p> {Questionnaire.maritalStatus}- מצב משפחתי</p>
            <p> {Questionnaire.relationshipBetweenTheBorrowers}- יחס בין הלווים</p>
            <p> {Questionnaire.education}- חינוך</p>
            <p> {Questionnaire.gender}- מגדר</p>

            <p> {Questionnaire.address}- כתובת</p>
            <p> {Questionnaire.postalCode}- מיקוד</p>
            <p> {Questionnaire.hometown}- עיר מוצא</p>
            <p> {Questionnaire.age}- גיל</p>
            <p> {Questionnaire.theirNativeNumber}- מספר ילדים</p>

            <p> {Questionnaire.discoveryOfTheHilags}-גילוי הלידים</p>
            <p> {Questionnaire.passport} -דרכון</p>
            <p> {Questionnaire.foreignCitizenship}- אזרחות זרה</p>
            <p> {Questionnaire.proximityPublicFigure} - קרבת פומבי</p>



            </div> 
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default PresentationOfFillingOutTheQuestionnaire;
