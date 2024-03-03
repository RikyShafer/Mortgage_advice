import React, { useState } from "react";
import { useAddQueryMutation } from "../QueryAPICalls";
import { useNavigate } from "react-router-dom";
import "./add -questionnaire.css"
import { FaArrowUpFromBracket } from "react-icons/fa6";

const AddQuestionnaire = () => {
    const navigate = useNavigate()
    const [addQuery, { isLoading, isError, error }] = useAddQueryMutation();
    const [selectedCity, setSelectedCity] = useState(""); 
    const [incompleteFields, setIncompleteFields] = useState(false); 

    const predefinedCities = [
        "ירושלים",
        "בני ברק",
        "אלעד",
        "טבריה",
        "תל אביב",
        "פתח תקווה",
        "חיפה",
        "גבעת זאב",
        "בית שמש",
        "צפת"
    ];

    const handleSelectCity = (e) => {
        setSelectedCity(e.target.value);
    };

    const cityOptions = predefinedCities.map((city, index) => (
        <option key={index} value={city}>{city}</option>
    ));

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target); // Use FormData to handle file uploads
    //     addQuery(formData);
    //     navigate(`/`);
    // };

    const messageeSubmit = (e) => {
        e.preventDefault();
        console.log("הצליח לצאת מהודעה ");
        setIncompleteFields(false); // Close the square
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);

        const hasIncompleteFields = Object.values(formValues).some((value) => !value);
        setIncompleteFields(hasIncompleteFields);

        if (!hasIncompleteFields) {
            addQuery(formValues);
            navigate(`/`);
        }
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
           
            <div className="Registration-for-the-process">
                 {incompleteFields && (
                <div className="message">
                    <div className="messagee">
                        <h1>אופס... נראה שלא מלאתם את כל השדות שימו לב שהעלתם את כל הטפסים שנדרשים כדי שנוכל להמשיך את התהליך</h1>
                        <button type="submit" onClick={messageeSubmit}>הבנתי</button>
                    </div>
                </div>
            )}
                <h1 className="Registration-for-the-process-title">  עכשיו אפשר להתחיל בתהליך, ביחד נגשים לכם את החלום!</h1>

                <div className="Questionnaire-add">

                    <form onSubmit={handleSubmit} className="Registration-for-the-process-form" >
                        <div className="Registration-for-the-process-input">
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' >תעודת זהות  </h3>
                                <input
                                    type="text"
                                    name="ID"
                                    // required
                                    placeholder='הקלידו כאן... ' />
                            </div>

                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3'  >  תאריך הנפקת תעודת זהות      </h3>
                                <input
                                    type="date"
                                    // required
                                    name="roCertificateIssueDteles"
                                    placeholder="בחירה...." />
                            </div>

                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3'  > תאריך לידה </h3>
                                <input
                                    type="date"
                                    // required
                                    name="dateBirth"
                                    placeholder="בחירה...." />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > מצב משפחתי </h3>
                                <select
                                    name="maritalStatus"
                                    // required
                                    defaultValue="" >
                                    <option value="" disabled hidden>בחירה....</option>
                                    <option value="נשוי">נשוי</option>
                                    <option value="בודד">רווק</option>
                                    <option value="גרוש">גרוש</option>
                                    <option value="אחר">אחר</option>
                                </select>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3'> השכלה</h3>
                                <select name="education" defaultValue="">
                                    <option value="" disabled hidden>בחירה....</option>
                                    <option value="maturity">בגרות</option>
                                    <option value="diploma">תעודה</option>
                                    <option value="Akamai">אקדמאי</option>
                                    <option value="doctorate">דוקטורט</option>
                                    <option value="Professor">פרופסור</option>
                                </select>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > עיר מגורים </h3>
                                <select
                                    value={selectedCity} // Control the select input with selectedCity state
                                    onChange={handleSelectCity} // Event handler for selecting a city
                                >
                                    <option value="" disabled hidden>בחירה....</option>
                                    {cityOptions}
                                    <option value="אחר">אחר</option>
                                </select>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > כתובת מגורים </h3>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="הקלידו כאן..."
                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > מיקוד</h3>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="הקלידו כאן..."
                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > גיל</h3>
                                <input
                                    type="text"
                                    name="age"
                                    placeholder="הקלידו כאן..."
                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > מספר ילדים מתחת לגיל 18 </h3>
                                <input
                                    type="text"
                                    name="theirNativeNumber"
                                    placeholder="הקלידו כאן..."
                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > מספר דרכון</h3>
                                <input
                                    type="text"
                                    name="passport"
                                    placeholder="הקלידו כאן..."

                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > אזרחות זרה </h3>

                                <select
                                    name="foreignCitizenship" defaultValue="">
                                    <option value="" disabled hidden>בחירה....</option>
                                    <option value="true">כן</option>
                                    <option value="false">לא</option>
                                </select>
                            </div>

                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3'>קירבה לאיש ציבור </h3>
                                <select
                                    name="proximityPublicFigure" defaultValue="">
                                    <option value="" disabled hidden>בחירה....</option>
                                    <option value="true">כן</option>
                                    <option value="false">לא</option>
                                </select>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > תעסוקה</h3>
                                <input
                                    type="text"
                                    name="employment"
                                    placeholder="בחירה...."
                                />

                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > מקום עובדה </h3>
                                <input
                                    type="text"
                                    name="job"
                                    placeholder=" הקלידו כאן... "
                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > תפקיד בעבודה </h3>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder=" הקלידו כאן... "
                                />
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > וותק</h3>
                                <select
                                    name="seniority" defaultValue="" >
                                    <option value="" disabled hidden>בחירה....</option>
                                    <option value="פחות משנה ">פחות משנה </option>
                                    <option value="שנה">שנה</option>
                                    <option value="שנתיים">שנתיים</option>
                                    <option value="3+">3+</option>
                                    <option value="5+">5+</option>
                                    <option value="7+">7+</option>
                                    <option value="10+">10+</option>
                                    <option value="אחר">אחר</option>

                                </select>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > מקום עבודה קודם </h3>
                                <input
                                    type="text"
                                    name="previousWorkplace"
                                    placeholder=" הקלידו כאן... "
                                />
                            </div>


                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > אישור רו"ח משנה נוכחית </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="cpaApprovalForCurrentSub"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > תוקף האישור </h3>
                                <input
                                    type="date"
                                    name="validityOfApprovalOfCPAFromPreviousYear"
                                    placeholder="בחירה...."
                                />
                            </div>

                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' >אישור רו"ח משנה קודמת </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="antecedentModifierMole"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > שומה משנה קודמת </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="adiposityPreviousVariables1"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > שומה משתנים קודמות </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="adiposityPreviousVariables2"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > תלוש נטו ראשון </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="firstNetSlip"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > תלוש נטו שני </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="secondNetSlip"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3'> תלוש נטו שלישי </h3>
                                <div className="Registration-for-the-process-form-file">
                                    <input
                                        type="file"
                                        name="thirdNetSlip"
                                        style={{ display: 'none' }}
                                        id="file-upload-input"
                                    />
                                    <label htmlFor="file-upload-input">
                                        העלה...
                                    </label>
                                    <label htmlFor="file-upload-input" className="file-upload-span">
                                        <FaArrowUpFromBracket />
                                    </label>
                                </div>
                            </div>
                            <div className='Registration-for-the-process-title'>
                                <h3 className='Registration-for-the-process-form-h3' > הכנסה ממוצעת </h3>
                                <input
                                    type="text"
                                    name="averageIncome"
                                    placeholder=" הקלידו כאן... "
                                />
                            </div>

                        </div>
                        <button type="submit"  >אני רוצה להמשיך </button>
                    </form>

                </div>
            </div>
        
    );
};

export default AddQuestionnaire;
