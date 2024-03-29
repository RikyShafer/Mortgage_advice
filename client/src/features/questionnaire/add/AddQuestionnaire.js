import React, { useState } from "react";
import { useAddQueryMutation } from "../QueryAPICalls";
import { useNavigate } from "react-router-dom";
import "./add -questionnaire.css"
import { FaArrowUpFromBracket } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
const AddQuestionnaire = () => {
    const navigate = useNavigate()
    const [addQuery, { isLoading, isError, error }] = useAddQueryMutation();
    const [selectedCity, setSelectedCity] = useState("");
    const [incompleteFields, setIncompleteFields] = useState(false);
    const { _id, firstName, email, roles } = useAuth();
    
    const [CpaApprovalForCurrentSube, setCpaApprovalForCurrentSube] = useState(null)
    const [antecedentModifierMole, setAntecedentModifierMole] = useState(null)
    const [adiposityPreviousVariables1, setAdiposityPreviousVariables1] = useState(null)
    const [adiposityPreviousVariables2, setAdiposityPreviousVariables2] = useState(null)
    const [firstNetSlip, setFirstNetSlip] = useState(null)
    const [secondNetSlip, setSecondNetSlip] = useState(null)
    const [thirdNetSlip, setThirdNetSlip] = useState(null)

    const updateCpaApprovalForCurrentSube = (e) => {
        if (e.target.files)
            setCpaApprovalForCurrentSube(e.target.files[0])
        else
            setCpaApprovalForCurrentSube(null)
    }
    const updateAntecedentModifierMole = (e) => {
        if (e.target.files)
            setAntecedentModifierMole(e.target.files[0])
        else
            setAntecedentModifierMole(null)
    }
    const updateAdiposityPreviousVariables1 = (e) => {
        if (e.target.files)
            setAdiposityPreviousVariables1(e.target.files[0])
        else
            setAdiposityPreviousVariables1(null)
    }
    const updateAdiposityPreviousVariables2 = (e) => {
        if (e.target.files)
            setAdiposityPreviousVariables2(e.target.files[0])
        else
            setAdiposityPreviousVariables2(null)
    }

    const updateFirstNetSlip = (e) => {
        if (e.target.files)
            setFirstNetSlip(e.target.files[0])
        else
            setFirstNetSlip(null)
    }
    const updateSecondNetSlip = (e) => {
        if (e.target.files)
            setSecondNetSlip(e.target.files[0])
        else
            setSecondNetSlip(null)
    }
    const updateThirdNetSlip = (e) => {
        if (e.target.files)
            setThirdNetSlip(e.target.files[0])
        else
            setThirdNetSlip(null)
    }
    console.log(_id, firstName, email, roles);
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

    const messageeSubmit = (e) => {
        e.preventDefault();
        console.log("הצליח לצאת מהודעה ");
        setIncompleteFields(false); // Close the square

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('UserRegister', _id);
        formData.append('ID', e.target.ID?.value ?? '');
        formData.append('roCertificateIssueDteles', e.target.roCertificateIssueDteles?.value ?? '');
        formData.append('dateBirth', e.target.dateBirth?.value ?? '');
        formData.append('maritalStatus', e.target.maritalStatus?.value ?? '');
        formData.append('education', e.target.education?.value ?? '');
    
        formData.append('hometown', selectedCity);
        formData.append('address', e.target.address?.value ?? '');
        formData.append('postalCode', e.target.postalCode?.value ?? '');
    
        formData.append('age', e.target.age?.value ?? '');
        formData.append('theirNativeNumber', e.target.theirNativeNumber?.value ?? '');
        formData.append('passport', e.target.passport?.value ?? '');
    
        formData.append('foreignCitizenship', e.target.foreignCitizenship?.value ?? '');
        formData.append('proximityPublicFigure', e.target.proximityPublicFigure?.value ?? '');
        formData.append('employment', e.target.employment?.value ?? '');
    
        formData.append('job', e.target.job?.value ?? '');
        formData.append('jobTitle', e.target.jobTitle?.value ?? '');
        formData.append('seniority', e.target.seniority?.value ?? '');
    
        formData.append('previousWorkplace', e.target.previousWorkplace?.value ?? '');
        formData.append('validityOfApprovalOfCPAFromPreviousYear', e.target.validityOfApprovalOfCPAFromPreviousYear?.value ?? '');
        formData.append('averageIncome', e.target.averageIncome?.value ?? '');
    
        formData.append('cpaApprovalForCurrentSub', CpaApprovalForCurrentSube);
        formData.append('antecedentModifierMole', antecedentModifierMole);
        formData.append('adiposityPreviousVariables1', adiposityPreviousVariables1);
        formData.append('adiposityPreviousVariables2', adiposityPreviousVariables2);
        formData.append('firstNetSlip', firstNetSlip);
        formData.append('secondNetSlip', secondNetSlip);
        formData.append('thirdNetSlip', thirdNetSlip);
    
        try {
            await addQuery(formData);
            navigate(`/`);
        } catch (error) {
            console.error("Error submitting form:", error);
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
                    <input
                        type='hidden'
                        name="UserRegister"
                        value={_id} // Set the value to the user's ID obtained from useAuth
                        readOnly // Make the input field readonly
                    />
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
                                <option value="10+">15+</option>
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

                                <input onChange={updateCpaApprovalForCurrentSube}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-CpaApprovalForCurrentSube-input" />
                                <label htmlFor="file-CpaApprovalForCurrentSube-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-CpaApprovalForCurrentSube-input" className="file-upload-span">
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


                                <input onChange={updateAntecedentModifierMole}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-AntecedentModifierMole-input" />
                                <label htmlFor="file-AntecedentModifierMole-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-AntecedentModifierMole-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > שומה משנה קודמת </h3>
                            <div className="Registration-for-the-process-form-file">

                                <input onChange={updateAdiposityPreviousVariables1}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-AdiposityPreviousVariables1-input" />
                                <label htmlFor="file-AdiposityPreviousVariables1-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-AdiposityPreviousVariables1-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > שומה משתנים קודמות </h3>
                            <div className="Registration-for-the-process-form-file">
                                <input onChange={updateAdiposityPreviousVariables2}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-AdiposityPreviousVariables2-input" />
                                <label htmlFor="file-AdiposityPreviousVariables2-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-AdiposityPreviousVariables2-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תלוש נטו ראשון </h3>
                            <div className="Registration-for-the-process-form-file">
                                <input onChange={updateFirstNetSlip}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-FirstNetSlip-input" />
                                <label htmlFor="file-FirstNetSlip-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-FirstNetSlip-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3' > תלוש נטו שני </h3>
                            <div className="Registration-for-the-process-form-file">


                                <input onChange={updateSecondNetSlip}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-SecondNetSlip-input" />
                                <label htmlFor="file-SecondNetSlip-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-SecondNetSlip-input" className="file-upload-span">
                                    <FaArrowUpFromBracket />
                                </label>
                            </div>
                        </div>
                        <div className='Registration-for-the-process-title'>
                            <h3 className='Registration-for-the-process-form-h3'> תלוש נטו שלישי </h3>
                            <div className="Registration-for-the-process-form-file">


                                <input onChange={updateThirdNetSlip}
                                    type='file'
                                    style={{ display: 'none' }}
                                    id="file-ThirdNetSlip-input" />
                                <label htmlFor="file-ThirdNetSlip-input">
                                    העלה...
                                </label>
                                <label htmlFor="file-ThirdNetSlip-input" className="file-upload-span">
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
