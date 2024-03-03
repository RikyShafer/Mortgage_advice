
import React, { useState } from "react";
import { useAddQueryMutation } from "../../API calls/QueryAPICalls";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../../API calls/DirectorAPICalls";


const InitialState = {
    firstName: "", // - שם פרטי
    lastName: "", //- שם משפחה
    ID: "", //- מספר זיהוי
    roCertificateIssueDteles: "", // - תאריך הנפקת תעודת השורה
    phone: "", //- טלפון
    email: "", //- דוא"ל
    dateBirth: "", // - תאריך לידה
    maritalStatus: "", // - מצב משפחתי
    relationshipBetweenTheBorrowers: "", //- יחס בין הלווים
    education: "", //- חינוך
    gender: "", // - מגדר
    address: "", //- כתובת
    postalCode: "", //- מיקוד
    hometown: "", //- עיר מוצא
    age: "", //- גיל
    theirNativeNumber: "", //- מספר ילדים
    discoveryOfTheHilags: "", // -גילוי הלידים
    passport: "", //- דרכון
    foreignCitizenship: "", // - אזרחות זרה
    proximityPublicFigure: "", //- קרבת פומבי
};
const InitialUser = {
    name: "",
    username: "",
    password: "",
    email: "",
    city: "",
    address: "",
    number: "",
    phone: "",
    date: "",
    CountryBirth: "",
};
const FillingQuestionnaireIsNew = () => {
    const navigate = useNavigate()
    const [addQuery, { isLoading, isError, error }] = useAddQueryMutation();
    const [addUser, { isLoadingU, isErrorU, errorU }] = useAddUserMutation();
    const [formData, setFormData] = useState(InitialState);
    const [formUser, setFormUser] = useState(InitialUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addQuery(formData);
        navigate(`/getinManeger/`);
    };
    const handleSubmitUser = (e) => {
        e.preventDefault();
        console.log(formUser);
        addQuery(formUser);
        navigate(`/getinManeger/`);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setFormUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    if (isLoading) return <h1>Loading...</h1>;

    if (isError) {
        // Check if error has response property
        if (error.response && error.response.data && error.response.data.message) {
            return <h2>Error: {error.response.data.message}</h2>;
        } else {
            return <h2>Error: An unknown error occurred</h2>;
        }
    }
    if (isLoadingU) return <h1>Loading...</h1>;

    if (isErrorU) {
        // Check if error has response property
        if (errorU.response && errorU.response.data && errorU.response.data.message) {
            return <h2>Error: {errorU.response.data.message}</h2>;
        } else {
            return <h2>Error: An unknown error occurred</h2>;
        }
    }
    return (
        <div>
            <div>מילוי שאלון ליצרת לפתיחת תיק חדש</div>
            <div className="Questionnaire-add">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="שם פרטי"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="שם משפחה"
                    />
                    <input
                        type="text"
                        name="ID"
                        value={formData.ID}
                        onChange={handleChange}
                        placeholder="מספר זיהוי"
                    />
                    <input
                        type="date"
                        name="roCertificateIssueDteles"
                        value={formData.roCertificateIssueDteles}
                        onChange={handleChange}
                        placeholder="תאריך הנפקת תעודת השורה"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="מספר טלפון"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email"
                    />
                    <input
                        type="date"
                        name="dateBirth"
                        value={formData.dateBirth}
                        onChange={handleChange}
                        placeholder="תאריך לידה"
                    />
                    <input
                        type="text"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        placeholder="מצב משפחתי"
                    />
                    <input
                        type="text"
                        name="relationshipBetweenTheBorrowers"
                        value={formData.relationshipBetweenTheBorrowers}
                        onChange={handleChange}
                        placeholder=" יחס בין הלווים  "
                    />
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="  חינוך   "
                    />

                    <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder=" מגדר "
                    />

                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder=" כתובת רחוב "
                    />
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder=" מיקוד "
                    />
                    <input
                        type="text"
                        name="hometown"
                        value={formData.hometown}
                        onChange={handleChange}
                        placeholder=" עיר /ישוב  "
                    />
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="גיל  "
                    />
                    <input
                        type="text"
                        name="theirNativeNumber"
                        value={formData.theirNativeNumber}
                        onChange={handleChange}
                        placeholder="מספר ילדים   "
                    />
                    <input
                        type="text"
                        name="discoveryOfTheHilags"
                        value={formData.discoveryOfTheHilags}
                        onChange={handleChange}
                        placeholder="גילי הילדים  "
                    />

                    <input
                        type="text"
                        name="passport"
                        value={formData.passport}
                        onChange={handleChange}
                        placeholder="דרכון  "
                    />
                    <input
                        type="text"
                        name="foreignCitizenship"
                        value={formData.foreignCitizenship}
                        onChange={handleChange}
                        placeholder="אזרחות זרה  "
                    />
<input
    type="checkbox"
    name="proximityPublicFigure"
    checked={formData.proximityPublicFigure}
    onChange={(e) => setFormData((prevState) => ({
        ...prevState,
        proximityPublicFigure: e.target.checked
    }))}
/>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default FillingQuestionnaireIsNew;


