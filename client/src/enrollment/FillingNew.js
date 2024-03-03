
// import React, { useState } from "react";
// import { useAddUserMutation } from "../API calls/DirectorAPICalls";
// import { useNavigate } from "react-router-dom";

// const InitialState = {
//     name: "", // - שם פרטי
//     username: "", //- שם משפחה
//     password: "", //- מספר זיהוי
//     email: "", // - תאריך הנפקת תעודת השורה
//     city: "", //- טלפון
//     address: "", //- דוא"ל
//     number: "", // - תאריך לידה
//     phone: "", // - מצב משפחתי
//     date: "", //- יחס בין הלווים
//     CountryBirth: "", //- חינוך
// };

// const FillingNew = () => {
//     const navigate = useNavigate()
//     const [addUser, { isLoading, isError, error }] = useAddUserMutation();

//     const [formData, setFormData] = useState(InitialState);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData);
//         addUser(formData);
//         navigate(`/getinManeger/`);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     if (isLoading) return <h1>Loading...</h1>;

//     if (isError) {
//         // Check if error has response property
//         if (error.response && error.response.data && error.response.data.message) {
//             return <h2>Error: {error.response.data.message}</h2>;
//         } else {
//             return <h2>Error: An unknown error occurred</h2>;
//         }
//     }

//     return (
//         <div>
//             <div>מילוי שאלון ליצרת לפתיחת תיק חדש</div>
//             <div className="Questionnaire-add">
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="שם פרטי"
//                     />
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         placeholder="שם מזהה אישי "
//                     />
//                     <input
//                         type="text"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="סיסמה מזהה "
//                     />
//                            <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="email"
//                     />
//                            <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         placeholder="city"
//                     />
//                                                <input
//                         type="text"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleChange}
//                         placeholder="address"
//                     />
//                     <input
//                         type="text"
//                         name="number"
//                         value={formData.number}
//                         onChange={handleChange}
//                         placeholder="numberמצב "
//                     />
//                      <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         placeholder="מספר טלפון"
//                     />


//                     <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         placeholder="date  ה"
//                     />
//                                        <input
//                         type="text"
//                         name="CountryBirth"
//                         value={formData.CountryBirth}
//                         onChange={handleChange}
//                         placeholder=" CountryBirth "
//                     />
                  
//                     <button type="submit">Add</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FillingNew;


import React, { useState } from "react";
import { useAddUserMutation } from "../API calls/DirectorAPICalls";
import { useNavigate } from "react-router-dom";

const InitialState = {
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

const FillingNew = () => {
    const navigate = useNavigate();
    const [addUser, { isLoading, isError, error }] = useAddUserMutation();

    const [formData, setFormData] = useState(InitialState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(formData).unwrap(); // Assuming addUser returns a promise
            navigate(`/Entrance/`);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
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
    return (
        <div>
            <div>מילוי שאלון ליצרת לפתיחת תיק חדש</div>
            <div className="Questionnaire-add">
                <form onSubmit={handleSubmit}>
                    {/* Inputs for each form field */}
                    {Object.keys(InitialState).map((key) => (
                        <input
                            key={key}
                            type={key === 'date' ? 'date' : 'text'} // Set type dynamically for date field
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            placeholder={key} // Placeholder is set to key for simplicity
                        />
                    ))}
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default FillingNew;